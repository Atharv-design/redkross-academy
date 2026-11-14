import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  Bookmark,
  AlertTriangle
} from 'lucide-react';
import { mockEngine } from '../../../services/db/mockEngine';
import { apiClient } from '../../../services/apiClient';
import { socketClient } from '../../../services/socket/socketClient';
import { useAuth } from '../../../services/auth/authContext';
import { resolvePdfUrl } from '../../../services/db/assetStorage';
import CockpitToolStrip from '../../../components/student/CockpitToolStrip';
import PsychologyToolStrip from '../../../components/student/PsychologyToolStrip';

import LessonTopNavigation from './LessonTopNavigation';
import LessonOutlineSidebar from './LessonOutlineSidebar';
import LessonContentPanel from './LessonContentPanel';
import LessonBottomNavigation from './LessonBottomNavigation';
import LessonTacticalInspector from './LessonTacticalInspector';

import CertificateRequestModal from './modals/CertificateRequestModal';
import DiagramLightboxModal from './modals/DiagramLightboxModal';
import PreFlightExamModal from './modals/PreFlightExamModal';
import ModuleUnlockCelebrationModal from './modals/ModuleUnlockCelebrationModal';

const MovablePracticeTerminal = React.lazy(() => import('../../../components/student/MovablePracticeTerminal'));
const CyberLabDesktopWindow = React.lazy(() => import('../../../components/student/CyberLabDesktopWindow'));

const triggerConfetti = (options) => {
  import('canvas-confetti').then((mod) => {
    const fire = mod.default || mod;
    fire(options);
  }).catch(() => {});
};

/** Server attempts view -> the shape the existing UI components expect. */
function toAttemptsStatus(a, isPassed = false) {
  const lockedUntil = a?.locked_until || null;
  const diffMs = lockedUntil ? new Date(lockedUntil).getTime() - Date.now() : 0;
  return {
    attemptsUsed: a?.used || 0,
    attemptsRemaining: a ? a.remaining : 3,
    maxAttempts: a?.max || 3,
    isLocked: Boolean(lockedUntil && diffMs > 0),
    lockedUntil,
    remainingHours: diffMs > 0 ? Math.floor(diffMs / 3600000) : 0,
    remainingMinutes: diffMs > 0 ? Math.max(1, Math.ceil((diffMs % 3600000) / 60000)) : 0,
    isPassed,
  };
}

function countdownFrom(iso) {
  const diffMs = Math.max(0, new Date(iso).getTime() - Date.now());
  return {
    hours: Math.floor(diffMs / 3600000),
    minutes: Math.floor((diffMs % 3600000) / 60000),
    seconds: Math.floor((diffMs % 60000) / 1000),
  };
}

export default function LessonPlayerPage() {
  const { enrolmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshBalance, currentUser } = useAuth();

  const [currentEnrolment, setCurrentEnrolment] = useState(() => {
    let enr = mockEngine.getEnrolment(enrolmentId);
    if (!enr) {
      const user = currentUser || (typeof mockEngine.getCurrentUser === 'function' ? mockEngine.getCurrentUser() : null);
      const userEnrolments = user ? mockEngine.getEnrolmentsForUser(user.id, 'cybersecurity') : [];
      const dbEnrolments = mockEngine.getDb()?.enrolments || [];
      enr = userEnrolments[0] || dbEnrolments.find(e => e.course_id === 'crs_cyber_intro_01') || dbEnrolments[0];
    }
    return enr;
  });

  const enrolment = currentEnrolment || mockEngine.getEnrolment(enrolmentId) || (() => {
    const user = currentUser || (typeof mockEngine.getCurrentUser === 'function' ? mockEngine.getCurrentUser() : null);
    const userEnrolments = user ? mockEngine.getEnrolmentsForUser(user.id, 'cybersecurity') : [];
    const dbEnrolments = mockEngine.getDb()?.enrolments || [];
    return userEnrolments[0] || dbEnrolments.find(e => e.course_id === 'crs_cyber_intro_01') || dbEnrolments[0];
  })();

  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : mockEngine.getCourseById('crs_cyber_intro_01');
  const isPsychology = (course?.division || '').toLowerCase() === 'psychology';

  const allUnits = React.useMemo(() => {
    const units = [];
    if (course && course.modules) {
      course.modules.forEach((mod, modIdx) => {
        (mod.lessons || []).forEach((les) => {
          units.push({
            id: les.id,
            type: 'lesson',
            lesson: les,
            moduleIndex: modIdx,
            moduleId: mod.id,
            moduleTitle: mod.title
          });
        });
        if (mod.quiz) {
          units.push({
            id: mod.quiz.id,
            type: 'quiz',
            quiz: mod.quiz,
            moduleIndex: modIdx,
            moduleId: mod.id,
            moduleTitle: mod.title
          });
        }
      });

      if (course.final_assessment) {
        units.push({
          id: course.final_assessment.id,
          type: 'final_exam',
          quiz: course.final_assessment,
          moduleIndex: course.modules.length,
          moduleId: 'mod_final',
          moduleTitle: 'Final Comprehensive Certification Assessment'
        });
      }
    }
    return units;
  }, [course]);

  const queryParamUnitId = searchParams.get('unitId') || searchParams.get('lessonId');
  const [activeUnitId, setActiveUnitId] = useState(queryParamUnitId || allUnits[0]?.id || null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [bookmarkedUnits, setBookmarkedUnits] = useState({});
  const [progressData, setProgressData] = useState({ percentage: 0, completed: 0, total: 0 });
  const [savingProgress, setSavingProgress] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [toolsStripOpen, setToolsStripOpen] = useState(true);
  const [isMacTerminalOpen, setIsMacTerminalOpen] = useState(false);
  const [isMacTerminalMinimized, setIsMacTerminalMinimized] = useState(false);
  const [isCyberLabOpen, setIsCyberLabOpen] = useState(false);
  const [isCyberLabMinimized, setIsCyberLabMinimized] = useState(false);
  const [injectedTerminalCommand, setInjectedTerminalCommand] = useState(null);
  const [targetIp, setTargetIp] = useState('10.10.11.205');
  const [isTacticalInspectorOpen, setIsTacticalInspectorOpen] = useState(false);

  const [lightboxImage, setLightboxImage] = useState(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadingDataUrl, setUploadingDataUrl] = useState('');
  const [submittingPdf, setSubmittingPdf] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [quizSessionNonce, setQuizSessionNonce] = useState(0);
  // server-issued assessment session: { quizId, sessionId, questions, expiresAt, meta }
  const [assessment, setAssessment] = useState(null);
  const [assessmentState, setAssessmentState] = useState({ loading: false, error: null });
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);
  const [issuedCredential, setIssuedCredential] = useState(null);
  const [, setLessonContentTick] = useState(0);
  const [examTimeRemaining, setExamTimeRemaining] = useState(null);
  const [attemptsStatus, setAttemptsStatus] = useState(() => {
    try {
      return mockEngine.getQuizAttemptStatus(enrolmentId, queryParamUnitId);
    } catch {
      return { attemptsUsed: 0, attemptsRemaining: 3, maxAttempts: 3, isLocked: false };
    }
  });

  const initialLockout = (() => {
    if (!enrolmentId) {
      return { isLocked: false, remainingHours: 0, remainingMinutes: 0 };
    }
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

  const [certRequestModalOpen, setCertRequestModalOpen] = useState(false);
  const [certRequestSubmitted, setCertRequestSubmitted] = useState(false);
  const [certCadetNotes, setCertCadetNotes] = useState('');
  const [hasAcknowledgedExamRules, setHasAcknowledgedExamRules] = useState({});
  const [onScreenAlert, setOnScreenAlert] = useState(null); // { title: string, message: string, type?: 'warning' | 'error' | 'info' }

  const submitLockRef = useRef(null); // session id currently being / already submitted

  const showCustomAlert = (title, message, type = 'warning') => {
    setOnScreenAlert({ title, message, type });
  };

  const [unlockCelebrationModal, setUnlockCelebrationModal] = useState({
    isOpen: false,
    type: 'module',
    unlockedModuleIndex: null,
    unlockedModuleName: '',
    score: 0,
    passingScore: 80,
    nextUnitId: null
  });

  const mainScrollRef = useRef(null);

  // Automatically scroll main content panel and window to the top on lesson / unit change
  useEffect(() => {
    const scrollToTop = () => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
        mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };

    scrollToTop();
    const rafId = requestAnimationFrame(scrollToTop);
    const timerId = setTimeout(scrollToTop, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [activeUnitId]);

  // =========================================================================
  // Strict Linear Curriculum Progression: Read Module -> Pass Exam -> Unlock Next
  useEffect(() => {
    try {
      localStorage.removeItem('rk_dev_gateway_unlock_all');
    } catch (e) {}
  }, []);

  const isModuleUnlocked = (modIndex) => {
    if (modIndex === 0) return true;
    const passedQuizzes = currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || [];
    for (let i = 0; i < modIndex; i++) {
      const prevMod = course?.modules?.[i];
      if (!prevMod) continue;
      if (prevMod.quiz) {
        const passed = passedQuizzes.includes(prevMod.quiz.id);
        if (!passed) return false;
      }
    }
    return true;
  };

  const areAllModulesCompleted = () => {
    if (!course || !course.modules) return false;
    const passedQuizzes = currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || [];
    return course.modules.every((mod) => {
      return mod.quiz ? passedQuizzes.includes(mod.quiz.id) : true;
    });
  };

  const isFinalExamUnlocked = areAllModulesCompleted();

  useEffect(() => {
    const syncEnrolment = () => {
      const updated = mockEngine.getEnrolment(enrolmentId);
      if (updated) {
        setCurrentEnrolment(updated);
        setProgressData(mockEngine.getCourseProgress(enrolmentId));
      }
    };
    const unsub = mockEngine.subscribe((event) => {
      if (
        event.type === 'LESSON_COMPLETED' ||
        event.type === 'QUIZ_ATTEMPT_FORFEITED' ||
        event.type === 'QUIZ_ATTEMPT_RECORDED'
      ) {
        syncEnrolment();
      }
    });
    return () => unsub();
  }, [enrolmentId]);

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

  const activeUnit = allUnits.find((u) => u.id === activeUnitId) || allUnits[0];
  const activeIndex = allUnits.findIndex((u) => u.id === activeUnit?.id);
  const activeLesson = activeUnit?.type === 'lesson' ? activeUnit.lesson : null;
  const baseQuiz = activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam' ? activeUnit.quiz : null;

  const activeQuiz = React.useMemo(() => {
    if (!baseQuiz) return null;
    const session = assessment && assessment.quizId === baseQuiz.id ? assessment : null;
    return {
      ...baseQuiz,
      passing_score: session?.meta?.passing_score ?? baseQuiz.passing_score,
      total_questions: session ? session.questions.length : baseQuiz.total_questions,
      questions: session ? session.questions : [],
      session_id: session?.sessionId || null
    };
  }, [baseQuiz?.id, assessment, quizSessionNonce]);

  // Lesson bodies for library courses are fetched on demand from content_url
  useEffect(() => {
    const les = activeLesson;
    if (!les || les.content || !les.content_url) return;
    let cancelled = false;
    fetch(les.content_url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        // an SPA fallback returns index.html for missing files: never render that as a lesson
        if (/^\s*<!doctype html/i.test(text)) throw new Error('not found');
        if (!cancelled) {
          les.content = text;
          les.content_error = false;
          setLessonContentTick((t) => t + 1);
        }
      })
      .catch(() => {
        if (!cancelled) {
          les.content_error = true;
          setLessonContentTick((t) => t + 1);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeLesson?.id]);

  const displayLesson = activeLesson && activeLesson.content_url && !activeLesson.content
    ? {
        ...activeLesson,
        content: activeLesson.content_error
          ? '> [!WARNING] Lesson unavailable\n> This lesson could not be loaded. Check your connection and reload the page.'
          : '*Loading lesson...*'
      }
    : activeLesson;

  const isLessonCompleted = activeLesson
    ? (currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || []).includes(activeLesson.id)
    : false;
  const isQuizPassed = activeQuiz
    ? (currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || []).includes(activeQuiz.id) || (activeUnit?.type === 'final_exam' && (currentEnrolment?.final_assessment_passed || enrolment?.final_assessment_passed))
    : false;
  const isAssignment = activeLesson?.type === 'assignment';

  const syncServerStatus = React.useCallback(async () => {
    if (!course?.id || !enrolmentId) return null;
    try {
      const { ok, data } = await apiClient.getAssessmentStatus(course.id);
      if (!ok) return null;
      mockEngine.applyServerAssessmentStatus(enrolmentId, data);
      const updated = mockEngine.getEnrolment(enrolmentId);
      if (updated) setCurrentEnrolment({ ...updated });
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      return data;
    } catch (err) {
      console.warn('Assessment status sync failed:', err?.message);
      return null;
    }
  }, [course?.id, enrolmentId]);

  useEffect(() => {
    if (!course?.id || !enrolmentId || !currentUser) return;
    let cancelled = false;
    (async () => {
      await syncServerStatus();
      try {
        const { ok, data } = await apiClient.getLessonProgress(course.id);
        if (!ok || cancelled) return;
        const serverDone = data.completed_lessons || [];
        mockEngine.mergeServerLessonCompletions(enrolmentId, serverDone);
        // one-time upload of progress that was only saved in this browser
        const localDone = mockEngine.getEnrolment(enrolmentId)?.completed_mandatory_lessons || [];
        const missing = localDone.filter((id) => !serverDone.includes(id));
        if (missing.length) apiClient.recordLessonProgress(course.id, missing).catch(() => {});
        const updated = mockEngine.getEnrolment(enrolmentId);
        if (updated) setCurrentEnrolment({ ...updated });
        setProgressData(mockEngine.getCourseProgress(enrolmentId));
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [course?.id, enrolmentId, currentUser?.id]);

  const isExamUnit = (activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && !!activeQuiz;
  const isExamRulesAcknowledged = activeQuiz ? !!hasAcknowledgedExamRules[activeQuiz.id] : false;
  const showExamRulesGate = isExamUnit && !isQuizPassed && !quizSubmitted && !isLockoutActive && !isExamRulesAcknowledged;
  // Lockdown (no navigation) only while an attempt is actually running: not before it
  // starts, not on the results screen, not after a forfeit or during a cooldown.
  const isExamActive =
    isExamUnit && !!assessment && assessment.quizId === activeQuiz?.id && !quizSubmitted && !isLockoutActive && isExamRulesAcknowledged;

  const [assessmentStartNonce, setAssessmentStartNonce] = useState(0);
  useEffect(() => {
    if (!activeQuiz || !course?.id || !isExamRulesAcknowledged || isQuizPassed || quizSubmitted || isLockoutActive) return;
    if (assessment?.quizId === activeQuiz.id) return;
    let cancelled = false;
    setAssessmentState({ loading: true, error: null });
    apiClient
      .startAssessment(course.id, activeQuiz.id)
      .then(async ({ ok, status, data }) => {
        if (cancelled) return;
        if (ok) {
          setAssessment({
            quizId: activeQuiz.id,
            sessionId: data.session_id,
            questions: (data.questions || []).map((q) => ({ ...q, question: q.text })),
            expiresAt: data.expires_at,
            meta: data.quiz
          });
          setQuizAnswers({});
          const serverNow = data.server_time ? new Date(data.server_time).getTime() : Date.now();
          setExamTimeRemaining(Math.max(0, Math.round((new Date(data.expires_at).getTime() - serverNow) / 1000)));
          setAttemptsStatus(toAttemptsStatus(data.attempts));
          setAssessmentState({ loading: false, error: null });
          return;
        }
        if (status === 423 && data.attempts?.locked_until) {
          setAttemptsStatus(toAttemptsStatus(data.attempts));
          setIsLockoutActive(true);
          setLockoutCountdown(countdownFrom(data.attempts.locked_until));
          setAssessmentState({ loading: false, error: null });
        } else if (status === 409 && data.already_passed) {
          setAssessmentState({ loading: false, error: null });
        } else if (status === 403 && data.error === 'FINAL_LOCKED') {
          setAssessmentState({ loading: false, error: 'The final assessment unlocks after you pass every module assessment.' });
        } else if (status === 401) {
          setAssessmentState({ loading: false, error: 'Your session has expired. Please sign in again to take this assessment.' });
        } else {
          setAssessmentState({ loading: false, error: 'The assessment could not be started. Please try again.' });
        }
        await syncServerStatus();
      })
      .catch(() => {
        if (!cancelled) {
          setAssessmentState({ loading: false, error: 'Could not reach the assessment service. Check your connection and try again.' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeQuiz?.id, course?.id, isExamRulesAcknowledged, isQuizPassed, quizSubmitted, isLockoutActive, assessmentStartNonce]);

  // Automatically collapse outline sidebar whenever on an active exam unit
  useEffect(() => {
    if (isExamActive) {
      setSidebarOpen(false);
    }
  }, [isExamActive]);

  const targetParamUnitId = searchParams.get('unitId') || searchParams.get('lessonId');

  useEffect(() => {
    if (targetParamUnitId && allUnits.some((u) => u.id === targetParamUnitId)) {
      const targetUnit = allUnits.find((u) => u.id === targetParamUnitId);
      if (targetUnit && targetUnit.moduleIndex > 0 && !isModuleUnlocked(targetUnit.moduleIndex)) {
        const fallbackUnit = allUnits.find((u) => isModuleUnlocked(u.moduleIndex || 0)) || allUnits[0];
        setActiveUnitId(fallbackUnit.id);
        setSearchParams({ lessonId: fallbackUnit.id });
        return;
      }
      setActiveUnitId((prev) => (prev === targetParamUnitId ? prev : targetParamUnitId));
    } else if (allUnits.length > 0 && (!activeUnitId || !allUnits.some((u) => u.id === activeUnitId))) {
      const savedUnitId = currentEnrolment?.last_visited_unit_id || enrolment?.last_visited_unit_id || localStorage.getItem(`rk_last_unit_${enrolmentId}`);
      if (savedUnitId && allUnits.some((u) => u.id === savedUnitId)) {
        const savedUnit = allUnits.find((u) => u.id === savedUnitId);
        if (savedUnit && savedUnit.moduleIndex > 0 && !isModuleUnlocked(savedUnit.moduleIndex)) {
          const fallbackUnit = allUnits.find((u) => isModuleUnlocked(u.moduleIndex || 0)) || allUnits[0];
          setActiveUnitId(fallbackUnit.id);
        } else {
          setActiveUnitId((prev) => (prev === savedUnitId ? prev : savedUnitId));
        }
      } else {
        const completedLessons = currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || [];
        const firstIncomplete = allUnits.find(
          (u) => u.type === 'lesson' && !completedLessons.includes(u.id) && isModuleUnlocked(u.moduleIndex || 0)
        );
        const fallbackId = firstIncomplete ? firstIncomplete.id : allUnits[0].id;
        setActiveUnitId((prev) => (prev === fallbackId ? prev : fallbackId));
      }
    }
  }, [targetParamUnitId, allUnits.length, enrolmentId]);

  useEffect(() => {
    if (activeUnit?.id && enrolmentId) {
      const savedUnit = currentEnrolment?.last_visited_unit_id || enrolment?.last_visited_unit_id;
      if (savedUnit !== activeUnit.id) {
        mockEngine.saveLastVisitedUnit(enrolmentId, activeUnit.id);
      }
    }
  }, [activeUnit?.id, enrolmentId]);

  useEffect(() => {
    if (enrolmentId) {
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
    }
  }, [enrolmentId]);

  useEffect(() => {
    const currentUnit = allUnits.find((u) => u.id === activeUnitId);
    if (currentUnit) {
      setExpandedModules((prev) => {
        if (prev[currentUnit.moduleId]) return prev;
        return { ...prev, [currentUnit.moduleId]: true };
      });
    }
  }, [activeUnitId]);

  const checkLockoutStatus = () => {
    if (!enrolmentId) return;
    try {
      const targetQuizId = activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam'
        ? (activeQuiz?.id || activeUnit?.id)
        : activeUnit?.id;
      const lockoutInfo = mockEngine.isExamLocked(enrolmentId, targetQuizId);
      if (lockoutInfo && lockoutInfo.isLocked) {
        setIsLockoutActive((prev) => (!prev ? true : prev));
        setLockoutCountdown((prev) => {
          const h = lockoutInfo.remainingHours || 0;
          const m = lockoutInfo.remainingMinutes || 0;
          if (prev.hours === h && prev.minutes === m && prev.seconds === 0) return prev;
          return { hours: h, minutes: m, seconds: 0 };
        });
      } else {
        setIsLockoutActive((prev) => (prev ? false : prev));
      }
    } catch (e) {
      console.error('Lockout status check failed:', e);
      try {
        const enr = mockEngine.getEnrolment(enrolmentId);
        const locked = Boolean(enr?.exam_lockout_until && new Date(enr.exam_lockout_until) > new Date());
        setIsLockoutActive((prev) => (prev !== locked ? locked : prev));
      } catch {
        setIsLockoutActive((prev) => (prev ? false : prev));
      }
    }
  };

  useEffect(() => {
    checkLockoutStatus();
    const handlePopState = () => {
      checkLockoutStatus();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [enrolmentId, activeUnitId, activeUnit?.id, activeQuiz?.id]);

  useEffect(() => {
    if (!isLockoutActive) return;
    const interval = setInterval(() => {
      checkLockoutStatus();
    }, 15000);
    return () => clearInterval(interval);
  }, [isLockoutActive, enrolmentId, activeUnitId]);

  useEffect(() => {
    if (activeQuiz) {
      setQuizSubmitted((prev) => (prev !== isQuizPassed ? isQuizPassed : prev));
      if (isQuizPassed && (!quizResult || quizResult.quizId !== activeQuiz.id)) {
        const recordedScore = (currentEnrolment || enrolment)?.quiz_scores?.[activeQuiz.id];
        setQuizResult({
          quizId: activeQuiz.id,
          score: typeof recordedScore === 'number' ? recordedScore : 100,
          totalQuestions: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          correctCount: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          isPassed: true
        });
      } else if (!isQuizPassed) {
        const isFifty = activeUnit?.type === 'final_exam' || (activeQuiz?.total_questions >= 50);
        const totalMinutes = isFifty ? 60 : 30; // 50 marks = 60 min, 20 marks = 30 min
        setExamTimeRemaining((prev) => (prev !== totalMinutes * 60 ? totalMinutes * 60 : prev));
      }
    }
  }, [activeQuiz?.id, isQuizPassed, activeUnit?.type]);

  // Auto-dismiss course outline sidebar whenever an active exam unit is displayed
  useEffect(() => {
    if (isExamUnit && !isQuizPassed && !quizSubmitted) {
      setSidebarOpen(false);
    }
  }, [isExamUnit, isQuizPassed, quizSubmitted]);

  const handleForfeitExam = async (reason = 'PROCTOR_VIOLATION') => {
    const quizId = activeQuiz?.id;
    if (!assessment || assessment.quizId !== quizId) return;
    // A strike that lands after the answers were submitted (e.g. leaving fullscreen
    // on the results screen) must not wipe the graded result.
    if (quizSubmitted || submitLockRef.current === assessment.sessionId) return;
    let result = { ok: false, data: {} };
    try {
      result = await apiClient.forfeitAssessment(assessment.sessionId, reason);
    } catch {}
    if (!result.ok && result.status === 409) {
      // the attempt was already closed (submitted or expired): just refresh
      await syncServerStatus();
      return;
    }
    setAssessment(null);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizSubmitted(false);
    setHasAcknowledgedExamRules((prev) => ({ ...prev, [quizId]: false }));
    await syncServerStatus();
    if (result.ok && result.data.attempts) {
      setAttemptsStatus(toAttemptsStatus(result.data.attempts));
      if (result.data.attempts.locked_until) {
        setIsLockoutActive(true);
        setLockoutCountdown(countdownFrom(result.data.attempts.locked_until));
      }
    }
    const reasons = String(reason || '')
      .replace(/^THREE_STRIKES:\s*/, '')
      .split(' | ')
      .map((x) => x.trim())
      .filter(Boolean);
    showCustomAlert(
      'Attempt ended: 3 proctoring strikes',
      (reasons.length ? reasons.map((x) => '- ' + x).join('\n') + '\n\n' : '') +
        'A 24-hour cooldown now applies to this assessment.',
      'error'
    );
  };

  const loadAssignmentSubmission = () => {
    if (!enrolmentId) return;
    const subs = mockEngine.getAssignmentSubmissions({ enrolment_id: enrolmentId });
    setAssignmentSubmission((prev) => {
      const nextSub = subs[0] || null;
      if (!prev && !nextSub) return null;
      if (prev && nextSub && prev.id === nextSub.id && prev.status === nextSub.status && prev.grade === nextSub.grade) return prev;
      return nextSub;
    });
  };

  useEffect(() => {
    loadAssignmentSubmission();
    const unsubSocket = socketClient.on('assignment:graded', (payload) => {
      if (!payload?.enrolmentId || payload.enrolmentId === enrolmentId) {
        loadAssignmentSubmission();
      }
    });
    const unsubMock = mockEngine.subscribe((event) => {
      if (event.type === 'ASSIGNMENT_MUTATED' || event.type === 'ASSIGNMENT_EVALUATED') {
        loadAssignmentSubmission();
      }
    });
    return () => {
      if (typeof unsubSocket === 'function') unsubSocket();
      unsubMock();
    };
  }, [enrolmentId, activeLesson?.id]);

  const handleSelectUnit = (unit) => {
    if (!unit) return;

    const isExamInProgress =
      (activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') &&
      !quizSubmitted &&
      !isLockoutActive &&
      activeQuiz &&
      hasAcknowledgedExamRules[activeQuiz.id];

    if (isExamInProgress && unit.id !== activeUnit?.id) {
      showCustomAlert('EXAMINATION ACTIVE LOCKDOWN', 'You are in an active examination session in Fullscreen Mode.\nLeaving or switching units is prohibited until you complete your assessment.\nPlease use the "Final Submit & Finish" button to submit your answers and exit.', 'error');
      return;
    }

    if (unit.type === 'final_exam') {
      if (!isFinalExamUnlocked) {
        showCustomAlert('Final Assessment Locked', 'Pass every module assessment to unlock the final assessment.', 'warning');
        return;
      }
    } else if (unit.moduleIndex > 0 && !isModuleUnlocked(unit.moduleIndex)) {
      showCustomAlert(`Module ${unit.moduleIndex + 1} Locked`, `Pass the Module ${unit.moduleIndex} assessment (${course?.modules?.[unit.moduleIndex - 1]?.quiz?.passing_score || 80}% or higher) to unlock.`, 'warning');
      return;
    }

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    setActiveUnitId(unit.id);
    if (unit.type === 'lesson') {
      setSearchParams({ lessonId: unit.id });
    } else {
      setSearchParams({ unitId: unit.id });
    }

    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

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
      handleSelectUnit(allUnits[activeIndex - 1]);
    }
  };

  const handleNextUnit = () => {
    if (activeIndex < allUnits.length - 1) {
      handleSelectUnit(allUnits[activeIndex + 1]);
    }
  };

  const handleMarkLessonComplete = async () => {
    if (!activeLesson || isLessonCompleted || savingProgress) return;
    setSavingProgress(true);
    try {
      mockEngine.recordLessonCompletion(enrolmentId, activeLesson.id);
      if (course?.id) apiClient.recordLessonProgress(course.id, activeLesson.id).catch(() => {});
      const updatedEnr = mockEngine.getEnrolment(enrolmentId);
      if (updatedEnr) {
        setCurrentEnrolment({ ...updatedEnr });
      }
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      refreshBalance();
    } catch (e) {
      console.error('Failed to mark lesson complete:', e);
    } finally {
      setSavingProgress(false);
    }
  };

  const handleCompleteAndNext = async () => {
    if (!isLessonCompleted && activeLesson) {
      await handleMarkLessonComplete();
    }
    handleNextUnit();
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
      }
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }, 60);
  };

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

  const confirmAssignmentSubmit = async () => {
    if (!uploadingDataUrl || !uploadingFileName || !activeLesson) return;
    setSubmittingPdf(true);
    try {
      const studentName = currentUser?.full_name || currentUser?.name || 'Cadet Student';
      const cadetId = currentUser?.cadet_id || 'RK-89421';
      const localSub = mockEngine.submitAssignment({
        cadetId,
        userId: currentUser?.id || enrolment.user_id,
        enrolmentId,
        courseId: course.id,
        moduleId: activeLesson.module_id,
        assignmentId: activeLesson.id,
        assignmentTitle: activeLesson.title,
        fileName: uploadingFileName,
        fileDataUrl: uploadingDataUrl
      });

      apiClient.submitAssignment({
        enrolment_id: enrolmentId,
        assignment_id: activeLesson.id,
        assignment_title: activeLesson.title,
        student_id: currentUser?.id || enrolment.user_id,
        student_name: studentName,
        cadet_id: cadetId,
        submission_file_name: uploadingFileName,
        submission_url: uploadingDataUrl
      }).catch(console.warn);

      socketClient.emit('assignment:submitted', {
        submissionId: localSub?.id,
        enrolmentId,
        assignmentId: activeLesson.id,
        assignmentTitle: activeLesson.title,
        studentName,
        cadetId
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

  const handleSelectQuizOption = (questionId, optionId) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = async (e) => {
    e?.preventDefault();
    if (isSubmittingAssessment || quizSubmitted) return;
    if (!activeQuiz || !assessment || assessment.quizId !== activeQuiz.id) return;
    if (submitLockRef.current === assessment.sessionId) return;
    submitLockRef.current = assessment.sessionId;

    setIsSubmittingAssessment(true);
    let result = { ok: false, status: 0, data: {} };
    try {
      result = await apiClient.submitAssessment(assessment.sessionId, quizAnswers);
    } catch {}
    setIsSubmittingAssessment(false);

    if (!result.ok) {
      if (result.status !== 409) submitLockRef.current = null; // allow a retry after a network error
      if (result.status === 409) {
        setAssessment(null);
        await syncServerStatus();
        showCustomAlert('Attempt already closed', 'This attempt was already submitted or expired. Your result has been refreshed.', 'warning');
      } else {
        showCustomAlert('Submission not recorded', 'We could not reach the assessment service. Your answers are still here - check your connection and submit again.', 'error');
      }
      return;
    }

    const data = result.data;
    const reviewById = Object.fromEntries((data.review || []).map((r) => [r.question_id, r]));
    setAssessment((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) => {
              const r = reviewById[q.id];
              if (!r) return q;
              return {
                ...q,
                is_answer_correct: r.is_correct,
                explanation: r.explanation || '',
                options: (q.options || []).map((o) => ({ ...o, is_correct: r.correct_option_id ? o.id === r.correct_option_id : undefined }))
              };
            })
          }
        : prev
    );

    const scorePct = data.score_percentage;
    const passingScore = data.passing_score;
    const isPassed = Boolean(data.is_passed);
    setQuizResult({
      quizId: activeQuiz.id,
      score: scorePct,
      score_percentage: scorePct,
      percentage: scorePct,
      correctCount: data.correct_count,
      totalQuestions: data.total_questions,
      isPassed,
      is_passed: isPassed,
      late: data.late,
      topicsToReview: data.topics_to_review || []
    });
    setQuizSubmitted(true);
    setAttemptsStatus(toAttemptsStatus(data.attempts, isPassed));
    if (data.attempts?.locked_until) {
      setIsLockoutActive(true);
      setLockoutCountdown(countdownFrom(data.attempts.locked_until));
    }
    if (data.late) {
      showCustomAlert('Time limit exceeded', 'This attempt was submitted after the time limit and could not count as a pass.', 'warning');
    }

    await syncServerStatus();
    refreshBalance();

    if (isPassed) {
      triggerConfetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF7A00', '#FFA439', '#FF7A00', '#FFD700']
      });

      if (activeUnit?.type === 'final_exam') {
        setIssuedCredential(data.credential || null);
        setCertRequestModalOpen(true);
      } else {
        const currentModIdx =
          activeUnit?.moduleIndex ??
          course?.modules?.findIndex((m) => m.quiz?.id === activeQuiz.id) ??
          0;
        const quizModules = (course?.modules || []).map((m, i) => ({ m, i })).filter(({ m }) => m.quiz);
        const isLastQuizModule = quizModules.length > 0 && quizModules[quizModules.length - 1].i === currentModIdx;

        if (isLastQuizModule) {
          const finalExamUnit = allUnits.find((u) => u.type === 'final_exam');
          setUnlockCelebrationModal({
            isOpen: true,
            type: 'final_round',
            unlockedModuleIndex: null,
            unlockedModuleName: `Final Assessment (${course?.final_assessment?.total_questions || ''} MCQs)`,
            score: scorePct,
            passingScore,
            nextUnitId: finalExamUnit?.id || null
          });
        } else {
          const nextModIdx = currentModIdx + 1;
          const nextModule = course?.modules?.[nextModIdx];
          const nextUnit =
            allUnits.find((u) => u.moduleIndex === nextModIdx && u.type === 'lesson') ||
            allUnits.find((u) => u.moduleIndex === nextModIdx);

          setUnlockCelebrationModal({
            isOpen: true,
            type: 'module',
            unlockedModuleIndex: nextModIdx + 1,
            unlockedModuleName: nextModule?.title || `Module ${nextModIdx + 1}`,
            score: scorePct,
            passingScore,
            nextUnitId: nextUnit?.id || null
          });
        }
      }
    }
  };

  const handleRetakeExam = () => {
    const lockCheck = mockEngine.isExamLocked(enrolmentId, activeQuiz?.id);
    if (lockCheck.isLocked) {
      setIsLockoutActive(true);
      showCustomAlert('Retake Locked', 'A 24-hour proctoring cooldown is actively enforcing lockdown on this evaluation.', 'error');
      return;
    }

    const currentStatus = mockEngine.getQuizAttemptStatus(enrolmentId, activeQuiz?.id);
    if (currentStatus.attemptsRemaining <= 0) {
      setIsLockoutActive(true);
      showCustomAlert('Retake Locked', 'All 3 evaluation attempts have been exhausted. Please wait 24 hours for the next window.', 'error');
      return;
    }

    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizResult(null);
    if (activeQuiz?.id) {
      setAssessment(null);
      try {
        localStorage.removeItem(`rk_exam_deadline_${enrolmentId || 'cadet'}_${activeQuiz.id}`);
        localStorage.removeItem(`rk_exam_buffer_${enrolmentId || 'cadet'}_${activeQuiz.id}`);
        localStorage.removeItem(`rk_exam_strikes_${enrolmentId || 'cadet'}_${activeQuiz.id}`);
      } catch {}
      setQuizSessionNonce((prev) => prev + 1);
      setHasAcknowledgedExamRules((prev) => ({
        ...prev,
        [activeQuiz.id]: false
      }));
    }
    const isFifty = activeUnit?.type === 'final_exam' || (activeQuiz?.total_questions >= 50);
    const totalMinutes = isFifty ? 60 : 30; // 50 marks = 60 min, 20 marks = 30 min
    setExamTimeRemaining(totalMinutes * 60);
  };

  const handleAcknowledgeExamRules = () => {
    if (!activeQuiz) return;
    setSidebarOpen(false); // Auto-dismiss course outline sidebar on exam start
    setHasAcknowledgedExamRules((prev) => ({
      ...prev,
      [activeQuiz.id]: true
    }));
  };

  const handleCancelExamRules = () => {
    if (activeIndex > 0) {
      handleSelectUnit(allUnits[activeIndex - 1]);
    } else {
      navigate('/student');
    }
  };

  const handleProceedFromCelebration = () => {
    const nextUnitId = unlockCelebrationModal.nextUnitId;
    const isFinalRound = unlockCelebrationModal.type === 'final_round';
    setUnlockCelebrationModal({
      isOpen: false,
      type: 'module',
      unlockedModuleIndex: null,
      unlockedModuleName: '',
      score: 0,
      passingScore: 80,
      nextUnitId: null
    });

    if (isFinalRound) {
      const finalExamUnit = allUnits.find((u) => u.type === 'final_exam');
      if (finalExamUnit) {
        handleSelectUnit(finalExamUnit);
      }
    } else if (nextUnitId) {
      const targetUnit = allUnits.find((u) => u.id === nextUnitId);
      if (targetUnit) {
        handleSelectUnit(targetUnit);
        if (targetUnit.moduleId) {
          setExpandedModules((prev) => ({ ...prev, [targetUnit.moduleId]: true }));
        }
      }
    }
  };

  const handleDismissCelebration = () => {
    setUnlockCelebrationModal({
      isOpen: false,
      type: 'module',
      unlockedModuleIndex: null,
      unlockedModuleName: '',
      score: 0,
      passingScore: 80,
      nextUnitId: null
    });
  };

  const handleSubmitCertificateRequest = () => {
    setCertRequestModalOpen(false);
  };

  const isCurrentUnitBookmarked = Boolean(bookmarkedUnits[activeUnit?.id]);

  if (!enrolment || !course) {
    return (
      <div className="min-h-screen bg-black py-24 text-center px-4 flex items-center justify-center font-lora">
        <div className="max-w-md p-8 rounded-2xl cyber-glass-card border border-[#FF7A00]/30 space-y-4">
          <h2 className="text-xl font-bold text-white">Enrolment Not Found</h2>
          <p className="text-xs text-[#E2D9CE] font-mono">
            Please verify that you are actively enrolled in this training course.
          </p>
          <Link
            to="/student"
            className="px-5 py-2.5 bg-[#FF7A00] rounded-xl text-black text-xs font-bold font-mono inline-flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Classroom</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-[#F1F5F9] font-lora relative flex flex-col overflow-x-hidden">
      {/* Pure CSS Lightweight Ambient Background (Zero GPU/WebGL overhead) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255,122,0,0.06) 0%, transparent 60%), linear-gradient(rgba(255,122,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.015) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px'
        }}
      />

      {/* Top Header */}
      <LessonTopNavigation
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        course={course}
        progressData={progressData}
        activeUnit={activeUnit}
        toolsStripOpen={toolsStripOpen}
        setToolsStripOpen={setToolsStripOpen}
        isExamActive={isExamActive}
        onOpenTerminal={() => {
          setIsMacTerminalOpen(true);
          setIsMacTerminalMinimized(false);
        }}
      />

      {/* 3-Panel Dedicated Learning Layout: Panel 1 (Outline) | Panel 2 (Notes & Theory) | Panel 3 (Tool Strip) */}
      <div className="flex-1 flex w-full relative items-start">
        {/* Panel 1: Left Course Outline Sidebar - completely removed during active exam */}
        {!isExamActive && (
          <LessonOutlineSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            course={course}
            expandedModules={expandedModules}
            setExpandedModules={setExpandedModules}
            activeUnit={activeUnit}
            handleSelectUnit={handleSelectUnit}
            isModuleUnlocked={isModuleUnlocked}
            currentEnrolment={currentEnrolment}
            enrolment={enrolment}
            enrolmentId={enrolmentId}
            isFinalExamUnlocked={isFinalExamUnlocked}
            onShowNotice={(title, msg) => showCustomAlert(title, msg, 'warning')}
          />
        )}

        {/* Panel 2: Center Main Stage Content (Notes, Theory, Lab Synthesis) */}
        <main ref={mainScrollRef} className="flex-1 min-w-0 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7 space-y-6 bg-black/90 pb-24 z-10">
          <div className="w-full space-y-6">
            {/* Top Unit Title Bar & Bookmark Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#FF7A00]/20 gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#A3907C] uppercase tracking-wider block font-lora">
                  {activeUnit?.moduleTitle || 'Curriculum Module'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-lora tracking-tight">
                  {activeLesson?.title || activeQuiz?.title || 'Interactive Lesson'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => toggleBookmark(activeUnit?.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-lora transition-all cursor-pointer self-start sm:self-center ${
                  isCurrentUnitBookmarked
                    ? 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/40'
                    : 'bg-[#0E0C09] text-[#A3907C] border-[#FF7A00]/20 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentUnitBookmarked ? 'fill-current' : ''}`} />
                <span>{isCurrentUnitBookmarked ? 'Bookmarked' : 'Bookmark this page'}</span>
              </button>
            </div>

            {/* Content Panel (Notes, Markdown, Assignment, CBT Exam) */}
            <LessonContentPanel
              activeUnit={activeUnit}
              activeLesson={displayLesson}
              activeQuiz={activeQuiz}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAssignment={isAssignment}
              handleDownloadChapterNotes={handleDownloadChapterNotes}
              setLightboxImage={setLightboxImage}
              handleDownloadAdminPdf={handleDownloadAdminPdf}
              submittingPdf={submittingPdf}
              uploadingFileName={uploadingFileName}
              setUploadingFileName={setUploadingFileName}
              uploadingDataUrl={uploadingDataUrl}
              setUploadingDataUrl={setUploadingDataUrl}
              confirmAssignmentSubmit={confirmAssignmentSubmit}
              assignmentSubmission={assignmentSubmission}
              enrolmentId={enrolmentId}
              examTimeRemaining={examTimeRemaining}
              attemptsStatus={attemptsStatus}
              quizAnswers={quizAnswers}
              handleSelectQuizOption={handleSelectQuizOption}
              handleSubmitQuiz={handleSubmitQuiz}
              quizSubmitted={quizSubmitted}
              quizResult={quizResult}
              handleRetakeExam={handleRetakeExam}
              isLockoutActive={isLockoutActive}
              lockoutCountdown={lockoutCountdown}
              onReturnToReview={() => handleSelectUnit(allUnits[0])}
              assessmentState={assessmentState}
              onRetryAssessmentStart={() => setAssessmentStartNonce((n) => n + 1)}
              onForfeitExam={handleForfeitExam}
              isSubmittingAssessment={isSubmittingAssessment}
            />

            {/* Bottom Prev / Next Navigation Bar - suppressed during exam */}
            {!isExamActive && (
              <LessonBottomNavigation
                activeUnit={activeUnit}
                quizSubmitted={quizSubmitted}
                handlePrevUnit={handlePrevUnit}
                activeIndex={activeIndex}
                allUnits={allUnits}
                course={course}
                handleCompleteAndNext={handleCompleteAndNext}
                handleMarkLessonComplete={handleMarkLessonComplete}
                isLessonCompleted={isLessonCompleted}
                savingProgress={savingProgress}
              />
            )}
          </div>
        </main>

        {/* Tactical Recon Hub Drawer (Image 1) */}
        {!isPsychology && toolsStripOpen && isTacticalInspectorOpen && activeUnit?.type === 'lesson' && (
          <LessonTacticalInspector
            isOpen={isTacticalInspectorOpen}
            onClose={() => setIsTacticalInspectorOpen(false)}
            targetIp={targetIp}
            onOpenTerminal={() => {
              setIsMacTerminalOpen(true);
              setIsMacTerminalMinimized(false);
            }}
            onInjectPayload={(cmd) => {
              setInjectedTerminalCommand(cmd);
              setIsMacTerminalOpen(true);
              setIsMacTerminalMinimized(false);
            }}
            isAssignment={isAssignment}
          />
        )}

        {/* Panel 3: Right Vertical Tools Strip */}
        {toolsStripOpen && activeUnit?.type === 'lesson' && (
          isPsychology ? (
            <PsychologyToolStrip
              course={course}
              enrolment={enrolment}
              enrolmentId={enrolmentId}
              activeUnit={activeUnit}
              onCollapse={() => setToolsStripOpen(false)}
            />
          ) : (
            <CockpitToolStrip
              tools={[]}
              onCollapse={() => setToolsStripOpen(false)}
            />
          )
        )}
      </div>

      {/* Certificate Request Modal */}
      <CertificateRequestModal
        isOpen={certRequestModalOpen}
        onClose={() => setCertRequestModalOpen(false)}
        course={course}
        currentUser={currentUser}
        enrolment={enrolment}
        quizResult={quizResult}
        credential={issuedCredential}
        certRequestSubmitted={certRequestSubmitted}
        certCadetNotes={certCadetNotes}
        setCertCadetNotes={setCertCadetNotes}
        onSubmit={handleSubmitCertificateRequest}
      />

      {/* Diagram Lightbox Modal */}
      <DiagramLightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      {/* Pre-Flight Exam Rules Modal */}
      <PreFlightExamModal
        isOpen={showExamRulesGate}
        activeUnit={activeUnit}
        onCancel={handleCancelExamRules}
        onAcknowledge={handleAcknowledgeExamRules}
      />

      {/* Module Unlock Celebration Modal */}
      <ModuleUnlockCelebrationModal
        modalData={unlockCelebrationModal}
        onDismiss={handleDismissCelebration}
        onProceed={handleProceedFromCelebration}
      />

      {/* Floating Practice Terminal */}
      {!isPsychology && isMacTerminalOpen && (
        <React.Suspense fallback={null}>
          <MovablePracticeTerminal
            isOpen={isMacTerminalOpen}
            onClose={() => setIsMacTerminalOpen(false)}
            isMinimized={isMacTerminalMinimized}
            onMinimize={() => setIsMacTerminalMinimized(true)}
            onRestore={() => setIsMacTerminalMinimized(false)}
            injectedCommand={injectedTerminalCommand}
            onClearInjectedCommand={() => setInjectedTerminalCommand(null)}
            targetIp={targetIp}
            lessonId={activeLesson?.id}
          />
        </React.Suspense>
      )}

      {/* Floating CyberLab Desktop */}
      {!isPsychology && isCyberLabOpen && (
        <React.Suspense fallback={null}>
          <CyberLabDesktopWindow
            isOpen={isCyberLabOpen}
            onClose={() => setIsCyberLabOpen(false)}
            isMinimized={isCyberLabMinimized}
            onMinimize={() => setIsCyberLabMinimized(true)}
            onRestore={() => setIsCyberLabMinimized(false)}
          />
        </React.Suspense>
      )}

      {/* Custom In-App On-Screen Alert Modal (Replaces Native Browser Alerts) */}
      {onScreenAlert && (
        <div className="fixed inset-0 z-[10002] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn select-none">
          <div className="max-w-md w-full rounded-2xl bg-[#0F0C08] border-2 border-[#FF7A00]/80 p-6 sm:p-7 space-y-5 text-center shadow-[0_0_50px_rgba(255,122,0,0.35)]">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto ${
              onScreenAlert.type === 'error'
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'bg-[#FF7A00]/20 border-[#FF7A00] text-[#FF7A00]'
            }`}>
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider border inline-block ${
                onScreenAlert.type === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[#FF7A00]/20 text-[#FFA439] border-[#FF7A00]/40'
              }`}>
                {onScreenAlert.type === 'error' ? 'Security Restriction' : 'Academy Notice'}
              </span>
              <h3 className="text-xl font-bold font-lora text-white">
                {onScreenAlert.title}
              </h3>
              <p className="text-xs font-mono text-[#E2D9CE]/90 leading-relaxed whitespace-pre-line">
                {onScreenAlert.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOnScreenAlert(null)}
              className="w-full py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all cursor-pointer"
            >
              Acknowledge & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
