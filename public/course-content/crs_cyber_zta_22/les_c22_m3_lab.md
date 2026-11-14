> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Map tenets to Tamarind's design

-----------------------------------------------------

**Objective:** Assess the shipment platform against the seven tenets.

**Difficulty:** Specialization.

**Required tools:** text editor; Module 1 architecture pack.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. For each tenet, state where Tamarind meets it, partially meets it or does not.
2. Identify where PEPs sit for: staff web apps, admin consoles, partner APIs, service-to-service calls, legacy depot app.
3. Identify PDP inputs available today and missing ones.
4. Propose three changes with highest risk reduction.

**Expected observations:** gaps in tenet 2 (internal traffic encryption) and tenet 3 (long-lived sessions) are common; legacy app needs an enclave gateway.

**Troubleshooting:** be specific about components.

**Cleanup:** none.

**Learning outcome:** you can evaluate designs against zero trust principles.

## Practical 2: CISA ZTMM self-assessment

-----------------------------------------------

**Objective:** Rate Tamarind on the five pillars and plan targets.

**Difficulty:** Specialization.

**Required tools:** CISA ZTMM v2.0 [R2]; spreadsheet.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** fictional organisation.

**Step-by-step instructions:**

1. For each pillar and cross-cutting capability, pick the current stage (Traditional/Initial/Advanced/Optimal) with evidence.
2. Set 12- and 24-month targets.
3. Identify cross-pillar dependencies (e.g., device posture -> identity).
4. Draft five roadmap items (feeds Module 8).

**Expected observations:** Identity often leads; Data and Visibility lag.

**Troubleshooting:** justify each stage with an observable fact.

**Cleanup:** none.

**Learning outcome:** you can baseline zero trust maturity.
