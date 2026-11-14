> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Map endpoint/identity techniques to telemetry

**Objective:** Produce the telemetry/detection/containment map for the identity steps.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (attackmap.py, data/emulation_plan.json).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** offline; no technique is run.

**Explicit authorised scope:** the provided plan file only.

**Step-by-step instructions:**

1. Run attackmap.py on the plan and locate the identity techniques (T1078, T1087, T1550).
2. For each, record the data source, detection and containment.
3. Explain why each detection is behavioural, not signature-based.
4. State which telemetry must be collected to support each detection.
5. Note which detection you would expect to be a gap.

**Expected observations (execution-tested):** identity techniques mapped to authentication/directory telemetry, behavioural detections and containment.

**Troubleshooting:** ensure the plan file is present.

**Cleanup:** none.

**Learning outcome:** you can turn identity techniques into telemetry and detection requirements.

## Practical 2: Privilege-boundary and credential-exposure review (design)

**Objective:** Design a privilege-boundary and credential-exposure review for a lab host.

**Difficulty:** Advanced.

**Required tools:** this module; Course 13 concepts.

**Prerequisites:** Lessons L01-L06.

**Environment setup:** none (design/plan) for your own lab host.

**Explicit authorised scope:** your own lab host/accounts; design only.

**Step-by-step instructions:**

1. List the privilege boundaries to check (user->admin, tiering, least privilege).
2. List credential-exposure checks (at rest, cached, in transit, reuse).
3. For each potential finding, state the telemetry and detection that should catch its abuse, and the containment.
4. State the authorisation, isolation and data-handling rules you would apply.
5. Explain how you keep the review non-destructive (no lockouts).

**Expected observations:** a telemetry- and containment-linked review plan, authorised and non-destructive.

**Troubleshooting:** if a step risks lockout or touches real credentials, re-scope to lab accounts.

**Cleanup:** none.

**Learning outcome:** you can plan an authorised, telemetry-linked identity review.
