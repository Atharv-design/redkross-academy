import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Award,
  Coins,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Calendar,
  Clock,
  Bookmark,
  TrendingUp,
  Check,
  AlertCircle
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

/**
 * CourseHomePage — Open edX-Inspired Enrolled Course Hub
 * Matches:
 * - Course Tab: https://apps.training.openedx.io/learning/course/course-v1:OpenedX+OEX-Dev101+2024/home
 * - Progress Tab: https://apps.training.openedx.io/learning/course/course-v1:OpenedX+OEX-Dev101+2024/progress
 */
export default function CourseHomePage() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'course'); // 'course' | 'progress'
  const [course, setCourse] = useState(null);
  const [enrolment, setEnrolment] = useState(null);
  const [progressData, setProgressData] = useState({ percentage: 0, completedLessonIds: [] });
  const [expandedModules, setExpandedModules] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/student/course/${courseId}` } } });
      return;
    }

    const c = mockEngine.getCourseById(courseId) || mockEngine.getCourseBySlug(courseId);
    if (!c) {
      navigate('/courses');
      return;
    }
    setCourse(c);

    const userEnrolments = mockEngine.getEnrolmentsForUser(currentUser.id);
    const enr = userEnrolments.find((e) => e.course_id === c.id);
    if (!enr) {
      // If user isn't enrolled yet, navigate to course about page
      navigate(`/courses/${c.slug || c.id}`);
      return;
    }
    setEnrolment(enr);

    const prog = mockEngine.getCourseProgress(enr.id);
    setProgressData(prog);

    // Default expand first module
    if (c.modules?.length) {
      setExpandedModules({ 0: true });
    }
  }, [courseId, currentUser, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const toggleModule = (idx) => {
    setExpandedModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleExpandAll = () => {
    if (!course?.modules) return;
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const updated = {};
    course.modules.forEach((_, idx) => {
      updated[idx] = nextState;
    });
    setExpandedModules(updated);
  };

  if (!course || !enrolment) {
    return (
      <div className="min-h-screen py-24 text-center relative z-10 flex items-center justify-center font-sans">
        <div className="max-w-md p-8 rounded-2xl cyber-glass-card border border-[#65F58A]/30 space-y-4">
          <h2 className="font-royal text-xl font-bold text-white">Loading Courseware...</h2>
          <p className="text-xs text-[#B8E6CE] font-mono">Verifying student credentials and telemetry.</p>
        </div>
      </div>
    );
  }

  // Find next uncompleted lesson to resume
  const allLessons = (course.modules || []).flatMap((m) => m.lessons || []);
  const completedSet = new Set(progressData.completedLessonIds || []);
  const nextLesson = allLessons.find((l) => !completedSet.has(l.id)) || allLessons[0];
  const isStarted = completedSet.size > 0;
  const isComplete = progressData.percentage === 100;

  // Grade Calculations for Progress Tab
  const passingScore = 70;
  const currentGrade = progressData.percentage;
  const isPassing = currentGrade >= passingScore;

  return (
    <div className="min-h-screen py-8 relative z-10 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ================= 1. OPEN EDX TOP SUB-NAVBAR & TABS ================= */}
        <div className="border-b border-[#65F58A]/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#72A88E] min-w-0 overflow-hidden">
                <Link to="/student" className="hover:text-white transition-colors flex-shrink-0">Classroom</Link>
                <span className="flex-shrink-0">/</span>
                <span className="text-[#65F58A] flex-shrink-0">{course.category}</span>
                <span className="flex-shrink-0">/</span>
                <span className="text-white font-semibold truncate">{course.title}</span>
              </div>
              <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight break-words [overflow-wrap:anywhere] break-all">
                {course.title}
              </h1>
            </div>

            {/* Quick Action Link */}
            <div className="flex items-center gap-3">
              <Link
                to={`/student/learn/${enrolment.id}`}
                className="px-4 py-2 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-royal font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(101,245,138,0.35)] transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isStarted ? 'Resume Courseware' : 'Begin Learning'}</span>
              </Link>
            </div>
          </div>

          {/* Open edX Two Tabs: Course & Progress */}
          <div className="flex items-center space-x-8 mt-6">
            <button
              type="button"
              onClick={() => handleTabChange('course')}
              className={`pb-3 font-royal text-sm font-bold tracking-wide transition-all relative cursor-pointer ${
                activeTab === 'course'
                  ? 'text-[#65F58A]'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              <span>Course</span>
              {activeTab === 'course' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#65F58A] rounded-full shadow-[0_0_8px_#65F58A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('progress')}
              className={`pb-3 font-royal text-sm font-bold tracking-wide transition-all relative cursor-pointer ${
                activeTab === 'progress'
                  ? 'text-[#65F58A]'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              <span>Progress</span>
              {activeTab === 'progress' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#65F58A] rounded-full shadow-[0_0_8px_#65F58A]" />
              )}
            </button>
          </div>
        </div>

        {/* ================= 2. TAB CONTENT ================= */}

        {/* -------------------- TAB 1: COURSE HOME -------------------- */}
        {activeTab === 'course' && (
          <div className="space-y-6 animate-slide-left">
            
            {/* Top Banner: "Begin your course today" / "Resume course" */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-7 border border-[#65F58A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(101,245,138,0.08)]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#65F58A] font-bold tracking-widest uppercase block">
                  {isStarted ? 'ACTIVE OPERATOR TRAINING' : 'CURRICULUM UNLOCKED'}
                </span>
                <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  {isStarted
                    ? `Continue: ${nextLesson?.title || 'Next Lesson'}`
                    : 'Begin your course today'}
                </h2>
                <p className="text-xs text-[#C9EFE0] max-w-xl">
                  {isStarted
                    ? `You've completed ${completedSet.size} of ${allLessons.length} units (${progressData.percentage}%). Jump directly back into your active module.`
                    : 'Structured defensive cybersecurity syllabus. Complete mandatory modules and practical labs to qualify for the final certification exam.'}
                </p>
              </div>

              <Link
                to={`/student/learn/${enrolment.id}${nextLesson ? `?lessonId=${nextLesson.id}` : ''}`}
                className="px-6 py-3.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-royal font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer flex-shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isStarted ? 'Resume Course' : 'Start course'}</span>
              </Link>
            </div>

            {/* Layout: Outline & Right Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-0">
              
              {/* Modules Outline (Left 2 Columns) */}
              <div className="lg:col-span-2 space-y-4 min-w-0">
                
                {/* Header with "Expand all / Collapse all" */}
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                    Course Outline
                  </h3>
                  <button
                    type="button"
                    onClick={toggleExpandAll}
                    className="px-3 py-1.5 rounded-lg cyber-glass-card border border-[#65F58A]/25 text-xs font-mono text-[#65F58A] hover:bg-[#65F58A]/10 transition-colors cursor-pointer"
                  >
                    {allExpanded ? 'Collapse all' : 'Expand all'}
                  </button>
                </div>

                {/* Modules Accordion List */}
                <div className="space-y-3">
                  {(course.modules || []).map((mod, modIdx) => {
                    const modLessons = mod.lessons || [];
                    const modCompleted = modLessons.filter((l) => completedSet.has(l.id)).length;
                    const isModAllDone = modLessons.length > 0 && modCompleted === modLessons.length;
                    const isExpanded = Boolean(expandedModules[modIdx]);

                    return (
                      <div
                        key={mod.id || modIdx}
                        className="rounded-xl border border-[#65F58A]/20 bg-[#061510]/70 overflow-hidden transition-all"
                      >
                        {/* Module Header Bar */}
                        <button
                          type="button"
                          onClick={() => toggleModule(modIdx)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#0c2a1e]/60 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 border ${
                                isModAllDone
                                  ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] shadow-[0_0_8px_#65F58A]'
                                  : modCompleted > 0
                                  ? 'bg-[#092218] text-[#35E6B5] border-[#35E6B5]/50'
                                  : 'bg-[#040e0a] text-[#72A88E] border-[#65F58A]/20'
                              }`}
                            >
                              {isModAllDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : modIdx + 1}
                            </span>
                            <span className="font-royal font-bold text-sm text-white truncate">
                              {mod.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0 pl-2">
                            <span className="text-[11px] font-mono text-[#72A88E] hidden sm:inline">
                              {modCompleted}/{modLessons.length} Completed
                            </span>
                            <span className="w-6 h-6 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-xs text-[#65F58A]">
                              {isExpanded ? '-' : '+'}
                            </span>
                          </div>
                        </button>

                        {/* Expanded Module Lessons / Units */}
                        {isExpanded && (
                          <div className="p-3 border-t border-[#65F58A]/15 space-y-1.5 bg-[#040e0a]/90">
                            {modLessons.map((les, lIdx) => {
                              const isDone = completedSet.has(les.id);
                              return (
                                <Link
                                  key={les.id || lIdx}
                                  to={`/student/learn/${enrolment.id}?lessonId=${les.id}`}
                                  className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-all group ${
                                    isDone
                                      ? 'bg-[#071912]/60 border-[#65F58A]/20 hover:border-[#65F58A]/50'
                                      : 'bg-[#061510] border-white/5 hover:border-[#65F58A]/40'
                                  }`}
                                >
                                  <div className="flex items-center gap-3 truncate">
                                    <span
                                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                                        isDone
                                          ? 'bg-[#65F58A]/20 text-[#65F58A]'
                                          : 'bg-white/[0.04] text-[#72A88E]'
                                      }`}
                                    >
                                      {isDone ? (
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      ) : (
                                        <Play className="w-2.5 h-2.5 fill-current opacity-60" />
                                      )}
                                    </span>
                                    <span
                                      className={`truncate font-medium transition-colors ${
                                        isDone
                                          ? 'text-[#C9EFE0] group-hover:text-white'
                                          : 'text-slate-300 group-hover:text-[#65F58A]'
                                      }`}
                                    >
                                      {les.title}
                                    </span>
                                    {les.is_mandatory && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 flex-shrink-0 font-bold">
                                        REQUIRED
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#72A88E] flex-shrink-0 pl-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{les.duration || '15 mins'}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Sidebar: Course Tools & Important Dates (Open edX Style) */}
              <div className="space-y-6">
                
                {/* Course Tools */}
                <div className="cyber-glass-panel rounded-2xl p-5 border border-[#65F58A]/25 space-y-3">
                  <h4 className="font-royal text-xs font-mono uppercase tracking-wider text-[#65F58A] font-bold">
                    Course Tools
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => navigate(`/student/learn/${enrolment.id}`)}
                      className="w-full p-2.5 rounded-xl bg-[#092218]/40 border border-[#65F58A]/20 hover:border-[#65F58A]/50 flex items-center justify-between text-[#C9EFE0] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="w-3.5 h-3.5 text-[#35E6B5]" />
                        <span>Bookmarked Units</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#72A88E]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/student/learn/${enrolment.id}`)}
                      className="w-full p-2.5 rounded-xl bg-[#092218]/40 border border-[#65F58A]/20 hover:border-[#65F58A]/50 flex items-center justify-between text-[#C9EFE0] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#65F58A]" />
                        <span>Download Study Notes</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#72A88E]" />
                    </button>
                  </div>
                </div>

                {/* Important Dates */}
                <div className="cyber-glass-panel rounded-2xl p-5 border border-[#65F58A]/25 space-y-3">
                  <h4 className="font-royal text-xs font-mono uppercase tracking-wider text-[#65F58A] font-bold">
                    Important Dates
                  </h4>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[#72A88E]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Enrollment Date</span>
                      </div>
                      <div className="text-white font-semibold pl-5">
                        {enrolment.enrolled_at ? new Date(enrolment.enrolled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Active Cadre'}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[#72A88E]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Course Pace</span>
                      </div>
                      <div className="text-white font-semibold pl-5">
                        Self-Paced (Est. {course.estimated_duration || '14 Hours'})
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[#72A88E]">
                        <Award className="w-3.5 h-3.5" />
                        <span>Certification Exam</span>
                      </div>
                      <div className="text-[#35E6B5] font-semibold pl-5">
                        Available upon 100% completion
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Division Charter Seal */}
                <div className="p-4 rounded-xl bg-[#061510] border border-[#65F58A]/15 text-[11px] font-mono text-[#72A88E] space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Shield className="w-4 h-4 text-[#65F58A]" />
                    <span>RedKross Academic Registry</span>
                  </div>
                  <p>All progress, time-on-unit, and proctoring telemetry are cryptographically signed.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB 2: PROGRESS (Open edX Structure) -------------------- */}
        {activeTab === 'progress' && (
          <div className="space-y-8 animate-slide-left">
            
            {/* Overall Course Grade Progress Bar with Passing Threshold */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#65F58A]/20">
                <div>
                  <h3 className="font-royal text-xl font-bold text-white">
                    Course Grade & Assessment Summary
                  </h3>
                  <p className="text-xs text-[#72A88E] font-mono mt-0.5">
                    Required passing threshold: <span className="text-[#65F58A] font-bold">{passingScore}%</span>
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-royal text-4xl font-extrabold text-white">
                    {currentGrade}%
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isPassing
                      ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                  }`}>
                    {isPassing ? 'PASSING' : 'IN PROGRESS'}
                  </span>
                </div>
              </div>

              {/* Visual Horizontal Gauge with 70% Cutoff Line */}
              <div className="space-y-2">
                <div className="relative w-full h-7 bg-[#061510] rounded-xl overflow-hidden border border-[#65F58A]/25 p-1">
                  {/* Progress Fill */}
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-[#10B981] via-[#35E6B5] to-[#65F58A] transition-all duration-700 shadow-[0_0_15px_rgba(101,245,138,0.5)]"
                    style={{ width: `${Math.min(100, currentGrade)}%` }}
                  />

                  {/* 70% Passing Threshold Line */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-amber-400 z-10"
                    style={{ left: `${passingScore}%` }}
                  />
                  <div
                    className="absolute -top-1 font-mono text-[9px] text-amber-300 bg-[#071018] px-1 rounded border border-amber-500/40 font-bold z-20"
                    style={{ left: `calc(${passingScore}% - 22px)` }}
                  >
                    PASS 70%
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-[#72A88E] pt-1">
                  <span>0% (Start)</span>
                  <span>70% (Certificate Qualifying Line)</span>
                  <span>100% (Complete)</span>
                </div>
              </div>
            </div>

            {/* Assessment Breakdown Table (Open edX Style) */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/25 space-y-4">
              <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#65F58A]" />
                <span>Detailed Assessment Breakdown</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#65F58A]/20 text-[#72A88E] uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Evaluation Component</th>
                      <th className="py-3 px-4">Total Weight</th>
                      <th className="py-3 px-4">Units / Questions</th>
                      <th className="py-3 px-4">Score Achieved</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#65F58A]/10 text-[#C9EFE0]">
                    {/* Row 1: Core Units */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#35E6B5]" />
                        <span>Core Curriculum Units</span>
                      </td>
                      <td className="py-3.5 px-4">40%</td>
                      <td className="py-3.5 px-4">{allLessons.length} Modules</td>
                      <td className="py-3.5 px-4 font-bold text-white">{completedSet.size}/{allLessons.length} Done</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                          {progressData.percentage}%
                        </span>
                      </td>
                    </tr>

                    {/* Row 2: Module Knowledge Checks */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
                        <span>Module Knowledge Checks</span>
                      </td>
                      <td className="py-3.5 px-4">25%</td>
                      <td className="py-3.5 px-4">20 Questions / Module</td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {isStarted ? `${Math.round(currentGrade * 0.9)}% Average` : 'Pending'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                          Active
                        </span>
                      </td>
                    </tr>

                    {/* Row 3: Practical Lab Assignments */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#35E6B5]" />
                        <span>Practical Lab Reports</span>
                      </td>
                      <td className="py-3.5 px-4">15%</td>
                      <td className="py-3.5 px-4">SOC Telemetry PCAP</td>
                      <td className="py-3.5 px-4 font-bold text-white">100 / 100 Pts</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                          Evaluated
                        </span>
                      </td>
                    </tr>

                    {/* Row 4: Final Proctored Exam */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#65F58A]" />
                        <span>Proctored Final Exam</span>
                      </td>
                      <td className="py-3.5 px-4">20%</td>
                      <td className="py-3.5 px-4">50 Comprehensive Qs</td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {isComplete ? 'Unlocked' : 'Requires 100% Units'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`px-2 py-0.5 rounded border ${
                          isComplete
                            ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40'
                            : 'bg-white/5 text-[#72A88E] border-white/10'
                        }`}>
                          {isComplete ? 'Eligible' : 'Locked'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certificate Status Banner */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isPassing
                ? 'bg-[#092218]/80 border-[#65F58A]/40 shadow-[0_0_25px_rgba(101,245,138,0.15)]'
                : 'bg-[#061510] border-white/10'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-royal font-bold text-base">
                  <Award className={`w-5 h-5 ${isPassing ? 'text-[#65F58A]' : 'text-[#72A88E]'}`} />
                  <span>Institutional Credential Qualification</span>
                </div>
                <p className="text-xs text-[#C9EFE0] max-w-xl">
                  {isPassing
                    ? 'Congratulations! You have crossed the 70% passing threshold. Complete remaining units and challenge the final exam to mint your immutable on-chain credential.'
                    : 'A minimum aggregate score of 70% across lessons and assessments is required to claim your institutional digital certificate.'}
                </p>
              </div>

              {isComplete ? (
                <Link
                  to={`/student/final-exam/${enrolment.id}`}
                  className="px-5 py-3 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(101,245,138,0.4)] transition-all cursor-pointer flex-shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Certification Exam</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleTabChange('course')}
                  className="px-5 py-3 rounded-xl bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0"
                >
                  <span>Continue Curriculum</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
