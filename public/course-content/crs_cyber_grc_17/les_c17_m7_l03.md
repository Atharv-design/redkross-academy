Methods, in increasing depth:

- questionnaires (standardised question sets, or your own short, risk-based set);
- evidence review: certifications and their scope (ISO 27001 certificate, Module 3), independent assurance reports, penetration test summaries, policies;
- external signals: security ratings, breach history, financial health (with care, because ratings are indicators, not proof);
- architecture and data-flow review for integrations (Course 11, 12);
- on-site or remote audits for critical vendors where contracts allow.

Scoring with critical items. Some answers must override the total. Execution-tested (LAB_ASSETS/C17/grc_toolkit.py vendor):

```text
------------------------------------------------------------- BEGIN OUTPUT
  RouteOpt SaaS      score 17/19 (89%) critical fails - -> approve
  QuickPrint Labels  score 7/19 (37%) critical fails ['V2', 'V4'] ->
                     REJECT/REMEDIATE
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Reading it:**

- RouteOpt scored 89% and passed every critical item. It missed V6 (data in approved regions), which is a condition to resolve contractually or document as a cross-border transfer.
- QuickPrint failed V2 (MFA) and V4 (24-hour breach notification). These are critical items, so it is rejected or must remediate before onboarding, whatever its total. A weighted average alone would hide such deal-breakers.

Verify answers. Ask for evidence for critical items: an MFA policy screenshot or attestation report, the contract clause. Self-reported answers have limited reliability (Module 6).
