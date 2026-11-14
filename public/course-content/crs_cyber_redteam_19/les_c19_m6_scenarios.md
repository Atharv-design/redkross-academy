Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Flow logs show a host making a request to one destination every 60 seconds.

**Task:** Explain the indicator and the containment.

> [!TIP] Model answer
> A request to a single destination every 60 seconds is a BEACON - the periodicity indicator of C2 - found by interval analysis over flow telemetry. Investigate the destination (reputation, business need) and the process on the host. Containment: block the destination at the egress, tighten egress to deny-by-default, route web through an inspecting proxy, and hunt for other hosts beaconing to the same place.
>
> **Lesson:** periodic check-ins to one destination are a C2 beacon; detect and cut it.

## Scenario 2

A team wants to test C2 detection by beaconing to a real external server they rent.

**Task:** Explain the safer approach and why.

> [!TIP] Model answer
> Beaconing to a real external server creates real egress and control infrastructure, which is unnecessary and risky. The safer approach is to emulate only the INDICATOR - a periodic beacon to a LAB SINK inside the isolated range (no real egress) - which produces the same detectable footprint so the detection can be tested, with nothing leaving the range. This is exactly what the lab does.
>
> **Lesson:** emulate the C2 indicator to a lab sink; do not stand up real C2.

## Scenario 3

C2 uses normal HTTPS, so a colleague says it cannot be detected.

**Task:** Explain why this is wrong.

> [!TIP] Model answer
> Using HTTPS hides the content, not the behaviour. C2 still beacons - regular check-ins to a destination - and that periodicity, the destination's rarity/reputation, and protocol/timing anomalies are detectable over flow and proxy telemetry without decrypting. Egress control and proxy inspection add further visibility and containment. So C2 over HTTPS is detectable behaviourally and containable at the boundary.
>
> **Lesson:** detect C2 by behaviour and destination, not by reading the payload.
