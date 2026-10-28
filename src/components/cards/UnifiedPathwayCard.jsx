import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Award, Clock, Layers, ShieldCheck } from 'lucide-react';

/**
 * UnifiedPathwayCard
 * Directly embodies the flagship Psychology reference card architecture adapted to Defensive Cybersecurity:
 * - Layer 1: Background artwork on the right (isolated cyber visual motif)
 * - Layer 2: Directional dark gradient overlay smoothly blending the art into the card
 * - Layer 3: Foreground content rendered directly over the background
 * - Top Row: Dual categorized pill badges (Category + Pathway Index)
 * - Title: Royal Cinzel bold heading
 * - Description: Clear, readable educational overview
 * - Tags: Monospace skill validation pill tags
 * - Metadata Rows: 2 structured pill rows with dedicated icons
 * - Bottom Action: Full-width tactile glass pill button with circular neon arrow icon
 */
export default function UnifiedPathwayCard({ path, index = 0 }) {
  if (!path) return null;

  // Resolve authentic cyber artwork matching the specific learning track
  const getPathwayArtwork = () => {
    if (path.id === 'path_soc_analyst' || index === 0) {
      return '/assets/cards/card-10-clean.png'; // 24/7 SOC Telemetry Center
    }
    if (path.id === 'path_threat_hunter' || index === 1) {
      return '/assets/cards/card-04-clean.png'; // Forensics Magnifying Glass & Exploit Code
    }
    if (path.id === 'path_defensive_engineer' || index === 2) {
      return '/assets/cards/card-02-clean.png'; // Cloud Infrastructure & Digital Padlock
    }
    const pad = String((index % 10) + 1).padStart(2, '0');
    return `/assets/cards/card-${pad}-clean.png`;
  };

  // Dedicated telemetry feature label
  const getLabFeatureText = () => {
    if (index === 0) return 'Hands-on SIEM Telemetry & 24/7 Log Triage';
    if (index === 1) return 'Memory Forensics, Volatility & YARA Emulation';
    return 'Multi-Cloud IAM & Kubernetes Hardening Enclaves';
  };

  const pathwayNum = String(index + 1).padStart(2, '0');
  const artworkSrc = getPathwayArtwork();

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#263440] bg-[#101923] p-6 sm:p-7 flex flex-col justify-between min-h-[510px] transition-all duration-300 hover:border-[#65F58A]/50 hover:shadow-[0_16px_40px_rgba(0,255,163,0.14)] hover:-translate-y-1 group">
      {/* LAYER 1: Integrated Background Cyber Artwork (Right-Positioned) */}
      <div className="absolute inset-y-0 right-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden z-0">
        <img
          src={artworkSrc}
          alt=""
          className="w-full h-full object-cover object-right opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500 select-none"
          loading="lazy"
        />
      </div>

      {/* LAYER 2: Directional Dark Readability Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101923] via-[#101923]/92 via-55% to-transparent z-10 pointer-events-none" />

      {/* LAYER 3: Foreground Stacking Content */}
      <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
        {/* Top Badges Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEFENSIVE TRACK</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#1B2530] border border-[#263440] text-[#94A3B8] text-xs font-mono font-medium">
              Pathway {pathwayNum}
            </div>
          </div>

          {/* Track Title with Cinzel font */}
          <h3 className="font-royal font-bold text-xl sm:text-2xl text-white tracking-wide leading-tight group-hover:text-[#65F58A] transition-colors mb-2">
            {path.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
            {path.short_desc}
          </p>

          {/* Skill Validation Badges */}
          <div className="space-y-1.5 mb-4">
            <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
              Core Competencies Validated
            </div>
            <div className="flex flex-wrap gap-1.5">
              {path.skills && path.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1B2530]/90 border border-[#263440] text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Metadata Rows (Psychology Reference Style) */}
        <div className="space-y-2 pt-2">
          {/* Metadata Row 1: Hands-On Telemetry Feature */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0B121B]/80 border border-[#263440] text-xs font-mono text-[#F1F5F9]">
            <Terminal className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
            <span className="truncate">{getLabFeatureText()}</span>
          </div>

          {/* Metadata Row 2: Milestone Credential & Duration */}
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B121B]/80 border border-[#263440] text-xs font-mono text-[#F1F5F9]">
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

          {/* Bottom Action CTA Pill Button */}
          <Link
            to="/paths"
            className="w-full mt-3 py-3 px-5 rounded-full bg-[#1B2530] hover:bg-[#65F58A] border border-[#263440] hover:border-[#65F58A] text-white hover:text-[#071018] font-royal font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-between group/btn shadow-md cursor-pointer"
          >
            <span>Explore Pathway Curricula</span>
            <div className="w-7 h-7 rounded-full bg-[#65F58A]/10 group-hover/btn:bg-[#071018] border border-[#65F58A]/40 text-[#65F58A] flex items-center justify-center transition-all group-hover/btn:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
