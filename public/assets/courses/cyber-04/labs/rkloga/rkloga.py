"""rkloga - RedKross log analyser (Course 04 Module 8 reference utility).

Parses OpenSSH-style authentication log lines, summarises failures and
successes, and flags password spraying and success-after-failure.

Usage:
    python rkloga.py LOGFILE [--window-min N] [--spray-users N] [--json]

Exit codes: 0 no findings, 1 findings, 2 usage/input error.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""
from __future__ import annotations

import argparse
import json
import logging
import re
import sys
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

LINE_RX = re.compile(
    r"^(?P<ts>\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ) sshd\[\d+\]: "
    r"(?P<result>Failed|Accepted) \S+ for (?:invalid user )?(?P<user>[\w.@-]{1,64}) "
    r"from (?P<ip>[0-9a-fA-F:.]{2,45}) port \d{1,5}$"
)
MAX_LINE = 2048
log = logging.getLogger("rkloga")


@dataclass(frozen=True)
class Event:
    ts: datetime
    result: str
    user: str
    ip: str


def parse_line(line: str) -> Event | None:
    """Return an Event for a recognised line, else None."""
    if len(line) > MAX_LINE:
        return None
    m = LINE_RX.match(line.rstrip("\n"))
    if not m:
        return None
    ts = datetime.fromisoformat(m["ts"].replace("Z", "+00:00"))
    return Event(ts, m["result"], m["user"], m["ip"])


def analyse(events: list[Event], window: timedelta, spray_users: int) -> dict:
    """Return summary counts and findings for a list of events."""
    failures: dict[str, list[Event]] = defaultdict(list)
    findings = []
    for e in sorted(events, key=lambda e: e.ts):
        if e.result == "Failed":
            failures[e.ip].append(e)
            recent = [f for f in failures[e.ip] if e.ts - f.ts <= window]
            users = {f.user for f in recent}
            already = any(x["type"] == "spray" and x["ip"] == e.ip for x in findings)
            if len(users) >= spray_users and not already:
                findings.append({"type": "spray", "ip": e.ip, "users": sorted(users),
                                 "time": e.ts.isoformat()})
        elif failures.get(e.ip):
            findings.append({"type": "success_after_failure", "ip": e.ip,
                             "user": e.user, "time": e.ts.isoformat()})
    return {
        "events": len(events),
        "failures": sum(len(v) for v in failures.values()),
        "successes": sum(1 for e in events if e.result == "Accepted"),
        "findings": findings,
    }


def read_events(path: Path) -> tuple[list[Event], int]:
    """Read a log file; return parsed events and the count of skipped lines."""
    events, skipped = [], 0
    with path.open(encoding="utf-8", errors="replace") as fh:
        for line in fh:
            ev = parse_line(line)
            if ev:
                events.append(ev)
            elif line.strip():
                skipped += 1
    return events, skipped


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Summarise SSH auth logs and flag spraying.")
    p.add_argument("logfile", type=Path)
    p.add_argument("--window-min", type=int, default=5, help="spray window in minutes")
    p.add_argument("--spray-users", type=int, default=3, help="distinct users to flag spraying")
    p.add_argument("--json", action="store_true", help="output JSON")
    args = p.parse_args(argv)
    logging.basicConfig(level=logging.WARNING, format="%(levelname)s %(message)s")

    if not (1 <= args.window_min <= 1440 and 2 <= args.spray_users <= 1000):
        log.error("window-min must be 1-1440 and spray-users 2-1000")
        return 2
    try:
        events, skipped = read_events(args.logfile)
    except FileNotFoundError:
        log.error("file not found: %s", args.logfile)
        return 2
    except PermissionError:
        log.error("permission denied: %s", args.logfile)
        return 2
    except OSError as exc:                       # other I/O problems, no traceback
        log.error("cannot read %s: %s", args.logfile, exc.strerror)
        return 2

    result = analyse(events, timedelta(minutes=args.window_min), args.spray_users)
    result["skipped_lines"] = skipped
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print(f"events={result['events']} failures={result['failures']} "
              f"successes={result['successes']} skipped={skipped}")
        for f in result["findings"]:
            print(f"FINDING {f['type']} ip={f['ip']} time={f['time']}")
    return 1 if result["findings"] else 0


if __name__ == "__main__":
    sys.exit(main())
