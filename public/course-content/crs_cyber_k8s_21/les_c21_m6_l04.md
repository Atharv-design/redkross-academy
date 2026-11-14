Policy as code means writing rules as versioned, reviewed, tested code that a machine enforces. Engines include OPA (Rego) with Conftest or Gatekeeper, Kyverno, CEL in ValidatingAdmissionPolicy (Module 4), and the custom-check frameworks of scanners. Whatever the engine, apply software practice:

- one rule, one purpose, one clear message;
- unit tests for every rule: a compliant case, a violating case and the edge cases that real configuration will contain;
- a test run in CI for the policy repository itself;
- versioned releases of the policy set, with change notes.

The lab engine, iac/rk_policy.py, applies nine rules (P01 to P09) to Kubernetes workload manifests of any kind (Pod, Deployment, StatefulSet, DaemonSet, Job, CronJob): unpinned or :latest images, privileged mode, hostPath, host namespaces, runAsNonRoot, allowPrivilegeEscalation, resource limits, capability drops, and (as a warning) automountServiceAccountToken. Its seven test cases include edge cases that naive rules get wrong:

- a registry port is not a tag: "registry.example:5000/team/app" has a colon but no version tag (t03);
- a digest-pinned image passes P01 even without a tag (t04);
- a container-level runAsNonRoot: false overrides a pod-level true (t06);
- CronJobs nest the pod template two levels deeper (t07).

Rules evaluate the pod template, so the same rules serve CI (manifests in Git) and the capstone (live objects read from the API).
