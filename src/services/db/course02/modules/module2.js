/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 2: Module 2: Layered Models and Encapsulation
 */

export const module2Data = {
  "id": "mod_c2_2",
  "title": "Module 2: Layered Models and Encapsulation",
  "description": "The OSI 7-layer reference model, TCP/IP 4-layer architecture, PDU encapsulation lifecycle, byte-by-byte hex frame dissection, and cross-layer attack surfaces.",
  "order": 2,
  "quiz": {
    "id": "quiz_mod_c2_2",
    "title": "Module 2 Assessment: Layered Architecture & Ethernet Framing",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c2_m2_001",
        "question": "Which layer of the OSI reference model is responsible for establishing, managing, and terminating communication dialogues between applications?",
        "options": [
          "Layer 5 (Session Layer)",
          "Layer 4 (Transport Layer)",
          "Layer 6 (Presentation Layer)",
          "Layer 3 (Network Layer)"
        ],
        "correct_index": 0,
        "explanation": "The Session Layer (Layer 5) establishes, coordinates, and terminates dialogues and exchanges between software applications on remote hosts."
      },
      {
        "id": "q_c2_m2_002",
        "question": "Which OSI layer performs data format translation, syntax conversion, character encoding (such as UTF-8 vs ASCII), and serialization?",
        "options": [
          "Layer 7 (Application)",
          "Layer 6 (Presentation)",
          "Layer 5 (Session)",
          "Layer 4 (Transport)"
        ],
        "correct_index": 1,
        "explanation": "The Presentation Layer (Layer 6) handles how data is represented, ensuring standard formatting, character encodings, and syntax transformation."
      },
      {
        "id": "q_c2_m2_003",
        "question": "What is the primary function of Layer 2 (Data Link Layer) in the OSI 7-layer architecture?",
        "options": [
          "Routing packets across autonomous internetworks using logical addresses",
          "Delivering frames between directly connected nodes on the same local link using physical MAC addresses",
          "Providing end-to-end socket multiplexing via TCP and UDP ports",
          "Converting application text strings into binary machine code"
        ],
        "correct_index": 1,
        "explanation": "Layer 2 delivers data frames between directly connected network interface cards (NICs) across a single physical link using Media Access Control (MAC) addresses."
      },
      {
        "id": "q_c2_m2_004",
        "question": "A network switch inspects incoming data to determine which physical port to forward a frame to. At which OSI layer does this operation occur?",
        "options": [
          "Layer 1 (Physical)",
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 4 (Transport)"
        ],
        "correct_index": 1,
        "explanation": "Standard network switches operate at Layer 2 (Data Link), reading the destination MAC address in the Ethernet frame header and matching it against their CAM table."
      },
      {
        "id": "q_c2_m2_005",
        "question": "At which OSI layer does a network router make path determination and packet forwarding decisions?",
        "options": [
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 4 (Transport)",
          "Layer 5 (Session)"
        ],
        "correct_index": 1,
        "explanation": "Routers operate at Layer 3 (Network), evaluating destination logical IP addresses and consulting routing tables to determine egress interfaces."
      },
      {
        "id": "q_c2_m2_006",
        "question": "Which layer of the OSI model provides process-to-process communication, connection tracking, and port-based multiplexing?",
        "options": [
          "Layer 3 (Network)",
          "Layer 4 (Transport)",
          "Layer 5 (Session)",
          "Layer 6 (Presentation)"
        ],
        "correct_index": 1,
        "explanation": "Layer 4 (Transport) provides host-to-host and process-to-process delivery, tracking connections and multiplexing conversations using 16-bit port numbers."
      },
      {
        "id": "q_c2_m2_007",
        "question": "In the context of the OSI model, what is the critical distinction between a software application (like Google Chrome) and Layer 7 (Application Layer)?",
        "options": [
          "There is no distinction; software applications are synonymous with Layer 7.",
          "Layer 7 refers to the network communication protocol (e.g. HTTP, DNS), not the software program that invokes it.",
          "Software applications operate at Layer 6, whereas network protocols operate at Layer 7.",
          "Layer 7 strictly defines physical hardware human interface devices like keyboards and mice."
        ],
        "correct_index": 1,
        "explanation": "Layer 7 defines the application communication protocol (such as HTTP, SMTP, or SSH) that provides network services, not the executable program itself."
      },
      {
        "id": "q_c2_m2_008",
        "question": "Which sublayer of the OSI Data Link layer (IEEE 802.2) provides flow control and multiplexing for multiple network layer protocols over a single physical link?",
        "options": [
          "Media Access Control (MAC)",
          "Logical Link Control (LLC)",
          "Physical Medium Dependent (PMD)",
          "Physical Coding Sublayer (PCS)"
        ],
        "correct_index": 1,
        "explanation": "IEEE 802 divides the Data Link layer into LLC (802.2), which handles protocol multiplexing and flow control, and MAC (802.3/802.11), which handles framing and media access."
      },
      {
        "id": "q_c2_m2_009",
        "question": "Which mnemonic represents the top-down sequence of the OSI model layers from Layer 7 down to Layer 1?",
        "options": [
          "Please Do Not Throw Sausage Pizza Away",
          "All People Seem To Need Data Processing",
          "Every Good Boy Does Fine Always",
          "Never Underestimate The Power Of Networking"
        ],
        "correct_index": 1,
        "explanation": "'All People Seem To Need Data Processing' maps to Application, Presentation, Session, Transport, Network, Data Link, Physical (Layers 7 down to 1)."
      },
      {
        "id": "q_c2_m2_010",
        "question": "Which mnemonic represents the bottom-up sequence of the OSI model layers from Layer 1 up to Layer 7?",
        "options": [
          "All People Seem To Need Data Processing",
          "Please Do Not Throw Sausage Pizza Away",
          "Programmers Do Not Take Silly Protocol Actions",
          "Packet Delivery Never Takes Simple Paths Anywhere"
        ],
        "correct_index": 1,
        "explanation": "'Please Do Not Throw Sausage Pizza Away' maps to Physical, Data Link, Network, Transport, Session, Presentation, Application (Layers 1 up to 7)."
      },
      {
        "id": "q_c2_m2_026",
        "question": "An enterprise security engineer audits an intrusion detection system (IDS) alert showing an attack exploiting ASN.1 parsing vulnerabilities inside a cryptographic certificate library. At which OSI layer does this vulnerability reside?",
        "options": [
          "Layer 7 (Application Layer)",
          "Layer 6 (Presentation Layer)",
          "Layer 5 (Session Layer)",
          "Layer 4 (Transport Layer)"
        ],
        "correct_index": 1,
        "explanation": "ASN.1 is an Abstract Syntax Notation standard governing data encoding and serialization, making ASN.1 parsing flaws classic Layer 6 (Presentation Layer) vulnerabilities."
      },
      {
        "id": "q_c2_m2_027",
        "question": "Why is it technically inaccurate to categorize Transport Layer Security (TLS) as residing purely in OSI Layer 4 or OSI Layer 7?",
        "options": [
          "TLS requires dedicated physical cryptographic coprocessors at Layer 1.",
          "TLS sits as a cryptographic shim on top of Layer 4 TCP transport while providing Presentation/Session services to Layer 7 protocols.",
          "TLS operates strictly at Layer 2 inside IEEE 802.1AE MACsec frames.",
          "TLS replaces the IPv4 header at Layer 3 with an encrypted routing tag."
        ],
        "correct_index": 1,
        "explanation": "TLS does not fit neatly into one OSI layer: it relies on Layer 4 TCP for reliable byte-stream transport while providing encryption, presentation formatting, and session negotiation to Layer 7 applications."
      },
      {
        "id": "q_c2_m2_028",
        "question": "A multi-layer core switch is configured with Access Control Lists (ACLs) that filter traffic based on source IP, destination IP, and TCP destination port. Up to which OSI layer is this switch processing traffic for filtering purposes?",
        "options": [
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 4 (Transport)",
          "Layer 7 (Application)"
        ],
        "correct_index": 2,
        "explanation": "Because the ACL evaluates IP addresses (Layer 3) and TCP port numbers (Layer 4), the switch inspects headers up to Layer 4."
      },
      {
        "id": "q_c2_m2_029",
        "question": "During an incident investigation, a forensic analyst observes that an adversary bypassed a perimeter firewall by encoding directory traversal characters as double URL encoding (%252e%252e%252f). Which layer's interpretation mechanics were exploited?",
        "options": [
          "Layer 4 (Transport Layer)",
          "Layer 6 (Presentation Layer)",
          "Layer 3 (Network Layer)",
          "Layer 2 (Data Link Layer)"
        ],
        "correct_index": 1,
        "explanation": "Character normalization and URL decoding represent presentation-layer syntax transformations (Layer 6); when intermediate inspection devices decode once but backend applications decode twice, evasion occurs."
      },
      {
        "id": "q_c2_m2_030",
        "question": "How does peer-to-peer layer communication differ fundamentally from the actual physical path that electrical signals traverse during transmission?",
        "options": [
          "Peer layers physically exchange packets directly through dedicated radio beams, bypassing intermediate devices.",
          "Peer layers communicate logically using their layer protocol, but data must physically travel down the sender's stack to Layer 1, across the physical medium, and up the receiver's stack.",
          "Peer layer communication occurs only when both hosts belong to the same local broadcast domain.",
          "Peer communication requires routers to reassemble all seven layers at every intermediate hop."
        ],
        "correct_index": 1,
        "explanation": "Logical peer communication means Layer 4 on Host A talks logically to Layer 4 on Host B via TCP headers, but physically data must flow down Host A's stack, across Layer 1 links, through intermediate devices, and up Host B's stack."
      },
      {
        "id": "q_c2_m2_031",
        "question": "Which OSI layer boundary is crossed when a modern Layer 3 switch performs Inter-VLAN routing?",
        "options": [
          "It operates exclusively at Layer 1 by bridging copper cables.",
          "It moves frames between Layer 2 broadcast domains (VLANs) by inspecting and routing Layer 3 IP packets.",
          "It translates Layer 6 character encodings between different operating systems.",
          "It proxies Layer 7 HTTP requests between client browsers and web caches."
        ],
        "correct_index": 1,
        "explanation": "Inter-VLAN routing terminates Layer 2 broadcast frames on a virtual interface (SVI), inspects the Layer 3 destination IP, and routes the packet into a different Layer 2 VLAN."
      },
      {
        "id": "q_c2_m2_032",
        "question": "A security engineer analyzes an exploit that injects a TCP RST packet with a forged sequence number to terminate an active BGP peering session. Which OSI layers are directly involved in the construction and consequence of this attack?",
        "options": [
          "Layer 1 physical link noise causing Layer 2 frame drops",
          "Layer 4 TCP reset injection terminating a Layer 3/7 BGP routing dialogue",
          "Layer 6 character encoding corruption crashing Layer 7 web servers",
          "Layer 2 MAC spoofing causing Layer 1 optical transceiver failure"
        ],
        "correct_index": 1,
        "explanation": "The attacker injects a forged Layer 4 TCP segment (RST flag) to tear down the transport connection, collapsing the Layer 7/Layer 3 BGP routing session."
      },
      {
        "id": "q_c2_m2_033",
        "question": "In an industrial control network, an engineer discovers that PLCs communicate over Modbus TCP. A stateful firewall permits TCP port 502, but an attacker transmits a malicious 'Force Multiple Coils' function code that causes physical damage. What cross-layer architectural flaw is demonstrated?",
        "options": [
          "The firewall operated at Layer 4 and permitted the port, but lacked Layer 7 industrial deep packet inspection to validate application function codes.",
          "The switch failed to verify the physical copper impedance at Layer 1.",
          "The router corrupted the Layer 2 Ethernet CRC checksum.",
          "The PLC failed to negotiate a Layer 5 RPC session token."
        ],
        "correct_index": 0,
        "explanation": "A Layer 4 firewall allows TCP port 502 traffic unconditionally without evaluating whether the Layer 7 Modbus payload contains dangerous unauthorized operational commands."
      },
      {
        "id": "q_c2_m2_034",
        "question": "Why do intermediate Layer 2 switches typically refrain from inspecting or verifying Layer 3 IP header checksums?",
        "options": [
          "Switches lack central processing units (CPUs).",
          "Layer 2 switches are engineered in hardware (ASICs) to forward frames based strictly on Layer 2 MAC addresses, avoiding the latency and processing overhead of parsing higher-layer headers.",
          "IP header checksums are encrypted by default.",
          "Ethernet frames do not contain IP packets."
        ],
        "correct_index": 1,
        "explanation": "Switches forward frames at line rate using specialized hardware (ASICs) that inspects only Layer 2 MAC headers; parsing Layer 3 headers would add unnecessary latency and violate layer separation."
      },
      {
        "id": "q_c2_m2_035",
        "question": "Which OSI layer is responsible for determining the maximum size of application data that can be transmitted without fragmentation across an end-to-end path (Path MTU)?",
        "options": [
          "Layer 2 negotiation via ARP",
          "Layer 3 cooperation using ICMP Fragmentation Needed feedback combined with Layer 4 TCP MSS clamping",
          "Layer 6 XML schema negotiation",
          "Layer 1 cable impedance measurement"
        ],
        "correct_index": 1,
        "explanation": "Path MTU Discovery relies on Layer 3 IP DF flags and ICMP Type 3 Code 4 messages, coordinating with Layer 4 TCP MSS calculations."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c2_m2_l1",
      "title": "2.1 Why Layering: Modularity, Peer Communication & Architectural Trade-offs",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Understand the engineering imperative of layered protocol architectures. Explore peer-to-peer logical communication, modularity benefits, fault isolation, and the realities where real protocols diverge from clean abstractions.",
      "learning_objectives": [
        "Explain the engineering rationale behind dividing network communications into stacked functional layers.",
        "Differentiate logical peer-to-peer layer communication from physical down-and-up packet traversal.",
        "Analyze the modularity, interoperability, and troubleshooting benefits of layered protocol design.",
        "Identify protocol realities that cross or defy layer boundaries, including TLS, ARP, and QUIC."
      ],
      "images": [
        {
          "id": "img_c2_m2_d1",
          "title": "Figure C02-M02-D1: Peer-to-Peer Virtual Dialogue & Layered Traversal",
          "url": "/assets/courses/cyber-02/c02_m2_l1_peer_communication_flow.jpg",
          "caption": "Figure C02-M02-D1: Layered protocol communication architecture demonstrating vertical encapsulation/decapsulation traversal through the local stack and horizontal logical peer-to-peer protocol dialogue across physical media.",
          "alt": "Diagram showing peer-to-peer virtual dialogue between Host A and Host B with encapsulation and decapsulation"
        }
      ],
      "content": "## The Engineering Imperative of Layered Protocols\n\nWhen a user opens a web browser and navigates to a secure banking portal, dozens of complex, disparate technological problems must be solved simultaneously in milliseconds:\n- Resolving a human-readable domain name into a routable 32-bit or 128-bit numerical address.\n- Establishing an encrypted session key using asymmetric public-key cryptography.\n- Partitioning a continuous stream of financial records into discrete segments.\n- Tracking sequence numbers, packet acknowledgements, and retransmitting lost chunks.\n- Computing optimal routing paths across dozens of transit networks and autonomous systems.\n- Modulating digital binary bits into high-frequency electromagnetic radio waves or light pulses across fiber cables.\n\nIf a single monolithic program attempted to handle all of these tasks directly, software development would collapse under unmanageable complexity. A change in physical hardware (such as upgrading from Wi-Fi 6 to 10-Gigabit Ethernet) would require rewriting the entire web browser and web server application logic.\n\nNetwork architects solved this crisis by establishing **layered architectures**. A layered model divides network communication into stacked, modular functions. Each layer:\n1. **Solves one well-defined set of problems.**\n2. **Offers standardized services to the layer directly above it.**\n3. **Relies exclusively on the services provided by the layer directly below it.**\n4. **Communicates logically with its corresponding peer layer on the remote host** using that layer's standardized protocol rules.\n\n![Figure C02-M02-D1: Peer-to-Peer Virtual Dialogue & Layered Traversal](/assets/courses/cyber-02/c02_m2_l1_peer_communication_flow.jpg)\n\n*Figure C02-M02-D1: Layered protocol communication architecture demonstrating vertical encapsulation/decapsulation traversal through the local stack and horizontal logical peer-to-peer protocol dialogue across physical media.*\n\n---\n\n## Core Operational Benefits of Layering\n\n### 1. Modularity & Independent Evolution\nLayering isolates technological churn. The link layer can transition from 10BASE-T copper hubs to 100 Gbps single-mode fiber optic lasers without altering a single line of code in the TCP stack or HTTP web applications. Similarly, an application can adopt HTTP/3 without redesigning the local network switch fabric.\n\n### 2. Universal Vendor Interoperability\nBy publishing formal open standards for each layer interface (such as IETF RFCs and IEEE 802 specifications), hardware and software from competing vendors seamlessly interoperate. An Apple iPhone running Safari on an 802.11ax Wi-Fi network communicates effortlessly with a Debian Linux server running Nginx hosted in an AWS cloud data center.\n\n### 3. Systematic Troubleshooting\nLayering provides engineers and cybersecurity incident responders with a structured diagnostic framework. When a network outage or security alert occurs, responders can systematically isolate the root cause to a specific layer:\n- *Is the physical link disconnected or experiencing high bit errors?* (**Layer 1**)\n- *Are switch ports flapping or suffering MAC table overflow?* (**Layer 2**)\n- *Is the default gateway unreachable or the routing table missing a subnet?* (**Layer 3**)\n- *Is the TCP port blocked by an access control list or connection table exhaustion?* (**Layer 4**)\n- *Is the SSL certificate expired, or is the application crashing on malformed JSON?* (**Layer 7**)\n\n### 4. Common Security & Architectural Vocabulary\nIn security operations, professionals categorize threats, monitoring sensors, and mitigation controls by layer numbers:\n- A *\"Layer 2 attack\"* refers to local broadcast domain exploits such as ARP cache poisoning or CAM table flooding.\n- A *\"Layer 3/4 volumetric DDoS\"* targets network bandwidth saturation via SYN floods or UDP amplification.\n- A *\"Layer 7 Firewall (WAF)\"* inspects HTTP headers, cookies, and SQL syntax to block web application exploits.\n\n---\n\n## Architectural Limitations: Maps vs. Territory\n\nWhile layered models are indispensable conceptual tools, real-world protocols do not always fit neatly into rigid theoretical strata. Security engineers must recognize where reality diverges from the textbook model:\n\n1. **Transport Layer Security (TLS):** Classic models place encryption at Layer 6 (Presentation). However, TLS operates on top of Layer 4 TCP sockets while presenting a secure socket interface to Layer 7 application protocols. In practice, TLS functions as a hybrid security shim.\n2. **Address Resolution Protocol (ARP):** ARP resolves Layer 3 IP addresses to Layer 2 MAC addresses. It is encapsulated directly within Ethernet frames (EtherType `0x0806`) without an IP header, effectively bridging the Link and Network layers.\n3. **QUIC (RFC 9000):** Traditional architectures separate transport (TCP) from application logic. QUIC implements connection-oriented transport, multiplexed streams, loss recovery, and mandatory TLS 1.3 encryption entirely in user-space on top of connectionless UDP datagrams.\n4. **Cross-Layer Security Vulnerabilities:** Attackers routinely exploit blind spots between layers. A stateful firewall configured to permit outbound TCP port 443 operates at Layer 4; it cannot observe that an attacker inside the network is using that allowed port to tunnel malicious command-and-control payloads or exfiltrate unencrypted files."
    },
    {
      "id": "les_c2_m2_l2",
      "title": "2.2 The OSI 7-Layer Reference Model (ISO/IEC 7498-1)",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Master the seven layers of the ISO/IEC 7498-1 Open Systems Interconnection model. Examine each layer's role, protocols, hardware devices, threat vectors, and what intermediate devices inspect.",
      "learning_objectives": [
        "Detail the history and structural composition of the ISO/IEC 7498-1 reference model.",
        "Analyze the specific operational functions, protocols, and security threats across all seven layers.",
        "Utilize universal memory mnemonics for top-down and bottom-up layer sequences.",
        "Determine which layers are processed by end hosts, switches, routers, and application firewalls."
      ],
      "images": [
        {
          "id": "img_c2_m2_d2",
          "title": "Figure C02-M02-D2: OSI 7-Layer Reference Model",
          "url": "/assets/courses/cyber-02/c02_m2_l2_osi_7_layer_model.jpg",
          "caption": "Figure C02-M02-D2: Comprehensive architectural blueprint of the ISO/IEC 7498-1 OSI 7-Layer Reference Model detailing layer functions, protocol standards, PDU classifications, and cybersecurity threat profiles.",
          "alt": "Diagram of the OSI 7-Layer Reference Model showing protocols, functions, and PDUs"
        }
      ],
      "content": "## The 7-Layer OSI Reference Architecture (ISO/IEC 7498-1)\n\nPublished in 1984 by the International Organization for Standardization (ISO) and the International Telecommunication Union (ITU-T), the **Open Systems Interconnection (OSI) Basic Reference Model** (standardized as **ISO/IEC 7498-1**) established a seven-layer model for computer network communication.\n\nAlthough the proprietary OSI protocol stack (such as CLNP, TP4, and FTAM) was superseded in commercial adoption by the pragmatic, open TCP/IP suite, the **OSI 7-layer nomenclature remains the universal language of computer networking and cybersecurity**.\n\n![Figure C02-M02-D2: OSI 7-Layer Reference Model](/assets/courses/cyber-02/c02_m2_l2_osi_7_layer_model.jpg)\n\n*Figure C02-M02-D2: Comprehensive architectural blueprint of the ISO/IEC 7498-1 OSI 7-Layer Reference Model detailing layer functions, protocol standards, PDU classifications, and cybersecurity threat profiles.*\n\n---\n\n## Detailed Breakdown of the Seven Layers\n\n### Layer 7: Application Layer\nThe Application Layer provides communication interfaces and services directly to software applications executing on an endpoint. \n- **Critical Distinction:** The Application Layer refers to the **network communication protocol**, not the software application itself. For example, Google Chrome is a software program, whereas HTTP/1.1, HTTP/2, and HTTP/3 are the Application Layer protocols it implements.\n- **Representative Protocols:** HTTP, HTTPS, DNS, SMTP, IMAP, SSH, FTP, Telnet, SNMP, BGP.\n- **Cybersecurity Attack Surface:** Web application attacks (SQL Injection, Cross-Site Scripting, Command Injection), malicious DNS query tunneling, email spear-phishing payloads, API authentication bypass, and Layer 7 HTTP flood denial-of-service.\n\n### Layer 6: Presentation Layer\nThe Presentation Layer ensures that data transmitted from the application layer of one system is readable by the application layer of another. It governs data formatting, character set translation, syntax transformation, and cryptographic compression.\n- **Representative Formats & Standards:** ASCII, UTF-8, JSON, XML, ASN.1, MIME, JPEG, TLS presentation shims.\n- **Cybersecurity Attack Surface:** Data deserialization vulnerabilities, XML External Entity (XXE) injection, character encoding bypass attacks (such as double URL encoding `%252f` to evade web filters), and parsing buffer overflows in image/document libraries.\n\n### Layer 5: Session Layer\nThe Session Layer is responsible for establishing, managing, synchronizing, and terminating communication dialogues (sessions) between remote applications. It handles half-duplex or full-duplex session tokens and checkpointing.\n- **Representative Implementations:** RPC (Remote Procedure Call), SMB (Server Message Block), NetBIOS, AppleTalk ASP. (In modern TCP/IP applications, session state is primarily managed within Layer 7 applications via HTTP session cookies or WebSockets).\n- **Cybersecurity Attack Surface:** Session hijacking, cookie theft, session fixation, SMB relay attacks, and session token prediction.\n\n### Layer 4: Transport Layer\nThe Transport Layer provides end-to-end, host-to-host communication management between running software processes. It introduces **port numbers** (ranging from 0 to 65,535) to multiplex multiple network conversations onto a single IP address.\n- **Connection Modes:**\n  - **Connection-Oriented (TCP):** Enforces reliable delivery via 3-way handshakes, sequence numbers, acknowledgements, flow control (sliding window), and congestion avoidance algorithms.\n  - **Connectionless (UDP):** Provides lightweight, low-latency, best-effort datagram delivery with zero handshake or delivery guarantee.\n- **Cybersecurity Attack Surface:** TCP SYN flood denial-of-service, TCP reset injection, port scanning reconnaissance (SYN stealth scans, FIN scans), UDP reflection/amplification floods.\n\n### Layer 3: Network Layer\nThe Network Layer handles logical host addressing and the routing of packets across heterogeneous, interconnected network boundaries. Routers examine Layer 3 headers to build routing tables and determine optimal next-hop paths.\n- **Representative Protocols:** IPv4 (RFC 791), IPv6 (RFC 8200), ICMP (Internet Control Message Protocol), IPsec (AH/ESP).\n- **Hardware Devices:** Routers, Layer 3 multi-layer switches.\n- **Cybersecurity Attack Surface:** IP address spoofing, ICMP redirect attacks, ICMP echo floods, BGP route hijacking, IP fragmentation attacks (Teardrop).\n\n### Layer 2: Data Link Layer\nThe Data Link Layer governs the reliable transfer of data frames across a single physical link between directly connected nodes within the same local broadcast domain. It uses **Media Access Control (MAC) addresses**.\n- **Sublayer Division:**\n  - **Logical Link Control (LLC - IEEE 802.2):** Manages link multiplexing and flow control.\n  - **Media Access Control (MAC - IEEE 802.3/802.11):** Enforces physical addressing and media access arbitration (CSMA/CD on legacy Ethernet; CSMA/CA on Wi-Fi).\n- **Hardware Devices:** Layer 2 managed switches, wireless access points, network interface cards (NICs).\n- **Cybersecurity Attack Surface:** ARP cache poisoning / spoofing, CAM table MAC flooding, 802.1Q VLAN hopping (double tagging), rogue DHCP servers, Wi-Fi deauthentication attacks.\n\n### Layer 1: Physical Layer\nThe Physical Layer defines the electrical, optical, mechanical, and timing specifications for transmitting raw, unstructured bitstreams over physical transmission channels.\n- **Representative Media:** Cat5e/6/6A copper cabling, single-mode/multi-mode fiber optics, radio frequency spectrum, physical connectors (RJ-45, LC, SC).\n- **Hardware Devices:** Hubs, repeaters, media converters, transceivers (SFP/SFP+).\n- **Cybersecurity Attack Surface:** Physical wiretapping, optical fiber micro-bending interception, radio frequency jamming, unauthorized hardware keystroke loggers, cutting physical cable runs.\n\n---\n\n## Universal Memory Mnemonics\n\nTo recall the seven layers in sequence during certification exams and incident triage:\n\n- **Top-Down (Layer 7 down to Layer 1):**\n  - **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing\n  - *(Application, Presentation, Session, Transport, Network, Data Link, Physical)*\n- **Bottom-Up (Layer 1 up to Layer 7):**\n  - **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way\n  - *(Physical, Data Link, Network, Transport, Session, Presentation, Application)*\n\n---\n\n## What Each Network Device Examines\n\nIntermediate network devices do not inspect every layer; they process only the minimum layers required to fulfill their forwarding or security role:\n\n```\nINTERMEDIATE DEVICE PROCESSING DEPTH\n[ Host A: Full Stack L1-L7 ]\n     │ (Physical bits)\n     ▼\n[ Layer 2 Switch ] ──────> Inspects L1 & L2 (Dest MAC) to forward frame\n     │ (Physical bits)\n     ▼\n[ Layer 3 Router ] ──────> Inspects L1, L2 & L3 (Dest IP, TTL, Checksum); rewrites L2\n     │ (Physical bits)\n     ▼\n[ Stateful Firewall ] ───> Inspects L1-L4 (IPs, Ports, TCP Connection State Flags)\n     │ (Physical bits)\n     ▼\n[ WAF / Proxy / Host B ] ─> Inspects L1-L7 (Reassembles TCP, inspects HTTP payload)\n```\n\n- **Layer 2 Switch:** Operates at Layers 1 and 2. It reads the destination MAC address to forward frames out the correct physical port. It does not alter the IP header or inspect port numbers.\n- **Layer 3 Router:** Operates at Layers 1, 2, and 3. It strips the incoming Layer 2 frame, inspects the destination IP address, decrements the TTL, recalculates the IP checksum, looks up the egress route, and encapsulates the packet in a brand new Layer 2 frame.\n- **Stateful Network Firewall:** Operates at Layers 1 through 4. It inspects IP addresses, port numbers, and TCP state flags (SYN, ACK, FIN) against an internal state table.\n- **Web Application Firewall (WAF) & End Hosts:** Operate across all seven layers. They fully reassemble TCP streams, terminate TLS encryption, and inspect application payloads (Layer 7 HTTP headers, URIs, and request bodies)."
    },
    {
      "id": "les_c2_m2_l3",
      "title": "2.3 The TCP/IP 4-Layer Architecture (RFC 1122) & Cross-Model Synthesis",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Examine the practical internet protocol suite governed by RFC 1122. Compare the 4-layer TCP/IP architecture, the 5-layer hybrid teaching model, and the 7-layer OSI model across protocol boundaries.",
      "learning_objectives": [
        "Explain the historical origin and design philosophy of the DARPA/IETF TCP/IP suite.",
        "Map the 4 TCP/IP layers to their corresponding OSI layers.",
        "Analyze the modern 5-layer hybrid engineering model and its advantages.",
        "Synthesize when to utilize OSI layer terminology versus TCP/IP implementation realities."
      ],
      "images": [
        {
          "id": "fig_c02_m02_f1",
          "title": "Figure C02-M02-F1: OSI and TCP/IP Models Side by Side",
          "url": "/assets/courses/cyber-02/C02-M02-F1.png",
          "caption": "Figure C02-M02-F1: Architectural mapping of the OSI 7-layer reference model to the TCP/IP 4-layer suite with representative protocols and defensive attack surfaces.",
          "alt": "OSI and TCP/IP models side by side architectural comparison"
        }
      ],
      "content": "## The TCP/IP Internet Architecture (RFC 1122)\n\n![Figure C02-M02-F1: OSI and TCP/IP Models Side by Side](/assets/courses/cyber-02/C02-M02-F1.png)\n\n*Figure C02-M02-F1: Direct architectural mapping between OSI 7-layer reference model and TCP/IP 4-layer suite with representative protocols.*\n\n\nWhile the OSI reference model was formulated by international committees as a formal theoretical architecture, the **TCP/IP model** (also known as the **Internet Architecture Model**) was engineered through practical, empirical implementation sponsored by the US Defense Advanced Research Projects Agency (DARPA) and standardized by the **Internet Engineering Task Force (IETF)**.\n\nStandardized in October 1989 in **RFC 1122 (\"Requirements for Internet Hosts — Communication Layers\")**, the classic TCP/IP protocol suite defines four functional layers:\n\n| Table: RFC 1122 TCP/IP 4-Layer Suite |\n| :--- | :--- |\n| TCP/IP Layer | Protocol Examples |\n| 4. Application | HTTP, DNS, SMTP, SSH, TLS, NTP, DHCP, BGP |\n| 3. Transport | TCP (RFC 9293), UDP (RFC 768), QUIC (RFC 9000) |\n| 2. Internet | IPv4 (RFC 791), IPv6 (RFC 8200), ICMP, IPsec |\n| 1. Link (Network Access) | Ethernet (802.3), Wi-Fi (802.11), ARP, Hardware Drivers |\n\n---\n\n## Detailed Examination of the Four TCP/IP Layers\n\n### 1. Application Layer\nIn the TCP/IP architecture, the Application Layer consolidates all higher-level application logic. It incorporates the user-facing protocol (OSI Layer 7), data formatting, character encodings, and encryption (OSI Layer 6), and session dialogues (OSI Layer 5). Protocols running at this layer include HTTP for web delivery, DNS for name resolution, SMTP/IMAP for electronic mail, and SSH for secure terminal access. Applications directly manage their own data serialization (JSON, XML) and session tokens.\n\n### 2. Transport Layer\nThe Transport Layer provides end-to-end communication channels between host application processes. It provides process-level addressing via 16-bit **port numbers**. The two primary protocols are:\n- **TCP (Transmission Control Protocol - RFC 9293):** Connection-oriented, reliable byte stream delivery with sequencing, error retransmission, flow control, and congestion mitigation.\n- **UDP (User Datagram Protocol - RFC 768):** Connectionless, lightweight datagram service with minimal header overhead and no delivery guarantee.\n\n### 3. Internet Layer\nThe Internet Layer corresponds directly to OSI Layer 3. Its purpose is to deliver packets from source host to destination host across interconnected networks. It handles logical IP addressing, packet formatting, fragmentation/reassembly, and routing path determination.\n- **Key Protocols:** IPv4, IPv6, ICMP (operational reporting and ping diagnostics), and IGMP (multicast group management).\n\n### 4. Link Layer (Network Interface / Network Access)\nThe Link Layer encompasses the protocols and hardware required to deliver packets across local physical media within a single network segment. It combines the functions of OSI Layer 1 (Physical) and OSI Layer 2 (Data Link). It defines frame formats, MAC addressing, channel access mechanisms, and electrical/optical signaling.\n\n---\n\n## Synthesis: OSI vs. TCP/IP vs. The 5-Layer Hybrid Model\n\nBecause the 4-layer TCP/IP model bundles the physical transmission media and data framing into a single \"Link\" layer, modern network engineering textbooks and university computer science curricula commonly adopt a **5-Layer Hybrid Architecture**:\n\n| Table: Architectural Synthesis & Protocol Mapping |\n| :---: | :--- | :--- | :--- | :--- |\n| OSI # | OSI 7-Layer Model | TCP/IP 4-Layer Suite | 5-Layer Hybrid Model | Representative Standards |\n| 7 | Application | Application | Application | HTTP/3, DNS, SSH, SMTP |\n| 6 | Presentation | Application | Application | TLS 1.3, JSON, UTF-8 |\n| 5 | Session | Application | Application | Sockets, Session Cookies |\n| 4 | Transport | Transport | Transport | TCP, UDP, QUIC |\n| 3 | Network | Internet | Network | IPv4, IPv6, ICMP, IPsec |\n| 2 | Data Link | Link (Network Access) | Data Link | Ethernet (802.3), Wi-Fi (802.11) |\n| 1 | Physical | Link (Network Access) | Physical | Cat6A, Single-Mode Fiber, RF |\n\n### Protocol Nuances & Edge Cases:\n- **Transport Layer Security (TLS):** Often described as sitting \"between\" Transport and Application. It secures raw application data over a reliable TCP socket before transmission.\n- **Address Resolution Protocol (ARP):** Translates Layer 3 IP addresses to Layer 2 MAC addresses. It has no IP header and operates directly inside Layer 2 Ethernet frames; in TCP/IP it is classified as a Link Layer maintenance protocol.\n- **Internet Control Message Protocol (ICMP):** Encapsulated directly within IPv4 packets (Protocol `1`), yet functions as a diagnostic and error-reporting companion to the Internet layer rather than a user transport service.\n\n---\n\n## When to Use Which Model in Practice\n\n| Context | Recommended Model | Rationale |\n| :--- | :--- | :--- |\n| **Professional Technical Jargon** | **OSI Model Numbers** | Universal industry baseline: saying \"Layer 4 firewall\", \"Layer 7 inspection\", or \"Layer 2 loop\" is instantly and unambiguously understood across all vendors. |\n| **Protocol Implementation & Analysis** | **TCP/IP Model** | Accurately describes the actual byte structures and software drivers operating on hosts and routers in production. |\n| **Software Development & API Engineering** | **5-Layer Hybrid Model** | Clearly separates physical hardware link constraints from Ethernet/Wi-Fi frame drivers and transport sockets. |"
    },
    {
      "id": "les_c2_m2_l4",
      "title": "2.4 Encapsulation, Decapsulation, Protocol Data Units (PDUs) & Hop Dynamics",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Trace the lifecycle of data transmission from application bytes to electrical bits. Master PDU naming conventions, demultiplexing headers, hop-by-hop header mutations, and MTU/MSS constraints.",
      "learning_objectives": [
        "Utilize accurate Protocol Data Unit (PDU) terms: frames, packets, segments, and messages.",
        "Map the step-by-step encapsulation and decapsulation processes across sending and receiving hosts.",
        "Analyze demultiplexing fields: EtherType values, IP Protocol numbers, and Transport Port numbers.",
        "Explain what header fields mutate hop-by-hop across intermediate routers versus end-to-end constants.",
        "Calculate protocol header overhead, MTU boundaries, and TCP Maximum Segment Size (MSS)."
      ],
      "images": [
        {
          "id": "fig_c02_m02_f2",
          "title": "Figure C02-M02-F2: Encapsulation of an HTTP Request",
          "url": "/assets/courses/cyber-02/C02-M02-F2.png",
          "caption": "Figure C02-M02-F2: Step-by-step encapsulation of an application layer HTTP GET request through transport, network, and data link headers down to physical bit transmission.",
          "alt": "Encapsulation of an HTTP request showing headers added at each layer"
        },
        {
          "id": "img_c2_m2_d3",
          "title": "Figure C02-M02-D3: PDU Encapsulation Process Pipeline",
          "url": "/assets/courses/cyber-02/c02_m2_l4_pdu_encapsulation_pipeline.jpg",
          "caption": "Figure C02-M02-D3: Step-by-step Protocol Data Unit (PDU) encapsulation pipeline showing how application payload data is prepended with transport and network headers and enclosed within data link frame headers and FCS CRC trailers.",
          "alt": "Diagram of PDU encapsulation process pipeline across all layers"
        }
      ],
      "content": "## The Encapsulation Lifecycle: How Data Traverses the Stack\n\n![Figure C02-M02-F2: Encapsulation of an HTTP Request](/assets/courses/cyber-02/C02-M02-F2.png)\n\n*Figure C02-M02-F2: Step-by-step encapsulation of an application layer HTTP GET request through transport, network, and data link headers down to physical bit transmission.*\n\n\nCommunication across a packet-switched network depends upon **encapsulation** on the sending host and **decapsulation** on the receiving host. Each layer of the protocol stack packages the data received from the layer above by prepending a standardized **header** (and in some cases appending a trailing **trailer**) containing control metadata.\n\n| Table: Protocol Data Unit (PDU) Hierarchy |\n| :--- | :--- | :--- |\n| Protocol Layer | Formal PDU Name | Architectural Composition |\n| 7. Application | Message / Data | Application Payload (HTTP, DNS query, TLS record) |\n| 4. Transport | Segment (TCP) / Datagram (UDP) | Transport Header + Application Data Payload |\n| 3. Network | Packet / Datagram | IP Header + Transport Header + Data Payload |\n| 2. Data Link | Frame | Ethernet Header + IP Packet + FCS Trailer |\n| 1. Physical | Bits / Symbols | Stream of 0s and 1s on wire / optical pulses / radio waves |\n\n> [!TIP]\n> **Engineering Precision with PDU Vocabulary:**\n> Professional engineers and cybersecurity forensicators distinguish PDUs with extreme precision. Saying \"the switch dropped the packet\" is technically imprecise; switches drop *frames*. Routers forward *packets*. Firewalls reset TCP *segments*.\n\n---\n\n## Step-by-Step Encapsulation (Transmission Flow)\n\nWhen an endpoint sends a web request (`GET / HTTP/1.1`):\n\n![Figure C02-M02-D3: PDU Encapsulation Process Pipeline](/assets/courses/cyber-02/c02_m2_l4_pdu_encapsulation_pipeline.jpg)\n\n*Figure C02-M02-D3: Step-by-step Protocol Data Unit (PDU) encapsulation pipeline showing how application payload data is prepended with transport and network headers and enclosed within data link frame headers and FCS CRC trailers.*\n\n1. **Application Layer:** The web browser constructs an HTTP request string (e.g. 80 bytes of text specifying the URI, Host, and User-Agent headers).\n2. **Transport Layer:** The operating system socket assigns an ephemeral source port (e.g., `44460`) and destination port (`8080` or `443`). It attaches a **TCP header** containing sequence numbers, acknowledgement numbers, window sizes, and flags. The result is a **TCP Segment**.\n3. **Network (Internet) Layer:** The kernel prepends an **IPv4 header** containing the host source IP (`172.30.0.20`), destination IP (`172.30.0.10`), Time-To-Live (`64`), and Protocol identifier (`6` for TCP). The result is an **IP Packet** (132 bytes).\n4. **Data Link Layer:** The network interface card (NIC) prepends an **Ethernet II header** containing the destination MAC address (the gateway router or local server), the host's source MAC address, and an **EtherType identifier** (`0x0800` indicating IPv4). At the physical tail, it appends a 4-byte **Frame Check Sequence (FCS)** containing a CRC-32 checksum. The result is an **Ethernet Frame** (150 bytes total on wire).\n5. **Physical Layer:** The physical transceiver converts the digital frame into physical signal transitions (electrical voltages, laser pulses, or radio waves) transmitted across the transmission link.\n\n---\n\n## Step-by-Step Decapsulation & Demultiplexing Keys\n\nWhen the receiving host's network card receives the electrical bits, it executes **decapsulation** in reverse. At each stage, the protocol header contains a standardized **demultiplexing key** that instructs the operating system which specific protocol handler must receive the payload:\n\n```\nDEMULTIPLEXING KEYS IN THE PROTOCOL STACK\nEthernet Frame ───[ EtherType: 0x0800 ]───► IPv4 Layer\nIPv4 Packet    ───[ Protocol: 0x06 ]──────► TCP Layer\nTCP Segment    ───[ Dest Port: 8080 ]─────► Web Server Process (Nginx/Node)\n```\n\n1. **NIC Layer 1 & 2 Processing:** The NIC checks the frame's CRC-32 checksum against the FCS trailer. If corrupted, the frame is silently dropped. If valid, the NIC verifies the Destination MAC matches its hardware address or broadcast. It strips the Ethernet header.\n2. **Demultiplexing via EtherType:** The link layer inspects the 2-byte EtherType field:\n   - `0x0800` ➔ Hand payload to the **IPv4 protocol engine**.\n   - `0x86DD` ➔ Hand payload to the **IPv6 protocol engine**.\n   - `0x0806` ➔ Hand payload to the **ARP handler**.\n3. **Demultiplexing via IP Protocol Number:** The IP layer checks that the destination IP matches its local interface, validates the IP header checksum, and reads the 8-bit **Protocol field**:\n   - `1` ➔ Deliver to **ICMP handler**.\n   - `6` ➔ Deliver to **TCP engine**.\n   - `17` ➔ Deliver to **UDP engine**.\n4. **Demultiplexing via Port Number:** The TCP engine verifies sequence numbers, processes flags, and inspects the 16-bit **Destination Port** field (`8080`). It locates the active operating system socket bound to port `8080` and delivers the raw HTTP payload directly to the user-space web server daemon.\n\n---\n\n## Hop-by-Hop Header Dynamics Across Routers\n\nA critical concept in network architecture and network forensics is understanding what changes as a packet traverses intermediate routers versus what remains constant:\n\n| Table: Hop-by-Hop Header Mutation Matrix |\n| :--- | :---: | :--- |\n| Header Field | Mutates Per Hop? | Reason / Operational Function |\n| Layer 2 Destination MAC Address | YES (Every Hop) | Rewritten to next router/gateway MAC |\n| Layer 2 Source MAC Address | YES (Every Hop) | Rewritten to egress router interface MAC |\n| Layer 2 Frame Check Sequence (FCS) | YES (Every Hop) | Recalculated over the freshly mutated L2 frame |\n| Layer 3 Time-To-Live (TTL / HopLimit) | YES (Every Hop) | Decremented by 1 per routing hop to prevent loops |\n| Layer 3 IPv4 Header Checksum | YES (Every Hop) | Recalculated due to TTL decrement |\n| Layer 3 Source IP Address | NO (Without NAT) | Preserved end-to-end between communicating hosts |\n| Layer 3 Destination IP Address | NO (Without NAT) | Preserved end-to-end between communicating hosts |\n| Layer 4 Source & Destination Ports | NO (Without NAT) | Preserved end-to-end to identify application processes |\n| Layer 4 TCP Sequence Numbers | NO | Preserved end-to-end for stream reassembly |\n| Layer 7 Application Payload Bytes | NO | Preserved intact end-to-end |\n\n> [!IMPORTANT]\n> **Forensic Implication:**\n> An attacker's physical MAC address **never traverses an IP router**. When analyzing an intrusion packet captured on an internal corporate server, the Source MAC address belongs to the **nearest local default gateway router or firewall**, NOT the attacker's laptop. To track physical machines across routed boundaries, investigators must correlate router ARP caches and DHCP lease logs.\n\n---\n\n## Maximum Transmission Unit (MTU) & TCP Maximum Segment Size (MSS)\n\nEvery link layer protocol establishes a physical boundary called the **Maximum Transmission Unit (MTU)**—the largest single Layer 3 IP packet that can be carried in a Layer 2 frame without fragmentation.\n- **Standard Ethernet MTU:** Exactly **1,500 bytes**.\n- **TCP Maximum Segment Size (MSS):** The maximum amount of raw TCP application data a host can send in a single packet.\n- **MSS Calculation:**\n  $$\\text{MSS} = \\text{MTU} - \\text{IPv4 Header (20 Bytes)} - \\text{TCP Header (20 Bytes)} = 1500 - 40 = 1,460 \\text{ bytes}$$\n\n### Tunnel Overhead & PMTUD Black Holes\nWhen traffic enters a virtual private network (VPN) tunnel (such as IPsec or WireGuard) or a VXLAN overlay network, additional tunnel encapsulation headers are added (typically 40 to 80 bytes).\nIf the underlying physical network MTU remains 1,500 bytes, the available MTU for encapsulated packets drops (e.g. to 1,420 bytes).\nIf an endpoint sends 1,500-byte packets with the **Don't Fragment (DF)** flag enabled, intermediate VPN routers must discard the packets and return an **ICMP Type 3 Code 4 (\"Fragmentation Needed and DF set\")** error message.\nIf a poorly configured perimeter firewall blocks all ICMP messages, the sending host never discovers the bottleneck. Small packets (HTTP handshakes, small pings) succeed, but large HTTP downloads freeze indefinitely. This failure is known as a **Path MTU Discovery (PMTUD) Black Hole**."
    },
    {
      "id": "les_c2_m2_l5",
      "title": "2.5 Technical Deep Dive: Byte-by-Byte Hex Dissection of a Real Captured Ethernet Frame",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "Execute an authoritative forensic dissection of an execution-tested HTTP frame captured in the course lab. Decode hexadecimal offsets, Ethernet II, IPv4, TCP headers, options, and verify arithmetic.",
      "learning_objectives": [
        "Read raw hexadecimal and ASCII packet dump outputs produced by TShark and tcpdump.",
        "Decode each bit and byte offset across Layer 2 Ethernet II, Layer 3 IPv4, and Layer 4 TCP headers.",
        "Perform exact mathematical verification of header lengths, payload lengths, and frame totals.",
        "Deduce threat intelligence, passive OS fingerprinting, and security observations from raw packet headers."
      ],
      "images": [],
      "content": "## Forensic Packet Dissection: Frame 13 from `rk_c02_lab.pcap`\n\nTo bridge theoretical layered abstractions with real-world cybersecurity engineering, we dissect an actual raw frame captured in the course isolated lab environment (`LAB_ASSETS/C02/rk_c02_capture_lab.sh`; Docker 29.4.2, tcpdump 4.99.4, TShark 4.2.5).\n\nThe captured frame represents **Frame 13** in `rk_c02_lab.pcap`: an HTTP request `GET /` transmitted by a Linux client container (`172.30.0.20`) to an internal Nginx web server container (`172.30.0.10`) listening on TCP port `8080`.\n\n### CLI Extraction Command\n```bash\nsh rk_c02_analyse.sh \"frame.number==13\" -x\n```\n- `-Y \"frame.number==13\"`: Wireshark/TShark display filter isolating frame 13.\n- `-x`: Emits the full packet byte stream in traditional hexadecimal and ASCII split format.\n\n### Raw Hexadecimal & ASCII Dump\n```text\n0000  c2 97 98 65 94 00 8e c4 2b 21 89 b7 08 00 45 00   ...e....+!....E.\n0010  00 84 89 83 40 00 40 06 58 96 ac 1e 00 14 ac 1e   ....@.@.X.......\n0020  00 0a ad ac 1f 90 38 7b cb b2 24 4c cd 33 80 18   ......8{..$L.3..\n0030  01 f6 58 d1 00 00 01 01 08 0a 26 d9 02 96 c9 34   ..X.......&....4\n0040  53 4a 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31   SJGET / HTTP/1.1\n0050  0d 0a 48 6f 73 74 3a 20 31 37 32 2e 33 30 2e 30   ..Host: 172.30.0\n0060  2e 31 30 3a 38 30 38 30 0d 0a 55 73 65 72 2d 41   .10:8080..User-A\n0070  67 65 6e 74 3a 20 63 75 72 6c 2f 38 2e 32 33 2e   gent: curl/8.23.\n0080  30 0d 0a 41 63 63 65 70 74 3a 20 2a 2f 2a 0d 0a   0..Accept: */*..\n0090  0d 0a                                             ..\n```\n\n---\n\n## Anatomy of the Hex Dump\n\n- **Leftmost Column (`0000`, `0010`, `0020`...):** The line byte offset in hexadecimal notation. `0010` represents byte 16 ($1 \\\\times 16 + 0$); `0020` represents byte 32.\n- **Middle 16 Columns:** The raw byte values in hexadecimal. Each pair of hex characters represents one 8-bit octet (byte).\n- **Rightmost Column:** ASCII representation of printable characters. Unprintable control characters and header bytes are rendered as periods (`.`).\n\n---\n\n## Detailed Byte-by-Byte Header Decomposition\n\n```\nBYTE-LEVEL LAYER BOUNDARIES\n[ Bytes 0x00 - 0x0D (14 Bytes) ]: LAYER 2 - ETHERNET II HEADER\n[ Bytes 0x0E - 0x21 (20 Bytes) ]: LAYER 3 - IPv4 HEADER\n[ Bytes 0x22 - 0x41 (32 Bytes) ]: LAYER 4 - TCP HEADER (20B Base + 12B Options)\n[ Bytes 0x42 - 0x91 (80 Bytes) ]: LAYER 7 - HTTP APPLICATION DATA\nTotal Captured Frame Length = 14 + 20 + 32 + 80 = 146 Bytes (0x0092)\n\n\n### 1. Layer 2: Ethernet II Header (Bytes 0x00 – 0x0D | 14 Bytes)\n- `c2 97 98 65 94 00` (6 Bytes): **Destination MAC Address** (the virtual network interface of the server container).\n- `8e c4 2b 21 89 b7` (6 Bytes): **Source MAC Address** (the virtual interface of the client container).\n- `08 00` (2 Bytes): **EtherType** `0x0800` = Identifies that the encapsulated payload is an **IPv4 Packet**.\n*(Note: The 4-byte Frame Check Sequence trailer is stripped by the Linux virtual bridge prior to packet capture by libpcap).*\n\n### 2. Layer 3: IPv4 Header (Bytes 0x0E – 0x21 | 20 Bytes)\n- `45` (1 Byte): Split into two 4-bit nibbles:\n  - High nibble `4` = **IP Version 4**.\n  - Low nibble `5` = **Internet Header Length (IHL)**: 5 words of 32 bits ($5 \\\\times 4 = 20 \\text{ bytes}$).\n- `00` (1 Byte): **Differentiated Services Code Point (DSCP) & ECN** = `0x00` (Standard Best-Effort traffic).\n- `00 84` (2 Bytes): **Total Length** in hexadecimal = `0x0084` = **132 bytes** ($20 \\text{ IP} + 32 \\text{ TCP} + 80 \\text{ HTTP}$).\n- `89 83` (2 Bytes): **Identification** = `0x8983` (used for fragment tracking).\n- `40 00` (2 Bytes): **Flags and Fragment Offset**:\n  - `0x4000` = Bit 1 is set to 1 (**Don't Fragment - DF**), Fragment Offset is `0`.\n- `40` (1 Byte): **Time-To-Live (TTL)** = `0x40` = **64 hops** (standard initial TTL default for Linux kernels).\n- `06` (1 Byte): **Protocol Number** = `0x06` = **TCP** (RFC 791/IANA protocol number 6).\n- `58 96` (2 Bytes): **Header Checksum** = `0x5896` (validates IP header integrity).\n- `ac 1e 00 14` (4 Bytes): **Source IP Address**:\n  - `0xac` = 172, `0x1e` = 30, `0x00` = 0, `0x14` = 20 ➔ **`172.30.0.20`**.\n- `ac 1e 00 0a` (4 Bytes): **Destination IP Address**:\n  - `0xac` = 172, `0x1e` = 30, `0x00` = 0, `0x0a` = 10 ➔ **`172.30.0.10`**.\n\n### 3. Layer 4: TCP Header (Bytes 0x22 – 0x41 | 32 Bytes)\n- `ad ac` (2 Bytes): **Source Port** = `0xadac` = **44460** (client ephemeral port).\n- `1f 90` (2 Bytes): **Destination Port** = `0x1f90` = **8080** (HTTP web service).\n- `38 7b cb b2` (4 Bytes): **Raw Sequence Number** = `947637170`. (Wireshark displays this as relative `Seq=1`).\n- `24 4c cd 33` (4 Bytes): **Raw Acknowledgement Number** = `609013043`. (Wireshark displays relative `Ack=1`).\n- `80` (1 Byte): **Data Offset**:\n  - High nibble `8` = 8 32-bit words ($8 \\\\times 4 = 32 \\text{ bytes}$). This reveals a 32-byte TCP header (20 bytes standard base + 12 bytes TCP options).\n- `18` (1 Byte): **TCP Control Flags**:\n  - Binary: `00011000` = **PSH (Push - bit 3, 0x08)** + **ACK (Acknowledgement - bit 4, 0x10)**.\n- `01 f6` (2 Bytes): **Window Size** = `0x01f6` = 502. Multiplied by the negotiated Window Scale factor (128) yields an effective window of **64,256 bytes**.\n- `58 d1` (2 Bytes): **TCP Checksum** = `0x58d1`.\n- `00 00` (2 Bytes): **Urgent Pointer** = `0`.\n- `01 01` (2 Bytes): **TCP Options Alignment**: Two NOP (No-Operation, `0x01`) bytes for 32-bit boundary alignment.\n- `08 0a 26 d9 02 96 c9 34 53 4a` (10 Bytes): **TCP Timestamp Option** (Kind 8, Length 10):\n  - Encodes the client TSval (`0x26d90296`) and server TSecr echo reply (`0xc934534a`).\n\n### 4. Layer 7: HTTP Application Payload (Bytes 0x42 – 0x91 | 80 Bytes)\nStarting at offset `0x0042`, the ASCII plaintext payload reveals the exact HTTP/1.1 request formatted with CRLF (`\r\n`, `0x0d 0x0a`) line terminators:\n\nhttp\nGET / HTTP/1.1\r\n\nHost: 172.30.0.10:8080\r\n\nUser-Agent: curl/8.23.0\r\n\nAccept: */*\r\n\n\r\n\n```\nTotal ASCII characters including carriage returns and line feeds = exactly **80 bytes**.\n\n---\n\n## Encapsulation Arithmetic & Verification\n\n:::math-steps Frame 13 Protocol Data Unit (PDU) Encapsulation Breakdown\nStep 01: Layer 2 Ethernet II Frame Framing Header\n$$\\text{Ethernet II Header} = 14 \\text{ bytes}$$\n*Result: 6B Dst MAC + 6B Src MAC + 2B EtherType (0x0800)*\n\nStep 02: Layer 3 Internet Protocol Version 4 Packet Header\n$$\\text{IPv4 Header (IHL=5)} = 5 \\times 4 = 20 \\text{ bytes}$$\n*Result: Total Length field = 0x0084 (132 bytes)*\n\nStep 03: Layer 4 Transmission Control Protocol Segment Header\n$$\\text{TCP Header (Offset=8)} = 8 \\times 4 = 32 \\text{ bytes}$$\n*Result: 20B Base + 12B TCP Options (Timestamps + NOPs)*\n\nStep 04: Layer 7 Hypertext Transfer Protocol Application Payload\n$$\\text{HTTP Request Data} = 80 \\text{ bytes}$$\n*Result: Exact ASCII byte stream for GET / HTTP/1.1 request*\n\nStep 05: Aggregate Captured Wire Frame Verification\n$$\\text{Total Frame Length} = 14 + 20 + 32 + 80 = \\mathbf{146 \\text{ bytes}}$$\n*Result: Matches capture metadata 0x0092 in rk_c02_lab.pcap*\n\nStep 06: TCP Sequence & Acknowledgement Relative Stream Tracking\n$$\\text{Next Expected Ack} = \\text{Client Seq} + \\text{Payload Bytes} = 1 + 80 = \\mathbf{81}$$\n*Result: Server Frame 14 Ack=81 mathematically confirms receipt of all 80 HTTP bytes*\n:::\n\n---\n\n## Defensive Security Observations\n\n1. **Cleartext Transmission Risk:** Because HTTP (port 8080) lacks presentation-layer encryption, any attacker on the link or intermediate router sees the complete URI, Host, User-Agent, and payload. Had HTTPS (TLS) been utilized, bytes from offset `0x0042` onwards would be encrypted ciphertext indistinguishable from random noise.\n2. **Reconnaissance & Asset Profiling via User-Agent:** The cleartext string `User-Agent: curl/8.23.0` explicitly reveals that an automated script using `curl` version 8.23.0 generated the request. Attackers search for vulnerable versions, while defenders create SIEM detection rules to alert on non-standard User-Agents in corporate networks.\n3. **Passive OS Fingerprinting via Initial TTL:** The TTL value of `0x40` (64) strongly indicates that the sender is a Linux or Unix-like kernel (default initial TTL = 64), whereas Windows operating systems default to an initial TTL of 128, and Cisco routers default to 255."
    },
    {
      "id": "les_c2_m2_l6",
      "title": "2.6 Security by Layer: Attack Surfaces, Cross-Layer Gaps & Defensive Blind Spots",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Synthesize security controls across all seven layers. Investigate cross-layer attack vectors, port-based firewall blind spots, Heartbleed (CVE-2014-0160), and execute practical classification and frame dissection.",
      "learning_objectives": [
        "Map specific cyber attacks and defensive controls to their primary OSI layers.",
        "Analyze cross-layer security gaps where lower-layer controls fail against higher-layer threats.",
        "Examine the architectural mechanism of Heartbleed (CVE-2014-0160) as a presentation/application flaw.",
        "Complete hands-on practical exercises: decoding capture frames and building defense-in-depth matrices."
      ],
      "images": [
        {
          "id": "fig_c02_m02_f3",
          "title": "Figure C02-M02-F3: What Each Device Examines",
          "url": "/assets/courses/cyber-02/C02-M02-F3.png",
          "caption": "Figure C02-M02-F3: Architectural inspection boundaries illustrating the protocol layer depths analyzed by Layer 2 switches, Layer 3 routers, Layer 4 firewalls, and Layer 7 Web Application Firewalls (WAF).",
          "alt": "Diagram illustrating inspection depths of switches, routers, firewalls, and WAFs"
        },
        {
          "id": "img_c2_m2_d4",
          "title": "Figure C02-M02-D4: Multi-Layer Defense-in-Depth Security Architecture",
          "url": "/assets/courses/cyber-02/c02_m2_l6_defense_in_depth_layers.jpg",
          "caption": "Figure C02-M02-D4: Multi-tier Defense-in-Depth security architecture showing concentric protective shields (Physical & Link, Network & Transport, and Application & Data) defending core enterprise data assets and crown jewels.",
          "alt": "Diagram showing multi-layer defense in depth architecture with concentric shield layers"
        }
      ],
      "content": "## The Cross-Layer Attack and Control Matrix\n\n![Figure C02-M02-F3: What Each Device Examines Across the Stack](/assets/courses/cyber-02/C02-M02-F3.png)\n\n*Figure C02-M02-F3: Depth of protocol header and payload inspection across network infrastructure devices (L2 Switch, L3 Router, L4 Stateful Firewall, and L7 WAF).*\n\n\nSecurity engineering requires applying controls at every layer of the protocol stack. Relying on a control at one layer creates catastrophic blind spots if higher or lower layers are left undefended.\n\n| Table: Cross-Layer Security Control Matrix |\n| :---: | :--- | :--- | :--- |\n| Layer | Name | Typical Attack Vectors | Corresponding Defensive Controls |\n| 7 | Application | SQLi, XSS, SSRF, Phishing, DNS Tunneling, API Abuse | Web App Firewalls (WAF), Secure Coding, Input Validation, DMARC |\n| 6 | Presentation | Malformed Serialization, Deserialization RCE, Unicode Exploits | Strict Schema Validation, Patched Parsers, Safe JSON Decoders |\n| 5 | Session | Session Hijacking, Token Prediction, Man-in-the-Middle | Cryptographically Random Tokens, SameSite Cookies, Mutual TLS |\n| 4 | Transport | SYN Flood DDoS, Port Scans, TCP Reset Injection | Stateful Firewalls, SYN Cookies, Dynamic Rate Limiting, ACLs |\n| 3 | Network | IP Spoofing, BGP Hijacking, ICMP Flood, Smurf Attacks | Anti-Spoofing Filters (uRPF), RPKI Route Validation, IPsec |\n| 2 | Data Link | ARP Poisoning, MAC Flooding, VLAN Hopping, Rogue DHCP | Port Security, Dynamic ARP Inspection (DAI), DHCP Snooping, 802.1X |\n| 1 | Physical | Wiretapping, Optical Tapping, Cable Severing, RF Jamming | Locked Server Racks, Optical Conduit Alarms, MACsec, Shielding |\n\n---\n\n## Cross-Layer Security Gaps & Blind Spots\n\nA **cross-layer gap** occurs when a security control deployed at one layer makes assumptions that are violated or bypassed by activities at another layer:\n\n### 1. The Port 443 Fallacy (Layer 4 vs. Layer 7)\nMany legacy networks enforce egress filtering with simple stateful firewalls: *\"Permit TCP port 80 and 443 outbound so users can browse the web.\"*\n- **The Blind Spot:** A Layer 4 firewall only inspects port numbers. It cannot verify whether the traffic traversing port 443 is valid TLS/HTTPS.\n- **The Exploit:** Attackers regularly configure reverse shells, malware command-and-control (C2) agents (e.g., Cobalt Strike, Metasploit), and data exfiltration scripts to connect outbound on TCP port 443 using raw custom protocols or unencrypted ASCII. The Layer 4 firewall permits the traffic unconditionally.\n- **The Countermeasure:** Deploy Next-Generation Firewalls (NGFW) or egress proxies performing **Deep Packet Inspection (DPI)** to validate that traffic on port 443 conforms strictly to TLS protocol specifications.\n\n### 2. Transport Layer Encryption vs. Endpoint Vulnerabilities\nTLS 1.3 provides robust cryptographic confidentiality and integrity for data in transit across untrusted internet routers (protecting against Layer 3 eavesdropping).\n- **The Blind Spot:** TLS terminates at the host's network socket. Once decapsulated, the payload resides in plain cleartext inside the web server's application memory.\n- **The Exploit:** If the web application contains an SQL injection vulnerability or memory corruption bug (such as Heartbleed), an attacker compromises the data directly at Layer 7, completely bypassing TLS encryption.\n\n### 3. Link Layer Encryption vs. End-to-End Privacy\nWPA3-Enterprise encrypts wireless 802.11 frames passing between a mobile laptop and an office access point over the air.\n- **The Blind Spot:** Link layer encryption terminates at the physical access point. Once the access point converts the radio frame into an 802.3 wired Ethernet frame, the payload travels across internal switches and routers in cleartext unless higher-layer encryption (HTTPS/VPN) is applied.\n\n---\n\n## Real-World Case Studies\n\n### Case Study 1 (Real): Heartbleed (CVE-2014-0160)\n- **Context:** On April 7, 2014, the OpenSSL Project disclosed a critical security vulnerability (CVE-2014-0160) in the implementation of the RFC 6520 TLS Heartbeat extension.\n- **The Mechanism:** The TLS Heartbeat protocol permits a client to send a small payload (e.g. 1 byte) alongside a 16-bit length indicator field stating the payload size (e.g. 64 KB). The server allocates a memory buffer matching the declared length, copies the payload into it, and returns it to the client to confirm connection vitality.\n- **The Flaw:** OpenSSL failed to perform a **bounds check** verifying that the actual payload length matched the declared length field.\n- **The Impact:** When an attacker sent a 1-byte payload with a declared length of 65,535 bytes (64 KB), the vulnerable OpenSSL server copied the single byte followed by **65,534 bytes of whatever adjacent data happened to reside in server RAM**. Repeated heartbeat queries allowed remote unauthenticated attackers to steal SSL server private keys, user session tokens, and cleartext passwords without leaving a trace in standard web server logs.\n- **Cross-Layer Lesson:** Heartbleed was an application/presentation layer memory management bug. Lower-layer network firewalls permitting TCP port 443 had zero ability to distinguish malicious heartbeat requests from legitimate HTTPS sessions.\n\n### Case Study 2 (Fictional): Peacock Finance C2 Port Evasion\n- **Context:** Peacock Finance, a regional investment firm, configured perimeter firewalls to block all outbound ports except TCP 443, believing this restricted traffic strictly to secure web browsing.\n- **The Intrusion:** An employee clicked a malicious attachment, executing a lightweight reconnaissance payload. The payload initiated an outbound connection on TCP port 443 to an attacker-controlled VPS. It did not negotiate a TLS handshake; it transmitted raw base64-encoded PowerShell commands and directory listings.\n- **Detection & Containment:** A SOC security analyst monitoring Zeek network telemetry observed an active connection on port 443 that persisted for 9 hours without a single TLS ClientHello or Certificate exchange. The session was flagged as a protocol mismatch anomaly, isolating the infected workstation.\n- **Architectural Lesson:** Port numbers are mere transport-layer addresses. Defensive architecture must combine Layer 4 firewall rules with Layer 7 protocol validation and behavioral flow monitoring.\n\n---\n\n## Hands-On Practical Exercises\n\n### Practical 1: Frame Dissection & Encapsulation Validation\n- **Objective:** Independently decode Frame 28 and Frame 40 from `rk_c02_lab.pcap` and calculate layer byte boundaries.\n- **Authorized Scope:** Execute using Wireshark or the provided lab script `rk_c02_analyse.sh`.\n- **Step-by-Step Instructions:**\n  1. Open `rk_c02_lab.pcap` and apply display filter: `frame.number == 28`.\n  2. Inspect the HTTP request: It requests `GET /nothere HTTP/1.1`. Notice the URI path `/nothere` is 7 bytes longer than `/` in Frame 13.\n  3. Calculate the frame dimensions:\n     - Ethernet Header: 14 bytes\n     - IPv4 Header (IHL=5): 20 bytes\n     - TCP Header (Offset=8): 32 bytes\n     - HTTP Payload: 87 bytes ($80 + 7$)\n     - Total Frame Length: $14 + 20 + 32 + 87 = \\mathbf{153 \\text{ bytes}}$.\n  4. Now apply display filter: `frame.number == 40`.\n  5. Identify the encapsulated protocol: Notice that Frame 40 contains Ethernet II, IPv4 (Protocol `1` = ICMP), and ICMP Echo Request. **There is no Layer 4 TCP or UDP header present**, proving that ICMP encapsulates directly inside Layer 3 IP packets!\n\n### Practical 2: Building a Multi-Layer Defense-in-Depth Matrix\n- **Objective:** Map defensive technologies to mitigate threats across an enterprise DMZ web server.\n- **Defensive Architecture Blueprint:**\n\n![Figure C02-M02-D4: Multi-Layer Defense-in-Depth Security Architecture](/assets/courses/cyber-02/c02_m2_l6_defense_in_depth_layers.jpg)\n\n*Figure C02-M02-D4: Multi-tier Defense-in-Depth security architecture showing concentric protective shields (Physical & Link, Network & Transport, and Application & Data) defending core enterprise data assets and crown jewels.*"
    }
  ]
};
