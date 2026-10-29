import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Terminal, Cpu, Cloud, Layers, Award } from 'lucide-react';

/**
 * DefensivePathwayCard
 * Renders distinct shapes, sizes, and 3D visual treatments for each Defensive Career Pathway:
 * - Card 0 (SOC Analyst): Wide Stretch Rectangle (2 Columns) with chamfered top-left corner & art-01.jpg
 * - Card 1 (Threat Hunter): Tall Cyber Card (1 Column) with chamfered top-right corner & art-06.jpg
 * - Card 2 (Cloud Architect): Panoramic Command Deck (3 Columns) with bottom notch & art-02.jpg
 * 
 * Strict Zero-Blue Graphite + Neon Green / Mint EdTech palette:
 * #071018, #101923, #1B2530, #65F58A, #35E6B5, #00FFA3, #263440, #94A3B8, #F1F5F9
 */
export default function DefensivePathwayCard({ path, index = 0 }) {
  const cardRef = useRef(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    const timer = setTimeout(() => setIsIn(true), 800);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!path) return null;

  // Configuration per pathway index (0: SOC Analyst, 1: Threat Hunter, 2: Defensive Architect)
  const configs = [
    {
      art: '/assets/course-art/art-01.jpg',
      artPos: '85% 25%',
      gridClass: 'col-span-1 lg:col-span-2',
      clipClass: 'cyber-clip-corner-top-left',
      accentColor: '#65F58A',
      accentBg: 'rgba(101, 245, 138, 0.10)',
      accentBorder: 'rgba(101, 245, 138, 0.35)',
      trackSteps: ['01 Cyber Foundations', '02 Network Telemetry', '03 SOC Triage', '04 Incident Response'],
      badgeLabel: 'CORE OPERATOR TRACK',
    },
    {
      art: '/assets/course-art/art-06.jpg',
      artPos: '90% 20%',
      gridClass: 'col-span-1 lg:col-span-1',
      clipClass: 'cyber-clip-corner-top-right',
      accentColor: '#35E6B5',
      accentBg: 'rgba(53, 230, 181, 0.10)',
      accentBorder: 'rgba(53, 230, 181, 0.35)',
      trackSteps: ['01 Memory Analysis', '02 Artifact Extraction', '03 Threat Emulation'],
      badgeLabel: 'SPECIALIST LABS',
    },
    {
      art: '/assets/course-art/art-02.jpg',
      artPos: '88% 35%',
      gridClass: 'col-span-1 lg:col-span-3',
      clipClass: 'cyber-clip-notch-bottom',
      accentColor: '#65F58A',
      accentBg: 'rgba(101, 245, 138, 0.10)',
      accentBorder: 'rgba(101, 245, 138, 0.35)',
      trackSteps: ['01 Linux Defense', '02 Web Application Defense', '03 Cloud Workload Security', '04 Governance & Risk'],
      badgeLabel: 'ENTERPRISE ARCHITECTURE',
    },
  ];

  const cfg = configs[index % configs.length];

  // ==========================================
  // VARIANT 0: WIDE STRETCH RECTANGLE (2 COLS)
  // ==========================================
  if (index === 0) {
    return (
      <div
        ref={cardRef}
        className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#263440] hover:border-[#65F58A]/60 bg-[#101923]/90 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(101,245,138,0.12)] p-6 sm:p-8 flex flex-col justify-between min-h-[460px] ${
          isIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Full-bleed background artwork layer */}
        <div
          className="absolute inset-0 z-[-2] bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url('${cfg.art}')`,
            backgroundPosition: cfg.artPos,
          }}
          aria-hidden="true"
        />

        {/* Multi-layer readability gradient */}
        <div
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{
            background:
              'linear-gradient(0deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.82) 25%, rgba(7,16,24,0.1) 60%), ' +
              'linear-gradient(180deg, rgba(7,16,24,0.6) 0%, rgba(7,16,24,0) 25%), ' +
              'linear-gradient(90deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.92) 45%, rgba(7,16,24,0.65) 70%, rgba(7,16,24,0.2) 100%)',
          }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#65F58A] bg-[#65F58A]/10 border border-[#65F58A]/35">
                {path.difficulty}
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-[#35E6B5] bg-[#35E6B5]/10 border border-[#35E6B5]/30">
                {cfg.badgeLabel}
              </span>
            </div>
            <span className="text-xs font-mono text-[#94A3B8] font-medium">
              {path.estimated_weeks} Weeks • {path.total_hours}h • {path.courses_count || 4} Courses
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white mb-3 max-w-2xl leading-snug group-hover:text-[#65F58A] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed mb-6">
            {path.short_desc}
          </p>

          {/* Sequential Step Progression Roadmap */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#0B121B]/80 border border-[#263440]/80 backdrop-blur-md max-w-xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-2 flex items-center justify-between">
              <span>Curriculum Progression</span>
              <span className="text-[#65F58A]">4 Sequential Modules</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded bg-[#101923] border border-[#263440] text-[10px] font-mono text-slate-300 truncate text-center hover:border-[#65F58A]/40 transition-colors"
                  title={step}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Validated */}
          <div className="space-y-1.5 mb-6 max-w-xl">
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
              Skills Validated
            </div>
            <div className="flex flex-wrap gap-1.5">
              {path.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#1B2530]/85 text-slate-300 font-mono border border-[#263440] backdrop-blur-sm group-hover:border-[#65F58A]/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credential & Action Row */}
        <div className="pt-4 border-t border-[#263440]/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center flex-none">
              <Shield className="w-5 h-5 text-[#65F58A]" />
            </div>
            <div className="truncate">
              <div className="text-[9px] text-[#94A3B8] font-mono uppercase tracking-wider">
                Milestone Credential
              </div>
              <div className="text-xs sm:text-sm font-royal font-bold text-[#65F58A] truncate">
                {path.milestone_cert}
              </div>
            </div>
          </div>

          <Link
            to="/paths"
            className="w-10 h-10 rounded-full border border-[#263440] bg-[#101923]/90 text-[#65F58A] group-hover:bg-[#65F58A] group-hover:text-black group-hover:border-[#65F58A] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(101,245,138,0.2)] flex-none group-hover:scale-105"
            aria-label={`View track ${path.title}`}
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 1: TALL COMPACT CYBER CARD (1 COL)
  // ==========================================
  if (index === 1) {
    return (
      <div
        ref={cardRef}
        className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#263440] hover:border-[#35E6B5]/60 bg-[#101923]/90 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(53,230,181,0.12)] p-6 sm:p-7 flex flex-col justify-between min-h-[460px] ${
          isIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Full-bleed background artwork layer */}
        <div
          className="absolute inset-0 z-[-2] bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url('${cfg.art}')`,
            backgroundPosition: cfg.artPos,
          }}
          aria-hidden="true"
        />

        {/* Multi-layer readability gradient */}
        <div
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{
            background:
              'linear-gradient(0deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.85) 35%, rgba(7,16,24,0.2) 65%), ' +
              'linear-gradient(180deg, rgba(7,16,24,0.6) 0%, rgba(7,16,24,0) 25%), ' +
              'linear-gradient(90deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.92) 50%, rgba(7,16,24,0.7) 100%)',
          }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#35E6B5] bg-[#35E6B5]/10 border border-[#35E6B5]/35 truncate">
              {path.difficulty}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              {path.estimated_weeks}W • {path.total_hours}h
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-royal text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug group-hover:text-[#35E6B5] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
            {path.short_desc}
          </p>

          {/* Sequential Modules Flow */}
          <div className="mb-4 p-3 rounded-xl bg-[#0B121B]/80 border border-[#263440]/80 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-1.5 flex items-center justify-between">
              <span>Investigation Track</span>
              <span className="text-[#35E6B5]">3 Labs</span>
            </div>
            <div className="space-y-1.5">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#101923] border border-[#263440] text-[10px] font-mono text-slate-300 flex items-center justify-between hover:border-[#35E6B5]/40 transition-colors"
                >
                  <span className="truncate">{step}</span>
                  <CheckCircle2 className="w-3 h-3 text-[#35E6B5] flex-none ml-1.5 opacity-70" />
                </div>
              ))}
            </div>
          </div>

          {/* Skills Validated */}
          <div className="space-y-1 mb-4">
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
              Skills Validated
            </div>
            <div className="flex flex-wrap gap-1.5">
              {path.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2530]/85 text-slate-300 font-mono border border-[#263440]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credential & Action Row */}
        <div className="pt-4 border-t border-[#263440]/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center flex-none">
              <Shield className="w-4 h-4 text-[#35E6B5]" />
            </div>
            <div className="truncate">
              <div className="text-[9px] text-[#94A3B8] font-mono uppercase">Milestone Credential</div>
              <div className="text-xs font-royal font-bold text-[#35E6B5] truncate">
                {path.milestone_cert}
              </div>
            </div>
          </div>

          <Link
            to="/paths"
            className="w-9 h-9 rounded-full border border-[#263440] bg-[#101923]/90 text-[#35E6B5] group-hover:bg-[#35E6B5] group-hover:text-black group-hover:border-[#35E6B5] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(53,230,181,0.2)] flex-none group-hover:scale-105"
            aria-label={`View track ${path.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 2: PANORAMIC COMMAND DECK (3 COLS)
  // ==========================================
  return (
    <div
      ref={cardRef}
      className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#263440] hover:border-[#65F58A]/60 bg-[#101923]/90 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(101,245,138,0.12)] p-6 sm:p-8 ${
        isIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Full-bleed background artwork layer */}
      <div
        className="absolute inset-0 z-[-2] bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url('${cfg.art}')`,
          backgroundPosition: cfg.artPos,
        }}
        aria-hidden="true"
      />

      {/* Multi-layer readability gradient */}
      <div
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{
          background:
            'linear-gradient(0deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.85) 30%, rgba(7,16,24,0.1) 70%), ' +
            'linear-gradient(180deg, rgba(7,16,24,0.6) 0%, rgba(7,16,24,0) 25%), ' +
            'linear-gradient(90deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.94) 50%, rgba(7,16,24,0.65) 75%, rgba(7,16,24,0.15) 100%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (Main Info & Modules Flow) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#65F58A] bg-[#65F58A]/10 border border-[#65F58A]/35">
              {path.difficulty}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-[#35E6B5] bg-[#35E6B5]/10 border border-[#35E6B5]/30">
              {cfg.badgeLabel}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              {path.estimated_weeks} Weeks • {path.total_hours}h • {path.courses_count || 4} Core Courses
            </span>
          </div>

          <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
            {path.short_desc}
          </p>

          {/* Sequential Step Progression */}
          <div className="p-3.5 rounded-xl bg-[#0B121B]/80 border border-[#263440]/80 backdrop-blur-md max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-2 flex items-center justify-between">
              <span>Architectural Track Blueprint</span>
              <span className="text-[#65F58A]">Cloud & Infrastructure Hardening</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1.5 rounded bg-[#101923] border border-[#263440] text-[10.5px] font-mono text-slate-300 truncate text-center hover:border-[#65F58A]/40 transition-colors"
                  title={step}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Validated */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
              Skills Validated
            </div>
            <div className="flex flex-wrap gap-1.5">
              {path.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#1B2530]/85 text-slate-300 font-mono border border-[#263440] backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Milestone Box & CTA) */}
        <div className="lg:col-span-4 lg:border-l lg:border-[#263440]/80 lg:pl-6 space-y-5">
          <div className="p-5 rounded-xl bg-[#0B121B]/90 border border-[#263440] space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#65F58A]" />
            </div>
            <div>
              <div className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
                Milestone Credential Awarded
              </div>
              <div className="text-sm font-royal font-bold text-white mt-0.5">
                {path.milestone_cert}
              </div>
            </div>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              Upon passing the defensive capstone examination and proctored technical evaluation.
            </p>
          </div>

          <Link
            to="/paths"
            className="w-full py-3.5 px-6 rounded-xl glass-button-primary font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_25px_rgba(101,245,138,0.4)] transition-all"
          >
            <span>Explore Architecture Track</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
