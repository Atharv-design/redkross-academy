## Revision

### Summary

Hardening is a measured loop: scope, baseline, prioritise, change through Git, verify by effect, re-run, report and schedule. The lab catalogue of ten controls (anonymous access, encryption, audit logging, Pod Security default and labels, default-deny, RBAC, admission policies, live workload policy, digests) moved the default cluster at 2/10 and the hardened cluster from 7/10 to 10/10 after fixing a re-created RBAC grant, a pod without limits and a bug in the tool itself. Scan images, manifests, live state and access, linked through the digest. Evidence must be reproducible, specific, timestamped, hashed and honest about limits; scores are statements about chosen tests. Keep clusters hardened with scheduled evidence, drift detection, advisory tracking and re-testing after upgrades. CVE-2025-1974 showed why add-on inventory, pod-network segmentation and add-on RBAC matter.

### Important concepts

baseline; test by effect; evidence integrity; residual risk; regression detection.

### Key technical takeaways

same tool before and after; hash evidence; include add-ons; investigate unexpected failures before acting.

### Glossary

```text
Baseline      Measured state before changes.
Evidence      Reproducible record of a test and its observed result.
Regression    A previously passing control that fails again.
Residual risk Risk that remains after controls, owned by a decision
              maker.
```

### Common mistakes

screenshots as evidence; "10/10 means secure"; fixing by hand; ignoring add-ons.

### Revision questions

​1. Describe the hardening loop. 2. Explain why C04 uses a dry run. 3. List four things the catalogue does not cover.

### Further reading

[R2]; [R3].

## References

- [R1] Kubernetes. Issue 131009 "CVE-2025-1974: ingress-nginx admission controller RCE escalation", opened 23 March 2025. URL: [https://github.com/kubernetes/kubernetes/issues/131009](https://github.com/kubernetes/kubernetes/issues/131009) Accessed: 2026-11-07. Supports: CS1 conditions, CVSS 9.8, versions, mitigation, no known IOCs.
- [R2] NSA and CISA. "Kubernetes Hardening Guidance", version 1.2, August 2022. URL: [https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF](https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF) Accessed: 2026-11-07 (version and date confirmed via search; PDF refused automated fetch). Supports: hardening checklist (L01).
- [R3] Kubernetes. "Kubernetes Blog: Ingress-nginx CVE-2025-1974: What You Need to Know", 24 March 2025. URL: [https://kubernetes.io/blog/2025/03/24/ingress-nginx-cve-2025-1974/](https://kubernetes.io/blog/2025/03/24/ingress-nginx-cve-2025-1974/) Accessed: 2026-11-07. Supports: project communication of CS1 (details taken from R1).
- [R4] Kubernetes. "Pod Security Standards". URL: [https://kubernetes.io/docs/concepts/security/pod-security-standards/](https://kubernetes.io/docs/concepts/security/pod-security-standards/) Accessed: 2026-11-07. Supports: C04 and C05 controls.
- [R5] Lab evidence. capstone/evidence.py, before/, after_round1/, after/, `evidence_*_output.txt,` remediation_round2.txt (k3s v1.34.1+k3s1), 2026-11-07.
