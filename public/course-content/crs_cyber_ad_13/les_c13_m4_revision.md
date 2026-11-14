## Revision

### Summary

Enterprise identity security is about containment. Credentials used on a system can be exposed if that system is compromised, so a high-privilege account used on a low-trust machine is the fatal pattern behind lateral movement. The tier model (Tier 0 directory control, Tier 1 servers, Tier 2 workstations) forbids downward exposure of higher-tier credentials and flows administration downward only; the Enterprise Access Model keeps this discipline and extends it to cloud assets via control, management, data/workload, user-access and app-access planes. Privileged-access workstations and the clean-source principle give admins a trusted place to work from. Protected Users (AES-only, no NTLM/DES/RC4, four-hour TGT, no delegation - not for service accounts), LAPS (unique per-host local admin passwords) and account hardening enforce the model. Baselines (CIS, Microsoft, STIG) define testable targets that must be measured continuously. The lab's tiered OUs and accounts implement the skeleton; a single container cannot physically separate tiers, which the deep dive names explicitly.

### Important concepts

credential exposure; Tier 0/1/2; Enterprise Access Model planes; PAW and clean source; Protected Users; LAPS; baselines.

### Key technical takeaways

separate accounts by tier; manage only from clean sources; apply Protected Users to admins (not services); use LAPS; measure against baselines.

### Glossary

| Term | Meaning |
|---|---|
| LAPS | Local Administrator Password Solution (unique rotated local admin passwords). |
| PAW | Privileged-access workstation. |
| Protected Users | built-in group enforcing strong credential protections. |
| Tier 0 | identities and systems that control the directory. |
| clean source | the rule that a controller must be at least as trusted as what it controls. |

### Common mistakes

one account for all tiers; administering Tier 0 from ordinary machines; adding service accounts to Protected Users; shared local admin passwords; adopting a baseline but never measuring it.

### Revision questions

​1. State the tier model rule in one sentence. 2. Name three protections Protected Users enforces. 3. Why can you not manage Tier 0 from a Tier 2 machine?

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] Microsoft. "Privileged access: Enterprise access model". URL: [https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model) Accessed: 2026-11-08. Supports: tier model evolution, control/management/ data planes, user and app access.
- [R2] Microsoft. "Protected Users security group". URL: [https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group](https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group) Accessed: 2026-11-08. Supports: AES-only, no NTLM/DES/RC4, no delegation, 240-minute TGT, RID 525, not for service accounts.
- [R3] Microsoft. "Windows LAPS overview". URL: [https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview](https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview) Accessed: 2026-11-08. Supports: unique, rotated local administrator passwords.
- [R4] Microsoft. "Microsoft Security Compliance Toolkit and baselines". URL: [https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10](https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10) Accessed: 2026-11-08. Supports: security baselines as GPOs.
- [R5] Greenberg, A. "The Untold Story of NotPetya...", WIRED, 22 August 2018. URL: [https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/](https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/) Accessed: 2026-11-08. Supports: CS1, estate-wide spread and AD rebuild.
