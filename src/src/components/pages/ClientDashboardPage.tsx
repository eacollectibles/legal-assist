import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { FileText, MessageSquare, CreditCard, User, Bell, BellDot, FileSignature, Info, CheckCircle } from 'lucide-react';
import { getCurrentUser, isAuthenticated, isAdmin } from '@/lib/auth-service';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import { GeneratedDocuments, ClientProfiles } from '@/entities';

// Import tab components
import DocumentsTab from './dashboard/DocumentsTab';
import SignaturesTab from './dashboard/SignaturesTab';
import ProfileTab from './dashboard/ProfileTab';
import PaymentsTab from './dashboard/PaymentsTab';
import MessagesTab from './dashboard/MessagesTab';
import NotificationsTab from './dashboard/NotificationsTab';
import QuickAccessDocs from './dashboard/QuickAccessDocs';

// Import types
import { 
  CurrentUser, 
  ClientDocument, 
  ClientProfile, 
  PaymentRecord, 
  Message, 
  Notification, 
  UserAccount 
} from './dashboard/types';

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser() as CurrentUser | null;

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
      return;
    }
    
    if (currentUser?.isAdmin) {
      navigate('/paralegal-dashboard');
      return;
    }
  }, [navigate, currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <p className="font-paragraph text-foreground/80">Redirecting to login...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return <ClientDashboardContent currentUser={currentUser} />;
}

function ClientDashboardContent({ currentUser }: { currentUser: CurrentUser }) {
  const navigate = useNavigate();
  
  // Core data state
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocuments[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [isLoadingGeneratedDocs, setIsLoadingGeneratedDocs] = useState(true);

  // UI state
  const [intakeCompleted, setIntakeCompleted] = useState(false);
  const [showIntakeBanner, setShowIntakeBanner] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userAccountId, setUserAccountId] = useState<string>('');
  const [assignedParalegal, setAssignedParalegal] = useState<string>('');
  
  // Signature state
  const [signingDocument, setSigningDocument] = useState<GeneratedDocuments | null>(null);
  const [signatureSuccess, setSignatureSuccess] = useState(false);

  // Load all data on mount
  useEffect(() => {
    loadUserAccountId();
    loadDocuments();
    loadProfile();
    loadPayments();
    loadMessages();
    loadAssignedParalegal();
    loadGeneratedDocuments();
    checkIntakeStatus();
  }, [currentUser?.email]);

  useEffect(() => {
    if (userAccountId) {
      loadNotifications();
    }
  }, [userAccountId]);

  const loadUserAccountId = async () => {
    try {
      const { items } = await BaseCrudService.getAll<UserAccount>('useraccounts');
      const account = items?.find(acc => acc.email === currentUser?.email);
      if (account) {
        setUserAccountId(account._id);
      }
    } catch (error) {
      console.error('Failed to load user account ID:', error);
    }
  };

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<ClientDocument>('clientdocuments');
      const userDocuments = items?.filter(doc => doc.clientEmail === currentUser?.email) || [];
      setDocuments(userDocuments);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const { items } = await BaseCrudService.getAll<ClientProfiles>('clientprofiles');
      let userProfile = items?.find(p => p._id === currentUser?.email);
      if (!userProfile && userAccountId) {
        userProfile = items?.find(p => p._id === userAccountId);
      }
      setProfile(userProfile || null);
      if (userProfile) {
        setIntakeCompleted(userProfile.intakeCompleted || false);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const loadPayments = async () => {
    setIsLoadingPayments(true);
    try {
      const { items } = await BaseCrudService.getAll<PaymentRecord>('paymentrecords');
      const userPayments = items?.filter(p => 
        p._id.includes(currentUser?.email || '') || 
        p._id.startsWith(currentUser?.email || '')
      ) || [];
      setPayments(userPayments);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const { items } = await BaseCrudService.getAll<Message>('messages');
      const userMessages = items?.filter(m => 
        m.senderEmail === currentUser?.email || m.recipientEmail === currentUser?.email
      ) || [];
      userMessages.sort((a, b) => {
        const dateA = new Date(a.sentDate || 0).getTime();
        const dateB = new Date(b.sentDate || 0).getTime();
        return dateB - dateA;
      });
      setMessages(userMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const loadNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const { items } = await BaseCrudService.getAll<Notification>('notifications');
      const userNotifications = items?.filter(n => n.userId === userAccountId) || [];
      userNotifications.sort((a, b) => {
        const dateA = new Date(a.createdDate || 0).getTime();
        const dateB = new Date(b.createdDate || 0).getTime();
        return dateB - dateA;
      });
      setNotifications(userNotifications);
      setUnreadCount(userNotifications.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const loadAssignedParalegal = async () => {
    try {
      const { items: assignments } = await BaseCrudService.getAll('fileassignments');
      const { items: users } = await BaseCrudService.getAll('useraccounts');
      const userAssignment = assignments?.find(a => a.clientId === userAccountId || a.clientId === currentUser?.email);
      if (userAssignment && userAssignment.paralegalId) {
        const paralegal = users?.find(u => u._id === userAssignment.paralegalId);
        if (paralegal) {
          setAssignedParalegal(`${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim() || paralegal.email || 'Unknown');
        }
      }
    } catch (error) {
      console.error('Failed to load assigned paralegal:', error);
    }
  };

  const loadGeneratedDocuments = async () => {
    setIsLoadingGeneratedDocs(true);
    try {
      const { items } = await BaseCrudService.getAll<GeneratedDocuments>('generateddocuments');
      const userDocs = items?.filter(doc => {
        if (doc.clientEmail === currentUser?.email) return true;
        if (doc.clientId === userAccountId || doc.clientId === currentUser?.email) return true;
        return false;
      }) || [];
      userDocs.sort((a, b) => {
        const dateA = new Date(a.generationDate || 0).getTime();
        const dateB = new Date(b.generationDate || 0).getTime();
        return dateB - dateA;
      });
      setGeneratedDocuments(userDocs);
    } catch (error) {
      console.error('Failed to load generated documents:', error);
    } finally {
      setIsLoadingGeneratedDocs(false);
    }
  };

  const checkIntakeStatus = () => {
    const justCompleted = sessionStorage.getItem('intakeJustCompleted');
    if (justCompleted === 'true') {
      setShowSuccessMessage(true);
      sessionStorage.removeItem('intakeJustCompleted');
      setTimeout(() => setShowSuccessMessage(false), 5000);
      return;
    }
    const skipped = sessionStorage.getItem('intakeSkipped');
    if (skipped === 'true') {
      sessionStorage.removeItem('intakeSkipped');
    }
    if (!intakeCompleted && !currentUser?.isAdmin) {
      setShowIntakeBanner(true);
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
        status: 'signed',
        signedDate: signatureData.timestamp,
        signedDocumentUrl: signedPdfDataUrl,
      };

      await BaseCrudService.update('generateddocuments', updatedDoc);

      const { items: clientDocs } = await BaseCrudService.getAll('clientdocuments');
      const clientDoc = clientDocs.find(cd => 
        cd.documentName === signingDocument.documentName && 
        cd.clientEmail === currentUser?.email
      );

      if (clientDoc) {
        await BaseCrudService.update('clientdocuments', {
          _id: clientDoc._id,
          fileUrl: signedPdfDataUrl,
          documentCategory: 'signed-document',
          notes: `${clientDoc.notes || ''}\n\nElectronically signed on ${signatureData.signedDate} at ${signatureData.signedTime}. IP Address: ${signatureData.ipAddress}`
        });
        setDocuments(prev => prev.map(doc => 
          doc._id === clientDoc._id 
            ? { ...doc, fileUrl: signedPdfDataUrl, documentCategory: 'signed-document' }
            : doc
        ));
      }

      setGeneratedDocuments(prev => 
        prev.map(doc => doc._id === signingDocument._id ? updatedDoc : doc)
      );

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: userAccountId || currentUser?.email || '',
        activityType: 'document_signed',
        activityDescription: `Document "${signingDocument.documentName}" was electronically signed by client`,
        performedBy: currentUser?.email || '',
        performedByName: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim() || currentUser?.email || '',
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

  // Show signature modal if signing
  if (signingDocument) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <DocumentSignature
              documentId={signingDocument._id}
              documentName={signingDocument.documentName || 'Untitled Document'}
              onSignatureComplete={handleSignatureComplete}
              onCancel={() => setSigningDocument(null)}
            />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Intake Completion Success Message */}
      {showSuccessMessage && (
        <div className="w-full bg-pastelgreen border-b-2 border-pastelgreen">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-4">
            <Alert className="border-0 bg-transparent">
              <CheckCircle className="h-5 w-5 text-foreground" />
              <AlertTitle className="font-heading text-foreground">Intake Form Completed!</AlertTitle>
              <AlertDescription className="font-paragraph text-foreground/80">
                Thank you for completing your intake form. We will review your information and be in touch soon.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Intake Form Reminder Banner */}
      {showIntakeBanner && !intakeCompleted && !currentUser?.isAdmin && (
        <div className="w-full bg-pastelpeach border-b-2 border-primary/20">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-4">
            <Alert className="border-0 bg-transparent">
              <Info className="h-5 w-5 text-foreground" />
              <AlertTitle className="font-heading text-foreground">Complete Your Intake Form</AlertTitle>
              <AlertDescription className="font-paragraph text-foreground/80 flex items-center justify-between flex-wrap gap-4">
                <span>
                  Please complete your client intake form to help us serve you better. This will only take a few minutes.
                </span>
                <div className="flex gap-2">
                  <Link to="/client-intake">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Complete Now
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setShowIntakeBanner(false)}
                    className="border-foreground/20"
                  >
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground">
                  Your Client Portal
                </h1>
                {isAdmin() && (
                  <span className="px-4 py-2 bg-primary text-white font-paragraph font-semibold rounded-lg text-sm">
                    Admin
                  </span>
                )}
              </div>
              <p className="font-paragraph text-lg text-foreground/80">
                Welcome, {currentUser?.firstName || currentUser?.email}! Manage your profile, documents, and payments securely.
              </p>
              {!currentUser?.isAdmin && (
                <div className="mt-3 space-y-1">
                  {(currentUser?.clientId || userAccountId) && (
                    <p className="font-paragraph text-base text-foreground/70">
                      Client Number: <span className="font-semibold text-primary">{currentUser.clientId || userAccountId}</span>
                    </p>
                  )}
                  {assignedParalegal && (
                    <p className="font-paragraph text-base text-foreground/70">
                      Assigned Paralegal: <span className="font-semibold text-primary">{assignedParalegal}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Unread Messages</p>
                    <p className="font-heading text-3xl font-bold text-foreground">
                      {messages.filter(m => !m.isRead && m.recipientEmail === currentUser?.email).length}
                    </p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-primary/30" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Payments</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{payments.length}</p>
                  </div>
                  <CreditCard className="w-10 h-10 text-primary/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Documents */}
          <QuickAccessDocs documents={documents} />

          {/* Signature Success Message */}
          {signatureSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-green-900 mb-1">Document Signed Successfully!</h3>
                <p className="font-paragraph text-green-800">Your electronic signature has been recorded and attached to the document.</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="documents" className="w-full">
            <div className="relative mb-8">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 md:hidden" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 md:hidden" />
              
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide md:grid md:grid-cols-6 gap-2 h-auto pb-2 md:pb-0">
                <TabsTrigger value="documents" className="flex items-center gap-2 py-3 px-4 min-w-[120px] md:min-w-0 flex-shrink-0 md:flex-shrink">
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </TabsTrigger>
                <TabsTrigger value="signatures" className="flex items-center gap-2 py-3 px-4 min-w-[120px] md:min-w-0 flex-shrink-0 md:flex-shrink relative">
                  <FileSignature className="w-4 h-4" />
                  <span>Signatures</span>
                  {generatedDocuments.filter(d => d.requiresSignature && d.status?.toLowerCase() !== 'signed').length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {generatedDocuments.filter(d => d.requiresSignature && d.status?.toLowerCase() !== 'signed').length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2 py-3 px-4 min-w-[100px] md:min-w-0 flex-shrink-0 md:flex-shrink">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2 py-3 px-4 min-w-[110px] md:min-w-0 flex-shrink-0 md:flex-shrink">
                  <CreditCard className="w-4 h-4" />
                  <span>Payments</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2 py-3 px-4 min-w-[110px] md:min-w-0 flex-shrink-0 md:flex-shrink">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 py-3 px-4 min-w-[130px] md:min-w-0 flex-shrink-0 md:flex-shrink relative">
                  {unreadCount > 0 ? <BellDot className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="documents">
              <DocumentsTab 
                currentUser={currentUser}
                documents={documents}
                setDocuments={setDocuments}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="signatures">
              <SignaturesTab 
                generatedDocuments={generatedDocuments}
                isLoadingGeneratedDocs={isLoadingGeneratedDocs}
                onSignDocument={setSigningDocument}
              />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileTab 
                currentUser={currentUser}
                profile={profile}
                setProfile={setProfile}
                isLoadingProfile={isLoadingProfile}
                userAccountId={userAccountId}
              />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentsTab 
                currentUser={currentUser}
                payments={payments}
                setPayments={setPayments}
                isLoadingPayments={isLoadingPayments}
              />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesTab 
                currentUser={currentUser}
                messages={messages}
                setMessages={setMessages}
                isLoadingMessages={isLoadingMessages}
              />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationsTab 
                notifications={notifications}
                setNotifications={setNotifications}
                isLoadingNotifications={isLoadingNotifications}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
