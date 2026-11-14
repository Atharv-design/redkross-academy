Assurance is justified confidence that a system meets its security requirements. It has three parts:

| Term | Meaning |
|---|---|
| Claim | a requirement stated so it can be tested ("the web tier cannot open connections to the database tier"). |
| Argument | why a control satisfies the claim (a deny-by-default network policy between the two segments). |
| Evidence | results that show the control working (a connectivity test that fails as expected), with date, method and integrity. |

Evidence strength, from weakest to strongest: a statement in a document; a configuration screenshot; a configuration export checked by a tool; a test of the effect in a representative environment; a repeated, automated test of the effect in production with results retained. NIST SP 800-53A Rev. 5 (January 2022) provides a methodology and procedures for assessing security and privacy controls [R3]; the same idea applies at architecture level: assessment objectives tied to each requirement.
