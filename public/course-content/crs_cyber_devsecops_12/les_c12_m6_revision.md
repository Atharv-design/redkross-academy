## Revision

### Summary

Secrets include passwords, tokens, keys and certificates, and should be inventoried with owners and lifetimes. Store them in secrets managers or KMS, deliver them at runtime by reference with least privilege per environment, and keep them out of code, images, logs and CI output. Better still, remove them with workload identity and OIDC federation. Secret scanning uses patterns and entropy in pre-commit hooks, CI gates and history scans. In the lab, gitleaks found nothing in the working tree but found the secret in history (commit 6e1981d). Scanners have gaps, so layer them. Leak response is revoke, investigate, fix, then optionally clean history, and record. Configuration hardening uses secure defaults, validated startup configuration (the lab checker failed five rules with exit 1 and passed the hardened file), IaC scanning and drift detection. Uber's 2016 breach started with an access key on a code-sharing site.

### Important concepts

no static secrets where avoidable; history persists; revoke first.

### Key technical takeaways

gitleaks detect (--no-git vs history, --redact); secretref pattern; startup checks with exit codes.

### Glossary

| Term | Meaning |
|---|---|
| Entropy | Measure of randomness used to spot secrets. |
| OIDC federation | Exchanging CI identity tokens for short-lived cloud credentials. |
| Pre-commit hook | Check run before a commit is created. |
| Push protection | Server-side blocking of pushes containing secrets. |
| Secrets manager | Service storing, auditing and rotating secrets. |
| Workload identity | Platform-issued identity for services. |

### Common mistakes

deleting the secret but not revoking it; secrets in images; blanket allowlists.

### Revision questions

​1. Order the leak-response steps. 2. Why do history scans matter? 3. Name three configuration settings to enforce in production.

### Further reading

FTC Uber settlement [R1]; gitleaks documentation [R2].

## References

- [R1] US Federal Trade Commission. "Uber Agrees to Expanded Settlement with FTC Related to Privacy, Security Claims", 12 April 2018. URL: [https://www.ftc.gov/news-events/news/press-releases/2018/04/uber-agrees-expanded-settlement-ftc-related-privacy-security-claims](https://www.ftc.gov/news-events/news/press-releases/2018/04/uber-agrees-expanded-settlement-ftc-related-privacy-security-claims) Accessed: 2026-11-07. Supports: access key posted on code-sharing site; data volumes; USD 100,000; disclosure in November 2017.
- [R2] Gitleaks project. "gitleaks" (GitHub). URL: [https://github.com/gitleaks/gitleaks](https://github.com/gitleaks/gitleaks) Accessed: 2026-11-07. Supports: detect modes, redaction, pre-commit hook.
- [R3] OWASP. "Secrets Management Cheat Sheet". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) Accessed: 2026-11-07. Supports: storage, rotation, lifecycle guidance.
- [R4] Lab evidence. secrets_lab.sh, secrets_lab_output.txt (gitleaks v8.30.1), config_check.py, config_check_output.txt (CPython 3.14.4), 2026-11-07.
- [R5] CircleCI. "CircleCI incident report for January 4, 2023 security incident", 12 January 2023. URL: [https://circleci.com/blog/jan-4-2023-incident-report/](https://circleci.com/blog/jan-4-2023-incident-report/) Accessed: 2026-11-07. Supports: recommendation to adopt OIDC tokens and reduce stored credentials.
