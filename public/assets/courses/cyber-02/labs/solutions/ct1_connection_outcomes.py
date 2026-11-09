"""CT1 model solution: classify TCP connection attempts by outcome.
For each (client, server, port): SYNs sent, SYN/ACK or RST received ->
CONNECTED, REFUSED (RST) or NO RESPONSE (likely filtered/dropped).
Run: python solutions/ct1_connection_outcomes.py rk_c02_trouble.pcap
Tested: CPython 3.14.4, 2026-11-08."""
import os
import sys
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pcaplite import packets, parse  # noqa: E402

SYN, RST, ACK = 0x02, 0x04, 0x10
att = defaultdict(lambda: {"syn": 0, "synack": False, "rst": False})
for n, t, fr in packets(sys.argv[1]):
    p = parse(fr)
    if p.get("proto") != 6:
        continue
    f = p["flags"]
    if f & SYN and not f & ACK:
        att[(p["src"], p["dst"], p["dport"])]["syn"] += 1
    elif f & SYN and f & ACK:
        att[(p["dst"], p["src"], p["sport"])]["synack"] = True
    elif f & RST:
        key = (p["dst"], p["src"], p["sport"])
        if key in att:
            att[key]["rst"] = True
for (c, s, port), a in sorted(att.items(), key=lambda x: x[0][2]):
    outcome = "CONNECTED" if a["synack"] else "REFUSED (RST)" if a["rst"] else "NO RESPONSE"
    print(f"{c} -> {s}:{port}  SYNs={a['syn']}  {outcome}")
