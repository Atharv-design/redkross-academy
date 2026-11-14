Kerberos (RFC 4120) solves a hard problem: how to prove who you are to many services without sending your password to any of them [R1]. It uses a trusted third party, the Key Distribution Centre (KDC), which on a domain controller has two logical parts:

| Term | Meaning |
|---|---|
| AS | Authentication Service: proves the user's identity and issues a ticket-granting ticket (TGT) |
| TGS | Ticket-Granting Service: takes a valid TGT and issues service tickets for specific services |

The three parties are the client, the KDC and the target service. The design goal is that the user's long-term secret (derived from their password) is used only at the very start, and that each service receives a ticket it can check on its own, without calling back to the KDC. Kerberos also assumes clocks are roughly synchronised: tickets carry timestamps, and skew beyond the allowed window (five minutes by default) causes authentication to fail - which is why the PDC emulator is the domain time source (Module 1).
