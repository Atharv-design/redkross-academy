## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

How the labs work - and their limits ------------------------------------ LAB_ASSETS/C18/banyanbot is a defender's test bench for a small, fictional LLM support assistant ("BanyanBot" for "Banyan Telecom") that runs entirely on your computer: a local model served by Ollama on 127.0.0.1, seven fictional knowledge-base documents, and two SIMULATED tools (issue_refund, send_email) that only write to an in-memory ledger. The same benign probes are run against three configurations - naive, prompt-only defences, and layered (hardened) defences - with several random seeds, and an objective check (canary values, ledger entries) decides pass or fail.

| Term | Meaning |
|---|---|
| bot.py, probes.py, summarise.py | application, probes P1-P6, results |
| kb_audit.py, supply_check.py | ingestion audit and provenance check |

Saved outputs (`*_output.txt,` probe_results.json) were execution-tested on 2026-11-08 with CPython 3.14.4 and Ollama serving qwen3:4b (4.0B, Q4_K_M).

**Limits:** results are measurements of one small model at one time; other models and versions give different numbers. The planted test document contains only harmless instructions (a canary word and a request to the simulated refund tool). Test only AI systems you own or are explicitly authorised in writing to test.

**Access classification note:** per the blueprint, Course 18 is PAID.
