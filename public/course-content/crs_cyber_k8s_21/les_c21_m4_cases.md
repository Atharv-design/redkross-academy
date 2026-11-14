## Exposed Kubeflow dashboards used for cryptomining, 2020

**Context:** on 10 June 2020 Microsoft reported a campaign, first seen in April, that deployed cryptomining containers on tens of Kubernetes clusters, many running the Kubeflow machine-learning toolkit [R5].

**What happened:** the Kubeflow dashboard is served through the Istio ingress gateway, internal by default. Some users changed the istio-ingressgateway Service to type LoadBalancer for convenience, exposing the dashboard to the internet; Microsoft wrote that this allowed anyone to perform operations in Kubeflow. Attackers deployed an image running the XMRig miner. Microsoft described how a container could be started through the dashboard, including from a notebook using its default service account to create pods in its namespace.

**Response and advice:** check for the malicious image and for public load balancers; require authentication and access control for Kubeflow; keep sensitive interfaces off the internet; monitor running containers; allow only trusted images, with policy to restrict public load balancers and image sources.

**Lessons:** a convenience change to one Service bypassed the access model. The default service account's ability to create pods turned dashboard access into compute. Admission policy (image allowlists, no public load balancers) and least-privilege service accounts address both halves.

## (FICTIONAL TEACHING SCENARIO): The pipeline that was cluster-admin

**Context:** Kestrel Pay's (fictional) deployment pipeline used a static service account token, created years earlier, bound to cluster-admin and stored as a CI variable shared by 40 repositories.

**What happened:** a build log in one repository printed the environment during debugging. The token appeared in a public log for six hours. No misuse was found in the audit log, but the token had cluster-wide rights, no expiry and no binding.

**Response:** the token's Secret was deleted (revoking it); each repository received its own service account with a namespaced Role (like ci-deployer); CI moved to short-lived tokens through workload identity federation; secret masking and a log scanner were enabled; the RBAC review joined the weekly controls.

**Lessons:** long-lived, broad, shared credentials turn a log mistake into a cluster incident. Scope, lifetime and binding each reduce the blast radius.
