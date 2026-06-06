/**
 * Limitation & Deadline Calculator.
 *
 * Pick a matter type + the key date (incident / service / conviction),
 * and it computes every applicable Ontario limitation and procedural
 * deadline at once. Select a client file and push the chosen deadlines
 * into the existing Deadline Tracker (stored in `financialrecords` with
 * transactionType 'deadline', the same format the tracker reads).
 *
 * Route: /admin/limitation-calculator
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock, ArrowLeft, AlertTriangle, CheckCircle2, Loader2, Plus,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, isAdmin } from '@/lib/auth-service';
import {
  MATTER_TYPES, KEY_DATE_TYPES, computeDeadlines, getMatter, matterKeyFromFile,
  type ComputedDeadline,
} from '@/lib/limitation-rules';

interface FileRow {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  matterType?: string;
}

const sevClass: Record<ComputedDeadline['severity'], string> = {
  overdue: 'bg-red-100 text-red-800 border-red-200',
  critical: 'bg-orange-100 text-orange-800 border-orange-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  ok: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};
const sevLabel: Record<ComputedDeadline['severity'], string> = {
  overdue: 'Overdue', critical: 'Critical', warning: 'Upcoming', ok: 'On track',
};

export default function LimitationCalculatorPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileRow[]>([]);
  const [matterKey, setMatterKey] = useState('traffic');
  const [keyDate, setKeyDate] = useState('');
  const [keyDateType, setKeyDateType] = useState('incident');
  const [fileId, setFileId] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const me = getCurrentUser();
    if (!me || !isAdmin()) { navigate('/login'); return; }
    void loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadFiles = async () => {
    try {
      const r: any = await BaseCrudService.getAll('clientfiles', undefined, { limit: 1000 });
      const all: FileRow[] = r?.items || r || [];
      all.sort((a, b) => (a.clientName || '').localeCompare(b.clientName || ''));
      setFiles(all);
    } catch { /* non-fatal */ }
  };

  const deadlines = useMemo(
    () => computeDeadlines(matterKey, keyDate),
    [matterKey, keyDate]
  );
  const fileMap = useMemo(() => {
    const m: Record<string, FileRow> = {};
    files.forEach(f => { m[f._id] = f; });
    return m;
  }, [files]);

  // When a file is picked, default the matter type to the file's.
  const onPickFile = (id: string) => {
    setFileId(id);
    const f = fileMap[id];
    const k = matterKeyFromFile(f?.matterType);
    if (k) setMatterKey(k);
  };

  const toggle = (ruleId: string) =>
    setSelected(s => ({ ...s, [ruleId]: !s[ruleId] }));

  const addToTracker = async () => {
    setMsg('');
    const chosen = deadlines.filter(d => selected[d.ruleId]);
    if (!fileId) { setMsg('Pick a client file to attach these deadlines to.'); return; }
    if (chosen.length === 0) { setMsg('Select at least one deadline to add.'); return; }
    setSaving(true);
    try {
      const f = fileMap[fileId];
      let i = 0;
      for (const d of chosen) {
        const meta = {
          deadlineType: d.kind,
          deadlineName: d.name,
          deadlineDate: new Date(d.deadlineDate + 'T00:00:00').toISOString(),
          triggerDate: keyDate,
          matterType: matterKey,
          ruleId: d.ruleId,
          notes: `${d.statute} — ${d.triggerDescription}`,
          status: 'active',
        };
        await BaseCrudService.create('financialrecords', {
          _id: crypto.randomUUID(),
          fileId,
          clientId: f?.clientId || '',
          transactionType: 'deadline',
          transactionDate: new Date().toISOString(),
          description: JSON.stringify(meta),
          referenceNumber: `DL-${Date.now()}-${i++}`,
          recordedBy: 'Limitation Calculator',
        });
      }
      setMsg(`Added ${chosen.length} deadline(s) to the Deadline Tracker for ${f?.fileNumber || 'the file'}.`);
      setSelected({});
    } catch (e: any) {
      setMsg(e?.message || 'Could not add deadlines.');
    } finally {
      setSaving(false);
    }
  };

  const selectAll = () => {
    const next: Record<string, boolean> = {};
    deadlines.forEach(d => { next[d.ruleId] = true; });
    setSelected(next);
  };

  const matter = getMatter(matterKey);

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-4xl mx-auto p-6 lg:p-10">
        <button onClick={() => navigate('/paralegal-dashboard')} className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground mb-3">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>
        <div className="flex items-center gap-2 mb-1">
          <CalendarClock className="w-5 h-5 text-primary" />
          <h1 className="font-heading text-3xl font-bold text-foreground">Limitation &amp; Deadline Calculator</h1>
        </div>
        <p className="text-foreground/70 mb-6">
          Pick the matter type and the date the clock starts. Every applicable Ontario limitation and procedural deadline is computed below.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">Matter type</label>
            <select value={matterKey} onChange={e => setMatterKey(e.target.value)} className="w-full text-sm border border-gray-200 rounded px-2 py-2 bg-white">
              {MATTER_TYPES.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">Key date</label>
            <input type="date" value={keyDate} onChange={e => setKeyDate(e.target.value)} className="w-full text-sm border border-gray-200 rounded px-2 py-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">This date is the…</label>
            <select value={keyDateType} onChange={e => setKeyDateType(e.target.value)} className="w-full text-sm border border-gray-200 rounded px-2 py-2 bg-white">
              {KEY_DATE_TYPES.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
            </select>
          </div>
        </div>

        {!keyDate ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-foreground/50">
            Enter a key date to compute deadlines for <span className="font-semibold text-foreground/70">{matter?.label}</span>.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-semibold text-foreground">{matter?.label} — computed deadlines</h2>
              <button onClick={selectAll} className="text-xs text-primary hover:underline">Select all</button>
            </div>
            <ul className="divide-y divide-gray-100">
              {deadlines.map(d => (
                <li key={d.ruleId} className="p-4 flex items-start gap-3">
                  <input type="checkbox" checked={!!selected[d.ruleId]} onChange={() => toggle(d.ruleId)} className="mt-1.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{d.name}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full border ${sevClass[d.severity]}`}>
                        {sevLabel[d.severity]}{d.daysOut >= 0 ? ` · ${d.daysOut}d` : ` · ${Math.abs(d.daysOut)}d ago`}
                      </span>
                      <span className="text-[11px] uppercase tracking-wide text-foreground/40">{d.kind}</span>
                    </div>
                    <p className="text-sm text-foreground mt-0.5">
                      Due <span className="font-semibold">{new Date(d.deadlineDate + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                    <p className="text-xs text-foreground/55 mt-0.5">{d.statute} — {d.triggerDescription}.</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 bg-gray-50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Attach to client file</label>
                  <select value={fileId} onChange={e => onPickFile(e.target.value)} className="w-full text-sm border border-gray-200 rounded px-2 py-2 bg-white">
                    <option value="">(choose a file)</option>
                    {files.map(f => (
                      <option key={f._id} value={f._id}>{f.clientName || 'Unnamed'} — {f.fileNumber || f._id.slice(0, 6)}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => void addToTracker()} disabled={saving}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium rounded px-4 py-2 disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add selected to Deadline Tracker
                </button>
              </div>
              {msg && (
                <p className={`text-sm mt-3 flex items-center gap-1.5 ${msg.startsWith('Added') ? 'text-emerald-700' : 'text-red-600'}`}>
                  {msg.startsWith('Added') ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}{msg}
                </p>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-foreground/45 mt-6">
          General limitation information, not legal advice. Discoverability, special parties (minors / incapable persons), and statutory exceptions can change the actual date — always confirm case-specifically.
        </p>
      </div>
    </div>
  );
}
