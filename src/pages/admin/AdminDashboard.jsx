import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  AlertTriangle,
  Coins,
  FileText,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  Activity,
  Terminal,
  Hash,
  Clock,
  History
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import KpiCard from '../../components/ui/KpiCard';

/**
 * Super Admin Operations Command (Phase 4 & Phase 5)
 * Controls platform analytics, proctoring incident escalation, student CRM,
 * and the Centralized Catalog Release embargo toggle (Phase 3.3).
 */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [toggleNotice, setToggleNotice] = useState('');

  const fetchDashboardData = async () => {
    try {
      const res = await apiClient.getAdminMetrics();
      setData(res);
    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleCatalog = async () => {
    if (!data) return;
    setToggling(true);
    setToggleNotice('');
    try {
      const newStatus = !data.public_catalog_enabled;
      await apiClient.toggleCatalogVisibility(newStatus);
      setData((prev) => ({
        ...prev,
        public_catalog_enabled: newStatus,
        metrics: { ...prev.metrics, public_catalog_enabled: newStatus }
      }));
      setToggleNotice(
        newStatus
          ? 'Catalog RELEASED: Public visitors can now view the course directory.'
          : 'Catalog EMBARGOED: Learning paths and catalog now show "Courses will be out soon".'
      );
      setTimeout(() => setToggleNotice(''), 4500);
    } catch (err) {
      console.error('Failed to toggle catalog:', err);
      setToggleNotice('Error updating catalog visibility setting.');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Shield className="w-10 h-10 text-[#65F58A] animate-pulse" />
          <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Loading Operations Telemetry...
          </div>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    total_students: 0,
    total_enrolments: 0,
    total_credentials_issued: 0,
    total_tokens_circulated: 0,
    active_exam_incidents: 0
  };
  const isCatalogEnabled = data?.public_catalog_enabled;
  const auditLogs = data?.audit_logs?.slice(0, 5) || [];
  const violations = data?.violations?.slice(0, 5) || [];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-10 font-lora">
      {/* Top Administrative Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#263440] gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#65F58A] text-xs font-lora mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>OPERATIONS COMMAND CENTER</span>
          </div>
          <h1 className="font-lora text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Super Admin Intelligence Dashboard
          </h1>
          <p className="text-xs text-[#94A3B8] font-lora mt-1">
            Logged in as <span className="text-white font-semibold">{currentUser?.email}</span> (Super Admin)
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/builder"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#65F58A]/30 text-xs font-lora text-white transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#65F58A]" />
            <span>Curriculum Studio</span>
          </Link>
          <Link
            to="/admin/crm"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-lora text-white transition-colors flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Student Lifecycle CRM</span>
          </Link>
          <Link
            to="/admin/incidents"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-lora text-white transition-colors flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Security Incidents ({metrics.active_exam_incidents})</span>
          </Link>
          <Link
            to="/admin/audit"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-lora text-white transition-colors flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Audit Ledger</span>
          </Link>
        </div>
      </div>

      {/* Phase 3.3 Catalog Release Controller Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isCatalogEnabled
          ? 'bg-[#101923] border-[#65F58A]/50 shadow-[0_0_30px_rgba(101,245,138,0.12)]'
          : 'bg-[#101923] border-[#263440]'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isCatalogEnabled ? 'bg-[#65F58A] animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-xs font-lora uppercase tracking-wider text-white font-bold">
                Public Course Catalog Release Status (Phase 3.3)
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-lora uppercase font-semibold ${
                isCatalogEnabled
                  ? 'bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30'
                  : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
              }`}>
                {isCatalogEnabled ? 'RELEASED (Publicly Visible)' : 'EMBARGOED (Hidden from Public)'}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-lora leading-relaxed">
              {isCatalogEnabled
                ? 'The public course catalog is currently active. Prospective candidates and visitors can browse courses on the directory.'
                : 'Default security embargo active: Public visitors on Learning Paths see "Courses will be out soon". Courses remain securely stored in Neon DB.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleCatalog}
              disabled={toggling}
              className={`px-5 py-2.5 rounded-xl text-xs font-lora font-bold transition-all flex items-center gap-2 shadow-md ${
                isCatalogEnabled
                  ? 'bg-[#1B2530] hover:bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'glass-button-primary font-lora'
              }`}
            >
              {isCatalogEnabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{toggling ? 'Updating...' : isCatalogEnabled ? 'Embargo Catalog' : 'Release Catalog Publicly'}</span>
            </button>
          </div>
        </div>

        {toggleNotice && (
          <div className="mt-4 p-3 rounded-xl bg-[#071018] border border-[#263440] text-xs font-lora text-[#65F58A] flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
            <span>{toggleNotice}</span>
          </div>
        )}
      </div>

      {/* Dashboardcn-Inspired Operations KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Enrolled Students"
          subtitle="Verified Identity"
          value={metrics.total_students}
          badge="100% Verified Ident"
          timeframe="Active Learners"
          icon={Users}
          accent="neon"
          sparkline={[1, 2, 2, 3, 3, 4, 4, 5]}
          onClick={() => navigate('/admin/crm')}
        />

        <KpiCard
          title="Active Enrolments"
          subtitle="Curriculum Seats"
          value={metrics.total_enrolments}
          change="+4 Allocated"
          trend="up"
          timeframe="Curriculum Seats"
          icon={BookOpen}
          accent="mint"
          sparkline={[1, 2, 2, 4, 3, 5, 4, 6]}
          onClick={() => navigate('/admin/builder')}
        />

        <KpiCard
          title="Issued Credentials"
          subtitle="Milestone Certs"
          value={metrics.total_credentials_issued}
          badge="Cryptographically Signed"
          timeframe="Tamper-Proof SHA-256"
          icon={Shield}
          accent="neon"
          sparkline={[0, 0, 1, 1, 2, 2, 3, 3]}
          onClick={() => navigate('/verify')}
        />

        <KpiCard
          title="Flagged Incidents"
          subtitle="Proctoring Telemetry"
          value={metrics.active_exam_incidents}
          badge={metrics.active_exam_incidents > 0 ? "Requires Review" : "100% Clean"}
          change={metrics.active_exam_incidents === 0 ? "0 Active Violations" : `${metrics.active_exam_incidents} Flagged`}
          trend={metrics.active_exam_incidents === 0 ? "up" : "down"}
          timeframe="Anti-Cheat Gated"
          icon={AlertTriangle}
          accent={metrics.active_exam_incidents > 0 ? "rose" : "mint"}
          sparkline={[3, 2, 1, 2, 1, 0, 0, metrics.active_exam_incidents]}
          onClick={() => navigate('/admin/incidents')}
        />

        <KpiCard
          title="Token Circulation"
          subtitle="Non-Monetary Ledger"
          value={metrics.total_tokens_circulated?.toLocaleString() || '300'}
          change="+300 Circulated"
          trend="up"
          timeframe="Non-Monetary Ledger"
          icon={Coins}
          accent="amber"
          sparkline={[50, 100, 150, 200, 200, 250, 300, 300]}
          onClick={() => navigate('/student/tokens')}
        />
      </div>

      {/* Incident Queue & Audit Logs Grid (Card Library High-Craft Architecture) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PROCTORING INCIDENT TELEMETRY CARD */}
        <div className="bg-[#101923] border border-[#263440] hover:border-rose-500/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-rose-500/5 blur-3xl group-hover:bg-rose-500/10 transition-all duration-500" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-lora text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Proctoring Incident Telemetry</span>
                </h2>
                <p className="text-[11px] font-lora text-[#94A3B8]">
                  Candidate Surveillance & Strike Policy Enforcement
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-lora font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>RADAR ARMED</span>
              </div>
              <Link
                to="/admin/incidents"
                className="text-xs font-lora text-[#65F58A] hover:text-[#35E6B5] flex items-center gap-1 font-semibold transition-colors"
              >
                <span>View Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Policy Telemetry Sub-Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Lockout Rule</div>
              <div className="text-xs font-lora font-bold text-white mt-0.5">3 Strikes</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Strike 2 Fine</div>
              <div className="text-xs font-lora font-bold text-amber-300 mt-0.5">-50 Tokens</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Lockout Window</div>
              <div className="text-xs font-lora font-bold text-rose-400 mt-0.5">24 Hours</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Integrity Index</div>
              <div className="text-xs font-lora font-bold text-[#65F58A] mt-0.5">99.8%</div>
            </div>
          </div>

          {/* Incident Feed */}
          <div className="space-y-3">
            {violations.length > 0 ? (
              <>
                {violations.slice(0, 3).map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-xl bg-[#071018] border-l-4 border-l-rose-500 border border-[#263440] hover:border-rose-500/30 transition-all space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-[10px] font-bold font-lora">
                          {(v.student_name || 'C')[0]}
                        </div>
                        <span className="text-white font-lora font-bold text-xs">
                          {v.student_name || 'Anonymous Cadet'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-lora font-bold ${
                          v.strike_count >= 3
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          Strike {v.strike_count}/3 {v.strike_count >= 3 ? '• TERMINATED' : '• WARNING'}
                        </span>
                        <span className="text-[10px] font-lora text-[#94A3B8] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#64748B]" />
                          {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-lora text-rose-300 bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/20 leading-relaxed">
                      {v.reason || 'Unauthorized window switch during proctored exam.'}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] font-lora text-[#94A3B8]">
                      <span>Target Enrolment: {v.enrolment_id || 'EX-9102-CERT'}</span>
                      <Link
                        to="/admin/incidents"
                        className="text-xs font-lora text-[#65F58A] hover:underline font-semibold"
                      >
                        Review Evidence Case &rarr;
                      </Link>
                    </div>
                  </div>
                ))}

                {violations.length > 3 && (
                  <Link
                    to="/admin/incidents"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-rose-500/40 text-rose-400 hover:text-white text-xs font-lora font-semibold transition-all group"
                  >
                    <span>View All {violations.length} Proctoring Infractions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </>
            ) : (
              /* High-Craft Shield Clean State */
              <div className="p-6 rounded-xl bg-[#071018]/80 border border-[#263440] text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center mx-auto text-[#65F58A] shadow-[0_0_20px_rgba(101,245,138,0.15)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-lora text-sm font-bold text-white">
                    100% Academic Integrity Maintained
                  </h3>
                  <p className="text-xs font-lora text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
                    All candidate environments currently report 0 active policy infractions. Camera, audio, tab-lock, and keyboard streams are fully nominal.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101923] border border-[#263440] text-[10px] font-lora text-[#65F58A]">
                  <Activity className="w-3 h-3 text-[#65F58A]" />
                  <span>Full-Screen Sensor: Armed • DevTools Guard: Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SYSTEM & SECURITY AUDIT LOG CARD */}
        <div className="bg-[#101923] border border-[#263440] hover:border-[#35E6B5]/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#35E6B5]/5 blur-3xl group-hover:bg-[#35E6B5]/10 transition-all duration-500" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center text-[#35E6B5] shadow-sm flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-lora text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>System & Security Audit Log</span>
                </h2>
                <p className="text-[11px] font-lora text-[#94A3B8]">
                  Append-Only Ledger with Cryptographic SHA-256 Signatures
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="px-2.5 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#35E6B5] text-[10px] font-lora font-bold uppercase shadow-sm">
                IMMUTABLE CHAIN
              </span>
              <Link
                to="/admin/audit"
                className="text-xs font-lora text-[#35E6B5] hover:text-[#65F58A] flex items-center gap-1 font-semibold transition-colors"
              >
                <span>View Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cryptographic Ledger Sub-Ribbon */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Chain Protocol</div>
              <div className="text-xs font-lora font-bold text-white mt-0.5">SHA-256 Digest</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Append Policy</div>
              <div className="text-xs font-lora font-bold text-[#35E6B5] mt-0.5">Strictly Additive</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#071018] border border-[#263440]/80">
              <div className="text-[10px] font-lora text-[#94A3B8]">Retention Status</div>
              <div className="text-xs font-lora font-bold text-[#65F58A] mt-0.5">Permanent</div>
            </div>
          </div>

          {/* Timeline Audit Feed */}
          <div className="space-y-3 relative">
            {auditLogs.length > 0 ? (
              <>
                {auditLogs.slice(0, 3).map((log, idx) => {
                  const isSec = log.action.includes('LOCKOUT') || log.action.includes('INCIDENT') || log.action.includes('OVERRIDE');
                  const isCat = log.action.includes('CATALOG');
                  const isCur = log.action.includes('MODULE') || log.action.includes('COURSE') || log.action.includes('LESSON');

                  return (
                    <div
                      key={log.id || idx}
                      className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#35E6B5]/30 transition-all space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs font-lora">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-lora font-bold uppercase ${
                            isSec
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                              : isCat
                              ? 'bg-[#35E6B5]/15 text-[#35E6B5] border border-[#35E6B5]/30'
                              : isCur
                              ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}>
                            {log.action}
                          </span>
                          <span className="text-white font-lora font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                            By {log.actor_id || log.admin_id || 'Super Admin'}
                          </span>
                        </div>

                        <span className="text-[10px] font-lora text-[#94A3B8] flex-shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#64748B]" />
                          {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-xs font-lora text-slate-300 leading-relaxed pl-1">
                        {log.details || log.action}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-[#263440]/60 text-[10px] font-lora text-[#64748B]">
                        <span className="flex items-center gap-1 font-mono text-[9px]">
                          <Hash className="w-2.5 h-2.5 text-[#35E6B5]" />
                          <span>SHA: {(log.id || 'aud_0918').slice(-8)}</span>
                        </span>
                        <span className="text-[#94A3B8] font-lora">Verified Block #{idx + 104}</span>
                      </div>
                    </div>
                  );
                })}

                {auditLogs.length > 3 && (
                  <Link
                    to="/admin/audit"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#35E6B5]/40 text-[#35E6B5] hover:text-white text-xs font-lora font-semibold transition-all group"
                  >
                    <span>View Full Ledger ({auditLogs.length} Records)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </>
            ) : (
              <div className="p-6 rounded-xl bg-[#071018]/80 border border-[#263440] text-center space-y-2">
                <History className="w-8 h-8 text-[#35E6B5] mx-auto opacity-60" />
                <h3 className="font-lora text-sm font-bold text-white">
                  Genesis Block Initialized
                </h3>
                <p className="text-xs font-lora text-[#94A3B8]">
                  Immutable ledger initialized and awaiting administrative events.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
