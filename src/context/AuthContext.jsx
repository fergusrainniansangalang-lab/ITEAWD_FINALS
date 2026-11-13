/**
 * AuthContext.jsx
 * Provides customer authentication state, user registration, and session management
 * using localStorage (No external database, zero hardcoded accounts).
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LS_USER_KEY, LS_ACCOUNTS_KEY } from '../config';

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

  /* Listen for storage changes across windows/tabs */
  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem(LS_USER_KEY);
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  /** Helper to load all dynamically registered accounts */
  const getRegisteredAccounts = () => {
    try {
      const stored = localStorage.getItem(LS_ACCOUNTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  /**
   * Register a new user account dynamically without any database.
   * Persists in localStorage (raijoukaku_accounts) and sets active session.
   */
  const register = (name, email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim() || cleanEmail.split('@')[0] || 'Customer';

    if (!cleanEmail || !password) {
      return { success: false, message: 'Email and password are required.' };
    }

    const accounts = getRegisteredAccounts();
    const existing = accounts.find((a) => a.email === cleanEmail);

    if (existing) {
      return { success: false, message: 'An account with this email is already registered. Please sign in.' };
    }

    const newAccount = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      registeredAt: new Date().toISOString(),
    };

    const updatedAccounts = [newAccount, ...accounts];
    localStorage.setItem(LS_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

    // Auto-login the newly registered user
    const sessionUser = { id: newAccount.id, name: newAccount.name, email: newAccount.email };
    setUser(sessionUser);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new Event('storage'));

    return { success: true, user: sessionUser };
  };

  /**
   * Sign in an existing user dynamically verifying credentials.
   * Strictly blocks login if the account has not been registered in localStorage.
   */
  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    const accounts = getRegisteredAccounts();
    const existing = accounts.find((a) => a.email === cleanEmail);

    // If account was never registered, refuse login
    if (!existing) {
      return {
        success: false,
        message: 'Account not found. You must register an account first before signing in.',
      };
    }

    // Verify password for registered account
    if (existing.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    const sessionUser = { id: existing.id, name: existing.name, email: existing.email };
    setUser(sessionUser);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new Event('storage'));
    return { success: true, user: sessionUser };
  };

  /**
   * Log out current user
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_USER_KEY);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
