import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle } from 'lucide-react';
import PasswordResetDialog from '@/components/PasswordResetDialog';
import { BaseCrudService } from '@/integrations';

export default function SettingsTab() {
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordReset = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    setError('');

    // Get the current user from localStorage or session
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error('User email not found. Please log in again.');
    }

    try {
      // Fetch user account
      const userAccounts = await BaseCrudService.getAll<any>('useraccounts');
      const userAccount = userAccounts.items.find((u: any) => u.email === userEmail);

      if (!userAccount) {
        throw new Error('User account not found');
      }

      // In a real application, you would verify the current password
      // For now, we'll just update the password hash
      // Note: In production, this should be done securely on the backend
      const hashedNewPassword = btoa(newPassword); // Simple base64 encoding (NOT secure for production)

      await BaseCrudService.update('useraccounts', {
        _id: userAccount._id,
        passwordHash: hashedNewPassword
      });
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          Settings
        </h2>
        <p className="font-paragraph text-lg text-foreground/70">
          Manage your account settings and security
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-paragraph">{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription className="font-paragraph">
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-paragraph font-semibold text-foreground">
              Password Management
            </h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Change your password to keep your account secure. Use a strong password with a mix of uppercase, lowercase, numbers, and special characters.
            </p>
            <Button
              onClick={() => setIsPasswordResetOpen(true)}
              className="font-paragraph"
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <PasswordResetDialog
        isOpen={isPasswordResetOpen}
        onClose={() => setIsPasswordResetOpen(false)}
        onSubmit={handlePasswordReset}
      />
    </div>
  );
}
