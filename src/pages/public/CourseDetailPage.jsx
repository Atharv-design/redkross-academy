import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Coins,
  Shield,
  Sparkles,
  ArrowRight,
  Gift,
  ExternalLink,
  Calendar,
  Globe,
  FileCheck2,
  Layers,
  GraduationCap,
  PlayCircle
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

/**
 * CourseDetailPage — Open edX-Inspired Course About Page
 * Full course syllabus, What You'll Learn, Prerequisites, Faculty, and Sticky Right Rail
 * with RedKross crest, connected LinkedIn & foundation links, course specs, and Login-Enrolment Catch.
 */
export default function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser, refreshBalance } = useAuth();
  const ecosystem = getEcosystemLinks();

  const [course, setCourse] = useState(mockEngine.getCourseBySlug(slug) || mockEngine.getCourseById(slug));
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [grantError, setGrantError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (slug) {
      apiClient.getCourseBySlug(slug).then((c) => {
        if (c) setCourse(c);
      }).catch(() => {
        const local = mockEngine.getCourseBySlug(slug) || mockEngine.getCourseById(slug);
        if (local) setCourse(local);
      });
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen py-24 text-center relative z-10 flex items-center justify-center">
        <div className="max-w-md p-8 rounded-2xl cyber-glass-card border border-[#65F58A]/30 space-y-4">
          <h2 className="font-royal text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-[#B8E6CE] text-sm mb-6 font-mono">The requested course does not exist in our catalog.</p>
          <Link to="/courses" className="px-5 py-2.5 glass-button-primary font-royal font-bold text-xs rounded-xl inline-flex items-center gap-2">
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Check if active user is enrolled
  const enrolments = currentUser ? mockEngine.getEnrolmentsForUser(currentUser.id) : [];
  const activeEnrolment = enrolments.find((e) => e.course_id === course.id);
  const isEnrolled = Boolean(activeEnrolment);

  const toggleModule = (idx) => {
    setExpandedModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleEnrol = async () => {
    // Open edX Catch: If user is not logged in, redirect straight to login
    if (!currentUser) {
      navigate('/login', {
        state: {
          from: { pathname: `/courses/${slug || course.id}`, autoEnrol: true }
        }
      });
      return;
    }

    // If already enrolled, navigate straight to the Enrolled Course Home
    if (isEnrolled) {
      navigate(`/student/course/${course.id}`);
      return;
    }

    setEnrolling(true);
    try {
      await apiClient.enrol(currentUser.id, course.id);
      refreshBalance();
      navigate(`/student/course/${course.id}`);
    } catch (err) {
      console.error('Enrolment error:', err);
      mockEngine.enrolStudent(currentUser.id, course.id);
      refreshBalance();
      navigate(`/student/course/${course.id}`);
    } finally {
      setEnrolling(false);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowGrantModal(false);
      navigate('/login', { state: { from: { pathname: `/courses/${slug || course.id}` } } });
      return;
    }
    if (couponCode.trim().toUpperCase() === 'GRANT100' || couponCode.trim().toUpperCase() === 'REDKROSS2026') {
      setGrantSuccess(true);
      setGrantError('');
      try {
        await apiClient.enrol(currentUser.id, course.id);
        refreshBalance();
      } catch (e) {
        mockEngine.enrolStudent(currentUser.id, course.id);
        refreshBalance();
      }
      setTimeout(() => {
        setShowGrantModal(false);
        navigate(`/student/course/${course.id}`);
      }, 1200);
    } else {
      setGrantError('Invalid or expired coupon/grant code. Try "GRANT100"');
    }
  };

  // Robust fallback resolution for objectives and prerequisites
  const rawObjectives = (course.what_you_will_learn && course.what_you_will_learn.length > 0)
    ? course.what_you_will_learn
    : (course.learning_objectives && course.learning_objectives.length > 0)
      ? course.learning_objectives
      : null;

  const parsedObjectives = Array.isArray(rawObjectives)
    ? rawObjectives.filter(Boolean)
    : typeof rawObjectives === 'string' && rawObjectives.trim()
      ? rawObjectives.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

  const finalObjectives = parsedObjectives.length > 0
    ? parsedObjectives
    : [
        `Master tactical defense, incident handling, and telemetry analysis for ${course.title || 'Defensive Cyber'}.`,
        'Analyze live adversary attack vectors, host intrusion artifacts, and IOC traces.',
        'Formulate rapid containment playbooks and operational defensive procedures.',
        'Align tactical enterprise telemetry directly with MITRE ATT&CK matrix frameworks.',
        'Pass the cryptographically verifiable on-chain practical assessment.'
      ];

  const rawPrerequisites = course.prerequisites;
  const parsedPrereqs = Array.isArray(rawPrerequisites)
    ? rawPrerequisites.filter(Boolean)
    : typeof rawPrerequisites === 'string' && rawPrerequisites.trim()
      ? rawPrerequisites.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

  const finalPrerequisites = parsedPrereqs.length > 0
    ? parsedPrereqs
    : [
        'Fundamental understanding of IP addressing, TCP/UDP packets, and subnets.',
        'Basic familiarity with command line interfaces (Bash or PowerShell).',
        'A web browser supporting WebAssembly and WebRTC for live hands-on proctoring.'
      ];

  return (
    <div className="min-h-screen py-10 relative z-10 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8BA2B5] overflow-hidden min-w-0">
          <Link to="/" className="hover:text-white transition-colors flex-shrink-0">Academy</Link>
          <span className="flex-shrink-0">/</span>
          <Link to="/courses" className="hover:text-white transition-colors flex-shrink-0">Courses</Link>
          <span className="flex-shrink-0">/</span>
          <span className="text-[#65F58A] flex-shrink-0">{course.category || 'Specialist Training'}</span>
          <span className="flex-shrink-0">/</span>
          <span className="text-slate-200 truncate font-semibold">{course.title}</span>
        </div>

        {/* Main Two-Column Open edX Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 min-w-0">
          
          {/* ================= LEFT MAIN CONTENT STREAM (2 Columns) ================= */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            
            {/* Header Hero Section */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/30 overflow-hidden min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10">
                  Version {course.version || '1.0'}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#35E6B5] border border-[#35E6B5]/30">
                  {course.difficulty || 'Intermediate'}
                </span>
              </div>

              <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight break-words [overflow-wrap:anywhere] break-all">
                {course.title}
              </h1>

              <p className="text-[#C9EFE0] text-sm sm:text-base leading-relaxed break-words [overflow-wrap:anywhere] break-all max-w-full">
                {course.overview || course.description}
              </p>

              {/* Author / Instructor Strip */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#65F58A]/20 min-w-0">
                <img
                  src={course.lead_author?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'}
                  alt={course.lead_author?.name || 'Instructor'}
                  className="w-12 h-12 rounded-full border border-[#65F58A]/50 object-cover shadow-[0_0_12px_rgba(101,245,138,0.3)] flex-shrink-0"
                />
                <div className="min-w-0 overflow-hidden">
                  <div className="font-royal text-sm font-bold text-white truncate">
                    {course.lead_author?.name || 'Sarah Chen, CISSP'}
                  </div>
                  <div className="text-xs text-[#72A88E] font-mono truncate">
                    {course.lead_author?.title || 'Principal Defensive Handler • RedKross Cyber Lab'}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details & Scope Section (if description is distinct from overview) */}
            {course.description && course.description !== course.overview && (
              <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-3 border border-[#65F58A]/25 overflow-hidden min-w-0">
                <h2 className="font-royal text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#65F58A]" />
                  <span>Course Details & Scope</span>
                </h2>
                <p className="text-[#C9EFE0] text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere] break-all max-w-full font-mono">
                  {course.description}
                </p>
              </div>
            )}

            {/* "What You'll Learn" / Learning Competencies Section */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/25 overflow-hidden min-w-0">
              <h2 className="font-royal text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#65F58A]" />
                <span>What You'll Learn</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 min-w-0">
                {finalObjectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#092218]/40 border border-[#65F58A]/15 text-xs text-[#C9EFE0] leading-relaxed min-w-0 overflow-hidden">
                    <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0 mt-0.5" />
                    <span className="break-words [overflow-wrap:anywhere] break-all">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus & Outline Accordion */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-5 border border-[#65F58A]/25 overflow-hidden min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/20">
                <div>
                  <h2 className="font-royal text-lg sm:text-xl font-bold text-white">
                    Course Syllabus & Modules
                  </h2>
                  <p className="text-xs text-[#72A88E] font-mono mt-0.5">Structured sequential modules, practical reports & knowledge checks</p>
                </div>
                <span className="text-xs font-mono text-[#65F58A] px-2.5 py-1 rounded-md bg-[#65F58A]/10 border border-[#65F58A]/30 font-bold">
                  {(course.modules || []).length} Modules
                </span>
              </div>

              <div className="space-y-3.5">
                {(course.modules || []).map((module, modIdx) => (
                  <div key={module.id || modIdx} className="rounded-xl border border-[#65F58A]/20 bg-[#061510]/60 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleModule(modIdx)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#0c2a1e]/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0 overflow-hidden pr-2">
                        <span className="w-6 h-6 rounded-full bg-[#0a2318] text-[#65F58A] border border-[#65F58A]/40 flex items-center justify-center text-xs font-mono font-bold shadow-[0_0_8px_rgba(101,245,138,0.2)] flex-shrink-0">
                          {modIdx + 1}
                        </span>
                        <span className="font-royal font-bold text-sm text-white break-words [overflow-wrap:anywhere]">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[11px] font-mono text-[#72A88E] hidden sm:inline">
                          {(module.lessons || []).length} Lessons
                        </span>
                        {expandedModules[modIdx] ? (
                          <ChevronUp className="w-4 h-4 text-[#65F58A]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#72A88E]" />
                        )}
                      </div>
                    </button>

                    {expandedModules[modIdx] && (
                      <div className="p-3.5 border-t border-[#65F58A]/15 space-y-2 bg-[#040e0a]/80">
                        {(module.lessons || []).map((lesson, lIdx) => (
                          <div
                            key={lesson.id || lIdx}
                            className="p-3 rounded-lg bg-[#071912]/80 border border-[#65F58A]/15 flex items-center justify-between text-xs transition-colors"
                          >
                            <div className="flex items-center gap-2.5 truncate min-w-0 pr-2">
                              <BookOpen className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                              <span className="text-[#C9EFE0] truncate font-medium break-words">
                                {lesson.title}
                              </span>
                              {lesson.is_mandatory && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 flex-shrink-0 font-bold">
                                  REQUIRED
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 font-mono text-[11px] text-[#72A88E] flex-shrink-0 pl-2">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration || '20 mins'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites & Technical Requirements */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/25 overflow-hidden min-w-0">
              <h2 className="font-royal text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#65F58A]" />
                <span>Prerequisites & Requirements</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-[#C9EFE0] font-mono min-w-0">
                {finalPrerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 min-w-0 overflow-hidden">
                    <span className="text-[#65F58A] font-bold flex-shrink-0">&bull;</span>
                    <span className="break-words [overflow-wrap:anywhere] break-all">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT STICKY SIDEBAR (Open edX Rail) ================= */}
          <div className="space-y-6 min-w-0">
            <div className="cyber-glass-card rounded-2xl p-6 sm:p-7 space-y-6 sticky top-28 border border-[#65F58A]/35 shadow-[0_0_30px_rgba(101,245,138,0.12)] overflow-hidden min-w-0">
              
              {/* Official RedKross Crest & Institutional Seal */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#65F58A]/20">
                <div className="w-12 h-12 rounded-full bg-black border border-[#65F58A]/60 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(101,245,138,0.4)] flex-shrink-0">
                  <img src="/assets/crest-clean-circle.png" alt="RedKross Crest" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-royal text-sm font-bold text-white flex items-center gap-1.5">
                    <span>RedKross</span>
                    <span className="text-[#65F58A]">Academy</span>
                  </h3>
                  <p className="text-[10px] font-mono text-[#72A88E] uppercase tracking-wider">
                    Defensive Credentialing Authority
                  </p>
                </div>
              </div>

              {/* Pricing & Value Proposition */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#72A88E] font-bold">Access & Tuition</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-royal text-3xl font-extrabold text-white">
                    {course.price === 0 ? 'Free Access' : `₹${course.price?.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-xs font-mono text-[#65F58A] font-semibold">
                    100% Curriculum
                  </span>
                </div>
                <p className="text-xs text-[#B8E6CE] leading-relaxed">
                  Start learning immediately. Certificate exam unlocked after completion of all core units.
                </p>
              </div>

              {/* ================= Primary CTA: Login / Enroll Catch ================= */}
              <div className="space-y-3">
                {!currentUser ? (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                      <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">Account required to save progress, record proctoring telemetry, and access modules.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/login', { state: { from: { pathname: `/courses/${slug || course.id}`, autoEnrol: true } } })}
                      className="w-full py-3.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Sign In with Google to Enrol</span>
                    </button>
                  </div>
                ) : isEnrolled ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/student/course/${course.id}`)}
                    className="w-full py-3.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Course in Classroom</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnrol}
                    disabled={enrolling}
                    className="w-full py-3.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] active:scale-[0.99] text-[#071018] font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.4)] transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{enrolling ? 'Enrolling...' : 'Enrol in Course (Instant)'}</span>
                  </button>
                )}

                {/* Apply Grant Code */}
                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) {
                      navigate('/login', { state: { from: { pathname: `/courses/${slug || course.id}` } } });
                    } else {
                      setShowGrantModal(true);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#092218] hover:bg-[#0c2d20] border border-[#65F58A]/25 text-xs font-mono text-[#65F58A] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Apply Academic Grant / Coupon</span>
                </button>
              </div>

              {/* Course Specifications Table (Open edX Style) */}
              <div className="pt-4 border-t border-[#65F58A]/20 space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Effort</span>
                  <span className="text-white font-semibold">{course.estimated_duration || '14 Hours'}</span>
                </div>
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Length</span>
                  <span className="text-white font-semibold">{course.estimated_weeks || 8} Weeks</span>
                </div>
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Level</span>
                  <span className="text-[#35E6B5] font-semibold">{course.difficulty || 'Intermediate'}</span>
                </div>
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Pace</span>
                  <span className="text-white">Self-Paced with Proctoring</span>
                </div>
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Certificate</span>
                  <span className="text-[#65F58A] font-bold">Verifiable On-Chain</span>
                </div>
                <div className="flex justify-between items-center text-[#72A88E]">
                  <span className="flex items-center gap-1.5"><Coins className="w-3.5 h-3.5" /> Bounty</span>
                  <span className="text-[#65F58A] font-bold">+{course.total_tokens_reward || 450} Tokens</span>
                </div>
              </div>

              {/* Connected Network Channels (RedKross Foundation, WhatsApp, Instagram) */}
              <div className="pt-4 border-t border-[#65F58A]/20">
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  {/* 1. RedKross Foundation Main Website */}
                  <a
                    href={ecosystem.foundation || "https://redkross.org.in"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RedKross Research Foundation"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#071912] border border-[#65F58A]/30 hover:border-[#65F58A] hover:bg-[#0c2a1e] flex items-center justify-center p-2 transition-all shadow-[0_0_12px_rgba(101,245,138,0.15)] hover:shadow-[0_0_20px_rgba(101,245,138,0.35)] hover:scale-105 group"
                  >
                    <img
                      src="/assets/crest-clean-circle.png"
                      alt="RedKross Research Foundation"
                      className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                    />
                  </a>

                  {/* 2. WhatsApp Official Channel */}
                  <a
                    href={ecosystem.whatsapp || "https://whatsapp.com/channel/0029VbBbRCn7tkj2M1Sj7f3Z"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RedKross WhatsApp Channel"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#071912] border border-[#65F58A]/30 hover:border-[#25D366] hover:bg-[#0c2a1e] flex items-center justify-center p-2.5 transition-all shadow-[0_0_12px_rgba(101,245,138,0.15)] hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:scale-105 group"
                  >
                    <svg
                      className="w-6 h-6 text-[#25D366] fill-current group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.04 2C6.507 2 2.019 6.488 2.019 12.02c0 1.768.461 3.494 1.336 5.011L2 22l5.12-1.343c1.465.798 3.12 1.22 4.92 1.22 5.533 0 10.021-4.488 10.021-10.02S17.573 2 12.04 2zm0 18.337c-1.579 0-3.125-.424-4.47-1.225l-.32-.19-3.322.871.887-3.238-.208-.331c-.88-1.399-1.344-3.031-1.344-4.704 0-4.606 3.748-8.354 8.357-8.354 4.608 0 8.356 3.748 8.356 8.354 0 4.606-3.748 8.354-8.356 8.354zm4.992-6.195c-.276-.138-1.633-.806-1.886-.899-.253-.092-.437-.138-.621.138-.184.276-.713.899-.874 1.083-.161.184-.322.207-.598.069-.276-.138-1.166-.43-2.221-1.371-.821-.732-1.375-1.637-1.536-1.913-.161-.276-.017-.425.121-.562.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.495-.851-2.048-.224-.54-.452-.467-.621-.475-.161-.008-.345-.009-.529-.009-.184 0-.483.069-.736.345-.253.276-.966.943-.966 2.3 0 1.357.989 2.668 1.127 2.852.138.184 1.945 2.97 4.712 4.165.658.284 1.172.454 1.573.581.661.21 1.262.18 1.737.109.53-.079 1.633-.667 1.863-1.312.23-.645.23-1.197.161-1.312-.069-.115-.253-.184-.529-.322z"/>
                    </svg>
                  </a>

                  {/* 3. Instagram Official Channel */}
                  <a
                    href={ecosystem.instagram || "https://www.instagram.com/redkross_research_foundation?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RedKross Instagram"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#071912] border border-[#65F58A]/30 hover:border-[#E1306C] hover:bg-[#0c2a1e] flex items-center justify-center p-2.5 transition-all shadow-[0_0_12px_rgba(101,245,138,0.15)] hover:shadow-[0_0_20px_rgba(225,48,108,0.35)] hover:scale-105 group"
                  >
                    <svg
                      className="w-6 h-6 text-[#E1306C] fill-current group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grant / Coupon Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="cyber-glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-[#65F58A]/40 shadow-[0_0_40px_rgba(101,245,138,0.2)]">
            <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#65F58A]" />
              <span>Apply Academic Grant / Coupon</span>
            </h3>
            <p className="text-xs text-[#B8E6CE]">
              Enter your student sponsorship token or promotional coupon code to activate immediate sponsored enrollment.
            </p>
            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Code (e.g. GRANT100)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#040e0a] border border-[#65F58A]/30 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#65F58A]"
              />
              {grantError && <div className="text-xs text-rose-400 font-mono">{grantError}</div>}
              {grantSuccess && <div className="text-xs text-[#65F58A] font-mono">Grant Verified! Enrolling...</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#0a2318] text-xs font-mono text-slate-300 border border-[#65F58A]/20 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-royal font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(101,245,138,0.3)]"
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
