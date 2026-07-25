/**
 * Email Import Dialog
 *
 * Allows paralegals to upload .eml files exported from Outlook (or other
 * email clients) and save them as communication log entries on a client
 * file. Supports batch upload with preview before saving.
 *
 * Workflow:
 *   1. Drag-and-drop or click to upload .eml files
 *   2. Preview parsed emails — date, subject, from/to, direction
 *   3. Deselect any you don't want to import
 *   4. Click Import — each selected email → communicationlog row
 *
 * Direction is auto-detected based on the firm's domain.
 */

import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  X, Upload, Loader2, Mail, CheckCircle, AlertCircle,
  ArrowDownLeft, ArrowUpRight, Paperclip, Trash2,
} from 'lucide-react';
import {
  parseEmlFiles,
  detectDirection,
  buildCommLogSummary,
  buildCommLogDetails,
  type ParsedEmail,
  type EmailImportResult,
} from '@/lib/email-parser';
import { BaseCrudService } from '@/integrations';

// ─── Props ───────────────────────────────────────────────────────────

interface ClientFile {
  _id: string;
  fileNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
}

interface EmailImportDialogProps {
  open: boolean;
  onClose: () => void;
  file: ClientFile;
  /** Called after successful import so the parent can refresh its list */
  onImportComplete?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────

export default function EmailImportDialog({
  open,
  onClose,
  file,
  onImportComplete,
}: EmailImportDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── State ──
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parseResult, setParseResult] = useState<EmailImportResult | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [importDone, setImportDone] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // ── File handling ──
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const emlFiles = Array.from(files).filter(
      (f) => f.name.toLowerCase().endsWith('.eml') || f.type === 'message/rfc822'
    );

    if (emlFiles.length === 0) {
      return;
    }

    setParsing(true);
    setParseResult(null);
    setImportDone(false);
    setImportErrors([]);

    try {
      const result = await parseEmlFiles(emlFiles);
      setParseResult(result);
      // Select all successful by default
      setSelected(new Set(result.success.map((_, i) => i)));
    } catch (err: any) {
      setParseResult({ success: [], errors: [{ filename: 'batch', error: err?.message || 'Parse failed' }] });
    } finally {
      setParsing(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  // ── Selection toggles ──
  const toggleEmail = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (!parseResult) return;
    if (selected.size === parseResult.success.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(parseResult.success.map((_, i) => i)));
    }
  };

  // ── Import handler ──
  const handleImport = async () => {
    if (!parseResult || selected.size === 0) return;

    setImporting(true);
    setImportErrors([]);
    let count = 0;

    for (const idx of Array.from(selected).sort((a, b) => a - b)) {
      const email = parseResult.success[idx];
      if (!email) continue;

      const direction = detectDirection(email);
      const commType = direction === 'inbound' ? 'email_inbound' : 'email_outbound';

      try {
        await BaseCrudService.create('communicationlog', {
          clientId: file.clientId,
          fileId: file._id,
          communicationType: commType,
          communicationDate: email.date.toISOString(),
          summary: buildCommLogSummary(email),
          details: buildCommLogDetails(email, direction),
          author: direction === 'outbound' ? email.from.name || email.from.address : '',
          direction,
          linkedMessageId: email.messageId || undefined,
        });
        count++;
      } catch (err: any) {
        setImportErrors((prev) => [...prev, `${email.subject}: ${err?.message || 'Save failed'}`]);
      }
    }

    setImportedCount(count);
    setImportDone(true);
    setImporting(false);

    if (count > 0 && onImportComplete) {
      onImportComplete();
    }
  };

  // ── Reset for another batch ──
  const handleReset = () => {
    setParseResult(null);
    setSelected(new Set());
    setImportDone(false);
    setImportedCount(0);
    setImportErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!open) return null;

  const selectedEmails = parseResult?.success.filter((_, i) => selected.has(i)) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-cyan-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Import Emails</h2>
              <p className="text-xs text-gray-500">
                {file.fileNumber} — {file.clientName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* ── SUCCESS MESSAGE ── */}
          {importDone && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {importedCount} email{importedCount !== 1 ? 's' : ''} imported to communication log
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  Each email was logged with its date, subject, body, and auto-detected direction.
                </p>
              </div>
            </div>
          )}

          {/* ── IMPORT ERRORS ── */}
          {importErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm font-medium text-red-700">
                  {importErrors.length} email{importErrors.length !== 1 ? 's' : ''} failed to import
                </p>
              </div>
              {importErrors.map((err, i) => (
                <p key={i} className="text-xs text-red-600 ml-6">{err}</p>
              ))}
            </div>
          )}

          {/* ── UPLOAD ZONE ── */}
          {!parseResult && !importDone && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-cyan-400 bg-cyan-50'
                  : 'border-gray-300 hover:border-cyan-300 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".eml,message/rfc822"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
              {parsing ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                  <p className="text-sm text-gray-600">Parsing email files...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Upload className="w-7 h-7 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Drop .eml files here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Export emails from Outlook: File → Save As → select &quot;Outlook Message Format - Unicode (.msg)&quot; or drag emails to a folder
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Supports .eml files (standard email format). Select multiple files for batch import.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PARSE ERRORS ── */}
          {parseResult && parseResult.errors.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <p className="text-sm font-medium text-amber-700 mb-1">
                {parseResult.errors.length} file{parseResult.errors.length !== 1 ? 's' : ''} could not be parsed
              </p>
              {parseResult.errors.map((err, i) => (
                <p key={i} className="text-xs text-amber-600 ml-2">
                  {err.filename}: {err.error}
                </p>
              ))}
            </div>
          )}

          {/* ── PARSED EMAIL LIST ── */}
          {parseResult && parseResult.success.length > 0 && !importDone && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">
                  {parseResult.success.length} email{parseResult.success.length !== 1 ? 's' : ''} ready to import
                </h3>
                <div className="flex gap-2">
                  <button onClick={toggleAll} className="text-xs text-cyan-600 hover:text-cyan-800 font-medium">
                    {selected.size === parseResult.success.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {parseResult.success.map((email, idx) => {
                  const direction = detectDirection(email);
                  const checked = selected.has(idx);
                  const DirIcon = direction === 'inbound' ? ArrowDownLeft : ArrowUpRight;
                  const dirColor = direction === 'inbound' ? 'text-blue-600' : 'text-green-600';
                  const dirBg = direction === 'inbound' ? 'bg-blue-50' : 'bg-green-50';

                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        checked ? 'bg-cyan-50/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleEmail(idx)}
                        className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${dirBg} ${dirColor}`}>
                            <DirIcon className="w-3 h-3" />
                            {direction === 'inbound' ? 'Received' : 'Sent'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {email.date.toLocaleDateString('en-CA')} {email.date.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {email.hasAttachments && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-400">
                              <Paperclip className="w-3 h-3" /> {email.attachmentCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate mt-0.5">
                          {email.subject || '(No subject)'}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {direction === 'inbound'
                            ? `From: ${email.from.name || email.from.address}`
                            : `To: ${email.to.map((a) => a.name || a.address).join(', ')}`}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {email.bodyPlain.slice(0, 120)}
                          {email.bodyPlain.length > 120 ? '...' : ''}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </>
          )}

          {/* ── IMPORT DONE — upload more ── */}
          {importDone && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Import More
              </Button>
              <Button variant="outline" size="sm" onClick={onClose} className="flex-1">
                Done
              </Button>
            </div>
          )}
        </div>

        {/* ── Footer (import button) ── */}
        {parseResult && parseResult.success.length > 0 && !importDone && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {selected.size} of {parseResult.success.length} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={selected.size === 0 || importing}
                onClick={handleImport}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {importing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                ) : (
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                )}
                Import {selected.size} Email{selected.size !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
