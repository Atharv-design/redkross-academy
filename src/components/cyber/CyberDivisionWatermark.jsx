import React from 'react';
import CyberLightningDischarge from './CyberLightningDischarge';

/**
 * CyberDivisionWatermark
 * Persistent, ambient cybersecurity watermark layer centered in the viewport.
 * Harmonized into RedKross Academy Amber Orange & Amber Gold Theme:
 * - Concentric radar rings (Inner, Middle, Outer reticle with 45-degree bearing markers)
 * - Detailed laser crosshair axes and technical HUD telemetry
 * - Faded, ambient 60fps Procedural Amber Cyber Lightning Discharge that travels outward
 *   smoothly and gracefully (2.0s travel, 4.2s cycle) without overshadowing content.
 * - Monochromatic Amber RedKross Cyber Crest Watermark with guaranteed zero blue.
 * - Non-intrusive, WCAG compliant, non-blocking pointer-events-none.
 */
export default function CyberDivisionWatermark() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Center Amber Ambient Glow */}
      <div className="absolute w-[560px] h-[560px] bg-[#FF7A00]/[0.035] rounded-full blur-[140px]" />
      <div className="absolute w-[420px] h-[420px] bg-[#FFA439]/[0.03] rounded-full blur-[120px]" />

      {/* 2. Cyber Hairline Crosshair Axes */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/[0.15] to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#FFA439]/[0.12] to-transparent" />

      {/* 3. Outer Concentric Cyber Reticle Ring (680px diameter, 340px radius) */}
      <div className="absolute w-[680px] h-[680px] rounded-full border border-[#FF7A00]/[0.18] shadow-[0_0_20px_rgba(255,122,0,0.08)] animate-[spin_240s_linear_infinite]">
        {/* Cardinal Axis Markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-[#FF7A00]/70 shadow-[0_0_8px_rgba(255,122,0,0.7)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-[#FF7A00]/70 shadow-[0_0_8px_rgba(255,122,0,0.7)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-[#FF7A00]/70 shadow-[0_0_8px_rgba(255,122,0,0.7)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-[#FF7A00]/70 shadow-[0_0_8px_rgba(255,122,0,0.7)]" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 520px) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-[#FF7A00]/[0.12] border-dashed animate-[spin_180s_linear_infinite_reverse]" />

      {/* 5. Inner Orbit Ring (380px) */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-[#FFA439]/[0.14]" />

      {/* 6. Soft Bottom Arc Laser Tangent Line */}
      <div 
        className="absolute w-[720px] h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/25 to-transparent pointer-events-none"
        style={{ transform: 'translateY(340px)' }}
      />

      {/* 7. AMBIENT FADED AMBER CYBER LIGHTNING (Layered Deep Behind Logo & Cards) */}
      <CyberLightningDischarge theme="amber" />

      {/* 8. Centered RedKross Cyber Crest Watermark (Guaranteed Zero Blue) */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-cyber-watermark.png" 
          alt=""
          className="w-[280px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-auto object-contain opacity-[0.20] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'grayscale(100%) sepia(100%) hue-rotate(350deg) saturate(550%) brightness(0.92) drop-shadow(0 0 45px rgba(255, 122, 0, 0.45)) drop-shadow(0 0 90px rgba(255, 164, 57, 0.25))',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 88%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-2.5 h-2.5 rounded-full border border-[#FF7A00]/70 bg-[#FFA439]/40 pointer-events-none shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
      </div>

      {/* 9. Viewport Corner Reticles */}
      <div className="absolute top-16 left-6 text-[10px] font-mono text-[#FFA439]/[0.35] hidden sm:block tracking-widest">
        [ SYS.SEC.32 ]
      </div>
      <div className="absolute top-16 right-6 text-[10px] font-mono text-[#FFA439]/[0.35] hidden sm:block tracking-widest">
        [ NODE.RKR.01 ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-[#FF7A00]/[0.35] hidden sm:block tracking-widest">
        [ AUTH.CYBER.ACADEMY ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-[#FF7A00]/[0.35] hidden sm:block tracking-widest">
        [ 2026.VERIFIED ]
      </div>
    </div>
  );
}
