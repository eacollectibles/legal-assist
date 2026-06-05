import type { APIRoute } from 'astro';
// Static imports — Cloudflare Workers blocks `Function('return import')()`.
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

/**
 * POST /api/analytics/track
 *
 * Lightweight server-side page-view recorder. Called once per
 * route change in the SPA (Router.tsx ScrollToTop effect) plus
 * once on first page load. Writes one row to the `siteanalytics`
 * CMS collection through the LA_WIX_API_KEY identity so the
 * client never needs to authenticate against Wix.
 *
 * Body: { path: string, referrer?: string, sessionId: string }
 * Returns: { success: true } | { success: false, error }
 *
 * Throttling is enforced client-side (one event per 30 sec per
 * session per path) — the endpoint itself just trusts what
 * comes in. We deliberately drop requests with bot-like UAs
 * before writing to keep the collection clean.
 *
 * Schema (siteanalytics collection — user creates in Wix CMS):
 *   timestamp:  Date   (required, indexed)
 *   path:       Text   (the SPA route, e.g. "/services/landlord-tenant-board")
 *   sessionId:  Text   (UUID kept in sessionStorage so back/refresh dedupes)
 *   referrer:   Text   (document.referrer at time of the event)
 *   country:    Text   (from CF-IPCountry header)
 *   userAgent:  Text   (truncated to 200 chars)
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

// Bots we deliberately do not record. The list is intentionally tight —
// we want to allow Googlebot/Bingbot etc. to show up in analytics (they
// represent real crawl interest), but we drop obvious headless scrapers.
const BOT_PATTERNS =
  /(curl|wget|python-requests|axios|node-fetch|headlesschrome|puppeteer|playwright|phantomjs)/i;

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getSecret(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

export const POST: APIRoute = async ({ request, locals }) => {
  // 1. Origin gate. Don't accept page-view writes from arbitrary
  //    third-party sites — they could spam our collection.
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  // 2. UA filter. Quick win against obvious automation.
  const ua = request.headers.get('user-agent') || '';
  if (BOT_PATTERNS.test(ua)) {
    // Pretend success so the bot doesn't retry, but don't write.
    return json({ success: true, skipped: 'bot' });
  }

  // 3. Body parse.
  let body: { path?: string; referrer?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON.' }, 400);
  }
  if (!body.path || typeof body.path !== 'string') {
    return json({ success: false, error: 'Missing path.' }, 400);
  }
  if (!body.sessionId || typeof body.sessionId !== 'string') {
    return json({ success: false, error: 'Missing sessionId.' }, 400);
  }
  // Reasonable bounds — avoid arbitrary-length writes.
  if (body.path.length > 500) body.path = body.path.slice(0, 500);
  if (body.sessionId.length > 100) {
    return json({ success: false, error: 'sessionId too long.' }, 400);
  }
  if (body.referrer && body.referrer.length > 500) {
    body.referrer = body.referrer.slice(0, 500);
  }

  // 4. Pull credentials and build the site-context client.
  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    // Don't 500 — silently no-op so missing config doesn't break the
    // user-facing page. Analytics is non-critical.
    return json({ success: true, skipped: 'no credentials' });
  }

  try {
    const wixClient = createClient({
      modules: { items: wixDataItems },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    const country =
      (request.headers.get('cf-ipcountry') || '').slice(0, 4) || '';

    await wixClient.items.insert('siteanalytics', {
      timestamp: new Date(),
      path: body.path,
      sessionId: body.sessionId,
      referrer: body.referrer || '',
      country,
      userAgent: ua.slice(0, 200),
    });

    return json({ success: true });
  } catch (err: any) {
    // Don't surface the error to the caller — analytics failures
    // must NEVER affect the user experience.
    return json({ success: false, error: err?.message || String(err) });
  }
};
