Every request - from kubectl, a controller, a kubelet or a pod - passes through the same stages:

1. Transport: TLS. The API server presents a certificate; clients verify it with the cluster CA.
2. Authentication: who is this? Client certificates, bearer tokens (service account tokens, Module 4), OIDC tokens from an identity provider, or webhook authenticators. If none succeeds and anonymous authentication is enabled, the request continues as user system:anonymous in group system:unauthenticated; the upstream kube-apiserver default for --anonymous-auth is true [R4].
3. Authorisation: may this identity perform this verb on this resource? Usually the Node authoriser (for kubelets) plus RBAC (Module 4).
4. Admission: mutating admission (defaults, injected sidecars) then validating admission (Pod Security, ValidatingAdmissionPolicy, webhooks). Admission can reject a request that RBAC allowed.
5. Validation and persistence: schema validation, then write to etcd.
6. Watchers are notified: controllers, schedulers and kubelets act.

In the lab, an unauthenticated request to the k3s API returned HTTP 401 "Unauthorized" (m03_explore_output.txt). A 401 means the request was rejected at authentication; a cluster with anonymous authentication enabled would instead pass it on as system:anonymous and return 403 if authorisation refused it. The difference matters, because any RBAC rule granted to system:anonymous or system:unauthenticated is then usable by the whole network that can reach the API server.

The API is plain REST over HTTPS, discoverable and uniform: the lab cluster served 36 namespaced and 33 cluster-scoped resource types, and the health endpoint /readyz?verbose listed its internal checks. Uniformity helps defenders (one audit log, one authorisation model) and attackers alike, so the API endpoint should not be exposed more widely than needed.
