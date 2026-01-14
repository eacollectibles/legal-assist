/**
 * Authentication Service
 * Handles user signup, login, and session management
 */

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
  };
}

/**
 * Sign up a new user
 * Creates a new account and automatically logs them in
 */
export async function signup(credentials: AuthCredentials): Promise<AuthResponse> {
  try {
    // Store user data in localStorage (in production, this would be a backend call)
    const userData = {
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      password: credentials.password, // In production, never store plain passwords
      createdAt: new Date().toISOString(),
    };

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((u: any) => u.email === credentials.email)) {
      return {
        success: false,
        message: 'An account with this email already exists',
      };
    }

    // Add new user
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Create session token
    const token = generateToken(credentials.email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
    }));

    return {
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      },
    };
  } catch (error) {
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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Create session token
    const token = generateToken(credentials.email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

    return {
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (error) {
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
