Simulation boundaries are the safety limits on HOW a technique is emulated:

```text
isolation      run inside the isolated range, not production.
lab assets     use lab accounts and synthetic data, never real credentials or
               user data.
non-destructive emulate the behaviour's observable signal without destructive
               effect (e.g. produce a benign beacon to a lab sink rather than real
               C2 egress; stage synthetic files rather than exfiltrate real data).
rate/impact    limit intensity to avoid affecting availability.
```

Boundaries are what let an engagement emulate dangerous-looking behaviour safely - the technique's detectable footprint is produced, but nothing harmful happens. Every step in the lab's plan carries an explicit safety_control, and the plan validator requires it. This course's whole lab is simulation-only and offline.
