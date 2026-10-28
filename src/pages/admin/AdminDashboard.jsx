import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
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
  RefreshCw
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

/**
 * Super Admin Operations Command (Phase 4 & Phase 5)
 * Controls platform analytics, proctoring incident escalation, student CRM,
 * and the Centralized Catalog Release embargo toggle (Phase 3.3).
 */
export default function AdminDashboard() {
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-10">
      {/* Top Administrative Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#263440] gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>OPERATIONS COMMAND CENTER</span>
          </div>
          <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Super Admin Intelligence Dashboard
          </h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Logged in as <span className="text-white font-semibold">{currentUser?.email}</span> (Super Admin)
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/builder"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#65F58A]" />
            <span>Course Builder</span>
          </Link>
          <Link
            to="/admin/crm"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Student CRM</span>
          </Link>
          <Link
            to="/admin/incidents"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Incidents ({metrics.active_exam_incidents})</span>
          </Link>
          <Link
            to="/admin/audit"
            className="px-3.5 py-2 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Audit Trail</span>
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
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                Public Course Catalog Release Status (Phase 3.3)
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                isCatalogEnabled
                  ? 'bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30'
                  : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
              }`}>
                {isCatalogEnabled ? 'RELEASED (Publicly Visible)' : 'EMBARGOED (Hidden from Public)'}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {isCatalogEnabled
                ? 'The public course catalog is currently active. Prospective candidates and visitors can browse courses on the directory.'
                : 'Default security embargo active: Public visitors on Learning Paths see "Courses will be out soon". Courses remain securely stored in Neon DB.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleCatalog}
              disabled={toggling}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-md ${
                isCatalogEnabled
                  ? 'bg-[#1B2530] hover:bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'glass-button-primary'
              }`}
            >
              {isCatalogEnabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{toggling ? 'Updating...' : isCatalogEnabled ? 'Embargo Catalog' : 'Release Catalog Publicly'}</span>
            </button>
          </div>
        </div>

        {toggleNotice && (
          <div className="mt-4 p-3 rounded-xl bg-[#071018] border border-[#263440] text-xs font-mono text-[#65F58A] flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
            <span>{toggleNotice}</span>
          </div>
        )}
      </div>

      {/* Operations KPI Metrics with Dicto Cyber Card Geometries */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 bg-[#101923]/90 backdrop-blur-xl border border-[#35E6B5]/40 hover:border-[#65F58A] cyber-clip-diagonal-both space-y-1 transition-all hover:shadow-[0_8px_30px_rgba(53,230,181,0.2)]">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Enrolled Students</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">{metrics.total_students}</div>
          <div className="text-[10px] text-[#65F58A] font-mono">100% Verified Ident</div>
        </div>

        <div className="p-5 bg-[#101923]/90 backdrop-blur-xl border border-[#65F58A]/40 hover:border-[#00FFA3] cyber-clip-corner-top-left space-y-1 transition-all hover:shadow-[0_8px_30px_rgba(101,245,138,0.2)]">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Active Enrolments</div>
          <div className="text-2xl font-bold text-[#35E6B5] font-mono tabular-nums">{metrics.total_enrolments}</div>
          <div className="text-[10px] text-[#94A3B8] font-mono">Curriculum Seats</div>
        </div>

        <div className="p-5 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/40 hover:border-[#FBBF24] cyber-clip-notch-bottom space-y-1 transition-all hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)]">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Issued Credentials</div>
          <div className="text-2xl font-bold text-[#FBBF24] font-mono tabular-nums">{metrics.total_credentials_issued}</div>
          <div className="text-[10px] text-[#94A3B8] font-mono">Cryptographically Signed</div>
        </div>

        <div className="p-5 bg-[#101923]/90 backdrop-blur-xl border border-[#EF4444]/40 hover:border-[#F87171] cyber-clip-corner-top-right space-y-1 transition-all hover:shadow-[0_8px_30px_rgba(239,68,68,0.2)]">
          <div className="text-[11px] font-mono text-[#F87171] uppercase">Flagged Incidents</div>
          <div className="text-2xl font-bold text-rose-400 font-mono tabular-nums">{metrics.active_exam_incidents}</div>
          <div className="text-[10px] text-rose-400 font-mono">Proctoring Telemetry</div>
        </div>

        <div className="p-5 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/40 hover:border-[#FBBF24] cyber-clip-diagonal-both space-y-1 transition-all hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)]">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Token Circulation</div>
          <div className="text-2xl font-bold text-[#F59E0B] font-mono tabular-nums">{metrics.total_tokens_circulated}</div>
          <div className="text-[10px] text-[#94A3B8] font-mono">Non-Monetary Ledger</div>
        </div>
      </div>

      {/* Incident Queue & Audit Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exam Incident Queue */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
            <h2 className="font-royal text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Proctoring Incident Telemetry</span>
            </h2>
            <Link to="/admin/incidents" className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {violations.length > 0 ? (
              violations.map((v) => (
                <div key={v.id} className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-semibold font-mono">{v.student_name || 'Anonymous Cadet'}</div>
                    <div className="text-[11px] text-rose-400 font-mono mt-0.5">{v.reason} (Strike {v.strike_count}/3)</div>
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[#94A3B8] font-mono">
                No active exam violations recorded. Proctoring clean.
              </div>
            )}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
            <h2 className="font-royal text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#35E6B5]" />
              <span>System & Security Audit Log</span>
            </h2>
            <Link to="/admin/audit" className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-mono font-semibold">{log.action}</div>
                    <div className="text-[11px] text-[#94A3B8] font-mono mt-0.5">By {log.admin_id}</div>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[#94A3B8] font-mono">
                No audit logs recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
