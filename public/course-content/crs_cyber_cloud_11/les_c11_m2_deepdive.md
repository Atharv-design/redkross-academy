1. People: SSO from the corporate IdP to IAM Identity Center and Azure; FIDO2 for administrators; no IAM users for staff.
2. Root/Global Admin: two break-glass accounts per cloud with hardware keys, stored under dual control, alerting on any use (Module 5).
3. Workloads: IAM roles and managed identities; no long-term keys; CI/CD uses OIDC federation to obtain short-lived role credentials (Module 7).
4. Policies: job-function permission sets; deny-without-MFA statements use BoolIfExists; sensitive permissions limited to platform admins.
5. Guardrails: SCP denying iam:CreateUser and CreateAccessKey outside the identity account; permission boundaries for team-created roles; Azure PIM for Owner and User Access Administrator; Conditional Access requiring compliant devices for admin portals.
6. Third parties: cross-account roles with ExternalId; application consents reviewed quarterly.
7. Reviews: the Part B script extended to all accounts, run weekly, with findings to the identity team; quarterly access reviews in Entra.
