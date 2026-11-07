import React from 'react';
import { Sparkles, Plus, Trash2, Edit3, ArrowLeft, Check } from 'lucide-react';

export default function CourseExamStep({
  courseFormData,
  activeModuleIndex,
  setActiveModuleIndex,
  onGenerate20Questions,
  onOpenAddQuestion,
  onOpenEditQuestion,
  onDeleteQuestion,
  onBack,
  onSaveCourse,
  isSaving
}) {
  const currentMod = courseFormData.modules?.[activeModuleIndex] || null;
  const questions = currentMod?.quiz?.questions || [];

  return (
    <div className="space-y-6 animate-slide-left">
      <div className="p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FF7A00]/20">
          <div>
            <span className="text-[10px] font-mono text-[#FF7A00] font-bold uppercase tracking-wider block">
              MODULE ASSESSMENT & QUESTIONS (MANUAL BUILDER)
            </span>
            <h4 className="font-bold text-base text-white">
              {currentMod?.title || 'Select a Module'} — Examination Pool
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeModuleIndex}
              onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
              className="bg-[#080705] text-xs font-mono text-[#FF7A00] px-3 py-2 rounded-xl border border-[#FF7A00]/30 focus:outline-none cursor-pointer"
            >
              {(courseFormData.modules || []).map((m, idx) => (
                <option key={m.id || idx} value={idx}>
                  Module {idx + 1}: {m.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={onGenerate20Questions}
              className="px-3 py-2 rounded-xl bg-[#1A1208] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(101,245,138,0.2)] cursor-pointer"
              title="Automatically populate 20 comprehensive questions"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Generate 20 Qs</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddQuestion}
              className="px-3 py-2 rounded-xl bg-[#FF7A00] text-[#071018] font-bold text-xs font-mono flex items-center space-x-1.5 shadow-[0_0_15px_rgba(255,122,0,0.3)] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-white/5 rounded-xl space-y-2 text-[#A3907C] font-mono text-xs">
            <p>No questions configured yet for this module.</p>
            <p className="text-[11px] text-slate-500">
              Click "Auto-Generate 20 Qs" for an instant 20-question cybersecurity pool, or click "Add Question" to draft custom MCQs.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {questions.map((q, qIdx) => (
              <div
                key={q.id || qIdx}
                className="p-3.5 rounded-xl bg-[#080705] border border-white/5 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2">
                    <span className="font-mono text-[#FF7A00] font-bold flex-shrink-0">
                      Q{qIdx + 1}.
                    </span>
                    <span className="text-white font-medium">{q.text}</span>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenEditQuestion(q, qIdx)}
                      className="p-1 text-[#FF7A00] hover:bg-[#FF7A00]/10 rounded"
                      title="Edit Question"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteQuestion(qIdx)}
                      className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 font-mono text-[11px]">
                  {(q.options || []).map((opt, oIdx) => (
                    <div
                      key={opt.id || oIdx}
                      className={`p-1.5 rounded-lg border ${
                        opt.is_correct
                          ? 'border-[#65F58A]/40 bg-[#65F58A]/10 text-[#65F58A] font-bold'
                          : 'border-white/5 bg-[#0E0C09] text-[#A3907C]'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-mono text-[#A3907C] hover:text-white flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 3</span>
        </button>

        <button
          type="button"
          disabled={isSaving}
          onClick={onSaveCourse}
          className="px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] disabled:opacity-60 text-[#071018] font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(255,122,0,0.4)] cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Save & Deploy Course</span>
        </button>
      </div>
    </div>
  );
}
