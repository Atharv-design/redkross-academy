import React, { useState, useEffect } from 'react';
import {
  HelpCircle, Plus, Search, Filter, CheckCircle2, XCircle,
  AlertTriangle, Clock, ShieldAlert, Award, FileQuestion,
  ChevronRight, Eye, Edit3, Trash2, Check, Sparkles, RefreshCw
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('questions'); // questions | attempts
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Question Editor state
  const [questionForm, setQuestionForm] = useState({
    prompt: '',
    type: 'single_choice', // single_choice | multiple_choice | true_false | short_text | code_analysis
    points: 10,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct_answer: 'Option A',
    explanation: ''
  });

  // Mock attempts data for proctoring & score override
  const [attempts, setAttempts] = useState([
    {
      id: 'ATT-9021',
      student_name: 'Vikram Mehta',
      student_email: 'vikram.mehta@redkross.org.in',
      score: 85,
      total_score: 100,
      passed: true,
      submitted_at: '2026-10-28 14:22',
      proctoring_flags: 0,
      status: 'GRADED'
    },
    {
      id: 'ATT-9022',
      student_name: 'Ananya Sharma',
      student_email: 'ananya.sharma@cyberops.in',
      score: 65,
      total_score: 100,
      passed: false,
      submitted_at: '2026-10-29 09:15',
      proctoring_flags: 2,
      status: 'FLAGGED_REVIEW'
    },
    {
      id: 'ATT-9023',
      student_name: 'Rohan Deshmukh',
      student_email: 'rohan.d@defence-lab.in',
      score: 95,
      total_score: 100,
      passed: true,
      submitted_at: '2026-10-29 11:40',
      proctoring_flags: 0,
      status: 'GRADED'
    }
  ]);

  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [overrideScore, setOverrideScore] = useState('');
  const [overrideReason, setOverrideReason] = useState('');

  // Initial load
  useEffect(() => {
    try {
      const db = mockEngine.getDb();
      // Gather quizzes or seed default ones if none exist
      const loaded = [
        {
          id: 'QUIZ-DEF-01',
          title: 'Threat Detection & SIEM Telemetry Assessment',
          course_title: 'SOC Analyst L1 & L2 Defensive Operations',
          passing_score: 80,
          time_limit_mins: 25,
          shuffle_questions: true,
          anti_cheat_lock: true,
          questions: [
            {
              id: 'Q-1',
              prompt: 'Which Windows Event ID explicitly indicates a successful account logon?',
              type: 'single_choice',
              points: 10,
              options: ['Event ID 4624', 'Event ID 4625', 'Event ID 4672', 'Event ID 4720'],
              correct_answer: 'Event ID 4624',
              explanation: 'Windows Security Event ID 4624 documents every successful logon session.'
            },
            {
              id: 'Q-2',
              prompt: 'Select all protocols that transmit credentials in cleartext by default without TLS:',
              type: 'multiple_choice',
              points: 15,
              options: ['FTP', 'Telnet', 'HTTP', 'SSH'],
              correct_answer: ['FTP', 'Telnet', 'HTTP'],
              explanation: 'FTP, Telnet, and HTTP transmit payload and credentials in unencrypted plaintext.'
            },
            {
              id: 'Q-3',
              prompt: 'True or False: Kerberoasting requires administrative privileges on the target domain controller to execute.',
              type: 'true_false',
              points: 10,
              options: ['True', 'False'],
              correct_answer: 'False',
              explanation: 'Kerberoasting can be executed by any authenticated domain user without elevated privileges.'
            },
            {
              id: 'Q-4',
              prompt: 'Analyze this Snort rule and identify the destination port: alert tcp any any -> 192.168.1.0/24 445 (msg:"SMB probe"; sid:10001;)',
              type: 'code_analysis',
              points: 15,
              options: [],
              correct_answer: '445',
              explanation: 'Port 445 is specified as the destination port for Microsoft-DS SMB traffic.'
            }
          ]
        },
        {
          id: 'QUIZ-OFF-02',
          title: 'Network Penetration & Tunneling Mastery Exam',
          course_title: 'Offensive Exploitation & Active Directory Attacks',
          passing_score: 75,
          time_limit_mins: 40,
          shuffle_questions: true,
          anti_cheat_lock: true,
          questions: [
            {
              id: 'Q-201',
              prompt: 'What chisel command parameter creates a reverse SOCKS5 proxy tunnel back to the attacking machine?',
              type: 'short_text',
              points: 20,
              options: [],
              correct_answer: 'R:socks',
              explanation: 'R:socks tells the chisel server to listen on socks port and reverse tunnel traffic.'
            }
          ]
        }
      ];
      setQuizzes(loaded);
      setSelectedQuiz(loaded[0]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOpenQuestionModal = (q = null) => {
    if (q) {
      setEditingQuestion(q);
      setQuestionForm({
        prompt: q.prompt,
        type: q.type || 'single_choice',
        points: q.points || 10,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: q.correct_answer || 'Option A',
        explanation: q.explanation || ''
      });
    } else {
      setEditingQuestion(null);
      setQuestionForm({
        prompt: '',
        type: 'single_choice',
        points: 10,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: 'Option A',
        explanation: ''
      });
    }
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = () => {
    if (!questionForm.prompt || !selectedQuiz) return;

    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = selectedQuiz.questions.map((q) =>
        q.id === editingQuestion.id ? { ...q, ...questionForm } : q
      );
    } else {
      const newQ = {
        id: 'Q-' + Date.now().toString(36).toUpperCase(),
        ...questionForm
      };
      updatedQuestions = [...selectedQuiz.questions, newQ];
    }

    const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };
    setSelectedQuiz(updatedQuiz);
    setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q)));
    setQuestionModalOpen(false);

    mockEngine.logAction({
      action: 'QUIZ_QUESTION_MUTATION',
      category: 'COURSE_MUTATION',
      details: `Admin updated question bank for quiz: ${selectedQuiz.title}`,
      severity: 'INFO'
    });
  };

  const handleDeleteQuestion = (qId) => {
    if (!confirm('Delete this question from the question bank?')) return;
    const updatedQuestions = selectedQuiz.questions.filter((q) => q.id !== qId);
    const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };
    setSelectedQuiz(updatedQuiz);
    setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q)));
  };

  const handleScoreOverride = () => {
    if (!selectedAttempt || overrideScore === '') return;
    const newScore = parseInt(overrideScore);
    const passed = newScore >= (selectedQuiz?.passing_score || 75);

    setAttempts((prev) =>
      prev.map((att) =>
        att.id === selectedAttempt.id
          ? {
              ...att,
              score: newScore,
              passed,
              status: 'OVERRIDDEN_BY_ADMIN'
            }
          : att
      )
    );

    mockEngine.logAction({
      action: 'PROCTORING_SCORE_OVERRIDE',
      category: 'STUDENT_ADMIN',
      details: `Admin manually adjusted attempt ${selectedAttempt.id} score to ${newScore}%. Reason: ${overrideReason}`,
      severity: 'WARN'
    });

    setOverrideModalOpen(false);
    setSelectedAttempt(null);
    setOverrideScore('');
    setOverrideReason('');
  };

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Banner & Quiz Switcher */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <label className="text-xs font-mono text-[#8BA2B5]">ACTIVE QUIZ CONTEXT:</label>
          <select
            value={selectedQuiz?.id || ''}
            onChange={(e) => {
              const q = quizzes.find((x) => x.id === e.target.value);
              if (q) setSelectedQuiz(q);
            }}
            className="cyber-glass-card text-xs font-bold text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#65F58A]"
          >
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title} ({q.questions?.length || 0} Questions)
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 cyber-glass-card p-1 rounded-lg">
            <button
              onClick={() => setViewMode('questions')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'questions'
                  ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              QUESTION BANK ({selectedQuiz?.questions?.length || 0})
            </button>
            <button
              onClick={() => setViewMode('attempts')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'attempts'
                  ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              STUDENT ATTEMPTS ({attempts.length})
            </button>
          </div>

          <button
            onClick={() => handleOpenQuestionModal()}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      {viewMode === 'questions' ? (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Question Rules & Proctoring Parameters */}
          <div className="col-span-4 space-y-4">
            <div className="cyber-glass-panel rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white font-lora">Integrity & Passing Policy</h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-[#1B2530]">
                  <span className="text-[#8BA2B5]">Pass Threshold</span>
                  <span className="text-[#65F58A] font-bold">{selectedQuiz?.passing_score}% Minimum</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1B2530]">
                  <span className="text-[#8BA2B5]">Time Limit</span>
                  <span className="text-white">{selectedQuiz?.time_limit_mins} Minutes</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1B2530]">
                  <span className="text-[#8BA2B5]">Question Shuffling</span>
                  <span className="text-[#65F58A]">ENABLED</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1B2530]">
                  <span className="text-[#8BA2B5]">Proctoring Anti-Cheat</span>
                  <span className="text-[#65F58A]">FULL SCREEN LOCK</span>
                </div>
              </div>

              <div className="p-3 cyber-glass-card rounded-lg">
                <div className="flex items-center space-x-2 text-[#F59E0B] text-xs font-bold mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Proctoring Lockdown Active</span>
                </div>
                <p className="text-[11px] text-[#8BA2B5] leading-relaxed">
                  Students taking this exam will trigger an incident alert if they switch browser tabs, lose window focus, or resize screens during the timed window.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Question Bank Cards */}
          <div className="col-span-8 space-y-3">
            {selectedQuiz?.questions?.map((q, idx) => (
              <div
                key={q.id || idx}
                className="cyber-glass-panel hover:border-[#263440] p-4 rounded-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-xs font-mono font-bold text-[#65F58A] bg-[#1B2530] px-2 py-1 rounded border border-[#263440]">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30">
                          {q.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-[#8BA2B5]">
                          {q.points} PTS
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white mb-2">{q.prompt}</p>

                      {/* Options rendering */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = Array.isArray(q.correct_answer)
                              ? q.correct_answer.includes(opt)
                              : q.correct_answer === opt;
                            return (
                              <div
                                key={oIdx}
                                className={`text-xs px-2.5 py-1.5 rounded border font-mono flex items-center justify-between ${
                                  isCorrect
                                    ? 'bg-[#65F58A]/10 border-[#65F58A]/40 text-[#65F58A]'
                                    : 'bg-[#071018] border-[#1B2530] text-[#8BA2B5]'
                                }`}
                              >
                                <span>{opt}</span>
                                {isCorrect && <Check className="w-3.5 h-3.5 text-[#65F58A]" />}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {q.explanation && (
                        <div className="mt-2 text-[11px] font-mono text-[#8BA2B5] bg-[#071018] p-2 rounded border border-[#1B2530]">
                          <span className="text-[#65F58A]">Rationale:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 ml-4">
                    <button
                      onClick={() => handleOpenQuestionModal(q)}
                      className="p-1.5 text-[#8BA2B5] hover:text-[#65F58A] bg-[#071018] rounded border border-[#1B2530]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-[#8BA2B5] hover:text-[#EF4444] bg-[#071018] rounded border border-[#1B2530]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Attempts Hub with Proctoring Review and Override */
        <div className="cyber-glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1B2530] bg-[#0A121A] text-[11px] font-mono text-[#8BA2B5]">
                <th className="p-3.5">ATTEMPT ID</th>
                <th className="p-3.5">STUDENT / EMAIL</th>
                <th className="p-3.5">SCORE</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5">PROCTORING FLAGS</th>
                <th className="p-3.5">SUBMISSION TIME</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-[#071018]/50">
                  <td className="p-3.5 text-[#65F58A] font-bold">{att.id}</td>
                  <td className="p-3.5">
                    <div className="text-white font-sans font-medium">{att.student_name}</div>
                    <div className="text-[10px] text-[#8BA2B5]">{att.student_email}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-sm font-bold ${
                        att.passed ? 'text-[#65F58A]' : 'text-[#EF4444]'
                      }`}
                    >
                      {att.score}%
                    </span>
                    <span className="text-[#8BA2B5] text-[10px]"> / 100%</span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        att.passed
                          ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                          : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                      }`}
                    >
                      {att.passed ? 'PASSED' : 'NEEDS_REMEDY'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {att.proctoring_flags > 0 ? (
                      <span className="flex items-center space-x-1 text-[#F59E0B] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{att.proctoring_flags} Incidents</span>
                      </span>
                    ) : (
                      <span className="text-[#65F58A]">Clean (0)</span>
                    )}
                  </td>
                  <td className="p-3.5 text-[#8BA2B5]">{att.submitted_at}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedAttempt(att);
                        setOverrideScore(att.score.toString());
                        setOverrideReason('');
                        setOverrideModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-[#1B2530] text-[#CBD5E1] hover:text-[#65F58A] border border-[#263440] rounded text-[11px]"
                    >
                      Override Score
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Question Editor Modal */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[650px] cyber-glass-panel rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-4 font-lora">
              {editingQuestion ? 'Edit Question Formulation' : 'Create Question'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Question Prompt *
                </label>
                <textarea
                  rows={3}
                  value={questionForm.prompt}
                  onChange={(e) => setQuestionForm({ ...questionForm, prompt: e.target.value })}
                  placeholder="Formulate the assessment question..."
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                    Question Type
                  </label>
                  <select
                    value={questionForm.type}
                    onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="single_choice">Single Choice (Radio)</option>
                    <option value="multiple_choice">Multiple Choice (Checkboxes)</option>
                    <option value="true_false">True / False</option>
                    <option value="short_text">Short Text Response</option>
                    <option value="code_analysis">Code / Packet Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">Point Value</label>
                  <input
                    type="number"
                    value={questionForm.points}
                    onChange={(e) => setQuestionForm({ ...questionForm, points: parseInt(e.target.value) || 10 })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {(questionForm.type === 'single_choice' || questionForm.type === 'multiple_choice') && (
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#8BA2B5] block">Options</label>
                  {questionForm.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const nextOpts = [...questionForm.options];
                          nextOpts[i] = e.target.value;
                          setQuestionForm({ ...questionForm, options: nextOpts });
                        }}
                        className="flex-1 cyber-glass-card rounded p-2 text-xs text-white"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-mono text-[#65F58A] block mt-2">
                      Exact Correct Option
                    </label>
                    <input
                      type="text"
                      value={questionForm.correct_answer}
                      onChange={(e) => setQuestionForm({ ...questionForm, correct_answer: e.target.value })}
                      className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Explanatory Rationale (Shown after submission)
                </label>
                <textarea
                  rows={2}
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  placeholder="Provide reference RFC, CVE or architecture note."
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setQuestionModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuestion}
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Save Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Score Override Modal */}
      {overrideModalOpen && selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[480px] cyber-glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 font-lora">Manual Score Override</h3>
            <p className="text-xs text-[#8BA2B5] mb-4">
              Overriding student score for attempt <strong className="text-white">{selectedAttempt.id}</strong> ({selectedAttempt.student_name}).
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Updated Percentage Score (0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(e.target.value)}
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Audit Log Rationale / Justification *
                </label>
                <textarea
                  rows={3}
                  required
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="e.g. Student provided valid manual packet dissection in offline appeals."
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setOverrideModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScoreOverride}
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Apply & Log Override
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

