## Lab PKI hierarchy

![A vertical chain from a self-signed root to an issuing intermediate to a server leaf certificate, with constraints and lifetimes for each.](/assets/courses/cyber-15/C15-M05-F1.svg)
*Figure C15-M05-F1. The three-tier PKI created in the lab.*

## Validation steps and lab errors

![A list of validation steps, each with the corresponding failure seen in the lab and its OpenSSL error code.](/assets/courses/cyber-15/C15-M05-F2.svg)
*Figure C15-M05-F2. Validation steps mapped to OpenSSL error codes observed in the lab.*

## Sign and verify

![A message is hashed and signed; a recipient hashes the received message and verifies with the public key, whose ownership is established by a certificate chain to a trusted root.](/assets/courses/cyber-15/C15-M05-F3.svg)
*Figure C15-M05-F3. Signature verification proves integrity and origin; certificates establish whose key it is.*
