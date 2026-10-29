import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, ShieldCheck, ShieldAlert, Coins,
  RotateCcw, Download, Eye, CheckCircle2, XCircle, ArrowUpRight,
  UserX, UserCheck, Sparkles, ExternalLink
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
      if (event.type === 'USER_STATUS_MUTATED' || event.type === 'TOKEN_MUTATED' || event.type === 'DB_MUTATED') {
        loadStudents();
      }
    });

    return () => unsubscribe();
  }, []);

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
    const matchesSearch =
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && s.status !== 'SUSPENDED') ||
      (statusFilter === 'SUSPENDED' && s.status === 'SUSPENDED');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions */}
      <div className="flex items-center justify-between bg-[#0F1720] border border-[#1B2530] p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#071018] border border-[#1B2530] text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          <div className="flex items-center space-x-1 bg-[#071018] border border-[#1B2530] p-1 rounded-lg">
            {['ALL', 'ACTIVE', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  statusFilter === st
                    ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                    : 'text-[#8BA2B5] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#1B2530] text-[#CBD5E1] hover:text-[#65F58A] border border-[#263440] font-mono text-xs rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Main Dual-Pane Roster & Inspector */}
      <div className="grid grid-cols-12 gap-6 min-h-[650px]">
        {/* Left Column: Student Directory Table */}
        <div className="col-span-8 bg-[#0F1720] border border-[#1B2530] rounded-xl overflow-hidden flex flex-col">
          <div className="p-3.5 bg-[#0A121A] border-b border-[#1B2530] flex items-center justify-between">
            <span className="text-xs font-mono text-[#8BA2B5]">
              STUDENT DIRECTORY ROSTER ({filteredStudents.length})
            </span>
            <span className="text-[10px] font-mono text-[#65F58A]">Identity Synchronized</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B2530] bg-[#071018] text-[10px] font-mono text-[#8BA2B5]">
                  <th className="p-3">STUDENT</th>
                  <th className="p-3">ACCOUNT STATUS</th>
                  <th className="p-3">TOKEN BALANCE</th>
                  <th className="p-3">ENROLLED</th>
                  <th className="p-3 text-right">QUICK ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
                {filteredStudents.map((st) => {
                  const isSelected = selectedStudent?.id === st.id;
                  const isSuspended = st.status === 'SUSPENDED';

                  return (
                    <tr
                      key={st.id}
                      onClick={() => setSelectedStudent(st)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#182330]' : 'hover:bg-[#071018]/50'
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#1B2530] border border-[#263440] flex items-center justify-center font-bold text-white text-xs">
                            {st.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="text-white font-sans font-medium">{st.name}</div>
                            <div className="text-[10px] text-[#8BA2B5]">{st.email}</div>
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
                        <span className="text-[#38BDF8] font-bold">
                          {st.token_balance || 0} ⚡
                        </span>
                      </td>

                      <td className="p-3 text-[#CBD5E1]">
                        {st.enrolled_count || 2} Tracks
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(st);
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-mono border ${
                            isSuspended
                              ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
                              : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/20'
                          }`}
                        >
                          {isSuspended ? 'Reactivate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Detailed Student Inspector Drawer */}
        <div className="col-span-4 bg-[#0F1720] border border-[#1B2530] rounded-xl flex flex-col overflow-hidden">
          {selectedStudent ? (
            <>
              <div className="p-5 border-b border-[#1B2530] bg-[#071018]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1B2530] border border-[#65F58A]/40 flex items-center justify-center text-lg font-bold text-white">
                    {selectedStudent.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-lora">
                      {selectedStudent.name}
                    </h3>
                    <span className="text-xs font-mono text-[#8BA2B5]">
                      {selectedStudent.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1B2530]">
                  <span className="text-[#8BA2B5]">USER ID: {selectedStudent.id}</span>
                  <span className="text-[#65F58A]">ROLE: {selectedStudent.role?.toUpperCase()}</span>
                </div>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-5 text-xs font-mono">
                {/* Token Balance Card */}
                <div className="p-4 bg-[#071018] border border-[#1B2530] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8BA2B5] block">ACADEMIC UTILITY TOKENS</span>
                    <span className="text-xl font-bold text-[#38BDF8] mt-0.5 block">
                      {selectedStudent.token_balance || 0} TOKENS
                    </span>
                  </div>
                  <button
                    onClick={() => setTokenModalOpen(true)}
                    className="px-3 py-1.5 bg-[#1B2530] text-[#65F58A] hover:bg-[#65F58A]/20 border border-[#263440] rounded text-[11px] font-bold"
                  >
                    Adjust Balance
                  </button>
                </div>

                {/* Academic Enrollment Progress */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#8BA2B5] block">
                    ACTIVE CURRICULUM ENROLLMENT
                  </span>
                  <div className="p-3 bg-[#071018] border border-[#1B2530] rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-sans font-medium">SOC Analyst L1 & L2</span>
                      <span className="text-[#65F58A]">75% Done</span>
                    </div>
                    <div className="w-full bg-[#1B2530] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#65F58A] h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="p-3 bg-[#071018] border border-[#1B2530] rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-sans font-medium">Offensive Exploitation AD</span>
                      <span className="text-[#38BDF8]">40% Done</span>
                    </div>
                    <div className="w-full bg-[#1B2530] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#38BDF8] h-full rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>

                {/* Administrative Interventions */}
                <div className="space-y-2 pt-2 border-t border-[#1B2530]">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">
                    Administrative Interventions
                  </span>
                  <button
                    onClick={() => handleResetProgress(selectedStudent)}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-[#1B2530] text-[#CBD5E1] hover:text-[#EF4444] border border-[#263440] rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Curriculum Progress</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(selectedStudent)}
                    className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg border transition-colors ${
                      selectedStudent.status === 'SUSPENDED'
                        ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
                        : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/20'
                    }`}
                  >
                    {selectedStudent.status === 'SUSPENDED' ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Reactivate Student Access</span>
                      </>
                    ) : (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        <span>Suspend Student Account</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[#8BA2B5] text-xs">
              Select a student from the directory to inspect.
            </div>
          )}
        </div>
      </div>

      {/* Token Adjustment Modal */}
      {tokenModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[450px] bg-[#0F1720] border border-[#1B2530] rounded-xl p-6 shadow-2xl">
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
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white font-mono"
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
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
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
    </div>
  );
}
