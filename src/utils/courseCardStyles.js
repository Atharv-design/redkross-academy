/**
 * 10 Distinct Visual Course Card Styles (Strictly Non-Repeating)
 * Allows the Admin Panel and Course Directory to display any of 10
 * highly polished, distinctive aesthetic treatments for each course.
 */

export const COURSE_CARD_STYLES = [
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    theme: 'matrix',
    wrapperClass: 'bg-gradient-to-b from-[#0A261A]/55 to-[#05160E]/45 backdrop-blur-xl border border-[#65F58A]/35 border-t-white/25 hover:border-[#65F58A]/80 hover:shadow-[0_0_28px_rgba(101,245,138,0.28)]',
    badgeClass: 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/45',
    accentText: 'text-[#65F58A]',
    accentBg: 'bg-[#65F58A]',
    accentBorder: 'border-[#65F58A]',
    glowColor: 'rgba(101, 245, 138, 0.4)',
    cornerIndicator: '#65F58A',
    pattern: 'matrix-grid'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    theme: 'gold',
    wrapperClass: 'bg-gradient-to-b from-[#1F1C10]/55 to-[#0D0B05]/45 backdrop-blur-xl border border-[#F59E0B]/35 border-t-white/25 hover:border-[#F59E0B]/80 hover:shadow-[0_0_28px_rgba(245,158,11,0.25)]',
    badgeClass: 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/45',
    accentText: 'text-[#FBBF24]',
    accentBg: 'bg-[#F59E0B]',
    accentBorder: 'border-[#F59E0B]',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    cornerIndicator: '#F59E0B',
    pattern: 'gold-mesh'
  },
  {
    id: 'cobalt-radar',
    name: 'Emerald Radar',
    theme: 'radar',
    wrapperClass: 'bg-gradient-to-b from-[#0A281E]/55 to-[#051811]/45 backdrop-blur-xl border border-[#35E6B5]/35 border-t-white/25 hover:border-[#35E6B5]/80 hover:shadow-[0_0_28px_rgba(53,230,181,0.25)]',
    badgeClass: 'bg-[#35E6B5]/15 text-[#35E6B5] border-[#35E6B5]/45',
    accentText: 'text-[#35E6B5]',
    accentBg: 'bg-[#35E6B5]',
    accentBorder: 'border-[#35E6B5]',
    glowColor: 'rgba(53, 230, 181, 0.4)',
    cornerIndicator: '#35E6B5',
    pattern: 'radar-rings'
  },
  {
    id: 'amethyst-royal',
    name: 'Amethyst Royal',
    theme: 'amethyst',
    wrapperClass: 'bg-gradient-to-b from-[#1E112E]/55 to-[#0E0616]/45 backdrop-blur-xl border border-[#A855F7]/35 border-t-white/25 hover:border-[#A855F7]/80 hover:shadow-[0_0_28px_rgba(168,85,247,0.25)]',
    badgeClass: 'bg-[#A855F7]/15 text-[#C084FC] border-[#A855F7]/45',
    accentText: 'text-[#C084FC]',
    accentBg: 'bg-[#A855F7]',
    accentBorder: 'border-[#A855F7]',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    cornerIndicator: '#A855F7',
    pattern: 'holographic'
  },
  {
    id: 'crimson-threat',
    name: 'Crimson Threat',
    theme: 'threat',
    wrapperClass: 'bg-gradient-to-b from-[#2B0E12]/55 to-[#140406]/45 backdrop-blur-xl border border-[#F43F5E]/40 border-t-white/25 hover:border-[#F43F5E]/90 hover:shadow-[0_0_28px_rgba(244,63,94,0.28)]',
    badgeClass: 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/45',
    accentText: 'text-[#FB7185]',
    accentBg: 'bg-[#F43F5E]',
    accentBorder: 'border-[#F43F5E]',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    cornerIndicator: '#F43F5E',
    pattern: 'hazard-carbon'
  },
  {
    id: 'sunset-synth',
    name: 'Sunset Synth',
    theme: 'synth',
    wrapperClass: 'bg-gradient-to-b from-[#2E1225]/55 to-[#160611]/45 backdrop-blur-xl border border-[#EC4899]/35 border-t-white/25 hover:border-[#F43F5E]/80 hover:shadow-[0_0_28px_rgba(236,72,153,0.25)]',
    badgeClass: 'bg-[#EC4899]/15 text-[#F472B6] border-[#EC4899]/45',
    accentText: 'text-[#F472B6]',
    accentBg: 'bg-[#EC4899]',
    accentBorder: 'border-[#EC4899]',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    cornerIndicator: '#EC4899',
    pattern: 'synth-lines'
  },
  {
    id: 'monolith-stark',
    name: 'Monolith Stark',
    theme: 'monolith',
    wrapperClass: 'bg-gradient-to-b from-[#1C2822]/55 to-[#0A1410]/45 backdrop-blur-xl border border-[#65F58A]/30 border-t-white/30 hover:border-[#65F58A]/80 hover:shadow-[0_0_28px_rgba(101,245,138,0.25)]',
    badgeClass: 'bg-[#65F58A]/15 text-white border-[#65F58A]/45',
    accentText: 'text-white',
    accentBg: 'bg-white',
    accentBorder: 'border-white',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    cornerIndicator: '#FFFFFF',
    pattern: 'titanium'
  },
  {
    id: 'quantum-teal',
    name: 'Quantum Teal',
    theme: 'teal',
    wrapperClass: 'bg-gradient-to-b from-[#0A2726]/55 to-[#041413]/45 backdrop-blur-xl border border-[#2DD4BF]/35 border-t-white/25 hover:border-[#2DD4BF]/80 hover:shadow-[0_0_28px_rgba(45,212,191,0.25)]',
    badgeClass: 'bg-[#2DD4BF]/15 text-[#5EEAD4] border-[#2DD4BF]/45',
    accentText: 'text-[#5EEAD4]',
    accentBg: 'bg-[#2DD4BF]',
    accentBorder: 'border-[#2DD4BF]',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    cornerIndicator: '#2DD4BF',
    pattern: 'circuit-trace'
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    theme: 'amber',
    wrapperClass: 'bg-gradient-to-b from-[#261E09]/55 to-[#120D04]/45 backdrop-blur-xl border border-[#EAB308]/35 border-t-white/25 hover:border-[#EAB308]/80 hover:shadow-[0_0_28px_rgba(234,179,8,0.25)]',
    badgeClass: 'bg-[#EAB308]/15 text-[#FDE047] border-[#EAB308]/45',
    accentText: 'text-[#FDE047]',
    accentBg: 'bg-[#EAB308]',
    accentBorder: 'border-[#EAB308]',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    cornerIndicator: '#EAB308',
    pattern: 'solar-cross'
  },
  {
    id: 'stealth-slate',
    name: 'Emerald Stealth',
    theme: 'stealth',
    wrapperClass: 'bg-gradient-to-b from-[#0A241A]/55 to-[#04120D]/45 backdrop-blur-xl border border-[#35E6B5]/35 border-t-white/25 hover:border-[#65F58A]/80 hover:shadow-[0_0_28px_rgba(101,245,138,0.25)]',
    badgeClass: 'bg-[#65F58A]/15 text-[#C9EFE0] border-[#65F58A]/45',
    accentText: 'text-[#C9EFE0]',
    accentBg: 'bg-[#65F58A]',
    accentBorder: 'border-[#65F58A]',
    glowColor: 'rgba(101, 245, 138, 0.4)',
    cornerIndicator: '#65F58A',
    pattern: 'subpixel-carbon'
  }
];

let lastAssignedIndex = -1;

/**
 * Returns a random card style from the 10 available, ensuring it never
 * repeats the immediate previous style!
 */
export function getRandomCardStyle(avoidStyleId = null) {
  const eligible = COURSE_CARD_STYLES.filter((s, idx) => {
    if (avoidStyleId && s.id === avoidStyleId) return false;
    if (idx === lastAssignedIndex && COURSE_CARD_STYLES.length > 1) return false;
    return true;
  });

  const picked = eligible[Math.floor(Math.random() * eligible.length)] || COURSE_CARD_STYLES[0];
  lastAssignedIndex = COURSE_CARD_STYLES.findIndex((s) => s.id === picked.id);
  return picked;
}

export function getCardStyleByIndex(index) {
  if (typeof index !== 'number' || isNaN(index)) return COURSE_CARD_STYLES[0];
  return COURSE_CARD_STYLES[Math.abs(index) % COURSE_CARD_STYLES.length];
}

/**
 * Retrieve style object by ID, falling back to a deterministic hash of the ID.
 */
export function getCardStyleById(styleId) {
  if (!styleId) return COURSE_CARD_STYLES[0];
  const found = COURSE_CARD_STYLES.find((s) => s.id === styleId);
  if (found) return found;

  // Fallback hash
  let sum = 0;
  for (let i = 0; i < styleId.length; i++) {
    sum += styleId.charCodeAt(i);
  }
  return COURSE_CARD_STYLES[sum % COURSE_CARD_STYLES.length];
}
