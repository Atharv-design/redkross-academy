## About this module

Secure coding is mostly about a few patterns applied every time:

- validate input against what you expect;
- keep data separate from code when you build queries and commands;
- encode output for the context where it is displayed;
- authenticate users properly;
- check authorisation on every request for every object.

This module teaches each pattern with standard-library Python, and proves it with security unit tests that run in the pipeline. The patterns carry over to other languages through their equivalent libraries.

## Why it matters

Injection, broken access control and authentication failures stay near the top of the OWASP Top 10 (2025 edition, Course 06) because the same mistakes recur across codebases. The 2023 MOVEit Transfer exploitation (case study) began with an SQL injection flaw in a widely used product.

## Where it is used

Every development team; secure coding standards; code review checklists; security champion programmes.

## Learning objectives

1. Apply allowlist input validation at trust boundaries.
2. Prevent injection with parameterised queries and argument lists.
3. Apply contextual output encoding.
4. Store and verify passwords safely and manage sessions.
5. Implement deny-by-default, object-level authorisation.
6. Write security unit tests for each pattern.

## Before you start

**Prerequisites:** C12-M01, C12-M02; Course 04 (Python), especially Modules 2 and 8.

**Estimated study time:** About 9 hours.
