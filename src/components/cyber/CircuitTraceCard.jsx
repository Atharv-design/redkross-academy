import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, Clock, Award } from 'lucide-react';
import CyberCircuitFrame from './CyberCircuitFrame';

export default function CircuitTraceCard({ 
  course, 
  idx = 0, 
  iconMap = {}, 
  showMotion = true,
  actionLabel = 'View Course Track'
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!course) return null;

  const trackNumber = String(idx + 1).padStart(2, '0');
  const tags = course.skills || course.tags || ['SOC Telemetry', 'MITRE ATT&CK', 'Hands-on Labs'];
  const title = course.title || course.name;
  const summary = course.short_desc || course.summary || course.description;
  const linkTarget = course.slug ? `/courses/${course.slug}` : `/courses`;

  const cardContent = (
    <div 
      className="relative group transition-all duration-300 w-full h-full flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. DITTO SCI-FI CYBER HUD CIRCUIT FRAME (Pure Transparent Amber Theme) */}
      <CyberCircuitFrame isHovered={isHovered} theme="amber" />

      {/* 2. CARD CONTENT CONTAINER (Safe Inset Zone) */}
      <div className="relative z-10 px-8 sm:px-10 pt-7 pb-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Row: Difficulty/Badge (Left) & Compact Cyber Icon (Right) */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/25 group-hover:shadow-[0_0_12px_rgba(255,122,0,0.35)] transition-all duration-300 uppercase">
              {course.difficulty || 'DEFENSIVE CYBER'}
            </span>

            {/* Inset Cyber Icon Badge */}
            <div className="relative p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/35 group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_14px_rgba(255,122,0,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
              <span 
                className="absolute inset-0 rounded-lg bg-[#FF7A00]/25 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" 
                style={{ animationDuration: '2.5s' }} 
                aria-hidden="true"
              />
              <Terminal className="w-4 h-4 text-[#FFA439] group-hover:text-white transition-all duration-300 relative z-10 drop-shadow-[0_0_6px_rgba(255,122,0,0.85)]" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-[17px] font-bold font-royal text-white mb-1.5 group-hover:text-[#FFA439] transition-colors leading-snug">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3 line-clamp-2">
            {summary}
          </p>

          {/* Telemetry Chips */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#FFA439]/90 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/40 transition-colors whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Course Meta: Hours / Modules */}
          {(course.estimated_hours || course.total_hours) && (
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-1">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FFA439]" />
                {course.estimated_hours || course.total_hours} Hours
              </span>
              {course.milestone_cert && (
                <span className="inline-flex items-center gap-1 text-[#FF7A00]">
                  <Award className="w-3 h-3" />
                  Cert Included
                </span>
              )}
            </div>
          )}
        </div>

        {/* 3. Divider & Footer Row */}
        <div className="mt-4">
          {/* Animated Progress Trace Divider */}
          <div className="relative w-full h-[1px] mb-2.5 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-[#FF7A00]/30 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#FFA439] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#FFA439]" />
          </div>

          {/* Footer: Track Number & Direct Action Link */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 group-hover:text-[#FFA439] transition-colors tracking-wider">
              Track {trackNumber}
            </span>
            <Link 
              to={linkTarget}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFA439] hover:text-white group-hover:underline transition-colors font-medium"
            >
              <span>{actionLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7A00] group-hover:text-[#FFA439] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (!showMotion) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.4, 
        delay: (idx % 3) * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
}
