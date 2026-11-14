## The Kerberos three-party flow

![A sequence between client, KDC and service showing AS-REQ/REP yielding a TGT, TGS-REQ/REP yielding a service ticket, and AP-REQ presenting it to the service.](/assets/courses/cyber-13/C13-M02-F1.svg)
*Figure C13-M02-F1. The TGT is encrypted with the krbtgt key; each service ticket with that service's key. The password is used only at step 1.*

## Which key protects which ticket

![Two mappings showing the TGT protected by the krbtgt key and service tickets by service-account keys, with the two attack consequences named.](/assets/courses/cyber-13/C13-M02-F2.svg)
*Figure C13-M02-F2. The encryption keys explain why krbtgt and service-account secrets are so sensitive.*

## LDAP bind choices

![Three LDAP bind options ranked from a cleartext simple bind to protect, through a TLS-protected simple bind, to the preferred GSSAPI bind that uses a Kerberos ticket.](/assets/courses/cyber-13/C13-M02-F3.svg)
*Figure C13-M02-F3. Prefer SASL/GSSAPI; never send a simple bind without TLS.*
