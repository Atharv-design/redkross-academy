import React from 'react';
import { Award, Trophy, ArrowRight } from 'lucide-react';

export default function ModuleUnlockCelebrationModal({
  modalData,
  onDismiss,
  onProceed
}) {
  if (!modalData?.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="max-w-lg w-full cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#FF7A00]/60 space-y-6 bg-[#120E09] shadow-[0_0_40px_rgba(255,122,0,0.3)] text-center">
        {/* Visual Icon Badge */}
        {modalData.type === 'final_round' ? (
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700] mx-auto shadow-[0_0_30px_rgba(255,215,0,0.4)] animate-pulse">
            <Award className="w-8 h-8" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00]/20 border border-[#FF7A00]/50 flex items-center justify-center text-[#FF7A00] mx-auto shadow-[0_0_30px_rgba(255,122,0,0.4)] animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>
        )}

        {/* Typography & Copy */}
        {modalData.type === 'final_round' ? (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-lora">
              Get ready for the final round!
            </h3>
            <p className="text-sm font-bold font-mono text-[#FF7A00]">
              All the best, Cadet! 🎖️
            </p>
            <p className="text-xs text-[#E2D9CE] font-mono leading-relaxed pt-1">
              Phenomenal execution! You have conquered all operational modules of the curriculum. The comprehensive final assessment is now unlocked.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-lora">
              Congratulations Cadet! 🎉
            </h3>
            <p className="text-sm font-bold font-mono text-[#FF7A00]">
              You've Unlocked Module {modalData.unlockedModuleIndex}!
            </p>
            <p className="text-xs text-[#E2D9CE] font-mono leading-relaxed pt-1">
              Outstanding operational performance! You passed with a score of <span className="text-white font-bold">{modalData.score}%</span>. We're proud of your dedicated progress—keep the momentum surging!
            </p>
          </div>
        )}

        {/* Telemetry Stats Card */}
        <div className="p-4 rounded-xl bg-[#0C0A07] border border-[#FF7A00]/30 flex items-center justify-around font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#A3907C] block uppercase">Exam Score</span>
            <span className="text-white font-bold text-sm">{modalData.score}%</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-[10px] text-[#A3907C] block uppercase">Reward</span>
            <span className="text-[#FF7A00] font-bold text-sm">+100 RK Tokens</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-[10px] text-[#A3907C] block uppercase">Status</span>
            <span className="text-[#FFA439] font-bold text-sm">PASSED</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onDismiss}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-[#8BA2B5] hover:text-white font-mono text-xs transition-colors cursor-pointer"
          >
            Continue Later / Review
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold font-mono text-xs shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>
              {modalData.type === 'final_round'
                ? 'Proceed to Final Certification Exam'
                : `Proceed with Module ${modalData.unlockedModuleIndex}`}
            </span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
