> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Build and break a PKI

-------------------------------------------

**Objective:** Reproduce the lab PKI and the five validation outcomes.

**Difficulty:** Intermediate.

**Required tools:** OpenSSL 3.x (Git bash on Windows); LAB_ASSETS/C15/m05_pki_lab.sh.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** from LAB_ASSETS/C15 run: sh m05_pki_lab.sh

**Explicit authorised scope:** the lab pki folder.

**Step-by-step instructions:**

1. Run the script and record the outputs.
2. Inspect each certificate with openssl x509 -in X -noout -text and identify the extensions.
3. Issue a second leaf for portal.tamarind.example and verify it with the correct host.
4. Try to issue a leaf using leaf.key as a CA, and explain why verification fails (CA:FALSE).
5. Write which validation step each failure corresponds to.

**Expected observations:** errors 20, 62, 10 and 20 at depth 1 as in L04. In step 4 OpenSSL will sign the certificate, but verification fails. In this build's test it reported "error 32 at 1 depth lookup: key usage does not include certificate signing" (execution-tested). The leaf's keyUsage and CA:FALSE both forbid acting as a CA.

**Troubleshooting:** on Windows, set MSYS_NO_PATHCONV=1 so "/CN=..." is not rewritten as a path.

**Cleanup:** delete the pki folder.

**Learning outcome:** you can read and diagnose certificate chains.

## Practical 2: Certificate inventory and monitoring plan

---------------------------------------------------------------

**Objective:** Plan certificate lifecycle management for an organisation.

**Difficulty:** Intermediate.

**Required tools:** text editor.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** planning exercise.

**Step-by-step instructions:**

1. List certificate types in use (public TLS, internal TLS, client, code signing).
2. For each, define owner, CA, lifetime, renewal method (ACME or manual) and alerting thresholds.
3. Describe monitoring of CT logs for your public domains and CAA records.
4. Write a runbook for revoking and re-issuing after a key compromise.

**Expected observations:** automation for short-lived certificates; monitoring at 30, 14 and 7 days; CT alerts for unexpected issuance.

**Troubleshooting:** include certificates embedded in devices and appliances.

**Cleanup:** none.

**Learning outcome:** you can manage certificate lifecycles.
