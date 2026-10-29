import React, { useRef, useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck, CheckCircle2, Lock, ArrowUpRight, Cpu } from 'lucide-react';

/**
 * AcademicSafeguardCard
 * Applies the Academic Card Kit 3D design treatment to the PRD Academic Safeguards section:
 * - Edge-to-edge subtle 3D cyberpunk artwork layer with multi-gradient readability mask
 * - Glowing neon/mint badges and protocol stamps
 * - Telemetry progression steps for each integrity safeguard
 * - Interactive hover lift, neon border glow, and corner accents
 * - Strict Zero-Blue Graphite + Neon Green / Mint EdTech palette
 */
export default function AcademicSafeguardCard({ safeguard, index = 0 }) {
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

  const configs = [
    {
      art: '/assets/course-art/art-01.jpg',
      artPos: '88% 25%',
      accent: '#65F58A',
      accentBg: 'rgba(101, 245, 138, 0.12)',
      accentBorder: 'rgba(101, 245, 138, 0.45)',
      protocol: 'PROCTOR PROTOCOL §01',
      badge: 'ACTIVE PROCTORING',
      icon: Zap,
      steps: [
        'Strike 1: Real-time UI Warning Banner',
        'Strike 2: -50 Token Penalty Deducted',
        'Strike 3: Immediate Exam Abort'
      ],
      footerTag: 'CLIENT TELEMETRY ENGINE',
      status: 'REAL-TIME TRACKING'
    },
    {
      art: '/assets/course-art/art-06.jpg',
      artPos: '92% 20%',
      accent: '#35E6B5',
      accentBg: 'rgba(53, 230, 181, 0.12)',
      accentBorder: 'rgba(53, 230, 181, 0.45)',
      protocol: 'COOLDOWN RULE §02',
      badge: 'SERVER-SIDE COOLDOWN',
      icon: Clock,
      steps: [
        'Attempt 1 & 2: Standard Remediation',
        'Attempt 3: Server Lock Triggered',
        '24-Hour Mandatory Review Window'
      ],
      footerTag: 'SERVER REST API GUARD',
      status: 'AUTO-ENFORCED'
    },
    {
      art: '/assets/course-art/art-02.jpg',
      artPos: '88% 28%',
      accent: '#00FFA3',
      accentBg: 'rgba(0, 255, 163, 0.12)',
      accentBorder: 'rgba(0, 255, 163, 0.45)',
      protocol: 'CRYPTOGRAPHIC SEAL §03',
      badge: 'IMMUTABLE SHA-256',
      icon: ShieldCheck,
      steps: [
        'Digest: SHA-256 Hex Digital Signature',
        'Validation: Public Verification URL',
        'Tamper-Proof: Scannable QR Proof'
      ],
      footerTag: 'ZERO-TRUST AUDIT TRAIL',
      status: 'PUBLIC VERIFIABLE'
    }
  ];

  const config = configs[index % configs.length];
  const IconComponent = safeguard.icon || config.icon;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden group flex flex-col justify-between p-6 sm:p-7 min-h-[470px] ${
        isIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{
        backgroundColor: '#0A121A',
        borderColor: '#263440',
        transitionDelay: `${index * 120}ms`
      }}
    >
      {/* 3D Cyberpunk Artwork Layer - High Vividness & Detail */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat transition-all duration-700 ease-out group-hover:scale-108 pointer-events-none"
        style={{
          backgroundImage: `url(${config.art})`,
          backgroundPosition: config.artPos,
          opacity: 0.92,
          filter: 'contrast(1.15) saturate(1.12) brightness(0.96)'
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Multi-layer Gradient Mask (Protects text on left, preserves bright 3D art on right) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(7, 16, 24, 0.98) 0%, rgba(7, 16, 24, 0.88) 35%, rgba(7, 16, 24, 0.48) 62%, rgba(7, 16, 24, 0.06) 100%),
            linear-gradient(0deg, rgba(7, 16, 24, 0.98) 0%, rgba(7, 16, 24, 0.75) 24%, rgba(7, 16, 24, 0) 50%),
            linear-gradient(180deg, rgba(7, 16, 24, 0.70) 0%, rgba(7, 16, 24, 0) 22%)
          `
        }}
        aria-hidden="true"
      />

      {/* Hover Edge Glow Highlight */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${config.accent}, inset 0 0 28px rgba(0, 255, 163, 0.20)`
        }}
        aria-hidden="true"
      />

      {/* Top Header Row: Protocol Stamp & Glowing Badge */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-4 border-b border-[#263440]/80">
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: config.accent }}
          />
          <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-semibold">
            {config.protocol}
          </span>
        </div>

        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
          style={{
            color: config.accent,
            backgroundColor: config.accentBg,
            borderColor: config.accentBorder
          }}
        >
          {config.badge}
        </span>
      </div>

      {/* Middle Content: Icon, Title & Narrative */}
      <div className="relative z-10 space-y-4 my-auto pt-5">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: config.accentBg,
            borderColor: config.accentBorder,
            color: config.accent
          }}
        >
          <IconComponent className="w-6 h-6 stroke-[2.2]" />
        </div>

        <div>
          <h3 className="font-royal text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#65F58A] transition-colors">
            {safeguard.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed mt-2.5">
            {safeguard.description}
          </p>
        </div>

        {/* Telemetry Progression Steps (Cyber Kit Micro-details) */}
        <div className="pt-2 space-y-2">
          <div className="text-[9px] font-mono uppercase tracking-widest text-[#64748B]">
            Automated Rule Matrix
          </div>
          <div className="space-y-1.5">
            {config.steps.map((step, sIdx) => (
              <div 
                key={sIdx}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#071018]/70 border border-[#263440]/80 text-[11px] font-mono text-slate-300 group-hover:border-[#65F58A]/30 transition-colors"
              >
                <CheckCircle2 
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: config.accent }}
                />
                <span className="truncate">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer: Enforcement Engine & Active Indicator */}
      <div className="relative z-10 pt-4 mt-4 border-t border-[#263440]/80 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
        <div className="flex items-center gap-1.5 truncate">
          <Cpu className="w-3.5 h-3.5 text-[#35E6B5]" />
          <span className="truncate">{config.footerTag}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: config.accent }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.accent }} />
          <span>{config.status}</span>
        </div>
      </div>
    </div>
  );
}
