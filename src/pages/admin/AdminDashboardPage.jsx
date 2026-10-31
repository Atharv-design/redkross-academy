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
import { socketClient } from '../../services/socket/socketClient';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    activeCourses: 0,
    issuedCerts: 0,
    revokedCerts: 0,
    enrolmentCount: 0,
    pendingAssignments: 0,
    pendingCertificates: 0,
    activeLockouts: 0,
    tokensCirculated: 0,
    publicCatalogEnabled: true
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [embargoToggling, setEmbargoToggling] = useState(false);
  const [embargoNotice, setEmbargoNotice] = useState('');

  const loadDashboardData = async () => {
    try {
      // First try unified API telemetry from PostgreSQL backend
      let apiData = null;
      try {
        apiData = await apiClient.getAdminTelemetry();
      } catch (err) {
        console.warn('Backend telemetry fallback to local:', err.message);
      }

      const stats = mockEngine.getRealDatabaseStats();
      const db = mockEngine.getDb();
      const tokens = (db?.users || []).reduce((sum, u) => sum + (u.token_balance || 0), 0);
      const logs = (apiData?.audit_logs && apiData.audit_logs.length > 0) ? apiData.audit_logs : (db?.audit_logs || []);

      const totalStudents = apiData?.metrics?.total_students ?? stats.totalStudents;
      const activeCourses = apiData?.metrics?.total_courses ?? stats.totalCourses;
      const issuedCerts = apiData?.metrics?.total_credentials_issued ?? stats.validCredentialsCount;
      const enrolmentCount = apiData?.metrics?.total_enrolments ?? stats.totalEnrolments;
      const tokensCirculated = apiData?.metrics?.total_tokens_circulated ?? tokens;
      const isPublic = apiData?.public_catalog_enabled !== undefined ? apiData.public_catalog_enabled : (db?.public_catalog_enabled !== false);

      setMetrics({
        totalStudents,
        activeCourses,
        issuedCerts,
        revokedCerts: stats.revokedCredentialsCount,
        enrolmentCount,
        pendingAssignments: stats.pendingAssignmentsCount,
        pendingCertificates: stats.pendingCertificatesCount,
        activeLockouts: stats.activeLockoutsCount,
        tokensCirculated,
        publicCatalogEnabled: isPublic
      });

      setRecentActivities(logs.slice(0, 6));
    } catch (e) {
      console.warn('Dashboard telemetry error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Universal Event Listeners: Local Bus & Live Sockets
    const unsubMock = mockEngine.subscribe(() => {
      loadDashboardData();
    });
    const unsubEmbargo = socketClient.on('catalog:visibility', loadDashboardData);
    const unsubCourse = socketClient.on('course:mutation', loadDashboardData);
    const unsubEnrol = socketClient.on('student:enrolled', loadDashboardData);
    const unsubAssign = socketClient.on('assignment:submitted', loadDashboardData);
    const unsubVio = socketClient.on('exam:violation', loadDashboardData);

    return () => {
      if (typeof unsubMock === 'function') unsubMock();
      if (typeof unsubEmbargo === 'function') unsubEmbargo();
      if (typeof unsubCourse === 'function') unsubCourse();
      if (typeof unsubEnrol === 'function') unsubEnrol();
      if (typeof unsubAssign === 'function') unsubAssign();
      if (typeof unsubVio === 'function') unsubVio();
    };
  }, []);

  const handleToggleCatalogEmbargo = async () => {
    setEmbargoToggling(true);
    setEmbargoNotice('');
    try {
      const nextState = !metrics.publicCatalogEnabled;
      // 1. Sync local memory
      mockEngine.setPublicCatalogEnabled(nextState);
      // 2. Sync PostgreSQL backend
      try {
        await apiClient.toggleCatalogVisibility(nextState);
      } catch (apiErr) {
        console.warn('Backend catalog toggle notice:', apiErr);
      }
      // 3. Broadcast to all student clients via WebSockets
      socketClient.emit('catalog:visibility', { enabled: nextState });

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
    <div className="space-y-8 font-sans animate-slide-left">
      {/* 1. TOP MACRO KPI ROW (Frosted Emerald Liquid Glass Cards) */}
      <div className="grid grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl ultra-glass-card space-y-2 relative overflow-hidden group animate-slide-left stagger-1 border border-[#65F58A]/30 border-t-white/20">
          <div className="flex items-center justify-between text-xs font-mono text-[#B8E6CE]">
            <span className="uppercase tracking-wider">Total Registered Cadets</span>
            <Users className="w-4 h-4 text-[#65F58A]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
            {metrics.totalStudents}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#65F58A]">
            <TrendingUp className="w-3 h-3" />
            <span>{metrics.enrolmentCount} active course enrolments</span>
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#65F58A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#65F58A]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl ultra-glass-card space-y-2 relative overflow-hidden group animate-slide-left stagger-2 border border-[#35E6B5]/30 border-t-white/20">
          <div className="flex items-center justify-between text-xs font-mono text-[#B8E6CE]">
            <span className="uppercase tracking-wider">Active Curriculum</span>
            <BookOpen className="w-4 h-4 text-[#35E6B5]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[#35E6B5] tabular-nums">
            {metrics.activeCourses} Courses
          </div>
          <div className="text-[11px] font-mono text-[#C9EFE0]">
            {metrics.pendingAssignments} assignments awaiting review
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#35E6B5]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#35E6B5]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl ultra-glass-card space-y-2 relative overflow-hidden group animate-slide-left stagger-3 border border-[#65F58A]/30 border-t-white/20">
          <div className="flex items-center justify-between text-xs font-mono text-[#B8E6CE]">
            <span className="uppercase tracking-wider">Valid Credentials</span>
            <Award className="w-4 h-4 text-[#65F58A]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[#65F58A] tabular-nums">
            {metrics.issuedCerts}
          </div>
          <div className="text-[11px] font-mono text-[#C9EFE0]">
            {metrics.revokedCerts > 0 ? `${metrics.revokedCerts} revoked` : '0 revoked'} • {metrics.pendingCertificates} pending dispatch
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#65F58A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#65F58A]/15 transition-all" />
        </div>

        <div className="p-5 rounded-2xl ultra-glass-card space-y-2 relative overflow-hidden group animate-slide-left stagger-4 border border-amber-400/30 border-t-white/20">
          <div className="flex items-center justify-between text-xs font-mono text-[#B8E6CE]">
            <span className="uppercase tracking-wider">Token Circulation</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
            {metrics.tokensCirculated.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-[#C9EFE0]">
            {metrics.activeLockouts > 0 ? `${metrics.activeLockouts} active 24h exam lockouts` : 'Operational health nominal'}
          </div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/15 transition-all" />
        </div>
      </div>

      {/* 2. CATALOG RELEASE EMBARGO MASTER SWITCH BANNER (Liquid Glass Panel) */}
      <div className="p-6 rounded-2xl ultra-glass-panel relative overflow-hidden shimmer-lr animate-slide-left stagger-2 border border-[#65F58A]/30 border-t-white/25">
        <div className="flex items-center justify-between">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${metrics.publicCatalogEnabled ? 'bg-[#65F58A] animate-pulse' : 'bg-amber-400'}`} />
              <h3 className="font-lora text-base font-bold text-white flex items-center gap-2">
                <span>Public Course Catalog Release Status</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  metrics.publicCatalogEnabled
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40'
                    : 'bg-amber-400/15 text-amber-400 border-amber-400/40'
                }`}>
                  {metrics.publicCatalogEnabled ? 'PUBLIC LIVE RELEASE' : 'EMBARGOED (COURSES WILL BE OUT SOON)'}
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#B8E6CE] font-mono leading-relaxed">
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
            {/* Interactive Tactical Toggle Button */}
            <button
              type="button"
              role="switch"
              aria-checked={metrics.publicCatalogEnabled}
              onClick={handleToggleCatalogEmbargo}
              disabled={embargoToggling}
              className={`group relative inline-flex items-center justify-center min-w-[175px] h-11 px-4 rounded-full transition-all duration-300 font-mono text-xs font-black cursor-pointer select-none ${
                metrics.publicCatalogEnabled
                  ? 'bg-[#06180E] border-2 border-[#65F58A] shadow-[0_0_25px_rgba(101,245,138,0.55),0_0_50px_rgba(101,245,138,0.25),inset_0_0_15px_rgba(101,245,138,0.2)]'
                  : 'bg-[#101712] border-2 border-amber-500/70 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
              } ${embargoToggling ? 'opacity-60 cursor-wait' : ''}`}
            >
              {/* Green radiant ring/lights around button when ON */}
              {metrics.publicCatalogEnabled && (
                <>
                  <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#65F58A]/50 via-[#35E6B5]/40 to-[#65F58A]/50 blur-md pointer-events-none animate-pulse" />
                  <span className="absolute -inset-2.5 rounded-full bg-[#65F58A]/20 blur-lg pointer-events-none" />
                </>
              )}

              {metrics.publicCatalogEnabled ? (
                <div className="relative z-10 w-full flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 pl-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65F58A] opacity-80" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#65F58A] shadow-[0_0_8px_#65F58A]" />
                    </span>
                    <span className="tracking-widest text-[#65F58A] font-extrabold text-[13px] drop-shadow-[0_0_8px_rgba(101,245,138,0.9)]">
                      LIVE
                    </span>
                  </span>
                  <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#65F58A] to-[#35E6B5] text-[#071018] flex items-center justify-center shadow-[0_0_15px_#65F58A] transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </span>
                </div>
              ) : (
                <div className="relative z-10 w-full flex items-center justify-center gap-2.5 text-amber-400 font-mono text-[12px] font-extrabold tracking-wider">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>EMBARGO CATALOG</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER SPLIT WORKSPACE: INFRASTRUCTURE & RECENT AUDITS */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Infrastructure & Subsystems (7 cols) */}
        <div className="col-span-7">
          <div className="p-6 rounded-2xl cyber-glass-panel space-y-4 border border-[#65F58A]/30 border-t-white/20">
            <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/20">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#35E6B5]" />
                <h3 className="font-lora text-base font-semibold text-white">System Infrastructure Telemetry</h3>
              </div>
              <span className="text-[11px] font-mono text-[#65F58A] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
                <span>ALL SUBSYSTEMS NOMINAL</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1 border border-[#65F58A]/25 border-t-white/15">
                <p className="text-[10px] text-[#B8E6CE] uppercase font-bold tracking-wider">Media CDN Edge</p>
                <p className="font-bold text-white">IndexedDB / HLS</p>
                <p className="text-[10px] text-[#65F58A]">Local Offline Sync</p>
              </div>
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1 border border-[#65F58A]/25 border-t-white/15">
                <p className="text-[10px] text-[#B8E6CE] uppercase font-bold tracking-wider">Database Sync</p>
                <p className="font-bold text-white">MockEngine EventBus</p>
                <p className="text-[10px] text-[#65F58A]">Sync interval 0s</p>
              </div>
              <div className="p-3.5 rounded-xl cyber-glass-card space-y-1 border border-[#35E6B5]/25 border-t-white/15">
                <p className="text-[10px] text-[#B8E6CE] uppercase font-bold tracking-wider">Proctor Telemetry</p>
                <p className="font-bold text-white">Anti-Cheat Tap</p>
                <p className="text-[10px] text-[#35E6B5]">Active Guard</p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="pt-2 flex items-center gap-3">
              <NavLink
                to="/admin/courses"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card border border-[#65F58A]/25 hover:border-[#65F58A]/60 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Curriculum & Lessons</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#65F58A]" />
              </NavLink>
              <NavLink
                to="/admin/quizzes"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card border border-[#35E6B5]/25 hover:border-[#35E6B5]/60 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Question Bank & Exams</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#35E6B5]" />
              </NavLink>
              <NavLink
                to="/admin/students"
                className="flex-1 py-2.5 px-4 rounded-xl cyber-glass-card border border-amber-400/25 hover:border-amber-400/60 text-xs font-mono text-white flex items-center justify-between transition-all"
              >
                <span>Cadet Directory</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Audit Stream (5 cols) */}
        <div className="col-span-5">
          <div className="p-6 rounded-2xl cyber-glass-panel space-y-4 border border-[#65F58A]/30 border-t-white/20">
            <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/20">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#65F58A]" />
                <h3 className="font-lora text-base font-semibold text-white">Recent Admin Activities</h3>
              </div>
              <NavLink
                to="/admin/audit-logs"
                className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1 font-bold"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3 h-3" />
              </NavLink>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {recentActivities.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl cyber-glass-card flex items-center justify-between border border-[#65F58A]/20"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-white font-semibold truncate">{log.action}</p>
                    <p className="text-[10px] text-[#B8E6CE] truncate mt-0.5">
                      Target: {log.target || log.details || 'System'}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#35E6B5] shrink-0 font-bold">{log.timestamp || 'Just now'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
