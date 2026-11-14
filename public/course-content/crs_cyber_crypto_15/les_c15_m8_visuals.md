## rkcrypt encryption flow

![A passphrase and random salt feed scrypt to make a key; AES-256-GCM encrypts the plaintext with the header as associated data, producing header, ciphertext and tag.](/assets/courses/cyber-15/C15-M08-F1.svg)
*Figure C15-M08-F1. Passphrase and salt derive the key; the header is authenticated as associated data.*

## Decryption checks in order

![A chain of checks on length, format, parameter bounds, key derivation and authenticated decryption, ending in an atomic write, with any failure producing a generic error and no partial file.](/assets/courses/cyber-15/C15-M08-F2.svg)
*Figure C15-M08-F2. Cheap structural checks precede expensive derivation; authentication failures are uniform.*

## Test coverage map

![Six categories of tests with the specific cases covered in each.](/assets/courses/cyber-15/C15-M08-F3.svg)
*Figure C15-M08-F3. The 11 execution-tested rkcrypt tests grouped by property.*
