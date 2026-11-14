## About this module

The CI/CD pipeline is the factory that turns source code into the software customers run. It holds powerful credentials: deploy keys, cloud roles and signing keys. It runs third-party code, such as actions, plugins and build tools, and it decides what is released. A compromised pipeline can ship malicious software signed with your own key. This module covers:

- securing pipeline identities and permissions;
- protecting pipeline definitions and runners;
- making artefacts verifiable through hashes and signatures;
- recording how they were built through provenance, aligned with the SLSA framework.

## Why it matters

The Codecov incident (2021) showed how a modified CI tool can expose the secrets of every pipeline that runs it. Customers noticed only because one of them compared a checksum. Signing and provenance turn "trust us" into something consumers can verify.

## Where it is used

Platform engineering teams, release engineering, product security, regulated software suppliers, and open-source maintainers.

## Learning objectives

1. Apply least privilege to CI tokens, runners and deployment roles.
2. Protect pipeline definitions and handle untrusted input safely.
3. Control third-party actions and plugins (pinning, review).
4. Sign artefacts and verify signatures before deployment.
5. Explain SLSA Build levels and produce and verify provenance.
6. Design release verification at deployment and consumption.

## Before you start

**Prerequisites:** C12-M01 to C12-M06; Course 09 Module 2 (hashing).

**Estimated study time:** About 9 hours.
