1. AWS: organisation trail (management events, all regions) plus data events for restricted buckets; delivered to the log-archive account with Object Lock and KMS; CloudTrail Lake or SIEM ingestion.
2. Azure: Azure Policy deploys diagnostic settings for Activity and resource logs to a central workspace; Entra sign-in/audit logs and Purview Audit (with SearchQueryInitiated enabled) to the SIEM.
3. Network: VPC and VNet flow logs, firewall and DNS logs centralised.
4. Protection: SCP denying StopLogging/DeleteTrail; separate log-archive administrators; retention 365 days hot/warm, longer in archive.
5. Detections: the five lab rules plus root use, admin-port exposure, key deletion, new Entra app credentials, Entra role assignment and unapproved region use; each with runbook and test data.
6. Native services: GuardDuty and Defender for Cloud enabled organisation-wide; findings into the SIEM.
7. Assurance: monthly test events for each rule; log-source heartbeat alerts.
