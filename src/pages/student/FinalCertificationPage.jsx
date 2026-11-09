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
  XCircle,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';
import RedKrossOfficialCertificate from '../../components/certificate/RedKrossOfficialCertificate';
import { downloadCertificatePdf } from '../../utils/pdfGenerator';
import ExamCBTInterface from '../../components/student/ExamCBTInterface';
import { getOrGenerateQuizQuestions, clearQuizSessionQuestions } from '../../services/db/questionBanks/questionBankEngine';

export default function FinalCertificationPage() {
  const { enrolmentId } = useParams();
  const { currentUser, refreshBalance } = useAuth();

  const [examSessionNonce, setExamSessionNonce] = useState(0);
  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;
  const baseExamMeta = course?.final_assessment;

  const examMeta = React.useMemo(() => {
    if (!baseExamMeta) return null;
    const dynamicQuestions = getOrGenerateQuizQuestions(
      enrolmentId,
      baseExamMeta.id || 'exam_cyber_final',
      course?.modules?.length || 6,
      true,
      course?.id
    );
    return {
      ...baseExamMeta,
      total_questions: dynamicQuestions.length,
      questions: dynamicQuestions
    };
  }, [baseExamMeta, enrolmentId, course?.id, course?.modules?.length, examSessionNonce]);

  const [gateStatus, setGateStatus] = useState({ is_unlocked: false, reasons: [] });
  const [examStarted, setExamStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(2700); // 45 mins
  const [timerPaused, setTimerPaused] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [examResult, setExamResult] = useState(null);
  const [issuedCredential, setIssuedCredential] = useState(null);
  const [focusStrikeModal, setFocusStrikeModal] = useState(null);
  const [activeAttemptId, setActiveAttemptId] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const [attemptsStatus, setAttemptsStatus] = useState(() => {
    try {
      return mockEngine.getQuizAttemptStatus(enrolmentId, examMeta?.id || 'mod_final');
    } catch {
      return { attemptsUsed: 0, attemptsRemaining: 3, maxAttempts: 3, isLocked: false };
    }
  });

  const [lockoutState, setLockoutState] = useState(() => {
    try {
      return mockEngine.isExamLocked(enrolmentId, examMeta?.id || 'mod_final');
    } catch {
      return { isLocked: false, remainingHours: 0, remainingMinutes: 0 };
    }
  });

  useEffect(() => {
    const refreshExamStatus = () => {
      if (enrolmentId) {
        setLockoutState(mockEngine.isExamLocked(enrolmentId, examMeta?.id || 'mod_final'));
        setAttemptsStatus(mockEngine.getQuizAttemptStatus(enrolmentId, examMeta?.id || 'mod_final'));
      }
    };
    refreshExamStatus();
    window.addEventListener('popstate', refreshExamStatus);

    const handleBeforeUnload = (e) => {
      if (examStarted && !examResult && !lockoutState.isLocked) {
        mockEngine.forfeitQuizAttempt({
          enrolmentId,
          quizId: examMeta?.id || 'mod_final',
          reason: 'BROWSER_TAB_CLOSED_MID_FINAL_EXAM'
        });
        e.preventDefault();
        e.returnValue = 'You are currently in the final exam. Leaving now will forfeit 1 attempt.';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', refreshExamStatus);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enrolmentId, examMeta?.id, examStarted, examResult, lockoutState.isLocked]);

  const handleDownloadPdf = async () => {
    if (!issuedCredential) return;
    try {
      setDownloadingPdf(true);
      const filename = `RedKross_Certificate_${issuedCredential.verification_id || 'RK'}.pdf`;
      await downloadCertificatePdf('student-final-certificate-canvas', filename);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Unable to export certificate PDF. Please retry.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  useEffect(() => {
    if (enrolmentId) {
      const status = mockEngine.checkFinalAssessmentUnlock(enrolmentId);
      setGateStatus(status);

      if (enrolment?.credential_id) {
        const cred = mockEngine.getDb().credentials.find((c) => c.id === enrolment.credential_id);
        if (cred) setIssuedCredential(cred);
      }
    }
  }, [enrolmentId]);

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
      <div className="min-h-screen bg-transparent py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Final Assessment Not Found</h2>
        <Link to="/student" className="px-4 py-2 bg-redkross-600 rounded text-white text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleStartFinal = async () => {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass && !window.__rkProctorAudioCtx) {
        window.__rkProctorAudioCtx = new AudioCtxClass();
        if (window.__rkProctorAudioCtx.state === 'suspended') {
          window.__rkProctorAudioCtx.resume().catch(() => {});
        }
      }
    } catch {}
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}
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
    const isPassed = scorePct >= (examMeta.passing_score || 80);

    mockEngine.recordQuizAttemptSubmission({
      enrolmentId,
      quizId: examMeta.id || 'mod_final',
      scorePercentage: scorePct,
      isPassed
    });

    const lock = mockEngine.isExamLocked(enrolmentId, examMeta.id || 'mod_final');
    setLockoutState(lock);
    const att = mockEngine.getQuizAttemptStatus(enrolmentId, examMeta.id || 'mod_final');
    setAttemptsStatus(att);

    setExamResult({
      score: scorePct,
      score_percentage: scorePct,
      is_passed: isPassed,
      isPassed
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
    <div className="min-h-screen bg-transparent py-12">
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
          <div className="bg-surface-card border border-[#FF7A00]/40 rounded-xl p-8 shadow-2xl space-y-8">
            <div className="text-center space-y-3 pb-6 border-b border-surface-border">
              <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs font-mono text-[#FFA439] uppercase tracking-widest font-bold">
                OFFICIAL CERTIFICATION GRANTED
              </div>
              <h1 className="text-3xl font-extrabold text-white">{issuedCredential.credential_title}</h1>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Congratulations! You have satisfied all prerequisites, passed every chapter evaluation, and achieved {issuedCredential.grade_percentage}% on the comprehensive examination.
              </p>
            </div>

            {/* Authentic Institutional Certificate Display Canvas */}
            <div className="py-2 flex justify-center">
              <RedKrossOfficialCertificate
                credential={issuedCredential}
                containerId="student-final-certificate-canvas"
                className="max-w-[760px] shadow-[0_0_40px_rgba(255,122,0,0.15)] rounded-2xl"
              />
            </div>

            {/* Credential Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-surface-border">
              <Link
                to={`/verify/${issuedCredential.verification_id}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
              >
                <Award className="w-4 h-4 text-[#FFA439]" />
                <span>Open Public Verification Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                disabled={downloadingPdf}
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all cursor-pointer disabled:opacity-60"
              >
                {downloadingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#071018]" />
                    <span>Generating Official PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF Certificate</span>
                  </>
                )}
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
          <div className="bg-surface-card border border-[#FF7A00]/40 rounded-xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-surface-border">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#FFA439] font-bold uppercase">All Prerequisites Satisfied</div>
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
        ) : (
          /* ACTIVE CBT WIREFRAME EXAMINATION (MODULESIE & COURSE ENDING EXAM) */
          <ExamCBTInterface
            quiz={examMeta}
            enrolmentId={enrolmentId}
            isFinalExam={true}
            timerSeconds={timerSeconds}
            attemptsStatus={attemptsStatus}
            answers={userAnswers}
            onSelectAnswer={(qId, optId) => setUserAnswers((prev) => ({ ...prev, [qId]: optId }))}
            onSubmitExam={handleSubmit}
            isSubmitted={Boolean(examResult)}
            submissionResult={examResult}
            onRetakeExam={() => {
              clearQuizSessionQuestions(enrolmentId, examMeta?.id || 'exam_cyber_final', course?.id);
              setExamResult(null);
              setExamStarted(false);
              setUserAnswers({});
              setExamSessionNonce((prev) => prev + 1);
              setTimerSeconds(examMeta?.duration_minutes ? examMeta.duration_minutes * 60 : 3600);
            }}
            isLockoutActive={lockoutState.isLocked}
            lockoutCountdown={{
              hours: lockoutState.remainingHours || 0,
              minutes: lockoutState.remainingMinutes || 0,
              seconds: 0
            }}
          />
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
