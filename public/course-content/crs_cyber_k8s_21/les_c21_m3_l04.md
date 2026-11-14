Core objects you will secure:

| Term | Meaning |
|---|---|
| Namespace | a scope for names, RBAC, quotas, Pod Security labels and NetworkPolicy |
| Pod | one or more containers sharing a network namespace and volumes; the unit of scheduling |
| ReplicaSet | keeps N identical pods running |
| Deployment | manages ReplicaSets for rolling updates |
| StatefulSet | pods with stable identity and storage |
| DaemonSet | one pod per node (agents - often privileged) |
| Job / CronJob | run-to-completion and scheduled work |
| Service | stable virtual address for a set of pods |
| ConfigMap / Secret | configuration and sensitive data for pods |
| ServiceAccount | the identity pods use to call the API (Module 4) |

Objects declare desired state (spec); controllers report observed state (status) and act to close the gap. In the lab, a pod of the api Deployment was owned by ReplicaSet api-89dcf95d6, which was owned by Deployment api. Deleting the pod produced a replacement within seconds - reconciliation at work.

Security consequences of the declarative model:

- Fixing a pod by hand does not last; the owner recreates it from its template. Fix the template (and the Git source, Module 6).
- Anyone who can create or modify a workload template can run any container, with any service account, in that namespace (Module 4).
- DaemonSets and workloads in kube-system often need elevated privileges; they deserve separate review and ownership.
