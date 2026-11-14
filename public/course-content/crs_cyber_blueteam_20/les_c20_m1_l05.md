A coverage matrix joins three inventories: telemetry, priority techniques and the detection pack. Scoring should be ordinal and honest. This course uses:

| Term | Meaning |
|---|---|
| 0  blind | the telemetry the technique needs is not collected |
| 1  visible | telemetry exists, but no rule |
| 2  detected | a rule exists, but it has no passing unit test |
| 3  tested | a rule exists and passes its unit tests |

A score is an upper bound when telemetry comes from only part of the fleet. Tamarind's Windows Security events arrive from only 4 of 16 hosts, so the scheduled-task rule earns a 3 for those four hosts and nothing for the rest. The matrix marks such rows with an asterisk.

Coverage is not efficacy. A tested rule may still miss variants (Module 7) or drown analysts in false positives (Module 4). Report coverage together with the purple-team detection rate and the false-positive volume per rule. Avoid colour-coded ATT&CK heat maps that show a technique as "covered" because one rule mentions it. A single narrow rule rarely covers a whole technique.
