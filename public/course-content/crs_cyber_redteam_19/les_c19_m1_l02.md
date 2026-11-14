The rules of engagement (RoE) are the agreed contract for HOW the engagement runs.

**A complete RoE records:**

```text
scope           the exact systems, networks, accounts and applications IN scope,
                and an explicit OUT-of-scope list (production, third parties,
                anything not listed).
window          the permitted start and end times (and any blackout periods).
methods/limits  permitted techniques and prohibited ones (e.g. no denial of
                service, no destructive actions, no social engineering unless
                agreed).
deconfliction   how testers are identified (operator tags) so defenders can tell
                a test from a real incident, and a shared channel to confirm.
contacts        emergency and escalation contacts on both sides.
stop conditions when to halt immediately.
data handling   how findings and any captured data are stored, encrypted and
                retained.
reporting       what will be delivered (executive and technical).
```

The RoE protects both sides: the tester from accusations of going out of bounds, and the organisation from harm. The lab's validator checks each of these.
