/**
 * Trust Top-Up Automation.
 *
 * Computes each client file's trust balance from the trust journal
 * (`financialrecords`, journalType 'trust'), flags files below a
 * threshold, and generates a pre-filled Square `/pay` deep link (and an
 * e-transfer reference) so the paralegal can request a retainer
 * replenishment in one click.
 *
 * Reuses the trust-balance signs from the Trust Accounting page and the
 * /pay query-param contract from PayPage.
 *
 * Route: /admin/trust-top-up
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, ArrowLeft, Loader2, Copy, Mail, Check, AlertTriangle,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, isAdmin } from '@/lib/auth-service';

interface FinRec {
  fileId?: string;
  clientId?: string;
  journalType?: string;
  transactionType?: string;
  amount?: number;
}
interface FileRow {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  fileStatus?: string;
}

// Signs from the Trust Accounting journal (By-Law 9 Form 9A).
const TRUST_SIGN: Record<string, number> = {
  trust_deposit: 1, billing: 1, payment: 1,
  trust_withdrawal: -1, disbursement: -1, refund: -1, transfer: -1,
};
const isTrustRec = (r: FinRec) => !r.journalType || r.journalType === 'trust';

const money = (n: number) => '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TrustTopUpPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileRow[]>([]);
  const [recs, setRecs] = useState<FinRec[]>([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(500);
  const [target, setTarget] = useState(1500);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const me = getCurrentUser();
    if (!me || !isAdmin()) { navigate('/login'); return; }
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const [filesR, finR]: any = await Promise.all([
        BaseCrudService.getAllPages('clientfiles'),
        BaseCrudService.getAllPages('financialrecords'),
      ]);
      setFiles(filesR?.items || filesR || []);
      setRecs(finR?.items || finR || []);
    } finally {
      setLoading(false);
    }
  };

  // Per-file trust balance.
  const balanceByFile = useMemo(() => {
    const m: Record<string, number> = {};
    recs.forEach(r => {
      if (r.transactionType === 'deadline' || r.transactionType === 'conflict_search') return;
      if (!isTrustRec(r) || !r.fileId) return;
      const sign = TRUST_SIGN[r.transactionType || ''] ?? 0;
      m[r.fileId] = (m[r.fileId] || 0) + sign * (Number(r.amount) || 0);
    });
    return m;
  }, [recs]);

  const low = useMemo(() => {
    return files
      .filter(f => (f.fileStatus || 'active') !== 'closed')
      .map(f => ({ f, balance: balanceByFile[f._id] || 0 }))
      .filter(x => x.balance < threshold)
      .map(x => ({ ...x, topUp: Math.max(0, Math.round((target - x.balance) * 100) / 100) }))
      .sort((a, b) => a.balance - b.balance);
  }, [files, balanceByFile, threshold, target]);

  const payLink = (f: FileRow, topUp: number) => {
    const base = 'https://www.legalassist.london/pay';
    const q = new URLSearchParams({
      type: 'trust_deposit',
      amount: String(topUp),
      file: f.fileNumber || '',
      client: f.clientId || '',
      name: f.clientName || '',
      email: f.clientEmail || '',
      note: 'Trust account replenishment',
    });
    return `${base}?${q.toString()}`;
  };
  const etransferRef = (f: FileRow) => `TRUST-${(f.fileNumber || f._id.slice(0, 6)).toUpperCase()}`;

  const copy = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(''), 1500); } catch { /* */ }
  };

  const mailto = (f: FileRow, topUp: number) => {
    const link = payLink(f, topUp);
    const subject = encodeURIComponent(`Trust account replenishment — file ${f.fileNumber || ''}`);
    const body = encodeURIComponent(
      `Hello ${f.clientName || ''},\n\n` +
      `Your trust balance on file ${f.fileNumber || ''} is low. To continue work without interruption, please top up your retainer by ${money(topUp)}.\n\n` +
      `Pay securely by card here:\n${link}\n\n` +
      `Or send an Interac e-Transfer and use reference: ${etransferRef(f)}\n\n` +
      `Thank you,\nLegal Assist Paralegal Services`
    );
    return `mailto:${f.clientEmail || ''}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-foreground/40" /></div>;
  }

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-5xl mx-auto p-6 lg:p-10">
        <button onClick={() => navigate('/paralegal-dashboard')} className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground mb-3">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="w-5 h-5 text-primary" />
          <h1 className="font-heading text-3xl font-bold text-foreground">Trust Top-Up</h1>
        </div>
        <p className="text-foreground/70 mb-6">Flags active files whose trust balance is below your threshold and generates a one-click replenishment request.</p>

        <div className="flex flex-wrap items-end gap-4 mb-6 bg-white rounded-xl border border-gray-200 p-4">
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">Alert when balance is below</label>
            <div className="flex items-center"><span className="text-foreground/60 mr-1">$</span>
              <input type="number" min={0} value={threshold} onChange={e => setThreshold(Math.max(0, Number(e.target.value) || 0))} className="w-28 text-sm border border-gray-200 rounded px-2 py-1.5" /></div>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">Replenish up to</label>
            <div className="flex items-center"><span className="text-foreground/60 mr-1">$</span>
              <input type="number" min={0} value={target} onChange={e => setTarget(Math.max(0, Number(e.target.value) || 0))} className="w-28 text-sm border border-gray-200 rounded px-2 py-1.5" /></div>
          </div>
          <div className="ml-auto text-sm text-foreground/70">
            <span className="text-2xl font-bold text-foreground mr-2">{low.length}</span> file(s) need a top-up
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {low.length === 0 ? (
            <div className="p-10 text-center text-foreground/50">No active files are below {money(threshold)}. 🎉</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {low.map(({ f, balance, topUp }) => (
                <li key={f._id} className="p-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{f.clientName || 'Unnamed'}</span>
                        {f.fileNumber && <span className="text-xs font-mono text-foreground/55 bg-gray-100 px-1.5 py-0.5 rounded">{f.fileNumber}</span>}
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border ${balance <= 0 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          Balance {money(balance)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/55 mt-1">
                        Suggested top-up <span className="font-semibold text-foreground/80">{money(topUp)}</span> · e-Transfer ref <span className="font-mono">{etransferRef(f)}</span>
                        {!f.clientEmail && <span className="text-red-500"> · no email on file</span>}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => void copy(payLink(f, topUp), f._id)}
                        className="inline-flex items-center gap-1.5 text-xs border border-gray-200 rounded px-2.5 py-1.5 hover:bg-gray-50">
                        {copied === f._id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />} {copied === f._id ? 'Copied' : 'Copy pay link'}
                      </button>
                      <a href={mailto(f, topUp)} className="inline-flex items-center gap-1.5 text-xs bg-primary text-white rounded px-2.5 py-1.5 hover:opacity-90">
                        <Mail className="w-3.5 h-3.5" /> Email request
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-start gap-2 text-xs text-foreground/45 mt-6">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Balances are computed from the trust journal (By-Law 9 Form 9A). "Email request" opens your mail client with a prefilled message and the secure pay link — review before sending.</span>
        </div>
      </div>
    </div>
  );
}
