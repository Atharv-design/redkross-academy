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
 * #071018, #101923, #1B2530, #FF7A00, #FFA439, #FF7A00, #263440, #94A3B8, #F1F5F9
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
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
      accentColor: '#FF7A00',
      accentBg: 'rgba(255,122,0, 0.10)',
      accentBorder: 'rgba(255,122,0, 0.35)',
      trackSteps: ['01 Cyber Foundations', '02 Network Telemetry', '03 SOC Triage', '04 Incident Response'],
      badgeLabel: 'CORE OPERATOR TRACK',
    },
    {
      art: '/assets/course-art/art-06.jpg',
      artPos: '90% 20%',
      gridClass: 'col-span-1 lg:col-span-1',
      clipClass: 'cyber-clip-corner-top-right',
      accentColor: '#FFA439',
      accentBg: 'rgba(255,164,57, 0.10)',
      accentBorder: 'rgba(255,164,57, 0.35)',
      trackSteps: ['01 Memory Analysis', '02 Artifact Extraction', '03 Threat Emulation'],
      badgeLabel: 'SPECIALIST LABS',
    },
    {
      art: '/assets/course-art/art-02.jpg',
      artPos: '88% 35%',
      gridClass: 'col-span-1 lg:col-span-3',
      clipClass: 'cyber-clip-notch-bottom',
      accentColor: '#FF7A00',
      accentBg: 'rgba(255,122,0, 0.10)',
      accentBorder: 'rgba(255,122,0, 0.35)',
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
        style={{ transitionDelay: `${index * 150}ms` }}
        className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#FF7A00]/25 hover:border-[#FF7A00]/60 bg-[#04140d]/65 backdrop-blur-2xl transition-all duration-600 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(255,122,0,0.22)] p-6 sm:p-8 flex flex-col justify-between min-h-[460px] ${
          isIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
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
              'linear-gradient(0deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.82) 25%, rgba(3,14,9,0.1) 60%), ' +
              'linear-gradient(180deg, rgba(3,14,9,0.6) 0%, rgba(3,14,9,0) 25%), ' +
              'linear-gradient(90deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.92) 45%, rgba(3,14,9,0.65) 70%, rgba(3,14,9,0.2) 100%)',
          }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/35">
                {path.difficulty}
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-[#FFA439] bg-[#FFA439]/10 border border-[#FFA439]/30">
                {cfg.badgeLabel}
              </span>
            </div>
            <span className="text-xs font-mono text-[#94A3B8] font-medium">
              {path.estimated_weeks} Weeks • {path.total_hours}h • {path.courses_count || 4} Courses
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white mb-3 max-w-2xl leading-snug group-hover:text-[#FF7A00] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed mb-6">
            {path.short_desc}
          </p>

          {/* Sequential Step Progression Roadmap */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#03140c]/70 border border-[#FF7A00]/20 backdrop-blur-md max-w-xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-2 flex items-center justify-between">
              <span>Curriculum Progression</span>
              <span className="text-[#FF7A00]">4 Sequential Modules</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded bg-[#051c12]/80 border border-[#FF7A00]/18 text-[10px] font-mono text-slate-300 truncate text-center hover:border-[#FF7A00]/40 transition-colors"
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
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#062417]/70 text-emerald-100/90 font-mono border border-[#FF7A00]/20 backdrop-blur-sm group-hover:border-[#FF7A00]/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credential & Action Row */}
        <div className="pt-4 border-t border-[#FF7A00]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center flex-none">
              <Shield className="w-5 h-5 text-[#FF7A00]" />
            </div>
            <div className="truncate">
              <div className="text-[9px] text-[#94A3B8] font-mono uppercase tracking-wider">
                Milestone Credential
              </div>
              <div className="text-xs sm:text-sm font-royal font-bold text-[#FF7A00] truncate">
                {path.milestone_cert}
              </div>
            </div>
          </div>

          <Link
            to="/paths"
            className="w-10 h-10 rounded-full border border-[#FF7A00]/35 bg-[#041a10]/80 text-[#FF7A00] group-hover:bg-[#FF7A00] group-hover:text-black group-hover:border-[#FF7A00] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,122,0,0.2)] flex-none group-hover:scale-105"
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
        style={{ transitionDelay: `${index * 150}ms` }}
        className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#FFA439]/25 hover:border-[#FFA439]/60 bg-[#04140e]/65 backdrop-blur-2xl transition-all duration-600 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(255,164,57,0.22)] p-6 sm:p-7 flex flex-col justify-between min-h-[460px] ${
          isIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
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
              'linear-gradient(0deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.85) 35%, rgba(3,14,9,0.2) 65%), ' +
              'linear-gradient(180deg, rgba(3,14,9,0.6) 0%, rgba(3,14,9,0) 25%), ' +
              'linear-gradient(90deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.92) 50%, rgba(3,14,9,0.7) 100%)',
          }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#FFA439] bg-[#FFA439]/10 border border-[#FFA439]/35 truncate">
              {path.difficulty}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              {path.estimated_weeks}W • {path.total_hours}h
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-royal text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug group-hover:text-[#FFA439] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
            {path.short_desc}
          </p>

          {/* Sequential Modules Flow */}
          <div className="mb-4 p-3 rounded-xl bg-[#03140c]/70 border border-[#FF7A00]/20 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-1.5 flex items-center justify-between">
              <span>Investigation Track</span>
              <span className="text-[#FFA439]">3 Labs</span>
            </div>
            <div className="space-y-1.5">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#051c12]/80 border border-[#FF7A00]/18 text-[10px] font-mono text-slate-300 flex items-center justify-between hover:border-[#FFA439]/40 transition-colors"
                >
                  <span className="truncate">{step}</span>
                  <CheckCircle2 className="w-3 h-3 text-[#FFA439] flex-none ml-1.5 opacity-70" />
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
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#062417]/70 text-emerald-100/90 font-mono border border-[#FF7A00]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credential & Action Row */}
        <div className="pt-4 border-t border-[#FF7A00]/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FFA439]/10 border border-[#FFA439]/30 flex items-center justify-center flex-none">
              <Shield className="w-4 h-4 text-[#FFA439]" />
            </div>
            <div className="truncate">
              <div className="text-[9px] text-[#94A3B8] font-mono uppercase">Milestone Credential</div>
              <div className="text-xs font-royal font-bold text-[#FFA439] truncate">
                {path.milestone_cert}
              </div>
            </div>
          </div>

          <Link
            to="/paths"
            className="w-9 h-9 rounded-full border border-[#FFA439]/35 bg-[#041a12]/80 text-[#FFA439] group-hover:bg-[#FFA439] group-hover:text-black group-hover:border-[#FFA439] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,164,57,0.2)] flex-none group-hover:scale-105"
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
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`group relative ${cfg.gridClass} rounded-2xl overflow-hidden isolation-isolate border border-[#FF7A00]/25 hover:border-[#FF7A00]/60 bg-[#04140d]/65 backdrop-blur-2xl transition-all duration-600 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(255,122,0,0.22)] p-6 sm:p-8 ${
        isIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
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
            'linear-gradient(0deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.85) 30%, rgba(3,14,9,0.1) 70%), ' +
            'linear-gradient(180deg, rgba(3,14,9,0.6) 0%, rgba(3,14,9,0) 25%), ' +
            'linear-gradient(90deg, rgba(3,14,9,0.98) 0%, rgba(3,14,9,0.94) 50%, rgba(3,14,9,0.65) 75%, rgba(3,14,9,0.15) 100%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (Main Info & Modules Flow) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/35">
              {path.difficulty}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-[#FFA439] bg-[#FFA439]/10 border border-[#FFA439]/30">
              {cfg.badgeLabel}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              {path.estimated_weeks} Weeks • {path.total_hours}h • {path.courses_count || 4} Core Courses
            </span>
          </div>

          <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-[#FF7A00] transition-colors">
            {path.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
            {path.short_desc}
          </p>

          {/* Sequential Step Progression */}
          <div className="p-3.5 rounded-xl bg-[#03140c]/70 border border-[#FF7A00]/20 backdrop-blur-md max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-2 flex items-center justify-between">
              <span>Architectural Track Blueprint</span>
              <span className="text-[#FF7A00]">Cloud & Infrastructure Hardening</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cfg.trackSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1.5 rounded bg-[#051c12]/80 border border-[#FF7A00]/18 text-[10.5px] font-mono text-slate-300 truncate text-center hover:border-[#FF7A00]/40 transition-colors"
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
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#062417]/70 text-emerald-100/90 font-mono border border-[#FF7A00]/20 backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Milestone Box & CTA) */}
        <div className="lg:col-span-4 lg:border-l lg:border-[#FF7A00]/20 lg:pl-6 space-y-5">
          <div className="p-5 rounded-xl bg-[#03140c]/75 border border-[#FF7A00]/25 backdrop-blur-md space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#FF7A00]" />
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
            className="w-full py-3.5 px-6 rounded-xl glass-button-primary font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_25px_rgba(255,122,0,0.4)] transition-all"
          >
            <span>Explore Architecture Track</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
