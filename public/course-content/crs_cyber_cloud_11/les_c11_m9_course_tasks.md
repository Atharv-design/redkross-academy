> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

​## Task C11-CT1 Write a Python script that imports the synthetic records and rules from cloudtrail_lab.py and prints, for each identity, its event count, first and last event time, source IPs, AccessDenied count, the detections that fired, its high-risk events in time order, and a verdict (INCIDENT if two or more detections fired, REVIEW if one fired or any call was denied, otherwise normal). Explain the verdicts and what the response team should do for each identity.

​## Task C11-CT2 Write an offline Python linter for IAM policy and trust-policy JSON documents that flags: Allow with Action `"*";` sensitive actions on Resource `"*";` iam:PassRole without iam:PassedToService; trust policies allowing any principal or another account without sts:ExternalId; and MFA deny statements using Bool. Run it on a document set containing the Module 2 lab policies and their remediated versions, and explain each finding.
