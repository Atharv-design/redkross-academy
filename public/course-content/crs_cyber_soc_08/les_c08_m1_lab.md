> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Set up the course lab and explore the dataset

-------------------------------------------------------------------

**Objective:** Generate the dataset, load the mini-SIEM and explore volumes.

**Difficulty:** Intermediate (beginner-friendly).

**Required tools:** Python 3.10+; LAB_ASSETS/C08/make_dataset.py, minisiem.py.

**Prerequisites:** Course 04 Modules 3 and 6.

**Environment setup:** copy the C08 lab folder; open a terminal there.

**Explicit authorised scope:** synthetic data on your own computer.

**Step-by-step instructions:**

1. python make_dataset.py   (expect "events written: 340")
2. python minisiem.py load  (expect "loaded 340 events")
3. python minisiem.py search "SELECT source, COUNT(`*`) AS n FROM events GROUP BY source ORDER BY n DESC"
4. Find the first and last event times; list distinct hosts and users.
5. Write down three questions you would want to answer about this day.

**Expected observations:** proxy 284, sysmon 33, windows 13, vpn 10.

**Troubleshooting:** "no such table" means you skipped step 2.

**Cleanup:** keep the files for later modules.

**Learning outcome:** you can operate the course lab.

## Practical 2: Metrics and a shift handover

--------------------------------------------------

**Objective:** Calculate metrics and write a handover.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08/soc_metrics.py.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** synthetic cases.

**Step-by-step instructions:**

1. Run soc_metrics.py and confirm the output in section 3.
2. Add five cases of your own, including one critical case acknowledged late, and recompute.
3. Write a half-page handover for the next shift covering open cases, pending decisions and platform health.

**Expected observations:** medians stay stable while means move with outliers.

**Troubleshooting:** timestamps must be ISO format.

**Cleanup:** none.

**Learning outcome:** you can measure and communicate SOC work.
