## About this module

Endpoints can be blinded, and some devices (printers, appliances, legacy systems) can never run an agent. The network still carries every conversation. This module covers the three layers of network telemetry that blue teams engineer: DNS logs, flow records and packet-based IDS. You will analyse the Tamarind DNS and flow data for regular, small connections. You will also write and test Suricata signatures against a packet capture from the Course 09 lab, and learn when to move from metadata to packets.

## Why it matters

CISA's red-team assessment AA24-326A found an organisation that relied too heavily on endpoint detection and had never properly implemented IDS or IPS for its DMZ [R1]. Network telemetry is the independent witness that catches what endpoint sensors miss.

## Where it is used

Resolver and DNS-firewall logs, NetFlow/IPFIX and cloud flow logs, IDS sensors (Suricata, Snort, Zeek), network detection and response (NDR) products, and packet capture at internet and data-centre chokepoints.

## Learning objectives

1. Explain what DNS, flow and packet telemetry each reveal and cost.
2. Detect anomalous DNS behaviour using volume, record type, response code and label structure.
3. Measure connection regularity from flow data and interpret it with caution.
4. Write Suricata rules with correct action, header and options, and test them against a capture.
5. Use Suricata EVE JSON output for investigation, not just alerting.
6. Decide when an investigation needs packets, and handle captures lawfully.

## Before you start

**Prerequisites:** C20-M01, C20-M02; Course 02 Modules 1-3 and 6 (TCP/IP, DNS, HTTP); Course 09 Module 6 (network forensics).

**Estimated study time:** About 9 hours.
