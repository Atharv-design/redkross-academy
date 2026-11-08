import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  Bookmark
} from 'lucide-react';
import { mockEngine } from '../../../services/db/mockEngine';
import { apiClient } from '../../../services/apiClient';
import { socketClient } from '../../../services/socket/socketClient';
import { useAuth } from '../../../services/auth/authContext';
import { resolvePdfUrl } from '../../../services/db/assetStorage';
import { getOrGenerateQuizQuestions, clearQuizSessionQuestions } from '../../../services/db/questionBanks/questionBankEngine.js';
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
  const [examTimeRemaining, setExamTimeRemaining] = useState(null);
  const [attemptsStatus, setAttemptsStatus] = useState(() => {
    try {
      return mockEngine.getQuizAttemptStatus(enrolmentId, queryParamUnitId);
    } catch {
      return { attemptsUsed: 0, attemptsRemaining: 3, maxAttempts: 3, isLocked: false };
    }
  });

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

  const [certRequestModalOpen, setCertRequestModalOpen] = useState(false);
  const [certRequestSubmitted, setCertRequestSubmitted] = useState(false);
  const [certCadetNotes, setCertCadetNotes] = useState('');
  const [hasAcknowledgedExamRules, setHasAcknowledgedExamRules] = useState({});

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
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeUnitId]);

  // =========================================================================
  // Strict Linear Curriculum Progression: Read Module -> Pass Exam -> Unlock Next
  // =========================================================================
  useEffect(() => {
    try {
      localStorage.removeItem('rk_dev_gateway_unlock_all');
    } catch (e) {}
  }, []);

  const isModuleUnlocked = (modIndex) => {
    if (modIndex === 0) return true;
    const completedLessons = currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || [];
    const passedQuizzes = currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || [];
    for (let i = 0; i < modIndex; i++) {
      const prevMod = course?.modules?.[i];
      if (!prevMod) continue;
      const prevLessons = prevMod.lessons || [];
      const allLessonsDone = prevLessons.length === 0 || prevLessons.every((l) =>
        completedLessons.includes(l.id)
      );
      const prevQuizDone = prevMod.quiz
        ? passedQuizzes.includes(prevMod.quiz.id)
        : true;
      const prevModCleared = prevMod.quiz ? (prevQuizDone && allLessonsDone) : allLessonsDone;
      if (!prevModCleared) return false;
    }
    return true;
  };

  const areAllModulesCompleted = () => {
    if (!course || !course.modules) return false;
    const completedLessons = currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || [];
    const passedQuizzes = currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || [];
    return course.modules.every((mod) => {
      const lessonsDone = (mod.lessons || []).every((l) =>
        completedLessons.includes(l.id)
      );
      const quizDone = mod.quiz ? passedQuizzes.includes(mod.quiz.id) : true;
      return quizDone && lessonsDone;
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
    const isFinal = activeUnit?.type === 'final_exam';
    const modNum = activeUnit?.moduleIndex !== undefined ? activeUnit.moduleIndex + 1 : 1;
    const dynamicQuestions = getOrGenerateQuizQuestions(enrolmentId, baseQuiz.id, modNum, isFinal);
    return {
      ...baseQuiz,
      total_questions: dynamicQuestions.length,
      questions: dynamicQuestions
    };
  }, [baseQuiz?.id, activeUnit?.type, activeUnit?.moduleIndex, enrolmentId, quizSessionNonce]);

  const isLessonCompleted = activeLesson
    ? (currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || []).includes(activeLesson.id)
    : false;
  const isQuizPassed = activeQuiz
    ? (currentEnrolment?.passed_quizzes || enrolment?.passed_quizzes || []).includes(activeQuiz.id) || (activeUnit?.type === 'final_exam' && (currentEnrolment?.final_assessment_passed || enrolment?.final_assessment_passed))
    : false;
  const isAssignment = activeLesson?.type === 'assignment';

  const isExamUnit = (activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && !!activeQuiz;
  const isExamRulesAcknowledged = activeQuiz ? !!hasAcknowledgedExamRules[activeQuiz.id] : false;
  const showExamRulesGate = isExamUnit && !isQuizPassed && !quizSubmitted && !isLockoutActive && !isExamRulesAcknowledged;

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
        setQuizResult({
          quizId: activeQuiz.id,
          score: 100,
          totalQuestions: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          correctCount: activeQuiz.questions?.length || (activeUnit?.type === 'final_exam' ? 50 : 20),
          isPassed: true
        });
      } else if (!isQuizPassed) {
        const totalMinutes = activeUnit?.type === 'final_exam' ? 60 : 20;
        setExamTimeRemaining((prev) => (prev !== totalMinutes * 60 ? totalMinutes * 60 : prev));
      }
    }
  }, [activeQuiz?.id, isQuizPassed, activeUnit?.type]);

  useEffect(() => {
    if (!activeQuiz || quizSubmitted || isLockoutActive || examTimeRemaining === null || examTimeRemaining <= 0) return;
    if (!hasAcknowledgedExamRules[activeQuiz.id] && !isQuizPassed) return;

    const timer = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev !== null && prev <= 1) {
          clearInterval(timer);
          setTimeout(() => handleSubmitQuiz(), 0);
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz?.id, quizSubmitted, isLockoutActive, examTimeRemaining === null, hasAcknowledgedExamRules, isQuizPassed]);

  const triggerProctorViolation = (violationType) => {
    if (quizSubmitted || isLockoutActive || !activeQuiz) return;
    if (!hasAcknowledgedExamRules[activeQuiz.id] && !isQuizPassed) return;

    try {
      const targetQuizId = activeQuiz?.id || activeUnit?.id;

      const forfeitResult = mockEngine.forfeitQuizAttempt({
        enrolmentId,
        quizId: targetQuizId,
        reason: `PROCTOR_VIOLATION: ${violationType}`
      });

      if (forfeitResult) {
        setAttemptsStatus(forfeitResult);
        if (forfeitResult.isLocked) {
          setIsLockoutActive(true);
          setLockoutCountdown({
            hours: forfeitResult.remainingHours || 23,
            minutes: forfeitResult.remainingMinutes || 59,
            seconds: 59
          });
          alert('PROCTORING VIOLATION: Tab switch detected during active examination. All 3 evaluation attempts have been exhausted. A 24-hour examination cooldown is now enforced.');
        } else {
          alert(`PROCTORING WARNING: Tab switch detected. 1 attempt has been deducted. You have ${forfeitResult.attemptsRemaining} of 3 attempts remaining.`);
        }
      }
    } catch (e) {
      console.error('Proctoring enforcement error:', e);
    }
  };

  useEffect(() => {
    if (!activeQuiz || quizSubmitted || isLockoutActive) return;
    if (!hasAcknowledgedExamRules[activeQuiz.id] && !isQuizPassed) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerProctorViolation('TAB_SWITCH_ATTEMPT');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activeQuiz?.id, quizSubmitted, isLockoutActive]);

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
      if (event.type === 'ASSIGNMENT_MUTATED' || event.type === 'DB_MUTATED') {
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
      hasAcknowledgedExamRules[activeQuiz.id] &&
      (Object.keys(quizAnswers).length > 0 || (examTimeRemaining !== null && examTimeRemaining < (activeUnit?.type === 'final_exam' ? 3600 : 1200)));

    if (isExamInProgress && unit.id !== activeUnit?.id) {
      const confirmForfeit = window.confirm(
        'EXAMINATION ACTIVE WARNING:\n\nYou are currently in an active examination session.\nIf you exit or switch units before submitting, you will FORFEIT 1 attempt.\n\nAre you sure you want to exit and forfeit this attempt?'
      );
      if (!confirmForfeit) return;

      const targetQuizId = activeQuiz?.id || activeUnit?.id;
      const forfeitResult = mockEngine.forfeitQuizAttempt({
        enrolmentId,
        quizId: targetQuizId,
        reason: 'EXAM_ABANDONED_MIDWAY'
      });

      if (forfeitResult) {
        setAttemptsStatus(forfeitResult);
        if (forfeitResult.isLocked) {
          setIsLockoutActive(true);
          setLockoutCountdown({
            hours: forfeitResult.remainingHours || 23,
            minutes: forfeitResult.remainingMinutes || 59,
            seconds: 59
          });
          alert('All 3 examination attempts have been exhausted (abandoned midway). A 24-hour proctoring cooldown is now actively enforced.');
        } else {
          alert(`Examination attempt forfeited. You now have ${forfeitResult.attemptsRemaining} of 3 attempts remaining.`);
        }
      }
      setQuizAnswers({});
      setExamTimeRemaining(null);
    }

    if (unit.type === 'final_exam') {
      if (!isFinalExamUnlocked) {
        alert('Final Assessment Locked: You must complete all prior course modules and score >= 80% on each knowledge check.');
        return;
      }
    } else if (unit.type === 'quiz' && unit.moduleIndex !== undefined) {
      const targetMod = course?.modules?.[unit.moduleIndex];
      if (targetMod && targetMod.lessons && targetMod.lessons.length > 0) {
        const completedLessons = currentEnrolment?.completed_mandatory_lessons || enrolment?.completed_mandatory_lessons || [];
        const allDone = targetMod.lessons.every((l) => completedLessons.includes(l.id));
        if (!allDone) {
          const completedCount = targetMod.lessons.filter((l) => completedLessons.includes(l.id)).length;
          alert(`Knowledge Check Locked: You must complete all ${targetMod.lessons.length} lessons in ${targetMod.title} (${completedCount}/${targetMod.lessons.length} completed) before attempting the examination.`);
          return;
        }
      }
    } else if (unit.moduleIndex > 0 && !isModuleUnlocked(unit.moduleIndex)) {
      alert(`Module ${unit.moduleIndex + 1} Locked: You must pass the Module ${unit.moduleIndex} Knowledge Check (>= 80%) to unlock.`);
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
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
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

    const refreshedEnrolment = mockEngine.getEnrolment(enrolmentId);
    if (refreshedEnrolment) {
      setCurrentEnrolment({ ...refreshedEnrolment });
    }

    if (isPassed) {
      const currentMod = course?.modules?.find(
        (m) => m.quiz?.id === activeQuiz.id || m.id === activeUnit?.moduleId
      );
      if (currentMod && currentMod.lessons) {
        currentMod.lessons.forEach((l) => {
          mockEngine.recordLessonCompletion(enrolmentId, l.id);
        });
        const refetched = mockEngine.getEnrolment(enrolmentId);
        if (refetched) {
          setCurrentEnrolment({ ...refetched });
        }
      }

      triggerConfetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF7A00', '#FFA439', '#FF7A00', '#FFD700']
      });

      if (activeUnit?.type === 'final_exam') {
        const db = mockEngine.getDb();
        const enr = db.enrolments.find((e) => e.id === enrolmentId);
        if (enr) {
          enr.final_assessment_score = scorePct;
          enr.final_assessment_passed = isPassed;
          mockEngine.saveDb(db);
        }
        setCertRequestModalOpen(true);
      } else {
        const currentModIdx =
          activeUnit?.moduleIndex ??
          course?.modules?.findIndex((m) => m.quiz?.id === activeQuiz.id) ??
          0;
        const totalModules = course?.modules?.length || 0;
        const isLastModule = currentModIdx >= totalModules - 1;

        if (isLastModule) {
          const finalExamUnit = allUnits.find((u) => u.type === 'final_exam');
          setUnlockCelebrationModal({
            isOpen: true,
            type: 'final_round',
            unlockedModuleIndex: null,
            unlockedModuleName: 'Final Comprehensive Certification Assessment (50 MCQs)',
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

    setProgressData(mockEngine.getCourseProgress(enrolmentId));
    refreshBalance();
  };

  const handleRetakeExam = () => {
    const lockCheck = mockEngine.isExamLocked(enrolmentId, activeQuiz?.id);
    if (lockCheck.isLocked) {
      setIsLockoutActive(true);
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
    if (activeQuiz?.id) {
      clearQuizSessionQuestions(enrolmentId, activeQuiz.id);
      setQuizSessionNonce((prev) => prev + 1);
      setHasAcknowledgedExamRules((prev) => ({
        ...prev,
        [activeQuiz.id]: false
      }));
    }
    const totalMinutes = activeUnit?.type === 'final_exam' ? 60 : 20;
    setExamTimeRemaining(totalMinutes * 60);
  };

  const handleAcknowledgeExamRules = () => {
    if (!activeQuiz) return;
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

  const handleSubmitCertificateRequest = async () => {
    try {
      mockEngine.requestCertificate(enrolmentId, certCadetNotes);
      const studentName = currentUser?.name || currentUser?.full_name || 'Cadet Candidate';
      const cadetId = currentUser?.cadet_id || enrolment?.cadet_id || 'RK-UNKNOWN';

      apiClient.requestCertificate({
        enrolment_id: enrolmentId,
        course_id: course?.id,
        user_id: currentUser?.id || enrolment?.user_id,
        cadet_id: cadetId,
        notes: certCadetNotes
      }).catch(console.warn);

      socketClient.emit('certificate:requested', {
        enrolmentId,
        courseId: course?.id,
        courseTitle: course?.title,
        cadetId,
        studentName,
        score: quizResult?.percentage || 90
      });

      setCertRequestSubmitted(true);
      setTimeout(() => {
        setCertRequestModalOpen(false);
      }, 3500);
    } catch (e) {
      alert('Certificate request failed: ' + e.message);
    }
  };

  const isCurrentUnitBookmarked = Boolean(bookmarkedUnits[activeUnit?.id]);

  if (!enrolment || !course) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center px-4 flex items-center justify-center font-lora">
        <div className="max-w-md p-8 rounded-2xl cyber-glass-card border border-[#FF7A00]/30 space-y-4">
          <h2 className="text-xl font-bold text-white">Enrolment Not Found</h2>
          <p className="text-xs text-[#E2D9CE] font-mono">
            Please verify that you are actively enrolled in this training course.
          </p>
          <Link
            to="/student"
            className="px-5 py-2.5 bg-[#FF7A00] rounded-xl text-[#071018] text-xs font-bold font-mono inline-flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Classroom</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#06080C] text-[#F1F5F9] font-lora relative flex flex-col overflow-x-hidden">
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
        onOpenTerminal={() => {
          setIsMacTerminalOpen(true);
          setIsMacTerminalMinimized(false);
        }}
      />

      {/* 3-Panel Dedicated Learning Layout: Panel 1 (Outline) | Panel 2 (Notes & Theory) | Panel 3 (Tool Strip) */}
      <div className="flex-1 flex w-full relative items-start">
        {/* Panel 1: Left Course Outline Sidebar */}
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
        />

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
              activeLesson={activeLesson}
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
            />

            {/* Bottom Prev / Next Navigation Bar */}
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
    </div>
  );
}
