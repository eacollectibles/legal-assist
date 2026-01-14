/**
 * Authentication Service
 * Handles user signup, login, and session management using CMS backend
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
}

/**
 * Simple hash function for passwords
 * In production, use bcrypt or similar secure hashing
 */
function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  return btoa(password + 'salt_key_2026');
}

/**
 * Sign up a new user
 * Creates a new account and automatically logs them in
 */
export async function signup(credentials: AuthCredentials): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const { items: existingUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    if (existingUsers?.some(u => u.email === credentials.email)) {
      return {
        success: false,
        message: 'An account with this email already exists',
      };
    }

    // Create new user account with proper data structure
    const userId = crypto.randomUUID();
    const userData: UserAccount = {
      _id: userId,
      email: credentials.email,
      passwordHash: hashPassword(credentials.password),
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      isAdmin: false,
      accountStatus: 'active',
      lastLoginDate: new Date().toISOString(),
    };

    console.log('Creating user account:', { email: credentials.email, userId });
    
    // Create the user account in the database
    const createdUser = await BaseCrudService.create('useraccounts', userData);
    
    console.log('User account created successfully:', createdUser);

    // Verify the user was created by fetching it back
    const { items: verifyUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const userExists = verifyUsers?.some(u => u.email === credentials.email);
    
    if (!userExists) {
      console.error('User creation verification failed - user not found in database');
      return {
        success: false,
        message: 'Account creation failed. Please try again.',
      };
    }

    console.log('User account verified in database');

    // Create session token
    const token = generateToken(credentials.email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      isAdmin: false,
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
    const user = users?.find(u => u.email === credentials.email && u.passwordHash === hashPassword(credentials.password));

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Check account status
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

    // Update last login date
    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      lastLoginDate: new Date().toISOString(),
    });

    // Fetch the user again to ensure we have the latest data (including admin status)
    const { items: updatedUsers } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const updatedUser = updatedUsers?.find(u => u.email === credentials.email);
    const isAdminStatus = updatedUser?.isAdmin || false;

    // Create session token
    const token = generateToken(credentials.email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: isAdminStatus,
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
 * Generate a simple token (in production, this would be done on the backend)
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
 * Set admin status for a user (admin-only function)
 */
export async function setAdminStatus(email: string, isAdminStatus: boolean): Promise<boolean> {
  try {
    // Only admins can set admin status
    if (!isAdmin()) {
      console.error('Unauthorized: Only admins can set admin status');
      return false;
    }

    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    const user = users?.find(u => u.email === email);

    if (!user) {
      console.error('User not found');
      return false;
    }

    await BaseCrudService.update('useraccounts', {
      _id: user._id,
      isAdmin: isAdminStatus,
    });

    // Update current user if it's the same user
    const currentUser = getCurrentUser();
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
 * Get all users (admin-only function)
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    if (!isAdmin()) {
      console.error('Unauthorized: Only admins can view all users');
      return [];
    }

    const { items: users } = await BaseCrudService.getAll<UserAccount>('useraccounts');
    
    // Don't return password hashes
    return (users || []).map(u => ({
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      isAdmin: u.isAdmin || false,
      createdAt: u._createdDate,
      accountStatus: u.accountStatus,
      lastLoginDate: u.lastLoginDate,
    }));
  } catch (error) {
    console.error('Failed to get all users:', error);
    return [];
  }
}
