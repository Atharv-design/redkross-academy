import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
      localStorage.removeItem('redkross_academy_auth_token');
      localStorage.setItem('redkross_academy_active_user', firebaseUser.uid);

      const cadetUser = mockEngine.getOrCreateCadetUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cadet Operator',
        avatar: firebaseUser.photoURL || null
      });

      setCurrentUser(cadetUser);
      setTokenBalance(cadetUser.token_balance || 150);

      apiClient.syncUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cadet Operator',
        avatar: firebaseUser.photoURL || null,
        cadet_id: cadetUser.cadet_id
      }).then((serverUser) => {
        if (serverUser) {
          setCurrentUser((prev) => ({
            ...prev,
            ...serverUser,
            cadet_id: serverUser.cadet_id || cadetUser.cadet_id
          }));
          if (typeof serverUser.token_balance === 'number') {
            setTokenBalance(serverUser.token_balance);
          }
        }
      }).catch((e) => console.warn('Neon DB user sync note:', e.message));
    } catch (err) {
      console.error('Failed to sync user session:', err);
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
    try {
      localStorage.removeItem('redkross_academy_dev_admin');
      localStorage.removeItem('redkross_academy_dev_cadet');
      localStorage.removeItem('redkross_academy_auth_token');
    } catch {}

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await syncFirebaseUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const unsubSocketStatus = socketClient.on('user:status_changed', (payload) => {
      if (payload?.userId && payload.userId === currentUser.id) {
        const isSuspended = payload.status === 'SUSPENDED';
        setCurrentUser((prev) =>
          prev ? { ...prev, status: payload.status, is_suspended: isSuspended } : prev
        );
      }
    });

    const unsubSocketToken = socketClient.on('token:adjusted', (payload) => {
      if (payload?.userId && payload.userId === currentUser.id) {
        if (typeof payload.newBalance === 'number') {
          setTokenBalance(payload.newBalance);
        }
      }
    });

    const unsubSocketPurged = socketClient.on('user:purged', (payload) => {
      if (payload?.userId && payload.userId === currentUser.id) {
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

      if (event.type === 'USER_UPDATED' && (!event.payload?.userId || event.payload.userId === currentUser.id)) {
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

  const loginWithGoogle = useCallback(async () => {
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
  }, []);

  const loginWithEmail = useCallback(async (email, password) => {
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
  }, []);

  const registerWithEmail = useCallback(async (email, password, fullName) => {
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
  }, []);

  const logout = useCallback(async () => {
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
  }, []);

  const refreshBalance = useCallback(async () => {
    if (currentUser?.id) {
      try {
        const wallet = await apiClient.getWallet(currentUser.id);
        if (wallet && typeof wallet.balance === 'number') {
          setTokenBalance((prev) => (prev !== wallet.balance ? wallet.balance : prev));
        }
      } catch (e) {
        console.warn('Balance refresh failed:', e);
      }
    }
  }, [currentUser?.id]);

  const isSuspended = Boolean(currentUser?.is_suspended || currentUser?.status === 'SUSPENDED');

  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    isSuspended,
    tokenBalance,
    refreshBalance,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    isLoading,
    authError
  }), [
    currentUser,
    isSuspended,
    tokenBalance,
    refreshBalance,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    isLoading,
    authError
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
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
