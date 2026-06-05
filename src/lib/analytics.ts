/**
 * Lightweight page-view tracker.
 *
 * Fires once per route change. Uses a per-session UUID kept in
 * sessionStorage so back/refresh inside a single tab dedupes.
 * Throttles to one event per (path, session) per 30 seconds so
 * the SPA's repeated effect-firing during a single navigation
 * doesn't bloat the row count.
 *
 * Failure-tolerant: any error swallowed silently. Analytics
 * must never affect the user-facing experience.
 *
 * Privacy: only path + referrer + a synthetic sessionId travel
 * to the server. No IP, no PII, no fingerprint. Cookie-free.
 */

const SESSION_KEY = 'la_analytics_session';
const THROTTLE_MS = 30_000;
const recentSends = new Map<string, number>();

function getSessionId(): string {
  if (typeof window === 'undefined' || !('sessionStorage' in window)) {
    return 'no-storage';
  }
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      // Prefer crypto.randomUUID — falls back to Math.random for older browsers
      // that show up in older Android stock browser stats.
      const uuid =
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`);
      window.sessionStorage.setItem(SESSION_KEY, uuid);
      id = uuid;
    }
    return id;
  } catch {
    return `s-${Date.now()}`;
  }
}

export async function trackPageView(path: string): Promise<void> {
  if (typeof window === 'undefined') return;

  // Honor Do Not Track. Cheap respect that doesn't change anything
  // material — it just lets the privacy-conscious opt out without us
  // having to ship a banner.
  const dnt =
    (navigator as any).doNotTrack === '1' ||
    (navigator as any).msDoNotTrack === '1' ||
    (window as any).doNotTrack === '1';
  if (dnt) return;

  const sessionId = getSessionId();
  const throttleKey = `${sessionId}|${path}`;
  const last = recentSends.get(throttleKey) || 0;
  const now = Date.now();
  if (now - last < THROTTLE_MS) return;
  recentSends.set(throttleKey, now);

  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Keep the request small — server only needs these three.
      body: JSON.stringify({
        path,
        referrer: document.referrer || '',
        sessionId,
      }),
      // Use keepalive so an in-flight pageview survives the SPA
      // unmount when the user navigates away mid-fetch.
      keepalive: true,
    });
  } catch {
    /* swallow */
  }
}
