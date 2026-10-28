import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronLeft, Shield, Clock, Hash } from 'lucide-react';
import { apiClient } from '../../services/apiClient';

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getAdminMetrics().then((res) => {
      if (res && res.audit_logs) {
        setAuditLogs(res.audit_logs);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

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
          Security: <span className="text-[#65F58A] font-semibold">Immutable Append-Only Audit Trail</span>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#35E6B5]" />
          <span>System & Security Audit Registry</span>
        </h1>
        <p className="text-xs text-[#94A3B8] max-w-xl leading-relaxed">
          Append-only cryptographic record of all administrative actions, course publications, role grants, and manual cooldown overrides.
        </p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-xl divide-y divide-[#263440]">
        {auditLogs.length > 0 ? (
          auditLogs.map((aud) => (
            <div key={aud.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:bg-[#1B2530]/40 transition-colors">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 font-bold text-[10px]">
                    {aud.action}
                  </span>
                  <span className="text-[#94A3B8] text-[10px]">Target: {aud.target_type || aud.entity_type} ({aud.target_id || aud.entity_id})</span>
                </div>
                <div className="text-white text-xs font-sans">
                  {typeof aud.details === 'object' ? JSON.stringify(aud.details) : aud.details}
                </div>
                <div className="text-[10px] text-[#64748B]">
                  Admin Actor: {aud.admin_id || aud.actor_id}
                </div>
              </div>

              <div className="text-right flex-shrink-0 text-[#94A3B8] text-[11px]">
                <div>{new Date(aud.created_at).toLocaleDateString()}</div>
                <div className="text-[10px] text-[#64748B]">{new Date(aud.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs font-mono text-[#94A3B8]">
            {loading ? 'Retrieving audit logs from Neon DB...' : 'No security audit logs recorded yet.'}
          </div>
        )}
      </div>
    </div>
  );
}
