import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import authService from '../services/authService';
import Loader from '../components/common/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser && authService.isAuthenticated()) {
        setUser(currentUser);
      }
      setIsAuthLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(authService.getCurrentUser());
    }
    return result;
  }, []);

  const register = useCallback(async (userData) => {
    return await authService.register(userData);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const authValue = useMemo(() => ({
    user,
    isAuthLoading,
    login,
    register,
    logout
  }), [user, isAuthLoading, login, register, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {isAuthLoading ? <Loader fullPage /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
