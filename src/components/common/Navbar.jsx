import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Coins, ExternalLink, Award, BookOpen, Layers, CheckCircle2, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function Navbar() {
  const { currentUser, tokenBalance, switchUser, loginWithGoogle } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const location = useLocation();
  const allUsers = mockEngine.getUsers();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-redkross-600/10 border border-redkross-600/30 flex items-center justify-center text-redkross-500 group-hover:cyber-glow-red transition-all">
                <Shield className="w-6 h-6 text-redkross-500" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight text-white font-mono">REDKROSS</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-redkross-600/20 text-redkross-400 font-mono font-semibold border border-redkross-600/30">
                    ACADEMY
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider">DEFENSIVE CYBER CERTIFICATION</p>
              </div>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-1 pl-4">
              <Link
                to="/paths"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
          <div className="flex items-center space-x-3">
            {/* Live Token Wallet Counter */}
            {currentUser && (
              <Link
                to="/student/tokens"
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-mono font-medium"
                title="RedKross Reward Tokens"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse-subtle" />
                <span className="tabular-nums font-bold">{tokenBalance}</span>
                <span className="text-[10px] text-amber-500/80 uppercase">Tokens</span>
              </Link>
            )}

            {/* Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-surface-100 border border-surface-border hover:border-slate-600 text-xs text-slate-300 transition-colors"
                title="Switch active role for PRD testing"
              >
                <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'super_admin' ? 'bg-redkross-500' : currentUser?.role === 'student_support' ? 'bg-cyber-cyan' : 'bg-cyber-emerald'}`} />
                <span className="capitalize font-mono hidden sm:inline">Role: {currentUser?.role?.replace('_', ' ') || 'Guest'}</span>
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

            {/* Portal Action Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                {currentUser.role === 'super_admin' ? (
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
                    className="px-3.5 py-1.5 rounded-md bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-md hover:cyber-glow-red"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Student Portal</span>
                  </Link>
                )}
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5"
              >
                <span>Sign In with Google</span>
              </button>
            )}

            {/* Back to Cybersecurity Link */}
            <a
              href="https://cyber.redkross.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors pl-2 border-l border-surface-border"
              title="Return to RedKross Cybersecurity"
            >
              <span>Cyber Platform</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
