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
    module_study: 60,
    practicals_and_challenges: 18,
    course_assessment: 2,
    capstone_report: 10
  },
  courses_count: 1,
  effort: "6–8 Hours per Week",
  access: "Free Institutional Access",
  rating: 4.97,
  enrolled_count: 1420,
  card_variant: "variant-01",
  short_desc: "The definitive enterprise systems administration and defensive infrastructure curriculum. Master OS internal architectures (CPU privilege rings, virtual memory, UEFI Secure Boot), industrial Linux administration (FHS 3.0, POSIX ACLs, defensive Bash automation), Windows NT executive internals (Registry hives, services.exe, SIDs, UAC, NTFS DACLs), modern PowerShell 7 object pipelines, Active Directory Kerberos authentication, GPO precedence (LSDOU), and consensus system hardening baselines (CIS Level 1/2, Lynis compliance scoring).",
  
  skills: [
    "Linux Kernel Privilege Rings & Syscall Forensics",
    "POSIX File Permissions, SUID/SGID & Extended ACLs",
    "Defensive Shell Scripting (Strict Mode & Traps)",
    "systemd Service Units & Monotonic Timer Architecture",
    "Windows NT Executive & Core Process Ancestry",
    "Windows Registry Forensics & Persistence Hunting",
    "Security Identifiers (SIDs), UAC & Token Integrity",
    "NTFS DACLs, ACE Evaluation & Share Permissions",
    "PowerShell Object Pipelines, CLM & Script Block Logging",
    "Windows Event Log XML Telemetry (EID 4624/4688/1102)",
    "Active Directory Kerberos Tickets & GPO LSDOU Precedence",
    "CIS Benchmark System Hardening & Lynis Automated Audits"
  ],

  milestone_cert: "Certified Systems Administration & Defense Associate (CSADA)",
  banner_image: "/assets/courses/cyber-03/banner.jpg",
  thumbnail_image: "/assets/courses/cyber-03/thumbnail.jpg",

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
