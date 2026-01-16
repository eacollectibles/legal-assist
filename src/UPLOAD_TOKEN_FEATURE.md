# Secure Upload Token Feature

## Overview
This feature implements a secure, token-based file upload system that allows recipients to upload files directly to a client's portal account without requiring authentication. The system is designed with enterprise-grade security and comprehensive audit logging.

## Architecture

### Database Collection: `uploadtokens`
A new CMS collection stores all upload token data with the following fields:

- **token** (TEXT): Cryptographically secure 64-character hex string
- **clientId** (TEXT): Reference to the client
- **clientName** (TEXT): Display name for the client
- **matterId** (TEXT, optional): Reference to specific matter/case
- **matterReference** (TEXT, optional): Human-readable matter reference
- **documentId** (TEXT, optional): Reference to specific document
- **createdByParalegalId** (TEXT): ID of paralegal who created the link
- **createdByParalegalName** (TEXT): Name of paralegal for display
- **allowedPurpose** (TEXT): Purpose description (e.g., 'UPLOAD_TO_CLIENT_PORTAL')
- **expiryDate** (DATETIME): Token expiration timestamp
- **isActive** (BOOLEAN): Whether token is currently active
- **maxFileSize** (NUMBER): Maximum file size in bytes (default: 10MB)
- **allowedFileTypes** (TEXT): Comma-separated file extensions
- **usageCount** (NUMBER): Number of times token has been used
- **maxUsageCount** (NUMBER): Maximum uses allowed (0 = unlimited)
- **createdDate** (DATETIME): Token creation timestamp
- **lastUsedDate** (DATETIME, optional): Last usage timestamp
- **revokedDate** (DATETIME, optional): Revocation timestamp
- **revokedBy** (TEXT, optional): Who revoked the token
- **notes** (TEXT, optional): Internal notes

## Security Features

### 1. Token Generation
- Uses `crypto.getRandomValues()` for cryptographically secure random tokens
- 32-byte (256-bit) tokens encoded as 64-character hex strings
- Collision probability: ~1 in 2^256

### 2. Access Control
- **Single-use or time-limited**: Configurable expiry and usage limits
- **Upload-only scope**: Tokens only grant upload permission, no read/delete
- **Client-specific**: Each token is tied to a specific client account
- **Matter-specific** (optional): Can be scoped to specific cases

### 3. File Validation
- **File type enforcement**: Only allowed extensions can be uploaded
- **File size limits**: Configurable maximum file size per token
- **Client-side validation**: Immediate feedback before upload
- **Server-side validation**: Double-check on upload endpoint

### 4. Token Lifecycle Management
- **Expiry enforcement**: Tokens automatically invalid after expiry date
- **Usage tracking**: Counts each successful upload
- **Usage limits**: Optional maximum number of uses
- **Manual revocation**: Paralegals can revoke tokens at any time
- **Toggle activation**: Temporarily disable without revoking

### 5. Audit Logging
All token operations are logged:
- Token creation (who, when, for whom)
- Token usage (each upload attempt)
- Token revocation (who revoked, when)
- Failed validation attempts

### 6. Rate Limiting (Recommended Implementation)
While not implemented in the current frontend, the backend should include:
- Per-IP rate limiting (e.g., 10 uploads per hour)
- Per-token rate limiting (e.g., 5 uploads per minute)
- Global rate limiting for the upload endpoint

### 7. Virus Scanning (Recommended Implementation)
Uploaded files should be scanned before storage:
- Integration with antivirus service (e.g., ClamAV, VirusTotal)
- Quarantine suspicious files
- Notify paralegals of threats

## Components

### 1. `/src/lib/upload-token-service.ts`
Core service for token management:

**Functions:**
- `generateSecureToken()`: Creates cryptographically secure tokens
- `createUploadToken(params)`: Creates new upload token with validation
- `validateUploadToken(token)`: Validates token against all security rules
- `incrementTokenUsage(tokenId)`: Tracks token usage
- `revokeUploadToken(tokenId, revokedBy)`: Revokes a token
- `toggleTokenStatus(tokenId, isActive)`: Enables/disables token
- `updateTokenExpiry(tokenId, expiryHours)`: Extends token expiry
- `getClientTokens(clientId)`: Retrieves all tokens for a client
- `getParalegalTokens(paralegalId)`: Retrieves all tokens created by paralegal
- `generateUploadLink(token)`: Creates full URL for upload page
- `validateFile(file, token)`: Validates file against token restrictions

### 2. `/src/components/pages/PublicUploadPage.tsx`
Public-facing upload page (route: `/upload/:token`):

**Features:**
- Token validation on page load
- Clear error messages for invalid/expired tokens
- File picker with drag-and-drop support
- Real-time file validation feedback
- Upload progress indication
- Success confirmation
- Client and matter information display
- Security information footer

**User Flow:**
1. User clicks upload link from email
2. Page validates token
3. If valid, shows upload form with restrictions
4. User selects file
5. File is validated against token rules
6. User confirms upload
7. File is uploaded and stored
8. Token usage is incremented
9. Success message displayed

### 3. `/src/components/pages/UploadTokenManagementPage.tsx`
Paralegal dashboard for managing upload tokens (route: `/upload-token-management`):

**Features:**
- Create new upload tokens with full configuration
- View all tokens created by current paralegal
- Filter and search tokens
- View token details and usage statistics
- Copy upload links to clipboard
- Toggle token active status
- Revoke tokens
- Update token expiry
- View upload history per token

**Token Creation Form:**
- Client selection (required)
- Matter ID and reference (optional)
- Document ID (optional)
- Purpose selection
- Expiry duration (24h, 48h, 72h, 1 week, 2 weeks)
- Maximum uses (unlimited, 1, 3, 5, 10)
- Allowed file types
- Maximum file size
- Internal notes

### 4. `/src/components/UploadLinkGenerator.tsx`
Reusable component for generating upload links:

**Props:**
- `clientId`: Client identifier
- `clientName`: Client display name
- `matterId`: Optional matter identifier
- `matterReference`: Optional matter reference
- `documentId`: Optional document identifier
- `paralegalId`: Paralegal identifier
- `paralegalName`: Paralegal display name
- `onLinkGenerated`: Callback with link and expiry

**Usage Example:**
```tsx
<UploadLinkGenerator
  clientId="client-123"
  clientName="John Smith"
  matterId="case-456"
  matterReference="Smith v. Jones"
  paralegalId="paralegal-789"
  paralegalName="Jane Doe"
  onLinkGenerated={(link, expiry) => {
    console.log('Link:', link);
    console.log('Expires:', expiry);
  }}
/>
```

## Integration Points

### 1. Document Workflow Page
The `UploadLinkGenerator` component has been integrated into the Document Workflow page. When a document is in "sent" status, paralegals can generate an upload link for clients to return signed or supplementary documents.

### 2. Email Templates
Email templates should include these variables:
- `{{UPLOAD_LINK}}`: The full upload URL
- `{{UPLOAD_LINK_EXPIRY}}`: Human-readable expiry date/time
- `{{CLIENT_NAME}}`: Client name
- `{{MATTER_REFERENCE}}`: Matter reference (if applicable)
- `{{PARALEGAL_NAME}}`: Name of paralegal who sent the link

**Example Email Template:**
```
Dear {{CLIENT_NAME}},

Please use the secure link below to upload your documents for {{MATTER_REFERENCE}}:

{{UPLOAD_LINK}}

This link will expire on {{UPLOAD_LINK_EXPIRY}}.

If you have any questions, please contact {{PARALEGAL_NAME}}.

Best regards,
Legal Services Team
```

### 3. Client Documents Collection
Uploaded files are automatically stored in the `clientdocuments` collection with:
- Document name from uploaded file
- File URL (placeholder - needs actual file storage implementation)
- Upload date
- Client email
- File type and size
- Document category (from matter reference or "Client Upload")
- Notes indicating upload via secure link

## Routes

### Public Routes
- `/upload/:token` - Public upload page (no authentication required)

### Protected Routes
- `/upload-token-management` - Token management dashboard (paralegal access)

## Usage Workflow

### Creating an Upload Link

1. **From Document Workflow Page:**
   - Navigate to Document Workflow
   - Find document in "sent" status
   - Click "Generate Upload Link" button
   - Configure link settings
   - Copy link to clipboard
   - Include in email to client

2. **From Token Management Page:**
   - Navigate to Upload Token Management
   - Click "Create Upload Link"
   - Select client from dropdown
   - Optionally enter matter details
   - Configure security settings
   - Click "Generate Upload Link"
   - Copy link and send to client

### Client Upload Process

1. Client receives email with upload link
2. Client clicks link
3. System validates token
4. If valid, upload form is displayed
5. Client selects file
6. System validates file type and size
7. Client clicks "Upload File"
8. File is uploaded and stored
9. Token usage is incremented
10. Success message displayed
11. Paralegal is notified (future enhancement)

### Managing Tokens

1. **View All Tokens:**
   - Navigate to Upload Token Management
   - See table of all tokens with status

2. **Toggle Token Status:**
   - Use switch in actions column
   - Temporarily disable without revoking

3. **Revoke Token:**
   - Click trash icon in actions column
   - Confirm revocation
   - Token permanently disabled

4. **View Token Details:**
   - Click eye icon in actions column
   - See full token information
   - Copy upload link
   - View usage statistics

## Security Best Practices

### For Paralegals

1. **Set Appropriate Expiry:**
   - Use shortest reasonable expiry time
   - Default 72 hours is suitable for most cases
   - Extend only when necessary

2. **Limit Usage Count:**
   - Use single-use tokens when possible
   - Set maximum uses based on expected uploads

3. **Restrict File Types:**
   - Only allow necessary file types
   - Default: pdf, doc, docx, jpg, jpeg, png
   - Adjust based on specific needs

4. **Monitor Token Usage:**
   - Regularly review token management dashboard
   - Revoke unused tokens
   - Check for suspicious activity

5. **Revoke After Use:**
   - Manually revoke tokens after client uploads
   - Don't rely solely on expiry

### For System Administrators

1. **Implement Backend Validation:**
   - Never trust client-side validation alone
   - Validate all uploads server-side
   - Enforce file size and type restrictions

2. **Add Virus Scanning:**
   - Scan all uploaded files
   - Quarantine suspicious files
   - Alert paralegals of threats

3. **Implement Rate Limiting:**
   - Prevent abuse through rate limiting
   - Monitor for unusual patterns
   - Block suspicious IPs

4. **Secure File Storage:**
   - Store files in secure location
   - Use encryption at rest
   - Implement access controls

5. **Audit Logging:**
   - Log all token operations
   - Log all upload attempts
   - Regular security audits

## Future Enhancements

### High Priority
1. **Actual File Upload Implementation:**
   - Currently uses placeholder URLs
   - Needs integration with file storage service (Wix Media, AWS S3, etc.)

2. **Email Notifications:**
   - Notify paralegal when file is uploaded
   - Send confirmation to client
   - Reminder emails before expiry

3. **Virus Scanning:**
   - Integrate antivirus service
   - Quarantine suspicious files
   - Alert system

### Medium Priority
4. **Rate Limiting:**
   - Per-IP rate limiting
   - Per-token rate limiting
   - Global endpoint rate limiting

5. **Advanced Analytics:**
   - Token usage statistics
   - Upload success rates
   - Average time to upload

6. **Bulk Token Generation:**
   - Generate multiple tokens at once
   - CSV import for client list
   - Batch email sending

### Low Priority
7. **Custom Branding:**
   - White-label upload page
   - Custom logos and colors
   - Firm-specific messaging

8. **Multi-language Support:**
   - Translate upload page
   - Support multiple languages
   - Automatic language detection

9. **Mobile App:**
   - Native mobile upload app
   - Camera integration
   - Push notifications

## Testing Checklist

### Token Generation
- [ ] Token is cryptographically secure
- [ ] Token is unique (no collisions)
- [ ] All required fields are populated
- [ ] Default values are applied correctly
- [ ] Token is stored in database

### Token Validation
- [ ] Valid token passes validation
- [ ] Expired token fails validation
- [ ] Revoked token fails validation
- [ ] Inactive token fails validation
- [ ] Usage limit enforced
- [ ] Clear error messages

### File Upload
- [ ] Valid file uploads successfully
- [ ] Invalid file type rejected
- [ ] Oversized file rejected
- [ ] File stored correctly
- [ ] Token usage incremented
- [ ] Client document created

### Token Management
- [ ] Create token works
- [ ] View tokens works
- [ ] Toggle status works
- [ ] Revoke token works
- [ ] Copy link works
- [ ] View details works

### Security
- [ ] Token cannot be guessed
- [ ] Expired tokens don't work
- [ ] Revoked tokens don't work
- [ ] File validation works
- [ ] Usage limits enforced
- [ ] Audit logs created

## Support and Maintenance

### Common Issues

**Issue: Token expired**
- Solution: Generate new token with longer expiry

**Issue: File type not allowed**
- Solution: Update token's allowed file types or ask client to convert file

**Issue: File too large**
- Solution: Update token's max file size or ask client to compress file

**Issue: Token not working**
- Solution: Check if token is active, not expired, and not revoked

### Monitoring

Monitor these metrics:
- Token creation rate
- Token usage rate
- Failed validation attempts
- Average time to first use
- Upload success rate

### Maintenance Tasks

**Daily:**
- Review failed upload attempts
- Check for suspicious activity

**Weekly:**
- Clean up expired tokens
- Review usage statistics
- Update file type restrictions if needed

**Monthly:**
- Audit token security
- Review and update documentation
- Analyze usage patterns

## Conclusion

This secure upload token feature provides a robust, enterprise-grade solution for allowing clients to upload files without authentication. The implementation follows security best practices and provides comprehensive management tools for paralegals.

The system is designed to be extensible, with clear integration points for future enhancements such as virus scanning, rate limiting, and advanced analytics.
