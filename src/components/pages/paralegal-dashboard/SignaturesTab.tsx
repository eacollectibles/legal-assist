import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, FileSignature, Download, Mail, CheckCircle } from 'lucide-react';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import EmailDocumentDialog, { EmailFormData } from '@/components/EmailDocumentDialog';
import { sendSignedDocumentEmail, EmailActivityLog } from '@/lib/email-service';
import { GeneratedDocuments } from '@/entities';
import { useParalegalDashboard } from './ParalegalDashboardContext';

export default function SignaturesTab() {
  const { clients, paralegals, currentParalegalId } = useParalegalDashboard();
  
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocuments[]>([]);
  const [isLoadingGeneratedDocs, setIsLoadingGeneratedDocs] = useState(true);
  const [signingDocument, setSigningDocument] = useState<GeneratedDocuments | null>(null);
  const [signatureSuccess, setSignatureSuccess] = useState(false);
  
  // Email states
  const [emailingDocument, setEmailingDocument] = useState<GeneratedDocuments | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailUploadToken, setEmailUploadToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadGeneratedDocuments();
  }, []);

  const loadGeneratedDocuments = async () => {
    setIsLoadingGeneratedDocs(true);
    try {
      const { items } = await BaseCrudService.getAll<GeneratedDocuments>('generateddocuments');
      
      // Sort by date, newest first
      const sorted = (items || []).sort((a, b) => {
        const dateA = new Date(a.generationDate || 0).getTime();
        const dateB = new Date(b.generationDate || 0).getTime();
        return dateB - dateA;
      });
      
      setGeneratedDocuments(sorted);
    } catch (error) {
      console.error('Error loading generated documents:', error);
    } finally {
      setIsLoadingGeneratedDocs(false);
    }
  };

  const handleSignatureComplete = async (signatureData: SignatureData) => {
    if (!signingDocument) return;

    try {
      const { embedSignatureInPDF } = await import('@/lib/pdf-generator');
      const signedPdfDataUrl = await embedSignatureInPDF(
        signingDocument.documentUrl || '',
        signatureData,
        signingDocument.documentName || 'Document'
      );

      const updatedDoc: GeneratedDocuments = {
        ...signingDocument,
        status: 'Signed',
        signedDate: signatureData.timestamp,
        signedDocumentUrl: signedPdfDataUrl,
      };

      await BaseCrudService.update('generateddocuments', updatedDoc);

      setGeneratedDocuments(prev =>
        prev.map(doc => doc._id === signingDocument._id ? updatedDoc : doc)
      );

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: currentParalegalId,
        activityType: 'document_signed',
        activityDescription: `Document "${signingDocument.documentName}" was electronically signed by paralegal`,
        performedBy: 'paralegal@legalservices.com',
        performedByName: 'Paralegal',
        timestamp: signatureData.timestamp.toISOString(),
        relatedItemId: signingDocument._id
      });

      setSigningDocument(null);
      setSignatureSuccess(true);
      setTimeout(() => setSignatureSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to save signature:', error);
      alert('Failed to save signature. Please try again.');
    }
  };

  const handleEmailDocument = async (emailData: EmailFormData) => {
    if (!emailingDocument) return;

    try {
      const paralegal = paralegals.find(p => p._id === currentParalegalId);
      const paralegalName = paralegal
        ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim()
        : 'Paralegal';

      const client = clients.find(c => c._id === emailingDocument.clientId);
      const clientName = client
        ? `${client.firstName || ''} ${client.lastName || ''}`.trim()
        : 'Client';

      const activityLog: EmailActivityLog = await sendSignedDocumentEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        documentUrl: emailingDocument.signedDocumentUrl || emailingDocument.documentUrl || '',
        documentName: emailingDocument.documentName || 'Document',
        clientName,
        paralegalName,
        documentId: emailingDocument._id,
        clientId: emailingDocument.clientId,
      });

      const logDescription = `Document "${emailingDocument.documentName}" emailed to ${emailData.to}. Status: ${activityLog.deliveryStatus}.`;
      
      await BaseCrudService.create('activitylogs', {
        _id: activityLog._id,
        userId: currentParalegalId,
        activityType: 'document_emailed',
        activityDescription: logDescription,
        performedBy: activityLog.senderEmail,
        performedByName: activityLog.senderName,
        timestamp: activityLog.timestamp,
        relatedItemId: emailingDocument._id,
      });

      if (emailingDocument.status !== 'Sent') {
        await BaseCrudService.update('generateddocuments', {
          _id: emailingDocument._id,
          status: 'Sent',
          sentDate: new Date().toISOString(),
        });

        setGeneratedDocuments(prev =>
          prev.map(doc =>
            doc._id === emailingDocument._id
              ? { ...doc, status: 'Sent', sentDate: new Date().toISOString() }
              : doc
          )
        );
      }

      setIsEmailDialogOpen(false);
      setEmailingDocument(null);
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  };

  const openEmailDialog = async (doc: GeneratedDocuments) => {
    setEmailingDocument(doc);
    
    try {
      const { createUploadToken } = await import('@/lib/upload-token-service');
      
      const client = clients.find(c => c._id === doc.clientId);
      const clientName = client
        ? `${client.firstName || ''} ${client.lastName || ''}`.trim()
        : 'Client';
      
      const paralegal = paralegals.find(p => p._id === currentParalegalId);
      const paralegalName = paralegal
        ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim()
        : 'Paralegal';

      const token = await createUploadToken({
        clientId: doc.clientId || 'unknown',
        clientName,
        matterId: doc._id,
        matterReference: doc.documentName || 'Document Response',
        documentId: doc._id,
        createdByParalegalId: currentParalegalId,
        createdByParalegalName: paralegalName,
        expiresInDays: 7
      });

      setEmailUploadToken(token);
    } catch (error) {
      console.error('Error creating upload token:', error);
    }

    setIsEmailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">
          Documents Requiring Signature
        </h2>
      </div>

      {/* Success Messages */}
      {signatureSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <p className="font-paragraph text-green-800">Document signed successfully!</p>
        </div>
      )}
      
      {emailSuccess && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <Mail className="w-6 h-6 text-blue-600" />
          <p className="font-paragraph text-blue-800">Document emailed successfully!</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-primary" />
            Sign Documents
          </CardTitle>
          <p className="font-paragraph text-foreground/80">
            Review and electronically sign documents that require your signature
          </p>
        </CardHeader>
        <CardContent>
          {isLoadingGeneratedDocs ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
                          {doc.clientEmail && (
                            <div className="flex items-center gap-2">
                              <span className="text-foreground/60">Client:</span>
                              <span className="text-foreground font-semibold">{doc.clientEmail}</span>
                            </div>
                          )}
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
                          <Button variant="outline" size="sm" asChild className="flex-1 md:flex-none">
                            <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">View</span>
                            </a>
                          </Button>
                        )}
                        {requiresSignature && !isSigned && (
                          <Button
                            size="sm"
                            onClick={() => setSigningDocument(doc)}
                            className="bg-primary hover:bg-primary/90 text-white flex-1 md:flex-none"
                          >
                            <FileSignature className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Sign Now</span>
                            <span className="md:hidden">Sign</span>
                          </Button>
                        )}
                        {isSigned && doc.signedDocumentUrl && (
                          <>
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
                            <Button
                              size="sm"
                              onClick={() => openEmailDialog(doc)}
                              className="bg-blue-600 hover:bg-blue-700 text-white flex-1 md:flex-none"
                            >
                              <Mail className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">Email Document</span>
                              <span className="md:hidden">Email</span>
                            </Button>
                          </>
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

      {/* Signature Dialog */}
      {signingDocument && (
        <DocumentSignature
          documentName={signingDocument.documentName || 'Document'}
          onSignatureComplete={handleSignatureComplete}
          onClose={() => setSigningDocument(null)}
        />
      )}

      {/* Email Dialog */}
      {emailingDocument && (
        <EmailDocumentDialog
          open={isEmailDialogOpen}
          onOpenChange={(open) => {
            setIsEmailDialogOpen(open);
            if (!open) {
              setEmailingDocument(null);
              setEmailUploadToken(undefined);
            }
          }}
          documentName={emailingDocument.documentName || 'Document'}
          recipientEmail={emailingDocument.clientEmail || ''}
          onSend={handleEmailDocument}
          uploadToken={emailUploadToken}
        />
      )}
    </div>
  );
}
