## Cluster components and trust

![A control-plane box containing the API server, etcd, scheduler and controller manager sits above two node boxes, each with kubelet, container runtime and network components; arrows show watches from nodes and calls from the API server to kubelets.](/assets/courses/cyber-21/C21-M03-F1.svg)
*Figure C21-M03-F1. The API server is the hub; etcd holds all state; kubelets act on nodes and expose their own API.*

## The request path

![A chain from request through TLS, authentication, authorisation and admission to validation and an etcd write, with notes on 401 and 403 outcomes and a return arrow to watchers.](/assets/courses/cyber-21/C21-M03-F2.svg)
*Figure C21-M03-F2. Every API request passes the same stages; each stage is a control point.*

## Desired state and reconciliation

![A Deployment owns a ReplicaSet that owns two pods; deleting one triggers creation of a replacement; a note says manual pod edits are reverted.](/assets/courses/cyber-21/C21-M03-F3.svg)
*Figure C21-M03-F3. Controllers continually restore the declared state; changes must be made at the right level.*
