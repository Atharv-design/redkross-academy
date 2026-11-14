> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Extend and test the detections

----------------------------------------------------

**Objective:** Add detections and prove each fires on test data only.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C11/cloudtrail_lab.py.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** copy the script.

**Explicit authorised scope:** synthetic records only.

**Step-by-step instructions:**

1. Run python cloudtrail_lab.py and confirm the four detections and the burst.
2. Add a root-activity rule (userIdentity.type == "Root") and a record that should trigger it.
3. Add a rule for AuthorizeSecurityGroupIngress opening port 22 or 3389 to 0.0.0.0/0, with one positive and one negative record.
4. Turn the "first IP" baseline into an alert when a user appears from a second IP.
5. For every rule, write the runbook's first three steps.

**Expected observations:** each rule fires only on its intended records.

**Troubleshooting:** requestParameters structures vary by API; inspect them.

**Cleanup:** none.

**Learning outcome:** you can engineer and test cloud detections.

## Practical 2: Logging standard and gap analysis

-------------------------------------------------------

**Objective:** Write a logging standard and compare a fictional estate with it.

**Difficulty:** Advanced.

**Required tools:** spreadsheet.

**Prerequisites:** Lessons L01, L02, L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional estate: two AWS accounts with a single-region trail and no data events; one Azure subscription without diagnostic settings; Microsoft 365 E3 with default audit settings.

**Step-by-step instructions:**

1. List required sources, destinations, retention and owners.
2. Mark each gap in the estate and its risk.
3. Prioritise five changes and describe how each will be verified.

**Expected observations:** org trail, Azure diagnostic settings and Purview search logging are top gaps.

**Troubleshooting:** include identity logs.

**Cleanup:** none.

**Learning outcome:** you can define and verify cloud logging coverage.
