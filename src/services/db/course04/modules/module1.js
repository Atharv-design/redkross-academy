/**
 * Course 04: Python for Cybersecurity — Module 1 Data
 * Module ID: mod_c4_1 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module1Data = {
  "id": "mod_c4_1",
  "title": "Module 1: Python Foundations",
  "description": "Install and execute Python 3 safely, understand dynamic object binding and explicit boundary conversions, process strings without injection hazards, select lists/dicts/sets/tuples for O(1) lookups, write deterministic conditions avoiding text-sorting bugs, and build threshold loops and comprehensions validated against real case studies.",
  "order": 1,
  "quiz": {
    "id": "quiz_mod_c4_1",
    "title": "Module 1: Python Foundations Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
      {
        "id": "q_c4_m1_001",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "What defines the scope of a code block inside an if statement, for loop, or function definition in Python?",
        "options": [
          "Consistent leading indentation following a colon",
          "Matching curly braces at block boundaries",
          "Trailing semicolons at the end of statements",
          "Uppercase BEGIN and END keywords"
        ],
        "correct": 0,
        "explanation": "Python replaces braces with consistent whitespace indentation after a colon (:); PEP 8 specifies four spaces per indentation level."
      },
      {
        "id": "q_c4_m1_007",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "difficult",
        "q": "During P1 troubleshooting, why does mixing tabs and spaces on adjacent lines inside a loop frequently trigger an error even when the lines appear visually aligned in a text editor?",
        "options": [
          "Python 3 forbids inconsistent mixing of tabs and spaces in indentation and raises TabError",
          "Python treats every tab character as exactly two spaces regardless of editor settings",
          "Editors strip all space characters automatically when saving .py files",
          "The REPL requires tabs while scripts require spaces"
        ],
        "correct": 0,
        "explanation": "Different editors render tab stops at different column widths (4 vs 8 spaces), so Python 3 rejects inconsistent tab/space mixing with TabError (a subclass of IndentationError)."
      },
      {
        "id": "q_c4_m1_002",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "Which statement accurately contrasts Python 2 and Python 3 for modern defensive security automation?",
        "options": [
          "Python 2 should still be used for legacy Linux scripts",
          "Python 3 compiles binaries manually via gcc before running",
          "Python 2 reached End of Life in 2020 and must not be used",
          "Python 2 and Python 3 share identical standard library TLS defaults"
        ],
        "correct": 2,
        "explanation": "Python 2 reached End of Life in 2020 and receives no security patches; all modern defensive automation must target supported Python 3.10+ releases."
      },
      {
        "id": "q_c4_m1_008",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "difficult",
        "q": "Which Windows command invokes the official Python Launcher installed by python.org installers when multiple Python 3 versions might coexist on PATH?",
        "options": [
          "repl.exe --select",
          "cpython --boot",
          "py",
          "pyexec -m interactive"
        ],
        "correct": 2,
        "explanation": "The python.org Windows installer provides the py launcher (e.g., py --version or py -3.12), letting analysts target installed Python runtimes predictably."
      },
      {
        "id": "q_c4_m1_003",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "When Python prints a multi-line traceback ending with 'IndentationError: expected an indented block after if statement on line 1', where should a programmer look first to identify the exception category?",
        "options": [
          "The first line of the script file",
          "The top line of the standard output stream",
          "The bottom line of the error output naming the error type",
          "The operating system event log"
        ],
        "correct": 2,
        "explanation": "Python tracebacks stack call frames top-to-bottom and place the authoritative exception type and diagnostic message on the final line."
      },
      {
        "id": "q_c4_m1_009",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "difficult",
        "q": "Why does placing two unrelated assignment statements on the same line separated only by whitespace (such as port = 22 host = 'web-01') fail in Python?",
        "options": [
          "Strings cannot follow integers in source files",
          "Python enforces one statement per logical line unless explicitly joined by a semicolon, which PEP 8 discourages",
          "Assignments must begin inside a main() function",
          "Whitespace is prohibited around the = operator"
        ],
        "correct": 1,
        "explanation": "Python uses newlines as statement terminators rather than free-form token streams; putting two assignments on one line without ';' triggers a SyntaxError."
      },
      {
        "id": "q_c4_m1_004",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "What is the primary operational difference between running python with no arguments versus running python file.py?",
        "options": [
          "No-argument mode compiles a standalone executable",
          "file.py disables all standard library imports",
          "No-argument mode launches the interactive REPL, whereas file.py executes a saved script",
          "Interactive mode ignores syntax errors completely"
        ],
        "correct": 2,
        "explanation": "Invoking python without a script path opens the Read-Eval-Print Loop (REPL) for interactive testing, while passing a .py file runs the saved program."
      },
      {
        "id": "q_c4_m1_010",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "difficult",
        "q": "While troubleshooting a script interactively in the Windows REPL, which key combination sends End-Of-File to exit back to the terminal cleanly without typing exit()?",
        "options": [
          "Ctrl+L then Enter",
          "Ctrl+R followed by Space",
          "Alt+F4 followed by Tab",
          "Ctrl+Z followed by Enter (or Ctrl+D on macOS/Linux)"
        ],
        "correct": 3,
        "explanation": "Sending EOF via Ctrl+Z + Enter on Windows (or Ctrl+D on POSIX terminals) terminates the REPL session just like calling exit()."
      },
      {
        "id": "q_c4_m1_005",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "In a Python module, what distinguishes a triple-quoted docstring placed at the top of a file or function from an inline # comment?",
        "options": [
          "Docstrings are retained as runtime documentation objects (__doc__), whereas # comments are ignored by the parser",
          "Comments are encrypted on disk, while docstrings are hashed",
          "Triple-quoted strings execute shell commands automatically",
          "Inline comments force PEP 8 compliance checks at startup"
        ],
        "correct": 0,
        "explanation": "Leading triple-quoted string literals become __doc__ documentation attributes inspectable via help(), while # comments exist purely for human readers."
      },
      {
        "id": "q_c4_m1_019",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "Why does evaluating 0.1 + 0.2 == 0.3 return False in CPython (producing 0.30000000000000004)?",
        "options": [
          "Python rounds every float down after the first decimal place",
          "The + operator promotes 0.1 to a complex number",
          "IEEE 754 binary64 floating-point cannot represent decimal tenths (0.1 and 0.2) with finite base-2 fractions",
          "0.3 is stored as a decimal.Decimal while 0.1 is a float"
        ],
        "correct": 2,
        "explanation": "Binary floating-point stores sums of powers of two; just as 1/3 repeats in base 10, 1/10 repeats in base 2, introducing small representation rounding error."
      },
      {
        "id": "q_c4_m1_006",
        "topic": "C04-M01-L01: Execution Model & Indentation",
        "difficulty": "medium",
        "q": "An analyst defines Threshold = 3 at the top of a script and later checks if failures == threshold:. What error will Python raise when evaluating the condition?",
        "options": [
          "NameError because identifiers in Python are case-sensitive",
          "TypeError because strings cannot equal integers",
          "ValueError because 3 exceeds threshold bounds",
          "IndentationError because capitals are invalid in Python"
        ],
        "correct": 0,
        "explanation": "Python identifiers are strictly case-sensitive: Threshold and threshold are completely distinct names, causing a NameError if the lowercase name was never bound."
      },
      {
        "id": "q_c4_m1_020",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "An analyst receives a configuration flag allow_external = 'False' parsed from an INI text file and writes if allow_external: enable_access(). What happens at runtime and why?",
        "options": [
          "Access stays blocked because Python parses the word 'False' automatically",
          "SyntaxError occurs because strings cannot appear in if statements",
          "TypeError is raised when evaluating bool('False')",
          "Access is mistakenly granted because 'False' is a non-empty str and evaluates to True"
        ],
        "correct": 3,
        "explanation": "bool() only checks whether a string is non-empty, not its English meaning; 'False' has length 5, so bool('False') is True unless explicitly mapped."
      },
      {
        "id": "q_c4_m1_011",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "medium",
        "q": "In Python, what does the statement port = 443 actually perform at runtime?",
        "options": [
          "Allocates a fixed 32-bit integer memory slot named port",
          "Binds the identifier port as a reference pointing to an int object with value 443",
          "Converts any future assignment to port into an integer automatically",
          "Copies the value 443 into a static CPU register"
        ],
        "correct": 1,
        "explanation": "In Python, variables are names bound to objects in memory rather than typed boxes; dynamic typing attaches type metadata to the object itself."
      },
      {
        "id": "q_c4_m1_021",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "When tracking exact financial ledger amounts, packet byte totals, or floating-point risk tolerances, which choice aligns with safe Python engineering practice?",
        "options": [
          "Use int for whole counts/bytes, decimal.Decimal for exact base-10 money, and math.isclose() when comparing floats",
          "Always store port numbers and byte counters as float so division never overflows",
          "Convert monetary amounts to strings and add them lexicographically",
          "Rely on == for all float telemetry averages"
        ],
        "correct": 0,
        "explanation": "Integers in Python have arbitrary precision for exact counts, decimal.Decimal preserves exact decimal arithmetic for money, and math.isclose() compares floats within tolerance."
      },
      {
        "id": "q_c4_m1_012",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "medium",
        "q": "What is the exact output of type(owner).__name__ when owner = None?",
        "options": [
          "null",
          "None",
          "void",
          "NoneType"
        ],
        "correct": 3,
        "explanation": "The singleton object None has the built-in class NoneType, as demonstrated in section 1 of m01_foundations.py ('1. str int float bool NoneType')."
      },
      {
        "id": "q_c4_m1_022",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "Why must a script explicitly validate numeric bounds (for example 0 <= port <= 65535) even after int(raw_port) succeeds without raising ValueError?",
        "options": [
          "int() silently returns 0 whenever a string contains whitespace",
          "int() accepts negative values and arbitrarily huge integers like 999999 that are invalid TCP/UDP port numbers",
          "Python caps int objects at 255 on Windows systems",
          "Valid port numbers can only be stored in tuples"
        ],
        "correct": 1,
        "explanation": "Type conversion proves syntax validity (an integer exists), not domain validity: int('-5') and int('70000') succeed cleanly unless constrained by range checks."
      },
      {
        "id": "q_c4_m1_013",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "medium",
        "q": "What is the result of evaluating int('443') + 1 in Python?",
        "options": [
          "'4431'",
          "444",
          "TypeError",
          "443.1"
        ],
        "correct": 1,
        "explanation": "int('443') explicitly parses the string into the integer 443, so adding 1 produces the integer 444."
      },
      {
        "id": "q_c4_m1_023",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "Unlike C's 32-bit int, how does Python handle calculating 10 ** 30 (such as counting addresses across huge IPv6 subnets)?",
        "options": [
          "It wraps around silently modulo 2**32 (integer overflow)",
          "It automatically raises OverflowError above 2**31 - 1",
          "Python integers have arbitrary precision and compute 10 ** 30 accurately without overflow",
          "It silently promotes the number to an approximate float"
        ],
        "correct": 2,
        "explanation": "Python int objects grow dynamically as needed until memory exhaustion, preventing classic 32-bit or 64-bit signed integer wraparound bugs in arithmetic."
      },
      {
        "id": "q_c4_m1_014",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "medium",
        "q": "Why does the expression 'port ' + 443 raise a TypeError in Python?",
        "options": [
          "Port numbers above 255 require raw strings",
          "Integers cannot appear after a space character",
          "The + operator is reserved exclusively for numeric arithmetic",
          "Python does not implicitly convert an int to a str during string concatenation"
        ],
        "correct": 3,
        "explanation": "Python is strongly typed as well as dynamically typed: it refuses silent coercion between str and int, raising TypeError: can only concatenate str (not 'int') to str."
      },
      {
        "id": "q_c4_m1_024",
        "topic": "C04-M01-L02: Variables, Types & Conversions",
        "difficulty": "difficult",
        "q": "Suppose port_count = 0 is valid zero-count telemetry (zero failed attempts recorded), while missing telemetry is represented by port_count = None. Why is 'if not port_count:' dangerous here?",
        "options": [
          "None raises TypeError with 'not'",
          "0 compares equal to None with ==",
          "Python treats 0 as truthy in 'not' expressions",
          "Both 0 and None are falsy, so 'if not port_count:' conflates zero failures with missing data"
        ],
        "correct": 3,
        "explanation": "When 0 is a legitimate domain value, truthiness hides the distinction from None; always test missing values explicitly via 'if port_count is None:'."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m1_l1",
      "title": "1.1 Running Python and Syntax Basics",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Verify a modern Python 3 interpreter, distinguish interactive REPL testing from saved .py scripts, enforce PEP 8 four-space indentation and docstrings, and read tracebacks bottom-up.",
      "learning_objectives": [
        "Verify Python 3.10+ interpreter installation and reject end-of-life Python 2 runtimes",
        "Differentiate interactive REPL prototyping from repeatable .py script automation",
        "Apply PEP 8 four-space indentation, colons, case sensitivity, and implicit bracket continuation",
        "Interpret SyntaxError, IndentationError, TabError, NameError, and runtime tracebacks bottom-up"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-01",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l01_interpreter_execution_pipeline.png",
          "caption": "Figure 1.1: Interactive REPL prototyping versus reproducible .py script execution and traceback inspection.",
          "placement_hint": "After Section 4 (Two Execution Modes)"
        },
        {
          "id": "fig-04-01-02",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l01_indentation_block_scope_error.png",
          "caption": "Figure 1.2: PEP 8 four-space block scope resolution versus IndentationError and mixed tab/space TabError.",
          "placement_hint": "After Section 6 (Reading Error Messages Bottom-Up)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-01",
          "title": "Figure 1.1: Two Ways to Run Python 3: Interactive Mode vs. Saved Scripts",
          "url": "/assets/courses/cyber-04/c04_m01_l01_interpreter_execution_pipeline.png",
          "caption": "Figure 1.1: Interactive REPL prototyping versus reproducible .py script execution and traceback inspection.",
          "alt": "Diagram comparing Python 3 Interactive REPL mode and saved .py script execution across the shared Python 3 interpreter"
        },
        {
          "id": "fig-04-01-02",
          "title": "PEP 8 Four-Space Block Scope vs. Indentation & Tab Errors",
          "url": "/assets/courses/cyber-04/c04_m01_l01_indentation_block_scope_error.png",
          "caption": "Figure 1.2: PEP 8 four-space block scope resolution versus IndentationError and mixed tab/space TabError.",
          "alt": "Side-by-side comparison showing valid four-space indentation after if ADMIN_PORT == 22: versus Broken Block Scope Failures: IndentationError on missing block indent with carets and TabError from mixing [-> TAB] and spaces."
        }
      ],
      "content": "## 1. Why Python Execution Mechanics Matter in Security Work\n\nSecurity investigations move quickly: when a firewall spikes or an authentication alert triggers, an analyst needs an executable inspection tool in seconds rather than managing a multi-stage compiled build toolchain. **Python** is an interpreted, general-purpose language built around human-readable syntax, indentation-delimited code blocks, and an extensive batteries-included standard library. You write source statements in plain UTF-8 text files and invoke the Python interpreter directly against them, eliminating manual compile-and-link steps while still executing fast enough for multi-megabyte log triage, API enrichment, and automated compliance verification.\n\nEvery example across this module traces small, realistic defensive tasks—classifying network service ports, parsing authentication timestamps, deduplicating external IP addresses, and counting login failures against alert thresholds—and every program output presented here was directly captured by executing the official lab script `m01_foundations.py`.\n\n## 2. Core Objectives for This Lesson\n\n- **Runtime Setup:** Verify a supported Python 3 interpreter on Windows, macOS, or Linux and reject end-of-life Python 2 runtimes.\n- **Interactive vs. Script Execution:** Distinguish fast Read-Eval-Print Loop (REPL) experimentation from repeatable saved `.py` scripts.\n- **Structural Syntax Rules:** Enforce PEP 8 four-space indentation, colons before suites, case sensitivity, and implicit line continuation inside brackets.\n- **Documentation Boundaries:** Separate ignored inline `#` comments from runtime-accessible triple-quoted docstrings (`__doc__`).\n- **Diagnostic Reading:** Read Python syntax and runtime tracebacks from bottom to top to pinpoint offending files, lines, and tokens.\n\n## 3. Installing and Verifying Python 3\n\nInstall an actively maintained Python 3 release (Python 3.10 or newer is required throughout Course 04; official installers on python.org cover Windows and macOS, while Linux distributions provide `python3` via system package repositories). On Windows, the python.org installer places both `python.exe` and the Python Launcher (`py`) on your system path, allowing teams with multiple interpreters installed to verify the active binary deterministically.\n\n```bash\npython --version\n```\n\n```powershell\npy --version\n```\n\n```terminal\nPython 3.12.4\n```\n\n> [!WARNING]\n> **End-of-Life Runtimes:** Python 2 reached official End of Life on January 1, 2020 and receives zero security patches, TLS updates, or bug fixes. Never write new defensive automation targeting Python 2, and audit inherited host scripts to migrate them cleanly to Python 3.\n\n## 4. Two Execution Modes: Interactive REPL vs. Saved Scripts\n\nEngineers switch constantly between exploratory hypothesis testing and repeatable script automation:\n\n- **Interactive Mode (REPL):** Running `python` (or `py`) with no script filename starts the Read-Eval-Print Loop at the `>>>` prompt, immediately evaluating expressions line by line in memory—ideal for inspecting log slices, testing conversions, or triggering intentional errors to verify exception names, and terminated via `exit()`, `Ctrl+Z` then `Enter` on Windows, or `Ctrl+D` on POSIX terminals.\n- **Script Execution:** Saving statements in a UTF-8 file ending in `.py` (such as `m01_foundations.py`) lets you execute the full pipeline reproducibly via `python m01_foundations.py`, commit it to version control, schedule it in Task Scheduler or `cron`, and test it automatically.\n\n```bash\npython\n```\n\n```terminal\n>>> 443 in (22, 80, 443)\nTrue\n>>> exit()\n```\n\n```bash\npython m01_foundations.py\n```\n\n![Figure 1.1: Two Ways to Run Python 3: Interactive Mode vs. Saved Scripts](/assets/courses/cyber-04/c04_m01_l01_interpreter_execution_pipeline.png)\n\n*Figure 1.1: Interactive REPL prototyping versus reproducible `.py` script execution and traceback inspection.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Supported Runtime Policy Gate:** Across the top verification strip, the green badge establishes the course floor (`Python 3.10+`, illustrated via `python --version` or Windows `py --version -> Python 3.12.4`), while the red alert pill bans `Python 2` (retired January 1, 2020 with zero security patches).\n- **Interactive Mode (`1. Interactive Mode (REPL)` — Blue Track):** Invoking `python` (or `py`) without a script path opens an in-memory 4-step Read-Eval-Print Loop: Step `1` reads a single expression (`>>> 443 in (22, 80, 443)`), Step `2` evaluates it immediately in memory, Step `3` prints `True`, and Step `4` loops back to `>>>` until you exit (`exit()`, `Ctrl+Z + Enter` on Windows, or `Ctrl+D`). Because interactive sessions live strictly in transient memory, use the REPL for quick hypothesis testing rather than repeatable production runs.\n- **Saved Script Mode (`2. Saved Script Mode (.py File)` — Green Track):** Writing instructions into a UTF-8 `.py` file (`m01_foundations.py`) and launching `python m01_foundations.py` executes every line sequentially from top to bottom and emits reproducible console output (`1. str int float bool NoneType` followed by `2. 2026-11-07 10:02:11 | FAILED | True`), making script files ideal for version control, scheduled jobs, and team sharing.\n- **Unified Interpreter Execution:** Downward arrows from both cards merge into the bottom bar (`Both modes use the same Python 3 Interpreter -> Produces Output OR a Clear Error Message`), underscoring that syntax rules and exception diagnostics work identically whether an expression runs interactively or from disk.\n\n## 5. Foundational Syntax Rules and PEP 8 Discipline\n\nUnlike C, Java, or PowerShell, Python omits semicolons as statement terminators and omits curly braces `{}` around control-flow suites. Instead, whitespace is syntactically meaningful:\n\n- **One Logical Statement per Line:** Each logical statement normally occupies its own line; if a collection literal or `print()` call grows long, wrap it across lines inside parentheses `()`, square brackets `[]`, or curly braces `{}` rather than appending fragile backslash continuations.\n- **Colons Open Blocks, Four Spaces Indent Them:** Every compound statement header (`if`, `elif`, `else`, `for`, `while`, `def`) terminates with a colon `:`, and every statement inside that block must share identical leading indentation—standardized at exactly **four spaces per level** by PEP 8.\n- **Strict Case Sensitivity:** Python distinguishes `Port`, `port`, and `PORT`; referencing an uninitialized casing mismatch triggers `NameError` at runtime.\n- **Comments vs. Docstrings:** Text following `#` to the end of a line is stripped before execution for human maintainers, whereas a triple-quoted string literal (`\"\"\"...\"\"\"`) placed as the first statement of a file or function is preserved as its runtime `__doc__` documentation attribute. Keep in mind that triple-quoted strings are true string expressions—if placed inside a block, their opening line must still obey block indentation.\n\n```python\n\"\"\"Module header docstring stored in __doc__.\"\"\"\n\nADMIN_PORT = 22  # PEP 8 constant naming; inline comments explain intent\n\nif ADMIN_PORT == 22:\n    print(\"SSH port active\")  # Exactly 4 spaces of indentation\n```\n\n> [!CAUTION]\n> **Never Mix Tabs and Spaces:** An editor configured to expand tabs at 8 columns can make a tab and four spaces look aligned visually while representing mismatched characters underneath. Python 3 rejects inconsistent tab/space indentation with `TabError` (a subclass of `IndentationError`); configure every code editor to insert 4 spaces when pressing `Tab`. Also watch for pasted typographic smart quotes (`“` or `‘`) which trigger `SyntaxError`.\n\n## 6. Reading Python Error Messages Bottom-Up\n\nWhen syntax or runtime state violates language rules, Python aborts safely and prints a contextual pointer above the exception summary. Train yourself to read the **bottom line first**: the last line always specifies the exact exception class and concrete cause, while lines above point to the file path, line number, and offending token caret (`^^^^^`).\n\nConsider omitting the required indentation after `if True:`:\n\n```python\nif True:\nprint(\"x\")\n```\n\n```terminal\n    print(\"x\")\n    ^^^^^\nIndentationError: expected an indented block after 'if' statement on line 1\n```\n\nSimilarly, if you forget a closing parenthesis or quote on line 11, Python often detects the mismatch on line 12—so always inspect both the reported line and the preceding line when resolving `SyntaxError`. Also avoid shadowing built-in constructors with local names like `list = [22, 443]` or `str = \"host\"`, which later triggers `TypeError: '...' object is not callable`.\n\n### Core Module 1 Exception Family Preview\n\nLater in Module 2 you will handle runtime faults gracefully using `try`/`except`. Recognize these six foundational errors immediately during prototyping:\n\n| Exception Class | Immediate Cause | Minimal Trigger Example |\n| :--- | :--- | :--- |\n| `IndentationError` / `TabError` | Missing block indent or mixed tabs/spaces | `if True:` followed by unindented `print(\"x\")` |\n| `SyntaxError` | Missing colon `:`, unclosed delimiter, smart quotes, or `=` inside `if` | `if port = 443:` |\n| `NameError` | Unbound identifier or case mismatch (`Threshold` vs `threshold`) | `print(missing_var)` |\n| `TypeError` | Incompatible types in an operator (`str + int`, shadowing built-ins) | `\"port \" + 443` |\n| `ValueError` | Correct data type but unparseable or out-of-domain content | `int(\"abc\")` |\n| `KeyError` / `IndexError` | Missing dict key or sequence integer index out of range | `{\"a\": 1}[\"b\"]` or `[1, 2][5]` |\n\n![PEP 8 Four-Space Block Scope vs. Indentation & Tab Errors](/assets/courses/cyber-04/c04_m01_l01_indentation_block_scope_error.png)\n\n*Figure 1.2: PEP 8 four-space block scope resolution versus `IndentationError` and mixed tab/space `TabError`.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Valid four-space suite binding (left panel):** Following `if ADMIN_PORT == 22:`, the green badge confirms that the colon (`:`) opens a new control-flow suite and exactly four space characters (`[· · · ·] print(\"SSH port active\")`) place the statement inside that conditional branch per PEP 8.\n- **Structural whitespace aborts (right panel):** Omitting indentation after `if True:` triggers `IndentationError` right under `print(\"x\")` (`^^^^^`), whereas mixing `[-> TAB]` with `[· · · ·]` on sibling statements triggers `TabError`; read Python tracebacks **bottom-up** starting from exception class, caret `^^^^`, and the preceding line.\n\n## 7. Quick Revision Terminology\n\n- **REPL (Read-Eval-Print Loop):** Interactive Python prompt (`>>>`) that reads one line, evaluates it immediately, prints any non-`None` result, and loops until `exit()` or EOF.\n- **Indentation:** Consistent leading space count (4 spaces in PEP 8) that syntactically defines which statements belong inside a block following a colon.\n- **Docstring:** Triple-quoted string literal positioned as the first statement of a module, class, or function so tools like `help()` and analyzers can inspect its specification."
    },
    {
      "id": "les_c4_m1_l2",
      "title": "1.2 Variables, Types, and Explicit Conversions",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Understand name-to-object reference binding, Python's five core scalar types, explicit str/int/float conversions, IEEE 754 precision limits, and truthiness hazards.",
      "learning_objectives": [
        "Explain Python dynamic object-reference binding and PEP 8 constant vs variable naming",
        "Inspect int, float, str, bool, and NoneType objects cleanly via type(x).__name__",
        "Convert untrusted text inputs safely without eval() and enforce 16-bit TCP/UDP port bounds",
        "Prevent binary64 floating-point equality bugs with math.isclose() or decimal.Decimal and distinguish 0 vs None"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-03",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l02_names_to_objects_memory.png",
          "caption": "Figure 1.3 (C04-M01-F1): Variables as references bound to objects in memory, aliasing vs .copy(), and == vs is.",
          "placement_hint": "After Section 3 (Variables Are Names Bound to Objects)"
        },
        {
          "id": "fig-04-01-04",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l02_explicit_type_conversion_boundary.png",
          "caption": "Figure 1.4: Explicit validation boundary converting untrusted telemetry strings with domain bounds and error isolation.",
          "placement_hint": "After Section 5 (Explicit Type Conversions)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-03",
          "title": "Figure 1.3 (C04-M01-F1): How Python Variables Work: Name Tags Pointing to Objects",
          "url": "/assets/courses/cyber-04/c04_m01_l02_names_to_objects_memory.png",
          "caption": "Figure 1.3 (C04-M01-F1): Variables as references bound to objects in memory, aliasing vs .copy(), and == vs is.",
          "alt": "Diagram showing Python variable name tags pointing to str, int, float, bool, and NoneType objects in memory, list aliasing vs .copy(), and == vs is"
        },
        {
          "id": "fig-04-01-04",
          "title": "Figure 1.4: Checking Untrusted Input: Type Conversion & Safety Boundary",
          "url": "/assets/courses/cyber-04/c04_m01_l02_explicit_type_conversion_boundary.png",
          "caption": "Figure 1.4: Explicit validation boundary converting untrusted telemetry strings with domain bounds and error isolation.",
          "alt": "Flow diagram filtering raw string inputs through a 3-check validation gate covering explicit type conversion, 0 to 65535 port bounds, None vs zero checks, and prohibiting eval()"
        }
      ],
      "content": "## 1. Why Variable Binding and Type Boundaries Prevent Silent Security Bugs\n\nEvery log line, firewall CSV export, and API response enters a Python program as unstructured text characters or raw bytes. Before a script can evaluate firewall port rules, sum byte transfers, or average response durations, it must convert raw text into explicit runtime objects with well-understood precision limits and truthiness behavior. Unlike statically typed languages where variable declarations lock a memory slot to one compile-time type, Python attaches type metadata strictly to the runtime object itself—meaning names are lightweight labels pointing into heap memory.\n\nUnderstanding both the object-reference model and numeric boundary rules protects your scripts against subtle telemetry drift, truncated comparisons, and truthiness bypasses.\n\n## 2. Core Objectives for This Lesson\n\n- **Object-Reference Semantics:** Explain how assignment (`=`) binds names to objects and verify PEP 8 naming conventions for variables and constants.\n- **Primitive Type Classification:** Distinguish Python's five core scalar types (`int`, `float`, `str`, `bool`, `NoneType`) using `type(x).__name__`.\n- **Boundary Conversion & Validation:** Parse untrusted text explicitly via `int()`, `float()`, and `str()` while enforcing domain bounds such as 16-bit TCP/UDP port cardinality.\n- **Arithmetic & IEEE 754 Limits:** Contrast true division (`/`) with floor division (`//`), avoid exact float equality via `math.isclose()` or `decimal.Decimal`, and leverage Python's arbitrary-precision `int`.\n- **Truthiness Precision:** Identify which falsy vs. truthy edge values (`0`, `None`, `\"\"`, `\"0\"`, `\"False\"`) cause false branches unless explicitly validated.\n\n## 3. Variables Are Names Bound to Objects\n\nIn Python, executing `hostname = \"web-01\"` does not allocate a fixed character box labeled `hostname`. Instead, the runtime creates (or reuses) a `str` object containing `\"web-01\"` and binds the name `hostname` as a reference pointing to that object.\n\n- **PEP 8 Variable Naming:** Write regular variables and functions in descriptive `lower_case_with_underscores` (`snake_case`).\n- **PEP 8 Constant Convention:** Write module-level policy constants in `ALL_CAPS_WITH_UNDERSCORES` (`THRESHOLD = 3`) to signal maintainers that the value should stay fixed at runtime.\n- **Dynamic Typing Tradeoff:** Because names carry no static lock, rebinding `port = 443` and later `port = \"https\"` succeeds at assignment time yet can crash arithmetic downstream; keep each variable aligned to a single logical role.\n\n![Figure 1.3 (C04-M01-F1): How Python Variables Work: Name Tags Pointing to Objects](/assets/courses/cyber-04/c04_m01_l02_names_to_objects_memory.png)\n\n*Figure 1.3 (C04-M01-F1): Variables as references bound to objects in memory, aliasing vs `.copy()`, and `==` vs `is`.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Name Tags Pointing to Typed Heap Objects:** In the top memory map, five variable labels on the left (`hostname`, `port`, `load`, `is_public`, `owner`) connect via horizontal blue pointer arrows to distinct typed runtime objects on the right (`\"web-01\"` as `str`, `443` as `int`, `0.75` as `float`, `True` as `bool`, and `None` as `NoneType`). As highlighted in the amber callout box on the right, type metadata lives on the heap object itself rather than inside a fixed name container—rebinding `port = 'https'` simply moves `port`'s reference arrow to a different object.\n- **Sharing vs. Copying Mutable Lists (Bottom-Left):** When `alias = ports` is assigned without copying, both `ports` and `alias` point converging arrows to the same `[22, 443]` list object, so mutating `alias` mutates `ports` as well. By contrast, `safe = ports.copy()` follows a separate path to an independent `[22, 443]` list container, isolating top-level edits safely.\n- **Value Equality vs. Object Identity (Bottom-Right):** Two separate list instances (`[22, 443] == [22, 443]`) evaluate to `True` under `==` because their values match, whereas `[22, 443] is [22, 443]` evaluates to `False` because they are distinct objects in memory. The bottom green strip captures the defensive rule: reserve `is None` / `is not None` for singleton identity checks instead of comparing values with `is`.\n\n## 4. The Five Core Primitive Types\n\nSection 1 of `m01_foundations.py` instantiates one object of each core foundational type and inspects its class name via `type(x).__name__`:\n\n```python\nhostname = \"web-01\"            # str\nport = 443                     # int\nload = 0.75                    # float\nis_public = True               # bool\nowner = None                   # NoneType: \"no value yet\"\nprint(\"1.\", type(hostname).__name__, type(port).__name__, type(load).__name__,\n      type(is_public).__name__, type(owner).__name__)\n```\n\n```terminal\n1. str int float bool NoneType\n```\n\nEach type fulfills a distinct engineering role in security telemetry:\n\n- **int:** Exact whole numbers of **arbitrary precision** (`443`, `-1`, `10**30`)—unlike C 32-bit integers, Python `int` never wraps silently on integer overflow, and exact byte counters or TCP/UDP port numbers belong exclusively in `int`.\n- **float:** IEEE 754 64-bit binary floating-point approximations (`0.75`, plus special values `nan` and `inf`) suitable for ratios and CPU percentages, never exact monetary cents or naive loop equality tests.\n- **str:** Immutable Unicode character sequences (`\"web-01\"`) representing identifiers, paths, and raw incoming log text.\n- **bool:** Truth-value subclass of `int` holding strictly `True` or `False` (remembering `isinstance(True, int)` is `True`, so validate `isinstance(x, bool)` first before checking `isinstance(x, int)`!).\n- **NoneType:** The singleton sentinel `None`, representing missing data, unassigned ownership, or empty lookup returns—always tested with identity `is None` or `is not None`.\n\n### Quantitative Boundary: Unsigned 16-Bit Port Domain Cardinality\n\nSyntactic type conversion proves a string *looks* like an integer, not that the number is valid in the network protocol domain:\n\n$$\\text{Valid TCP/UDP Port Space} = \\{ p \\in \\mathbb{Z} \\mid 0 \\le p \\le 65{,}535 \\}, \\quad |\\text{Ports}| = 2^{16} = 65{,}536$$\n\nBecause `int(\"-5\")` and `int(\"70000\")` both succeed without raising `ValueError`, boundary code must explicitly verify range constraints (`0 <= port <= 65535`, or `1 <= port <= 65535` for active service sockets) after numeric conversion.\n\n## 5. Explicit Type Conversions and Boundary Errors\n\nData ingested from files, command output, CSV reports, or network forms arrives as strings. Python is **strongly typed**: it refuses silent coercion between incompatible types like `str` and `int`, failing loudly so bugs surface early instead of propagating garbage.\n\n```python\nint(\"443\") + 1     # -> 444 (valid int arithmetic)\nfloat(\"0.5\")       # -> 0.5\nstr(443)           # -> \"443\"\nbool(\"\")           # -> False\nint(\"FF\", 16)      # -> 255 (explicit hexadecimal radix)\n```\n\nWhen callers fail to convert or pass malformed input (including decimal strings like `int(\"443.0\")`), two distinct exception families emerge:\n\n```terminal\nstr+int: TypeError: can only concatenate str (not \"int\") to str\nint('abc'): ValueError: invalid literal for int() with base 10: 'abc'\nint('443') + 1 = 444\n```\n\n> [!CAUTION]\n> **Never Parse Numbers with `eval()`:** Novice scripts occasionally convert text with `eval(user_input)`. If an attacker supplies `__import__(\"os\").system(\"whoami\")` in an untrusted telemetry field, `eval()` executes arbitrary Python code directly! Always use strict single-purpose constructors (`int()`, `float()`, or `json.loads()`) and validate bounds.\n\n![Figure 1.4: Checking Untrusted Input: Type Conversion & Safety Boundary](/assets/courses/cyber-04/c04_m01_l02_explicit_type_conversion_boundary.png)\n\n*Figure 1.4: Explicit validation boundary converting untrusted telemetry strings with domain bounds and error isolation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Untrusted Input Origin (Left Column):** Every log token, configuration parameter, or network field starts on the untrusted side as raw text (`\"443\"`, `\"abc\"`, `\"70000\" / \"-5\"`, and edge cases `0 vs \"0\" vs None`), never yet safe for arithmetic or threshold comparisons.\n- **3-Step Validation Gate (Center Pipeline):** Inputs pass sequentially downward through three explicit defensive checks: Gate `1` performs explicit type conversion (`int(\"443\") -> 443`, `int(\"FF\", 16) -> 255`, `float(\"0.5\") -> 0.5`), rejecting mixed concatenation (`\"port \" + 443 -> TypeError`) and malformed numeric text (`\"abc\" -> ValueError`, exited early along the upper orange branch); Gate `2` enforces 16-bit protocol bounds (`0 <= port <= 65,535` across all `2^16 = 65,536` ports), catching values like `\"70000\"` and `\"-5\"` that succeed cleanly as Python integers yet violate network bounds (exited along the lower orange branch into `BLOCKED CLEANLY`); Gate `3` enforces explicit sentinel checks (`if val is None:`) so valid zero telemetry (`bool(0) == False`) is never confused with missing `None` or truthy string `\"0\"` (`bool(\"0\") == True`).\n- **Safe vs. Rejected Outcomes & Prohibited `eval()` Banner (Right & Bottom):** Validated inputs exit cleanly rightward into the green `SAFE TO USE` box (`port = 443 (int)`, `ratio = 0.5 (float)`, `count = 0 (int)`), while invalid inputs terminate loudly in `BLOCKED CLEANLY`. Across the bottom danger strip, the diagram prohibits `eval(user_input)`: passing an attacker payload string (in valid Python syntax `'__import__(\"os\").system(\"whoami\")'`) executes arbitrary OS commands, whereas strict `int()`, `float()`, and `json.loads()` reject code strings safely.\n\n## 6. Arithmetic Operators and IEEE 754 Floating-Point Precision\n\nPython provides seven core arithmetic operators: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (true division, **always returns `float`** even for `8 / 2 -> 4.0`), `//` (floor division rounding toward $-\\infty$, so `-5 // 2 == -3`), `%` (modulo remainder), and `**` (exponentiation, binding tighter than unary minus so `-3 ** 2 == -9`).\n\nHowever, binary hardware cannot store base-10 fractions such as $0.1_{10}$ or $0.2_{10}$ finitely in base 2, just as $1/3$ repeats infinitely in decimal:\n\n:::math-steps\nStep 01: Base-10 tenth approximation in IEEE 754 binary64\n$$0.1_{10} \\approx 0.10000000000000000555\\ldots_{10}$$\nResult: Not equal to exact 1/10\n\nStep 02: Base-10 fifth approximation in IEEE 754 binary64\n$$0.2_{10} \\approx 0.20000000000000001110\\ldots_{10}$$\nResult: Positive binary64 rounding tail\n\nStep 03: IEEE 754 binary64 sum comparison\n$$0.1 + 0.2 = 0.30000000000000004 \\neq 0.3$$\nResult: 0.1 + 0.2 == 0.3 evaluates to False\n\nStep 04: Safe tolerance comparison via math.isclose()\n$$\\lvert a - b \\rvert \\le \\max(\\epsilon_{\\text{rel}} \\cdot \\max(\\lvert a \\rvert, \\lvert b \\rvert), \\, \\epsilon_{\\text{abs}})$$\nResult: Compares within relative and absolute tolerance bounds\n:::\n\nNotice the practical consequence verified interactively: `0.1 + 0.2 == 0.3` evaluates to `False`. Follow three strict numeric habits: use `int` for discrete byte/event counts, use the standard library `decimal.Decimal` when base-10 financial or regulatory precision is required, and use `math.isclose(a, b)` (paired with `math.isfinite()` so `float('nan')`, where `nan == nan` is `False`, never silently bypasses `<` or `>` threshold gates).\n\n## 7. Truthiness Traps in Security Conditions\n\nEvery Python value can be evaluated in a Boolean context (`if x:` or `bool(x)`). Empty collections (`\"\"`, `[]`, `{}`, `set()`, `()`), zero (`0`, `0.0`), and `None` evaluate to `False`, while non-empty collections and non-zero numbers evaluate to `True`:\n\n```python\n[bool(x) for x in (0, \"\", [], None, \"0\", [0])]\n```\n\n```terminal\n[False, False, False, False, True, True]\n```\n\n> [!WARNING]\n> **The Unconverted String Trap:** Notice `bool(\"0\")` is `True`, `bool(\"False\")` is `True`, and `bool(\" \")` is `True` because every non-empty `str` has length $\\ge 1$! Meanwhile, legitimate telemetry `failures = 0` is falsy just like missing `failures = None`. Check `if val is None:` explicitly for absent fields, and use `bool(username.strip())` after trimming whitespace before accepting string identifiers.\n\n## 8. Quick Revision Terminology\n\n- **Dynamic Typing:** Language design where type metadata belongs to runtime objects rather than fixed variable declarations, permitting names to rebind across executions while enforcing strong type checks inside operations.\n- **None:** Python's singleton null/absence object (`NoneType`), conventionally tested exclusively using `is None` or `is not None`.\n- **Truthiness:** Evaluation of arbitrary Python objects as `True` or `False` in condition tests, treating zero numbers, `None`, and empty containers (`\"\"`, `[]`, `{}`, `set()`) as `False`."
    },
    {
      "id": "les_c4_m1_l3",
      "title": "1.3 Strings, Formatting, and Injection Safety",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Create raw strings for paths, slice immutable text safely, master split/partition/strip/join methods without off-by-one bugs, format audit columns with f-strings, and separate data from commands.",
      "learning_objectives": [
        "Select raw r'...' literals accurately for paths while avoiding trailing-backslash syntax traps",
        "Index and slice immutable str objects safely including step-reversal and slice clamping",
        "Choose split(), partition(), strip(), removesuffix(), find(), and join() without -1 slicing or char-set bugs",
        "Format columns with f-strings and keep untrusted strings strictly separated from command or query syntax"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-05",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l03_string_immutability_slicing_indexing.png",
          "caption": "Figure 1.5: String immutability, zero-based and negative indexing, and half-open [start:stop:step] slicing.",
          "placement_hint": "After Section 4 (Indexing, Slicing, and Immutability)"
        },
        {
          "id": "fig-04-01-06",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l03_strings_as_data_not_commands.png",
          "caption": "Figure 1.6: Unsafe string concatenation injection boundary versus parameterized argument isolation.",
          "placement_hint": "After Section 7 (Strings Are Data, Never Commands)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-05",
          "title": "Python String Indexing, Half-Open Slicing & Immutability",
          "url": "/assets/courses/cyber-04/c04_m01_l03_string_immutability_slicing_indexing.png",
          "caption": "Figure 1.5: String immutability, zero-based and negative indexing, and half-open [start:stop:step] slicing.",
          "alt": "Character-tile array for s = 'FAILED' showing forward indices 0 to 5 and reverse indices -6 to -1, s[0] -> 'F', s[-1] -> 'D', s[10] -> IndexError, half-open slices s[0:3] -> 'FAI', s[1:4] -> 'AIL', s[::-1] -> 'DELIAF', s[10:20] -> '' clamping, and immutability TypeError on s[0] = 'f'."
        },
        {
          "id": "fig-04-01-06",
          "title": "Figure 1.6: Strings Are Data, Never Commands",
          "url": "/assets/courses/cyber-04/c04_m01_l03_strings_as_data_not_commands.png",
          "caption": "Figure 1.6: Unsafe string concatenation injection boundary versus parameterized argument isolation.",
          "alt": "Side-by-side comparison showing attacker string 127.0.0.1; cat /etc/shadow injected through f-string command concatenation versus kept passive inside a separate argument list with shell=False"
        }
      ],
      "content": "## 1. Why Immutable Strings and Injection Hygiene Sit at the Heart of Security Scripting\n\nSecurity automation spends most of its CPU cycles reading, splitting, normalizing, and reporting strings: raw syslog records, Windows file paths, JSON keys, usernames, and CLI arguments. Two engineering misconceptions cause continuous trouble for beginners: treating string objects as mutable character buffers that can be altered in place, and concatenating untrusted log or user strings straight into OS commands, SQL statements, or HTML reports.\n\nPython solves the first mistake cleanly by enforcing **immutable `str` objects** (guaranteeing hashes and dictionary keys never drift under your feet) and prevents the second mistake when engineers learn to pass parsed tokens cleanly as pure data rather than executable syntax.\n\n## 2. Core Objectives for This Lesson\n\n- **Safe Literal Delimiters:** Choose single, double, triple-quoted, and raw `r\"...\"` literals accurately while avoiding Windows path escape corruption.\n- **Indexing and Half-Open Slicing:** Navigate characters with zero-based forward indices, negative reverse offsets, step slices (`[::-1]`), and safe out-of-range slicing.\n- **Canonical String Methods:** Combine `.strip()`, `.split()`, `.partition()`, `.startswith()`, `.removesuffix()`, `.replace()`, `.join()`, and `repr()` while avoiding the `.find() == -1` slicing trap.\n- **Precision f-Strings:** Render right-aligned audit columns (`:>5`), percentage formatters (`:.0%`), and escaped braces (`{{}}`).\n- **Injection Hygiene:** Enforce strict data-vs-code separation so untrusted text never alters commands or queries.\n\n## 3. Creating Strings and Escaping Windows Paths Safely\n\nStrings accept single quotes (`'web-01'`), double quotes (`\"web-01\"`), or triple quotes (`\"\"\"...\"\"\"`) spanning multiple lines, and repeat cleanly with integer multiplication (`\"=\" * 80`). Inside normal literals, backslashes introduce escape codes: `\\n` (newline), `\\t` (horizontal tab), and `\\\\` (single literal backslash).\n\nWhen encoding Windows file paths or Module 3 regular expressions, unescaped backslashes corrupt text silently (`\"C:\\temp\"` turns `\\t` into a tab character!). Prefix the string with `r` for a **raw string literal**: `r\"C:\\temp\"` leaves backslashes literal. Keep one lexical quirk in mind: even inside a raw string, a single trailing backslash before the closing quote (`r\"C:\\temp\\\"`) still escapes the delimiter and causes a `SyntaxError`, so omit trailing slashes or build paths cleanly with `pathlib.Path` (Modules 3 and 4).\n\n## 4. Indexing, Slicing, and String Immutability\n\nEvery character inside a Python `str` has a forward index starting at `0` and a reverse index starting from `-1` at the final character. Slices use half-open intervals `[start:stop:step]`, including `start` and stopping just before `stop`:\n\n```python\ns = \"FAILED\"\nfirst = s[0]          # \"F\"\nlast = s[-1]          # \"D\"\nprefix = s[0:3]       # \"FAI\" (indices 0, 1, 2)\nmid = s[1:4]          # \"AIL\"\nreversed_s = s[::-1]  # \"DELIAF\"\n```\n\nTwo behaviors catch analysts off guard until practiced:\n\n- **Strings Are Immutable:** Attempting `s[0] = \"f\"` raises `TypeError: 'str' object does not support item assignment`. Every transformation (`.upper()`, `.strip()`, `.replace()`) returns a brand-new string object; you must capture the return value (`line = line.strip()`) rather than discarding it.\n- **Index vs. Slice Out-of-Bounds:** Direct lookup `s[10]` beyond string length raises `IndexError`, whereas out-of-range slicing `s[10:20]` clamps gracefully and returns `\"\"`.\n\n![Python String Indexing, Half-Open Slicing & Immutability](/assets/courses/cyber-04/c04_m01_l03_string_immutability_slicing_indexing.png)\n\n*Figure 1.5: String immutability, zero-based and negative indexing, and half-open `[start:stop:step]` slicing.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Forward & negative coordinate map (top strip):** Mapping `s = \"FAILED\"` onto character tiles (`0`..`5` forward, `-6`..`-1` reverse) shows why `s[0]` yields `\"F\"`, `s[-1]` yields `\"D\"`, and out-of-bounds single lookup `s[10]` triggers `IndexError`.\n- **Half-open slicing & immutability (bottom panels):** On the bottom left, `[0:3]` stops strictly before index `3` (`\"FAI\"`), `s[1:4]` extracts `\"AIL\"`, `s[::-1]` reverses to `\"DELIAF\"`, and `s[10:20]` safely clamps to `\"\"`; on the bottom right, `s[0] = \"f\"` raises `TypeError`, whereas `clean = s.strip()` allocates a new `str` object in memory.\n\n## 5. Security Text Methods in Action\n\nSection 2 of `m01_foundations.py` parses a synthetic authentication log line using built-in `str` methods:\n\n```python\nline = \"2026-11-07 10:02:11 FAILED login user=asha src=10.20.4.17\"\nprint(\"2.\", line.upper()[:19], \"|\", line.split()[2], \"|\", \"asha\" in line)\nprint(\"   \", f\"{hostname}:{port} load={load:.0%} public={is_public}\")\n```\n\n```terminal\n2. 2026-11-07 10:02:11 | FAILED | True\n    web-01:443 load=75% public=True\n```\n\nChoose each method deliberately for the parsing job at hand:\n\n| Method / Operator | Exact Semantics | Critical Edge-Case Trap to Avoid |\n| :--- | :--- | :--- |\n| `s.split()` vs `s.split(\" \")` | Default splits on arbitrary runs of whitespace; `\" \"` splits every single space | `\"a  b\".split(\" \")` emits unwanted empty `\"\"` tokens between consecutive spaces |\n| `s.partition(\"=\")` | Splits at the **first** `\"=\"` only into `(before, \"=\", after)` | Unlike unbounded `split(\"=\")`, safely preserves extra `=` inside Base64 tokens |\n| `s.strip()` | Strips leading/trailing whitespace (`\" \"`, `\"\\t\"`, `\"\\r\"`, `\"\\n\"`) | Passing chars like `s.strip(\".log\")` strips a *character set*, NOT a suffix; use `.removesuffix(\".log\")` (Python 3.9+)! |\n| `s.startswith(p)` / `s.endswith(p)` | Clean prefix/suffix boolean check (accepts tuple of suffixes) | Safer against off-by-one errors than manual `s[:6] == \"FAILED\"` slicing |\n| `s.find(sub)` vs `s.index(sub)` | `find()` returns `-1` if absent; `index()` raises `ValueError` | Passing unchecked `-1` into `s[:idx]` silently trims the last char instead of failing! |\n| `\",\".join(items)` | Fast concatenation of string iterables with separator | Raises `TypeError` if any item is an `int`—convert via `[str(x) for x in ports]` first |\n| `repr(s)` | Displays invisible control chars (`\\r`, `\\t`, `\\n`) explicitly in quotes | `print(s)` hides trailing spaces and carriage returns that break allowlist equality checks |\n\n### Canonical Normalization Checklist\n\nWhen matching usernames or hostnames against allowlists, chain `.strip().casefold()` (or `.lower()`) on incoming strings so attacker payloads padded with trailing whitespace (`\"asha \"`) or mixed casing (`\"ASHA\"`) cannot evade exact checks—and double-check `entry.split(\"user=\")` length before indexing `[1]` whenever malformed log lines could omit `\"user=\"`.\n\n## 6. Formatted String Literals (f-Strings)\n\nIntroduced in the Python Language Reference, f-strings embed Python expressions directly inside `{...}` placeholders evaluated at runtime, paired with compact mini-language format specifiers after a colon `:`:\n\n- **Percentage Scaling (`:.0%`):** Multiplies `load = 0.75` by `100` and formats zero decimal places: `\"75%\"`.\n- **Right-Aligned Audit Columns (`:>5`):** Section 4 of `m01_foundations.py` aligns TCP port numbers in 5-character columns via `f\"    port {p:>5} -> {name}\"`, lining up `22`, `443`, `8080`, and `3389` cleanly. Note that width specifies a *minimum* padding field—long strings like `\"administrator_ops\"` exceed `<8` unless explicitly capped with precision (e.g., `f\"{user:<8.8}\"`).\n- **Literal Braces:** Double braces `{{tag}}` inside an f-string render literal `{tag}` without interpolation.\n\n## 7. Security Habit: Strings Are Data, Never Commands\n\n> [!CAUTION]\n> **Injection Risk from String Concatenation:** Never construct shell commands, SQL queries, or HTML/script alert pages by joining or interpolating untrusted strings (such as `cmd = f\"ping -c 1 {user_ip}\"` passed to a shell, or `f\"SELECT * FROM users WHERE name='{u}'\"`). An attacker who submits `127.0.0.1; cat /etc/shadow` or `' OR '1'='1` turns passive data characters into active control syntax! Module 4 teaches parameterized `subprocess.run([...], shell=False)` argument lists that keep user data strictly isolated from interpreter syntax.\n\n![Figure 1.6: Strings Are Data, Never Commands](/assets/courses/cyber-04/c04_m01_l03_strings_as_data_not_commands.png)\n\n*Figure 1.6: Unsafe string concatenation injection boundary versus parameterized argument isolation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Shared Malicious Input:** Both columns start from the exact same untrusted input (`user_ip = \"127.0.0.1; cat /etc/shadow\"`), demonstrating that safety depends on the execution boundary rather than hoping input looks benign.\n- **Unsafe Mixing Track (Left — Blush Lane):** Interpolating `user_ip` inside `f\"ping -c 1 {user_ip}\"` produces one flat command string (`ping -c 1 127.0.0.1; cat /etc/shadow`) where the semicolon `;` acts as shell command syntax, allowing an attacker to execute `cat /etc/shadow` after `ping`.\n- **Safe Separation Track (Right — Mint Lane):** Passing `[\"ping\", \"-c\", \"1\", user_ip]` directly with `shell=False` isolates `user_ip` inside a single operand slot—the OS passes the entire string directly to `ping` as one literal address argument instead of invoking a shell interpreter, neutralizing command injection.\n\n## 8. Quick Revision Terminology\n\n- **f-string (Formatted String Literal):** String literal prefixed with `f` (such as `f\"{hostname}:{port}\"`) whose `{...}` fields evaluate expressions and apply formatting specifications at runtime.\n- **Immutable:** Object guarantee (`str`, `int`, `float`, `tuple`) forbidding in-place modification after creation, so string operations always construct new strings."
    },
    {
      "id": "les_c4_m1_l4",
      "title": "1.4 Data Structures: Lists, Dicts, Sets, and Tuples",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Choose among lists, insertion-ordered dictionaries, O(1) hash sets, and immutable tuples for security datasets, prevent shallow-copy aliasing, and eliminate O(N*M) threat-feed bottlenecks.",
      "learning_objectives": [
        "Select list, dict, set, or tuple cleanly based on ordering, uniqueness, mutability, and lookup semantics",
        "Apply dictionary .get(key, default) and .items() safely while honoring hashable-key rules",
        "Replace O(N*M) nested list threat-feed scans with O(N+M) set lookups and set algebra",
        "Avoid mutable reference aliasing and shallow-copy bugs and reserve 'is' exclusively for None"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-07",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l04_data_structure_decision.png",
          "caption": "Figure 1.7 (C04-M01-F2): Decision tree matching security data problems to list, dict, set, or tuple.",
          "placement_hint": "After Section 6 (Structural Decision Matrix)"
        },
        {
          "id": "fig-04-01-08",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l04_list_scan_vs_hash_set_complexity.png",
          "caption": "Figure 1.8: Linear list membership scan complexity O(N*M) versus hash-table set lookup O(N+M).",
          "placement_hint": "After Section 5 Quantitative Breakdown (Scenario S1)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-08",
          "title": "Figure 1.8: Why Set Lookups Beat List Scans in Threat Hunting",
          "url": "/assets/courses/cyber-04/c04_m01_l04_list_scan_vs_hash_set_complexity.png",
          "caption": "Figure 1.8: Linear list membership scan complexity O(N*M) versus hash-table set lookup O(N+M).",
          "alt": "Comparison showing 100 billion sequential checks when searching a 50,000-IP list across 2,000,000 log IPs versus 2.05 million total steps using a Python set hash table"
        },
        {
          "id": "fig-04-01-07",
          "title": "Figure 1.7 (C04-M01-F2): Choosing the Right Python Container",
          "url": "/assets/courses/cyber-04/c04_m01_l04_data_structure_decision.png",
          "caption": "Figure 1.7 (C04-M01-F2): Decision tree matching security data problems to list, dict, set, or tuple.",
          "alt": "Four-branch decision chart mapping security data needs to list, dict, set, and tuple with examples and rules"
        }
      ],
      "content": "## 1. Why Container Choice Determines Whether Security Scripts Finish in Milliseconds or Hours\n\nSecurity telemetry almost always takes one of four recurring shapes: chronological log streams, key-to-value metadata lookups, deduplicated indicator lists, or fixed multi-field event records. Picking a Python **`list`** simply because it is familiar works fine on ten sample lines during development, then collapses into multi-hour timeouts when an analyst checks two million proxy IPs against fifty thousand threat indicators in production.\n\nMatching the data structure to your query semantics gives you both cleaner code and dramatic algorithmic speedups right out of the standard runtime.\n\n## 2. Core Objectives for This Lesson\n\n- **Lists (`list`):** Store ordered, duplicate-capable sequences cleanly using `append()`, `extend()`, `remove()`, `pop()`, and non-mutating `sorted()`.\n- **Dictionaries (`dict`):** Build insertion-ordered key-to-value mappings safely with `.get(key, default)`, `.pop()`, and `.items()`, understanding hashable-key constraints.\n- **Sets (`set`):** Deduplicate telemetry and execute set algebra (`|`, `&`, `-`, `^`, `.isdisjoint()`) in $O(1)$ average lookup time.\n- **Tuples (`tuple`):** Package fixed-shape event records via unpacking and use all-immutable tuples as composite dictionary keys.\n- **Memory & Reference Discipline:** Distinguish aliasing (`b = a`) from shallow copying (`.copy()`), and value equality (`==`) from memory identity (`is`).\n\n## 3. Lists: Ordered, Changeable Sequences\n\nUse a `list` whenever arrival order matters and duplicates are meaningful (chronological syslog entries, packet timestamps, ordered remediation steps). Section 3 of `m01_foundations.py` mutates a port list in place and inspects slices:\n\n```python\nopen_ports = [22, 80, 443]\nopen_ports.append(8080)\nopen_ports.remove(80)\nprint(\"3.\", open_ports, \"count:\", len(open_ports), \"first:\", open_ports[0],\n      \"last:\", open_ports[-1], \"slice:\", open_ports[1:])\n```\n\n```terminal\n3. [22, 443, 8080] count: 3 first: 22 last: 8080 slice: [443, 8080]\n```\n\nKey operational nuances:\n\n- **In-Place Mutators Return `None`:** Calling `x = open_ports.sort()` or `x = open_ports.append(9000)` leaves `x` equal to `None`; use `sorted(open_ports)` when you need a brand-new sorted list while keeping the original intact.\n- **`append(x)` vs. `extend(iterable)`:** `append([80, 443])` nests the list as one element, whereas `extend([80, 443])` unpacks and appends each element individually.\n- **Removing Safely:** `list.remove(x)` raises `ValueError` if `x` is absent, and `min([])`/`max([])` raise `ValueError` unless `default=...` is supplied; membership test `x in large_list` scans sequentially from index `0` upward ($O(N)$).\n\n## 4. Dictionaries: Key-to-Value Lookups\n\nUse a `dict` whenever data answers a fast lookup by unique key: TCP port to service name, username to failure counter, or hostname to owner metadata. Since Python 3.7, dictionaries preserve **exact key insertion order** as a guaranteed language feature. Section 4 of `m01_foundations.py` illustrates lookup safety and iteration:\n\n```python\nservices = {22: \"ssh\", 443: \"https\", 8080: \"http-alt\"}\nservices[3389] = \"rdp\"\nprint(\"4.\", services.get(22), services.get(25, \"unknown\"), sorted(services))\nfor p, name in services.items():\n    print(f\"    port {p:>5} -> {name}\")\n```\n\n```terminal\n4. ssh unknown [22, 443, 3389, 8080]\n    port    22 -> ssh\n    port   443 -> https\n    port  8080 -> http-alt\n    port  3389 -> rdp\n```\n\nNotice three defensive rules:\n\n- **Avoid Unchecked Subscripts:** `services[25]` or `{\"a\": 1}[\"b\"]` crashes immediately with `KeyError: 'b'`. Calling `services.get(25, \"unknown\")` (or `d.pop(key, default)` when extracting and deleting) returns the fallback instead. Similarly, increment counters cleanly via `failures[user] = failures.get(user, 0) + 1` rather than `failures[user] += 1` on unseen keys, and use `if user not in d: d[user] = set()` (or `collections.defaultdict(set)`) before mutating per-user sets.\n- **Keys Must Be Hashable (Immutable):** `str`, `int`, and immutable `tuple` objects work cleanly as keys, whereas mutable `list` objects raise `TypeError: unhashable type: 'list'`.\n- **Key vs. Value Membership:** `22 in services` queries the hash table in $O(1)$ average time, whereas scanning `\"ssh\" in services.values()` performs an $O(N)$ linear scan.\n\n## 5. Sets and Quantitative Complexity in Threat Hunting\n\nA `set` stores unique, unordered elements inside a hash table. Notice one classic syntax pitfall: `{}` constructs an empty **`dict`**, not a set (calling `.add()` on `{}` raises `AttributeError`); always call `set()` for an empty set. Section 5 of `m01_foundations.py` deduplicates observed source IPs and subtracts an allowlist:\n\n```python\nseen_ips = [\"10.0.0.5\", \"10.0.0.9\", \"10.0.0.5\", \"203.0.113.7\"]\nunique = set(seen_ips)\nallow = {\"10.0.0.5\", \"10.0.0.9\"}\nprint(\"5.\", len(seen_ips), \"seen,\", len(unique), \"unique; not allow-listed:\",\n      sorted(unique - allow))\n```\n\n```terminal\n5. 4 seen, 3 unique; not allow-listed: ['203.0.113.7']\n```\n\n- **Set Algebra Operators:** Union (`a | b`, either sensor saw it), Intersection (`a & b`, appeared in **both** bad-domain traffic and file-server connections), Difference (`a - b`, seen but not allow-listed), Symmetric Difference (`a ^ b`, discrepancy present in *exactly one* inventory), and `a.isdisjoint(b)` (short-circuits immediately on non-empty overlap).\n- **Deterministic Printing:** Because Python randomizes hash seeds per process (`PYTHONHASHSEED`), wrapping `unique - allow` in `sorted()` ensures deterministic display and reproducible unit tests.\n\n### Quantitative Breakdown: Scenario S1 — Proxy Feed vs. Set Intersection\n\nA SOC colleague scripts a loop checking $N = 2{,}000{,}000$ daily proxy IPs against an IOC list `bad_list` holding $M = 50{,}000$ known malicious IPs via `if ip in bad_list:`, stalling for hours. Converting `bad_set = set(bad_list)` collapses worst-case quadratic work into near-linear hashing:\n\n:::math-steps\nStep 01: Linear list membership checks over N proxy IPs and M feed entries\n$$N \\times M = 2 \\times 10^6 \\times 5 \\times 10^4 = 1.0 \\times 10^{11} \\text{ string comparisons}$$\nResult: Multi-hour O(N * M) CPU bottleneck\n\nStep 02: One-time set build plus hash-based membership tests\n$$M + N = 50{,}000 + 2{,}000{,}000 = 2.05 \\times 10^6 \\text{ hash operations}$$\nResult: Near-linear O(N + M) sub-second completion\n\nStep 03: Operational lookup work reduction factor\n$$\\frac{1.0 \\times 10^{11}}{2.05 \\times 10^6} \\approx 48{,}780\\times \\text{ fewer checks}$$\nResult: Choosing set over list cuts work by nearly five orders of magnitude\n:::\n\n> [!TIP]\n> **Normalize Before Hashing:** Set lookups match raw characters strictly. Strip whitespace and normalize IP formatting (e.g., compressed IPv6 via `ipaddress`) before building sets so `\"10.0.0.5 \"` or `\"2001:0db8::1\"` never creates a false negative. If you need to preserve arrival order while deduplicating a list, use `list(dict.fromkeys(seen_ips))` instead of `list(set(seen_ips))`.\n\n![Figure 1.8: Why Set Lookups Beat List Scans in Threat Hunting](/assets/courses/cyber-04/c04_m01_l04_list_scan_vs_hash_set_complexity.png)\n\n*Figure 1.8: Linear list membership scan complexity $O(N \\cdot M)$ versus hash-table set lookup $O(N + M)$.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Linear List Scan Bottleneck (Top Lane):** For each proxy IP (`e.g., 10.0.0.1`) tested via `if ip in bad_list:`, Python scans sequentially from entry `#1`, `#2`, `#3` through `#50,000` in worst-case scans, yielding `2,000,000 × 50,000 = 100,000,000,000` comparisons (`Takes Hours — O(N × M)`).\n- **Hash-Table Set Jump (Bottom Lane):** Converting `bad_list` once with `bad_set = set(bad_list)` takes `50,000` hash insertions, after which every incoming IP resolves in a single hash-table bucket jump (`2,000,000` lookups), totaling `50,000 + 2,000,000 = 2,050,000` operations (`Finishes in Seconds — O(N + M)`).\n- **Operational Impact Takeaway (Bottom Banner):** Converting membership feeds with `bad_set = set(bad_list)` eliminates roughly `~48,780×` redundant checks in Scenario S1.\n\n## 6. Tuples: Fixed Records and Composite Keys\n\nTuples use parentheses—e.g., `(22, 443)`, or `(22)` with a mandatory trailing comma for a single-element tuple (`(22)` without comma is just `int`)—to bundle fixed-shape records whose element count and immutability clarify intent. Section 6 of `m01_foundations.py` unpacks a telemetry event record cleanly:\n\n```python\nevent = (\"2026-11-07T10:02:11\", \"asha\", \"FAILED\")\ntimestamp, user, result = event        # unpacking\nprint(\"6.\", user, result)\n```\n\n```terminal\n6. asha FAILED\n```\n\nBecause tuples are immutable *whenever all their elements are immutable* (remember `([\"10.0.0.5\"], 443)` is still unhashable because Python checks hashability recursively!), pure immutable tuples like `(src_ip, dst_port)` make ideal composite dictionary keys for flow tracking.\n\n### Structural Decision Matrix\n\n| Analytical Need | Optimal Structure | Security Example |\n| :--- | :--- | :--- |\n| Ordered items where duplicates carry meaning | `list` | Syslog lines sorted in chronological arrival order |\n| Fast lookup or counting by unique key | `dict` | `user -> failure_count`, `port -> service_name` |\n| Deduplicated membership (`x in s`) & set algebra | `set` | Known-bad IOC IPs, unique domains contacted |\n| Fixed-shape record / multi-part dictionary key | `tuple` | `(src_ip, dst_port)`, `(\"asha\", \"FAIL\")` |\n\n![Figure 1.7 (C04-M01-F2): Choosing the Right Python Container](/assets/courses/cyber-04/c04_m01_l04_data_structure_decision.png)\n\n*Figure 1.7 (C04-M01-F2): Decision tree matching security data problems to `list`, `dict`, `set`, or `tuple`.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Data-Shape Selection Prompt (Root Node):** Starting from `\"What shape is your security data?\"`, the tree routes analysts strictly by access semantics rather than defaulting blindly to lists.\n- **Four Core Container Leaves:** Choose **`list`** (`[22, 443, 8080]`) for ordered items where duplicates matter, such as syslog lines in arrival order; **`dict`** (`{22: 'ssh', 443: 'https'}`) for `Key -> Value` port lookups and per-user counters; **`set`** (`{'10.0.0.5', '203.0.113.7'}`) when uniqueness and fast membership checks matter for deduplicating IPs and allowlists; and **`tuple`** (`('asha', 'FAILED')`) for fixed read-only event rows and composite dictionary keys.\n\n## 7. Mutability, Reference Aliasing, Equality (`==`) vs. Identity (`is`)\n\nBecause names hold object references rather than independent value copies, `b = a` on a mutable `list` or `dict` makes both names alias the **exact same object in memory**—appending through `b` mutates `a`! Avoid mutating containers in place while iterating over them (which raises `RuntimeError` on dicts/sets or skips shifted indices on lists—iterate over `.copy()` or filter with a comprehension), and observe key identity rules:\n\n- **Shallow Copies:** `c = a.copy()` (or `list(a)`) allocates a fresh top-level container, though nested mutable sub-lists remain shared unless cloned with `copy.deepcopy()` (likewise, avoid `[{}] * 3`, which puts three references to one dictionary inside a list; write `[{} for _ in range(3)]`).\n- **`==` vs. `is`:** Execution-tested `[1, 2] == [1, 2]` evaluates to `True` (identical values), whereas `[1, 2] is [1, 2]` evaluates to `False` (two separate objects at different memory addresses). Reserve `is` and `is not` exclusively for the `None` singleton (`if x is None:`), because integers like `300` outside CPython's small-integer cache (`-5` to `256`) are not guaranteed to share identity.\n\n## 8. Quick Revision Terminology\n\n- **List (`list`):** Ordered, mutable sequence allowing duplicates and supporting integer indexing, slicing, and in-place mutation methods.\n- **Dictionary (`dict`):** Insertion-ordered hash mapping associating unique hashable keys to arbitrary values with fast `.get()` fallback lookups.\n- **Set (`set`):** Unordered hash collection enforcing element uniqueness and constant-time average membership checks alongside set algebra.\n- **Tuple (`tuple`):** Ordered, immutable sequence suited for positional unpacking and composite dictionary keys when elements are immutable."
    },
    {
      "id": "les_c4_m1_l5",
      "title": "1.5 Conditional Control Flow and Text-Sorting Bugs",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Order if/elif/else branches without rule shadowing, apply chained comparisons and short-circuit guards safely, avoid boolean precedence traps, and solve CS2 string-vs-integer port sorting.",
      "learning_objectives": [
        "Order specific high-priority security branches before broad fallback ranges",
        "Apply chained comparisons, short-circuit guards, is None identity tests, and Python 3.10 match/case",
        "Diagnose boolean precedence and truthiness errors such as 'role == \"admin\" or \"ops\"'",
        "Fix lexicographical CSV port comparison bugs (CS2) with explicit integer conversion and 16-bit bounds"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-09",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l05_branch_precedence_short_circuit.png",
          "caption": "Figure 1.9: Top-to-bottom branch evaluation, admin-port shadowing hazard, and short-circuit guard evaluation.",
          "placement_hint": "After Section 4 (Comparison and Logical Operators)"
        },
        {
          "id": "fig-04-01-10",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l05_lexicographical_vs_numeric_comparison.png",
          "caption": "Figure 1.10: ASCII/Unicode lexicographical comparison ('443' > '1000') versus validated numeric port ordering (CS2).",
          "placement_hint": "After Section 6 (Case Study C04-M01-CS2)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-09",
          "title": "Figure 1.9: Branch Order & Safe Short-Circuit Checks",
          "url": "/assets/courses/cyber-04/c04_m01_l05_branch_precedence_short_circuit.png",
          "caption": "Figure 1.9: Top-to-bottom branch evaluation, admin-port shadowing hazard, and short-circuit guard evaluation.",
          "alt": "Two-panel diagram illustrating top-to-bottom if/elif/else branch ordering for Port 22 alongside short-circuit empty checks and safe in-tuple membership tests"
        },
        {
          "id": "fig-04-01-10",
          "title": "Figure 1.10: Comparing Port Numbers as Text vs. Integers",
          "url": "/assets/courses/cyber-04/c04_m01_l05_lexicographical_vs_numeric_comparison.png",
          "caption": "Figure 1.10: ASCII/Unicode lexicographical comparison ('443' > '1000') versus validated numeric port ordering (CS2).",
          "alt": "Comparison diagram contrasting wrong string comparison '443' > '1000' via ASCII code 52 vs 49 against converted integer comparison 443 < 1000 on a numeric scale"
        }
      ],
      "content": "## 1. Why Deterministic Branch Ordering and Numeric Type Boundaries Prevent Misclassification\n\nAuthorization checks, firewall policy classifiers, and anomaly detectors all depend on conditional branching: evaluating rules in exact priority order and comparing parsed fields cleanly against security thresholds. When branch ordering overlaps blindly or unparsed CSV strings slip into relational comparisons (`>`, `<`), Python does not warn you on `str > str`—it silently evaluates alphabetical code-point order instead of numeric magnitude, flipping critical allow/deny decisions upside down.\n\n## 2. Core Objectives for This Lesson\n\n- **Ordered Branch Design:** Structure `if` / `elif` / `else` suites top-to-bottom so narrow security exceptions (admin ports) are never shadowed by broad rules (`< 1024`).\n- **Idiomatic Operators:** Master chained range checks (`1 <= p <= 1023`), membership (`in` / `not in`), `is None` identity guards, and logical short-circuiting.\n- **Boolean Precedence Traps:** Eliminate classic `if role == \"admin\" or \"ops\":` and `if status == (200 or 201):` bugs caused by Python operator binding and truthiness rules.\n- **Structural Pattern Matching:** Recognize Python 3.10+ `match`/`case` constructs for clean telemetry event dispatching.\n- **CS2 Type-Confusion Defense:** Diagnose and fix lexicographical string sorting of port numbers using explicit conversion and 16-bit validation.\n\n## 3. Ordered Conditional Branching (`if`, `elif`, `else`)\n\nPython tests branches strictly from top to bottom and executes only the **first** branch whose condition evaluates truthy. Section 7 of `m01_foundations.py` defines `classify(p)` to label administrative, well-known, and high ports (wrapping logic inside a reusable `def` function, covered thoroughly in Module 2):\n\n```python\ndef classify(p):\n    if p in (22, 3389):\n        return \"admin\"\n    elif p < 1024:\n        return \"well-known\"\n    else:\n        return \"high\"\n\nprint(\"7.\", [(p, classify(p)) for p in (22, 80, 3389, 8080)])\n```\n\n```terminal\n7. [(22, 'admin'), (80, 'well-known'), (3389, 'admin'), (8080, 'high')]\n```\n\nNotice why **branch order matters**: port `22` satisfies both `p in (22, 3389)` and `p < 1024`. If an engineer accidentally places `if p < 1024:` first, SSH port `22` gets shadowed and mislabeled as `\"well-known\"` instead of `\"admin\"`. Narrow high-priority security classifications must precede broad range rules. When prototyping an incomplete branch, use `pass` as an explicit empty statement placeholder so indentation stays syntactically valid.\n\n## 4. Comparison, Logical, Membership, and Identity Operators\n\nWrite expressive conditions cleanly using Python's four operator groups:\n\n- **Chained Comparisons:** `1 <= port <= 1023` naturally checks both bounds while evaluating `port` only once—never write C-style `(1 <= port) < 1023`, and remember `80 < 1000 == True` evaluates `(80 < 1000) and (1000 == True)`, returning `False`! Unlike C, writing `if port = 443:` is caught immediately at parse time as a `SyntaxError`.\n- **Inequality & Identity:** Always use `!=` (never `<>`), and check `if owner is None:` (PEP 8 prefers `is None` over `== None` because custom classes can override `==`).\n- **Membership:** Prefer `port not in SAFE_PORTS` over `not port in SAFE_PORTS`; keep security allowlists in sets (`{22, 3389}`) rather than growing dynamic lists.\n- **Logical Short-Circuiting (`not`, `and`, `or`):** Precedence evaluates `not` tightest, followed by `and`, then `or` (add explicit parentheses whenever combining `and` with `or`). Short-circuiting stops immediately once the outcome is fixed: in `if line and line.startswith(\"FAILED\"):`, if `line` is `None` or `\"\"`, `line.startswith()` is never called, preventing `AttributeError`.\n\n> [!WARNING]\n> **Two Deadly Logical Operator Traps:** First, `and`/`or` return **actual operand objects**, not forced `bool` values—so `if role == \"admin\" or \"ops\":` parses as `(role == \"admin\") or (\"ops\")`, which is ALWAYS truthy for `role = \"guest\"`! Likewise, `status == (200 or 201)` simplifies `(200 or 201)` to `200`, silently missing `201`! Always write `if role in (\"admin\", \"ops\"):` and `if status in (200, 201):`. Second, naive IP string prefix checks like `ip.startswith(\"10.\")` miss RFC 1918 `172.16.0.0/12`; use `ipaddress` (Module 2).\n\n![Figure 1.9: Branch Order & Safe Short-Circuit Checks](/assets/courses/cyber-04/c04_m01_l05_branch_precedence_short_circuit.png)\n\n*Figure 1.9: Top-to-bottom branch evaluation, admin-port shadowing hazard, and short-circuit guard evaluation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Top-to-Bottom Branch Priority (Left Panel):** Following `Port 22` downward through `if p in (22, 3389): -> 'admin'`, `elif p < 1024: -> 'well-known'`, and `else: -> 'high'` demonstrates that Python matches strictly on the first truthy test; reversing the top two branches would mislabel Port `22` as `'well-known'`.\n- **Safe Short-Circuit Guard (Top-Right Sub-Card):** In `if line and line.startswith('FAILED'):`, Python evaluates the left operand first—if `line` is `None` or `\"\"`, evaluation stops immediately before calling `.startswith()`, preventing `AttributeError` crashes.\n- **Logical Membership Shortcut Avoidance (Bottom-Right Sub-Card):** Contrasts the broken truthy string expression `role == 'admin' or 'ops'` (always truthy) against explicit tuple membership `role in ('admin', 'ops')`.\n\n## 5. Structural Pattern Matching (`match` / `case`)\n\nAdded in Python 3.10, `match` / `case` inspects both the shape (sequence length, dictionary keys, class attributes) and values of incoming event records—ideal when dispatching diverse firewall, DNS, and authentication event dictionaries—though clear `if`/`elif`/`else` chains remain equally clean and backward-compatible across Python versions.\n\n```python\nevent = (\"ALERT\", 22)\nmatch event:\n    case (\"ALERT\", 22 | 3389):\n        severity = \"high\"\n    case (\"ALERT\", _):\n        severity = \"medium\"\n    case _:\n        severity = \"info\"\n```\n\n## 6. Case Study C04-M01-CS2 (Fictional Teaching Scenario): Ports Sorted as Text\n\n> [!NOTE]\n> **Scenario Attribution:** *This teaching case study is a fictional scenario created to isolate string-vs-integer comparison faults.*\n\n- **Operational Context:** A junior analyst at Lotus Logistics exported active host ports from a spreadsheet CSV and wrote a Python condition reporting `\"ports above 1000\"` by testing each parsed string against `\"1000\"`.\n- **Root Cause Breakdown:** Because every CSV cell was retained as a `str`, Python executed lexicographical character comparison from left to right using Unicode code points rather than numeric integers. Execution testing confirms `'443' > '1000'`, `'8080' > '1000'`, and `'10000' > '1000'` **all return `True`**—though for two totally different reasons:\n\n:::math-steps\nStep 01: Unicode code-point comparison at string index 0\n$$\\operatorname{ord}(\\text{'4'}) = 52 > \\operatorname{ord}(\\text{'1'}) = 49 \\implies \\text{\"443\"} > \\text{\"1000\"} \\text{ is True}$$\nResult: Port 443 falsely flagged as above 1000\n\nStep 02: Prefix match plus length tie-breaker for longer port strings\n$$\\text{\"10000\"} \\text{ matches } \\text{\"1000\"} \\text{ across indices } 0..3 \\text{ with } \\operatorname{len}(\\text{\"10000\"}) = 5 > 4$$\nResult: Evaluates True via length rule rather than magnitude\n\nStep 03: True 16-bit integer magnitude ordering after int() cast\n$$443_{10} < 1000_{10} < 8080_{10} < 10000_{10}$$\nResult: Accurate numeric separation of well-known and registered ports\n:::\n\nNotice that Python 3 blocks direct mixed comparisons (`'443' > 1000` raises `TypeError`), catching unparsed inputs when one operand is already an `int`—the bug slipped through silently only because *both* sides were left as strings! Notice the identical bug in sorting IP strings: plain `sorted([\"10.0.0.10\", \"10.0.0.2\"])` puts `.10` before `.2` alphabetically unless sorted via `key=ipaddress.ip_address`.\n\n### The Verified Defensive Fix\n\nStrip raw CSV whitespace, convert explicitly with `int()`, reject out-of-domain port numbers, and compare (or sort with `sorted(valid_ports)` or `key=int`) strictly on validated integers:\n\n```python\nraw_ports = [\"22\", \"443\", \"1000\", \"8080\", \"10000\", \"99999\", \"https\"]\nhigh_ports = []\nfor token in raw_ports:\n    cleaned = token.strip()\n    if not cleaned.isdigit():\n        continue\n    port = int(cleaned)\n    if 0 <= port <= 65535 and port > 1000:\n        high_ports.append(port)\n\nprint(sorted(high_ports))\n```\n\n```terminal\n[8080, 10000]\n```\n\n![Figure 1.10: Comparing Port Numbers as Text vs. Integers](/assets/courses/cyber-04/c04_m01_l05_lexicographical_vs_numeric_comparison.png)\n\n*Figure 1.10: ASCII/Unicode lexicographical comparison (`'443' > '1000'`) versus validated numeric port ordering (CS2).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Lexicographical String Failure (Left Panel):** Shows `\"443\" > \"1000\"` evaluating to `True` because string comparison inspects characters left-to-right rather than integer value: the opening digit `'4'` (character code `52`) outranks `'1'` (character code `49`), which also breaks unparsed string sorting (`['10000', '443']`).\n- **Validated Integer Number Line (Right Panel):** Casting with `int(\"443\") < int(\"1000\")` produces true mathematical magnitude (`443 < 1000`), placing `22 --- 443 --- 1000 --- 8080 --- 10000` in exact ascending order along the green scale after whitespace stripping and `0 <= port <= 65535` range checks."
    },
    {
      "id": "les_c4_m1_l6",
      "title": "1.6 Loops, Comprehensions, Thresholds, and Module 1 Labs",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "Build filter-extract-count-threshold loops without duplicate alert fatigue, control while loops and comprehensions, examine NASA Mars Climate Orbiter unit lessons, and complete Practicals P1 and P2.",
      "learning_objectives": [
        "Implement for loops with continue, break, enumerate(), dict.items(), and bounded while loops",
        "Eliminate alert floods by comparing == THRESHOLD crossings and window-scoped alerted sets",
        "Choose clearly between comprehensions, lazy generator expressions, and explicit loops",
        "Explain the Mars Climate Orbiter unit-assumption failure (CS1) and complete Practicals P1 and P2"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-01-11",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l06_failure_counter_loop.png",
          "caption": "Figure 1.11 (C04-M01-F3): Filter-extract-count-threshold flowchart with continue skip and equality alert trigger.",
          "placement_hint": "After Section 3 (Worked Failed-Login Threshold Detector)"
        },
        {
          "id": "fig-04-01-12",
          "asset_path": "/assets/courses/cyber-04/c04_m01_l06_iteration_mechanics_comprehensions.png",
          "caption": "Figure 1.12: Eager list/dict comprehensions vs lazy O(1) streaming generators and while loop termination guards.",
          "placement_hint": "After Section 4 (while Loops and Comprehensions)"
        }
      ],
      "images": [
        {
          "id": "fig-04-01-11",
          "title": "Figure 1.11: Failed-Login Loop & Exact Threshold Trigger",
          "url": "/assets/courses/cyber-04/c04_m01_l06_failure_counter_loop.png",
          "caption": "Figure 1.11 (C04-M01-F3): Filter-extract-count-threshold flowchart with continue skip and equality alert trigger.",
          "alt": "Left-to-right flowchart starting with failures = {} and THRESHOLD = 3, filtering non-FAILED lines via continue, counting failures per username with dict.get(), and triggering one alert at == 3 while warning against >= 3 duplicate alerts"
        },
        {
          "id": "fig-04-01-12",
          "title": "Figure 1.12: Comprehensions, Streaming Generators & while Guards",
          "url": "/assets/courses/cyber-04/c04_m01_l06_iteration_mechanics_comprehensions.png",
          "caption": "Figure 1.12: Eager list/dict comprehensions vs lazy O(1) streaming generators and while loop termination guards.",
          "alt": "Three-panel comparison contrasting eager dictionary comprehension in RAM, lazy O(1) streaming generator expressions over giant logs, and a bounded while loop checking attempts < 3"
        }
      ],
      "content": "## 1. From Single-Event Checks to Repeatable Security Automation Loops\n\nManually checking one port or one log string teaches syntax, yet defensive operations require inspecting thousands or millions of telemetry lines consistently without human fatigue. Python combines iterator-driven `for` loops, explicit `while` termination loops, and compact comprehensions into the core defensive pattern used across the rest of Course 04: **filter non-matching noise $\\rightarrow$ extract structured attributes $\\rightarrow$ aggregate counts or unique indicators $\\rightarrow$ fire a controlled alert once a policy threshold is crossed.**\n\nJust as crucial as loop syntax is semantic integrity—understanding the physical units, thresholds, and duplicate-alert boundaries encoded in your loop, illustrated starkly by NASA's Mars Climate Orbiter failure.\n\n## 2. Core Objectives for This Lesson\n\n- **Iterator Loops:** Traverse iterables cleanly using `for`, `range()`, `enumerate(lines, start=1)`, `dict.items()`, `break`, `continue`, and loop-`else`.\n- **Threshold Algebra:** Prevent SOC alert fatigue by distinguishing exact threshold crossing (`== T`) and per-window alerted state sets from noisy `>= T` triggers.\n- **Controlled Repetition & Comprehensions:** Enforce changing state inside `while` loops and choose cleanly between list/dict/set comprehensions, generator expressions, and explicit loops.\n- **CS1 Boundary Integrity:** Apply lessons from the Mars Climate Orbiter unit confusion to timestamp zones and telemetry measurement units.\n- **End-to-End Verification:** Trace the full output of `m01_foundations.py` and build the P1/P2 labs from scratch.\n\n## 3. Mechanics of `for` Loops, `break`, and `continue`\n\nPython's `for` statement iterates directly over items of any iterable (strings, lists, tuples, dict views, files) without brittle index counters:\n\n- **`enumerate(lines, start=1)`:** Yields `(line_number, text)` pairs cleanly for security diagnostics.\n- **`zip(users, counts, strict=True)`:** Pairs items across parallel sequences; in Python 3.10+, `strict=True` raises `ValueError` rather than silently dropping trailing telemetry if sequences drift in length.\n- **`continue`:** Aborts the remainder of the current iteration and advances immediately to the next item (ideal for filtering out noisy benign records early).\n- **`break` and Nested Scope:** Terminates *only the single innermost loop* immediately; a trailing `else:` clause attached to a `for` loop runs strictly when the loop finishes cleanly **without** hitting `break`.\n\n### Execution-Tested Pattern: Failed-Login Threshold Detector (Section 8)\n\nSection 8 of `m01_foundations.py` implements the filter-extract-count-threshold pattern over a six-entry synthetic authentication stream:\n\n```python\nlog = [\n    \"FAILED user=asha\", \"OK user=ben\", \"FAILED user=asha\",\n    \"FAILED user=chen\", \"FAILED user=asha\", \"FAILED user=asha\",\n]\nTHRESHOLD = 3\nfailures = {}\nfor entry in log:\n    if not entry.startswith(\"FAILED\"):\n        continue                                  # skip successes\n    name = entry.split(\"user=\")[1]\n    failures[name] = failures.get(name, 0) + 1\n    if failures[name] == THRESHOLD:\n        print(f\"8. ALERT: {name} reached {THRESHOLD} failures\")\nprint(\"   totals:\", failures)\n```\n\n```terminal\n8. ALERT: asha reached 3 failures\n   totals: {'asha': 4, 'chen': 1}\n```\n\nFollow every line carefully: initializing `failures = {}` **before** the loop preserves totals across iterations (resetting inside the loop destroys prior state); `continue` prevents `\"OK user=ben\"` from entering counting logic; `.get(name, 0) + 1` avoids `KeyError` on unseen users; and `failures[name] == THRESHOLD` stops duplicate console alerts.\n\n### Quantitative Threshold Model: Avoiding SOC Alert Fatigue (Scenario S3)\n\nSuppose a user generates $k \\ge T$ consecutive failed logins before their session is blocked. Compare firing condition `failures[u] == T` against naive `failures[u] >= T`:\n\n:::math-steps\nStep 01: Alerts fired under exact threshold crossing (failures[u] == T)\n$$\\sum_{i=1}^{k} \\mathbb{I}(i = T) = 1 \\text{ alert}$$\nResult: Fires once at crossing event T\n\nStep 02: Duplicate alerts fired under unbounded inequality (failures[u] >= T)\n$$\\sum_{i=1}^{k} \\mathbb{I}(i \\ge T) = k - T + 1 \\text{ alerts}$$\nResult: Re-triggers on every failure after threshold T\n\nStep 03: Worked SOC burst example (T = 5, k = 45 brute-force attempts)\n$$45 - 5 + 1 = 41 \\text{ alerts (vs. } 1 \\text{ actionable alert needed)}$$\nResult: Track window state with alerted_in_window set and threshold crossings\n:::\n\nIn long-running daemons (Scenario S3), resetting window counters periodically and maintaining an `alerted_in_window` `set` guarantees one crisp alert per burst per window—a technique implemented completely in Module 7.\n\n![Figure 1.11: Failed-Login Loop & Exact Threshold Trigger](/assets/courses/cyber-04/c04_m01_l06_failure_counter_loop.png)\n\n*Figure 1.11 (C04-M01-F3): Filter-extract-count-threshold flowchart with continue skip and equality alert trigger.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **State Initialization (`Start before loop`):** Allocates an empty counter dictionary `failures = {}` and constant `THRESHOLD = 3` once before iterating over incoming log lines.\n- **Non-Failure Filtering (`Does line start with 'FAILED'?`):** Healthy entries on the `No` branch (`e.g. 'OK user=ben'`) trigger `continue`, skipping immediately to the next line without parsing unaffected events.\n- **Safe Extraction & Accumulation (`Extract & Count Safely`):** Matching `Yes` entries extract `name = entry.split('user=')[1]` and increment counts safely with `failures[name] = failures.get(name, 0) + 1`.\n- **Single-Shot Crossing (`Is failures[name] == 3 ?`):** Comparing `== 3` fires **1 clean `ALERT!`** strictly at the threshold crossing, whereas the warning highlights why `>= 3` produces duplicate alert noise on every extra failure.\n\n## 4. `while` Loops and Comprehensions\n\nA `while` loop repeats while a condition holds `True`; always ensure state progresses toward termination so scripts cannot hang indefinitely. In section 8 of `m01_foundations.py`, breaking at `attempts == 3` yields `while loop stopped after 3 attempts`.\n\nComprehensions construct derived lists, dictionaries, and sets concisely in section 9:\n\n```python\nover = {u: n for u, n in failures.items() if n >= THRESHOLD}\nprint(\"9.\", over, [p for p in sorted(services) if p < 1024])\n```\n\n```terminal\n9. {'asha': 4} [22, 443]\n```\n\nObserve three engineering rules for comprehensions:\n\n1. Use comprehensions strictly for clear one-stage filters/transforms; switch back to readable `for` loops when logic branches deeply. (Also recall that dictionary comprehensions overwrite duplicate keys, keeping the final seen value.)\n2. Never write `[print(x) for x in logs]` for side effects (it wastes RAM constructing a useless `[None, ...]` list).\n3. When reading huge logs, prefer lazy generator expressions `(x for x in file_handle)` over `[...]` so memory stays $O(1)$ rather than buffering every line in RAM.\n\n![Figure 1.12: Comprehensions, Streaming Generators & while Guards](/assets/courses/cyber-04/c04_m01_l06_iteration_mechanics_comprehensions.png)\n\n*Figure 1.12: Eager list/dict comprehensions vs lazy O(1) streaming generators and while loop termination guards.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Eager Comprehension (`[...] / {...}`):** Builds the complete filtered result `{u: n for u, n in failures.items() if n >= 3}` in RAM immediately (`{'asha': 4}`), while the quick tip warns never to abuse list comprehensions (`[print(x) for x in logs]`) solely for side effects.\n- **Lazy Generator (`(...)`):** Evaluates `(line for line in huge_log_file)` element by element (`line 1 -> line 2 -> ...`), keeping memory footprint flat at $O(1)$ even on multi-gigabyte logs.\n- **Safe `while` Loop Guard (`Safe while Loop Guard`):** Loops explicitly through `Check condition (attempts < 3)`, `Do work`, and `Update state (attempts += 1)` so the guard turns `False` and stops cleanly after `3` iterations without hanging.\n\n## 5. Case Study C04-M01-CS1: Mars Climate Orbiter (1999) — Valid Types, Wrong Meaning\n\n- **Historical Context:** NASA's Mars Climate Orbiter spacecraft was lost on September 23, 1999 during Mars orbital insertion.\n- **Root Technical Finding:** NASA's Mishap Investigation Board concluded that ground software (`\"SM_FORCES\"`) output small-thruster impulse trajectory modeling numbers in **English (imperial) pound-seconds** into an interchange file whose published interface specification demanded **metric Newton-seconds**. Receiving navigation modelers ingested valid floating-point numbers and assumed metric meaning.\n- **Contributing Engineering Factors:** Undetected errors in ground trajectory models, incomplete cross-team navigation communication, and insufficient end-to-end systems verification.\n- **Cybersecurity Parallel (Scenario S2):** In security engineering, identical errors occur when averaging response times where Tool A emits seconds and Tool B emits milliseconds—every value has valid Python type `float`, yet combining them corrupts latency baselines—or correlating local-timezone firewall logs against UTC cloud telemetry without explicit boundary conversion.\n- **Defensive Coding Mandate:** Encode units directly inside variable names (`bytes_sent`, `duration_ms`, `timestamp_utc`), convert to canonical units at component boundaries, prefer typed quantities (`datetime.timedelta`), and validate end-to-end against realistic test fixtures.\n\n## 6. Complete Foundations Lab Walkthrough (`m01_foundations.py`)\n\nCopy `m01_foundations.py` into an isolated practice directory and execute it directly to observe all nine integrated sections:\n\n```bash\npython m01_foundations.py\n```\n\n```terminal\n1. str int float bool NoneType\n2. 2026-11-07 10:02:11 | FAILED | True\n    web-01:443 load=75% public=True\n3. [22, 443, 8080] count: 3 first: 22 last: 8080 slice: [443, 8080]\n4. ssh unknown [22, 443, 3389, 8080]\n    port    22 -> ssh\n    port   443 -> https\n    port  8080 -> http-alt\n    port  3389 -> rdp\n5. 4 seen, 3 unique; not allow-listed: ['203.0.113.7']\n6. asha FAILED\n7. [(22, 'admin'), (80, 'well-known'), (3389, 'admin'), (8080, 'high')]\n8. ALERT: asha reached 3 failures\n   totals: {'asha': 4, 'chen': 1}\n   while loop stopped after 3 attempts\n9. {'asha': 4} [22, 443]\n```\n\nNotice how practicing **prediction-then-verification** builds durable intuition: before editing a line, write your predicted console line on paper, run the script, and resolve any gap immediately.\n\n## 7. Guided Practicals (C04-M01-P1 & C04-M01-P2)\n\nComplete both hands-on exercises below in a local practice directory using synthetic sample logs so you internalize execution behavior before advancing to Module 2.\n\n### Practical C04-M01-P1: Run, Predict, and Modify the Foundations Demo\n\n- **Objective & Scope:** Build a precise mental execution model using synthetic local data on your own workstation (`c04-practice/m01_foundations.py`).\n- **Tasks:**\n  1. Execute `python m01_foundations.py` and match all nine sections against the verified output above.\n  2. Predict the output *before* editing and running four targeted changes individually: (a) `THRESHOLD = 2`, (b) extracting `ADMIN_PORTS = {22, 3389}` and testing `p in ADMIN_PORTS`, (c) adding `\"203.0.113.7\"` to `allow` (making `unique - allow` empty `[]`), and (d) appending `\"FAILED user=ben\"` three times.\n  3. Add a new **Section 10** building a dict of well-known services (`port < 1024`) using a dict comprehension: `{p: name for p, name in services.items() if p < 1024}`.\n  4. Deliberately reproduce `TypeError`, `ValueError`, `KeyError`, `IndexError`, and `IndentationError` inside the REPL to read every diagnostic line bottom-up.\n\n### Practical C04-M01-P2: Build a Login-Failure Counter from Scratch\n\n- **Objective & Scope:** Create `failures.py` processing synthetic tuple telemetry:\n\n```python\nevents = [\n    (\"asha\", \"10.0.0.5\", \"FAIL\"),\n    (\"asha\", \"10.0.0.5\", \"FAIL\"),\n    (\"ben\", \"10.0.0.9\", \"OK\"),\n    (\"asha\", \"203.0.113.7\", \"FAIL\"),\n    (\"chen\", \"198.51.100.4\", \"FAIL\"),\n    (\"asha\", \"203.0.113.7\", \"OK\"),\n]\n```\n\n- **Requirements:** Count failures per user in a `dict`, collect unique failing source IPs **per user** in a `dict` of `set`s (avoiding cross-user false positives on shared NAT IPs!), alert on users with $\\ge 3$ failures, flag any `OK` login whose `src_ip` also saw a prior `FAIL` for that user (guessing indicator: `asha` on `203.0.113.7`), and align columns with f-strings.\n\n## 8. Module 1 Revision & Common Pitfalls\n\nReview the core principles, high-frequency failure modes, and authoritative standards references below before taking the Module 1 assessment.\n\n### Core Principles & Common Mistakes\n\n- **Input Boundary Rule:** Text in $\\rightarrow$ explicit conversion + range check $\\rightarrow$ clean internal structure.\n- **Avoid Five Classic Mistakes:** Comparing string ports alphabetically (`\"443\" > \"1000\"`), scanning a massive threat `list` linearly instead of a `set`, expecting `b = a` to clone a `list`, flooding alerts with unbounded `>= THRESHOLD`, and mixing tabs with spaces.\n\n### Self-Check Revision Exercises\n\n1. Contrast `list` vs. `set` lookup scaling and explain why `dict.fromkeys()` differs from `set()` when deduplicating.\n2. Write a dictionary comprehension selecting users from `failures` strictly exceeding 2 failures.\n3. Explain physically why `0.1 + 0.2 != 0.3` in binary64 floats and demonstrate `math.isclose()`.\n4. Contrast `x is None` vs. `x == None` and explain why CS2 requires explicit integer bounds validation."
    }
  ]
};
