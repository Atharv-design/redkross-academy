import React, { useEffect, useRef } from 'react';

/**
 * CyberLightningDischarge
 * Calibrated Ambient Sci-Fi Lightning System for RedKross Academy.
 * - Faint ambient opacity (~0.12 - 0.15 max).
 * - Originates smoothly from middle concentric ring (~190px - 220px)
 *   and travels gracefully outward in Neon Green (#65F58A) and Mint (#35E6B5).
 * - Non-intrusive, WCAG compliant, pointer-events-none.
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

    const CYCLE_DURATION = 4200;      // 4.2 seconds total cycle
    const TRAVEL_OUT_DURATION = 2100; // 2.1s outward travel
    const ECHO_DURATION = 1300;       // 1.3s soft return

    function createBolt(startX, startY, targetX, targetY, displacement, iterations) {
      let segments = [{
        start: { x: startX, y: startY },
        end: { x: targetX, y: targetY },
        isBranch: false
      }];

      for (let i = 0; i < iterations; i++) {
        const nextSegments = [];
        const currentDisp = displacement / Math.pow(1.85, i);

        for (let j = 0; j < segments.length; j++) {
          const seg = segments[j];
          const midX = (seg.start.x + seg.end.x) / 2;
          const midY = (seg.start.y + seg.end.y) / 2;

          const dx = seg.end.x - seg.start.x;
          const dy = seg.end.y - seg.start.y;
          const length = Math.sqrt(dx * dx + dy * dy);

          const normalX = -dy / (length || 1);
          const normalY = dx / (length || 1);
          const offset = (Math.random() - 0.5) * 2 * currentDisp;

          const pointMid = {
            x: midX + normalX * offset,
            y: midY + normalY * offset
          };

          nextSegments.push({ start: seg.start, end: pointMid, isBranch: seg.isBranch });
          nextSegments.push({ start: pointMid, end: seg.end, isBranch: seg.isBranch });

          if (!seg.isBranch && i >= 1 && Math.random() < 0.28) {
            const branchLen = length * 0.45;
            const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.1;
            const branchEnd = {
              x: pointMid.x + Math.cos(branchAngle) * branchLen,
              y: pointMid.y + Math.sin(branchAngle) * branchLen
            };
            nextSegments.push({ start: pointMid, end: branchEnd, isBranch: true });
          }
        }
        segments = nextSegments;
      }
      return segments;
    }

    let activeBolts = [];
    let cycleStartTime = performance.now();

    function spawnDischargeCycle(centerX, centerY) {
      const bolts = [];
      const numBolts = Math.floor(Math.random() * 2) + 3; // 3-4 bolts

      for (let b = 0; b < numBolts; b++) {
        const startAngle = Math.random() * Math.PI * 2;
        const startRadius = 180 + Math.random() * 35; // from middle ring
        const startX = centerX + Math.cos(startAngle) * startRadius;
        const startY = centerY + Math.sin(startAngle) * startRadius;

        const endAngle = startAngle + (Math.random() - 0.5) * 0.7;
        const endRadius = 320 + Math.random() * 45; // to outer ring
        const endX = centerX + Math.cos(endAngle) * endRadius;
        const endY = centerY + Math.sin(endAngle) * endRadius;

        const segments = createBolt(startX, startY, endX, endY, 40, 4);
        bolts.push({ segments, startX, startY, endX, endY });
      }
      return bolts;
    }

    let lastCycleTrigger = 0;

    function render(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = (width / 2) * dpr;
      const centerY = (height / 2) * dpr;

      const elapsed = now - cycleStartTime;
      const cycleProgress = elapsed % CYCLE_DURATION;

      if (now - lastCycleTrigger > CYCLE_DURATION * 0.95 && cycleProgress < 100) {
        activeBolts = spawnDischargeCycle(centerX, centerY);
        lastCycleTrigger = now;
      }

      if (activeBolts.length === 0 && cycleProgress < TRAVEL_OUT_DURATION) {
        activeBolts = spawnDischargeCycle(centerX, centerY);
        lastCycleTrigger = now;
      }

      if (cycleProgress < TRAVEL_OUT_DURATION + ECHO_DURATION && activeBolts.length > 0) {
        let alpha = 0;
        if (cycleProgress < TRAVEL_OUT_DURATION) {
          alpha = (cycleProgress / TRAVEL_OUT_DURATION) * 0.15;
        } else {
          const fadeProgress = (cycleProgress - TRAVEL_OUT_DURATION) / ECHO_DURATION;
          alpha = (1 - fadeProgress) * 0.15;
        }

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        activeBolts.forEach((bolt) => {
          bolt.segments.forEach((seg) => {
            // Glow layer (Neon Green)
            ctx.beginPath();
            ctx.moveTo(seg.start.x, seg.start.y);
            ctx.lineTo(seg.end.x, seg.end.y);
            ctx.strokeStyle = `rgba(101, 245, 138, ${alpha * 0.5})`;
            ctx.lineWidth = seg.isBranch ? 1.5 * dpr : 2.5 * dpr;
            ctx.shadowColor = '#00FFA3';
            ctx.shadowBlur = 10 * dpr;
            ctx.stroke();

            // Core layer (Mint/White)
            ctx.beginPath();
            ctx.moveTo(seg.start.x, seg.start.y);
            ctx.lineTo(seg.end.x, seg.end.y);
            ctx.strokeStyle = `rgba(241, 245, 249, ${alpha * 0.9})`;
            ctx.lineWidth = seg.isBranch ? 0.75 * dpr : 1.2 * dpr;
            ctx.shadowBlur = 0;
            ctx.stroke();
          });
        });

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
