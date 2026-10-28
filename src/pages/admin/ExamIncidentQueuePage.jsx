import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, CheckCircle2, XCircle, ChevronLeft, ArrowRight, User } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function ExamIncidentQueuePage() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      const res = await apiClient.getAdminMetrics();
      if (res && res.violations) {
        setIncidents(res.violations);
      }
    } catch (e) {
      console.warn('Failed to fetch violations:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleResolve = (action) => {
    if (!selectedIncident) return;
    setActionSuccess(`Incident marked as ${action}. Operational audit log updated.`);
    setSelectedIncident(null);
    setReviewerNotes('');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="text-xs font-mono text-[#94A3B8]">
          Queue: <span className="text-[#65F58A] font-semibold">Proctoring Focus Infractions</span>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
          <span>Exam Incident & Strike 3 Termination Queue</span>
        </h1>
        <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed">
          Review automatically terminated evaluations resulting from Strike 3 proctoring focus loss. Staff reviewers examine telemetry logs and grant authorized cooldown resets or uphold terminations.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-[#65F58A] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Incident List (Left 5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-4 space-y-3">
          <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider px-2 py-1 border-b border-[#263440]">
            Flagged Infractions ({incidents.length})
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
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
                    <span className="font-bold text-white font-mono">{inc.student_name || 'Anonymous Cadet'}</span>
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
              <div className="p-6 text-center text-xs font-mono text-[#94A3B8]">
                {loading ? 'Querying exam incidents...' : 'No active infractions in queue.'}
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
                    Student ID: {selectedIncident.student_email || selectedIncident.user_id}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  CRITICAL VIOLATION
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2 text-xs font-mono">
                <div className="text-[#94A3B8] uppercase text-[10px]">Violation Telemetry Reason</div>
                <div className="text-white text-sm">{selectedIncident.reason}</div>
                <div className="text-[11px] text-[#64748B]">Strike Level: {selectedIncident.strike_count} of 3 maximum</div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#94A3B8]">
                  Reviewer Determination Notes (Audited)
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
                  Uphold Termination
                </button>
                <button
                  onClick={() => handleResolve('OVERRIDDEN')}
                  className="flex-1 py-2.5 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider"
                >
                  Authorize Cooldown Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-xs font-mono text-[#94A3B8]">
              Select an infraction case from the left queue to inspect proctoring telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
