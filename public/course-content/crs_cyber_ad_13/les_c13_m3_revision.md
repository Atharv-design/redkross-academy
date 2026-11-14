## Revision

### Summary

Administration is a security control. OUs organise objects for delegation and Group Policy, and are not security groups. Groups have type (security or distribution) and scope (domain-local, global, universal); the AGDLP pattern keeps role and permission separable and reviewable. GPOs apply settings once linked, in LSDOU order, and SYSVOL that stores them is readable by all authenticated users - so secrets must never go there. The domain has one password policy; fine-grained PSOs impose stronger rules on sensitive accounts, as the lab's 25-character ServiceAccountPSO did for legacy-svc while ordinary users kept the 7-character default. Service accounts with SPNs are Kerberoastable and need long random secrets or, better, gMSAs, and must stay out of privileged groups. Privileged accounts need separate admin identities, least privilege, and small, owned, reviewed group membership.

### Important concepts

OUs and delegation; group scope and type; AGDLP; GPO links and LSDOU; PSOs; SPNs and gMSAs; privileged-account governance.

### Key technical takeaways

build structure that mirrors administration; apply strong rules selectively with PSOs; never store secrets in GPOs; keep privileged groups small and reviewed.

### Glossary

```text
AGDLP  Accounts -> Global -> Domain Local -> Permissions grouping pattern.
GPO    Group Policy Object.
gMSA   Group managed service account (auto-rotated password).
PSO    Password Settings Object (fine-grained password policy).
SYSVOL The share holding Group Policy and logon scripts.
```

### Common mistakes

using OUs as security groups; broad group membership "to fix access"; storing secrets in GPOs; one extreme policy for everyone; service accounts in privileged groups.

### Revision questions

​1. What are OUs for, and what are they not? 2. How does a PSO differ from the domain policy? 3. Why is an SPN on a user account a risk, and what fixes it?

### Further reading

[R1]; [R3]; [R4].

## References

- [R1] Microsoft. "Group Policy overview - Windows Server". URL: [https://learn.microsoft.com/en-us/troubleshoot/windows-server/group-policy/group-policy-overview](https://learn.microsoft.com/en-us/troubleshoot/windows-server/group-policy/group-policy-overview) Accessed: 2026-11-08. Supports: Group Policy objects, links and the areas (processing, filtering, SYSVOL) covered in this module.
- [R2] Microsoft. "Group Managed Service Accounts overview". URL: [https://learn.microsoft.com/en-us/windows-server/security/group-managed-service-accounts/group-managed-service-accounts-overview](https://learn.microsoft.com/en-us/windows-server/security/group-managed-service-accounts/group-managed-service-accounts-overview) Accessed: 2026-11-08. Supports: gMSAs, automatic password management.
- [R3] Microsoft. "Microsoft Security Compliance Toolkit and baselines". URL: [https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10](https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10) Accessed: 2026-11-08. Supports: security baselines delivered as GPOs (Module 4).
- [R4] Microsoft. "MS14-025: Vulnerability in Group Policy Preferences could allow elevation of privilege". URL: [https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-025](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-025) Accessed: 2026-11-08. Supports: CS1, GPP cpassword, SYSVOL readability.
- [R5] Lab evidence. setup_domain.sh output: PSO, SPN, GPO and user list (Samba 4.22.11), 2026-11-08.
