import React, { useState } from 'react';
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
import { useAuth } from '../../services/auth/authContext';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const course = mockEngine.getCourseBySlug(slug);

  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [grantError, setGrantError] = useState('');

  if (!course) {
    return (
      <div className="min-h-screen bg-[#090D16] py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested course does not exist in our catalog.</p>
        <Link to="/courses" className="px-4 py-2 bg-redkross-600 rounded text-white text-xs font-semibold">
          Return to Catalogue
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

  const handleEnrol = () => {
    if (!currentUser) {
      alert('Please sign in or select a simulated user to enrol.');
      return;
    }
    mockEngine.enrolStudent(currentUser.id, course.id);
    navigate('/student');
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
        navigate('/student');
      }, 1500);
    } else {
      setGrantError('Invalid or expired coupon/grant code. Try "GRANT100"');
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-redkross-400">{course.category}</span>
          <span>/</span>
          <span className="text-slate-200">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Course Content (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-redkross-600/10 text-redkross-400 border border-redkross-600/30 font-semibold">
                  {course.category}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-300 border border-surface-border">
                  Version {course.version}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-300 border border-surface-border">
                  {course.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {course.overview}
              </p>

              {/* Author bio pill */}
              <div className="flex items-center space-x-3 p-3.5 rounded-lg bg-surface-card border border-surface-border">
                <img
                  src={course.lead_author.avatar}
                  alt={course.lead_author.name}
                  className="w-12 h-12 rounded-full border border-slate-600 object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{course.lead_author.name}</div>
                  <div className="text-xs text-slate-400">{course.lead_author.title}</div>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>What You Will Master</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learning_objectives.map((obj, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((pre, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-surface-100 border border-surface-border text-xs text-slate-300 font-mono">
                    {pre}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Syllabus Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-redkross-500" />
                  <span>Curriculum & Chapter Evaluations</span>
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {course.modules.length} Modules • {course.estimated_duration}
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, idx) => (
                  <div key={mod.id} className="bg-surface-card border border-surface-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-50 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-white mb-0.5">{mod.title}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {mod.lessons.length} Mandatory Lessons {mod.quiz ? '• Evaluated Quiz (+100 Tokens)' : ''}
                        </div>
                      </div>
                      {expandedModules[idx] ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    {expandedModules[idx] && (
                      <div className="px-6 pb-6 pt-2 border-t border-surface-border/60 space-y-3 bg-[#0A0F1D]">
                        {mod.lessons.map((les) => (
                          <div
                            key={les.id}
                            className="p-3 rounded-lg bg-surface-100/50 border border-surface-border/80 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="w-2 h-2 rounded-full bg-redkross-500" />
                              <div>
                                <div className="font-semibold text-slate-200">{les.title}</div>
                                <div className="text-[11px] text-slate-400">{les.summary}</div>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{les.duration}</span>
                            </span>
                          </div>
                        ))}

                        {mod.quiz && (
                          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2 text-amber-300 font-semibold">
                              <Award className="w-4 h-4 text-amber-400" />
                              <span>{mod.quiz.title}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[11px] font-mono text-amber-400">
                              <span>Passing: {mod.quiz.passing_score}%</span>
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                +{mod.quiz.token_bounty} Tokens
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Enrollment Card (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface-card border border-surface-border rounded-xl p-6 shadow-2xl space-y-6">
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 mb-1">Access Tier</div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </span>
                  <span className="text-xs text-slate-400">Self-Paced Courseware</span>
                </div>
              </div>

              {/* Action Button */}
              {isEnrolled ? (
                <Link
                  to="/student"
                  className="w-full text-center block py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrolled — Open Classroom</span>
                </Link>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleEnrol}
                    className="w-full py-3.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-lg hover:cyber-glow-red flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Enrol Now (Free Access)</span>
                  </button>

                  <button
                    onClick={() => setShowGrantModal(true)}
                    className="w-full py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-slate-300 text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>Apply Scholarship / Voucher Code</span>
                  </button>
                </div>
              )}

              {/* Course Meta Specs */}
              <div className="space-y-3 pt-4 border-t border-surface-border text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Reward Bounty:</span>
                  <span className="text-amber-400 font-semibold flex items-center space-x-1">
                    <Coins className="w-3.5 h-3.5" />
                    <span>+{course.total_tokens_reward} Tokens</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Independent Cert Exam:</span>
                  <span className="text-white">Included on Course Completion</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Evaluation Retries:</span>
                  <span className="text-white">3 Attempts / 24h Window</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Proctoring Standard:</span>
                  <span className="text-emerald-400">3-Strike Focus Tracking</span>
                </div>
              </div>

              {/* Academic Safeguards Banner */}
              <div className="p-3 rounded-lg bg-surface-100 border border-surface-border text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-redkross-500" />
                  <span>Institutional Credential Guarantee</span>
                </div>
                <p>Completion of this course requires 100% lesson progress, all module quizzes passed, and &ge;80% final exam score.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship / Voucher Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span>RedKross Scholarship & Grant Code</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter an institutional voucher, employer grant, or scholarship code to activate full certification entitlements.
            </p>

            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="e.g. GRANT100"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-100 border border-surface-border rounded-lg text-sm text-white uppercase font-mono tracking-wider focus:outline-none focus:border-redkross-500"
                />
                <div className="text-[10px] text-slate-400 font-mono mt-1">Hint: Try using "GRANT100" for 100% grant entitlement.</div>
              </div>

              {grantError && (
                <div className="text-xs text-rose-400 flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{grantError}</span>
                </div>
              )}

              {grantSuccess && (
                <div className="text-xs text-emerald-400 flex items-center space-x-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant verified! Enrolling in course...</span>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-semibold shadow"
                >
                  Validate & Redeem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
