import fs from 'fs';

// 1. UPDATE MODULE 2
let m2 = fs.readFileSync('src/services/db/course02/modules/module2.js', 'utf8');

// Replace Table 1: RFC 1122 TCP/IP 4-LAYER SUITE
const m2_t1_old = /```(?:[a-zA-Z0-9_-]*)\n\s*RFC 1122 TCP\/IP 4-LAYER SUITE\s*\n┌[\s\S]*?└[─┴┘]+\s*```/g;
const m2_t1_new = `| Table: RFC 1122 TCP/IP 4-Layer Suite |
| :--- | :--- |
| TCP/IP Layer | Protocol Examples |
| 4. Application | HTTP, DNS, SMTP, SSH, TLS, NTP, DHCP, BGP |
| 3. Transport | TCP (RFC 9293), UDP (RFC 768), QUIC (RFC 9000) |
| 2. Internet | IPv4 (RFC 791), IPv6 (RFC 8200), ICMP, IPsec |
| 1. Link (Network Access) | Ethernet (802.3), Wi-Fi (802.11), ARP, Hardware Drivers |`;

// Replace Table 2: ARCHITECTURAL MAPPING & COMPARISON TABLE
const m2_t2_old = /```(?:[a-zA-Z0-9_-]*)\n\s*ARCHITECTURAL MAPPING & COMPARISON TABLE\s*\n┌[\s\S]*?└[─┴┘]+\s*```/g;
const m2_t2_new = `| Table: Architectural Synthesis & Protocol Mapping |
| :---: | :--- | :--- | :--- | :--- |
| OSI # | OSI 7-Layer Model | TCP/IP 4-Layer Suite | 5-Layer Hybrid Model | Representative Standards |
| 7 | Application | Application | Application | HTTP/3, DNS, SSH, SMTP |
| 6 | Presentation | Application | Application | TLS 1.3, JSON, UTF-8 |
| 5 | Session | Application | Application | Sockets, Session Cookies |
| 4 | Transport | Transport | Transport | TCP, UDP, QUIC |
| 3 | Network | Internet | Network | IPv4, IPv6, ICMP, IPsec |
| 2 | Data Link | Link (Network Access) | Data Link | Ethernet (802.3), Wi-Fi (802.11) |
| 1 | Physical | Link (Network Access) | Physical | Cat6A, Single-Mode Fiber, RF |`;

// Replace Table 3: DATA UNIT HIERARCHY (PDUs)
const m2_t3_old = /```(?:[a-zA-Z0-9_-]*)\n\s*DATA UNIT HIERARCHY \(PROTOCOL DATA UNITS - PDUs\)\s*\n┌[\s\S]*?└[─┴┘]+\s*```/g;
const m2_t3_new = `| Table: Protocol Data Unit (PDU) Hierarchy |
| :--- | :--- | :--- |
| Protocol Layer | Formal PDU Name | Architectural Composition |
| 7. Application | Message / Data | Application Payload (HTTP, DNS query, TLS record) |
| 4. Transport | Segment (TCP) / Datagram (UDP) | Transport Header + Application Data Payload |
| 3. Network | Packet / Datagram | IP Header + Transport Header + Data Payload |
| 2. Data Link | Frame | Ethernet Header + IP Packet + FCS Trailer |
| 1. Physical | Bits / Symbols | Stream of 0s and 1s on wire / optical pulses / radio waves |`;

// Replace Table 4: HOP-BY-HOP MUTATION MATRIX
const m2_t4_old = /```(?:[a-zA-Z0-9_-]*)\n\s*HOP-BY-HOP MUTATION MATRIX\s*\n┌[\s\S]*?└[─┴┘]+\s*```/g;
const m2_t4_new = `| Table: Hop-by-Hop Header Mutation Matrix |
| :--- | :---: | :--- |
| Header Field | Mutates Per Hop? | Reason / Operational Function |
| Layer 2 Destination MAC Address | YES (Every Hop) | Rewritten to next router/gateway MAC |
| Layer 2 Source MAC Address | YES (Every Hop) | Rewritten to egress router interface MAC |
| Layer 2 Frame Check Sequence (FCS) | YES (Every Hop) | Recalculated over the freshly mutated L2 frame |
| Layer 3 Time-To-Live (TTL / HopLimit) | YES (Every Hop) | Decremented by 1 per routing hop to prevent loops |
| Layer 3 IPv4 Header Checksum | YES (Every Hop) | Recalculated due to TTL decrement |
| Layer 3 Source IP Address | NO (Without NAT) | Preserved end-to-end between communicating hosts |
| Layer 3 Destination IP Address | NO (Without NAT) | Preserved end-to-end between communicating hosts |
| Layer 4 Source & Destination Ports | NO (Without NAT) | Preserved end-to-end to identify application processes |
| Layer 4 TCP Sequence Numbers | NO | Preserved end-to-end for stream reassembly |
| Layer 7 Application Payload Bytes | NO | Preserved intact end-to-end |`;

// Replace Table 5: CROSS-LAYER SECURITY CONTROL MATRIX
const m2_t5_old = /```(?:[a-zA-Z0-9_-]*)\n\s*CROSS-LAYER SECURITY CONTROL MATRIX\s*\n┌[\s\S]*?└[─┴┘]+\s*```/g;
const m2_t5_new = `| Table: Cross-Layer Security Control Matrix |
| :---: | :--- | :--- | :--- |
| Layer | Name | Typical Attack Vectors | Corresponding Defensive Controls |
| 7 | Application | SQLi, XSS, SSRF, Phishing, DNS Tunneling, API Abuse | Web App Firewalls (WAF), Secure Coding, Input Validation, DMARC |
| 6 | Presentation | Malformed Serialization, Deserialization RCE, Unicode Exploits | Strict Schema Validation, Patched Parsers, Safe JSON Decoders |
| 5 | Session | Session Hijacking, Token Prediction, Man-in-the-Middle | Cryptographically Random Tokens, SameSite Cookies, Mutual TLS |
| 4 | Transport | SYN Flood DDoS, Port Scans, TCP Reset Injection | Stateful Firewalls, SYN Cookies, Dynamic Rate Limiting, ACLs |
| 3 | Network | IP Spoofing, BGP Hijacking, ICMP Flood, Smurf Attacks | Anti-Spoofing Filters (uRPF), RPKI Route Validation, IPsec |
| 2 | Data Link | ARP Poisoning, MAC Flooding, VLAN Hopping, Rogue DHCP | Port Security, Dynamic ARP Inspection (DAI), DHCP Snooping, 802.1X |
| 1 | Physical | Wiretapping, Optical Tapping, Cable Severing, RF Jamming | Locked Server Racks, Optical Conduit Alarms, MACsec, Shielding |`;

let m2Replaced = 0;
if (m2_t1_old.test(m2)) { m2 = m2.replace(m2_t1_old, m2_t1_new); m2Replaced++; }
if (m2_t2_old.test(m2)) { m2 = m2.replace(m2_t2_old, m2_t2_new); m2Replaced++; }
if (m2_t3_old.test(m2)) { m2 = m2.replace(m2_t3_old, m2_t3_new); m2Replaced++; }
if (m2_t4_old.test(m2)) { m2 = m2.replace(m2_t4_old, m2_t4_new); m2Replaced++; }
if (m2_t5_old.test(m2)) { m2 = m2.replace(m2_t5_old, m2_t5_new); m2Replaced++; }

console.log(`Module 2 replaced ${m2Replaced} box tables with Markdown tables.`);
if (m2Replaced > 0) {
  fs.writeFileSync('src/services/db/course02/modules/module2.js', m2, 'utf8');
}
