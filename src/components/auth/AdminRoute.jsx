import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';
import { ShieldAlert, Lock, ArrowLeft, Shield, Zap } from 'lucide-react';

/**
 * Super Admin Route Guard (Hardened Enterprise RBAC)
 * Strictly verifies authorized role `role === 'super_admin'`.
 * Development environment allows 1-click test entry.
 * Production environment enforces strict role verification with 403 Forbidden screens.
 */
export default function AdminRoute({ children }) {
  const { currentUser, isLoading, devLoginAsAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071018]">
        <div className="flex flex-col items-center space-y-4">
          <Shield className="w-10 h-10 text-[#65F58A] animate-pulse" />
          <div className="text-xs font-mono text-[#94A3B8] tracking-wider uppercase">
            Verifying Super Admin Cryptographic Clearance...
          </div>
        </div>
      </div>
    );
  }

  // 1. Unauthenticated Visitor Handling
  if (!currentUser) {
    // In local development, provide 1-click entrance for rapid testing
    if (import.meta.env.DEV) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative z-10 font-lora">
          <div className="max-w-md w-full bg-[#101923] border border-[#263440] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A]">
              <Shield className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                LOCAL DEV HARNESS
              </span>
              <h1 className="font-lora text-2xl font-bold text-white">
                Super Admin Operations Console
              </h1>
              <p className="text-xs font-lora text-[#94A3B8] leading-relaxed">
                Development mode detected. Click below to enter with full super-admin privileges.
              </p>
            </div>

            <button
              type="button"
              onClick={() => devLoginAsAdmin()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.3)] hover:opacity-90 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#071018]" />
              <span>⚡ [DEV ONLY] Enter as Super Admin</span>
            </button>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/student"
                className="flex-1 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs font-lora text-[#94A3B8] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Student Portal</span>
              </Link>
              <Link
                to="/"
                className="flex-1 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs font-lora text-[#65F58A] hover:underline flex items-center justify-center"
              >
                <span>Academy Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // In production, unauthenticated users are directed to /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Authenticated Non-Admin Handling
  const isSuperAdmin = currentUser.role === 'super_admin' || (import.meta.env.DEV && localStorage.getItem('redkross_academy_dev_admin') === 'true');

  if (!isSuperAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative z-10 font-lora">
        <div className="max-w-md w-full bg-[#101923] border border-red-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
              403 FORBIDDEN • PRIVILEGE BOUNDARY
            </span>
            <h1 className="font-lora text-2xl font-bold text-white">
              Access Restricted
            </h1>
            <p className="text-xs font-lora text-[#94A3B8] leading-relaxed">
              Your active cadet identity ({currentUser.email || currentUser.id}) does not possess institutional Super Admin clearances to enter this workstation.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              to="/student"
              className="flex-1 py-2.5 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 text-xs font-lora text-[#65F58A] hover:bg-[#65F58A]/20 transition-colors flex items-center justify-center gap-1.5 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Cadet Portal</span>
            </Link>
            <Link
              to="/"
              className="flex-1 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs font-lora text-slate-300 hover:text-white transition-colors flex items-center justify-center"
            >
              <span>Academy Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
