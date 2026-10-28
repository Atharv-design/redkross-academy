import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronLeft, Shield, Clock, Hash } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AuditLogsPage() {
  const auditLogs = mockEngine.getAuditLogs();

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
            Security: <span className="text-white font-semibold">Immutable Staff Action Logs</span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-6 h-6 text-cyber-cyan" />
            <span>System & Security Audit Registry</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Append-only record of all critical administrative actions, including course publications, role grants, manual cooldown overrides, and credential revocations.
          </p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl overflow-hidden shadow-xl">
          <div className="divide-y divide-surface-border/60">
            {auditLogs.map((aud) => (
              <div key={aud.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:bg-surface-50 transition-colors">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-surface-100 text-white font-bold border border-surface-border">
                      {aud.action}
                    </span>
                    <span className="text-slate-400 text-[10px]">Entity: {aud.entity_type} ({aud.entity_id})</span>
                  </div>
                  <div className="text-slate-200 text-xs font-sans">{aud.details}</div>
                  <div className="text-[10px] text-slate-400 flex items-center space-x-2">
                    <span>Actor: {aud.actor_id}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 text-slate-400 text-[11px]">
                  <div>{new Date(aud.created_at).toLocaleDateString()}</div>
                  <div className="text-[10px] text-slate-400">{new Date(aud.created_at).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
