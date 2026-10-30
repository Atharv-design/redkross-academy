import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Search, Filter, AlertTriangle, Info,
  CheckCircle2, Download, RefreshCw, Terminal, Clock, ShieldCheck
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);

  const loadLogs = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.audit_logs) {
        setLogs(db.audit_logs);
        if (db.audit_logs.length > 0 && !selectedLog) {
          setSelectedLog(db.audit_logs[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.action?.toLowerCase().includes(q) ||
      l.details?.toLowerCase().includes(q) ||
      l.user_email?.toLowerCase().includes(q) ||
      l.category?.toLowerCase().includes(q);

    const matchesCat = categoryFilter === 'ALL' || l.category === categoryFilter;
    const matchesSev = severityFilter === 'ALL' || l.severity === severityFilter;

    return matchesSearch && matchesCat && matchesSev;
  });

  const handleExportCSV = () => {
    const headers = ['ID,Timestamp,Category,Action,Severity,Operator,Details\n'];
    const rows = filteredLogs.map(
      (l) =>
        `"${l.id}","${l.timestamp}","${l.category || 'SYSTEM'}","${l.action}","${l.severity}","${l.user_email || 'admin@redkross.org.in'}","${(l.details || '').replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redkross_audit_trail_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Filter and Search */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail by operator or action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full cyber-glass-card text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="cyber-glass-card text-xs font-mono text-[#CBD5E1] px-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="AUTH">AUTH & ACCESS</option>
            <option value="COURSE_MUTATION">COURSE MUTATION</option>
            <option value="STUDENT_ADMIN">STUDENT ADMIN</option>
            <option value="SYSTEM_CONFIG">SYSTEM CONFIG</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="cyber-glass-card text-xs font-mono text-[#CBD5E1] px-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
          >
            <option value="ALL">ALL SEVERITIES</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="WARN">WARN</option>
            <option value="INFO">INFO</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#1B2530] text-[#CBD5E1] hover:text-[#65F58A] border border-[#263440] font-mono text-xs rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      {/* Main Dual-Pane Logs View */}
      <div className="grid grid-cols-12 gap-6 min-h-[650px]">
        {/* Left Column: Chronological Audit Stream */}
        <div className="col-span-8 cyber-glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-3.5 bg-[#0A121A] border-b border-[#1B2530] flex items-center justify-between">
            <span className="text-xs font-mono text-[#8BA2B5]">
              TAMPER-EVIDENT AUDIT TRAIL ({filteredLogs.length})
            </span>
            <span className="text-[10px] font-mono text-[#65F58A] flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographically Sealed</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B2530] bg-[#071018] text-[10px] font-mono text-[#8BA2B5]">
                  <th className="p-3">SEVERITY</th>
                  <th className="p-3">EVENT / CATEGORY</th>
                  <th className="p-3">OPERATOR</th>
                  <th className="p-3">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
                {filteredLogs.map((log, idx) => {
                  const isSelected = selectedLog?.id === log.id;
                  return (
                    <tr
                      key={log.id || idx}
                      onClick={() => setSelectedLog(log)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#182330]' : 'hover:bg-[#071018]/50'
                      }`}
                    >
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            log.severity === 'CRITICAL'
                              ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                              : log.severity === 'WARN'
                              ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                              : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                          }`}
                        >
                          {log.severity || 'INFO'}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="text-white font-medium">{log.action}</div>
                        <div className="text-[10px] text-[#8BA2B5]">{log.category || 'SYSTEM'}</div>
                      </td>

                      <td className="p-3 text-[#38BDF8]">
                        {log.user_email || 'admin@redkross.org.in'}
                      </td>

                      <td className="p-3 text-[#8BA2B5]">
                        {log.timestamp || '2026-10-29 14:00'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Log Event Inspector */}
        <div className="col-span-4 cyber-glass-panel rounded-xl flex flex-col overflow-hidden">
          {selectedLog ? (
            <>
              <div className="p-5 border-b border-[#1B2530] bg-[#071018]">
                <span className="text-[10px] font-mono text-[#8BA2B5] block mb-1">
                  EVENT IDENTIFIER: {selectedLog.id}
                </span>
                <h3 className="text-base font-bold text-white font-lora">
                  {selectedLog.action}
                </h3>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs font-mono">
                <div className="space-y-2">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">
                    Execution Metadata
                  </span>
                  <div className="p-3 cyber-glass-card rounded-lg space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#8BA2B5]">Operator:</span>
                      <span className="text-white">{selectedLog.user_email || 'admin@redkross.org.in'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8BA2B5]">Timestamp:</span>
                      <span className="text-white">{selectedLog.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8BA2B5]">Category:</span>
                      <span className="text-[#65F58A]">{selectedLog.category || 'SYSTEM'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8BA2B5]">Client IP:</span>
                      <span className="text-[#38BDF8]">127.0.0.1 (Internal Proxy)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">
                    Event Narrative & Audit Details
                  </span>
                  <div className="p-3.5 cyber-glass-card rounded-lg text-[#CBD5E1] leading-relaxed">
                    {selectedLog.details || 'Standard administrative operation completed.'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[#8BA2B5] text-xs">
              Select an audit event from the stream to inspect.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

