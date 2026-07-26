/**
 * requireAuth — the server-side gate for /api/* endpoints.
 * ========================================================
 *
 * WHAT THIS REPLACES
 * ------------------
 * Every endpoint previously relied on an Origin/Referer allow-list as its
 * ONLY gate. Origin and Referer are request headers set by the caller: a
 * browser sets them honestly, a script does not. So the old gate stopped a
 * cross-site fetch from another web page (a weak CSRF defence) but stopped
 * nothing from a direct request. That mattered a great deal because several
 * endpoints run with a Wix API key whose site-level permissions deliberately
 * bypass per-role CMS restrictions — for those, the endpoint IS the boundary.
 *
 * Worse, two endpoints used:
 *
 *     if (origin && !origin.startsWith(PUBLIC_ORIGIN)) -> 403
 *
 * which SKIPS the check entirely when no Origin header is sent at all.
 * `assertSameOrigin()` below fixes that: a missing Origin now fails.
 *
 * USAGE
 * -----
 *   export const POST: APIRoute = async ({ request, locals }) => {
 *     const gate = await requireAuth(request, locals, { roles: ['admin', 'paralegal'] });
 *     if (!gate.ok) return gate.response;      // 401 / 403 already built
 *     const user = gate.user;                  // { uid, email, role }
 *     ...
 *   };
 *
 * Keep the origin allow-list too — it is CSRF defence layered ON TOP of
 * authentication, never a substitute for it.
 */

import { readSessionCookie, verifySession, type SessionUser } from './session';

export type { SessionUser };

/** Roles permitted to act on staff-side data. */
export const STAFF_ROLES = ['admin', 'paralegal', 'paralegal_student'];

/**
 * Read a secret from the Worker env / Wix Secrets Manager.
 * Mirrors the helper already used by /api/admin/backfill-financialrecords.
 */
export function getSecretValue(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // import.meta.env is dynamic — cast rather than @ts-expect-error, which the
  // compiler flags as an unused directive under this tsconfig.
  const metaEnv = (import.meta as any)?.env;
  return (metaEnv?.[name] as string | undefined) || '';
}

export function json(body: any, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

/**
 * CSRF defence. Unlike the old checks, a MISSING Origin is a failure unless a
 * Referer from an allowed origin is present — we never "pass by omission".
 */
export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  if (origin) return ALLOWED_ORIGINS.has(origin);
  if (referer) return [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o));
  return false; // no origin AND no referer -> reject (was: silently allowed)
}

/**
 * NOTE ON SHAPE: this is a flat interface with optional members rather than a
 * discriminated union. A union (`{ok:true,user} | {ok:false,response}`) reads
 * better, but this project's tsconfig does not narrow it on `if (!gate.ok)`,
 * so every call site errored with "Property 'response' does not exist".
 * Callers use `gate.response!` / `gate.user!` after checking `gate.ok`.
 */
export interface AuthGate {
  ok: boolean;
  /** Present when ok === true. */
  user?: SessionUser;
  /** Present when ok === false — a ready-made 401/403 to return. */
  response?: Response;
}

export interface RequireAuthOptions {
  /** Allowed roles. Omit to accept any authenticated user. */
  roles?: string[];
  /** Set false to skip the same-origin/CSRF check (rare). Default true. */
  checkOrigin?: boolean;
}

/**
 * Verify the caller has a valid signed session cookie (and, optionally, one of
 * the required roles). Returns a ready-made 401/403 Response when it fails, so
 * endpoints stay a two-line guard.
 */
export async function requireAuth(
  request: Request,
  locals: any,
  options: RequireAuthOptions = {}
): Promise<AuthGate> {
  const { roles, checkOrigin = true } = options;

  if (checkOrigin && !assertSameOrigin(request)) {
    return { ok: false, response: json({ error: 'Forbidden origin.' }, 403) };
  }

  const secret = getSecretValue(locals, 'LA_SESSION_SECRET');
  if (!secret) {
    // Fail CLOSED. A missing secret must never mean "let everyone in".
    console.error('[requireAuth] LA_SESSION_SECRET is not configured.');
    return {
      ok: false,
      response: json(
        { error: 'Authentication is not configured on the server.' },
        500
      ),
    };
  }

  const token = readSessionCookie(request);
  const user = await verifySession(token, secret);
  if (!user) {
    return {
      ok: false,
      response: json({ error: 'Not authenticated.' }, 401),
    };
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return {
      ok: false,
      response: json({ error: 'Insufficient permissions.' }, 403),
    };
  }

  return { ok: true, user };
}
