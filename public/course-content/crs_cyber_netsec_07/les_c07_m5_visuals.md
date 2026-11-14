## VPN extends a trusted boundary

![A diagram of a remote device tunnelling to a corporate gateway with the note that post-connection access must still be least-privilege.](/assets/courses/cyber-07/C07-M05-F1.svg)
*Figure C07-M05-F1. A VPN protects transit; access after connecting must still be least-privilege.*

## TLS protections and the certificate chain

![A diagram of TLS protections and the certificate chain from the server certificate up through an intermediate CA to a trusted root.](/assets/courses/cyber-07/C07-M05-F2.svg)
*Figure C07-M05-F2. TLS protects traffic and authenticates the server via a certificate chain to a trusted root [R1].*

## TLS configuration review - weak versus hardened

![A comparison of the weak TLS configuration (legacy protocols, weak ciphers, 1024-bit key, near-expiry cert) and the hardened one.](/assets/courses/cyber-07/C07-M05-F3.svg)
*Figure C07-M05-F3. The offline review moves the edge from five HIGH weaknesses to none [R3].*
