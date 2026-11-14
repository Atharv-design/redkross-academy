## ECB versus an AEAD

![Three rows showing four plaintext blocks, three of them identical; ECB output repeats the same three blocks, while GCM output is all different.](/assets/courses/cyber-15/C15-M02-F1.svg)
*Figure C15-M02-F1. ECB preserves repetition; GCM does not (execution-tested values).*

## AEAD inputs and outputs

![A box receiving a key, nonce, associated data and plaintext, producing ciphertext and a tag; decryption returns plaintext only if nothing changed.](/assets/courses/cyber-15/C15-M02-F2.svg)
*Figure C15-M02-F2. An AEAD authenticates ciphertext and associated data together.*

## Envelope encryption

![A file is encrypted with a data key, which is wrapped by a KMS key; both are stored together, and decryption requires the KMS to unwrap the data key.](/assets/courses/cyber-15/C15-M02-F3.svg)
*Figure C15-M02-F3. Data keys encrypt data; the KMS key wraps data keys.*
