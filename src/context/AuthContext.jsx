/**
 * AuthContext.jsx
 * Provides basic authentication state (demo/mock – no real backend).
 */
import React, { createContext, useContext, useState } from 'react';
import { LS_USER_KEY } from '../config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    /* Demo login — accept any non-empty credentials */
    const mockUser = { email, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
