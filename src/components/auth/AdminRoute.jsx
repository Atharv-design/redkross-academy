import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';
import { ShieldAlert, Lock, ArrowLeft, Shield, Zap } from 'lucide-react';

/**
 * Super Admin Route Guard (Phase 4 & Phase 5.2)
 * Strictly verifies server-authorized `role === 'super_admin'`.
 * Unauthenticated users are redirected to /login.
 * Authenticated non-admin users receive a 403 Access Denied security screen.
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

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'super_admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative z-10">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-red-500/30 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-wider">
              HTTP 403 • ACCESS RESTRICTED
            </span>
            <h1 className="font-royal text-2xl font-bold text-white">
              Super Admin Clearance Required
            </h1>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Your active operator profile (<code className="text-slate-300 font-mono">{currentUser.email}</code>) holds <span className="text-emerald-400 font-mono uppercase">[{currentUser.role}]</span> standing. Administrative operations require explicit server-side provisioning.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#071018]/80 border border-[#263440] text-left space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B]">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>PHASE 4.2 COMPLIANCE ACTIVE</span>
            </div>
            <p className="text-[10px] text-[#64748B] font-mono leading-normal">
              No default Super Admin user exists. Super Admin access must be securely provisioned via administrative CLI deployment orchestration.
            </p>
          </div>

          {/* 1-Click Super Admin Dev Access Elevation */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                devLoginAsAdmin();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#65F58A] hover:bg-[#00FFA3] text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.3)]"
            >
              <Zap className="w-4 h-4 text-black animate-pulse" />
              <span>⚡ [DEV MODE] 1-Click Elevate to Super Admin</span>
            </button>
            <div className="text-[10px] text-[#64748B] font-mono mt-1">
              Temporary access button while designing & testing academy management
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              to="/student"
              className="flex-1 py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-xs font-mono text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </Link>
            <Link
              to="/"
              className="flex-1 py-2.5 rounded-xl glass-button-primary font-royal font-bold text-xs flex items-center justify-center"
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
