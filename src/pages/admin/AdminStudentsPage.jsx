import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, ShieldCheck, ShieldAlert, Coins,
  RotateCcw, Download, Eye, CheckCircle2, XCircle, ArrowUpRight,
  UserX, UserCheck, Sparkles, ExternalLink, Trash2
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(100);
  const [tokenAction, setTokenAction] = useState('GRANT'); // GRANT | DEDUCT
  const [tokenReason, setTokenReason] = useState('Merit bounty for lab excellence');

  // Permanent Delete Modal State
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const loadStudents = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.users) {
        // Filter users that are students
        const studentList = db.users.filter((u) => u.role === 'student' || !u.role);
        setStudents(studentList);
        if (studentList.length > 0 && !selectedStudent) {
          setSelectedStudent(studentList[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStudents();

    const unsubscribe = mockEngine.subscribe((event) => {
      if (
        event.type === 'USER_STATUS_MUTATED' ||
        event.type === 'USER_PURGED' ||
        event.type === 'USER_UPDATED' ||
        event.type === 'TOKEN_MUTATED' ||
        event.type === 'DB_MUTATED'
      ) {
        loadStudents();
      }
    });

    return () => unsubscribe();
  }, []);

  // Permanent student deletion with email blacklisting
  const handleConfirmPermanentDelete = () => {
    if (!studentToDelete) return;
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;

    try {
      mockEngine.permanentlyDeleteStudent(studentToDelete.id, studentToDelete.email);
      setStudentToDelete(null);
      setDeleteConfirmText('');
      loadStudents();
      if (selectedStudent?.id === studentToDelete.id) {
        setSelectedStudent(null);
      }
    } catch (e) {
      console.error('Failed to permanently delete student:', e);
      alert('Error deleting student account: ' + e.message);
    }
  };

  const persistStudents = (updatedUsers) => {
    try {
      const db = mockEngine.getDb();
      db.users = updatedUsers;
      mockEngine.saveDb(db, {
        type: 'USER_UPDATED',
        payload: { users: updatedUsers }
      });
      setStudents(updatedUsers.filter((u) => u.role === 'student' || !u.role));
      if (selectedStudent) {
        const refreshed = updatedUsers.find((u) => u.id === selectedStudent.id);
        if (refreshed) setSelectedStudent(refreshed);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Suspend / Reactivate account
  const handleToggleStatus = (student) => {
    const isSuspended = student.status === 'SUSPENDED';
    const nextStatus = isSuspended ? 'ACTIVE' : 'SUSPENDED';

    try {
      mockEngine.setUserAccountStatus(student.id, nextStatus, `Admin toggled status to ${nextStatus}`);
      loadStudents();
    } catch (e) {
      console.error(e);
    }
  };

  // Adjust token balance
  const handleAdjustTokens = () => {
    if (!selectedStudent || !tokenAmount) return;
    const delta = tokenAction === 'GRANT' ? parseInt(tokenAmount) : -parseInt(tokenAmount);

    try {
      mockEngine.grantTokens(selectedStudent.id, delta, tokenReason);
      loadStudents();

      setTokenModalOpen(false);
      setTokenAmount(100);
      setTokenReason('Merit bounty for lab excellence');
    } catch (e) {
      console.error(e);
    }
  };

  // Reset student curriculum progress
  const handleResetProgress = (student) => {
    if (confirm(`Reset all curriculum lab progress for ${student.name}? This will zero out completion telemetry.`)) {
      try {
        const db = mockEngine.getDb();
        if (db.enrolments) {
          db.enrolments = db.enrolments.map((enr) =>
            enr.user_id === student.id
              ? { ...enr, progress: 0, completed_lessons: [], current_lesson_id: null }
              : enr
          );
        }
        mockEngine.saveDb(db);

        mockEngine.logAction({
          action: 'STUDENT_PROGRESS_RESET',
          category: 'STUDENT_ADMIN',
          details: `Admin reset all curriculum progress for student ${student.email}`,
          severity: 'WARN'
        });

        alert(`Progress reset for ${student.name}.`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Status,Tokens,Role,Created_At\n'];
    const rows = students.map(
      (s) =>
        `"${s.id}","${s.name}","${s.email}","${s.status || 'ACTIVE'}","${s.token_balance || 0}","${s.role}","${s.created_at || '2026-10-01'}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redkross_students_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name?.toLowerCase().includes(q) ||
      s.full_name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.cadet_id?.toLowerCase().includes(q) ||
      s.id?.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && s.status !== 'SUSPENDED') ||
      (statusFilter === 'SUSPENDED' && s.status === 'SUSPENDED');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Filter and Actions */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/60">
        <div className="flex items-center space-x-3">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-[#B8E6CE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full cyber-glass-card text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          <div className="flex items-center space-x-1 cyber-glass-card p-1 rounded-lg">
            {['ALL', 'ACTIVE', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  statusFilter === st
                    ? 'bg-[#0a261a] text-[#65F58A] font-bold border border-[#65F58A]/30'
                    : 'text-[#B8E6CE] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0a261a]/60 text-[#C9EFE0] hover:text-[#65F58A] border border-[#65F58A]/30 font-mono text-xs rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Main Dual-Pane Roster & Inspector */}
      <div className="grid grid-cols-12 gap-6 min-h-[650px]">
        {/* Left Column: Student Directory Table */}
        <div className="col-span-8 cyber-glass-panel rounded-xl overflow-hidden flex flex-col border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/60">
          <div className="p-3.5 bg-[#071912]/80 border-b border-[#65F58A]/20 flex items-center justify-between">
            <span className="text-xs font-mono text-[#B8E6CE]">
              STUDENT DIRECTORY ROSTER ({filteredStudents.length})
            </span>
            <span className="text-[10px] font-mono text-[#65F58A]">Identity Synchronized</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#65F58A]/20 bg-[#05140e]/60 text-[10px] font-mono text-[#B8E6CE]">
                  <th className="p-3">CADET ID</th>
                  <th className="p-3">STUDENT</th>
                  <th className="p-3">ACCOUNT STATUS</th>
                  <th className="p-3">TOKEN BALANCE</th>
                  <th className="p-3">ENROLLED</th>
                  <th className="p-3 text-right">QUICK ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#65F58A]/15 text-xs font-mono">
                {filteredStudents.map((st) => {
                  const isSelected = selectedStudent?.id === st.id;
                  const isSuspended = st.status === 'SUSPENDED';

                  return (
                    <tr
                      key={st.id}
                      onClick={() => setSelectedStudent(st)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#0c2e1f]/70' : 'hover:bg-[#071912]/40'
                      }`}
                    >
                      <td className="p-3">
                        <span className="font-mono text-xs font-bold text-[#65F58A] bg-[#081a13] px-2 py-0.5 rounded border border-[#65F58A]/30">
                          {st.cadet_id || 'RK-89421'}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full cyber-glass-card flex items-center justify-center font-bold text-white text-xs">
                            {st.name?.charAt(0) || st.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="text-white font-lora font-medium">{st.name || st.full_name}</div>
                            <div className="text-[10px] text-[#B8E6CE]">{st.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isSuspended
                              ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                              : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                          }`}
                        >
                          {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="text-[#65F58A] font-bold">
                          {st.token_balance || 0} ⚡
                        </span>
                      </td>

                      <td className="p-3 text-[#C9EFE0]">
                        {st.enrolled_count || 2} Tracks
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(st);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                              isSuspended
                                ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
                                : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/20'
                            }`}
                          >
                            {isSuspended ? 'Reactivate' : 'Suspend'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStudentToDelete(st);
                              setDeleteConfirmText('');
                            }}
                            className="p-1 rounded text-[10px] font-mono border bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/25 transition-colors"
                            title="Permanently Delete Cadet Account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Detailed Student Inspector Drawer */}
        <div className="col-span-4 cyber-glass-panel rounded-xl flex flex-col overflow-hidden border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/60">
          {selectedStudent ? (
            <>
              <div className="p-5 border-b border-[#65F58A]/20 bg-[#071912]/80">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#0a261a] border border-[#65F58A]/40 flex items-center justify-center text-lg font-bold text-white">
                    {selectedStudent.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-lora">
                      {selectedStudent.name}
                    </h3>
                    <span className="text-xs font-mono text-[#B8E6CE]">
                      {selectedStudent.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#65F58A]/20">
                  <span className="text-[#65F58A] font-bold">
                    CADET ID: {selectedStudent.cadet_id || 'RK-89421'}
                  </span>
                  <a
                    href={`/verify/${selectedStudent.cadet_id || 'RK-89421'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-[#65F58A] hover:underline"
                    title="Open Cadet's Public Verification Dossier"
                  >
                    <span>Public Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-5 text-xs font-mono">
                {/* Token Balance Card */}
                <div className="p-4 cyber-glass-card rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#B8E6CE] block">ACADEMIC UTILITY TOKENS</span>
                    <span className="text-xl font-bold text-[#65F58A] mt-0.5 block">
                      {selectedStudent.token_balance || 0} TOKENS
                    </span>
                  </div>
                  <button
                    onClick={() => setTokenModalOpen(true)}
                    className="px-3 py-1.5 bg-[#0a261a] text-[#65F58A] hover:bg-[#65F58A]/20 border border-[#65F58A]/30 rounded text-[11px] font-bold"
                  >
                    Adjust Balance
                  </button>
                </div>

                {/* Academic Enrollment Progress */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#B8E6CE] block">
                    ACTIVE CURRICULUM ENROLLMENT
                  </span>
                  <div className="p-3 cyber-glass-card rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-lora font-medium">SOC Analyst L1 & L2</span>
                      <span className="text-[#65F58A]">75% Done</span>
                    </div>
                    <div className="w-full bg-[#0a261a] h-1.5 rounded-full overflow-hidden border border-[#65F58A]/20">
                      <div className="bg-[#65F58A] h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="p-3 cyber-glass-card rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-lora font-medium">Offensive Exploitation AD</span>
                      <span className="text-[#65F58A]">40% Done</span>
                    </div>
                    <div className="w-full bg-[#0a261a] h-1.5 rounded-full overflow-hidden border border-[#65F58A]/20">
                      <div className="bg-[#65F58A] h-full rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>

                {/* Administrative Interventions */}
                <div className="space-y-2 pt-2 border-t border-[#65F58A]/20">
                  <span className="text-[10px] text-[#B8E6CE] block uppercase">
                    Administrative Interventions
                  </span>
                  <button
                    onClick={() => handleResetProgress(selectedStudent)}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-[#0a261a] text-[#C9EFE0] hover:text-[#EF4444] border border-[#65F58A]/30 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Curriculum Progress</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleToggleStatus(selectedStudent)}
                      className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg border text-xs transition-colors ${
                        selectedStudent.status === 'SUSPENDED'
                          ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
                          : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/20'
                      }`}
                    >
                      {selectedStudent.status === 'SUSPENDED' ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Reactivate</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-3.5 h-3.5" />
                          <span>Suspend</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setStudentToDelete(selectedStudent);
                        setDeleteConfirmText('');
                      }}
                      className="flex items-center justify-center space-x-1.5 py-2 rounded-lg border text-xs bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[#B8E6CE] text-xs">
              Select a student from the directory to inspect.
            </div>
          )}
        </div>
      </div>

      {/* Token Adjustment Modal */}
      {tokenModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[450px] cyber-glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 font-lora">
              Adjust Token Balance
            </h3>
            <p className="text-xs text-[#8BA2B5] mb-4">
              Student: <strong className="text-white">{selectedStudent.name}</strong> ({selectedStudent.email})
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTokenAction('GRANT')}
                  className={`py-2 rounded text-xs font-mono font-bold border transition-all ${
                    tokenAction === 'GRANT'
                      ? 'bg-[#65F58A]/20 border-[#65F58A] text-[#65F58A]'
                      : 'bg-[#071018] border-[#1B2530] text-[#8BA2B5]'
                  }`}
                >
                  + Grant Tokens
                </button>
                <button
                  type="button"
                  onClick={() => setTokenAction('DEDUCT')}
                  className={`py-2 rounded text-xs font-mono font-bold border transition-all ${
                    tokenAction === 'DEDUCT'
                      ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]'
                      : 'bg-[#071018] border-[#1B2530] text-[#8BA2B5]'
                  }`}
                >
                  - Deduct Tokens
                </button>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Token Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Audit Log Justification *
                </label>
                <input
                  type="text"
                  value={tokenReason}
                  onChange={(e) => setTokenReason(e.target.value)}
                  placeholder="e.g. Merit bounty for lab excellence"
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setTokenModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdjustTokens}
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Confirm Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Student Deletion Modal (Type DELETE to confirm) */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md ultra-glass-panel rounded-2xl p-6 border border-red-500/40 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <Trash2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-lora">
                  Permanently Delete Cadet Account
                </h3>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">
                  Irreversible Security Purge
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#081a13]/70 border border-[#65F58A]/20 rounded-xl text-xs font-mono space-y-2">
              <p className="text-[#C9EFE0]">
                Are you sure you want to permanently delete <strong className="text-white">{studentToDelete.name || studentToDelete.full_name}</strong>?
              </p>
              <p className="text-[#B8E6CE] text-[11px]">
                Email: <span className="text-red-400 font-bold">{studentToDelete.email}</span>
              </p>
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] leading-relaxed">
                ⚠️ This will purge all enrollments, certificates, and scores. This email will be <strong>permanently blacklisted</strong> from creating any future account.
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#B8E6CE] block">
                Type <strong className="text-red-400">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-red-400 border border-[#65F58A]/30"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStudentToDelete(null);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 text-xs font-mono text-[#B8E6CE] hover:text-white rounded-lg bg-[#0a261a] border border-[#65F58A]/30"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleConfirmPermanentDelete}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                  deleteConfirmText.trim().toUpperCase() === 'DELETE'
                    ? 'bg-red-500 text-white border-red-600 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer'
                    : 'bg-red-500/20 text-red-400/40 border-red-500/20 cursor-not-allowed'
                }`}
              >
                Delete Student Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

