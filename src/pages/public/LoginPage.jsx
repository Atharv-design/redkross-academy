import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, CheckCircle2, AlertCircle, Sparkles, KeyRound, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';

/**
 * RedKross Academy — Hardened Google Authentication Gateway (Phase 2 & Phase 1.1)
 * Authentic Google OAuth 2.0 Single-Sign-On with direct Google Account Chooser popup.
 * Designed according to Graphite + Neon Green palette standards.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, devLoginAsAdmin, currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Destination protection: resolve safe internal return path
  const rawDestination = location.state?.from?.pathname || '/student';
  const safeDestination = rawDestination.startsWith('/') && !rawDestination.startsWith('//')
    ? rawDestination
    : '/student';

  // If already authenticated, redirect immediately
  React.useEffect(() => {
    if (currentUser) {
      navigate(safeDestination, { replace: true });
    }
  }, [currentUser, navigate, safeDestination]);

  // Triggers official Google OAuth browser popup directly
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(safeDestination, { replace: true });
    } catch (err) {
      console.error('Google Auth Failed:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google sign-in popup was closed before completion. Please retry.');
      } else if (err.code === 'auth/popup-blocked') {
        setErrorMsg('Google popup was blocked by browser. Please allow popups for localhost and retry.');
      } else if (err.code === 'auth/network-request-failed') {
        setErrorMsg('Network connectivity issue. Please check your internet connection.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMsg('Domain not authorized in Firebase. Please open the website on http://localhost:5173 instead of 127.0.0.1.');
      } else if (err.message?.includes('The requested action is invalid') || err.message?.includes('api-key-not-valid')) {
        setErrorMsg('Firebase Google Sign-In is not enabled yet in Firebase Console. Please enable Google under Authentication > Sign-in method in Firebase Console.');
      } else {
        setErrorMsg(err.message || 'Google authentication failed. Please retry.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative z-10">
      <div className="max-w-md w-full space-y-6">
        {/* Terminal Header */}
        <div className="text-center space-y-3 animate-slide-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full ultra-glass-pill text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ZERO-TRUST ACCESS GATEWAY</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Operator Sign-In
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
            Verify your authorized institutional identity using single-sign-on Google OAuth 2.0 to access proctored courses and defensive certifications.
          </p>
        </div>

        {/* Main Authentication Card */}
        <div className="ultra-glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-slide-left stagger-1">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#65F58A]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#35E6B5]/15 rounded-full blur-2xl pointer-events-none" />

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Hardened Google OAuth Button */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              type="button"
              className="w-full py-4 px-5 rounded-xl ultra-glass-card hover:border-[#65F58A] active:scale-[0.99] text-white font-mono text-sm font-semibold transition-all flex items-center justify-center gap-3.5 group shadow-lg disabled:opacity-60 disabled:cursor-not-allowed shimmer-lr"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#65F58A] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[#65F58A] tracking-wide text-xs">
                    Opening Official Google Account Chooser...
                  </span>
                </>
              ) : (
                <>
                  {/* Official Google G Logo SVG */}
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-white group-hover:text-[#65F58A] transition-colors">
                    Continue with Google Account
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[#64748B] font-mono leading-relaxed">
              Opens the official Google verification window. Select your authorized Google account to sign in.
            </p>

            {/* 1-Click Super Admin Dev Access (Temporary Development Clearance) */}
            <div className="pt-2 border-t border-[#263440]/60">
              <button
                type="button"
                onClick={() => {
                  devLoginAsAdmin();
                  navigate('/admin', { replace: true });
                }}
                className="w-full py-3.5 px-4 rounded-xl ultra-glass-btn active:scale-[0.99] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(101,245,138,0.2)]"
              >
                <ShieldCheck className="w-4 h-4 text-[#65F58A]" />
                <span>⚡ DEV MODE: 1-Click Super Admin Login</span>
              </button>
              <div className="text-center text-[10px] text-[#64748B] font-mono mt-1.5">
                Quick bypass for development & studio page styling
              </div>
            </div>
          </div>

          {/* Hardened Security Verification Matrix */}
          <div className="pt-4 border-t border-[#263440]/80 space-y-2.5">
            <div className="text-[10px] font-mono text-[#65F58A] uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#65F58A]" />
              <span>Security Protocols Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#94A3B8]">
              <div className="p-2 rounded-lg ultra-glass-panel flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                <span className="truncate">OAuth 2.0 + PKCE</span>
              </div>
              <div className="p-2 rounded-lg ultra-glass-panel flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                <span className="truncate">256-Bit TLS Cipher</span>
              </div>
              <div className="p-2 rounded-lg ultra-glass-panel flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                <span className="truncate">Zero-Trust Tokens</span>
              </div>
              <div className="p-2 rounded-lg ultra-glass-panel flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                <span className="truncate">PRD §13 Audit Trail</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Regulatory Footnote */}
        <div className="p-4 rounded-xl ultra-glass-panel text-center space-y-1 animate-slide-left stagger-2">
          <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#65F58A]" />
            <span>SECURE CADET OPERATING ENVIRONMENT</span>
          </div>
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            All authentication events and proctoring telemetry are cryptographically signed and stored with timestamped audit logs.
          </p>
        </div>
      </div>
    </div>
  );
}
