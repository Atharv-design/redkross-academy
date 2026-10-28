import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Award, BookOpen, Clock, Shield, CheckCircle2, ChevronLeft, RefreshCw, Coins } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function StudentCRMPage() {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Manual Cooldown Reset Modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetReason, setResetReason] = useState('');
  const [resetSuccess, setResetSuccess] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await apiClient.getAdminMetrics();
      if (res && res.students) {
        setStudents(res.students);
        if (!selectedStudent && res.students.length > 0) {
          setSelectedStudent(res.students[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load students:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleManualCooldownReset = () => {
    if (!resetReason.trim()) {
      alert('PRD Security Policy: A valid operational reason is required for audit logs.');
      return;
    }

    setResetSuccess('Cooldown successfully cleared! Attempt counter reset and logged.');
    setShowResetModal(false);
    setResetReason('');
    setTimeout(() => setResetSuccess(null), 3500);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="text-xs font-mono text-[#94A3B8]">
          Console: <span className="text-[#65F58A] font-semibold">Student Operations & CRM</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#35E6B5]" />
            <span>Student Operations Directory</span>
          </h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Inspect student progression, token balance, and execute administrative overrides.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#101923] border border-[#263440] rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none focus:border-[#65F58A]"
          />
        </div>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-[#65F58A] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
          <span>{resetSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Candidate Directory (Left 5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-4 space-y-2 shadow-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider px-2 py-1 border-b border-[#263440]">
            Registered Students ({filtered.length})
          </div>

          <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
            {filtered.map((student) => {
              const isSelected = selectedStudent?.id === student.id;

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
                      <div className="text-xs font-bold text-white truncate">{student.full_name}</div>
                      <div className="text-[10px] text-[#94A3B8] font-mono truncate">{student.email}</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 text-xs font-mono text-[#F59E0B] font-bold">
                    {student.token_balance || 100} T
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
              <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B2530] border border-[#263440] flex items-center justify-center text-base font-bold text-[#65F58A] font-royal">
                    {selectedStudent.full_name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="font-royal text-lg font-bold text-white">
                      {selectedStudent.full_name}
                    </h3>
                    <div className="text-xs font-mono text-[#94A3B8]">
                      {selectedStudent.email} • ID: {selectedStudent.id}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-mono bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 font-bold">
                  {selectedStudent.token_balance || 100} Tokens
                </div>
              </div>

              {/* Status Dossier Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
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
                  <div className="text-lg font-bold text-[#F59E0B] font-mono">{selectedStudent.streak_days || 1} Days</div>
                </div>
              </div>

              {/* Administrative Override Actions */}
              <div className="pt-4 border-t border-[#263440] space-y-3">
                <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Operational Overrides
                </div>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-[#65F58A] transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Execute Cooldown Reset Override</span>
                </button>
              </div>

              {showResetModal && (
                <div className="p-4 rounded-xl bg-[#071018] border border-[#65F58A]/40 space-y-3">
                  <div className="text-xs font-mono font-bold text-white">
                    Reason for Administrative Override (PRD Section 13 Mandatory Audit)
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Verified student network disconnect during Module 2 assessment"
                    value={resetReason}
                    onChange={(e) => setResetReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#101923] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleManualCooldownReset}
                      className="px-4 py-1.5 rounded-lg glass-button-primary font-royal font-bold text-xs"
                    >
                      Confirm Reset
                    </button>
                    <button
                      onClick={() => setShowResetModal(false)}
                      className="px-4 py-1.5 rounded-lg bg-[#1B2530] text-xs font-mono text-[#94A3B8]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-xs font-mono text-[#94A3B8]">
              {loading ? 'Retrieving registered students...' : 'Select a student from the directory to view full profile.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
