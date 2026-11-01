import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

/**
 * CyberCloudsBackground (Vanta.js CLOUDS in RedKross Cyber Theme)
 * 
 * Exact Color Tuning:
 * - Deep Obsidian Atmosphere (Nocturnal Cyber Sky: 0x05130d)
 * - Luminous Emerald Vapors (Cloud Color: 0x1b543b)
 * - Deep Obsidian Shadows (Cloud Shadow: 0x04120b)
 * - Brand Neon Glow Sun (Horizon Focus: 0x65f58a)
 * - Brand Mint Sun Glare (0x35e6b5)
 * - Directional Ambient Light (0x45f39e)
 * - Zero blue, strictly matched to RedKross Academy brand design.
 */
export default function CyberCloudsBackground() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      try {
        // Ensure THREE is globally available for Vanta internal shaders
        if (typeof window !== 'undefined') {
          window.THREE = THREE;
        }

        const effect = (CLOUDS.default || CLOUDS)({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          // RedKross Cyber Emerald & Obsidian Color Palette
          backgroundColor: 0x071018,
          skyColor: 0x061810,          // Deep obsidian jade sky
          cloudColor: 0x1b543b,        // Luminous emerald volumetric clouds
          cloudShadowColor: 0x04120b,  // Dark obsidian cloud shadow
          sunColor: 0x65f58a,          // Brand Neon Green (#65F58A) horizon core
          sunGlareColor: 0x35e6b5,     // Brand Mint (#35E6B5) radial flare
          sunlightColor: 0x45f39e,     // Ambient laser sunlight
          speed: 0.85                  // Smooth, cinematic atmospheric drift
        });

        setVantaEffect(effect);
      } catch (err) {
        console.warn('Vanta.js initialization warning:', err.message);
      }
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (e) {
          console.warn('Vanta cleanup error:', e);
        }
      }
    };
  }, [vantaEffect]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Underlying 3D Vanta Clouds Canvas */}
      <div 
        ref={vantaRef} 
        className="w-full h-full opacity-75 transition-opacity duration-1000"
      />

      {/* 2. Optical Contrast Vignette: Keeps Text 100% WCAG Readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071018]/50 via-transparent to-[#071018]/80 pointer-events-none" />

      {/* 3. Subtle Cybernetic Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #65F58A 0px, #65F58A 1px, transparent 1px, transparent 4px)',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  );
}
