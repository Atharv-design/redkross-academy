A telemetry strategy answers six questions for every source:

| Term | Meaning |
|---|---|
| What | which events and fields (process command line and parent; logon type and source address; DNS query and response code). |
| Where | which hosts, accounts or network segments send it - expressed as a share of the fleet, not "yes". |
| How | agent, Windows Event Forwarding, syslog, API pull; with buffering so that an outage does not lose events. |
| How long | retention in hot (searchable) and cold (archive) storage, aligned with investigation needs and legal obligations. |
| When | time synchronisation (NTP) and time-zone handling; Sysmon writes UTC timestamps, but many application logs do not. |
| Trust | integrity and access control: who can delete or alter logs, and how tampering is detected. |

The joint guidance "Best Practices for Event Logging and Threat Detection" (ASD's ACSC with CISA, the FBI, the NSA and international partners, 21 August 2024) sets a baseline for enterprise logging and is a good checklist for these questions [R2].

Volume is a design constraint, not an afterthought. Endpoint process events and DNS logs are cheap and high-value. Full packet capture is expensive and usually reserved for chokepoints. Image-load and registry events can be enormous unless they are filtered at the sensor. Collect what your priority techniques need, measure the cost, and filter at source only where you can show that the filter does not hide a priority behaviour.
