import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Terminal, ArrowRight, CheckCircle2, Lock, Zap, BookOpen, Layers, Users, Sparkles, Coins, Flame, Clock, ShieldCheck, Activity } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import UnifiedPathwayCard from '../../components/cards/UnifiedPathwayCard';

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
              <div className="p-4 sm:p-5 rounded-2xl bg-[#101923]/90 border border-[#263440] hover:border-[#65F58A]/40 transition-all text-center relative overflow-hidden group">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-pulse" />
                  <span className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Active Cohort</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums group-hover:text-[#65F58A] transition-colors">1,420+</div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">Defensive Operators</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#101923]/90 border border-[#263440] hover:border-[#65F58A]/40 transition-all text-center relative overflow-hidden group">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35E6B5]" />
                  <span className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Curriculum</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">10</div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">Specialized Modules</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#101923]/90 border border-[#263440] hover:border-[#35E6B5]/40 transition-all text-center relative overflow-hidden group">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35E6B5] animate-pulse" />
                  <span className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Fidelity</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#35E6B5] font-mono tabular-nums">98.4%</div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">Audit Verification</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#101923]/90 border border-[#263440] hover:border-[#65F58A]/40 transition-all text-center relative overflow-hidden group">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A]" />
                  <span className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Bounties</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">500 T</div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">Tokens Disbursed</div>
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

      {/* Career Learning Tracks - Unified Psychology Reference Card Architecture */}
      <section className="py-20 border-b border-[#263440]/80 bg-[#060C13]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#35E6B5] font-semibold px-2.5 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>STRUCTURED CAREER ROADMAPS</span>
              </div>
              <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Defensive Career Pathways
              </h2>
              <p className="text-[#94A3B8] text-xs sm:text-sm mt-1 max-w-xl">
                Structured progressive curricula taking you from foundational networking and operating system telemetry to enterprise incident command.
              </p>
            </div>

            <Link
              to="/paths"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#65F58A] hover:underline"
            >
              <span>Explore All Pathways</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {learningPaths.map((path, idx) => (
              <UnifiedPathwayCard
                key={path.id || idx}
                path={path}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRD Academic Safeguards - Protected Credential Integrity */}
      <section className="py-20 border-b border-[#263440]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>STRICT ACADEMIC FIDELITY</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Protected Credential Integrity
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">
              Our certifications are trusted by enterprise security operations teams because every evaluation strictly enforces the academic safeguards specified in our Developer Handover PRD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Safeguard Card 1 */}
            <div className="relative rounded-3xl overflow-hidden border border-[#263440] bg-[#101923] p-6 sm:p-7 flex flex-col justify-between min-h-[380px] transition-all duration-300 hover:border-[#65F58A]/50 hover:shadow-[0_16px_40px_rgba(0,255,163,0.12)] group">
              {/* Layer 1: Background Cyber Artwork */}
              <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden z-0">
                <img
                  src="/assets/cards/card-07-clean.png"
                  alt=""
                  className="w-full h-full object-cover object-right opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 select-none"
                  loading="lazy"
                />
              </div>

              {/* Layer 2: Directional Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#101923] via-[#101923]/95 via-50% to-transparent z-10 pointer-events-none" />

              {/* Layer 3: Foreground Stacking Content */}
              <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-[10px] font-mono font-semibold uppercase">
                      PROCTORING TELEMETRY
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      PRD §13.1
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#0B121B] border border-[#263440] flex items-center justify-center text-[#65F58A] mb-3 group-hover:border-[#65F58A]/40 transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>

                  <h3 className="font-royal text-lg sm:text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#65F58A] transition-colors">
                    3-Strike Exam Focus Tracking
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    During evaluated assessments, client tab switches and window blur events are tracked in real-time. Strike 1 warns the operator; Strike 2 docks 50 RedKross Tokens; Strike 3 immediately terminates the attempt and locks the evaluation window.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#263440]/80 flex items-center justify-between text-[11px] font-mono text-[#65F58A]">
                  <span className="truncate">Window Blur & Tab Switch Hooks</span>
                  <span className="text-[#64748B] text-[10px]">ENFORCED</span>
                </div>
              </div>
            </div>

            {/* Safeguard Card 2 */}
            <div className="relative rounded-3xl overflow-hidden border border-[#263440] bg-[#101923] p-6 sm:p-7 flex flex-col justify-between min-h-[380px] transition-all duration-300 hover:border-[#35E6B5]/50 hover:shadow-[0_16px_40px_rgba(53,230,181,0.12)] group">
              {/* Layer 1: Background Cyber Artwork */}
              <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden z-0">
                <img
                  src="/assets/cards/card-05-clean.png"
                  alt=""
                  className="w-full h-full object-cover object-right opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 select-none"
                  loading="lazy"
                />
              </div>

              {/* Layer 2: Directional Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#101923] via-[#101923]/95 via-50% to-transparent z-10 pointer-events-none" />

              {/* Layer 3: Foreground Stacking Content */}
              <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#35E6B5] text-[10px] font-mono font-semibold uppercase">
                      COOLDOWN PROTOCOL
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      PRD §13.2
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#0B121B] border border-[#263440] flex items-center justify-center text-[#35E6B5] mb-3 group-hover:border-[#35E6B5]/40 transition-colors">
                    <Clock className="w-5 h-5" />
                  </div>

                  <h3 className="font-royal text-lg sm:text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#35E6B5] transition-colors">
                    24-Hour Mandatory Cooldown
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Exhausting 3 failed attempts or incurring a Strike 3 proctoring violation immediately activates a server-enforced 24-hour lockout timer to require structured remediation before an operator may re-attempt.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#263440]/80 flex items-center justify-between text-[11px] font-mono text-[#35E6B5]">
                  <span className="truncate">Automated Lockout Cooldown</span>
                  <span className="text-[#64748B] text-[10px]">ZERO BYPASS</span>
                </div>
              </div>
            </div>

            {/* Safeguard Card 3 */}
            <div className="relative rounded-3xl overflow-hidden border border-[#263440] bg-[#101923] p-6 sm:p-7 flex flex-col justify-between min-h-[380px] transition-all duration-300 hover:border-[#65F58A]/50 hover:shadow-[0_16px_40px_rgba(0,255,163,0.12)] group">
              {/* Layer 1: Background Cyber Artwork */}
              <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden z-0">
                <img
                  src="/assets/cards/card-06-clean.png"
                  alt=""
                  className="w-full h-full object-cover object-right opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 select-none"
                  loading="lazy"
                />
              </div>

              {/* Layer 2: Directional Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#101923] via-[#101923]/95 via-50% to-transparent z-10 pointer-events-none" />

              {/* Layer 3: Foreground Stacking Content */}
              <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-[10px] font-mono font-semibold uppercase">
                      TAMPER-PROOF AUDIT
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      PRD §13.3
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#0B121B] border border-[#263440] flex items-center justify-center text-[#65F58A] mb-3 group-hover:border-[#65F58A]/40 transition-colors">
                    <Shield className="w-5 h-5" />
                  </div>

                  <h3 className="font-royal text-lg sm:text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#65F58A] transition-colors">
                    Cryptographic Verification
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Every earned certificate generates an immutable hexadecimal digital signature and public verification ledger link with QR code, directly verifiable by enterprise blue team hiring managers.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#263440]/80 flex items-center justify-between text-[11px] font-mono text-[#65F58A]">
                  <span className="truncate">SHA-256 Digital Signature</span>
                  <span className="text-[#64748B] text-[10px]">VERIFIABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
