**Lifecycle:**

| Term | Meaning |
|---|---|
| Generate | from a CSPRNG or inside an HSM/KMS; 256-bit keys for new designs. |
| Store | in a KMS or HSM, never in source code or configuration files (Course 12 Module 6). Application processes hold keys only in memory, for as short a time as practical. |
| Use | separate keys per purpose (encryption, MAC, signing) and per environment and tenant, and log usage. |
| Rotate | on a schedule and on suspected compromise. Versioned keys allow old data to be decrypted while new data uses the new key. Re-encrypt where the policy requires. |
| Revoke/destroy | disable first, keep long enough to decrypt what must be retained, then destroy. Destroying the key renders data unreadable ("crypto-shredding"), useful for deletion obligations under privacy laws such as the DPDP Act. |
| Back up | a key you cannot recover means data you cannot recover. Escrow and backup procedures need the same protection as the keys. |

NIST SP 800-57 Part 1 is the standard reference for key-management recommendations, including cryptoperiods [R3].
