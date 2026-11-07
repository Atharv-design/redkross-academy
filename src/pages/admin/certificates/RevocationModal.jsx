import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function RevocationModal({
  isOpen,
  selectedCred,
  revokeReason,
  setRevokeReason,
  onClose,
  onConfirm
}) {
  if (!isOpen || !selectedCred) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
      <div className="w-[480px] liquid-glass-panel rounded-2xl p-6 shadow-2xl space-y-4 border border-red-500/40">
        <div className="flex items-center space-x-3 text-red-400">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Confirm Credential Revocation</h3>
            <p className="text-xs text-slate-400 font-mono">Revoke cryptographic validity in public registry</p>
          </div>
        </div>

        <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-xl text-xs font-mono space-y-1">
          <div><span className="text-slate-400">ID:</span> <span className="text-white font-bold">{selectedCred.id}</span></div>
          <div><span className="text-slate-400">Recipient:</span> <span className="text-white">{selectedCred.student_name}</span></div>
          <div><span className="text-slate-400">Curriculum:</span> <span className="text-white">{selectedCred.course_title}</span></div>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">
            Mandatory Reason for Revocation *
          </label>
          <textarea
            rows={3}
            required
            value={revokeReason}
            onChange={(e) => setRevokeReason(e.target.value)}
            placeholder="Specify institutional reason (e.g. academic integrity violation, identity misattribution)..."
            className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white"
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono liquid-glass-button-secondary rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!revokeReason.trim()}
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-mono font-bold bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Permanently Revoke
          </button>
        </div>
      </div>
    </div>
  );
}
