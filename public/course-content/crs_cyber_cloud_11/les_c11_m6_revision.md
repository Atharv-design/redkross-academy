## Revision

### Summary

Cloud misconfigurations recur in exposure, identity, encryption, logging, resilience, secrets and defaults. CSPM tools (AWS Config and Security Hub, Azure Policy and Defender for Cloud, scripts) assess live configuration continuously; IaC scanning catches problems before deployment. The lab scan of weak Terraform found 21 passed and 32 failed checks; triage puts internet exposure first; a literal password went unflagged, showing scanner blind spots. Preventive guardrails (SCPs, Azure Policy deny, account defaults, CI gates, drift detection) close exposure windows, and exceptions need owners and expiry. Remediation is verified by re-scan (12 selected checks: 0/12 to 12/12) and by effect. The Power Apps case shows that insecure defaults, and fixes that apply only to new resources, require posture checks.

### Important concepts

prevent-detect-verify; triage; scanner limits.

### Key technical takeaways

checkov -d; exceptions as code; verify by effect.

### Glossary

| Term | Meaning |
|---|---|
| CSPM | Cloud security posture management. |
| Drift | Live configuration differing from declared code. |
| Guardrail | Preventive control that blocks bad configuration. |
| IaC | Infrastructure as code. |
| Suppression | Recorded exception to a scanner check. |

### Common mistakes

endless finding lists without prevention; permanent "temporary" exceptions; trusting a single scanner.

### Revision questions

​1. Name six misconfiguration patterns. 2. Why verify by effect? 3. Design an exception process.

### Further reading

UpGuard Power Apps report [R1]; checkov documentation [R2].

## References

- [R1] UpGuard. "By Design: How Default Permissions on Microsoft Power Apps Exposed Millions", 23 August 2021. URL: [https://www.upguard.com/breaches/power-apps](https://www.upguard.com/breaches/power-apps) Accessed: 2026-11-08. Supports: 38 million records, 47 entities notified, table permissions disabled by default, OData anonymous access, new default for newly created portals, Portal Checker.
- [R2] Bridgecrew/Prisma Cloud. "checkov" (project documentation). URL: [https://www.checkov.io/](https://www.checkov.io/) Accessed: 2026-11-07. Version used: 3.4.3.
- [R3] Lab evidence. iac/main.tf, iac_fixed/main.tf, checkov_output.txt and checkov_verify_output.txt (checkov 3.4.3), 2026-11-07.
- [R4] Lab evidence. trivy 0.76.2 Dockerfile scan (DS-0031 password in ENV), trivy_fs_output.txt, 2026-11-07.
