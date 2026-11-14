The lab's capstone/evidence.py implements ten controls, each with a test that observes behaviour wherever possible:

```text
C01 API rejects anonymous requests   unauthenticated GET -> expect 401
C02 secrets encrypted at rest        node reports encryption enabled
                                     (Module 3 P2 adds the datastore
                                     canary test)
C03 API audit logging enabled        API server started with policy and
                                     log path
C04 cluster-wide Pod Security        privileged pod dry-run in a new,
    default                          unlabelled namespace -> expect deny
C05 workload namespaces enforce      every non-system namespace labelled
    restricted                       enforce=restricted
C06 default-deny NetworkPolicy       in every namespace that has pods
C07 no open cluster-wide RBAC risk   rbac_review.py exit code 0
C08 admission policies bound         image and digest policies bound
C09 live workloads pass policy       rk_policy DENY rules on live
                                     Deployments and standalone Pods
C10 first-party images by digest     running kestrel-api pods use @sha256
```

Note the design choices. C04 tests the default by trying to admit a privileged pod (server-side dry run, nothing is created), because a flag can be present yet ineffective. C09 evaluates live objects, not Git, because Module 6 showed they can differ. C02 and C03 read node state through "docker exec" and "docker inspect", which only works in this lab design; on another platform replace them with that platform's evidence (provider settings, API server flags, a canary secret test).
