## About this module

Cryptography turns security goals into mathematics. Encryption keeps data confidential, MACs and signatures detect changes and prove origin, and key exchange lets strangers agree on secrets over an open network. All of it depends on two foundations: keys that attackers cannot guess, which means good randomness, and a clear model of what the attacker can do. This module defines the security goals, explains why cryptographic systems are public while keys are secret, shows how randomness goes right and wrong, and introduces threat modelling for cryptographic designs.

## Why it matters

The strongest algorithm fails with a guessable key. In 2008, a change to Debian's OpenSSL package made its random number generator predictable for nearly two years. Keys generated on affected systems had to be treated as compromised (case study).

## Where it is used

Design reviews of encryption features, key management policies, security architecture, procurement (evaluating vendor cryptography claims), and code review.

## Learning objectives

1. Define confidentiality, integrity, authenticity and non-repudiation in cryptographic terms.
2. Explain Kerckhoffs's principle and why secret algorithms are a red flag.
3. Distinguish CSPRNGs from general-purpose PRNGs and use the right one.
4. Estimate entropy and relate it to brute-force resistance.
5. Build a threat model for a cryptographic design.
6. Recognise the main families of primitives and when each applies.

## Before you start

**Prerequisites:** Course 01; Course 04 (Python basics).

**Estimated study time:** About 7 hours.
