import React from 'react';

export default function CertificatePendingTab({
  certRequests,
  onApproveRequest
}) {
  const pending = certRequests.filter((r) => r.status === 'pending_review' || r.status === 'PENDING');

  return (
    <div className="space-y-4 font-lora">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Pending Student Certification Requests</h3>
          <p className="text-xs font-mono text-[#8BA2B5]">
            Cadets who successfully cleared the Final Comprehensive Assessment (80%+ threshold).
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/30">
          {pending.length} Action Items
        </span>
      </div>

      <div className="liquid-glass-panel rounded-2xl overflow-hidden border border-[#263440]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B2530] text-[10px] font-mono text-[#8BA2B5] bg-[#071018]/50 uppercase tracking-wider">
              <th className="p-3.5">REQUEST ID</th>
              <th className="p-3.5">CADET CANDIDATE</th>
              <th className="p-3.5">TARGET COURSE</th>
              <th className="p-3.5">FINAL EXAM SCORE</th>
              <th className="p-3.5">REQUEST DATE</th>
              <th className="p-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
            {pending.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-[#8BA2B5] font-lora">
                  No pending certification requests at this time. All cleared assessments have been certified.
                </td>
              </tr>
            ) : (
              pending.map((req) => (
                <tr key={req.id} className="hover:bg-[#08121A]/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#FF7A00]">
                    {req.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-white font-lora">
                      {req.student_name || req.cadet_name || 'Cadet'}
                    </div>
                    <div className="text-[10px] text-[#8BA2B5]">{req.cadet_id || 'RK-UNKNOWN'}</div>
                  </td>
                  <td className="p-3.5 text-gray-200">
                    {req.course_title || 'SOC Analyst L1 & L2 Defensive Operations'}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/30 font-bold">
                      {req.score || 92}% PASSED
                    </span>
                  </td>
                  <td className="p-3.5 text-[#8BA2B5]">
                    {req.requested_at ? new Date(req.requested_at).toLocaleDateString() : 'Today'}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onApproveRequest(req)}
                      className="px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono shadow-[0_0_15px_rgba(255,122,0,0.3)] transition-all cursor-pointer"
                    >
                      Approve & Dispatch
                    </button>
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
