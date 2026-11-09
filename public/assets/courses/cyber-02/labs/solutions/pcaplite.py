"""Minimal stdlib pcap reader for Course 02 solutions (Ethernet, IPv4).
Reads classic libpcap files only. Tested: CPython 3.14.4, 2026-11-08."""
import struct


def packets(path):
    with open(path, "rb") as f:
        hdr = f.read(24)
        magic = struct.unpack("<I", hdr[:4])[0]
        endian = "<" if magic in (0xA1B2C3D4, 0xA1B23C4D) else ">"
        n = 0
        while True:
            ph = f.read(16)
            if len(ph) < 16:
                return
            ts, us, incl, _orig = struct.unpack(endian + "IIII", ph)
            n += 1
            yield n, ts + us / 1e6, f.read(incl)


def parse(frame):
    """Return dict with eth/arp/ip/tcp/udp fields that the solutions need."""
    d = {"ethertype": struct.unpack("!H", frame[12:14])[0]}
    if d["ethertype"] == 0x0806:
        op, = struct.unpack("!H", frame[20:22])
        d.update(arp_op=op, sha=frame[22:28].hex(":"), spa=".".join(map(str, frame[28:32])),
                 tpa=".".join(map(str, frame[38:42])))
    elif d["ethertype"] == 0x0800:
        ip = frame[14:]
        ihl = (ip[0] & 15) * 4
        d.update(proto=ip[9], src=".".join(map(str, ip[12:16])), dst=".".join(map(str, ip[16:20])))
        l4 = ip[ihl:]
        if ip[9] == 6:
            sp, dp = struct.unpack("!HH", l4[:4])
            d.update(sport=sp, dport=dp, flags=l4[13])
        elif ip[9] == 17:
            sp, dp = struct.unpack("!HH", l4[:4])
            d.update(sport=sp, dport=dp)
    return d
