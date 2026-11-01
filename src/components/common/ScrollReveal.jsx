import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal
 * Smooth scroll-triggered entrance wrapper.
 * Triggers ONLY when user scrolls down and reaches the element in viewport.
 */
export default function ScrollReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  direction = 'left', // 'left', 'right', 'up'
  distance = 28,
  duration = 600,
  threshold = 0.15,
  once = true,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    if (direction === 'left') return `translate3d(-${distance}px, 0, 0)`;
    if (direction === 'right') return `translate3d(${distance}px, 0, 0)`;
    return `translate3d(0, ${distance}px, 0)`;
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
