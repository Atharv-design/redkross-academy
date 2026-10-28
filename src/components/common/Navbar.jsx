import React, { useState } from 'react';
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
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';
import SupportTicketModal from './SupportTicketModal';

export default function Navbar() {
  const { currentUser, tokenBalance, switchUser, loginWithGoogle } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const location = useLocation();
  const allUsers = mockEngine.getUsers();

  const isCurrent = (path) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#090D16]/95 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-6">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-redkross-600/10 border border-redkross-600/30 flex items-center justify-center text-redkross-500 group-hover:cyber-glow-red transition-all">
                  <Shield className="w-6 h-6 text-redkross-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base sm:text-lg tracking-tight text-white font-mono">REDKROSS</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-redkross-600/20 text-redkross-400 font-mono font-semibold border border-redkross-600/30">
                      ACADEMY
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wider">DEFENSIVE CYBER CERTIFICATION</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1 pl-2">
                <Link
                  to="/paths"
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    isCurrent('/paths') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:text-white hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-cyber-cyan" />
                    <span>Learning Paths</span>
                  </div>
                </Link>
                <Link
                  to="/courses"
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    isCurrent('/courses') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:text-white hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-redkross-500" />
                    <span>Catalogue</span>
                  </div>
                </Link>
                <Link
                  to="/verify"
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/verify') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:text-white hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-cyber-emerald" />
                    <span>Verify Credential</span>
                  </div>
                </Link>
              </nav>
            </div>

            {/* Right Actions & Auth */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Support Desk Trigger */}
              <button
                onClick={() => setSupportModalOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-surface-100 hover:bg-surface-200 border border-surface-border text-xs text-slate-300 transition-colors"
                title="Open Academy Support Desk"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-cyber-cyan" />
                <span className="hidden lg:inline">Support</span>
              </button>

              {/* Live Token Wallet Counter */}
              {currentUser && (
                <Link
                  to="/student/tokens"
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-mono font-medium"
                  title="RedKross Reward Tokens"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse-subtle" />
                  <span className="tabular-nums font-bold">{tokenBalance}</span>
                  <span className="hidden sm:inline text-[10px] text-amber-500/80 uppercase">Tokens</span>
                </Link>
              )}

              {/* Desktop Role Switcher Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-surface-100 border border-surface-border hover:border-slate-600 text-xs text-slate-300 transition-colors"
                  title="Switch active role for PRD verification"
                >
                  <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'super_admin' ? 'bg-redkross-500' : currentUser?.role === 'student_support' ? 'bg-cyber-cyan' : 'bg-cyber-emerald'}`} />
                  <span className="capitalize font-mono">Role: {currentUser?.role?.replace('_', ' ') || 'Guest'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-surface-card border border-surface-border shadow-2xl py-1 z-50">
                    <div className="px-3 py-2 border-b border-surface-border text-[11px] text-slate-400 uppercase font-mono">
                      Simulate Role (PRD Handover)
                    </div>
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-surface-100 ${
                          currentUser?.id === u.id ? 'text-redkross-400 font-semibold bg-redkross-950/20' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-white">{u.full_name}</div>
                          <div className="text-[10px] text-slate-400 font-mono capitalize">{u.role.replace('_', ' ')}</div>
                        </div>
                        {currentUser?.id === u.id && <CheckCircle2 className="w-4 h-4 text-redkross-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Portal Action Buttons (Desktop) */}
              <div className="hidden sm:flex items-center space-x-2">
                {currentUser ? (
                  currentUser.role === 'super_admin' ? (
                    <Link
                      to="/admin"
                      className="px-3 py-1.5 rounded-md bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Admin Portal</span>
                    </Link>
                  ) : (
                    <Link
                      to="/student"
                      className="px-3 py-1.5 rounded-md bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-md hover:cyber-glow-red"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Student Portal</span>
                    </Link>
                  )
                ) : (
                  <button
                    onClick={loginWithGoogle}
                    className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5"
                  >
                    <span>Sign In</span>
                  </button>
                )}
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-surface-100 border border-surface-border text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-[#090D16]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-2xl">
            {/* Primary Mobile Navigation */}
            <nav className="space-y-1">
              <Link
                to="/paths"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/paths') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:bg-surface-50'
                }`}
              >
                <Layers className="w-5 h-5 text-cyber-cyan" />
                <span>Learning Paths</span>
              </Link>
              <Link
                to="/courses"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/courses') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:bg-surface-50'
                }`}
              >
                <BookOpen className="w-5 h-5 text-redkross-500" />
                <span>Course Catalogue</span>
              </Link>
              <Link
                to="/verify"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/verify') ? 'text-white bg-surface-100 border border-surface-border' : 'text-slate-300 hover:bg-surface-50'
                }`}
              >
                <Award className="w-5 h-5 text-cyber-emerald" />
                <span>Verify Credential</span>
              </Link>
              {currentUser && (
                <Link
                  to="/student/tokens"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400"
                >
                  <div className="flex items-center space-x-3">
                    <Coins className="w-5 h-5 text-amber-400" />
                    <span>Token Wallet</span>
                  </div>
                  <span className="font-mono font-bold">{tokenBalance} Tokens</span>
                </Link>
              )}
            </nav>

            {/* Portal Action for Mobile */}
            <div className="pt-2 border-t border-surface-border/50">
              {currentUser ? (
                currentUser.role === 'super_admin' ? (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-lg bg-redkross-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Open Admin Portal</span>
                  </Link>
                ) : (
                  <Link
                    to="/student"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-lg bg-redkross-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg hover:cyber-glow-red"
                  >
                    <User className="w-4 h-4" />
                    <span>Open Student Portal</span>
                  </Link>
                )
              ) : (
                <button
                  onClick={() => {
                    loginWithGoogle();
                    closeMobileMenu();
                  }}
                  className="w-full py-2.5 rounded-lg bg-white text-slate-900 text-xs font-bold flex items-center justify-center space-x-2"
                >
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>

            {/* Mobile Role Switcher */}
            <div className="pt-2 border-t border-surface-border/50">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">Switch Active Role</div>
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
                        ? 'border-redkross-500 bg-redkross-950/40 text-redkross-400 font-bold'
                        : 'border-surface-border bg-surface-100 text-slate-300'
                    }`}
                  >
                    <div className="truncate">{u.full_name.split(' ')[0]}</div>
                    <div className="text-[9px] text-slate-400 capitalize">{u.role.replace('_', ' ')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support and Cyber Platform Links */}
            <div className="pt-2 border-t border-surface-border/50 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  closeMobileMenu();
                  setSupportModalOpen(true);
                }}
                className="flex items-center space-x-1.5 text-cyber-cyan hover:underline"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Support Desk</span>
              </button>
              <a
                href="https://cyber.redkross.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-slate-400 hover:text-white"
              >
                <span>Cyber Platform</span>
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
