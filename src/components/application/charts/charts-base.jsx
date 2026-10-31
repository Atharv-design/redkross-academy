import React from 'react';

/**
 * RedKross Academy Cyber-Theme Chart Tooltip
 * Renders glowing cyber dark-slate tooltip with emerald accent & Lora typography
 */
export const ChartTooltipContent = ({ active, payload, isPieChart = false }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];
  const data = item.payload || {};
  const color = data.color || item.color || '#65F58A';
  const name = item.name || data.name || data.label || 'Metric';
  const value = item.value ?? data.value ?? 0;
  const percentage = data.percentage ?? (data.total ? ((value / data.total) * 100).toFixed(1) : null);
  const extraNote = data.note || data.drop || null;

  return (
    <div className="z-50 min-w-[160px] rounded-xl bg-[#071018]/95 border border-[#65F58A]/35 p-3 shadow-[0_0_20px_rgba(7,16,24,0.9)] backdrop-blur-md font-mono text-xs animate-fadeIn select-none">
      <div className="flex items-center space-x-2 pb-1.5 border-b border-white/10">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: color, color }}
        />
        <span className="font-lora font-bold text-white text-xs truncate">
          {name}
        </span>
      </div>

      <div className="pt-2 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8BA2B5]">Count:</span>
          <span className="font-bold text-white tabular-nums">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
        </div>

        {percentage !== null && percentage !== undefined && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#72A88E]">Share:</span>
            <span className="font-bold text-[#65F58A] tabular-nums">
              {percentage}%
            </span>
          </div>
        )}

        {extraNote && (
          <div className="flex items-center justify-between text-[11px] pt-0.5 border-t border-white/5">
            <span className="text-[#8BA2B5]">Delta:</span>
            <span className={String(extraNote).startsWith('-') ? 'text-[#EF4444]' : 'text-[#35E6B5]'}>
              {extraNote}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * RedKross Academy Cyber-Theme Chart Legend
 * Renders cleanly aligned telemetry legend with zero-blue styling
 */
export const ChartLegendContent = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-col space-y-1.5 p-2 font-mono text-xs select-none">
      {payload.map((entry, index) => {
        const data = entry.payload || {};
        const color = data.color || entry.color || '#65F58A';
        const label = entry.value || data.name || data.label;
        const val = data.value;
        const pct = data.percentage;

        return (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between gap-3 text-xs py-0.5 hover:bg-white/5 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2 truncate">
              <span
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-[#C9EFE0] truncate font-medium text-[11px]">
                {label}
              </span>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0 text-[11px] tabular-nums">
              {val !== undefined && (
                <span className="text-white font-bold">{val}</span>
              )}
              {pct !== undefined && (
                <span className="text-[#72A88E]">({pct}%)</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
