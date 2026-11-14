k8s/rbac-lab.yaml creates three service accounts in namespace kestrel: ci-deployer (narrow Role), reporting (pod reader) and legacy-ops (a ClusterRole with secrets get/list, pods and pods/exec `"*",` and create and bind on rolebindings, granted cluster-wide). rbac_review.py was run with the accepted-grants file. Output (execution-tested, 2026-11-07, abridged):

```output
RBAC review: 67 bindings, 83 roles examined

group:system:masters  via cluster-admin -> cluster-admin  [CLUSTER-WIDE]
   ACCEPTED (plat.sec: built-in break-glass group; no day-to-day ...)
   K00  cluster-admin
   K01  wildcard verb or resource
   K02  read secrets

sa:kestrel/legacy-ops  via kestrel-ops-legacy -> kestrel-ops-legacy
   [CLUSTER-WIDE]  OPEN
   K01  wildcard verb or resource
   K02  read secrets
   K03  exec/attach/port-forward into pods
   K04  create workloads (can mount any secret or service account ...)
   K05  RBAC escalation verbs (bind/escalate/impersonate)
   K06  write RBAC bindings
... (three k3s platform grants, each ACCEPTED with owner and reason)

Open cluster-wide high-risk grants: 1
exit=1
```

After deleting the legacy ClusterRoleBinding and ClusterRole and applying k8s/solutions/rbac-legacy-ops-fixed.yaml (a namespaced read-only role):

```output
Open cluster-wide high-risk grants: 0
exit=0
get secrets -n kube-system     legacy-ops no
create pods/exec -n kestrel    legacy-ops no
list pods -n kestrel           legacy-ops yes
get pods/log -n kestrel        legacy-ops yes
```

Admission policy tests (server-side dry runs, admission_output.txt, abridged):

```output
--- before labelling the namespace (policy not in scope)
pod/t-latest created (server dry run)
--- after labelling (rk.lab/policy=enforced)
pods "t-latest" is forbidden: ValidatingAdmissionPolicy 'rk-image-policy'
  ... denied request: image not from an approved repository: nginx:latest
pod/t-ok created (server dry run)
deployments.apps "t-busybox" is forbidden: ... image not from an approved
  repository: docker.io/library/busybox:1.37
The pods "t-hostnet" is invalid: : ValidatingAdmissionPolicy ...
  denied request: hostNetwork is not allowed
```

**Interpretation:**

- Before the fix, legacy-ops could read every secret in the cluster and run commands in any pod, and with create and bind on rolebindings it could grant itself more. The review flagged it in one line of exit status; can-i confirmed the effective rights.
- The fix keeps the operational need (read pods, logs and events) and moves exec and secret access to a just-in-time process.
- The image policy shows scope by label, Deny on both Pods and Deployments, and the effect of the reason field.

**Limitations:** the review reads RBAC only; it does not see identity provider group membership, admission policies or webhook permissions; treat its output as the start of an access review, not the end.
