import React from 'react';
import DictoCyberCard from './DictoCyberCard';

/**
 * CourseCardVariant — Adapts raw course objects to the 10 DICTO CYBER CARD DESIGNS
 * Directly matching media_1793207789795_b38b0335.png aesthetic and media_1793206746529_8131fa77.jpg motifs.
 */
export default function CourseCardVariant({
  course,
  variantId,
  variantIndex = 0,
  shape = 'auto',
  className = ''
}) {
  if (!course) return null;

  // Resolve stable variant number (1-10)
  const resolveVariantNumber = () => {
    const raw = variantId || course.card_variant;
    if (typeof raw === 'string') {
      const match = raw.match(/variant-?(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return ((num - 1) % 10) + 1;
      }
    }
    if (typeof variantIndex === 'number') {
      return (variantIndex % 10) + 1;
    }
    return 1;
  };

  const variantNum = resolveVariantNumber();

  // Extract skills/badges
  const extractBadges = () => {
    if (course.learning_objectives && course.learning_objectives.length > 0) {
      return course.learning_objectives
        .slice(0, 3)
        .map((s) => s.split(':')[0].trim().substring(0, 22));
    }
    return ['Threat Triage', 'Log Correlation', 'Incident Action'];
  };

  const durationStr = course.estimated_duration
    ? course.estimated_duration
    : '14 Hours';

  const enrolledStr = course.enrolled_count
    ? `${course.enrolled_count.toLocaleString()} Enrolled Defenders`
    : '1,420 Enrolled Defenders';

  const tagLabel = course.category
    ? course.category.toUpperCase()
    : (course.difficulty ? `${course.difficulty.toUpperCase()} TRACK` : 'DEFENSIVE SPECIALIST');

  const pathwayLabel = course.difficulty
    ? `${course.difficulty} • ${durationStr}`
    : `Cohort 2026 • ${durationStr}`;

  return (
    <DictoCyberCard
      variant={variantNum}
      tag={tagLabel}
      pathwayTag={pathwayLabel}
      title={course.title}
      description={course.overview}
      tags={extractBadges()}
      meta1={enrolledStr}
      meta2={`${durationStr} • ${course.price === 0 ? 'Free Curriculum Access' : `₹${course.price?.toLocaleString('en-IN')} Certification`}`}
      actionHref={`/courses/${course.slug || course.id}`}
      actionText="Inspect Syllabus & Lab"
      progress={course.progress || null}
      className={className}
    />
  );
}
