"""RedKross Academy C04-M03 - files, CSV, JSON and regular expressions.

Creates a temporary working folder with synthetic data, demonstrates safe
file handling, CSV and JSON processing (including spreadsheet formula
injection), and regular expressions (including catastrophic backtracking),
then removes the folder.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""
import csv
import json
import re
import shutil
import tempfile
import time
from pathlib import Path

work = Path(tempfile.mkdtemp(prefix="rk-m03-"))
print("0. working folder created:", work.name.startswith("rk-m03-"))

# --- 1. Text files: write, append, read safely --------------------------------
log_file = work / "auth.log"
lines = [
    "2026-11-07T10:01:02Z sshd[811]: Failed password for asha from 203.0.113.7 port 50122",
    "2026-11-07T10:01:09Z sshd[811]: Failed password for invalid user admin from 203.0.113.7 port 50130",
    "2026-11-07T10:02:44Z sshd[815]: Accepted publickey for ben from 10.20.4.17 port 51022",
    "2026-11-07T10:03:10Z sshd[817]: Failed password for asha from 198.51.100.23 port 40001",
]
with log_file.open("w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(lines) + "\n")
with log_file.open("a", encoding="utf-8") as fh:
    fh.write("2026-11-07T10:04:00Z sshd[820]: Connection closed by 10.20.4.17\n")
with log_file.open(encoding="utf-8") as fh:
    for number, line in enumerate(fh, start=1):
        if "Failed" in line:
            print(f"1. line {number}: {line.rstrip()[:60]}...")
print("   size:", log_file.stat().st_size, "bytes; lines:",
      len(log_file.read_text(encoding="utf-8").splitlines()))

# --- 2. Binary files and encodings -------------------------------------------
data = ("Pune - caf" + chr(0xE9) + chr(10)).encode("utf-8")   # e-acute, newline
(work / "note.bin").write_bytes(data)
print("2. bytes:", data, "| decoded:", ascii((work / "note.bin").read_bytes().decode("utf-8").strip()))
try:
    data.decode("ascii")
except UnicodeDecodeError as err:
    print("   ascii decode fails:", type(err).__name__)

# --- 3. CSV: read with DictReader, write with DictWriter ------------------------
assets_csv = work / "assets.csv"
assets_csv.write_text(
    "hostname,ip,owner,criticality\n"
    "web-01,10.0.1.10,IT,high\n"
    "hr-portal,10.0.2.20,HR,high\n"
    "printer-3,10.0.9.3,Facilities,low\n",
    encoding="utf-8",
)
with assets_csv.open(newline="", encoding="utf-8") as fh:
    rows = list(csv.DictReader(fh))
high = [r["hostname"] for r in rows if r["criticality"] == "high"]
print("3. rows:", len(rows), "| high criticality:", high)

# --- 4. CSV formula injection: neutralise before export ------------------------
def safe_cell(value: str) -> str:
    """Prefix a quote if a cell would start a spreadsheet formula."""
    if value and value[0] in ("=", "+", "-", "@", "\t", "\r"):
        return "'" + value
    return value

report = [{"user": "asha", "note": "=HYPERLINK(\"http://example.com\",\"click\")"},
          {"user": "ben", "note": "normal text"}]
out_csv = work / "report.csv"
with out_csv.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=["user", "note"])
    writer.writeheader()
    for row in report:
        writer.writerow({k: safe_cell(v) for k, v in row.items()})
print("4.", out_csv.read_text(encoding="utf-8").splitlines()[1])

# --- 5. JSON: load, query, dump ------------------------------------------------
alerts_json = work / "alerts.json"
alerts_json.write_text(json.dumps([
    {"id": 1, "rule": "brute_force", "src": "203.0.113.7", "count": 7},
    {"id": 2, "rule": "new_admin", "user": "chen", "count": 1},
], indent=2), encoding="utf-8")
alerts = json.loads(alerts_json.read_text(encoding="utf-8"))
print("5.", [a["rule"] for a in alerts], "| total events:", sum(a["count"] for a in alerts))
print("   first alert has 'user'?", "user" in alerts[0], "->", alerts[0].get("user", "n/a"))
try:
    json.loads("{'single': 'quotes'}")
except json.JSONDecodeError as err:
    print("   invalid JSON:", err.msg)

# --- 6. Regular expressions ---------------------------------------------------
pattern = re.compile(
    r"^(?P<ts>\S+) sshd\[\d+\]: Failed password for (?:invalid user )?"
    r"(?P<user>\S+) from (?P<ip>\d{1,3}(?:\.\d{1,3}){3}) port (?P<port>\d+)$"
)
for line in log_file.read_text(encoding="utf-8").splitlines():
    m = pattern.match(line)
    if m:
        print("6.", m.group("ts")[11:19], m["user"], m["ip"], int(m["port"]))

print("   findall IPs:", sorted(set(re.findall(r"\b\d{1,3}(?:\.\d{1,3}){3}\b",
                                             log_file.read_text(encoding="utf-8")))))
print("   greedy:", re.search(r"<.*>", "<a><b>").group(), "| lazy:",
      re.search(r"<.*?>", "<a><b>").group())

# --- 7. Catastrophic backtracking (ReDoS) - safely bounded demonstration ------
evil = re.compile(r"^(a+)+$")
for n in (18, 20, 22):
    start = time.perf_counter()
    evil.match("a" * n + "b")          # cannot match; backtracks exponentially
    elapsed = time.perf_counter() - start
    print(f"7. n={n}: {elapsed:.3f} s")
safe = re.compile(r"^a+$")
start = time.perf_counter()
safe.match("a" * 22 + "b")
print(f"   simple pattern n=22: {time.perf_counter() - start:.6f} s")

shutil.rmtree(work)
print("8. cleaned up:", not work.exists())
