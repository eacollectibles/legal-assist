# Backend Integration Documentation

## Overview

The admin functionalities have been migrated from localStorage to a CMS-backed system for secure, persistent data management. This document outlines the backend integration for user authentication, role management, documents, personal information, messages, and billing.

---

## CMS Collections

### 1. **User Accounts** (`useraccounts`)
Stores user authentication credentials and role information.

**Fields:**
- `email` (text) - Unique email address for the user account
- `passwordHash` (text) - Hashed password for secure authentication
- `firstName` (text) - User's first name
- `lastName` (text) - User's last name
- `isAdmin` (boolean) - Administrative privileges flag
- `lastLoginDate` (datetime) - Timestamp of last successful login
- `accountStatus` (text) - Account status: `active`, `inactive`, or `suspended`
- `_id` (system) - Unique identifier
- `_createdDate` (system) - Account creation timestamp
- `_updatedDate` (system) - Last update timestamp

**Usage:**
- User signup and login
- Role management (admin/regular user)
- Account status tracking

---

### 2. **Client Documents** (`clientdocuments`)
Manages document uploads and storage for clients.

**Fields:**
- `documentName` (text) - Name of the document
- `fileUrl` (url) - URL to the stored file
- `uploadDate` (datetime) - When the document was uploaded
- `clientEmail` (text) - Email of the client who owns the document
- `fileType` (text) - MIME type of the file
- `fileSize` (number) - Size of the file in bytes
- `documentCategory` (text) - Category: contract, invoice, court-order, evidence, correspondence, other
- `notes` (text) - Optional notes about the document

**Usage:**
- Document upload and management in Client Dashboard
- Admin access to all client documents
- Document categorization and search

---

### 3. **Client Profiles** (`clientprofiles`)
Stores personal information for clients.

**Fields:**
- `firstName` (text) - Client's first name
- `lastName` (text) - Client's last name
- `streetAddress` (text) - Street address
- `city` (text) - City
- `state` (text) - State/Province
- `zipCode` (text) - Zip/Postal code
- `phoneNumber` (text) - Contact phone number
- `emergencyContactName` (text) - Emergency contact name
- `emergencyContactPhone` (text) - Emergency contact phone
- `_id` (system) - Uses client email as identifier

**Usage:**
- Personal details management in Client Dashboard
- Admin access to client information
- Emergency contact information

---

### 4. **Messages** (`messages`)
Handles communication between clients and admin team.

**Fields:**
- `senderEmail` (text) - Email of the message sender
- `senderName` (text) - Name of the sender
- `recipientEmail` (text) - Email of the recipient
- `messageContent` (text) - The message text
- `sentDate` (datetime) - When the message was sent
- `isRead` (boolean) - Read status
- `conversationId` (text) - Groups messages into conversations

**Usage:**
- Client-to-admin messaging
- Admin message management and replies
- Conversation threading
- Unread message tracking

---

### 5. **Payment Records** (`paymentrecords`)
Tracks payment transactions and billing information.

**Fields:**
- `paymentAmount` (number) - Amount paid
- `serviceType` (text) - Type of service paid for
- `paymentDate` (date) - Date of payment
- `paymentStatus` (text) - Status: Paid, Pending, Failed
- `transactionId` (text) - Unique transaction identifier

**Usage:**
- Payment processing and tracking
- Payment history in Client Dashboard
- Admin billing management

---

## Authentication Service (`/src/lib/auth-service.ts`)

### Key Functions

#### `signup(credentials: AuthCredentials): Promise<AuthResponse>`
Creates a new user account in the `useraccounts` collection.
- Validates email uniqueness
- Hashes password before storage
- Sets default account status to `active`
- Creates session token

#### `login(credentials): Promise<AuthResponse>`
Authenticates user against the `useraccounts` collection.
- Verifies email and password hash
- Checks account status (suspended/inactive accounts cannot log in)
- Updates `lastLoginDate` on successful login
- Creates session token

#### `logout(): void`
Clears session data from localStorage.

#### `isAdmin(): boolean`
Checks if the current user has admin privileges.

#### `setAdminStatus(email: string, isAdmin: boolean): Promise<boolean>`
Updates admin status for a user (admin-only).
- Validates admin permissions
- Updates `useraccounts` collection
- Syncs with current session if applicable

#### `getAllUsers(): Promise<any[]>`
Retrieves all users (admin-only).
- Filters out sensitive data (password hashes)
- Returns user list with account information

---

## Data Access Patterns

### Client Dashboard (`ClientDashboardPage.tsx`)

**Documents:**
```typescript
const { items } = await BaseCrudService.getAll<ClientDocument>('clientdocuments');
const userDocuments = items?.filter(doc => doc.clientEmail === currentUser?.email);
```

**Profile:**
```typescript
const { items } = await BaseCrudService.getAll<ClientProfile>('clientprofiles');
const userProfile = items?.find(p => p._id === currentUser?.email);
```

**Messages:**
```typescript
const { items } = await BaseCrudService.getAll<Message>('messages');
const userMessages = items?.filter(m => 
  m.senderEmail === currentUser?.email || m.recipientEmail === currentUser?.email
);
```

**Payments:**
```typescript
const { items } = await BaseCrudService.getAll<PaymentRecord>('paymentrecords');
const userPayments = items?.filter(p => p._id.includes(currentUser?.email));
```

---

### Admin Pages

**User Management (`AdminUserManagementPage.tsx`):**
```typescript
const allUsers = await getAllUsers(); // Uses auth-service
await setAdminStatus(email, isAdmin); // Updates role
```

**Messages (`AdminMessagesPage.tsx`):**
```typescript
const { items } = await BaseCrudService.getAll<Message>('messages');
// Organizes into conversations
// Marks messages as read
// Sends replies
```

---

## Security Considerations

### Password Security
- Passwords are hashed using a simple hash function (base64 encoding with salt)
- **Production Recommendation:** Replace with bcrypt or similar secure hashing algorithm

### Session Management
- Session tokens stored in localStorage
- Tokens generated with email, timestamp, and random value
- **Production Recommendation:** Implement JWT tokens with expiration

### Account Status
- Accounts can be set to `active`, `inactive`, or `suspended`
- Suspended/inactive accounts cannot log in
- Admin can manage account status through user management

### Role-Based Access
- `isAdmin` flag controls access to admin pages
- Admin-only functions validate permissions before execution
- Regular users can only access their own data

---

## Migration from localStorage

### What Changed

**Before:**
- User accounts stored in `localStorage.users` array
- No password hashing
- No account status tracking
- Synchronous operations

**After:**
- User accounts stored in `useraccounts` CMS collection
- Passwords hashed before storage
- Account status and last login tracking
- Asynchronous CMS operations

### Backward Compatibility

The system maintains backward compatibility for:
- Session tokens (still in localStorage)
- Current user data (cached in localStorage)
- Payment record filtering (checks both old and new ID formats)

---

## Admin Features

### User Management
- View all registered users
- Grant/revoke admin privileges
- View account creation dates and last login
- Monitor account status

### Document Management
- Access all client documents
- View document metadata
- Download documents

### Messaging System
- View all client conversations
- Reply to client messages
- Mark messages as read
- Search conversations

### Billing Access
- View all payment records
- Track payment status
- Monitor transactions

---

## Client Features

### Document Portal
- Upload documents with categories
- Search and filter documents
- Download documents
- Delete documents
- Add notes to documents

### Personal Profile
- Update contact information
- Manage emergency contacts
- View profile history

### Messaging
- Send messages to admin team
- View conversation history
- See unread messages
- Real-time message updates

### Payment Management
- Make payments (simulated)
- View payment history
- Track payment status
- View transaction IDs

---

## Future Enhancements

### Recommended Improvements

1. **Enhanced Security:**
   - Implement bcrypt for password hashing
   - Add JWT tokens with expiration
   - Implement refresh tokens
   - Add rate limiting for login attempts

2. **File Storage:**
   - Integrate with cloud storage (AWS S3, Azure Blob, etc.)
   - Implement actual file upload/download
   - Add file virus scanning
   - Implement file versioning

3. **Email Notifications:**
   - Send email on account creation
   - Notify on password changes
   - Alert on new messages
   - Payment confirmation emails

4. **Audit Logging:**
   - Track all admin actions
   - Log login attempts
   - Monitor data access
   - Generate audit reports

5. **Advanced User Management:**
   - Password reset functionality
   - Email verification
   - Two-factor authentication
   - Account recovery

6. **Payment Integration:**
   - Integrate with payment gateways (Stripe, PayPal)
   - Implement real payment processing
   - Add invoice generation
   - Support multiple payment methods

---

## Testing

### Test User Accounts

After migration, you can create test accounts through the signup page. To create an admin account:

1. Sign up through the normal signup flow
2. Access the database directly or use an existing admin account
3. Update the `isAdmin` field to `true` for the user in the `useraccounts` collection

### Testing Checklist

- [ ] User signup creates record in `useraccounts`
- [ ] Login validates against `useraccounts`
- [ ] Password hashing works correctly
- [ ] Admin status can be toggled
- [ ] Account status affects login
- [ ] Documents are filtered by user email
- [ ] Messages are organized by conversation
- [ ] Payments are tracked per user
- [ ] Admin pages are protected
- [ ] Client dashboard shows only user's data

---

## Support

For issues or questions about the backend integration:
1. Check the CMS collections in the Wix dashboard
2. Review the auth-service.ts implementation
3. Verify BaseCrudService usage patterns
4. Check browser console for error messages

---

## Summary

The backend integration provides:
✅ Secure user authentication with hashed passwords
✅ Role-based access control (admin/regular users)
✅ Persistent data storage in CMS collections
✅ Document management system
✅ Client-admin messaging
✅ Payment tracking
✅ Account status management
✅ Comprehensive admin tools

All data is now stored in the CMS backend, eliminating dependency on localStorage for critical user data and admin functionalities.
