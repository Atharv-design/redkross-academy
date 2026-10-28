import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Award,
  Coins,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Menu,
  FileDown
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function LessonPlayerPage() {
  const { enrolmentId } = useParams();
  const navigate = useNavigate();
  const { refreshBalance, currentUser } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;

  // Flatten lessons for navigation
  const allLessons = [];
  if (course && course.modules) {
    course.modules.forEach((mod) => {
      (mod.lessons || []).forEach((les) => {
        allLessons.push({ ...les, module_id: mod.id, module_title: mod.title, quiz: mod.quiz });
      });
    });
  }

  // Active lesson state (default to first incomplete or first lesson)
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [progressData, setProgressData] = useState({ percentage: 0, completed: 0, total: 0 });
  const [unlockedFinal, setUnlockedFinal] = useState({ is_unlocked: false, reasons: [] });
  // Responsive mobile tab switcher ('lesson' | 'syllabus' | 'resources')
  const [mobileTab, setMobileTab] = useState('lesson');
  const [savingProgress, setSavingProgress] = useState(false);

  useEffect(() => {
    if (enrolment && allLessons.length > 0) {
      const firstIncomplete = allLessons.find(
        (l) => !enrolment.completed_mandatory_lessons.includes(l.id)
      );
      setActiveLessonId(firstIncomplete ? firstIncomplete.id : allLessons[0].id);
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));
    }
  }, [enrolmentId]);

  if (!enrolment || !course) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">Enrolment Not Found</h2>
        <p className="text-xs text-slate-400 mb-4">Please verify that you are enrolled in this training course.</p>
        <Link to="/student" className="px-5 py-2.5 bg-redkross-600 rounded-lg text-white text-xs font-semibold inline-flex items-center space-x-2">
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const isLessonCompleted = enrolment.completed_mandatory_lessons.includes(activeLesson?.id);

  const handleMarkComplete = async () => {
    if (!activeLesson) return;
    setSavingProgress(true);

    try {
      // Complete in backend PostgreSQL and local mock engine
      await apiClient.completeLesson(enrolmentId, activeLesson.id);
      const newProgress = mockEngine.getCourseProgress(enrolmentId);
      setProgressData(newProgress);
      refreshBalance();
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));

      // Auto-advance to next lesson if available
      if (activeIndex < allLessons.length - 1) {
        setActiveLessonId(allLessons[activeIndex + 1].id);
        setMobileTab('lesson');
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071018] flex flex-col">
      {/* Top Bar Navigation */}
      <div className="h-14 bg-surface-card border-b border-surface-border px-3 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-2 sm:space-x-3 truncate">
          <Link
            to="/student"
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-300 transition-colors flex-shrink-0"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] xs:max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <div className="text-[10px] text-slate-400 font-mono truncate">
              {activeIndex + 1}/{allLessons.length} • {activeLesson?.title}
            </div>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="hidden sm:inline text-slate-400">Progress:</span>
            <span className="text-redkross-400 font-bold tabular-nums">{progressData.percentage}%</span>
          </div>
          <div className="w-16 sm:w-28 h-2 rounded-full bg-surface-100 overflow-hidden border border-surface-border">
            <div
              className="h-full bg-gradient-to-r from-redkross-600 to-rose-400 rounded-full transition-all duration-300"
              style={{ width: `${progressData.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Segmented Tab Bar (< lg screens) */}
      <div className="lg:hidden bg-surface-card/90 border-b border-surface-border px-3 py-2 flex items-center justify-between gap-1.5 sticky top-14 z-10 backdrop-blur-md">
        <button
          onClick={() => setMobileTab('lesson')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'lesson'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Lesson</span>
        </button>
        <button
          onClick={() => setMobileTab('syllabus')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'syllabus'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Modules</span>
        </button>
        <button
          onClick={() => setMobileTab('resources')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'resources'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resources</span>
        </button>
      </div>

      {/* Responsive Workstation Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Curriculum Syllabus Navigation */}
        <div
          className={`w-full lg:w-80 bg-surface-card border-r border-surface-border overflow-y-auto p-4 space-y-6 ${
            mobileTab === 'syllabus' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Course Syllabus</span>
            <span className="text-slate-500">{course.modules.length} Modules</span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-300 font-mono uppercase tracking-wider px-2 py-1 bg-surface-100/60 rounded">
                  {mod.title}
                </div>

                <div className="space-y-1 pl-1">
                  {mod.lessons.map((les) => {
                    const isDone = enrolment.completed_mandatory_lessons.includes(les.id);
                    const isActive = les.id === activeLessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveLessonId(les.id);
                          setMobileTab('lesson');
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-redkross-600/15 border border-redkross-600/40 text-white font-semibold'
                            : 'hover:bg-surface-100 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}

                  {/* Chapter Quiz Trigger */}
                  {mod.quiz && (
                    <Link
                      to={`/student/quiz/${enrolmentId}/${mod.quiz.id}`}
                      className={`w-full p-2.5 rounded-lg text-xs flex items-center justify-between transition-all mt-1 ${
                        enrolment.passed_quizzes.includes(mod.quiz.id)
                          ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Award className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-semibold truncate">Chapter Quiz: {mod.quiz.title}</span>
                      </div>
                      {enrolment.passed_quizzes.includes(mod.quiz.id) ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">PASSED</span>
                      ) : (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">+100 T</span>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Final Assessment Gate Trigger */}
            {course.final_assessment && (
              <div className="pt-4 border-t border-surface-border">
                <Link
                  to={`/student/final-exam/${enrolmentId}`}
                  className={`w-full p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                    unlockedFinal.is_unlocked
                      ? 'bg-redkross-600 hover:bg-redkross-700 text-white shadow-lg cyber-glow-red'
                      : 'bg-surface-100/60 border border-surface-border text-slate-400 cursor-pointer hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {unlockedFinal.is_unlocked ? (
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Final Certification Exam</span>
                  </div>
                  <span className="text-[10px] font-mono">
                    {unlockedFinal.is_unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </Link>
                {!unlockedFinal.is_unlocked && (
                  <div className="text-[10px] text-slate-400 font-mono mt-1.5 leading-tight">
                    Requires 100% lessons + all quizzes passed + 80% token quota.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center Column: Active Lesson Viewport */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 ${
            mobileTab === 'lesson' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          {activeLesson ? (
            <>
              {/* Lesson Header */}
              <div className="pb-4 sm:pb-6 border-b border-surface-border">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-redkross-400 mb-2">
                  <span className="truncate max-w-[200px]">{activeLesson.module_title}</span>
                  <span>•</span>
                  <span>{activeLesson.duration}</span>
                  {activeLesson.is_mandatory && (
                    <span className="px-2 py-0.5 rounded bg-redkross-600/10 border border-redkross-600/30 text-redkross-400 text-[10px]">
                      MANDATORY
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 sm:mb-3">
                  {activeLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeLesson.summary}
                </p>
              </div>

              {/* Formatted Content Body */}
              <div className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4 sm:space-y-6">
                <div
                  className="bg-surface-card border border-surface-border rounded-xl p-4 sm:p-6 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: activeLesson.content
                      ? activeLesson.content
                          .replace(/### (.*)/g, '<h3 class="text-base sm:text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                          .replace(/#### (.*)/g, '<h4 class="text-xs sm:text-sm font-bold text-redkross-400 mt-3 mb-1">$1</h4>')
                          .replace(/```bash([\s\S]*?)```/g, '<pre class="bg-black/70 p-3 sm:p-4 rounded-lg font-mono text-[11px] sm:text-xs text-[#35E6B5] border border-slate-800 overflow-x-auto my-3"><code>$1</code></pre>')
                          .replace(/```powershell([\s\S]*?)```/g, '<pre class="bg-black/70 p-3 sm:p-4 rounded-lg font-mono text-[11px] sm:text-xs text-[#65F58A] border border-slate-800 overflow-x-auto my-3"><code>$1</code></pre>')
                          .replace(/```sql([\s\S]*?)```/g, '<pre class="bg-black/70 p-3 sm:p-4 rounded-lg font-mono text-[11px] sm:text-xs text-amber-300 border border-slate-800 overflow-x-auto my-3"><code>$1</code></pre>')
                          .replace(/> (.*)/g, '<blockquote class="border-l-4 border-redkross-500 pl-3 sm:pl-4 py-1 text-slate-300 bg-redkross-950/20 rounded-r text-[11px] sm:text-xs my-3 font-mono">$1</blockquote>')
                      : '<p>Content being rendered...</p>',
                  }}
                />
              </div>

              {/* Lesson Action Footer */}
              <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                  {isLessonCompleted ? (
                    <span className="flex items-center space-x-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span>Pending Completion</span>
                  )}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleMarkComplete}
                    disabled={savingProgress}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-xs transition-all flex items-center justify-center space-x-2 ${
                      isLessonCompleted
                        ? 'bg-surface-100 hover:bg-surface-200 text-slate-300 border border-surface-border'
                        : 'bg-redkross-600 hover:bg-redkross-700 text-white shadow-lg hover:cyber-glow-red'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {savingProgress
                        ? 'Saving to Database...'
                        : isLessonCompleted
                        ? 'Marked as Complete (Advance)'
                        : 'Mark Complete & Next Lesson'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-400">Select a lesson to begin.</div>
          )}
        </div>

        {/* Right Column: Downloadable Resources & Cheat Sheets */}
        <div
          className={`w-full lg:w-72 bg-surface-card border-l border-surface-border p-5 space-y-6 overflow-y-auto ${
            mobileTab === 'resources' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Download className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Lesson Resources</span>
          </div>

          <div className="space-y-3">
            {(activeLesson?.resources || [
              { name: 'SOC Triage Standard Operating Procedure (PDF)', size: '1.4 MB' },
              { name: 'Windows Event ID Reference Matrix', size: '890 KB' }
            ]).map((res, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface-100/70 border border-surface-border hover:border-slate-600 transition-colors space-y-1.5"
              >
                <div className="text-xs font-semibold text-white flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-redkross-400 flex-shrink-0 mt-0.5" />
                  <span>{res.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pl-6">
                  <span>{res.size}</span>
                  <button
                    onClick={() => alert(`Simulating download for ${res.name}`)}
                    className="text-[#35E6B5] hover:underline"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Token Milestone Notice */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-amber-300">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Token Milestones</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Every 20% course progress milestone rewards +50 RedKross Tokens to your wallet!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
