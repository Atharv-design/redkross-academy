import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import CyberProjectCircuitFrame from './CyberProjectCircuitFrame';

export default function CyberLearningCard({ 
  track,
  idx = 0 
}) {
  const [isHovered, setIsHovered] = useState(false);
  if (!track) return null;

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
      className="relative group transition-all duration-300 w-full h-full flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Cyber Circuit HUD Frame (Pure Transparent Amber Theme) */}
      <CyberProjectCircuitFrame isHovered={isHovered} theme="amber" />

      {/* 2. Content Container */}
      <div className="relative z-10 px-8 sm:px-10 pt-7 pb-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Row: Badge & Glowing Icon Box */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 uppercase">
                {track.difficulty || 'CAREER TRACK'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {track.estimated_weeks ? `${track.estimated_weeks} Weeks` : 'Self-Paced'}
              </span>
            </div>

            {/* Inset Cyber Icon Badge */}
            <div className="relative p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/35 group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_14px_rgba(255,122,0,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#FFA439] group-hover:text-white transition-all duration-300 relative z-10" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-2 leading-tight group-hover:text-[#FFA439] transition-colors">
            {track.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4 line-clamp-3">
            {track.short_desc}
          </p>

          {/* Key Skills */}
          {track.skills && track.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {track.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#FFA439]/90 border border-[#FF7A00]/25"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Milestone Cert */}
          {track.milestone_cert && (
            <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 group-hover:border-[#FF7A00]/30 transition-colors text-[11px] mb-3">
              <div className="text-[10px] font-mono text-[#FFA439] font-bold">MILESTONE CREDENTIAL</div>
              <div className="text-slate-300 font-sans truncate">{track.milestone_cert}</div>
            </div>
          )}
        </div>

        {/* Divider & Footer Link */}
        <div className="mt-3">
          <div className="relative w-full h-[1px] mb-3 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-[#FF7A00]/30 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#FFA439] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#FFA439]" />
          </div>

          <Link
            to={track.slug ? `/paths` : `/courses`}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFA439] hover:text-white group-hover:underline transition-colors"
          >
            <span>Review Track Curriculum &amp; Labs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
