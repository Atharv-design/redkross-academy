## About this module

Most internet-facing servers run Linux, and almost every intrusion crosses a network. This module covers both. On the host side, it teaches the logs and artefacts Linux keeps: authentication logs, the systemd journal, login records, shell history, audit logs and persistence locations. On the network side, it teaches what packet captures and flow records can prove, how to extract transferred files from a capture and prove they match the originals, and where encryption limits analysis. It ends by merging host and network evidence into one UTC timeline.

## Why it matters

Host logs tell you what accounts did; network evidence tells you what crossed the wire. When they agree, findings are strong. When they disagree, something is missing or has been altered, and that is itself a finding.

## Where it is used

Web server compromises, cloud instance investigations, data-exfiltration cases, supply-chain incidents, and network security monitoring teams.

## Learning objectives

1. Locate and interpret Linux authentication, journal and login records.
2. Identify Linux persistence and user-activity artefacts.
3. Analyse packet captures with tshark: conversations, HTTP and object export.
4. Prove that a carved file matches its original using hashes.
5. Explain what flow records and encrypted traffic can and cannot show.
6. Build and interpret a multi-source UTC timeline.

## Before you start

**Prerequisites:** C09-M01 to C09-M04; Course 02 (TCP/IP, Wireshark); Course 03 (Linux administration, systemd, cron).

**Estimated study time:** About 9 hours.
