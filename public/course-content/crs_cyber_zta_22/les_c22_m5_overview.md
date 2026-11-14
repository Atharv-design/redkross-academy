## About this module

Ultimately attackers want data, and applications are the doors to it. This module designs services so that security properties are structural: authentication and authorisation at every service boundary, minimal and well-defined interfaces, secure defaults, and isolation between tenants and functions. It then designs data protection from classification through storage, encryption and key custody - who can use keys, who can manage them, and how that is separated - and ends with an automated design review of Tamarind's services.

## Why it matters

In 2023 an actor used a Microsoft consumer signing key from 2016 that was still valid to forge authentication tokens for enterprise email, as the US Cyber Safety Review Board described (case study). Key custody and token validation are architecture decisions with global consequences.

## Where it is used

Service and API design reviews, microservice platforms, multi-tenant SaaS, data platforms and analytics, encryption and KMS/HSM design, privacy engineering for DPDP compliance.

## Learning objectives

1. Design services with per-request authentication and authorisation and minimal interfaces.
2. Isolate tenants and functions to contain compromise.
3. Define a data classification scheme and handling rules.
4. Choose encryption layers (transport, storage, field/application).
5. Design key custody with separation of duties, rotation and scope.
6. Automate design review checks.

## Before you start

**Prerequisites:** C22-M01 to C22-M04; Course 12 Modules 3 and 6; Course 15 Modules 2, 5.

**Estimated study time:** About 8 hours.
