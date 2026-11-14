Restricted is a floor. Add, where the workload allows:

- readOnlyRootFilesystem: true (not required by Restricted) with emptyDir volumes for paths that must be writable;
- resource requests and limits (CPU, memory, ephemeral storage), enforced with LimitRange and ResourceQuota;
- automountServiceAccountToken: false (Module 4);
- seccomp Localhost profiles tailored to the application, and AppArmor or SELinux profiles where the nodes support them;
- user namespaces (hostUsers: false) where supported, so container root maps to an unprivileged host user;
- sandboxed runtime classes for untrusted or multi-tenant code;
- dedicated node pools for sensitive workloads.

The lab's policy-as-code engine (Module 6) checks several of these that Pod Security does not, including resource limits; it found that the lab's own batch pod had none - a gap Pod Security did not report.
