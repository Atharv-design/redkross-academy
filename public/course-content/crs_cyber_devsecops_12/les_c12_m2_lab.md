> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Threat model a feature

--------------------------------------------

**Objective:** Produce a DFD, a STRIDE threat list and abuse cases for a feature.

**Difficulty:** Advanced.

**Required tools:** paper or any diagram tool; text editor.

**Prerequisites:** Lessons L02-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise for the fictional service.

**Step-by-step instructions:**

1. Feature: "customers can upload a photo of a damaged parcel; staff review it".
2. Draw the DFD with at least two trust boundaries.
3. Apply STRIDE to each element and boundary-crossing flow, and write at least eight threats.
4. Turn the top three into abuse cases with expected behaviour, mitigation and test.
5. Note one supply-chain or pipeline threat.

**Expected observations:** threats such as unvalidated file types and sizes, access to other customers' photos, image-processing library vulnerabilities and missing audit of staff views.

**Troubleshooting:** if threats are vague, rewrite them as "who can do what to which element".

**Cleanup:** none.

**Learning outcome:** you can run a structured design review.

## Practical 2: Prioritise with the register

--------------------------------------------------

**Objective:** Extend threat_register.py and apply decision rules.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C12/threat_register.py.

**Prerequisites:** Lesson L06.

**Environment setup:** copy the script.

**Explicit authorised scope:** your copy of the lab script.

**Step-by-step instructions:**

1. Add your eight threats from P1 with likelihood and impact.
2. Add a rule that flags any impact-5 entry that has no decision ("done", "accepted until <date>").
3. Add an "accepted until" status and fail (exit code 1) if any acceptance has expired.
4. Run the script and record the output.

**Expected observations:** the build-pipeline entry is flagged by the impact-5 rule despite its score of 10.

**Troubleshooting:** compare dates with datetime.date.fromisoformat.

**Cleanup:** none.

**Learning outcome:** you can make prioritisation transparent and enforceable.
