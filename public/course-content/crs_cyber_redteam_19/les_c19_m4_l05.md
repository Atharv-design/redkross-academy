Containment limits what identity abuse can achieve:

| Term | Meaning |
|---|---|
| MFA | defeats stolen-password reuse for interactive access. |
| tiered admin | keeps Tier 0 credentials off lower-trust hosts (Course 13). |
| logon restrictions | restrict where privileged accounts can log on; deny workstation-to-workstation admin. |
| Protected Users / hardening | reduce cached credentials and weak auth material. |
| least privilege | fewer rights to abuse; fewer secrets to steal. |

Containment is paired with detection: detect the anomalous logon AND make the credential less reusable. The lab's map lists a containment for each identity technique (e.g. MFA and tiered admin for Valid Accounts). Containment and detection together are what the engagement recommends.
