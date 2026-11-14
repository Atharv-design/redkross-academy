## Revision

### Summary

Pods are non-isolated by default; NetworkPolicy, implemented only by supporting network plugins, isolates them additively by label, namespace and port. A baseline is default-deny for ingress and egress plus DNS egress and paired allows, proved with a reachability matrix that counts any HTTP answer as reachable. Pod Security Standards (Privileged, Baseline, Restricted) are enforced by namespace labels (enforce, audit, warn, version), assessed safely with server-side dry runs and backed by a cluster-wide default. Go beyond Restricted with read-only roots, limits, no token automount, custom profiles and user namespaces. Audit policies are first-match; log secrets at Metadata; detections must match exec by subresource (recorded as get/101 with WebSockets) and de-duplicate by auditID. Node sensors see inside containers. Hildegard combined an anonymous kubelet, internal scanning and process hiding.

### Important concepts

default deny; additive policy; PSA modes; first-match audit rules; actor resolution.

### Key technical takeaways

always allow DNS explicitly; test from client pods; dry-run PSA labels; dedupe by auditID.

### Glossary

| Term | Meaning |
|---|---|
| CNI | Container Network Interface (network plugins). |
| PSA | Pod Security Admission. |
| PSS | Pod Security Standards. |
| auditID | Identifier shared by all stages of one audited request. |

### Common mistakes

policies without an enforcing plugin; forgetting DNS; trusting "kubectl get networkpolicy" as evidence; verb-only exec rules.

### Revision questions

​1. Write a default-deny policy from memory. 2. List the Restricted controls. 3. Explain why rule order matters.

### Further reading

[R1]; [R3].

## References

- [R1] Kubernetes. "Network Policies". URL: [https://kubernetes.io/docs/concepts/services-networking/network-policies/](https://kubernetes.io/docs/concepts/services-networking/network-policies/) Accessed: 2026-11-07. Supports: plugin dependence, default non-isolation, additive semantics.
- [R2] Kubernetes. "Pod Security Standards". URL: [https://kubernetes.io/docs/concepts/security/pod-security-standards/](https://kubernetes.io/docs/concepts/security/pod-security-standards/) Accessed: 2026-11-07. Supports: level definitions and baseline controls (Restricted controls also confirmed by the lab's PodSecurity messages).
- [R3] Kubernetes. "Auditing". URL: [https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) Accessed: 2026-11-07. Supports: stages, levels, first-match rule.
- [R4] Unit 42, Palo Alto Networks. "Hildegard: New TeamTNT Cryptojacking Malware Targeting Kubernetes", 3 February 2021. URL: [https://unit42.paloaltonetworks.com/hildegard-malware-teamtnt/](https://unit42.paloaltonetworks.com/hildegard-malware-teamtnt/) Accessed: 2026-11-07. Supports: CS1.
- [R5] Kubernetes. "KEP-4006: Transition from SPDY to WebSockets". URL: [https://www.kubernetes.dev/resources/keps/4006/](https://www.kubernetes.dev/resources/keps/4006/) Accessed: 2026-11-07 (search summary of the KEP page). Supports: kubectl streaming over WebSockets (alpha 1.29, beta 1.31).
- [R6] Lab evidence. netpol/, netpol_test.sh, netpol_output.txt, psa_output.txt, hardened/audit-policy.yaml, m05_activity_output.txt, audit_detect.py, audit_detect_output.txt, hardened_checks_output.txt (k3s v1.34.1+k3s1), 2026-11-07.
