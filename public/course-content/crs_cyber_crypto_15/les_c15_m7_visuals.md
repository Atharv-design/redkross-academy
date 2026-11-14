## Why nonce reuse breaks stream encryption

![Equations showing two ciphertexts made with the same keystream, their XOR equalling the XOR of the plaintexts, and recovery of the second plaintext from the first.](/assets/courses/cyber-15/C15-M07-F1.svg)
*Figure C15-M07-F1. With a repeated nonce the keystream cancels and plaintexts leak (execution-tested).*

## Nonce strategy decision

![Four situations mapped to nonce strategies: per-record keys with random nonces, rotation or extended or misuse-resistant modes for high volume, counters for a single writer, and deterministic nonces for signatures.](/assets/courses/cyber-15/C15-M07-F2.svg)
*Figure C15-M07-F2. Choosing a nonce strategy by design context.*

## Library preference

![A ranked list from protocols and managed services, to high-level libraries, to low-level primitives, with home-made cryptography excluded.](/assets/courses/cyber-15/C15-M07-F3.svg)
*Figure C15-M07-F3. Prefer the highest-level vetted option that meets the need.*
