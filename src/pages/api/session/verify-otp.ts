import type { APIRoute } from 'astro';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

import { signSession, buildSessionCookie, SESSION_TTL_SECONDS } from '@/lib/server/session';
import { assertSameOrigin, getSecretValue, json } from '@/lib/server/require-auth';

/**
 * POST /api/session/verify-otp   { email, code }
 *
 * Completes login for accounts with twoFactorEnabled. /api/session/login stops
 * short of issuing a session for those accounts and returns requires2FA; this
 * endpoint checks the emailed 6-digit code and, on success, mints the session
 * cookie. Without this, 2FA users would authenticate but never receive a
 * server-verifiable session, and every guarded /api/* call would 401 for them.
 *
 * (Lives under /api/session/ rather than /api/auth/ because @wix/astro already
 * defines routes at /api/auth/*.)
 *
 * The OTP + expiry live on the useraccounts row (written by the login flow).
 * We clear them on success so a code cannot be replayed.
 */

interface Body {
  email?: string;
  code?: string;
}

function resolveRole(user: any): string {
  if (user?.isAdmin === true) return 'admin';
  return user?.userType || 'client';
}

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

/** Constant-time string compare so we don't leak the code via timing. */
function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!assertSameOrigin(request)) {
    return json({ success: false, message: 'Forbidden origin.' }, 403);
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid request body.' }, 400);
  }

  const email = (body.email || '').trim().toLowerCase();
  const code = (body.code || '').trim();
  if (!email || !code) {
    return json({ success: false, message: 'Email and code are required.' }, 400);
  }

  const apiKey = getSecretValue(locals, 'LA_WIX_API_KEY');
  const siteId = getSecretValue(locals, 'LA_WIX_SITE_ID');
  const sessionSecret = getSecretValue(locals, 'LA_SESSION_SECRET');
  if (!apiKey || !siteId || !sessionSecret) {
    return json({ success: false, message: 'Server auth is not configured.' }, 500);
  }

  const wixClient = createClient({
    modules: { items: wixDataItems },
    auth: ApiKeyStrategy({ apiKey, siteId }),
  });

  try {
    const resp: any = await wixClient.items
      .query('useraccounts')
      .eq('email', email)
      .limit(2)
      .find();
    const user: any = (resp?.items || [])[0];

    if (!user || !user.otpCode) {
      return json({ success: false, message: 'Invalid or expired code.' }, 401);
    }

    const expired =
      !user.otpExpiry || new Date(user.otpExpiry).getTime() < Date.now();
    if (expired) {
      return json({ success: false, message: 'Invalid or expired code.' }, 401);
    }

    if (!timingSafeEqualStr(String(user.otpCode), code)) {
      return json({ success: false, message: 'Invalid or expired code.' }, 401);
    }

    // Burn the code so it cannot be replayed.
    try {
      await wixClient.items.update('useraccounts', {
        ...user,
        otpCode: '',
        otpExpiry: '',
      });
    } catch (err) {
      console.warn('[session/verify-otp] failed to clear OTP:', err);
    }

    const token = await signSession(
      { uid: user._id, email: user.email, role: resolveRole(user) },
      sessionSecret
    );

    return json({ success: true, user: publicUser(user) }, 200, {
      'Set-Cookie': buildSessionCookie(token, SESSION_TTL_SECONDS),
    });
  } catch (err: any) {
    console.error('[session/verify-otp] failed:', err?.message || err);
    return json({ success: false, message: 'Verification failed.' }, 500);
  }
};
