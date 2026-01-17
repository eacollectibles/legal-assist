/**
 * Frontend utility to test Microsoft Graph connection
 * Calls backend web module which accesses secrets from Wix Secrets Manager
 */

export interface GraphTestResult {
  success: boolean;
  message: string;
  details?: {
    email: string;
    displayName: string;
  };
}

/**
 * Test Microsoft Graph connection by calling backend function
 * This function can be called from frontend components
 * All secrets remain secure on the backend
 */
export async function testGraphConnection(): Promise<GraphTestResult> {
  try {
    // Import backend web module
    const { testGraphConnection: backendTest } = await import('@/backend/email.web');
    
    // Call backend function (secrets accessed only on backend)
    const result = await backendTest();
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to test Graph connection',
    };
  }
}

/**
 * Get business email for display purposes (without exposing secret)
 */
export async function getBusinessEmailForDisplay(): Promise<string> {
  try {
    const { getBusinessEmail } = await import('@/backend/email.web');
    const result = await getBusinessEmail();
    return result.success ? result.email : 'Not configured';
  } catch (error) {
    return 'Error loading email';
  }
}
