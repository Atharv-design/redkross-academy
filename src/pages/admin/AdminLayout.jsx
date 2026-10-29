import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  useEffect(() => {
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

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          alias: '/admin',
          icon: LayoutDashboard,
          badge: <span className="flex h-2 w-2 rounded-full bg-[#65F58A] animate-pulse" title="Live Telemetry" />
        }
      ]
    },
    {
      title: 'ACADEMIC',
      items: [
        {
          name: 'Courses',
          path: '/admin/courses',
          icon: BookOpen,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1B2530] text-[#65F58A] border border-[#263440]">{counts.activeCourses}</span>
        },
        {
          name: 'Quizzes & Tests',
          path: '/admin/quizzes',
          icon: HelpCircle,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/30">{counts.pendingQuizzes} rev</span>
        },
        {
          name: 'Assignments',
          path: '/admin/assignments',
          icon: FileCheck2,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-400/10 text-purple-300 border border-purple-400/30">{counts.pendingGrading} queue</span>
        },
        {
          name: 'Certificates',
          path: '/admin/certificates',
          icon: Award,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30">{counts.issuedCerts} issued</span>
        }
      ]
    },
    {
      title: 'USERS',
      items: [
        {
          name: 'Students',
          path: '/admin/students',
          icon: Users,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1B2530] text-white border border-[#263440]">{counts.activeStudents} active</span>
        },
        {
          name: 'Enrollments',
          path: '/admin/enrollments',
          icon: GraduationCap,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/30">{counts.expiringEnrollments} exp</span>
        }
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        {
          name: 'Analytics',
          path: '/admin/analytics',
          icon: LineChart,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#65F58A] bg-[#65F58A]/10">↑ 14%</span>
        },
        {
          name: 'Audit Logs',
          path: '/admin/audit-logs',
          icon: ShieldAlert,
          badge: <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">{counts.securityAlerts} alert</span>
        }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: Settings,
          badge: <span className="h-1.5 w-1.5 rounded-full bg-[#35E6B5]" title="Config Ready" />
        },
        {
          name: 'My Account',
          path: '/admin/profile',
          icon: UserCheck,
          badge: <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#65F58A]/10 text-[#65F58A]">2FA ON</span>
        }
      ]
    }
  ];

  return (
    <div className="min-w-[1280px] w-full min-h-screen bg-[#071018] text-[#F1F5F9] font-sans flex antialiased selection:bg-[#65F58A]/30 selection:text-white overflow-x-auto">
      {/* 1. FIXED LEFT SIDEBAR (Width: 260px) */}
      <aside className="w-[260px] shrink-0 min-h-screen bg-[#0B1118] border-r border-[#263440] flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 px-5 border-b border-[#263440] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#101923] border border-[#65F58A]/40 flex items-center justify-center shadow-[0_0_12px_rgba(101,245,138,0.25)]">
                <Shield className="w-4 h-4 text-[#65F58A]" />
              </div>
              <div>
                <span className="font-mono text-xs font-black tracking-wider text-white">
                  REDKROSS <span className="text-[#65F58A]">LMS</span>
                </span>
                <p className="text-[10px] font-mono text-[#94A3B8]">Central Admin Console</p>
              </div>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-[#65F58A]" title="Server Online" />
          </div>

          {/* Sidebar Sections */}
          <nav className="p-3 space-y-6">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-1">
                <p className="px-3 text-[11px] font-mono font-semibold uppercase tracking-[0.05em] text-[#94A3B8]/70">
                  {sec.title}
                </p>
                <div className="space-y-0.5 pt-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      location.pathname === item.path ||
                      (item.alias && location.pathname === item.alias);

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all group ${
                          isActive
                            ? 'bg-[#14202C] text-[#65F58A] font-semibold border-r-2 border-[#65F58A] shadow-[inset_0_0_12px_rgba(101,245,138,0.06)]'
                            : 'text-[#94A3B8] hover:text-white hover:bg-[#101923]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-[#65F58A]' : 'text-[#94A3B8] group-hover:text-white'
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && <div className="shrink-0">{item.badge}</div>}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Link to Public Academy Portal */}
        <div className="p-3 border-t border-[#263440] bg-[#071018]/50">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl text-xs font-mono text-[#94A3B8] hover:text-[#65F58A] hover:bg-[#101923] border border-transparent hover:border-[#263440] transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Student Portal</span>
            </span>
            <span className="text-[10px] text-[#35E6B5]">Live ↗</span>
          </a>
        </div>
      </aside>

      {/* 2. MAIN DESKTOP WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER (Fixed Height: 64px) */}
        <header className="h-16 px-6 border-b border-[#263440] bg-[#0A1118]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-6">
          {/* Left: Prominent Page Title in Lora Serif */}
          <div className="flex items-center gap-3">
            <h1 className="font-lora text-lg font-semibold text-white tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Center: Command Palette Search Bar (Cmd/Ctrl + K) */}
          <div className="flex-1 max-w-md mx-auto">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#101923] border border-[#263440] text-xs font-mono text-[#94A3B8] hover:border-[#65F58A]/50 transition-colors shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Search courses, students, quizzes...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-[#071018] border border-[#263440] text-[10px] font-mono text-white">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Notifications Bell & Admin Profile Dropdown */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => navigate('/admin/audit-logs')}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#101923] relative transition-colors border border-transparent hover:border-[#263440]"
              title="Security Alerts & Audit Stream"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {/* Admin Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-[#101923] hover:bg-[#152230] border border-[#263440] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#65F58A]/20 border border-[#65F58A]/40 flex items-center justify-center font-mono text-xs font-bold text-[#65F58A]">
                  SA
                </div>
                <div className="text-left leading-tight hidden xl:block">
                  <p className="text-xs font-mono font-semibold text-white">Super Admin</p>
                  <p className="text-[10px] font-mono text-[#94A3B8] truncate max-w-[120px]">
                    {currentUser?.email || 'admin@redkross.org.in'}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#101923] border border-[#263440] shadow-2xl p-2 z-50 animate-fadeIn font-mono text-xs">
                  <div className="p-2.5 border-b border-[#263440] mb-1">
                    <p className="text-white font-semibold">Administrator Access</p>
                    <p className="text-[10px] text-[#94A3B8] truncate">{currentUser?.email || 'admin@redkross.org.in'}</p>
                  </div>
                  <NavLink
                    to="/admin/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1B2530]"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#35E6B5]" />
                    <span>My Account & 2FA</span>
                  </NavLink>
                  <NavLink
                    to="/admin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1B2530]"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#65F58A]" />
                    <span>Platform Settings</span>
                  </NavLink>
                  <div className="my-1 border-t border-[#263440]" />
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (logout) logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN OUTLET CONTAINER */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* QUICK JUMP COMMAND PALETTE MODAL (Cmd/Ctrl + K) */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0B131B] border border-[#263440] rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
            <div className="p-4 border-b border-[#263440] flex items-center gap-3 bg-[#101923]">
              <Search className="w-4 h-4 text-[#65F58A]" />
              <input
                type="text"
                autoFocus
                placeholder="Jump to route, course, or student directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-[#94A3B8] focus:outline-none"
              />
              <span className="text-[10px] text-[#94A3B8] border border-[#263440] px-1.5 py-0.5 rounded">
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
                { name: 'Platform Settings', path: '/admin/settings' }
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
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#14202C] text-[#94A3B8] hover:text-[#65F58A] transition-colors text-left"
                  >
                    <span>{r.name}</span>
                    <span className="text-[10px] text-[#263440]">{r.path}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
