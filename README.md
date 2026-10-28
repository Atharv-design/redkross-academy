# RedKross Academy — Defensive Cybersecurity Certification Platform

Official cybersecurity education and certification platform of the **RedKross Research Foundation**.

This platform delivers rigorous, institutional training across defensive cybersecurity domains including 24/7 Security Operations Centre (SOC) operations, threat hunting, incident triage, and digital forensics.

---

## 🛡️ Core Platform Architecture

1. **Public Academy Portal (`academy.redkross.org.in`)**
   - High-impact defensive security command center.
   - Comprehensive learning paths with prerequisite sequencing (SOC Analyst, Threat Hunting, Defensive Engineering).
   - Faceted course catalog across 10 modular tracks.
   - Public cryptographic credential verification at `/verify/:id`.

2. **Student Learning Portal**
   - Interactive 3-column classroom workspace.
   - Real-time progress tracking:
     $$\text{Progress \%} = \left(\frac{\text{Completed Mandatory Lessons}}{\text{Total Mandatory Lessons}}\right) \times 100$$
   - Chapter evaluations with randomized question ordering.
   - **24-Hour Cooldown Protocol:** 3 consecutive evaluation failures trigger an atomic 24-hour lockout to mandate remedial study.
   - **3-Strike Exam Focus Tracking:** Monitored tab switches and window blur events (Strike 1: Warning; Strike 2: 50 Token deduction; Strike 3: Immediate termination and 24h lockout).
   - **Non-Monetary Token Ledger:** Rewarding milestones, quiz passes, and learning streaks.
   - **Final Assessment Unlock Gate:** Requires 100% progress + all quizzes passed + 80% token quota.

3. **Academy Admin & Operations Console (RBAC)**
   - Operations KPI metrics: Enrolments, Completions, Active Incidents, Token Circulation.
   - Course and Curriculum Builder with semantic versioning (`v1.2`).
   - Student CRM with manual 24h cooldown reset override.
   - Exam Violation & Strike 3 incident review queue.
   - Immutable security and administrative audit trail.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🔒 Academic Integrity Charter
Every certificate issued by the RedKross Academy is permanently registered in our verifiable credential registry with a unique alphanumeric identifier, digital signature hash, and scannable QR code.
