/**
 * Backend Web Module for Microsoft Graph Email Operations
 * All Microsoft Graph operations happen here with secrets from Wix Secrets Manager
 * CRITICAL: This file runs on the backend only - secrets are never exposed to frontend
 */

import { getSecret } from 'wix-secrets-backend';

/**
 * Microsoft Graph Configuration loaded from Wix Secrets Manager
 */
interface GraphConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  businessEmail: string;
}

/**
 * Token cache to avoid requesting new tokens for every email
 */
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Load Microsoft Graph configuration from Wix Secrets Manager
 */
async function loadGraphConfig(): Promise<GraphConfig> {
  try {
    const [tenantId, clientId, clientSecret, businessEmail] = await Promise.all([
      getSecret('MICROSOFT_TENANT_ID'),
      getSecret('MICROSOFT_CLIENT_ID'),
      getSecret('MICROSOFT_CLIENT_SECRET'),
      getSecret('BUSINESS_EMAIL'),
    ]);

    if (!tenantId || !clientId || !clientSecret || !businessEmail) {
      throw new Error('Microsoft Graph configuration is incomplete in Wix Secrets Manager');
    }

    return {
      tenantId,
      clientId,
      clientSecret,
      businessEmail,
    };
  } catch (error) {
    console.error('Failed to load Graph configuration from Wix Secrets Manager:', error);
    throw new Error('Failed to load email configuration');
  }
}

/**
 * Get OAuth access token using client credentials flow
 */
async function getAccessToken(config: GraphConfig): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

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
}

/**
 * Convert data URL to base64 content bytes
 */
function dataUrlToBase64(dataUrl: string): string {
  const base64Match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  if (!base64Match) {
    throw new Error('Invalid data URL format');
  }
  return base64Match[1];
}

/**
 * Backend function to send email via Microsoft Graph
 * This is the ONLY place where secrets are accessed and used
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: Array<{ name: string; contentType: string; dataUrl: string }>;
}) {
  const timestamp = new Date().toISOString();

  try {
    // Load configuration from Wix Secrets Manager
    const config = await loadGraphConfig();

    // Get access token
    const accessToken = await getAccessToken(config);

    // Prepare attachments if provided
    const graphAttachments = options.attachments?.map(att => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: att.name,
      contentType: att.contentType,
      contentBytes: dataUrlToBase64(att.dataUrl),
    }));

    // Prepare email message
    const message = {
      subject: options.subject,
      body: {
        contentType: 'HTML',
        content: options.htmlBody,
      },
      toRecipients: [
        {
          emailAddress: {
            address: options.to,
          },
        },
      ],
      attachments: graphAttachments,
    };

    // Send email via Graph API
    const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${config.businessEmail}/sendMail`;
    
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
 * Backend function to test Microsoft Graph connection
 * Verifies that secrets are configured correctly and Graph API is accessible
 */
export async function testGraphConnection() {
  try {
    // Load configuration from Wix Secrets Manager
    const config = await loadGraphConfig();

    // Get access token
    const accessToken = await getAccessToken(config);
    
    // Test with a simple Graph API call to verify the token works
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${config.businessEmail}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        success: true,
        message: 'Microsoft Graph connection successful',
        details: {
          email: userData.mail || userData.userPrincipalName,
          displayName: userData.displayName,
        },
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: `Connection test failed: ${errorData.error?.message || response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection test failed',
    };
  }
}

/**
 * Backend function to get business email (without exposing the secret)
 * Returns only the email address for display purposes
 */
export async function getBusinessEmail() {
  try {
    const businessEmail = await getSecret('BUSINESS_EMAIL');
    return {
      success: true,
      email: businessEmail,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to retrieve business email',
    };
  }
}
