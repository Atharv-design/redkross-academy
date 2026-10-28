import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Coins,
  ExternalLink,
  Award,
  BookOpen,
  Layers,
  CheckCircle2,
  User,
  ChevronDown,
  Menu,
  X,
  LifeBuoy,
  LogOut,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import SupportTicketModal from './SupportTicketModal';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

export default function Navbar() {
  const { currentUser, tokenBalance, logout } = useAuth();
  const ecosystem = getEcosystemLinks();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrent = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSignOut = async () => {
    setShowProfileMenu(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none">
        {/* Top Cross-Domain Utility Bar */}
        <div className="bg-[#050B11]/92 border-b border-[#263440] py-1.5 px-4 sm:px-8 text-[11px] font-mono text-[#94A3B8] flex items-center justify-between backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <a 
              href={ecosystem.foundation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#65F58A] transition-colors truncate"
            >
              <span>&larr; RedKross Foundation</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={ecosystem.cybersecurity}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors hidden sm:flex"
            >
              <span>Cybersecurity Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={ecosystem.psychology}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-[#FFA439] transition-colors hidden md:flex"
            >
              <span>Psychology Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[#65F58A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-pulse" />
            <span className="font-semibold tracking-wider font-mono">DEFENSIVE CYBER ACADEMY</span>
          </div>
        </div>

        {/* Floating Glass Pill Navbar */}
        <div className="px-4 sm:px-8 pt-3">
          <div
            className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
              scrolled
                ? 'bg-[#0B121B]/95 backdrop-blur-2xl border border-[#65F58A]/35 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
                : 'bg-[#101923]/80 backdrop-blur-xl border border-[#263440] shadow-xl'
            }`}
          >
            {/* Brand Logo & Royal Title */}
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black border border-[#65F58A]/50 flex items-center justify-center shadow-[0_0_15px_rgba(101,245,138,0.3)] group-hover:scale-105 transition-transform flex-shrink-0">
                <img
                  src="/assets/logo-full-circle.png"
                  alt="RedKross Crest"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Shield className="w-4 h-4 text-[#65F58A] absolute inset-0 m-auto" />
              </div>
              <div className="flex flex-col">
                <div className="font-royal text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[#65F58A] transition-colors flex items-center gap-1.5 leading-none">
                  <span>REDKROSS</span>
                  <span className="text-[10px] font-mono text-[#35E6B5] border border-[#35E6B5]/30 px-1.5 py-0.2 rounded-full uppercase">
                    Academy
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#94A3B8] tracking-widest uppercase">
                  Institutional Defense
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-royal text-xs font-semibold tracking-wide">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isCurrent('/') && location.pathname === '/'
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]/50'
                }`}
              >
                <span>Home</span>
              </Link>

              <Link
                to="/paths"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isCurrent('/paths')
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Learning Paths</span>
              </Link>

              <Link
                to="/courses"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isCurrent('/courses')
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Course Directory</span>
              </Link>

              <Link
                to="/verify"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isCurrent('/verify')
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]/50'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verify Credential</span>
              </Link>

              {currentUser && (
                <Link
                  to="/student"
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    isCurrent('/student')
                      ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.2)]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]/50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Student Portal</span>
                </Link>
              )}

              {currentUser?.role === 'super_admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    isCurrent('/admin')
                      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'text-[#F59E0B] hover:text-white hover:bg-[#1B2530]/50'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Super Admin</span>
                </Link>
              )}
            </nav>

            {/* Right Actions & Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Support Desk Trigger */}
              <button
                onClick={() => setSupportModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B2530]/70 hover:bg-[#1B2530] border border-[#263440] text-xs text-[#94A3B8] hover:text-white transition-colors"
                title="Open Academy Support Desk"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-[#35E6B5]" />
                <span className="hidden xl:inline">Support</span>
              </button>

              {/* Live Token Wallet Counter (for authenticated student) */}
              {currentUser && (
                <Link
                  to="/student/tokens"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/20 transition-all text-xs font-mono font-medium"
                  title="RedKross Reward Tokens"
                >
                  <Coins className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse-subtle" />
                  <span className="tabular-nums font-bold">{tokenBalance}</span>
                  <span className="hidden sm:inline text-[10px] text-[#F59E0B]/80 uppercase">Tokens</span>
                </Link>
              )}

              {/* User Profile Dropdown or Sign In */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs text-white transition-all"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-[#101923] border border-[#65F58A]/40 flex items-center justify-center flex-shrink-0">
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-mono text-[#65F58A]">
                          {currentUser.full_name?.charAt(0) || 'O'}
                        </span>
                      )}
                    </div>
                    <span className="max-w-[100px] truncate text-xs font-mono hidden sm:inline">
                      {currentUser.full_name || currentUser.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#101923] border border-[#263440] shadow-2xl py-2 z-50 divide-y divide-[#263440]">
                      <div className="px-4 py-3">
                        <div className="font-royal font-bold text-sm text-white truncate">
                          {currentUser.full_name}
                        </div>
                        <div className="text-xs text-[#94A3B8] font-mono truncate">
                          {currentUser.email}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A]" />
                          <span>Role: {currentUser.role?.replace('_', ' ')}</span>
                        </div>
                      </div>

                      <div className="py-1 text-xs font-mono">
                        <Link
                          to="/student"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-[#1B2530] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#35E6B5]" />
                          <span>Student Portal</span>
                        </Link>
                        <Link
                          to="/student/tokens"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-[#1B2530] transition-colors"
                        >
                          <Coins className="w-4 h-4 text-[#F59E0B]" />
                          <span>Token Ledger</span>
                        </Link>
                        {currentUser.role === 'super_admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-[#F59E0B] hover:bg-[#1B2530] transition-colors font-semibold"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Super Admin Area</span>
                          </Link>
                        )}
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full glass-button-primary font-royal font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(101,245,138,0.25)]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Operator Login</span>
                </Link>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-[#1B2530] border border-[#263440] text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl lg:hidden pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider border-b border-[#263440] pb-2">
              Navigation Menu
            </div>
            <nav className="flex flex-col space-y-3 font-royal text-base">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-white hover:text-[#65F58A] transition-colors py-2 border-b border-[#263440]/40 flex items-center justify-between"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
              <Link
                to="/paths"
                onClick={closeMobileMenu}
                className="text-white hover:text-[#65F58A] transition-colors py-2 border-b border-[#263440]/40 flex items-center justify-between"
              >
                <span>Learning Paths</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
              <Link
                to="/courses"
                onClick={closeMobileMenu}
                className="text-white hover:text-[#65F58A] transition-colors py-2 border-b border-[#263440]/40 flex items-center justify-between"
              >
                <span>Course Directory</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
              <Link
                to="/verify"
                onClick={closeMobileMenu}
                className="text-white hover:text-[#65F58A] transition-colors py-2 border-b border-[#263440]/40 flex items-center justify-between"
              >
                <span>Verify Credential</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
              {currentUser && (
                <Link
                  to="/student"
                  onClick={closeMobileMenu}
                  className="text-[#65F58A] font-semibold py-2 border-b border-[#263440]/40 flex items-center justify-between"
                >
                  <span>Student Portal</span>
                  <ArrowRight className="w-4 h-4 text-[#65F58A]" />
                </Link>
              )}
              {currentUser?.role === 'super_admin' && (
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className="text-[#F59E0B] font-semibold py-2 border-b border-[#263440]/40 flex items-center justify-between"
                >
                  <span>Super Admin Operations</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </Link>
              )}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#263440] space-y-3">
            {currentUser ? (
              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({currentUser.email})</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full py-3 rounded-xl glass-button-primary font-royal font-bold text-xs flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Operator Portal</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Institutional Support Ticket Modal */}
      <SupportTicketModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
}
