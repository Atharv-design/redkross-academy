- VMs: take a snapshot (including memory if the hypervisor supports it) or copy the virtual disk files while the VM is suspended. Record the hypervisor and host. Hash the disk files.
- Cloud instances: use provider snapshot features for volumes, for example an EBS snapshot in AWS or managed disk snapshots in Azure (Course 11). Copy them to a forensic account with restricted access. Record API calls, requester, region and timestamps, because the cloud audit log becomes part of the custody record.
- SaaS: export audit logs and content through the provider's eDiscovery or export tools. Hash the exports. Retention is often short, so collect early.
- Containers: capture images (docker save), container file system diffs and logs before the container is removed, since ephemeral data disappears on restart.

Cloud acquisition depends on provider tooling and permissions. Prepare IAM roles and procedures before an incident (Module 7).
