## About this module

An AI application is still an application: it has users, data stores, networks, dependencies and administrators, and all the usual security controls apply. What is new is a component - the model - whose behaviour is learned rather than programmed, that treats every piece of text in its context as potential instruction, and whose output is probabilistic. This module sets out the AI system lifecycle, the assets that need protection, the trust boundaries of a typical LLM application, the main frameworks (OWASP Top 10 for LLM Applications 2025, NIST AI RMF, NIST's adversarial ML taxonomy), and a defender's threat-modelling method, applied to the course bench, BanyanBot.

## Why it matters

In March 2023 a bug in the open-source redis-py library behind a popular chatbot service let some users see other users' conversation titles and, for a nine-hour window on 20 March, billing details of 1.2% of paying subscribers were potentially visible to others (case study). The first major data exposure of a mass-market AI service came from ordinary software, not from the model.

## Where it is used

AI product security reviews, architecture boards, AI governance and risk committees, procurement of AI services, privacy impact assessments and secure development of AI features.

## Learning objectives

1. Describe the AI system lifecycle and the security activities in each stage.
2. Inventory the assets of an AI application.
3. Identify trust boundaries in an LLM application, including untrusted content inside the model's context.
4. Use OWASP LLM Top 10 2025, NIST AI RMF and NIST AI 100-2 as structuring frameworks.
5. Build a defender's threat model for an AI application.
6. Plan evaluation and monitoring as part of the design.

## Before you start

**Prerequisites:** Course 12 Module 2 (threat modelling); Course 06 (web application security); Course 17 (risk).

**Estimated study time:** About 8 hours.
