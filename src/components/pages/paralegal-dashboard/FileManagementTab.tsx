import { useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Search, Filter, Eye, Download, Share2, Trash2, Shield, ArrowRight, PenTool, FilePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import type { ClientDocument, GeneratedDocument } from './types';

// Unified document type that merges both uploaded and generated documents
interface UnifiedDocument {
  _id: string;
  documentName: string;
  fileUrl?: string;
  date: Date;
  clientEmail?: string;
  clientName?: string;
  category: string;
  fileType?: string;
  fileSize?: number;
  notes?: string;
  status?: string;
  source: 'uploaded' | 'generated';
}

function toUnifiedDoc(doc: ClientDocument): UnifiedDocument {
  return {
    _id: doc._id,
    documentName: doc.documentName || 'Untitled Document',
    fileUrl: doc.fileUrl,
    date: new Date(doc.uploadDate || 0),
    clientEmail: doc.clientEmail,
    category: doc.documentCategory || 'other',
    fileType: doc.fileType,
    fileSize: doc.fileSize,
    notes: doc.notes,
    source: 'uploaded',
  };
}

function toUnifiedGenDoc(doc: GeneratedDocument): UnifiedDocument {
  return {
    _id: doc._id,
    documentName: doc.documentName || 'Untitled Document',
    fileUrl: doc.signedDocumentUrl || doc.documentUrl,
    date: new Date(doc.createdDate || doc.signedDate || 0),
    clientEmail: doc.clientEmail,
    clientName: doc.clientName,
    category: doc.documentType || 'generated',
    status: doc.status,
    source: 'generated',
  };
}

export default function FileManagementTab() {
  const navigate = useNavigate();
  const { documents, generatedDocuments, setDocuments, setGeneratedDocuments, clients, isLoading } = useParalegalDashboard();

  // Build an email -> client and id -> client map ONCE for fast row
  // joins. Uploaded ClientDocument rows only carry `clientEmail`
  // (no clientId), so we resolve names by email; generated docs may
  // carry clientId on the underlying record so we fall back through
  // both keys.
  const clientsByEmail = new Map<string, any>();
  const clientsById = new Map<string, any>();
  for (const c of clients) {
    const email = (c as any)?.email;
    if (email && typeof email === 'string') {
      clientsByEmail.set(email.toLowerCase(), c);
    }
    if ((c as any)?._id) {
      clientsById.set((c as any)._id, c);
    }
  }
  const resolveClientName = (doc: UnifiedDocument): string => {
    if (doc.clientName && doc.clientName.trim()) return doc.clientName.trim();
    if (doc.clientEmail) {
      const hit = clientsByEmail.get(doc.clientEmail.toLowerCase());
      if (hit) {
        const name = `${(hit as any).firstName || ''} ${(hit as any).lastName || ''}`.trim();
        if (name) return name;
      }
      // Last resort: show the email itself rather than "N/A" so the
      // paralegal at least knows whose document this is.
      return doc.clientEmail;
    }
    return 'Unknown client';
  };

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSource, setFilterSource] = useState<'all' | 'uploaded' | 'generated'>('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Share dialog states
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  // Build unified list of all documents from both collections
  const allDocuments: UnifiedDocument[] = [
    ...documents.map(toUnifiedDoc),
    ...generatedDocuments.map(toUnifiedGenDoc),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.documentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSource = filterSource === 'all' || doc.source === filterSource;

    let matchesDate = true;
    if (filterDateFrom || filterDateTo) {
      if (filterDateFrom) matchesDate = matchesDate && doc.date >= new Date(filterDateFrom);
      if (filterDateTo) matchesDate = matchesDate && doc.date <= new Date(filterDateTo);
    }

    return matchesSearch && matchesCategory && matchesSource && matchesDate;
  });

  const handleDeleteDocument = async (documentId: string, source: 'uploaded' | 'generated') => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      if (source === 'generated') {
        await BaseCrudService.delete('generateddocuments', documentId);
        setGeneratedDocuments(prev => prev.filter(d => d._id !== documentId));
      } else {
        await BaseCrudService.delete('clientdocuments', documentId);
        setDocuments(prev => prev.filter(d => d._id !== documentId));
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

  const handleShareDocument = async () => {
    if (!selectedDocument || !shareEmail) return;
    
    try {
      // In production, this would send an actual email
      console.log('Sharing document:', {
        document: selectedDocument.documentName,
        to: shareEmail,
        message: shareMessage
      });
      
      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        activityType: 'document_shared',
        activityDescription: `Document "${selectedDocument.documentName}" shared with ${shareEmail}`,
        timestamp: new Date().toISOString(),
        relatedItemId: selectedDocument._id
      });
      
      alert(`Document would be shared with ${shareEmail}`);
      setIsShareDialogOpen(false);
      setShareEmail('');
      setShareMessage('');
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error sharing document:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">
          File Management
        </h2>
      </div>

      {/* LSO Client Files Link */}
      <div
        className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-colors"
        onClick={() => navigate('/admin/client-files')}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">LSO Client File Management</h3>
            <p className="text-xs text-foreground/60">By-Law 7.1 compliant client files — audit-ready sections, compliance scoring, and checklists</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
      </div>

      {/* Document Creation & Workflow Link */}
      <div
        className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors"
        onClick={() => navigate('/admin/documents')}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <PenTool className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">Document Creation & Workflow</h3>
            <p className="text-xs text-foreground/60">Create documents from templates, generate retainers, send for signature, and track status</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0" />
      </div>

      {/* Search & Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Search</Label>
              <Input
                id="searchTerm"
                placeholder="Search by name or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterCategory">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="court-order">Court Order</SelectItem>
                  <SelectItem value="evidence">Evidence</SelectItem>
                  <SelectItem value="correspondence">Correspondence</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterSource">Source</Label>
              <Select value={filterSource} onValueChange={(v) => setFilterSource(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="uploaded">Client Uploads</SelectItem>
                  <SelectItem value="generated">Generated Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label htmlFor="filterDateFrom">Date From</Label>
              <Input
                id="filterDateFrom"
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterDateTo">Date To</Label>
              <Input
                id="filterDateTo"
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground/70 mt-3">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredDocuments.length} of {allDocuments.length} documents ({documents.length} uploaded, {generatedDocuments.length} generated)</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents List — unified view of uploaded + generated documents */}
      <div className="grid gap-4" style={{ minHeight: '400px' }}>
        {isLoading ? null : filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-foreground/40 mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                {allDocuments.length === 0 ? 'No documents available' : 'No documents match your filters'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={`${doc.source}-${doc._id}`} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="font-heading text-xl mb-2">
                      {doc.documentName}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">
                        {doc.category
                          ? doc.category.charAt(0).toUpperCase() + doc.category.slice(1).replace('-', ' ')
                          : 'Uncategorized'}
                      </Badge>
                      {doc.source === 'generated' ? (
                        <Badge className="bg-indigo-100 text-indigo-800 gap-1">
                          <FilePen className="h-3 w-3" />
                          Generated
                        </Badge>
                      ) : (
                        <Badge className="bg-pastelbeige text-foreground">
                          {doc.fileType?.split('/')[1]?.toUpperCase() || 'Uploaded'}
                        </Badge>
                      )}
                      {doc.status && (
                        <Badge className={
                          doc.status === 'signed' ? 'bg-green-100 text-green-800' :
                          doc.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-paragraph text-foreground/60">Date</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {doc.date.getTime() > 0 ? format(doc.date, 'MMM d, yyyy') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-foreground/60">{doc.fileSize ? 'File Size' : 'Source'}</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {doc.fileSize ? (doc.fileSize / 1024).toFixed(2) + ' KB' : doc.source === 'generated' ? 'System Generated' : 'Client Upload'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-foreground/60">Client</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {resolveClientName(doc)}
                    </p>
                  </div>
                </div>

                {doc.notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="font-paragraph text-sm text-foreground/80">
                      <strong>Notes:</strong> {doc.notes}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (doc.fileUrl) {
                        window.open(doc.fileUrl, '_blank');
                      }
                    }}
                    disabled={!doc.fileUrl}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  {doc.fileUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="gap-2"
                    >
                      <a href={doc.fileUrl} download={doc.documentName}>
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  )}
                  {doc.source === 'uploaded' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const original = documents.find(d => d._id === doc._id);
                          if (original) {
                            setSelectedDocument(original);
                            setIsShareDialogOpen(true);
                          }
                        }}
                        className="gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteDocument(doc._id, doc.source)}
                        className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="font-paragraph text-sm text-foreground/80">
              Share "{selectedDocument?.documentName}" with someone
            </p>
            <div className="space-y-2">
              <Label htmlFor="shareEmail">Recipient Email</Label>
              <Input
                id="shareEmail"
                type="email"
                placeholder="recipient@example.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shareMessage">Message (optional)</Label>
              <Textarea
                id="shareMessage"
                placeholder="Add a message..."
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleShareDocument} disabled={!shareEmail}>
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
