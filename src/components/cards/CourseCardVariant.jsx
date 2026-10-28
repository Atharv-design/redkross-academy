import React from 'react';
import DictoCyberCard from './DictoCyberCard';

/**
 * CourseCardVariant — Adapts raw course objects to the 10 DICTO CYBER CARD DESIGNS
 * Directly matching media_1793206746529_8131fa77.jpg
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

  // Extract skills/badges for Card 3, 5, 9
  const extractBadges = () => {
    if (course.learning_objectives && course.learning_objectives.length > 0) {
      return course.learning_objectives
        .slice(0, 3)
        .map((s) => s.split(':')[0].trim().substring(0, 18));
    }
    return ['Threat Triage', 'Log Correlation', 'Incident Action'];
  };

  const durationStr = course.estimated_duration
    ? course.estimated_duration
    : '14 Hours';

  const enrolledStr = course.enrolled_count
    ? `${course.enrolled_count.toLocaleString()} Defenders`
    : '1,420 Defenders';

  const rewardStr = course.total_tokens_reward
    ? `+${course.total_tokens_reward} Bounty`
    : '+450 Tokens';

  const tagLabel = course.category
    ? course.category.toUpperCase()
    : (course.difficulty ? `${course.difficulty.toUpperCase()} TRACK` : 'DEFENSIVE SPECIALIST');

  // Specific metadata mappings per card requirements
  const metaList = [
    durationStr,
    enrolledStr,
    rewardStr
  ];

  return (
    <DictoCyberCard
      variant={variantNum}
      tag={tagLabel}
      title={course.title}
      description={course.overview}
      meta={metaList}
      badges={extractBadges()}
      actionHref={`/courses/${course.slug || course.id}`}
      actionText="Inspect Syllabus & Lab"
      progress={course.progress || 78}
      sockets={course.modules?.length || 4}
      className={className}
    />
  );
}
