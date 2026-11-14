When monitoring reveals an incident, CONTAINMENT limits its spread while investigation and eradication proceed. Network-layer containment options:

| Term | Meaning |
|---|---|
| isolate the host | move a compromised host to a quarantine segment or block its switch port, cutting it off while preserving it for investigation. |
| block the flow | add a firewall/ACL rule to deny the malicious flow (e.g. the beaconing destination, or a scanning source). |
| cut the segment | in a serious incident, isolate a whole segment to stop lateral movement. |
| preserve evidence | capture relevant flow/packet data and logs before and during containment. |

**Containment is a balance:** act fast enough to limit damage, but preserve evidence and avoid tipping off a sophisticated attacker prematurely. Segmentation (Module 4) makes containment easier, because the boundaries already exist. The lab's findings map to containment: isolate the scanning external source at the perimeter, block the beaconing host's outbound flow and investigate it, and fix the segmentation gaps the violations reveal.
