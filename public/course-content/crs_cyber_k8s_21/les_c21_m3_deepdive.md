LAB_ASSETS/C21/k8s/m03_explore.sh (execution-tested against rancher/k3s:v1.34.1-k3s1 in Docker, API on 127.0.0.1:16443) runs eight read-mostly steps against the lab cluster after k8s/kestrel-app.yaml has been applied. Output (execution-tested, 2026-11-07, abridged):

```output
### 1. Versions and nodes
Client Version: v1.34.1
Server Version: v1.34.1+k3s1
NAME           STATUS   ROLES           AGE   VERSION
17de02d89d53   Ready    control-plane   11m   v1.34.1+k3s1

### 2. The API server is a REST service: health checks (last 6 lines)
[+]poststarthook/apiservice-openapiv3-controller ok
[+]shutdown ok
readyz check passed

### 3. Unauthenticated request to the API server
{ "kind": "Status", ... "message": "Unauthorized", ... "code": 401 }

### 4. Resource types the API serves
namespaced:     36
cluster-scoped: 33

### 5. Where the control plane runs (k3s embeds it in one process)
coredns-7896679cc-wjbwk                   Running
local-path-provisioner-578895bd58-9w792   Running
etcd  state.db  state.db-shm  state.db-wal

### 6. Ownership chain: Pod -> ReplicaSet -> Deployment
pod api-89dcf95d6-gxl4w is owned by ReplicaSet/api-89dcf95d6
Deployment/api

### 7. Reconciliation: delete a pod, the ReplicaSet replaces it
pod "api-89dcf95d6-gxl4w" deleted from kestrel namespace
api-89dcf95d6-2pdfb   true
api-89dcf95d6-vbzcm   true

### 8. Secrets at rest in the datastore (default settings)
cmstbGFiLWF0LXJlc3QtZGVtby12YWx1ZQ==   <- base64 in the API, not encryption
datastore files containing the plaintext value: 1
Encryption Status: Disabled, no configuration file found
```

**Interpretation:**

- Steps 1 and 5 identify the distribution, version, runtime and datastore - the facts you need before reading any hardening guide.
- Step 3 shows anonymous requests rejected at authentication on this distribution's defaults; on another cluster the same test may show 403 or, worse, 200.
- Steps 6 and 7 show the ownership chain and reconciliation.
- Step 8 shows that base64 is only encoding and that the default datastore held the secret in plain text. The datastore check uses "docker exec" into the lab node and is possible only because you own the node; an attacker with node or backup access could do the same.

**Limitations:** the datastore check is specific to k3s's SQLite layout; on an etcd-backed cluster the equivalent test uses etcdctl with the etcd client certificates (Not execution-tested in this course).
