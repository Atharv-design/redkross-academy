import React from 'react';
import {
  AlertTriangle,
  Download,
  FileCheck,
  Loader2,
  Send,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { FileUploadProgressBar } from '../../../components/application/file-upload/FileUploadProgressBar';
import { renderMarkdownToHtml } from '../../../utils/markdownParser';
import { MODULE_1_BLOCK_NOTES } from '../../../services/db/module1BlockNotes';

const BlockNoteLessonViewer = React.lazy(() => import('../../../components/student/BlockNoteLessonViewer'));
const ExamCBTInterface = React.lazy(() => import('../../../components/student/ExamCBTInterface'));

function LessonContentPanel({
  activeUnit,
  activeLesson,
  activeQuiz,
  activeTab,
  setActiveTab,
  isAssignment,
  handleDownloadChapterNotes,
  setLightboxImage,
  handleDownloadAdminPdf,
  submittingPdf,
  uploadingFileName,
  setUploadingFileName,
  uploadingDataUrl,
  setUploadingDataUrl,
  confirmAssignmentSubmit,
  assignmentSubmission,
  enrolmentId,
  examTimeRemaining,
  attemptsStatus,
  quizAnswers,
  handleSelectQuizOption,
  handleSubmitQuiz,
  quizSubmitted,
  quizResult,
  handleRetakeExam,
  isLockoutActive,
  lockoutCountdown,
  onReturnToReview
}) {
  const memoizedHtml = React.useMemo(() => {
    return renderMarkdownToHtml(activeLesson?.content || 'Defensive laboratory briefing and operational objectives.');
  }, [activeLesson?.id, activeLesson?.content]);
  return (
    <div className="w-full space-y-6">
      {/* 24-HOUR ANTI-CHEAT PROCTOR LOCKDOWN HUD (LESSON UNITS) */}
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
              onClick={onReturnToReview}
              className="px-4 py-2 rounded bg-black/80 hover:bg-black text-gray-200 border border-gray-700 transition-colors cursor-pointer"
            >
              Return to Curriculum Review
            </button>
          </div>
        </div>
      )}

      {/* 1. INSTRUCTIONAL LESSON UNIT */}
      {activeUnit?.type === 'lesson' && activeLesson && (
        <div className="space-y-6">
          {/* Sub-Tabs: Notes vs Assignment */}
          <div className="flex items-center justify-between border-b border-[#FF7A00]/20 pb-2">
            <div className="flex items-center space-x-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`pb-2 border-b-2 font-bold transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-[#FF7A00] text-[#FF7A00]'
                    : 'border-transparent text-[#A3907C] hover:text-white'
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
                      ? 'border-[#FF7A00] text-[#FF7A00]'
                      : 'border-transparent text-[#A3907C] hover:text-white'
                  }`}
                >
                  PDF Laboratory Submission
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadChapterNotes}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#FF7A00]/30 bg-[#1A1208] text-[#FF7A00] hover:bg-[#FF7A00]/20 text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Study Notes</span>
            </button>
          </div>

          {/* Tab 1: Chapter Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {MODULE_1_BLOCK_NOTES && MODULE_1_BLOCK_NOTES[activeLesson.id] ? (
                <React.Suspense fallback={<div className="p-4 text-xs font-mono text-slate-500 animate-pulse">Loading notes viewer...</div>}>
                  <BlockNoteLessonViewer
                    lessonId={activeLesson.id}
                    initialBlocks={MODULE_1_BLOCK_NOTES[activeLesson.id]}
                    lessonTitle={activeLesson.title}
                  />
                </React.Suspense>
              ) : (
                <div
                  onClick={(e) => {
                    if (e.target.tagName === 'IMG') {
                      setLightboxImage({
                        url: e.target.src,
                        caption: e.target.alt,
                        name: e.target.alt || 'Instructional Diagram'
                      });
                    }
                  }}
                  className="cyber-glass-panel p-6 sm:p-10 rounded-2xl border border-[#FF7A00]/25 min-h-[400px] overflow-visible prose prose-invert prose-sm sm:prose-base max-w-none cursor-default"
                >
                  <div
                    style={{ contentVisibility: 'auto' }}
                    dangerouslySetInnerHTML={{
                      __html: memoizedHtml
                    }}
                  />
                </div>
              )}

              {/* Admin Attached PDF Reference Resources */}
              {activeLesson.pdf_resources && activeLesson.pdf_resources.length > 0 && (
                <div className="p-4 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-2">
                  <span className="text-xs font-mono font-bold text-[#FF7A00] block">
                    Official Chapter Reference Documents (.pdf):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeLesson.pdf_resources.map((res, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleDownloadAdminPdf(res)}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E1308] border border-[#FF7A00]/30 text-xs font-mono text-[#E2D9CE] hover:text-white transition-colors cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5 text-[#FF7A00]" />
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
            <div className="cyber-glass-panel p-6 rounded-2xl border border-[#FF7A00]/25 space-y-5 shadow-2xl">
              <div className="border-b border-[#FF7A00]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-[#FF7A00]" />
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
                <span className="text-[11px] font-mono text-[#A3907C]">
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
                      ? 'bg-[#FF7A00] text-[#071018] hover:bg-[#FFA439] shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                      : 'bg-[#1A1208] text-[#8BA2B5] border border-white/10 opacity-50 cursor-not-allowed'
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
                <div className="p-4 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/30 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF7A00] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                      <span>Verified Lab Submission On File</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      assignmentSubmission.status === 'passed'
                        ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30'
                        : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                    }`}>
                      {assignmentSubmission.status}
                    </span>
                  </div>
                  <p className="text-white truncate font-medium">{assignmentSubmission.file_name}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#A3907C] pt-1 border-t border-white/5">
                    <span>Submitted: {new Date(assignmentSubmission.submitted_at).toLocaleDateString()}</span>
                    {assignmentSubmission.grade && (
                      <span className="text-white font-bold">Grade: {assignmentSubmission.grade}%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. EVALUATION & EXAMINATION ENGINE (CBT FORMAT) */}
      {(activeUnit?.type === 'quiz' || activeUnit?.type === 'final_exam') && activeQuiz && (
        <React.Suspense fallback={<div className="p-8 text-center text-sm font-mono text-[#65F58A] animate-pulse">Initializing CBT Examination Suite...</div>}>
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
        </React.Suspense>
      )}
    </div>
  );
}

export default React.memo(LessonContentPanel);
