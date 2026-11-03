import React from 'react';

export default function CyberCircuitFrame({ isHovered = false, theme = 'amber' }) {
  const isAmber = theme === 'amber';
  const strokeColor = isAmber ? '#FF7A00' : '#00F0FF';
  const strokePulse = isAmber ? '#FFA439' : '#5CF7FF';
  const filterId = isAmber ? 'hudAmberGlow' : 'hudCyanGlow';
  const fillId = isAmber ? 'hudPlateFillAmber' : 'hudPlateFill';
  const glowShadow = isAmber ? 'rgba(255,122,0,0.5)' : 'rgba(0,240,255,0.45)';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      <svg
        viewBox="0 0 400 280"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible transition-all duration-300"
      >
        <defs>
          {/* Intense Laser Glow Filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Volumetric Radial Vignette Gradient */}
          {isAmber ? (
            <radialGradient id="hudPlateFillAmber" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#0B0804" stopOpacity="0.98" />
              <stop offset="65%" stopColor="#140D06" stopOpacity="0.96" />
              <stop offset="88%" stopColor="#221306" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.28" />
            </radialGradient>
          ) : (
            <radialGradient id="hudPlateFill" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#040813" stopOpacity="0.98" />
              <stop offset="65%" stopColor="#050C1B" stopOpacity="0.96" />
              <stop offset="88%" stopColor="#081E33" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#004D66" stopOpacity="0.45" />
            </radialGradient>
          )}
        </defs>

        {/* 1. MAIN CHAMFERED HUD PLATE */}
        <path
          d="M 32 16 L 110 16 L 122 10 L 210 10 L 222 16 L 368 16 L 384 32 L 384 110 L 392 120 L 392 150 L 384 160 L 384 248 L 368 264 L 325 264 L 312 270 L 225 270 L 212 264 L 32 264 L 16 248 L 16 160 L 8 150 L 8 120 L 16 110 L 16 32 Z"
          fill={`url(#${fillId})`}
          stroke={strokeColor}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
          style={{
            strokeOpacity: isHovered ? 0.95 : 0.45,
            filter: isHovered ? `drop-shadow(0 0 10px ${glowShadow})` : 'none'
          }}
        />

        {/* 2. TRAVELING PERIMETER LASER PULSE ALONG THE CHAMFERED BORDER */}
        <path
          d="M 32 16 L 110 16 L 122 10 L 210 10 L 222 16 L 368 16 L 384 32 L 384 110 L 392 120 L 392 150 L 384 160 L 384 248 L 368 264 L 325 264 L 312 270 L 225 270 L 212 264 L 32 264 L 16 248 L 16 160 L 8 150 L 8 120 L 16 110 L 16 32 Z"
          fill="none"
          stroke={strokePulse}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          pathLength="100"
          strokeDasharray="20 80"
          strokeDashoffset={isHovered ? '0' : '50'}
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-hud-perimeter-trace' : 'opacity-0'}`}
          filter={`url(#${filterId})`}
        />

        {/* 3. TIGHT CORNER ACCENT TICKS */}
        <path
          d="M 40 24 L 24 40"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 360 24 L 376 40"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 40 256 L 24 240"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.8 : 0.3 }}
        />
        <path
          d="M 360 256 L 376 240"
          fill="none"
          stroke={strokeColor}
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
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <g fill={strokeColor} style={{ opacity: isHovered ? 0.95 : 0.5 }}>
          <polygon points="125,2 130,5 125,8" />
          <polygon points="134,2 139,5 134,8" />
          <polygon points="143,2 148,5 143,8" />
          <polygon points="152,2 157,5 152,8" />
          <polygon points="161,2 166,5 161,8" />
        </g>

        <g fill={strokeColor} style={{ opacity: isHovered ? 0.85 : 0.35 }}>
          <rect x="185" y="8" width="2.5" height="2.5" />
          <rect x="192" y="8" width="2.5" height="2.5" />
          <rect x="199" y="8" width="2.5" height="2.5" />
          <rect x="206" y="8" width="2.5" height="2.5" />
        </g>

        <circle cx="168" cy="12" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />
        <line x1="168" y1="12" x2="190" y2="12" stroke={strokeColor} strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ strokeOpacity: isHovered ? 0.7 : 0.3 }} />
        <path
          d="M 230 12 L 260 12 L 275 5 L 315 5"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="360" cy="12" r="2.2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} filter={isHovered ? `url(#${filterId})` : 'none'} />
        <path
          d="M 255 14 L 295 14 L 310 8 L 345 8 L 360 12"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.35 }}
        />

        <circle cx="48" cy="12" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />
        <path
          d="M 48 12 L 68 12 L 80 6 L 98 6"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.7 : 0.3 }}
        />

        {/* 5. RIGHT EDGE CIRCUIT TRACES */}
        <g fill={strokeColor} style={{ opacity: isHovered ? 0.9 : 0.4 }}>
          <circle cx="372" cy="70" r="1.2" />
          <circle cx="372" cy="78" r="1.2" />
          <circle cx="372" cy="86" r="1.2" />
          <circle cx="372" cy="94" r="1.2" />
          <circle cx="372" cy="102" r="1.2" />
        </g>

        <path
          d="M 384 28 L 394 38 L 394 95"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="372" cy="28" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />

        <path
          d="M 380 165 L 392 178 L 392 220"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="372" cy="165" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />

        <g fill={strokeColor} style={{ opacity: isHovered ? 0.9 : 0.45 }}>
          <polygon points="389,228 392,223 395,228" />
          <polygon points="389,235 392,230 395,235" />
          <polygon points="389,242 392,237 395,242" />
        </g>

        {/* 6. BOTTOM CIRCUIT TRACES */}
        <line
          x1="75"
          y1="272"
          x2="160"
          y2="272"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <path
          d="M 105 276 L 185 276 L 198 272 L 235 272"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="200" cy="276" r="2.2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />

        <g fill={strokeColor} style={{ opacity: isHovered ? 0.9 : 0.45 }}>
          <polygon points="56,273 61,276 56,279" />
          <polygon points="64,273 69,276 64,279" />
          <polygon points="72,273 77,276 72,279" />
          <polygon points="80,273 85,276 80,279" />
        </g>

        <g fill={strokeColor} style={{ opacity: isHovered ? 0.85 : 0.35 }}>
          <rect x="245" y="274" width="2.5" height="2.5" />
          <rect x="252" y="274" width="2.5" height="2.5" />
          <rect x="259" y="274" width="2.5" height="2.5" />
          <rect x="266" y="274" width="2.5" height="2.5" />
        </g>

        <path
          d="M 300 274 L 340 274 L 355 268 L 368 255"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="358" cy="265" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />

        {/* 7. LEFT EDGE CIRCUIT TRACES */}
        <g fill={strokeColor} style={{ opacity: isHovered ? 0.9 : 0.4 }}>
          <circle cx="28" cy="85" r="1.2" />
          <circle cx="28" cy="93" r="1.2" />
          <circle cx="28" cy="101" r="1.2" />
          <circle cx="28" cy="109" r="1.2" />
        </g>

        <path
          d="M 24 24 L 10 38 L 10 95"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
        <circle cx="32" cy="24" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />

        <circle cx="16" cy="235" r="2" fill={strokeColor} style={{ opacity: isHovered ? 1 : 0.6 }} />
        <path
          d="M 16 235 L 28 248 L 28 260"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ strokeOpacity: isHovered ? 0.85 : 0.4 }}
        />
      </svg>
    </div>
  );
}
