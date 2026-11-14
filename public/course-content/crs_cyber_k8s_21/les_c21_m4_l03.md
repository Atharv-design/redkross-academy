The RBAC good-practice guide lists permissions that allow escalation [R1]. The lab tool rbac_review.py checks for each:

```text
K01 wildcards in verbs or resources;
K02 get, list or watch on secrets - list returns the contents of every
    secret in scope;
K03 pods/exec, attach and port-forward - interactive access into
    workloads (and, historically, the CVE-2018-1002105 path);
K04 create pods or workload controllers - a creator can run any image
    with any service account and mount any secret in the namespace;
K05 bind, escalate and impersonate - grant or assume permissions beyond
    one's own;
K06 create or modify RoleBindings and ClusterRoleBindings;
K07 nodes/proxy and serviceaccounts/token - direct kubelet access and
    minting tokens for other identities.
```

Persistent volume creation, certificate signing requests and control of admission webhooks are further escalation routes the guide describes.

A review that lists every built-in controller is unusable. The tool skips "system:" roles bound only to built-in subjects (system: identities and kube-system service accounts) and supports an accepted-grants file: each platform component that genuinely needs broad rights is recorded with an owner and a reason, so it stays visible but separate from open findings. Exit code 1 means an unaccepted cluster-wide high-risk grant exists, so the review can run in a pipeline or on a schedule. Pair it with "kubectl auth can-i --list --as=..." to confirm the effective result for a subject.
