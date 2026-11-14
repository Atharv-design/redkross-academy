LAB_ASSETS/C20/soar.py (execution-tested, CPython 3.14.4) builds cases from rk_sigma rule hits, resolves IP addresses to hosts with a fictional CMDB, plans steps and applies a single decision function:

```text
BEGIN CODE
def decide(action, gated, tier, approvers, already_done, execute, contained):
    need = (2 if tier == 0 else 1) if gated else 0
    if already_done:          return "SKIP-ALREADY-DONE"
    if not execute:           return "WOULD-RUN" or "WOULD-WAIT-APPROVAL(n/need)"
    if len(approvers) < need: return "BLOCKED-NEEDS-APPROVAL(n/need)"
    if containment and contained >= MAX_CONTAINMENT: return "BLOCKED-RATE-LIMIT"
    return "SIMULATED-OK"
END CODE
```

(Condensed; see the source for the exact code.) Connectors only print SIMULATED; no real system is touched. Self-test and runs (execution-tested, 2026-11-07):

```output
$ python soar.py --selftest
PASS tier-0 isolate, one approver       BLOCKED-NEEDS-APPROVAL(1/2)
PASS tier-0 isolate, two approvers      SIMULATED-OK
PASS same approver twice counts once    BLOCKED-NEEDS-APPROVAL(1/2)
PASS rate limit reached                 BLOCKED-RATE-LIMIT
PASS dry-run never executes             WOULD-RUN
PASS idempotent                         SKIP-ALREADY-DONE
PASS ungated enrichment                 SIMULATED-OK
7 checks, 0 failed

$ python soar.py
Mode: DRY-RUN
CASE-WS-07  alerts=88  distinct_rules=7  max_severity=3  asset=finance workstation tier=2
  enrich_asset             gated=False approvers=-              -> WOULD-RUN
  collect_triage_package   gated=False approvers=-              -> WOULD-RUN
  notify_owner             gated=False approvers=-              -> WOULD-RUN
  isolate_host             gated=True  approvers=-              -> WOULD-WAIT-APPROVAL(0/1)

$ python soar.py --execute
  isolate_host             gated=True  approvers=-              -> BLOCKED-NEEDS-APPROVAL(0/1)

$ python soar.py --execute isolate_host:CASE-WS-07:asha.ir
  enrich_asset             gated=False approvers=-              -> SKIP-ALREADY-DONE
  isolate_host             gated=True  approvers=asha.ir        -> SIMULATED-OK

$ python soar.py --execute isolate_host:CASE-WS-07:asha.ir   (re-run)
  isolate_host             gated=True  approvers=asha.ir        -> SKIP-ALREADY-DONE
audit lines: 16
```

**Interpretation:**

- Entity resolution merged the 82 DNS alerts into CASE-WS-07. Before that step was added, the first test run produced two cases, CASE-10.20.1.17 and CASE-WS-07, and the DNS case did not qualify for containment.
- The isolate step is planned only when a case has a high-severity alert and at least three distinct rules. This is a deliberately conservative trigger, which you will critique in P2.
- The re-run proves idempotency: nothing is repeated.

**Limitations:** approvals are passed on the command line (in production they come from an authenticated approval system); the rate limit is per run, not per hour; asset tiers are hard-coded.
