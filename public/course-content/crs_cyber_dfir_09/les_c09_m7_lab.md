> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Validate eradication with a baseline

----------------------------------------------------------

**Objective:** Use baseline_diff.py to baseline and verify a directory.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C09/baseline_diff.py.

**Prerequisites:** Lesson L05.

**Environment setup:** create a practice folder with a few files you own.

**Explicit authorised scope:** your own practice folder.

**Step-by-step instructions:**

1. Run python baseline_diff.py demo and explain the three findings.
2. Run python baseline_diff.py baseline <yourfolder> base.json.
3. Add a file, edit a file and delete a file in <yourfolder>.
4. Run python baseline_diff.py compare <yourfolder> base.json and check that all three changes are reported.
5. Explain where base.json must be stored to be trustworthy.

**Expected observations:** one added, one removed and one changed, matching your edits.

**Troubleshooting:** make sure the path is a folder, not a file.

**Cleanup:** delete the practice folder and base.json.

**Learning outcome:** you can verify a restored system against a baseline.

## Practical 2: Tabletop exercise

---------------------------------------

**Objective:** Run a 60-minute tabletop for a ransomware scenario.

**Difficulty:** Advanced.

**Required tools:** the IR plan template from this module; 4-8 participants.

**Prerequisites:** Lessons L02-L06.

**Environment setup:** assign the roles of incident lead, technical lead, legal, communications, IT operations and business owner.

**Explicit authorised scope:** discussion exercise only.

**Step-by-step instructions:**

1. Inject 1 (09:00): users report files renamed with a new extension on a file share.
2. Inject 2 (09:20): EDR shows vssadmin delete shadows on two servers.
3. Inject 3 (09:45): a ransom note threatens to publish stolen data.
4. Inject 4 (10:30): backups for one system are found to be encrypted.
5. For each inject, record decisions, owners, times and evidence needs. Note the CERT-In deadline and the legal and DPDP questions.
6. Finish with a lessons-learned list of at least five actions.

**Expected observations:** gaps in contacts, authority or backups surface quickly.

**Troubleshooting:** keep the time moving. The aim is decisions, not perfect answers.

**Cleanup:** archive notes securely.

**Learning outcome:** you can test and improve IR preparation.
