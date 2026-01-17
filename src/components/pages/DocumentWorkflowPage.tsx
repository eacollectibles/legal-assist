import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { FileText, Plus, Send, Printer, CheckCircle, Clock, AlertCircle, Mail, Download, Eye, Edit, Archive, Zap, Users, TrendingUp, Calendar, Bell, Copy, History, BarChart3, Workflow, Bot, MessageSquare, Trash2, PenTool, Link2 } from 'lucide-react';
import { format } from 'date-fns';
import { generatePDF, embedSignatureInPDF, downloadPDF } from '@/lib/pdf-generator';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import UploadLinkGenerator from '@/components/UploadLinkGenerator';
import EmailDocumentDialog, { EmailFormData } from '@/components/EmailDocumentDialog';
import { sendSignedDocumentEmail, EmailActivityLog } from '@/lib/email-service';

interface DocumentTemplate {
  _id: string;
  templateName?: string;
  templateType?: string;
  templateContent?: string;
  createdBy?: string;
  isActive?: boolean;
  _createdDate?: Date | string;
}

interface GeneratedDocument {
  _id: string;
  documentName?: string;
  templateId?: string;
  clientId?: string;
  clientEmail?: string;
  generatedBy?: string;
  generationDate?: Date | string;
  status?: string;
  sentDate?: Date | string;
  signedDate?: Date | string;
  requiresSignature?: boolean;
  documentUrl?: string;
  signedDocumentUrl?: string;
  uploadToken?: string; // CRITICAL FIX: Store upload token on document
  _createdDate?: Date | string;
}

interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export default function DocumentWorkflowPage() {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Template dialog state
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string>('');
  const [newTemplate, setNewTemplate] = useState({
    templateName: '',
    templateType: 'Authorization Letter',
    templateContent: '',
    isActive: true
  });

  // Generate document dialog state
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [requiresSignature, setRequiresSignature] = useState(true);

  // Send document dialog state
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  // Email signed document states
  const [emailingDocument, setEmailingDocument] = useState<GeneratedDocument | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Signature dialog state
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [documentToSign, setDocumentToSign] = useState<GeneratedDocument | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [templatesRes, docsRes, clientsRes] = await Promise.all([
        BaseCrudService.getAll<DocumentTemplate>('documenttemplates'),
        BaseCrudService.getAll<GeneratedDocument>('generateddocuments'),
        BaseCrudService.getAll<ClientProfile>('clientprofiles')
      ]);

      setTemplates(templatesRes.items);
      setGeneratedDocs(docsRes.items);
      setClients(clientsRes.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';

      if (isEditMode && editingTemplateId) {
        // Update existing template
        const updatedTemplates = templates.map(t => 
          t._id === editingTemplateId 
            ? { ...t, ...newTemplate, createdBy: userEmail }
            : t
        );
        setTemplates(updatedTemplates);
        
        await BaseCrudService.update('documenttemplates', {
          _id: editingTemplateId,
          ...newTemplate,
          createdBy: userEmail
        });
      } else {
        // Create new template
        const newTemplateData = {
          _id: crypto.randomUUID(),
          ...newTemplate,
          createdBy: userEmail,
          _createdDate: new Date()
        };
        
        setTemplates([...templates, newTemplateData]);
        
        await BaseCrudService.create('documenttemplates', newTemplateData);
      }

      setIsTemplateDialogOpen(false);
      setIsEditMode(false);
      setEditingTemplateId('');
      setNewTemplate({
        templateName: '',
        templateType: 'Authorization Letter',
        templateContent: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error saving template:', error);
      loadData();
    }
  };

  const handleEditTemplate = (template: DocumentTemplate) => {
    setIsEditMode(true);
    setEditingTemplateId(template._id);
    setNewTemplate({
      templateName: template.templateName || '',
      templateType: template.templateType || 'Authorization Letter',
      templateContent: template.templateContent || '',
      isActive: template.isActive ?? true
    });
    setIsTemplateDialogOpen(true);
  };

  const handleToggleTemplateStatus = async (templateId: string, currentStatus: boolean) => {
    try {
      const updatedTemplates = templates.map(t => 
        t._id === templateId ? { ...t, isActive: !currentStatus } : t
      );
      setTemplates(updatedTemplates);
      
      await BaseCrudService.update('documenttemplates', {
        _id: templateId,
        isActive: !currentStatus
      });
    } catch (error) {
      console.error('Error toggling template status:', error);
      loadData();
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      return;
    }

    try {
      setTemplates(templates.filter(t => t._id !== templateId));
      await BaseCrudService.delete('documenttemplates', templateId);
    } catch (error) {
      console.error('Error deleting template:', error);
      loadData();
    }
  };

  const handleGenerateDocument = async () => {
    try {
      const template = templates.find(t => t._id === selectedTemplateId);
      const client = clients.find(c => c._id === selectedClientId);
      
      if (!template || !client) return;

      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';

      // Get client's email from user accounts
      const { items: userAccounts } = await BaseCrudService.getAll('useraccounts');
      const clientAccount = userAccounts.find(u => u._id === selectedClientId);
      const clientEmailAddress = clientAccount?.email || selectedClientId;

      // Replace placeholders in template content
      let documentContent = template.templateContent || '';
      documentContent = documentContent.replace(/\{CLIENT_NAME\}/g, `${client.firstName || ''} ${client.lastName || ''}`.trim() || '—');
      documentContent = documentContent.replace(/\{CLIENT_PHONE\}/g, client.phoneNumber || '—');
      documentContent = documentContent.replace(/\{CLIENT_ADDRESS_LINE1\}/g, client.streetAddress || '—');
      documentContent = documentContent.replace(/\{CLIENT_CITY\}/g, client.city || '—');
      documentContent = documentContent.replace(/\{CLIENT_PROVINCE\}/g, client.state || '—');
      documentContent = documentContent.replace(/\{CLIENT_POSTAL_CODE\}/g, client.zipCode || '—');
      documentContent = documentContent.replace(/\{MATTER_REFERENCE\}/g, '—'); // No matter reference field in current schema
      documentContent = documentContent.replace(/\{DATE\}/g, format(new Date(), 'MMMM d, yyyy'));

      // Generate PDF from content
      const docName = documentName || `${template.templateName} - ${client.firstName} ${client.lastName}`;
      const pdfDataUrl = await generatePDF(documentContent, docName);

      const newDoc = {
        _id: crypto.randomUUID(),
        documentName: docName,
        templateId: selectedTemplateId,
        clientId: selectedClientId,
        clientEmail: clientEmailAddress,
        generatedBy: userEmail,
        generationDate: new Date().toISOString(),
        status: 'draft',
        requiresSignature: requiresSignature,
        documentUrl: pdfDataUrl,
        _createdDate: new Date()
      };

      setGeneratedDocs([...generatedDocs, newDoc]);

      await BaseCrudService.create('generateddocuments', newDoc);

      setIsGenerateDialogOpen(false);
      setSelectedTemplateId('');
      setSelectedClientId('');
      setDocumentName('');
      setRequiresSignature(true);
    } catch (error) {
      console.error('Error generating document:', error);
      loadData();
    }
  };

  const handleSendDocument = async () => {
    try {
      const doc = generatedDocs.find(d => d._id === selectedDocumentId);
      if (!doc) return;

      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      // Get user account ID for the client FIRST
      const { items: userAccounts } = await BaseCrudService.getAll('useraccounts');
      const clientAccount = userAccounts.find(u => u.email === doc.clientEmail);

      // CRITICAL FIX: Generate upload token for client to upload additional documents
      let uploadToken: string | undefined;
      try {
        const { createUploadToken } = await import('@/lib/upload-token-service');
        const client = clients.find(c => c._id === doc.clientId);
        const token = await createUploadToken({
          clientId: doc.clientId || 'unknown',
          clientName: client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Client',
          matterId: doc._id,
          matterReference: doc.documentName || 'Document Response',
          documentId: doc._id,
          createdByParalegalId: userEmail,
          createdByParalegalName: userName,
          allowedPurpose: 'DOCUMENT_RESPONSE',
          expiryHours: 168, // 1 week
          maxUsageCount: 0, // Unlimited
        });
        uploadToken = token.token;
      } catch (error) {
        console.error('Failed to generate upload token:', error);
      }

      // Copy document to client's documents collection
      const clientDocId = crypto.randomUUID();
      await BaseCrudService.create('clientdocuments', {
        _id: clientDocId,
        documentName: doc.documentName,
        fileUrl: doc.documentUrl,
        uploadDate: new Date().toISOString(),
        clientEmail: doc.clientEmail,
        fileType: 'application/pdf',
        documentCategory: 'generated-document',
        notes: `Generated from template. ${doc.requiresSignature ? 'Signature required.' : ''}`
      });

      // Update generated document status to 'sent' and store upload token
      const updatedDocs = generatedDocs.map(d => 
        d._id === selectedDocumentId 
          ? { ...d, status: 'sent', sentDate: new Date().toISOString(), uploadToken }
          : d
      );
      setGeneratedDocs(updatedDocs);

      await BaseCrudService.update('generateddocuments', {
        _id: selectedDocumentId,
        status: 'sent',
        sentDate: new Date().toISOString(),
        uploadToken
      });

      // Create a message record for the client
      await BaseCrudService.create('messages', {
        _id: crypto.randomUUID(),
        senderEmail: 'admin@legalservices.com',
        senderName: 'Legal Services Team',
        recipientEmail: doc.clientEmail || '',
        messageContent: `Document Ready for Signature: ${doc.documentName}\n\n${emailMessage}\n\nPlease review and sign the document in your client portal under the Documents section.`,
        sentDate: new Date().toISOString(),
        isRead: false,
        conversationId: crypto.randomUUID()
      });

      // Create activity log entry
      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: clientAccount?._id || doc.clientEmail || '',
        activityType: 'document_sent',
        activityDescription: `Document "${doc.documentName}" was sent to client for ${doc.requiresSignature ? 'signature' : 'review'}`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: new Date().toISOString(),
        relatedItemId: clientDocId
      });

      // Create notification for the client
      if (clientAccount) {
        await BaseCrudService.create('notifications', {
          _id: crypto.randomUUID(),
          userId: clientAccount._id,
          notificationType: 'document_upload',
          notificationTitle: 'New Document Available',
          notificationMessage: `A new document "${doc.documentName}" has been sent to you. ${doc.requiresSignature ? 'Your signature is required.' : 'Please review it in your documents section.'}`,
          isRead: false,
          createdDate: new Date().toISOString(),
          relatedActivityId: clientDocId
        });
      }

      setIsSendDialogOpen(false);
      setSelectedDocumentId('');
      setEmailMessage('');
      alert('Document sent successfully to client! The document is now available in the client\'s Documents section.');
    } catch (error) {
      console.error('Error sending document:', error);
      alert('Failed to send document. Please try again.');
      loadData();
    }
  };

  const handlePrintDocument = (doc: GeneratedDocument) => {
    // CRITICAL FIX: Use signed document URL if available, otherwise use original
    const documentUrl = doc.status === 'signed' && doc.signedDocumentUrl 
      ? doc.signedDocumentUrl 
      : doc.documentUrl;
    
    if (!documentUrl) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Document</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <iframe src="${documentUrl}" style="width: 100%; height: 100vh; border: none;"></iframe>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
    }
  };

  const handleMarkAsSigned = async (docId: string) => {
    const doc = generatedDocs.find(d => d._id === docId);
    if (!doc) return;

    // Open signature dialog
    setDocumentToSign(doc);
    setIsSignatureDialogOpen(true);
  };

  const handleSignatureComplete = async (signatureData: SignatureData) => {
    if (!documentToSign) return;

    try {
      // Embed signature into PDF
      const signedPdfDataUrl = await embedSignatureInPDF(
        documentToSign.documentUrl || '',
        signatureData,
        documentToSign.documentName || 'Document'
      );

      // Update generated document with signed version
      const updatedDocs = generatedDocs.map(d => 
        d._id === documentToSign._id 
          ? { 
              ...d, 
              status: 'signed', 
              signedDate: signatureData.timestamp.toISOString(),
              signedDocumentUrl: signedPdfDataUrl
            }
          : d
      );
      setGeneratedDocs(updatedDocs);
      
      await BaseCrudService.update('generateddocuments', {
        _id: documentToSign._id,
        status: 'signed',
        signedDate: signatureData.timestamp.toISOString(),
        signedDocumentUrl: signedPdfDataUrl
      });

      // Update the client's document with the signed version
      const { items: clientDocs } = await BaseCrudService.getAll('clientdocuments');
      const clientDoc = clientDocs.find(cd => 
        cd.documentName === documentToSign.documentName && 
        cd.clientEmail === documentToSign.clientEmail
      );

      if (clientDoc) {
        await BaseCrudService.update('clientdocuments', {
          _id: clientDoc._id,
          fileUrl: signedPdfDataUrl,
          notes: `${clientDoc.notes || ''}\n\nElectronically signed on ${signatureData.signedDate} at ${signatureData.signedTime}. IP Address: ${signatureData.ipAddress}`
        });
      }

      // Create activity log
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: documentToSign.clientId || '',
        activityType: 'document_signed',
        activityDescription: `Document "${documentToSign.documentName}" was electronically signed`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: signatureData.timestamp.toISOString(),
        relatedItemId: documentToSign._id
      });

      setIsSignatureDialogOpen(false);
      setDocumentToSign(null);
      alert('Document signed successfully! The signed version is now available in the client\'s Documents section.');
    } catch (error) {
      console.error('Error signing document:', error);
      alert('Failed to sign document. Please try again.');
      loadData();
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      setGeneratedDocs(generatedDocs.filter(d => d._id !== docId));
      await BaseCrudService.delete('generateddocuments', docId);
    } catch (error) {
      console.error('Error deleting document:', error);
      loadData();
    }
  };

  const handleEmailSignedDocument = async (emailData: EmailFormData) => {
    if (!emailingDocument) return;

    try {
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      const client = clients.find(c => c._id === emailingDocument.clientId);
      const clientName = client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Client';

      // Send email and get activity log
      const activityLog: EmailActivityLog = await sendSignedDocumentEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        documentUrl: emailingDocument.signedDocumentUrl || emailingDocument.documentUrl || '',
        documentName: emailingDocument.documentName || 'Document',
        clientName,
        paralegalName: userName,
        documentId: emailingDocument._id,
        clientId: emailingDocument.clientId,
      });

      // Save comprehensive activity log to database with Graph headers
      const logDescription = `Document "${emailingDocument.documentName}" emailed to ${emailData.to}. Status: ${activityLog.deliveryStatus}. Subject: "${activityLog.renderedSubject}"${
        activityLog.graphRequestId ? `. Graph Request ID: ${activityLog.graphRequestId}` : ''
      }${activityLog.graphClientRequestId ? `. Client Request ID: ${activityLog.graphClientRequestId}` : ''}${
        activityLog.graphAgsDiagnostic ? `. AGS Diagnostic: ${activityLog.graphAgsDiagnostic}` : ''
      }`;
      
      await BaseCrudService.create('activitylogs', {
        _id: activityLog._id,
        userId: emailingDocument.clientId || '',
        activityType: 'document_emailed',
        activityDescription: logDescription,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: activityLog.timestamp,
        relatedItemId: emailingDocument._id,
      });

      setIsEmailDialogOpen(false);
      setEmailingDocument(null);
      alert('Email sent successfully! Activity has been logged.');
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Log failed attempt
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'admin@legalservices.com';
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: emailingDocument.clientId || '',
        activityType: 'document_email_failed',
        activityDescription: `Failed to email document "${emailingDocument.documentName}" to ${emailData.to}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: new Date().toISOString(),
        relatedItemId: emailingDocument._id,
      });

      throw error;
    }
  };

  const openEmailDialog = (doc: GeneratedDocument) => {
    setEmailingDocument(doc);
    setIsEmailDialogOpen(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-200 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-400 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getClientName = (clientId?: string) => {
    const client = clients.find(c => c._id === clientId);
    return client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Unknown Client';
  };

  // Workflow analytics
  const totalDocuments = generatedDocs.length;
  const pendingSignatures = generatedDocs.filter(d => d.status === 'sent' && d.requiresSignature).length;
  const completedDocs = generatedDocs.filter(d => d.status === 'signed').length;
  const avgProcessingTime = '2.5 days'; // This would be calculated from actual data
  const completionRate = totalDocuments > 0 ? Math.round((completedDocs / totalDocuments) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full max-w-[120rem] mx-auto px-6 py-12">
        {/* Enhanced Header with Analytics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
                Document Workflow Management
              </h1>
              <p className="font-paragraph text-lg text-foreground/80">
                Streamlined document creation, tracking, and signature management
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" className="gap-2">
                <Workflow className="h-4 w-4" />
                Automation Rules
              </Button>
            </div>
          </div>

          {/* Workflow Performance Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Total Documents</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{totalDocuments}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">All time</p>
                  </div>
                  <FileText className="w-10 h-10 text-blue-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Pending Signatures</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{pendingSignatures}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">Awaiting action</p>
                  </div>
                  <Clock className="w-10 h-10 text-amber-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Completion Rate</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{completionRate}%</p>
                    <Progress value={completionRate} className="mt-2 h-2" />
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Avg Processing</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{avgProcessingTime}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">Draft to signed</p>
                  </div>
                  <Zap className="w-10 h-10 text-purple-600/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Automation Suggestions */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="h-5 w-5" />
                Smart Workflow Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <Bell className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Auto-Reminders</p>
                    <p className="font-paragraph text-sm text-foreground/70">Send automatic follow-ups for pending signatures after 3 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <Copy className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Batch Processing</p>
                    <p className="font-paragraph text-sm text-foreground/70">Generate multiple documents at once for efficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Client Notifications</p>
                    <p className="font-paragraph text-sm text-foreground/70">Automatic SMS/email alerts when documents are ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="documents">Generated Documents</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
          </TabsList>

          {/* Generated Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Generated Documents
              </h2>
              <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Generate Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Generate Document from Template</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="template">Select Template</Label>
                      <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.filter(t => t.isActive).map((template) => (
                            <SelectItem key={template._id} value={template._id}>
                              {template.templateName} ({template.templateType})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client">Select Client</Label>
                      <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client._id} value={client._id}>
                              {client.firstName} {client.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="docName">Document Name (Optional)</Label>
                      <Input
                        id="docName"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="Auto-generated if left blank"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="requiresSignature"
                        checked={requiresSignature}
                        onChange={(e) => setRequiresSignature(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="requiresSignature">Requires Client Signature</Label>
                    </div>

                    <Button onClick={handleGenerateDocument} className="w-full" disabled={!selectedTemplateId || !selectedClientId}>
                      Generate Document
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : generatedDocs.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No generated documents yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                generatedDocs.map((doc) => (
                  <Card key={doc._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">
                            {doc.documentName}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(doc.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(doc.status)}
                                {doc.status?.toUpperCase()}
                              </span>
                            </Badge>
                            {doc.requiresSignature && (
                              <Badge variant="outline">Signature Required</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <FileText className="h-4 w-4" />
                          <span className="font-paragraph">
                            Client: {getClientName(doc.clientId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Clock className="h-4 w-4" />
                          <span className="font-paragraph">
                            Generated: {doc.generationDate ? format(new Date(doc.generationDate), 'MMM d, yyyy') : 'N/A'}
                          </span>
                        </div>
                        {doc.sentDate && (
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Send className="h-4 w-4" />
                            <span className="font-paragraph">
                              Sent: {format(new Date(doc.sentDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                        {doc.signedDate && (
                          <div className="flex items-center gap-2 text-foreground/80">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-paragraph">
                              Signed: {format(new Date(doc.signedDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const urlToView = doc.status === 'signed' && doc.signedDocumentUrl 
                              ? doc.signedDocumentUrl 
                              : doc.documentUrl;
                            if (urlToView) {
                              window.open(urlToView, '_blank');
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
                          onClick={() => {
                            const urlToDownload = doc.status === 'signed' && doc.signedDocumentUrl 
                              ? doc.signedDocumentUrl 
                              : doc.documentUrl;
                            if (urlToDownload) {
                              downloadPDF(urlToDownload, doc.documentName || 'document');
                            }
                          }}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePrintDocument(doc)}
                          className="gap-2"
                        >
                          <Printer className="h-4 w-4" />
                          Print
                        </Button>
                        {doc.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedDocumentId(doc._id);
                              setIsSendDialogOpen(true);
                            }}
                            className="gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            Send to Client
                          </Button>
                        )}

                        {doc.status === 'signed' && doc.signedDocumentUrl && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (doc.signedDocumentUrl) {
                                  window.open(doc.signedDocumentUrl, '_blank');
                                }
                              }}
                              className="gap-2 border-green-600 text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4" />
                              View Signed
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openEmailDialog(doc)}
                              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Mail className="h-4 w-4" />
                              Email Signed Document
                            </Button>
                          </>
                        )}

                        {(doc.status === 'sent' || doc.status === 'signed') && doc.uploadToken && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const { generateUploadLink } = require('@/lib/upload-token-service');
                              const link = generateUploadLink(doc.uploadToken!);
                              navigator.clipboard.writeText(link);
                              alert('Upload link copied to clipboard!');
                            }}
                            className="gap-2"
                          >
                            <Link2 className="h-4 w-4" />
                            Copy Upload Link
                          </Button>
                        )}

                        {doc.requiresSignature && doc.status === 'sent' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsSigned(doc._id)}
                            className="gap-2"
                          >
                            <PenTool className="h-4 w-4" />
                            Sign Document
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="gap-2"
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
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Document Templates
              </h2>
              <Dialog open={isTemplateDialogOpen} onOpenChange={(open) => {
                setIsTemplateDialogOpen(open);
                if (!open) {
                  setIsEditMode(false);
                  setEditingTemplateId('');
                  setNewTemplate({
                    templateName: '',
                    templateType: 'Authorization Letter',
                    templateContent: '',
                    isActive: true
                  });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Document Template' : 'Create Document Template'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input
                        id="templateName"
                        value={newTemplate.templateName}
                        onChange={(e) => setNewTemplate({ ...newTemplate, templateName: e.target.value })}
                        placeholder="e.g., Client Authorization Letter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="templateType">Template Type</Label>
                      <Select
                        value={newTemplate.templateType}
                        onValueChange={(value) => setNewTemplate({ ...newTemplate, templateType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Authorization Letter">Authorization Letter</SelectItem>
                          <SelectItem value="Direction Letter">Direction Letter</SelectItem>
                          <SelectItem value="Retainer Agreement">Retainer Agreement</SelectItem>
                          <SelectItem value="Consent Form">Consent Form</SelectItem>
                          <SelectItem value="Notice">Notice</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="templateContent">Template Content</Label>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-foreground/60">
                          Use placeholders: {'{CLIENT_NAME}'}, {'{CLIENT_PHONE}'}, {'{DATE}'}
                        </p>
                        <Badge variant="outline" className="gap-1">
                          <PenTool className="h-3 w-3" />
                          HTML Editor
                        </Badge>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<strong>${selectedText || 'bold text'}</strong>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <strong>B</strong>
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<em>${selectedText || 'italic text'}</em>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <em>I</em>
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<u>${selectedText || 'underlined text'}</u>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <u>U</u>
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<h1>Heading 1</h1>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            H1
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<h2>Heading 2</h2>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            H2
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<p>Paragraph text</p>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            P
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            • List
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            1. List
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<table border="1" style="border-collapse: collapse; width: 100%;">\n  <tr>\n    <th style="padding: 8px; border: 1px solid #000;">Header 1</th>\n    <th style="padding: 8px; border: 1px solid #000;">Header 2</th>\n  </tr>\n  <tr>\n    <td style="padding: 8px; border: 1px solid #000;">Cell 1</td>\n    <td style="padding: 8px; border: 1px solid #000;">Cell 2</td>\n  </tr>\n</table>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Table
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<br/>` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Line Break
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<hr/>` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Divider
                          </Button>
                        </div>
                        <Textarea
                          id="templateContent"
                          value={newTemplate.templateContent}
                          onChange={(e) => setNewTemplate({ ...newTemplate, templateContent: e.target.value })}
                          placeholder="Enter HTML template content with placeholders..."
                          rows={16}
                          className="border-0 rounded-none font-mono text-sm"
                        />
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                        <p className="text-xs font-semibold text-blue-900 mb-1">HTML Preview:</p>
                        <div 
                          className="bg-white border border-blue-200 rounded p-3 text-sm max-h-40 overflow-y-auto"
                          dangerouslySetInnerHTML={{ __html: newTemplate.templateContent || '<p class="text-gray-400">Preview will appear here...</p>' }}
                        />
                      </div>
                    </div>

                    <Button onClick={handleCreateTemplate} className="w-full">
                      {isEditMode ? 'Update Template' : 'Create Template'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : templates.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No templates yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                templates.map((template) => (
                  <Card key={template._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">
                            {template.templateName}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{template.templateType}</Badge>
                            <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}>
                              {template.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-paragraph text-sm text-foreground/80 whitespace-pre-wrap line-clamp-4">
                          {template.templateContent}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <span>Created by: {template.createdBy}</span>
                        <span>•</span>
                        <span>{template._createdDate ? format(new Date(template._createdDate), 'MMM d, yyyy') : 'N/A'}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTemplate(template)}
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Template
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleTemplateStatus(template._id, template.isActive ?? true)}
                          className="gap-2"
                        >
                          {template.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteTemplate(template._id)}
                          className="gap-2"
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
          </TabsContent>
        </Tabs>

        {/* Send Document Dialog */}
        <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Document to Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="emailMessage">Email Message (Optional)</Label>
                <Textarea
                  id="emailMessage"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Add a personal message for the client..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendDocument} className="gap-2">
                <Send className="h-4 w-4" />
                Send Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Signature Dialog */}
        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DocumentSignature
              documentId={documentToSign?._id || ''}
              documentName={documentToSign?.documentName || 'Document'}
              onSignatureComplete={handleSignatureComplete}
              onCancel={() => {
                setIsSignatureDialogOpen(false);
                setDocumentToSign(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Email Signed Document Dialog */}
        <EmailDocumentDialog
          document={emailingDocument}
          isOpen={isEmailDialogOpen}
          onClose={() => {
            setIsEmailDialogOpen(false);
            setEmailingDocument(null);
          }}
          onSend={handleEmailSignedDocument}
          paralegalName={
            localStorage.getItem('currentUser')
              ? JSON.parse(localStorage.getItem('currentUser')!).firstName + ' ' + JSON.parse(localStorage.getItem('currentUser')!).lastName
              : 'Admin'
          }
          clientName={
            emailingDocument && clients.find(c => c._id === emailingDocument.clientId)
              ? `${clients.find(c => c._id === emailingDocument.clientId)?.firstName || ''} ${clients.find(c => c._id === emailingDocument.clientId)?.lastName || ''}`.trim()
              : 'Client'
          }
          uploadToken={emailingDocument?.uploadToken}
        />
      </main>

      <Footer />
    </div>
  );
}
