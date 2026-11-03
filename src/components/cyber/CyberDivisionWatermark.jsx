import React from 'react';
import CyberLightningDischarge from './CyberLightningDischarge';

/**
 * CyberDivisionWatermark
 * Exact replica of the Cybersecurity Flagship Watermark layer:
 * - RedKross crest in electric cyan/cobalt with pristine legibility
 * - Concentric radar rings (Inner, Middle, Outer reticle)
 * - Faded, ambient 60fps Procedural Cyber Lightning Discharge that travels outward
 *   smoothly and gracefully (2.0s travel, 4.2s cycle) without overshadowing content.
 * - Non-intrusive, WCAG compliant, non-blocking pointer-events-none.
 */
export default function CyberDivisionWatermark() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Center Ambient Glow */}
      <div className="absolute w-[560px] h-[560px] bg-[#00F0FF]/[0.025] rounded-full blur-[140px]" />
      <div className="absolute w-[420px] h-[420px] bg-[#2563EB]/[0.03] rounded-full blur-[120px]" />

      {/* 2. Cyber Hairline Crosshair Axes */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/[0.06] to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/[0.06] to-transparent" />

      {/* 3. Outer Concentric Cyber Reticle Ring (680px diameter, 340px radius) */}
      <div className="absolute w-[680px] h-[680px] rounded-full border border-cyan-500/[0.1] shadow-[0_0_15px_rgba(0,240,255,0.04)] animate-[spin_240s_linear_infinite]">
        {/* Cardinal Axis Markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400/40 shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400/40 shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-cyan-400/40 shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[2px] bg-cyan-400/40 shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
      </div>

      {/* 4. Middle Concentric Ring (Faint Dashed Guide - 520px) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-cyan-500/[0.07] border-dashed" />

      {/* 5. Inner Orbit Ring (380px) */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-cyan-500/[0.09]" />

      {/* 6. Soft Bottom Arc Laser Tangent Line */}
      <div 
        className="absolute w-[720px] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent pointer-events-none"
        style={{ transform: 'translateY(340px)' }}
      />

      {/* 7. AMBIENT FADED BLUE CYBER LIGHTNING (Layered Deep Behind Logo & Cards) */}
      <CyberLightningDischarge />

      {/* 8. Centered RedKross Cyber Crest Watermark */}
      <div className="relative z-10 flex items-center justify-center">
        <img 
          src="/assets/logo-cyber-watermark.png" 
          alt=""
          className="w-[280px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-auto object-contain opacity-[0.16] transition-opacity duration-1000 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.4)) drop-shadow(0 0 80px rgba(37, 99, 235, 0.25))',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)'
          }}
        />
        
        {/* Faint Center Optical Reticle */}
        <div className="absolute w-2 h-2 rounded-full border border-cyan-400/50 bg-cyan-400/30 pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
      </div>

      {/* 9. Subtle Viewport Corner Reticles */}
      <div className="absolute top-16 left-6 text-[10px] font-mono text-cyan-500/[0.15] hidden sm:block">
        [ SYS.SEC.32 ]
      </div>
      <div className="absolute top-16 right-6 text-[10px] font-mono text-cyan-500/[0.15] hidden sm:block">
        [ NODE.RKR.01 ]
      </div>
      <div className="absolute bottom-12 left-6 text-[10px] font-mono text-cyan-500/[0.15] hidden sm:block">
        [ AUTH.SYNTH.LAB ]
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] font-mono text-cyan-500/[0.15] hidden sm:block">
        [ 26.OCT.2026 ]
      </div>
    </div>
  );
}
