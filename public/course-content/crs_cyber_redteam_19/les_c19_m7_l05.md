**Retesting closes the loop:**

| Term | Meaning |
|---|---|
| engineer | build the missing telemetry/detection for each gap. |
| re-emulate | run the SAME technique again in the isolated range. |
| confirm | verify the detection now fires; if not, re-tune and repeat. |

Retesting is what makes the improvement real and verified - the same prove-the-fix discipline as the retests in earlier courses (penetration-test retest, control FAIL->PASS). A gap is not closed until a re-emulation detects it. The retest list from the gap analysis drives this cycle. The lab's purple.py emits a retest list naming, for each gap, the detection to build and the technique to re-emulate.
