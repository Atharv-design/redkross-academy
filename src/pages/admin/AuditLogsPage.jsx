import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronLeft, Shield, Clock, Hash, Search, Filter } from 'lucide-react';
import { apiClient } from '../../services/apiClient';

/**
 * Super Admin Operational Audit Registry (Phase 4 & Spec Extension)
 * Conforms to super-admin-interface-design.md:
 * - Immutable, searchable, filterable table of all actions
 * - Fast filtering by action categories
 */
export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

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

  const filteredLogs = auditLogs.filter((aud) => {
    const textToMatch = `${aud.action} ${aud.details} ${aud.actor_id || aud.admin_id} ${aud.entity_type || aud.target_type}`.toLowerCase();
    const matchesSearch = textToMatch.includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (actionFilter === 'ALL') return true;
    return aud.action === actionFilter;
  });

  const uniqueActions = Array.from(new Set(auditLogs.map((a) => a.action).filter(Boolean)));

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
        <div className="text-xs font-lora text-[#94A3B8]">
          Security: <span className="text-[#65F58A] font-semibold">Immutable Append-Only Audit Trail</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-lora mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>OPERATIONAL AUDIT REGISTRY</span>
          </div>
          <h1 className="font-lora text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>System & Security Audit Registry</span>
          </h1>
          <p className="text-xs text-[#94A3B8] max-w-xl leading-relaxed mt-1 font-lora">
            Append-only cryptographic record of all administrative actions, course publications, token adjustments, and lockout overrides.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search action, actor, or detail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#101923] border border-[#263440] rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none focus:border-[#65F58A]"
          />
        </div>
      </div>

      {/* Filter by Action Pills */}
      {uniqueActions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-[#94A3B8] flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Action:</span>
          </span>
          <button
            onClick={() => setActionFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all ${
              actionFilter === 'ALL'
                ? 'bg-[#1B2530] border-[#65F58A] text-white font-bold'
                : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
            }`}
          >
            All Actions ({auditLogs.length})
          </button>
          {uniqueActions.map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all ${
                actionFilter === act
                  ? 'bg-[#1B2530] border-[#65F58A] text-[#65F58A] font-bold'
                  : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      )}

      {/* Audit Log Table */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-xl divide-y divide-[#263440]">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((aud) => (
            <div
              key={aud.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:bg-[#1B2530]/40 transition-colors"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 font-bold text-[10px]">
                    {aud.action}
                  </span>
                  <span className="text-[#94A3B8] text-[10px]">
                    Target: {aud.target_type || aud.entity_type} ({aud.target_id || aud.entity_id})
                  </span>
                </div>
                <div className="text-white text-xs font-sans leading-relaxed">
                  {typeof aud.details === 'object' ? JSON.stringify(aud.details) : aud.details}
                </div>
                <div className="text-[10px] text-[#64748B]">
                  Admin Actor: <span className="text-slate-300">{aud.admin_id || aud.actor_id}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0 text-[#94A3B8] text-[11px] font-mono">
                <div>{new Date(aud.created_at).toLocaleDateString()}</div>
                <div className="text-[10px] text-[#64748B]">{new Date(aud.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-xs font-mono text-[#94A3B8]">
            {loading ? 'Retrieving audit logs from database...' : 'No security audit logs match the current query.'}
          </div>
        )}
      </div>
    </div>
  );
}
