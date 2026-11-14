## Revision

### Summary

The AI supply chain spans base models, adapters, model files and loaders, inference servers, packages, datasets, knowledge-base content, hosted APIs and prompts; an AI-BOM records them. Provenance review covers publisher, model card, licence, formats and exact revision. Some formats execute code on load, so prefer safe formats such as safetensors or runtime formats like GGUF, scan files and sandbox loading - JFrog's 2024 report found about 100 malicious models on a public hub. Dependencies and inference servers need pinning, patching and private, authenticated exposure. Poisoning is countered with provenance, review, manifests, ingestion audits and regression evaluation; integrity checks prove "unchanged", not "safe". The lab check approved only the pinned model digest, flagged three unapproved models and detected an unreviewed knowledge-base edit.

### Important concepts

AI-BOM; safe loading; integrity versus safety.

### Key technical takeaways

supply_check.py; digests; release gate.

### Glossary

| Term | Meaning |
|---|---|
| AI-BOM | AI bill of materials. |
| GGUF | Model file format used by llama.cpp-based runtimes. |
| Model card | Documentation of a model's purpose and limits. |
| Pickle | Python serialisation that can execute code on load. |
| Poisoning | Manipulating data to change model behaviour. |
| safetensors | Tensor-only model storage format. |

### Common mistakes

deploying "latest"; loading unknown models on privileged hosts; trusting hashes as safety.

### Revision questions

​1. List eight supply-chain components. 2. Why is integrity not safety? 3. Design a release gate.

### Further reading

JFrog [R1]; OWASP LLM03/04 [R2].

## References

- [R1] JFrog (D. Cohen). "Data Scientists Targeted by Malicious Hugging Face ML Models with Silent Backdoor", 27 February 2024. URL: [https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/](https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/) Accessed: 2026-11-08.
- [R2] OWASP Gen AI Security Project. "2025 Top 10 Risk & Mitigations for LLMs and Gen AI Apps" (LLM03, LLM04). URL: [https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/) Accessed: 2026-11-08.
- [R3] NIST. AI 100-2 E2025 (poisoning taxonomy), March 2025. URL: [https://csrc.nist.gov/pubs/ai/100/2/e2025/final](https://csrc.nist.gov/pubs/ai/100/2/e2025/final) Accessed: 2026-11-08.
- [R4] Lab evidence. supply_check.py, approved_models.json, kb_manifest.json and supply_check_output.txt (Ollama, qwen3:4b), 2026-11-08.
