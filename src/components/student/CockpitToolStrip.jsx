import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Zap,
  ChevronRight,
  ChevronLeft,
  Shield,
  Radio,
  Search
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
 * - Tool #1: Tactical Recon Hub (Target HUD, 4 Live Ports, Mission Flags, Payloads Arsenal)
 * - Tool #2: Tactical MicroVM Terminal (340+ verified commands & live autocomplete)
 * - Tool #3: CyberLab V3 (Authentic Kali Linux Web Desktop, DVWA, OWASP Juice Shop)
 * - Tool #4: Surface Recon Scanner (1-click Nmap target scan)
 * - Tool #5: Breach & OSINT Checker
 * - Tool #6: MITRE ATT&CK Matrix
 */
export default function CockpitToolStrip({
  onToggleTacticalInspector,
  isTacticalInspectorOpen,
  onOpenTerminal,
  isTerminalOpen,
  onOpenCyberLab,
  isCyberLabOpen,
  onOpenTerminalWithCommand,
  onCollapse
}) {
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    {
      id: 'recon',
      label: 'Tactical Recon Hub',
      desc: 'Target Host Matrix, Mission Flags & Payloads Arsenal',
      icon: Shield,
      onClick: onToggleTacticalInspector || onOpenTerminal,
      isActive: isTacticalInspectorOpen,
      badge: isTacticalInspectorOpen ? 'ACTIVE' : 'RECON',
      badgeColor: isTacticalInspectorOpen
        ? 'bg-[#FF7A00] text-black font-bold'
        : 'bg-[#1A1208] text-[#FFA439] border border-[#FF7A00]/40'
    },
    {
      id: 'terminal',
      label: 'Terminal',
      desc: 'Tactical MicroVM Sandbox & 340+ Command Arsenal',
      icon: TerminalIcon,
      onClick: onOpenTerminal,
      isActive: isTerminalOpen,
      badge: isTerminalOpen ? 'ACTIVE' : '340+',
      badgeColor: isTerminalOpen
        ? 'bg-[#FF7A00] text-black font-bold'
        : 'bg-[#1A1208] text-[#FFA439] border border-[#FF7A00]/40'
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
        ? 'bg-[#FFA439] text-black font-bold'
        : 'bg-black/60 text-[#FFA439] border border-[#FFA439]/40'
    },
    {
      id: 'scanner',
      label: 'Surface Recon Scanner',
      desc: 'Nmap Live Port Discovery & Service Matrix (10.10.11.205)',
      icon: Radio,
      onClick: () => {
        if (onOpenTerminalWithCommand) {
          onOpenTerminalWithCommand('nmap -sV -T4 10.10.11.205');
        } else {
          onOpenTerminal();
        }
      },
      isActive: false,
      badge: 'SCAN',
      badgeColor: 'bg-[#0E0C09] text-[#65F58A] border border-[#65F58A]/40'
    },
    {
      id: 'breach',
      label: 'Breach & OSINT Checker',
      desc: 'Credential Leak Database & Exposure Verifier',
      icon: Search,
      onClick: () => {
        if (onOpenTerminalWithCommand) {
          onOpenTerminalWithCommand('commands recon');
        } else {
          onOpenTerminal();
        }
      },
      isActive: false,
      badge: 'OSINT',
      badgeColor: 'bg-[#0E0C09] text-[#38BDF8] border border-[#38BDF8]/40'
    },
    {
      id: 'mitre',
      label: 'MITRE ATT&CK Matrix',
      desc: 'Threat Actor TTPs, APT Profiles & Kill Chain Explorer',
      icon: Zap,
      onClick: () => {
        if (onOpenTerminalWithCommand) {
          onOpenTerminalWithCommand('commands cti');
        } else {
          onOpenTerminal();
        }
      },
      isActive: false,
      badge: 'MATRIX',
      badgeColor: 'bg-[#0E0C09] text-[#FFA439] border border-[#FFA439]/40'
    }
  ];

  return (
    <aside
      className="w-14 lg:w-16 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-between py-4 bg-[#080604]/95 backdrop-blur-2xl border-l border-[#FF7A00]/25 flex-shrink-0 z-20 transition-all font-mono select-none shadow-2xl"
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
                  className={`relative p-2.5 rounded-xl border transition-all cursor-pointer group flex flex-col items-center justify-center ${
                    t.isActive
                      ? 'bg-[#FF7A00]/20 text-[#FFA439] border-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.35)] scale-105'
                      : 'bg-black/50 text-[#A3907C] border-white/10 hover:text-white hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 hover:scale-105'
                  }`}
                  aria-label={t.label}
                  title={t.label}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                  {/* Micro Badge Underneath */}
                  <span
                    className={`mt-1 text-[8px] font-mono px-1 py-0.2 rounded leading-none transition-colors ${
                      t.badgeColor
                    }`}
                  >
                    {t.badge}
                  </span>
                </button>

                {/* Popover Flyout Tooltip (Left Anchor) */}
                {isHovered && (
                  <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 w-52 p-3 rounded-xl bg-[#0B0805]/98 border border-[#FF7A00]/40 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 pointer-events-none animate-fadeIn">
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#FF7A00]/20">
                      <span className="text-xs font-bold text-white font-mono">{t.label}</span>
                      <span className={`text-[8px] font-mono px-1 py-0.5 rounded ${t.badgeColor}`}>
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A3907C] leading-relaxed font-mono">
                      {t.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center space-y-3 w-full px-2">
        <div className="w-8 h-px bg-[#FF7A00]/20" />

        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            className="p-2 rounded-xl text-[#A3907C] hover:text-[#FFA439] hover:bg-[#FF7A00]/10 transition-colors cursor-pointer"
            title="Collapse Tool Strip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
