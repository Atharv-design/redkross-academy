Event 4624 records a successful logon on the machine accessed. Microsoft's documentation lists these logon types [R1]:

```text
0 System; 2 Interactive (local console); 3 Network (e.g. SMB share
access); 4 Batch (scheduled tasks); 5 Service; 7 Unlock; 8
NetworkCleartext; 9 NewCredentials (e.g. runas /netonly); 10
RemoteInteractive (RDP); 11 CachedInteractive; 12
CachedRemoteInteractive; 13 CachedUnlock.
```

**Key fields:** TargetUserName and TargetDomainName; TargetLogonId (to correlate with 4672, 4688 and 4634 events from the same session); LogonType; IpAddress and WorkstationName (the source); AuthenticationPackageName (Kerberos, NTLM or Negotiate); and ElevatedToken (Version 2, Windows 10 and later). Microsoft notes that network logons using Kerberos may lack workstation information, while NTLM logons lack TCP/IP details [R1], so missing fields are normal.

**Patterns:**

- Type 10 from an unusual IP points to RDP use. Correlate with TerminalServices logs.
- Type 3 with NTLM from a workstation to many servers suggests lateral movement candidates (Course 13).
- 4625 bursts across many accounts suggest spraying (Course 08). The failure Status and SubStatus codes give the reason.
- 4672 right after 4624 means the session received privileges.
