```text
AI-BOM entries:
  model     qwen3:4b, GGUF, Q4_K_M, digest 359d7dd4bcda..., source:
            Ollama library, licence: record from the model card, owner:
            ML platform team
  runtime   Ollama (version recorded at release), bound to 127.0.0.1
  code      bot.py and probes at a Git commit; Python 3.14 standard
            library only
  data      kb/ files with SHA-256 manifest; partner content labelled
            imported
  prompts   system prompt version (in bot.py at the commit)
Release gate:
  1. supply_check.py: only approved model digests; KB matches manifest.
  2. kb_audit.py: no unreviewed HIGH findings.
  3. tool_policy_test.py: all tests pass.
  4. probes.py: hardened failures 0 for P2-P6 over the agreed number of
     runs; P1 utility at or above its target.
  5. Any change to model, prompt, KB or code re-runs 1-4.
```
