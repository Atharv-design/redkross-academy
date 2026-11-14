The audit log cannot see inside containers. Node-level sensors (eBPF or kernel-module based, for example Falco, or EDR agents with container awareness) watch system calls, process starts, file and network activity and attach Kubernetes context (pod, namespace, image). Signals worth alerting on:

- a shell or package manager started in a container whose image never runs one (distroless images make this unambiguous);
- writes to binary or library paths, changes to /etc/ld.so.preload;
- unexpected outbound connections, especially to mining pools or tunnelling services, and internal scanning (many connection attempts to port 10250 or 2379);
- reads of service account tokens or cloud metadata endpoints by processes that do not normally read them;
- new privileged containers or host mounts (also visible in audit logs).

Node sensors were Not execution-tested in this course; deploy and tune them from the vendor documentation and validate with telemetry replay as in Course 20 Module 7.

Containment options, least to most disruptive: apply a NetworkPolicy that isolates the pod (label it and deny all); scale the workload to zero after capturing evidence; cordon and drain the node; revoke the service account's permissions and rotate secrets it could read. Preserve evidence first (pod spec, logs, a filesystem snapshot or checkpoint where available, node data) following Course 09.
