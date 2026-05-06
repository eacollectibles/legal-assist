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
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: isAdminStatus,
      clientId: user.clientId,
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

    // Persist (best-effort, ignore SSR / private mode failures)
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

    // Verify reset token
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const storedToken = resetTokens[email];

    if (!storedToken || storedToken.token !== token) {
      return {
        success: false,
        message: 'Invalid or expired reset token',
      };
    }

    if (new Date(storedToken.expiry) < new Date()) {
      delete resetTokens[email];
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
      return {
        success: false,
        message: 'Reset token has expired. Please request a new one.',
      };
    }

    // Find user and update password
    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const user = users?.find(u => u.email === email);

    if (!user) {
      return {
        success: false,
        message: 'User account not found',
      };
    }

    const newHashedPassword = await hashPassword(newPassword);
    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      passwordHash: newHashedPassword,
    });

    // Clear the reset token
    delete resetTokens[email];
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));

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
