import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ArrowRight, CheckCircle2, Coins, Flame, Shield, Play, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import DictoCyberCard from '../../components/cards/DictoCyberCard';

export default function StudentDashboard() {
  const { currentUser, tokenBalance } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#090D16] py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
        <p className="text-xs text-slate-400 mb-4">Please select a student identity or sign in to access your learning portal.</p>
      </div>
    );
  }

  const enrolments = mockEngine.getEnrolmentsForUser(currentUser.id);
  const allCourses = mockEngine.getCourses();

  // Primary active enrolment (SOC Fundamentals if available)
  const primaryEnrolment = enrolments[0];
  const primaryCourse = primaryEnrolment ? mockEngine.getCourseById(primaryEnrolment.course_id) : null;
  const primaryProgress = primaryEnrolment ? mockEngine.getCourseProgress(primaryEnrolment.id) : { percentage: 0 };

  // Calculate cumulative average progress
  const avgProgress = enrolments.length > 0
    ? Math.round(enrolments.reduce((sum, e) => sum + mockEngine.getCourseProgress(e.id).percentage, 0) / enrolments.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#090D16] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-border gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.full_name}
              className="w-14 h-14 rounded-xl border-2 border-redkross-600/40 object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white">{currentUser.full_name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-redkross-600/20 text-redkross-400 border border-redkross-600/30 uppercase">
                  Operator Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{currentUser.headline}</p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Learning Streak */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs font-mono">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-slate-400">Streak:</span>
              <span className="text-white font-bold tabular-nums">{currentUser.streak_days || 7} Days</span>
            </div>

            {/* Token Wallet */}
            <Link
              to="/student/tokens"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-mono font-medium"
            >
              <Coins className="w-4 h-4 text-amber-400 animate-pulse-subtle" />
              <span>Wallet:</span>
              <span className="text-white font-bold tabular-nums">{tokenBalance} Tokens</span>
            </Link>
          </div>
        </div>

        {/* Continue Learning Hero Card with Dicto Cyber Card (Radar Progress Variant) */}
        {primaryCourse && primaryEnrolment && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#65F58A]">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-[#65F58A]" />
                <span>ACTIVE ENROLLED CURRICULUM</span>
              </span>
              <span className="text-slate-400">
                {primaryProgress.completed} of {primaryProgress.total} Lessons Completed
              </span>
            </div>
            <DictoCyberCard
              variant={7}
              tag="RESUME ACTIVE PROGRAMME"
              title={primaryCourse.title}
              description={primaryCourse.overview}
              progress={primaryProgress.percentage}
              actionHref={`/student/learn/${primaryEnrolment.id}`}
              actionText="Enter Active Classroom"
            />
          </div>
        )}

        {/* Enrolled Courses Grid Rendering Dicto Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-royal text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#65F58A]" />
              <span>My Enrolments ({enrolments.length})</span>
            </h2>
            <Link to="/courses" className="text-xs font-mono text-[#65F58A] hover:underline flex items-center space-x-1">
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {enrolments.map((enr, idx) => {
              const crs = mockEngine.getCourseById(enr.course_id);
              if (!crs) return null;
              const progress = mockEngine.getCourseProgress(enr.id);

              return (
                <CourseCardVariant
                  key={enr.id}
                  course={{ ...crs, progress: progress.percentage }}
                  variantId={crs.card_variant || `variant-${String(idx + 1).padStart(2, '0')}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
