import React, { useRef, useState, useEffect } from 'react';

/**
 * SplitText
 * Splits text into evenly spaced words with progressive left-to-right
 * scroll-triggered entrance animations.
 *
 * Triggers ONLY when the user actually scrolls down and reaches the component in viewport.
 */
export default function SplitText({
  text,
  children,
  as: Tag = 'h2',
  className = '',
  wordClassName = '',
  staggerDelay = 50,
  baseDelay = 0,
  threshold = 0.15,
  once = true,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const rawText = typeof text === 'string' ? text : (typeof children === 'string' ? children : '');

  useEffect(() => {
    const el = containerRef.current;
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

  if (!rawText) {
    return (
      <Tag
        ref={containerRef}
        className={`${className} transition-all duration-600 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
        }`}
        style={style}
        {...props}
      >
        {children}
      </Tag>
    );
  }

  const words = rawText.split(' ').filter(Boolean);

  return (
    <Tag
      ref={containerRef}
      className={className}
      aria-label={rawText}
      style={style}
      {...props}
    >
      {words.map((word, idx) => {
        const delay = baseDelay + idx * staggerDelay;
        return (
          <span
            key={`${word}-${idx}`}
            aria-hidden="true"
            className={`inline-block transition-all duration-600 cubic-bezier(0.16, 1, 0.3, 1) ${wordClassName} ${
              isVisible
                ? 'opacity-100 translate-x-0 blur-0'
                : 'opacity-0 -translate-x-5 blur-[1px]'
            }`}
            style={{
              transitionDelay: `${delay}ms`,
              marginRight: idx === words.length - 1 ? 0 : '0.28em',
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
}
