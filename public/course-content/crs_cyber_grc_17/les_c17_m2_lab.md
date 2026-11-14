> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the risk register

------------------------------------------------------

**Objective:** Use the toolkit and add your own risks.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lessons L03-L05; Technical deep dive.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py risk and record the output.
2. Add three risks (for example a cloud misconfiguration, an insider export, a vendor breach) with justified scores and control effects.
3. Give one an acceptance date in the past and one a residual of 12+ with "transfer". Confirm the flags appear.
4. Write a one-paragraph decision request for R04's owner.

**Expected observations:** ACCEPTANCE EXPIRED and REVIEW flags as designed; new risks on the heat map.

**Troubleshooting:** keep scores within 1-5.

**Cleanup:** none.

**Learning outcome:** you can operate a risk register.

## Practical 2: Write impact criteria and an appetite statement

---------------------------------------------------------------------

**Objective:** Define scoring criteria and appetite for Tamarind.

**Difficulty:** Professional.

**Required tools:** text editor.

**Prerequisites:** Lessons L04, L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional company with annual revenue INR 800 crore (assumption for the exercise).

**Step-by-step instructions:**

1. Define impact levels 1-5 for financial, operational, regulatory and customer dimensions.
2. Define likelihood levels 1-5.
3. Write a risk appetite statement with three quantitative thresholds.
4. List four KRIs with targets and alert levels.

**Expected observations:** regulatory impact level 4-5 for notifiable personal data breaches (DPDP, CERT-In), and financial thresholds scaled to revenue.

**Troubleshooting:** avoid overlapping bands.

**Cleanup:** none.

**Learning outcome:** you can calibrate risk analysis.
