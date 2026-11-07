import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Star, Terminal, Award, Layers, CheckCircle2 } from 'lucide-react';

/**
 * 10 Presets mapping 3D cyberpunk artwork, tuned subject positioning,
 * cyber-cut corner shapes, and alternating neon/mint accents.
 */
export const ART_PRESETS = [
  { art: '/assets/course-art/art-01.jpg', artPos: '72% 30%', clip: 'cyber-clip-corner-top-left', accent: 'neon' },
  { art: '/assets/course-art/art-02.jpg', artPos: '74% 28%', clip: 'cyber-clip-corner-top-right', accent: 'mint' },
  { art: '/assets/course-art/art-03.jpg', artPos: '75% 30%', clip: 'cyber-clip-diagonal-both', accent: 'neon' },
  { art: '/assets/course-art/art-04.jpg', artPos: '75% 35%', clip: 'cyber-clip-notch-bottom', accent: 'neon' },
  { art: '/assets/course-art/art-05.jpg', artPos: '75% 32%', clip: 'rounded-2xl', accent: 'mint' },
  { art: '/assets/course-art/art-06.jpg', artPos: '80% 25%', clip: 'cyber-clip-corner-top-left', accent: 'mint' },
  { art: '/assets/course-art/art-07.jpg', artPos: '78% 28%', clip: 'cyber-clip-corner-top-right', accent: 'neon' },
  { art: '/assets/course-art/art-08.jpg', artPos: '80% 25%', clip: 'cyber-clip-diagonal-both', accent: 'mint' },
  { art: '/assets/course-art/art-09.jpg', artPos: '76% 30%', clip: 'cyber-clip-notch-bottom', accent: 'neon' },
  { art: '/assets/course-art/art-10.jpg', artPos: '76% 25%', clip: 'rounded-2xl', accent: 'neon' },
];

/**
 * Resolves artwork, position, shape cut, and accent for any course.
 */
export function resolveCourseDesign(course, index = null) {
  let resolvedIndex = index;
  if (course?.card_variant && course.card_variant !== 'random') {
    const match = course.card_variant.match(/variant-?(\d+)/i);
    if (match) {
      resolvedIndex = (parseInt(match[1], 10) - 1) % ART_PRESETS.length;
    }
  } else if (resolvedIndex !== null && typeof resolvedIndex === 'number') {
    resolvedIndex = Math.abs(resolvedIndex) % ART_PRESETS.length;
  } else {
    // Random choice from 10 designs
    resolvedIndex = Math.floor(Math.random() * ART_PRESETS.length);
  }

  const preset = ART_PRESETS[Math.abs(resolvedIndex) % ART_PRESETS.length];

  return {
    art: course?.art || preset.art,
    artPos: course?.artPos || preset.artPos,
    clip: course?.clip_shape || preset.clip,
    accent: preset.accent,
    index: resolvedIndex,
  };
}

/**
 * AcademicKitCard
 * High-fidelity 3D academic course card directly ported from academic-card-standalone.html.
 * Features:
 * - Edge-to-edge full-bleed artwork background layer (--art) with tuned subject positioning (--art-pos)
 * - Multi-layer dark gradients on the left ensuring 100% text readability
 * - Subdued neon edge glow highlight on hover/focus
 * - Smooth 4px hover lift with art scaling (1.07)
 * - Staggered entrance animation via IntersectionObserver (--i)
 * - Zero-blue strict dark EdTech palette: #071018, #101923, #1B2530, #FF7A00, #FFA439, #FF7A00
 */
export default function AcademicKitCard({
  course,
  index = 0,
  art,
  artPos,
  shape,
  className = '',
}) {
  const cardRef = useRef(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!course) return null;

  const design = resolveCourseDesign(course, index);
  const resolvedArt = art || design.art;
  const resolvedArtPos = artPos || design.artPos;
  const resolvedClip = shape || design.clip;
  const isMint = design.accent === 'mint';

  const durationRaw = course.estimated_duration || '14 Hours';
  const hours = durationRaw.toLowerCase().includes('hour')
    ? durationRaw.replace(/Hours?/i, 'hrs').trim()
    : `${durationRaw} hrs`;
  const weeks = course.estimated_weeks
    ? `${course.estimated_weeks} weeks`
    : '8 weeks';

  const modulesCount = course.modules?.length || 5;
  const lessonsCount = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 33;
  const rating = course.rating || 4.98;
  const enrolledCadets = course.enrolled_count || course.students_count || 1420;
  const badgeLabel = course.badge || 'FLAGSHIP ACCREDITED';

  const skills = (course.skills && course.skills.length > 0)
    ? course.skills.slice(0, 4)
    : (course.learning_objectives && course.learning_objectives.length > 0)
      ? course.learning_objectives.slice(0, 4).map((s) => s.split(':')[0].substring(0, 22).trim())
      : ['SIEM / Splunk', 'Log Analysis', 'Incident Triage', 'Threat Intel'];

  const credential = course.milestone_cert ||
    course.credential_name ||
    `Certified ${course.title?.split(' ')[0] || 'Cyber'} Specialist`;

  const courseLink = `/courses/${course.slug || course.id || ''}`;

  return (
    <Link
      ref={cardRef}
      to={courseLink}
      className={`acad-card reveal ${isIn ? 'is-in' : ''} ${resolvedClip} ${className} group hover:border-[#FF7A00]/60 transition-all duration-300`}
      style={{
        '--art': `url('${resolvedArt}')`,
        '--art-pos': resolvedArtPos,
        '--i': index,
      }}
      aria-label={`View syllabus for ${course.title}`}
    >
      {/* Edge-to-edge artwork layer */}
      <div className="acad-card__art" aria-hidden="true" />

      {/* Top Header Row: Difficulty Badge & Meta Duration & Accreditation */}
      <div className="acad-card__top flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span
            className={`acad-badge ${
              isMint
                ? '!text-[#FFA439] !bg-[#FFA439]/10 !border-[#FFA439]/35'
                : '!text-[#FF7A00] !bg-[#FF7A00]/15 !border-[#FF7A00]/40'
            }`}
          >
            {course.difficulty || course.category || 'Foundational'}
          </span>
          <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[#FFA439] font-bold">
            {badgeLabel}
          </span>
        </div>
        <span className="acad-meta text-xs">
          {weeks} <i /> {hours}
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-1.5 mt-1">
        <h3 className="acad-card__title font-royal group-hover:text-[#FFA439] transition-colors">
          {course.title}
        </h3>
        <p className="acad-card__desc line-clamp-2">
          {course.short_desc || course.overview}
        </p>
      </div>

      {/* Tactical Curriculum Metrics Bar */}
      <div className="flex flex-wrap items-center gap-3 py-2 px-3 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-[#E2D9CE]">
        <span className="flex items-center space-x-1 text-[#FFA439] font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>{modulesCount} Modules · {lessonsCount} Lessons</span>
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center space-x-1 text-amber-300">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{rating} ({enrolledCadets.toLocaleString()} Cadets)</span>
        </span>
      </div>

      {/* Lab Environment & Examination Capabilities */}
      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
        <span className="px-2 py-0.5 rounded-md bg-[#1A1208] text-[#FFA439] border border-[#FF7A00]/30 flex items-center gap-1">
          <Terminal className="w-3 h-3 text-[#FF7A00]" /> Kali MicroVM Labs
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#071018] text-[#35E6B5] border border-[#35E6B5]/30 flex items-center gap-1">
          <Award className="w-3 h-3 text-[#35E6B5]" /> 340+ Command Vault
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#120E09] text-[#E2D9CE] border border-white/10 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-[#FF7A00]" /> 80% Passing Score
        </span>
      </div>

      {/* Skills Validated Pills */}
      <div className="acad-skills">
        {skills.map((skill, idx) => (
          <span key={idx} className="acad-skill" title={skill}>
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom Footer: Milestone Credential & Circular Arrow */}
      <div className="acad-card__foot pt-3 border-t border-white/10">
        <div className="acad-cred min-w-0">
          <Shield
            className={`w-5 h-5 flex-none ${
              isMint ? 'text-[#FFA439]' : 'text-[#FF7A00]'
            }`}
          />
          <div className="truncate pr-2">
            <small className="text-[10px] font-mono text-[#A3907C] uppercase tracking-wider block">Institutional Credential</small>
            <strong className="truncate block text-xs font-semibold text-white">{credential}</strong>
          </div>
        </div>

        <span
          className={`acad-go flex-shrink-0 ${
            isMint
              ? '!text-[#FFA439] hover:!border-[#FFA439]/60 hover:!bg-[#FFA439]/15'
              : ''
          }`}
          aria-label="Open course"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
