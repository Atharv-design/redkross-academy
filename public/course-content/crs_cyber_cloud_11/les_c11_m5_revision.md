## Revision

### Summary

Cloud logs fall into control-plane (CloudTrail, Azure Activity log), identity (Entra sign-in and audit, ConsoleLogin), data-plane (data events, access and diagnostic logs, Microsoft 365 audit), network and workload families. CloudTrail event history covers 90 days of management events and Azure Activity log 90 days, so trails and diagnostic settings must deliver logs to protected central storage with adequate retention. CloudTrail records identify who, what, when, from where and the outcome. High-value detections cover root and no-MFA logins, logging changes, identity and exposure changes, key deletion, AccessDenied bursts and new locations; the lab found four single-event detections and a burst from one identity in eleven minutes. Native detection services complement custom rules. Some logs must be switched on - data events, access logs, flow logs and Purview SearchQueryInitiated. The Storm-0558 case shows how log availability decided detection and led to wider log access.

### Important concepts

log families; protected central logging; correlation.

### Key technical takeaways

CloudTrail fields; detection-as-code with test records; SCP-protected trails.

### Glossary

| Term | Meaning |
|---|---|
| CloudTrail | AWS API activity logging. |
| Data event | CloudTrail object/data-level record. |
| Diagnostic setting | Azure export configuration for logs. |
| MailItemsAccessed | Microsoft 365 mailbox access audit event. |
| Organisation trail | CloudTrail trail for all accounts. |

### Common mistakes

single-region trails; no data events anywhere; logs deletable by account admins; detections never tested.

### Revision questions

​1. Which logs answer "who read the file?" 2. Name five events to alert on. 3. How do you protect a trail?

### Further reading

CloudTrail event history [R1]; Azure Activity log [R2]; CISA playbook [R3].

## References

- [R1] AWS. "Working with CloudTrail event history". URL: [https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html) Accessed: 2026-11-07. Supports: 90 days of management events; trails or event data stores for ongoing records.
- [R2] Microsoft. "Azure Monitor activity log". URL: [https://learn.microsoft.com/en-us/azure/azure-monitor/platform/activity-log](https://learn.microsoft.com/en-us/azure/azure-monitor/platform/activity-log) Accessed: 2026-11-07. Supports: control plane; 90 days; diagnostic settings destinations.
- [R3] CISA. "Microsoft Expanded Cloud Logs Implementation Playbook" (v1.0 January 2025; v1.1 May 2026). URL: [https://www.cisa.gov/resources-tools/resources/microsoft-expanded-cloud-logs-implementation-playbook](https://www.cisa.gov/resources-tools/resources/microsoft-expanded-cloud-logs-implementation-playbook) Accessed: 2026-11-07 and 2026-11-08 (PDF text extracted). Supports: 15 June 2023 State SOC detection using Premium logs; key invalidated 24 June 2023; MailItemsAccessed; E3/G3 expansion; SearchQueryInitiated disabled by default.
- [R4] Lab evidence. cloudtrail_lab.py and cloudtrail_lab_output.txt (CPython 3.14.4), 2026-11-07.
