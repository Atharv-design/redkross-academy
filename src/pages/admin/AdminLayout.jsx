import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Award,
  Users,
  GraduationCap,
  LineChart,
  ShieldAlert,
  Settings,
  UserCheck,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  ExternalLink,
  Shield,
  Radio,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';
import { TreeNav } from '../../components/ui/tree-nav';
import PixelBackground from '../../components/ui/PixelBackground';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [counts, setCounts] = useState({
    activeCourses: 0,
    pendingQuizzes: 3,
    pendingGrading: 5,
    issuedCerts: 0,
    activeStudents: 0,
    expiringEnrollments: 2,
    securityAlerts: 1
  });

  // Calculate live badge counts from mockEngine database
  const refreshLiveCounts = () => {
    try {
      const db = mockEngine.getDb();
      if (db) {
        const publishedCourses = (db.courses || []).filter((c) => c.status === 'PUBLISHED' || !c.status).length;
        const certCount = (db.credentials || []).length;
        const studentCount = (db.users || []).filter((u) => u.role === 'student' || !u.role).length;
        const alerts = (db.audit_logs || []).filter((l) => l.severity === 'CRITICAL' || l.severity === 'WARN').length;

        setCounts((prev) => ({
          ...prev,
          activeCourses: publishedCourses,
          issuedCerts: certCount,
          activeStudents: studentCount,
          securityAlerts: alerts || 1
        }));
      }
    } catch (e) {
      console.warn('Could not load dynamic badge counts:', e);
    }
  };

  useEffect(() => {
    refreshLiveCounts();
    const unsubscribe = mockEngine.subscribe(() => {
      refreshLiveCounts();
    });
    return () => unsubscribe();
  }, [location.pathname]);

  // Global Cmd/Ctrl + K command palette listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine current page title in Lora Serif
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/courses')) return 'Course Management & Curriculum';
    if (path.includes('/admin/quizzes')) return 'Quizzes & Question Bank';
    if (path.includes('/admin/assignments')) return 'Assignments & Rubric Grading';
    if (path.includes('/admin/certificates')) return 'Certificates & Public Registry';
    if (path.includes('/admin/students')) return 'Student Directory & Identity';
    if (path.includes('/admin/enrollments')) return 'Enrollments & Cohort Assignment';
    if (path.includes('/admin/analytics')) return 'Learning Analytics & Telemetry';
    if (path.includes('/admin/audit-logs')) return 'Security Audit Logs & Compliance';
    if (path.includes('/admin/settings')) return 'Platform Configuration & Infrastructure';
    if (path.includes('/admin/profile')) return 'Admin Credentials & Session Security';
    return 'Executive Overview Dashboard';
  };

  // Canonical admin tree items with live counts
  const treeNavItems = [
    {
      label: 'Overview',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: 'Live'
    },
    {
      label: 'Courses',
      href: '/admin/courses',
      icon: BookOpen,
      badge: counts.activeCourses ? String(counts.activeCourses) : undefined
    },
    {
      label: 'Quizzes & Tests',
      href: '/admin/quizzes',
      icon: HelpCircle,
      badge: '3 rev'
    },
    {
      label: 'Assignments',
      href: '/admin/assignments',
      icon: FileCheck2,
      badge: 'queue'
    },
    {
      label: 'Certificates',
      href: '/admin/certificates',
      icon: Award,
      badge: counts.issuedCerts ? String(counts.issuedCerts) : 'Master'
    },
    {
      label: 'Students CRM',
      href: '/admin/students',
      icon: Users,
      badge: counts.activeStudents ? String(counts.activeStudents) : undefined
    },
    {
      label: 'Enrollments',
      href: '/admin/enrollments',
      icon: GraduationCap,
      badge: 'cohort'
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: LineChart,
      badge: 'realtime'
    },
    {
      label: 'Security Audits',
      href: '/admin/audit-logs',
      icon: ShieldAlert,
      badge: counts.securityAlerts ? `${counts.securityAlerts} alert` : undefined
    },
    {
      label: 'Platform Settings',
      href: '/admin/settings',
      icon: Settings
    },
    {
      label: 'My Account',
      href: '/admin/profile',
      icon: UserCheck
    }
  ];

  // Resolve active path for TreeNav
  const currentActivePath =
    location.pathname === '/admin' ? '/admin/dashboard' : location.pathname;

  return (
    <div className="flex h-screen bg-[#071018] text-[#F1F5F9] font-sans overflow-hidden select-none relative">
      {/* Cyber Theme Ambient Shimmer Pixel Grid */}
      <PixelBackground opacity={0.32} gap={22} pixelSize={2} />
      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#65f58a0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0 opacity-40" />

      {/* LEFT ULTRA-GLASS SIDEBAR WITH CYBER TREE-NAV */}
      <aside className="w-72 cyber-glass-panel border-r border-[#65F58A]/25 flex flex-col justify-between flex-shrink-0 z-30 relative">
        {/* Top Brand Header */}
        <div>
          <div className="h-20 flex items-center gap-3 px-6 border-b border-[#65F58A]/20">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl cyber-glass-card flex items-center justify-center border border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.25)]">
                <Shield className="w-5 h-5 text-[#65F58A]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#65F58A] ring-2 ring-[#060B11] animate-pulse" />
            </div>
            <div>
              <span className="font-bold tracking-wider text-sm font-sans block text-white flex items-center gap-1.5">
                <span>REDKROSS</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 font-bold">
                  ADMIN
                </span>
              </span>
              <span className="text-[10px] font-mono text-[#B8E6CE] tracking-widest block uppercase">
                CYBER WORKSTATION
              </span>
            </div>
          </div>

          {/* TreeNav Section */}
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-170px)] scrollbar-thin">
            <div className="mb-2 px-3 text-[10px] font-mono uppercase tracking-widest text-[#B8E6CE]/80 font-bold flex items-center justify-between">
              <span>WORKSTATION DIRECTORY</span>
              <span className="text-[9px] text-[#65F58A] font-semibold">11 SECTIONS</span>
            </div>

            {/* High-Craft Cyber Glass TreeNav */}
            <TreeNav
              items={treeNavItems}
              activeHref={currentActivePath}
              linkComponent={Link}
              className="py-1"
            />
          </div>
        </div>

        {/* Bottom User Clearance Strip & Back to Academy */}
        <div className="p-4 border-t border-[#65F58A]/20 cyber-glass-nav">
          <div className="cyber-glass-card rounded-xl p-3 flex items-center justify-between mb-2 border border-[#65F58A]/25">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-ping" />
              <span className="text-[#B8E6CE] text-[11px]">Security Clearance:</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#65F58A] px-2 py-0.5 rounded-md bg-[#65F58A]/15 border border-[#65F58A]/40">
              LEVEL 5 SEC
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl cyber-glass-card text-xs font-mono text-[#B8E6CE] hover:text-[#65F58A] transition-all border border-[#65F58A]/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Academy Portal</span>
          </Link>
        </div>
      </aside>

      {/* RIGHT CONTENT WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
        {/* TOP ULTRA-GLASS NAVBAR */}
        <header className="h-20 border-b border-[#65F58A]/25 cyber-glass-nav sticky top-0 z-40 px-8 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold font-lora text-white flex items-center gap-2">
              <span>{getPageTitle()}</span>
            </h1>
            <p className="text-xs text-[#B8E6CE] font-mono flex items-center gap-2 mt-0.5">
              <span>Host: academy.redkross.org.in</span>
              <span className="text-[#65F58A]/40">•</span>
              <span className="text-[#65F58A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-pulse" />
                <span>Live Synchronized Engine</span>
              </span>
            </p>
          </div>

          {/* Right Header Operations */}
          <div className="flex items-center gap-4">
            {/* Quick Cmd+K Global Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl cyber-glass-input text-xs font-mono text-[#94A3B8] hover:text-white transition-all shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-[#65F58A]" />
              <span className="hidden sm:inline">Search Workstation...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-white/[0.08] border border-white/[0.1] text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => navigate('/admin/audit-logs')}
                className="p-2 rounded-xl cyber-glass-card text-slate-300 hover:text-white relative cursor-pointer"
                aria-label="Audit alerts"
                title="View Security Audit Logs"
              >
                <Bell className="w-4 h-4" />
                {counts.securityAlerts > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                )}
              </button>
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full cyber-glass-card hover:border-[#65F58A]/40 text-xs text-white transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#65F58A] to-[#35E6B5] flex items-center justify-center font-bold text-[#071018] text-xs shadow-md">
                  A
                </div>
                <div className="text-left font-mono hidden md:block">
                  <span className="block text-xs font-bold leading-none text-white">Super Admin</span>
                  <span className="text-[10px] text-[#65F58A] font-semibold leading-none">Verified</span>
                </div>
                <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl cyber-glass-panel shadow-2xl p-2 z-50 animate-fadeIn font-mono text-xs border border-white/[0.12]">
                  <div className="p-2.5 border-b border-white/[0.08] mb-1">
                    <p className="text-white font-semibold">Administrator Access</p>
                    <p className="text-[10px] text-[#94A3B8] truncate">{currentUser?.email || 'admin@redkross.org.in'}</p>
                  </div>
                  <NavLink
                    to="/admin/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#35E6B5]" />
                    <span>My Account & 2FA</span>
                  </NavLink>
                  <NavLink
                    to="/admin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#65F58A]" />
                    <span>Platform Settings</span>
                  </NavLink>
                  <div className="my-1 border-t border-white/[0.08]" />
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (logout) logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-400 hover:bg-rose-500/15 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN OUTLET WORKSPACE CONTAINER */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* QUICK JUMP COMMAND PALETTE MODAL (Cmd/Ctrl + K) */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl cyber-glass-panel rounded-2xl shadow-2xl overflow-hidden font-mono text-xs border border-white/[0.15]">
            <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-white/[0.03]">
              <Search className="w-4 h-4 text-[#65F58A]" />
              <input
                type="text"
                autoFocus
                placeholder="Jump to route, course, or student directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-[#94A3B8] focus:outline-none"
              />
              <span className="text-[10px] text-[#94A3B8] border border-white/[0.1] px-1.5 py-0.5 rounded">
                ESC to close
              </span>
            </div>

            <div className="p-3 max-h-72 overflow-y-auto space-y-1">
              <p className="px-3 py-1 text-[10px] text-[#94A3B8] uppercase font-bold">Quick Routes</p>
              {[
                { name: 'Dashboard Overview', path: '/admin/dashboard' },
                { name: 'Courses & Curriculum', path: '/admin/courses' },
                { name: 'Quizzes & Question Bank', path: '/admin/quizzes' },
                { name: 'Assignments & Rubric Grading', path: '/admin/assignments' },
                { name: 'Certificates Engine', path: '/admin/certificates' },
                { name: 'Student Directory & Identity', path: '/admin/students' },
                { name: 'Enrollments & Cohorts', path: '/admin/enrollments' },
                { name: 'Learning Analytics', path: '/admin/analytics' },
                { name: 'Security Audit Logs', path: '/admin/audit-logs' },
                { name: 'Platform Settings', path: '/admin/settings' },
                { name: 'My Account & Profile', path: '/admin/profile' }
              ]
                .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((r) => (
                  <button
                    key={r.path}
                    onClick={() => {
                      navigate(r.path);
                      setCommandPaletteOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] text-[#94A3B8] hover:text-[#65F58A] transition-colors text-left"
                  >
                    <span>{r.name}</span>
                    <span className="text-[10px] text-slate-500">{r.path}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
