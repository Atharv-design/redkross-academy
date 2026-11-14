## Revision

### Summary

AI applications combine classic software with a learned, probabilistic component that treats all text in its context as potential instruction. The lifecycle - plan, data, model, integrate, evaluate, deploy, operate, retire - carries security activities at each stage; NIST AI RMF (26 January 2023) structures them into Govern, Map, Measure and Manage, with the Generative AI Profile (26 July 2024). Assets include data, model, prompts, tools, outputs, platform and reputation. Trust boundaries include the context window itself, so strong controls sit outside the model: retrieval access control, tool policies in code, output handling. OWASP LLM Top 10 2025 and NIST AI 100-2 E2025 give the vocabulary. A defender's threat model ties every row to a control, detection, owner and probe. The March 2023 chatbot exposure came from a classic library bug.

### Important concepts

context as trust boundary; probabilistic behaviour; controls outside the model.

### Key technical takeaways

BanyanBot data flow; threat-model rows mapped to probes.

### Glossary

| Term | Meaning |
|---|---|
| Canary | A unique marker whose appearance proves a leak. |
| Context window | The tokens the model processes at once. |
| LLM | Large language model. |
| RAG | Retrieval-augmented generation. |
| System prompt | Developer instructions placed before user input. |

### Common mistakes

secrets in prompts; trusting the model to enforce policy; no evaluation plan.

### Revision questions

​1. List six assets of an LLM app. 2. Where are the trust boundaries? 3. Name the OWASP 2025 categories.

### Further reading

OWASP LLM Top 10 [R1]; NIST AI RMF [R3]; NIST AI 100-2 [R4].

## References

- [R1] OWASP Gen AI Security Project. "2025 Top 10 Risk & Mitigations for LLMs and Gen AI Apps". URL: [https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/) Accessed: 2026-11-08. Supports: LLM01-LLM10 names.
- [R2] Help Net Security (Z. Zorz). "A bug revealed ChatGPT users' chat history, personal and billing data", 27 March 2023. URL: [https://www.helpnetsecurity.com/2023/03/27/chatgpt-data-leak/](https://www.helpnetsecurity.com/2023/03/27/chatgpt-data-leak/) Accessed: 2026-11-08. Supports: redis-py root cause, titles visible, nine-hour window on 20 March, 1.2% of Plus subscribers notified, fields, fix.
- [R3] NIST. "AI Risk Management Framework". URL: [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) Accessed: 2026-11-08. Supports: released 26 January 2023; NIST AI 600-1 released 26 July 2024.
- [R4] NIST. AI 100-2 E2025, "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations", March 2025. URL: [https://csrc.nist.gov/pubs/ai/100/2/e2025/final](https://csrc.nist.gov/pubs/ai/100/2/e2025/final) Accessed: 2026-11-08.
- [R5] EUR-Lex. Regulation (EU) 2024/1689 (Artificial Intelligence Act) of 13 June 2024, OJ L 12.7.2024. URL: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) Accessed: 2026-11-08.
- [R6] Lab evidence. LAB_ASSETS/C18/banyanbot (bot.py, CPython 3.14.4, Ollama qwen3:4b), 2026-11-08.
