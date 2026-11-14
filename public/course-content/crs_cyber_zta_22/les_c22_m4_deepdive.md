Tamarind shipment platform flow matrix (excerpt):

```text
id   source          destination      port/proto  purpose          owner
F1   internet        WAF/API GW       443/tcp     customer API     platform
F2   API GW          shipment-api     8443/tcp    mTLS requests    platform
F3   shipment-api    customer-db      5432/tcp    data access      data team
F4   shipment-api    courier API      443/tcp     dispatch (egress via proxy)  integration
F5   ZTNA connector  ops-console      443/tcp     staff admin      platform
F6   CI/CD runners   registry, k8s API 443/tcp    deployments      platform
deny all other flows; data tier internal-only; log denies.
```

Test harness design (the lab is a minimal version):

- for each allowed flow, assert connection succeeds;
- for selected denied flows (web->db, user subnet->db, db->internet), assert failure at both name and IP level;
- run in CI against staging after every network or policy change; store results as evidence (Course 17 M06);
- alert on drift (new open ports, new routes).

**Limitations of the lab:** Docker bridge networks, not cloud controls; no identity-based policy; TCP probes only.
