"""CT2 model solution: build an IP -> MAC table from ARP and flag conflicts.
Run: python solutions/ct2_arp_table.py rk_c02_lab.pcap
Tested: CPython 3.14.4, 2026-11-08."""
import os
import sys
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pcaplite import packets, parse  # noqa: E402

seen = defaultdict(set)
counts = defaultdict(lambda: [0, 0, 0])   # requests, replies, announcements
for n, t, fr in packets(sys.argv[1]):
    p = parse(fr)
    if "arp_op" not in p:
        continue
    seen[p["spa"]].add(p["sha"])
    if p["arp_op"] == 1 and p["spa"] == p["tpa"]:
        counts[p["spa"]][2] += 1
    elif p["arp_op"] == 1:
        counts[p["spa"]][0] += 1
    else:
        counts[p["spa"]][1] += 1
for ip in sorted(seen, key=lambda s: tuple(map(int, s.split(".")))):
    r, rp, an = counts[ip]
    flag = "  CONFLICT: several MACs" if len(seen[ip]) > 1 else ""
    print(f"{ip:13s} {','.join(sorted(seen[ip]))}  requests={r} replies={rp} announcements={an}{flag}")
print(f"{len(seen)} IPs, {sum(1 for v in seen.values() if len(v) > 1)} conflicts")
