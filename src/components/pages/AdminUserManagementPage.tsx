import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, isAdmin, getAllUsers, setAdminStatus } from '@/lib/auth-service';
import { Users, Shield, ShieldOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminUserManagementPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      setErrorMessage('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAdmin = async (email: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const success = await setAdminStatus(email, newStatus);

    if (success) {
      setUsers(prev => prev.map(u => 
        u.email === email ? { ...u, isAdmin: newStatus } : u
      ));
      setSuccessMessage(`Successfully ${newStatus ? 'granted' : 'revoked'} admin privileges for ${email}`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setErrorMessage('Failed to update admin status. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
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

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground">
              User Management
            </h1>
          </div>
          <p className="font-paragraph text-lg text-foreground/80">
            Manage user accounts and admin privileges
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

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                All Users
              </CardTitle>
              <CardDescription className="font-paragraph">
                View and manage user accounts and admin privileges
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/80">No users found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map(user => (
                    <div
                      key={user.email}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.email}
                            </h3>
                            {user.isAdmin && (
                              <Badge className="bg-primary text-white">
                                <Shield className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                            {user.email === currentUser.email && (
                              <Badge variant="outline" className="border-primary text-primary">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="font-paragraph text-foreground/60">Email</p>
                              <p className="font-paragraph font-semibold text-foreground">
                                {user.email}
                              </p>
                            </div>
                            <div>
                              <p className="font-paragraph text-foreground/60">Member Since</p>
                              <p className="font-paragraph font-semibold text-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 ml-6">
                          <div className="flex items-center gap-2">
                            {user.isAdmin ? (
                              <Shield className="w-5 h-5 text-primary" />
                            ) : (
                              <ShieldOff className="w-5 h-5 text-gray-400" />
                            )}
                            <span className="font-paragraph text-sm text-foreground/80">
                              Admin
                            </span>
                            <Switch
                              checked={user.isAdmin}
                              onCheckedChange={() => handleToggleAdmin(user.email, user.isAdmin)}
                              disabled={user.email === currentUser.email}
                            />
                          </div>
                        </div>
                      </div>

                      {user.email === currentUser.email && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="font-paragraph text-sm text-foreground/60 italic">
                            You cannot modify your own admin status
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-pastelbeige/20 border-pastelbeige">
            <CardHeader>
              <CardTitle className="font-heading text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                About Admin Privileges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-paragraph text-foreground/80">
                <p>
                  <strong>Admin users have access to:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>View and manage all client documents</li>
                  <li>Access all client personal information and profiles</li>
                  <li>View and respond to all messages</li>
                  <li>Manage payment records and billing information</li>
                  <li>Grant or revoke admin privileges for other users</li>
                  <li>Access admin-only pages and features</li>
                </ul>
                <p className="mt-4 text-sm text-foreground/60">
                  <strong>Note:</strong> Admin privileges should only be granted to trusted staff members.
                  Regular users can only access their own information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
