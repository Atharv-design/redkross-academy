import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';
import SupportTicketModal from './SupportTicketModal';

export default function Navbar() {
  const { currentUser, tokenBalance, switchUser, loginWithGoogle } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const allUsers = mockEngine.getUsers();

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

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none">
        {/* Top Cross-Domain Utility Bar */}
        <div className="bg-[#050B11]/92 border-b border-[#263440] py-1.5 px-4 sm:px-8 text-[11px] font-mono text-[#94A3B8] flex items-center justify-between backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <a 
              href="https://redkross.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#65F58A] transition-colors truncate"
            >
              <span>&larr; RedKross Foundation</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://cyber.redkross.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors hidden sm:flex"
            >
              <span>Cybersecurity Labs</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href="https://psychology.redkross.org.in"
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
                  src="/assets/crest-clean-circle.png" 
                  alt="RedKross Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-royal font-bold text-sm sm:text-base tracking-wider text-white leading-tight">
                  RedKross <span className="text-[#65F58A]">Academy</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase -mt-0.5">
                  Defensive Education &bull; Certifications
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              <Link
                to="/paths"
                className={`text-xs font-mono font-medium transition-colors relative py-1 ${
                  isCurrent('/paths') ? 'text-[#65F58A] font-bold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Learning Paths</span>
                {isCurrent('/paths') && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full shadow-[0_0_8px_rgba(101,245,138,0.8)]" />
                )}
              </Link>
              <Link
                to="/courses"
                className={`text-xs font-mono font-medium transition-colors relative py-1 ${
                  isCurrent('/courses') ? 'text-[#65F58A] font-bold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Curriculum Catalogue</span>
                {isCurrent('/courses') && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full shadow-[0_0_8px_rgba(101,245,138,0.8)]" />
                )}
              </Link>
              <Link
                to="/verify"
                className={`text-xs font-mono font-medium transition-colors relative py-1 ${
                  location.pathname.startsWith('/verify') ? 'text-[#65F58A] font-bold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Verify Credential</span>
                {location.pathname.startsWith('/verify') && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full shadow-[0_0_8px_rgba(101,245,138,0.8)]" />
                )}
              </Link>
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

              {/* Live Token Wallet Counter */}
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

              {/* Role Switcher for PRD Verification */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1B2530]/70 border border-[#263440] hover:border-slate-500 text-xs text-slate-300 transition-colors"
                  title="Switch active role for PRD verification"
                >
                  <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'super_admin' ? 'bg-[#F59E0B]' : currentUser?.role === 'student_support' ? 'bg-[#35E6B5]' : 'bg-[#65F58A]'}`} />
                  <span className="capitalize font-mono text-[11px]">{currentUser?.role?.replace('_', ' ') || 'Guest'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#101923] border border-[#263440] shadow-2xl py-1 z-50">
                    <div className="px-3 py-2 border-b border-[#263440] text-[10px] text-[#94A3B8] uppercase font-mono">
                      Simulate Role (PRD Verification)
                    </div>
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1B2530] ${
                          currentUser?.id === u.id ? 'text-[#65F58A] font-semibold bg-[#65F58A]/10' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-white">{u.full_name}</div>
                          <div className="text-[10px] text-slate-400 font-mono capitalize">{u.role.replace('_', ' ')}</div>
                        </div>
                        {currentUser?.id === u.id && <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Portal CTA Button */}
              {currentUser ? (
                currentUser.role === 'super_admin' ? (
                  <Link
                    to="/admin"
                    className="px-4 py-1.5 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-black text-xs font-royal font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hidden sm:flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                ) : (
                  <Link
                    to="/student"
                    className="px-4 py-1.5 rounded-full bg-[#65F58A] hover:bg-[#00FFA3] text-black text-xs font-royal font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(101,245,138,0.35)] hidden sm:flex items-center gap-1.5 hover:scale-105"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Operator Portal</span>
                  </Link>
                )
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 text-black text-xs font-royal font-bold tracking-wider transition-all hidden sm:block"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-[#1B2530] border border-[#263440] text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#263440] bg-[#071018]/98 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 animate-fade-in shadow-2xl pointer-events-auto mt-2 mx-4 rounded-2xl border">
            {/* Primary Mobile Navigation */}
            <nav className="space-y-1">
              <Link
                to="/paths"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/paths') ? 'text-[#65F58A] bg-[#101923] border border-[#65F58A]/30' : 'text-slate-300 hover:bg-[#1B2530]'
                }`}
              >
                <Layers className="w-5 h-5 text-[#35E6B5]" />
                <span className="font-royal font-semibold">Learning Paths</span>
              </Link>
              <Link
                to="/courses"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/courses') ? 'text-[#65F58A] bg-[#101923] border border-[#65F58A]/30' : 'text-slate-300 hover:bg-[#1B2530]'
                }`}
              >
                <BookOpen className="w-5 h-5 text-[#65F58A]" />
                <span className="font-royal font-semibold">Curriculum Catalogue</span>
              </Link>
              <Link
                to="/verify"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/verify') ? 'text-[#65F58A] bg-[#101923] border border-[#65F58A]/30' : 'text-slate-300 hover:bg-[#1B2530]'
                }`}
              >
                <Award className="w-5 h-5 text-[#35E6B5]" />
                <span className="font-royal font-semibold">Verify Credential</span>
              </Link>
              {currentUser && (
                <Link
                  to="/student/tokens"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B]"
                >
                  <div className="flex items-center space-x-3">
                    <Coins className="w-5 h-5 text-[#F59E0B]" />
                    <span className="font-royal font-semibold">Token Wallet</span>
                  </div>
                  <span className="font-mono font-bold">{tokenBalance} Tokens</span>
                </Link>
              )}
            </nav>

            {/* Portal Action for Mobile */}
            <div className="pt-2 border-t border-[#263440]">
              {currentUser ? (
                currentUser.role === 'super_admin' ? (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-xl bg-[#F59E0B] text-black text-xs font-royal font-bold flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Open Admin Console</span>
                  </Link>
                ) : (
                  <Link
                    to="/student"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-xl bg-[#65F58A] text-black text-xs font-royal font-bold flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    <span>Open Operator Portal</span>
                  </Link>
                )
              ) : (
                <button
                  onClick={() => {
                    loginWithGoogle();
                    closeMobileMenu();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-royal font-bold flex items-center justify-center space-x-2"
                >
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>

            {/* Mobile Role Switcher */}
            <div className="pt-2 border-t border-[#263440]">
              <div className="text-[10px] font-mono text-[#94A3B8] uppercase mb-2">Switch Active Identity</div>
              <div className="grid grid-cols-3 gap-2">
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      closeMobileMenu();
                    }}
                    className={`p-2 rounded-lg text-center border text-[11px] font-medium transition-colors ${
                      currentUser?.id === u.id
                        ? 'border-[#65F58A] bg-[#65F58A]/10 text-[#65F58A] font-bold'
                        : 'border-[#263440] bg-[#101923] text-slate-300'
                    }`}
                  >
                    <div className="truncate font-royal">{u.full_name.split(' ')[0]}</div>
                    <div className="text-[9px] text-[#94A3B8] capitalize">{u.role.replace('_', ' ')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support and External Links */}
            <div className="pt-2 border-t border-[#263440] flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  closeMobileMenu();
                  setSupportModalOpen(true);
                }}
                className="flex items-center space-x-1.5 text-[#35E6B5] hover:underline"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Support Desk</span>
              </button>
              <a
                href="https://cyber.redkross.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-[#94A3B8] hover:text-white"
              >
                <span>Cybersecurity Labs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Support Ticket Modal */}
      <SupportTicketModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
    </>
  );
}
