**Each finding is classified:**

| Term | Meaning |
|---|---|
| True positive | a real weakness. Fix it, and add a test if behaviour changes. |
| False positive | the rule matched, but there is no risk (for example input that is already constant). Suppress with justification, and consider improving the rule. |
| Accepted risk | real but tolerated temporarily. Record a waiver with an owner and expiry (Module 1). |

**Questions to ask:** Can external data reach this code? Is there an upstream sanitiser? Does context reduce impact (internal tool, admin-only)? Is the pattern risky even with constant data, for example because a future change could introduce input? Prioritise ERROR severity in internet-facing code first. Review "new findings in this pull request" separately from the legacy backlog. Triage should be fast. If one rule produces mostly false positives, fix or remove it. Noisy rules train developers to ignore findings, just as noisy SOC alerts cause fatigue (Course 08).
