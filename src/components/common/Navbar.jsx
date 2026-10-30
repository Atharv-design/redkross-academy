import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
  Award
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import SupportTicketModal from './SupportTicketModal';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

/**
 * RedKross Academy - Navigation Header
 * Harmonized directly with the RedKross Foundation & Cybersecurity flagship navbars:
 * - Clean circular crest (`crest-clean-circle.png`)
 * - Prestigious Cinzel brand typography ("RedKross" + "Academy") with monospace subtitle
 * - Floating liquid glassmorphic container with dynamic refractive glow
 * - Sleek horizontal text links with active glowing gradient indicator line
 * - High-tactile pill CTA button in Graphite + Neon Green palette
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
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSignOut = async () => {
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
    navigate('/');
    try {
      await logout();
    } catch (e) {
      console.warn('Sign out note:', e);
    }
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

  const roleDisplay = String(currentUser?.role || 'student').replace('_', ' ').toUpperCase();
  const cadetId = currentUser?.cadet_id || null;
  const fullName = currentUser?.full_name || currentUser?.displayName || currentUser?.email || 'Cadet Operator';

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

        {/* Floating Rounded-Full Main Navbar */}
        <div className="px-4 sm:px-8 pt-3">
          <div
            className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 pointer-events-auto liquid-glass-nav ${
              scrolled
                ? 'shadow-[0_16px_48px_rgba(0,0,0,0.85)] border-[#65F58A]/40'
                : 'border-[#263440]'
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

            {/* Desktop Horizontal Navigation */}
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
                  <span className="tabular-nums font-bold">{typeof tokenBalance === 'number' ? tokenBalance : 150}</span>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-button text-xs font-mono font-bold shadow-[0_0_15px_rgba(101,245,138,0.2)] flex-shrink-0"
                title="1-Click Super Admin Console"
              >
                <Zap className="w-3.5 h-3.5 text-[#65F58A] animate-pulse" />
                <span>Admin</span>
              </button>

              {/* User Profile Dropdown or Slim Pill CTA Button */}
              {currentUser ? (
                <div className="relative flex-shrink-0" ref={profileMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1B2530]/80 hover:bg-[#263440] border border-[#263440] hover:border-[#65F58A]/40 text-xs text-white transition-all cursor-pointer shadow-md"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-[#101923] border border-[#65F58A]/40 flex items-center justify-center flex-shrink-0">
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={fullName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-[10px] font-mono text-[#65F58A]">
                          {(fullName || 'C').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="max-w-[75px] md:max-w-[100px] truncate text-xs font-mono hidden sm:inline">
                      {fullName.split(' ')[0]}
                    </span>
                    {cadetId && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 hidden md:inline font-bold">
                        {cadetId}
                      </span>
                    )}
                    {currentUser.role === 'super_admin' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#65F58A]/20 text-[#65F58A] border border-[#65F58A]/40 hidden lg:inline font-bold">
                        ADMIN
                      </span>
                    )}
                    <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl liquid-glass-dropdown shadow-2xl py-2 z-50 divide-y divide-[#263440]">
                      <div className="px-4 py-3">
                        <div className="font-royal font-bold text-sm text-white truncate">
                          {fullName}
                        </div>
                        <div className="text-xs text-[#94A3B8] font-mono truncate">
                          {currentUser.email || 'operator@redkross.org.in'}
                        </div>
                        {cadetId && (
                          <div className="mt-1 text-[11px] font-mono text-[#65F58A] font-bold">
                            CADET: {cadetId}
                          </div>
                        )}
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A]" />
                          <span>Role: {roleDisplay}</span>
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
                        {cadetId && (
                          <Link
                            to={`/verify/${cadetId}`}
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-[#1B2530] transition-colors"
                          >
                            <Award className="w-4 h-4 text-[#65F58A]" />
                            <span>My Verified Dossier</span>
                          </Link>
                        )}
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
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
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
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-[#94A3B8] hover:text-white bg-[#1B2530] border border-[#263440]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pointer-events-auto">
            <div className="liquid-glass-dropdown rounded-2xl p-4 space-y-3">
              <nav className="flex flex-col space-y-1 font-mono text-xs">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#65F58A]/15 text-[#65F58A] font-bold'
                        : 'text-slate-300 hover:bg-[#1B2530]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Cross-Domain Support Ticket Modal */}
      <SupportTicketModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
}
