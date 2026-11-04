import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Activity,
  HelpCircle,
  ListOrdered,
  Share2,
  Copy,
  Check,
  Zap,
  Scale,
  FileText,
  FileCheck2,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import UrgentHelpStrip from '../../components/psychology/UrgentHelpStrip';
import PsychologyAcademyNavbar from '../../components/psychology/PsychologyAcademyNavbar';
import PsychologyAcademyFooter from '../../components/psychology/PsychologyAcademyFooter';
import PsychologyBackgroundWatermark from '../../components/psychology/PsychologyBackgroundWatermark';
import AmbienceAudioPlayer from '../../components/psychology/AmbienceAudioPlayer';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { PSYCHOLOGY_COURSES, PSYCHOLOGY_LEARNING_PATHS } from '../../services/db/psychologyCourses';

/**
 * PsychologyCourseDetailPage — Dedicated Psychology In-Branch Course View
 * Route: /academy/psychology/courses/:slug
 * Features:
 * - 6 structured HUD/Telemetric clinical sections:
 *     01 // CLINICAL OVERVIEW: Beckian cognitive model, therapeutic alliance, collaborative empiricism, clinical skills chips.
 *     02 // CLINICAL OUTCOMES: Core competencies, cognitive restructuring, behavioral experiments, relapse prevention.
 *     03 // PRACTICUM SYLLABUS: Interactive module accordion with expand/collapse all triggers, individual lessons, and 20-MCQ clinical unit evaluations.
 *     04 // ETHICAL PREREQUISITES: RCI & APA ethical codes, patient confidentiality safeguards, non-maleficence, supervised practicum guidelines.
 *     05 // PRACTITIONER CERTIFICATION: 50-MCQ Clinical Certification specifications (80% passing threshold, 60 min), clinical case study evaluation, digital certificate proofs, and link to public verification.
 *     06 // FAQS: 5 clinical psychology and academic FAQs (RCI alignment, peer supervision, practicum requirements, reflection journals).
 * - Calming clinical sage/teal/amber aesthetic (#06101B / #081524, #2DD4BF, #0F766E, #FFA439), liquid glass cards, Lora/Cinzel typography.
 * - Dynamic course lookup, dynamic enrollment status check, and instant enrollment binding.
 */
export default function PsychologyCourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Active HUD Telemetry Tab (6 Tabs)
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [enrolling, setEnrolling] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // Dynamic Course Lookup
  const [course, setCourse] = useState(() => {
    return (
      mockEngine.getCourseBySlug(slug) ||
      mockEngine.getCourseById(slug) ||
      PSYCHOLOGY_COURSES.find((c) => c.slug === slug || c.id === slug) ||
      PSYCHOLOGY_COURSES[0]
    );
  });

  useEffect(() => {
    if (slug) {
      apiClient
        .getCourseBySlug(slug)
        .then((c) => {
          if (c) setCourse(c);
        })
        .catch(() => {
          const local =
            mockEngine.getCourseBySlug(slug) ||
            mockEngine.getCourseById(slug) ||
            PSYCHOLOGY_COURSES.find((c) => c.slug === slug || c.id === slug) ||
            PSYCHOLOGY_COURSES[0];
          if (local) setCourse(local);
        });
    }
  }, [slug]);

  // Dynamic Enrolment Status Check (Strictly Partitioned to 'psychology')
  const enrolment = useMemo(() => {
    if (!currentUser?.id || !course?.id) return null;
    const enrolments = mockEngine.getEnrolmentsForUser(currentUser.id, 'psychology');
    return enrolments.find((e) => e.course_id === course.id) || null;
  }, [currentUser, course]);

  // Module Accordion Helpers
  const toggleModule = (idx) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const expandAllModules = () => {
    const all = {};
    (course?.modules || []).forEach((_, i) => {
      all[i] = true;
    });
    setExpandedModules(all);
  };

  const collapseAllModules = () => {
    setExpandedModules({});
  };

  // Enrolment Handler
  const handleEnrol = async () => {
    if (!currentUser) {
      navigate(`/login?redirect=/academy/psychology/courses/${course.slug}`);
      return;
    }
    try {
      setEnrolling(true);
      const enr = mockEngine.enrolStudent(currentUser.id, course.id);
      if (enr) {
        navigate(`/student/course/${course.id}`);
      }
    } catch (err) {
      console.error('Enrolment error:', err);
    } finally {
      setEnrolling(false);
    }
  };

  // Sample Cryptographic SHA-256 Signature Proof for Demonstration
  const sampleSha256 = '8c2f1d9a4e3b7c0f5a6b8d9e2f1a0b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a';

  const copyHashToClipboard = () => {
    navigator.clipboard?.writeText(sampleSha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const totalLessonsCount = useMemo(() => {
    if (!course?.modules) return 24;
    return course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  }, [course]);

  // Clinical Skills Chips
  const skillsList = course.skills || [
    'Beckian Cognitive Model',
    'Therapeutic Alliance',
    'Collaborative Empiricism',
    'Cognitive Restructuring',
    'Automatic Thought Records',
    'Behavioral Activation',
    'Core Belief Restructuring',
    'Exposure Protocols',
    'Relapse Prevention'
  ];

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

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link
            to="/academy/psychology"
            className="hover:text-teal-300 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>Psychology Academy</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Courses</span>
          <span className="text-slate-600">/</span>
          <span className="text-teal-200 truncate max-w-xs">{course.title}</span>
        </div>

        {/* HERO BANNER: Clinical Telemetry Header */}
        <div className="relative mb-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#081726]/90 via-[#06121E]/95 to-[#040A12]/98 backdrop-blur-2xl border border-teal-500/30 shadow-[0_0_40px_rgba(45,212,191,0.15)] overflow-hidden">
          {/* Subtle Sage Glow in Top Corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Course Title, Objectives, & Telemetry */}
            <div className="lg:col-span-8 space-y-4">
              {/* Telemetry Status Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-500/35 text-[10px] font-mono font-bold text-teal-300 uppercase tracking-wider shadow-[0_0_12px_rgba(45,212,191,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>CLINICAL PSYCHOLOGY // PRACTICUM CURRICULUM</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#06101B]/80 border border-teal-500/20 text-slate-300">
                  {course.difficulty || 'Intermediate to Advanced'}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#06101B]/80 border border-amber-500/30 text-amber-300">
                  RCI &amp; APA ALIGNED
                </span>
              </div>

              {/* Title */}
              <h1 className="font-royal text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {course.title}
              </h1>

              {/* Overview Subtitle */}
              <p className="text-slate-300 text-xs sm:text-sm lg:text-base font-sans leading-relaxed">
                {course.overview}
              </p>

              {/* Key Highlights Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#06101B]/80 border border-teal-500/20">
                  <div className="text-[10px] font-mono text-teal-400 uppercase">PRACTICUM SPAN</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.estimated_duration || '10 Weeks'}
                  </div>
                  <div className="text-[10px] text-slate-400">{course.effort || '4 hrs / week'}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#06101B]/80 border border-teal-500/20">
                  <div className="text-[10px] font-mono text-teal-400 uppercase">CLINICAL MODULES</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.modules?.length || 6} Modules
                  </div>
                  <div className="text-[10px] text-slate-400">{totalLessonsCount} Clinical Units</div>
                </div>

                <div className="p-3 rounded-xl bg-[#06101B]/80 border border-teal-500/20">
                  <div className="text-[10px] font-mono text-teal-400 uppercase">ASSESSMENT GATES</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    20-MCQ + 50-MCQ
                  </div>
                  <div className="text-[10px] text-slate-400">80% Mastery Standard</div>
                </div>

                <div className="p-3 rounded-xl bg-[#06101B]/80 border border-teal-500/20">
                  <div className="text-[10px] font-mono text-amber-400 uppercase">CREDENTIAL</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white truncate">
                    {course.milestone_cert ? 'RCCP Certified' : 'SHA-256 Proof'}
                  </div>
                  <div className="text-[10px] text-slate-400">Public Verification</div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Enrolment Action Box (Liquid Glass Card) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#081524]/90 border border-teal-500/35 shadow-xl shadow-black/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-teal-500/15">
                <div className="text-xs font-mono text-teal-300 uppercase font-bold">
                  INSTITUTIONAL ACCESS
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/15 text-teal-300 border border-teal-400/30">
                  100% FREE
                </span>
              </div>

              {/* Status & CTA */}
              {enrolment ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>Practitioner Enrolment Active: {enrolment.id}</span>
                  </div>

                  <Link
                    to={`/student/course/${course.id}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-[#06101B] font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-all flex items-center justify-center gap-2"
                  >
                    <Brain className="w-4 h-4 text-[#06101B]" />
                    <span>Enter Clinical Classroom</span>
                  </Link>

                  <Link
                    to="/academy/psychology/student"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#06101B]/80 border border-teal-500/30 text-slate-200 hover:text-white hover:border-teal-400 font-mono text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span>Open Practitioner Dashboard</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    Instant enrolment binds your unified RK Practitioner profile, granting full access to clinical lectures, reflection journals, case study formulations, and 50-MCQ certification.
                  </div>

                  <button
                    type="button"
                    onClick={handleEnrol}
                    disabled={enrolling}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2DD4BF] via-[#14B8A6] to-[#0F766E] text-[#06101B] font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4 text-[#06101B]" />
                    <span>{enrolling ? 'INITIALIZING PRACTITIONER ID...' : 'Instant Enrolment (Free Institutional Access)'}</span>
                  </button>

                  <div className="text-[10px] font-mono text-slate-400 text-center">
                    Unified RK ID • Evidence-Based • Non-Profit Clinical Education
                  </div>
                </div>
              )}

              {/* Author & Supervisor Assurance */}
              <div className="pt-3 border-t border-teal-500/15 space-y-2 text-[11px] font-sans">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Lead Supervisor: {course.lead_author?.name || 'Dr. Ananya Sen, PhD'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <HeartHandshake className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>APA &amp; RCI Ethical Code Standards Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 STRUCTURED HUD / TELEMETRY TABS NAVIGATION BAR */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-teal-500/25">
            {[
              { id: 'overview', label: '01 // CLINICAL OVERVIEW', icon: Sparkles },
              { id: 'outcomes', label: '02 // CLINICAL OUTCOMES', icon: HeartHandshake },
              { id: 'syllabus', label: '03 // PRACTICUM SYLLABUS', icon: ListOrdered },
              { id: 'eligibility', label: '04 // ETHICAL PREREQUISITES', icon: Scale },
              { id: 'certification', label: '05 // PRACTITIONER CERTIFICATION', icon: Award },
              { id: 'faqs', label: '06 // FAQS', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-950/70 text-teal-300 border-t-2 border-x border-teal-400 shadow-[0_-4px_16px_rgba(45,212,191,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-t-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-300' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENTS (Liquid Glass Cards with Calming Clinical Palette) */}
        <div className="space-y-6">
          {/* TAB 1: CLINICAL OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Beckian Cognitive Model & Collaborative Empiricism */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  <Brain className="w-4 h-4 text-teal-400" />
                  <span>Core Clinical Framework // The Beckian Cognitive Triad</span>
                </div>
                <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  Empirical Principles of Cognitive Behavioral Restructuring
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Cognitive Behavioral Therapy (CBT) operates on the empirical foundation that psychological distress is mediated primarily by internal cognitive appraisals rather than environmental stressors in isolation. By establishing a robust therapeutic alliance rooted in <strong className="text-teal-200">collaborative empiricism</strong>, the practitioner and client operate as clinical co-investigators testing beliefs against empirical real-world evidence.
                </p>

                {/* Cognitive Loop Equation Visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-teal-400 uppercase">Phase 1</div>
                    <div className="text-sm font-bold text-white mt-1">Activating Event</div>
                    <div className="text-[11px] text-slate-400 mt-1">External or somatic trigger</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-teal-400 uppercase">Phase 2</div>
                    <div className="text-sm font-bold text-white mt-1">Cognitive Appraisal</div>
                    <div className="text-[11px] text-slate-400 mt-1">Automatic thoughts &amp; schemas</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-teal-400 uppercase">Phase 3</div>
                    <div className="text-sm font-bold text-white mt-1">Affective Response</div>
                    <div className="text-[11px] text-slate-400 mt-1">Somatic arousal &amp; emotion</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-amber-400 uppercase">Phase 4</div>
                    <div className="text-sm font-bold text-white mt-1">Behavioral Action</div>
                    <div className="text-[11px] text-slate-400 mt-1">Safety behaviors &amp; coping</div>
                  </div>
                </div>
              </div>

              {/* Clinical Skills Chips */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-4">
                <div className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  CLINICAL COMPETENCY CHIPS // EVIDENCE-BASED SKILLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-xs font-mono text-teal-200 flex items-center gap-2"
                    >
                      <Sparkles className="w-3 h-3 text-teal-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Faculty & Supervisor Profile */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <img
                  src={course.lead_author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
                  alt={course.lead_author?.name || 'Dr. Ananya Sen'}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400/50 shadow-md shadow-teal-950/50 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="text-xs font-mono text-teal-400 uppercase">COURSE SUPERVISOR &amp; LEAD FACULTY</div>
                  <h3 className="font-royal text-lg sm:text-xl font-bold text-white">
                    {course.lead_author?.name || 'Dr. Ananya Sen, PhD'}
                  </h3>
                  <div className="text-xs text-teal-200 font-mono">
                    {course.lead_author?.title || 'Senior Clinical Psychologist & CBT Supervisor'}
                  </div>
                  <p className="text-xs text-slate-300 font-sans pt-1">
                    {course.lead_author?.role || 'Director of Behavioral Sciences, RedKross Psychology Division'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CLINICAL OUTCOMES */}
          {activeTab === 'outcomes' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Clinical Competencies &amp; Behavioral Mastery</span>
                </div>
                <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  Structured Clinical Learning Outcomes
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Upon completion of this curriculum, practitioners demonstrate objective clinical competency across four foundational diagnostic and therapeutic domains:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center font-bold">
                        01
                      </div>
                      <h4 className="font-royal text-sm font-bold text-teal-100">
                        Cognitive Restructuring &amp; Thought Records
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Operationalize 7-column automatic thought records, identify negative cognitive distortions (catastrophizing, personalization, emotional reasoning), and guide downward-arrow core belief discovery.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center font-bold">
                        02
                      </div>
                      <h4 className="font-royal text-sm font-bold text-teal-100">
                        Graded Behavioral Experiments
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Formulate hypothesis-driven behavioral experiments to reality-test maladaptive safety mechanisms and test cognitive schemas in naturalistic environments.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center font-bold">
                        03
                      </div>
                      <h4 className="font-royal text-sm font-bold text-teal-100">
                        Exposure Hierarchies &amp; SUDS Tracking
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Construct graded in-vivo and imaginal exposure protocols for anxiety and panic disorders, calibrating habituation using Subjective Units of Distress Scale (SUDS 0–100).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                        04
                      </div>
                      <h4 className="font-royal text-sm font-bold text-amber-100">
                        Relapse Prevention &amp; Long-Term Resilience
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Author clinical therapy blueprints, codifying individualized early warning signals, autonomous coping protocols, and longitudinal maintenance plans.
                    </p>
                  </div>
                </div>

                {/* What You Will Learn Bullets */}
                {course.what_you_will_learn && course.what_you_will_learn.length > 0 && (
                  <div className="pt-4 border-t border-teal-500/15 space-y-3">
                    <div className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                      SPECIFIC PRACTICUM CAPABILITIES
                    </div>
                    <div className="space-y-2">
                      {course.what_you_will_learn.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: PRACTICUM SYLLABUS */}
          {activeTab === 'syllabus' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Accordion Controls Bar */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25">
                <div className="text-xs font-mono text-slate-300">
                  Total Curriculum: <span className="text-teal-300 font-bold">{course.modules?.length || 6} Modules</span> • <span className="text-teal-300 font-bold">{totalLessonsCount} Clinical Units</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAllModules}
                    className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-teal-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAllModules}
                    className="px-3 py-1.5 rounded-lg bg-[#06101B]/80 border border-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-3">
                {(course.modules || []).map((mod, mIdx) => {
                  const isExpanded = !!expandedModules[mIdx];
                  const lessons = mod.lessons || [];
                  return (
                    <div
                      key={mod.id || mIdx}
                      className="rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(mIdx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                            {String(mIdx + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="text-xs font-mono text-teal-400 uppercase">
                              MODULE {mIdx + 1} // PRACTICUM UNIT
                            </div>
                            <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                              {mod.title}
                            </h3>
                            <p className="text-xs text-slate-300 font-sans pt-1">
                              {mod.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pl-4 flex-shrink-0">
                          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-950/60 text-teal-300 border border-teal-500/30">
                            {lessons.length} Clinical Units
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-teal-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Expansion */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-teal-500/15 bg-[#06101B]/80 px-4 sm:px-6 py-4 space-y-2.5"
                          >
                            {lessons.map((les, lIdx) => (
                              <div
                                key={les.id || lIdx}
                                className="p-3 rounded-xl bg-[#081524]/60 border border-teal-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-teal-500/30 transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <BookOpen className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                  <span className="text-xs font-medium text-slate-200">
                                    {les.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    <span>{les.duration || '45 mins'}</span>
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px]">
                                    Evidence Practice
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* 20-MCQ Clinical Unit Evaluation Badge */}
                            <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-950/50 via-teal-900/40 to-teal-950/50 border border-teal-500/30 flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-2 text-teal-200">
                                <FileCheck2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                <span>20-MCQ Clinical Competency Quiz (80% Mastery Standard)</span>
                              </div>
                              <span className="text-[10px] text-amber-300 font-bold uppercase">
                                Unit Assessment Gate
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: ETHICAL PREREQUISITES */}
          {activeTab === 'eligibility' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-teal-400" />
                  <span>Clinical Jurisprudence &amp; Ethical Guardrails</span>
                </div>
                <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  RCI &amp; APA Ethical Code Standards
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  The RedKross Psychology Academy maintains unconditional alignment with the ethical codes of the Rehabilitation Council of India (RCI) and the American Psychological Association (APA). All enrolled candidates must acknowledge and adhere to the following non-negotiable professional principles:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-teal-300 font-royal font-bold text-sm">
                      <Shield className="w-4 h-4 text-teal-400" />
                      <span>Principle A: Beneficence &amp; Non-Maleficence</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Practitioners strive to benefit those with whom they work and take care to do no harm. In all clinical formulations, student welfare, crisis stabilization, and emotional safety take unconditional precedence.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-teal-300 font-royal font-bold text-sm">
                      <Lock className="w-4 h-4 text-teal-400" />
                      <span>Principle B: Patient Confidentiality &amp; Privacy</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Absolute duty of confidentiality regarding all patient disclosures, therapeutic records, and clinical casework. Rigorous de-identification of all practice notes with clear exceptions for acute harm to self or others.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-teal-300 font-royal font-bold text-sm">
                      <HeartHandshake className="w-4 h-4 text-teal-400" />
                      <span>Principle C: Fidelity &amp; Boundary Management</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Establish relationships of trust with clients and academic peers. Prohibit dual relationships, uphold professional boundaries, and engage in continuous peer supervision.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-amber-300 font-royal font-bold text-sm">
                      <FileCheck2 className="w-4 h-4 text-amber-400" />
                      <span>Supervised Practicum Guidelines</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Candidates must document at least 1 weekly peer reflection journal entry, participate in simulated case formulation reviews, and operate strictly under senior clinical supervision.
                    </p>
                  </div>
                </div>

                {/* Institutional Ethics Pledge */}
                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-start gap-3 text-xs text-slate-300 font-mono">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-teal-200 font-bold">Institutional Ethics Pledge:</span> Enrolment in this track constitutes an explicit agreement to uphold client autonomy, practice evidence-based psychological science, and immediately trigger crisis escalation protocols when acute distress or suicidality is identified.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: PRACTITIONER CERTIFICATION */}
          {activeTab === 'certification' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>Clinical Assessment Architecture // RedKross Ledger</span>
                </div>
                <h2 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  50-MCQ Proctored Clinical Certification
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  The RedKross Certified CBT Practitioner (RCCP) credential is awarded only upon rigorous demonstration of clinical competency through our proctored assessment engine:
                </p>

                {/* Exam Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-teal-400 uppercase">ASSESSMENT FORMAT</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">50 Case Vignette MCQs</div>
                    <div className="text-[11px] text-slate-400 mt-1">Diagnostic &amp; intervention items</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-teal-400 uppercase">PASSING STANDARD</div>
                    <div className="text-lg font-bold font-mono text-teal-300 mt-1">80% Mastery Threshold</div>
                    <div className="text-[11px] text-slate-400 mt-1">40 / 50 correct answers required</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06101B]/90 border border-teal-500/20 text-center">
                    <div className="text-[10px] font-mono text-amber-400 uppercase">ANTI-CHEAT LOCKDOWN</div>
                    <div className="text-lg font-bold font-mono text-amber-300 mt-1">Tab-Blur Protocol</div>
                    <div className="text-[11px] text-slate-400 mt-1">3 attempts max • 24-hr lockout</div>
                  </div>
                </div>

                {/* Cryptographic SHA-256 Proof Demonstration */}
                <div className="p-5 rounded-xl bg-[#06101B]/90 border border-teal-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono text-teal-300 font-bold uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Tamper-Proof SHA-256 Cryptographic Signature</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase">
                      RedKross Public Verification Ledger
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Upon passing the proctored exam, the credential engine cryptographically signs your Practitioner ID, course completion timestamp, and exam score into an immutable SHA-256 digest verifiable worldwide:
                  </p>

                  <div className="p-3 rounded-lg bg-black/60 border border-teal-500/30 flex items-center justify-between gap-3">
                    <code className="text-xs font-mono text-teal-300 truncate">
                      {sampleSha256}
                    </code>
                    <button
                      type="button"
                      onClick={copyHashToClipboard}
                      className="px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-mono flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {copiedHash ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-300" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-teal-300" />
                          <span>COPY HASH</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[11px] font-mono text-slate-400">
                      Public Ledger Route: <code className="text-teal-400">/verify/:credentialId</code>
                    </div>
                    <Link
                      to="/verify"
                      className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Verification Gateway</span>
                      <ExternalLink className="w-3 h-3 text-teal-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === 'faqs' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {[
                {
                  q: 'How does this curriculum align with RCI and international clinical psychology benchmarks?',
                  a: 'The curriculum is built strictly on empirical evidence-based practices aligned with Rehabilitation Council of India (RCI) guidelines and APA Division 12 clinical standards. Modules cover Beckian formulation, Socratic dialogue, and exposure hierarchies, delivered through clinical case vignettes.'
                },
                {
                  q: 'What are the requirements for peer supervision and case study reflection?',
                  a: 'Practitioners engage with the interactive Clinical Reflection Journal and Case Notes workspace. Each lesson prompts self-reflection on countertransference, therapeutic alliance dilemmas, and thought restructuring accuracy.'
                },
                {
                  q: 'How do the 20-MCQ Unit Quizzes and 50-MCQ Final Proctored Certification work?',
                  a: 'Each clinical module concludes with a 20-MCQ competency evaluation (80% pass threshold). Once all unit lessons and quizzes are cleared, candidates unlock the 50-MCQ final certification exam. The final exam features strict tab-blur anti-cheat lockdown, 60-minute duration, and a maximum of 3 attempts per 24 hours.'
                },
                {
                  q: 'How are patient confidentiality and ethical standards upheld during mock casework?',
                  a: 'All clinical case studies utilized in the curriculum are fully de-identified and composite vignettes. Students are trained in ethical data handling, informed consent safeguards, and the legal limits of confidentiality regarding imminent harm.'
                },
                {
                  q: 'What credentials are awarded upon completion, and how can employers or universities verify them?',
                  a: 'Graduates receive the RedKross Certified CBT Practitioner (RCCP) credential, backed by an immutable SHA-256 digital signature hash. Employers and institutions can independently verify authenticity in real-time via the public portal at /verify/:credentialId.'
                }
              ].map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/25 space-y-2"
                >
                  <h3 className="font-royal text-base font-bold text-teal-100 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pl-6.5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Psychology In-Branch Footer */}
      <PsychologyAcademyFooter />
    </div>
  );
}
