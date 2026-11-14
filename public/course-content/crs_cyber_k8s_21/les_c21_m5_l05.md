The API audit log records who did what through the API. An audit policy is a list of rules; the first matching rule sets the level of an event [R3]. Levels: None, Metadata (user, time, resource, verb - no bodies), Request (adds the request body) and RequestResponse (adds the response body). Stages: RequestReceived, ResponseStarted (long-running requests), ResponseComplete and Panic.

The lab policy (hardened/audit-policy.yaml), in order:

1. secrets, configmaps and token requests at Metadata - never record values;
2. pods/exec, attach and port-forward at Request - who, which pod, which command;
3. writes to RBAC and admission configuration at Request;
4. writes to pods, services, namespaces, apps and networking at Request;
5. drop high-volume noise (events, leases, endpoints) and all remaining reads;
6. everything else at Metadata.

**Rule order matters:** if rule 5 came first, secret reads would never be logged.

Detections (k8s/audit_detect.py) use the "actor": the impersonated user if impersonation was used, otherwise the authenticated user:

```text
AD1 interactive access (pods/exec, attach, port-forward);
AD2 secret reads by non-system service accounts (HIGH if allowed,
    MEDIUM if denied);
AD3 bindings that grant cluster-admin, admin or edit;
AD4 admission denials of pods or deployments (PodSecurity or policy);
AD5 token requests by non-system users;
AD6 other authorisation denials for service accounts.
```

Two lessons came from real data. First, current kubectl recorded exec as verb "get" with response code 101 (a WebSocket upgrade), not "create", because kubectl's streaming moved from SPDY to WebSockets under KEP-4006 [R5]; a rule written for verb create on pods/exec would have missed it, so AD1 matches the subresource whatever the verb. Second, exec produces two records (ResponseStarted and ResponseComplete) with the same auditID; the detector de-duplicates on auditID.
