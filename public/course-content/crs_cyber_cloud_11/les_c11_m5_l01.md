| Term | Meaning |
|---|---|
| AWS CloudTrail | control-plane (management) events by default; data events (for example S3 object-level, Lambda invoke) must be selected. AWS documents that event history shows 90 days of management events; a trail or event data store is needed for ongoing retention [R1]. |
| Azure Activity log | control-plane operations on Azure resources; Microsoft documents a 90-day retention, with diagnostic settings to send it to Log Analytics, Event Hubs or Storage for longer [R2]. |
| Entra ID logs | sign-in logs (interactive, non-interactive, service principal, managed identity) and audit logs (directory changes, app consents). |
| Microsoft 365 audit | user and admin activity in Exchange, SharePoint, Teams (Purview Audit). |
| Data-plane logs | S3 server access logs, CloudTrail data events, Azure Storage diagnostic logs, database audit logs. |
| Network logs | VPC flow logs, NSG/VNet flow logs, firewall and DNS logs (Module 3). |
| Workload logs | OS, application and container logs (Module 7). |

Know which questions each log answers: who changed what (control plane), who signed in from where with which method (identity), who read which data (data plane), which hosts talked (network).
