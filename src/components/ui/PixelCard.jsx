/* eslint-disable */
// Pixel Card — Originkit (Adapted for RedKross Academy)

import React, { useEffect, useRef } from "react";

const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
};

class Pixel {
    constructor(canvas, context, x, y, color, speed, delay, maxPx) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        // Scale the original 0.5–2px range by the chosen particle size.
        const factor = maxPx / 2;
        this.sizeStep = Math.random() * 0.4 * factor;
        this.minSize = 0.5 * factor;
        this.maxSizeInteger = maxPx;
        this.maxSize = this.getRandomValue(this.minSize, maxPx);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
        this.growStart = null;
        this.shrinkStart = null;
        this.shrinkFrom = 0;
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + centerOffset,
            this.y + centerOffset,
            this.size,
            this.size
        );
    }

    appear(now, durationMs, easeFn) {
        this.isIdle = false;
        this.shrinkStart = null;
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }
        if (!this.isShimmer) {
            if (this.growStart === null) this.growStart = now;
            const p =
                durationMs > 0
                    ? Math.min(1, (now - this.growStart) / durationMs)
                    : 1;
            this.size = easeFn(p) * this.maxSize;
            if (p >= 1) this.isShimmer = true;
        }
        if (this.isShimmer) {
            this.shimmer();
        }
        this.draw();
    }

    disappear(now, durationMs, easeFn) {
        this.isShimmer = false;
        this.counter = 0;
        this.growStart = null;
        if (this.size <= 0) {
            this.isIdle = true;
            this.shrinkStart = null;
            return;
        }
        if (this.shrinkStart === null) {
            this.shrinkStart = now;
            this.shrinkFrom = this.size;
        }
        const p =
            durationMs > 0
                ? Math.min(1, (now - this.shrinkStart) / durationMs)
                : 1;
        this.size = this.shrinkFrom * (1 - easeFn(p));
        if (p >= 1) this.size = 0;
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }
        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
    }
}

function getEffectiveSpeed(value, reducedMotion) {
    const min = 0;
    const max = 100;
    const throttle = 0.002;

    if (value <= min || reducedMotion) {
        return min;
    } else if (value >= max) {
        return max * throttle;
    } else {
        return value * throttle;
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

const EASE_PRESETS = {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
};

function makeEase(transition) {
    const ease = transition?.ease;
    if (Array.isArray(ease) && ease.length === 4)
        return cubicBezier(ease[0], ease[1], ease[2], ease[3]);
    if (typeof ease === "string" && EASE_PRESETS[ease])
        return cubicBezier(...EASE_PRESETS[ease]);
    return cubicBezier(0, 0, 0.58, 1); // default easeOut
}

// RedKross Academy Emerald Cyber Theme Defaults (0% blue, 0% pink)
export const REDKROSS_PIXEL_COLORS = [
    "#65F58A", // RedKross Signature Neon Green
    "#35E6B5", // Mint Cyber Accent
    "#00FFA3", // High-Intensity Emerald Glow
    "#10B981", // Deep Matrix Green
];

const COMPONENT_DEFAULTS = {
    colors: REDKROSS_PIXEL_COLORS,
    appearFrom: "middle",
    gap: 6,
    pixelSize: 2,
    speed: 80,
    padding: 0,
    transition: { type: "tween", duration: 0.8, ease: "easeOut" },
    backgroundColor: "#071018",
    borderColor: "rgba(101, 245, 138, 0.2)",
    borderWidth: 1,
    radius: 16,
    showLabel: false,
    label: {
        text: "",
        color: "#F1F5F9",
        font: {
            fontSize: "22px",
            letterSpacing: "-0.01em",
            fontFamily: "Lora, serif",
        },
    },
};

export default function PixelCard(props) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const {
        colors = REDKROSS_PIXEL_COLORS,
        gap = 6,
        pixelSize = 2,
        speed = 80,
        appearFrom = "middle",
        transition = { type: "tween", duration: 0.8, ease: "easeOut" },
        backgroundColor = "#071018",
        padding = 0,
        borderColor = "rgba(101, 245, 138, 0.2)",
        borderWidth = 1,
        radius = 16,
        showLabel = false,
        label,
        style,
        children,
    } = props;

    const labelCfg = { text: "", color: "#F1F5F9", ...label };
    const renderTarget = RenderTarget.current();
    const isExport =
        renderTarget === RenderTarget.export ||
        renderTarget === RenderTarget.thumbnail;
    const isCanvas = renderTarget === RenderTarget.canvas;
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const pixelsRef = useRef([]);
    const animationRef = useRef(null);
    const timePreviousRef = useRef(
        typeof performance !== "undefined" ? performance.now() : 0
    );
    const reducedMotion = useRef(
        typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ).current;

    const finalGap = gap;
    const finalSpeed = speed;
    const easeFn = makeEase(transition);
    const durationMs = (transition?.duration ?? 0.8) * 1000;
    const finalColors = colors && colors.length > 0 ? colors : REDKROSS_PIXEL_COLORS;

    const initPixels = () => {
        if (!containerRef.current || !canvasRef.current) return;

        const el = canvasRef.current;
        const container = containerRef.current;
        const width = Math.floor(
            el.clientWidth ||
                el.getBoundingClientRect().width ||
                container.clientWidth ||
                0
        );
        const height = Math.floor(
            el.clientHeight ||
                el.getBoundingClientRect().height ||
                container.clientHeight ||
                0
        );
        const ctx = canvasRef.current.getContext("2d");

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const colorsArray = finalColors;
        const step = Math.max(1, parseInt(finalGap.toString(), 10));
        const pxs = [];
        let idx = 0;
        for (let x = 0; x < width; x += step) {
            for (let y = 0; y < height; y += step) {
                const c = colorsArray[idx % colorsArray.length];
                idx++;

                let delay;
                if (reducedMotion) {
                    delay = 0;
                } else if (appearFrom === "top") {
                    delay = y;
                } else if (appearFrom === "bottom") {
                    delay = height - y;
                } else if (appearFrom === "left") {
                    delay = x;
                } else if (appearFrom === "right") {
                    delay = width - x;
                } else {
                    const dx = x - width / 2;
                    const dy = y - height / 2;
                    delay = Math.sqrt(dx * dx + dy * dy);
                }
                if (!ctx) return;
                pxs.push(
                    new Pixel(
                        canvasRef.current,
                        ctx,
                        x,
                        y,
                        c,
                        getEffectiveSpeed(finalSpeed, reducedMotion),
                        delay,
                        Math.max(0.1, pixelSize)
                    )
                );
            }
        }
        pixelsRef.current = pxs;
    };

    const drawStaticFrame = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (const pixel of pixelsRef.current) {
            pixel.size = pixel.maxSize;
            pixel.draw();
        }
    };

    const doAnimate = (fnName) => {
        animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
        const timeNow = performance.now();
        const timePassed = timeNow - timePreviousRef.current;
        const timeInterval = 1000 / 60;

        if (timePassed < timeInterval) return;
        timePreviousRef.current = timeNow - (timePassed % timeInterval);

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        let allIdle = true;
        for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            pixel[fnName](timeNow, durationMs, easeFn);
            if (!pixel.isIdle) {
                allIdle = false;
            }
        }
        if (allIdle) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleAnimation = (name) => {
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = requestAnimationFrame(() => doAnimate(name));
    };

    const onMouseEnter = () => handleAnimation("appear");
    const onMouseLeave = () => handleAnimation("disappear");

    const present = () => {
        if (isExport) drawStaticFrame();
        else if (isCanvas) handleAnimation("appear");
    };

    useEffect(() => {
        initPixels();
        present();
        const observer = new ResizeObserver(() => {
            initPixels();
            present();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => {
            observer.disconnect();
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        finalGap,
        finalSpeed,
        pixelSize,
        JSON.stringify(finalColors),
        appearFrom,
        isExport,
        isCanvas,
    ]);

    const rootStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 80,
        minHeight: 80,
        overflow: "hidden",
        boxSizing: "border-box",
        padding,
        background: backgroundColor,
        display: "grid",
        placeItems: "center",
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: radius,
        isolation: "isolate",
        userSelect: "none",
        transition: "border-color 0.2s cubic-bezier(0.5,1,0.89,1)",
        fontFamily: "'Lora', serif",
        ...(style || {}),
    };

    return (
        <div
            ref={containerRef}
            style={rootStyle}
            onMouseEnter={isExport || isCanvas ? undefined : onMouseEnter}
            onMouseLeave={isExport || isCanvas ? undefined : onMouseLeave}
            tabIndex={-1}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    gridArea: "1 / 1",
                }}
            />
            {showLabel && labelCfg.text ? (
                <div
                    style={{
                        gridArea: "1 / 1",
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none",
                    }}
                >
                    <span
                        style={{
                            color: labelCfg.color,
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            fontFamily: "'Lora', serif",
                            ...(labelCfg.font || {}),
                        }}
                    >
                        {labelCfg.text}
                    </span>
                </div>
            ) : null}
            {children ? (
                <div
                    style={{
                        gridArea: "1 / 1",
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
}
