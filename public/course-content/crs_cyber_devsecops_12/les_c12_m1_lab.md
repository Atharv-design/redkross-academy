> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Write testable security requirements

----------------------------------------------------------

**Objective:** Produce security requirements for a feature and link them to tests.

**Difficulty:** Advanced.

**Required tools:** text editor; the OWASP ASVS 5.0 document [R2]; LAB_ASSETS/C12/app.

**Prerequisites:** Lesson L03.

**Environment setup:** none.

**Explicit authorised scope:** documentation and your own lab code.

**Step-by-step instructions:**

1. Feature: "customers can download a PDF proof of delivery for their shipment".
2. Write six security requirements covering authentication, authorisation, input validation, output handling, logging and rate limiting. Map each to an ASVS chapter.
3. For each, write the acceptance test in one sentence.
4. Implement one of them as a unit test in the style of test_shipments.py.
5. Run python -m unittest -v and record the result.

**Expected observations:** the authorisation requirement mirrors REQ-AUTHZ-01. The test fails until the code enforces ownership.

**Troubleshooting:** if ASVS chapter names differ from your notes, use the current document's numbering.

**Cleanup:** none.

**Learning outcome:** you can turn risk into testable requirements.

## Practical 2: Design a gate policy

------------------------------------------

**Objective:** Define gates, thresholds and a waiver process for a service.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lesson L05; Technical deep dive.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise.

**Step-by-step instructions:**

1. Choose stages for each gate and justify them by speed and risk.
2. Define blocking thresholds and how existing findings are handled.
3. Write the waiver template and its approval chain.
4. Describe how you will test that each gate actually fails, using a known-bad commit.
5. Define three metrics to report monthly.

**Expected observations:** new-findings-only blocking, expiring waivers and gate self-tests.

**Troubleshooting:** keep total pull-request gate time under about 10 minutes, or developers will work around the gates.

**Cleanup:** none.

**Learning outcome:** you can design gates that teams accept.
