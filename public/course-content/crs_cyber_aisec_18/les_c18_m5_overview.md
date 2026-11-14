## About this module

Model output is untrusted input to everything downstream: the browser that renders it, the database query built from it, the shell that runs generated code, and the tool that executes its proposed action. This module covers improper output handling (OWASP LLM05:2025), excessive agency (LLM06), misinformation and reliance (LLM09), and the design of tool permission boundaries that keep the model's influence within what the business has approved. The lab measures output filtering and proves BanyanBot's tool policy with deterministic unit tests.

## Why it matters

On 14 February 2024 CTV News reported that a British Columbia tribunal found Air Canada responsible for inaccurate information given to a traveller by its website chatbot (case study). Organisations own what their AI says and does; output and actions need the same controls as any other customer-facing system.

## Where it is used

Chat UIs, AI features that generate code, SQL, e-mails or tickets; agents that call APIs; customer service automation; developer assistants.

## Learning objectives

1. Treat model output as untrusted and encode, validate or filter it for each destination.
2. Prevent data leakage through rendered links and images.
3. Bound agency: minimal tools, minimal permissions, minimal autonomy.
4. Enforce tool policies deterministically in code, with tests.
5. Design human approval and logging for consequential actions.
6. Manage misinformation and reliance risk.

## Before you start

**Prerequisites:** C18-M01 to C18-M04; Course 06 (output encoding, injection, SSRF).

**Estimated study time:** About 8 hours.
