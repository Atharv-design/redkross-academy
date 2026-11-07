import React from 'react';
import { ShieldAlert, Award, Clock, AlertTriangle, Lock, ArrowRight } from 'lucide-react';

export default function PreFlightExamModal({
  isOpen,
  activeUnit,
  onCancel,
  onAcknowledge
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="max-w-xl w-full cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#FF7A00]/50 space-y-6 bg-[#120E09] shadow-[0_0_35px_rgba(255,122,0,0.25)]">
        {/* Header */}
        <div className="flex items-center space-x-3.5 pb-4 border-b border-[#FF7A00]/20">
          <div className="w-11 h-11 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00] flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white font-lora">
              Official Examination Protocols & Integrity Rules
            </h3>
            <p className="text-xs font-mono text-[#FF7A00] truncate">
              {activeUnit?.type === 'final_exam'
                ? 'Final Comprehensive Certification Assessment (50 MCQs)'
                : `${activeUnit?.moduleTitle || 'Module'} Knowledge Check (20 MCQs)`}
            </p>
          </div>
        </div>

        {/* Protocol Items */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#0C0A07] border border-[#FF7A00]/20 flex items-start space-x-3">
            <Award className="w-4 h-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">80% Passing Threshold Required</span>
              <p className="text-[#A3907C] text-[11px] mt-0.5 leading-relaxed">
                You must achieve a minimum score of 80% to successfully clear this evaluation and unlock subsequent operational modules.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0C0A07] border border-[#FF7A00]/20 flex items-start space-x-3">
            <Clock className="w-4 h-4 text-[#FFA439] mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">
                Strict Time Limit: {activeUnit?.type === 'final_exam' ? '60 Minutes (50 MCQs)' : '20 Minutes (20 MCQs)'}
              </span>
              <p className="text-[#A3907C] text-[11px] mt-0.5 leading-relaxed">
                The exam timer runs continuously once initiated. If the timer expires before manual submission, your completed answers will be auto-submitted.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0C0A07] border border-amber-500/20 flex items-start space-x-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-amber-300 font-bold block">Tab Switch & Proctor Integrity Protocol</span>
              <p className="text-[#A3907C] text-[11px] mt-0.5 leading-relaxed">
                Switching browser tabs, minimizing the screen, or navigating away during active testing will trigger an immediate proctor violation and forfeit 1 evaluation attempt.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0C0A07] border border-rose-500/20 flex items-start space-x-3">
            <Lock className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-rose-300 font-bold block">3-Strike Policy & 24-Hour Security Lockdown</span>
              <p className="text-[#A3907C] text-[11px] mt-0.5 leading-relaxed">
                Cadets are granted 3 attempts. If all 3 attempts are exhausted through failing scores or proctor violations, a mandatory 24-hour security lockout is automatically enforced.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-[#FF7A00]/20">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-[#8BA2B5] hover:text-white font-mono text-xs transition-colors cursor-pointer"
          >
            Return to Study / Cancel
          </button>
          <button
            type="button"
            onClick={onAcknowledge}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold font-mono text-xs shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>I Understand the Rules & Begin Exam</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
