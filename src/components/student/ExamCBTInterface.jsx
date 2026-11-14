import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  LayoutGrid,
  Check,
  AlertCircle,
  X,
  Maximize2,
  Wifi,
  WifiOff,
  ShieldAlert,
  Camera,
  CameraOff
} from 'lucide-react';
import ProctorCameraFeed from './ProctorCameraFeed';
import ExamWatermark from './proctor/ExamWatermark';
import { useAuth } from '../../services/auth/authContext';
import { apiClient } from '../../services/apiClient';

/**
 * RedKross Academy - Enhanced CBT Examination Console
 * Fullscreen Locked, Anti-Cheat 3-Strike Proctoring, Persistent Non-Resetting Timer & Offline Resilience
 */
/**
 * Dedicated isolated countdown component to prevent 1-second interval re-renders
 * from re-rendering the massive parent CBT examination tree.
 */
const ExamCountdownBadge = React.memo(function ExamCountdownBadge({
  deadlineKey,
  isSubmitted,
  isLockoutActive,
  totalSecsFallback,
  onExpire
}) {
  const [remainingTime, setRemainingTime] = useState(() => {
    if (typeof window === 'undefined') return totalSecsFallback;
    const savedDeadline = localStorage.getItem(deadlineKey);
    if (savedDeadline) {
      return Math.max(0, Math.floor((parseInt(savedDeadline, 10) - Date.now()) / 1000));
    }
    const newDeadline = Date.now() + totalSecsFallback * 1000;
    try {
      localStorage.setItem(deadlineKey, String(newDeadline));
    } catch {}
    return totalSecsFallback;
  });

  useEffect(() => {
    if (isSubmitted || isLockoutActive) return;

    const timer = setInterval(() => {
      const savedDeadline = localStorage.getItem(deadlineKey);
      if (!savedDeadline) return;

      const remaining = Math.max(0, Math.floor((parseInt(savedDeadline, 10) - Date.now()) / 1000));
      setRemainingTime(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        if (typeof onExpire === 'function') onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadlineKey, isSubmitted, isLockoutActive, onExpire]);

  const formatTimer = (secs) => {
    if (secs === null || secs === undefined || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingTime < 300;

  return (
    <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/60 border border-[#FF7A00]/30 text-white font-mono">
      <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400 animate-pulse' : 'text-[#FF7A00]'}`} />
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-wider text-[#A3907C]">Time Remaining</span>
        <span className={`text-base font-bold tabular-nums ${isLowTime ? 'text-rose-400 font-extrabold' : 'text-white'}`}>
          {formatTimer(remainingTime)}
        </span>
      </div>
    </div>
  );
});

export default function ExamCBTInterface({
  quiz,
  enrolmentId,
  isFinalExam = false,
  timerSeconds,
  attemptsStatus,
  answers = {},
  onSelectAnswer,
  onSubmitExam,
  onForfeitExam,
  isSubmitting = false,
  isSubmitted = false,
  submissionResult = null,
  onRetakeExam,
  isLockoutActive = false,
  lockoutCountdown = { hours: 0, minutes: 0, seconds: 0 }
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  // ----------------- OFFLINE RESILIENCE -----------------
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingOfflineSubmission, setPendingOfflineSubmission] = useState(false);

  // ----------------- FULLSCREEN & 3-STRIKE TRACKING -----------------
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [strikeModal, setStrikeModal] = useState(null); // { strikeNumber: 1 | 2 | 3, reason: string }
  const [faceAbsentModal, setFaceAbsentModal] = useState(false);
  const [focusStrikes, setFocusStrikes] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const strikeKey = `rk_exam_strikes_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`;
    try {
      return parseInt(localStorage.getItem(strikeKey) || '0', 10);
    } catch {
      return 0;
    }
  });

  // ----------------- PERSISTENT DEADLINE TIMER -----------------
  const deadlineKey = `rk_exam_deadline_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`;
  const bufferKey = `rk_exam_buffer_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`;

  const isFifty = isFinalExam || (quiz?.questions?.length >= 50);
  const defaultSecs = isFifty ? 3600 : 1800; // 50 marks = 60 min (3600s), 20 marks = 30 min (1800s)
  const totalSecsFallback = timerSeconds ?? (quiz?.time_limit_minutes ? quiz.time_limit_minutes * 60 : defaultSecs);

  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = Math.max(0, totalQuestions - attemptedCount);

  // ----------------- HYDRATE BUFFERED ANSWERS -----------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isSubmitted || isLockoutActive) return;
    try {
      const buffered = localStorage.getItem(bufferKey);
      if (buffered && Object.keys(answers).length === 0) {
        const parsed = JSON.parse(buffered);
        if (parsed && typeof parsed === 'object') {
          Object.entries(parsed).forEach(([qId, optId]) => {
            onSelectAnswer(qId, optId);
          });
        }
      }
    } catch {}
  }, [bufferKey, isSubmitted, isLockoutActive]);

  // ----------------- NETWORK MONITORING -----------------
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-submit if there was a pending offline submission
      if (pendingOfflineSubmission) {
        setPendingOfflineSubmission(false);
        onSubmitExam();
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingOfflineSubmission, onSubmitExam]);

  // ----------------- FULLSCREEN MANAGEMENT -----------------
  const checkFullscreen = useCallback(() => {
    const isFs = Boolean(
      document.fullscreenElement ||
      // @ts-ignore
      document.webkitFullscreenElement ||
      // @ts-ignore
      document.mozFullScreenElement ||
      // @ts-ignore
      document.msFullscreenElement
    );
    setIsFullscreen(isFs);
    return isFs;
  }, []);

  const requestFullscreenLock = async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        // @ts-ignore
        await docEl.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
      setStrikeModal(null);

      // Lock Escape and special keys in Chromium browsers to prevent accidental exit
      if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
        navigator.keyboard.lock(['Escape', 'F11', 'F5']).catch(() => {});
      }
    } catch (err) {
      console.warn('[CBT] Fullscreen request prevented:', err);
    }
  };

  const exitFullscreenMode = () => {
    try {
      if (navigator.keyboard && typeof navigator.keyboard.unlock === 'function') {
        navigator.keyboard.unlock();
      }
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}
  };

  // Exit fullscreen when submitted or locked out
  useEffect(() => {
    if (isSubmitted || isLockoutActive) {
      exitFullscreenMode();
    }
  }, [isSubmitted, isLockoutActive]);

  // Request fullscreen immediately on mount if not already locked
  useEffect(() => {
    if (isSubmitted || isLockoutActive) return;
    const isFs = checkFullscreen();
    if (!isFs) {
      requestFullscreenLock();
    }
  }, [checkFullscreen, isSubmitted, isLockoutActive]);

  // ----------------- SYNTHESIZED PROCTOR AUDIO ALERT (MUTED PER USER REQUIREMENT) -----------------
  const playWarningBeep = useCallback(() => {
    // Muted: User explicitly requested no beep-beep sound; visual on-screen modal warning used instead
  }, []);

  // ----------------- PROCTORING EVIDENCE (server) -----------------
  const { currentUser } = useAuth();
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [proctorNotice, setProctorNotice] = useState(null);
  const reportProctor = useCallback(
    (kind, detail, snapshot) => {
      if (!quiz?.session_id) return;
      apiClient
        .request('/proctor', { method: 'POST', body: { session_id: quiz.session_id, kind, detail, snapshot } })
        .catch(() => {});
    },
    [quiz?.session_id]
  );

  // Periodic proctor telemetry heartbeat (Phase 4 anti-cheating)
  useEffect(() => {
    if (!quiz?.session_id || isSubmitted || isLockoutActive) return;
    const sendHeartbeat = () => {
      apiClient
        .request('/proctor', { method: 'POST', body: { session_id: quiz.session_id, kind: 'heartbeat' } })
        .catch(() => {});
    };
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 20000);
    return () => clearInterval(interval);
  }, [quiz?.session_id, isSubmitted, isLockoutActive]);

  // ----------------- PROCTOR FOCUS & VIOLATION DETECTION -----------------
  const strikeReasonsRef = useRef([]);
  const triggerFocusViolation = useCallback((reason, { report = true } = {}) => {
    if (isSubmitted || isLockoutActive) return;
    playWarningBeep();
    if (report) reportProctor('focus', reason);
    strikeReasonsRef.current = [...strikeReasonsRef.current, reason || 'Proctoring rule broken'];

    setFocusStrikes((prev) => {
      const nextStrike = prev + 1;
      const strikeKey = `rk_exam_strikes_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`;
      try {
        localStorage.setItem(strikeKey, String(nextStrike));
      } catch {}

      if (nextStrike >= 3) {
        // Strike 3: Terminate immediately with 24-hour lockout
        setStrikeModal({
          strikeNumber: 3,
          reason: `STRIKE 3 OF 3: ${reason || 'Proctoring rule broken.'} The attempt has been forfeited and a 24-hour lockout applies.`
        });
        exitFullscreenMode();
        // Strike 3: the server forfeits the attempt and applies the 24-hour lock
        setTimeout(() => {
          if (onForfeitExam) onForfeitExam(`THREE_STRIKES: ${strikeReasonsRef.current.slice(-3).join(' | ')}`);
          else onSubmitExam();
        }, 1500);
      } else {
        setStrikeModal({
          strikeNumber: nextStrike,
          reason: nextStrike === 1
            ? `STRIKE 1 OF 3: ${reason || 'Proctoring rule broken.'}`
            : `STRIKE 2 OF 3 - FINAL WARNING: ${reason || 'Proctoring rule broken.'} One more strike forfeits this attempt and locks the exam for 24 hours.`
        });
      }

      return nextStrike;
    });
  }, [isSubmitted, isLockoutActive, enrolmentId, quiz?.id, onSubmitExam, playWarningBeep, reportProctor]);

  // On-device detections from the camera feed
  const handleProctorSignal = useCallback(
    (kind, { detail, snapshot } = {}) => {
      if (isSubmitted || isLockoutActive) return;
      reportProctor(kind, detail, snapshot);
      if (kind === 'phone') {
        triggerFocusViolation('A mobile phone was detected in the camera view. Phones are not allowed during the exam.', { report: false });
      } else if (kind === 'multiple_faces') {
        triggerFocusViolation('Another person was detected in the camera view. The exam must be taken alone.', { report: false });
      } else if (kind === 'looking_away') {
        setProctorNotice('Keep your eyes on the exam screen. Looking away repeatedly is flagged for review.');
        setTimeout(() => setProctorNotice(null), 6000);
      }
    },
    [isSubmitted, isLockoutActive, reportProctor, triggerFocusViolation]
  );

  // ----------------- FACE PRESENCE TELEMETRY & WARNINGS -----------------
  const [faceStatus, setFaceStatus] = useState({
    detected: true,
    status: 'verified',
    absenceSeconds: 0
  });
  const lastBeepRef = useRef(0);

  const handleFaceStatusChange = useCallback((statusData) => {
    if (isSubmitted || isLockoutActive) return;
    setFaceStatus(statusData);

    // If candidate face is absent for >= 1.5 seconds, trigger on-screen visual modal alert (no audio beep)
    if (!statusData.detected && statusData.absenceSeconds >= 1.5) {
      setFaceAbsentModal(true);
    }

    // Prolonged absence >= 10.0 seconds triggers a formal proctor violation strike
    if (!statusData.detected && statusData.absenceSeconds >= 10.0) {
      setFaceAbsentModal(false);
      triggerFocusViolation('Candidate face absent from camera frame for over 10 seconds.');
    }
  }, [isSubmitted, isLockoutActive, triggerFocusViolation]);

  // Trap Browser Navigation & Back Button
  useEffect(() => {
    if (isSubmitted || isLockoutActive) return;

    window.history.pushState({ rk_exam_lock: true }, '', window.location.href);

    const handlePopState = () => {
      window.history.pushState({ rk_exam_lock: true }, '', window.location.href);
      triggerFocusViolation('Attempted browser back/forward navigation during active exam.');
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Examination session is in progress. Leaving will forfeit your attempt.';
      return e.returnValue;
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Hardened Keyboard & Context Menu Anti-Escape Trap
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      // Prevent F11 (browser fullscreen toggle)
      if (e.key === 'F11') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent F5, Ctrl+R, Cmd+R (reload)
      if (e.key === 'F5' || ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        e.stopPropagation();
        triggerFocusViolation('Browser reload command intercepted.');
        return false;
      }

      // Prevent DevTools shortcuts: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerFocusViolation('Developer tools / source code inspection command intercepted.');
        return false;
      }

      // Prevent Print (Ctrl+P) and Save (Ctrl+S)
      if ((e.ctrlKey || e.metaKey) && ['p', 'P', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Escape key exit
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        triggerFocusViolation('Escape key intercepted. Fullscreen must be maintained.');
        return false;
      }

      // Prevent Back navigation via Alt+Left or Backspace outside text fields
      if (
        (e.altKey && e.key === 'ArrowLeft') ||
        (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(e.target?.tagName))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleCopyCut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('copy', handleCopyCut, true);
    window.addEventListener('cut', handleCopyCut, true);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('copy', handleCopyCut, true);
      window.removeEventListener('cut', handleCopyCut, true);
    };
  }, [isSubmitted, isLockoutActive, triggerFocusViolation]);

  useEffect(() => {
    if (isSubmitted || isLockoutActive) return;

    const handleFullscreenChange = () => {
      const isFs = checkFullscreen();
      if (!isFs) {
        triggerFocusViolation('Fullscreen mode was exited.');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerFocusViolation('Browser tab was switched or window was minimized.');
      }
    };

    const handleWindowBlur = () => {
      triggerFocusViolation('Window lost focus or application switched.');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    checkFullscreen();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isSubmitted, isLockoutActive, checkFullscreen, triggerFocusViolation]);

  const handleTimerExpired = useCallback(() => {
    exitFullscreenMode();
    onSubmitExam();
  }, [exitFullscreenMode, onSubmitExam]);

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const firstUnanswered = questions.findIndex((q) => !answers[q.id]);
      if (firstUnanswered !== -1 && firstUnanswered !== currentQuestionIndex) {
        setCurrentQuestionIndex(firstUnanswered);
      } else {
        setShowSubmitConfirmModal(true);
      }
    }
  };

  const handleSelectOption = (optionId) => {
    if (isSubmitted || isLockoutActive) return;
    if (currentQuestion) {
      onSelectAnswer(currentQuestion.id, optionId);
      // Real-time offline answer buffer
      try {
        const currentBuf = JSON.parse(localStorage.getItem(bufferKey) || '{}');
        currentBuf[currentQuestion.id] = optionId;
        localStorage.setItem(bufferKey, JSON.stringify(currentBuf));
      } catch {}
    }
  };

  const handleInternalSubmit = () => {
    setShowSubmitConfirmModal(false);
    if (!isOnline) {
      setPendingOfflineSubmission(true);
      return;
    }
    // Clean up persistent exam keys on successful submission
    try {
      localStorage.removeItem(deadlineKey);
      localStorage.removeItem(bufferKey);
      localStorage.removeItem(`rk_exam_strikes_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`);
    } catch {}
    exitFullscreenMode();
    onSubmitExam();
  };

  const handleInternalRetake = () => {
    try {
      localStorage.removeItem(deadlineKey);
      localStorage.removeItem(bufferKey);
      localStorage.removeItem(`rk_exam_strikes_${enrolmentId || 'cadet'}_${quiz?.id || 'exam'}`);
    } catch {}
    if (onRetakeExam) {
      onRetakeExam();
    }
  };

  const attemptsRemaining = attemptsStatus?.attemptsRemaining ?? 3;
  const attemptsUsed = attemptsStatus?.attemptsUsed ?? 0;

  const getAttemptBadge = () => {
    if (isLockoutActive || attemptsRemaining === 0) {
      return {
        label: '0 OF 3 ATTEMPTS REMAINING (24H LOCK)',
        className: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      };
    }
    if (attemptsRemaining === 1) {
      return {
        label: '1 OF 3 ATTEMPTS REMAINING (FINAL TRY)',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      };
    }
    if (attemptsRemaining === 2) {
      return {
        label: '2 OF 3 ATTEMPTS REMAINING',
        className: 'bg-[#FFA439]/20 text-[#FFA439] border-[#FFA439]/40'
      };
    }
    return {
      label: '3 OF 3 ATTEMPTS REMAINING',
      className: 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30'
    };
  };

  const attemptBadge = getAttemptBadge();

  // ----------------- 24-HOUR LOCKOUT SCREEN -----------------
  if (isLockoutActive || (attemptsRemaining === 0 && !isSubmitted)) {
    return (
      <div className="w-full p-6 sm:p-8 rounded-2xl bg-rose-950/70 border border-rose-500/50 space-y-5 shadow-2xl animate-fade-in">
        <div className="flex items-center space-x-3.5 text-rose-400">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
          <div className="min-w-0">
            <h3 className="text-xl font-bold font-lora text-white">24-Hour Examination Lockout Enforced</h3>
            <p className="text-xs font-mono text-rose-300 truncate">
              {attemptsRemaining === 0
                ? 'All 3 evaluation attempts have been exhausted for this 24-hour cycle.'
                : 'Security Protocol Enforced: Multiple anti-cheat proctor violations or tab switches intercepted.'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/60 border border-rose-500/30 text-xs font-mono text-rose-200 space-y-3">
          <p className="leading-relaxed">
            As mandated by the Academy Charter, you must wait 24 hours before a fresh evaluation window opens with 3 renewed attempts.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <span className="text-sm font-bold text-white">Next Evaluation Window Unlocks In:</span>
            <span className="px-4 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 text-base font-bold font-mono tabular-nums inline-block">
              {lockoutCountdown.hours}h {lockoutCountdown.minutes}m remaining
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
          <span>Security Protocol: STRICT_24H_COOLDOWN</span>
          <span className="text-[#FF7A00]">Automatic Reset after 24h</span>
        </div>
      </div>
    );
  }

  // ----------------- RESULTS & RATIONALES SCREEN -----------------
  if (isSubmitted && submissionResult) {
    const isPassed = submissionResult.isPassed || submissionResult.is_passed;
    const scorePct = submissionResult.score ?? submissionResult.score_percentage ?? 0;
    const passingScore = quiz?.passing_score || 80;

    return (
      <div className="w-full space-y-8 animate-fade-in">
        {/* Top Score Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border shadow-2xl relative overflow-hidden ${
            isPassed
              ? 'bg-[#1A1208]/90 border-[#FF7A00]/50 text-white'
              : 'bg-rose-950/80 border-rose-500/50 text-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                  isPassed
                    ? 'bg-[#FF7A00]/20 border-[#FF7A00] text-[#FF7A00]'
                    : 'bg-rose-500/20 border-rose-500 text-rose-400'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider block opacity-80">
                  Evaluation Performance Report
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-lora">
                  {isPassed ? 'Operational Standard Met (Passed)' : 'Passing Threshold Not Reached'}
                </h3>
                <p className="text-xs font-mono mt-1 opacity-90 leading-relaxed">
                  {isPassed
                    ? 'Congratulations! You have verified operational competence for this curriculum milestone.'
                    : `Required standard: ${passingScore}% passing score. Correct answers are shown once you pass - revisit the topics below before your next attempt.`}
                </p>
              </div>
            </div>

            {/* Score Metric Ring */}
            <div className="text-center sm:text-right flex-shrink-0">
              <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums tracking-tight">
                {scorePct}%
              </div>
              <span className="text-xs font-mono opacity-80 block mt-1">
                Threshold: {passingScore}% Minimum
              </span>
            </div>
          </div>

          {/* Window Status & Retake CTA */}
          <div className="mt-6 pt-5 border-t border-current/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="opacity-70">Window Status:</span>
              <span className={`px-2.5 py-1 rounded-full font-bold border ${attemptBadge.className}`}>
                {isPassed ? 'PASSED (UNLOCKED)' : attemptBadge.label}
              </span>
            </div>

            {!isPassed && (
              <div>
                {attemptsRemaining > 0 ? (
                  <button
                    type="button"
                    onClick={handleInternalRetake}
                    className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(255,122,0,0.4)] flex items-center space-x-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Evaluation (New Randomized Question Set)</span>
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                    0 Attempts Left • 24-Hour Cooldown Enforced
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {!isPassed && Array.isArray(submissionResult.topicsToReview) && submissionResult.topicsToReview.length > 0 && (
          <div className="p-5 rounded-xl border border-[#FF7A00]/30 bg-black/50 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#FFA439]">Topics to revisit</h4>
            <ul className="list-disc pl-5 text-sm text-slate-200 space-y-1">
              {submissionResult.topicsToReview.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Question Explanations */}
        <div className="space-y-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-[#A3907C] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FF7A00]" />
            <span>Technical Review & Correct Option Explanations ({totalQuestions} Questions)</span>
          </h4>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedOptId = answers[q.id];
              const correctOpt = q.options?.find((opt) => opt.is_correct);
              // server-graded result when available; answers are only revealed after a pass
              const isCorrect = typeof q.is_answer_correct === 'boolean'
                ? q.is_answer_correct
                : Boolean(selectedOptId && correctOpt && selectedOptId === correctOpt.id);

              return (
                <div
                  key={q.id || idx}
                  className={`p-5 rounded-xl border text-xs space-y-3 ${
                    isCorrect
                      ? 'bg-[#1A1208]/50 border-[#FF7A00]/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-white text-sm font-lora">
                      {idx + 1}. {q.text || q.question}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase flex-shrink-0 ${
                        isCorrect
                          ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {(q.options || []).map((opt) => {
                      const isThisSelected = selectedOptId === opt.id;
                      const isThisCorrect = opt.is_correct;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-lg border flex items-center justify-between text-xs font-mono ${
                            isThisCorrect
                              ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-white font-bold'
                              : isThisSelected
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                              : 'bg-black/40 border-white/5 text-gray-400'
                          }`}
                        >
                          <span className="flex-1 pr-2">{opt.text}</span>
                          {isThisCorrect && (
                            <span className="text-[10px] text-[#FFA439] uppercase font-bold flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" /> Correct Key
                            </span>
                          )}
                          {isThisSelected && !isThisCorrect && (
                            <span className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1">
                              <X className="w-3 h-3 stroke-[3]" /> Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Technical Rationale */}
                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-gray-300">
                      <strong className="text-[#FF7A00] block mb-0.5">Authoritative Explanation:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ----------------- ACTIVE CBT EXAM VIEW -----------------
  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto p-4 sm:p-6 lg:p-8 select-none flex flex-col space-y-4">
      {/* ----------------- OFFLINE RESILIENCE BANNER ----------------- */}
      {!isOnline && (
        <div className="w-full p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-between text-xs font-mono text-amber-300 animate-pulse">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>NETWORK DISCONNECTED:</strong> Offline Defense Active. Your answers are buffered locally in real time. Do not close or refresh your tab.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-black/50 text-[10px] font-bold">OFFLINE SAFE</span>
        </div>
      )}

      {/* ----------------- FACE ABSENCE ON-SCREEN WARNING MODAL ----------------- */}
      {faceAbsentModal && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn select-none">
          <div className="max-w-md w-full rounded-2xl bg-[#0E0C09] border-2 border-rose-500 p-6 sm:p-8 space-y-5 text-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 mx-auto animate-bounce">
              <CameraOff className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono uppercase font-bold tracking-widest inline-block">
                PROCTOR SECURITY ALERT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-lora text-white">
                Face Missing from Camera View
              </h3>
              <p className="text-xs font-mono text-rose-200/90 leading-relaxed font-bold">
                Aap camera se hat gaye hain! Kripya turant camera ke samne aakar center me baithein.
              </p>
              <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                Candidate presence must remain verified throughout the assessment. Continuous camera presence is strictly enforced.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 text-xs font-mono flex items-center justify-between text-slate-300">
              <span>Proctoring Status:</span>
              <span className={`font-bold uppercase ${faceStatus.detected ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                {faceStatus.detected ? 'Face Detected' : 'Candidate Missing'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setFaceAbsentModal(false);
                requestFullscreenLock();
              }}
              className="w-full py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all cursor-pointer"
            >
              I Understand & Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* ----------------- FULLSCREEN LOCKDOWN OVERLAY IF NOT FULLSCREEN ----------------- */}
      {!isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
          <div className="max-w-md w-full rounded-2xl bg-[#0E0C09] border-2 border-rose-500/80 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(244,63,94,0.35)] text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-500 mx-auto animate-bounce">
              <ShieldAlert className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono uppercase font-bold tracking-widest inline-block">
                EXAM LOCKDOWN MANDATE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-lora text-white">
                Fullscreen Mode Required
              </h3>
              <p className="text-xs font-mono text-rose-200/90 leading-relaxed">
                Academic integrity protocols require the examination interface to occupy the entire screen. Navigation outside fullscreen is strictly prohibited.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 text-xs font-mono flex items-center justify-between text-slate-300">
              <span>Recorded Focus Strikes:</span>
              <span className="font-bold text-amber-400">{focusStrikes} of 3</span>
            </div>

            <button
              type="button"
              onClick={requestFullscreenLock}
              className="w-full py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-sm font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(255,122,0,0.4)] cursor-pointer flex items-center justify-center space-x-2"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Resume Fullscreen Exam</span>
            </button>
          </div>
        </div>
      )}

      {/* ----------------- 3-STRIKE WARNING MODAL ----------------- */}
      {strikeModal && (
        <div className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-md w-full rounded-2xl bg-black border-2 border-rose-500/70 p-6 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono uppercase font-bold tracking-wider inline-block">
                ANTI-CHEAT PROCTOR ALERT
              </span>
              <h3 className="text-xl font-bold font-lora text-white">
                Proctor Violation Intercepted
              </h3>
              <p className="text-xs font-mono text-rose-200 leading-relaxed">
                {strikeModal.reason}
              </p>
            </div>

            {strikeModal.strikeNumber < 3 ? (
              <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/30 text-xs font-mono space-y-1">
                <div className="text-white font-bold">
                  Strike {strikeModal.strikeNumber} of 3 Recorded
                </div>
                <div className="text-rose-400 text-[11px]">
                  {3 - strikeModal.strikeNumber} strike(s) remaining before automatic 24-hour ban.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-xs font-mono text-rose-300 font-bold">
                MANDATORY 24-HOUR COOLDOWN APPLIED
              </div>
            )}

            {strikeModal.strikeNumber < 3 && (
              <button
                type="button"
                onClick={requestFullscreenLock}
                className="w-full py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-xs font-mono transition-all cursor-pointer shadow-lg"
              >
                Return to Fullscreen Exam
              </button>
            )}
          </div>
        </div>
      )}

      {/* ----------------- PROCTOR HUD: FACE ABSENCE WARNING ----------------- */}
      {!faceStatus.detected && faceStatus.absenceSeconds >= 1.5 && (
        <div className="w-full p-4 rounded-2xl bg-rose-950/95 border-2 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.45)] flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 flex-shrink-0 animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>PROCTOR ALERT: CANDIDATE FACE ABSENT</span>
                <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px]">
                  {faceStatus.absenceSeconds}s
                </span>
              </div>
              <p className="text-xs font-mono text-rose-200 mt-0.5 leading-relaxed">
                Your face is not detected in the center camera reticle. Please face the webcam immediately. Sustained absence ({'>'}8s) will trigger an automatic Proctor Violation Strike!
              </p>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-rose-900/60 border border-rose-500 text-rose-200 text-xs font-mono font-bold whitespace-nowrap">
            ALIGN FACE NOW
          </div>
        </div>
      )}

      {/* ----------------- CBT EXAM CONSOLE (TOP TELEMETRY BAR) ----------------- */}
      <div className="w-full p-4 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Left: Exam Title & Total Questions */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3907C] block">
              {isFinalExam ? 'Comprehensive Final Assessment' : 'Curriculum Evaluation'}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-lora text-white truncate">
              {quiz?.title || 'Certification Assessment'}
            </h3>
          </div>
        </div>

        {/* Center: Live Epoch Countdown Timer (Isolated to prevent parent CBT tree re-renders) */}
        <div className="flex items-center gap-3">
          <ExamCountdownBadge
            deadlineKey={deadlineKey}
            isSubmitted={isSubmitted}
            isLockoutActive={isLockoutActive}
            totalSecsFallback={totalSecsFallback}
            onExpire={handleTimerExpired}
          />

          {/* Attempts Badge */}
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border hidden lg:inline-block ${attemptBadge.className}`}>
            {attemptBadge.label}
          </span>
        </div>

        {/* Right: Embedded Live Proctor Camera Feed */}
        <div className="flex items-center gap-3">
          <ProctorCameraFeed
            isActive={!isSubmitted && !isLockoutActive}
            onFaceStatusChange={handleFaceStatusChange}
            onSignal={handleProctorSignal}
            onPhoneVisibleChange={setPhoneVisible}
            onFaceAbsentWarning={(duration) => {
              if (duration >= 8.0) {
                triggerFocusViolation('Candidate face absent from camera frame for over 8 seconds.');
              }
            }}
          />
        </div>
      </div>

      {/* ----------------- MAIN QUESTION STAGE ----------------- */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Question Prompt & Option Cards */}
        <div className="lg:col-span-8 space-y-5">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/20 space-y-6 shadow-xl">
            <ExamWatermark name={currentUser?.full_name} cadetId={currentUser?.cadet_id} sessionId={quiz?.session_id} />
            {phoneVisible && !isSubmitted && (
              <div className="absolute inset-0 z-20 rounded-2xl bg-black/70 backdrop-blur-xl flex items-center justify-center p-6 text-center">
                <div className="space-y-2">
                  <ShieldAlert className="w-8 h-8 text-rose-400 mx-auto" />
                  <p className="text-sm font-semibold text-rose-200">Phone detected</p>
                  <p className="text-xs text-slate-300">Questions are hidden while a phone is in view. Put it away to continue.</p>
                </div>
              </div>
            )}
            {proctorNotice && (
              <div className="relative z-30 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
                {proctorNotice}
              </div>
            )}
            {/* Question Index & Category */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#A3907C]">
                Question <strong className="text-white text-sm">{currentQuestionIndex + 1}</strong> of {totalQuestions}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-[#FF7A00] border border-[#FF7A00]/30 font-bold uppercase">
                  {currentQuestion?.difficulty || 'Medium'}
                </span>
                <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                  {currentQuestion?.topic || 'Cyber Defense'}
                </span>
              </div>
            </div>

            {/* Question Statement */}
            <h4 className="text-base sm:text-lg font-lora font-medium text-white leading-relaxed">
              {currentQuestion?.text || currentQuestion?.question || 'Question Statement'}
            </h4>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {(currentQuestion?.options || []).map((opt, optIdx) => {
                const isSelected = answers[currentQuestion?.id] === opt.id;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={opt.id || optIdx}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-mono flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF7A00] text-black font-bold border-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.3)] scale-[1.01]'
                        : 'bg-black/50 text-slate-200 border-white/10 hover:border-[#FF7A00]/50 hover:bg-black/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${
                          isSelected
                            ? 'bg-black text-[#FF7A00] border-black'
                            : 'bg-white/5 text-[#A3907C] border-white/10'
                        }`}
                      >
                        {letter}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-black bg-black'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav: Prev, Question Palette Toggle, Next / Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black text-gray-300 border border-white/10 text-xs font-mono transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Mobile Question Palette Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(true)}
                className="lg:hidden px-3 py-2 rounded-xl bg-[#1A1208] text-[#FF7A00] border border-[#FF7A00]/30 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Palette ({attemptedCount}/{totalQuestions})</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{currentQuestionIndex === totalQuestions - 1 ? 'Review & Submit' : 'Next Question'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Desktop Question Matrix Navigation Palette */}
        <div className="hidden lg:block lg:col-span-4 p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/20 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A3907C] font-bold flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-[#FF7A00]" />
              Question Palette
            </span>
            <span className="text-xs font-mono text-white">
              {attemptedCount} / {totalQuestions}
            </span>
          </div>

          {/* Palette Legend */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pb-1">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#FF7A00]" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-950 border border-rose-500/50" />
              <span>Unanswered</span>
            </div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto custom-scrollbar p-1">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id || idx}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border ${
                    isCurrent
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 z-10'
                      : ''
                  } ${
                    isAnswered
                      ? 'bg-[#FF7A00] text-black border-[#FF7A00] shadow-sm'
                      : 'bg-rose-950/70 text-rose-300 border-rose-500/40 hover:bg-rose-900/50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Submit Exam Button */}
          <button
            type="button"
            onClick={() => setShowSubmitConfirmModal(true)}
            className="w-full py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,122,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : isFinalExam ? `Final Submit & Finish (${totalQuestions} Marks)` : 'Final Submit & Finish Exam'}</span>
          </button>
        </div>
      </div>

      {/* ----------------- MOBILE PALETTE DRAWER ----------------- */}
      {mobilePaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex flex-col justify-end">
          <div className="p-6 rounded-t-3xl bg-[#0E0C09] border-t border-[#FF7A00]/40 max-h-[75vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-mono text-white font-bold">Question Palette</span>
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 overflow-y-auto custom-scrollbar p-1">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id || idx}
                    type="button"
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setMobilePaletteOpen(false);
                    }}
                    className={`h-10 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border ${
                      isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                    } ${
                      isAnswered
                        ? 'bg-[#FF7A00] text-black border-[#FF7A00]'
                        : 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobilePaletteOpen(false);
                setShowSubmitConfirmModal(true);
              }}
              className="w-full py-3 rounded-xl bg-[#FF7A00] text-black font-bold text-xs font-mono tracking-wider cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : isFinalExam ? `Final Submit & Finish (${totalQuestions} Marks)` : 'Final Submit & Finish Exam'}
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SUBMISSION CONFIRMATION MODAL ----------------- */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-black border border-[#FF7A00]/50 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center space-x-3 text-[#FF7A00]">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Award className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-bold font-lora text-white">Confirm Assessment Submission</h4>
                <p className="text-xs font-mono text-[#A3907C]">Verification & Grading Protocol</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1208] border border-[#FF7A00]/20 text-xs font-mono space-y-2">
              <div className="flex justify-between text-white">
                <span>Total Questions:</span>
                <span className="font-bold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-[#FF7A00]">
                <span>Attempted (Amber):</span>
                <span className="font-bold">{attemptedCount}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Not Attempted (Red):</span>
                <span className="font-bold">{unattemptedCount}</span>
              </div>
              <div className="flex justify-between text-amber-300 pt-1 border-t border-[#FF7A00]/15">
                <span>Attempt Deduction:</span>
                <span className="font-bold">Uses 1 of {attemptsRemaining} attempts</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Warning: You have {unattemptedCount} unanswered question(s). Unanswered questions count as 0 points.</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black text-gray-300 border border-gray-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Back to Questions
              </button>
              <button
                type="button"
                onClick={handleInternalSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(255,122,0,0.4)] cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : isFinalExam ? `Final Submit & Finish (${totalQuestions} Marks)` : 'Final Submit & Finish Exam'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- OFFLINE PENDING SUBMISSION MODAL ----------------- */}
      {pendingOfflineSubmission && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-black border border-amber-500/60 p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 mx-auto">
              <WifiOff className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="text-lg font-bold font-lora text-white">Responses Buffered Offline</h4>
            <p className="text-xs font-mono text-amber-200 leading-relaxed">
              Your exam answers have been safely encrypted and stored in local cache. As soon as your internet connection is restored, this assessment will automatically finalize with the registry.
            </p>
            <div className="text-[10px] font-mono text-slate-400">
              Do not clear browser storage or close this tab.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
