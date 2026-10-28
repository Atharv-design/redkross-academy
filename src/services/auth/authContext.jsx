import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockEngine } from '../db/mockEngine';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Default load student account
    const users = mockEngine.getUsers();
    const storedUserId = localStorage.getItem('redkross_academy_active_user');
    const matched = users.find((u) => u.id === storedUserId) || users[0];
    setCurrentUser(matched);
    if (matched) {
      setTokenBalance(mockEngine.getTokenBalance(matched.id));
    }
    setIsLoading(false);
  }, []);

  const refreshBalance = () => {
    if (currentUser) {
      setTokenBalance(mockEngine.getTokenBalance(currentUser.id));
    }
  };

  const switchUser = (userId) => {
    const user = mockEngine.getUserById(userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('redkross_academy_active_user', user.id);
      setTokenBalance(mockEngine.getTokenBalance(user.id));
    }
  };

  const loginWithGoogle = () => {
    // Simulates instant OAuth callback
    const student = mockEngine.getUsers().find((u) => u.role === 'student');
    if (student) {
      switchUser(student.id);
    }
  };

  const logout = () => {
    localStorage.removeItem('redkross_academy_active_user');
    setCurrentUser(null);
    setTokenBalance(0);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        tokenBalance,
        refreshBalance,
        switchUser,
        loginWithGoogle,
        logout,
        isLoading,
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
