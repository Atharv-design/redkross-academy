| Term | Meaning |
|---|---|
| ECB | encrypts each block independently: identical plaintext blocks give identical ciphertext blocks. Never use it for data. |
| CBC | chains blocks with an IV. Needs padding, and without a MAC it is vulnerable to padding-oracle attacks. Legacy only. |
| CTR | turns the block cipher into a stream cipher with a counter. Fast and parallel, but provides no integrity, and nonce reuse is fatal (Module 7). |
| GCM | CTR mode plus a GHASH-based authentication tag: an AEAD (L04). |

Execution-tested ECB demonstration (LAB_ASSETS/C15/m02_symmetric.py). The plaintext was three identical 16-byte blocks followed by one different block:

```text
------------------------------------------------------------- BEGIN OUTPUT
ECB blocks: ['3ce7c8ca1726', '3ce7c8ca1726', '3ce7c8ca1726',
             '0c775e00741d'] -> distinct: 2 of 4
GCM blocks: ['6d94033811b1', '2644bdc08775', '7f6ad1c5e2a7',
             'd976095e0f6d'] -> distinct: 4 of 4
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; first 6 bytes of each block shown)
```

ECB revealed that three blocks were the same, which is structure an eavesdropper can see without the key. GCM produced four distinct blocks. The lab uses ECB only to show the leak.
