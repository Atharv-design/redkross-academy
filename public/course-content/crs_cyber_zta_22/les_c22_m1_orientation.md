## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

Lab assets (LAB_ASSETS/C22/)

```text
zt_pdp.py            a policy decision point teaching model (policy engine
                     + enforcement) with nine sample requests and 6 tests
segmentation_lab.sh  three-tier micro-segmentation on Docker networks with
                     a connectivity matrix and an internal (no-egress)
                     data network
arch_review.py       a design-review checker for classification, key
                     custody, TLS, logging retention, resilience, MFA and
                     exposure guardrails
resilience_review.py monitoring and resilience design review (telemetry
                     coverage, retention, integrity, failure modes,
                     backups, incident readiness)
make_decision_log.py deterministic synthetic zero trust telemetry
decision_monitor.py  continuous-verification signals M1-M5 over that log
control_matrix.py    requirement-to-evidence traceability matrix with
                     SHA-256 hashes of evidence files
roadmap_check.py     consistency checker for a ZTMM-based roadmap
solutions/           model solutions for the course tasks
```

**Saved outputs:** `*_output.txt` (execution-tested 2026-11-07/08: CPython 3.14.4; Docker 29.4.2 with alpine:3.20). The organisation "Tamarind Logistics" and all identities, services and networks are fictional; the segmentation lab uses only local Docker networks and removes them afterwards.

**Access classification note:** per the blueprint, Course 22 is "PAID premium".
