import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  ArrowUpRight,
  LifeBuoy,
  User,
  Shield,
  Coins,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import SupportTicketModal from './SupportTicketModal';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

/**
 * RedKross Academy — Navigation Header
 * Harmonized directly with the RedKross Foundation & Cybersecurity flagship navbars:
 * - Clean circular crest (`crest-clean-circle.png`)
 * - Prestigious Cinzel brand typography ("RedKross" + "Academy") with monospace subtitle
 * - Floating glassmorphic rounded-full container with dynamic scroll elevation
 * - Sleek horizontal text links with active glowing gradient indicator line
 * - High-tactile pill CTA button ("Operator Login" / Profile Menu) in Graphite + Neon Green palette
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, tokenBalance, logout, devLoginAsAdmin } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const ecosystem = getEcosystemLinks();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSignOut = async () => {
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Learning Paths", path: "/paths" },
    { label: "Courses", path: "/courses" },
    { label: "Verify Credential", path: "/verify" }
  ];

  if (currentUser) {
    if (currentUser.role === 'super_admin') {
      navLinks.push({ label: "Super Admin", path: "/admin" });
    } else {
      navLinks.push({ label: "Student Portal", path: "/student" });
    }
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none">
        {/* Top Cross-Domain Ecosystem Utility Bar */}
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
              className="flex items-center gap-1.5 text-slate-400 hover:text-[#35E6B5] transition-colors hidden sm:flex"
            >
              <span>Cybersecurity Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={ecosystem.psychology}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-[#65F58A] transition-colors hidden md:flex"
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

        {/* Floating Rounded-Full Main Navbar (Aligned with Main Website Architecture) */}
        <div className="px-4 sm:px-8 pt-3">
          <div
            className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
              scrolled
                ? 'bg-[#0B121B]/95 backdrop-blur-2xl border border-[#65F58A]/35 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
                : 'bg-[#101923]/80 backdrop-blur-xl border border-[#263440] shadow-xl'
            }`}
          >
            {/* Brand Logo & Prestigious Title */}
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group flex-shrink-0">
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
                  Defensive Cyber &bull; Operator Training
                </span>
              </div>
            </Link>

            {/* Desktop Horizontal Navigation (Identical clean layout to Main Website) */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 flex-shrink min-w-0">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-xs font-mono font-medium transition-colors duration-200 relative py-1 whitespace-nowrap ${
                      active ? 'text-[#65F58A] font-bold' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full shadow-[0_0_8px_rgba(101,245,138,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action & Auth Elements */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Support Desk Trigger */}
              <button
                onClick={() => setSupportModalOpen(true)}
                className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B2530]/70 hover:bg-[#1B2530] border border-[#263440] text-xs font-mono text-[#94A3B8] hover:text-white transition-colors flex-shrink-0"
                title="Open Academy Support Desk"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-[#35E6B5]" />
                <span>Support</span>
              </button>

              {/* Live Token Counter */}
              {currentUser && (
                <Link
                  to="/student/tokens"
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 transition-all text-xs font-mono font-medium flex-shrink-0"
                  title="RedKross Reward Tokens"
                >
                  <Coins className="w-3.5 h-3.5 text-[#65F58A] animate-pulse" />
                  <span className="tabular-nums font-bold">{tokenBalance}</span>
                  <span className="hidden md:inline text-[10px] text-[#35E6B5] uppercase">Tokens</span>
                </Link>
              )}

              {/* 1-Click Admin Access */}
              <button
                type="button"
                onClick={() => {
                  devLoginAsAdmin();
                  navigate('/admin');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#65F58A]/15 to-[#35E6B5]/15 hover:from-[#65F58A]/25 hover:to-[#35E6B5]/25 border border-[#65F58A]/40 text-[#65F58A] transition-all text-xs font-mono font-bold shadow-[0_0_15px_rgba(101,245,138,0.2)] flex-shrink-0"
                title="1-Click Super Admin Console"
              >
                <Zap className="w-3.5 h-3.5 text-[#65F58A] animate-pulse" />
                <span>Admin</span>
              </button>

              {/* User Profile Dropdown or Slim Pill CTA Button */}
              {currentUser ? (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs text-white transition-all"
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
                    <span className="max-w-[75px] md:max-w-[100px] truncate text-xs font-mono hidden sm:inline">
                      {currentUser.full_name?.split(' ')[0] || currentUser.email?.split('@')[0]}
                    </span>
                    {currentUser.role === 'super_admin' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#65F58A]/20 text-[#65F58A] border border-[#65F58A]/40 hidden lg:inline font-bold">
                        ADMIN
                      </span>
                    )}
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
                          <Coins className="w-4 h-4 text-[#65F58A]" />
                          <span>Token Ledger</span>
                        </Link>
                        {currentUser.role === 'super_admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-[#65F58A] hover:bg-[#1B2530] transition-colors font-semibold"
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
                /* Sleek CTA Button matching the Main Website's "Partner With Us" button style */
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[#071018] text-xs font-royal font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.35)] hover:scale-105 transition-all cursor-pointer uppercase font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #65F58A, #35E6B5)'
                  }}
                >
                  <span>Operator Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-[#1B2530] border border-[#263440] text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#65F58A]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Accessible Mobile Menu (Floating panel beneath navbar) */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-[#0B121B]/95 backdrop-blur-2xl border border-[#263440] p-5 shadow-2xl pointer-events-auto">
              <div className="flex flex-col gap-3 font-mono text-xs">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between py-2 px-3 rounded-xl transition-colors ${
                        active
                          ? 'bg-[#65F58A]/10 text-[#65F58A] font-bold border border-[#65F58A]/30'
                          : 'text-[#94A3B8] hover:text-white hover:bg-[#1B2530]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-[#263440] flex flex-col gap-2">
                  {currentUser?.role === 'super_admin' && (
                    <Link
                      to="/student"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#1B2530] text-[#35E6B5] hover:text-white border border-[#263440] text-xs font-mono"
                    >
                      <span>View Student Classroom</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      setSupportModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1B2530] text-[#94A3B8] hover:text-white border border-[#263440] text-xs font-mono"
                  >
                    <LifeBuoy className="w-3.5 h-3.5 text-[#35E6B5]" />
                    <span>Academy Support Desk</span>
                  </button>

                  {currentUser ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-[#071018] text-xs font-royal font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.35)] uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #65F58A, #35E6B5)'
                      }}
                    >
                      <span>Operator Login</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Institutional Support Ticket Modal */}
      <SupportTicketModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
}
