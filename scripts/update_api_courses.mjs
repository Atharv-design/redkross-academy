import fs from 'fs';

const file = 'api/courses.js';
let content = fs.readFileSync(file, 'utf8');

const target = `    if (!activeCourses.some(c => c.id === 'crs_cyber_net_02' || c.slug === 'computer-networking-for-cybersecurity')) {
      activeCourses.push({
        id: 'crs_cyber_net_02',
        slug: 'computer-networking-for-cybersecurity',
        title: 'Computer Networking for Cybersecurity',
        version: '1.0',
        category: 'Network Defense & Infrastructure',
        difficulty: 'Beginner',
        price: 0,
        cert_price: 0,
        estimated_duration: '10 Weeks',
        rating: 4.97,
        enrolled_count: 980,
        overview: 'The definitive architectural bridge between computer networking fundamentals and adversarial cyber defense. Master physical and logical network models, Ethernet framing and CAM learning, binary IPv4 and IPv6 subnetting, transport-layer TCP state tracking, core infrastructure protocols (DNS, DHCP, NAT, TLS 1.3), stateful firewall engineering, and ground-truth Wireshark packet capture analysis.',
        lead_author: {
          name: 'RedKross Network Defense Faculty',
          title: 'Network Security Architecture & Infrastructure Operations',
          role: 'Director of Network Engineering, RedKross Research Foundation'
        },
        total_tokens_reward: 1600,
        card_variant: 'variant-03',
        created_at: new Date().toISOString()
      });
    }`;

const replacement = `    if (!activeCourses.some(c => c.id === 'crs_cyber_net_02' || c.slug === 'computer-networking-for-cybersecurity')) {
      activeCourses.push({
        id: 'crs_cyber_net_02',
        slug: 'computer-networking-for-cybersecurity',
        title: 'Computer Networking for Cybersecurity',
        version: '1.0',
        category: 'Network Defense & Infrastructure',
        difficulty: 'Beginner',
        price: 0,
        cert_price: 0,
        estimated_duration: '10 Weeks',
        estimated_weeks: 10,
        total_hours: 86,
        rating: 4.98,
        enrolled_count: 1840,
        milestone_cert: 'Certified Network Defense Associate (CNDA)',
        short_desc: 'The definitive architectural bridge between computer networking fundamentals and adversarial cyber defense. Master physical and logical network models, Ethernet framing, binary IPv4 & IPv6 subnetting, TCP state tracking, core protocols (DNS, DHCP, TLS 1.3), stateful firewalls, and Wireshark packet capture analysis.',
        overview: 'Almost every attack and almost every defence happens on a network. Phishing email crosses mail servers; ransomware spreads over file-sharing protocols; attackers malware phones home through DNS and HTTPS; defenders watch packets, flows and logs to catch them. You cannot investigate an alert, write a firewall rule, read a penetration test report or design a cloud network without understanding how data actually moves. Master physical and logical network models, Ethernet framing, binary IPv4/IPv6 subnetting, transport TCP state tracking, core protocols (DNS, DHCP, NAT, TLS 1.3), stateful firewall engineering, and Wireshark packet capture analysis.',
        skills: [
          'Wireshark & TShark Packet Dissection',
          'TCP 3-Way Handshake & State Tracking',
          'Binary IPv4 Subnetting & VLSM Design',
          'IPv6 SLAAC & Scoped Addressing',
          'DNS Resolution & Cache Poisoning Defense',
          'DHCP Snooping & Dynamic ARP Inspection',
          'NAT/PAT Overload & Conntrack State Tables',
          'HTTP/HTTPS Semantics & TLS 1.3 Handshake',
          'Layer 2 Switching, CAM Tables & 802.1Q VLANs',
          'Stateful Linux Firewalls & ACL Rule Design',
          'Wireless Security: WPA3 SAE & 802.1X',
          'Incident Triage & Forensic Network Reports'
        ],
        lead_author: {
          name: 'RedKross Network Defense Faculty',
          title: 'Network Security Architecture & Infrastructure Operations',
          role: 'Director of Network Engineering, RedKross Research Foundation',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
        },
        total_tokens_reward: 1800,
        card_variant: 'variant-03',
        created_at: new Date().toISOString()
      });
    }`;

content = content.replace(/\r\n/g, '\n');
if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully updated api/courses.js');
} else {
  console.error('Target not found in api/courses.js');
}
