import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, Shield, Clock, BookOpen, CheckCircle2, Coins } from 'lucide-react';

/**
 * 10 Distinct Cyber Course Card Designs
 * Directly derived from user's reference image:
 * - Card 0: Neon Green Beveled Diagonal (Laptop Terminal)
 * - Card 1: Amber Top-Right Notch (Golden Shield & Padlock)
 * - Card 2: Neon Mint Dual Notch (Server Rack Towers)
 * - Card 3: Deep Teal Rounded (Orbital Network Wireframe Globe)
 * - Card 4: Amber Forensic Brackets (Magnifying Glass & Circuits)
 * - Card 5: Neon Green Hooded Operator (Console Terminal)
 * - Card 6: Amber Isometric Chip (Hardware Core Processor)
 * - Card 7: Neon Green Diagonal Slash (24/7 SOC Command Room)
 * - Card 8: Neon Cloud Servers (Volumetric Cloud & Racks)
 * - Card 9: Amber Graduation Terminal (Cap & Certificate Workstation)
 */

export default function CourseCardVariant({ course, variantIndex = 0, shape = 'auto' }) {
  if (!course) return null;

  // Modulo 10 ensures every course maps cleanly to one of the 10 designs
  const variant = (variantIndex % 10);
  const isAmber = [1, 4, 6, 9].includes(variant);

  // Fallback defaults
  const weeks = course.estimated_duration ? course.estimated_duration.replace(' Hours', 'h') : '12h';
  const skills = (course.learning_objectives && course.learning_objectives.length > 0)
    ? course.learning_objectives.slice(0, 4).map((s) => s.split(':')[0].substring(0, 24))
    : ['Incident Triage', 'Log Correlation', 'Defensive Response', 'Packet Analysis'];
  const credentialName = `Certified ${course.title?.split(' ')[0] || 'Cyber'} Specialist`;

  // Render 3D SVG Artwork according to variant (0-9)
  const renderArtwork = () => {
    switch (variant) {
      case 0:
        // Variant 0: Glowing Neon Green Laptop Terminal with Floating Code Matrix
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#65F58A]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_20px_rgba(101,245,138,0.5)]">
              {/* Pedestal Grid */}
              <ellipse cx="100" cy="115" rx="70" ry="18" fill="none" stroke="#65F58A" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
              <ellipse cx="100" cy="115" rx="45" ry="10" fill="#101923" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.5" />
              {/* Laptop Base */}
              <polygon points="50,110 150,110 165,124 35,124" fill="#1B2530" stroke="#65F58A" strokeWidth="1.5" />
              <polygon points="65,112 135,112 142,120 58,120" fill="#101923" stroke="#263440" strokeWidth="1" />
              <rect x="90" y="121" width="20" height="2" rx="1" fill="#65F58A" />
              {/* Laptop Screen */}
              <polygon points="55,108 145,108 140,42 60,42" fill="#071018" stroke="#65F58A" strokeWidth="1.8" />
              <polygon points="60,104 140,104 136,46 64,46" fill="#0B121B" />
              {/* Code Lines on Screen */}
              <line x1="68" y1="55" x2="105" y2="55" stroke="#65F58A" strokeWidth="2" strokeLinecap="round" />
              <line x1="68" y1="63" x2="128" y2="63" stroke="#35E6B5" strokeWidth="2" strokeLinecap="round" />
              <line x1="74" y1="71" x2="115" y2="71" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="74" y1="79" x2="132" y2="79" stroke="#65F58A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="68" y1="87" x2="98" y2="87" stroke="#35E6B5" strokeWidth="2" strokeLinecap="round" />
              <line x1="68" y1="95" x2="120" y2="95" stroke="#65F58A" strokeWidth="1.5" strokeLinecap="round" />
              {/* Floating Holographic Window */}
              <g transform="translate(115, 20)">
                <rect x="0" y="0" width="55" height="42" rx="4" fill="#101923" fillOpacity="0.85" stroke="#35E6B5" strokeWidth="1.2" />
                <rect x="4" y="4" width="8" height="2" fill="#65F58A" />
                <line x1="6" y1="12" x2="48" y2="12" stroke="#65F58A" strokeWidth="1.5" />
                <line x1="6" y1="18" x2="42" y2="18" stroke="#35E6B5" strokeWidth="1.5" />
                <line x1="6" y1="24" x2="35" y2="24" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="6" y1="30" x2="45" y2="30" stroke="#65F58A" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        );

      case 1:
        // Variant 1: Amber / Gold Glowing Shield with Keyhole Padlock on Isometric Pedestal
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_22px_rgba(245,158,11,0.55)]">
              {/* Stepped Hexagonal Pedestal */}
              <polygon points="100,105 160,118 100,132 40,118" fill="#1B2530" stroke="#F59E0B" strokeWidth="1.2" />
              <polygon points="100,98 150,110 100,122 50,110" fill="#101923" stroke="#FBBF24" strokeWidth="1.5" />
              {/* Glowing Ambient Rays */}
              <line x1="100" y1="30" x2="100" y2="98" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />
              {/* Shield Outline */}
              <path
                d="M 100 24 Q 135 28 140 58 Q 140 88 100 106 Q 60 88 60 58 Q 65 28 100 24 Z"
                fill="#182534"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              {/* Inner Shield Layer */}
              <path
                d="M 100 32 Q 128 35 132 60 Q 132 82 100 98 Q 68 82 68 60 Q 72 35 100 32 Z"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              {/* Golden Padlock in Center */}
              <rect x="88" y="58" width="24" height="20" rx="3" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1.5" />
              <path d="M 93 58 V 50 A 7 7 0 0 1 107 50 V 58" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="100" cy="66" r="2.5" fill="#071018" />
              <polygon points="98.5,67 101.5,67 101,73 99,73" fill="#071018" />
            </svg>
          </div>
        );

      case 2:
        // Variant 2: Neon Mint Server Rack Towers with Data Lines
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#35E6B5]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_20px_rgba(53,230,181,0.5)]">
              {/* Floor Matrix Grid */}
              <ellipse cx="100" cy="120" rx="75" ry="16" fill="#101923" stroke="#263440" strokeWidth="1" />
              {/* Server Rack Tower 1 (Center) */}
              <polygon points="75,45 105,32 135,45 105,58" fill="#1B2530" stroke="#35E6B5" strokeWidth="1.5" />
              <polygon points="75,45 105,58 105,115 75,102" fill="#14202C" stroke="#35E6B5" strokeWidth="1.5" />
              <polygon points="105,58 135,45 135,102 105,115" fill="#101923" stroke="#35E6B5" strokeWidth="1.5" />
              {/* Server Unit Slots & LEDs */}
              {[62, 74, 86, 98].map((y, idx) => (
                <g key={idx}>
                  <line x1="80" y1={y} x2="100" y2={y + 8} stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.8" />
                  <circle cx="83" cy={y + 1} r="1.5" fill="#65F58A" />
                  <line x1="110" y1={y + 8} x2="130" y2={y} stroke="#65F58A" strokeWidth="1" strokeOpacity="0.6" />
                  <circle cx="127" cy={y + 1} r="1.5" fill="#00FFA3" />
                </g>
              ))}
              {/* Floating Holographic Telemetry Cards */}
              <rect x="42" y="32" width="25" height="35" rx="3" fill="#101923" fillOpacity="0.8" stroke="#65F58A" strokeWidth="1" />
              <line x1="46" y1="38" x2="62" y2="38" stroke="#65F58A" strokeWidth="1.5" />
              <line x1="46" y1="44" x2="58" y2="44" stroke="#35E6B5" strokeWidth="1" />
              <line x1="46" y1="50" x2="64" y2="50" stroke="#65F58A" strokeWidth="1" />
            </svg>
          </div>
        );

      case 3:
        // Variant 3: Deep Cyber Teal Orbital Network Wireframe Globe
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00FFA3]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_22px_rgba(0,255,163,0.45)]">
              <ellipse cx="100" cy="122" rx="65" ry="14" fill="#101923" stroke="#263440" strokeWidth="1" />
              {/* Wireframe Globe */}
              <circle cx="100" cy="70" r="42" fill="#0B121B" stroke="#35E6B5" strokeWidth="1.8" />
              <ellipse cx="100" cy="70" rx="42" ry="18" fill="none" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.7" />
              <ellipse cx="100" cy="70" rx="18" ry="42" fill="none" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.7" />
              <ellipse cx="100" cy="70" rx="34" ry="34" fill="none" stroke="#35E6B5" strokeWidth="0.8" strokeDasharray="3 3" />
              {/* Tilted Orbital Ring */}
              <ellipse cx="100" cy="70" rx="58" ry="16" fill="none" stroke="#00FFA3" strokeWidth="1.8" transform="rotate(-25 100 70)" />
              {/* Satellite Data Nodes */}
              <circle cx="56" cy="50" r="3.5" fill="#65F58A" filter="drop-shadow(0 0 6px #00FFA3)" />
              <circle cx="144" cy="90" r="3.5" fill="#00FFA3" filter="drop-shadow(0 0 6px #65F58A)" />
              <circle cx="100" cy="38" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>
        );

      case 4:
        // Variant 4: Amber Forensic Magnifying Glass Inspecting Binary Circuits
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_22px_rgba(245,158,11,0.5)]">
              {/* Circuit Board Trace Lines */}
              <path d="M 40 100 L 75 100 L 90 115 L 140 115" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.4" />
              <path d="M 60 40 L 95 40 L 110 55 L 160 55" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="40" cy="100" r="2.5" fill="#F59E0B" />
              <circle cx="160" cy="55" r="2.5" fill="#FBBF24" />
              {/* Magnifying Glass Lens */}
              <circle cx="118" cy="62" r="32" fill="#14202C" fillOpacity="0.8" stroke="#F59E0B" strokeWidth="3" />
              <circle cx="118" cy="62" r="26" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
              {/* Hex Key Target inside lens */}
              <polygon points="118,50 128,56 128,68 118,74 108,68 108,56" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="118" cy="62" r="3" fill="#FBBF24" />
              {/* Handle angled down-left */}
              <line x1="96" y1="84" x2="62" y2="118" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
              <line x1="96" y1="84" x2="62" y2="118" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 5:
        // Variant 5: Neon Green Hooded Operator at Console
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#65F58A]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_20px_rgba(101,245,138,0.5)]">
              {/* Cyber Base Console */}
              <ellipse cx="100" cy="120" rx="70" ry="16" fill="#101923" stroke="#263440" strokeWidth="1" />
              {/* Hooded Silhouette */}
              <path
                d="M 68 120 C 68 95, 80 62, 100 58 C 120 62, 132 95, 132 120 Z"
                fill="#1B2530"
                stroke="#65F58A"
                strokeWidth="1.8"
              />
              <path
                d="M 85 75 Q 100 68 115 75 Q 110 92 100 95 Q 90 92 85 75 Z"
                fill="#071018"
              />
              {/* Neon Green Visor / Monocle */}
              <line x1="88" y1="82" x2="112" y2="82" stroke="#65F58A" strokeWidth="3" strokeLinecap="round" />
              {/* Holographic HUD in front */}
              <polygon points="50,118 150,118 160,128 40,128" fill="#14202C" stroke="#35E6B5" strokeWidth="1.2" />
              <rect x="65" y="98" width="70" height="20" rx="3" fill="#0B121B" stroke="#65F58A" strokeWidth="1" strokeDasharray="2 2" fillOpacity="0.8" />
              <line x1="72" y1="104" x2="110" y2="104" stroke="#65F58A" strokeWidth="1.5" />
              <line x1="72" y1="110" x2="95" y2="110" stroke="#35E6B5" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 6:
        // Variant 6: Amber Isometric Hardware Chip Processor
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_22px_rgba(245,158,11,0.55)]">
              {/* Motherboard Circuit Base */}
              <polygon points="100,108 165,124 100,138 35,124" fill="#101923" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" />
              {/* Main Chip Die */}
              <polygon points="100,72 145,86 100,100 55,86" fill="#1B2530" stroke="#F59E0B" strokeWidth="2" />
              <polygon points="100,72 145,86 145,95 100,81" fill="#14202C" stroke="#F59E0B" strokeWidth="1" />
              <polygon points="55,86 100,100 100,109 55,95" fill="#0E1620" stroke="#F59E0B" strokeWidth="1" />
              {/* Core Heat Spreader */}
              <polygon points="100,78 130,88 100,98 70,88" fill="#F59E0B" fillOpacity="0.8" stroke="#FBBF24" strokeWidth="1.5" />
              {/* Circuit Bus Pins */}
              {[-30, -15, 0, 15, 30].map((dx, i) => (
                <line key={i} x1={100 + dx} y1={92 + Math.abs(dx) * 0.2} x2={100 + dx * 1.5} y2={118} stroke="#FBBF24" strokeWidth="1" />
              ))}
              <circle cx="100" cy="88" r="3" fill="#FFFFFF" />
            </svg>
          </div>
        );

      case 7:
        // Variant 7: Neon Green 24/7 SOC Multi-Screen Control Room
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#65F58A]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_20px_rgba(101,245,138,0.5)]">
              {/* Threat Map Curved Video Wall */}
              <path d="M 30 45 Q 100 35 170 45 L 170 85 Q 100 75 30 85 Z" fill="#0B121B" stroke="#65F58A" strokeWidth="1.8" />
              {/* World Map Grids on Video Wall */}
              <ellipse cx="100" cy="60" rx="55" ry="15" fill="none" stroke="#35E6B5" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="75" cy="55" r="2.5" fill="#65F58A" />
              <circle cx="120" cy="62" r="2.5" fill="#00FFA3" />
              <circle cx="140" cy="58" r="2" fill="#F59E0B" />
              {/* SOC Analyst Desk Console */}
              <polygon points="45,115 155,115 140,95 60,95" fill="#1B2530" stroke="#65F58A" strokeWidth="1.2" />
              {/* Operator Monitors */}
              <rect x="70" y="82" width="26" height="15" rx="2" fill="#14202C" stroke="#35E6B5" strokeWidth="1" />
              <rect x="104" y="82" width="26" height="15" rx="2" fill="#14202C" stroke="#35E6B5" strokeWidth="1" />
            </svg>
          </div>
        );

      case 8:
        // Variant 8: Neon Green Volumetric Cloud Server Stacks
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#65F58A]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_20px_rgba(101,245,138,0.5)]">
              {/* Dual Server Stacks */}
              <g transform="translate(45, 75)">
                <rect x="0" y="0" width="45" height="42" rx="3" fill="#14202C" stroke="#65F58A" strokeWidth="1.4" />
                <line x1="6" y1="12" x2="39" y2="12" stroke="#35E6B5" strokeWidth="1" />
                <line x1="6" y1="24" x2="39" y2="24" stroke="#35E6B5" strokeWidth="1" />
                <circle cx="35" cy="6" r="1.5" fill="#00FFA3" />
                <circle cx="35" cy="18" r="1.5" fill="#65F58A" />
                <circle cx="35" cy="30" r="1.5" fill="#00FFA3" />
              </g>
              <g transform="translate(110, 75)">
                <rect x="0" y="0" width="45" height="42" rx="3" fill="#14202C" stroke="#35E6B5" strokeWidth="1.4" />
                <line x1="6" y1="12" x2="39" y2="12" stroke="#65F58A" strokeWidth="1" />
                <line x1="6" y1="24" x2="39" y2="24" stroke="#65F58A" strokeWidth="1" />
                <circle cx="35" cy="6" r="1.5" fill="#65F58A" />
                <circle cx="35" cy="18" r="1.5" fill="#00FFA3" />
                <circle cx="35" cy="30" r="1.5" fill="#65F58A" />
              </g>
              {/* Floating Volumetric Neon Cloud */}
              <path
                d="M 75 55 A 15 15 0 0 1 100 42 A 20 20 0 0 1 130 52 A 14 14 0 0 1 135 65 A 12 12 0 0 1 125 72 L 75 72 A 12 12 0 0 1 75 55 Z"
                fill="#1B2530"
                stroke="#65F58A"
                strokeWidth="2.2"
                filter="drop-shadow(0 0 12px #00FFA3)"
              />
              <path d="M 88 56 Q 100 50 115 56" fill="none" stroke="#35E6B5" strokeWidth="1.2" />
            </svg>
          </div>
        );

      case 9:
      default:
        // Variant 9: Amber Academic Graduation Cap Floating over Terminal Workstation
        return (
          <div className="relative w-full h-44 flex items-center justify-center overflow-hidden my-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-transparent rounded-xl" />
            <svg viewBox="0 0 200 140" className="w-44 h-auto drop-shadow-[0_0_22px_rgba(245,158,11,0.55)]">
              {/* Workstation Base */}
              <ellipse cx="100" cy="120" rx="65" ry="14" fill="#101923" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />
              {/* Glowing Monitor Display */}
              <polygon points="65,108 135,108 142,65 58,65" fill="#14202C" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Holographic Certificate Crest inside monitor */}
              <circle cx="100" cy="85" r="12" fill="none" stroke="#FBBF24" strokeWidth="1.2" />
              <line x1="75" y1="75" x2="125" y2="75" stroke="#F59E0B" strokeWidth="1" />
              <line x1="82" y1="95" x2="118" y2="95" stroke="#FBBF24" strokeWidth="1" />
              {/* Floating Mortarboard Cap */}
              <polygon points="100,32 145,45 100,58 55,45" fill="#1B2530" stroke="#F59E0B" strokeWidth="2.5" />
              <polygon points="100,45 130,53 100,61 70,53" fill="#F59E0B" fillOpacity="0.8" />
              <rect x="80" y="52" width="40" height="12" rx="2" fill="#14202C" stroke="#FBBF24" strokeWidth="1" />
              {/* Golden Tassel */}
              <line x1="100" y1="45" x2="142" y2="60" stroke="#FBBF24" strokeWidth="1.8" />
              <circle cx="142" cy="61" r="2.5" fill="#FBBF24" />
            </svg>
          </div>
        );
    }
  };

  // Card geometry clipping class
  const getClipClass = () => {
    switch (variant) {
      case 0:
      case 5:
        return 'cyber-clip-diagonal-both';
      case 1:
        return 'cyber-clip-corner-top-right';
      case 4:
        return 'cyber-clip-corner-top-left';
      case 6:
      case 9:
        return 'cyber-clip-notch-bottom';
      default:
        return 'rounded-2xl';
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[#101923]/80 backdrop-blur-xl border transition-all duration-400 ${
        isAmber
          ? 'border-[#263440] hover:border-[#F59E0B]/60 hover:shadow-[0_12px_40px_rgba(245,158,11,0.18)]'
          : 'border-[#263440] hover:border-[#65F58A]/60 hover:shadow-[0_12px_40px_rgba(101,245,138,0.18)]'
      } ${getClipClass()} hover:-translate-y-1.5`}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border ${
              isAmber
                ? 'bg-[#F59E0B]/10 border-[#F59E0B]/35 text-[#F59E0B]'
                : 'bg-[#65F58A]/10 border-[#65F58A]/35 text-[#65F58A]'
            }`}
          >
            {course.difficulty || 'Intermediate'}
          </span>
          <span className="text-xs font-mono text-[#94A3B8]">
            {course.estimated_duration || '14 Hours'}
          </span>
        </div>

        {/* Course Title with Royal Cinzel typography */}
        <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-[#65F58A] transition-colors">
          {course.title}
        </h3>

        {/* Brief Overview */}
        <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4">
          {course.overview}
        </p>

        {/* 3D Cyber Art Illustration */}
        {renderArtwork()}

        {/* Skills Validated Section */}
        <div className="mt-4 pt-4 border-t border-[#263440]/80">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-2 font-semibold">
            SKILLS VALIDATED
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1.5 rounded-lg bg-[#1B2530]/60 border border-[#263440] text-[11px] font-mono text-slate-300 truncate"
                title={skill}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Milestone Credential Row */}
      <div className="mt-6 pt-4 border-t border-[#263440] flex items-center justify-between">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider text-[#94A3B8]">
            MILESTONE CREDENTIAL
          </div>
          <div className={`text-xs font-royal font-bold ${isAmber ? 'text-[#F59E0B]' : 'text-[#65F58A]'} truncate max-w-[180px] sm:max-w-[220px]`}>
            {credentialName}
          </div>
        </div>

        {/* Circular Action Arrow */}
        <Link
          to={`/courses/${course.id}`}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            isAmber
              ? 'border-[#F59E0B]/50 bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black group-hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'border-[#65F58A]/50 bg-[#65F58A]/10 text-[#65F58A] group-hover:bg-[#65F58A] group-hover:text-black group-hover:scale-110 shadow-[0_0_15px_rgba(101,245,138,0.3)]'
          }`}
          aria-label={`View syllabus for ${course.title}`}
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
