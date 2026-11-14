## Revision

### Summary

The capstone assessment scopes a controlled AI application, collects behaviour evidence (probes, summaries, intervals), control evidence (unit tests, retrieval traces), data evidence (ingestion audit) and supply-chain evidence (approved digests, manifests), hashes it, and documents failure paths from source to impact with controls at each hop. On BanyanBot, FP-1 showed a planted page retrieved for a benign refund question leading to a simulated refund on another customer's order in 3/5 naive runs, stopped in hardened by sanitising and a unit-tested tool policy. Mitigations put deterministic controls first, keep probabilistic layers without relying on them, and add detection and governance. Reports state facts, intervals, limitations and residual risk and request decisions. Regulation such as the EU AI Act (Regulation (EU) 2024/1689) makes documented assessment an expectation.

### Important concepts

failure-path register; evidence pack; residual risk.

### Key technical takeaways

the seven evidence commands; hashing; hop-by-hop controls.

### Glossary

| Term | Meaning |
|---|---|
| Evidence pack | Hashed set of assessment outputs. |
| Failure path | Sequence from untrusted source to impact. |
| Residual risk | Risk remaining after controls. |
| Release gate | Automated checks before deployment. |

### Common mistakes

"no vulnerabilities" claims; evidence without versions; ignoring utility.

### Revision questions

​1. Write FP-1 from memory. 2. Rank BanyanBot's mitigations. 3. List the report sections.

### Further reading

EUR-Lex AI Act [R1]; NIST AI RMF [R2]; OWASP LLM Top 10 [R3].

## References

- [R1] EUR-Lex. Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 (Artificial Intelligence Act), OJ L 12.7.2024. URL: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) Accessed: 2026-11-08.
- [R2] NIST. "AI Risk Management Framework". URL: [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) Accessed: 2026-11-08.
- [R3] OWASP Gen AI Security Project. "2025 Top 10 Risk & Mitigations for LLMs and Gen AI Apps". URL: [https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/) Accessed: 2026-11-08.
- [R4] Lab evidence. LAB_ASSETS/C18/banyanbot outputs (probes, summary, report, tool tests, retrieval trace, audits), 2026-11-08.
