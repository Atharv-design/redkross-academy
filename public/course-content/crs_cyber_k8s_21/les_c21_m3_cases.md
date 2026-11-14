## API server proxy escalation, CVE-2018-1002105 Context: Kubernetes issue 71411 (26 November 2018) disclosed CVE-2018-1002105, scored CVSS 3.0 9.8, in the API server's proxy request handling [C21-M03-R2]. What happened: after an upgraded connection (as used by exec, attach and port-forward, and by calls to aggregated API servers) was established through the API server, an authorised user could send further requests over the same connection directly to the backend, authenticated with the API server's own TLS credentials. Two paths were described: escalating a call to an aggregated API server into any request to that server, and escalating pod exec, attach or port-forward rights into any request to the kubelet API on that node. Affected versions spanned v1.0 to v1.12.2; fixes shipped in v1.10.11, v1.11.5, v1.12.3 and v1.13.0-rc.1. Detection: the issue states there was no simple way to detect use; the unauthorised requests did not appear in API server audit logs and looked like legitimate proxied requests in kubelet or aggregated server logs. Mitigations before upgrade included suspending aggregated API servers, disabling anonymous authentication, and removing exec, attach and port-forward permissions from users who should not have full kubelet access. Lessons: the API server is the trust anchor, so patch it promptly; least privilege for pods/exec limits damage from flaws you do not yet know about (Module 4); audit logs have blind spots, so prevention cannot rely on detection alone.



## (FICTIONAL TEACHING SCENARIO): The backup that held every secret

**Context:** Kestrel Pay's (fictional) self-managed cluster took nightly etcd snapshots to an object storage bucket for disaster recovery. Encryption at rest had never been enabled because "the disks are encrypted".

**What happened:** a review found that the snapshot bucket was readable by a broad analytics role. Every secret - database passwords, payment-provider keys, the registry credentials - was recoverable from any snapshot.

**Response:** bucket access was restricted to the backup role; API server encryption at rest with a KMS provider was enabled and all secrets were rewritten; every secret in historical snapshots was treated as exposed and rotated; snapshot retention was shortened.

**Lessons:** disk encryption protects against stolen disks, not against whoever can read the data through the system. Treat etcd backups as secret stores, and remember that enabling encryption does not encrypt data already written.
