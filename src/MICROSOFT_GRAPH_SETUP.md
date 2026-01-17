# Microsoft Graph OAuth Email Integration Setup

## Overview
This application now uses **Microsoft Graph API** with OAuth 2.0 authentication to send real emails with PDF attachments. The system logs actual sent/failed status from Microsoft Graph, ensuring no simulated sending or false success reporting.

## Features Implemented
✅ **Real Email Sending** - Uses Microsoft Graph's `sendMail` API endpoint  
✅ **PDF Attachment Support** - Attaches signed PDFs directly to emails  
✅ **OAuth 2.0 Authentication** - Client credentials flow for daemon/service apps  
✅ **Token Caching** - Efficient token reuse to minimize auth requests  
✅ **Comprehensive Logging** - Logs actual delivery status (sent/failed) from Graph API  
✅ **Error Handling** - Detailed error messages for troubleshooting  
✅ **Upload Link Integration** - Includes secure upload links in email body  

---

## Azure AD App Registration Setup

### Step 1: Register Application in Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: `LegalAssist Email Service`
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: Leave blank (not needed for client credentials flow)
5. Click **Register**

### Step 2: Configure API Permissions
1. In your app registration, go to **API permissions**
2. Click **Add a permission** → **Microsoft Graph** → **Application permissions**
3. Add these permissions:
   - `Mail.Send` - Send mail as any user
   - `User.Read.All` - Read all users' full profiles (optional, for testing)
4. Click **Grant admin consent** for your organization

### Step 3: Create Client Secret
1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description: `Email Service Secret`
4. Set expiration: `24 months` (recommended)
5. Click **Add**
6. **IMPORTANT**: Copy the secret value immediately (you won't see it again)

### Step 4: Get Required IDs
1. Go to **Overview** page of your app registration
2. Copy these values:
   - **Application (client) ID**
   - **Directory (tenant) ID**

---

## Environment Variables Configuration

Add these environment variables to your `.env` file:

```env
# Microsoft Graph OAuth Configuration
PUBLIC_MICROSOFT_CLIENT_ID=your-application-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret-value
MICROSOFT_TENANT_ID=your-directory-tenant-id
PUBLIC_MICROSOFT_REDIRECT_URI=http://localhost:4321/auth/callback
```

### Example Values
```env
PUBLIC_MICROSOFT_CLIENT_ID=12345678-1234-1234-1234-123456789abc
MICROSOFT_CLIENT_SECRET=abc123~XYZ789_secretValue
MICROSOFT_TENANT_ID=87654321-4321-4321-4321-cba987654321
PUBLIC_MICROSOFT_REDIRECT_URI=http://localhost:4321/auth/callback
```

---

## Sender Email Configuration

The system sends emails from the configured business email address. Update this in `/src/lib/email-service.ts`:

```typescript
const BUSINESS_EMAIL = 'jeanfrancois@legalassist.london';
```

**IMPORTANT**: The sender email must be a valid mailbox in your Microsoft 365 tenant with the `Mail.Send` permission granted.

---

## How It Works

### 1. Authentication Flow
```
Application → Azure AD Token Endpoint
  ↓
Client Credentials Grant (client_id + client_secret)
  ↓
Access Token (cached for ~1 hour)
  ↓
Microsoft Graph API
```

### 2. Email Sending Process
```
sendSignedDocumentEmail()
  ↓
Validate recipient email
  ↓
Generate HTML email template
  ↓
Convert PDF data URL to base64
  ↓
Call Microsoft Graph /users/{email}/sendMail
  ↓
Attach PDF as fileAttachment
  ↓
Return actual delivery status (sent/failed)
  ↓
Log to activity logs with real status
```

### 3. PDF Attachment Handling
- PDFs are stored as data URLs in the database
- System extracts base64 content from data URL
- Attaches as `#microsoft.graph.fileAttachment` type
- Includes stable filename with date and client name

---

## Testing the Integration

### Test Connection
```typescript
import { testGraphConnection } from '@/lib/microsoft-graph-service';

const result = await testGraphConnection();
console.log(result);
// { success: true, message: 'Microsoft Graph connection successful' }
```

### Send Test Email
1. Go to **Document Workflow** page
2. Generate a document and sign it
3. Click **Email Signed Document**
4. Fill in recipient email
5. Click **Send Email**
6. Check activity logs for delivery status

---

## Activity Logging

All email attempts are logged to the `activitylogs` collection with:

```typescript
{
  activityType: 'document_emailed',
  activityDescription: 'Document "..." emailed to ... Status: sent/failed',
  deliveryStatus: 'sent' | 'failed',
  errorMessage: 'Error details if failed',
  timestamp: 'ISO 8601 timestamp',
  relatedItemId: 'document ID'
}
```

---

## Error Handling

### Common Errors and Solutions

#### 1. "Microsoft Graph configuration is incomplete"
**Cause**: Missing environment variables  
**Solution**: Verify all 4 environment variables are set correctly

#### 2. "OAuth token request failed: invalid_client"
**Cause**: Incorrect client ID or secret  
**Solution**: Double-check values from Azure portal

#### 3. "Graph API sendMail failed: Insufficient privileges"
**Cause**: Missing `Mail.Send` permission or admin consent not granted  
**Solution**: Add permission and grant admin consent in Azure portal

#### 4. "Invalid recipient email address"
**Cause**: Email format validation failed  
**Solution**: Ensure recipient email is valid format

#### 5. "Failed to send email via Microsoft Graph"
**Cause**: Network error or Graph API unavailable  
**Solution**: Check network connectivity and Azure service status

---

## Security Best Practices

1. **Never commit secrets** - Use environment variables only
2. **Rotate secrets regularly** - Update client secret every 6-12 months
3. **Use least privilege** - Only grant `Mail.Send` permission
4. **Monitor logs** - Review activity logs for suspicious activity
5. **Validate inputs** - Always validate email addresses before sending

---

## Production Deployment

### Wix Platform
1. Add environment variables in Wix Dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all 4 Microsoft Graph variables
2. Deploy application
3. Test email sending in production environment

### Other Platforms
1. Set environment variables in hosting platform
2. Ensure sender email is valid in your Microsoft 365 tenant
3. Verify firewall allows outbound HTTPS to `login.microsoftonline.com` and `graph.microsoft.com`

---

## Monitoring and Maintenance

### Check Email Delivery Status
```sql
-- Query activity logs for email delivery
SELECT * FROM activitylogs 
WHERE activityType = 'document_emailed' 
ORDER BY timestamp DESC;
```

### Monitor Token Expiration
- Tokens are cached for ~1 hour
- System automatically requests new tokens when expired
- No manual intervention needed

### Review Failed Emails
```sql
-- Find failed email attempts
SELECT * FROM activitylogs 
WHERE activityType = 'document_email_failed' 
ORDER BY timestamp DESC;
```

---

## Support and Troubleshooting

### Enable Debug Logging
Set `DEBUG=true` in environment variables to see detailed logs:
```env
DEBUG=true
```

### Test Graph API Directly
Use Microsoft Graph Explorer: https://developer.microsoft.com/graph/graph-explorer

### Contact Support
- Azure AD Issues: https://portal.azure.com → Support
- Microsoft Graph API: https://docs.microsoft.com/graph/

---

## API Reference

### Microsoft Graph sendMail
- **Endpoint**: `POST /users/{userId}/sendMail`
- **Documentation**: https://docs.microsoft.com/graph/api/user-sendmail
- **Rate Limits**: 10,000 requests per 10 minutes per app

### OAuth 2.0 Client Credentials
- **Endpoint**: `POST /oauth2/v2.0/token`
- **Documentation**: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow

---

## Changelog

### Version 1.0.0 (2026-01-17)
- ✅ Implemented Microsoft Graph OAuth integration
- ✅ Added real email sending with PDF attachments
- ✅ Integrated upload link generation in email body
- ✅ Added comprehensive activity logging
- ✅ Implemented token caching for efficiency
- ✅ Added error handling and validation
- ✅ Created setup documentation

---

## Next Steps

1. **Set up Azure AD app registration** (follow steps above)
2. **Configure environment variables** in your deployment
3. **Test email sending** with a real recipient
4. **Monitor activity logs** for delivery status
5. **Set up alerts** for failed email attempts (optional)

---

**Note**: This implementation uses the **client credentials flow**, which is suitable for daemon/service applications. For user-delegated scenarios, consider implementing the **authorization code flow** instead.
