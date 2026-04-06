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
      const result = await BaseCrudService.getAll<any>(COLLECTION);
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
  const handleSaveUpload = async () => {
    if (!uploadFile) return;
    setSaving(true);
    try {
      // Convert file to base64 data URL for storage
      // In production with Wix Media, you'd use the Wix Media API instead
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(uploadFile);
      });

      const payload = {
        _id: crypto.randomUUID(),
        documentName: uploadFile.name,
        fileUrl: dataUrl,
        uploadDate: new Date().toISOString(),
        fileType: uploadFile.type || uploadFile.name.split('.').pop() || 'unknown',
        fileSize: uploadFile.size,
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
      setSaveMsg({ type: 'success', text: `"${uploadFile.name}" uploaded successfully.` });
    } catch (err: any) {
      console.error('Error uploading document:', err);
      setSaveMsg({ type: 'error', text: `Upload failed: ${err?.message || 'Unknown error'}` });
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
