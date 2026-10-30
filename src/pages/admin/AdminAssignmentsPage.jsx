import React, { useState, useEffect } from 'react';
import {
  FileCheck2, Plus, Search, Filter, CheckCircle2, AlertCircle,
  FileCode, Download, Eye, Check, X, MessageSquare, Award,
  Sparkles, ExternalLink, Calendar, Send
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    {
      id: 'ASN-01',
      title: 'Practical Malware Triage & PCAP Packet Analysis',
      course_title: 'SOC Analyst L1 & L2 Defensive Operations',
      due_date: '2026-11-15',
      allowed_types: '.pdf only',
      max_size_mb: 25,
      submissions_count: 8,
      pending_review: 2
    },
    {
      id: 'ASN-02',
      title: 'Active Directory Kerberos Ticket Attack Lab Report',
      course_title: 'Offensive Exploitation & Active Directory Attacks',
      due_date: '2026-11-20',
      allowed_types: '.pdf only',
      max_size_mb: 10,
      submissions_count: 5,
      pending_review: 1
    }
  ]);

  const [submissions, setSubmissions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [rubricScores, setRubricScores] = useState({
    correctness: 35, // max 40
    methodology: 25, // max 30
    reporting: 25   // max 30
  });
  const [adminFeedback, setAdminFeedback] = useState('Excellent initial discovery of C2 telemetry.');
  const [gradeStatus, setGradeStatus] = useState('PASSED');

  const loadSubmissions = () => {
    const realSubs = mockEngine.getAssignmentSubmissions();
    if (realSubs && realSubs.length > 0) {
      const mapped = realSubs.map((s) => ({
        id: s.id,
        assignment_id: s.assignment_id || 'ASN-01',
        student_name: s.cadet_id || s.user_id,
        student_email: s.user_id,
        submitted_at: s.submitted_at?.replace('T', ' ').substring(0, 16) || 'Just now',
        file_name: s.file_name,
        file_size: 'PDF Document',
        file_url: s.file_url,
        text_summary: `Technical laboratory analysis report for ${s.assignment_title}.`,
        status: s.status === 'passed' ? 'PASSED' : s.status === 'rejected' ? 'NEEDS_REVISION' : 'PENDING_REVIEW',
        rubric_scores: { correctness: s.grade ? Math.round(s.grade * 0.4) : 35, methodology: s.grade ? Math.round(s.grade * 0.3) : 25, reporting: s.grade ? Math.round(s.grade * 0.3) : 25 },
        admin_feedback: s.reviewer_notes || 'Excellent analytical rigor and technical accuracy.',
        final_grade: s.grade
      }));
      setSubmissions(mapped);
      setSelectedSub((prev) => prev ? mapped.find((m) => m.id === prev.id) || mapped[0] : mapped[0]);
    } else {
      // Default initial mock queue if database has zero submissions yet
      const fallback = [
        {
          id: 'SUB-101',
          assignment_id: 'ASN-01',
          student_name: 'Aditya Rao (RK-89421)',
          student_email: 'aditya.rao@redkross.org.in',
          submitted_at: '2026-10-28 17:45',
          file_name: 'infected_host_analysis.pdf',
          file_size: '4.2 MB',
          text_summary: 'Identified Cobalt Strike Beacon egress via DNS tunneling on port 53. Extracted C2 domain: bad-actor-node.xyz. Full indicators of compromise included in technical report.',
          status: 'PENDING_REVIEW',
          rubric_scores: { correctness: 35, methodology: 25, reporting: 25 },
          admin_feedback: 'Demonstrates thorough log triage.',
          final_grade: null
        }
      ];
      setSubmissions(fallback);
      if (!selectedSub) setSelectedSub(fallback[0]);
    }
  };

  useEffect(() => {
    loadSubmissions();
    const unsub = mockEngine.subscribe(() => {
      loadSubmissions();
    });
    return () => unsub();
  }, []);

  const handleSelectSubmission = (sub) => {
    setSelectedSub(sub);
    setRubricScores(sub.rubric_scores?.correctness ? sub.rubric_scores : { correctness: 35, methodology: 25, reporting: 25 });
    setAdminFeedback(sub.admin_feedback || '');
    setGradeStatus(sub.status === 'NEEDS_REVISION' ? 'NEEDS_REVISION' : 'PASSED');
  };

  const handlePublishGrade = () => {
    if (!selectedSub) return;
    const totalScore = (parseInt(rubricScores.correctness) || 0) +
                       (parseInt(rubricScores.methodology) || 0) +
                       (parseInt(rubricScores.reporting) || 0);

    const targetStatus = gradeStatus === 'PASSED' ? 'passed' : 'rejected';

    try {
      mockEngine.gradeAssignment({
        submissionId: selectedSub.id,
        status: targetStatus,
        grade: totalScore,
        reviewerNotes: adminFeedback,
        reviewerEmail: 'admin@redkross.org.in'
      });
    } catch (e) {
      console.warn('Grade record note:', e);
    }

    loadSubmissions();
    alert(`Grade published! Student ${selectedSub.student_name} received score: ${totalScore}/100 (${gradeStatus}).`);
  };

  return (
    <div className="space-y-6">
      {/* Top Assignment Overview */}
      <div className="grid grid-cols-2 gap-4">
        {assignments.map((asn) => (
          <div
            key={asn.id}
            className="p-4 cyber-glass-panel rounded-xl flex items-center justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] font-mono text-[#65F58A] bg-[#1B2530] px-2 py-0.5 rounded border border-[#263440]">
                  {asn.id}
                </span>
                <span className="text-xs font-mono text-[#8BA2B5]">Due: {asn.due_date}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 font-lora">{asn.title}</h4>
              <p className="text-[11px] text-[#8BA2B5] font-mono">
                Allowed: {asn.allowed_types} (Max {asn.max_size_mb} MB)
              </p>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-[#38BDF8] font-mono">
                {asn.pending_review}
              </span>
              <span className="block text-[10px] font-mono text-[#8BA2B5]">PENDING REVIEW</span>
            </div>
          </div>
        ))}
      </div>

      {/* Split Screen Grading Studio */}
      <div className="grid grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Submissions Column (List + Details) */}
        <div className="col-span-6 cyber-glass-panel rounded-xl flex flex-col overflow-hidden">
          {/* Submissions List Header */}
          <div className="p-4 bg-[#0A121A] border-b border-[#1B2530] flex items-center justify-between">
            <span className="text-xs font-mono text-[#8BA2B5]">
              STUDENT SUBMISSIONS QUEUE ({submissions.length})
            </span>
            <span className="text-[10px] font-mono text-[#65F58A]">Live Sync</span>
          </div>

          <div className="p-3 border-b border-[#1B2530] space-y-2 max-h-48 overflow-y-auto">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSelectSubmission(sub)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  selectedSub?.id === sub.id
                    ? 'bg-[#182330] border-[#65F58A]/50'
                    : 'bg-[#071018] border-[#1B2530] hover:border-[#263440]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{sub.student_name}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                        sub.status === 'PASSED'
                          ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                          : sub.status === 'NEEDS_REVISION'
                          ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8BA2B5]">
                    {sub.file_name} • {sub.submitted_at}
                  </span>
                </div>

                {sub.final_grade !== null && (
                  <span className="text-xs font-mono font-bold text-[#65F58A]">
                    {sub.final_grade}/100
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Submission Inspection Preview */}
          {selectedSub && (
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div className="border border-[#1B2530] bg-[#071018] rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-5 h-5 text-[#38BDF8]" />
                    <span className="text-xs font-mono font-bold text-white">
                      {selectedSub.file_name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#8BA2B5]">{selectedSub.file_size}</span>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] font-mono text-[#8BA2B5] block mb-1">
                    STUDENT EXECUTIVE SUMMARY & REPORT FINDINGS:
                  </label>
                  <p className="text-xs text-[#CBD5E1] bg-[#0D1622] p-3 rounded border border-[#182330] leading-relaxed">
                    {selectedSub.text_summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Split Screen: Rubric Grading & Publication */}
        <div className="col-span-6 cyber-glass-panel rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 bg-[#0A121A] border-b border-[#1B2530]">
            <h3 className="text-sm font-bold text-white font-lora">
              Rubric Assessment & Grade Certification
            </h3>
            <span className="text-[11px] font-mono text-[#8BA2B5]">
              Grading: {selectedSub?.student_name} ({selectedSub?.id})
            </span>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            {/* Criteria 1: Technical Correctness */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">1. Technical IOC Correctness</span>
                <span className="text-[#65F58A]">{rubricScores.correctness} / 40 Pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={rubricScores.correctness}
                onChange={(e) =>
                  setRubricScores({ ...rubricScores, correctness: parseInt(e.target.value) })
                }
                className="w-full accent-[#65F58A]"
              />
              <span className="text-[10px] text-[#8BA2B5] block">
                Identification of C2 beacons, packet signatures, and accurate IP attribution.
              </span>
            </div>

            {/* Criteria 2: Investigation Methodology */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">2. Investigation Methodology</span>
                <span className="text-[#38BDF8]">{rubricScores.methodology} / 30 Pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={rubricScores.methodology}
                onChange={(e) =>
                  setRubricScores({ ...rubricScores, methodology: parseInt(e.target.value) })
                }
                className="w-full accent-[#38BDF8]"
              />
              <span className="text-[10px] text-[#8BA2B5] block">
                Evidence of structured Wireshark filtering, carving, and repeatable forensic steps.
              </span>
            </div>

            {/* Criteria 3: Clarity of Reporting */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">3. Incident Reporting & Mitigation</span>
                <span className="text-[#A855F7]">{rubricScores.reporting} / 30 Pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={rubricScores.reporting}
                onChange={(e) =>
                  setRubricScores({ ...rubricScores, reporting: parseInt(e.target.value) })
                }
                className="w-full accent-[#A855F7]"
              />
              <span className="text-[10px] text-[#8BA2B5] block">
                Professionalism of executive summary and firewall blocking recommendations.
              </span>
            </div>

            {/* Total Calculated Grade */}
            <div className="p-3 cyber-glass-card rounded-lg flex items-center justify-between">
              <span className="text-xs font-mono text-[#8BA2B5]">AGGREGATE RUBRIC SCORE:</span>
              <span className="text-xl font-bold font-mono text-[#65F58A]">
                {(parseInt(rubricScores.correctness) || 0) +
                  (parseInt(rubricScores.methodology) || 0) +
                  (parseInt(rubricScores.reporting) || 0)}
                / 100
              </span>
            </div>

            {/* Pass vs Revision Toggle */}
            <div>
              <label className="text-xs font-mono text-[#8BA2B5] block mb-1.5">
                VERDICT DECISION:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGradeStatus('PASSED')}
                  className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                    gradeStatus === 'PASSED'
                      ? 'bg-[#65F58A]/20 border-[#65F58A] text-[#65F58A]'
                      : 'bg-[#071018] border-[#1B2530] text-[#8BA2B5]'
                  }`}
                >
                  ✓ CERTIFY PASS
                </button>
                <button
                  type="button"
                  onClick={() => setGradeStatus('NEEDS_REVISION')}
                  className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                    gradeStatus === 'NEEDS_REVISION'
                      ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]'
                      : 'bg-[#071018] border-[#1B2530] text-[#8BA2B5]'
                  }`}
                >
                  ⚠ REQUEST REVISION
                </button>
              </div>
            </div>

            {/* Instructor Feedback */}
            <div>
              <label className="text-xs font-mono text-[#8BA2B5] block mb-1.5">
                INSTRUCTOR FEEDBACK & ADVISORY:
              </label>
              <textarea
                rows={3}
                value={adminFeedback}
                onChange={(e) => setAdminFeedback(e.target.value)}
                placeholder="Provide constructive feedback for student portal visibility..."
                className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-[#0A121A] border-t border-[#1B2530] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#8BA2B5]">
              Grades sync immediately to Student Portal.
            </span>
            <button
              onClick={handlePublishGrade}
              className="flex items-center space-x-2 px-5 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674] shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Grade & Notify</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

