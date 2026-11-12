"""RedKross Academy C04-M02 - functions, modules and exceptions demo.

Imports the local module rkutils and shows normal use, error handling with
try/except/else/finally, and why bare except is dangerous.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""
import logging

import rkutils
from rkutils import InvalidPortError, parse_port

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("m02")

# 1. Calling functions with positional, keyword and variable arguments
print("1.", rkutils.summarise(22, 80, 443, 8443))
print("  ", rkutils.summarise(22, 3389, label="admin", host="web-01"))

# 2. Handling bad input deliberately
inputs = ["443", "70000", "https", None, "22"]
valid = []
for raw in inputs:
    try:
        port = parse_port(raw)
    except InvalidPortError as err:
        log.warning("rejected %r: %s", raw, err)
    else:
        valid.append(port)            # runs only if no exception
    finally:
        pass                          # always runs (cleanup goes here)
print("2. valid ports:", valid)

# 3. Exception chaining keeps the original cause
try:
    parse_port("abc")
except InvalidPortError as err:
    print("3.", type(err).__name__, "-", err, "| cause:", type(err.__cause__).__name__)

# 4. classify_ip raises ValueError for bad addresses
for text in ["10.0.0.5", "127.0.0.1", "8.8.8.8", "999.1.1.1"]:
    try:
        print("4.", text, "->", rkutils.classify_ip(text))
    except ValueError as err:
        print("4.", text, "-> invalid:", err)

# 5. Why bare 'except:' is dangerous: it hides real bugs
def buggy_total(values):
    try:
        return sum(values) / len(valuez)     # typo: NameError
    except:                                   # noqa: E722 (deliberate)
        return 0

def better_total(values):
    try:
        return sum(values) / len(values)
    except ZeroDivisionError:
        return 0

print("5. buggy:", buggy_total([1, 2, 3]), "| better:", better_total([1, 2, 3]),
      "| better(empty):", better_total([]))

# 6. The module's __name__ when imported
print("6. rkutils.__name__ =", rkutils.__name__, "| this file:", __name__)
