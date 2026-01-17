/**
 * Microsoft Graph API Service for Email Sending
 * Implements OAuth 2.0 authentication and email sending via Microsoft Graph
 */

export interface GraphEmailAttachment {
  '@odata.type': string;
  name: string;
  contentType: string;
  contentBytes: string;
}

export interface GraphEmailMessage {
  subject: string;
  body: {
    contentType: 'HTML' | 'Text';
    content: string;
  };
  toRecipients: Array<{
    emailAddress: {
      address: string;
    };
  }>;
  attachments?: GraphEmailAttachment[];
}

export interface GraphEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

/**
 * Microsoft Graph OAuth Configuration
 * These should be stored in environment variables in production
 */
const GRAPH_CONFIG = {
  clientId: import.meta.env.PUBLIC_MICROSOFT_CLIENT_ID || '',
  clientSecret: import.meta.env.MICROSOFT_CLIENT_SECRET || '',
  tenantId: import.meta.env.MICROSOFT_TENANT_ID || '',
  redirectUri: import.meta.env.PUBLIC_MICROSOFT_REDIRECT_URI || '',
  scopes: ['https://graph.microsoft.com/.default'],
  tokenEndpoint: 'https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token',
  graphEndpoint: 'https://graph.microsoft.com/v1.0',
};

/**
 * Token cache to avoid requesting new tokens for every email
 */
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Get OAuth access token using client credentials flow
 * This is suitable for daemon/service applications
 */
async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  const tokenUrl = GRAPH_CONFIG.tokenEndpoint.replace('{tenantId}', GRAPH_CONFIG.tenantId);
  
  const params = new URLSearchParams({
    client_id: GRAPH_CONFIG.clientId,
    client_secret: GRAPH_CONFIG.clientSecret,
    scope: GRAPH_CONFIG.scopes.join(' '),
    grant_type: 'client_credentials',
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OAuth token request failed: ${errorData.error_description || response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the token (expires_in is in seconds, convert to milliseconds)
    cachedToken = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000, // Subtract 60s for safety margin
    };

    return data.access_token;
  } catch (error) {
    console.error('Failed to obtain access token:', error);
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert data URL to base64 content bytes
 */
function dataUrlToBase64(dataUrl: string): string {
  // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
  const base64Match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  if (!base64Match) {
    throw new Error('Invalid data URL format');
  }
  return base64Match[1];
}

/**
 * Send email via Microsoft Graph API
 * Uses the /users/{userId}/sendMail endpoint
 */
export async function sendEmailViaGraph(
  senderEmail: string,
  recipientEmail: string,
  subject: string,
  htmlBody: string,
  attachments?: Array<{ name: string; contentType: string; dataUrl: string }>
): Promise<GraphEmailResponse> {
  const timestamp = new Date().toISOString();

  try {
    // Validate configuration
    if (!GRAPH_CONFIG.clientId || !GRAPH_CONFIG.clientSecret || !GRAPH_CONFIG.tenantId) {
      throw new Error('Microsoft Graph configuration is incomplete. Please set environment variables.');
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Prepare attachments if provided
    const graphAttachments: GraphEmailAttachment[] | undefined = attachments?.map(att => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: att.name,
      contentType: att.contentType,
      contentBytes: dataUrlToBase64(att.dataUrl),
    }));

    // Prepare email message
    const message: GraphEmailMessage = {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlBody,
      },
      toRecipients: [
        {
          emailAddress: {
            address: recipientEmail,
          },
        },
      ],
      attachments: graphAttachments,
    };

    // Send email via Graph API
    const sendMailUrl = `${GRAPH_CONFIG.graphEndpoint}/users/${senderEmail}/sendMail`;
    
    const response = await fetch(sendMailUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, saveToSentItems: true }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Graph API sendMail failed: ${errorData.error?.message || response.statusText} (Status: ${response.status})`
      );
    }

    // Microsoft Graph sendMail returns 202 Accepted with no body on success
    return {
      success: true,
      messageId: response.headers.get('request-id') || undefined,
      timestamp,
    };
  } catch (error) {
    console.error('Microsoft Graph sendMail error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp,
    };
  }
}

/**
 * Test Microsoft Graph connection and authentication
 */
export async function testGraphConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const accessToken = await getAccessToken();
    
    // Test with a simple Graph API call (get user profile)
    const response = await fetch(`${GRAPH_CONFIG.graphEndpoint}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Microsoft Graph connection successful',
      };
    } else {
      return {
        success: false,
        message: `Connection test failed: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection test failed',
    };
  }
}
