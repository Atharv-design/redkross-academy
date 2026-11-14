> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Audit, remediate and recover in the mock

--------------------------------------------------------------

**Objective:** Run and extend the storage lab.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C11/run_lab.sh and data_lab.py.

**Prerequisites:** Lessons L01-L06.

**Environment setup:** copy the C11 lab folder; start Docker.

**Explicit authorised scope:** the local moto mock only.

**Step-by-step instructions:**

1. Run sh run_lab.sh data_lab.py and compare with L06.
2. Extend audit() to report a bucket policy statement that denies requests without aws:SecureTransport; add such a statement in remediation.
3. Add a lifecycle rule that expires export objects after 30 days and audit for it.
4. Delete an object twice (two versions) and restore the older version.

**Expected observations:** the audit shows TLS-only and lifecycle settings.

**Troubleshooting:** moto may not support every API; report what it returns.

**Cleanup:** none.

**Learning outcome:** you can audit and remediate storage controls in code.

## Practical 2: Key and backup design

-------------------------------------------

**Objective:** Design keys and backups for three data stores.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. Stores: customer exports (S3, restricted), order database (RDS, confidential), log archive (Azure storage, internal).
2. For each define encryption type, key, key administrators, key users, rotation and deletion protection.
3. Define versioning/soft delete, backup location, immutability and retention.
4. Define a restore test and its success criteria.

**Expected observations:** backups in a separate account with immutability; separated key custody for restricted data.

**Troubleshooting:** include the log archive's own protection.

**Cleanup:** none.

**Learning outcome:** you can design recoverable, encrypted storage.
