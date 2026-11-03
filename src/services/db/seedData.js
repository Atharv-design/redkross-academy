/**
 * RedKross Academy — High-Fidelity Initial Seed Fixtures
 * Matches PRD Appendix B (Course Catalogue), Appendix A (State Rules), and Section 8 (Token Economy)
 */

import fullStackCourseJson from './fullstackCourse.json' with { type: 'json' };
import { CYBER_COURSES, CYBER_LEARNING_PATHS } from './cyberCourses';
import { PSYCHOLOGY_COURSES, PSYCHOLOGY_LEARNING_PATHS } from './psychologyCourses';

export const INITIAL_USERS = [
  {
    id: 'usr_student_01',
    cadet_id: 'RK-89421',
    email: 'student@redkross.org.in',
    full_name: 'Atharv Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    headline: 'Aspiring SOC Analyst & Blue Team Defender',
    role: 'student',
    created_at: '2026-10-01T08:00:00Z',
    streak_days: 7,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'usr_admin_01',
    email: 'admin@redkross.org.in',
    full_name: 'Sarah Chen, CISSP',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    headline: 'Director of Defensive Cybersecurity Education',
    role: 'student', // Strict Phase 4.2: NO initial Super Admin user created or seeded
    created_at: '2026-09-01T08:00:00Z',
    streak_days: 34,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'usr_support_01',
    email: 'support@redkross.org.in',
    full_name: 'David Reynolds',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    headline: 'Academy Operations & Proctoring Specialist',
    role: 'student_support',
    created_at: '2026-09-15T08:00:00Z',
    streak_days: 12,
    timezone: 'Asia/Kolkata',
  }
];

export { CYBER_COURSES, CYBER_LEARNING_PATHS, PSYCHOLOGY_COURSES, PSYCHOLOGY_LEARNING_PATHS };

export const INITIAL_LEARNING_PATHS = [
  ...CYBER_LEARNING_PATHS,
  ...PSYCHOLOGY_LEARNING_PATHS
];

// Master Unified Curricula (Cybersecurity & Psychology Divisions)
export const INITIAL_COURSES = [
  ...CYBER_COURSES,
  ...PSYCHOLOGY_COURSES
];


export const INITIAL_VERIFIED_CREDENTIALS = [
  {
    id: 'cred_rk_soc_89421',
    verification_id: 'RK-SOC-89421',
    student_name: 'Atharv Sharma',
    course_id: 'crs_soc_fundamentals',
    course_title: 'SOC Fundamentals & Incident Response',
    credential_title: 'RedKross Certified SOC Analyst (RCSA)',
    type: 'Professional Certification',
    issue_date: '2026-10-15',
    expiration_date: '2028-10-15',
    grade_percentage: 92,
    status: 'Active',
    digital_signature: '0x8f4c39b1a0e8d726b1c3e590fa1284d7281bc832049a172e09b1f3c8e4d291a0',
    verification_url: 'https://academy.redkross.org.in/verify/RK-SOC-89421',
    skills_validated: [
      'SOC Operations & Log Ingestion',
      'MITRE ATT&CK Behavioral Mapping',
      'SIEM Correlation & Threat Triage',
      'Digital Forensics & Order of Volatility',
      'Incident Containment & Evidence Defensibility'
    ]
  },
  {
    id: 'cred_rk_sec_10482',
    verification_id: 'RK-SEC-10482',
    student_name: 'Vikramaditya Roy',
    course_id: 'crs_cyber_fund',
    course_title: 'Cybersecurity Fundamentals & Defensive Architecture',
    credential_title: 'Certificate of Course Completion',
    type: 'Course Completion',
    issue_date: '2026-09-20',
    expiration_date: 'Lifetime',
    grade_percentage: 88,
    status: 'Active',
    digital_signature: '0x12a9c384e09f8721c54b2d90ef8314bc721094da5e821038bc1a4f09e87123cd',
    verification_url: 'https://academy.redkross.org.in/verify/RK-SEC-10482',
    skills_validated: ['CIA Triad & Defence in Depth', 'Threat Modeling', 'Foundational Security Operations']
  }
];

export const INITIAL_ENROLMENTS = [
  {
    id: 'enr_student_soc',
    user_id: 'usr_student_01',
    course_id: 'crs_soc_fundamentals',
    course_version: '1.2',
    enrolled_at: '2026-10-10T10:00:00Z',
    status: 'active',
    completed_mandatory_lessons: ['les_1_1', 'les_1_2'],
    passed_quizzes: ['quiz_mod_1'],
    final_assessment_attempt_id: null,
    credential_id: null,
  }
];

export const INITIAL_REWARD_LEDGER = [
  {
    id: 'tx_init_welcome',
    user_id: 'usr_student_01',
    amount: 100,
    type: 'welcome_grant',
    description: 'Welcome onboard to RedKross Academy',
    idempotency_key: 'idemp_welcome_usr_student_01',
    created_at: '2026-10-10T10:00:00Z',
  },
  {
    id: 'tx_quiz_mod_1',
    user_id: 'usr_student_01',
    amount: 100,
    type: 'quiz_passed',
    description: 'First-time passing reward: Module 1 Evaluation',
    idempotency_key: 'idemp_quiz_quiz_mod_1_usr_student_01',
    created_at: '2026-10-12T14:30:00Z',
  },
  {
    id: 'tx_streak_bonus',
    user_id: 'usr_student_01',
    amount: 50,
    type: 'streak_reward',
    description: '7-Day Continuous Study Streak Bonus',
    idempotency_key: 'idemp_streak_7d_usr_student_01',
    created_at: '2026-10-17T09:00:00Z',
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud_1',
    actor_id: 'usr_admin_01',
    actor_email: 'admin@redkross.org.in',
    action: 'COURSE_PUBLISHED',
    entity_type: 'courses',
    entity_id: 'crs_soc_fundamentals',
    details: 'Published Course v1.2 with updated Module 3 Forensics guidelines',
    created_at: '2026-10-05T12:00:00Z'
  },
  {
    id: 'aud_2',
    actor_id: 'usr_admin_01',
    actor_email: 'admin@redkross.org.in',
    action: 'ROLE_ASSIGNED',
    entity_type: 'users',
    entity_id: 'usr_support_01',
    details: 'Granted student_support privileges to David Reynolds',
    created_at: '2026-10-06T09:30:00Z'
  }
];
