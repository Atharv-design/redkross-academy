**Trigger:** the Module 5 detections for old-integration (no-MFA login, key for another user, public bucket policy, StopLogging, AccessDenied burst).

| Term | Meaning |
|---|---|
| 0-10 min | Declare incident; open case CASE-C11-0001; assemble IR lead, cloud engineer, comms; assume the IR role via break-glass. |
| 10-20 min | Contain identity: deactivate old-integration's keys; deny older sessions; deactivate the key created for ci-bot; reset console access. |
| 20-30 min | Restore visibility and exposure controls: StartLogging on the trail; re-apply Block Public Access to tl-customer-exports; check other trails and regions. |
| 30-45 min | Scope: CloudTrail for every action by both identities since first appearance of 203.0.113.77; S3 data events for the bucket during exposure; any new roles, policies or instances. |
| 45-60 min | Preserve: export logs to the forensic account with hashes; snapshot and quarantine any instances touched; tag resources. |
| Next | Eradicate persistence, rotate secrets, notify (legal), plan recovery, schedule the lessons-learned review. |
