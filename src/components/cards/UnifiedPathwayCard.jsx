import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Award, Clock, Layers, ShieldCheck } from 'lucide-react';

/**
 * UnifiedPathwayCard
 * Directly embodies the user's exact curved blend card architecture:
 * - Base Layer: 100% full-bleed cyber artwork (media_1793220354995_803c2702.jpg)
 * - Blending Layer: Soft organic curved black blend on the left (media_1793220344830_e0c7f273.png)
 * - Content Layer: Heading, information, validated skills, telemetry, and clean button (NO arrows)
 */
export default function UnifiedPathwayCard({ path, index = 0 }) {
  if (!path) return null;

  // Resolve authentic cyber artwork matching the specific learning track
  const getPathwayArtwork = () => {
    if (path.id === 'path_soc_analyst' || index === 0) {
      return '/assets/cards/card-10.png'; // 24/7 SOC Telemetry Center with operator
    }
    if (path.id === 'path_threat_hunter' || index === 1) {
      return '/assets/cards/card-04.png'; // Forensics Magnifying Glass & Exploit Code
    }
    if (path.id === 'path_defensive_engineer' || index === 2) {
      return '/assets/cards/card-02.png'; // Cloud Infrastructure & Digital Padlock
    }
    const pad = String((index % 10) + 1).padStart(2, '0');
    return `/assets/cards/card-${pad}.png`;
  };

  // Dedicated telemetry feature label
  const getLabFeatureText = () => {
    if (index === 0) return 'Hands-on SIEM Telemetry & 24/7 Log Triage';
    if (index === 1) return 'Memory Forensics, Volatility & YARA Emulation';
    return 'Multi-Cloud IAM & Kubernetes Hardening Enclaves';
  };

  const pathwayNum = String(index + 1).padStart(2, '0');
  const artworkSrc = getPathwayArtwork();
  const curveId = `card-curve-${index}`;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#263440] bg-[#071018] p-6 sm:p-7 flex flex-col justify-between min-h-[520px] transition-all duration-300 hover:border-[#65F58A]/60 hover:shadow-[0_16px_40px_rgba(0,255,163,0.2)] hover:-translate-y-1 group">
      {/* BASE LAYER: Full Card Cyber Artwork Display */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={artworkSrc}
          alt=""
          className="w-full h-full object-cover object-center sm:object-right opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 select-none"
          loading="lazy"
        />
      </div>

      {/* BLENDING LAYER: Soft Organic Curved Black Blend (User Sketch Reference) */}
      {/* 1. Curved SVG Soft Mask hugging the left corner & sweeping across bottom */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={curveId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071018" stopOpacity="1" />
            <stop offset="42%" stopColor="#071018" stopOpacity="0.96" />
            <stop offset="65%" stopColor="#071018" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#071018" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#071018" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Organic curved path: starts top-left, curves down left edge, sweeps across bottom */}
        <path
          d="M 0,0 L 40,0 C 20,30 26,60 68,100 L 0,100 Z"
          fill={`url(#${curveId})`}
        />
      </svg>

      {/* 2. Soft Radial Glow Feathering for seamless edge blending */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 95% at 0% 50%, #071018 0%, #071018 36%, rgba(7, 16, 24, 0.85) 54%, rgba(7, 16, 24, 0.35) 72%, transparent 100%)',
        }}
      />

      {/* FOREGROUND MAIN LAYER: Information & Content */}
      <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
        {/* Top Badges Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#65F58A]/15 border border-[#65F58A]/40 text-[#65F58A] text-xs font-mono font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEFENSIVE TRACK</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#071018]/90 border border-[#263440] text-[#94A3B8] text-xs font-mono font-medium backdrop-blur-md">
              Pathway {pathwayNum}
            </div>
          </div>

          {/* Heading - Royal Cinzel bold */}
          <h3 className="font-royal font-bold text-xl sm:text-2xl text-white tracking-wide leading-tight group-hover:text-[#65F58A] transition-colors mb-2 drop-shadow-[0_2px_10px_rgba(7,16,24,1)]">
            {path.title}
          </h3>

          {/* Information / Description */}
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3 mb-4 drop-shadow-[0_2px_6px_rgba(7,16,24,1)]">
            {path.short_desc}
          </p>

          {/* Core Competencies Validated */}
          <div className="space-y-1.5 mb-4">
            <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold drop-shadow-[0_1px_3px_rgba(7,16,24,1)]">
              Core Competencies Validated
            </div>
            <div className="flex flex-wrap gap-1.5">
              {path.skills && path.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#071018]/90 border border-[#263440] text-slate-200 backdrop-blur-md shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Metadata Rows */}
        <div className="space-y-2 pt-2">
          {/* Metadata Row 1: Hands-On Telemetry Feature */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#071018]/90 border border-[#263440] text-xs font-mono text-[#F1F5F9] backdrop-blur-md shadow-sm">
            <Terminal className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
            <span className="truncate">{getLabFeatureText()}</span>
          </div>

          {/* Metadata Row 2: Milestone Credential & Duration */}
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#071018]/90 border border-[#263440] text-xs font-mono text-[#F1F5F9] backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2.5 truncate">
              <Award className="w-4 h-4 text-[#35E6B5] flex-shrink-0" />
              <span className="truncate text-slate-200">
                {path.milestone_cert}
              </span>
            </div>
            <span className="text-[11px] text-[#94A3B8] flex-shrink-0">
              {path.estimated_weeks}w • {path.total_hours}h
            </span>
          </div>

          {/* Bottom Action Button - Clean Tactile Pill (NO ARROWS) */}
          <Link
            to="/paths"
            className="w-full mt-3 py-3.5 px-6 rounded-full bg-[#1B2530] hover:bg-[#65F58A] border border-[#263440] hover:border-[#65F58A] text-white hover:text-[#071018] font-royal font-bold text-xs tracking-wider uppercase transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(101,245,138,0.35)] cursor-pointer"
          >
            Explore Pathway Curricula
          </Link>
        </div>
      </div>
    </div>
  );
}
