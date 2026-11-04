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
  AlertCircle,
  X
} from 'lucide-react';

/**
 * RedKross Academy - CBT Examination Console (Hallmark v3.0 Soft Modern & Responsive Edition)
 * Features:
 * - 100% Full-bleed edge-to-edge layout on desktop/laptop
 * - 100% Mobile Responsive with dedicated mobile question matrix bottom-sheet drawer
 * - Soft rounded radii (rounded-2xl, rounded-xl, rounded-lg, rounded-full) - Zero sharp brutalist edges
 * - Strict RedKross cyber theme (#071018, #FFA439, #FF7A00, #A3907C)
 * - Dual typography: Lora serif for questions and prompts, Space Mono for telemetry and timers
 * - Zero overflow guarantee: text wrapping, min-w-0 safety, and responsive touch targets (>= 48px)
 */
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
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = Math.max(0, totalQuestions - attemptedCount);

  const formatTimer = (secs) => {
    if (secs === null || secs === undefined || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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

  if (isLockoutActive || (attemptsRemaining === 0 && !isSubmitted)) {
    return (
      <div className="w-full p-6 sm:p-8 rounded-2xl bg-rose-950/70 border border-rose-500/50 space-y-5 shadow-2xl animate-fade-in">
        <div className="flex items-center space-x-3.5 text-rose-400">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
          <div className="min-w-0">
            <h3 className="text-xl font-bold font-lora text-white">24-Hour Proctoring Cooldown Enforced</h3>
            <p className="text-xs font-mono text-rose-300 truncate">
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

        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
          <span>Security Protocol: STRICT_24H_COOLDOWN</span>
          <span className="text-[#FF7A00]">Automatic Reset after 24h</span>
        </div>
      </div>
    );
  }

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
              <span className={`px-2.5 py-1 rounded-full font-bold border ${attemptBadge.className}`}>
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
                    className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(255,122,0,0.4)] flex items-center space-x-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Evaluation (Attempt {Math.min(3, attemptsUsed + 1)} of 3)</span>
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

        {/* Detailed Question Remediation & Rationales */}
        <div className="space-y-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-[#A3907C] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FF7A00]" />
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
                      ? 'bg-[#1A1208]/40 border-[#FF7A00]/30'
                      : 'bg-rose-950/30 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-lora text-sm font-bold text-white leading-relaxed break-words">
                      {idx + 1}. {q.text}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0 ${
                        isCorrect
                          ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {isCorrect ? 'Correct (+1.0)' : 'Incorrect'}
                    </span>
                  </div>

                  {/* Options summary */}
                  <div className="space-y-1.5 pl-1 sm:pl-2 font-mono text-[11px]">
                    {q.options?.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isUserSelected = selectedOptId === opt.id;
                      const isOptCorrect = opt.is_correct;

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-lg flex items-center justify-between gap-2 border ${
                            isOptCorrect
                              ? 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/40 font-semibold'
                              : isUserSelected
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : 'text-gray-400 border-transparent'
                          }`}
                        >
                          <span className="flex items-start sm:items-center gap-2 min-w-0">
                            <span className="font-bold flex-shrink-0">({letter})</span>
                            <span className="break-words">{opt.text}</span>
                          </span>
                          {isOptCorrect && (
                            <span className="text-[10px] text-[#FF7A00] uppercase font-bold flex-shrink-0">
                              ✓ Correct Answer
                            </span>
                          )}
                          {!isOptCorrect && isUserSelected && (
                            <span className="text-[10px] text-rose-400 uppercase font-bold flex-shrink-0">
                              ✗ Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Note */}
                  {q.explanation && (
                    <div className="p-3.5 rounded-lg bg-black/60 border border-[#FF7A00]/20 text-[11px] font-lora text-[#E2D9CE] leading-relaxed break-words">
                      <strong className="font-mono text-[#FF7A00] block uppercase text-[10px] mb-1">
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

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* ----------------- TOP META & ASSESSMENT HUD ----------------- */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#1A1208]/70 border border-[#FF7A00]/30 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center text-[#FF7A00] flex-shrink-0 shadow-[0_0_12px_rgba(255,122,0,0.2)]">
            {isFinalExam ? <Shield className="w-5 h-5" /> : <Award className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold font-lora text-white truncate">
              {quiz?.title || 'Interactive Assessment'}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-[#A3907C]">
              <span>Passing: {quiz?.passing_score || 80}%</span>
              <span>•</span>
              <span>{totalQuestions} Graded MCQs</span>
              <span>•</span>
              <span className="text-[#FFA439]">Active Proctoring // Tab-Lock Enforced</span>
            </div>
          </div>
        </div>

        {/* Live Badges: Attempts Remaining, Mobile Drawer Toggle & Timer */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Question Matrix Trigger */}
          <button
            type="button"
            onClick={() => setMobilePaletteOpen(true)}
            className="lg:hidden px-3 py-1.5 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Matrix ({attemptedCount}/{totalQuestions})</span>
          </button>

          <div className="flex items-center space-x-2.5">
            {/* Live Attempts Counter */}
            <div className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold flex items-center space-x-1.5 ${attemptBadge.className}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span className="truncate">{attemptBadge.label}</span>
            </div>

            {/* Countdown Clock */}
            <div className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#FFA439]/50 text-[#FFA439] text-xs font-mono font-bold flex items-center space-x-2 shadow-[0_0_12px_rgba(255,164,57,0.25)]">
              <Clock className="w-4 h-4 animate-spin-slow text-[#FFA439]" />
              <span className="tabular-nums text-sm font-extrabold tracking-wider">{formatTimer(timerSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- MAIN SPLIT CBT WORKSPACE (WIREFRAME LAYOUT) ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* ================= LEFT / CENTER: CURRENT QUESTION & OPTIONS (~70%) ================= */}
        <div className="lg:col-span-8 xl:col-span-9 bg-[#1A1208]/40 border border-[#FF7A00]/25 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md relative min-w-0">
          {/* Question Header & Points */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#FF7A00]/15 text-xs font-mono gap-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#FF7A00]/15 text-[#FF7A00] font-bold border border-[#FF7A00]/30">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              {answers[currentQuestion?.id] ? (
                <span className="px-2.5 py-1 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] text-[10px] uppercase font-bold flex items-center gap-1 border border-[#FF7A00]/30">
                  <Check className="w-3 h-3" /> Attempted
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] uppercase font-bold flex items-center gap-1 border border-rose-500/30">
                  <AlertCircle className="w-3 h-3" /> Not Attempted
                </span>
              )}
            </div>
            <span className="text-[#A3907C] font-mono text-xs">1.0 point (graded)</span>
          </div>

          {/* Question Statement */}
          <div className="space-y-2">
            <h4 className="text-base sm:text-xl font-bold font-lora text-white leading-relaxed break-words">
              {currentQuestion?.text || 'Loading question statement...'}
            </h4>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion?.options?.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx);
              const isSelected = answers[currentQuestion.id] === opt.id;

              return (
                <button
                  key={opt.id || oIdx}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center space-x-3.5 sm:space-x-4 border cursor-pointer min-h-[52px] ${
                    isSelected
                      ? 'bg-[#1A1208] border-[#FF7A00] text-white font-bold shadow-[0_0_20px_rgba(255,122,0,0.25)] ring-1 ring-[#FF7A00]'
                      : 'bg-[#05130e]/90 border-[#FF7A00]/20 text-slate-200 hover:border-[#FF7A00]/50 hover:bg-[#071913]'
                  }`}
                >
                  {/* Key Badge [A] - [D] */}
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 transition-all ${
                      isSelected
                        ? 'border-[#FF7A00] bg-[#FF7A00] text-[#071018] shadow-[0_0_10px_rgba(255,122,0,0.4)]'
                        : 'border-[#FF7A00]/40 bg-black/50 text-[#FF7A00]'
                    }`}
                  >
                    {letter}
                  </span>

                  {/* Option Text */}
                  <span className="flex-1 leading-relaxed break-words whitespace-normal text-left">
                    {opt.text}
                  </span>

                  {/* Radio Indicator */}
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-[#FF7A00] bg-[#FF7A00]' : 'border-gray-600 bg-transparent'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#071018]" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Bar (PREVIOUS and SAVE & NEXT) */}
          <div className="pt-5 border-t border-[#FF7A00]/15 flex flex-wrap items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 sm:px-5 py-2.5 rounded-xl border border-white/20 bg-black/40 hover:bg-black/70 text-gray-200 text-xs font-mono font-bold flex items-center space-x-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            {/* Save & Next / Submit Button */}
            <div className="flex items-center space-x-3">
              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirmModal(true)}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-mono font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center space-x-2 cursor-pointer"
                >
                  <span>REVIEW & SUBMIT</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-mono font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)] flex items-center space-x-2 cursor-pointer"
                >
                  <span>SAVE & NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT: QUESTION NUMBERS PALETTE (DESKTOP DOCK ~30%) ================= */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-[#1A1208]/40 border border-[#FF7A00]/25 rounded-2xl p-5 shadow-2xl backdrop-blur-md sticky top-20 min-w-0">
          {/* Palette Title */}
          <div className="pb-3 border-b border-[#FF7A00]/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-4 h-4 text-[#FF7A00]" />
              <h5 className="font-lora font-bold text-sm text-white">Question Matrix</h5>
            </div>
            <span className="text-[11px] font-mono text-[#A3907C]">
              {attemptedCount} / {totalQuestions} Done
            </span>
          </div>

          {/* Marking Legend */}
          <div className="py-3 border-b border-[#FF7A00]/15 space-y-2 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#FF7A00] shadow-[0_0_6px_rgba(255,122,0,0.6)]" />
                <span className="text-slate-300">Attempted</span>
              </div>
              <span className="font-bold text-[#FF7A00]">{attemptedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-500" />
                <span className="text-slate-300">Not Attempted</span>
              </div>
              <span className="font-bold text-rose-300">{unattemptedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
                <span className="text-slate-300">Current Question</span>
              </div>
              <span className="font-bold text-white">Q{currentQuestionIndex + 1}</span>
            </div>
          </div>

          {/* Grid of Question Numbers (1..N) */}
          <div className="py-3">
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-2 max-h-[320px] overflow-y-auto custom-scrollbar p-1">
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
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#071018] scale-105 z-10'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-[#FF7A00] text-[#071018] border-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.3)]'
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
          <div className="pt-3 border-t border-[#FF7A00]/20">
            <button
              type="button"
              onClick={() => setShowSubmitConfirmModal(true)}
              className="w-full py-3 rounded-xl bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/50 font-bold text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_0_15px_rgba(255,122,0,0.3)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SUBMIT ASSESSMENT NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- MOBILE QUESTION MATRIX BOTTOM SHEET DRAWER ----------------- */}
      {mobilePaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#071018] border-t border-[#FF7A00]/40 rounded-t-3xl p-5 max-h-[82vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#FF7A00]/20">
              <div className="flex items-center space-x-2">
                <LayoutGrid className="w-4 h-4 text-[#FF7A00]" />
                <h5 className="font-lora font-bold text-base text-white">Question Matrix</h5>
              </div>
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(false)}
                className="p-1.5 rounded-lg bg-black/60 border border-white/20 text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Marking Legend */}
            <div className="flex items-center justify-around py-2 border-b border-[#FF7A00]/15 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />
                <span className="text-[#FF7A00] font-bold">{attemptedCount} Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-rose-300 font-bold">{unattemptedCount} Remaining</span>
              </div>
            </div>

            {/* Grid of Question Numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5 py-2 max-h-[45vh] overflow-y-auto custom-scrollbar">
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
                    className={`h-11 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border ${
                      isCurrent
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#071018] scale-105 z-10'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-[#FF7A00] text-[#071018] border-[#FF7A00] shadow-md'
                        : 'bg-rose-950/70 text-rose-300 border-rose-500/50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Mobile Submit CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobilePaletteOpen(false);
                  setShowSubmitConfirmModal(true);
                }}
                className="w-full py-3 rounded-xl bg-[#FF7A00] text-[#071018] font-bold text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>SUBMIT ASSESSMENT NOW</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUBMISSION CONFIRMATION MODAL ----------------- */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#071018] border border-[#FF7A00]/50 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
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
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  onSubmitExam();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(255,122,0,0.4)] cursor-pointer"
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
