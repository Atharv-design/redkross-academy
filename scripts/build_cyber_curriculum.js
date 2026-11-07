/**
 * RedKross Academy — Defensive Cybersecurity Curriculum Compiler
 * Reads authoritative lesson notes from "RK course notes/"
 * Transforms raw text into high-craft, semantic markdown with Mermaid diagrams and tables
 * Compiles Course 01 (Module 1, Lessons 1 to 8) into cyberCourses.js and fullstackCourse.json
 */

import fs from 'fs';
import path from 'path';

const NOTES_DIR = path.resolve('RK course notes/Course 1 Introduction to Cybersecurity/Module 1 - Fountion Lesson');
const CYBER_COURSES_PATH = path.resolve('src/services/db/cyberCourses.js');
const FULLSTACK_JSON_PATH = path.resolve('src/services/db/fullstackCourse.json');

// Unique diagrams per chapter (Mermaid diagrams & image assets)
const CHAPTER_DIAGRAMS = {
  1: {
    image1: `![The CIA Triad: Confidentiality, Integrity, and Availability](/assets/courses/cyber-01/cia-triad.jpg)`,
    image2: `![The 6-Stage Cyber Kill Chain & Defensive Path](/assets/courses/cyber-01/cyber-kill-chain.jpg)`,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  2: {
    image1: `\`\`\`mermaid
flowchart LR
    A["1988: Morris Worm<br/>(First Internet Worm)"] --> B["2003: SQL Slammer<br/>(Buffer Overflow Speed)"]
    B --> C["2007: TJX Breach<br/>(Retail POS Exfiltration)"]
    C --> D["2010: Stuxnet<br/>(Cyber-Physical SCADA)"]
    D --> E["2013: Target Breach<br/>(HVAC Supply Chain)"]
    E --> F["2016: Dyn DDoS<br/>(Mirai IoT Botnet)"]
    F --> G["2017: WannaCry<br/>(EternalBlue Ransomware)"]
    G --> H["2020: SolarWinds<br/>(Nation-State Supply Chain)"]
\`\`\``,
    image2: `![The 6-Stage Cyber Kill Chain & Defensive Path](/assets/courses/cyber-01/cyber-kill-chain.jpg)`,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  3: {
    image1: `\`\`\`mermaid
flowchart TD
    Org["ORGANISATIONAL ASSETS"]
    Org --> Data["1. Data Assets<br/>(PII, Financials, DBs, Source Code)"]
    Org --> Sys["2. System Assets<br/>(Servers, Endpoints, Routers, Cloud)"]
    Org --> Ppl["3. People Assets<br/>(Employees, Contractors, Admins)"]
    Org --> Phys["4. Physical Assets<br/>(Datacenters, Laptops, Badge Readers)"]
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  4: {
    image1: `\`\`\`mermaid
flowchart LR
    Attacker["External Adversary"]
    subgraph Perimeter ["Organizational Perimeter"]
        FW["Firewall & WAF"]
        Exposed["Open Port / Shadow IT"]
    end
    subgraph Internal ["Internal Network"]
        WS["Workstation"]
        DC["Domain Controller"]
        DB["Customer Database"]
    end
    Attacker -.->|"Blocked"| FW
    Attacker ==>|"Exploited"| Exposed
    Exposed ==> WS
    WS -->|"Lateral Movement"| DC
    DC -->|"Data Exfiltration"| DB
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  5: {
    image1: `\`\`\`mermaid
flowchart TD
    Sec["SECURITY<br/>System integrity, access control, preventing compromise"]
    Priv["PRIVACY<br/>User consent, data minimization, who sees what"]
    Safe["SAFETY<br/>Physical protection, avoiding bodily harm or loss of life"]
    Sec --- Overlap["TRUSTED SYSTEM CORE"]
    Priv --- Overlap
    Safe --- Overlap
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  6: {
    image1: `\`\`\`mermaid
flowchart TD
    Net((GLOBAL CYBER ECOSYSTEM))
    Net <--> NS["Nation-State Actors (APTs)"]
    Net <--> OC["Cybercrime Syndicates (Ransomware)"]
    Net <--> Hack["Hacktivists & Ideological Actors"]
    Net <--> SK["Script Kiddies & Opportunists"]
    Net <--> Ins["Insiders (Malicious & Negligent)"]
    Net <--> Def["Defenders (SOC, CSIRT, Blue Teams)"]
    Net <--> Reg["Regulators & Law Enforcement (CERT, FBI)"]
    Net <--> Res["Security Researchers & White Hats"]
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  7: {
    image1: `\`\`\`mermaid
flowchart LR
    Vocab((CYBER LEXICON))
    Vocab --> Fnd["Foundations<br/>CIA, Threat, Risk, Vuln"]
    Vocab --> Mal["Malware<br/>Virus, Worm, Trojan, Ransomware"]
    Vocab --> Att["Attacks<br/>Phishing, DDoS, MITM, SQLi"]
    Vocab --> Def["Defense<br/>EDR, SIEM, MFA, Firewall"]
    Vocab --> Ops["Operations<br/>Triage, Forensics, Playbooks"]
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  },
  8: {
    image1: `\`\`\`mermaid
flowchart TD
    L1["Layer 1: Host Workstation (Windows, macOS, or Linux)"]
    L2["Layer 2: Virtualization & Hypervisor (VirtualBox / VMware)"]
    L3["Layer 3: Security OS (Kali Linux / REMnux VM)"]
    L4["Layer 4: Defensive CLI Toolkit (Python, Nmap, Wireshark, Tshark)"]
    L5["Layer 5: Safe Network Isolation (NAT / Host-Only Adapter)"]
    L1 --> L2 --> L3 --> L4 --> L5
\`\`\``,
    image2: `\`\`\`mermaid
flowchart TD
    Tier4["RESTRICTED / TOP SECRET<br/>Severe legal, operational, and financial catastrophe if leaked"]
    Tier3["CONFIDENTIAL / SENSITIVE<br/>Customer PII, internal financials, source code repositories"]
    Tier2["INTERNAL ONLY<br/>Operating procedures, staff directories, intranet wikis"]
    Tier1["PUBLIC<br/>Marketing blogs, press releases, public documentation"]
    Tier4 --> Tier3 --> Tier2 --> Tier1
\`\`\``,
    image3: `![Linux Defensive Lab Toolkit Verification](/assets/courses/cyber-01/terminal-toolkit.jpg)`,
    image4: `![Security vs Privacy vs Safety Comparison Matrix](/assets/courses/cyber-01/security-privacy-safety.jpg)`
  }
};

export function cleanAndFormatChapter(rawContent, chapterNum) {
  let text = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 1. Fix character encodings
  text = text
    .replace(/\uFFFD\?"/g, ' — ')
    .replace(/\?"/g, ' — ')
    .replace(/\?"/g, ' — ')
    .replace(/â€”/g, ' — ')
    .replace(/â€“/g, ' – ')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\x9d/g, '"')
    .replace(/â€\x9c/g, '"');

  // 2. Strip bottom author notes & diagram summaries
  const cutOffKeywords = [
    'Diagram Placement Summary',
    'Image Placement Guide',
    'Image Prompts for Course 01',
    'Image Prompts for',
    '## Image Prompts'
  ];
  for (const kw of cutOffKeywords) {
    const idx = text.indexOf(kw);
    if (idx !== -1) {
      text = text.substring(0, idx).trim();
    }
  }

  // 3. Extract title and metadata from header lines
  const lines = text.split('\n');
  let title = `Lesson ${chapterNum}`;
  let headerEndIdx = 0;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    if (line.toLowerCase().startsWith('lesson')) {
      const parts = line.split(':');
      if (parts.length > 1) {
        title = `1.${chapterNum} ${parts.slice(1).join(':').trim()}`;
      }
      headerEndIdx = i + 1;
    }
  }

  // Trim top header lines so we start directly with Course/Module banner
  const bodyLines = lines.slice(headerEndIdx);
  text = bodyLines.join('\n').trim();

  // Handle specific sub-part patterns (e.g. Chapter 8 maintenance plan)
  text = text.replace(/The maintenance plan has four parts:[\s\S]*?(?=Part 9)/i, (match) => {
    return match
      .replace(/^Part 1:\s*/gm, '### Maintenance Phase 1: ')
      .replace(/^Part 2:\s*/gm, '### Maintenance Phase 2: ')
      .replace(/^Part 3:\s*/gm, '### Maintenance Phase 3: ')
      .replace(/^Part 4:\s*/gm, '### Maintenance Phase 4: ');
  });

  // 4. Normalize Part Headers: "Part X — ..." -> "## Part X — ..."
  text = text.replace(/^Part\s*(\d+)\s*[—–-]\s*(.*)$/gm, '\n---\n\n## Part $1 — $2\n');
  text = text.replace(/^Part\s*(\d+)\s*:\s*(.*)$/gm, '\n---\n\n## Part $1 — $2\n');

  // 5. Replace inline IMAGE descriptions with rich diagrams/assets
  const diagrams = CHAPTER_DIAGRAMS[chapterNum] || CHAPTER_DIAGRAMS[1];
  
  // Replace IMAGE 1 description block
  text = text.replace(/IMAGE\s*1\s*[—–-][^\n]+(?:\n[^\n#]+)*/gi, `\n\n${diagrams.image1}\n\n`);
  text = text.replace(/IMAGE\s*2\s*[—–-][^\n]+(?:\n[^\n#]+)*/gi, `\n\n${diagrams.image2}\n\n`);
  text = text.replace(/IMAGE\s*3\s*[—–-][^\n]+(?:\n[^\n#]+)*/gi, `\n\n${diagrams.image3}\n\n`);
  text = text.replace(/IMAGE\s*4\s*[—–-][^\n]+(?:\n[^\n#]+)*/gi, `\n\n${diagrams.image4}\n\n`);

  // Remove any remaining raw image markers
  text = text.replace(/\[?IMAGE\s*\d+[^\]\n]*\]?/gi, '');

  // 6. Subheading normalization
  text = text.replace(/^Step\s*(\d+)\s*:\s*(.*)$/gm, '### Step $1: $2');
  text = text.replace(/^Question\s*(\d+)\s*:\s*(.*)$/gm, '### Question $1: $2');
  text = text.replace(/^Mistake\s*(\d+)\s*:\s*(.*)$/gm, '### Mistake $1: $2');

  // 7. Format CLI commands into ```bash blocks
  text = text.replace(/```\s*\n(python3|which|nmap|ping|traceroute|curl|id|whoami|cat|ls|chmod)/g, '```bash\n$1');

  // 8. Extract learning objectives from Part 2
  const objectives = [];
  const part2Match = text.match(/## Part 2 — Learning Objectives([\s\S]*?)---/);
  if (part2Match) {
    const objBlock = part2Match[1];
    const objLines = objBlock.split('\n');
    for (const l of objLines) {
      const clean = l.replace(/^[-*•\d.]+\s*/, '').trim();
      if (clean && clean.length > 10 && !clean.toLowerCase().includes('by the end of this lesson')) {
        objectives.push(clean);
      }
    }
  }

  // 9. Synthesize summary from Part 1
  let summary = '';
  const part1Match = text.match(/## Part 1 — Hook: Why This Matters([\s\S]*?)---/);
  if (part1Match) {
    const sentences = part1Match[1]
      .replace(/\n+/g, ' ')
      .trim()
      .split(/(?<=[.!?])\s+/);
    summary = sentences.slice(0, 2).join(' ').trim();
  }
  if (!summary || summary.length < 20) {
    summary = `Master foundational cybersecurity operations, core threat modeling, defensive controls, and practical laboratory exercises in 1.${chapterNum}.`;
  }

  // Prefix full markdown with clean H1 header banner
  const fullContent = `# Course 01: Introduction to Cybersecurity\n\n${text}`.trim();

  return {
    id: `les_c1_m1_l${chapterNum}`,
    title,
    duration: chapterNum === 8 ? '60 mins' : '45 mins',
    is_mandatory: true,
    summary,
    learning_objectives: objectives.slice(0, 5),
    video_url: null,
    videos: [],
    images: [
      {
        id: `img_c1_m1_l${chapterNum}_1`,
        title: `Instructional Concept Diagram for Chapter ${chapterNum}`,
        url: `/assets/courses/cyber-01/cia-triad.jpg`,
        caption: `Architectural reference model for Chapter ${chapterNum}.`,
        alt: `Chapter ${chapterNum} Concept Architecture`
      }
    ],
    content: fullContent
  };
}

export function buildAllModule1Lessons() {
  console.log('=== REDKROSS ACADEMY CURRICULUM COMPILER ===');
  console.log(`Scanning authoritative notes from: ${NOTES_DIR}`);

  const lessons = [];
  for (let c = 1; c <= 8; c++) {
    const filename = `Cybersecurity Course 1-Introduction to Cybersecurity Module 1 Chapter ${c}.txt`;
    const filepath = path.join(NOTES_DIR, filename);

    if (!fs.existsSync(filepath)) {
      throw new Error(`Authoritative note missing: ${filepath}`);
    }

    const raw = fs.readFileSync(filepath, 'utf8');
    const lesson = cleanAndFormatChapter(raw, c);
    lessons.push(lesson);

    console.log(`✓ Compiled Chapter ${c}: "${lesson.title}" (${lesson.content.length} chars)`);
  }

  return lessons;
}

export function compileAndSyncModule1() {
  const lessons = buildAllModule1Lessons();

  // 1. Update fullstackCourse.json
  console.log(`Writing lessons to: ${FULLSTACK_JSON_PATH}`);
  const jsonContent = JSON.parse(fs.readFileSync(FULLSTACK_JSON_PATH, 'utf8'));
  jsonContent.modules[0].lessons = lessons;
  fs.writeFileSync(FULLSTACK_JSON_PATH, JSON.stringify(jsonContent, null, 2), 'utf8');
  console.log('✓ Successfully updated fullstackCourse.json');

  // 2. Update cyberCourses.js
  console.log(`Writing lessons to: ${CYBER_COURSES_PATH}`);
  let jsContent = fs.readFileSync(CYBER_COURSES_PATH, 'utf8');

  // Find start of lessons array in module 1: "id: 'mod_c1_1'," ... "lessons: ["
  const mod1Start = jsContent.indexOf("id: 'mod_c1_1'");
  if (mod1Start === -1) throw new Error("Could not find mod_c1_1 in cyberCourses.js");

  const lessonsKeyword = "lessons: [";
  const lessonsStart = jsContent.indexOf(lessonsKeyword, mod1Start);
  if (lessonsStart === -1) throw new Error("Could not find lessons: [ in mod_c1_1");

  // Find the end of this lessons array before "id: 'mod_c1_2'"
  const mod2Start = jsContent.indexOf("id: 'mod_c1_2'");
  if (mod2Start === -1) throw new Error("Could not find mod_c1_2 in cyberCourses.js");

  // Find the closing bracket of the lessons array before mod_c1_2
  const closingBraceIdx = jsContent.lastIndexOf(']', mod2Start);
  if (closingBraceIdx === -1 || closingBraceIdx < lessonsStart) {
    throw new Error("Could not locate end of lessons array in mod_c1_1");
  }

  const lessonsJsString = JSON.stringify(lessons, null, 8);
  const before = jsContent.substring(0, lessonsStart + lessonsKeyword.length);
  const after = jsContent.substring(closingBraceIdx);

  // Reassemble file
  const newJsContent = before + '\n' + lessonsJsString.slice(1, -1).trim() + '\n      ' + after;
  fs.writeFileSync(CYBER_COURSES_PATH, newJsContent, 'utf8');
  console.log('✓ Successfully updated cyberCourses.js with all 8 lessons');

  return { success: true, count: lessons.length };
}

// If invoked directly from command line
if (process.argv[1] && process.argv[1].includes('build_cyber_curriculum.js')) {
  compileAndSyncModule1();
}
