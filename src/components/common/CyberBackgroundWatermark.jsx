import React from 'react';

/**
 * CyberBackgroundWatermark
 * Persistent, high-craft cybersecurity watermark layer centered in the viewport for RedKross Academy.
 * Features:
 * - RedKross crest in Neon Green / Amber with enhanced visibility and pristine legibility (WCAG Compliant)
 * - Concentric radar rings (Inner, Middle, Outer reticle with 45-degree bearing markers)
 * - Detailed laser crosshair axes and technical HUD telemetry
 * - Non-intrusive, pointer-events-none, strictly zero blue.
 */
export default function CyberBackgroundWatermark() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Center Ambient Glows (Strict Neon Green, Glow & Mint) */}
      <div className="absolute w-[680px] h-[680px] bg-[#65F58A]/[0.055] rounded-full blur-[140px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#00FFA3]/[0.04] rounded-full blur-[130px]" />
      <div className="absolute w-[380px] h-[380px] bg-[#35E6B5]/[0.035] rounded-full blur-[110px]" />

      {/* 2. Cyber Hairline Crosshair Axes */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#65F58A]/20 to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#65F58A]/20 to-transparent" />

      {/* 3. Outer Concentric Cyber Reticle Ring (720px diameter) with Degree Ticks */}
      <div className="absolute w-[720px] h-[720px] rounded-full border border-[#65F58A]/[0.18] shadow-[0_0_20px_rgba(101,245,138,0.06)] animate-[spin_300s_linear_infinite]">
        {/* Cardinal Markers (0°, 90°, 180°, 270°) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#65F58A]/60 shadow-[0_0_8px_rgba(101,245,138,0.6)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#65F58A]/60 shadow-[0_0_8px_rgba(101,245,138,0.6)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#65F58A]/60 shadow-[0_0_8px_rgba(101,245,138,0.6)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#65F58A]/60 shadow-[0_0_8px_rgba(101,245,138,0.6)]" />
        
        {/* Ordinal Markers (45°, 135°, 225°, 315°) */}
        <div className="absolute top-[14.6%] left-[14.6%] w-2.5 h-[1.5px] bg-[#35E6B5]/40 rotate-45" />
        <div className="absolute top-[14.6%] right-[14.6%] w-2.5 h-[1.5px] bg-[#35E6B5]/40 -rotate-45" />
        <div className="absolute bottom-[14.6%] left-[14.6%] w-2.5 h-[1.5px] bg-[#35E6B5]/40 -rotate-45" />
        <div className="absolute bottom-[14.6%] right-[14.6%] w-2.5 h-[1.5px] bg-[#35E6B5]/40 rotate-45" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 540px) */}
      <div className="absolute w-[540px] h-[540px] rounded-full border border-[#35E6B5]/[0.12] border-dashed animate-[spin_180s_linear_infinite_reverse]" />

      {/* 5. Inner Orbit Ring (390px) */}
      <div className="absolute w-[390px] h-[390px] rounded-full border border-[#65F58A]/[0.15]" />

      {/* 6. Soft Laser Tangent Lines */}
      <div 
        className="absolute w-[760px] h-[1px] bg-gradient-to-r from-transparent via-[#65F58A]/25 to-transparent pointer-events-none"
        style={{ transform: 'translateY(360px)' }}
      />
      <div 
        className="absolute w-[760px] h-[1px] bg-gradient-to-r from-transparent via-[#65F58A]/25 to-transparent pointer-events-none"
        style={{ transform: 'translateY(-360px)' }}
      />

      {/* 7. Centered RedKross Cyber Crest Watermark with Enhanced Detailing */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-cyber-watermark.png" 
          alt=""
          className="w-[300px] sm:w-[440px] md:w-[520px] lg:w-[600px] h-auto object-contain opacity-[0.23] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 60px rgba(101, 245, 138, 0.5)) drop-shadow(0 0 110px rgba(0, 255, 163, 0.3))',
            maskImage: 'radial-gradient(circle at center, black 65%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 92%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-3 h-3 rounded-full border border-[#65F58A]/70 bg-[#65F58A]/50 pointer-events-none shadow-[0_0_10px_rgba(101,245,138,0.8)]" />
      </div>

      {/* 8. Viewport Telemetry Brackets */}
      <div className="absolute top-20 left-6 text-[10px] font-mono text-[#65F58A]/[0.28] hidden sm:block tracking-widest">
        [ RK.CYBER.ACADEMY // SEC.01 ]
      </div>
      <div className="absolute top-20 right-6 text-[10px] font-mono text-[#65F58A]/[0.28] hidden sm:block tracking-widest">
        [ NODE.REDKROSS.EDU // VERIFIED ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-[#F59E0B]/[0.28] hidden sm:block tracking-widest">
        [ LAB.DEFENSE.CORP // ACTIVE ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-[#F59E0B]/[0.28] hidden sm:block tracking-widest">
        [ 2026.IMMUTABLE.REGISTRY ]
      </div>
    </div>
  );
}
