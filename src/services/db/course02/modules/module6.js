/**
 * Course 02: Computer Networking for Cybersecurity
 * Module 6: Module 6: Routing and Switching
 */

export const module6Data = {
  "id": "mod_c2_m6",
  "courseId": "crs_cyber_net_02",
  "title": "Module 6: Routing and Switching",
  "description": "Master Layer 2 switching mechanics, IEEE 802.1Q VLAN trunking, CAM address learning, spanning-tree topologies, and access switch defense. Dissect Layer 3 IP routing architectures, longest-prefix matching algorithms, OSPF and BGP route propagation, and rigorous enterprise network segmentation frameworks.",
  "lessonsCount": 6,
  "duration": "8 Hours",
  "lessons": [
    {
      "id": "les_c2_m6_l1",
      "title": "How Switches Forward Frames: MAC Tables & Bridging",
      "duration": "60 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d1",
          "title": "Figure C02-M06-D1: Layer 2 Switch Forwarding & MAC Learning",
          "url": "/assets/courses/cyber-02/c02_m6_l1_switch_mac_learning.jpg",
          "caption": "Figure C02-M06-D1: Layer 2 Ethernet switch forwarding dynamics: Ingress frame parsing, dynamic CAM table learning (Source MAC to Port), and Unknown Unicast Flooding across VLAN members.",
          "alt": "Layer 2 Ethernet switch forwarding, CAM table learning, and unknown unicast flooding diagram"
        }
      ],
      "content": "## How Switches Forward Frames: MAC Tables & Transparent Bridging\n\nSwitches operate primarily at **Layer 2 (Data Link)** of the OSI reference architecture. While legacy hubs operated as physical layer repeaters that broadcast electrical signals across every single port simultaneously, modern Ethernet switches perform intelligent, frame-level forwarding based on physical hardware MAC addresses.\n\n### 1. The MAC Address Table (CAM Table)\nA switch dynamically learns network topology by observing incoming Ethernet frames. When a frame arrives on a physical port, the switch inspects its **Source MAC address**:\n- **Learning Phase:** The switch registers an association: `Source MAC Address -> Ingress Port Number` in its volatile memory table, known as the **Content Addressable Memory (CAM) Table** or **MAC Address Table** (standardised under IEEE 802.1Q/802.1D transparent bridging).\n- **Ageing Timer:** Each CAM entry is assigned an ageing timer (typically 300 seconds / 5 minutes). If no frames arrive from that specific MAC address before the timer expires, the entry is flushed to prevent stale routing when devices disconnect or move.\n\n![Figure C02-M06-D1: Layer 2 Switch Forwarding & MAC Learning](/assets/courses/cyber-02/c02_m6_l1_switch_mac_learning.jpg)\n\n*Figure C02-M06-D1: Layer 2 Ethernet switch forwarding dynamics: Ingress frame parsing, dynamic CAM table learning (Source MAC to Port), and Unknown Unicast Flooding across VLAN members.*\n\n### 2. The Four Switch Forwarding Decisions\nFor every ingress frame, the switch extracts the **Destination MAC address** and executes one of four deterministic decisions:\n\n1. **Known Unicast:** If the destination MAC is already present in the CAM table for that VLAN, the switch forwards the frame *strictly out of the single designated destination port*. No other ports see the frame.\n2. **Unknown Unicast:** If the destination MAC is not in the CAM table, the switch must ensure delivery. It executes an **Unknown Unicast Flood**, replicating the frame out of every active port in the same VLAN *except the port on which it arrived*. Once the target host replies, the switch learns its location and updates the CAM table.\n3. **Broadcast Transmission:** If the destination MAC is `FF:FF:FF:FF:FF:FF`, the frame is intentionally delivered to all nodes on the segment. The switch floods the frame out of all ports belonging to that VLAN (except the ingress port).\n4. **Multicast Transmission:** If the destination is a multicast address (`01:00:5E:xx:xx:xx` in IPv4 or `33:33:xx:xx:xx:xx` in IPv6), the switch either floods the frame or performs intelligent filtering via **IGMP Snooping** or **MLD Snooping** to deliver traffic exclusively to subscribed ports.\n\n### 3. Collision Domains vs. Broadcast Domains\n- **Collision Domain:** A physical or logical segment where simultaneous packet transmissions interfere with each other. In modern full-duplex Ethernet switching, **each individual switch port represents its own independent collision domain**. Collisions are physically impossible on full-duplex links because transmission (Tx) and reception (Rx) utilize dedicated wire pairs.\n- **Broadcast Domain:** The boundary across which a broadcast frame propagates. **An entire switch (or an isolated VLAN) represents a single broadcast domain**. Routers and Layer 3 firewalls terminate broadcast domains; switches do not.\n\n### 4. Spanning Tree Protocol (STP) & Loop Avoidance\nIn enterprise architectures, redundant physical cables between switches are deployed to guarantee high availability. However, redundant Layer 2 links create catastrophic forwarding loops:\n- Broadcast frames circulate endlessly in clockwise and counter-clockwise directions, causing a **Broadcast Storm** that saturates link bandwidth and exhausts switch CPU within seconds.\n- Switches rapidly oscillate MAC addresses between ports, corrupting the CAM table (MAC table thrashing).\n\nTo eliminate loops, the **Spanning Tree Protocol (STP, IEEE 802.1D)** and **Rapid Spanning Tree Protocol (RSTP, IEEE 802.1w)** dynamically construct a loop-free tree topology:\n1. Switches elect a central **Root Bridge** based on the lowest Bridge ID (Priority + MAC address).\n2. Each non-root switch identifies its single lowest-cost **Root Port** leading to the Root Bridge.\n3. Redundant, non-essential switch ports are transitioned into the **Blocking / Discarding State**, dropping user frames while continuously listening to Bridge Protocol Data Units (BPDUs).\n4. If an active link fails, the blocked port automatically unblocks to restore connectivity.\n\n> [!CAUTION]\n> **BPDU Guard Security Requirement:** Adversaries can connect unauthorized switches or rogue software running spanning-tree daemons to steal the Root Bridge role. Enterprise access switches must enforce **BPDU Guard** on all user-facing edge ports. If a BPDU frame is detected on a user port, the switch immediately disables the port (err-disable state).`"
    },
    {
      "id": "les_c2_m6_l2",
      "title": "VLANs, 802.1Q Tagging & Inter-VLAN Routing",
      "duration": "70 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d2",
          "title": "Figure C02-M06-D2: 802.1Q VLAN Trunking & Router-on-a-Stick",
          "url": "/assets/courses/cyber-02/c02_m6_l2_vlan_tagging_router_stick.jpg",
          "caption": "Figure C02-M06-D2: Enterprise VLAN architecture: 4-byte 802.1Q tag header structure (TPID 0x8100, PCP, VID), multiplexed 802.1Q trunk links, and Inter-VLAN routing via router sub-interfaces (Router-on-a-Stick).",
          "alt": "802.1Q VLAN trunking and router on a stick inter-VLAN routing diagram"
        },
        {
          "id": "fig_c02_m06_f1",
          "title": "Figure C02-M06-F1: VLANs, Trunks and Inter-VLAN Filtering",
          "url": "/assets/courses/cyber-02/C02-M06-F1.png",
          "caption": "Figure C02-M06-F1: Enterprise switch segmentation showing 802.1Q tagged trunk links and inter-VLAN access control enforcement at the boundary router/firewall.",
          "alt": "Enterprise VLAN segmentation with 802.1Q tagged trunks and router on a stick"
        }
      ],
      "content": "## Virtual Local Area Networks (VLANs) & IEEE 802.1Q Trunking\n\nA flat physical network is an acute security vulnerability: any compromised endpoint can listen to broadcast traffic, spoof ARP entries, and initiate lateral attacks against high-value servers. **Virtual Local Area Networks (VLANs)** solve this by logically partitioning a single physical switch into multiple isolated broadcast domains.\n\n### 1. VLAN Architecture & Access vs. Trunk Ports\n- **Access Ports:** Connect directly to endpoint devices (workstations, printers, IP phones, single servers). An access port is assigned to exactly **one VLAN**. The connected endpoint is entirely unaware of VLANs; frames entering and exiting access ports are completely **untagged**.\n- **Trunk Ports:** High-speed interconnection links between switches, routers, or hypervisors. A trunk port multiplexes traffic from **multiple VLANs** across a single physical link by appending an explicit cryptographic/binary identifier to each frame.\n\n### 2. IEEE 802.1Q Tag Architecture\nTo distinguish which VLAN a frame belongs to as it traverses a trunk, the sending switch injects a 4-byte (32-bit) **IEEE 802.1Q header** between the Source MAC address and the EtherType field:\n\n![Figure C02-M06-D2: 802.1Q VLAN Trunking & Router-on-a-Stick](/assets/courses/cyber-02/c02_m6_l2_vlan_tagging_router_stick.jpg)\n\n*Figure C02-M06-D2: Enterprise VLAN architecture: 4-byte 802.1Q tag header structure (TPID 0x8100, PCP, VID), multiplexed 802.1Q trunk links, and Inter-VLAN routing via router sub-interfaces (Router-on-a-Stick).*\n\n- **Tag Protocol Identifier (TPID):** Fixed 16-bit hex value `0x8100`. Identifies the frame as an IEEE 802.1Q tagged frame.\n- **Priority Code Point (PCP):** 3 bits allocated for Quality of Service (QoS / 802.1p class of service, values 0-7).\n- **Drop Eligible Indicator (DEI):** 1 bit indicating whether the frame can be dropped during periods of intense congestion.\n- **VLAN Identifier (VID):** 12 bits defining the specific VLAN ID. With 12 bits, the maximum range is $2^{12} = 4096$ values (`0` and `4095` are reserved; usable range is `1` to `4094`).\n\nIn Wireshark captures, a tagged trunk frame displays the 802.1Q protocol layer immediately preceding IPv4/IPv6:\n```\nFrame 14: 1518 bytes on wire\nEthernet II, Src: 00:50:56:c0:00:01, Dst: 00:0c:29:ab:12:cd\n802.1Q Virtual LAN, PRI: 0, DEI: 0, ID: 20\nInternet Protocol Version 4, Src: 10.40.2.140, Dst: 10.40.2.10\n```\n\n### 3. The Native VLAN & Security Hazards\nOn IEEE 802.1Q trunk links, one designated VLAN is transmitted **untagged**—known as the **Native VLAN** (defaulting to VLAN 1 on Cisco equipment).\n- **VLAN Hopping (Double Tagging Attack):** If an attacker connected to an access port matching the Native VLAN transmits a frame with *two* 802.1Q tags (Outer tag = Native VLAN, Inner tag = Target Victim VLAN 20), the first switch strips the outer tag because it matches the native VLAN on the trunk. The second switch inspects the inner tag and forwards the frame into victim VLAN 20.\n- **Defensive Hardening:**\n  1. Never use the default `VLAN 1` for user data or trunk links.\n  2. Assign the Native VLAN to an unused, isolated dummy VLAN (e.g., VLAN 999).\n  3. Enforce **VLAN Tag Native** globally (`vlan dot1q tag native`), forcing the switch to tag all native traffic.\n\n### 4. Inter-VLAN Routing & Filtering Architecture\nBecause VLANs are completely isolated broadcast domains at Layer 2, **devices in different VLANs cannot communicate without a Layer 3 routing engine**. This boundary provides the primary structural foundation for network security.\n\n![C02-M06-F1: VLANs, trunks and inter-VLAN filtering](/assets/courses/cyber-02/C02-M06-F1.png)\n\nAs illustrated in **Figure C02-M06-F1**, three implementation models exist:\n1. **Router on a Stick (Legacy/Small Branch):** A physical router connects to the switch via a single trunk cable. The router creates virtual sub-interfaces (e.g. `eth0.10`, `eth0.20`), terminating each VLAN and routing traffic between them.\n2. **Layer 3 Switch (Multilayer Switching):** The core switch creates internal **Switched Virtual Interfaces (SVIs)** that route inter-VLAN packets at hardware line-rate using dedicated ASICs.\n3. **Firewall-Enforced Inter-VLAN Routing (Zero Trust Best Practice):** All inter-VLAN traffic is directed through a stateful firewall. The firewall inspects every packet against strict access control rules, blocking lateral traversal between untrusted user zones and sensitive database subnets.\n\n> [!IMPORTANT]\n> **VLANs Are Not Security Alone:** A common novice mistake is assuming that placing servers and users in separate VLANs provides security. If an unmanaged Layer 3 switch or open router forwards packets between those VLANs without firewall inspection, the separation is purely administrative, not defensive."
    },
    {
      "id": "les_c2_m6_l3",
      "title": "Switch Security Features: DAI, Snooping & 802.1X",
      "duration": "75 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d3",
          "title": "Figure C02-M06-D3: Enterprise Switch Security (DAI & IEEE 802.1X)",
          "url": "/assets/courses/cyber-02/c02_m6_l3_switch_dai_and_8021x.jpg",
          "caption": "Figure C02-M06-D3: Layer 2 access defense: Dynamic ARP Inspection (DAI) dropping spoofed gateway packets against the DHCP Snooping database, and IEEE 802.1X EAP-TLS port-based access control.",
          "alt": "Dynamic ARP Inspection DAI and IEEE 802.1X port authentication architecture diagram"
        }
      ],
      "content": "## Access Layer Switch Security Architecture\n\nThe physical access edge—where user workstations, conference room wall jacks, and guest devices interface with corporate infrastructure—presents an expansive attack surface. Enterprise switches provide a robust defense-in-depth toolset to prevent Layer 2 reconnaissance, MITM hijacking, and table exhaustion.\n\n### 1. Port Security & MAC Address Limiting\nBy default, an unhardened switch port accepts and learns thousands of MAC addresses. An attacker running a tool like `macof` can generate 155,000 forged MAC frames per minute, completely exhausting the switch's CAM table and forcing it into **Fail-Open (Hub) Mode**, where all subsequent unicast traffic is flooded across all ports.\n\n**Port Security** counters this by setting strict operational boundaries on access ports:\n- **Maximum MAC Limit:** Configures how many unique MAC addresses can be learned on a single physical interface (typically 1 or 2).\n- **Sticky MAC Learning:** The switch records the first connected MAC address permanently into the running configuration.\n- **Violation Modes:**\n  - `Protect`: Drops frames from unauthorized MACs silently; no alert logged.\n  - `Restrict`: Drops unauthorized frames and increments the security violation counter while transmitting an SNMP trap to the SIEM.\n  - `Shutdown`: Instantly shuts down the port into an `err-disable` state, requiring administrative intervention or an automated recovery timer.\n\n![Figure C02-M06-D3: Enterprise Switch Security (DAI & IEEE 802.1X)](/assets/courses/cyber-02/c02_m6_l3_switch_dai_and_8021x.jpg)\n\n*Figure C02-M06-D3: Layer 2 access defense: Dynamic ARP Inspection (DAI) dropping spoofed gateway packets against the DHCP Snooping database, and IEEE 802.1X EAP-TLS port-based access control.*\n\n### 2. DHCP Snooping\nAs analyzed in Module 5, unauthorized **Rogue DHCP Servers** can distribute malicious default gateway and DNS server addresses to hijack subnet traffic.\n\n**DHCP Snooping** establishes a cryptographic and behavioral trust boundary:\n- **Trusted Ports:** Interfaces connected to legitimate corporate DHCP servers or core switch uplinks.\n- **Untrusted Ports:** Standard user-facing access ports.\n- **Behavioral Enforcement:** If any DHCP server response message (`DHCP OFFER`, `DHCP ACK`, or `DHCP NAK`) is detected arriving on an **untrusted port**, the switch instantly drops the frame and shuts down the interface.\n\nThe switch stores all legitimate leases inside the **DHCP Snooping Binding Database**, recording the verified `[MAC Address, Leased IP, Lease Duration, VLAN, Switch Port]`.\n\n### 3. Dynamic ARP Inspection (DAI)\nAddress Resolution Protocol (ARP) lacks authentication; any node on a broadcast domain can broadcast forged ARP replies claiming ownership of the default gateway's IP address (ARP Poisoning / MITM).\n\n**Dynamic ARP Inspection (DAI)** intercepts and validates every ARP packet on untrusted ports against the **DHCP Snooping Binding Database**:\n1. When Host A transmits an ARP reply claiming `172.31.10.1 is at MAC 00:11:22:33:44:55`, the switch looks up the entry for that physical port.\n2. If the IP-to-MAC mapping does not match the snooping database, the switch logs an alert and drops the invalid ARP reply.\n3. For statically addressed servers that do not use DHCP, network engineers configure static **ARP Access Control Lists (ARP ACLs)**.\n\n### 4. IP Source Guard (IPSG)\nAdversaries often spoof legitimate IP addresses to bypass host firewall rules or launch reflection attacks. **IP Source Guard (IPSG)** applies Layer 3 ingress filtering at the switch port level:\n- The switch programs hardware packet filters that inspect the Source IP of every egress frame from a user port.\n- Any packet whose Source IP does not match the verified IP bound in the DHCP Snooping table is discarded at the physical PHY level.\n\n### 5. IEEE 802.1X Port-Based Network Access Control (NAC)\nRather than allowing any device plugged into an Ethernet jack to immediately join the network, **IEEE 802.1X** requires robust cryptographic or credential authentication before granting access:\n- **Supplicant:** Software on the client endpoint (e.g. Windows native 802.1X client).\n- **Authenticator:** The physical access switch or wireless access point.\n- **Authentication Server:** A centralized enterprise RADIUS / TACACS+ server (e.g. Cisco ISE, Aruba ClearPass, FreeRADIUS).\n\nUpon successful authentication, the RADIUS server dynamically instructs the switch which VLAN to assign to the port, enforcing least privilege based on user role and endpoint security posture."
    },
    {
      "id": "les_c2_m6_l4",
      "title": "Gateways, Routing Tables & Longest Prefix Match",
      "duration": "70 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d4",
          "title": "Figure C02-M06-D4: Longest Prefix Match (LPM) Routing Decision Tree",
          "url": "/assets/courses/cyber-02/c02_m6_l4_longest_prefix_match.jpg",
          "caption": "Figure C02-M06-D4: Algorithmic Longest Prefix Match (LPM) evaluation: Destination IP evaluation across routing table prefixes (/0 default vs /16 vs /24 longest match) for deterministic interface forwarding.",
          "alt": "Longest Prefix Match LPM routing decision tree flowchart"
        },
        {
          "id": "fig_c02_m06_f2",
          "title": "Figure C02-M06-F2: Host Routing Decision Logic",
          "url": "/assets/courses/cyber-02/C02-M06-F2.png",
          "caption": "Figure C02-M06-F2: Algorithmic decision flowchart: how an operating system evaluates destination IP against local subnet mask to choose direct ARP delivery vs. default gateway forwarding.",
          "alt": "Operating system host routing decision tree flowchart"
        }
      ],
      "content": "## Gateways, Routing Tables & Longest Prefix Match\n\nWhile switches deliver frames within a single broadcast domain using MAC addresses, **Routers operate at Layer 3 (Network)**, forwarding packets across disparate networks using logical IP addresses.\n\n### 1. The Host Routing Decision\nWhen an operating system application generates an outbound IP packet, the TCP/IP stack executes an internal logical calculation:\n\n![C02-M06-F2: Host routing decision](/assets/courses/cyber-02/C02-M06-F2.png)\n\nAs diagrammed in **Figure C02-M06-F2**, the host compares the Destination IP with its own Local IP and Subnet Mask using bitwise binary AND logic:\n$$\\text{Local Network} = \\text{Local IP} \\land \\text{Subnet Mask}$$\n$$\\text{Target Network} = \\text{Destination IP} \\land \\text{Subnet Mask}$$\n\n1. **If $\\text{Local Network} = \\text{Target Network}$ (On-Link / Local Subnet):**\n   - The destination resides on the local link.\n   - The host queries its local ARP cache for the target's MAC address (or issues an ARP broadcast).\n   - The frame is encapsulated with the target's physical MAC address and transmitted directly.\n2. **If $\\text{Local Network} \\ne \\text{Target Network}$ (Remote Destination):**\n   - The destination resides outside the local subnet.\n   - The host looks up its **Default Gateway** (the local interface IP of the router/firewall).\n   - The host resolves the MAC address of the **Gateway**.\n   - The frame is addressed to the Gateway's MAC address, while the Layer 3 Destination IP remains the final remote host.\n\n### 2. The Architecture of a Routing Table\nEvery router, firewall, server, and workstation maintains an internal **Routing Table**. Each route entry contains:\n- **Destination Network Prefix:** The target CIDR network block (e.g. `172.31.20.0/24` or `0.0.0.0/0`).\n- **Next Hop Gateway:** The IP address of the adjacent router responsible for forwarding the packet further.\n- **Outbound Interface:** The physical or virtual NIC interface through which the packet must be transmitted.\n- **Metric / Administrative Distance:** Numerical cost or priority used to rank alternative paths.\n- **Route Type:** Directly connected (`C`), Static (`S`), or Dynamic (`O` for OSPF, `B` for BGP).\n\n### 3. The Longest Prefix Match Rule\nWhen a router evaluates an incoming packet against its routing table, multiple routes may match the destination IP. The router follows a universal, deterministic rule:\n\n> [!IMPORTANT]\n> **Longest Prefix Match Rule:** The router always selects the route with the **most specific subnet mask (the largest CIDR prefix number)**. A `/32` host route always beats a `/24`, which beats a `/16`, which beats the default route `/0`.\n\n![Figure C02-M06-D4: Longest Prefix Match (LPM) Routing Decision Tree](/assets/courses/cyber-02/c02_m6_l4_longest_prefix_match.jpg)\n\n*Figure C02-M06-D4: Algorithmic Longest Prefix Match (LPM) evaluation: Destination IP evaluation across routing table prefixes (/0 default vs /16 vs /24 longest match) for deterministic interface forwarding.*\n\nConsider a router with the following routing table receiving a packet destined for `172.31.20.10`:\n\n```\nRoute A: 0.0.0.0/0 via 198.51.100.1 (Default Route - Prefix length 0)\nRoute B: 172.31.0.0/16 via 10.0.0.2 (Supernet Route - Prefix length 16)\nRoute C: 172.31.20.0/24 via 10.1.1.254 (Subnet Route - Prefix length 24)\nRoute D: 172.31.20.10/32 via 10.2.2.5 (Host Route - Prefix length 32)\n```\n\n- All four routes match `172.31.20.10`.\n- **Selection:** The router selects **Route D (/32)** because 32 is the longest prefix. If Route D is deleted, the router selects **Route C (/24)**. The default route `0.0.0.0/0` matches all IPv4 addresses but is selected *only when no more specific match exists*.\n\n### 4. Telemetry: Reading Real Routing Tables\n#### Windows Operating System (PowerShell):\n```powershell\nPS C:\\> Get-NetRoute -AddressFamily IPv4 | Select-Object DestinationPrefix, NextHop, InterfaceAlias, RouteMetric\n\nDestinationPrefix NextHop      InterfaceAlias RouteMetric\n----------------- -------      -------------- -----------\n0.0.0.0/0         192.168.0.1  Wi-Fi                    0\n127.0.0.1/32      On-link      Loopback Pseudo-I       256\n192.168.0.0/24    On-link      Wi-Fi                   256\n192.168.0.105/32  On-link      Wi-Fi                   256\n255.255.255.255/32 On-link     Wi-Fi                   256\n\n\n#### Linux Enterprise Router (Course Routing Lab Container):\n\nbash\n# ip route show\ndefault via 172.31.20.1 dev eth1\n172.31.10.0/24 dev eth0 proto kernel scope link src 172.31.10.254\n172.31.20.0/24 dev eth1 proto kernel scope link src 172.31.20.254\n\n# Evaluating kernel route choice for destination 172.31.20.10:\n# ip route get 172.31.20.10\n172.31.20.10 via 172.31.10.254 dev eth0 src 172.31.10.50\n```\n\nNotice the Linux kernel output: `dev eth0 scope link` indicates a directly connected subnet where no next-hop IP is required, whereas remote subnets explicitly mandate `via 172.31.10.254`."
    },
    {
      "id": "les_c2_m6_l5",
      "title": "Static vs. Dynamic Routing Protocols: OSPF & BGP",
      "duration": "75 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d5",
          "title": "Figure C02-M06-D5: Dynamic Routing (OSPF Link-State vs. BGP Path-Vector)",
          "url": "/assets/courses/cyber-02/c02_m6_l5_ospf_vs_bgp_architecture.jpg",
          "caption": "Figure C02-M06-D5: Dynamic routing comparison: OSPF Intra-domain Dijkstra Link-State routing (Area 0 Backbone) vs. BGP Inter-domain Path-Vector route propagation and peering policies.",
          "alt": "Dynamic routing architecture comparing OSPF link state vs BGP path vector"
        },
        {
          "id": "fig_c02_m06_f3",
          "title": "Figure C02-M06-F3: The Routed Lab Topology",
          "url": "/assets/courses/cyber-02/C02-M06-F3.png",
          "caption": "Figure C02-M06-F3: Multi-subnet routed testbed architecture connecting staff workstations, server farms, and management enclaves across dual multi-homed Linux routers.",
          "alt": "Multi-subnet routed lab topology showing network interfaces and gateway IPs"
        }
      ],
      "content": "## Static vs. Dynamic Routing & Global Path Vector Protocols\n\nRouting architectures are bifurcated into **Static Routing** (manually programmed deterministic entries) and **Dynamic Routing Protocols** (autonomous software daemons that calculate paths across dynamic topologies).\n\n### 1. Static Routing Mechanics\n- **Characteristics:** Manually entered by the network administrator (`ip route 10.50.0.0 255.255.0.0 172.16.1.1`).\n- **Advantages:** Zero protocol bandwidth overhead, zero CPU consumption for path recalculation, absolute administrative predictability, high security (no protocol announcements to poison).\n- **Disadvantages:** Lacks automatic failover; if an intermediate fiber link is severed, static routes continue pointing traffic into the black hole until human engineers intervene. Impractical for networks with more than a dozen routers.\n\n### 2. Interior Gateway Protocols (IGP): OSPF\nUsed exclusively within an **Autonomous System (AS)** under a single administrative authority:\n\n- **Open Shortest Path First (OSPF, RFC 2328):**\n  - **Link-State Protocol:** Rather than sharing route tables with neighbors, every OSPF router floods **Link-State Advertisements (LSAs)** describing the status of its directly connected links.\n  - **Link-State Database (LSDB):** Every router in an OSPF area synchronizes an identical LSDB, maintaining a complete, mathematically verified map of the entire network topology.\n  - **Dijkstra SPF Algorithm:** Each router executes Dijkstra's Shortest Path First algorithm using itself as the root to compute the lowest-cost tree to every destination.\n  - **Metric:** Inverse bandwidth cost ($Cost = \\frac{10^8}{\\text{Bandwidth in bps}}$).\n  - **Area Hierarchy:** Organizes networks into a central **Backbone Area (Area 0)** and peripheral non-backbone areas to limit SPF calculation overhead.\n\n### 3. Exterior Gateway Protocols (EGP): BGP\nUsed across the global internet to interconnect distinct **Autonomous Systems (ASes)**:\n\n- **Border Gateway Protocol (BGP-4, RFC 4271):**\n  - **Path-Vector Protocol:** Routes are advertised as reachable IP prefixes associated with an ordered list of autonomous systems traversed: the **AS_PATH Attribute** (e.g. `AS_PATH: 3356 1299 15169`).\n  - **Loop Prevention:** If a router receives an advertisement containing its own AS number in the AS_PATH, it rejects the advertisement immediately.\n  - **Policy-Based Routing:** BGP does not select paths based on raw physical speed; it selects paths based on commercial relationships, transit costs, and administrative policies (Local Preference, AS_PATH length, MED).\n\n![Figure C02-M06-D5: Dynamic Routing (OSPF Link-State vs. BGP Path-Vector)](/assets/courses/cyber-02/c02_m6_l5_ospf_vs_bgp_architecture.jpg)\n\n*Figure C02-M06-D5: Dynamic routing comparison: OSPF Intra-domain Dijkstra Link-State routing (Area 0 Backbone) vs. BGP Inter-domain Path-Vector route propagation and peering policies.*\n\n### 4. Routing Protocol Security & BGP Hijacking Defenses\nBecause dynamic routing protocols modify core routing tables, they are prime targets for nation-state disruption:\n1. **Neighbor Authentication:** OSPF and BGP sessions must enforce cryptographic authentication using pre-shared HMAC keys (**BGP TCP-AO**, RFC 5925, or MD5) to prevent unauthorized rogue routers from injecting malicious routes.\n2. **Resource Public Key Infrastructure (RPKI, RFC 6811):** BGP lacks built-in origin validation. Under RPKI, Regional Internet Registries (RIRs) issue cryptographically signed **Route Origin Authorizations (ROAs)** binding an IP prefix to an authorized AS number. Internet routers perform **Route Origin Validation (ROV)**, automatically dropping unauthorized BGP announcements (as demonstrated in the YouTube hijack case study).\n\n![C02-M06-F3: The routed lab topology](/assets/courses/cyber-02/C02-M06-F3.png)\n\n**Figure C02-M06-F3** highlights the routed lab architecture: host routing tables, gateway interfaces, and hop-by-hop TTL decrement from 64 to 63 across Layer 3 boundaries."
    },
    {
      "id": "les_c2_m6_l6",
      "title": "Network Segmentation Frameworks & Incident Containment",
      "duration": "80 mins",
      "type": "reading",
      "images": [
        {
          "id": "img_c2_m6_d6",
          "title": "Figure C02-M06-D6: Cybersecurity Purdue Model & Multi-Tier Enterprise Segmentation",
          "url": "/assets/courses/cyber-02/c02_m6_l6_purdue_model_segmentation.jpg",
          "caption": "Figure C02-M06-D6: The Purdue Enterprise Reference Architecture (ISA-95/IEC 62443): Multi-tier enterprise isolation separating Cloud/Internet (Level 5) and Corporate IT (Level 4) from Industrial DMZ (Level 3.5), Operations SCADA (Level 3), and Field Controllers/PLCs (Level 2/1) via layered firewalls and unidirectional Default-Deny policies.",
          "alt": "Cybersecurity Purdue Model and multi-tier enterprise network segmentation diagram"
        }
      ],
      "content": "## Network Segmentation Frameworks, Purdue Model & Incident Containment\n\nNetwork segmentation is the architectural practice of partitioning an enterprise network into distinct logical zones, enforcing strict unidirectional access controls between them. Segmentation operationalizes the principle of **Least Privilege** across network communications, transforming a flat network into a compartmentalized fortress.\n\n### 1. Architectural Building Blocks of Segmentation\nRigorous segmentation combines multiple interlocking technical layers:\n1. **Physical Separation:** Dedicated network interface cards, cabling, and separate hardware appliances. Mandatory in high-security critical infrastructure (e.g. nuclear power plants, military avionics).\n2. **Logical Isolation (VLANs & Subnets):** Layer 2 802.1Q broadcast partitioning and distinct Layer 3 CIDR blocks.\n3. **Choke Points & Route Enforcement:** Ensuring all inter-zone packets must pass through an inspection firewall; eliminating rogue dual-homed machines that bypass perimeter enforcement.\n4. **Stateful Layer 4-7 Filtering:** Next-Generation Firewalls (NGFWs) inspecting Layer 4 ports and Layer 7 application protocols.\n5. **Micro-Segmentation:** Host-level software agents (e.g., eBPF or Windows Filtering Platform) enforcing granular rules per container, VM, or process.\n\n### 2. The Purdue Enterprise Reference Architecture (OT/ICS)\nIn Industrial Control Systems (ICS) and Operational Technology (OT), segmentation is governed by the **Purdue Model (ISA-95 / IEC 62443)**:\n\n![Figure C02-M06-D6: Cybersecurity Purdue Model & Multi-Tier Enterprise Segmentation](/assets/courses/cyber-02/c02_m6_l6_purdue_model_segmentation.jpg)\n\n*Figure C02-M06-D6: The Purdue Enterprise Reference Architecture (ISA-95/IEC 62443) – Multi-tier enterprise isolation separating Cloud/Internet (Level 5) and Corporate IT (Level 4) from Industrial DMZ (Level 3.5), Operations SCADA (Level 3), and Field Controllers/PLCs (Level 2/1) via layered firewalls and unidirectional Default-Deny policies.*\n\n- **Level 3.5 Industrial DMZ (IDMZ):** No direct network path is permitted between Level 4 (Corporate IT) and Level 3 (Industrial Operations). All communication terminates in the IDMZ using intermediate jump hosts, patch mirrors, and update repositories.\n- **Firewall Policy Matrix:** Each boundary layer enforces an explicit unidirectional Default Deny policy, permitting only authenticated operational protocols (e.g. Modbus, DNP3, OPC-UA) between authorized endpoints.\n\n### 3. Constructing an Enterprise Flow Matrix\nA secure network design requires an explicit **Flow Matrix** documenting authorized inter-zone communication. Anything not explicitly permitted is blocked by a global **Default Deny**:\n\n| Ingress / Egress | Authorized Inter-Zone Flows (Default Deny Everything Else) |\n| :--- | :--- |\n| **Staff -> Servers** | Permit TCP 443 (HTTPS Web Apps), TCP 445 (File Shares). |\n| **Servers -> Staff** | **DENY ALL** (Servers never initiate connections to workstations). |\n| **CCTV -> Servers** | Permit TCP 554 (RTSP Stream to NVR Recorder only). |\n| **Guests -> Any** | **DENY ALL** (Permit egress to Internet Gateway only). |\n| **Mgmt -> All** | Permit TCP 22 (SSH), TCP 3389 (RDP) from Jump Box with MFA. |\n\n### 4. Real-World Case Studies\n\n#### Case Study 1: YouTube BGP Route Hijack (24 February 2008)\n- **The Incident:** Pakistan Telecom (AS17557) was ordered to block YouTube domestically. Engineers configured an internal BGP announcement for `208.65.153.0/24`.\n- **The Flaw:** PCCW Global (upstream transit provider) accidentally propagated this announcement to the global internet without route filtering.\n- **The Failure Mode:** YouTube officially advertised `208.65.152.0/22`. Because `/24` has a longer prefix length than `/22`, global ISP routers worldwide applied the **Longest Prefix Match Rule** and routed all global YouTube traffic directly to Pakistan Telecom, knocking YouTube offline globally.\n- **Remediation:** Upstream ISPs must enforce prefix limits and validate route announcements using RPKI Route Origin Validation.\n\n#### Case Study 2: Meta / Facebook Global Backbone Outage (4 October 2021)\n- **The Incident:** During routine maintenance of Facebook's global backbone network, a misconfigured maintenance command disconnected all data centers.\n- **The Catastrophe:** Meta's authoritative DNS servers, engineered to withdraw their BGP route advertisements if they lose connectivity to back-end databases, withdrew their IP routes. The global internet could no longer resolve `facebook.com`, `instagram.com`, or `whatsapp.com`.\n- **Compounding Failure:** Because DNS was down, internal employee authentication, badge readers, and ticketing systems failed, physically locking engineers out of server rooms and preventing remote remediation.\n\n### 5. Practical Hands-On Labs\n\n#### Practical 1: Running the Docker Routed Lab\n- **Objective:** Deploy a multi-subnet container environment (`rk-staff: 172.31.10.0/24` and `rk-servers: 172.31.20.0/24`), inspect kernel routing tables, and verify the hop-by-hop TTL decrement from 64 to 63 using `traceroute` and `ping`.\n- **Execution Script:** `LAB_ASSETS/C02/rk_c02_routing_lab.sh`\n\n#### Practical 2: Designing an Industrial Flow Matrix\n- **Objective:** Model an enterprise segmentation policy separating Corporate IT, DMZ, OT Level 3, and Guest Wi-Fi, producing an auditable Layer 4 firewall access control list based on least privilege."
    }
  ],
  "quiz": {
    "id": "quiz_mod_c2_6",
    "title": "Module 6 Assessment: Routing, Switching & Network Segmentation",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c2_m6_001",
        "question": "How does a Layer 2 switch dynamically populate its MAC address table (CAM table)?",
        "options": [
          "By inspecting the Source MAC address of every incoming frame and recording it alongside the ingress physical port.",
          "By querying a centralized Active Directory domain controller via LDAP over port 389.",
          "By inspecting the Destination IP address in the Layer 3 packet header.",
          "By broadcasting periodic SNMP discovery requests to all connected endpoints."
        ],
        "correct_index": 0,
        "explanation": "A switch learns dynamically by examining the Source MAC address of ingress frames. It associates that MAC with the physical port on which the frame arrived and starts an ageing timer."
      },
      {
        "id": "q_c2_m6_002",
        "question": "What action does a switch take when it receives a frame with an \"Unknown Unicast\" destination MAC address?",
        "options": [
          "It floods the frame out of all active ports within the same VLAN, except the port on which the frame arrived.",
          "It drops the frame immediately and sends an ICMP Destination Unreachable packet.",
          "It buffers the frame permanently in RAM until the network administrator logs in.",
          "It forwards the frame exclusively to the switch's default gateway router."
        ],
        "correct_index": 0,
        "explanation": "If the destination unicast MAC is not yet learned in the CAM table, the switch must ensure delivery by flooding the frame across all ports belonging to that VLAN, excluding the ingress port."
      },
      {
        "id": "q_c2_m6_003",
        "question": "What is the fundamental difference between a collision domain and a broadcast domain in switched Ethernet networks?",
        "options": [
          "Each full-duplex switch port is an isolated collision domain, whereas an entire switch (or VLAN) forms a single broadcast domain.",
          "Collision domains operate at Layer 3, while broadcast domains operate at Layer 1.",
          "A broadcast domain is limited to a single physical copper wire, whereas collision domains span entire autonomous systems.",
          "Switches eliminate broadcast domains, leaving only collision domains active."
        ],
        "correct_index": 0,
        "explanation": "In modern switched Ethernet operating in full duplex, each switch port is an independent collision domain (collisions are physically impossible). A broadcast domain encompasses all devices that receive a broadcast frame (FF:FF:FF:FF:FF:FF), which is bounded by VLANs and routers."
      },
      {
        "id": "q_c2_m6_004",
        "question": "What network catastrophe occurs when redundant physical Ethernet links connect switches without Spanning Tree Protocol (STP)?",
        "options": [
          "A broadcast storm where broadcast frames circulate endlessly in loops, saturating bandwidth and crashing switch CPUs within seconds.",
          "All switch ports permanently down-negotiate their link speed to 10 Mbps half-duplex.",
          "The switches initiate an automated cryptographic wipe of their firmware flash storage.",
          "The DHCP server address pool becomes permanently corrupted."
        ],
        "correct_index": 0,
        "explanation": "Without STP, redundant links cause endless Layer 2 loops. Because Ethernet headers have no TTL field to discard aged frames, broadcast frames amplify exponentially, creating a broadcast storm that overwhelms switch CPUs and links."
      },
      {
        "id": "q_c2_m6_005",
        "question": "What criterion does the Spanning Tree Protocol (IEEE 802.1D) use to elect the Root Bridge of a switched network?",
        "options": [
          "The switch with the lowest Bridge ID (Priority value concatenated with the lowest MAC address).",
          "The switch with the highest IP address configured on its management interface.",
          "The switch possessing the greatest number of 100-Gigabit fiber optic ports.",
          "The switch that has been continuously running with the longest operational uptime."
        ],
        "correct_index": 0,
        "explanation": "The Root Bridge election is won by the switch with the lowest Bridge ID. Bridge ID consists of a configurable priority (default 32768) plus the system MAC address."
      },
      {
        "id": "q_c2_m6_006",
        "question": "Why should security engineers enable BPDU Guard on all user-facing access switch ports?",
        "options": [
          "To immediately disable (err-disable) an access port if an unauthorized switch or rogue STP packet is connected, preventing spanning-tree hijacking.",
          "To encrypt all user web browsing traffic using AES-256-GCM.",
          "To prevent users from modifying their workstation IP addresses.",
          "To throttle file download speeds during peak business hours."
        ],
        "correct_index": 0,
        "explanation": "If an unauthorized switch or attacker sends BPDUs on an access port, they could hijack the Root Bridge role or trigger topology recalculations. BPDU Guard protects the topology by shutting down any edge port that receives a BPDU."
      },
      {
        "id": "q_c2_m6_007",
        "question": "What is the standard ageing timer for an inactive entry in a typical enterprise switch MAC address table?",
        "options": [
          "300 seconds (5 minutes)",
          "15 seconds",
          "86,400 seconds (24 hours)",
          "1 second"
        ],
        "correct_index": 0,
        "explanation": "Most managed switches default to a 300-second (5-minute) ageing timer. If no frames are seen from a MAC address within this window, the entry is aged out to keep the table fresh and accommodate physical moves."
      },
      {
        "id": "q_c2_m6_008",
        "question": "What switch feature copies traffic from specific ports or VLANs to a dedicated monitoring interface for packet capture with Wireshark or an IDS?",
        "options": [
          "Port Mirroring / SPAN (Switched Port Analyzer)",
          "Dynamic Trunking Protocol (DTP)",
          "IGMP Snooping",
          "Equal-Cost Multi-Path (ECMP)"
        ],
        "correct_index": 0,
        "explanation": "Port Mirroring (known on Cisco switches as SPAN) replicates traffic crossing designated source ports or VLANs and sends it out a destination monitoring port where an IDS, packet sniffer, or Wireshark station is attached."
      },
      {
        "id": "q_c2_m6_009",
        "question": "What is the primary operational difference between a switch access port and a trunk port?",
        "options": [
          "An access port carries traffic for exactly one VLAN (untagged); a trunk port multiplexes traffic for multiple VLANs using 802.1Q tags.",
          "An access port connects only to routers, while a trunk port connects only to desktop computers.",
          "An access port requires fiber optic transceivers, while a trunk port uses twisted-pair copper.",
          "An access port runs at Layer 3, whereas a trunk port runs at Layer 1."
        ],
        "correct_index": 0,
        "explanation": "Access ports connect to end-user devices (PCs, printers) and carry frames for a single VLAN without tags. Trunk ports interconnect switches, routers, or hypervisors, carrying multiple VLANs across a single physical link with 802.1Q encapsulation."
      },
      {
        "id": "q_c2_m6_010",
        "question": "How many bytes does the IEEE 802.1Q tag add to an Ethernet frame header?",
        "options": [
          "4 bytes (32 bits)",
          "8 bytes (64 bits)",
          "2 bytes (16 bits)",
          "20 bytes (160 bits)"
        ],
        "correct_index": 0,
        "explanation": "The IEEE 802.1Q tag inserts exactly 4 bytes into the Ethernet frame header between the Source MAC address and the EtherType field."
      },
      {
        "id": "q_c2_m6_101",
        "question": "[Global BGP Incident 1] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_102",
        "question": "[Global BGP Incident 2] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_103",
        "question": "[Global BGP Incident 3] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_104",
        "question": "[Global BGP Incident 4] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_105",
        "question": "[Global BGP Incident 5] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_106",
        "question": "[Global BGP Incident 6] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_107",
        "question": "[Global BGP Incident 7] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_108",
        "question": "[Global BGP Incident 8] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_109",
        "question": "[Global BGP Incident 9] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      },
      {
        "id": "q_c2_m6_110",
        "question": "[Global BGP Incident 10] On 24 February 2008, YouTube (AS36561) officially advertised its authoritative prefix 208.65.152.0/22 to the global internet. Pakistan Telecom (AS17557) attempted to block YouTube domestically by injecting an announcement for 208.65.153.0/24 into its internal routers, but its upstream transit provider PCCW Global (AS3491) leaked the announcement to global BGP peers. Within minutes, global YouTube traffic was sucked into Pakistan Telecom and dropped. What exact technical mechanism caused global tier-1 internet routers to prefer Pakistan Telecom's route over YouTube's legitimate advertisement?",
        "options": [
          "The Longest Prefix Match rule: The /24 announced by Pakistan Telecom had a longer prefix length (more specific subnet mask) than YouTube's /22, so all BGP routers deterministically routed traffic to the /24 regardless of AS path length.",
          "Pakistan Telecom negotiated a lower BGP Local Preference value across tier-1 transit backbones.",
          "YouTube's authoritative DNS servers suffered a distributed denial of service attack on UDP port 53.",
          "The BGP peering session between YouTube and PCCW Global was terminated by an unauthenticated TCP RST packet."
        ],
        "correct_index": 0,
        "explanation": "The /24 prefix has 24 matching network bits, whereas YouTube's /22 has only 22 bits. Under the universal Longest Prefix Match rule, routers must select the most specific matching route. Because a /24 is more specific than a /22, global routers directed all traffic destined for 208.65.153.0/24 to Pakistan Telecom."
      }
    ]
  }
};
