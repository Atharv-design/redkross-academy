> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Requirements and trust boundaries

-------------------------------------------------------

**Objective:** Produce architecture requirements and a zone/boundary model.

**Difficulty:** Specialization.

**Required tools:** text editor or diagram tool.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** none.

**Explicit authorised scope:** fictional system.

**Step-by-step instructions:**

1. For Tamarind's shipment platform (deep dive), write eight testable architecture requirements traced to risks or obligations (include CERT-In log retention and DPDP safeguards).
2. Draw the zones Z0-Z6 and every boundary crossing.
3. For each boundary, list authentication, authorisation, validation and logging controls.
4. Identify the management-plane boundaries and their extra controls.

**Expected observations:** management plane and CI/CD boundaries require the strongest controls; data tier has no direct user path.

**Troubleshooting:** if a boundary has no control, it is a finding.

**Cleanup:** none.

**Learning outcome:** you can make trust explicit.

## Practical 2: Views and an ADR

--------------------------------------

**Objective:** Produce three views and one architecture decision record.

**Difficulty:** Specialization.

**Required tools:** diagram tool (or ASCII).

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional system.

**Step-by-step instructions:**

1. Draw context, data-flow (with classification labels) and identity views.
2. Write an ADR: "Legacy depot terminal application stays on-premises behind an identity-aware gateway for 12 months" - with alternatives, consequences and residual risk.
3. Link the ADR to the relevant risk and exception (Course 17).

**Expected observations:** ADR records compensating controls and a retirement date.

**Troubleshooting:** keep each view to one page.

**Cleanup:** none.

**Learning outcome:** you can document architecture for different audiences.
