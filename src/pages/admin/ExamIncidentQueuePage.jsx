import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, CheckCircle2, XCircle, ChevronLeft, ArrowRight, User } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function ExamIncidentQueuePage() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState(mockEngine.getIncidents());
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState(null);

  const handleResolve = (action) => {
    if (!selectedIncident) return;
    const adminEmail = currentUser?.email || 'admin@redkross.org.in';
    mockEngine.resolveIncident(selectedIncident.id, action, reviewerNotes, adminEmail);

    setIncidents(mockEngine.getIncidents());
    setActionSuccess(`Incident marked as ${action}. Audit entry created.`);
    setSelectedIncident(null);
    setReviewerNotes('');

    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#090D16] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Operations Console</span>
          </Link>
          <div className="text-xs font-mono text-slate-400">
            Queue: <span className="text-white font-semibold">Proctoring Focus Infractions</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
            <span>Exam Incident & Strike 3 Termination Queue</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Review automatically terminated evaluations resulting from Strike 3 proctoring focus loss. Staff reviewers can examine telemetry logs and grant authorized cooldown resets or uphold terminations.
          </p>
        </div>

        {actionSuccess && (
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Incident List (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-3">
            {incidents.length > 0 ? (
              incidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedIncident?.id === inc.id
                      ? 'bg-surface-100 border-redkross-500 shadow-lg'
                      : 'bg-surface-card border-surface-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>Incident {inc.id}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                            inc.status === 'pending_review'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : inc.status === 'approved_appeal'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          }`}
                        >
                          {inc.status}
                        </span>
                      </div>
                      <div className="text-xs text-rose-300 font-mono">{inc.reason}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(inc.terminated_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 pt-2 border-t border-surface-border/60">
                    <span>Attempt: {inc.attempt_id}</span>
                    <span>•</span>
                    <span>Strikes: {inc.strike_count}/3</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-surface-card border border-surface-border rounded-xl text-slate-400 text-xs font-mono">
                No active exam violations found in the queue.
              </div>
            )}
          </div>

          {/* Incident Action Drawer (Right Column) */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              <span>Staff Review & Adjudication</span>
            </h2>

            {selectedIncident ? (
              <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4 shadow-xl text-xs font-mono">
                <div className="space-y-1 pb-3 border-b border-surface-border">
                  <div className="text-slate-400">Selected Incident:</div>
                  <div className="text-sm font-bold text-white">{selectedIncident.id}</div>
                  <div className="text-slate-400 text-[10px]">Attempt: {selectedIncident.attempt_id}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 block">Reviewer Decision Notes:</label>
                  <textarea
                    rows={4}
                    placeholder="Provide justification for appeal approval or termination confirmation..."
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    className="w-full p-3 bg-surface-100 border border-surface-border rounded-lg text-white font-mono text-xs focus:outline-none focus:border-redkross-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleResolve('approved_appeal')}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Appeal & Reset Cooldown</span>
                  </button>

                  <button
                    onClick={() => handleResolve('upheld')}
                    className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Uphold Strike 3 Disciplinary Termination</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-surface-card border border-surface-border rounded-xl text-slate-400 text-xs font-mono">
                Select an incident from the queue to review and adjudicate.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
