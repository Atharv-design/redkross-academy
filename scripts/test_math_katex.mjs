import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const testMarkdown = `
# KaTeX Math Demonstration

Here is an inline equation: $n_1 > n_2$ and another: $E = mc^2$.
Here is an arithmetic expression: $1 + 80 = 81$.
Here is Shannon capacity: $C = B \\log_2(1 + \\text{SNR})$.

:::math-steps Frame 13 Protocol Data Unit (PDU) Encapsulation Breakdown
Step 01: Layer 2 Ethernet II Frame Framing Header
$$\\text{Ethernet II Header} = 14 \\text{ bytes}$$
*Result: 6B Dst MAC + 6B Src MAC + 2B EtherType (0x0800)*

Step 02: Layer 3 Internet Protocol Version 4 (IPv4) Packet Header
$$\\text{IPv4 Header (IHL=5)} = 5 \\times 4 = 20 \\text{ bytes}$$
*Result: Total Length field = 0x0084 (132 bytes)*

Step 03: Layer 4 Transmission Control Protocol (TCP) Segment Header
$$\\text{TCP Header (Offset=8)} = 8 \\times 4 = 32 \\text{ bytes}$$
*Result: 20B Base + 12B TCP Options (Timestamps + NOPs)*

Step 04: Layer 7 Hypertext Transfer Protocol (HTTP) Application Payload
$$\\text{HTTP Request Data} = 80 \\text{ bytes}$$
*Result: Exact ASCII byte stream for GET / HTTP/1.1 request*

Step 05: Aggregate Captured Wire Frame Verification
$$\\text{Total Frame Length} = 14 + 20 + 32 + 80 = \\mathbf{146 \\text{ bytes}}$$
*Result: Matches capture metadata 0x0092 in rk_c02_lab.pcap*

Step 06: TCP Sequence & Acknowledgement Relative Stream Tracking
$$\\text{Next Expected Ack} = \\text{Client Seq} + \\text{Payload Bytes} = 1 + 80 = \\mathbf{81}$$
*Result: Server Frame 14 Ack=81 confirms receipt of all 80 bytes*
:::
`;

const output = renderMarkdownToHtml(testMarkdown);
console.log('=== TEST RESULT ===');
console.log('Contains KaTeX rendered HTML:', output.includes('class="katex"'));
console.log('Contains Math Steps container:', output.includes('Sequential Technical Calculation') || output.includes('KaTeX Verified'));
console.log('Contains Step 01:', output.includes('Step 01'));
console.log('Contains Step 06:', output.includes('Step 06'));
console.log('No raw LaTeX tags leaked:', !output.includes('\\text') && !output.includes('\\mathbf') && !output.includes('\\times'));
console.log('Sample Rendered Output (first 600 chars):\n', output.substring(0, 600));
