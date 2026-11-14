The kubelet runs on every node with high privilege. It exposes an HTTPS API (port 10250 by default) used by the API server for logs, exec, attach and port-forward, and by monitoring. If that API accepts anonymous requests or skips authorisation, anyone who can reach the port can run commands in containers on that node; the Hildegard campaign used exactly this weakness (Module 5, CS1). Protections:

- kubelet authentication: anonymous disabled; webhook token authentication and client certificates;
- kubelet authorisation mode Webhook, so the API server's RBAC decides;
- network restrictions so only the control plane reaches 10250;
- the Node authoriser and NodeRestriction admission plugin, which limit each kubelet to the objects for pods on its own node.

Nodes are a trust boundary: a compromised node exposes every pod, secret and token on it. Separate sensitive workloads onto dedicated node pools with taints and tolerations when the risk justifies it.
