Two kinds of KDF solve different problems:

| Term | Meaning |
|---|---|
| Password-based KDFs | scrypt, Argon2id, PBKDF2. They turn a low-entropy password into a key, slowly, with a salt. Used for file encryption with a passphrase (the capstone). |
| HKDF (RFC 5869) | turns high-entropy input (a DH shared secret, a master key) into one or more keys, quickly, with info labels for separation. Not for passwords. |

Using HKDF on a password gives no brute-force resistance. Using scrypt on a DH secret only wastes time. Choose by input entropy.
