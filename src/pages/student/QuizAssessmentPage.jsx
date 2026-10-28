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
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function QuizAssessmentPage() {
  const { enrolmentId, quizId } = useParams();
  const navigate = useNavigate();
  const { refreshBalance } = useAuth();

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

  // Window & Cooldown state
  const [retryWindow, setRetryWindow] = useState(null);
  const [activeAttempt, setActiveAttempt] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [examStarted, setExamStarted] = useState(false);

  // Proctoring Focus Loss State (PRD Section 7: 3-Strike System)
  const [focusStrikeModal, setFocusStrikeModal] = useState(null); // { strike: 1|2|3, message: string }
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins
  const [timerPaused, setTimerPaused] = useState(false);

  // Remaining Cooldown String
  const [cooldownCountdown, setCooldownCountdown] = useState('');

  // Load retry window status
  const refreshWindowState = () => {
    if (enrolmentId && quizId) {
      const windowData = mockEngine.getRetryWindow(enrolmentId, quizId);
      setRetryWindow(windowData);
    }
  };

  useEffect(() => {
    refreshWindowState();
  }, [enrolmentId, quizId]);

  // Cooldown countdown tick
  useEffect(() => {
    if (!retryWindow || !retryWindow.locked_until) return;

    const interval = setInterval(() => {
      const remainingMs = new Date(retryWindow.locked_until).getTime() - Date.now();
      if (remainingMs <= 0) {
        clearInterval(interval);
        refreshWindowState();
      } else {
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        setCooldownCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [retryWindow]);

  // Exam Timer
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

  // Proctoring: Listen to visibilitychange and window blur during exam
  useEffect(() => {
    if (!examStarted || submissionResult) return;

    const handleFocusLoss = () => {
      if (!activeAttempt || timerPaused || submissionResult) return;

      setTimerPaused(true);
      const violationResult = mockEngine.recordFocusViolation(activeAttempt.id);
      refreshBalance();

      if (violationResult) {
        setFocusStrikeModal(violationResult);
        if (violationResult.strike >= 3) {
          // Exam terminated
          setSubmissionResult({
            score_percentage: 0,
            is_passed: false,
            terminated: true,
            reason: 'Proctoring Strike 3 Violation',
          });
          refreshWindowState();
        }
      }
    };

    window.addEventListener('blur', handleFocusLoss);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) handleFocusLoss();
    });

    return () => {
      window.removeEventListener('blur', handleFocusLoss);
    };
  }, [examStarted, activeAttempt, timerPaused, submissionResult]);

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

  const isLocked = retryWindow?.locked_until && new Date() < new Date(retryWindow.locked_until);

  const handleStartExam = () => {
    try {
      const attempt = mockEngine.startQuizAttempt(enrolmentId, quizId);
      setActiveAttempt(attempt);
      setExamStarted(true);
      setTimerPaused(false);
      setSubmissionResult(null);
      setUserAnswers({});
    } catch (e) {
      alert(e.message);
      refreshWindowState();
    }
  };

  const handleSelectOption = (questionId, optionId) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (!activeAttempt) return;

    try {
      const result = mockEngine.submitQuizAttempt(
        activeAttempt.id,
        userAnswers,
        quizMeta.questions,
        quizMeta.passing_score,
        quizMeta.token_bounty
      );

      setSubmissionResult(result);
      refreshBalance();
      refreshWindowState();

      if (result.is_passed) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const resumeFromWarning = () => {
    setFocusStrikeModal(null);
    setTimerPaused(false);
  };

  return (
    <div className="min-h-screen bg-[#071018] py-12">
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

        {/* 24-HOUR COOLDOWN LOCKOUT BANNER */}
        {isLocked ? (
          <div className="bg-surface-card border border-rose-600/50 rounded-xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase font-semibold">
                PRD MANDATORY EVALUATION LOCKOUT (24-HOUR COOLDOWN)
              </div>
              <h2 className="text-2xl font-bold text-white">Evaluation Window Locked</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                You have exhausted all 3 attempts in your current evaluation window. As mandated by the RedKross Academic Integrity Charter, this assessment is locked for 24 hours to enforce remedial study.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-100 max-w-xs mx-auto border border-surface-border">
              <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">Unlocks In</div>
              <div className="text-2xl font-bold text-rose-400 font-mono tracking-widest tabular-nums">
                {cooldownCountdown || 'Calculating...'}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/student/learn/${enrolmentId}`}
                className="px-6 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-slate-200 text-xs font-semibold"
              >
                Review Course Modules & Remediate
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
                <div className="text-[10px] text-slate-400 uppercase">Evaluation Window</div>
                <div className="text-sm font-bold text-white">Window #{retryWindow?.window_number || 1}</div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Attempts Consumed</div>
                <div className="text-sm font-bold text-amber-400 tabular-nums">
                  {retryWindow?.attempts_used || 0} of 3 Used
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Reward Bounty</div>
                <div className="text-sm font-bold text-amber-400 flex items-center space-x-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>+{quizMeta.token_bounty} Tokens</span>
                </div>
              </div>
            </div>

            {/* Anti-Cheat & Proctoring Briefing */}
            <div className="p-4 rounded-lg bg-redkross-950/20 border border-redkross-600/30 text-xs space-y-2">
              <div className="font-bold text-redkross-400 flex items-center space-x-1.5">
                <Shield className="w-4 h-4" />
                <span>3-Strike Exam Focus Tracking Active</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Client tab-switches and window minimizes are actively monitored during this test:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                <li><strong>Strike 1:</strong> Warning modal pauses exam timer.</li>
                <li><strong>Strike 2:</strong> Severe alert + <strong>50 RedKross Tokens deducted</strong> from wallet.</li>
                <li><strong>Strike 3:</strong> Immediate test termination, recorded as failed attempt, and 24-hour lockout applied.</li>
              </ul>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full py-3.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-lg hover:cyber-glow-red flex items-center justify-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Begin Attempt #{((retryWindow?.attempts_used || 0) + 1)}</span>
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

              {!submissionResult.is_passed && !isLocked && (
                <button
                  onClick={() => {
                    setSubmissionResult(null);
                    setExamStarted(false);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold shadow"
                >
                  Retry Evaluation (Attempt #{((retryWindow?.attempts_used || 0) + 1)})
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ACTIVE EXAM CONTAINER */
          <div className="space-y-6">
            {/* Live Exam Bar */}
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300 font-semibold">Active Attempt #{activeAttempt?.attempt_number}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Window #{activeAttempt?.window_number}</span>
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

        {/* PROCTORING 3-STRIKE WARNING MODAL */}
        {focusStrikeModal && focusStrikeModal.strike < 3 && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-surface-card border border-rose-600 rounded-xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">
                  Proctoring Alert — Strike {focusStrikeModal.strike} of 3
                </div>
                <h3 className="text-lg font-bold text-white">Browser Window Focus Lost</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {focusStrikeModal.message}
              </p>

              {focusStrikeModal.strike === 2 && (
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-600/40 text-xs font-mono text-rose-300 font-bold">
                  Penalty Applied: -50 RedKross Tokens
                </div>
              )}

              <button
                onClick={resumeFromWarning}
                className="w-full py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-xs shadow-lg"
              >
                Acknowledge & Resume Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
