/**
 * Whether heavy animated backgrounds (WebGL clouds / shaders) should run.
 * Off for: users who ask for reduced motion, phones and small tablets, and
 * data-saver connections. The static gradients and watermark still render.
 */
export function shouldAnimateBackground() {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.innerWidth < 768) return false;
    if (navigator.connection?.saveData) return false;
  } catch {
    // ignore
  }
  return true;
}
