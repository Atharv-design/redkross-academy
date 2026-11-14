> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Capture, carve and verify

-----------------------------------------------

**Objective:** Run the network lab and verify a carved file.

**Difficulty:** Advanced.

**Required tools:** Docker; Git bash or Linux shell; LAB_ASSETS/C09.

**Prerequisites:** Lessons L03-L04; Technical deep dive.

**Environment setup:** from LAB_ASSETS/C09 run: sh rk_c09_net_lab.sh

**Explicit authorised scope:** the private Docker network created by the script. Do not capture traffic on networks you do not own or administer.

**Step-by-step instructions:**

1. Run the script and save the output.
2. Confirm the carved customers.csv hash equals the server's hash.
3. Inspect the exported missing.zip with the file command or a hex view and explain what it really contains.
4. Add a third request with a different user agent and re-run; check that it appears.
5. Run tshark -q -z conv,tcp on the pcap and record the conversations.

**Expected observations:** matching hashes; missing.zip is an HTML 404 page; your hash values for the pcap will differ (timestamps change each run), while the customers.csv hash stays 04e8f300... because its content is fixed.

**Troubleshooting:** if docker network create fails because the subnet is in use, change 172.31.0.0/24 in the script and the IPs to match.

**Cleanup:** the script removes containers and the network; verify with docker ps -a and docker network ls.

**Learning outcome:** you can extract and prove network-transferred files.

## Practical 2: Correlate and stress-test a timeline

----------------------------------------------------------

**Objective:** Use timeline.py and see how a time-zone error breaks it.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C09/timeline.py.

**Prerequisites:** Lesson L06.

**Environment setup:** none.

**Explicit authorised scope:** synthetic logs and the lab capture times.

**Step-by-step instructions:**

1. Run python timeline.py and write the four-step story.
2. Change the auth.log lines to IST (add 5 hours 30 minutes to each time) without telling the parser, then rerun. Describe how the story changes.
3. Fix the parser to apply Asia/Kolkata (zoneinfo.ZoneInfo) to auth.log and confirm the original order returns.
4. Add a source: a synthetic firewall line in UTC showing 172.31.0.20 connecting to 172.31.0.10:80 at 05:51:40.

**Expected observations:** in step 2 the login appears after the download; the fix restores the order.

**Troubleshooting:** on Windows, zoneinfo may need the tzdata package (pip install tzdata).

**Cleanup:** none.

**Learning outcome:** you can build and validate multi-source timelines.
