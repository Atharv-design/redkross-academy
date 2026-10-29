import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Shield,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ArrowRight,
  User,
  Sliders,
  Clock,
  Coins,
  RefreshCw,
  Eye,
  Check,
  Lock
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

/**
 * Super Admin Security Command & Proctoring Queue (Phase 4 & Spec Extension)
 * Conforms to super-admin-interface-design.md:
 * - High-density incident escalation queue
 * - Action buttons to "Uphold" or "Reset Cooldown"
 * - Global Security Policy Configuration (Strike thresholds, Lockout duration)
 * - Live Student Proctoring Tracking
 */
export default function ExamIncidentQueuePage() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global Security Policy State
  const [strikeThreshold, setStrikeThreshold] = useState(3);
  const [lockoutDuration, setLockoutDuration] = useState(24);
  const [tokenPenalty, setTokenPenalty] = useState(50);
  const [policySaving, setPolicySaving] = useState(false);
  const [policyNotice, setPolicyNotice] = useState('');

  // Live Tracking Stats
  const [liveStudents, setLiveStudents] = useState([]);

  const loadData = async () => {
    try {
      const [metricsRes, policyRes, trackingRes] = await Promise.all([
        apiClient.getAdminMetrics(),
        apiClient.getGlobalSecurityPolicy(),
        apiClient.getLiveStudentTracking()
      ]);

      if (metricsRes && metricsRes.violations) {
        setIncidents(metricsRes.violations);
      }

      if (policyRes) {
        setStrikeThreshold(policyRes.strike_threshold || 3);
        setLockoutDuration(policyRes.lockout_duration_hours || 24);
        setTokenPenalty(policyRes.strike2_token_penalty || 50);
      }

      if (trackingRes) {
        setLiveStudents(trackingRes);
      }
    } catch (e) {
      console.warn('Failed to fetch security telemetry:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSavePolicy = async () => {
    setPolicySaving(true);
    try {
      await apiClient.updateGlobalSecurityPolicy({
        strike_threshold: parseInt(strikeThreshold, 10),
        lockout_duration_hours: parseInt(lockoutDuration, 10),
        strike2_token_penalty: parseInt(tokenPenalty, 10)
      });
      setPolicyNotice('✅ Global Security Policy updated & audit logged.');
      setTimeout(() => setPolicyNotice(''), 4000);
    } catch (err) {
      alert(`Policy update failed: ${err.message}`);
    } finally {
      setPolicySaving(false);
    }
  };

  const handleResolve = async (action) => {
    if (!selectedIncident) return;
    try {
      if (action === 'OVERRIDDEN') {
        // Clear cooldown
        await apiClient.adminResetCooldown(
          selectedIncident.enrolment_id,
          selectedIncident.quiz_id,
          reviewerNotes || 'Authorized cooldown reset by Super Admin',
          currentUser?.email || 'usr_admin'
        );
      }

      await apiClient.resolveIncident(
        selectedIncident.id,
        action,
        reviewerNotes || `Action determined by Super Admin: ${action}`,
        currentUser?.email || 'usr_admin'
      );

      setActionSuccess(`Incident #${selectedIncident.id} marked as ${action}. Audit log created.`);
      setSelectedIncident(null);
      setReviewerNotes('');
      await loadData();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      alert(`Incident resolution failed: ${err.message}`);
    }
  };

  const inExamCount = liveStudents.filter((s) => s.operational_status === 'in_exam').length;
  const lockedOutCount = liveStudents.filter((s) => s.operational_status === 'locked_out').length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-6 font-lora">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-lora text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="flex items-center gap-3 text-xs font-lora text-[#94A3B8]">
          <span>Security Engine: <strong className="text-[#65F58A]">Global Proctoring & Policy</strong></span>
        </div>
      </div>

      {/* Header and Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-lora mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>EXAM INTEGRITY & PROCTORING ESCALATION</span>
          </div>
          <h1 className="font-lora text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Security Command & Incident Queue</span>
          </h1>
          <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed mt-1 font-lora">
            Review automatically flagged exam infractions, configure platform-wide strike thresholds, and uphold or override Strike-3 evaluation terminations.
          </p>
        </div>

        {/* Live Proctoring State Chips */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#101923] border border-[#263440] text-center">
            <div className="text-[10px] text-[#94A3B8]">In-Exam Now</div>
            <div className="text-amber-400 font-bold flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{inExamCount}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101923] border border-[#263440] text-center">
            <div className="text-[10px] text-[#94A3B8]">Active Lockouts</div>
            <div className="text-rose-400 font-bold flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>{lockedOutCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-[#65F58A] text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* GLOBAL SECURITY POLICY CARD */}
      <div className="glass-card rounded-2xl p-5 border border-[#263440] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#263440]">
          <div>
            <h3 className="font-royal text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#65F58A]" />
              <span>Global Proctoring Security Policy</span>
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
              Defines platform-wide limits for browser focus loss, auto-termination strikes, and cooldown lockouts.
            </p>
          </div>
          <button
            onClick={handleSavePolicy}
            disabled={policySaving}
            className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-[#65F58A]/90 transition-all shadow-md self-start sm:self-center"
          >
            {policySaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            <span>{policySaving ? 'Saving Policy...' : 'Save Security Policy'}</span>
          </button>
        </div>

        {policyNotice && (
          <div className="p-2.5 rounded-lg bg-[#101923] border border-[#65F58A]/30 text-xs font-mono text-[#65F58A]">
            {policyNotice}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1.5">
            <div className="text-[11px] text-[#94A3B8]">Strike Threshold to Terminate</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="5"
                value={strikeThreshold}
                onChange={(e) => setStrikeThreshold(e.target.value)}
                className="w-16 px-2.5 py-1.5 rounded-lg bg-[#101923] border border-[#263440] text-center text-white font-bold"
              />
              <span className="text-[#94A3B8]">Strikes Max</span>
            </div>
            <div className="text-[10px] text-[#64748B]">Auto-fails candidate evaluation upon threshold</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1.5">
            <div className="text-[11px] text-[#94A3B8]">Lockout Cooldown Period</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="72"
                value={lockoutDuration}
                onChange={(e) => setLockoutDuration(e.target.value)}
                className="w-16 px-2.5 py-1.5 rounded-lg bg-[#101923] border border-[#263440] text-center text-white font-bold"
              />
              <span className="text-[#94A3B8]">Hours Duration</span>
            </div>
            <div className="text-[10px] text-[#64748B]">Enforced retry delay after Strike 3 failure</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1.5">
            <div className="text-[11px] text-[#94A3B8]">Strike 2 Token Penalty</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="500"
                value={tokenPenalty}
                onChange={(e) => setTokenPenalty(e.target.value)}
                className="w-16 px-2.5 py-1.5 rounded-lg bg-[#101923] border border-[#263440] text-center text-rose-400 font-bold"
              />
              <span className="text-[#94A3B8]">🪙 Deducted</span>
            </div>
            <div className="text-[10px] text-[#64748B]">Auto-debited from candidate token balance</div>
          </div>
        </div>
      </div>

      {/* INCIDENT ESCALATION QUEUE & TRIAGE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident List (Left 5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] uppercase tracking-wider pb-2 border-b border-[#263440]">
            <span>Flagged Infractions ({incidents.length})</span>
            <span>Severity</span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {incidents.length > 0 ? (
              incidents.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all space-y-1 ${
                    selectedIncident?.id === inc.id
                      ? 'bg-[#1B2530] border-rose-500 text-white shadow-md'
                      : 'bg-[#071018]/60 border-[#263440] text-slate-300 hover:bg-[#101923]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">{inc.student_name || 'Candidate Operator'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      Strike {inc.strike_count}/3
                    </span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] font-mono truncate">{inc.reason}</div>
                  <div className="text-[10px] text-[#64748B] font-mono">
                    {new Date(inc.created_at).toLocaleString()}
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-xs font-mono text-[#94A3B8]">
                {loading ? 'Querying exam incidents...' : 'No active infractions in queue. All evaluations within clean limits.'}
              </div>
            )}
          </div>
        </div>

        {/* Selected Incident Telemetry Dossier (Right 7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-6">
          {selectedIncident ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
                <div>
                  <h3 className="font-royal text-base font-bold text-white">
                    Incident Case #{selectedIncident.id}
                  </h3>
                  <div className="text-xs text-[#94A3B8] font-mono mt-0.5">
                    Candidate: <span className="text-white font-bold">{selectedIncident.student_name}</span> ({selectedIncident.student_email || selectedIncident.user_id})
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  STRIKE {selectedIncident.strike_count} CRITICAL
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2 text-xs font-mono">
                <div className="text-[#94A3B8] uppercase text-[10px]">Proctoring Infraction Vector</div>
                <div className="text-white text-sm font-semibold">{selectedIncident.reason}</div>
                <div className="text-[11px] text-[#64748B]">
                  Associated Assessment: {selectedIncident.quiz_title || selectedIncident.quiz_id}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#94A3B8]">
                  Super Admin Determination Notes (Written to Audit Log)
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Record operational assessment rationale..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleResolve('UPHELD')}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold transition-colors"
                >
                  Uphold Strike 3 Termination
                </button>
                <button
                  onClick={() => handleResolve('OVERRIDDEN')}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-royal font-bold text-xs tracking-wider shadow-lg shadow-[#65F58A]/20"
                >
                  Authorize Cooldown Reset & Forgive
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-xs font-mono text-[#94A3B8]">
              Select an infraction case from the left queue to inspect proctoring telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
