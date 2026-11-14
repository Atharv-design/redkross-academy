Before choosing primitives, state:

- Assets: what is protected (data at rest, in transit, keys themselves).
- Adversaries and capabilities: passive eavesdropper; active network attacker who can modify traffic; attacker with stolen backups or disks; malicious insider; attacker with code execution on an endpoint, who can read keys in use; well-resourced long-term adversary who records traffic now to decrypt later ("harvest now, decrypt later").
- Trust: who holds keys, where keys live (HSM, KMS, files) and who can use them.
- Lifetime: how long data must stay confidential. Long lifetimes argue for larger keys and post-quantum planning.
- Failure modes: key loss (availability), key leak (confidentiality), nonce reuse, downgrade attacks, side channels (timing, power), and implementation bugs.

**Example (Tamarind payroll exports):** encrypt files at rest with AES-256-GCM under a data key wrapped by a KMS key (Module 2). Restrict who may decrypt by IAM role. Log key use. Keep the backup KMS key in a separate account. Retain files for seven years, and plan algorithm agility.
