> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

​### Objectives

Perform a complete, authorised, evidence-based network security assessment of the fictional organisation using only the offline lab assets you own, moving every enforcing control from FAIL to PASS with evidence and documenting the residual telemetry signals with containment.

​### Scenario

You are the network security engineer for a fictional organisation whose environment is modelled entirely by the lab assets (design, firewall policy, segmentation matrix, TLS config, flow telemetry). All assessment is offline, against assets you own; no live network, no scanning, nothing else in scope.

​### Requirements

1. Scope and authorisation: confirm the assessment is offline and against the lab assets only; state the out-of-scope (any live or third-party network) and stop conditions.
2. Review: walk every defence-in-depth layer and record the control and its initial status.
3. Firewall: run firewall.py on the pre-hardening and hardened policies; record 4 (1 HIGH) -> 0 and the principle behind each finding.
4. Segmentation: run segmentation.py; record the 3 violations and confirm the hardened matrix denies them.
5. Secure connectivity: run tlscheck.py on both configs; record 6 -> 0.
6. Monitoring: run flowcheck.py; record the scan, beacon and violations, each with a containment action.
7. Consolidate: run review.py; confirm 3/3 enforcing controls FAIL->PASS.
8. Mandatory gate: evidence that every step was performed offline, on the lab assets you own.

​### Deliverables

- A completed scope statement (offline, lab-assets-only, stop conditions).
- The saved tool outputs (firewall, segmentation, tlscheck, flowcheck, review) from data/.
- A written network security assessment: executive summary; per-layer findings with status, evidence and before/after counts; telemetry signals with containment; a conclusion that every enforcing control is verified PASS.
- A short note on how segmentation limited the damage from the beaconing host.

​### Rubric (0-4 per criterion; Competent = 3)

```text
Scope and authorisation: offline, lab-assets-only scope confirmed.
Review: every defence-in-depth layer covered with a status.
Firewall verification: 4->0 shown with the principle behind each finding.
Segmentation verification: 3 violations identified and denied.
TLS verification: 6->0 shown against current standards.
Monitoring: scan/beacon/violations identified with containment actions.
Consolidation: review.py summary with 3/3 FAIL->PASS and evidence.
Professionalism and ethics: offline-only respected; nothing out of scope;
  every claim traces to a reproducible output.
```

​### Professional skills

End-to-end network security assessment, control verification, firewall and segmentation review, TLS hardening verification, flow-telemetry analysis and containment planning, consolidated evidence-based reporting, and the discipline of offline, authorised, in-scope work.
