# Course 03 Visual Learning Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance visual learning across all 48 lessons (96 diagrams) in Course 03 (*Linux and Windows System Administration*) by embedding rigorous, structured architectural walkthroughs beneath every figure and resolving the missing figure in Lesson 6.4.

**Architecture:** Systematic curriculum enrichment adding dedicated `#### Visual Walkthrough & Architectural Breakdown` sub-sections directly beneath figure captions in `src/services/db/course03/modules/module{1..8}.js`. Every walkthrough breaks down key components, decision gates, security boundaries, and defensive implications using front-loaded bold bullet points adhering to GOV.UK/W3C content standards.

**Tech Stack:** JavaScript (ESM data modules), React, KaTeX, Markdown.

**Spec:** User request: Course-Wide Visual Learning Enhancement — Phase 1 Discovery & Audit.

---

## Global Constraints & Integrity Rules

- **Zero Content Loss:** Preserve all existing educational prose, LaTeX equations, math calculation blocks, ASCII/Markdown tables, CLI commands, code blocks, and references.
- **Scope Isolation:** Modify ONLY Course 03 module files (`src/services/db/course03/modules/module{1..8}.js`). Do NOT touch courses 01, 02, UI components, parsers, or dashboards.
- **No Hallucination / Invention:** Ground every walkthrough strictly in the physical components depicted in the on-disk diagrams (e.g. specific GUIDs, system calls, memory registers, VTL boundaries, event IDs).
- **Format Invariant:** Use clean Markdown with front-loaded bold concepts:
  ```markdown
  ![Figure Title](/assets/courses/cyber-03/filename.png)

  *Figure Caption: Summary of the architecture.*

  #### Visual Walkthrough & Architectural Breakdown

  - **Component / Flow Name:** Operational description detailing data/control transfer.
  - **Security Boundary & Decision Logic:** How isolation, privilege checks, or override rules execute.
  - **Defensive Engineering Implication:** Real-world administration, triage, or hardening impact.
  ```
- **Verification Gates:** After each module modification, run typechecks and build verification (`npm test`, `npx tsc --noEmit`, `npm run build`).

---

## Detailed Task Breakdown

### Task 1: Module 1 — Operating System Foundations (12 Visuals)
**Files:** `src/services/db/course03/modules/module1.js`
- [ ] **Lesson 1.1:** Add walkthroughs for:
  - `C03-M01-D01` (`c03_m01_l01_hardware_abstraction_layers.png`): User space -> OS Kernel -> Device Drivers -> Hardware abstraction stack.
  - `C03-M01-D02` (`c03_m01_l01_resource_arbitration_queues.png`): CPU scheduling, memory page mapping, and I/O request queues.
- [ ] **Lesson 1.2:** Add walkthroughs for:
  - `C03-M01-F1` (`C03-M01-F1.png`): Ring 3 (User) vs Ring 0 (Kernel) privilege boundary and system call dispatch.
  - `C03-M01-D03` (`c03_m01_l02_cpu_mode_transition_trap.png`): User-to-kernel mode transition, register preservation, and kernel stack switch.
- [ ] **Lesson 1.3:** Add walkthroughs for:
  - `C03-M01-D04` (`c03_m01_l03_process_state_machine.png`): Process state machine (Ready, Running, Blocked/Sleeping, Zombie/Terminated).
  - `C03-M01-D05` (`c03_m01_l03_process_trees_linux_windows.png`): Comparative process trees (Linux systemd PID 1 vs Windows Session 0 / Session 1).
- [ ] **Lesson 1.4:** Add walkthroughs for:
  - `C03-M01-D06` (`c03_m01_l04_virtual_memory_paging.png`): Virtual address translation, page tables, TLB cache, and physical page frame mapping.
  - `C03-M01-D07` (`c03_m01_l04_aslr_dep_mitigations.png`): Exploit mitigations in memory (ASLR entropy & DEP/NX non-executable stack/heap).
- [ ] **Lesson 1.5:** Add walkthroughs for:
  - `C03-M01-F2` (`C03-M01-F2.png`): Boot chain comparison (UEFI Secure Boot -> Shim -> GRUB -> Kernel handoff).
  - `C03-M01-D08` (`c03_m01_l05_uefi_key_hierarchy.png`): UEFI Secure Boot key hierarchy (Platform Key PK, Key Exchange Key KEK, db allowed, dbx revoked).
- [ ] **Lesson 1.6:** Add walkthroughs for:
  - `C03-M01-F3` (`C03-M01-F3.png`): systemd unit lifecycle state transitions and restart logic.
  - `C03-M01-D09` (`c03_m01_l06_windows_scm_svchost_architecture.png`): Windows SCM (`services.exe`) architecture, registry keys, and `svchost.exe` process grouping.

---

### Task 2: Module 2 — Linux Environment & File Hierarchy (12 Visuals)
**Files:** `src/services/db/course03/modules/module2.js`
- [ ] **Lesson 2.1:** Add walkthroughs for `C03-M02-F1` (Lineages: Debian, RHEL, Arch) and `C03-M02-D10` (Upstream Kernel to Distro packaging flow).
- [ ] **Lesson 2.2:** Add walkthroughs for `C03-M02-F2` (Shell parsing pipeline: tokenization, expansion, redirection) and `C03-M02-D11` (File descriptor redirection: stdin 0, stdout 1, stderr 2).
- [ ] **Lesson 2.3:** Add walkthroughs for `C03-M02-F3` (FHS 3.0 directory tree overview) and `C03-M02-D12` (VFS mount points: `/sys`, `/proc`, `/dev`, `/run`).
- [ ] **Lesson 2.4:** Add walkthroughs for `C03-M02-D13` (Absolute vs. relative path resolution) and `C03-M02-D14` (Path traversal prevention & canonicalization).
- [ ] **Lesson 2.5:** Add walkthroughs for `C03-M02-D15` (Inode structure, block pointers, metadata) and `C03-M02-D16` (Hard links vs. symbolic links & unlinking lifecycle).
- [ ] **Lesson 2.6:** Add walkthroughs for `C03-M02-D17` (Text processing pipeline: grep, awk, sed) and `C03-M02-D18` (Linux man section taxonomy).

---

### Task 3: Module 3 — Linux Administration & Permissions (12 Visuals)
**Files:** `src/services/db/course03/modules/module3.js`
- [ ] **Lesson 3.1:** Add walkthroughs for `C03-M03-F1` (User identity mapping: `/etc/passwd` & `/etc/shadow`) and `C03-M03-D19` (Shadow password hash structure: crypt ID, salt, hash).
- [ ] **Lesson 3.2:** Add walkthroughs for `C03-M03-D20` (POSIX permission bit matrix: read/write/execute for user/group/others) and `C03-M03-D21` (Kernel access evaluation algorithm).
- [ ] **Lesson 3.3:** Add walkthroughs for `C03-M03-F2` (Access decision flowchart) and `C03-M03-D22` (Special bits: SUID 4000, SGID 2000, Sticky bit 1000 & POSIX ACLs).
- [ ] **Lesson 3.4:** Add walkthroughs for `C03-M03-D23` (Sudo execution architecture: PAM authentication, logging, command filtering) and `C03-M03-D24` (Sudoers security grammar & privilege boundary).
- [ ] **Lesson 3.5:** Add walkthroughs for `C03-M03-D25` (Package lifecycle: repository indexing, GPG verification, unattended updates) and `C03-M03-D26` (Software supply chain validation).
- [ ] **Lesson 3.6:** Add walkthroughs for `C03-M03-F3` (System logging architecture: systemd-journald, rsyslog) and `C03-M03-D27` (Log rotation & tamper-evident logging).

---

### Task 4: Module 4 — Linux Automation & Shell Scripting (12 Visuals)
**Files:** `src/services/db/course03/modules/module4.js`
- [ ] **Lesson 4.1:** Add walkthroughs for `C03-M04-F1` (Shell script execution lifecycle: Shebang, fork-exec, environment inheritance) and `C03-M04-D28` (Variable scope & subshell boundaries).
- [ ] **Lesson 4.2:** Add walkthroughs for `C03-M04-D29` (Defensive error flags: `set -euo pipefail` behavior) and `C03-M04-D30` (Signal handling & trap cleanup flow).
- [ ] **Lesson 4.3:** Add walkthroughs for `C03-M04-D31` (Script debugging & tracing modes: `set -x`) and `C03-M04-D32` (Static analysis workflow with ShellCheck).
- [ ] **Lesson 4.4:** Add walkthroughs for `C03-M04-F2` (Cron daemon architecture & spool hierarchy) and `C03-M04-D33` (Cron execution environment & privilege risks).
- [ ] **Lesson 4.5:** Add walkthroughs for `C03-M04-D34` (systemd timer unit architecture: `.timer` -> `.service`) and `C03-M04-D35` (Monotonic vs. calendar timer triggers).
- [ ] **Lesson 4.6:** Add walkthroughs for `C03-M04-F3` (Resource monitoring telemetry: CPU, memory, disk I/O, network) and `C03-M04-D36` (Kernel `/proc` telemetry sampling).

---

### Task 5: Module 5 — Windows Foundations & Architecture (12 Visuals)
**Files:** `src/services/db/course03/modules/module5.js`
- [ ] **Lesson 5.1:** Add walkthroughs for `C03-M05-F1` (Windows NT architecture: Executive subsystems, HAL, ntdll, kernel) and `C03-M05-D37` (Core system process tree: smss -> csrss/wininit -> services/lsass).
- [ ] **Lesson 5.2:** Add walkthroughs for `C03-M05-F2` (Registry hive architecture: on-disk files, memory mapping, transaction logs) and `C03-M05-D38` (Registry persistence mechanisms: Run keys, Startup, Services).
- [ ] **Lesson 5.3:** Add walkthroughs for `C03-M05-D39` (SCM service registration, dispatch, and named pipes) and `C03-M05-D40` (Unquoted service path & binary permission hijacking attack paths).
- [ ] **Lesson 5.4:** Add walkthroughs for `C03-M05-D41` (Windows SID structure: Revision, Identifier Authority, Sub-Authorities, RID) and `C03-M05-D42` (Well-known security principals & groups).
- [ ] **Lesson 5.5:** Add walkthroughs for `C03-M05-F3` (Access token architecture: Privileges, Group SIDs, Restricted Tokens) and `C03-M05-D43` (UAC token filtering & Mandatory Integrity Levels).
- [ ] **Lesson 5.6:** Add walkthroughs for `C03-M05-D44` (NTFS Security Descriptor: Owner, Primary Group, DACL, SACL) and `C03-M05-D45` (ACE evaluation algorithm: explicit deny > explicit allow > inherited deny > inherited allow).

---

### Task 6: Module 6 — PowerShell Administration (12 Visuals)
**Files:** `src/services/db/course03/modules/module6.js`
- [ ] **Lesson 6.1:** Add walkthroughs for `C03-M06-F1` (PowerShell Editions: Windows PowerShell vs PowerShell Core) and `C03-M06-D46` (Verb-Noun taxonomy and discovery pipeline).
- [ ] **Lesson 6.2:** Add walkthroughs for `C03-M06-D47` (Object pipeline vs text streams: structured .NET properties) and `C03-M06-D48` (Pipeline parameter binding: `ByValue` vs `ByPropertyName`).
- [ ] **Lesson 6.3:** Add walkthroughs for `C03-M06-D49` (PowerShell type system: primitives, arrays, hash tables, PSCustomObject) and `C03-M06-D50` (Control flow & exception handling).
- [ ] **Lesson 6.4: CRITICAL FIX & ENHANCEMENT:**
  - Insert missing markdown image for `C03-M06-D51` (`/assets/courses/cyber-03/c03_m06_l04_advanced_functions_validation.png`) into `lesson.content`.
  - Add walkthrough for `C03-M06-F3` (ShouldProcess flow: `-WhatIf` and `-Confirm` safety nets).
  - Add walkthrough for `C03-M06-D51` (Advanced function anatomy: `[CmdletBinding()]`, `param()` validation attributes, `begin/process/end` blocks).
- [ ] **Lesson 6.5:** Add walkthroughs for `C03-M06-D52` (PowerShell Execution Policies: Restricted, RemoteSigned, AllSigned, Bypass) and `C03-M06-D53` (Authenticode digital code signing workflow).
- [ ] **Lesson 6.6:** Add walkthroughs for `C03-M06-F2` (Defense-in-depth security layers: JEA, WDAC, AMSI, Script Block Logging) and `C03-M06-D54` (AMSI memory buffer inspection & Event 4104 triage).

---

### Task 7: Module 7 — Enterprise Administration & Active Directory (12 Visuals)
**Files:** `src/services/db/course03/modules/module7.js`
- [ ] **Lesson 7.1:** Add walkthroughs for `C03-M07-F1` (Windows Event Log architecture: ETW, Providers, Channels, EVTX) and `C03-M07-D55` (EVTX file format & binary XML chunk structure).
- [ ] **Lesson 7.2:** Add walkthroughs for `C03-M07-D56` (High-priority security Event IDs: 4624, 4625, 4688, 4672, 7045) and `C03-M07-D57` (Process creation telemetry with command-line auditing).
- [ ] **Lesson 7.3:** Add walkthroughs for `C03-M07-D58` (Windows Event Forwarding WEF: Collectors, Subscriptions, WinRM/Kerberos) and `C03-M07-D59` (Centralized SIEM forwarding architecture).
- [ ] **Lesson 7.4:** Add walkthroughs for `C03-M07-D60` (Active Directory logical hierarchy: Forests, Trees, Domains, OUs) and `C03-M07-D61` (Kerberos authentication flow: AS-REQ/AS-REP -> TGS-REQ/TGS-REP -> AP-REQ/AP-REP).
- [ ] **Lesson 7.5:** Add walkthroughs for:
  - `C03-M07-F2` (`C03-M07-F2.png`): Group Policy processing order (LSDOU hierarchy, Enforced override, Block Inheritance).
  - `C03-M07-D62` (`c03_m07_l05_gpo_gpc_gpt_sysvol.png`): GPO dual architecture: Group Policy Container (GPC LDAP) vs Group Policy Template (GPT SYSVOL) and DFSR replication.
- [ ] **Lesson 7.6:** Add walkthroughs for:
  - `C03-M07-F3` (`C03-M07-F3.png`): Patch management lifecycle (Inventory, Prioritization, Phased Rings, Verification, Rollback).
  - `C03-M07-D63` (`c03_m07_l06_wsus_deployment_rings.png`): WSUS infrastructure: upstream sync, downstream distribution, and GPO ring targeting.

---

### Task 8: Module 8 — System Hardening & Auditing (12 Visuals)
**Files:** `src/services/db/course03/modules/module8.js`
- [ ] **Lesson 8.1:** Add walkthroughs for `C03-M08-F1` (Hardening lifecycle: Threat model -> Baseline -> Deployment -> Audit) and `C03-M08-D64` (`c03_m08_l01_cis_benchmarks_disa_stigs.png`: CIS Level 1 vs Level 2 vs DISA STIG).
- [ ] **Lesson 8.2:** Add walkthroughs for:
  - `C03-M08-D65` (`c03_m08_l02_safe_deployment_rollback.png`: Deployment safeguard workflow, canary gates, automated health checks, instant rollback).
  - `C03-M08-D66` (`c03_m08_l02_blast_radius_containment.png`: Global simultaneous push failure mode vs defensive blast radius containment).
- [ ] **Lesson 8.3:** Add walkthroughs for `C03-M08-F3` (`C03-M08-F3.png`: SSH daemon hardening directives before and after) and `C03-M08-D67` (`c03_m08_l03_sysctl_kernel_hardening.png`: Linux kernel sysctl network and memory attack surface reduction).
- [ ] **Lesson 8.4:** Add walkthroughs for:
  - `C03-M08-D68` (`c03_m08_l04_windows_asr_rules.png`: Attack vectors -> Windows Defender ASR Engine -> Blocked outcomes).
  - `C03-M08-D69` (`c03_m08_l04_vbs_credential_guard.png`: Virtualization-Based Security VBS, Hyper-V, VTL 0 vs VTL 1, Isolated LSA).
- [ ] **Lesson 8.5:** Add walkthroughs for `C03-M08-F2` (`C03-M08-F2.png`: 5 layers of host defense) and `C03-M08-D70` (`c03_m08_l05_host_firewalls_nftables_defender.png`: nftables vs Windows Defender Firewall).
- [ ] **Lesson 8.6:** Add walkthroughs for `C03-M08-D71` (`c03_m08_l06_lynis_auditing_architecture.png`: Automated Lynis auditing architecture) and `C03-M08-D72` (`c03_m08_l06_capstone_audit_rubric.png`: 15-item comprehensive executive host audit rubric).

---

### Task 9: Post-Implementation Verification & Build
- [ ] **Step 1:** Verify occurrence of all 96 visual references in `lesson.content` markdown (confirm 96/96 embedded).
- [ ] **Step 2:** Verify all 96 walkthrough sections are present and non-empty.
- [ ] **Step 3:** Run `npm test` to verify all course tests pass.
- [ ] **Step 4:** Run `npx tsc --noEmit` to verify 0 type errors.
- [ ] **Step 5:** Run `npm run build` to verify production Vite build succeeds.
