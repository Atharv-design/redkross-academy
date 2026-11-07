/**
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
