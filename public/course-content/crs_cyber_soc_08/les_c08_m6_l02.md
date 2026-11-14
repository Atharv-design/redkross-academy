```text
Signature / atomic   exact value match (hash, domain). Precise, brittle
                     (bottom of the Pyramid of Pain, Module 5).
Behavioural          a pattern of activity independent of specific values:
                     Word spawning PowerShell (R1), a security log
                     cleared (R5). More durable.
Threshold            count over a window: five or more users failing from
                     one IP (R2 component).
Sequence/correlation ordered events across sources (R2: failures then
                     success).
Statistical/anomaly  deviation from a baseline: an upload far larger than
                     a user's normal (R4 uses a fixed 10 MB threshold - a
                     simple approximation); regularity of requests (R6).
```

Design questions for every rule: what exactly is the behaviour; which field values are attacker-controlled (and can be changed to evade); what is the legitimate look-alike; what context makes it more suspicious (unusual parent, rare host, privileged user)?

**Example:** detecting "powershell.exe" by process name alone is evaded by copying the binary to another name. Better options include the OriginalFileName field in Sysmon or EDR events and parent-child relationships, combined with command-line indicators such as encoded commands.
