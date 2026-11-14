Safety controls are the engineering measures that keep an engagement from causing harm, independent of good intentions:

| Term | Meaning |
|---|---|
| isolation | high-risk emulation (destructive techniques, malware behaviour) runs in an ISOLATED range - a separate network with lab accounts and synthetic data - not against production. |
| no destruction | destructive actions (deleting data, disrupting services) are prohibited unless explicitly authorised in a controlled way. |
| no real data | tests use synthetic or test data; real personal data is not collected or exfiltrated. |
| simulation-only | where the goal is to test detection, the technique is EMULATED (its observable behaviour produced) rather than a real attack run against live systems. |
| reversibility | changes are tracked and reversible; cleanup restores state. |

Safety controls are why a red team exercise improves security instead of becoming an incident. The lab's RoE validator requires isolation, no-destruction and no-real-data as HIGH controls; this course's own lab is offline and simulation-only throughout.
