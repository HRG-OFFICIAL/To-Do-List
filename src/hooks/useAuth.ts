import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { User, LoginRequest, RegisterRequest } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      console.log('🔍 Checking authentication...');
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.log('❌ No token found, user not authenticated');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      console.log('✅ Token found, validating...');
      const user = await apiClient.getCurrentUser();
      console.log('✅ User authenticated:', user?.email);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('auth_token');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const loginResult = await apiClient.login(credentials);
      const { user } = loginResult;
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { user, token } = await apiClient.register(userData);
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (authState.isLoading) {
        console.log('⏰ Auth check timeout, setting loading to false');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [checkAuth, authState.isLoading]);

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  };
}
