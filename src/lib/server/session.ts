/**
 * Session tokens — HMAC-signed, httpOnly cookie. Server-side only.
 * ================================================================
 *
 * WHY THIS EXISTS
 * ---------------
 * Before this, `generateToken()` in auth-service.ts produced 32 random bytes
 * IN THE BROWSER and stored them in localStorage. The server never saw the
 * token and kept no session store, so there was nothing any API endpoint
 * could verify — every /api/* route fell back to an Origin header check,
 * which is client-controlled and trivially spoofed.
 *
 * This module issues a stateless, tamper-evident session token:
 *
 *     base64url(payload) + "." + base64url(HMAC-SHA256(payload, secret))
 *
 * The secret lives in Wix Secrets Manager as LA_SESSION_SECRET and never
 * leaves the server, so a token cannot be forged by a client. It is stateless
 * (no session table) which suits Cloudflare Workers; the trade-off is that a
 * token cannot be revoked before it expires, hence the short TTL.
 *
 * The cookie is httpOnly (JS cannot read it, so XSS cannot exfiltrate it),
 * Secure, and SameSite=Lax (blocks cross-site CSRF while still allowing
 * top-level navigation back to the site).
 */

export const SESSION_COOKIE = 'la_session';

/** 12 hours — a working day. Short, because stateless tokens can't be revoked. */
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

export interface SessionUser {
  /** useraccounts._id */
  uid: string;
  email: string;
  /** 'admin' | 'paralegal' | 'paralegal_student' | 'client' */
  role: string;
}

interface SessionPayload extends SessionUser {
  /** issued-at (epoch seconds) */
  iat: number;
  /** expiry (epoch seconds) */
  exp: number;
}

// -------------------------------------------------------------- base64url
function b64urlEncode(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const raw = atob(b64 + pad);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// -------------------------------------------------------------------- HMAC
async function hmac(payloadB64: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payloadB64)
  );
  return new Uint8Array(sig);
}

/** Mint a signed session token for a user. */
export async function signSession(
  user: SessionUser,
  secret: string,
  ttlSeconds: number = SESSION_TTL_SECONDS
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    uid: user.uid,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + ttlSeconds,
  };
  const payloadB64 = b64urlEncode(
    new TextEncoder().encode(JSON.stringify(payload))
  );
  const sig = await hmac(payloadB64, secret);
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

/**
 * Verify a token's signature and expiry.
 * Returns the user on success, or null on ANY problem (bad shape, bad
 * signature, expired). Never throws — callers just get null.
 */
export async function verifySession(
  token: string | undefined | null,
  secret: string
): Promise<SessionUser | null> {
  if (!token || !secret) return null;
  const dot = token.indexOf('.');
  if (dot < 1) return null;

  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  try {
    const expected = await hmac(payloadB64, secret);
    const provided = b64urlDecode(sigB64);
    // Signature first — never parse a payload we haven't authenticated.
    if (!timingSafeEqual(expected, provided)) return null;

    const payload: SessionPayload = JSON.parse(
      new TextDecoder().decode(b64urlDecode(payloadB64))
    );

    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp <= now) return null;
    if (!payload.uid || !payload.email) return null;

    return { uid: payload.uid, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------ cookie
/** Build the Set-Cookie header value for a fresh session. */
export function buildSessionCookie(
  token: string,
  maxAge: number = SESSION_TTL_SECONDS
): string {
  return [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ].join('; ');
}

/** Build the Set-Cookie header value that clears the session. */
export function buildClearSessionCookie(): string {
  return [
    `${SESSION_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=0',
  ].join('; ');
}

/** Pull the session token out of the request's Cookie header. */
export function readSessionCookie(request: Request): string | null {
  const header = request.headers.get('cookie') || '';
  if (!header) return null;
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === SESSION_COOKIE) return rest.join('=') || null;
  }
  return null;
}
