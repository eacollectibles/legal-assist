/**
 * Authentication Service
 * Handles user signup, login, and session management using CMS backend
 * Uses SHA-256 hashing via Web Crypto API for password security
 */

import { BaseCrudService } from '@/integrations';

export interface AuthCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    /**
     * Primary key (`_id`) of the matching row in the `clientprofiles`
     * collection. This is the value the intake form / dashboard / file-
     * lookup code uses when it calls `BaseCrudService.getById('clientprofiles', _id)`.
     * It is NOT the human-readable `CL-XXXXXX` id.
     */
    _id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
    /**
     * Display-only client identifier (e.g. `CL-A1B2C3`). Shown in the UI
     * and on retainer documents. Do NOT use this as a CMS row key — for
     * that, use `_id` (above).
     */
    clientId?: string;
    // F-J: role + supervision so callers can route + redact right after login.
    userType?: string;
    supervisingParalegalId?: string;
    allowFinancialView?: boolean;
  };
}

interface UserAccount {
  _id: string;
  email?: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  lastLoginDate?: Date | string;
  accountStatus?: string;
  clientId?: string;
  // F-J Paralegal student support
  /** 'paralegal' | 'paralegal_student' | 'client' | 'admin' */
  userType?: string;
  /** Student rows only: the supervising paralegal's useraccount _id. */
  supervisingParalegalId?: string;
  /** Student rows only: paralegal-controlled toggle to show financial fields. */
  allowFinancialView?: boolean;
}

/**
 * Secure password hashing using SHA-256.
 *
 * Exported so other modules (e.g. AssignmentsTab when an admin creates a
 * client account on behalf of someone) can store properly hashed passwords
 * instead of plaintext.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = 'legalassist_2026_secure_salt';
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a random client ID number
 * Format: CL-XXXXXX (6 random digits)
 */
function generateClientId(): string {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `CL-${randomNumber}`;
}

/**
 * Sign up a new user
 */
export async function signup(credentials: AuthCredentials): Promise<AuthResponse> {
  try {
    const { items: existingUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    if (existingUsers?.some(u => u.email === credentials.email)) {
      return {
        success: false,
        message: 'An account with this email already exists',
      };
    }

    // IMPORTANT: useraccounts._id and clientprofiles._id MUST match so that
    // login flows and post-assignment cascade-delete operations can find both
    // records by the same key. We use a single shared id for both records and
    // also store the human-readable client id (CL-XXXXXX) in the `clientId`
    // field on both for display purposes.
    const sharedId = crypto.randomUUID();
    const humanReadableClientId = generateClientId();
    const hashedPassword = await hashPassword(credentials.password);

    const userData: UserAccount = {
      _id: sharedId,
      email: credentials.email,
      passwordHash: hashedPassword,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      isAdmin: false,
      accountStatus: 'active',
      lastLoginDate: new Date().toISOString(),
      clientId: humanReadableClientId,
    };

    await BaseCrudService.create('useraccounts', userData);

    // Create matching clientprofiles record using the SAME _id so the two
    // collections stay linked.
    await BaseCrudService.create('clientprofiles', {
      _id: sharedId,
      clientId: humanReadableClientId,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      intakeCompleted: false,
    });

    const { items: verifyUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const userExists = verifyUsers?.some(u => u.email === credentials.email);
    
    if (!userExists) {
      return {
        success: false,
        message: 'Account creation failed. Please try again.',
      };
    }

    const token = generateToken(credentials.email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      isAdmin: false,
      clientId: humanReadableClientId,
    }));

    return {
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        _id: sharedId,
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        isAdmin: false,
        clientId: humanReadableClientId,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: 'Failed to create account. Please try again.',
    };
  }
}

/**
 * Log in an existing user
 */
export async function login(credentials: Omit<AuthCredentials, 'firstName' | 'lastName'>): Promise<AuthResponse> {
  try {
    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const hashedPassword = await hashPassword(credentials.password);
    const user = users?.find(u => u.email === credentials.email && u.passwordHash === hashedPassword);

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    if (user.accountStatus === 'suspended') {
      return {
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      };
    }

    if (user.accountStatus === 'inactive') {
      return {
        success: false,
        message: 'Your account is inactive. Please contact support.',
      };
    }

    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      lastLoginDate: new Date().toISOString(),
    });

    const { items: updatedUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const updatedUser = updatedUsers?.find(u => u.email === credentials.email);
    const isAdminStatus = updatedUser?.isAdmin || false;

    const token = generateToken(credentials.email);
    // F-J: include userType + student-supervision fields so the dashboard and
    // permission helpers can route + redact appropriately.
    const userType = updatedUser?.userType || (isAdminStatus ? 'paralegal' : 'client');
    const supervisingParalegalId = updatedUser?.supervisingParalegalId || '';
    const allowFinancialView = updatedUser?.allowFinancialView === true;

    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: isAdminStatus,
      clientId: user.clientId,
      userType,
      supervisingParalegalId,
      allowFinancialView,
    }));

    return {
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        _id: user._id,
        email: user.email || '',
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: isAdminStatus,
        clientId: user.clientId,
        // F-J: surface the role + supervision fields so getPostLoginRoute()
        // sees them when called immediately after login (callers pass
        // `result.user`, which short-circuits the localStorage fallback).
        userType,
        supervisingParalegalId,
        allowFinancialView,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Failed to log in. Please try again.',
    };
  }
}

/**
 * Log out the current user
 */
export function logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
}

/**
 * Get the current authenticated user
 */
export function getCurrentUser(): any {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

/**
 * F-J: alias of logout() for naming consistency with new components.
 */
export function signOut(): void {
  logout();
}

/**
 * F-J: where should a freshly-logged-in user be redirected?
 * Centralizes routing so login + signup pages all agree.
 *
 *   paralegal_student → /student-dashboard
 *   admin/paralegal   → /paralegal-dashboard
 *   client (default)  → /client-dashboard
 */
export function getPostLoginRoute(user?: any): string {
  const u = user || getCurrentUser();
  if (!u) return '/login';
  if (u.userType === 'paralegal_student') return '/student-dashboard';
  if (u.isAdmin || u.userType === 'paralegal' || u.userType === 'admin') return '/paralegal-dashboard';
  return '/client-dashboard';
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}

/**
 * Get the auth token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

/**
 * Generate a simple token
 */
function generateToken(email: string): string {
  return btoa(`${email}:${Date.now()}:${Math.random()}`);
}

/**
 * Check if the current user is an admin
 */
export function isAdmin(): boolean {
  try {
    const user = getCurrentUser();
    return user?.isAdmin === true;
  } catch {
    return false;
  }
}

/**
 * Set admin status for a user
 * RESTRICTED: Only jeanfrancois@legalassist.london can modify paralegal privileges
 */
export async function setAdminStatus(email: string, isAdminStatus: boolean): Promise<boolean> {
  try {
    if (!isAdmin()) {
      return false;
    }

    const currentUser = getCurrentUser();
    if (currentUser?.email !== 'jeanfrancois@legalassist.london') {
      return false;
    }

    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const user = users?.find(u => u.email === email);

    if (!user) {
      return false;
    }

    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      isAdmin: isAdminStatus,
    });

    if (currentUser?.email === email) {
      currentUser.isAdmin = isAdminStatus;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    return true;
  } catch (error) {
    console.error('Failed to set admin status:', error);
    return false;
  }
}

/**
 * Get all users (admin-only)
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    if (!isAdmin()) {
      return [];
    }

    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    
    return (users || []).map(u => ({
      _id: u._id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      isAdmin: u.isAdmin || false,
      createdAt: u._createdDate,
      accountStatus: u.accountStatus,
      lastLoginDate: u.lastLoginDate,
      clientId: u.clientId,
    }));
  } catch (error) {
    console.error('Failed to get all users:', error);
    return [];
  }
}

/**
 * Change password for the current user
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser?.email) {
      return {
        success: false,
        message: 'You must be logged in to change your password',
      };
    }

    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const user = users?.find(u => u.email === currentUser.email);

    if (!user) {
      return {
        success: false,
        message: 'User account not found',
      };
    }

    const currentHashedPassword = await hashPassword(currentPassword);
    if (user.passwordHash !== currentHashedPassword) {
      return {
        success: false,
        message: 'Current password is incorrect',
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: 'New password must be at least 6 characters long',
      };
    }

    const newHashedPassword = await hashPassword(newPassword);
    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      passwordHash: newHashedPassword,
    });

    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error) {
    console.error('Change password error:', error);
    return {
      success: false,
      message: 'Failed to change password. Please try again.',
    };
  }
}

/**
 * Send a client invitation email — used when a paralegal opens a new
 * client file from the admin side and wants the client to set their
 * own portal password rather than having the paralegal invent one.
 *
 * Idempotent. If a useraccounts row already exists for this email, we
 * reuse it; otherwise we create one with no password set. Either way,
 * we generate a fresh reset token (good for 24 hours by default) and
 * email the client an invitation with a link to /reset-password.
 *
 * Returns success: true and a user-friendly message regardless of
 * whether the email actually delivered, so the admin UI can confirm
 * the invitation was queued.
 */
export async function sendClientInvitation(params: {
  email: string;
  firstName?: string;
  lastName?: string;
  /** How long the invitation link should remain valid. Default 72 hours. */
  validHours?: number;
  /** Display name of the inviting paralegal — shown in the email body. */
  inviterName?: string;
}): Promise<AuthResponse & { resetLink?: string }> {
  const normalizedEmail = (params.email || '').trim().toLowerCase();
  if (!normalizedEmail) {
    return { success: false, message: 'A client email is required to send the invitation.' };
  }
  try {
    const { items: users } = await BaseCrudService.getAll<UserAccount>(
      'useraccounts',
      undefined,
      { limit: 1000 } as any
    );
    let user = users?.find(
      (u) => (u.email || '').trim().toLowerCase() === normalizedEmail
    );

    // Create the useraccount row if none exists. Leave passwordHash
    // blank — the client sets their password via the reset link.
    if (!user) {
      const newId = crypto.randomUUID();
      const newUser: any = {
        _id: newId,
        clientId: newId,
        email: normalizedEmail,
        firstName: params.firstName || '',
        lastName: params.lastName || '',
        isAdmin: false,
        invitedAt: new Date().toISOString(),
      };
      await BaseCrudService.create('useraccounts', newUser);
      user = newUser as UserAccount;
    }

    const resetToken = generateResetToken();
    const validHours = params.validHours || 72;
    const resetTokenExpiry = new Date(
      Date.now() + validHours * 60 * 60 * 1000
    ).toISOString();

    try {
      await BaseCrudService.update<UserAccount>('useraccounts', {
        _id: user._id,
        resetToken,
        resetTokenExpiry,
      } as any);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Could not write reset token to user row:', err);
    }

    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'https://www.legalassist.london';
    const resetLink =
      `${origin}/reset-password` +
      `?token=${encodeURIComponent(resetToken)}` +
      `&email=${encodeURIComponent(normalizedEmail)}`;

    let emailSent = false;
    try {
      const { sendEmail } = await import('./email-service');
      const greetingName = params.firstName ? ` ${params.firstName}` : '';
      const inviter = params.inviterName || 'your paralegal at Legal Assist';
      await sendEmail({
        to: normalizedEmail,
        subject: 'Welcome to Legal Assist — set your client portal password',
        body:
          `Hello${greetingName},\n\n` +
          `${inviter} has opened a client file for you at Legal Assist Paralegal Services and set up access ` +
          `to your secure client portal. Use the link below to choose your password and get started:\n\n` +
          `${resetLink}\n\n` +
          `This link expires in ${validHours} hours. Your username for logging in is your email address ` +
          `(${normalizedEmail}).\n\n` +
          `Through your portal you can review and sign documents, upload files we request, see invoices, ` +
          `pay online, and message us securely about your matter.\n\n` +
          `If you did not expect this email, please ignore it — no account changes will be made.\n\n` +
          `— Legal Assist Paralegal Services`,
      });
      emailSent = true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Client invitation email failed:', err);
    }

    return {
      success: true,
      message: emailSent
        ? `Invitation email sent to ${normalizedEmail}. Link expires in ${validHours} hours.`
        : `Invitation link generated. Email delivery may have failed — share this link manually if needed.`,
      resetLink,
    };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('sendClientInvitation failed:', error);
    return {
      success: false,
      message:
        error?.message
          ? `Could not send invitation: ${error.message}`
          : 'Could not send invitation. Please try again.',
    };
  }
}

/**
 * Request password reset for a user.
 *
 * Generates a reset token, stores it for 1 hour, and emails the reset link
 * to the account holder via EmailJS. Returns the same generic message
 * regardless of whether the email exists, so we don't leak account existence.
 */
export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const genericResponse: AuthResponse = {
    success: true,
    message: 'If an account exists with this email, you will receive a password reset link.',
  };

  try {
    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const user = users?.find(u => (u.email || '').toLowerCase() === normalizedEmail);

    if (!user) {
      // Generic response — don't reveal account existence
      return genericResponse;
    }

    // --- Generate token ---
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    // Persist on the user's CMS row (server-side) so the token is
    // accessible from any device. The previous implementation stored
    // tokens in localStorage on the requesting device only — meaning
    // a user who requested reset on their phone but clicked the email
    // link on their laptop hit "Invalid or expired" because the laptop
    // had no record. Server-side storage fixes that.
    //
    // We also keep a localStorage mirror as a best-effort fallback for
    // environments where the CMS write fails (e.g. transient network).
    try {
      await BaseCrudService.update<UserAccount>('useraccounts', {
        _id: user._id,
        resetToken,
        resetTokenExpiry,
      } as any);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Could not persist reset token on user row:', err);
    }
    try {
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
      resetTokens[normalizedEmail] = { token: resetToken, expiry: resetTokenExpiry };
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    } catch {
      /* SSR / private mode — ignore */
    }

    // --- Build the reset link ---
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'https://www.legalassist.london';
    const resetLink =
      `${origin}/reset-password` +
      `?token=${encodeURIComponent(resetToken)}` +
      `&email=${encodeURIComponent(normalizedEmail)}`;

    // --- Send the email (best-effort, dynamic import so SSR builds don't break) ---
    let emailSent = false;
    try {
      const { sendEmail } = await import('./email-service');
      await sendEmail({
        to: normalizedEmail,
        subject: 'Reset your Legal Assist password',
        body:
          `Hello${user.firstName ? ' ' + user.firstName : ''},\n\n` +
          `We received a request to reset the password for your Legal Assist account.\n\n` +
          `Click the link below to choose a new password. The link will expire in 1 hour.\n\n` +
          `${resetLink}\n\n` +
          `If you didn't request this, you can safely ignore this email — your password will stay the same.\n\n` +
          `— Legal Assist Paralegal Services`,
      });
      emailSent = true;
    } catch (err) {
      console.error('Password reset email failed:', err);
    }

    if (!emailSent) {
      // Email failed but token is stored — return success with a softer message
      // so the user can contact us if they don't receive it.
      return {
        success: true,
        message:
          'A password reset link has been generated. If you do not receive an email shortly, please contact us.',
      };
    }

    return genericResponse;
  } catch (error) {
    console.error('Password reset request error:', error);
    return {
      success: false,
      message: 'Failed to process password reset request. Please try again.',
    };
  }
}

/**
 * Reset password using a reset token
 */
export async function resetPassword(email: string, token: string, newPassword: string): Promise<AuthResponse> {
  try {
    if (newPassword.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long',
      };
    }

    // Normalize email defensively — request side stores under lowercase
    // but the link in the email may have been hand-edited or the user
    // may type it with different casing on the reset page.
    const normalizedEmail = (email || '').trim().toLowerCase();

    // -----------------------------------------------------------------
    // PRIMARY PATH: look up the user by email and validate the token
    // against the value persisted on the user's CMS row. This is the
    // cross-device safe path — tokens are stored server-side in
    // useraccounts.resetToken / resetTokenExpiry by requestPasswordReset,
    // so the laptop opening the email link can verify a token that was
    // requested from a phone.
    // -----------------------------------------------------------------
    const { items: users } = await BaseCrudService.getAll<UserAccount>(
      'useraccounts',
      undefined,
      { limit: 1000 } as any
    );
    const user = users?.find(
      (u) => (u.email || '').trim().toLowerCase() === normalizedEmail
    );
    if (!user) {
      return {
        success: false,
        message: 'User account not found',
      };
    }

    // Server-side token + expiry pulled from the user row.
    const serverToken = (user as any).resetToken as string | undefined;
    const serverExpiry = (user as any).resetTokenExpiry as string | undefined;

    let tokenValid = false;
    if (serverToken && serverToken === token) {
      if (serverExpiry) {
        const expiry = new Date(serverExpiry);
        if (!isNaN(expiry.getTime()) && expiry >= new Date()) {
          tokenValid = true;
        }
      } else {
        // Expiry missing — accept conservatively (token still matches)
        tokenValid = true;
      }
    }

    // -----------------------------------------------------------------
    // FALLBACK: if the server-side token isn't present (e.g. the user
    // requested reset before this fix shipped), check the legacy
    // localStorage store. This keeps existing in-flight tokens working
    // for users on the same device that requested the reset.
    // -----------------------------------------------------------------
    if (!tokenValid) {
      try {
        const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
        const storedToken = resetTokens[normalizedEmail] || resetTokens[email];
        if (
          storedToken &&
          storedToken.token === token &&
          storedToken.expiry &&
          new Date(storedToken.expiry) >= new Date()
        ) {
          tokenValid = true;
        }
      } catch {
        /* localStorage unavailable — ignore */
      }
    }

    if (!tokenValid) {
      // Distinguish "wrong token" from "expired" only when we can tell.
      const isExpired =
        !!serverExpiry && new Date(serverExpiry) < new Date();
      return {
        success: false,
        message: isExpired
          ? 'Reset token has expired. Please request a new one.'
          : 'Invalid or expired reset token. Please request a new one.',
      };
    }

    const newHashedPassword = await hashPassword(newPassword);
    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      passwordHash: newHashedPassword,
      // Clear the token on the server row so it can't be used twice.
      resetToken: null,
      resetTokenExpiry: null,
    } as any);

    // Best-effort clear the legacy localStorage mirror.
    try {
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
      delete resetTokens[normalizedEmail];
      delete resetTokens[email];
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    } catch {
      /* ignore */
    }

    return {
      success: true,
      message: 'Password reset successfully. You can now log in with your new password.',
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: 'Failed to reset password. Please try again.',
    };
  }
}

/**
 * Generate a random reset token
 */
function generateResetToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
