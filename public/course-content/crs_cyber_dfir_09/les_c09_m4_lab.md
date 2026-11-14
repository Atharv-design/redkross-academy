> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Live response and interpretation

------------------------------------------------------

**Objective:** Run the live-response lab and extend it.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C09/rk_c09_live_lab.sh.

**Prerequisites:** Lessons L03-L04; Technical deep dive.

**Environment setup:** from LAB_ASSETS/C09:

```text
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd):/host" python:3.12-slim \
  sh /host/rk_c09_live_lab.sh
```

**Explicit authorised scope:** the disposable container only.

**Step-by-step instructions:**

1. Run the lab and save the output.
2. List three indicators that PID 8 is suspicious, and one innocent explanation you would need to rule out.
3. Add a step that copies /proc/<pid>/exe of the deleted process to /tmp/recovered and hashes it, before killing the process.
4. Compare the hash with sha256sum /bin/sleep.
5. Add decoding of ESTABLISHED (01) connections and start an outbound connection to the local listener to test it.

**Expected observations:** the recovered binary's hash equals /bin/sleep's, because it was a copy. An established loopback connection appears in both directions.

**Troubleshooting:** /proc/<pid>/exe can be read only while the process runs.

**Cleanup:** the container is removed on exit.

**Learning outcome:** you can collect and interpret volatile artefacts.

## Practical 2: Plan a Volatility 3 analysis

--------------------------------------------------

**Objective:** Write an analysis plan for a Windows memory image.

**Difficulty:** Advanced.

**Required tools:** text editor; optional Volatility 3 and a legitimately obtained public training image.

**Prerequisites:** Lesson L05.

**Environment setup:** if you have an authorised training image, create a Python venv and install Volatility 3 from its official repository [R2].

**Explicit authorised scope:** training images whose licence allows analysis. Never analyse memory from systems you are not authorised to examine.

**Step-by-step instructions:**

1. Write the plugin order you would run and what each answers.
2. Define indicators that would trigger a deeper look (L03 list).
3. Describe how you will record commands, versions and output hashes.
4. If you have an image, run windows.info, windows.pslist and windows.psscan, and explain any difference.

**Expected observations:** differences between pslist and psscan point to exited or hidden processes and need explaining.

**Troubleshooting:** symbol download issues. Volatility 3 may need internet access to fetch Windows symbols, or offline symbol packs.

**Cleanup:** securely delete working copies of memory images per policy.

**Learning outcome:** you can plan a defensible memory analysis.
