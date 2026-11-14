- Root: an offline, hardware-protected key, used rarely, with ceremonies documented and witnessed. Long validity.
- Intermediates: online issuing CAs with HSM-protected keys, separate per purpose (TLS, client authentication, code signing).
- Issuance: automated (ACME protocol, cert-manager in Kubernetes, cloud private CA services), with short lifetimes and automatic renewal.
- Policies: certificate profiles defining allowed SANs, key types, EKUs and lifetimes; who may request; approval for sensitive types.
- Inventory and monitoring: all issued certificates, expiry alerts, revocation processes, and CRL/OCSP availability.
- Compromise plans: how to revoke an intermediate and re-issue at scale.

The lab used P-256 keys, a pathlen:0 intermediate, a CA:FALSE leaf with serverAuth EKU and SAN, and 3650-, 1825- and 90-day lifetimes. These are sensible profile defaults for a small private PKI. Keys were files in a lab folder, which is acceptable only for training.
