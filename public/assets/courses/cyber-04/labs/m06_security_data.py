"""RedKross Academy C04-M06 - security data processing.

1) hashing and integrity (streamed SHA-256, HMAC); 2) log parsing with
Counter and time windows; 3) IOC extraction with validation, defanging and
allow-listing. Synthetic data only.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""
import hashlib
import hmac
import ipaddress
import re
import secrets
import tempfile
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path

# --- 1. Hashing ---------------------------------------------------------------
def sha256_file(path: Path, chunk: int = 65536) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for block in iter(lambda: fh.read(chunk), b""):
            h.update(block)
    return h.hexdigest()

tmp = Path(tempfile.mkdtemp(prefix="rk-m06-"))
f = tmp / "invoice.txt"
f.write_bytes(b"Invoice 1042: pay INR 25,000 to account 1234\n")
print("1. sha256:", sha256_file(f))
print("   md5   :", hashlib.md5(f.read_bytes()).hexdigest(), "(legacy, collisions known)")
f.write_bytes(b"Invoice 1042: pay INR 95,000 to account 1234\n")
print("   after change:", sha256_file(f)[:16], "...")

key = secrets.token_bytes(32)
msg = b'{"alert":"brute_force","src":"203.0.113.7"}'
tag = hmac.new(key, msg, hashlib.sha256).hexdigest()
ok = hmac.compare_digest(tag, hmac.new(key, msg, hashlib.sha256).hexdigest())
bad = hmac.compare_digest(tag, hmac.new(key, msg.replace(b"203", b"198"), hashlib.sha256).hexdigest())
print("   HMAC verify original:", ok, "| tampered:", bad, "| tag length:", len(tag))

# --- 2. Log parsing with time windows ------------------------------------------
LOG = """\
2026-11-07T10:00:01Z sshd[1]: Failed password for asha from 203.0.113.7 port 50001
2026-11-07T10:00:05Z sshd[1]: Failed password for ben from 203.0.113.7 port 50002
2026-11-07T10:00:09Z sshd[1]: Failed password for chen from 203.0.113.7 port 50003
2026-11-07T10:00:12Z sshd[1]: Failed password for dev from 203.0.113.7 port 50004
2026-11-07T10:00:30Z sshd[2]: Failed password for asha from 198.51.100.23 port 40001
2026-11-07T10:07:00Z sshd[2]: Failed password for asha from 198.51.100.23 port 40002
2026-11-07T10:07:20Z sshd[3]: Accepted password for chen from 203.0.113.7 port 50010
"""
pat = re.compile(r"^(\S+) sshd\[\d+\]: (Failed|Accepted) password for (\S+) from (\S+) port \d+$")
events = []
for line in LOG.splitlines():
    m = pat.match(line)
    if m:
        ts = datetime.fromisoformat(m[1].replace("Z", "+00:00"))
        events.append((ts, m[2], m[3], m[4]))

fails = Counter(e[3] for e in events if e[1] == "Failed")
users_per_ip = defaultdict(set)
for ts, result, user, ip in events:
    if result == "Failed":
        users_per_ip[ip].add(user)
print("2. failures per IP:", dict(fails))
print("   distinct users per IP:", {ip: len(u) for ip, u in users_per_ip.items()})

WINDOW = timedelta(minutes=1)
for ip, users in users_per_ip.items():
    times = sorted(e[0] for e in events if e[3] == ip and e[1] == "Failed")
    if len(users) >= 3 and times[-1] - times[0] <= WINDOW:
        print(f"   SPRAY? {ip}: {len(users)} users in {(times[-1]-times[0]).seconds}s")
for ts, result, user, ip in events:
    if result == "Accepted" and ip in users_per_ip:
        print(f"   SUCCESS after failures: {user} from {ip} at {ts:%H:%M:%S}")

# --- 3. IOC extraction -----------------------------------------------------------
REPORT = """Analyst notes: beacon to hxxp://update-check[.]example[.]net/api from
10.20.4.17; payload SHA-256 0f343b0931126a20f133d67c2b018a3b1e9f2b2e9d3f4a1b2c3d4e5f60718293
also seen 203.0.113.7 and 999.10.1.1 (typo). Contact: soc@example.org. Benign: www.example.com
MD5 d41d8cd98f00b204e9800998ecf8427e"""

def refang(text: str) -> str:
    return text.replace("hxxp", "http").replace("[.]", ".")

def defang(value: str) -> str:
    return value.replace("http", "hxxp").replace(".", "[.]")

clean = refang(REPORT)
ipv4 = set()
for cand in re.findall(r"\b\d{1,3}(?:\.\d{1,3}){3}\b", clean):
    try:
        ipv4.add(str(ipaddress.ip_address(cand)))
    except ValueError:
        pass                                           # 999.10.1.1 rejected
sha256s = set(re.findall(r"\b[a-fA-F0-9]{64}\b", clean))
md5s = set(re.findall(r"\b[a-fA-F0-9]{32}\b", clean)) - {h[:32] for h in sha256s}
urls = set(re.findall(r"https?://[^\s)]+", clean))
domains = set(re.findall(r"\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b", clean, flags=re.I))
emails = set(re.findall(r"\b[\w.+-]+@[\w-]+\.[\w.]+\b", clean))
ALLOW = {"www.example.com"}
domains = {d.lower() for d in domains} - ALLOW - {e.split("@")[1] for e in emails}

print("3. IPv4:", sorted(ipv4), "| public:", sorted(i for i in ipv4 if ipaddress.ip_address(i).is_global))
print("   URLs:", sorted(urls))
print("   domains:", sorted(domains))
print("   sha256:", len(sha256s), "| md5:", sorted(md5s), "| emails:", sorted(emails))
print("   defanged for sharing:", [defang(u) for u in sorted(urls)])

for p in tmp.iterdir():
    p.unlink()
tmp.rmdir()
print("4. cleaned up:", not tmp.exists())
