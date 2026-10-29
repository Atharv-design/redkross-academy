import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Dashboardcn-inspired Enterprise KPI Card
 * Tailored for RedKross Academy Super Admin Operations Center.
 * Complies with strict Zero-Blue Obsidian Design System:
 * - #071018 Base, #101923 Card, #1B2530 Hover, #263440 Border
 * - Accents: #65F58A (Neon), #35E6B5 (Mint), #F43F5E (Alert), #F59E0B (Warning)
 * - Tabular figures & dynamic SVG trendline sparklines
 */
export default function KpiCard({
  title,
  value,
  subtitle,
  badge,
  change,
  trend = 'up', // 'up' | 'down' | 'neutral'
  timeframe = 'vs last 30d',
  icon: Icon,
  accent = 'neon', // 'neon' | 'mint' | 'rose' | 'amber'
  sparkline = [4, 7, 5, 8, 9, 12, 11, 15],
  onClick,
}) {
  // Accent color mappings
  const colorSchemes = {
    neon: {
      borderHover: 'hover:border-[#65F58A]/50',
      iconBg: 'bg-[#65F58A]/10 border-[#65F58A]/30 text-[#65F58A]',
      glow: 'group-hover:shadow-[0_0_25px_rgba(101,245,138,0.12)]',
      valueText: 'text-white',
      badgeBg: 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30',
      stroke: '#65F58A',
      fillStart: 'rgba(101, 245, 138, 0.25)',
      fillEnd: 'rgba(101, 245, 138, 0.0)',
    },
    mint: {
      borderHover: 'hover:border-[#35E6B5]/50',
      iconBg: 'bg-[#35E6B5]/10 border-[#35E6B5]/30 text-[#35E6B5]',
      glow: 'group-hover:shadow-[0_0_25px_rgba(53,230,181,0.12)]',
      valueText: 'text-[#35E6B5]',
      badgeBg: 'bg-[#35E6B5]/10 text-[#35E6B5] border-[#35E6B5]/30',
      stroke: '#35E6B5',
      fillStart: 'rgba(53, 230, 181, 0.25)',
      fillEnd: 'rgba(53, 230, 181, 0.0)',
    },
    rose: {
      borderHover: 'hover:border-rose-500/50',
      iconBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      glow: 'group-hover:shadow-[0_0_25px_rgba(244,63,94,0.12)]',
      valueText: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      stroke: '#FB7185',
      fillStart: 'rgba(244, 63, 94, 0.25)',
      fillEnd: 'rgba(244, 63, 94, 0.0)',
    },
    amber: {
      borderHover: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.12)]',
      valueText: 'text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      stroke: '#FCD34D',
      fillStart: 'rgba(245, 158, 11, 0.25)',
      fillEnd: 'rgba(245, 158, 11, 0.0)',
    },
  };

  const scheme = colorSchemes[accent] || colorSchemes.neon;

  // Build SVG Sparkline path
  const minVal = Math.min(...sparkline);
  const maxVal = Math.max(...sparkline);
  const range = maxVal - minVal || 1;
  const width = 120;
  const height = 36;
  const step = width / (sparkline.length - 1);

  const points = sparkline.map((val, idx) => {
    const x = idx * step;
    const y = height - ((val - minVal) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
  const gradientId = `kpi-grad-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-[#101923] border border-[#263440] p-5 transition-all duration-300 ${scheme.borderHover} ${scheme.glow} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Ambient Radial Gradient Accent on Hover */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
        style={{ backgroundColor: scheme.stroke }}
      />

      {/* Top Row: Title, Subtitle, and Icon */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-0.5">
          <span className="text-[12px] font-lora tracking-wide text-[#94A3B8] font-semibold block">
            {title}
          </span>
          {subtitle && (
            <span className="text-[11px] font-lora text-[#64748B] block truncate max-w-[150px]">
              {subtitle}
            </span>
          )}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl border flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${scheme.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Center Row: Big Metric Value & Sparkline */}
      <div className="flex items-end justify-between gap-2 my-2">
        <div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-lora tracking-tight tabular-nums ${scheme.valueText}`}>
            {value}
          </div>
        </div>

        {/* Embedded SVG Sparkline */}
        <div className="w-24 sm:w-28 h-9 flex-shrink-0">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scheme.stroke} stopOpacity="0.28" />
                <stop offset="100%" stopColor={scheme.stroke} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill={`url(#${gradientId})`} />
            <path
              d={pathD}
              fill="none"
              stroke={scheme.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Row: Delta Trend Badge & Context Footnote */}
      <div className="pt-3 border-t border-[#263440]/80 flex items-center justify-between text-[11px] font-lora">
        <div className="flex items-center gap-1.5">
          {badge ? (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold font-lora border ${scheme.badgeBg}`}>
              {badge}
            </span>
          ) : change ? (
            <span className={`flex items-center gap-1 font-semibold font-lora ${
              trend === 'up' ? 'text-[#65F58A]' : trend === 'down' ? 'text-rose-400' : 'text-[#94A3B8]'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3 text-[#94A3B8]" />}
              <span>{change}</span>
            </span>
          ) : null}
        </div>

        <span className="text-[11px] font-lora text-[#94A3B8] truncate">
          {timeframe}
        </span>
      </div>
    </motion.div>
  );
}
