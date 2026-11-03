/**
 * RedKross Academy — Defensive Cybersecurity Curriculum Fixtures
 * Only the official master curriculum: Full Stack Web Development
 */

import fullStackCourseJson from './fullstackCourse.json' with { type: 'json' };

export const CYBER_LEARNING_PATHS = [
  {
    id: 'path_fullstack_career',
    division: 'cybersecurity',
    slug: 'full-stack-web-development-career-path',
    title: 'Full Stack Web Development & Application Defense Track',
    short_desc: 'Comprehensive full-stack engineering curriculum taking developers from web foundations through modern React, Node.js REST APIs, MongoDB, and OWASP defense.',
    difficulty: 'Beginner to Advanced',
    estimated_weeks: 12,
    total_hours: 48,
    courses_count: 1,
    milestone_cert: 'Full Stack Web Developer Certificate',
    featured: true,
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React 18', 'Node.js & Express', 'MongoDB', 'OWASP Web Defense', 'Docker'],
    course_ids: ['crs_full_stack_web_dev']
  }
];

// SIRF FULL STACK EK COURSE RAKHA HAI PER USER DIRECTIVE
export const CYBER_COURSES = [
  {
    ...fullStackCourseJson,
    division: 'cybersecurity',
    category: 'Full Stack Engineering & Web Defense'
  }
];
