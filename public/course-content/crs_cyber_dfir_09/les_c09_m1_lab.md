> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Build a collection plan

---------------------------------------------

**Objective:** Write a collection plan for a scenario.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lessons L03-L04; Technical deep dive.

**Environment setup:** none.

**Explicit authorised scope:** written exercise.

**Step-by-step instructions:**

1. Scenario: a Tamarind finance laptop (Windows 11) is suspected of malware that emailed invoices to an external address. The laptop is on, logged in and connected to Wi-Fi.
2. Write three investigative questions.
3. List the sources in order of volatility with collection method, authority, owner and storage location.
4. Identify two sources outside the laptop.
5. Note one action you must avoid and why, citing RFC 3227.

**Expected observations:** memory and network state first; email gateway and M365 audit logs as external sources; avoid shutting down or running untrusted on-host tools.

**Troubleshooting:** if unsure about authority, write the question you would ask legal.

**Cleanup:** none.

**Learning outcome:** you can translate questions into a forensically sound plan.

## Practical 2: Draft a chain-of-custody form

---------------------------------------------------

**Objective:** Design a custody form suitable for your organisation.

**Difficulty:** Advanced.

**Required tools:** text editor or spreadsheet.

**Prerequisites:** Lessons L02, L05.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise.

**Step-by-step instructions:**

1. Include: case ID; item ID; description (make, model, serial, capacity); source location; collected by, date and time (UTC and IST); method; hash values (algorithm); seal numbers; each transfer (from, to, date and time, purpose, signatures); storage location; final disposition.
2. Fill it in for the C08 evidence export (Course 08 Module 7) as a worked example.
3. Compare your form with the data a BSA Section 63 certificate would need (ask your legal team for the Schedule form).

**Expected observations:** every transfer is recorded and hashes appear at collection and at each verification.

**Troubleshooting:** keep the form short enough that people actually use it.

**Cleanup:** none.

**Learning outcome:** you can document custody defensibly.
