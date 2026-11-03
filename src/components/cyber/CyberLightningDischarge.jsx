import React, { useEffect, useRef } from 'react';

/**
 * CyberLightningDischarge
 * Calibrated Ambient Sci-Fi Lightning System.
 * - Ultra-light ("halka"): Opacity capped at a faint ambient level (~0.12 - 0.14 max).
 * - "Middle se nikal": Originates directly from the middle concentric ring (~190px - 220px)
 *   and gracefully shoots outward to the outer circle (340px) and bottom arc.
 * - Slower, cinematic progression with a soft return echo (~4.2s cycle).
 * - Leaves the central RedKross logo completely unhindered and crystal clear.
 */
export default function CyberLightningDischarge() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cinematic Timing Constants
    const CYCLE_DURATION = 4200;      // 4.2 seconds total cycle
    const TRAVEL_OUT_DURATION = 2100; // 2.1 seconds smooth travel from middle to outer ring
    const ECHO_DURATION = 1300;       // 1.3 seconds soft return dissolve

    // Procedural Lightning Bolt Generator (fine, delicate segments)
    function createBolt(startX, startY, targetX, targetY, displacement, iterations) {
      let segments = [{
        start: { x: startX, y: startY },
        end: { x: targetX, y: targetY },
        isBranch: false
      }];

      for (let i = 0; i < iterations; i++) {
        const nextSegments = [];
        for (const seg of segments) {
          const dx = seg.end.x - seg.start.x;
          const dy = seg.end.y - seg.start.y;
          const len = Math.hypot(dx, dy);

          if (len < 5) {
            nextSegments.push(seg);
            continue;
          }

          const midX = (seg.start.x + seg.end.x) / 2;
          const midY = (seg.start.y + seg.end.y) / 2;

          const nx = -dy / len;
          const ny = dx / len;

          const offset = (Math.random() - 0.5) * displacement;
          const displacedMid = {
            x: midX + nx * offset,
            y: midY + ny * offset
          };

          nextSegments.push({
            start: seg.start,
            end: displacedMid,
            isBranch: seg.isBranch
          });
          nextSegments.push({
            start: displacedMid,
            end: seg.end,
            isBranch: seg.isBranch
          });

          // Delicate small branch fork
          if (!seg.isBranch && Math.random() < 0.20 && i >= 1 && i <= 2) {
            const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
            const branchLen = len * (0.28 + Math.random() * 0.28);
            const branchEnd = {
              x: displacedMid.x + Math.cos(branchAngle) * branchLen,
              y: displacedMid.y + Math.sin(branchAngle) * branchLen
            };
            nextSegments.push({
              start: displacedMid,
              end: branchEnd,
              isBranch: true
            });
          }
        }
        segments = nextSegments;
        displacement *= 0.50;
      }

      return segments;
    }

    let activeBolts = [];
    let bottomArcSegments = [];
    let lastCycleTime = performance.now();

    function spawnLightningCycle(centerX, centerY, outerR) {
      const bolts = [];
      // "Middle se nikal": starts from the middle ring (approx 190px to 210px)
      const middleStartRadius = outerR * 0.58;

      // 1. Primary downward bolts shooting from middle ring to the bottom outer arc
      const downwardAngles = [
        Math.PI * 0.40,
        Math.PI * 0.45,
        Math.PI * 0.50, // Straight down towards bottom bar
        Math.PI * 0.55,
        Math.PI * 0.60
      ];

      downwardAngles.forEach((angle) => {
        const jitterAngle = angle + (Math.random() - 0.5) * 0.08;
        const targetR = outerR * (0.98 + Math.random() * 0.05);
        const targetX = centerX + Math.cos(jitterAngle) * targetR;
        const targetY = centerY + Math.sin(jitterAngle) * targetR;

        // Origin at the middle ring
        const startX = centerX + Math.cos(jitterAngle) * middleStartRadius;
        const startY = centerY + Math.sin(jitterAngle) * middleStartRadius;

        const segments = createBolt(startX, startY, targetX, targetY, 32, 4);
        bolts.push({
          segments,
          targetR,
          isDownward: true
        });
      });

      // 2. Radial ambient bolts in all other directions from the middle ring
      const radialAngles = [
        Math.PI * 0.12,
        Math.PI * 0.88,
        Math.PI * 1.15,
        Math.PI * 1.35,
        Math.PI * 1.65,
        Math.PI * 1.88
      ];

      radialAngles.forEach((angle) => {
        const jitterAngle = angle + (Math.random() - 0.5) * 0.12;
        const targetR = outerR * (0.95 + Math.random() * 0.05);
        const targetX = centerX + Math.cos(jitterAngle) * targetR;
        const targetY = centerY + Math.sin(jitterAngle) * targetR;

        const startX = centerX + Math.cos(jitterAngle) * middleStartRadius;
        const startY = centerY + Math.sin(jitterAngle) * middleStartRadius;

        const segments = createBolt(startX, startY, targetX, targetY, 28, 4);
        bolts.push({
          segments,
          targetR,
          isDownward: false
        });
      });

      // 3. Ambient soft arc segments along the bottom outer curve
      const arcPoints = [];
      const startArcAngle = Math.PI * 0.36;
      const endArcAngle = Math.PI * 0.64;
      const steps = 12;
      for (let s = 0; s <= steps; s++) {
        const a = startArcAngle + (s / steps) * (endArcAngle - startArcAngle);
        const rJitter = outerR + (Math.random() - 0.5) * 6;
        arcPoints.push({
          x: centerX + Math.cos(a) * rJitter,
          y: centerY + Math.sin(a) * rJitter
        });
      }
      const arcSegs = [];
      for (let s = 0; s < arcPoints.length - 1; s++) {
        arcSegs.push({
          start: arcPoints[s],
          end: arcPoints[s + 1]
        });
      }

      return { bolts, arcSegs };
    }

    // Initial setup
    const initialCenterX = width / 2;
    const initialCenterY = height / 2;
    const initialScale = Math.min(1, Math.max(0.65, (width - 40) / 680));
    const initialOuterR = 340 * initialScale;
    const initialData = spawnLightningCycle(initialCenterX, initialCenterY, initialOuterR);
    activeBolts = initialData.bolts;
    bottomArcSegments = initialData.arcSegs;

    // Render Loop
    const render = (time) => {
      animId = requestAnimationFrame(render);

      const elapsed = time - lastCycleTime;

      // Cycle restart at 4.2 seconds
      if (elapsed >= CYCLE_DURATION) {
        lastCycleTime = time;
        const cx = width / 2;
        const cy = height / 2;
        const currentScale = Math.min(1, Math.max(0.65, (width - 40) / 680));
        const currentOuterR = 340 * currentScale;
        const nextData = spawnLightningCycle(cx, cy, currentOuterR);
        activeBolts = nextData.bolts;
        bottomArcSegments = nextData.arcSegs;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentScale = Math.min(1, Math.max(0.65, (width - 40) / 680));
      const outerR = 340 * currentScale;
      const middleStartR = outerR * 0.58;

      const cycleElapsed = time - lastCycleTime;

      let travelProgress = 0;
      let baseAlpha = 0;

      // Capped at ultra-faint ambient level ("halka kr": max ~0.13)
      const MAX_ALPHA = 0.13;

      if (cycleElapsed <= TRAVEL_OUT_DURATION) {
        const tNorm = cycleElapsed / TRAVEL_OUT_DURATION;
        // Smooth sine ease-in-out
        travelProgress = 0.5 - 0.5 * Math.cos(Math.PI * tNorm);
        baseAlpha = Math.min(MAX_ALPHA, tNorm * MAX_ALPHA * 1.2);
      } else if (cycleElapsed <= TRAVEL_OUT_DURATION + ECHO_DURATION) {
        const echoNorm = (cycleElapsed - TRAVEL_OUT_DURATION) / ECHO_DURATION;
        travelProgress = 1.0 - (echoNorm * 0.2);
        baseAlpha = MAX_ALPHA * (1.0 - echoNorm);
      } else {
        baseAlpha = 0;
      }

      if (baseAlpha <= 0.003) {
        ctx.restore();
        return;
      }

      // Very soft, gentle sine shimmer
      const shimmer = 0.92 + Math.sin(time * 0.006) * 0.08;
      const finalAlpha = baseAlpha * shimmer;

      const currentWaveRadius = middleStartR + (outerR - middleStartR) * travelProgress;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // PASS 1: Ultra-Light Cyan Ambient Glow Filament
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = finalAlpha * 0.7;

      for (const bolt of activeBolts) {
        ctx.beginPath();
        for (const seg of bolt.segments) {
          const segDist = Math.hypot(seg.end.x - cx, seg.end.y - cy);
          if (segDist <= currentWaveRadius + 8) {
            ctx.moveTo(seg.start.x, seg.start.y);
            ctx.lineTo(seg.end.x, seg.end.y);
          }
        }
        ctx.stroke();
      }

      // PASS 2: Delicate Faint Hairline Core
      ctx.shadowColor = '#5CF7FF';
      ctx.shadowBlur = 3;
      ctx.strokeStyle = '#B3F5FF';
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = finalAlpha * 0.9;

      for (const bolt of activeBolts) {
        ctx.beginPath();
        for (const seg of bolt.segments) {
          const segDist = Math.hypot(seg.end.x - cx, seg.end.y - cy);
          if (segDist <= currentWaveRadius + 8) {
            ctx.moveTo(seg.start.x, seg.start.y);
            ctx.lineTo(seg.end.x, seg.end.y);
          }
        }
        ctx.stroke();
      }

      // PASS 3: Soft Bottom Outer Arc Pulse (Only when wave reaches outer boundary)
      if (travelProgress > 0.8) {
        const arcProgress = (travelProgress - 0.8) / 0.2;
        const arcAlpha = finalAlpha * arcProgress * 0.6;

        ctx.save();
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 1.0;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00F0FF';
        ctx.globalAlpha = arcAlpha;
        ctx.beginPath();
        for (const seg of bottomArcSegments) {
          ctx.moveTo(seg.start.x, seg.start.y);
          ctx.lineTo(seg.end.x, seg.end.y);
        }
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
