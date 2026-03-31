import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Star } from 'lucide-react';
import { ClientDocument } from './types';

interface QuickAccessDocsProps {
  documents: ClientDocument[];
}

export default function QuickAccessDocs({ documents }: QuickAccessDocsProps) {
  // Get most recent 5 documents
  const quickAccessDocs = [...documents]
    .sort((a, b) => {
      const dateA = new Date(a.uploadDate || 0).getTime();
      const dateB = new Date(b.uploadDate || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

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

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-3xl font-bold text-foreground flex items-center gap-2">
          <Star className="w-8 h-8 text-primary" />
          Quick Access Documents
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickAccessDocs.length === 0 ? (
          <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80">No documents yet. Upload your first document to get started.</p>
          </div>
        ) : (
          quickAccessDocs.map(doc => (
            <Card key={doc._id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base font-bold text-foreground mb-1 truncate">
                      {doc.documentName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
                      <span>{doc.fileType?.split('/')[1]?.toUpperCase() || 'Unknown'}</span>
                      <span>•</span>
                      <span>{doc.uploadDate instanceof Date ? doc.uploadDate.toLocaleDateString() : new Date(doc.uploadDate || '').toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDocumentViewer(doc)}
                        className="flex-1 border-primary text-primary hover:bg-primary/5 font-semibold"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        <span className="text-xs">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a href={doc.fileUrl} download={doc.documentName}>
                          <Download className="w-4 h-4 mr-1" />
                          <span className="text-xs">Download</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
