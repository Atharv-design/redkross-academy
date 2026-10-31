/**
 * RedKross Ecosystem Dynamic Link Resolver
 * Directs traffic to the official verified endpoints across both local development and production.
 * Cybersecurity: https://cybersecurity.redkross.org.in/ (Verified HTTP 200 OK)
 */

export const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local')
  );
};

export const getEcosystemLinks = () => {
  const isLocal = isLocalhost();

  return {
    // Verified Cybersecurity Platform
    cybersecurity: import.meta.env.VITE_CYBERSECURITY_URL || 'https://cybersecurity.redkross.org.in/',
    cybersecurityLocal: 'http://localhost:5174',

    // Official Parent Foundation
    foundation: import.meta.env.VITE_FOUNDATION_URL || 'https://redkross.org.in',
    foundationLocal: 'http://localhost:3000',

    // Psychology Platform
    psychology: import.meta.env.VITE_PSYCHOLOGY_URL || 'https://psychology.redkross.org.in',
    psychologyLocal: 'http://localhost:5175',

    // Academy Platform
    academy: isLocal ? 'http://localhost:5173' : 'https://redkross-academy.vercel.app',

    // Official Channels & Social Community
    instagram: 'https://www.instagram.com/redkross_research_foundation?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
    whatsapp: 'https://whatsapp.com/channel/0029VbBbRCn7tkj2M1Sj7f3Z',
  };
};
