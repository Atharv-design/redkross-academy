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

  // SUSPENSION ACCESS LOCK: Suspended students cannot access lessons, exams, or student dashboard
  if (currentUser.status === 'SUSPENDED' || currentUser.is_suspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071018] px-4">
        <div className="max-w-md w-full p-8 rounded-2xl ultra-glass-card border border-red-500/40 text-center space-y-5 animate-slide-left">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Shield className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              ⛔ CADET CLEARANCE SUSPENDED
            </span>
            <h2 className="text-xl font-bold text-white font-lora">
              Academic Account Suspended
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
              Your cadet account (<span className="text-white font-bold">{currentUser.cadet_id || currentUser.email}</span>) has been suspended by RedKross Academy Administration.
            </p>
            <p className="text-xs text-[#8BA2B5] font-mono leading-relaxed bg-[#0B131C] p-3 rounded-lg border border-[#1B2530]">
              Access to curriculum lessons, practical lab environments, quiz assessments, and diploma generation has been locked.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="mailto:support@redkross.org.in"
              className="w-full py-2.5 rounded-lg font-mono text-xs font-bold text-center bg-[#1B2530] text-[#CBD5E1] hover:text-white border border-[#263440] transition-colors"
            >
              Appeal Suspension to Administration
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('redkross_academy_dev_cadet');
                localStorage.removeItem('redkross_academy_active_user');
                localStorage.removeItem('redkross_academy_auth_token');
                window.location.href = '/login';
              }}
              className="w-full py-2.5 rounded-lg font-mono text-xs font-bold text-center bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 transition-colors"
            >
              Sign Out Cadet Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
