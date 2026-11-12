"""RedKross Academy C04-M01 - Python foundations demonstration.

Sections: variables and types, strings, lists, dictionaries, sets, tuples,
conditions, loops and comprehensions - using small security examples.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""

# --- 1. Variables and types -------------------------------------------------
hostname = "web-01"            # str
port = 443                     # int
load = 0.75                    # float
is_public = True               # bool
owner = None                   # NoneType: "no value yet"
print("1.", type(hostname).__name__, type(port).__name__, type(load).__name__,
      type(is_public).__name__, type(owner).__name__)

# --- 2. Strings and f-strings -----------------------------------------------
line = "2026-11-07 10:02:11 FAILED login user=asha src=10.20.4.17"
print("2.", line.upper()[:19], "|", line.split()[2], "|", "asha" in line)
print("   ", f"{hostname}:{port} load={load:.0%} public={is_public}")

# --- 3. Lists: ordered, changeable -------------------------------------------
open_ports = [22, 80, 443]
open_ports.append(8080)
open_ports.remove(80)
print("3.", open_ports, "count:", len(open_ports), "first:", open_ports[0],
      "last:", open_ports[-1], "slice:", open_ports[1:])

# --- 4. Dictionaries: key -> value -------------------------------------------
services = {22: "ssh", 443: "https", 8080: "http-alt"}
services[3389] = "rdp"
print("4.", services.get(22), services.get(25, "unknown"), sorted(services))
for p, name in services.items():
    print(f"    port {p:>5} -> {name}")

# --- 5. Sets: unique, unordered -----------------------------------------------
seen_ips = ["10.0.0.5", "10.0.0.9", "10.0.0.5", "203.0.113.7"]
unique = set(seen_ips)
allow = {"10.0.0.5", "10.0.0.9"}
print("5.", len(seen_ips), "seen,", len(unique), "unique; not allow-listed:",
      sorted(unique - allow))

# --- 6. Tuples: fixed records -------------------------------------------------
event = ("2026-11-07T10:02:11", "asha", "FAILED")
timestamp, user, result = event        # unpacking
print("6.", user, result)

# --- 7. Conditions -----------------------------------------------------------
def classify(p):
    if p in (22, 3389):
        return "admin"
    elif p < 1024:
        return "well-known"
    else:
        return "high"

print("7.", [(p, classify(p)) for p in (22, 80, 3389, 8080)])

# --- 8. Loops: count failures per user, stop at threshold ---------------------
log = [
    "FAILED user=asha", "OK user=ben", "FAILED user=asha",
    "FAILED user=chen", "FAILED user=asha", "FAILED user=asha",
]
THRESHOLD = 3
failures = {}
for entry in log:
    if not entry.startswith("FAILED"):
        continue                                  # skip successes
    name = entry.split("user=")[1]
    failures[name] = failures.get(name, 0) + 1
    if failures[name] == THRESHOLD:
        print(f"8. ALERT: {name} reached {THRESHOLD} failures")
print("   totals:", failures)

attempts = 0
while attempts < 5:
    attempts += 1
    if attempts == 3:
        break
print("   while loop stopped after", attempts, "attempts")

# --- 9. Comprehensions --------------------------------------------------------
over = {u: n for u, n in failures.items() if n >= THRESHOLD}
print("9.", over, [p for p in sorted(services) if p < 1024])
