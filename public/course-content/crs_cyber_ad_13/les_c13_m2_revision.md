## Revision

### Summary

Kerberos authenticates through a trusted KDC: the AS issues a TGT (encrypted with the krbtgt key) at logon, and the TGS issues service tickets (each encrypted with the relevant service account's key) for named SPNs. The password is used only at the start; clocks must be synchronised. Encryption types matter: AES is preferred, RC4 is weak and a downgrade target, DES is obsolete. LDAP reads the directory; prefer SASL/GSSAPI, or at least LDAPS, over a cleartext simple bind. NTLM persists for IP-based and legacy access but is weaker (relay, pass-the-hash, poor telemetry). In the lab a real TGT for asha was issued, used to bind over GSSAPI as SAHYADRI\asha with no password, and recorded as eventId 4624 with passwordType aes256-cts-hmac-sha1-96. The krbtgt and service-account keys explain why golden tickets and Kerberoasting are possible (Module 5).

### Important concepts

KDC, AS, TGS; TGT and service tickets; which key encrypts which ticket; encryption types; LDAP bind and search; NTLM.

### Key technical takeaways

protect krbtgt and service-account secrets; prefer AES and GSSAPI; read the encryption type from telemetry.

### Glossary

| Term | Meaning |
|---|---|
| AP-REQ | the message presenting a service ticket to a service. |
| KDC | Key Distribution Centre (AS + TGS on a DC). |
| SPN | Service Principal Name identifying a service for Kerberos. |
| TGS | Ticket-Granting Service (issues service tickets). |
| TGT | Ticket-Granting Ticket (issued at logon). |

### Common mistakes

sending simple binds in the clear; leaving RC4 enabled; widening clock skew to mask time problems; assuming encryption type instead of verifying it.

### Revision questions

​1. Which key encrypts the TGT, and which a service ticket? 2. Why is RC4 a downgrade target? 3. Name the preferred LDAP bind and why.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] Neuman, C., Yu, T., Hartman, S., Raeburn, K. "The Kerberos Network Authentication Service (V5)", RFC 4120, IETF, July 2005. URL: [https://www.rfc-editor.org/rfc/rfc4120](https://www.rfc-editor.org/rfc/rfc4120) Accessed: 2026-11-08. Supports: KDC, AS/TGS, TGT and service tickets, timestamps.
- [R2] Sermersheim, J. (ed.). "Lightweight Directory Access Protocol (LDAP): The Protocol", RFC 4511, IETF, June 2006. URL: [https://www.rfc-editor.org/rfc/rfc4511](https://www.rfc-editor.org/rfc/rfc4511) Accessed: 2026-11-08. Supports: bind, search, scopes and filters.
- [R3] Microsoft. "Protected Users security group". URL: [https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group](https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group) Accessed: 2026-11-08. Supports: AES-only Kerberos, blocking NTLM, DES and RC4 for members.
- [R4] Microsoft. "MS14-068: Vulnerability in Kerberos could allow elevation of privilege" (CVE-2014-6324). URL: [https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068) Accessed: 2026-11-08. Supports: CS1, PAC signature validation.
- [R5] Lab evidence. kinit/klist/ldapwhoami output and data/auth_audit.jsonl (Samba 4.22.11), 2026-11-08.
