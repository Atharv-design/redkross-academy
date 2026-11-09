export function convertBoxTableToHtml(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  let title = '';
  const rows = [];
  
  for (let line of lines) {
    if (!line.includes('│') && !line.includes('┌') && !line.includes('├') && !line.includes('└')) {
      if (!title) title = line.trim();
      continue;
    }
    if (line.includes('┌') || line.includes('├') || line.includes('└') || /^[─┬┼┴\s]+$/.test(line)) {
      continue;
    }
    if (line.includes('│')) {
      const cells = line.split('│').slice(1, -1).map(c => c.trim());
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
  }

  if (rows.length < 2) return null;

  const header = rows[0];
  const body = rows.slice(1);

  const thead = `<thead class="bg-[#120E09] border-b border-[#FF7A00]/30">
    <tr>${header.map(col => `<th class="py-2.5 px-3.5 text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider">${col}</th>`).join('')}</tr>
  </thead>`;

  const tbody = `<tbody>${body.map((row, rIdx) => {
    const isAlt = rIdx % 2 === 1;
    return `<tr class="border-b border-[#FF7A00]/10 ${isAlt ? 'bg-[#0E0B07]' : 'bg-[#070A0F]'} hover:bg-[#1A1208]/70 transition-colors">
      ${row.map(c => `<td class="py-2.5 px-3.5 text-sm font-lora text-[#E2D9CE] leading-relaxed">${c}</td>`).join('')}
    </tr>`;
  }).join('\n')}</tbody>`;

  const captionHtml = title ? `<div class="px-3.5 py-1.5 bg-[#120E09] border-b border-[#FF7A00]/25 text-xs font-mono font-bold text-[#FFA439]">${title}</div>` : '';

  return `<div class="my-5 overflow-x-auto rounded-xl border border-[#FF7A00]/25 shadow-md">${captionHtml}<table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`;
}

const sample = `RFC 1122 TCP/IP 4-LAYER SUITE
┌─────────────────────────┬─────────────────────────────────────────────────┐
│ TCP/IP LAYER            │ PROTOCOL EXAMPLES                               │
├─────────────────────────┼─────────────────────────────────────────────────┤
│ 4. APPLICATION          │ HTTP, DNS, SMTP, SSH, TLS, NTP, DHCP, BGP       │
├─────────────────────────┼─────────────────────────────────────────────────┤
│ 3. TRANSPORT            │ TCP (RFC 9293), UDP (RFC 768), QUIC (RFC 9000)  │
├─────────────────────────┼─────────────────────────────────────────────────┤
│ 2. INTERNET             │ IPv4 (RFC 791), IPv6 (RFC 8200), ICMP, IPsec    │
├─────────────────────────┼─────────────────────────────────────────────────┤
│ 1. LINK (NETWORK ACCESS)│ Ethernet (802.3), Wi-Fi (802.11), ARP, Hardware │
└─────────────────────────┴─────────────────────────────────────────────────┘`;

console.log('Result:', convertBoxTableToHtml(sample));
