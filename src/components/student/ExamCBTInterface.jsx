import React, { useState, useEffect } from 'react';
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
  AlertCircle
} from 'lucide-react';

export default function ExamCBTInterface({
  quiz,
  enrolmentId,
  isFinalExam = false,
  timerSeconds,
  attemptsStatus,
  answers = {},
  onSelectAnswer,
  onSubmitExam,
  isSubmitted = false,
  submissionResult = null,
  onRetakeExam,
  isLockoutActive = false,
  lockoutCountdown = { hours: 0, minutes: 0, seconds: 0 }
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = Math.max(0, totalQuestions - attemptedCount);

  // Format Timer string MM:SS
  const formatTimer = (secs) => {
    if (secs === null || secs === undefined || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Next / Previous Navigation Handlers
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Last question -> open submit confirm modal
      setShowSubmitConfirmModal(true);
    }
  };

  const handleSelectOption = (optionId) => {
    if (isSubmitted || isLockoutActive) return;
    if (currentQuestion) {
      onSelectAnswer(currentQuestion.id, optionId);
    }
  };

  const attemptsRemaining = attemptsStatus?.attemptsRemaining ?? 3;
  const attemptsUsed = attemptsStatus?.attemptsUsed ?? 0;

  // Determine Attempt Counter Badge Style
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
        className: 'bg-[#35E6B5]/20 text-[#35E6B5] border-[#35E6B5]/40'
      };
    }
    return {
      label: '3 OF 3 ATTEMPTS REMAINING',
      className: 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/30'
    };
  };

  const attemptBadge = getAttemptBadge();

  // -------------------------------------------------------------
  // 1. ACTIVE 24-HOUR PROCTORING LOCKOUT HUD (COOLDOWN IN EFFECT)
  // -------------------------------------------------------------
  if (isLockoutActive || (attemptsRemaining === 0 && !isSubmitted)) {
    return (
      <div className="p-8 rounded-2xl bg-rose-950/70 border border-rose-500/50 space-y-5 shadow-2xl animate-fade-in">
        <div className="flex items-center space-x-3 text-rose-400">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
          <div>
            <h3 className="text-xl font-bold font-lora text-white">24-Hour Proctoring Cooldown Enforced</h3>
            <p className="text-xs font-mono text-rose-300">
              {attemptsRemaining === 0
                ? 'All 3 evaluation attempts have been exhausted for this window.'
                : 'Security Protocol Enforced: Academic dishonesty prevention or focus loss intercepted.'}
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

        <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Security Protocol: STRICT_24H_COOLDOWN</span>
          <span className="text-[#65F58A]">Automatic Reset after 24h</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. POST-EXAM RESULTS & REMEDIATION SCREEN
  // -------------------------------------------------------------
  if (isSubmitted && submissionResult) {
    const isPassed = submissionResult.isPassed || submissionResult.is_passed;
    const scorePct = submissionResult.score ?? submissionResult.score_percentage ?? 0;
    const passingScore = quiz?.passing_score || 80;

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Top Score Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border shadow-2xl relative overflow-hidden ${
            isPassed
              ? 'bg-[#092218]/90 border-[#65F58A]/50 text-white'
              : 'bg-rose-950/80 border-rose-500/50 text-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                  isPassed
                    ? 'bg-[#65F58A]/20 border-[#65F58A] text-[#65F58A]'
                    : 'bg-rose-500/20 border-rose-500 text-rose-400'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider block opacity-80">
                  Evaluation Performance Report
                </span>
                <h3 className="text-2xl font-bold font-lora">
                  {isPassed ? 'Operational Standard Met (Passed)' : 'Passing Threshold Not Reached'}
                </h3>
                <p className="text-xs font-mono mt-1 opacity-90">
                  {isPassed
                    ? 'Congratulations! You have verified operational competence for this curriculum milestone.'
                    : `Required standard: ${passingScore}% passing score. Review the rationales below and prepare for retake.`}
                </p>
              </div>
            </div>

            {/* Score Metric Ring / Pill */}
            <div className="text-center sm:text-right flex-shrink-0">
              <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums tracking-tight">
                {scorePct}%
              </div>
              <span className="text-xs font-mono opacity-80 block mt-1">
                Threshold: {passingScore}% Minimum
              </span>
            </div>
          </div>

          {/* Live Attempts Counter Status Callout */}
          <div className="mt-6 pt-5 border-t border-current/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="opacity-70">Window Status:</span>
              <span className={`px-2.5 py-1 rounded font-bold border ${attemptBadge.className}`}>
                {isPassed ? 'PASSED (UNLOCKED)' : attemptBadge.label}
              </span>
            </div>

            {/* Retake CTA or 24h Lockout Message */}
            {!isPassed && (
              <div>
                {attemptsRemaining > 0 ? (
                  <button
                    type="button"
                    onClick={onRetakeExam}
                    className="px-5 py-2.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(101,245,138,0.4)] flex items-center space-x-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Evaluation (Attempt {Math.min(3, attemptsUsed + 1)} of 3)</span>
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                    0 Attempts Left • 24-Hour Cooldown Enforced
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detailed Question Remediation & Rationales */}
        <div className="space-y-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-[#72A88E] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#65F58A]" />
            <span>Technical Review & Correct Option Explanations ({totalQuestions} Questions)</span>
          </h4>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedOptId = answers[q.id];
              const correctOpt = q.options?.find((opt) => opt.is_correct);
              const isCorrect = selectedOptId && correctOpt && selectedOptId === correctOpt.id;

              return (
                <div
                  key={q.id || idx}
                  className={`p-5 rounded-xl border text-xs space-y-3 transition-all ${
                    isCorrect
                      ? 'bg-[#092218]/40 border-[#65F58A]/30'
                      : 'bg-rose-950/30 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-lora text-sm font-bold text-white leading-relaxed">
                      {idx + 1}. {q.text}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0 ${
                        isCorrect
                          ? 'bg-[#65F58A]/20 text-[#65F58A] border border-[#65F58A]/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {isCorrect ? 'Correct (+1.0)' : 'Incorrect'}
                    </span>
                  </div>

                  {/* Options summary */}
                  <div className="space-y-1.5 pl-2 font-mono text-[11px]">
                    {q.options?.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isUserSelected = selectedOptId === opt.id;
                      const isOptCorrect = opt.is_correct;

                      return (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-lg flex items-center justify-between border ${
                            isOptCorrect
                              ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/40 font-semibold'
                              : isUserSelected
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : 'text-gray-400 border-transparent'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-bold">({letter})</span>
                            <span>{opt.text}</span>
                          </span>
                          {isOptCorrect && (
                            <span className="text-[10px] text-[#65F58A] uppercase font-bold">
                              ✓ Correct Answer
                            </span>
                          )}
                          {!isOptCorrect && isUserSelected && (
                            <span className="text-[10px] text-rose-400 uppercase font-bold">
                              ✗ Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Note */}
                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-black/60 border border-[#65F58A]/20 text-[11px] font-lora text-[#C9EFE0] leading-relaxed">
                      <strong className="font-mono text-[#65F58A] block uppercase text-[10px] mb-1">
                        Technical Rationale:
                      </strong>
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

  // -------------------------------------------------------------
  // 3. ACTIVE CBT EXAMINATION INTERFACE (PER USER WIREFRAME)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ----------------- TOP META & ASSESSMENT HUD ----------------- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#092218]/60 border border-[#65F58A]/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A] flex-shrink-0">
            {isFinalExam ? <Shield className="w-5 h-5" /> : <Award className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-lora text-white">
              {quiz?.title || 'Interactive Assessment'}
            </h3>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#72A88E]">
              <span>Passing: {quiz?.passing_score || 80}%</span>
              <span>•</span>
              <span>{totalQuestions} Graded Questions</span>
            </div>
          </div>
        </div>

        {/* Live Badges: Attempts Remaining & Timer */}
        <div className="flex items-center space-x-3">
          {/* Live Attempts Counter */}
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center space-x-1.5 ${attemptBadge.className}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{attemptBadge.label}</span>
          </div>

          {/* Countdown Clock */}
          <div className="px-3.5 py-1.5 rounded-lg bg-black/70 border border-[#35E6B5]/40 text-[#35E6B5] text-xs font-mono font-bold flex items-center space-x-2 shadow-inner">
            <Clock className="w-4 h-4 animate-spin-slow" />
            <span className="tabular-nums text-sm font-extrabold">{formatTimer(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* ----------------- MAIN SPLIT CBT WORKSPACE (WIREFRAME LAYOUT) ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT / CENTER: CURRENT QUESTION & OPTIONS (~68%) ================= */}
        <div className="lg:col-span-8 bg-[#092218]/40 border border-[#65F58A]/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative min-w-0">
          {/* Question Header & Points */}
          <div className="flex items-center justify-between pb-4 border-b border-[#65F58A]/15 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-[#65F58A]/15 text-[#65F58A] font-bold border border-[#65F58A]/30">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              {answers[currentQuestion?.id] ? (
                <span className="px-2 py-0.5 rounded bg-[#65F58A]/20 text-[#65F58A] text-[10px] uppercase font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Attempted
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] uppercase font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Not Attempted
                </span>
              )}
            </div>
            <span className="text-[#72A88E] hidden sm:inline">1.0 point (graded)</span>
          </div>

          {/* Question Statement (Arrow "Question" in Wireframe) */}
          <div className="space-y-2">
            <h4 className="text-base sm:text-xl font-bold font-lora text-white leading-relaxed">
              {currentQuestion?.text || 'Loading question statement...'}
            </h4>
          </div>

          {/* Options List (Arrow "options" in Wireframe) */}
          <div className="space-y-3 pt-2">
            {currentQuestion?.options?.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx);
              const isSelected = answers[currentQuestion.id] === opt.id;

              return (
                <button
                  key={opt.id || oIdx}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center space-x-4 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#092218] border-[#65F58A] text-white font-bold shadow-[0_0_20px_rgba(101,245,138,0.25)] ring-1 ring-[#65F58A]'
                      : 'bg-[#05130e]/90 border-[#65F58A]/20 text-slate-200 hover:border-[#65F58A]/50 hover:bg-[#071913]'
                  }`}
                >
                  {/* Round Radio Indicator (Matching circles in Wireframe) */}
                  <span
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-xs transition-all ${
                      isSelected
                        ? 'border-[#65F58A] bg-[#65F58A] text-[#071018]'
                        : 'border-[#65F58A]/40 bg-[#061510] text-[#72A88E]'
                    }`}
                  >
                    {letter}
                  </span>

                  {/* Option Text */}
                  <span className="flex-1 leading-relaxed text-sm font-normal">
                    {opt.text}
                  </span>

                  {/* Check Indicator */}
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#65F58A] flex-shrink-0 animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Action Bar (PREVIOUS and SAVE & NEXT in Wireframe) */}
          <div className="pt-6 border-t border-[#65F58A]/20 flex items-center justify-between gap-4">
            {/* Previous Button (Left) */}
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
                currentQuestionIndex > 0
                  ? 'bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border-[#65F58A]/40 cursor-pointer shadow-md'
                  : 'bg-black/30 text-gray-600 border-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            {/* Save & Next Button (Right) */}
            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-bold text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'SAVE & FINISH' : 'SAVE & NEXT'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT: QUESTION NUMBERS PALETTE (~32%) ================= */}
        {/* Top-Right box with arrow "question numbers" in Wireframe */}
        <div className="lg:col-span-4 bg-[#092218]/50 border border-[#65F58A]/25 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl backdrop-blur-md">
          {/* Palette Title */}
          <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/20">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-4 h-4 text-[#65F58A]" />
              <h5 className="text-sm font-bold font-lora text-white">Questions Palette</h5>
            </div>
            <span className="text-[11px] font-mono text-[#72A88E]">
              {attemptedCount} / {totalQuestions} Answered
            </span>
          </div>

          {/* Marking Legend (Explicitly matching user's handwriting notes) */}
          <div className="p-3 rounded-xl bg-black/50 border border-[#65F58A]/15 space-y-2 text-[11px] font-mono">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Palette Color Coding:</div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-sm bg-[#65F58A] inline-block" />
                <span className="text-[#65F58A] font-semibold">Attempted ({attemptedCount})</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block" />
                <span className="text-rose-300 font-semibold">Not Attempted ({unattemptedCount})</span>
              </span>
            </div>
          </div>

          {/* Grid of Question Numbers (1..N) */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
              Jump To Question:
            </span>
            <div className="grid grid-cols-5 gap-2 max-h-[320px] overflow-y-auto custom-scrollbar p-1">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id || idx}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border ${
                      isCurrent
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#071018] scale-105 z-10'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] shadow-[0_0_8px_rgba(101,245,138,0.3)]'
                        : 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/60'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Submit CTA */}
          <div className="pt-3 border-t border-[#65F58A]/20">
            <button
              type="button"
              onClick={() => setShowSubmitConfirmModal(true)}
              className="w-full py-3 rounded-xl bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/50 font-bold text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_0_15px_rgba(101,245,138,0.3)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SUBMIT ASSESSMENT NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- SUBMISSION CONFIRMATION MODAL ----------------- */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071018] border border-[#65F58A]/40 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scale-in">
            <div className="flex items-center space-x-3 text-[#65F58A]">
              <Award className="w-7 h-7" />
              <div>
                <h4 className="text-lg font-bold font-lora text-white">Confirm Assessment Submission</h4>
                <p className="text-xs font-mono text-[#72A88E]">Verification & Grading Protocol</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#092218] border border-[#65F58A]/20 text-xs font-mono space-y-2">
              <div className="flex justify-between text-white">
                <span>Total Questions:</span>
                <span className="font-bold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-[#65F58A]">
                <span>Attempted (Green):</span>
                <span className="font-bold">{attemptedCount}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Not Attempted (Red):</span>
                <span className="font-bold">{unattemptedCount}</span>
              </div>
              <div className="flex justify-between text-amber-300 pt-1 border-t border-[#65F58A]/15">
                <span>Attempt Deduction:</span>
                <span className="font-bold">Uses 1 of {attemptsRemaining} attempts</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Warning: You have {unattemptedCount} unanswered question(s). Unanswered questions count as 0 points.</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black text-gray-300 border border-gray-700 text-xs font-mono transition-colors"
              >
                Back to Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  onSubmitExam();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(101,245,138,0.4)]"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
