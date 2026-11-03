import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Terminal, Clock, BookOpen, Award } from 'lucide-react';
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
      {/* 1. DITTO SCI-FI CYBER HUD CIRCUIT FRAME */}
      <CyberCircuitFrame isHovered={isHovered} />

      {/* 2. CARD CONTENT CONTAINER (Safe Inset Zone) */}
      <div className="relative z-10 px-8 sm:px-10 pt-7 pb-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Row: Difficulty/Badge (Left) & Compact Cyber Icon (Right) */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-emerald-500/40 text-[#65F58A] bg-emerald-950/70 group-hover:border-[#65F58A] group-hover:bg-emerald-900/60 group-hover:shadow-[0_0_10px_rgba(101,245,138,0.25)] transition-all duration-300 uppercase">
              {course.difficulty || 'DEFENSIVE CYBER'}
            </span>

            {/* Inset Cyber Icon Badge */}
            <div className="relative p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/35 group-hover:border-[#65F58A] group-hover:bg-[#65F58A]/15 group-hover:shadow-[0_0_14px_rgba(101,245,138,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
              <span 
                className="absolute inset-0 rounded-lg bg-[#65F58A]/25 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" 
                style={{ animationDuration: '2.5s' }} 
                aria-hidden="true"
              />
              <Terminal className="w-4 h-4 text-[#65F58A] group-hover:text-[#35E6B5] transition-all duration-300 relative z-10 drop-shadow-[0_0_6px_rgba(101,245,138,0.85)]" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-[17px] font-bold font-royal text-white mb-1.5 group-hover:text-[#65F58A] transition-colors leading-snug">
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
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-emerald-200/90 border border-emerald-500/25 group-hover:border-emerald-500/40 transition-colors whitespace-nowrap"
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
                <Clock className="w-3 h-3 text-[#35E6B5]" />
                {course.estimated_hours || course.total_hours} Hours
              </span>
              {course.milestone_cert && (
                <span className="inline-flex items-center gap-1 text-[#65F58A]">
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
            <div className="absolute inset-0 bg-white/10 group-hover:bg-emerald-500/30 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#65F58A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#65F58A]" />
          </div>

          {/* Footer: Track Number & Direct Action Link */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 group-hover:text-emerald-300 transition-colors tracking-wider">
              Track {trackNumber}
            </span>
            <Link 
              to={linkTarget}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#65F58A] hover:text-[#35E6B5] group-hover:underline transition-colors font-medium"
            >
              <span>{actionLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
      viewport={{ once: false, amount: 0.15 }}
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
