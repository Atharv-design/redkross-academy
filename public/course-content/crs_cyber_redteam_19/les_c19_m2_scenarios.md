Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A manager asks why you emulate specific ATT&CK techniques instead of "just hacking in".

**Task:** Explain threat-informed, detection-first emulation.

> [!TIP] Model answer
> Emulating specific ATT&CK techniques tests the defences that matter against the threats the organisation actually faces, and expresses findings in a shared language the blue team can act on. "Just hacking in" might find one path but teaches little about detection coverage. Threat-informed, detection-first emulation measures what the blue team saw for each technique, which is the point of the exercise.
>
> **Lesson:** emulate the relevant adversary and measure detection, not just access.

## Scenario 2

A plan step would emulate C2 by beaconing to a real external server.

**Task:** Explain the simulation boundary that makes this safe instead.

> [!TIP] Model answer
> Beaconing to a real external server would create real egress and could reach an uncontrolled destination. The simulation boundary is to beacon to a LAB SINK inside the isolated range (no real egress), producing the same detectable periodic-beacon footprint the blue team must catch, with nothing leaving the range. This tests the detection safely.
>
> **Lesson:** produce the technique's detectable signal inside the range without real egress.

## Scenario 3

A plan step targets a host outside the authorised range.

**Task:** Explain what the plan validation does and why.

> [!TIP] Model answer
> The plan validation checks every step's target against the authorised scope; a target outside the range is a finding and the plan FAILS until corrected. This prevents the plan from ever directing activity out of scope - a safety control built into planning.
>
> **Lesson:** plan validation enforces scope before anything runs.
