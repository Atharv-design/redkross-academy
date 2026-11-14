> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Randomness and entropy

--------------------------------------------

**Objective:** Reproduce the lab and audit token generation.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C15/m01_randomness.py.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** none.

**Explicit authorised scope:** your own machine and lab code.

**Step-by-step instructions:**

1. Run python m01_randomness.py and confirm that tokens A and B match.
2. Change the seed to the current Unix time and run it twice within the same second. Explain the result.
3. Write a function new_reset_token() using secrets, and a test that 1,000 generated tokens are unique and 43 characters long.
4. Calculate the entropy of a 10-character password from a 62-character alphabet, assuming random choice, and say why a human-chosen 10-character password has far less.

**Expected observations:** identical tokens with identical seeds; about 59.5 bits for step 4.

**Troubleshooting:** if tokens differ in step 2, the runs crossed a second boundary, so run them together in one script.

**Cleanup:** none.

**Learning outcome:** you can choose and justify randomness sources.

## Practical 2: Threat model a crypto feature

---------------------------------------------------

**Objective:** Write a short threat model for encrypted payroll exports.

**Difficulty:** Intermediate.

**Required tools:** text editor.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. List the assets, adversaries and their capabilities, and the data lifetime.
2. Choose primitives and key storage, and justify them.
3. List five failure modes and their mitigations.
4. State what the design does not protect against, such as a compromised payroll workstation.

**Expected observations:** an AEAD with KMS-wrapped data keys, access logging, key separation, and an explicit endpoint limitation.

**Troubleshooting:** keep to one page.

**Cleanup:** none.

**Learning outcome:** you can reason about cryptography before coding.
