/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 3: Module 3: Addressing (IPv4, CIDR, and IPv6)
 */

export const module3Data = {
  "id": "mod_c2_3",
  "title": "Module 3: Addressing (IPv4, CIDR, and IPv6)",
  "description": "IPv4 binary structure, subnet masks, CIDR prefix notation, Variable-Length Subnet Masking (VLSM), special-purpose address spaces (RFC 1918, RFC 3927, CGNAT), IPv6 architecture (SLAAC, NDP), and defensive address filtering.",
  "order": 3,
  "quiz": {
    "id": "quiz_mod_c2_3",
    "title": "Module 3 Assessment: Subnetting & Network Addressing Forensics",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c2_m3_1",
        "question": "What is the total number of usable host IP addresses available on a standard IPv4 local area network configured with a /26 subnet mask (255.255.255.192)?",
        "options": [
          "62 usable hosts",
          "64 usable hosts",
          "126 usable hosts",
          "30 usable hosts"
        ],
        "correct_index": 0,
        "explanation": "A /26 prefix reserves 26 bits for the network and leaves 6 bits for host addressing (32 - 26 = 6). Total addresses = 2^6 = 64. Subtracting 2 (one for the network ID and one for the broadcast address) yields exactly 62 usable host addresses."
      },
      {
        "id": "q_c2_m3_2",
        "question": "An analyst investigates an unconfigured Windows workstation that displays the IPv4 address 169.254.86.237. What does this address indicate regarding the host's network state?",
        "options": [
          "The host failed to receive an IP lease from a local DHCP server and assigned itself an Automatic Private IP Address (APIPA / RFC 3927)",
          "The host has established an active site-to-site IPsec VPN tunnel with the corporate core",
          "The host has been assigned an external public routable IP address by the ISP",
          "The host is participating in carrier-grade NAT (CGNAT) under RFC 6598"
        ],
        "correct_index": 0,
        "explanation": "The 169.254.0.0/16 address block is reserved by RFC 3927 for link-local IPv4 autoconfiguration (APIPA). When an endpoint fails to obtain an answer from a DHCP server, it autonomously self-assigns an address in this range."
      },
      {
        "id": "q_c2_m3_3",
        "question": "Which of the following IPv4 address blocks represents the full private address range designated by RFC 1918 for the Class B equivalent allocation?",
        "options": [
          "172.16.0.0/12 (172.16.0.0 to 172.31.255.255)",
          "172.16.0.0/16 (172.16.0.0 to 172.16.255.255)",
          "172.0.0.0/8 (172.0.0.0 to 172.255.255.255)",
          "172.16.0.0/20 (172.16.0.0 to 172.16.15.255)"
        ],
        "correct_index": 0,
        "explanation": "RFC 1918 defines the 16-bit block equivalent as 172.16.0.0/12, spanning a contiguous range of 16 contiguous /16 networks from 172.16.0.0 through 172.31.255.255. A common administrative error is assuming the range ends at 172.16.255.255."
      },
      {
        "id": "q_c2_m3_4",
        "question": "What is the broadcast IPv4 address for a host assigned the IP address 192.168.10.37 with a CIDR prefix of /26 (mask 255.255.255.192)?",
        "options": [
          "192.168.10.63",
          "192.168.10.255",
          "192.168.10.127",
          "192.168.10.31"
        ],
        "correct_index": 0,
        "explanation": "A /26 mask has a block size of 64 (256 - 192 = 64). The subnets increment by 64: 0, 64, 128, 192. The address 192.168.10.37 resides in the first block (192.168.10.0 to 192.168.10.63), where .0 is the network address and .63 is the broadcast address."
      },
      {
        "id": "q_c2_m3_5",
        "question": "According to the canonical IPv6 text representation rules specified in RFC 5952, what is the correctly compressed form of 2001:0db8:0000:0000:0000:ff00:0042:8329?",
        "options": [
          "2001:db8::ff00:42:8329",
          "2001:0db8::ff00:0042:8329",
          "2001:db8:0:0:0:ff00:42:8329",
          "2001:db8::ff:42:8329"
        ],
        "correct_index": 0,
        "explanation": "RFC 5952 requires: (1) suppressing leading zeros within each 16-bit hexadecimal hextet ('0db8' -> 'db8', '0042' -> '42'), (2) replacing the longest run of consecutive all-zero hextets with a double colon '::' exactly once, and (3) using lowercase characters."
      },
      {
        "id": "q_c2_m3_6",
        "question": "What is the standard, globally adopted subnet prefix length for IPv4 point-to-point links between two routers under RFC 3021?",
        "options": [
          "/31 (255.255.255.254 - exactly 2 host addresses, no separate broadcast)",
          "/30 (255.255.255.252 - 4 total addresses, 2 usable)",
          "/32 (255.255.255.255 - single host route)",
          "/29 (255.255.255.248 - 6 usable hosts)"
        ],
        "correct_index": 0,
        "explanation": "RFC 3021 allows using 31-bit prefixes (/31) for point-to-point links. It conserves IPv4 address space by eliminating dedicated network and broadcast addresses, allocating both addresses directly to the two link endpoints."
      },
      {
        "id": "q_c2_m3_7",
        "question": "Which IPv6 address scope is automatically configured on every active IPv6-enabled interface, begins with the prefix fe80::/10, and is non-routable across routers?",
        "options": [
          "Link-Local Unicast",
          "Global Unicast",
          "Unique Local Address (ULA)",
          "Multicast All-Nodes"
        ],
        "correct_index": 0,
        "explanation": "Link-local addresses (fe80::/10, in practice fe80::/64) are mandatory and autoconfigured on every IPv6 interface. They function strictly within the local link segment and are dropped by routers."
      },
      {
        "id": "q_c2_m3_8",
        "question": "What protocol replaces ARP in IPv6 networks to perform router discovery, address resolution, and duplicate address detection (DAD)?",
        "options": [
          "Neighbor Discovery Protocol (NDP - RFC 4861)",
          "Address Resolution Protocol v6 (ARPv6)",
          "Dynamic Host Configuration Protocol v6 (DHCPv6)",
          "Internet Group Management Protocol (IGMP)"
        ],
        "correct_index": 0,
        "explanation": "IPv6 has no ARP and no broadcast. Instead, the Neighbor Discovery Protocol (NDP, RFC 4861) operates over ICMPv6 using Neighbor Solicitation (NS) and Neighbor Advertisement (NA) multicast messages."
      },
      {
        "id": "q_c2_m3_9",
        "question": "What defensive risk occurs when an organization enables dual-stack IPv4/IPv6 networking on internal endpoints but only configures firewall monitoring and SIEM rules for IPv4?",
        "options": [
          "Adversaries can establish Command-and-Control (C2) or exfiltrate data over IPv6 channels completely uninspected and unlogged",
          "Endpoints automatically disable their IPv4 default gateways",
          "Switches shut down physical access ports due to CAM table overflow",
          "Routers reject all outgoing DNS queries across the perimeter"
        ],
        "correct_index": 0,
        "explanation": "Unmonitored IPv6 is a major enterprise blind spot. Because modern operating systems prioritize IPv6 over IPv4 by default, an adversary or compromised endpoint can tunnel or communicate directly over IPv6 without triggering IPv4-only IDS or SIEM detection."
      },
      {
        "id": "q_c2_m3_10",
        "question": "What is the primary operational purpose of the 100.64.0.0/10 IPv4 address block defined in RFC 6598?",
        "options": [
          "Shared Address Space for Carrier-Grade NAT (CGNAT) deployed by Internet Service Providers",
          "Private local enterprise networking inside commercial office buildings",
          "Documentation and academic textbook code examples",
          "Global multicast streaming video distribution"
        ],
        "correct_index": 0,
        "explanation": "RFC 6598 allocates 100.64.0.0/10 as Shared Address Space for Carrier-Grade NAT (CGNAT). ISPs use this range between customer routers and carrier core gateways to avoid colliding with RFC 1918 private enterprise ranges."
      },
      {
        "id": "q_c2_m3_11",
        "question": "An edge firewall administrator configures ingress anti-spoofing filters based on RFC 2827 (BCP 38). Which incoming packets traversing the external public interface must be dropped immediately?",
        "options": [
          "Packets bearing source IP addresses matching RFC 1918 private ranges, loopback (127.0.0.0/8), or APIPA (169.254.0.0/16)",
          "Packets destined for TCP port 443 on web servers in the DMZ",
          "Packets containing valid public IP source addresses from external DNS resolvers",
          "Packets originating from authorized external vendor VPN gateways"
        ],
        "correct_index": 0,
        "explanation": "BCP 38 (RFC 2827) mandates ingress filtering: edge firewalls must drop inbound packets from the public internet that claim to originate from private (RFC 1918), loopback, link-local, or unallocated (bogon) IP addresses, as these are forged/spoofed."
      },
      {
        "id": "q_c2_m3_12",
        "question": "How many total bits are reserved for the network prefix and host identifier respectively in an IPv4 address?",
        "options": [
          "Variable distribution defined by the subnet mask, totaling exactly 32 bits",
          "Fixed 24 bits for network and 8 bits for host universally",
          "Fixed 16 bits for network and 16 bits for host universally",
          "Variable distribution totaling 128 bits"
        ],
        "correct_index": 0,
        "explanation": "An IPv4 address consists of 32 bits. The exact boundary between the network prefix (identifying the subnet) and the host identifier (identifying the specific interface) is dynamically determined by the subnet mask (or CIDR prefix)."
      },
      {
        "id": "q_c2_m3_13",
        "question": "In Variable-Length Subnet Masking (VLSM) design, why must an engineer sort network requirements from largest host count to smallest host count before allocating subnets?",
        "options": [
          "To ensure larger subnets align naturally on their binary block-size boundaries, preventing address fragmentation and overlap",
          "To allow switches to execute Spanning Tree calculations faster",
          "Because routing protocols reject subnets that are smaller than /24",
          "To satisfy IEEE hardware manufacturing requirements"
        ],
        "correct_index": 0,
        "explanation": "VLSM subnets must be aligned on binary boundaries divisible by their block size. Allocating the largest subnets first ensures efficient, contiguous address placement without causing address gaps or accidental overlaps."
      },
      {
        "id": "q_c2_m3_14",
        "question": "What is the result of performing a bitwise logical AND operation between the IPv4 address 10.20.4.17 and the subnet mask 255.255.0.0 (/16)?",
        "options": [
          "10.20.0.0 (Network Address)",
          "10.20.4.0",
          "10.20.255.255",
          "10.0.0.0"
        ],
        "correct_index": 0,
        "explanation": "Performing a bitwise AND between an IP address and its subnet mask extracts the network identifier: 10.20.4.17 AND 255.255.0.0 = 10.20.0.0."
      },
      {
        "id": "q_c2_m3_15",
        "question": "During a firewall policy review at Orchid Payments, an engineer intended to allow a partner's single server subnet 203.0.113.64/27 to access an API. Due to a typo, the rule was entered as 203.0.0.0/16. What was the security impact?",
        "options": [
          "The rule erroneously granted access to 65,536 external IP addresses instead of the intended 30 usable hosts",
          "The firewall crashed due to memory exhaustion",
          "All outbound corporate Internet traffic was permanently blocked",
          "The rule had zero effect because /16 prefixes are illegal on firewalls"
        ],
        "correct_index": 0,
        "explanation": "A /27 subnet encompasses 32 addresses (30 usable hosts). A /16 subnet encompasses 65,536 addresses. The typo expanded the attack surface by a factor of over 2,000, violating least privilege and exposing internal APIs."
      },
      {
        "id": "q_c2_m3_16",
        "question": "What security mechanism on enterprise switches intercepts and drops rogue IPv6 Router Advertisement (RA) messages sent by unauthorized or compromised endpoints attempting to hijack default gateway roles?",
        "options": [
          "IPv6 RA Guard (RFC 6105)",
          "Dynamic ARP Inspection (DAI)",
          "Spanning Tree PortFast",
          "BGP Route Origin Authorization (ROA)"
        ],
        "correct_index": 0,
        "explanation": "IPv6 RA Guard (RFC 6105) is a Layer 2 switch security feature that inspects incoming ICMPv6 Router Advertisement frames on access ports and discards unauthorized RAs, preventing rogue gateway or DNS hijacking."
      },
      {
        "id": "q_c2_m3_17",
        "question": "Under RFC 4862, how does an endpoint autonomously generate its own IPv6 address using Stateless Address Autoconfiguration (SLAAC)?",
        "options": [
          "The host receives a /64 network prefix from the local router's Router Advertisement (RA) and appends a 64-bit interface identifier",
          "The host queries a central DHCPv4 server on UDP port 67",
          "The host generates a 32-bit random number and broadcasts it via ARP",
          "The host downloads an assigned address list from an authoritative DNS root server"
        ],
        "correct_index": 0,
        "explanation": "Under SLAAC (RFC 4862), an endpoint receives the 64-bit network prefix advertised by the local router via an ICMPv6 Router Advertisement, and generates its own 64-bit Interface Identifier (either via modified EUI-64 or cryptographically randomized privacy extensions under RFC 8981)."
      },
      {
        "id": "q_c2_m3_18",
        "question": "Which of the following represents an IPv4 address reserved exclusively for documentation and educational examples under RFC 5737?",
        "options": [
          "192.0.2.1 (TEST-NET-1)",
          "192.168.1.1",
          "10.0.0.1",
          "172.16.1.1"
        ],
        "correct_index": 0,
        "explanation": "RFC 5737 reserves three dedicated IPv4 blocks strictly for documentation and textbook examples: 192.0.2.0/24 (TEST-NET-1), 198.51.100.0/24 (TEST-NET-2), and 203.0.113.0/24 (TEST-NET-3). They are non-routable on the global internet."
      },
      {
        "id": "q_c2_m3_19",
        "question": "How many total IP addresses are contained in a standard IPv6 /64 local subnet allocation?",
        "options": [
          "18,446,744,073,709,551,616 (2^64 addresses)",
          "4,294,967,296 (2^32 addresses)",
          "65,536 (2^16 addresses)",
          "16,777,216 (2^24 addresses)"
        ],
        "correct_index": 0,
        "explanation": "A standard IPv6 subnet reserves 64 bits for the interface ID. Total addresses = 2^64 = 18.44 quintillion addresses, rendering sequential brute-force network scanning virtually impossible."
      },
      {
        "id": "q_c2_m3_20",
        "question": "Why is the loopback IPv4 address range 127.0.0.0/8 architecturally significant from a host security perspective?",
        "options": [
          "Traffic addressed to 127.0.0.0/8 never leaves the local host's internal network stack, allowing local services to communicate securely without external exposure",
          "It represents the global broadcast address for all external ISP routers",
          "It is used by switches to synchronize Spanning Tree BPDU frames",
          "It forces the physical network adapter into promiscuous monitoring mode"
        ],
        "correct_index": 0,
        "explanation": "The 127.0.0.0/8 block (commonly 127.0.0.1 / localhost) is the host loopback network. Packets sent to this range are routed entirely within the internal kernel network stack and are never transmitted out of physical hardware interfaces."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c2_m3_l1",
      "title": "3.1 Binary Foundations & the Structure of an IPv4 Address",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Mathematical architecture of IPv4: 32-bit binary space, octet division, decimal-to-binary conversion mechanics, and the network vs. host boundary.",
      "learning_objectives": [
        "Explain the 32-bit architectural structure of an IPv4 address defined in RFC 791.",
        "Convert accurately between 8-bit binary octets and dotted-decimal notation from memory.",
        "Differentiate between the network prefix portion and the host identifier portion of an address.",
        "Inspect IPv4 address representation using publication-grade structural diagrams.",
        "Calculate the mathematical capacity limits of the global 32-bit IPv4 address space."
      ],
      "images": [
        {
          "id": "img_c2_m3_f1",
          "title": "Figure C02-M03-F1: IPv4 Address Structure & Binary Conversion",
          "url": "/assets/courses/cyber-02/C02-M03-F1.png",
          "caption": "Figure C02-M03-F1: Structural breakdown of an IPv4 address: 32 bits divided into four 8-bit octets, illustrating dotted-decimal representation, binary place values, and the network/host boundary.",
          "alt": "An IPv4 address in binary, dotted decimal, network prefix and host part"
        }
      ],
      "content": "## The 32-Bit Numerical Architecture of IPv4\n\nEvery packet transmitted across an Internet Protocol network carries an immutable destination address and source address. Security analysts, firewall engineers, intrusion detection operators, and digital forensic investigators must possess fluent, second-nature comprehension of IP addressing mechanics. If you cannot immediately identify that `10.20.4.17` is contained inside the CIDR block `10.20.0.0/16`, or recognize that `169.254.86.237` indicates a catastrophic DHCP negotiation failure, you will misinterpret forensic evidence, misdiagnose incident telemetry, and deploy dangerously broken firewall policies.\n\nUnder the foundational Internet Protocol Version 4 specification (RFC 791), an IPv4 address is not text; it is strictly a **32-bit unsigned binary integer**.\n\nBecause raw 32-bit strings (such as `11000000101010000000101000100101`) are incomprehensible for human administrators to configure and troubleshoot, the 32-bit integer is segmented into four equal 8-bit groups called *octets* (or bytes). Each octet is converted into its decimal equivalent (ranging from 0 to 255) and separated by periods. This format is designated as *dotted-decimal notation*:\n\n```text\nDotted Decimal:        192      .     168      .      10      .      37\nBinary Representation: 11000000 .   10101000   .   00001010   .   00100101\n```\n\n![Figure C02-M03-F1: IPv4 Address Structure & Binary Conversion](/assets/courses/cyber-02/C02-M03-F1.png)\n\n*Figure C02-M03-F1: Architectural decomposition of an IPv4 address into four 8-bit octets, illustrating binary place values, decimal conversion, and the demarcation between network and host portions.*\n\n### Visual Walkthrough & Architectural Breakdown\n\n- **Bitwise Octet Alignment (`192.168.10.37/26`):** Top-to-bottom alignment converts each decimal octet into 8 binary bits, applies a bitwise `AND` against the `/26` mask (`11000000` in octet 4) to zero all 6 host bits and isolate Network `192.168.10.0`, then sets all 6 host bits to `1` (`00111111 = 63`) to derive Directed Broadcast `192.168.10.63`.\n\n---\n\n## Binary Place Values and Octet Conversion\n\nWithin any 8-bit octet, each bit represents an increasing power of 2 (\\(2^0\\) to \\(2^7\\)), evaluated from right to left:\n\n| Bit Position | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |\n| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| *Power of 2* | \\(2^7\\) | \\(2^6\\) | \\(2^5\\) | \\(2^4\\) | \\(2^3\\) | \\(2^2\\) | \\(2^1\\) | \\(2^0\\) |\n| **Decimal Place Value** | `128` | `64` | `32` | `16` | `8` | `4` | `2` | `1` |\n\n### Step-by-Step Mathematical Conversion:\n\n#### Decimal to Binary (e.g., Decimal 37):\n1. Does 128 fit into 37? No \\(\\to\\) `0`\n2. Does 64 fit into 37? No \\(\\to\\) `0`\n3. Does 32 fit into 37? Yes (\\(37 - 32 = 5\\)) \\(\\to\\) `1`\n4. Does 16 fit into 5? No \\(\\to\\) `0`\n5. Does 8 fit into 5? No \\(\\to\\) `0`\n6. Does 4 fit into 5? Yes (\\(5 - 4 = 1\\)) \\(\\to\\) `1`\n7. Does 2 fit into 1? No \\(\\to\\) `0`\n8. Does 1 fit into 1? Yes (\\(1 - 1 = 0\\)) \\(\\to\\) `1`\n$$\\text{Result: } 00100101_2$$\n\n#### Binary to Decimal (e.g., Binary `11000000`):\n$$\\text{Value} = (1 \\times 128) + (1 \\times 64) + (0 \\times 32) + (0 \\times 16) + (0 \\times 8) + (0 \\times 4) + (0 \\times 2) + (0 \\times 1) = 192$$\n\n:::math-steps Octet Binary-to-Decimal and Decimal-to-Binary Derivation\nStep 01: Extract Set Powers of Two From 37\nSubtract descending powers of 2 from 37, emitting bit 1 whenever a power fits (32 + 4 + 1) and 0 otherwise.\n$$37 = (0 \\times 128) + (0 \\times 64) + (1 \\times 32) + (0 \\times 16) + (0 \\times 8) + (1 \\times 4) + (0 \\times 2) + (1 \\times 1) = 00100101_2$$\n*Result: 00100101 in 8-bit unsigned binary*\nStep 02: Reconstruct Decimal Octet From 11000000\nSum positional weights for bits 7 and 6 inside the first subnet-mask octet 11000000.\n$$11000000_2 = 128 + 64 = 192$$\n*Result: Decimal value 192*\n:::\n\n---\n\n## The Network and Host Demarcation\n\nAn IP address does not function as an unstructured flat identifier (unlike a MAC address). Instead, it embodies a two-tiered hierarchical architecture:\n\n1. **Network Portion (Prefix):** The contiguous sequence of high-order (leftmost) bits that identifies the specific logical network or subnet. Every host interface participating in the same broadcast domain must share the identical network prefix.\n2. **Host Portion (Host ID):** The remaining sequence of low-order (rightmost) bits that uniquely identifies a specific endpoint interface attached to that logical network.\n\nThe precise location of the dividing line between the network portion and the host portion is determined entirely by the **subnet mask** or **CIDR prefix length**."
    },
    {
      "id": "les_c2_m3_l2",
      "title": "3.2 Subnet Masks, CIDR Notation & Network Boundary Calculations",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Subnet masks, Classless Inter-Domain Routing (CIDR / RFC 4632), bitwise AND operations, network address calculation, broadcast address determination, and usable host formulas.",
      "learning_objectives": [
        "Explain how a 32-bit subnet mask delineates network bits from host bits.",
        "Calculate the network address, broadcast address, and usable host range for any CIDR prefix length.",
        "Execute bitwise AND operations manually and programmatically.",
        "Utilize Python's standard `ipaddress` library to verify network calculations and prevent host-bits-set syntax errors.",
        "Evaluate the security risks of over-broad subnet masks in firewall access control lists."
      ],
      "images": [
        {
          "id": "img_c2_m3_d1",
          "title": "Figure C02-M03-D1: IPv4 CIDR Subnet Slicing Architecture",
          "url": "/assets/courses/cyber-02/c02_m3_l2_cidr_subnet_slicing.jpg",
          "caption": "Figure C02-M03-D1: IPv4 CIDR subnet partitioning demonstrating how a /24 network is split into four /26 subnets, showing network bits, host bits, subnet mask 255.255.255.192, and usable host allocations.",
          "alt": "Diagram showing IPv4 CIDR subnet slicing of 192.168.10.0/24 into four /26 subnets"
        }
      ],
      "content": "## The Subnet Mask: Bitwise Demarcation\n\nA subnet mask is a 32-bit companion value configured alongside an IPv4 address. Its sole purpose is to instruct routers and network stacks exactly which bits belong to the network prefix and which belong to the host identifier.\n\nA valid subnet mask consists of a continuous, unbroken sequence of binary *1s* starting from the leftmost bit, followed by a contiguous sequence of binary *0s*:\n- The binary *1s* represent the *network portion*.\n- The binary *0s* represent the *host portion*.\n\n```text\nSubnet Mask (Dotted Decimal):  255.255.255.0\nSubnet Mask (Binary):          11111111.11111111.11111111.00000000\n                               [--- 24 Network Bits ---] [8 Host Bits]\n```\n\n## Classless Inter-Domain Routing (CIDR) Notation\n\nIn early networking (1981–1993), IP addresses were rigidly categorized into inflexible classes (Class A = /8, Class B = /16, Class C = /24). This caused catastrophic address waste: an organization needing 300 IP addresses was forced to lease an entire Class B block (65,536 addresses), wasting 99.5% of the allocation.\n\nIn 1993, the IETF abolished classful addressing with *Classless Inter-Domain Routing (CIDR)*, codified in RFC 4632.\n\nUnder CIDR notation, the subnet mask is expressed simply as a forward slash followed by the exact count of contiguous binary 1s (the prefix length):\n- `255.255.255.0` \\(\\implies\\) `/24`\n- `255.255.0.0` \\(\\implies\\) `/16`\n- `255.255.255.192` \\(\\implies\\) `/26`\n\n### Standard CIDR Prefix Reference Table:\n\n| CIDR Prefix | Subnet Mask (Dotted Decimal) | Total IP Addresses (\\(2^{32 - P}\\)) | Usable Host Addresses (\\(2^{32 - P} - 2\\)) | Typical Enterprise Role |\n| :---: | :--- | :---: | :---: | :--- |\n| `/8` | `255.0.0.0` | 16,777,216 | 16,777,214 | Global enterprise supernet / Carrier allocation |\n| `/16` | `255.255.0.0` | 65,536 | 65,534 | Large enterprise campus / Cloud VPC block |\n| `/22` | `255.255.252.0` | 1,024 | 1,022 | Regional office headquarters |\n| `/24` | `255.255.255.0` | 256 | 254 | Standard office floor / Departmental LAN |\n| `/25` | `255.255.255.128` | 128 | 126 | Mid-size server farm / Guest Wi-Fi pool |\n| `/26` | `255.255.255.192` | 64 | 62 | Secure DMZ enclave / Clustered services |\n| `/27` | `255.255.255.224` | 32 | 30 | Executive management zone |\n| `/28` | `255.255.255.240` | 16 | 14 | Database cluster / Critical storage nodes |\n| `/29` | `255.255.255.248` | 8 | 6 | Public ISP DMZ transit block |\n| `/30` | `255.255.255.252` | 4 | 2 | Legacy point-to-point router links |\n| `/31` | `255.255.255.254` | 2 | 2 (RFC 3021) | Modern point-to-point router links |\n| `/32` | `255.255.255.255` | 1 | 1 (Single Host) | Host route / Firewall loopback rule |\n\n---\n\n## Calculating Network and Broadcast Addresses: Step-by-Step\n\nTo determine the exact boundaries of any IP subnet, network devices perform a *bitwise logical AND* operation between the host's IP address and the subnet mask:\n- \\(1 \\text{ AND } 1 = 1\\)\n- \\(1 \\text{ AND } 0 = 0\\)\n- \\(0 \\text{ AND } 1 = 0\\)\n- \\(0 \\text{ AND } 0 = 0\\)\n\n### Worked Exercise: Deconstructing `192.168.10.37/26`\n- IP Address: `192.168.10.37`\n- Subnet Mask: `/26` \\(\\implies\\) `255.255.255.192`\n\n#### Step 1: Binary Alignment of the Interesting (Last) Octet\n- Octet value: \\(37 \\implies 00100101_2\\)\n- Mask value: \\(192 \\implies 11000000_2\\)\n\n#### Step 2: Bitwise Logical AND\n```text\n   00100101  (37)\nAND 11000000  (192)\n-------------------\n   00000000  (0)\n```\n- The *Network Address* is: `192.168.10.0`\n\n#### Step 3: Determine Block Size (\"Magic Number\")\n$$\\text{Block Size} = 256 - \\text{Interesting Mask Octet} = 256 - 192 = 64$$\n\n:::math-steps Deriving Subnet Boundaries for 192.168.10.37/26\nStep 01: Convert CIDR Prefix to Dotted-Decimal Fourth Octet\nSet the first 2 bits of the fourth octet to 1 (26 total network bits = 8 + 8 + 8 + 2).\n$$\\text{Fourth Mask Octet} = 11000000_2 = 128 + 64 = 192$$\n*Result: Subnet mask 255.255.255.192*\nStep 02: Compute Increment Block Size via Magic Number\nSubtract the interesting mask octet from 256 to isolate the step interval between consecutive /26 subnets.\n$$\\text{Block Size} = 256 - 192 = 64\\text{ addresses}$$\n*Result: Blocks start at .0, .64, .128, .192*\nStep 03: Bitwise AND Target Octet 37 With 192\nMask out the lower 6 host bits to lock 192.168.10.37 onto its parent subnet ID.\n$$00100101_2\\ \\&\\ 11000000_2 = 00000000_2 = 0$$\n*Result: Network ID 192.168.10.0, Usable .1 to .62, Broadcast .63*\n:::\nThe subnets on this wire increment in blocks of 64:\n- Subnet 1: `192.168.10.0`\n- Subnet 2: `192.168.10.64`\n- Subnet 3: `192.168.10.128`\n- Subnet 4: `192.168.10.192`\n\n![Figure C02-M03-D1: IPv4 CIDR Subnet Slicing Architecture](/assets/courses/cyber-02/c02_m3_l2_cidr_subnet_slicing.jpg)\n\n*Figure C02-M03-D1: IPv4 CIDR subnet partitioning demonstrating how a /24 network is split into four /26 subnets, showing network bits, host bits, subnet mask 255.255.255.192, and usable host allocations.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Partitioning `192.168.10.0/24` With Two Borrowed Bits:** Reassigning bits `7` and `6` of the final octet (`255.255.255.192`) slices the parent 256-address block into four deterministic 64-address `/26` ranges (`Subnet 0: .0–.63` through `Subnet 3: .192–.255`), dedicating `.0` (network ID) and `.63` (broadcast) per slice while leaving 62 assignable host IPs.\n\n#### Step 4: Determine Broadcast and Usable Host Range\n- **Network Identifier (All host bits 0):** `192.168.10.0`\n- **First Usable Host:** `192.168.10.1`\n- **Last Usable Host:** `192.168.10.62`\n- **Directed Broadcast Address (All host bits 1):** `192.168.10.63`\n- **Total Usable Host Capacity:** \\(64 - 2 = 62 \\text{ endpoints}\\)\n\n---\n\n## Programmatic Verification with Python Standard Library\n\nIn modern security operations and cloud infrastructure-as-code engineering, calculations are validated programmatically using Python's built-in `ipaddress` module:\n\n```python\nimport ipaddress\n\n# Create a strict IPv4 network object\nnet = ipaddress.ip_network(\"192.168.10.0/26\")\n\nprint(\"Subnet Mask:        \", net.netmask)\nprint(\"Wildcard Hostmask:  \", net.hostmask)\nprint(\"Broadcast Address:  \", net.broadcast_address)\nprint(\"Total Addresses:    \", net.num_addresses)\n\nhosts = list(net.hosts())\nprint(\"Usable Host Range:  \", hosts[0], \"to\", hosts[-1])\nprint(\"Usable Host Count:  \", len(hosts))\n\n# Verification of Membership\ntarget_ip = ipaddress.ip_address(\"192.168.10.37\")\nprint(\"Is 192.168.10.37 inside 192.168.10.0/26? ->\", target_ip in net)\n```\n\n### Verbatim Output\n\n```text\nSubnet Mask:         255.255.255.192\nWildcard Hostmask:   0.0.0.63\nBroadcast Address:   192.168.10.63\nTotal Addresses:     64\nUsable Host Range:   192.168.10.1 to 192.168.10.62\nUsable Host Count:   62\nIs 192.168.10.37 inside 192.168.10.0/26? -> True\n```\n\n> [!TIP]\n> **Defensive Coding Invariant:**\n> Notice that `ipaddress.ip_network(\"192.168.10.37/26\")` will raise a fatal `ValueError: 192.168.10.37/26 has host bits set` unless `strict=False` is passed. This safeguard prevents engineers from committing malformed firewall rules that silently mask unintentional subnets."
    },
    {
      "id": "les_c2_m3_l3",
      "title": "3.3 Subnetting Engineering & Variable-Length Subnet Masking (VLSM)",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Engineering methods for subnet partitioning: equal-sized subnets, borrowing host bits, Variable-Length Subnet Masking (VLSM) algorithms, address space optimization, and route summarization.",
      "learning_objectives": [
        "Divide an allocated IPv4 block into equal-sized subnets by borrowing host bits.",
        "Design an enterprise Variable-Length Subnet Mask (VLSM) allocation plan based on real departmental host requirements.",
        "Apply the largest-to-smallest sorting algorithm to eliminate address collisions and overlap.",
        "Calculate route summarization (supernetting) to optimize routing tables and firewall rules.",
        "Analyze the visual subdivision of address space using structural matrix diagrams."
      ],
      "images": [
        {
          "id": "img_c2_m3_f2",
          "title": "Figure C02-M03-F2: Subdividing a /24 into Four /26 Subnets",
          "url": "/assets/courses/cyber-02/C02-M03-F2.png",
          "caption": "Figure C02-M03-F2: Binary partitioning of the IPv4 address block 192.0.2.0/24 into four equal /26 subnets, illustrating block boundaries, network IDs, and broadcast boundaries.",
          "alt": "Splitting 192.0.2.0/24 into four /26 subnets"
        }
      ],
      "content": "## Why Subnet? The Security and Operational Imperative\n\nSubnetting is the practice of dividing a large physical or logical network into two or more smaller, distinct sub-networks (subnets). Organizations subnet for three primary reasons:\n\n1. **Security & Access Control (Primary):** Devices on different subnets cannot communicate directly across Layer 2 switches. Traffic between subnets *must traverse a Layer 3 router or firewall*, creating an enforced inspection boundary where access control lists, stateful inspection, and intrusion prevention can be applied.\n2. **Containment of Broadcast Storms:** Layer 2 broadcast frames (such as ARP requests and DHCP discovers) propagate across an entire subnet. Partitioning a large network into smaller subnets restricts broadcast traffic, preserving CPU cycles and bandwidth.\n3. **Administrative Governance:** Delegating subnet management simplifies IP address management (IPAM), telemetry collection, and incident containment.\n\n![Figure C02-M03-F2: Subdividing a /24 into Four /26 Subnets](/assets/courses/cyber-02/C02-M03-F2.png)\n\n*Figure C02-M03-F2: Visual decomposition of an allocated /24 network block (256 addresses) into four isolated /26 subnets (64 addresses each), illustrating network addresses, usable host boundaries, and broadcast addresses.*\n\n### Visual Walkthrough & Architectural Breakdown\n\n- **VLSM Allocation Map Across `10.40.0.0/22` (and `/24` Splitting):** Assigning largest departments first aligns *Staff* (`10.40.0.0/23`), *Guests* (`/25`), *Servers* (`/26`), *CCTV* (`/26`), and *Mgmt* (`/28`) along aligned binary block boundaries, committing `784` of `1,024` addresses while preserving contiguous spare space (`10.40.3.16–10.40.3.255`) without overlap.\n\n---\n\n## Equal-Size Subnetting Mechanics\n\nWhen dividing a network block into equal subnets, an engineer *borrows bits from the host portion* and reallocates them to the network prefix.\n\n### The Bit-Borrowing Formulas:\n$$\\text{Number of Subnets Created} = 2^{\\text{Borrowed Bits } (b)}$$\n$$\\text{Usable Hosts per Subnet} = 2^{\\text{Remaining Host Bits } (h)} - 2$$\n\n:::math-steps Subnet Calculation: Partitioning 192.168.10.0/24 into 4 Equal Subnets\nStep 01: Calculate Required Borrowed Network Bits\n$$2^b = 4 \\implies b = 2 \\text{ bits}$$\n*Result: Borrow 2 bits from the default 8-bit host octet*\n\nStep 02: Determine New CIDR Prefix Length\n$$\\text{New Prefix Length} = 24 + 2 = \\mathbf{/26}$$\n*Result: Subnet mask expands to 255.255.255.192*\n\nStep 03: Compute Remaining Host Bits per Subnet\n$$h = 32 - 26 = 6 \\text{ bits}$$\n*Result: Total raw addresses per subnet = 2^6 = 64 addresses*\n\nStep 04: Calculate Usable Endpoint Host Capacity\n$$\\text{Usable Hosts} = 2^h - 2 = 2^6 - 2 = \\mathbf{62 \\text{ hosts}}$$\n*Result: Excludes Subnet Network ID and Subnet Broadcast ID*\n:::\n\nThe four resulting contiguous subnets:\n1. `192.168.10.0/26` (Usable: `.1` to `.62`, Broadcast: `.63`)\n2. `192.168.10.64/26` (Usable: `.65` to `.126`, Broadcast: `.127`)\n3. `192.168.10.128/26` (Usable: `.129` to `.190`, Broadcast: `.191`)\n4. `192.168.10.192/26` (Usable: `.193` to `.254`, Broadcast: `.255`)\n\n---\n\n## Variable-Length Subnet Masking (VLSM)\n\nEqual-size subnetting works well when all departments require identical host capacities. However, real-world organizations feature wildly asymmetric requirements:\n- Staff Workstations: 300 hosts\n- Guest Wi-Fi: 120 hosts\n- Production Servers: 50 hosts\n- Security Surveillance CCTV: 40 hosts\n- Out-of-Band Management: 10 hosts\n\nUsing equal-size /23 subnets for all departments would exhaust address space immediately, while /26 subnets would starve the staff department. *VLSM* solves this by applying different subnet masks to different subnets carved from the same parent block.\n\n### The Mandatory VLSM Engineering Rule:\n> [!IMPORTANT]\n> **Largest to Smallest Allocation Order:**\n> Always sort host capacity requirements from *largest to smallest* before assigning prefixes. This ensures that large subnets naturally align with their binary block boundaries (\\(2^n\\)), completely preventing overlapping ranges and address fragmentation.\n\n### Practical Enterprise VLSM Scenario:\nAllocating the block **`10.40.0.0/22`** (1,024 total IP addresses):\n\n| Department | Hosts Needed | Smallest Valid Prefix | Block Size (\\(2^{32 - P}\\)) | Usable Capacity | Assigned Subnet | Usable Host Range | Broadcast Address |\n| :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- |\n| *1. Staff* | 300 | */23* | 512 | 510 | `10.40.0.0/23` | `10.40.0.1` – `10.40.1.254` | `10.40.1.255` |\n| *2. Guests* | 120 | */25* | 128 | 126 | `10.40.2.0/25` | `10.40.2.1` – `10.40.2.126` | `10.40.2.127` |\n| *3. Servers*| 50 | */26* | 64 | 62 | `10.40.2.128/26`| `10.40.2.129` – `10.40.2.190`| `10.40.2.191` |\n| *4. CCTV* | 40 | */26* | 64 | 62 | `10.40.2.192/26`| `10.40.2.193` – `10.40.2.254`| `10.40.2.255` |\n| *5. Mgmt* | 10 | */28* | 16 | 14 | `10.40.3.0/28` | `10.40.3.1` – `10.40.3.14` | `10.40.3.15` |\n| *Unused Space*| — | — | 240 | — | `10.40.3.16/28` to `10.40.3.255` | *Reserved for Future Expansion* | — |\n\n---\n\n## Route Summarization (Supernetting)\n\nRoute summarization is the mathematical inversion of subnetting. Instead of dividing one large block into many small subnets, an engineer aggregates multiple contiguous smaller subnets into a single, compact routing advertisement.\n- E.g., Four contiguous /24 networks (`10.40.0.0/24`, `10.40.1.0/24`, `10.40.2.0/24`, `10.40.3.0/24`) can be summarized into a single route: **`10.40.0.0/22`**.\n- **Defensive Caveat:** Route summarization drastically reduces router CPU and memory overhead. However, in firewall policy design, an overly broad summary rule (such as entering `10.0.0.0/8` instead of specific subnets) can inadvertently open access pathways to unintended internal departments, violating the principle of least privilege."
    },
    {
      "id": "les_c2_m3_l4",
      "title": "3.4 Special-Purpose IPv4 Address Spaces & Triage Forensics",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Authoritative registry of special-purpose IPv4 addresses: RFC 1918 private ranges, RFC 3927 link-local APIPA, RFC 6598 Carrier-Grade NAT, loopback semantics, and BCP 38 edge anti-spoofing ingress filtering.",
      "learning_objectives": [
        "Memorize the exact ranges and CIDR boundaries of RFC 1918 private address blocks.",
        "Diagnose host network failures from link-local (169.254.0.0/16 APIPA) presence.",
        "Explain the operational purpose and forensic logging implications of Carrier-Grade NAT (100.64.0.0/10 CGNAT).",
        "Formulate BCP 38 edge firewall ingress filtering rules to drop bogon and spoofed traffic.",
        "Recognize RFC 5737 documentation blocks in threat intelligence feeds and configuration audits."
      ],
      "images": [],
      "content": "## The IANA Special-Purpose Address Registry\n\nNot all IPv4 addresses are globally routable on the public Internet. The Internet Assigned Numbers Authority (IANA) maintains the official *IPv4 Special-Purpose Address Registry*, reserving dedicated ranges for private enterprise routing, loopback diagnostics, carrier NAT, documentation, and multicast delivery.\n\nA cybersecurity defender or SOC triage analyst must instantly recognize these ranges on sight:\n\n| Address Range | CIDR Prefix | Official Purpose & Standard | Security & Triage Interpretation |\n| :--- | :---: | :--- | :--- |\n| `10.0.0.0 – 10.255.255.255` | `/8` | Private Enterprise (RFC 1918) | Internal private network; must never be routed across the public Internet. |\n| `172.16.0.0 – 172.31.255.255` | `/12` | Private Enterprise (RFC 1918) | 16 contiguous /16 blocks. Common in corporate enclaves and Docker networks. |\n| `192.168.0.0 – 192.168.255.255`| `/16` | Private Enterprise (RFC 1918) | Small-office/home networks (SOHO), local management ports. |\n| `127.0.0.0 – 127.255.255.255` | `/8` | Host Loopback (RFC 1122) | Internal host communication; packets never leave the physical NIC. |\n| `169.254.0.0 – 169.254.255.255`| `/16` | Link-Local / APIPA (RFC 3927) | **Critical Triage Indicator:** Host failed to receive a DHCP response! |\n| `100.64.0.0 – 100.127.255.255` | `/10` | Shared Address Space / CGNAT (RFC 6598) | ISP Carrier-Grade NAT; multiple subscribers share a single public IP. |\n| `192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24` | `/24` | Documentation (RFC 5737) | Textbook & lab examples (TEST-NET-1/2/3); never seen in live traffic. |\n| `224.0.0.0 – 239.255.255.255` | `/4` | Multicast (RFC 5771) | One-to-many group communication (e.g., `224.0.0.251` for mDNS). |\n| `0.0.0.0/8` | `/8` | \"This Network\" / Unspecified | `0.0.0.0` in server socket binding means \"listen on all active interfaces.\" |\n| `255.255.255.255` | `/32` | Limited Broadcast | Transmitted to all nodes on the immediate local link segment only. |\n\n---\n\n## Defensive Security Applications of Special Ranges\n\n```mermaid\nflowchart LR\n    Pkt[\"Incoming Packet Source IP Check\"] --> IsPub{\"RFC 1918, APIPA,<br/>or Loopback?\"}\n    IsPub -->|Yes on WAN Edge| Drop[\"DROP (BCP 38 Spoof Block)\"]\n    IsPub -->|No, Valid Routable| IsCgnat{\"In 100.64.0.0/10?\"}\n    IsCgnat -->|Yes| CGNAT[\"Correlate ISP NAT Port + Timestamp\"]\n    IsCgnat -->|No| Forward[\"Allow Under Perimeter ACL\"]\n```\n\n*Figure C02-M03-D3: Special-Purpose IPv4 Triage Decision Tree — Dropping Spoofed Private/APIPA Blocks Under `BCP 38` While Correlating `CGNAT` Attribution Logs.*\n\n### Visual Walkthrough & Architectural Breakdown\n\n- **Edge Spoof Drop vs. Forensic Correlation:** Packets arriving at an Internet edge claiming *RFC 1918*, *127.0.0.0/8*, or *169.254.0.0/16* source addresses fail *BCP 38* egress/ingress sanity checks and drop immediately; legitimate external connections routed behind carrier *100.64.0.0/10* gateways require matching exact TCP/UDP source ports and millisecond timestamps to isolate subscribers.\n\n### 1. Ingress Edge Filtering (BCP 38 / RFC 2827)\nOne of the most foundational defenses against Distributed Denial of Service (DDoS) reflection attacks is **Best Current Practice 38 (BCP 38)**.\n- **The Rule:** An enterprise edge firewall facing the public Internet must **drop all inbound packets** that claim a source IP address originating from RFC 1918 private space, loopback (`127.0.0.0/8`), APIPA (`169.254.0.0/16`), or unallocated blocks (collectively known as **bogon filtering**).\n- *Reasoning:* A packet arriving from the public Internet claiming to be `10.1.2.3` or `127.0.0.1` is mathematically impossible under legitimate routing—it is a forged, spoofed packet crafted by an adversary attempting to bypass internal firewall rules or elicit reflected responses.\n\n### 2. Triage of the 169.254.x.x (APIPA) Address\nWhen an IT support ticket or SOC alert reports an uncontactable server, running `ipconfig` or `ip addr` and observing an address in the `169.254.0.0/16` block instantly identifies the root cause:\n- The host is physically connected to the wire, but its DHCP client received zero answers to its DHCP Discover broadcasts.\n- The operating system fell back to RFC 3927 link-local autoconfiguration.\n- This immediately shifts the investigation to checking DHCP server pool exhaustion, switch VLAN trunking misconfigurations, or 802.1X port blocking.\n\n### 3. Forensic Challenges of Carrier-Grade NAT (CGNAT - 100.64.0.0/10)\nDue to global IPv4 exhaustion, telecommunication and cellular operators (such as mobile 4G/5G carriers) deploy Carrier-Grade NAT.\n- Thousands of independent mobile subscribers and residential routers are assigned private IP addresses in the `100.64.0.0/10` range.\n- All outbound connections are multiplexed through a small pool of public IP addresses using Port Address Translation (PAT).\n- **Forensic Consequence:** When law enforcement or incident responders observe a malicious intrusion originating from a public IP address owned by a CGNAT carrier, attributing the attack to a specific subscriber is impossible without obtaining **precise, timestamped port-translation session logs** from the carrier."
    },
    {
      "id": "les_c2_m3_l5",
      "title": "3.5 IPv6 Architecture: 128-Bit Addressing, SLAAC, NDP & Header Mechanics",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Engineering foundations of IPv6 (RFC 8200): 128-bit hexadecimal addressing, canonical compression (RFC 5952), global unicast, link-local scopes, SLAAC, and the Neighbor Discovery Protocol (NDP).",
      "learning_objectives": [
        "Explain the exhaustion of the 32-bit IPv4 address pool and the architectural necessity of IPv6.",
        "Apply RFC 5952 rules to compress and expand 128-bit IPv6 hexadecimal addresses.",
        "Categorize IPv6 address scopes: Global Unicast, Link-Local (fe80::/10), Unique Local (fc00::/7), and Multicast (ff00::/8).",
        "Describe the operational mechanics of Stateless Address Autoconfiguration (SLAAC) and privacy extensions.",
        "Contrast IPv6 Neighbor Discovery Protocol (NDP) with legacy IPv4 ARP."
      ],
      "images": [
        {
          "id": "img_c2_m3_f3",
          "title": "Figure C02-M03-F3: IPv6 Address Architecture & Compression",
          "url": "/assets/courses/cyber-02/C02-M03-F3.png",
          "caption": "Figure C02-M03-F3: Structure of a 128-bit IPv6 address: eight 16-bit hextets, demonstrating RFC 5952 compression rules and the standard /64 network-prefix versus interface-identifier boundary.",
          "alt": "An IPv6 address structure and an expanded address"
        }
      ],
      "content": "## The Exhaustion of IPv4 and the Genesis of IPv6\n\nThe total theoretical address space of IPv4 is \\(2^{32} \\approx 4,294,967,296\\) addresses. By 2011, the global explosion of smartphones, enterprise servers, cloud virtual machines, and consumer IoT devices completely consumed this pool. On February 3, 2011, IANA officially allocated its final five `/8` address blocks to the Regional Internet Registries (RIRs), marking the exhaustion of the global unallocated IPv4 pool.\n\n*Internet Protocol Version 6 (IPv6)*, formally standardized in RFC 8200, was engineered to permanently eliminate address scarcity by deploying a *128-bit address space*.\n\n$$\\text{IPv6 Capacity} = 2^{128} \\approx 340,282,366,920,938,463,463,374,607,431,768,211,456 \\text{ addresses}$$\n*(Over 340 undecillion addresses—sufficient to assign trillions of unique IP addresses to every square millimeter of the Earth's surface).*\n\n![Figure C02-M03-F3: IPv6 Address Architecture & Compression](/assets/courses/cyber-02/C02-M03-F3.png)\n\n*Figure C02-M03-F3: Structural decomposition of a 128-bit IPv6 address into eight 16-bit hextets, demonstrating canonical compression rules and the division between network prefix and interface identifier.*\n\n### Visual Walkthrough & Architectural Breakdown\n\n- **64-Bit Prefix and Canonical Compression (`RFC 5952`):** Eight 16-bit hexadecimal hextets split cleanly at bit 64 between the global `/48` organization prefix + `16-bit` subnet ID and the `64-bit` Interface Identifier; suppressing leading zeros and collapsing the longest all-zero run into `::` shrinks `2001:0db8:5a00:0010:0000:0000:0000:0001` into `2001:db8:5a00:10::1`.\n\n---\n\n## IPv6 Textual Notation and Canonical Compression (RFC 5952)\n\nA 128-bit IPv6 address is written as eight groups of four hexadecimal digits (known as *hextets* or quads), separated by colons:\n```text\n2001:0db8:0000:0000:0000:ff00:0042:8329\n```\n\nTo eliminate ambiguity, **RFC 5952** establishes strict rules for formatting and compressing IPv6 addresses:\n\n1. **Suppress Leading Zeros:** Within any individual 16-bit hextet, omit leading zeros:\n   - `0db8` \\(\\implies\\) `db8`\n   - `0042` \\(\\implies\\) `42`\n   - `0000` \\(\\implies\\) `0`\n2. **Double Colon (`::`) Compression:** Replace the longest contiguous sequence of all-zero hextets with a double colon (`::`).\n   - The double colon can be used *only once* in an address to prevent mathematical ambiguity.\n   - If two all-zero runs are of equal length, compress the first one.\n3. **Lowercase Representation:** All hexadecimal characters (a through f) must be written in lowercase.\n\n### Applying the Rules to Our Sample Address\n- Full Form: `2001:0db8:0000:0000:0000:ff00:0042:8329`\n- Step 1 (Omit leading zeros): `2001:db8:0:0:0:ff00:42:8329`\n- Step 2 (Compress longest zero run): **`2001:db8::ff00:42:8329`**\n\n---\n\n## The Standard /64 Prefix Boundary\n\nIn IPv6 local area networks, subnets are universally allocated as *`/64` blocks*:\n- **First 64 Bits:** The *Network Prefix* (assigned by your ISP and enterprise routing hierarchy).\n- **Last 64 Bits:** The *Interface Identifier (IID)* (identifying the specific host interface).\n\nA single `/64` subnet contains \\(2^{64} \\approx 1.84 \\times 10^{19}\\) addresses. An organization leasing an enterprise IPv6 connection typically receives a `/48` or `/56` allocation from its RIR or ISP, allowing it to carve out thousands of distinct `/64` subnets.\n\n---\n\n## Major IPv6 Address Scopes (RFC 4291)\n\n| Scope Type | Binary / CIDR Prefix | Operational Purpose | Routing Boundary |\n| :--- | :---: | :--- | :--- |\n| *Global Unicast* | `2000::/3` (e.g., `2001::`, `2400::`) | Publicly routable Internet addresses | Global Internet |\n| *Link-Local Unicast*| `fe80::/10` (in practice `fe80::/64`) | Mandatory auto-configured interface address | Local link segment only (Dropped by routers) |\n| *Unique Local (ULA)* | `fc00::/7` (in practice `fd00::/8`) | Private enterprise addressing (analogue to RFC 1918) | Internal corporate routing (Non-routable on Internet) |\n| *Loopback* | `::1/128` | Internal host loopback (analogue to 127.0.0.1) | Local internal kernel stack only |\n| *Unspecified* | `::/128` | Used by hosts before address acquisition | Local interface initialization |\n| *Multicast* | `ff00::/8` | One-to-many communication (Replaces broadcast!) | Segment or global based on scope bits |\n| *Documentation* | `2001:db8::/32` (RFC 3849) | Textbook and academic examples | Never routable |\n\n> [!IMPORTANT]\n> **No Broadcast in IPv6:**\n> IPv6 completely eliminates the concept of broadcast addresses! Operations that relied on broadcast in IPv4 (such as ARP and DHCP) utilize targeted *multicast groups* in IPv6 (e.g., `ff02::1` for all nodes on the link, `ff02::2` for all routers).\n\n---\n\n## How Endpoints Acquire IPv6 Addresses\n\nEndpoints acquire IPv6 configurations using three distinct methods:\n\n### 1. Stateless Address Autoconfiguration (SLAAC - RFC 4862)\nSLAAC allows an endpoint to connect to an IPv6 network and configure a globally routable address with **zero manual configuration and zero DHCP servers**:\n1. The host sends an ICMPv6 **Router Solicitation (RS)** multicast to `ff02::2`.\n2. Local routers respond with an ICMPv6 **Router Advertisement (RA)** announcing the local `/64` network prefix, default gateway lifetime, and DNS server addresses.\n3. The host combines the announced 64-bit prefix with its own 64-bit interface identifier.\n4. **Privacy Extensions (RFC 8981):** Early IPv6 implementations derived the interface ID from the hardware MAC address (using the EUI-64 algorithm), which allowed tracking users across networks. Modern operating systems generate **cryptographically randomized temporary interface IDs** that change periodically, preventing geographic tracking.\n\n### 2. Stateful or Stateless DHCPv6 (RFC 8415)\nA dedicated DHCPv6 server manages address leases or provides centralized DNS/NTP parameters.\n\n### 3. Neighbor Discovery Protocol (NDP - RFC 4861)\nNDP operates over ICMPv6 to replace legacy IPv4 ARP:\n- **Address Resolution:** When Host A wants the link-layer address of Host B, it sends an ICMPv6 **Neighbor Solicitation (NS)** to Host B's solicited-node multicast address. Host B replies with a **Neighbor Advertisement (NA)** containing its MAC address.\n- **Duplicate Address Detection (DAD):** Before binding an address, a host transmits an NS to its own prospective address. If any node responds with an NA, the host halts to prevent an address conflict."
    },
    {
      "id": "les_c2_m3_l6",
      "title": "3.6 Defensive Address Architecture: Filtering, Ingress Security & Anti-Spoofing",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Enterprise defensive address policies: BCP 38 edge ingress filtering, bogon lists, rogue IPv6 Router Advertisement mitigation (RA Guard / RFC 6105), and real-world case analysis of firewall rule typos.",
      "learning_objectives": [
        "Formulate production firewall access control policies that enforce strict IP address least privilege.",
        "Deploy anti-spoofing bogon filters at enterprise edge boundaries according to BCP 38 standards.",
        "Implement switch-level defenses against rogue IPv6 Router Advertisements using RA Guard (RFC 6105).",
        "Analyze the real-world operational and financial impact of IPv4 exhaustion on forensic log attribution.",
        "Audit firewall rules for dangerous prefix typos and over-broad subnet masks."
      ],
      "images": [
        {
          "id": "img_c2_m3_d2",
          "title": "Figure C02-M03-D2: BCP 38 Filtering & uRPF Anti-Spoofing Architecture",
          "url": "/assets/courses/cyber-02/c02_m3_l6_edge_antispoofing_architecture.jpg",
          "caption": "Figure C02-M03-D2: Enterprise edge perimeter security architecture demonstrating BCP 38 Ingress & Egress filtering and Unicast Reverse Path Forwarding (uRPF) dropping spoofed source IP packets.",
          "alt": "Diagram showing BCP 38 filtering and uRPF anti-spoofing at edge router"
        }
      ],
      "content": "## The Security Dimensions of Network Addressing\n\nIn enterprise cyber defense, network addresses are not neutral transport coordinates; they are fundamental security enforcement boundaries. Every firewall policy, access control list (ACL), security information and event management (SIEM) correlation alert, and zero-trust microsegmentation rule relies upon IP address definitions.\n\nA single typographical error in a subnet prefix length or a blind spot in dual-stack protocol inspection can completely nullify multi-million dollar perimeter security investments.\n\n---\n\n## Critical Attack Surfaces and Defensive Countermeasures\n\n### 1. The Typographical Subnet Expansion Vulnerability\nA recurring failure mode in enterprise security change management is the **over-broad CIDR prefix typo**.\n- **Scenario:** A security engineer receives a change ticket to permit an external payment gateway's single server subnet (`203.0.113.64/27`, comprising 30 usable host IPs) to reach an internal API service on TCP port 8443.\n- **The Defect:** When entering the firewall rule, the engineer inadvertently types `203.0.113.0/16`.\n- **The Architectural Consequence:** Many enterprise firewalls normalize host bits automatically, converting the rule to `203.0.0.0/16`. Instead of exposing the API to 30 vetted partner servers, the rule opens the internal service to **65,536 external IP addresses**, completely obliterating the security perimeter.\n- **Remediation:** Enforce automated Infrastructure-as-Code (IaC) linting using tools like Python's `ipaddress` library (with strict host-bit validation enabled) and mandate dual-peer review on all firewall change requests.\n\n---\n\n### 2. Ingress Anti-Spoofing and Bogon Filtering (BCP 38)\nBecause connectionless transport protocols (such as UDP and raw ICMP) perform no initial handshake, an attacker can forge (spoof) arbitrary source IP addresses in packet headers.\n- **Reflection / Amplification Attacks:** Adversaries send short DNS or NTP queries to public open resolvers, forging the victim's IP as the source. The resolvers reply with massive response packets directed at the victim, saturating their link.\n- **BCP 38 (RFC 2827) Ingress Filtering:** Edge routers and firewalls must inspect every packet arriving on an interface and verify that its source IP address belongs to the legitimately allocated subnet attached to that link. Any incoming packet from the public Internet claiming a private (RFC 1918), loopback, link-local, or unallocated (bogon) source address must be dropped immediately.\n\n![Figure C02-M03-D2: BCP 38 Filtering & uRPF Anti-Spoofing Architecture](/assets/courses/cyber-02/c02_m3_l6_edge_antispoofing_architecture.jpg)\n\n*Figure C02-M03-D2: Enterprise edge perimeter security architecture demonstrating BCP 38 Ingress & Egress filtering and Unicast Reverse Path Forwarding (uRPF) dropping spoofed source IP packets.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **BCP 38 Directional Filtering and uRPF Validation:** At the perimeter *Edge Router*, *Ingress Filtering* drops public packets falsely claiming internal `RFC 1918` sources (`10.1.5.12`), *Egress Filtering* blocks non-routable internal spoofs (`192.168.99.5`) leaving the LAN, and *uRPF* checks every packet's source IP against the return routing table to drop asymmetric spoofs.\n\n---\n\n### 3. Rogue IPv6 Router Advertisements and RA Guard (RFC 6105)\nUnder IPv6 SLAAC, endpoints automatically trust incoming ICMPv6 Router Advertisement (RA) packets to configure their default gateways and DNS resolvers.\n- **The Attack Vector:** A rogue or compromised host attached to a corporate LAN transmits unsolicited ICMPv6 Router Advertisements, advertising itself as the primary IPv6 default router and recursive DNS server. Because modern operating systems prioritize IPv6 traffic over IPv4, all workstations immediately redirect their outbound web traffic through the attacker's machine, enabling full man-in-the-middle decryption and inspection.\n- **The Defense (RA Guard - RFC 6105):** Enterprise managed switches must enable **IPv6 RA Guard** on all access ports connecting to user workstations. The switch hardware inspects incoming frames; if an ICMPv6 Router Advertisement is received on any port not explicitly authorized as an uplink router port, the switch immediately drops the frame and generates a security alert.\n\n---\n\n## Real-World Case Studies\n\n### Case Study 1: The Global IPv4 Exhaustion Milestone (2011)\nOn February 1, 2011, IANA allocated the final unreserved IPv4 `/8` address blocks to APNIC, triggering global exhaustion protocols across all Regional Internet Registries.\n\n#### Operational & Forensic Consequences:\n1. **Proliferation of Carrier-Grade NAT (CGNAT):** Telecommunications carriers could no longer allocate unique public IPv4 addresses to residential broadband and mobile subscribers. Carriers deployed large-scale CGNAT (`100.64.0.0/10`), forcing tens of thousands of subscribers to share small pools of public IPv4 addresses.\n2. **Forensic Attribution Complications:** In digital criminal investigations, an external server log recording an offending IP address (e.g., `198.51.100.22`) is no longer sufficient to identify a perpetrator. Investigators must legally compel the ISP to produce internal NAT translation tables containing the exact source port and millisecond-accurate timestamp linking the connection to an individual subscriber line.\n3. **Regulatory Log Retention Mandates:** National cybersecurity agencies (such as CERT-In in India) instituted strict regulatory directives mandating that telecommunication carriers and enterprise proxy gateways retain complete, synchronized NAT translation logs for a minimum of 180 days to 1 year.\n\n---\n\n### Case Study 2: The /16 Subnet Typo (Orchid Payments)\n*Fictional Teaching Scenario*\n\nOrchid Payments, a cloud-hosted financial transaction gateway, was onboarding a new banking partner to settle real-time merchant payouts. The integration required opening an ingress firewall rule on the production API gateway allowing the partner's IP range to transmit JSON payment requests to internal financial database services.\n\n#### The Incident:\nThe banking partner provided their authorized server subnet: `203.0.113.64/27` (30 usable host addresses). The network administrator responsible for updating the cloud security group misread the documentation and committed the rule as:\n```text\nType: Inbound | Protocol: TCP | Port: 8443 | Source: 203.0.113.0/16 | Action: ALLOW\n```\nThe cloud management console automatically normalized the prefix to `203.0.0.0/16`, silently granting network access to 65,536 public IP addresses across an entire regional block.\n\n#### Discovery and Impact:\nFour weeks later, internal threat intelligence sensors flagged anomalous brute-force authentication traffic directed at the payment API from an external IP address (`203.0.45.19`) located in a different jurisdiction. Investigation revealed that an opportunistic scanning botnet had discovered the exposed port during a routine Internet sweep. While multi-factor authentication prevented credential bypass, the incident exposed proprietary API schemas and caused significant compliance review overhead.\n\n#### Architectural Lessons:\n- **Programmatic Prefix Validation:** Network change workflows must reject broad CIDR masks on high-risk internal endpoints.\n- **Least Privilege Network Access:** Access rules must be bounded to the exact minimum host count required.\n- **Automated Configuration Audits:** Continuous cloud security posture management (CSPM) tools must alert immediately whenever an ingress firewall rule wider than `/24` is bound to sensitive database or API infrastructure."
    }
  ]
};
