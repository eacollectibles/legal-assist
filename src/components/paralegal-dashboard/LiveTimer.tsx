import { useCallback, useEffect, useState } from 'react';
import { Play, Pause, Square as StopIcon, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { getDefaultParalegal } from '@/lib/paralegals';

/**
 * LiveTimer — floating time-tracking widget for paralegals.
 *
 * Studies of professional billing show live-captured time runs
 * 15–30% higher than reconstructed end-of-day dockets because
 * sub-six-minute interruptions get rounded away. A live timer
 * captures every minute as it happens.
 *
 * Behaviour:
 *   • Floating "Start timer" pill bottom-right.
 *   • Click → modal: pick clientfile + activity code + memo.
 *   • Start → timer begins, pill turns into a live counter.
 *   • Pause / Resume → does NOT split the docket.
 *   • Stop → creates a financialrecords docket_entry row,
 *     transactionType = 'docket_entry', amount = hours × rate
 *     (rate defaults to $120/hr; paralegal can override per file
 *     via rate_config rows elsewhere).
 *   • All state persists in localStorage so a page reload doesn't
 *     drop the running timer.
 *
 * Rate logic: this component bills at a flat $120/hr fallback;
 * real per-matter rates already live in financialrecords as
 * rate_config rows and are applied in invoice generation. The
 * docket_entry written here carries the rate used so invoices
 * can re-cost if needed.
 */

const STORAGE_KEY = 'la.liveTimer.v1';
const DEFAULT_RATE = 120;

const ACTIVITY_CODES = [
  { code: 'A1', label: 'Client communication (email / call)' },
  { code: 'A2', label: 'Document drafting' },
  { code: 'A3', label: 'Legal research' },
  { code: 'A4', label: 'Tribunal preparation' },
  { code: 'A5', label: 'Court/hearing attendance' },
  { code: 'A6', label: 'File review / case management' },
  { code: 'A7', label: 'Disclosure / production review' },
  { code: 'A8', label: 'Negotiation / settlement' },
] as const;

interface TimerState {
  fileId: string;
  clientName: string;
  activityCode: string;
  memo: string;
  /** When the timer began running (ms since epoch). */
  startedAt: number;
  /** Accumulated seconds while paused. */
  accumulatedSec: number;
  /** Is the timer currently advancing? */
  running: boolean;
  rate: number;
}

function loadState(): TimerState | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(s: TimerState | null) {
  try {
    if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function formatHMS(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function LiveTimer() {
  const [state, setState] = useState<TimerState | null>(() => loadState());
  const [modalOpen, setModalOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [draft, setDraft] = useState({
    fileId: '',
    activityCode: 'A1',
    memo: '',
    rate: DEFAULT_RATE,
  });

  // Load client files lazily when the modal opens.
  useEffect(() => {
    if (!modalOpen || files.length > 0) return;
    BaseCrudService.getAll<any>('clientfiles', undefined, { limit: 1000 })
      .then((res: any) => setFiles(res.items || []))
      .catch(() => setFiles([]));
  }, [modalOpen, files.length]);

  // Repaint the timer once per second when running.
  useEffect(() => {
    if (!state?.running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [state?.running]);

  const elapsedSec = state
    ? state.accumulatedSec + (state.running ? Math.floor((Date.now() - state.startedAt) / 1000) : 0)
    : 0;

  const startTimer = useCallback(() => {
    const file = files.find((f) => f._id === draft.fileId);
    if (!file) return;
    const s: TimerState = {
      fileId: draft.fileId,
      clientName: file.clientName || 'Unknown client',
      activityCode: draft.activityCode,
      memo: draft.memo,
      startedAt: Date.now(),
      accumulatedSec: 0,
      running: true,
      rate: draft.rate,
    };
    setState(s);
    saveState(s);
    setModalOpen(false);
  }, [draft, files]);

  const pauseResume = useCallback(() => {
    if (!state) return;
    if (state.running) {
      const nowSec = Math.floor((Date.now() - state.startedAt) / 1000);
      const next: TimerState = {
        ...state,
        running: false,
        accumulatedSec: state.accumulatedSec + nowSec,
        startedAt: Date.now(),
      };
      setState(next);
      saveState(next);
    } else {
      const next: TimerState = { ...state, running: true, startedAt: Date.now() };
      setState(next);
      saveState(next);
    }
  }, [state]);

  const stopAndSave = useCallback(async () => {
    if (!state) return;
    const totalSec = state.accumulatedSec
      + (state.running ? Math.floor((Date.now() - state.startedAt) / 1000) : 0);
    const hours = Math.max(0.1, totalSec / 3600); // minimum 6-min increment
    const amount = +(hours * state.rate).toFixed(2);

    // Write the docket. We use BaseCrudService.create so the same
    // collection-level guards used by the rest of the app apply.
    try {
      await BaseCrudService.create('financialrecords', {
        _id: crypto.randomUUID(),
        transactionType: 'docket_entry',
        clientId: undefined,
        fileId: state.fileId,
        amount,
        transactionDate: new Date(),
        description: JSON.stringify({
          activityCode: state.activityCode,
          memo: state.memo,
          hours: Math.floor(hours),
          minutes: Math.round((hours - Math.floor(hours)) * 60),
          rate: state.rate,
          docketStatus: 'unbilled',
          billingModel: 'hourly',
          source: 'live-timer',
        }),
        recordedBy: getDefaultParalegal().displayName,
      });
    } catch (err) {
      console.error('Failed to save docket', err);
    }
    setState(null);
    saveState(null);
  }, [state]);

  const discard = useCallback(() => {
    if (!confirm('Discard the current timer without saving a docket?')) return;
    setState(null);
    saveState(null);
  }, []);

  // ─── Render ────────────────────────────────────────────────
  if (!state) {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          title="Start a time-tracking timer"
        >
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">Start timer</span>
        </button>

        {modalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Start docket timer</h3>
                <button onClick={() => setModalOpen(false)} className="text-foreground/50">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Client file</Label>
                  <Select
                    value={draft.fileId}
                    onValueChange={(v) => setDraft({ ...draft, fileId: v })}
                  >
                    <SelectTrigger><SelectValue placeholder="Pick a file…" /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {files
                        .filter((f) => (f.fileStatus || '').toLowerCase() !== 'closed')
                        .sort((a, b) => (a.clientName || '').localeCompare(b.clientName || ''))
                        .map((f) => (
                          <SelectItem key={f._id} value={f._id}>
                            {f.clientName || 'Unknown'} — {f.matterType || 'matter'}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Activity code</Label>
                  <Select
                    value={draft.activityCode}
                    onValueChange={(v) => setDraft({ ...draft, activityCode: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_CODES.map((a) => (
                        <SelectItem key={a.code} value={a.code}>
                          {a.code} — {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Memo (optional)</Label>
                  <Input
                    value={draft.memo}
                    onChange={(e) => setDraft({ ...draft, memo: e.target.value })}
                    placeholder="e.g. drafted T2 application, page 1–3"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rate ($/hr)</Label>
                  <Input
                    type="number"
                    value={draft.rate}
                    onChange={(e) => setDraft({ ...draft, rate: +e.target.value || DEFAULT_RATE })}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={startTimer}
                  disabled={!draft.fileId}
                >
                  <Play className="w-4 h-4 mr-1" /> Start
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Active timer pill
  return (
    <div
      className="fixed bottom-6 right-6 z-40 bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex items-center gap-3 min-w-[260px]"
      data-tick={tick}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${state.running ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-foreground/60 truncate">
          {state.clientName} · {state.activityCode}
        </div>
        <div className="font-mono text-lg font-bold text-foreground">
          {formatHMS(elapsedSec)}
        </div>
      </div>
      <button
        onClick={pauseResume}
        className="p-2 rounded-md hover:bg-gray-100"
        title={state.running ? 'Pause' : 'Resume'}
      >
        {state.running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <button
        onClick={stopAndSave}
        className="p-2 rounded-md bg-primary text-white hover:bg-primary/90"
        title="Stop and save docket"
      >
        <StopIcon className="w-4 h-4" />
      </button>
      <button
        onClick={discard}
        className="p-2 rounded-md text-foreground/40 hover:text-foreground"
        title="Discard without saving"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
