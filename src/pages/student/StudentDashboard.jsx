import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ArrowRight, CheckCircle2, Coins, Flame, Shield, Play, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function StudentDashboard() {
  const { currentUser, tokenBalance } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen py-24 text-center relative z-10">
        <h2 className="font-royal text-xl font-bold text-white mb-2">Authentication Required</h2>
        <p className="text-xs text-[#94A3B8] mb-4">Please select a student identity or sign in to access your learning portal.</p>
        <Link to="/login" className="px-5 py-2 rounded-full glass-button-primary font-royal font-bold text-xs inline-flex items-center gap-2">
          <span>Go to Sign-In</span>
        </Link>
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
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#263440] gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#65F58A]/50 bg-[#101923] shadow-[0_0_20px_rgba(101,245,138,0.25)] flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-royal text-2xl font-extrabold text-white">{currentUser.full_name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 uppercase font-semibold">
                  Cadet Operator
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{currentUser.headline || 'Active Defensive Practitioner'}</p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Learning Streak */}
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-mono">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-[#94A3B8]">Streak:</span>
              <span className="text-white font-bold tabular-nums">{currentUser.streak_days || 7} Days</span>
            </div>

            {/* Token Wallet */}
            <Link
              to="/student/tokens"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/35 text-[#F59E0B] hover:bg-[#F59E0B]/20 transition-all text-xs font-mono font-medium shadow-[0_0_12px_rgba(245,158,11,0.15)]"
            >
              <Coins className="w-4 h-4 text-[#F59E0B] animate-pulse-subtle" />
              <span>Wallet:</span>
              <span className="text-white font-bold tabular-nums">{tokenBalance} Tokens</span>
            </Link>
          </div>
        </div>

        {/* Continue Learning Hero Card */}
        {primaryCourse && primaryEnrolment && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-semibold px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30">
                  <Play className="w-3 h-3 fill-[#65F58A]" />
                  <span>RESUME ACTIVE PROGRAMME</span>
                </div>
                <h2 className="font-royal text-2xl font-bold text-white">{primaryCourse.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{primaryCourse.overview}</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2 max-w-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">Mandatory Course Progress</span>
                    <span className="text-[#65F58A] font-bold tabular-nums">{primaryProgress.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#071018] overflow-hidden border border-[#263440]">
                    <div
                      className="h-full bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(101,245,138,0.5)]"
                      style={{ width: `${primaryProgress.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#94A3B8] font-mono">
                    {primaryProgress.completed} of {primaryProgress.total} mandatory lessons completed
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[220px]">
                <Link
                  to={`/student/learn/${primaryEnrolment.id}`}
                  className="px-6 py-3.5 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Enter Classroom</span>
                </Link>
                <Link
                  to={`/courses/${primaryCourse.slug}`}
                  className="px-4 py-2.5 rounded-xl glass-button-secondary font-mono text-xs text-center"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Enrolled Courses Grid */}
        <div className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolments.map((enr) => {
              const crs = mockEngine.getCourseById(enr.course_id);
              if (!crs) return null;
              const progress = mockEngine.getCourseProgress(enr.id);

              return (
                <div
                  key={enr.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#1B2530] border border-[#263440] text-slate-300">{crs.difficulty}</span>
                      <span className="text-[#35E6B5] font-semibold tracking-wider">{enr.status.toUpperCase()}</span>
                    </div>

                    <h3 className="font-royal text-base font-bold text-white mb-2 leading-snug">{crs.title}</h3>

                    {/* Progress Bar */}
                    <div className="space-y-1 my-3">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-[#94A3B8]">Progress</span>
                        <span className="text-white font-bold">{progress.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#071018] overflow-hidden border border-[#263440]">
                        <div
                          className="h-full bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full transition-all"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Passed Quizzes count */}
                    <div className="text-[11px] font-mono text-[#94A3B8] flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span>{enr.passed_quizzes.length} Chapter Evaluations Passed</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#F59E0B]">+{crs.total_tokens_reward} Bounty</span>
                    <Link
                      to={`/student/learn/${enr.id}`}
                      className="px-3.5 py-1.5 rounded-lg glass-button-primary text-xs font-semibold text-black transition-colors flex items-center space-x-1"
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
