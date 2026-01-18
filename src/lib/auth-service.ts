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
    email: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
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
 * Secure password hashing using SHA-256
 */
async function hashPassword(password: string): Promise<string> {
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

    const userId = crypto.randomUUID();
    const clientId = generateClientId();
    const hashedPassword = await hashPassword(credentials.password);
    
    const userData: UserAccount = {
      _id: userId,
      email: credentials.email,
      passwordHash: hashedPassword,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      isAdmin: false,
      accountStatus: 'active',
      lastLoginDate: new Date().toISOString(),
      clientId: clientId,
    };

    await BaseCrudService.create('useraccounts', userData);

    // Create matching clientprofiles record
    await BaseCrudService.create('clientprofiles', {
      _id: clientId,
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
      clientId: clientId,
    }));

    return {
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        isAdmin: false,
        clientId: clientId,
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
