> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Map the lab's attack surface

**Objective:** Enumerate the lab application's endpoints and build the attack-surface table.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (map.py, target/app.py).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** run python target/app.py in one terminal (loopback only).

**Explicit authorised scope:** 127.0.0.1 only; your own app.

**Step-by-step instructions:**

1. Run python map.py --port 8200 and save the output.
2. Read /robots.txt in a browser and note the Disallow entries.
3. For each endpoint, record method, parameters and the sink the input reaches.
4. Write the entry-point -> sink -> hypothesised-weakness table.
5. Confirm map.py refuses a non-loopback host (read require_loopback in labutil.py; do not actually target any external host).

**Expected observations (execution-tested):** the map lists /, /robots.txt, /login, /search, /account, /admin (403), /download; robots.txt advertises /admin, /download, /fetch; the table matches the deep-dive classification.

**Troubleshooting:** if a row shows ERR with a timeout for /fetch, that is the SSRF endpoint's behaviour to an unreachable address; it does not affect the map.

**Cleanup:** stop the server; throwaway data only.

**Learning outcome:** you can produce an attack-surface map and test plan from an owned application.

## Practical 2: Write the testing workflow for the lab

**Objective:** Turn the map into a scoped, repeatable test plan.

**Difficulty:** Intermediate.

**Required tools:** this module; the map from P1.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** planning only; lab target.

**Step-by-step instructions:**

1. Write the seven-step workflow (authorise, map, classify, verify, score, report, retest) as it applies to the lab.
2. For each hypothesised weakness, name the module that verifies it and the minimum safe check you expect to use.
3. State two scope rules that prevent the test from leaving 127.0.0.1.
4. Note where the evidence for each step will be stored (data/).

**Expected observations:** a plan that maps each entry point to a verification step and keeps everything on loopback.

**Troubleshooting:** if a hypothesis has no verification module, re-check the classification.

**Cleanup:** none.

**Learning outcome:** you can convert a map into an authorised, evidence-based test plan.
