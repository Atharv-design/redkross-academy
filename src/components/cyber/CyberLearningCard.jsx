import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import CyberProjectCircuitFrame from './CyberProjectCircuitFrame';

export default function CyberLearningCard({ 
  track,
  course,
  idx = 0 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const item = course || track;
  if (!item) return null;

  const courseSlug = item.slug || item.id || 'introduction-to-cybersecurity';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.45, 
        delay: idx * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative group transition-all duration-300 w-full h-full flex flex-col select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Cyber Circuit HUD Frame (Pure Transparent Amber Theme) */}
      <CyberProjectCircuitFrame isHovered={isHovered} theme="amber" />

      {/* 2. Content Container - Compact & Identical Dimensions */}
      <div className="relative z-10 px-6 sm:px-7 py-6 sm:py-7 flex flex-col justify-between h-full gap-4 flex-1">
        <div className="space-y-3.5 flex-1 flex flex-col">
          {/* Header Row: Difficulty Pill, Duration & Award Icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 uppercase">
                {item.difficulty || 'BEGINNER'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {item.estimated_weeks ? `${item.estimated_weeks} Weeks` : '10 Weeks'}
              </span>
            </div>

            {/* Inset Cyber Icon Badge */}
            <div className="relative p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/35 group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_14px_rgba(255,122,0,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#FFA439] group-hover:text-white transition-all duration-300 relative z-10" />
            </div>
          </div>

          {/* Title - Consistent Height Across All Cards */}
          <h3 className="text-lg sm:text-xl font-bold font-royal text-white leading-snug group-hover:text-[#FFA439] transition-colors min-h-[3rem] flex items-center">
            {(item.title || 'Introduction to Cybersecurity').replace(/^Course\s*\d+:\s*/i, '')}
          </h3>

          {/* Course Overview / Description - Consistent 3-Line Clamped Height */}
          <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed line-clamp-3 min-h-[3.75rem]">
            {item.short_desc || item.overview}
          </p>

          {/* Exactly 2 Structured Metadata Tiles Below Description */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Tile 1: Curriculum Timeline */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:border-[#FF7A00]/30 transition-colors flex flex-col justify-center min-h-[62px]">
              <span className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                CURRICULUM
              </span>
              <span className="text-xs font-mono text-slate-200 font-semibold mt-1 truncate">
                {item.estimated_weeks || 10} Wks • 6–8h/wk
              </span>
            </div>

            {/* Tile 2: Official Milestone Credential */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:border-[#FF7A00]/30 transition-colors flex flex-col justify-center min-h-[62px]">
              <span className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                CREDENTIAL
              </span>
              <span 
                className="text-xs font-sans text-slate-200 font-semibold mt-1 truncate" 
                title={item.milestone_cert || 'Certified Associate'}
              >
                {item.milestone_cert || 'Certified Associate'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Pinned at Bottom */}
        <div className="pt-3 border-t border-white/10 mt-auto">
          <Link
            to={`/academy/cybersecurity/courses/${courseSlug}`}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all cursor-pointer group/btn"
          >
            <span>Explore the Course</span>
            <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
