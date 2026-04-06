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
import { FileText, Search, Filter, Eye, Download, Share2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import type { ClientDocument } from './types';

export default function FileManagementTab() {
  const { documents, setDocuments, isLoading } = useParalegalDashboard();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  
  // Share dialog states
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.documentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.documentCategory === filterCategory;
    
    let matchesDate = true;
    if (filterDateFrom || filterDateTo) {
      const docDate = new Date(doc.uploadDate || 0);
      if (filterDateFrom) matchesDate = matchesDate && docDate >= new Date(filterDateFrom);
      if (filterDateTo) matchesDate = matchesDate && docDate <= new Date(filterDateTo);
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await BaseCrudService.delete('clientdocuments', documentId);
      setDocuments(prev => prev.filter(d => d._id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
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

          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="grid gap-4" style={{ minHeight: '400px' }}>
        {isLoading ? null : filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-foreground/40 mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                {documents.length === 0 ? 'No documents available' : 'No documents match your filters'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="font-heading text-xl mb-2">
                      {doc.documentName}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">
                        {doc.documentCategory 
                          ? doc.documentCategory.charAt(0).toUpperCase() + doc.documentCategory.slice(1).replace('-', ' ')
                          : 'Uncategorized'}
                      </Badge>
                      <Badge className="bg-pastelbeige text-foreground">
                        {doc.fileType?.split('/')[1]?.toUpperCase() || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-paragraph text-foreground/60">Upload Date</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {doc.uploadDate ? format(new Date(doc.uploadDate), 'MMM d, yyyy') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-foreground/60">File Size</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {doc.fileSize ? (doc.fileSize / 1024).toFixed(2) + ' KB' : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-foreground/60">Client</p>
                    <p className="font-paragraph font-semibold text-foreground">
                      {doc.clientEmail || 'N/A'}
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
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedDocument(doc);
                      setIsShareDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteDocument(doc._id)}
                    className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
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
