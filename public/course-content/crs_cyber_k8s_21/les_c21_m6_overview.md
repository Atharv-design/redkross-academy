## About this module

Clusters, networks, buckets and identities are increasingly created from text files - Terraform, Kubernetes manifests, Helm charts - stored in Git and applied by pipelines. That is good news for security: configuration can be reviewed, scanned and tested before it exists, and its history is auditable. It also means a single bad line is reproduced in every environment. This module covers the typical risks in infrastructure code, static scanning and its blind spots, writing policy as code with unit tests, and detecting drift between what Git declares and what is really running. All Terraform in this module is analysed statically and never applied.

## Why it matters

Cloud and cluster incidents are dominated by configuration: storage made public, management ports open to the internet, identities with wildcard permissions, logging switched off. Regulators treat the processes around configuration as governance: in August 2020 the US OCC fined Capital One USD 80 million citing its failure to establish effective risk assessment processes before migrating significant IT operations to the public cloud (case study CS1). And configuration declared in Git is only half the story: manual "hotfixes" silently diverge from it.

## Where it is used

Pull-request checks on Terraform and Kubernetes repositories, platform guardrails, cloud security posture management, GitOps operations, change management and audit evidence.

## Learning objectives

1. Explain the IaC lifecycle and its security-relevant artefacts (plan, state, provider locks).
2. Recognise common high-risk misconfigurations in Terraform for storage, networks, clusters and identity.
3. Run a static IaC scanner, interpret its results and identify blind spots.
4. Write policy as code with positive, negative and edge-case tests.
5. Detect, classify and reconcile configuration drift.
6. Place checks across the delivery pipeline for defence in depth.

## Before you start

**Prerequisites:** C21-M04, C21-M05; Course 11 Modules 1-3 (cloud architecture, identity and network) are helpful for L02.

**Estimated study time:** About 9 hours.
