/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 4 Question Bank: Network Protocols (TCP, UDP, ICMP, ARP)
 * Total Questions: 200 (100 Medium + 100 Difficult)
 */

export const c2_module4QuestionBank = [
  {
    "id": "q_c2_m4_001",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 22?",
    "options": [
      "SSH (Secure Shell) (Encrypted remote administration and SFTP file transfer)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 22/TCP is assigned by IANA to SSH (Secure Shell). Operational role: Encrypted remote administration and SFTP file transfer."
  },
  {
    "id": "q_c2_m4_002",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 23?",
    "options": [
      "Telnet (Cleartext remote terminal protocol that must be universally prohibited)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 23/TCP is assigned by IANA to Telnet. Operational role: Cleartext remote terminal protocol that must be universally prohibited."
  },
  {
    "id": "q_c2_m4_003",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 25?",
    "options": [
      "SMTP (Simple Mail Transfer Protocol) (Inter-server mail routing and delivery relay)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 25/TCP is assigned by IANA to SMTP (Simple Mail Transfer Protocol). Operational role: Inter-server mail routing and delivery relay."
  },
  {
    "id": "q_c2_m4_004",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP/TCP port 53?",
    "options": [
      "DNS (Domain Name System) (Name resolution (queries over UDP; large transfers/zone transfers over TCP))",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 53/UDP/TCP is assigned by IANA to DNS (Domain Name System). Operational role: Name resolution (queries over UDP; large transfers/zone transfers over TCP)."
  },
  {
    "id": "q_c2_m4_005",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP port 67/68?",
    "options": [
      "DHCP (Dynamic Host Configuration Protocol) (Server (port 67) and Client (port 68) automated IP address lease allocation)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 67/68/UDP is assigned by IANA to DHCP (Dynamic Host Configuration Protocol). Operational role: Server (port 67) and Client (port 68) automated IP address lease allocation."
  },
  {
    "id": "q_c2_m4_006",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 80?",
    "options": [
      "HTTP (Hypertext Transfer Protocol) (Unencrypted web traffic, typically redirected to HTTPS)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 80/TCP is assigned by IANA to HTTP (Hypertext Transfer Protocol). Operational role: Unencrypted web traffic, typically redirected to HTTPS."
  },
  {
    "id": "q_c2_m4_007",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 110?",
    "options": [
      "POP3 (Post Office Protocol v3) (Legacy cleartext mail retrieval protocol)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 110/TCP is assigned by IANA to POP3 (Post Office Protocol v3). Operational role: Legacy cleartext mail retrieval protocol."
  },
  {
    "id": "q_c2_m4_008",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP port 123?",
    "options": [
      "NTP (Network Time Protocol) (Clock synchronization across enterprise systems)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 123/UDP is assigned by IANA to NTP (Network Time Protocol). Operational role: Clock synchronization across enterprise systems."
  },
  {
    "id": "q_c2_m4_009",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 135?",
    "options": [
      "Microsoft RPC Endpoint Mapper (Windows Remote Procedure Call service locator)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 135/TCP is assigned by IANA to Microsoft RPC Endpoint Mapper. Operational role: Windows Remote Procedure Call service locator."
  },
  {
    "id": "q_c2_m4_010",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP/TCP port 137-139?",
    "options": [
      "NetBIOS Name/Session Services (Legacy Windows local networking and file sharing)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 137-139/UDP/TCP is assigned by IANA to NetBIOS Name/Session Services. Operational role: Legacy Windows local networking and file sharing."
  },
  {
    "id": "q_c2_m4_011",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 143?",
    "options": [
      "IMAP (Internet Message Access Protocol) (Cleartext mail retrieval; modern enterprise replaces with IMAPS on port 993)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 143/TCP is assigned by IANA to IMAP (Internet Message Access Protocol). Operational role: Cleartext mail retrieval; modern enterprise replaces with IMAPS on port 993."
  },
  {
    "id": "q_c2_m4_012",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP port 161/162?",
    "options": [
      "SNMP (Simple Network Management Protocol) (Manager queries (161) and agent alert traps (162))",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 161/162/UDP is assigned by IANA to SNMP (Simple Network Management Protocol). Operational role: Manager queries (161) and agent alert traps (162)."
  },
  {
    "id": "q_c2_m4_013",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 389?",
    "options": [
      "LDAP (Lightweight Directory Access Protocol) (Active Directory directory service queries)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 389/TCP is assigned by IANA to LDAP (Lightweight Directory Access Protocol). Operational role: Active Directory directory service queries."
  },
  {
    "id": "q_c2_m4_014",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 443?",
    "options": [
      "HTTPS (HTTP over TLS) (Cryptographically encrypted web application traffic)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 443/TCP is assigned by IANA to HTTPS (HTTP over TLS). Operational role: Cryptographically encrypted web application traffic."
  },
  {
    "id": "q_c2_m4_015",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 445?",
    "options": [
      "Microsoft SMB (Server Message Block) (Direct host file sharing; targeted by WannaCry and EternalBlue)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 445/TCP is assigned by IANA to Microsoft SMB (Server Message Block). Operational role: Direct host file sharing; targeted by WannaCry and EternalBlue."
  },
  {
    "id": "q_c2_m4_016",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on UDP port 514?",
    "options": [
      "Syslog (Standard syslog event message transmission over UDP)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 514/UDP is assigned by IANA to Syslog. Operational role: Standard syslog event message transmission over UDP."
  },
  {
    "id": "q_c2_m4_017",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 636?",
    "options": [
      "LDAPS (Secure LDAP over TLS) (Encrypted directory queries protecting authentication credentials)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 636/TCP is assigned by IANA to LDAPS (Secure LDAP over TLS). Operational role: Encrypted directory queries protecting authentication credentials."
  },
  {
    "id": "q_c2_m4_018",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 993?",
    "options": [
      "IMAPS (IMAP over TLS) (Encrypted mail retrieval using SSL/TLS)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 993/TCP is assigned by IANA to IMAPS (IMAP over TLS). Operational role: Encrypted mail retrieval using SSL/TLS."
  },
  {
    "id": "q_c2_m4_019",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 995?",
    "options": [
      "POP3S (POP3 over TLS) (Encrypted mail retrieval using SSL/TLS)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 995/TCP is assigned by IANA to POP3S (POP3 over TLS). Operational role: Encrypted mail retrieval using SSL/TLS."
  },
  {
    "id": "q_c2_m4_020",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 1433?",
    "options": [
      "Microsoft SQL Server (Enterprise relational database listening port)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 1433/TCP is assigned by IANA to Microsoft SQL Server. Operational role: Enterprise relational database listening port."
  },
  {
    "id": "q_c2_m4_021",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 3306?",
    "options": [
      "MySQL Database (Open-source relational database server port)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 3306/TCP is assigned by IANA to MySQL Database. Operational role: Open-source relational database server port."
  },
  {
    "id": "q_c2_m4_022",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 3389?",
    "options": [
      "Microsoft RDP (Remote Desktop Protocol) (Graphical remote desktop management; high-risk attack target)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 3389/TCP is assigned by IANA to Microsoft RDP (Remote Desktop Protocol). Operational role: Graphical remote desktop management; high-risk attack target."
  },
  {
    "id": "q_c2_m4_023",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 5432?",
    "options": [
      "PostgreSQL Database (Open-source relational database management port)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 5432/TCP is assigned by IANA to PostgreSQL Database. Operational role: Open-source relational database management port."
  },
  {
    "id": "q_c2_m4_024",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 8080?",
    "options": [
      "HTTP Alternate / Proxy Web Cache (Common proxy port or secondary web application listener)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 8080/TCP is assigned by IANA to HTTP Alternate / Proxy Web Cache. Operational role: Common proxy port or secondary web application listener."
  },
  {
    "id": "q_c2_m4_025",
    "topic": "Enterprise Ports & Common Services",
    "difficulty": "medium",
    "q": "What service and operational role is standardized on TCP port 8443?",
    "options": [
      "HTTPS Alternate / Secure Management (Common secure secondary web interface and admin portal port)",
      "BGP Routing Origin Verification Gateway",
      "Dynamic Host Configuration Relay Agent v6",
      "Spanning Tree Protocol Rapid Root Convergence"
    ],
    "correct": 0,
    "explanation": "Port 8443/TCP is assigned by IANA to HTTPS Alternate / Secure Management. Operational role: Common secure secondary web interface and admin portal port."
  },
  {
    "id": "q_c2_m4_026",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What is the exact sequence of packets exchanged during a successful TCP three-way connection handshake?",
    "options": [
      "SYN -> SYN, ACK -> ACK",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: SYN -> SYN, ACK -> ACK."
  },
  {
    "id": "q_c2_m4_027",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What is the primary role of the SYN flag in a TCP header?",
    "options": [
      "To synchronize Initial Sequence Numbers (ISNs) between client and server",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: To synchronize Initial Sequence Numbers (ISNs) between client and server."
  },
  {
    "id": "q_c2_m4_028",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What is the primary role of the ACK flag in a TCP header?",
    "options": [
      "To indicate that the Acknowledgment Number field contains valid feedback",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: To indicate that the Acknowledgment Number field contains valid feedback."
  },
  {
    "id": "q_c2_m4_029",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What flag does an endpoint set when it has finished transmitting all data and requests a graceful close?",
    "options": [
      "FIN (Finish)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: FIN (Finish)."
  },
  {
    "id": "q_c2_m4_030",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What flag is sent in response to an unexpected packet or connection attempt to a closed port?",
    "options": [
      "RST (Reset)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: RST (Reset)."
  },
  {
    "id": "q_c2_m4_031",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What flag requests the receiver to immediately pass all buffered data to the application layer?",
    "options": [
      "PSH (Push)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: PSH (Push)."
  },
  {
    "id": "q_c2_m4_032",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What is the base header length of an IPv4 TCP segment with zero options?",
    "options": [
      "20 bytes (160 bits)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: 20 bytes (160 bits)."
  },
  {
    "id": "q_c2_m4_033",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP header field facilitates dynamic flow control by communicating available buffer capacity?",
    "options": [
      "Window Size",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Window Size."
  },
  {
    "id": "q_c2_m4_034",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP state does the active closer enter after sending its final ACK during termination to catch delayed packets?",
    "options": [
      "TIME_WAIT",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: TIME_WAIT."
  },
  {
    "id": "q_c2_m4_035",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP state indicates that a server socket is bound and waiting for incoming client connections?",
    "options": [
      "LISTEN",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: LISTEN."
  },
  {
    "id": "q_c2_m4_036",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP option negotiated during handshake specifies the largest payload segment a host can receive?",
    "options": [
      "Maximum Segment Size (MSS)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Maximum Segment Size (MSS)."
  },
  {
    "id": "q_c2_m4_037",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP option allows a receiver to acknowledge non-contiguous blocks of successfully received packets?",
    "options": [
      "Selective Acknowledgment Permitted (SACK_PERM)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Selective Acknowledgment Permitted (SACK_PERM)."
  },
  {
    "id": "q_c2_m4_038",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "Why do modern operating systems randomize Initial Sequence Numbers (ISNs)?",
    "options": [
      "To prevent blind sequence number guessing and off-path session hijacking attacks",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: To prevent blind sequence number guessing and off-path session hijacking attacks."
  },
  {
    "id": "q_c2_m4_039",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What state transition occurs on a client immediately upon transmitting its initial SYN packet?",
    "options": [
      "SYN_SENT",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: SYN_SENT."
  },
  {
    "id": "q_c2_m4_040",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What state transition occurs on a server immediately upon receiving a SYN and sending SYN-ACK?",
    "options": [
      "SYN_RECEIVED",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: SYN_RECEIVED."
  },
  {
    "id": "q_c2_m4_041",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP flag combination indicates a half-closed connection initiated by the remote peer?",
    "options": [
      "FIN, ACK",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: FIN, ACK."
  },
  {
    "id": "q_c2_m4_042",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What TCP mechanism dynamically throttles sender transmission speed when intermediate routers drop packets?",
    "options": [
      "Congestion Control (e.g., CUBIC, BBR)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Congestion Control (e.g., CUBIC, BBR)."
  },
  {
    "id": "q_c2_m4_043",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What is the minimum value of the Data Offset field in a standard TCP header?",
    "options": [
      "5 (meaning five 32-bit words, or 20 bytes)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: 5 (meaning five 32-bit words, or 20 bytes)."
  },
  {
    "id": "q_c2_m4_044",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What error status is typically reported to a user application when a remote server replies with RST-ACK?",
    "options": [
      "Connection Refused",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Connection Refused."
  },
  {
    "id": "q_c2_m4_045",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What occurs when an application socket remains stuck in the CLOSE_WAIT state for extended periods?",
    "options": [
      "An application bug where the local program failed to explicitly close its socket",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: An application bug where the local program failed to explicitly close its socket."
  },
  {
    "id": "q_c2_m4_046",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What security mechanism mitigates SYN flood denial-of-service attacks by encoding state into initial sequence numbers?",
    "options": [
      "SYN Cookies",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: SYN Cookies."
  },
  {
    "id": "q_c2_m4_047",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "How does a stateful firewall treat return traffic corresponding to an established TCP connection?",
    "options": [
      "It matches connection state tables and permits return packets automatically",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: It matches connection state tables and permits return packets automatically."
  },
  {
    "id": "q_c2_m4_048",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What does a sudden burst of SYN packets from a single external IP to sequential ports indicate?",
    "options": [
      "A TCP port scan reconnaissance activity",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: A TCP port scan reconnaissance activity."
  },
  {
    "id": "q_c2_m4_049",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "Which RFC standard is the modern authoritative specification for the Transmission Control Protocol?",
    "options": [
      "RFC 9293 (August 2022)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: RFC 9293 (August 2022)."
  },
  {
    "id": "q_c2_m4_050",
    "topic": "TCP Architecture & State Machine",
    "difficulty": "medium",
    "q": "What layer of the OSI model does TCP operate at?",
    "options": [
      "Layer 4 (Transport Layer)",
      "Dynamic Layer 2 Carrier Frame Negotiation",
      "Unicast Host Tunneling Exchange Protocol",
      "Point-to-Point Encryption Synchronizer"
    ],
    "correct": 0,
    "explanation": "Standard TCP protocol behavior: Layer 4 (Transport Layer)."
  },
  {
    "id": "q_c2_m4_051",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What RFC document defines the original specification for the User Datagram Protocol?",
    "options": [
      "RFC 768 (August 1980)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: RFC 768 (August 1980)."
  },
  {
    "id": "q_c2_m4_052",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What is the exact header length of a User Datagram Protocol (UDP) packet?",
    "options": [
      "8 bytes (64 bits)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: 8 bytes (64 bits)."
  },
  {
    "id": "q_c2_m4_053",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "How many fields are contained in a standard UDP header?",
    "options": [
      "4 fields (Source Port, Destination Port, Length, Checksum)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: 4 fields (Source Port, Destination Port, Length, Checksum)."
  },
  {
    "id": "q_c2_m4_054",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What error message is generated when a UDP datagram arrives at a host on an unassigned port?",
    "options": [
      "ICMP Type 3, Code 3: Port Unreachable",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: ICMP Type 3, Code 3: Port Unreachable."
  },
  {
    "id": "q_c2_m4_055",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Why is UDP considered a connectionless transport protocol?",
    "options": [
      "It performs no connection handshake, no state tracking, and no acknowledgments",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: It performs no connection handshake, no state tracking, and no acknowledgments."
  },
  {
    "id": "q_c2_m4_056",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Which modern web protocol runs on top of UDP via QUIC instead of TCP?",
    "options": [
      "HTTP/3 (RFC 9000)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: HTTP/3 (RFC 9000)."
  },
  {
    "id": "q_c2_m4_057",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Why do streaming video and online voice calls prioritize UDP over TCP?",
    "options": [
      "UDP eliminates head-of-line blocking and retransmission delays, providing lower latency",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: UDP eliminates head-of-line blocking and retransmission delays, providing lower latency."
  },
  {
    "id": "q_c2_m4_058",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What field in the UDP header is optional in IPv4 but strictly mandatory in IPv6?",
    "options": [
      "Checksum",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Checksum."
  },
  {
    "id": "q_c2_m4_059",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What is the minimum value possible in the UDP Length field?",
    "options": [
      "8 bytes (representing an empty datagram containing only the header)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: 8 bytes (representing an empty datagram containing only the header)."
  },
  {
    "id": "q_c2_m4_060",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Why are UDP services heavily susceptible to IP address spoofing?",
    "options": [
      "Because UDP has no handshake, senders can forge arbitrary source IP addresses",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Because UDP has no handshake, senders can forge arbitrary source IP addresses."
  },
  {
    "id": "q_c2_m4_061",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What type of cyberattack exploits UDP services that return responses significantly larger than queries?",
    "options": [
      "Reflection and Amplification DDoS attacks",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Reflection and Amplification DDoS attacks."
  },
  {
    "id": "q_c2_m4_062",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Which foundational Internet service uses UDP port 53 for standard recursive queries?",
    "options": [
      "Domain Name System (DNS)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Domain Name System (DNS)."
  },
  {
    "id": "q_c2_m4_063",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Which network protocol utilizes UDP ports 67 and 68 for automatic address allocation?",
    "options": [
      "Dynamic Host Configuration Protocol (DHCP)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Dynamic Host Configuration Protocol (DHCP)."
  },
  {
    "id": "q_c2_m4_064",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Which network protocol uses UDP port 123 to synchronize clocks across servers?",
    "options": [
      "Network Time Protocol (NTP)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Network Time Protocol (NTP)."
  },
  {
    "id": "q_c2_m4_065",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Which network management protocol uses UDP ports 161 and 162 for queries and traps?",
    "options": [
      "Simple Network Management Protocol (SNMP)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: Simple Network Management Protocol (SNMP)."
  },
  {
    "id": "q_c2_m4_066",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "How does a receiving UDP socket handle packets that arrive out of order?",
    "options": [
      "It passes them to the application in whatever order they arrive, without resequencing",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: It passes them to the application in whatever order they arrive, without resequencing."
  },
  {
    "id": "q_c2_m4_067",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What occurs if a UDP datagram is corrupted by electrical noise in transit and fails checksum validation?",
    "options": [
      "The receiving kernel silently discards the datagram",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: The receiving kernel silently discards the datagram."
  },
  {
    "id": "q_c2_m4_068",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "Does UDP provide native encryption or authentication of payload data?",
    "options": [
      "No, encryption must be implemented at higher layers (e.g., DTLS, QUIC, or IPsec)",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: No, encryption must be implemented at higher layers (e.g., DTLS, QUIC, or IPsec)."
  },
  {
    "id": "q_c2_m4_069",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What Wireshark display filter isolates all UDP traffic excluding ICMP error messages?",
    "options": [
      "udp && !icmp",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: udp && !icmp."
  },
  {
    "id": "q_c2_m4_070",
    "topic": "UDP Datagram Mechanics",
    "difficulty": "medium",
    "q": "What is the primary difference between TCP RST and a UDP closed port response?",
    "options": [
      "TCP responds in-band with RST; UDP triggers an out-of-band ICMP Port Unreachable message",
      "Dynamic Layer 3 Broadcast Reservation",
      "Virtual Circuit Termination Notice",
      "Carrier Sense Multiple Access Acknowledgment"
    ],
    "correct": 0,
    "explanation": "Standard UDP protocol behavior: TCP responds in-band with RST; UDP triggers an out-of-band ICMP Port Unreachable message."
  },
  {
    "id": "q_c2_m4_071",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is the primary functional purpose of the Internet Control Message Protocol (RFC 792)?",
    "options": [
      "To provide operational diagnostics and error reporting for Internet Protocol",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: To provide operational diagnostics and error reporting for Internet Protocol."
  },
  {
    "id": "q_c2_m4_072",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ICMP Type and Code represents an Echo Request (ping)?",
    "options": [
      "Type 8, Code 0",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Type 8, Code 0."
  },
  {
    "id": "q_c2_m4_073",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ICMP Type and Code represents an Echo Reply (ping response)?",
    "options": [
      "Type 0, Code 0",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Type 0, Code 0."
  },
  {
    "id": "q_c2_m4_074",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ICMP Type and Code is sent by a router when a packet Time-to-Live (TTL) decrements to zero?",
    "options": [
      "Type 11, Code 0 (Time Exceeded in Transit)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Type 11, Code 0 (Time Exceeded in Transit)."
  },
  {
    "id": "q_c2_m4_075",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ICMP Type and Code is sent when a packet exceeds the link MTU with Don't Fragment (DF) set?",
    "options": [
      "Type 3, Code 4 (Fragmentation Needed)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Type 3, Code 4 (Fragmentation Needed)."
  },
  {
    "id": "q_c2_m4_076",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What diagnostic utility deliberately decrements TTL to trace routing hops via ICMP Type 11?",
    "options": [
      "Traceroute (or tracert)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Traceroute (or tracert)."
  },
  {
    "id": "q_c2_m4_077",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What network protocol resolves known IPv4 addresses to physical MAC addresses on local links?",
    "options": [
      "Address Resolution Protocol (ARP - RFC 826)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Address Resolution Protocol (ARP - RFC 826)."
  },
  {
    "id": "q_c2_m4_078",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is the Layer 2 destination MAC address of an ARP request packet?",
    "options": [
      "FF:FF:FF:FF:FF:FF (Broadcast)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: FF:FF:FF:FF:FF:FF (Broadcast)."
  },
  {
    "id": "q_c2_m4_079",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is the transmission type of a standard ARP reply packet?",
    "options": [
      "Unicast directly to the requesting host's MAC address",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Unicast directly to the requesting host's MAC address."
  },
  {
    "id": "q_c2_m4_080",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ARP opcode value indicates an ARP Request?",
    "options": [
      "Opcode 1",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Opcode 1."
  },
  {
    "id": "q_c2_m4_081",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ARP opcode value indicates an ARP Reply?",
    "options": [
      "Opcode 2",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Opcode 2."
  },
  {
    "id": "q_c2_m4_082",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is an ARP packet called where the sender IP and target IP are identical?",
    "options": [
      "Gratuitous ARP (GARP)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Gratuitous ARP (GARP)."
  },
  {
    "id": "q_c2_m4_083",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What are the two primary purposes of a Gratuitous ARP announcement?",
    "options": [
      "Duplicate Address Detection (DAD) and updating neighbors' ARP caches",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Duplicate Address Detection (DAD) and updating neighbors' ARP caches."
  },
  {
    "id": "q_c2_m4_084",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What command displays the current local ARP cache table on Windows and Linux?",
    "options": [
      "arp -a (or ip neigh on Linux)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: arp -a (or ip neigh on Linux)."
  },
  {
    "id": "q_c2_m4_085",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "Why is ARP vulnerable to cache poisoning on flat local area networks?",
    "options": [
      "ARP is unauthenticated; hosts accept unsolicited ARP replies without verification",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: ARP is unauthenticated; hosts accept unsolicited ARP replies without verification."
  },
  {
    "id": "q_c2_m4_086",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What attack intercepts local network traffic by spoofing default gateway ARP replies?",
    "options": [
      "ARP Cache Poisoning / Man-in-the-Middle (MitM)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: ARP Cache Poisoning / Man-in-the-Middle (MitM)."
  },
  {
    "id": "q_c2_m4_087",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What switch security feature blocks rogue ARP replies by validating against DHCP snooping tables?",
    "options": [
      "Dynamic ARP Inspection (DAI)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Dynamic ARP Inspection (DAI)."
  },
  {
    "id": "q_c2_m4_088",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is an ICMP Black Hole?",
    "options": [
      "A scenario where a firewall blocks ICMP Type 3 Code 4, breaking Path MTU Discovery and causing large transfers to hang",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: A scenario where a firewall blocks ICMP Type 3 Code 4, breaking Path MTU Discovery and causing large transfers to hang."
  },
  {
    "id": "q_c2_m4_089",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What protocol replaces ARP in IPv6 networks?",
    "options": [
      "Neighbor Discovery Protocol (NDP - RFC 4861 over ICMPv6)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Neighbor Discovery Protocol (NDP - RFC 4861 over ICMPv6)."
  },
  {
    "id": "q_c2_m4_090",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "Can an ARP packet cross an enterprise Layer 3 router into an adjacent subnet?",
    "options": [
      "No, ARP operates strictly within a single Layer 2 broadcast domain",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: No, ARP operates strictly within a single Layer 2 broadcast domain."
  },
  {
    "id": "q_c2_m4_091",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What ICMP Type indicates a route redirect request from a local gateway?",
    "options": [
      "ICMP Type 5 (Redirect)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: ICMP Type 5 (Redirect)."
  },
  {
    "id": "q_c2_m4_092",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "Why do security baselines recommend disabling ICMP redirects on enterprise hosts?",
    "options": [
      "Adversaries can forge redirects to force traffic through a malicious local gateway",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Adversaries can forge redirects to force traffic through a malicious local gateway."
  },
  {
    "id": "q_c2_m4_093",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "How does an operating system match an incoming ICMP error message to the process that caused it?",
    "options": [
      "The ICMP error payload includes the original IP header and first 8 bytes of transport data",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: The ICMP error payload includes the original IP header and first 8 bytes of transport data."
  },
  {
    "id": "q_c2_m4_094",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What default TTL value is utilized by modern Linux operating systems?",
    "options": [
      "64",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: 64."
  },
  {
    "id": "q_c2_m4_095",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What default TTL value is utilized by modern Windows operating systems?",
    "options": [
      "128",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: 128."
  },
  {
    "id": "q_c2_m4_096",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What command-line tool on Linux inspects the local neighbor table?",
    "options": [
      "ip neigh show",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: ip neigh show."
  },
  {
    "id": "q_c2_m4_097",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is the danger of leaving SMB port 445 exposed to the public Internet?",
    "options": [
      "Susceptibility to automated worm propagation such as WannaCry and remote code execution exploits",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Susceptibility to automated worm propagation such as WannaCry and remote code execution exploits."
  },
  {
    "id": "q_c2_m4_098",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What protocol was exploited by EternalBlue on port 445?",
    "options": [
      "Microsoft Server Message Block version 1 (SMBv1)",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: Microsoft Server Message Block version 1 (SMBv1)."
  },
  {
    "id": "q_c2_m4_099",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "Why should database services (MySQL 3306, Postgres 5432) never be bound to 0.0.0.0 on public servers?",
    "options": [
      "They become accessible to internet-wide brute-force credential and injection attacks",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: They become accessible to internet-wide brute-force credential and injection attacks."
  },
  {
    "id": "q_c2_m4_100",
    "topic": "ICMP, ARP & Service Hardening",
    "difficulty": "medium",
    "q": "What is the recommended defensive transport protocol for remote command-line administration?",
    "options": [
      "SSH over TCP port 22 with public key authentication and disabled root login",
      "Unicast Virtual Enclave Protocol",
      "Dynamic Carrier Routing Controller",
      "Layer 2 Collision Boundary Forwarder"
    ],
    "correct": 0,
    "explanation": "Standard networking principle: SSH over TCP port 22 with public key authentication and disabled root login."
  },
  {
    "id": "q_c2_m4_101",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An analyst inspects a packet capture and observes a TCP SYN packet with Sequence Number = 0, Window Size = 64240, and an MSS option of 1460 bytes. The subsequent SYN-ACK segment displays Sequence Number = 0 and Acknowledgment Number = 1. Why does Wireshark display Seq=0 and Ack=1 when the actual wire values are random 32-bit integers?",
    "options": [
      "Wireshark enables Relative Sequence Numbers by default, displaying initial byte offsets from zero for human scannability while raw wire packets contain full 32-bit random ISNs.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Wireshark relative sequence numbering simplifies tracking stream byte consumption. Architectural analysis: Wireshark enables Relative Sequence Numbers by default, displaying initial byte offsets from zero for human scannability while raw wire packets contain full 32-bit random ISNs."
  },
  {
    "id": "q_c2_m4_102",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A security engineer discovers an application that completes a TCP handshake, transfers 80 bytes of HTTP request data, and immediately receives a TCP FIN-ACK segment from the server. The client acknowledges the FIN and enters TIME_WAIT. Why is the client required to hold the socket in TIME_WAIT for 2MSL (Maximum Segment Lifetime)?",
    "options": [
      "To guarantee that the final ACK was delivered and to allow stray or duplicate segments in transit to dissipate before the port tuple can be reused by a new connection.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "TIME_WAIT prevents delayed segments from old sessions corrupting newly opened connections. Architectural analysis: To guarantee that the final ACK was delivered and to allow stray or duplicate segments in transit to dissipate before the port tuple can be reused by a new connection."
  },
  {
    "id": "q_c2_m4_103",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An intrusion detection rule flags: `alert tcp any any -> $HOME_NET any (flags:S; flags:!A; threshold:type both, track by_src, count 100, seconds 5; msg:\"TCP Port Scan Detected\";)`. What specific adversary behavior triggers this signature?",
    "options": [
      "A single source IP address dispatching over 100 TCP SYN packets (with ACK unasserted) within 5 seconds to various destination ports without completing handshakes.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "SYN scanning (half-open scanning) transmits rapid SYN probes to detect listening services. Architectural analysis: A single source IP address dispatching over 100 TCP SYN packets (with ACK unasserted) within 5 seconds to various destination ports without completing handshakes."
  },
  {
    "id": "q_c2_m4_104",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "During an incident investigation of a compromised Windows server, a responder executes `netstat -ano` and observes hundreds of TCP connections in the `SYN_RECEIVED` state originating from thousands of spoofed external IP addresses. What specific attack is underway and what OS countermeasure should be verified?",
    "options": [
      "A volumetric TCP SYN Flood attack exhausting kernel connection backlog queues; verify that SYN Cookies (`TcpMaxConnectResponseRetransmissions` / `syncookies`) are enabled.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "SYN Cookies allow servers to survive SYN floods by encoding connection state in sequence numbers without allocating RAM. Architectural analysis: A volumetric TCP SYN Flood attack exhausting kernel connection backlog queues; verify that SYN Cookies (`TcpMaxConnectResponseRetransmissions` / `syncookies`) are enabled."
  },
  {
    "id": "q_c2_m4_105",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An enterprise web application behind an IPsec VPN tunnel successfully loads small text files, but large PDF downloads and image assets consistently freeze and timeout at exactly 1,420 bytes. What is the root cause and the required remediation?",
    "options": [
      "An ICMP Black Hole: an intermediate firewall is dropping ICMP Type 3, Code 4 (Fragmentation Needed) packets, breaking Path MTU Discovery; configure the firewall to allow Type 3 Code 4 or enable TCP MSS clamping on the VPN gateway.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "TCP MSS clamping forces endpoints to advertise smaller MSS matching the VPN tunnel MTU. Architectural analysis: An ICMP Black Hole: an intermediate firewall is dropping ICMP Type 3, Code 4 (Fragmentation Needed) packets, breaking Path MTU Discovery; configure the firewall to allow Type 3 Code 4 or enable TCP MSS clamping on the VPN gateway."
  },
  {
    "id": "q_c2_m4_106",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An adversary connects a rogue laptop to an open Ethernet port in a conference room and executes an ARP poisoning attack. They transmit unsolicited ARP replies claiming that the default gateway (172.30.0.1) is located at their laptop's MAC address. What switch feature stops this attack and how does it validate packets?",
    "options": [
      "Dynamic ARP Inspection (DAI): the switch inspects the ARP payload on untrusted ports and cross-references the IP-to-MAC binding against the DHCP Snooping binding table, dropping invalid replies.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "DAI prevents Layer 2 MitM by enforcing hardware-bound IP-MAC leases. Architectural analysis: Dynamic ARP Inspection (DAI): the switch inspects the ARP payload on untrusted ports and cross-references the IP-to-MAC binding against the DHCP Snooping binding table, dropping invalid replies."
  },
  {
    "id": "q_c2_m4_107",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A security analyst reviews a TShark field extraction output: `48 54156 9999 19 RK-UDP-TEST` followed by frame 49: `172.30.0.10 -> 172.30.0.23 ICMP 3 3`. Frame 49 contains two source IP addresses and two destination IP addresses in its dissect tree. Why does an ICMP error packet display two sets of IP addresses?",
    "options": [
      "The outer IP header routes the ICMP error back to the sender, while the ICMP payload contains an exact copy of the original IP header and first 8 bytes of the datagram that triggered the error.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "RFC 792 mandates quoting the triggering packet's header so the sender can match the error to the correct socket. Architectural analysis: The outer IP header routes the ICMP error back to the sender, while the ICMP payload contains an exact copy of the original IP header and first 8 bytes of the datagram that triggered the error."
  },
  {
    "id": "q_c2_m4_108",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "In May 2017, the WannaCry ransomware outbreak encrypted critical healthcare infrastructure globally. What specific Windows networking service was exploited, on which port, and what technical vulnerability allowed remote code execution without user credentials?",
    "options": [
      "Microsoft SMBv1 on TCP port 445; exploited via the EternalBlue (MS17-010) vulnerability involving a buffer overflow in Srv!SrvOs2FeaToNt transaction handling.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "EternalBlue weaponized SMBv1 grooming and pool corruption to achieve SYSTEM shell execution. Architectural analysis: Microsoft SMBv1 on TCP port 445; exploited via the EternalBlue (MS17-010) vulnerability involving a buffer overflow in Srv!SrvOs2FeaToNt transaction handling."
  },
  {
    "id": "q_c2_m4_109",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An enterprise edge firewall rule is configured: `permit udp any any eq 53`. Attackers target a third-party server by sending 60-byte DNS requests with the victim's spoofed source IP to public recursive resolvers, which respond with 4,000-byte DNSSEC responses to the victim. What is this attack classification and how does an edge network prevent participating in it?",
    "options": [
      "DNS Amplification / Reflection DDoS Attack; prevent by disabling open recursive resolution to external clients and enforcing BCP 38 anti-spoofing egress filtering.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "BCP 38 stops forged source IPs; disabling open resolvers prevents servers from acting as reflectors. Architectural analysis: DNS Amplification / Reflection DDoS Attack; prevent by disabling open recursive resolution to external clients and enforcing BCP 38 anti-spoofing egress filtering."
  },
  {
    "id": "q_c2_m4_110",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An internal vulnerability scan flags an exposed host with TCP port 135, 137, 138, 139, and 445 listening. What operating system environment is this, and what is the primary risk of exposing these ports across an untrusted boundary?",
    "options": [
      "Microsoft Windows (SMB and NetBIOS over TCP/IP); exposing them allows unauthenticated remote enumeration of user accounts, shares, Active Directory domains, and remote code execution exploits.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Windows RPC and SMB ports carry extensive legacy management and authentication attack surfaces. Architectural analysis: Microsoft Windows (SMB and NetBIOS over TCP/IP); exposing them allows unauthenticated remote enumeration of user accounts, shares, Active Directory domains, and remote code execution exploits."
  },
  {
    "id": "q_c2_m4_111",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "What occurs when an endpoint transmits an ARP request for an IP address located on a completely different external subnet (e.g., requesting the MAC of 8.8.8.8 while on 192.168.1.0/24)?",
    "options": [
      "The local host does not ARP for 8.8.8.8; its routing table determines the destination is off-subnet, so it ARPs for its local Default Gateway's IP to forward the frame.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "ARP is non-routable; hosts ARP for the next-hop gateway when destinations are external. Architectural analysis: The local host does not ARP for 8.8.8.8; its routing table determines the destination is off-subnet, so it ARPs for its local Default Gateway's IP to forward the frame."
  },
  {
    "id": "q_c2_m4_112",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An attacker uses `nmap -sS -p 3389 192.168.1.50` and receives a packet with flags `RST, ACK`. What can the attacker definitively deduce about the target system?",
    "options": [
      "The host at 192.168.1.50 is active and online, the network path is open, but no Remote Desktop Protocol service is currently listening on port 3389.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "RST-ACK proves host reachability and confirms a closed port state. Architectural analysis: The host at 192.168.1.50 is active and online, the network path is open, but no Remote Desktop Protocol service is currently listening on port 3389."
  },
  {
    "id": "q_c2_m4_113",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A client sends a TCP SYN to an internal server on port 443. The firewall permits the packet, but the server's application crashed 10 seconds earlier. What packet is transmitted back to the client and what error does the browser display?",
    "options": [
      "The server kernel transmits a TCP RST-ACK, and the browser displays `ERR_CONNECTION_REFUSED`.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "The kernel stack is operational but no process is listening on the requested port. Architectural analysis: The server kernel transmits a TCP RST-ACK, and the browser displays `ERR_CONNECTION_REFUSED`."
  },
  {
    "id": "q_c2_m4_114",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A SOC analyst examines a packet capture containing thousands of TCP packets with the flags URG, PSH, and FIN asserted simultaneously (known as an XMAS scan). Why do port scanners utilize this flag combination against Unix/Linux systems?",
    "options": [
      "Under RFC 793, closed ports respond to an XMAS packet with a RST, whereas open listening ports silently discard the packet, allowing port detection without logging full handshakes.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "XMAS scans exploit RFC 793 edge-case processing rules on non-Windows network stacks. Architectural analysis: Under RFC 793, closed ports respond to an XMAS packet with a RST, whereas open listening ports silently discard the packet, allowing port detection without logging full handshakes."
  },
  {
    "id": "q_c2_m4_115",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A firewall administrator observes an established TCP session transferring data at 10 Gbps across a transcontinental fiber link. Why does standard TCP require the Window Scale option (RFC 7323) to achieve maximum throughput on high-bandwidth-delay product (BDP) links?",
    "options": [
      "The base TCP header window size field is limited to 16 bits (65,535 bytes); the Window Scale option expands the receive window up to 1 Gigabyte by applying a left-shift multiplier.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "High BDP links require large buffer windows to keep data in flight without waiting for ACKs. Architectural analysis: The base TCP header window size field is limited to 16 bits (65,535 bytes); the Window Scale option expands the receive window up to 1 Gigabyte by applying a left-shift multiplier."
  },
  {
    "id": "q_c2_m4_116",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "During a network security audit, an analyst notices that a database server responds to ICMP Type 5 Redirect messages. How can an attacker on the same local subnet exploit ICMP redirects?",
    "options": [
      "The attacker sends a forged ICMP Redirect to the server claiming a faster gateway exists at the attacker's IP, tricking the server into routing outbound traffic through the attacker.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "ICMP Redirects can alter host routing tables if not disabled on endpoints. Architectural analysis: The attacker sends a forged ICMP Redirect to the server claiming a faster gateway exists at the attacker's IP, tricking the server into routing outbound traffic through the attacker."
  },
  {
    "id": "q_c2_m4_117",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "In a Wireshark capture of an active SSH session (TCP port 22), an analyst observes packets with TCP payload data and flag `[PSH, ACK]`. What is the functional role of the PSH flag in an interactive shell?",
    "options": [
      "It forces immediate transmission and application-layer delivery of single keystrokes without waiting for the transport buffer to fill.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Interactive terminal sessions require instantaneous character-by-character echo. Architectural analysis: It forces immediate transmission and application-layer delivery of single keystrokes without waiting for the transport buffer to fill."
  },
  {
    "id": "q_c2_m4_118",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An endpoint initiates an IPv6 connection and must resolve the link-layer address of a neighboring gateway. What specific ICMPv6 packet is transmitted and to what address is it sent?",
    "options": [
      "Neighbor Solicitation (ICMPv6 Type 135) transmitted to the gateway's Solicited-Node Multicast Address.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "ICMPv6 NDP replaces ARP using solicited-node multicast to prevent link-wide broadcasts. Architectural analysis: Neighbor Solicitation (ICMPv6 Type 135) transmitted to the gateway's Solicited-Node Multicast Address."
  },
  {
    "id": "q_c2_m4_119",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A threat hunter identifies an unauthorized software program listening on UDP port 53 on an internal workstation. Why would malware bind to UDP port 53 or communicate over DNS protocols?",
    "options": [
      "To execute DNS Tunneling: encapsulating command-and-control instructions or exfiltrating stolen data inside base32/base64 encoded DNS query names to bypass firewalls.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "DNS egress is frequently permitted unfiltered in enterprise networks. Architectural analysis: To execute DNS Tunneling: encapsulating command-and-control instructions or exfiltrating stolen data inside base32/base64 encoded DNS query names to bypass firewalls."
  },
  {
    "id": "q_c2_m4_120",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An analyst examines a corporate proxy log and observes connections to an external server on TCP port 443, but the TLS handshake fails immediately with `Alert: Unrecognized Name`. What extension in the client TLS handshake was missing or rejected?",
    "options": [
      "Server Name Indication (SNI - RFC 6066): the client did not provide the target hostname in the ClientHello, preventing the server from selecting the appropriate virtual host certificate.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "SNI allows multi-tenant web servers on a single IP to present the correct SSL certificate. Architectural analysis: Server Name Indication (SNI - RFC 6066): the client did not provide the target hostname in the ClientHello, preventing the server from selecting the appropriate virtual host certificate."
  },
  {
    "id": "q_c2_m4_121",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "What is the operational purpose of configuring TCP MSS Clamping on an enterprise VPN edge router?",
    "options": [
      "To rewrite the Maximum Segment Size advertised in passing SYN packets, forcing endpoints to send smaller packets that fit within the VPN MTU without causing fragmentation.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "MSS clamping prevents packet drops and PMTUD black holes across encapsulating tunnels. Architectural analysis: To rewrite the Maximum Segment Size advertised in passing SYN packets, forcing endpoints to send smaller packets that fit within the VPN MTU without causing fragmentation."
  },
  {
    "id": "q_c2_m4_122",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "A network tap mirrors full-duplex traffic from an enterprise core switch into a Zeek IDS sensor. If the tap is passive fiber-optic, what guarantees that the monitoring sensor cannot inadvertently transmit packets onto the production network?",
    "options": [
      "The optical splitter is physically unidirectional; the sensor receives incoming light pulses on its receive (RX) optic with the transmit (TX) fiber physically disconnected.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Passive optical TAPs guarantee fail-safe, listen-only physical isolation. Architectural analysis: The optical splitter is physically unidirectional; the sensor receives incoming light pulses on its receive (RX) optic with the transmit (TX) fiber physically disconnected."
  },
  {
    "id": "q_c2_m4_123",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An analyst investigates an active Man-in-the-Middle attack. They run `arp -a` on two separate workstations and discover that both `192.168.1.1` (Gateway) and `192.168.1.50` (File Server) resolve to the identical MAC address `00:0c:29:ab:cd:ef`. What does this indicate?",
    "options": [
      "An active ARP Cache Poisoning attack where the device with MAC 00:0c:29:ab:cd:ef has spoofed both the gateway and the file server IP addresses.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "A single MAC address claiming multiple distinct IP identities is the classic indicator of ARP spoofing. Architectural analysis: An active ARP Cache Poisoning attack where the device with MAC 00:0c:29:ab:cd:ef has spoofed both the gateway and the file server IP addresses."
  },
  {
    "id": "q_c2_m4_124",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "What is the purpose of the TCP Selective Acknowledgment (SACK - RFC 2018) option during high-speed data transmission?",
    "options": [
      "It allows the receiver to explicitly inform the sender of all non-contiguous packets received, so the sender retransmits only the missing segments rather than the entire window.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "SACK drastically accelerates recovery on lossy or congested high-throughput paths. Architectural analysis: It allows the receiver to explicitly inform the sender of all non-contiguous packets received, so the sender retransmits only the missing segments rather than the entire window."
  },
  {
    "id": "q_c2_m4_125",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "Why does an enterprise next-generation firewall (NGFW) perform Deep Packet Inspection (DPI) rather than relying solely on Layer 4 port-based rules?",
    "options": [
      "Because applications can run on non-standard ports (e.g., SSH on port 443, or web traffic on port 8080); DPI inspects payload signatures to enforce application-layer governance regardless of port.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Port numbers are conventions, not guarantees; App-ID identifies protocols by signature. Architectural analysis: Because applications can run on non-standard ports (e.g., SSH on port 443, or web traffic on port 8080); DPI inspects payload signatures to enforce application-layer governance regardless of port."
  },
  {
    "id": "q_c2_m4_126",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An internal Linux server logs repeated kernel messages: `TCP: request_sock_TCP: Possible SYN flooding on port 80. Dropping request. Check SNMP counters.` What defensive action should be taken?",
    "options": [
      "Verify and enable `net.ipv4.tcp_syncookies = 1` in `/etc/sysctl.conf` and increase the backlog queue `net.ipv4.tcp_max_syn_backlog`.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Enabling SYN cookies allows the Linux kernel to survive SYN exhaustion without dropping legitimate connections. Architectural analysis: Verify and enable `net.ipv4.tcp_syncookies = 1` in `/etc/sysctl.conf` and increase the backlog queue `net.ipv4.tcp_max_syn_backlog`."
  },
  {
    "id": "q_c2_m4_127",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "What parameter in the TCP header ensures that a segment does not loop indefinitely between two misconfigured routers?",
    "options": [
      "TCP does not have a hop limit; loop prevention is handled by the Layer 3 IP header's Time-to-Live (TTL) or IPv6 Hop Limit field.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Transport protocols delegate packet lifetime and loop termination entirely to Layer 3. Architectural analysis: TCP does not have a hop limit; loop prevention is handled by the Layer 3 IP header's Time-to-Live (TTL) or IPv6 Hop Limit field."
  },
  {
    "id": "q_c2_m4_128",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An auditor reviews an enterprise firewall policy and flags: `ALLOW TCP ANY ANY eq 23`. Why is Telnet considered an unacceptable administrative protocol in modern cybersecurity baselines?",
    "options": [
      "Telnet transmits all keystrokes, administrative usernames, and passwords in cleartext without encryption, vulnerable to packet sniffing on any intermediate network segment.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Telnet lacks cryptographic confidentiality and integrity; SSH is the mandatory replacement. Architectural analysis: Telnet transmits all keystrokes, administrative usernames, and passwords in cleartext without encryption, vulnerable to packet sniffing on any intermediate network segment."
  },
  {
    "id": "q_c2_m4_129",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "An analyst reviews a capture of an HTTP file download and notices multiple duplicate ACKs sent by the client, followed by the server transmitting a single packet and resuming full-speed transfer. What TCP mechanism occurred?",
    "options": [
      "Fast Retransmit triggered by three duplicate ACKs: the sender retransmitted the single missing packet without waiting for the retransmission timeout timer to expire.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "Fast Retransmit accelerates loss recovery upon receiving 3 duplicate ACKs. Architectural analysis: Fast Retransmit triggered by three duplicate ACKs: the sender retransmitted the single missing packet without waiting for the retransmission timeout timer to expire."
  },
  {
    "id": "q_c2_m4_130",
    "topic": "Transport Layer Forensics & Exploitation",
    "difficulty": "difficult",
    "q": "What is the security hazard of leaving the default community string `public` enabled on devices running SNMPv1 or SNMPv2c?",
    "options": [
      "Unauthenticated attackers on the network can query the entire device configuration, routing tables, interface statistics, and internal IP address lists.",
      "The Layer 2 switch drops all frames due to Spanning Tree Bridge Protocol Data Unit violations",
      "The client operating system automatically initiates an unencrypted TFTP fallback lease",
      "The router re-encapsulates the frame into an untrusted GRE tunnel with zero authentication"
    ],
    "correct": 0,
    "explanation": "SNMP community strings act as cleartext passwords; `public` is universally scanned and exploited. Architectural analysis: Unauthenticated attackers on the network can query the entire device configuration, routing tables, interface statistics, and internal IP address lists."
  },
  {
    "id": "q_c2_m4_131",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the operational consequence of setting `ip link set dev eth0 promisc on` on a Linux monitoring sensor?",
    "options": [
      "The network interface passes all received Layer 2 frames to the kernel, regardless of whether the destination MAC matches the host.",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: The network interface passes all received Layer 2 frames to the kernel, regardless of whether the destination MAC matches the host."
  },
  {
    "id": "q_c2_m4_132",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "In an enterprise network running 802.1X, what protocol carries authentication frames between the client supplicant and the switch authenticator?",
    "options": [
      "Extensible Authentication Protocol over LAN (EAPOL / IEEE 802.1X)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Extensible Authentication Protocol over LAN (EAPOL / IEEE 802.1X)"
  },
  {
    "id": "q_c2_m4_133",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port and protocol does Network Time Protocol (NTP) use for clock synchronization?",
    "options": [
      "UDP Port 123",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 123"
  },
  {
    "id": "q_c2_m4_134",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Domain Name System use for authoritative Zone Transfers (AXFR)?",
    "options": [
      "TCP Port 53",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 53"
  },
  {
    "id": "q_c2_m4_135",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the difference between TCP Port 20 and TCP Port 21 in active FTP?",
    "options": [
      "Port 21 carries command/control dialogue; Port 20 carries data payload transfers",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Port 21 carries command/control dialogue; Port 20 carries data payload transfers"
  },
  {
    "id": "q_c2_m4_136",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What protocol runs on UDP port 514 by default for network device logging?",
    "options": [
      "Syslog (RFC 5424)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Syslog (RFC 5424)"
  },
  {
    "id": "q_c2_m4_137",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What secure port is standardized for encrypted Syslog over TLS?",
    "options": [
      "TCP Port 6514",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 6514"
  },
  {
    "id": "q_c2_m4_138",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used by Microsoft Active Directory for Global Catalog queries over LDAP?",
    "options": [
      "TCP Port 3268 (or 3269 for Secure LDAPS)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 3268 (or 3269 for Secure LDAPS)"
  },
  {
    "id": "q_c2_m4_139",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used by Kerberos authentication services in an Active Directory domain?",
    "options": [
      "TCP/UDP Port 88",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP/UDP Port 88"
  },
  {
    "id": "q_c2_m4_140",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Internet Key Exchange (IKEv2) protocol use for IPsec VPN negotiation?",
    "options": [
      "UDP Port 500 (and UDP 4500 for NAT-Traversal)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 500 (and UDP 4500 for NAT-Traversal)"
  },
  {
    "id": "q_c2_m4_141",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What protocol does BGP use as its transport mechanism, and on which port?",
    "options": [
      "TCP Port 179",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 179"
  },
  {
    "id": "q_c2_m4_142",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does TACACS+ utilize for centralized network device AAA administration?",
    "options": [
      "TCP Port 49",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 49"
  },
  {
    "id": "q_c2_m4_143",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does RADIUS utilize for authentication and authorization?",
    "options": [
      "UDP Port 1812 (legacy UDP 1645)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 1812 (legacy UDP 1645)"
  },
  {
    "id": "q_c2_m4_144",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does RADIUS utilize for accounting telemetry?",
    "options": [
      "UDP Port 1813 (legacy UDP 1646)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 1813 (legacy UDP 1646)"
  },
  {
    "id": "q_c2_m4_145",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Simple Mail Transfer Protocol use for authenticated client email submission?",
    "options": [
      "TCP Port 587 (Submission) or 465 (SMTPS)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 587 (Submission) or 465 (SMTPS)"
  },
  {
    "id": "q_c2_m4_146",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Network File System (NFSv4) use for network storage mounts?",
    "options": [
      "TCP Port 2049",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 2049"
  },
  {
    "id": "q_c2_m4_147",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Redis in-memory database listen on by default?",
    "options": [
      "TCP Port 6379",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 6379"
  },
  {
    "id": "q_c2_m4_148",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Elasticsearch listen on for HTTP REST API queries?",
    "options": [
      "TCP Port 9200",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 9200"
  },
  {
    "id": "q_c2_m4_149",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does MongoDB database listen on by default?",
    "options": [
      "TCP Port 27017",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 27017"
  },
  {
    "id": "q_c2_m4_150",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Docker daemon listen on when exposed via unencrypted remote API?",
    "options": [
      "TCP Port 2375 (high-risk vulnerability)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 2375 (high-risk vulnerability)"
  },
  {
    "id": "q_c2_m4_151",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Docker daemon listen on when secured with TLS client certificates?",
    "options": [
      "TCP Port 2376",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 2376"
  },
  {
    "id": "q_c2_m4_152",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Kubernetes API server bind to by default for cluster control?",
    "options": [
      "TCP Port 6443",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 6443"
  },
  {
    "id": "q_c2_m4_153",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does etcd distributed key-value store listen on for Kubernetes client requests?",
    "options": [
      "TCP Port 2379",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 2379"
  },
  {
    "id": "q_c2_m4_154",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does HashiCorp Vault listen on by default for secrets management?",
    "options": [
      "TCP Port 8200",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 8200"
  },
  {
    "id": "q_c2_m4_155",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Apache Kafka use for broker client communication?",
    "options": [
      "TCP Port 9092",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 9092"
  },
  {
    "id": "q_c2_m4_156",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Memcached listen on, historically abused for massive UDP reflection attacks?",
    "options": [
      "UDP Port 11211",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 11211"
  },
  {
    "id": "q_c2_m4_157",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the risk of an exposed Kubernetes kubelet read-only port?",
    "options": [
      "TCP Port 10255 exposes internal pod metrics and container environment variables without authentication",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 10255 exposes internal pod metrics and container environment variables without authentication"
  },
  {
    "id": "q_c2_m4_158",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does the Prometheus monitoring server scrape by default?",
    "options": [
      "TCP Port 9090",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 9090"
  },
  {
    "id": "q_c2_m4_159",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Grafana metrics dashboard bind to by default?",
    "options": [
      "TCP Port 3000",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 3000"
  },
  {
    "id": "q_c2_m4_160",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used for WinRM (Windows Remote Management) over HTTPS?",
    "options": [
      "TCP Port 5986 (5985 for HTTP)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 5986 (5985 for HTTP)"
  },
  {
    "id": "q_c2_m4_161",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used by Oracle Database TNS listener by default?",
    "options": [
      "TCP Port 1521",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 1521"
  },
  {
    "id": "q_c2_m4_162",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used by VNC (Virtual Network Computing) remote desktop?",
    "options": [
      "TCP Port 5900",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 5900"
  },
  {
    "id": "q_c2_m4_163",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is used by SIP (Session Initiation Protocol) for VoIP signaling over UDP/TCP?",
    "options": [
      "Port 5060 (5061 for TLS)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Port 5060 (5061 for TLS)"
  },
  {
    "id": "q_c2_m4_164",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does BIND DNS server use for local administrative control via rndc?",
    "options": [
      "TCP Port 953",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 953"
  },
  {
    "id": "q_c2_m4_165",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does Squid HTTP caching proxy listen on by default?",
    "options": [
      "TCP Port 3128",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 3128"
  },
  {
    "id": "q_c2_m4_166",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does OpenVPN use by default for secure client tunnels?",
    "options": [
      "UDP Port 1194",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 1194"
  },
  {
    "id": "q_c2_m4_167",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does WireGuard VPN use by default for modern encrypted links?",
    "options": [
      "UDP Port 51820",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 51820"
  },
  {
    "id": "q_c2_m4_168",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does IPsec Encapsulating Security Payload (ESP) use at Layer 4?",
    "options": [
      "ESP has no port number; it is assigned IP Protocol number 50 directly in the IPv4/IPv6 header",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: ESP has no port number; it is assigned IP Protocol number 50 directly in the IPv4/IPv6 header"
  },
  {
    "id": "q_c2_m4_169",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does IPsec Authentication Header (AH) use at Layer 4?",
    "options": [
      "AH has no port number; it is assigned IP Protocol number 51 directly in the IPv4/IPv6 header",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: AH has no port number; it is assigned IP Protocol number 51 directly in the IPv4/IPv6 header"
  },
  {
    "id": "q_c2_m4_170",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is assigned to GRE (Generic Routing Encapsulation) at Layer 4?",
    "options": [
      "GRE has no port number; it is assigned IP Protocol number 47",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: GRE has no port number; it is assigned IP Protocol number 47"
  },
  {
    "id": "q_c2_m4_171",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does OSPF (Open Shortest Path First) use at Layer 4?",
    "options": [
      "OSPF operates directly over IP using IP Protocol number 89 with zero TCP or UDP headers",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: OSPF operates directly over IP using IP Protocol number 89 with zero TCP or UDP headers"
  },
  {
    "id": "q_c2_m4_172",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port does EIGRP routing protocol use at Layer 4?",
    "options": [
      "EIGRP operates directly over IP using IP Protocol number 88",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: EIGRP operates directly over IP using IP Protocol number 88"
  },
  {
    "id": "q_c2_m4_173",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is assigned to ICMP at Layer 3/4?",
    "options": [
      "ICMP has no port number; it is identified by IP Protocol number 1",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: ICMP has no port number; it is identified by IP Protocol number 1"
  },
  {
    "id": "q_c2_m4_174",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What port is assigned to ICMPv6 at Layer 3/4?",
    "options": [
      "ICMPv6 has no port number; it is identified by Next Header value 58",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: ICMPv6 has no port number; it is identified by Next Header value 58"
  },
  {
    "id": "q_c2_m4_175",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the maximum number of concurrent TCP connections a single IP address can theoretically establish to a single remote IP:Port?",
    "options": [
      "Approximately 64,512 (limited by the available 16-bit ephemeral source port range minus system reserved ports)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Approximately 64,512 (limited by the available 16-bit ephemeral source port range minus system reserved ports)"
  },
  {
    "id": "q_c2_m4_176",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the purpose of the TCP Timestamp option (RFC 7323)?",
    "options": [
      "To compute accurate Round-Trip Time Measurement (RTTM) and protect against wrapped sequence numbers (PAWS) on gigabit links",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: To compute accurate Round-Trip Time Measurement (RTTM) and protect against wrapped sequence numbers (PAWS) on gigabit links"
  },
  {
    "id": "q_c2_m4_177",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What flag combination is present in a TCP SYN-ACK packet?",
    "options": [
      "SYN=1, ACK=1, with all other control flags 0",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: SYN=1, ACK=1, with all other control flags 0"
  },
  {
    "id": "q_c2_m4_178",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What flag combination is present in a TCP Null scan packet designed to bypass stateless firewalls?",
    "options": [
      "All control flags set to 0 (SYN=0, ACK=0, FIN=0, RST=0, PSH=0, URG=0)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: All control flags set to 0 (SYN=0, ACK=0, FIN=0, RST=0, PSH=0, URG=0)"
  },
  {
    "id": "q_c2_m4_179",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What flag combination is present in a TCP FIN scan packet?",
    "options": [
      "FIN=1, with all other control flags 0",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: FIN=1, with all other control flags 0"
  },
  {
    "id": "q_c2_m4_180",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the role of the URG (Urgent) flag and Urgent Pointer in legacy Telnet sessions?",
    "options": [
      "To transmit interrupt signals (such as Ctrl+C) that bypass queued data buffers for immediate processing",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: To transmit interrupt signals (such as Ctrl+C) that bypass queued data buffers for immediate processing"
  },
  {
    "id": "q_c2_m4_181",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "Why do modern web application firewalls strip or block packets with the URG flag set?",
    "options": [
      "Because urgent processing varies widely across operating systems and can be abused to evade deep packet inspection engines",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Because urgent processing varies widely across operating systems and can be abused to evade deep packet inspection engines"
  },
  {
    "id": "q_c2_m4_182",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What happens when an endpoint sends an ICMP Echo Request to an IPv4 broadcast address (e.g., 192.168.1.255)?",
    "options": [
      "In early networks, this triggered a Smurf DDoS amplification attack; modern hosts are hardcoded to ignore broadcast pings",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: In early networks, this triggered a Smurf DDoS amplification attack; modern hosts are hardcoded to ignore broadcast pings"
  },
  {
    "id": "q_c2_m4_183",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is an Fraggle Attack?",
    "options": [
      "A DDoS amplification attack similar to Smurf, but utilizing UDP echo packets (port 7) sent to broadcast addresses instead of ICMP",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: A DDoS amplification attack similar to Smurf, but utilizing UDP echo packets (port 7) sent to broadcast addresses instead of ICMP"
  },
  {
    "id": "q_c2_m4_184",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the function of the TCP Window Scale factor?",
    "options": [
      "It allows the 16-bit window field to be shifted left up to 14 bits, scaling the maximum receive window from 64 KB up to 1 GB",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: It allows the 16-bit window field to be shifted left up to 14 bits, scaling the maximum receive window from 64 KB up to 1 GB"
  },
  {
    "id": "q_c2_m4_185",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the consequence of a TCP connection where the client advertises a Window Size of 0?",
    "options": [
      "Zero Window indicates the client's buffers are completely full; the server halts data transmission and periodically sends probe packets",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Zero Window indicates the client's buffers are completely full; the server halts data transmission and periodically sends probe packets"
  },
  {
    "id": "q_c2_m4_186",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the function of a TCP Keep-Alive probe?",
    "options": [
      "An empty ACK segment transmitted during idle periods to verify the remote host is alive and prevent stateful firewalls from timing out the session",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: An empty ACK segment transmitted during idle periods to verify the remote host is alive and prevent stateful firewalls from timing out the session"
  },
  {
    "id": "q_c2_m4_187",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "How long do standard enterprise stateful firewalls maintain an idle TCP connection in their state table?",
    "options": [
      "Typically 60 minutes for established connections, versus 30–60 seconds for UDP sessions",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Typically 60 minutes for established connections, versus 30–60 seconds for UDP sessions"
  },
  {
    "id": "q_c2_m4_188",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "Why do UDP sessions time out much faster in firewall state tables than TCP sessions?",
    "options": [
      "Because UDP has no explicit close handshake (FIN/RST), firewalls must use short timers (e.g., 30s) to prune dead session states",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Because UDP has no explicit close handshake (FIN/RST), firewalls must use short timers (e.g., 30s) to prune dead session states"
  },
  {
    "id": "q_c2_m4_189",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the default TCP SYN retransmission timeout on most Linux distributions?",
    "options": [
      "Initial probe at 1 second, with exponential backoff (1s, 2s, 4s, 8s, 16s, 32s) totaling approximately 63–120 seconds",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Initial probe at 1 second, with exponential backoff (1s, 2s, 4s, 8s, 16s, 32s) totaling approximately 63–120 seconds"
  },
  {
    "id": "q_c2_m4_190",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the purpose of the `ss -s` command on a Linux security monitoring host?",
    "options": [
      "Displays summary statistics of total allocated sockets, TCP connections in each state, and memory consumption",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Displays summary statistics of total allocated sockets, TCP connections in each state, and memory consumption"
  },
  {
    "id": "q_c2_m4_191",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "How does an attacker exploit an open NetBIOS Name Service (port 137 UDP)?",
    "options": [
      "By querying the NetBIOS name table to extract the machine name, logged-in domain, workgroup, and network adapter MAC address",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: By querying the NetBIOS name table to extract the machine name, logged-in domain, workgroup, and network adapter MAC address"
  },
  {
    "id": "q_c2_m4_192",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What protocol runs on TCP port 111 in Unix/Linux networks?",
    "options": [
      "RPCbind / Portmapper (maps RPC program numbers to universal port numbers; high reconnaissance value)",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: RPCbind / Portmapper (maps RPC program numbers to universal port numbers; high reconnaissance value)"
  },
  {
    "id": "q_c2_m4_193",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the function of the `netstat -r` command on Windows or Linux?",
    "options": [
      "Displays the active kernel Layer 3 routing table, default gateway, and network interface metrics",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Displays the active kernel Layer 3 routing table, default gateway, and network interface metrics"
  },
  {
    "id": "q_c2_m4_194",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What tool can an administrator use on Windows to identify which exact Process ID (PID) owns a listening TCP port?",
    "options": [
      "`netstat -ano` (the -o parameter reveals Owning Process PID), cross-referenced with Task Manager or `Get-Process`",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: `netstat -ano` (the -o parameter reveals Owning Process PID), cross-referenced with Task Manager or `Get-Process`"
  },
  {
    "id": "q_c2_m4_195",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the default port for the unencrypted Telnet protocol?",
    "options": [
      "TCP Port 23",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 23"
  },
  {
    "id": "q_c2_m4_196",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the default port for the unencrypted FTP command control channel?",
    "options": [
      "TCP Port 21",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TCP Port 21"
  },
  {
    "id": "q_c2_m4_197",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the default port for TFTP (Trivial File Transfer Protocol)?",
    "options": [
      "UDP Port 69",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: UDP Port 69"
  },
  {
    "id": "q_c2_m4_198",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What security risk is created by TFTP running on UDP port 69 on internal subnets?",
    "options": [
      "TFTP has zero authentication and zero encryption; anyone on the segment can download firmware, router configurations, and backup files",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: TFTP has zero authentication and zero encryption; anyone on the segment can download firmware, router configurations, and backup files"
  },
  {
    "id": "q_c2_m4_199",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the recommended defensive configuration for edge firewall egress filtering regarding SMB port 445?",
    "options": [
      "Drop all outbound traffic to destination port 445 TCP universally across all perimeter interfaces",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Drop all outbound traffic to destination port 445 TCP universally across all perimeter interfaces"
  },
  {
    "id": "q_c2_m4_200",
    "topic": "Enterprise Protocols, Scenarios & Hardening",
    "difficulty": "difficult",
    "q": "What is the recommended defensive configuration for database ports on cloud virtual machines?",
    "options": [
      "Bind exclusively to localhost or internal VPC private subnets; strictly prohibit public 0.0.0.0/0 ingress rules",
      "The switch disables the port due to Spanning Tree Protocol BPDU guard violations",
      "The packet is encapsulated into an unencrypted GRE tunnel automatically",
      "The operating system switches to an unauthenticated broadcast fallback state"
    ],
    "correct": 0,
    "explanation": "Hardened enterprise protocol behavior: Bind exclusively to localhost or internal VPC private subnets; strictly prohibit public 0.0.0.0/0 ingress rules"
  }
];

export const module4QuestionBank = c2_module4QuestionBank;
export default c2_module4QuestionBank;
