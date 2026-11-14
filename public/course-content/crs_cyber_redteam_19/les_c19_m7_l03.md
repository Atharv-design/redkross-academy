Detection coverage is the fraction of relevant adversary techniques the organisation can detect. A GAP is a technique with no (or inadequate) detection:

```text
measured against the emulated techniques (and, more broadly, the ATT&CK techniques
               relevant to the threat profile).
gap types       no telemetry (the data is not collected), no rule (telemetry exists
               but nothing alerts), or a mis-tuned rule (alerts missed or buried).
prioritise      gaps for the most relevant/impactful techniques first.
```

Coverage turns "are we secure?" into a concrete, technique-by-technique measurement. The purple-team exercise produces a coverage figure (detected / emulated) and the list of gaps. The lab's analysis reports both. Coverage is improved by closing gaps, not by emulating more.
