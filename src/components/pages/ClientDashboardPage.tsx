import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Upload, Download, Trash2, Plus, FileText, AlertCircle, CheckCircle, Loader, User, CreditCard, Save, DollarSign, MessageSquare, Send, Bell, BellDot, Lock, Star, FileSignature } from 'lucide-react';
import { getCurrentUser, isAuthenticated, isAdmin, changePassword } from '@/lib/auth-service';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import { GeneratedDocuments } from '@/entities';

interface Notification {
  _id: string;
  userId?: string;
  notificationType?: string;
  notificationTitle?: string;
  notificationMessage?: string;
  isRead?: boolean;
  createdDate?: Date | string;
  relatedActivityId?: string;
}

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
    }
  }, [navigate]);

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

interface CurrentUser {
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  clientId?: string;
}

interface ClientDocument {
  _id: string;
  documentName?: string;
  fileUrl?: string;
  uploadDate?: Date | string;
  clientEmail?: string;
  fileType?: string;
  fileSize?: number;
  documentCategory?: string;
  notes?: string;
}

interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

interface PaymentRecord {
  _id: string;
  paymentAmount?: number;
  serviceType?: string;
  paymentDate?: Date | string;
  paymentStatus?: string;
  transactionId?: string;
}

interface Message {
  _id: string;
  senderEmail?: string;
  senderName?: string;
  recipientEmail?: string;
  messageContent?: string;
  sentDate?: Date | string;
  isRead?: boolean;
  conversationId?: string;
}

interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

function ClientDashboardContent({ currentUser }: { currentUser: CurrentUser }) {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Profile state
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Payment state
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    serviceType: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageError, setMessageError] = useState('');

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userAccountId, setUserAccountId] = useState<string>('');

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Quick Access Documents state
  const [quickAccessDocs, setQuickAccessDocs] = useState<ClientDocument[]>([]);

  // Assigned paralegal state
  const [assignedParalegal, setAssignedParalegal] = useState<string>('');

  // Generated documents state (for signing)
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocuments[]>([]);
  const [isLoadingGeneratedDocs, setIsLoadingGeneratedDocs] = useState(true);
  const [signingDocument, setSigningDocument] = useState<GeneratedDocuments | null>(null);
  const [signatureSuccess, setSignatureSuccess] = useState(false);

  // Load documents on mount
  useEffect(() => {
    loadUserAccountId();
    loadDocuments();
    loadProfile();
    loadPayments();
    loadMessages();
    loadAssignedParalegal();
    loadGeneratedDocuments();
  }, [currentUser?.email]);

  // Load notifications when userAccountId is available
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

  const loadNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const { items } = await BaseCrudService.getAll<Notification>('notifications');
      // Filter notifications for current user
      const userNotifications = items?.filter(n => n.userId === userAccountId) || [];
      // Sort by date, newest first
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

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<ClientDocument>('clientdocuments');
      // Filter documents for current user
      const userDocuments = items?.filter(doc => doc.clientEmail === currentUser?.email) || [];
      setDocuments(userDocuments);
      
      // Set quick access documents (most recent 5)
      const sortedDocs = [...userDocuments].sort((a, b) => {
        const dateA = new Date(a.uploadDate || 0).getTime();
        const dateB = new Date(b.uploadDate || 0).getTime();
        return dateB - dateA;
      });
      setQuickAccessDocs(sortedDocs.slice(0, 5));
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const { items } = await BaseCrudService.getAll<ClientProfile>('clientprofiles');
      // Find profile for current user - check both _id matching email and userAccountId
      let userProfile = items?.find(p => p._id === currentUser?.email);
      
      // If not found by email, try to find by userAccountId
      if (!userProfile && userAccountId) {
        userProfile = items?.find(p => p._id === userAccountId);
      }
      
      setProfile(userProfile || null);
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
      // Filter payments for current user by checking if _id contains user email
      // This maintains backward compatibility with existing payment records
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
      // Filter messages where current user is sender or recipient
      const userMessages = items?.filter(m => 
        m.senderEmail === currentUser?.email || m.recipientEmail === currentUser?.email
      ) || [];
      // Sort by date, newest first
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setIsSavingProfile(true);

    try {
      // Use userAccountId if available, otherwise fall back to email
      const profileId = userAccountId || currentUser?.email || crypto.randomUUID();
      
      const profileData: ClientProfile = {
        _id: profileId,
        firstName: (e.target as any).firstName.value,
        lastName: (e.target as any).lastName.value,
        streetAddress: (e.target as any).streetAddress.value,
        city: (e.target as any).city.value,
        state: (e.target as any).state.value,
        zipCode: (e.target as any).zipCode.value,
        phoneNumber: (e.target as any).phoneNumber.value,
        emergencyContactName: (e.target as any).emergencyContactName.value,
        emergencyContactPhone: (e.target as any).emergencyContactPhone.value,
      };

      console.log('Saving profile with ID:', profileId, 'Profile exists:', !!profile);

      if (profile) {
        // Update existing profile
        await BaseCrudService.update('clientprofiles', profileData);
        console.log('Profile updated successfully');
      } else {
        // Create new profile
        await BaseCrudService.create('clientprofiles', profileData);
        console.log('Profile created successfully');
      }

      // Verify the profile was saved by fetching it back
      const { items } = await BaseCrudService.getAll<ClientProfile>('clientprofiles');
      const savedProfile = items?.find(p => p._id === profileId);
      
      if (!savedProfile) {
        console.error('Profile save verification failed - profile not found in database');
        setProfileError('Failed to verify profile save. Please refresh and try again.');
        setIsSavingProfile(false);
        return;
      }

      console.log('Profile verified in database:', savedProfile);
      setProfile(savedProfile);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setProfileError('Failed to save profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!paymentFormData.amount || !paymentFormData.serviceType) {
      setPaymentError('Please fill in all required fields');
      return;
    }

    if (!paymentFormData.cardNumber || !paymentFormData.expiryDate || !paymentFormData.cvv) {
      setPaymentError('Please enter valid payment details');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentRecord: PaymentRecord = {
        _id: `${currentUser?.email}-${crypto.randomUUID()}`,
        paymentAmount: parseFloat(paymentFormData.amount),
        serviceType: paymentFormData.serviceType,
        paymentDate: new Date(),
        paymentStatus: 'Paid',
        transactionId: `TXN-${Date.now()}`,
      };

      await BaseCrudService.create('paymentrecords', paymentRecord);

      setPayments(prev => [paymentRecord, ...prev]);
      setPaymentSuccess(true);
      setPaymentFormData({
        amount: '',
        serviceType: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      });
      setShowPaymentForm(false);

      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to process payment:', error);
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError('');

    if (!newMessage.trim()) {
      setMessageError('Please enter a message');
      return;
    }

    setIsSendingMessage(true);

    try {
      const adminEmail = 'admin@legalservices.com'; // Default admin email
      const conversationId = `${currentUser?.email}-admin`; // Unique conversation ID

      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: currentUser?.email || '',
        senderName: currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : currentUser?.email || '',
        recipientEmail: adminEmail,
        messageContent: newMessage,
        sentDate: new Date(),
        isRead: false,
        conversationId: conversationId,
      };

      await BaseCrudService.create('messages', messageData);

      setMessages(prev => [messageData, ...prev]);
      setNewMessage('');
      setMessageSuccess(true);

      setTimeout(() => setMessageSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessageError('Failed to send message. Please try again.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await BaseCrudService.update('messages', { _id: messageId, isRead: true });
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await BaseCrudService.update('notifications', { _id: notificationId, isRead: true });
      setNotifications(prev => prev.map(notif => 
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.isRead);
      for (const notif of unreadNotifications) {
        await BaseCrudService.update('notifications', { _id: notif._id, isRead: true });
      }
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Validate passwords match
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Validate password length
    if (passwordFormData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await changePassword(
        passwordFormData.currentPassword,
        passwordFormData.newPassword
      );

      if (response.success) {
        setPasswordSuccess(true);
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordForm(false);
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(response.message);
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const loadAssignedParalegal = async () => {
    try {
      const { items: assignments } = await BaseCrudService.getAll('fileassignments');
      const { items: users } = await BaseCrudService.getAll('useraccounts');
      
      // Find assignment for current user
      const userAssignment = assignments?.find(a => a.clientId === userAccountId || a.clientId === currentUser?.email);
      
      if (userAssignment && userAssignment.paralegalId) {
        // Find paralegal details
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
      // Filter documents for current client by email
      const userDocs = items?.filter(doc => doc.clientEmail === currentUser?.email) || [];
      setGeneratedDocuments(userDocs);
    } catch (error) {
      console.error('Failed to load generated documents:', error);
    } finally {
      setIsLoadingGeneratedDocs(false);
    }
  };

  const handleSignatureComplete = async (signatureData: SignatureData) => {
    if (!signingDocument) return;

    try {
      // Embed signature into the document using the PDF generator utility
      const { embedSignatureInPDF } = await import('@/lib/pdf-generator');
      const signedPdfDataUrl = await embedSignatureInPDF(
        signingDocument.documentUrl || '',
        signatureData,
        signingDocument.documentName || 'Document'
      );

      // Update the generated document with signed version
      const updatedDoc: GeneratedDocuments = {
        ...signingDocument,
        status: 'signed',
        signedDate: signatureData.timestamp,
        signedDocumentUrl: signedPdfDataUrl,
      };

      await BaseCrudService.update('generateddocuments', updatedDoc);

      // Update the client's document with the signed version
      const { items: clientDocs } = await BaseCrudService.getAll('clientdocuments');
      const clientDoc = clientDocs.find(cd => 
        cd.documentName === signingDocument.documentName && 
        cd.clientEmail === currentUser?.email
      );

      if (clientDoc) {
        // Update existing client document with signed version
        await BaseCrudService.update('clientdocuments', {
          _id: clientDoc._id,
          fileUrl: signedPdfDataUrl,
          documentCategory: 'signed-document',
          notes: `${clientDoc.notes || ''}\n\nElectronically signed on ${signatureData.signedDate} at ${signatureData.signedTime}. IP Address: ${signatureData.ipAddress}`
        });

        // Update local documents state
        setDocuments(prev => prev.map(doc => 
          doc._id === clientDoc._id 
            ? { ...doc, fileUrl: signedPdfDataUrl, documentCategory: 'signed-document' }
            : doc
        ));
      }

      // Update local generated documents state
      setGeneratedDocuments(prev => 
        prev.map(doc => doc._id === signingDocument._id ? updatedDoc : doc)
      );

      // Create activity log
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      // Validate file type
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
      // Convert file to base64 data URL for storage
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

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.documentCategory === selectedCategory;
    const matchesSearch = doc.documentName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(documents.map(doc => doc.documentCategory).filter(Boolean))];

  // Show signature modal if signing a document
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
          {/* Quick Stats & Activity Overview */}
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

          {/* Quick Access Section */}
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
                              onClick={() => {
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
                              }}
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

          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 mb-8 h-auto">
              <TabsTrigger value="documents" className="flex items-center gap-2 py-3">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Documents</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
              <TabsTrigger value="signatures" className="flex items-center gap-2 py-3 relative">
                <FileSignature className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Documents</span>
                <span className="sm:hidden">Sign</span>
                {generatedDocuments.filter(d => d.requiresSignature && d.status !== 'Signed').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {generatedDocuments.filter(d => d.requiresSignature && d.status !== 'Signed').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Personal Details</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2 py-3">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Payments</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2 py-3">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Messages</span>
                <span className="sm:hidden">Msgs</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 py-3 relative">
                {unreadCount > 0 ? <BellDot className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Alerts</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Signatures Tab */}
            <TabsContent value="signatures">
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
                                    onClick={() => setSigningDocument(doc)}
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
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
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

          {signatureSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-green-900 mb-1">Document Signed Successfully!</h3>
                <p className="font-paragraph text-green-800">Your electronic signature has been recorded and attached to the document.</p>
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
                  {/* Document Name */}
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

                  {/* Category */}
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

                  {/* File Upload */}
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

                  {/* Notes */}
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

                  {/* Buttons */}
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
                          onClick={() => {
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
                          }}
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
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Personal Details</CardTitle>
                  <CardDescription className="font-paragraph">
                    Update your personal information and emergency contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profileSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading font-bold text-green-900 mb-1">Profile Updated!</h3>
                        <p className="font-paragraph text-green-800">Your personal details have been saved successfully.</p>
                      </div>
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading font-bold text-green-900 mb-1">Password Changed!</h3>
                        <p className="font-paragraph text-green-800">Your password has been updated successfully.</p>
                      </div>
                    </div>
                  )}

                  {profileError && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-red-800">{profileError}</p>
                    </div>
                  )}

                  {isLoadingProfile ? (
                    <div className="text-center py-12">
                      <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">Loading profile...</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Personal Information Form */}
                      <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="firstName" className="block font-paragraph font-semibold text-foreground mb-2">
                              First Name
                            </label>
                            <Input
                              id="firstName"
                              name="firstName"
                              defaultValue={profile?.firstName || ''}
                              placeholder="Enter your first name"
                              className="border-gray-300"
                            />
                          </div>

                          <div>
                            <label htmlFor="lastName" className="block font-paragraph font-semibold text-foreground mb-2">
                              Last Name
                            </label>
                            <Input
                              id="lastName"
                              name="lastName"
                              defaultValue={profile?.lastName || ''}
                              placeholder="Enter your last name"
                              className="border-gray-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="streetAddress" className="block font-paragraph font-semibold text-foreground mb-2">
                            Street Address
                          </label>
                          <Input
                            id="streetAddress"
                            name="streetAddress"
                            defaultValue={profile?.streetAddress || ''}
                            placeholder="Enter your street address"
                            className="border-gray-300"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label htmlFor="city" className="block font-paragraph font-semibold text-foreground mb-2">
                              City
                            </label>
                            <Input
                              id="city"
                              name="city"
                              defaultValue={profile?.city || ''}
                              placeholder="City"
                              className="border-gray-300"
                            />
                          </div>

                          <div>
                            <label htmlFor="state" className="block font-paragraph font-semibold text-foreground mb-2">
                              State/Province
                            </label>
                            <Input
                              id="state"
                              name="state"
                              defaultValue={profile?.state || ''}
                              placeholder="State/Province"
                              className="border-gray-300"
                            />
                          </div>

                          <div>
                            <label htmlFor="zipCode" className="block font-paragraph font-semibold text-foreground mb-2">
                              Zip/Postal Code
                            </label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              defaultValue={profile?.zipCode || ''}
                              placeholder="Zip Code"
                              className="border-gray-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phoneNumber" className="block font-paragraph font-semibold text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            defaultValue={profile?.phoneNumber || ''}
                            placeholder="(555) 123-4567"
                            className="border-gray-300"
                          />
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                          <h3 className="font-heading text-xl font-bold text-foreground mb-4">Emergency Contact</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="emergencyContactName" className="block font-paragraph font-semibold text-foreground mb-2">
                                Contact Name
                              </label>
                              <Input
                                id="emergencyContactName"
                                name="emergencyContactName"
                                defaultValue={profile?.emergencyContactName || ''}
                                placeholder="Emergency contact name"
                                className="border-gray-300"
                              />
                            </div>

                            <div>
                              <label htmlFor="emergencyContactPhone" className="block font-paragraph font-semibold text-foreground mb-2">
                                Contact Phone
                              </label>
                              <Input
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                type="tel"
                                defaultValue={profile?.emergencyContactPhone || ''}
                                placeholder="(555) 123-4567"
                                className="border-gray-300"
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSavingProfile}
                          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          {isSavingProfile ? 'Saving...' : 'Save Profile'}
                        </Button>
                      </form>

                      {/* Password Change Section */}
                      <div className="pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                              <Lock className="w-5 h-5" />
                              Change Password
                            </h3>
                            <p className="font-paragraph text-sm text-foreground/70 mt-1">
                              Update your account password for security
                            </p>
                          </div>
                          {!showPasswordForm && (
                            <Button
                              onClick={() => setShowPasswordForm(true)}
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/5"
                            >
                              Change Password
                            </Button>
                          )}
                        </div>

                        {showPasswordForm && (
                          <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                            {passwordError && (
                              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="font-paragraph text-red-800">{passwordError}</p>
                              </div>
                            )}

                            <form onSubmit={handlePasswordChange} className="space-y-4">
                              <div>
                                <label htmlFor="currentPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                                  Current Password *
                                </label>
                                <Input
                                  id="currentPassword"
                                  type="password"
                                  value={passwordFormData.currentPassword}
                                  onChange={(e) => setPasswordFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                  placeholder="Enter your current password"
                                  className="border-gray-300"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="newPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                                  New Password *
                                </label>
                                <Input
                                  id="newPassword"
                                  type="password"
                                  value={passwordFormData.newPassword}
                                  onChange={(e) => setPasswordFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                                  placeholder="Enter new password (min. 6 characters)"
                                  className="border-gray-300"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="confirmPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                                  Confirm New Password *
                                </label>
                                <Input
                                  id="confirmPassword"
                                  type="password"
                                  value={passwordFormData.confirmPassword}
                                  onChange={(e) => setPasswordFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                  placeholder="Confirm new password"
                                  className="border-gray-300"
                                  required
                                />
                              </div>

                              <div className="flex gap-4 pt-4">
                                <Button
                                  type="submit"
                                  disabled={isChangingPassword}
                                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                                >
                                  <Lock className="w-4 h-4" />
                                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    setShowPasswordForm(false);
                                    setPasswordError('');
                                    setPasswordFormData({
                                      currentPassword: '',
                                      newPassword: '',
                                      confirmPassword: '',
                                    });
                                  }}
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <div>
                {paymentSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Payment Successful!</h3>
                      <p className="font-paragraph text-green-800">Your payment has been processed successfully.</p>
                    </div>
                  </div>
                )}

                {/* ... rest of payments tab ... */}

                {/* Payment Form */}
                <div className="mb-12">
                  {!showPaymentForm ? (
                    <Button
                      onClick={() => setShowPaymentForm(true)}
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Make a Payment
                    </Button>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl">Make a Payment</CardTitle>
                        <CardDescription className="font-paragraph">
                          Enter payment details to process your transaction
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {paymentError && (
                          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="font-paragraph text-red-800">{paymentError}</p>
                          </div>
                        )}

                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="amount" className="block font-paragraph font-semibold text-foreground mb-2">
                                Payment Amount *
                              </label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60" />
                                <Input
                                  id="amount"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={paymentFormData.amount}
                                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, amount: e.target.value }))}
                                  placeholder="0.00"
                                  className="border-gray-300 pl-10"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="serviceType" className="block font-paragraph font-semibold text-foreground mb-2">
                                Service Type *
                              </label>
                              <Select 
                                value={paymentFormData.serviceType} 
                                onValueChange={(value) => setPaymentFormData(prev => ({ ...prev, serviceType: value }))}
                              >
                                <SelectTrigger className="border-gray-300">
                                  <SelectValue placeholder="Select service" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Small Claims Court">Small Claims Court</SelectItem>
                                  <SelectItem value="Landlord & Tenant Board">Landlord & Tenant Board</SelectItem>
                                  <SelectItem value="Human Rights Tribunal">Human Rights Tribunal</SelectItem>
                                  <SelectItem value="Traffic Tickets">Traffic Tickets</SelectItem>
                                  <SelectItem value="Mediation Services">Mediation Services</SelectItem>
                                  <SelectItem value="Criminal Matters">Criminal Matters</SelectItem>
                                  <SelectItem value="Bail Hearings">Bail Hearings</SelectItem>
                                  <SelectItem value="Notary Public">Notary Public</SelectItem>
                                  <SelectItem value="Commissioner of Oaths">Commissioner of Oaths</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-gray-200">
                            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              Payment Details
                            </h3>

                            <div className="space-y-4">
                              <div>
                                <label htmlFor="cardNumber" className="block font-paragraph font-semibold text-foreground mb-2">
                                  Card Number *
                                </label>
                                <Input
                                  id="cardNumber"
                                  type="text"
                                  value={paymentFormData.cardNumber}
                                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                  className="border-gray-300"
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="expiryDate" className="block font-paragraph font-semibold text-foreground mb-2">
                                    Expiry Date *
                                  </label>
                                  <Input
                                    id="expiryDate"
                                    type="text"
                                    value={paymentFormData.expiryDate}
                                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="border-gray-300"
                                    required
                                  />
                                </div>

                                <div>
                                  <label htmlFor="cvv" className="block font-paragraph font-semibold text-foreground mb-2">
                                    CVV *
                                  </label>
                                  <Input
                                    id="cvv"
                                    type="text"
                                    value={paymentFormData.cvv}
                                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, cvv: e.target.value }))}
                                    placeholder="123"
                                    maxLength={4}
                                    className="border-gray-300"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <Button
                              type="submit"
                              disabled={isProcessingPayment}
                              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                            >
                              {isProcessingPayment ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-4 h-4" />
                                  Process Payment
                                </>
                              )}
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setShowPaymentForm(false);
                                setPaymentError('');
                              }}
                              variant="outline"
                              className="border-gray-300 text-foreground hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Payment History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Payment History</CardTitle>
                    <CardDescription className="font-paragraph">
                      View your past transactions and payment records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingPayments ? (
                      <div className="text-center py-12">
                        <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                        <p className="font-paragraph text-foreground/80">Loading payment history...</p>
                      </div>
                    ) : payments.length === 0 ? (
                      <div className="bg-gray-50 rounded-lg p-12 text-center">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="font-paragraph text-foreground/80 mb-4">
                          No payment records yet. Make your first payment to get started.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {payments.map(payment => (
                          <div key={payment._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="font-heading text-lg font-bold text-foreground">
                                    {payment.serviceType}
                                  </h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold ${
                                    payment.paymentStatus === 'Paid'
                                      ? 'bg-green-100 text-green-800'
                                      : payment.paymentStatus === 'Pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {payment.paymentStatus}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="font-paragraph text-foreground/60">Amount</p>
                                    <p className="font-paragraph font-semibold text-foreground text-lg">
                                      ${payment.paymentAmount?.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-paragraph text-foreground/60">Transaction ID</p>
                                    <p className="font-paragraph font-semibold text-foreground">
                                      {payment.transactionId}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-paragraph text-foreground/60">Date</p>
                                    <p className="font-paragraph font-semibold text-foreground">
                                      {payment.paymentDate instanceof Date
                                        ? payment.paymentDate.toLocaleDateString()
                                        : new Date(payment.paymentDate || '').toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div>
                {messageSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Message Sent!</h3>
                      <p className="font-paragraph text-green-800">Your message has been sent to the admin team.</p>
                    </div>
                  </div>
                )}

                {/* Send Message Form */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Send a Message</CardTitle>
                    <CardDescription className="font-paragraph">
                      Contact our admin team with questions or concerns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {messageError && (
                      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="font-paragraph text-red-800">{messageError}</p>
                      </div>
                    )}

                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div>
                        <label htmlFor="newMessage" className="block font-paragraph font-semibold text-foreground mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="newMessage"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message here..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          rows={4}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSendingMessage}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        {isSendingMessage ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Message History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Message History</CardTitle>
                    <CardDescription className="font-paragraph">
                      View your conversation with the admin team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingMessages ? (
                      <div className="text-center py-12">
                        <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                        <p className="font-paragraph text-foreground/80">Loading messages...</p>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="bg-gray-50 rounded-lg p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="font-paragraph text-foreground/80 mb-4">
                          No messages yet. Send your first message to get started.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map(message => {
                          const isFromClient = message.senderEmail === currentUser?.email;
                          const isUnread = !message.isRead && !isFromClient;

                          // Mark as read when viewing
                          if (isUnread) {
                            markMessageAsRead(message._id);
                          }

                          return (
                            <div
                              key={message._id}
                              className={`rounded-lg p-6 ${
                                isFromClient
                                  ? 'bg-primary/5 border border-primary/20 ml-8'
                                  : 'bg-pastelbeige/20 border border-pastelbeige mr-8'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="font-heading font-bold text-foreground">
                                    {isFromClient ? 'You' : 'Admin Team'}
                                  </p>
                                  <p className="font-paragraph text-sm text-foreground/60">
                                    {message.sentDate instanceof Date
                                      ? message.sentDate.toLocaleString()
                                      : new Date(message.sentDate || '').toLocaleString()}
                                  </p>
                                </div>
                                {isUnread && (
                                  <span className="px-2 py-1 bg-primary text-white text-xs font-paragraph font-semibold rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="font-paragraph text-foreground whitespace-pre-wrap">
                                {message.messageContent}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <Bell className="w-6 h-6" />
                        Notifications
                      </CardTitle>
                      <CardDescription className="font-paragraph">
                        Stay updated on changes and uploads to your account
                      </CardDescription>
                    </div>
                    {unreadCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={markAllNotificationsAsRead}
                        className="border-primary text-primary hover:bg-primary/5"
                      >
                        Mark All as Read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingNotifications ? (
                    <div className="text-center py-12">
                      <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80 mb-4">
                        No notifications yet. You'll be notified when there are updates to your account.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map(notification => {
                        const isUnread = !notification.isRead;

                        return (
                          <div
                            key={notification._id}
                            className={`rounded-lg p-5 border transition-all ${
                              isUnread
                                ? 'bg-primary/5 border-primary/30 shadow-sm'
                                : 'bg-white border-gray-200'
                            }`}
                            onClick={() => {
                              if (isUnread) {
                                markNotificationAsRead(notification._id);
                              }
                            }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 mt-1">
                                {notification.notificationType === 'document_upload' && (
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isUnread ? 'bg-blue-100' : 'bg-gray-100'
                                  }`}>
                                    <FileText className={`w-5 h-5 ${isUnread ? 'text-blue-600' : 'text-gray-600'}`} />
                                  </div>
                                )}
                                {notification.notificationType === 'profile_update' && (
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isUnread ? 'bg-green-100' : 'bg-gray-100'
                                  }`}>
                                    <User className={`w-5 h-5 ${isUnread ? 'text-green-600' : 'text-gray-600'}`} />
                                  </div>
                                )}
                                {notification.notificationType === 'account_update' && (
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isUnread ? 'bg-purple-100' : 'bg-gray-100'
                                  }`}>
                                    <Save className={`w-5 h-5 ${isUnread ? 'text-purple-600' : 'text-gray-600'}`} />
                                  </div>
                                )}
                                {!['document_upload', 'profile_update', 'account_update'].includes(notification.notificationType || '') && (
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isUnread ? 'bg-primary/20' : 'bg-gray-100'
                                  }`}>
                                    <Bell className={`w-5 h-5 ${isUnread ? 'text-primary' : 'text-gray-600'}`} />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className={`font-heading text-base font-semibold ${
                                    isUnread ? 'text-foreground' : 'text-foreground/80'
                                  }`}>
                                    {notification.notificationTitle}
                                  </h3>
                                  {isUnread && (
                                    <Badge className="ml-2 bg-primary text-white">New</Badge>
                                  )}
                                </div>
                                
                                <p className={`font-paragraph text-sm mb-3 ${
                                  isUnread ? 'text-foreground' : 'text-foreground/70'
                                }`}>
                                  {notification.notificationMessage}
                                </p>
                                
                                <p className="font-paragraph text-xs text-foreground/60">
                                  {notification.createdDate 
                                    ? new Date(notification.createdDate).toLocaleString()
                                    : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
