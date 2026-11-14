> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: API configuration review (FAIL to PASS)

**Objective:** Review the insecure and hardened API configurations and explain each control.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (apicheck.py, data/api_config.json, data/api_config_fixed.json).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** offline; no live API is called.

**Explicit authorised scope:** the provided configuration files only.

**Step-by-step instructions:**

1. Run apicheck.py on api_config.json; record the findings (expect 7, 5 HIGH, FAIL).
2. Map each finding to AUTH / TRANSPORT / AUTHZ / HARDEN.
3. Run apicheck.py on api_config_fixed.json; confirm PASS.
4. For each HIGH finding, name the control that fixes it.
5. Explain why each control must be server-side.

**Expected observations (execution-tested):** insecure 7 findings/5 HIGH/FAIL; hardened 0/PASS.

**Troubleshooting:** confirm you point at the correct JSON file.

**Cleanup:** none.

**Learning outcome:** you can review and harden a mobile API configuration.

## Practical 2: Map findings to the OWASP API Security Top 10

**Objective:** Relate the review findings to the OWASP API Security Top 10.

**Difficulty:** Advanced.

**Required tools:** this module; the apicheck output; the OWASP API Security Top 10.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none (analysis).

**Explicit authorised scope:** the lab configurations; analysis only.

**Step-by-step instructions:**

1. For each insecure-config finding, name the matching OWASP API risk.
2. Explain why "the client is untrusted" means each must be server-side.
3. For a live API test of these, state the authorisation and scope you would require, and the do-no-harm limits for rate-limit testing.

**Expected observations:** findings mapped to OWASP API risks; a correct authorised testing framing.

**Troubleshooting:** if a mapping is unclear, re-read L05.

**Cleanup:** none.

**Learning outcome:** you can relate mobile API findings to the standard and test them safely.
