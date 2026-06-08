/**
 * Trust Alerts Card — dashboard-home widget.
 *
 * Surfaces active client files whose trust balance is below the alert
 * threshold so low retainers are seen daily without navigating to the
 * Trust Top-Up page. Balance math mirrors TrustTopUpPage / Trust
 * Accounting (By-Law 9 Form 9A signs) exactly.
 *
 * Rendered on ParalegalDashboardPageNew below the Deadline Tracker.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface FinRec {
  fileId?: string;
  journalType?: string;
  transactionType?: string;
  amount?: number;
}
interface FileRow {
  _id: string;
  fileNumber?: string;
  clientName?: string;
  fileStatus?: string;
}

// Same signs as TrustTopUpPage / Trust Accounting journal.
const TRUST_SIGN: Record<string, number> = {
  trust_deposit: 1, billing: 1, payment: 1,
  trust_withdrawal: -1, disbursement: -1, refund: -1, transfer: -1,
};
const NON_FINANCIAL = new Set(['deadline', 'conflict_search']);
const isTrustRec = (r: FinRec) => !r.journalType || r.journalType === 'trust';

const THRESHOLD = 500; // matches the Trust Top-Up page default

const money = (n: number) =>
  '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TrustAlertsCard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileRow[]>([]);
  const [recs, setRecs] = useState<FinRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [filesR, finR]: any = await Promise.all([
          BaseCrudService.getAllPages('clientfiles'),
          BaseCrudService.getAllPages('financialrecords'),
        ]);
        if (!alive) return;
        setFiles(filesR?.items || []);
        setRecs(finR?.items || []);
      } catch { /* non-fatal widget */ }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const low = useMemo(() => {
    const balance: Record<string, number> = {};
    recs.forEach(r => {
      if (NON_FINANCIAL.has(r.transactionType || '')) return;
      if (!isTrustRec(r) || !r.fileId) return;
      const sign = TRUST_SIGN[r.transactionType || ''] ?? 0;
      balance[r.fileId] = (balance[r.fileId] || 0) + sign * (Number(r.amount) || 0);
    });
    return files
      .filter(f => (f.fileStatus || 'active') !== 'closed')
      .map(f => ({ f, bal: balance[f._id] || 0 }))
      .filter(x => x.bal < THRESHOLD)
      .sort((a, b) => a.bal - b.bal);
  }, [files, recs]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          Trust Alerts
          {!loading && low.length > 0 && (
            <span className="text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded-full px-2 py-0.5">
              {low.length} below {money(THRESHOLD)}
            </span>
          )}
        </h2>
        <button
          onClick={() => navigate('/admin/trust-top-up')}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Trust Top-Up <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="py-6 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-foreground/30" />
        </div>
      ) : low.length === 0 ? (
        <p className="text-sm text-foreground/55 flex items-center gap-2 py-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          All active files are at or above {money(THRESHOLD)} in trust.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {low.slice(0, 5).map(({ f, bal }) => (
            <li key={f._id} className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{f.clientName || 'Unnamed'}</p>
                <p className="text-xs text-foreground/50 font-mono">{f.fileNumber || f._id.slice(0, 6)}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${bal <= 0 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                {money(bal)}
              </span>
            </li>
          ))}
          {low.length > 5 && (
            <li className="pt-2 text-xs text-foreground/50">+ {low.length - 5} more on the Trust Top-Up page</li>
          )}
        </ul>
      )}
    </div>
  );
}
