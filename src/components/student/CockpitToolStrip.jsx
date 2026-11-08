import React, { useState } from 'react';
import {
  Wrench,
  ChevronRight,
  Sparkles
} from 'lucide-react';

/**
 * CockpitToolStrip.jsx
 * Vertical icon toolbar pinned on the right of the RedKross Learning Cockpit.
 * Designed to hold module-specific verified cybersecurity tools.
 * In standby state when no module tools are configured.
 * 
 * Props:
 * - tools: Array of tool objects for the active module [{ id, label, desc, icon, onClick, badge, badgeColor, isActive }]
 * - onCollapse: Callback to collapse/expand the tool strip
 */
export default function CockpitToolStrip({
  tools = [],
  onCollapse
}) {
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <aside
      className="w-14 lg:w-16 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-between py-4 bg-[#080604]/95 backdrop-blur-2xl border-l border-[#FF7A00]/25 flex-shrink-0 z-20 transition-all font-mono select-none shadow-2xl"
      aria-label="Tactical Cockpit Tool Strip"
    >
      {/* Top Header Logo */}
      <div className="flex flex-col items-center space-y-3 w-full">
        <div
          className="w-8 h-8 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.25)]"
          title="RedKross Modular Tools Deck"
        >
          <Wrench className="w-4 h-4" />
        </div>

        <div className="w-8 h-px bg-[#FF7A00]/20" />

        {/* Tools Icon Stack */}
        <div className="flex flex-col items-center space-y-3.5 w-full px-2 pt-1">
          {tools && tools.length > 0 ? (
            tools.map((t) => {
              const Icon = t.icon || Wrench;
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

                    {t.badge && (
                      <span
                        className={`mt-1 text-[8px] font-mono px-1 py-0.2 rounded leading-none transition-colors ${
                          t.badgeColor || 'bg-[#1A1208] text-[#FFA439] border border-[#FF7A00]/40'
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </button>

                  {/* Popover Flyout Tooltip */}
                  {isHovered && (
                    <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 w-52 p-3 rounded-xl bg-[#0B0805]/98 border border-[#FF7A00]/40 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 pointer-events-none animate-fadeIn font-mono">
                      <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#FF7A00]/20">
                        <span className="text-xs font-bold text-white">{t.label}</span>
                        {t.badge && (
                          <span className={`text-[8px] px-1 py-0.5 rounded ${t.badgeColor || 'text-[#FFA439]'}`}>
                            {t.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#A3907C] leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Clean Standby State (All dummy tools removed, panel preserved) */
            <div className="relative flex items-center justify-center w-full">
              <div
                onMouseEnter={() => setHoveredTool('standby')}
                onMouseLeave={() => setHoveredTool(null)}
                className="p-2.5 rounded-xl border border-[#FF7A00]/20 bg-[#120E09]/60 text-[#A3907C] hover:text-[#FFA439] hover:border-[#FF7A00]/40 transition-all cursor-default flex flex-col items-center justify-center group"
                title="Module Tool Deck: Standby"
              >
                <Sparkles className="w-4 h-4 text-[#FF7A00]/60 group-hover:text-[#FF7A00] transition-colors" />
                <span className="mt-1 text-[7px] font-mono text-[#A3907C] tracking-wider uppercase">READY</span>
              </div>

              {hoveredTool === 'standby' && (
                <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 w-52 p-3 rounded-xl bg-[#0B0805]/98 border border-[#FF7A00]/40 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 pointer-events-none animate-fadeIn font-mono">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#FF7A00]/20">
                    <span className="text-xs font-bold text-white">Modular Tool Deck</span>
                    <span className="text-[8px] text-[#FFA439] bg-[#1A1208] px-1 py-0.5 rounded border border-[#FF7A00]/30">STANDBY</span>
                  </div>
                  <p className="text-[10px] text-[#A3907C] leading-relaxed">
                    Verified tools will be provisioned per module requirements.
                  </p>
                </div>
              )}
            </div>
          )}
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
