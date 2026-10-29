import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

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
export function resolveCourseDesign(course, index = 0) {
  // If variant string like 'variant-03' is present
  let resolvedIndex = index;
  if (course?.card_variant) {
    const match = course.card_variant.match(/variant-?(\d+)/i);
    if (match) {
      resolvedIndex = (parseInt(match[1], 10) - 1) % ART_PRESETS.length;
    }
  } else if (course?.id) {
    // Generate deterministic hash from id
    let hash = 0;
    for (let i = 0; i < course.id.length; i++) {
      hash = (hash << 5) - hash + course.id.charCodeAt(i);
      hash |= 0;
    }
    resolvedIndex = Math.abs(hash) % ART_PRESETS.length;
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
 * - Zero-blue strict dark EdTech palette: #071018, #101923, #1B2530, #65F58A, #35E6B5, #00FFA3
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    const timer = setTimeout(() => setIsIn(true), 900);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!course) return null;

  // Resolve artwork and design parameters
  const design = resolveCourseDesign(course, index);
  const resolvedArt = art || design.art;
  const resolvedArtPos = artPos || design.artPos;
  const resolvedClip = shape || design.clip;
  const isMint = design.accent === 'mint';

  // Format meta (duration and weeks)
  const durationRaw = course.estimated_duration || '14 Hours';
  const hours = durationRaw.toLowerCase().includes('hour')
    ? durationRaw.replace(/Hours?/i, 'hrs').trim()
    : `${durationRaw} hrs`;
  const weeks = course.estimated_weeks
    ? `${course.estimated_weeks} weeks`
    : '8 weeks';

  // Format skills
  const skills = (course.skills && course.skills.length > 0)
    ? course.skills.slice(0, 4)
    : (course.learning_objectives && course.learning_objectives.length > 0)
      ? course.learning_objectives.slice(0, 4).map((s) => s.split(':')[0].substring(0, 22).trim())
      : ['SIEM / Splunk', 'Log Analysis', 'Incident Triage', 'Threat Intel'];

  // Format milestone credential
  const credential = course.milestone_cert ||
    course.credential_name ||
    `Certified ${course.title?.split(' ')[0] || 'Cyber'} Specialist`;

  const courseLink = `/courses/${course.id || course.slug || ''}`;

  return (
    <Link
      ref={cardRef}
      to={courseLink}
      className={`acad-card reveal ${isIn ? 'is-in' : ''} ${resolvedClip} ${className}`}
      style={{
        '--art': `url('${resolvedArt}')`,
        '--art-pos': resolvedArtPos,
        '--i': index,
      }}
      aria-label={`View syllabus for ${course.title}`}
    >
      {/* Edge-to-edge artwork layer */}
      <div className="acad-card__art" aria-hidden="true" />

      {/* Top Header Row: Difficulty Badge & Meta Duration */}
      <div className="acad-card__top">
        <span
          className={`acad-badge ${
            isMint
              ? '!text-[#35E6B5] !bg-[#35E6B5]/10 !border-[#35E6B5]/35'
              : ''
          }`}
        >
          {course.difficulty || course.category || 'Intermediate'}
        </span>
        <span className="acad-meta">
          {weeks} <i /> {hours}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="acad-card__title font-royal">
        {course.title}
      </h3>
      <p className="acad-card__desc">
        {course.short_desc || course.overview}
      </p>

      {/* Skills Validated Pills */}
      <div className="acad-skills">
        {skills.map((skill, idx) => (
          <span key={idx} className="acad-skill" title={skill}>
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom Footer: Milestone Credential & Circular Arrow */}
      <div className="acad-card__foot">
        <div className="acad-cred">
          <Shield
            className={`w-5 h-5 flex-none ${
              isMint ? 'text-[#35E6B5]' : 'text-[#65F58A]'
            }`}
          />
          <div className="truncate pr-2">
            <small>Milestone credential</small>
            <strong className="truncate block">{credential}</strong>
          </div>
        </div>

        <span
          className={`acad-go ${
            isMint
              ? '!text-[#35E6B5] hover:!border-[#35E6B5]/60 hover:!bg-[#35E6B5]/15'
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
