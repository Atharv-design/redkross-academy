import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Shield,
  Coins,
  ChevronLeft,
  ArrowRight,
  RefreshCw,
  Lock,
  Sparkles,
  Camera,
  CameraOff,
  Eye,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function QuizAssessmentPage() {
  const { enrolmentId, quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser, refreshBalance } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;

  // Find quiz metadata
  let quizMeta = null;
  if (course && course.modules) {
    for (const mod of course.modules) {
      if (mod.quiz && mod.quiz.id === quizId) {
        quizMeta = mod.quiz;
        break;
      }
    }
  }

  // Pre-exam protocol modal state
  const [showPreExamModal, setShowPreExamModal] = useState(false);
  const [cameraWarningModal, setCameraWarningModal] = useState(null); // { message: string }
  const [cameraDropCount, setCameraDropCount] = useState(0);

  // Exam runtime states
  const [activeAttempt, setActiveAttempt] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins
  const [timerPaused, setTimerPaused] = useState(false);

  // Camera video stream ref
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 24-Hour Lockout State
  const [lockoutState, setLockoutState] = useState({ isLocked: false, remainingHours: 0, remainingMinutes: 0 });
  const [countdownString, setCountdownString] = useState('');

  // Refresh lockout check
  const checkLockout = () => {
    if (enrolmentId && quizId) {
      const lock = mockEngine.isExamLocked(enrolmentId, quizId);
      setLockoutState(lock);
      return lock;
    }
    return { isLocked: false };
  };

  useEffect(() => {
    checkLockout();
  }, [enrolmentId, quizId]);

  // Live countdown timer for 24-hour lockout
  useEffect(() => {
    if (!lockoutState.isLocked || !lockoutState.lockedUntil) return;

    const interval = setInterval(() => {
      const lockTime = new Date(lockoutState.lockedUntil).getTime();
      const now = Date.now();
      const remainingMs = lockTime - now;

      if (remainingMs <= 0) {
        clearInterval(interval);
        checkLockout();
      } else {
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        setCountdownString(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutState]);

  // Exam Countdown Timer
  useEffect(() => {
    if (!examStarted || timerPaused || submissionResult) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timerPaused, submissionResult]);

  // Cleanup camera stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // Termination handler for proctor violations
  const terminateExamWithLockout = (violationType, details) => {
    setExamStarted(false);
    stopCameraStream();

    const result = mockEngine.recordProctorViolation({
      enrolmentId,
      quizId,
      attemptId: activeAttempt?.id,
      cadetId: currentUser?.cadet_id || 'RK-89421',
      studentName: currentUser?.full_name || 'Cadet Operator',
      violationType,
      details
    });

    setSubmissionResult({
      score_percentage: 0,
      is_passed: false,
      terminated: true,
      termination_reason: violationType,
      details
    });

    checkLockout();
    refreshBalance();
  };

  // Rule 2: Strict Tab Switching & Window Blur Enforcement
  useEffect(() => {
    if (!examStarted || submissionResult) return;

    const handleTabViolation = () => {
      if (!examStarted || submissionResult) return;
      terminateExamWithLockout(
        'TAB_SWITCH_BLUR',
        'Cadet switched browser tab, minimized the window, or lost focus during proctored assessment. Exam terminated immediately.'
      );
    };

    window.addEventListener('blur', handleTabViolation);
    const handleVisibility = () => {
      if (document.hidden) {
        handleTabViolation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('blur', handleTabViolation);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [examStarted, submissionResult, activeAttempt]);

  // Rule 1: Camera Disconnect Monitoring (1 warning, second disconnect terminates)
  const handleCameraInterruption = () => {
    if (!examStarted || submissionResult) return;

    const nextCount = cameraDropCount + 1;
    setCameraDropCount(nextCount);

    if (nextCount === 1) {
      // First disconnect: Warning
      setTimerPaused(true);
      setCameraWarningModal({
        title: 'CAMERA FEED DISCONNECTED — WARNING 1 OF 2',
        message: 'Your proctored camera stream was interrupted. You must keep your camera ON at all times. If your camera turns off one more time, your exam will be IMMEDIATELY TERMINATED with a mandatory 24-Hour Lockout.'
      });
    } else {
      // Second disconnect: Immediate Termination + 24h Lockout
      setCameraWarningModal(null);
      terminateExamWithLockout(
        'CAMERA_DISCONNECT_X2',
        'Camera stream was disconnected twice during examination. Session terminated and 24-hour lockout applied.'
      );
    }
  };

  // Start exam and initialize camera stream
  const initializeCameraAndStart = async () => {
    setShowPreExamModal(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' },
        audio: false
      });

      streamRef.current = stream;

      // Monitor camera tracks for ending
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          handleCameraInterruption();
        };
        videoTrack.onmute = () => {
          handleCameraInterruption();
        };
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Initialize attempt in state
      const attempt = mockEngine.startQuizAttempt(enrolmentId, quizId);
      setActiveAttempt(attempt);
      setExamStarted(true);
      setTimerPaused(false);
      setSubmissionResult(null);
      setUserAnswers({});
      setCameraDropCount(0);
    } catch (err) {
      console.warn('Webcam permission not granted or device missing:', err);
      // Fallback: If hardware camera is blocked by browser policy, prompt user
      alert('Camera access is strictly required to launch this proctored examination. Please grant camera permission.');
      setShowPreExamModal(true);
    }
  };

  const resumeCameraAfterWarning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => handleCameraInterruption();
      }
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraWarningModal(null);
      setTimerPaused(false);
    } catch (e) {
      alert('Unable to reactivate camera. Exam will be terminated if camera is not active.');
      terminateExamWithLockout('CAMERA_DISCONNECT_X2', 'Failed to re-establish camera feed after warning.');
    }
  };

  const handleSelectOption = (questionId, optionId) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (!activeAttempt) return;

    try {
      stopCameraStream();
      const result = mockEngine.submitQuizAttempt(
        activeAttempt.id,
        userAnswers,
        quizMeta.questions,
        quizMeta.passing_score,
        quizMeta.token_bounty
      );

      setSubmissionResult(result);
      setExamStarted(false);
      refreshBalance();
      checkLockout();

      if (result.is_passed) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      alert(e.message);
    }
  };

  if (!enrolment || !course || !quizMeta) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Quiz Not Found</h2>
        <Link to={`/student/learn/${enrolmentId}`} className="px-4 py-2 bg-redkross-600 rounded text-white text-xs font-semibold">
          Return to Classroom
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071018] py-12 relative">
      {/* Floating Real-Time Proctoring HUD (Camera Feed) */}
      {examStarted && !submissionResult && (
        <div className="fixed top-20 right-6 z-40 flex flex-col items-end space-y-2 pointer-events-none">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#65F58A]/50 shadow-[0_0_30px_rgba(101,245,138,0.25)] bg-black w-44 h-32">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />
            <div className="absolute top-2 left-2 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#65F58A]/40 text-[9px] font-mono text-[#65F58A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-ping" />
              <span>LIVE PROCTOR</span>
            </div>
            {cameraDropCount > 0 && (
              <div className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded bg-amber-500/80 text-black text-[9px] font-mono font-bold">
                WARNED (1/2)
              </div>
            )}
          </div>
          <div className="text-[10px] font-mono text-slate-400 bg-[#101923]/90 px-2 py-1 rounded-md border border-[#263440]">
            DO NOT SWITCH TABS OR COVER CAMERA
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to={`/student/learn/${enrolmentId}`}
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Classroom</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-400">Course:</span>
            <span className="text-white font-semibold">{course.title}</span>
          </div>
        </div>

        {/* 24-HOUR STRICT PROCTOR LOCKOUT SCREEN */}
        {lockoutState.isLocked ? (
          <div className="bg-surface-card border-2 border-red-500/50 rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto">
              <Lock className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-mono uppercase font-bold tracking-wider inline-block">
                EXAM TERMINATED — MANDATORY 24-HOUR LOCKOUT ACTIVE
              </div>
              <h2 className="text-2xl font-royal font-bold text-white">Evaluation Session Suspended</h2>
              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                As mandated by the Academy Charter, an anti-cheat proctor rule violation (such as tab switching or camera disconnect) enforces a strict 24-hour lockout. Even if retake attempts remain, access is completely blocked until the countdown elapses.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#071018] max-w-sm mx-auto border border-red-500/30 space-y-1">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Unlocks In</div>
              <div className="text-3xl font-bold text-red-400 font-mono tracking-widest tabular-nums">
                {countdownString || '23:59:59'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Hours : Minutes : Seconds</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={`/student/learn/${enrolmentId}`}
                className="px-6 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-slate-200 text-xs font-semibold"
              >
                Return to Course Lessons
              </Link>
              <Link
                to="/student"
                className="px-6 py-2.5 rounded-xl bg-redkross-600/20 hover:bg-redkross-600/30 border border-redkross-500/40 text-redkross-300 text-xs font-semibold"
              >
                Student Operator Portal
              </Link>
            </div>
          </div>
        ) : !examStarted ? (
          /* PRE-EXAM BRIEFING & ATTEMPTS CARD */
          <div className="bg-surface-card border border-surface-border rounded-xl p-8 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-surface-border">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{quizMeta.title}</h1>
                <div className="text-xs text-slate-400 font-mono">
                  {quizMeta.questions.length} Questions • {quizMeta.passing_score}% Passing Threshold
                </div>
              </div>
            </div>

            {/* Evaluation Window Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Proctor Status</div>
                <div className="text-sm font-bold text-[#65F58A]">Webcam Enforced</div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Focus Policy</div>
                <div className="text-sm font-bold text-amber-400">Strict Single-Tab</div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Reward Bounty</div>
                <div className="text-sm font-bold text-amber-400 flex items-center space-x-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>+{quizMeta.token_bounty} Tokens</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPreExamModal(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-redkross-600 to-red-500 hover:from-redkross-700 hover:to-red-600 text-white font-royal font-bold text-sm transition-all shadow-lg hover:cyber-glow-red flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Review Proctor Rules & Launch Exam</span>
            </button>
          </div>
        ) : submissionResult ? (
          /* EVALUATION RESULTS & REMEDIATION */
          <div className="bg-surface-card border border-surface-border rounded-xl p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              {submissionResult.is_passed ? (
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
                  <XCircle className="w-8 h-8" />
                </div>
              )}

              <h2 className="text-2xl font-bold text-white">
                {submissionResult.is_passed ? 'Evaluation Passed!' : 'Evaluation Did Not Meet Passing Standard'}
              </h2>
              <div className="text-sm font-mono text-slate-300">
                Score Achieved: <span className="font-bold text-white text-lg">{submissionResult.score_percentage}%</span> (Passing Required: {quizMeta.passing_score}%)
              </div>
            </div>

            {/* Questions Remediation Review */}
            <div className="space-y-4 pt-4 border-t border-surface-border">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Question Review & Remediation Explanations
              </h3>

              {quizMeta.questions.map((q, idx) => {
                const selectedOptId = userAnswers[q.id];
                const correctOpt = q.options.find((opt) => opt.is_correct);
                const isCorrect = selectedOptId === correctOpt?.id;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-rose-950/10 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-white">
                        {idx + 1}. {q.text}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold flex-shrink-0">
                          + {q.points} Pts Correct
                        </span>
                      ) : (
                        <span className="text-rose-400 font-mono text-[10px] uppercase font-bold flex-shrink-0">
                          Incorrect
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded bg-black/40 text-[11px] font-mono text-slate-300">
                      <strong>Remediation Note:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <Link
                to={`/student/learn/${enrolmentId}`}
                className="px-6 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-white text-xs font-semibold"
              >
                Back to Course Lessons
              </Link>
            </div>
          </div>
        ) : (
          /* ACTIVE EXAM CONTAINER */
          <div className="space-y-6">
            {/* Live Exam Bar */}
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300 font-semibold">Active Assessment</span>
                <span className="text-slate-500">•</span>
                <span className="text-[#65F58A] font-bold">Proctored Session</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Clock className="w-4 h-4 text-[#35E6B5]" />
                <span className="text-white font-bold tabular-nums">
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
                {timerPaused && <span className="text-rose-400 font-bold">(PAUSED)</span>}
              </div>
            </div>

            {/* Questions Form */}
            <div className="space-y-6">
              {quizMeta.questions.map((q, idx) => (
                <div key={q.id} className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white leading-relaxed">
                      {idx + 1}. {q.text}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-400 border border-surface-border flex-shrink-0">
                      {q.points} Points
                    </span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = userAnswers[q.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-3 border ${
                            isSelected
                              ? 'bg-redkross-600/20 border-redkross-500 text-white font-semibold'
                              : 'bg-surface-100/60 border-surface-border/80 text-slate-300 hover:bg-surface-100'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'border-redkross-500 bg-redkross-600' : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Bar */}
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {Object.keys(userAnswers).length} of {quizMeta.questions.length} Questions Answered
              </span>

              <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length < quizMeta.questions.length}
                className="px-6 py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md"
              >
                Submit Assessment for Evaluation
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PRE-EXAM PROTOCOL MODAL (2 RULES + "ALL THE BEST") */}
        {/* ==================================================== */}
        {showPreExamModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="glass-card max-w-lg w-full rounded-3xl p-8 border border-[#65F58A]/40 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#65F58A]/10 to-transparent rounded-full blur-2xl -z-10" />

              {/* Header */}
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-[10px] font-mono uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Mandatory Examination Proctor Rules</span>
                </div>
                <h2 className="text-xl font-royal font-bold text-white tracking-wide">
                  Academic Integrity Verification
                </h2>
              </div>

              {/* 2 Strict Rules */}
              <div className="space-y-3.5 text-xs">
                {/* Rule 1: Camera */}
                <div className="p-4 rounded-2xl bg-[#101923] border border-amber-500/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold font-mono text-amber-400 uppercase tracking-wide">
                      Rule 1: Camera Open Compulsory
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed">
                      Continuous webcam streaming is strictly mandatory. If your camera turns off, you will receive <strong className="text-white">exactly 1 warning</strong>. A second camera interruption will immediately terminate the exam and enforce a <strong className="text-amber-300">24-hour lockout</strong> with an incident alert dispatched to the Super Admin.
                    </p>
                  </div>
                </div>

                {/* Rule 2: Tab Switch Prohibited */}
                <div className="p-4 rounded-2xl bg-[#101923] border border-red-500/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold font-mono text-red-400 uppercase tracking-wide">
                      Rule 2: Zero Tab-Switching Tolerance
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed">
                      Switching tabs, minimizing the browser, or changing application focus is <strong className="text-white">strictly forbidden</strong>. Doing so terminates the session immediately. Even if 3 attempts remain, you will be locked out for <strong className="text-red-300">24 hours</strong> without exception.
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Highlight: "All the best" */}
              <div className="py-4 text-center border-y border-[#263440]">
                <div className="font-royal text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#65F58A] via-[#35E6B5] to-emerald-400 drop-shadow-[0_0_20px_rgba(101,245,138,0.5)] tracking-wide">
                  All the best
                </div>
                <p className="text-[11px] text-[#94A3B8] font-mono mt-1">
                  Demonstrate rigorous operational discipline and clear the threshold.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreExamModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-xs font-mono text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={initializeCameraAndStart}
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-royal font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.35)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Enable Camera & Launch Exam
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* CAMERA DISCONNECT WARNING MODAL (WARNING 1 OF 2) */}
        {/* ==================================================== */}
        {cameraWarningModal && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="glass-card max-w-md w-full rounded-3xl p-7 border-2 border-amber-500 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
                <CameraOff className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  FIRST & FINAL WARNING
                </div>
                <h3 className="text-lg font-royal font-bold text-white">{cameraWarningModal.title}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {cameraWarningModal.message}
              </p>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                Next Disconnect Result: Immediate 24-Hour Lockout
              </div>

              <button
                type="button"
                onClick={resumeCameraAfterWarning}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-royal font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Re-enable Camera & Resume Exam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
