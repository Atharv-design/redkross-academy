## About this module

This module turns the course into a working tool, rkcrypt, which encrypts and integrity-protects files with a passphrase. It walks through the design decisions, the file format, the code, the test suite and the security documentation a reviewer or auditor would expect. Then it sets the capstone, in which you extend rkcrypt or build your own equivalent and document it to professional standard.

## Why it matters

Teams frequently need small cryptographic tools: encrypting exports, protecting backups, signing files. Building one correctly means making every decision this course has covered: KDF, AEAD, nonces, header authentication, error handling, testing and documentation. Explaining those decisions is part of the deliverable.

## Where it is used

Protecting data exports and backups, secure file exchange with partners, internal tooling, and evaluating vendor tools against a known-good reference.

## Learning objectives

1. Translate requirements into a cryptographic design.
2. Specify a versioned, authenticated file format.
3. Implement with a vetted library and safe defaults.
4. Write tests for correctness, tampering, wrong keys, malformed input and parameter bounds.
5. Document threat model, design, usage, limitations and operations.
6. Complete the capstone deliverable.

## Before you start

**Prerequisites:** C15-M01 to C15-M07.

**Estimated study time:** About 7 hours (plus 12 hours capstone).
