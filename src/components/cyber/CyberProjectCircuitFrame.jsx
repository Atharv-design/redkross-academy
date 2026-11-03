import React from 'react';

export default function CyberProjectCircuitFrame({ isHovered = false }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      <svg
        viewBox="0 0 400 480"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible transition-all duration-300"
      >
        <defs>
          {/* Intense Laser Cyan Glow Filter */}
          <filter id="projectCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Volumetric Radial Vignette Gradient matching Focus Area Cards */}
          <radialGradient id="projectPlateFill" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#040813" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#050C1B" stopOpacity="0.96" />
            <stop offset="88%" stopColor="#081E33" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#004D66" stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* 1. MAIN CHAMFERED HUD PLATE */}
        <path
          d="M 32 16 L 110 16 L 122 10 L 210 10 L 222 16 L 368 16 L 384 32 L 384 190 L 392 200 L 392 260 L 384 270 L 384 448 L 368 464 L 325 464 L 312 470 L 225 470 L 212 464 L 32 464 L 16 448 L 16 270 L 8 260 L 8 200 L 16 190 L 16 32 Z"
          fill="url(#projectPlateFill)"
          stroke="#00F0FF"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
          style={{
            strokeOpacity: isHovered ? 0.95 : 0.45,
            filter: isHovered ? 'drop-shadow(0 0 12px rgba(0,240,255,0.45))' : 'none'
          }}
        />

        {/* 2. TRAVELING PERIMETER LASER PULSE ALONG THE CHAMFERED BORDER */}
        <path
          d="M 32 16 L 110 16 L 122 10 L 210 10 L 222 16 L 368 16 L 384 32 L 384 190 L 392 200 L 392 260 L 384 270 L 384 448 L 368 464 L 325 464 L 312 470 L 225 470 L 212 464 L 32 464 L 16 448 L 16 270 L 8 260 L 8 200 L 16 190 L 16 32 Z"
          fill="none"
          stroke="#5CF7FF"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          pathLength="100"
          strokeDasharray="20 80"
          strokeDashoffset={isHovered ? '0' : '50'}
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-hud-perimeter-trace' : 'opacity-0'}`}
          filter="url(#projectCyanGlow)"
        />

        {/* 3. TIGHT CORNER ACCENT TICKS (Strictly outer, zero text intersection) */}
        <path
          d="M 40 24 L 24 40"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 360 24 L 376 40"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 40 456 L 24 440"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 360 456 L 376 440"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />

        {/* 4. TOP CIRCUIT TRACES & ELEMENTS */}
        <line
          x1="80"
          y1="5"
          x2="165"
          y2="5"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        {/* Chevrons pointing right: ▶ ▶ ▶ ▶ ▶ */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.95 : 0.5 }}>
          <polygon points="125,2 130,5 125,8" />
          <polygon points="134,2 139,5 134,8" />
          <polygon points="143,2 148,5 143,8" />
          <polygon points="152,2 157,5 152,8" />
          <polygon points="161,2 166,5 161,8" />
        </g>

        {/* Dotted data track at top */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.85 : 0.35 }}>
          <rect x="185" y="8" width="2.5" height="2.5" />
          <rect x="192" y="8" width="2.5" height="2.5" />
          <rect x="199" y="8" width="2.5" height="2.5" />
          <rect x="206" y="8" width="2.5" height="2.5" />
        </g>

        {/* Top-Right Stepped Circuit Trace with Nodes */}
        <circle cx="168" cy="12" r="2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />
        <line x1="168" y1="12" x2="190" y2="12" stroke="#00F0FF" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ strokeOpacity: isHovered ? 0.7 : 0.3 }} />
        <path
          d="M 230 12 L 260 12 L 275 5 L 315 5"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="360" cy="12" r="2.2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} filter={isHovered ? 'url(#projectCyanGlow)' : 'none'} />

        {/* Top-Left Stepped Circuit Trace */}
        <circle cx="48" cy="12" r="2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />
        <path
          d="M 48 12 L 68 12 L 80 6 L 98 6"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.7 : 0.3 }}
        />

        {/* 5. RIGHT EDGE CIRCUIT TRACES & DOT MATRICES */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.9 : 0.4 }}>
          <circle cx="372" cy="120" r="1.3" />
          <circle cx="372" cy="130" r="1.3" />
          <circle cx="372" cy="140" r="1.3" />
          <circle cx="372" cy="150" r="1.3" />
          <circle cx="372" cy="160" r="1.3" />
        </g>

        {/* Right outer stepping circuit lines */}
        <path
          d="M 384 28 L 394 38 L 394 150"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="372" cy="28" r="2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />

        {/* Lower right circuit traces */}
        <path
          d="M 380 320 L 392 335 L 392 390"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="372" cy="320" r="2.2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />

        {/* Chevrons on lower right pointing down: ▼ ▼ ▼ ▼ */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.9 : 0.45 }}>
          <polygon points="389,400 392,395 395,400" />
          <polygon points="389,408 392,403 395,408" />
          <polygon points="389,416 392,411 395,416" />
          <polygon points="389,424 392,419 395,424" />
        </g>

        {/* 6. BOTTOM CIRCUIT TRACES & ELEMENTS */}
        <line
          x1="75"
          y1="472"
          x2="160"
          y2="472"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <path
          d="M 105 476 L 185 476 L 198 472 L 235 472"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="200" cy="476" r="2.2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />

        {/* Chevrons pointing right at bottom: ▶ ▶ ▶ ▶ ▶ */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.9 : 0.45 }}>
          <polygon points="56,473 61,476 56,479" />
          <polygon points="64,473 69,476 64,479" />
          <polygon points="72,473 77,476 72,479" />
          <polygon points="80,473 85,476 80,479" />
          <polygon points="88,473 93,476 88,479" />
        </g>

        {/* Dotted data track at bottom-right */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.85 : 0.35 }}>
          <rect x="245" y="474" width="2.5" height="2.5" />
          <rect x="252" y="474" width="2.5" height="2.5" />
          <rect x="259" y="474" width="2.5" height="2.5" />
          <rect x="266" y="474" width="2.5" height="2.5" />
        </g>

        {/* 7. LEFT EDGE CIRCUIT TRACES & DOT MATRICES */}
        <g fill="#00F0FF" style={{ opacity: isHovered ? 0.9 : 0.4 }}>
          <circle cx="28" cy="140" r="1.3" />
          <circle cx="28" cy="150" r="1.3" />
          <circle cx="28" cy="160" r="1.3" />
          <circle cx="28" cy="170" r="1.3" />
        </g>

        {/* Upper-left stepping circuit traces */}
        <path
          d="M 24 24 L 10 38 L 10 150"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="32" cy="24" r="2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />

        {/* Lower-left diagonal trace */}
        <circle cx="16" cy="410" r="2" fill="#00F0FF" style={{ opacity: isHovered ? 1 : 0.6 }} />
        <path
          d="M 16 410 L 28 422 L 28 440"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
      </svg>
    </div>
  );
}
