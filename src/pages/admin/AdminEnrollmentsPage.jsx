import React, { useState, useEffect } from 'react';
import {
  GraduationCap, Plus, Users, Calendar, Clock, Search,
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminEnrollmentsPage() {
  const [cohorts, setCohorts] = useState([
    {
      id: 'COH-ALPHA-26',
      name: 'Cyber Operators 2026-Alpha',
      course_id: 'CRS-SOC-01',
      course_title: 'SOC Analyst L1 & L2 Defensive Operations',
      member_count: 18,
      start_date: '2026-10-01',
      expiry_date: '2026-12-31',
      status: 'ACTIVE',
      avg_progress: 68
    },
    {
      id: 'COH-RED-02',
      name: 'Red Team Adversary Batch 2',
      course_id: 'CRS-OFF-02',
      course_title: 'Offensive Exploitation & Active Directory Attacks',
      member_count: 12,
      start_date: '2026-10-15',
      expiry_date: '2027-01-15',
      status: 'ACTIVE',
      avg_progress: 35
    }
  ]);

  const [enrollments, setEnrollments] = useState([]);
  const [cohortModalOpen, setCohortModalOpen] = useState(false);
  const [cohortForm, setCohortForm] = useState({
    name: '',
    course_title: 'SOC Analyst L1 & L2 Defensive Operations',
    expiry_date: '2027-02-01',
    initial_students: ''
  });

  const loadEnrollments = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.enrolments) {
        setEnrollments(db.enrolments);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleCreateCohort = (e) => {
    e.preventDefault();
    if (!cohortForm.name) return;

    const newCohort = {
      id: 'COH-' + Date.now().toString(36).toUpperCase(),
      name: cohortForm.name,
      course_id: 'CRS-GEN',
      course_title: cohortForm.course_title,
      member_count: 1,
      start_date: new Date().toISOString().split('T')[0],
      expiry_date: cohortForm.expiry_date,
      status: 'ACTIVE',
      avg_progress: 0
    };

    setCohorts([newCohort, ...cohorts]);
    setCohortModalOpen(false);

    mockEngine.logAction({
      action: 'COHORT_PROVISIONED',
      category: 'STUDENT_ADMIN',
      details: `Admin established new cohort group: ${cohortForm.name} with expiry ${cohortForm.expiry_date}`,
      severity: 'INFO'
    });
  };

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-white font-lora">
            Cohort Management & Timed Access
          </h3>
          <p className="text-xs text-[#8BA2B5]">
            Provision group memberships and time-bound curriculum licenses.
          </p>
        </div>

        <button
          onClick={() => setCohortModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Cohort Batch</span>
        </button>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="p-5 cyber-glass-panel hover:border-[#263440] rounded-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 mb-2 inline-block">
                  {cohort.id}
                </span>
                <h4 className="text-base font-bold text-white font-lora">{cohort.name}</h4>
                <p className="text-xs text-[#8BA2B5] mt-0.5">{cohort.course_title}</p>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30">
                {cohort.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3 cyber-glass-card rounded-lg text-xs font-mono">
              <div>
                <span className="text-[#8BA2B5] text-[10px] block">MEMBERS</span>
                <span className="text-white font-bold">{cohort.member_count} Students</span>
              </div>
              <div>
                <span className="text-[#8BA2B5] text-[10px] block">EXPIRY DATE</span>
                <span className="text-[#F59E0B] font-bold">{cohort.expiry_date}</span>
              </div>
              <div>
                <span className="text-[#8BA2B5] text-[10px] block">AVG PROGRESS</span>
                <span className="text-[#65F58A] font-bold">{cohort.avg_progress}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-[#8BA2B5]">Batch Completion Rate</span>
                <span className="text-white font-bold">{cohort.avg_progress}%</span>
              </div>
              <div className="w-full bg-[#1B2530] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#65F58A] h-full rounded-full transition-all"
                  style={{ width: `${cohort.avg_progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cohort Modal */}
      {cohortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[500px] cyber-glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 font-lora">
              Provision New Cohort Batch
            </h3>
            <form onSubmit={handleCreateCohort} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Cohort Name *
                </label>
                <input
                  type="text"
                  required
                  value={cohortForm.name}
                  onChange={(e) => setCohortForm({ ...cohortForm, name: e.target.value })}
                  placeholder="e.g. Enterprise Incident Responders Batch 4"
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Enrolled Master Course Track
                </label>
                <input
                  type="text"
                  value={cohortForm.course_title}
                  onChange={(e) => setCohortForm({ ...cohortForm, course_title: e.target.value })}
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Access Expiration Date
                </label>
                <input
                  type="date"
                  value={cohortForm.expiry_date}
                  onChange={(e) => setCohortForm({ ...cohortForm, expiry_date: e.target.value })}
                  className="w-full cyber-glass-card rounded p-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  type="button"
                  onClick={() => setCohortModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Provision Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

