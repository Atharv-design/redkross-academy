Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A leaked-key alert shows an access key used from an unknown network five minutes ago.

**Task:** First thirty minutes.

> [!TIP] Model answer
> Deactivate the key; identify its owner and permissions; revoke older sessions for any roles it assumed; review CloudTrail for all its activity since first unusual use (new keys, users, roles, data access, exposure changes); contain any persistence; preserve logs; notify the owner and open a case; rotate any secrets it could read.
>
> **Lesson:** contain first, then scope quickly.

## Scenario 2

Ransomware actors gained administrator rights in a production subscription and began deleting resources.

**Task:** Respond and recover.

> [!TIP] Model answer
> Use break-glass access from outside the compromised identity path; remove or disable the attacker's identities and role assignments; revoke sessions; apply restrictive policy at management-group level if needed; preserve logs; restore from immutable backups held in a separate subscription; rebuild from IaC; notify per law; review how admin rights were obtained.
>
> **Lesson:** isolation of backups and break-glass decide recovery.

## Scenario 3

After an incident, leadership asks "how do we make sure this cannot happen again?"

**Task:** Answer with an architecture-level plan.

> [!TIP] Model answer
> Present the reference architecture gaps found in the review with owners: guardrails (SCP/Policy) preventing the abused actions, phishing-resistant MFA and PIM, removal of long-term keys, isolated immutable backups, detections for the observed behaviours with tests, IR roles and exercises; track completion with evidence and re-test.
>
> **Lesson:** lessons learned become controls.
