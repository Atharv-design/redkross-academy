## About this module

Kubernetes is a set of cooperating programs around one API. Users and controllers write desired state to the API server; the API server authenticates, authorises, admits and stores it; controllers and kubelets watch it and make reality match. Every security control in the following modules hooks into one of those steps. This module maps the components, follows a request through the API server, shows where cluster state and secrets are stored, and explains the workload objects you will secure. You will explore a real local cluster and watch reconciliation happen.

## Why it matters

The API server is the front door to everything, and the datastore behind it holds every secret. The Kubernetes documentation states that by default the API server stores plain-text representations of resources in etcd, with no at-rest encryption [R3]; the lab shows a secret value appearing verbatim in the datastore file. Architecture flaws are rare but severe: CVE-2018-1002105 let some users escalate through the API server's handling of upgraded connections (case study CS1).

## Where it is used

Cluster design reviews, threat modelling for platforms, choosing between managed and self-managed Kubernetes, audit preparation (CIS Kubernetes Benchmark, NSA/CISA hardening guidance) and incident scoping.

## Learning objectives

1. Identify control-plane and node components and their trust relationships.
2. Trace an API request through authentication, authorisation, admission and persistence.
3. Explain where cluster state and secrets are stored and how encryption at rest changes that.
4. Describe the main workload objects, ownership chains and reconciliation.
5. Explain the kubelet's role and why its API must be protected.
6. Compare security responsibilities across distributions and managed services.

## Before you start

**Prerequisites:** C21-M01, C21-M02; basic kubectl use.

**Estimated study time:** About 9 hours.
