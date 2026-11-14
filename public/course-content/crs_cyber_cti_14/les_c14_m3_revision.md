## Revision

### Summary

DNS (A, AAAA, CNAME, NS, MX, TXT) and registration data (RDAP; creation date is key) describe domains; lookalikes include typosquats, combosquats and homographs. Passive DNS records sensor observations with first/last seen and counts - context, not ground truth. IP context (hosting, CDN, shared hosting, residential, sinkholes) decides whether an address can be blocked; example.com resolved to CDN addresses in the lab. Certificate transparency logs reveal new certificates; a shared certificate fingerprint is a strong pivot, free CAs are not. Pivot with edge weights, fan-out limits, time windows and recorded evidence: the lab's naive pivot found 10 domains (4 innocent), the disciplined one 6. Act proportionately: block specific indicators with expiry, monitor shared infrastructure, report abuse, share with evidence. SUNBURST encoded victim data in DNS subdomains and used CNAME responses to hand victims to C2.

### Important concepts

lookalike domains; passive DNS limits; shared infrastructure; edge strength; fan-out.

### Key technical takeaways

check fan-out before blocking; prefer certificates and registrant links over registrar or CA; record edges.

### Glossary

```text
CDN   Content delivery network.
CT    Certificate transparency.
pDNS  Passive DNS.
Pivot Following a shared attribute to related indicators.
RDAP  Registration Data Access Protocol.
```

### Common mistakes

blocking CDN or shared addresses; pivoting on redacted fields; trusting first_seen as registration; huge clusters on weak edges.

### Revision questions

​1. Rank five pivot attributes by strength. 2. Explain what passive DNS cannot show. 3. Describe the address-blocking decision path.

### Further reading

[R2]; [R3].

## References

- [R1] IANA. "Example Domains". URL: [https://www.iana.org/help/example-domains](https://www.iana.org/help/example-domains) Accessed: 2026-11-07. Supports: example.com reserved for documentation.
- [R2] Laurie, B., Langley, A., Kasper, E. RFC 6962 "Certificate Transparency", June 2013. URL: [https://www.rfc-editor.org/rfc/rfc6962](https://www.rfc-editor.org/rfc/rfc6962) Accessed: 2026-11-07. Supports: public append-only certificate logs.
- [R3] FireEye / Mandiant (Google Cloud). "Highly Evasive Attacker Leverages SolarWinds Supply Chain to Compromise Multiple Global Victims With SUNBURST Backdoor", 13 December 2020 (updated May 2022). URL: [https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor](https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor) Accessed: 2026-11-07 (verified in Course 20). Supports: CS1.
- [R4] RFC 7482 / RFC 9082 "Registration Data Access Protocol (RDAP) Query Format". URL: [https://www.rfc-editor.org/rfc/rfc9082](https://www.rfc-editor.org/rfc/rfc9082) Accessed: 2026-11-07. Supports: RDAP as the registration query protocol.
- [R5] Lab evidence. infra_pivot.py, live_context.py, m03_pivot_output.txt, m03_live_output.txt, data/pdns.jsonl, certs.json, whois.json, 2026-11-07.
