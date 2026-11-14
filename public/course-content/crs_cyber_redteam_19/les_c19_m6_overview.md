## About this module

Command and control (C2) is how an adversary communicates with and directs systems they have compromised. This module treats C2 CONCEPTUALLY and defensively: the architecture theory, the network indicators it produces, and the defensive containment that blocks it. You will use the lab's ATT&CK map, filtered to the Command and Control tactic, to turn C2 into indicators and containment - and you will understand why the lab emulates C2 only to a loopback sink inside the isolated range.

## Why it matters

C2 is the adversary's lifeline: without it they cannot direct an intrusion or exfiltrate. For defenders, C2 traffic is one of the most reliable detection and containment points - it must cross the network boundary, where egress filtering, proxy inspection and flow analysis can see and stop it. Understanding C2 architecture and its indicators, and applying containment, is how an engagement helps an organisation cut the adversary's lifeline. Treated conceptually, this teaches detection and containment without providing any C2 tooling.

## Where it is used

Network detection engineering (beacon and anomaly detection); egress control and proxy architecture; threat hunting for C2 indicators (Course 20); and incident containment (ties to Course 07 monitoring and Course 12 SOC).

## Learning objectives

1. Explain C2 and its purpose in an intrusion.
2. Explain C2 architecture theory at a conceptual level.
3. Explain the network indicators C2 produces.
4. Explain the ATT&CK C2 technique (T1071) and its detection.
5. Explain defensive containment of C2.
6. Explain why C2 is emulated only to a lab sink.

## Before you start

**Prerequisites:** Modules 1-5; Course 07 (network monitoring) helpful.

**Estimated study time:** About 9 hours.
