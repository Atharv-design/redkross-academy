**A useful ladder:**

1. Fully automate read-only, reversible, low-impact steps: enrichment (asset owner, user's department, IP reputation), deduplication, case creation, evidence collection that does not alter the host, and notifications.
2. Automate with a human approval: containment of ordinary assets (isolate a workstation, disable a standard user), blocking an indicator in a protective DNS service.
3. Keep manual, with automation only for preparation: actions on crown-jewel systems (domain controllers, payment systems), mass actions, anything destructive (reimage, delete), and actions with legal or regulatory weight (notifying regulators or customers).

The more irreversible and widespread the effect, the further down the ladder the step belongs. Automation is excellent at the first rung: the Tamarind playbook enriches, collects and notifies without approval, but waits for a person before isolating WS-07.
