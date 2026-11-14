## About this module

**Adversaries need infrastructure:** domains for lures, servers for payloads and command and control, certificates for HTTPS. Each leaves records in public or semi-public systems - DNS, registration databases, certificate transparency logs, passive DNS collections - that defenders can analyse to find more of the same infrastructure, often before it is used. This module teaches what those records mean, how to add context to addresses and certificates, and how to pivot from one indicator to a cluster without pulling in innocent bystanders. In the lab a naive pivot from one lure domain gathered ten domains, four of them unrelated small businesses; a disciplined pivot found the six campaign domains and nothing else.

## Why it matters

Infrastructure analysis turns one reported domain into a list of related domains to block, monitor or report for takedown. Done carelessly it blocks shared hosting, content delivery networks or public services used by thousands of legitimate sites. Done well it can reveal staging before an attack starts - Nilgiri's lure domains were registered and given certificates days before the first lure.

## Where it is used

CTI and SOC teams enriching alerts, brand-protection teams hunting lookalike domains, fraud teams, takedown coordination with registrars and hosting providers, and blocklist curation.

## Learning objectives

1. Interpret DNS records, registration (RDAP) data and lookalike-domain patterns.
2. Use passive DNS correctly, including first/last seen and its coverage limits.
3. Add context to IP addresses (hosting, CDN, shared hosting) and decide whether an address can be blocked.
4. Use certificate data and certificate transparency to find related domains.
5. Pivot with explicit discipline (fan-out limits, time windows, recorded evidence) and build infrastructure clusters.
6. Turn infrastructure findings into proportionate defensive actions.

## Before you start

**Prerequisites:** C14-M02; Course 02 Modules 4-5 (DNS, TLS basics).

**Estimated study time:** About 8 hours.
