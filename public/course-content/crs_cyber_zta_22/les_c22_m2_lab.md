> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Explore and extend the policy model

---------------------------------------------------------

**Objective:** Run the PDP and add identity conditions.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; LAB_ASSETS/C22/zt_pdp.py.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python zt_pdp.py and python -m unittest zt_pdp; record results.
2. Add a "session_age_hours" attribute; require re-authentication for restricted resources if older than 8 hours (STEP_UP).
3. Add a "break-glass" group that is allowed only with FIDO2 and always produces an alert flag in the log.
4. Add tests for both rules.

**Expected observations:** 8+ tests pass; break-glass decisions are logged with an alert flag.

**Troubleshooting:** keep default deny for unknown resources.

**Cleanup:** none.

**Learning outcome:** you can express identity policy precisely.

## Practical 2: Privileged access design

----------------------------------------------

**Objective:** Design tiered privileged access for Tamarind.

**Difficulty:** Specialization.

**Required tools:** text editor.

**Prerequisites:** Lesson L06.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. Classify admin roles into tiers 0-2.
2. For each tier: identities, devices (PAW?), authentication, JIT duration, approval, session recording, logging.
3. Design break-glass: number of accounts, storage, alerting, testing.
4. List five detections for privileged misuse.

**Expected observations:** zero standing tier-0 rights; PAWs for tier-0; alerts on break-glass use.

**Troubleshooting:** include cloud organisation and IdP admins in tier 0.

**Cleanup:** none.

**Learning outcome:** you can design privileged access architecture.
