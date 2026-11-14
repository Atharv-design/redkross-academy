## About this module

Firewalls decide what may pass; intrusion detection and prevention systems watch what does pass and raise alerts or block when they see something malicious. This module covers detection concepts, the two broad detection approaches - signatures and anomalies - and the crucial discipline of alert tuning, which turns a noisy sensor into useful signal. You will reason about detection using the lab's flow telemetry (a port scan and a beaconing host are embedded for detection in Module 7) and learn why an un-tuned IDS buries real alerts in false positives. The goal is detection that a human can actually act on.

## Why it matters

Prevention is never perfect, so detection is essential: it catches what gets through and shortens the time an attacker goes unnoticed. But detection is only valuable if it is tuned - a sensor that cries wolf a thousand times a day trains analysts to ignore it, so the one real alert is missed. The art of IDS/IPS is less about the sensor and more about tuning: writing good rules, suppressing known-benign noise, and prioritising. Understanding signatures versus anomalies, and false positives versus false negatives, is what makes network detection work.

## Where it is used

Network IDS/IPS at boundaries; the detection content (rules) a SOC maintains; the alert pipeline into a SIEM; and the continuous tuning that keeps alerts actionable. Course 08 (SOC) and Course 20 (blue team) build on these concepts.

## Learning objectives

1. Distinguish IDS (detect/alert) from IPS (detect/block).
2. Explain signature-based and anomaly-based detection and their trade-offs.
3. Explain false positives and false negatives and their costs.
4. Explain alert tuning and why it is essential.
5. Reason about detecting scans and beaconing in telemetry.
6. Place IDS/IPS correctly in the architecture.

## Before you start

**Prerequisites:** Modules 1-2; Course 02 (ports, protocols).

**Estimated study time:** About 8 hours.
