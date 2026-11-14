## About this module

Modern applications are mostly other people's code: open-source libraries, their transitive dependencies, base container images and build tools. Dependency security means knowing exactly what you ship, finding known vulnerabilities in it, upgrading safely, controlling where packages come from and complying with their licences. This module covers software bills of materials (SBOMs), software composition analysis (SCA) with pip-audit, pinning and hash verification, upgrade strategy and licence review. Every step is demonstrated on deliberately outdated pins.

## Why it matters

When the Log4Shell vulnerability (CVE-2021-44228) was disclosed in December 2021, organisations without an inventory spent weeks just finding where Log4j was used. CISA's guidance urged inventories that included internally developed software and SaaS [R1]. Teams with SBOMs could answer in minutes.

## Where it is used

Build pipelines, release processes, procurement (customers requesting SBOMs), vulnerability management, open-source programme offices and legal review.

## Learning objectives

1. Explain SBOM purpose, formats (CycloneDX, SPDX) and the NTIA minimum elements.
2. Generate an SBOM and recognise its coverage limits.
3. Run SCA, deduplicate advisories and interpret fix versions.
4. Prioritise and remediate vulnerable dependencies.
5. Use pinning, lock files, hash checking and trusted indexes.
6. Review licences and identify obligations.

## Before you start

**Prerequisites:** C12-M01 to C12-M04; Course 04 Module 2 (pip, virtual environments).

**Estimated study time:** About 8 hours.
