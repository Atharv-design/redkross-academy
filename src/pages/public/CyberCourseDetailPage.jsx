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
  Calendar,
  Globe,
  Coins,
  Gift,
  XCircle
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

  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [enrolling, setEnrolling] = useState(false);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [grantError, setGrantError] = useState('');

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
          if (c && c.modules && c.modules.length > 0 && c.overview) {
            setCourse(c);
          } else {
            const local =
              mockEngine.getCourseBySlug(slug) ||
              mockEngine.getCourseById(slug) ||
              CYBER_COURSES.find((item) => item.slug === slug || item.id === slug) ||
              CYBER_COURSES[0];
            if (local) setCourse(local);
          }
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

  const enrolment = useMemo(() => {
    if (!currentUser?.id || !course?.id) return null;
    const enrolments = mockEngine.getEnrolmentsForUser(currentUser.id, 'cybersecurity');
    return enrolments.find((e) => e.course_id === course.id) || null;
  }, [currentUser, course]);

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

  const handleCancelEnrolment = () => {
    if (window.confirm("Are you sure you want to cancel your free enrolment for this course?")) {
      if (enrolment?.id) {
        mockEngine.deleteEnrolment?.(enrolment.id);
        window.location.reload();
      }
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GRANT100' || couponCode.trim().toUpperCase() === 'REDKROSS2026') {
      setGrantSuccess(true);
      setGrantError('');
      if (currentUser) {
        mockEngine.enrolStudent(currentUser.id, course.id);
      }
      setTimeout(() => {
        setShowGrantModal(false);
        navigate(`/student/course/${course.id}`);
      }, 1200);
    } else {
      setGrantError('Invalid or expired grant/coupon code. Try "GRANT100"');
    }
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
        <div className="relative mb-10 p-6 sm:p-10 rounded-3xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/30 hover:border-[#FFA439]/50 shadow-[0_0_40px_rgba(255,122,0,0.15)] overflow-hidden">
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
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/60 border border-[#FF7A00]/30 text-[#FFA439]">
                  FOUNDATIONS READY
                </span>
              </div>

              {/* Title */}
              <h1 className="font-royal text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {(course.title || 'Introduction to Cybersecurity').replace(/^Course\s*\d+:\s*/i, '')}
              </h1>

              {/* Overview Subtitle */}
              <p className="text-slate-300 text-xs sm:text-sm lg:text-base font-sans leading-relaxed">
                {course.overview}
              </p>

              {/* Key Highlights Metrics Row - Clean 3-Column Glass Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-black/35 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-colors">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">DURATION</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.estimated_duration || '10 Weeks'}
                  </div>
                  <div className="text-[10px] text-slate-400">6–8 hrs / week</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/35 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-colors">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">SYLLABUS</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.modules?.length || 6} Modules
                  </div>
                  <div className="text-[10px] text-slate-400">{totalLessonsCount} Lessons</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/35 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-colors">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase">EXAM GATES</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity'
                      ? '6 Knowledge Checks + Final'
                      : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity'
                      ? '8 Quizzes + Final'
                      : `${course.modules?.length || 8} Quizzes + Final`}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity' || course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity'
                      ? '60-MCQ Proctored Final'
                      : '50-MCQ Proctored Final'}
                  </div>
                </div>
              </div>

              {/* Faculty & Milestone Credential Badge */}
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FF7A00]/20 flex flex-wrap items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black border border-[#FF7A00]/40 flex items-center justify-center p-1.5 shadow-[0_0_12px_rgba(255,122,0,0.3)] flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A3907C] uppercase tracking-wider">
                      Authoritative Faculty
                    </div>
                    <div className="text-xs font-bold font-royal text-white">
                      {course.lead_author?.name || 'RedKross Systems Defense Faculty'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {course.lead_author?.title || 'Defensive Architecture & Security Operations'}
                    </div>
                  </div>
                </div>

                {course.milestone_cert && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30">
                    <Award className="w-4 h-4 text-[#FFA439] flex-shrink-0" />
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-[#FFA439] uppercase font-bold">Milestone Award</div>
                      <div className="text-[11px] font-royal font-bold text-white truncate max-w-[220px]">
                        {course.milestone_cert}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Competency Domains & Toolchain Pills */}
              {(course.skills || []).length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>CORE TELEMETRY &amp; TACTICAL TOOLCHAIN</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(course.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 hover:border-[#FF7A00]/40 text-[11px] font-mono text-slate-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: DEFENSIVE CREDENTIALING AUTHORITY CARD */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/30 hover:border-[#FFA439]/50 shadow-[0_0_35px_rgba(255,122,0,0.15)] space-y-5">
              {/* Official RedKross Crest & Institutional Credentialing Authority Seal */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-black border border-[#FF7A00]/60 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(255,122,0,0.4)] flex-shrink-0">
                  <img src="/assets/crest-clean-circle.png" alt="RedKross Crest" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-royal text-base font-bold text-white flex items-center gap-1.5">
                    <span>RedKross</span>
                    <span className="text-[#FF7A00]">Academy</span>
                  </h3>
                  <p className="text-[10px] font-mono text-[#A3907C] uppercase tracking-wider">
                    Defensive Credentialing Authority
                  </p>
                </div>
              </div>

              {/* Access & Tuition Header */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFA439] font-bold">
                  Access &amp; Tuition
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-royal text-3xl font-extrabold text-white">
                    Free Access
                  </span>
                  <span className="text-xs font-mono text-[#FF7A00] font-bold">
                    100% Curriculum
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Start learning immediately. Certificate exam unlocked after completion of all core units.
                </p>
              </div>

              {/* Action Buttons: Enrolled vs Unenrolled */}
              <div className="space-y-2.5">
                {enrolment ? (
                  <>
                    <Link
                      to={`/student/course/${course.id}`}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>View Course in Classroom</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleCancelEnrolment}
                      className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-rose-500/30 text-rose-300 hover:text-white hover:border-rose-500/60 font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Cancel Enrolment (Free Track)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGrantModal(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-[#FF7A00]/30 text-slate-200 hover:text-white hover:border-[#FFA439] font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#FFA439]" />
                      <span>Apply Academic Grant / Coupon</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEnrol}
                      disabled={enrolling}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-center"
                    >
                      <Zap className="w-4 h-4 text-black" />
                      <span>{enrolling ? 'INITIALIZING CADET ID...' : 'Instant Enrolment (Free Track)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGrantModal(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-[#FF7A00]/30 text-slate-200 hover:text-white hover:border-[#FFA439] font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#FFA439]" />
                      <span>Apply Academic Grant / Coupon</span>
                    </button>
                  </>
                )}
              </div>

              {/* Course Specifications List */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Effort</span>
                  </span>
                  <span className="font-bold text-white">{course.effort || '6–8 hrs / week'}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Length</span>
                  </span>
                  <span className="font-bold text-white">{course.estimated_duration || '10 Weeks'}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Level</span>
                  </span>
                  <span className="font-bold text-[#FFA439]">{course.difficulty || 'Beginner'}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pace</span>
                  </span>
                  <span className="font-bold text-white">Self-Paced with Proctoring</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Award className="w-3.5 h-3.5 text-[#FFA439]" />
                    <span>Certificate</span>
                  </span>
                  <span className="font-bold text-[#FF7A00]">Verifiable On-Chain</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Coins className="w-3.5 h-3.5 text-[#FFA439]" />
                    <span>Bounty</span>
                  </span>
                  <span className="font-bold text-[#FFA439]">+{course.total_tokens_reward || 1500} Tokens</span>
                </div>
              </div>

              {/* Social / Channel Icons Row */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-3">
                <a
                  href="https://redkross.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Parent Foundation"
                  className="w-10 h-10 rounded-xl bg-black/80 border border-[#FF7A00]/30 hover:border-[#FF7A00] flex items-center justify-center p-2 transition-all group shadow-sm"
                >
                  <img src="/assets/crest-clean-circle.png" alt="Foundation" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </a>

                <a
                  href="https://whatsapp.com/channel/0029VbBbRCn7tkj2M1Sj7f3Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                  className="w-10 h-10 rounded-xl bg-black/80 border border-[#FF7A00]/30 hover:border-[#25D366] flex items-center justify-center p-2 text-[#25D366] transition-all group shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.507 2 2.019 6.488 2.019 12.02c0 1.768.461 3.494 1.336 5.011L2 22l5.12-1.343c1.465.798 3.12 1.22 4.92 1.22 5.533 0 10.021-4.488 10.021-10.02S17.573 2 12.04 2zm0 18.337c-1.579 0-3.125-.424-4.47-1.225l-.32-.19-3.322.871.887-3.238-.208-.331c-.88-1.399-1.344-3.031-1.344-4.704 0-4.606 3.748-8.354 8.357-8.354 4.608 0 8.356 3.748 8.356 8.354 0 4.606-3.748 8.354-8.356 8.354zm4.992-6.195c-.276-.138-1.633-.806-1.886-.899-.253-.092-.437-.138-.621.138-.184.276-.713.899-.874 1.083-.161.184-.322.207-.598.069-.276-.138-1.166-.43-2.221-1.371-.821-.732-1.375-1.637-1.536-1.913-.161-.276-.017-.425.121-.562.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.495-.851-2.048-.224-.54-.452-.467-.621-.475-.161-.008-.345-.009-.529-.009-.184 0-.483.069-.736.345-.253.276-.966.943-.966 2.3 0 1.357.989 2.668 1.127 2.852.138.184 1.945 2.97 4.712 4.165.658.284 1.172.454 1.573.581.661.21 1.262.18 1.737.109.53-.079 1.633-.667 1.863-1.312.23-.645.23-1.197.161-1.312-.069-.115-.253-.184-.529-.322z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/redkross_research_foundation?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-black/80 border border-[#FF7A00]/30 hover:border-[#E1306C] flex items-center justify-center p-2 text-[#E1306C] transition-all group shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* HUD TELEMETRY TABS NAVIGATION BAR */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#FF7A00]/25">
            {[
              { id: 'overview', label: '01 // OVERVIEW', icon: Sparkles },
              { id: 'outcomes', label: '02 // OUTCOMES', icon: Shield },
              { id: 'syllabus', label: '03 // SYLLABUS OUTLINE', icon: ListOrdered },
              { id: 'eligibility', label: '04 // ELIGIBILITY', icon: CheckCircle2 },
              { id: 'faqs', label: '05 // FAQS', icon: HelpCircle }
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

                {/* Why This Subject Matters Grid */}
                {course.why_it_matters && course.why_it_matters.length > 0 && (
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase mb-3 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>WHY THIS CURRICULUM MATTERS: OPERATIONAL DEFENSE RATIONALE</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.why_it_matters.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FFA439] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300 font-sans leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Audience & Prerequisite Alignment */}
                {course.intended_audience && course.intended_audience.length > 0 && (
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFA439] uppercase mb-3 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>TARGET CADET PROFILE &amp; PREREQUISITE ALIGNMENT</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <ul className="space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside leading-relaxed">
                        {course.intended_audience.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

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
                    {course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity'
                      ? 'Defensive Architecture & CIA Triad Competencies'
                      : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity'
                      ? 'Enterprise Networking & Layered Perimeter Defense Competencies'
                      : course.id === 'crs_cyber_admin_03' || course.slug === 'linux-and-windows-system-administration'
                      ? 'Enterprise Systems Administration & Defensive Infrastructure Competencies'
                      : course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity'
                      ? 'Python Security Automation & Defensive Engineering Competencies'
                      : 'Defensive Engineering & Threat Mitigation Competencies'}
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity'
                      ? 'Cadets master foundational security principles, adversary kill chains, threat modeling, and layered defensive countermeasures.'
                      : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity'
                      ? 'Cadets master physical through application layer packet transmission, binary subnetting, routing convergence, stateful firewalls, and Wireshark forensics.'
                      : course.id === 'crs_cyber_admin_03' || course.slug === 'linux-and-windows-system-administration'
                      ? 'Cadets master OS kernel privilege rings, FHS 3.0 directory trees, POSIX permissions, Windows NT executive internals, PowerShell 7 automation, Active Directory Kerberos, and CIS system hardening baselines.'
                      : course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity'
                      ? 'Cadets master Python 3 core data structures, hash-pinned virtual environments, ReDoS/CSV defenses, path and subprocess confinement, loopback TCP/TLS sockets, streaming SHA-256 and HMAC integrity, tamper-evident FIM alerts, and unittest-verified CLI engineering.'
                      : 'Graduates master robust defensive architecture, operational telemetry, and systematic vulnerability remediation.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity' ? [
                    {
                      title: 'MOD 01 // FOUNDATIONS & ECOSYSTEM',
                      desc: 'Master fundamental security models, evaluate trade-offs between Security, Privacy, and Safety, and analyze attack surfaces across hybrid infrastructure.'
                    },
                    {
                      title: 'MOD 02 // CIA TRIAD & DEFENSE IN DEPTH',
                      desc: 'Apply Confidentiality, Integrity, and Availability principles; implement non-repudiation and design concentric defense-in-depth perimeters across administrative, technical, and physical layers.'
                    },
                    {
                      title: 'MOD 03 // KILL CHAIN & ADVERSARY OPS',
                      desc: 'Deconstruct the 6-stage Lockheed Martin Cyber Kill Chain from Reconnaissance to Actions on Objectives; analyze malware taxonomy, social engineering vectors, and physical security.'
                    },
                    {
                      title: 'MOD 04 // RISK, CVSS v3.1 & STRIDE',
                      desc: 'Calculate CVSS v3.1 base severity metrics across exploitability and impact vectors, build STRIDE threat models, and establish cross-functional defensive control matrices.'
                    },
                    {
                      title: 'MOD 05 // IDENTITY & ACCESS MANAGEMENT',
                      desc: 'Enforce robust authentication boundaries with MFA and bcrypt work factors, implement Zero Trust architecture, and apply least-privilege Role-Based Access Control (RBAC).'
                    },
                    {
                      title: 'MOD 06 // SEC OPS, GOVERNANCE & LAW',
                      desc: 'Harmonize security programs with NIST CSF 2.0 and CIS Controls v8, navigate SOC triage lifecycles, leverage foundational cryptography, and understand Indian cyber regulations (IT Act & DPDP Act).'
                    }
                  ] : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity' ? [
                    {
                      title: 'MOD 01 // NETWORK FUNDAMENTALS',
                      desc: 'Master physical and logical topologies (star, mesh, spine-leaf), transmission media (copper UTP/STP, single/multimode fibre, wireless RF), device roles, and interface inspection forensics.'
                    },
                    {
                      title: 'MOD 02 // LAYERED MODELS & ENCAPSULATION',
                      desc: 'Dissect packet propagation across the OSI 7-layer and TCP/IP 4-layer reference architectures, tracing PDU encapsulation (Data, Segment, Packet, Frame, Bits) down to the wire and back.'
                    },
                    {
                      title: 'MOD 03 // ADDRESSING (IPV4, CIDR & IPV6)',
                      desc: 'Execute binary/hexadecimal conversions, bitwise ANDing, CIDR prefix calculations, Variable Length Subnet Masking (VLSM), RFC 1918 private scopes, and IPv6 128-bit SLAAC architecture.'
                    },
                    {
                      title: 'MOD 04 // PROTOCOLS (TCP, UDP, ICMP & ARP)',
                      desc: 'Dissect the TCP 3-way handshake, sequence/ack tracking, RST teardowns, UDP stateless streaming, ICMP error messaging, ARP cache mechanics, and DAI defensive controls.'
                    },
                    {
                      title: 'MOD 05 // SERVICES (DNS, DHCP, NAT & TLS 1.3)',
                      desc: 'Analyze DNS root-to-authoritative hierarchy, Kaminsky cache poisoning, DNSSEC, DHCP DORA cycles, DHCP snooping, NAT/PAT overload, and the TLS 1.3 1-RTT cryptographic handshake.'
                    },
                    {
                      title: 'MOD 06 // ROUTING & SWITCHING SEGMENTATION',
                      desc: 'Evaluate Layer 2 switching CAM tables, 802.1Q VLAN trunking, STP loop prevention, default gateways, route lookups (longest prefix match), OSPF, BGP autonomous systems, and DMZ design.'
                    },
                    {
                      title: 'MOD 07 // BOUNDARIES, FIREWALLS & VPNS',
                      desc: 'Configure stateful packet inspection, Linux Netfilter conntrack tables, iptables/nftables syntax, forward/reverse proxies, WireGuard/IPsec VPN tunnels, WPA3 SAE Wi-Fi, and Zero Trust tenets.'
                    },
                    {
                      title: 'MOD 08 // TRAFFIC ANALYSIS & FORENSICS',
                      desc: 'Conduct ground-truth packet triage with Wireshark and tshark CLI, apply Berkeley Packet Filters (BPF) and display filters, dissect malicious beacons, and draft a forensic troubleshooting report.'
                    }
                  ] : course.id === 'crs_cyber_admin_03' || course.slug === 'linux-and-windows-system-administration' ? [
                    {
                      title: 'MOD 01 // OPERATING SYSTEM FOUNDATIONS',
                      desc: 'Deconstruct CPU privilege rings (Ring 0 vs. Ring 3), system call dispatch, virtual memory paging, process trees, UEFI Secure Boot, and CrowdStrike 2024 kernel failure analysis.'
                    },
                    {
                      title: 'MOD 02 // LINUX ENVIRONMENT & FILE SYSTEM',
                      desc: 'Navigate the Filesystem Hierarchy Standard (FHS 3.0), evaluate inode structures, hard vs. symbolic links, hidden dotfiles, and locate forensic artifacts using find, grep, and xargs pipelines.'
                    },
                    {
                      title: 'MOD 03 // CORE LINUX ADMINISTRATION',
                      desc: 'Administer POSIX permissions (rwx), SUID/SGID/Sticky bits, extended ACLs (getfacl/setfacl), sudoers least-privilege, APT/RPM package integrity, systemd service units, and journald telemetry.'
                    },
                    {
                      title: 'MOD 04 // LINUX AUTOMATION & SCHEDULING',
                      desc: 'Author defensive Bash automation scripts featuring strict mode (set -euo pipefail), signal trapping, input validation, cron scheduling audits, and systemd monotonic timer automation.'
                    },
                    {
                      title: 'MOD 05 // WINDOWS ARCHITECTURE & CORE ADMIN',
                      desc: 'Dissect Windows NT executive subsystem, Registry hives forensics, SCM service lifecycles, Security Identifiers (SIDs), UAC token elevation, and NTFS DACLs vs SACLs inheritance.'
                    },
                    {
                      title: 'MOD 06 // POWERSHELL ADMIN & AUTOMATION',
                      desc: 'Leverage PowerShell 7 object pipelines, provider namespaces, Constrained Language Mode (CLM), AppLocker/WDAC integration, and deploy enterprise Script Block Logging (Event ID 4104).'
                    },
                    {
                      title: 'MOD 07 // ENTERPRISE WINDOWS CONCEPTS',
                      desc: 'Analyze Windows Security Event Logs (EID 4624/4688/1102), Active Directory domain trusts, Kerberos TGT/TGS ticket requests, Group Policy precedence (LSDOU), and WSUS patch management.'
                    },
                    {
                      title: 'MOD 08 // HARDENING, BASELINES & AUDITS',
                      desc: 'Apply consensus hardening with CIS Benchmark Level 1/2 baselines, Windows Defender Firewall rule engineering, automated Lynis compliance scoring, and execute a comprehensive capstone systems audit.'
                    }
                  ] : course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity' ? [
                    {
                      title: 'MOD 01 // PYTHON FOUNDATIONS',
                      desc: 'Configure Python 3 safely, understand dynamic name-to-object binding and explicit type conversion boundaries, process strings safely, select O(1) dicts/sets vs lists, and avoid string-comparison bugs.'
                    },
                    {
                      title: 'MOD 02 // FUNCTIONS, MODULES & EXCEPTIONS',
                      desc: 'Design pure security functions with mutable-default safety, author importable packages, implement narrow fail-closed exception chaining (PEP 3134), and manage hash-pinned venvs (--require-hashes).'
                    },
                    {
                      title: 'MOD 03 // TEXT, REGEX, CSV & JSON SAFETY',
                      desc: 'Process UTF-8 logs with streaming generators, neutralize CSV formula injection, parse strict JSON Schema, reject unsafe pickle deserialization, and prevent catastrophic ReDoS backtracking.'
                    },
                    {
                      title: 'MOD 04 // FILESYSTEMS & OS PROCESS SAFETY',
                      desc: 'Enforce canonical Path.resolve() and is_relative_to() path-traversal confinement, enforce least-privilege os.chmod modes, and run OS commands safely using subprocess lists with shell=False.'
                    },
                    {
                      title: 'MOD 05 // NETWORKING & WEB REQUESTS',
                      desc: 'Build local 127.0.0.1 TCP sockets and concurrent selectors servers, configure verified TLS certificate validation, decode big-endian binary frames via struct, and call APIs without SSRF.'
                    },
                    {
                      title: 'MOD 06 // CRYPTOGRAPHY, LOGS & IOCS',
                      desc: 'Stream 64 KiB chunked SHA-256 digests, authenticate records with constant-time hmac.compare_digest(), normalize timezone-aware UTC events, and refang/validate IOCs cleanly.'
                    },
                    {
                      title: 'MOD 07 // DEFENSIVE SECURITY AUTOMATION',
                      desc: 'Engineer signed JSON File Integrity Monitoring (FIM) baselines, stateful sliding-window detection rules with deduplication suppression, and ANSI/XSS-sanitized JSONL alert outputs.'
                    },
                    {
                      title: 'MOD 08 // RELIABLE TOOLING & RKLOGA 2.0',
                      desc: 'Verify security utilities with unittest suites, clean CLI 0/1/2 exit contracts, structured pyproject.toml + Bandit/mypy gates, and deliver the documented rkloga 2.0 log analysis capstone.'
                    }
                  ] : (course.modules || []).map((m, mIdx) => ({
                    title: `MOD ${String(mIdx + 1).padStart(2, '0')} // ${m.title.toUpperCase()}`,
                    desc: m.description || 'Core technical competencies, hands-on labs, and graded assessments.'
                  }))).map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#FFA439] uppercase">
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
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

          {/* TAB 3: SYLLABUS OUTLINE (Interactive Module Accordion) */}
          {activeTab === 'syllabus' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-mono text-slate-400">
                  Total {course.modules?.length || 8} Modules • {totalLessonsCount} Lessons • {course.modules?.length || 8} Knowledge Checks + 1 Final Certification Exam
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
                          <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FFA439] font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
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
                            {lessonCount} Lessons + Knowledge Check
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
                                  Module {idx + 1} Assessment: 20-MCQ Graded Assessment
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-300">80% Pass Req • 20 MCQs</span>
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
                    {course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity'
                      ? 'Designed for all learners from absolute scratch — no prior coding, networking, or IT background needed.'
                      : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity'
                      ? 'Designed for learners who have completed Course 01 or have foundational IT literacy.'
                      : course.id === 'crs_cyber_admin_03' || course.slug === 'linux-and-windows-system-administration'
                      ? 'Designed for learners who have completed Courses 01 & 02 or have foundational command-line and networking literacy.'
                      : course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity'
                      ? 'Designed for absolute beginners in programming as well as sysadmins and SOC analysts — zero prior coding required.'
                      : 'Designed for aspiring cybersecurity defenders and systems engineers.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#FFA439] font-mono text-xs font-bold uppercase">
                      <Terminal className="w-4 h-4" />
                      <span>FOUNDATIONAL REQUIREMENTS</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc list-inside leading-relaxed">
                      {(course.prerequisites || [
                        'No prior programming, networking, or cybersecurity background required. Designed from absolute scratch.',
                        'A modern laptop or desktop computer with any standard operating system (Windows, macOS, or Linux).',
                        'Estimated dedication of 6–8 hours per week across 10 weeks (~45 total learning hours).'
                      ]).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#FFA439] font-mono text-xs font-bold uppercase">
                      <Cpu className="w-4 h-4" />
                      <span>HARDWARE &amp; SYSTEM ENVIRONMENT</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc list-inside leading-relaxed">
                      {(course.required_software_hardware || [
                        'Standard desktop/laptop with modern browser (Chrome, Firefox, Safari, Edge)',
                        '100% web-accessible curriculum with interactive inline question engines',
                        'Zero paid software licenses or complex virtual machine setups required — completely free tooling'
                      ]).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FFA439] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-white font-semibold">Institutional Ethics Pledge: </strong>
                    All students adhere to the RedKross Defensive Research Foundation code of conduct. Security toolchains and diagnostic utilities are studied strictly for ethical defense, asset protection, and vulnerability remediation.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {(course.id === 'crs_cyber_intro_01' || course.slug === 'introduction-to-cybersecurity' ? [
                {
                  q: 'Do I need any programming or IT experience before starting this course?',
                  a: 'No prior background is required. The curriculum begins from scratch, explaining digital security, core ecosystem concepts, and foundational architecture before advancing to threat modeling and defensive operations.'
                },
                {
                  q: 'What does the 6-module curriculum cover?',
                  a: 'The curriculum spans 6 comprehensive modules: (1) Cybersecurity Foundations & Ecosystem, (2) Core Principles & Defense Architecture, (3) The Threat Landscape & Adversary Operations, (4) Risk Management, Vulnerabilities & Defense Strategy, (5) Identity & Access Management (IAM), and (6) Security Operations, Governance & Career Pathways.'
                },
                {
                  q: 'What is the Lockheed Martin Cyber Kill Chain taught in this curriculum?',
                  a: 'The Cyber Kill Chain is a 6-stage operational model (Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Actions on Objectives) that teaches defenders how attacks unfold and how interrupting any single link preemptively halts adversary progress.'
                },
                {
                  q: 'How do the assessments and final certification work?',
                  a: 'Each module concludes with a 20-MCQ Knowledge Check requiring an 80% score to proceed. Upon completing all 38 lessons and 6 Knowledge Checks, cadets unlock the proctored 60-MCQ final certification exam to earn the Certified Cybersecurity Defender Associate (CCDA) credential.'
                },
                {
                  q: 'What is the recommended weekly pace and duration?',
                  a: 'The course is structured for 10 weeks at an estimated pace of 6–8 hours per week (approx. 45 total learning hours). The curriculum is fully self-paced, allowing motivated cadets to progress as their schedule allows.'
                },
                {
                  q: 'Does this course teach defensive security or offensive hacking?',
                  a: 'RedKross Academy focuses strictly on defensive security and institutional resilience. We examine adversary tactics and real-world attack vectors specifically so defenders understand how to anticipate, mitigate, and neutralize threats.'
                }
              ] : course.id === 'crs_cyber_net_02' || course.slug === 'computer-networking-for-cybersecurity' ? [
                {
                  q: 'Do I need prior networking or coding knowledge before starting this course?',
                  a: 'No prior networking certification is required. Familiarity with basic IT concepts or Course 01 (Introduction to Cybersecurity) is recommended. The course constructs all networking knowledge from binary bits and physical cables to stateful firewalls.'
                },
                {
                  q: 'What does the 8-module Computer Networking curriculum cover?',
                  a: 'The curriculum spans 8 comprehensive modules: (1) Network Fundamentals, (2) Layered Models and Encapsulation, (3) Addressing (IPv4, CIDR, VLSM & IPv6), (4) Network Protocols (TCP, UDP, ICMP, ARP), (5) Essential Network Services (DNS, DHCP, NAT, HTTP & TLS 1.3), (6) Routing and Switching Segmentation, (7) Network Boundaries, Firewalls & VPNs, and (8) Traffic Analysis & Wireshark Forensics.'
                },
                {
                  q: 'What practical network analysis tools will I use in this curriculum?',
                  a: 'Cadets analyze real traffic captures using Wireshark, tshark, tcpdump, dig, traceroute, and Linux stateful firewall utilities (iptables, nftables). Every lesson includes inline interactive packet decodes and terminal illustrations.'
                },
                {
                  q: 'How do module assessments and the final CNDA certification exam work?',
                  a: 'Each module concludes with a 20-MCQ graded assessment requiring a 70% score to proceed. After passing all 8 modules, cadets unlock the proctored 50-MCQ final certification exam to earn the Certified Network Defense Associate (CNDA) credential.'
                },
                {
                  q: 'What is the recommended weekly pace and duration?',
                  a: 'The course is structured for 10 weeks at 6–8 hours per week (~86 total learning hours including 56 hours module study, 18 hours practicals, 2 hours assessment, and 10 hours capstone report). The curriculum is fully self-paced.'
                },
                {
                  q: 'How do employers verify RedKross networking credentials?',
                  a: 'Each issued certificate contains a public verification URL (/verify/:id) and a deterministic SHA-256 hash that cryptographically confirms the cadet identity, passing grade, and completion timestamp.'
                }
              ] : course.id === 'crs_cyber_admin_03' || course.slug === 'linux-and-windows-system-administration' ? [
                {
                  q: 'Do I need prior Linux or PowerShell scripting experience before taking this course?',
                  a: 'No prior command-line scripting experience is assumed. The curriculum begins from first principles, explaining core syntax, flags, redirection, and object pipelines step-by-step before advancing to defensive Bash automation and PowerShell 7 administration.'
                },
                {
                  q: 'What laboratory environment is required for the hands-on practicals?',
                  a: 'A computer with 8 GB RAM (16 GB recommended) and hardware virtualization enabled (VT-x / AMD-V). For Linux practicals, WSL2 with Ubuntu 24.04/26.04 LTS (recommended for Windows users) or a virtual machine (VirtualBox/Hyper-V) is used. Windows 10/11 Home is sufficient for most labs, with Pro/Enterprise noted where Group Policy (gpedit.msc) is evaluated.'
                },
                {
                  q: 'Why does this course cover both Linux and Windows together in a single curriculum?',
                  a: 'Modern enterprise IT infrastructure is heterogeneous. Workstations and Active Directory domains predominantly run Windows, while cloud workloads, microservices, databases, and network appliances run Linux. Security defenders and systems administrators must be equally fluent and capable across both platforms.'
                },
                {
                  q: 'What is the significance of the 2024 CrowdStrike outage analyzed in Module 1?',
                  a: 'The July 2024 incident provides a critical real-world lesson in operating system privilege boundaries. A sensor update executed in kernel space (Ring 0) where an invalid memory read triggered a BugCheck/BSOD that disabled 8.5 million systems worldwide. Defenders study this to understand kernel vs. user space isolation.'
                },
                {
                  q: 'How do module assessments, the Lynis audit capstone, and the final CSADA exam work?',
                  a: 'Each of the 8 modules concludes with a 20-MCQ knowledge check requiring an 80% passing grade. Upon completing all 48 lessons and 8 quizzes, cadets conduct an automated Lynis system audit and unlock the proctored 50-MCQ final exam to earn the Certified Systems Administration & Defense Associate (CSADA) credential.'
                },
                {
                  q: 'How does this credential translate into enterprise cybersecurity roles?',
                  a: 'The CSADA credential aligns directly with the NICE Framework for Systems Administration (K0001, K0002, K0003) and Incident Response (K0041, K0070). It validates that you can manage permissions, investigate process trees, audit event logs, build defensive automation, and enforce consensus CIS hardening baselines.'
                }
              ] : course.id === 'crs_cyber_python_04' || course.slug === 'python-for-cybersecurity' ? [
                {
                  q: 'Do I need any prior Python or programming experience before enrolling?',
                  a: 'No prior coding experience is required. Module 1 begins from installing CPython 3.10+ and core variable binding rules, stepping deliberately through collections, functions, file handling, networking, cryptography, and automated testing.'
                },
                {
                  q: 'What tools and software do I need to complete the practical labs?',
                  a: 'A computer running Windows 10/11, macOS, or Linux with Python 3.10 or newer (tested on CPython 3.12 / 3.14). All 48 lessons emphasize standard-library security engineering, hash-pinned virtual environments, and safe loopback 127.0.0.1 network labs.'
                },
                {
                  q: 'What is the rkloga 2.0 capstone project built in Module 8?',
                  a: 'Across Modules 1 through 8, cadets incrementally engineer rkloga 2.0 — a documented, unittest-verified Python CLI security log analyzer featuring streaming SHA-256 verification, UTC normalization, path/CSV/ANSI sanitization, stateful suppression rules, and strict 0/1/2 exit codes.'
                },
                {
                  q: 'How do module assessments and the final CCPAA certification exam work?',
                  a: 'Each of the 8 modules ends with a 20-MCQ graded assessment drawn dynamically from a 200-question bank requiring an 80% passing score. Completing all 8 modules unlocks the proctored 60-MCQ final exam to earn the Certified Cybersecurity Python Automation Associate (CCPAA) credential.'
                }
              ] : [
                {
                  q: 'What is the retake policy for module quizzes?',
                  a: 'Cadets are granted 3 attempts per module assessment. If all 3 attempts fail to meet the 80% passing threshold, a mandatory 24-hour review cooldown is activated to reinforce syllabus mastery.'
                },
                {
                  q: 'How does the final certification exam work?',
                  a: 'The final certification exam features randomized questions under a 60-minute proctored timer. Strict anti-cheat tab-blur protection logs all focus disruptions.'
                },
                {
                  q: 'How do employers verify RedKross credentials?',
                  a: 'Each issued certificate contains a public verification URL (/verify/:id) and a deterministic SHA-256 hash that cryptographically confirms the cadet identity, grade, and completion timestamp.'
                }
              ]).map((faq, i) => (
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

      {/* Grant / Coupon Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0C09]/95 border border-[#FF7A00]/50 shadow-[0_0_40px_rgba(255,122,0,0.25)] max-w-md w-full space-y-4">
            <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#FF7A00]" />
              <span>Apply Academic Grant / Coupon</span>
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Enter your student sponsorship token or promotional coupon code to activate immediate sponsored enrollment.
            </p>
            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Code (e.g. GRANT100)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#FF7A00]/40 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#FFA439]"
              />
              {grantError && <div className="text-xs text-rose-400 font-mono">{grantError}</div>}
              {grantSuccess && <div className="text-xs text-[#FFA439] font-mono">Grant Verified! Enrolling...</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-xl bg-black text-xs font-mono text-slate-300 border border-white/20 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-royal font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(255,122,0,0.4)] hover:brightness-110"
                >
                  Redeem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
