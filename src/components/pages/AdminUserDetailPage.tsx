import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, isAdmin } from '@/lib/auth-service';
import { BaseCrudService } from '@/integrations';
import { UserAccounts, ClientProfiles, ClientDocuments, Messages, PaymentRecords } from '@/entities';
import { 
  User, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  ArrowLeft, 
  Save, 
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';

export default function AdminUserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const currentUser = getCurrentUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // User data
  const [userAccount, setUserAccount] = useState<UserAccounts | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfiles | null>(null);
  const [documents, setDocuments] = useState<ClientDocuments[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [payments, setPayments] = useState<PaymentRecords[]>([]);

  // Edit states
  const [editedProfile, setEditedProfile] = useState<Partial<ClientProfiles>>({});
  const [editedAccount, setEditedAccount] = useState<Partial<UserAccounts>>({});

  // Check if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/client-login');
    } else if (userId) {
      loadUserData();
    }
  }, [navigate, userId]);

  const loadUserData = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // Load user account
      const account = await BaseCrudService.getById<UserAccounts>('useraccounts', userId);
      setUserAccount(account);
      setEditedAccount({
        firstName: account?.firstName,
        lastName: account?.lastName,
        email: account?.email,
        accountStatus: account?.accountStatus
      });

      // Load client profile (if exists)
      const { items: profiles } = await BaseCrudService.getAll<ClientProfiles>('clientprofiles');
      const profile = profiles.find(p => p._id === userId);
      if (profile) {
        setClientProfile(profile);
        setEditedProfile({ ...profile });
      }

      // Load documents for this user
      const { items: userDocs } = await BaseCrudService.getAll<ClientDocuments>('clientdocuments');
      const userDocuments = userDocs.filter(doc => doc.clientEmail === account?.email);
      setDocuments(userDocuments);

      // Load messages for this user
      const { items: allMessages } = await BaseCrudService.getAll<Messages>('messages');
      const userMessages = allMessages.filter(
        msg => msg.senderEmail === account?.email || msg.recipientEmail === account?.email
      );
      setMessages(userMessages);

      // Load payment records
      const { items: allPayments } = await BaseCrudService.getAll<PaymentRecords>('paymentrecords');
      setPayments(allPayments);

    } catch (error) {
      console.error('Failed to load user data:', error);
      setErrorMessage('Failed to load user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAccount = async () => {
    if (!userId || !userAccount) return;

    setIsSaving(true);
    try {
      await BaseCrudService.update<UserAccounts>('useraccounts', {
        _id: userId,
        ...editedAccount
      });

      setUserAccount({ ...userAccount, ...editedAccount });
      setSuccessMessage('Account information updated successfully');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to update account:', error);
      setErrorMessage('Failed to update account information');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!userId) return;

    setIsSaving(true);
    try {
      if (clientProfile) {
        // Update existing profile
        await BaseCrudService.update<ClientProfiles>('clientprofiles', {
          _id: userId,
          ...editedProfile
        });
        setClientProfile({ ...clientProfile, ...editedProfile });
      } else {
        // Create new profile
        await BaseCrudService.create('clientprofiles', {
          _id: userId,
          ...editedProfile
        });
        const newProfile = { _id: userId, ...editedProfile } as ClientProfiles;
        setClientProfile(newProfile);
      }

      setSuccessMessage('Profile information updated successfully');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMessage('Failed to update profile information');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentUser || !isAdmin()) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="font-paragraph text-foreground/80">You do not have permission to access this page.</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <LoadingSpinner />
            <p className="font-paragraph text-foreground/80 mt-4">Loading user data...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!userAccount) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">User Not Found</h1>
            <p className="font-paragraph text-foreground/80 mb-6">The requested user account could not be found.</p>
            <Button onClick={() => navigate('/admin/users')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to User Management
            </Button>
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
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/users')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to User Management
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <User className="w-10 h-10 text-primary" />
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  {userAccount.firstName && userAccount.lastName
                    ? `${userAccount.firstName} ${userAccount.lastName}`
                    : userAccount.email}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={userAccount.isAdmin ? 'bg-primary text-white' : 'bg-gray-500 text-white'}>
                  {userAccount.isAdmin ? 'Admin' : 'User'}
                </Badge>
                <Badge variant="outline" className="border-foreground/30">
                  {userAccount.accountStatus || 'Active'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      {successMessage && (
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="account">Account Info</TabsTrigger>
              <TabsTrigger value="profile">Personal Details</TabsTrigger>
              <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
              <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
              <TabsTrigger value="billing">Billing ({payments.length})</TabsTrigger>
            </TabsList>

            {/* Account Info Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Account Information
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    Manage user account details and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-paragraph">First Name</Label>
                      <Input
                        id="firstName"
                        value={editedAccount.firstName || ''}
                        onChange={(e) => setEditedAccount({ ...editedAccount, firstName: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-paragraph">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editedAccount.lastName || ''}
                        onChange={(e) => setEditedAccount({ ...editedAccount, lastName: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph">Email Address</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-foreground/60" />
                      <Input
                        id="email"
                        type="email"
                        value={editedAccount.email || ''}
                        onChange={(e) => setEditedAccount({ ...editedAccount, email: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountStatus" className="font-paragraph">Account Status</Label>
                    <Input
                      id="accountStatus"
                      value={editedAccount.accountStatus || ''}
                      onChange={(e) => setEditedAccount({ ...editedAccount, accountStatus: e.target.value })}
                      placeholder="e.g., Active, Suspended, Pending"
                      className="font-paragraph"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Account Created</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-foreground/60" />
                        <p className="font-paragraph font-semibold">
                          {userAccount._createdDate 
                            ? new Date(userAccount._createdDate).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Last Login</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-foreground/60" />
                        <p className="font-paragraph font-semibold">
                          {userAccount.lastLoginDate 
                            ? new Date(userAccount.lastLoginDate).toLocaleDateString()
                            : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveAccount} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner />
                          <span className="ml-2">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Account Info
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personal Details Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Personal Details
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    Manage client profile and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="profileFirstName" className="font-paragraph">First Name</Label>
                      <Input
                        id="profileFirstName"
                        value={editedProfile.firstName || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileLastName" className="font-paragraph">Last Name</Label>
                      <Input
                        id="profileLastName"
                        value={editedProfile.lastName || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="font-paragraph">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-foreground/60" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={editedProfile.phoneNumber || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Address Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="streetAddress" className="font-paragraph">Street Address</Label>
                      <Input
                        id="streetAddress"
                        value={editedProfile.streetAddress || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, streetAddress: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="font-paragraph">City</Label>
                        <Input
                          id="city"
                          value={editedProfile.city || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="font-paragraph">State/Province</Label>
                        <Input
                          id="state"
                          value={editedProfile.state || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="font-paragraph">Zip/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={editedProfile.zipCode || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, zipCode: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-heading text-lg font-semibold">Emergency Contact</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName" className="font-paragraph">Contact Name</Label>
                        <Input
                          id="emergencyContactName"
                          value={editedProfile.emergencyContactName || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, emergencyContactName: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone" className="font-paragraph">Contact Phone</Label>
                        <Input
                          id="emergencyContactPhone"
                          type="tel"
                          value={editedProfile.emergencyContactPhone || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, emergencyContactPhone: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner />
                          <span className="ml-2">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Profile Info
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Documents
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    View and manage client documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">No documents found for this user.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div
                          key={doc._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-5 h-5 text-primary" />
                                <h3 className="font-heading text-lg font-semibold text-foreground">
                                  {doc.documentName || 'Untitled Document'}
                                </h3>
                                {doc.documentCategory && (
                                  <Badge variant="outline">{doc.documentCategory}</Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <p className="font-paragraph text-foreground/60">File Type</p>
                                  <p className="font-paragraph font-semibold">{doc.fileType || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-foreground/60">File Size</p>
                                  <p className="font-paragraph font-semibold">
                                    {doc.fileSize ? `${(doc.fileSize / 1024).toFixed(2)} KB` : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-foreground/60">Upload Date</p>
                                  <p className="font-paragraph font-semibold">
                                    {doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              {doc.notes && (
                                <div className="mt-3 pt-3 border-t">
                                  <p className="font-paragraph text-sm text-foreground/80">{doc.notes}</p>
                                </div>
                              )}
                            </div>
                            {doc.fileUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(doc.fileUrl, '_blank')}
                                className="ml-4"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Messages
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    View message history for this user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">No messages found for this user.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <MessageSquare className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-heading font-semibold text-foreground">
                                  {msg.senderName || msg.senderEmail}
                                </p>
                                <p className="font-paragraph text-sm text-foreground/60">
                                  To: {msg.recipientEmail}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-paragraph text-sm text-foreground/60">
                                {msg.sentDate ? new Date(msg.sentDate).toLocaleDateString() : 'N/A'}
                              </p>
                              {!msg.isRead && (
                                <Badge className="mt-1 bg-primary text-white">Unread</Badge>
                              )}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <p className="font-paragraph text-foreground whitespace-pre-wrap">
                              {msg.messageContent}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Billing & Payments
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    View payment history and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">No payment records found.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-heading">Transaction ID</TableHead>
                          <TableHead className="font-heading">Service Type</TableHead>
                          <TableHead className="font-heading">Amount</TableHead>
                          <TableHead className="font-heading">Date</TableHead>
                          <TableHead className="font-heading">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment._id}>
                            <TableCell className="font-paragraph font-mono text-sm">
                              {payment.transactionId || 'N/A'}
                            </TableCell>
                            <TableCell className="font-paragraph">
                              {payment.serviceType || 'N/A'}
                            </TableCell>
                            <TableCell className="font-paragraph font-semibold">
                              ${payment.paymentAmount?.toFixed(2) || '0.00'}
                            </TableCell>
                            <TableCell className="font-paragraph">
                              {payment.paymentDate 
                                ? new Date(payment.paymentDate).toLocaleDateString()
                                : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  payment.paymentStatus === 'Completed'
                                    ? 'bg-green-500 text-white'
                                    : payment.paymentStatus === 'Pending'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-500 text-white'
                                }
                              >
                                {payment.paymentStatus || 'Unknown'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
