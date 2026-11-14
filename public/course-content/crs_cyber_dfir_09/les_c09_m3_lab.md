> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Recover a deleted file with TSK

-----------------------------------------------------

**Objective:** Run the file-system lab and explain each artefact.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C09/rk_c09_fs_lab.sh.

**Prerequisites:** Lessons L02, L04, L05.

**Environment setup:** from LAB_ASSETS/C09:

```text
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd):/host" debian:stable-slim \
  sh /host/rk_c09_fs_lab.sh
```

**Explicit authorised scope:** images created inside the container only.

**Step-by-step instructions:**

1. Run the lab and save the output.
2. For FAT, explain "_USTOM~1.CSV", the 00:00:00 access time, and why the content was recoverable.
3. For ext4, explain why recovery succeeded here and why it often fails after a kernel deletion.
4. Hash the recovered content (add "| sha256sum" after icat) and record it with the inode or entry number.
5. Confirm that both image hashes were unchanged after analysis.

**Expected observations:** as in Lessons L02 and L04. The hash values differ from the module, because new images get new timestamps and IDs.

**Troubleshooting:** if fls shows no deleted entry, check that mdel or debugfs ran without errors (remove "2>/dev/null").

**Cleanup:** the container is removed on exit.

**Learning outcome:** you can recover and document deleted files.

## Practical 2: Build and read a timeline

-----------------------------------------------

**Objective:** Create a body file and timeline for the FAT image and compare it with ext4.

**Difficulty:** Advanced.

**Required tools:** as P1 (edit the script).

**Prerequisites:** Lesson L06.

**Environment setup:** as P1.

**Explicit authorised scope:** lab images.

**Step-by-step instructions:**

1. Add: fls -r -m / fat.img > fatbody.txt ; mactime -b fatbody.txt -d -z UTC.
2. Add "sleep 3" before the mcopy of one file and rerun. Check that the timeline shows the gap, and note FAT's 2-second write resolution.
3. Rerun mactime with -z Asia/Kolkata and explain how the displayed times change for FAT and for ext4.

Expected observations (execution-tested 2026-11-07 on a one-file test image): with -z Asia/Kolkata, mactime shifted both the ext4 and the FAT times by +05:30 (06:01:10 became 11:31:10). FAT therefore behaves the same as ext4 at the mactime stage, because fls had already converted FAT's stored local time into an epoch value as if it were UTC. To interpret FAT correctly, give the device's time zone to fls (fls -z <device TZ> -m ...). mactime -z only controls display. The FAT "c" column also showed "Xxx Xxx 00 0000", because FAT has no metadata-change time.

**Troubleshooting:** use zone names known to the container's tzdata. If missing, install tzdata.

**Cleanup:** as P1.

**Learning outcome:** you understand time-zone handling across file systems.
