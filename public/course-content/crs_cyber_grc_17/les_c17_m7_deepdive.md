The toolkit's questionnaire design (execution-tested logic):

```text
QUESTIONS = (id, question, weight, critical)
  V1 independent certification current (weight 3)
  V2 MFA for all staff and admin access (3, critical)
  V3 encryption at rest and in transit (3, critical)
  V4 breach notification within 24 hours in contract (2, critical)
  V5 sub-processors disclosed and assessed (2)
  V6 data in approved regions or documented transfer (2)
  V7 annual penetration test with remediation (2)
  V8 tested backup and recovery with stated RTO/RPO (2)
score = sum of weights answered "yes"; maximum 19.
Decision:
  any critical "no"  -> REJECT/REMEDIATE
  score >= 80%       -> approve
  otherwise          -> approve with conditions
```

**Design principles:**

- Keep questionnaires short and tier-specific. Long ones get copy-pasted answers.
- Mark deal-breakers as critical, so averages cannot hide them.
- Ask for evidence for weighted items in Tier 1.
- Record conditions as tracked actions with dates.
- Re-score on reassessment, and keep the history.
- State the limitation: answers are vendor claims until verified.

Extending the toolkit (Practical P1) to add tiers and evidence status makes the model closer to a GRC platform.
