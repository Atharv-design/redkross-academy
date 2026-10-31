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
import { socketClient } from '../socket/socketClient';
import { mockEngine } from '../db/mockEngine';

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

      // Deterministic Cadet identity generation and synchronization
      const cadetUser = mockEngine.getOrCreateCadetUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cadet Operator',
        avatar: firebaseUser.photoURL || null
      });

      setCurrentUser(cadetUser);
      setTokenBalance(cadetUser.token_balance || 150);
    } catch (err) {
      console.error('Failed to sync user session:', err);
      // Fallback local student profile with deterministic cadet ID
      const fallbackUser = mockEngine.getOrCreateCadetUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || 'Cadet Operator',
        avatar: firebaseUser.photoURL
      });
      setCurrentUser(fallbackUser);
      setTokenBalance(fallbackUser.token_balance || 150);
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

    // Check if dev cadet session is active
    const savedDevCadet = localStorage.getItem('redkross_academy_dev_cadet');
    if (savedDevCadet) {
      try {
        const parsed = JSON.parse(savedDevCadet);
        setCurrentUser(parsed);
        setTokenBalance(parsed.token_balance || 150);
        setIsLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('redkross_academy_dev_cadet');
      }
    }

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (localStorage.getItem('redkross_academy_dev_admin') === 'true' || localStorage.getItem('redkross_academy_dev_cadet')) {
        return;
      }
      await syncFirebaseUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // Live Event Bus & Socket.io subscription for instant cross-tab and cross-page sync
  useEffect(() => {
    if (!currentUser) return;

    const unsubSocketStatus = socketClient.on('user:status_changed', (payload) => {
      if (!payload?.userId || payload.userId === currentUser.id) {
        const isSuspended = payload.status === 'SUSPENDED';
        setCurrentUser((prev) =>
          prev ? { ...prev, status: payload.status, is_suspended: isSuspended } : prev
        );
      }
    });

    const unsubSocketToken = socketClient.on('token:adjusted', (payload) => {
      if (!payload?.userId || payload.userId === currentUser.id) {
        if (typeof payload.newBalance === 'number') {
          setTokenBalance(payload.newBalance);
        }
      }
    });

    const unsubSocketPurged = socketClient.on('user:purged', (payload) => {
      if (!payload?.userId || payload.userId === currentUser.id || payload.email?.toLowerCase() === currentUser.email?.toLowerCase()) {
        logout();
        alert('This cadet account has been permanently purged by RedKross Academy Administration.');
      }
    });

    const unsubscribe = mockEngine.subscribe((event) => {
      if (!currentUser) return;

      if (event.type === 'TOKEN_MUTATED') {
        if (!event.payload?.userId || event.payload.userId === currentUser.id) {
          if (typeof event.payload.newBalance === 'number') {
            setTokenBalance(event.payload.newBalance);
          }
        }
      }

      if (event.type === 'USER_STATUS_MUTATED') {
        if (!event.payload?.userId || event.payload.userId === currentUser.id) {
          setCurrentUser((prev) =>
            prev ? { ...prev, status: event.payload.status, is_suspended: event.payload.is_suspended } : prev
          );
        }
      }

      if (event.type === 'USER_PURGED') {
        if (!event.payload?.userId || event.payload.userId === currentUser.id || event.payload.email?.toLowerCase() === currentUser.email?.toLowerCase()) {
          logout();
          alert('This cadet account has been permanently purged by RedKross Academy Administration.');
        }
      }

      if (event.type === 'USER_UPDATED' || event.type === 'DB_MUTATED') {
        refreshBalance();
      }
    });

    return () => {
      if (typeof unsubSocketStatus === 'function') unsubSocketStatus();
      if (typeof unsubSocketToken === 'function') unsubSocketToken();
      if (typeof unsubSocketPurged === 'function') unsubSocketPurged();
      unsubscribe();
    };
  }, [currentUser]);

  // 1-Click Dev Cadet Creator / Switcher
  const devLoginAsCadet = (cadetData = {}) => {
    const email = cadetData.email || 'student@redkross.org.in';
    const uid = cadetData.uid || cadetData.id || 'usr_student_01';
    const studentUser = mockEngine.getOrCreateCadetUser({
      uid,
      email,
      full_name: cadetData.displayName || cadetData.full_name || 'Atharv Sharma',
      avatar: cadetData.photoURL || cadetData.avatar
    });

    localStorage.removeItem('redkross_academy_dev_admin');
    localStorage.setItem('redkross_academy_dev_cadet', JSON.stringify(studentUser));
    localStorage.setItem('redkross_academy_active_user', studentUser.id);
    localStorage.setItem('redkross_academy_auth_token', 'mock_dev_cadet_token_' + Date.now());
    setCurrentUser(studentUser);
    setTokenBalance(studentUser.token_balance || 150);
    setIsLoading(false);
    return studentUser;
  };

  // Login after selecting Google Account in Chooser Modal
  const loginWithSelectedGoogleAccount = async (account) => {
    setAuthError(null);
    setIsLoading(true);
    const userProfile = {
      uid: account.uid || 'usr_google_' + Math.random().toString(36).substring(2, 9),
      email: account.email,
      displayName: account.name || account.displayName || account.email?.split('@')[0],
      photoURL: account.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name || 'User')}&background=101923&color=65F58A&bold=true`,
      getIdToken: async () => 'google_oauth_token_' + Date.now()
    };
    
    const cadet = devLoginAsCadet({
      uid: userProfile.uid,
      email: userProfile.email,
      displayName: userProfile.displayName,
      photoURL: userProfile.photoURL
    });
    
    try {
      await apiClient.syncUser(userProfile);
    } catch (e) {
      console.warn('Backend sync note:', e.message);
    }
    
    setIsLoading(false);
    return cadet;
  };

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
    localStorage.removeItem('redkross_academy_dev_cadet');
    localStorage.setItem('redkross_academy_dev_admin', 'true');
    localStorage.setItem('redkross_academy_active_user', adminUser.id);
    localStorage.setItem('redkross_academy_auth_token', 'mock_dev_admin_token_' + Date.now());
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
      localStorage.removeItem('redkross_academy_dev_cadet');
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

  const isSuspended = Boolean(currentUser?.is_suspended || currentUser?.status === 'SUSPENDED');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSuspended,
        tokenBalance,
        refreshBalance,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        devLoginAsAdmin,
        devLoginAsCadet,
        loginWithSelectedGoogleAccount,
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
