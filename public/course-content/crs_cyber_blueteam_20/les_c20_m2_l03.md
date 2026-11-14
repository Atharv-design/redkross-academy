Identity events tell you who did what, from where. Key Windows events:

| Term | Meaning |
|---|---|
| 4624 | successful logon     4625  failed logon |
| 4672 | special privileges assigned to new logon |
| 4698 | scheduled task created (Object Access auditing) |

Logon types in 4624 include 2 Interactive, 3 Network, 4 Batch, 5 Service, 7 Unlock, 10 RemoteInteractive (Remote Desktop) and 11 CachedInteractive [R4]. Microsoft notes that network logons with Kerberos may have no workstation information, and NTLM logons no TCP/IP details, so the absence of a field is not suspicious in itself [R4]. Useful identity patterns include:

- a service account logging on interactively (type 2 or 10);
- a burst of 4625 failures followed by a 4624 success from the same source (T1110);
- a workstation authenticating to servers it has never contacted before.

In cloud estates, the identity provider's sign-in and audit logs play the same role (Course 11).
