import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  Shield,
  Layers,
  Sparkles,
  FileDown,
  Check,
  Clock,
  FileCheck,
  UploadCloud,
  Loader2,
  Bookmark,
  CheckSquare,
  AlertCircle,
  RotateCcw,
  Menu,
  X,
  HelpCircle
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { resolveVideoUrl, resolvePdfUrl } from '../../services/db/videoStorage';
import { renderMarkdownToHtml } from '../../utils/markdownParser';
import PixelBackground from '../../components/ui/PixelBackground';

/**
 * Open edX-Inspired Courseware & Learning Workspace
 * Matches Open edX Sequential Unit Layout & Screenshot 2 & 3:
 * - Collapsible Course Outline Sidebar (toggleable with [ |< ] icon)
 * - Top Unit Header with [ Bookmark this page ] toggle & Prev/Next arrows
 * - Rich Unit Area: Video streaming + Notes + Downloads OR 20-Question Knowledge Check
 * - Module Knowledge Check: 20 MCQs with instant feedback, scoring, and passing grade (>=70%)
 * - Bottom Sequential Unit Navigation (< Previous and Next >)
 * - 100% Lora font typography & 0% Blue color guarantee
 */
export default function LessonPlayerPage() {
  const { enrolmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshBalance, currentUser } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;

  // Build flattened sequential units (lessons + module quizzes)
  const allUnits = [];
  if (course && course.modules) {
    course.modules.forEach((mod) => {
      (mod.lessons || []).forEach((les) => {
        allUnits.push({
          id: les.id,
          type: 'lesson',
          lesson: les,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      });
      if (mod.quiz) {
        allUnits.push({
          id: mod.quiz.id,
          type: 'quiz',
          quiz: mod.quiz,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      }
    });
  }

  // Active unit state
  const queryLessonId = searchParams.get('lessonId');
  const [activeUnitId, setActiveUnitId] = useState(queryLessonId || allUnits[0]?.id || null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [bookmarkedUnits, setBookmarkedUnits] = useState({});
  const [progressData, setProgressData] = useState({ percentage: 0, completed: 0, total: 0 });
  const [savingProgress, setSavingProgress] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'assignment'

  // Video State
  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [watchProgressMap, setWatchProgressMap] = useState({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState('/assets/sample-lesson.mp4');

  // PDF Assignment Submission State
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadingDataUrl, setUploadingDataUrl] = useState('');
  const [submittingPdf, setSubmittingPdf] = useState(false);

  // Module Quiz / Knowledge Check State
  const [quizAnswers, setQuizAnswers] = useState({}); // { [questionId]: optionId }
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Initialize and load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`rk_bookmarks_${enrolmentId}`);
      if (stored) setBookmarkedUnits(JSON.parse(stored));
    } catch (e) {
      console.warn('Could not read bookmarks:', e);
    }
  }, [enrolmentId]);

  const toggleBookmark = (unitId) => {
    setBookmarkedUnits((prev) => {
      const updated = { ...prev, [unitId]: !prev[unitId] };
      try {
        localStorage.setItem(`rk_bookmarks_${enrolmentId}`, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save bookmark:', e);
      }
      return updated;
    });
  };

  // Sync active unit on load or URL param change
  useEffect(() => {
    if (queryLessonId && allUnits.some((u) => u.id === queryLessonId)) {
      setActiveUnitId(queryLessonId);
    } else if (allUnits.length > 0 && !activeUnitId) {
      // Pick first uncompleted lesson
      const firstIncomplete = allUnits.find(
        (u) => u.type === 'lesson' && !enrolment?.completed_mandatory_lessons?.includes(u.id)
      );
      setActiveUnitId(firstIncomplete ? firstIncomplete.id : allUnits[0].id);
    }
  }, [queryLessonId, allUnits.length]);

  // Load progress and expand current module
  useEffect(() => {
    if (enrolmentId) {
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
    }
    const currentUnit = allUnits.find((u) => u.id === activeUnitId);
    if (currentUnit) {
      setExpandedModules((prev) => ({ ...prev, [currentUnit.moduleId]: true }));
    }
  }, [enrolmentId, activeUnitId]);

  // Handle active unit resolution
  const activeUnit = allUnits.find((u) => u.id === activeUnitId) || allUnits[0];
  const activeIndex = allUnits.findIndex((u) => u.id === activeUnit?.id);
  const activeLesson = activeUnit?.type === 'lesson' ? activeUnit.lesson : null;
  const activeQuiz = activeUnit?.type === 'quiz' ? activeUnit.quiz : null;

  const isLessonCompleted = activeLesson
    ? enrolment?.completed_mandatory_lessons?.includes(activeLesson.id)
    : false;
  const isQuizPassed = activeQuiz
    ? enrolment?.passed_quizzes?.includes(activeQuiz.id)
    : false;
  const isAssignment = activeLesson?.type === 'assignment';

  // Resolve video URL when active lesson changes
  useEffect(() => {
    let active = true;
    if (activeLesson?.video_url) {
      resolveVideoUrl(activeLesson.video_url).then((url) => {
        if (active) setResolvedVideoUrl(url);
      });
    } else {
      setResolvedVideoUrl('/assets/sample-lesson.mp4');
    }
    return () => {
      active = false;
    };
  }, [activeLesson?.video_url, activeLesson?.id]);

  // Reset or load quiz state when switching to quiz
  useEffect(() => {
    if (activeQuiz) {
      setQuizSubmitted(isQuizPassed);
      if (isQuizPassed && (!quizResult || quizResult.quizId !== activeQuiz.id)) {
        setQuizResult({
          quizId: activeQuiz.id,
          score: 100,
          totalQuestions: activeQuiz.questions?.length || 20,
          correctCount: activeQuiz.questions?.length || 20,
          isPassed: true
        });
      }
    }
  }, [activeQuiz?.id, isQuizPassed]);

  // Load assignment submissions
  const loadAssignmentSubmission = () => {
    if (!enrolmentId) return;
    const subs = mockEngine.getAssignmentSubmissions({ enrolment_id: enrolmentId });
    setAssignmentSubmission(subs[0] || null);
  };

  useEffect(() => {
    loadAssignmentSubmission();
  }, [enrolmentId, activeLesson?.id]);

  if (!enrolment || !course) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center px-4 flex items-center justify-center font-lora">
        <div className="max-w-md p-8 rounded-2xl cyber-glass-card border border-[#65F58A]/30 space-y-4">
          <h2 className="text-xl font-bold text-white">Enrolment Not Found</h2>
          <p className="text-xs text-[#B8E6CE] font-mono">
            Please verify that you are actively enrolled in this training course.
          </p>
          <Link
            to="/student"
            className="px-5 py-2.5 bg-[#65F58A] rounded-xl text-[#071018] text-xs font-bold font-mono inline-flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Classroom</span>
          </Link>
        </div>
      </div>
    );
  }

  // Navigation handlers
  const handleSelectUnit = (unit) => {
    setActiveUnitId(unit.id);
    if (unit.type === 'lesson') {
      setSearchParams({ lessonId: unit.id });
    } else {
      setSearchParams({ unitId: unit.id });
    }
  };

  const handlePrevUnit = () => {
    if (activeIndex > 0) {
      const prev = allUnits[activeIndex - 1];
      handleSelectUnit(prev);
    }
  };

  const handleNextUnit = () => {
    if (activeIndex < allUnits.length - 1) {
      const next = allUnits[activeIndex + 1];
      handleSelectUnit(next);
    }
  };

  // Video Time Update & Watch Percentage
  const handleTimeUpdate = () => {
    if (!videoRef.current || !activeLesson) return;
    const { currentTime, duration } = videoRef.current;
    if (!duration || isNaN(duration)) return;

    setWatchProgressMap((prev) => {
      const currentEntry = prev[activeLesson.id] || { maxTime: 0, percentage: 0 };
      const newMaxTime = Math.max(currentEntry.maxTime, currentTime);
      const computedPct = Math.min(100, Math.round((newMaxTime / duration) * 100));

      return {
        ...prev,
        [activeLesson.id]: {
          currentTime,
          duration,
          maxTime: newMaxTime,
          percentage: Math.max(currentEntry.percentage, computedPct)
        }
      };
    });
  };

  const currentWatchPct = isLessonCompleted ? 100 : (watchProgressMap[activeLesson?.id]?.percentage || 0);
  const canMarkLessonComplete = isLessonCompleted || isAssignment || currentWatchPct >= 80;

  const handleMarkLessonComplete = async () => {
    if (!activeLesson || !canMarkLessonComplete) return;
    setSavingProgress(true);
    try {
      await apiClient.completeLesson(enrolmentId, activeLesson.id);
      const newProgress = mockEngine.getCourseProgress(enrolmentId);
      setProgressData(newProgress);
      refreshBalance();

      // Auto-advance to next unit if available
      if (activeIndex < allUnits.length - 1) {
        handleNextUnit();
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  // Cloud Stream Embed Resolver
  const getEmbedInfo = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${vidId}?autoplay=0&rel=0` };
    }
    if (url.includes('youtube.com/embed/')) {
      return { type: 'youtube', embedUrl: url };
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${vidId}?autoplay=0&rel=0` };
    }
    if (url.includes('vimeo.com/')) {
      const vidId = url.split('vimeo.com/')[1]?.split('?')[0];
      return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vidId}` };
    }
    return { type: 'direct', embedUrl: url };
  };

  const embedInfo = getEmbedInfo(resolvedVideoUrl);

  // Download Chapter Study Notes Document
  const handleDownloadChapterNotes = () => {
    if (!activeLesson) return;
    const docContent = `# REDKROSS ACADEMY // CHAPTER STUDY NOTES\n\n` +
      `**Course**: ${course?.title || 'Defensive Cyber Operations'}\n` +
      `**Module**: ${activeUnit?.moduleTitle || 'Core Module'}\n` +
      `**Lesson**: ${activeLesson.title}\n` +
      `**Duration**: ${activeLesson.duration || '15 mins'}\n` +
      `**Date Exported**: ${new Date().toISOString().split('T')[0]}\n\n` +
      `---\n\n` +
      `## Chapter Operational Notes & Technical Guidance\n\n` +
      (activeLesson.content || 'Defensive operators must maintain 100% visibility over host and network telemetry.\n\n```bash\n# Inspect telemetry pipelines\nss -tulpn\n```') +
      `\n\n---\n\n` +
      `## Standard Operating Procedures\n` +
      `1. Log Verification: Ensure event ingestion pipelines are active.\n` +
      `2. Framework Alignment: MITRE ATT&CK Matrix & NIST SP 800-61r2 Incident Handling.\n` +
      `3. Cryptographic Verification: All assessments signed by RedKross Academy.\n`;

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = (activeLesson.title || 'Chapter_Notes').replace(/[^a-zA-Z0-9._-]/g, '_');
    link.download = `${safeTitle}_Study_Notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Admin-Attached PDF
  const handleDownloadAdminPdf = async (attachment) => {
    if (!attachment?.url) return;
    try {
      const resolved = await resolvePdfUrl(attachment.url);
      if (resolved) {
        const link = document.createElement('a');
        link.href = resolved;
        link.download = attachment.name || 'Lesson_Reference_Resource.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Could not retrieve attached PDF.');
      }
    } catch (e) {
      console.error('Error downloading attached PDF:', e);
    }
  };

  // PDF Lab Upload
  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Security Notice: Only valid PDF documents (.pdf) are permitted.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25 MB limit.');
      return;
    }
    setUploadingFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => setUploadingDataUrl(event.target.result);
    reader.readAsDataURL(file);
  };

  const confirmAssignmentSubmit = () => {
    if (!uploadingDataUrl || !uploadingFileName || !activeLesson) return;
    setSubmittingPdf(true);
    try {
      mockEngine.submitAssignment({
        cadetId: currentUser?.cadet_id || 'RK-89421',
        userId: currentUser?.id || enrolment.user_id,
        enrolmentId,
        courseId: course.id,
        moduleId: activeLesson.module_id,
        assignmentId: activeLesson.id,
        assignmentTitle: activeLesson.title,
        fileName: uploadingFileName,
        fileDataUrl: uploadingDataUrl
      });
      setUploadingFileName('');
      setUploadingDataUrl('');
      loadAssignmentSubmission();
      alert('Investigation report submitted for assessment!');
    } catch (e) {
      alert('Submission failed: ' + e.message);
    } finally {
      setSubmittingPdf(false);
    }
  };

  // Quiz Handling: 20-Question Module Knowledge Check
  const handleSelectQuizOption = (questionId, optionId) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = (e) => {
    e?.preventDefault();
    if (!activeQuiz || !activeQuiz.questions?.length) return;

    let correctCount = 0;
    const questions = activeQuiz.questions;
    questions.forEach((q) => {
      const selectedOptId = quizAnswers[q.id];
      const correctOpt = q.options?.find((opt) => opt.is_correct);
      if (selectedOptId && correctOpt && selectedOptId === correctOpt.id) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    const passingScore = activeQuiz.passing_score || 70;
    const isPassed = scorePct >= passingScore;

    setQuizResult({
      quizId: activeQuiz.id,
      score: scorePct,
      correctCount,
      totalQuestions: questions.length,
      isPassed
    });
    setQuizSubmitted(true);

    // Record score in database
    mockEngine.recordModuleQuizScore(enrolmentId, activeQuiz.id, scorePct, isPassed);
    setProgressData(mockEngine.getCourseProgress(enrolmentId));
    refreshBalance();
  };

  const isCurrentUnitBookmarked = Boolean(bookmarkedUnits[activeUnit?.id]);

  return (
    <div className="min-h-screen bg-[#071018] text-[#F1F5F9] font-lora relative flex flex-col">
      <PixelBackground opacity={0.35} gap={22} pixelSize={2} />

      {/* ================= 1. OPEN EDX TOP SUB-NAVBAR & TABS ================= */}
      <header className="sticky top-0 z-30 bg-[#071018]/95 backdrop-blur-xl border-b border-[#65F58A]/20 px-4 sm:px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Outline Toggle Button [ |< ] + Breadcrumb */}
          <div className="flex items-center space-x-3 truncate">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-[#092218]/80 hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 transition-all flex-shrink-0 cursor-pointer"
              title={sidebarOpen ? 'Hide Course Outline' : 'Show Course Outline'}
            >
              <Menu className="w-4 h-4" />
            </button>

            <Link
              to={`/student/course/${course.id}`}
              className="text-xs font-mono text-[#72A88E] hover:text-[#65F58A] flex items-center space-x-1 flex-shrink-0"
              title="Return to Course Home Hub"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Course Hub</span>
            </Link>

            <div className="h-4 w-[1px] bg-[#65F58A]/20 hidden sm:block" />

            <div className="truncate">
              <span className="text-[11px] font-mono text-[#72A88E] block truncate">
                {course.title} / {activeUnit?.moduleTitle}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white truncate">
                {activeLesson ? activeLesson.title : activeQuiz ? activeQuiz.title : 'Unit Learning View'}
              </h1>
            </div>
          </div>

          {/* Right: Two Main Tabs (Course & Progress) & User Info */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <div className="hidden md:flex items-center space-x-6 text-xs font-bold font-mono">
              <Link
                to={`/student/course/${course.id}?tab=course`}
                className="text-[#65F58A] hover:underline"
              >
                Course
              </Link>
              <Link
                to={`/student/course/${course.id}?tab=progress`}
                className="text-[#8BA2B5] hover:text-white transition-colors"
              >
                Progress
              </Link>
            </div>

            {/* Quick Completion / Grade Pill */}
            <div className="flex items-center space-x-2 pl-3 border-l border-[#65F58A]/20 text-xs font-mono">
              <span className="text-[#72A88E] hidden sm:inline">Progress:</span>
              <span className="px-2.5 py-1 rounded-md bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] font-bold">
                {progressData.percentage}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. MAIN COURSEWARE WORKSPACE ================= */}
      <div className="flex-1 flex max-w-[1800px] w-full mx-auto relative">
        {/* ================= LEFT: COLLAPSIBLE COURSE OUTLINE SIDEBAR ================= */}
        {sidebarOpen && (
          <aside className="w-80 sm:w-96 border-r border-[#65F58A]/20 bg-[#061510]/95 backdrop-blur-xl flex flex-col flex-shrink-0 transition-all duration-300 z-20">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-[#65F58A]/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#65F58A]" />
                <h3 className="font-bold text-sm text-white">Course outline</h3>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded text-[#72A88E] hover:text-[#65F58A] transition-colors cursor-pointer"
                title="Collapse outline"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Outline Modules Accordion */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {(course.modules || []).map((mod, modIdx) => {
                const isExpanded = expandedModules[mod.id] !== false;
                const isCurrentMod = activeUnit?.moduleId === mod.id;
                const modLessons = mod.lessons || [];
                const completedCount = modLessons.filter((l) =>
                  enrolment.completed_mandatory_lessons?.includes(l.id)
                ).length;
                const isModQuizPassed = mod.quiz && enrolment.passed_quizzes?.includes(mod.quiz.id);

                return (
                  <div
                    key={mod.id || modIdx}
                    className={`rounded-xl border transition-all ${
                      isCurrentMod
                        ? 'border-[#65F58A]/40 bg-[#092218]/80 shadow-[0_0_15px_rgba(101,245,138,0.1)]'
                        : 'border-[#65F58A]/15 bg-[#061510]'
                    }`}
                  >
                    {/* Module Accordion Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedModules((prev) => ({
                          ...prev,
                          [mod.id]: !isExpanded
                        }))
                      }
                      className="w-full p-3 flex items-center justify-between text-left hover:bg-[#0c2a1e]/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5 truncate pr-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 border ${
                            completedCount === modLessons.length && (!mod.quiz || isModQuizPassed)
                              ? 'bg-[#65F58A] text-[#071018] border-[#65F58A]'
                              : 'bg-[#040e0a] text-[#65F58A] border-[#65F58A]/30'
                          }`}
                        >
                          {completedCount === modLessons.length && (!mod.quiz || isModQuizPassed) ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            modIdx + 1
                          )}
                        </span>
                        <span className="text-xs font-bold text-white truncate font-lora">
                          {mod.title}
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#72A88E] transition-transform duration-200 flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Module Child Units */}
                    {isExpanded && (
                      <div className="p-2 space-y-1 bg-[#040e0a]/80 border-t border-[#65F58A]/15">
                        {/* 1. Lessons in Module */}
                        {modLessons.map((les) => {
                          const isDone = enrolment.completed_mandatory_lessons?.includes(les.id);
                          const isActive = activeUnit?.id === les.id;

                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => handleSelectUnit({ id: les.id, type: 'lesson', lesson: les })}
                              className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#65F58A] text-[#071018] font-bold shadow-sm'
                                  : 'text-[#C9EFE0] hover:bg-[#092218] hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                {isDone ? (
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                                      isActive ? 'text-[#071018]' : 'text-[#65F58A]'
                                    }`}
                                  />
                                ) : (
                                  <Play
                                    className={`w-3 h-3 flex-shrink-0 ${
                                      isActive ? 'fill-[#071018]' : 'fill-[#65F58A] opacity-70'
                                    }`}
                                  />
                                )}
                                <span className="truncate">{les.title}</span>
                              </div>
                              <span
                                className={`text-[10px] font-mono flex-shrink-0 ${
                                  isActive ? 'text-[#071018]' : 'text-[#72A88E]'
                                }`}
                              >
                                {les.duration || '15 mins'}
                              </span>
                            </button>
                          );
                        })}

                        {/* 2. Module Knowledge Check Unit (20 Questions) */}
                        {mod.quiz && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectUnit({
                                id: mod.quiz.id,
                                type: 'quiz',
                                quiz: mod.quiz,
                                moduleId: mod.id,
                                moduleTitle: mod.title
                              })
                            }
                            className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all mt-1 cursor-pointer border ${
                              activeUnit?.id === mod.quiz.id
                                ? 'bg-[#65F58A] text-[#071018] font-bold border-[#65F58A] shadow-sm'
                                : isModQuizPassed
                                ? 'bg-[#092218]/90 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#0c2a1e]'
                                : 'bg-[#092218]/40 text-amber-300 border-amber-500/30 hover:bg-[#092218]'
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate pr-2">
                              <Award
                                className={`w-3.5 h-3.5 flex-shrink-0 ${
                                  activeUnit?.id === mod.quiz.id
                                    ? 'text-[#071018]'
                                    : isModQuizPassed
                                    ? 'text-[#65F58A]'
                                    : 'text-amber-400'
                                }`}
                              />
                              <span className="truncate font-semibold">
                                Knowledge Check ({mod.quiz.questions?.length || 20} Qs)
                              </span>
                            </div>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                activeUnit?.id === mod.quiz.id
                                  ? 'bg-[#071018] text-[#65F58A]'
                                  : isModQuizPassed
                                  ? 'bg-[#65F58A]/15 text-[#65F58A]'
                                  : 'bg-amber-500/15 text-amber-300'
                              }`}
                            >
                              {isModQuizPassed ? 'PASSED' : 'GRADED'}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* ================= RIGHT: MAIN LEARNING UNIT CONTAINER ================= */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#071018]/50">
          {/* Unit Top Bar: Title, Bookmark Action & Top Prev/Next Arrows (Matching Screenshot 2 & 3) */}
          <div className="p-4 sm:p-6 border-b border-[#65F58A]/15 bg-[#071018]/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-lora">
                {activeLesson ? activeLesson.title : activeQuiz ? 'Knowledge Check' : 'Unit'}
              </h2>
              <button
                type="button"
                onClick={() => toggleBookmark(activeUnit?.id)}
                className={`flex items-center space-x-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  isCurrentUnitBookmarked ? 'text-[#65F58A] font-bold' : 'text-[#72A88E] hover:text-[#C9EFE0]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentUnitBookmarked ? 'fill-current' : ''}`} />
                <span>{isCurrentUnitBookmarked ? 'Bookmarked' : 'Bookmark this page'}</span>
              </button>
            </div>

            {/* Small Top Arrows */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrevUnit}
                disabled={activeIndex <= 0}
                className={`p-2 rounded-lg border transition-colors ${
                  activeIndex > 0
                    ? 'border-[#65F58A]/30 text-white hover:bg-[#092218] cursor-pointer'
                    : 'border-white/5 text-[#72A88E]/40 cursor-not-allowed'
                }`}
                title="Previous Unit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextUnit}
                disabled={activeIndex >= allUnits.length - 1}
                className={`p-2 rounded-lg border transition-colors ${
                  activeIndex < allUnits.length - 1
                    ? 'border-[#65F58A]/30 text-white hover:bg-[#092218] cursor-pointer'
                    : 'border-white/5 text-[#72A88E]/40 cursor-not-allowed'
                }`}
                title="Next Unit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Unit Body Content Area */}
          <div className="flex-1 p-4 sm:p-8 space-y-8 max-w-5xl mx-auto w-full">
            {/* -------------------- 1. LESSON UNIT VIEW -------------------- */}
            {activeUnit?.type === 'lesson' && activeLesson && (
              <div className="space-y-6">
                {/* Media Player Card */}
                {!isAssignment && (
                  <div className="cyber-glass-panel rounded-2xl overflow-hidden border border-[#65F58A]/30 shadow-2xl">
                    <div className="relative aspect-video bg-black flex items-center justify-center">
                      {embedInfo?.type === 'youtube' || embedInfo?.type === 'vimeo' ? (
                        <iframe
                          src={embedInfo.embedUrl}
                          title={activeLesson.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          key={resolvedVideoUrl}
                          ref={videoRef}
                          src={resolvedVideoUrl}
                          controls
                          playsInline
                          preload="auto"
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={() => {
                            setIsVideoPlaying(false);
                            setWatchProgressMap((prev) => ({
                              ...prev,
                              [activeLesson.id]: { percentage: 100, maxTime: 9999, duration: 9999 }
                            }));
                          }}
                          poster={course.art || '/assets/course-art/art-01.jpg'}
                          className="w-full h-full object-cover"
                        >
                          <source src={resolvedVideoUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>

                    {/* Speed & Watch Bar */}
                    <div className="p-3.5 bg-[#061510] border-t border-[#65F58A]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#72A88E]">Playback Speed:</span>
                        {[0.75, 1.0, 1.25, 1.5, 2.0].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => {
                              setPlaybackSpeed(spd);
                              if (videoRef.current) videoRef.current.playbackRate = spd;
                            }}
                            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                              playbackSpeed === spd
                                ? 'bg-[#65F58A] text-[#071018] font-bold'
                                : 'bg-[#092218] text-[#C9EFE0] hover:text-white border border-[#65F58A]/25'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[#72A88E]">Completion Gate:</span>
                        <span className="text-[#65F58A] font-bold">{currentWatchPct}%</span>
                        <span className="text-[10px] text-[#72A88E]">(&ge;80% required)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson Notes & Protocols (Bounded with Scrollbar as requested) */}
                <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/30 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/20">
                    <h3 className="font-bold text-base text-white flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#65F58A]" />
                      <span>Instructional Notes & Terminal Protocols</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleDownloadChapterNotes}
                      className="px-3 py-1.5 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Notes</span>
                    </button>
                  </div>

                  {/* Bounded Scrollable Markdown Content */}
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-3 space-y-4">
                    <div
                      className="prose prose-invert max-w-none text-xs sm:text-sm font-lora leading-relaxed text-[#CBD5E1]"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdownToHtml(
                          activeLesson?.content ||
                            `### ${activeLesson.title}\n\nReview defensive cybersecurity protocols, packet inspection steps, and mitigation strategies.\n\n\`\`\`bash\n# Inspect active operational telemetry\nss -tulpn\n\`\`\``
                        )
                      }}
                    />
                  </div>

                  {/* Admin PDF Attachment if available */}
                  {activeLesson?.pdf_attachment && (
                    <div className="p-4 rounded-xl bg-[#092218]/80 border border-[#35E6B5]/40 flex items-center justify-between text-xs font-mono mt-4">
                      <div className="flex items-center space-x-3 truncate pr-2">
                        <FileText className="w-5 h-5 text-[#35E6B5] flex-shrink-0" />
                        <div className="truncate">
                          <span className="text-white font-bold block truncate">
                            {activeLesson.pdf_attachment.name}
                          </span>
                          <span className="text-[10px] text-[#35E6B5]">
                            {activeLesson.pdf_attachment.size} • Attached Instructor Guide
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadAdminPdf(activeLesson.pdf_attachment)}
                        className="px-4 py-2 rounded-lg bg-[#063022] hover:bg-[#09422f] text-[#35E6B5] border border-[#35E6B5]/50 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer flex-shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  )}

                  {/* Mark Lesson Complete Action */}
                  <div className="pt-4 border-t border-[#65F58A]/20 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#72A88E]">
                      {isLessonCompleted ? 'Unit completed & verified.' : 'Review materials to unlock progress.'}
                    </span>
                    <button
                      type="button"
                      onClick={handleMarkLessonComplete}
                      disabled={savingProgress || isLessonCompleted || !canMarkLessonComplete}
                      className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                        isLessonCompleted
                          ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40'
                          : canMarkLessonComplete
                          ? 'bg-[#65F58A] text-[#071018] hover:bg-[#35E6B5] shadow-[0_0_15px_rgba(101,245,138,0.4)]'
                          : 'bg-[#092218] text-[#72A88E] border border-white/5 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isLessonCompleted ? 'Unit Completed' : savingProgress ? 'Saving...' : 'Mark Complete'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 2. MODULE KNOWLEDGE CHECK (20 QUESTIONS) -------------------- */}
            {activeUnit?.type === 'quiz' && activeQuiz && (
              <div className="space-y-6">
                {/* Intro Card Matching Screenshot 3 */}
                <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/30 space-y-4 shadow-xl">
                  <div className="space-y-2 pb-4 border-b border-[#65F58A]/20">
                    <span className="text-[11px] font-mono text-[#65F58A] font-bold tracking-widest uppercase block">
                      GRADED EVALUATION • 20 QUESTIONS
                    </span>
                    <h3 className="text-2xl font-bold text-white font-lora">
                      {activeQuiz.title || 'Knowledge Check'}
                    </h3>
                    <p className="text-xs text-[#C9EFE0] leading-relaxed max-w-3xl">
                      Congratulations! You have completed the instructional units of {activeUnit.moduleTitle}. Before advancing to the next module, complete this 20-question evaluation to solidify your understanding and verify your operational readiness.
                    </p>
                  </div>

                  {/* Evaluation Metrics Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#061510] border border-[#65F58A]/20 text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Passing Threshold:</span>
                      <span className="text-[#65F58A] font-bold block">{activeQuiz.passing_score || 70}% (14/20 Correct)</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Grading Method:</span>
                      <span className="text-white font-bold block">Last Score (Instant Feedback)</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Current Status:</span>
                      <span className={`font-bold block ${isQuizPassed ? 'text-[#65F58A]' : 'text-amber-400'}`}>
                        {isQuizPassed ? 'PASSED (Completed)' : 'PENDING EVALUATION'}
                      </span>
                    </div>
                  </div>

                  {/* Passing Banner if completed */}
                  {quizSubmitted && quizResult && (
                    <div
                      className={`p-5 rounded-xl border flex items-center justify-between ${
                        quizResult.isPassed
                          ? 'bg-[#092218] border-[#65F58A]/50 text-[#65F58A]'
                          : 'bg-[#181105] border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-bold text-sm">
                          {quizResult.isPassed ? <Check className="w-5 h-5 stroke-[3]" /> : <AlertCircle className="w-5 h-5" />}
                          <span>{quizResult.isPassed ? 'Knowledge Check Passed!' : 'Threshold Not Met'}</span>
                        </div>
                        <p className="text-xs font-mono">
                          You scored {quizResult.score}% ({quizResult.correctCount}/{quizResult.totalQuestions} questions correct).
                          {quizResult.isPassed ? ' Your module progress is officially certified.' : ' Review the explanations below and try again.'}
                        </p>
                      </div>
                      <span className="text-2xl font-bold font-mono">
                        {quizResult.score}%
                      </span>
                    </div>
                  )}

                  {/* 20 Questions Form */}
                  <form onSubmit={handleSubmitQuiz} className="space-y-6 pt-4">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                      Multiple Choice Questions
                    </h4>

                    {(activeQuiz.questions || []).map((q, qIdx) => {
                      const selectedOptId = quizAnswers[q.id];
                      const correctOpt = q.options?.find((o) => o.is_correct);
                      const isQuestionCorrect = selectedOptId && correctOpt && selectedOptId === correctOpt.id;
                      const hasSubmitted = quizSubmitted;

                      return (
                        <div
                          key={q.id || qIdx}
                          className={`p-5 rounded-xl border space-y-3 transition-all ${
                            hasSubmitted
                              ? isQuestionCorrect
                                ? 'border-[#65F58A]/40 bg-[#061912]/80'
                                : 'border-amber-500/40 bg-[#161006]/80'
                              : 'border-[#65F58A]/15 bg-[#061510]'
                          }`}
                        >
                          {/* Question Header & Points indicator (Matching Screenshot 3) */}
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-xs font-mono text-[#72A88E]">
                              {hasSubmitted
                                ? isQuestionCorrect
                                  ? '1.0/1.0 point (graded)'
                                  : '0.0/1.0 point (graded)'
                                : '0.0/1.0 point (graded)'}
                            </span>
                          </div>

                          <div className="font-medium text-sm text-white font-lora">
                            {qIdx + 1}. {q.text}
                          </div>

                          {/* Options List */}
                          <div className="space-y-2 pt-1">
                            {(q.options || []).map((opt) => {
                              const isChecked = selectedOptId === opt.id;
                              return (
                                <label
                                  key={opt.id}
                                  className={`p-3 rounded-lg border text-xs flex items-center space-x-3 cursor-pointer transition-all ${
                                    isChecked
                                      ? 'bg-[#092218] border-[#65F58A] text-white shadow-sm'
                                      : 'bg-[#040e0a] border-white/5 text-[#C9EFE0] hover:border-[#65F58A]/30'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question_${q.id}`}
                                    value={opt.id}
                                    checked={isChecked}
                                    onChange={() => handleSelectQuizOption(q.id, opt.id)}
                                    className="accent-[#65F58A] w-4 h-4 cursor-pointer"
                                  />
                                  <span className="font-lora">{opt.text}</span>
                                </label>
                              );
                            })}
                          </div>

                          {/* Instant Explanation on Submission */}
                          {hasSubmitted && (
                            <div
                              className={`p-3 rounded-lg text-xs font-mono space-y-1 mt-2 border ${
                                isQuestionCorrect
                                  ? 'bg-[#092218]/90 text-[#65F58A] border-[#65F58A]/30'
                                  : 'bg-[#181105] text-amber-300 border-amber-500/30'
                              }`}
                            >
                              <div className="font-bold flex items-center space-x-1.5">
                                {isQuestionCorrect ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                <span>{isQuestionCorrect ? 'Correct Answer' : 'Incorrect — Review Guidance'}</span>
                              </div>
                              <p className="font-lora text-[11px] text-[#C9EFE0]">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Quiz Submit Button & Grading Note */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#65F58A]/20">
                      <span className="text-xs font-mono text-[#72A88E]">
                        Grading method: Last Score • 70% passing threshold
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-bold text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer flex-shrink-0"
                      >
                        Submit Answers (20 Questions)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ================= 3. BOTTOM UNIT NAVIGATION BAR (Matching Screenshot 2 & 3) ================= */}
            <div className="pt-8 pb-12 border-t border-[#65F58A]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevUnit}
                disabled={activeIndex <= 0}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
                  activeIndex > 0
                    ? 'bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border-[#65F58A]/30 cursor-pointer shadow-sm'
                    : 'bg-[#040e0a] text-[#72A88E]/40 border-white/5 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-[#72A88E] hidden sm:inline">
                Unit {activeIndex + 1} of {allUnits.length}
              </span>

              <button
                type="button"
                onClick={handleNextUnit}
                disabled={activeIndex >= allUnits.length - 1}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
                  activeIndex < allUnits.length - 1
                    ? 'bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] border-[#65F58A] cursor-pointer shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                    : 'bg-[#040e0a] text-[#72A88E]/40 border-white/5 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
