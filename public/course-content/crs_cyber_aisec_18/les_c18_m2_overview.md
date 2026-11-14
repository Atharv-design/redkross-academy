## About this module

To secure an LLM application you need a working model of how it is built. This module explains tokens and context windows, how a chat request is assembled, how retrieval-augmented generation (RAG) selects documents and puts them in the context, how structured output and tool calling work, and what changes when an application becomes an agent that plans and acts in loops. Each mechanism is examined for the security property it creates or breaks, using BanyanBot's execution-tested retrieval and token trace.

## Why it matters

In February 2023 Greshake and colleagues showed that LLM-integrated applications can be exploited "remotely (without a direct interface)" by placing instructions in content the application retrieves - indirect prompt injection (case study). The vulnerability is a consequence of the architecture: retrieval and tools bring untrusted text into the context.

## Where it is used

Designing chat assistants, enterprise search, coding assistants, agents that operate tickets or infrastructure; architecture and design reviews; choosing vector databases and orchestration frameworks.

## Learning objectives

1. Explain tokens, context windows and how chat messages are assembled.
2. Explain sampling and why outputs vary between runs.
3. Describe RAG pipelines and their access-control requirements.
4. Explain structured output and tool calling, and who executes tools.
5. Describe agent loops and their extra risks.
6. Trace what enters the context for a given request.

## Before you start

**Prerequisites:** C18-M01; Course 04 (Python).

**Estimated study time:** About 8 hours.
