Guardrails bound privilege even when individual policies are too broad:

| Term | Meaning |
|---|---|
| SCPs (AWS) | maximum permissions for accounts in an OU; for example deny disabling CloudTrail or leaving approved regions. |
| Permission boundaries | maximum permissions an IAM user/role can have; let teams create roles safely. |
| Azure Policy | deny or audit resource configurations. |
| PIM (Entra/Azure) | just-in-time, approved, time-bound activation of privileged roles. |
| Conditional Access | sign-in conditions (MFA, device, location). |

Some permissions are sensitive because they let their holder grant themselves or others more access. Treat them as privileged, restrict them to a few administrative roles, and alert on their use:

- iam:PassRole (giving a role to a service), iam:CreateAccessKey for other users, iam:AttachUserPolicy / PutUserPolicy / CreatePolicyVersion, sts:AssumeRole into privileged roles, and `"*";`
- Azure: Owner, User Access Administrator, RBAC Administrator, and Entra Privileged Role Administrator / Application Administrator.

Cross-account roles must restrict their trust policy to specific accounts and, for third parties, require an external ID - otherwise anyone who can reach the role may be able to assume it (the "confused deputy" problem).
