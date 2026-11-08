import React from 'react';
import {
  BookOpen,
  X,
  Folder,
  FolderOpen,
  Lock,
  Check,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Award,
  Shield
} from 'lucide-react';
import { mockEngine } from '../../../services/db/mockEngine';

export default function LessonOutlineSidebar({
  sidebarOpen,
  setSidebarOpen,
  course,
  expandedModules,
  setExpandedModules,
  activeUnit,
  handleSelectUnit,
  isModuleUnlocked,
  currentEnrolment,
  enrolment,
  enrolmentId,
  isFinalExamUnlocked
}) {
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[#FF7A00]/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#FF7A00]" />
          <h3 className="font-bold text-sm text-white font-lora">Course outline</h3>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded text-[#A3907C] hover:text-[#FF7A00] transition-colors cursor-pointer"
          title="Collapse outline"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Outline Modules Accordion */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {(course?.modules || []).map((mod, modIdx) => {
          const isUnlocked = isModuleUnlocked(modIdx);
          const isCurrentMod = activeUnit?.moduleId === mod.id;
          // TEMPORARY_GATEWAY_MODULE_6: Auto-expand Module 6 if not explicitly toggled
          const isExpanded = isUnlocked && (expandedModules[mod.id] !== undefined ? Boolean(expandedModules[mod.id]) : (isCurrentMod || modIdx === 0));
          const modLessons = mod.lessons || [];
          const completedLessonsList = currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || [];
          const passedQuizzesList = currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || [];
          const completedCount = modLessons.filter((l) =>
            completedLessonsList.includes(l.id)
          ).length;
          const isModQuizPassed = mod.quiz && passedQuizzesList.includes(mod.quiz.id);

          return (
            <div
              key={mod.id || modIdx}
              className={`rounded-xl border transition-all ${
                !isUnlocked
                  ? 'border-white/5 bg-[#030907] opacity-65'
                  : isCurrentMod
                  ? 'border-[#FF7A00]/40 bg-[#1A1208]/80 shadow-[0_0_15px_rgba(255,122,0,0.1)]'
                  : 'border-[#FF7A00]/15 bg-[#0E0C09]'
              }`}
            >
              {/* Module Accordion Header */}
              <button
                type="button"
                onClick={() => {
                  if (!isUnlocked) {
                    alert(`Module ${modIdx + 1} Locked: You must complete all lessons and pass the Module ${modIdx} Knowledge Check (>= 80%) to unlock.`);
                    return;
                  }
                  setExpandedModules((prev) => ({
                    ...prev,
                    [mod.id]: !isExpanded
                  }));
                }}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-[#0c2a1e]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2.5 truncate pr-2">
                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    {!isUnlocked ? (
                      <Folder className="w-4 h-4 text-gray-500" />
                    ) : isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-[#FF7A00]" />
                    ) : (
                      <Folder className="w-4 h-4 text-[#FFA439]" />
                    )}
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${
                        !isUnlocked
                          ? 'bg-black text-gray-500 border-gray-700'
                          : completedCount === modLessons.length && (!mod.quiz || isModQuizPassed)
                          ? 'bg-[#FF7A00] text-[#071018] border-[#FF7A00]'
                          : 'bg-[#080705] text-[#FF7A00] border-[#FF7A00]/30'
                      }`}
                    >
                      {!isUnlocked ? (
                        <Lock className="w-2.5 h-2.5" />
                      ) : completedCount === modLessons.length && (!mod.quiz || isModQuizPassed) ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        modIdx + 1
                      )}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white truncate font-lora">
                    {mod.title}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  {!isUnlocked && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-gray-400 border border-gray-800">
                      LOCKED
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A3907C] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Module Child Units */}
              {isExpanded && isUnlocked && (
                <div className="p-2 space-y-1 bg-[#080705]/80 border-t border-[#FF7A00]/15">
                  {/* 1. Lessons in Module */}
                  {modLessons.map((les) => {
                    const isDone = (currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || []).includes(les.id);
                    const isActive = activeUnit?.id === les.id;

                    return (
                      <button
                        key={les.id}
                        type="button"
                        onClick={() => handleSelectUnit({ id: les.id, type: 'lesson', lesson: les, moduleIndex: modIdx })}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#FF7A00] text-[#071018] font-bold shadow-sm'
                            : 'text-[#E2D9CE] hover:bg-[#1A1208] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate pr-2">
                          <BookOpen
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                              isActive
                                ? 'text-[#071018]'
                                : isDone
                                ? 'text-[#FF7A00]'
                                : 'text-[#A3907C]'
                            }`}
                          />
                          <span className="truncate font-lora">{les.title}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 flex-shrink-0">
                          {isDone && (
                            <CheckCircle2
                              className={`w-3 h-3 ${
                                isActive ? 'text-[#071018]' : 'text-[#FF7A00]'
                              }`}
                            />
                          )}
                          <span
                            className={`text-[10px] font-mono ${
                              isActive ? 'text-[#071018]' : 'text-[#A3907C]'
                            }`}
                          >
                            {les.duration || '15 mins'}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* 2. Module Knowledge Check Unit (20 Questions) */}
                  {mod.quiz && (() => {
                    const lockInfo = mockEngine.isExamLocked(enrolmentId, mod.quiz.id);
                    const isQuizLocked = lockInfo.isLocked;
                    const attemptStatus = mockEngine.getQuizAttemptStatus(enrolmentId, mod.quiz.id);
                    const areAllLessonsCompleted = modLessons.length === 0 || completedCount === modLessons.length;

                    return (
                      <button
                        type="button"
                        onClick={() => {
                          if (!areAllLessonsCompleted) {
                            alert(`Knowledge Check Locked: Complete all ${modLessons.length} lessons in ${mod.title} (${completedCount}/${modLessons.length} completed) before attempting the examination.`);
                            return;
                          }
                          handleSelectUnit({
                            id: mod.quiz.id,
                            type: 'quiz',
                            quiz: mod.quiz,
                            moduleIndex: modIdx,
                            moduleId: mod.id,
                            moduleTitle: mod.title
                          });
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all mt-1 cursor-pointer border ${
                          activeUnit?.id === mod.quiz.id
                            ? 'bg-[#FF7A00] text-[#071018] font-bold border-[#FF7A00] shadow-sm'
                            : !areAllLessonsCompleted
                            ? 'bg-[#090806] text-gray-500 border-white/5 opacity-70 hover:opacity-90'
                            : isQuizLocked
                            ? 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/60'
                            : isModQuizPassed
                            ? 'bg-[#1A1208]/90 text-[#FF7A00] border-[#FF7A00]/30 hover:bg-[#0c2a1e]'
                            : 'bg-[#1A1208]/40 text-amber-300 border-amber-500/30 hover:bg-[#1A1208]'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate pr-2">
                          {!areAllLessonsCompleted ? (
                            <Lock className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                          ) : isQuizLocked ? (
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
                          ) : (
                            <Award
                              className={`w-3.5 h-3.5 flex-shrink-0 ${
                                activeUnit?.id === mod.quiz.id
                                  ? 'text-[#071018]'
                                  : isModQuizPassed
                                  ? 'text-[#FF7A00]'
                                  : 'text-amber-400'
                              }`}
                            />
                          )}
                          <span className="truncate font-semibold">
                            Knowledge Check (20 Qs)
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            activeUnit?.id === mod.quiz.id
                              ? 'bg-[#071018] text-[#FF7A00]'
                              : !areAllLessonsCompleted
                              ? 'bg-black text-gray-400 border border-gray-800'
                              : isQuizLocked
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                              : isModQuizPassed
                              ? 'bg-[#FF7A00]/15 text-[#FF7A00]'
                              : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          {!areAllLessonsCompleted
                            ? `LOCKED (${completedCount}/${modLessons.length})`
                            : isQuizLocked
                            ? '24H LOCK'
                            : isModQuizPassed
                            ? 'PASSED'
                            : `${attemptStatus.attemptsRemaining}/3 TRIES`}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}

        {/* 3. Final Certification Examination Milestone */}
        {course?.final_assessment && (() => {
          const isFinalLocked = mockEngine.isExamLocked(enrolmentId, course.final_assessment.id).isLocked;
          const finalAttemptStatus = mockEngine.getQuizAttemptStatus(enrolmentId, course.final_assessment.id);
          return (
            <div className="pt-3 border-t border-[#FF7A00]/20">
              <button
                type="button"
                onClick={() => {
                  if (!isFinalExamUnlocked) {
                    alert('Final Assessment Locked: You must complete all prior course modules and score >= 80% on each knowledge check.');
                    return;
                  }
                  handleSelectUnit({
                    id: course.final_assessment.id,
                    type: 'final_exam',
                    quiz: course.final_assessment,
                    moduleIndex: course.modules.length,
                    moduleId: 'mod_final',
                    moduleTitle: 'Final Comprehensive Certification Assessment'
                  });
                }}
                className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
                  activeUnit?.id === course.final_assessment.id
                    ? 'bg-[#FF7A00] text-[#071018] font-bold border-[#FF7A00] shadow-md'
                    : isFinalLocked
                    ? 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/60'
                    : isFinalExamUnlocked
                    ? 'bg-[#1A1208] text-[#FF7A00] border-[#FF7A00]/40 hover:bg-[#0c2a1e]'
                    : 'bg-[#080705] text-gray-500 border-gray-800 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center space-x-2 truncate pr-2">
                  {isFinalLocked ? (
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  ) : (
                    <Shield className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="truncate font-bold">
                    Final Certification Exam (50 MCQs)
                  </span>
                </div>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                    activeUnit?.id === course.final_assessment.id
                      ? 'bg-[#071018] text-[#FF7A00] border-[#071018]'
                      : isFinalLocked
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                      : enrolment?.final_assessment_passed
                      ? 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30'
                      : isFinalExamUnlocked
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  {isFinalLocked
                    ? '24H LOCK'
                    : enrolment?.final_assessment_passed
                    ? 'PASSED'
                    : isFinalExamUnlocked
                    ? `${finalAttemptStatus.attemptsRemaining}/3 TRIES`
                    : 'LOCKED'}
                </span>
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );

  return (
    <>
      {sidebarOpen && (
        <aside className="w-72 lg:w-80 xl:w-84 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar border-r border-[#FF7A00]/25 bg-[#080604]/95 backdrop-blur-2xl hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 z-20 self-start">
          {renderSidebarContent()}
        </aside>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-[#080604] border-r border-[#FF7A00]/30 shadow-2xl flex flex-col h-full z-10 animate-fade-in">
            {renderSidebarContent()}
          </aside>
        </div>
      )}
    </>
  );
}
