> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Run the full verification workflow

**Objective:** Verify every enforcing control's hardening and review the telemetry, producing the consolidated assessment.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (firewall.py, segmentation.py, tlscheck.py, flowcheck.py, review.py, data/).

**Prerequisites:** Modules 1-7.

**Environment setup:** all tools run offline against the provided data files.

**Explicit authorised scope:** the lab assets you own; entirely offline. No action against any third-party system and no network scanning.

**Step-by-step instructions:**

1. Run firewall.py on rk_firewall.json and rk_firewall_fixed.json; record the findings before (4, 1 HIGH) and after (0).
2. Run segmentation.py on connections.json; record the three violations and confirm the hardened policy denies them.
3. Run tlscheck.py on tls_config.json and tls_config_fixed.json; record 6->0.
4. Run flowcheck.py; record the scan, beacon and segmentation violations.
5. Run review.py and confirm the consolidated summary (3/3 FAIL->PASS plus telemetry signals).
6. Write a one-page assessment: per layer, status, evidence, and (for monitoring) the containment recommendation.

**Expected observations (execution-tested):** firewall 4->0, segmentation 3->0, TLS 6->0, telemetry 1 scan + 1 beacon + 3 violations; review.py shows 3/3 FAIL->PASS.

**Troubleshooting:** if a "fixed" check is non-zero, confirm you passed the _fixed data file.

**Cleanup:** none (read-only, offline).

**Learning outcome:** you can verify network hardening and produce an evidence-backed assessment.

## Practical 2: Capstone - authorised network security assessment

**Objective:** Complete a full authorised network security assessment of the fictional organisation, moving every enforcing control from FAIL to PASS with evidence and documenting residual telemetry signals.

**Difficulty:** Intermediate (capstone).

**Required tools:** LAB_ASSETS/C07 (all tools and data).

**Prerequisites:** all modules and P1.

**Environment setup:** offline; lab assets only.

**Explicit authorised scope:** the lab assets you own; offline only. Never direct any technique at a system you do not own or lack written authorisation to test, and never scan, exploit or access third-party networks.

**Step-by-step instructions:**

1. Review every defence-in-depth layer and record its control and initial status.
2. For firewall, segmentation and TLS: run the check, record the findings, apply the hardened configuration, re-run, and record zero.
3. Analyse the flow telemetry; for the scan, beacon and each violation, state a containment action.
4. Run review.py for the consolidated control summary.
5. Produce the assessment report: executive summary, per-layer findings with evidence and before/after counts, telemetry signals with containment, and a conclusion that every enforcing control is verified PASS.
6. State the scope and authorisation under which the assessment was performed.

**Deliverable:** a consolidated network security assessment with reproducible evidence.

**Expected observations:** 3/3 enforcing controls verified FAIL->PASS; telemetry signals documented with containment.

**Troubleshooting:** ensure every claim traces to a tool output; re-run any check to reproduce.

**Cleanup:** none.

**Learning outcome:** you can perform and evidence a complete authorised network security assessment.
