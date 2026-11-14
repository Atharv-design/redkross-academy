## About this module

Module 3 showed that every request to a cluster is authenticated, authorised and admitted. This module is about designing those decisions: who and what may call the API (people, pipelines and pods), what they may do (RBAC), how workload identities and their tokens behave, how secrets are protected, and how admission policy enforces rules that RBAC cannot express. You will review a lab cluster's RBAC with a tool that finds risky grants, fix an over-broad legacy grant, examine real service account tokens, and write and test an in-process admission policy.

## Why it matters

Access mistakes are the most common route to cluster compromise. The Kubernetes RBAC good-practice guide warns that list and watch on secrets reveal their contents, and that permission to create workloads implicitly grants access to the secrets and service accounts of that namespace [R1]. Microsoft reported in 2020 that exposed Kubeflow dashboards allowed anyone to deploy containers, which were used for cryptomining (case study CS1).

## Where it is used

Platform onboarding (namespaces, roles, groups), CI/CD credential design, access reviews and audits, secret management standards, and policy engineering for admission control.

## Learning objectives

1. Design authentication for humans and workloads, including break-glass access.
2. Write RBAC roles and bindings with least privilege and explain their scoping rules.
3. Identify high-risk permissions and review a cluster's RBAC with a repeatable tool and an accepted-risk register.
4. Explain bound service account tokens, their lifetime and binding, and when to disable token mounting.
5. Apply secret-handling practices beyond encryption at rest.
6. Write, scope, roll out and test ValidatingAdmissionPolicies.

## Before you start

**Prerequisites:** C21-M03; Course 01 Module 5 (authentication and authorisation models).

**Estimated study time:** About 10 hours.
