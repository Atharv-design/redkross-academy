import React from 'react';
import {
  Search,
  Plus,
  Award,
  ShieldAlert,
  ShieldCheck,
  Download,
  ExternalLink
} from 'lucide-react';

export default function CertificateRegistryTab({
  searchQuery,
  setSearchQuery,
  onOpenDesigner,
  filteredCredentials,
  exportingPdf,
  onDownloadRegistryPdf,
  onOpenRevokeModal
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search registry by ID, Cadet, Course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full liquid-glass-input rounded-xl pl-9 pr-4 py-2 text-xs"
          />
        </div>
        <button
          onClick={onOpenDesigner}
          className="liquid-glass-button px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Certificate</span>
        </button>
      </div>

      <div className="liquid-glass-panel rounded-2xl overflow-hidden border border-[#263440]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B2530] text-[10px] font-mono text-[#8BA2B5] bg-[#071018]/50 uppercase tracking-wider">
              <th className="p-3.5">CREDENTIAL ID</th>
              <th className="p-3.5">RECIPIENT & CADET ID</th>
              <th className="p-3.5">COURSE / CURRICULUM</th>
              <th className="p-3.5">ISSUED DATE</th>
              <th className="p-3.5">STATUS</th>
              <th className="p-3.5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
            {filteredCredentials.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-[#8BA2B5] italic">
                  No issued certificates match query. Dispatch one from the Official Certificate Studio!
                </td>
              </tr>
            ) : (
              filteredCredentials.map((cred) => (
                <tr key={cred.id} className="hover:bg-[#071018]/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#FF7A00]">
                    <div className="flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-[#FF7A00]" />
                      <span>{cred.id}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="text-white font-sans font-medium">{cred.student_name}</div>
                    <div className="text-[10px] text-[#8BA2B5] flex items-center gap-1.5 mt-0.5">
                      <span>{cred.student_email || 'Verified Candidate'}</span>
                      {cred.cadet_id && (
                        <span className="px-1.5 py-0.2 rounded bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 font-bold text-[9px]">
                          {cred.cadet_id}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 text-white max-w-xs truncate">{cred.course_title}</td>
                  <td className="p-3.5 text-[#8BA2B5]">{cred.completion_date || cred.issued_at}</td>
                  <td className="p-3.5">
                    {cred.revoked ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30">
                        <ShieldAlert className="w-3 h-3" />
                        <span>REVOKED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/30">
                        <ShieldCheck className="w-3 h-3" />
                        <span>VALID & VERIFIED</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      type="button"
                      disabled={exportingPdf}
                      onClick={() => onDownloadRegistryPdf(cred)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 liquid-glass-button rounded-lg text-[11px] text-[#FF7A00] hover:text-[#FFA439] cursor-pointer"
                      title="Download Authentic RedKross Official PDF"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>

                    <a
                      href={`/verify/${cred.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 liquid-glass-button-secondary rounded-lg text-[11px]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Public Dossier</span>
                    </a>

                    {!cred.revoked && (
                      <button
                        onClick={() => onOpenRevokeModal(cred)}
                        className="px-2.5 py-1 bg-red-950/40 text-[#EF4444] hover:bg-[#EF4444]/20 rounded-lg border border-red-500/30 text-[11px] cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
