Three controls keep a live engagement safe moment to moment:

| Term | Meaning |
|---|---|
| stop conditions | predefined triggers to halt immediately - unexpected impact to availability, any sign of real user data, any activity resolving outside scope, or a halt called by either side. Everyone must know them before starting. |
| deconfliction | the mechanism that lets defenders distinguish the test from a real attack: operator tags on activity, a shared ticket/channel, and a way to confirm "is this you?" in seconds. Without it, a red team action can trigger a costly real-incident response - or worse, a real attack can hide behind the test. |
| contacts | named emergency and escalation contacts on both sides, reachable during the window. |

These turn an engagement from a risky activity into a controlled one. The lab's RoE validator flags missing stop conditions and contacts as HIGH, and requires operator tagging for deconfliction.
