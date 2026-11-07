import React from 'react';

/**
 * Official Kali Linux Vector Logo Component
 * Matches the official Kali dragon and typography:
 * - Crisp white dragon silhouette with 3 wing spines, curved loop neck, head & tail
 * - Clean rectangular box enclosing "KALI"
 * - Subtitle: "BY OFFENSIVE SECURITY(R)"
 */
export function OfficialKaliLogo({
  className = 'h-24',
  showText = true,
  isWhiteVariant = true,
  dragonSize = 'w-36 h-28',
  variant = 'wallpaper'
}) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Kali Dragon Vector Mark */}
      <svg
        viewBox="0 0 200 130"
        className={`${dragonSize} filter drop-shadow-[0_4px_16px_rgba(0,174,239,0.35)] flex-shrink-0`}
        fill="currentColor"
      >
        {/* Dragon 3 Wings (Curving Left) */}
        <path
          d="M 25 32 C 55 24, 90 28, 110 48 C 82 40, 50 42, 28 50 C 50 48, 85 54, 102 68 C 72 62, 42 66, 30 74 C 52 70, 84 76, 98 88"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dragon Loop Neck & Head (Facing Right) */}
        <path
          d="M 110 48 C 122 58, 136 56, 146 60 C 152 52, 146 47, 142 44 C 152 44, 162 52, 172 58 C 182 64, 176 70, 166 68 C 156 66, 146 72, 134 66 C 124 60, 112 56, 100 62 C 88 70, 84 84, 90 94 C 98 106, 118 108, 126 116 C 132 122, 128 128, 122 128 C 112 124, 104 118, 98 110 C 86 98, 80 88, 78 72 C 76 54, 88 42, 110 48 Z"
          fill="#FFFFFF"
        />
        {/* Dragon Horns & Spines */}
        <path
          d="M 130 52 L 142 38 L 138 52 M 148 56 L 160 44 L 154 58 M 162 60 L 174 52 L 168 64"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Dragon Tail Loop Underneath */}
        <path
          d="M 100 90 C 115 105, 140 108, 155 120 C 160 124, 156 128, 150 126 C 135 120, 118 112, 108 98"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Official Kali Branding */}
      {showText && (
        variant === 'brand' ? (
          <div className="flex items-center space-x-1.5 mt-2 font-sans tracking-wide">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              KALI
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#00A2FF] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center">
              LINUX<sup className="text-xs text-white ml-0.5 font-bold">®</sup>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-2 font-sans tracking-widest text-center">
            {/* Bordered Box around KALI */}
            <div className="px-6 py-1.5 rounded-lg border-2 border-white bg-black/30 backdrop-blur-sm shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-[0.25em] pl-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                KALI
              </span>
            </div>
            {/* Subtitle */}
            <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-[0.3em] mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              BY OFFENSIVE SECURITY®
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default OfficialKaliLogo;
