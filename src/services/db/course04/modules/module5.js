/**
 * Course 04: Python for Cybersecurity — Module 5 Data
 * Module ID: mod_c4_5 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module5Data = {
  "id": "mod_c4_5",
  "title": "Module 5: Networking with Python",
  "description": "Write loopback-scoped TCP sockets, fault-tolerant HTTP JSON API clients with explicit timeouts and TLS verification, and big-endian binary protocol decoders using Python struct.",
  "order": 5,
  "quiz": {
    "id": "quiz_mod_c4_5",
    "title": "Module 5: Networking with Python Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
      {
        "id": "q_c4_m5_001",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Which ordered pair identifies a TCP/IP communication endpoint inside an operating system socket?",
        "options": [
          "(MAC address, hostname)",
          "(Process PID, file mode)",
          "(IP address, port number)",
          "(Username, URL path)"
        ],
        "correct": 2,
        "explanation": "A TCP/IP socket endpoint binds to an IP address and a 16-bit port number."
      },
      {
        "id": "q_c4_m5_002",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "Why does binding a diagnostic Python HTTP service to `'0.0.0.0'` instead of `'127.0.0.1'` during field triage introduce severe risk?",
        "options": [
          "`0.0.0.0` automatically encrypts traffic with TLSv1.0",
          "`0.0.0.0` binds strictly to IPv6 interfaces only",
          "`0.0.0.0` accepts inbound connections across all active physical and virtual NICs, exposing an unauthenticated debug listener to LAN or VPN peers",
          "`0.0.0.0` disables `recv()` buffering inside Python"
        ],
        "correct": 2,
        "explanation": "Loopback 127.0.0.1 isolates listeners strictly to local processes, whereas 0.0.0.0 opens listeners across every host interface."
      },
      {
        "id": "q_c4_m5_003",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "What does passing `socket.AF_INET` as the first argument to `socket.socket()` specify?",
        "options": [
          "The 32-bit IPv4 address family",
          "A local Unix domain pipe",
          "UDP datagram framing",
          "The 128-bit IPv6 address family"
        ],
        "correct": 0,
        "explanation": "socket.AF_INET selects IPv4 addressing, whereas AF_INET6 selects IPv6."
      },
      {
        "id": "q_c4_m5_004",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "In a running TCP server handling multiple clients, why does `srv.accept()` return a brand-new socket object `conn` distinct from the listening socket `srv`?",
        "options": [
          "`srv` continues passively queuing new incoming client handshakes while each connected `conn` socket uniquely represents one established 4-tuple session",
          "`srv` switches permanently into UDP mode once a peer connects",
          "Python sockets can only send data in one direction per object",
          "Returning a new object releases the server port immediately back to port 0"
        ],
        "correct": 0,
        "explanation": "Listening sockets only manage incoming connection queues; connected sockets returned by accept() handle per-session I/O."
      },
      {
        "id": "q_c4_m5_005",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Which Python `socket` type constant configures a connectionless UDP datagram socket?",
        "options": [
          "`socket.SOCK_RAW`",
          "`socket.SOCK_STREAM`",
          "`socket.SOCK_DGRAM`",
          "`socket.SOCK_SEQPACKET`"
        ],
        "correct": 2,
        "explanation": "SOCK_DGRAM selects UDP datagrams, whereas SOCK_STREAM selects TCP byte streams."
      },
      {
        "id": "q_c4_m5_006",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "When `m05_networking.py` checks `port > 1023` after calling `srv.bind(('127.0.0.1', 0))`, what architectural property is it verifying?",
        "options": [
          "Port 0 forced TLS handshake negotiation before `listen()`",
          "The IPv4 checksum bypassed verification on localhost",
          "The OS selected an unprivileged dynamic ephemeral port automatically instead of reserving a fixed well-known port in [1, 1023]",
          "The loopback adapter translated port 0 into privileged HTTP port 80"
        ],
        "correct": 2,
        "explanation": "Binding port 0 delegates non-conflicting ephemeral port selection above privileged range 1..1023 directly to the OS kernel."
      },
      {
        "id": "q_c4_m5_007",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "What range of TCP/UDP port numbers comprises all valid addressable non-zero ports in standard 16-bit headers?",
        "options": [
          "1 to 1,024",
          "1 to 32,767",
          "1 to 65,535",
          "1 to 16,384"
        ],
        "correct": 2,
        "explanation": "A 16-bit unsigned integer spans 0..65,535, where 1..65,535 address live endpoints and 0 triggers OS auto-assignment."
      },
      {
        "id": "q_c4_m5_008",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "What is the IPv6 loopback literal equivalent to IPv4 `'127.0.0.1'` when binding a strictly local `AF_INET6` diagnostic listener?",
        "options": [
          "`fe80::1`",
          "`::`",
          "`::1`",
          "`ff02::1`"
        ],
        "correct": 2,
        "explanation": "`::1` is the IPv6 loopback address confined to the local host, whereas `::` binds across all IPv6 interfaces like IPv4 `0.0.0.0`."
      },
      {
        "id": "q_c4_m5_009",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Which range defines the official IANA dynamic / ephemeral port allocation block?",
        "options": [
          "49,152 to 65,535",
          "1,024 to 4,999",
          "1 to 1,023",
          "10,000 to 20,000"
        ],
        "correct": 0,
        "explanation": "IANA assigns 1..1023 as well-known, 1024..49151 as registered, and 49152..65535 as dynamic/ephemeral."
      },
      {
        "id": "q_c4_m5_010",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "A client connects outward to `127.0.0.1:8080`. Who chooses the client's own local source port number?",
        "options": [
          "The client's operating system kernel assigns an unused ephemeral source port automatically",
          "The remote server assigns it during DNS resolution",
          "Python's `json` module calculates it from the payload length",
          "The source port is always identical to destination port 8080"
        ],
        "correct": 0,
        "explanation": "Unless a client calls bind() explicitly, its OS kernel assigns a temporary ephemeral source port for the outgoing connection."
      },
      {
        "id": "q_c4_m5_011",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Why must every Module 5 lab example restrict network connections and listeners strictly to `127.0.0.1` or provided data?",
        "options": [
          "Network automation directed at systems without explicit ownership or written authorization violates policy and computer-misuse laws",
          "Python's `socket` module prohibits external DNS resolution on Windows",
          "External routers strip big-endian `struct` bytes automatically",
          "Port 0 fails to allocate above 1023 outside loopback"
        ],
        "correct": 0,
        "explanation": "Authorised scope is mandatory: running active network probes against third-party systems without permission can break laws."
      },
      {
        "id": "q_c4_m5_012",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "A Python daemon intended purely for inter-process communication on a laptop binds to `('::', 9000)`. What subtle mistake occurred?",
        "options": [
          "`::` is the IPv6 wildcard address equivalent to `0.0.0.0`, exposing port 9000 on external IPv6 interfaces rather than loopback `::1`",
          "`::` restricts traffic only to IPv4 loopback peers",
          "Port 9000 cannot receive TCP `SOCK_STREAM` traffic on IPv6",
          "`::` disables `SO_REUSEADDR` inside the kernel"
        ],
        "correct": 0,
        "explanation": "Just as `0.0.0.0` exposes all IPv4 interfaces, `::` exposes all IPv6 interfaces instead of restricting to host-local `::1`."
      },
      {
        "id": "q_c4_m5_013",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Which Python socket type implements reliable, ordered, connection-oriented TCP communication?",
        "options": [
          "`SOCK_DGRAM`",
          "`AF_INET`",
          "`SOCK_STREAM`",
          "`SO_REUSEADDR`"
        ],
        "correct": 2,
        "explanation": "SOCK_STREAM establishes a connected reliable TCP byte stream."
      },
      {
        "id": "q_c4_m5_014",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "On an office `/24` Wi-Fi subnet (`192.168.1.0/24`), how many potential external peer hosts can probe an unauthenticated dev listener bound to `0.0.0.0` compared to `127.0.0.1`?",
        "options": [
          "`0.0.0.0` exposes the listener to all usable peers on the subnet (up to 253 other hosts on that `/24`), whereas `127.0.0.1` permits zero remote peers",
          "Both configurations allow 254 external hosts",
          "`127.0.0.1` exposes 127 peers while `0.0.0.0` exposes none",
          "Neither binding accepts TCP connections without `certifi`"
        ],
        "correct": 0,
        "explanation": "Loopback 127.0.0.1 rejects all off-host packets; wildcard 0.0.0.0 opens the listening port on the subnet NIC."
      },
      {
        "id": "q_c4_m5_015",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "medium",
        "q": "Why does `m05_networking.py` start the TCP echo server inside a daemon `threading.Thread`?",
        "options": [
          "So Windows Firewall treats connections as UDP datagrams",
          "Because `socket.bind()` throws `RuntimeError` on the main thread",
          "Because `SOCK_STREAM` requires one thread per 8 bytes sent",
          "So the server `accept()` loop and client `create_connection()` execute concurrently within one single-file demo script"
        ],
        "correct": 3,
        "explanation": "Running the blocking accept() server in a daemon thread enables client and server code to execute cleanly in one self-contained lab script."
      },
      {
        "id": "q_c4_m5_016",
        "topic": "C04-M05-L01: Sockets & Client-Server Model",
        "difficulty": "difficult",
        "q": "Why should production high-concurrency security collectors avoid spawning an unbounded raw `threading.Thread` per incoming TCP connection?",
        "options": [
          "`threading.Thread` disables Python's `with` context manager cleanup",
          "Unbounded thread-per-connection allocation exposes memory exhaustion under connection floods; scalable servers use `asyncio`, bounded thread pools, or hardened frameworks",
          "`threading` corrupts big-endian integers unpacked via `struct`",
          "Threads cannot hold `AF_INET` sockets simultaneously"
        ],
        "correct": 1,
        "explanation": "Each OS thread allocates stack RAM and scheduler overhead; unbounded thread creation lets attackers exhaust host memory."
      },
      {
        "id": "q_c4_m5_017",
        "topic": "C04-M05-L02: Writing a TCP Server and Client",
        "difficulty": "medium",
        "q": "Why does `m05_networking.py` call `srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)` before `bind()`?",
        "options": [
          "To compress payloads sent over loopback automatically",
          "To enable TLS certificate verification on raw sockets",
          "To permit quick port rebinding across restarts even when recently closed sockets remain briefly in OS `TIME_WAIT`",
          "To double the maximum `recv()` buffer beyond 1024 bytes"
        ],
        "correct": 2,
        "explanation": "SO_REUSEADDR allows rapid service restarts without hitting 'Address already in use' due to lingering TIME_WAIT sockets."
      },
      {
        "id": "q_c4_m5_018",
        "topic": "C04-M05-L02: Writing a TCP Server and Client",
        "difficulty": "difficult",
        "q": "Why can calling low-level `sock.send(large_payload)` silently corrupt a custom log-forwarding protocol whereas `sock.sendall(large_payload)` avoids that bug?",
        "options": [
          "`send()` converts big-endian bytes to little-endian automatically",
          "`sendall()` skips TCP handshake setup for payloads under 1 KiB",
          "`send()` may write fewer bytes than requested when kernel buffers tighten, returning only the partial byte count written unless the caller loops manually; `sendall()` transmits the full buffer or fails loudly",
          "`send()` strips trailing newline delimiters without notifying Python"
        ],
        "correct": 2,
        "explanation": "send() is permitted to return a count smaller than len(payload); ignoring its return value silently truncates transmissions."
      },
      {
        "id": "q_c4_m5_019",
        "topic": "C04-M05-L02: Writing a TCP Server and Client",
        "difficulty": "medium",
        "q": "After `srv.bind((HOST, 0))` and `srv.listen(1)`, which method retrieves the concrete ephemeral TCP port selected by the OS?",
        "options": [
          "`srv.getsockname()[1]`",
          "`srv.getpeername()[0]`",
          "`srv.timeout`",
          "`srv.recv(1)`"
        ],
        "correct": 0,
        "explanation": "srv.getsockname() returns the bound (host, port) tuple, so index [1] yields the assigned integer port."
      },
      {
        "id": "q_c4_m5_020",
        "topic": "C04-M05-L02: Writing a TCP Server and Client",
        "difficulty": "difficult",
        "q": "A client sends two separate messages `cli.sendall(b'ALERT_1')` and `cli.sendall(b'ALERT_2')` 2 milliseconds apart. The server calls `conn.recv(1024)` once and receives `b'ALERT_1ALERT_2'`. Why?",
        "options": [
          "TCP provides a continuous unframed byte stream with no message boundaries, allowing OS kernel buffers/Nagle coalescing to merge consecutive writes into a single `recv()` read",
          "Python's `sendall()` caches strings across threads unless flushed manually",
          "UDP fallback merged both datagrams on port 0",
          "`conn.recv(1024)` retries automatically until two messages arrive"
        ],
        "correct": 0,
        "explanation": "TCP preserves byte order, not sender write boundaries; coalescing or mid-message splits are completely normal on stream sockets."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m5_l1",
      "title": "Lesson 5.1: Sockets, Endpoint Addressing & Client-Server Architecture",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Maps operating-system socket endpoints, IPv4/IPv6 address families, TCP vs. UDP socket types, ephemeral port assignment, and loopback vs. wildcard binding exposure.",
      "learning_objectives": [
        "Explain how an OS socket endpoint combines protocol family, transport semantics, IP address, and port tuple.",
        "Distinguish AF_INET vs. AF_INET6 and SOCK_STREAM vs. SOCK_DGRAM when creating Python sockets.",
        "Evaluate the security boundary difference between binding to loopback 127.0.0.1 versus wildcard 0.0.0.0.",
        "Trace how server listening sockets, accepted per-client sockets, and OS-chosen ephemeral client ports interact."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-01",
          "figure_number": "Figure 5.1",
          "lesson_id": "les_c4_m5_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l01_socket_endpoint_addressing.png",
          "title": "OS Socket Endpoint Addressing: Loopback (127.0.0.1) vs. All Interfaces (0.0.0.0)",
          "purpose": "Contrast local-only 127.0.0.1 loopback binding against 0.0.0.0 multi-interface exposure and show server bind/listen/accept alongside ephemeral client port allocation.",
          "accessibility_description": "Side-by-side host network stack diagram comparing a socket bound to 127.0.0.1 accepting only local processes against 0.0.0.0 exposed on external NICs, with a client opening an ephemeral port.",
          "walkthrough_section": "Diagram Walkthrough: Endpoint Addressing & Interface Scope"
        },
        {
          "figure_id": "fig-04-05-02",
          "figure_number": "Figure 5.2",
          "lesson_id": "les_c4_m5_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l01_socket_types_stream_vs_datagram.png",
          "title": "Python socket Constants: AF_INET/AF_INET6 and SOCK_STREAM vs. SOCK_DGRAM",
          "purpose": "Illustrate the socket constructor matrix combining IPv4/IPv6 address families with connected byte-stream TCP (SOCK_STREAM) and connectionless datagram UDP (SOCK_DGRAM).",
          "accessibility_description": "Matrix diagram mapping AF_INET and AF_INET6 rows against SOCK_STREAM TCP reliable stream and SOCK_DGRAM UDP datagram semantics.",
          "walkthrough_section": "Diagram Walkthrough: Socket Family & Transport Matrix"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-01",
          "title": "Figure 5.1: Loopback (127.0.0.1) vs. All Interfaces (0.0.0.0) Socket Binding",
          "url": "/assets/courses/cyber-04/c04_m5_l01_socket_endpoint_addressing.png",
          "caption": "Figure 5.1: Side-by-side comparison of local-only 127.0.0.1 loopback binding blocking LAN traffic versus multi-interface 0.0.0.0 exposure.",
          "alt": "Comparison contrasting Safe Local Default bind(('127.0.0.1', port)) accepting only same-machine client connections via accept() into conn while blocking 254 external Wi-Fi/LAN devices against Exposed Mode bind(('0.0.0.0', port)) listening on every adapter"
        },
        {
          "id": "fig-04-05-02",
          "title": "Figure 5.2: Choosing Socket Address Families & Transport Types in Python",
          "url": "/assets/courses/cyber-04/c04_m5_l01_socket_types_stream_vs_datagram.png",
          "caption": "Figure 5.2: Socket constructor matrix pairing IPv4/IPv6 families (AF_INET/AF_INET6) with TCP streams (SOCK_STREAM) and UDP datagrams (SOCK_DGRAM).",
          "alt": "Two-by-two matrix combining AF_INET (IPv4 32-bit addresses like 127.0.0.1) and AF_INET6 (IPv6 128-bit addresses like ::1) rows with SOCK_STREAM (TCP reliable ordered stream for HTTP APIs and SSH) and SOCK_DGRAM (UDP datagrams for Syslog alerts and DNS queries) columns"
        }
      ],
      "lab_resources": [
        {
          "name": "m05_networking.py",
          "url": "/assets/courses/cyber-04/labs/m05_networking.py",
          "description": "Module 5 sockets, HTTP client/server & struct binary decoder lab script"
        }
      ],
      "content": "## 1. Endpoints on the Wire: Turning Course 02 Packet Theory Into Executable Python\n\nEvery security tool that communicates beyond local disk files—SIEM alert forwarders, threat-intelligence API enrichers, vulnerability health checkers, and packet decoders—operates through **operating-system sockets**. Whereas Course 02 explained IP addresses, TCP handshakes, ports, and protocol headers conceptually on network topologies, this module bridges theory into execution-tested Python code built exclusively over the standard library (`socket`, `http.server`, `urllib.request`, `ssl`, and `struct`).\n\n**Non-Negotiable Scope Rule:** Every network lab and script in Module 5 binds exclusively to your local loopback interface (`127.0.0.1`) or dissects provided local byte captures. Network code must **never** probe, scan, or connect to remote systems you do not own or lack explicit written authorization to test (Course 01 Module 7).\n\n## 2. Core Objectives for This Lesson\n\n- **Socket Endpoint Model:** Define how an OS socket couples an address family (`AF_INET` / `AF_INET6`) and transport type (`SOCK_STREAM` / `SOCK_DGRAM`) with an IP-and-port tuple.\n- **Role Asymmetry:** Trace the architectural split between a passive **server socket** (`bind`, `listen`, `accept`) and an active **client socket** (`create_connection` using an OS-assigned ephemeral source port).\n- **Interface Exposure Surface:** Contrast loopback-only binding (`127.0.0.1`) against all-interface wildcard binding (`0.0.0.0`) before exposing any local service.\n- **Port Space Arithmetic:** Quantify standard TCP/UDP port ranges, server reservation boundaries, and OS-chosen ephemeral allocation (`port > 1023`).\n\n## 3. Dissecting the OS Socket Abstraction\n\nAt the operating-system boundary, a **socket** is a kernel-managed communication endpoint identified for TCP/IP connections by the ordered pair `(IP address, port number)`. Rather than touching raw Ethernet electrical frames directly from user space, Python's built-in `socket` module wraps your OS kernel's native socket system calls:\n\n- **`socket.AF_INET` vs. `socket.AF_INET6`:** Selects the Layer-3 address family—either 32-bit IPv4 addresses (`\"127.0.0.1\"`, `\"172.30.0.20\"`) or 128-bit IPv6 addresses (`\"::1\"`, `\"fe80::1\"`).\n- **`socket.SOCK_STREAM` vs. `socket.SOCK_DGRAM`:** Selects Layer-4 transport semantics—either **TCP** (`SOCK_STREAM`), delivering a reliable, ordered, bidirectional byte stream over an established handshake, or **UDP** (`SOCK_DGRAM`), exchanging independent connectionless datagrams with no built-in delivery guarantee.\n\n### Listening Socket vs. Connected Session Socket\n\nBeginners frequently assume a server handles traffic over a single socket object for its lifetime. In TCP, two distinct socket roles collaborate:\n\n1. **Listening (Passive) Socket (`srv`):** Created first by the server, bound to a local `(IP, port)` pair, and placed into listening mode via `srv.listen(backlog)`. This socket never sends or receives application payload bytes directly—its sole job is queuing incoming TCP three-way handshakes.\n2. **Connected (Active) Socket (`conn`):** Returned each time `srv.accept()` completes an incoming client handshake, paired with the remote `(client_ip, client_port)` tuple. Inside a multi-client service, one listening socket may spawn dozens of simultaneous connected `conn` sockets while the client connects outward from a temporary **ephemeral port** picked automatically by its OS kernel.\n\n## 4. Loopback (`127.0.0.1`) vs. Wildcard (`0.0.0.0`) Binding\n\nChoosing the IP string passed to `srv.bind((host, port))` is an immediate architectural security decision (`Figure 5.1`):\n\n- **Loopback (`\"127.0.0.1\"` / `\"::1\"`):** Instructs the kernel to accept packets originating *strictly from software running on the exact same machine*. Network packets arriving over Wi-Fi, Ethernet, or VPN adapters never reach a loopback socket—making `127.0.0.1` the safe default for local IPC, unit test stubs, and development listeners.\n- **Wildcard (`\"0.0.0.0\"` / `\"::\"`):** Binds across *every active network interface on the host simultaneously*—Ethernet, corporate VPN, wireless LAN, and public links alike. Binding an unauthenticated prototype or lab daemon to `0.0.0.0` exposes it instantly to every peer on your LAN or coffee-shop network unless firewall rules block inbound ports.\n\n![Figure 5.1: Loopback (127.0.0.1) vs. All Interfaces (0.0.0.0) Socket Binding](/assets/courses/cyber-04/c04_m5_l01_socket_endpoint_addressing.png)\n\n*Figure 5.1: Side-by-side comparison of local-only 127.0.0.1 loopback binding blocking LAN traffic versus multi-interface 0.0.0.0 exposure.*\n\n### Diagram Walkthrough: Endpoint Addressing & Interface Scope (`Figure 5.1`)\n\n- **Local-Only Loopback (`bind(('127.0.0.1', port))`):** Only the same-machine client app (assigned an OS ephemeral port `> 1023`) connects to the server listening socket -> `accept()` -> connected session socket (`conn`), while `254` external LAN/Wi-Fi devices are blocked cleanly at the loopback boundary.\n- **Exposed All-Interface Mode (`bind(('0.0.0.0', port))`) & Port `0` Tip:** Binding `0.0.0.0` opens listeners across every adapter (Loopback, Wi-Fi, Ethernet, VPN) so LAN peers can connect unless firewall and auth controls restrict access; calling `bind(('127.0.0.1', 0))` lets the OS assign a free non-root port (`1–65,535`, above `1023`).\n\n![Figure 5.2: Choosing Socket Address Families & Transport Types in Python](/assets/courses/cyber-04/c04_m5_l01_socket_types_stream_vs_datagram.png)\n\n*Figure 5.2: Socket constructor matrix pairing IPv4/IPv6 families (AF_INET/AF_INET6) with TCP streams (SOCK_STREAM) and UDP datagrams (SOCK_DGRAM).*\n\n### Diagram Walkthrough: Socket Family & Transport Matrix (`Figure 5.2`)\n\n- **IPv4 vs. IPv6 Address Families (`AF_INET` / `AF_INET6`):** Select 32-bit IPv4 addresses (`'127.0.0.1'`, `'172.30.0.20'`) with `AF_INET` or 128-bit IPv6 addresses (`'::1'`, `'fe80::1'`) with `AF_INET6`—preserving the same `recv()` and `sendall()` calls across both.\n- **TCP Stream vs. UDP Datagrams (`SOCK_STREAM` / `SOCK_DGRAM`):** Pair either family with `SOCK_STREAM` for reliable, ordered TCP byte streams (`HTTP APIs`, `SSH`, log shippers) or `SOCK_DGRAM` for fast, connectionless UDP datagrams (`Syslog alerts`, `DNS queries`).\n\n## 5. Quantitative Analysis: Port Addressing & Interface Exposure\n\nVerify the 16-bit TCP/UDP port integer boundaries and ephemeral port dynamics observed when running `m05_networking.py`:\n\n:::math-steps\nStep 01: Compute total valid 16-bit port identifiers in TCP/IP headers\n$$P_{\\text{total}} = 2^{16} - 1 = 65535 \\quad (\\text{ports } 1\\dots 65535,\\text{ reserving } 0 \\text{ as OS auto-assign sentinel})$$\nResult: Passing port 0 to bind() asks the kernel to pick a free non-conflicting port dynamically\n\nStep 02: Separate well-known, registered, and IANA ephemeral port allocations\n$$P_{\\text{well-known}} = [1, 1023], \\quad P_{\\text{registered}} = [1024, 49151], \\quad P_{\\text{dynamic/ephemeral}} = [49152, 65535]$$\nResult: OS auto-assigned ports satisfy port > 1023 so test services avoid privileged root ports and fixed collisions\n\nStep 03: Quantify peer reachability growth between loopback 127.0.0.1 and an unauthenticated /24 Wi-Fi subnet bound via 0.0.0.0\n$$N_{\\text{loopback hosts}} = 1 \\quad \\text{vs.} \\quad N_{\\text{LAN peers}} = 2^{8} - 2 = 254 \\text{ external hosts able to connect}$$\nResult: Binding strictly to 127.0.0.1 shrinks network attack surface from hundreds of LAN neighbors down to local OS processes only\n:::\n\n> [!WARNING]\n> **Implicit Exposure Risk:** Frameworks and quick debug servers sometimes default to `\"0.0.0.0\"` in Docker examples or documentation snippets so containers are reachable externally. Always inspect the exact bind tuple in every third-party wrapper and force `\"127.0.0.1\"` unless explicit authentication, TLS, and firewall rules protect remote exposure.\n\n## 6. Module Lexicon & Key Definitions\n\n- **Socket:** An operating-system communication endpoint identified for TCP/IP traffic by an `(IP address, port)` tuple (`AF_INET`/`AF_INET6` and `SOCK_STREAM`/`SOCK_DGRAM`).\n- **Loopback (`127.0.0.1` / `::1`):** A virtual host-local network address guaranteed never to leave the local machine onto external network links.\n- **Ephemeral Port:** A temporary non-privileged source port (typically above `1023`, commonly `49152–65535` per IANA) selected automatically by the OS for a client connection or `bind((host, 0))` listener.\n- **Listening vs. Connected Socket:** The architectural separation between the passive server socket awaiting new handshakes (`accept()`) and the per-client connected socket exchanging application bytes."
    },
    {
      "id": "les_c4_m5_l2",
      "title": "Lesson 5.2: Writing a TCP Server & Client with Byte-Stream Framing",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Implements loopback TCP servers and clients using SO_REUSEADDR, ephemeral server port 0, sendall, timeout-bounded create_connection, and explicit message framing.",
      "learning_objectives": [
        "Build and run an execution-tested loopback TCP echo server using bind((host, 0)), listen(), accept(), and SO_REUSEADDR.",
        "Explain why TCP is an unframed byte stream where recv(1024) may return partial or coalesced application messages.",
        "Distinguish send() from sendall() and implement newline-delimited or length-prefixed framing with bounded buffers.",
        "Enforce connect and read timeouts via socket.create_connection(addr, timeout=...) and clean resource closure."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-03",
          "figure_number": "Figure 5.3",
          "lesson_id": "les_c4_m5_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l02_tcp_echo_handshake_sequence.png",
          "title": "TCP Client-Server Lifecycle & Sequence in m05_networking.py (C04-M05-F1)",
          "purpose": "Visualize the exact chronological sequence of server socket/bind/listen/accept/recv/sendall/close calls synchronized with client create_connection/sendall/recv/with-exit calls.",
          "accessibility_description": "Two-column sequence diagram connecting Server (127.0.0.1:ephemeral_port) and Client socket calls with labeled directional payload arrows.",
          "walkthrough_section": "Diagram Walkthrough: Socket Sequence in m05_networking.py"
        },
        {
          "figure_id": "fig-04-05-04",
          "figure_number": "Figure 5.4",
          "lesson_id": "les_c4_m5_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l02_tcp_byte_stream_framing_delimiters.png",
          "title": "Why TCP Byte Streams Require Explicit Delimiters or Length Prefixes",
          "purpose": "Demonstrate how two sender write calls can coalesce into one recv() or split mid-message across three recv() reads, and how b'\\n' delimiters or length headers restore frame boundaries.",
          "accessibility_description": "Byte stream tape comparing coalesced and fragmented recv buffers against newline-delimited and 4-byte length-prefixed frame extraction.",
          "walkthrough_section": "Diagram Walkthrough: TCP Stream Fragmentation vs. Framing"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-03",
          "title": "Figure 5.3: How a Loopback TCP Server & Client Exchange Data Step by Step",
          "url": "/assets/courses/cyber-04/c04_m5_l02_tcp_echo_handshake_sequence.png",
          "caption": "Figure 5.3 (C04-M05-F1): Synchronized sequence of server bind/listen/accept/recv/sendall calls and client create_connection/sendall/recv lifecycle.",
          "alt": "Two-column sequence timeline connecting TCP Echo Server (127.0.0.1) calling socket(), SO_REUSEADDR, bind(('127.0.0.1', 0)), and listen(1) -> accept() with TCP Client calling socket.create_connection((HOST, port), timeout=5), cli.sendall(), conn.recv(1024), conn.sendall(), cli.recv(1024), and context-managed socket closure"
        },
        {
          "id": "fig-04-05-04",
          "title": "Figure 5.4: Why TCP Byte Streams Need Message Boundaries (Framing)",
          "url": "/assets/courses/cyber-04/c04_m5_l02_tcp_byte_stream_framing_delimiters.png",
          "caption": "Figure 5.4: Contrasting torn/coalesced unframed recv(1024) reads crashing json.loads() against newline-delimited (b'\\n') and length-prefixed framing with size caps.",
          "alt": "Side-by-side comparison contrasting unframed recv(1024) splitting b'{\"id\": 1' or gluing b'{\"id\":1}{\"id\":2}' into JSONDecodeError against safe framing via end-of-line b'\\n' delimiters (with MAX_BYTES=256 cap) or 4-byte struct.pack('!I', size) length headers and b'' EOF loop termination"
        }
      ],
      "lab_resources": [
        {
          "name": "m05_networking.py",
          "url": "/assets/courses/cyber-04/labs/m05_networking.py",
          "description": "Module 5 sockets, HTTP client/server & struct binary decoder lab script"
        }
      ],
      "content": "## 1. Implementing Loopback TCP Communication Without Hanging or Dropped Bytes\n\nUnderstanding socket theory only matters when a running server actually exchanges bytes reliably without port collisions, partial-send corruption, or frozen connections. In Section 1 of `m05_networking.py`, both server and client execute inside one deterministic Python script over `127.0.0.1`—using Python's `threading` module strictly so the client and server run concurrently in one single-file lab.\n\n## 2. Core Objectives for This Lesson\n\n- **Collision-Free Ephemeral Server Binding:** Bind with `SO_REUSEADDR` and port `0`, then query `getsockname()[1]` to pass the OS-allocated port cleanly to clients.\n- **Safe Transmission Mechanics:** Explain why `sendall()` outperforms `send()` for full buffer dispatch across OS kernel socket buffers.\n- **Timeout Enforcement:** Ensure every blocking client `connect()` and `recv()` honors an upper bound via `socket.create_connection((HOST, port), timeout=5)`.\n- **Byte-Stream Framing Mastery:** Account for TCP lacking message boundaries by implementing newline delimiters (`b\"\\n\"`) or length-prefixed frames with strict maximum payload caps.\n\n## 3. Execution-Tested TCP Echo Server & Client\n\nRead Section 1 of `m05_networking.py` carefully alongside its verified local Python output:\n\n```python\nimport socket\nimport threading\n\nHOST = \"127.0.0.1\"\n\ndef echo_server(sock: socket.socket) -> None:\n    conn, addr = sock.accept()\n    with conn:\n        data = conn.recv(1024)                  # read up to 1024 bytes\n        conn.sendall(b\"ECHO: \" + data.upper())\n\nsrv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nsrv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\nsrv.bind((HOST, 0))                             # port 0 = OS picks a free port\nsrv.listen(1)\nport = srv.getsockname()[1]\nthreading.Thread(target=echo_server, args=(srv), daemon=True).start()\n\nwith socket.create_connection((HOST, port), timeout=5) as cli:\n    cli.sendall(b\"hello redkross\")\n    reply = cli.recv(1024)\nprint(\"1. server port is ephemeral:\", port > 1023, \"| reply:\", reply.decode())\nsrv.close()\n```\n\nRun `m05_networking.py` and verify Line 1 of stdout:\n\n```bash\npython m05_networking.py\n```\n\n```terminal\n1. server port is ephemeral: True | reply: ECHO: HELLO REDKROSS\n```\n\nWalk line-by-line through why every call in that minimal server-client pair prevents real bugs:\n\n- **`srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)`:** Permits rapid rebinding after a server restart even while prior sockets remain briefly in OS `TIME_WAIT` state.\n- **`srv.bind((HOST, 0))` + `srv.getsockname()[1]`:** Eliminates brittle hard-coded ports that collide across parallel test runs; `0` tells the kernel to pick any free ephemeral port (`port > 1023` prints `True`).\n- **`srv.listen(1)`:** Enters passive listening mode with a backlog queue of `1` pending handshake.\n- **`sock.accept()` + `with conn:`:** Blocks until a client completes the TCP 3-way handshake, returning `(conn, addr)`. Wrapping `conn` in `with` guarantees socket closure even if string decoding or uppercasing raises an exception.\n- **`cli.sendall(...)` vs. `cli.send(...)`:** Low-level `send()` returns the byte count the kernel happened to accept right then—possibly fewer bytes than requested when kernel buffers tighten. `sendall()` loops internally until all bytes transmit or an error occurs.\n- **`socket.create_connection((HOST, port), timeout=5)`:** Combines socket resolution and connection with a strict 5-second ceiling that propagates to subsequent `recv()` calls on `cli`. While `threading` hosts both ends in this demonstration, production daemons rely on `socketserver`, `asyncio`, or hardened frameworks rather than spawning raw unbounded threads.\n\n![Figure 5.3: How a Loopback TCP Server & Client Exchange Data Step by Step](/assets/courses/cyber-04/c04_m5_l02_tcp_echo_handshake_sequence.png)\n\n*Figure 5.3 (C04-M05-F1): Synchronized sequence of server bind/listen/accept/recv/sendall calls and client create_connection/sendall/recv lifecycle.*\n\n### Diagram Walkthrough: Socket Sequence in `m05_networking.py` (`Figure 5.3` / `C04-M05-F1`)\n\nFollow **Figure 5.3 (`C04-M05-F1`)** chronologically from top to bottom:\n1. **Server Setup (`127.0.0.1`):** Creates a socket with `SO_REUSEADDR`, binds `('127.0.0.1', 0)` so the OS assigns a free port `> 1023`, calls `listen(1)`, and waits at `accept()`.\n2. **Client Connect & Handshake:** Calls `socket.create_connection((HOST, port), timeout=5)`, completing the TCP 3-way handshake so `accept()` returns the connected session socket `conn`.\n3. **Stream Request & Echo Reply:** The client invokes `cli.sendall(...)`, the server reads via `conn.recv(1024)` and replies with `conn.sendall(...)`, and the client reads back `cli.recv(1024)`.\n4. **Deterministic Teardown:** Exiting `with conn:` plus `srv.close()` and the client's `with` block cleanly closes both file descriptors.\n\n## 4. Why `recv(1024)` Never Guarantees One Complete Message\n\nA classic bug when transitioning from UDP or file-per-message IPC into TCP is assuming *one `sendall()` equals one `recv()`*. That assumption breaks in real networks because **TCP is an unstructured byte stream with zero inherent message boundaries**:\n\n- **Fragmentation:** Sending a 900-byte JSON event over congested links can arrive across two `recv(1024)` calls (say, 512 bytes then 388 bytes).\n- **Coalescing (Nagle's Algorithm / Kernel Buffering):** Sending `\"MSG1\"` and `\"MSG2\"` milliseconds apart frequently merges into one single `recv(1024)` returning `b\"MSG1MSG2\"`.\n- **Clean Peer EOF:** When the remote peer closes its connection gracefully, `recv()` returns empty bytes `b\"\"` (not `None`, and not an exception)—loops must check `if not chunk: break` cleanly rather than spinning endlessly at 100% CPU!\n\n![Figure 5.4: Why TCP Byte Streams Need Message Boundaries (Framing)](/assets/courses/cyber-04/c04_m5_l02_tcp_byte_stream_framing_delimiters.png)\n\n*Figure 5.4: Contrasting torn/coalesced unframed recv(1024) reads crashing json.loads() against newline-delimited (b'\\n') and length-prefixed framing with size caps.*\n\n### Diagram Walkthrough: TCP Stream Fragmentation vs. Framing (`Figure 5.4`)\n\n- **Unframed Stream Hazards (`1 sendall() != 1 recv(1024)`):** Fragmentation splits half a record (`b'{\"id\": 1'`), while coalescing merges adjacent writes (`b'{\"id\":1}{\"id\":2}'`), crashing `json.loads()` with `JSONDecodeError`.\n- **Two Safe Framing Patterns + EOF Rule:** Either read chunks until a newline delimiter (`b\"\\n\"`) while enforcing `MAX_BYTES = 256` (sending `'ERR too long'` and closing oversized senders), or prefix each frame with a 4-byte `struct.pack('!I', size)` length header validated against a max limit; whenever `conn.recv()` returns `b\"\"` (EOF), break out of the loop cleanly.\n\n> [!TIP]\n> **Always Read in Bounded Loops:** Even when framing with `\\n`, check `len(buffer) > MAX_BYTES` on *every incoming `recv()` chunk* before concatenating further bytes—never wait until an attacker stops sending `\\n` after 4 GiB!\n\n## 5. Quantitative Framing Verification: Chunk Accumulation & Size Ceilings\n\nAnalyze how bounded newline framing protects Practical P1 (`MAX_LINE = 256` bytes) when a peer streams multiple packets:\n\n:::math-steps\nStep 01: Accumulate two valid TCP segments containing newline-terminated commands\n$$B_{\\text{recv1}} = 14\\text{ bytes } (\\text{\"hello\"} + \\text{\"world\"} + 2\\text{ LF} + \\text{\"ab\"}), \\quad L_{\\text{frame1}} = \\text{len}(\\text{\"hello\"}) = 5 \\le 256\\text{ bytes}$$\nResult: Buffer splits on first newline, emits OK 5, and retains remaining partial tail cleanly for next iteration\n\nStep 02: Enforce the bounded buffer invariant against malicious non-terminated flooding\n$$\\text{If } \\lvert B_{\\text{accum}} \\rvert + \\lvert \\text{chunk} \\rvert > 256\\text{ bytes without newline } (\\text{LF}) \\implies \\text{send ERR too long and close socket}$$\nResult: Worst-case RAM allocated per client connection stays strictly bounded under 256 bytes plus fixed OS overhead\n:::\n\n## 6. Key Definitions\n\n- **TCP Byte Stream:** A reliable, ordered transport pipe that delivers an unbroken sequence of octets without preserving sender `write()`/`send()` call boundaries.\n- **`sendall()`:** A high-level Python socket method that retries internally until every byte in the buffer has been handed to the OS or an error occurs, preventing silent partial transmissions.\n- **Framing (Delimiter / Length-Prefix):** An application-layer convention (`b\"\\n\"` separator or `struct`-encoded byte count) dividing a continuous TCP stream back into discrete messages.\n- **`EOF` on TCP `recv()`:** Signaled unambiguously when `conn.recv(n)` returns `b\"\"` (zero-length bytes object), indicating the peer has cleanly closed its write half."
    },
    {
      "id": "les_c4_m5_l3",
      "title": "Lesson 5.3: HTTP Clients, Timeouts & Defensive API Hygiene",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Constructs HTTP JSON API calls with urllib.request and requests, distinguishes HTTPError vs. TimeoutError vs. URLError, prevents missing-timeout pipeline stalls, and applies API hygiene.",
      "learning_objectives": [
        "Consume JSON endpoints with urllib.request while passing honest User-Agent headers and mandatory timeouts.",
        "Handle 4xx/5xx responses via urllib.error.HTTPError independently from network timeouts and connection refusals.",
        "Diagnose why calling httpd.shutdown() without httpd.server_close() produces client TimeoutError instead of ConnectionRefusedError.",
        "Implement API hygiene controls including secrets isolation, HTTP 429 Retry-After backoff, pagination, schema validation, and circuit breaking."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-05",
          "figure_number": "Figure 5.5",
          "lesson_id": "les_c4_m5_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l03_http_client_error_branches.png",
          "title": "HTTP Client Decision & Exception Routing Tree (C04-M05-F2)",
          "purpose": "Map the four distinct outcome branches from urlopen(req, timeout=5): 2xx JSON parse, 4xx/5xx HTTPError inspection, TimeoutError backoff, and URLError/ConnectionError alerting.",
          "accessibility_description": "Decision flowchart originating at urlopen(req, timeout=5) branching cleanly into 2xx, HTTPError, TimeoutError, and URLError/ConnectionError handlers.",
          "walkthrough_section": "Diagram Walkthrough: HTTP Client Exception Routing"
        },
        {
          "figure_id": "fig-04-05-06",
          "figure_number": "Figure 5.6",
          "lesson_id": "les_c4_m5_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l03_api_client_resilience_circuit_breaker.png",
          "title": "Preventing Pipeline Stalls: Explicit Timeouts, Exponential Backoff & Circuit Breakers",
          "purpose": "Compare an unbounded synchronous enrichment worker hanging indefinitely against a resilient client combining timeout=3, capped exponential backoff, HTTP 429 Retry-After compliance, and circuit-breaker bypass.",
          "accessibility_description": "Architectural comparison contrasting a stalled sequential SIEM enrichment queue against a timeout-protected circuit-breaker pipeline.",
          "walkthrough_section": "Diagram Walkthrough: Timeout & Circuit-Breaker Architecture"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-05",
          "title": "Figure 5.5: Handling All Four HTTP Client Outcomes Cleanly",
          "url": "/assets/courses/cyber-04/c04_m5_l03_http_client_error_branches.png",
          "caption": "Figure 5.5 (C04-M05-F2): Decision flowchart routing urlopen(req, timeout=5) across 2xx JSON parse, HTTPError, TimeoutError, and URLError/ConnectionError.",
          "alt": "Branching flowchart from urllib.request.urlopen(req, timeout=5) (with User-Agent and timeout) into 2xx Success (parse and validate JSON keys/types), 4xx/5xx HTTPError (read err.code and json.load(err)), TimeoutError (stop waiting after 5s and backoff/trip circuit breaker), and URLError/ConnectionError (log failure count and alert operations)"
        },
        {
          "id": "fig-04-05-06",
          "title": "Figure 5.6: Preventing API Stalls: Timeouts, Backoff & Circuit Breakers",
          "url": "/assets/courses/cyber-04/c04_m5_l03_api_client_resilience_circuit_breaker.png",
          "caption": "Figure 5.6: Contrasting an unguarded timeout=None API hang against timeout=3, exponential backoff, HTTP 429 Retry-After, and circuit-breaker bypass.",
          "alt": "Two-track comparison contrasting requests.get(rep_url) with timeout=None stalling workers forever against a resilient pipeline pairing timeout=3, 2x backoff (1s, 2s) + HTTP 429 Retry-After (12s worst-case max), and an open circuit breaker bypassing the stuck API in under 1 ms while alerting operations"
        }
      ],
      "lab_resources": [
        {
          "name": "m05_networking.py",
          "url": "/assets/courses/cyber-04/labs/m05_networking.py",
          "description": "Module 5 sockets, HTTP client/server & struct binary decoder lab script"
        }
      ],
      "content": "## 1. Consuming Security APIs Without Hanging Your Automation Pipeline\n\nIn modern SOC operations, Python spends far more time calling HTTP REST endpoints—SIEM query APIs, EDR device isolation endpoints, threat-intelligence lookups, and ticketing queues—than hand-coding raw TCP listeners. Yet poorly engineered API clients rank among the top reliability hazards in security engineering: one unhandled HTTP status code silently marks a scan `\"clean\"`, or one missing client timeout locks up every worker thread indefinitely when an internal service degrades.\n\n## 2. Core Objectives for This Lesson\n\n- **Loopback HTTP Server & Client Inspection:** Trace Section 2 of `m05_networking.py` across `200 OK`, `404 Not Found`, and post-shutdown timeout failure.\n- **`urllib` vs. `requests` Semantics:** Contrast standard-library `urllib.request.urlopen` (`HTTPError` for 4xx/5xx, required explicit `timeout=`) with third-party `requests` (requires `response.raise_for_status()` and explicit `timeout=`).\n- **Shutdown Socket Forensics:** Understand why calling `httpd.shutdown()` without `httpd.server_close()` creates an eerie zombie backlog producing `TimeoutError` in clients.\n- **Production API Hygiene:** Enforce secrets-store authentication, HTTP `429` `Retry-After` compliance, pagination, request-ID logging, strict schema validation, and circuit breakers.\n\n## 3. Execution-Tested HTTP JSON API Lab Analysis\n\nExamine Section 2 of `m05_networking.py`, where `http.server.HTTPServer` listens on `(127.0.0.1, 0)`, returning JSON on `/api/status` (`200`) and JSON error payloads on `/missing` (`404`):\n\n```python\ndef get_json(path: str) -> tuple[int, dict]:\n    url = f\"http://{HOST}:{api_port}{path}\"\n    req = urllib.request.Request(url, headers={\"User-Agent\": \"rk-c04-client/1.0\"})\n    try:\n        with urllib.request.urlopen(req, timeout=5) as resp:\n            return resp.status, json.load(resp)\n    except urllib.error.HTTPError as err:       # 4xx/5xx raise HTTPError\n        return err.code, json.load(err)\n\nprint(\"2.\", get_json(\"/api/status\"))\nprint(\"  \", get_json(\"/missing\"))\nhttpd.shutdown()\n\ntry:\n    urllib.request.urlopen(f\"http://{HOST}:{api_port}/api/status\", timeout=2)\nexcept (urllib.error.URLError, ConnectionError, OSError) as err:\n    print(\"   after shutdown: \", type(err).__name__)\n```\n\nObserved output from executing `m05_networking.py`:\n\n```terminal\n2. (200, {'service': 'rk-demo', 'ok': True})\n   (404, {'error': 'not found'})\n   after shutdown: TimeoutError\n```\n\nBreak down four crucial behaviors captured in those three lines:\n\n1. **Honest `User-Agent` Identification:** Sending `\"User-Agent\": \"rk-c04-client/1.0\"` identifies your automation cleanly to reverse proxies and API rate-limiters instead of blending into anonymous bot fingerprints.\n2. **`urllib.error.HTTPError` Carries the Response Stream:** Unlike 2xx responses returning cleanly from `urlopen`, any 4xx or 5xx HTTP status raises `urllib.error.HTTPError`. Because `HTTPError` behaves like a readable response object, `json.load(err)` safely extracts the structured error payload (`{'error': 'not found'}`) alongside `err.code` (`404`).\n3. **Why `after shutdown:` Printed `TimeoutError`:** Notice `m05_networking.py` intentionally called `httpd.shutdown()` *without* `httpd.server_close()`! `httpd.shutdown()` merely stopped the `serve_forever()` Python dispatch loop—leaving the underlying listening TCP socket still bound and open inside the OS kernel! Consequently, the OS completed the follow-up client's TCP handshake silently into the kernel accept queue where no handler ever answered, triggering `TimeoutError` after `2` seconds! Without `timeout=2`, that request would have stalled **forever**.\n4. **Why `http.server` Is Strictly Lab/Mock Only:** Python's standard-library `http.server` documentation explicitly warns that it lacks hardened HTTP request validation and production concurrency protections—use it purely for localhost mocks (`127.0.0.1`), never exposed production APIs.\n\n![Figure 5.5: Handling All Four HTTP Client Outcomes Cleanly](/assets/courses/cyber-04/c04_m5_l03_http_client_error_branches.png)\n\n*Figure 5.5 (C04-M05-F2): Decision flowchart routing urlopen(req, timeout=5) across 2xx JSON parse, HTTPError, TimeoutError, and URLError/ConnectionError.*\n\n### Diagram Walkthrough: HTTP Client Exception Routing (`Figure 5.5` / `C04-M05-F2`)\n\nInspect **Figure 5.5 (`C04-M05-F2`)** to trace all four independent exception routes branching out of `urllib.request.urlopen(req, timeout=5)` (sending an honest `User-Agent` and mandatory `timeout=`):\n- **`2xx` Success:** Read JSON payload safely -> validate expected keys and data types -> pass clean result forward.\n- **`4xx`/`5xx` (`HTTPError`):** Inspect `err.code` (`404`, `429`, `503`) -> decode error body with `json.load(err)` -> handle missing entities or rate limits cleanly.\n- **`TimeoutError`:** No reply within `5` seconds (e.g., hung server socket) -> stop waiting immediately -> retry with backoff or open circuit breaker.\n- **`URLError` / `ConnectionError`:** Port closed, DNS failure, or TLS mismatch -> log failure counter -> alert operations team if persistent.\n\n## 4. `requests` Defaults & Five API Hygiene Rules\n\nMany operational tools install the third-party `requests` library inside an isolated project `venv` (Module 2). Remember one notorious `requests` footgun explicitly highlighted in official documentation: **`requests.get(url)` applies NO timeout by default!** Always pass `timeout=(connect_s, read_s)` or `timeout=5` on every call, followed by `response.raise_for_status()` and `response.json()` wrapped in exception handlers.\n\nCombine timeouts with five non-negotiable API hygiene habits:\n- **Credentials Out of Source Code:** Load bearer tokens and API keys from environment variables or a dedicated secrets manager—never commit literals or print tokens in debug logs.\n- **Respect `HTTP 429` & `Retry-After`:** Back off exponentially (`wait_s = min(cap, base * 2**attempt)`) or obey the server's `Retry-After` header rather than hammering a rate-limited SOC API.\n- **Paginate Deterministically:** Follow cursor/page links with explicit max-page safety bounds so runaway pagination loops cannot exhaust memory.\n- **Log Request IDs, Never Secrets:** Capture `X-Request-Id`, HTTP status code, and elapsed latency cleanly while redacting `Authorization` headers.\n- **Validate JSON Schemas:** Never assume `data[\"score\"]` exists or holds an `int`—malformed upstream JSON or HTML proxy error pages must raise caught validation alerts, not unhandled `KeyError` crashes.\n\n## 5. Real-World Case Study: Timeout Omission Stalls Detection\n\nAn overlooked socket option in a synchronous enrichment loop illustrates how missing network bounds silently wedge automated SOC pipelines.\n\n### Case Study C04-M05-CS2 (Fictional Teaching Scenario): The Enrichment Script With No Timeout\n\n*Disclaimer: This teaching scenario is fictional.*\n\n- **Context:** A SOC engineering team at **Lotus Logistics** built an internal Python enrichment service that intercepted every incoming SIEM alert and queried an internal IP-reputation server using `requests.get(rep_url)`—with **no `timeout=` argument**.\n- **Failure Cascade:** One Tuesday afternoon, the reputation server experienced a database deadlock: its TCP listening port still accepted connections cleanly, yet HTTP worker threads stopped writing responses. Every Python enrichment call blocked indefinitely waiting for bytes that never arrived. Within minutes, all SOC worker queues saturated, alert forwarding halted completely, and **real intrusion alerts stalled unseen for two hours**!\n- **Remediation Architecture (`Figure 5.6`):** (1) Set short strict request timeouts (`timeout=3` seconds), (2) wrap transient errors in bounded retries with jittered exponential backoff, (3) add a **circuit breaker** (`Figure 5.6`) that opens after $N$ consecutive failures so enrichment degrades gracefully by passing alerts straight through un-enriched instead of blocking triage, and (4) emit an immediate operational alert whenever enrichment error rates cross threshold.\n\n### Quantitative Wait Ceiling: Bounded Timeout & Backoff Math\n\nVerify why setting `timeout=3` with 2 capped retries prevents the Lotus Logistics multi-hour hang cleanly:\n\n:::math-steps\nStep 01: Compute unbounded wait time per stalled alert when timeout=None\n$$W_{\\text{unbounded}} = \\infty \\implies \\text{queue throughput drops to } 0\\text{ alerts/sec}$$\nResult: Every worker thread remains pinned indefinitely on the deadlocked TCP socket\n\nStep 02: Bound worst-case single-alert enrichment delay across 1 initial call plus 2 exponential backoff retries (1 s, 2 s) before circuit opens\n$$W_{\\text{bounded}} = (3\\text{ tries} \\times 3\\text{ s timeout}) + (1\\text{ s} + 2\\text{ s backoff}) = 9\\text{ s} + 3\\text{ s} = 12\\text{ s max}$$\nResult: Once k failures trip the circuit breaker, subsequent alerts bypass enrichment in under 1 ms while alerting operators immediately\n:::\n\n![Figure 5.6: Preventing API Stalls: Timeouts, Backoff & Circuit Breakers](/assets/courses/cyber-04/c04_m5_l03_api_client_resilience_circuit_breaker.png)\n\n*Figure 5.6: Contrasting an unguarded timeout=None API hang against timeout=3, exponential backoff, HTTP 429 Retry-After, and circuit-breaker bypass.*\n\n### Diagram Walkthrough: Timeout & Circuit-Breaker Architecture (`Figure 5.6`)\n\n- **Unguarded Stall (`timeout=None`):** When a downstream DB/reputation API accepts TCP connections but stops replying, `requests.get(rep_url)` blocks worker queues at `0 alerts/sec` so real attacks go unseen for hours.\n- **Resilient Pipeline (`timeout=3` + Backoff + Circuit Breaker):** Enforce `timeout=3`, retry twice with backoff (`1s`, `2s`, honoring HTTP `429 Retry-After`, capping worst-case wait at `12s`), and open the circuit breaker on repeated failures so alerts bypass the stuck API in `< 1 ms` while paging on-call ops.\n\n## 6. Key Definitions\n\n- **`urllib.error.HTTPError`:** Standard-library exception raised by `urlopen` on HTTP `4xx`/`5xx` status codes that simultaneously exposes `.code` and a readable response body stream.\n- **Half-Closed / Zombie Listening Socket:** State created when `HTTPServer.shutdown()` exits the Python request loop without `HTTPServer.server_close()` releasing the underlying OS listening descriptor—causing subsequent client connections to hang until timeout.\n- **Circuit Breaker:** A resilience pattern that stops invoking a repeatedly failing external API for a cooldown interval, failing fast instead of stalling callers."
    },
    {
      "id": "les_c4_m5_l4",
      "title": "Lesson 5.4: HTTPS, PEP 476 & TLS Certificate Trust Stores",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Explains Python default TLS certificate and hostname verification introduced in PEP 476, why verify=False breaks confidentiality and authenticity, and how to fix CA trust stores cleanly.",
      "learning_objectives": [
        "Explain the protections provided by ssl.create_default_context() and PEP 476 default HTTPS validation.",
        "Articulate why disabling certificate validation via verify=False exposes bearer tokens and JSON payloads to active interception.",
        "Diagnose CERTIFICATE_VERIFY_FAILED trust-store gaps without bypassing validation.",
        "Configure certifi.where() or private organizational root CAs properly in stdlib ssl and requests."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-07",
          "figure_number": "Figure 5.7",
          "lesson_id": "les_c4_m5_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l04_tls_cert_verification_pep476.png",
          "title": "PEP 476 TLS Handshake Verification vs. Unverified Interception (verify=False)",
          "purpose": "Show how verified TLS validates signature chains, validity dates, and hostname SAN/CN against the local CA bundle, whereas verify=False accepts a MitM attacker certificate silently.",
          "accessibility_description": "Two-track TLS handshake diagram comparing full CA chain and hostname validation against bypassed verify=False proxy interception.",
          "walkthrough_section": "Diagram Walkthrough: Certificate Chain & Hostname Verification"
        },
        {
          "figure_id": "fig-04-05-08",
          "figure_number": "Figure 5.8",
          "lesson_id": "les_c4_m5_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l04_ca_bundle_trust_remediation.png",
          "title": "Remediating CERTIFICATE_VERIFY_FAILED via CA Bundles Instead of Disabling Checks",
          "purpose": "Illustrate the diagnostic decision tree from CERTIFICATE_VERIFY_FAILED through server intermediate check, certifi CA bundle selection, and corporate internal CA pinning.",
          "accessibility_description": "Troubleshooting flowchart resolving CERTIFICATE_VERIFY_FAILED through server chain inspection, certifi.where(), or explicit internal CA PEM path without setting verify=False.",
          "walkthrough_section": "Diagram Walkthrough: Trust-Store Remediation Workflow"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-07",
          "title": "Figure 5.7: HTTPS Certificate Verification vs. Unsafe verify=False Bypass",
          "url": "/assets/courses/cyber-04/c04_m5_l04_tls_cert_verification_pep476.png",
          "caption": "Figure 5.7: Contrasting PEP 476 full CA chain and SAN hostname verification against silent MITM interception under verify=False.",
          "alt": "Two-track comparison contrasting ssl.create_default_context() checking valid Leaf -> Intermediate -> Trusted CA chain, expiration, and SAN hostname match before sending API tokens against requests.get(url, verify=False) accepting a fake self-signed proxy certificate and leaking bearer tokens"
        },
        {
          "id": "fig-04-05-08",
          "title": "Figure 5.8: Fixing CERTIFICATE_VERIFY_FAILED Safely Without Disabling Checks",
          "url": "/assets/courses/cyber-04/c04_m5_l04_ca_bundle_trust_remediation.png",
          "caption": "Figure 5.8: Troubleshooting workflow resolving CERTIFICATE_VERIFY_FAILED through chain, clock, certifi.where(), or org CA PEM pinning without verify=False.",
          "alt": "Diagnostic workflow starting at ssl.SSLCertVerificationError: CERTIFICATE_VERIFY_FAILED, checking server intermediate chain, system clock Not Before/After, and CA store, then resolving via ssl.create_default_context(cafile=certifi.where()) or pinned corp-root-ca.pem while forbidding verify=False"
        }
      ],
      "content": "## 1. Cryptographic Integrity on HTTPS Wires: Never Silence Certificate Errors\n\nTransport Layer Security (TLS) protects API bearer tokens, vulnerability findings, and alert payloads crossing shared networks against eavesdropping and active modification. Yet whenever an internal security script prints `CERTIFICATE_VERIFY_FAILED`, hasty copy-pasting from outdated internet forums often tempts developers to slap `verify=False` (in `requests`) or an unverified `ssl._create_unverified_context()` into production code. Doing so **completely neutralizes TLS authentication**: an on-path attacker simply serves any arbitrary self-signed certificate and silently reads or modifies every API request!\n\n## 2. Core Objectives for This Lesson\n\n- **Default Verification History (PEP 476):** Explain what changed in Python 2.7.9 / 3.4.3 and why `ssl.create_default_context()` validates both certificate chains and server hostnames.\n- **Attack Mechanics Against `verify=False`:** Demonstrate why encrypted traffic without peer authentication still gives active MITM proxies full plaintext visibility.\n- **Real Windows CPython Diagnostics:** Examine the Course 02 / Course 04 execution-tested `CERTIFICATE_VERIFY_FAILED` vs. `certifi.where()` `TLSv1.3` (`TLS_AES_256_GCM_SHA384`) remediation.\n- **Clean Trust-Store Engineering:** Pin internal corporate roots or curated CA bundles properly instead of disabling checks.\n\n## 3. How `ssl.create_default_context()` Protects Python Clients\n\nBy default in modern Python (`3.x >= 3.4.3`), `urllib.request.urlopen(\"https://...\")`, `http.client.HTTPSConnection`, and `requests.get(\"https://...\")` enforce two intertwined verifications:\n\n1. **Trust-Chain Signature Verification:** Walks the server's presented X.509 leaf certificate through intermediate CAs back to a trusted Root Certificate Authority present in the active trust store—confirming signatures are valid and timestamps fall within `Not Before` / `Not After`.\n2. **Hostname Verification (`check_hostname = True`):** Verifies the queried DNS host (`api.vendor.example`) matches a Subject Alternative Name (`SAN`) entry inside the verified certificate—preventing an attacker with a legitimate certificate for `attacker.example` from replaying it to impersonate `api.vendor.example`.\n\n### Real-World Precedent: Case Study C04-M05-CS1 (PEP 476)\n\nBefore **PEP 476** landed in late 2014 (shipping in Python **2.7.9** and **3.4.3**), Python's standard-library HTTP clients (`urllib`, `urllib2`, `httplib`) defaulted to *not* verifying TLS server certificates at all. Countless production monitoring scripts, package installers, and security bots believed `\"https://\"` guaranteed confidential communication—when in practice anyone on the path could intercept or alter payloads effortlessly. PEP 476 flipped Python's secure default ON globally, catching insecure endpoints loudly via verification errors rather than failing open silently.\n\n## 4. Real Execution Diagnostics: Fixing Trust Stores Without `verify=False`\n\nInspect this **execution-tested troubleshooting comparison** conducted directly by our Course 02 / Course 04 content engineering team on Windows:\n\n- **Observed Error (Missing Intermediate / Local OS Store Gap):** Calling `ssl.create_default_context()` against `example.com` on a fresh Windows test environment raised `ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate`.\n- **Wrong \"Fix\" (`verify=False`):** Skipping verification connects cleanly *only by trusting any forged certificate*, leaving API credentials wide open to MITM capture (`Figure 5.7`).\n- **Proper Verified Fix (`certifi.where()`):** Passing an up-to-date Mozilla-curated CA bundle via `certifi` (`certifi 2026.04.22`) verified the full signature chain cleanly and negotiated **TLSv1.3** using cipher **`TLS_AES_256_GCM_SHA384`** (`Figure 5.8`):\n\n```python\nimport ssl\nimport urllib.request\nimport certifi  # Third-party CA bundle package installed inside tool venv\n\ntrusted_ctx = ssl.create_default_context(cafile=certifi.where())\nwith urllib.request.urlopen(\"https://example.com\", context=trusted_ctx, timeout=5) as resp:\n    print(\"Status:\", resp.status)\n```\n\nFor internal enterprise SIEM or firewall endpoints signed by your organization's private Certificate Authority, apply the exact same principle without degrading global trust:\n- Point `ssl.create_default_context(cafile=\"/etc/ssl/certs/corp-root-ca.pem\")` (or in `requests`, `requests.get(url, verify=\"/path/corp-root-ca.pem\", timeout=5)`) strictly to the verified internal CA PEM file—or install the organization's root certificate cleanly into the OS trust store.\n- Never copy `verify=False` out of debugging scripts into committed code; add CI/linter checks flagging `verify=False` as a hard failure.\n\n![Figure 5.7: HTTPS Certificate Verification vs. Unsafe verify=False Bypass](/assets/courses/cyber-04/c04_m5_l04_tls_cert_verification_pep476.png)\n\n*Figure 5.7: Contrasting PEP 476 full CA chain and SAN hostname verification against silent MITM interception under verify=False.*\n\n### Diagram Walkthrough: Certificate Chain & Hostname Verification (`Figure 5.7`)\n\n- **Verified Default (`ssl.create_default_context()`):** Confirms both a valid signature chain (`Leaf -> Intermediate -> Local Trusted CA`), valid dates, and matching certificate SAN before transmitting any API token or JSON payload.\n- **Silent Interception (`verify=False`):** Skipping chain and hostname verification lets an on-path proxy substitute any fake self-signed certificate so encrypted requests still hand bearer tokens and payloads straight to an attacker.\n\n![Figure 5.8: Fixing CERTIFICATE_VERIFY_FAILED Safely Without Disabling Checks](/assets/courses/cyber-04/c04_m5_l04_ca_bundle_trust_remediation.png)\n\n*Figure 5.8: Troubleshooting workflow resolving CERTIFICATE_VERIFY_FAILED through chain, clock, certifi.where(), or org CA PEM pinning without verify=False.*\n\n### Diagram Walkthrough: Trust-Store Remediation Workflow (`Figure 5.8`)\n\n- **Three Ordered Diagnostic Checks:** When `ssl.SSLCertVerificationError: CERTIFICATE_VERIFY_FAILED` fires, check **1. Server Chain** (missing intermediate certificate), **2. System Clock** (`Not Before` / `Not After` validity dates), and **3. CA Trust Store** (public vs. private corporate CA).\n- **Safe Fixes vs. Forbidden Shortcut:** Route public HTTPS connections through `ssl.create_default_context(cafile=certifi.where())` (negotiating `TLSv1.3`) or pin internal corporate CAs via `verify=\"/etc/ssl/certs/corp-root-ca.pem\"` / OS trust-store install—never disable verification with `verify=False`.\n\n> [!CAUTION]\n> **Production Exposure:** Disabling TLS verification (`verify=False` or `ssl._create_unverified_context()`) is equivalent to cleartext exposure against any active on-path adversary (Wi-Fi rogue APs, compromised proxies, BGP hijacks). Treat `verify=False` as a critical security vulnerability equivalent to storing plaintext credentials.\n\n## 5. Key Definitions\n\n- **PEP 476:** Python Enhancement Proposal (2014) enabling X.509 certificate chain and hostname verification by default across Python standard-library HTTPS clients starting in 2.7.9 and 3.4.3.\n- **CA Bundle (`cafile` / `certifi`):** A PEM-formatted collection of trusted Root Certificate Authority public certificates against which TLS servers' certificate chains are cryptographically verified.\n- **Hostname Verification:** TLS handshake step confirming that the requested DNS host matches a Subject Alternative Name (`SAN`) inside the server's signed certificate."
    },
    {
      "id": "les_c4_m5_l5",
      "title": "Lesson 5.5: Decoding Binary Network Headers with struct",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Unpacks network-byte-order IPv4 and TCP headers directly from raw hex captures using struct.unpack, bitwise shifts/masks, and socket.inet_ntoa.",
      "learning_objectives": [
        "Select big-endian network byte order (!) and exact scalar widths (B, H, I, 4s) in Python struct format strings.",
        "Decode 20-byte IPv4 headers (!BBHHHBBH4s4s) and TCP headers (!HHIIH) matching Course 02 manual byte dissection.",
        "Extract sub-byte nibbles (Version, IHL) and 16-bit flag/offset bitfields via right shifts (>>) and bitwise AND (&) masks.",
        "Outline how standard-library pcap headers (24-byte global header, 16-byte record header, 14-byte Ethernet header) frame captured packets."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-09",
          "figure_number": "Figure 5.9",
          "lesson_id": "les_c4_m5_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l05_struct_ipv4_header_layout.png",
          "title": "Mapping !BBHHHBBH4s4s Format Characters to 20 IPv4 Header Bytes (C04-M05-F3)",
          "purpose": "Align every struct format character against the exact hexadecimal bytes of the Course 02 capture (45 00 0084 ... ac1e0014 ac1e000a) and decoded field values.",
          "accessibility_description": "Byte-aligned table mapping the 10 format tokens in !BBHHHBBH4s4s across all 20 hex bytes of the IPv4 header down to decoded values.",
          "walkthrough_section": "Diagram Walkthrough: Format-to-Byte Alignment in IPv4"
        },
        {
          "figure_id": "fig-04-05-10",
          "figure_number": "Figure 5.10",
          "lesson_id": "les_c4_m5_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l05_tcp_bitwise_flags_big_endian.png",
          "title": "Bitwise Shifting & Masking on Big-Endian IPv4 ver_ihl and TCP off_flags (0x8018)",
          "purpose": "Break down the binary bit positions of 0x45 (version 4, IHL 5 = 20B) and 0x8018 (data offset 8 = 32B, flags 0x18 = PSH + ACK) using right shifts and hex bitmasks.",
          "accessibility_description": "Bit-level register breakdown showing 8-bit 0x45 split into nibbles and 16-bit 0x8018 split into 4-bit data offset and 6-bit TCP control flags.",
          "walkthrough_section": "Diagram Walkthrough: Bitwise Extraction on 0x45 and 0x8018"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-09",
          "title": "Figure 5.9: Unpacking a 20-Byte IPv4 Header with struct.unpack(\"!BBHHHBBH4s4s\")",
          "url": "/assets/courses/cyber-04/c04_m5_l05_struct_ipv4_header_layout.png",
          "caption": "Figure 5.9 (C04-M05-F3): Byte-aligned IPv4 mapping across !BBHHHBBH4s4s showing all 20 hex header bytes and decoded socket.inet_ntoa values.",
          "alt": "Byte-aligned breakdown mapping struct.unpack('!BBHHHBBH4s4s', raw[:20]) across 20 hex bytes: control fields 45 (ver_ihl Ver=4 IHL=20B), 00 (tos=0), 0084 (total_len=132), 8983 (ident), 4000 (flags_frag DF), 40 (ttl=64), 06 (proto=6 TCP), 5896 (checksum), plus 4s source ac1e0014 -> 172.30.0.20 and 4s destination ac1e000a -> 172.30.0.10"
        },
        {
          "id": "fig-04-05-10",
          "title": "Figure 5.10: Splitting Packed Header Bits with Right Shifts (>>) & Masks (&)",
          "url": "/assets/courses/cyber-04/c04_m5_l05_tcp_bitwise_flags_big_endian.png",
          "caption": "Figure 5.10: Bitwise shift and mask extraction breaking 1-byte IPv4 0x45 into version 4 / IHL 20 B and 16-bit TCP 0x8018 into offset 32 B / flags 0x18.",
          "alt": "Bit-level diagrams showing 1-byte ver_ihl 0x45 (0100 0101) split via 0x45 >> 4 = 4 (IPv4) and (0x45 & 0x0F) * 4 = 20-byte IHL, alongside 2-byte TCP off_flags 0x8018 (1000 0000 00 01 1000) split via (0x8018 >> 12) * 4 = 32-byte header and 0x8018 & 0x3F = 0x18 (ACK + PSH)"
        }
      ],
      "lab_resources": [
        {
          "name": "m05_networking.py",
          "url": "/assets/courses/cyber-04/labs/m05_networking.py",
          "description": "Module 5 sockets, HTTP client/server & struct binary decoder lab script"
        }
      ],
      "content": "## 1. Bridging Course 02 Hex Dissection to Deterministic Python Byte Parsing\n\nIn Course 02 Module 2, you dissected an IPv4/TCP packet frame manually byte by byte—converting hex pairs like `0x45` into `Version 4, IHL 20 bytes` and `0x8018` into `Data Offset 32 bytes, Flags PSH+ACK`. Manual decoding builds mental models, yet incident responders inspecting hundreds of packets or custom binary protocols need repeatable code free of arithmetic slips. Python's standard-library **`struct`** module converts compact C-style binary byte slices directly into native Python integers and byte strings in a single verified statement.\n\n## 2. Core Objectives for This Lesson\n\n- **Endianness & Format Characters:** Specify network (big-endian) byte order (`!`) alongside unsigned widths `B` (1 B), `H` (2 B), `I` (4 B), and fixed slices `4s` (4-byte buffer).\n- **Empirical Course 02 Match:** Execute Section 3 of `m05_networking.py` verifying that Python `struct.unpack()` reproduces Course 02's manual decoding down to the exact bit.\n- **Bitwise Field Isolation:** Split packed nibbles and TCP bitfields accurately via bit shifts (`>>`) and hexadecimal bitmasks (`& 0x0F`, `& 0x3F`).\n- **Binary Capture Framing (`pcap` & `Scapy`):** Summarize how standard-library `struct` unpacks raw `.pcap` file headers (`24`-byte global + `16`-byte per-packet headers) and when to adopt `Scapy` for authorized large captures.\n\n## 3. Execution-Tested Binary Header Unpacking (`m05_networking.py` Section 3)\n\nExamine Section 3 of `m05_networking.py` decoding the exact raw frame from Course 02 Module 2:\n\n```python\nimport socket\nimport struct\n\nraw = bytes.fromhex(\n    \"450000848983400040065896ac1e0014ac1e000a\"      # IPv4 header (20 bytes)\n    \"adac1f90387bcbb2244ccd33801801f658d10000\"      # TCP header (first 20)\n)\nver_ihl, tos, total_len, ident, flags_frag, ttl, proto, csum, src, dst = \\\n    struct.unpack(\"!BBHHHBBH4s4s\", raw[:20])\nsport, dport, seq, ack, off_flags = struct.unpack(\"!HHIIH\", raw[20:34])\nprint(\"3. version\", ver_ihl >> 4, \"ihl\", (ver_ihl & 0x0F) * 4, \"bytes | total\", total_len,\n      \"| ttl\", ttl, \"| proto\", proto)\nprint(\"  \", socket.inet_ntoa(src), \"->\", socket.inet_ntoa(dst), \"|\", sport, \"->\", dport,\n      \"| tcp header\", (off_flags >> 12) * 4, \"bytes | flags 0x%02x\" % (off_flags & 0x3F))\n```\n\nVerified output from executing `m05_networking.py`:\n\n```terminal\n3. version 4 ihl 20 bytes | total 132 | ttl 64 | proto 6\n   172.30.0.20 -> 172.30.0.10 | 44460 -> 8080 | tcp header 32 bytes | flags 0x18\n```\n\nCheck every element of those two format strings:\n\n| Format Token | Byte Width | Endianness / Type | Extracted Value in Course 02 Demo |\n| :--- | :--- | :--- | :--- |\n| `!` | `0` (prefix) | Network byte order (Big-Endian) | Applies big-endian byte interpretation to entire format string |\n| `B` | `1` byte | Unsigned 8-bit `int` | `ver_ihl = 0x45`, `tos = 0x00`, `ttl = 0x40` (`64`), `proto = 0x06` (`6`) |\n| `H` | `2` bytes | Unsigned 16-bit `int` | `total_len = 0x0084` (`132`), `sport = 0xadac` (`44460`), `dport = 0x1f90` (`8080`) |\n| `I` | `4` bytes | Unsigned 32-bit `int` | `seq = 0x387bcbb2`, `ack = 0x244ccd33` |\n| `4s` | `4` bytes | Raw 4-byte `bytes` slice | `src = b\"\\xac\\x1e\\x00\\x14\"`, `dst = b\"\\xac\\x1e\\x00\\x0a\"` |\n\n- **`socket.inet_ntoa(src)`:** Converts the 4 raw bytes `b\"\\xac\\x1e\\x00\\x14\"` cleanly into human-readable dotted IPv4 notation `\"172.30.0.20\"` (`172 = 0xac`, `30 = 0x1e`, `0 = 0x00`, `20 = 0x14`)! Notice why unpacking `src`/`dst` with `4s` instead of `I` avoids needing a manual `int -> bytes` re-pack before calling `inet_ntoa()`.\n- **Exact Length Requirement:** `struct.unpack(fmt, buffer)` enforces `len(buffer) == struct.calcsize(fmt)` strictly (`20` bytes for `\"!BBHHHBBH4s4s\"`, `14` bytes for `\"!HHIIH\"`). Passing a truncated slice immediately raises `struct.error`, protecting parsers against out-of-bounds garbage reads cleanly!\n\n![Figure 5.9: Unpacking a 20-Byte IPv4 Header with struct.unpack(\"!BBHHHBBH4s4s\")](/assets/courses/cyber-04/c04_m5_l05_struct_ipv4_header_layout.png)\n\n*Figure 5.9 (C04-M05-F3): Byte-aligned IPv4 mapping across !BBHHHBBH4s4s showing all 20 hex header bytes and decoded socket.inet_ntoa values.*\n\n### Diagram Walkthrough: Format-to-Byte Alignment in IPv4 (`Figure 5.9` / `C04-M05-F3`)\n\n- **Bytes `0–11` (Control & Routing Fields):** Prefix `!` selects network big-endian byte order, unpacking `B` (`45` -> `ver_ihl`), `B` (`00` -> `tos = 0`), `H` (`0084` -> `total_len = 132`), `H` (`8983` -> `ident`), `H` (`4000` -> `flags_frag` DF), `B` (`40` -> `ttl = 64`), `B` (`06` -> `proto = 6` TCP), and `H` (`5896` -> `checksum`).\n- **Bytes `12–19` (IPv4 Addresses) & Length Safety:** Two `4s` slices pull raw bytes directly (`ac 1e 00 14` -> `socket.inet_ntoa(src) = \"172.30.0.20\"`, `ac 1e 00 0a` -> `\"172.30.0.10\"`); widths sum to `20` bytes so truncated inputs raise `struct.error`.\n\n![Figure 5.10: Splitting Packed Header Bits with Right Shifts (>>) & Masks (&)](/assets/courses/cyber-04/c04_m5_l05_tcp_bitwise_flags_big_endian.png)\n\n*Figure 5.10: Bitwise shift and mask extraction breaking 1-byte IPv4 0x45 into version 4 / IHL 20 B and 16-bit TCP 0x8018 into offset 32 B / flags 0x18.*\n\n### Diagram Walkthrough: Bitwise Extraction on `0x45` and `0x8018` (`Figure 5.10`)\n\nInspect **Figure 5.10** showing how single bytes and 16-bit integers pack multiple RFC header fields:\n- Byte `0x45` (`0100 0101` binary): right-shifting 4 bits (`0x45 >> 4`) yields `0100` (`4` = IPv4); masking the lower 4 bits (`0x45 & 0x0F`) yields `0101` (`5` four-byte words = `20` bytes IHL).\n- 16-bit integer `0x8018` (`1000 0000 0001 1000` binary): right-shifting 12 bits (`0x8018 >> 12`) isolates the upper nibble `1000` (`8` four-byte words = `32` bytes TCP header, indicating 12 bytes of TCP options present!). Masking the lower 6 control bits (`0x8018 & 0x3F`) extracts `01 1000` (`0x18` = bit `0x10` ACK + bit `0x08` PSH).\n\n## 4. Quantitative Verification: Bitwise Shift & Mask Proofs\n\nTrace the exact bit-level calculations producing Line 3 of `m05_networking.py` stdout:\n\n:::math-steps\nStep 01: Compute total byte footprint of the IPv4 format string !BBHHHBBH4s4s\n$$L_{\\text{fmt}} = (2 \\times 1) + (3 \\times 2) + (2 \\times 1) + 2 + (2 \\times 4) = 2 + 6 + 2 + 2 + 8 = 20\\text{ bytes}$$\nResult: Slice raw[:20] matches struct.calcsize(\"!BBHHHBBH4s4s\") = 20 exactly\n\nStep 02: Extract IPv4 Version, Header Length (IHL), and Total Length from 0x45 and 0x0084\n$$\\text{Version} = \\text{0x45} \\gg 4 = 4, \\quad \\text{IHL} = (\\text{0x45} \\mathbin{\\&} \\text{0x0F}) \\times 4 = 5 \\times 4 = 20\\text{ bytes}, \\quad L_{\\text{total}} = (8 \\times 16) + 4 = 132\\text{ bytes}$$\nResult: Payload plus TCP header occupy 132 - 20 = 112 bytes cleanly inside the datagram\n\nStep 03: Extract TCP Data Offset and Flags from big-endian halfword 0x8018\n$$\\text{TCP Header} = (\\text{0x8018} \\gg 12) \\times 4 = 8 \\times 4 = 32\\text{ bytes}, \\quad \\text{Flags} = \\text{0x8018} \\mathbin{\\&} \\text{0x003F} = \\text{0x18} = \\text{0x10 (ACK)} \\mid \\text{0x08 (PSH)}$$\nResult: Matches Course 02 manual byte dissection (version 4, IHL 20 B, total 132 B, ports 44460 -> 8080, TCP header 32 B, flags 0x18) 100% identically\n:::\n\n## 5. Stepping Up to `.pcap` Files & Scapy\n\nNotice in Practical P2 that you can parse full libpcap `.pcap` captures directly with `struct` and stdlib file I/O: read the **24-byte pcap global header** (whose magic number tells you whether timestamps/lengths inside record headers are little-endian `<` or big-endian `>`), iterate each **16-byte packet record header** (`incl_len` captures exact packet byte count), skip the **14-byte Ethernet header**, and feed the remaining IPv4/TCP slice into `\"!BBHHHBBH4s4s\"`! When full protocol trees across VLAN tags, DNS answers, TLS ClientHello extensions, or HTTP bodies are required on authorized captures, switch cleanly to the third-party **`Scapy`** library referenced in the Course 04 blueprint tool map.\n\n## 6. Key Definitions\n\n- **Network Byte Order (Big-Endian, `!`):** Standard binary representation placing the most significant byte first at the lowest byte offset, mandatory across IP, TCP, and UDP wire headers.\n- **`struct.unpack()`:** Python standard-library routine converting fixed-length binary byte slices into typed tuples governed by an explicit format specification.\n- **Nibble Masking (`>> 4`, `& 0x0F`):** Bitwise shifting and masking idioms separating two 4-bit subfields packed inside one wire octet (such as IPv4 Version and IHL)."
    },
    {
      "id": "les_c4_m5_l6",
      "title": "Lesson 5.6: Safe Network Programming Standards, Practicals & Synthesis",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Integrates defensive network engineering safeguards—authorization boundaries, memory-bounded reads, untrusted payload validation, and clean socket teardown—with Practicals P1 and P2.",
      "learning_objectives": [
        "Enforce scope authorization rules preventing unauthorized scanning or third-party API probing.",
        "Prevent memory-exhaustion attacks by capping recv() sizes, message lengths, and HTTP response bodies.",
        "Validate untrusted network payloads strictly via json.loads and schema checks rather than eval() or pickle.loads().",
        "Complete Practicals C04-M05-P1 (bounded line protocol + server_close) and C04-M05-P2 (full IPv4/TCP/pcap header decoding)."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-05-11",
          "figure_number": "Figure 5.11",
          "lesson_id": "les_c4_m5_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l06_network_dos_memory_bounds.png",
          "title": "Unbounded Read Exhaustion vs. Bounded Frame Limits (256 B Cap & Timeout Gate)",
          "purpose": "Compare an unsafe server executing recv(10_000_000) without framing against a hardened receiver validating frame length <= 256 bytes and rejecting oversize streams cleanly.",
          "accessibility_description": "Comparison diagram showing memory spike and process crash under unbounded 10 MB reads versus capped 256-byte line framing with immediate ERR too long cutoff.",
          "walkthrough_section": "Diagram Walkthrough: Memory-Bounded Stream Ingestion"
        },
        {
          "figure_id": "fig-04-05-12",
          "figure_number": "Figure 5.12",
          "lesson_id": "les_c4_m5_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m5_l06_authorised_scope_untrusted_payload_gate.png",
          "title": "Defensive Network Code Checklist: Authorized Scope, Loopback Binding & Untrusted Input Gate",
          "purpose": "Present the end-to-end engineering checklist spanning written authorization verification, loopback/authenticated binding, TLS verification, timeout caps, and non-executing JSON decoding.",
          "accessibility_description": "Five-gate vertical security checklist routing network code through target authorization, TLS trust, timeouts, bounded read, and JSON schema validation before application processing.",
          "walkthrough_section": "Diagram Walkthrough: Five-Gate Network Safety Architecture"
        }
      ],
      "images": [
        {
          "id": "fig-04-05-11",
          "title": "Figure 5.11: Unbounded Network Reads vs. Bounded 256-Byte Frame Caps",
          "url": "/assets/courses/cyber-04/c04_m5_l06_network_dos_memory_bounds.png",
          "caption": "Figure 5.11: Unbounded recv(10_000_000) fills worker RAM to 100% OOM crash, whereas recv(1024) chunks capped at <= 256 B keep RAM near 10% and reject oversize frames with ERR too long.",
          "alt": "Side-by-side comparison showing an unsafe recv(10_000_000) server flooding a RAM tank to 100% crash versus a bounded server checking recv(1024) packets against a <= 256 B gate with ~10% RAM gauge and ERR too long rejection."
        },
        {
          "id": "fig-04-05-12",
          "title": "Figure 5.12: Five Security Gates for Safe Network Python Code",
          "url": "/assets/courses/cyber-04/c04_m5_l06_authorised_scope_untrusted_payload_gate.png",
          "caption": "Figure 5.12: Sequential five-gate safety pipeline checking authorization, TLS validation, timeout caps, MAX_BYTES frame limits, and safe json.loads() decoding before processing data.",
          "alt": "Horizontal flow routing Untrusted Network Bytes through five icon gates (1. Authorized Target?, 2. Valid TLS? Never verify=False, 3. Timeout Set?, 4. Size Cap? <= MAX_BYTES, 5. json.loads() Only, never eval or pickle) into Safe Validated Data."
        }
      ],
      "lab_resources": [
        {
          "name": "m05_networking.py",
          "url": "/assets/courses/cyber-04/labs/m05_networking.py",
          "description": "Module 5 sockets, HTTP client/server & struct binary decoder lab script"
        }
      ],
      "content": "## 1. Hardening Network Code Against Authorization Drift & Malicious Peers\n\nWriting working socket clients or REST integrations represents only half the task of defensive software engineering. Network interfaces accept bytes over untrusted media: remote peers drop connections mid-frame, send megabytes without newline terminators to trigger out-of-memory kills, return unexpected types in JSON fields, or tempt inexperienced operators into aiming tools at third-party infrastructure. This concluding lesson unifies Module 5's defensive rules into an audit checklist alongside hands-on Practicals **C04-M05-P1** and **C04-M05-P2**.\n\n## 2. Core Objectives for This Lesson\n\n- **Six Safe Network Rules:** Synthesize scope authorization, mandatory timeouts, strict read/body size caps, untrusted payload validation, loopback-first binding with TLS verification, and clean socket teardown.\n- **Practical C04-M05-P1:** Extend `m05_networking.py` into a multi-message newline-framed local service enforcing a `256`-byte message cap and clean `httpd.server_close()`.\n- **Practical C04-M05-P2:** Complete full IPv4 flag/fragment decoding, TCP sequence/acknowledgement flag-name mapping, and optional libpcap header traversal over `rk_c02_lab.pcap`.\n- **Operational Verification Scenarios:** Reason systematically through insecure `verify=False` reviews, `10_000_000`-byte `recv` DoS flaws, and unauthorized customer-endpoint testing requests.\n\n## 3. The Six Non-Negotiable Rules of Defensive Network Code\n\nApply every rule below before committing network scripts (`Figure 5.12`):\n\n1. **Authorized Targets Only:** Only connect to, listen on, or probe hosts you own or hold documented written permission to test. Pointing scripts casually at vendor other-customer endpoints constitutes unauthorized access and violates laws taught in Course 01 Module 7.\n2. **Timeouts Everywhere:** Pass explicit `timeout=` ceilings on every `create_connection()`, `socket.settimeout()`, `urlopen()`, and `requests.*()` invocation—never allow blocking network I/O to stall scheduler slots or alert pipelines.\n3. **Hard Input & Body Size Limits (`Figure 5.11`):** Bound every `recv()` accumulator (`<= MAX_FRAME_BYTES`) and HTTP body `.read(MAX_BODY + 1)` so hostile peers cannot crash Python workers via memory exhaustion (`MemoryError` / OOM kill).\n4. **Treat All Network Bytes as Untrusted:** Parse strictly via `json.loads()` inside `try/except json.JSONDecodeError` + explicit field/type validation—**never** run `eval()`, `exec()`, or `pickle.loads()` on bytes off the wire!\n5. **Loopback Binding & Verified TLS:** Bind local services to `127.0.0.1` unless explicitly authenticated and firewalled; keep PEP 476 / `ssl.create_default_context()` verification permanently enabled (fixing trust stores instead of `verify=False`).\n6. **Close Every Resource:** Wrap client sockets and `accept()` descriptors in `with` context managers and explicitly call `srv.close()` / `httpd.server_close()` so kernels never leave zombie listening sockets behind.\n\n### Diagram Walkthrough: Memory-Bounded Stream Ingestion (`Figure 5.11`)\n\n![Unbounded Network Reads vs. Bounded 256-Byte Frame Caps](/assets/courses/cyber-04/c04_m5_l06_network_dos_memory_bounds.png)\n*Unbounded Network Reads vs. Bounded 256-Byte Frame Caps.*\n\nContrast the two server paths in **Figure 5.11**:\n- **Unsafe (`recv(10_000_000)`) Exhaustion Path:** On the left, a peer streaming `100 MB (no '\\n')` into an unguarded receiver drives the worker `RAM` tank straight to `100%`, ending in **`RAM Full -> Crash (OOM)!`** because zero frame ceiling or schema check stops allocation growth.\n- **Safe (`Bounded 256-Byte Limit`) Path:** On the right, packets arrive via incremental `recv(1024)` reads into an explicit `<= 256 B?` gate—routing short messages cleanly into `Valid -> Safe Parse` at roughly `~10%` `RAM`, while anything `> 256 B` triggers **`ERR too long` & Close!** immediately.\n\n### Diagram Walkthrough: Five-Gate Network Safety Architecture (`Figure 5.12`)\n\n![Five Security Gates for Safe Network Python Code](/assets/courses/cyber-04/c04_m5_l06_authorised_scope_untrusted_payload_gate.png)\n*Five Security Gates for Safe Network Python Code.*\n\nReview **Figure 5.12**:\n- **Gate Sequence Before Processing:** Every envelope carrying **`Untrusted Network Bytes`** must clear five sequential gates left-to-right before reaching **`Safe Validated Data`**:\n  1. **`Authorized Target?` (`Permission verified`):** Confirm explicit scope/allowlist ownership before dialing out.\n  2. **`Valid TLS?` (`Never verify=False`):** Enforce certificate validation and trusted CAs.\n  3. **`Timeout Set?` (`e.g. timeout=5s`):** Bound socket and HTTP blocking windows against slowloris stalls.\n  4. **`Size Cap?` (`<= MAX_BYTES`):** Enforce strict read/frame memory limits on inbound streams.\n  5. **`json.loads() Only` (`Never eval() / pickle!`):** Parse inert structured JSON and reject code-executing deserializers.\n\n## 4. Hands-On Practicals: C04-M05-P1 & C04-M05-P2\n\nBuild and test bounded client-server framing alongside TLS certificate diagnostics strictly inside authorized local loopback environments.\n\n### Practical C04-M05-P1: Build a Line-Based Local Service\n- **Objective:** Implement a loopback-only (`127.0.0.1`) TCP server and client exchanging newline-delimited messages with bounded framing and clean HTTP shutdown.\n- **Required Tools:** Python `3.10+`, `m05_networking.py`.\n- **Authorized Scope:** Strictly `127.0.0.1` loopback.\n- **Steps:**\n  1. Run `m05_networking.py` as baseline and match stdout against Section 1–3 outputs.\n  2. Upgrade the TCP handler to read multiple newline-delimited (`b\"\\n\"`) messages sequentially per connection until client EOF (`b\"\"`), replying `f\"OK {len(msg)}\\n\".encode()` to each line.\n  3. Enforce a hard **maximum line size of `256` bytes**: if buffered bytes exceed `256` before `\\n` (or an incoming line exceeds `256` bytes), reply `b\"ERR too long\\n\"` and close the client socket immediately.\n  4. Wrap client connections in explicit timeouts (`timeout=3`) catching `socket.timeout` / `TimeoutError` cleanly.\n  5. Fix Section 2's lingering HTTP shutdown bug by calling `httpd.server_close()` directly after `httpd.shutdown()`, and re-run the follow-up `urlopen` probe.\n- **Expected Observations:** Follow-up `urlopen` immediately raises **`ConnectionRefusedError`** (wrapped via `URLError`) rather than blocking for 2 seconds into `TimeoutError`! If a peer closes cleanly mid-stream, `recv()` returns `b\"\"`.\n\n### Practical C04-M05-P2: Decode Binary Headers Programmatically\n- **Objective:** Expand `struct` binary dissection to extract full IPv4 flag bits, fragment offset, TCP `seq`/`ack`, named TCP control flags, and optional `.pcap` packets.\n- **Required Tools:** Python `3.10+`, Course 02 packet capture bytes (`raw`).\n- **Authorized Scope:** Provided Course 02 lab captures only.\n- **Steps:**\n  1. Decode every field of `raw[:20]` including extracting the 3 IPv4 flags (`flags = flags_frag >> 13`) and 13-bit fragment offset (`frag_offset = flags_frag & 0x1FFF`). Notice `flags_frag = 0x4000` sets the **Don't Fragment (DF)** flag (`0x4000 >> 13 = 2`, bit 1 set) with fragment offset `0`.\n  2. Print full 32-bit `seq` and `ack`, and iterate flag masks `{0x01: \"FIN\", 0x02: \"SYN\", 0x04: \"RST\", 0x08: \"PSH\", 0x10: \"ACK\", 0x20: \"URG\"}` across `off_flags & 0x3F` to print `['PSH', 'ACK']`.\n  3. **Optional Extension (`rk_c02_lab.pcap`):** Parse the `24`-byte libpcap global header with `struct` (detecting `<` vs. `>` endianness from magic `0xa1b2c3d4`), loop over `16`-byte per-packet record headers (`ts_sec, ts_usec, incl_len, orig_len`), skip the `14`-byte Ethernet header (`EtherType == 0x0800`), and log every IPv4 source -> destination address pair cleanly.\n- **Expected Observations:** DF flag set (`0x4000`), TCP flags `['PSH', 'ACK']`; any malformed slice triggers explicit `struct.error`.\n\n## 5. Module Synthesis & Core Glossary\n\n- **Big-Endian:** Byte order placing the most significant byte first at the lowest memory/wire address, synonymous with network byte order (`!` in `struct`).\n- **Ephemeral Port:** Temporary client or dynamic server port allocated above `1023` by the operating system kernel.\n- **`HTTPError`:** `urllib.error` exception raised on HTTP `4xx`/`5xx` responses carrying both `.code` and a readable response stream.\n- **Loopback (`127.0.0.1` / `::1`):** Host-local interface unreachable from external networks, recommended default for local services and tests.\n- **PEP 476:** Python standard requiring HTTPS certificate chain and hostname verification by default.\n- **`sendall()`:** Reliable socket transmission helper ensuring the full byte buffer is sent rather than partial writes.\n- **Socket:** Operating-system endpoint for network communication identified by address family, socket type, and `(IP, port)` pair.\n- **`struct`:** Python standard-library module packing and unpacking raw C/network binary structs via explicit endianness and scalar format characters."
    }
  ]
};
