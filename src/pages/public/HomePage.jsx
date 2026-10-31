import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Terminal, ArrowRight, CheckCircle2, Lock, Zap, BookOpen, Layers, Users, Sparkles, Coins, Flame, Clock, ShieldCheck } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import DefensivePathwayCard from '../../components/cards/DefensivePathwayCard';
import AcademicSafeguardCard from '../../components/cards/AcademicSafeguardCard';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [catalogEnabled, setCatalogEnabled] = useState(false);
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    const loadHomeData = () => {
      apiClient.getCourses().then((data) => {
        setCourses(data.courses || []);
        setCatalogEnabled(Boolean(data.public_catalog_enabled));
      });
      apiClient.getLearningPaths().then((data) => {
        setLearningPaths(data.learning_paths || []);
      });
    };

    loadHomeData();

    const unsubCourse = socketClient.on('course:mutation', loadHomeData);
    const unsubEmbargo = socketClient.on('catalog:visibility', loadHomeData);
    const unsubMock = mockEngine.subscribe(loadHomeData);

    return () => {
      if (typeof unsubCourse === 'function') unsubCourse();
      if (typeof unsubEmbargo === 'function') unsubEmbargo();
      if (typeof unsubMock === 'function') unsubMock();
    };
  }, []);

  // Exactly 3 Flagship Benchmark Courses for Home (Admin newly added courses go to /courses without displacing Home)
  const homeFeaturedCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];

    const flagshipIds = [
      'course-soc-101',
      'course-threat-hunt-201',
      'course-malware-rev-301'
    ];

    const flagships = courses.filter((c) =>
      flagshipIds.includes(c.id) ||
      ['soc-fundamentals-incident-response', 'threat-hunting-active-defense', 'malware-analysis-reverse-engineering'].includes(c.slug)
    );

    if (flagships.length >= 3) {
      return flagships.slice(0, 3);
    }

    // Fallback: exclude dynamically created courses starting with 'crs_'
    const nonDynamic = courses.filter((c) => !c.id.startsWith('crs_'));
    return (nonDynamic.length >= 3 ? nonDynamic : courses).slice(0, 3);
  }, [courses]);

  const featuredCourse = courses.find((c) => c.slug === 'soc-fundamentals-incident-response') || courses[0];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full ultra-glass-card text-xs font-mono shadow-md backdrop-blur-md animate-slide-left shimmer-lr">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
              <span className="text-slate-200">ACADEMY COHORT 2026 ACTIVE</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#65F58A] font-semibold">PRD v1.0 DEFENSIVE CERTIFICATIONS</span>
            </div>

            {/* Main Headline with Royal Cinzel font & neon shading */}
            <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] animate-slide-left stagger-1">
              Institutional Training for <br />
              <span className="title-shading-neon">
                Defensive Cyber Operators
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed animate-slide-left stagger-2">
              Master 24/7 SOC telemetry analysis, MITRE ATT&CK correlation, and incident triage through structured hands-on curricula and tamper-proof cryptographic credentials.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 animate-slide-left stagger-3">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full ultra-glass-btn font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Course Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/paths"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full ultra-glass-btn-secondary font-royal font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#35E6B5]" />
                <span>Career Learning Paths</span>
              </Link>
              <Link
                to="/verify"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full ultra-glass-card text-[#94A3B8] hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#65F58A]" />
                <span>Verify Credential</span>
              </Link>
            </div>

            {/* Live Platform Telemetry Bar */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-[#263440]/60 animate-slide-left stagger-4">
              <div className="p-4 ultra-glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1,420+</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Active Operators</div>
              </div>
              <div className="p-4 ultra-glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">10</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Specialized Courses</div>
              </div>
              <div className="p-4 ultra-glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#35E6B5] font-mono tabular-nums">98.4%</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Audit Verification</div>
              </div>
              <div className="p-4 ultra-glass-card rounded-xl text-center">
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
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#65F58A] hover:underline"
                >
                  <span>Explore Full Catalog ({courses.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Cards Grid: Strictly 3 Flagship Courses on Home Page */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {homeFeaturedCourses.map((course, idx) => (
                  <CourseCardVariant
                    key={course.id}
                    course={course}
                    variantId={course.card_variant}
                    index={idx}
                  />
                ))}
              </div>

              {/* Dedicated High-Craft Button for All Courses */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#65F58A] hover:bg-[#00FFA3] active:scale-[0.99] text-black font-royal font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(101,245,138,0.25)] hover:shadow-[0_0_35px_rgba(101,245,138,0.4)] group"
                >
                  <BookOpen className="w-4 h-4 text-black" />
                  <span>View All Courses & Full Curriculum ({courses.length})</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="max-w-3xl w-full mx-auto text-center space-y-8 ultra-glass-card rounded-3xl p-8 sm:p-12 shimmer-lr animate-slide-left border border-[#65F58A]/35 backdrop-blur-2xl bg-[#081a13]/60 shadow-[0_12px_45px_rgba(0,0,0,0.55)]">
              {/* Subtle Cyber Status Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ultra-glass-pill text-xs font-mono shadow-md backdrop-blur-md border border-[#65F58A]/30 bg-[#09241a]/60">
                <span className="w-2 h-2 rounded-full bg-[#35E6B5] animate-pulse" />
                <span className="text-[#C9EFE0]">CURRICULUM PREPARATION IN PROGRESS</span>
                <span className="text-[#65F58A]/40">•</span>
                <span className="text-[#65F58A] font-semibold">REDKROSS ACADEMY</span>
              </div>

              {/* Refined Cyber Visual Illustration (Geometric Security Node) */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center my-2">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#65F58A]/15 via-[#35E6B5]/15 to-transparent blur-2xl" />

                <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(101,245,138,0.25)]">
                  {/* Concentric Coordinate Rings */}
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#65F58A" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.25" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#35E6B5" strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx="100" cy="100" r="50" fill="#071912" stroke="#65F58A" strokeWidth="1.5" />

                  {/* Orbital Cyber Nodes */}
                  <circle cx="100" cy="12" r="4" fill="#65F58A" />
                  <circle cx="100" cy="188" r="4" fill="#65F58A" />
                  <circle cx="12" cy="100" r="4" fill="#35E6B5" />
                  <circle cx="188" cy="100" r="4" fill="#35E6B5" />

                  {/* Connecting Cross-hair gridlines */}
                  <line x1="100" y1="20" x2="100" y2="50" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.6" />
                  <line x1="100" y1="150" x2="100" y2="180" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.6" />
                  <line x1="20" y1="100" x2="50" y2="100" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" />
                  <line x1="150" y1="100" x2="180" y2="100" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" />

                  {/* Central Shield Icon Graphic */}
                  <path
                    d="M 100 70 L 122 80 V 98 C 122 114 100 126 100 126 C 100 126 78 114 78 98 V 80 Z"
                    fill="#09261a"
                    stroke="#65F58A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Center Lock / Keyhole */}
                  <circle cx="100" cy="94" r="4" fill="#35E6B5" />
                  <line x1="100" y1="98" x2="100" y2="105" stroke="#35E6B5" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Exact Primary Message & Supporting Copy */}
              <div className="space-y-4 max-w-2xl mx-auto animate-slide-left stagger-1">
                <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight title-shading-neon">
                  Courses will be out soon
                </h2>
                <p className="text-sm sm:text-base text-[#B8E6CE] leading-relaxed max-w-xl mx-auto">
                  We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
                </p>
              </div>

              {/* Educational Framework Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto text-left animate-slide-left stagger-2">
                <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#65F58A]/25 bg-[#092218]/50 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
                    <Terminal className="w-3.5 h-3.5 text-[#65F58A]" />
                  </div>
                  <div className="font-royal text-xs font-bold text-white">Hands-on Telemetry</div>
                  <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                    Real-world log correlation across SIEM and defensive monitoring stacks.
                  </p>
                </div>

                <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#35E6B5]/25 bg-[#092218]/50 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-[#35E6B5]" />
                  </div>
                  <div className="font-royal text-xs font-bold text-white">Adversary Mapping</div>
                  <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                    Curricula aligned strictly with MITRE ATT&CK defensive methodologies.
                  </p>
                </div>

                <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#65F58A]/25 bg-[#092218]/50 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-[#65F58A]" />
                  </div>
                  <div className="font-royal text-xs font-bold text-white">Tamper-Proof Proofs</div>
                  <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                    Cryptographically verified credentials on the public registry.
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-left stagger-3">
                <Link
                  to="/verify"
                  className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn-secondary text-xs font-mono text-[#C9EFE0] hover:text-white transition-all flex items-center justify-center gap-2 border border-[#65F58A]/30 bg-[#09241a]/60 hover:bg-[#0c3123]"
                >
                  <Award className="w-4 h-4 text-[#65F58A]" />
                  <span>Verify Institutional Credentials</span>
                </Link>
                <Link
                  to="/paths"
                  className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(101,245,138,0.25)] hover:shadow-[0_0_30px_rgba(101,245,138,0.4)]"
                >
                  <span>Explore Cyber Intelligence</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

          {/* 3D Cyber Academic Safeguards Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {[
              {
                title: '3-Strike Exam Focus Tracking',
                description: 'During evaluated assessments, client tab switches and window blur events are actively tracked. Strike 1 warns the student; Strike 2 deducts 50 RedKross Tokens; Strike 3 immediately aborts the exam and locks the evaluation window.',
                icon: Zap
              },
              {
                title: '24-Hour Mandatory Retake Lockout',
                description: 'Exhausting 3 failed attempts or suffering a Strike 3 violation triggers an automated 24-hour server cooldown period to enforce structured material remediation before re-attempting.',
                icon: Clock
              },
              {
                title: 'Cryptographic Verification',
                description: 'Every earned certificate generates an immutable hexadecimal digital signature and public verification URL with QR code, directly verifiable by prospective employers.',
                icon: ShieldCheck
              }
            ].map((safeguard, idx) => (
              <AcademicSafeguardCard
                key={safeguard.title}
                safeguard={safeguard}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
