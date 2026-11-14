> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Build the MONSOON LANTERN cluster

**Objective:** Pivot from a reported lure domain to a defensible infrastructure cluster and recommend actions.

**Difficulty:** Advanced.

**Required tools:** Python; infra_pivot.py; data/.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** python make_ti_data.py (if needed).

**Explicit authorised scope:** synthetic records only.

**Step-by-step instructions:**

1. Run the naive and the disciplined pivot from portal-nilgiri-claims.example and compare the clusters.
2. For each domain in the disciplined cluster, write its strongest link and the evidence line.
3. Re-run from 198.51.100.78 as the seed; explain any difference.
4. Change MAX_FANOUT to 4 and WINDOW_START to 2026-10-05 in a copy and re-run; which domains drop out, and is that better or worse?
5. Recommend an action (block, monitor, report, share) for every node, including 192.0.2.10 and the name server.

Expected observations (execution-tested for step 1): 10 versus 6 domains as in section 3. Steps 3-4 depend on your changes; the instructor guide lists the reference results.

**Troubleshooting:** a seed with a typo returns a cluster of one; check the spelling against data/pdns.jsonl.

**Cleanup:** none.

**Learning outcome:** you can build infrastructure clusters that survive review.

## Practical 2: Context for one real domain

**Objective:** Gather passive context for example.com and interpret it.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+ with internet access; live_context.py.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** none.

**Explicit authorised scope:** example.com only (reserved for documentation by IANA). Do not run the tool against other domains in this course.

**Step-by-step instructions:**

1. python live_context.py example.com
2. Identify the provider of the addresses and certificate; explain what the addresses do and do not tell you about the domain owner.
3. Compare the certificate validity period with the RDAP registration date; why are they so different?
4. Write the action you would recommend if example.com appeared in a phishing report (hint: verify the report first).

Expected observations (execution-tested on 2026-11-07): CDN addresses, a Cloudflare-issued certificate valid for about three months, registration in 1995; your results may differ over time.

**Troubleshooting:** certificate verification errors usually mean a corporate TLS-inspecting proxy; run from a network without one or note the proxy's certificate as the observed result.

**Cleanup:** none.

**Learning outcome:** you can add context before you act.
