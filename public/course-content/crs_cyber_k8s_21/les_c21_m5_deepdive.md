Segmentation (k8s/netpol/, netpol_test.sh; netpol_output.txt):

```output
== stage 1: no NetworkPolicy
  frontend  http://api.kestrel/healthz                   REACHABLE (HTTP 200)
  batch     http://api.kestrel/healthz                   REACHABLE (HTTP 200)
  frontend  https://kubernetes.default/version           REACHABLE (HTTP 401)
== stage 2: default deny
  frontend  http://api.kestrel/healthz                   BLOCKED
  batch     http://api.kestrel/healthz                   BLOCKED
  frontend  https://kubernetes.default/version           BLOCKED
== stage 3: DNS + frontend->api allowed
  frontend  http://api.kestrel/healthz                   REACHABLE (HTTP 200)
  batch     http://api.kestrel/healthz                   BLOCKED
  frontend  https://kubernetes.default/version           BLOCKED
```

Pod Security (psa_output.txt, abridged):

```output
$ kubectl label --dry-run=server --overwrite ns legacy
    pod-security.kubernetes.io/enforce=restricted
Warning: existing pods in namespace "legacy" violate the new PodSecurity
  enforce level "restricted:latest"
Warning: old-web: allowPrivilegeEscalation != false, unrestricted
  capabilities, runAsNonRoot != true, seccompProfile
$ kubectl apply --dry-run=server -f psa/privileged-pod.yaml
Error from server (Forbidden): ... violates PodSecurity "restricted:v1.34":
  privileged (container "c" must not set securityContext.privileged=true),
  allowPrivilegeEscalation != false (...), unrestricted capabilities
  (...), restricted volume types (volume "host" uses restricted volume
  type "hostPath"), runAsNonRoot != true (...), seccompProfile (...)
```

**Detection:** the hardened cluster (audit enabled) received seven labelled actions from k8s/m05_activity.sh - A1 a routine rollout restart by ci-deployer, then A2 exec into frontend, A3 legacy-ops listing kube-system secrets, A4 reporting trying to list secrets, A5 a privileged pod, A6 a RoleBinding granting admin to reporting and A7 a token request.

```output
$ python audit_detect.py ../hardened/audit-logs/audit.log
585 audit records read; 6 alerts
21:57:45 HIGH   AD1 interactive access       system:admin
         exec into kestrel/frontend command=id
21:57:46 HIGH   AD2 secret read by SA        system:serviceaccount:kestrel:
         legacy-ops (via system:admin)
         list secrets in kube-system -> HTTP 200
21:57:46 MEDIUM AD2 secret read by SA        system:serviceaccount:kestrel:
         reporting (via system:admin)
         list secrets in kestrel -> HTTP 403
21:57:46 MEDIUM AD4 admission denial         system:admin
         create pods kestrel/t-privileged denied (PodSecurity)
21:57:46 HIGH   AD3 powerful binding         system:admin
         rolebinding kestrel/reporting-admin grants admin to ['reporting']
21:57:46 MEDIUM AD5 token request            system:admin
         token requested for kestrel/legacy-ops
```

**Interpretation:**

- Default deny blocked everything, including DNS and the API server; the two allow policies restored exactly one flow. batch, in the same namespace with the same image, stayed blocked: segmentation is by label, not by namespace.
- The Pod Security dry run is an impact report; the enforce result lists every failed control, which makes fixing templates quick.
- Six alerts from seven actions: the routine A1 produced none (a true negative). Each alert names the real actor and, where impersonation was used, the administrator behind it.
- A first version of the detector produced seven alerts because A4 also matched AD6; it now stops at the first matching rule.

**Limitations:** impersonation stood in for real service account activity so that all events could be generated safely by the lab administrator; real detections must also handle tokens used from inside pods, service account user agents, and high event volumes. The audit timestamps are UTC.
