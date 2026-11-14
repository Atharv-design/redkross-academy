Write the intended flow matrix (source, destination, port, protocol, purpose, owner) and default-deny everything else. Then test it - designs drift. Execution-tested Docker lab (LAB_ASSETS/C22/segmentation_lab.sh): tl-web and tl-app on network tl-front; tl-app and tl-db on internal network tl-data:

```text
------------------------------------------------------------- BEGIN OUTPUT
== connectivity matrix
  tl-web  -> tl-app  :8080  app-ok
  tl-app  -> tl-db   :5432  db-ok
  tl-web  -> tl-db   :5432  nc: bad address 'tl-db'
  tl-web  -> 172.27.0.2 :5432  NO CONNECTION
== routes inside tl-db (internal network)
  172.27.0.0/16 dev eth0 scope link  src 172.27.0.2
== egress attempt from tl-db to 1.1.1.1:443
  blocked (no route)
== cleanup done
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, Docker 29.4.2, alpine:3.20)
```

**Reading it:**

- Allowed flows worked (web->app, app->db).
- web could not resolve the database name (Docker DNS is per network) and, more importantly, could not connect to its IP address directly - name resolution failure alone is not isolation, so the lab tests both.
- The data network was created with --internal: the database had only a link-local route and no default gateway, so egress to the internet was impossible - a strong control against data exfiltration from the data tier.

Real environments implement the same intent with cloud security groups and NACLs (Course 11 M03), Kubernetes NetworkPolicies (Course 21), host firewalls, or micro-segmentation platforms; the verification step - an automated connectivity test - should run after every change.
