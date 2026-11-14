> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Confirm CSRF, SSRF and traversal, then read the fixes

**Objective:** Prove all three flaws safely on your owned lab and read the mitigations in the hardened code.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (findings.py, target/app.py, target/app_fixed.py).

**Prerequisites:** Lessons L01-L06.

**Environment setup:** run both apps (8200, 8201) in separate terminals; loopback only.

**Explicit authorised scope:** 127.0.0.1 only; your own apps; loopback proofs only.

**Step-by-step instructions:**

1. Run python findings.py --port 8200 and read the CSRF, SSRF and traversal results.
2. In target/app.py, find the /account/update POST (no token), the open /fetch, and the /download path join.
3. In target/app_fixed.py, read the CSRF-token check, the default-deny fetch allowlist, and the realpath confinement.
4. Run python findings.py --port 8201 and confirm all three are absent.
5. Note the CVSS scores from report.py (traversal 7.5, SSRF 7.5, CSRF 6.5).

**Expected observations (execution-tested):** all three PRESENT on 8200, absent on 8201; the SSRF proof stays entirely on loopback.

**Troubleshooting:** if the SSRF check shows absent on 8200, ensure the vulnerable app is running and not blocked by a local firewall on loopback.

**Cleanup:** stop both servers; throwaway data only.

**Learning outcome:** you can identify, safely prove and remediate CSRF, SSRF and path traversal.

## Practical 2: Write the three mitigations

**Objective:** Specify the standard fix for each flaw.

**Difficulty:** Intermediate.

**Required tools:** this module; the lab code.

**Prerequisites:** Lessons L02, L04, L05.

**Environment setup:** none.

**Explicit authorised scope:** design/code reading only.

**Step-by-step instructions:**

1. Write the anti-CSRF token check (per-session token required on state-changing POSTs) and note the SameSite setting.
2. Write the SSRF default-deny allowlist check and list the internal ranges to block.
3. Write the path-canonicalisation check (realpath within base) for /download.
4. For each, state why the control defeats the attack.

**Expected observations:** token defeats cross-site forgery; allowlist defeats arbitrary fetch; canonicalisation defeats ../ escape.

**Troubleshooting:** if your SSRF check only blocks external hosts, add internal/loopback/link-local.

**Cleanup:** none.

**Learning outcome:** you can write the standard mitigations for request and server-side flaws.
