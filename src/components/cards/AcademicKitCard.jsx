import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * AcademicKitCard
 * High-fidelity academic course card directly ported from academic-card-standalone.html.
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback ensure card reveals even if observer doesn't fire immediately
    const timer = setTimeout(() => setIsIn(true), 900);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!course) return null;

  // Resolve artwork and positioning
  const resolvedArt = art || course.art || '/assets/course-art/art-01.jpg';
  const resolvedArtPos = artPos || course.artPos || '72% 30%';

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
      ? course.learning_objectives.slice(0, 4).map((s) => s.split(':')[0].substring(0, 20).trim())
      : ['SIEM', 'Log Analysis', 'Incident Triage', 'Threat Intel'];

  // Format milestone credential
  const credential = course.milestone_cert ||
    course.credential_name ||
    `Certified ${course.title?.split(' ')[0] || 'Cyber'} Specialist`;

  const courseLink = `/courses/${course.id || course.slug || ''}`;

  return (
    <Link
      ref={cardRef}
      to={courseLink}
      className={`acad-card reveal ${isIn ? 'is-in' : ''} ${className}`}
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
        <span className="acad-badge">
          {course.difficulty || 'Intermediate'}
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
          <span key={idx} className="acad-skill">
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom Footer: Milestone Credential & Circular Arrow */}
      <div className="acad-card__foot">
        <div className="acad-cred">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
            <path d="M9 12l2.2 2.2L15.5 10" />
          </svg>
          <div>
            <small>Milestone credential</small>
            <strong>{credential}</strong>
          </div>
        </div>

        <span className="acad-go" aria-label="Open course">
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
