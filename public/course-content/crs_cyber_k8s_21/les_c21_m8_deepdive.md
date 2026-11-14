evidence.py was run against the default lab cluster (rk-k3s, which had the Module 4 RBAC fix and the Module 4-5 namespace controls applied) and the hardened cluster (rk-k3s-hard, started with encryption, audit logging, a Pod Security default, token-expiry extension off and anonymous authentication off). Default cluster (capstone/evidence_before_output.txt):

```output
C01 PASS  API rejects anonymous requests
      unauthenticated GET /api/v1/namespaces -> HTTP 401
C02 FAIL  Secrets encrypted at rest
      Encryption Status: Disabled, no configuration file found
C03 FAIL  API audit logging enabled
      no audit-log-path argument
C04 FAIL  Cluster-wide Pod Security default
      privileged pod in an unlabelled namespace accepted (no cluster-wide
      default)
C05 FAIL  Workload namespaces enforce restricted
      below restricted: legacy=none
C06 FAIL  Default-deny NetworkPolicy
      no default-deny in: legacy
C07 PASS  No open cluster-wide RBAC risk
      Open cluster-wide high-risk grants: 0
C08 FAIL  Admission policies bound
      bound policies: rk-image-policy
C09 FAIL  Live workloads pass policy
      violations: kestrel/batch(P07); legacy/old-web(P05,P06,P07,P08)
C10 FAIL  First-party images pinned by digest
      tag references: kestrel/api-89dcf95d6-99p4z, ...
Score: 2/10 controls passed
```

Hardened cluster, first round (evidence_after_round1_output.txt, abridged), 7/10:

```output
C05 FAIL  Workload namespaces enforce restricted
      below restricted: evidence-probe-ns=none      <- tool bug, see L04
C07 FAIL  No open cluster-wide RBAC risk
      Open cluster-wide high-risk grants: 1         <- legacy-ops again
C09 FAIL  Live workloads pass policy
      violations: kestrel/batch(P07)                <- no limits
```

Remediation (remediation_round2.txt): the legacy ClusterRoleBinding and ClusterRole were deleted and the namespaced fix from Module 4 applied; the batch pod was recreated with limits (pod resources cannot be changed in place); the tool was fixed to skip terminating namespaces. Hardened cluster, second round (evidence_after_output.txt):

```output
Cluster security evidence - node rk-k3s-hard, API https://127.0.0.1:16444,
server v1.34.1+k3s1
Collected 2026-11-07T22:11:28Z
C01 PASS ... C10 PASS  (each with its evidence line)
Score: 10/10 controls passed
report sha256 621f4f4d2976e3865d2ea188d84d4d249d4d3d2c26b7a3e95c22035af91176e8
```

**Interpretation:**

- The hardened cluster was built from the same manifests, yet round 1 found the legacy RBAC grant re-created by rbac-lab.yaml: applying the "lab" file reintroduced a fixed problem. Evidence collection catches regressions from your own automation.
- The batch pod finding shows that Pod Security Restricted does not require limits; the course's own lab manifest had the gap until the capstone fixed it (batch-pod.yaml now sets limits).
- The before/after comparison is fair only because the same tool and tests ran against both clusters; record the tool version with the evidence.

**Limitations:** ten tests are a sample of the controls taught in the course; see L05 for what they do not cover. C02 and C03 depend on the k3s lab layout.
