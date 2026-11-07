import fs from 'fs';
import path from 'path';
import { parseChapter } from './compile_full_cyber_curriculum.mjs';

const BASE_DIR = path.resolve('RK course notes/Course 1 Introduction to Cybersecurity');
const CURRICULUM_DIR = path.resolve('src/services/db/curriculum');
const CYBER_COURSES_PATH = path.resolve('src/services/db/cyberCourses.js');

if (!fs.existsSync(CURRICULUM_DIR)) {
  fs.mkdirSync(CURRICULUM_DIR, { recursive: true });
}

// 1. First import current CYBER_COURSES to preserve Module 1 & course shell metadata
const { CYBER_COURSES } = await import('file:///' + CYBER_COURSES_PATH.replace(/\\/g, '/'));
const course = CYBER_COURSES[0];

// Module 1 is already cleanly formatted with 7 lessons and verified
const mod1 = course.modules[0];
fs.writeFileSync(
  path.join(CURRICULUM_DIR, 'module1.js'),
  `export const module1Data = ${JSON.stringify(mod1, null, 2)};\n`,
  'utf8'
);
console.log('Saved module1.js (7 lessons)');

// Exact photo map for all lessons in Modules 2-5
const photoMap = {
  2: {
    1: ['module2lesson1photo1.jpg', 'module2lesson1photo2.jpg'],
    2: ['module2lesson2photo1.jpg', 'module2lesson2photo2.jpg'],
    3: ['module2lesson3photo1.jpg'],
    4: ['module2lesson4photo1.jpg'],
    5: ['module2lesson5photo1.jpg'],
    6: ['module2lesson6photo1.jpg'],
    7: ['module2lesson7photo1.jpg'],
    8: ['module2lesson8photo1.jpg']
  },
  3: {
    1: ['module3lesson1photo1.jpg'],
    2: ['module3lesson2photo1.jpg', 'module3lesson2photo2.jpg', 'module3lesson2photo3.jpg'],
    3: ['module3lesson3photo1.jpg', 'module3lesson3photo2.jpg', 'module3lesson3photo3.jpg'],
    4: ['module3lesson4photo1.jpg', 'module3lesson4photo2.jpg', 'module3lesson4photo3.jpg'],
    5: ['module3lesson5photo1.jpg', 'module3lesson5photo2.jpg', 'module3lesson5photo3.jpg'],
    6: ['module3lesson6photo1.jpg', 'module3lesson6photo2.jpg', 'module3lesson6photo3.jpg'],
    7: ['module3lesson7photo1.jpg', 'module3lesson7photo2.jpg', 'module3lesson7photo3.jpg']
  },
  4: {
    1: ['module4lesson1photo1.jpg', 'module4lesson1photo2.jpg', 'module4lesson1photo3.jpg', 'module4lesson1photo4.jpg'],
    2: ['module4lesson2photo1.jpg', 'module4lesson2photo2.jpg', 'module4lesson2photo3.jpg', 'module4lesson2photo4.jpg'],
    3: ['module4lesson3photo1.jpg', 'module4lesson3photo2.jpg', 'module4lesson3photo3.jpg', 'module4lesson3photo4.jpg'],
    4: ['module4lesson4photo1.jpg', 'module4lesson4photo2.jpg', 'module4lesson4photo3.jpg', 'module4lesson4photo4.jpg'],
    5: ['module4lesson5photo1.jpg', 'module4lesson5photo2.jpg', 'module4lesson5photo3.jpg', 'module4lesson5photo4.jpg'],
    6: ['module4lesson6photo1.jpg', 'module4lesson6photo2.jpg', 'module4lesson6photo3.jpg', 'module4lesson6photo4.jpg']
  },
  5: {
    1: ['module5lesson1photo1.jpg', 'module5lesson1photo2.jpg', 'module5lesson1photo3.jpg', 'module5lesson1photo4.jpg'],
    2: ['module5lesson2photo1.jpg', 'module5lesson2photo2.jpg', 'module5lesson2photo3.jpg', 'module5lesson2photo4.jpg'],
    3: ['module5lesson3photo1.jpg', 'module5lesson3photo2.jpg', 'module5lesson3photo3.jpg', 'module5lesson3photo4.jpg'],
    4: ['module5lesson4photo1.jpg', 'module5lesson4photo2.jpg', 'module5lesson4photo3.jpg', 'module5lesson4photo4.jpg'],
    5: ['module5lesson5photo1.jpg', 'module5lesson5photo2.jpg', 'module5lesson5photo3.jpg', 'module5lesson5photo4.jpg']
  }
};

const moduleDirs = {
  2: 'Module 2 - Core Principles',
  3: 'Module 3 - Threat Landscape',
  4: 'Module 4 - Risk and vulnerability',
  5: 'Module 5 - Identity and access'
};

for (let m = 2; m <= 5; m++) {
  const dirPath = path.join(BASE_DIR, moduleDirs[m]);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.txt')).sort();
  const modData = course.modules[m - 1];

  console.log(`Compiling Module ${m}: ${modData.title} (${files.length} chapters)...`);

  files.forEach((file, idx) => {
    const chNum = idx + 1;
    const lesson = modData.lessons[idx];
    if (!lesson) {
      console.warn(`No lesson definition found for M${m} L${chNum}`);
      return;
    }

    const raw = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const photos = (photoMap[m] && photoMap[m][chNum]) || [];

    // Parse into rich semantic markdown with embedded photos and numbered parts
    const md = parseChapter(raw, lesson.title, photos);
    lesson.content = md;

    // Attach structured images metadata array
    lesson.images = photos.map((p, pIdx) => ({
      id: `img_c1_m${m}_l${chNum}_${pIdx + 1}`,
      title: `${lesson.title} - Visual Model ${pIdx + 1}`,
      url: `/assets/courses/cyber-01/${p}`,
      caption: `Technical reference architecture for ${lesson.title}.`,
      alt: `${lesson.title} Diagram ${pIdx + 1}`
    }));

    console.log(`  Processed ${lesson.id} (${lesson.title}): ${md.length} chars, ${photos.length} photos`);
  });

  fs.writeFileSync(
    path.join(CURRICULUM_DIR, `module${m}.js`),
    `export const module${m}Data = ${JSON.stringify(modData, null, 2)};\n`,
    'utf8'
  );
  console.log(`Saved module${m}.js (${modData.lessons.length} lessons)`);
}

// 2. Assemble new cyberCourses.js
const newCyberCourses = `/**
 * Defensive Cybersecurity Master Curriculum
 * Modular architecture: Modules 1 to 5 assembled cleanly from ./curriculum/
 */

import { module1Data } from './curriculum/module1.js';
import { module2Data } from './curriculum/module2.js';
import { module3Data } from './curriculum/module3.js';
import { module4Data } from './curriculum/module4.js';
import { module5Data } from './curriculum/module5.js';

export const CYBER_COURSES = [
  {
    "id": "crs_cyber_intro_01",
    "division": "cybersecurity",
    "slug": "introduction-to-cybersecurity",
    "title": "Course 01: Introduction to Cybersecurity",
    "version": "1.0",
    "category": "Foundations & Defense",
    "difficulty": "Beginner",
    "price": 0,
    "cert_price": 0,
    "estimated_duration": "8 Weeks",
    "effort": "4–6 Hours per Week",
    "access": "Free Institutional Access",
    "rating": 4.98,
    "enrolled_count": 1420,
    "card_variant": "random",
    "skills": [
      "CIA Triad",
      "Cyber Kill Chain",
      "Threat Modeling",
      "Attack Surface Analysis",
      "Security vs Privacy vs Safety",
      "Defensive CLI Toolkit"
    ],
    "milestone_cert": "Certified Cybersecurity Defender Associate (CCDA)",
    "lead_author": {
      "name": "RedKross Blue Team Faculty",
      "title": "Defensive Operations & Security Architecture",
      "role": "Director of Defensive Education, RedKross Research Foundation",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
    },
    "overview": "The institutional starting point for modern cyber defense. Master foundational security models, the CIA triad, threat surfaces, the Lockheed Martin Cyber Kill Chain, defense-in-depth architecture, and essential hands-on command-line toolkits.",
    "what_you_will_learn": [
      "Master the core CIA Triad (Confidentiality, Integrity, Availability) and balance security trade-offs.",
      "Analyze the 6-stage Cyber Kill Chain to detect, contain, and eradicate adversary operations.",
      "Differentiate between organizational security, individual privacy, and physical safety.",
      "Examine real-world breach case studies to understand attacker tactics and layered defensive countermeasures.",
      "Set up a hands-on cybersecurity research lab toolkit with command-line diagnostics."
    ],
    "learning_objectives": [
      "Foundational Security Definitions & Mental Models",
      "The CIA Triad & Real-World Failure Modes",
      "Cyber Kill Chain: Attack Assembly Line vs Defensive Interruption",
      "Attack Surface & Asset Classification",
      "Defensive Command Line & Toolkit Verification"
    ],
    "prerequisites": [
      "No prior programming or networking knowledge required. Designed from absolute scratch.",
      "A computer (Windows, macOS, or Linux) with permissions to run command-line terminal commands."
    ],
    "total_tokens_reward": 1500,
    "final_assessment": {
      "id": "exam_cyber_intro_final",
      "title": "Certified Cybersecurity Defender Associate (CCDA) Comprehensive Evaluation",
      "credential_title": "Certified Cybersecurity Defender Associate (CCDA)",
      "time_limit_minutes": 60,
      "passing_score": 80,
      "total_questions": 50,
      "proctored": true
    },
    "modules": [
      module1Data,
      module2Data,
      module3Data,
      module4Data,
      module5Data
    ]
  }
];

export const CYBER_INTRO_COURSE_01 = CYBER_COURSES[0];

export const CYBER_LEARNING_PATHS = [
  {
    id: 'path_intro_cybersecurity',
    division: 'cybersecurity',
    slug: 'foundational-cyber-defense-track',
    title: 'Foundational Cybersecurity & Defensive Operations Track',
    short_desc: 'Comprehensive entry point into defensive cyber operations: CIA Triad, attack surface modeling, threat hunting fundamentals, and access control engineering.',
    difficulty: 'Beginner',
    estimated_weeks: 8,
    total_hours: 36,
    courses_count: 1,
    milestone_cert: 'Certified Cybersecurity Defender Associate (CCDA)',
    featured: true,
    skills: ['CIA Triad', 'Cyber Kill Chain', 'Threat Modeling', 'Attack Surface Analysis', 'Security vs Privacy vs Safety', 'Linux Terminal'],
    course_ids: ['crs_cyber_intro_01']
  }
];
`;

fs.writeFileSync(CYBER_COURSES_PATH, newCyberCourses, 'utf8');
console.log('Successfully compiled and wired Modules 1-5 into cyberCourses.js!');
