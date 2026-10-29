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
  AlertCircle
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser, refreshBalance } = useAuth();
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
      <div className="min-h-screen py-24 text-center relative z-10">
        <h2 className="font-royal text-2xl font-bold text-white mb-2">Course Not Found</h2>
        <p className="text-[#94A3B8] text-sm mb-6">The requested course does not exist in our catalog.</p>
        <Link to="/courses" className="px-5 py-2.5 glass-button-primary font-royal font-bold text-xs rounded-xl inline-flex items-center gap-2">
          <span>Return to Catalogue</span>
        </Link>
      </div>
    );
  }

  // Check if active user is enrolled
  const enrolments = currentUser ? mockEngine.getEnrolmentsForUser(currentUser.id) : [];
  const isEnrolled = enrolments.some((e) => e.course_id === course.id);

  const toggleModule = (idx) => {
    setExpandedModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleEnrol = async () => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } });
      return;
    }
    setEnrolling(true);
    try {
      await apiClient.enrol(currentUser.id, course.id);
      refreshBalance();
      navigate('/student');
    } catch (err) {
      console.error('Enrolment error:', err);
      mockEngine.enrolStudent(currentUser.id, course.id);
      navigate('/student');
    } finally {
      setEnrolling(false);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowGrantModal(false);
      navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } });
      return;
    }
    if (couponCode.trim().toUpperCase() === 'GRANT100' || couponCode.trim().toUpperCase() === 'REDKROSS2026') {
      setGrantSuccess(true);
      setGrantError('');
      if (currentUser) {
        await apiClient.enrol(currentUser.id, course.id);
        refreshBalance();
      }
      setTimeout(() => {
        setShowGrantModal(false);
        navigate('/student');
      }, 1500);
    } else {
      setGrantError('Invalid or expired coupon/grant code. Try "GRANT100"');
    }
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
          <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-[#65F58A]">{course.category}</span>
          <span>/</span>
          <span className="text-slate-200 truncate">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main Course Content (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 font-semibold">
                  {course.category}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#1B2530] text-slate-300 border border-[#263440]">
                  Version {course.version}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#1B2530] text-slate-300 border border-[#263440]">
                  {course.difficulty}
                </span>
              </div>

              <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {course.title}
              </h1>

              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-6">
                {course.overview}
              </p>

              {/* Author bio pill */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-card">
                <img
                  src={course.lead_author?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'}
                  alt={course.lead_author?.name}
                  className="w-12 h-12 rounded-full border border-[#65F58A]/40 object-cover"
                />
                <div>
                  <div className="font-royal text-sm font-bold text-white">{course.lead_author?.name}</div>
                  <div className="text-xs text-[#94A3B8] font-mono">{course.lead_author?.title}</div>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="font-royal text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#65F58A]" />
                <span>Core Competencies & Objectives</span>
              </h2>
              <ul className="space-y-3">
                {(course.learning_objectives || []).map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Curriculum & Syllabus Accordion */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
                <h2 className="font-royal text-xl font-bold text-white">
                  Curriculum Breakdown
                </h2>
                <span className="text-xs font-mono text-[#94A3B8]">
                  {(course.modules || []).length} Modules
                </span>
              </div>

              <div className="space-y-4">
                {(course.modules || []).map((module, modIdx) => (
                  <div key={module.id || modIdx} className="rounded-xl border border-[#263440] bg-[#14202C]/60 overflow-hidden">
                    <button
                      onClick={() => toggleModule(modIdx)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#1B2530] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1B2530] text-[#65F58A] border border-[#65F58A]/30 flex items-center justify-center text-xs font-mono font-bold">
                          {modIdx + 1}
                        </span>
                        <span className="font-royal font-bold text-sm text-white">{module.title}</span>
                      </div>
                      {expandedModules[modIdx] ? (
                        <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                      )}
                    </button>

                    {expandedModules[modIdx] && (
                      <div className="p-4 border-t border-[#263440] space-y-2.5 bg-[#0D151F]">
                        {(module.lessons || []).map((lesson, lIdx) => (
                          <div
                            key={lesson.id || lIdx}
                            onClick={() => {
                              if (!currentUser) {
                                navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } });
                              } else if (isEnrolled) {
                                navigate('/student');
                              } else {
                                handleEnrol();
                              }
                            }}
                            className="p-3 rounded-lg bg-[#14202C] border border-[#263440] flex items-center justify-between text-xs cursor-pointer hover:border-[#65F58A]/50 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              {!currentUser ? (
                                <Lock className="w-4 h-4 text-[#64748B] flex-shrink-0 group-hover:text-amber-400 transition-colors" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-[#35E6B5] flex-shrink-0" />
                              )}
                              <span className="text-slate-200 truncate group-hover:text-white transition-colors">
                                {lesson.title}
                              </span>
                              {lesson.is_mandatory && (
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 flex-shrink-0">
                                  MANDATORY
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                              {!currentUser ? (
                                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  <span>Sign In Required</span>
                                </span>
                              ) : (
                                <span className="text-[11px] font-mono text-[#94A3B8]">
                                  {lesson.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA Card (Right Column) */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-6 sticky top-28">
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">Enrollment Status</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-royal text-3xl font-extrabold text-white">
                    {course.price === 0 ? 'Free Access' : `₹${course.price?.toLocaleString('en-IN')}`}
                  </span>
                  {course.price === 0 && (
                    <span className="text-xs font-mono text-[#65F58A]">Full Curriculum</span>
                  )}
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Start learning immediately. Certificate exam can be challenged upon 100% completion of mandatory lessons and token milestones.
                </p>
              </div>

              {!currentUser ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Sign in with your Google account to enroll, access interactive modules, and unlock exam milestones.</span>
                  </div>
                  <button
                    onClick={() => navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } })}
                    className="w-full py-3.5 rounded-xl bg-[#65F58A] hover:bg-[#00FFA3] active:scale-[0.99] text-black font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.25)] transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Sign In with Google to Enrol</span>
                  </button>
                </div>
              ) : isEnrolled ? (
                <Link
                  to="/student"
                  className="w-full py-3.5 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Continue in Classroom</span>
                </Link>
              ) : (
                <button
                  onClick={handleEnrol}
                  disabled={enrolling}
                  className="w-full py-3.5 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{enrolling ? 'Enrolling...' : 'Enrol in Course (Immediate)'}</span>
                </button>
              )}

              {/* Scholar Grant Button */}
              <button
                onClick={() => {
                  if (!currentUser) {
                    navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } });
                  } else {
                    setShowGrantModal(true);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-[#65F58A] flex items-center justify-center gap-2 transition-colors"
              >
                <Gift className="w-4 h-4" />
                <span>Apply Grant / Sponsor Code</span>
              </button>

              {/* Course Meta Specs */}
              <div className="pt-4 border-t border-[#263440] space-y-3 text-xs font-mono">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Estimated Study Time</span>
                  <span className="text-white font-semibold">{course.estimated_duration}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Token Bounty</span>
                  <span className="text-[#65F58A] font-bold">+{course.total_tokens_reward} Tokens</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Evaluation Format</span>
                  <span className="text-white">Proctored Final Exam</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Prerequisites</span>
                  <span className="text-white">{course.prerequisites?.length || 0} Listed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grant / Coupon Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#65F58A]" />
              <span>Apply Academic Grant / Coupon</span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Enter your student sponsorship token or promotional coupon code to activate immediate sponsored enrollment.
            </p>
            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Code (e.g. GRANT100)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-sm text-white font-mono uppercase focus:outline-none focus:border-[#65F58A]"
              />
              {grantError && <div className="text-xs text-rose-400 font-mono">{grantError}</div>}
              {grantSuccess && <div className="text-xs text-[#65F58A] font-mono">Grant Verified! Enrolling...</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1B2530] text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl glass-button-primary font-royal font-bold text-xs"
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
