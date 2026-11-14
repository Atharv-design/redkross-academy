import React, { useEffect, useState } from 'react';

/**
 * Forensic watermark over the question area: the student's name, cadet id, a short
 * session code and the time, tiled diagonally at low opacity. Any photo of the
 * screen (for example taken with a phone outside the webcam's view) shows who
 * leaked it and when; admins can match the session code in the console.
 */
export default function ExamWatermark({ name, cadetId, sessionId }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const code = String(sessionId || '').replace(/^as_/, '').slice(-8).toUpperCase() || 'PRACTICE';
  const stamp = now.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  const text = `${name || 'Student'} · ${cadetId || ''} · ${code} · ${stamp}`;

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="160">` +
    `<text x="10" y="90" transform="rotate(-18 210 80)" fill="#ffffff" fill-opacity="0.09" ` +
    `font-family="monospace" font-size="13">${esc(text)}</text></svg>`;

  return (
    <div
      aria-hidden="true"
      data-exam-watermark
      className="pointer-events-none select-none absolute inset-0 z-10 rounded-2xl"
      style={{ backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`, backgroundRepeat: 'repeat' }}
    />
  );
}
