## About this module

Segmentation divides a network into isolated parts so that a compromise in one cannot freely spread to others. This module covers the mechanisms (VLANs and subnet boundaries), the modern model (zero-trust segmentation, where no flow is trusted by default), and access policy validation - checking that the actual flows match the intended segmentation policy. You will validate the lab network's connections against its zero-trust matrix and find the flows that violate it. Segmentation is the control that most directly limits an attacker's blast radius, and validation is how you know it is actually enforced.

## Why it matters

Segmentation is the difference between a single compromised host and a full breach. A flat or poorly segmented network lets an attacker move laterally from a low-value entry point to the crown jewels; good segmentation forces them to cross controlled, monitored boundaries at every step. Zero trust takes this further: every flow must be explicitly permitted, so lateral movement has no default path. But a segmentation design is only as good as its enforcement - hence validation, which catches the gaps between the intended policy and reality. This is also a compliance driver (for example, isolating cardholder data environments).

## Where it is used

Data-centre and cloud network design; isolating sensitive environments (payment , OT/ICS, management); micro-segmentation in virtualised and cloud networks; zero-trust programmes; and the audits that verify segmentation is enforced.

## Learning objectives

1. Explain VLANs and subnet boundaries as segmentation mechanisms.
2. Explain zero-trust segmentation and micro-segmentation.
3. Define an allowed-flow (segmentation) policy.
4. Validate observed connections against the policy.
5. Explain how segmentation limits lateral movement and blast radius.
6. Identify and remediate segmentation violations in the lab.

## Before you start

**Prerequisites:** Modules 1-2 (zones, firewall policy).

**Estimated study time:** About 8 hours.
