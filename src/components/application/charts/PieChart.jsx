import React, { useState } from 'react';
import {
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  Cell
} from 'recharts';
import { ChartLegendContent, ChartTooltipContent } from './charts-base';

export const DEFAULT_THEME_PALETTE = [
  '#FF7A00', // Primary Emerald Green
  '#FFA439', // Electric Mint
  '#FF7A00', // Neon Cyber Green
  '#FF7A00', // Deep Mint / Teal
  '#F59E0B', // Amber Alert / Warning
  '#EF4444', // Tactical Red / Remediation
  '#059669', // Dark Emerald
  '#047857'  // Deep Forest
];

const defaultPieChartData = [
  { name: 'Completed & Certified', value: 350, color: '#FF7A00' },
  { name: 'Final Exam Stage', value: 200, color: '#FFA439' },
  { name: 'Midterm Lab Hands-On', value: 180, color: '#FF7A00' },
  { name: 'Module Progressing', value: 120, color: '#FF7A00' },
  { name: 'Foundation Enrolled', value: 100, color: '#059669' }
];

/**
 * PieChartXxs - Micro-sized Donut Chart (Matches user template API)
 * Customized for RedKross Cyber Theme with Zero Blue Tokens
 */
export const PieChartXxs = ({ data = defaultPieChartData, height = 130, className = 'max-w-56' }) => {
  const normalizedData = data.map((item, idx) => ({
    ...item,
    color: item.color || DEFAULT_THEME_PALETTE[idx % DEFAULT_THEME_PALETTE.length]
  }));

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        >
          <Legend
            verticalAlign="top"
            align="right"
            layout="vertical"
            content={ChartLegendContent}
          />
          <Tooltip content={<ChartTooltipContent isPieChart />} />

          <Pie
            isAnimationActive={true}
            animationDuration={800}
            startAngle={-270}
            endAngle={-630}
            stroke="#071018"
            strokeWidth={2}
            data={normalizedData}
            dataKey="value"
            nameKey="name"
            innerRadius={30}
            outerRadius={58}
          >
            {normalizedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * RedKrossDonutChart - Full-size Academic & Telemetry Donut Chart
 * Features:
 * - Center Metric (e.g. Pass Rate % or Total Learners)
 * - Interactive hover segments
 * - Rich RedKross tooltips and custom legend
 * - 100% Zero-Blue Emerald/Mint cyber styling
 */
export const RedKrossDonutChart = ({
  data = defaultPieChartData,
  height = 240,
  innerRadius = 55,
  outerRadius = 88,
  centerMetric = null,
  centerLabel = null,
  showLegend = true,
  legendLayout = 'horizontal', // 'horizontal' | 'vertical'
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalValue = data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  const normalizedData = data.map((item, idx) => {
    const val = Number(item.value) || 0;
    const pct = totalValue > 0 ? ((val / totalValue) * 100).toFixed(1) : '0.0';
    return {
      ...item,
      value: val,
      percentage: pct,
      total: totalValue,
      color: item.color || DEFAULT_THEME_PALETTE[idx % DEFAULT_THEME_PALETTE.length]
    };
  });

  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart margin={{ top: 5, bottom: 5, left: 5, right: 5 }}>
            <Tooltip content={<ChartTooltipContent isPieChart />} />

            {showLegend && (
              <Legend
                verticalAlign={legendLayout === 'horizontal' ? 'bottom' : 'middle'}
                align={legendLayout === 'horizontal' ? 'center' : 'right'}
                layout={legendLayout}
                content={ChartLegendContent}
              />
            )}

            <Pie
              data={normalizedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy={showLegend && legendLayout === 'horizontal' ? '42%' : '50%'}
              startAngle={90}
              endAngle={-270}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
              stroke="#071018"
              strokeWidth={3}
              isAnimationActive={true}
              animationDuration={650}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {normalizedData.map((entry, index) => (
                <Cell
                  key={`cell-slice-${index}`}
                  fill={entry.color}
                  stroke={activeIndex === index ? '#FFFFFF' : '#071018'}
                  strokeWidth={activeIndex === index ? 3 : 2}
                  style={{
                    filter: activeIndex === index ? `drop-shadow(0 0 8px ${entry.color})` : 'none',
                    transition: 'all 0.25s ease-in-out',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center Donut Hole Metric Display */}
        {(centerMetric || centerLabel) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center"
            style={{
              paddingBottom: showLegend && legendLayout === 'horizontal' ? '30px' : '0px'
            }}
          >
            {centerMetric && (
              <span className="text-xl md:text-2xl font-bold font-mono text-[#FF7A00] tracking-tight drop-shadow-[0_0_10px_rgba(255,122,0,0.4)]">
                {centerMetric}
              </span>
            )}
            {centerLabel && (
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8BA2B5]">
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedKrossDonutChart;
