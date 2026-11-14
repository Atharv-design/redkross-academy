## TLS 1.3 handshake (1-RTT)

![A two-party exchange where the client sends a hello with key shares, the server replies with its key share and an encrypted certificate, signature and finished message, the client verifies and finishes, and encrypted application data follows.](/assets/courses/cyber-15/C15-M06-F1.svg)
*Figure C15-M06-F1. The TLS 1.3 handshake: key shares in the first flight, an encrypted server flight with certificate proof, then application data.*

## Lab outcomes

![A list of five client configurations and their results: one success and four distinct failures.](/assets/courses/cyber-15/C15-M06-F2.svg)
*Figure C15-M06-F2. Five execution-tested TLS outcomes.*

## Certificate validity reductions (SC-081v3)

![A list of maximum validity periods decreasing from 398 days to 200, 100 and 47 days on specified dates, with a note to automate renewal.](/assets/courses/cyber-15/C15-M06-F3.svg)
*Figure C15-M06-F3. The staged reduction of maximum public TLS certificate validity (intermediate dates per secondary reporting; confirm against the Baseline Requirements).*
