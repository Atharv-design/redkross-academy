> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: DNS and flow analytics

**Objective:** Find and interpret the DNS and flow anomalies in the Tamarind data.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C20.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** python make_telemetry.py

**Explicit authorised scope:** synthetic dataset only.

**Step-by-step instructions:**

1. Run: python netdetect.py
2. Explain each feature that marks 10.20.1.17, and one benign explanation for each.
3. Compute by hand the CV for gaps of 290, 300, 310 and 300 seconds, and compare it with 60, 600, 30 and 900 seconds.
4. Modify Part 3 to exclude internal destinations, and re-run. Record the new top transfer.
5. Write three sentences linking the DNS, flow and endpoint (Module 2) evidence.

**Expected observations:** 82 TXT queries with 28-character labels; CV 0.083 at about 297 s; after step 4, the 312,000,000-byte flow to 198.51.100.23 at 12:31 is the top external transfer. Step 3: a CV of about 0.024 versus about 0.93 (population standard deviation).

**Troubleshooting:** if you see no output, check that the dataset file is in the same folder.

**Cleanup:** restore netdetect.py if you want to keep the original.

**Learning outcome:** you can interpret network metadata with appropriate caution.

## Practical 2: Write and test Suricata rules

**Objective:** Write, load-test and replay-test IDS signatures.

**Difficulty:** Advanced.

**Required tools:** Docker; jasonish/suricata image; LAB_ASSETS/C20/ids.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** docker pull jasonish/suricata:latest; create ids/out.

**Explicit authorised scope:** the provided lab capture only (traffic between two lab containers on a private Docker network); do not run the sensor against networks you do not operate.

**Step-by-step instructions:**

1. Run the commands from the deep dive and confirm four alerts.
2. Add rule sid 9200004 that alerts when the HTTP response status is 200 and the URI ends with ".csv"; increment nothing else.
3. Run suricata -T to check that the rule loads, then replay the capture.
4. Write a negative test: explain why your rule does not fire on the /backup/missing.zip request.
5. From eve.json, list every http record and say which ones no rule alerted on.

**Expected observations:** rule 9200004 fires once (customers.csv, server to client). A first attempt that puts http.uri (request) and http.stat_code (response) in one "->" rule with flow:to_client fails to load in Suricata 8.0.8 with "rule 9200004 mixes keywords with conflicting directions, a transactional rule with => should be used". Two working designs were execution-tested (ids/solutions_p2.rules): a flowbits pair (a noalert to_server rule sets a flowbit on the CSV request; the to_client rule checks it and the 200 status), or a single transactional rule written with "=>". All http records were alerted on by at least one rule.

**Troubleshooting:** usage text printed - add --entrypoint sh; "no such directory" - create ids/out; "Loading signatures failed" - read the E: line printed by suricata -T, which names the rule and the problem; zero alerts - check the sid is unique and the rule loaded (suricata.log).

**Cleanup:** rm -r ids/out.

**Learning outcome:** you can engineer and test IDS signatures.
