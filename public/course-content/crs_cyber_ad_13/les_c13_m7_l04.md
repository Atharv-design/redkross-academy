Findings must be ranked so the plan tackles the worst first. A simple, defensible scheme combines IMPACT (what an attacker gains) and EXPLOITABILITY or EFFORT:

| Term | Meaning |
|---|---|
| HIGH | direct path to domain/forest compromise or trivial escalation (unconstrained delegation off a DC; Kerberoastable privileged account; AS-REP roastable admin). Fix first. |
| MEDIUM | weakens a control but needs chaining (non-expiring service password; RC4 enabled; weak PSO coverage). |
| LOW | hygiene debt (dormant enabled accounts, stale objects). |

The lab tool already assigns HIGH/MEDIUM/LOW on this logic; the reviewer adjusts for context (a MEDIUM on a crown-jewel system may be a HIGH). Tie the score to the risk the organisation already understands (Course 17), not to a tool's default label alone.
