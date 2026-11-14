| Term | Meaning |
|---|---|
| DNS logs | who asked for which name, which record type and the response code. They are small and cheap, and reveal intent before a connection happens. |
| Flow | who talked to whom, on which port, for how long, and how many bytes in each direction (NetFlow, IPFIX, cloud VPC flow logs). They are medium cost, and payloads are not recorded. |
| Packets | full content where unencrypted, and protocol metadata such as the TLS handshake where encrypted. They are expensive, so capture them at chokepoints or on demand. |

Engineer the stack so that metadata is always on and packets are available where the risk justifies the cost. Put sensors where traffic converges: internet egress, data-centre and cloud boundaries, and between user and server segments (east-west traffic).
