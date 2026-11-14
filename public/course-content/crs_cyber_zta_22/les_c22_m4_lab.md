> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the segmentation lab

---------------------------------------------------------

**Objective:** Verify and extend a three-tier segmentation.

**Difficulty:** Specialization.

**Required tools:** Docker; Git bash or Linux shell; LAB_ASSETS/C22.

**Prerequisites:** Lessons L01-L02, L05.

**Environment setup:** from LAB_ASSETS/C22: sh segmentation_lab.sh

**Explicit authorised scope:** local Docker networks created and removed by the script.

**Step-by-step instructions:**

1. Run the lab and record the matrix.
2. Add a fourth container "tl-admin" on a new network tl-mgmt connected only to tl-app; verify admin->app works and admin->db and web->admin fail.
3. Add a probe that confirms web cannot reach the db even by IP after you attach web to a third, unrelated network.
4. Write the flow matrix for your extended lab and mark each probe as evidence.

**Expected observations:** only intended flows succeed; db egress remains blocked.

**Troubleshooting:** if networks remain after an error, remove them with docker network rm.

**Cleanup:** the script removes containers and networks; verify with docker network ls.

**Learning outcome:** you can design and verify segmentation.

## Practical 2: Remote access modernisation plan

------------------------------------------------------

**Objective:** Plan replacement of a legacy VPN with per-app access.

**Difficulty:** Specialization.

**Required tools:** text editor.

**Prerequisites:** Lessons L03, L06.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. Inventory what VPN users access (apps, admin tools, file shares).
2. Map each to a pattern: IdP SSO SaaS, identity-aware proxy, ZTNA agent, bastion, enclave gateway.
3. Define device posture and MFA requirements per group (Module 2).
4. Define how the legacy VPN is reduced, monitored and retired.

**Expected observations:** most web apps move to the proxy; admin access to bastions with JIT; the VPN shrinks to a few cases before retirement.

**Troubleshooting:** include partner and vendor access.

**Cleanup:** none.

**Learning outcome:** you can plan a gateway transition.
