> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Build the tiered organisation

**Objective:** Populate the domain with OUs, users, groups, a fine-grained password policy and a GPO, and read the policy back.

**Difficulty:** Intermediate.

**Required tools:** the running rk-dc container; setup_domain.sh.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** ensure rk-dc is running (Module 1).

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. docker cp setup_domain.sh rk-dc:/setup.sh && docker exec rk-dc sh /setup.sh ; read the summary.
2. docker exec rk-dc samba-tool domain passwordsettings show ; record the domain default minimum length.
3. docker exec rk-dc samba-tool domain passwordsettings pso show ServiceAccountPSO ; compare its minimum length with the domain default.
4. docker exec rk-dc samba-tool spn list legacy-svc ; confirm the SPN.
5. docker exec rk-dc samba-tool gpo listall ; confirm the new GPO (point the resolver at the DC first if it cannot find a DC).

**Expected observations (execution-tested):** the PSO (25-char minimum), the SPN on legacy-svc, and the GPO, as in section 3; the domain default minimum is 7.

**Troubleshooting:** "already exists" messages on re-runs are harmless (the script is idempotent); "Could not find a DC" is DNS (Module 1).

**Cleanup:** none (later modules use this structure).

**Learning outcome:** you can build and verify a tiered organisation with selective password hardening.

## Practical 2: Review a privileged group

**Objective:** Enumerate a privileged group and apply governance thinking.

**Difficulty:** Intermediate.

**Required tools:** the running rk-dc container.

**Prerequisites:** Lesson L06.

**Environment setup:** none beyond P1.

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. docker exec rk-dc samba-tool group listmembers "Domain Admins" ; record the members.
2. For each member, state in one line why they do or do not belong there.
3. Propose an owner and a review cadence for Domain Admins, and one control that would reduce standing membership (for example time-bound elevation).
4. Write a one-paragraph governance note as if for the CISO.

**Expected observations (execution-tested):** t0-admin is the only added member of Domain Admins (plus the built-in Administrator); ordinary staff and service accounts are absent.

**Troubleshooting:** an empty result means setup_domain.sh did not run; re-run P1.

**Cleanup:** none.

**Learning outcome:** you can review a privileged group and recommend governance.
