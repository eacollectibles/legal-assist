/**
 * SectionDocuments — Reusable per-section document upload & management component.
 *
 * Embeds inside any LSO compliance section (A–K) to provide:
 *  - File upload to Wix CMS (clientdocuments collection)
 *  - Manual URL entry for externally-hosted files
 *  - Document list with view, download, and remove actions
 *
 * Documents are scoped to a client file + section key.
 */
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Upload, Link2, FileText, Trash2, Eye, Download, Plus,
  Loader2, X, ExternalLink, File, Image, FileSpreadsheet,
  AlertCircle, CheckCircle
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { uploadToWixMedia } from '@/lib/wix-media-upload';
// Wix Media uploads go through the server endpoint at /api/media/upload
// (which authenticates with an API key) — see src/lib/wix-media-upload.ts.

// ============================================================
// TYPES
// ============================================================

export interface SectionDocument {
  _id: string;
  documentName: string;
  fileUrl: string;
  uploadDate: string;
  fileType?: string;
  fileSize?: number;
  notes?: string;
  documentCategory: string; // stores "section_{sectionKey}"
  clientId: string;
  source: 'upload' | 'url'; // how the doc was added
}

interface SectionDocumentsProps {
  fileId: string;
  clientId: string;
  sectionKey: string; // e.g. 'fileOpening', 'clientIdentification'
  sectionLabel: string; // e.g. 'File Opening', 'Client Identification'
  maxFiles?: number; // optional limit
  acceptedTypes?: string; // e.g. '.pdf,.jpg,.png,.docx'
  compact?: boolean; // smaller UI for sections with limited space
}

// ============================================================
// COLLECTION
// ============================================================
const COLLECTION = 'clientdocuments';

// ============================================================
// HELPERS
// ============================================================

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) return <FileText className="w-4 h-4 text-red-500" />;
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return <Image className="w-4 h-4 text-blue-500" />;
  if (['xlsx', 'xls', 'csv'].includes(ext)) return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
  if (['doc', 'docx'].includes(ext)) return <FileText className="w-4 h-4 text-blue-600" />;
  return <File className="w-4 h-4 text-gray-500" />;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function SectionDocuments({
  fileId,
  clientId,
  sectionKey,
  sectionLabel,
  maxFiles,
  acceptedTypes = '.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xlsx,.xls,.csv,.txt',
  compact = false,
}: SectionDocumentsProps) {
  const [documents, setDocuments] = useState<SectionDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addMode, setAddMode] = useState<'upload' | 'url'>('upload');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // URL entry form
  const [urlName, setUrlName] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [urlNotes, setUrlNotes] = useState('');

  // Upload form
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryKey = `section_${sectionKey}`;

  // ── LOAD ─────────────────────────────────────────────────
  useEffect(() => { loadDocuments(); }, [fileId, sectionKey]);
  useEffect(() => { if (saveMsg) { const t = setTimeout(() => setSaveMsg(null), 4000); return () => clearTimeout(t); } }, [saveMsg]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const result = await BaseCrudService.getAllPages<any>(COLLECTION);
      const sectionDocs = (result.items || [])
        .filter((d: any) => d.clientId === clientId && d.documentCategory === categoryKey)
        .map((d: any): SectionDocument => ({
          _id: d._id,
          documentName: d.documentName || 'Untitled',
          fileUrl: d.fileUrl || '',
          uploadDate: d.uploadDate ? new Date(d.uploadDate).toISOString() : new Date().toISOString(),
          fileType: d.fileType || '',
          fileSize: d.fileSize || 0,
          notes: d.notes || '',
          documentCategory: d.documentCategory || categoryKey,
          clientId: d.clientId || clientId,
          source: d.fileType === 'url' ? 'url' : 'upload',
        }))
        .sort((a: SectionDocument, b: SectionDocument) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      setDocuments(sectionDocs);
    } catch (err) {
      console.error(`Error loading ${sectionKey} documents:`, err);
    } finally {
      setLoading(false);
    }
  };

  // ── SAVE URL ─────────────────────────────────────────────
  const handleSaveUrl = async () => {
    if (!urlValue.trim() || !urlName.trim()) return;
    setSaving(true);
    try {
      const payload = {
        _id: crypto.randomUUID(),
        documentName: urlName.trim(),
        fileUrl: urlValue.trim(),
        uploadDate: new Date().toISOString(),
        fileType: 'url',
        fileSize: 0,
        notes: urlNotes.trim(),
        documentCategory: categoryKey,
        clientId,
      };
      await BaseCrudService.create(COLLECTION, payload);
      setDocuments(prev => [{
        ...payload,
        source: 'url' as const,
      }, ...prev]);
      resetForm();
      setSaveMsg({ type: 'success', text: 'Document link saved.' });
    } catch (err: any) {
      console.error('Error saving URL document:', err);
      setSaveMsg({ type: 'error', text: `Failed to save: ${err?.message || 'Unknown error'}` });
    } finally {
      setSaving(false);
    }
  };

  // ── SAVE UPLOAD ──────────────────────────────────────────
  //
  // The Wix CMS stores the file as a base64 data URL inside a text field
  // (`fileUrl`). Wix text fields cap at 256 KB; once base64 inflation
  // (~33%) is factored in, that means an effective per-file ceiling
  // around 180 KB raw. Anything larger is rejected by the CMS with the
  // generic error `WDE0009: Document is too large`.
  //
  // Until the upload path is migrated to the Wix Media API, this handler:
  //   1. Validates the file size up-front so we fail fast with a clear
  //      message instead of a cryptic CMS error.
  //   2. Auto-downscales images that are over the limit so they squeeze
  //      under it (90% JPEG, 1600 px on the long edge).
  //   3. For non-image files that are too big, points the user to the
  //      "Add link" option (URL upload) so they can host the document
  //      on Google Drive / OneDrive / etc. and just file the link here.
  //
  // Tunables — keep WIX_FIELD_LIMIT slightly under the real 256 KB ceiling
  // because the CMS layer adds its own JSON overhead.
  const WIX_FIELD_LIMIT = 240 * 1024;            // ~240 KB after encoding
  const RAW_FILE_LIMIT  = Math.floor(WIX_FIELD_LIMIT * 0.74);  // ~178 KB raw

  /** Compress an image File to a JPEG data URL under target bytes. */
  const compressImage = async (file: File, targetBytes: number): Promise<string> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      // MUST be `window.Image`, not `Image`. This module imports `Image` from
      // lucide-react (an icon component), which SHADOWS the DOM constructor.
      // `new Image()` was therefore constructing a React component: `onload`
      // never fired, this promise never settled, and image compression hung
      // forever on upload. TypeScript was reporting it as ts(2350)
      // "Only a void function can be called with the 'new' keyword."
      const i = new window.Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });
    // Iteratively shrink dimensions + quality until under target.
    let maxEdge = 1600;
    let quality = 0.85;
    for (let attempt = 0; attempt < 6; attempt++) {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported.');
      ctx.drawImage(img, 0, 0, w, h);
      const out = canvas.toDataURL('image/jpeg', quality);
      // Approximate decoded size of the base64 payload
      const approxBytes = Math.ceil(out.length * 0.75);
      if (approxBytes <= targetBytes) return out;
      // Try again with smaller dimensions / lower quality
      maxEdge = Math.round(maxEdge * 0.8);
      quality = Math.max(0.5, quality - 0.1);
    }
    throw new Error('Image is still too large after compression. Please pick a smaller picture or use the Add Link option.');
  };

  /**
   * Upload via Wix Media (server-side endpoint). Returns the
   * permanent URL on success or null if the server endpoint rejects
   * the upload — caller falls back to the base64 path for small
   * files. Detailed failure reasons are logged to the browser console
   * by the shared helper.
   */
  const tryWixMediaUpload = async (file: File): Promise<{ url: string; mediaId?: string } | null> => {
    const mime = file.type || 'application/octet-stream';
    return uploadToWixMedia(file, file.name, mime);
  };

  const handleSaveUpload = async () => {
    if (!uploadFile) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const isImage = (uploadFile.type || '').startsWith('image/');

      // ---- 1) Try Wix Media first (no size limit). ----
      // This handles the realistic case: 1-50 MB PDFs, scans, photos.
      const media = await tryWixMediaUpload(uploadFile);
      if (media?.url) {
        const payload = {
          _id: crypto.randomUUID(),
          documentName: uploadFile.name,
          fileUrl: media.url,
          uploadDate: new Date().toISOString(),
          fileType: uploadFile.type || uploadFile.name.split('.').pop() || 'unknown',
          fileSize: uploadFile.size,
          notes: uploadNotes.trim(),
          documentCategory: categoryKey,
          clientId,
          // Stash the media id so we could later delete the file from Wix
          // Media when the document row is removed (best-effort).
          ...(media.mediaId ? { wixMediaId: media.mediaId } : {}),
        };
        await BaseCrudService.create(COLLECTION, payload);
        setDocuments(prev => [{
          ...payload,
          source: 'upload' as const,
        }, ...prev]);
        resetForm();
        setSaveMsg({ type: 'success', text: `"${uploadFile.name}" uploaded successfully.` });
        return;
      }

      // ---- 2) Fall back to inline base64 (for small files only). ----
      // Wix Media wasn't available or rejected the upload; we use the
      // legacy path with the same size guards as before.
      let dataUrl: string;
      let storedSize = uploadFile.size;
      let storedType = uploadFile.type || uploadFile.name.split('.').pop() || 'unknown';
      let storedName = uploadFile.name;

      if (uploadFile.size > RAW_FILE_LIMIT) {
        if (isImage) {
          // eslint-disable-next-line no-console
          console.info(`Image exceeds ${RAW_FILE_LIMIT} bytes — auto-compressing`);
          dataUrl = await compressImage(uploadFile, RAW_FILE_LIMIT);
          storedSize = Math.ceil(dataUrl.length * 0.75);
          storedType = 'image/jpeg';
          if (!/\.jpe?g$/i.test(storedName)) {
            storedName = storedName.replace(/\.[^.]+$/, '') + '_compressed.jpg';
          }
        } else {
          throw new Error(
            `This file is ${(uploadFile.size / 1024 / 1024).toFixed(2)} MB. ` +
            `Wix Media upload is unavailable in this environment, and the ` +
            `inline-storage fallback is limited to ~${Math.floor(RAW_FILE_LIMIT / 1024)} KB. ` +
            `Use the "Add Link" option above and host the document on Google ` +
            `Drive / OneDrive / Dropbox, then paste the share link here.`
          );
        }
      } else {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(uploadFile);
        });
      }

      if (dataUrl.length > WIX_FIELD_LIMIT) {
        throw new Error(
          `Encoded file is ${(dataUrl.length / 1024).toFixed(0)} KB which exceeds ` +
          `the ${Math.floor(WIX_FIELD_LIMIT / 1024)} KB CMS field limit. ` +
          `Use the Add Link option for this file.`
        );
      }

      const payload = {
        _id: crypto.randomUUID(),
        documentName: storedName,
        fileUrl: dataUrl,
        uploadDate: new Date().toISOString(),
        fileType: storedType,
        fileSize: storedSize,
        notes: uploadNotes.trim(),
        documentCategory: categoryKey,
        clientId,
      };
      await BaseCrudService.create(COLLECTION, payload);
      setDocuments(prev => [{
        ...payload,
        source: 'upload' as const,
      }, ...prev]);
      resetForm();
      setSaveMsg({ type: 'success', text: `"${storedName}" uploaded successfully.` });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error uploading document:', err);
      const raw = err?.message || 'Unknown error';
      const friendly = /WDE0009|too large|exceeds maximum/i.test(raw)
        ? `Upload failed: file is too large for direct upload. Try compressing the file or use the "Add Link" option above and host it on Google Drive / OneDrive / Dropbox.`
        : `Upload failed: ${raw}`;
      setSaveMsg({ type: 'error', text: friendly });
    } finally {
      setSaving(false);
    }
  };

  // ── REMOVE ───────────────────────────────────────────────
  const handleRemove = async (docId: string) => {
    try {
      // Remove from local state immediately
      setDocuments(prev => prev.filter(d => d._id !== docId));
      // Remove from CMS
      // BaseCrudService may not have a delete method; store a 'deleted' flag instead
      await BaseCrudService.update(COLLECTION, {
        _id: docId,
        documentCategory: `${categoryKey}_deleted`,
      } as any);
      setSaveMsg({ type: 'success', text: 'Document removed.' });
    } catch (err) {
      console.error('Error removing document:', err);
    }
  };

  // ── RESET ────────────────────────────────────────────────
  const resetForm = () => {
    setShowAddForm(false);
    setAddMode('upload');
    setUrlName('');
    setUrlValue('');
    setUrlNotes('');
    setUploadFile(null);
    setUploadNotes('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── RENDER ───────────────────────────────────────────────
  const atLimit = maxFiles ? documents.length >= maxFiles : false;

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading documents...
      </div>
    );
  }

  return (
    <div className={`mt-4 ${compact ? '' : 'border-t border-gray-100 pt-4'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          {sectionLabel} Documents
          <span className="text-gray-300 font-normal">({documents.length}{maxFiles ? `/${maxFiles}` : ''})</span>
        </h4>
        {!showAddForm && !atLimit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="text-xs h-7 px-2"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Document
          </Button>
        )}
      </div>

      {/* Status messages */}
      {saveMsg && (
        <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3 ${
          saveMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {saveMsg.type === 'success' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {saveMsg.text}
        </div>
      )}

      {/* Add form */}
      {showAddForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          {/* Mode toggle */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setAddMode('upload')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                addMode === 'upload' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-3 h-3" /> Upload File
            </button>
            <button
              type="button"
              onClick={() => setAddMode('url')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                addMode === 'url' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Link2 className="w-3 h-3" /> Paste URL
            </button>
          </div>

          {addMode === 'upload' ? (
            <div className="space-y-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadFile ? (
                  <div className="flex items-center justify-center gap-2">
                    {getFileIcon(uploadFile.name)}
                    <span className="text-sm font-medium text-gray-700">{uploadFile.name}</span>
                    <span className="text-xs text-gray-400">({formatFileSize(uploadFile.size)})</span>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Click to select a file</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">PDF, images, Word, Excel, text</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">If upload fails, try <strong>Add Link</strong> with a Google Drive / OneDrive URL.</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes}
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) setUploadFile(file);
                }}
              />
              <Input
                value={uploadNotes}
                onChange={e => setUploadNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="text-xs"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                value={urlName}
                onChange={e => setUrlName(e.target.value)}
                placeholder="Document name *"
                className="text-xs"
              />
              <Input
                value={urlValue}
                onChange={e => setUrlValue(e.target.value)}
                placeholder="Paste URL (https://...)"
                className="text-xs"
              />
              <Input
                value={urlNotes}
                onChange={e => setUrlNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="text-xs"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-3">
            <Button variant="outline" size="sm" className="text-xs h-7" onClick={resetForm}>Cancel</Button>
            <Button
              size="sm"
              className="text-xs h-7 bg-primary hover:bg-primary/90 text-white"
              disabled={saving || (addMode === 'upload' ? !uploadFile : !urlValue.trim() || !urlName.trim())}
              onClick={addMode === 'upload' ? handleSaveUpload : handleSaveUrl}
            >
              {saving ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Saving...</> : <><Plus className="w-3 h-3 mr-1" /> Save</>}
            </Button>
          </div>
        </div>
      )}

      {/* Document list */}
      {documents.length > 0 ? (
        <div className="space-y-2">
          {documents.map(doc => (
            <div
              key={doc._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {getFileIcon(doc.documentName)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{doc.documentName}</p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{formatDate(doc.uploadDate)}</span>
                    {doc.fileSize ? <span>{formatFileSize(doc.fileSize)}</span> : null}
                    {doc.source === 'url' && <span className="flex items-center gap-0.5"><ExternalLink className="w-2.5 h-2.5" /> Link</span>}
                    {doc.notes && <span className="truncate max-w-[120px]" title={doc.notes}>{doc.notes}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {doc.fileUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    title="View"
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                  </Button>
                )}
                {doc.fileUrl && doc.source === 'upload' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    title="Download"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = doc.fileUrl;
                      link.download = doc.documentName;
                      link.click();
                    }}
                  >
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  title="Remove"
                  onClick={() => handleRemove(doc._id)}
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : !showAddForm ? (
        <p className="text-xs text-gray-400 italic">No documents attached to this section yet.</p>
      ) : null}
    </div>
  );
}
