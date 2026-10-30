import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  Award,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Sparkles,
  Download,
  ExternalLink,
  ChevronLeft,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function FinalCertificationPage() {
  const { enrolmentId } = useParams();
  const { currentUser, refreshBalance } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;
  const examMeta = course?.final_assessment;

  const [gateStatus, setGateStatus] = useState({ is_unlocked: false, reasons: [] });
  const [examStarted, setExamStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(2700); // 45 mins
  const [timerPaused, setTimerPaused] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [examResult, setExamResult] = useState(null);
  const [issuedCredential, setIssuedCredential] = useState(null);
  const [focusStrikeModal, setFocusStrikeModal] = useState(null);
  const [activeAttemptId, setActiveAttemptId] = useState(null);

  useEffect(() => {
    if (enrolmentId) {
      const status = mockEngine.checkFinalAssessmentUnlock(enrolmentId);
      setGateStatus(status);

      // Check if already credentialed
      if (enrolment?.credential_id) {
        const cred = mockEngine.getDb().credentials.find((c) => c.id === enrolment.credential_id);
        if (cred) setIssuedCredential(cred);
      }
    }
  }, [enrolmentId]);

  // Exam Timer
  useEffect(() => {
    if (!examStarted || timerPaused || examResult) return;

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
  }, [examStarted, timerPaused, examResult]);

  // Exam Focus Tracking
  useEffect(() => {
    if (!examStarted || examResult) return;

    const handleFocusLoss = () => {
      if (timerPaused || examResult) return;
      setTimerPaused(true);

      const fakeAttemptId = activeAttemptId || `final_att_${Date.now()}`;
      const violationResult = mockEngine.recordFocusViolation(fakeAttemptId);
      refreshBalance();

      if (violationResult) {
        setFocusStrikeModal(violationResult);
        if (violationResult.strike >= 3) {
          setExamResult({
            score_percentage: 0,
            is_passed: false,
            terminated: true,
          });
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
  }, [examStarted, activeAttemptId, timerPaused, examResult]);

  if (!enrolment || !course || !examMeta) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Final Assessment Not Found</h2>
        <Link to="/student" className="px-4 py-2 bg-redkross-600 rounded text-white text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleStartFinal = () => {
    setExamStarted(true);
    setActiveAttemptId(`final_att_${Date.now()}`);
    setUserAnswers({});
    setExamResult(null);
  };

  const handleSubmit = () => {
    let earned = 0;
    let total = 0;

    examMeta.questions.forEach((q) => {
      total += q.points || 10;
      const selected = userAnswers[q.id];
      const correct = q.options.find((opt) => opt.is_correct);
      if (selected && correct && selected === correct.id) {
        earned += q.points || 10;
      }
    });

    const scorePct = total > 0 ? Math.round((earned / total) * 100) : 0;
    const isPassed = scorePct >= examMeta.passing_score;

    setExamResult({
      score_percentage: scorePct,
      is_passed: isPassed,
    });

    if (isPassed) {
      const cred = mockEngine.issueCredential(
        enrolmentId,
        currentUser.full_name,
        scorePct
      );
      setIssuedCredential(cred);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="min-h-screen bg-[#071018] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-slide-left">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to={`/student/learn/${enrolmentId}`}
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Course Lessons</span>
          </Link>
          <div className="text-xs font-mono text-slate-400">
            Candidate: <span className="text-white font-semibold">{currentUser.full_name}</span>
          </div>
        </div>

        {/* ISSUED CREDENTIAL SHOWCASE */}
        {issuedCredential ? (
          <div className="bg-surface-card border border-emerald-500/40 rounded-xl p-8 shadow-2xl space-y-8">
            <div className="text-center space-y-3 pb-6 border-b border-surface-border">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                OFFICIAL CERTIFICATION GRANTED
              </div>
              <h1 className="text-3xl font-extrabold text-white">{issuedCredential.credential_title}</h1>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Congratulations! You have satisfied all prerequisites, passed every chapter evaluation, and achieved {issuedCredential.grade_percentage}% on the comprehensive examination.
              </p>
            </div>

            {/* Certificate Canvas Box */}
            <div className="p-8 rounded-xl bg-[#101923] border-2 border-red-500/40 text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-surface-border pb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-redkross-500" />
                  <span className="font-bold text-white font-mono text-sm tracking-wider">REDKROSS RESEARCH FOUNDATION</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">VERIFIED DIPLOMA</span>
              </div>

              <div className="space-y-2 py-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">This certifies that</div>
                <div className="text-3xl font-extrabold text-white tracking-wide">{issuedCredential.student_name}</div>
                <div className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                  has demonstrated rigorous defensive proficiency in 24/7 SOC log analysis, incident triage, and forensic order of volatility and is awarded the title of
                </div>
                <div className="text-2xl font-bold text-red-400 font-mono tracking-wider pt-2">
                  {issuedCredential.credential_title}
                </div>
              </div>

              <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <div className="text-left space-y-1">
                  <div>Registry ID: <span className="text-white font-bold">{issuedCredential.verification_id}</span></div>
                  <div>Issue Date: {issuedCredential.issue_date} • Grade: {issuedCredential.grade_percentage}%</div>
                </div>

                <div className="bg-white p-2 rounded-lg">
                  <QRCodeSVG value={issuedCredential.verification_url} size={64} />
                </div>
              </div>
            </div>

            {/* Credential Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={`/verify/${issuedCredential.verification_id}`}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-white text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Award className="w-4 h-4 text-cyber-emerald" />
                <span>Open Public Verification Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download Verified PDF</span>
              </button>
            </div>
          </div>
        ) : !gateStatus.is_unlocked ? (
          /* LOCKED GATE BRIEFING */
          <div className="bg-surface-card border border-surface-border rounded-xl p-8 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-surface-border">
              <div className="w-12 h-12 rounded-xl bg-surface-100 border border-surface-border flex items-center justify-center text-slate-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{examMeta.title}</h1>
                <div className="text-xs text-rose-400 font-mono font-semibold">
                  STATUS: STRICT EVALUATION GATE LOCKED
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider">
                Missing Prerequisites to Unlock Final Certification Exam:
              </h2>
              <div className="space-y-2">
                {gateStatus.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-600/30 text-xs text-rose-300 flex items-start space-x-2.5 font-mono"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-100 border border-surface-border text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white">PRD Multi-Gate Verification Rule:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The Final Certification Examination cannot be attempted until all course modules have been completed with 100% progress, every chapter evaluation has been passed, and at least 80% of total quiz reward tokens have been earned.
              </p>
            </div>

            <Link
              to={`/student/learn/${enrolmentId}`}
              className="w-full text-center block py-3 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-xs transition-colors"
            >
              Resume Course Modules to Satisfy Gates
            </Link>
          </div>
        ) : !examStarted ? (
          /* UNLOCKED GATE — START BRIEFING */
          <div className="bg-surface-card border border-emerald-500/40 rounded-xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-surface-border">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">All Prerequisites Satisfied</div>
                <h1 className="text-2xl font-bold text-white">{examMeta.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Exam Duration</div>
                <div className="text-sm font-bold text-white">{examMeta.duration_minutes} Minutes</div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Passing Standard</div>
                <div className="text-sm font-bold text-white">{examMeta.passing_score}% Score</div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-100 border border-surface-border">
                <div className="text-[10px] text-slate-400 uppercase">Question Pool</div>
                <div className="text-sm font-bold text-white">{examMeta.total_questions} Questions</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-redkross-950/20 border border-redkross-600/30 text-xs space-y-2">
              <div className="font-bold text-redkross-400 flex items-center space-x-1.5">
                <Shield className="w-4 h-4" />
                <span>3-Strike Proctoring Standard Enforced</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Do not switch browser tabs or minimize your browser. Strike 1 triggers a warning; Strike 2 deducts 50 tokens; Strike 3 immediately aborts this exam and enforces a 24-hour evaluation lockout.
              </p>
            </div>

            <button
              onClick={handleStartFinal}
              className="w-full py-3.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-lg cyber-glow-red flex items-center justify-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Launch Comprehensive Examination</span>
            </button>
          </div>
        ) : examResult && !examResult.is_passed ? (
          /* FAILED EXAM */
          <div className="bg-surface-card border border-rose-600/40 rounded-xl p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
              <XCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Certification Standard Not Met</h2>
            <div className="text-sm font-mono text-slate-300">
              Achieved: <span className="font-bold text-white text-lg">{examResult.score_percentage}%</span> (Minimum 80% Required)
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You may review the course modules and attempt the comprehensive evaluation again.
            </p>
            <button
              onClick={() => {
                setExamResult(null);
                setExamStarted(false);
              }}
              className="px-6 py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold"
            >
              Retry Examination
            </button>
          </div>
        ) : (
          /* ACTIVE COMPREHENSIVE EXAM */
          <div className="space-y-6">
            {/* Live Timer Bar */}
            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-200 font-bold">COMPREHENSIVE FINAL CERTIFICATION EXAM</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Clock className="w-4 h-4 text-[#35E6B5]" />
                <span className="text-white font-bold tabular-nums">
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
                {timerPaused && <span className="text-rose-400 font-bold">(PAUSED)</span>}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {examMeta.questions.map((q, idx) => (
                <div key={q.id} className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white leading-relaxed">
                      {idx + 1}. {q.text}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-400 border border-surface-border flex-shrink-0">
                      {q.points} Pts
                    </span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = userAnswers[q.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
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
                {Object.keys(userAnswers).length} of {examMeta.questions.length} Questions Answered
              </span>

              <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length < examMeta.questions.length}
                className="px-6 py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 disabled:opacity-50 text-white font-semibold text-xs shadow-lg"
              >
                Submit for Final Credential Grading
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
                onClick={() => {
                  setFocusStrikeModal(null);
                  setTimerPaused(false);
                }}
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
