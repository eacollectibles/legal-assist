import { useEffect, useState } from 'react';
import { Activity, TrendingUp, ExternalLink, Globe } from 'lucide-react';

/**
 * Site Analytics Widget — paralegal dashboard Overview module.
 *
 * Two stat cards + a 7-day sparkline + a Top Pages / Top Referrers
 * table. Polls /api/analytics/summary every 30 seconds. The endpoint
 * is edge-cached for 30 sec so polling is effectively free.
 *
 * Designed to fit alongside the existing 6 stat cards without
 * dominating the layout. The pulse dot on Live Visitors and the
 * sparkline on Visits This Week make the panel feel alive without
 * adding any new chart library — pure CSS.
 */

interface AnalyticsSummary {
  success: boolean;
  liveVisitors: number;
  visitsToday: number;
  visitsThisWeek: number;
  dailyCounts: Array<{ day: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  configured?: boolean;
}

const POLL_MS = 30_000;

export default function AnalyticsWidget() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/analytics/summary');
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load analytics');
        }
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (error && !data) {
    // Stay quiet if analytics is genuinely broken — never block the
    // dashboard with an angry error card.
    return null;
  }

  const live = data?.liveVisitors ?? 0;
  const week = data?.visitsThisWeek ?? 0;
  const today = data?.visitsToday ?? 0;
  const daily = data?.dailyCounts ?? [];
  const maxDaily = Math.max(1, ...daily.map((d) => d.count));

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-base font-semibold text-foreground">
          Site Traffic
        </h3>
        {data?.configured === false && (
          <span
            className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded"
            title="LA_WIX_API_KEY + LA_WIX_SITE_ID not configured — analytics queries return zero."
          >
            not configured
          </span>
        )}
      </div>

      {/* Three primary numbers */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-100">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {live > 0 && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  live > 0 ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              />
            </span>
            <Activity className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="text-xl font-bold text-foreground mt-1">{live}</div>
          <div className="text-[10px] text-foreground/60 uppercase tracking-wide">
            Live now
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 border border-blue-100">
          <Globe className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <div className="text-xl font-bold text-foreground mt-1">
            {today.toLocaleString()}
          </div>
          <div className="text-[10px] text-foreground/60 uppercase tracking-wide">
            Today
          </div>
        </div>

        <div className="rounded-lg bg-violet-50 p-3 border border-violet-100">
          <TrendingUp className="w-3.5 h-3.5 text-violet-600" aria-hidden="true" />
          <div className="text-xl font-bold text-foreground mt-1">
            {week.toLocaleString()}
          </div>
          <div className="text-[10px] text-foreground/60 uppercase tracking-wide">
            This week
          </div>
        </div>
      </div>

      {/* 7-day sparkline */}
      {daily.length > 0 && (
        <div className="mb-4">
          <div className="flex items-end gap-1 h-12">
            {daily.map((d) => {
              const h = Math.max(4, Math.round((d.count / maxDaily) * 48));
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-0.5"
                  title={`${d.day}: ${d.count} visits`}
                >
                  <div
                    className="w-full bg-violet-200 rounded-t hover:bg-violet-400 transition-colors"
                    style={{ height: `${h}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-1 mt-1">
            {daily.map((d) => (
              <div
                key={d.day + '-l'}
                className="flex-1 text-center text-[9px] text-foreground/40"
              >
                {d.day[0]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top pages + referrers — compact two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <h4 className="text-[10px] uppercase tracking-wide text-foreground/50 font-semibold mb-1">
            Top pages
          </h4>
          <ul className="space-y-1">
            {(data?.topPages ?? []).slice(0, 5).map((p) => (
              <li
                key={p.path}
                className="flex items-center justify-between text-xs"
              >
                <span className="truncate text-foreground/80 flex-1 mr-2">
                  {p.path === '/' ? 'Home' : p.path}
                </span>
                <span className="text-foreground/60 font-mono tabular-nums">
                  {p.count}
                </span>
              </li>
            ))}
            {(data?.topPages ?? []).length === 0 && (
              <li className="text-xs text-foreground/40 italic">No visits yet this week</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-wide text-foreground/50 font-semibold mb-1">
            Top sources
          </h4>
          <ul className="space-y-1">
            {(data?.topReferrers ?? []).slice(0, 5).map((r) => (
              <li
                key={r.referrer}
                className="flex items-center justify-between text-xs"
              >
                <span className="truncate text-foreground/80 flex-1 mr-2 inline-flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {r.referrer}
                </span>
                <span className="text-foreground/60 font-mono tabular-nums">
                  {r.count}
                </span>
              </li>
            ))}
            {(data?.topReferrers ?? []).length === 0 && (
              <li className="text-xs text-foreground/40 italic">Mostly direct traffic</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
