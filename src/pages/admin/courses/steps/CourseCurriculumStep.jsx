import React from 'react';
import { Layers, Plus, Trash2, Play, Image as ImageIcon, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CourseCurriculumStep({
  courseFormData,
  activeModuleIndex,
  setActiveModuleIndex,
  onOpenAddModule,
  onDeleteModule,
  onOpenAddLesson,
  onOpenEditLesson,
  onDeleteLesson,
  onConfigureExam,
  onBack,
  onProceed
}) {
  const modules = courseFormData.modules || [];

  return (
    <div className="space-y-6 animate-slide-left">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-white">Curriculum Outline & Modules</h4>
          <p className="text-xs text-[#A3907C] font-mono">
            Build your sequential curriculum structure with modules, lessons, and practical labs.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAddModule}
          className="px-3.5 py-1.5 bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono rounded-xl flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(255,122,0,0.3)] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Module</span>
        </button>
      </div>

      {modules.length === 0 ? (
        <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center space-y-3 bg-[#0E0C09]">
          <Layers className="w-8 h-8 text-[#FF7A00] mx-auto opacity-70" />
          <div className="text-sm text-white font-medium">No modules created yet</div>
          <p className="text-xs text-[#A3907C] font-mono max-w-sm mx-auto">
            Click "+ Add Module" above to start structuring your curriculum syllabus.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((mod, modIdx) => (
            <div
              key={mod.id || modIdx}
              className="p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#FF7A00]/20">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-xs font-mono font-bold text-[#FF7A00]">
                    {modIdx + 1}
                  </span>
                  <div>
                    <h5 className="font-bold text-sm text-white">{mod.title}</h5>
                    <span className="text-[11px] font-mono text-[#A3907C]">
                      {(mod.lessons || []).length} Lessons • Knowledge Check ({mod.quiz?.questions?.length || 20} Qs)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleIndex(modIdx);
                      onOpenAddLesson();
                    }}
                    className="px-2.5 py-1 text-xs font-mono bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/30 rounded-lg flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Lesson</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteModule(modIdx)}
                    className="p-1 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg"
                    title="Delete Module"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Lessons List in Module */}
              <div className="space-y-2">
                {(mod.lessons || []).map((les, lIdx) => (
                  <div
                    key={les.id || lIdx}
                    className="p-3 rounded-xl bg-[#080705] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5 truncate pr-2">
                      <Play className="w-3.5 h-3.5 text-[#FF7A00] flex-shrink-0" />
                      <span className="text-white truncate font-medium">{les.title}</span>
                      {les.images?.length > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFA439]/15 text-[#FFA439] border border-[#FFA439]/30 flex items-center gap-1">
                          <ImageIcon className="w-2.5 h-2.5" />
                          <span>{les.images.length} Img{les.images.length > 1 ? 's' : ''}</span>
                        </span>
                      )}
                      {les.pdf_attachment && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          PDF
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0 font-mono text-[11px] text-[#A3907C]">
                      <span>{les.duration || '15 mins'}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModuleIndex(modIdx);
                          onOpenEditLesson(les, lIdx);
                        }}
                        className="text-[#FF7A00] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModuleIndex(modIdx);
                          onDeleteLesson(lIdx);
                        }}
                        className="text-[#EF4444] hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Knowledge Check Indicator */}
                <div className="p-3 rounded-xl bg-[#1A1208]/50 border border-[#FF7A00]/25 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2 text-[#FF7A00] font-bold">
                    <Award className="w-4 h-4" />
                    <span>Module Knowledge Check ({mod.quiz?.questions?.length || 20} Questions)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleIndex(modIdx);
                      onConfigureExam(modIdx);
                    }}
                    className="text-xs text-[#FF7A00] underline cursor-pointer"
                  >
                    Configure Exam →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-mono text-[#A3907C] hover:text-white flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 2</span>
        </button>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <span>Proceed to Step 4: 20-Question Exam</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
