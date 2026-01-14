import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, isAuthenticated, logout as logoutService, isAdmin } from '@/lib/auth-service';

export interface AuthUser {
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      setUserIsAdmin(isAdmin());
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
    setUserIsAdmin(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin: userIsAdmin,
    logout,
  };
}
