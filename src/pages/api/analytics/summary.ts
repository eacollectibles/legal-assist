import type { APIRoute } from 'astro';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

/**
 * GET /api/analytics/summary
 *
 * Aggregates the `siteanalytics` collection into the numbers the
 * paralegal dashboard wants to display:
 *
 *   liveVisitors:     distinct sessionIds seen in the last 5 minutes
 *   visitsThisWeek:   row count where timestamp >= now - 7 days
 *   visitsToday:      row count for today (midnight to now)
 *   dailyCounts:      [{day: 'Mon', count: N}, ...] — 7 days back, oldest → newest
 *   topPages:         [{path, count}] — top 5 by visit count this week
 *   topReferrers:     [{referrer, count}] — top 5 external referrers
 *
 * Cached for 30 seconds on the edge so polling clients don't
 * hammer the CMS. The dashboard polls every 30 sec which lines
 * up with the cache; in practice each dashboard tab triggers
 * one CMS read every ~60 seconds.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

const FIVE_MIN_MS = 5 * 60 * 1000;
const SEVEN_DAY_MS = 7 * 24 * 60 * 60 * 1000;

function json(body: any, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=30',
      ...extraHeaders,
    },
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

/** YYYY-MM-DD in the user's local TZ (we use UTC for consistency across edge). */
function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Short weekday label for the 7-day sparkline. */
function weekdayShort(d: Date): string {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getUTCDay()];
}

export const GET: APIRoute = async ({ request, locals }) => {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    // No credentials → return an empty stub so the dashboard
    // renders zeros instead of crashing.
    return json({
      success: true,
      liveVisitors: 0,
      visitsToday: 0,
      visitsThisWeek: 0,
      dailyCounts: [],
      topPages: [],
      topReferrers: [],
      configured: false,
    });
  }

  try {
    const wixClient = createClient({
      modules: { items: wixDataItems },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    // Pull the last 7 days only — old rows shouldn't affect the
    // weekly summary. Use the timestamp index for fast scan.
    const cutoff = new Date(Date.now() - SEVEN_DAY_MS);
    const all: any[] = [];
    let cursor = 0;
    for (;;) {
      const resp: any = await wixClient.items
        .query('siteanalytics')
        .ge('timestamp', cutoff)
        .skip(cursor)
        .limit(1000)
        .find();
      const items: any[] = resp?.items || [];
      all.push(...items);
      if (items.length < 1000) break;
      cursor += 1000;
      if (cursor > 50_000) break; // Safety stop.
    }

    const now = Date.now();
    const fiveMinAgo = now - FIVE_MIN_MS;
    const startOfTodayUTC = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
      )
    ).getTime();

    // Live visitors — distinct sessions in last 5 minutes.
    const recentSessions = new Set<string>();
    let visitsToday = 0;
    let visitsThisWeek = all.length;
    const dailyMap = new Map<string, { day: string; count: number }>();
    const pageMap = new Map<string, number>();
    const refMap = new Map<string, number>();

    // Seed 7-day buckets so empty days still show.
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000);
      dailyMap.set(dayKey(d), { day: weekdayShort(d), count: 0 });
    }

    for (const r of all) {
      const ts = new Date(r.timestamp).getTime();
      if (ts >= fiveMinAgo) recentSessions.add(r.sessionId);
      if (ts >= startOfTodayUTC) visitsToday++;
      const k = dayKey(new Date(ts));
      const bucket = dailyMap.get(k);
      if (bucket) bucket.count++;
      if (r.path) {
        pageMap.set(r.path, (pageMap.get(r.path) || 0) + 1);
      }
      if (r.referrer) {
        // Strip our own host from the referrer list — we want external
        // sources only, not internal navigation.
        try {
          const u = new URL(r.referrer);
          if (
            u.hostname !== 'www.legalassist.london' &&
            u.hostname !== 'legalassist.london'
          ) {
            refMap.set(u.hostname, (refMap.get(u.hostname) || 0) + 1);
          }
        } catch {
          /* malformed referrer — skip */
        }
      }
    }

    const topPages = [...pageMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));

    const topReferrers = [...refMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count }));

    return json({
      success: true,
      liveVisitors: recentSessions.size,
      visitsToday,
      visitsThisWeek,
      dailyCounts: [...dailyMap.values()],
      topPages,
      topReferrers,
      configured: true,
    });
  } catch (err: any) {
    return json({
      success: false,
      error: err?.message || String(err),
      liveVisitors: 0,
      visitsToday: 0,
      visitsThisWeek: 0,
      dailyCounts: [],
      topPages: [],
      topReferrers: [],
    });
  }
};
