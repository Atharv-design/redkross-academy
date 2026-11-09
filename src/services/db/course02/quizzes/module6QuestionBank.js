// Module 6 Question Bank: Routing, Switching & Network Segmentation
// Generated automatically with 200 rigorous institutional questions (100 Medium, 100 Difficult)

export const module6QuestionBank = [
  {
    "id": "q_c2_m6_001",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "How does a Layer 2 switch dynamically populate its MAC address table (CAM table)?",
    "options": [
      "By inspecting the Source MAC address of every incoming frame and recording it alongside the ingress physical port.",
      "By querying a centralized Active Directory domain controller via LDAP over port 389.",
      "By inspecting the Destination IP address in the Layer 3 packet header.",
      "By broadcasting periodic SNMP discovery requests to all connected endpoints."
    ],
    "correct": 0,
    "explanation": "A switch learns dynamically by examining the Source MAC address of ingress frames. It associates that MAC with the physical port on which the frame arrived and starts an ageing timer."
  },
  {
    "id": "q_c2_m6_002",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What action does a switch take when it receives a frame with an \"Unknown Unicast\" destination MAC address?",
    "options": [
      "It floods the frame out of all active ports within the same VLAN, except the port on which the frame arrived.",
      "It drops the frame immediately and sends an ICMP Destination Unreachable packet.",
      "It buffers the frame permanently in RAM until the network administrator logs in.",
      "It forwards the frame exclusively to the switch's default gateway router."
    ],
    "correct": 0,
    "explanation": "If the destination unicast MAC is not yet learned in the CAM table, the switch must ensure delivery by flooding the frame across all ports belonging to that VLAN, excluding the ingress port."
  },
  {
    "id": "q_c2_m6_003",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What is the fundamental difference between a collision domain and a broadcast domain in switched Ethernet networks?",
    "options": [
      "Each full-duplex switch port is an isolated collision domain, whereas an entire switch (or VLAN) forms a single broadcast domain.",
      "Collision domains operate at Layer 3, while broadcast domains operate at Layer 1.",
      "A broadcast domain is limited to a single physical copper wire, whereas collision domains span entire autonomous systems.",
      "Switches eliminate broadcast domains, leaving only collision domains active."
    ],
    "correct": 0,
    "explanation": "In modern switched Ethernet operating in full duplex, each switch port is an independent collision domain (collisions are physically impossible). A broadcast domain encompasses all devices that receive a broadcast frame (FF:FF:FF:FF:FF:FF), which is bounded by VLANs and routers."
  },
  {
    "id": "q_c2_m6_004",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What network catastrophe occurs when redundant physical Ethernet links connect switches without Spanning Tree Protocol (STP)?",
    "options": [
      "A broadcast storm where broadcast frames circulate endlessly in loops, saturating bandwidth and crashing switch CPUs within seconds.",
      "All switch ports permanently down-negotiate their link speed to 10 Mbps half-duplex.",
      "The switches initiate an automated cryptographic wipe of their firmware flash storage.",
      "The DHCP server address pool becomes permanently corrupted."
    ],
    "correct": 0,
    "explanation": "Without STP, redundant links cause endless Layer 2 loops. Because Ethernet headers have no TTL field to discard aged frames, broadcast frames amplify exponentially, creating a broadcast storm that overwhelms switch CPUs and links."
  },
  {
    "id": "q_c2_m6_005",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What criterion does the Spanning Tree Protocol (IEEE 802.1D) use to elect the Root Bridge of a switched network?",
    "options": [
      "The switch with the lowest Bridge ID (Priority value concatenated with the lowest MAC address).",
      "The switch with the highest IP address configured on its management interface.",
      "The switch possessing the greatest number of 100-Gigabit fiber optic ports.",
      "The switch that has been continuously running with the longest operational uptime."
    ],
    "correct": 0,
    "explanation": "The Root Bridge election is won by the switch with the lowest Bridge ID. Bridge ID consists of a configurable priority (default 32768) plus the system MAC address."
  },
  {
    "id": "q_c2_m6_006",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "Why should security engineers enable BPDU Guard on all user-facing access switch ports?",
    "options": [
      "To immediately disable (err-disable) an access port if an unauthorized switch or rogue STP packet is connected, preventing spanning-tree hijacking.",
      "To encrypt all user web browsing traffic using AES-256-GCM.",
      "To prevent users from modifying their workstation IP addresses.",
      "To throttle file download speeds during peak business hours."
    ],
    "correct": 0,
    "explanation": "If an unauthorized switch or attacker sends BPDUs on an access port, they could hijack the Root Bridge role or trigger topology recalculations. BPDU Guard protects the topology by shutting down any edge port that receives a BPDU."
  },
  {
    "id": "q_c2_m6_007",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What is the standard ageing timer for an inactive entry in a typical enterprise switch MAC address table?",
    "options": [
      "300 seconds (5 minutes)",
      "15 seconds",
      "86,400 seconds (24 hours)",
      "1 second"
    ],
    "correct": 0,
    "explanation": "Most managed switches default to a 300-second (5-minute) ageing timer. If no frames are seen from a MAC address within this window, the entry is aged out to keep the table fresh and accommodate physical moves."
  },
  {
    "id": "q_c2_m6_008",
    "topic": "Switching Mechanics & CAM Tables",
    "difficulty": "medium",
    "q": "What switch feature copies traffic from specific ports or VLANs to a dedicated monitoring interface for packet capture with Wireshark or an IDS?",
    "options": [
      "Port Mirroring / SPAN (Switched Port Analyzer)",
      "Dynamic Trunking Protocol (DTP)",
      "IGMP Snooping",
      "Equal-Cost Multi-Path (ECMP)"
    ],
    "correct": 0,
    "explanation": "Port Mirroring (known on Cisco switches as SPAN) replicates traffic crossing designated source ports or VLANs and sends it out a destination monitoring port where an IDS, packet sniffer, or Wireshark station is attached."
  },
  {
    "id": "q_c2_m6_009",
    "topic": "VLANs & 802.1Q Trunking",
    "difficulty": "medium",
    "q": "What is the primary operational difference between a switch access port and a trunk port?",
    "options": [
      "An access port carries traffic for exactly one VLAN (untagged); a trunk port multiplexes traffic for multiple VLANs using 802.1Q tags.",
      "An access port connects only to routers, while a trunk port connects only to desktop computers.",
      "An access port requires fiber optic transceivers, while a trunk port uses twisted-pair copper.",
      "An access port runs at Layer 3, whereas a trunk port runs at Layer 1."
    ],
    "correct": 0,
    "explanation": "Access ports connect to end-user devices (PCs, printers) and carry frames for a single VLAN without tags. Trunk ports interconnect switches, routers, or hypervisors, carrying multiple VLANs across a single physical link with 802.1Q encapsulation."
  },
  {
    "id": "q_c2_m6_010",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "How many bytes does the IEEE 802.1Q tag add to an Ethernet frame header?",
    "options": [
      "4 bytes (32 bits)",
      "8 bytes (64 bits)",
      "2 bytes (16 bits)",
      "20 bytes (160 bits)"
    ],
    "correct": 0,
    "explanation": "The IEEE 802.1Q tag inserts exactly 4 bytes into the Ethernet frame header between the Source MAC address and the EtherType field."
  },
  {
    "id": "q_c2_m6_011",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "What is the 16-bit Tag Protocol Identifier (TPID) value that identifies an IEEE 802.1Q tagged frame?",
    "options": [
      "0x8100",
      "0x0800",
      "0x86DD",
      "0x0806"
    ],
    "correct": 0,
    "explanation": "TPID value 0x8100 identifies the frame as an IEEE 802.1Q tagged frame (0x0800 is IPv4, 0x86DD is IPv6, 0x0806 is ARP)."
  },
  {
    "id": "q_c2_m6_012",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "How many bits are allocated for the VLAN Identifier (VID) in an IEEE 802.1Q tag, and what is the usable range?",
    "options": [
      "12 bits, providing usable VLAN IDs from 1 to 4094 (0 and 4095 are reserved).",
      "8 bits, providing usable VLAN IDs from 1 to 254.",
      "16 bits, providing usable VLAN IDs from 1 to 65534.",
      "4 bits, providing usable VLAN IDs from 1 to 15."
    ],
    "correct": 0,
    "explanation": "The VID field is 12 bits wide ($2^{12} = 4096$). Values 0 and 4095 are reserved by the standard, yielding usable VLAN IDs from 1 to 4094."
  },
  {
    "id": "q_c2_m6_013",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "What is the Native VLAN on an IEEE 802.1Q trunk, and why does it represent a potential security risk if misconfigured?",
    "options": [
      "The designated VLAN whose traffic is transmitted untagged across the trunk; if left as default VLAN 1, it enables double-tagging VLAN hopping attacks.",
      "The private VLAN reserved exclusively for router console management.",
      "A special VLAN that encrypts Ethernet frames using pre-shared keys.",
      "The VLAN that automatically forwards all traffic to external cloud storage."
    ],
    "correct": 0,
    "explanation": "On an 802.1Q trunk, frames belonging to the Native VLAN are sent without an 802.1Q tag. If left as default VLAN 1 or misconfigured across switches, attackers can exploit double-tagging techniques to hop from an access port into restricted VLANs."
  },
  {
    "id": "q_c2_m6_014",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "Why cannot devices in different VLANs communicate directly at Layer 2 without a router or Layer 3 switch?",
    "options": [
      "Because VLANs partition the physical switch into completely separate broadcast domains; Layer 2 switches never forward frames between different VLANs.",
      "Because different VLANs use incompatible Ethernet cable voltages.",
      "Because operating systems refuse to transmit packets if the VLAN ID is greater than 10.",
      "Because trunk ports block all IP packets that contain TCP headers."
    ],
    "correct": 0,
    "explanation": "VLANs create complete logical isolation at Layer 2. A frame in VLAN 10 will never be delivered to a port in VLAN 20 by Layer 2 switching logic. Cross-VLAN communication strictly requires a Layer 3 routing hop."
  },
  {
    "id": "q_c2_m6_015",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "In the \"Router-on-a-Stick\" inter-VLAN routing design, how does a single physical router interface route traffic between multiple VLANs?",
    "options": [
      "By configuring logical sub-interfaces (e.g., eth0.10, eth0.20), each tagged with its respective 802.1Q VLAN ID and assigned an IP address to act as that VLAN's default gateway.",
      "By converting the physical Ethernet cable into a coaxial cable splitter.",
      "By running dynamic ARP inspection directly on the router console port.",
      "By running BGP over UDP port 53."
    ],
    "correct": 0,
    "explanation": "In a Router-on-a-Stick topology, a single physical interface connects to a switch trunk port. The router divides the interface into virtual sub-interfaces (e.g. g0/0.10), assigns each to an 802.1Q VLAN, and provides the default gateway IP for each subnet."
  },
  {
    "id": "q_c2_m6_016",
    "topic": "VLANs & 802.1Q Tagging",
    "difficulty": "medium",
    "q": "What is a Switched Virtual Interface (SVI) on a Layer 3 multilayer switch?",
    "options": [
      "A virtual Layer 3 interface associated with a specific VLAN that provides routing and gateway services directly in switch hardware at line rate.",
      "A physical fiber optic transceiver module inserted into slot 1.",
      "A software simulation of a hub used for legacy testing.",
      "A dynamic VPN tunnel connected to a cloud provider."
    ],
    "correct": 0,
    "explanation": "An SVI (e.g. \"interface Vlan 10\") is a Layer 3 logical interface on a multilayer switch. It assigns an IP address to the entire VLAN, enabling high-speed hardware-based inter-VLAN routing without needing an external router."
  },
  {
    "id": "q_c2_m6_017",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "What is the primary function of Port Security on an enterprise access switch?",
    "options": [
      "To limit the number of valid MAC addresses that can send traffic into an access port, preventing unauthorized devices and CAM table flooding attacks.",
      "To block port 80 and force all users to browse over port 443.",
      "To encrypt Ethernet frames before transmitting them onto copper cables.",
      "To verify user passwords against an Active Directory database during HTTP requests."
    ],
    "correct": 0,
    "explanation": "Port Security restricts the MAC addresses allowed to transmit on an interface. It limits the maximum number of learned MACs (often to 1 or 2) and takes action (Protect, Restrict, Shutdown) if an unauthorized MAC connects."
  },
  {
    "id": "q_c2_m6_018",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "In Port Security, what occurs when a port configured with the \"Shutdown\" violation mode detects an unauthorized MAC address?",
    "options": [
      "The switch immediately places the port into an \"err-disable\" operational state, shutting off link connectivity and logging an alert.",
      "The switch silently drops the unauthorized packets without alerting anyone.",
      "The switch reboots the entire physical chassis.",
      "The switch formats the connected workstation's hard drive over the network."
    ],
    "correct": 0,
    "explanation": "The Shutdown violation mode immediately transitions the interface into the \"err-disable\" state, cutting all network connectivity until an administrator manually resets the port (or an errdisable recovery timer expires)."
  },
  {
    "id": "q_c2_m6_019",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "How does DHCP Snooping distinguish between authorized corporate DHCP servers and unauthorized rogue DHCP servers?",
    "options": [
      "By classifying switch ports as either \"trusted\" (uplinks to authorized DHCP servers) or \"untrusted\" (user ports where DHCP server responses are strictly dropped).",
      "By requiring DHCP servers to solve a proof-of-work cryptographic puzzle before replying.",
      "By inspecting the digital watermarks embedded in the Ethernet preamble.",
      "By requiring network engineers to physically solder the DHCP server cable into the switch."
    ],
    "correct": 0,
    "explanation": "DHCP Snooping designates ports as trusted or untrusted. Authorized servers connect to trusted ports. User-facing access ports are untrusted; if any DHCP Offer, ACK, or NAK packet is received on an untrusted port, the switch discards it immediately."
  },
  {
    "id": "q_c2_m6_020",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "What authoritative database is dynamically constructed by a switch running DHCP Snooping?",
    "options": [
      "The DHCP Snooping Binding Table, mapping client MAC address, assigned IP, lease time, VLAN, and physical switch port.",
      "The Global BGP Route Table.",
      "The Windows Active Directory Kerberos Key Distribution Center database.",
      "The Domain Name System Root Zone delegation file."
    ],
    "correct": 0,
    "explanation": "DHCP Snooping snoops legitimate DORA exchanges on untrusted ports and records verified leases in the DHCP Snooping Binding Table [MAC, IP, Lease Time, VLAN, Port]."
  },
  {
    "id": "q_c2_m6_021",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "How does Dynamic ARP Inspection (DAI) prevent ARP Cache Poisoning (Man-in-the-Middle) attacks?",
    "options": [
      "It intercepts all ARP requests and replies on untrusted ports and validates their IP-to-MAC bindings against the DHCP Snooping Binding Table.",
      "It converts all ARP broadcasts into unicast TCP packets sent to Google DNS.",
      "It disables ARP completely and requires all hosts to communicate using IPv6 SLAAC.",
      "It encrypts ARP headers using 4096-bit RSA keys."
    ],
    "correct": 0,
    "explanation": "DAI intercepts ARP packets on untrusted ports. Before forwarding an ARP reply, it cross-references the sender IP and MAC against the trusted DHCP Snooping Binding Table. If the pairing does not match, the forged ARP frame is dropped and an alert is logged."
  },
  {
    "id": "q_c2_m6_022",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "What attack is specifically neutralized by IP Source Guard (IPSG)?",
    "options": [
      "IP address spoofing attacks on access switch ports, ensuring devices can only send IP packets matching their verified DHCP-assigned or statically configured IP address.",
      "SQL injection attacks against web applications.",
      "Physical power loss to data center cooling units.",
      "DNS zone transfer reconnaissance over TCP port 53."
    ],
    "correct": 0,
    "explanation": "IP Source Guard operates at Layer 3 on switch access ports. It uses the DHCP Snooping database to program hardware filters that drop any packet whose Source IP does not match the IP address legitimately bound to that specific MAC and port."
  },
  {
    "id": "q_c2_m6_023",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "What are the three core architectural components of an IEEE 802.1X Port-Based Network Access Control system?",
    "options": [
      "Supplicant (client endpoint software), Authenticator (the switch or AP), and Authentication Server (centralized RADIUS/TACACS+ server).",
      "Web browser, Web server, and Database server.",
      "Root CA, Intermediate CA, and Leaf certificate.",
      "Master switch, Slave switch, and Console cable."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X defines three roles: the Supplicant (device requesting network access), the Authenticator (access switch or Wi-Fi AP controlling the physical port), and the Authentication Server (enterprise RADIUS server validating credentials/certificates)."
  },
  {
    "id": "q_c2_m6_024",
    "topic": "Switch Security Architecture",
    "difficulty": "medium",
    "q": "Why should switch management interfaces (SSH, Web UI, SNMP) always reside in an isolated Out-of-Band (OOB) Management VLAN?",
    "options": [
      "To prevent general corporate users and compromised workstations from attempting brute-force attacks, port scans, or exploits against switch control plane software.",
      "Because switch management software cannot run on ports faster than 100 Mbps.",
      "To allow the switch to automatically update its operating system from public peer-to-peer torrent networks.",
      "Because IEEE standards prohibit routing management traffic across fiber links."
    ],
    "correct": 0,
    "explanation": "Isolating management interfaces onto a dedicated Management VLAN (or physical Out-of-Band network) ensures that user endpoints cannot reach switch administrative listening ports (SSH, HTTPS, SNMP), shielding the control plane from reconnaissance and exploits."
  },
  {
    "id": "q_c2_m6_025",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "How does an endpoint TCP/IP stack determine whether a destination IP address is on the local subnet or a remote network?",
    "options": [
      "It performs a bitwise logical AND between the destination IP and its own subnet mask, comparing the result to its own network address.",
      "It pings the destination and checks if the round-trip latency is under 1 millisecond.",
      "It queries the default gateway router via an ICMP Echo Request.",
      "It transmits a broadcast packet and checks if an immediate TCP RST is returned."
    ],
    "correct": 0,
    "explanation": "The host calculates (Local IP AND Subnet Mask) and compares it to (Destination IP AND Subnet Mask). If the resulting network prefixes match, the destination is local (direct delivery); if they differ, the destination is remote and must be sent to the default gateway."
  },
  {
    "id": "q_c2_m6_026",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "When a workstation sends an IP packet to a remote web server on the internet, what are the destination addresses in the Layer 2 and Layer 3 headers?",
    "options": [
      "Layer 2 Destination MAC is the Default Gateway's MAC address; Layer 3 Destination IP is the remote Web Server's IP address.",
      "Layer 2 Destination MAC is the Web Server's MAC address; Layer 3 Destination IP is the Gateway's IP address.",
      "Both Layer 2 and Layer 3 destination addresses point to the local switch.",
      "Layer 2 Destination MAC is FF:FF:FF:FF:FF:FF; Layer 3 Destination IP is 0.0.0.0."
    ],
    "correct": 0,
    "explanation": "This illustrates fundamental hop-by-hop forwarding: the Layer 3 Destination IP remains the ultimate destination (the remote web server) end-to-end, while the Layer 2 Destination MAC address changes at each hop to the next router (the default gateway on the first hop)."
  },
  {
    "id": "q_c2_m6_027",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "What is the fundamental rule governing how a router chooses between multiple matching routes in its routing table?",
    "options": [
      "Longest Prefix Match: The router always selects the matching route with the longest prefix length (the most specific subnet mask).",
      "Shortest Metric: The route with the lowest IP address is always selected regardless of prefix length.",
      "First In First Out: The route that was entered into the configuration first always takes precedence.",
      "Random Equal Balancing: Routes are chosen randomly to evenly distribute packet processing across CPU cores."
    ],
    "correct": 0,
    "explanation": "When forwarding a packet, the router evaluates all routes matching the destination. Under Longest Prefix Match, the route with the most specific prefix (e.g., /24 over /16, /32 over /24) is deterministically selected."
  },
  {
    "id": "q_c2_m6_028",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "If a router has routes for 0.0.0.0/0, 10.0.0.0/8, and 10.1.2.0/24, which route will it select for a packet destined to 10.1.2.55?",
    "options": [
      "10.1.2.0/24, because prefix length 24 is the longest (most specific) matching prefix.",
      "0.0.0.0/0, because the default route has the highest global priority.",
      "10.0.0.0/8, because /8 encompasses the largest total block of IP addresses.",
      "It will drop the packet because multiple overlapping routes create an ambiguous routing condition."
    ],
    "correct": 0,
    "explanation": "The /24 route has 24 matching network bits, /8 has 8 matching bits, and /0 has 0. Under the Longest Prefix Match rule, the /24 route wins."
  },
  {
    "id": "q_c2_m6_029",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "What does the route entry \"0.0.0.0/0\" represent in an IPv4 routing table?",
    "options": [
      "The Default Route (Gateway of Last Resort), which matches all IPv4 destination addresses when no more specific route exists.",
      "An invalid route generated by a corrupt network adapter driver.",
      "A link-local broadcast route used exclusively by Zeroconf.",
      "A loopback route that redirects all traffic back to localhost."
    ],
    "correct": 0,
    "explanation": "The route 0.0.0.0/0 (prefix length 0) matches every possible IPv4 address. Because it has the shortest possible prefix length, it serves as the default route or gateway of last resort, used only when no specific route matches."
  },
  {
    "id": "q_c2_m6_030",
    "topic": "Gateways & Routing Decisions",
    "difficulty": "medium",
    "q": "In a Linux routing table displayed via \"ip route\", what does the parameter \"scope link\" signify?",
    "options": [
      "The network prefix is directly connected to the local physical link; packets to this destination are delivered directly via ARP without traversing a next-hop gateway.",
      "The route is an encrypted VPN tunnel connected across the internet.",
      "The route is currently inactive due to a disconnected Ethernet cable.",
      "The route was learned via BGP peering over satellite."
    ],
    "correct": 0,
    "explanation": "\"scope link\" means the network is directly attached to the local network segment on that interface. The kernel can resolve destination IPs directly to MAC addresses via ARP without forwarding through a next-hop gateway router."
  },
  {
    "id": "q_c2_m6_031",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "What is the primary operational trade-off of using static routing compared to dynamic routing protocols?",
    "options": [
      "Static routes provide high predictability, zero protocol overhead, and no vulnerability to route poisoning, but require manual updates and lack automatic failover when links fail.",
      "Static routes require expensive enterprise licenses, while dynamic routing protocols are free.",
      "Static routes can only forward UDP traffic, whereas dynamic routing forwards both TCP and UDP.",
      "Static routes cannot be inspected by stateful firewalls."
    ],
    "correct": 0,
    "explanation": "Static routing is simple, predictable, and immune to dynamic routing protocol attacks. However, it does not scale to large topologies and cannot automatically reroute traffic around network link failures without manual reconfiguration."
  },
  {
    "id": "q_c2_m6_032",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "Which of the following is an Interior Gateway Protocol (IGP) based on link-state technology, commonly deployed within enterprise campus networks?",
    "options": [
      "OSPF (Open Shortest Path First)",
      "BGP (Border Gateway Protocol)",
      "DNS (Domain Name System)",
      "SNMP (Simple Network Management Protocol)"
    ],
    "correct": 0,
    "explanation": "OSPF is the standard link-state Interior Gateway Protocol used within an enterprise Autonomous System. It uses Dijkstra's algorithm to compute shortest paths based on link bandwidth."
  },
  {
    "id": "q_c2_m6_033",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "How does OSPF distribute topological information across routers in an area?",
    "options": [
      "By flooding Link-State Advertisements (LSAs) so that every router in the area builds an identical Link-State Database (LSDB).",
      "By broadcasting its full routing table to neighboring routers every 30 seconds.",
      "By transmitting JSON payloads to a centralized cloud controller over HTTPS.",
      "By appending route updates into the padding area of ARP packets."
    ],
    "correct": 0,
    "explanation": "OSPF routers do not exchange entire routing tables. Instead, they flood Link-State Advertisements (LSAs) describing their local interfaces and links. Every router in the OSPF area compiles these into an identical Link-State Database (LSDB)."
  },
  {
    "id": "q_c2_m6_034",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "What mathematical algorithm does an OSPF router execute against its Link-State Database to determine the lowest-cost path to every network?",
    "options": [
      "Dijkstra's Shortest Path First (SPF) algorithm",
      "Diffie-Hellman Key Exchange algorithm",
      "Rivest-Shamir-Adleman (RSA) algorithm",
      "SHA-256 cryptographic hashing algorithm"
    ],
    "correct": 0,
    "explanation": "OSPF routers execute Edsger Dijkstra's Shortest Path First (SPF) algorithm. Using the synchronized LSDB, each router computes a shortest-path tree with itself as the root to find the lowest-cost metric to each destination."
  },
  {
    "id": "q_c2_m6_035",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "What transport protocol and port number does the Border Gateway Protocol (BGP-4) use to establish peering sessions between routers?",
    "options": [
      "TCP port 179",
      "UDP port 520",
      "Raw IP Protocol 89",
      "TCP port 443"
    ],
    "correct": 0,
    "explanation": "BGP establishes reliable, point-to-point peering sessions over TCP port 179. (OSPF uses raw IP Protocol 89; RIP uses UDP port 520)."
  },
  {
    "id": "q_c2_m6_036",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "What fundamental loop prevention mechanism does BGP utilize when exchanging route advertisements between Autonomous Systems?",
    "options": [
      "The AS_PATH attribute: A router rejects any incoming BGP update that already contains its own Autonomous System Number (ASN) in the path list.",
      "A 16-bit Time-To-Live counter that decrements to zero.",
      "Spanning Tree Protocol running across international wide area links.",
      "Periodic ARP sweeps across border router interfaces."
    ],
    "correct": 0,
    "explanation": "BGP is a path-vector protocol. As an update traverses each Autonomous System, the AS prepends its ASN to the AS_PATH attribute. If a receiving border router detects its own ASN in the AS_PATH, it knows the route has looped and rejects it."
  },
  {
    "id": "q_c2_m6_037",
    "topic": "Static & Dynamic Routing",
    "difficulty": "medium",
    "q": "What is Resource Public Key Infrastructure (RPKI) used for in global BGP routing?",
    "options": [
      "To provide cryptographic Route Origin Authorizations (ROAs) that prove an Autonomous System is legitimately authorized to advertise a specific IP prefix.",
      "To encrypt the payload of all internet web traffic crossing tier-1 backbones.",
      "To assign private IP addresses to home broadband subscribers.",
      "To accelerate DNS resolution using distributed hash tables."
    ],
    "correct": 0,
    "explanation": "RPKI (RFC 6811) links IP address blocks to an authorized owner ASN using X.509 cryptographic certificates. Border routers perform Route Origin Validation (ROV), dropping unauthorized BGP announcements to defeat BGP route hijacks."
  },
  {
    "id": "q_c2_m6_038",
    "topic": "Network Segmentation Frameworks",
    "difficulty": "medium",
    "q": "What core cybersecurity principle is directly operationalized by network segmentation?",
    "options": [
      "Least Privilege and Defense-in-Depth, by ensuring systems can communicate only as strictly required for their operational function.",
      "Security through Obscurity, by hiding IP addresses behind proxy servers.",
      "Zero-Knowledge Proofs, by eliminating passwords from network switches.",
      "Public Key Infrastructure, by requiring SSL certificates on every switch port."
    ],
    "correct": 0,
    "explanation": "Network segmentation applies Least Privilege to network reachability. It restricts lateral movement by ensuring compromised endpoints cannot reach sensitive database servers, payment processing zones, or industrial control networks."
  },
  {
    "id": "q_c2_m6_039",
    "topic": "Network Segmentation Frameworks",
    "difficulty": "medium",
    "q": "In an enterprise network segmentation design, what should be the default access control policy between distinct security zones?",
    "options": [
      "Default Deny: All inter-zone traffic is blocked unless an explicit, justified firewall rule permits it.",
      "Default Allow: All traffic is permitted unless a specific IP is manually blacklisted.",
      "Dynamic Trust: Traffic is allowed during business hours and blocked on weekends.",
      "Stateless Forwarding: All TCP packets are permitted while all UDP packets are dropped."
    ],
    "correct": 0,
    "explanation": "The foundational principle of secure network zoning is Default Deny (Implicit Deny). Inter-zone firewalls drop all traffic between zones by default; only explicitly documented, business-justified flows are allowed."
  },
  {
    "id": "q_c2_m6_040",
    "topic": "Network Segmentation Frameworks",
    "difficulty": "medium",
    "q": "What is the purpose of an Industrial Demilitarized Zone (IDMZ / Level 3.5) in the Purdue Enterprise Reference Architecture for ICS/SCADA?",
    "options": [
      "To act as an intermediate isolation buffer ensuring that no direct network connections can be established between corporate IT (Level 4) and industrial OT operations (Level 3).",
      "To provide free public Wi-Fi access for factory plant visitors.",
      "To store unencrypted backups of plant programmable logic controllers.",
      "To convert industrial 3-phase electrical power into direct current."
    ],
    "correct": 0,
    "explanation": "Under IEC 62443 / Purdue Model, direct routing between Corporate IT and Industrial Manufacturing is strictly prohibited. The IDMZ (Level 3.5) hosts jump servers, data historians, and patch mirrors, terminating sessions and buffering data between IT and OT."
  },
  {
    "id": "q_c2_m6_041",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_042",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_043",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_044",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_045",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_046",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_047",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_048",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_049",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_050",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_051",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_052",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_053",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_054",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_055",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_056",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_057",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_058",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_059",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_060",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_061",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_062",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_063",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_064",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_065",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_066",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_067",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_068",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_069",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_070",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_071",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_072",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_073",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_074",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_075",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_076",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_077",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_078",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_079",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_080",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_081",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_082",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_083",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_084",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_085",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_086",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_087",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_088",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_089",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_090",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_091",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_092",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_093",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_094",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_095",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_096",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_097",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "When troubleshooting a host that can reach other devices on its local subnet but cannot reach the internet, which configuration parameter is most likely missing or incorrect?",
    "options": [
      "The Default Gateway IP address",
      "The Subnet Mask",
      "The Layer 2 MAC address",
      "The 802.1Q Native VLAN tag"
    ],
    "correct": 0,
    "explanation": "If local communication succeeds (ARP works on the local segment) but remote traffic fails, the host either lacks a valid default gateway IP or has an unreachable gateway address configured."
  },
  {
    "id": "q_c2_m6_098",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "What is the security hazard of leaving Dynamic Trunking Protocol (DTP) enabled on user-facing switch access ports?",
    "options": [
      "An attacker can send DTP negotiation packets to trick the switch into forming a trunk link, granting the attacker access to all VLANs traversing the switch.",
      "It causes physical copper pins in the RJ-45 jack to short circuit.",
      "It prevents the switch from participating in OSPF routing areas.",
      "It allows unauthorized users to modify DNS records on external root servers."
    ],
    "correct": 0,
    "explanation": "DTP automatically negotiates trunking. If enabled on access ports, an attacker running tools like Yersinia can negotiate a trunk link with the switch, gaining direct access to all VLAN traffic passing through the chassis."
  },
  {
    "id": "q_c2_m6_099",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "In a micro-segmentation architecture, where is network security policy enforced?",
    "options": [
      "At the individual workload, virtual machine, or container level (often via host-based firewalls or SDN hypervisor filters).",
      "Exclusively on the border BGP router connecting to the internet.",
      "On the building's physical electrical circuit breakers.",
      "At the centralized corporate email gateway server."
    ],
    "correct": 0,
    "explanation": "Micro-segmentation enforces security policies granularly at the individual workload, VM, or container level inside data centers and clouds, preventing lateral movement even between servers residing on the exact same subnet."
  },
  {
    "id": "q_c2_m6_100",
    "topic": "Switching, Routing & Segmentation Principles",
    "difficulty": "medium",
    "q": "During a major ransomware outbreak, how can network segmentation assist incident response teams with rapid containment?",
    "options": [
      "By dynamically moving infected endpoints into an isolated Quarantine VLAN via 802.1X/NAC or applying emergency inter-zone firewall blocks to halt lateral propagation.",
      "By increasing the MTU size on core routers to flush out malware packets.",
      "By converting all switches from full-duplex to half-duplex mode.",
      "By rebooting all domain controllers simultaneously."
    ],
    "correct": 0,
    "explanation": "Segmentation enables surgical containment: incident response teams can isolate infected endpoints into a quarantine VLAN (cutting access to servers while maintaining SOC forensic access) or severed firewall zones, stopping ransomware spread without disconnecting the entire enterprise."
  },
  {
    "id": "q_c2_m6_101",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 1] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_102",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 2] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_103",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 3] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_104",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 4] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_105",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 5] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_106",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 6] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_107",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 7] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_108",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 8] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_109",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 9] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_110",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 10] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_111",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 11] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_112",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 12] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_113",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 13] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_114",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 14] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_115",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 15] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_116",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 16] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_117",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 17] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_118",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 18] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_119",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 19] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_120",
    "topic": "Global BGP Hijacking & Longest Prefix Match Forensics",
    "difficulty": "difficult",
    "q": "[Global BGP Incident 20] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
    "options": [
      "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
      "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
      "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
      "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
    ],
    "correct": 0,
    "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
  },
  {
    "id": "q_c2_m6_121",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 1] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_122",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 2] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_123",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 3] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_124",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 4] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_125",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 5] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_126",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 6] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_127",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 7] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_128",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 8] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_129",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 9] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_130",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 10] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_131",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 11] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_132",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 12] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_133",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 13] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_134",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 14] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_135",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 15] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_136",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 16] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_137",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 17] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_138",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 18] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_139",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 19] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_140",
    "topic": "BGP Routing Automation & Critical Infrastructure Dependency",
    "difficulty": "difficult",
    "q": "[Infrastructure Catastrophe 20] On 4 October 2021, a misconfigured maintenance audit command severed all backbone connections between Meta's data centers. Meta's authoritative DNS servers, engineered to automatically withdraw their BGP Anycast route advertisements if they lose connectivity to back-end databases, immediately withdrew their routes. What compounding operational failure severely paralyzed Meta's engineering teams during remediation?",
    "options": [
      "Loss of DNS and BGP reachability broke internal corporate communication tools, ticketing systems, and badge access control systems, physically locking engineers out of data centers and server rooms.",
      "The switches' CAM tables experienced an irreversible hardware memory burnout requiring board-level replacement.",
      "All user passwords stored in Active Directory were cryptographically erased due to an automated fail-safe.",
      "The physical fiber optic cables connecting North America to Europe were severed by commercial fishing trawlers."
    ],
    "correct": 0,
    "explanation": "Meta's outage illustrated the critical circular dependency of modern infrastructure. When BGP routes were withdrawn and DNS failed, employees could not access internal tools, email, or monitoring dashboards. Worse, electronic door locks and badge access systems depended on internal network authentication, physically locking engineers out of the server rooms where out-of-band recovery had to occur."
  },
  {
    "id": "q_c2_m6_141",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 1] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_142",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 2] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_143",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 3] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_144",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 4] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_145",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 5] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_146",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 6] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_147",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 7] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_148",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 8] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_149",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 9] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_150",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 10] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_151",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 11] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_152",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 12] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_153",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 13] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_154",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 14] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_155",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 15] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_156",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 16] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_157",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 17] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_158",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 18] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_159",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 19] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_160",
    "topic": "Layer 2 Exploitation & Access Switch Defense",
    "difficulty": "difficult",
    "q": "[Layer 2 Penetration Test 20] A penetration tester connects a laptop running Kali Linux to an access switch port on VLAN 10. They execute \"macof -i eth0 -n 150000\", flooding the switch with 150,000 randomized source MAC addresses per minute. Within 30 seconds, Wireshark on the tester's laptop begins capturing private unicast HTTP and SSH traffic exchanged between two entirely different hosts on ports 5 and 8. What internal hardware condition occurred on the switch, and what exact configuration would permanently eliminate this attack?",
    "options": [
      "CAM table exhaustion forced the switch into fail-open (hub-like) mode, causing all subsequent unknown unicast frames to be flooded out of all ports; mitigated by enabling Port Security with a maximum MAC limit and shutdown violation.",
      "The switch's Spanning Tree engine elected the penetration tester's laptop as the Root Bridge; mitigated by disabling STP.",
      "The switch's power supply overheated and switched into half-duplex passive mode; mitigated by upgrading cooling fans.",
      "The 802.1Q trunk link dropped its Native VLAN; mitigated by enabling Dynamic Trunking Protocol."
    ],
    "correct": 0,
    "explanation": "CAM table flooding overflows the switch's limited memory. Once the CAM table is full, the switch cannot learn new addresses and falls back to treating all traffic as \"unknown unicast,\" flooding frames to all ports like a hub. Enabling Port Security (`switchport port-security maximum 2`) drops unauthorized frames and prevents CAM exhaustion."
  },
  {
    "id": "q_c2_m6_161",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 1] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_162",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 2] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_163",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 3] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_164",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 4] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_165",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 5] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_166",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 6] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_167",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 7] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_168",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 8] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_169",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 9] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_170",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 10] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_171",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 11] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_172",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 12] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_173",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 13] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_174",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 14] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_175",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 15] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_176",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 16] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_177",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 17] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_178",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 18] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_179",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 19] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_180",
    "topic": "VLAN Hopping & 802.1Q Encapsulation Flaws",
    "difficulty": "difficult",
    "q": "[VLAN Hopping Scenario 20] An attacker connected to an access port in VLAN 10 crafts a raw Ethernet frame containing two IEEE 802.1Q tags: an outer tag of VLAN 10 (which happens to match the Native VLAN on the trunk connecting Switch 1 to Switch 2) and an inner tag of VLAN 20 (the target server VLAN). When Switch 1 forwards the frame across the trunk to Switch 2, Switch 2 delivers the frame directly to a server in VLAN 20. Why did this double-tagging attack succeed?",
    "options": [
      "Switch 1 stripped the outer VLAN 10 tag because it matched the trunk's untagged Native VLAN, leaving the inner VLAN 20 tag intact; Switch 2 then inspected the inner tag and forwarded the frame into VLAN 20.",
      "Switch 2 was running RIPv1 instead of OSPFv3.",
      "The attacker used an unencrypted ARP broadcast to overwrite the switch's default gateway.",
      "The fiber optic transceiver on Switch 1 inverted the binary polarity of the Ethernet preamble."
    ],
    "correct": 0,
    "explanation": "In a double-tagging attack, when the frame traverses the trunk, the first switch strips the outer tag because it matches the trunk's Native VLAN. The frame arrives at the second switch with only the inner tag (VLAN 20). The second switch reads VLAN 20 and forwards it to the victim port. Mitigated by setting Native VLAN to an unused VLAN or tagging native traffic."
  },
  {
    "id": "q_c2_m6_181",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 1] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_182",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 2] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_183",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 3] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_184",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 4] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_185",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 5] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_186",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 6] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_187",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 7] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_188",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 8] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_189",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 9] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_190",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 10] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_191",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 11] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_192",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 12] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_193",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 13] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_194",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 14] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_195",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 15] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_196",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 16] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_197",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 17] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_198",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 18] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_199",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 19] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  },
  {
    "id": "q_c2_m6_200",
    "topic": "OT/ICS Segmentation & Purdue Model Engineering",
    "difficulty": "difficult",
    "q": "[Critical Infrastructure Audit 20] During a cybersecurity architecture review of an oil refinery, auditors discover that an engineering workstation in Corporate IT (Purdue Level 4) has a dual-homed secondary network card plugged directly into a switch on the SCADA supervisory control network (Purdue Level 2) so an engineer can monitor tank levels from their desk. What catastrophic architectural risk does this dual-homed machine introduce, and how should it be remediated under IEC 62443 standards?",
    "options": [
      "It creates an unmonitored bridge that bypasses the Level 3.5 Industrial DMZ (IDMZ), allowing an IT ransomware infection to traverse directly into physical control systems; remediated by disconnecting the dual-homed link and forcing all access through an IDMZ jump host with MFA.",
      "It causes high electrical resistance across the programmable logic controller backplane.",
      "It violates BGP autonomous system peering policies on the regional border router.",
      "It forces all industrial actuators to operate in reverse mechanical rotation."
    ],
    "correct": 0,
    "explanation": "Dual-homed systems across IT and OT violate core IEC 62443 / Purdue Model principles. If the corporate laptop is infected with malware (e.g. ransomware), the attacker can pivot directly across the second NIC into Level 2 SCADA controllers, bypassing all perimeter firewalls. Remediated by removing the direct link and routing through an IDMZ jump host with MFA."
  }
];
