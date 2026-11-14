On Windows, identity telemetry comes mainly from the Security event log on domain controllers (and on member hosts for local logons). Key event IDs every defender should know:

| Term | Meaning |
|---|---|
| 4624 | an account was successfully logged on (with a logon type) |
| 4625 | an account failed to log on |
| 4768 | a Kerberos TGT was requested (AS) |
| 4769 | a Kerberos service ticket was requested (TGS) - the event that shows Kerberoasting activity and the encryption type |
| 4771 | Kerberos pre-authentication failed |
| 4672 | special privileges assigned to a new logon (admin logons) |
| 4720/4722/4728/4732/4756 | account and group changes (created, enabled, added to global/local/universal privileged groups) |
| 4740 | an account was locked out |

**Logon types matter:** type 2 is interactive, type 3 network, type 10 remote-interactive (RDP). A type 10 logon by a Tier 0 account to a Tier 2 host is a tier violation worth alerting on (Module 4).
