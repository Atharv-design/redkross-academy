import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Award,
  BookOpen,
  Clock,
  Shield,
  CheckCircle2,
  ChevronLeft,
  RefreshCw,
  Coins,
  AlertTriangle,
  Plus,
  RotateCcw,
  Sparkles,
  Check,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

/**
 * Super Admin Student Lifecycle CRM (Phase 4 & Spec Extension)
 * Conforms to super-admin-interface-design.md & PRD Section 13:
 * - Live Student Status Tracking (Active Learner, In-Exam, Strike-3 Lockout)
 * - Manual Course Enrollment
 * - Lesson & Module Progress Overrides
 * - Token Credit/Debit Adjustments with Mandatory Audit Reason
 * - Force-Issue Verified Credentials
 * - Cooldown Reset Overrides
 */
export default function StudentCRMPage() {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | active | in_exam | locked_out

  // Modal & Action States
  const [activeActionModal, setActiveActionModal] = useState(null); // 'enroll' | 'progress' | 'tokens' | 'cert' | 'cooldown'
  const [actionReason, setActionReason] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [tokenDelta, setTokenDelta] = useState(100);
  const [actionNotice, setActionNotice] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  const loadData = async () => {
    try {
      const [adminRes, courseRes] = await Promise.all([
        apiClient.getAdminMetrics(),
        apiClient.getCourses(true)
      ]);

      if (adminRes && adminRes.students) {
        setStudents(adminRes.students);
        if (!selectedStudent && adminRes.students.length > 0) {
          setSelectedStudent(adminRes.students[0]);
        } else if (selectedStudent) {
          const updated = adminRes.students.find((s) => s.id === selectedStudent.id);
          if (updated) setSelectedStudent(updated);
        }
      }

      if (courseRes && courseRes.courses) {
        setCourses(courseRes.courses);
        if (courseRes.courses.length > 0) {
          setSelectedCourseId(courseRes.courses[0].id);
        }
      }
    } catch (e) {
      console.warn('Failed to load student CRM telemetry:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4500);
  };

  // Filtered Students
  const filtered = students.filter((s) => {
    const matchesSearch =
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.id?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'active') return s.operational_status === 'active_learner';
    if (statusFilter === 'in_exam') return s.operational_status === 'in_exam';
    if (statusFilter === 'locked_out') return s.operational_status === 'locked_out';
    return true;
  });

  // ==========================================
  // ACTION: MANUAL ENROLLMENT
  // ==========================================
  const handleManualEnroll = async () => {
    if (!selectedStudent || !selectedCourseId) return;
    setActionInProgress(true);
    try {
      await apiClient.manualEnrollStudent(selectedStudent.id, selectedCourseId);
      showToast(`✅ Enrolled ${selectedStudent.full_name} into course.`);
      setActiveActionModal(null);
      await loadData();
    } catch (err) {
      alert(`Enrollment failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  // ==========================================
  // ACTION: PROGRESS OVERRIDE
  // ==========================================
  const handleProgressReset = async () => {
    if (!selectedStudent || !selectedCourseId) return;
    if (!actionReason.trim()) {
      alert('PRD Security Policy: A valid operational reason is required for audit logs.');
      return;
    }
    setActionInProgress(true);
    try {
      await apiClient.resetStudentProgress(
        selectedStudent.id,
        selectedCourseId,
        selectedLessonId || null,
        actionReason
      );
      showToast('✅ Student progress reset and audit trail recorded.');
      setActiveActionModal(null);
      setActionReason('');
      setSelectedLessonId('');
      await loadData();
    } catch (err) {
      alert(`Reset failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  // ==========================================
  // ACTION: TOKEN ADJUSTMENT (WITH MANDATORY REASON)
  // ==========================================
  const handleTokenAdjustment = async () => {
    if (!selectedStudent) return;
    if (!actionReason.trim()) {
      alert('PRD Mandatory Compliance: A reason log is strictly required for token credit/debit.');
      return;
    }
    setActionInProgress(true);
    try {
      await apiClient.adjustStudentTokens(selectedStudent.id, tokenDelta, actionReason);
      showToast(`🪙 ${tokenDelta >= 0 ? 'Credited' : 'Debited'} ${Math.abs(tokenDelta)} tokens.`);
      setActiveActionModal(null);
      setActionReason('');
      await loadData();
    } catch (err) {
      alert(`Token adjustment failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  // ==========================================
  // ACTION: FORCE-ISSUE CREDENTIAL
  // ==========================================
  const handleForceIssueCredential = async () => {
    if (!selectedStudent || !selectedCourseId) return;
    setActionInProgress(true);
    try {
      const cred = await apiClient.forceIssueCredential(selectedStudent.id, selectedCourseId);
      showToast(`🎓 Force-issued verified credential ${cred.verification_id}!`);
      setActiveActionModal(null);
      await loadData();
    } catch (err) {
      alert(`Credential issuance failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  // ==========================================
  // ACTION: COOLDOWN RESET OVERRIDE
  // ==========================================
  const handleManualCooldownReset = async () => {
    if (!selectedStudent) return;
    if (!actionReason.trim()) {
      alert('PRD Security Policy: Reason log required for resetting 24h proctoring lockout.');
      return;
    }
    setActionInProgress(true);
    try {
      await apiClient.adminResetCooldown(
        selectedStudent.id,
        selectedCourseId,
        actionReason,
        currentUser?.email || 'usr_admin'
      );
      showToast('🛡️ Cooldown successfully cleared! Attempt counter reset and logged.');
      setActiveActionModal(null);
      setActionReason('');
      await loadData();
    } catch (err) {
      alert(`Cooldown reset failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  const selectedCourseObj = courses.find((c) => c.id === selectedCourseId);
  const lessonsForSelectedCourse = selectedCourseObj?.modules?.flatMap((m) => m.lessons || []) || [];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-6 font-lora">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-lora text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="flex items-center gap-3 text-xs font-lora text-[#94A3B8]">
          <span>Console: <strong className="text-[#65F58A]">Student Operations & CRM</strong></span>
        </div>
      </div>

      {/* Header and Telemetry Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#35E6B5] text-xs font-lora mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>STUDENT LIFECYCLE & OPERATIONAL CRM</span>
          </div>
          <h1 className="font-lora text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Student Operations Directory
          </h1>
          <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed mt-1 font-lora">
            Real-time candidate telemetry, status tracking, manual course enrollments, audited token credits/debits, and exam lockout overrides.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search candidate name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#101923] border border-[#263440] rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none focus:border-[#65F58A]"
          />
        </div>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-xs font-mono text-[#65F58A] flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Status Filter Pills */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#94A3B8]">Status Filter:</span>
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            statusFilter === 'ALL'
              ? 'bg-[#1B2530] border-[#65F58A] text-white font-bold'
              : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
          }`}
        >
          All ({students.length})
        </button>
        <button
          onClick={() => setStatusFilter('active')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            statusFilter === 'active'
              ? 'bg-[#1B2530] border-[#65F58A] text-[#65F58A] font-bold'
              : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
          }`}
        >
          Active Learners
        </button>
        <button
          onClick={() => setStatusFilter('in_exam')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            statusFilter === 'in_exam'
              ? 'bg-[#1B2530] border-amber-500 text-amber-400 font-bold'
              : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
          }`}
        >
          In Proctoring Exam
        </button>
        <button
          onClick={() => setStatusFilter('locked_out')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            statusFilter === 'locked_out'
              ? 'bg-[#1B2530] border-rose-500 text-rose-400 font-bold'
              : 'bg-[#101923] border-[#263440] text-[#94A3B8]'
          }`}
        >
          Locked Out (Strike 3)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidate Directory (Left 5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider pb-2 border-b border-[#263440]">
            <span>Candidate Records ({filtered.length})</span>
            <span>Status</span>
          </div>

          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
            {filtered.map((student) => {
              const isSelected = selectedStudent?.id === student.id;
              const status = student.operational_status || 'active_learner';

              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1B2530] border-[#65F58A] shadow-md'
                      : 'bg-[#071018]/60 border-[#263440] hover:bg-[#101923]'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="w-8 h-8 rounded-full bg-[#101923] border border-[#263440] flex items-center justify-center flex-shrink-0 text-xs font-mono text-[#65F58A]">
                      {student.avatar ? (
                        <img src={student.avatar} alt={student.full_name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        student.full_name?.charAt(0) || 'C'
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span>{student.full_name}</span>
                        {status === 'locked_out' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] font-mono truncate">{student.email}</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    {status === 'locked_out' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        Locked Out
                      </span>
                    ) : status === 'in_exam' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        In Exam
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/20">
                        🪙 {student.token_balance || 100}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Candidate Dossier (Right 7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-6">
          {selectedStudent ? (
            <div className="space-y-6">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263440]">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#1B2530] border border-[#263440] flex items-center justify-center text-lg font-bold text-[#65F58A] font-royal">
                    {selectedStudent.full_name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
                      <span>{selectedStudent.full_name}</span>
                      <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-[#101923] border border-[#263440] text-[#35E6B5]">
                        {selectedStudent.role || 'student'}
                      </span>
                    </h3>
                    <div className="text-xs font-mono text-[#94A3B8]">
                      {selectedStudent.email} • ID: <span className="text-slate-300">{selectedStudent.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#101923] border border-[#263440] text-right">
                    <div className="text-[10px] text-[#94A3B8]">Token Balance</div>
                    <div className="text-[#65F58A] font-bold">🪙 {selectedStudent.token_balance || 100}</div>
                  </div>
                </div>
              </div>

              {/* Status Dossier Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Enrolled Tracks</div>
                  <div className="text-lg font-bold text-white font-mono">{selectedStudent.enrolled_courses_count || 1}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Issued Certs</div>
                  <div className="text-lg font-bold text-[#65F58A] font-mono">{selectedStudent.credentials_count || 0}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Active Streak</div>
                  <div className="text-lg font-bold text-[#35E6B5] font-mono">{selectedStudent.streak_days || 1}d</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-1">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Operational State</div>
                  <div className="text-xs font-bold font-mono uppercase mt-1">
                    {selectedStudent.operational_status === 'locked_out' ? (
                      <span className="text-rose-400">Locked Out</span>
                    ) : selectedStudent.operational_status === 'in_exam' ? (
                      <span className="text-amber-400">In Exam</span>
                    ) : (
                      <span className="text-[#65F58A]">Active</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Granular Management Action Deck */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Super Admin Management Deck
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setActiveActionModal('enroll')}
                    className="p-3 rounded-xl bg-[#101923] hover:bg-[#1B2530] border border-[#263440] hover:border-[#65F58A]/50 text-left transition-all text-xs font-mono space-y-1"
                  >
                    <BookOpen className="w-4 h-4 text-[#65F58A]" />
                    <div className="font-bold text-white">Manual Enrol</div>
                    <div className="text-[10px] text-[#94A3B8]">Grant access to track</div>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('progress')}
                    className="p-3 rounded-xl bg-[#101923] hover:bg-[#1B2530] border border-[#263440] hover:border-[#35E6B5]/50 text-left transition-all text-xs font-mono space-y-1"
                  >
                    <RotateCcw className="w-4 h-4 text-[#35E6B5]" />
                    <div className="font-bold text-white">Progress Override</div>
                    <div className="text-[10px] text-[#94A3B8]">Reset lesson or module</div>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('tokens')}
                    className="p-3 rounded-xl bg-[#101923] hover:bg-[#1B2530] border border-[#263440] hover:border-amber-400/50 text-left transition-all text-xs font-mono space-y-1"
                  >
                    <Coins className="w-4 h-4 text-amber-400" />
                    <div className="font-bold text-white">Adjust Tokens</div>
                    <div className="text-[10px] text-[#94A3B8]">Credit or debit + reason</div>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('cert')}
                    className="p-3 rounded-xl bg-[#101923] hover:bg-[#1B2530] border border-[#263440] hover:border-[#65F58A]/50 text-left transition-all text-xs font-mono space-y-1"
                  >
                    <Award className="w-4 h-4 text-[#65F58A]" />
                    <div className="font-bold text-white">Issue Credential</div>
                    <div className="text-[10px] text-[#94A3B8]">Force cryptographic seal</div>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('cooldown')}
                    className="p-3 rounded-xl bg-[#101923] hover:bg-[#1B2530] border border-[#263440] hover:border-rose-400/50 text-left transition-all text-xs font-mono space-y-1 col-span-2 sm:col-span-2"
                  >
                    <RefreshCw className="w-4 h-4 text-rose-400" />
                    <div className="font-bold text-white">Clear 24h Cooldown Lockout</div>
                    <div className="text-[10px] text-[#94A3B8]">Reset strike 3 timer for candidate</div>
                  </button>
                </div>
              </div>

              {/* ACTION MODAL 1: MANUAL ENROLLMENT */}
              {activeActionModal === 'enroll' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-[#65F58A]/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                    <span>Manual Course Enrollment</span>
                    <button onClick={() => setActiveActionModal(null)} className="text-[#94A3B8] hover:text-white">✕</button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8]">Select Curriculum Track</label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs font-mono text-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.difficulty})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveActionModal(null)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleManualEnroll}
                      disabled={actionInProgress}
                      className="px-4 py-1.5 rounded-lg bg-[#65F58A] text-[#071018] font-mono font-bold text-xs"
                    >
                      Confirm Enrollment
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION MODAL 2: PROGRESS OVERRIDE */}
              {activeActionModal === 'progress' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-[#35E6B5]/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                    <span>Lesson & Module Progress Override</span>
                    <button onClick={() => setActiveActionModal(null)} className="text-[#94A3B8] hover:text-white">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#94A3B8]">Course</label>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#101923] border border-[#263440] text-white"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#94A3B8]">Scope</label>
                      <select
                        value={selectedLessonId}
                        onChange={(e) => setSelectedLessonId(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#101923] border border-[#263440] text-white"
                      >
                        <option value="">Full Course (All Lessons)</option>
                        {lessonsForSelectedCourse.map((l) => (
                          <option key={l.id} value={l.id}>{l.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8]">
                      Operational Reason * (Mandatory Audit Trail)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Browser crash during lesson packet capture exercise"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs font-mono text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveActionModal(null)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProgressReset}
                      disabled={actionInProgress || !actionReason}
                      className="px-4 py-1.5 rounded-lg bg-[#35E6B5] text-[#071018] font-mono font-bold text-xs disabled:opacity-40"
                    >
                      Execute Progress Reset
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION MODAL 3: TOKEN ADJUSTMENT */}
              {activeActionModal === 'tokens' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-amber-400/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                    <span>Manual Token Credit / Debit Engine</span>
                    <button onClick={() => setActiveActionModal(null)} className="text-[#94A3B8] hover:text-white">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#94A3B8]">Token Amount (+ or -)</label>
                      <input
                        type="number"
                        value={tokenDelta}
                        onChange={(e) => setTokenDelta(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-white text-center font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#94A3B8]">Current Balance</label>
                      <div className="px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-amber-400 font-bold text-center">
                        🪙 {selectedStudent.token_balance || 100}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8]">
                      Mandatory Reason Log * (Written to Audit Ledger)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bounty reward for discovering curriculum typo in Module 3"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs font-mono text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveActionModal(null)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleTokenAdjustment}
                      disabled={actionInProgress || !actionReason}
                      className="px-4 py-1.5 rounded-lg bg-amber-400 text-[#071018] font-mono font-bold text-xs disabled:opacity-40"
                    >
                      Post Token Transaction
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION MODAL 4: FORCE-ISSUE CREDENTIAL */}
              {activeActionModal === 'cert' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-[#65F58A]/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                    <span>Force-Issue Verifiable Credential</span>
                    <button onClick={() => setActiveActionModal(null)} className="text-[#94A3B8] hover:text-white">✕</button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8]">Target Course</label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs font-mono text-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] font-mono text-[#94A3B8]">
                    Generates a cryptographically signed credential with a unique public verification ID (`RK-XXXX-XXXX`), 100% grade seal, and 2-year expiration.
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveActionModal(null)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleForceIssueCredential}
                      disabled={actionInProgress}
                      className="px-4 py-1.5 rounded-lg bg-[#65F58A] text-[#071018] font-mono font-bold text-xs"
                    >
                      Issue Sealed Credential
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION MODAL 5: COOLDOWN RESET OVERRIDE */}
              {activeActionModal === 'cooldown' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-rose-500/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                    <span>Emergency 24h Lockout Reset</span>
                    <button onClick={() => setActiveActionModal(null)} className="text-[#94A3B8] hover:text-white">✕</button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8]">
                      Justification Reason * (Strictly required for audit logging)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Confirmed false-positive focus event caused by OS notification popup"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs font-mono text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveActionModal(null)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleManualCooldownReset}
                      disabled={actionInProgress || !actionReason}
                      className="px-4 py-1.5 rounded-lg bg-rose-500 text-white font-mono font-bold text-xs disabled:opacity-40"
                    >
                      Override & Clear Lockout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-xs font-mono text-[#94A3B8]">
              {loading ? 'Retrieving registered students...' : 'Select a student from the directory to view full profile.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
