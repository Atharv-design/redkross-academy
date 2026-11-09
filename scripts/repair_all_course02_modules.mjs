import fs from 'fs';

async function repairCourse02() {
  console.log('--- REPAIRING COURSE 02 MODULES ---');

  for (let m = 1; m <= 8; m++) {
    const filePath = `src/services/db/course02/modules/module${m}.js`;
    const mod = await import(`../${filePath}`);
    const exportKey = `module${m}Data`;
    const data = mod[exportKey];
    if (!data || !data.lessons) continue;

    let modified = false;

    data.lessons.forEach(l => {
      let c = l.content || '';
      const orig = c;

      // 1. Unwrap Markdown tables trapped in ``` code blocks
      // e.g., ```\n| Table: ... |\n| ... |\n```
      c = c.replace(/```(?:[a-zA-Z0-9_-]*)\n(\s*\|[\s\S]*?\|\s*)\n```/g, (match, tableText) => {
        console.log(`[M${m} - ${l.id}] Unwrapped table from code block.`);
        return `\n\n${tableText.trim()}\n\n`;
      });

      // 2. Unwrap Markdown images trapped in ``` code blocks
      c = c.replace(/```(?:[a-zA-Z0-9_-]*)\n(\s*!\[[\s\S]*?\))\n```/g, (match, imgText) => {
        console.log(`[M${m} - ${l.id}] Unwrapped image from code block.`);
        return `\n\n${imgText.trim()}\n\n`;
      });

      // 3. Unwrap headings trapped in ``` code blocks
      c = c.replace(/```(?:[a-zA-Z0-9_-]*)\n(\s*###[\s\S]*?)\n```/g, (match, headingText) => {
        console.log(`[M${m} - ${l.id}] Unwrapped heading from code block.`);
        return `\n\n${headingText.trim()}\n\n`;
      });

      // 4. Module 2 Box Table replacements
      if (m === 2) {
        // Table 1: RFC 1122 TCP/IP 4-LAYER SUITE
        if (c.includes('RFC 1122 TCP/IP 4-LAYER SUITE')) {
          c = c.replace(/```[^\n]*\n\s*RFC 1122 TCP\/IP 4-LAYER SUITE\s*\n┌[\s\S]*?└[─┴┘]+\s*\n```/g, 
`| Table: RFC 1122 TCP/IP 4-Layer Suite |
| :--- | :--- |
| TCP/IP Layer | Protocol Examples |
| 4. Application | HTTP, DNS, SMTP, SSH, TLS, NTP, DHCP, BGP |
| 3. Transport | TCP (RFC 9293), UDP (RFC 768), QUIC (RFC 9000) |
| 2. Internet | IPv4 (RFC 791), IPv6 (RFC 8200), ICMP, IPsec |
| 1. Link (Network Access) | Ethernet (802.3), Wi-Fi (802.11), ARP, Hardware Drivers |`);
          console.log(`[M2 - ${l.id}] Converted RFC 1122 box table.`);
        }

        // Table 2: ARCHITECTURAL MAPPING & COMPARISON TABLE
        if (c.includes('ARCHITECTURAL MAPPING & COMPARISON TABLE')) {
          c = c.replace(/```[^\n]*\n\s*ARCHITECTURAL MAPPING & COMPARISON TABLE\s*\n┌[\s\S]*?└[─┴┘]+\s*\n```/g,
`| Table: Architectural Synthesis & Protocol Mapping |
| :---: | :--- | :--- | :--- | :--- |
| OSI # | OSI 7-Layer Model | TCP/IP 4-Layer Suite | 5-Layer Hybrid Model | Representative Standards |
| 7 | Application | Application | Application | HTTP/3, DNS, SSH, SMTP |
| 6 | Presentation | Application | Application | TLS 1.3, JSON, UTF-8 |
| 5 | Session | Application | Application | Sockets, Session Cookies |
| 4 | Transport | Transport | Transport | TCP, UDP, QUIC |
| 3 | Network | Internet | Network | IPv4, IPv6, ICMP, IPsec |
| 2 | Data Link | Link (Network Access) | Data Link | Ethernet (802.3), Wi-Fi (802.11) |
| 1 | Physical | Link (Network Access) | Physical | Cat6A, Single-Mode Fiber, RF |`);
          console.log(`[M2 - ${l.id}] Converted Architectural Mapping box table.`);
        }

        // Table 3: DATA UNIT HIERARCHY (PDUs)
        if (c.includes('DATA UNIT HIERARCHY (PROTOCOL DATA UNITS - PDUs)')) {
          c = c.replace(/```[^\n]*\n\s*DATA UNIT HIERARCHY \(PROTOCOL DATA UNITS - PDUs\)\s*\n┌[\s\S]*?└[─┴┘]+\s*\n```/g,
`| Table: Protocol Data Unit (PDU) Hierarchy |
| :--- | :--- | :--- |
| Protocol Layer | Formal PDU Name | Architectural Composition |
| 7. Application | Message / Data | Application Payload (HTTP, DNS query, TLS record) |
| 4. Transport | Segment (TCP) / Datagram (UDP) | Transport Header + Application Data Payload |
| 3. Network | Packet / Datagram | IP Header + Transport Header + Data Payload |
| 2. Data Link | Frame | Ethernet Header + IP Packet + FCS Trailer |
| 1. Physical | Bits / Symbols | Stream of 0s and 1s on wire / optical pulses / radio waves |`);
          console.log(`[M2 - ${l.id}] Converted PDU Hierarchy box table.`);
        }

        // Table 4: HOP-BY-HOP MUTATION MATRIX
        if (c.includes('HOP-BY-HOP MUTATION MATRIX')) {
          c = c.replace(/```[^\n]*\n\s*HOP-BY-HOP MUTATION MATRIX\s*\n┌[\s\S]*?└[─┴┘]+\s*\n```/g,
`| Table: Hop-by-Hop Header Mutation Matrix |
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
| Layer 7 Application Payload Bytes | NO | Preserved intact end-to-end |`);
          console.log(`[M2 - ${l.id}] Converted Hop Mutation box table.`);
        }

        // Table 5: CROSS-LAYER SECURITY CONTROL MATRIX
        if (c.includes('CROSS-LAYER SECURITY CONTROL MATRIX')) {
          c = c.replace(/```[^\n]*\n\s*CROSS-LAYER SECURITY CONTROL MATRIX\s*\n┌[\s\S]*?└[─┴┘]+\s*\n```/g,
`| Table: Cross-Layer Security Control Matrix |
| :---: | :--- | :--- | :--- |
| Layer | Name | Typical Attack Vectors | Corresponding Defensive Controls |
| 7 | Application | SQLi, XSS, SSRF, Phishing, DNS Tunneling, API Abuse | Web App Firewalls (WAF), Secure Coding, Input Validation, DMARC |
| 6 | Presentation | Malformed Serialization, Deserialization RCE, Unicode Exploits | Strict Schema Validation, Patched Parsers, Safe JSON Decoders |
| 5 | Session | Session Hijacking, Token Prediction, Man-in-the-Middle | Cryptographically Random Tokens, SameSite Cookies, Mutual TLS |
| 4 | Transport | SYN Flood DDoS, Port Scans, TCP Reset Injection | Stateful Firewalls, SYN Cookies, Dynamic Rate Limiting, ACLs |
| 3 | Network | IP Spoofing, BGP Hijacking, ICMP Flood, Smurf Attacks | Anti-Spoofing Filters (uRPF), RPKI Route Validation, IPsec |
| 2 | Data Link | ARP Poisoning, MAC Flooding, VLAN Hopping, Rogue DHCP | Port Security, Dynamic ARP Inspection (DAI), DHCP Snooping, 802.1X |
| 1 | Physical | Wiretapping, Optical Tapping, Cable Severing, RF Jamming | Locked Server Racks, Optical Conduit Alarms, MACsec, Shielding |`);
          console.log(`[M2 - ${l.id}] Converted Cross-Layer Security box table.`);
        }
      }

      // 5. Fix LaTeX escapes in all modules
      // Convert \t -> \text, \t -> \times, \t -> \to, \b -> \mathbf, \b -> \begin, \f -> \frac
      c = c.replace(/\u0009ext\{/g, '\\\\text{');
      c = c.replace(/\u0009imes/g, '\\\\times');
      c = c.replace(/\u0009o\b/g, '\\\\to');
      c = c.replace(/\u0008mathbf/g, '\\\\mathbf');
      c = c.replace(/\u0008egin/g, '\\\\begin');
      c = c.replace(/\u000crac/g, '\\\\frac');
      c = c.replace(/\bext\{Result:\}\s*quad\b/g, '\\\\text{Result:} \\\\quad');
      c = c.replace(/\bextResult:\s*quad\b/g, '\\\\text{Result:} \\\\quad');
      c = c.replace(/\\ext\{/g, '\\\\text{');
      c = c.replace(/\\quad\b/g, '\\\\quad');
      c = c.replace(/\\times\b/g, '\\\\times');
      c = c.replace(/\\to\b/g, '\\\\to');

      if (c !== orig) {
        l.content = c;
        modified = true;
      }
    });

    if (modified) {
      const header = `/**\n * Course 02: Computer Networking for Cybersecurity\n * Module ${m}: ${data.title}\n */\n\n`;
      const code = `${header}export const ${exportKey} = ${JSON.stringify(data, null, 2)};\n`;
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`--> Saved updated ${filePath}`);
    } else {
      console.log(`Module ${m} needed no changes.`);
    }
  }

  console.log('--- REPAIR COMPLETE ---');
}

repairCourse02();
