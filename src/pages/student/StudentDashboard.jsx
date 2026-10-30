import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ArrowRight, CheckCircle2, Coins, Flame, Shield, Play, Lock, AlertCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function StudentDashboard() {
  const { currentUser, tokenBalance, isSuspended } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    enrolments: [],
    allCourses: [],
    primaryEnrolment: null,
    primaryCourse: null,
    primaryProgress: { percentage: 0, completed: 0, total: 0 },
    avgProgress: 0
  });

  const loadData = () => {
    if (!currentUser || !currentUser.id) return;
    try {
      const enrs = Array.isArray(mockEngine.getEnrolmentsForUser(currentUser.id))
        ? mockEngine.getEnrolmentsForUser(currentUser.id)
        : [];
      const crss = Array.isArray(mockEngine.getCourses()) ? mockEngine.getCourses() : [];
      const primaryEnr = enrs[0] || null;
      const primaryCrs = primaryEnr ? mockEngine.getCourseById(primaryEnr.course_id) : null;
      const primaryProg = primaryEnr
        ? mockEngine.getCourseProgress(primaryEnr.id)
        : { percentage: 0, completed: 0, total: 0 };
      const avgProg = enrs.length > 0
        ? Math.round(
            enrs.reduce((sum, e) => {
              const p = mockEngine.getCourseProgress(e.id);
              return sum + (p?.percentage || 0);
            }, 0) / enrs.length
          )
        : 0;

      setDashboardData({
        enrolments: enrs,
        allCourses: crss,
        primaryEnrolment: primaryEnr,
        primaryCourse: primaryCrs,
        primaryProgress: primaryProg || { percentage: 0, completed: 0, total: 0 },
        avgProgress: avgProg
      });
    } catch (err) {
      console.warn('Dashboard data load warning:', err);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = mockEngine.subscribe(() => {
      loadData();
    });
    return () => unsubscribe();
  }, [currentUser?.id]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center">
        <div className="max-w-md mx-auto liquid-glass-panel rounded-2xl p-8 space-y-4">
          <Shield className="w-10 h-10 text-[#65F58A] mx-auto animate-pulse" />
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-slate-400">Please select a student identity or sign in to access your learning portal.</p>
          <Link to="/login" className="liquid-glass-button px-5 py-2.5 rounded-xl font-mono text-xs font-bold inline-block">
            Go to Sign-In
          </Link>
        </div>
      </div>
    );
  }

  const { enrolments, allCourses, primaryEnrolment, primaryCourse, primaryProgress, avgProgress } = dashboardData;
  const cadetId = currentUser?.cadet_id || 'RK-89421';
  const fullName = currentUser?.full_name || currentUser?.displayName || 'Cadet Operator';

  return (
    <div className="min-h-screen bg-[#071018] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="ultra-glass-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#263440] animate-slide-left">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=101923&color=65F58A&bold=true`}
                alt={fullName}
                className="w-16 h-16 rounded-2xl border-2 border-[#65F58A]/50 object-cover shadow-[0_0_20px_rgba(101,245,138,0.25)]"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Cadet&background=101923&color=65F58A&bold=true';
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#65F58A] border-2 border-[#071018] shadow-[0_0_8px_#65F58A]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-royal font-bold text-white">{fullName}</h1>
                <span className="ultra-glass-pill text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase">
                  OPERATOR PORTAL
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 font-bold shadow-[0_0_10px_rgba(101,245,138,0.2)]">
                  CADET ID: {cadetId}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">{currentUser.headline || 'Verified Cyber Defense Operator'}</p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Public Verification Dossier Pill */}
            <Link
              to={`/verify/${cadetId}`}
              className="ultra-glass-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2"
              title="Open Public Verification Dossier"
            >
              <Award className="w-4 h-4 text-[#65F58A]" />
              <span>Public Dossier</span>
            </Link>

            {/* Learning Streak */}
            <div className="ultra-glass-card px-3.5 py-2 rounded-xl text-xs font-mono flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-slate-400">Streak:</span>
              <span className="text-white font-bold tabular-nums">{currentUser.streak_days || 7} Days</span>
            </div>

            {/* Token Wallet */}
            <Link
              to="/student/tokens"
              className="ultra-glass-card hover:border-amber-500/50 px-3.5 py-2 rounded-xl text-amber-400 transition-all text-xs font-mono font-medium flex items-center space-x-2"
            >
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Wallet:</span>
              <span className="text-white font-bold tabular-nums">{typeof tokenBalance === 'number' ? tokenBalance : 150} Tokens</span>
            </Link>
          </div>
        </div>

        {/* Security Suspension Notice */}
        {isSuspended && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-2xl flex items-center space-x-3 text-red-200 ultra-glass-panel">
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold font-mono text-red-400 block mb-0.5">
                OPERATIONAL ACCESS RESTRICTED (ACCOUNT SUSPENDED)
              </span>
              <span>
                Your cadet profile has been temporarily suspended by an Academy Super Admin. Certification examination and token redemptions are locked. Contact security@redkross.org.in for review.
              </span>
            </div>
          </div>
        )}

        {/* Continue Learning Hero Card */}
        {primaryCourse && primaryEnrolment && (
          <div className="ultra-glass-panel rounded-2xl p-8 relative overflow-hidden shimmer-lr animate-slide-left stagger-1">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-semibold px-3 py-1 rounded-full ultra-glass-pill">
                  <Play className="w-3 h-3 fill-[#65F58A]" />
                  <span>RESUME ACTIVE PROGRAMME</span>
                </div>
                <h2 className="text-2xl font-royal font-bold text-white">{primaryCourse.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{primaryCourse.overview}</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2 max-w-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Mandatory Course Progress</span>
                    <span className="text-[#65F58A] font-bold tabular-nums">{primaryProgress?.percentage || 0}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-100 overflow-hidden border border-surface-border">
                    <div
                      className="h-full bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(101,245,138,0.6)]"
                      style={{ width: `${primaryProgress?.percentage || 0}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {primaryProgress?.completed || 0} of {primaryProgress?.total || 0} mandatory lessons completed
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[220px]">
                <Link
                  to={`/student/learn/${primaryEnrolment.id}`}
                  className="ultra-glass-btn px-6 py-3.5 rounded-xl font-royal font-bold text-sm flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Enter Classroom</span>
                </Link>
                <Link
                  to={`/courses/${primaryCourse.slug}`}
                  className="ultra-glass-btn-secondary px-4 py-2.5 rounded-xl text-xs font-mono text-center"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Enrolled Courses Grid */}
        <div className="space-y-4 animate-slide-left stagger-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-royal font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#65F58A]" />
              <span>My Enrolments ({enrolments.length})</span>
            </h2>
            <Link to="/courses" className="text-xs font-mono text-[#65F58A] hover:text-[#35E6B5] flex items-center space-x-1 transition-colors">
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolments.map((enr) => {
              const crs = mockEngine.getCourseById(enr.course_id);
              if (!crs) return null;
              const progress = mockEngine.getCourseProgress(enr.id) || { percentage: 0 };

              return (
                <div
                  key={enr.id}
                  className="ultra-glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-surface-100 border border-surface-border">{crs.difficulty || 'Specialist'}</span>
                      <span className="text-[#65F58A] font-semibold">{String(enr.status || 'ACTIVE').toUpperCase()}</span>
                    </div>

                    <h3 className="text-base font-royal font-bold text-white mb-2">{crs.title}</h3>

                    {/* Progress Bar */}
                    <div className="space-y-1 my-3">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-bold tabular-nums">{progress.percentage || 0}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#65F58A] to-[#35E6B5] rounded-full transition-all"
                          style={{ width: `${progress.percentage || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Passed Quizzes count */}
                    <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span>{(enr.passed_quizzes || []).length} Chapter Evaluations Passed</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">+{crs.total_tokens_reward || 350} Bounty</span>
                    <Link
                      to={`/student/learn/${enr.id}`}
                      className="ultra-glass-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
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
