# Microsoft Graph Integration with Wix Secrets Manager

## Overview
This application uses Microsoft Graph API to send emails. All sensitive credentials are stored securely in Wix Secrets Manager and accessed exclusively in backend code.

## Architecture

### Backend-Only Secret Access
- **Backend Module**: `/src/backend/email.web.ts`
  - Accesses secrets from Wix Secrets Manager using `wix-secrets-backend`
  - Handles all Microsoft Graph authentication and API calls
  - Never exposes secrets to frontend code

### Frontend Integration
- **Email Service**: `/src/lib/email-service.ts`
  - Calls backend module for email operations
  - No direct access to secrets
  
- **Test Utilities**: `/src/lib/graph-test-utils.ts`
  - Provides frontend functions to test Graph connection
  - Calls backend module which accesses secrets securely

## Required Secrets in Wix Secrets Manager

You must configure the following secrets in Wix Secrets Manager:

1. **MICROSOFT_TENANT_ID**
   - Your Microsoft Azure AD tenant ID
   - Example: `12345678-1234-1234-1234-123456789abc`

2. **MICROSOFT_CLIENT_ID**
   - Your Azure AD application (client) ID
   - Example: `87654321-4321-4321-4321-cba987654321`

3. **MICROSOFT_CLIENT_SECRET**
   - Your Azure AD application client secret
   - Example: `abc123~XYZ789.def456_GHI012`

4. **BUSINESS_EMAIL**
   - The email address used to send emails via Microsoft Graph
   - Must be a valid mailbox in your Microsoft 365 tenant
   - Example: `jeanfrancois@legalassist.london`

## Setting Up Secrets in Wix

### Via Wix Dashboard
1. Go to your Wix site dashboard
2. Navigate to **Settings** → **Secrets Manager**
3. Add each secret with the exact names listed above
4. Save the secrets

### Via Wix CLI (if available)
```bash
wix secrets create MICROSOFT_TENANT_ID "your-tenant-id"
wix secrets create MICROSOFT_CLIENT_ID "your-client-id"
wix secrets create MICROSOFT_CLIENT_SECRET "your-client-secret"
wix secrets create BUSINESS_EMAIL "your-business-email@domain.com"
```

## Azure AD Application Setup

### Prerequisites
1. Microsoft 365 tenant with admin access
2. Azure AD application registered

### Required API Permissions
Your Azure AD application needs the following Microsoft Graph API permissions:

- **Mail.Send** (Application permission)
  - Allows the app to send mail as any user without a signed-in user
  
- **User.Read.All** (Application permission) - Optional
  - For testing connection and retrieving user profile

### Grant Admin Consent
After adding permissions, an admin must grant consent for the application.

## Testing the Integration

### Backend Test Function
The backend module includes a `testGraphConnection()` function that:
- Loads secrets from Wix Secrets Manager
- Obtains an OAuth access token
- Verifies the token by calling Microsoft Graph API
- Returns success/failure without exposing secrets

### Frontend Test Utility
Use the frontend utility to test from components:

```typescript
import { testGraphConnection } from '@/lib/graph-test-utils';

const result = await testGraphConnection();
if (result.success) {
  console.log('Graph connection successful:', result.details);
} else {
  console.error('Graph connection failed:', result.message);
}
```

## Security Features

### ✅ Secrets Never Exposed to Frontend
- All secrets are accessed only in backend code (`/src/backend/email.web.ts`)
- Frontend code calls backend functions without accessing secrets
- No secrets in environment variables visible to client

### ✅ Token Caching
- OAuth access tokens are cached on the backend
- Reduces unnecessary token requests
- Tokens are refreshed automatically before expiration

### ✅ Error Handling
- Detailed error messages for debugging (backend logs only)
- Generic error messages returned to frontend
- No secret values in error messages

## Email Sending Flow

1. **Frontend** calls email service function (e.g., `sendSignedDocumentEmail`)
2. **Email Service** (`/src/lib/email-service.ts`) prepares email content
3. **Email Service** calls backend module (`/src/backend/email.web.ts`)
4. **Backend Module** loads secrets from Wix Secrets Manager
5. **Backend Module** obtains OAuth token from Microsoft
6. **Backend Module** sends email via Microsoft Graph API
7. **Backend Module** returns success/failure to frontend

## Troubleshooting

### "Microsoft Graph configuration is incomplete"
- Verify all 4 secrets are set in Wix Secrets Manager
- Check secret names match exactly (case-sensitive)

### "OAuth token request failed"
- Verify MICROSOFT_TENANT_ID is correct
- Verify MICROSOFT_CLIENT_ID is correct
- Verify MICROSOFT_CLIENT_SECRET is valid and not expired

### "Graph API sendMail failed"
- Verify BUSINESS_EMAIL is a valid mailbox in your tenant
- Verify API permissions are granted (Mail.Send)
- Verify admin consent was granted for the application

### "Failed to load email configuration"
- Check Wix Secrets Manager is properly configured
- Verify backend code has access to `wix-secrets-backend` package

## Migration Notes

### Previous Implementation
- Secrets were stored in environment variables
- Frontend code had direct access to secrets (security risk)
- Configuration in `/src/lib/microsoft-graph-service.ts`

### Current Implementation
- Secrets stored in Wix Secrets Manager
- Backend-only access to secrets
- Frontend calls backend functions
- Configuration loaded dynamically from Wix Secrets Manager

## Files Modified/Created

### Created
- `/src/backend/email.web.ts` - Backend web module for Graph operations
- `/src/lib/graph-test-utils.ts` - Frontend utilities for testing
- `/src/MICROSOFT_GRAPH_SECRETS_SETUP.md` - This documentation

### Modified
- `/src/lib/email-service.ts` - Updated to call backend module
- `/src/lib/microsoft-graph-service.ts` - Deprecated (kept for reference)

## Best Practices

1. **Never log secrets** - Even in backend code, avoid logging secret values
2. **Rotate secrets regularly** - Update client secrets periodically in Azure AD and Wix Secrets Manager
3. **Use least privilege** - Only grant necessary API permissions
4. **Monitor usage** - Check Azure AD sign-in logs for unusual activity
5. **Test thoroughly** - Use `testGraphConnection()` after any configuration changes

## Support

For issues with:
- **Wix Secrets Manager**: Contact Wix support or check Wix documentation
- **Microsoft Graph API**: Check Microsoft Graph documentation or Azure AD logs
- **Application code**: Review error logs and verify configuration

## References

- [Wix Secrets Manager Documentation](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/secrets-manager)
- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [Azure AD Application Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
