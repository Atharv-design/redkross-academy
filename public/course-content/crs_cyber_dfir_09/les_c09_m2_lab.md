> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Acquire, verify and detect change

-------------------------------------------------------

**Objective:** Run the acquisition lab and explain each result.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C09/rk_c09_acquire_lab.sh.

**Prerequisites:** Lessons L01, L04.

**Environment setup:** from LAB_ASSETS/C09 run (Git bash or Linux):

```text
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd):/host" debian:stable-slim \
  sh /host/rk_c09_acquire_lab.sh
```

**Explicit authorised scope:** files created inside the disposable container only. Do not point dd at real devices in this exercise.

**Step-by-step instructions:**

1. Run the lab and save the output.
2. Confirm the three matching SHA-256 values and record them on a custody form.
3. Explain why the working-copy hash changed and what cmp reports.
4. Modify the script to use bs=512 and confirm the hash is unchanged.
5. Write two sentences on when you would use ddrescue instead.

**Expected observations:** identical hashes for source, stream and image; a different hash after modification; the hash is independent of block size. (Your hash values will differ from the module's, because mformat writes a new volume ID and timestamps on each run.)

**Troubleshooting:** on Windows Git bash, set MSYS_NO_PATHCONV=1 so /host is not rewritten.

**Cleanup:** the container is removed automatically (--rm).

**Learning outcome:** you can prove image integrity.

## Practical 2: Plan a cloud acquisition

----------------------------------------------

**Objective:** Write a procedure for acquiring a compromised cloud VM.

**Difficulty:** Advanced.

**Required tools:** text editor; cloud provider documentation (Course 11).

**Prerequisites:** Lesson L06.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise; do not run against production accounts.

**Step-by-step instructions:**

1. List the IAM permissions needed to snapshot volumes and copy them to a forensic account.
2. Write steps: isolate the instance (security group), snapshot volumes, optionally capture memory, tag snapshots with the case ID, share or copy them to the forensic account, create a volume from the snapshot on an analysis instance, and hash it.
3. Identify the audit log entries that prove each step.
4. Note retention risks and the time limits on each step.

**Expected observations:** the procedure records requester, time and region for every API call.

**Troubleshooting:** if hashing a cloud volume, hash the block device on the analysis instance and record how it was attached.

**Cleanup:** none.

**Learning outcome:** you can extend custody to the cloud.
