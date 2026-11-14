Public TLS certificates are logged in certificate transparency (CT) logs, public append-only logs defined originally in RFC 6962, so that mis-issuance can be detected [R2]. For defenders the logs are a discovery tool:

- new certificates for names resembling your brand appear in the logs, often before the site is used;
- certificate fields (subject alternative names, issuer, validity dates) describe the infrastructure;
- the same certificate (same fingerprint) on several domains links them strongly, because one key pair was used for all.

**Weaker links:** a common free certificate authority or similar validity dates, which are shared by millions of legitimate sites. In the lab, one certificate (fingerprint beginning d2588691531e) covered five lure domains - a strong pivot - while the sixth lure, secure-nilgiri-login, had its own certificate and was found through a shared address instead.
