Defensive telemetry is the data that makes endpoint and identity abuse visible:

| Term | Meaning |
|---|---|
| authentication logs | logons (type, source, time, account) - the primary identity telemetry; anomalies flag Valid Accounts abuse. |
| directory/process | account/group enumeration and process activity - flags Account Discovery. |
| endpoint (EDR) | process, token and credential-access events on the host. |

The detection turns telemetry into an alert: an anomalous logon for a service account (new source, odd hour), a burst of directory queries from a workstation, a logon using non-interactive auth material with no matching interactive logon. Each emulated technique should map to a data source and a concrete detection - the engagement's job is to confirm whether that detection exists. The lab's attackmap.py produces exactly this map for the endpoint/identity steps.
