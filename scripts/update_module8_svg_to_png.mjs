import fs from 'fs';

const filePath = 'src/services/db/course02/modules/module8.js';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Replace C02-M08-F1.svg with C02-M08-F1.png and add fig_c02_m08_f1 to images if needed
content = content.replace(
  /\/assets\/courses\/cyber-02\/C02-M08-F1\.svg/g,
  '/assets/courses/cyber-02/C02-M08-F1.png'
);

// Add to Lesson 8.1 images array
content = content.replace(
  /"id": "les_c2_m8_l1"[\s\S]*?"images": \[\s*\{[\s\S]*?"id": "img_c2_m8_d1"[\s\S]*?\}\s*\]/,
  (match) => {
    if (match.includes('fig_c02_m08_f1')) return match;
    return match.replace(
      /\}\s*\]/,
      `},\n        {\n          id: "fig_c02_m08_f1",\n          title: "Figure C02-M08-F1: Where Packets Can Be Captured",\n          url: "/assets/courses/cyber-02/C02-M08-F1.png",\n          caption: "Figure C02-M08-F1: Architectural vantage points for packet capture: local host endpoint, switch mirror port (SPAN), and in-line physical network TAP.",\n          alt: "Where packets can be captured in enterprise networks diagram"\n        }\n      ]`
    );
  }
);

// 2. Add C02-M08-F2.png to Lesson 8.2 images and content
content = content.replace(
  /"id": "les_c2_m8_l2"[\s\S]*?"images": \[\s*\{[\s\S]*?"id": "img_c2_m8_d2"[\s\S]*?\}\s*\]/,
  (match) => {
    if (match.includes('fig_c02_m08_f2')) return match;
    return match.replace(
      /\}\s*\]/,
      `},\n        {\n          id: "fig_c02_m08_f2",\n          title: "Figure C02-M08-F2: Capture Filter vs. Display Filter Pipeline",\n          url: "/assets/courses/cyber-02/C02-M08-F2.png",\n          caption: "Figure C02-M08-F2: Dual-stage packet filtering: Kernel-level BPF capture filters decide what is saved to disk; user-level display filters decide what is shown without altering the capture.",\n          alt: "Capture filter versus display filter pipeline diagram"\n        }\n      ]`
    );
  }
);

// In Lesson 8.2 content, add Figure C02-M08-F2 under Section 2
content = content.replace(
  /### 2\. Berkeley Packet Filter \(BPF\) Syntax Primitives/,
  `![Figure C02-M08-F2: Capture Filter vs. Display Filter Pipeline](/assets/courses/cyber-02/C02-M08-F2.png)\n\n*Figure C02-M08-F2: Dual-Stage Architecture – BPF capture filters decide what is written to the capture file; display filters decide what packets are visualized.*\n\n### 2. Berkeley Packet Filter (BPF) Syntax Primitives`
);

// 3. Replace C02-M08-F3.svg with C02-M08-F3.png and add fig_c02_m08_f3 to images if needed
content = content.replace(
  /\/assets\/courses\/cyber-02\/C02-M08-F3\.svg/g,
  '/assets/courses/cyber-02/C02-M08-F3.png'
);

// Add to Lesson 8.5 images array
content = content.replace(
  /"id": "les_c2_m8_l5"[\s\S]*?"images": \[\s*\{[\s\S]*?"id": "img_c2_m8_d4"[\s\S]*?\}\s*\]/,
  (match) => {
    if (match.includes('fig_c02_m08_f3')) return match;
    return match.replace(
      /\}\s*\]/,
      `},\n        {\n          id: "fig_c02_m08_f3",\n          title: "Figure C02-M08-F3: Connection Outcomes on the Wire",\n          url: "/assets/courses/cyber-02/C02-M08-F3.png",\n          caption: "Figure C02-M08-F3: Ground-truth connection outcomes on the wire: Successful TCP 3-way handshake, silent timeout due to firewall drop, instant TCP reset refusal, and DNS NXDOMAIN.",\n          alt: "Connection failure wire telemetry outcomes diagram"\n        }\n      ]`
    );
  }
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully replaced all SVG references with high-res PNG diagrams in module8.js!');
