import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Trash2, Plus, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ClientDocument, CurrentUser } from './types';

interface DocumentsTabProps {
  currentUser: CurrentUser;
  documents: ClientDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<ClientDocument[]>>;
  isLoading: boolean;
}

// Maximum size we'll accept per file. Wix Media handles much larger
// uploads (multi-GB), but a 100 MB cap keeps the UX honest — phone
// photos, scans, and most contracts/PDFs fit comfortably under this.
const MAX_FILE_SIZE = 100 * 1024 * 1024;

// Inline-base64 fallback ceiling — only used if Wix Media is unavailable.
// Wix CMS text fields cap around 256 KB; we leave headroom for the
// surrounding payload.
const RAW_FALLBACK_LIMIT = 175 * 1024;

// Accepted file types (browser hint). The actual MIME check is more
// permissive — we accept anything matching common doc/image/video types.
const ACCEPT_ATTR =
  '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,' +
  '.jpg,.jpeg,.png,.gif,.webp,.heic,.heif,.bmp,.tif,.tiff,' +
  '.mp4,.mov,.m4v';

/**
 * Try to upload a file via Wix Media (CDN-backed, multi-MB ceiling).
 * Returns the permanent URL on success, or null if the SDK isn't
 * available — caller falls back to the inline-base64 path for small
 * files. Mirrors the helper in SectionDocuments.tsx so behaviour stays
 * consistent across paralegal-side and client-side upload flows.
 */
const tryWixMediaUpload = async (
  file: File
): Promise<{ url: string; mediaId?: string } | null> => {
  try {
    const wixMedia: any = await import('@wix/media').catch(() => null);
    if (!wixMedia) return null;

    const filesApi =
      wixMedia.files || wixMedia.default?.files || wixMedia;

    if (filesApi.uploadFile) {
      const result = await filesApi.uploadFile({
        mimeType: file.type || 'application/octet-stream',
        fileName: file.name,
        file,
      });
      const url = result?.file?.url || result?.fileUrl || result?.url;
      const mediaId = result?.file?.id || result?._id || result?.id;
      if (url) return { url, mediaId };
    }

    if (filesApi.generateFileUploadUrl) {
      const presigned = await filesApi.generateFileUploadUrl({
        mimeType: file.type || 'application/octet-stream',
        fileName: file.name,
      });
      const uploadUrl = presigned?.uploadUrl || presigned?.url;
      if (!uploadUrl) return null;
      const fd = new FormData();
      fd.append('file', file);
      const resp = await fetch(uploadUrl, { method: 'POST', body: fd });
      if (!resp.ok) return null;
      const data = await resp.json().catch(() => ({}));
      const url = data?.file?.url || data?.fileUrl || data?.url;
      const mediaId = data?.file?.id || data?._id || data?.id;
      if (url) return { url, mediaId };
    }
    return null;
  } catch {
    return null;
  }
};

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function DocumentsTab({ currentUser, documents, setDocuments, isLoading }: DocumentsTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [uploadFormData, setUploadFormData] = useState({
    documentName: '',
    documentCategory: 'other',
    notes: '',
    files: [] as File[],
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;

    const tooBig = picked.find((f) => f.size > MAX_FILE_SIZE);
    if (tooBig) {
      const sizeMB = (tooBig.size / 1024 / 1024).toFixed(1);
      setUploadError(
        `"${tooBig.name}" is ${sizeMB} MB which exceeds the 100 MB per-file limit. ` +
        `If you need to upload something larger, please reach out to your paralegal.`
      );
      return;
    }

    setUploadFormData((prev) => ({ ...prev, files: [...prev.files, ...picked] }));
    setUploadError('');
  };

  const removeQueuedFile = (index: number) => {
    setUploadFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (uploadFormData.files.length === 0) {
      setUploadError('Please select at least one file to upload');
      return;
    }

    // Document name only required when a single file is uploaded — for
    // bulk uploads we use each file's own filename.
    if (uploadFormData.files.length === 1 && !uploadFormData.documentName.trim()) {
      setUploadError('Document name is required');
      return;
    }

    setIsUploading(true);
    setUploadProgress('');

    const uploaded: ClientDocument[] = [];
    const failed: string[] = [];

    try {
      for (let i = 0; i < uploadFormData.files.length; i++) {
        const file = uploadFormData.files[i];
        setUploadProgress(
          `Uploading ${i + 1} of ${uploadFormData.files.length}: ${file.name}`
        );

        // 1) Try Wix Media first (preferred path — no CMS field-size limit).
        let fileUrl: string | null = null;
        let wixMediaId: string | undefined;
        const media = await tryWixMediaUpload(file);
        if (media?.url) {
          fileUrl = media.url;
          wixMediaId = media.mediaId;
        } else if (file.size <= RAW_FALLBACK_LIMIT) {
          // 2) Fall back to inline base64 only for small files.
          fileUrl = await fileToDataUrl(file);
        } else {
          failed.push(
            `${file.name}: file is too large for the inline fallback. ` +
            `Try again in a moment, or contact your paralegal.`
          );
          continue;
        }

        const docName =
          uploadFormData.files.length === 1
            ? uploadFormData.documentName.trim() || file.name
            : file.name;

        const newDocument: ClientDocument = {
          _id: crypto.randomUUID(),
          documentName: docName,
          fileUrl,
          uploadDate: new Date(),
          clientEmail: currentUser?.email || '',
          fileType: file.type || 'application/octet-stream',
          fileSize: file.size,
          documentCategory: uploadFormData.documentCategory,
          notes: uploadFormData.notes,
          ...(wixMediaId ? ({ wixMediaId } as any) : {}),
        };

        try {
          await BaseCrudService.create('clientdocuments', newDocument);
          uploaded.push(newDocument);
        } catch (err: any) {
          // eslint-disable-next-line no-console
          console.error('Failed to save document row:', err);
          failed.push(`${file.name}: ${err?.message || 'save failed'}`);
        }
      }

      if (uploaded.length > 0) {
        setDocuments((prev) => [...uploaded, ...prev]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3500);
      }

      if (failed.length === 0) {
        setUploadFormData({
          documentName: '',
          documentCategory: 'other',
          notes: '',
          files: [],
        });
        setShowUploadForm(false);
      } else {
        setUploadError(
          `Uploaded ${uploaded.length} of ${uploadFormData.files.length}. ` +
          `Failed:\n• ${failed.join('\n• ')}`
        );
        // Keep the failed ones queued so the user can retry.
        const failedNames = new Set(
          failed.map((f) => f.split(':')[0])
        );
        setUploadFormData((prev) => ({
          ...prev,
          files: prev.files.filter((f) => failedNames.has(f.name)),
        }));
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Upload batch failed:', error);
      setUploadError(
        error?.message
          ? `Upload failed: ${error.message}`
          : 'Failed to upload documents. Please try again.'
      );
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      await BaseCrudService.delete('clientdocuments', documentId);
      setDocuments(prev => prev.filter(doc => doc._id !== documentId));
    } catch (error) {
      console.error('Failed to delete document:', error);
      setUploadError('Failed to delete document. Please try again.');
    }
  };

  const openDocumentViewer = (doc: ClientDocument) => {
    if (doc.fileUrl) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        if (doc.fileType?.startsWith('image/')) {
          newWindow.document.write(`
            <html>
              <head>
                <title>${doc.documentName || 'Document'}</title>
                <style>
                  body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f0f0; }
                  img { max-width: 100%; max-height: 100vh; object-fit: contain; }
                </style>
              </head>
              <body>
                <img src="${doc.fileUrl}" alt="${doc.documentName || 'Document'}" />
              </body>
            </html>
          `);
        } else if (doc.fileType === 'application/pdf') {
          newWindow.document.write(`
            <html>
              <head>
                <title>${doc.documentName || 'Document'}</title>
                <style>
                  body { margin: 0; }
                  iframe { width: 100vw; height: 100vh; border: none; }
                </style>
              </head>
              <body>
                <iframe src="${doc.fileUrl}" type="application/pdf"></iframe>
              </body>
            </html>
          `);
        } else {
          newWindow.location.href = doc.fileUrl;
        }
      }
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.documentCategory === selectedCategory;
    const matchesSearch = doc.documentName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(documents.map(doc => doc.documentCategory).filter(Boolean))];

  return (
    <div>
      {/* Success Messages */}
      {uploadSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-bold text-green-900 mb-1">Document Uploaded Successfully!</h3>
            <p className="font-paragraph text-green-800">Your document has been securely stored in your portal.</p>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-12">
        {!showUploadForm ? (
          <Button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Upload New Document
          </Button>
        ) : (
          <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Upload Document</h3>

            {uploadError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-red-800">{uploadError}</p>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div>
                <label htmlFor="documentName" className="block font-paragraph font-semibold text-foreground mb-2">
                  Document Name {uploadFormData.files.length <= 1 ? '*' : '(optional for bulk uploads)'}
                </label>
                <Input
                  id="documentName"
                  value={uploadFormData.documentName}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, documentName: e.target.value }))}
                  placeholder={
                    uploadFormData.files.length > 1
                      ? "Leave blank to use each file's own filename"
                      : "e.g., Court Order, Contract, Invoice"
                  }
                  className="border-gray-300"
                />
                {uploadFormData.files.length > 1 && (
                  <p className="text-xs text-foreground/60 mt-1">
                    Bulk upload — each file will be saved under its own filename.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block font-paragraph font-semibold text-foreground mb-2">
                  Category
                </label>
                <Select value={uploadFormData.documentCategory} onValueChange={(value) => setUploadFormData(prev => ({ ...prev, documentCategory: value }))}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="court-order">Court Order</SelectItem>
                    <SelectItem value="evidence">Evidence</SelectItem>
                    <SelectItem value="correspondence">Correspondence</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="file" className="block font-paragraph font-semibold text-foreground mb-2">
                  Select File(s) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80 mb-2">
                    {uploadFormData.files.length === 0
                      ? 'Drag and drop your files here or click to browse'
                      : `${uploadFormData.files.length} file${uploadFormData.files.length > 1 ? 's' : ''} selected`}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">
                    Supported: PDF, Word, Excel, CSV, TXT, RTF
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">
                    Photos: JPG, PNG, GIF, WebP, HEIC/HEIF, BMP, TIFF
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60 mb-4">
                    Video clips: MP4, MOV (up to 100 MB per file). You can pick multiple files at once.
                  </p>
                  <input
                    id="file"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    accept={ACCEPT_ATTR}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('file')?.click()}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    {uploadFormData.files.length === 0 ? 'Choose Files' : 'Add More Files'}
                  </Button>
                </div>

                {uploadFormData.files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {uploadFormData.files.map((f, i) => (
                      <li
                        key={`${f.name}-${i}`}
                        className="flex items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-primary/60 flex-shrink-0" />
                          <span className="truncate font-medium text-foreground">{f.name}</span>
                          <span className="text-xs text-foreground/50 flex-shrink-0">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQueuedFile(i)}
                          className="text-xs text-destructive hover:underline flex-shrink-0"
                          aria-label={`Remove ${f.name} from upload queue`}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {uploadProgress && (
                  <p className="mt-3 text-sm text-foreground/70 italic">{uploadProgress}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block font-paragraph font-semibold text-foreground mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={uploadFormData.notes}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about this document..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                >
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  variant="outline"
                  className="border-gray-300 text-foreground hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Your Documents</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="search" className="block font-paragraph font-semibold text-foreground mb-2">
              Search Documents
            </label>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by document name..."
              className="border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="category-filter" className="block font-paragraph font-semibold text-foreground mb-2">
              Filter by Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Documents Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Documents</p>
                  <p className="font-heading text-3xl font-bold text-foreground">{documents.length}</p>
                </div>
                <FileText className="w-10 h-10 text-primary/30" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Storage</p>
                  <p className="font-heading text-3xl font-bold text-foreground">
                    {(documents.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
                <Download className="w-10 h-10 text-primary/30" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Categories</p>
                  <p className="font-heading text-3xl font-bold text-foreground">
                    {new Set(documents.map(doc => doc.documentCategory).filter(Boolean)).size}
                  </p>
                </div>
                <AlertCircle className="w-10 h-10 text-primary/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80">Loading your documents...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80 mb-4">
              {documents.length === 0 ? 'No documents yet. Upload your first document to get started.' : 'No documents match your search criteria.'}
            </p>
            {documents.length === 0 && (
              <Button
                onClick={() => setShowUploadForm(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Upload Document
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map(doc => (
              <div key={doc._id} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-bold text-foreground mb-1 truncate">
                          {doc.documentName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.documentCategory ? doc.documentCategory.charAt(0).toUpperCase() + doc.documentCategory.slice(1).replace('-', ' ') : 'Uncategorized'}
                          </Badge>
                          <span className="text-xs text-foreground/60">
                            {doc.fileType?.split('/')[1]?.toUpperCase() || 'Unknown'}
                          </span>
                          <span className="text-xs text-foreground/60">•</span>
                          <span className="text-xs text-foreground/60">
                            {doc.fileSize ? (doc.fileSize / 1024).toFixed(2) + ' KB' : 'Unknown'}
                          </span>
                          <span className="text-xs text-foreground/60">•</span>
                          <span className="text-xs text-foreground/60">
                            {doc.uploadDate instanceof Date ? doc.uploadDate.toLocaleDateString() : new Date(doc.uploadDate || '').toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {doc.notes && (
                      <div className="ml-13 pl-4 border-l-2 border-gray-200">
                        <p className="font-paragraph text-sm text-foreground/70">
                          {doc.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2 md:ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDocumentViewer(doc)}
                      className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/5 font-semibold"
                      title="View document"
                    >
                      <FileText className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">View</span>
                      <span className="md:hidden">View</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 md:flex-none"
                      title="Download document"
                    >
                      <a href={doc.fileUrl} download={doc.documentName}>
                        <Download className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Download</span>
                        <span className="md:hidden">Download</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteDocument(doc._id)}
                      className="flex-1 md:flex-none border-destructive text-destructive hover:bg-destructive/10"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
