A disciplined investigation of an identity alert:

1. Scope: which account, which source, what time window, how many events?
2. Baseline: is this normal for this account (a service that always authenticates from one host) or new?
3. Corroborate: pull related events - the TGT request, the service-ticket request, any lockout, any account change around the same time.
4. Decide: benign (a misconfigured service retrying), suspicious (needs containment), or confirmed (incident response, Course 09).
5. Record: what you saw, what you concluded, what you did - the evidence the audit report (Module 7) and any IR will need.

The point is to move from a single alert to a supported conclusion, not to react to each event in isolation.
