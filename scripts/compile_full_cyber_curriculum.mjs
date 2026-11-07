import fs from 'fs';
import path from 'path';

// Text cleaning utility
export function cleanText(text) {
  let res = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Fix character encoding quirks
  res = res
    .replace(/\uFFFD\?"/g, ' — ')
    .replace(/\?"/g, ' — ')
    .replace(/â€”/g, ' — ')
    .replace(/â€“/g, ' – ')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\x9d/g, '"')
    .replace(/â€\x9c/g, '"')
    .replace(/\u00A0/g, ' ');

  // Cut off artist summaries & image placement tables at bottom
  const cutOffs = [
    'Diagram Placement Summary',
    'Image Placement Guide',
    'Image Prompts for',
    '## Image Prompts',
    'DIAGRAM PLACEMENT SUMMARY',
    'IMAGE PLACEMENT SUMMARY'
  ];
  for (const kw of cutOffs) {
    const idx = res.indexOf(kw);
    if (idx !== -1) {
      res = res.substring(0, idx).trim();
    }
  }
  return res;
}

// Format glossary text into vertical bullet points
export function formatGlossary(body) {
  const glossaryMarker = /Glossary of \d+ [tT]erms:?/i;
  const match = body.match(glossaryMarker);
  if (!match) return body;

  const headerEnd = match.index + match[0].length;
  const preGlossary = body.slice(0, match.index).trim();
  const markerText = match[0].trim();
  const postGlossary = body.slice(headerEnd).trim();

  const lines = postGlossary.split('\n').map(l => l.trim()).filter(Boolean);
  const items = [];
  const otherLines = [];
  let inItems = true;

  for (const line of lines) {
    // If the line has multiple terms in one paragraph
    const subTerms = line.split(/(?<=[.!?])\s+(?=[A-Z0-9][\w\s/().,'"-]{1,50}\s*[—–-])/);
    for (const st of subTerms) {
      const trimmed = st.trim();
      const termMatch = trimmed.match(/^[-*]?\s*(?:\*\*)?(.+?)(?:\*\*)?\s*(?:[—–:]|--|\s+-\s+)\s*(.*)$/);
      if (inItems && termMatch) {
        const term = termMatch[1].trim();
        const def = termMatch[2].trim();
        items.push(`- **${term}**: ${def}`);
      } else {
        inItems = false;
        otherLines.push(trimmed);
      }
    }
  }

  let result = preGlossary ? `${preGlossary}\n\n### ${markerText}` : `### ${markerText}`;
  result += '\n\n' + items.join('\n\n');
  if (otherLines.length) {
    result += '\n\n' + otherLines.join('\n\n');
  }
  return result;
}

// Format practice questions into a numbered vertical list
export function formatQuestions(body) {
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return body;

  let preamble = [];
  let questionLines = [];

  for (const line of lines) {
    if (
      line.toLowerCase().includes('answer these from memory') ||
      line.toLowerCase().includes('check yourself') ||
      line.toLowerCase().includes('try to answer')
    ) {
      preamble.push(line);
    } else {
      questionLines.push(line);
    }
  }

  // Extract individual questions
  const questions = [];
  for (const ql of questionLines) {
    // Strip leading numbering if present
    const cleanQ = ql.replace(/^\d+[\.\)]\s*/, '').trim();
    if (cleanQ) {
      questions.push(cleanQ);
    }
  }

  let result = '';
  if (preamble.length) {
    result += preamble.join('\n\n') + '\n\n';
  }
  result += questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');
  return result;
}

// Parse and format an entire chapter into semantic markdown with photos
export function parseChapter(rawText, chTitle, photoUrls = []) {
  const text = cleanText(rawText);

  // Split into parts by "Part X — ..." or "Part X: ..." or "Part X - ..."
  const partRegex = /(?:^|\n)(?:---\s*)?(?:##\s*)?Part\s*(\d+)\s*(?:[—:–-]\s*|\s+)(.*?)(?=\n|$)/gi;
  const parts = [];
  let match;
  let partMatches = [];

  while ((match = partRegex.exec(text)) !== null) {
    partMatches.push({
      pNum: parseInt(match[1], 10),
      rawTitle: match[2].trim(),
      startIndex: match.index,
      headerLength: match[0].length
    });
  }

  if (partMatches.length === 0) {
    // Fallback if no parts detected (preserve raw text)
    return `# ${chTitle}\n\n${text}`;
  }

  for (let i = 0; i < partMatches.length; i++) {
    const cur = partMatches[i];
    const nextStart = (i + 1 < partMatches.length) ? partMatches[i + 1].startIndex : text.length;
    const body = text.substring(cur.startIndex + cur.headerLength, nextStart).trim();
    parts.push({
      pNum: cur.pNum,
      title: cur.rawTitle,
      body: body
    });
  }

  // Filter out Guided Mini-Lab parts (user rule: tools in panel 3, no local mini-labs in theory)
  const keptParts = parts.filter(p => !p.title.toLowerCase().includes('mini-lab') && !p.title.toLowerCase().includes('lab toolkit'));

  // Track which photos have been embedded via direct IMAGE / DIAGRAM replacement
  const embeddedPhotos = new Set();

  let mdParts = [];
  let seq = 1;

  for (let i = 0; i < keptParts.length; i++) {
    const p = keptParts[i];
    let body = p.body;

    // Check for inline IMAGE or DIAGRAM markers to replace with real photos
    // Matches e.g. "IMAGE 1 — The CIA triad..." or "[DIAGRAM 1 PLACEMENT: ...]"
    for (let pIdx = 0; pIdx < photoUrls.length; pIdx++) {
      const num = pIdx + 1;
      const pFile = photoUrls[pIdx];

      // Pattern 1: IMAGE 1 — ...
      const imgRegex = new RegExp(`IMAGE\\s*${num}\\s*[—–-][^\\n]+(?:\\n[^\\n#]+)*`, 'gi');
      if (imgRegex.test(body)) {
        body = body.replace(imgRegex, `![Diagram ${num}: ${chTitle}](/assets/courses/cyber-01/${pFile})\n\n*Figure ${num}: Architectural illustration for ${chTitle}.*`);
        embeddedPhotos.add(pFile);
      }

      // Pattern 2: [DIAGRAM 1 PLACEMENT: ...]
      const diagRegex = new RegExp(`\\[DIAGRAM\\s*${num}[^\\]]*\\]`, 'gi');
      if (diagRegex.test(body)) {
        body = body.replace(diagRegex, `![Diagram ${num}: ${chTitle}](/assets/courses/cyber-01/${pFile})\n\n*Figure ${num}: Architectural illustration for ${chTitle}.*`);
        embeddedPhotos.add(pFile);
      }
    }

    // Clean any remaining unplaced IMAGE or DIAGRAM tags
    body = body.replace(/IMAGE\s*\d+\s*[—–-][^\n]+(?:\n[^\n#]+)*/gi, '');
    body = body.replace(/\[DIAGRAM\s*\d+[^\]]*\]/gi, '');

    // Format glossary if applicable
    if (p.title.toLowerCase().includes('glossary') || p.title.toLowerCase().includes('summary')) {
      body = formatGlossary(body);
    }

    // Format practice questions if applicable
    if (p.title.toLowerCase().includes('practice') || p.title.toLowerCase().includes('quick-check')) {
      body = formatQuestions(body);
    }

    // If there are photos that were not matched by inline markers, embed them at appropriate concept parts
    if (seq === 4 && photoUrls[0] && !embeddedPhotos.has(photoUrls[0])) {
      body = `![Diagram 1: ${chTitle}](/assets/courses/cyber-01/${photoUrls[0]})\n\n*Figure 1: Core foundational model for ${chTitle}.*\n\n` + body;
      embeddedPhotos.add(photoUrls[0]);
    } else if (seq === 5 && photoUrls[1] && !embeddedPhotos.has(photoUrls[1])) {
      body = `![Diagram 2: ${chTitle}](/assets/courses/cyber-01/${photoUrls[1]})\n\n*Figure 2: Operational workflow for ${chTitle}.*\n\n` + body;
      embeddedPhotos.add(photoUrls[1]);
    } else if (seq === 6 && photoUrls[2] && !embeddedPhotos.has(photoUrls[2])) {
      body = `![Diagram 3: ${chTitle}](/assets/courses/cyber-01/${photoUrls[2]})\n\n*Figure 3: System architecture for ${chTitle}.*\n\n` + body;
      embeddedPhotos.add(photoUrls[2]);
    } else if (seq === 7 && photoUrls[3] && !embeddedPhotos.has(photoUrls[3])) {
      body = `![Diagram 4: ${chTitle}](/assets/courses/cyber-01/${photoUrls[3]})\n\n*Figure 4: Reference matrix for ${chTitle}.*\n\n` + body;
      embeddedPhotos.add(photoUrls[3]);
    }

    mdParts.push(`## Part ${seq} — ${p.title}\n\n${body}`);
    seq++;
  }

  // Any remaining photo that hasn't been placed anywhere yet
  const unplaced = photoUrls.filter(p => !embeddedPhotos.has(p));
  if (unplaced.length > 0 && mdParts.length >= 4) {
    const attachIdx = Math.min(3, mdParts.length - 1);
    const extraImgs = unplaced.map((p, idx) => `\n\n![Additional Technical Diagram](/assets/courses/cyber-01/${p})\n\n*Figure: Technical reference diagram for ${chTitle}.*`).join('');
    mdParts[attachIdx] += extraImgs;
  }

  return `# Course 01: Introduction to Cybersecurity\n\n\n---\n\n` + mdParts.join('\n\n---\n\n');
}
