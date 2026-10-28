import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * Firebase Configuration for RedKross Academy
 * Configured under project: academy-redkross
 * Authorized Domains: localhost, academy-redkross.firebaseapp.com, academy-redkross.web.app, redkross-academy.vercel.app
 */
const firebaseConfig = {
  apiKey: "AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ",
  authDomain: "academy-redkross.firebaseapp.com",
  projectId: "academy-redkross",
  storageBucket: "academy-redkross.firebasestorage.app",
  messagingSenderId: "245293774553",
  appId: "1:245293774553:web:ee3561dc5b970fe3a7f0c8",
  measurementId: "G-EC4TQ4M88B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
