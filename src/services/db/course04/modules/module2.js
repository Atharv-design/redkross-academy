/**
 * Course 04: Python for Cybersecurity — Module 2 Data
 * Module ID: mod_c4_2 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module2Data = {
  "id": "mod_c4_2",
  "title": "Module 2: Functions, Modules, Exceptions, and Packages",
  "description": "Encapsulate security logic into validated, documented, type-hinted functions, master LEGB scope and mutable-default safety, structure importable Python modules immune to sys.path hijacking, replace bare except clauses with specific exception chaining and structured logging, isolate runtimes in venv, and verify third-party dependencies against hash-checking and PyPI supply-chain threats.",
  "order": 2,
  "quiz": {
    "id": "quiz_mod_c4_2",
    "title": "Module 2: Functions, Modules, Exceptions, and Packages Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
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
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m2_l1",
      "title": "2.1 Functions, Parameters, Docstrings, and Type Hints",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Transform ad-hoc inline security checks into reusable, contract-enforcing functions supporting positional, keyword-only, *args, **kwargs, docstrings, and PEP 484 type hints.",
      "learning_objectives": [
        "Design single-responsibility functions that validate untrusted inputs once at program boundaries",
        "Apply positional, default, keyword-only (*), *args, and **kwargs parameters accurately without signature ambiguity",
        "Distinguish implicit None returns from explicit return statements cleanly",
        "Document security contracts with Google/NumPy-style docstrings inspectable via help() and PEP 484/604 type annotations"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-01",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l01_function_validation_contract.png",
          "caption": "Figure 2.1: Boundary validation function contract translating untrusted string inputs into verified integers or explicit ValueError exceptions.",
          "placement_hint": "After Section 3 (Encapsulating Repeated Security Logic)"
        },
        {
          "id": "fig-04-02-02",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l01_parameter_unpacking_args_kwargs.png",
          "caption": "Figure 2.2: Parameter binding order showing positional slots, *args tuple packing, keyword-only flags, and **kwargs metadata dictionaries.",
          "placement_hint": "After Section 5 (Keyword-Only Parameters, *args, and **kwargs)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-01",
          "title": "Figure 2.1: Boundary Validation Function Contract",
          "url": "/assets/courses/cyber-04/c04_m02_l01_function_validation_contract.png",
          "caption": "Figure 2.1: Boundary validation function contract translating untrusted string inputs into verified integers or explicit ValueError exceptions.",
          "alt": "Three-column validation dataflow showing messy edge inputs passing through def parse_port(value) / classify_ip(text) to either return clean data or raise ValueError immediately, plus a key rule contrasting return against print()"
        },
        {
          "id": "fig-04-02-02",
          "title": "Figure 2.2: How Function Parameters Collect Arguments",
          "url": "/assets/courses/cyber-04/c04_m02_l01_parameter_unpacking_args_kwargs.png",
          "caption": "Figure 2.2: Parameter binding order showing positional slots, *args tuple packing, keyword-only flags, and **kwargs metadata dictionaries.",
          "alt": "Parameter binding diagram tracing summarise(22, 3389, label='admin', host='web-01') into *ports tuple, keyword-only label after *, and **extra dictionary"
        }
      ],
      "content": "## 1. Turning Ad-Hoc Script Snippets into Reusable Security Contracts\n\nModule 1 gave you inline expressions that classify a handful of ports or count login failures across a single hardcoded log sample. Real security operations quickly expose the weakness of repeating inline checks across multiple scripts: when port validation or IP classification appears in twelve places, updating the rule consistently becomes error-prone, and any unguarded branch allows malformed telemetry to slip deeper into an alert pipeline. **Functions** solve this fragmentation by giving a verified block of code a single, descriptive name, an explicit parameter interface, and an unambiguous return value or exception contract.\n\nAcross Lessons 2.1 through 2.4, every executable example builds directly on the official lab helper library `rkutils.py` and its driver script `m02_reusable.py`, both verified locally under Python 3.12.4 and documented alongside CPython 3.14.4 runs.\n\n## 2. Core Objectives for This Lesson\n\n- **Single-Responsibility Boundaries:** Encapsulate input normalization and bounds checks once inside reusable functions so downstream logic only sees validated objects.\n- **Return Semantics:** Distinguish returning a value (`return result`) from emitting console text (`print(result)`) and recognize Python's implicit `None` default return.\n- **Parameter Architecture:** Combine positional arguments, sensible defaults, keyword-only options (`*`), variable positional inputs (`*args`), and trailing metadata (`**kwargs`) cleanly.\n- **Documentation & Type Annotations:** Write runtime-inspectable docstrings (`help()`, `__doc__`) and PEP 484 / PEP 604 type hints (`str | int -> int`) while remembering that type hints do not perform runtime enforcement by themselves.\n\n## 3. Encapsulating Repeated Security Logic in Functions\n\nA Python function begins with the `def` header followed by parameters in parentheses, an optional return annotation, a colon, and an indented four-space body. The real engineering discipline happens at the **program boundary**—the exact point where untrusted strings from network sockets, CSV exports, user prompts, or API payloads enter your code. Validating once inside a boundary helper guarantees every caller either receives a canonical object or faces a clear exception immediately.\n\nInspect how `classify_ip()` in `rkutils.py` wraps Python's standard-library `ipaddress` parser so callers never replicate whitespace stripping and global/private/loopback branching logic:\n\n```python\nimport ipaddress\n\nWELL_KNOWN_MAX = 1023\n\n\ndef classify_ip(text: str) -> str:\n    \"\"\"Classify an IP address string as private, loopback, global, etc.\"\"\"\n    ip = ipaddress.ip_address(text.strip())     # may raise ValueError\n    if ip.is_loopback:\n        return \"loopback\"\n    if ip.is_private:\n        return \"private\"\n    if ip.is_global:\n        return \"global\"\n    return \"special\"\n```\n\n```python\nfor addr in (\"10.0.0.5\", \"127.0.0.1\", \"8.8.8.8\"):\n    print(addr, \"->\", classify_ip(addr))\n```\n\n```terminal\n10.0.0.5 -> private\n127.0.0.1 -> loopback\n8.8.8.8 -> global\n```\n\nObserve two critical mechanics inside `classify_ip()`:\n\n- **Early Return Guards:** Placing `if ip.is_loopback: return \"loopback\"` first avoids falsely grouping `127.0.0.1` only under generic special ranges, keeping branching flat without nested `else` ladders.\n- **Implicit vs. Explicit Returns:** Executing a `return <expr>` statement exits the function immediately and hands that object back to the caller. If execution falls off the bottom of a function without reaching a `return` statement—or hits a bare `return`—Python returns the singleton `None` object automatically. Confusing `print()` (side-effect output) with `return` (data hand-off) causes subtle `TypeError` or `None` propagation errors down the line.\n\n![Figure 2.1: Boundary Validation Function Contract](/assets/courses/cyber-04/c04_m02_l01_function_validation_contract.png)\n\n*Figure 2.1: Boundary validation function contract translating untrusted string inputs into verified integers or explicit ValueError exceptions.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Messy Edge Inputs (`Messy Inputs at Program Edge`):** Untrusted strings arrive with whitespace, valid ports, non-IP text, or out-of-range numbers (`\" 10.0.0.5 \"`, `\"443\"`, `\"not_an_ip\"`, `\"99999\"`).\n- **Single Validation Gate (`Validate Once Inside One Function`):** Centralizing normalization and rule checks inside `def parse_port(value) / classify_ip(text)` replaces 12 copy-pasted ad-hoc scripts with one reusable gate.\n- **Two Deterministic Outcomes (`Valid Input` vs. `Bad Input`):** Valid inputs leave via `return` as verified data, whereas malformed inputs `raise ValueError` loudly before touching files or alerts—reinforcing the key rule contrasting `return` against `print()` (`None`).\n\n> [!NOTE]\n> **Diagram Reference:** After reviewing Figure 2.1, notice how boundary validation acts as a fail-closed gate: valid strings and integers leave as verified canonical types (`int` in `[0, 65535]`, `IPv4Address`/`IPv6Address`), whereas malformed inputs halt immediately before reaching storage or command handlers.\n\n## 4. Docstrings and Type Hints as Machine-Readable Contracts\n\nA **docstring** is a triple-quoted string literal positioned as the very first statement of a module or function. Unlike `#` comments—which the Python parser strips completely—Python binds the docstring to the object's `__doc__` attribute so teammates, IDE tooltips, and automated documentation builders can read it live at runtime:\n\n```python\nimport rkutils\nhelp(rkutils.classify_ip)\n```\n\n```terminal\nHelp on function classify_ip in module rkutils:\n\nclassify_ip(text: str) -> str\n    Classify an IP address string as private, loopback, global, etc.\n```\n\nAlongside prose docstrings, PEP 484 type annotations declare the expected parameter types (`value: str | int`) and return type (`-> int`), using the modern PEP 604 union operator `|` introduced in Python 3.10:\n\n```python\ndef parse_port(value: str | int) -> int:\n    \"\"\"Return value as an int port 0-65535, or raise InvalidPortError.\"\"\"\n    ...\n```\n\n> [!WARNING]\n> **Annotations Are Metadata, Not Runtime Shields:** CPython checks annotation syntax when defining a function, **not** the types of values passed at call time. Calling `parse_port([\"unexpected\", \"list\"])` executes cleanly into the function body until explicit runtime code or static type checkers (`mypy`, `pyright`) intervene. Never omit runtime validation simply because type hints are present.\n\n## 5. Keyword-Only Parameters, `*args`, and `**kwargs`\n\nPython supports flexible parameter binding evaluated left to right, enabling clean, self-documenting security APIs. In `rkutils.py`, `summarise()` aggregates an arbitrary sequence of port integers alongside formatting metadata:\n\n```python\ndef summarise(*ports: int, label: str = \"ports\", **extra: str) -> str:\n    \"\"\"Summarise any number of ports; extra keyword fields are appended.\"\"\"\n    well_known = sum(1 for p in ports if p <= WELL_KNOWN_MAX)\n    text = f\"{label}: {len(ports)} total, {well_known} well-known\"\n    for key, val in sorted(extra.items()):\n        text += f\", {key}={val}\"\n    return text\n```\n\nRunning lines 16–17 of `m02_reusable.py` against `rkutils.summarise()` captures this exact verified output:\n\n```python\nprint(\"1.\", rkutils.summarise(22, 80, 443, 8443))\nprint(\"  \", rkutils.summarise(22, 3389, label=\"admin\", host=\"web-01\"))\n```\n\n```terminal\n1. ports: 4 total, 3 well-known\n   admin: 2 total, 1 well-known, host=web-01\n```\n\nLet us dissect each parameter form and security implication:\n\n- **Positional & Default Arguments:** Standard parameters (`value`, `label=\"ports\"`) accept arguments matched either by position or by name; any parameter with a default value must follow parameters without defaults in that group.\n- **Variable Positional Parameters (`*args`):** Placing `*ports` collects zero or more extra positional arguments into an immutable `tuple` (`(22, 80, 443, 8443)`). Inside `summarise()`, summing `1 for p in ports if p <= 1023` yields `3` well-known ports out of `4` total.\n- **Keyword-Only Parameters (after `*` or `*args`):** Because `label` sits *after* `*ports` (or after a standalone `*` marker in `def scan(target, *, dry_run=True)`), callers **cannot** pass `label` positionally (`summarise(22, 80, \"admin\")` would simply sweep `\"admin\"` into `ports` and fail numerical comparison, whereas after a bare `*`, passing a positional value triggers `TypeError`). Security-critical switches such as `dry_run=True`, `verify_tls=True`, or `allow_destructive=False` belong after `*` so callers cannot flip dangerous booleans invisibly by miscounting positional arguments.\n- **Variable Keyword Parameters (`**kwargs`):** Placing `**extra` at the end collects any unmatched named arguments into a `dict` (`{\"host\": \"web-01\"}`). Iterating `sorted(extra.items())` produces deterministic log output regardless of argument order.\n\n### Parameter Binding Reference Matrix\n\n| Parameter Form | Received Type | Positional Call Allowed | Mandatory Keyword Call | Security Best Practice |\n| :--- | :--- | :--- | :--- | :--- |\n| `target: str` | Passed object | Yes | Optional | Primary entity first; validate immediately |\n| `timeout: float = 5.0` | Passed object / default | Yes | Optional | Always enforce finite bounds on network I/O |\n| `*, verify_tls: bool = True` | Passed object / default | **No** | **Yes** | Forces dangerous overrides to be explicitly named |\n| `*ports: int` | `tuple` of args | Unlimited extra | No | Convenient for variadic port or target lists |\n| `**extra: str` | `dict` of extra keys | No | Unmatched keys | Sort keys before audit serialization; allowlist keys if passing to sinks |\n\n![Figure 2.2: How Function Parameters Collect Arguments](/assets/courses/cyber-04/c04_m02_l01_parameter_unpacking_args_kwargs.png)\n\n*Figure 2.2: Parameter binding order showing positional slots, *args tuple packing, keyword-only flags, and **kwargs metadata dictionaries.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Call-to-Parameter Routing (`summarise(22, 3389, label=\"admin\", host=\"web-01\")`):** Incoming arguments flow downward into Python's three collection slots by positional order, explicit keyword name, or unmatched metadata key.\n- **Variadic Positional Packing (`*ports`):** Captures any arbitrary count of positional values—here `(22, 3389)`—into an immutable tuple.\n- **Keyword-Only Enforcement (`label='admin'`):** Placing `label` after `*` requires callers to pass the parameter explicitly by name, protecting critical toggles such as `verify_tls=True` from positional mistakes.\n- **Extra Keyword Mapping (`**extra`):** Gathers remaining unmatched `name=value` arguments—here `{\"host\": \"web-01\"}`—into a metadata dictionary.\n\n## 6. Quantitative Engineering Note: Boundary Redundancy vs. Single-Source Validation\n\nQuantifying duplication helps teams prioritize refactoring. Suppose a SOC codebase validates TCP/UDP ports across $k = 12$ distinct ingestion scripts. Without encapsulation, updating a rule (for example, rejecting port `0` as unspecified instead of valid) demands $k = 12$ coordinated edits across scattered files, creating $k - 1 = 11$ opportunities for policy drift. Routing every entry point through a single `parse_port()` function collapses rule maintenance to $O(1)$—one tested implementation serving all callers—while ensuring rejection latency adds merely one lightweight call frame rather than duplicated regex or parsing bugs."
    },
    {
      "id": "les_c4_m2_l2",
      "title": "2.2 Scope (LEGB) and Mutable Default Traps",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Trace Python LEGB name resolution rules, isolate per-call state cleanly, eliminate shared mutable default parameter bugs, and recognize closure/global state hazards.",
      "learning_objectives": [
        "Resolve any variable reference deterministically using Python's Local, Enclosing, Global, Built-in (LEGB) lookup order",
        "Diagnose UnboundLocalError caused by assigning to a global name inside a function body without explicit parameter passing",
        "Eliminate cross-request state contamination by replacing mutable default lists/dicts with None sentinels",
        "Apply explicit parameter passing and return values instead of mutating shared module-level globals"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-03",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l02_legb_scope_resolution.png",
          "caption": "Figure 2.3: Python LEGB namespace resolution hierarchy from innermost local function frame out to built-in names.",
          "placement_hint": "After Section 3 (Python LEGB Resolution Order)"
        },
        {
          "id": "fig-04-02-04",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l02_mutable_default_argument_trap.png",
          "caption": "Figure 2.4: Definition-time evaluation sharing a single mutable default list across independent alerts versus safe None sentinel allocation.",
          "placement_hint": "After Section 5 (The Mutable Default Parameter Trap)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-03",
          "title": "Figure 2.3: How Python Searches Variable Names (LEGB Order)",
          "url": "/assets/courses/cyber-04/c04_m02_l02_legb_scope_resolution.png",
          "caption": "Figure 2.3: Python LEGB namespace resolution hierarchy from innermost local function frame out to built-in names.",
          "alt": "Four nested pastel namespace layers showing Python LEGB lookup from 1. Local inside current function outward through Enclosing and Global WELL_KNOWN_MAX = 1023 to 4. Built-in names"
        },
        {
          "id": "fig-04-02-04",
          "title": "Figure 2.4: Mutable Default Argument Trap vs. None Sentinel",
          "url": "/assets/courses/cyber-04/c04_m02_l02_mutable_default_argument_trap.png",
          "caption": "Figure 2.4: Definition-time evaluation sharing a single mutable default list across independent alerts versus safe None sentinel allocation.",
          "alt": "Two-panel comparison showing add_ioc_buggy with seen=[] merging two independent alert lists into one shared object vs add_ioc_safe with seen=None allocating separate fresh lists per call"
        }
      ],
      "content": "## 1. Why Namespace Discipline Prevents Hidden Security State Bugs\n\nEven carefully validated functions fail subtly if they accidentally read stale module globals or leak state from one investigation into the next. When an incident responder processes multiple firewall rules or user sessions in a single script run, variable names inside functions follow deterministic namespace lookup rules—and one notorious Python quirk evaluates default parameter expressions once at *definition* time rather than per function *call*. Understanding exact resolution order eliminates subtle data cross-contamination before it strikes live production telemetry.\n\n## 2. Core Objectives for This Lesson\n\n- **LEGB Resolution Rules:** Predict exactly which binding Python resolves across Local, Enclosing, Global, and Built-in scopes.\n- **Assignment Trap Diagnosis:** Explain why assigning to a global name inside a function without `global` triggers `UnboundLocalError`, and why explicit parameters replace globals cleanly.\n- **Mutable Default Elimination:** Identify why `def record(ip, seen=[])` shares a single list across independent calls and rewrite it using the `None` sentinel idiom.\n- **Reference vs. Immutability Discipline:** Guard caller-owned collections so pure inspection functions never surprise upstream code by mutating passed lists or dictionaries in place.\n\n## 3. Python's LEGB Resolution Hierarchy\n\nWhenever Python evaluates a bare variable name inside a function body, the runtime searches four nested **namespaces** strictly from inside out, stopping at the first match:\n\n- **Local (`L`):** Names assigned anywhere inside the currently executing function's frame (parameters, local variables, comprehension loop targets). Local frames are created fresh upon each function call and discarded upon return.\n- **Enclosing (`E`):** Names defined in the local scope of any lexically enclosing outer function (relevant when helper functions are nested inside another `def`).\n- **Global (`G`):** Top-level names bound at module level (for instance `WELL_KNOWN_MAX = 1023` in `rkutils.py` or imported module objects such as `ipaddress`).\n- **Built-in (`B`):** Predefined Python language names loaded from `builtins` (`len`, `int`, `ValueError`, `True`, `None`).\n\n```python\nWELL_KNOWN_MAX = 1023  # Global scope (G)\n\n\ndef is_well_known(port: int) -> bool:\n    \"\"\"Check against the Global constant from Local parameter scope.\"\"\"\n    threshold = WELL_KNOWN_MAX  # Resolves local 'threshold' -> global WELL_KNOWN_MAX\n    return 0 <= port <= threshold\n```\n\n### The `UnboundLocalError` Assignment Rule\n\nA frequent source of confusion arises when code tries both to read and update a global counter inside a function without passing it explicitly:\n\n```python\nfailed_count = 0\n\n\ndef record_failure() -> None:\n    failed_count += 1  # Compilation marks 'failed_count' Local because of '='!\n```\n\n```terminal\nUnboundLocalError: cannot access local variable 'failed_count' where it is not associated with a value\n```\n\nBecause `failed_count += 1` is syntactic sugar for `failed_count = failed_count + 1`, Python's compiler classifies `failed_count` as a **local** variable across the entire function body. When execution reaches the right-hand read of `failed_count` before any local assignment completes, Python raises `UnboundLocalError`. Rather than reaching for the `global` keyword—which creates hidden shared state that breaks concurrency and unit testing—pass state explicitly as arguments and return updated values cleanly:\n\n```python\ndef increment_failure(counts: dict[str, int], user: str) -> dict[str, int]:\n    \"\"\"Return updated counts safely; explicit parameter avoids global coupling.\"\"\"\n    updated = counts.copy()\n    updated[user] = updated.get(user, 0) + 1\n    return updated\n```\n\n> [!TIP]\n> **Constants Yes, Mutable Globals No:** Uppercase module constants such as `WELL_KNOWN_MAX = 1023` or `DEFAULT_TIMEOUT = 10.0` are clean and idiomatic because they are never reassigned at runtime. Avoid mutating global dictionaries or counters across functions; pass state cleanly in and return results out.\n\n![Figure 2.3: How Python Searches Variable Names (LEGB Order)](/assets/courses/cyber-04/c04_m02_l02_legb_scope_resolution.png)\n\n*Figure 2.3: Python LEGB namespace resolution hierarchy from innermost local function frame out to built-in names.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Inner-to-Outer Search Hierarchy (`1. L -> 2. E -> 3. G -> 4. B`):** Python searches namespaces sequentially from `1. L — Local` (`threshold = WELL_KNOWN_MAX` inside the active function) outward through `2. E — Enclosing` and `3. G — Global` (`WELL_KNOWN_MAX = 1023`) to `4. B — Built-in` (`len`, `int`, `ValueError`, `True`).\n- **First-Match Short-Circuit:** Lookup stops immediately at the innermost frame where a symbol is bound, ensuring local definitions win cleanly over outer names.\n- **Shadowing Prevention (`Never name variables len or list!`):** Binding a built-in name locally intercepts lookup before step `4` ever reaches Python's genuine built-in functions.\n\n## 4. Protecting Built-in Names from Local Shadowing\n\nBecause Local (`L`) shadows Global (`G`), and Global shadows Built-in (`B`), naming a parameter `list`, `dict`, `id`, `len`, or `input` silently hides Python's built-in object for the rest of that scope:\n\n```python\ndef parse_batch(id: str, len: int) -> str:\n    return f\"{id}:{len}\"  # Within parse_batch, calling len(x) now raises TypeError!\n```\n\nAlways pick descriptive domain nouns (`event_id`, `max_length`, `ports`, `raw_text`) so neither standard built-ins nor module names are masked.\n\n## 5. The Mutable Default Parameter Trap\n\nDefault parameter expressions in Python are evaluated **once when the `def` statement executes** at module load—**not** freshly on every function invocation. When a default value is immutable (`0`, `None`, `\"ports\"`, `True`), reusing that default across calls is completely harmless. When a default value is mutable (`[]`, `{}`, `set()`), every caller omitting that argument shares and mutates the exact same underlying heap object!\n\nWatch what happens when an analyst writes a naive batch tracker with `seen=[]`:\n\n```python\ndef add_ioc_buggy(ioc: str, seen: list[str] = []) -> list[str]:\n    seen.append(ioc)\n    return seen\n\n\ncase_a = add_ioc_buggy(\"198.51.100.10\")\ncase_b = add_ioc_buggy(\"203.0.113.7\")\nprint(\"case_a:\", case_a)\nprint(\"case_b:\", case_b)\nprint(\"same object?\", case_a is case_b)\n```\n\n```terminal\ncase_a: ['198.51.100.10', '203.0.113.7']\ncase_b: ['198.51.100.10', '203.0.113.7']\nsame object? True\n```\n\nNotice the severity in multi-tenant or sequential incident triage: Investigation `case_a` silently acquired indicators belonging to Investigation `case_b` because `case_a is case_b` is `True`—both names point to the single list object allocated when `def add_ioc_buggy` executed!\n\n### The Safe `None` Sentinel Fix\n\nReplace any mutable default with `None` and allocate a fresh container inside the function body whenever the caller omits it:\n\n```python\ndef add_ioc_safe(ioc: str, seen: list[str] | None = None) -> list[str]:\n    \"\"\"Append ioc to a caller-provided list, or allocate a fresh list per call.\"\"\"\n    target = list(seen) if seen is not None else []\n    target.append(ioc)\n    return target\n\n\nsafe_a = add_ioc_safe(\"198.51.100.10\")\nsafe_b = add_ioc_safe(\"203.0.113.7\")\nprint(\"safe_a:\", safe_a, \"| safe_b:\", safe_b, \"| aliased?\", safe_a is safe_b)\n```\n\n```terminal\nsafe_a: ['198.51.100.10'] | safe_b: ['203.0.113.7'] | aliased? False\n```\n\nLook closely at the expression `target = list(seen) if seen is not None else []`: even when a caller supplies an existing list `seen`, constructing a shallow copy (`list(seen)`) protects the caller's original list from unexpected in-place mutation unless in-place mutation is explicitly documented as the function's job.\n\n> [!CAUTION]\n> **Silent Evidence Bleeding:** In automated SOC alert enrichers, mutable default arguments (`headers={}`, `tags=[]`, `allowlist=set()`) leak HTTP tokens, customer identifiers, or malicious domains between unrelated tickets. Treat `=[]`, `={}`, and `=set()` in function headers as automatic code-review defects caught identically by static linters (`ruff` rule `B006`).\n\n![Figure 2.4: Mutable Default Argument Trap vs. None Sentinel](/assets/courses/cyber-04/c04_m02_l02_mutable_default_argument_trap.png)\n\n*Figure 2.4: Definition-time evaluation sharing a single mutable default list across independent alerts versus safe None sentinel allocation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Shared Definition-Time List (`Unsafe: seen=[] Shares One List`):** Because Python creates `[]` once when `def` runs, calling `add_ioc_buggy(\"198.51.100.10\")` and `add_ioc_buggy(\"203.0.113.7\")` mutates one single list `['198.51.100.10', '203.0.113.7']`, so `case_a is case_b` evaluates to `True` and bleeds investigation data across alerts.\n- **Fresh Per-Call Allocation (`Safe: seen=None Makes Fresh Lists`):** Switching to `seen=None` allocates a dedicated list inside the function body per invocation (`['198.51.100.10']` vs. `['203.0.113.7']`), keeping `safe_a is safe_b` strictly `False`.\n- **Defensive Caller Isolation:** Writing `target = list(seen) if seen is not None else []` also prevents mutating an existing list passed by a caller.\n\n## 6. Quantitative State Isolation Analysis\n\nConsider a detection daemon evaluating $N$ sequential customer events through a helper carrying a mutable default `tags=[]`. If each ticket averages $t = 3$ added indicators, after $N = 100$ tickets the shared default list accumulates $N \\times t = 300$ leaked indicators—99% of which belong to unrelated incidents—while memory growth scales unboundedly across the daemon's lifetime ($\\Theta(N \\cdot t)$). Switching to the `None` sentinel restores true stateless isolation: each invocation holds strictly its own $O(t)$ tags and releases memory cleanly as soon as the ticket closes."
    },
    {
      "id": "les_c4_m2_l3",
      "title": "2.3 Modules, Imports, sys.path, and Script Hygiene",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Organize reusable helpers like rkutils.py into cohesive modules, control exported symbols, defend against sys.path local directory planting, and separate library import behavior via __name__ == '__main__'.",
      "learning_objectives": [
        "Choose among import module, from module import name, and aliased imports while avoiding wildcard namespace pollution",
        "Explain Python's sys.path module search precedence starting from sys.path[0] script directory",
        "Defend defensive automation against planted-module hijacking using safe module naming and python -I isolated mode",
        "Separate reusable API definitions from self-tests and CLI entry points using __all__ and if __name__ == '__main__'"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-05",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l03_sys_path_import_hijacking.png",
          "caption": "Figure 2.5 (C04-M02-F2): sys.path module search order showing how a planted file in the script directory shadows the standard library.",
          "placement_hint": "After Section 4 (sys.path Ordering and Planted-Module Hijacking)"
        },
        {
          "id": "fig-04-02-06",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l03_dunder_name_main_guard.png",
          "caption": "Figure 2.6: Dual-mode module execution showing __name__ == '__main__' running self-tests directly while import rkutils suppresses them.",
          "placement_hint": "After Section 6 (Separating Importable APIs via __main__ Guard)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-05",
          "title": "Figure 2.5: How sys.path Order Enables Import Hijacking",
          "url": "/assets/courses/cyber-04/c04_m02_l03_sys_path_import_hijacking.png",
          "caption": "Figure 2.5 (C04-M02-F2): sys.path module search order showing how a planted file in the script directory shadows the standard library.",
          "alt": "Ordered sys.path diagram showing import json loading a planted json.py from sys.path[0] (/tmp/incident-42) before reaching the Standard Library, alongside three defenses including python -I isolated mode"
        },
        {
          "id": "fig-04-02-06",
          "title": "Figure 2.6: How if __name__ == \"__main__\" Protects Reusable Modules",
          "url": "/assets/courses/cyber-04/c04_m02_l03_dunder_name_main_guard.png",
          "caption": "Figure 2.6: Dual-mode module execution showing __name__ == '__main__' running self-tests directly while import rkutils suppresses them.",
          "alt": "Two-branch execution flowchart for rkutils.py comparing direct execution python rkutils.py (__name__ == '__main__', running self-tests) against import rkutils (__name__ == 'rkutils', loading helpers quietly)"
        }
      ],
      "content": "## 1. Scaling Security Helpers from One Script to Clean Modules\n\nCopying `parse_port()` and `classify_ip()` into every triage script eventually breaks consistency. In Python, any UTF-8 source file ending in `.py` automatically acts as a **module** whose filename (minus `.py`) is its importable identifier. A **package** extends that layout to a directory containing modules (often organized with an `__init__.py` or namespace structure and distributed via PyPI). Yet simply importing a module introduces two security and reliability hazards every engineer must govern: module search path precedence (`sys.path`) and unintended top-level side effects when library files are loaded.\n\n## 2. Core Objectives for This Lesson\n\n- **Clean Import Forms:** Choose accurately between `import rkutils` and explicit `from rkutils import InvalidPortError, parse_port` while avoiding ambiguous wildcard imports.\n- **`sys.path` Ordering & Hijacking:** Explain why Python searches the script directory (`sys.path[0]`) ahead of the standard library and how a planted `.py` file hijacks execution.\n- **Runtime Defenses:** Mitigate module planting with trusted permissions, non-colliding filenames, and Python's isolated execution mode (`python -I`).\n- **Dual-Purpose Modules:** Partition library definitions (`__all__`) from standalone self-tests or CLI drivers using `if __name__ == \"__main__\":`.\n\n## 3. Anatomy of a Reusable Security Module (`rkutils.py`)\n\nExamine the full structure of `rkutils.py` alongside how `m02_reusable.py` imports it:\n\n```python\nimport rkutils\nfrom rkutils import InvalidPortError, parse_port\n```\n\nCompare the three Python import patterns before writing team code:\n\n- **Namespace Module Import (`import rkutils`):** Binds the module object `rkutils`, requiring qualified calls (`rkutils.classify_ip(...)`, `rkutils.summarise(...)`). Qualification makes the origin of every helper unmistakable during security code review.\n- **Explicit Symbol Import (`from rkutils import InvalidPortError, parse_port`):** Binds only named symbols locally while still executing `rkutils.py` once (Python caches loaded modules in `sys.modules` so repeated imports reuse the already-initialized module object). Keep the list short and explicit.\n- **Wildcard Import (`from rkutils import *`) — Avoid:** Silently dumps every public name (or those listed in `__all__`) into the caller's namespace, masking where functions originate and risking accidental overwrites of local variables.\n\nMeanwhile, `rkutils.py` declares an explicit `__all__` tuple near the top:\n\n```python\n__all__ = [\"InvalidPortError\", \"parse_port\", \"classify_ip\", \"summarise\"]\n```\n\nDefining `__all__` serves two purposes: it documents the module's supported public API for maintainers and restricts what `help()` summaries or `*` imports advertise, shielding internal helpers or constants like `WELL_KNOWN_MAX`.\n\n## 4. `sys.path` Search Precedence and Planted-Module Hijacking\n\nWhen you execute `import json` or `import rkutils`, Python walks the directory list `sys.path` strictly in index order and loads the **very first match** it discovers:\n\n1. **`sys.path[0]` — The Script Directory:** When running `python tool.py`, Python inserts the directory containing `tool.py` at index `0` (or `\"\"`, the current working directory, in an interactive REPL or `python -m`).\n2. **`PYTHONPATH` Environment Entries:** Any colon- or semicolon-separated directories injected into `PYTHONPATH` (ignored under `-E` or `-I`).\n3. **Standard Library Directories:** Built-in standard modules (`json`, `ipaddress`, `hashlib`, `logging`, `csv`).\n4. **`site-packages` Directories:** Third-party packages installed into the active virtual environment or system Python.\n\nNotice the subtle trap: `sys.path[0]` sits **above** Python's own standard library! Suppose an analyst opens a forensic dump folder `/tmp/incident-42` containing untrusted artifacts extracted from a compromised server—and someone dropped a malicious file named `json.py` or `logging.py` inside that folder. Running a triage script inside `/tmp/incident-42` executes the attacker's local `json.py` instead of the legitimate standard library module, silently obtaining full user or privileged execution!\n\nVerify how Python resolves paths locally using a clean inspection command (never run inside an untrusted directory):\n\n```bash\npython -c \"import sys, pprint; pprint.pprint(sys.path)\"\n```\n\n### Controlling `sys.path` Hijacking\n\nApply these three overlapping safeguards across workstation workflows and production servers:\n\n- **Never Run Python inside Untrusted or World-Writable Directories:** Store signed scripts inside dedicated root- or user-owned application directories (`C:\\sec-tools\\` or `/opt/sec-tools/`) and pass untrusted data paths explicitly as arguments rather than `cd`-ing into download folders and running `python -c` or REPL commands.\n- **Use Isolated Mode (`python -I`) for Privileged or Unattended Tools:** Passing `-I` strips **both** the script's directory (`sys.path[0]`) and user `site-packages` from `sys.path`, and ignores `PYTHON*` environment variables (`PYTHONPATH`, `PYTHONSTARTUP`). Note carefully that `-I` also prevents importing sibling local helper modules from the same folder unless the helper lives inside the active environment's `site-packages`.\n- **Never Name Your Scripts After Standard Modules:** Creating your own test script named `socket.py`, `json.py`, `csv.py`, or `logging.py` shadows the real standard library immediately (`AttributeError: partially initialized module 'json' has no attribute 'loads'`). Always choose distinct project prefixes (`rkutils.py`, `secutils.py`, `m02_reusable.py`).\n\n![Figure 2.5: How sys.path Order Enables Import Hijacking](/assets/courses/cyber-04/c04_m02_l03_sys_path_import_hijacking.png)\n\n*Figure 2.5 (C04-M02-F2): sys.path module search order showing how a planted file in the script directory shadows the standard library.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **First-Match Search Stack (`Normal Run: python tool.py`):** When running `import json`, Python checks step `1` (`sys.path[0]`, the script or working directory `/tmp/incident-42`) ahead of `PYTHONPATH`, `sys.path[2]` (the genuine Standard Library `json`), and `sys.path[3]` (`site-packages`), so a planted `json.py` executes immediately while steps `2`–`4` are never reached.\n- **Isolated Runtime Defense (`python -I tool.py`):** Isolated mode strips both `sys.path[0]` and `PYTHONPATH`, forcing Python to resolve imports straight from the real Standard Library.\n- **Operational & Naming Safeguards:** Keeping tools inside protected directories (never running inside download or dump folders) and avoiding standard module filenames prevents accidental or planted shadowing.\n\n## 5. Mathematical View: Search Precedence Shadowing Probability\n\nLet $S = [d_0, d_1, \\dots, d_{m-1}]$ denote the ordered `sys.path` array, where $d_0$ is the script/working directory and $d_{\\text{std}}$ ($d_k$ for some $k \\ge 1$) is the standard library directory. For any module name $M$, the imported file $F(M)$ equals the element at the minimal index $i^*$:\n\n$$\ni^* = \\min \\{ i \\in \\{0, \\dots, m-1\\} \\mid M.\\text{py} \\in d_i \\text{ or package } M \\in d_i \\}\n$$\n\nWhenever $d_0$ is writable by an unprivileged user or populated from untrusted archives while $i = 0 < k$, **every** non-built-in standard module name (`json`, `csv`, `urllib`, `subprocess`) triggers $i^* = 0$ rather than $i^* = k$. Invoking `python -I` removes $d_0$ and environment-injected paths from $S$ cleanly, restoring the invariant $i^* = k$.\n\n## 6. Separating Importable APIs from Executable Code (`__name__ == \"__main__\"`)\n\nEvery Python module automatically receives a special dunder string variable `__name__` set at load time:\n\n- **Direct Execution (`python rkutils.py`):** Python sets `__name__` to the literal string `\"__main__\"`.\n- **Module Import (`import rkutils`):** Python sets `__name__` to the module's name (`\"rkutils\"`).\n\nExamine lines 50–54 of `rkutils.py`:\n\n```python\nif __name__ == \"__main__\":\n    # Runs only when executed directly (python rkutils.py), not on import.\n    assert parse_port(\"443\") == 443\n    assert classify_ip(\"10.1.2.3\") == \"private\"\n    print(\"rkutils self-test passed\")\n```\n\nLook at the two verified runs captured in our lab environment:\n\n```bash\npython rkutils.py\n```\n\n```terminal\nrkutils self-test passed\n```\n\nWhen `m02_reusable.py` imports `rkutils`, the assertions and `\"rkutils self-test passed\"` print line stay completely quiet because `rkutils.__name__` equals `\"rkutils\"`, while line 63 of `m02_reusable.py` outputs:\n\n```terminal\n6. rkutils.__name__ = rkutils | this file: __main__\n```\n\nKeep top-level module code strictly declarative (`import`, constants, `class` / `def` definitions). Performing network requests, deleting files, or printing banners outside `if __name__ == \"__main__\":` causes side effects every time another test suite or tool imports your helper.\n\n> [!NOTE]\n> **Runtime Note on `assert`:** Keep `assert` inside self-tests and `unittest` suites (Module 8), never for validating untrusted user inputs in production functions: launching Python with optimization (`python -O`) strips every `assert` statement completely! Always enforce input validation with explicit `if ...: raise CustomError(...)`.\n\n![Figure 2.6: How if __name__ == \"__main__\" Protects Reusable Modules](/assets/courses/cyber-04/c04_m02_l03_dunder_name_main_guard.png)\n\n*Figure 2.6: Dual-mode module execution showing __name__ == '__main__' running self-tests directly while import rkutils suppresses them.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Shared API vs. Guarded Test Zone (`Inside File: rkutils.py`):** Reusable helper definitions (`parse_port()`, `classify_ip()`, `summarise()`) remain always importable, while test execution sits inside `if __name__ == \"__main__\":`.\n- **Direct Execution (`Mode 1: Direct Run`):** Launching `python rkutils.py` sets `__name__` to `\"__main__\"`, evaluating `True` so `\"rkutils self-test passed\"` runs cleanly.\n- **Library Reuse (`Mode 2: Imported Helper`):** Running `import rkutils` binds `__name__` to `\"rkutils\"`, evaluating `False` so importing tools gain all helpers silently without executing test assertions or unwanted prints."
    },
    {
      "id": "les_c4_m2_l4",
      "title": "2.4 Exceptions, Chaining, and Diagnostic Logging",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Replace silent magic error values and bare except blocks with deliberate try/except/else/finally control flow, domain-specific exception classes, raise ... from chaining, and secret-safe Python logging.",
      "learning_objectives": [
        "Trace exact execution paths across try, targeted except, success-only else, and guaranteed finally blocks",
        "Define custom exception subclasses such as InvalidPortError(ValueError) and preserve root causes via raise ... from exc",
        "Prove why bare except and except Exception: pass mask NameError bugs and cause prolonged silent SOC outages",
        "Configure Python logging levels (DEBUG..CRITICAL) with log.warning/log.exception while never logging credentials"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-07",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l04_exception_flow_control.png",
          "caption": "Figure 2.7 (C04-M02-F1): Deterministic control flow across try, matching except, success-only else, propagation, and guaranteed finally.",
          "placement_hint": "After Section 3 (try / except / else / finally Execution Semantics)"
        },
        {
          "id": "fig-04-02-08",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l04_bare_except_masking_vs_chaining.png",
          "caption": "Figure 2.8: Bare except swallowing a NameError and halting SOC alert visibility versus narrow exception catching with __cause__ preservation.",
          "placement_hint": "After Section 6 (Case Study: The Except That Hid an Outage)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-07",
          "title": "Figure 2.7: Control Flow Across try / except / else / finally",
          "url": "/assets/courses/cyber-04/c04_m02_l04_exception_flow_control.png",
          "caption": "Figure 2.7 (C04-M02-F1): Deterministic control flow across try, matching except, success-only else, propagation, and guaranteed finally.",
          "alt": "Left-to-right three-track control-flow diagram showing try exiting to else on No Error, except InvalidPortError on Matching Error, or Skipped propagation on Unmatched Error, with all three converging into finally ALWAYS RUNS"
        },
        {
          "id": "fig-04-02-08",
          "title": "Figure 2.8: Bare except Masking Bugs vs. Specific Error Chaining",
          "url": "/assets/courses/cyber-04/c04_m02_l04_bare_except_masking_vs_chaining.png",
          "caption": "Figure 2.8: Bare except swallowing a NameError and halting SOC alert visibility versus narrow exception catching with __cause__ preservation.",
          "alt": "Two-column comparison contrasting bare except catching a NameError typo and hiding outages with return 0 against catching (TypeError, ValueError) and preserving root cause via raise InvalidPortError(...) from exc"
        }
      ],
      "content": "## 1. Failing Loudly Instead of Hiding Operational Blindness\n\nEarlier in Module 1, calling `int(\"https\")` raised `ValueError` and crashed an unguarded script immediately. A beginner might wrap code in a catch-all block to keep a daemon running—yet silent error suppression is far more destructive in security engineering than an honest crash. Returning magic sentinel values like `-1` forces every caller to remember manual checks, whereas ignoring exceptions hides broken credentials, permission errors, and typos inside scripts that claim to run \"cleanly\" for weeks. Python's exception architecture and structured `logging` module ensure expected bad inputs are isolated safely while genuine bugs surface immediately.\n\n## 2. Core Objectives for This Lesson\n\n- **`try / except / else / finally` Control Flow:** Trace every normal, handled-error, unhandled-propagation, and cleanup path without ambiguity.\n- **Custom Domain Exceptions & Chaining:** Subclass built-in exceptions (`class InvalidPortError(ValueError)`) and preserve root causes via `raise ... from exc`.\n- **Bare `except` Forensics:** Prove empirically using `m02_reusable.py` and the Orchid Payments case study why `except:` or `except Exception: pass` destroys detection visibility.\n- **Secret-Safe Structured Logging:** Configure Python `logging` levels (`WARNING`, `ERROR`, `log.exception`) while enforcing strict non-logging of tokens, API keys, and passwords.\n\n## 3. `try / except / else / finally` Execution Semantics\n\nPython's four-clause exception handler separates success logic cleanly from recovery and cleanup:\n\n```python\ninputs = [\"443\", \"70000\", \"https\", None, \"22\"]\nvalid = []\nfor raw in inputs:\n    try:\n        port = parse_port(raw)\n    except InvalidPortError as err:\n        log.warning(\"rejected %r: %s\", raw, err)\n    else:\n        valid.append(port)            # runs only if no exception\n    finally:\n        pass                          # always runs (cleanup goes here)\nprint(\"2. valid ports:\", valid)\n```\n\nLet us trace every branch precisely (cross-reference Figure 2.7 / `C04-M02-F1`):\n\n- **`try:`** Executes the potentially failing code block first. Keep the `try` suite as narrow as possible so unrelated statements are not accidentally caught.\n- **`except InvalidPortError as err:`** Executes **only** if an exception matching `InvalidPortError` (or a subclass) is raised inside `try`. Non-matching errors skip this clause and propagate immediately upward (running `finally` on the way out).\n- **`else:`** Executes **only** when `try` completes cleanly with zero exceptions—ideal for appending validated results (`valid.append(port)`) without widening the `try` scope.\n- **`finally:`** Executes **unconditionally** in all outcomes—normal completion, caught exception, `return` inside `try`, or uncaught propagation—making it the deterministic home for releasing temporary lockfiles or sockets (alongside `with` context managers in Module 3).\n\nVerify the live execution captured from `m02_reusable.py` on `STDERR` and `STDOUT`:\n\n```bash\npython m02_reusable.py\n```\n\n```terminal\nWARNING rejected '70000': out of range: 70000\nWARNING rejected 'https': not a number: 'https'\nWARNING rejected None: not a number: None\n2. valid ports: [443, 22]\n```\n\nObserve why logging went to `STDERR` while `print(\"2. valid ports: ...\")` wrote to `STDOUT`: standard Unix/Windows pipeline hygiene keeps diagnostic warnings out of machine-parsed standard output streams!\n\n![Figure 2.7: Control Flow Across try / except / else / finally](/assets/courses/cyber-04/c04_m02_l04_exception_flow_control.png)\n\n*Figure 2.7 (C04-M02-F1): Deterministic control flow across try, matching except, success-only else, propagation, and guaranteed finally.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three Parallel Branch Tracks (`try:` Exit Paths):** Calling `port = parse_port(raw)` branches into `else: valid.append(port)` when **No Error** is raised, `except InvalidPortError as err:` (`log.warning(\"rejected %r: %s\", raw, err)`) on a **Matching Error**, or `Skipped!` on an **Unmatched Error** that must propagate upward loudly.\n- **Unconditional Cleanup (`finally: ALWAYS RUNS!`):** All three outcome lanes converge into `finally:`, guaranteeing cleanup runs after success, handled exceptions, or unhandled exits alike.\n\n## 4. Custom Exceptions and Chaining Causes (`raise ... from`)\n\nStandard exceptions (`ValueError`, `TypeError`) convey built-in faults, while domain-specific classes communicate security contract violations directly to callers. In `rkutils.py`:\n\n```python\nclass InvalidPortError(ValueError):\n    \"\"\"Raised when a value is not a valid TCP/UDP port number.\"\"\"\n\n\ndef parse_port(value: str | int) -> int:\n    \"\"\"Return value as an int port 0-65535, or raise InvalidPortError.\"\"\"\n    try:\n        port = int(value)\n    except (TypeError, ValueError) as exc:\n        raise InvalidPortError(f\"not a number: {value!r}\") from exc\n    if not 0 <= port <= 65535:\n        raise InvalidPortError(f\"out of range: {port}\")\n    return port\n```\n\nLook closely at three architectural strengths here:\n\n1. **Inheriting from `ValueError`:** Because `InvalidPortError` subclasses `ValueError`, callers can either catch `InvalidPortError` specifically or catch `ValueError` broadly—both honor Python's exception hierarchy.\n2. **Tuple of Exceptions:** `except (TypeError, ValueError) as exc:` catches non-numeric strings (`\"https\"` raises `ValueError`) and non-convertible objects (`None` raises `TypeError`) uniformly at the validation boundary.\n3. **Preserving Root Causes via `from exc`:** Raising `InvalidPortError(...) from exc` binds the original low-level exception to `err.__cause__`. If you need to suppress noisy internals deliberately without chaining, Python provides `from None`; in security triage, retaining `__cause__` gives engineers both clean domain context and full low-level diagnosis:\n\n```terminal\n3. InvalidPortError - not a number: 'abc' | cause: ValueError\n```\n\nNotice too why returning a custom exception beats returning magic integers like `-1`: `-1` can easily flow undetected into arithmetic or list indexing (`ports[-1]` silently fetches the last element in Python!), whereas an unhandled exception cannot be ignored silently.\n\n## 5. Why Bare `except:` Is Dangerous: Verified Demonstration\n\nInspect lines 47–60 of `m02_reusable.py`, where `buggy_total()` contains a deliberate typo (`valuez` instead of `values`) shielded by a bare `except:`:\n\n```python\ndef buggy_total(values):\n    try:\n        return sum(values) / len(valuez)     # typo: NameError\n    except:                                   # noqa: E722 (deliberate)\n        return 0\n\ndef better_total(values):\n    try:\n        return sum(values) / len(values)\n    except ZeroDivisionError:\n        return 0\n```\n\nRunning `[1, 2, 3]` gives this exact verified output:\n\n```terminal\n5. buggy: 0 | better: 2.0 | better(empty): 0\n```\n\nLook at what happened: `buggy_total([1, 2, 3])` triggered a genuine programming bug (`NameError: name 'valuez' is not defined`), yet the bare `except:` caught it silently and returned `0`—the identical return value expected for an empty sequence! Worse yet, bare `except:` even catches `KeyboardInterrupt` (`Ctrl+C`) and `SystemExit`, preventing analysts from interrupting hung console runs cleanly. Always name the exact recoverable exception class (`except ZeroDivisionError:`, `except InvalidPortError:`), and inspect `better_total([])`: empty lists return `0`, whereas typos fail immediately with a crystal-clear `NameError`.\n\n## 6. Case Study: The Except That Hid an Outage\n\nThis brief operational scenario demonstrates how a single broad exception handler masks programmer mistakes and breaks incident detection silently.\n\n### Case Study C04-M02-CS2 (Fictional Teaching Scenario): Orchid Payments\n\n*Disclaimer: This teaching scenario is fictional and models a widespread SOC engineering failure mode.*\n\n- **Context:** A SOC at Orchid Payments scheduled a Python script every five minutes to pull security alerts from a third-party cloud vendor API and forward them into an internal ticketing queue. To ensure the script \"never crashed,\" its author wrapped the entire main loop inside `try: ... except: pass`.\n- **Root Cause & Silent Outage:** The vendor updated its API authentication scheme. Every polling invocation failed with an HTTP/authentication exception, which the bare `except: pass` quietly swallowed while returning exit code `0`. Automated host monitoring saw the job exiting cleanly every five minutes for **three full weeks** while **zero** security alerts reached SOC analysts.\n- **Detection & Remediation:** An analyst eventually noticed the unusual emptiness of the alert queue during a manual review. Remediation replaced `except: pass` with specific network/HTTP exception handling, `log.exception(...)` error capture, non-zero exit codes on persistent failures, and an external **dead man's switch** watchdog alerting engineers whenever ingest heartbeats fell silent past their expected interval.\n\n### Quantifying Alert Blind-Spot Exposure\n\nEven modest polling misconfigurations compound rapidly when failures fail silently. Consider the relationship between scheduling cadence and missed detections during an unmonitored outage:\n\n:::math-steps\nStep 01: Compute daily polling executions at a five-minute interval\n$$n_{\\text{day}} = \\frac{24 \\text{ hours} \\times 60 \\text{ min/hour}}{5 \\text{ min/run}} = 288 \\text{ runs/day}$$\nResult: 288 silent `exit 0` cycles occur every 24 hours\n\nStep 02: Compute total masked failures across the three-week outage window\n$$N_{\\text{masked}} = 21 \\text{ days} \\times 288 \\text{ runs/day} = 6{,}048 \\text{ masked failures}$$\nResult: 6,048 consecutive error tracebacks suppressed without a single log entry\n\nStep 03: Compare detection delay with a 15-minute dead man's switch watchdog\n$$\\text{Exposure Reduction} = \\frac{21 \\times 1{,}440 \\text{ min}}{15 \\text{ min}} = 2{,}016\\times$$\nResult: A dead man's switch limits blind dwell time from 30,240 minutes to at most 15 minutes\n:::\n\n![Figure 2.8: Bare except Masking Bugs vs. Specific Error Chaining](/assets/courses/cyber-04/c04_m02_l04_bare_except_masking_vs_chaining.png)\n\n*Figure 2.8: Bare except swallowing a NameError and halting SOC alert visibility versus narrow exception catching with __cause__ preservation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Silent Masking (`Unsafe: Bare except: Hides Bugs`):** Wrapping buggy code (`sum(values) / len(valuez)` triggering `NameError`) inside `except: return 0` swallows typos, authentication failures, and even `Ctrl+C`, returning `0` so an outage looks indistinguishable from an empty list.\n- **Fail-Loud Chaining (`Safe: Exact Catch + raise ... from exc`):** Catching only expected conversion faults (`except (TypeError, ValueError) as exc:`) and chaining `raise InvalidPortError(...) from exc` preserves the low-level traceback on `__cause__` while letting real programming errors fail loudly immediately.\n\n## 7. Diagnostic Logging Without Leaking Secrets\n\nProduction tools replace scattered `print()` diagnostics with Python's `logging` module (`DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL`):\n\n```python\nimport logging\n\nlogging.basicConfig(level=logging.INFO, format=\"%(levelname)s %(message)s\")\nlog = logging.getLogger(\"m02\")\n\ntry:\n    parse_port(\"bad-input\")\nexcept InvalidPortError:\n    log.exception(\"Failed to parse port field from ingest feed\")  # Includes full traceback at ERROR\n```\n\n> [!CAUTION]\n> **Never Log Secrets in Plaintext:** Logs are routinely forwarded to centralized SIEM dashboards, disk archives, and ticketing systems accessible to wide operations teams. **Never** pass API keys, bearer tokens, raw `Authorization` headers, database connection passwords, or unmasked session cookies into `log.info()`, `log.warning()`, or exception messages—even via `repr()` dumps of request header dictionaries. Always log identifiers, endpoint hosts, HTTP status codes, and exception types instead."
    },
    {
      "id": "les_c4_m2_l5",
      "title": "2.5 Virtual Environments (venv) and Reproducible Dependencies",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Isolate security automation dependencies in dedicated python -m venv environments, tie pip strictly to the active interpreter via python -m pip, and capture deterministic requirements lockfiles.",
      "learning_objectives": [
        "Explain why global sudo pip installs break OS utilities and violate PEP 668 externally-managed protections",
        "Create, invoke directly, verify via sys.prefix, and clean up isolated virtual environments via python -m venv",
        "Guarantee package destination consistency using python -m pip instead of bare pip executables",
        "Pin exact package versions cleanly in requirements.txt and manage reproducible dependency graphs"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-09",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l05_venv_isolation_architecture.png",
          "caption": "Figure 2.9: Global OS Python conflicts versus isolated per-tool virtual environments bound to separate site-packages trees.",
          "placement_hint": "After Section 4 (Creating and Verifying a Virtual Environment)"
        },
        {
          "id": "fig-04-02-10",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l05_reproducible_dependency_workflow.png",
          "caption": "Figure 2.10: Reproducible dependency lifecycle from python -m pip download and version pinning to frozen audit artifacts.",
          "placement_hint": "After Section 6 (Reproducible Pinning and Practical Dependency Setup)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-09",
          "title": "Figure 2.9: Global OS Python vs. Isolated Virtual Environments",
          "url": "/assets/courses/cyber-04/c04_m02_l05_venv_isolation_architecture.png",
          "caption": "Figure 2.9: Global OS Python conflicts versus isolated per-tool virtual environments bound to separate site-packages trees.",
          "alt": "Side-by-side comparison contrasting Tool A, Tool B, and OS tools clashing inside one global site-packages folder against separate per-tool virtual environments (tool_a_venv and rkvenv) sharing an untouched base Python"
        },
        {
          "id": "fig-04-02-10",
          "title": "Figure 2.10: Reproducible Dependency Pinning Lifecycle",
          "url": "/assets/courses/cyber-04/c04_m02_l05_reproducible_dependency_workflow.png",
          "caption": "Figure 2.10: Reproducible dependency lifecycle from python -m pip download and version pinning to frozen audit artifacts.",
          "alt": "Four-step horizontal dependency lifecycle from python -m venv rkvenv and exact == version pinning through freezing requirements.txt to reproducible server rebuilds"
        }
      ],
      "content": "## 1. Why Isolating Dependencies Protects Both Tools and the Operating System\n\nBefore long, security work reaches beyond standard library helpers into community libraries—network packet analyzers, structured report formatters, API clients, or security scanners. Yet installing Python libraries directly into the operating system's global interpreter creates silent collision hazards: Linux package managers, cloud CLI utilities, and vendor monitoring agents frequently depend on specific Python package versions bundled with the OS. Upgrading one shared library globally with root privileges can break critical host tools overnight, and running `pip` under elevated permissions gives downloaded package setup scripts root execution over the host. **Virtual environments (`venv`)** eliminate these conflicts by provisioning lightweight, isolated Python workspaces per project or tool.\n\n## 2. Core Objectives for This Lesson\n\n- **Global Pollution Risks:** Explain why `sudo pip install` threatens system stability and privilege boundaries—and why modern OS distributions enforce PEP 668 `externally-managed-environment` safeguards.\n- **Creating & Inspecting `venv`:** Build isolated environments with `python -m venv`, invoke their Python directly without relying solely on shell activation, and verify isolation via `sys.prefix`.\n- **Interpreter Binding (`python -m pip`):** Understand why bare `pip install` frequently targets the wrong Python installation when multiple runtimes exist, whereas `python -m pip` strictly binds installer and target interpreter.\n- **Reproducible Pinning:** Export exact dependency snapshots cleanly (`python -m pip freeze`) and reproduce deterministic installs from pinned `requirements.txt` manifests.\n\n## 3. The Hazard of Global `sudo pip install` and PEP 668\n\nTwo separate risks make global privileged `pip` usage dangerous on security workstations and servers alike:\n\n- **Dependency Version Collisions:** Suppose Tool A requires `cryptography==41.0.7` while Tool B demands `cryptography==43.0.1` alongside the host OS software updater relying on system-packaged libraries. One shared global `site-packages` directory cannot simultaneously satisfy conflicting versions cleanly.\n- **Arbitrary Code Execution as `root` / Administrator:** Installing source distributions (`.tar.gz` sdists) runs `setup.py` / build hooks automatically inside `pip install`. Executing `sudo pip install` effectively invites third-party internet code to run with unrestricted administrative privileges!\n\nFor these reasons, modern Debian, Ubuntu, Fedora, and macOS Homebrew Python distributions ship an `EXTERNALLY-MANAGED` marker file (PEP 668) that refuses bare global `pip install` commands immediately unless isolated inside a virtual environment.\n\n## 4. Creating and Verifying a Virtual Environment (`python -m venv`)\n\nPython 3 includes the `venv` module natively in the standard library—no extra installer needed. Creating an environment produces a self-contained directory containing interpreter links/binaries and an empty private `site-packages` tree:\n\n```bash\npython -m venv rkvenv\n```\n\nNotice the subtle cross-platform difference in where the isolated Python executable lives inside `rkvenv`:\n\n- **Windows (`cmd` / PowerShell):** `rkvenv\\Scripts\\python.exe` and `rkvenv\\Scripts\\Activate.ps1`\n- **Linux / macOS:** `rkvenv/bin/python` and `rkvenv/bin/activate`\n\nIn automated cron jobs, CI runners, and strict security scripts, invoking the environment's Python binary directly by path is clearer and safer than relying on shell `activate` scripts because it never depends on terminal state:\n\n```bash\nrkvenv/bin/python -c \"import sys; print('prefix:', sys.prefix); print('base:', sys.base_prefix)\"\n```\n\n```powershell\n.\\rkvenv\\Scripts\\python.exe -c \"import sys; print('prefix:', sys.prefix); print('base:', sys.base_prefix)\"\n```\n\n```terminal\nprefix: C:\\labs\\c04-m02\\rkvenv\nbase: C:\\Program Files\\Python312\n```\n\nWhen `sys.prefix != sys.base_prefix`, you have cryptographic-grade certainty that execution is isolated inside the project's `venv` rather than modifying the system Python.\n\n### Why `python -m pip` Beats Bare `pip`\n\nWorkstations routinely carry three Python interpreters side by side (system Python, IDE-bundled Python, and project `venv`). Calling a bare `pip install pkg` invokes whichever `pip` binary happens to win first on your shell's `PATH`, silently installing packages into Interpreter A while you launch scripts with Interpreter B (triggering immediate `ModuleNotFoundError`). Prefixing **`python -m pip`** executes the exact `pip` module owned by that specific Python binary, closing the mismatch permanently!\n\n![Figure 2.9: Global OS Python vs. Isolated Virtual Environments](/assets/courses/cyber-04/c04_m02_l05_venv_isolation_architecture.png)\n\n*Figure 2.9: Global OS Python conflicts versus isolated per-tool virtual environments bound to separate site-packages trees.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Global Package Collisions (`Unsafe: Shared Global Python (sudo pip)`):** Tool A (`cryptography==41.0.7`), Tool B (`cryptography==43.0.1`), and OS System Updater Tools all share `ONE Global site-packages Folder`, causing dependency breaks while exposing root privileges to setup scripts.\n- **Independent Environment Trees (`Safe: Separate Virtual Environments (venv)`):** Leaves `Base System Python (sys.base_prefix)` clean and untouched while isolating Tool A (`tool_a_venv`) and Tool B (`rkvenv`) in separate package folders.\n- **Isolation Check:** Verify `sys.prefix != sys.base_prefix` inside scripts and install exclusively via `python -m pip`.\n\n## 5. Reproducible Pinning and `requirements.txt` Hygiene\n\nSuppose an analyst creates `requirements.txt` containing unpinned names like `requests` or `tabulate`. Six months later, running `pip install -r requirements.txt` on an audit server pulls a brand-new major release that may have changed API signatures, introduced regressions, or suffered a maintainer compromise. Instead, capture exact resolved versions once a tool passes testing:\n\n```bash\n.\\rkvenv\\Scripts\\python.exe -m pip freeze > requirements.txt\n```\n\n```text\ntabulate==0.9.0\n```\n\n> [!TIP]\n> **One Virtual Environment per Tool:** Treat every `venv` as an ephemeral build artifact, never as precious hand-edited code. Commit `requirements.txt` and source `.py` files to Git—never commit the bulky `rkvenv/` folder itself (`rkvenv/` belongs in `.gitignore`). If a `venv` grows stale or corrupt, delete the folder and rebuild it deterministically from your pinned requirements manifest in seconds.\n\n## 6. Hands-On Preview: Linking Dependency Hygiene to Verification\n\nIn Lesson 2.5's companion workflow (expanded in Practical P2 in Lesson 2.6), notice how isolation and reproducibility work sequentially: first build an isolated `venv`, next download or pin exact package versions rather than floating names, and finally verify cryptographic hashes before installing any byte onto an operational system. Keep `--no-deps` explicit during minimal utility audits so transitive dependencies never sneak in unchecked without their own pinned entries.\n\n![Figure 2.10: Reproducible Dependency Pinning Lifecycle](/assets/courses/cyber-04/c04_m02_l05_reproducible_dependency_workflow.png)\n\n*Figure 2.10: Reproducible dependency lifecycle from python -m pip download and version pinning to frozen audit artifacts.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Isolate & Pin Exact Releases (`Step 1` -> `Step 2`):** Build `python -m venv rkvenv`, invoke the environment binary cleanly via `python -m pip`, and lock dependencies with exact `==` pins (`tabulate==0.9.0`).\n- **Freeze & Exclude Virtual Env (`Step 3`):** Record exact packages with `python -m pip freeze > requirements.txt`, committing `.py` code and `requirements.txt` while ignoring `rkvenv/` inside `.gitignore`.\n- **Deterministic Rebuilds (`Step 4`):** Recreate identical tested installations anywhere with `python -m pip install -r requirements.txt`—keeping `--no-deps` explicit during single-package audits so stale `venv` directories remain completely disposable."
    },
    {
      "id": "les_c4_m2_l6",
      "title": "2.6 Package Integrity, Hash Verification, and PyPI Supply-Chain Defense",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Enforce cryptographic integrity with pip --require-hashes, run CVE audits via pip-audit, dissect the May 2022 PyPI ctx account takeover, and evaluate every third-party package as a trust boundary.",
      "learning_objectives": [
        "Generate SHA-256 package digests via python -m pip hash and enforce fail-closed pip install --require-hashes",
        "Execute a controlled dependency tamper check demonstrating immediate rejection of mismatched wheel hashes",
        "Distinguish file-identity verification (--require-hashes) from known-CVE auditing (pip-audit) and malicious-author risk",
        "Mitigate typosquatting, maintainer account takeover (ctx incident), and environment-variable secret exfiltration"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-02-11",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l06_pip_hash_checking_verification.png",
          "caption": "Figure 2.11 (C04-M02-F3): Fail-closed pip hash-checking verification comparing downloaded wheel SHA-256 against pinned requirements.",
          "placement_hint": "After Section 3 (Enforcing Integrity with --require-hashes)"
        },
        {
          "id": "fig-04-02-12",
          "asset_path": "/assets/courses/cyber-04/c04_m02_l06_pypi_supply_chain_threats.png",
          "caption": "Figure 2.12: PyPI supply-chain attack vectors—typosquatting, expired-domain maintainer takeover (ctx), and arbitrary setup/import code execution.",
          "placement_hint": "After Section 5 (Case Study: The May 2022 ctx PyPI Account Takeover)"
        }
      ],
      "images": [
        {
          "id": "fig-04-02-11",
          "title": "Figure 2.11: How pip --require-hashes Stops Tampered Packages",
          "url": "/assets/courses/cyber-04/c04_m02_l06_pip_hash_checking_verification.png",
          "caption": "Figure 2.11 (C04-M02-F3): Fail-closed pip hash-checking verification comparing downloaded wheel SHA-256 against pinned requirements.",
          "alt": "Flow diagram showing downloading tabulate wheel, computing SHA-256 with pip hash, pinning --hash=sha256 in req.txt, passing when matching (...948f), and aborting atomically on single-character tamper (...948e)"
        },
        {
          "id": "fig-04-02-12",
          "title": "Figure 2.12: PyPI Supply-Chain Attack Paths & Practical Defenses",
          "url": "/assets/courses/cyber-04/c04_m02_l06_pypi_supply_chain_threats.png",
          "caption": "Figure 2.12: PyPI supply-chain attack vectors—typosquatting, expired-domain maintainer takeover (ctx), and arbitrary setup/import code execution.",
          "alt": "Three supply-chain threat cards (typosquatting reqeusts, May 2022 ctx expired-domain takeover stealing os.environ secrets, and install/import code execution) pointing down to four practical team defenses"
        }
      ],
      "content": "## 1. Treating Every Third-Party Package as an Executable Trust Decision\n\nWhen you run `import some_library`, Python executes top-level code inside that third-party package using your user permissions, network connectivity, filesystem access, and environment secrets. While PyPI hosts hundreds of thousands of indispensable open-source packages, **the Python Package Index is an open public repository—not a curated security fortress**. Threat actors regularly exploit human typing mistakes (**typosquatting**), abandoned maintainer recovery channels (**account takeovers**), and vulnerable legacy libraries. Mastering cryptographic hash verification (`--require-hashes`), vulnerability auditing (`pip-audit`), and supply-chain verification transforms dependency management from blind trust into defensible engineering.\n\n## 2. Core Objectives for This Lesson\n\n- **Hash-Checking Installation (`--require-hashes`):** Generate SHA-256 package digests via `python -m pip hash`, enforce integrity verification on install, and verify fail-closed tampering rejection.\n- **Scope Limits of Hashes vs. Audits:** Distinguish file-identity guarantees (`--require-hashes`) from known-vulnerability detection (`pip-audit`) and malicious upstream package detection.\n- **Supply-Chain Threat Analysis:** Dissect the May 2022 PyPI `ctx` account takeover, typosquatting (`reqeusts` vs `requests`), and dependency confusion patterns.\n- **Principle of Dependency Minimalism:** Decide when the Python standard library eliminates unnecessary external risk completely and practice strict environment secret hygiene.\n\n## 3. Enforcing Package File Integrity with `pip --require-hashes`\n\nPinning a package version (`tabulate==0.9.0`) prevents silent upgrades to `0.9.1`, **but it cannot detect if a proxy, mirror, or compromised distribution replaced the underlying `.whl` archive under the identical `0.9.0` tag**. **Hash-checking mode** closes this integrity gap cleanly: `pip` computes the cryptographic SHA-256 digest of every downloaded archive and refuses installation unless it matches the pinned digest byte-for-byte.\n\nInspect the exact command sequence tested in Course 04 against `tabulate==0.9.0` (a pure-Python table formatter distributed cleanly as a universal wheel):\n\n```powershell\n.\\rkvenv\\Scripts\\python.exe -m pip download tabulate==0.9.0 --no-deps -d dl\n.\\rkvenv\\Scripts\\python.exe -m pip hash dl\\tabulate-0.9.0-py3-none-any.whl\n```\n\n```terminal\n--hash=sha256:024ca478df22e9340661486f85298cff5f6dcdba14f3813e8830015b9ed1948f\n```\n\nEmbed that digest directly inside `req.txt` and enforce strict hash verification across every entry (remember: when `--require-hashes` is active, **every** direct and transitive package in the requirements file must carry both an exact `==` version pin and at least one `--hash=sha256:...` line):\n\n```text\ntabulate==0.9.0 --hash=sha256:024ca478df22e9340661486f85298cff5f6dcdba14f3813e8830015b9ed1948f\n```\n\n```powershell\n.\\rkvenv\\Scripts\\python.exe -m pip install --require-hashes -r req.txt\n```\n\nNow test tamper detection directly: alter a single character in `badreq.txt` (changing trailing `...948f` to `...948e`) and attempt reinstallation:\n\n```powershell\n.\\rkvenv\\Scripts\\python.exe -m pip install --require-hashes --force-reinstall -r badreq.txt\n```\n\n```terminal\nERROR: THESE PACKAGES DO NOT MATCH THE HASHES FROM THE REQUIREMENTS FILE. If you have updated the package versions, please update the hashes. Otherwise, examine the package contents carefully; someone may have tampered with them.\n```\n\nLook closely at what happened: **`pip` halted atomically and refused to unpack or execute the package** (`C04-M02-F3`).\n\n### Understanding SHA-256 Tamper Resistance Quantitatively\n\nWhy is matching a SHA-256 digest computationally infeasible for an attacker attempting silent wheel replacement?\n\n:::math-steps\nStep 01: Inspect SHA-256 digest bit width and state space size\n$$b = 256 \\text{ bits}, \\quad \\lvert \\mathcal{H} \\rvert = 2^{256} \\approx 1.1579 \\times 10^{77} \\text{ possible digests}$$\nResult: A 64-character lowercase hexadecimal digest encodes 256 bits of preimage resistance\n\nStep 02: Quantify expected work for an attacker attempting to forge a replacement file matching the pinned digest\n$$W_{\\text{second-preimage}} \\approx 2^{256} \\text{ hash evaluations}$$\nResult: Computational forgery is far beyond physical energy limits while altering even one bit flips roughly half the digest bits\n:::\n\n> [!IMPORTANT]\n> **What `--require-hashes` Does NOT Guarantee:** Hash verification proves **file identity**—you received the exact bits whose SHA-256 you pinned earlier. It does **not** magically inspect code safety: if you accidentally compute the hash of an already-malicious typosquatted wheel or pin a library with a newly discovered remote vulnerability, `--require-hashes` faithfully enforces installing that exact flawed file! Pair hashes with CVE scanning (`pip-audit`) and pre-pinning source inspection.\n\n![Figure 2.11: How pip --require-hashes Stops Tampered Packages](/assets/courses/cyber-04/c04_m02_l06_pip_hash_checking_verification.png)\n\n*Figure 2.11 (C04-M02-F3): Fail-closed pip hash-checking verification comparing downloaded wheel SHA-256 against pinned requirements.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three-Step Pinning Workflow (`Steps 1`–`3`):** Download the universal wheel cleanly (`python -m pip download tabulate==0.9.0 --no-deps -d dl`), compute its digest via `python -m pip hash`, and embed `--hash=sha256:024ca478...948f` inside `req.txt`.\n- **Fail-Closed Comparison (`Valid Wheel` vs. `1 Character Altered`):** Identical digests (`...948f == ...948f`) permit clean installation, whereas altering even one character (`...948e` inside `badreq.txt`) triggers `ERROR: Hashes do NOT match` atomically before unpacking any file.\n- **Complementary Auditing Reminder:** Combine strict file identity checks with `python -m pip_audit` to flag known upstream CVEs.\n\n## 4. Auditing Dependencies with `pip-audit`\n\nEven clean, un-tampered third-party packages accumulate known vulnerabilities over time. **`pip-audit`** queries authoritative vulnerability advisories (PyPA Advisory Database / OSV) against either an active `venv` environment or a `requirements.txt` manifest:\n\n```powershell\n.\\rkvenv\\Scripts\\python.exe -m pip install pip-audit\n.\\rkvenv\\Scripts\\python.exe -m pip_audit -r req.txt\n```\n\n```terminal\nNo known vulnerabilities found\n```\n\nIntegrate `python -m pip_audit -r req.txt` into weekly build jobs and CI checks so dormant scripts running unmodified on production servers trigger immediate alerts whenever a new CVE discloses against a pinned library.\n\n## 5. Case Study: PyPI Supply-Chain Compromises (`ctx`, May 2022)\n\nReal-world ecosystem incidents illustrate why installing unpinned third-party packages without cryptographic integrity checks exposes downstream pipelines.\n\n### Case Study C04-M02-CS1: Domain-Takeover Hijack of `ctx` on PyPI\n\n- **Context:** `ctx` was a quiet, lightweight Python helper library untouched on PyPI since 2014—meaning thousands of downstream pipelines depended on it without active day-to-day scrutiny.\n- **Attack Vector (May 2022):** Security researchers and PyPI records documented how an attacker discovered that the domain name tied to the maintainer's registered email address had **expired**. The attacker re-registered the abandoned email domain, triggered a PyPI account password reset directly to their newly controlled inbox, took complete ownership of the legitimate `ctx` package, and published poisoned releases (`0.1.2`, `0.2.2`, `0.2.6`).\n- **Malicious Payload & Impact:** When victims' CI/CD pipelines resolved unpinned `ctx` or rebuilt dependencies, the trojanized versions harvested every readable process environment variable (`os.environ`—frequently carrying AWS keys, GitHub tokens, and CI secrets) and exfiltrated them externally. Press reporting cited roughly 27,000 downloads during the exposure window before PyPI administrators purged the malicious builds and warned affected users to rotate exposed credentials.\n- **Industry Response & Lessons:** PyPI subsequently accelerated mandatory two-factor authentication (2FA) across publishing accounts, while engineering teams learned four permanent rules:\n  - **Pin Versions & Hashes:** Unpinned builds auto-pull newly uploaded malicious patch releases immediately.\n  - **Scrutinize Dormant Upgrades:** An unexpected new release on a years-dormant package warrants reading the source diff before updating pins.\n  - **Minimize Environment Secrets:** Limit which build steps or untrusted dependencies run with cloud tokens exposed in `os.environ` (explored deeply in Course 12).\n  - **Audit Before Adopting:** Before installing any utility package (especially lookalikes like `\"reqeusts\"` instead of `\"requests\"`), verify official project documentation, check maintainer history, confirm repository links, and ask first whether Python's standard library (`urllib.request`, `ipaddress`, `csv`, `json`, `hashlib`, `hmac`, `subprocess`, `pathlib`, `re`, `logging`, `unittest`) already solves the task cleanly with zero external supply-chain risk.\n\n![Figure 2.12: PyPI Supply-Chain Attack Paths & Practical Defenses](/assets/courses/cyber-04/c04_m02_l06_pypi_supply_chain_threats.png)\n\n*Figure 2.12: PyPI supply-chain attack vectors—typosquatting, expired-domain maintainer takeover (ctx), and arbitrary setup/import code execution.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three PyPI Attack Paths (`Cards 1`–`3`):** Contrasts spelling lookalikes (`\"reqeusts\"` vs. `\"requests\"`), the May 2022 `ctx` expired-domain takeover harvesting `os.environ` secrets across ~27,000 downloads, and arbitrary code execution triggered during install hooks or `import`.\n- **Four Everyday Defenses:** Pin exact `==` releases with `--require-hashes`, scan via `pip-audit` while scrutinizing unexpected updates to dormant packages, keep cloud tokens out of `os.environ` when possible, and default to Python's Standard Library before adding external packages.\n\n## 6. Module 2 Practical Labs\n\nExecute both hands-on labs inside an isolated folder (`c04-m02`) containing only synthetic lab inputs on your own workstation.\n\n### Practical C04-M02-P1: Build and Test Your Own Utility Module (`secutils.py`)\n\n- **Objective:** Author a documented, type-hinted utility module and a defensive caller that logs malformed inputs cleanly without swallowing bugs.\n- **Prerequisites & Assets:** Complete Lessons 2.1–2.4; keep `rkutils.py` and `m02_reusable.py` alongside you for reference.\n- **Step-by-Step Procedure:**\n  1. Execute `python rkutils.py` and `python m02_reusable.py` directly and verify every line of output matches Section 3–4 logs (`rkutils self-test passed`, `WARNING rejected ...`).\n  2. Create `secutils.py` exporting: a custom `InvalidNetworkError(ValueError)` class; `parse_cidr(text: str) -> ipaddress.IPv4Network | ipaddress.IPv6Network` wrapping `ipaddress.ip_network(text.strip(), strict=False)` with `raise InvalidNetworkError(...) from exc`; `in_any(ip_text: str, networks: list) -> bool` returning `True` if the parsed IP lies inside any network; and an `if __name__ == \"__main__\":` self-test with at least three `assert` checks.\n  3. Create a separate caller script (`caller.py`) reading mixed valid/invalid CIDR strings and IP addresses, catching `InvalidNetworkError` / `ValueError`, logging failures via `log.warning(...)`, and printing which test IPs belong inside `10.0.0.0/8` or `192.168.0.0/16`.\n  4. Introduce an intentional typo (for instance `netwroks`) inside one helper and run `caller.py`: confirm your narrow `except` clause lets the real `NameError` surface clearly (contrast with bare `except:`).\n  5. Fix the typo, verify docstrings and type hints interactively with `help(secutils)`, and run your self-tests cleanly.\n\n### Practical C04-M02-P2: Safe Dependency Installation & Hash-Tamper Test\n\n- **Objective:** Build an isolated `venv`, compute a verified SHA-256 package digest, install via `--require-hashes`, and prove fail-closed rejection against a single-character tampered manifest.\n- **Prerequisites & Scope:** Complete Lessons 2.5–2.6 on your personal workstation using public PyPI downloads (`tabulate==0.9.0`).\n- **Step-by-Step Procedure:**\n  1. Create a fresh environment inside `c04-m02`: `python -m venv rkvenv`.\n  2. Invoke `rkvenv\\Scripts\\python` (Windows) or `rkvenv/bin/python` (Linux/macOS) explicitly for every subsequent command.\n  3. Download the pure wheel locally without extras: `python -m pip download tabulate==0.9.0 --no-deps -d dl`.\n  4. Compute its SHA-256 hash (`python -m pip hash dl/tabulate-0.9.0-py3-none-any.whl`) and author `req.txt` containing `tabulate==0.9.0 --hash=sha256:024ca478df22e9340661486f85298cff5f6dcdba14f3813e8830015b9ed1948f`.\n  5. Run `python -m pip install --require-hashes -r req.txt` and inspect `python -m pip freeze`.\n  6. Copy `req.txt` to `badreq.txt`, modify one trailing hex character (`f` -> `e`), run `python -m pip install --require-hashes --force-reinstall -r badreq.txt`, and record the `THESE PACKAGES DO NOT MATCH THE HASHES` failure. (Troubleshooting note: seeing `WARNING: Cache entry deserialization failed` is harmless—`pip` automatically bypasses corrupt local cache entries.)\n  7. Optionally install and run `python -m pip_audit -r req.txt`, then clean up `rkvenv` and `dl` cleanly upon verification.\n\n## 7. Module 2 Consolidated Revision\n\nSynthesize Module 2's architectural contracts—scope hygiene, explicit exception chaining, and pinned virtual environments—before attempting the assessment.\n\n### Core Technical Takeaways\n\n- **Boundary Encapsulation:** Validate inputs once inside typed, docstring-documented functions (`parse_port`, `classify_ip`) rather than duplicating fragile inline checks or returning magic sentinel integers (`-1`).\n- **Scope & State Hygiene:** Resolve names along Local -> Enclosing -> Global -> Built-in; prevent cross-call corruption by replacing mutable defaults (`=[]`, `={}`) with `None` sentinels.\n- **Import & Execution Defense:** Respect `sys.path[0]` priority, avoid standard-library filename collisions (`json.py`), guard tool execution with `python -I` in untrusted paths, and isolate self-tests behind `if __name__ == \"__main__\":`.\n- **Loud, Observable Error Handling:** Use `try / except / else / finally`, domain subclasses (`InvalidPortError(ValueError)`), `raise ... from exc` chaining, structured logging without secrets, and dead man's switch monitoring—never bare `except: pass`.\n- **Supply-Chain Discipline:** Isolate dependencies in per-tool `venv` folders via `python -m pip`, pin exact versions and `--require-hashes` SHA-256 digests, scan advisories with `pip-audit`, and treat every external PyPI package as executable privilege.\n\n### Quick Revision Checkpoints\n\n1. Write a function header accepting a target IP and an optional `dry_run` flag that callers *must* specify by keyword name, and explain why keyword-only safety flags reduce human error.\n2. Trace what happens inside `try / except / else / finally` when (a) no error occurs, (b) a matching error occurs, and (c) an unexpected `NameError` occurs inside `try`.\n3. Explain why running `python analyze.py` inside a folder containing an attacker-planted `logging.py` threatens workstation security and how `python -I` defeats it.\n4. Summarize step-by-step how to generate and verify a `--require-hashes` manifest for `tabulate==0.9.0`, and clarify one threat that file hashes **cannot** prevent.\n5. Reconstruct the May 2022 `ctx` PyPI compromise and name two concrete defensive controls teams use today against maintainer account takeovers and typosquatting."
    }
  ]
};
