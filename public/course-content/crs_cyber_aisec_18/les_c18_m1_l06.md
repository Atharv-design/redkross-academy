A defender's table per asset and boundary:

```text
asset | boundary | OWASP category | what could go wrong | preventive
control (outside the model where possible) | detective control |
evaluation probe | owner
```

**BanyanBot rows (abridged):**

- System prompt / user boundary / LLM07 / confidential code revealed / keep secrets out of prompts; output canary redaction / log canary hits / probe P2.
- KB partner page / ingestion boundary / LLM01 / planted instructions followed / ingestion audit and sanitising; delimiting; tool policy / alert on blocked tool calls / probe P3.
- Customer records / retrieval boundary / LLM02 / another customer's data disclosed / ACL-filtered retrieval / PII redaction alerts / probe P4.
- Refund tool / tool boundary / LLM06 / out-of-policy refund executed / deterministic policy check in code / ledger alert / probe P5.
- UI / rendering boundary / LLM05 / external image or link rendered / URL allowlist; strip markdown images / probe P6.
- All / availability / LLM10 / excessive cost / rate limits, token budgets / usage monitoring.

Every row ends with a probe: a threat model without tests is a list of hopes (Module 7).
