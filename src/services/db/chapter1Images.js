/**
 * RedKross Academy — Course Static Asset Mapping for Cyber Curriculum
 * Uses optimized static assets from public directory to ensure instant loading without bundle bloating.
 */

export const CHAPTER_1_IMAGES = new Proxy(
  {
    '/assets/courses/cyber-01/cia-triad.jpg': '/assets/courses/cyber-01/cia-triad.jpg',
    '/assets/courses/cyber-01/cyber-kill-chain.jpg': '/assets/courses/cyber-01/cyber-kill-chain.jpg',
    '/assets/courses/cyber-01/security-privacy-safety.jpg': '/assets/courses/cyber-01/security-privacy-safety.jpg',
    '/assets/courses/cyber-01/terminal-toolkit.jpg': '/assets/courses/cyber-01/terminal-toolkit.jpg'
  },
  {
    get(target, prop) {
      if (typeof prop === 'string') {
        if (prop in target) return target[prop];
        if (prop.startsWith('/assets/courses/')) return prop;
      }
      return target[prop] || prop;
    }
  }
);
