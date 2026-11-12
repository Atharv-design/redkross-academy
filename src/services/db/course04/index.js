/**
 * RedKross Academy - Course 04 Master Specification
 * Course Title: Python for Cybersecurity
 * Source Authority: RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_04_Python_for_Cybersecurity.txt
 * Modular architecture: Modules 1 to 8 assembled cleanly from ./modules/
 */

import { module1Data } from './modules/module1.js';
import { module2Data } from './modules/module2.js';
import { module3Data } from './modules/module3.js';
import { module4Data } from './modules/module4.js';
import { module5Data } from './modules/module5.js';
import { module6Data } from './modules/module6.js';
import { module7Data } from './modules/module7.js';
import { module8Data } from './modules/module8.js';

export const course04Data = {
  id: "crs_cyber_python_04",
  division: "cybersecurity",
  slug: "python-for-cybersecurity",
  title: "Python for Cybersecurity",
  course_number: "Course 04 of 22",
  version: "1.0",
  category: "Security Automation & Defensive Engineering",
  difficulty: "Beginner",
  price: 0,
  cert_price: 0,
  estimated_duration: "10 Weeks",
  estimated_weeks: 10,
  total_hours: 100,
  hours_breakdown: {
    module_study: 64,
    practicals_and_challenges: 20,
    course_assessment: 2,
    capstone_report: 14
  },
  courses_count: 1,
  effort: "8–10 Hours per Week",
  access: "Free Institutional Access",
  rating: 4.98,
  enrolled_count: 1280,
  card_variant: "variant-01",
  short_desc: "Practical Python security engineering from first principles to a tested CLI log analysis utility. Master core Python data structures, secure exception and supply-chain venv hygiene (--require-hashes), ReDoS-safe regular expressions and CSV/JSON safety, path-traversal and subprocess injection prevention, localhost TCP/TLS networking and binary struct parsing, streaming SHA-256 and HMAC-SHA256 telemetry, tamper-evident FIM and alert pipelines, and unittest-verified rkloga 2.0 engineering.",

  lead_author: {
    name: "RedKross Security Engineering Faculty",
    title: "Defensive Security Automation & Applied Cryptography",
    role: "Director of Security Automation, RedKross Research Foundation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  },

  overview: "Python is the most widely used language in cybersecurity operations: analysts parse authentication logs and extract indicators of compromise with it, engineers automate endpoint integrity checks, incident responders build portable triage utilities, and enterprise SIEM/SOAR platforms expose Python APIs. This course teaches real software programming—not fragile copy-pasted snippets—from foundational types and control flow to an engineered, documented, unit-tested command-line log analysis utility (rkloga 2.0). Every technical example is execution-tested on CPython using the standard library and strictly scoped local environments (127.0.0.1).",

  why_it_matters: [
    "Alert & Log Triage Scale: Security teams ingest far more events than humans can inspect manually; Python reduces hours of log filtering and IOC triage to deterministic milliseconds.",
    "Protocol & Evidence Literacy: Writing custom binary struct decoders, streaming SHA-256 hashers, and RFC-compliant parsers builds deep ground-truth understanding behind commercial tools.",
    "Secure Coding By Construction: Enforcing input bounds, strict subprocess argument lists, canonical path confinement, and constant-time HMAC verification stops vulnerabilities taught later in Courses 06 and 12.",
    "Detection-as-Code Reliability: Combining declarative detection rules, sliding-window suppression, unittest suites, static security linters (Bandit/mypy), and fail-closed exit contracts creates trustworthy operational tooling."
  ],

  intended_audience: [
    "Beginners with no prior programming background starting in security automation.",
    "System administrators and SOC analysts seeking reliable Python tooling for triage and hardening.",
    "Learners preparing for Courses 08, 09, 10, 12 (DevSecOps), and 20 (Detection Engineering)."
  ],

  prerequisites: [
    "Course 01 (Introduction to Cybersecurity) recommended for foundational threat models and operational terminology.",
    "Course 02 (Networking Fundamentals) and Course 03 (Linux & Windows System Administration) helpful for IP concepts, event logs, file permissions, and CLI workflows.",
    "Zero prior programming experience required; every syntax rule and security control builds sequentially from scratch."
  ],

  required_software_hardware: [
    "Computer capable of running Python 3.10 or newer (Windows 10/11, macOS, or Linux).",
    "CPython interpreter installed from python.org or OS package manager (reference labs execution-tested cleanly on CPython 3.12 / 3.14).",
    "Code editor (VS Code, IDLE, or standard text editor) and local terminal shell.",
    "Internet access only inside isolated venv labs verifying dependency pinning (--require-hashes); all network socket examples execute safely on loopback 127.0.0.1."
  ],

  what_you_will_learn: [
    "Write clear Python security scripts using types, collections (list, dict, set, tuple), truthiness rules, loops, and comprehensions.",
    "Structure reusable utilities via pure functions, modules, specific exception chaining, isolated venvs, and hash-pinned package installs.",
    "Process UTF-8 text logs, CSV exports with formula-injection neutralization, structured JSON, unsafe pickle pitfalls, and ReDoS-safe regular expressions.",
    "Automate filesystem traversal safely with resolve() + is_relative_to() path confinement and shell=False subprocess argument lists.",
    "Implement local TCP loopback servers/clients with explicit timeouts, verified TLS certificates, and big-endian binary struct frame decoders.",
    "Compute constant-memory 64 KiB chunked SHA-256 digests, constant-time HMAC-SHA256 signatures, timezone-aware UTC log parsers, and refanged/defanged IOC validators.",
    "Build tamper-evident File Integrity Monitoring (FIM) baselines, declarative threshold rules with suppression windows, and ANSI/XSS-sanitized alert pipelines.",
    "Deliver production-grade CLI automation backed by unittest suites, honest README/CHANGELOG docs, fail-closed 0/1/2 exit contracts, static analysis, and the rkloga 2.0 capstone."
  ],

  learning_objectives: [
    "LO1: Write correct Python programs using variables, types, data structures, conditions, and loops.",
    "LO2: Structure programs into functions and modules, handle exceptions safely, and manage dependencies in virtual environments with hash pinning.",
    "LO3: Read and write text, CSV, and JSON files securely and apply regular expressions without catastrophic backtracking (ReDoS).",
    "LO4: Automate file system and OS process tasks safely while preventing path traversal and command injection.",
    "LO5: Write local loopback TCP client/server programs, verified HTTP requests, and binary struct network decoders.",
    "LO6: Compute and verify hashes and HMACs, parse logs into aware UTC events, and extract/validate indicators of compromise.",
    "LO7: Build defensive automation combining signed FIM baselines, rule-based anomaly thresholds with suppression, and sanitized alert outputs.",
    "LO8: Test, document, statically analyze, and harden a Python command-line utility (rkloga 2.0)."
  ],

  skills: [
    "Python Security Foundations",
    "Secure Dependency & venv Pinning",
    "CSV Formula & ReDoS Defense",
    "Path Traversal & Subprocess Safety",
    "Loopback Sockets, TLS & struct",
    "Streaming SHA-256 & HMAC Verification",
    "UTC Log Parsing & IOC Extraction",
    "Signed File Integrity Monitoring",
    "Rule Suppression & XSS Sanitization",
    "unittest Suites & CLI Exit Contracts",
    "Bandit/mypy CI & pyproject.toml",
    "rkloga 2.0 Log Analysis Engineering"
  ],

  nice_framework_alignment: [
    "Protection and Defense (PD): Defensive Cybersecurity, Incident Response Triage (automation & analysis tooling)",
    "Design and Development (DD): Secure Software Development & Verification",
    "Implementation and Operation (IO): Systems Administration & Security Data Analysis"
  ],

  completion_requirements: [
    "Pass each of the 8 module assessments (20 dynamically balanced Medium/Difficult MCQs per module) with a minimum score of 80%.",
    "Complete one hands-on guided practical per module with verified source code and terminal output evidence.",
    "Pass the Course 04 Comprehensive Final Assessment with a minimum score of 80%.",
    "Submit the Capstone rkloga 2.0 Log Analysis Utility rated at least 'Competent' on every rubric criterion (>= 20 unit tests, documentation, secure error handling, and analysis report)."
  ],

  total_tokens_reward: 2000,

  milestone_cert: "Certified Cybersecurity Python Automation Associate (CCPAA)",
  banner_image: "/assets/courses/cyber-04/banner.jpg",
  thumbnail_image: "/assets/courses/cyber-04/thumbnail.jpg",

  final_assessment: {
    id: "exam_cyber_python_final",
    title: "Certified Cybersecurity Python Automation Associate (CCPAA) Comprehensive Evaluation",
    credential_title: "Certified Cybersecurity Python Automation Associate (CCPAA)",
    time_limit_minutes: 60,
    passing_score: 80,
    total_questions: 60,
    proctored: true
  },

  modules: [
    module1Data,
    module2Data,
    module3Data,
    module4Data,
    module5Data,
    module6Data,
    module7Data,
    module8Data
  ]
};

export default course04Data;
