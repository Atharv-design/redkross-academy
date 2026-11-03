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
      {/* 1. Subtle Center Ambient Glows (Amber + Black Blending Combo: #FF7A00 + #FFA439) */}
      <div className="absolute w-[680px] h-[680px] bg-[#FF7A00]/[0.06] rounded-full blur-[150px] -translate-x-24" />
      <div className="absolute w-[680px] h-[680px] bg-[#FFA439]/[0.05] rounded-full blur-[140px] translate-x-24" />
      <div className="absolute w-[440px] h-[440px] bg-[#FF7A00]/[0.04] rounded-full blur-[110px]" />

      {/* 2. Cyber Hairline Crosshair Axes (Amber Precision Laser) */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/30 via-50% to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#FFA439]/25 to-transparent" />

      {/* 3. Outer Concentric Cyber Reticle Ring (720px diameter) with Degree Ticks */}
      <div className="absolute w-[720px] h-[720px] rounded-full border border-[#FF7A00]/[0.22] shadow-[0_0_24px_rgba(255,122,0,0.12)] animate-[spin_300s_linear_infinite]">
        {/* Cardinal Markers (0°, 90°, 180°, 270°) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#FF7A00]/80 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#FF7A00]/80 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#FF7A00]/80 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#FF7A00]/80 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
        
        {/* Ordinal Markers (45°, 135°, 225°, 315°) */}
        <div className="absolute top-[14.6%] left-[14.6%] w-2.5 h-[1.5px] bg-[#FFA439]/60 rotate-45" />
        <div className="absolute top-[14.6%] right-[14.6%] w-2.5 h-[1.5px] bg-[#FFA439]/60 -rotate-45" />
        <div className="absolute bottom-[14.6%] left-[14.6%] w-2.5 h-[1.5px] bg-[#FFA439]/60 -rotate-45" />
        <div className="absolute bottom-[14.6%] right-[14.6%] w-2.5 h-[1.5px] bg-[#FFA439]/60 rotate-45" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 540px) */}
      <div className="absolute w-[540px] h-[540px] rounded-full border border-[#FF7A00]/[0.15] border-dashed animate-[spin_180s_linear_infinite_reverse]" />

      {/* 5. Inner Orbit Ring (390px) */}
      <div className="absolute w-[390px] h-[390px] rounded-full border border-[#FFA439]/[0.18]" />

      {/* 6. Soft Laser Tangent Lines */}
      <div 
        className="absolute w-[760px] h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent pointer-events-none"
        style={{ transform: 'translateY(360px)' }}
      />
      <div 
        className="absolute w-[760px] h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent pointer-events-none"
        style={{ transform: 'translateY(-360px)' }}
      />

      {/* 7. Centered RedKross Cyber Crest Watermark (Monochromatic Amber Orange Conversion - Guaranteed Zero Blue) */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-cyber-watermark.png" 
          alt=""
          className="w-[300px] sm:w-[440px] md:w-[520px] lg:w-[600px] h-auto object-contain opacity-[0.22] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'grayscale(100%) sepia(100%) hue-rotate(350deg) saturate(550%) brightness(0.92) drop-shadow(0 0 45px rgba(255, 122, 0, 0.45)) drop-shadow(0 0 90px rgba(255, 164, 57, 0.25))',
            maskImage: 'radial-gradient(circle at center, black 65%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 92%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-3 h-3 rounded-full border border-[#FF7A00]/80 bg-[#FF7A00]/60 pointer-events-none shadow-[0_0_12px_rgba(255,122,0,0.9)]" />
      </div>

      {/* 8. Viewport Telemetry Brackets */}
      <div className="absolute top-20 left-6 text-[10px] font-mono text-[#FF7A00]/[0.45] hidden sm:block tracking-widest">
        [ RK.ACADEMY // SEC.01 ]
      </div>
      <div className="absolute top-20 right-6 text-[10px] font-mono text-[#FF7A00]/[0.45] hidden sm:block tracking-widest">
        [ NODE.REDKROSS.EDU // VERIFIED ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-[#FFA439]/[0.45] hidden sm:block tracking-widest">
        [ FOUNDATION.RESEARCH // ACTIVE ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-[#FFA439]/[0.45] hidden sm:block tracking-widest">
        [ 2026.IMMUTABLE.REGISTRY ]
      </div>
    </div>
  );
}
