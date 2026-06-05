import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { computeDeadlines, type DeadlineRow } from '@/lib/deadlines';

/**
 * Deadline Tracker — paralegal dashboard widget.
 *
 * Surfaces the next hard deadline for every open client file:
 *  • Ontario Limitations Act ceilings (2y general)
 *  • RTA s.135 (1y for LTB matters)
 *  • POA / Highway Traffic Act (15-day / 45-day windows)
 *  • Human Rights Code s.34 (1y)
 *  • Paralegal-set custom deadlines on the clientfile row
 *
 * Colour buckets:
 *   Overdue        — red
 *   ≤ 14 days     — red
 *   ≤ 30 days     — amber
 *   > 30 days     — green
 *
 * The widget caps at 15 rows on the dashboard. Click "View all"
 * to deep-link into Files filtered by matter.
 *
 * LSO context: missing a limitation period is a malpractice trap
 * — this widget exists primarily to reduce that risk.
 */

const COLORS = {
  overdue: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', icon: AlertCircle },
  critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', icon: AlertTriangle },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', icon: Clock },
  ok: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle2 },
} as const;

export default function DeadlineTracker() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BaseCrudService.getAll('clientfiles', undefined, { limit: 1000 })
      .then((res: any) => setFiles(res.items || []))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(() => computeDeadlines(files), [files]);
  // Counts by level.
  const counts = useMemo(() => {
    const c: Record<DeadlineRow['level'], number> = {
      overdue: 0, critical: 0, warning: 0, ok: 0,
    };
    for (const r of rows) c[r.level]++;
    return c;
  }, [rows]);

  const visible = rows.slice(0, 15);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-semibold text-foreground flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-primary" aria-hidden="true" />
          Upcoming Deadlines
        </h3>
        <Link
          to="/admin/files"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-1 mb-3 text-[10px] uppercase tracking-wide">
        {(['overdue', 'critical', 'warning', 'ok'] as const).map((lvl) => {
          const c = COLORS[lvl];
          const labels = {
            overdue: 'Overdue',
            critical: '≤14d',
            warning: '≤30d',
            ok: '>30d',
          } as const;
          return (
            <div
              key={lvl}
              className={`${c.bg} rounded p-1.5 text-center`}
              title={labels[lvl]}
            >
              <div className={`text-sm font-bold ${c.text}`}>{counts[lvl]}</div>
              <div className={c.text}>{labels[lvl]}</div>
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="py-6 text-center text-sm text-foreground/40">Loading…</div>
      ) : visible.length === 0 ? (
        <div className="py-6 text-center text-sm text-foreground/40">
          No upcoming deadlines. Either no open files or no rule-matched
          matter types — set deadlines manually on individual files.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {visible.map((r) => {
            const C = COLORS[r.level];
            const Icon = C.icon;
            const dateStr = new Date(r.deadlineDate).toLocaleDateString('en-CA', {
              month: 'short', day: 'numeric', year: 'numeric',
            });
            const dayLabel =
              r.daysOut < 0
                ? `${Math.abs(r.daysOut)}d overdue`
                : r.daysOut === 0
                  ? 'Today'
                  : `${r.daysOut}d`;
            return (
              <li key={r.fileId}>
                <Link
                  to={`/admin/client-files?file=${r.fileId}`}
                  className="flex items-start gap-2 py-2 hover:bg-gray-50 -mx-2 px-2 rounded-md transition-colors"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${C.bg}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${C.text}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {r.clientName}
                      </p>
                      <span className={`text-[10px] font-semibold ${C.text} flex-shrink-0`}>
                        {dayLabel}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 truncate">
                      {r.matterType} · {r.rule}
                      {r.explicit && (
                        <span className="ml-1 text-[10px] text-foreground/40">
                          (custom)
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-foreground/40">{dateStr}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
