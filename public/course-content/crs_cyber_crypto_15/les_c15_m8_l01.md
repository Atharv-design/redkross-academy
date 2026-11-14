Requirements (Tamarind payroll exports, fictional):

```text
R1 Confidentiality of files at rest and in transit by email or storage.
R2 Detection of any modification, including of headers and parameters.
R3 Passphrase-based, with no key infrastructure needed for this tool.
R4 Portable: Python 3.10+ with pyca/cryptography.
R5 Clear exit codes for automation: 0 ok, 1 integrity or authentication
   failure, 2 usage or input error.
R6 Integrity fingerprints (SHA-256) for chain-of-custody records.
```

**Threat model:**

- In scope: attackers who obtain the encrypted file (mailbox, cloud storage, lost laptop) or modify it in transit.
- Out of scope: an attacker on the endpoint while the file is decrypted, keyloggers, and weak passphrases chosen by users (mitigated only by the KDF cost and guidance).

**Non-goals:** sender authentication (anyone with the passphrase can create valid files), streaming of very large files, and multi-recipient encryption. The documentation states these openly.
