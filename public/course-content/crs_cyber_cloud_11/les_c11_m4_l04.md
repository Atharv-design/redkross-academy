```text
Key policy        who may administer and who may use each key; keep
                  administrators and users separate (Course 22 Module 5).
Scope             one key per data class, application and environment.
Rotation          enable automatic rotation for symmetric KMS keys;
                  Key Vault rotation policies.
Protection        prevent deletion (scheduled deletion waiting period in
                  KMS; soft delete and purge protection in Key Vault).
Monitoring        alert on key policy changes, disablement and scheduled
                  deletion, and on unusual Decrypt volumes.
Grants and access to keys from other accounts are privileged and reviewed.
```

Envelope encryption (Course 15) means services encrypt data with data keys protected by the KMS key; data never travels to KMS in bulk.
