/**
 * Standalone Email Import Page
 *
 * Bulk import .eml files into communication logs across any client file.
 * Accessible from /admin/email-import. Paralegal-gated.
 *
 * Flow:
 *   1. Select a client file from the dropdown (or search by name/number)
 *   2. Upload .eml files
 *   3. Preview, select, and import — same dialog UX as the client-file
 *      version, but with a file picker step on top.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Mail, Upload, Search, Loader2, FileText, FolderOpen,
  CheckCircle, AlertCircle, ArrowDownLeft, ArrowUpRight,
  Paperclip, Trash2, X,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import {
  parseEmlFiles,
  detectDirection,
  buildCommLogSummary,
  buildCommLogDetails,
  type ParsedEmail,
  type EmailImportResult,
} from '@/lib/email-parser';

// ─── Types ───────────────────────────────────────────────────────────

interface ClientFileOption {
  _id: string;
  fileNumber: string;
  clientName: string;
  clientId: string;
  clientEmail: string;
  status: string;
}

// ─── Component ───────────────────────────────────────────────────────

export default function EmailImportPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Client file selection ──
  const [clientFiles, setClientFiles] = useState<ClientFileOption[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<ClientFileOption | null>(null);

  // ── Email parsing ──
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState<EmailImportResult | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [dragOver, setDragOver] = useState(false);

  // ── Import state ──
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [importErrors, setImportErrors] = useState<string[]>([]);

  // ── Load client files ──
  useEffect(() => {
    (async () => {
      try {
        const result = await BaseCrudService.getAll<any>('clientfiles', undefined, { limit: 1000 });
        const files: ClientFileOption[] = result.items
          .map((f: any) => ({
            _id: f._id,
            fileNumber: f.fileNumber || '',
            clientName: f.clientName || '',
            clientId: f.clientId || '',
            clientEmail: f.clientEmail || '',
            status: f.status || 'open',
          }))
          .sort((a: ClientFileOption, b: ClientFileOption) => {
            // Open files first, then by file number
            if (a.status === 'open' && b.status !== 'open') return -1;
            if (a.status !== 'open' && b.status === 'open') return 1;
            return (a.fileNumber || '').localeCompare(b.fileNumber || '');
          });
        setClientFiles(files);
      } catch (err) {
        console.error('Failed to load client files:', err);
      } finally {
        setLoadingFiles(false);
      }
    })();
  }, []);

  // ── Filtered files for search ──
  const filteredFiles = searchQuery.trim()
    ? clientFiles.filter(
        (f) =>
          f.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clientFiles;

  // ── File handling ──
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const emlFiles = Array.from(files).filter(
      (f) => f.name.toLowerCase().endsWith('.eml') || f.type === 'message/rfc822'
    );
    if (emlFiles.length === 0) return;

    setParsing(true);
    setParseResult(null);
    setImportDone(false);
    setImportErrors([]);

    try {
      const result = await parseEmlFiles(emlFiles);
      setParseResult(result);
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
      if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
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
    if (selected.size === parseResult.success.length) setSelected(new Set());
    else setSelected(new Set(parseResult.success.map((_, i) => i)));
  };

  // ── Import handler ──
  const handleImport = async () => {
    if (!parseResult || !selectedFile || selected.size === 0) return;

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
          clientId: selectedFile.clientId,
          fileId: selectedFile._id,
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
  };

  // ── Reset ──
  const handleReset = () => {
    setParseResult(null);
    setSelected(new Set());
    setImportDone(false);
    setImportedCount(0);
    setImportErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <BackToDashboard />

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
            <Mail className="w-6 h-6 text-cyan-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Import Emails</h1>
            <p className="text-sm text-gray-500">
              Upload .eml files from Outlook to log them in client communication records
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* ── STEP 1: Select Client File ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Select Client File
              </h2>
            </div>
            <div className="p-6">
              {selectedFile ? (
                <div className="flex items-center justify-between bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-cyan-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.fileNumber}</p>
                      <p className="text-xs text-gray-500">{selectedFile.clientName}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      handleReset();
                    }}
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Change
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      className="pl-9"
                      placeholder="Search by file number, client name, or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {loadingFiles ? (
                    <div className="flex items-center justify-center py-8 text-gray-400">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading client files...
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                      {filteredFiles.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-6">No files found</p>
                      ) : (
                        filteredFiles.map((f) => (
                          <button
                            key={f._id}
                            onClick={() => setSelectedFile(f)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                          >
                            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{f.fileNumber || '(No file number)'}</p>
                              <p className="text-xs text-gray-500 truncate">{f.clientName}</p>
                            </div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              f.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {f.status}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── STEP 2: Upload Emails ── */}
          {selectedFile && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Upload &amp; Import Emails
                </h2>
              </div>
              <div className="p-6 space-y-5">
                {/* Success */}
                {importDone && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        {importedCount} email{importedCount !== 1 ? 's' : ''} imported to {selectedFile.fileNumber}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={handleReset}>
                          <Upload className="w-3.5 h-3.5 mr-1" /> Import More
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/client-files/${selectedFile._id}`)}
                        >
                          <FolderOpen className="w-3.5 h-3.5 mr-1" /> View File
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Import errors */}
                {importErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <p className="text-sm font-medium text-red-700">{importErrors.length} failed</p>
                    </div>
                    {importErrors.map((err, i) => (
                      <p key={i} className="text-xs text-red-600 ml-6">{err}</p>
                    ))}
                  </div>
                )}

                {/* Upload zone */}
                {!parseResult && !importDone && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      dragOver ? 'border-cyan-400 bg-cyan-50' : 'border-gray-300 hover:border-cyan-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".eml,message/rfc822"
                      multiple
                      onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); }}
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
                            Supports .eml files exported from Outlook, Gmail, Thunderbird, etc.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Parse errors */}
                {parseResult && parseResult.errors.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-medium text-amber-700 mb-1">
                      {parseResult.errors.length} file{parseResult.errors.length !== 1 ? 's' : ''} failed to parse
                    </p>
                    {parseResult.errors.map((err, i) => (
                      <p key={i} className="text-xs text-amber-600 ml-2">{err.filename}: {err.error}</p>
                    ))}
                  </div>
                )}

                {/* Email list */}
                {parseResult && parseResult.success.length > 0 && !importDone && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-800">
                        {parseResult.success.length} email{parseResult.success.length !== 1 ? 's' : ''} ready
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

                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-96 overflow-y-auto">
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
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm text-gray-500">{selected.size} of {parseResult.success.length} selected</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleReset}>Cancel</Button>
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
                  </>
                )}
              </div>
            </div>
          )}

          {/* Help text */}
          <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan-800 mb-2">How to export emails from Outlook</h3>
            <ol className="text-xs text-cyan-700 space-y-1.5 list-decimal list-inside">
              <li>Open Outlook and select the email(s) you want to export</li>
              <li>Go to <strong>File → Save As</strong> (or drag emails to a folder on your desktop)</li>
              <li>Save as <strong>&quot;Outlook Message Format - Unicode (.msg)&quot;</strong> or <strong>.eml</strong></li>
              <li>For .msg files, use an online converter to convert to .eml first</li>
              <li>Upload the .eml files here to log them in the client file</li>
            </ol>
            <p className="text-xs text-cyan-600 mt-3">
              <strong>Tip:</strong> You can also import directly from a client file — open the file, go to
              Section H (Communication Log), and click &quot;Import Emails&quot;.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
