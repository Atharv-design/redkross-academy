/* eslint-disable */
// PixelBackground — Global Ambient Cyber Shimmer Particle Layer for RedKross Academy
// Adapted from Originkit Pixel Engine with full-screen auto-shimmer & cursor ripple

import React, { useEffect, useRef } from "react";

class AmbientPixel {
    constructor(canvas, context, x, y, color, speed, delay, maxPx) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = (0.2 + Math.random() * 0.8) * speed;
        this.size = 0;
        const factor = maxPx / 2;
        this.sizeStep = Math.random() * 0.4 * factor;
        this.minSize = 0.3 * factor;
        this.maxSizeInteger = maxPx;
        this.maxSize = Math.random() * (maxPx - this.minSize) + this.minSize;
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 3 + (this.width + this.height) * 0.005;
        this.isIdle = false;
        this.isReverse = Math.random() > 0.5;
        this.isShimmer = false;
        this.growStart = null;
    }

    draw() {
        if (this.size <= 0.1) return;
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + centerOffset,
            this.y + centerOffset,
            this.size,
            this.size
        );
    }

    tick(now, durationMs, easeFn, mouseX, mouseY) {
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }

        if (!this.isShimmer) {
            if (this.growStart === null) this.growStart = now;
            const p = durationMs > 0 ? Math.min(1, (now - this.growStart) / durationMs) : 1;
            this.size = easeFn(p) * this.maxSize;
            if (p >= 1) this.isShimmer = true;
        } else {
            // Interactive proximity boost if mouse is within 120px
            let currentMax = this.maxSize;
            if (mouseX >= 0 && mouseY >= 0) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distSq = dx * dx + dy * dy;
                if (distSq < 14400) { // 120px radius
                    currentMax = Math.min(this.maxSizeInteger * 1.5, this.maxSize + 1.2);
                    this.size = Math.min(currentMax, this.size + 0.1);
                }
            }

            if (this.isReverse) {
                this.size -= this.speed;
                if (this.size <= this.minSize) {
                    this.isReverse = false;
                }
            } else {
                this.size += this.speed;
                if (this.size >= currentMax) {
                    this.isReverse = true;
                }
            }
        }

        this.draw();
    }
}

function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const fx = (t) => ((ax * t + bx) * t + cx) * t;
    const dfx = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (x) => {
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        let t = x;
        for (let i = 0; i < 8; i++) {
            const e = fx(t) - x;
            const d = dfx(t);
            if (Math.abs(e) < 1e-5 || d === 0) break;
            t -= e / d;
        }
        return ((ay * t + by) * t + cy) * t;
    };
}

// RedKross Academy Signature Palette (Strict Zero Blue)
const DEFAULT_CYBER_COLORS = [
    "#65F58A", // Signature Neon Green
    "#35E6B5", // Mint Accent
    "#00FFA3", // High-Intensity Emerald Glow
    "#10B981", // Deep Matrix Emerald
    "#059669", // Subdued Forest Cyber
];

export default function PixelBackground({
    colors = DEFAULT_CYBER_COLORS,
    gap = 20,
    pixelSize = 2.2,
    speed = 35,
    opacity = 0.45,
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const pixelsRef = useRef([]);
    const animationRef = useRef(null);
    const mousePosRef = useRef({ x: -9999, y: -9999 });
    const timePreviousRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);

    const reducedMotion = useRef(
        typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ).current;

    const easeFn = cubicBezier(0, 0, 0.58, 1);
    const durationMs = 1200;
    const effectiveSpeed = reducedMotion ? 0 : Math.max(0.0008, speed * 0.0006);

    const initPixels = () => {
        if (!canvasRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;

        const width = Math.floor(container.clientWidth || window.innerWidth || 1920);
        const height = Math.floor(container.clientHeight || window.innerHeight || 1080);
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const step = Math.max(12, gap);
        const pxs = [];
        let idx = 0;

        for (let x = 0; x < width; x += step) {
            for (let y = 0; y < height; y += step) {
                const color = colors[idx % colors.length];
                idx++;

                const dx = x - width / 2;
                const dy = y - height / 2;
                const delay = Math.sqrt(dx * dx + dy * dy) * 0.35;

                pxs.push(
                    new AmbientPixel(
                        canvas,
                        ctx,
                        x,
                        y,
                        color,
                        effectiveSpeed,
                        delay,
                        pixelSize
                    )
                );
            }
        }
        pixelsRef.current = pxs;
    };

    const animateLoop = () => {
        animationRef.current = requestAnimationFrame(animateLoop);
        const now = performance.now();
        const timePassed = now - timePreviousRef.current;
        const timeInterval = 1000 / 45; // 45 FPS lock for fluid, low-power ambient shimmer

        if (timePassed < timeInterval) return;
        timePreviousRef.current = now - (timePassed % timeInterval);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const mouse = mousePosRef.current;
        const pixels = pixelsRef.current;
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].tick(now, durationMs, easeFn, mouse.x, mouse.y);
        }
    };

    useEffect(() => {
        initPixels();
        animationRef.current = requestAnimationFrame(animateLoop);

        const handleMouseMove = (e) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                mousePosRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }
        };

        const handleMouseLeave = () => {
            mousePosRef.current = { x: -9999, y: -9999 };
        };

        const handleResize = () => {
            initPixels();
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
        };
    }, [gap, pixelSize, speed, JSON.stringify(colors)]);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
            style={{ opacity }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}
