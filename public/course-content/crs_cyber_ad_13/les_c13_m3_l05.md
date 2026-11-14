A service account is an identity a program runs as. When a service authenticates clients with Kerberos, it registers a Service Principal Name (SPN) - for example HTTP/app1.ad.sahyadri.example - so clients can request a ticket for it (Module 2). Three governance points:

- An SPN on a NORMAL USER account makes that account Kerberoastable (Module 5): any domain user can request its service ticket and crack it offline. The password must therefore be long and random.
- Managed service accounts and group managed service accounts (gMSAs) solve this properly: the directory generates and rotates a long random password automatically, so no human knows or sets it.
- Service accounts should not be members of privileged groups, should not have interactive logon rights, and should be scoped to what they need.

In the lab you will add an SPN to the "legacy-svc" account deliberately, so that Module 5's review tool can flag it and you can see why a gMSA would be better.
