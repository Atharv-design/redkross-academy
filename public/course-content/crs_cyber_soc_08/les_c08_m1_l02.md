2.2.1 Delivery models

| Term | Meaning |
|---|---|
| In-house | full control and context; costly; hard to staff 24x7. |
| Outsourced | MSSP/MDR provides monitoring; faster to start; less business context; contracts must define escalation and evidence. |
| Hybrid | internal team owns context and response; provider covers hours or specialist work. |

2.2.2 The classic tier model

```text
Tier 1 (triage)      monitors queues, validates alerts, enriches, closes
                     false positives, escalates true positives using
                     playbooks.
Tier 2 (incident     deeper investigation, scoping, containment
response/analysis)   recommendations, coordination with IT.
Tier 3 (specialists) threat hunting, malware analysis, forensics,
                     detection engineering.
SOC manager/lead     staffing, quality, metrics, stakeholder communication.
```

**Supporting roles:** detection engineers, threat intelligence analysts, SOAR engineers, platform engineers who keep the SIEM healthy. Modern SOCs often blur tiers into functional teams (detection, response, hunting), automate Tier 1 tasks (Course 20 Module 6), and rotate analysts to reduce burnout.

2.2.3 Interfaces IT operations (containment actions), identity team (account resets), legal and compliance (CERT-In, DPDP notifications), communications, management, and external parties (CERT-In, law enforcement, providers).
