import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  User,
  Users,
  Monitor,
  FileText,
  Shield,
  BarChart2,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Box,
  GitBranch,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

/**
 * DICTO CYBER CARD COMPONENT FAMILY (Cards 1 to 10)
 * Directly matches the reference design image (media_1793206746529_8131fa77.jpg):
 *
 * Card 1: Horizontal Mint/Cyan with 3D Mortarboard & Code Screens
 * Card 2: Tall Vertical Amber with 3D Holographic Wireframe Globe & Full-Width Pill Button
 * Card 3: Compact Square Mint with 3D Bastion Glass Shield & Padlock
 * Card 4: Tall Vertical Crimson Red Alert Terminal with Hazard Triangle (!)
 * Card 5: Horizontal Emerald with 3D Cyber Grimoire & Neural Brain + Bottom-Left Arrow
 * Card 6: Panoramic Ultra-Wide Banner with 3D Mountain Summit & Golden Flag Path
 * Card 7: Horizontal Neon Green with 3D Radar HUD (✔) & Full-Width Glowing Progress Bar
 * Card 8: Horizontal Amber with 3D Isometric Cyber Vault Cube on Steps
 * Card 9: Landscape Cyber Teal with 3D Hooded Operator & Multi-Screen Matrix
 * Card 10: Horizontal Golden Amber with 3D Star Medal Trophy & Milestone Sockets
 */

export default function DictoCyberCard({
  variant = 1,
  tag = 'ACADEMY TRACK',
  title = 'Title Placeholder',
  description = 'Detailed institutional curriculum covering defensive telemetry, adversary correlation, and incident triage.',
  meta = [],
  actionHref = '/courses',
  actionText = 'Access Module',
  onClick,
  progress = null,
  badges = [],
  sockets = 4,
  className = '',
  compact = false
}) {
  // Normalize variant to number 1-10
  const parseVariant = (val) => {
    if (val === 'random') {
      return Math.floor(Math.random() * 10) + 1;
    }
    if (typeof val === 'string') {
      const match = val.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        return ((num - 1) % 10) + 1;
      }
    }
    const n = Number(val) || 1;
    return ((n - 1) % 10) + 1;
  };

  const v = parseVariant(variant);

  // Link wrapper component helper
  const ActionButton = ({ className: btnClass, children, arrowOnly = true, to = actionHref }) => {
    const content = (
      <>
        {!arrowOnly && children}
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
      </>
    );

    if (to) {
      return (
        <Link
          to={to}
          onClick={onClick}
          className={`group/btn inline-flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
          aria-label={title}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        onClick={onClick}
        type="button"
        className={`group/btn inline-flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
        aria-label={title}
      >
        {content}
      </button>
    );
  };

  /* =========================================================================
     3D SVG ARTWORKS (EXACT MATCH FOR media_1793206746529_8131fa77.jpg)
     ========================================================================= */

  // Art 1: Mortarboard on Tiered Pedestal with Code Screens
  const renderArt1 = () => (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#35E6B5]/15 via-[#65F58A]/5 to-transparent rounded-2xl" />
      <svg viewBox="0 0 240 180" className="w-full max-w-[220px] h-auto drop-shadow-[0_0_25px_rgba(53,230,181,0.45)]">
        {/* Floating Matrix Floor Grid */}
        <ellipse cx="120" cy="148" rx="85" ry="22" fill="#0E1722" stroke="#263440" strokeWidth="1" />
        <ellipse cx="120" cy="148" rx="60" ry="15" fill="#13202C" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="4 3" />
        {/* Tiered Pedestal Base */}
        <polygon points="120,118 185,135 120,152 55,135" fill="#1B2530" stroke="#35E6B5" strokeWidth="1.4" />
        <polygon points="120,110 170,124 120,138 70,124" fill="#101923" stroke="#65F58A" strokeWidth="1.6" />
        {/* 3D Mortarboard Cap */}
        <polygon points="120,68 185,84 120,100 55,84" fill="#101923" stroke="#35E6B5" strokeWidth="2.4" />
        <polygon points="120,74 175,87 120,100 65,87" fill="#1A2D3C" stroke="#65F58A" strokeWidth="1" />
        {/* Cap Skull Under-Bevel */}
        <path d="M 88 94 C 88 112 152 112 152 94" fill="#0E1620" stroke="#35E6B5" strokeWidth="1.5" />
        {/* Golden Hanging Tassel */}
        <circle cx="120" cy="84" r="3.5" fill="#FBBF24" />
        <path d="M 120 84 Q 155 88 162 108" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <rect x="159" y="106" width="6" height="12" rx="1.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
        {/* Vertical Translucent Code Screen (Left) */}
        <g transform="translate(30, 40)">
          <rect x="0" y="0" width="50" height="65" rx="4" fill="#0B131C" fillOpacity="0.85" stroke="#35E6B5" strokeWidth="1" />
          <line x1="6" y1="12" x2="42" y2="12" stroke="#65F58A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="#35E6B5" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="28" x2="44" y2="28" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="36" x2="28" y2="36" stroke="#65F58A" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="44" x2="38" y2="44" stroke="#35E6B5" strokeWidth="1" strokeLinecap="round" />
        </g>
        {/* Vertical Translucent Code Screen (Right) */}
        <g transform="translate(160, 48)">
          <rect x="0" y="0" width="48" height="60" rx="4" fill="#0B131C" fillOpacity="0.85" stroke="#65F58A" strokeWidth="1" />
          <line x1="6" y1="10" x2="40" y2="10" stroke="#35E6B5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="18" x2="30" y2="18" stroke="#65F58A" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="26" x2="42" y2="26" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="34" x2="25" y2="34" stroke="#35E6B5" strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );

  // Art 2: Holographic Golden Wireframe Globe
  const renderArt2 = () => (
    <div className="relative w-full h-full min-h-[170px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/12 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 200 200" className="w-full max-w-[190px] h-auto drop-shadow-[0_0_28px_rgba(245,158,11,0.5)]">
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#1B2530" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B121B" stopOpacity="0.95" />
          </radialGradient>
        </defs>
        {/* Globe Base Sphere */}
        <circle cx="100" cy="100" r="68" fill="url(#globeGlow)" stroke="#F59E0B" strokeWidth="1.8" />
        {/* Latitude & Longitude Wireframe Grids */}
        <ellipse cx="100" cy="100" rx="68" ry="30" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.75" />
        <ellipse cx="100" cy="100" rx="68" ry="52" fill="none" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />
        <ellipse cx="100" cy="100" rx="30" ry="68" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.75" />
        <ellipse cx="100" cy="100" rx="50" ry="68" fill="none" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />
        <line x1="32" y1="100" x2="168" y2="100" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.8" />
        {/* Glowing Network Nodes */}
        <circle cx="70" cy="85" r="3.5" fill="#FFFFFF" />
        <circle cx="70" cy="85" r="6" fill="none" stroke="#FBBF24" strokeWidth="1" />
        <circle cx="128" cy="78" r="3" fill="#FBBF24" />
        <circle cx="140" cy="115" r="4" fill="#FFFFFF" />
        <circle cx="140" cy="115" r="7" fill="none" stroke="#F59E0B" strokeWidth="1" />
        <circle cx="95" cy="132" r="3" fill="#FBBF24" />
        {/* Golden Orbital Ring */}
        <ellipse cx="100" cy="100" rx="88" ry="24" fill="none" stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="6 4" transform="rotate(-25 100 100)" />
      </svg>
    </div>
  );

  // Art 3: Bastion Glass Shield with Glowing Padlock
  const renderArt3 = () => (
    <div className="relative w-full h-full min-h-[150px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35E6B5]/15 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 200 180" className="w-full max-w-[190px] h-auto drop-shadow-[0_0_25px_rgba(53,230,181,0.5)]">
        {/* Cyber Floor Grid */}
        <ellipse cx="100" cy="155" rx="75" ry="16" fill="#0C141D" stroke="#263440" strokeWidth="1" />
        {/* Bastion Glass Shield Outer Contour */}
        <path
          d="M 100 25 Q 152 30 156 68 Q 156 112 100 142 Q 44 112 44 68 Q 48 30 100 25 Z"
          fill="#101D28"
          fillOpacity="0.85"
          stroke="#35E6B5"
          strokeWidth="2.5"
        />
        {/* Inner Facet / Refractive Glass */}
        <path
          d="M 100 35 Q 140 40 144 72 Q 144 105 100 130 Q 56 105 56 72 Q 60 40 100 35 Z"
          fill="#142634"
          stroke="#65F58A"
          strokeWidth="1.5"
        />
        {/* Center Padlock Shackle */}
        <path
          d="M 88 78 V 65 A 12 12 0 0 1 112 65 V 78"
          fill="none"
          stroke="#65F58A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Padlock Body */}
        <rect x="80" y="76" width="40" height="32" rx="5" fill="#1B2E3D" stroke="#35E6B5" strokeWidth="2" />
        <circle cx="100" cy="89" r="3.5" fill="#65F58A" />
        <line x1="100" y1="92" x2="100" y2="100" stroke="#65F58A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Floating Matrix Screen Backdrop */}
        <g transform="translate(135, 40)">
          <rect x="0" y="0" width="35" height="45" rx="3" fill="#0B131C" fillOpacity="0.7" stroke="#35E6B5" strokeWidth="0.8" />
          <line x1="5" y1="8" x2="28" y2="8" stroke="#65F58A" strokeWidth="1" />
          <line x1="5" y1="14" x2="22" y2="14" stroke="#35E6B5" strokeWidth="1" />
          <line x1="5" y1="20" x2="30" y2="20" stroke="#94A3B8" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );

  // Art 4: Red Alert Laptop Terminal with Hazard Triangle
  const renderArt4 = () => (
    <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-[#EF4444]/15 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 220 180" className="w-full max-w-[200px] h-auto drop-shadow-[0_0_28px_rgba(239,68,68,0.55)]">
        {/* Cyber Base */}
        <ellipse cx="110" cy="150" rx="80" ry="18" fill="#150E12" stroke="#451A20" strokeWidth="1" />
        {/* Laptop Base */}
        <polygon points="50,140 170,140 185,158 35,158" fill="#201115" stroke="#EF4444" strokeWidth="1.6" />
        <polygon points="65,142 155,142 165,152 55,152" fill="#140A0D" stroke="#7F1D1D" strokeWidth="1" />
        {/* Red Illuminated Trackpad */}
        <rect x="100" y="154" width="20" height="2" fill="#F87171" />
        {/* Laptop Screen */}
        <polygon points="55,138 165,138 158,62 62,62" fill="#0E0709" stroke="#EF4444" strokeWidth="2" />
        <polygon points="62,134 158,134 152,68 68,68" fill="#180C10" />
        {/* 3D Glowing Red Hazard Warning Triangle */}
        <polygon points="110,76 138,122 82,122" fill="#991B1B" stroke="#F87171" strokeWidth="2.5" />
        <circle cx="110" cy="98" r="2.5" fill="#FFFFFF" />
        <line x1="110" y1="104" x2="110" y2="114" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Red Matrix Alert Lines */}
        <line x1="72" y1="78" x2="92" y2="78" stroke="#EF4444" strokeWidth="1" />
        <line x1="72" y1="84" x2="96" y2="84" stroke="#7F1D1D" strokeWidth="1" />
        <line x1="124" y1="78" x2="148" y2="78" stroke="#EF4444" strokeWidth="1" />
        <line x1="126" y1="84" x2="146" y2="84" stroke="#7F1D1D" strokeWidth="1" />
      </svg>
    </div>
  );

  // Art 5: Open Cyber Grimoire with Holographic Brain
  const renderArt5 = () => (
    <div className="relative w-full h-full min-h-[145px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#65F58A]/12 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 240 180" className="w-full max-w-[215px] h-auto drop-shadow-[0_0_25px_rgba(101,245,138,0.45)]">
        {/* Floor Horizon */}
        <ellipse cx="120" cy="150" rx="80" ry="16" fill="#0C141D" stroke="#263440" strokeWidth="1" />
        {/* Open Cyber Grimoire / Book Left & Right Pages */}
        <polygon points="120,135 60,122 68,90 120,105" fill="#14212D" stroke="#35E6B5" strokeWidth="1.6" />
        <polygon points="120,135 180,122 172,90 120,105" fill="#182736" stroke="#65F58A" strokeWidth="1.6" />
        {/* Book Spine */}
        <line x1="120" y1="105" x2="120" y2="135" stroke="#65F58A" strokeWidth="2" />
        {/* Holographic Glowing Lines on Pages */}
        <line x1="76" y1="102" x2="110" y2="110" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="78" y1="110" x2="108" y2="118" stroke="#65F58A" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="130" y1="110" x2="162" y2="102" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="132" y1="118" x2="160" y2="110" stroke="#35E6B5" strokeWidth="1" strokeOpacity="0.7" />
        {/* 3D Floating Holographic Brain / Neural Network */}
        <g transform="translate(120, 65)">
          <ellipse cx="0" cy="0" rx="26" ry="20" fill="#101F29" stroke="#65F58A" strokeWidth="1.8" />
          {/* Brain Lobes & Synaptic Nodes */}
          <path d="M -18 -4 Q -10 -16 0 -8 Q 10 -16 18 -4 Q 24 10 0 16 Q -24 10 -18 -4 Z" fill="none" stroke="#35E6B5" strokeWidth="1.4" />
          <path d="M 0 -8 V 16" stroke="#65F58A" strokeWidth="1.2" />
          <circle cx="-10" cy="-2" r="2.5" fill="#65F58A" />
          <circle cx="10" cy="-2" r="2.5" fill="#65F58A" />
          <circle cx="-6" cy="8" r="2" fill="#35E6B5" />
          <circle cx="6" cy="8" r="2" fill="#35E6B5" />
          <circle cx="0" cy="-10" r="2" fill="#00FFA3" />
        </g>
        {/* Holographic Matrices */}
        <g transform="translate(180, 50)">
          <rect x="0" y="0" width="38" height="50" rx="3" fill="#0B131C" fillOpacity="0.8" stroke="#35E6B5" strokeWidth="1" />
          <line x1="5" y1="10" x2="30" y2="10" stroke="#65F58A" strokeWidth="1.2" />
          <line x1="5" y1="18" x2="25" y2="18" stroke="#35E6B5" strokeWidth="1" />
          <line x1="5" y1="26" x2="32" y2="26" stroke="#94A3B8" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );

  // Art 6: Panoramic Mountain Summit with Golden Illuminated Path & Flag
  const renderArt6 = () => (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-[#F59E0B]/20 via-[#F59E0B]/5 to-transparent rounded-2xl" />
      <svg viewBox="0 0 340 180" className="w-full h-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.55)]">
        <defs>
          <linearGradient id="peakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A1E14" />
            <stop offset="50%" stopColor="#1B1612" />
            <stop offset="100%" stopColor="#0B0E14" />
          </linearGradient>
        </defs>
        {/* Mountain Backdrop Ridges */}
        <polygon points="40,165 110,110 180,165" fill="#131720" stroke="#263440" strokeWidth="1" />
        <polygon points="120,165 240,65 330,165" fill="url(#peakGrad)" stroke="#F59E0B" strokeWidth="1.5" />
        <polygon points="210,165 290,105 340,165" fill="#181922" stroke="#473B28" strokeWidth="1" />
        {/* Winding Luminous Golden Pathway to Summit */}
        <path
          d="M 60 165 Q 120 155 150 142 T 210 115 T 235 78 L 240 65"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="drop-shadow(0 0 10px #F59E0B)"
        />
        {/* Summit Glowing Flagpole & Flag */}
        <line x1="240" y1="65" x2="240" y2="40" stroke="#FBBF24" strokeWidth="2.5" />
        <polygon points="240,40 262,48 240,56" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1" />
        <circle cx="240" cy="39" r="2.5" fill="#FFFFFF" />
        {/* Golden Radiance Aura at Summit */}
        <circle cx="240" cy="48" r="18" fill="none" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        <circle cx="240" cy="48" r="28" fill="none" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.25" />
      </svg>
    </div>
  );

  // Art 7: Circular Radar Reticle HUD with Checkmark (✔)
  const renderArt7 = () => (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#00FFA3]/15 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 200 180" className="w-full max-w-[180px] h-auto drop-shadow-[0_0_26px_rgba(0,255,163,0.5)]">
        {/* Outer Coordinate Ticks Ring */}
        <circle cx="100" cy="90" r="66" fill="#0C141D" stroke="#263440" strokeWidth="1.5" />
        <circle cx="100" cy="90" r="54" fill="none" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="4 4" />
        {/* Inner Radar Target Ring */}
        <circle cx="100" cy="90" r="42" fill="#11222E" stroke="#65F58A" strokeWidth="2" />
        {/* Crosshair Lines */}
        <line x1="100" y1="28" x2="100" y2="42" stroke="#65F58A" strokeWidth="2" />
        <line x1="100" y1="138" x2="100" y2="152" stroke="#65F58A" strokeWidth="2" />
        <line x1="38" y1="90" x2="52" y2="90" stroke="#65F58A" strokeWidth="2" />
        <line x1="148" y1="90" x2="162" y2="90" stroke="#65F58A" strokeWidth="2" />
        {/* Central Luminous Green Checkmark (✔) */}
        <circle cx="100" cy="90" r="24" fill="#1A3338" stroke="#00FFA3" strokeWidth="2" />
        <path d="M 90 90 L 97 97 L 112 82" fill="none" stroke="#65F58A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Radar Sweep Ray */}
        <line x1="100" y1="90" x2="140" y2="58" stroke="#00FFA3" strokeWidth="1.8" strokeOpacity="0.8" />
      </svg>
    </div>
  );

  // Art 8: Isometric Cybernetic Vault Cube on Tiered Steps
  const renderArt8 = () => (
    <div className="relative w-full h-full min-h-[145px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#F59E0B]/15 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 220 180" className="w-full max-w-[200px] h-auto drop-shadow-[0_0_26px_rgba(245,158,11,0.5)]">
        {/* Tiered Hexagonal Steps */}
        <polygon points="110,125 170,140 110,155 50,140" fill="#131B24" stroke="#263440" strokeWidth="1" />
        <polygon points="110,115 160,128 110,140 60,128" fill="#1B2430" stroke="#F59E0B" strokeWidth="1.2" />
        {/* 3D Isometric Cyber Vault Cube */}
        {/* Top Face */}
        <polygon points="110,65 145,82 110,98 75,82" fill="#243342" stroke="#FBBF24" strokeWidth="1.8" />
        {/* Right Face */}
        <polygon points="110,98 145,82 145,118 110,134" fill="#16202A" stroke="#F59E0B" strokeWidth="1.8" />
        {/* Left Face */}
        <polygon points="75,82 110,98 110,134 75,118" fill="#101923" stroke="#D97706" strokeWidth="1.8" />
        {/* Circuit Inscription on Top Face */}
        <polygon points="110,74 130,83 110,92 90,83" fill="#F59E0B" fillOpacity="0.8" />
        <circle cx="110" cy="83" r="3" fill="#FFFFFF" />
        {/* Circuit Lines on Front Faces */}
        <line x1="92" y1="98" x2="92" y2="120" stroke="#FBBF24" strokeWidth="1.4" />
        <line x1="128" y1="98" x2="128" y2="120" stroke="#FBBF24" strokeWidth="1.4" />
        {/* Floating Code Hologram */}
        <g transform="translate(155, 45)">
          <rect x="0" y="0" width="40" height="48" rx="3" fill="#0B131C" fillOpacity="0.8" stroke="#F59E0B" strokeWidth="0.8" />
          <line x1="5" y1="8" x2="32" y2="8" stroke="#FBBF24" strokeWidth="1" />
          <line x1="5" y1="15" x2="25" y2="15" stroke="#F59E0B" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );

  // Art 9: Hooded Operator in Multi-Screen Command Matrix
  const renderArt9 = () => (
    <div className="relative w-full h-full min-h-[145px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#35E6B5]/15 via-transparent to-transparent rounded-2xl" />
      <svg viewBox="0 0 240 180" className="w-full max-w-[215px] h-auto drop-shadow-[0_0_24px_rgba(53,230,181,0.45)]">
        {/* Workstation Console */}
        <ellipse cx="120" cy="155" rx="85" ry="16" fill="#0C141D" stroke="#263440" strokeWidth="1" />
        {/* Curved Multi-Screen Terminal Background */}
        <g transform="translate(35, 45)">
          <rect x="0" y="0" width="45" height="60" rx="3" fill="#0B131C" stroke="#35E6B5" strokeWidth="1" />
          <line x1="5" y1="10" x2="38" y2="10" stroke="#65F58A" strokeWidth="1.2" />
          <line x1="5" y1="18" x2="28" y2="18" stroke="#35E6B5" strokeWidth="1" />
          <line x1="5" y1="26" x2="35" y2="26" stroke="#94A3B8" strokeWidth="1" />
        </g>
        <g transform="translate(160, 45)">
          <rect x="0" y="0" width="45" height="60" rx="3" fill="#0B131C" stroke="#65F58A" strokeWidth="1" />
          <line x1="5" y1="10" x2="36" y2="10" stroke="#35E6B5" strokeWidth="1.2" />
          <line x1="5" y1="18" x2="26" y2="18" stroke="#65F58A" strokeWidth="1" />
          <line x1="5" y1="26" x2="38" y2="26" stroke="#94A3B8" strokeWidth="1" />
        </g>
        {/* Hooded Cyber Operator Silhouette */}
        <path
          d="M 90 155 C 90 120 100 85 120 80 C 140 85 150 120 150 155 Z"
          fill="#162330"
          stroke="#35E6B5"
          strokeWidth="1.8"
        />
        {/* Hood Cavity */}
        <path d="M 105 102 Q 120 95 135 102 Q 130 124 120 128 Q 110 124 105 102 Z" fill="#080F16" />
        {/* Glowing Cyan Visor Line */}
        <line x1="108" y1="112" x2="132" y2="112" stroke="#65F58A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );

  // Art 10: Golden Star Medal Trophy on Multi-Tiered Podium
  const renderArt10 = () => (
    <div className="relative w-full h-full min-h-[145px] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-[#F59E0B]/20 via-[#FBBF24]/5 to-transparent rounded-2xl" />
      <svg viewBox="0 0 220 180" className="w-full max-w-[200px] h-auto drop-shadow-[0_0_28px_rgba(245,158,11,0.55)]">
        {/* Tiered Circular Podium */}
        <ellipse cx="110" cy="155" rx="70" ry="18" fill="#18202A" stroke="#263440" strokeWidth="1" />
        <ellipse cx="110" cy="142" rx="55" ry="14" fill="#202A38" stroke="#D97706" strokeWidth="1.4" />
        <ellipse cx="110" cy="130" rx="40" ry="10" fill="#2A3748" stroke="#F59E0B" strokeWidth="1.8" />
        {/* Star Medal Crest Halo */}
        <circle cx="110" cy="78" r="28" fill="#1C1810" stroke="#FBBF24" strokeWidth="2.4" />
        <circle cx="110" cy="78" r="22" fill="#2D2312" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* 5-Pointed Golden Star */}
        <polygon
          points="110,60 115,72 128,73 118,82 122,94 110,87 98,94 102,82 92,73 105,72"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="0.8"
        />
        {/* Vertical Golden Beams of Light */}
        <line x1="90" y1="35" x2="90" y2="130" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 4" />
        <line x1="130" y1="35" x2="130" y2="130" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 4" />
      </svg>
    </div>
  );

  /* =========================================================================
     INDIVIDUAL VARIANT TEMPLATES (MATCHING EXACT ROW & COL LAYOUTS)
     ========================================================================= */

  // CARD 1: Horizontal Mint/Cyan (Beveled Top-Left & Bottom-Right)
  if (v === 1) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#35E6B5]/40 hover:border-[#65F58A] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(53,230,181,0.22)] cyber-clip-diagonal-both ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#35E6B5]/10 border border-[#35E6B5]/40 text-[#35E6B5]">
              {tag}
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            {renderArt1()}
          </div>
        </div>

        {/* Footer: 3 Metadata items + Circular Action Arrow Button */}
        <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#35E6B5]" />
              <span className="text-[11px] text-slate-300">{meta[0] || '8 Weeks'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#65F58A]" />
              <span className="text-[11px] text-slate-300">{meta[1] || '14h Hands-on'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#35E6B5]" />
              <span className="text-[11px] text-slate-300">{meta[2] || 'Browser SIEM'}</span>
            </div>
          </div>

          <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#35E6B5]/60 hover:bg-[#65F58A] hover:text-black text-[#35E6B5] shadow-[0_0_15px_rgba(53,230,181,0.3)] shrink-0" />
        </div>
      </div>
    );
  }

  // CARD 2: Tall Vertical Amber (Wireframe Globe + Full-Width Pill Button)
  if (v === 2) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/40 hover:border-[#FBBF24] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(245,158,11,0.22)] cyber-clip-corner-top-left ${className}`}
      >
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F59E0B]">
            {tag}
          </span>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#FBBF24] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Holographic 3D Globe */}
          {renderArt2()}

          {/* Vertical Stacked Metadata List */}
          <div className="space-y-2 pt-2 border-t border-[#263440]/80 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-slate-300">
              <User className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="text-[11px] truncate">{meta[0] || '1,420 Enrolled Defenders'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Monitor className="w-4 h-4 text-[#FBBF24] shrink-0" />
              <span className="text-[11px] truncate">{meta[1] || '100% Browser Cloud Workstations'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <FileText className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="text-[11px] truncate">{meta[2] || 'MITRE ATT&CK Framework Mapping'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Glowing Amber Pill Button with Arrow on Right */}
        <div className="mt-6 pt-4 border-t border-[#263440]">
          <Link
            to={actionHref}
            onClick={onClick}
            className="w-full py-2.5 px-4 rounded-full bg-[#F59E0B]/15 hover:bg-[#F59E0B] text-[#FBBF24] hover:text-black border border-[#F59E0B]/50 font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-between group/pill shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            <span>{actionText}</span>
            <span className="w-6 h-6 rounded-full bg-[#101923] text-[#F59E0B] group-hover/pill:bg-black group-hover/pill:text-[#FBBF24] flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // CARD 3: Compact Square Mint (Bastion Glass Shield & Padlock)
  if (v === 3) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#35E6B5]/40 hover:border-[#65F58A] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(53,230,181,0.22)] rounded-2xl ${className}`}
      >
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#35E6B5]/10 border border-[#35E6B5]/40 text-[#35E6B5]">
            {tag}
          </span>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* 3D Glass Shield Art */}
          {renderArt3()}
        </div>

        {/* Footer: 3 Feature Badges + Circular Action Arrow Button */}
        <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between gap-2">
          <div className="grid grid-cols-3 gap-2 flex-1 text-center font-mono text-[10px]">
            <div className="p-1.5 rounded-lg bg-[#1B2530] border border-[#263440] flex flex-col items-center">
              <FileText className="w-3.5 h-3.5 text-[#35E6B5] mb-0.5" />
              <span className="text-slate-300 truncate w-full">{badges[0] || 'OWASP Top 10'}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#1B2530] border border-[#263440] flex flex-col items-center">
              <Shield className="w-3.5 h-3.5 text-[#65F58A] mb-0.5" />
              <span className="text-slate-300 truncate w-full">{badges[1] || 'WAF Defense'}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#1B2530] border border-[#263440] flex flex-col items-center">
              <BarChart2 className="w-3.5 h-3.5 text-[#35E6B5] mb-0.5" />
              <span className="text-slate-300 truncate w-full">{badges[2] || 'API Audits'}</span>
            </div>
          </div>

          <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#35E6B5]/60 hover:bg-[#65F58A] hover:text-black text-[#35E6B5] shadow-[0_0_15px_rgba(53,230,181,0.3)] shrink-0 ml-2" />
        </div>
      </div>
    );
  }

  // CARD 4: Tall Vertical Crimson Red Alert Terminal
  if (v === 4) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#EF4444]/45 hover:border-[#F87171] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(239,68,68,0.22)] cyber-clip-corner-top-right ${className}`}
      >
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#F87171]">
            {tag}
          </span>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#F87171] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* 3D Red Alert Workstation Art */}
          {renderArt4()}
        </div>

        {/* Bottom Red Circular Arrow Action */}
        <div className="mt-6 pt-4 border-t border-[#7F1D1D]/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#F87171]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>Strict Focus Monitor</span>
          </div>
          <ActionButton className="w-9 h-9 rounded-full bg-[#1A0D10] border border-[#EF4444]/60 hover:bg-[#EF4444] hover:text-white text-[#F87171] shadow-[0_0_15px_rgba(239,68,68,0.3)] shrink-0" />
        </div>
      </div>
    );
  }

  // CARD 5: Horizontal Emerald (Open Cyber Grimoire & Neural Brain + Bottom-Left Arrow)
  if (v === 5) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#65F58A]/40 hover:border-[#00FFA3] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(101,245,138,0.22)] cyber-clip-corner-top-right ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#65F58A]/10 border border-[#65F58A]/40 text-[#65F58A]">
              {tag}
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              {description}
            </p>
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-[#1B2530] text-[10px] font-mono text-slate-300 border border-[#263440]">
                {badges[0] || 'Memory Volatility'}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1B2530] text-[10px] font-mono text-slate-300 border border-[#263440]">
                {badges[1] || 'Sigma Correlation'}
              </span>
            </div>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            {renderArt5()}
          </div>
        </div>

        {/* Footer: Bottom-Left Arrow Button (Matches reference image!) */}
        <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between">
          <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#65F58A]/60 hover:bg-[#65F58A] hover:text-black text-[#65F58A] shadow-[0_0_15px_rgba(101,245,138,0.3)] shrink-0" />
          <div className="text-[11px] font-mono text-[#94A3B8]">
            {meta[0] || 'Interactive Playbook Labs'}
          </div>
        </div>
      </div>
    );
  }

  // CARD 6: Panoramic Ultra-Wide Banner (Mountain Summit with Golden Pathway & Flag)
  if (v === 6) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-8 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/45 hover:border-[#FBBF24] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(245,158,11,0.25)] rounded-2xl ${className}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FBBF24]">
              {tag}
            </span>
            <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white leading-tight group-hover:text-[#FBBF24] transition-colors">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            {renderArt6()}
          </div>
        </div>

        {/* Footer: 3 Metadata items + Far-Right Golden Arrow */}
        <div className="mt-6 pt-5 border-t border-[#263440] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-slate-200">{meta[0] || '1,420 Active Cohort Defenders'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-slate-200">{meta[1] || '12 Weeks • 48 Hours'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-slate-200">{meta[2] || 'CRSS Credential'}</span>
            </div>
          </div>

          <ActionButton className="w-10 h-10 rounded-full bg-[#101923] border border-[#F59E0B]/60 hover:bg-[#F59E0B] hover:text-black text-[#FBBF24] shadow-[0_0_20px_rgba(245,158,11,0.35)] shrink-0 self-end sm:self-auto" />
        </div>
      </div>
    );
  }

  // CARD 7: Horizontal Neon Green with Radar HUD & Full-Width Progress Bar
  if (v === 7) {
    const progressVal = progress !== null ? progress : 78;
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#65F58A]/45 hover:border-[#00FFA3] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(101,245,138,0.22)] cyber-clip-corner-top-left ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#65F58A]/10 border border-[#65F58A]/40 text-[#65F58A]">
              {tag}
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            {renderArt7()}
          </div>
        </div>

        {/* Bottom Full-Width Glowing Progress Bar with Percentage on Right */}
        <div className="mt-5 pt-4 border-t border-[#263440] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8]">Evaluation Readiness</span>
            <span className="text-[#65F58A] font-bold tabular-nums">{progressVal}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1B2530] overflow-hidden border border-[#263440]">
            <div
              className="h-full bg-gradient-to-r from-[#35E6B5] to-[#65F58A] rounded-full shadow-[0_0_12px_rgba(101,245,138,0.7)] transition-all duration-500"
              style={{ width: `${progressVal}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // CARD 8: Horizontal Amber with 3D Cyber Vault Cube
  if (v === 8) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/40 hover:border-[#FBBF24] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(245,158,11,0.22)] cyber-clip-notch-bottom ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F59E0B]">
              {tag}
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#FBBF24] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            {renderArt8()}
          </div>
        </div>

        {/* Footer: 3 Tech Icons + Far Right Amber Circular Arrow */}
        <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[11px] text-slate-300">{meta[0] || 'Immutable Hashes'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span className="text-[11px] text-slate-300">{meta[1] || 'Merkle Validated'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[11px] text-slate-300">{meta[2] || 'Tamper Proof'}</span>
            </div>
          </div>

          <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#F59E0B]/60 hover:bg-[#F59E0B] hover:text-black text-[#FBBF24] shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0" />
        </div>
      </div>
    );
  }

  // CARD 9: Landscape Cyber Teal with Hooded Operator Command Room
  if (v === 9) {
    return (
      <div
        className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#35E6B5]/40 hover:border-[#65F58A] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(53,230,181,0.22)] cyber-clip-diagonal-both ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#35E6B5]/10 border border-[#35E6B5]/40 text-[#35E6B5]">
              {tag}
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#65F58A] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            {renderArt9()}
          </div>
        </div>

        {/* Footer: Tech Pills + Far Right Cyan Circular Arrow */}
        <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#1B2530] text-slate-300 border border-[#263440]">
              {badges[0] || 'Threat Intel'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1B2530] text-slate-300 border border-[#263440]">
              {badges[1] || 'Network PCAPs'}
            </span>
          </div>

          <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#35E6B5]/60 hover:bg-[#65F58A] hover:text-black text-[#35E6B5] shadow-[0_0_15px_rgba(53,230,181,0.3)] shrink-0" />
        </div>
      </div>
    );
  }

  // CARD 10: Horizontal Golden Amber with Star Medal Trophy & Milestone Sockets
  return (
    <div
      className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/90 backdrop-blur-xl border border-[#F59E0B]/45 hover:border-[#FBBF24] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)] cyber-clip-corner-top-left ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 space-y-3 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FBBF24]">
            {tag}
          </span>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#FBBF24] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        <div className="md:col-span-5 flex items-center justify-center">
          {renderArt10()}
        </div>
      </div>

      {/* Footer: Trophy Icon + 4 Milestone Sockets + Far Right Amber Circular Arrow */}
      <div className="mt-5 pt-4 border-t border-[#263440] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-base">🏆</span>
          {/* Milestone circular sockets */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: sockets }).map((_, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full bg-[#1B2530] border border-[#F59E0B]/50 flex items-center justify-center text-[9px] text-[#FBBF24] font-mono"
                title={`Milestone ${idx + 1}`}
              >
                ●
              </span>
            ))}
          </div>
          <span className="text-[10px] font-mono text-[#94A3B8] hidden sm:inline">
            {sockets} Stages
          </span>
        </div>

        <ActionButton className="w-9 h-9 rounded-full bg-[#101923] border border-[#F59E0B]/60 hover:bg-[#F59E0B] hover:text-black text-[#FBBF24] shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0" />
      </div>
    </div>
  );
}
