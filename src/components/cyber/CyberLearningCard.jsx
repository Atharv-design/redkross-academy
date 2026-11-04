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

  const courseSlug = item.slug || item.id || 'crs_full_stack_web_dev';

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

      {/* 2. Content Container - Taller Vertical Geometry & Generous Padding */}
      <div className="relative z-10 px-8 sm:px-10 py-8 sm:py-10 flex flex-col justify-between h-full min-h-[480px] sm:min-h-[510px]">
        <div>
          {/* Header Row: Badge & Glowing Icon Box */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 uppercase">
                {item.difficulty || 'CAREER TRACK'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {item.estimated_weeks ? `${item.estimated_weeks} Weeks` : 'Self-Paced'}
              </span>
            </div>

            {/* Inset Cyber Icon Badge */}
            <div className="relative p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/35 group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_14px_rgba(255,122,0,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#FFA439] group-hover:text-white transition-all duration-300 relative z-10" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-royal text-white mb-3 leading-tight group-hover:text-[#FFA439] transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5 line-clamp-3">
            {item.short_desc}
          </p>

          {/* Key Skills */}
          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {item.skills.map((skill) => (
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
          {item.milestone_cert && (
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 group-hover:border-[#FF7A00]/30 transition-colors text-[11px] mb-4">
              <div className="text-[10px] font-mono text-[#FFA439] font-bold">MILESTONE CREDENTIAL</div>
              <div className="text-slate-300 font-sans truncate mt-0.5">{item.milestone_cert}</div>
            </div>
          )}
        </div>

        {/* Divider & Explore the Course Action Button Inside the Card */}
        <div className="mt-4 pt-3 border-t border-white/10">
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
