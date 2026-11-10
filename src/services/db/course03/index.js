/**
 * RedKross Academy - Course 03 Master Specification
 * Course Title: Linux and Windows System Administration
 * Source Authority: RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_03_Linux_and_Windows_System_Administration.txt
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

export const course03Data = {
  id: "crs_cyber_admin_03",
  division: "cybersecurity",
  slug: "linux-and-windows-system-administration",
  title: "Linux and Windows System Administration",
  course_number: "Course 03 of 22",
  version: "1.0",
  category: "Systems Administration & Enterprise Defense",
  difficulty: "Intermediate",
  price: 0,
  cert_price: 0,
  estimated_duration: "10 Weeks",
  estimated_weeks: 10,
  total_hours: 90,
  hours_breakdown: {
    module_study: 56,
    practicals_and_challenges: 20,
    course_assessment: 2,
    capstone_report: 12
  },
  courses_count: 1,
  effort: "6–8 Hours per Week",
  access: "Free Institutional Access",
  rating: 4.97,
  enrolled_count: 1420,
  card_variant: "variant-01",
  short_desc: "The definitive enterprise systems administration and defensive infrastructure curriculum. Master OS internal architectures (CPU privilege rings, virtual memory, UEFI Secure Boot), industrial Linux administration (FHS 3.0, POSIX ACLs, defensive Bash automation), Windows NT executive internals (Registry hives, services.exe, SIDs, UAC, NTFS DACLs), modern PowerShell 7 object pipelines, Active Directory Kerberos authentication, GPO precedence (LSDOU), and consensus system hardening baselines (CIS Level 1/2, Lynis compliance scoring).",
  
  lead_author: {
    name: "RedKross Systems Defense Faculty",
    title: "Operating Systems Internals & Enterprise Systems Hardening",
    role: "Director of Infrastructure Operations, RedKross Research Foundation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  },

  overview: "Every security task eventually touches an operating system. Analysts read Windows event logs and Linux auth logs; responders inspect running processes and services; engineers harden configurations; penetration testers assess privilege boundaries; cloud and container security are built on Linux. This course teaches the two operating systems that dominate organisations — Linux and Windows — from the administrator's point of view, with security woven through every topic. You will master OS internal architectures (CPU privilege rings, virtual memory, UEFI Secure Boot), industrial Linux administration (FHS 3.0, POSIX ACLs, defensive Bash automation), Windows NT executive internals (Registry hives, services.exe, SIDs, UAC, NTFS DACLs), modern PowerShell 7 object pipelines, Active Directory Kerberos authentication, GPO precedence (LSDOU), and consensus system hardening baselines (CIS Level 1/2, Lynis compliance scoring).",

  why_it_matters: [
    "Privilege & Access Boundaries: Misconfiguration and excessive privilege on operating systems are among the primary root causes of modern enterprise breaches.",
    "Forensics & Telemetry Evidence: System logs and process telemetry (Windows Security Events, Sysmon, Linux /var/log/auth.log, journald) constitute primary ground-truth evidence for SOC triage and DFIR.",
    "Consensus Hardening & Compliance: Hardening against recognised baselines (CIS Benchmarks Level 1/2, Microsoft Security Baselines, Lynis) is mandatory in institutional audits and regulatory frameworks.",
    "Foundational Command-Line Fluency: Every subsequent advanced technical domain (ethical hacking, malware analysis, cloud defense) requires deep CLI fluency in Bash and PowerShell.",
    "Kernel-Level Resilience: Understanding kernel-mode vs. user-mode isolation is critical to evaluating security architectures and endpoint detection drivers (as proven by the 2024 CrowdStrike outage)."
  ],

  intended_audience: [
    "Learners who have completed Course 01 (Security Principles) and Course 02 (Networking Fundamentals) or possess equivalent IT foundations.",
    "IT support specialists, junior system administrators, and infrastructure engineers transitioning into defensive security operations.",
    "Software developers and DevOps engineers requiring deep operational knowledge of Linux/Windows internals, permissions, and system hardening."
  ],

  prerequisites: [
    "Course 01 (Introduction to Cybersecurity) recommended for core security vocabularies and threat models.",
    "Course 02 (Computer Networking for Cybersecurity) Modules 1–3 recommended for network interface and IP addressing foundations.",
    "Basic computer literacy and comfort navigating computer systems. No prior command-line scripting experience is assumed; every command and parameter is explained from first principles."
  ],

  required_software_hardware: [
    "Computer with 8 GB RAM (16 GB recommended for virtualization) and hardware virtualization enabled (VT-x / AMD-V).",
    "Windows 10/11 (Home is sufficient for most practicals; Pro/Enterprise noted where Group Policy Editor gpedit.msc is evaluated).",
    "A Linux environment you control: WSL2 with Ubuntu 24.04/26.04 LTS (recommended for Windows users), a virtual machine (VirtualBox / Hyper-V), or a native Linux install.",
    "Optional: Docker Desktop (Engine 29.4+) for lightweight Debian/Alpine container practicals.",
    "PowerShell 7.x (optional cross-platform; Windows PowerShell 5.1 built into Windows)."
  ],

  what_you_will_learn: [
    "Deconstruct OS internals: CPU privilege rings (Ring 0 vs. Ring 3), virtual memory paging, process trees, and UEFI Secure Boot chains.",
    "Navigate the Linux Filesystem Hierarchy Standard (FHS 3.0), configure POSIX file permissions, SUID/SGID, and extended ACLs.",
    "Administer Linux users, sudoers policy, package management (APT/RPM), systemd service units, and monotonic timer automation.",
    "Author defensive Bash automation scripts with strict error trapping (set -euo pipefail) and audit cron scheduling.",
    "Dissect Windows NT architecture: Executive subsystem, Registry hives, services.exe, SIDs, UAC token elevation, and NTFS DACLs.",
    "Build PowerShell 7 object pipelines, enforce Constrained Language Mode (CLM), and configure Script Block & Module Logging.",
    "Analyze Windows Security Event Logs (Event IDs 4624, 4688, 1102), Active Directory Kerberos tickets, and GPO precedence (LSDOU).",
    "Apply consensus hardening baselines: CIS Benchmark Level 1/2 controls, Windows Defender Firewall, and execute automated Lynis security audits."
  ],

  learning_objectives: [
    "LO1: Explain kernel and user space, processes, virtual memory, and the boot and service lifecycle on Linux and Windows.",
    "LO2: Navigate and manage the Linux file system using core utilities and explain the Filesystem Hierarchy Standard (FHS 3.0).",
    "LO3: Administer Linux users, groups, POSIX permissions, SUID/SGID, package management, systemd services, and journald logs securely.",
    "LO4: Author, schedule, and monitor defensive shell scripts incorporating strict error handling, input sanitization, and cron telemetry.",
    "LO5: Explain Windows NT architecture, Registry forensics, SCM service lifecycles, local security identifiers (SIDs), UAC, and NTFS permissions.",
    "LO6: Leverage PowerShell cmdlets, object pipelines, provider namespaces, and deploy deep Script Block Logging (EID 4104).",
    "LO7: Interpret Windows Security Event Logs and explain Active Directory domain trust, Kerberos tickets, and Group Policy inheritance.",
    "LO8: Audit and apply CIS Benchmarks, host firewall isolation, and endpoint baselines using native tools and automated Lynis audits."
  ],

  skills: [
    "Linux Kernel Rings & Syscalls",
    "POSIX Permissions & Extended ACLs",
    "Defensive Bash Automation",
    "systemd Units & Monotonic Timers",
    "Windows NT Executive Internals",
    "Registry Forensics & Persistence",
    "Windows SIDs, UAC & Tokens",
    "NTFS DACLs & ACE Permissions",
    "PowerShell 7 Object Pipelines",
    "Security Event Log Auditing",
    "Active Directory & Kerberos GPO",
    "CIS Benchmarks & Lynis Hardening"
  ],

  nice_framework_alignment: [
    "Implementation and Operation (IO): Systems Administration (K0001, K0002, K0003), Technical Support",
    "Protection and Defense (PD): Defensive Cybersecurity, Incident Response Triage (K0041, K0070)",
    "Oversight and Governance (OV): Security Control Assessment & Baseline Hardening Audits"
  ],

  completion_requirements: [
    "Pass each of the 8 module assessments with a minimum score of 70%.",
    "Complete hands-on guided practicals with documented evidence (terminal output or log capture).",
    "Pass the Course 03 Comprehensive Final Assessment (50 MCQs) with a minimum score of 70%.",
    "Submit the Capstone System Hardening Audit rated at least 'Competent' on every evaluation rubric."
  ],

  total_tokens_reward: 2000,

  milestone_cert: "Certified Systems Administration & Defense Associate (CSADA)",
  banner_image: "/assets/courses/cyber-03/banner.jpg",
  thumbnail_image: "/assets/courses/cyber-03/thumbnail.jpg",

  final_assessment: {
    id: "exam_cyber_admin_final",
    title: "Certified Systems Administration & Defense Associate (CSADA) Comprehensive Evaluation",
    credential_title: "Certified Systems Administration & Defense Associate (CSADA)",
    time_limit_minutes: 60,
    passing_score: 80,
    total_questions: 50,
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

export default course03Data;
