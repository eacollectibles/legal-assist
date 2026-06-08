/**
 * Unbilled Time Card — dashboard-home widget.
 *
 * Flags client files that have logged docket time which has not been
 * invoiced for 30+ days. Work-in-progress that never gets billed is lost
 * revenue, so this surfaces it the same way Trust Alerts surfaces low
 * retainers.
 *
 * A docket entry is a `financialrecords` row with
 * transactionType === 'docket_entry'. Its meta JSON (stored in the
 * `trustAccountId` field by TimeBillingPage) carries hours + a `status`;
 * an entry counts as UNBILLED when it has no invoiceNumber and its meta
 * status is not 'billed'. Grouped by file, oldest first.
 *
 * Rendered on ParalegalDashboardPageNew beside the Trust Alerts card.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface FinRec {
  fileId?: string;
  clientId?: string;
  transactionType?: string;
  amount?: number;
  transactionDate?: string | Date;
  invoiceNumber?: string;
  trustAccountId?: string; // meta JSON for docket entries
  isDeleted?: boolean;
}
interface FileRow { _id: string; fileNumber?: string; clientName?: string; clientId?: string; fileStatus?: string; }

const AGE_DAYS = 30;
const money = (n: number) => '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function metaStatus(r: FinRec): string {
  try { return (JSON.parse(r.trustAccountId || '{}').status || '').toLowerCase(); } catch { return ''; }
}

export default function UnbilledTimeCard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileRow[]>([]);
  const [recs, setRecs] = useState<FinRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [f, r]: any = await Promise.all([
          BaseCrudService.getAllPages('clientfiles'),
          BaseCrudService.getAllPages('financialrecords'),
        ]);
        if (!alive) return;
        setFiles(f?.items || []);
        setRecs(r?.items || []);
      } catch { /* non-fatal widget */ }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const flagged = useMemo(() => {
    const cutoff = Date.now() - AGE_DAYS * 24 * 60 * 60 * 1000;
    const byFile: Record<string, { amount: number; oldest: number; count: number }> = {};

    recs.forEach(r => {
      if (r.isDeleted) return;
      if (r.transactionType !== 'docket_entry') return;
      const billed = !!(r.invoiceNumber && r.invoiceNumber.trim()) || metaStatus(r) === 'billed';
      if (billed) return;
      if (!r.fileId) return;
      const t = r.transactionDate ? new Date(r.transactionDate).getTime() : Date.now();
      const g = (byFile[r.fileId] ||= { amount: 0, oldest: t, count: 0 });
      g.amount += Number(r.amount) || 0;
      g.oldest = Math.min(g.oldest, t);
      g.count += 1;
    });

    const fileMap: Record<string, FileRow> = {};
    files.forEach(f => { fileMap[f._id] = f; });

    return Object.entries(byFile)
      .filter(([, g]) => g.oldest <= cutoff)               // oldest unbilled entry is 30+ days old
      .map(([fileId, g]) => ({ f: fileMap[fileId], ...g, ageDays: Math.floor((Date.now() - g.oldest) / 86400000) }))
      .filter(x => x.f && (x.f.fileStatus || 'active') !== 'closed')
      .sort((a, b) => b.ageDays - a.ageDays);
  }, [files, recs]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Unbilled Time
          {!loading && flagged.length > 0 && (
            <span className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
              {flagged.length} file(s) 30+ days
            </span>
          )}
        </h2>
        <button onClick={() => navigate('/admin/time-billing')} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
          Time &amp; Billing <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-foreground/30" /></div>
      ) : flagged.length === 0 ? (
        <p className="text-sm text-foreground/55 flex items-center gap-2 py-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          No logged time has gone unbilled past {AGE_DAYS} days.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {flagged.slice(0, 5).map(({ f, amount, ageDays, count }) => (
            <li key={f!._id} className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{f!.clientName || 'Unnamed'}</p>
                <p className="text-xs text-foreground/50">
                  {f!.fileNumber ? <span className="font-mono">{f!.fileNumber}</span> : null}
                  {f!.fileNumber ? ' · ' : ''}{count} entr{count === 1 ? 'y' : 'ies'} · oldest {ageDays}d
                </p>
              </div>
              {amount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200 whitespace-nowrap">
                  {money(amount)}
                </span>
              )}
            </li>
          ))}
          {flagged.length > 5 && (
            <li className="pt-2 text-xs text-foreground/50">+ {flagged.length - 5} more on the Time &amp; Billing page</li>
          )}
        </ul>
      )}
    </div>
  );
}
