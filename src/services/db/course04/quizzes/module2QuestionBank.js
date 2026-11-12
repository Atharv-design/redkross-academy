/**
 * Course 04: Python for Cybersecurity — Module 2 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module2QuestionBank = [
  {
    "id": "q_c4_m2_001",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "What value does a Python function automatically return when control reaches the end of its body without hitting a return statement?",
    "options": [
      "An empty string ''",
      "0",
      "None",
      "Raises ReturnValueError"
    ],
    "correct": 2,
    "explanation": "Every Python function implicitly returns None if no explicit return expression executes."
  },
  {
    "id": "q_c4_m2_002",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Inside def summarise(*ports: int, label: str = 'ports', **extra: str) -> str, what Python container type holds extra unmatched positional arguments inside ports?",
    "options": [
      "A tuple of positional arguments",
      "A mutable list",
      "A dictionary mapping index to value",
      "A deduplicated set"
    ],
    "correct": 0,
    "explanation": "The *args parameter syntax gathers zero or more positional arguments into an ordered tuple."
  },
  {
    "id": "q_c4_m2_003",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Why does writing '-> int' and 'value: str | int' in parse_port(value: str | int) -> int improve large security toolkits even though Python does not reject mismatched types automatically at call time?",
    "options": [
      "It throws a TypeError immediately before line 1 executes if a float is passed",
      "It forces Python to compile the function to machine assembly",
      "It enables IDE autocompletion, human readability via help(), and automated verification with static type checkers like mypy before deployment",
      "It strips whitespace from strings automatically"
    ],
    "correct": 2,
    "explanation": "Type hints act as executable metadata for editors, static analyzers, and help(), clarifying boundary expectations without altering runtime dynamic dispatch."
  },
  {
    "id": "q_c4_m2_004",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "What is the minimum Python version required to use the 'str | int' PEP 604 union type-hint syntax directly inside function signatures?",
    "options": [
      "Python 3.10 or newer",
      "Python 3.6",
      "Python 2.7",
      "Python 3.8"
    ],
    "correct": 0,
    "explanation": "Using the bitwise-OR bar syntax (X | Y) directly in type annotations was introduced in Python 3.10."
  },
  {
    "id": "q_c4_m2_005",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Inside def summarise(*ports, label='ports', **extra), what container type holds additional unmatched keyword arguments passed as host='web-01' inside extra?",
    "options": [
      "A set of key=value pairs",
      "A list of strings",
      "A dictionary mapping argument names to values",
      "A tuple of alternating keys and values"
    ],
    "correct": 2,
    "explanation": "**kwargs collects arbitrary named keyword arguments into a dict mapping parameter names (str) to supplied values."
  },
  {
    "id": "q_c4_m2_006",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "How must a caller supply the label parameter when calling rkutils.summarise(22, 3389, ...) from m02_reusable.py?",
    "options": [
      "Only as an integer",
      "Either positionally or by keyword",
      "Always inside extra dictionary brackets",
      "Exclusively as a keyword argument (label='admin') because it follows *ports"
    ],
    "correct": 3,
    "explanation": "Any parameter declared after *args in a function header becomes keyword-only, preventing accidental confusion with variadic positional arguments."
  },
  {
    "id": "q_c4_m2_007",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "In rkutils.py, why does parse_port return an integer rather than printing the parsed port inside the function body?",
    "options": [
      "print() cannot output integers inside modules",
      "Returning data keeps presentation separate from computation so callers can log, count, serialize to JSON, or test return values cleanly",
      "Functions with print() are forbidden in Unit Tests",
      "Returning integers encrypts standard output"
    ],
    "correct": 1,
    "explanation": "Mixing display side effects inside parser helpers prevents reuse in daemons, APIs, and unit tests; return values and let callers format output."
  },
  {
    "id": "q_c4_m2_008",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Trace rkutils.summarise(22, 80, 443, 8443, env='prod', host='web-01'). Why did m02_reusable.py sort extra.items() when appending key=value pairs?",
    "options": [
      "**extra returns an unordered hash set in Python 3.12",
      "Unpacking **extra reverses keyword arguments by default",
      "sorted(extra.items()) removes duplicate values",
      "Python's dict iterates in caller call-order, so sorting guarantees deterministic canonical text across callers passing keyword arguments in arbitrary order (important for tests and alert hashes)"
    ],
    "correct": 3,
    "explanation": "Canonicalizing key ordering with sorted(extra.items()) produces consistent deterministic output strings regardless of keyword order at call sites."
  },
  {
    "id": "q_c4_m2_009",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Wait carefully before calling parse_port('443'): if an analyst passes a floating-point string like '443.9' OR a float like 443.9 to int(value), how differently does parse_port(443.9) vs parse_port('443.9') behave?",
    "options": [
      "Both return 443 smoothly",
      "int('443.9') raises ValueError (converting to InvalidPortError), whereas int(443.9) silently truncates to 443 unless type validation rejects non-int/non-digit inputs!",
      "int(443.9) raises InvalidPortError",
      "Both raise TypeError"
    ],
    "correct": 1,
    "explanation": "int(float) truncates fractional parts silently in Python (443.9 -> 443), whereas int('443.9') rejects the decimal point; strict parsers often check isinstance(value, bool) and reject floats if fractions indicate corrupted telemetry."
  },
  {
    "id": "q_c4_m2_010",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Suppose a helper signature begins def build_rule(*, action: str, port: int) -> dict:. What does the bare asterisk '*' parameter achieve?",
    "options": [
      "Captures unlimited positional arguments into an unnamed list",
      "Marks parameters optional with default None",
      "Multiplies action by port",
      "Forces BOTH action and port to be passed strictly as keyword arguments (e.g., build_rule(action='deny', port=23)) rather than error-prone positional guesses"
    ],
    "correct": 3,
    "explanation": "A standalone '*' separator marks all subsequent parameters as keyword-only, eliminating positional parameter swap bugs in multi-flag security functions."
  },
  {
    "id": "q_c4_m2_011",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Why does rkutils.summarise call WELL_KNOWN_MAX (1023) rather than hardcoding 1023 repeatedly, and why does `sum(1 for p in ports if p <= WELL_KNOWN_MAX)` avoid allocating an intermediate list?",
    "options": [
      "1023 < 1024 omits port 1023 only; a generator expression yields 1s lazily directly into sum()",
      "Port 1023 is the highest well-known port (0..1023 inclusive) and passing a generator expression into sum() executes in O(1) extra memory",
      "WELL_KNOWN_MAX turns ports into global state",
      "Generators double execution time in CPython"
    ],
    "correct": 1,
    "explanation": "IANA well-known ports span 0 through 1023 (using <= 1023 matches < 1024 cleanly), and a generator expression computes sums in streaming memory without constructing a temporary list."
  },
  {
    "id": "q_c4_m2_012",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "Why does def add_ip(ip, seen=[]): behave unexpectedly on repeated function calls in Python?",
    "options": [
      "Default argument values are evaluated ONCE when def executes at function definition time, so all calls share and mutate the same default list object",
      "Default lists cannot accept string items",
      "Lists defined in function headers turn into global variables automatically",
      "Calling add_ip clears seen before each call"
    ],
    "correct": 0,
    "explanation": "Python evaluates default values once at module load/def execution, not per invocation; using a mutable list/dict/set default causes state leakage across independent callers."
  },
  {
    "id": "q_c4_m2_013",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "What is the standard Python idiom to fix the mutable default argument bug in def add_ip(ip, seen=None):?",
    "options": [
      "Pass seen=() and append to it",
      "Wrap seen=[] inside tuple()",
      "Declare global seen in the header",
      "Set seen = [] inside the function if seen is None"
    ],
    "correct": 3,
    "explanation": "Using sentinel default None and executing 'if seen is None: seen = []' creates a brand-new list for every call where the caller omitted seen."
  },
  {
    "id": "q_c4_m2_014",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "Inside a function body, how does Python treat a variable assigned without a 'global' declaration (such as text = ... inside summarise)?",
    "options": [
      "It raises SyntaxError unless declared 'local'",
      "It overwrites any same-named module variable outside",
      "It becomes local to that single function call and disappears when the function returns",
      "It persists across invocations"
    ],
    "correct": 2,
    "explanation": "Assignments inside def create local variables scoped strictly to that invocation frame unless explicitly bound via global or nonlocal."
  },
  {
    "id": "q_c4_m2_015",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "In Scenario S2, a helper returns -1 when parsing an invalid IP address instead of raising an exception, and callers forget to check for -1. Why is this a security and engineering defect?",
    "options": [
      "-1 takes double RAM compared to None",
      "Magic sentinel return values like -1 silently propagate downstream as valid data unless every caller remembers manual checks; explicit exceptions cannot be accidentally ignored",
      "Python forbids returning negative integers",
      "Exceptions execute 10x faster than integers"
    ],
    "correct": 1,
    "explanation": "Returning domain-colliding error sentinels invites silent corruption; raising InvalidAddressError forces callers to handle failure deliberately or fail loudly."
  },
  {
    "id": "q_c4_m2_016",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "Why are 'pure functions' (functions whose output depends solely on explicit arguments without mutating global state or I/O side effects) favored for security parsers and classifiers?",
    "options": [
      "They are straightforward to reason about, trivial to unit test deterministically, and safe to compose across modules",
      "They run exclusively in kernel mode",
      "Pure functions never accept exceptions",
      "Pure functions strip all global constants"
    ],
    "correct": 0,
    "explanation": "Pure transformations (like classify_ip or parse_port) require no hidden setup/mocking and eliminate hidden cross-call coupling."
  },
  {
    "id": "q_c4_m2_017",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Look at this subtle scope trap: a global constant THRESHOLD = 3 exists at module top. Inside check_rate(), someone writes: 'if count > THRESHOLD: ...; THRESHOLD = 5'. What exception occurs BEFORE the 'if' line executes?",
    "options": [
      "Reads 3 then updates global THRESHOLD to 5",
      "NameError on count only",
      "SyntaxError on module import",
      "Raises UnboundLocalError when evaluating 'count > THRESHOLD' because any assignment to THRESHOLD anywhere inside the function marks it local across the entire function body"
    ],
    "correct": 3,
    "explanation": "Python determines local vs global binding statically at compile time per function scope: assigning THRESHOLD anywhere inside def makes THRESHOLD local throughout, failing with UnboundLocalError if read first."
  },
  {
    "id": "q_c4_m2_018",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Notice another classic default-trap variant: 'def record_alert(ip, ts=datetime.utcnow()):'. Why is calling a timestamp function inside a default parameter header almost always a bug?",
    "options": [
      "datetime cannot appear in parentheses",
      "Default calls run twice per execution",
      "ts captures ONE static timestamp frozen at module import/definition time, stamping hours-later alerts with startup time instead of current time",
      "Python forbids function calls inside def lines"
    ],
    "correct": 2,
    "explanation": "Just like seen=[], runtime calls such as time.time() or datetime.now(timezone.utc) in default headers evaluate once at def creation; default to ts=None and compute timestamp inside the body."
  },
  {
    "id": "q_c4_m2_019",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "How does Python's LEGB scope resolution order pick which definition of 'status' applies inside an inner nested helper function?",
    "options": [
      "Global -> Local -> Built-in -> Enclosing",
      "Local -> Enclosing function scope -> Global (module) -> Built-in namespace",
      "Built-in -> Local -> Enclosing -> Global",
      "Random dictionary order"
    ],
    "correct": 1,
    "explanation": "Python searches Local first, then Enclosing closures, then module Global scope, and finally Built-in names (which is why assigning local list=... masks built-in list())."
  },
  {
    "id": "q_c4_m2_020",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "If a validation helper parses and enriches a caller-passed dictionary in place (e.g., mutating event['severity'] = 'high') WITHOUT warning the caller or returning a new object, what bug can strike multi-rule pipelines?",
    "options": [
      "Hidden in-place side effects leak state changes back into earlier caller structures sharing that dict reference, breaking downstream rule evaluation",
      "Dictionaries are immutable so TypeError triggers",
      "Python resets local dict values on return",
      "Calling dict.get() deletes modified keys"
    ],
    "correct": 0,
    "explanation": "Passing mutable dicts/lists by object reference lets functions unexpectedly mutate caller state; copy explicitly or return newly constructed normalized records."
  },
  {
    "id": "q_c4_m2_021",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "What value is stored in __name__ inside rkutils.py when another script imports it via 'import rkutils' versus running 'python rkutils.py' directly?",
    "options": [
      "'__main__' in both cases",
      "'rkutils' when imported; '__main__' when run directly",
      "'rkutils.py' when imported; None when run directly",
      "'__init__' when imported"
    ],
    "correct": 1,
    "explanation": "m02_reusable.py verified: 'rkutils.__name__ = rkutils | this file: __main__'; guarding tests with if __name__ == '__main__': keeps imports side-effect free."
  },
  {
    "id": "q_c4_m2_022",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Why does Python's module search order (sys.path) create a planted-module hijacking hazard if an analyst runs 'python scanner.py' while inside an untrusted folder such as /tmp or Downloads?",
    "options": [
      "Python prefers site-packages ahead of standard library only on Windows",
      "Python compiles /tmp/*.py automatically at boot",
      "Python searches the script's directory (index 0 of sys.path) BEFORE the standard library, so a planted malicious json.py or hashlib.py gets imported instead of the real stdlib module",
      "sys.path automatically downloads files from PyPI"
    ],
    "correct": 2,
    "explanation": "Because sys.path[0] points to the script's directory (or working directory in interactive mode), any same-named malicious .py shadows standard library modules."
  },
  {
    "id": "q_c4_m2_023",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Which Python interpreter flag launches Python in isolated mode, omitting the script directory, current working directory, and user site-packages from sys.path (plus ignoring PYTHON* env vars)?",
    "options": [
      "python -S",
      "python -B",
      "python -O",
      "python -I"
    ],
    "correct": 3,
    "explanation": "Running python -I (isolated mode) excludes the script directory, empty CWD, user site-packages, and PYTHONPATH/PYTHONHOME injection vectors."
  },
  {
    "id": "q_c4_m2_024",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "What role does '__all__ = [\"InvalidPortError\", \"parse_port\", \"classify_ip\", \"summarise\"]' serve inside rkutils.py?",
    "options": [
      "Declares the intended public API names exported cleanly if wildcard imports occur and clarifies public surface for tooling/documentation",
      "Encrypts internal helper functions from callers",
      "Prevents syntax errors inside docstrings",
      "Imports all listed modules automatically"
    ],
    "correct": 0,
    "explanation": "__all__ explicitly documents public symbols and restricts 'from module import *' pollution to intended exports (even though explicit imports remain best practice)."
  },
  {
    "id": "q_c4_m2_025",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Why should Course 04 learners avoid writing 'from rkutils import *' in production security tooling?",
    "options": [
      "Wildcard imports raise ImportError on Windows",
      "They obscure which module defined each symbol, complicate static checks, and silently overwrite same-named local variables or imports",
      "Wildcard imports disable all exception chaining",
      "Python takes 5 seconds per symbol"
    ],
    "correct": 1,
    "explanation": "Explicit imports ('import rkutils' or 'from rkutils import parse_port') preserve clear provenance and eliminate silent namespace collisions."
  },
  {
    "id": "q_c4_m2_026",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Why does L03 emphasize choosing Python standard library modules (ipaddress, hashlib, hmac, secrets, json, csv, re, pathlib, subprocess, socket, ssl, logging, argparse, unittest) first before searching PyPI?",
    "options": [
      "Standard library modules lack type hints",
      "PyPI packages cannot run inside virtual environments",
      "Standard library modules ship audited alongside Python with zero third-party install friction, reducing external dependency supply-chain attack surface",
      "Third-party packages require root privileges always"
    ],
    "correct": 2,
    "explanation": "Fewer third-party dependencies sharply shrink supply-chain attack surface (typosquatting, maintainer compromise, transitively vulnerable packages)."
  },
  {
    "id": "q_c4_m2_027",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Look closely at what happens if a beginner names their practice file 'logging.py' or 'email.py' inside the same folder as an alert script that contains 'import logging'. What breaks immediately?",
    "options": [
      "Python ignores the local file if a standard library module shares its name",
      "Both modules merge namespaces cleanly",
      "Python throws ProtectedStdlibNameError",
      "Python imports the user's own logging.py first off sys.path[0] instead of stdlib logging, causing AttributeError: module 'logging' has no attribute 'getLogger'"
    ],
    "correct": 3,
    "explanation": "Self-shadowing stdlib modules is a notorious debugging trap: naming your own script random.py, json.py, ssl.py, or logging.py hijacks stdlib imports across the whole folder."
  },
  {
    "id": "q_c4_m2_028",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "If module A imports module B cleanly, yet module B also runs self-test actions at top-level indentation OUTSIDE an 'if __name__ == \"__main__\":' guard, what happens the moment module A runs 'import B'?",
    "options": [
      "Python executes ALL top-level statements inside B immediately during import (printing noise, opening files, or running tests inside production callers)",
      "Nothing runs until B.main() is invoked",
      "Python wraps B's top-level lines automatically in __main__",
      "Import skips non-def statements"
    ],
    "correct": 0,
    "explanation": "Importing a Python module executes its top-level statements from top to bottom once; placing CLI logic or test runs under if __name__ == '__main__': isolates execution strictly to direct invocations."
  },
  {
    "id": "q_c4_m2_029",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Compare '-P' (safe_path added in Python 3.11) vs '-I' when running Python from an untrusted directory on Linux/Windows. What additional hygiene does '-P' enforce on sys.path?",
    "options": [
      "Encrypting __pycache__ bytecode",
      "Prepending neither the script directory nor CWD to sys.path while still allowing venv site-packages (unlike '-I' which also ignores user site and env vars)",
      "Forcing strict static typing at import time",
      "Blocking all file reads inside pathlib"
    ],
    "correct": 1,
    "explanation": "Python 3.11+ `-P` (or `PYTHONSAFEPATH=1`) stops prepending unsafe script/CWD paths to sys.path without breaking legitimate virtual-environment package discovery."
  },
  {
    "id": "q_c4_m2_030",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why does Python cache imported modules inside `sys.modules` after the first `import rkutils` across subsequent imports in the same process?",
    "options": [
      "To re-run module initialization before every function call",
      "To copy module source files into /tmp",
      "To execute module top-level code only once and share one single module object across all importers (note: circular A<->B top-level imports fail when neither finishes initializing)",
      "To erase local module constants after use"
    ],
    "correct": 2,
    "explanation": "sys.modules acts as the per-process module singleton cache; importing rkutils ten times initializes it once—and poorly structured circular module imports crash cleanly with partially initialized AttributeError."
  },
  {
    "id": "q_c4_m2_031",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "In a `try / except / else / finally` construct, when exactly does the `else` suite execute?",
    "options": [
      "Only if `finally` fails",
      "Only after an exception is caught by `except`",
      "Always regardless of exceptions",
      "Only when no exception occurred inside the `try` suite"
    ],
    "correct": 3,
    "explanation": "`else` executes solely when `try` completes without raising any exception—keeping non-guarded follow-up code (like `valid.append(port)`) from accidentally being swallowed by `try`'s handler."
  },
  {
    "id": "q_c4_m2_032",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "What guarantees does the `finally` clause provide inside exception-handling blocks?",
    "options": [
      "It always executes before leaving the try structure, even if an exception propagates uncaught or a `return` executes inside `try` or `except`",
      "It runs only when an exception occurs",
      "It replaces the need for `except` clauses altogether",
      "It suppresses KeyboardInterrupt automatically"
    ],
    "correct": 0,
    "explanation": "`finally` handles guaranteed cleanup (closing sockets, temp handles, locks) whether the block succeeded, returned early, or raised an error."
  },
  {
    "id": "q_c4_m2_033",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "In `m02_reusable.py` section 5, why did `buggy_total([1, 2, 3])` return `0` instead of raising an error even though `len(valuez)` contained a NameError typo?",
    "options": [
      "sum([1, 2, 3]) returned 0",
      "A bare `except:` caught ANY exception—including the NameError typo—and silently returned 0",
      "Python corrects minor spelling mistakes inside try blocks",
      "ZeroDivisionError triggered before len()"
    ],
    "correct": 1,
    "explanation": "Unqualified `except:` catches literally every exception class including NameError, TypeError, KeyboardInterrupt, and SystemExit, masking programmer bugs behind wrong return values."
  },
  {
    "id": "q_c4_m2_034",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "Why does `rkutils.py` define `class InvalidPortError(ValueError):` and execute `raise InvalidPortError(...) from exc`?",
    "options": [
      "It logs the stack trace automatically without importing logging",
      "It deletes the original ValueError from memory",
      "Callers can catch either InvalidPortError specifically or broader ValueError, while `from exc` preserves the original underlying cause in `__cause__` for debugging",
      "It turns the error into an HTTP 200 status"
    ],
    "correct": 2,
    "explanation": "Domain-specific exception subclasses inherit compatibility cleanly, and explicit exception chaining (`from exc`) keeps the original root traceback intact."
  },
  {
    "id": "q_c4_m2_035",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "When running `m02_reusable.py`, why did all three `WARNING rejected ...` lines appear in the output BEFORE `1. ports: 4 total, 3 well-known` even though section 1 ran before section 2 in code?",
    "options": [
      "rkutils executes warnings during import",
      "Python runs section 2 before section 1 asynchronously",
      "logging sorts lines alphabetically before printing",
      "Logging writes to standard error (`stderr`), which has different terminal buffering/flushing timing than standard output (`stdout`)"
    ],
    "correct": 3,
    "explanation": "Because `stderr` and `stdout` are separate OS streams buffered independently when combined in terminal or process runners, `WARNING` log records frequently flush at different points relative to `print()`."
  },
  {
    "id": "q_c4_m2_036",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "Inside an `except` block of an operations pipeline, which `logging` method automatically appends the full formatted exception message and stack traceback to the log entry?",
    "options": [
      "log.exception('message')",
      "log.debug_trace('message')",
      "log.warning('message')",
      "print(err)"
    ],
    "correct": 0,
    "explanation": "`log.exception(...)` emits an ERROR-level record automatically populated with the active exception traceback (must be called inside an exception handler)."
  },
  {
    "id": "q_c4_m2_037",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Compare `except Exception:` against bare `except:` if an operator presses `Ctrl+C` while a script hangs inside a tight retry loop. Why is bare `except:` especially hostile operationally?",
    "options": [
      "Both intercept Ctrl+C identically",
      "`KeyboardInterrupt` and `SystemExit` inherit from `BaseException`, NOT `Exception`; bare `except:` intercepts `Ctrl+C` and `sys.exit()` and traps operators, whereas `except Exception:` lets termination signals pass cleanly",
      "`except Exception:` skips ValueError",
      "Bare `except:` raises KeyboardError automatically"
    ],
    "correct": 1,
    "explanation": "Python's exception hierarchy places KeyboardInterrupt and SystemExit directly under BaseException specifically so well-behaved handlers catching Exception (or narrower specific classes) still allow clean process shutdown."
  },
  {
    "id": "q_c4_m2_038",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "In Case Study C04-M02-CS2 (Orchid Payments), a SIEM ingestion poller ran `try: poll_api() except: pass` for three weeks while vendor authentication rotated and alerts stopped completely. Beyond catching specific exceptions and logging with `log.exception()`, what architectural control catches silent upstream stalls?",
    "options": [
      "Adding `time.sleep(1)` inside `except:`",
      "Disabling logging so disks never fill up",
      "Returning non-zero exit codes on persistent errors AND adding a 'dead man's switch' watchdog alert when no telemetry arrives within the expected heartbeat window",
      "Wrapping `pass` in `finally:`"
    ],
    "correct": 2,
    "explanation": "Silent failure turns availability/auth outages into three-week blind spots: fail loudly (logs + non-zero exit code) AND monitor pipeline freshness independently via dead-man's-switch alerting."
  },
  {
    "id": "q_c4_m2_039",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "In `m02_reusable.py` section 4 (`classify_ip`), why does `classify_ip()` deliberately NOT catch `ValueError` from `ipaddress.ip_address()`, leaving `try/except ValueError` to the caller?",
    "options": [
      "classify_ip converts invalid strings into 0.0.0.0 automatically",
      "ipaddress functions cannot run inside try blocks",
      "Catching ValueError inside helpers clears sys.path",
      "Only the caller knows the operational policy for malformed records (log and skip vs fail batch vs raise HTTP 400); helpers validate and raise loudly rather than guessing a silent fallback"
    ],
    "correct": 3,
    "explanation": "Catch exceptions where you have sufficient business context to handle them meaningfully—low-level parsers shouldn't print warnings and swallow invalid inputs into junk defaults."
  },
  {
    "id": "q_c4_m2_040",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Look closely at `raise InvalidPortError(...) from exc` vs `raise InvalidPortError(...) from None`. When is `from None` occasionally appropriate in web/API boundaries (though rarely in internal CLI parsers)?",
    "options": [
      "`from None` suppresses the chaining context (`__suppress_context__ = True`) if the lower-level internal traceback leaks sensitive file paths or implementation details across an external boundary, while internal logs still record full cause",
      "Never; `from None` deletes the raised InvalidPortError",
      "`from None` converts custom exceptions to ValueError",
      "`from None` turns errors into INFO logs"
    ],
    "correct": 0,
    "explanation": "While `from exc` preserves root causes for engineering diagnostics, `from None` hides noisy/internal chained implementation details cleanly when raising clean user-facing domain errors (full details should still be logged internally)."
  },
  {
    "id": "q_c4_m2_041",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Why did `m02_reusable.py` write `log.warning('rejected %r: %s', raw, err)` with lazy `%`-formatting arguments instead of `log.warning(f'rejected {raw!r}: {err}')`?",
    "options": [
      "f-strings raise SyntaxError inside logger calls",
      "Passing format templates and arguments lets `logging` skip string interpolation completely whenever that log level (e.g., DEBUG in production) is disabled—saving CPU and preventing accidental format misuse",
      "`%r` encrypts secrets automatically",
      "Logger calls accept only one argument"
    ],
    "correct": 1,
    "explanation": "Standard logging defers string formatting until the message passes the logger level filter, avoiding wasted allocations under high throughput (never pass untrusted raw input directly as the *format string itself* without arguments!)."
  },
  {
    "id": "q_c4_m2_042",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Suppose a developer checks `except ValueError, InvalidPortError:` (with a comma instead of parentheses) in Python 3. What happens?",
    "options": [
      "Catches both ValueError and InvalidPortError cleanly",
      "Catches only ValueError and assigns the rest",
      "Triggers a SyntaxError in Python 3 (multiple exception classes MUST be grouped in a tuple: `except (TypeError, ValueError) as exc:`)",
      "Catches every exception silently"
    ],
    "correct": 2,
    "explanation": "Multi-exception catches require parentheses `(ExcA, ExcB)`; writing comma without parentheses is a Python 3 SyntaxError (preventing the notorious Python 2 bug where the second name accidentally overwrote a variable!)."
  },
  {
    "id": "q_c4_m2_043",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Which standard library module command creates an isolated Python virtual environment inside folder `rkvenv`?",
    "options": [
      "python --isolate rkvenv",
      "python -m pip create rkvenv",
      "venv --init rkvenv",
      "python -m venv rkvenv"
    ],
    "correct": 3,
    "explanation": "Python ships `venv` built in; invoking `python -m venv rkvenv` creates a clean environment with its own Python links and isolated `site-packages`."
  },
  {
    "id": "q_c4_m2_044",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "What condition evaluates to `True` inside a Python process only when executing inside an isolated virtual environment rather than the base/system interpreter?",
    "options": [
      "sys.prefix != sys.base_prefix",
      "sys.version == 'venv'",
      "__name__ == 'venv'",
      "os.name != 'posix'"
    ],
    "correct": 0,
    "explanation": "Inside a virtual environment, `sys.prefix` points to the venv directory whereas `sys.base_prefix` continues pointing to the host Python installation."
  },
  {
    "id": "q_c4_m2_045",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Why should scripts and documentation invoke `python -m pip install ...` (or `rkvenv/bin/python -m pip ...`) instead of plain `pip install ...`?",
    "options": [
      "`pip` lacks SSL support unless run with `-m`",
      "`python -m pip` guarantees packages install directly into the exact Python interpreter executing the command, avoiding PATH mismatches across multiple Python/venv installs",
      "`python -m pip` automatically bypasses SHA-256 checks",
      "`pip` only works on Linux"
    ],
    "correct": 1,
    "explanation": "When multiple Python versions or unactivated venvs exist on PATH, bare `pip` can silently write packages into the wrong interpreter; `python -m pip` eliminates ambiguity."
  },
  {
    "id": "q_c4_m2_046",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Why must you NEVER commit the entire `rkvenv/` folder into Git version control?",
    "options": [
      "Git rejects `.py` files inside folders named venv",
      "Git encrypts `site-packages` incorrectly",
      "Venvs contain OS-specific binary executables, absolute symlink/launcher paths, and gigabytes of third-party files; instead commit a pinned `requirements.txt` and rebuild the venv reproducibly",
      "Committing venv corrupts PyPI hashes"
    ],
    "correct": 2,
    "explanation": "Virtual environments are non-portable host artifacts tied to OS architecture and interpreter paths; share pinned requirements/lockfiles and regenerate venvs cleanly."
  },
  {
    "id": "q_c4_m2_047",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Which `pip` command exports all currently installed exact package versions inside the active virtual environment so teammates can reproduce the setup?",
    "options": [
      "python -m venv --freeze",
      "python -m pip export --all",
      "python -m pip backup > venv.json",
      "python -m pip freeze > requirements.txt"
    ],
    "correct": 3,
    "explanation": "`pip freeze` outputs pinned `package==version` lines ready for `pip install -r requirements.txt`."
  },
  {
    "id": "q_c4_m2_048",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Why do modern Debian, Ubuntu, and Fedora Linux distributions actively block `sudo pip install` into system Python with an 'externally-managed-environment' (PEP 668) error?",
    "options": [
      "Installing upstream PyPI packages globally via sudo executes third-party build scripts as root and overwrites OS package-manager libraries needed by `apt`/`dnf` system tools (Scenario S1)",
      "Linux lacks pip wheel support",
      "System Python cannot parse UTF-8 packages",
      "PEP 668 bans virtual environments completely"
    ],
    "correct": 0,
    "explanation": "Mixing pip-managed libraries globally into OS-managed `/usr/lib/python*` risks breaking critical administrative utilities and grants root install execution; PEP 668 enforces virtual environments per tool."
  },
  {
    "id": "q_c4_m2_049",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Notice the difference between activating a virtual environment (`rkvenv\\Scripts\\activate` or `source rkvenv/bin/activate`) vs calling `rkvenv\\Scripts\\python` (or `rkvenv/bin/python`) directly in cron/scheduled jobs. Why do automation scripts call the venv interpreter path directly?",
    "options": [
      "Activation deletes `requirements.txt`",
      "Scheduled tasks and non-interactive shells don't run terminal activation shell functions cleanly, whereas executing the venv's `python` binary directly automatically configures `sys.prefix` and `site-packages` with zero activation step needed",
      "Venv `python` binaries only run inside interactive shells",
      "Cron ignores shebang paths unless activated"
    ],
    "correct": 1,
    "explanation": "Shell `activate` only mutates PATH inside an interactive shell; invoking `/path/to/venv/bin/python script.py` directly always uses the isolated venv cleanly in automation and cron."
  },
  {
    "id": "q_c4_m2_050",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Wait: if a tool fails with `ModuleNotFoundError` inside a freshly created `venv`, how can calling `python -c \"import sys; print(sys.executable, sys.path)\"` instantly diagnose the mistake?",
    "options": [
      "It prints every PyPI dependency version online",
      "It downloads missing packages automatically",
      "It reveals whether your command accidentally invoked the system Python (`/usr/bin/python`) instead of the intended `rkvenv` interpreter",
      "It resets `sys.base_prefix`"
    ],
    "correct": 2,
    "explanation": "Printing `sys.executable` and `sys.prefix != sys.base_prefix` proves immediately which interpreter is running and whether site-packages matches the intended venv."
  },
  {
    "id": "q_c4_m2_051",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "In Case Study C04-M02-CS1 (the May 2022 `ctx` PyPI package takeover), how did the attacker compromise the published package without breaking into PyPI's infrastructure servers?",
    "options": [
      "They published a package named `ctx2` instead",
      "They exploited an integer overflow in Python 3.10",
      "They sent phishing emails directly to GitHub support",
      "They re-registered the original maintainer's expired email domain and used PyPI's password-reset workflow to take over the account, then uploaded malicious releases harvesting environment variables"
    ],
    "correct": 3,
    "explanation": "Expired maintainer domain + password reset allowed account takeover in roughly 12 minutes, resulting in ~27,000 downloads before PyPI removed the compromised releases and strengthened 2FA."
  },
  {
    "id": "q_c4_m2_052",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "What specific integrity guarantee does `pip install --require-hashes -r req.txt` enforce during installation?",
    "options": [
      "It guarantees every downloaded wheel/archive matches the exact pinned SHA-256 digest recorded in `req.txt` (stopping silently replaced or tampered files)",
      "It guarantees the author wrote zero logic bugs or backdoors when you originally pinned that version",
      "It automatically audits upstream GitHub commit signatures",
      "It installs dependencies globally with root privileges"
    ],
    "correct": 0,
    "explanation": "Hash-checking verifies binary identity (`pinned archive == downloaded archive`), blocking silent re-uploads or tampering, though you must still vet the code BEFORE pinning its hash."
  },
  {
    "id": "q_c4_m2_053",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "In Scenario S3, an engineer sees a blog recommendation for a package called `reqeusts` (misspelled from `requests`). Which supply-chain attack technique does this likely represent?",
    "options": [
      "Buffer overflow",
      "Typosquatting",
      "DNS cache poisoning",
      "ARP spoofing"
    ],
    "correct": 1,
    "explanation": "Attackers publish malicious packages under near-identical misspellings of popular libraries (`reqeusts` vs `requests`) hoping engineers mistype `pip install` or copy poisoned tutorials."
  },
  {
    "id": "q_c4_m2_054",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "When you ran the tamper simulation in Lesson 2.6 with a modified SHA-256 digest in `badreq.txt`, what did `pip install --require-hashes --force-reinstall -r badreq.txt` do?",
    "options": [
      "Installed `tabulate` anyway and logged a soft warning",
      "Installed an older cached release instead",
      "Aborted installation with `ERROR: THESE PACKAGES DO NOT MATCH THE HASHES` and left the system uncompromised",
      "Deleted `requirements.txt`"
    ],
    "correct": 2,
    "explanation": "`--require-hashes` fails closed whenever any downloaded archive diverges by even 1 bit from its pinned cryptographic SHA-256 hash."
  },
  {
    "id": "q_c4_m2_055",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Why does the `ctx` case study specifically expose secrets like AWS keys stored in host `os.environ` variables during normal runtime?",
    "options": [
      "Virtual environments leak secrets to `pip list`",
      "PyPI uploads environment files automatically",
      "Environment variables are readable over plain ICMP pings",
      "Any installed third-party Python package executes inside the same OS user process and inherits read access to environment variables and permissions of that user"
    ],
    "correct": 3,
    "explanation": "Python packages have no sandbox isolation from the calling interpreter: compromised code inside an imported dependency runs with full process privileges and can inspect `os.environ`."
  },
  {
    "id": "q_c4_m2_056",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Which PyPA command-line tool scans pinned `requirements.txt` files against the Python Packaging Advisory Database for known security vulnerabilities (CVEs)?",
    "options": [
      "pip-audit",
      "pip hash",
      "python -m doctest",
      "venv --check"
    ],
    "correct": 0,
    "explanation": "`pip-audit` checks installed packages or requirement specs against known PyPA vulnerability advisories."
  },
  {
    "id": "q_c4_m2_057",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "What practical constraint enforces completeness whenever you turn on `pip install --require-hashes -r req.txt` on a package that itself relies on sub-packages (transitive dependencies)?",
    "options": [
      "Only the top-level package requires a `--hash` entry",
      "EVERY single transitive dependency in the closure must also appear explicitly pinned with `--hash` lines in the requirements file (tools like `pip-compile --generate-hashes` automate this)",
      "Transitive dependencies automatically disable hash mode",
      "`--no-deps` installs transitive dependencies safely"
    ],
    "correct": 1,
    "explanation": "`--require-hashes` fails closed if any transitive dependency is unpinned or missing hashes; lockfile generators like `pip-tools` (`pip-compile --generate-hashes`) resolve and hash the full tree."
  },
  {
    "id": "q_c4_m2_058",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Why does installing a source distribution (`.tar.gz` sdist) from an untrusted package pose an immediate risk even BEFORE your script ever imports that package?",
    "options": [
      "Source tarballs convert `.py` into root binaries",
      "Binary `.whl` files run bash scripts during extraction",
      "Building an sdist invokes `setup.py` or build hooks during `pip install`, executing arbitrary install-time attacker code immediately under your permissions",
      "`pip download` executes `setup.py` automatically even without unpacking"
    ],
    "correct": 2,
    "explanation": "Even inspecting an untrusted sdist during `pip install` (unless pre-built wheels are enforced via `--only-binary :all:` or inspected in isolation) can run malicious install-time code in `setup.py`."
  },
  {
    "id": "q_c4_m2_059",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "In `ctx`'s case study (CS1) and enterprise security engineering, why should organizations pair `--require-hashes` + `pip-audit` with an internal approved package mirror/proxy and SBOMs?",
    "options": [
      "SBOMs replace `requirements.txt` at runtime",
      "Internal proxies encrypt SHA-256 into MD5",
      "PyPI blocks virtual environments after 10 downloads",
      "Hash pinning alone still trusts external PyPI availability and doesn't verify initial provenance; internal mirrors enforce organizational vetting, prevent dependency confusion, and generate auditable Software Bills of Materials"
    ],
    "correct": 3,
    "explanation": "Defense-in-depth combines reviewed internal mirrors/allowlists, pinned hash lockfiles, vulnerability scanning (`pip-audit`), 2FA for maintainers, and least-privilege secret handling."
  },
  {
    "id": "q_c4_m2_060",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Note carefully: a security team uses `--index-url https://pypi.org/simple` PLUS `--extra-index-url https://internal.corp/simple` for a private package `corp-siem-helper`. What severe supply-chain risk does `--extra-index-url` introduce?",
    "options": [
      "Dependency confusion: `pip` checks BOTH indexes and installs whichever has a HIGHER version number, letting an attacker register `corp-siem-helper==99.0.0` on public PyPI to hijack internal builds!",
      "SSL verification turns off on extra URLs",
      "pip deletes internal packages above version 1.0",
      "Requirements files forbid comments with extra URLs"
    ],
    "correct": 0,
    "explanation": "Combining public PyPI with `--extra-index-url` invites dependency confusion attacks: use one controlled internal proxy `--index-url` that prioritizes private namespaces."
  },
  {
    "id": "q_c4_m2_061",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "What output does running `python rkutils.py` directly from the lab folder produce?",
    "options": [
      "No output because functions are only defined",
      "rkutils self-test passed",
      "InvalidPortError",
      "ModuleNotFoundError"
    ],
    "correct": 1,
    "explanation": "Direct execution sets `__name__ == '__main__'`, triggering the two assert checks and printing `'rkutils self-test passed'`."
  },
  {
    "id": "q_c4_m2_062",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `rkutils.classify_ip(text)`, which standard library module replaces fragile IP string-prefix checks?",
    "options": [
      "math",
      "socket.prefix",
      "ipaddress",
      "re.split"
    ],
    "correct": 2,
    "explanation": "Python's built-in `ipaddress.ip_address()` accurately parses IPv4/IPv6 syntax and classifies `.is_loopback`, `.is_private`, and `.is_global`."
  },
  {
    "id": "q_c4_m2_063",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "During Practical P1 (`secutils.py`), what happens if you accidentally run the caller script from a parent directory that does NOT contain `secutils.py`?",
    "options": [
      "sys.path automatically falls back to PyPI",
      "Python searches your entire hard drive",
      "InvalidNetworkError",
      "ModuleNotFoundError: No module named 'secutils'"
    ],
    "correct": 3,
    "explanation": "Unless packaged and installed into the venv (or residing alongside the caller on `sys.path`), Python fails loudly with `ModuleNotFoundError`."
  },
  {
    "id": "q_c4_m2_064",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `m02_reusable.py` section 3, calling `parse_port('abc')` triggers `InvalidPortError` with which underlying `type(err.__cause__).__name__`?",
    "options": [
      "ValueError",
      "TypeError",
      "KeyError",
      "IndexError"
    ],
    "correct": 0,
    "explanation": "`int('abc')` raises `ValueError`, which `parse_port` chains via `raise InvalidPortError(...) from exc`."
  },
  {
    "id": "q_c4_m2_065",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "In Practical P1 (`in_any(ip_text, networks)`), suppose a caller passes `networks = [ipaddress.ip_network('10.0.0.0/8'), ipaddress.ip_network('192.168.0.0/16')]` alongside an IPv6 string `'::1'`. What subtle pitfall happens if `in_any` computes `ip in net` directly without version handling?",
    "options": [
      "Python converts IPv4 networks to IPv6 automatically",
      "In Python `ipaddress`, testing `IPv6Address('::1') in IPv4Network('10.0.0.0/8')` actually evaluates cleanly to `False` (never matching across IP versions), whereas comparing `ip < net.network_address` across IPv4 vs IPv6 raises `TypeError`!",
      "`ip in net` always raises `TypeError` between IPv6 and IPv4",
      "`is_private` raises ValueError on IPv6"
    ],
    "correct": 1,
    "explanation": "`ip in network` returns `False` safely across differing IP address families, whereas direct ordering comparisons (`ipv4 < ipv6`) raise `TypeError`; validating family assumptions explicitly keeps callers clear."
  },
  {
    "id": "q_c4_m2_066",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "In `rkutils.parse_port(value)`, look carefully at BOTH types caught in `except (TypeError, ValueError) as exc:`. Why was `TypeError` included alongside `ValueError`?",
    "options": [
      "`ValueError` only catches negative integers",
      "`TypeError` catches numbers over 65535",
      "`int('abc')` raises `ValueError`, whereas `int(None)` (or `int([])`) raises `TypeError: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'`—and both occur in section 2 of `m02_reusable.py`!",
      "Both lines mean identical input types"
    ],
    "correct": 2,
    "explanation": "Look at `inputs = ['443', '70000', 'https', None, '22']`: `'https'` raises `ValueError`, whereas `None` raises `TypeError` inside `int(value)`; catching `(TypeError, ValueError)` converts both cleanly into `InvalidPortError`."
  },
  {
    "id": "q_c4_m2_067",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "Wait: if someone passes `value = True` (a Python `bool`) into `rkutils.parse_port(True)`, what does the minimal implementation `port = int(value)` actually return—and how could a stricter production parser prevent it?",
    "options": [
      "`int(True)` raises `TypeError` automatically",
      "`0 <= True <= 65535` is False",
      "`int(True)` raises `ValueError`",
      "`int(True)` returns `1` because `bool` subclasses `int`! Stricter validators add `if isinstance(value, bool): raise InvalidPortError(...)` before calling `int(value)`"
    ],
    "correct": 3,
    "explanation": "Because `bool` inherits from `int`, `int(True) == 1` and `int(False) == 0`; rejecting booleans explicitly protects JSON API endpoints where `\"port\": true` should error instead of becoming port 1."
  },
  {
    "id": "q_c4_m2_068",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "In Practical P2 (`pip hash` on `tabulate-0.9.0-py3-none-any.whl`), why did the SHA-256 digest `024ca478...948f` remain deterministic across machines and dates for that exact wheel release?",
    "options": [
      "Cryptographic hash functions produce an identical deterministic digest for identical immutable wheel bytes, whereas tampering with even one byte inside the `.whl` completely changes the digest",
      "PyPI injects the current date into the hash",
      "`pip hash` reads only filenames, not file bytes",
      "Hashes change every Python minor release"
    ],
    "correct": 0,
    "explanation": "Once a version wheel is published to PyPI, its immutable bytes yield the exact same SHA-256 everywhere unless altered in transit or replaced."
  },
  {
    "id": "q_c4_m2_069",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "What happens if a Python function returns multiple values separated by commas, such as `return count, errors`?",
    "options": [
      "Raises SyntaxError because only one object can be returned",
      "Packages them cleanly into a tuple `(count, errors)` that callers can unpack via `n, errs = fn()`",
      "Returns only the last expression `errors`",
      "Converts both values into a dictionary"
    ],
    "correct": 1,
    "explanation": "Comma-separated return expressions implicitly create a tuple, supporting concise multi-value unpacking at the call site."
  },
  {
    "id": "q_c4_m2_070",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Which built-in interactive helper displays the function signature `parse_port(value: str | int) -> int` and its docstring automatically?",
    "options": [
      "vars(rkutils.parse_port)",
      "print(rkutils.parse_port)",
      "help(rkutils.parse_port)",
      "type(rkutils.parse_port)"
    ],
    "correct": 2,
    "explanation": "`help()` inspects `__doc__` and signature annotations to render structured online documentation right in the terminal."
  },
  {
    "id": "q_c4_m2_071",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Suppose `def connect(host, port=443, timeout=5.0):` is defined. What error triggers if a maintainer later tries to place a non-default parameter AFTER a defaulted one: `def connect(host='127.0.0.1', port, timeout=5.0):`?",
    "options": [
      "`port` defaults to None automatically",
      "`timeout` absorbs `port`",
      "Triggers ValueError only when called with 2 arguments",
      "Python rejects it at parse time with `SyntaxError: parameter without a default follows parameter with a default`"
    ],
    "correct": 3,
    "explanation": "Positional parameters without defaults must precede parameters with defaults (unless separated by `*` for keyword-only arguments)."
  },
  {
    "id": "q_c4_m2_072",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Look closely at unpacking arguments at a CALL site: given `ports = [22, 80, 443]` and `meta = {'host': 'web-01'}`, how do you pass them into `summarise(*ports, label='ports', **extra)`?",
    "options": [
      "`summarise(*ports, **meta)`",
      "`summarise(ports, meta)`",
      "`summarise(&ports, *meta)`",
      "`summarise(tuple(ports), meta)`"
    ],
    "correct": 0,
    "explanation": "Prefixing `*ports` unpacks the list into positional arguments and `**meta` unpacks dictionary pairs into keyword arguments."
  },
  {
    "id": "q_c4_m2_073",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "Why does Module 2 discourage modifying global module variables via the `global` keyword inside helper functions?",
    "options": [
      "The `global` keyword raises DeprecationWarning in Python 3.12",
      "`global` introduces hidden shared state that makes functions unpredictable, order-dependent, and hard to test in isolation",
      "Global variables become immutable after using `global`",
      "Functions cannot read global constants without `global`"
    ],
    "correct": 1,
    "explanation": "Reading module-level uppercase constants is clean, whereas mutating globals via `global` creates hidden side-effect coupling; pass inputs and return results instead."
  },
  {
    "id": "q_c4_m2_074",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "What good function design principle dictates naming helpers with clear action verbs such as `parse_port` and `classify_ip` and giving each a single responsibility?",
    "options": [
      "Using single-letter variable names to save disk space",
      "Consolidating every network, file, and alert action into one 400-line `do_all()` function",
      "Single-purpose clarity, edge validation once per boundary, and easy isolated testing",
      "Hiding input validation inside callers only"
    ],
    "correct": 2,
    "explanation": "One-job functions with descriptive verb names enforce validation consistently across every caller and verify cleanly in unit tests."
  },
  {
    "id": "q_c4_m2_075",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Compare `def tag_events(events, allow_ips=frozenset({'10.0.0.5'})):` vs `def tag_events(events, seen_ips=set()):`. Why is the `frozenset` default completely safe whereas the `set()` default is a dangerous bug?",
    "options": [
      "Both mutate across invocations",
      "`frozenset` clones itself automatically on every call",
      "`set()` raises SyntaxError in default headers",
      "`frozenset` is strictly immutable (lacks `.add`/`.remove`), so sharing one read-only default object across calls cannot corrupt subsequent invocations, unlike mutable `set()`"
    ],
    "correct": 3,
    "explanation": "Immutable defaults (`None`, `int`, `str`, `tuple`, `frozenset`) are safe to share across calls because functions cannot alter them in place."
  },
  {
    "id": "q_c4_m2_076",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "What occurs if a function has `try: ... return result` BEFORE an outer cleanup loop or inside multiple early returns, and an analyst checks whether cleanup ran? Wait: compare `try/return` with a local variable cleanup vs `finally:`!",
    "options": [
      "`return` jumps straight out, skipping any lines after `try` unless those cleanup lines sit inside a `finally:` block (or a `with` context manager)",
      "`return` waits for lines below the entire `try` block to run first",
      "`finally:` is skipped whenever `return` runs inside `try:`",
      "Early `return` inside `def` raises SyntaxError"
    ],
    "correct": 0,
    "explanation": "`finally:` is specifically designed to execute even on early `return` inside `try:` or `except:`, preventing leaked file descriptors or network handles."
  },
  {
    "id": "q_c4_m2_077",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "In larger multi-module Python projects (introduced in L03 and built further in Module 8), what file turns a directory of modules into a traditional Python package and what file declares project dependencies and entry points?",
    "options": [
      "`main.dll` and `package.json`",
      "`__init__.py` inside the package directory and `pyproject.toml` at the project root (commonly with a `src/` layout)",
      "`setup.ini` and `import.log`",
      "`__main__.py` and `.env`"
    ],
    "correct": 1,
    "explanation": "Modern Python packaging uses a `src/<pkg>/__init__.py` layout configured cleanly by a root `pyproject.toml` specification."
  },
  {
    "id": "q_c4_m2_078",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Which import syntax binds a short local alias `ru` to the imported `rkutils` module?",
    "options": [
      "import ru from rkutils",
      "alias rkutils ru",
      "import rkutils as ru",
      "from rkutils use ru"
    ],
    "correct": 2,
    "explanation": "`import module as alias` gives concise readable prefixes (`ru.parse_port`) without polluting the local namespace."
  },
  {
    "id": "q_c4_m2_079",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why does placing package source code inside a `src/` subfolder (`src/rktool/`) protect developers during local testing better than placing `rktool/` directly in the repository root?",
    "options": [
      "`src/` encrypts source code on import",
      "`__init__.py` only works inside `src/`",
      "GitHub forbids Python files outside `src/`",
      "Because CWD sits at index 0 of `sys.path`, keeping source inside `src/` forces tests to import the **installed** package inside `venv` rather than accidentally importing unbuilt local files from the root directory"
    ],
    "correct": 3,
    "explanation": "The `src/` layout guarantees you test the exact packaged/installed artifact rather than masking missing package files with accidental CWD imports."
  },
  {
    "id": "q_c4_m2_080",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "If a security engineer sets `PYTHONPATH=/opt/untrusted_plugins` globally in a shared Linux profile, what risk opens on every Python invocation without `-I` or `-E`?",
    "options": [
      "Entries in `PYTHONPATH` insert BEFORE standard library directories in `sys.path` (right after script dir), enabling arbitrary module hijacking across unrelated Python tools run by that user!",
      "`PYTHONPATH` only searches after `site-packages`",
      "`PYTHONPATH` is ignored unless `-I` is passed",
      "`PYTHONPATH` disables virtual environments permanently"
    ],
    "correct": 0,
    "explanation": "Notice the order: script dir -> `PYTHONPATH` -> stdlib -> `site-packages`. Injecting `PYTHONPATH` lets an attacker shadow standard modules for any script running under that environment unless `-I` or `-E` ignores environment vars."
  },
  {
    "id": "q_c4_m2_081",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "Order Python's five standard `logging` severity levels from lowest verbosity to highest severity.",
    "options": [
      "INFO -> DEBUG -> WARNING -> CRITICAL -> ERROR",
      "DEBUG -> INFO -> WARNING -> ERROR -> CRITICAL",
      "TRACE -> DEBUG -> ALERT -> FATAL -> CRITICAL",
      "WARNING -> INFO -> DEBUG -> ERROR -> CRITICAL"
    ],
    "correct": 1,
    "explanation": "Python's `logging` hierarchy runs: DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50)."
  },
  {
    "id": "q_c4_m2_082",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "Why should exception handlers and logs NEVER include plaintext passwords, API bearer tokens, or private keys inside log messages?",
    "options": [
      "Tokens cause `UnicodeDecodeError` in `stderr`",
      "`logging` converts secrets into floats automatically",
      "Logs frequently forward to centralized aggregators, files, or consoles readable by broader staff—creating credential disclosure and CWE-532 exposure",
      "Passwords crash `log.exception()`"
    ],
    "correct": 2,
    "explanation": "Always redact or mask sensitive credentials before emitting logs or error strings; never dump raw Authorization headers or API secrets into error output."
  },
  {
    "id": "q_c4_m2_083",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Look closely at ordering multiple `except` clauses for subclasses: `class InvalidPortError(ValueError): ...`. What happens if an analyst writes `except ValueError:` BEFORE `except InvalidPortError:`?",
    "options": [
      "InvalidPortError still triggers the second handler cleanly",
      "Both blocks run sequentially",
      "Python raises HandlerOrderSyntaxError",
      "Because `InvalidPortError` IS a `ValueError`, the broader `except ValueError:` matches first and `except InvalidPortError:` becomes dead/unreachable code! Always place specific subclasses BEFORE general parent classes"
    ],
    "correct": 3,
    "explanation": "Python checks `except` clauses top-to-bottom using `isinstance` rules: put narrow child exceptions (`InvalidPortError`) above parent classes (`ValueError`)."
  },
  {
    "id": "q_c4_m2_084",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Suppose inside `m02_reusable.py` an analyst catches an exception, logs it, and wants to let it keep propagating up to terminate the batch cleanly. What single keyword inside `except` re-raises the exact original exception preserving its full original traceback?",
    "options": [
      "`raise` (with no arguments)",
      "`throw`",
      "`raise exc` (WAIT: re-raising with explicit argument alters traceback origin unless bare `raise` is used)",
      "`continue`"
    ],
    "correct": 0,
    "explanation": "A bare `raise` inside an `except` block re-raises the active exception cleanly with its original stack frame intact (whereas `raise new_err from exc` translates to a higher-level error)."
  },
  {
    "id": "q_c4_m2_085",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Which `pip` subcommand inspects version, homepage/URL metadata, license, and dependencies of an already-installed package such as `tabulate`?",
    "options": [
      "python -m pip hash tabulate",
      "python -m pip show tabulate",
      "python -m pip info tabulate",
      "python -m pip inspect-pkg tabulate"
    ],
    "correct": 1,
    "explanation": "`pip show <pkg>` displays installed metadata, location inside `site-packages`, author, license, and `Requires`/`Required-by` dependency graph."
  },
  {
    "id": "q_c4_m2_086",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "What is the exact Windows path vs. Linux/macOS path inside `rkvenv` where the virtual environment's `python` executable resides?",
    "options": [
      "`rkvenv/python.exe` on both OSes",
      "`rkvenv\\bin\\python` on Windows; `rkvenv/Scripts/python` on Linux/macOS",
      "`rkvenv\\Scripts\\python` on Windows; `rkvenv/bin/python` on Linux/macOS",
      "`rkvenv/lib/python` on both OSes"
    ],
    "correct": 2,
    "explanation": "Standard `venv` creates `Scripts\\python.exe` on Windows and `bin/python` on POSIX (Linux/macOS) systems."
  },
  {
    "id": "q_c4_m2_087",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Why does committing an unpinned `requirements.txt` containing bare package names (such as `requests` instead of `requests==2.32.3`) undermine incident response and reproducibility?",
    "options": [
      "Unpinned specs reject virtual environments",
      "Unpinned specs downgrade Python itself",
      "pip refuses to install files without version numbers",
      "Unpinned specs pull arbitrary newest releases later during rebuilds—introducing breaking API changes, new unvetted transitive dependencies, or a freshly compromised release automatically"
    ],
    "correct": 3,
    "explanation": "Reproducibility and security review demand pinned versions (`==`) plus `--hash=sha256:...` digests so builds remain invariant until intentionally audited and upgraded."
  },
  {
    "id": "q_c4_m2_088",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "When deleting or recreating a corrupted virtual environment folder `rkvenv`, why can you safely delete the entire `rkvenv` directory (as instructed in Practical P2 Cleanup) without losing project work?",
    "options": [
      "Because your own `.py` source files, tests, and `requirements.txt` live outside `rkvenv` in your project directory while `rkvenv` holds only disposable, reproducible third-party installs",
      "Python moves your scripts into `sys.base_prefix` automatically",
      "`pip freeze` restores deleted source `.py` files",
      "Deleting `rkvenv` keeps packages cached inside `sys.path[0]`"
    ],
    "correct": 0,
    "explanation": "Never write your own scripts inside `rkvenv/`; keep code and pinned lockfiles alongside it so `rkvenv` stays completely disposable and rebuildable."
  },
  {
    "id": "q_c4_m2_089",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Which `pip` subcommand downloads `tabulate==0.9.0` without installing it or running build scripts (`--no-deps`), allowing analysts to inspect or hash the file offline first?",
    "options": [
      "python -m pip fetch tabulate==0.9.0",
      "python -m pip download tabulate==0.9.0 --no-deps -d dl",
      "python -m pip preview tabulate==0.9.0",
      "python -m pip freeze tabulate==0.9.0"
    ],
    "correct": 1,
    "explanation": "`pip download` retrieves distribution files cleanly into directory `dl` for inspection and `pip hash` calculation."
  },
  {
    "id": "q_c4_m2_090",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Which security control did PyPI adopt across critical and publishing accounts following supply-chain takeovers such as the 2022 `ctx` incident?",
    "options": [
      "Banning open-source packages under 1,000 lines",
      "Removing SHA-256 support from wheels",
      "Mandatory two-factor authentication (2FA) for publishing accounts",
      "Disabling virtual environments"
    ],
    "correct": 2,
    "explanation": "PyPI deployed mandatory 2FA protections and account hardening so domain expiration + email password reset alone cannot hijack publishing accounts."
  },
  {
    "id": "q_c4_m2_091",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "What warning did the content team note in Practical P2 as harmless during pip testing (`WARNING: Cache entry deserialization failed, entry ignored`), and why does ignoring corrupt cache entries safely maintain security?",
    "options": [
      "It proves a MITM attacker breached localhost",
      "You must delete Python and reinstall Windows",
      "It corrupts installed wheel files permanently",
      "`pip` treats its local HTTP cache purely as an untrusted performance hint—when a cached entry fails deserialization or hash checks, `pip` discards it safely and re-fetches/verifies from the index"
    ],
    "correct": 3,
    "explanation": "Corrupt/stale cache metadata simply causes `pip` to ignore the broken cache item cleanly; cryptographic integrity still hinges on TLS and `--require-hashes` verification."
  },
  {
    "id": "q_c4_m2_092",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Wait: why is running `python -m pip download somepkg --no-deps` on an `.tar.gz` *source distribution* (sdist) STILL subtly risky if `pip` decides it needs to run metadata extraction locally?",
    "options": [
      "Wait—if only an sdist exists without `PKG-INFO`/wheel metadata, `pip download` may invoke PEP 517 build metadata hooks locally (unless `--no-build-isolation` / inspecting raw files directly with `curl`/PyPI JSON or `--only-binary :all:` is used!)",
      "`pip download` never unpacks anything",
      "`.tar.gz` files cannot contain Python code",
      "`--no-deps` verifies GPG signatures automatically"
    ],
    "correct": 0,
    "explanation": "Even `pip download` on dynamic sdists without cached static metadata may unpack and run metadata hooks; `--only-binary :all:` or direct PyPI archive download avoids install-hook execution before code review."
  },
  {
    "id": "q_c4_m2_093",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Which `def` statement header correctly declares default parameter `timeout` equal to `5.0`?",
    "options": [
      "def fetch(url, timeout:=5.0):",
      "def fetch(url, timeout=5.0):",
      "function fetch(url, timeout=5.0):",
      "def fetch(timeout=5.0, url):"
    ],
    "correct": 1,
    "explanation": "Python uses `def`, `param=default`, and requires non-default parameters (`url`) to precede defaulted ones (`timeout=5.0`)."
  },
  {
    "id": "q_c4_m2_094",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "Why should input parsing and validation live inside dedicated boundary functions like `parse_port` rather than scattered inline across 12 scripts?",
    "options": [
      "Inline validation cannot use `int()`",
      "Functions compile into `.so` shared libraries automatically",
      "Centralizing validation in one well-tested function ensures consistent edge checks (`0 <= port <= 65535`, chains, error messages) for every caller simultaneously",
      "Scripts longer than 50 lines fail to run"
    ],
    "correct": 2,
    "explanation": "Single-source boundary validation eliminates inconsistencies where 11 callers validate bounds and 1 caller forgets."
  },
  {
    "id": "q_c4_m2_095",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Which attribute inside Python's `sys` module holds the ordered list of directory paths searched when resolving `import ...` statements?",
    "options": [
      "os.classpath",
      "sys.imports",
      "sys.modules_dir",
      "sys.path"
    ],
    "correct": 3,
    "explanation": "`sys.path` is the exact list of strings inspected sequentially during `import` lookup."
  },
  {
    "id": "q_c4_m2_096",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "In `try / except / else / finally`, why is moving `valid.append(port)` into the `else:` suite cleaner than placing it on the line right inside `try:` after `parse_port(raw)`?",
    "options": [
      "Keeping only the risky operation inside `try:` ensures `except InvalidPortError:` cannot accidentally mask unrelated errors thrown by subsequent processing logic",
      "`valid.append()` cannot run inside `try:`",
      "`else:` automatically writes logs to syslog",
      "`try:` ignores `list.append()`"
    ],
    "correct": 0,
    "explanation": "Minimal `try:` scope avoids catching exceptions from the wrong line (the smaller the `try:` block, the clearer the failure boundary)."
  },
  {
    "id": "q_c4_m2_097",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "How do you cleanly recreate an entire project's package environment on a new SOC workstation from a committed `requirements.txt`?",
    "options": [
      "Copy `rkvenv/` across a USB stick across OS architectures",
      "Create a fresh `venv` (`python -m venv rkvenv`) and run `rkvenv/bin/python -m pip install -r requirements.txt`",
      "Run `sudo pip install *`",
      "Paste `requirements.txt` into `sys.path`"
    ],
    "correct": 1,
    "explanation": "Rebuilding a fresh virtual environment from pinned `requirements.txt` guarantees clean cross-machine reproducibility."
  },
  {
    "id": "q_c4_m2_098",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Before adopting a small third-party PyPI library into an internal incident-response tool, which checks help filter risky or dormant dependencies?",
    "options": [
      "Disable HTTPS verification on PyPI mirrors",
      "Choose whichever package appeared first in an AI blog comment",
      "Verify if the standard library suffices, inspect active maintainers, release history, linked source repository, run `pip-audit`, and pin exact versions with hashes",
      "Install into `/usr/bin` with sudo so all users see it"
    ],
    "correct": 2,
    "explanation": "Every third-party dependency runs with your process privileges—prefer stdlib first, then thoroughly vet maintenance health and pin cryptographically."
  },
  {
    "id": "q_c4_m2_099",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "Inspect `m02_reusable.py` section 4 (`classify_ip('999.1.1.1')`). What message runs cleanly in the output?",
    "options": [
      "4. 999.1.1.1 -> global",
      "4. 999.1.1.1 -> special",
      "Unhandled traceback crash",
      "4. 999.1.1.1 -> invalid: '999.1.1.1' does not appear to be an IPv4 or IPv6 address"
    ],
    "correct": 3,
    "explanation": "`m02_reusable.py` catches `ValueError` around `rkutils.classify_ip(text)` and logs `'invalid:'` with Python's clear `ipaddress` error description."
  },
  {
    "id": "q_c4_m2_100",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "What output does `m02_reusable.py` section 5 print comparing `buggy_total([1, 2, 3])`, `better_total([1, 2, 3])`, and `better_total([])`?",
    "options": [
      "5. buggy: 0 | better: 2.0 | better(empty): 0",
      "5. buggy: 2.0 | better: 2.0 | better(empty): Error",
      "5. buggy: NameError | better: 2.0 | better(empty): 0",
      "5. buggy: 0 | better: 6 | better(empty): None"
    ],
    "correct": 0,
    "explanation": "Exact execution-tested output: bare except masked `valuez` NameError to `0`, while `better_total` divides `6 / 3 = 2.0` and safely catches `ZeroDivisionError` on `[]` to return `0`."
  },
  {
    "id": "q_c4_m2_101",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Consider `def alert(user: str, failures: int, *, notify: bool = True) -> None:`. Which call succeeds cleanly without raising `TypeError`?",
    "options": [
      "`alert('asha', 3, True)`",
      "`alert('asha', 3, notify=False)`",
      "`alert(user='asha', 3)`",
      "`alert('asha')`"
    ],
    "correct": 1,
    "explanation": "`*` forces `notify` to be keyword-only (rejecting `True` positionally), positional args cannot follow keyword args (`user='asha', 3`), and `failures` has no default."
  },
  {
    "id": "q_c4_m2_102",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Notice the difference between `add_ip('10.0.0.5')` with default `seen=[]` vs passing an explicit caller list `my_seen = []; add_ip('10.0.0.5', my_seen)`. Even with the safer `seen=None` fix (`seen = [] if seen is None else seen`), what happens if a caller explicitly passes `my_seen` and expects `add_ip` NOT to mutate `my_seen`?",
    "options": [
      "`seen is None` disables `.append()`",
      "Python copies lists automatically when passed as arguments",
      "`seen = [] if seen is None else seen` still mutates the caller's `my_seen` in place unless copied (`seen = [] if seen is None else list(seen)`)",
      "Using `=` on lists duplicates the heap object"
    ],
    "correct": 2,
    "explanation": "Assigning `seen = seen` leaves caller's object aliased; if pure non-mutating behavior is expected, clone caller sequences via `list(seen)`."
  },
  {
    "id": "q_c4_m2_103",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "If you invoke `python -c \"import rkutils\"` while sitting inside a directory containing `rkutils.py`, what value is `sys.path[0]` inside that `-c` process?",
    "options": [
      "`sys.path[0]` is skipped under `-c`",
      "The standard library `/usr/lib/python3.12`",
      "`rkutils.py` cannot be found with `-c`",
      "`''` (empty string representing the current working directory—meaning CWD still beats the entire standard library!)"
    ],
    "correct": 3,
    "explanation": "In interactive REPL or `python -c ...`, `sys.path[0]` is `''` (CWD), which is why launching REPL or `python -c` inside an untrusted folder (without `-I` or `-P`) enables planted-module hijacking!"
  },
  {
    "id": "q_c4_m2_104",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "What happens if an engineer runs `python` on a daemon script where a loop wraps `open(...)` inside `try:`, hits an unhandled exception BEFORE returning, and omits `finally:` / `with`?",
    "options": [
      "OS file descriptors/sockets leak open until garbage collection or process exit, eventually triggering `OSError: [Errno 24] Too many open files` in long-running sensors",
      "Python automatically closes every local handle synchronously on every raise",
      "`except` closes all sockets globally",
      "No file can stay open past 1 second"
    ],
    "correct": 0,
    "explanation": "Relying on garbage collection leaves file handles/sockets dangling under sustained error loads; always manage resources using `with` (Module 3) or explicit `try ... finally: handle.close()`."
  },
  {
    "id": "q_c4_m2_105",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Suppose a team uses `pip freeze > requirements.txt` inside a cluttered developer laptop venv that happens to have `pytest`, `jupyter`, and old trial packages alongside production dependencies. Why is blindly freezing a dirty dev venv problematic?",
    "options": [
      "`pip freeze` skips standard library modules automatically",
      "Freezing an untidy venv ships unneeded bloat and vulnerable test/notebook packages into production containers; build a clean minimal venv from explicit direct dependencies (or `pip-compile`) instead",
      "`pip freeze` writes broken SHA-256 digests",
      "`requirements.txt` rejects test packages"
    ],
    "correct": 1,
    "explanation": "Every unnecessary package pulled into production widens vulnerability exposure (`pip-audit` surface) and attack risk; freeze strictly from clean, single-purpose virtual environments or dedicated lockfiles."
  },
  {
    "id": "q_c4_m2_106",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Wait: if you inspect a wheel vs a source tarball, can a tampered `.whl` archive STILL contain arbitrary executable code inside `.py` files when imported even though wheels bypass `setup.py` at install time?",
    "options": [
      "No, wheels can only store JSON data",
      "Wheels run in a WebAssembly sandbox automatically",
      "Yes! Importing any malicious `.py` module inside a `.whl` executes its top-level module code under your user permissions—which is why cryptographic hash pinning (`--require-hashes`), vetting, and `pip-audit` apply to ALL distributions, wheels included",
      "PyPI scans and blocks 100% of backdoors instantly"
    ],
    "correct": 2,
    "explanation": "Skipping `setup.py` install hooks helps avoid *install-time* execution, yet malicious runtime code inside imported wheel modules (like `ctx` harvesting `os.environ`) runs as soon as your program imports it."
  },
  {
    "id": "q_c4_m2_107",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Where must a function's docstring sit in order for Python to bind it to `fn.__doc__`?",
    "options": [
      "Immediately above the `def` keyword as a `#` comment",
      "Inside an optional `doc=` parameter",
      "Right before the final `return` statement",
      "As the very first expression statement inside the indented `def` body"
    ],
    "correct": 3,
    "explanation": "Only a string literal positioned as the first statement of the function block populates `__doc__`."
  },
  {
    "id": "q_c4_m2_108",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Analyze `def append_tag(item, tags=()):`: why might someone call `tags.append(...)` accidentally inside and trigger an error vs `tags = (*tags, item)`?",
    "options": [
      "Tuples lack `.append()`, raising `AttributeError` immediately instead of silently corrupting subsequent callers' defaults like `tags=[]` does",
      "Tuples support `.append()` only on strings",
      "`(*tags, item)` mutates `tags` in place",
      "`()` allocates a dict"
    ],
    "correct": 0,
    "explanation": "Choosing an immutable tuple default or `None` makes accidental mutation fail cleanly instead of causing multi-call state leakage."
  },
  {
    "id": "q_c4_m2_109",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "What happens if an inner function tries to read a module-level constant `WELL_KNOWN_MAX = 1023` WITHOUT reassigning it?",
    "options": [
      "Raises UnboundLocalError unless `global WELL_KNOWN_MAX` is present",
      "Reads `1023` cleanly via Python's Global scope lookup",
      "Converts `1023` into None",
      "Resets `WELL_KNOWN_MAX` to 0"
    ],
    "correct": 1,
    "explanation": "Reading module-level constants requires no `global` declaration and is idiomatic Python."
  },
  {
    "id": "q_c4_m2_110",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Suppose `def check_threshold(failures):` raises `TypeError` on `None` silently because it skips validation, crashing deep inside a 6-layer call stack. Why does edge validation prevent obscure nested crashes?",
    "options": [
      "Python ignores exceptions past depth 5",
      "Deep stack frames disable tracebacks",
      "Validating/converting all external inputs at entry produces clear, contextual domain errors (`InvalidPortError('not a number: None')`) before internal logic ever runs on bad state",
      "Validating early removes the need for unit tests"
    ],
    "correct": 2,
    "explanation": "Validating at module/program boundaries turns opaque internal errors (`TypeError` deep in math code) into clear actionable boundary failures."
  },
  {
    "id": "q_c4_m2_111",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "What module in Python's standard library safely classifies IPv4 and IPv6 addresses without regex hacks?",
    "options": [
      "collections.net",
      "urllib.ip",
      "sys.ip",
      "ipaddress"
    ],
    "correct": 3,
    "explanation": "The built-in `ipaddress` module handles address parsing, CIDR networks, and private/loopback/global checks."
  },
  {
    "id": "q_c4_m2_112",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "If `packages/sec/net.py` exists inside a structured package with `packages/sec/__init__.py`, how does code inside `packages/sec/cli.py` cleanly import `parse_port` from sibling `net.py`?",
    "options": [
      "Relative `from .net import parse_port` (when executed via package `-m sec.cli`) or absolute `from sec.net import parse_port`",
      "`import ../net`",
      "`include net.py`",
      "`sys.reload('net')`"
    ],
    "correct": 0,
    "explanation": "Explicit package imports (`from sec.net import ...` or intra-package relative `from .net import ...` when run as a module `-m`) prevent brittle `sys.path` mutations."
  },
  {
    "id": "q_c4_m2_113",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "What happens if an unhandled exception propagates all the way past the top level of a script with no catching `except` block?",
    "options": [
      "Python terminates cleanly with exit code 0",
      "Python prints the full traceback to `stderr` and exits with a non-zero exit code (`1`)",
      "Python retries the failed line three times",
      "Python logs to `syslog` only"
    ],
    "correct": 1,
    "explanation": "Uncaught exceptions fail loudly by writing diagnostic tracebacks to `stderr` and returning a non-zero exit status to the calling shell or scheduler."
  },
  {
    "id": "q_c4_m2_114",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Wait: compare `raise new_err from exc` against bare `raise new_err` INSIDE an `except` block. What attribute distinguishes explicit chaining (`from exc`) vs accidental implicit chaining?",
    "options": [
      "Both populate `__cause__` identically",
      "Implicit chaining drops `sys.path`",
      "`raise new_err from exc` sets `err.__cause__ = exc` explicitly (as inspected by `m02_reusable.py` section 3), whereas bare `raise new_err` sets `err.__context__` implicitly while leaving `__cause__` as `None`",
      "`from exc` suppresses tracebacks"
    ],
    "correct": 2,
    "explanation": "Notice `m02_reusable.py` line 37 specifically prints `type(err.__cause__).__name__` (`'ValueError'`), which is populated strictly via explicit `raise ... from exc`."
  },
  {
    "id": "q_c4_m2_115",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "When removing an obsolete package `oldpkg` from an active virtual environment cleanly, which `pip` command should you run?",
    "options": [
      "python -m pip delete oldpkg",
      "rm -rf oldpkg",
      "python -m venv --remove oldpkg",
      "python -m pip uninstall oldpkg"
    ],
    "correct": 3,
    "explanation": "`python -m pip uninstall <pkg>` cleanly removes package files and metadata from the target venv."
  },
  {
    "id": "q_c4_m2_116",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "If `python -m pip list` shows package `foo 2.1.0` inside your host Python, why does importing `foo` fail with `ModuleNotFoundError` inside a freshly created `rkvenv`?",
    "options": [
      "`venv` isolates `site-packages` intentionally by default (`include-system-site-packages = false`), preventing accidental host dependency pollution",
      "Python 3 breaks wheels across folders",
      "`pip list` reads remote PyPI servers",
      "You forgot to set `PYTHONPATH='.'`"
    ],
    "correct": 0,
    "explanation": "Isolation is the entire security and reproducibility point of `venv`: host packages stay invisible unless explicitly pinned and installed inside `rkvenv`."
  },
  {
    "id": "q_c4_m2_117",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Why does downloading a pinned wheel and pinning `--hash=sha256:...` still NOT replace checking whether the package itself was safe when first selected?",
    "options": [
      "SHA-256 ignores `.py` files inside wheels",
      "SHA-256 verifies that bytes match what you hashed earlier, NOT that the code inside those bytes was free of malicious backdoors or vulnerabilities",
      "PyPI changes SHA-256 hashes every 24 hours",
      "`--require-hashes` runs `pip-audit` implicitly"
    ],
    "correct": 1,
    "explanation": "Cryptographic hashes establish tamper-evident identity ('same bytes as before'), not semantic safety ('benign code')."
  },
  {
    "id": "q_c4_m2_118",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "In `badreq.txt` during Practical P2, why is modifying just ONE hex character inside the pinned `--hash=sha256:...` string guaranteed to block installation?",
    "options": [
      "pip fails syntax validation on lowercase hex",
      "pip truncates SHA-256 hashes to 4 bytes",
      "Cryptographic hash verification demands an exact 256-bit match; changing one nibble alters the target digest, causing `--require-hashes` to abort without modifying `site-packages`",
      "`--force-reinstall` skips hash checks"
    ],
    "correct": 2,
    "explanation": "Even a 1-bit mismatch fails the equality test cleanly with `THESE PACKAGES DO NOT MATCH THE HASHES`, protecting integrity."
  },
  {
    "id": "q_c4_m2_119",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `rkutils.classify_ip('10.0.0.5')`, what string category does the function return?",
    "options": [
      "'special'",
      "'loopback'",
      "'global'",
      "'private'"
    ],
    "correct": 3,
    "explanation": "RFC 1918 address `10.0.0.5` is not loopback (`127.0.0.0/8`) and matches `ip.is_private`, returning `'private'`."
  },
  {
    "id": "q_c4_m2_120",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "Notice the branch order inside `rkutils.classify_ip`: `if ip.is_loopback:` appears BEFORE `if ip.is_private:`. Why is ordering `is_loopback` first essential in Python 3?",
    "options": [
      "Loopback `127.0.0.1` ALSO returns `True` for `ip.is_private` in Python `ipaddress`! Checking `is_private` first would mislabel `127.0.0.1` as `'private'` instead of `'loopback'`",
      "`ip.is_private` raises ValueError on `127.0.0.1`",
      "`127.0.0.1` has `is_global == True`",
      "`ipaddress` forbids checking `is_loopback` second"
    ],
    "correct": 0,
    "explanation": "Because non-global ranges overlap (`127.0.0.1` has `is_private == True` and `is_loopback == True`), putting the more specific `is_loopback` test first keeps `127.0.0.1 -> loopback` accurate!"
  },
  {
    "id": "q_c4_m2_121",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "What happens if a caller passes too many positional arguments to a two-parameter function `def check(host, port):` without `*args`?",
    "options": [
      "Extra arguments are silently ignored",
      "Raises TypeError: check() takes 2 positional arguments but 3 were given",
      "Extra arguments pack into a dict",
      "Python pads None values"
    ],
    "correct": 1,
    "explanation": "Python enforces parameter arity strictly at call time, raising `TypeError` on unexpected positional or keyword arguments."
  },
  {
    "id": "q_c4_m2_122",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Why might an analyst include `logging.basicConfig(level=logging.INFO, format='%(levelname)s %(message)s')` inside `m02_reusable.py` (the CLI script) rather than inside `rkutils.py` (the library module)?",
    "options": [
      "`basicConfig` silently fails inside modules",
      "`logging` only works inside `__main__`",
      "Libraries should NEVER configure global root logging handlers—creating loggers via `logging.getLogger(__name__)` lets the calling application decide log format, verbosity, and file/console output destinations",
      "Modules cannot use `logging.WARNING`"
    ],
    "correct": 2,
    "explanation": "Library modules expose a module-named logger (`logging.getLogger(__name__)`) without calling `basicConfig()`, avoiding conflicting handler configurations when imported by different applications."
  },
  {
    "id": "q_c4_m2_123",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Why is `if not 0 <= port <= 65535: raise InvalidPortError(...)` preferred over using `assert 0 <= port <= 65535` for validating untrusted user/network input inside production functions?",
    "options": [
      "`assert` raises ValueError cleanly",
      "`assert` cannot test integer ranges",
      "`if` runs slower by 50x",
      "`assert` statements are stripped completely when Python runs with `-O` (optimized mode), disabling security validation silently, whereas explicit `if` + `raise` always executes"
    ],
    "correct": 3,
    "explanation": "`assert` is strictly for internal developer self-tests (like `rkutils.py`'s `__main__` assertions); NEVER use `assert` to enforce untrusted input validation or access control."
  },
  {
    "id": "q_c4_m2_124",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Look at `m02_reusable.py`: `parse_port` accepts `str | int`. Why does `def parse_port(value: str | int) -> int:` avoid returning `None` on invalid input `'https'`?",
    "options": [
      "`None` forces every caller to write `if p is not None:` checks (and arithmetic `p + 1` crashes unpredictably downstream if forgotten), whereas raising `InvalidPortError` forces explicit handling right at the boundary",
      "`None` cannot be serialized by `print()`",
      "Returning `None` leaks passwords",
      "Python forbids returning `None` alongside integers"
    ],
    "correct": 0,
    "explanation": "Explicit exceptions align with EAFP/loud-failure design so callers cannot forget error handling and slip `None` into numeric code."
  },
  {
    "id": "q_c4_m2_125",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why is splitting a 600-line monolithic incident script into a reusable utility module (`rkutils.py`) and thin CLI caller (`m02_reusable.py`) beneficial?",
    "options": [
      "Monolithic scripts cannot exceed 500 lines in Python",
      "Helper functions become cleanly importable by unit tests (Module 8) and sibling automation scripts without duplicating validation rules",
      "Importing splits automatically across multiple CPUs",
      "Separating modules skips virtual environments"
    ],
    "correct": 1,
    "explanation": "Modular design separates testable pure logic cleanly from CLI orchestration and script entry points."
  },
  {
    "id": "q_c4_m2_126",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Suppose a developer runs `python C:\\untrusted_downloads\\helper.py` where the folder `untrusted_downloads` also holds a malicious `subprocess.py`. Even if the developer's current working directory is their home folder `C:\\Users\\analyst`, does the planted `subprocess.py` still hijack `helper.py`'s `import subprocess`?",
    "options": [
      "No, only CWD sits on `sys.path[0]`",
      "Only if `helper.py` calls `os.chdir()`",
      "YES! For script execution (`python path/to/helper.py`), Python puts the **script's own directory** (`C:\\untrusted_downloads`) onto `sys.path[0]`, NOT CWD!",
      "Windows protects `subprocess` via registry locks"
    ],
    "correct": 2,
    "explanation": "Running a script located in an untrusted folder places THAT folder at `sys.path[0]`, even when launched from a safe CWD! Never execute unvetted scripts inside shared/Downloads folders without `-I`."
  },
  {
    "id": "q_c4_m2_127",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "In `try ... except InvalidPortError as err:`, what does the `as err` clause bind to inside the `except` suite?",
    "options": [
      "The module string name",
      "A boolean flag `True`",
      "The integer line number of the error",
      "The caught exception object instance, giving access to its message, arguments, and `__cause__`"
    ],
    "correct": 3,
    "explanation": "Binding `as err` captures the exception object for logging (`%s`), inspection (`err.__cause__`), or structured error reporting."
  },
  {
    "id": "q_c4_m2_128",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Suppose an operations pipeline has `except OSError as err: log.exception('read failed')` inside a loop processing 50 log files. Compare two choices for critical startup config vs individual corrupt log entries inside the batch:",
    "options": [
      "Crash/abort on missing required startup config/rules (fail-closed!), while catching specific parse errors per malformed log record cleanly so one bad line does not halt forensics on the other 49 files",
      "Swallow startup config missing errors silently with `pass` too",
      "Crash immediately on any malformed character inside one log line",
      "Retry missing config files infinitely"
    ],
    "correct": 0,
    "explanation": "Context determines recovery policy: fail loudly and immediately when startup security policy/baselines are broken; log and skip cleanly when handling individually corrupt telemetry records."
  },
  {
    "id": "q_c4_m2_129",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "If `python -m venv rkvenv` creates a virtual environment on a Linux server, how do you install `tabulate==0.9.0` inside it WITHOUT activating the environment in your shell first?",
    "options": [
      "pip install --venv rkvenv tabulate==0.9.0",
      "rkvenv/bin/python -m pip install tabulate==0.9.0",
      "sudo pip install tabulate==0.9.0",
      "python -m venv install tabulate==0.9.0"
    ],
    "correct": 1,
    "explanation": "Invoking `rkvenv/bin/python -m pip ...` directly targets the virtual environment cleanly regardless of shell activation."
  },
  {
    "id": "q_c4_m2_130",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "What subtle failure hits an analyst who creates `rkvenv` on their Windows 11 laptop, installs packages into it, and tries to mount/run that exact `rkvenv` directory inside a Linux Docker container?",
    "options": [
      "`pip` converts `.pyd` to `.so` dynamically at runtime",
      "Linux runs `.exe` Python binaries seamlessly",
      "Windows `.exe` binaries (`Scripts\\python.exe`), Windows CRLF scripts, and C-extension `.pyd` wheels are binary-incompatible with Linux (`bin/python`, `.so` ELF wheels)—always rebuild the venv inside the target container from `requirements.txt`",
      "Virtual environments are pure platform-independent ZIPs"
    ],
    "correct": 2,
    "explanation": "Venvs bind host executables and compiled native extensions to the creation OS/architecture; rebuild fresh inside target environments using pinned lockfiles."
  },
  {
    "id": "q_c4_m2_131",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "Why does Course 04 recommend reviewing a dormant PyPI package carefully if it suddenly publishes an unexpected new release after years of inactivity (as happened in `ctx`)?",
    "options": [
      "Dormant packages always lose their SHA-256 hashes",
      "Old packages expire automatically unless downloaded yearly",
      "Python stops supporting modules unchanged for 12 months",
      "Sudden activity on an abandoned package is a classic signal of maintainer account takeover (expired email domains, leaked tokens) or repository ownership transfer to an attacker"
    ],
    "correct": 3,
    "explanation": "Unexpected sudden commits or minor releases on quiescent packages warrant inspecting source diffs and maintainer logs before upgrading."
  },
  {
    "id": "q_c4_m2_132",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "In `pip download tabulate==0.9.0 --no-deps -d dl` + `pip hash dl/*.whl`, why is generating hashes from PyPI wheels locally and immediately committing `req.txt` ONLY half the verification story if the workstation downloaded over an unverified or MITM network?",
    "options": [
      "You should cross-check freshly hashed digests against upstream official release checksums/PyPI metadata/JSON API or vetted internal mirrors before freezing trust into `req.txt`",
      "Wait—`pip download` uses unencrypted FTP by default",
      "Local hashing modifies wheel headers",
      "Hex strings reverse themselves on Windows"
    ],
    "correct": 0,
    "explanation": "Verify downloaded packages (provenance, PyPI JSON hashes, source repo tags, `pip-audit`) *before* pinning their SHA-256 into `requirements.txt`—because `--require-hashes` only locks in whatever digest you recorded."
  },
  {
    "id": "q_c4_m2_133",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "What output prints for `1.` in `m02_reusable.py` when calling `rkutils.summarise(22, 80, 443, 8443)`?",
    "options": [
      "1. ports: 4 total, 2 well-known",
      "1. ports: 4 total, 3 well-known",
      "1. admin: 4 total, 3 well-known",
      "1. ports: 3 total, 3 well-known"
    ],
    "correct": 1,
    "explanation": "Ports 22, 80, and 443 are `<= 1023` (3 well-known) out of 4 total arguments (`8443 > 1023`), printing `1. ports: 4 total, 3 well-known`."
  },
  {
    "id": "q_c4_m2_134",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "Examine `rkutils.py`: `def summarise(*ports: int, label: str = 'ports', **extra: str) -> str:`. What subtle defect occurs if someone passes `summarise(22, 443, host='web-01', env='prod')` vs `summarise(22, 443, host=123)`?",
    "options": [
      "Keyword arguments cannot hold integers in Python",
      "Python automatically raises `TypeError` whenever an int violates `**extra: str`",
      "Because f-string formatting `f', {key}={val}'` calls `str(val)` implicitly, `host=123` actually succeeds at runtime despite the `**extra: str` type hint—reminding you that Python type hints are advisory unless enforced by `mypy` or runtime checks!",
      "`sorted(extra.items())` rejects non-string values"
    ],
    "correct": 2,
    "explanation": "Runtime Python ignores type hints (`str`, `int`) during execution—static tools like `mypy` catch type-hint violations in CI while runtime validation guards real boundary data."
  },
  {
    "id": "q_c4_m2_135",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Inside a defensive helper function, what happens immediately after a `return` statement executes?",
    "options": [
      "All local variables become global",
      "The remaining lines inside the function still run before exiting",
      "Python jumps back to line 1 of the file",
      "The remaining statements inside that function body are skipped and execution resumes at the caller"
    ],
    "correct": 3,
    "explanation": "`return` immediately terminates execution of the active function frame (though enclosing `finally:` blocks still run on the way out)."
  },
  {
    "id": "q_c4_m2_136",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Consider writing a predicate helper: `def is_high_port(port: int) -> bool: return port > 1023`. Why is returning `port > 1023` directly cleaner than `if port > 1023: return True else: return False`?",
    "options": [
      "Comparison expressions already evaluate to exact `bool` values (`True` or `False`), avoiding redundant verbose branching",
      "`if/else` returns strings instead of booleans",
      "Direct return omits type checking",
      "`if/else` creates a global reference"
    ],
    "correct": 0,
    "explanation": "Concise boolean returns express predicate intent cleanly without redundant `if ... return True else return False` clutter."
  },
  {
    "id": "q_c4_m2_137",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "If a function validates ports and raises `InvalidPortError` on malformed text, which design pattern does this follow: 'Look Before You Leap (LBYL)' vs 'Easier to Ask Forgiveness than Permission (EAFP)'?",
    "options": [
      "Silent suppression with `return -1`",
      "Pythonic exception-driven EAFP around `try: int(value) except (TypeError, ValueError):` combined with explicit range boundaries",
      "Checking every character with manual regex instead of `try/except`",
      "Global flag variable polling"
    ],
    "correct": 1,
    "explanation": "Python encourages EAFP (`try: int(val) except ValueError`) for conversions paired with explicit domain-range assertions."
  },
  {
    "id": "q_c4_m2_138",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Suppose a security audit reviews: `def get_user_alerts(user, cache={}): ...`. Even if the function only WRITES keys into `cache` without looping over it, why does `cache={}` STILL leak data across unrelated users?",
    "options": [
      "Dictionaries inside defaults become sets",
      "`{}` resets itself only when empty",
      "Because Python evaluates `{}` once at definition time, `cache` accumulates entries forever across independent calls—leaking one tenant/user's alert state to subsequent callers that omit `cache`",
      "Python forbids default `{}` at parse time"
    ],
    "correct": 2,
    "explanation": "Mutable dict/set/list defaults cause cross-request memory bloat and multi-tenant data leakage! Always use `None` defaults."
  },
  {
    "id": "q_c4_m2_139",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "How can an engineer check the exact filesystem path from which Python imported a module named `json` (to spot a planted hijacker)?",
    "options": [
      "`help(json)` only",
      "`print(json.__name__)`",
      "`print(dir(json))`",
      "`print(json.__file__)`"
    ],
    "correct": 3,
    "explanation": "Inspecting `module.__file__` immediately prints the loaded source `.py` path (exposing unexpected `./json.py` hijacks in current working folders)."
  },
  {
    "id": "q_c4_m2_140",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why might Python 3 successfully import a directory named `rkpkg/` even WITHOUT an `__init__.py` file inside it—and why is putting an explicit `__init__.py` still recommended for regular security packages?",
    "options": [
      "Directories without `__init__.py` become PEP 420 namespace packages silently if any matching folder name appears anywhere on `sys.path`, whereas explicit `__init__.py` creates a regular package with clear boundaries and package initialization control",
      "Directories without `__init__.py` cannot contain `.py` files on Windows",
      "`__init__.py` prevents syntax errors inside submodules",
      "Namespace packages run twice faster"
    ],
    "correct": 0,
    "explanation": "Namespace packages omit `__init__.py` cleanly for multi-repo plugins, yet accidental name shadowing across `sys.path` folders makes explicit `__init__.py` safer and clearer for normal packages."
  },
  {
    "id": "q_c4_m2_141",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "Why does `class InvalidNetworkError(ValueError): pass` satisfy Python's custom exception pattern completely with just a two-line class definition?",
    "options": [
      "Two-line classes bypass `ValueError` catching",
      "Inheriting from `ValueError` inherits `.args`, formatting, traceback tracking, and compatibility with standard handlers automatically",
      "`pass` makes the exception invisible to `try`",
      "Custom exceptions require `import exceptions` in Python 3"
    ],
    "correct": 1,
    "explanation": "Minimal custom exception classes inherit all machinery from built-in exceptions like `ValueError` or `OSError` cleanly."
  },
  {
    "id": "q_c4_m2_142",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Trace execution order inside: `def f(): try: return 1 finally: return 2`. What surprising value does `f()` return—and why do linters flag `return` inside `finally:`?",
    "options": [
      "Returns `1` cleanly",
      "Raises SyntaxError",
      "Returns `2`, silently discarding `1` AND silencing any unhandled exception raised inside `try:`! Never place `return`, `break`, or `continue` inside a `finally:` suite",
      "Returns `(1, 2)`"
    ],
    "correct": 2,
    "explanation": "Because `finally:` always executes last before leaving the block, putting `return` inside `finally:` overrides earlier returns AND dangerously swallows active exceptions!"
  },
  {
    "id": "q_c4_m2_143",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "What file extension identifies a compiled platform-ready Python binary distribution package designed for fast install without running `setup.py` compilation?",
    "options": [
      "`.so`",
      "`.pyc`",
      "`.exe`",
      "`.whl` (Python Wheel)"
    ],
    "correct": 3,
    "explanation": "Wheels (`.whl`, e.g. `tabulate-0.9.0-py3-none-any.whl`) are pre-built ZIP archives that extract straight into `site-packages`."
  },
  {
    "id": "q_c4_m2_144",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "What do the filename tags `py3-none-any` inside `tabulate-0.9.0-py3-none-any.whl` tell a security analyst inspecting dependencies before install?",
    "options": [
      "Requires Python 3, uses no native C-ABI (`none`), and contains pure platform-independent Python code usable across Windows/Linux/macOS (`any`)",
      "Contains compiled Windows kernel drivers",
      "Excludes Python 3.12+ runtimes",
      "Disabled hash checking"
    ],
    "correct": 0,
    "explanation": "Wheel tags encode `<python>-<abi>-<platform>`: `py3-none-any` confirms a pure Python wheel with zero native C extension binaries."
  },
  {
    "id": "q_c4_m2_145",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "In `requirements.txt`, what command generates complete pinned hashes automatically across both direct and transitive dependencies when using `pip-tools`?",
    "options": [
      "pip hash --recursive requirements.txt",
      "pip-compile --generate-hashes requirements.in",
      "pip freeze --sha256",
      "pip-audit --lock"
    ],
    "correct": 1,
    "explanation": "`pip-compile --generate-hashes` resolves the entire transitive dependency tree and appends `--hash=sha256:...` for every package required by `--require-hashes`."
  },
  {
    "id": "q_c4_m2_146",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Why did PyPI's `ctx` remediation advice instruct impacted developers to IMMEDIATELY rotate AWS/cloud access keys even AFTER uninstalling the malicious `ctx` version?",
    "options": [
      "PyPI caches user secrets inside `.whl` headers",
      "Uninstalling `ctx` resets cloud IAM passwords automatically",
      "Deleting a compromised package stops *future* theft, yet attackers may already have exfiltrated environment secrets during earlier runs and retained active copies",
      "Environment keys expire within 60 seconds by default"
    ],
    "correct": 2,
    "explanation": "Once secrets are exposed to malicious dependency code, treat them as stolen and rotate credentials immediately across affected hosts and CI runners."
  },
  {
    "id": "q_c4_m2_147",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `m02_reusable.py` section 2, given `inputs = ['443', '70000', 'https', None, '22']`, which ports survive validation into `valid`?",
    "options": [
      "[22]",
      "[443, 70000, 22]",
      "[443]",
      "[443, 22]"
    ],
    "correct": 3,
    "explanation": "`'70000'` fails `0 <= port <= 65535`, `'https'` raises `ValueError`, and `None` raises `TypeError`—leaving `[443, 22]`."
  },
  {
    "id": "q_c4_m2_148",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "In Practical P1 (`secutils.py`), what happens if a script passes `'192.168.1.50/24'` (with host bits set!) into `ipaddress.ip_network('192.168.1.50/24')` without `strict=False`?",
    "options": [
      "Raises `ValueError: 192.168.1.50/24 has host bits set` unless `strict=False` is explicitly passed when callers might submit interface CIDR notation",
      "Silently masks down to `192.168.1.0/24` by default",
      "Returns an IPv4Address object",
      "Turns `/24` into `/32`"
    ],
    "correct": 0,
    "explanation": "`ipaddress.ip_network` enforces `strict=True` by default so non-zero host bits fail loudly as `InvalidNetworkError` unless `strict=False` is intentionally requested."
  },
  {
    "id": "q_c4_m2_149",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Which statement explains why `def check_port(port):` should accept a clean single parameter and validate bounds once inside?",
    "options": [
      "Prevents syntax errors on indentation",
      "Eliminates duplicate checks across callers and isolates port parsing logic in one testable function",
      "Converts tuples to strings",
      "Removes docstrings from memory"
    ],
    "correct": 1,
    "explanation": "Encapsulating validation in one function avoids copy-pasted boundary bugs across modules."
  },
  {
    "id": "q_c4_m2_150",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Wait: what occurs if you define `def classify(value, rules=RULES_DICT):` where `RULES_DICT` is a module-level dictionary, and later mutate `RULES_DICT` elsewhere in the module?",
    "options": [
      "Calling `classify` creates a fresh copy of `RULES_DICT`",
      "`def` freezes `RULES_DICT` into an immutable tuple",
      "Inside `classify`, `rules` still points to the SAME `RULES_DICT` object evaluated at definition time, seeing any runtime mutations made to `RULES_DICT` (which is dangerous if unintentional)",
      "Python raises DefaultMutatedError"
    ],
    "correct": 2,
    "explanation": "Default values retain references to the bound object created at `def` time; pass `None` or use `types.MappingProxyType` when read-only module tables are desired."
  },
  {
    "id": "q_c4_m2_151",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "medium",
    "q": "When writing `parse_port(value: str | int) -> int`, why is raising `InvalidPortError` better than printing `'bad port'` and returning `None`?",
    "options": [
      "Exceptions automatically fix corrupt data",
      "Raising exceptions prevents terminal output",
      "`None` prints faster than integers",
      "Callers are forced to handle failure deliberately instead of crashing with obscure `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'` downstream"
    ],
    "correct": 3,
    "explanation": "Returning `None` on bad input masks failures until distant code trips on `NoneType`; raising specific exceptions preserves clear origin diagnostics."
  },
  {
    "id": "q_c4_m2_152",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Notice the difference between `x = [1]; def f(lst): lst.append(2)` vs `def g(lst): lst = [99]`. After calling BOTH `f(x)` then `g(x)`, what value does caller `x` hold?",
    "options": [
      "`[1, 2]`: `f` mutated the aliased list object in place, whereas `lst = [99]` inside `g` merely rebound the local parameter name `lst` without affecting caller `x`",
      "`[99]`",
      "`[1]`",
      "`[1, 2, 99]`"
    ],
    "correct": 0,
    "explanation": "Rebinding a local parameter (`lst = ...`) never changes the caller's binding; calling mutating methods (`lst.append(...)`) alters the shared mutable object."
  },
  {
    "id": "q_c4_m2_153",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "What file extension does Python use for cached compiled bytecode stored inside `__pycache__` folders?",
    "options": [
      "`.pyo`",
      "`.pyc`",
      "`.pyw`",
      "`.bin`"
    ],
    "correct": 1,
    "explanation": "Python stores bytecode caches as `<module>.cpython-3XX.pyc` inside `__pycache__` to speed up repeat module imports."
  },
  {
    "id": "q_c4_m2_154",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why should CI/CD pipelines and security tools invoke `python -B` (or ensure `__pycache__` sits strictly in writable trusted locations), or why can stale `.pyc` cache files cause confusion if a `.py` file is deleted?",
    "options": [
      "`-B` blocks all standard library imports",
      "`.pyc` files execute even when syntax errors exist in `.py`",
      "If a `.py` source file is deleted leaving behind a bare top-level `.pyc`, Python cannot import `__pycache__/*.pyc` directly, yet explicitly running or importing stale orphan `.pyc` in a folder still executes old cached bytecode!",
      "`.pyc` files store environment secrets automatically"
    ],
    "correct": 2,
    "explanation": "Clean build artifacts (`-B` avoids writing `.pyc` during ephemeral/read-only runs) and verify removed `.py` files do not linger as standalone compiled `.pyc` artifacts in deployment folders."
  },
  {
    "id": "q_c4_m2_155",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "In `try / except InvalidPortError as err:`, if NO `InvalidPortError` occurs during `try`, which blocks run if both `else:` and `finally:` exist?",
    "options": [
      "`else`, then `try`, then `finally`",
      "`try`, then `except`, then `finally`",
      "`try`, then `finally` only (skipping `else`)",
      "`try`, then `else`, then `finally`"
    ],
    "correct": 3,
    "explanation": "On normal non-exceptional completion, flow proceeds `try` -> `else` -> `finally`."
  },
  {
    "id": "q_c4_m2_156",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Why does configuring Python's root logger carelessly at `DEBUG` level across all modules risk leaking sensitive HTTP payload tokens in production?",
    "options": [
      "Third-party HTTP libraries often emit full wire headers, URLs, query parameters, and tokens at `DEBUG` level when root verbosity is lowered globally",
      "Debug logging slows down loops by 1%",
      "DEBUG level prints directly to HTTP responses",
      "INFO logging hides tracebacks inside `log.exception`"
    ],
    "correct": 0,
    "explanation": "Keep production root logging at `INFO`/`WARNING` and explicitly restrict `DEBUG` per module while sanitizing secrets (`Authorization`, API keys) from logged request fields."
  },
  {
    "id": "q_c4_m2_157",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Which shell command activates a virtual environment created at `rkvenv` interactively on Linux or macOS bash/zsh?",
    "options": [
      "rkvenv\\Scripts\\activate",
      "source rkvenv/bin/activate",
      "python -m activate rkvenv",
      "enable rkvenv"
    ],
    "correct": 1,
    "explanation": "POSIX shells source the activation script (`source rkvenv/bin/activate`) to prepend `rkvenv/bin` onto `PATH`."
  },
  {
    "id": "q_c4_m2_158",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "How do you exit an activated virtual environment interactively inside your terminal and revert `PATH` back to your system interpreter?",
    "options": [
      "Delete `rkvenv` while still activated",
      "Run `exit()`",
      "Run `deactivate`",
      "Run `python -m venv --off`"
    ],
    "correct": 2,
    "explanation": "`activate` defines a shell function `deactivate` that cleanly restores the original environment variables (`PATH`, prompt, `VIRTUAL_ENV`)."
  },
  {
    "id": "q_c4_m2_159",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "What does `pip` check when enforcing `--require-hashes` during `pip install -r req.txt`?",
    "options": [
      "Line endings inside `.py` scripts",
      "The maintainer's email domain",
      "The file permissions of `req.txt`",
      "The cryptographic SHA-256 hash computed over every downloaded wheel/archive against the `--hash=sha256:...` value in `req.txt`"
    ],
    "correct": 3,
    "explanation": "Hash-checking mode computes the file hash upon download and aborts if any digest mismatches."
  },
  {
    "id": "q_c4_m2_160",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Look closely at `req.txt` if an attacker tries to bypass hash verification by modifying a single requirement line WITHOUT a hash inside a `--require-hashes` install. What does `pip` do?",
    "options": [
      "Fails closed immediately: `--require-hashes` refuses to install ANY dependency unless EVERY package (including transitive packages) specifies at least one cryptographic hash",
      "Installs lines lacking `--hash` without checking",
      "Falls back to MD5 automatically",
      "Only checks hashes on the first line"
    ],
    "correct": 0,
    "explanation": "Hash-checking mode is all-or-nothing: an unhashed line anywhere in the requirement graph triggers an immediate `pip` abort."
  },
  {
    "id": "q_c4_m2_161",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "In `rkutils.parse_port`, what argument type can a caller pass safely thanks to the `int()` boundary?",
    "options": [
      "Only hex lists",
      "Either a numeric string (`'443'`) or an integer (`443`)",
      "Dictionaries mapping host to port",
      "Arbitrary shell commands"
    ],
    "correct": 1,
    "explanation": "`parse_port` accepts `str | int` (`'443'` or `443`) and normalizes valid ports into integers in `0..65535`."
  },
  {
    "id": "q_c4_m2_162",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Why might calling `ipaddress.ip_address(' 10.0.0.5\\n')` fail with `ValueError` unless `rkutils.classify_ip` calls `.strip()` first?",
    "options": [
      "`\\n` makes it parse as IPv6",
      "`ipaddress` only parses lowercase IPv4",
      "`ipaddress.ip_address` rejects leading/trailing spaces or trailing newlines from log/file reads, so stripping boundary whitespace keeps valid records from failing needlessly",
      "`strip()` converts private IPs to global"
    ],
    "correct": 2,
    "explanation": "Explicit `.strip()` normalization before passing log tokens to `ipaddress.ip_address()` eliminates spurious parsing errors caused by file newlines."
  },
  {
    "id": "q_c4_m2_163",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Which standard library modules from L03 handle cryptographic hashing (`sha256`), constant-time tag checks (`hmac`), and cryptographically strong random tokens (`secrets`)?",
    "options": [
      "`math`, `ipaddress`, and `logging`",
      "`random`, `pickle`, and `md5`",
      "`os`, `csv`, and `json`",
      "`hashlib`, `hmac`, and `secrets`"
    ],
    "correct": 3,
    "explanation": "`hashlib`, `hmac`, and `secrets` (never `random` for security tokens!) provide standard cryptographic building blocks."
  },
  {
    "id": "q_c4_m2_164",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Notice the difference between calling `logging.warning(...)` in library code vs `log = logging.getLogger('m02')` in `m02_reusable.py`. Why do named loggers help large multi-module SOC platforms?",
    "options": [
      "Named loggers tag log records with component hierarchy (`app.ingest`, `app.rules`) so analysts can adjust log levels, route alerts, or silence noisy dependencies cleanly per subsystem",
      "Named loggers run automatically inside async threads",
      "Root logger refuses WARNING level",
      "Named loggers store plaintext tracebacks in `__all__`"
    ],
    "correct": 0,
    "explanation": "Hierarchical named loggers (`__name__`) give operational teams fine-grained filtering and attribution across subsystems."
  },
  {
    "id": "q_c4_m2_165",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Before running `pip install -r req.txt`, what flags can verify exact installed versions inside an existing environment?",
    "options": [
      "python -m pip test",
      "python -m pip list",
      "python -m venv --list",
      "python --pkgs"
    ],
    "correct": 1,
    "explanation": "`python -m pip list` prints every installed package and version cleanly in the targeted interpreter's venv."
  },
  {
    "id": "q_c4_m2_166",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "In `ctx` (CS1), attackers exfiltrated environment variables during package runtime. Besides pinning hashes and reviewing upgrades, which operational isolation rule limits blast radius if a compromised utility runs anyway?",
    "options": [
      "Share one global `.env` file across all laptops and production workers",
      "Disable SHA-256 verification on internal mirrors",
      "Follow least privilege: run tools in minimal containers/service accounts exposing ONLY the specific secret required by that single script—never dump entire cloud admin keychains into shared developer `os.environ`",
      "Store secrets inside `requirements.txt` comments"
    ],
    "correct": 2,
    "explanation": "Secret scoping (minimum credential surface per runtime + dedicated secret managers/short-lived tokens) limits credential exposure even if dependency code turns hostile."
  },
  {
    "id": "q_c4_m2_167",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In Practical P1 step 4, you introduce a deliberate typo inside a function while calling it inside `try ... except InvalidNetworkError:`. What happens?",
    "options": [
      "Program hangs indefinitely",
      "Specific `except` catches `NameError` silently as `0`",
      "Python renames the typo automatically",
      "The `NameError` escapes and fails loudly with a clear traceback pointing right to the typo—proving specific `except` blocks don't conceal real programming bugs"
    ],
    "correct": 3,
    "explanation": "Catching narrow domain errors lets unexpected bugs (`NameError`, `AttributeError`) surface immediately during testing rather than corrupting results silently."
  },
  {
    "id": "q_c4_m2_168",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "Wait: inside `m02_reusable.py` section 1, examine `summarise(22, 3389, label='admin', host='web-01')`. Why did `label='admin'` NOT appear inside the trailing `extra` keyword section (`... , label=admin, host=web-01`)?",
    "options": [
      "`label` is explicitly declared as a named keyword-only parameter in the signature, so Python binds `'admin'` to `label` directly and excludes it from `**extra`",
      "`sorted(extra.items())` removes keys starting with 'l'",
      "`label` was overridden by global constants",
      "`**extra` only keeps 2-letter keys"
    ],
    "correct": 0,
    "explanation": "`**extra` catches ONLY keyword arguments that do not match any explicitly named parameter in the function definition."
  },
  {
    "id": "q_c4_m2_169",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "In `def foo(a, b=10):`, which kind of argument binding allows callers to pass arguments in any order cleanly as `foo(b=20, a=5)`?",
    "options": [
      "Variadic `*args`",
      "Keyword arguments",
      "Positional-only arguments",
      "Global bindings"
    ],
    "correct": 1,
    "explanation": "Named keyword arguments clarify call sites and remove order dependence for explicit parameters."
  },
  {
    "id": "q_c4_m2_170",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Compare a pure parser function vs a stateful class/accumulator function when analyzing high-volume event streams. Why do pure functions make multi-threaded or parallel triage far safer?",
    "options": [
      "Global variables raise SyntaxError across threads",
      "Pure functions allocate only tuples in hardware cache",
      "Zero shared mutable global state eliminates race conditions and lock contention across worker streams",
      "Pure functions bypass Python's GIL automatically on strings"
    ],
    "correct": 2,
    "explanation": "Functions operating solely on inputs and returning fresh values introduce no cross-worker shared-state races."
  },
  {
    "id": "q_c4_m2_171",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "When you import `rkutils` in `m02_reusable.py`, what happens to the `assert` self-test block guarded inside `if __name__ == '__main__':`?",
    "options": [
      "It runs only if `-O` is disabled",
      "It executes and prints `'rkutils self-test passed'`",
      "It raises AssertionError inside `m02_reusable.py`",
      "It is skipped completely because `rkutils.__name__` equals `'rkutils'`, not `'__main__'`"
    ],
    "correct": 3,
    "explanation": "Guarding self-tests or CLI drivers behind `if __name__ == '__main__':` keeps `import` clean and silent."
  },
  {
    "id": "q_c4_m2_172",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Suppose a forensic script executes `python -m http.server` OR runs code from an untrusted directory containing `html.py`. Why does `python -I -m ...` or safe directory hygiene eliminate planted-module execution even with `-m`?",
    "options": [
      "Because Python adds CWD to `sys.path[0]` under `-m` by default—running `-I` (isolated) or `-P` (safe_path) prevents CWD from shadowing stdlib modules during `-m` execution",
      "`-m` already excludes CWD in all Python versions",
      "`http.server` cannot run with `-I`",
      "`sys.path` disables CWD only for stdlib files"
    ],
    "correct": 0,
    "explanation": "`python -m mod` places CWD at `sys.path[0]`, so invoking Python from an untrusted directory (like `/tmp`) exposes `-m` unless `-I` or `-P` (3.11+) is used."
  },
  {
    "id": "q_c4_m2_173",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "medium",
    "q": "What happens in Case Study C04-M02-CS2 (Orchid Payments) when a bare `except: pass` catches every API authentication error inside a 5-minute daemon?",
    "options": [
      "The daemon refreshes expired API keys automatically",
      "The daemon silently reports zero errors for weeks while ZERO alerts actually enter the SOC ticketing queue",
      "Python sends an email to root",
      "`pass` shuts down the server loudly"
    ],
    "correct": 1,
    "explanation": "Swallowing errors silently disguises total monitoring failure as healthy zero-alert uptime."
  },
  {
    "id": "q_c4_m2_174",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Wait: if a parser raises a custom exception `InvalidPortError` inside a helper, and the CLI catches `Exception` globally in `main()` just to log fatal crashes before returning exit code 1, why is a top-level logger + non-zero exit acceptable whereas silent `except: pass` inside loops is broken?",
    "options": [
      "`except Exception:` skips `stderr`",
      "Global handlers automatically restart failed APIs",
      "A top-level handler still logs full error telemetry (`log.exception`) and exits non-zero (preserving loud failure for callers/monitoring), whereas silent catch-and-continue corrupts data/hides outages",
      "Top-level crashes always return exit code 0"
    ],
    "correct": 2,
    "explanation": "Failing cleanly at the top level (structured error message, `log.exception()`, non-zero exit status) avoids raw secret leakage while remaining 100% observable and fail-closed."
  },
  {
    "id": "q_c4_m2_175",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "If `python --version` works yet `python -m venv rkvenv` fails on minimal Debian/Ubuntu systems complaining about `ensurepip`, which OS package supplies the missing stdlib venv component?",
    "options": [
      "`python3-pip-unsafe`",
      "`sudo pip install venv`",
      "`git clone venv`",
      "`python3-venv` installed via the OS package manager (`apt install python3-venv`)"
    ],
    "correct": 3,
    "explanation": "Debian/Ubuntu splits `venv`/`ensurepip` into `python3-venv` (or `python3.12-venv`)—install it cleanly via the distribution package manager, not `sudo pip`."
  },
  {
    "id": "q_c4_m2_176",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "Compare `pip freeze` output vs `pip list`: why does `pip freeze` format dependencies as `package==version` rather than tabular columns?",
    "options": [
      "`pip freeze` emits exact requirement-spec syntax so output redirects straight into a reproducible `requirements.txt` file",
      "`pip list` skips transitive packages",
      "`pip freeze` excludes Python 3 packages",
      "`pip list` pins SHA-256 hashes automatically"
    ],
    "correct": 0,
    "explanation": "`pip list` is formatted for human table inspection, while `pip freeze` produces machine-consumable `pkg==ver` constraint specs."
  },
  {
    "id": "q_c4_m2_177",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "medium",
    "q": "What specific failure risk did CVE vulnerability scanning via `pip-audit` mitigate beyond SHA-256 hash pinning?",
    "options": [
      "`pip-audit` rewrites vulnerable `.py` files automatically",
      "`pip-audit` checks pinned versions against known disclosed CVEs so vulnerabilities discovered *after* you initially pinned a safe-looking hash are flagged for patching",
      "`pip-audit` prevents domain expiration on PyPI",
      "`pip-audit` replaces virtual environments"
    ],
    "correct": 1,
    "explanation": "Code vetted and hash-pinned last year can have a new CVE disclosed today; periodic `pip-audit` scans detect newly reported flaws in pinned dependencies."
  },
  {
    "id": "q_c4_m2_178",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Why does `pip install --require-hashes` also prohibit version range specifiers like `tabulate>=0.9.0` inside `req.txt`?",
    "options": [
      "PyPI refuses `>=` over HTTPS",
      "`>=` breaks UTF-8 file reading",
      "Hashes tie cryptographically to ONE exact build archive; allowing `>=` ambiguity violates deterministic version-to-hash matching, so `==` exact pinning is strictly enforced",
      "Ranges skip virtual environments"
    ],
    "correct": 2,
    "explanation": "`pip` enforces exact `==` pinning alongside `--hash=...` so requirement files cannot silently drift to newer versions."
  },
  {
    "id": "q_c4_m2_179",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `m02_reusable.py`, what two outputs prove that `classify_ip` accurately differentiates loopback from global public IP addresses?",
    "options": [
      "`127.0.0.1 -> global` and `8.8.8.8 -> loopback`",
      "`127.0.0.1 -> private` and `8.8.8.8 -> special`",
      "`127.0.0.1 -> invalid` and `8.8.8.8 -> private`",
      "`127.0.0.1 -> loopback` and `8.8.8.8 -> global`"
    ],
    "correct": 3,
    "explanation": "Verified lab execution outputs `127.0.0.1 -> loopback` and `8.8.8.8 -> global`."
  },
  {
    "id": "q_c4_m2_180",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "In `rkutils.classify_ip`, suppose someone passes an IPv6 link-local address like `'fe80::1'`. Which branch of `classify_ip` handles `'fe80::1'` cleanly without crashing?",
    "options": [
      "`ipaddress.ip_address` parses `'fe80::1'` as `IPv6Address`; since it is neither loopback nor global (`is_private` may match depending on version / or falls cleanly through to `'special'`), returning a categorized label deterministically",
      "Crashes with IPv6NotSupportedError",
      "Converts `'fe80::1'` to `'127.0.0.1'`",
      "Returns `None`"
    ],
    "correct": 0,
    "explanation": "`ipaddress.ip_address` natively supports both IPv4 and IPv6 addresses seamlessly under the same `.is_loopback` / `.is_private` / `.is_global` properties."
  },
  {
    "id": "q_c4_m2_181",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "Why should a function signature keep its parameter count small and focused rather than passing 15 unrelated booleans?",
    "options": [
      "Python forbids more than 8 function parameters",
      "Small cohesive signatures prevent caller argument swaps, simplify documentation, and align with single-purpose testing",
      "Booleans consume 64 KB each inside call stacks",
      "Extra parameters trigger SyntaxError"
    ],
    "correct": 1,
    "explanation": "Clean focused parameter lists reduce mis-invocation bugs and make tests concise."
  },
  {
    "id": "q_c4_m2_182",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "If `COUNTER = 0` sits at module top and a function attempts `COUNTER += 1` without returning a new count, what happens even before considering race conditions?",
    "options": [
      "Creates a duplicate constant",
      "Increments global `COUNTER` cleanly to `1`",
      "Raises `UnboundLocalError: cannot access local variable 'COUNTER' where it is not associated with a value`",
      "Sets `COUNTER` to `None`"
    ],
    "correct": 2,
    "explanation": "`COUNTER += 1` is an assignment, causing Python to classify `COUNTER` as local and fail on read before assignment—pass `counter` in and `return counter + 1` instead."
  },
  {
    "id": "q_c4_m2_183",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "What module in Python's standard library builds structured command-line interfaces with `--help` and typed flags (previewed in L03 and mastered in Module 8)?",
    "options": [
      "sys.flags",
      "subprocess",
      "cli_maker",
      "argparse"
    ],
    "correct": 3,
    "explanation": "`argparse` is Python's standard-library CLI parser for subcommands, flags, defaults, and automated help text."
  },
  {
    "id": "q_c4_m2_184",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Why can catching broad `except Exception: return None` inside helper parsing code behave just as destructively in security checks as bare `except:`?",
    "options": [
      "Catching `Exception` blindly hides logic typos (`NameError`, `AttributeError`, `KeyError`) and returns `None` seamlessly—turning real bugs into silent empty detections",
      "`except Exception:` catches `KeyboardInterrupt` too",
      "`return None` closes `stderr`",
      "Python treats `Exception` as `BaseException` always"
    ],
    "correct": 0,
    "explanation": "Even catching `Exception` inside low-level helpers hides real coding errors (`AttributeError`, `TypeError`) unless strictly restricted to a top-level boundary logger or narrow expected fault types."
  },
  {
    "id": "q_c4_m2_185",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "Why does `pip` recommend installing into virtual environments rather than system directories even on single-user Windows developer laptops?",
    "options": [
      "Windows forbids `pip` outside `rkvenv`",
      "Isolating per-project dependencies prevents Project A needing library v1 from breaking Project B needing library v2 (dependency hell) and leaves the base OS Python clean",
      "System Python skips `__pycache__` generation",
      "Windows stores system Python on read-only ROM"
    ],
    "correct": 1,
    "explanation": "Per-project venvs prevent conflicting package upgrades across independent tools and simplify clean removal/rebuilding."
  },
  {
    "id": "q_c4_m2_186",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "During a PyPI audit of an unknown package `fast-syslog-helper`, what red flags suggest heightened supply-chain risk beyond typosquatting?",
    "options": [
      "Publication of pure `py3-none-any` wheels with deterministic SHA-256 digests",
      "Presence of unit tests and MIT/Apache license metadata",
      "Brand-new single maintainer, missing or mismatched source GitHub repo link, bloated `setup.py` install hooks downloading payloads, or sudden version bump on a previously dormant library",
      "Compatibility with Python 3.10+"
    ],
    "correct": 2,
    "explanation": "Evaluating repo provenance, maintainer history, release continuity, and install hooks spots suspicious uploads before installation."
  },
  {
    "id": "q_c4_m2_187",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "medium",
    "q": "In `rkutils.py`, how does `assert parse_port('443') == 443` behave if a bug later causes `parse_port` to return `'443'` (string) instead of `443` (int)?",
    "options": [
      "Prints `'rkutils self-test passed'`",
      "Passes silently because `'443' == 443` is True",
      "Converts `'443'` to 443",
      "Raises `AssertionError` immediately when running `python rkutils.py`"
    ],
    "correct": 3,
    "explanation": "Because `'443' != 443` in Python 3, the self-test `assert` immediately fails loudly with `AssertionError`."
  },
  {
    "id": "q_c4_m2_188",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "If `secutils.py` in Practical P1 handles IPv4 CIDR parsing cleanly, what happens if an analyst tests `parse_cidr('not-a-cidr')` inside `with self.assertRaises(InvalidNetworkError):` vs a naive `try/except ValueError:`?",
    "options": [
      "Both work cleanly ONLY IF `InvalidNetworkError` subclasses `ValueError`—allowing specific handlers to distinguish `InvalidNetworkError` while remaining backwards-compatible with general `ValueError` checks",
      "Subclassing `ValueError` prevents `assertRaises(InvalidNetworkError)`",
      "`InvalidNetworkError` must inherit from `Exception` directly",
      "`ip_network` raises `TypeError` on invalid strings"
    ],
    "correct": 0,
    "explanation": "Subclassing `ValueError` preserves hierarchical catch flexibility cleanly."
  },
  {
    "id": "q_c4_m2_189",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "medium",
    "q": "How can an engineer document expected raised exceptions (such as `InvalidPortError`) directly so callers checking `help(parse_port)` know what errors to handle?",
    "options": [
      "List exceptions inside `requirements.txt`",
      "Describe raised exception conditions clearly inside the function's docstring right below the `def` line",
      "Add comments at the bottom of the module",
      "Wrap the module in `except:`"
    ],
    "correct": 1,
    "explanation": "Clear docstrings document parameter constraints, return format, and raised exception classes directly inside `help()` output."
  },
  {
    "id": "q_c4_m2_190",
    "topic": "C04-M02-L02: Scope, Defaults & Design",
    "difficulty": "difficult",
    "q": "Notice an advanced default-evaluation twist in loops creating callbacks/lambdas: `handlers = [lambda: p for p in (22, 80, 443)]`. Why do ALL three functions return `443` when called?",
    "options": [
      "`lambda` cannot read integers",
      "Tuples iterate backwards inside list comprehensions",
      "Python loops reuse the same loop variable `p` and closures bind by variable name (late binding), so calling them later looks up the final value `443` unless bound as `lambda p=p: p`",
      "Comprehensions drop values below 100"
    ],
    "correct": 2,
    "explanation": "Late-binding closures read loop variable `p` at call time rather than loop time; capture per-iteration values via default parameter `lambda p=p: p` or `functools.partial`."
  },
  {
    "id": "q_c4_m2_191",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "medium",
    "q": "Which statement accurately describes `__name__` inside the top-level script executed directly by `python m02_reusable.py`?",
    "options": [
      "`__name__ is None`",
      "`__name__ == 'm02_reusable'`",
      "`__name__ == 'rkutils'`",
      "`__name__ == '__main__'`"
    ],
    "correct": 3,
    "explanation": "Python always assigns `'__main__'` to `__name__` of whichever script/module serves as the program entry point."
  },
  {
    "id": "q_c4_m2_192",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "Look closely at `except (TypeError, ValueError) as exc:` in Python: why does variable `exc` go OUT OF SCOPE and get deleted automatically as soon as the `except` block finishes?",
    "options": [
      "Python 3 clears the `exc` binding on `except` exit intentionally to break reference cycles between frames and tracebacks (saving significant RAM in long-running daemons)",
      "Python deletes variables starting with `exc` everywhere",
      "Only custom exceptions remain bound",
      "Exceptions persist globally unless `del exc` is written"
    ],
    "correct": 0,
    "explanation": "Python 3 binds `as exc` strictly for the `except` block duration to prevent traceback reference cycles from pinning local objects in memory."
  },
  {
    "id": "q_c4_m2_193",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "medium",
    "q": "If a requirements file specifies `tabulate==0.9.0 --hash=sha256:024c...`, which flags install it securely in hash-checking mode?",
    "options": [
      "python -m pip install --verify-only req.txt",
      "python -m pip install --require-hashes -r req.txt",
      "python -m pip install --freeze req.txt",
      "python -m pip hash -r req.txt"
    ],
    "correct": 1,
    "explanation": "`--require-hashes` enables strict hash verification mode across every requirement file entry."
  },
  {
    "id": "q_c4_m2_194",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Wait: if a requirement archive has BOTH a `.whl` and a `.tar.gz` sdist on PyPI, why might `req.txt` generated purely with one `--hash=sha256:...` from a Windows machine occasionally fail to install on Linux if platform-specific compiled wheels exist?",
    "options": [
      "Windows wheels reject Linux `pip` due to filename spaces",
      "Linux uses MD5 instead of SHA-256",
      "Different platforms (Windows `win_amd64` vs Linux `manylinux`) download distinct `.whl` binaries with DIFFERENT SHA-256 digests—requiring multi-platform hashes (both hashes listed in `req.txt` or `pip-compile`/`uv lock`) for cross-OS lockfiles!",
      "Pure `py3-none-any` wheels have different hashes per OS"
    ],
    "correct": 2,
    "explanation": "Platform-specific binary wheels differ per OS/CPU, so each candidate wheel hash for supported target platforms must be pinned in `req.txt` (whereas pure `py3-none-any` wheels share one universal hash)."
  },
  {
    "id": "q_c4_m2_195",
    "topic": "C04-M02-P1 & P2: rkutils, secutils & Labs",
    "difficulty": "difficult",
    "q": "What happens in `m02_reusable.py` when `inputs` passes `None` into `parse_port(None)`?",
    "options": [
      "Converts `None` to `'None'`",
      "Appends `0` into `valid`",
      "Crashes the script with `TypeError`",
      "Logs `WARNING rejected None: not a number: None` and omits it from `valid`"
    ],
    "correct": 3,
    "explanation": "`parse_port(None)` catches `TypeError`, raises `InvalidPortError`, and `m02_reusable.py` catches and logs the warning cleanly."
  },
  {
    "id": "q_c4_m2_196",
    "topic": "C04-M02-L01: Functions & Parameter Contracts",
    "difficulty": "difficult",
    "q": "Why should utility modules avoid top-level network calls, prompts (`input()`), or hard-coded relative path reads at module import time?",
    "options": [
      "Side effects during `import` slow tests down, hang automated runners awaiting keyboard input, and crash callers running from different working directories",
      "Python forbids calling functions outside classes",
      "`input()` raises SyntaxError inside imported files",
      "`import` skips top-level `if` statements"
    ],
    "correct": 0,
    "explanation": "Modules should define clean classes, functions, and constants without unexpected I/O side effects at import time."
  },
  {
    "id": "q_c4_m2_197",
    "topic": "C04-M02-L03: Modules, sys.path & __name__",
    "difficulty": "difficult",
    "q": "Why did `rkutils.__name__` print `'rkutils'` while `__name__` in `m02_reusable.py` printed `'__main__'`?",
    "options": [
      "`rkutils.py` failed its self-test",
      "`m02_reusable.py` was launched as the primary script (`'__main__'`), whereas `rkutils.py` was imported (`'rkutils'`)",
      "Python assigns `'__main__'` alphabetically",
      "`__name__` changes inside functions"
    ],
    "correct": 1,
    "explanation": "Only the executed top-level entry module receives `__name__ == '__main__'`; imported modules carry their module name."
  },
  {
    "id": "q_c4_m2_198",
    "topic": "C04-M02-L04: Exceptions, Chaining & Logging",
    "difficulty": "difficult",
    "q": "When building a scheduler heartbeat or 'dead man's switch' for Orchid Payments (CS2), what signal triggers an operational pager alert?",
    "options": [
      "Seeing a clean exit code 0 in syslog",
      "Reaching 1,000 alerts in 1 second",
      "Absence of expected periodic ingestion completion heartbeats/metrics within the configured SLA interval (catching silent hangs, dead crons, and swallowed auth errors alike)",
      "A warning printed to stdout"
    ],
    "correct": 2,
    "explanation": "Dead man's switches invert failure detection: if the pipeline fails to report fresh healthy completion within its deadline, monitoring pages operations."
  },
  {
    "id": "q_c4_m2_199",
    "topic": "C04-M02-L05: Virtual Environments & pip",
    "difficulty": "difficult",
    "q": "If `rkvenv` already exists in your practice folder, does deleting `dl` (download folder) or leaving `requirements.txt` affect packages already installed inside `rkvenv`?",
    "options": [
      "`rkvenv` runs directly from `.whl` archives in `dl`",
      "Deleting `dl` breaks installed packages immediately",
      "Deleting `dl` erases Python globally",
      "Deleting `dl` does not uninstall packages already extracted into `rkvenv/Lib/site-packages`, though keeping `req.txt` is essential to rebuild `rkvenv` later"
    ],
    "correct": 3,
    "explanation": "`pip install` copies extracted code into `site-packages`; `dl` is strictly an intermediate download staging directory."
  },
  {
    "id": "q_c4_m2_200",
    "topic": "C04-M02-L06: Dependency Security & CS1",
    "difficulty": "difficult",
    "q": "Synthesizing Module 2's core dependency-security theme: when a standard-library module like `ipaddress` or `urllib.request` vs a tiny random PyPI wrapper offers equivalent functionality for a security utility, why does preferring the standard library win twice?",
    "options": [
      "Zero external attack surface (impossible to typosquat, suffer `ctx`-style maintainer takeover, or break offline installations) plus immediate zero-setup portability across clean Python hosts",
      "Standard library code runs in Rust natively",
      "Standard library functions never raise exceptions",
      "PyPI packages cannot run inside `venv`"
    ],
    "correct": 0,
    "explanation": "Minimizing third-party dependencies reduces supply-chain risk, eliminates lockfile maintenance burden, and keeps incident tools portable."
  }
];
