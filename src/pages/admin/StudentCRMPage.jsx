import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Award, BookOpen, Clock, Shield, CheckCircle2, ChevronLeft, RefreshCw, Coins } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function StudentCRMPage() {
  const { currentUser } = useAuth();
  const students = mockEngine.getUsers().filter((u) => u.role === 'student');
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(students[0] || null);

  // Manual Cooldown Reset Modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetReason, setResetReason] = useState('');
  const [resetSuccess, setResetSuccess] = useState(null);

  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const enrolments = selectedStudent ? mockEngine.getEnrolmentsForUser(selectedStudent.id) : [];

  const handleManualCooldownReset = (enrolmentId, quizId) => {
    if (!resetReason.trim()) {
      alert('PRD Security Policy: A valid operational reason is required for audit logs.');
      return;
    }

    const adminEmail = currentUser?.email || 'admin@redkross.org.in';
    const success = mockEngine.adminResetCooldown(enrolmentId, quizId, resetReason, adminEmail);

    if (success) {
      setResetSuccess('Cooldown successfully cleared! Attempt counter reset.');
      setShowResetModal(false);
      setResetReason('');
      setTimeout(() => setResetSuccess(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Operations Console</span>
          </Link>
          <div className="text-xs font-mono text-slate-400">
            Console: <span className="text-white font-semibold">Student Operations & CRM</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Users className="w-6 h-6 text-cyber-cyan" />
              <span>Student Operations Directory</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Inspect student progression, token balance, and execute administrative overrides.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface-card border border-surface-border rounded-lg text-xs text-white placeholder-slate-400 font-mono focus:outline-none focus:border-redkross-500"
            />
          </div>
        </div>

        {resetSuccess && (
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{resetSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Candidate Directory (Left Column) */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-2 shadow-lg">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
              Registered Students ({filtered.length})
            </div>

            <div className="space-y-1.5">
              {filtered.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                const tokenBal = mockEngine.getTokenBalance(student.id);

                return (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-surface-100 border-cyber-cyan shadow'
                        : 'bg-surface-card border-surface-border hover:bg-surface-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <img
                        src={student.avatar}
                        alt={student.full_name}
                        className="w-8 h-8 rounded-full border border-slate-600 object-cover"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">{student.full_name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{student.email}</div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 text-xs font-mono text-amber-400 font-bold">
                      {tokenBal} T
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Profile & Progress Inspector (Right 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {selectedStudent ? (
              <div className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-xl space-y-6">
                {/* Profile Banner */}
                <div className="flex items-center space-x-4 pb-6 border-b border-surface-border">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.full_name}
                    className="w-16 h-16 rounded-xl border border-slate-600 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedStudent.full_name}</h2>
                    <div className="text-xs text-slate-400 font-mono">{selectedStudent.email}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{selectedStudent.headline}</div>
                  </div>
                </div>

                {/* Candidate Enrolments */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Active Enrolments & Progress Inspections
                  </h3>

                  {enrolments.map((enr) => {
                    const crs = mockEngine.getCourseById(enr.course_id);
                    const progress = mockEngine.getCourseProgress(enr.id);

                    return (
                      <div
                        key={enr.id}
                        className="p-5 rounded-xl bg-surface-100 border border-surface-border space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-bold text-white mb-0.5">{crs?.title}</div>
                            <div className="text-[11px] font-mono text-slate-400">
                              Enrolled: {new Date(enr.enrolled_at).toLocaleDateString()} • Version: v{enr.course_version}
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-redkross-400 tabular-nums">
                            {progress.percentage}% Complete
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 rounded-full bg-surface-card overflow-hidden">
                          <div
                            className="h-full bg-redkross-600 rounded-full"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-2 border-t border-surface-border/60">
                          <div className="text-slate-400">
                            Passed Quizzes: <span className="text-white font-bold">{enr.passed_quizzes.length}</span>
                          </div>

                          {/* Cooldown Reset Action */}
                          <button
                            onClick={() => {
                              setShowResetModal(true);
                            }}
                            className="px-3 py-1.5 rounded bg-surface-card hover:bg-surface-50 border border-surface-border text-slate-300 text-xs font-mono flex items-center space-x-1.5 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-cyber-cyan" />
                            <span>Manual 24h Cooldown Reset</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-surface-card border border-surface-border rounded-xl text-slate-400 text-xs font-mono">
                Select a student from the directory to inspect records.
              </div>
            )}
          </div>
        </div>

        {/* Cooldown Reset Modal */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-cyber-cyan" />
                <span>Administrative Cooldown Override</span>
              </h3>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                Resetting the evaluation lock allows the student to immediately bypass the 24-hour waiting window and consume a fresh 3-attempt cycle. This action is permanently recorded in system audit logs.
              </p>

              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Audit Reason (Required):</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Verified legitimate network disconnection during exam..."
                  value={resetReason}
                  onChange={(e) => setResetReason(e.target.value)}
                  className="w-full p-2.5 bg-surface-100 border border-surface-border rounded text-white text-xs focus:outline-none focus:border-redkross-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleManualCooldownReset(enrolments[0]?.id, 'quiz_mod_1')}
                  className="px-4 py-2 rounded bg-cyber-cyan text-slate-950 font-bold hover:bg-cyan-400 shadow"
                >
                  Confirm & Clear Lockout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
