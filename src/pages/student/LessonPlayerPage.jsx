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
import { FileUploadProgressBar } from '../../components/application/file-upload/FileUploadProgressBar';
import ExamCBTInterface from '../../components/student/ExamCBTInterface';

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

  // Active unit state (handles both ?unitId= and ?lessonId=)
  const queryParamUnitId = searchParams.get('unitId') || searchParams.get('lessonId');
  const [activeUnitId, setActiveUnitId] = useState(queryParamUnitId || allUnits[0]?.id || null);
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
  const [attemptsStatus, setAttemptsStatus] = useState(() => {
    try {
      return mockEngine.getQuizAttemptStatus(enrolmentId, queryParamUnitId);
    } catch {
      return { attemptsUsed: 0, attemptsRemaining: 3, maxAttempts: 3, isLocked: false };
    }
  });

  // Anti-Cheat Proctoring & 24-Hour Lockdown State (initialized synchronously to prevent any unrendered unlocked flash)
  const initialLockout = (() => {
    if (!enrolmentId) return { isLocked: false, remainingHours: 0, remainingMinutes: 0 };
    try {
      return mockEngine.isExamLocked(enrolmentId, queryParamUnitId);
    } catch {
      return { isLocked: false, remainingHours: 0, remainingMinutes: 0 };
    }
  })();
  const [isLockoutActive, setIsLockoutActive] = useState(Boolean(initialLockout.isLocked));
  const [lockoutCountdown, setLockoutCountdown] = useState({
    hours: initialLockout.remainingHours || 0,
    minutes: initialLockout.remainingMinutes || 0,
    seconds: 0
  });
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

  // Sync active unit on load or URL param change (supports unitId & lessonId)
  useEffect(() => {
    const targetUnitId = searchParams.get('unitId') || searchParams.get('lessonId');
    if (targetUnitId && allUnits.some((u) => u.id === targetUnitId)) {
      setActiveUnitId(targetUnitId);
    } else if (allUnits.length > 0 && !activeUnitId) {
      const firstIncomplete = allUnits.find(
        (u) => u.type === 'lesson' && !enrolment?.completed_mandatory_lessons?.includes(u.id)
      );
      setActiveUnitId(firstIncomplete ? firstIncomplete.id : allUnits[0].id);
    }
  }, [searchParams, allUnits.length]);

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
    if (!enrolmentId) return;
    try {
      const targetQuizId = activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam'
        ? (activeQuiz?.id || activeUnit?.id)
        : activeUnit?.id;
      const lockoutInfo = mockEngine.isExamLocked(enrolmentId, targetQuizId);
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
      console.error('Lockout status check failed:', e);
      try {
        const enr = mockEngine.getEnrolment(enrolmentId);
        if (enr?.exam_lockout_until && new Date(enr.exam_lockout_until) > new Date()) {
          setIsLockoutActive(true);
        } else {
          setIsLockoutActive(false);
        }
      } catch {
        setIsLockoutActive(false);
      }
    }
  };

  useEffect(() => {
    checkLockoutStatus();
  }, [enrolmentId, activeUnitId, activeUnit?.id, activeQuiz?.id]);

  // Periodic refresh of lockout countdown while locked
  useEffect(() => {
    if (!isLockoutActive) return;
    const interval = setInterval(() => {
      checkLockoutStatus();
    }, 15000);
    return () => clearInterval(interval);
  }, [isLockoutActive, enrolmentId, activeUnitId]);

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

    // Synchronously check if the target unit is locked
    const targetQuizId = unit.quiz?.id || unit.id;
    const lockCheck = mockEngine.isExamLocked(enrolmentId, targetQuizId);
    if (lockCheck.isLocked) {
      setIsLockoutActive(true);
      setLockoutCountdown({
        hours: lockCheck.remainingHours || 0,
        minutes: lockCheck.remainingMinutes || 0,
        seconds: 0
      });
    } else {
      setIsLockoutActive(false);
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

  const loadAttemptsStatus = (targetId) => {
    if (!enrolmentId || !targetId) return;
    try {
      const status = mockEngine.getQuizAttemptStatus(enrolmentId, targetId);
      setAttemptsStatus(status);
      if (status.isLocked) {
        setIsLockoutActive(true);
        setLockoutCountdown({
          hours: status.remainingHours,
          minutes: status.remainingMinutes,
          seconds: 0
        });
      }
    } catch (e) {
      console.error('Failed to load attempt status:', e);
    }
  };

  useEffect(() => {
    if (activeQuiz) {
      loadAttemptsStatus(activeQuiz.id);
    }
  }, [enrolmentId, activeQuiz?.id]);

  const handleSubmitQuiz = (e) => {
    e?.preventDefault();
    if (isLockoutActive || mockEngine.isExamLocked(enrolmentId, activeQuiz?.id).isLocked) {
      alert('Examination Locked: A 24-hour proctoring security ban is actively in effect. Submissions are rejected.');
      return;
    }
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

    // Record attempt in engine (decrements 3 -> 2 -> 1 -> 0, applies 24h lockout if 3 attempts used and not passed)
    const updatedStatus = mockEngine.recordQuizAttemptSubmission({
      enrolmentId,
      quizId: activeQuiz.id,
      scorePercentage: scorePct,
      isPassed
    });
    setAttemptsStatus(updatedStatus);

    if (updatedStatus.isLocked) {
      setIsLockoutActive(true);
      setLockoutCountdown({
        hours: updatedStatus.remainingHours || 23,
        minutes: updatedStatus.remainingMinutes || 59,
        seconds: 59
      });
    }

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
    }

    setProgressData(mockEngine.getCourseProgress(enrolmentId));
    refreshBalance();
  };

  const handleRetakeExam = () => {
    const lockCheck = mockEngine.isExamLocked(enrolmentId, activeQuiz?.id);
    if (lockCheck.isLocked) {
      setIsLockoutActive(true);
      setLockoutCountdown({
        hours: lockCheck.remainingHours || 0,
        minutes: lockCheck.remainingMinutes || 0,
        seconds: 0
      });
      alert('Retake Locked: A 24-hour proctoring cooldown is actively enforcing lockdown on this evaluation.');
      return;
    }

    const currentStatus = mockEngine.getQuizAttemptStatus(enrolmentId, activeQuiz?.id);
    if (currentStatus.attemptsRemaining <= 0) {
      setIsLockoutActive(true);
      alert('Retake Locked: All 3 evaluation attempts have been exhausted. Please wait 24 hours for the next window.');
      return;
    }

    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizResult(null);
    const totalMinutes = activeUnit?.type === 'final_exam' ? 60 : 20;
    setExamTimeRemaining(totalMinutes * 60);
    loadAttemptsStatus(activeQuiz?.id);
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
                        {mod.quiz && (() => {
                          const lockInfo = mockEngine.isExamLocked(enrolmentId, mod.quiz.id);
                          const isQuizLocked = lockInfo.isLocked;
                          const attemptStatus = mockEngine.getQuizAttemptStatus(enrolmentId, mod.quiz.id);
                          return (
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
                                  : isQuizLocked
                                  ? 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/60'
                                  : isModQuizPassed
                                  ? 'bg-[#092218]/90 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#0c2a1e]'
                                  : 'bg-[#092218]/40 text-amber-300 border-amber-500/30 hover:bg-[#092218]'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                {isQuizLocked ? (
                                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
                                ) : (
                                  <Award
                                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                                      activeUnit?.id === mod.quiz.id
                                        ? 'text-[#071018]'
                                        : isModQuizPassed
                                        ? 'text-[#65F58A]'
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
                                    ? 'bg-[#071018] text-[#65F58A]'
                                    : isQuizLocked
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                                    : isModQuizPassed
                                    ? 'bg-[#65F58A]/15 text-[#65F58A]'
                                    : 'bg-amber-500/15 text-amber-300'
                                }`}
                              >
                                {isQuizLocked ? '24H LOCK' : isModQuizPassed ? 'PASSED' : `${attemptStatus.attemptsRemaining}/3 TRIES`}
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
              {course.final_assessment && (() => {
                const isFinalLocked = mockEngine.isExamLocked(enrolmentId, course.final_assessment.id).isLocked;
                const finalAttemptStatus = mockEngine.getQuizAttemptStatus(enrolmentId, course.final_assessment.id);
                return (
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
                          : isFinalLocked
                          ? 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/60'
                          : isFinalExamUnlocked
                          ? 'bg-[#092218] text-[#65F58A] border-[#65F58A]/40 hover:bg-[#0c2a1e]'
                          : 'bg-[#040e0a] text-gray-500 border-gray-800 cursor-not-allowed opacity-60'
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
                            ? 'bg-[#071018] text-[#65F58A] border-[#071018]'
                            : isFinalLocked
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                            : enrolment?.final_assessment_passed
                            ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/30'
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

            {/* -------------------- 24-HOUR ANTI-CHEAT PROCTOR LOCKDOWN HUD (LESSON UNITS) -------------------- */}
            {isLockoutActive && activeUnit?.type === 'lesson' && (
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
                  <div className="cyber-glass-panel p-6 rounded-2xl border border-[#65F58A]/25 space-y-5 shadow-2xl">
                    <div className="border-b border-[#65F58A]/20 pb-3">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-5 h-5 text-[#65F58A]" />
                        <h4 className="font-bold text-base text-white font-lora">
                          Submit Laboratory Findings & Forensics Report
                        </h4>
                      </div>
                      <p className="text-xs text-[#8BA2B5] font-mono mt-1">
                        Export your triage dossier, packet captures, and IOC findings as a single verified PDF file (maximum 25 MB).
                      </p>
                    </div>

                    {/* Interactive Animated Progress File Uploader */}
                    <FileUploadProgressBar
                      isDisabled={submittingPdf}
                      dropZoneTitle="Drag & drop laboratory findings PDF here"
                      dropZoneSubtitle="Verified .PDF documents only (Max 25 MB)"
                      maxSizeBytes={25 * 1024 * 1024}
                      onFileUploaded={({ name, dataUrl }) => {
                        setUploadingFileName(name);
                        setUploadingDataUrl(dataUrl);
                      }}
                      onFileRemoved={() => {
                        setUploadingFileName('');
                        setUploadingDataUrl('');
                      }}
                    />

                    {/* Submit Confirmation Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono text-[#72A88E]">
                        {uploadingDataUrl
                          ? `Report verified & ready: ${uploadingFileName}`
                          : 'Upload your completed lab PDF to enable assessment dispatch.'}
                      </span>

                      <button
                        type="button"
                        onClick={confirmAssignmentSubmit}
                        disabled={submittingPdf || !uploadingDataUrl}
                        className={`px-6 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                          uploadingDataUrl && !submittingPdf
                            ? 'bg-[#65F58A] text-[#071018] hover:bg-[#35E6B5] shadow-[0_0_15px_rgba(101,245,138,0.4)]'
                            : 'bg-[#092218] text-[#8BA2B5] border border-white/10 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {submittingPdf ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Encrypting & Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Confirm Lab Submission</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Existing Submission Records */}
                    {assignmentSubmission && (
                      <div className="p-4 rounded-xl bg-[#061510] border border-[#65F58A]/30 text-xs font-mono space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#65F58A] font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
                            <span>Verified Lab Submission On File</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            assignmentSubmission.status === 'passed'
                              ? 'bg-[#65F58A]/20 text-[#65F58A] border border-[#65F58A]/30'
                              : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                          }`}>
                            {assignmentSubmission.status}
                          </span>
                        </div>
                        <p className="text-white truncate font-medium">{assignmentSubmission.file_name}</p>
                        <div className="flex items-center justify-between text-[11px] text-[#72A88E] pt-1 border-t border-white/5">
                          <span>Submitted: {new Date(assignmentSubmission.submitted_at).toLocaleDateString()}</span>
                          {assignmentSubmission.grade && (
                            <span className="text-white font-bold">Grade: {assignmentSubmission.grade}%</span>
                          )}
                        </div>
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

            {/* -------------------- 2. EVALUATION & EXAMINATION ENGINE (CBT FORMAT) -------------------- */}
            {(activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && activeQuiz && (
              <ExamCBTInterface
                quiz={activeQuiz}
                enrolmentId={enrolmentId}
                isFinalExam={activeUnit?.type === 'final_exam'}
                timerSeconds={examTimeRemaining}
                attemptsStatus={attemptsStatus}
                answers={quizAnswers}
                onSelectAnswer={handleSelectQuizOption}
                onSubmitExam={handleSubmitQuiz}
                isSubmitted={quizSubmitted}
                submissionResult={quizResult}
                onRetakeExam={handleRetakeExam}
                isLockoutActive={isLockoutActive}
                lockoutCountdown={lockoutCountdown}
              />
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
