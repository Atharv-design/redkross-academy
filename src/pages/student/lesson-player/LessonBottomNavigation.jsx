import React from 'react';
import { ChevronLeft, ChevronRight, Check, Shield } from 'lucide-react';

export default function LessonBottomNavigation({
  activeUnit,
  quizSubmitted,
  handlePrevUnit,
  activeIndex,
  allUnits,
  course,
  handleCompleteAndNext,
  handleMarkLessonComplete,
  isLessonCompleted,
  savingProgress
}) {
  if ((activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && !quizSubmitted) {
    return null;
  }

  return (
    <div className="pt-8 pb-10 border-t border-[#FF7A00]/20 flex flex-wrap items-center justify-between gap-4 font-mono">
      <button
        type="button"
        onClick={handlePrevUnit}
        disabled={activeIndex <= 0}
        className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
          activeIndex > 0
            ? 'bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border-[#FF7A00]/30 cursor-pointer shadow-sm'
            : 'bg-[#080705] text-[#A3907C]/40 border-white/5 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <span className="text-xs font-mono text-[#A3907C] hidden sm:inline">
        Unit {activeIndex + 1} of {allUnits.length}
      </span>

      {/* Unified Progression Action Button */}
      {activeIndex === allUnits.length - 2 && course?.final_assessment ? (
        <button
          type="button"
          onClick={handleCompleteAndNext}
          className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border border-[#FF7A00] bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] cursor-pointer shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all animate-pulse"
        >
          <Shield className="w-4 h-4" />
          <span>Complete Unit &amp; Enter Final Exam ({course?.final_assessment?.total_questions || 60} MCQs)</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      ) : activeIndex >= allUnits.length - 1 ? (
        <button
          type="button"
          onClick={handleMarkLessonComplete}
          disabled={isLessonCompleted || savingProgress}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
            isLessonCompleted
              ? 'bg-[#1A1208] text-[#FF7A00] border-[#FF7A00]/40'
              : 'border-[#FF7A00] bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] cursor-pointer shadow-[0_0_15px_rgba(255,122,0,0.3)]'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{isLessonCompleted ? 'Unit Completed' : savingProgress ? 'Saving...' : 'Complete Unit'}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCompleteAndNext}
          disabled={savingProgress}
          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border border-[#FF7A00] bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] cursor-pointer shadow-[0_0_18px_rgba(255,122,0,0.35)] transition-all"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{isLessonCompleted ? 'Unit Completed • Next' : savingProgress ? 'Saving...' : 'Complete & Next'}</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      )}
    </div>
  );
}
