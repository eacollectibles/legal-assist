import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Upload, Download, Trash2, Plus, FileText, AlertCircle, CheckCircle, Loader, User, CreditCard, Save, DollarSign, MessageSquare, Send } from 'lucide-react';
import { getCurrentUser, isAuthenticated, isAdmin } from '@/lib/auth-service';

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

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
    loadProfile();
    loadPayments();
    loadMessages();
  }, [currentUser?.email]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<ClientDocument>('clientdocuments');
      // Filter documents for current user
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
      const { items } = await BaseCrudService.getAll<ClientProfile>('clientprofiles');
      // Find profile for current user (using email as identifier)
      const userProfile = items?.find(p => p._id === currentUser?.email);
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
      // Filter payments for current user (using _id as user identifier)
      const userPayments = items?.filter(p => p._id.startsWith(currentUser?.email || '')) || [];
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
      const profileData: ClientProfile = {
        _id: currentUser?.email || crypto.randomUUID(),
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

      if (profile) {
        await BaseCrudService.update('clientprofiles', profileData);
      } else {
        await BaseCrudService.create('clientprofiles', profileData);
      }

      setProfile(profileData);
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
      // In a real implementation, you would upload the file to a storage service
      // and get back a URL. For now, we'll create a mock URL.
      const mockFileUrl = `https://storage.example.com/${uploadFormData.file.name}`;

      const documentId = crypto.randomUUID();
      const newDocument: ClientDocument = {
        _id: documentId,
        documentName: uploadFormData.documentName,
        fileUrl: mockFileUrl,
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </TabsTrigger>
            </TabsList>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <div>
          {/* Success Message */}
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
                  <div key={doc._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                          {doc.documentName}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-paragraph text-foreground/60">Category</p>
                            <p className="font-paragraph font-semibold text-foreground">
                              {doc.documentCategory ? doc.documentCategory.charAt(0).toUpperCase() + doc.documentCategory.slice(1).replace('-', ' ') : 'Uncategorized'}
                            </p>
                          </div>
                          <div>
                            <p className="font-paragraph text-foreground/60">File Type</p>
                            <p className="font-paragraph font-semibold text-foreground">{doc.fileType?.split('/')[1]?.toUpperCase() || 'Unknown'}</p>
                          </div>
                          <div>
                            <p className="font-paragraph text-foreground/60">File Size</p>
                            <p className="font-paragraph font-semibold text-foreground">
                              {doc.fileSize ? (doc.fileSize / 1024).toFixed(2) + ' KB' : 'Unknown'}
                            </p>
                          </div>
                          <div>
                            <p className="font-paragraph text-foreground/60">Uploaded</p>
                            <p className="font-paragraph font-semibold text-foreground">
                              {doc.uploadDate instanceof Date ? doc.uploadDate.toLocaleDateString() : new Date(doc.uploadDate || '').toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {doc.notes && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="font-paragraph text-sm text-foreground/80">
                              <strong>Notes:</strong> {doc.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <a
                          href={doc.fileUrl}
                          download
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Download document"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete document"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
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
                      {/* ... keep existing code (payment form) */}
                    </Card>
                  )}
                </div>

                {/* Payment History */}
                <Card>
                  {/* ... keep existing code (payment history) */}
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
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
