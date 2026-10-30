import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './services/auth/authContext.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import './index.css';
import './styles/liquid-glass.css';

// Purge any stale or foreign service workers from localhost port collisions (e.g. Workbox)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((unregistered) => {
          if (unregistered) {
            console.log('[System Recovery] Unregistered stale localhost service worker:', registration.scope);
          }
        });
      }
    }).catch((err) => {
      console.warn('[System Recovery] ServiceWorker check:', err);
    });

    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          if (key.includes('workbox') || key.includes('precache')) {
            caches.delete(key).then(() => {
              console.log('[System Recovery] Cleared conflicting stale cache:', key);
            });
          }
        }
      }).catch((e) => console.warn(e));
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
