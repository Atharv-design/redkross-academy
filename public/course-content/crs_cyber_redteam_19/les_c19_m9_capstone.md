> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

​### Objectives

Run a complete, authorised, FULLY ISOLATED adversary-emulation exercise end to end - from the RoE gate through a threat-informed, in-scope plan, emulation with evidence, technique-to-detection mapping and purple-team gap analysis - and deliver EXECUTIVE and TECHNICAL reports with a retest list, every statement evidence-traced. Offline throughout; no exploit tooling; no third-party or production system.

​### Scenario

You are the engagement lead for a fictional organisation's internal red/purple team. You run an adversary-emulation exercise against the organisation's OWN isolated lab range (the lab's artifacts), on lab accounts and synthetic data, under a signed authorisation. Everything is offline and isolated; nothing out of scope is touched.

​### Requirements

1. Gate: run roe.py to PASS (authorised, scoped, safety-bounded); fix any FAIL.
2. Plan: validate the threat-informed, ATT&CK-mapped emulation plan is safe and in scope (emulation_plan.py); enforce scope (scopecheck.py).
3. Run + evidence: (conceptually) emulate each technique in the isolated range under its simulation boundary; record evidence with chain of custody (evidence.py).
4. Map: map each technique to telemetry, detection and containment (attackmap.py), including the Lateral Movement and Command and Control views.
5. Measure: run the purple-team gap analysis (purple.py); record coverage, gaps and the retest list.
6. Report: assemble the executive and technical reports (report.py); write them up, every statement traced to the plan, telemetry and evidence.
7. Mandatory gate: evidence that the exercise was offline and fully isolated, on the lab's own artifacts, with no exploit tooling and no third-party/production system.

​### Deliverables

- The passing RoE and the validated, in-scope emulation plan.
- The scope-enforcement result and the verified evidence chain.
- The technique-to-telemetry/containment map (including LM and C2 views).
- The purple-team gap analysis (coverage 4/7, three gaps, retest list).
- An EXECUTIVE report (scope, authorisation, coverage, risk, top recommendations) and a TECHNICAL report (per-technique DETECTED/GAP, containment, retest list), every statement evidence-traced, recording the isolation and scope.

​### Rubric (0-4 per criterion; Competent = 3)

```text
Engagement engineering: RoE gated to PASS; authorisation and safety controls present.
Emulation planning: threat-informed, ATT&CK-mapped, in-scope, safety-bounded plan.
Scope and evidence: fail-safe scope enforcement; tamper-evident chain of custody.
Detection mapping: each technique mapped to telemetry, detection and containment.
Purple teaming: coverage measured; gaps diagnosed; retest list produced.
Reporting: executive and technical reports; honest coverage; evidence-traced.
Professionalism and ethics: offline, fully isolated, authorised; no exploit tooling;
  no third-party/production system; no overstatement.
```

​### Professional skills

Engagement engineering and rules of engagement, threat-informed emulation planning with ATT&CK, scope enforcement and evidence/chain-of-custody, technique-to-detection mapping, purple-team detection-gap analysis and retesting, and executive/technical reporting - all conducted safely and within authorisation and isolation.
