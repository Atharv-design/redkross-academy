Emulating C2 safely means producing its INDICATORS without any real adversary channel:

| Term | Meaning |
|---|---|
| lab sink | the emulated beacon connects to a sink inside the isolated range (loopback/lab host), never to a real external server - no real egress. |
| indicator-only | the goal is to generate the detectable footprint (periodic beacon) so the blue team's detection can be tested, not to establish control of anything. |
| isolated | all of it in the isolated, simulation-only range (this course's lab is offline; its C2 indicators use the range only). |

This is why the course contains no C2 framework or implant: the defensive learning - detect the beacon, contain the egress - needs only the indicator, which can be produced harmlessly. Building or operating real C2 against systems you do not control is unlawful (IT Act, 2000). This is not legal advice.
