"""RedKross Academy C04-M07 - defensive automation.

1) File integrity monitor (FIM) with an HMAC-protected JSON baseline;
2) rule-based log anomaly detection with suppression;
3) safe alert generation (structured, sanitised, rate-limited).
Synthetic data in a temporary folder. Tested: CPython 3.14.4, 2026-11-07.
"""
import hashlib
import hmac
import json
import re
import secrets
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ---------------- 1. File integrity monitor ----------------------------------
def sha256(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()

def snapshot(root: Path) -> dict:
    return {str(p.relative_to(root)).replace("\\", "/"): sha256(p)
            for p in sorted(root.rglob("*")) if p.is_file()}

def sign(data: dict, key: bytes) -> str:
    blob = json.dumps(data, sort_keys=True).encode()
    return hmac.new(key, blob, hashlib.sha256).hexdigest()

def compare(old: dict, new: dict) -> dict:
    return {
        "added": sorted(set(new) - set(old)),
        "removed": sorted(set(old) - set(new)),
        "modified": sorted(k for k in set(old) & set(new) if old[k] != new[k]),
    }

root = Path(tempfile.mkdtemp(prefix="rk-m07-"))
watched = root / "etc"
watched.mkdir()
(watched / "sshd_config").write_text("PermitRootLogin no\n")
(watched / "hosts").write_text("127.0.0.1 localhost\n")
key = secrets.token_bytes(32)          # in production: stored separately
baseline = snapshot(watched)
record = {"files": baseline, "hmac": sign(baseline, key)}
(root / "baseline.json").write_text(json.dumps(record, indent=1))
print("1. baseline files:", list(baseline))

(watched / "sshd_config").write_text("PermitRootLogin yes\n")   # change
(watched / "cron.evil").write_text("* * * * * root /tmp/x\n")   # addition
(watched / "hosts").unlink()                                    # removal

stored = json.loads((root / "baseline.json").read_text())
trusted = hmac.compare_digest(stored["hmac"], sign(stored["files"], key))
print("   baseline signature valid:", trusted)
print("   changes:", compare(stored["files"], snapshot(watched)))

tampered = dict(stored["files"])
tampered["sshd_config"] = sha256(watched / "sshd_config")      # attacker edits
print("   tampered baseline valid:", hmac.compare_digest(stored["hmac"], sign(tampered, key)))

# ---------------- 2. Rule-based log anomaly detection ---------------------------
RULES = [
    {"id": "RK-001", "name": "Root login over SSH", "severity": "high",
     "pattern": r"Accepted \S+ for root from (?P<ip>\S+)", "threshold": 1},
    {"id": "RK-002", "name": "Repeated sudo failures", "severity": "medium",
     "pattern": r"sudo: .*authentication failure.*user=(?P<user>\S+)", "threshold": 3},
    {"id": "RK-003", "name": "New user created", "severity": "medium",
     "pattern": r"useradd\[\d+\]: new user: name=(?P<user>[^,]+)", "threshold": 1},
]
for r in RULES:
    r["rx"] = re.compile(r["pattern"])

base = datetime(2026, 11, 7, 10, 0, tzinfo=timezone.utc)
LOG = [
    (0, "sshd[1]: Accepted password for root from 203.0.113.7 port 5000"),
    (20, "sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 user=ben"),
    (25, "sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 user=ben"),
    (30, "sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 user=ben"),
    (31, "sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 user=ben"),
    (40, "useradd[77]: new user: name=svc\x1b[31mbackup, UID=1005"),
    (90, "sshd[2]: Accepted password for root from 203.0.113.7 port 5001"),
]
SUPPRESS = timedelta(minutes=10)
counts, last_alert, alerts = {}, {}, []

def sanitise(text: str, limit: int = 80) -> str:
    """Remove control characters (e.g. terminal escapes) and cap length."""
    return re.sub(r"[\x00-\x1f\x7f]", "?", text)[:limit]

for offset, line in LOG:
    ts = base + timedelta(seconds=offset)
    for r in RULES:
        m = r["rx"].search(line)
        if not m:
            continue
        entity = sanitise(next(iter(m.groupdict().values())))
        k = (r["id"], entity)
        counts[k] = counts.get(k, 0) + 1
        if counts[k] < r["threshold"]:
            continue
        if k in last_alert and ts - last_alert[k] < SUPPRESS:
            continue                              # duplicate within window
        last_alert[k] = ts
        alerts.append({"time": ts.isoformat(), "rule": r["id"], "name": r["name"],
                       "severity": r["severity"], "entity": entity,
                       "evidence": sanitise(line)})

print("2. alerts raised:", len(alerts))
for a in alerts:
    print("  ", a["rule"], a["severity"], a["entity"])

# ---------------- 3. Safe alert output ------------------------------------------
out = root / "alerts.jsonl"
with out.open("w", encoding="utf-8") as fh:
    for a in alerts:
        fh.write(json.dumps(a, ensure_ascii=True) + "\n")   # one JSON object per line
first = json.loads(out.read_text().splitlines()[2])
print("3. alerts.jsonl lines:", len(out.read_text().splitlines()), "| sanitised entity:",
      first["entity"])

for p in sorted(root.rglob("*"), reverse=True):
    p.unlink() if p.is_file() else p.rmdir()
root.rmdir()
print("4. cleaned up:", not root.exists())
