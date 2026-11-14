## Revision

### Summary

The control plane (API server, etcd, scheduler, controller manager) holds and reconciles desired state; nodes run kubelets, a container runtime and the network data plane. Every request passes TLS, authentication (401 if refused; system:anonymous if anonymous authentication is enabled, which is the upstream default), authorisation (403), admission (mutating then validating), validation and persistence. etcd holds everything; secrets are base64 in the API and stored in plain text unless encryption at rest is configured, and pre-existing secrets must be rewritten after enablement. Workload objects form ownership chains and are reconciled continuously, so changes belong in templates and Git. The kubelet API is powerful and must require authentication and webhook authorisation. Managed services move control-plane operation, not workload security, to the provider. The lab confirmed 401 for anonymous requests, reconciliation, and plaintext versus aescbc storage. CVE-2018-1002105 showed an API server flaw invisible to audit logs.

### Important concepts

request path; datastore sensitivity; encryption at rest; reconciliation; kubelet API.

### Key technical takeaways

test anonymous access; test encryption with a canary value; protect etcd backups; patch the control plane.

### Glossary

```text
Admission      Plug-ins that mutate or validate requests after
               authorisation.
etcd           The cluster's key-value datastore.
KMS provider   Encryption at rest with keys held in an external KMS.
Reconciliation Controllers driving observed state towards desired state.
```

### Common mistakes

treating base64 as encryption; enabling encryption without rewriting; exposing the API or kubelet broadly; hand-editing pods.

### Revision questions

​1. Walk a "create pod" request through the path. 2. Explain 401 versus 403. 3. List four kubelet protections.

### Further reading

[R1]; [R5].

## References

- [R1] Kubernetes. "Kubernetes Components", Kubernetes Documentation. URL: [https://kubernetes.io/docs/concepts/overview/components/](https://kubernetes.io/docs/concepts/overview/components/) Accessed: 2026-11-07. Supports: component roles (L01).
- [R2] Kubernetes. Issue 71411 "CVE-2018-1002105: proxy request handling in kube-apiserver can leave vulnerable TCP connections", 26 November 2018. URL: [https://github.com/kubernetes/kubernetes/issues/71411](https://github.com/kubernetes/kubernetes/issues/71411) Accessed: 2026-11-07. Supports: CS1 mechanism, versions, detection note.
- [R3] Kubernetes. "Encrypting Confidential Data at Rest". URL: [https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) Accessed: 2026-11-07. Supports: plain-text default, providers, rewrite requirement.
- [R4] Kubernetes. "kube-apiserver" command-line reference. URL: [https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) Accessed: 2026-11-07. Supports: --anonymous-auth default true and system:anonymous behaviour.
- [R5] NSA and CISA. "Kubernetes Hardening Guidance", version 1.2, August 2022. URL: [https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF](https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF) Accessed: 2026-11-07 (PDF refused automated fetch; version and date confirmed from the official change history via search). Supports: review checklist (L06).
- [R6] Lab evidence. m03_explore.sh, m03_explore_output.txt, hardened_checks_output.txt (k3s v1.34.1+k3s1), 2026-11-07.
