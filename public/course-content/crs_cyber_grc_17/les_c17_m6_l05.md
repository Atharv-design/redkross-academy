Structure each finding as follows:

| Term | Meaning |
|---|---|
| Condition | what was found (facts, numbers, evidence references). |
| Criteria | what should be (the standard, policy or regulation). |
| Cause | why it happened (process gap, tool, ownership). |
| Effect / risk | why it matters (link to a risk register entry, potential impact). |
| Recommendation | what to do: specific, feasible, addressing the cause. |
| Rating | high, medium or low, by agreed criteria. |
| Management response | the action, owner and target date agreed with the auditee. |

Example (Tamarind, fictional, from the lab):

```text
Condition: 4 of 240 active accounts (USR-0007, -0091, -0133, -0201)
belonged to staff who left between 2 and 5 months earlier, per the HR
leaver report dated 2026-11-05.
Criteria: STD-AC-05 requires disabling accounts within 1 working day of
departure.
Cause: the HR-to-IT notification is manual email, and two of the four
emails were never received.
Effect: former staff could access customer shipment data, linked to risk
R03. If misused, this may be a notifiable incident.
Recommendation: automate leaver deprovisioning from the HR system to the
identity provider. Run a weekly reconciliation report until it is
automated. Review the four accounts' activity since departure.
Rating: High. Management response: IAM lead, automated by 2027-01-31;
weekly reconciliation from 2026-11-14.
```
