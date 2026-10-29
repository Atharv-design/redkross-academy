import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * Firebase Configuration for RedKross Academy
 * Configured under project: academy-redkross
 * Reads environment variables first with fallbacks for development.
 * Authorized Domains: localhost, 127.0.0.1, academy-redkross.firebaseapp.com, redkross-academy.vercel.app
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCwsdhdLghtrcJ7NQMbayW1Yq2BCIO2TWQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "academy-redkross.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "academy-redkross",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "academy-redkross.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "245293774553",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:245293774553:web:ee3561dc5b970fe3a7f0c8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EC4TQ4M88B"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"
);

export default app;
