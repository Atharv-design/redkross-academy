Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A help-desk team needs to reset passwords for staff in one department only.

**Task:** Describe how to grant this with least privilege, using OUs and delegation rather than a privileged group.

> [!TIP] Model answer
> Place the department's user accounts in their own OU. Delegate the specific right "reset password" (and optionally "change password at next logon") on THAT OU to a global group containing the help-desk staff, using the delegation of control / access-control entries - not membership of Account Operators or Domain Admins. This grants exactly the needed action, scoped to one OU, and is easy to review and revoke.
>
> **Lesson:** delegate narrow rights on OUs; avoid broad privileged groups.

## Scenario 2

A new application needs a service account and will authenticate users with Kerberos.

**Task:** Specify how you would create and govern that account to minimise the Kerberoasting risk.

> [!TIP] Model answer
> Prefer a group managed service account (gMSA) so the directory generates and rotates a long random password automatically and no human knows it. If a gMSA is not possible, create a dedicated user account with a long random password enforced by a PSO (25+ characters), enable AES, keep it out of privileged groups, deny interactive logon, and register only the SPN it needs. Review it. This minimises the Kerberoasting payoff (Module 5).
>
> **Lesson:** gMSA first; otherwise a PSO-enforced long random secret and least privilege.

## Scenario 3

Leadership wants one strong password policy "for everyone", including 30-character passwords for all staff.

**Task:** Explain the trade-offs and propose a better design using the tools in this module.

> [!TIP] Model answer
> A blanket 30-character password for all staff harms usability and drives insecure coping (written-down passwords, reuse) without proportionate benefit for ordinary users, and modern guidance favours length with other controls (MFA, lockout, breached-password screening) over extreme length for everyone. Better: a sensible domain default for staff plus MFA, and fine-grained PSOs that impose long random passwords specifically on service and administrative accounts - exactly where offline cracking matters most.
>
> **Lesson:** target strong requirements where the risk is; pair length with MFA and lockout.
