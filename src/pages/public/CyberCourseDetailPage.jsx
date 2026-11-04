import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  FileCode,
  AlertTriangle,
  FileCheck,
  Activity,
  Sparkles,
  Radio,
  HelpCircle,
  ListOrdered,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CyberShaderBackground from '../../components/ui/CyberShaderBackground';
import CyberDivisionWatermark from '../../components/cyber/CyberDivisionWatermark';
import CyberAcademyNavbar from '../../components/cyber/CyberAcademyNavbar';
import Footer from '../../components/common/Footer';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { CYBER_COURSES, CYBER_LEARNING_PATHS } from '../../services/db/cyberCourses';

/**
 * CyberCourseDetailPage — Dedicated Cybersecurity In-Branch Course View
 * Route: /academy/cybersecurity/courses/:slug
 * Features:
 * - 6 HUD telemetry tabs: Overview, Outcomes, Syllabus Outline, Eligibility, Certification, FAQs
 * - Liquid glass cards, Amber/Obsidian HUD theme (#FF7A00, #FFA439, #000000, #05070B)
 * - 1-Click Enrolment / Classroom Launch with unified cadet identity
 * - Cryptographic SHA-256 proof spec and Kali CyberLab integration preview
 */
export default function CyberCourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Active HUD Telemetry Tab (6 Tabs)
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [enrolling, setEnrolling] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // Resolve Course
  const [course, setCourse] = useState(() => {
    return (
      mockEngine.getCourseBySlug(slug) ||
      mockEngine.getCourseById(slug) ||
      CYBER_COURSES.find((c) => c.slug === slug || c.id === slug) ||
      CYBER_COURSES[0]
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
            CYBER_COURSES.find((c) => c.slug === slug || c.id === slug) ||
            CYBER_COURSES[0];
          if (local) setCourse(local);
        });
    }
  }, [slug]);

  // Check enrollment status for current cadet
  const enrolment = useMemo(() => {
    if (!currentUser?.id || !course?.id) return null;
    const enrolments = mockEngine.getEnrolmentsForUser(currentUser.id, 'cybersecurity');
    return enrolments.find((e) => e.course_id === course.id) || null;
  }, [currentUser, course]);

  // Toggle Module Accordion
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

  // Enrolment handler
  const handleEnrol = async () => {
    if (!currentUser) {
      navigate(`/login?redirect=/academy/cybersecurity/courses/${course.slug}`);
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

  const sampleSha256 = '3a7f8b9c2e1d0f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';

  const copyHashToClipboard = () => {
    navigator.clipboard?.writeText(sampleSha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const totalLessonsCount = useMemo(() => {
    if (!course?.modules) return 78;
    return course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  }, [course]);

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

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link
            to="/academy/cybersecurity"
            className="hover:text-[#FFA439] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Cyber Academy</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Courses</span>
          <span className="text-slate-600">/</span>
          <span className="text-[#FFA439] truncate max-w-xs">{course.title}</span>
        </div>

        {/* HERO BANNER: Cyber Telemetry Header */}
        <div className="relative mb-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1208]/85 via-[#0E0C09]/90 to-[#070503]/95 backdrop-blur-2xl border border-[#FF7A00]/35 shadow-[0_0_40px_rgba(255,122,0,0.2)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Mission Title & Core Metadata */}
            <div className="lg:col-span-8 space-y-4">
              {/* Telemetry Status Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                  <span>CYBER DIVISION // MASTER CURRICULUM</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/60 border border-white/10 text-slate-300">
                  {course.difficulty || 'Beginner to Advanced'}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/60 border border-[#00AEEF]/30 text-[#00AEEF]">
                  KALI CYBERLAB V3 READY
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
                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">DURATION</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.estimated_duration || '12 Weeks'}
                  </div>
                  <div className="text-[10px] text-slate-400">6–8 hrs / week</div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">SYLLABUS</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.modules?.length || 12} Modules
                  </div>
                  <div className="text-[10px] text-slate-400">{totalLessonsCount} Lessons</div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">EXAM GATES</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    12 Quizzes + Final
                  </div>
                  <div className="text-[10px] text-slate-400">50-MCQ Proctored</div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">CREDENTIAL</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white truncate">
                    SHA-256 Proof
                  </div>
                  <div className="text-[10px] text-slate-400">Verifiable Online</div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Enrolment Action Box (Sticky Liquid Glass) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-black/60 border border-[#FF7A00]/40 shadow-xl shadow-black/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-xs font-mono text-[#FFA439] uppercase font-bold">
                  INSTITUTIONAL ACCESS
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF7A00]/20 text-[#FFA439] border border-[#FF7A00]/40">
                  100% FREE
                </span>
              </div>

              {/* Status & CTA */}
              {enrolment ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-mono text-[#FFA439]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFA439] flex-shrink-0" />
                    <span>Cadet Enrolment Active: {enrolment.id}</span>
                  </div>

                  <Link
                    to={`/student/course/${course.id}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-black" />
                    <span>Enter Cyber Classroom</span>
                  </Link>

                  <Link
                    to="/academy/cybersecurity/student"
                    className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-[#FF7A00]/40 text-slate-200 hover:text-white hover:border-[#FFA439] font-mono text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-[#FFA439]" />
                    <span>Open Cyber Cadet Dashboard</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    Instant enrolment binds your unified RK Cadet profile, granting immediate access to the 12 modules, interactive code lessons, and virtual Kali sandbox.
                  </div>

                  <button
                    type="button"
                    onClick={handleEnrol}
                    disabled={enrolling}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4 text-black" />
                    <span>{enrolling ? 'INITIALIZING CADET ID...' : 'Instant Enrolment (Free)'}</span>
                  </button>

                  <div className="text-[10px] font-mono text-slate-400 text-center">
                    Unified RK ID • 50-MCQ Anti-Cheat Proctored Final
                  </div>
                </div>
              )}

              {/* Author & Lab Assurance */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] font-sans">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#FFA439] flex-shrink-0" />
                  <span>Lead Architect: {course.lead_author?.name || 'Alex Rivera'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-[#00AEEF] flex-shrink-0" />
                  <span>Integrated Kali Linux 2026.1 Desktop Simulator</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 HUD TELEMETRY TABS NAVIGATION BAR */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#FF7A00]/25">
            {[
              { id: 'overview', label: '01 // OVERVIEW', icon: Sparkles },
              { id: 'outcomes', label: '02 // OUTCOMES', icon: Shield },
              { id: 'syllabus', label: '03 // SYLLABUS OUTLINE', icon: ListOrdered },
              { id: 'eligibility', label: '04 // ELIGIBILITY', icon: CheckCircle2 },
              { id: 'certification', label: '05 // CERTIFICATION', icon: Award },
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
                      ? 'bg-[#FF7A00]/20 text-[#FFA439] border-t-2 border-x border-[#FF7A00] shadow-[0_-4px_16px_rgba(255,122,0,0.25)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-t-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFA439]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENTS (Liquid Glass Cards with Amber Accents) */}
        <div className="space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/25 shadow-lg space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-2">
                    Executive Mission Brief
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                {/* Skills Grid */}
                <div>
                  <div className="text-xs font-mono font-bold text-[#FFA439] uppercase mb-3">
                    COMPETENCY DOMAINS &amp; TOOLCHAIN
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(course.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-mono text-[#FFA439]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What You Will Learn List */}
                {course.what_you_will_learn && (
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase mb-3">
                      TACTICAL LEARNING PILLARS
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.what_you_will_learn.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FFA439] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300 font-sans leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: OUTCOMES */}
          {activeTab === 'outcomes' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/25 shadow-lg space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-2">
                    MITRE ATT&CK &amp; OWASP Top 10 Behavioral Defenses
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Graduates master both offensive behavioral understanding and robust software-level mitigation techniques.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase">
                      INJECTION MITIGATION
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Defeat SQLi, NoSQLi, and OS command injection via parameterized queries, Mongoose schema sanitization, and strict Zod runtime verification.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase">
                      BROKEN AUTH &amp; JWT
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Implement tamper-proof authentication with bcrypt password work factors, short-lived rotating JWT access tokens, and HTTP-only SameSite cookies.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase">
                      CONTAINER &amp; CI/CD HARDENING
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Ship production microservices via non-root Docker containers, automated GitHub Actions security scanners, and least-privilege RBAC.
                    </p>
                  </div>
                </div>

                {course.learning_objectives && (
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase mb-3">
                      STANDARDIZED OPERATIONAL OBJECTIVES
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {course.learning_objectives.map((obj, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-300"
                        >
                          <span className="text-[#FFA439] font-bold">[{String(i + 1).padStart(2, '0')}]</span>
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: SYLLABUS OUTLINE (Interactive 12-Module Accordion) */}
          {activeTab === 'syllabus' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-mono text-slate-400">
                  Total 12 Modules • 78 Lessons • 12 Graded Unit Quizzes
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAllModules}
                    className="text-[11px] font-mono text-[#FFA439] hover:underline cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={collapseAllModules}
                    className="text-[11px] font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-3">
                {(course.modules || []).map((mod, idx) => {
                  const isExpanded = Boolean(expandedModules[idx]);
                  const lessonCount = mod.lessons?.length || 0;
                  return (
                    <div
                      key={mod.id || idx}
                      className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#FF7A00]/40 transition-colors overflow-hidden"
                    >
                      {/* Module Header Bar */}
                      <button
                        type="button"
                        onClick={() => toggleModule(idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-xs font-mono font-bold text-[#FFA439]">
                            MODULE {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold font-royal text-white">
                              {mod.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                              {mod.description || 'Core technical competencies & hands-on laboratory lessons.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-mono text-slate-400 hidden sm:block">
                            {lessonCount} Lessons + Quiz
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#FFA439]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Lessons List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/5 bg-black/40 px-5 py-3 space-y-2"
                          >
                            {(mod.lessons || []).map((les, lIdx) => (
                              <div
                                key={les.id || lIdx}
                                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-3.5 h-3.5 text-[#FFA439]" />
                                  <span className="font-mono text-slate-400 text-[10px]">
                                    {String(lIdx + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-slate-200 font-sans">{les.title}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span>{les.estimated_minutes || 15}m</span>
                                </div>
                              </div>
                            ))}

                            {/* Graded Module Evaluation Card */}
                            <div className="mt-2 p-2.5 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-[#FFA439]" />
                                <span className="text-[#FFA439] font-bold">
                                  Module {idx + 1} Assessment: 20-MCQ Graded Quiz
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-300">80% Pass Req</span>
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

          {/* TAB 4: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/25 shadow-lg space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-2">
                    Cadet Eligibility &amp; Technical Prerequisites
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Designed for aspiring full-stack engineers and defensive cybersecurity operators.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#FFA439] font-mono text-xs font-bold uppercase">
                      <Terminal className="w-4 h-4" />
                      <span>FOUNDATIONAL REQUIREMENTS</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc list-inside leading-relaxed">
                      <li>Basic programming logic (variables, loops, conditional branching)</li>
                      <li>General understanding of internet architecture (IP addresses, URLs, clients vs servers)</li>
                      <li>Willingness to write code hands-on and debug real errors in the terminal</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#FFA439] font-mono text-xs font-bold uppercase">
                      <Cpu className="w-4 h-4" />
                      <span>HARDWARE &amp; SYSTEM ENVIRONMENT</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc list-inside leading-relaxed">
                      <li>Standard desktop/laptop with modern browser (Chrome, Firefox, Safari, Edge)</li>
                      <li>WebGL support for the in-browser 3D volumetric background and particle canvas</li>
                      <li>Zero local VM installation needed: Kali Linux CyberLab executes entirely in-browser</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FFA439] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-white font-semibold">Institutional Ethics Pledge: </strong>
                    All students adhere to the RedKross Defensive Research Foundation code of conduct. Offensive toolchains (Nmap, Wireshark, Hydra) are restricted strictly to isolated virtual lab containers (Subnet 10.10.11.0/24).
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: CERTIFICATION */}
          {activeTab === 'certification' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF7A00]/25 shadow-lg space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-2">
                    50-MCQ Anti-Cheat Proctored Final &amp; SHA-256 Proofs
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Earn an immutable, tamper-proof credential verified against the RedKross public cryptographic ledger.
                  </p>
                </div>

                {/* Exam Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">QUESTION SUITE</div>
                    <div className="text-lg font-bold font-mono text-white">50 MCQs</div>
                    <div className="text-xs text-slate-400">Randomized across 12 modules</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">TIME RESTRICTION</div>
                    <div className="text-lg font-bold font-mono text-white">60 Minutes</div>
                    <div className="text-xs text-slate-400">Strict countdown timer</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">PASSING CRITERIA</div>
                    <div className="text-lg font-bold font-mono text-white">80% (40/50)</div>
                    <div className="text-xs text-slate-400">Anti-cheat blur lockout active</div>
                  </div>
                </div>

                {/* Cryptographic SHA-256 Proof Box */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-black/80 via-[#181108]/90 to-black/80 border border-[#FF7A00]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FFA439] uppercase flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>CRYPTOGRAPHIC DIGITAL SIGNATURE ARCHITECTURE</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">ECDSA / SHA-256</span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Upon exam passage, a digital certificate is allocated with a unique hash derived from cadet ID, completion timestamp, module metrics, and cryptographic salt.
                  </p>

                  <div className="p-3 rounded-lg bg-black/80 border border-white/10 font-mono text-xs flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-[#FFA439] truncate">{sampleSha256}</span>
                    <button
                      type="button"
                      onClick={copyHashToClipboard}
                      className="px-2 py-1 rounded bg-[#FF7A00]/20 hover:bg-[#FF7A00]/40 text-[#FFA439] text-[10px] flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'COPIED' : 'COPY HASH'}</span>
                    </button>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-[#FFA439]" />
                    <span>Publicly verifiable at /verify/:credentialId</span>
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
                  q: 'What are the system requirements for the virtual Kali CyberLab?',
                  a: 'The Kali CyberLab V3 runs entirely inside your browser using containerized mock architecture, WebGL, and an authentic 143+ command suite. No local VirtualBox or VMware installs are needed.'
                },
                {
                  q: 'What is the quiz cooldown and retake policy?',
                  a: 'Cadets are granted 3 attempts per module assessment. If all 3 attempts fail to meet the 80% passing threshold, a mandatory 24-hour tactical review cooldown is activated to reinforce syllabus mastery.'
                },
                {
                  q: 'How does the 50-MCQ final certification exam work?',
                  a: 'The final exam features 50 randomized questions covering all 12 modules under a 60-minute timer. Strict anti-cheat tab-blur protection logs all focus disruptions; 3 strikes terminate the attempt.'
                },
                {
                  q: 'How do employers verify RedKross credentials?',
                  a: 'Each issued certificate contains a public verification URL (/verify/:id) and a deterministic SHA-256 hash that cryptographically confirms the cadet identity, grade, and completion timestamp.'
                },
                {
                  q: 'Does this curriculum cover ethical application defense only?',
                  a: 'Yes. RedKross Academy adheres strictly to defensive security and secure application development. Offensive tooling simulations exist solely to educate engineers on OWASP Top 10 mitigation.'
                }
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#FF7A00]/30 transition-colors space-y-2"
                >
                  <h4 className="text-sm sm:text-base font-bold font-royal text-white flex items-center gap-2">
                    <span className="text-[#FFA439] font-mono text-xs">Q{i + 1}.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Cyber In-Branch Footer */}
      <Footer />
    </div>
  );
}
