A case record should let another analyst - or an auditor months later - understand what happened and why decisions were made, without asking you.

**Structure:**

| Term | Meaning |
|---|---|
| Header | case ID, title, severity, status, owner, opened/closed (UTC). |
| Summary | three to five sentences, kept current. |
| Entities | hosts, users, IPs, domains, hashes, with role (victim, attacker infrastructure). |
| Timeline | UTC, source, event, significance - facts only. |
| Analysis | reasoning, hypotheses with confidence, what was ruled out. |
| Actions | containment and other actions: who approved, who executed, when. |
| Evidence | items, hashes, locations, custody (Module 7). |
| Notifications | CERT-In, Board, regulators, customers: what, when, by whom. |
| Closure | disposition, root cause, lessons, detection/telemetry improvements. |

**Write for the reader:** plain language, UTC throughout (with local time where deadlines are local), no unexplained abbreviations, and clear distinction between observed facts and interpretation.
