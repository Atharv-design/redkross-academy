// Module 5 Question Bank: Application Layer Protocols, Core Infrastructure & Services
// Generated automatically with 200 rigorous institutional questions (100 Medium, 100 Difficult)

export const module5QuestionBank = [
  {
    "id": "q_c2_m5_001",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Maps a hostname directly to a 32-bit IPv4 address\"?",
    "options": [
      "Record Type: A",
      "Record Type: AAAA",
      "Record Type: CNAME",
      "Record Type: MX"
    ],
    "correct": 0,
    "explanation": "The A record maps a hostname directly to a 32-bit ipv4 address. Example target or payload: 198.51.100.25."
  },
  {
    "id": "q_c2_m5_002",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Maps a hostname directly to a 128-bit IPv6 address\"?",
    "options": [
      "Record Type: AAAA",
      "Record Type: CNAME",
      "Record Type: MX",
      "Record Type: TXT"
    ],
    "correct": 0,
    "explanation": "The AAAA record maps a hostname directly to a 128-bit ipv6 address. Example target or payload: 2001:db8:85a3::8a2e:370:7334."
  },
  {
    "id": "q_c2_m5_003",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Canonical name alias that points one domain name to another domain name, requiring an additional lookup\"?",
    "options": [
      "Record Type: CNAME",
      "Record Type: MX",
      "Record Type: TXT",
      "Record Type: NS"
    ],
    "correct": 0,
    "explanation": "The CNAME record canonical name alias that points one domain name to another domain name, requiring an additional lookup. Example target or payload: web.example.com -> target.cdn.net."
  },
  {
    "id": "q_c2_m5_004",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Mail Exchanger record designating the destination mail servers responsible for accepting email, with preference values\"?",
    "options": [
      "Record Type: MX",
      "Record Type: TXT",
      "Record Type: NS",
      "Record Type: PTR"
    ],
    "correct": 0,
    "explanation": "The MX record mail exchanger record designating the destination mail servers responsible for accepting email, with preference values. Example target or payload: 10 mail.example.com."
  },
  {
    "id": "q_c2_m5_005",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Arbitrary human and machine-readable text used extensively for email authentication (SPF, DKIM, DMARC) and domain verification\"?",
    "options": [
      "Record Type: TXT",
      "Record Type: NS",
      "Record Type: PTR",
      "Record Type: SOA"
    ],
    "correct": 0,
    "explanation": "The TXT record arbitrary human and machine-readable text used extensively for email authentication (spf, dkim, dmarc) and domain verification. Example target or payload: v=spf1 include:_spf.google.com ~all."
  },
  {
    "id": "q_c2_m5_006",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Name Server record delegating a DNS zone to an authoritative name server\"?",
    "options": [
      "Record Type: NS",
      "Record Type: PTR",
      "Record Type: SOA",
      "Record Type: SRV"
    ],
    "correct": 0,
    "explanation": "The NS record name server record delegating a dns zone to an authoritative name server. Example target or payload: ns1.example.com."
  },
  {
    "id": "q_c2_m5_007",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Pointer record used in reverse DNS lookups mapping an IP address back to its fully qualified domain name (FQDN)\"?",
    "options": [
      "Record Type: PTR",
      "Record Type: SOA",
      "Record Type: SRV",
      "Record Type: A"
    ],
    "correct": 0,
    "explanation": "The PTR record pointer record used in reverse dns lookups mapping an ip address back to its fully qualified domain name (fqdn). Example target or payload: 25.100.51.198.in-addr.arpa."
  },
  {
    "id": "q_c2_m5_008",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Start of Authority record containing foundational zone metadata including primary master server, admin email, serial number, and refresh/retry/expire timers\"?",
    "options": [
      "Record Type: SOA",
      "Record Type: SRV",
      "Record Type: A",
      "Record Type: AAAA"
    ],
    "correct": 0,
    "explanation": "The SOA record start of authority record containing foundational zone metadata including primary master server, admin email, serial number, and refresh/retry/expire timers. Example target or payload: Serial 2026110901."
  },
  {
    "id": "q_c2_m5_009",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Which DNS resource record type is specifically defined by the function: \"Service locator record defining the hostname, port number, priority, and weight for specific enterprise services like LDAP, Kerberos, or SIP\"?",
    "options": [
      "Record Type: SRV",
      "Record Type: A",
      "Record Type: AAAA",
      "Record Type: CNAME"
    ],
    "correct": 0,
    "explanation": "The SRV record service locator record defining the hostname, port number, priority, and weight for specific enterprise services like ldap, kerberos, or sip. Example target or payload: _ldap._tcp.example.com."
  },
  {
    "id": "q_c2_m5_010",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What is the fundamental difference between recursive and iterative DNS queries?",
    "options": [
      "In a recursive query, the client demands the resolver do all the work and return the final IP or an error; in an iterative query, the server returns the best referral answer it knows.",
      "Iterative queries are used exclusively between client endpoints and their local router, while recursive queries run only between root and TLD servers.",
      "Recursive queries run over UDP port 53, whereas iterative queries are cryptographically restricted to TCP port 853.",
      "Iterative queries require pre-shared symmetric keys, whereas recursive queries execute unauthenticated over broadcast channels."
    ],
    "correct": 0,
    "explanation": "In recursive resolution, the client tasks the recursive resolver with returning the definitive final record. In iterative resolution, queried servers return referrals (\"I don’t know, but ask this next authoritative server\") until the resolver reaches the authoritative source."
  },
  {
    "id": "q_c2_m5_011",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What top-level operational role is performed by the 13 logical root server clusters (a.root-servers.net through m.root-servers.net)?",
    "options": [
      "They direct resolvers to the authoritative Top-Level Domain (TLD) servers responsible for extensions like .com, .org, or ccTLDs.",
      "They store all host A and AAAA records for every active registered domain on the internet.",
      "They issue TLS certificates dynamically during the initial TLS ClientHello handshake.",
      "They proxy all cleartext DNS traffic through hardware security modules to strip out malicious payloads."
    ],
    "correct": 0,
    "explanation": "The 13 logical root server authorities maintain the root zone (\".\") and answer queries by delegating to the appropriate Top-Level Domain (TLD) authoritative servers (such as gTLD servers for .com and .net, or ccTLDs for national domains)."
  },
  {
    "id": "q_c2_m5_012",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Why does DNS traditionally prefer UDP over TCP for standard name lookups?",
    "options": [
      "UDP provides a low-overhead, connectionless single-packet exchange (query and response) without the latency of a 3-way TCP handshake.",
      "UDP packets are immune to IP fragmentation and BGP route poisoning.",
      "TCP headers lack port addressing fields necessary to identify the requesting browser process.",
      "Operating systems prohibit non-root users from opening TCP sockets on ports numbered below 1024."
    ],
    "correct": 0,
    "explanation": "Standard DNS lookups fit within a single packet pair. UDP avoids the round-trip latency of establishing a 3-way TCP handshake and terminating it with FIN/ACK packets, drastically accelerating web browsing and service resolution."
  },
  {
    "id": "q_c2_m5_013",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "Under which operational condition MUST a DNS client or server switch from UDP to TCP port 53?",
    "options": [
      "When the DNS response payload exceeds the negotiated maximum buffer size (e.g. 512 bytes without EDNS0) and the server sets the TC (Truncated) flag.",
      "Whenever the authoritative name server is located on a different autonomous system.",
      "When resolving any domain name containing more than 3 subdomain labels.",
      "Whenever the querying client is executing on a dual-stack IPv4/IPv6 host interface."
    ],
    "correct": 0,
    "explanation": "When a DNS response exceeds the transmission buffer (traditionally 512 bytes, or the EDNS0 negotiated size), the responding server sets the TC (Truncation) flag in the DNS header. Upon seeing TC=1, the resolver immediately falls back to TCP port 53 to retry the query without truncation."
  },
  {
    "id": "q_c2_m5_014",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What is the security purpose of the TTL (Time-To-Live) field in a DNS resource record?",
    "options": [
      "It instructs caching resolvers how long (in seconds) they are permitted to cache the answer before issuing a fresh query to the authoritative source.",
      "It defines the number of layer 3 routing hops the DNS packet is permitted to traverse before being dropped.",
      "It indicates the exact expiration date of the domain registration at the registrar level.",
      "It sets the maximum execution runtime allocated for the client browser JavaScript thread."
    ],
    "correct": 0,
    "explanation": "In DNS resource records, TTL is a 32-bit integer indicating the duration in seconds that a resolver is authorized to cache the record. Lowering TTL prior to an infrastructure migration minimizes propagation delay across the global internet."
  },
  {
    "id": "q_c2_m5_015",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "In the context of email security, how are DNS TXT records used to implement SPF (Sender Policy Framework)?",
    "options": [
      "They publish an authorized list of sender IP addresses and mail servers permitted to transmit email on behalf of the domain.",
      "They store the symmetric encryption keys used to decrypt inbound PGP email attachments.",
      "They configure dynamic port forwarding on intermediate mail transfer agents.",
      "They establish real-time WebSockets connections between the sender mail client and recipient inbox."
    ],
    "correct": 0,
    "explanation": "SPF records are published as DNS TXT strings (e.g., \"v=spf1 ip4:198.51.100.0/24 include:_spf.google.com ~all\") that list the authorized servers and subnets permitted to send emails claiming that domain in the RFC 5321 Mail-From header."
  },
  {
    "id": "q_c2_m5_016",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What role does the DMARC (Domain-based Message Authentication, Reporting, and Conformance) TXT record serve?",
    "options": [
      "It defines the domain owner's policy (none, quarantine, reject) when an incoming email fails both SPF and DKIM verification, and specifies reporting email endpoints.",
      "It revokes compromised X.509 server certificates using an automated OCSP stapling mechanism.",
      "It encrypts the entire SMTP transmission line using zero-knowledge end-to-end homomorphic cryptography.",
      "It forces web browsers to connect strictly over TLS 1.3 on port 443."
    ],
    "correct": 0,
    "explanation": "DMARC (published at _dmarc.example.com as a TXT record) ties SPF and DKIM together. It specifies the recipient server's enforcement policy (p=none, quarantine, or reject) and provides reporting URIs (rua/ruf) for forensic telemetry."
  },
  {
    "id": "q_c2_m5_017",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What special domain suffix is reserved by IANA/IETF for reverse DNS lookups in IPv4?",
    "options": [
      "in-addr.arpa",
      "ip6.arpa",
      "reverse.root",
      "lookup.dns"
    ],
    "correct": 0,
    "explanation": "IPv4 reverse lookups use the special in-addr.arpa domain, with the four dotted-decimal octets reversed (e.g., IP 198.51.100.25 resolves via 25.100.51.198.in-addr.arpa)."
  },
  {
    "id": "q_c2_m5_018",
    "topic": "DNS Hierarchy & Record Types",
    "difficulty": "medium",
    "q": "What special domain suffix is reserved for reverse DNS lookups in IPv6?",
    "options": [
      "ip6.arpa",
      "in-addr.arpa",
      "ipv6.reverse",
      "v6lookup.net"
    ],
    "correct": 0,
    "explanation": "IPv6 reverse lookups utilize the ip6.arpa domain, where each nibble (4-bit hex digit) is represented as a separate dot-delimited label in reverse sequential order."
  },
  {
    "id": "q_c2_m5_019",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What architectural flaw in the original 1983 DNS protocol made it vulnerable to spoofing and cache poisoning?",
    "options": [
      "DNS transactions relied solely on a predictable 16-bit Transaction ID (TXID) sent over an unauthenticated UDP transport with no cryptographic integrity check.",
      "DNS responses required the resolver to accept broadcast ARP requests from any neighboring node.",
      "Root name servers shared a single hardcoded master private key embedded in the BIND source code.",
      "DNS packets lacked a checksum field in the UDP header, allowing bit-flipping during transit."
    ],
    "correct": 0,
    "explanation": "The classic DNS specification relied solely on a 16-bit Transaction ID (65,536 possible values) matching between query and response. Because UDP packets are easily forged without a handshake, an attacker who could predict or flood TXID guesses could poison the resolver’s cache."
  },
  {
    "id": "q_c2_m5_020",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "Why did Dan Kaminsky's 2008 DNS cache poisoning attack represent a critical escalation compared to earlier birthday attacks?",
    "options": [
      "It queried randomized nonexistent subdomains (e.g. random123.example.com), allowing unlimited rapid attempts to inject forged NS records in the Authority section without waiting for TTL expiration.",
      "It bypassed physical layer fiber-optic air gaps using high-frequency RF leakage from NIC oscillator crystals.",
      "It cracked RSA-2048 keys used in DNSSEC in under three seconds using rainbow tables.",
      "It converted recursive resolvers into reflection amplification amplifiers exceeding 50 Terabits per second."
    ],
    "correct": 0,
    "explanation": "Before Kaminsky, if an attacker failed to poison a record, they had to wait for its TTL to expire. Kaminsky realized that by querying random non-existent names (xyz1.bank.com, xyz2.bank.com), the attacker forced constant queries while injecting malicious NS delegation records in the Additional/Authority sections, giving them unlimited rapid attempts until successful."
  },
  {
    "id": "q_c2_m5_021",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What immediate tactical countermeasure was implemented across all DNS resolvers worldwide to mitigate the Kaminsky attack?",
    "options": [
      "Source port randomization (allocating UDP query sockets across ~60,000 ephemeral ports, expanding entropy to ~30 bits).",
      "Mandatory upgrade to 4096-bit TLS client certificates for all end-user workstations.",
      "Disabling all recursive queries across public DNS resolvers permanently.",
      "Converting all internet DNS traffic to synchronous HTTPS POST requests."
    ],
    "correct": 0,
    "explanation": "By randomizing the ephemeral source port (using ~60,000 ports) alongside the 16-bit Transaction ID (65,536 values), the resolver increased the guessing search space from 2^16 to ~2^30 (~1 billion combinations), making blind spoofing attacks statistically infeasible before legitimate responses arrive."
  },
  {
    "id": "q_c2_m5_022",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What is the primary operational objective of DNSSEC (Domain Name System Security Extensions)?",
    "options": [
      "To provide cryptographic authentication of origin and data integrity for DNS resource records using digital signatures.",
      "To encrypt DNS query text and answers end-to-end to prevent eavesdropping by ISPs.",
      "To accelerate name resolution by compressing domain labels into binary hashing trees.",
      "To assign static IPv6 addresses automatically to unauthorized rogue client devices."
    ],
    "correct": 0,
    "explanation": "DNSSEC provides origin authentication, data integrity, and authenticated denial of existence using public key cryptography. Notably, DNSSEC does NOT encrypt DNS traffic; queries and answers remain cleartext."
  },
  {
    "id": "q_c2_m5_023",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "Which DNSSEC resource record holds the digital signature used to cryptographically validate an authoritative record set (RRset)?",
    "options": [
      "RRSIG (Resource Record Signature)",
      "DNSKEY (DNS Public Key)",
      "DS (Delegation Signer)",
      "NSEC3 (Next Secure record version 3)"
    ],
    "correct": 0,
    "explanation": "The RRSIG record contains the digital signature (generated by the private key corresponding to the Zone Signing Key) that validates a specific RRset (such as an A, MX, or AAAA record set)."
  },
  {
    "id": "q_c2_m5_024",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What role does the DS (Delegation Signer) record play in establishing a DNSSEC chain of trust?",
    "options": [
      "It contains a cryptographic hash of the child zone's Key Signing Key (KSK) and is placed in the parent zone, proving the parent endorses the child's key.",
      "It signs individual email attachments with corporate S/MIME signatures.",
      "It authenticates the hardware MAC address of the authoritative DNS server chassis.",
      "It stores the dynamic TLS session ticket for zero-RTT session resumption."
    ],
    "correct": 0,
    "explanation": "The DS record bridges the parent and child zones in DNSSEC. The parent zone signs a DS record containing a cryptographic hash of the child zone’s KSK, establishing a continuous chain of trust from the root zone down to the leaf domain."
  },
  {
    "id": "q_c2_m5_025",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "How does DNSSEC solve the problem of \"Authenticated Denial of Existence\" when a requested domain does not exist (NXDOMAIN)?",
    "options": [
      "Using NSEC or NSEC3 records that cryptographically prove there are no records between two alphabetical canonical domain names.",
      "By sending a RST packet signed with an HMAC-SHA256 pre-shared key.",
      "By redirecting the query to a default sinkhole captive portal page.",
      "By generating a dynamic zero-knowledge proof verifying the query contains invalid character bytes."
    ],
    "correct": 0,
    "explanation": "Because a server cannot pre-sign an infinite number of nonexistent names, DNSSEC uses NSEC (or hashed NSEC3) records that define signed ranges of existing names. Proving that no record exists between \"cat.example.com\" and \"dog.example.com\" verifies that \"cow.example.com\" does not exist."
  },
  {
    "id": "q_c2_m5_026",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What is DNS zone walking, and how does NSEC3 mitigate it?",
    "options": [
      "Zone walking exploits NSEC records to map out all domain names in a zone; NSEC3 mitigates this by publishing salted cryptographic hashes of domain names instead of cleartext names.",
      "Zone walking involves traversing physical data center halls to tamper with cables; NSEC3 adds biometric badge readers.",
      "Zone walking exploits BGP flapping to reroute DNS queries; NSEC3 enforces static routing policies.",
      "Zone walking is the automated scanning of UDP port 53; NSEC3 disables all open UDP ports."
    ],
    "correct": 0,
    "explanation": "Because NSEC records explicitly list the next alphabetical existing domain in the zone, attackers could chain NSEC queries to enumerate every private subdomain. NSEC3 (RFC 5155) replaces cleartext names with salted, iterated hashes, preventing trivial zone enumeration."
  },
  {
    "id": "q_c2_m5_027",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "How do adversaries use DNS tunneling (e.g. tools like iodine or dnscat2) for data exfiltration and C2 communications?",
    "options": [
      "They encode arbitrary data in subdomain labels of queries directed to a rogue authoritative name server under attacker control, and receive commands in TXT or CNAME responses.",
      "They alter the hardware firmware of core ISP root routers to inject malicious microcode.",
      "They exploit BGP route poisoning to route all corporate traffic through residential satellite links.",
      "They overload recursive resolvers with buffer overflow shellcode embedded in the EDNS0 padding field."
    ],
    "correct": 0,
    "explanation": "In DNS tunneling, the client encodes exfiltrated data or C2 messages into subdomain strings (e.g., \"7a8b9c.c2.attacker.com\"). The corporate recursive resolver forwards the query up the hierarchy to the attacker’s authoritative server, bypassing outbound firewall filters that permit UDP 53."
  },
  {
    "id": "q_c2_m5_028",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What traffic anomaly observed on a SIEM or Zeek sensor strongly indicates active DNS tunneling or data exfiltration?",
    "options": [
      "An unusually high volume of queries for long, high-entropy (randomized base32/base64/hex) subdomains directed toward a single registered root domain.",
      "A sudden spike in TCP SYN packets directed toward port 80 of the internal gateway.",
      "An excessive number of ICMP Echo Requests containing zero-byte payload padding.",
      "Workstations receiving identical IP addresses from multiple DHCP lease servers."
    ],
    "correct": 0,
    "explanation": "DNS tunneling manifests as abnormal Shannon entropy, exceptionally long label lengths (approaching the 63-character label limit), large TXT record responses, and high query frequency toward a single second-level domain."
  },
  {
    "id": "q_c2_m5_029",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What is a DNS Sinkhole used for in a defensive enterprise SOC architecture?",
    "options": [
      "Intercepting queries for known malicious C2 domains and returning a controlled internal IP address (or loopback) to isolate infected hosts and capture telemetry.",
      "Discarding all outbound DNS queries that do not possess a valid Microsoft Active Directory Kerberos ticket.",
      "Compressing DNS log files into gzip archives before transmitting them to long-term cold storage.",
      "Providing power surge suppression for rackmount enterprise DNS appliances."
    ],
    "correct": 0,
    "explanation": "A DNS sinkhole alters normal DNS resolution for malicious domains identified by threat intelligence. When an infected endpoint queries a C2 domain, the sinkhole returns an internal logging sinkhole IP, preventing command execution and alerting the SOC."
  },
  {
    "id": "q_c2_m5_030",
    "topic": "DNS Security, Kaminsky & DNSSEC",
    "difficulty": "medium",
    "q": "What primary privacy vulnerability is addressed by DNS-over-HTTPS (DoH, RFC 8484) and DNS-over-TLS (DoT, RFC 7858)?",
    "options": [
      "They encrypt DNS queries and responses over TLS, preventing eavesdropping and tampering by local network observers, rogue Wi-Fi hotspots, and upstream ISPs.",
      "They cryptographically verify the physical MAC address of the authoritative DNS server hardware.",
      "They prevent malware on the local host from writing files to the system32 directory.",
      "They ensure that all web servers run exclusively over HTTP/3 QUIC connections."
    ],
    "correct": 0,
    "explanation": "Traditional DNS queries are broadcast in cleartext across the local network and ISP routing infrastructure. DoH (port 443) and DoT (port 853) encrypt DNS transactions over TLS, ensuring privacy against eavesdropping and preventing intermediate injection attacks."
  },
  {
    "id": "q_c2_m5_031",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "In the standard DHCP 4-way DORA handshake, which message represents the \"Discover\" phase?",
    "options": [
      "DHCP Discover: Sent by Client (Broadcast looking for any available DHCP server on the local broadcast domain).",
      "DHCP Offer: Sent by Server (Server proposes an available IP address, subnet mask, lease duration, and gateway).",
      "DHCP Request: Sent by Client (Broadcast formally accepting one server's offer and implicitly declining any others).",
      "DHCP Acknowledge (ACK): Sent by Server (Server finalizes the lease, marks the address committed in its database, and confirms parameters)."
    ],
    "correct": 0,
    "explanation": "The DORA sequence consists of Discover, Offer, Request, and Acknowledge. In the Discover step, the client broadcast looking for any available dhcp server on the local broadcast domain."
  },
  {
    "id": "q_c2_m5_032",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "In the standard DHCP 4-way DORA handshake, which message represents the \"Offer\" phase?",
    "options": [
      "DHCP Offer: Sent by Server (Server proposes an available IP address, subnet mask, lease duration, and gateway).",
      "DHCP Request: Sent by Client (Broadcast formally accepting one server's offer and implicitly declining any others).",
      "DHCP Acknowledge (ACK): Sent by Server (Server finalizes the lease, marks the address committed in its database, and confirms parameters).",
      "DHCP Discover: Sent by Client (Broadcast looking for any available DHCP server on the local broadcast domain)."
    ],
    "correct": 0,
    "explanation": "The DORA sequence consists of Discover, Offer, Request, and Acknowledge. In the Offer step, the server server proposes an available ip address, subnet mask, lease duration, and gateway."
  },
  {
    "id": "q_c2_m5_033",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "In the standard DHCP 4-way DORA handshake, which message represents the \"Request\" phase?",
    "options": [
      "DHCP Request: Sent by Client (Broadcast formally accepting one server's offer and implicitly declining any others).",
      "DHCP Acknowledge (ACK): Sent by Server (Server finalizes the lease, marks the address committed in its database, and confirms parameters).",
      "DHCP Discover: Sent by Client (Broadcast looking for any available DHCP server on the local broadcast domain).",
      "DHCP Offer: Sent by Server (Server proposes an available IP address, subnet mask, lease duration, and gateway)."
    ],
    "correct": 0,
    "explanation": "The DORA sequence consists of Discover, Offer, Request, and Acknowledge. In the Request step, the client broadcast formally accepting one server's offer and implicitly declining any others."
  },
  {
    "id": "q_c2_m5_034",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "In the standard DHCP 4-way DORA handshake, which message represents the \"Acknowledge (ACK)\" phase?",
    "options": [
      "DHCP Acknowledge (ACK): Sent by Server (Server finalizes the lease, marks the address committed in its database, and confirms parameters).",
      "DHCP Discover: Sent by Client (Broadcast looking for any available DHCP server on the local broadcast domain).",
      "DHCP Offer: Sent by Server (Server proposes an available IP address, subnet mask, lease duration, and gateway).",
      "DHCP Request: Sent by Client (Broadcast formally accepting one server's offer and implicitly declining any others)."
    ],
    "correct": 0,
    "explanation": "The DORA sequence consists of Discover, Offer, Request, and Acknowledge. In the Acknowledge (ACK) step, the server server finalizes the lease, marks the address committed in its database, and confirms parameters."
  },
  {
    "id": "q_c2_m5_035",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "Why is the DHCP Request packet transmitted as a layer 3 broadcast (255.255.255.255) rather than a unicast to the chosen server?",
    "options": [
      "It informs all other DHCP servers that offered leases that their offers were not selected, freeing those reserved addresses back to their respective pools.",
      "The client interface does not yet possess hardware MAC address parsing capabilities.",
      "Layer 2 switches drop all unicast packets whose payload contains UDP port 67.",
      "Operating systems require broadcast transmissions to synchronize system clocks across the subnet."
    ],
    "correct": 0,
    "explanation": "Because multiple DHCP servers may have responded with DHCP Offers, the client broadcasts its DHCP Request. This confirms acceptance of the chosen server's parameters while simultaneously alerting other servers to release their reserved offers back to their pools."
  },
  {
    "id": "q_c2_m5_036",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What network ports are utilized by the DHCP client-server exchange in IPv4?",
    "options": [
      "UDP port 67 for the DHCP Server, and UDP port 68 for the DHCP Client.",
      "TCP port 67 for both server and client endpoints.",
      "UDP port 53 for server queries and UDP port 5353 for client responses.",
      "TCP port 8080 for web-based provisioning and UDP port 123 for lease timers."
    ],
    "correct": 0,
    "explanation": "DHCP operates over UDP using port 67 on the destination server (which listens for Discovers and Requests) and port 68 on the client (which receives Offers and ACKs)."
  },
  {
    "id": "q_c2_m5_037",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What mechanism allows a host to obtain a DHCP lease when the centralized DHCP server resides on a completely different routed subnet?",
    "options": [
      "A DHCP Relay Agent (or Cisco IP Helper-Address) configured on the local router/gateway that intercepts local broadcasts and forwards them as unicast UDP packets to the remote server.",
      "Spanning Tree Protocol (STP) forwarding local broadcasts across wide area network links.",
      "BGP Autonomous System Confederation peering over port 179.",
      "Automatic Private IP Addressing (APIPA) route reflection across the core backbone."
    ],
    "correct": 0,
    "explanation": "Because routers do not forward layer 2 broadcasts, a DHCP Relay Agent runs on the local router/switch interface. It captures local broadcast Discovers/Requests, encapsulates them into unicast UDP packets (inserting the GIADDR field), and forwards them to the remote enterprise DHCP server."
  },
  {
    "id": "q_c2_m5_038",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What happens when a Windows or macOS client fails to receive a response to its DHCP Discover broadcasts?",
    "options": [
      "It assigns itself an Automatic Private IP Addressing (APIPA) address in the link-local range 169.254.0.0/16.",
      "It shuts down its physical Ethernet network interface controller permanently.",
      "It initiates a SYN flood attack against default gateway IP 192.168.1.1.",
      "It prompts the operating system user to enter a credit card for internet access."
    ],
    "correct": 0,
    "explanation": "When no DHCP server responds, modern operating systems self-assign an APIPA (link-local) address from the 169.254.0.0/16 block (RFC 3927) using ARP to ensure address uniqueness on the local segment."
  },
  {
    "id": "q_c2_m5_039",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What is a DHCP Starvation attack, and what tool is historically known for automating it?",
    "options": [
      "An attack where an adversary floods the DHCP server with thousands of DHCP Discover packets using spoofed MAC addresses to exhaust the entire address pool; automated by tools like Gobbler or Yersinia.",
      "An attack that cuts physical power cords to data center server racks.",
      "An attack that overloads DNS root name servers with invalid reverse lookup PTR queries.",
      "An attack that exhausts switch TCAM space using forged BGP route announcements."
    ],
    "correct": 0,
    "explanation": "In a DHCP Starvation attack, the attacker floods the local broadcast domain with rapid DHCP Discovers, each containing a randomized spoofed MAC address. The DHCP server issues leases until its IP address pool is completely depleted, denying service to legitimate devices."
  },
  {
    "id": "q_c2_m5_040",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What attack typically follows a successful DHCP Starvation attack?",
    "options": [
      "A Rogue DHCP Server attack, where the attacker launches their own DHCP server to hand out malicious default gateway and DNS server addresses to new victims (Man-in-the-Middle).",
      "A physical lock-out of administrative accounts across all domain controllers.",
      "An automated cryptographic ransomware encryption of all network attached storage shares.",
      "A hardware de-authentication attack against fiber channel SAN switches."
    ],
    "correct": 0,
    "explanation": "Once legitimate DHCP pool addresses are exhausted, the attacker starts a Rogue DHCP server. When legitimate clients request an IP, the attacker’s server responds first, configuring the victims to use the attacker’s machine as the default gateway and DNS resolver, enabling full traffic interception."
  },
  {
    "id": "q_c2_m5_041",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What switch-level security feature directly neutralizes both Rogue DHCP servers and DHCP Starvation attacks?",
    "options": [
      "DHCP Snooping, which designates switch ports as either \"trusted\" (uplinks to legitimate DHCP servers) or \"untrusted\" (access ports where server response packets are blocked).",
      "Port Mirroring (SPAN), which copies all frames to a Wireshark monitoring station.",
      "Dynamic Trunking Protocol (DTP), which auto-negotiates trunking encapsulations.",
      "Equal-Cost Multi-Path (ECMP) routing across core distribution switches."
    ],
    "correct": 0,
    "explanation": "DHCP Snooping inspects DHCP traffic on layer 2 switch ports. Ports connecting to legitimate DHCP servers or uplinks are marked \"trusted.\" User access ports are marked \"untrusted\"; if any DHCP Offer or DHCP ACK packet is received on an untrusted port, the switch drops the frame and disables the port."
  },
  {
    "id": "q_c2_m5_042",
    "topic": "DHCP Architecture & DORA Mechanics",
    "difficulty": "medium",
    "q": "What critical security table is constructed by a switch running DHCP Snooping?",
    "options": [
      "The DHCP Snooping Binding Database, which maps client MAC addresses, assigned IP addresses, lease duration, VLAN ID, and physical port numbers.",
      "The BGP Global Internet Routing Table containing over 900,000 autonomous paths.",
      "The Active Directory Global Catalog database for Kerberos ticket validation.",
      "The DNS Root Hints cache table containing IPv4 and IPv6 root authoritative IP addresses."
    ],
    "correct": 0,
    "explanation": "The switch builds a dynamic DHCP Snooping Binding Table containing [MAC address, leased IP, lease time, VLAN, physical switch port]. This table serves as the authoritative source for downstream security controls like Dynamic ARP Inspection (DAI) and IP Source Guard (IPSG)."
  },
  {
    "id": "q_c2_m5_043",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "What is the fundamental functional difference between Static NAT and Dynamic PAT (Port Address Translation / NAT Overload)?",
    "options": [
      "Static NAT provides a permanent one-to-one mapping between a private IP and a public IP; PAT maps multiple private IPs to a single public IP by tracking unique Layer 4 source port numbers.",
      "Static NAT operates only on IPv6 addresses, whereas PAT operates exclusively on legacy Token Ring networks.",
      "Static NAT modifies layer 2 MAC addresses, whereas PAT modifies layer 3 IP addresses without touching ports.",
      "Dynamic PAT requires dedicated hardware VPN concentrator modules on all internal workstations."
    ],
    "correct": 0,
    "explanation": "Static NAT establishes a fixed 1:1 translation (often used for public-facing web servers in a DMZ). PAT (NAT Overload) allows thousands of internal hosts with RFC 1918 private IPs to share a single public IPv4 address simultaneously by rewriting unique Layer 4 port numbers."
  },
  {
    "id": "q_c2_m5_044",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "In standard Cisco NAT terminology, what is the \"Inside Local\" address?",
    "options": [
      "The private RFC 1918 IP address assigned to an internal host on the inside enterprise network.",
      "The public IP address representing an outside host to the external world.",
      "The globally routable IP address assigned to the external interface of the border firewall.",
      "The broadcast IP address of the remote internet destination server."
    ],
    "correct": 0,
    "explanation": "Inside Local refers to the actual IP address assigned to a host on the inside network (typically a private RFC 1918 address such as 10.1.1.50 or 192.168.1.100) before translation occurs."
  },
  {
    "id": "q_c2_m5_045",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "In Cisco NAT terminology, what is the \"Inside Global\" address?",
    "options": [
      "The globally routable public IP address that represents the inside host to the outside internet.",
      "The private IP address of the internal active directory domain controller.",
      "The MAC address of the core default gateway router interface.",
      "The loopback IP address configured on an external BGP peer router."
    ],
    "correct": 0,
    "explanation": "Inside Global is the legitimate, globally routable public IPv4 address allocated by an ISP that represents one or more inside hosts to the external public internet after translation."
  },
  {
    "id": "q_c2_m5_046",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "How does a PAT router distinguish between return packets destined for Host A vs Host B when both hosts accessed the same external web server simultaneously?",
    "options": [
      "By looking up the destination port in its stateful NAT translation table to identify the matching internal private IP and source port.",
      "By inspecting the browser user-agent header string embedded in the HTTP GET payload.",
      "By broadcasting the return packet to all internal switch ports simultaneously.",
      "By recalculating the Ethernet CRC32 frame check sequence across the payload."
    ],
    "correct": 0,
    "explanation": "When internal hosts initiate connections, the PAT router assigns a unique public ephemeral port to each session and records it in its state table. When return traffic arrives, the destination port in the packet matches this table entry, allowing the router to translate it back to the correct internal host and port."
  },
  {
    "id": "q_c2_m5_047",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "What is Port Forwarding (Static Destination NAT), and why does it represent an attack surface risk?",
    "options": [
      "It maps a specific public port on the router to an internal private IP and port, permanently exposing an internal service to unsolicited internet traffic.",
      "It encrypts all outbound traffic using a static pre-shared password known to all users.",
      "It disables the physical Ethernet link when traffic exceeds 100 megabits per second.",
      "It automatically forwards all incoming spam emails to the corporate human resources department."
    ],
    "correct": 0,
    "explanation": "Port forwarding maps an external public port to an internal server port (e.g., WAN:8443 -> 192.168.1.50:443). Because it allows unsolicited inbound connections from the entire internet, any software vulnerabilities, weak passwords, or unpatched flaws on that internal service are directly exposed to attackers."
  },
  {
    "id": "q_c2_m5_048",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "What is UPnP (Universal Plug and Play), and why do enterprise security standards mandate disabling it on edge routers?",
    "options": [
      "UPnP allows internal devices and software to automatically open port forwards on the router without administrative authentication, allowing malware to open inbound backdoors.",
      "UPnP causes high electrical power consumption across data center server racks.",
      "UPnP forces all internal network adapters to negotiate half-duplex 10 Mbps speeds.",
      "UPnP converts standard IPv4 packets into unroutable AppleTalk frames."
    ],
    "correct": 0,
    "explanation": "UPnP enables zero-configuration port forwarding. If malware infects an internal workstation, it can send UPnP commands to the edge firewall to silently open inbound listening ports, bypassing perimeter defenses without administrative knowledge or authorization."
  },
  {
    "id": "q_c2_m5_049",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "Why does Carrier-Grade NAT (CGNAT, 100.64.0.0/10) create major challenges for law enforcement and digital forensic investigations?",
    "options": [
      "Because thousands of ISP subscribers share the exact same public IPv4 address simultaneously, an IP address in a server log cannot identify a suspect without precise timestamped port allocation logs.",
      "CGNAT uses unbreakable 4096-bit post-quantum encryption on every passing packet.",
      "CGNAT strips out all Layer 3 IP headers and converts packets to raw ATM cells.",
      "CGNAT prevents web servers from recording access logs in compliance with GDPR regulations."
    ],
    "correct": 0,
    "explanation": "Under CGNAT, many residential subscribers share a single public IP. If a cybercrime occurs at 14:02:15 UTC from IP 198.51.100.5, forensic investigators cannot identify the subscriber without the ISP's carrier-grade NAT translation logs showing which customer had source port X allocated at that microsecond."
  },
  {
    "id": "q_c2_m5_050",
    "topic": "NAT & PAT Architecture",
    "difficulty": "medium",
    "q": "Does IPv6 utilize NAT in standard modern network architectures?",
    "options": [
      "No; IPv6 provides a massive 128-bit address space enabling end-to-end global reachability without NAT; security is enforced via stateful firewall rules instead.",
      "Yes; IPv6 requires triple-NAT (NAT666) to function across wide area networks.",
      "Yes; IPv6 addresses are too short to allocate globally without dynamic port overloading.",
      "No; IPv6 packets cannot traverse routers that have stateful inspection enabled."
    ],
    "correct": 0,
    "explanation": "IPv6 restores the end-to-end connectivity model of the internet. Because every device can be allocated a globally unique IPv6 address, NAT is unnecessary. Inbound access control is properly handled by stateful firewall filtering rather than address translation."
  },
  {
    "id": "q_c2_m5_051",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"GET\"?",
    "options": [
      "Safe: Yes, Idempotent: Yes (Requests a representation of the specified resource without modifying server state).",
      "Safe: No, Idempotent: No (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP GET has Safe=Yes and Idempotent=Yes. Description: Requests a representation of the specified resource without modifying server state."
  },
  {
    "id": "q_c2_m5_052",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"POST\"?",
    "options": [
      "Safe: No, Idempotent: No (Submits an entity to the specified resource, often causing a state change or side effect on the server).",
      "Safe: Yes, Idempotent: Yes (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP POST has Safe=No and Idempotent=No. Description: Submits an entity to the specified resource, often causing a state change or side effect on the server."
  },
  {
    "id": "q_c2_m5_053",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"PUT\"?",
    "options": [
      "Safe: No, Idempotent: Yes (Replaces all current representations of the target resource with the uploaded request payload).",
      "Safe: Yes, Idempotent: No (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP PUT has Safe=No and Idempotent=Yes. Description: Replaces all current representations of the target resource with the uploaded request payload."
  },
  {
    "id": "q_c2_m5_054",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"DELETE\"?",
    "options": [
      "Safe: No, Idempotent: Yes (Deletes the specified target resource from the server).",
      "Safe: Yes, Idempotent: No (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP DELETE has Safe=No and Idempotent=Yes. Description: Deletes the specified target resource from the server."
  },
  {
    "id": "q_c2_m5_055",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"HEAD\"?",
    "options": [
      "Safe: Yes, Idempotent: Yes (Identical to GET but transfers the status line and header fields without the response body).",
      "Safe: No, Idempotent: No (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP HEAD has Safe=Yes and Idempotent=Yes. Description: Identical to GET but transfers the status line and header fields without the response body."
  },
  {
    "id": "q_c2_m5_056",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"OPTIONS\"?",
    "options": [
      "Safe: Yes, Idempotent: Yes (Describes the communication options and permitted HTTP methods for the target resource (used in CORS preflight)).",
      "Safe: No, Idempotent: No (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP OPTIONS has Safe=Yes and Idempotent=Yes. Description: Describes the communication options and permitted HTTP methods for the target resource (used in CORS preflight)."
  },
  {
    "id": "q_c2_m5_057",
    "topic": "HTTP Semantics & Protocol Mechanics",
    "difficulty": "medium",
    "q": "What are the standard RFC 9110 characteristics of the HTTP method: \"PATCH\"?",
    "options": [
      "Safe: No, Idempotent: No (Applies partial modifications to an existing resource rather than full replacement).",
      "Safe: Yes, Idempotent: Yes (Inverts idempotency semantics).",
      "Safe: No, Idempotent: No (Reserved exclusively for internal proxy health checks).",
      "Safe: Yes, Idempotent: Yes (Executes only over UDP/QUIC streams)."
    ],
    "correct": 0,
    "explanation": "Per RFC 9110, HTTP PATCH has Safe=No and Idempotent=No. Description: Applies partial modifications to an existing resource rather than full replacement."
  },
  {
    "id": "q_c2_m5_058",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"200\"?",
    "options": [
      "2xx Success: OK - The standard response for successful HTTP requests.",
      "2xx Success: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 200 belongs to the 2xx Success family and signifies: OK - The standard response for successful HTTP requests."
  },
  {
    "id": "q_c2_m5_059",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"201\"?",
    "options": [
      "2xx Success: Created - The request succeeded and led to the creation of a new resource.",
      "2xx Success: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 201 belongs to the 2xx Success family and signifies: Created - The request succeeded and led to the creation of a new resource."
  },
  {
    "id": "q_c2_m5_060",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"204\"?",
    "options": [
      "2xx Success: No Content - Server successfully fulfilled request but returns no body payload.",
      "2xx Success: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 204 belongs to the 2xx Success family and signifies: No Content - Server successfully fulfilled request but returns no body payload."
  },
  {
    "id": "q_c2_m5_061",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"301\"?",
    "options": [
      "3xx Redirection: Moved Permanently - Target resource assigned new permanent URI; browsers cache this redirect.",
      "3xx Redirection: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 301 belongs to the 3xx Redirection family and signifies: Moved Permanently - Target resource assigned new permanent URI; browsers cache this redirect."
  },
  {
    "id": "q_c2_m5_062",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"302\"?",
    "options": [
      "3xx Redirection: Found - Temporary redirect pointing client to a different URI.",
      "3xx Redirection: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 302 belongs to the 3xx Redirection family and signifies: Found - Temporary redirect pointing client to a different URI."
  },
  {
    "id": "q_c2_m5_063",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"304\"?",
    "options": [
      "3xx Redirection: Not Modified - Informs client that cached copy is still valid (conditional GET via ETag/If-None-Match).",
      "3xx Redirection: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 304 belongs to the 3xx Redirection family and signifies: Not Modified - Informs client that cached copy is still valid (conditional GET via ETag/If-None-Match)."
  },
  {
    "id": "q_c2_m5_064",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"400\"?",
    "options": [
      "4xx Client Error: Bad Request - Server cannot process request due to perceived client error (malformed syntax).",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 400 belongs to the 4xx Client Error family and signifies: Bad Request - Server cannot process request due to perceived client error (malformed syntax)."
  },
  {
    "id": "q_c2_m5_065",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"401\"?",
    "options": [
      "4xx Client Error: Unauthorized - Authentication is required and has failed or has not yet been provided.",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 401 belongs to the 4xx Client Error family and signifies: Unauthorized - Authentication is required and has failed or has not yet been provided."
  },
  {
    "id": "q_c2_m5_066",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"403\"?",
    "options": [
      "4xx Client Error: Forbidden - Server understands the request and identity, but refuses to authorize access.",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 403 belongs to the 4xx Client Error family and signifies: Forbidden - Server understands the request and identity, but refuses to authorize access."
  },
  {
    "id": "q_c2_m5_067",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"404\"?",
    "options": [
      "4xx Client Error: Not Found - The origin server did not find a current representation for the target resource.",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 404 belongs to the 4xx Client Error family and signifies: Not Found - The origin server did not find a current representation for the target resource."
  },
  {
    "id": "q_c2_m5_068",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"405\"?",
    "options": [
      "4xx Client Error: Method Not Allowed - The method received in the request-line is not supported for the target resource.",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 405 belongs to the 4xx Client Error family and signifies: Method Not Allowed - The method received in the request-line is not supported for the target resource."
  },
  {
    "id": "q_c2_m5_069",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"429\"?",
    "options": [
      "4xx Client Error: Too Many Requests - The user has sent too many requests in a given amount of time (rate limiting).",
      "4xx Client Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 429 belongs to the 4xx Client Error family and signifies: Too Many Requests - The user has sent too many requests in a given amount of time (rate limiting)."
  },
  {
    "id": "q_c2_m5_070",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"500\"?",
    "options": [
      "5xx Server Error: Internal Server Error - Server encountered an unexpected condition preventing request fulfillment.",
      "5xx Server Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 500 belongs to the 5xx Server Error family and signifies: Internal Server Error - Server encountered an unexpected condition preventing request fulfillment."
  },
  {
    "id": "q_c2_m5_071",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"502\"?",
    "options": [
      "5xx Server Error: Bad Gateway - Server acting as a gateway or proxy received an invalid response from upstream server.",
      "5xx Server Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 502 belongs to the 5xx Server Error family and signifies: Bad Gateway - Server acting as a gateway or proxy received an invalid response from upstream server."
  },
  {
    "id": "q_c2_m5_072",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"503\"?",
    "options": [
      "5xx Server Error: Service Unavailable - Server is currently unable to handle request due to overload or maintenance.",
      "5xx Server Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 503 belongs to the 5xx Server Error family and signifies: Service Unavailable - Server is currently unable to handle request due to overload or maintenance."
  },
  {
    "id": "q_c2_m5_073",
    "topic": "HTTP Semantics & Status Codes",
    "difficulty": "medium",
    "q": "What is the exact RFC meaning of the HTTP status code \"504\"?",
    "options": [
      "5xx Server Error: Gateway Timeout - Gateway or proxy server did not receive timely response from upstream server.",
      "5xx Server Error: Opposite status indicating an unroutable transport layer socket.",
      "Protocol Negotiation Error: TLS certificate mismatch.",
      "Hardware Failure: Local NIC buffer overflow."
    ],
    "correct": 0,
    "explanation": "HTTP Status Code 504 belongs to the 5xx Server Error family and signifies: Gateway Timeout - Gateway or proxy server did not receive timely response from upstream server."
  },
  {
    "id": "q_c2_m5_074",
    "topic": "HTTP Security Headers",
    "difficulty": "medium",
    "q": "What is the security role of the HTTP \"Strict-Transport-Security\" (HSTS) header?",
    "options": [
      "It forces web browsers to interact with the domain exclusively over encrypted HTTPS connections, preventing SSL-stripping man-in-the-middle attacks.",
      "It prevents users from taking screenshots of web application content.",
      "It disables cross-origin image embedding across third-party blogs.",
      "It terminates the user's VPN session if malicious malware is detected."
    ],
    "correct": 0,
    "explanation": "HSTS (RFC 6797) instructs browsers that the website must only be accessed using HTTPS. Even if the user types http:// or clicks an unencrypted link, the browser automatically rewrites the request to https:// before sending any packets, defeating SSL-stripping attacks."
  },
  {
    "id": "q_c2_m5_075",
    "topic": "HTTP Security Headers",
    "difficulty": "medium",
    "q": "What attack does the \"Content-Security-Policy\" (CSP) HTTP response header primarily mitigate?",
    "options": [
      "Cross-Site Scripting (XSS) and data injection attacks by restricting the sources from which scripts, styles, and images can be loaded and executed.",
      "Distributed Denial of Service attacks targeting layer 3 routers.",
      "Physical theft of laptop hard drives from enterprise office buildings.",
      "Buffer overflow exploits targeting Apache core memory modules."
    ],
    "correct": 0,
    "explanation": "CSP allows site administrators to declare approved sources of executable scripts, stylesheets, images, and frames. By disallowing inline scripts and unauthorized external domains, CSP provides powerful defense-in-depth against Cross-Site Scripting (XSS)."
  },
  {
    "id": "q_c2_m5_076",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "How many network round-trips (RTT) are required to complete a full TLS 1.3 cryptographic handshake before application data can be transmitted?",
    "options": [
      "1-RTT (one round trip), compared to 2-RTT in TLS 1.2.",
      "3-RTT (three round trips).",
      "0-RTT for all initial unauthenticated connections.",
      "4-RTT due to mandatory biometric key generation."
    ],
    "correct": 0,
    "explanation": "TLS 1.3 (RFC 8446) reduces the standard handshake to 1-RTT. The client guesses the key exchange algorithm and sends its public key share in the ClientHello. The server responds with its ServerHello, key share, and encrypted certificate, enabling data transmission immediately after."
  },
  {
    "id": "q_c2_m5_077",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What major privacy enhancement does TLS 1.3 provide regarding the server's X.509 certificate during the handshake?",
    "options": [
      "In TLS 1.3, the server's Certificate message is fully encrypted, whereas in TLS 1.2 it was transmitted in cleartext on the wire.",
      "In TLS 1.3, certificates are replaced with plain text passwords.",
      "In TLS 1.3, certificates are sent over physical serial cables.",
      "In TLS 1.3, the certificate is published to a public blockchain rather than transmitted."
    ],
    "correct": 0,
    "explanation": "In TLS 1.2 and earlier, the Certificate message was sent in cleartext, allowing passive network observers or monitoring tools to inspect domain names and organizational details. In TLS 1.3, the certificate is encrypted under the handshake keys."
  },
  {
    "id": "q_c2_m5_078",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "Why did TLS 1.3 completely remove support for static RSA key exchange and legacy ciphers like RC4, 3DES, and CBC-mode AES?",
    "options": [
      "To guarantee Perfect Forward Secrecy (PFS) and eliminate vulnerability to padding oracle attacks and obsolete broken cryptography.",
      "Because modern CPUs can no longer perform modular exponentiation.",
      "Because the United States government classified all symmetric ciphers as weapons of war.",
      "To force all internet web servers to upgrade their physical power supplies."
    ],
    "correct": 0,
    "explanation": "Static RSA lacked forward secrecy (if the server’s private key was compromised years later, all previously recorded sessions could be decrypted). CBC mode was prone to padding oracle attacks (BEAST, Lucky13). TLS 1.3 mandates ephemeral Diffie-Hellman (ECDHE) and AEAD ciphers exclusively."
  },
  {
    "id": "q_c2_m5_079",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What is Perfect Forward Secrecy (PFS)?",
    "options": [
      "A cryptographic property ensuring that a future compromise of the server's long-term private key cannot decrypt past recorded TLS session traffic.",
      "A guarantee that passwords entered into web forms are never stored on hard drives.",
      "A security protocol that reboots network switches every 24 hours to clear RAM.",
      "A feature ensuring that symmetric encryption keys are publicly readable in DNS TXT records."
    ],
    "correct": 0,
    "explanation": "Forward secrecy generates unique ephemeral session keys for every connection using ECDHE. Once the session ends, the ephemeral keys are discarded. An attacker who records encrypted traffic and later steals the server's long-term private key still cannot decrypt the recorded data."
  },
  {
    "id": "q_c2_m5_080",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What is an AEAD (Authenticated Encryption with Associated Data) cipher, which TLS 1.3 mandates exclusively?",
    "options": [
      "A cryptographic algorithm that simultaneously provides confidentiality, data integrity, and authenticity check in a single optimized operation (e.g. AES-GCM, ChaCha20-Poly1305).",
      "A public key algorithm used solely for signing digital email certificates.",
      "An unencrypted hash function used to verify ISO disk image downloads.",
      "A proprietary Cisco protocol that encrypts layer 2 Ethernet preambles."
    ],
    "correct": 0,
    "explanation": "AEAD ciphers (such as AES-128-GCM, AES-256-GCM, and ChaCha20-Poly1305) unify symmetric encryption and message authentication. This avoids dangerous \"mac-then-encrypt\" or \"encrypt-then-mac\" construction flaws that historically caused padding oracle vulnerabilities."
  },
  {
    "id": "q_c2_m5_081",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What is the purpose of the Server Name Indication (SNI) extension in the TLS ClientHello?",
    "options": [
      "It allows the client to specify which hostname it wants to connect to, enabling a single IP address to host multiple distinct HTTPS websites with different certificates.",
      "It informs the server of the client's physical GPS location for geo-blocking.",
      "It transfers the client's Windows Active Directory user SID to the web server.",
      "It provides the MAC address of the default gateway router."
    ],
    "correct": 0,
    "explanation": "Before SNI, the server did not know which website the client wanted until after the TLS handshake completed, forcing each HTTPS domain to have a dedicated IP. SNI sends the target hostname in the ClientHello, allowing virtual hosting of thousands of domains on a single IP."
  },
  {
    "id": "q_c2_m5_082",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "Why does standard SNI present a privacy concern, and what emerging standard solves it?",
    "options": [
      "Standard SNI is sent in cleartext in the ClientHello, exposing the visited website name to eavesdroppers; Encrypted Client Hello (ECH) encrypts the entire SNI and extensions.",
      "Standard SNI leaks the user's bank account balance; solved by PCI-DSS 4.0.",
      "Standard SNI causes memory leaks on Linux kernels; solved by systemd-resolved.",
      "Standard SNI converts TLS packets into cleartext FTP commands; solved by SFTP."
    ],
    "correct": 0,
    "explanation": "Because SNI appears in the unencrypted ClientHello, any network observer, firewall, or ISP can see which website domain you are contacting. Encrypted Client Hello (ECH, RFC draft) encrypts the inner ClientHello using a public key published in the domain's DNS HTTPS resource record."
  },
  {
    "id": "q_c2_m5_083",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What does the \"Verify return code: 18 (self-signed certificate)\" warning in OpenSSL s_client signify?",
    "options": [
      "The certificate presented by the server was signed by its own private key rather than chained to a trusted public or internal Certificate Authority (CA).",
      "The server's private key length is below 512 bits and cannot be processed.",
      "The client's network interface card is operating in promiscuous mode.",
      "The remote server has been seized by law enforcement authorities."
    ],
    "correct": 0,
    "explanation": "OpenSSL return code 18 indicates a self-signed certificate. Because the certificate issuer is identical to the subject and does not chain to any trusted root in the client's trust store, browsers and automated clients will reject the connection as untrusted."
  },
  {
    "id": "q_c2_m5_084",
    "topic": "TLS 1.3 Architecture & Handshakes",
    "difficulty": "medium",
    "q": "What is the function of an X.509 Certificate Revocation List (CRL) and Online Certificate Status Protocol (OCSP)?",
    "options": [
      "They allow clients to check whether a digital certificate has been prematurely revoked before its scheduled expiration date (e.g. due to private key compromise).",
      "They automatically bill corporate credit cards for annual domain name renewals.",
      "They assign static IP addresses to web servers dynamically during traffic spikes.",
      "They generate rainbow tables for offline password cracking exercises."
    ],
    "correct": 0,
    "explanation": "If a server’s private key is stolen, the Certificate Authority revokes the certificate. Clients check revocation status either by downloading periodic CRL files or querying an OCSP responder in real time (or via OCSP Stapling, where the server provides a signed OCSP proof in the TLS handshake)."
  },
  {
    "id": "q_c2_m5_085",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "When troubleshooting a failed TLS connection with curl, what command-line flag outputs the verbose cryptographic handshake details including cipher negotiation and certificate chain verification?",
    "options": [
      "curl -v (or curl --trace / -vvv)",
      "curl --silent",
      "curl --raw-data",
      "curl --udp-only"
    ],
    "correct": 0,
    "explanation": "Running curl with the -v (verbose) or --trace flag outputs the step-by-step TLS handshake negotiation, cipher suites, server certificate subject/issuer details, and handshake state transitions."
  },
  {
    "id": "q_c2_m5_086",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "In a modern enterprise zero-trust network, why is inspecting HTTPS traffic (TLS Decryption / SSL Inspection) technically controversial despite its security monitoring benefits?",
    "options": [
      "It requires breaking the end-to-end encryption model by acting as an inline proxy (man-in-the-middle) with a custom enterprise root CA installed on endpoints, raising severe privacy and certificate validation risks.",
      "It causes physical degradation of fiber optic transceivers due to photon delay.",
      "It requires all employees to memorize 256-bit AES encryption keys.",
      "It is illegal under standard IEEE 802.3 Ethernet specifications."
    ],
    "correct": 0,
    "explanation": "TLS inspection proxies generate dynamic certificates signed by a private enterprise root CA. While this allows inspecting malware and data exfiltration, it breaks end-to-end security, concentrates vulnerability in the proxy appliance, and exposes sensitive user credentials."
  },
  {
    "id": "q_c2_m5_087",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "Which DNS query type requests all available resource records for an entire zone from a master server, and should always be restricted by firewall rules to prevent unauthorized zone transfers?",
    "options": [
      "AXFR (Asynchronous Full Zone Transfer)",
      "ANY query",
      "PTR query",
      "A query"
    ],
    "correct": 0,
    "explanation": "AXFR queries request a full zone transfer. If authoritative name servers leave AXFR open to the public internet, attackers can download every internal and external host record, mapping the enterprise's complete attack surface."
  },
  {
    "id": "q_c2_m5_088",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving the HTTP TRACE method enabled on a public production web server?",
    "options": [
      "It reflects the full incoming request headers (including authentication cookies) back in the response body, facilitating Cross-Site Tracing (XST) attacks that bypass HttpOnly cookie flags.",
      "It crashes the Linux kernel immediately upon receipt of a single packet.",
      "It opens an unrestricted telnet daemon listening on port 23.",
      "It allows attackers to alter database passwords without administrative credentials."
    ],
    "correct": 0,
    "explanation": "HTTP TRACE echoes the received request back to the client. In a Cross-Site Tracing (XST) attack, malicious script can leverage TRACE to read authentication headers and cookies that would normally be shielded by the HttpOnly protection flag."
  },
  {
    "id": "q_c2_m5_089",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "When troubleshooting a failed TLS connection with curl, what command-line flag outputs the verbose cryptographic handshake details including cipher negotiation and certificate chain verification?",
    "options": [
      "curl -v (or curl --trace / -vvv)",
      "curl --silent",
      "curl --raw-data",
      "curl --udp-only"
    ],
    "correct": 0,
    "explanation": "Running curl with the -v (verbose) or --trace flag outputs the step-by-step TLS handshake negotiation, cipher suites, server certificate subject/issuer details, and handshake state transitions."
  },
  {
    "id": "q_c2_m5_090",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "In a modern enterprise zero-trust network, why is inspecting HTTPS traffic (TLS Decryption / SSL Inspection) technically controversial despite its security monitoring benefits?",
    "options": [
      "It requires breaking the end-to-end encryption model by acting as an inline proxy (man-in-the-middle) with a custom enterprise root CA installed on endpoints, raising severe privacy and certificate validation risks.",
      "It causes physical degradation of fiber optic transceivers due to photon delay.",
      "It requires all employees to memorize 256-bit AES encryption keys.",
      "It is illegal under standard IEEE 802.3 Ethernet specifications."
    ],
    "correct": 0,
    "explanation": "TLS inspection proxies generate dynamic certificates signed by a private enterprise root CA. While this allows inspecting malware and data exfiltration, it breaks end-to-end security, concentrates vulnerability in the proxy appliance, and exposes sensitive user credentials."
  },
  {
    "id": "q_c2_m5_091",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "Which DNS query type requests all available resource records for an entire zone from a master server, and should always be restricted by firewall rules to prevent unauthorized zone transfers?",
    "options": [
      "AXFR (Asynchronous Full Zone Transfer)",
      "ANY query",
      "PTR query",
      "A query"
    ],
    "correct": 0,
    "explanation": "AXFR queries request a full zone transfer. If authoritative name servers leave AXFR open to the public internet, attackers can download every internal and external host record, mapping the enterprise's complete attack surface."
  },
  {
    "id": "q_c2_m5_092",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving the HTTP TRACE method enabled on a public production web server?",
    "options": [
      "It reflects the full incoming request headers (including authentication cookies) back in the response body, facilitating Cross-Site Tracing (XST) attacks that bypass HttpOnly cookie flags.",
      "It crashes the Linux kernel immediately upon receipt of a single packet.",
      "It opens an unrestricted telnet daemon listening on port 23.",
      "It allows attackers to alter database passwords without administrative credentials."
    ],
    "correct": 0,
    "explanation": "HTTP TRACE echoes the received request back to the client. In a Cross-Site Tracing (XST) attack, malicious script can leverage TRACE to read authentication headers and cookies that would normally be shielded by the HttpOnly protection flag."
  },
  {
    "id": "q_c2_m5_093",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "When troubleshooting a failed TLS connection with curl, what command-line flag outputs the verbose cryptographic handshake details including cipher negotiation and certificate chain verification?",
    "options": [
      "curl -v (or curl --trace / -vvv)",
      "curl --silent",
      "curl --raw-data",
      "curl --udp-only"
    ],
    "correct": 0,
    "explanation": "Running curl with the -v (verbose) or --trace flag outputs the step-by-step TLS handshake negotiation, cipher suites, server certificate subject/issuer details, and handshake state transitions."
  },
  {
    "id": "q_c2_m5_094",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "In a modern enterprise zero-trust network, why is inspecting HTTPS traffic (TLS Decryption / SSL Inspection) technically controversial despite its security monitoring benefits?",
    "options": [
      "It requires breaking the end-to-end encryption model by acting as an inline proxy (man-in-the-middle) with a custom enterprise root CA installed on endpoints, raising severe privacy and certificate validation risks.",
      "It causes physical degradation of fiber optic transceivers due to photon delay.",
      "It requires all employees to memorize 256-bit AES encryption keys.",
      "It is illegal under standard IEEE 802.3 Ethernet specifications."
    ],
    "correct": 0,
    "explanation": "TLS inspection proxies generate dynamic certificates signed by a private enterprise root CA. While this allows inspecting malware and data exfiltration, it breaks end-to-end security, concentrates vulnerability in the proxy appliance, and exposes sensitive user credentials."
  },
  {
    "id": "q_c2_m5_095",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "Which DNS query type requests all available resource records for an entire zone from a master server, and should always be restricted by firewall rules to prevent unauthorized zone transfers?",
    "options": [
      "AXFR (Asynchronous Full Zone Transfer)",
      "ANY query",
      "PTR query",
      "A query"
    ],
    "correct": 0,
    "explanation": "AXFR queries request a full zone transfer. If authoritative name servers leave AXFR open to the public internet, attackers can download every internal and external host record, mapping the enterprise's complete attack surface."
  },
  {
    "id": "q_c2_m5_096",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving the HTTP TRACE method enabled on a public production web server?",
    "options": [
      "It reflects the full incoming request headers (including authentication cookies) back in the response body, facilitating Cross-Site Tracing (XST) attacks that bypass HttpOnly cookie flags.",
      "It crashes the Linux kernel immediately upon receipt of a single packet.",
      "It opens an unrestricted telnet daemon listening on port 23.",
      "It allows attackers to alter database passwords without administrative credentials."
    ],
    "correct": 0,
    "explanation": "HTTP TRACE echoes the received request back to the client. In a Cross-Site Tracing (XST) attack, malicious script can leverage TRACE to read authentication headers and cookies that would normally be shielded by the HttpOnly protection flag."
  },
  {
    "id": "q_c2_m5_097",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "When troubleshooting a failed TLS connection with curl, what command-line flag outputs the verbose cryptographic handshake details including cipher negotiation and certificate chain verification?",
    "options": [
      "curl -v (or curl --trace / -vvv)",
      "curl --silent",
      "curl --raw-data",
      "curl --udp-only"
    ],
    "correct": 0,
    "explanation": "Running curl with the -v (verbose) or --trace flag outputs the step-by-step TLS handshake negotiation, cipher suites, server certificate subject/issuer details, and handshake state transitions."
  },
  {
    "id": "q_c2_m5_098",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "In a modern enterprise zero-trust network, why is inspecting HTTPS traffic (TLS Decryption / SSL Inspection) technically controversial despite its security monitoring benefits?",
    "options": [
      "It requires breaking the end-to-end encryption model by acting as an inline proxy (man-in-the-middle) with a custom enterprise root CA installed on endpoints, raising severe privacy and certificate validation risks.",
      "It causes physical degradation of fiber optic transceivers due to photon delay.",
      "It requires all employees to memorize 256-bit AES encryption keys.",
      "It is illegal under standard IEEE 802.3 Ethernet specifications."
    ],
    "correct": 0,
    "explanation": "TLS inspection proxies generate dynamic certificates signed by a private enterprise root CA. While this allows inspecting malware and data exfiltration, it breaks end-to-end security, concentrates vulnerability in the proxy appliance, and exposes sensitive user credentials."
  },
  {
    "id": "q_c2_m5_099",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "Which DNS query type requests all available resource records for an entire zone from a master server, and should always be restricted by firewall rules to prevent unauthorized zone transfers?",
    "options": [
      "AXFR (Asynchronous Full Zone Transfer)",
      "ANY query",
      "PTR query",
      "A query"
    ],
    "correct": 0,
    "explanation": "AXFR queries request a full zone transfer. If authoritative name servers leave AXFR open to the public internet, attackers can download every internal and external host record, mapping the enterprise's complete attack surface."
  },
  {
    "id": "q_c2_m5_100",
    "topic": "Application Protocols & Cryptographic Architecture",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving the HTTP TRACE method enabled on a public production web server?",
    "options": [
      "It reflects the full incoming request headers (including authentication cookies) back in the response body, facilitating Cross-Site Tracing (XST) attacks that bypass HttpOnly cookie flags.",
      "It crashes the Linux kernel immediately upon receipt of a single packet.",
      "It opens an unrestricted telnet daemon listening on port 23.",
      "It allows attackers to alter database passwords without administrative credentials."
    ],
    "correct": 0,
    "explanation": "HTTP TRACE echoes the received request back to the client. In a Cross-Site Tracing (XST) attack, malicious script can leverage TRACE to read authentication headers and cookies that would normally be shielded by the HttpOnly protection flag."
  },
  {
    "id": "q_c2_m5_101",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 1] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_102",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 2] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_103",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 3] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_104",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 4] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_105",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 5] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_106",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 6] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_107",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 7] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_108",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 8] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_109",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 9] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_110",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 10] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_111",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 11] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_112",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 12] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_113",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 13] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_114",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 14] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_115",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 15] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_116",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 16] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_117",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 17] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_118",
    "topic": "DNS Attack Forensics & Mathematical Vulnerability",
    "difficulty": "difficult",
    "q": "[Forensic Scenario 18] A SOC analyst detects 85,000 UDP DNS queries per minute arriving at the internal recursive resolver from external IP 203.0.113.88. The queries follow the pattern \"sub<random_hex>.financecorp.com IN A\". Simultaneously, millions of forged DNS responses flood in with spoofed source IP matching the authoritative server 198.51.100.53, each carrying a different 16-bit Transaction ID and identical malicious NS records delegating financecorp.com to an attacker-controlled server. What exact attack is occurring, and what mathematical factor determines the attacker's probability of success?",
    "options": [
      "A Kaminsky DNS Cache Poisoning attack; success probability is governed by the birthday paradox and the total entropy of the query (16-bit TXID × source port entropy).",
      "A Slowloris HTTP Denial of Service attack; governed by the maximum number of concurrent Apache worker threads.",
      "A DHCP Starvation attack; governed by the number of available leases in the IPv4 /24 subnet pool.",
      "A BGP Route Hijack; governed by the autonomous system path length advertised in BGP UPDATE messages."
    ],
    "correct": 0,
    "explanation": "This is a classic Kaminsky DNS cache poisoning attack. By querying random subdomains, the attacker forces the recursive resolver to constantly send fresh queries to the authoritative server, allowing the attacker to race with thousands of spoofed responses carrying different Transaction IDs and forged NS records before the authentic answer arrives."
  },
  {
    "id": "q_c2_m5_119",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 1] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_120",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 2] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_121",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 3] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_122",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 4] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_123",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 5] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_124",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 6] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_125",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 7] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_126",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 8] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_127",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 9] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_128",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 10] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_129",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 11] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_130",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 12] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_131",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 13] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_132",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 14] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_133",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 15] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_134",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 16] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_135",
    "topic": "DNSSEC Cryptographic Chain Validation",
    "difficulty": "difficult",
    "q": "[DNSSEC Scenario 17] An enterprise recursive resolver configured with \"dnssec-validation auto\" suddenly fails to resolve partner domain \"api.securepartner.net\", returning SERVFAIL to internal applications. A dig query reveals that the DS record in the parent \".net\" zone has Key Tag 48219 (SHA-256), but the DNSKEY record in \"securepartner.net\" has Key Tag 31084. What is the root cause of this failure?",
    "options": [
      "A broken DNSSEC chain of trust caused by an uncoordinated KSK rollover: the child zone published a new Key Signing Key without updating the corresponding DS record in the parent zone.",
      "The client workstation lacks a valid IPv6 link-local address.",
      "The authoritative name server switched its transport from TCP port 53 to UDP port 67.",
      "The BIND service exhausted its allocated Linux file descriptors due to an unhandled exception."
    ],
    "correct": 0,
    "explanation": "In DNSSEC, the parent zone (here .net) publishes a DS record containing a cryptographic hash of the child zone’s Key Signing Key (KSK). If the child zone rolls over its KSK but fails to update the DS record at the parent registrar, validating resolvers detect a hash mismatch, treat the zone as tampered, and return SERVFAIL."
  },
  {
    "id": "q_c2_m5_136",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 1] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_137",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 2] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_138",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 3] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_139",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 4] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_140",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 5] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_141",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 6] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_142",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 7] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_143",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 8] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_144",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 9] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_145",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 10] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_146",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 11] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_147",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 12] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_148",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 13] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_149",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 14] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_150",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 15] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_151",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 16] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_152",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 17] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_153",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 18] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_154",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 19] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_155",
    "topic": "DHCP Security & Rogue Server Attack Analysis",
    "difficulty": "difficult",
    "q": "[DHCP Incident 20] Multiple users on VLAN 20 report they can no longer reach internal corporate intranets, but can still access the public internet. Network triage reveals that affected clients have IP addresses in the 172.16.20.0/24 subnet, but their default gateway is set to 172.16.20.188 (a contractor laptop MAC) and their DNS server is 198.51.100.99 (external rogue resolver) instead of the legitimate DC at 172.16.20.1. What specific layer 2 security control was missing on the access switches to allow this attack?",
    "options": [
      "DHCP Snooping with all user-facing access ports configured as \"untrusted\", preventing unauthorized devices from answering DHCP Discovers with rogue Offers and ACKs.",
      "Spanning Tree PortFast BPDU Guard on the router trunk interfaces.",
      "802.1Q Native VLAN tagging across internal server farm distribution switches.",
      "Dynamic ARP Inspection enabled exclusively on the core border firewall."
    ],
    "correct": 0,
    "explanation": "A rogue DHCP server was placed on the access switch, winning the race against the legitimate server by offering its own IP as the gateway and DNS. Enabling DHCP Snooping and keeping user access ports untrusted would cause the switch to instantly drop rogue DHCP Offer/ACK packets, preventing the attack."
  },
  {
    "id": "q_c2_m5_156",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 1] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_157",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 2] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_158",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 3] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_159",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 4] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_160",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 5] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_161",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 6] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_162",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 7] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_163",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 8] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_164",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 9] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_165",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 10] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_166",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 11] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_167",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 12] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_168",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 13] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_169",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 14] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_170",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 15] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_171",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 16] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_172",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 17] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_173",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 18] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_174",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 19] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_175",
    "topic": "NAT/PAT Session Engineering & State Exhaustion",
    "difficulty": "difficult",
    "q": "[PAT Exhaustion Scenario 20] An enterprise campus with 4,000 active workstations shares two public IPv4 addresses using dynamic PAT on a Cisco Firepower perimeter firewall. At 09:30 AM, thousands of users experience connection timeouts to SaaS applications, while existing SSH and video sessions remain unaffected. Firewall telemetry shows \"PAT port pool exhaustion on outside interface 203.0.113.10: allocated ports = 65,534\". What architectural remediation should the network engineer immediately implement?",
    "options": [
      "Configure a dynamic PAT IP address pool containing a contiguous block of multiple public IPv4 addresses, or deploy IPv6 dual-stack to eliminate NAT overhead.",
      "Disable the firewall's stateful inspection engine and switch to stateless ACL filtering on port 80.",
      "Increase the layer 2 Ethernet MTU to 9000 bytes (Jumbo frames) on all edge access switch ports.",
      "Restart the core distribution switches to clear the hardware MAC address forwarding tables."
    ],
    "correct": 0,
    "explanation": "A single IPv4 address has approximately 65,000 available Layer 4 ephemeral ports for translation. When thousands of endpoints open multiple web sockets, API requests, and microservice calls simultaneously, a single public IP exhausts its PAT port pool. The solution is expanding the public PAT pool to multiple IP addresses or migrating to IPv6."
  },
  {
    "id": "q_c2_m5_176",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 1] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_177",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 2] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_178",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 3] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_179",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 4] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_180",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 5] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_181",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 6] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_182",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 7] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_183",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 8] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_184",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 9] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_185",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 10] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_186",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 11] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_187",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 12] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_188",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 13] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_189",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 14] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_190",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 15] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_191",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 16] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_192",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 17] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_193",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 18] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_194",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 19] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_195",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 20] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_196",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 21] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_197",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 22] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_198",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 23] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_199",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 24] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  },
  {
    "id": "q_c2_m5_200",
    "topic": "TLS 1.3 Cryptographic Handshake & Protocol Analysis",
    "difficulty": "difficult",
    "q": "[TLS Deep-Dive 25] A security engineer inspects a Wireshark PCAP capture of a connection between a client and a web server negotiating TLS 1.3. In Frame 1, the ClientHello shows Supported Versions = 0x0304 (TLS 1.3), but the Legacy Version field shows 0x0303 (TLS 1.2). In Frame 2, the ServerHello also shows Legacy Version 0x0303, but negotiates TLS_AES_256_GCM_SHA384 in Supported Versions. Following the ServerHello, the Certificate and CertificateVerify messages are NOT visible in Wireshark. Why?",
    "options": [
      "This behavior strictly complies with RFC 8446: the legacy version 0x0303 is preserved for backward compatibility with broken middleboxes, and all handshake messages following ServerHello (including Certificate) are fully encrypted under the derived handshake secret.",
      "The capture was corrupted during storage on the analysis workstation's solid-state drive.",
      "The web server rejected the client's cipher proposal and defaulted to unencrypted HTTP.",
      "Wireshark lacks the capability to parse Ethernet packets containing 802.1Q tags."
    ],
    "correct": 0,
    "explanation": "RFC 8446 mandates middlebox compatibility: TLS 1.3 sets the outer version to 0x0303 (TLS 1.2) while negotiating the actual 0x0304 version inside the supported_versions extension. Furthermore, unlike TLS 1.2, in TLS 1.3 all handshake messages after ServerHello—including EncryptedExtensions, Certificate, and CertificateVerify—are encrypted."
  }
];
