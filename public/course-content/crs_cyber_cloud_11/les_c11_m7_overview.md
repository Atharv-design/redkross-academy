## About this module

Workloads are the code that runs in the cloud: virtual machines, containers on managed services (ECS, EKS, AKS, Container Apps), and serverless functions (Lambda, Azure Functions). This module covers how to build and run them securely: minimal, scanned images; serverless permissions; secrets kept out of code, images and environment variables; workload identities that replace secrets; CI/CD credentials; and runtime controls that detect and limit misuse. The lab scans a weak Dockerfile, configuration files and a base image with trivy.

## Why it matters

CircleCI reported in early 2023 that malware on an engineer's laptop, undetected by antivirus, stole a 2FA-backed SSO session cookie, after which customer environment variables, tokens and keys were exfiltrated; it asked customers to rotate all secrets and recommended OIDC tokens instead of static credentials (case study). Secrets stored in platforms are only as safe as those platforms.

## Where it is used

Container platforms, serverless applications, CI/CD pipelines, secrets management programmes, runtime protection (CWPP), and vulnerability management for images.

## Learning objectives

1. Build minimal, non-root, scanned container images.
2. Secure serverless functions with least-privilege execution roles and safe configuration.
3. Store and deliver secrets with managed services, never in code or images.
4. Replace secrets with workload identity (roles, managed identities, OIDC federation).
5. Interpret secret and vulnerability scan results, including known exclusions.
6. Apply runtime controls and monitoring to workloads.

## Before you start

**Prerequisites:** C11-M01 to C11-M06; Course 21 (containers and Kubernetes) and Course 12 (secure SDLC) helpful.

**Estimated study time:** About 9 hours.
