/**
 * RedKross Academy - Course 02 Master Specification
 * Course Title: Computer Networking for Cybersecurity
 * Source Authority: RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_02_Computer_Networking_for_Cybersecurity.txt
 * Modular architecture: Modules 1 to 8 assembled cleanly from ./modules/
 */

import { module1Data } from './modules/module1.js';
import { module2Data } from './modules/module2.js';
import { module3Data } from './modules/module3.js';
import { module4Data } from './modules/module4.js';
import { module5Data } from './modules/module5.js';
import { module6Data } from './modules/module6.js';
import { module7Data } from './modules/module7.js';
import { module8Data } from './modules/module8.js';

export const course02Data = {
  id: "crs_cyber_net_02",
  division: "cybersecurity",
  slug: "computer-networking-for-cybersecurity",
  title: "Computer Networking for Cybersecurity",
  course_number: "Course 02 of 22",
  version: "1.0",
  category: "Network Defense & Infrastructure",
  difficulty: "Beginner",
  price: 0,
  cert_price: 0,
  estimated_duration: "10 Weeks",
  estimated_weeks: 10,
  total_hours: 86,
  hours_breakdown: {
    module_study: 56,
    practicals_and_challenges: 18,
    course_assessment: 2,
    capstone_report: 10
  },
  courses_count: 1,
  effort: "6–8 Hours per Week",
  access: "Free Institutional Access",
  rating: 4.98,
  enrolled_count: 1840,
  card_variant: "variant-03",
  short_desc: "The definitive architectural bridge between computer networking fundamentals and adversarial cyber defense. Master physical and logical network models, Ethernet framing, binary IPv4 & IPv6 subnetting, TCP state tracking, core protocols (DNS, DHCP, TLS 1.3), stateful firewalls, and Wireshark packet capture analysis.",
  
  skills: [
    "Wireshark & TShark Packet Dissection",
    "TCP 3-Way Handshake & State Tracking",
    "Binary IPv4 Subnetting & VLSM Design",
    "IPv6 SLAAC & Scoped Addressing",
    "DNS Resolution & Cache Poisoning Defense",
    "DHCP Snooping & Dynamic ARP Inspection",
    "NAT/PAT Overload & Conntrack State Tables",
    "HTTP/HTTPS Semantics & TLS 1.3 Handshake",
    "Layer 2 Switching, CAM Tables & 802.1Q VLANs",
    "Stateful Linux Firewalls & ACL Rule Design",
    "Wireless Security: WPA3 SAE & 802.1X",
    "Incident Triage & Forensic Network Reports"
  ],

  milestone_cert: "Certified Network Defense Associate (CNDA)",
  
  lead_author: {
    name: "RedKross Network Defense Faculty",
    title: "Network Security Architecture & Infrastructure Operations",
    role: "Director of Network Engineering, RedKross Research Foundation",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  },

  overview: "Almost every attack and almost every defence happens on a network. Phishing email crosses mail servers; ransomware spreads over file-sharing protocols; attackers' malware 'phones home' through DNS and HTTPS; defenders watch packets, flows and logs to catch them. You cannot investigate an alert, write a firewall rule, read a penetration test report or design a cloud network without understanding how data actually moves. This course teaches networking from first principles with a strict cybersecurity lens: physical and logical topologies, the OSI and TCP/IP reference models, binary IPv4 and IPv6 subnetting, transport protocols (TCP/UDP/ICMP/ARP), core services (DNS, DHCP, NAT, TLS 1.3), switching and VLAN segmentation, perimeter firewalls and VPNs, and packet analysis with Wireshark and tshark.",

  why_it_matters: [
    "Security Operations: Alerts are about connections, ports, domains, and IP addresses. Analysts must read packet traces fluently.",
    "Penetration Testing: Network reconnaissance, port scanning, and service enumeration are fundamental adversary activities.",
    "Engineering & Architecture: Micro-segmentation, stateful firewalls, and zero-trust boundaries are network architectures.",
    "Forensics & Incident Response: Packet captures (PCAP) and flow records represent ground-truth digital evidence.",
    "Cloud Security: Cloud VPCs, security groups, peering connections, and routing tables mirror physical networking in software."
  ],

  intended_audience: [
    "Learners who completed Course 01 (Introduction to Cybersecurity) or have equivalent foundational security vocabulary.",
    "IT support staff, system administrators, and software developers seeking a rigorous, security-focused networking foundation.",
    "Aspiring SOC analysts, incident responders, and network security engineers preparing for advanced defensive certifications."
  ],

  prerequisites: [
    "Course 01 (Introduction to Cybersecurity) recommended, or equivalent foundational IT literacy.",
    "Comfort using a command line (Windows PowerShell or Linux/macOS terminal). Every command is explained step-by-step.",
    "Basic arithmetic. Binary numbers, powers of two, and bitwise logic are taught from scratch in Module 3."
  ],

  required_software_hardware: [
    "Computer with 8 GB RAM (16 GB recommended for containerized network topologies).",
    "Windows 10/11, macOS, or mainstream Linux distribution.",
    "Wireshark (current stable release from wireshark.org) or TShark 4.2.5+ for viewing and filtering packet captures.",
    "Docker Desktop or Docker Engine (v29.4+) for isolated network lab scenarios.",
    "Python 3.10+ for automated subnet calculations and script-driven packet parsing."
  ],

  what_you_will_learn: [
    "Dissect packet propagation across the OSI 7-layer and TCP/IP 4-layer reference architectures.",
    "Perform binary and hexadecimal IP address calculations, VLSM subnetting, and IPv6 address compaction.",
    "Analyze Layer 2 switching mechanics, CAM table exhaustion, and 802.1Q trunking vulnerabilities.",
    "Inspect TCP connection establishment, sequence/acknowledgment numbers, and UDP stateless mechanics.",
    "Examine core infrastructure services: DNS hierarchy, DHCP DORA cycles, NAT/PAT translation, and TLS 1.3 handshakes.",
    "Configure stateful Linux iptables/nftables firewall policies and analyze network traffic using Wireshark and tshark."
  ],

  learning_objectives: [
    "LO1: Describe network types, topologies, media, and device roles, explaining their security implications and attack surfaces.",
    "LO2: Trace encapsulation and decapsulation of application messages across the OSI 7-layer and TCP/IP 4-layer models.",
    "LO3: Calculate IPv4 subnets using CIDR bitwise arithmetic and identify IPv6 address types, scopes, and SLAAC mechanics.",
    "LO4: Explain the operation of TCP, UDP, ICMP, and ARP, identify common ports, and dissect attacks against each protocol.",
    "LO5: Dissect DNS resolution, DHCP DORA cycles, NAT/PAT state tables, and TLS 1.3 cryptographic handshakes.",
    "LO6: Explain switching, VLANs, routing tables, and default gateways, and design defensible network segmentation.",
    "LO7: Explain stateful firewalls, ACLs, forward/reverse proxies, VPN tunnels, and Wi-Fi security (WPA3 Enterprise).",
    "LO8: Capture and inspect live traffic using Wireshark display filters and author a professional network incident report."
  ],

  nice_framework_alignment: [
    "Implementation & Operation: Network Operations Specialist, Systems Administration",
    "Protection & Defense: Defensive Cybersecurity Analyst, Incident Response, Vulnerability Analyst",
    "Design & Development: Cybersecurity Architect, Secure Network Engineer",
    "Investigation: Digital Forensics & Network Evidence Analyst"
  ],

  completion_requirements: [
    "Pass each of the 8 module assessments with a minimum score of 70%.",
    "Complete hands-on guided practicals with documented evidence (screenshots, command outputs, or filter traces).",
    "Pass the Course 02 Comprehensive Final Assessment (50 MCQs) with a minimum score of 70%.",
    "Submit the Capstone Network Incident & Hardening Report achieving 'Competent' across all rubric criteria."
  ],

  total_tokens_reward: 1800,

  final_assessment: {
    id: "exam_cyber_net_final",
    title: "Certified Network Defense Associate (CNDA) Comprehensive Evaluation",
    credential_title: "Certified Network Defense Associate (CNDA)",
    time_limit_minutes: 60,
    passing_score: 80,
    total_questions: 50,
    proctored: true
  },

  modules: [
    module1Data,
    module2Data,
    module3Data,
    module4Data,
    module5Data,
    module6Data,
    module7Data,
    module8Data
  ]
};

export default course02Data;
