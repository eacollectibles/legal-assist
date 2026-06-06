/**
 * File Retention & Destruction Scheduler (LSO By-Law 7.1).
 *
 * Watches the retention clock on closed client files. Retention runs
 * from the file's close date; once the retention period elapses the file
 * becomes eligible for secure destruction. The workflow is: send the
 * client a destruction notice, then record destruction.
 *
 * Retention period is configurable (default 7 years — aligns with the
 * By-Law 9 trust-record minimum; many firms keep client files 7–10
 * years). Trust-related records should be retained at least the By-Law 9
 * minimum regardless.
 *
 * Reads close dates from the `fileclosing` collection (falls back to
 * clientfiles fields). Destruction workflow state is stored on the
 * clientfiles row: destructionStatus, destructionNoticeSentAt, destroyedAt.
 *
 * Route: /admin/file-retention
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Archive, ArrowLeft, ShieldAlert, Loader2, MailCheck, Trash2, CheckCircle2,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, isAdmin } from '@/lib/auth-service';

interface FileRow {
  _id: string;
  fileNumber?: string;
  clientName?: string;
  clientEmail?: string;
  matterType?: string;
  fileStatus?: string;
  dateClosed?: string;
  retentionExpiryDate?: string;
  destructionStatus?: string;
  destructionNoticeSentAt?: string;
  destroyedAt?: string;
}

type Bucket = 'destroyed' | 'notice_sent' | 'eligible' | 'due_soon' | 'retain';

function addYears(iso: string, years: number): Date {
  const d = new Date(iso);
  d.setFullYear(d.getFullYear() + years);
  return d;
}
function fmt(d?: string | Date | null): string {
  if (!d) return '—';
  const dd = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dd.getTime())) return '—';
  return dd.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function FileRetentionPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<FileRow[]>([]);
  const [closeMap, setCloseMap] = useState<Record<string, { dateClosed?: string; retentionExpiryDate?: string }>>({});
  const [years, setYears] = useState(7);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');

  useEffect(() => {
    const me = getCurrentUser();
    if (!me || !isAdmin()) { navigate('/login'); return; }
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const [filesR, closeR]: any = await Promise.all([
        BaseCrudService.getAll('clientfiles', undefined, { limit: 1000 }),
        BaseCrudService.getAll('fileclosing', undefined, { limit: 1000 }).catch(() => ({ items: [] })),
      ]);
      const files: FileRow[] = filesR?.items || filesR || [];
      const closings: any[] = closeR?.items || closeR || [];
      const cm: Record<string, { dateClosed?: string; retentionExpiryDate?: string }> = {};
      closings.forEach(c => { if (c.fileId) cm[c.fileId] = { dateClosed: c.dateClosed, retentionExpiryDate: c.retentionExpiryDate }; });
      setCloseMap(cm);
      setRows(files.filter(f => (f.fileStatus === 'closed') || cm[f._id]?.dateClosed || f.dateClosed));
    } finally {
      setLoading(false);
    }
  };

  const closedDateOf = (f: FileRow): string | undefined =>
    closeMap[f._id]?.dateClosed || f.dateClosed;

  const retentionUntilOf = (f: FileRow): Date | null => {
    const explicit = closeMap[f._id]?.retentionExpiryDate || f.retentionExpiryDate;
    if (explicit) { const d = new Date(explicit); if (!isNaN(d.getTime())) return d; }
    const cd = closedDateOf(f);
    if (!cd) return null;
    return addYears(cd, years);
  };

  const bucketOf = (f: FileRow): Bucket => {
    if (f.destroyedAt) return 'destroyed';
    const until = retentionUntilOf(f);
    const now = new Date();
    if (f.destructionNoticeSentAt) return 'notice_sent';
    if (until && now >= until) return 'eligible';
    if (until && (until.getTime() - now.getTime()) / 86400000 <= 180) return 'due_soon';
    return 'retain';
  };

  const enriched = useMemo(() => {
    return rows.map(f => ({ f, until: retentionUntilOf(f), bucket: bucketOf(f) }))
      .sort((a, b) => (a.until?.getTime() || Infinity) - (b.until?.getTime() || Infinity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, closeMap, years]);

  const counts = useMemo(() => {
    const c: Record<Bucket, number> = { destroyed: 0, notice_sent: 0, eligible: 0, due_soon: 0, retain: 0 };
    enriched.forEach(e => { c[e.bucket]++; });
    return c;
  }, [enriched]);

  const recordNotice = async (f: FileRow) => {
    setBusy(f._id);
    try {
      const now = new Date().toISOString();
      await BaseCrudService.update('clientfiles', { _id: f._id, destructionNoticeSentAt: now, destructionStatus: 'notice_sent' });
      setRows(prev => prev.map(p => p._id === f._id ? { ...p, destructionNoticeSentAt: now, destructionStatus: 'notice_sent' } : p));
    } catch (e: any) { alert(e?.message || 'Could not record notice.'); }
    finally { setBusy(''); }
  };

  const markDestroyed = async (f: FileRow) => {
    if (!confirm(`Record secure destruction of ${f.clientName || 'this file'} (${f.fileNumber || ''})? This only logs the destruction date; it does not delete data.`)) return;
    setBusy(f._id);
    try {
      const now = new Date().toISOString();
      await BaseCrudService.update('clientfiles', { _id: f._id, destroyedAt: now, destructionStatus: 'destroyed' });
      setRows(prev => prev.map(p => p._id === f._id ? { ...p, destroyedAt: now, destructionStatus: 'destroyed' } : p));
    } catch (e: any) { alert(e?.message || 'Could not record destruction.'); }
    finally { setBusy(''); }
  };

  const badge = (b: Bucket) => {
    const map: Record<Bucket, [string, string]> = {
      destroyed: ['Destroyed', 'bg-gray-200 text-gray-600 border-gray-300'],
      notice_sent: ['Notice sent', 'bg-blue-50 text-blue-700 border-blue-200'],
      eligible: ['Eligible for destruction', 'bg-red-50 text-red-700 border-red-200'],
      due_soon: ['Due within 6 months', 'bg-amber-50 text-amber-700 border-amber-200'],
      retain: ['Retain', 'bg-emerald-50 text-emerald-700 border-emerald-200'],
    };
    const [label, cls] = map[b];
    return <span className={`text-[11px] px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>;
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
          <Archive className="w-5 h-5 text-primary" />
          <h1 className="font-heading text-3xl font-bold text-foreground">File Retention &amp; Destruction</h1>
        </div>
        <p className="text-foreground/70 mb-6">LSO By-Law 7.1 — track the retention clock on closed files and manage secure destruction.</p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(['eligible', 'due_soon', 'retain', 'notice_sent', 'destroyed'] as Bucket[]).map(b => (
            <div key={b} className="bg-white rounded-lg border border-gray-200 px-4 py-2">
              <span className="text-lg font-bold text-foreground mr-2">{counts[b]}</span>{badge(b)}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm">
            <label className="text-foreground/70">Retention period</label>
            <input type="number" min={1} max={20} value={years} onChange={e => setYears(Math.max(1, Number(e.target.value) || 7))} className="w-16 text-sm border border-gray-200 rounded px-2 py-1" />
            <span className="text-foreground/70">years</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {enriched.length === 0 ? (
            <div className="p-10 text-center text-foreground/50">No closed files yet.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {enriched.map(({ f, until, bucket }) => (
                <li key={f._id} className="p-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{f.clientName || 'Unnamed'}</span>
                      {f.fileNumber && <span className="text-xs font-mono text-foreground/55 bg-gray-100 px-1.5 py-0.5 rounded">{f.fileNumber}</span>}
                      {badge(bucket)}
                    </div>
                    <p className="text-xs text-foreground/55 mt-1">
                      Closed {fmt(closedDateOf(f))} · Retain until <span className="font-semibold text-foreground/70">{fmt(until)}</span>
                      {f.destructionNoticeSentAt && <> · Notice sent {fmt(f.destructionNoticeSentAt)}</>}
                      {f.destroyedAt && <> · Destroyed {fmt(f.destroyedAt)}</>}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {bucket !== 'destroyed' && (bucket === 'eligible' || bucket === 'notice_sent') && (
                      <>
                        {!f.destructionNoticeSentAt && (
                          <button onClick={() => void recordNotice(f)} disabled={busy === f._id}
                            className="inline-flex items-center gap-1.5 text-xs border border-blue-200 text-blue-700 rounded px-2.5 py-1.5 hover:bg-blue-50 disabled:opacity-50">
                            {busy === f._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MailCheck className="w-3.5 h-3.5" />} Record client notice
                          </button>
                        )}
                        <button onClick={() => void markDestroyed(f)} disabled={busy === f._id}
                          className="inline-flex items-center gap-1.5 text-xs border border-red-200 text-red-700 rounded px-2.5 py-1.5 hover:bg-red-50 disabled:opacity-50">
                          <Trash2 className="w-3.5 h-3.5" /> Mark destroyed
                        </button>
                      </>
                    )}
                    {bucket === 'destroyed' && <span className="inline-flex items-center gap-1 text-xs text-gray-500"><CheckCircle2 className="w-3.5 h-3.5" /> Logged</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-start gap-2 text-xs text-foreground/45 mt-6">
          <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>"Mark destroyed" only records the destruction date for your retention log — it does not delete any data. Keep trust-related records for at least the LSO By-Law 9 minimum regardless of this setting, and give the client reasonable notice before destroying a file.</span>
        </div>
      </div>
    </div>
  );
}
