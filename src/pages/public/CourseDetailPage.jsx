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

  return (
    <div className="min-h-screen py-10 relative z-10 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8BA2B5]">
          <Link to="/" className="hover:text-white transition-colors">Academy</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-[#65F58A]">{course.category || 'Specialist Training'}</span>
          <span>/</span>
          <span className="text-slate-200 truncate font-semibold">{course.title}</span>
        </div>

        {/* Main Two-Column Open edX Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* ================= LEFT MAIN CONTENT STREAM (2 Columns) ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Hero Section */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/30">
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

              <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-[#C9EFE0] text-sm sm:text-base leading-relaxed">
                {course.overview}
              </p>

              {/* Author / Instructor Strip */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#65F58A]/20">
                <img
                  src={course.lead_author?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'}
                  alt={course.lead_author?.name || 'Instructor'}
                  className="w-12 h-12 rounded-full border border-[#65F58A]/50 object-cover shadow-[0_0_12px_rgba(101,245,138,0.3)]"
                />
                <div>
                  <div className="font-royal text-sm font-bold text-white">
                    {course.lead_author?.name || 'Sarah Chen, CISSP'}
                  </div>
                  <div className="text-xs text-[#72A88E] font-mono">
                    {course.lead_author?.title || 'Principal Defensive Handler • RedKross Cyber Lab'}
                  </div>
                </div>
              </div>
            </div>

            {/* "What You'll Learn" / Learning Competencies Section */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/25">
              <h2 className="font-royal text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#65F58A]" />
                <span>What You'll Learn</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(course.learning_objectives || [
                  'Master 24/7 security operations center alert analysis and SIEM triage.',
                  'Analyze real adversary attack traces using Sysmon, packet captures, and logs.',
                  'Formulate rapid containment playbooks without destroying volatile memory evidence.',
                  'Align all defensive telemetry directly with MITRE ATT&CK techniques.',
                  'Pass the cryptographically verifiable on-chain practical assessment.'
                ]).map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#092218]/40 border border-[#65F58A]/15 text-xs text-[#C9EFE0] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus & Outline Accordion */}
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-5 border border-[#65F58A]/25">
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
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#0a2318] text-[#65F58A] border border-[#65F58A]/40 flex items-center justify-center text-xs font-mono font-bold shadow-[0_0_8px_rgba(101,245,138,0.2)]">
                          {modIdx + 1}
                        </span>
                        <span className="font-royal font-bold text-sm text-white">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
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
                            <div className="flex items-center gap-2.5 truncate">
                              <BookOpen className="w-3.5 h-3.5 text-[#35E6B5] flex-shrink-0" />
                              <span className="text-[#C9EFE0] truncate font-medium">
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
            <div className="cyber-glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-[#65F58A]/25">
              <h2 className="font-royal text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#65F58A]" />
                <span>Prerequisites & Requirements</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-[#C9EFE0] font-mono">
                {(course.prerequisites || [
                  'Fundamental understanding of IP addressing, TCP/UDP packets, and subnets.',
                  'Basic familiarity with command line interfaces (Bash or PowerShell).',
                  'A web browser supporting WebAssembly and WebRTC for live hands-on proctoring.'
                ]).map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#65F58A] font-bold">&bull;</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT STICKY SIDEBAR (Open edX Rail) ================= */}
          <div className="space-y-6">
            <div className="cyber-glass-card rounded-2xl p-6 sm:p-7 space-y-6 sticky top-28 border border-[#65F58A]/35 shadow-[0_0_30px_rgba(101,245,138,0.12)]">
              
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

              {/* Connected LinkedIn & Institutional Network Badges */}
              <div className="pt-4 border-t border-[#65F58A]/20 space-y-2.5">
                <span className="text-[10px] font-mono text-[#72A88E] uppercase tracking-wider font-bold block">
                  Connected Network & Verification
                </span>

                {/* LinkedIn Badge */}
                <a
                  href="https://www.linkedin.com/company/redkross/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#092218]/50 border border-[#65F58A]/20 hover:border-[#65F58A]/60 hover:bg-[#0c2d20] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#0077b5]/20 border border-[#0077b5]/40 flex items-center justify-center text-[#35E6B5]">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#72A88E] font-mono block">OFFICIAL NETWORK</span>
                      <span className="text-xs font-semibold text-white group-hover:text-[#65F58A]">RedKross LinkedIn</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#72A88E] group-hover:text-[#65F58A]" />
                </a>

                {/* Parent Foundation */}
                <a
                  href={ecosystem.foundation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#092218]/50 border border-[#65F58A]/20 hover:border-[#65F58A]/60 hover:bg-[#0c2d20] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A]">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#72A88E] font-mono block">PARENT CHARTER</span>
                      <span className="text-xs font-semibold text-white group-hover:text-[#65F58A]">redkross.org.in</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#72A88E] group-hover:text-[#65F58A]" />
                </a>
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
