> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Extend vendor scoring with tiers

------------------------------------------------------

**Objective:** Add tiering and evidence tracking to the toolkit.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lessons L02-L03; Technical deep dive.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py vendor and record the results.
2. Add a TIER field per vendor, computed from data sensitivity, access and criticality.
3. For Tier 1, require evidence for every "yes" on critical items. Treat "yes without evidence" as unverified and approve with conditions.
4. Add a third vendor (a payroll SaaS) and assess it.

**Expected observations:** Tier 1 vendors without evidence cannot be unconditionally approved.

**Troubleshooting:** keep the questionnaire short.

**Cleanup:** none.

**Learning outcome:** you can build proportionate TPRM tooling.

## Practical 2: Draft security contract clauses

-----------------------------------------------------

**Objective:** Write clause outlines for a critical SaaS provider.

**Difficulty:** Professional.

**Required tools:** text editor.

**Prerequisites:** Lesson L04.

**Environment setup:** none.

**Explicit authorised scope:** drafting exercise (not legal advice).

**Step-by-step instructions:**

1. Draft outlines for security baseline, data protection (DPDP processor duties), incident notification (with a timeframe that supports CERT-In's 6 hours), audit rights, SLA/RTO/RPO, sub-processors, and exit.
2. For each clause, say how you will verify compliance during the relationship.
3. List three questions for your legal team.

**Expected observations:** notification at or under 24 hours; audit rights for Tier 1; data return and deletion at exit.

**Troubleshooting:** avoid unverifiable language such as "industry standard security".

**Cleanup:** none.

**Learning outcome:** you can specify contractual security.
