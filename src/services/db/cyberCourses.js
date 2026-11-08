/**
 * Defensive Cybersecurity Master Curriculum
 * Modular architecture: Modules 1 to 5 assembled cleanly from ./curriculum/
 */

import { module1Data } from './curriculum/module1.js';
import { module2Data } from './curriculum/module2.js';
import { module3Data } from './curriculum/module3.js';
import { module4Data } from './curriculum/module4.js';
import { module5Data } from './curriculum/module5.js';
import { module6Data } from './curriculum/module6.js';

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
    "estimated_duration": "10 Weeks",
    "effort": "6–8 Hours per Week",
    "access": "Free Institutional Access",
    "rating": 4.98,
    "enrolled_count": 1420,
    "card_variant": "random",
    "skills": [
      "CIA Triad & Defense-in-Depth",
      "Lockheed Martin Cyber Kill Chain",
      "Threat Modeling & STRIDE",
      "5×5 Risk Matrix & CVSS v3.1",
      "Identity, MFA & Access Control",
      "Applied Cryptography (AES & TLS 1.3)",
      "SOC Operations & SIEM Telemetry",
      "Incident Response (NIST SP 800-61)",
      "DPDP Act 2023 & Compliance",
      "NICE Workforce Career Mapping"
    ],
    "milestone_cert": "Certified Cybersecurity Defender Associate (CCDA)",
    "lead_author": {
      "name": "RedKross Blue Team Faculty",
      "title": "Defensive Operations & Security Architecture",
      "role": "Director of Defensive Education, RedKross Research Foundation",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
    },
    "overview": "The institutional starting point for modern cyber defense. Master foundational security models, the CIA triad, the Lockheed Martin Cyber Kill Chain, STRIDE threat modeling, CVSS v3.1 scoring, authentication and access controls, applied cryptography, SOC incident management, and Indian cyber law (IT Act & DPDP Act 2023).",
    "what_you_will_learn": [
      "Master the CIA Triad (Confidentiality, Integrity, Availability) and balance organizational security trade-offs.",
      "Analyze adversary operations across the 6-stage Lockheed Martin Cyber Kill Chain to intercept intrusions early.",
      "Perform enterprise threat modeling using STRIDE and evaluate vulnerability severity using CVSS v3.1 vectors.",
      "Architect robust identity ecosystems with Multi-Factor Authentication, Role-Based Access Control, and PAM.",
      "Deploy applied cryptographic controls including AES-GCM, TLS 1.3 hybrid handshakes, and digital signatures.",
      "Execute security operations center (SOC) triage, NIST SP 800-61 incident response, and DPDP Act 2023 governance."
    ],
    "learning_objectives": [
      "Foundational Cybersecurity Principles & Defense-in-Depth Architecture",
      "Adversary Kill Chains, Threat Actor Profiling & Defensive Interception",
      "Quantitative Risk Assessment, 5×5 Matrix & CVSS Scoring Mechanics",
      "Identity Lifecycle, Multi-Factor Authentication & Zero Trust Controls",
      "Applied Cryptography, TLS 1.3 Handshakes & Digital Signature Verification",
      "Enterprise SOC Operations, Incident Response Lifecycles & DPDP Compliance"
    ],
    "prerequisites": [
      "No prior programming, networking, or cybersecurity knowledge required. Built from absolute scratch.",
      "A standard desktop or laptop (Windows, macOS, or Linux) with a modern web browser."
    ],
    "total_tokens_reward": 1500,
    "final_assessment": {
      "id": "exam_cyber_intro_final",
      "title": "Certified Cybersecurity Defender Associate (CCDA) Comprehensive Evaluation",
      "credential_title": "Certified Cybersecurity Defender Associate (CCDA)",
      "time_limit_minutes": 60,
      "passing_score": 80,
      "total_questions": 60,
      "proctored": true
    },
    "modules": [
      module1Data,
      module2Data,
      module3Data,
      module4Data,
      module5Data,
      module6Data
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
    estimated_weeks: 10,
    total_hours: 45,
    courses_count: 1,
    milestone_cert: 'Certified Cybersecurity Defender Associate (CCDA)',
    featured: true,
    skills: ['CIA Triad', 'Cyber Kill Chain', 'Threat Modeling', '5×5 Risk Matrix', 'CVSS v3.1', 'Identity & Access', 'Applied Cryptography', 'SOC & IR', 'DPDP Act 2023'],
    course_ids: ['crs_cyber_intro_01']
  }
];
