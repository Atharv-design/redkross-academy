import React from 'react';
import AcademicKitCard, { resolveCourseDesign } from './AcademicKitCard';

/**
 * CourseCardVariant
 * Dynamically resolves and renders 3D Cyber Academic Kit Cards across all 10 courses,
 * incorporating full-bleed 3D artwork, geometric chamfer cuts, multi-layer text fade,
 * and persistent or admin-assigned design parameters.
 */
export default function CourseCardVariant({
  course,
  variantId,
  variantIndex = 0,
  shape = 'auto',
  className = '',
}) {
  if (!course) return null;

  const resolveVariantIndex = () => {
    const raw = variantId || course.card_variant;
    if (typeof raw === 'string' && raw !== 'random') {
      const match = raw.match(/variant-?(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return ((num - 1) % 10 + 10) % 10;
      }
    }
    // Random choice from 10 distinct card designs
    return Math.floor(Math.random() * 10);
  };

  const variant = resolveVariantIndex();

  return (
    <AcademicKitCard
      course={course}
      index={variant}
      art={course.art}
      artPos={course.artPos}
      shape={shape !== 'auto' ? shape : undefined}
      className={className}
    />
  );
}
