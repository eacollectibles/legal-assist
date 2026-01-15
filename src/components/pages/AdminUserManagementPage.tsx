import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, isAdmin, getAllUsers, setAdminStatus } from '@/lib/auth-service';
import { BaseCrudService } from '@/integrations';
import { Messages } from '@/entities';
import { Users, Shield, ShieldOff, AlertCircle, CheckCircle, Loader, Eye, MessageSquare, UserX, Trash2, Lock } from 'lucide-react';

interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  createdAt: string;
  unreadMessageCount?: number;
}

export default function AdminUserManagementPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Master code verification state
  const [showMasterCodeDialog, setShowMasterCodeDialog] = useState(false);
  const [masterCodeInput, setMasterCodeInput] = useState('');
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const MASTER_CODE = 'd0813840';

  // Check if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/client-login');
    } else {
      loadUsers();
    }
  }, [navigate]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await getAllUsers();
      
      // Load all messages to count unread messages per user
      const { items: allMessages } = await BaseCrudService.getAll<Messages>('messages');
      
      // Count unread messages for each user (messages sent by user to admin that are unread)
      const usersWithUnreadCounts = allUsers.map(user => {
        const unreadCount = allMessages.filter(
          msg => msg.senderEmail === user.email && 
                 msg.recipientEmail === 'admin@legalservices.com' && 
                 !msg.isRead
        ).length;
        
        return {
          ...user,
          unreadMessageCount: unreadCount
        };
      });
      
      setUsers(usersWithUnreadCounts);
    } catch (error) {
      console.error('Failed to load users:', error);
      setErrorMessage('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAdmin = async (email: string, currentStatus: boolean) => {
    // Check if current user is authorized to modify paralegal privileges
    if (currentUser?.email !== 'jeanfrancois@legalassist.london') {
      setErrorMessage('Access Denied: Only jeanfrancois@legalassist.london can modify paralegal privileges.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const newStatus = !currentStatus;
    const success = await setAdminStatus(email, newStatus);

    if (success) {
      setUsers(prev => prev.map(u => 
        u.email === email ? { ...u, isAdmin: newStatus } : u
      ));
      setSuccessMessage(`Successfully ${newStatus ? 'granted' : 'revoked'} paralegal privileges for ${email}`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setErrorMessage('Failed to update paralegal status. Only jeanfrancois@legalassist.london can modify paralegal privileges.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleDisableAccount = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to disable the account for ${email}? The user will not be able to log in.`)) {
      return;
    }

    try {
      await BaseCrudService.update('useraccounts', {
        _id: userId,
        accountStatus: 'Disabled'
      });

      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u } : u
      ));
      
      setSuccessMessage(`Account for ${email} has been disabled.`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      // Reload users to reflect changes
      loadUsers();
    } catch (error) {
      console.error('Failed to disable account:', error);
      setErrorMessage('Failed to disable account. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleDeleteAccount = async (userId: string, email: string) => {
    if (!confirm(`⚠️ WARNING: Are you sure you want to PERMANENTLY DELETE the account for ${email}?\n\nThis will delete:\n- User account\n- All documents\n- All messages\n- All payment records\n- All activity logs\n\nThis action CANNOT be undone!`)) {
      return;
    }

    // Double confirmation
    const confirmText = prompt(`Type "DELETE" to confirm permanent deletion of ${email}:`);
    if (confirmText !== 'DELETE') {
      setErrorMessage('Account deletion cancelled.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      // Delete all related data
      const { items: documents } = await BaseCrudService.getAll('clientdocuments');
      const userDocs = documents.filter(doc => doc.clientEmail === email);
      for (const doc of userDocs) {
        await BaseCrudService.delete('clientdocuments', doc._id);
      }

      const { items: messages } = await BaseCrudService.getAll('messages');
      const userMessages = messages.filter(msg => msg.senderEmail === email || msg.recipientEmail === email);
      for (const msg of userMessages) {
        await BaseCrudService.delete('messages', msg._id);
      }

      const { items: payments } = await BaseCrudService.getAll('paymentrecords');
      const userPayments = payments.filter(p => p._id.includes(email));
      for (const payment of userPayments) {
        await BaseCrudService.delete('paymentrecords', payment._id);
      }

      const { items: logs } = await BaseCrudService.getAll('activitylogs');
      const userLogs = logs.filter(log => log.userId === userId);
      for (const log of userLogs) {
        await BaseCrudService.delete('activitylogs', log._id);
      }

      const { items: notifications } = await BaseCrudService.getAll('notifications');
      const userNotifications = notifications.filter(n => n.userId === userId);
      for (const notif of userNotifications) {
        await BaseCrudService.delete('notifications', notif._id);
      }

      // Delete profile if exists
      try {
        await BaseCrudService.delete('clientprofiles', userId);
      } catch (e) {
        // Profile might not exist, continue
      }

      // Finally delete the user account
      await BaseCrudService.delete('useraccounts', userId);

      setUsers(prev => prev.filter(u => u._id !== userId));
      setSuccessMessage(`Account for ${email} has been permanently deleted.`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to delete account:', error);
      setErrorMessage('Failed to delete account. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  // Master code verification handler
  const handleMasterCodeVerification = () => {
    if (masterCodeInput === MASTER_CODE) {
      setShowMasterCodeDialog(false);
      setMasterCodeInput('');
      
      // Navigate to the pending user's detail page
      if (pendingUserId) {
        navigate(`/admin/users/${pendingUserId}`);
        setPendingUserId(null);
      }
      
      setSuccessMessage('Master code verified. Access granted.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setErrorMessage('Invalid master code. Access denied.');
      setTimeout(() => setErrorMessage(''), 5000);
      setMasterCodeInput('');
    }
  };

  // Handle view details with master code check
  const handleViewDetails = (userId: string, userEmail: string) => {
    // Check if viewing jeanfrancois@legalassist.london's account
    if (userEmail === 'jeanfrancois@legalassist.london' && currentUser?.email !== 'jeanfrancois@legalassist.london') {
      // Require master code
      setPendingUserId(userId);
      setShowMasterCodeDialog(true);
    } else {
      // Navigate directly
      navigate(`/admin/users/${userId}`);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Master Code Dialog */}
      <Dialog open={showMasterCodeDialog} onOpenChange={setShowMasterCodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Master Code Required
            </DialogTitle>
            <DialogDescription className="font-paragraph">
              Enter the master code to view details for jeanfrancois@legalassist.london's account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="masterCode" className="font-paragraph">Master Code</Label>
              <Input
                id="masterCode"
                type="password"
                value={masterCodeInput}
                onChange={(e) => setMasterCodeInput(e.target.value)}
                placeholder="Enter master code"
                className="font-paragraph"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleMasterCodeVerification();
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowMasterCodeDialog(false);
                setMasterCodeInput('');
                setPendingUserId(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleMasterCodeVerification}>
              Verify Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground">
              File Management
            </h1>
          </div>
          <p className="font-paragraph text-lg text-foreground/80">
            Manage client accounts and paralegal privileges
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-green-800">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Users</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{users.length}</p>
                  </div>
                  <Users className="w-10 h-10 text-primary/30" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Paralegals</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{users.filter(u => u.isAdmin).length}</p>
                  </div>
                  <Shield className="w-10 h-10 text-primary/30" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Clients</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{users.filter(u => !u.isAdmin).length}</p>
                  </div>
                  <Users className="w-10 h-10 text-primary/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Paralegals Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Paralegals ({users.filter(u => u.isAdmin).length})
              </CardTitle>
              <CardDescription className="font-paragraph">
                Licensed paralegals with administrative privileges
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">Loading paralegals...</p>
                </div>
              ) : users.filter(u => u.isAdmin).length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">No paralegals found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.filter(u => u.isAdmin).map(user => (
                    <div
                      key={user.email}
                      className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="font-heading text-lg font-bold text-foreground truncate">
                                {user.firstName && user.lastName
                                  ? `${user.firstName} ${user.lastName}`
                                  : user.email}
                              </h3>
                            </div>
                            <Badge className="bg-primary text-white flex-shrink-0">
                              Paralegal
                            </Badge>
                            {user.email === currentUser.email && (
                              <Badge variant="outline" className="border-primary text-primary flex-shrink-0">
                                You
                              </Badge>
                            )}
                            {user.unreadMessageCount && user.unreadMessageCount > 0 && (
                              <Badge className="bg-red-500 text-white flex items-center gap-1 flex-shrink-0">
                                <MessageSquare className="w-3 h-3" />
                                {user.unreadMessageCount}
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-paragraph text-foreground/60 text-xs mb-1">Email</p>
                              <p className="font-paragraph font-semibold text-foreground truncate">
                                {user.email}
                              </p>
                            </div>
                            <div>
                              <p className="font-paragraph text-foreground/60 text-xs mb-1">Member Since</p>
                              <p className="font-paragraph font-semibold text-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:ml-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(user._id, user.email)}
                              className="flex-1 sm:flex-none"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                              {user.email === 'jeanfrancois@legalassist.london' && currentUser?.email !== 'jeanfrancois@legalassist.london' && (
                                <Lock className="w-3 h-3 ml-2 text-primary" />
                              )}
                            </Button>
                            
                            {currentUser?.email === 'jeanfrancois@legalassist.london' && (
                              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <Shield className="w-4 h-4 text-primary" />
                                <span className="font-paragraph text-xs text-foreground/80">
                                  Paralegal
                                </span>
                                <Switch
                                  checked={user.isAdmin}
                                  onCheckedChange={() => handleToggleAdmin(user.email, user.isAdmin)}
                                  disabled={user.email === currentUser.email}
                                />
                              </div>
                            )}
                          </div>

                          {user.email !== currentUser.email && (
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDisableAccount(user._id, user.email)}
                                className="flex-1 sm:flex-none border-orange-500 text-orange-600 hover:bg-orange-50"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Disable
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteAccount(user._id, user.email)}
                                className="flex-1 sm:flex-none border-destructive text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {user.email === currentUser.email && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="font-paragraph text-sm text-foreground/60 italic">
                            You cannot modify your own paralegal status
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Clients Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Clients ({users.filter(u => !u.isAdmin).length})
              </CardTitle>
              <CardDescription className="font-paragraph">
                View and manage client accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">Loading clients...</p>
                </div>
              ) : users.filter(u => !u.isAdmin).length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">No clients found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.filter(u => !u.isAdmin).map(user => (
                    <div
                      key={user.email}
                      className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-gray-600" />
                              </div>
                              <h3 className="font-heading text-lg font-bold text-foreground truncate">
                                {user.firstName && user.lastName
                                  ? `${user.firstName} ${user.lastName}`
                                  : user.email}
                              </h3>
                            </div>
                            {user.email === currentUser.email && (
                              <Badge variant="outline" className="border-primary text-primary flex-shrink-0">
                                You
                              </Badge>
                            )}
                            {user.unreadMessageCount && user.unreadMessageCount > 0 && (
                              <Badge className="bg-red-500 text-white flex items-center gap-1 flex-shrink-0">
                                <MessageSquare className="w-3 h-3" />
                                {user.unreadMessageCount}
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-paragraph text-foreground/60 text-xs mb-1">Email</p>
                              <p className="font-paragraph font-semibold text-foreground truncate">
                                {user.email}
                              </p>
                            </div>
                            <div>
                              <p className="font-paragraph text-foreground/60 text-xs mb-1">Member Since</p>
                              <p className="font-paragraph font-semibold text-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:ml-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(user._id, user.email)}
                              className="flex-1 sm:flex-none"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            
                            {currentUser?.email === 'jeanfrancois@legalassist.london' && (
                              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <ShieldOff className="w-4 h-4 text-gray-400" />
                                <span className="font-paragraph text-xs text-foreground/80">
                                  Paralegal
                                </span>
                                <Switch
                                  checked={user.isAdmin}
                                  onCheckedChange={() => handleToggleAdmin(user.email, user.isAdmin)}
                                  disabled={user.email === currentUser.email}
                                />
                              </div>
                            )}
                          </div>

                          {user.email !== currentUser.email && (
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDisableAccount(user._id, user.email)}
                                className="flex-1 sm:flex-none border-orange-500 text-orange-600 hover:bg-orange-50"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Disable
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteAccount(user._id, user.email)}
                                className="flex-1 sm:flex-none border-destructive text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {user.email === currentUser.email && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="font-paragraph text-sm text-foreground/60 italic">
                            You cannot modify your own paralegal status
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
