import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { apiClient } from '../apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sync Firebase user with backend Neon database
  const syncFirebaseUser = async (firebaseUser) => {
    if (!firebaseUser) {
      setCurrentUser(null);
      setTokenBalance(0);
      localStorage.removeItem('redkross_academy_active_user');
      localStorage.removeItem('redkross_academy_auth_token');
      setIsLoading(false);
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();
      localStorage.setItem('redkross_academy_auth_token', token);
      localStorage.setItem('redkross_academy_active_user', firebaseUser.uid);

      const dbUser = await apiClient.syncUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cadet Operator',
        avatar: firebaseUser.photoURL || null
      });

      setCurrentUser(dbUser);
      setTokenBalance(dbUser.token_balance || 100);
    } catch (err) {
      console.error('Failed to sync user session:', err);
      // Fallback local student profile
      setCurrentUser({
        id: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || 'Cadet Operator',
        avatar: firebaseUser.photoURL,
        role: 'student',
        streak_days: 1
      });
      setTokenBalance(100);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if 1-click dev super admin session is active
    if (localStorage.getItem('redkross_academy_dev_admin') === 'true') {
      setCurrentUser({
        id: 'usr_super_admin_dev',
        email: 'admin@redkross.org.in',
        full_name: 'Lead Super Admin',
        role: 'super_admin',
        headline: 'Chief Defensive Director & Institutional Proctor',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
        streak_days: 42,
        timezone: 'Asia/Kolkata',
      });
      setTokenBalance(9999);
      setIsLoading(false);
      return;
    }

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await syncFirebaseUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // 1-Click Super Admin Dev Creator / Switcher
  const devLoginAsAdmin = () => {
    const adminUser = {
      id: 'usr_super_admin_dev',
      email: 'admin@redkross.org.in',
      full_name: 'Lead Super Admin',
      role: 'super_admin',
      headline: 'Chief Defensive Director & Institutional Proctor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      streak_days: 42,
      timezone: 'Asia/Kolkata',
    };
    localStorage.setItem('redkross_academy_dev_admin', 'true');
    localStorage.setItem('redkross_academy_active_user', adminUser.id);
    setCurrentUser(adminUser);
    setTokenBalance(9999);
    setIsLoading(false);
    return adminUser;
  };

  const loginWithGoogle = async () => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncFirebaseUser(result.user);
      return result.user;
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      setAuthError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncFirebaseUser(result.user);
      return result.user;
    } catch (error) {
      console.error('Email login failed:', error);
      setAuthError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const registerWithEmail = async (email, password, fullName) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(result.user, { displayName: fullName });
      }
      await syncFirebaseUser(result.user);
      return result.user;
    } catch (error) {
      console.error('Registration failed:', error);
      setAuthError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout warning:', e);
    } finally {
      localStorage.removeItem('redkross_academy_dev_admin');
      localStorage.removeItem('redkross_academy_active_user');
      localStorage.removeItem('redkross_academy_auth_token');
      setCurrentUser(null);
      setTokenBalance(0);
    }
  };

  const refreshBalance = async () => {
    if (currentUser) {
      try {
        const wallet = await apiClient.getWallet(currentUser.id);
        if (wallet && typeof wallet.balance === 'number') {
          setTokenBalance(wallet.balance);
        }
      } catch (e) {
        console.warn('Balance refresh failed:', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        tokenBalance,
        refreshBalance,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        devLoginAsAdmin,
        isLoading,
        authError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
