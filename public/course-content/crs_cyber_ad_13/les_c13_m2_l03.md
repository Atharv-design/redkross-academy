Kerberos tickets and keys use an "encryption type" (etype). In order of strength:

```text
AES256/AES128 (aes256-cts-hmac-sha1-96, aes128-...)  modern, preferred
RC4 (arcfour-hmac)                                    legacy, weak
DES (des-cbc-*)                                       obsolete, broken
```

Why this matters for defence:

- RC4 service tickets are far easier to crack offline than AES, so attackers often try to DOWNGRADE a request to RC4 (Kerberoasting is far more effective against RC4). Disabling RC4 where possible is a direct control.
- DES is obsolete and must be disabled.
- The Protected Users group forces AES-only Kerberos and blocks RC4 and DES for its members (Module 4) [R3].

In the lab, every observed Kerberos authentication used aes256-cts-hmac-sha1-96 - the healthy case - which the monitoring tool confirms rather than assumes (deep dive, Module 6).
