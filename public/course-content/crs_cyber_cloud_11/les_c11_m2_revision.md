## Revision

### Summary

AWS principals include the root user, IAM users and roles; Entra has users, service principals and managed identities. People should use SSO with phishing-resistant MFA; workloads should use roles or managed identities.

**AWS evaluation:** explicit Deny wins, then Allow (within SCPs and boundaries), otherwise implicit deny - the lab reproduced this, including the trap that a Bool MFA deny does not apply to long-term access keys while BoolIfExists does. Azure RBAC assigns roles at scopes with inheritance; Owner and User Access Administrator are privileged; Entra directory roles are separate. Guardrails - SCPs, permission boundaries, Azure Policy, PIM, Conditional Access - bound privilege, and sensitive permissions such as PassRole need tight control. The lab review flagged a legacy full-access user with a key and no MFA, an unrestricted PassRole and a role trusting any principal. Midnight Blizzard's entry through a legacy test account without MFA shows why every identity must be governed.

### Important concepts

least privilege; temporary credentials; guardrails.

### Key technical takeaways

BoolIfExists for MFA denies; ExternalId for third parties; restrict PassRole.

### Glossary

```text
Confused deputy    A trusted service misused to act for another party.
ExternalId         Condition value required to assume a third-party role.
Managed identity   Azure-managed workload identity.
Permission boundary Maximum permissions for an IAM principal.
PIM                Privileged Identity Management.
Trust policy       Who may assume an IAM role.
```

### Common mistakes

IAM users for people; `"*"` actions; Bool MFA conditions; permanent Owner assignments.

### Revision questions

​1. Walk through evaluation of a request with Allow and Deny. 2. Why can access keys bypass a Bool MFA deny? 3. Design vendor access.

### Further reading

AWS condition keys [R1]; Microsoft responder guidance [R2]; Azure built-in roles [R3].

## References

- [R1] AWS. "AWS global condition context keys" (IAM User Guide). URL: [https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html) Accessed: 2026-11-07. Supports: aws:MultiFactorAuthPresent absent with long-term keys; BoolIfExists.
- [R2] Microsoft Threat Intelligence. "Midnight Blizzard: Guidance for responders on nation-state attack", 25 January 2024. URL: [https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/) Accessed: 2026-11-07.
- [R3] Microsoft. "Azure built-in roles". URL: [https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles) Accessed: 2026-11-07.
- [R4] Lab evidence. iam_lab.py and iam_lab_output.txt (boto3 1.43.126, moto 5.2.5, python:3.12-slim), 2026-11-07.
