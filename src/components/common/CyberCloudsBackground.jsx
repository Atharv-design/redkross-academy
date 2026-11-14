import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import { shouldAnimateBackground } from '../../utils/motion';

/**
 * CyberCloudsBackground
 * 3D Vanta.js Volumetric Clouds in Amber + Black Blending Combo:
 * - 🟠 Amber / Burnt Orange (#FF7A00 / #FFA439 / #FF8C00): Eagle, Technology & Research
 * - ⚫ Deep Nocturnal Black (#000000 / #040406): Void, Depth & Contrast
 * - Seamlessly blended volumetric amber vapors drifting over pure black canvas (0% green, 0% red)
 */
export default function CyberCloudsBackground() {
  const vantaRef = useRef(null);

  // One effect per mount, destroyed on unmount. (Tracking it in state leaked a
  // second WebGL renderer whenever the effect ran twice, e.g. React StrictMode.)
  useEffect(() => {
    if (!vantaRef.current || !shouldAnimateBackground()) return undefined;
    let effect = null;
    {
      try {
        if (typeof window !== 'undefined') {
          window.THREE = THREE;
        }

        effect = (CLOUDS.default || CLOUDS)({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          backgroundColor: 0x000000,
          skyColor: 0x040406,          // Deep nocturnal pitch black sky
          cloudColor: 0x2e1503,        // Rich Amber / Burnt Orange volumetric cloud vapors
          cloudShadowColor: 0x020202,  // Ultra-deep carbon shadow
          sunColor: 0xff7a00,          // Vibrant Amber sun core (#FF7A00)
          sunGlareColor: 0xffa439,     // Radiant Amber-Gold flare (#FFA439 - zero red)
          sunlightColor: 0xff8c00,     // Pure Amber sunlight (#FF8C00)
          speed: 0.85                  // Atmospheric drift
        });

      } catch (err) {
        console.warn('Vanta.js initialization warning:', err.message);
      }
    }

    return () => {
      try {
        effect?.destroy();
      } catch (e) {
        console.warn('Vanta cleanup error:', e);
      }
    };
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Underlying 3D Vanta Clouds Canvas */}
      <div 
        ref={vantaRef} 
        className="w-full h-full opacity-85 transition-opacity duration-1000"
      />

      {/* 2. Soft Optical Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-transparent to-[#000000]/85 pointer-events-none" />

      {/* 3. Subtle Brand Amber Holographic Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #FF7A00 0px, #FF7A00 1px, transparent 1px, transparent 4px)',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  );
}
