> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Remediate design-review findings

------------------------------------------------------

**Objective:** Use arch_review.py and fix the catalogue.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; LAB_ASSETS/C22/arch_review.py.

**Prerequisites:** Lessons L03-L06.

**Environment setup:** copy the script.

**Explicit authorised scope:** fictional catalogue.

**Step-by-step instructions:**

1. Run python arch_review.py and record 9 findings.
2. Change the catalogue entries to implement the deep-dive design for payroll-export and fixes for customer-db and partner-sftp; rerun until 0 findings.
3. Add two new checks: (a) restricted data must not exist in non-production unmasked; (b) internet-facing services must have a WAF or API gateway.
4. Add a fifth service and review it.

**Expected observations:** 0 findings after remediation; new checks catch new gaps.

**Troubleshooting:** keep checks data-driven and explain each finding.

**Cleanup:** none.

**Learning outcome:** you can automate architecture guardrails.

## Practical 2: Classification and key-custody matrix

-----------------------------------------------------------

**Objective:** Define handling and custody for Tamarind's data.

**Difficulty:** Specialization.

**Required tools:** spreadsheet.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. List ten data stores with classification and personal-data flags.
2. For each, define encryption layer(s), key, key admins, key users, rotation, logging, and non-production handling.
3. Verify separation of duties for every restricted store.
4. Identify DPDP-relevant stores and retention rules.

**Expected observations:** restricted stores have CMKs with separated custody and field-level encryption where needed.

**Troubleshooting:** include backups and analytics copies.

**Cleanup:** none.

**Learning outcome:** you can design data protection end to end.
