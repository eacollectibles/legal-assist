/**
 * Microsoft Graph Connection Test Component
 * Allows testing the Graph API connection without exposing secrets
 * All secrets are accessed only in backend code via Wix Secrets Manager
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Mail, Key } from 'lucide-react';
import { testGraphConnection, getBusinessEmailForDisplay } from '@/lib/graph-test-utils';

interface TestResult {
  success: boolean;
  message: string;
  details?: {
    email: string;
    displayName: string;
  };
}

export default function GraphConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [businessEmail, setBusinessEmail] = useState<string>('Loading...');

  // Load business email on mount
  useState(() => {
    getBusinessEmailForDisplay().then(setBusinessEmail);
  });

  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const result = await testGraphConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle>Microsoft Graph Connection Test</CardTitle>
        </div>
        <CardDescription>
          Test the Microsoft Graph API connection and verify email configuration.
          All secrets are securely stored in Wix Secrets Manager.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Business Email Display */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
          <Key className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium">Business Email</p>
            <p className="text-sm text-muted-foreground">{businessEmail}</p>
          </div>
        </div>

        {/* Test Button */}
        <Button
          onClick={handleTestConnection}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Test Graph Connection
            </>
          )}
        </Button>

        {/* Test Result */}
        {testResult && (
          <Alert variant={testResult.success ? 'default' : 'destructive'}>
            <div className="flex items-start gap-3">
              {testResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={testResult.success ? 'default' : 'destructive'}>
                    {testResult.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
                <AlertDescription className="text-sm">
                  {testResult.message}
                </AlertDescription>
                {testResult.details && (
                  <div className="mt-3 p-3 bg-background rounded-md border space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{' '}
                      {testResult.details.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Display Name:</span>{' '}
                      {testResult.details.displayName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Alert>
        )}

        {/* Information */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-medium">Required Secrets in Wix Secrets Manager:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>MICROSOFT_TENANT_ID</li>
            <li>MICROSOFT_CLIENT_ID</li>
            <li>MICROSOFT_CLIENT_SECRET</li>
            <li>BUSINESS_EMAIL</li>
          </ul>
          <p className="mt-2 italic">
            All secrets are accessed securely on the backend only.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
