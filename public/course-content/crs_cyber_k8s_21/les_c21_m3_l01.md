**Control plane components:**

```text
kube-apiserver           the only component that talks to the
                         datastore; serves the REST API
etcd                     consistent key-value store for all cluster state
kube-scheduler           assigns pods to nodes
kube-controller-manager  runs controllers (Deployment, ReplicaSet, Job,
                         namespace, service account, garbage collector)
cloud-controller-manager integrates with a cloud provider (load
                         balancers, node lifecycle), where used
```

**Node components:**

| Term | Meaning |
|---|---|
| kubelet | starts and monitors the pods assigned to its node through the container runtime |
| container runtime | containerd or CRI-O, then runc (Module 1) |
| kube-proxy or a CNI data plane | implements Services |

**Add-ons:** cluster DNS (CoreDNS), the CNI network plugin (which also implements NetworkPolicy, Module 5), storage provisioners, ingress controllers and monitoring.

Distributions package these differently. In the lab k3s cluster, "kubectl get pods -n kube-system" listed only coredns and local-path-provisioner: the API server, scheduler and controller manager run inside the single k3s server process, and the datastore was a SQLite database (state.db) through k3s's etcd-compatible layer, although an etcd directory also existed. The security functions are the same; where they live, and therefore how you inspect, patch and protect them, differs.
