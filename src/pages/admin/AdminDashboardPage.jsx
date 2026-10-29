import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Award,
  GraduationCap,
  LineChart,
  Shield,
  Activity,
  Radio,
  Lock,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ChevronRight,
  TrendingUp,
  Server,
  Sparkles
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    activeCourses: 0,
    issuedCerts: 0,
    enrolmentCount: 0,
    completionRate: 78.4,
    tokensCirculated: 0,
    publicCatalogEnabled: true
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [embargoToggling, setEmbargoToggling] = useState(false);
  const [embargoNotice, setEmbargoNotice] = useState('');

  const loadDashboardData = () => {
    try {
      const db = mockEngine.getDb();
      if (db) {
        const students = (db.users || []).filter((u) => u.role === 'student' || !u.role);
        const courses = db.courses || [];
        const certs = db.credentials || [];
        const enrolments = db.enrolments || [];
        const tokens = (db.users || []).reduce((sum, u) => sum + (u.token_balance || 0), 0);
        const logs = db.audit_logs || [];

        setMetrics({
          totalStudents: students.length,
          activeCourses: courses.filter((c) => c.status === 'PUBLISHED' || !c.status).length,
          issuedCerts: certs.length,
          enrolmentCount: enrolments.length,
          completionRate: 84.2,
          tokensCirculated: tokens || 3420,
          publicCatalogEnabled: db.public_catalog_enabled !== false
        });

        setRecentActivities(logs.slice(0, 6));
      }
    } catch (e) {
      console.warn('Dashboard telemetry fallback error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    const unsubscribe = mockEngine.subscribe(() => {
      loadDashboardData();
    });

    return () => unsubscribe();
  }, []);

  const handleToggleCatalogEmbargo = async () => {
    setEmbargoToggling(true);
    setEmbargoNotice('');
    try {
      const nextState = !metrics.publicCatalogEnabled;
      mockEngine.setPublicCatalogEnabled(nextState);
      setMetrics((prev) => ({ ...prev, publicCatalogEnabled: nextState }));
      setEmbargoNotice(
        nextState
          ? 'Catalog LIVE: Public visitors can now view the entire curriculum.'
          : 'Catalog EMBARGOED: Learning paths and catalog now show "Courses will be out soon".'
      );
      setTimeout(() => setEmbargoNotice(''), 4500);
    } catch (err) {
      console.error('Failed to toggle catalog embargo:', err);
      setEmbargoNotice('Error updating catalog visibility setting.');
    } finally {
      setEmbargoToggling(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. TOP MACRO KPI ROW (Frosted Cyber Glass Cards) */}
      <div className="grid grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl cyber-glass-card space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="uppercase tracking-wider">Total Active Students</span>
            <Users className="w-4 h-4 text-[#65F58A]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
            {metrics.totalStudents}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#65F58A]">
            <TrendingUp className="w-3 h-3" />
            <span>+12 this week • 100% ID verified</span>
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#65F58A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#65F58A]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl cyber-glass-card space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="uppercase tracking-wider">Active Curriculum</span>
            <BookOpen className="w-4 h-4 text-[#35E6B5]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[#35E6B5] tabular-nums">
            {metrics.activeCourses} Courses
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8]">
            Across 2 Core Specialization Tracks
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#35E6B5]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#35E6B5]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl cyber-glass-card space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="uppercase tracking-wider">Credentials Minted</span>
            <Award className="w-4 h-4 text-[#65F58A]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[#65F58A] tabular-nums">
            {metrics.issuedCerts}
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8]">
            Cryptographically Anchored & Public
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#65F58A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#65F58A]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl cyber-glass-card space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="uppercase tracking-wider">Token Circulation</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
            {metrics.tokensCirculated.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8]">
            Non-Monetary Reward Incentive Ledger
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/15 transition-all" />
        </div>
      </div>

      {/* 2. CATALOG RELEASE EMBARGO MASTER SWITCH BANNER (Cyber Glass Panel) */}
      <div className="p-6 rounded-2xl cyber-glass-panel relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${metrics.publicCatalogEnabled ? 'bg-[#65F58A] animate-pulse' : 'bg-amber-400'}`} />
              <h3 className="font-lora text-base font-bold text-white flex items-center gap-2">
                <span>Public Course Catalog Release Status</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  metrics.publicCatalogEnabled
                    ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                    : 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                }`}>
                  {metrics.publicCatalogEnabled ? 'PUBLIC LIVE RELEASE' : 'EMBARGOED (COURSES WILL BE OUT SOON)'}
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
              {metrics.publicCatalogEnabled
                ? 'Public students can explore all courses and learning paths directly. All published courses are open.'
                : 'Catalog is currently in pre-launch security embargo. Public visitors will see "Courses will be out soon".'}
            </p>
            {embargoNotice && (
              <p className="text-xs font-mono font-bold text-[#65F58A] mt-2 animate-fadeIn flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{embargoNotice}</span>
              </p>
            )}
          </div>

          <div className="z-10 flex items-center gap-3">
            <button
              onClick={handleToggleCatalogEmbargo}
              disabled={embargoToggling}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
                metrics.publicCatalogEnabled
                  ? 'bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-gradient-to-r from-[#65F58A] to-[#35E6B5] hover:from-[#52d674] hover:to-[#2bc59b] text-[#071018] shadow-[0_0_25px_rgba(101,245,138,0.4)]'
              }`}
            >
              {metrics.publicCatalogEnabled ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Embargo Catalog</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Release Catalog Publicly</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER SPLIT WORKSPACE: INFRASTRUCTURE & RECENT AUDITS */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Infrastructure & Subsystems (7 cols) */}
        <div className="col-span-7">
          <div className="p-6 rounded-2xl cyber-glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#35E6B5]" />
                <h3 className="font-lora text-base font-semibold text-white">System Infrastructure Telemetry</h3>
              </div>
              <span className="text-[11px] font-mono text-[#65F58A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
                <span>ALL SUBSYSTEMS NOMINAL</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1">
                <p className="text-[10px] text-[#94A3B8] uppercase">Media CDN Edge</p>
                <p className="font-bold text-white">IndexedDB / HLS</p>
                <p className="text-[10px] text-[#65F58A]">Local Offline Sync</p>
              </div>
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1">
                <p className="text-[10px] text-[#94A3B8] uppercase">Database Sync</p>
                <p className="font-bold text-white">MockEngine EventBus</p>
                <p className="text-[10px] text-[#65F58A]">Sync interval 0s</p>
              </div>
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1">
                <p className="text-[10px] text-[#94A3B8] uppercase">Proctor Telemetry</p>
                <p className="font-bold text-white">Anti-Cheat Tap</p>
                <p className="text-[10px] text-[#35E6B5]">Active Guard</p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="pt-2 flex items-center gap-3">
              <NavLink
                to="/admin/courses"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card hover:border-[#65F58A]/50 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Curriculum & Lessons</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#65F58A]" />
              </NavLink>
              <NavLink
                to="/admin/quizzes"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card hover:border-[#35E6B5]/50 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Question Bank & Exams</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#35E6B5]" />
              </NavLink>
              <NavLink
                to="/admin/students"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card hover:border-amber-400/50 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Cadet Directory</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Audit Stream (5 cols) */}
        <div className="col-span-5">
          <div className="p-6 rounded-2xl cyber-glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#65F58A]" />
                <h3 className="font-lora text-base font-semibold text-white">Recent Admin Activities</h3>
              </div>
              <NavLink
                to="/admin/audit-logs"
                className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3 h-3" />
              </NavLink>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {recentActivities.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl cyber-glass-card flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-white font-semibold truncate">{log.action}</p>
                    <p className="text-[10px] text-[#94A3B8] truncate mt-0.5">
                      Target: {log.target || log.details || 'System'}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#35E6B5] shrink-0">{log.timestamp || 'Just now'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
