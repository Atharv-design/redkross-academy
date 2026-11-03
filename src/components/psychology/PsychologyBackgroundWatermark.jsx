import React from 'react';

/**
 * PsychologyBackgroundWatermark
 * Persistent, ambient psychology watermark layer centered in the viewport.
 * Features:
 * - RedKross crest in serene turquoise / deep ocean teal (#2dd4bf / #0d9488) matching the psychology theme
 * - Zero red/gold tint — 100% harmonized with the calming psychology brand aesthetic
 * - Concentric Zen meditation ripple rings (Inner, Middle, Outer reticles)
 * - Calming ambient background glow blooms in midnight ocean teal (#08121E)
 * - Non-intrusive, WCAG compliant, non-blocking pointer-events-none.
 */
export default function PsychologyBackgroundWatermark() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Center Ambient Glow Blooms */}
      <div className="absolute w-[580px] h-[580px] bg-[#2dd4bf]/[0.035] rounded-full blur-[140px]" />
      <div className="absolute w-[440px] h-[440px] bg-[#0d9488]/[0.04] rounded-full blur-[120px]" />

      {/* 2. Zen Hairline Crosshair Axes */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/[0.08] to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-teal-400/[0.08] to-transparent" />

      {/* 3. Outer Concentric Zen Ripple Ring (680px diameter) */}
      <div className="absolute w-[680px] h-[680px] rounded-full border border-teal-400/[0.12] shadow-[0_0_20px_rgba(45,212,191,0.05)] animate-[spin_320s_linear_infinite]">
        {/* Cardinal Axis Markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-teal-400/50 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-teal-400/50 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-teal-400/50 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-teal-400/50 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 520px) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-teal-400/[0.08] border-dashed" />

      {/* 5. Inner Orbit Ring (380px) */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-teal-400/[0.10]" />

      {/* 6. Soft Bottom Arc Laser Tangent Line */}
      <div 
        className="absolute w-[720px] h-[1px] bg-gradient-to-r from-transparent via-teal-400/20 to-transparent pointer-events-none"
        style={{ transform: 'translateY(340px)' }}
      />

      {/* 7. Centered RedKross Psychology Crest Watermark (Strictly in Turquoise/Teal Theme) */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-psychology-watermark.png" 
          alt=""
          className="w-[280px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-auto object-contain opacity-[0.22] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 45px rgba(45, 212, 191, 0.45)) drop-shadow(0 0 90px rgba(13, 148, 136, 0.3))',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-2 h-2 rounded-full border border-teal-300/60 bg-teal-300/40 pointer-events-none shadow-[0_0_8px_rgba(45,212,191,0.7)]" />
      </div>

      {/* 8. Subtle Viewport Corner Badges */}
      <div className="absolute top-16 left-6 text-[10px] font-mono text-teal-500/[0.2] hidden sm:block">
        [ PSY.MINDFUL.01 ]
      </div>
      <div className="absolute top-16 right-6 text-[10px] font-mono text-teal-500/[0.2] hidden sm:block">
        [ NODE.REDKROSS.WELLBEING ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-teal-500/[0.2] hidden sm:block">
        [ ETHICAL.CARE.FOUNDATION ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-teal-500/[0.2] hidden sm:block">
        [ 2026.OCT.SPEC ]
      </div>
    </div>
  );
}
