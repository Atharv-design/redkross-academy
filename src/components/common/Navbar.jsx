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
  const { currentUser, tokenBalance, logout } = useAuth();
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
    if (path === '/') return location.pathname === '/' && !location.hash;
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleAcademyClick = (e) => {
    if (e) e.preventDefault();
    closeMobileMenu();
    if (location.pathname === '/') {
      const el = document.getElementById('academies');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.replaceState(null, '', '#academies');
    } else {
      navigate('/#academies');
    }
  };

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

  const roleDisplay = String(currentUser?.role || 'student').replace('_', ' ').toUpperCase();
  const cadetId = currentUser?.cadet_id || null;
  const fullName = currentUser?.full_name || currentUser?.displayName || currentUser?.email || 'Cadet Operator';

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none">
        {/* Top Cross-Domain Ecosystem Utility Bar */}
        <div className="bg-transparent border-b border-[#FF7A00]/20 py-1.5 px-4 sm:px-8 text-[11px] font-mono text-[#E2D9CE] flex items-center justify-between backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <a 
              href={ecosystem.foundation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E2D9CE] hover:text-[#FF7A00] transition-colors truncate"
            >
              <span>&larr; RedKross Foundation</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-[#FF7A00]/30">|</span>
            <a 
              href={ecosystem.cybersecurity}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E2D9CE] hover:text-[#FFA439] transition-colors hidden sm:flex"
            >
              <span>Cybersecurity Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-[#FF7A00]/30 hidden sm:inline">|</span>
            <a 
              href={ecosystem.psychology}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E2D9CE] hover:text-[#FF7A00] transition-colors hidden md:flex"
            >
              <span>Psychology Platform</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSupportModalOpen(true)}
              className="flex items-center gap-1.5 text-[10px] font-mono text-[#E2D9CE] hover:text-[#FFA439] transition-colors"
              title="Open Academy Support Desk"
            >
              <LifeBuoy className="w-3 h-3 text-[#FFA439]" />
              <span className="hidden xs:inline">Support Desk</span>
            </button>
            <span className="text-[#FF7A00]/30 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#FFA439]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
              <span className="font-semibold tracking-wider font-mono">REDKROSS ACADEMY FOUNDATION</span>
            </div>
          </div>
        </div>

        {/* Floating Rounded-Full Main Navbar */}
        <div className="px-4 sm:px-8 pt-3">
          <div
            className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between gap-4 transition-all duration-300 pointer-events-auto liquid-glass-nav bg-transparent ${
              scrolled
                ? 'shadow-[0_16px_48px_rgba(0,0,0,0.85)] border-[#FF7A00]/40'
                : 'border-[#FF7A00]/30'
            }`}
          >
            {/* Brand Logo & Prestigious Title */}
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group flex-shrink-0 animate-slide-left">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black border border-[#FF7A00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.3)] group-hover:scale-105 transition-transform flex-shrink-0">
                <img
                  src="/assets/crest-clean-circle.png"
                  alt="RedKross Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-royal font-bold text-sm sm:text-base tracking-wider text-white leading-tight">
                  RedKross <span className="text-[#FF7A00]">Academy</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#E2D9CE] uppercase -mt-0.5">
                  Dual Division &bull; Cyber &bull; Psychology
                </span>
              </div>
            </Link>

            {/* Desktop Horizontal Navigation - Clean Spacing & Strict Zero Collision */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`text-xs font-mono font-medium transition-colors duration-200 relative py-1 whitespace-nowrap ${
                  location.pathname === '/' && !location.hash ? 'text-[#FF7A00] font-bold' : 'text-[#E2D9CE] hover:text-white'
                }`}
              >
                Home
                {location.pathname === '/' && !location.hash && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#FFA439] rounded-full shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
                )}
              </Link>

              <button
                type="button"
                onClick={handleAcademyClick}
                className={`text-xs font-mono font-medium transition-colors duration-200 relative py-1 whitespace-nowrap cursor-pointer ${
                  location.pathname === '/' && location.hash === '#academies'
                    ? 'text-[#FF7A00] font-bold'
                    : 'text-[#E2D9CE] hover:text-[#FFA439]'
                }`}
              >
                Academy
                {location.pathname === '/' && location.hash === '#academies' && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#FFA439] rounded-full shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
                )}
              </button>

              <Link
                to="/verify"
                onClick={closeMobileMenu}
                className={`text-xs font-mono font-medium transition-colors duration-200 relative py-1 whitespace-nowrap ${
                  isActive('/verify') ? 'text-[#FF7A00] font-bold' : 'text-[#E2D9CE] hover:text-white'
                }`}
              >
                Verify Credential
                {isActive('/verify') && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#FFA439] rounded-full shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
                )}
              </Link>
            </nav>

            {/* Right Action & Auth Elements */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Live Token Counter */}
              {currentUser && (
                <Link
                  to="/student/tokens"
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FFA439] hover:bg-[#FF7A00]/20 transition-all text-xs font-mono font-medium flex-shrink-0"
                  title="RedKross Reward Tokens"
                >
                  <Coins className="w-3.5 h-3.5 text-[#FFA439] animate-pulse" />
                  <span className="tabular-nums font-bold">{typeof tokenBalance === 'number' ? tokenBalance : 150}</span>
                  <span className="hidden md:inline text-[10px] text-[#FF7A00] uppercase">Tokens</span>
                </Link>
              )}

              {/* User Profile Dropdown or Slim Pill CTA Button */}
              {currentUser ? (
                <div className="relative flex-shrink-0" ref={profileMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0B1118]/90 hover:bg-[#131C26] border border-[#FF7A00]/30 hover:border-[#FFA439]/60 text-xs text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(255,122,0,0.15)] hover:shadow-[0_0_20px_rgba(255,122,0,0.25)]"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-[#FF7A00] to-[#CC4E00] border border-[#FFA439]/60 flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(255,122,0,0.35)]">
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
                        <span className="text-[10px] font-mono font-bold text-black">
                          {(fullName || 'C').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="max-w-[75px] md:max-w-[100px] truncate text-xs font-mono hidden sm:inline text-slate-100">
                      {fullName.split(' ')[0]}
                    </span>
                    {cadetId && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF7A00]/15 text-[#FFA439] border border-[#FF7A00]/35 hidden md:inline font-bold shadow-[0_0_6px_rgba(255,122,0,0.2)]">
                        {cadetId}
                      </span>
                    )}
                    {currentUser.role === 'super_admin' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF7A00]/25 text-[#FFA439] border border-[#FF7A00]/50 hidden lg:inline font-bold">
                        ADMIN
                      </span>
                    )}
                    <ChevronDown className="w-3 h-3 text-[#FFA439]/70" />
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
                          <div className="mt-1 text-[11px] font-mono text-[#FFA439] font-bold">
                            CADET: {cadetId}
                          </div>
                        )}
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FFA439]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                          <span>Role: {roleDisplay}</span>
                        </div>
                      </div>

                      <div className="py-1 text-xs font-mono">
                        <Link
                          to="/student"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-[#FFA439] hover:bg-[#1B2530] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#FFA439]" />
                          <span>Student Portal</span>
                        </Link>
                        {cadetId && (
                          <Link
                            to={`/verify/${cadetId}`}
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-[#FFA439] hover:bg-[#1B2530] transition-colors"
                          >
                            <Award className="w-4 h-4 text-[#FF7A00]" />
                            <span>My Verified Dossier</span>
                          </Link>
                        )}
                        <Link
                          to="/student/tokens"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-[#FFA439] hover:bg-[#1B2530] transition-colors"
                        >
                          <Coins className="w-4 h-4 text-[#FFA439]" />
                          <span>Token Ledger</span>
                        </Link>
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-black text-xs font-royal font-bold tracking-wider shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:scale-105 transition-all cursor-pointer uppercase font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #FF7A00, #FFA439)'
                  }}
                >
                  <span>Student Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-black" />
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
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/' && !location.hash
                      ? 'bg-[#FF7A00]/15 text-[#FFA439] font-bold border border-[#FF7A00]/30'
                      : 'text-slate-300 hover:bg-[#1B2530] hover:text-[#FFA439]'
                  }`}
                >
                  Home
                </Link>
                <button
                  type="button"
                  onClick={handleAcademyClick}
                  className={`px-3 py-2 rounded-lg transition-colors text-left ${
                    location.pathname === '/' && location.hash === '#academies'
                      ? 'bg-[#FF7A00]/15 text-[#FFA439] font-bold border border-[#FF7A00]/30'
                      : 'text-slate-300 hover:bg-[#1B2530] hover:text-[#FFA439]'
                  }`}
                >
                  Academy
                </button>
                <Link
                  to="/verify"
                  onClick={closeMobileMenu}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/verify')
                      ? 'bg-[#FF7A00]/15 text-[#FFA439] font-bold border border-[#FF7A00]/30'
                      : 'text-slate-300 hover:bg-[#1B2530] hover:text-[#FFA439]'
                  }`}
                >
                  Verify Credential
                </Link>
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
