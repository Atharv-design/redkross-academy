## Revision

### Summary

Models process tokens inside a context window that holds system prompt, history, retrieved documents, tool results and the answer; all of it can influence behaviour, and roles are a convention rather than enforcement. Sampling makes outputs vary, so tests need multiple seeds and recorded settings. RAG ingests, retrieves and inserts documents; authorisation must happen at retrieval, before ranking, and untrusted sources need ingestion audits - the lab trace showed ACLs removing another customer's record from the context, and the planted page reaching an ordinary refund question. Structured output and tool calling leave execution to the application, which must validate, check policy, use the user's authority and log. Agents loop over plans and tools, adding untrusted tool results and unbounded cost, and need least-privilege tools, limits and approvals. Greshake et al. (2023) described indirect prompt injection against such architectures.

### Important concepts

one token stream; authorise at retrieval; the application executes tools.

### Key technical takeaways

retrieval_trace.py; prompt_eval_count; JSON schema output.

### Glossary

| Term | Meaning |
|---|---|
| Agent | LLM application that plans and acts in loops. |
| Chunk | Piece of a document indexed for retrieval. |
| Embedding | Vector representation of text. |
| Temperature | Sampling setting controlling randomness. |
| Token | Unit of text processed by the model. |
| Top-k | Number of retrieved chunks. |

### Common mistakes

service-account indexing; trusting roles; one agent with all tools.

### Revision questions

​1. Trace one request through BanyanBot. 2. Why filter before ranking? 3. List agent controls.

### Further reading

Greshake et al. [R1]; OWASP LLM08 [R2].

## References

- [R1] K. Greshake, S. Abdelnabi, S. Mishra, C. Endres, T. Holz, M. Fritz. "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", arXiv 2302.12173, first submitted 23 February 2023. URL: [https://arxiv.org/abs/2302.12173](https://arxiv.org/abs/2302.12173) Accessed: 2026-11-08.
- [R2] OWASP Gen AI Security Project. "2025 Top 10 Risk & Mitigations for LLMs and Gen AI Apps". URL: [https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/) Accessed: 2026-11-08.
- [R3] Ollama. "API documentation" (chat endpoint, structured outputs). URL: [https://github.com/ollama/ollama/blob/main/docs/api.md](https://github.com/ollama/ollama/blob/main/docs/api.md) Accessed: 2026-11-08. Not separately verified beyond lab use; the lab calls were execution-tested.
- [R4] Lab evidence. retrieval_trace.py and retrieval_trace_output.txt (CPython 3.14.4, Ollama qwen3:4b), 2026-11-08.
