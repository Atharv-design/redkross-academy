import React from 'react';
import { Award, Check } from 'lucide-react';

export default function CertificateRequestModal({
  isOpen,
  onClose,
  course,
  currentUser,
  enrolment,
  quizResult,
  certRequestSubmitted,
  certCadetNotes,
  setCertCadetNotes,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="max-w-lg w-full cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#FF7A00]/50 space-y-5 bg-[#120E09] shadow-[0_0_30px_rgba(255,122,0,0.2)]">
        <div className="flex items-center space-x-3 pb-3 border-b border-[#FF7A00]/20">
          <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-lora">Request Official Certificate</h3>
            <p className="text-xs font-mono text-[#FF7A00]">
              Final Assessment Cleared ({quizResult?.score || 92}%)
            </p>
          </div>
        </div>

        {certRequestSubmitted ? (
          <div className="p-6 rounded-xl bg-[#1A1208] border border-[#FF7A00]/40 text-center space-y-3">
            <Check className="w-10 h-10 text-[#FF7A00] mx-auto stroke-[3]" />
            <h4 className="font-bold text-white font-lora text-base">Request Dispatched to Academic Director</h4>
            <p className="text-xs text-[#E2D9CE] font-mono leading-relaxed">
              Your certified passing score has been forwarded to the Academy Administration queue. Once certified, your cryptographic credential will appear in your Student Portal for direct download.
            </p>
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            <p className="text-[#E2D9CE] leading-relaxed">
              Congratulations on successfully clearing the {course?.title} Final Comprehensive Examination. Confirm your details to request official certification dispatch.
            </p>

            <div className="p-4 rounded-xl bg-[#0C0A07] border border-[#FF7A00]/20 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#A3907C]">Cadet Operator:</span>
                <span className="text-white font-bold">{currentUser?.name || currentUser?.full_name || 'Cadet'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3907C]">Cadet ID:</span>
                <span className="text-[#FF7A00] font-bold">{currentUser?.cadet_id || enrolment?.cadet_id || 'RK-89421'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3907C]">Credential Title:</span>
                <span className="text-white font-bold">{course?.final_assessment?.credential_title || 'RedKross Certified SOC Analyst (RCSA)'}</span>
              </div>
            </div>

            <div>
              <label className="block text-[#A3907C] mb-1">Candidate Notes (Optional)</label>
              <textarea
                rows={3}
                value={certCadetNotes}
                onChange={(e) => setCertCadetNotes(e.target.value)}
                placeholder="Provide any additional institutional verification requests or employer reference notes..."
                className="w-full bg-[#0C0A07] border border-[#FF7A00]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#FF7A00]"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#FF7A00]/30 text-[#E2D9CE] hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="px-5 py-2 rounded-lg bg-[#FF7A00] text-[#071018] font-bold shadow-md hover:bg-[#FFA439]"
              >
                Submit Certificate Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
