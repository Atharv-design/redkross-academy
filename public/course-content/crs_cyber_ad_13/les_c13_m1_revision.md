## Revision

### Summary

Active Directory is a replicated directory service built on LDAP (reads), Kerberos (authentication) and DNS (locating DCs). Objects are named by distinguished names and identified by GUIDs and SIDs. Domains group into trees and trees into a forest; the forest - sharing schema, configuration, global catalogue and automatic transitive trusts - is the security boundary, so true isolation needs a separate forest. The schema is forest-wide and hard to reverse. Domain controllers mostly work multi-master, except the five FSMO roles; RODCs hold read-only copies and cache no passwords by default. DNS is essential: clients find DCs through SRV records, and the lab showed Group Policy tooling failing until the resolver pointed at the domain's DNS. The lab DC described itself through samba-tool domain info.

### Important concepts

directory service; DN, GUID, SID; domain/tree/forest; schema and partitions; global catalogue; FSMO; RODC; SRV records.

### Key technical takeaways

build and verify a DC with its own tools; always suspect DNS first; draw isolation and recovery at the forest.

### Glossary

| Term | Meaning |
|---|---|
| DC | Domain controller (a server holding a directory copy). |
| FSMO | Flexible single master operation (five special DC roles). |
| GC | Global catalogue (forest-wide partial copy for searches). |
| RODC | Read-only domain controller. |
| SID | Security identifier used in access checks. |

### Common mistakes

treating a domain as an isolation boundary; ignoring DNS; putting a writable DC in an insecure location; confusing "DC" the domain component with "DC" the domain controller.

### Revision questions

​1. Why is the forest the security boundary? 2. Name the five FSMO roles. 3. How does a client find a DC, and what breaks if DNS is wrong?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] Sermersheim, J. (ed.). "Lightweight Directory Access Protocol (LDAP): The Protocol", RFC 4511, IETF, June 2006. URL: [https://www.rfc-editor.org/rfc/rfc4511](https://www.rfc-editor.org/rfc/rfc4511) Accessed: 2026-11-08. Supports: LDAP as the directory read/search protocol, ports.
- [R2] Microsoft. "Privileged access: Enterprise access model". URL: [https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model) Accessed: 2026-11-08. Supports: the forest as the boundary; isolation and the evolution from the AD tier model (Module 4).
- [R3] Microsoft. "What is Active Directory Domain Services?" (AD DS overview). URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) Accessed: 2026-11-08. Supports: directory service, domains, DCs, schema.
- [R4] Lab evidence. LAB_ASSETS/C13/dc (Samba 4.22.11), samba-tool domain info and SRV output, 2026-11-08.
