import type { APIRoute } from 'astro';
import { buildClearSessionCookie } from '@/lib/server/session';
import { assertSameOrigin, json } from '@/lib/server/require-auth';

/**
 * POST /api/session/logout
 *
 * Clears the httpOnly session cookie. Because sessions are stateless
 * (HMAC-signed, no server-side session table), this is the only revocation
 * mechanism — which is precisely why the TTL is short (12h). If you later need
 * true server-side revocation, add a token-version field on the useraccounts
 * row and include it in the signed payload.
 *
 * (Lives under /api/session/ rather than /api/auth/ because @wix/astro already
 * defines its own /api/auth/logout route — a same-path definition collides.)
 */
export const POST: APIRoute = async ({ request }) => {
  if (!assertSameOrigin(request)) {
    return json({ success: false, message: 'Forbidden origin.' }, 403);
  }
  return json({ success: true }, 200, {
    'Set-Cookie': buildClearSessionCookie(),
  });
};
