/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 1 Question Bank: Network Fundamentals
 * Exactly 200 Questions (100 Medium, 100 Difficult)
 * Randomizable, scenario-driven with comprehensive architectural rationales.
 */

export const c2_module1QuestionBank = [
  {
    "id": "q_c2_m1_001",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "An enterprise deploys a dedicated Fibre Channel fabric to interconnect clustered SQL database servers with petabyte-tier flash arrays. Which network classification correctly defines this deployment?",
    "options": [
      "Storage Area Network (SAN)",
      "Campus Area Network (CAN)",
      "Metropolitan Area Network (MAN)",
      "Software-Defined WAN (SD-WAN)"
    ],
    "correct": 0,
    "explanation": "A Storage Area Network (SAN) is an isolated, high-speed specialized network designed specifically to attach block-level storage arrays to compute servers via protocols like Fibre Channel or iSCSI."
  },
  {
    "id": "q_c2_m1_002",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "A regional hospital system links its primary medical facility to five satellite outpatient clinics located across a 35-kilometer municipal radius using carrier dark fiber. What network scale does this represent?",
    "options": [
      "Metropolitan Area Network (MAN)",
      "Local Area Network (LAN)",
      "Personal Area Network (PAN)",
      "Wireless Mesh Network (WMN)"
    ],
    "correct": 0,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire municipality or urban region (typically 5 to 50 km), often utilizing leased dark fiber or carrier metro optical circuits."
  },
  {
    "id": "q_c2_m1_003",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "A corporate employee connects a wireless smartwatch, noise-canceling headphones, and a laptop via Bluetooth Low Energy within a 3-meter radius. What classification defines this micro-network?",
    "options": [
      "Personal Area Network (PAN)",
      "Local Area Network (LAN)",
      "Campus Area Network (CAN)",
      "Storage Area Network (SAN)"
    ],
    "correct": 0,
    "explanation": "A Personal Area Network (PAN) interconnects devices localized around a single individual, typically spanning an operational distance of 1 to 10 meters via Bluetooth, BLE, or NFC."
  },
  {
    "id": "q_c2_m1_004",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "In an enterprise local area network, why is the physical Star topology universally favored over the legacy Bus topology?",
    "options": [
      "A physical cable break between a switch and one workstation only isolates that single host, whereas a bus cable break collapses the entire segment.",
      "Star topologies eliminate the requirement for Media Access Control (MAC) addresses on client interfaces.",
      "Star topologies operate without active intermediary electronic hardware or power supplies.",
      "Star topologies allow infinite copper cable distances without signal attenuation."
    ],
    "correct": 0,
    "explanation": "In a physical star topology, each node connects to a dedicated switch port via an independent cable run. A severance in one cable affects only that node, avoiding the catastrophic segment failure of a severed shared bus."
  },
  {
    "id": "q_c2_m1_005",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "How many physical point-to-point communication links are mathematically required to build a fully meshed network comprising 12 critical WAN routing nodes?",
    "options": [
      "66 links (calculated as N*(N-1)/2)",
      "144 links (calculated as N^2)",
      "24 links (calculated as 2*N)",
      "12 links (calculated as N)"
    ],
    "correct": 0,
    "explanation": "The formula for a full mesh topology is N*(N-1)/2. For 12 nodes: 12 * 11 / 2 = 66 individual point-to-point links."
  },
  {
    "id": "q_c2_m1_006",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "What is the primary operational role of the Core layer in the classic Three-Tier Enterprise Hierarchical model?",
    "options": [
      "High-speed, low-latency transport across the enterprise backbone with minimal packet filtering or inspection overhead.",
      "Enforcing end-user 802.1X port security and dynamic host configuration leases.",
      "Terminating user VLANs and inspecting ingress HTTP traffic for OWASP vulnerabilities.",
      "Providing physical wireless radio access points for mobile endpoints."
    ],
    "correct": 0,
    "explanation": "The Core layer functions as the enterprise backbone. It is engineered for maximum throughput and zero latency, delegating access policies, ACL filtering, and inter-VLAN routing to the Distribution layer."
  },
  {
    "id": "q_c2_m1_007",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "What is the IEEE 802.3 standard maximum distance limit for an unshielded twisted-pair (Cat 6 / Cat 6A) horizontal Ethernet cable run?",
    "options": [
      "100 meters (328 feet)",
      "250 meters (820 feet)",
      "50 meters (164 feet)",
      "500 meters (1,640 feet)"
    ],
    "correct": 0,
    "explanation": "IEEE 802.3 specifications restrict copper twisted-pair Ethernet channels to a maximum distance of 100 meters (90m solid horizontal run + 10m stranded patch cords) to prevent excessive attenuation and timing degradation."
  },
  {
    "id": "q_c2_m1_008",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "How can an adversary with physical access to an unshielded twisted-pair (UTP) copper network cable intercept cleartext data without severing the physical copper conductors?",
    "options": [
      "By utilizing an inductive clip-on tap that senses electromagnetic leakage generated by electrical transitions.",
      "By reflecting infrared laser pointers directly off the PVC cable jacket.",
      "By injecting high-voltage direct current into the ground pin of a nearby wall socket.",
      "By broadcasting deauthentication frames over 2.4 GHz radio frequencies."
    ],
    "correct": 0,
    "explanation": "Electrical current flowing through copper wires radiates microscopic electromagnetic fields. Inductive couplers or sensitive radio frequency receivers can reconstruct data streams through the plastic insulation without cutting the wire."
  },
  {
    "id": "q_c2_m1_009",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "In high-density industrial manufacturing environments with heavy electric motors and arc welders, which twisted-pair cable construction is mandatory to prevent packet loss?",
    "options": [
      "Shielded / Foiled Twisted Pair (S/FTP or F/UTP) with grounded metallic foil wrappers.",
      "Standard Unshielded Twisted Pair (Cat 5e UTP) with thin PVC jackets.",
      "Stranded flat telephone ribbon cabling with modular RJ-11 termination.",
      "Single-conductor uninsulated copper grounding braid."
    ],
    "correct": 0,
    "explanation": "Shielded cabling (such as S/FTP or F/UTP) encases wire pairs in metallic foil or braided shielding that diverts electromagnetic interference (EMI) and radio frequency interference (RFI) to ground."
  },
  {
    "id": "q_c2_m1_010",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "How does a Layer 2 network switch determine which specific physical port to forward an incoming unicast Ethernet frame out of?",
    "options": [
      "It queries its internal CAM table, which dynamically associates learned source MAC addresses with their respective physical ingress ports.",
      "It inspects the destination IPv4 address and queries the external DNS root name server.",
      "It regenerates and broadcasts the electrical signal out of all switch ports simultaneously.",
      "It decrypts the Layer 4 TCP header and looks up the active ephemeral port number."
    ],
    "correct": 0,
    "explanation": "A Layer 2 switch inspects the source MAC address of arriving frames to build a Content Addressable Memory (CAM) table. When a frame arrives for a known destination MAC, the switch forwards it exclusively out of the mapped port."
  },
  {
    "id": "q_c2_m1_011",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "What is the primary operational distinction between a network router and a standard Layer 2 switch?",
    "options": [
      "Routers operate at Layer 3 using IP addresses to forward packets across different subnets, while switches operate at Layer 2 using MAC addresses within a subnet.",
      "Routers broadcast every received packet to all connected ports, while switches filter by IP address.",
      "Switches can connect to the public internet directly without modems, while routers only connect printers.",
      "Routers operate exclusively on optical fiber cabling, while switches are restricted to copper."
    ],
    "correct": 0,
    "explanation": "Layer 2 switches make forwarding decisions based on 48-bit MAC addresses within a single broadcast domain. Routers operate at Layer 3, utilizing IP routing tables to route packets across separate broadcast domains."
  },
  {
    "id": "q_c2_m1_012",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "What role does an Optical Network Terminal (ONT) perform at the demarcation boundary of an enterprise fiber connection?",
    "options": [
      "It converts optical light pulses arriving from the ISP's passive optical network into standard electrical Ethernet signals.",
      "It blocks distributed denial of service attacks by inspecting HTTP headers.",
      "It generates private RFC 1918 IPv4 addresses for all internal employee endpoints.",
      "It terminates IPsec VPN tunnels using hardware-accelerated AES-GCM encryption."
    ],
    "correct": 0,
    "explanation": "An Optical Network Terminal (ONT) is a Layer 1 transceiver device that converts optical light waves arriving from fiber optic lines into electrical Ethernet signals for attachment to routers or firewalls."
  },
  {
    "id": "q_c2_m1_013",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "In an IEEE EUI-48 MAC address such as 00:15:5D:4A:BC:12, what information is conveyed by the first three octets (00:15:5D)?",
    "options": [
      "The Organizationally Unique Identifier (OUI), which identifies the hardware manufacturer registered with the IEEE.",
      "The logical Classless Inter-Domain Routing (CIDR) subnet prefix assigned by IANA.",
      "The unique manufacturing serial number of the physical network adapter.",
      "The dynamic lease token generated by the local network DHCP server."
    ],
    "correct": 0,
    "explanation": "The first 3 octets (24 bits) of a standard MAC address represent the Organizationally Unique Identifier (OUI), assigned by the IEEE to the hardware manufacturer (e.g., 00-15-5D is assigned to Microsoft Corporation)."
  },
  {
    "id": "q_c2_m1_014",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "What is the universal Ethernet broadcast MAC address, and how do switches handle incoming frames destined for it?",
    "options": [
      "FF-FF-FF-FF-FF-FF; the switch floods the frame out of all active ports within the source VLAN except the port on which it arrived.",
      "00-00-00-00-00-00; the switch immediately drops the frame to prevent routing loops.",
      "01-00-5E-00-00-01; the switch forwards it exclusively to the default gateway router.",
      "FF-00-00-00-00-FF; the switch converts it into an ICMP Echo Request."
    ],
    "correct": 0,
    "explanation": "FF:FF:FF:FF:FF:FF consists of all 48 binary bits set to 1. Switches flood broadcast frames out of every port in the broadcast domain (VLAN) except the originating ingress port."
  },
  {
    "id": "q_c2_m1_015",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "Why does MAC address filtering on wireless access points provide virtually zero defensive barrier against a determined attacker?",
    "options": [
      "MAC addresses are transmitted unencrypted in 802.11 frame headers and can be sniffed and cloned in software within seconds.",
      "Wireless access points only permit MAC addresses containing Microsoft registered OUIs.",
      "Layer 2 switches automatically overwrite wireless MAC addresses with IP addresses.",
      "MAC addresses cannot be read by network adapters in monitor mode."
    ],
    "correct": 0,
    "explanation": "802.11 Wi-Fi frames transmit MAC addresses in plaintext over the air. An attacker using tools like Aircrack-ng can passively sniff authorized client MACs and spoof their own adapter's MAC address (MAC cloning) in software."
  },
  {
    "id": "q_c2_m1_016",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "Which routing protocol is utilized by Autonomous Systems to exchange exterior network prefix reachability across the global internet?",
    "options": [
      "Border Gateway Protocol Version 4 (BGP-4, RFC 4271)",
      "Open Shortest Path First (OSPF Version 2)",
      "Routing Information Protocol (RIPv2)",
      "Interior Gateway Routing Protocol (EIGRP)"
    ],
    "correct": 0,
    "explanation": "Border Gateway Protocol (BGP-4, specified in RFC 4271) is the de facto path-vector exterior gateway protocol that interconnects Autonomous Systems across the global internet."
  },
  {
    "id": "q_c2_m1_017",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "Which Regional Internet Registry (RIR) is responsible for allocating IP address blocks and Autonomous System Numbers (ASNs) across the Asia-Pacific region, including India?",
    "options": [
      "Asia-Pacific Network Information Centre (APNIC)",
      "American Registry for Internet Numbers (ARIN)",
      "Réseaux IP Européens Network Coordination Centre (RIPE NCC)",
      "Latin America and Caribbean Network Information Centre (LACNIC)"
    ],
    "correct": 0,
    "explanation": "APNIC is the Regional Internet Registry (RIR) designated by ICANN/IANA to govern the allocation and registration of IP address space and ASNs across the Asia-Pacific territory."
  },
  {
    "id": "q_c2_m1_018",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "What is an Internet Exchange Point (IXP) and what operational benefit does it provide to regional networks?",
    "options": [
      "A physical switching facility where multiple ISPs and CDNs peer directly to exchange traffic locally without incurring transit fees.",
      "A software service that converts IPv4 packets into IPv6 addresses inside the browser.",
      "A government monitoring station that logs all residential DNS queries for copyright tracking.",
      "A satellite ground station that provides exclusive connectivity to undersea communications cables."
    ],
    "correct": 0,
    "explanation": "An Internet Exchange Point (IXP)—such as facilities operated by NIXI in India—allows ISPs, content delivery networks (CDNs), and enterprises to peer directly over a high-speed local Layer 2 switch fabric, lowering costs and latency."
  },
  {
    "id": "q_c2_m1_019",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "In the 2016 Mirai botnet campaign, what specific transport layer ports did the malware scan continuously across the IPv4 address space to identify vulnerable nodes?",
    "options": [
      "TCP Ports 23 (Telnet) and 2323 (Alternate Telnet)",
      "TCP Ports 80 (HTTP) and 443 (HTTPS)",
      "UDP Ports 53 (DNS) and 123 (NTP)",
      "TCP Ports 3389 (RDP) and 445 (SMB)"
    ],
    "correct": 0,
    "explanation": "Mirai scanned the public IPv4 space for open Telnet services on TCP port 23 and alternate port 2323, exploiting insecure IoT devices that exposed cleartext management interfaces with factory default logins."
  },
  {
    "id": "q_c2_m1_020",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "During the 2013 Target data breach, an attacker obtained initial access via stolen credentials from an external HVAC refrigeration vendor. What architectural failure enabled them to reach point-of-sale (POS) systems?",
    "options": [
      "Lack of internal network segmentation between the vendor extranet portal and the in-scope cardholder data environment.",
      "Failure to encrypt Ethernet preamble bits on horizontal Cat 5e cabling runs.",
      "Adversaries exploiting physical micro-bending taps on trans-Atlantic fiber optic cables.",
      "Absence of 100-meter distance limiters on internal retail store switches."
    ],
    "correct": 0,
    "explanation": "Target suffered from an inadequately segmented flat network. Once the attacker compromised the third-party HVAC vendor's extranet portal, the lack of internal firewall boundaries allowed direct lateral movement into the cardholder POS environment."
  },
  {
    "id": "q_c2_m1_021",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "An employee reports that their laptop is displaying strange popups. The security analyst runs 'Get-NetAdapter' and observes a virtual adapter named 'vEthernet (Default Switch)'. What does this interface indicate?",
    "options": [
      "A software-defined virtual network adapter established by a local hypervisor (such as Hyper-V or WSL), creating an internal host network.",
      "A physical hardware tap installed by a foreign adversary into the laptop's motherboard.",
      "A rogue Wi-Fi access point operating in promiscuous monitor mode.",
      "An unshielded coaxial broadband connection operating over DOCSIS protocols."
    ],
    "correct": 0,
    "explanation": "Virtual adapters like 'vEthernet' are created by virtualization platforms (Hyper-V, WSL, VirtualBox). They represent software-defined virtual network attachment points within the host operating system."
  },
  {
    "id": "q_c2_m1_022",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "During an internal compliance audit, an enterprise deploys a dedicated Fibre Channel fabric to interconnect clustered SQL database servers with petabyte-tier flash arrays. Which network classification correctly defines this deployment?",
    "options": [
      "Storage Area Network (SAN)",
      "Campus Area Network (CAN)",
      "Metropolitan Area Network (MAN)",
      "Software-Defined WAN (SD-WAN)"
    ],
    "correct": 0,
    "explanation": "A Storage Area Network (SAN) is an isolated, high-speed specialized network designed specifically to attach block-level storage arrays to compute servers via protocols like Fibre Channel or iSCSI."
  },
  {
    "id": "q_c2_m1_023",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "During an internal compliance audit, a regional hospital system links its primary medical facility to five satellite outpatient clinics located across a 35-kilometer municipal radius using carrier dark fiber. What network scale does this represent?",
    "options": [
      "Metropolitan Area Network (MAN)",
      "Local Area Network (LAN)",
      "Personal Area Network (PAN)",
      "Wireless Mesh Network (WMN)"
    ],
    "correct": 0,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire municipality or urban region (typically 5 to 50 km), often utilizing leased dark fiber or carrier metro optical circuits."
  },
  {
    "id": "q_c2_m1_024",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "During an internal compliance audit, a corporate employee connects a wireless smartwatch, noise-canceling headphones, and a laptop via Bluetooth Low Energy within a 3-meter radius. What classification defines this micro-network?",
    "options": [
      "Personal Area Network (PAN)",
      "Local Area Network (LAN)",
      "Campus Area Network (CAN)",
      "Storage Area Network (SAN)"
    ],
    "correct": 0,
    "explanation": "A Personal Area Network (PAN) interconnects devices localized around a single individual, typically spanning an operational distance of 1 to 10 meters via Bluetooth, BLE, or NFC."
  },
  {
    "id": "q_c2_m1_025",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "During an internal compliance audit, in an enterprise local area network, why is the physical Star topology universally favored over the legacy Bus topology?",
    "options": [
      "A physical cable break between a switch and one workstation only isolates that single host, whereas a bus cable break collapses the entire segment.",
      "Star topologies eliminate the requirement for Media Access Control (MAC) addresses on client interfaces.",
      "Star topologies operate without active intermediary electronic hardware or power supplies.",
      "Star topologies allow infinite copper cable distances without signal attenuation."
    ],
    "correct": 0,
    "explanation": "In a physical star topology, each node connects to a dedicated switch port via an independent cable run. A severance in one cable affects only that node, avoiding the catastrophic segment failure of a severed shared bus."
  },
  {
    "id": "q_c2_m1_026",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "During an internal compliance audit, how many physical point-to-point communication links are mathematically required to build a fully meshed network comprising 12 critical WAN routing nodes?",
    "options": [
      "66 links (calculated as N*(N-1)/2)",
      "144 links (calculated as N^2)",
      "24 links (calculated as 2*N)",
      "12 links (calculated as N)"
    ],
    "correct": 0,
    "explanation": "The formula for a full mesh topology is N*(N-1)/2. For 12 nodes: 12 * 11 / 2 = 66 individual point-to-point links."
  },
  {
    "id": "q_c2_m1_027",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what is the primary operational role of the Core layer in the classic Three-Tier Enterprise Hierarchical model?",
    "options": [
      "High-speed, low-latency transport across the enterprise backbone with minimal packet filtering or inspection overhead.",
      "Enforcing end-user 802.1X port security and dynamic host configuration leases.",
      "Terminating user VLANs and inspecting ingress HTTP traffic for OWASP vulnerabilities.",
      "Providing physical wireless radio access points for mobile endpoints."
    ],
    "correct": 0,
    "explanation": "The Core layer functions as the enterprise backbone. It is engineered for maximum throughput and zero latency, delegating access policies, ACL filtering, and inter-VLAN routing to the Distribution layer."
  },
  {
    "id": "q_c2_m1_028",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what is the IEEE 802.3 standard maximum distance limit for an unshielded twisted-pair (Cat 6 / Cat 6A) horizontal Ethernet cable run?",
    "options": [
      "100 meters (328 feet)",
      "250 meters (820 feet)",
      "50 meters (164 feet)",
      "500 meters (1,640 feet)"
    ],
    "correct": 0,
    "explanation": "IEEE 802.3 specifications restrict copper twisted-pair Ethernet channels to a maximum distance of 100 meters (90m solid horizontal run + 10m stranded patch cords) to prevent excessive attenuation and timing degradation."
  },
  {
    "id": "q_c2_m1_029",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "During an internal compliance audit, how can an adversary with physical access to an unshielded twisted-pair (UTP) copper network cable intercept cleartext data without severing the physical copper conductors?",
    "options": [
      "By utilizing an inductive clip-on tap that senses electromagnetic leakage generated by electrical transitions.",
      "By reflecting infrared laser pointers directly off the PVC cable jacket.",
      "By injecting high-voltage direct current into the ground pin of a nearby wall socket.",
      "By broadcasting deauthentication frames over 2.4 GHz radio frequencies."
    ],
    "correct": 0,
    "explanation": "Electrical current flowing through copper wires radiates microscopic electromagnetic fields. Inductive couplers or sensitive radio frequency receivers can reconstruct data streams through the plastic insulation without cutting the wire."
  },
  {
    "id": "q_c2_m1_030",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "During an internal compliance audit, in high-density industrial manufacturing environments with heavy electric motors and arc welders, which twisted-pair cable construction is mandatory to prevent packet loss?",
    "options": [
      "Shielded / Foiled Twisted Pair (S/FTP or F/UTP) with grounded metallic foil wrappers.",
      "Standard Unshielded Twisted Pair (Cat 5e UTP) with thin PVC jackets.",
      "Stranded flat telephone ribbon cabling with modular RJ-11 termination.",
      "Single-conductor uninsulated copper grounding braid."
    ],
    "correct": 0,
    "explanation": "Shielded cabling (such as S/FTP or F/UTP) encases wire pairs in metallic foil or braided shielding that diverts electromagnetic interference (EMI) and radio frequency interference (RFI) to ground."
  },
  {
    "id": "q_c2_m1_031",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "During an internal compliance audit, how does a Layer 2 network switch determine which specific physical port to forward an incoming unicast Ethernet frame out of?",
    "options": [
      "It queries its internal CAM table, which dynamically associates learned source MAC addresses with their respective physical ingress ports.",
      "It inspects the destination IPv4 address and queries the external DNS root name server.",
      "It regenerates and broadcasts the electrical signal out of all switch ports simultaneously.",
      "It decrypts the Layer 4 TCP header and looks up the active ephemeral port number."
    ],
    "correct": 0,
    "explanation": "A Layer 2 switch inspects the source MAC address of arriving frames to build a Content Addressable Memory (CAM) table. When a frame arrives for a known destination MAC, the switch forwards it exclusively out of the mapped port."
  },
  {
    "id": "q_c2_m1_032",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what is the primary operational distinction between a network router and a standard Layer 2 switch?",
    "options": [
      "Routers operate at Layer 3 using IP addresses to forward packets across different subnets, while switches operate at Layer 2 using MAC addresses within a subnet.",
      "Routers broadcast every received packet to all connected ports, while switches filter by IP address.",
      "Switches can connect to the public internet directly without modems, while routers only connect printers.",
      "Routers operate exclusively on optical fiber cabling, while switches are restricted to copper."
    ],
    "correct": 0,
    "explanation": "Layer 2 switches make forwarding decisions based on 48-bit MAC addresses within a single broadcast domain. Routers operate at Layer 3, utilizing IP routing tables to route packets across separate broadcast domains."
  },
  {
    "id": "q_c2_m1_033",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what role does an Optical Network Terminal (ONT) perform at the demarcation boundary of an enterprise fiber connection?",
    "options": [
      "It converts optical light pulses arriving from the ISP's passive optical network into standard electrical Ethernet signals.",
      "It blocks distributed denial of service attacks by inspecting HTTP headers.",
      "It generates private RFC 1918 IPv4 addresses for all internal employee endpoints.",
      "It terminates IPsec VPN tunnels using hardware-accelerated AES-GCM encryption."
    ],
    "correct": 0,
    "explanation": "An Optical Network Terminal (ONT) is a Layer 1 transceiver device that converts optical light waves arriving from fiber optic lines into electrical Ethernet signals for attachment to routers or firewalls."
  },
  {
    "id": "q_c2_m1_034",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "During an internal compliance audit, in an IEEE EUI-48 MAC address such as 00:15:5D:4A:BC:12, what information is conveyed by the first three octets (00:15:5D)?",
    "options": [
      "The Organizationally Unique Identifier (OUI), which identifies the hardware manufacturer registered with the IEEE.",
      "The logical Classless Inter-Domain Routing (CIDR) subnet prefix assigned by IANA.",
      "The unique manufacturing serial number of the physical network adapter.",
      "The dynamic lease token generated by the local network DHCP server."
    ],
    "correct": 0,
    "explanation": "The first 3 octets (24 bits) of a standard MAC address represent the Organizationally Unique Identifier (OUI), assigned by the IEEE to the hardware manufacturer (e.g., 00-15-5D is assigned to Microsoft Corporation)."
  },
  {
    "id": "q_c2_m1_035",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what is the universal Ethernet broadcast MAC address, and how do switches handle incoming frames destined for it?",
    "options": [
      "FF-FF-FF-FF-FF-FF; the switch floods the frame out of all active ports within the source VLAN except the port on which it arrived.",
      "00-00-00-00-00-00; the switch immediately drops the frame to prevent routing loops.",
      "01-00-5E-00-00-01; the switch forwards it exclusively to the default gateway router.",
      "FF-00-00-00-00-FF; the switch converts it into an ICMP Echo Request."
    ],
    "correct": 0,
    "explanation": "FF:FF:FF:FF:FF:FF consists of all 48 binary bits set to 1. Switches flood broadcast frames out of every port in the broadcast domain (VLAN) except the originating ingress port."
  },
  {
    "id": "q_c2_m1_036",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "During an internal compliance audit, why does MAC address filtering on wireless access points provide virtually zero defensive barrier against a determined attacker?",
    "options": [
      "MAC addresses are transmitted unencrypted in 802.11 frame headers and can be sniffed and cloned in software within seconds.",
      "Wireless access points only permit MAC addresses containing Microsoft registered OUIs.",
      "Layer 2 switches automatically overwrite wireless MAC addresses with IP addresses.",
      "MAC addresses cannot be read by network adapters in monitor mode."
    ],
    "correct": 0,
    "explanation": "802.11 Wi-Fi frames transmit MAC addresses in plaintext over the air. An attacker using tools like Aircrack-ng can passively sniff authorized client MACs and spoof their own adapter's MAC address (MAC cloning) in software."
  },
  {
    "id": "q_c2_m1_037",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "During an internal compliance audit, which routing protocol is utilized by Autonomous Systems to exchange exterior network prefix reachability across the global internet?",
    "options": [
      "Border Gateway Protocol Version 4 (BGP-4, RFC 4271)",
      "Open Shortest Path First (OSPF Version 2)",
      "Routing Information Protocol (RIPv2)",
      "Interior Gateway Routing Protocol (EIGRP)"
    ],
    "correct": 0,
    "explanation": "Border Gateway Protocol (BGP-4, specified in RFC 4271) is the de facto path-vector exterior gateway protocol that interconnects Autonomous Systems across the global internet."
  },
  {
    "id": "q_c2_m1_038",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "During an internal compliance audit, which Regional Internet Registry (RIR) is responsible for allocating IP address blocks and Autonomous System Numbers (ASNs) across the Asia-Pacific region, including India?",
    "options": [
      "Asia-Pacific Network Information Centre (APNIC)",
      "American Registry for Internet Numbers (ARIN)",
      "Réseaux IP Européens Network Coordination Centre (RIPE NCC)",
      "Latin America and Caribbean Network Information Centre (LACNIC)"
    ],
    "correct": 0,
    "explanation": "APNIC is the Regional Internet Registry (RIR) designated by ICANN/IANA to govern the allocation and registration of IP address space and ASNs across the Asia-Pacific territory."
  },
  {
    "id": "q_c2_m1_039",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "During an internal compliance audit, what is an Internet Exchange Point (IXP) and what operational benefit does it provide to regional networks?",
    "options": [
      "A physical switching facility where multiple ISPs and CDNs peer directly to exchange traffic locally without incurring transit fees.",
      "A software service that converts IPv4 packets into IPv6 addresses inside the browser.",
      "A government monitoring station that logs all residential DNS queries for copyright tracking.",
      "A satellite ground station that provides exclusive connectivity to undersea communications cables."
    ],
    "correct": 0,
    "explanation": "An Internet Exchange Point (IXP)—such as facilities operated by NIXI in India—allows ISPs, content delivery networks (CDNs), and enterprises to peer directly over a high-speed local Layer 2 switch fabric, lowering costs and latency."
  },
  {
    "id": "q_c2_m1_040",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "During an internal compliance audit, in the 2016 Mirai botnet campaign, what specific transport layer ports did the malware scan continuously across the IPv4 address space to identify vulnerable nodes?",
    "options": [
      "TCP Ports 23 (Telnet) and 2323 (Alternate Telnet)",
      "TCP Ports 80 (HTTP) and 443 (HTTPS)",
      "UDP Ports 53 (DNS) and 123 (NTP)",
      "TCP Ports 3389 (RDP) and 445 (SMB)"
    ],
    "correct": 0,
    "explanation": "Mirai scanned the public IPv4 space for open Telnet services on TCP port 23 and alternate port 2323, exploiting insecure IoT devices that exposed cleartext management interfaces with factory default logins."
  },
  {
    "id": "q_c2_m1_041",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "During an internal compliance audit, during the 2013 Target data breach, an attacker obtained initial access via stolen credentials from an external HVAC refrigeration vendor. What architectural failure enabled them to reach point-of-sale (POS) systems?",
    "options": [
      "Lack of internal network segmentation between the vendor extranet portal and the in-scope cardholder data environment.",
      "Failure to encrypt Ethernet preamble bits on horizontal Cat 5e cabling runs.",
      "Adversaries exploiting physical micro-bending taps on trans-Atlantic fiber optic cables.",
      "Absence of 100-meter distance limiters on internal retail store switches."
    ],
    "correct": 0,
    "explanation": "Target suffered from an inadequately segmented flat network. Once the attacker compromised the third-party HVAC vendor's extranet portal, the lack of internal firewall boundaries allowed direct lateral movement into the cardholder POS environment."
  },
  {
    "id": "q_c2_m1_042",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "During an internal compliance audit, an employee reports that their laptop is displaying strange popups. The security analyst runs 'Get-NetAdapter' and observes a virtual adapter named 'vEthernet (Default Switch)'. What does this interface indicate?",
    "options": [
      "A software-defined virtual network adapter established by a local hypervisor (such as Hyper-V or WSL), creating an internal host network.",
      "A physical hardware tap installed by a foreign adversary into the laptop's motherboard.",
      "A rogue Wi-Fi access point operating in promiscuous monitor mode.",
      "An unshielded coaxial broadband connection operating over DOCSIS protocols."
    ],
    "correct": 0,
    "explanation": "Virtual adapters like 'vEthernet' are created by virtualization platforms (Hyper-V, WSL, VirtualBox). They represent software-defined virtual network attachment points within the host operating system."
  },
  {
    "id": "q_c2_m1_043",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that an enterprise deploys a dedicated Fibre Channel fabric to interconnect clustered SQL database servers with petabyte-tier flash arrays. Which network classification correctly defines this deployment?",
    "options": [
      "Storage Area Network (SAN)",
      "Campus Area Network (CAN)",
      "Metropolitan Area Network (MAN)",
      "Software-Defined WAN (SD-WAN)"
    ],
    "correct": 0,
    "explanation": "A Storage Area Network (SAN) is an isolated, high-speed specialized network designed specifically to attach block-level storage arrays to compute servers via protocols like Fibre Channel or iSCSI."
  },
  {
    "id": "q_c2_m1_044",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that a regional hospital system links its primary medical facility to five satellite outpatient clinics located across a 35-kilometer municipal radius using carrier dark fiber. What network scale does this represent?",
    "options": [
      "Metropolitan Area Network (MAN)",
      "Local Area Network (LAN)",
      "Personal Area Network (PAN)",
      "Wireless Mesh Network (WMN)"
    ],
    "correct": 0,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire municipality or urban region (typically 5 to 50 km), often utilizing leased dark fiber or carrier metro optical circuits."
  },
  {
    "id": "q_c2_m1_045",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that a corporate employee connects a wireless smartwatch, noise-canceling headphones, and a laptop via Bluetooth Low Energy within a 3-meter radius. What classification defines this micro-network?",
    "options": [
      "Personal Area Network (PAN)",
      "Local Area Network (LAN)",
      "Campus Area Network (CAN)",
      "Storage Area Network (SAN)"
    ],
    "correct": 0,
    "explanation": "A Personal Area Network (PAN) interconnects devices localized around a single individual, typically spanning an operational distance of 1 to 10 meters via Bluetooth, BLE, or NFC."
  },
  {
    "id": "q_c2_m1_046",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that in an enterprise local area network, why is the physical Star topology universally favored over the legacy Bus topology?",
    "options": [
      "A physical cable break between a switch and one workstation only isolates that single host, whereas a bus cable break collapses the entire segment.",
      "Star topologies eliminate the requirement for Media Access Control (MAC) addresses on client interfaces.",
      "Star topologies operate without active intermediary electronic hardware or power supplies.",
      "Star topologies allow infinite copper cable distances without signal attenuation."
    ],
    "correct": 0,
    "explanation": "In a physical star topology, each node connects to a dedicated switch port via an independent cable run. A severance in one cable affects only that node, avoiding the catastrophic segment failure of a severed shared bus."
  },
  {
    "id": "q_c2_m1_047",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that how many physical point-to-point communication links are mathematically required to build a fully meshed network comprising 12 critical WAN routing nodes?",
    "options": [
      "66 links (calculated as N*(N-1)/2)",
      "144 links (calculated as N^2)",
      "24 links (calculated as 2*N)",
      "12 links (calculated as N)"
    ],
    "correct": 0,
    "explanation": "The formula for a full mesh topology is N*(N-1)/2. For 12 nodes: 12 * 11 / 2 = 66 individual point-to-point links."
  },
  {
    "id": "q_c2_m1_048",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what is the primary operational role of the Core layer in the classic Three-Tier Enterprise Hierarchical model?",
    "options": [
      "High-speed, low-latency transport across the enterprise backbone with minimal packet filtering or inspection overhead.",
      "Enforcing end-user 802.1X port security and dynamic host configuration leases.",
      "Terminating user VLANs and inspecting ingress HTTP traffic for OWASP vulnerabilities.",
      "Providing physical wireless radio access points for mobile endpoints."
    ],
    "correct": 0,
    "explanation": "The Core layer functions as the enterprise backbone. It is engineered for maximum throughput and zero latency, delegating access policies, ACL filtering, and inter-VLAN routing to the Distribution layer."
  },
  {
    "id": "q_c2_m1_049",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what is the IEEE 802.3 standard maximum distance limit for an unshielded twisted-pair (Cat 6 / Cat 6A) horizontal Ethernet cable run?",
    "options": [
      "100 meters (328 feet)",
      "250 meters (820 feet)",
      "50 meters (164 feet)",
      "500 meters (1,640 feet)"
    ],
    "correct": 0,
    "explanation": "IEEE 802.3 specifications restrict copper twisted-pair Ethernet channels to a maximum distance of 100 meters (90m solid horizontal run + 10m stranded patch cords) to prevent excessive attenuation and timing degradation."
  },
  {
    "id": "q_c2_m1_050",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that how can an adversary with physical access to an unshielded twisted-pair (UTP) copper network cable intercept cleartext data without severing the physical copper conductors?",
    "options": [
      "By utilizing an inductive clip-on tap that senses electromagnetic leakage generated by electrical transitions.",
      "By reflecting infrared laser pointers directly off the PVC cable jacket.",
      "By injecting high-voltage direct current into the ground pin of a nearby wall socket.",
      "By broadcasting deauthentication frames over 2.4 GHz radio frequencies."
    ],
    "correct": 0,
    "explanation": "Electrical current flowing through copper wires radiates microscopic electromagnetic fields. Inductive couplers or sensitive radio frequency receivers can reconstruct data streams through the plastic insulation without cutting the wire."
  },
  {
    "id": "q_c2_m1_051",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that in high-density industrial manufacturing environments with heavy electric motors and arc welders, which twisted-pair cable construction is mandatory to prevent packet loss?",
    "options": [
      "Shielded / Foiled Twisted Pair (S/FTP or F/UTP) with grounded metallic foil wrappers.",
      "Standard Unshielded Twisted Pair (Cat 5e UTP) with thin PVC jackets.",
      "Stranded flat telephone ribbon cabling with modular RJ-11 termination.",
      "Single-conductor uninsulated copper grounding braid."
    ],
    "correct": 0,
    "explanation": "Shielded cabling (such as S/FTP or F/UTP) encases wire pairs in metallic foil or braided shielding that diverts electromagnetic interference (EMI) and radio frequency interference (RFI) to ground."
  },
  {
    "id": "q_c2_m1_052",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that how does a Layer 2 network switch determine which specific physical port to forward an incoming unicast Ethernet frame out of?",
    "options": [
      "It queries its internal CAM table, which dynamically associates learned source MAC addresses with their respective physical ingress ports.",
      "It inspects the destination IPv4 address and queries the external DNS root name server.",
      "It regenerates and broadcasts the electrical signal out of all switch ports simultaneously.",
      "It decrypts the Layer 4 TCP header and looks up the active ephemeral port number."
    ],
    "correct": 0,
    "explanation": "A Layer 2 switch inspects the source MAC address of arriving frames to build a Content Addressable Memory (CAM) table. When a frame arrives for a known destination MAC, the switch forwards it exclusively out of the mapped port."
  },
  {
    "id": "q_c2_m1_053",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what is the primary operational distinction between a network router and a standard Layer 2 switch?",
    "options": [
      "Routers operate at Layer 3 using IP addresses to forward packets across different subnets, while switches operate at Layer 2 using MAC addresses within a subnet.",
      "Routers broadcast every received packet to all connected ports, while switches filter by IP address.",
      "Switches can connect to the public internet directly without modems, while routers only connect printers.",
      "Routers operate exclusively on optical fiber cabling, while switches are restricted to copper."
    ],
    "correct": 0,
    "explanation": "Layer 2 switches make forwarding decisions based on 48-bit MAC addresses within a single broadcast domain. Routers operate at Layer 3, utilizing IP routing tables to route packets across separate broadcast domains."
  },
  {
    "id": "q_c2_m1_054",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what role does an Optical Network Terminal (ONT) perform at the demarcation boundary of an enterprise fiber connection?",
    "options": [
      "It converts optical light pulses arriving from the ISP's passive optical network into standard electrical Ethernet signals.",
      "It blocks distributed denial of service attacks by inspecting HTTP headers.",
      "It generates private RFC 1918 IPv4 addresses for all internal employee endpoints.",
      "It terminates IPsec VPN tunnels using hardware-accelerated AES-GCM encryption."
    ],
    "correct": 0,
    "explanation": "An Optical Network Terminal (ONT) is a Layer 1 transceiver device that converts optical light waves arriving from fiber optic lines into electrical Ethernet signals for attachment to routers or firewalls."
  },
  {
    "id": "q_c2_m1_055",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that in an IEEE EUI-48 MAC address such as 00:15:5D:4A:BC:12, what information is conveyed by the first three octets (00:15:5D)?",
    "options": [
      "The Organizationally Unique Identifier (OUI), which identifies the hardware manufacturer registered with the IEEE.",
      "The logical Classless Inter-Domain Routing (CIDR) subnet prefix assigned by IANA.",
      "The unique manufacturing serial number of the physical network adapter.",
      "The dynamic lease token generated by the local network DHCP server."
    ],
    "correct": 0,
    "explanation": "The first 3 octets (24 bits) of a standard MAC address represent the Organizationally Unique Identifier (OUI), assigned by the IEEE to the hardware manufacturer (e.g., 00-15-5D is assigned to Microsoft Corporation)."
  },
  {
    "id": "q_c2_m1_056",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what is the universal Ethernet broadcast MAC address, and how do switches handle incoming frames destined for it?",
    "options": [
      "FF-FF-FF-FF-FF-FF; the switch floods the frame out of all active ports within the source VLAN except the port on which it arrived.",
      "00-00-00-00-00-00; the switch immediately drops the frame to prevent routing loops.",
      "01-00-5E-00-00-01; the switch forwards it exclusively to the default gateway router.",
      "FF-00-00-00-00-FF; the switch converts it into an ICMP Echo Request."
    ],
    "correct": 0,
    "explanation": "FF:FF:FF:FF:FF:FF consists of all 48 binary bits set to 1. Switches flood broadcast frames out of every port in the broadcast domain (VLAN) except the originating ingress port."
  },
  {
    "id": "q_c2_m1_057",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that why does MAC address filtering on wireless access points provide virtually zero defensive barrier against a determined attacker?",
    "options": [
      "MAC addresses are transmitted unencrypted in 802.11 frame headers and can be sniffed and cloned in software within seconds.",
      "Wireless access points only permit MAC addresses containing Microsoft registered OUIs.",
      "Layer 2 switches automatically overwrite wireless MAC addresses with IP addresses.",
      "MAC addresses cannot be read by network adapters in monitor mode."
    ],
    "correct": 0,
    "explanation": "802.11 Wi-Fi frames transmit MAC addresses in plaintext over the air. An attacker using tools like Aircrack-ng can passively sniff authorized client MACs and spoof their own adapter's MAC address (MAC cloning) in software."
  },
  {
    "id": "q_c2_m1_058",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that which routing protocol is utilized by Autonomous Systems to exchange exterior network prefix reachability across the global internet?",
    "options": [
      "Border Gateway Protocol Version 4 (BGP-4, RFC 4271)",
      "Open Shortest Path First (OSPF Version 2)",
      "Routing Information Protocol (RIPv2)",
      "Interior Gateway Routing Protocol (EIGRP)"
    ],
    "correct": 0,
    "explanation": "Border Gateway Protocol (BGP-4, specified in RFC 4271) is the de facto path-vector exterior gateway protocol that interconnects Autonomous Systems across the global internet."
  },
  {
    "id": "q_c2_m1_059",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that which Regional Internet Registry (RIR) is responsible for allocating IP address blocks and Autonomous System Numbers (ASNs) across the Asia-Pacific region, including India?",
    "options": [
      "Asia-Pacific Network Information Centre (APNIC)",
      "American Registry for Internet Numbers (ARIN)",
      "Réseaux IP Européens Network Coordination Centre (RIPE NCC)",
      "Latin America and Caribbean Network Information Centre (LACNIC)"
    ],
    "correct": 0,
    "explanation": "APNIC is the Regional Internet Registry (RIR) designated by ICANN/IANA to govern the allocation and registration of IP address space and ASNs across the Asia-Pacific territory."
  },
  {
    "id": "q_c2_m1_060",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that what is an Internet Exchange Point (IXP) and what operational benefit does it provide to regional networks?",
    "options": [
      "A physical switching facility where multiple ISPs and CDNs peer directly to exchange traffic locally without incurring transit fees.",
      "A software service that converts IPv4 packets into IPv6 addresses inside the browser.",
      "A government monitoring station that logs all residential DNS queries for copyright tracking.",
      "A satellite ground station that provides exclusive connectivity to undersea communications cables."
    ],
    "correct": 0,
    "explanation": "An Internet Exchange Point (IXP)—such as facilities operated by NIXI in India—allows ISPs, content delivery networks (CDNs), and enterprises to peer directly over a high-speed local Layer 2 switch fabric, lowering costs and latency."
  },
  {
    "id": "q_c2_m1_061",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that in the 2016 Mirai botnet campaign, what specific transport layer ports did the malware scan continuously across the IPv4 address space to identify vulnerable nodes?",
    "options": [
      "TCP Ports 23 (Telnet) and 2323 (Alternate Telnet)",
      "TCP Ports 80 (HTTP) and 443 (HTTPS)",
      "UDP Ports 53 (DNS) and 123 (NTP)",
      "TCP Ports 3389 (RDP) and 445 (SMB)"
    ],
    "correct": 0,
    "explanation": "Mirai scanned the public IPv4 space for open Telnet services on TCP port 23 and alternate port 2323, exploiting insecure IoT devices that exposed cleartext management interfaces with factory default logins."
  },
  {
    "id": "q_c2_m1_062",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that during the 2013 Target data breach, an attacker obtained initial access via stolen credentials from an external HVAC refrigeration vendor. What architectural failure enabled them to reach point-of-sale (POS) systems?",
    "options": [
      "Lack of internal network segmentation between the vendor extranet portal and the in-scope cardholder data environment.",
      "Failure to encrypt Ethernet preamble bits on horizontal Cat 5e cabling runs.",
      "Adversaries exploiting physical micro-bending taps on trans-Atlantic fiber optic cables.",
      "Absence of 100-meter distance limiters on internal retail store switches."
    ],
    "correct": 0,
    "explanation": "Target suffered from an inadequately segmented flat network. Once the attacker compromised the third-party HVAC vendor's extranet portal, the lack of internal firewall boundaries allowed direct lateral movement into the cardholder POS environment."
  },
  {
    "id": "q_c2_m1_063",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "A Tier-1 SOC analyst observes that an employee reports that their laptop is displaying strange popups. The security analyst runs 'Get-NetAdapter' and observes a virtual adapter named 'vEthernet (Default Switch)'. What does this interface indicate?",
    "options": [
      "A software-defined virtual network adapter established by a local hypervisor (such as Hyper-V or WSL), creating an internal host network.",
      "A physical hardware tap installed by a foreign adversary into the laptop's motherboard.",
      "A rogue Wi-Fi access point operating in promiscuous monitor mode.",
      "An unshielded coaxial broadband connection operating over DOCSIS protocols."
    ],
    "correct": 0,
    "explanation": "Virtual adapters like 'vEthernet' are created by virtualization platforms (Hyper-V, WSL, VirtualBox). They represent software-defined virtual network attachment points within the host operating system."
  },
  {
    "id": "q_c2_m1_064",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, an enterprise deploys a dedicated Fibre Channel fabric to interconnect clustered SQL database servers with petabyte-tier flash arrays. Which network classification correctly defines this deployment?",
    "options": [
      "Storage Area Network (SAN)",
      "Campus Area Network (CAN)",
      "Metropolitan Area Network (MAN)",
      "Software-Defined WAN (SD-WAN)"
    ],
    "correct": 0,
    "explanation": "A Storage Area Network (SAN) is an isolated, high-speed specialized network designed specifically to attach block-level storage arrays to compute servers via protocols like Fibre Channel or iSCSI."
  },
  {
    "id": "q_c2_m1_065",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, a regional hospital system links its primary medical facility to five satellite outpatient clinics located across a 35-kilometer municipal radius using carrier dark fiber. What network scale does this represent?",
    "options": [
      "Metropolitan Area Network (MAN)",
      "Local Area Network (LAN)",
      "Personal Area Network (PAN)",
      "Wireless Mesh Network (WMN)"
    ],
    "correct": 0,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire municipality or urban region (typically 5 to 50 km), often utilizing leased dark fiber or carrier metro optical circuits."
  },
  {
    "id": "q_c2_m1_066",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, a corporate employee connects a wireless smartwatch, noise-canceling headphones, and a laptop via Bluetooth Low Energy within a 3-meter radius. What classification defines this micro-network?",
    "options": [
      "Personal Area Network (PAN)",
      "Local Area Network (LAN)",
      "Campus Area Network (CAN)",
      "Storage Area Network (SAN)"
    ],
    "correct": 0,
    "explanation": "A Personal Area Network (PAN) interconnects devices localized around a single individual, typically spanning an operational distance of 1 to 10 meters via Bluetooth, BLE, or NFC."
  },
  {
    "id": "q_c2_m1_067",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, in an enterprise local area network, why is the physical Star topology universally favored over the legacy Bus topology?",
    "options": [
      "A physical cable break between a switch and one workstation only isolates that single host, whereas a bus cable break collapses the entire segment.",
      "Star topologies eliminate the requirement for Media Access Control (MAC) addresses on client interfaces.",
      "Star topologies operate without active intermediary electronic hardware or power supplies.",
      "Star topologies allow infinite copper cable distances without signal attenuation."
    ],
    "correct": 0,
    "explanation": "In a physical star topology, each node connects to a dedicated switch port via an independent cable run. A severance in one cable affects only that node, avoiding the catastrophic segment failure of a severed shared bus."
  },
  {
    "id": "q_c2_m1_068",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, how many physical point-to-point communication links are mathematically required to build a fully meshed network comprising 12 critical WAN routing nodes?",
    "options": [
      "66 links (calculated as N*(N-1)/2)",
      "144 links (calculated as N^2)",
      "24 links (calculated as 2*N)",
      "12 links (calculated as N)"
    ],
    "correct": 0,
    "explanation": "The formula for a full mesh topology is N*(N-1)/2. For 12 nodes: 12 * 11 / 2 = 66 individual point-to-point links."
  },
  {
    "id": "q_c2_m1_069",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what is the primary operational role of the Core layer in the classic Three-Tier Enterprise Hierarchical model?",
    "options": [
      "High-speed, low-latency transport across the enterprise backbone with minimal packet filtering or inspection overhead.",
      "Enforcing end-user 802.1X port security and dynamic host configuration leases.",
      "Terminating user VLANs and inspecting ingress HTTP traffic for OWASP vulnerabilities.",
      "Providing physical wireless radio access points for mobile endpoints."
    ],
    "correct": 0,
    "explanation": "The Core layer functions as the enterprise backbone. It is engineered for maximum throughput and zero latency, delegating access policies, ACL filtering, and inter-VLAN routing to the Distribution layer."
  },
  {
    "id": "q_c2_m1_070",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what is the IEEE 802.3 standard maximum distance limit for an unshielded twisted-pair (Cat 6 / Cat 6A) horizontal Ethernet cable run?",
    "options": [
      "100 meters (328 feet)",
      "250 meters (820 feet)",
      "50 meters (164 feet)",
      "500 meters (1,640 feet)"
    ],
    "correct": 0,
    "explanation": "IEEE 802.3 specifications restrict copper twisted-pair Ethernet channels to a maximum distance of 100 meters (90m solid horizontal run + 10m stranded patch cords) to prevent excessive attenuation and timing degradation."
  },
  {
    "id": "q_c2_m1_071",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, how can an adversary with physical access to an unshielded twisted-pair (UTP) copper network cable intercept cleartext data without severing the physical copper conductors?",
    "options": [
      "By utilizing an inductive clip-on tap that senses electromagnetic leakage generated by electrical transitions.",
      "By reflecting infrared laser pointers directly off the PVC cable jacket.",
      "By injecting high-voltage direct current into the ground pin of a nearby wall socket.",
      "By broadcasting deauthentication frames over 2.4 GHz radio frequencies."
    ],
    "correct": 0,
    "explanation": "Electrical current flowing through copper wires radiates microscopic electromagnetic fields. Inductive couplers or sensitive radio frequency receivers can reconstruct data streams through the plastic insulation without cutting the wire."
  },
  {
    "id": "q_c2_m1_072",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, in high-density industrial manufacturing environments with heavy electric motors and arc welders, which twisted-pair cable construction is mandatory to prevent packet loss?",
    "options": [
      "Shielded / Foiled Twisted Pair (S/FTP or F/UTP) with grounded metallic foil wrappers.",
      "Standard Unshielded Twisted Pair (Cat 5e UTP) with thin PVC jackets.",
      "Stranded flat telephone ribbon cabling with modular RJ-11 termination.",
      "Single-conductor uninsulated copper grounding braid."
    ],
    "correct": 0,
    "explanation": "Shielded cabling (such as S/FTP or F/UTP) encases wire pairs in metallic foil or braided shielding that diverts electromagnetic interference (EMI) and radio frequency interference (RFI) to ground."
  },
  {
    "id": "q_c2_m1_073",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, how does a Layer 2 network switch determine which specific physical port to forward an incoming unicast Ethernet frame out of?",
    "options": [
      "It queries its internal CAM table, which dynamically associates learned source MAC addresses with their respective physical ingress ports.",
      "It inspects the destination IPv4 address and queries the external DNS root name server.",
      "It regenerates and broadcasts the electrical signal out of all switch ports simultaneously.",
      "It decrypts the Layer 4 TCP header and looks up the active ephemeral port number."
    ],
    "correct": 0,
    "explanation": "A Layer 2 switch inspects the source MAC address of arriving frames to build a Content Addressable Memory (CAM) table. When a frame arrives for a known destination MAC, the switch forwards it exclusively out of the mapped port."
  },
  {
    "id": "q_c2_m1_074",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what is the primary operational distinction between a network router and a standard Layer 2 switch?",
    "options": [
      "Routers operate at Layer 3 using IP addresses to forward packets across different subnets, while switches operate at Layer 2 using MAC addresses within a subnet.",
      "Routers broadcast every received packet to all connected ports, while switches filter by IP address.",
      "Switches can connect to the public internet directly without modems, while routers only connect printers.",
      "Routers operate exclusively on optical fiber cabling, while switches are restricted to copper."
    ],
    "correct": 0,
    "explanation": "Layer 2 switches make forwarding decisions based on 48-bit MAC addresses within a single broadcast domain. Routers operate at Layer 3, utilizing IP routing tables to route packets across separate broadcast domains."
  },
  {
    "id": "q_c2_m1_075",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what role does an Optical Network Terminal (ONT) perform at the demarcation boundary of an enterprise fiber connection?",
    "options": [
      "It converts optical light pulses arriving from the ISP's passive optical network into standard electrical Ethernet signals.",
      "It blocks distributed denial of service attacks by inspecting HTTP headers.",
      "It generates private RFC 1918 IPv4 addresses for all internal employee endpoints.",
      "It terminates IPsec VPN tunnels using hardware-accelerated AES-GCM encryption."
    ],
    "correct": 0,
    "explanation": "An Optical Network Terminal (ONT) is a Layer 1 transceiver device that converts optical light waves arriving from fiber optic lines into electrical Ethernet signals for attachment to routers or firewalls."
  },
  {
    "id": "q_c2_m1_076",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, in an IEEE EUI-48 MAC address such as 00:15:5D:4A:BC:12, what information is conveyed by the first three octets (00:15:5D)?",
    "options": [
      "The Organizationally Unique Identifier (OUI), which identifies the hardware manufacturer registered with the IEEE.",
      "The logical Classless Inter-Domain Routing (CIDR) subnet prefix assigned by IANA.",
      "The unique manufacturing serial number of the physical network adapter.",
      "The dynamic lease token generated by the local network DHCP server."
    ],
    "correct": 0,
    "explanation": "The first 3 octets (24 bits) of a standard MAC address represent the Organizationally Unique Identifier (OUI), assigned by the IEEE to the hardware manufacturer (e.g., 00-15-5D is assigned to Microsoft Corporation)."
  },
  {
    "id": "q_c2_m1_077",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what is the universal Ethernet broadcast MAC address, and how do switches handle incoming frames destined for it?",
    "options": [
      "FF-FF-FF-FF-FF-FF; the switch floods the frame out of all active ports within the source VLAN except the port on which it arrived.",
      "00-00-00-00-00-00; the switch immediately drops the frame to prevent routing loops.",
      "01-00-5E-00-00-01; the switch forwards it exclusively to the default gateway router.",
      "FF-00-00-00-00-FF; the switch converts it into an ICMP Echo Request."
    ],
    "correct": 0,
    "explanation": "FF:FF:FF:FF:FF:FF consists of all 48 binary bits set to 1. Switches flood broadcast frames out of every port in the broadcast domain (VLAN) except the originating ingress port."
  },
  {
    "id": "q_c2_m1_078",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, why does MAC address filtering on wireless access points provide virtually zero defensive barrier against a determined attacker?",
    "options": [
      "MAC addresses are transmitted unencrypted in 802.11 frame headers and can be sniffed and cloned in software within seconds.",
      "Wireless access points only permit MAC addresses containing Microsoft registered OUIs.",
      "Layer 2 switches automatically overwrite wireless MAC addresses with IP addresses.",
      "MAC addresses cannot be read by network adapters in monitor mode."
    ],
    "correct": 0,
    "explanation": "802.11 Wi-Fi frames transmit MAC addresses in plaintext over the air. An attacker using tools like Aircrack-ng can passively sniff authorized client MACs and spoof their own adapter's MAC address (MAC cloning) in software."
  },
  {
    "id": "q_c2_m1_079",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, which routing protocol is utilized by Autonomous Systems to exchange exterior network prefix reachability across the global internet?",
    "options": [
      "Border Gateway Protocol Version 4 (BGP-4, RFC 4271)",
      "Open Shortest Path First (OSPF Version 2)",
      "Routing Information Protocol (RIPv2)",
      "Interior Gateway Routing Protocol (EIGRP)"
    ],
    "correct": 0,
    "explanation": "Border Gateway Protocol (BGP-4, specified in RFC 4271) is the de facto path-vector exterior gateway protocol that interconnects Autonomous Systems across the global internet."
  },
  {
    "id": "q_c2_m1_080",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, which Regional Internet Registry (RIR) is responsible for allocating IP address blocks and Autonomous System Numbers (ASNs) across the Asia-Pacific region, including India?",
    "options": [
      "Asia-Pacific Network Information Centre (APNIC)",
      "American Registry for Internet Numbers (ARIN)",
      "Réseaux IP Européens Network Coordination Centre (RIPE NCC)",
      "Latin America and Caribbean Network Information Centre (LACNIC)"
    ],
    "correct": 0,
    "explanation": "APNIC is the Regional Internet Registry (RIR) designated by ICANN/IANA to govern the allocation and registration of IP address space and ASNs across the Asia-Pacific territory."
  },
  {
    "id": "q_c2_m1_081",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, what is an Internet Exchange Point (IXP) and what operational benefit does it provide to regional networks?",
    "options": [
      "A physical switching facility where multiple ISPs and CDNs peer directly to exchange traffic locally without incurring transit fees.",
      "A software service that converts IPv4 packets into IPv6 addresses inside the browser.",
      "A government monitoring station that logs all residential DNS queries for copyright tracking.",
      "A satellite ground station that provides exclusive connectivity to undersea communications cables."
    ],
    "correct": 0,
    "explanation": "An Internet Exchange Point (IXP)—such as facilities operated by NIXI in India—allows ISPs, content delivery networks (CDNs), and enterprises to peer directly over a high-speed local Layer 2 switch fabric, lowering costs and latency."
  },
  {
    "id": "q_c2_m1_082",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, in the 2016 Mirai botnet campaign, what specific transport layer ports did the malware scan continuously across the IPv4 address space to identify vulnerable nodes?",
    "options": [
      "TCP Ports 23 (Telnet) and 2323 (Alternate Telnet)",
      "TCP Ports 80 (HTTP) and 443 (HTTPS)",
      "UDP Ports 53 (DNS) and 123 (NTP)",
      "TCP Ports 3389 (RDP) and 445 (SMB)"
    ],
    "correct": 0,
    "explanation": "Mirai scanned the public IPv4 space for open Telnet services on TCP port 23 and alternate port 2323, exploiting insecure IoT devices that exposed cleartext management interfaces with factory default logins."
  },
  {
    "id": "q_c2_m1_083",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, during the 2013 Target data breach, an attacker obtained initial access via stolen credentials from an external HVAC refrigeration vendor. What architectural failure enabled them to reach point-of-sale (POS) systems?",
    "options": [
      "Lack of internal network segmentation between the vendor extranet portal and the in-scope cardholder data environment.",
      "Failure to encrypt Ethernet preamble bits on horizontal Cat 5e cabling runs.",
      "Adversaries exploiting physical micro-bending taps on trans-Atlantic fiber optic cables.",
      "Absence of 100-meter distance limiters on internal retail store switches."
    ],
    "correct": 0,
    "explanation": "Target suffered from an inadequately segmented flat network. Once the attacker compromised the third-party HVAC vendor's extranet portal, the lack of internal firewall boundaries allowed direct lateral movement into the cardholder POS environment."
  },
  {
    "id": "q_c2_m1_084",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "medium",
    "q": "When designing a zero-trust network boundary, an employee reports that their laptop is displaying strange popups. The security analyst runs 'Get-NetAdapter' and observes a virtual adapter named 'vEthernet (Default Switch)'. What does this interface indicate?",
    "options": [
      "A software-defined virtual network adapter established by a local hypervisor (such as Hyper-V or WSL), creating an internal host network.",
      "A physical hardware tap installed by a foreign adversary into the laptop's motherboard.",
      "A rogue Wi-Fi access point operating in promiscuous monitor mode.",
      "An unshielded coaxial broadband connection operating over DOCSIS protocols."
    ],
    "correct": 0,
    "explanation": "Virtual adapters like 'vEthernet' are created by virtualization platforms (Hyper-V, WSL, VirtualBox). They represent software-defined virtual network attachment points within the host operating system."
  },
  {
    "id": "q_c2_m1_085",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, an enterprise deploys a dedicated Fibre Channel fabric to interconnect clustered SQL database servers with petabyte-tier flash arrays. Which network classification correctly defines this deployment?",
    "options": [
      "Storage Area Network (SAN)",
      "Campus Area Network (CAN)",
      "Metropolitan Area Network (MAN)",
      "Software-Defined WAN (SD-WAN)"
    ],
    "correct": 0,
    "explanation": "A Storage Area Network (SAN) is an isolated, high-speed specialized network designed specifically to attach block-level storage arrays to compute servers via protocols like Fibre Channel or iSCSI."
  },
  {
    "id": "q_c2_m1_086",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, a regional hospital system links its primary medical facility to five satellite outpatient clinics located across a 35-kilometer municipal radius using carrier dark fiber. What network scale does this represent?",
    "options": [
      "Metropolitan Area Network (MAN)",
      "Local Area Network (LAN)",
      "Personal Area Network (PAN)",
      "Wireless Mesh Network (WMN)"
    ],
    "correct": 0,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire municipality or urban region (typically 5 to 50 km), often utilizing leased dark fiber or carrier metro optical circuits."
  },
  {
    "id": "q_c2_m1_087",
    "topic": "Network Scales & Classifications",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, a corporate employee connects a wireless smartwatch, noise-canceling headphones, and a laptop via Bluetooth Low Energy within a 3-meter radius. What classification defines this micro-network?",
    "options": [
      "Personal Area Network (PAN)",
      "Local Area Network (LAN)",
      "Campus Area Network (CAN)",
      "Storage Area Network (SAN)"
    ],
    "correct": 0,
    "explanation": "A Personal Area Network (PAN) interconnects devices localized around a single individual, typically spanning an operational distance of 1 to 10 meters via Bluetooth, BLE, or NFC."
  },
  {
    "id": "q_c2_m1_088",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, in an enterprise local area network, why is the physical Star topology universally favored over the legacy Bus topology?",
    "options": [
      "A physical cable break between a switch and one workstation only isolates that single host, whereas a bus cable break collapses the entire segment.",
      "Star topologies eliminate the requirement for Media Access Control (MAC) addresses on client interfaces.",
      "Star topologies operate without active intermediary electronic hardware or power supplies.",
      "Star topologies allow infinite copper cable distances without signal attenuation."
    ],
    "correct": 0,
    "explanation": "In a physical star topology, each node connects to a dedicated switch port via an independent cable run. A severance in one cable affects only that node, avoiding the catastrophic segment failure of a severed shared bus."
  },
  {
    "id": "q_c2_m1_089",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, how many physical point-to-point communication links are mathematically required to build a fully meshed network comprising 12 critical WAN routing nodes?",
    "options": [
      "66 links (calculated as N*(N-1)/2)",
      "144 links (calculated as N^2)",
      "24 links (calculated as 2*N)",
      "12 links (calculated as N)"
    ],
    "correct": 0,
    "explanation": "The formula for a full mesh topology is N*(N-1)/2. For 12 nodes: 12 * 11 / 2 = 66 individual point-to-point links."
  },
  {
    "id": "q_c2_m1_090",
    "topic": "Network Topologies",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, what is the primary operational role of the Core layer in the classic Three-Tier Enterprise Hierarchical model?",
    "options": [
      "High-speed, low-latency transport across the enterprise backbone with minimal packet filtering or inspection overhead.",
      "Enforcing end-user 802.1X port security and dynamic host configuration leases.",
      "Terminating user VLANs and inspecting ingress HTTP traffic for OWASP vulnerabilities.",
      "Providing physical wireless radio access points for mobile endpoints."
    ],
    "correct": 0,
    "explanation": "The Core layer functions as the enterprise backbone. It is engineered for maximum throughput and zero latency, delegating access policies, ACL filtering, and inter-VLAN routing to the Distribution layer."
  },
  {
    "id": "q_c2_m1_091",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, what is the IEEE 802.3 standard maximum distance limit for an unshielded twisted-pair (Cat 6 / Cat 6A) horizontal Ethernet cable run?",
    "options": [
      "100 meters (328 feet)",
      "250 meters (820 feet)",
      "50 meters (164 feet)",
      "500 meters (1,640 feet)"
    ],
    "correct": 0,
    "explanation": "IEEE 802.3 specifications restrict copper twisted-pair Ethernet channels to a maximum distance of 100 meters (90m solid horizontal run + 10m stranded patch cords) to prevent excessive attenuation and timing degradation."
  },
  {
    "id": "q_c2_m1_092",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, how can an adversary with physical access to an unshielded twisted-pair (UTP) copper network cable intercept cleartext data without severing the physical copper conductors?",
    "options": [
      "By utilizing an inductive clip-on tap that senses electromagnetic leakage generated by electrical transitions.",
      "By reflecting infrared laser pointers directly off the PVC cable jacket.",
      "By injecting high-voltage direct current into the ground pin of a nearby wall socket.",
      "By broadcasting deauthentication frames over 2.4 GHz radio frequencies."
    ],
    "correct": 0,
    "explanation": "Electrical current flowing through copper wires radiates microscopic electromagnetic fields. Inductive couplers or sensitive radio frequency receivers can reconstruct data streams through the plastic insulation without cutting the wire."
  },
  {
    "id": "q_c2_m1_093",
    "topic": "Physical Transmission Media",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, in high-density industrial manufacturing environments with heavy electric motors and arc welders, which twisted-pair cable construction is mandatory to prevent packet loss?",
    "options": [
      "Shielded / Foiled Twisted Pair (S/FTP or F/UTP) with grounded metallic foil wrappers.",
      "Standard Unshielded Twisted Pair (Cat 5e UTP) with thin PVC jackets.",
      "Stranded flat telephone ribbon cabling with modular RJ-11 termination.",
      "Single-conductor uninsulated copper grounding braid."
    ],
    "correct": 0,
    "explanation": "Shielded cabling (such as S/FTP or F/UTP) encases wire pairs in metallic foil or braided shielding that diverts electromagnetic interference (EMI) and radio frequency interference (RFI) to ground."
  },
  {
    "id": "q_c2_m1_094",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, how does a Layer 2 network switch determine which specific physical port to forward an incoming unicast Ethernet frame out of?",
    "options": [
      "It queries its internal CAM table, which dynamically associates learned source MAC addresses with their respective physical ingress ports.",
      "It inspects the destination IPv4 address and queries the external DNS root name server.",
      "It regenerates and broadcasts the electrical signal out of all switch ports simultaneously.",
      "It decrypts the Layer 4 TCP header and looks up the active ephemeral port number."
    ],
    "correct": 0,
    "explanation": "A Layer 2 switch inspects the source MAC address of arriving frames to build a Content Addressable Memory (CAM) table. When a frame arrives for a known destination MAC, the switch forwards it exclusively out of the mapped port."
  },
  {
    "id": "q_c2_m1_095",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, what is the primary operational distinction between a network router and a standard Layer 2 switch?",
    "options": [
      "Routers operate at Layer 3 using IP addresses to forward packets across different subnets, while switches operate at Layer 2 using MAC addresses within a subnet.",
      "Routers broadcast every received packet to all connected ports, while switches filter by IP address.",
      "Switches can connect to the public internet directly without modems, while routers only connect printers.",
      "Routers operate exclusively on optical fiber cabling, while switches are restricted to copper."
    ],
    "correct": 0,
    "explanation": "Layer 2 switches make forwarding decisions based on 48-bit MAC addresses within a single broadcast domain. Routers operate at Layer 3, utilizing IP routing tables to route packets across separate broadcast domains."
  },
  {
    "id": "q_c2_m1_096",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, what role does an Optical Network Terminal (ONT) perform at the demarcation boundary of an enterprise fiber connection?",
    "options": [
      "It converts optical light pulses arriving from the ISP's passive optical network into standard electrical Ethernet signals.",
      "It blocks distributed denial of service attacks by inspecting HTTP headers.",
      "It generates private RFC 1918 IPv4 addresses for all internal employee endpoints.",
      "It terminates IPsec VPN tunnels using hardware-accelerated AES-GCM encryption."
    ],
    "correct": 0,
    "explanation": "An Optical Network Terminal (ONT) is a Layer 1 transceiver device that converts optical light waves arriving from fiber optic lines into electrical Ethernet signals for attachment to routers or firewalls."
  },
  {
    "id": "q_c2_m1_097",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, in an IEEE EUI-48 MAC address such as 00:15:5D:4A:BC:12, what information is conveyed by the first three octets (00:15:5D)?",
    "options": [
      "The Organizationally Unique Identifier (OUI), which identifies the hardware manufacturer registered with the IEEE.",
      "The logical Classless Inter-Domain Routing (CIDR) subnet prefix assigned by IANA.",
      "The unique manufacturing serial number of the physical network adapter.",
      "The dynamic lease token generated by the local network DHCP server."
    ],
    "correct": 0,
    "explanation": "The first 3 octets (24 bits) of a standard MAC address represent the Organizationally Unique Identifier (OUI), assigned by the IEEE to the hardware manufacturer (e.g., 00-15-5D is assigned to Microsoft Corporation)."
  },
  {
    "id": "q_c2_m1_098",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, what is the universal Ethernet broadcast MAC address, and how do switches handle incoming frames destined for it?",
    "options": [
      "FF-FF-FF-FF-FF-FF; the switch floods the frame out of all active ports within the source VLAN except the port on which it arrived.",
      "00-00-00-00-00-00; the switch immediately drops the frame to prevent routing loops.",
      "01-00-5E-00-00-01; the switch forwards it exclusively to the default gateway router.",
      "FF-00-00-00-00-FF; the switch converts it into an ICMP Echo Request."
    ],
    "correct": 0,
    "explanation": "FF:FF:FF:FF:FF:FF consists of all 48 binary bits set to 1. Switches flood broadcast frames out of every port in the broadcast domain (VLAN) except the originating ingress port."
  },
  {
    "id": "q_c2_m1_099",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, why does MAC address filtering on wireless access points provide virtually zero defensive barrier against a determined attacker?",
    "options": [
      "MAC addresses are transmitted unencrypted in 802.11 frame headers and can be sniffed and cloned in software within seconds.",
      "Wireless access points only permit MAC addresses containing Microsoft registered OUIs.",
      "Layer 2 switches automatically overwrite wireless MAC addresses with IP addresses.",
      "MAC addresses cannot be read by network adapters in monitor mode."
    ],
    "correct": 0,
    "explanation": "802.11 Wi-Fi frames transmit MAC addresses in plaintext over the air. An attacker using tools like Aircrack-ng can passively sniff authorized client MACs and spoof their own adapter's MAC address (MAC cloning) in software."
  },
  {
    "id": "q_c2_m1_100",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "medium",
    "q": "In a high-availability hospital infrastructure, which routing protocol is utilized by Autonomous Systems to exchange exterior network prefix reachability across the global internet?",
    "options": [
      "Border Gateway Protocol Version 4 (BGP-4, RFC 4271)",
      "Open Shortest Path First (OSPF Version 2)",
      "Routing Information Protocol (RIPv2)",
      "Interior Gateway Routing Protocol (EIGRP)"
    ],
    "correct": 0,
    "explanation": "Border Gateway Protocol (BGP-4, specified in RFC 4271) is the de facto path-vector exterior gateway protocol that interconnects Autonomous Systems across the global internet."
  },
  {
    "id": "q_c2_m1_101",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "An industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_102",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "A defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_103",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "A cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_104",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "During an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_105",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "A high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_106",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "Why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_107",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "An attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_108",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "When architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_109",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "The first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_110",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "An operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_111",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "How does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_112",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "Why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_113",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "In the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_114",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "A network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_115",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_116",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_117",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_118",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_119",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_120",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_121",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_122",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_123",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_124",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_125",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_126",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_127",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_128",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_129",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_130",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_131",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_132",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_133",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_134",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_135",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_136",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_137",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_138",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_139",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_140",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_141",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_142",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "A senior network defense architect evaluates the following scenario: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_143",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_144",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_145",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_146",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_147",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_148",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_149",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_150",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_151",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_152",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_153",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_154",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_155",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_156",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "Under high-concurrency packet capture inspection: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_157",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_158",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_159",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_160",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_161",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_162",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_163",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_164",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_165",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_166",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_167",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_168",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_169",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_170",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "In a mission-critical SCADA/ICS utility deployment: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_171",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_172",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_173",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_174",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_175",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_176",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_177",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_178",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_179",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_180",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_181",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_182",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_183",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_184",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "Analyzing packet-level Layer 2/Layer 3 boundaries: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_185",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_186",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  },
  {
    "id": "q_c2_m1_187",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: a cloud hyper-converged data center experiences massive east-west microservice traffic between database pods. Why does network architecture mandate a two-tier Spine-Leaf Clos topology over classic hierarchical Core-Distribution-Access?",
    "options": [
      "Every leaf switch connects directly to every spine switch, guaranteeing consistent two-hop equal-cost forwarding and eliminating spanning tree blocking.",
      "Spine-leaf networks disable all IP routing headers, converting packets directly into raw Ethernet frames.",
      "Spine switches connect directly to client workstations, eliminating the need for access switches.",
      "Spine-leaf architecture physically prevents any malware from transmitting TCP SYN packets."
    ],
    "correct": 0,
    "explanation": "In a Spine-Leaf Clos fabric, every leaf switch attaches to every spine switch. Server-to-server traffic traverses exactly two hops (Leaf -> Spine -> Leaf), providing non-blocking, predictable latency and high east-west throughput."
  },
  {
    "id": "q_c2_m1_188",
    "topic": "Network Topologies",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: during an architecture audit, a security consultant notes that a network is physically deployed as a star to a central chassis, but logically partitioned into five discrete broadcast domains. What technology enables this disparity?",
    "options": [
      "IEEE 802.1Q Virtual Local Area Networks (VLANs)",
      "Category 6A shielded twisted-pair physical conduits",
      "Carrier Sense Multiple Access with Collision Detection (CSMA/CD)",
      "High-level Data Link Control (HDLC) framing"
    ],
    "correct": 0,
    "explanation": "IEEE 802.1Q VLANs allow a single physical switch to be divided into multiple isolated logical broadcast domains, maintaining a physical star cabling design while enforcing logical segmentation."
  },
  {
    "id": "q_c2_m1_189",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: a high-security government research enclave requires connecting two servers 800 meters apart across an outdoor corridor. Why is single-mode fiber optic preferred over multi-mode fiber or shielded copper?",
    "options": [
      "Single-mode fiber uses a narrow 9-micron core and lasers to transmit signals over kilometers without modal dispersion, and is completely immune to electrical EMI.",
      "Multi-mode fiber cannot transmit digital light pulses beyond 50 meters due to electrical resistance.",
      "Shielded copper cabling emits laser radiation that can permanently blind nearby workers.",
      "Single-mode fiber cables cannot be physically cut or intercepted under any circumstances."
    ],
    "correct": 0,
    "explanation": "Single-mode fiber features a narrow ~9µm core driven by solid-state lasers, eliminating modal dispersion over long distances (supporting runs up to 40-80 km) while providing complete immunity to external electromagnetic noise."
  },
  {
    "id": "q_c2_m1_190",
    "topic": "Physical Transmission Media",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: why does the physical nature of 802.11 Wi-Fi radio frequencies necessitate end-to-end cryptographic safeguards (such as WPA3-Enterprise) over perimeter security controls?",
    "options": [
      "Radio waves propagate unconfined through physical building walls, making physical presence restrictions ineffective at preventing eavesdropping.",
      "Wireless access points automatically disable MAC address filtering when running at 5 GHz.",
      "Radio frequency cables require active water cooling systems to prevent packet corruption.",
      "Wi-Fi packets cannot be decoded by Wireshark without physical attachment to the access point."
    ],
    "correct": 0,
    "explanation": "Radio is a broadcast medium. Because electromagnetic radiation travels through physical partitions, anyone within physical receiving range can intercept raw frames. Confidentiality must be enforced via mathematical encryption."
  },
  {
    "id": "q_c2_m1_191",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: an attacker executes a CAM table exhaustion attack (e.g. using macof) against an enterprise switch by flooding thousands of bogus MAC addresses. What is the catastrophic security failure mode of the switch?",
    "options": [
      "The CAM table overflows, forcing the switch to fail open and broadcast all subsequent unicast traffic out of all ports like a hub.",
      "The switch permanently burns out its internal ASIC processors and shuts down power.",
      "The switch automatically converts all unencrypted HTTP traffic into encrypted TLS 1.3 packets.",
      "The switch rewrites all destination IP addresses to 127.0.0.1 (loopback)."
    ],
    "correct": 0,
    "explanation": "When a switch's finite CAM table memory fills completely with spoofed MACs, it can no longer learn new entries. To maintain connectivity, it 'fails open' by flooding all unknown unicast frames out of every port, allowing an attacker to sniff all traffic."
  },
  {
    "id": "q_c2_m1_192",
    "topic": "Network Hardware & Device Roles",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: when architecting an out-of-band monitoring infrastructure for a Network Intrusion Detection System (NIDS), why do engineers favor passive optical TAPs over switch SPAN/mirror ports?",
    "options": [
      "Under heavy network congestion, switch CPUs drop SPAN mirror frames first to prioritize forwarding, whereas passive optical TAPs physically replicate 100% of packets.",
      "SPAN ports inject bidirectional reset (RST) packets into active user sessions, corrupting database connections.",
      "Hardware TAPs require active IP addresses, allowing remote SOC analysts to SSH directly into the fiber core.",
      "Switch SPAN ports can only mirror unencrypted Telnet and FTP traffic."
    ],
    "correct": 0,
    "explanation": "Switch Port Analyzer (SPAN) ports rely on the switch's internal CPU and forwarding backplane. When saturated, switches drop SPAN traffic to maintain production forwarding. Passive TAPs split light physically, guaranteeing 100% capture with zero drops."
  },
  {
    "id": "q_c2_m1_193",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: the first octet of a received Ethernet frame destination MAC address is 01 (hexadecimal 0x01, binary 00000001). How will a Layer 2 switch handle this frame?",
    "options": [
      "Bit 0 is 1, indicating a Multicast or broadcast frame; the switch floods it to all ports belonging to that multicast group or VLAN.",
      "Bit 0 is 0, indicating a Unicast frame; the switch forwards it exclusively to a single physical port.",
      "Bit 1 is 1, indicating the address is locally administered by Microsoft Hyper-V.",
      "The frame is invalid because MAC addresses cannot begin with an odd number."
    ],
    "correct": 0,
    "explanation": "In an Ethernet MAC address, Bit 0 of the first octet is the Individual/Group (I/G) bit. When set to 1, the address represents a Multicast (or broadcast) frame destined for multiple receivers."
  },
  {
    "id": "q_c2_m1_194",
    "topic": "MAC Addressing & EUI-48",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: an operating system generates an ephemeral MAC address where the first octet is 0x0A (binary 00001010). What do the two least significant bits of this octet signify?",
    "options": [
      "Bit 0 is 0 (Unicast delivery) and Bit 1 is 1 (Locally Administered / Randomized address).",
      "Bit 0 is 1 (Multicast group) and Bit 1 is 0 (Globally Unique manufacturer address).",
      "Both bits indicate a reserved broadcast address for IPv6 Neighbor Discovery.",
      "The address is a legacy Token Ring frame delimiter."
    ],
    "correct": 0,
    "explanation": "Hexadecimal 0x0A equals binary 00001010. Bit 0 (least significant bit) is 0, indicating Unicast. Bit 1 is 1, indicating Locally Administered (software-assigned or randomized, not an IEEE registered manufacturer OUI)."
  },
  {
    "id": "q_c2_m1_195",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: how does Resource Public Key Infrastructure (RPKI) prevent malicious or accidental BGP route hijacking across the global internet?",
    "options": [
      "It allows legitimate prefix owners to publish signed Route Origin Authorizations (ROAs), enabling routers to reject announcements from unauthorized ASNs.",
      "It encrypts all BGP payload data using AES-256 GCM to prevent cleartext eavesdropping.",
      "It converts all external BGP connections into private IPsec tunnels running over Tor.",
      "It forces all internet traffic to pass through centralized IANA root routers in Geneva."
    ],
    "correct": 0,
    "explanation": "RPKI utilizes digital certificates issued by Regional Internet Registries (RIRs) to validate Route Origin Authorizations (ROAs). Border routers verify ROAs to drop unauthorized BGP prefix announcements automatically."
  },
  {
    "id": "q_c2_m1_196",
    "topic": "Global Internet Architecture & BGP",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: why do transit routers automatically divert traffic toward an attacker during a BGP prefix hijacking attack where the attacker announces a /25 prefix while the victim announces a /24?",
    "options": [
      "IP routing algorithms strictly adhere to the Longest Prefix Match rule, prioritizing more specific routes (/25) over broader aggregate routes (/24).",
      "BGP routers inherently favor announcements originating from lower numerical ASN values.",
      "The /25 route announcement disables TCP checksum validation across intermediate switches.",
      "Routers treat /24 advertisements as private RFC 1918 subnets and automatically filter them."
    ],
    "correct": 0,
    "explanation": "Internet routers follow the Longest Prefix Match rule: a route with a longer subnet mask (/25 = 25 bits) is considered more specific and always takes precedence over a shorter mask (/24 = 24 bits)."
  },
  {
    "id": "q_c2_m1_197",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: in the fictional Lotus Logistics case study, an adversary compromised internal servers by connecting an unauthorized device in a visitor meeting room. Which two security controls would have completely neutralized this attack vector?",
    "options": [
      "IEEE 802.1X Network Access Control (NAC) and assigning meeting-room ports to an isolated Guest VLAN with internet-only egress.",
      "Upgrading the meeting-room display HDMI cables and enabling WPA2 on corporate laptops.",
      "Configuring BGP Route Origin Authorizations and installing an Optical Network Terminal.",
      "Replacing all copper patch cords with multi-mode fiber optic cabling."
    ],
    "correct": 0,
    "explanation": "IEEE 802.1X blocks unauthorized devices at the physical switch port until mutual cryptographic certificate/credential authentication succeeds. Placing visitor ports in an isolated Guest VLAN prevents direct Layer 2/3 lateral access to internal servers."
  },
  {
    "id": "q_c2_m1_198",
    "topic": "Incident Case Studies & Threat Analysis",
    "difficulty": "difficult",
    "q": "From an advanced adversarial evasion perspective: a network administrator discovers that a single workstation with a faulty network card is continuously transmitting broadcast frames at wire speed, saturating switch backplanes and paralyzing all host communication across the floor. What incident is occurring?",
    "options": [
      "A Layer 2 Broadcast Storm, requiring Storm Control and Spanning Tree Protocol (STP) configuration on access switch ports.",
      "A BGP Route Origin Authorization failure at the ISP edge router.",
      "An unauthorized Storage Area Network (SAN) Fibre Channel failover event.",
      "A physical optical time-domain reflectometry (OTDR) signal collision."
    ],
    "correct": 0,
    "explanation": "A Broadcast Storm occurs when excessive broadcast frames flood a Layer 2 network, consuming all switch processing capacity and link bandwidth. Access switches mitigate this via broadcast storm control thresholds."
  },
  {
    "id": "q_c2_m1_199",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: an industrial water treatment facility operates programmable logic controllers (PLCs) communicating over an isolated network where safety and deterministic low latency supersede data confidentiality. According to NIST SP 800-82, which architecture is in use?",
    "options": [
      "Operational Technology (OT) / Industrial Control Systems (ICS) Network",
      "Software-Defined Wide Area Network (SD-WAN) Edge",
      "Demilitarized Zone (DMZ) Reverse Proxy Array",
      "Autonomous System Peering Fabric"
    ],
    "correct": 0,
    "explanation": "Operational Technology (OT) and Industrial Control Systems (ICS) govern cyber-physical processes where human safety, physical plant integrity, and continuous availability are prioritized over confidentiality."
  },
  {
    "id": "q_c2_m1_200",
    "topic": "Network Scales & Classifications",
    "difficulty": "difficult",
    "q": "During post-incident forensic root cause analysis: a defense contractor must interconnect three physical buildings located 400 meters apart on an owned 50-acre corporate parcel. Why is this categorized as a CAN rather than a WAN?",
    "options": [
      "All physical property and inter-building optical cabling are owned and managed by the single organization without traversing public carrier right-of-way.",
      "The interconnect relies strictly on unencrypted public 5G cellular infrastructure.",
      "The network is restricted to 100 meters maximum channel distance by IEEE 802.3 standards.",
      "All nodes share a single unmanaged collision domain without Layer 3 routing."
    ],
    "correct": 0,
    "explanation": "A Campus Area Network (CAN) connects multiple buildings situated on contiguous property owned by a single enterprise, utilizing private fiber conduits without requiring commercial telecom leased-line transit."
  }
];

export const module1QuestionBank = c2_module1QuestionBank;
export default c2_module1QuestionBank;
