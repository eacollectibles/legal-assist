import { CheckCircle2, Circle, FileText, FolderOpen, Send, Calendar, Trophy } from 'lucide-react';

/**
 * CaseStatusTimeline — five-stage progress timeline for the
 * client portal. Each stage shows whether it's completed, current,
 * or upcoming, plus the date stamp and the paralegal's note.
 *
 * Stages:
 *   1. Retainer Signed       — the engagement is formalised
 *   2. File Opened            — matter docketed, intake complete
 *   3. Documents Filed        — application/defence/motion served
 *   4. Hearing Scheduled      — date confirmed by tribunal
 *   5. Resolved               — order/judgment/settlement final
 *
 * Data shape on clientfiles row:
 *   fileStage: 1..5 (or 0 for "not started")
 *   fileStageNote: free-text update from the paralegal
 *   fileStageUpdatedDate: ISO timestamp of last update
 *
 * Read-only here — paralegal-side edit UI lives on FilesTab.
 *
 * If fileStage is missing or 0, we still render a quiet "Awaiting
 * status update" tile so the client knows the section exists.
 */

export interface CaseStatusFile {
  _id?: string;
  fileNumber?: string;
  matterType?: string;
  fileStage?: number;
  fileStageNote?: string;
  fileStageUpdatedDate?: string | Date;
}

const STAGES = [
  { num: 1, label: 'Retainer Signed', Icon: FileText },
  { num: 2, label: 'File Opened', Icon: FolderOpen },
  { num: 3, label: 'Documents Filed', Icon: Send },
  { num: 4, label: 'Hearing Scheduled', Icon: Calendar },
  { num: 5, label: 'Resolved', Icon: Trophy },
] as const;

export default function CaseStatusTimeline({ file }: { file: CaseStatusFile }) {
  const stage = Math.max(0, Math.min(5, Number(file.fileStage || 0)));
  const updated = file.fileStageUpdatedDate
    ? new Date(file.fileStageUpdatedDate)
    : null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            Where's my case?
          </h3>
          <p className="text-xs text-foreground/60">
            {file.matterType
              ? `${file.matterType}${file.fileNumber ? ` · File ${file.fileNumber}` : ''}`
              : 'Your current matter'}
          </p>
        </div>
        {stage > 0 && (
          <span className="text-[10px] uppercase tracking-wide text-foreground/50">
            Stage {stage} of 5
          </span>
        )}
      </div>

      {stage === 0 ? (
        <div className="py-6 text-center text-sm text-foreground/40">
          Your paralegal will update this section as your matter
          progresses. Check back soon.
        </div>
      ) : (
        <>
          {/* Horizontal stepper. Uses pure CSS — no chart library. */}
          <div className="flex items-center mb-5">
            {STAGES.map((s, i) => {
              const done = s.num < stage;
              const current = s.num === stage;
              const Icon = done ? CheckCircle2 : current ? s.Icon : Circle;
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        done
                          ? 'bg-emerald-500 text-white'
                          : current
                            ? 'bg-primary text-white ring-4 ring-primary/20'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span
                      className={`text-[10px] mt-1 text-center font-medium ${
                        done || current ? 'text-foreground' : 'text-foreground/40'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 -mt-5 ${
                        done ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Paralegal's update note */}
          {file.fileStageNote && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 mb-2">
              <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-1">
                Latest update
              </p>
              <p className="text-sm text-foreground/90">{file.fileStageNote}</p>
            </div>
          )}
          {updated && (
            <p className="text-[10px] text-foreground/40">
              Last updated{' '}
              {updated.toLocaleDateString('en-CA', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          )}
        </>
      )}
    </div>
  );
}
