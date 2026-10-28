import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ArrowRight, CheckCircle2, Coins, Flame, Shield, Play, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function StudentDashboard() {
  const { currentUser, tokenBalance } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center">
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
    <div className="min-h-screen bg-[#071018] py-12">
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

        {/* Continue Learning Hero Card */}
        {primaryCourse && primaryEnrolment && (
          <div className="bg-gradient-to-r from-surface-card via-surface-card to-[#1B2530] border border-surface-border rounded-xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-redkross-400 font-semibold px-2.5 py-1 rounded bg-redkross-600/10 border border-redkross-600/30">
                  <Play className="w-3 h-3 fill-redkross-400" />
                  <span>RESUME ACTIVE PROGRAMME</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{primaryCourse.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{primaryCourse.overview}</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2 max-w-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Mandatory Course Progress</span>
                    <span className="text-redkross-400 font-bold tabular-nums">{primaryProgress.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-100 overflow-hidden border border-surface-border">
                    <div
                      className="h-full bg-gradient-to-r from-redkross-600 to-rose-400 rounded-full transition-all duration-500"
                      style={{ width: `${primaryProgress.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {primaryProgress.completed} of {primaryProgress.total} mandatory lessons completed
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[220px]">
                <Link
                  to={`/student/learn/${primaryEnrolment.id}`}
                  className="px-6 py-3.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-lg hover:cyber-glow-red flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Enter Classroom</span>
                </Link>
                <Link
                  to={`/courses/${primaryCourse.slug}`}
                  className="px-4 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-slate-300 text-xs font-mono text-center"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Enrolled Courses Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-redkross-500" />
              <span>My Enrolments ({enrolments.length})</span>
            </h2>
            <Link to="/courses" className="text-xs font-mono text-redkross-400 hover:text-redkross-300 flex items-center space-x-1">
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolments.map((enr) => {
              const crs = mockEngine.getCourseById(enr.course_id);
              if (!crs) return null;
              const progress = mockEngine.getCourseProgress(enr.id);

              return (
                <div
                  key={enr.id}
                  className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-md flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                      <span className="px-2 py-0.5 rounded bg-surface-100 border border-surface-border">{crs.difficulty}</span>
                      <span className="text-emerald-400 font-semibold">{enr.status.toUpperCase()}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{crs.title}</h3>

                    {/* Progress Bar */}
                    <div className="space-y-1 my-3">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-bold">{progress.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-100 overflow-hidden">
                        <div
                          className="h-full bg-redkross-600 rounded-full transition-all"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Passed Quizzes count */}
                    <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{enr.passed_quizzes.length} Chapter Evaluations Passed</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">+{crs.total_tokens_reward} Bounty</span>
                    <Link
                      to={`/student/learn/${enr.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-100 hover:bg-redkross-600 hover:text-white text-xs font-semibold text-slate-200 transition-colors flex items-center space-x-1"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
