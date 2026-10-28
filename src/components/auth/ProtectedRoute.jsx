import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';
import { Shield } from 'lucide-react';

/**
 * Route Protection Guard (Phase 2.1)
 * Enforces mandatory authentication for all protected learning surfaces.
 * Redirects unauthenticated visitors to /login preserving the return destination safely.
 */
export default function ProtectedRoute({ children }) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071018]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#101923] border border-[#263440] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#65F58A] animate-pulse" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#65F58A]/20 to-[#35E6B5]/20 blur-sm -z-10 animate-pulse" />
          </div>
          <div className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">
            Verifying Cryptographic Clearance...
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
