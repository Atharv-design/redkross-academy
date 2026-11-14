Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A scan of your own server shows TLS 1.0 enabled and CBC suites.

**Task:** Remediate safely.

> [!TIP] Model answer
> Check client compatibility (logs of negotiated versions). Disable TLS 1.0/1.1 and CBC suites, keeping TLS 1.3 and TLS 1.2 with ECDHE and AEAD suites. Stage the change, test, monitor handshake failures, and keep a rollback. Communicate with partners using old clients.
>
> **Lesson:** measure, change, monitor.

## Scenario 2

Certificates now expire every 200 days and your team renews manually.

**Task:** Plan.

> [!TIP] Model answer
> Inventory all certificates (CT logs, scans of your ranges, load balancers). Automate with ACME or cloud certificate managers. Set expiry alerts. Assign owners. Test renewal in staging, handle appliances that cannot automate (replace or front them with a proxy), and prepare for the 100- and 47-day steps.
>
> **Lesson:** automation is mandatory now.

## Scenario 3

A microservice architecture authenticates services with shared API keys.

**Task:** Propose an alternative.

> [!TIP] Model answer
> Use mTLS with short-lived certificates from a private CA (service-mesh or SPIFFE identities). Map SAN identities to authorisation policies, and rotate automatically. This removes static shared secrets and gives per-service identity and audit.
>
> **Lesson:** identity from certificates, not shared keys.
