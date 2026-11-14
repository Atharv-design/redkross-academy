The Pod Security Standards define three levels [R2]:

| Term | Meaning |
|---|---|
| Privileged | unrestricted; allows known privilege escalations |
| Baseline | prevents known privilege escalations while allowing the default pod configuration; for example it forbids hostPath volumes, privileged containers and host namespaces |
| Restricted | heavily restricted current best practice: additionally requires runAsNonRoot, allowPrivilegeEscalation false, a seccomp profile (RuntimeDefault or Localhost), dropping ALL capabilities (NET_BIND_SERVICE may be added back) and limits volume types |

Pod Security Admission enforces them per namespace through labels:

```text
pod-security.kubernetes.io/enforce=<level>   reject violating pods
pod-security.kubernetes.io/audit=<level>     annotate audit events
pod-security.kubernetes.io/warn=<level>      warn the client
...-version=<v1.34|latest>                   pin the rule version
```

**Safe rollout:** test a label with a server-side dry run first. In the lab, "kubectl label --dry-run=server ns legacy ...enforce=restricted" returned warnings naming each existing pod and the controls it violates, while baseline produced none - a free impact assessment. Enforcement applies to new pods; existing pods keep running until recreated.

A cluster-wide default (AdmissionConfiguration for the PodSecurity plugin) covers namespaces nobody labelled. The hardened lab cluster enforces baseline everywhere, warns and audits at restricted, and exempts only kube-system; a privileged pod submitted to a brand-new, unlabelled namespace was refused with 'violates PodSecurity "baseline:latest"' (hardened_checks_output.txt). Without the default, a new namespace is privileged by default.
