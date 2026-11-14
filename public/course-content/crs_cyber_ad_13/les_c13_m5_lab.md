> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Run a directory-hygiene review

**Objective:** Export the directory and find the attack preconditions in your own lab domain.

**Difficulty:** Advanced.

**Required tools:** the running rk-dc container; dir_review.py; Python 3.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** ensure setup_domain.sh has run (Module 3).

**Explicit authorised scope:** your own lab container only. Never export or review a directory you do not administer.

**Step-by-step instructions:**

1. Export user objects to LDIF: docker exec rk-dc sh -c "ldbsearch -H \$(find /var/lib/samba -name sam.ldb|head -1) '(objectClass=user)' sAMAccountName userAccountControl servicePrincipalName pwdLastSet lastLogon" > data/directory_export.ldif
2. python dir_review.py data/directory_export.ldif ; read every finding.
3. For the HIGH finding (legacy-svc SPN), write the precondition it represents (which ATT&CK technique) and the two fixes.
4. Note the exit code and explain how it could gate a change window.

**Expected observations (execution-tested):** five findings; legacy-svc with three; exit code 1.

**Troubleshooting:** if the LDIF is empty, run setup_domain.sh first; if ldbsearch is not found, use its full path under /usr/bin.

**Cleanup:** the LDIF is a lab snapshot; keep it for Module 7 or delete it.

**Learning outcome:** you can find Kerberoasting and hygiene preconditions in a directory you own.

## Practical 2: Close a path and prove it

**Objective:** Remediate the Kerberoastable account and show the finding clears.

**Difficulty:** Advanced.

**Required tools:** the running rk-dc container; dir_review.py.

**Prerequisites:** Lesson L06; Module 3 (PSO, SPN, gMSA concepts).

**Environment setup:** none beyond P1.

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. Decide the fix for legacy-svc: either remove the SPN (if unused) with samba-tool spn delete, or set a long random password and keep the PSO.
2. Apply your chosen fix in the container.
3. Re-export the LDIF (P1 step 1) and re-run dir_review.py.
4. Confirm the HIGH finding is gone (or downgraded) and the exit code changes; write one line on what you changed and why.

**Expected observations:** after removing the SPN, the Kerberoastable HIGH finding disappears and the exit code may become 0 (no HIGH remaining).

**Troubleshooting:** if the finding persists, confirm the SPN was actually removed (samba-tool spn list legacy-svc) and that you re-exported the LDIF.

**Cleanup:** optionally restore the SPN to keep the lab's teaching state for others (setup_domain.sh re-adds it).

**Learning outcome:** you can close an attack path and verify the closure with evidence.
