> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Map and critique the tier model

**Objective:** Map the lab's accounts to tiers and identify the containment violations a single host forces.

**Difficulty:** Intermediate.

**Required tools:** the running rk-dc container (Modules 1, 3).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** ensure setup_domain.sh has run (Module 3 P1).

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. List the members of Domain Admins, Server-Admins and Helpdesk with samba-tool group listmembers; map each account to a tier.
2. For each tier, state which systems its admin account may log on to under the model.
3. Identify where the single-container lab violates the model and describe how a PAW and separate hosts would fix it.
4. Write a one-paragraph "target state" describing Tier 0 administration from a PAW.

**Expected observations (execution-tested):** t0-admin in Domain Admins, t1-srvadm in Server-Admins, t2-help (and asha) in Helpdesk; the violation is that Tier 0 is administered from the same host as everything else.

**Troubleshooting:** empty groups mean setup_domain.sh did not run.

**Cleanup:** none.

**Learning outcome:** you can map accounts to tiers and reason about containment.

## Practical 2: Plan Protected Users and LAPS adoption

**Objective:** Decide which accounts should join Protected Users and plan LAPS, without breaking service accounts.

**Difficulty:** Intermediate.

**Required tools:** the lab directory listing; this module.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** planning exercise on lab data only.

**Step-by-step instructions:**

1. List every account and classify it as admin, staff, or service.
2. For each, decide whether it should join Protected Users, and justify it; explicitly exclude legacy-svc and explain why.
3. State two effects membership has on an admin account (from L05).
4. Write a one-line plan for managing local administrator passwords with LAPS and why unique per-host passwords matter (CS1).

**Expected observations:** admin accounts (t0-admin, t1-srvadm) are candidates; service and computer accounts are excluded; Protected Users forces AES-only and a four-hour TGT.

**Troubleshooting:** none (planning exercise).

**Cleanup:** none.

**Learning outcome:** you can apply built-in protections without breaking services.
