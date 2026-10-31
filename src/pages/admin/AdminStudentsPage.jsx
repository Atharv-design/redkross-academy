import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Search, Filter, ShieldCheck, ShieldAlert, Coins,
  RotateCcw, Download, Eye, CheckCircle2, XCircle, ArrowUpRight,
  UserX, UserCheck, Sparkles, ExternalLink, Trash2, Edit3, ArrowUpDown,
  ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(100);
  const [tokenAction, setTokenAction] = useState('GRANT'); // GRANT | DEDUCT
  const [tokenReason, setTokenReason] = useState('Merit bounty for lab excellence');

  // Sorting State matching Table01DividerLineSm specification
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'cadet_id',
    direction: 'ascending'
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Permanent Delete Modal State
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const loadStudents = async () => {
    try {
      const studentList = await apiClient.getStudents();
      if (Array.isArray(studentList)) {
        setStudents(studentList);
        if (studentList.length > 0 && !selectedStudent) {
          setSelectedStudent(studentList[0]);
        }
      }
    } catch (e) {
      console.error('Error loading students CRM:', e);
    }
  };

  useEffect(() => {
    loadStudents();

    // Live Socket & DB event sync
    const unsubEnrol = socketClient.on('student:enrolled', loadStudents);
    const unsubReg = socketClient.on('user:registered', loadStudents);
    const unsubStatus = socketClient.on('user:status_changed', loadStudents);
    const unsubTokens = socketClient.on('token:adjusted', loadStudents);

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

    return () => {
      if (typeof unsubEnrol === 'function') unsubEnrol();
      if (typeof unsubReg === 'function') unsubReg();
      if (typeof unsubStatus === 'function') unsubStatus();
      if (typeof unsubTokens === 'function') unsubTokens();
      unsubscribe();
    };
  }, []);

  // Permanent student deletion with email blacklisting
  const handleConfirmPermanentDelete = async () => {
    if (!studentToDelete) return;
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;

    try {
      await apiClient.deleteStudent(studentToDelete.id, studentToDelete.email);
      socketClient.emit('user:banned', { userId: studentToDelete.id, email: studentToDelete.email });
      socketClient.emit('user:purged', { userId: studentToDelete.id, email: studentToDelete.email });
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

  // Suspend / Reactivate account
  const handleToggleStatus = async (student) => {
    const isSuspended = student.status === 'SUSPENDED';
    const nextStatus = isSuspended ? 'ACTIVE' : 'SUSPENDED';

    try {
      await apiClient.suspendStudent(student.id, nextStatus, `Admin toggled status to ${nextStatus}`);
      socketClient.emit('user:status_changed', { userId: student.id, status: nextStatus, is_suspended: !isSuspended });
      loadStudents();
    } catch (e) {
      console.error(e);
    }
  };

  // Adjust token balance
  const handleAdjustTokens = async () => {
    if (!selectedStudent || !tokenAmount) return;
    const delta = tokenAction === 'GRANT' ? parseInt(tokenAmount) : -parseInt(tokenAmount);

    try {
      await apiClient.adjustTokens(selectedStudent.id, delta, tokenReason);
      socketClient.emit('token:adjusted', { userId: selectedStudent.id, delta, reason: tokenReason });
      loadStudents();

      setTokenModalOpen(false);
      setTokenAmount(100);
      setTokenReason('Merit bounty for lab excellence');
    } catch (e) {
      console.error(e);
    }
  };

  // Reset student curriculum progress
  const handleResetProgress = async (student) => {
    if (confirm(`Reset all curriculum lab progress for ${student.name || student.full_name}? This will zero out completion telemetry.`)) {
      try {
        await apiClient.resetStudentProgress(student.id, null, null, 'Admin reset progress');
        socketClient.emit('student:progress_reset', { userId: student.id });
        loadStudents();
        alert(`Progress reset for ${student.name || student.full_name}.`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Cadet_ID,Name,Email,Status,Tokens,Enrolled_Tracks\n'];
    const rows = sortedAndFilteredStudents.map(
      (s) =>
        `"${s.cadet_id || 'RK-UNKNOWN'}","${s.name || s.full_name || 'Cadet'}","${s.email}","${s.status || 'ACTIVE'}","${s.token_balance || 0}","${s.enrolled_tracks_count || 2}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redkross_students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Handle Sort Toggle
  const handleSort = (columnKey) => {
    setSortDescriptor((prev) => ({
      column: columnKey,
      direction: prev.column === columnKey && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  // Filtered & Sorted items
  const sortedAndFilteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = students.filter((s) => {
      const name = (s.name || s.full_name || '').toLowerCase();
      const email = (s.email || '').toLowerCase();
      const cadetId = (s.cadet_id || '').toLowerCase();
      const matchesSearch = !q || name.includes(q) || email.includes(q) || cadetId.includes(q);
      const isSuspended = s.status === 'SUSPENDED' || s.is_suspended;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && !isSuspended) ||
        (statusFilter === 'SUSPENDED' && isSuspended);
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];

      if (sortDescriptor.column === 'name') {
        first = (a.name || a.full_name || '').toLowerCase();
        second = (b.name || b.full_name || '').toLowerCase();
      } else if (sortDescriptor.column === 'cadet_id') {
        first = (a.cadet_id || '').toLowerCase();
        second = (b.cadet_id || '').toLowerCase();
      } else if (sortDescriptor.column === 'email') {
        first = (a.email || '').toLowerCase();
        second = (b.email || '').toLowerCase();
      } else if (sortDescriptor.column === 'status') {
        first = a.status || 'ACTIVE';
        second = b.status || 'ACTIVE';
      }

      if (first === undefined) first = '';
      if (second === undefined) second = '';

      if (typeof first === 'number' && typeof second === 'number') {
        return sortDescriptor.direction === 'descending' ? second - first : first - second;
      }

      let cmp = String(first).localeCompare(String(second));
      return sortDescriptor.direction === 'descending' ? cmp * -1 : cmp;
    });
  }, [students, searchQuery, statusFilter, sortDescriptor]);

  // Paginated Slice
  const totalPages = Math.max(1, Math.ceil(sortedAndFilteredStudents.length / itemsPerPage));
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredStudents.slice(start, start + itemsPerPage);
  }, [sortedAndFilteredStudents, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 animate-slide-left font-lora">
      {/* Top Filter and Actions Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 cyber-glass-panel p-4 rounded-xl border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/70">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#B8E6CE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Cadet ID, name, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#05140e] border border-[#65F58A]/30 text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A] transition-colors font-mono"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-[#05140e] p-1 rounded-lg border border-[#65F58A]/20">
            {['ALL', 'ACTIVE', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#0a261a] text-[#65F58A] font-bold border border-[#65F58A]/40 shadow-sm'
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
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0a261a]/80 text-[#C9EFE0] hover:text-[#65F58A] border border-[#65F58A]/30 font-mono text-xs rounded-lg transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Main Dual-Pane Layout: Left Table Card + Right Inspector Drawer */}
      <div className="grid grid-cols-12 gap-6 min-h-[650px]">
        {/* Left Column: Student Directory Table Card */}
        <div className="col-span-12 lg:col-span-8 cyber-glass-panel rounded-xl overflow-hidden flex flex-col border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/70">
          {/* TableCard Header (matching TableCard.Header) */}
          <div className="p-4 bg-[#071912]/90 border-b border-[#65F58A]/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-base font-bold text-white font-lora">Student Directory</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                {sortedAndFilteredStudents.length} cadets
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#65F58A]">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
              <span>Identity Synchronized</span>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Student Directory Roster">
              <thead>
                <tr className="border-b border-[#65F58A]/20 bg-[#05140e]/90 text-[11px] font-mono text-[#B8E6CE] uppercase select-none">
                  {/* Column 1: CADET ID */}
                  <th
                    onClick={() => handleSort('cadet_id')}
                    className="p-3.5 cursor-pointer hover:text-[#65F58A] transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Cadet ID</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>

                  {/* Column 2: NAME */}
                  <th
                    onClick={() => handleSort('name')}
                    className="p-3.5 cursor-pointer hover:text-[#65F58A] transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>

                  {/* Column 3: EMAIL ADDRESS */}
                  <th
                    onClick={() => handleSort('email')}
                    className="p-3.5 cursor-pointer hover:text-[#65F58A] transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email address</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>

                  {/* Column 4: STATUS */}
                  <th
                    onClick={() => handleSort('status')}
                    className="p-3.5 cursor-pointer hover:text-[#65F58A] transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>

                  {/* Column 5: ENROLLED */}
                  <th className="p-3.5">
                    <span>Enrolled</span>
                  </th>

                  {/* Column 6: ACTIONS */}
                  <th className="p-3.5 text-right">
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#65F58A]/15 text-xs font-mono">
                {paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#B8E6CE] font-lora">
                      No cadets matched your search criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((st) => {
                    const isSelected = selectedStudent?.id === st.id;
                    const isSuspended = st.status === 'SUSPENDED' || st.is_suspended;
                    const studentName = st.name || st.full_name || 'Cadet Operator';

                    return (
                      <tr
                        key={st.id}
                        onClick={() => setSelectedStudent(st)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#0c2e1f]/80 shadow-[inset_3px_0_0_#65F58A]' : 'hover:bg-[#071912]/50'
                        }`}
                      >
                        {/* 1. Cadet ID */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono text-xs font-bold text-[#65F58A] bg-[#05140e] px-2.5 py-1 rounded-md border border-[#65F58A]/40 shadow-sm">
                            {st.cadet_id || 'RK-89421'}
                          </span>
                        </td>

                        {/* 2. Name with Avatar */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#0a261a] border border-[#65F58A]/40 flex items-center justify-center font-bold text-[#65F58A] text-xs shadow-sm">
                              {studentName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-lora font-semibold text-xs tracking-wide">
                                {studentName}
                              </p>
                              <span className="text-[10px] text-[#72A88E] block">
                                {st.role === 'admin' ? 'Super Admin' : 'Cadet Researcher'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Email */}
                        <td className="p-3.5 whitespace-nowrap text-[#B8E6CE]">
                          {st.email}
                        </td>

                        {/* 4. Status with Dot Badge (matching BadgeWithDot) */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${
                              isSuspended
                                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSuspended ? 'bg-red-400' : 'bg-[#65F58A] animate-pulse'
                              }`}
                            />
                            <span>{isSuspended ? 'Suspended' : 'Active'}</span>
                          </span>
                        </td>

                        {/* 5. Enrolled Courses / Learning Paths */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#092218] text-[#65F58A] border border-[#65F58A]/30">
                              SOC Analyst L1 & L2
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#05140e] text-[#B8E6CE] border border-[#65F58A]/20">
                              +1 Track
                            </span>
                          </div>
                        </td>

                        {/* 6. Quick Actions */}
                        <td className="p-3.5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(st);
                                setTokenModalOpen(true);
                              }}
                              className="px-2 py-1 rounded text-[10px] font-mono border border-[#65F58A]/30 bg-[#0a261a] text-[#65F58A] hover:bg-[#65F58A]/20 transition-colors"
                              title="Adjust Utility Tokens"
                            >
                              Tokens
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStatus(st);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                                isSuspended
                                  ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
                                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                              }`}
                            >
                              {isSuspended ? 'Reactivate' : 'Suspend'}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setStudentToDelete(st);
                                setDeleteConfirmText('');
                              }}
                              className="p-1 rounded text-[10px] font-mono border bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/25 transition-colors"
                              title="Delete Cadet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Minimal Pagination Card (matching PaginationCardMinimal) */}
          <div className="p-3.5 bg-[#071912]/90 border-t border-[#65F58A]/20 flex items-center justify-between text-xs font-mono text-[#B8E6CE]">
            <span>
              Showing {sortedAndFilteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, sortedAndFilteredStudents.length)} of{' '}
              {sortedAndFilteredStudents.length} cadets
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-[#65F58A]/30 bg-[#05140e] text-[#65F58A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a261a] transition-colors"
              >
                Previous
              </button>
              <span className="text-white font-bold px-1">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded border border-[#65F58A]/30 bg-[#05140e] text-[#65F58A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a261a] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Student Inspector Drawer */}
        <div className="col-span-12 lg:col-span-4 cyber-glass-panel rounded-xl flex flex-col overflow-hidden border border-[#65F58A]/25 backdrop-blur-xl bg-[#081a13]/70">
          {selectedStudent ? (
            <>
              {/* Cadet Header */}
              <div className="p-5 border-b border-[#65F58A]/20 bg-[#071912]/90 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#0a261a] border border-[#65F58A]/40 flex items-center justify-center font-bold text-[#65F58A] text-lg shadow-sm">
                    {(selectedStudent.name || selectedStudent.full_name || 'C').charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <h4 className="text-base font-bold text-white font-lora truncate">
                      {selectedStudent.name || selectedStudent.full_name || 'Cadet Operator'}
                    </h4>
                    <span className="text-xs text-[#B8E6CE] font-mono block truncate">
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

              {/* Cadet Details Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-5 text-xs font-mono">
                {/* Token Balance Card */}
                <div className="p-4 cyber-glass-card rounded-xl flex items-center justify-between border border-[#65F58A]/20">
                  <div>
                    <span className="text-[10px] text-[#B8E6CE] block">ACADEMIC UTILITY TOKENS</span>
                    <span className="text-xl font-bold text-[#65F58A] mt-0.5 block">
                      {selectedStudent.token_balance || 0} TOKENS
                    </span>
                  </div>
                  <button
                    onClick={() => setTokenModalOpen(true)}
                    className="px-3 py-1.5 bg-[#0a261a] text-[#65F58A] hover:bg-[#65F58A]/20 border border-[#65F58A]/30 rounded text-[11px] font-bold cursor-pointer"
                  >
                    Adjust Balance
                  </button>
                </div>

                {/* Academic Enrollment Progress */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#B8E6CE] block">
                    ACTIVE CURRICULUM ENROLLMENT
                  </span>
                  <div className="p-3 cyber-glass-card rounded-lg space-y-2 border border-[#65F58A]/20">
                    <div className="flex justify-between">
                      <span className="text-white font-lora font-medium">SOC Analyst L1 & L2</span>
                      <span className="text-[#65F58A]">75% Done</span>
                    </div>
                    <div className="w-full bg-[#0a261a] h-1.5 rounded-full overflow-hidden border border-[#65F58A]/20">
                      <div className="bg-[#65F58A] h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="p-3 cyber-glass-card rounded-lg space-y-2 border border-[#65F58A]/20">
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
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-[#0a261a] text-[#C9EFE0] hover:text-[#EF4444] border border-[#65F58A]/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Curriculum Progress</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleToggleStatus(selectedStudent)}
                      className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg border text-xs transition-colors cursor-pointer ${
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
                      className="flex items-center justify-center space-x-1.5 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[#B8E6CE] m-auto">
              Select a cadet from the directory roster to view telemetry.
            </div>
          )}
        </div>
      </div>

      {/* Token Modal */}
      {tokenModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full cyber-glass-panel rounded-2xl p-6 border border-[#65F58A]/40 space-y-4 bg-[#081a13]">
            <h3 className="text-lg font-bold text-white font-lora">Adjust Utility Tokens</h3>
            <p className="text-xs text-[#B8E6CE]">
              Cadet: {selectedStudent.name || selectedStudent.full_name} ({selectedStudent.cadet_id})
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[#72A88E] mb-1">Action Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTokenAction('GRANT')}
                    className={`py-2 rounded border transition-colors ${
                      tokenAction === 'GRANT'
                        ? 'bg-[#65F58A] text-[#071018] font-bold border-[#65F58A]'
                        : 'bg-[#05140e] text-[#B8E6CE] border-[#65F58A]/20'
                    }`}
                  >
                    Grant (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTokenAction('DEDUCT')}
                    className={`py-2 rounded border transition-colors ${
                      tokenAction === 'DEDUCT'
                        ? 'bg-[#EF4444] text-white font-bold border-[#EF4444]'
                        : 'bg-[#05140e] text-[#B8E6CE] border-[#65F58A]/20'
                    }`}
                  >
                    Deduct (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#72A88E] mb-1">Amount</label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="w-full bg-[#05140e] border border-[#65F58A]/30 rounded p-2 text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div>
                <label className="block text-[#72A88E] mb-1">Administrative Reason</label>
                <input
                  type="text"
                  value={tokenReason}
                  onChange={(e) => setTokenReason(e.target.value)}
                  className="w-full bg-[#05140e] border border-[#65F58A]/30 rounded p-2 text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setTokenModalOpen(false)}
                className="px-4 py-2 rounded border border-[#65F58A]/20 text-[#B8E6CE] text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdjustTokens}
                className="px-4 py-2 rounded bg-[#65F58A] text-[#071018] text-xs font-bold font-mono"
              >
                Confirm Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full cyber-glass-panel rounded-2xl p-6 border border-red-500/40 space-y-4 bg-[#140808]">
            <h3 className="text-lg font-bold text-red-400 font-lora">Permanently Purge Cadet Account</h3>
            <p className="text-xs text-red-200">
              This action permanently purges {studentToDelete.name || studentToDelete.full_name} ({studentToDelete.email}) and blacklists their email from re-registering.
            </p>
            <div className="space-y-2 font-mono text-xs">
              <label className="block text-gray-300">Type DELETE to confirm:</label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-black/50 border border-red-500/40 rounded p-2 text-white focus:outline-none focus:border-red-400"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 rounded border border-gray-700 text-gray-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleConfirmPermanentDelete}
                className="px-4 py-2 rounded bg-red-600 text-white text-xs font-bold font-mono disabled:opacity-40"
              >
                Purge Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
