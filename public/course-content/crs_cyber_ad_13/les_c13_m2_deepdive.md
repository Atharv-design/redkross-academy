All commands run against the learner's own lab DC (Module 1).

Step 1 - obtain a ticket-granting ticket for asha (execution-tested, Samba 4.22.11, 2026-11-08):

```output
$ echo "Lab-Only-P@ssw0rd-2026" | kinit asha@AD.SAHYADRI.EXAMPLE
Warning: Your password will expire in 41 days on ...
$ klist
Default principal: asha@AD.SAHYADRI.EXAMPLE
Valid starting     Expires            Service principal
11/08/26 00:15:08  11/08/26 10:15:08  krbtgt/AD.SAHYADRI.EXAMPLE@AD.SAHYADRI.EXAMPLE
    renew until 11/09/26 00:15:08
```

Note the service principal of the first ticket: krbtgt/AD.SAHYADRI.EXAMPLE. This is the TGT - a ticket for the ticket-granting service itself, encrypted with the krbtgt key (L02). It is valid for ten hours and renewable for a day.

Step 2 - use the TGT to bind to LDAP over GSSAPI, with no password (execution-tested):

```output
$ ldapwhoami -Y GSSAPI -H ldap://dc1.ad.sahyadri.example
SASL/GSSAPI authentication started
SASL data security layer installed.
u:SAHYADRI\asha
```

The directory confirms the bound identity as SAHYADRI\asha. No password crossed the connection - only the Kerberos exchange (L04).

Step 3 - read the encryption type the DC actually used, from its JSON audit record (abridged, one event; full stream in data/auth_audit.jsonl):

```output
{"type": "Authentication", "Authentication": {
   "eventId": 4624, "logonType": 3, "status": "NT_STATUS_OK",
   "remoteAddress": "ipv4:172.17.0.2:53392",
   "serviceDescription": "Kerberos KDC",
   "authDescription": "ENC-TS Pre-authentication",
   "clientAccount": "asha@AD.SAHYADRI.EXAMPLE",
   "becameAccount": "asha", "becameDomain": "SAHYADRI",
   "passwordType": "aes256-cts-hmac-sha1-96", "duration": 7132}}
```

**Interpretation:**

- eventId 4624 is the "an account was successfully logged on" event (same number as Windows uses), logonType 3 is a network logon.
- passwordType aes256-cts-hmac-sha1-96 confirms AES256 - the healthy case from L03. If this showed arcfour-hmac (RC4), it would be a finding.
- The record names the account, the source address and the outcome - the fields every identity detection in Module 6 keys on.

**Limitations:** the lab is a single DC, so cross-DC referrals and real clock skew are not exercised; Windows records the same logical event with its own field names in the Security event log (Module 6 maps them).
