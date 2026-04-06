import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { UserAccounts } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-service';

export default function GrantAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const targetEmail = 'jeanfrancois@legalassist.london';

  const grantAdminPrivileges = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Find the user by email
      const { items } = await BaseCrudService.getAll<UserAccounts>('useraccounts');
      const user = items.find(u => u.email === targetEmail);

      if (!user) {
        setMessage({
          type: 'error',
          text: `User with email ${targetEmail} not found in the database.`
        });
        setLoading(false);
        return;
      }

      // Check if already admin
      if (user.isAdmin) {
        setMessage({
          type: 'success',
          text: `User ${targetEmail} already has admin privileges.`
        });
        
        // Update localStorage if this is the current user
        const currentUser = getCurrentUser();
        if (currentUser?.email === targetEmail && !currentUser.isAdmin) {
          currentUser.isAdmin = true;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          setMessage({
            type: 'success',
            text: `User ${targetEmail} already has admin privileges. Session updated - please refresh the page.`
          });
        }
        
        setLoading(false);
        return;
      }

      // Update user to grant admin privileges
      await BaseCrudService.update<UserAccounts>('useraccounts', {
        _id: user._id,
        isAdmin: true
      });

      // Update localStorage if this is the current user
      const currentUser = getCurrentUser();
      if (currentUser?.email === targetEmail) {
        currentUser.isAdmin = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setMessage({
          type: 'success',
          text: `Successfully granted admin privileges to ${targetEmail}! Session updated - please refresh the page to see admin features.`
        });
      } else {
        setMessage({
          type: 'success',
          text: `Successfully granted admin privileges to ${targetEmail}! User will see admin features on next login.`
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Failed to grant admin privileges: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically execute on page load
    grantAdminPrivileges();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Grant Admin Privileges</CardTitle>
            <CardDescription className="font-paragraph text-lg">
              Updating user permissions for: <strong>{targetEmail}</strong>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {message && (
              <div
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-pastelgreen text-foreground'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                )}
                <p className="font-paragraph text-base">{message.text}</p>
              </div>
            )}

            {!loading && (
              <Button
                onClick={grantAdminPrivileges}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Processing...' : 'Grant Admin Privileges Again'}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
