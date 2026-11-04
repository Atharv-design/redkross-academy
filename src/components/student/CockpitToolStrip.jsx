import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Zap,
  ChevronRight,
  ChevronLeft,
  Shield,
  Globe
} from 'lucide-react';

function KaliDragonIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="currentColor">
      <path
        d="M 10 24 C 30 18, 55 22, 68 38 C 50 32, 28 34, 12 40 C 28 38, 52 42, 64 54 C 45 49, 25 52, 14 58 C 30 55, 52 60, 62 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 68 38 C 76 46, 85 45, 92 48 C 96 42, 92 38, 90 36 C 96 36, 102 42, 108 46 C 114 50, 110 54, 104 53 C 98 52, 92 56, 84 52 C 78 48, 70 44, 62 48 C 54 54, 52 66, 56 74 C 62 84, 76 86, 82 92 C 86 96, 84 100, 80 100 C 74 98, 68 94, 64 88 C 56 78, 52 70, 50 58 C 48 44, 56 34, 68 38 Z"
        fill="currentColor"
      />
      <circle cx="96" cy="43" r="3" fill="#FFA439" />
    </svg>
  );
}

/**
 * CockpitToolStrip.jsx
 * Sleek, vertical icon toolbar pinned on the right of the RedKross Learning Cockpit.
 * Houses:
 * - Tool #1: Tactical MicroVM Terminal (340+ verified commands & live autocomplete)
 * - Tool #2: CyberLab V3 (Authentic Kali Linux Web Desktop, DVWA, OWASP Juice Shop)
 */
export default function CockpitToolStrip({
  onOpenTerminal,
  isTerminalOpen,
  onOpenCyberLab,
  isCyberLabOpen,
  onCollapse
}) {
  const [hoveredTool, setHoveredTool] = useState(null);

  // Tools currently pinned to this strip
  const tools = [
    {
      id: 'terminal',
      label: 'Terminal',
      desc: 'Tactical MicroVM Sandbox & 340+ Command Arsenal',
      icon: TerminalIcon,
      onClick: onOpenTerminal,
      isActive: isTerminalOpen,
      badge: isTerminalOpen ? 'ACTIVE' : '340+',
      badgeColor: isTerminalOpen
        ? 'bg-[#FF7A00] text-[#071018] font-bold'
        : 'bg-[#1A1208] text-[#FF7A00] border border-[#FF7A00]/40'
    },
    {
      id: 'cyberlab',
      label: 'CyberLab V3',
      desc: 'Kali Linux Web Desktop, DVWA & OWASP Juice Shop',
      icon: KaliDragonIcon,
      onClick: onOpenCyberLab,
      isActive: isCyberLabOpen,
      badge: isCyberLabOpen ? 'ACTIVE' : 'V3',
      badgeColor: isCyberLabOpen
        ? 'bg-[#FFA439] text-[#071018] font-bold'
        : 'bg-[#0b1b26] text-[#FFA439] border border-[#FFA439]/40'
    }
  ];

  return (
    <aside
      className="w-14 lg:w-16 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-between py-4 bg-[#0C0A07]/95 backdrop-blur-xl border-l border-[#FF7A00]/20 flex-shrink-0 z-20 transition-all font-mono select-none shadow-2xl"
      aria-label="Tactical Cockpit Tool Strip"
    >
      {/* Top Header Logo */}
      <div className="flex flex-col items-center space-y-3 w-full">
        <div
          className="w-8 h-8 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.25)]"
          title="RedKross Tactical Tools"
        >
          <Zap className="w-4 h-4 fill-current" />
        </div>

        <div className="w-8 h-px bg-[#FF7A00]/20" />

        {/* Tools Icon Stack */}
        <div className="flex flex-col items-center space-y-3.5 w-full px-2 pt-1">
          {tools.map((t) => {
            const Icon = t.icon;
            const isHovered = hoveredTool === t.id;

            return (
              <div key={t.id} className="relative flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={t.onClick}
                  onMouseEnter={() => setHoveredTool(t.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer group ${
                    t.isActive
                      ? 'bg-[#FF7A00] text-[#071018] shadow-[0_0_15px_rgba(255,122,0,0.5)] font-bold scale-105'
                      : isHovered
                      ? 'bg-[#1A1208] text-[#FF7A00] border border-[#FF7A00]/60 scale-105'
                      : 'bg-[#060504] text-[#A3907C] border border-[#FF7A00]/20 hover:text-white hover:border-[#FF7A00]/40'
                  }`}
                  aria-label={t.label}
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

                  {/* Micro Indicator Dot if Active */}
                  {t.isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FFA439] border border-[#071018] animate-pulse" />
                  )}
                </button>

                {/* Badge (ACTIVE, 340+, or V3) */}
                {t.badge && !t.isActive && (
                  <span
                    className={`absolute -bottom-1 text-[8px] font-mono px-1 rounded-full font-bold pointer-events-none ${t.badgeColor}`}
                  >
                    {t.badge}
                  </span>
                )}

                {/* Instant Tooltip On Cursor Hover */}
                {isHovered && (
                  <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#061911] border border-[#FF7A00]/50 text-white shadow-2xl z-50 whitespace-nowrap pointer-events-none animate-fadeIn flex flex-col items-start">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold font-lora text-white">{t.label}</span>
                      {t.badge && (
                        <span className="text-[9px] font-mono text-[#FF7A00] font-bold">
                          [{t.badge}]
                        </span>
                      )}
                    </div>
                    {t.desc && (
                      <span className="text-[10px] font-mono text-[#A3907C] leading-tight pt-0.5">
                        {t.desc}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Strip Collapse Trigger */}
      {onCollapse && (
        <div className="w-full flex justify-center pb-2">
          <button
            type="button"
            onClick={onCollapse}
            className="p-1.5 rounded-lg text-[#A3907C] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Collapse Tool Strip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
}
