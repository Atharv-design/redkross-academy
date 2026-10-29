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

  // Resolve stable variant index (0-9) from variantId ('variant-01' ... 'variant-10') or persistent card_variant
  const resolveVariantIndex = () => {
    const raw = variantId || course.card_variant;
    if (typeof raw === 'string') {
      const match = raw.match(/variant-?(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return ((num - 1) % 10 + 10) % 10;
      }
    }
    return (variantIndex % 10 + 10) % 10;
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
