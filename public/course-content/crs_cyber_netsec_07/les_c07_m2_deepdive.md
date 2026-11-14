LAB_ASSETS/C07/firewall.py evaluates flows and lints a policy against NIST SP 800-41r1 best practice. Execution-tested (CPython 3.14.4, 2026-11-08) on the pre-hardening policy (data/rk_firewall.json):

```output
Firewall policy lint: rk_firewall.json (6 rules)
  [HIGH  ] no explicit default-deny rule ends the policy
  [MEDIUM] rule 4 is shadowed by earlier rule 3
  [MEDIUM] no outbound (egress) rules found
  [LOW   ] rule 3 allows a wide port range 1-65535
4 findings (1 HIGH).
```

**Reading the findings:**

- No default-deny (HIGH): the policy does not end with "deny any any"; on a first-match firewall this can leave unmatched traffic permitted depending on the device default - a dangerous ambiguity. The fix is an explicit final deny.
- Rule 4 shadowed by rule 3: rule 3 is "user -> any : 1-65535 ALLOW", which already matches everything rule 4 (user -> db : 5432) would, so rule 4 can never fire. Worse, rule 3 itself is the real problem - it lets users reach anything.
- No egress rules: outbound is unfiltered.
- Over-broad port range: rule 3 allows all 65535 ports.

Evaluating specific flows makes the effect concrete:

```output
flow user->db tcp/5432 : rule 3 -> ALLOW (users may reach anything)
flow internet->db tcp/5432 : no rule matched (implicit deny)
# hardened policy:
flow user->db tcp/5432 : rule 7 -> DENY (users never reach the database)
flow internet->db tcp/5432 : rule 8 -> DENY (default deny)
```

The hardened policy (data/rk_firewall_fixed.json) replaces the broad rule with least-privilege allows, adds an explicit user->db DENY and a specific egress allow, and ends with default-deny. Linting it reports zero findings:

```output
Firewall policy lint: rk_firewall_fixed.json (9 rules)
  no issues found.
0 findings (0 HIGH).
```

**The lesson:** a policy is an ordered program; evaluate it to know what it does, lint it to catch the recurring weaknesses, and end it with default-deny.
