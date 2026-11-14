| Term | Meaning |
|---|---|
| Transport | TLS/mTLS everywhere (Module 4, Course 15 M06). |
| Storage | platform encryption at rest (disks, databases, object storage) - protects against media theft and some provider access; transparent to applications. |
| Customer-managed keys (CMK) | the organisation controls the KMS key, policies and rotation; enables revocation and audit of key use. |
| Application/field-level | the application encrypts specific fields (e.g., national ID numbers, bank details) before storage with envelope encryption (Course 15 M02); the database and its admins see ciphertext. |
| Client-side | data encrypted before it reaches the service (highest control, most complexity). |

**Choose by threat model:** storage encryption does not protect against an attacker using the application's credentials; field-level encryption with separated keys does.
