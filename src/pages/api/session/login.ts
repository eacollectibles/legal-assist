import type { APIRoute } from 'astro';
// Static imports — Cloudflare Workers blocks the dynamic-import trick, so the
// Wix SDK is bundled at build time (same pattern as /api/admin/backfill-*).
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

import { hashPassword, verifyPassword } from '@/lib/server/password';
import { signSession, buildSessionCookie, SESSION_TTL_SECONDS } from '@/lib/server/session';
import { assertSameOrigin, getSecretValue, json } from '@/lib/server/require-auth';

/**
 * POST /api/session/login   { email, password }
 *
 * NOTE ON THE PATH: this deliberately lives under /api/session/, NOT /api/auth/.
 * The @wix/astro package already ships its own /api/auth/login and
 * /api/auth/logout routes, and defining ours at the same paths produced:
 *
 *   [router] The route "/api/auth/login" is defined in both
 *   "src/pages/api/auth/login.ts" and "node_modules/@wix/astro/.../login.js".
 *   A collision will result in a hard error in following versions of Astro.
 *
 * WHY THIS ENDPOINT EXISTS
 * ------------------------
 * The original login ran ENTIRELY IN THE BROWSER: it fetched every
 * `useraccounts` row (including every user's passwordHash), hashed the typed
 * password client-side, and compared. Two consequences:
 *
 *   1. Every user's password hash was downloadable by any client that could
 *      read the collection.
 *   2. The "authToken" it then wrote to localStorage was random bytes the
 *      server never saw — so no API endpoint could ever verify a caller.
 *
 * Here the comparison happens on the server, hashes never leave it, and on
 * success we set an httpOnly, HMAC-signed session cookie that /api/* routes
 * can actually verify (see src/lib/server/require-auth.ts).
 *
 * TRANSPARENT HASH UPGRADE
 * ------------------------
 * Existing rows hold a legacy SHA-256 hash. When one of those verifies, we
 * immediately rewrite it as PBKDF2 (210k iterations, per-user salt). The user
 * keeps their password and notices nothing. No forced reset.
 *
 * 2FA
 * ---
 * If the account has twoFactorEnabled, we do NOT issue a session here. We
 * return { requires2FA: true } and the caller must complete
 * POST /api/session/verify-otp, which issues the session.
 *
 * Returns: { success, user }  (never the password hash)
 */

interface LoginBody {
  email?: string;
  password?: string;
}

/** Map a useraccounts row onto the role vocabulary used by requireAuth(). */
function resolveRole(user: any): string {
  if (user?.isAdmin === true) return 'admin';
  return user?.userType || 'client';
}

/** The user shape the client already expects — minus anything secret. */
function publicUser(user: any) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    isAdmin: user.isAdmin === true,
    userType: user.userType || (user.isAdmin ? 'paralegal' : 'client'),
    supervisingParalegalId: user.supervisingParalegalId || '',
    allowFinancialView: user.allowFinancialView === true,
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  // CSRF defence. Note: a MISSING Origin now fails (the old checks let it
  // through), and this sits alongside — never instead of — real auth.
  if (!assertSameOrigin(request)) {
    return json({ success: false, message: 'Forbidden origin.' }, 403);
  }

  let body: LoginBody;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid request body.' }, 400);
  }

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';
  if (!email || !password) {
    return json({ success: false, message: 'Email and password are required.' }, 400);
  }

  const apiKey = getSecretValue(locals, 'LA_WIX_API_KEY');
  const siteId = getSecretValue(locals, 'LA_WIX_SITE_ID');
  const sessionSecret = getSecretValue(locals, 'LA_SESSION_SECRET');

  // Fail CLOSED on misconfiguration — never fall back to "allow".
  if (!apiKey || !siteId) {
    return json(
      {
        success: false,
        message:
          'Server auth is not configured (LA_WIX_API_KEY / LA_WIX_SITE_ID missing).',
      },
      500
    );
  }
  if (!sessionSecret) {
    return json(
      {
        success: false,
        message: 'Server auth is not configured (LA_SESSION_SECRET missing).',
      },
      500
    );
  }

  const wixClient = createClient({
    modules: { items: wixDataItems },
    auth: ApiKeyStrategy({ apiKey, siteId }),
  });

  try {
    // Look the account up server-side. Only this one row is ever loaded, and
    // its hash never leaves the worker.
    const resp: any = await wixClient.items
      .query('useraccounts')
      .eq('email', email)
      .limit(2)
      .find();

    const user: any = (resp?.items || [])[0];

    // Always run a hash comparison — even when the user does not exist — so the
    // timing of "no such user" and "wrong password" stay closer together. Both
    // return the SAME generic message.
    const stored = user?.passwordHash || '';
    const result = await verifyPassword(
      password,
      stored ||
        'pbkdf2$210000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
    );

    if (!user || !result.ok) {
      return json({ success: false, message: 'Invalid email or password' }, 401);
    }

    if (user.accountStatus === 'suspended') {
      return json(
        { success: false, message: 'Your account has been suspended. Please contact support.' },
        403
      );
    }
    if (user.accountStatus === 'inactive') {
      return json(
        { success: false, message: 'Your account is inactive. Please contact support.' },
        403
      );
    }

    // ---- transparent upgrade: legacy SHA-256 -> PBKDF2 ------------------
    if (result.needsUpgrade) {
      try {
        const upgraded = await hashPassword(password);
        await wixClient.items.update('useraccounts', {
          ...user,
          passwordHash: upgraded,
        });
      } catch (err) {
        // Never block a valid login because the re-hash write failed; we'll
        // simply try again on their next login.
        console.warn('[session/login] password re-hash failed:', err);
      }
    }

    // ---- 2FA: do not mint a session yet --------------------------------
    if (user.twoFactorEnabled) {
      return json({
        success: true,
        requires2FA: true,
        email: user.email,
        message: 'Two-factor verification required.',
      });
    }

    // ---- issue the signed session cookie --------------------------------
    const token = await signSession(
      { uid: user._id, email: user.email, role: resolveRole(user) },
      sessionSecret
    );

    return json({ success: true, user: publicUser(user) }, 200, {
      'Set-Cookie': buildSessionCookie(token, SESSION_TTL_SECONDS),
    });
  } catch (err: any) {
    console.error('[session/login] failed:', err?.message || err);
    return json({ success: false, message: 'Login failed. Please try again.' }, 500);
  }
};
