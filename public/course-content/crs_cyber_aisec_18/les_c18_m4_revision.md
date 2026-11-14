## Revision

### Summary

AI systems expose data through retrieval over-reach, prompt leakage, memorisation, output channels, logs, vendors and classic bugs. Training data lacks per-user access control and is hard to delete, so customer facts belong in access-controlled retrieval; training data needs minimisation, lawful basis and memorisation testing. Retrieval indexes are new data stores needing ACLs, ingestion audits, deletion sync and output redaction; on BanyanBot only ACL retrieval plus redaction stopped cross-customer disclosure (5/5 to 0/5), while prompt wording did nothing. Conversation logs and vendor flows need classification, retention and contracts. Governance covers inventory, lineage, provenance, access, retention and integrity; privacy law (DPDP Act, GDPR, EU AI Act where in scope) applies. Italy's Garante action in 2023 shows regulators applying existing privacy law to AI services.

### Important concepts

control what the model is given; index as data store; data lineage.

### Key technical takeaways

kb_audit.py gate; ACL retrieval; output redaction.

### Glossary

| Term | Meaning |
|---|---|
| Data lineage | Record of where data came from and where it went. |
| Memorisation | Model reproduction of training data. |
| PIA | Privacy impact assessment. |
| Redaction | Removing sensitive values from output. |

### Common mistakes

fine-tuning on personal data for facts; indexing with service accounts; unlimited log retention.

### Revision questions

​1. Compare training and retrieval data risks. 2. Why did prompt_only fail P4? 3. List vendor questions.

### Further reading

Fortune/AP [R1]; OWASP LLM02 [R2].

## References

- [R1] Fortune (K. Chan, Associated Press). "ChatGPT is back in Italy after OpenAI met regulators' privacy demands before a big deadline", 28 April 2023. URL: [https://fortune.com/2023/04/28/chatgpt-back-italy-met-regulator-demands-openai/](https://fortune.com/2023/04/28/chatgpt-back-italy-met-regulator-demands-openai/) Accessed: 2026-11-08.
- [R2] OWASP Gen AI Security Project. "2025 Top 10 Risk & Mitigations for LLMs and Gen AI Apps" (LLM02). URL: [https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/) Accessed: 2026-11-08.
- [R3] EUR-Lex. Regulation (EU) 2024/1689 (Artificial Intelligence Act), 13 June 2024. URL: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) Accessed: 2026-11-08.
- [R4] Lab evidence. kb_audit.py, kb_audit_output.txt and probe results P4 (qwen3:4b), 2026-11-08.
