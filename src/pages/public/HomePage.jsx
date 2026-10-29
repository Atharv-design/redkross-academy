import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Terminal, ArrowRight, CheckCircle2, Lock, Zap, BookOpen, Layers, Users, Sparkles, Coins, Flame, Clock } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import DefensivePathwayCard from '../../components/cards/DefensivePathwayCard';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [catalogEnabled, setCatalogEnabled] = useState(false);
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    apiClient.getCourses().then((data) => {
      setCourses(data.courses || []);
      setCatalogEnabled(Boolean(data.public_catalog_enabled));
    });
    apiClient.getLearningPaths().then((data) => {
      setLearningPaths(data.learning_paths || []);
    });
  }, []);

  const featuredCourse = courses.find((c) => c.slug === 'soc-fundamentals-incident-response') || courses[0];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101923]/90 border border-[#263440] text-xs font-mono shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
              <span className="text-slate-300">ACADEMY COHORT 2026 ACTIVE</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#65F58A] font-semibold">PRD v1.0 DEFENSIVE CERTIFICATIONS</span>
            </div>

            {/* Main Headline with Royal Cinzel font & neon shading */}
            <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
              Institutional Training for <br />
              <span className="title-shading-neon">
                Defensive Cyber Operators
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              Master 24/7 SOC telemetry analysis, MITRE ATT&CK correlation, and incident triage through structured hands-on curricula and tamper-proof cryptographic credentials.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-button-primary font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Course Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/paths"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-button-secondary font-royal font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#35E6B5]" />
                <span>Career Learning Paths</span>
              </Link>
              <Link
                to="/verify"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#101923]/70 hover:bg-[#1B2530] border border-[#263440] text-[#94A3B8] hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#65F58A]" />
                <span>Verify Credential</span>
              </Link>
            </div>

            {/* Live Platform Telemetry Bar */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-[#263440]/60">
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1,420+</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Active Operators</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">10</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Specialized Courses</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#35E6B5] font-mono tabular-nums">98.4%</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Audit Verification</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">500 T</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Token Bounties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase / Embargo Banner */}
      <section className="py-20 border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {catalogEnabled && courses.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-semibold px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CURRICULUM SHOWCASE</span>
                  </div>
                  <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Defensive Operator Courseware
                  </h2>
                  <p className="text-[#94A3B8] text-xs sm:text-sm mt-1 max-w-xl">
                    Explore our distinct specialized modules crafted for blue team defenders, forensics analysts, and incident responders.
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#65F58A] hover:underline"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Cards Grid Rendering the Unique 10 Visual Variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {courses.slice(0, 6).map((course) => (
                  <CourseCardVariant
                    key={course.id}
                    course={course}
                    variantId={course.card_variant}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101923] border border-[#263440] text-xs font-mono">
                <Lock className="w-3.5 h-3.5 text-[#35E6B5]" />
                <span className="text-[#94A3B8]">CURRICULUM PREPARATION ACTIVE</span>
              </div>
              <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-white tracking-tight title-shading-neon">
                Courses will be out soon
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Link
                  to="/paths"
                  className="px-6 py-2.5 rounded-full bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors"
                >
                  Check Learning Paths
                </Link>
                <Link
                  to="/verify"
                  className="px-6 py-2.5 rounded-full glass-button-primary font-royal font-bold text-xs"
                >
                  Verify Credentials
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Career Learning Tracks */}
      <section className="py-20 border-b border-[#263440]/80 bg-[#060C13]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Defensive Career Pathways
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">
              Structured step-by-step curricula taking you from foundational networking and operating system telemetry to advanced incident response.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {learningPaths.map((path, idx) => (
              <DefensivePathwayCard
                key={path.id}
                path={path}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRD Academic Safeguards */}
      <section className="py-20 border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>STRICT ACADEMIC FIDELITY</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Protected Credential Integrity
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">
              Our certifications are trusted by enterprise blue teams because every evaluation strictly enforces proctoring standards specified in our Developer Handover PRD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">3-Strike Exam Focus Tracking</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                During evaluated assessments, client tab switches and window blur events are actively tracked. Strike 1 warns the student; Strike 2 deducts 50 RedKross Tokens; Strike 3 immediately aborts the exam and locks the evaluation window.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center text-[#65F58A]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">24-Hour Mandatory Retake Lockout</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Exhausting 3 failed attempts or suffering a Strike 3 violation triggers an automated 24-hour server cooldown period to enforce structured material remediation before re-attempting.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center text-[#35E6B5]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">Cryptographic Verification</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Every earned certificate generates an immutable hexadecimal digital signature and public verification URL with QR code, directly verifiable by prospective employers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
