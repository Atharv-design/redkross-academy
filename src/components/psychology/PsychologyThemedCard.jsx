import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Award, CheckCircle2, HeartHandshake, Sparkles, Brain, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CARD_MOTIFS = {
  1: {
    key: 'cbt-foundations',
    src: '/assets/cards/card-individual-counselling-fullspan.png',
    defaultTag: 'Clinical Foundations',
    defaultMeta1: 'CBT Protocol & Formulations',
    defaultMeta2: 'Evidence-Based Modules'
  },
  2: {
    key: 'crisis-intervention',
    src: '/assets/cards/card-crisis-support-fullspan.png',
    defaultTag: 'Crisis Response',
    defaultMeta1: 'De-escalation & PFA',
    defaultMeta2: '24/7 Care Coordination'
  },
  3: {
    key: 'neuropsychology',
    src: '/assets/cards/card-psychological-assessments-fullspan.png',
    defaultTag: 'Neuroscience',
    defaultMeta1: 'Affective Brain Mechanics',
    defaultMeta2: 'Cognitive Assessment'
  },
  4: {
    key: 'forensic-psychology',
    src: '/assets/cards/card-workshops-programs-fullspan.png',
    defaultTag: 'Forensic Science',
    defaultMeta1: 'Criminal Profiling Ethics',
    defaultMeta2: 'Legal & Court Competency'
  },
  5: {
    key: 'student-wellbeing',
    src: '/assets/cards/card-child-adolescent-support-fullspan.png',
    defaultTag: 'Youth & Academic',
    defaultMeta1: 'Anxiety & Exam Stress',
    defaultMeta2: 'Peer Support Networks'
  },
  6: {
    key: 'mindfulness-therapy',
    src: '/assets/cards/card-therapy-approaches-fullspan.png',
    defaultTag: 'Applied Mindfulness',
    defaultMeta1: 'MBSR & Somatic Regulation',
    defaultMeta2: 'Empirical Meditation'
  }
};

export default function PsychologyThemedCard({
  course = null,
  variant = 1,
  tagLeft,
  tagRight = 'RCI-Aligned',
  title,
  description,
  bullets = [],
  tags = [],
  meta1,
  meta2,
  ctaText = 'View Course Track',
  ctaLink = '/courses',
  className = '',
  idx = 0
}) {
  const resolvedTitle = course?.title || title || 'Psychology Specialization';
  const resolvedDesc = course?.short_desc || course?.description || description || 'Rigorous evidence-based psychological training and certification.';
  const resolvedLink = course?.slug ? `/academy/psychology/courses/${course.slug}` : ctaLink;
  const resolvedVariant = course?.motifVariant || variant;

  const motifIndex = typeof resolvedVariant === 'number' 
    ? ((resolvedVariant - 1) % 6) + 1 
    : 1;
  
  const motif = CARD_MOTIFS[motifIndex] || CARD_MOTIFS[1];
  const leftTagText = tagLeft || course?.difficulty || motif.defaultTag;
  const meta1Text = meta1 || (course?.estimated_hours ? `${course.estimated_hours} Hours Total` : motif.defaultMeta1);
  const meta2Text = meta2 || (course?.milestone_cert || motif.defaultMeta2);
  const resolvedTags = (course?.skills && course.skills.length > 0) ? course.skills.slice(0, 3) : tags;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ 
        duration: 0.45, 
        delay: (idx % 3) * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/25 hover:border-[#FFA439]/60 transition-all duration-300 shadow-xl shadow-black/60 hover:shadow-[0_0_30px_rgba(255,122,0,0.25)] group select-none ${className}`}
    >
      {/* Specular top border light beam */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFA439]/60 to-transparent pointer-events-none z-10" />

      {/* Signature Ethereal Artwork Spanning the Full Vertical Height of the Card - Semi-Transparent Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
        <img
          src={motif.src}
          alt=""
          className="w-full h-full object-cover object-center opacity-25 group-hover:opacity-35 transition-opacity duration-700 filter saturate-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0704]/80 via-black/35 to-transparent" />
      </div>

      {/* Card Content Top Zone */}
      <div className="relative z-10">
        {/* Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold text-[#FFA439] bg-[#FF7A00]/15 border border-[#FF7A00]/35 backdrop-blur-md shadow-sm shadow-black/40">
            {leftTagText}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium text-slate-300 bg-black/60 border border-white/10 backdrop-blur-md">
            {tagRight}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug font-royal mb-2 drop-shadow-sm text-white group-hover:text-[#FFA439] transition-colors">
          {resolvedTitle}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300/95 leading-relaxed font-light mb-3 drop-shadow-sm line-clamp-3">
          {resolvedDesc}
        </p>

        {/* Highlight Tags */}
        {resolvedTags && resolvedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {resolvedTags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#FFA439]/90 bg-[#FF7A00]/10 border border-[#FF7A00]/25"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Optional Bullet Points */}
        {bullets && bullets.length > 0 && (
          <ul className="mb-3.5 space-y-1.5 border-t border-white/10 pt-2.5">
            {bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA439] shrink-0 mt-0.5" />
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Area: 2 Metadata Rows + Full-Width Glowing Pill CTA Button */}
      <div className="relative z-10 pt-2 space-y-2">
        {/* Metadata Row 1 */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-black/50 border border-[#FF7A00]/20 text-slate-200 text-xs shadow-sm">
          <Brain className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
          <span className="truncate">{meta1Text}</span>
        </div>

        {/* Metadata Row 2 */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-black/50 border border-[#FF7A00]/20 text-slate-200 text-xs shadow-sm">
          <Award className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
          <span className="truncate text-amber-200/90">{meta2Text}</span>
        </div>

        {/* Signature Full-Width Glowing Pill CTA Button */}
        <Link
          to={resolvedLink}
          className="mt-3.5 w-full h-11 sm:h-12 rounded-full bg-gradient-to-r from-[#FF7A00]/15 via-[#FF7A00]/20 to-[#FF7A00]/25 border border-[#FF7A00]/40 hover:border-[#FFA439] hover:from-[#FF7A00]/25 hover:to-[#FF7A00]/40 flex items-center justify-between px-4 sm:px-5 transition-all duration-300 group/btn shadow-[0_0_20px_rgba(255,122,0,0.15)]"
        >
          <span className="font-royal text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FFA439] group-hover/btn:text-white transition-colors">
            {ctaText}
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black flex items-center justify-center font-bold shadow-[0_0_12px_rgba(255,122,0,0.5)] group-hover/btn:translate-x-1 group-hover/btn:brightness-110 transition-all shrink-0">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
