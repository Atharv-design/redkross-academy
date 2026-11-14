## Revision

### Summary

Four advanced risks go beyond single-string input flaws. XXE (CWE-611) tricks an XML parser that resolves external entities into reading files, making requests (SSRF) or denial of service; the definitive fix is to disable external entity and DTD processing and prefer JSON. Insecure deserialization (CWE-502, OWASP A08:2025) lets a code-capable deserializer (pickle, Java native serialization, unsafe YAML) run code from attacker-controlled data; the fix is never to deserialize untrusted data with such formats - use JSON, and sign/type-restrict if objects must be exchanged. Business logic flaws abuse a valid workflow or rule (reusable coupon, skipped payment step, client-supplied price); they evade input validation and scanners, and the defence is to enforce every rule, value and state transition on the server - the lab's fix of looking the price up server-side is the archetype. API security applies the same principles over a wider, more exposed surface: enforce object-level authorisation (the API form of IDOR), return and accept only needed fields (prevent excessive exposure and mass assignment), and rate-limit. Every advanced risk reduces to the course's single principle: the client - browser or API consumer - is untrusted, and the server enforces security and business rules from trustworthy state. The hardened lab app embodies this, reporting 0 of 10 weaknesses.

### Important concepts

XXE and parser config; insecure deserialization; business logic flaws and testing; API risks; the untrusted-client principle.

### Key technical takeaways

disable XML external entities; never unpickle untrusted data; enforce business rules server-side; object-level authorisation and field control for APIs; do not trust client business values.

### Glossary

```text
XXE  XML External Entity injection (CWE-611).
deserialization  reconstructing objects from serialized data (unsafe when
        code-capable and untrusted; CWE-502).
business logic flaw  abuse of a valid workflow or rule.
mass assignment  letting a client set fields it should not (e.g. isAdmin).
BOLA  Broken Object Level Authorization; the API form of IDOR.
```

### Common mistakes

parsing untrusted XML with external entities enabled; unpickling untrusted data; enforcing business rules only in the UI; trusting client-supplied ids/fields/prices; over-exposing API data.

### Revision questions

​1. How is XXE prevented? 2. Why is unpickling untrusted data dangerous and what do you use instead? 3. What single principle unifies all these risks?

### Further reading

[R1]; [R3]; [R5].

## References

- [R1] OWASP. "OWASP Top 10:2025" (A05 Injection incl. XXE; A08 Software or Data Integrity Failures; A04 Insecure Design). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: category mappings for the advanced risks.
- [R2] OWASP. "XML External Entity Prevention Cheat Sheet" and MITRE "CWE-611". URL: [https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: XXE and the disable-external-entities fix.
- [R3] OWASP. "Deserialization Cheat Sheet" and MITRE "CWE-502: Deserialization of Untrusted Data". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: insecure deserialization, CS1, safe formats.
- [R4] OWASP. "Business Logic Vulnerability" (testing and prevention). URL: [https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability) Accessed: 2026-11-08. Supports: business logic flaws and testing.
- [R5] OWASP. "OWASP API Security Project / API Security Top 10" (object-level authorisation, data exposure, mass assignment, rate limits). URL: [https://owasp.org/www-project-api-security/](https://owasp.org/www-project-api-security/) Accessed: 2026-11-08. Supports: API security risks and defences.
