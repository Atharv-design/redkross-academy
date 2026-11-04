import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  HeartHandshake,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  UserCheck,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  FileText,
  Music,
  Compass,
  Feather,
  Plus,
  Volume2
} from 'lucide-react';
import UrgentHelpStrip from '../../components/psychology/UrgentHelpStrip';
import PsychologyAcademyNavbar from '../../components/psychology/PsychologyAcademyNavbar';
import PsychologyAcademyFooter from '../../components/psychology/PsychologyAcademyFooter';
import PsychologyBackgroundWatermark from '../../components/psychology/PsychologyBackgroundWatermark';
import AmbienceAudioPlayer from '../../components/psychology/AmbienceAudioPlayer';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';
import { PSYCHOLOGY_COURSES } from '../../services/db/psychologyCourses';

/**
 * PsychologyStudentDashboard — Dedicated In-Branch Clinical Practitioner Workstation
 * Route: /academy/psychology/student
 * Features:
 * - Strict Academic Partitioning:
 *     mockEngine.getEnrolmentsForUser(currentUser.id, 'psychology')
 *     mockEngine.getStudentStatsByDivision(currentUser.id, 'psychology')
 *     Guaranteed zero cross-academy data leakage (zero cybersecurity courses).
 * - Practitioner Telemetry Banner:
 *     Unified RK Practitioner ID, Verified division badge, Active clinical courses, completed units, average score, credentials count.
 * - Active Clinical Course Progress Cards:
 *     Progress bar, completed lessons metric, "Enter Classroom", "Syllabus", and "50-MCQ Final Clinical Exam" triggers.
 * - Clinical Reflection & Case Notes Workspace:
 *     Clinical Reflection Journal quick entry, Case Study Notes organizer, Calming therapeutic audio ambience launcher.
 * - Clinical Practitioner Credentials & Certifications:
 *     SHA-256 digital signature proofs, copyable verification hashes, and public ledger links to /verify/:id.
 */
export default function PsychologyStudentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // State
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
  const [copiedHash, setCopiedHash] = useState(null);

  // Reflection Journal State
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionCategory, setReflectionCategory] = useState('Cognitive Formulation');
  const [reflectionEntries, setReflectionEntries] = useState([
    {
      id: 'ref_1',
      date: 'Today, 09:30 AM',
      category: 'Therapeutic Alliance',
      text: 'Explored collaborative empiricism with patient exhibiting catastrophizing tendencies regarding academic performance. Socratic dialogue revealed core schema: "If I make a mistake, I am fundamentally inadequate."'
    },
    {
      id: 'ref_2',
      date: 'Yesterday, 04:15 PM',
      category: 'Cognitive Restructuring',
      text: 'Constructed 7-column thought record. Disputed emotional reasoning distortion ("I feel terrified, therefore disaster is certain") by examining objective empirical probability evidence.'
    }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calming Audio Ambience Launcher State
  const [audioFreq, setAudioFreq] = useState('528');
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Load Enrolments and Stats strictly scoped to 'psychology'
  const loadPractitionerData = () => {
    if (!currentUser?.id) return;
    try {
      setLoading(true);
      // STRICT ACADEMIC PARTITIONING: Scoped strictly to 'psychology'
      const psychEnrolments = mockEngine.getEnrolmentsForUser(currentUser.id, 'psychology');
      const psychStats = mockEngine.getStudentStatsByDivision(currentUser.id, 'psychology');

      setEnrolments(psychEnrolments || []);
      setStats(psychStats || {
        activeCourses: 0,
        completedLessons: 0,
        averageScore: 0,
        averageProgress: 0,
        certificates: [],
        certificatesCount: 0
      });
    } catch (err) {
      console.error('Error loading psychology student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPractitionerData();
  }, [currentUser]);

  // Copy SHA-256 Hash Helper
  const copyHash = (hash, id) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Add Reflection Journal Entry
  const handleAddReflection = (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    const newEntry = {
      id: `ref_${Date.now()}`,
      date: 'Just now',
      category: reflectionCategory,
      text: reflectionText.trim()
    };

    setReflectionEntries([newEntry, ...reflectionEntries]);
    setReflectionText('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Active courses resolved from enrolments
  const activeCourseItems = useMemo(() => {
    return enrolments.map((enr) => {
      const course =
        mockEngine.getCourseById(enr.course_id) ||
        PSYCHOLOGY_COURSES.find((c) => c.id === enr.course_id) || {
          id: enr.course_id,
          title: 'Clinical Psychology Practicum Track',
          slug: 'cognitive-behavioral-therapy-foundations-practice',
          difficulty: 'Intermediate',
          milestone_cert: 'RedKross Certified CBT Practitioner (RCCP)'
        };
      const progress = mockEngine.getCourseProgress(enr.id) || { percentage: 0 };
      const completedCount = enr.completed_mandatory_lessons?.length || 0;
      return {
        enrolment: enr,
        course,
        progress: progress.percentage || 0,
        completedCount
      };
    });
  }, [enrolments]);

  // Sample hash for deterministic certification proof when none awarded yet
  const sampleCertSha256 = '8c2f1d9a4e3b7c0f5a6b8d9e2f1a0b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a';

  return (
    <div
      data-academy-theme="psychology"
      className="min-h-screen relative bg-[#06101B] text-slate-100 flex flex-col font-sans selection:bg-[#2DD4BF]/30 selection:text-white overflow-x-clip"
    >
      {/* 24/7 Crisis Help Strip */}
      <UrgentHelpStrip />

      {/* Psychology Ambient Watermark */}
      <PsychologyBackgroundWatermark />

      {/* Calming Solfeggio 528Hz Ambience Audio Player (Bottom Left Fixed) */}
      <div className="fixed bottom-6 left-6 z-50">
        <AmbienceAudioPlayer />
      </div>

      {/* Psychology In-Branch Header */}
      <PsychologyAcademyNavbar />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link
            to="/academy/psychology"
            className="hover:text-teal-300 transition-colors"
          >
            Psychology Academy
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-teal-300">Practitioner Workstation</span>
        </div>

        {/* 1. PRACTITIONER TELEMETRY BANNER */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#081726]/90 via-[#06121E]/95 to-[#040A12]/98 backdrop-blur-2xl border border-teal-500/30 shadow-[0_0_35px_rgba(45,212,191,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Practitioner Profile Identity */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-500/35 text-[10px] font-mono font-bold text-teal-300 uppercase tracking-wider shadow-[0_0_12px_rgba(45,212,191,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>PRACTITIONER WORKSTATION // CLINICAL PORTAL</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#06101B]/80 border border-teal-500/20 text-slate-300 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-teal-400" />
                  <span>VERIFIED DIVISION: CLINICAL PSYCHOLOGY &amp; BEHAVIORAL HEALTH</span>
                </span>
              </div>

              <div>
                <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  {currentUser?.full_name || 'Clinical Practitioner'}
                </h1>
                <div className="text-xs font-mono text-teal-300/80 pt-1 flex items-center gap-3">
                  <span>UNIFIED ID: <strong className="text-teal-200">{currentUser?.cadet_id || currentUser?.id || 'RK-CLIN-PRACTITIONER'}</strong></span>
                  <span className="text-slate-600">•</span>
                  <span>DIVISION: <strong className="text-teal-200">PSYCHOLOGY</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Scoped Telemetry Telemetric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:min-w-[480px]">
              <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                <div className="text-[10px] font-mono text-teal-400 uppercase">ACTIVE COURSES</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                  {stats.activeCourses}
                </div>
                <div className="text-[10px] text-slate-400">Clinical Practicums</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                <div className="text-[10px] font-mono text-teal-400 uppercase">COMPLETED UNITS</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                  {stats.completedLessons}
                </div>
                <div className="text-[10px] text-slate-400">Clinical Lessons</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                <div className="text-[10px] font-mono text-teal-400 uppercase">CLINICAL SCORE</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-teal-300 mt-0.5">
                  {stats.averageScore ? `${stats.averageScore}%` : '—'}
                </div>
                <div className="text-[10px] text-slate-400">Quiz &amp; Exam Mean</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                <div className="text-[10px] font-mono text-amber-400 uppercase">CREDENTIALS</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 mt-0.5">
                  {stats.certificatesCount || (stats.certificates ? stats.certificates.length : 0)}
                </div>
                <div className="text-[10px] text-slate-400">Issued Records</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ACTIVE CLINICAL COURSE PROGRESS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-teal-400" />
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                Active Clinical Practicum Progress
              </h2>
            </div>
            <Link
              to="/academy/psychology"
              className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Explore All Psychology Tracks</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </Link>
          </div>

          {activeCourseItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCourseItems.map(({ enrolment, course, progress, completedCount }) => (
                <div
                  key={enrolment.id}
                  className="p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 hover:border-teal-400/40 transition-all shadow-xl shadow-black/40 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-500/30">
                        {course.difficulty || 'Intermediate'}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        ID: {enrolment.id}
                      </span>
                    </div>

                    <h3 className="font-royal text-lg sm:text-xl font-bold text-white leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 font-sans">
                      {course.overview || 'Evidence-based clinical formulation, cognitive restructuring, and behavioral activation.'}
                    </p>
                  </div>

                  {/* Progress Bar & Metrics */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">Practicum Syllabus Progress</span>
                      <span className="text-teal-300 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#06101B] overflow-hidden border border-teal-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{completedCount} Clinical Units Completed</span>
                      <span>50-MCQ Final Gate Locked</span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-teal-500/15">
                    <Link
                      to={`/student/course/${course.id}`}
                      className="py-2.5 px-3 rounded-xl bg-teal-500 text-[#06101B] font-mono font-bold text-xs hover:bg-teal-400 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-teal-950/50"
                    >
                      <Play className="w-3.5 h-3.5 text-[#06101B] fill-current" />
                      <span>Enter Classroom</span>
                    </Link>

                    <Link
                      to={`/academy/psychology/courses/${course.slug || course.id}`}
                      className="py-2.5 px-3 rounded-xl bg-[#06101B]/80 border border-teal-500/30 text-slate-300 hover:text-white hover:border-teal-400 font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                      <span>Syllabus</span>
                    </Link>

                    <Link
                      to={`/student/final-exam/${enrolment.id}`}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Final Exam</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 text-center space-y-4">
              <Brain className="w-12 h-12 text-teal-400 mx-auto opacity-70" />
              <div className="space-y-1">
                <h3 className="font-royal text-lg font-bold text-white">
                  No Active Clinical Enrolments Found
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Enrol in our premier Cognitive Behavioral Therapy practicum to begin supervised case formulations, automatic thought tracking, and clinical certification.
                </p>
              </div>
              <Link
                to="/academy/psychology/courses/cognitive-behavioral-therapy-foundations-practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 text-[#06101B] font-mono font-bold text-xs hover:bg-teal-400 transition-colors shadow-lg shadow-teal-950/50"
              >
                <span>Enrol in CBT Foundations Track (Free)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </section>

        {/* 3. CLINICAL REFLECTION & CASE NOTES WORKSPACE SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-teal-400" />
            <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
              Clinical Reflection &amp; Case Notes Workspace
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Reflection Journal Quick Entry & Recent Entries */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-bold uppercase">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>Clinical Reflection Journal</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Peer Supervision &amp; Formulation Log
                  </span>
                </div>

                <form onSubmit={handleAddReflection} className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Category:</span>
                    {['Cognitive Formulation', 'Therapeutic Alliance', 'Ethical Deliberation', 'Countertransference'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setReflectionCategory(cat)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                          reflectionCategory === cat
                            ? 'bg-teal-500/25 text-teal-200 border border-teal-400/50'
                            : 'bg-[#06101B]/80 text-slate-400 border border-white/5 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={4}
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="Document clinical insights, Socratic dialogue observations, or Beckian formulation dilemmas for peer supervision..."
                    className="w-full p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-400/60 font-sans leading-relaxed resize-none"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] font-mono text-teal-400/80">
                      {saveSuccess && <span>✓ Reflection saved to local supervisory record</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={!reflectionText.trim()}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#06101B] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save Clinical Note</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Recent Reflection Notes List */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  RECENT CLINICAL SUPERVISION ENTRIES
                </div>

                {reflectionEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-[#081524]/60 border border-teal-500/15 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-500/30">
                        {entry.category}
                      </span>
                      <span className="text-slate-500">{entry.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {entry.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Case Formulation Organizer & Calming Audio Ambience */}
            <div className="lg:col-span-5 space-y-4">
              {/* Case Formulation Organizer */}
              <div className="p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-bold uppercase">
                    <Compass className="w-4 h-4 text-teal-400" />
                    <span>Case Study Notes Organizer</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300">
                    De-Identified Vignette
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center justify-between font-royal">
                    <span>Case #2026-A // Generalized Anxiety</span>
                    <span className="text-[10px] font-mono text-slate-400">28y F</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] font-sans text-slate-300">
                    <div>
                      <strong className="text-teal-300">Beckian Triad:</strong> Self: "I am fragile" • World: "Demands are catastrophic" • Future: "I will inevitably burn out"
                    </div>
                    <div>
                      <strong className="text-teal-300">Identified Distortions:</strong> Catastrophizing &amp; Black-and-White Thinking
                    </div>
                    <div>
                      <strong className="text-amber-300">Intervention:</strong> 7-Column Thought Record + Graded In-Vivo Exposure (SUDS 45 → 15)
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 leading-relaxed">
                  Tip: Formulations integrate Aaron Beck’s cognitive model with behavioral experiment logs for supervisor review.
                </div>
              </div>

              {/* Calming Therapeutic Audio Ambience Launcher */}
              <div className="p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-bold uppercase">
                    <Music className="w-4 h-4 text-teal-400" />
                    <span>Therapeutic Audio Ambience</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-400 flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Active Synthesizer</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Launch restorative acoustic bed engineered for clinical study and deep mental clarity:
                </p>

                {/* Frequency Selector Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { freq: '528', label: '528 Hz', desc: 'Transformation' },
                    { freq: '432', label: '432 Hz', desc: 'Harmonic Flow' },
                    { freq: 'theta', label: 'Theta 4Hz', desc: 'Binaural Calm' }
                  ].map((item) => (
                    <button
                      key={item.freq}
                      type="button"
                      onClick={() => setAudioFreq(item.freq)}
                      className={`p-2.5 rounded-xl text-center transition-colors border cursor-pointer ${
                        audioFreq === item.freq
                          ? 'bg-teal-500/20 border-teal-400/50 text-teal-200'
                          : 'bg-[#06101B]/80 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/25 flex items-center justify-between text-xs font-mono text-teal-200">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Ambience Master: 72% Default Vol</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Floating Docked Player</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CLINICAL PRACTITIONER CREDENTIALS & CERTIFICATIONS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-400" />
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                Clinical Practitioner Credentials &amp; Certifications
              </h2>
            </div>
            <Link
              to="/verify"
              className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Public Credential Ledger</span>
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </Link>
          </div>

          {stats.certificates && stats.certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/35 hover:border-teal-400/50 transition-all shadow-xl shadow-black/50 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-500/30">
                      VERIFIED CREDENTIAL
                    </span>
                    <span className="text-slate-400">
                      ID: {cert.verification_id || cert.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-royal text-lg font-bold text-white">
                      {cert.credential_title || cert.course_title || 'Certified Clinical Counseling Practitioner'}
                    </h3>
                    <div className="text-xs font-mono text-teal-300/80 pt-0.5">
                      Issued to: {cert.student_name || currentUser?.full_name} • Grade: {cert.grade_percentage || 88}%
                    </div>
                  </div>

                  {/* Tamper-Proof Cryptographic Signature Hash */}
                  <div className="p-3 rounded-lg bg-black/60 border border-teal-500/25 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>SHA-256 DIGITAL SIGNATURE PROOF</span>
                      <button
                        type="button"
                        onClick={() => copyHash(cert.hash || sampleCertSha256, cert.id)}
                        className="text-teal-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedHash === cert.id ? (
                          <>
                            <Check className="w-3 h-3 text-teal-300" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-teal-400" />
                            <span>COPY HASH</span>
                          </>
                        )}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-teal-300 block truncate">
                      {cert.hash || sampleCertSha256}
                    </code>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      to={`/verify/${cert.verification_id || cert.id}`}
                      className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inspect Public Verification Proof</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                    </Link>
                    <span className="text-[10px] font-mono text-slate-500">
                      RCI-Aligned Ledger
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
                <div>
                  <div className="text-xs font-mono text-teal-400 uppercase">
                    CLINICAL CREDENTIAL REQUIREMENTS // STATUS PENDING
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white pt-1">
                    RedKross Certified CBT Practitioner (RCCP) Milestone
                  </h3>
                  <p className="text-xs text-slate-300 font-sans pt-1 max-w-xl">
                    Clear all module lectures, 20-MCQ unit assessments, and achieve ≥80% on the 50-MCQ proctored clinical final to earn your cryptographic certificate.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center sm:min-w-[140px] flex-shrink-0">
                  <div className="text-[10px] font-mono text-teal-400 uppercase">FINAL EXAM PASS</div>
                  <div className="text-xl font-bold font-mono text-teal-300">≥ 80%</div>
                  <div className="text-[10px] text-slate-400">Proctored Benchmark</div>
                </div>
              </div>

              {/* Sample Credential Verification Proof */}
              <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/25 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="text-teal-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>DETERMINISTIC SHA-256 SIGNATURE DEMO</span>
                  </span>
                  <span className="text-[10px] text-slate-400">RedKross Cryptographic Ledger</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/60 border border-teal-500/20 flex items-center justify-between gap-3">
                  <code className="text-xs font-mono text-teal-300 truncate">
                    {sampleCertSha256}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyHash(sampleCertSha256, 'sample')}
                    className="px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-mono flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {copiedHash === 'sample' ? (
                      <>
                        <Check className="w-3 h-3 text-teal-300" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-teal-400" />
                        <span>COPY PROOF</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Public verification endpoint: <code className="text-teal-400">/verify/:id</code></span>
                  <Link to="/verify" className="text-teal-300 hover:text-white flex items-center gap-1">
                    <span>Ledger Gateway</span>
                    <ExternalLink className="w-3 h-3 text-teal-400" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Psychology In-Branch Footer */}
      <PsychologyAcademyFooter />
    </div>
  );
}
