import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, FileSignature, Download, Loader } from 'lucide-react';
import { GeneratedDocuments } from '@/entities';

interface SignaturesTabProps {
  generatedDocuments: GeneratedDocuments[];
  isLoadingGeneratedDocs: boolean;
  onSignDocument: (doc: GeneratedDocuments) => void;
}

export default function SignaturesTab({ 
  generatedDocuments, 
  isLoadingGeneratedDocs, 
  onSignDocument 
}: SignaturesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl flex items-center gap-2">
          <FileSignature className="w-6 h-6 text-primary" />
          Documents Requiring Signature
        </CardTitle>
        <CardDescription className="font-paragraph">
          Review and electronically sign documents that require your signature
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingGeneratedDocs ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80">Loading documents...</p>
          </div>
        ) : generatedDocuments.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <FileSignature className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80 mb-4">
              No documents available for signing at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {generatedDocuments.map(doc => {
              const isSigned = doc.status === 'Signed';
              const requiresSignature = doc.requiresSignature;

              return (
                <div
                  key={doc._id}
                  className={`rounded-lg p-6 border transition-all ${
                    isSigned
                      ? 'bg-green-50 border-green-200'
                      : requiresSignature
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileSignature className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            {doc.documentName || 'Untitled Document'}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                isSigned
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : requiresSignature
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                  : 'bg-gray-100 text-gray-800 border-gray-300'
                              }
                            >
                              {doc.status || 'Pending'}
                            </Badge>
                            {requiresSignature && !isSigned && (
                              <Badge className="bg-destructive text-white">
                                Signature Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ml-13 space-y-2 text-sm font-paragraph">
                        {doc.generationDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-foreground/60">Generated:</span>
                            <span className="text-foreground font-semibold">
                              {new Date(doc.generationDate).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {isSigned && doc.signedDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-foreground/60">Signed:</span>
                            <span className="text-foreground font-semibold">
                              {new Date(doc.signedDate).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      {doc.documentUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1 md:flex-none"
                        >
                          <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">View</span>
                          </a>
                        </Button>
                      )}
                      {requiresSignature && !isSigned && (
                        <Button
                          size="sm"
                          onClick={() => onSignDocument(doc)}
                          className="bg-primary hover:bg-primary/90 text-white flex-1 md:flex-none"
                        >
                          <FileSignature className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Sign Now</span>
                          <span className="md:hidden">Sign</span>
                        </Button>
                      )}
                      {isSigned && doc.signedDocumentUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1 md:flex-none border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <a href={doc.signedDocumentUrl} download>
                            <Download className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Download Signed</span>
                            <span className="md:hidden">Download</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
