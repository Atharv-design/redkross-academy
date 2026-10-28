import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, Award, AlertTriangle, Coins, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminDashboard() {
  const metrics = mockEngine.getOperationsMetrics();
  const incidents = mockEngine.getIncidents();
  const auditLogs = mockEngine.getAuditLogs().slice(0, 5);

  return (
    <div className="min-h-screen bg-[#090D16] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-redkross-500 animate-pulse" />
              <h1 className="text-2xl font-extrabold text-white">Academy Operations Command</h1>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              PRD Staff & Least-Privilege Role Administration Console
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/incidents"
              className="px-3.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-xs font-mono text-slate-300 flex items-center space-x-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Incidents ({incidents.length})</span>
            </Link>
            <Link
              to="/admin/crm"
              className="px-3.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-xs font-mono text-slate-300 flex items-center space-x-1.5"
            >
              <Users className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Student CRM</span>
            </Link>
            <Link
              to="/admin/builder"
              className="px-3.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-xs font-mono text-slate-300 flex items-center space-x-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Course Builder</span>
            </Link>
          </div>
        </div>

        {/* Operations KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Enrolled Students</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">{metrics.total_students}</div>
            <div className="text-[10px] text-emerald-400 font-mono">100% Verified Ident</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Active Enrolments</div>
            <div className="text-2xl font-bold text-cyber-cyan font-mono tabular-nums">{metrics.total_enrolments}</div>
            <div className="text-[10px] text-slate-400 font-mono">Across 10 Catalog Tracks</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Issued Credentials</div>
            <div className="text-2xl font-bold text-cyber-emerald font-mono tabular-nums">{metrics.credentials_issued}</div>
            <div className="text-[10px] text-slate-400 font-mono">Cryptographically Signed</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Flagged Incidents</div>
            <div className="text-2xl font-bold text-rose-400 font-mono tabular-nums">{metrics.active_incidents}</div>
            <div className="text-[10px] text-rose-400 font-mono">Pending Staff Review</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Token Circulation</div>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">{metrics.tokens_circulation}</div>
            <div className="text-[10px] text-slate-400 font-mono">Non-Monetary Ledger</div>
          </div>
        </div>

        {/* Quick Review Split: Incident Queue & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exam Incidents Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Proctoring Incident Queue</span>
              </h2>
              <Link to="/admin/incidents" className="text-xs font-mono text-redkross-400 hover:underline">
                View All Queue
              </Link>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-5 shadow-lg space-y-3">
              {incidents.length > 0 ? (
                incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-3.5 rounded-lg bg-surface-100 border border-surface-border flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <span>{inc.reason}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-400 font-mono uppercase">
                          {inc.status}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Attempt: {inc.attempt_id} • Strike Count: {inc.strike_count}
                      </div>
                    </div>

                    <Link
                      to="/admin/incidents"
                      className="px-3 py-1.5 rounded bg-redkross-600/20 text-redkross-400 border border-redkross-600/30 text-xs font-mono hover:bg-redkross-600 hover:text-white transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400 font-mono">
                  No pending proctoring infractions.
                </div>
              )}
            </div>
          </div>

          {/* Audit Trail */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-cyber-cyan" />
                <span>Immutable System Audit Trail</span>
              </h2>
              <Link to="/admin/audit" className="text-xs font-mono text-cyber-cyan hover:underline">
                Full Log ({mockEngine.getAuditLogs().length})
              </Link>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-5 shadow-lg space-y-3">
              {auditLogs.map((aud) => (
                <div key={aud.id} className="p-3 rounded-lg bg-surface-100 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">{aud.action}</span>
                    <span className="text-slate-500">{new Date(aud.created_at).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] font-sans">{aud.details}</div>
                  <div className="text-[10px] text-slate-500">Actor: {aud.actor_id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
