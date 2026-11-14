import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';

/**
 * Shown after the final assessment is passed. The credential is issued and signed by
 * the server at grading time (/api/assessment); this modal only presents it.
 */
export default function CertificateRequestModal({ isOpen, onClose, course, currentUser, quizResult, credential }) {
  if (!isOpen) return null;
  const score = credential?.grade_percentage ?? quizResult?.score;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credential-modal-title"
    >
      <div className="max-w-lg w-full cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#FF7A00]/50 space-y-5 bg-[#120E09] shadow-[0_0_30px_rgba(255,122,0,0.2)]">
        <div className="flex items-center space-x-3 pb-3 border-b border-[#FF7A00]/20">
          <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 id="credential-modal-title" className="text-lg font-bold text-white font-lora">
              {credential ? 'Certificate issued' : 'Final assessment passed'}
            </h3>
            {typeof score === 'number' && <p className="text-xs font-mono text-[#FF7A00]">Score: {score}%</p>}
          </div>
        </div>

        {credential ? (
          <div className="space-y-4 font-mono text-xs">
            <p className="text-[#E2D9CE] leading-relaxed font-sans text-sm">
              Congratulations, {currentUser?.full_name || 'graduate'}. You have completed {course?.title}. Your certificate is
              recorded and can be checked by anyone with its verification ID.
            </p>
            <div className="p-4 rounded-xl bg-[#0C0A07] border border-[#FF7A00]/20 space-y-2">
              <div className="flex justify-between gap-3">
                <span className="text-[#A3907C]">Credential</span>
                <span className="text-white font-bold text-right">{credential.credential_title}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#A3907C]">Verification ID</span>
                <span className="text-[#FF7A00] font-bold select-all">{credential.verification_id}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#A3907C]">Issued</span>
                <span className="text-white">{String(credential.issue_date || '').split('T')[0]}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#FF7A00]/30 text-[#E2D9CE] hover:text-white"
              >
                Close
              </button>
              <Link
                to={`/verify/${encodeURIComponent(credential.verification_id)}`}
                className="px-5 py-2 rounded-lg bg-[#FF7A00] text-[#071018] font-bold shadow-md hover:bg-[#FFA439] inline-flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" /> View &amp; verify certificate <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-[#E2D9CE]">
            <p>
              Your pass has been recorded. Your certificate will appear in your dashboard shortly; if it does not, contact
              support at contact@redkross.org.in with your registered email.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#FF7A00]/30 text-[#E2D9CE] hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
