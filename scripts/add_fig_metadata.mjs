import fs from 'fs';

const filePath = 'src/services/db/course02/modules/module8.js';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Lesson 8.1
content = content.replace(
  /"id": "img_c2_m8_d1"[\s\S]*?"alt": "Network monitoring hardware TAP vs switch SPAN port mirroring diagram"\s*\}\s*\]/,
  `"id": "img_c2_m8_d1",
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
      ]`
);

// 2. Lesson 8.2
content = content.replace(
  /"id": "img_c2_m8_d2"[\s\S]*?"alt": "BPF capture filter vs Wireshark display filter packet inspection pipeline diagram"\s*\}\s*\]/,
  `"id": "img_c2_m8_d2",
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
      ]`
);

// 3. Lesson 8.5
content = content.replace(
  /"id": "img_c2_m8_d4"[\s\S]*?"alt": "TCP connection failure packet waterfall triage diagram"\s*\}\s*\]/,
  `"id": "img_c2_m8_d4",
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
      ]`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully added figure metadata to module8.js');
