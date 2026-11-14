## Revision

### Summary

Secure workloads start with minimal, non-root, digest-pinned and scanned images containing no secrets; the lab's Dockerfile had three trivy findings including a CRITICAL secret in ENV, and the base image showed many fixable findings at the time of scanning. Serverless functions need one least-privilege role each, validated inputs, authenticated triggers and no secrets in environment variables. Secrets live in managed stores, are fetched by identity, rotated and inventoried; better still, workload identities (roles, managed identities) and CI/CD OIDC federation remove secrets altogether. Secret scanners find structured provider keys (2 CRITICAL on the format-valid key) but exclude documentation examples and miss generic passwords. Runtime controls - least privilege, egress limits, runtime monitoring, immutable replacement and credential-use alerts - limit and reveal misuse. CircleCI's 2022 incident shows why platforms should hold no long-lived secrets.

### Important concepts

identity over secrets; build-deploy-run-observe; scanner limits.

### Key technical takeaways

trivy config/fs/image; OIDC trust conditions; DS-0031.

### Glossary

| Term | Meaning |
|---|---|
| CWPP | Cloud workload protection platform. |
| Execution role | IAM role assumed by a Lambda function. |
| IRSA | IAM Roles for Service Accounts (EKS). |
| OIDC federation | Exchanging an identity token for cloud credentials. |
| Secrets Manager / Key Vault | Managed secret stores. |

### Common mistakes

secrets in ENV; tutorial roles with `"*";` trusting a clean secret scan; CI platforms full of cloud keys.

### Revision questions

​1. Why do image layers keep deleted secrets? 2. Design OIDC trust conditions. 3. What did the lab's scanner miss?

### Further reading

CircleCI incident report [R1]; trivy documentation [R2].

## References

- [R1] CircleCI. "CircleCI incident report for January 4, 2023 security incident". URL: [https://circleci.com/blog/jan-4-2023-incident-report/](https://circleci.com/blog/jan-4-2023-incident-report/) Accessed: 2026-11-07. Supports: malware 16 December 2022, AV missed, 2FA-backed SSO cookie, exfiltration 22 December, keys from running process, rotate, OIDC.
- [R2] Aqua Security. "Trivy documentation". URL: [https://trivy.dev/](https://trivy.dev/) Accessed: 2026-11-07. Version used: 0.76.2.
- [R3] Lab evidence. workload_repo, workload_repo2, trivy_fs_output.txt, trivy_secret_output.txt, trivy_image_output.txt (trivy 0.76.2), 2026-11-07.
- [R4] Course 21 Modules 1-2 and 7 (container hardening, image security and supply chain within this library).
