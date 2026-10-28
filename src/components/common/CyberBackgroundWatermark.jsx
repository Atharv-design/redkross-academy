import React from 'react';
import CyberLightningDischarge from './CyberLightningDischarge';

/**
 * CyberBackgroundWatermark
 * Persistent, ambient cybersecurity watermark layer centered in the viewport for RedKross Academy.
 * Features:
 * - RedKross crest in Neon Green / Amber with pristine legibility
 * - Concentric radar rings (Inner, Middle, Outer reticle)
 * - Faded, ambient 60fps Procedural Cyber Lightning Discharge in Neon Green / Mint
 * - Non-intrusive, WCAG compliant, pointer-events-none.
 */
export default function CyberBackgroundWatermark() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Center Ambient Glows (Neon Green & Amber) */}
      <div className="absolute w-[580px] h-[580px] bg-[#65F58A]/[0.022] rounded-full blur-[140px]" />
      <div className="absolute w-[440px] h-[440px] bg-[#F59E0B]/[0.018] rounded-full blur-[130px]" />

      {/* 2. Cyber Hairline Crosshair Axes */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#65F58A]/[0.08] to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#65F58A]/[0.08] to-transparent" />

      {/* 3. Outer Concentric Cyber Reticle Ring (680px diameter) */}
      <div className="absolute w-[680px] h-[680px] rounded-full border border-[#65F58A]/[0.1] shadow-[0_0_15px_rgba(101,245,138,0.03)] animate-[spin_240s_linear_infinite]">
        {/* Cardinal Axis Markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#65F58A]/40 shadow-[0_0_6px_rgba(101,245,138,0.5)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#65F58A]/40 shadow-[0_0_6px_rgba(101,245,138,0.5)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-[#65F58A]/40 shadow-[0_0_6px_rgba(101,245,138,0.5)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-[#65F58A]/40 shadow-[0_0_6px_rgba(101,245,138,0.5)]" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 520px) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-[#35E6B5]/[0.07] border-dashed" />

      {/* 5. Inner Orbit Ring (380px) */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-[#65F58A]/[0.09]" />

      {/* 6. Soft Laser Tangent Line */}
      <div 
        className="absolute w-[720px] h-[1px] bg-gradient-to-r from-transparent via-[#65F58A]/20 to-transparent pointer-events-none"
        style={{ transform: 'translateY(340px)' }}
      />

      {/* 7. Ambient Neon Cyber Lightning Discharge */}
      <CyberLightningDischarge />

      {/* 8. Centered RedKross Cyber Crest Watermark */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-cyber-watermark.png" 
          alt=""
          className="w-[280px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-auto object-contain opacity-[0.14] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 45px rgba(101, 245, 138, 0.35)) drop-shadow(0 0 90px rgba(245, 158, 11, 0.2))',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-2.5 h-2.5 rounded-full border border-[#65F58A]/60 bg-[#65F58A]/40 pointer-events-none shadow-[0_0_8px_rgba(101,245,138,0.7)]" />
      </div>

      {/* 9. Subtle Viewport Corner Reticles */}
      <div className="absolute top-20 left-6 text-[10px] font-mono text-[#65F58A]/[0.2] hidden sm:block">
        [ ACADEMY.SEC.01 ]
      </div>
      <div className="absolute top-20 right-6 text-[10px] font-mono text-[#65F58A]/[0.2] hidden sm:block">
        [ NODE.REDKROSS.EDU ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-[#F59E0B]/[0.2] hidden sm:block">
        [ LAB.DEFENSE.CORP ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-[#F59E0B]/[0.2] hidden sm:block">
        [ 2026.OCT.IMMUTABLE ]
      </div>
    </div>
  );
}
