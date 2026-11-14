## About this module

Applications need secrets to work: database passwords, API tokens, signing keys, cloud credentials. Where those secrets live, who can read them, how often they change and whether they ever reach a repository or log decides whether a single mistake becomes a breach. Configuration is the other half. The same secure code becomes unsafe with debug mode on, weak TLS or wildcard hosts. This module covers secret storage patterns, workload identity as a way to remove secrets, scanning for leaked secrets in code and git history, rotation and response, and hardening configuration with automated checks.

## Why it matters

A credential committed to a code-sharing site was the starting point of the 2016 Uber breach examined below. Removing a secret from the latest commit does not remove it from history, as this module's lab demonstrates.

## Where it is used

Every repository and pipeline; platform teams operating secrets managers; security teams running organisation-wide secret scanning; incident response for leaked credentials.

## Learning objectives

1. Classify secrets and choose storage: secrets manager, KMS, workload identity.
2. Keep secrets out of code, images, logs and CI output.
3. Scan working trees and full git history for secrets, and understand detection limits.
4. Respond to a leaked secret: revoke, rotate, investigate, then clean.
5. Harden application and platform configuration with automated checks.
6. Manage configuration safely across environments.

## Before you start

**Prerequisites:** C12-M01 to C12-M05; basic git.

**Estimated study time:** About 8 hours.
