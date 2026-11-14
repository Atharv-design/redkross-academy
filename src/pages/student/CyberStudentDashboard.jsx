import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Shield,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Cpu,
  Layers,
  Lock,
  Unlock,
  Zap,
  ArrowRight,
  ExternalLink,
  Activity,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  Copy,
  Check,
  UserCheck,
  TrendingUp,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CyberShaderBackground from '../../components/ui/CyberShaderBackground';
import CyberDivisionWatermark from '../../components/cyber/CyberDivisionWatermark';
import CyberAcademyNavbar from '../../components/cyber/CyberAcademyNavbar';
import Footer from '../../components/common/Footer';
import CyberLabDesktopWindow from '../../components/student/CyberLabDesktopWindow';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';
import { CYBER_COURSES } from '../../services/db/cyberCourses';

/**
 * CyberStudentDashboard — Dedicated In-Branch Cybersecurity Student Dashboard
 * Route: /academy/cybersecurity/student
 * Features:
 * - Lists active cyber enrollments strictly isolated via mockEngine.getEnrolmentsForUser(cadetId, 'cybersecurity')
 * - Real-time statistics via mockEngine.getStudentStatsByDivision(cadetId, 'cybersecurity')
 * - 1-Click Kali CyberLab V3 Desktop Sandbox Launcher
 * - Cryptographic SHA-256 certificate proofs with instant verification links
 * - Zero psychology course leakage guarantee
 */
export default function CyberStudentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isLabMinimized, setIsLabMinimized] = useState(false);
  const [copiedHash, setCopiedHash] = useState(null);

  const [stats, setStats] = useState({
    activeCourses: 0,
    completedLessons: 0,
    averageScore: 0,
    averageProgress: 0,
    certificates: [],
    certificatesCount: 0
  });
  const [enrolments, setEnrolments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCadetData = () => {
    if (!currentUser?.id) return;
    try {
      setLoading(true);
      const cyberEnrolments = mockEngine.getEnrolmentsForUser(currentUser.id, 'cybersecurity');
      const cyberStats = mockEngine.getStudentStatsByDivision(currentUser.id, 'cybersecurity');

      setEnrolments(cyberEnrolments || []);
      setStats(cyberStats || {
        activeCourses: 0,
        completedLessons: 0,
        averageScore: 0,
        averageProgress: 0,
        certificates: [],
        certificatesCount: 0
      });
    } catch (err) {
      console.error('Error loading cybersecurity cadet dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCadetData();
  }, [currentUser]);

  const handleCopyHash = (hash, id) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleLaunchLab = () => {
    setIsLabOpen(true);
    setIsLabMinimized(false);
  };

  const sampleVerificationHash = '3a7f8b9c2e1d0f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';

  return (
    <div
      data-academy-theme="cybersecurity"
      className="min-h-screen relative bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-[#FF7A00]/30 selection:text-white overflow-x-clip"
    >
      {/* Ambient Cyber Backgrounds */}
      <CyberCloudsBackground />
      <CyberShaderBackground />
      <CyberDivisionWatermark />

      {/* Cyber In-Branch Header */}
      <CyberAcademyNavbar />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-8">
        {/* OPERATOR TELEMETRY BANNER */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A1208]/90 via-[#0E0C09]/90 to-[#070503]/95 backdrop-blur-2xl border border-[#FF7A00]/35 shadow-[0_0_40px_rgba(255,122,0,0.2)] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                  <span>CADET COCKPIT // CYBER DIVISION</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/60 border border-white/10 text-slate-300">
                  RK-ID: {currentUser?.cadet_id || currentUser?.id || 'RK-DEF-CADET'}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/60 border border-[#00AEEF]/40 text-[#00AEEF]">
                  SEC-LEVEL: UNIFIED OPERATOR
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-royal text-white tracking-tight">
                Cyber Student Dashboard
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
                Welcome, Cadet <span className="text-white font-semibold">{currentUser?.name || currentUser?.full_name || 'Operator'}</span>. Your defensive curriculum, learning progress, and cryptographic certifications are isolated to this secure student dashboard.
              </p>
            </div>

            {/* Quick Action Navigation Button */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/academy/cybersecurity"
                className="px-5 py-3 rounded-2xl bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-[#FFA439] font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FFA439]" />
                <span>Explore Tracks</span>
              </Link>
            </div>
          </div>

          {/* TELEMETRY STATS GRID (Division-Scoped) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold">
                ACTIVE CYBER TRACKS
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                {stats.activeCourses || enrolments.length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Enrolled courses</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold">
                COMPLETED LESSONS
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                {stats.completedLessons || 0}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Mandatory units cleared</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold">
                AVERAGE ASSESSMENT
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                {stats.averageScore ? `${stats.averageScore}%` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Quiz &amp; lab score</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold">
                SHA-256 CREDENTIALS
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                {stats.certificatesCount || (Array.isArray(stats.certificates) ? stats.certificates.length : 0)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Tamper-proof proofs</div>
            </div>
          </div>
        </div>

        {/* ACTIVE CYBERSECURITY ENROLLMENTS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#FF7A00]/25">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-royal text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FFA439]" />
                <span>Active Cyber Enrollments</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Exclusively cybersecurity curricula. Zero cross-academy course leakage.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
              [ {enrolments.length} ACTIVE TRACK{enrolments.length === 1 ? '' : 'S'} ]
            </span>
          </div>

          {enrolments.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-black/50 border border-white/10 text-center space-y-4">
              <Terminal className="w-10 h-10 text-[#FFA439] mx-auto opacity-70" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-royal text-white">
                  No Active Cyber Enrollment Detected
                </h3>
                <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
                  Enroll in the official cybersecurity master curricula with instant institutional access and on-chain verification.
                </p>
              </div>
              <Link
                to="/academy/cybersecurity#courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)]"
              >
                <span>Explore Cyber Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {enrolments.map((enr) => {
                const course =
                  mockEngine.getCourseById(enr.course_id) ||
                  CYBER_COURSES.find((c) => c.id === enr.course_id) ||
                  CYBER_COURSES[0];
                const progress = mockEngine.getCourseProgress(enr.id) || { percentage: 0 };
                const completedCount = (enr.completed_mandatory_lessons || []).length;
                const totalLessons = course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 78;

                return (
                  <div
                    key={enr.id}
                    className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/30 hover:border-[#FFA439]/60 transition-all shadow-lg space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-[#FFA439] uppercase">
                            DEFENSIVE CYBER
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            Enrolment ID: {enr.id}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-royal text-white">
                          {(course?.title || 'Cybersecurity Defense Track').replace(/^Course\s*\d+:\s*/i, '')}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/student/course/${course?.id || enr.course_id}`}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)] flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Enter Classroom</span>
                        </Link>
                        <Link
                          to={`/academy/cybersecurity/courses/${course?.slug || course?.id || enr.course_id}`}
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-colors flex items-center gap-1.5"
                        >
                          <span>Syllabus</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Progress Bar & Telemetry */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">
                          Progress: {completedCount} / {totalLessons} Lessons Completed
                        </span>
                        <span className="text-[#FFA439] font-bold">
                          {progress.percentage || 0}% Complete
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-black/80 border border-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFA439] rounded-full transition-all duration-500 shadow-[0_0_10px_#FFA439]"
                          style={{ width: `${Math.min(100, Math.max(2, progress.percentage || 0))}%` }}
                        />
                      </div>
                    </div>

                    {/* Exam and Lab Quick Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                      <Link
                        to={`/student/final-exam/${enr.id}`}
                        className="text-[#FFA439] hover:underline flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>50-MCQ Final Certification Exam</span>
                      </Link>
                      <span className="text-slate-600">•</span>
                      <button
                        type="button"
                        onClick={handleLaunchLab}
                        className="text-[#00AEEF] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Practice in Kali Sandbox</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* CRYPTOGRAPHIC SHA-256 CERTIFICATE PROOFS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#FF7A00]/25">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-royal text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFA439]" />
                <span>Cryptographic SHA-256 Certificate Proofs</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Immutable digital signatures verified on the public RedKross credential ledger.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
              [ LEDGER VERIFICATION READY ]
            </span>
          </div>

          {Array.isArray(stats.certificates) && stats.certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/40 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF7A00]/20 text-[#FFA439] border border-[#FF7A00]/30 uppercase">
                      VERIFIED CREDENTIAL
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Score: {cert.grade_percentage || 85}%
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-royal text-white">
                    {cert.title || 'Certified Cybersecurity Defender Associate (CCDA)'}
                  </h3>

                  <div className="p-3 rounded-lg bg-black/80 border border-white/10 font-mono text-xs space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase">SHA-256 SIGNATURE</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#FFA439] truncate text-[11px]">
                        {cert.signature || cert.verification_hash || sampleVerificationHash}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyHash(cert.signature || cert.verification_hash || sampleVerificationHash, cert.id)}
                        className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-200 hover:text-white shrink-0 cursor-pointer"
                      >
                        {copiedHash === cert.id ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Issued: {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : 'Active Cohort'}
                    </span>
                    <Link
                      to={`/verify/${cert.id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#FFA439] hover:underline"
                    >
                      <span>Public Proof Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FFA439]" />
                    <h3 className="text-base font-bold font-royal text-white">
                      Certified Cybersecurity Defender Associate (Pending Exam Passage)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
                    Complete all 12 modules and pass the 50-MCQ proctored certification exam (80% passing threshold) to seal your deterministic SHA-256 cryptographic signature.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-center shrink-0">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">EXAM REQUIREMENT</div>
                  <div className="text-lg font-bold font-mono text-white">80% Pass</div>
                  <div className="text-[10px] text-slate-400">Anti-Cheat Active</div>
                </div>
              </div>

              {/* Sample Proof Visualizer */}
              <div className="p-3 rounded-lg bg-black/80 border border-white/10 font-mono text-xs flex items-center justify-between gap-2 overflow-x-auto">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-500">[SAMPLE PROOF]:</span>
                  <span className="text-[#FFA439] truncate">{sampleVerificationHash}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyHash(sampleVerificationHash, 'sample')}
                  className="px-2 py-1 rounded bg-[#FF7A00]/20 hover:bg-[#FF7A00]/40 text-[#FFA439] text-[10px] flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                >
                  {copiedHash === 'sample' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-[#FFA439]" />}
                  <span>{copiedHash === 'sample' ? 'COPIED' : 'COPY HASH'}</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Kali CyberLab V3 Desktop Modal Window */}
      {isLabOpen && (
        <CyberLabDesktopWindow
          isOpen={isLabOpen}
          onClose={() => setIsLabOpen(false)}
          isMinimized={isLabMinimized}
          onMinimize={() => setIsLabMinimized(true)}
          onRestore={() => setIsLabMinimized(false)}
        />
      )}

      {/* Cyber In-Branch Footer */}
      <Footer />
    </div>
  );
}
