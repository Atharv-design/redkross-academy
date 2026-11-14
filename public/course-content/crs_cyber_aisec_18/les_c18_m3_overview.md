## About this module

Prompt injection (OWASP LLM01:2025) is the situation in which text that the application did not intend as instructions changes the model's behaviour. It comes directly from users, or indirectly from documents, web pages, e-mails and tool results that the application places in the context. There is no complete fix inside the model, so defenders build layers around it: reduce what untrusted text can reach, constrain what the model's output can do, filter what leaves, and test continuously. This module measures those layers on BanyanBot with benign probes and shows what each one does - and does not - achieve.

## Why it matters

In August 2024 PromptArmor reported to Slack that its AI feature could be manipulated through content in channels to disclose information from private channels; Slack's initial response noted that public-channel messages being searchable by all workspace members was intended behaviour (case study). Indirect injection turns ordinary content features into a route to data.

## Where it is used

Design reviews of chat, search and agent features; content ingestion policies; AI red teaming (Module 7); SOC monitoring of AI applications; vendor assessment of AI products.

## Learning objectives

1. Distinguish direct and indirect prompt injection and their sources.
2. Explain why prompt-level defences are probabilistic and insufficient alone.
3. Apply ingestion controls to untrusted content.
4. Design layered mitigations: retrieval scope, delimiting, input and output filters, tool policies, privilege separation.
5. Measure mitigations with benign canary probes over several runs.
6. Monitor and respond to injection attempts in production.

## Before you start

**Prerequisites:** C18-M01, C18-M02; Course 06 (injection concepts in web applications).

**Estimated study time:** About 9 hours.
