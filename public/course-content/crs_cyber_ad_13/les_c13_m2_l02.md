Two kinds of ticket matter:

| Term | Meaning |
|---|---|
| TGT | issued by the AS at logon; proves "the KDC has already authenticated this user"; ENCRYPTED WITH THE krbtgt ACCOUNT'S KEY so only the KDC can read it; cached by the client and reused for hours |
| service ticket | issued by the TGS for one service (named by a Service Principal Name, SPN); ENCRYPTED WITH THAT SERVICE ACCOUNT'S KEY so the service can decrypt and trust it |

**The flow at logon:**

1. AS-REQ/AS-REP: the client proves it knows the user's key (pre-auth) and receives a TGT plus a session key.
2. TGS-REQ/TGS-REP: to reach a service, the client presents the TGT and the service's SPN, and receives a service ticket.
3. AP-REQ: the client presents the service ticket to the service, which decrypts it with its own key and reads the user's identity and groups.

Two security consequences follow directly. First, whoever knows the krbtgt key can forge any TGT (a "golden ticket", Module 5) - so krbtgt is the crown jewel. Second, anyone with a valid TGT can request a service ticket for any SPN and take it away to crack offline, because it is encrypted with the service account's key (Kerberoasting, Module 5) - so service-account passwords must be long and random.
