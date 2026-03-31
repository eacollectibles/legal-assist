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

export default function DocumentsTab({ currentUser, documents, setDocuments, isLoading }: DocumentsTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    documentName: '',
    documentCategory: 'other',
    notes: '',
    file: null as File | null,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only PDF, DOC, DOCX, JPG, and PNG files are allowed');
        return;
      }

      setUploadFormData(prev => ({ ...prev, file }));
      setUploadError('');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (!uploadFormData.documentName.trim()) {
      setUploadError('Document name is required');
      return;
    }

    if (!uploadFormData.file) {
      setUploadError('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    try {
      const fileDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(uploadFormData.file!);
      });

      const documentId = crypto.randomUUID();
      const newDocument: ClientDocument = {
        _id: documentId,
        documentName: uploadFormData.documentName,
        fileUrl: fileDataUrl,
        uploadDate: new Date(),
        clientEmail: currentUser?.email || '',
        fileType: uploadFormData.file.type,
        fileSize: uploadFormData.file.size,
        documentCategory: uploadFormData.documentCategory,
        notes: uploadFormData.notes,
      };

      await BaseCrudService.create('clientdocuments', newDocument);

      setDocuments(prev => [newDocument, ...prev]);
      setUploadSuccess(true);
      setUploadFormData({
        documentName: '',
        documentCategory: 'other',
        notes: '',
        file: null,
      });
      setShowUploadForm(false);

      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to upload document:', error);
      setUploadError('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
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
                  Document Name *
                </label>
                <Input
                  id="documentName"
                  value={uploadFormData.documentName}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, documentName: e.target.value }))}
                  placeholder="e.g., Court Order, Contract, Invoice"
                  className="border-gray-300"
                  required
                />
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
                  Select File *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80 mb-2">
                    {uploadFormData.file ? uploadFormData.file.name : 'Drag and drop your file here or click to browse'}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60 mb-4">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('file')?.click()}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Choose File
                  </Button>
                </div>
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
