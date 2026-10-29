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
    wrapperClass: 'bg-gradient-to-b from-[#091812] to-[#040C08] border-[#65F58A]/30 hover:border-[#65F58A]/80 hover:shadow-[0_0_25px_rgba(101,245,138,0.2)]',
    badgeClass: 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#18140B] to-[#0B0904] border-[#F59E0B]/35 hover:border-[#F59E0B]/80 hover:shadow-[0_0_25px_rgba(245,158,11,0.22)]',
    badgeClass: 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/40',
    accentText: 'text-[#FBBF24]',
    accentBg: 'bg-[#F59E0B]',
    accentBorder: 'border-[#F59E0B]',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    cornerIndicator: '#F59E0B',
    pattern: 'gold-mesh'
  },
  {
    id: 'cobalt-radar',
    name: 'Cobalt Radar',
    theme: 'radar',
    wrapperClass: 'bg-gradient-to-b from-[#0B1526] to-[#050C17] border-[#38BDF8]/35 hover:border-[#38BDF8]/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.22)]',
    badgeClass: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40',
    accentText: 'text-[#38BDF8]',
    accentBg: 'bg-[#38BDF8]',
    accentBorder: 'border-[#38BDF8]',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    cornerIndicator: '#38BDF8',
    pattern: 'radar-rings'
  },
  {
    id: 'amethyst-royal',
    name: 'Amethyst Royal',
    theme: 'amethyst',
    wrapperClass: 'bg-gradient-to-b from-[#170E26] to-[#0B0614] border-[#A855F7]/35 hover:border-[#A855F7]/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.22)]',
    badgeClass: 'bg-[#A855F7]/15 text-[#C084FC] border-[#A855F7]/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#21090C] to-[#0F0305] border-[#F43F5E]/40 hover:border-[#F43F5E]/90 hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]',
    badgeClass: 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#240F1D] to-[#12070E] border-[#EC4899]/35 hover:border-[#F43F5E]/80 hover:shadow-[0_0_25px_rgba(236,72,153,0.22)]',
    badgeClass: 'bg-[#EC4899]/15 text-[#F472B6] border-[#EC4899]/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#18181B] to-[#09090B] border-white/30 hover:border-white/80 hover:shadow-[0_0_25px_rgba(255,255,255,0.18)]',
    badgeClass: 'bg-white/15 text-white border-white/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#081C1D] to-[#030E0E] border-[#2DD4BF]/35 hover:border-[#2DD4BF]/80 hover:shadow-[0_0_25px_rgba(45,212,191,0.22)]',
    badgeClass: 'bg-[#2DD4BF]/15 text-[#5EEAD4] border-[#2DD4BF]/40',
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
    wrapperClass: 'bg-gradient-to-b from-[#1F1707] to-[#0D0A03] border-[#EAB308]/35 hover:border-[#EAB308]/80 hover:shadow-[0_0_25px_rgba(234,179,8,0.22)]',
    badgeClass: 'bg-[#EAB308]/15 text-[#FDE047] border-[#EAB308]/40',
    accentText: 'text-[#FDE047]',
    accentBg: 'bg-[#EAB308]',
    accentBorder: 'border-[#EAB308]',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    cornerIndicator: '#EAB308',
    pattern: 'solar-cross'
  },
  {
    id: 'stealth-slate',
    name: 'Stealth Slate',
    theme: 'stealth',
    wrapperClass: 'bg-gradient-to-b from-[#141B22] to-[#0A0E13] border-[#64748B]/35 hover:border-[#94A3B8]/80 hover:shadow-[0_0_25px_rgba(148,163,184,0.18)]',
    badgeClass: 'bg-[#64748B]/15 text-[#CBD5E1] border-[#64748B]/40',
    accentText: 'text-[#CBD5E1]',
    accentBg: 'bg-[#94A3B8]',
    accentBorder: 'border-[#94A3B8]',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    cornerIndicator: '#94A3B8',
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
