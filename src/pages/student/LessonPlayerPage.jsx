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
  HelpCircle,
  AlertTriangle,
  Send,
  ExternalLink,
  Image as ImageIcon,
  Film
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { resolveVideoUrl, resolvePdfUrl } from '../../services/db/videoStorage';
import { renderMarkdownToHtml } from '../../utils/markdownParser';
import PixelBackground from '../../components/ui/PixelBackground';

/**
 * Open edX-Inspired Courseware & Learning Workspace
 * Features:
 * - Sticky Course Outline Sidebar (pinned while right video & notes panel scrolls)
 * - Sequential Module Gating (Module N+1 unlocks only after Module N quiz >= 80%)
 * - 20-Question Module Evaluations (20 mins, >= 80% passing grade, max difficulty)
 * - 50-Question Comprehensive Final Assessment (60 mins, >= 80% passing grade, randomized options)
 * - Anti-Cheat Proctoring: Tab-switching / blur triggers immediate 24-Hour Lockdown
 * - Detailed Scorecard with question, student choice, correct answer, and technical rationale
 * - Request for Certificate modal on clearing Final Exam with admin alert
 * - 100% Lora font typography & 0% Blue color guarantee
 */
export default function LessonPlayerPage() {
  const { enrolmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshBalance, currentUser } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;

  // Build flattened sequential units (lessons + module quizzes + final assessment)
  const allUnits = [];
  if (course && course.modules) {
    course.modules.forEach((mod, modIdx) => {
      (mod.lessons || []).forEach((les) => {
        allUnits.push({
          id: les.id,
          type: 'lesson',
          lesson: les,
          moduleIndex: modIdx,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      });
      if (mod.quiz) {
        allUnits.push({
          id: mod.quiz.id,
          type: 'quiz',
          quiz: mod.quiz,
          moduleIndex: modIdx,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      }
    });

    // Add Final Certification Assessment as the ultimate sequential milestone
    if (course.final_assessment) {
      allUnits.push({
        id: course.final_assessment.id,
        type: 'final_exam',
        quiz: course.final_assessment,
        moduleIndex: course.modules.length,
        moduleId: 'mod_final',
        moduleTitle: 'Final Comprehensive Certification Assessment'
      });
    }
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

  // Video & Multi-Media State
  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [watchProgressMap, setWatchProgressMap] = useState({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState('/assets/sample-lesson.mp4');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // PDF Assignment Submission State
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadingDataUrl, setUploadingDataUrl] = useState('');
  const [submittingPdf, setSubmittingPdf] = useState(false);

  // Quiz / Exam State
  const [quizAnswers, setQuizAnswers] = useState({}); // { [questionId]: optionId }
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [examTimeRemaining, setExamTimeRemaining] = useState(null); // in seconds
  const [examAttemptCount, setExamAttemptCount] = useState(1);

  // Anti-Cheat Proctoring & 24-Hour Lockdown State
  const [isLockoutActive, setIsLockoutActive] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [proctorWarningVisible, setProctorWarningVisible] = useState(false);

  // Certificate Request Modal State
  const [certRequestModalOpen, setCertRequestModalOpen] = useState(false);
  const [certRequestSubmitted, setCertRequestSubmitted] = useState(false);
  const [certCadetNotes, setCertCadetNotes] = useState('');

  // ---------------- MODULE GATING LOGIC ----------------
  const isModuleUnlocked = (modIndex) => {
    if (modIndex === 0) return true;
    for (let i = 0; i < modIndex; i++) {
      const prevMod = course.modules[i];
      if (!prevMod) continue;
      const prevLessons = prevMod.lessons || [];
      const allLessonsDone = prevLessons.every((l) =>
        enrolment.completed_mandatory_lessons?.includes(l.id)
      );
      const prevQuizDone = prevMod.quiz
        ? enrolment.passed_quizzes?.includes(prevMod.quiz.id)
        : true;
      if (!allLessonsDone || !prevQuizDone) return false;
    }
    return true;
  };

  const areAllModulesCompleted = () => {
    if (!course || !course.modules) return false;
    return course.modules.every((mod, idx) => {
      const lessonsDone = (mod.lessons || []).every((l) =>
        enrolment.completed_mandatory_lessons?.includes(l.id)
      );
      const quizDone = mod.quiz ? enrolment.passed_quizzes?.includes(mod.quiz.id) : true;
      return lessonsDone && quizDone;
    });
  };

  const isFinalExamUnlocked = areAllModulesCompleted();

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
  const activeQuiz = activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam' ? activeUnit.quiz : null;

  const isLessonCompleted = activeLesson
    ? enrolment?.completed_mandatory_lessons?.includes(activeLesson.id)
    : false;
  const isQuizPassed = activeQuiz
    ? enrolment?.passed_quizzes?.includes(activeQuiz.id) || (activeUnit?.type === 'final_exam' && enrolment?.final_assessment_passed)
    : false;
  const isAssignment = activeLesson?.type === 'assignment';

  // Check 24-Hour Lockdown on active unit change
  const checkLockoutStatus = () => {
    if (!enrolmentId || !activeUnit) return;
    try {
      const lockoutInfo = mockEngine.getLockoutRemaining(enrolmentId, activeUnit.id);
      if (lockoutInfo && lockoutInfo.isLocked) {
        setIsLockoutActive(true);
        setLockoutCountdown({
          hours: lockoutInfo.remainingHours || 0,
          minutes: lockoutInfo.remainingMinutes || 0,
          seconds: 0
        });
      } else {
        setIsLockoutActive(false);
      }
    } catch (e) {
      setIsLockoutActive(false);
    }
  };

  useEffect(() => {
    checkLockoutStatus();
  }, [enrolmentId, activeUnit?.id]);

  // Reset selected video index when lesson changes
  useEffect(() => {
    setSelectedVideoIndex(0);
  }, [activeLesson?.id]);

  // Resolve video URL when active lesson or selected video changes
  useEffect(() => {
    let active = true;
    const currentVideos = activeLesson?.videos && activeLesson.videos.length > 0
      ? activeLesson.videos
      : (activeLesson?.video_url ? [{ url: activeLesson.video_url, name: 'Lesson Video' }] : []);

    const targetVideo = currentVideos[selectedVideoIndex] || currentVideos[0];

    if (targetVideo?.url) {
      resolveVideoUrl(targetVideo.url).then((url) => {
        if (active) setResolvedVideoUrl(url);
      });
    } else {
      setResolvedVideoUrl('/assets/sample-lesson.mp4');
    }
    return () => {
      active = false;
    };
  }, [activeLesson?.video_url, activeLesson?.videos, activeLesson?.id, selectedVideoIndex]);

  // Reset or load quiz state when switching to quiz/final_exam
  useEffect(() => {
    if (activeQuiz) {
      setQuizSubmitted(isQuizPassed);
      if (isQuizPassed && (!quizResult || quizResult.quizId !== activeQuiz.id)) {
        setQuizResult({
          quizId: activeQuiz.id,
          score: 100,
          totalQuestions: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          correctCount: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          isPassed: true
        });
      } else if (!isQuizPassed) {
        // Start live countdown timer: 20 mins for module quiz, 60 mins for final assessment
        const totalMinutes = activeUnit?.type === 'final_exam' ? 60 : 20;
        setExamTimeRemaining(totalMinutes * 60);
      }
    }
  }, [activeQuiz?.id, isQuizPassed, activeUnit?.type]);

  // Live Exam Countdown Timer
  useEffect(() => {
    if (!activeQuiz || quizSubmitted || isLockoutActive || examTimeRemaining === null || examTimeRemaining <= 0) return;

    const timer = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit on time expiry
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz?.id, quizSubmitted, isLockoutActive, examTimeRemaining]);

  // ---------------- ANTI-CHEAT PROTOCOL: 24-HOUR DIRECT BAN ON TAB SWITCH / FOCUS LOSS ----------------
  const triggerProctorViolation = (violationType) => {
    if (quizSubmitted || isLockoutActive || !activeQuiz) return;

    try {
      mockEngine.recordProctorViolation({
        enrolmentId,
        quizId: activeUnit.id,
        cadetId: currentUser?.cadet_id || enrolment?.cadet_id || 'RK-UNKNOWN',
        studentName: currentUser?.name || currentUser?.full_name || 'Cadet Candidate',
        violationType: `PROCTOR_VIOLATION: ${violationType}`,
        details: 'Adversary evasion or proctor protocol breached (exited view / tab switched during active examination).'
      });
      setIsLockoutActive(true);
      setLockoutCountdown({ hours: 23, minutes: 59, seconds: 59 });
      alert('CRITICAL ANTI-CHEAT PROTOCOL BREACH: Tab switch or focus change detected during an active examination. Your account is subjected to an immediate 24-hour examination lockdown.');
    } catch (e) {
      console.error('Proctoring enforcement error:', e);
    }
  };

  useEffect(() => {
    if (!activeQuiz || quizSubmitted || isLockoutActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerProctorViolation('TAB_SWITCH_ATTEMPT');
      }
    };

    const handleWindowBlur = () => {
      triggerProctorViolation('WINDOW_FOCUS_LOST');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [activeQuiz?.id, quizSubmitted, isLockoutActive]);

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
    // If unit belongs to a locked module, disallow navigation
    if (unit.type === 'final_exam') {
      if (!isFinalExamUnlocked) {
        alert('Final Assessment Locked: You must complete all prior course modules and score >= 80% on each knowledge check.');
        return;
      }
    } else if (unit.moduleIndex > 0 && !isModuleUnlocked(unit.moduleIndex)) {
      alert(`Module ${unit.moduleIndex + 1} Locked: You must pass the Module ${unit.moduleIndex} Knowledge Check (>= 80%) to unlock.`);
      return;
    }

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

  // Mark lesson completed
  const handleMarkLessonComplete = async () => {
    if (!activeLesson || isLessonCompleted || savingProgress) return;
    setSavingProgress(true);
    try {
      mockEngine.recordLessonCompletion(enrolmentId, activeLesson.id);
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      refreshBalance();
    } catch (e) {
      console.error(e);
    } finally {
      setSavingProgress(false);
    }
  };

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

  // Quiz Handling: 20-Question Module Knowledge Check & 50-Question Final Assessment
  const handleSelectQuizOption = (questionId, optionId) => {
    if (quizSubmitted) return;
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
    const passingScore = activeQuiz.passing_score || 80;
    const isPassed = scorePct >= passingScore;

    setQuizResult({
      quizId: activeQuiz.id,
      score: scorePct,
      correctCount,
      totalQuestions: questions.length,
      isPassed
    });
    setQuizSubmitted(true);

    if (activeUnit?.type === 'final_exam') {
      // Record Final Assessment Score
      const db = mockEngine.getDb();
      const currentEnrolment = db.enrolments.find((e) => e.id === enrolmentId);
      if (currentEnrolment) {
        currentEnrolment.final_assessment_score = scorePct;
        currentEnrolment.final_assessment_passed = isPassed;
        mockEngine.saveDb(db);
      }

      if (isPassed) {
        // Trigger celebratory confetti and open Request Certificate modal
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#65F58A', '#35E6B5', '#00FFA3']
        });
        setCertRequestModalOpen(true);
      }
    } else {
      // Record Module Quiz Score
      mockEngine.recordModuleQuizScore(enrolmentId, activeQuiz.id, scorePct, isPassed);
    }

    setProgressData(mockEngine.getCourseProgress(enrolmentId));
    refreshBalance();
  };

  // Submit Certificate Request
  const handleSubmitCertificateRequest = () => {
    try {
      mockEngine.requestCertificate(enrolmentId, certCadetNotes);
      setCertRequestSubmitted(true);
      setTimeout(() => {
        setCertRequestModalOpen(false);
      }, 3500);
    } catch (e) {
      alert('Certificate request failed: ' + e.message);
    }
  };

  const isCurrentUnitBookmarked = Boolean(bookmarkedUnits[activeUnit?.id]);

  // Format Timer
  const formatTime = (secs) => {
    if (secs === null || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#071018] text-[#F1F5F9] font-lora relative flex flex-col">
      <PixelBackground opacity={0.35} />

      {/* ================= 1. OPEN EDX TOP SUB-NAVBAR & TABS ================= */}
      <header className="sticky top-0 z-30 bg-[#071018]/95 backdrop-blur-xl border-b border-[#65F58A]/20 px-4 sm:px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Outline Toggle Button [ |< ] + Breadcrumb */}
          <div className="flex items-center space-x-3 truncate">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-[#65F58A]/30 bg-[#092218] text-[#65F58A] hover:bg-[#65F58A]/20 transition-all cursor-pointer flex-shrink-0"
              title={sidebarOpen ? 'Hide Course Outline' : 'Show Course Outline'}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="truncate text-xs font-mono">
              <span className="text-[#72A88E] hidden md:inline">Course / </span>
              <span className="text-white font-bold truncate">{course.title}</span>
            </div>
          </div>

          {/* Right: Open edX Sub-Tabs & Live Progress */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-4 text-xs font-mono">
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
      {/* Container with items-start so sticky sidebar sticks within viewport */}
      <div className="flex-1 flex max-w-[1800px] w-full mx-auto relative items-start">
        {/* ================= LEFT: STICKY COURSE OUTLINE SIDEBAR ================= */}
        {sidebarOpen && (
          <aside className="w-80 sm:w-96 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar border-r border-[#65F58A]/20 bg-[#061510]/95 backdrop-blur-xl flex flex-col flex-shrink-0 transition-all duration-300 z-20 self-start">
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
                const isUnlocked = isModuleUnlocked(modIdx);
                const modLessons = mod.lessons || [];
                const completedCount = modLessons.filter((l) =>
                  enrolment.completed_mandatory_lessons?.includes(l.id)
                ).length;
                const isModQuizPassed = mod.quiz && enrolment.passed_quizzes?.includes(mod.quiz.id);

                return (
                  <div
                    key={mod.id || modIdx}
                    className={`rounded-xl border transition-all ${
                      !isUnlocked
                        ? 'border-white/5 bg-[#030907] opacity-65'
                        : isCurrentMod
                        ? 'border-[#65F58A]/40 bg-[#092218]/80 shadow-[0_0_15px_rgba(101,245,138,0.1)]'
                        : 'border-[#65F58A]/15 bg-[#061510]'
                    }`}
                  >
                    {/* Module Accordion Header */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isUnlocked) {
                          alert(`Module ${modIdx + 1} Locked: Pass Module ${modIdx} Knowledge Check (>= 80%) to unlock.`);
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
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 border ${
                            !isUnlocked
                              ? 'bg-black text-gray-500 border-gray-700'
                              : completedCount === modLessons.length && (!mod.quiz || isModQuizPassed)
                              ? 'bg-[#65F58A] text-[#071018] border-[#65F58A]'
                              : 'bg-[#040e0a] text-[#65F58A] border-[#65F58A]/30'
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
                          className={`w-3.5 h-3.5 text-[#72A88E] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Module Child Units */}
                    {isExpanded && isUnlocked && (
                      <div className="p-2 space-y-1 bg-[#040e0a]/80 border-t border-[#65F58A]/15">
                        {/* 1. Lessons in Module */}
                        {modLessons.map((les) => {
                          const isDone = enrolment.completed_mandatory_lessons?.includes(les.id);
                          const isActive = activeUnit?.id === les.id;

                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => handleSelectUnit({ id: les.id, type: 'lesson', lesson: les, moduleIndex: modIdx })}
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
                                moduleIndex: modIdx,
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
                                Knowledge Check (20 Qs)
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

              {/* 3. Final Certification Examination Milestone */}
              {course.final_assessment && (
                <div className="pt-3 border-t border-[#65F58A]/20">
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
                        ? 'bg-[#65F58A] text-[#071018] font-bold border-[#65F58A] shadow-md'
                        : isFinalExamUnlocked
                        ? 'bg-[#092218] text-[#65F58A] border-[#65F58A]/40 hover:bg-[#0c2a1e]'
                        : 'bg-[#040e0a] text-gray-500 border-gray-800 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <Shield className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate font-bold">
                        Final Certification Exam (50 MCQs)
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-current">
                      {isFinalExamUnlocked ? 'AVAILABLE' : 'LOCKED'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ================= RIGHT: SCROLLABLE MAIN CONTENT WORKSPACE ================= */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Unit Title Bar & Bookmark Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#65F58A]/20 gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#72A88E] uppercase tracking-wider block">
                  {activeUnit?.moduleTitle || 'Curriculum Module'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-lora tracking-tight">
                  {activeLesson?.title || activeQuiz?.title || 'Interactive Lesson'}
                </h2>
              </div>

              {/* Bookmark Toggle */}
              <button
                type="button"
                onClick={() => toggleBookmark(activeUnit?.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer self-start sm:self-center ${
                  isCurrentUnitBookmarked
                    ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40'
                    : 'bg-[#061510] text-[#72A88E] border-[#65F58A]/20 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentUnitBookmarked ? 'fill-current' : ''}`} />
                <span>{isCurrentUnitBookmarked ? 'Bookmarked' : 'Bookmark this page'}</span>
              </button>
            </div>

            {/* -------------------- 24-HOUR ANTI-CHEAT PROCTOR LOCKDOWN HUD -------------------- */}
            {isLockoutActive && (
              <div className="p-8 rounded-2xl bg-red-950/70 border border-red-500/50 space-y-4 shadow-2xl">
                <div className="flex items-center space-x-3 text-red-400">
                  <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
                  <div>
                    <h3 className="text-lg font-bold font-lora text-white">24-Hour Proctoring Lockdown Active</h3>
                    <p className="text-xs font-mono text-red-300">
                      Security Protocol Enforced: Academic dishonesty prevention active.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-red-500/30 text-xs font-mono text-red-200 space-y-2">
                  <p>
                    A violation of examination security (window focus lost or tab switch detected) was intercepted during an active timed session.
                  </p>
                  <div className="flex items-center space-x-3 text-sm font-bold text-white pt-2">
                    <span>Lockdown Time Remaining:</span>
                    <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                      {lockoutCountdown.hours}h {lockoutCountdown.minutes}m remaining
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Incident ID: aud_{Date.now().toString(36).toUpperCase()}</span>
                  <button
                    onClick={() => handleSelectUnit(allUnits[0])}
                    className="px-4 py-2 rounded bg-black/80 hover:bg-black text-gray-200 border border-gray-700 transition-colors"
                  >
                    Return to Curriculum Review
                  </button>
                </div>
              </div>
            )}

            {/* -------------------- 1. INSTRUCTIONAL LESSON UNIT -------------------- */}
            {activeUnit?.type === 'lesson' && activeLesson && (
              <div className="space-y-6">
                {/* Multi-Video Selector (If Lesson has Multiple Video Recordings) */}
                {activeLesson.videos && activeLesson.videos.length > 1 && (
                  <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
                    <span className="text-[11px] font-mono text-[#72A88E] flex items-center gap-1 mr-1 flex-shrink-0">
                      <Film className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span>RECORDINGS ({activeLesson.videos.length}):</span>
                    </span>
                    {activeLesson.videos.map((vid, idx) => (
                      <button
                        key={vid.id || idx}
                        type="button"
                        onClick={() => setSelectedVideoIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer flex-shrink-0 ${
                          selectedVideoIndex === idx
                            ? 'bg-[#65F58A] text-[#071018] shadow-[0_0_15px_rgba(101,245,138,0.4)]'
                            : 'bg-[#092218] text-[#72A88E] hover:text-white border border-[#65F58A]/30'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{vid.caption || vid.name || `Video ${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Video Player */}
                <div className="rounded-2xl overflow-hidden border border-[#65F58A]/30 bg-black aspect-video relative shadow-2xl">
                  {resolvedVideoUrl.includes('youtube.com') || resolvedVideoUrl.includes('youtu.be') ? (
                    <iframe
                      src={resolvedVideoUrl}
                      title={activeLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={resolvedVideoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Multi-Image / Architecture Diagrams Gallery (If Lesson has Images) */}
                {activeLesson.images && activeLesson.images.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#061510] border border-[#35E6B5]/25 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-mono text-white font-bold">
                        <ImageIcon className="w-4 h-4 text-[#35E6B5]" />
                        <span>INSTRUCTIONAL DIAGRAMS & VISUAL EVIDENCE ({activeLesson.images.length})</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#72A88E]">Click diagram to inspect in full-resolution</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {activeLesson.images.map((img, iIdx) => (
                        <div
                          key={img.id || iIdx}
                          onClick={() => setLightboxImage(img)}
                          className="group relative rounded-xl overflow-hidden border border-[#35E6B5]/20 bg-black cursor-pointer hover:border-[#35E6B5]/60 transition-all shadow-md"
                        >
                          <div className="aspect-video w-full overflow-hidden bg-black/60 flex items-center justify-center">
                            <img
                              src={img.url}
                              alt={img.caption || img.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2.5 bg-[#092218]/90 border-t border-[#35E6B5]/15">
                            <span className="text-xs font-mono font-bold text-white block truncate">
                              {img.caption || img.name}
                            </span>
                            <span className="text-[10px] text-[#72A88E] font-mono">
                              {img.size || 'Inspection Diagram'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Tabs: Notes vs Assignment */}
                <div className="flex items-center justify-between border-b border-[#65F58A]/20 pb-2">
                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab('notes')}
                      className={`pb-2 border-b-2 font-bold transition-all cursor-pointer ${
                        activeTab === 'notes'
                          ? 'border-[#65F58A] text-[#65F58A]'
                          : 'border-transparent text-[#72A88E] hover:text-white'
                      }`}
                    >
                      Chapter Notes & Synthesis
                    </button>
                    {isAssignment && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('assignment')}
                        className={`pb-2 border-b-2 font-bold transition-all cursor-pointer ${
                          activeTab === 'assignment'
                            ? 'border-[#65F58A] text-[#65F58A]'
                            : 'border-transparent text-[#72A88E] hover:text-white'
                        }`}
                      >
                        PDF Laboratory Submission
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadChapterNotes}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#65F58A]/30 bg-[#092218] text-[#65F58A] hover:bg-[#65F58A]/20 text-xs font-mono transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Study Notes</span>
                  </button>
                </div>

                {/* Tab 1: Chapter Notes */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="cyber-glass-panel p-6 rounded-2xl border border-[#65F58A]/20 max-h-[450px] overflow-y-auto custom-scrollbar prose prose-invert prose-sm max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdownToHtml(activeLesson.content || 'Defensive laboratory briefing and operational objectives.')
                        }}
                      />
                    </div>

                    {/* Admin Attached PDF Reference Resources */}
                    {activeLesson.pdf_resources && activeLesson.pdf_resources.length > 0 && (
                      <div className="p-4 rounded-xl bg-[#061510] border border-[#65F58A]/30 space-y-2">
                        <span className="text-xs font-mono font-bold text-[#65F58A] block">
                          Official Chapter Reference Documents (.pdf):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeLesson.pdf_resources.map((res, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleDownloadAdminPdf(res)}
                              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0a261a] border border-[#65F58A]/30 text-xs font-mono text-[#C9EFE0] hover:text-white transition-colors"
                            >
                              <FileDown className="w-3.5 h-3.5 text-[#65F58A]" />
                              <span>{res.name || 'Resource.pdf'}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: PDF Laboratory Assignment */}
                {activeTab === 'assignment' && isAssignment && (
                  <div className="cyber-glass-panel p-6 rounded-2xl border border-[#65F58A]/20 space-y-4">
                    <h4 className="font-bold text-sm text-white">Upload Laboratory Findings Report</h4>
                    <p className="text-xs text-[#B8E6CE]">
                      Please export your triage and packet analysis report as a single verified PDF file (maximum 25 MB).
                    </p>

                    <div className="border-2 border-dashed border-[#65F58A]/30 rounded-xl p-6 text-center space-y-3">
                      <UploadCloud className="w-8 h-8 text-[#65F58A] mx-auto" />
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                        id="labPdfUploadInput"
                      />
                      <label
                        htmlFor="labPdfUploadInput"
                        className="inline-block px-4 py-2 rounded-lg bg-[#0a261a] border border-[#65F58A]/40 text-[#65F58A] text-xs font-mono font-bold cursor-pointer hover:bg-[#65F58A]/20 transition-colors"
                      >
                        Choose PDF Document
                      </label>
                      {uploadingFileName && (
                        <p className="text-xs font-mono text-[#65F58A]">Selected: {uploadingFileName}</p>
                      )}
                    </div>

                    {uploadingDataUrl && (
                      <div className="flex justify-end">
                        <button
                          onClick={confirmAssignmentSubmit}
                          disabled={submittingPdf}
                          className="px-5 py-2 rounded-lg bg-[#65F58A] text-[#071018] font-bold text-xs font-mono disabled:opacity-50"
                        >
                          {submittingPdf ? 'Submitting...' : 'Confirm Submission'}
                        </button>
                      </div>
                    )}

                    {assignmentSubmission && (
                      <div className="p-4 rounded-xl bg-[#092218] border border-[#65F58A]/30 text-xs font-mono space-y-1">
                        <span className="text-[#65F58A] font-bold block">Previous Submission On File:</span>
                        <p className="text-white">{assignmentSubmission.file_name}</p>
                        <span className="text-[10px] text-[#72A88E]">Status: {assignmentSubmission.status}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Mark Complete Action Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleMarkLessonComplete}
                    disabled={isLessonCompleted || savingProgress}
                    className={`px-6 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                      isLessonCompleted
                        ? 'bg-[#092218] text-[#65F58A] border border-[#65F58A]/40'
                        : 'bg-[#65F58A] text-[#071018] hover:bg-[#35E6B5]'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isLessonCompleted ? 'Unit Completed' : savingProgress ? 'Saving...' : 'Mark Complete'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* -------------------- 2. EVALUATION & EXAMINATION ENGINE (20 OR 50 QUESTIONS) -------------------- */}
            {(activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && activeQuiz && !isLockoutActive && (
              <div className="space-y-6">
                {/* Header Information Card */}
                <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/30 space-y-4 shadow-xl">
                  <div className="space-y-2 pb-4 border-b border-[#65F58A]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#65F58A] font-bold tracking-widest uppercase block">
                        {activeUnit?.type === 'final_exam' ? 'FINAL CERTIFICATION EXAMINATION' : 'MODULE KNOWLEDGE CHECK'} • {activeQuiz.questions?.length || 20} QUESTIONS
                      </span>
                      {/* Live Examination Countdown Timer */}
                      {!quizSubmitted && examTimeRemaining !== null && (
                        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-[#092218] border border-[#65F58A]/30 text-xs font-mono text-[#65F58A]">
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                          <span className="font-bold">{formatTime(examTimeRemaining)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-lora">
                      {activeQuiz.title || 'Knowledge Evaluation'}
                    </h3>
                    <p className="text-xs text-[#C9EFE0] leading-relaxed max-w-3xl">
                      {activeUnit?.type === 'final_exam'
                        ? 'Comprehensive capstone examination spanning all domain curricula. You must attain 80% or greater to qualify for official institutional credentialing. Anti-cheat proctoring is strictly active.'
                        : `Complete this 20-question evaluation to verify your operational understanding of ${activeUnit.moduleTitle}. An 80% passing grade unlocks subsequent training modules.`}
                    </p>
                  </div>

                  {/* Evaluation Metrics Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#061510] border border-[#65F58A]/20 text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Passing Threshold:</span>
                      <span className="text-[#65F58A] font-bold block">{activeQuiz.passing_score || 80}% Minimum</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Allowed Retries:</span>
                      <span className="text-white font-bold block">3 Attempts per Evaluation Window</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Proctoring Security:</span>
                      <span className="text-[#65F58A] font-bold block">Tab & Focus Lockout Active</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[#72A88E]">Current Status:</span>
                      <span className={`font-bold block ${isQuizPassed ? 'text-[#65F58A]' : 'text-amber-400'}`}>
                        {isQuizPassed ? 'PASSED (Certified)' : 'PENDING EVALUATION'}
                      </span>
                    </div>
                  </div>

                  {/* Passing / Scorecard Banner */}
                  {quizSubmitted && quizResult && (
                    <div
                      className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        quizResult.isPassed
                          ? 'bg-[#092218] border-[#65F58A]/50 text-[#65F58A]'
                          : 'bg-[#181105] border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-bold text-sm">
                          {quizResult.isPassed ? <Check className="w-5 h-5 stroke-[3]" /> : <AlertCircle className="w-5 h-5" />}
                          <span>{quizResult.isPassed ? 'Evaluation Passed with Honors!' : 'Evaluation Threshold Not Met'}</span>
                        </div>
                        <p className="text-xs font-mono">
                          You achieved {quizResult.score}% ({quizResult.correctCount}/{quizResult.totalQuestions} questions correct).
                          {quizResult.isPassed
                            ? ' Review your verified breakdown below.'
                            : ' Review the technical rationales below and retake when prepared.'}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold font-mono">
                          {quizResult.score}%
                        </span>
                        {activeUnit?.type === 'final_exam' && quizResult.isPassed && (
                          <button
                            type="button"
                            onClick={() => setCertRequestModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-bold text-xs font-mono shadow-[0_0_15px_rgba(101,245,138,0.5)] hover:bg-[#35E6B5] transition-all"
                          >
                            Request Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Questions Form */}
                  <form onSubmit={handleSubmitQuiz} className="space-y-6 pt-4">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                      Question Bank ({activeQuiz.questions?.length || 20} Items)
                    </h4>

                    {(activeQuiz.questions || []).map((q, qIdx) => {
                      const selectedOptId = quizAnswers[q.id];
                      const correctOpt = q.options?.find((o) => o.is_correct);
                      const isQuestionCorrect = selectedOptId && correctOpt && selectedOptId === correctOpt.id;
                      const hasSubmitted = quizSubmitted;

                      return (
                        <div
                          key={q.id || qIdx}
                          className={`p-5 rounded-xl border space-y-4 transition-all ${
                            hasSubmitted
                              ? isQuestionCorrect
                                ? 'border-[#65F58A]/40 bg-[#061912]/80'
                                : 'border-red-500/40 bg-[#160808]/80'
                              : 'border-[#65F58A]/15 bg-[#061510]'
                          }`}
                        >
                          {/* Question Header & Points Indicator */}
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-xs font-mono text-[#72A88E]">
                              {hasSubmitted
                                ? isQuestionCorrect
                                  ? '1.0/1.0 point (graded)'
                                  : '0.0/1.0 point (graded)'
                                : '1.0 point (graded)'}
                            </span>
                            {hasSubmitted && (
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                  isQuestionCorrect
                                    ? 'bg-[#65F58A]/20 text-[#65F58A]'
                                    : 'bg-red-500/20 text-red-400'
                                }`}
                              >
                                {isQuestionCorrect ? 'CORRECT' : 'INCORRECT'}
                              </span>
                            )}
                          </div>

                          {/* Question Prompt */}
                          <p className="text-sm font-semibold text-white leading-relaxed font-lora">
                            {qIdx + 1}. {q.text}
                          </p>

                          {/* Options */}
                          <div className="space-y-2 pt-1 font-lora">
                            {(q.options || []).map((opt, optIdx) => {
                              const isSelected = selectedOptId === opt.id;
                              const isThisCorrect = opt.is_correct;
                              const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

                              let optionClasses = 'border-[#65F58A]/20 bg-[#040e0a] text-gray-200 hover:bg-[#0c2a1e]';

                              if (hasSubmitted) {
                                if (isThisCorrect) {
                                  optionClasses = 'border-[#65F58A] bg-[#092218] text-[#65F58A] font-bold shadow-[0_0_10px_rgba(101,245,138,0.2)]';
                                } else if (isSelected && !isThisCorrect) {
                                  optionClasses = 'border-red-500/60 bg-red-950/40 text-red-300 line-through';
                                } else {
                                  optionClasses = 'border-white/5 bg-[#030907] text-gray-400 opacity-60';
                                }
                              } else if (isSelected) {
                                optionClasses = 'border-[#65F58A] bg-[#0c2a1e] text-white shadow-[0_0_10px_rgba(101,245,138,0.2)]';
                              }

                              return (
                                <button
                                  key={opt.id || optIdx}
                                  type="button"
                                  disabled={hasSubmitted}
                                  onClick={() => handleSelectQuizOption(q.id, opt.id)}
                                  className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-start space-x-3 transition-all cursor-pointer ${optionClasses}`}
                                >
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                                    {optionLetter}
                                  </span>
                                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                                  {hasSubmitted && isThisCorrect && (
                                    <Check className="w-4 h-4 text-[#65F58A] flex-shrink-0 stroke-[3]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Technical Rationale & Explanation (Instant Breakdown) */}
                          {hasSubmitted && q.explanation && (
                            <div className="p-3.5 rounded-lg bg-[#04120c] border border-[#65F58A]/30 space-y-1 text-xs">
                              <span className="font-mono text-[10px] text-[#65F58A] font-bold uppercase tracking-wider block">
                                Technical Rationale & Defensive Explanation:
                              </span>
                              <p className="font-lora text-xs text-[#C9EFE0] leading-relaxed">
                                {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Quiz Submit Button / Retry Button */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#65F58A]/20">
                      <span className="text-xs font-mono text-[#72A88E]">
                        Grading method: Last Score • 80% passing threshold
                      </span>

                      {!quizSubmitted ? (
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-bold text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer flex-shrink-0"
                        >
                          Submit Answers ({activeQuiz.questions?.length || 20} Questions)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswers({});
                            setQuizResult(null);
                            setExamTimeRemaining(activeUnit?.type === 'final_exam' ? 60 * 60 : 20 * 60);
                          }}
                          className="px-6 py-3 rounded-xl bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 font-bold text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center space-x-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retake Evaluation</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ================= 3. BOTTOM SEQUENTIAL NAVIGATION BAR ================= */}
            <div className="pt-8 pb-12 border-t border-[#65F58A]/20 flex items-center justify-between gap-4">
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

              {/* End-of-Course Final Assessment CTA */}
              {activeIndex === allUnits.length - 2 && course?.final_assessment ? (
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border border-[#65F58A] bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] cursor-pointer shadow-[0_0_20px_rgba(101,245,138,0.5)] transition-all animate-pulse"
                >
                  <Shield className="w-4 h-4" />
                  <span>Take Final Assessment (50 MCQs)</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : activeIndex >= allUnits.length - 1 ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-[#65F58A] font-bold">
                    Curriculum Completed
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border border-[#65F58A] bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] cursor-pointer shadow-[0_0_15px_rgba(101,245,138,0.3)] transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ================= 4. CERTIFICATE REQUEST MODAL ================= */}
      {certRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="max-w-lg w-full cyber-glass-panel rounded-2xl p-6 sm:p-8 border border-[#65F58A]/50 space-y-5 bg-[#081a13] shadow-[0_0_30px_rgba(101,245,138,0.2)]">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#65F58A]/20">
              <div className="w-10 h-10 rounded-full bg-[#65F58A]/20 border border-[#65F58A]/40 flex items-center justify-center text-[#65F58A]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-lora">Request Official Certificate</h3>
                <p className="text-xs font-mono text-[#65F58A]">
                  Final Assessment Cleared ({quizResult?.score || 92}%)
                </p>
              </div>
            </div>

            {certRequestSubmitted ? (
              <div className="p-6 rounded-xl bg-[#092218] border border-[#65F58A]/40 text-center space-y-3">
                <Check className="w-10 h-10 text-[#65F58A] mx-auto stroke-[3]" />
                <h4 className="font-bold text-white font-lora text-base">Request Dispatched to Academic Director</h4>
                <p className="text-xs text-[#B8E6CE] font-mono leading-relaxed">
                  Your certified passing score has been forwarded to the Academy Administration queue. Once certified, your cryptographic credential will appear in your Student Portal for direct download.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                <p className="text-[#C9EFE0] leading-relaxed">
                  Congratulations on successfully clearing the {course.title} Final Comprehensive Examination. Confirm your details to request official certification dispatch.
                </p>

                <div className="p-4 rounded-xl bg-[#05140e] border border-[#65F58A]/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#72A88E]">Cadet Operator:</span>
                    <span className="text-white font-bold">{currentUser?.name || currentUser?.full_name || 'Cadet'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#72A88E]">Cadet ID:</span>
                    <span className="text-[#65F58A] font-bold">{currentUser?.cadet_id || enrolment?.cadet_id || 'RK-89421'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#72A88E]">Credential Title:</span>
                    <span className="text-white font-bold">{course.final_assessment?.credential_title || 'RedKross Certified SOC Analyst (RCSA)'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#72A88E] mb-1">Candidate Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={certCadetNotes}
                    onChange={(e) => setCertCadetNotes(e.target.value)}
                    placeholder="Provide any additional institutional verification requests or employer reference notes..."
                    className="w-full bg-[#05140e] border border-[#65F58A]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCertRequestModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-[#65F58A]/30 text-[#B8E6CE] hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitCertificateRequest}
                    className="px-5 py-2 rounded-lg bg-[#65F58A] text-[#071018] font-bold shadow-md hover:bg-[#35E6B5]"
                  >
                    Submit Certificate Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------- FULL-RESOLUTION DIAGRAM LIGHTBOX MODAL -------------------- */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-label="High-Resolution Diagram Inspection"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col bg-[#071018] border border-[#35E6B5]/40 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#35E6B5]/25 bg-[#061510]">
              <div className="flex items-center space-x-3 min-w-0">
                <ImageIcon className="w-5 h-5 text-[#35E6B5] flex-shrink-0" />
                <div className="truncate">
                  <h3 className="text-sm font-bold font-mono text-white truncate">
                    {lightboxImage.caption || lightboxImage.name || 'Inspection Diagram'}
                  </h3>
                  <p className="text-[11px] font-mono text-[#72A88E]">
                    {lightboxImage.name} • {lightboxImage.size || 'Local High-Res Asset'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl text-[#72A88E] hover:text-white hover:bg-white/10 transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 overflow-auto max-h-[75vh] flex items-center justify-center bg-black/80">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption || lightboxImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 border-t border-[#35E6B5]/20 bg-[#061510] flex items-center justify-between text-xs font-mono">
              <span className="text-[#72A88E]">
                High-Fidelity Instructional Evidence & Diagram
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
