/**
 * Course 04: Python for Cybersecurity — Module 5 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module5QuestionBank = [
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
  },
  {
    "id": "q_c4_m5_021",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "What exact value does `conn.recv(1024)` return once the remote peer cleanly closes its TCP write stream?",
    "options": [
      "`None`",
      "`-1`",
      "`b''` (an empty `bytes` object)",
      "`'EOF'`"
    ],
    "correct": 2,
    "explanation": "Empty bytes b'' signals TCP EOF cleanly; read loops must check `if not chunk: break`."
  },
  {
    "id": "q_c4_m5_022",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "A bug in a custom TCP alert receiver loops `while True: chunk = conn.recv(1024); buf += chunk` *without* breaking when `chunk == b''`. What symptom manifests immediately when a client disconnects?",
    "options": [
      "After EOF, `conn.recv(1024)` returns `b''` instantaneously on every iteration without blocking, pinning a CPU core at 100% indefinitely",
      "The loop exits with `struct.error`",
      "`socket.SO_REUSEADDR` drops the host interface",
      "Python automatically re-opens a new handshake to the client"
    ],
    "correct": 0,
    "explanation": "Once a socket hits EOF, non-blocking or blocking recv() returns b'' immediately forever unless handled cleanly to break."
  },
  {
    "id": "q_c4_m5_023",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "What does the `timeout=5` argument in `socket.create_connection((HOST, port), timeout=5)` govern?",
    "options": [
      "Only DNS lookups, leaving TCP reads unbounded",
      "Only server `bind()` initialization",
      "Both the initial TCP connect attempt and subsequent socket I/O operations such as `recv()`",
      "Maximum size of each message in kilobytes"
    ],
    "correct": 2,
    "explanation": "Passing timeout= to create_connection sets the default timeout for connecting and subsequent blocking operations on that socket."
  },
  {
    "id": "q_c4_m5_024",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "If a server enforces Practical P1's bounded newline framing (`MAX_LINE = 256` bytes), at what point MUST the server reject an attacker streaming `'A' * 1_000_000` with zero `'\\n'` bytes?",
    "options": [
      "Only after reading the entire 1 MB stream to verify no newline exists",
      "After calling `json.loads(buffer)`",
      "Inside the incremental `recv()` loop as soon as `len(buffer) > 256` before any newline arrives—replying `'ERR too long'` and closing the socket immediately",
      "By changing `bind()` to port `256`"
    ],
    "correct": 2,
    "explanation": "Checking buffer length on every received chunk caps memory usage at ~256 bytes instead of allowing unbounded RAM growth."
  },
  {
    "id": "q_c4_m5_025",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "What output does Section 1 of `m05_networking.py` print when `cli.sendall(b'hello redkross')` completes against `echo_server`?",
    "options": [
      "`1. server port is ephemeral: True | reply: ECHO: HELLO REDKROSS`",
      "`1. server port is ephemeral: False | reply: hello redkross`",
      "`1. server port is 8080 | reply: TimeoutError`",
      "`1. server port is ephemeral: True | reply: b'hello redkross'`"
    ],
    "correct": 0,
    "explanation": "The server prepends b'ECHO: ' to data.upper() and binds port 0 (> 1023), printing True and ECHO: HELLO REDKROSS."
  },
  {
    "id": "q_c4_m5_026",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "You design a binary TCP telemetry protocol using 4-byte length-prefixed frames (`!I` followed by payload bytes). What catastrophic bug occurs if a receiver runs `payload = read_exact(conn, hdr_len)` without capping `hdr_len` first?",
    "options": [
      "`struct.pack('!I')` only supports lengths under 255",
      "TCP streams prohibit length headers containing zero bytes",
      "An unauthenticated peer can send `b'\\x7f\\xff\\xff\\xff'` (~2.1 GiB) as the 4-byte header, causing the receiver to allocate or hang waiting for gigabytes of memory",
      "`socket.inet_ntoa` throws `KeyError` on framing integers"
    ],
    "correct": 2,
    "explanation": "Protocol length prefixes are untrusted input and must be compared against an application MAX_FRAME limit before allocating buffers."
  },
  {
    "id": "q_c4_m5_027",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "Why does `echo_server` wrap the accepted socket `conn` in `with conn:`?",
    "options": [
      "To convert binary bytes into UTF-8 strings automatically",
      "To increase the `listen()` backlog queue dynamically",
      "To keep the listening socket `srv` bound after process exit",
      "To guarantee the connected socket closes cleanly when exiting the block even if an exception occurs"
    ],
    "correct": 3,
    "explanation": "Socket objects support the context-manager protocol so `with conn:` reliably releases OS file descriptors."
  },
  {
    "id": "q_c4_m5_028",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "In `m05_networking.py`, `conn, addr = sock.accept()`. If you run `srv.listen(1)`, what does `1` control?",
    "options": [
      "Total lifetime bytes `echo_server` may exchange",
      "Maximum number of CPU threads allowed in Python",
      "Number of seconds before `accept()` raises `TimeoutError`",
      "The maximum queue length (backlog) of unaccepted completed TCP handshakes held pending by the OS kernel before `accept()` retrieves them"
    ],
    "correct": 3,
    "explanation": "The backlog parameter sets how many pending established connections the kernel queues prior to accept()."
  },
  {
    "id": "q_c4_m5_029",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "What are the two most common reliable framing techniques applied on top of TCP byte streams?",
    "options": [
      "Random UDP headers and HTML comments",
      "Explicit delimiter bytes (such as `b'\\n'`) or explicit binary length prefixes",
      "Changing `AF_INET` to `AF_INET6` per packet",
      "Calling `time.sleep(1)` between `sendall()` invocations"
    ],
    "correct": 1,
    "explanation": "Timed sleeps never guarantee framing across congested networks; only delimiters or length prefixes define unambiguous message frames."
  },
  {
    "id": "q_c4_m5_030",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Suppose a client closes its socket while sending half of a newline-framed JSON record (`b'{\"alert\": \"high\"'` with no `'\\n'`). How should the bounded server behave when `recv()` subsequently returns `b''`?",
    "options": [
      "Eval the partial fragment so data is not lost",
      "Discard or flag the truncated incomplete frame cleanly and close `conn`, refusing to feed incomplete bytes into `json.loads()`",
      "Prepend `b'{}'` unconditionally and log success",
      "Loop `recv()` indefinitely assuming a delayed packet will arrive after EOF"
    ],
    "correct": 1,
    "explanation": "Peer EOF prior to reaching a complete delimiter means a truncated message; it must be rejected/logged rather than processed as valid JSON."
  },
  {
    "id": "q_c4_m5_031",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "In `cli.recv(1024)`, what does `1024` actually represent?",
    "options": [
      "Exact number of bytes guaranteed to arrive before returning",
      "The *maximum* number of bytes returned by that single `recv()` call",
      "TCP handshake port number",
      "Timeout duration in milliseconds"
    ],
    "correct": 1,
    "explanation": "recv(bufsize) returns *up to* bufsize bytes—fewer may arrive on any single call."
  },
  {
    "id": "q_c4_m5_032",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Why does `m05_networking.py` call `srv.close()` immediately after the `with socket.create_connection(...)` block finishes, rather than relying solely on `with conn:` inside the thread?",
    "options": [
      "`with conn:` throws `KeyError` unless `srv.close()` precedes it",
      "`srv.close()` flushes `reply.decode()` onto standard error",
      "Without `srv.close()`, `SOCK_STREAM` turns into `SOCK_DGRAM`",
      "`with conn:` closes only the individual accepted session socket; the passive listening socket `srv` remains bound until explicitly closed via `srv.close()`"
    ],
    "correct": 3,
    "explanation": "Listening and accepted session sockets are independent descriptors; closing conn does not release the listening socket srv."
  },
  {
    "id": "q_c4_m5_033",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In standard library `urllib.request.urlopen()`, what happens when an HTTP server returns status code `404 Not Found` or `500 Internal Server Error`?",
    "options": [
      "`urlopen` returns `None` silently",
      "`urlopen` raises `SyntaxError`",
      "`urlopen` raises `urllib.error.HTTPError`",
      "`urlopen` retries 10 times automatically"
    ],
    "correct": 2,
    "explanation": "urllib raises HTTPError for HTTP 4xx and 5xx error responses."
  },
  {
    "id": "q_c4_m5_034",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "How can `get_json('/missing')` in `m05_networking.py` still print `(404, {'error': 'not found'})` even though `urlopen` raised `urllib.error.HTTPError`?",
    "options": [
      "`HTTPError` acts as a readable file-like response object carrying `.code` and the server's JSON error body so `json.load(err)` parses cleanly",
      "The exception handler reconnects silently over UDP port 404",
      "HTTP 404 forces `http.server` to resend the payload inside `User-Agent`",
      "`HTTPError` converts HTML into Python dicts via `eval()`"
    ],
    "correct": 0,
    "explanation": "urllib.error.HTTPError provides .code, .headers, and .read()/.load() access to the server's error response body."
  },
  {
    "id": "q_c4_m5_035",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Why did `m05_networking.py` print `after shutdown: TimeoutError` after `httpd.shutdown()` was executed without `httpd.server_close()`?",
    "options": [
      "`shutdown()` stopped Python's handler loop while leaving the OS listening socket open, so the OS queued the TCP connect without anyone replying until timeout",
      "DNS failed on localhost",
      "`urllib` requires `requests` after any HTTP shutdown",
      "HTTP 404 puts localhost into airplane mode"
    ],
    "correct": 0,
    "explanation": "Leaving the listening descriptor open without server_close() lets the OS accept incoming SYNs that Python no longer services."
  },
  {
    "id": "q_c4_m5_036",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "In Practical P1 step 5, when you add `httpd.server_close()` immediately after `httpd.shutdown()`, why does the subsequent `urlopen()` call raise `ConnectionRefusedError` (via `URLError`) milliseconds later instead of timing out after 2 seconds?",
    "options": [
      "`server_close()` sends an HTTP 503 error JSON body",
      "`server_close()` closes the OS listening file descriptor cleanly so the kernel responds immediately with TCP RST / connection refused rather than queuing unanswered SYNs",
      "`server_close()` modifies `/etc/hosts` to delete 127.0.0.1",
      "`server_close()` resets the client's `timeout=2` value to `timeout=0.001`"
    ],
    "correct": 1,
    "explanation": "Once the listening socket closes, the OS stops accepting incoming connections and fails fast with connection refused."
  },
  {
    "id": "q_c4_m5_037",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Does the popular third-party Python `requests` library enforce a default network timeout if you call `requests.get('https://api.example/v1/iocs')` without specifying `timeout=`?",
    "options": [
      "Yes, 30 seconds by default",
      "Yes, 5 seconds for HTTPS",
      "No — `requests` waits indefinitely unless you explicitly pass `timeout=`",
      "Only on POST requests"
    ],
    "correct": 2,
    "explanation": "Official requests documentation stresses that requests applies NO timeout by default; callers must pass timeout= explicitly."
  },
  {
    "id": "q_c4_m5_038",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Contrast `urllib.request.urlopen()` vs. `requests.get()` when a security API returns HTTP `503 Service Unavailable`. What bug hits developers switching from `urllib` to `requests` if they forget `.raise_for_status()`?",
    "options": [
      "`requests.get()` skips TLS validation on HTTP 5xx",
      "`requests.get()` turns 503 status codes into port 503 retries",
      "Unlike `urlopen` (which raises `HTTPError` on 4xx/5xx automatically), `requests.get()` returns normally on `503`, so calling `resp.json()` on an HTML 503 page or skipping `raise_for_status()` hides server errors",
      "`urllib` ignores `200 OK` responses unless `.raise_for_status()` runs"
    ],
    "correct": 2,
    "explanation": "requests returns Response objects for 4xx/5xx statuses unless response.raise_for_status() is invoked."
  },
  {
    "id": "q_c4_m5_039",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Why should security API scripts send an explicit `User-Agent` header (e.g., `'rk-c04-client/1.0'`) on outbound `urllib.request.Request` calls?",
    "options": [
      "It identifies your automation cleanly to service operators, proxies, and audit logs instead of mimicking anonymous scraper traffic",
      "It encrypts the HTTP body inside TLS",
      "It enables HTTP `429` compression automatically",
      "Python's `json.load()` fails if `User-Agent` is absent"
    ],
    "correct": 0,
    "explanation": "Clear User-Agent strings aid operations debugging and comply with API etiquette."
  },
  {
    "id": "q_c4_m5_040",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "In fictional Case Study C04-M05-CS2 (Lotus Logistics), why did calling `requests.get(rep_url)` with no timeout freeze the entire SIEM alert pipeline for two hours rather than failing noisily?",
    "options": [
      "The API returned HTTP 200 empty dicts continuously",
      "DNS queries cached `127.0.0.1` instead of the API server",
      "Python's garbage collector paused all threads while scanning sockets",
      "The hung reputation server accepted TCP connections without ever transmitting an HTTP response, pinning every synchronous enrichment worker indefinitely and starving downstream alert delivery"
    ],
    "correct": 3,
    "explanation": "Without timeouts, half-open or stalled TCP reads block caller threads forever, halting upstream processing."
  },
  {
    "id": "q_c4_m5_041",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "What architectural pattern prevented Lotus Logistics' future SIEM stalls by skipping non-essential enrichment automatically after repeated API failures?",
    "options": [
      "Recursive polling",
      "Disabling TLS checks",
      "Circuit breaker combined with short timeouts and alerts on repeated failures",
      "Setting `listen(1000)`"
    ],
    "correct": 2,
    "explanation": "A circuit breaker detects consecutive failures, fails fast to keep primary alerts flowing, and alerts operators."
  },
  {
    "id": "q_c4_m5_042",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Your threat-intelligence enrichment script receives HTTP `429 Too Many Requests` along with header `Retry-After: 12`. What is the correct defensive client response?",
    "options": [
      "Respect the `Retry-After` interval (sleeping ~12s cleanly with capped retries/jitter) instead of hammering the API in a tight retry loop",
      "Switch immediately to `verify=False` to bypass throttling",
      "Fork 50 additional worker threads to claim remaining quota faster",
      "Convert the request into `http://` plaintext to avoid TLS delays"
    ],
    "correct": 0,
    "explanation": "Tight retry loops amplify rate-limiting bans and outage impact; obeying Retry-After and exponential backoff preserves service health."
  },
  {
    "id": "q_c4_m5_043",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Why does Python documentation warn against deploying `http.server.HTTPServer` as an internet-facing production server?",
    "options": [
      "It only implements simple security checks and is intended for local testing and mocks, not hardened public exposure",
      "It cannot serialize JSON dictionaries",
      "It only supports Python 2 syntax",
      "It forces `verify=False` on all clients"
    ],
    "correct": 0,
    "explanation": "http.server lacks production request validation, isolation, and DoS hardening; restrict it strictly to localhost test/demo mocks."
  },
  {
    "id": "q_c4_m5_044",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "A SOC script logs `'Calling API with headers=' + repr(headers)` to help debug `HTTPError` failures. Why violates API hygiene?",
    "options": [
      "`repr(headers)` strips JSON curly braces",
      "`HTTPError` deletes `headers` automatically",
      "`logging` crashes on tuples",
      "`headers` frequently contains live `Authorization: Bearer ...` secrets; logs must record correlation/request IDs and status codes while strictly redacting secrets"
    ],
    "correct": 3,
    "explanation": "Printing raw request headers leaks bearer tokens and API keys into central log stores."
  },
  {
    "id": "q_c4_m5_045",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Where should production API tokens be stored and loaded by Python security integrations?",
    "options": [
      "Inside source-code string literals committed to Git",
      "In a secrets manager or injected runtime environment variables",
      "Inside the `User-Agent` header",
      "Inside HTML comments returned by `/api/status`"
    ],
    "correct": 1,
    "explanation": "Never commit API credentials in source files; load them from secure runtime stores or environment variables."
  },
  {
    "id": "q_c4_m5_046",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Under bounded resilience math (`timeout=3` s, 1 initial try + 2 retries with 1 s and 2 s backoff prior to tripping a circuit breaker), what is the maximum blocking delay experienced by one alert during an enrichment outage?",
    "options": [
      "3 seconds",
      "6 seconds",
      "Indefinite",
      "12 seconds (`3*3 + 1 + 2`), after which the open circuit skips downstream calls in < 1 ms"
    ],
    "correct": 3,
    "explanation": "Three timeout-bounded attempts (9s) plus backoff waits (3s) bound per-item stall at 12s before opening the circuit breaker."
  },
  {
    "id": "q_c4_m5_047",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Which standard-library exception branch in Figure C04-M05-F2 specifically handles DNS lookup failures or closed TCP target ports?",
    "options": [
      "`HTTPError` (2xx)",
      "`urllib.error.URLError` / `ConnectionError`",
      "`json.JSONDecodeError`",
      "`struct.error`"
    ],
    "correct": 1,
    "explanation": "Connection failures and host lookup errors surface as URLError / ConnectionError rather than HTTPError."
  },
  {
    "id": "q_c4_m5_048",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Why must an API consumer paginate with a maximum page-count safety cap when polling an external alert feed cursor endpoint?",
    "options": [
      "To increase HTTP 200 compression speed",
      "Pagination disables `HTTPError` checking",
      "`urllib` rejects page sizes over 10 items",
      "A buggy or malicious `next_cursor` loop echoing the same cursor endlessly will otherwise trigger an infinite request loop and memory exhaustion"
    ],
    "correct": 3,
    "explanation": "Cursor-pagination loops must guard against repeating cursors and runaway iteration counts."
  },
  {
    "id": "q_c4_m5_049",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "What crucial security change did PEP 476 introduce into Python 2.7.9 and 3.4.3 standard-library HTTP clients?",
    "options": [
      "Replacing JSON with binary `pickle` serialization",
      "Enabling HTTPS server certificate chain and hostname verification by default",
      "Disabling HTTP port 80 connections completely",
      "Forcing all sockets to bind to `127.0.0.1`"
    ],
    "correct": 1,
    "explanation": "Before PEP 476, stdlib HTTP clients did not validate TLS server certificates by default; PEP 476 turned secure verification ON globally."
  },
  {
    "id": "q_c4_m5_050",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "An analyst runs a Python script on a host where traffic traverses a malicious rogue proxy. If the script sets `requests.get(url, verify=False)` to silence errors, what protection remains against active eavesdropping or tampering?",
    "options": [
      "TLS still prevents tampering because RSA encryption stays active",
      "Bearer tokens stay hashed inside `Authorization` headers",
      "Hostname verification still blocks the proxy automatically",
      "Zero effective confidentiality or integrity protection remains against an on-path attacker, who simply completes TLS with an untrusted certificate, decrypts tokens/bodies, and proxies onward"
    ],
    "correct": 3,
    "explanation": "Encryption to an unverified public key guarantees confidentiality ONLY toward whoever holds that key—including an on-path MITM attacker."
  },
  {
    "id": "q_c4_m5_051",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "What are the two core validations performed automatically by Python's `ssl.create_default_context()`?",
    "options": [
      "Port parity and UDP checksum",
      "Certificate trust chain/expiry verification and matching the queried server hostname against certificate SAN/CN entries",
      "Password length and `User-Agent` spelling",
      "MTU size and big-endian conversion"
    ],
    "correct": 1,
    "explanation": "Default TLS context validates cryptographic CA signatures, validity window, and server hostname identity."
  },
  {
    "id": "q_c4_m5_052",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "Suppose an attacker owns a genuine trusted CA-signed certificate for `evil-ads.example`. Why does default Python HTTPS verification still block them if they replay that valid certificate while impersonating `siem-api.corp.example`?",
    "options": [
      "Python limits CA validity to 24 hours",
      "PEP 476 forbids multi-domain SAN lists",
      "`User-Agent` hashes block mismatched certificates",
      "Hostname verification (`check_hostname = True`) compares the requested DNS host (`siem-api.corp.example`) against the certificate's Subject Alternative Name (SAN) and rejects the mismatch"
    ],
    "correct": 3,
    "explanation": "Trusting a root CA alone is insufficient without checking that the certificate was actually issued to the target hostname."
  },
  {
    "id": "q_c4_m5_053",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "During Course 02 / Course 04 testing on Windows, a default TLS check against `example.com` raised `CERTIFICATE_VERIFY_FAILED: unable to get local issuer certificate`. Which verified fix solved it WITHOUT lowering TLS security?",
    "options": [
      "Passing `verify=False`",
      "Supplying the trusted `certifi` CA bundle via `ssl.create_default_context(cafile=certifi.where())`",
      "Switching the URL from `https://` to `http://`",
      "Using `ssl._create_unverified_context()`"
    ],
    "correct": 1,
    "explanation": "Explicitly loading the up-to-date Mozilla-curated certifi CA bundle preserves full chain and hostname checks cleanly (negotiating TLSv1.3)."
  },
  {
    "id": "q_c4_m5_054",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "An internal enterprise ticketing API uses a certificate signed by your company's private root CA (`corp-root-ca.pem`), causing `CERTIFICATE_VERIFY_FAILED` in a `requests` script. Which remediation preserves strict security?",
    "options": [
      "Call `urlopen` inside `try/except SSLError: pass` and ignore verification",
      "Pass `verify=False` and warn users in a README comment",
      "Hardcode `ssl.PROTOCOL_TLSv1` without certificates",
      "Pass `requests.get(url, verify='/path/to/corp-root-ca.pem', timeout=5)` or install the corporate root CA cleanly into the host's trusted CA store"
    ],
    "correct": 3,
    "explanation": "Trusting the specific internal CA PEM file or updating the system trust store keeps full validation active without disabling verification."
  },
  {
    "id": "q_c4_m5_055",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Why does disabling certificate verification (`verify=False`) violate PEP 476's design intent?",
    "options": [
      "It prevents `json.load()` from decoding Unicode characters",
      "It turns Python back into pre-PEP-476 unsafe behavior where silent interception goes completely undetected",
      "It locks local TCP ports above 49,152",
      "It prevents `SO_REUSEADDR` from functioning"
    ],
    "correct": 1,
    "explanation": "Suppressing secure defaults reintroduces silent adversary-in-the-middle vulnerability."
  },
  {
    "id": "q_c4_m5_056",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "When `certifi` remediation succeeded against `example.com` in the Course 02 / Course 04 test run, which TLS version and AEAD cipher suite were verified active?",
    "options": [
      "SSLv3 with `RC4-MD5`",
      "Cleartext HTTP/1.1",
      "`TLSv1.0` with `3DES-CBC`",
      "`TLSv1.3` with cipher `TLS_AES_256_GCM_SHA384`"
    ],
    "correct": 3,
    "explanation": "Verified Course 02 research recorded TLSv1.3 using strong AEAD cipher TLS_AES_256_GCM_SHA384 once trusted via certifi.where()."
  },
  {
    "id": "q_c4_m5_057",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Besides missing CA trust bundles, what server misconfiguration commonly triggers `CERTIFICATE_VERIFY_FAILED` on otherwise valid commercial certificates?",
    "options": [
      "Returning JSON instead of XML",
      "Server failing to send required intermediate CA certificates (or an expired certificate / mismatched SAN host)",
      "Using big-endian byte order",
      "Returning HTTP 204 No Content"
    ],
    "correct": 1,
    "explanation": "Incomplete server certificate chains, expired validity windows, or SAN mismatches all cause legitimate TLS verification rejections."
  },
  {
    "id": "q_c4_m5_058",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "In CI security scanning (automated linting), why should occurrences of `verify=False` or `_create_unverified_context` fail builds cleanly?",
    "options": [
      "They slow Python bytecode compilation slightly",
      "They disable `sendall()` buffering",
      "Python 3.14 deleted the keyword argument completely",
      "Developers routinely leave temporary TLS-bypass hacks inside production automation, quietly defeating encryption authenticity across live secrets"
    ],
    "correct": 3,
    "explanation": "Temporary debugging flags routinely slip into production commits unless blocked automatically in review/CI gates."
  },
  {
    "id": "q_c4_m5_059",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "What does the leading `'!'` character signify inside `struct.unpack('!BBHHHBBH4s4s', raw[:20])`?",
    "options": [
      "Negate all unpacked integers",
      "Network (big-endian) byte order",
      "Little-endian Intel host byte order",
      "Optional variable-length padding"
    ],
    "correct": 1,
    "explanation": "In Python's struct module, '!' explicitly sets network (big-endian) byte order matching IP/TCP RFC headers."
  },
  {
    "id": "q_c4_m5_060",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "If a developer on an x86/Windows little-endian CPU omits `'!'` and calls `struct.unpack('BBHHHBBH4s4s', raw[:20])` on the Course 02 packet (`0084` hex total length = `132`), what corrupted value will Python unpack for `total_len`?",
    "options": [
      "`132` (no change)",
      "`struct.error` before reading",
      "`-132`",
      "`33792` (`0x8400` because native little-endian reverses the two bytes `00` and `84`!)"
    ],
    "correct": 3,
    "explanation": "Big-endian wire bytes 0x00 0x84 represent 132; misinterpreting them as native little-endian reads 0x8400 = 33,792!"
  },
  {
    "id": "q_c4_m5_061",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "How many bytes does each `struct` format character `B`, `H`, `I`, and `4s` consume?",
    "options": [
      "1, 4, 8, and 16 bytes respectively",
      "1, 2, 4, and 4 bytes respectively",
      "2, 4, 8, and 4 bytes respectively",
      "8, 16, 32, and 4 bits respectively"
    ],
    "correct": 1,
    "explanation": "B = unsigned 1-byte uint8, H = unsigned 2-byte uint16, I = unsigned 4-byte uint32, 4s = 4-byte bytes object."
  },
  {
    "id": "q_c4_m5_062",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Verify the exact byte span consumed by `'!BBHHHBBH4s4s'` in `m05_networking.py`. Why must `raw[:20]` be exactly 20 bytes long?",
    "options": [
      "`4s` expands dynamically up to null terminators",
      "`H` counts 4 bytes on 64-bit Python",
      "`!` adds 4 bytes of magic padding",
      "`(2*1) + (3*2) + (2*1) + 2 + (2*4) = 20` bytes; passing any fewer or extra bytes makes `struct.unpack()` raise `struct.error` immediately"
    ],
    "correct": 3,
    "explanation": "2 B (2) + 3 H (6) + 2 B (2) + 1 H (2) + 2 4s (8) = 20 bytes; unpack enforces exact struct.calcsize match."
  },
  {
    "id": "q_c4_m5_063",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In `m05_networking.py`, `ver_ihl = 0x45`. What do `(ver_ihl >> 4)` and `(ver_ihl & 0x0F) * 4` compute?",
    "options": [
      "Version `5` and IHL `16` bytes",
      "Version `4` and IPv4 Header Length (IHL) `20` bytes",
      "TTL `64` and protocol `6`",
      "TCP flags `0x18` and port `8080`"
    ],
    "correct": 1,
    "explanation": "0x45 >> 4 = 4 (IPv4); (0x45 & 0x0F) = 5 words * 4 bytes/word = 20 bytes."
  },
  {
    "id": "q_c4_m5_064",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "In `m05_networking.py`, `raw[20:34]` contains `adac 1f90 387b cbb2 244c cd33 8018` unpacked as `'!HHIIH'`. What does `(off_flags >> 12) * 4` equal for `0x8018`, and what does it reveal structurally about this TCP segment?",
    "options": [
      "16 bytes — invalid truncated TCP header",
      "20 bytes — standard header with zero options",
      "64 bytes — time-to-live hop counter",
      "32 bytes (`8 * 4`) — proving the TCP header includes 12 bytes of TCP options past the mandatory 20-byte base"
    ],
    "correct": 3,
    "explanation": "0x8018 >> 12 = 8 32-bit words = 32 bytes TCP header length (20 base + 12 option bytes such as timestamps/NOPs)."
  },
  {
    "id": "q_c4_m5_065",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "Which standard-library helper converts the 4 raw unpacked address bytes `b'\\xac\\x1e\\x00\\x14'` into `'172.30.0.20'`?",
    "options": [
      "`json.dumps(src)`",
      "`socket.inet_ntoa(src)`",
      "`struct.pack('!I', src)`",
      "`pathlib.Path(src)`"
    ],
    "correct": 1,
    "explanation": "socket.inet_ntoa turns a 4-byte packed IPv4 binary address into dotted-quad ASCII string representation."
  },
  {
    "id": "q_c4_m5_066",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Using `off_flags = 0x8018`, evaluate `(off_flags & 0x3F)` and decode the active TCP control flag names (where `FIN=0x01, SYN=0x02, RST=0x04, PSH=0x08, ACK=0x10, URG=0x20`).",
    "options": [
      "`0x18` -> `SYN + FIN`",
      "`0x18` -> `PSH + ACK` (`0x08 | 0x10`)",
      "`0x08` -> `PSH` only",
      "`0x12` -> `SYN + ACK`"
    ],
    "correct": 1,
    "explanation": "0x8018 & 0x3F extracts the lower 6 flag bits: 0x18 = 0x10 (ACK) + 0x08 (PSH)."
  },
  {
    "id": "q_c4_m5_067",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In the Course 02 capture bytes unpacked in `m05_networking.py`, what values were produced for `sport`, `dport`, `ttl`, and `proto`?",
    "options": [
      "`44460 -> 8080`, TTL 64, proto 6 (TCP)",
      "`80 -> 443`, TTL 128, proto 17",
      "`22 -> 1024`, TTL 255, proto 1",
      "`8080 -> 44460`, TTL 32, proto 6"
    ],
    "correct": 0,
    "explanation": "0xadac = 44460 -> 0x1f90 = 8080; 0x40 = TTL 64; 0x06 = TCP."
  },
  {
    "id": "q_c4_m5_068",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "In Practical P2, evaluating IPv4 `flags_frag = 0x4000`, what do `(flags_frag >> 13)` and `(flags_frag & 0x1FFF)` tell an analyst?",
    "options": [
      "Flags `0b100` (Evil bit) and checksum mismatch",
      "Flags `0b001` (More Fragments) and offset `16384`",
      "Encrypted TLS payload flag and port 0",
      "Flags `0b010` (**DF / Don't Fragment** bit set) and fragment offset `0` (unfragmented initial/complete datagram)"
    ],
    "correct": 3,
    "explanation": "0x4000 = 0100 0000 0000 0000 binary; >> 13 gives 2 (bit 1 = Don't Fragment set) and & 0x1FFF = 0 offset."
  },
  {
    "id": "q_c4_m5_069",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "What exception does Python raise when a truncated slice of `19` bytes is passed to `struct.unpack('!BBHHHBBH4s4s', pkt)`?",
    "options": [
      "`KeyError`",
      "`HTTPError`",
      "`struct.error`",
      "`IndexError`"
    ],
    "correct": 2,
    "explanation": "struct.unpack requires exact byte count matching struct.calcsize(fmt) and raises struct.error on length mismatch."
  },
  {
    "id": "q_c4_m5_070",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "When writing a standard-library `.pcap` reader in Practical P2 without Scapy, what three header sizes must your `struct` parser read or skip per packet before reaching the IPv4 header?",
    "options": [
      "A 10-byte file footer and 8-byte UDP header",
      "The 24-byte pcap global header once at start, followed per record by a 16-byte pcap packet header and (for Ethernet links) a 14-byte Ethernet header",
      "A 512-byte FAT header per packet",
      "A 4-byte TLS header followed by newline delimiters"
    ],
    "correct": 1,
    "explanation": "Standard libpcap files open with a 24-byte global header and wrap each packet frame in a 16-byte record header + 14-byte Ethernet header."
  },
  {
    "id": "q_c4_m5_071",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "Which third-party Python library listed in the Course 04 blueprint tool map is recommended for rich dissection of full authorized packet captures beyond minimal `struct` headers?",
    "options": [
      "`Scapy`",
      "`Flask`",
      "`unittest`",
      "`http.server`"
    ],
    "correct": 0,
    "explanation": "Scapy automates complex multi-layer protocol dissection on authorized packet captures."
  },
  {
    "id": "q_c4_m5_072",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "A packet parser decodes `ver_ihl = 0x46` (IPv4 with 4 bytes of IP options, so IHL = `6 * 4 = 24` bytes). What subtle bug breaks a naive TCP extractor hardcoding `raw[20:34]` instead of using the computed `ihl_bytes`?",
    "options": [
      "`struct.unpack` skips IP options automatically",
      "`inet_ntoa` converts IPv4 options into IPv6 strings",
      "`0x46` automatically forces big-endian ports into little-endian",
      "Hardcoding offset `20` reads the last 4 bytes of IPv4 options as TCP source/destination ports instead of slicing `raw[ihl_bytes : ihl_bytes + 14]`!"
    ],
    "correct": 3,
    "explanation": "When IHL > 20 bytes, the TCP header begins at byte index ihl_bytes, not statically at byte 20!"
  },
  {
    "id": "q_c4_m5_073",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "A collector accepts data via `conn.recv(10_000_000)` and executes `eval(data.decode())` directly. Which critical vulnerabilities exist simultaneously?",
    "options": [
      "Port exhaustion only",
      "Only an incorrect `User-Agent` warning",
      "Unbounded memory exhaustion risk AND arbitrary remote code execution via `eval()` on untrusted network bytes",
      "Big-endian byte swapping error"
    ],
    "correct": 2,
    "explanation": "Evaluating bytes received from the network permits instant arbitrary code execution; use json.loads() with schema checks and strict frame bounds."
  },
  {
    "id": "q_c4_m5_074",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "In Scenario C04-M05-S2, a developer suggests fixing `conn.recv(10_000_000)` + `json.loads()` purely by adding `try/except json.JSONDecodeError`. Why is that remediation still dangerously incomplete?",
    "options": [
      "`json.loads()` disables UTF-8 decoding",
      "The handler still lacks framing (leading to torn/coalesced JSON streams), lacks a bounded max payload cap (memory exhaustion), lacks timeouts, lacks schema validation, and lacks TLS/authentication",
      "`try/except` drops Python GIL performance by 90%",
      "`JSONDecodeError` does not inherit from `Exception`"
    ],
    "correct": 1,
    "explanation": "Catching JSONDecodeError stops uncaught exceptions, yet unbounded reads, missing TCP framing, missing timeouts, and missing validation remain critical."
  },
  {
    "id": "q_c4_m5_075",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "In Scenario C04-M05-S3, an analyst proposes running your robustness tests against `'the vendor's other customers' endpoints'` to verify live edge cases. What is the mandatory action?",
    "options": [
      "Decline completely — probing third-party systems you do not own or lack written permission to test is unauthorized access; test against local mocks or vendor sandboxes under authorization",
      "Run overnight using a small `timeout=1`",
      "Use `User-Agent: Googlebot` so rate limits do not trigger",
      "Pass `verify=False` so errors stay quiet"
    ],
    "correct": 0,
    "explanation": "Authorisation defines scope; unauthorised probing against third parties may violate computer-misuse laws."
  },
  {
    "id": "q_c4_m5_076",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Which serialization mechanism, like `eval()`, must NEVER deserialize untrusted network bytes received over a socket or HTTP response?",
    "options": [
      "`json.loads()`",
      "`bytes.decode('utf-8')`",
      "`struct.unpack()`",
      "`pickle.loads()`, because maliciously crafted pickle byte streams execute arbitrary Python callables directly during unpickling"
    ],
    "correct": 3,
    "explanation": "Python's pickle protocol runs arbitrary object constructors (__reduce__) on load and must never process untrusted wire data."
  },
  {
    "id": "q_c4_m5_077",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "When downloading a JSON response via `urllib.request.urlopen()`, how can you defend against an API server streaming a 5 GiB body infinitely?",
    "options": [
      "Switch from `HTTPS` to `HTTP`",
      "Increase Python's recursion limit",
      "Pass `timeout=` on `urlopen` AND bound `resp.read(MAX_BYTES + 1)` checking `len(body) <= MAX_BYTES` before calling `json.loads()`",
      "Pass `SO_REUSEADDR` to `json.load()`"
    ],
    "correct": 2,
    "explanation": "Reading at most MAX_BYTES + 1 enforces a strict client memory cap regardless of bogus or missing Content-Length headers."
  },
  {
    "id": "q_c4_m5_078",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Review the Five-Gate Safety Architecture (Figure 5.12). Suppose an API client verifies authorization (Gate 1), enforces TLS via `certifi` (Gate 2), sets `timeout=5` (Gate 3), and caps response reads at 1 MiB (Gate 4), yet skips Gate 5 schema validation before calling `int(data['severity'])` and querying a shell wrapper. What flaw persists?",
    "options": [
      "Gate 2 TLS verification breaks integers",
      "Unvalidated upstream strings or unexpected JSON structures trigger runtime crashes (`TypeError`/`KeyError`) or downstream injection if later interpolated unchecked",
      "Timeouts only work on UDP",
      "Loopback sockets cannot parse strings"
    ],
    "correct": 1,
    "explanation": "All external JSON payloads remain untrusted even across authenticated TLS; schema and value validation must guard every extracted field."
  },
  {
    "id": "q_c4_m5_079",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "In Practical C04-M05-P1, what reply should your bounded line-based local TCP server send before closing when an incoming line exceeds `256` bytes?",
    "options": [
      "`ERR too long`",
      "`OK 257`",
      "`HTTP 404`",
      "Silent empty bytes `b''` while keeping socket open forever"
    ],
    "correct": 0,
    "explanation": "Practical P1 specifies replying 'ERR too long' and closing cleanly whenever input exceeds the 256-byte limit."
  },
  {
    "id": "q_c4_m5_080",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "During load testing on Windows, a team fixes timeouts and `verify=False`, yet forgets `srv.close()` and `with conn:` inside a short-lived worker spawning ephemeral servers. Over hours, what OS resource constraint eventually halts new sockets?",
    "options": [
      "Big-endian arithmetic overflow inside `struct`",
      "IANA reserving port 127",
      "PEP 476 disabling HTTPS globally",
      "File descriptor / socket handle exhaustion (`OSError: Too many open files` or ephemeral port exhaustion)"
    ],
    "correct": 3,
    "explanation": "Leaking unclosed sockets consumes finite OS file handles and ephemeral ports until future socket creation fails."
  },
  {
    "id": "q_c4_m5_081",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which socket constant pairs IPv6 addressing with reliable connection-oriented TCP transport?",
    "options": [
      "`socket.socket(socket.AF_INET6, socket.SOCK_DGRAM)`",
      "`socket.socket(socket.AF_INET, socket.SOCK_DGRAM)`",
      "`socket.socket(socket.AF_INET6, socket.SOCK_STREAM)`",
      "`socket.socket(socket.SO_REUSEADDR, socket.SOCK_STREAM)`"
    ],
    "correct": 2,
    "explanation": "AF_INET6 sets IPv6 addressing and SOCK_STREAM sets TCP transport."
  },
  {
    "id": "q_c4_m5_082",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Why must a server execute `srv.bind(...)` BEFORE `srv.listen(...)`?",
    "options": [
      "`listen()` encrypts `bind()` tuples via SHA-256",
      "Because `listen()` assigns the local IP/port kernel endpoint table entry using the address bound via `bind()`, failing if no interface/port is attached first (unless OS auto-binds unexpectedly to wildcard)",
      "`bind()` only clears `SO_REUSEADDR` after `listen()`",
      "`listen()` opens a client connection to port 0"
    ],
    "correct": 1,
    "explanation": "A server must first anchor itself to a deterministic (IP, port) endpoint via bind() before transitioning into listening state."
  },
  {
    "id": "q_c4_m5_083",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "In `m05_networking.py`, why is `socket.create_connection((HOST, port), timeout=5)` often preferred over manually calling `socket.socket()`, `settimeout()`, and `connect()` separately?",
    "options": [
      "It encapsulates address resolution (IPv4/IPv6), socket setup, timeout binding, and connect cleanup cleanly in one call",
      "It automatically enables HTTP/2 multiplexing",
      "It parses binary `struct` packets automatically",
      "It binds a server listening port at the same time"
    ],
    "correct": 0,
    "explanation": "create_connection() handles DNS/dual-stack resolution, timeout assignment, and connect error handling cleanly."
  },
  {
    "id": "q_c4_m5_084",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Suppose a client executes `sock.settimeout(2.0)` on a TCP stream connected to a healthy peer that waits 2.5 seconds before sending its reply. What happens on `sock.recv(1024)`?",
    "options": [
      "`recv()` returns `b''` exactly like clean peer EOF",
      "`recv()` blocks 5 seconds regardless of `settimeout`",
      "`recv()` downgrades TCP to UDP automatically",
      "Python raises `TimeoutError` (`socket.timeout` alias in Python 3.10+) at 2.0 seconds, leaving the connection timing fault cleanly distinguishable from EOF `b''`"
    ],
    "correct": 3,
    "explanation": "Timeout triggers TimeoutError (distinct from peer clean close b''), letting callers log, retry, or abort cleanly."
  },
  {
    "id": "q_c4_m5_085",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Which `m05_networking.py` helper inside `class Api(BaseHTTPRequestHandler)` was overridden solely to suppress noisy HTTP request logs during lab output?",
    "options": [
      "`do_GET`",
      "`send_header`",
      "`log_message`",
      "`end_headers`"
    ],
    "correct": 2,
    "explanation": "BaseHTTPRequestHandler.log_message writes access lines to stderr by default; `pass` keeps demo output clean."
  },
  {
    "id": "q_c4_m5_086",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Notice `Api.do_GET()` sets `self.send_header('Content-Length', str(len(body)))` *before* `self.end_headers()` and `self.wfile.write(body)`. What bug occurs if `len(json_str)` (character length) instead of `len(body)` (UTF-8 byte length) is sent for payloads containing multi-byte Unicode?",
    "options": [
      "HTTP 200 turns into HTTP 404",
      "Since non-ASCII characters take 2–4 bytes in UTF-8, sending character length under-declares `Content-Length`, causing HTTP clients to truncate the end of the JSON body and fail decoding!",
      "`json.dumps()` switches automatically to big-endian UTF-16",
      "`end_headers()` discards `Content-Type`"
    ],
    "correct": 1,
    "explanation": "HTTP Content-Length counts encoded wire octets (len(body)), not Python Unicode code points."
  },
  {
    "id": "q_c4_m5_087",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Which standard-library function returns an `SSLContext` preconfigured with secure defaults, certificate validation, and hostname checking enabled?",
    "options": [
      "`ssl.create_default_context()`",
      "`socket.inet_ntoa()`",
      "`http.server.HTTPServer()`",
      "`urllib.error.HTTPError()`"
    ],
    "correct": 0,
    "explanation": "ssl.create_default_context() loads default trust settings and activates hostname + chain checking."
  },
  {
    "id": "q_c4_m5_088",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "When calling `ssl.create_default_context(cafile='/etc/ssl/corp.pem')` inside an internal SOC tool, why is specifying ONLY the internal CA (or combining internal CA + `certifi`) safer than flipping `ctx.check_hostname = False`?",
    "options": [
      "`cafile` converts TLSv1.3 into big-endian `struct` tuples",
      "`cafile` automatically enables HTTP `429` throttling",
      "`check_hostname = False` crashes `urllib` on Linux",
      "Leaving `check_hostname = True` guarantees an unrelated attacker certificate signed by another CA or another host cannot silently spoof your internal API server"
    ],
    "correct": 3,
    "explanation": "Trust anchoring + hostname verification together prevent both rogue-CA issuance and certificate-substitution spoofing."
  },
  {
    "id": "q_c4_m5_089",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In `struct.unpack('!HHIIH', raw[20:34])`, what do the first two `'H'` format characters extract from the TCP header?",
    "options": [
      "TTL and protocol",
      "IPv4 source and destination addresses",
      "Source TCP port and destination TCP port",
      "32-bit sequence and acknowledgement numbers"
    ],
    "correct": 2,
    "explanation": "A TCP header starts with 16-bit source port (H) and 16-bit destination port (H), followed by 32-bit seq (I) and ack (I)."
  },
  {
    "id": "q_c4_m5_090",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Why does decoding the source/destination IPv4 addresses via `'4s4s'` instead of `'II'` make passing them into `socket.inet_ntoa()` cleaner and less bug-prone?",
    "options": [
      "`'II'` swaps nibbles inside IPv4 octets",
      "`inet_ntoa()` accepts a 4-byte `bytes` object directly (`'4s'`), whereas unpacking `'I'` turns the address into an integer that would need `.to_bytes(4, 'big')` conversion before `inet_ntoa()`",
      "`'4s'` supports IPv6 128-bit hosts automatically",
      "`'I'` raises `OverflowError` for addresses above 127.0.0.1"
    ],
    "correct": 1,
    "explanation": "Using '4s' hands socket.inet_ntoa() exact raw 4-byte address buffers directly without intermediate integer repacking."
  },
  {
    "id": "q_c4_m5_091",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "When writing a local security agent exposing an HTTP dashboard purely for operator localhost inspection, which bind host should you hardcode unless remote access + authentication + TLS are built?",
    "options": [
      "`'127.0.0.1'`",
      "`'0.0.0.0'`",
      "`'255.255.255.255'`",
      "`'192.168.1.255'`"
    ],
    "correct": 0,
    "explanation": "Always bind local tools to 127.0.0.1 by default so neighboring hosts on shared networks cannot reach unauthenticated control APIs."
  },
  {
    "id": "q_c4_m5_092",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "In Practical P1, if a test client connects to your bounded line-based server (`MAX_LINE = 256`), sends `b'ping\\npong\\n'`, waits for two responses, and closes, what exact lines should the server return?",
    "options": [
      "One combined response `ECHO: PING PONG`",
      "`ConnectionRefusedError`",
      "`ERR too long` because two lines arrived in one `recv()`",
      "Two separate lines: `OK 4\\n` followed by `OK 4\\n` (reporting byte length of `'ping'` and `'pong'` individually across the same connection!)"
    ],
    "correct": 3,
    "explanation": "Proper multi-message newline framing splits coalesced messages inside the buffer on b'\\n', answering each individually while leaving any trailing partial fragment buffered."
  },
  {
    "id": "q_c4_m5_093",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "In Course 04 Module 5's lexicon, which term denotes a temporary client port assigned automatically by the OS kernel?",
    "options": [
      "Well-known port",
      "Network byte order",
      "Ephemeral port",
      "Backlog descriptor"
    ],
    "correct": 2,
    "explanation": "Clients typically bind implicitly to an OS-selected ephemeral port when dialing outbound TCP/UDP flows."
  },
  {
    "id": "q_c4_m5_094",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Look at `echo_server` in `m05_networking.py`: `conn.sendall(b'ECHO: ' + data.upper())`. Suppose a malicious peer sends `b'abc\\n'` on a real line server — why should real servers decode bytes explicitly with error handling (`errors='replace'` or strict UTF-8 rejection) rather than calling `.decode()` unconditionally?",
    "options": [
      "`.decode()` automatically flips big-endian port bits",
      "Calling `.decode()` on arbitrary non-UTF-8 binary fuzzing bytes raises `UnicodeDecodeError`, crashing an unguarded request thread",
      "`errors='replace'` enables `SO_REUSEADDR`",
      "Python's `bytes` type refuses uppercase conversion without UTF-16"
    ],
    "correct": 1,
    "explanation": "Untrusted wire peers can send invalid UTF-8 byte sequences; decoding must handle or reject UnicodeDecodeError explicitly."
  },
  {
    "id": "q_c4_m5_095",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In `get_json(path)`, which standard-library function parses a readable HTTP response stream directly into Python dictionaries?",
    "options": [
      "`json.load(resp)`",
      "`struct.unpack(resp)`",
      "`eval(resp)`",
      "`pickle.load(resp)`"
    ],
    "correct": 0,
    "explanation": "json.load reads directly from file-like HTTP response objects safely without code execution."
  },
  {
    "id": "q_c4_m5_096",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "An engineer notices their automated vulnerability feed works fine inside Firefox yet fails inside Python with `CERTIFICATE_VERIFY_FAILED` against a corporate SSL-inspection proxy. Why does that happen, and what is the proper fix?",
    "options": [
      "Setting `verify=False` uses Firefox's trust store automatically",
      "Firefox disables TLS hostname verification globally",
      "Python does not support TLSv1.3 on corporate networks",
      "Firefox trusts an enterprise proxy root CA pushed into browser policy that Python's standalone bundle does not yet load; add the approved corporate CA PEM via `cafile=` / `verify=` rather than setting `verify=False`"
    ],
    "correct": 3,
    "explanation": "Enterprise inspection proxies inject a corporate CA certificate; Python must verify against that specific approved CA bundle rather than disabling all verification."
  },
  {
    "id": "q_c4_m5_097",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In the IPv4 header decoded by `m05_networking.py`, `total_len` equals `132` bytes and `ihl` equals `20` bytes. How many bytes remain for the encapsulated TCP segment (header + payload)?",
    "options": [
      "`152` bytes",
      "`32` bytes",
      "`112` bytes",
      "`64` bytes"
    ],
    "correct": 2,
    "explanation": "132 total packet bytes minus the 20-byte IPv4 header leaves 112 encapsulated payload bytes (TCP header + application data)."
  },
  {
    "id": "q_c4_m5_098",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Continuing from the `132`-byte IPv4 packet (`IHL = 20` bytes, `TCP header = 32` bytes), how many bytes of Layer-7 application payload remain inside this TCP segment?",
    "options": [
      "`112` bytes",
      "`80` bytes (`132 - 20 - 32`)",
      "`100` bytes",
      "`52` bytes"
    ],
    "correct": 1,
    "explanation": "Subtracting the 20-byte IPv4 header and 32-byte TCP header (with options) from 132 leaves 80 bytes of TCP payload."
  },
  {
    "id": "q_c4_m5_099",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Why should security API scripts always validate expected dictionary keys and data types after `json.loads()` succeeds?",
    "options": [
      "Valid JSON from an errored proxy or compromised upstream may be `None`, a `list`, or missing expected keys, causing unhandled `KeyError`/`TypeError` crashes downstream",
      "`json.loads()` leaves JSON keys sorted alphabetically",
      "Validation turns HTTP 404 into HTTP 200",
      "Schema checks shorten TLS key exchange time"
    ],
    "correct": 0,
    "explanation": "Syntactically valid JSON is not automatically structurally safe; validate schema types and presence before acting on fields."
  },
  {
    "id": "q_c4_m5_100",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Consider a SIEM alert webhook handler parsing JSON notifications without request-body limits, authentication tokens, or schema verification. Which paired weaknesses expose the SOC service directly to denial of service and alert spoofing?",
    "options": [
      "Using `SOCK_STREAM` and loopback `127.0.0.1`",
      "PEP 476 default TLS validation",
      "Big-endian conversion and `SO_REUSEADDR`",
      "Memory-exhaustion DoS (unbounded body reads) plus unauthenticated injection of fabricated alert JSON fields into downstream analyst queues"
    ],
    "correct": 3,
    "explanation": "Receivers exposed to JSON feeds must enforce authentication, max body size caps, and strict schema validation."
  },
  {
    "id": "q_c4_m5_101",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which combination of `socket` constants should a developer pass when building a lightweight local UDP health-beacon receiver on IPv4?",
    "options": [
      "`socket.socket(socket.AF_INET, socket.SOCK_STREAM)`",
      "`socket.socket(socket.AF_INET6, socket.SOCK_STREAM)`",
      "`socket.socket(socket.AF_INET, socket.SOCK_DGRAM)`",
      "`socket.socket(socket.SO_REUSEADDR, socket.SOCK_DGRAM)`"
    ],
    "correct": 2,
    "explanation": "AF_INET specifies IPv4 and SOCK_DGRAM selects UDP datagram transport."
  },
  {
    "id": "q_c4_m5_102",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Why does binding port `0` (`srv.bind(('127.0.0.1', 0))`) eliminate flaky parallel unit-test failures in CI pipelines compared to hardcoding port `8080`?",
    "options": [
      "Port `0` turns `socket.bind` into an asynchronous UDP multicast call",
      "Because two concurrent CI jobs or lingering OS `TIME_WAIT` sockets would clash with `'Address already in use'` on static port `8080`, whereas port `0` lets the kernel assign an unused ephemeral port atomically",
      "Port `0` automatically resets `SO_REUSEADDR` globally across Windows",
      "Static ports under 10,000 require root privileges even on loopback"
    ],
    "correct": 1,
    "explanation": "Dynamic ephemeral port allocation via port 0 guarantees non-colliding test ports across concurrent jobs and OS restarts."
  },
  {
    "id": "q_c4_m5_103",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "Inside `echo_server`, what Python string operation transforms the incoming bytes `data` before sending the echo reply back?",
    "options": [
      "`b'ECHO: ' + data.upper()`",
      "`data.strip()`",
      "`data.decode('hex')`",
      "`json.dumps(data)`"
    ],
    "correct": 0,
    "explanation": "m05_networking.py echoes b'ECHO: ' + data.upper() cleanly as raw bytes."
  },
  {
    "id": "q_c4_m5_104",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "During a security audit of a custom TCP server on Linux, you see `conn.sendall(msg.encode())` followed immediately by an unguarded `srv.accept()` without a context manager or `try/finally` around `conn`. What fault leaks file descriptors across exceptions?",
    "options": [
      "Garbage collection closes listening sockets first instead of client sockets",
      "`BrokenPipeError` clears the `SO_REUSEADDR` option on `srv`",
      "`accept()` returns UDP sockets when `sendall()` fails",
      "If parsing or `sendall()` raises `BrokenPipeError` or `ValueError` inside the handler, `conn` stays open until garbage collection, leaking OS descriptors under malformed client traffic"
    ],
    "correct": 3,
    "explanation": "Wrapping connected sockets in `with conn:` guarantees deterministic immediate descriptor release even when client errors occur."
  },
  {
    "id": "q_c4_m5_105",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In `m05_networking.py`, what two routes does the test `Api` HTTP handler distinguish inside `do_GET`?",
    "options": [
      "`/login` (200) and `/admin` (403)",
      "`/health` (500) and `/metrics` (301)",
      "`/api/status` (HTTP 200 JSON) and any other path (HTTP 404 JSON)",
      "`/` (200 HTML) and `/missing` (503)"
    ],
    "correct": 2,
    "explanation": "Api.do_GET serves {'service': 'rk-demo', 'ok': True} with 200 on /api/status and {'error': 'not found'} with 404 otherwise."
  },
  {
    "id": "q_c4_m5_106",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Your security API client catches `urllib.error.HTTPError` cleanly for `404`, yet crashes uncaught when the remote WAF resets the TCP connection mid-handshake or DNS fails. Why did catching `HTTPError` miss that failure?",
    "options": [
      "`urlopen` ignores DNS errors unless `User-Agent` is omitted",
      "`HTTPError` sits strictly underneath `URLError` as a subclass for HTTP status responses; TCP refusals, resets, and DNS failures raise `URLError` / `OSError` which `HTTPError` does not catch!",
      "HTTP resets raise `struct.error` inside `urllib`",
      "`HTTPError` only triggers on HTTPS URLs"
    ],
    "correct": 1,
    "explanation": "HTTPError subclasses URLError, not the reverse—handling only HTTPError misses network-layer URLError / TimeoutError / ConnectionError faults."
  },
  {
    "id": "q_c4_m5_107",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Which Python standard-library module supplies `create_default_context()` for verifying TLS connections?",
    "options": [
      "`ssl`",
      "`hashlib`",
      "`struct`",
      "`hmac`"
    ],
    "correct": 0,
    "explanation": "Python's built-in ssl module exposes create_default_context() and SSLContext verification settings."
  },
  {
    "id": "q_c4_m5_108",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "When `certifi` fixes a `CERTIFICATE_VERIFY_FAILED` error via `ssl.create_default_context(cafile=certifi.where())`, what security risk arises if an enterprise operations team never updates `certifi` or OS CA stores over years?",
    "options": [
      "TLS automatically reverts to cleartext HTTP/1.0",
      "Old CA bundles break `socket.AF_INET` big-endian unpacking",
      "`certifi.where()` disables hostname SAN checks",
      "Newly trusted root CAs fail unpredictably AND compromised/revoked roots retired by browser programs remain mistakenly trusted until CA bundles update"
    ],
    "correct": 3,
    "explanation": "Maintaining current CA bundles ensures retired/untrusted roots are removed and modern roots remain valid without weakening validation."
  },
  {
    "id": "q_c4_m5_109",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In the IPv4 header slice decoded in `m05_networking.py`, what value do `protocol` (`0x06`) and `ttl` (`0x40`) decode to in decimal?",
    "options": [
      "Protocol 17 (UDP) and TTL 32",
      "Protocol 1 (ICMP) and TTL 128",
      "Protocol 6 (TCP) and TTL 64",
      "Protocol 6 (TCP) and TTL 40"
    ],
    "correct": 2,
    "explanation": "Hex 0x40 equals 64 decimal (TTL 64) and hex 0x06 equals 6 (IP protocol TCP)."
  },
  {
    "id": "q_c4_m5_110",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Given big-endian TCP ports `0xadac` (`sport`) and `0x1f90` (`dport`), verify why hexadecimal `0x1f90` equals `8080` mathematically.",
    "options": [
      "`1*1000 + 9*100 + 80`",
      "`(1 * 4096) + (15 * 256) + (9 * 16) + 0 = 4096 + 3840 + 144 = 8080`",
      "`1*256 + 90 = 8080`",
      "`(15 * 512) + 400 = 8080`"
    ],
    "correct": 1,
    "explanation": "Each hex nibble scales by powers of 16: 0x1*16^3 + 0xf*16^2 + 0x9*16^1 + 0 = 4096 + 3840 + 144 = 8080."
  },
  {
    "id": "q_c4_m5_111",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Which safe network practice directly protects against maliciously slow or dead remote API servers locking cron workers permanently?",
    "options": [
      "Using `timeout=` parameters consistently on every socket connect, read, and HTTP request",
      "Replacing JSON with YAML",
      "Increasing `listen()` backlog to 10,000",
      "Leaving `httpd.server_close()` omitted"
    ],
    "correct": 0,
    "explanation": "Strict connect and read timeouts bound wait times cleanly so stalled dependencies trigger handled errors rather than permanent hangs."
  },
  {
    "id": "q_c4_m5_112",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "An internal scanner builds requests dynamically from a CSV allowlist containing hostnames, yet accidentally passes `f'http://{host}/status'` without validating host syntax against CRLF or path characters (`host = 'good.local/admin?#'`). What prevents this URL structure injection?",
    "options": [
      "Disable timeouts on `urlopen`",
      "Switch from `AF_INET` to `SOCK_DGRAM`",
      "Use `pickle.dumps(host)` in the path",
      "Validate hostnames strictly against an anchored allowlist regex or `ipaddress` parser AND construct URLs/queries safely using `urllib.parse` encoding helpers"
    ],
    "correct": 3,
    "explanation": "Strict hostname/IP validation plus urllib.parse prevents path, query-string, and authority injection inside dynamically constructed URLs."
  },
  {
    "id": "q_c4_m5_113",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which Python module wraps OS communication endpoints (`bind`, `listen`, `accept`, `connect`, `recv`, `sendall`) in the standard library?",
    "options": [
      "`shutil`",
      "`csv`",
      "`socket`",
      "`pathlib`"
    ],
    "correct": 2,
    "explanation": "Python's built-in socket module provides low-level OS networking interfaces."
  },
  {
    "id": "q_c4_m5_114",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Why does binding an ephemeral TCP test server on Linux to well-known port `443` fail with `PermissionError` under a standard unprivileged user account?",
    "options": [
      "Port `443` only accepts UDP `SOCK_DGRAM` packets",
      "Ports `[1, 1023]` are privileged ports reserved by POSIX kernels for root/`CAP_NET_BIND_SERVICE` processes, whereas ports `> 1023` work cleanly unprivileged",
      "Python's `http.server` blocks ports under `1024` natively",
      "`SO_REUSEADDR` restricts loopback sockets to odd ports"
    ],
    "correct": 1,
    "explanation": "Least-privilege security services avoid root ownership by binding unprivileged ports > 1023 (or 0 for kernel auto-selection)."
  },
  {
    "id": "q_c4_m5_115",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "What does `cli` receive in Section 1 of `m05_networking.py` if you remove `cli.sendall(...)` and close `cli` immediately after `create_connection`?",
    "options": [
      "The server's `conn.recv(1024)` returns empty bytes `b''` cleanly (EOF) before echoing `b'ECHO: '`",
      "`socket.bind()` raises `IndentationError`",
      "`srv.getsockname()` switches to UDP",
      "TLS fallback activates automatically"
    ],
    "correct": 0,
    "explanation": "Closing the client write stream immediately signals EOF (b'') to the server's recv() call."
  },
  {
    "id": "q_c4_m5_116",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Compare calling `cli.settimeout(5)` on a single `recv()` loop when a message of 400 bytes arrives in 50-byte slices every 1 second. Why does a single-call `settimeout(5)` NOT limit total adversarial 'slowloris' read duration across 100 tiny chunks?",
    "options": [
      "Python resets `settimeout(5)` ONLY once per `create_connection()` lifetime",
      "Slow packets automatically trigger `SO_REUSEADDR` closing",
      "`recv(1024)` compresses slow chunks to finish in 1 second",
      "Because each 1-byte or 50-byte packet resets the per-`recv()` idle timeout timer back to 5 seconds—letting a slow peer stretch one message arbitrarily long unless an overall deadline timer (`time.monotonic()`) is enforced!"
    ],
    "correct": 3,
    "explanation": "Socket timeout limits inactivity between individual recv() completions, not total cumulative frame assembly time—use a monotonic wall-clock deadline for defense."
  },
  {
    "id": "q_c4_m5_117",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "How do you inspect the HTTP response status code inside a successful `with urllib.request.urlopen(req, timeout=5) as resp:` context?",
    "options": [
      "`resp.port`",
      "`resp.returncode`",
      "`resp.status`",
      "`resp.ttl`"
    ],
    "correct": 2,
    "explanation": "m05_networking.py accesses resp.status for 2xx HTTP responses and err.code inside HTTPError."
  },
  {
    "id": "q_c4_m5_118",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "An API client fetches `/api/v1/alerts` over `https://` and fails on a `302 Redirect` pointing to a third-party `http://` mirror. Why must security clients scrutinize redirect policies with bearer tokens?",
    "options": [
      "Default redirects automatically upgrade `verify=False`",
      "Blindly following cross-domain or protocol-downgrading redirects can leak `Authorization` headers or direct polling loops toward unintended external endpoints",
      "HTTP 302 turns TCP sockets into UDP",
      "`json.load()` throws `OSError` on HTTP 302"
    ],
    "correct": 1,
    "explanation": "Security automation should validate redirect targets/domains or disable unexpected cross-host redirects when sending sensitive credentials."
  },
  {
    "id": "q_c4_m5_119",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "True or false engineering check: In Python `3.14` (post-PEP 476), does `urllib.request.urlopen('https://...')` verify server certificates by default without extra flags?",
    "options": [
      "True — PEP 476 turned verification ON by default since Python 2.7.9 and 3.4.3",
      "False — certificates require `verify=True` manually",
      "Only on Linux hosts, not Windows",
      "Only when port 8080 is used"
    ],
    "correct": 0,
    "explanation": "PEP 476 made default TLS certificate chain and hostname checks standard across modern Python 3 stdlib HTTPS clients."
  },
  {
    "id": "q_c4_m5_120",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "A peer claims `'verify=False is totally safe on our internal corporate network because external attackers aren't on our LAN'`. Which defense-in-depth flaw invalidates that argument?",
    "options": [
      "Internal subnets cannot route HTTPS port 443",
      "`PEP 476` prevents HTTP cookies on RFC 1918 addresses",
      "LAN routers strip big-endian headers from HTTPS frames",
      "Lateral movement, rogue insider devices, compromised switches/DNS/ARP caches, or misconfigured proxies on internal LANs routinely allow active on-path interception if certificate validation is disabled"
    ],
    "correct": 3,
    "explanation": "Zero Trust assumes internal networks can host compromised peers or rogue proxies; disable-verification shortcuts undermine lateral-movement defense."
  },
  {
    "id": "q_c4_m5_121",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "Which integer size does format letter `'I'` unpack when preceded by `'!'` (`!I`) in Python `struct`?",
    "options": [
      "Unsigned 8-bit integer (1 byte)",
      "Unsigned 16-bit integer (2 bytes)",
      "Unsigned 32-bit integer (4 bytes)",
      "Signed 64-bit integer (8 bytes)"
    ],
    "correct": 2,
    "explanation": "Standard size under '!' assigns 4 bytes to unsigned integer 'I' (matching 32-bit TCP seq/ack fields)."
  },
  {
    "id": "q_c4_m5_122",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "In libpcap headers (`rk_c02_lab.pcap`), why might the `24`-byte global header magic bytes appear as either `d4 c3 b2 a1` or `a1 b2 c3 d4` on disk, and how does that dictate your subsequent `struct.unpack` prefix for each `16`-byte record header?",
    "options": [
      "It signals whether packet payloads are HTTP or DNS",
      "The pcap magic (`0xa1b2c3d4`) encodes capture-host endianness so reading `d4 c3 b2 a1` tells Python to unpack pcap record lengths (`incl_len`) as little-endian (`<IIII`) while still decoding IPv4/TCP wire headers inside packets as big-endian (`!`)",
      "It toggles IPv6 mode for Ethernet headers",
      "It forces `recv()` buffer size to 24 bytes"
    ],
    "correct": 1,
    "explanation": "pcap file headers match the capturing host byte order (< vs >), whereas captured wire protocol headers inside packets remain big-endian (!)."
  },
  {
    "id": "q_c4_m5_123",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Which helper method can compute the required slice size of any `struct` format string dynamically without manual counting bugs?",
    "options": [
      "`struct.calcsize(fmt)`",
      "`socket.getsockname()`",
      "`ssl.certifi()`",
      "`json.sizeof()`"
    ],
    "correct": 0,
    "explanation": "struct.calcsize(fmt) returns exact packed byte length for verifying incoming packet slice lengths cleanly."
  },
  {
    "id": "q_c4_m5_124",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Suppose an IDS packet parser slices `raw[:20]` out of a captured byte array `pkt` where `len(pkt)` might only be `12` bytes due to truncation. How do you guard against unhandled crashes cleanly while maintaining availability?",
    "options": [
      "Ignore exceptions silently via bare `except: pass`",
      "Disable `socket.AF_INET` verification",
      "Pad truncated frames with random bytes up to 20 bytes",
      "Verify `if len(pkt) < struct.calcsize('!BBHHHBBH4s4s'):` up front (or catch `struct.error`), increment a malformed-frame metric, and drop/quarantine only that corrupt frame"
    ],
    "correct": 3,
    "explanation": "Explicit length guards before unpacking keep malformed or truncated wire frames from crashing entire packet-processing loops."
  },
  {
    "id": "q_c4_m5_125",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which port range category covers TCP ports `1` through `1,023` (such as SSH 22, HTTP 80, HTTPS 443)?",
    "options": [
      "Dynamic / Ephemeral ports",
      "Private loopback ports",
      "Well-known ports",
      "Multicast ports"
    ],
    "correct": 2,
    "explanation": "Ports 1..1023 are IANA well-known (system/privileged) ports."
  },
  {
    "id": "q_c4_m5_126",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "In client-server troubleshooting (`Figure 5.1`), why do client connections to `127.0.0.1:8080` display two different port numbers (e.g., `44460 -> 8080`) on packet captures?",
    "options": [
      "NAT routers translate port `80` to `44460` locally",
      "Clients dial out from an OS-assigned high ephemeral source port (`44460`) toward the fixed listening service destination port (`8080`), uniquely identifying the bidirectional session",
      "Python's `struct` library offsets client ports by +40,000",
      "Loopback sockets swap source and destination ports on replies"
    ],
    "correct": 1,
    "explanation": "Every TCP 4-tuple pairs a stable server destination port with a unique OS-selected ephemeral client source port."
  },
  {
    "id": "q_c4_m5_127",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "Why does `m05_networking.py` pass `daemon=True` to the background `threading.Thread` hosting `echo_server` and `httpd.serve_forever`?",
    "options": [
      "So the background helper threads do not prevent the demo Python process from exiting cleanly when main finishes",
      "Because `daemon=True` runs sockets with root administrator rights",
      "To convert TCP streams into TLSv1.3",
      "Because `HTTPServer` refuses port `0` otherwise"
    ],
    "correct": 0,
    "explanation": "Daemon threads terminate automatically when the main script finishes rather than hanging process exit."
  },
  {
    "id": "q_c4_m5_128",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Wait: in a real server storing persistent audit records inside SQLite or alert logs, why is setting handler worker threads to `daemon=True` without a graceful shutdown signal (`httpd.shutdown()` / event draining) hazardous?",
    "options": [
      "Non-daemon threads cannot read from sockets",
      "`daemon=True` overrides `timeout=5` on clients",
      "`daemon=True` changes loopback IP `127.0.0.1` to `0.0.0.0`",
      "Killing a daemon thread instantaneously when main exits can cut off mid-flight file writes or leave unacknowledged alert transactions half-written!"
    ],
    "correct": 3,
    "explanation": "Daemon threads are killed abruptly at interpreter exit; persistent writers need controlled shutdown/join orchestration."
  },
  {
    "id": "q_c4_m5_129",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In `http.server` (`m05_networking.py`), what argument tuple tells `HTTPServer` to bind strictly to localhost using an OS-assigned free port?",
    "options": [
      "`('0.0.0.0', 80)`",
      "`('localhost', 443)`",
      "`('127.0.0.1', 0)`",
      "`('::', 0)`"
    ],
    "correct": 2,
    "explanation": "Passing ('127.0.0.1', 0) binds locally on a free kernel-selected port stored in httpd.server_address[1]."
  },
  {
    "id": "q_c4_m5_130",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "When `Api.do_GET` builds JSON output via `body = json.dumps({'service': 'rk-demo', 'ok': True}).encode()`, what happens silently if `self.send_header('Content-Type', 'application/json')` were omitted and `get_json()` encounters a proxy HTML block page on HTTP 403?",
    "options": [
      "`urlopen` converts HTML into a Python dict automatically",
      "`json.load(err)` throws `json.JSONDecodeError` because an upstream proxy/WAF error body returned HTML rather than JSON—so `except HTTPError` must ALSO handle non-JSON error bodies cleanly!",
      "Python retries over `SOCK_DGRAM` automatically",
      "HTTP 403 skips TLS checks"
    ],
    "correct": 1,
    "explanation": "Real-world error responses (502 Bad Gateway, 403 WAF block, 429 portal) frequently return HTML or plain text; always catch JSONDecodeError inside error handlers!"
  },
  {
    "id": "q_c4_m5_131",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "In Scenario C04-M05-S1, a teammate submits a PR containing `requests.get(url, verify=False)` with comment `'fixed cert bug'`. What is the core danger?",
    "options": [
      "Any active network interceptor can impersonate the server, decrypt sensitive tokens/headers, and modify responses unnoticed",
      "The comment breaks JSON encoding",
      "`verify=False` disables HTTP timeouts",
      "`requests` prints passwords to stdout automatically"
    ],
    "correct": 0,
    "explanation": "Disabling TLS validation eliminates peer identity authentication, enabling silent MITM interception."
  },
  {
    "id": "q_c4_m5_132",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "You trace a Python `SSLCertVerificationError` on an internal DevSecOps portal and discover `openssl s_client` shows the server presents ONLY its leaf cert without sending the required Intermediate CA cert (though modern browsers silently fetch it via AIA cache). How should your org fix this cleanly?",
    "options": [
      "Configure the web/API server cleanly to serve the complete leaf + intermediate certificate chain rather than weakening Python clients globally",
      "Tell every Python developer to add `verify=False`",
      "Downgrade the server to HTTP port 80",
      "Switch clients from `urllib` to raw TCP `socket` without TLS"
    ],
    "correct": 0,
    "explanation": "Missing intermediates are a classic server misconfiguration; fixing the server's presented chain preserves strict client validation across all tools."
  },
  {
    "id": "q_c4_m5_133",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "What value does the hexadecimal string `'ac1e000a'` in `m05_networking.py` decode to via `socket.inet_ntoa()`?",
    "options": [
      "`172.30.0.20`",
      "`172.30.0.10`",
      "`192.168.0.10`",
      "`10.0.30.172`"
    ],
    "correct": 1,
    "explanation": "0xac = 172, 0x1e = 30, 0x00 = 0, 0x0a = 10 -> 172.30.0.10."
  },
  {
    "id": "q_c4_m5_134",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Suppose another packet captured on the same Course 02 segment has TCP `off_flags = 0x5012`. Evaluate the TCP header length in bytes and active TCP control flag names.",
    "options": [
      "32 bytes header; flags `PSH + ACK`",
      "`40` bytes header; flags `FIN + SYN`",
      "`20` bytes header (`(0x5012 >> 12) * 4 = 5 * 4 = 20`); flags `SYN + ACK` (`0x12 = 0x02 | 0x10`)",
      "`20` bytes header; flags `RST + PSH`"
    ],
    "correct": 2,
    "explanation": "Upper nibble 5 -> 5*4 = 20 bytes standard TCP header; lower byte 0x12 = 0x10 (ACK) + 0x02 (SYN)."
  },
  {
    "id": "q_c4_m5_135",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Why must local diagnostic TCP/HTTP servers bind to `'127.0.0.1'` rather than `'0.0.0.0'` by default?",
    "options": [
      "Loopback sockets require fewer bytes per packet",
      "`127.0.0.1` automatically compresses JSON bodies",
      "`0.0.0.0` blocks `SO_REUSEADDR`",
      "Restricting to loopback blocks external machines on the network from reaching unauthenticated control or test endpoints"
    ],
    "correct": 3,
    "explanation": "Defaulting to loopback upholds least-exposure defense unless explicit authentication and remote binding are justified."
  },
  {
    "id": "q_c4_m5_136",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "When accepting client connections on an authenticated internal telemetry socket over loopback, why should `addr` returned from `conn, addr = srv.accept()` still be logged or audited carefully?",
    "options": [
      "Audit logs capturing source `(ip, port)` and timestamp allow defenders to correlate unexpected local or remote connection attempts against authorized service accounts",
      "To guess the remote user's Windows password",
      "`addr` holds the TLS private key",
      "`accept()` crashes unless `addr` prints to stdout"
    ],
    "correct": 0,
    "explanation": "Logging peer endpoint metadata gives audit traceability during incident investigations."
  },
  {
    "id": "q_c4_m5_137",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "What are the three core server socket setup methods called *in sequence* before reading client data in `echo_server`?",
    "options": [
      "`connect()`, `sendall()`, `close()`",
      "`bind()`, `listen()`, `accept()`",
      "`recv()`, `inet_ntoa()`, `unpack()`",
      "`urlopen()`, `json.load()`, `shutdown()`"
    ],
    "correct": 1,
    "explanation": "A TCP server binds its address/port, enters listening mode via listen(), and accepts incoming connections via accept()."
  },
  {
    "id": "q_c4_m5_138",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Which OSI/TCP-IP layer abstraction boundary does Python's standard `socket` module expose to ordinary unprivileged applications?",
    "options": [
      "Direct raw Layer-1 physical signaling voltage control",
      "Direct manipulation of BIOS ACPI tables",
      "OS-mediated transport-layer (`SOCK_STREAM`/`SOCK_DGRAM`) endpoints over IPv4/IPv6 while kernel network stacks manage IP routing, TCP sequencing, and link-layer framing",
      "Browser DOM HTML rendering"
    ],
    "correct": 2,
    "explanation": "User-space sockets hand payload streams/datagrams to the kernel TCP/IP stack without requiring privileged raw-NIC drivers."
  },
  {
    "id": "q_c4_m5_139",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "Which client method in Section 1 of `m05_networking.py` enforces a 5-second timeout while dialing `127.0.0.1`?",
    "options": [
      "`socket.recv(5)`",
      "`socket.bind((HOST, port))`",
      "`socket.inet_ntoa(port)`",
      "`socket.create_connection((HOST, port), timeout=5)`"
    ],
    "correct": 3,
    "explanation": "create_connection accepts timeout=5 cleanly as an explicit keyword argument."
  },
  {
    "id": "q_c4_m5_140",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "In Practical P1 step 2, a single persistent TCP client sends 3 newline-delimited commands sequentially before closing. Why must the server store unconsumed partial fragments (`leftover`) across `recv()` iterations in a loop rather than reading `recv(1024)` once?",
    "options": [
      "One `recv()` may contain `b'cmd1\\ncmd2\\ncm'` where `'cm'` is the incomplete prefix of command 3; keeping `leftover` across reads preserves complete frames without dropping trailing partial bytes!",
      "`recv(1024)` returns strictly 1 character per call on Python 3.12+",
      "Newline characters delete prior threads automatically",
      "Loopback sockets strip `'\\n'` on every odd read"
    ],
    "correct": 0,
    "explanation": "Stream buffers routinely hold one or more full lines plus the beginning of the next frame; retaining remaining bytes after splitting guarantees zero data loss."
  },
  {
    "id": "q_c4_m5_141",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "When `get_json('/api/status')` succeeds in `m05_networking.py`, what Python tuple does it return?",
    "options": [
      "`(404, {'error': 'not found'})`",
      "`(200, {'service': 'rk-demo', 'ok': True})`",
      "`(500, 'TimeoutError')`",
      "`(302, b'')`"
    ],
    "correct": 1,
    "explanation": "Executing m05_networking.py prints 2. (200, {'service': 'rk-demo', 'ok': True})."
  },
  {
    "id": "q_c4_m5_142",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "An enrichment script uses exponential backoff with jitter (`base * 2**attempt`) for HTTP `503` and `429` responses. Why is adding random jitter (`random.uniform`) important when hundreds of hosts hit an API outage simultaneously?",
    "options": [
      "Jitter disables PEP 476 validation during retries",
      "Jitter converts TCP packets into UDP datagrams",
      "Jitter spreads client retries out over time so all hundreds of clients do not retry at the exact same second ('thundering herd'), avoiding secondary outage cascades upon API recovery",
      "Jitter reduces JSON dict memory footprint by half"
    ],
    "correct": 2,
    "explanation": "Synchronized fixed backoff causes synchronized retry spikes; jitter smooths recovery load cleanly."
  },
  {
    "id": "q_c4_m5_143",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Before which milestone Python versions (enabled via PEP 476 in 2014) did standard-library HTTPS clients skip certificate verification by default?",
    "options": [
      "Python `3.10.0` only",
      "Python `3.12.4` and `3.14.4`",
      "Python `1.5.2` only",
      "Python `2.7.9` and `3.4.3`"
    ],
    "correct": 3,
    "explanation": "PEP 476 added default verification beginning in Python 2.7.9 and 3.4.3."
  },
  {
    "id": "q_c4_m5_144",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "A teammate configures `ssl.create_default_context()` AND loads an internal corporate CA, then sets `ctx.check_hostname = False` `'because our staging boxes use IP URLs instead of DNS names'`. What cleaner alternative restores full identity security?",
    "options": [
      "Issue internal staging certificates with proper DNS or IP SAN (`Subject Alternative Name`) entries matching how clients connect so `check_hostname` stays enabled!",
      "Keep `verify=False` everywhere",
      "Convert staging URLs to plaintext HTTP port 80",
      "Pin the port number inside `User-Agent`"
    ],
    "correct": 0,
    "explanation": "X.509 SAN extensions support IP addresses and staging FQDNs natively, keeping hostname checks intact without disabling authentication."
  },
  {
    "id": "q_c4_m5_145",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "Which bitwise expression extracts the 4-bit Version nibble from `ver_ihl = 0x45`?",
    "options": [
      "`ver_ihl & 0x0F`",
      "`ver_ihl >> 4`",
      "`ver_ihl << 4`",
      "`ver_ihl & 0x3F`"
    ],
    "correct": 1,
    "explanation": "Right-shifting 4 bits moves the upper nibble (0x4) into the low bits, evaluating to 4."
  },
  {
    "id": "q_c4_m5_146",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "While parsing raw network frames via `struct.pack` / `struct.unpack`, why must you NEVER omit explicit byte-order prefixes (`!`, `>`, or `<`)?",
    "options": [
      "Native mode disables unsigned `'H'` integers completely",
      "Python deletes spaces inside format strings without `'!'`",
      "Without a byte-order prefix, `struct` uses `@` (native host endianness AND C struct memory alignment padding!), breaking portability and introducing unexpected padding bytes between `B` and `I` fields!",
      "Omitting `'!'` changes returned types from `tuple` to `dict`"
    ],
    "correct": 2,
    "explanation": "Default '@' applies native CPU endianness PLUS native C alignment padding (e.g., inserting hidden padding bytes between B and I), corrupting tight wire offsets!"
  },
  {
    "id": "q_c4_m5_147",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "What happens if an interactive local lab script leaves `httpd.server_close()` omitted after `httpd.shutdown()`, and another test checks whether the server stopped cleanly within 2 seconds?",
    "options": [
      "Windows switches localhost to IPv6 automatically",
      "The second test immediately passes with HTTP 200",
      "`httpd.shutdown()` automatically deletes the script file",
      "The follow-up client suffers an unnecessary 2-second hang ending in `TimeoutError` rather than instant connection refusal"
    ],
    "correct": 3,
    "explanation": "Without server_close(), the OS socket remains bound accepting connections with no serving loop until timeout."
  },
  {
    "id": "q_c4_m5_148",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Why should network-facing security parsers combine *both* a hard byte ceiling on `recv()` *and* explicit UTF-8 / JSON exception handling inside separate helper functions?",
    "options": [
      "Decoupling bounded transport framing from decoding validation keeps resource-limit defense testable without mocks and stops malformed payloads from crossing cleanly into application state",
      "JSON fails to parse strings under 256 bytes",
      "`unittest` prohibits testing two errors in one module",
      "`struct.unpack` requires helper functions to set big-endian flags"
    ],
    "correct": 0,
    "explanation": "Separating framing caps (DoS defense) from input validation/parsing isolates untrusted network layers cleanly and simplifies unit testing."
  },
  {
    "id": "q_c4_m5_149",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which IPv4 address guarantees packets emitted or received on a socket never leave the physical machine across Wi-Fi or Ethernet adapters?",
    "options": [
      "`192.168.1.1`",
      "`127.0.0.1`",
      "`0.0.0.0`",
      "`172.30.0.10`"
    ],
    "correct": 1,
    "explanation": "127.0.0.1 is the local loopback interface scoped strictly inside the host OS."
  },
  {
    "id": "q_c4_m5_150",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "In Course 04's client-server architecture, how can one server listening socket on `127.0.0.1:8443` handle 50 simultaneous client connections without confusing replies between Client A and Client B?",
    "options": [
      "The server closes and re-binds port 8443 for every packet",
      "All 50 clients share one single `conn` socket descriptor and filter by JSON ID",
      "The kernel demultiplexes traffic by full 4-tuple `(src_ip, src_port, dst_ip, dst_port)` (clients use distinct ephemeral ports), returning a distinct `conn` socket descriptor per `accept()` call",
      "`SOCK_STREAM` turns into 50 UDP multicast ports"
    ],
    "correct": 2,
    "explanation": "Each connected socket maps uniquely to a 4-tuple pairing the fixed server endpoint with each client's distinct ephemeral port."
  },
  {
    "id": "q_c4_m5_151",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "When modifying `echo_server` in Practical P1 to support framed lines ending in `b'\\n'`, what does `b'hello redkross\\n'.rstrip(b'\\r\\n')` measure for `OK <length>`?",
    "options": [
      "`256` bytes",
      "`1024` fixed bytes",
      "`0` bytes always",
      "`len(b'hello redkross')` = `14` bytes cleanly excluding line-ending delimiters"
    ],
    "correct": 3,
    "explanation": "Stripping the line delimiter yields exact message byte count 14 for OK 14."
  },
  {
    "id": "q_c4_m5_152",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Compare `b'ABC\\r\\n'` split cleanly vs. splitting strictly on `b'\\n'` without handling optional `\\r` from Windows/Telnet clients. If an analyst tests your Practical P1 TCP server from `nc` sending `CRLF` (`b'ping\\r\\n'`), what minor discrepancy hits `len(msg)` if `\\r` isn't stripped carefully?",
    "options": [
      "It returns `OK 5` instead of `OK 4` unless protocol spec either preserves `\\r` intentionally or trims optional `\\r` consistently",
      "`SOCK_STREAM` crashes with `SyntaxError` on `\\r`",
      "`conn.sendall` converts `\\r` into port `13`",
      "`recv(1024)` hangs forever until `\\r` vanishes"
    ],
    "correct": 0,
    "explanation": "Cross-platform text-line protocols must decide explicitly whether lines use LF (\\n) or strip CRLF (\\r\\n) deterministically."
  },
  {
    "id": "q_c4_m5_153",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In `requests`, what method verifies whether an HTTP response succeeded (`2xx`) and raises an exception automatically on `4xx`/`5xx`?",
    "options": [
      "`response.check_port()`",
      "`response.raise_for_status()`",
      "`response.verify_cert()`",
      "`response.inet_ntoa()`"
    ],
    "correct": 1,
    "explanation": "requests does not raise exceptions on HTTP 4xx/5xx unless response.raise_for_status() is explicitly invoked."
  },
  {
    "id": "q_c4_m5_154",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "A SIEM webhook forwards alerts via `requests.post(url, json=payload, timeout=(2, 5))`. What do the two values inside tuple `timeout=(2, 5)` enforce individually?",
    "options": [
      "TLSv1.2 minimum and 5 ports maximum",
      "2 retries and 5 bytes per frame",
      "Connect timeout `2` seconds max AND read timeout `5` seconds max between incoming bytes (preventing dead TCP endpoints AND stalled mid-response servers independently!)",
      "Wait 2 seconds before DNS and 5 seconds after `close()`"
    ],
    "correct": 2,
    "explanation": "A `(connect, read)` tuple bounds initial TCP/TLS connection establishment tightly at 2s and server response idle reads at 5s."
  },
  {
    "id": "q_c4_m5_155",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Which third-party package provides Mozilla's curated root CA certificate bundle cleanly for Python environments (`cafile=certifi.where()`)?",
    "options": [
      "`requests`",
      "`pytest`",
      "`scapy`",
      "`certifi`"
    ],
    "correct": 3,
    "explanation": "certifi maintains an updated Mozilla CA PEM bundle accessible via certifi.where()."
  },
  {
    "id": "q_c4_m5_156",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "Notice in Course 02/04 troubleshooting that passing `cafile=certifi.where()` worked when Windows lacked a needed root intermediate cache. Conversely, why would setting `cafile=certifi.where()` *break* connectivity to an internal server signed strictly by your company's private root CA?",
    "options": [
      "Mozilla's public `certifi` bundle intentionally excludes private organizational enterprise roots—so passing ONLY `certifi.where()` rejects internal enterprise certificates unless you supply the combined or internal corporate CA PEM!",
      "`certifi` only permits TLSv1.0 ciphers",
      "`certifi.where()` disables TCP ports above 1023",
      "`ssl.create_default_context` strips `cafile` on Linux"
    ],
    "correct": 0,
    "explanation": "Public trust bundles contain public WebPKI roots, not private corporate PKIs; internal services need their own internal root CA bundle specified."
  },
  {
    "id": "q_c4_m5_157",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In the TCP header bitfield `off_flags = 0x8018`, which bitwise mask isolates the 6 standard TCP control flags (`FIN, SYN, RST, PSH, ACK, URG`)?",
    "options": [
      "`off_flags >> 12`",
      "`off_flags & 0x3F`",
      "`off_flags & 0x0F`",
      "`off_flags >> 4`"
    ],
    "correct": 1,
    "explanation": "0x3F equals binary 0011 1111, masking out the lower 6 TCP control flag bits."
  },
  {
    "id": "q_c4_m5_158",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Look at `bytes.fromhex('adac1f90387bcbb2244ccd33801801f658d10000')` in `m05_networking.py`. Why does `struct.unpack('!HHIIH', raw[20:34])` slice ONLY `[20:34]` (`14` bytes) even though the TCP header is actually `32` bytes long?",
    "options": [
      "`struct` refuses slices above 16 bytes",
      "TCP headers on localhost lose their last 18 bytes",
      "Bytes 20..34 (`HHIIH` = 2+2+4+4+2 = 14 bytes) contain source/dest ports, seq, ack, and data-offset/flags—precisely up to the `off_flags` halfword, leaving window, checksum, urgent pointer, and options outside the example slice!",
      "`H` reads 16 bytes on little-endian CPUs"
    ],
    "correct": 2,
    "explanation": "Parsing stops at offset 34 because only sport (2B), dport (2B), seq (4B), ack (4B), and off_flags (2B) = 14 bytes were needed before window/checksum/options."
  },
  {
    "id": "q_c4_m5_159",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Which of the following input validation practices protects a JSON webhook consumer receiving arbitrary internet requests?",
    "options": [
      "Evaluating unknown fields using `exec()`",
      "Unpacking arbitrary binary `pickle` payloads",
      "Listening on `0.0.0.0` without authentication",
      "Bounding body size read, parsing via `json.loads()`, catching `JSONDecodeError`, and enforcing explicit field/type allowlists"
    ],
    "correct": 3,
    "explanation": "Bounded reads plus structured json.loads and schema checks defend against both DoS and injection."
  },
  {
    "id": "q_c4_m5_160",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Compare how `m05_networking.py` stays 100% safe during standalone testing vs. what happens if an engineer modifies `HOST = 'target.vendor.com'` without permission. Which two principles converge here?",
    "options": [
      "End-to-end scope authorization (Rule 1: test only owned/explicitly authorized targets) AND loopback isolation during dev (`127.0.0.1` mock server)",
      "Big-endian packing and `SO_REUSEADDR`",
      "HTTP 200 status and `User-Agent` truncation",
      "Nibble masking and daemon threads"
    ],
    "correct": 0,
    "explanation": "Safe network development tests all edge cases locally on 127.0.0.1 or authorized sandboxes—never unapproved live external targets."
  },
  {
    "id": "q_c4_m5_161",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "What does calling `cli.decode()` on `b'ECHO: HELLO REDKROSS'` achieve at the end of Section 1 in `m05_networking.py`?",
    "options": [
      "Unpacks 20 IPv4 bytes with `struct`",
      "Converts wire UTF-8 bytes back into a human-readable Python `str`",
      "Closes the OS listening socket",
      "Encrypts loopback traffic with TLSv1.3"
    ],
    "correct": 1,
    "explanation": "Socket I/O exchanges raw bytes; .decode() decodes bytes cleanly into str for printing."
  },
  {
    "id": "q_c4_m5_162",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Why must Python sockets send and receive `bytes` (not directly `str`), forcing explicit `.encode()` / `.decode()` boundaries in network engineering?",
    "options": [
      "Loopback drivers cannot read ASCII characters",
      "`str` objects occupy 16 bytes per bit on localhost",
      "Network sockets transmit arbitrary binary octets across protocols (PNG images, gzip streams, structs, UTF-8 text), leaving text character encoding cleanly explicit at application framing boundaries rather than guessing silently",
      "`socket` predates PEP 476"
    ],
    "correct": 2,
    "explanation": "Wire communication is fundamentally binary octets; explicit encode/decode prevents implicit encoding corruption bugs."
  },
  {
    "id": "q_c4_m5_163",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "Why did `m05_networking.py` print `True` for `port > 1023`?",
    "options": [
      "Because `User-Agent` forces ephemeral server ports",
      "Because port `80` translates to `1080` on Windows",
      "Because `SOCK_STREAM` adds `1024` to every port",
      "Because `bind((HOST, 0))` caused the OS kernel to assign an unused unprivileged ephemeral port above 1023"
    ],
    "correct": 3,
    "explanation": "Kernel ephemeral port assignment picks free non-privileged ports well above 1023."
  },
  {
    "id": "q_c4_m5_164",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "If a loopback server tests only `sendall(b'ping')` against a client reading `recv(1024)`, why can that code still pass 100% locally yet fail catastrophically in production against 64 KiB JSON alerts over WAN links?",
    "options": [
      "On loopback localhost, tiny payloads almost always arrive intact inside one `recv(1024)` call, hiding the missing framing/loop bug until larger payloads or WAN fragmentation split TCP streams across multiple `recv()` calls!",
      "WAN routers swap `'AF_INET'` to `'AF_INET6'` randomly",
      "`SO_REUSEADDR` drops packets over 1,500 bytes",
      "`sendall()` shrinks packets silently past 1024 bytes"
    ],
    "correct": 0,
    "explanation": "Local loopback hides TCP segmentation bugs on tiny strings; production framing loops must always handle partial and coalesced chunks."
  },
  {
    "id": "q_c4_m5_165",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "In API hygiene rules (`Lesson 5.3`), what HTTP status code tells your script to slow down and honor the `Retry-After` response header?",
    "options": [
      "`HTTP 200 OK`",
      "`HTTP 429 Too Many Requests`",
      "`HTTP 404 Not Found`",
      "`HTTP 301 Moved Permanently`"
    ],
    "correct": 1,
    "explanation": "HTTP 429 indicates rate limiting; clients should sleep according to Retry-After and back off cleanly."
  },
  {
    "id": "q_c4_m5_166",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Why does logging `X-Request-Id` alongside HTTP status codes beat dumping full HTTP request headers and payloads into SOC debug logs?",
    "options": [
      "`json.load()` deletes headers automatically otherwise",
      "`X-Request-Id` decreases socket latency",
      "`X-Request-Id` uniquely correlates failed API transactions with vendor support logs without risking cleartext leaks of `Authorization` tokens, API keys, or PII payload fields inside log aggregation pipelines",
      "HTTP 404 forbids logging URL paths"
    ],
    "correct": 2,
    "explanation": "Request/correlation IDs allow end-to-end debugging without storing bearer tokens or sensitive user data in centralized logs."
  },
  {
    "id": "q_c4_m5_167",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Which standard-library Python behavior prevents `evil.example.org`'s valid signed certificate from tricking Python into trusting it for `bank.example.org`?",
    "options": [
      "`SO_REUSEADDR`",
      "Big-endian byte order `'!'`",
      "HTTP `Content-Length` headers",
      "Hostname verification (`check_hostname = True`)"
    ],
    "correct": 3,
    "explanation": "Hostname verification binds the TLS handshake identity strictly to the server SAN hostname requested by the client."
  },
  {
    "id": "q_c4_m5_168",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "During an incident drill, a developer notices `urllib.request.urlopen('https://expired.badssl.com/', timeout=5)` raises `SSLCertVerificationError: certificate has expired`. Why is catching `SSLCertVerificationError` and retrying with `verify=False` never acceptable here?",
    "options": [
      "Because an expired certificate may have been revoked or belong to an unmaintained/compromised keypair; downgrading to `verify=False` silently disables ALL verification rather than alerting operators or renewing server certs safely",
      "Because `badssl.com` blocks `User-Agent` headers",
      "Because `timeout=5` doubles when `verify=False` passes",
      "Because expired certs always turn `443` into port `80`"
    ],
    "correct": 0,
    "explanation": "Certificate expiry failures protect clients against stale/compromised keys and failed certificate hygiene—fix the cert lifecycle instead of bypassing TLS."
  },
  {
    "id": "q_c4_m5_169",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "What value does the bitmask calculation `(ver_ihl & 0x0F) * 4` compute when `ver_ihl = 0x45`?",
    "options": [
      "`5` bytes",
      "`20` bytes (IPv4 header length)",
      "`32` bytes (TCP header length)",
      "`132` bytes (total packet length)"
    ],
    "correct": 1,
    "explanation": "Low nibble 5 specifies five 32-bit (4-byte) words = 20-byte IPv4 header length."
  },
  {
    "id": "q_c4_m5_170",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Suppose an IPv4 packet has `flags_frag = 0x2001`. What do `(flags_frag >> 13)` and `(flags_frag & 0x1FFF)` signify for fragment reassembly telemetry?",
    "options": [
      "TCP `SYN` flag with offset 20",
      "`DF` flag set with offset 0",
      "Bit 13 (`0b001` = **MF / More Fragments** flag set) with fragment offset `1` (8-byte offset unit -> byte offset 8), showing an active fragmented IPv4 datagram!",
      "Invalid IPv6 extension header"
    ],
    "correct": 2,
    "explanation": "In IPv4 16-bit flags/frag word: bit 14 is DF (0x4000), bit 13 is MF (0x2000), and low 13 bits (0x1FFF) give fragment offset in 8-octet blocks."
  },
  {
    "id": "q_c4_m5_171",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Why should network servers call `httpd.server_close()` alongside `httpd.shutdown()` during service teardown?",
    "options": [
      "To clear Python bytecode caches",
      "To convert HTTP responses into CSV files",
      "To regenerate internal TLS keys automatically",
      "To close the underlying kernel listening socket promptly rather than leaving unanswered TCP connections timing out"
    ],
    "correct": 3,
    "explanation": "shutdown() halts the serving loop; server_close() actually closes the OS socket descriptor cleanly."
  },
  {
    "id": "q_c4_m5_172",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "An automation pipeline processes binary telemetry from untrusted field sensors via `struct.unpack`. Before copying or slicing payload bytes using an unpacked field `payload_len`, what invariant must code assert?",
    "options": [
      "Verify `0 <= payload_len <= MAX_PAYLOAD` AND `offset + payload_len <= len(frame)` cleanly before extracting slices or loops, rejecting out-of-range forged lengths",
      "Only check `payload_len != 0`",
      "Evaluate `payload_len` inside `eval()`",
      "Multiply `payload_len` by `ttl` automatically"
    ],
    "correct": 0,
    "explanation": "Malicious binary frames can declare impossibly large or out-of-bounds lengths; validate bounds explicitly before indexing or allocating buffers."
  },
  {
    "id": "q_c4_m5_173",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "Which standard-library constant selects the IPv6 address family when creating a `socket.socket`?",
    "options": [
      "`socket.AF_INET`",
      "`socket.AF_INET6`",
      "`socket.SOCK_STREAM`",
      "`socket.SO_REUSEADDR`"
    ],
    "correct": 1,
    "explanation": "AF_INET6 configures 128-bit IPv6 endpoints."
  },
  {
    "id": "q_c4_m5_174",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "difficult",
    "q": "Why does binding `'localhost'` vs `'127.0.0.1'` differ slightly in edge-case troubleshooting?",
    "options": [
      "`'127.0.0.1'` blocks TLSv1.3",
      "`'localhost'` exposes sockets to Wi-Fi LAN peers automatically",
      "`'127.0.0.1'` explicitly fixes IPv4 loopback immediately with zero DNS/hosts resolution ambiguity, whereas `'localhost'` might resolve to IPv6 `::1` on dual-stack hosts causing client/server address-family mismatches if only IPv4 sockets listen!",
      "`'localhost'` uses UDP by default"
    ],
    "correct": 2,
    "explanation": "Explicitly using '127.0.0.1' (or '::1' for IPv6) avoids subtle localhost dual-stack resolution delays or v4/v6 client mismatch errors."
  },
  {
    "id": "q_c4_m5_175",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "medium",
    "q": "In `echo_server`, why does calling `with cli:` on the client side close the socket even if an assertion or print fails inside the block?",
    "options": [
      "`with` resets OS ephemeral ports to port 80",
      "`with` catches all `TimeoutError` exceptions silently",
      "`with` enables `SO_REUSEADDR` for the client",
      "Context manager `__exit__` automatically invokes `cli.close()` on normal return or exception unwind"
    ],
    "correct": 3,
    "explanation": "Using `with` context managers ensures deterministic resource cleanup across both normal flow and exceptions."
  },
  {
    "id": "q_c4_m5_176",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "Your Practical P1 TCP client writes two separate short lines `cli.sendall(b'hello\\n')` and `cli.sendall(b'world\\n')` over one socket. If an automated test asserts BOTH replies `'OK 5\\n'` arrive reliably regardless of kernel timing, what client-side loop pattern is required?",
    "options": [
      "Accumulate received bytes into a buffer splitting on `b'\\n'` until two complete newline-terminated reply frames have arrived (since `OK 5\\nOK 5\\n` might coalesce into 1 `recv` OR arrive across 3 chunks!)",
      "Call `cli.recv(1024)` exactly twice without checking contents",
      "Sleep 10 seconds before calling `recv(10)` once",
      "Re-open two separate sockets for every newline"
    ],
    "correct": 0,
    "explanation": "Symmetry in TCP framing applies to BOTH clients and servers: clients reading framed responses must also buffer until delimiter completion."
  },
  {
    "id": "q_c4_m5_177",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "What field on `urllib.error.HTTPError` holds the numeric HTTP status code (e.g., `404` or `500`)?",
    "options": [
      "`err.ttl`",
      "`err.code`",
      "`err.flags`",
      "`err.sockname`"
    ],
    "correct": 1,
    "explanation": "HTTPError exposes numeric status code via err.code and readable body stream via err."
  },
  {
    "id": "q_c4_m5_178",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "In `get_json('/api/status')`, if `urllib.request.urlopen` encounters an endpoint that returns valid HTTP `200 OK` *HTML error maintenance page* instead of JSON, which exception escapes `get_json` unless guarded cleanly?",
    "options": [
      "`HTTPError` (never triggers on `200`)",
      "`struct.error`",
      "`json.JSONDecodeError` (or `ValueError`) raised inside `json.load(resp)` when attempting to parse HTML tags (`'<'`) as JSON!",
      "`PermissionError`"
    ],
    "correct": 2,
    "explanation": "Even HTTP 200 captive portals or proxy maintenance banners can return HTML instead of JSON; guard json.load() against JSONDecodeError."
  },
  {
    "id": "q_c4_m5_179",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "Which standard TLS handshake problem caused the Windows `example.com` verification test failure resolved by `certifi`?",
    "options": [
      "`struct.error: unpack requires buffer of 20 bytes`",
      "`ConnectionRefusedError` on port `80`",
      "`HTTPError 404`",
      "`CERTIFICATE_VERIFY_FAILED: unable to get local issuer certificate`"
    ],
    "correct": 3,
    "explanation": "When the local OS store lacks a clean intermediate/root chain, Python raises CERTIFICATE_VERIFY_FAILED; supplying a proper CA bundle resolves it safely."
  },
  {
    "id": "q_c4_m5_180",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "Why does certificate pinning (or specifying an explicit internal root `cafile='/etc/ssl/corp.pem'`) provide even tighter operational assurance for high-value internal SOC APIs than trusting 100+ public commercial CAs?",
    "options": [
      "If any unrelated external public commercial CA in a global bundle is compromised or tricked into mis-issuing a cert for your internal domain, trusting ONLY your internal enterprise CA root blocks that rogue public certificate cleanly!",
      "It turns off TLS encryption on localhost to boost CPU speed",
      "Internal CA PEM files shorten packet TTL automatically",
      "Pinned bundles eliminate the need for HTTP timeouts"
    ],
    "correct": 0,
    "explanation": "Scoping cafile strictly to the trusted organizational CA limits attack surface against rogue third-party WebPKI compromises."
  },
  {
    "id": "q_c4_m5_181",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "How many bytes total does `struct.unpack('!HHIIH', ...)` consume when decoding the beginning of a TCP header?",
    "options": [
      "`20` bytes",
      "`14` bytes",
      "`32` bytes",
      "`8` bytes"
    ],
    "correct": 1,
    "explanation": "2 + 2 + 4 + 4 + 2 = 14 bytes (raw[20:34])."
  },
  {
    "id": "q_c4_m5_182",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "In `m05_networking.py`, `sport = 0xadac` unpacked as `44460`, while `seq = 0x387bcbb2`. Why should packet dissectors verify `(ver_ihl >> 4) == 4` and `(ver_ihl & 0x0F) >= 5` BEFORE reading `ttl`, `proto`, or TCP headers?",
    "options": [
      "Ethernet padding can carry arbitrary bytes",
      "`ttl` changes big-endian endianness when `IHL != 5`",
      "Because an `IPv6` packet (`version == 6`) or malformed corrupt header (`IHL < 5` < 20 bytes) would cause TCP slices starting at `IHL * 4` to read garbage or loop backwards endlessly!",
      "`inet_ntoa()` crashes Python if version is `6`"
    ],
    "correct": 2,
    "explanation": "Checking version == 4 and minimum IHL >= 5 (20 bytes) validates header integrity before deriving variable offsets."
  },
  {
    "id": "q_c4_m5_183",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Which safe network practice aligns directly with Lesson 5.6's rule on untrusted peer input?",
    "options": [
      "Calling `pickle.loads` on incoming HTTP webhooks",
      "Exposing `http.server.HTTPServer` publicly on port 80",
      "Removing `timeout=` so big alerts never cut off",
      "Validating received fields defensively after safe JSON/binary parsing rather than calling `eval()` or trusting wire values blindly"
    ],
    "correct": 3,
    "explanation": "All received wire bytes stay untrusted until validated for bounds, format, and schema."
  },
  {
    "id": "q_c4_m5_184",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Summarize the defense-in-depth failure chain in Lotus Logistics (`CS2`) and compare it with your code review checklist (`Lesson 5.6`). If an external enrichment call is strictly optional context on a priority-1 malware alert, what should the collector emit if the enrichment API times out cleanly?",
    "options": [
      "Fail-open ONLY on the *optional* enrichment field (`enrichment: 'unavailable'`), forward the primary malware alert immediately so analysts see the threat on time, and log/alert enrichment degradation separately!",
      "Drop the malware alert completely to avoid inconsistent JSON schemas",
      "Disable HTTPS certificate verification and retry indefinitely",
      "Freeze all alert threads until the API reboots"
    ],
    "correct": 0,
    "explanation": "Never let optional enrichment dependencies block primary security detection alerting—degrade cleanly with explicit telemetry."
  },
  {
    "id": "q_c4_m5_185",
    "topic": "C04-M05-L01: Sockets & Client-Server Model",
    "difficulty": "medium",
    "q": "What happens when a Python server socket fails to bind because another active service already holds `(HOST, port)`?",
    "options": [
      "Python connects as a UDP client automatically",
      "OS raises `OSError` (`Address already in use`)",
      "Python shifts the IP to `127.0.0.2`",
      "The port doubles dynamically"
    ],
    "correct": 1,
    "explanation": "Conflicting bindings raise OSError (EADDRINUSE), which binding port 0 cleanly avoids."
  },
  {
    "id": "q_c4_m5_186",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "In `echo_server`, `data = conn.recv(1024)` runs inside a single accept handler and responds `conn.sendall(b'ECHO: ' + data.upper())`. Why is this minimal pattern sufficient for a 14-byte loopback demo yet insufficient for general multi-line TCP framing?",
    "options": [
      "`data.upper()` fails on ASCII spaces",
      "`sendall()` works only once per Python script execution",
      "Because arbitrary messages larger than `1024` bytes or split across TCP segments will be cut short after a single `recv(1024)` call rather than looping until delimiter/EOF!",
      "`echo_server` forgets to bind port `0`"
    ],
    "correct": 2,
    "explanation": "One recv(1024) demonstrates the OS primitive clearly while real stream services require bounded framing loops (Practical P1)."
  },
  {
    "id": "q_c4_m5_187",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "How do you identify your HTTP automation cleanly to API gateways when building a `urllib.request.Request` object?",
    "options": [
      "Disabling `HTTPServer.shutdown()`",
      "Passing binary bytes inside `timeout=`",
      "Calling `srv.setsockopt()`",
      "Setting `headers={'User-Agent': 'rk-c04-client/1.0'}`"
    ],
    "correct": 3,
    "explanation": "Passing an accurate User-Agent header aids service operators and rate-limit identification."
  },
  {
    "id": "q_c4_m5_188",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "You inspect an incident script written back on Python 2.7.5 in a legacy VM appliance. Why might that outdated script appear `'working'` over `https://` to a rogue MITM certificate without *any* `verify=False` flag in its code?",
    "options": [
      "Because Python 2.7.5 predated **PEP 476** (shipped in 2.7.9 / 3.4.3), meaning its stdlib HTTP client failed open with ZERO certificate verification by default!",
      "Python 2.7.5 verified every domain using `MD5` automatically",
      "Python 2.7.5 used IPv6 TLS exclusively",
      "`User-Agent` skipped certificates before Python 3"
    ],
    "correct": 0,
    "explanation": "Legacy Python versions prior to 2.7.9 / 3.4.3 did not enforce HTTPS certificate validation by default, underscoring why PEP 476 and supported runtimes matter."
  },
  {
    "id": "q_c4_m5_189",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "In Course 02 / Course 04 binary packet analysis (`raw[:20]`), what two dotted-quad IPv4 addresses communicate in `m05_networking.py`?",
    "options": [
      "`127.0.0.1 -> 127.0.0.1`",
      "`172.30.0.20 -> 172.30.0.10`",
      "`192.168.1.1 -> 10.0.0.1`",
      "`10.20.4.17 -> 203.0.113.7`"
    ],
    "correct": 1,
    "explanation": "m05_networking.py unpacks source 172.30.0.20 and destination 172.30.0.10 directly matching Course 02."
  },
  {
    "id": "q_c4_m5_190",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Verify why a raw byte at `raw[9]` (`proto = 0x06`) in the 20-byte IPv4 header corresponds to the sixth element unpacked by `'!BBHHHBBH4s4s'`, AND confirm its exact 0-based byte offset.",
    "options": [
      "Offset `12`: directly beside `src`",
      "Offset `6`: right after `total_len`",
      "Offset `9`: `ver_ihl`(1B @0) + `tos`(1B @1) + `total_len`(2B @2..3) + `ident`(2B @4..5) + `flags_frag`(2B @6..7) + `ttl`(1B @8) + **`proto`(1B @9)** = cumulative `9` bytes preceding it",
      "Offset `20`: inside the TCP header"
    ],
    "correct": 2,
    "explanation": "Summing RFC 791 field widths confirms IPv4 Protocol always sits at byte offset 9 (following TTL at byte 8)."
  },
  {
    "id": "q_c4_m5_191",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Why should security teams keep both local mock unit tests (`127.0.0.1`) and explicit written scope documents for live network integrations?",
    "options": [
      "`User-Agent` strips scope checks cleanly",
      "Scope rules automatically replace `verify=False`",
      "Local mocks require `struct.pack('!Q')`",
      "Local mocks verify framing/timeouts safely without external blast radius, while scope rules prevent accidental unauthorized traffic against external infrastructure"
    ],
    "correct": 3,
    "explanation": "Local loopback mocks enable repeatable fast testing while authorization prevents unapproved external scanning or probing."
  },
  {
    "id": "q_c4_m5_192",
    "topic": "C04-M05-L02: Writing a TCP Server and Client",
    "difficulty": "difficult",
    "q": "In Practical P1 (`ERR too long`), why must your TCP server close the connection immediately after replying `ERR too long` on an oversized non-terminated stream rather than leaving the connection open to read the rest of the stream?",
    "options": [
      "If it stayed open reading further without framing recovery, stream offset synchronization is lost and the hostile client could continue flooding megabytes or confuse future valid messages with leftovers of the truncated stream!",
      "`sendall()` deletes `SO_REUSEADDR` unless closed",
      "`OK <length>` only prints after client close",
      "Python forbids two `sendall` replies on one TCP connection"
    ],
    "correct": 0,
    "explanation": "Exceeding frame length leaves stream framing desynchronized (attacker may still have unread bytes in transit); hard error reply + immediate close restores defensive state."
  },
  {
    "id": "q_c4_m5_193",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "medium",
    "q": "Which HTTP security hygiene check protects internal telemetry dashboards from blindly forwarding unverified garbage returned by third-party feeds?",
    "options": [
      "Use `requests.get()` with default `timeout=None`",
      "Validate expected keys, data types, and value ranges on parsed JSON before downstream ingestion",
      "Pass bearer tokens inside URL query parameters logged by proxies",
      "Ignore HTTP `500` responses silently"
    ],
    "correct": 1,
    "explanation": "Always treat remote JSON responses as untrusted input requiring schema validation before storing or alerting."
  },
  {
    "id": "q_c4_m5_194",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "difficult",
    "q": "Compare how `requests.get(url, verify='/path/corp-ca.pem')` and `requests.get(url, verify=False)` behave if an attacker intercepts the TLS handshake with a self-signed certificate. What exact difference occurs?",
    "options": [
      "Both fail with `SSLError`",
      "`verify=False` still checks SAN hostnames cleanly",
      "`verify='/path/corp-ca.pem'` rejects the attacker cert with `SSLError` immediately, protecting tokens; `verify=False` accepts the attacker cert silently and exposes credentials/data!",
      "`verify='/path/corp-ca.pem'` disables hostname checking"
    ],
    "correct": 2,
    "explanation": "Passing a trusted CA PEM path enforces strict cryptographic verification against only authorized issuers, whereas False disables checks completely."
  },
  {
    "id": "q_c4_m5_195",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "medium",
    "q": "If `raw_tcp` has `off_flags = 0x5010`, what TCP header size and flag does that represent?",
    "options": [
      "40 bytes TCP header and `FIN`",
      "32 bytes TCP header and `PSH + ACK`",
      "20 bytes TCP header and `SYN` (`0x02`)",
      "20 bytes TCP header and `ACK` (`0x10`)"
    ],
    "correct": 3,
    "explanation": "(0x5010 >> 12) * 4 = 5 * 4 = 20 bytes; 0x5010 & 0x3F = 0x10 = ACK flag."
  },
  {
    "id": "q_c4_m5_196",
    "topic": "C04-M05-L05: Parsing Binary Network Data with struct",
    "difficulty": "difficult",
    "q": "Verify every single nibble of `raw[:2]` (`0x45`, `0x00`) and `raw[2:4]` (`0x0084`) in `m05_networking.py`. Why does `struct.unpack('!BBH...', raw[:4])` unpack `ver_ihl = 69`, `tos = 0`, `total_len = 132`?",
    "options": [
      "`0x45 = 4*16 + 5 = 69` unsigned byte (`B`), `0x00 = 0` (`B`), and big-endian unsigned 16-bit halfword (`H`) reads `0x0084 = 8*16 + 4 = 132`",
      "`0x45 = 45` decimal, `0x0084 = 84` decimal",
      "`B` reads nibbles automatically instead of full bytes",
      "`!` multiplies byte values by 4"
    ],
    "correct": 0,
    "explanation": "Hex 0x45 equals decimal 69 (high nibble 4 = version, low nibble 5 = IHL); big-endian 0x0084 equals decimal 132."
  },
  {
    "id": "q_c4_m5_197",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "medium",
    "q": "Before exposing any local Python socket listener beyond `127.0.0.1` (`0.0.0.0`), what prerequisites are mandatory in defensive design?",
    "options": [
      "Only turning off logging via `log_message`",
      "Explicit authentication, encrypted transport (TLS), strict input/size limits, and network firewall justification",
      "Only increasing `listen(5)` to `listen(500)`",
      "Using `pickle` instead of `json`"
    ],
    "correct": 1,
    "explanation": "Non-loopback listeners must enforce authentication, transport security, strict size/input boundaries, and authorized firewall rules."
  },
  {
    "id": "q_c4_m5_198",
    "topic": "C04-M05-L03: HTTP from Python",
    "difficulty": "difficult",
    "q": "Inspect why `m05_networking.py` places `urllib.request.Request(url, headers={'User-Agent': 'rk-c04-client/1.0'})` before `urlopen(req, timeout=5)`, whereas passing a bare URL string directly skips custom headers. What extra defensive control can `urllib.request.Request` ALSO validate before calling `urlopen`?",
    "options": [
      "`Request` compresses responses via big-endian gzip",
      "`Request` converts `file://` into `127.0.0.1` sockets automatically",
      "Checking `urllib.parse.urlparse(url).scheme in ('http', 'https')` (or strictly `'https'` in production) so untrusted user/config URLs cannot trick `urllib.request.urlopen()` into opening `file:///etc/passwd` local schemes!",
      "`Request` forces `httpd.server_close()` on remote servers"
    ],
    "correct": 2,
    "explanation": "urllib.request.urlopen accepts `file://` URLs natively! Allowing arbitrary schemes on untrusted URLs leaks local files unless validated to `'https'` (`'http'` localhost tests only)!"
  },
  {
    "id": "q_c4_m5_199",
    "topic": "C04-M05-L04: HTTPS & Certificate Verification",
    "difficulty": "medium",
    "q": "In Course 04 Module 5, why must bearer authentication tokens NEVER travel inside plaintext HTTP URLs across untrusted networks?",
    "options": [
      "`http://` forces `SO_REUSEADDR` errors",
      "`urllib` strips query strings over `http://`",
      "TLS packets cannot carry HTTP headers",
      "On-path attackers capture unencrypted tokens straight off the wire; enforce HTTPS with active PEP 476 verification (`verify` / default context) and pass secrets via secure headers/stores"
    ],
    "correct": 3,
    "explanation": "Plaintext HTTP exposes credentials and API tokens passively to every router or Wi-Fi observer on path."
  },
  {
    "id": "q_c4_m5_200",
    "topic": "C04-M05-L06: Safe Network Programming",
    "difficulty": "difficult",
    "q": "Consolidate Module 5 end-to-end: A SOC team launches an authorized internal service on `127.0.0.1`, sets `timeout=(2, 5)`, rejects payloads over `64 KiB`, verifies corporate TLS certificates via `cafile`, checks JSON schemas, and calls `server_close()` cleanly on exit. Which security triad impact does this combination enforce simultaneously?",
    "options": [
      "Eliminates the need for module authorization completely",
      "Only Confidentiality; Integrity requires `verify=False`",
      "Only Availability via UDP",
      "Confidentiality (verified TLS + scoped loopback), Integrity (authenticated peers + schema checks), and Availability (explicit timeouts + bounded reads + circuit breaking + clean teardown)"
    ],
    "correct": 3,
    "explanation": "Every defensive practice in Module 5 directly operationalizes CIA safeguards in Python network code: verified TLS protects confidentiality/integrity, while timeouts, size bounds, circuit breakers, and resource closing uphold availability."
  }
];
