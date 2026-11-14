Each organisation defines its own declaration criteria. Typical examples: confirmed malicious code execution, unauthorised privileged access, data exfiltration, ransomware indicators, or any event matching a CERT-In reportable type. Severity levels (for example SEV1-SEV4) set who is paged and how fast. A good escalation answers six questions in a fixed order, so a busy reader gets what they need:

```text
WHAT       one sentence on what is happening
SO WHAT    impact and risk now
EVIDENCE   key facts with times (UTC) and sources
CONFIDENCE what is confirmed and what is hypothesis
DONE       actions already taken
NEED       decisions or help requested, with deadline
```

Example for the course dataset:

```text
WHAT: Likely compromise of finance workstation WS-104 (user divya) via a
malicious document, with persistence and possible data exfiltration.
SO WHAT: A payments approver's device is affected. A 48.2 MB upload to an
external file-sharing look-alike may include personal or financial data.
The Security log was cleared at 08:17Z.
EVIDENCE: invoice.docm downloaded 06:12Z from banyan-payroll-update.example;
Word spawned hidden encoded PowerShell 06:14Z; 220-byte beacon every 5 min
06:17-07:42Z to cdn-telemetry-sync.example (ISAC TLP:AMBER C2 match);
local admin svc_update created 07:02-07:03Z; upload 08:12Z; log cleared
08:17Z.
CONFIDENCE: High that WS-104 is compromised. The link to the VPN spray and
gopal's 06:46Z login from 203.0.113.66 is a hypothesis, supported by
timing only.
DONE: Evidence exported and hashed (CASE-0001). No containment yet.
NEED: Approval to isolate WS-104 and reset divya's and gopal's
credentials. Legal to assess CERT-In reporting (6-hour clock) and DPDP
implications. Decision within 30 minutes.
```
