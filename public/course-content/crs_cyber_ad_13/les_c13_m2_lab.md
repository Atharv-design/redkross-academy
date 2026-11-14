> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Follow a Kerberos logon and an LDAP bind

**Objective:** Obtain a TGT, use it to authenticate to the directory without a password, and confirm the encryption type from the audit record.

**Difficulty:** Intermediate.

**Required tools:** the running rk-dc container (Module 1); kinit, klist, ldapwhoami (installed in the lab image).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** ensure rk-dc is running and the resolver points at it (Module 1 P1).

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. In the container, echo the lab password to kinit for asha, then run klist; identify the TGT by its krbtgt service principal.
2. Run ldapwhoami -Y GSSAPI -H ldap://dc1.ad.sahyadri.example; confirm the bound identity is SAHYADRI\asha and note that no password was sent.
3. From docker logs rk-dc, find the JSON Authentication event for asha and record eventId, logonType, status and passwordType.
4. Explain in one sentence which key encrypted the TGT and which would encrypt a service ticket for an application SPN.

**Expected observations (execution-tested):** the TGT, the whoami result and the AES256 audit event shown in section 3.

**Troubleshooting:** "no mechanism available" from ldapwhoami means the GSSAPI SASL module is missing (the lab image installs libsasl2-modules-gssapi-heimdal); clock skew errors mean the container clock drifted - restart it.

**Cleanup:** kdestroy to discard the ticket cache.

**Learning outcome:** you can observe a password-less Kerberos authentication and read its audit record.

## Practical 2: Spot the weak encryption type

**Objective:** Learn to tell a healthy AES authentication from a weak RC4 one in telemetry.

**Difficulty:** Intermediate.

**Required tools:** data/auth_audit.jsonl; a text editor or grep.

**Prerequisites:** Lessons L03, L06.

**Environment setup:** none.

**Explicit authorised scope:** local lab data only.

**Step-by-step instructions:**

1. grep for "passwordType" in data/auth_audit.jsonl and list the distinct encryption types present.
2. Write down which type would be a finding and why (refer to L03).
3. Describe, in two sentences, what you would check on an account whose tickets appear as RC4, and the fix (CS2).
4. State one control that forces AES-only for sensitive accounts (Protected Users, Module 4).

**Expected observations (execution-tested):** every record shows aes256-cts-hmac-sha1-96; no RC4 or DES is present, which is the healthy result.

**Troubleshooting:** if grep finds nothing, regenerate telemetry by authenticating a few users (P1) and re-snapshotting docker logs.

**Cleanup:** none.

**Learning outcome:** you can read encryption types from telemetry and judge them.
