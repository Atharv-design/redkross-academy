## About this module

Object storage, managed databases and file shares hold most of an organisation's cloud data. This module covers the controls that decide who can read that data (bucket and container access, public access blocks, shared keys and SAS tokens), how encryption and key management work and what they do and do not protect against, and how versioning, backups, immutability and retention keep data recoverable. The lab audits two S3 buckets, fixes a public one with KMS encryption and versioning, and recovers a deleted object.

## Why it matters

Toyota Connected disclosed in 2023 that a cloud environment setting had exposed vehicle location data of about 2.15 million customers in Japan for nearly a decade (November 2013 to April 2023), attributing it to human error (case study). Simple storage access settings, left unchecked, can expose data for years.

## Where it is used

Data platform design, data-loss prevention, privacy compliance (DPDP Act), key management services, backup and disaster recovery, legal hold and records retention.

## Learning objectives

1. Configure storage access controls and prevent public exposure.
2. Explain provider-managed and customer-managed encryption and their threat coverage.
3. Design key policies, rotation and separation of duties in KMS/Key Vault.
4. Use versioning, soft delete and immutability to resist deletion.
5. Design backups isolated from production and test restores.
6. Audit and remediate storage configuration programmatically.

## Before you start

**Prerequisites:** C11-M01 to C11-M03; Course 15 Modules 2 and 5 (encryption, key management).

**Estimated study time:** About 9 hours.
