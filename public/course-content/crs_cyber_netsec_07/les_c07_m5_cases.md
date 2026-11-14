## The deprecation of TLS 1.0 and 1.1 Context: TLS 1.0 (1999) and 1.1 (2006) accumulated known weaknesses over the years, and the security community moved to retire them. In March 2021 the IETF published RFC 8996, which FORMALLY DEPRECATES TLS 1.0 and 1.1 and moves them to historic status; major browsers and platforms had already begun disabling them, and compliance regimes (such as payment-card standards) required their removal [C07-M05-R2]. The modern baseline is TLS 1.2 and 1.3, with TLS 1.3 (RFC 8446) preferred for its speed and removal of legacy options. Why it matters for this module: it shows that protocol versions have a lifecycle, and that running deprecated versions is a quiet but real exposure. Configuration must be kept current - what was acceptable years ago is a finding now. Lessons: disable SSLv3/TLS 1.0/1.1; require TLS 1.2+ and prefer 1.3; track protocol and cipher guidance over time; and review configurations regularly, as deprecation moves the baseline.



## (FICTIONAL TEACHING SCENARIO): The certificate that expired on a Friday

**Context:** Himalaya Retail (fictional) managed TLS certificates manually, tracking renewal dates in a spreadsheet. The web edge certificate - the one the lab's pre-hardening config shows expiring in days - lapsed.

**What happened:** when the certificate expired, customers' browsers showed security warnings and many could not complete purchases; some clicked through the warning, training exactly the wrong habit. The outage was self-inflicted and avoidable, and the manual process had also left a weak 1024-bit key in place for years.

**Response:** the team adopted automated certificate issuance and renewal (short-lived certificates renewed automatically well before expiry), replaced the weak key with a 2048-bit (and moved new services to ECDSA) key, added monitoring and alerting on approaching expiry, and put a TLS configuration review into their deployment pipeline.

**Lessons:** automate certificate renewal and alert on expiry; never run weak keys; and review TLS configuration before deployment - an expired cert is an outage and a weak key is a silent exposure.
