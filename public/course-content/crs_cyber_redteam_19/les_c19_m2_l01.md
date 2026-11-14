Adversary emulation reproduces the observable BEHAVIOUR of a specific, relevant threat actor or threat type, in order to test detection and response. It differs from arbitrary penetration testing in three ways:

| Term | Meaning |
|---|---|
| threat-informed | the behaviours emulated are chosen because a relevant adversary uses them, not because they are convenient. |
| behaviour-led | the goal is to produce the adversary's techniques (so defenders can try to detect them), not merely to "get in". |
| detection-first | success is measured by what the blue team saw and did, as much as by what the red team achieved. |

Emulation is the core of modern red teaming and of purple teaming (Module 7). It is expressed in the shared language of ATT&CK so that red findings map directly to blue detections. The lab's emulation plan is a sequence of ATT&CK techniques to emulate inside an isolated range, each tied to a detection.
