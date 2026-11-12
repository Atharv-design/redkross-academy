/**
 * Course 04: Python for Cybersecurity — Module 1 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module1QuestionBank = [
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
    "id": "q_c4_m1_015",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What exception does Python raise when executing int('abc') on malformed log input?",
    "options": [
      "KeyError",
      "ValueError",
      "IndexError",
      "TypeError"
    ],
    "correct": 1,
    "explanation": "int() received an argument of the right type (str), so it raises ValueError ('invalid literal for int() with base 10') rather than TypeError."
  },
  {
    "id": "q_c4_m1_016",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What does [bool(x) for x in (0, '', [], None, '0', [0])] evaluate to in Python?",
    "options": [
      "[False, False, False, False, False, False]",
      "[False, True, False, False, False, True]",
      "[True, False, False, None, True, True]",
      "[False, False, False, False, True, True]"
    ],
    "correct": 3,
    "explanation": "Empty containers ('', []), numeric zero (0), and None are falsy, whereas non-empty strings like '0' and non-empty lists like [0] evaluate to True."
  },
  {
    "id": "q_c4_m1_017",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "By PEP 8 naming conventions, how should a fixed security threshold such as THRESHOLD = 3 be formatted versus a mutable counter variable?",
    "options": [
      "Constants use ALL_CAPS_WITH_UNDERSCORES; ordinary variables use lower_case_with_underscores",
      "Constants use camelCase; ordinary variables use PascalCase",
      "Constants must begin with an underscore; variables must end with an integer",
      "Python enforces read-only memory protection automatically on capitalized names"
    ],
    "correct": 0,
    "explanation": "PEP 8 signals programmer intent via naming: uppercase constants (THRESHOLD = 3) warn maintainers not to reassign values, though Python does not enforce runtime immutability on the name."
  },
  {
    "id": "q_c4_m1_018",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "Which Python arithmetic operator always produces a float result even when both operands divide evenly (for example, 8 / 2)?",
    "options": [
      "// (floor division)",
      "/ (true division)",
      "% (modulo)",
      "** (exponentiation)"
    ],
    "correct": 1,
    "explanation": "In Python 3, single-slash / performs true division and always returns a float (8 / 2 -> 4.0), whereas // performs floor division."
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
  },
  {
    "id": "q_c4_m1_025",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Given s = 'FAILED', what does s[::-1] return?",
    "options": [
      "'DELIAF'",
      "'F'",
      "'FAILE'",
      "IndexError because step cannot be negative"
    ],
    "correct": 0,
    "explanation": "Slicing with a step of -1 traverses the string from end to start, returning the reversed string 'DELIAF' without modifying s."
  },
  {
    "id": "q_c4_m1_026",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Given line = '2026-11-07 10:02:11 FAILED login user=asha src=10.20.4.17', what does line.split()[2] evaluate to?",
    "options": [
      "'2026-11-07'",
      "'FAILED'",
      "'10:02:11'",
      "'user=asha'"
    ],
    "correct": 1,
    "explanation": "Calling .split() with no argument splits on arbitrary runs of whitespace: index 0 is date, index 1 is time, and index 2 is 'FAILED'."
  },
  {
    "id": "q_c4_m1_027",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Why should Windows paths or regular expressions such as r'C:\\temp\\notes' be written using Python raw string literals (r'...')?",
    "options": [
      "Raw strings run faster because Python skips UTF-8 encoding",
      "Raw strings prevent any TypeError when adding ints",
      "Raw strings treat backslashes literally instead of interpreting sequences like \\t as a tab or \\n as a newline",
      "Standard quotes reject colon characters like 'C:'"
    ],
    "correct": 2,
    "explanation": "In a normal string literal 'C:\\temp\\notes', \\t becomes a tab character and \\n becomes a newline; an r'...' prefix keeps backslashes literal."
  },
  {
    "id": "q_c4_m1_028",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "In m01_foundations.py, what does the expression f'{hostname}:{port} load={load:.0%} public={is_public}' produce when hostname='web-01', port=443, load=0.75, is_public=True?",
    "options": [
      "'web-01:443 load=0.75% public=True'",
      "TypeError because port is an int",
      "'web-01:443 load=75.00% public=1'",
      "'web-01:443 load=75% public=True'"
    ],
    "correct": 3,
    "explanation": "The :.0% format specification multiplies a decimal fraction (0.75) by 100 and formats it with zero decimal places followed by '%'."
  },
  {
    "id": "q_c4_m1_029",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What happens if an analyst tries to normalize the first character of log_tag = 'failed' directly via log_tag[0] = 'F'?",
    "options": [
      "Python raises a TypeError because str objects are immutable",
      "Nothing changes and Python emits a warning",
      "log_tag becomes 'Failed'",
      "Only the byte representation changes in memory"
    ],
    "correct": 0,
    "explanation": "Strings in Python cannot be modified in place; methods like .upper() or .replace() return brand-new str objects instead of mutating the original."
  },
  {
    "id": "q_c4_m1_030",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What does the f-string alignment format f'port {p:>5}' in section 4 of m01_foundations.py accomplish when printing port numbers like 22 and 8080?",
    "options": [
      "Left-aligns each number and pads trailing zeros",
      "Right-aligns the formatted value inside a 5-character wide column",
      "Limits integers to values below 5",
      "Converts numbers into 5-bit binary"
    ],
    "correct": 1,
    "explanation": "The :>5 format specifier right-aligns values in a fixed 5-character field so columns of ports (22, 443, 8080) line up cleanly in terminal reports."
  },
  {
    "id": "q_c4_m1_031",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Why is constructing SQL queries, shell commands, or HTML alert emails by string concatenation or f-strings with untrusted input strictly forbidden in secure coding?",
    "options": [
      "f-strings lose Unicode characters above code point 127",
      "String concatenation causes ValueError on whitespace",
      "Untrusted characters inside input strings can alter command, query, or markup structure (injection vulnerabilities)",
      "Python's string buffer overflows past 256 characters"
    ],
    "correct": 2,
    "explanation": "Treating untrusted text as executable syntax blurs the code/data boundary, enabling OS command injection (CWE-78), SQL injection (CWE-89), and XSS."
  },
  {
    "id": "q_c4_m1_032",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "How does s.partition('=') behave differently from s.split('=') when parsing key=value tokens that might contain another '=' inside the value (for example token='user=a=b')?",
    "options": [
      "partition('=') removes the key and returns only the value",
      "split('=') returns a tuple while partition('=') returns a dictionary",
      "partition('=') raises KeyError if '=' appears twice",
      "split('=') without a maxsplit divides every '=', whereas partition('=') always splits only on the first '=' and returns a 3-tuple (key, '=', value)"
    ],
    "correct": 3,
    "explanation": "s.partition('=') splits strictly at the first delimiter into a predictable 3-tuple (before, sep, after), preserving trailing '=' signs inside Base64 tokens or values."
  },
  {
    "id": "q_c4_m1_033",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Notice the difference between line.strip() and line.replace(' ', '') when sanitizing a raw log line before writing it to a parser. Which behavior does line.strip() perform?",
    "options": [
      "Removes only leading and trailing whitespace (spaces, tabs, newlines), preserving internal word spacing",
      "Deletes every space anywhere inside the string",
      "Escapes embedded quotes with backslashes",
      "Converts internal tabs into commas"
    ],
    "correct": 0,
    "explanation": "strip() trims whitespace exclusively from the start and end of a string (ideal for stripping trailing '\\n' from log lines without breaking space-delimited columns)."
  },
  {
    "id": "q_c4_m1_034",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "A script formats user_line = f'user={user_name}' where user_name was not stripped, leaving 'asha\\n'. What happens if downstream code later checks exact membership or logs the string?",
    "options": [
      "Python strips '\\n' automatically inside f-strings",
      "It fails exact comparisons against 'asha' and injects a line break into plain-text logs",
      "SyntaxError occurs at the brace boundary",
      "'asha\\n' raises UnicodeError in Python 3"
    ],
    "correct": 1,
    "explanation": "Trailing newlines remain embedded inside strings, causing key mismatches ('asha\\n' != 'asha') and forging extra lines in plain-text log output."
  },
  {
    "id": "q_c4_m1_035",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Given tag = 'FAILED', what happens when evaluating tag[10] versus tag[10:20] in Python?",
    "options": [
      "Both raise IndexError",
      "Both return an empty string ''",
      "tag[10] raises IndexError, whereas slicing tag[10:20] safely returns ''",
      "tag[10] returns None while tag[10:20] raises ValueError"
    ],
    "correct": 2,
    "explanation": "Direct single-element indexing beyond length raises IndexError, whereas out-of-bounds slices clamp silently and return an empty string ''."
  },
  {
    "id": "q_c4_m1_036",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Which built-in Python structure is best suited for checking whether each of 2 million incoming proxy IP addresses appears in a threat feed of 50,000 bad IPs?",
    "options": [
      "A tuple, because immutability speeds up scans",
      "A sorted list traversed inside a nested for loop",
      "A concatenated string searched with 'in'",
      "A set, because hash-based membership tests (x in a_set) run in near-constant average time"
    ],
    "correct": 3,
    "explanation": "Scanning a 50,000-item list per IP produces roughly 10^11 comparisons, whereas converting the feed to a set delivers O(1) average lookup via hash table."
  },
  {
    "id": "q_c4_m1_037",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Given services = {22: 'ssh', 443: 'https', 8080: 'http-alt'}, what does services.get(25, 'unknown') return?",
    "options": [
      "'unknown'",
      "None",
      "KeyError",
      "25"
    ],
    "correct": 0,
    "explanation": "Unlike bracket access services[25], dict.get(key, default) safely returns the caller-supplied fallback ('unknown') when the key is absent."
  },
  {
    "id": "q_c4_m1_038",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What does the set difference expression seen_ips - allow return when seen_ips and allow are Python sets?",
    "options": [
      "IPs present in both seen_ips and allow",
      "IPs present in seen_ips that are NOT in allow",
      "All unique IPs across seen_ips and allow combined",
      "IPs present in allow but missing from seen_ips"
    ],
    "correct": 1,
    "explanation": "The - operator on sets computes relative complement (items in the left operand absent from the right operand), ideal for spotting non-allow-listed hosts."
  },
  {
    "id": "q_c4_m1_039",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Given event = ('2026-11-07T10:02:11', 'asha', 'FAILED'), what happens if you execute timestamp, user, result = event?",
    "options": [
      "Raises TypeError because tuples are immutable",
      "Assigns the entire tuple only to timestamp and None to the rest",
      "Unpacks all three positional elements into the three separate variables",
      "Converts event into a list automatically"
    ],
    "correct": 2,
    "explanation": "Tuple unpacking binds each element in order to the corresponding variable name when the counts match on both sides."
  },
  {
    "id": "q_c4_m1_040",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "After executing open_ports = [22, 80, 443], open_ports.append(8080), and open_ports.remove(80), what does open_ports[1:] evaluate to?",
    "options": [
      "[22, 443]",
      "[8080]",
      "[80, 443, 8080]",
      "[443, 8080]"
    ],
    "correct": 3,
    "explanation": "append(8080) and remove(80) leave open_ports = [22, 443, 8080]; slicing from index 1 onward produces [443, 8080]."
  },
  {
    "id": "q_c4_m1_041",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Which Python type CANNOT be used directly as a dictionary key or inside a set?",
    "options": [
      "list like ['10.0.0.5', 443]",
      "str",
      "int",
      "tuple of strings and ints like ('10.0.0.5', 443)"
    ],
    "correct": 0,
    "explanation": "Dictionary keys and set elements must be hashable (immutable); mutable lists raise TypeError: unhashable type: 'list'."
  },
  {
    "id": "q_c4_m1_042",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "After a = [22, 443, 8080] and b = a, calling a.append(1) causes which outcome?",
    "options": [
      "Only a changes; b stays [22, 443, 8080]",
      "Both a and b show [22, 443, 8080, 1] because both names point to the same mutable list",
      "Python automatically creates a deep copy for b before mutating a",
      "RuntimeError: aliased list modified"
    ],
    "correct": 1,
    "explanation": "Assignment binds references rather than copying containers; mutating the underlying list through either name is visible through both a and b."
  },
  {
    "id": "q_c4_m1_043",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Why does [1, 2] == [1, 2] evaluate to True while [1, 2] is [1, 2] evaluates to False?",
    "options": [
      "== compares list lengths only",
      "'is' only works on integers and raises TypeError on lists",
      "== compares contents/values, whereas 'is' compares object identity (whether both expressions point to the exact same object in memory)",
      "Two separate list literals automatically alias the same object in CPython"
    ],
    "correct": 2,
    "explanation": "Each [1, 2] literal constructs a distinct list object in memory, so 'is' is False while value comparison '==' is True; reserve 'is' for None singletons."
  },
  {
    "id": "q_c4_m1_044",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Which set operation answers the threat-hunting query: 'Return hosts present in EITHER firewall_blocks OR edr_alerts, but NOT in both'?",
    "options": [
      "firewall_blocks & edr_alerts",
      "firewall_blocks | edr_alerts",
      "firewall_blocks - edr_alerts",
      "firewall_blocks ^ edr_alerts"
    ],
    "correct": 3,
    "explanation": "Symmetric difference (^) returns elements appearing in exactly one of the two sets, highlighting discrepancies between two security telemetry sensors."
  },
  {
    "id": "q_c4_m1_045",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "When building a shallow copy with b = a.copy() where a = [[22, 443], [80]], what happens if someone modifies a[0].append(3389)?",
    "options": [
      "b[0] also shows [22, 443, 3389] because a.copy() only copies the outer list of references",
      "b remains unaffected because copy() recursively clones nested lists",
      "IndexError is raised on nested mutation",
      "Python converts the inner lists into immutable tuples"
    ],
    "correct": 0,
    "explanation": ".copy() creates a new outer list referencing the same inner mutable objects; deep independence requires copy.deepcopy() when containers are nested."
  },
  {
    "id": "q_c4_m1_046",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Starting from Python 3.7+, what iteration order does looping over services.items() guarantee when services = {22: 'ssh', 443: 'https', 8080: 'http-alt'} followed by services[3389] = 'rdp'?",
    "options": [
      "Random hash-bucket order on each execution",
      "Exact insertion order: 22, 443, 8080, 3389",
      "Ascending numeric key order: 22, 443, 3389, 8080",
      "Alphabetical order of the dictionary values"
    ],
    "correct": 1,
    "explanation": "Standard Python dictionaries preserve key insertion order as part of the language specification (verified in m01_foundations.py section 4 output: 22, 443, 8080, 3389)."
  },
  {
    "id": "q_c4_m1_047",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Contrast lst.append([80, 443]) with lst.extend([80, 443]) when lst starts as [22].",
    "options": [
      "Both produce [22, 80, 443]",
      "extend replaces 22 while append preserves it",
      "append nests the list as one element ([22, [80, 443]]), whereas extend appends each item individually ([22, 80, 443])",
      "append raises TypeError on lists"
    ],
    "correct": 2,
    "explanation": "list.append(x) adds x as a single item regardless of type, whereas list.extend(iterable) iterates over x and appends each element."
  },
  {
    "id": "q_c4_m1_048",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "How do you create a genuine empty set and a genuine 1-element tuple in Python without falling into syntax traps?",
    "options": [
      "{} creates an empty set; (22) creates a 1-element tuple",
      "[] creates a set; {} creates a tuple",
      "set([]) is a syntax error; tuple(22) works on plain integers",
      "set() creates an empty set; (22,) with a trailing comma creates a 1-element tuple"
    ],
    "correct": 3,
    "explanation": "{} creates an empty dict rather than a set, so set() is required; (22) is just parenthesized int 22 without the trailing comma (22,)."
  },
  {
    "id": "q_c4_m1_049",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "In m01_foundations.py section 7, classify(p) checks: if p in (22, 3389): return 'admin'; elif p < 1024: return 'well-known'; else: return 'high'. What does classify(22) return?",
    "options": [
      "'admin' because conditions run top-to-bottom and return on the first matching branch",
      "'well-known' because 22 < 1024",
      "'high' because else always executes",
      "Both 'admin' and 'well-known'"
    ],
    "correct": 0,
    "explanation": "if/elif/else chains evaluate branches strictly top-to-bottom and short-circuit after executing the first True branch; placing p < 1024 first would shadow port 22."
  },
  {
    "id": "q_c4_m1_050",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Why does writing 'if port = 443:' fail immediately before runtime in Python?",
    "options": [
      "Port numbers cannot equal 443 in conditions",
      "= is assignment, not equality comparison (==), so Python raises a SyntaxError",
      "443 requires quotes inside an if statement",
      "if statements forbid spaces around operators"
    ],
    "correct": 1,
    "explanation": "Unlike C, Python rejects plain assignment '=' inside an if condition at parse time with SyntaxError, catching accidental '=' vs '==' bugs early."
  },
  {
    "id": "q_c4_m1_051",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "In Case Study C04-M01-CS2 (Ports sorted as text), why did the analyst's script flag port '443' as being above '1000'?",
    "options": [
      "CSV exports multiply HTTP ports by 10",
      "The script cast '1000' to float while leaving '443' as int",
      "String comparisons compare Unicode code points left-to-right alphabetically, where '4' > '1'",
      "Python's > operator reverses numbers above 400"
    ],
    "correct": 2,
    "explanation": "Alphabetical/lexicographical comparison checks characters left-to-right: since character '4' (code point 52) exceeds '1' (code point 49), '443' > '1000' is True."
  },
  {
    "id": "q_c4_m1_052",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "What does the Python chained comparison 1 <= port <= 1023 evaluate?",
    "options": [
      "Compares (1 <= port) True/False boolean against 1023",
      "Converts port to a range object",
      "Raises SyntaxError outside mathematical expressions",
      "Tests whether port is both at least 1 and at most 1023 cleanly as (1 <= port) and (port <= 1023)"
    ],
    "correct": 3,
    "explanation": "Python natively chains comparisons so '1 <= port <= 1023' avoids C-style boolean coercion bugs while evaluating port only once."
  },
  {
    "id": "q_c4_m1_053",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Which Python 3.10+ control-flow construct supports inspecting both the value and structural shape of event records (replacing long if/elif event-type dispatchers)?",
    "options": [
      "match / case",
      "select / when",
      "switch / break",
      "dispatch / target"
    ],
    "correct": 0,
    "explanation": "Python 3.10 introduced structural pattern matching via match/case to destructure and branch on event shapes and literal tags cleanly."
  },
  {
    "id": "q_c4_m1_054",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Consider 'if user in allow_set and is_verified(user):'. Because 'and' short-circuits in Python, what happens when user is NOT in allow_set?",
    "options": [
      "is_verified(user) runs first anyway, and its return value is ignored",
      "Evaluation stops after 'user in allow_set' returns False, so is_verified(user) is never called",
      "Python evaluates both sides in parallel threads",
      "Python raises ValueError if the right operand is skipped"
    ],
    "correct": 1,
    "explanation": "Short-circuit evaluation stops immediately once the overall Boolean outcome is guaranteed (False on left of 'and', True on left of 'or'), enabling safe guards like 'key in d and d[key] > 0'."
  },
  {
    "id": "q_c4_m1_055",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Why does testing 'if 80 < 1000 == True:' in Python evaluate to False rather than True?",
    "options": [
      "1000 == True is evaluated first as a string",
      "Integers cannot be compared inside chained expressions",
      "Python chains all comparison operators: 80 < 1000 == True expands to (80 < 1000) and (1000 == True), and 1000 != 1",
      "Python evaluates comparisons strictly right-to-left"
    ],
    "correct": 2,
    "explanation": "Chaining applies to '==' alongside '<', expanding the condition to (80 < 1000) and (1000 == True); since 1000 != 1, the right half is False."
  },
  {
    "id": "q_c4_m1_056",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "If an analyst fixes CS2 by converting CSV port strings with int(raw_port) before checking > 1000, what additional validation prevents silent acceptance of corrupted data like -1 or 99999?",
    "options": [
      "Sorting the port list alphabetically afterward",
      "Checking type(port) is float",
      "Wrapping int(raw_port) in str()",
      "Validating that 0 <= port <= 65535 (or 1 <= port <= 65535 for active listening ports)"
    ],
    "correct": 3,
    "explanation": "Domain validation enforces TCP/UDP 16-bit header bounds (0 to 65,535), ensuring malformed negative or oversized integers do not corrupt reports."
  },
  {
    "id": "q_c4_m1_057",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "When evaluating 'priority = port_label or \"unknown\"' where port_label = '', what value does Python assign to priority and why?",
    "options": [
      "'unknown', because Python's logical 'or' returns the first truthy operand (or the last operand if both are falsy) without coercing to bool",
      "True, because 'or' always coerces to bool",
      "'', because '' is on the left",
      "TypeError because strings are not booleans"
    ],
    "correct": 0,
    "explanation": "Python's 'and'/'or' operators return one of the actual operand values rather than strictly True/False; since '' is falsy, 'or' evaluates and returns 'unknown'."
  },
  {
    "id": "q_c4_m1_058",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Wait carefully before reordering branches in classify(p): what bug occurs if an engineer swaps the first two branches to check 'if p < 1024: return \"well-known\"' BEFORE 'elif p in (22, 3389): return \"admin\"'?",
    "options": [
      "Port 3389 becomes 'well-known'",
      "Port 22 is silently misclassified as 'well-known' instead of 'admin' because 22 < 1024 matches first",
      "Both ports raise UnreachableBranchError",
      "Port 80 becomes 'admin'"
    ],
    "correct": 1,
    "explanation": "22 satisfies p < 1024, so putting the broader well-known check before the specific admin-port set shadows port 22 completely (only 3389 would still reach admin)."
  },
  {
    "id": "q_c4_m1_059",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What is the exact role of 'continue' inside section 8 of m01_foundations.py when the script encounters 'OK user=ben'?",
    "options": [
      "Exits the for loop immediately and prints totals",
      "Deletes 'OK user=ben' from the log list in memory",
      "Skips the remaining statements in the current iteration and advances to the next log entry",
      "Re-runs the same log entry a second time"
    ],
    "correct": 2,
    "explanation": "'continue' bypasses extraction and counting for non-FAILED entries and immediately starts the next iteration of the for loop."
  },
  {
    "id": "q_c4_m1_060",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "In m01_foundations.py section 8, why did the author write 'if failures[name] == THRESHOLD:' instead of 'if failures[name] >= THRESHOLD:'?",
    "options": [
      ">= is illegal on dictionary values",
      "== resets failures[name] back to 0 automatically",
      ">= evaluates strings alphabetically",
      "== fires the alert exactly once when failures cross THRESHOLD (3), whereas >= would emit duplicate alerts on the 4th, 5th, and every subsequent failure"
    ],
    "correct": 3,
    "explanation": "Because asha accumulated 4 failures, == 3 fired one alert on the 3rd failure instead of flooding the console on both failure #3 and failure #4."
  },
  {
    "id": "q_c4_m1_061",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Which built-in wrapper yields both a 1-based line number and the text of each line while iterating over log_lines?",
    "options": [
      "enumerate(log_lines, start=1)",
      "range(log_lines)",
      "items(log_lines, 1)",
      "indexed(log_lines)"
    ],
    "correct": 0,
    "explanation": "enumerate(iterable, start=1) produces (index, item) pairs starting at 1, making line-numbered log diagnostics concise and readable."
  },
  {
    "id": "q_c4_m1_062",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What does the dictionary comprehension {u: n for u, n in failures.items() if n >= 3} return given totals = {'asha': 4, 'chen': 1}?",
    "options": [
      "['asha']",
      "{'asha': 4}",
      "{'asha': 3, 'chen': 1}",
      "{'chen': 1}"
    ],
    "correct": 1,
    "explanation": "The dict comprehension iterates over (user, count) pairs, keeps only entries satisfying n >= 3, and constructs {'asha': 4}."
  },
  {
    "id": "q_c4_m1_063",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What caused NASA's Mars Climate Orbiter mishap (Case Study C04-M01-CS1, September 1999) according to NASA's Mishap Investigation Board?",
    "options": [
      "A SyntaxError inside Python telemetry parsers",
      "Memory exhaustion from an infinite while loop",
      "Ground software ('SM_FORCES') produced thruster data in English (imperial) units while the receiving file interface assumed metric units",
      "Division by zero in the spacecraft clock"
    ],
    "correct": 2,
    "explanation": "Both systems used valid floating-point numbers of the right data type, but mismatched assumed units (imperial vs metric) between software components."
  },
  {
    "id": "q_c4_m1_064",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "In a SIEM correlation pipeline, which bug is the direct cybersecurity equivalent of the Mars Climate Orbiter unit mismatch?",
    "options": [
      "Using lowercase variable names instead of camelCase",
      "Putting # comments above a function definition",
      "Using a tuple instead of a list for an event record",
      "Combining durations reported in milliseconds from one sensor with seconds from another, or mixing local timestamps with UTC without boundary conversion"
    ],
    "correct": 3,
    "explanation": "Mixing unannotated time units (ms vs s) or time zones (local vs UTC) produces valid integers/timestamps with corrupted meaning, breaking correlation timelines."
  },
  {
    "id": "q_c4_m1_065",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Trace section 8 of m01_foundations.py: if THRESHOLD is changed from 3 to 2 (as asked in Practical P1) on the exact same log list, how many ALERT lines print for 'asha'?",
    "options": [
      "One ALERT line when 'asha' hits failure #2",
      "Zero, because 'asha' has 4 failures",
      "Two ALERT lines (at failures #2 and #4)",
      "Three ALERT lines (at failures #2, #3, and #4)"
    ],
    "correct": 0,
    "explanation": "With equality testing 'failures[name] == THRESHOLD', the condition matches strictly on the 2nd failure for 'asha' and not on failures 3 or 4."
  },
  {
    "id": "q_c4_m1_066",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Consider Scenario S3: 'if failures[user] >= 5: send_alert(user)' floods analysts with dozens of identical alerts during a brute-force attack. Why is changing >= to == insufficient in a multi-day persistent daemon?",
    "options": [
      "Dictionaries cannot store numbers above 5",
      "Once a window resets or counts roll over without per-window alerted state, tracking an alerted_users set (plus time-window reset) prevents duplicate alerts within each window",
      "== only works inside while loops",
      "Python forbids equality comparisons on dictionary lookups"
    ],
    "correct": 1,
    "explanation": "Production alert rules combine threshold detection with an alerted-entity state set and time-window resets so each burst triggers once without permanently muting future incidents."
  },
  {
    "id": "q_c4_m1_067",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Look closely at: [p for p in sorted(services) if p < 1024] when services = {22: 'ssh', 443: 'https', 8080: 'http-alt', 3389: 'rdp'}. What does sorted(services) return to the comprehension?",
    "options": [
      "A sorted list of (key, value) tuples",
      "A sorted list of the service name strings",
      "A sorted list of the dictionary's keys: [22, 443, 3389, 8080]",
      "TypeError because dictionaries have no order"
    ],
    "correct": 2,
    "explanation": "Iterating over a dict directly yields its keys; sorted(services) sorts those integer keys into [22, 443, 3389, 8080], which the comprehension filters down to [22, 443]."
  },
  {
    "id": "q_c4_m1_068",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "In Practical P2, an analyst flags users who had BOTH a failure and a subsequent success from the same source IP (indicating a possible password guess). Which pair of data structures tracks this cleanly in one loop pass?",
    "options": [
      "A single flat string of all log lines",
      "A single boolean variable named suspicious",
      "Two parallel lists compared by list index",
      "Dicts mapping user (or IP) to counts plus dict mapping user -> set of failed source IPs, tested against each OK event's source IP"
    ],
    "correct": 3,
    "explanation": "Tracking failed_ips_by_user (dict[str, set[str]]) lets every 'OK' event check O(1) whether event.src_ip in failed_ips_by_user.get(user, set())."
  },
  {
    "id": "q_c4_m1_069",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "Which command verifies the exact Python interpreter version accessible on the shell PATH?",
    "options": [
      "python --version",
      "python --inspect",
      "pip --runtime",
      "py --compile"
    ],
    "correct": 0,
    "explanation": "Running python --version prints the major, minor, and patch version (e.g., Python 3.12.4) of the active interpreter."
  },
  {
    "id": "q_c4_m1_070",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "What is the canonical file extension required for saved Python source modules executed via python script_name?",
    "options": [
      ".pyc",
      ".py",
      ".pyt",
      ".bin"
    ],
    "correct": 1,
    "explanation": "Python source files carry the .py extension (e.g., m01_foundations.py), whereas .pyc stores cached compiled bytecode."
  },
  {
    "id": "q_c4_m1_071",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "When Python reports 'SyntaxError: invalid syntax' on line 12 but line 12 looks completely valid, where does the root syntax mistake often sit?",
    "options": [
      "Inside an imported module only",
      "At the very last line of the file",
      "On line 11, such as an unclosed parenthesis, bracket, or string quote",
      "Inside a comment beginning with #"
    ],
    "correct": 2,
    "explanation": "An unclosed '(' or quote on line 11 causes the parser to reach line 12 expecting a closing delimiter, reporting the unexpected token on line 12."
  },
  {
    "id": "q_c4_m1_072",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "How many spaces per indentation level does PEP 8 standardize for Python source files?",
    "options": [
      "2 spaces",
      "8 spaces",
      "1 hardware tab",
      "4 spaces"
    ],
    "correct": 3,
    "explanation": "PEP 8 mandates 4 spaces per indentation level and discourages tabs in new code."
  },
  {
    "id": "q_c4_m1_073",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "Why does Python behave differently from C/Go during startup with respect to explicit compilation commands?",
    "options": [
      "Python executes statements line-by-line via an interpreter runtime without requiring the programmer to manage a separate compiler/linker step",
      "Python scripts cannot execute unless compiled to native ELF/PE machine code first",
      "Python requires a Makefile before importing sys",
      "Python sends source code to an external cloud compiler"
    ],
    "correct": 0,
    "explanation": "Python handles source parsing and bytecode execution transparently inside the python runtime, eliminating manual build-step management during rapid incident scripting."
  },
  {
    "id": "q_c4_m1_074",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "Suppose a security script contains a multi-line header comment using '''...''' inside an indented function WITHOUT assigning it to a variable, followed by an unaligned line. What happens?",
    "options": [
      "Python treats '''...''' as whitespace regardless of indentation",
      "Multi-line triple-quoted literals are still string expressions and MUST match the surrounding block indentation or trigger IndentationError",
      "The string becomes a global # comment",
      "Only the first line of the string requires indentation"
    ],
    "correct": 1,
    "explanation": "Unlike # comments, '''...''' is a syntactic string expression literal, so its opening line must obey the enclosing block's indentation rules."
  },
  {
    "id": "q_c4_m1_075",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "What occurs if an analyst copies code from a web tutorial where a smart-quote character (‘ or ”) replaced ASCII single or double quotes (' or \")?",
    "options": [
      "Python converts typographic quotes into ASCII strings automatically",
      "Python turns the token into a variable name",
      "Python raises SyntaxError: invalid character when tokenizing the string literal",
      "Only f-strings reject typographic quotes"
    ],
    "correct": 2,
    "explanation": "Only ASCII quotes (' and \") delimit strings in Python; typographic curly quotes trigger a SyntaxError at parse time."
  },
  {
    "id": "q_c4_m1_076",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What is the result and resulting type of evaluating 9 // 2 and 9 % 2 respectively in Python?",
    "options": [
      "4.5 (float) and 1 (int)",
      "5 (int) and 1 (int)",
      "4 (int) and 0.5 (float)",
      "4 (int) and 1 (int)"
    ],
    "correct": 3,
    "explanation": "Floor division (//) returns the integer quotient 4 and modulo (%) returns the remainder 1."
  },
  {
    "id": "q_c4_m1_077",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "Which built-in expression reveals the exact type name string (such as 'str' or 'int') of the object currently bound to variable x?",
    "options": [
      "type(x).__name__",
      "x.typeof()",
      "str(class(x))",
      "inspect.typename(x)"
    ],
    "correct": 0,
    "explanation": "type(x) returns the class object, and accessing .__name__ extracts the concise string name (used in section 1 of m01_foundations.py)."
  },
  {
    "id": "q_c4_m1_078",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What does bool('') return when checking an empty username field read from a log line?",
    "options": [
      "True",
      "False",
      "None",
      "ValueError"
    ],
    "correct": 1,
    "explanation": "An empty string has length 0 and is always falsy in Python."
  },
  {
    "id": "q_c4_m1_079",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Why does dynamic typing allow x = 443 followed later by x = 'https' in the same Python function without a compile error, and what risk does that introduce?",
    "options": [
      "x merges both values into ('https', 443); risk is memory fragmentation",
      "443 becomes immutable once reassigned",
      "Variables are unannotated object references that can be rebound to incompatible types, risking downstream TypeError if code forgets what x holds",
      "Python raises a deprecation warning on type changes"
    ],
    "correct": 2,
    "explanation": "Because names are not locked to a static type, reusing the same name across incompatible types makes bugs harder to spot until that branch runs."
  },
  {
    "id": "q_c4_m1_080",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "If a firewall rule check parses raw_bytes = '4096' from CSV text, which operation turns it into a numeric byte count?",
    "options": [
      "str(raw_bytes)",
      "bytes(raw_bytes)",
      "bool(raw_bytes)",
      "int(raw_bytes)"
    ],
    "correct": 3,
    "explanation": "int('4096') converts the numeric ASCII string into the integer 4096 for arithmetic and numerical thresholds."
  },
  {
    "id": "q_c4_m1_081",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "What happens if an analyst tries to execute int('443.0') directly in Python when parsing a float-formatted string from JSON?",
    "options": [
      "Raises ValueError because int() expects base-10 integer digits without a decimal point",
      "Returns 443 smoothly",
      "Returns 443.0 as a float",
      "Raises TypeError"
    ],
    "correct": 0,
    "explanation": "int('443.0') fails with ValueError ('invalid literal for int() with base 10: \"443.0\"'); converting numeric text containing '.0' requires float() first (with validation against truncation loss)."
  },
  {
    "id": "q_c4_m1_082",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Why is bool(' ') (a single space string) equal to True, and how should an analyst check whether an input username contains actual non-whitespace characters?",
    "options": [
      "bool(' ') is False; no strip is needed",
      "A single space has length 1 (truthy), so check bool(username.strip()) to reject whitespace-only input",
      "Convert username via int(username)",
      "Test username == None"
    ],
    "correct": 1,
    "explanation": "' ' is non-empty so it evaluates truthy; stripping leading/trailing whitespace first ensures blank/space-only usernames are caught as empty strings."
  },
  {
    "id": "q_c4_m1_083",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "In Python, why does 'is' work consistently for 'if result is None:' yet behave unpredictably for 'if a is 300:'?",
    "options": [
      "Integers above 256 are stored as floats",
      "is cannot operate on numbers at all and raises SyntaxError",
      "None is a guaranteed single global instance (singleton), whereas separate integer objects above CPython's small-int cache (-5 to 256) need not share memory identity",
      "None is equal to 0"
    ],
    "correct": 2,
    "explanation": "Never use 'is' for value equality on numbers or strings: two distinct objects with value 300 can have different memory addresses, making '300 is x' False even when '300 == x' is True."
  },
  {
    "id": "q_c4_m1_084",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Notice the precedence trap in '-3 ** 2' in Python arithmetic. What does '-3 ** 2' evaluate to?",
    "options": [
      "9",
      "6",
      "TypeError",
      "-9, because ** binds tighter than unary minus (- (3 ** 2))"
    ],
    "correct": 3,
    "explanation": "Exponentiation ** has higher precedence than unary negation -, so '-3 ** 2' computes -(3**2) = -9; write (-3) ** 2 to square -3."
  },
  {
    "id": "q_c4_m1_085",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Given entry = '2026-11-07 10:02:11 FAILED login user=asha src=10.20.4.17', what does entry.upper()[:19] return?",
    "options": [
      "'2026-11-07 10:02:11'",
      "'FAILED LOGIN USER=A'",
      "'2026-11-07 10:02:11 FAILED'",
      "'ASHA'"
    ],
    "correct": 0,
    "explanation": "The timestamp occupies indices 0..18 (19 characters), containing only digits, dashes, space, and colons unaffected by .upper()."
  },
  {
    "id": "q_c4_m1_086",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Which string method checks whether a user-supplied file line begins with 'FAILED' without slicing manually?",
    "options": [
      "entry.contains('FAILED')",
      "entry.startswith('FAILED')",
      "entry.head('FAILED')",
      "entry.trim('FAILED')"
    ],
    "correct": 1,
    "explanation": "str.startswith(prefix) returns a boolean and clearly expresses prefix intent without slice-length off-by-one risks."
  },
  {
    "id": "q_c4_m1_087",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What does ','.join(['10.0.0.5', '10.0.0.9', '203.0.113.7']) return?",
    "options": [
      "['10.0.0.5,10.0.0.9,203.0.113.7']",
      "3",
      "'10.0.0.5,10.0.0.9,203.0.113.7'",
      "TypeError because join takes the list first"
    ],
    "correct": 2,
    "explanation": "Calling separator.join(iterable_of_strings) joins all elements efficiently into a single delimited string."
  },
  {
    "id": "q_c4_m1_088",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "In Python, which substring operator tests whether 'asha' appears anywhere inside variable line?",
    "options": [
      "line.indexof('asha')",
      "line has 'asha'",
      "'asha' == line",
      "'asha' in line"
    ],
    "correct": 3,
    "explanation": "The 'in' membership operator on strings returns True if the left substring occurs inside the right string, False otherwise."
  },
  {
    "id": "q_c4_m1_089",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What happens if an analyst invokes '.join()' on a separator with a list of raw integers such as ', '.join([22, 80, 443])?",
    "options": [
      "Raises TypeError because str.join() requires every element in the iterable to be a str",
      "Returns '22, 80, 443'",
      "Skips non-string values silently",
      "Returns [22, 80, 443]"
    ],
    "correct": 0,
    "explanation": "str.join() rejects non-string elements with TypeError: sequence item 0: expected str instance, int found; convert explicitly via [str(p) for p in ports]."
  },
  {
    "id": "q_c4_m1_090",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Contrast str.find('user=') and str.index('user=') when parsing a log line that turns out NOT to contain 'user='.",
    "options": [
      "Both return None",
      "find() returns -1 when not found, whereas index() raises ValueError",
      "index() returns -1 when not found, whereas find() raises KeyError",
      "Both return False"
    ],
    "correct": 1,
    "explanation": "Because -1 is also a valid negative slice index in Python, using find()'s result without checking '>= 0' is a classic off-by-one slicing bug (str[-1] silently grabs the last char!)."
  },
  {
    "id": "q_c4_m1_091",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "A developer builds an alert message line by writing: entry.split('user=')[1] without validating the line first. What input breaks this expression at runtime?",
    "options": [
      "Any IP address appended at the end of the line",
      "Any username longer than 8 characters",
      "Any line containing uppercase 'USER=' or lacking the substring 'user=' at all, which raises IndexError because split() yields a 1-element list",
      "Any space inside the timestamp"
    ],
    "correct": 2,
    "explanation": "If 'user=' is absent, split('user=') returns [entry] of length 1, so indexing [1] raises IndexError; production code checks membership or guards length first."
  },
  {
    "id": "q_c4_m1_092",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Notice the difference between line.split(' ') and line.split() on 'FAILED   user=asha'. What does each produce?",
    "options": [
      "Both return ['FAILED', 'user=asha']",
      "line.split(' ') ignores trailing newlines automatically",
      "line.split() keeps empty tokens while line.split(' ') drops them",
      "line.split(' ') splits on every single space creating empty '' tokens (['FAILED', '', '', 'user=asha']), whereas line.split() collapses consecutive whitespace"
    ],
    "correct": 3,
    "explanation": "Passing an explicit single-space delimiter ' ' preserves empty strings between repeated spaces; omitting the separator splits cleanly on arbitrary whitespace runs and strips outer whitespace."
  },
  {
    "id": "q_c4_m1_093",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Why does Python 3.10 disallow escaping quotes inconsistently OR putting a bare raw path ending with a single backslash like r'C:\\logs\\'?",
    "options": [
      "Even in raw strings, a backslash still escapes the closing quote if placed immediately before it, causing an unterminated string SyntaxError",
      "Raw strings forbid colons after drive letters",
      "Windows paths must use triple single quotes",
      "Python strips all trailing backslashes in memory"
    ],
    "correct": 0,
    "explanation": "In Python lexical analysis, r'C:\\logs\\' fails because \\' escapes the closing delimiter; use Path('C:/logs') or 'C:\\\\logs\\\\' when a trailing backslash is required."
  },
  {
    "id": "q_c4_m1_094",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Suppose a case-insensitive allowlist stores normalized usernames in lowercase, and an attacker authenticates as 'ASHA' or 'asha '. Which sequence guarantees canonical matching?",
    "options": [
      "username.title()",
      "username.strip().lower() (or .casefold() for Unicode)",
      "username[::-1]",
      "username.replace('A', 'a')"
    ],
    "correct": 1,
    "explanation": "Stripping outer whitespace and normalizing case (.lower() or .casefold() for international Unicode text) prevents trivial bypasses via padding or capitalization."
  },
  {
    "id": "q_c4_m1_095",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Given open_ports = [22, 443, 8080], what do open_ports[0] and open_ports[-1] return respectively?",
    "options": [
      "22 and 22",
      "443 and 8080",
      "22 and 8080",
      "IndexError on negative index -1"
    ],
    "correct": 2,
    "explanation": "Index 0 selects the first element (22) and index -1 selects the last element from the end (8080), as output in m01_foundations.py section 3."
  },
  {
    "id": "q_c4_m1_096",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What happens if an analyst accesses services[25] when services = {22: 'ssh', 443: 'https'}?",
    "options": [
      "Returns None",
      "Returns 'unknown'",
      "Inserts key 25 with value None",
      "Raises KeyError"
    ],
    "correct": 3,
    "explanation": "Direct dictionary subscripting d[missing_key] raises KeyError when the key is not present."
  },
  {
    "id": "q_c4_m1_097",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Which data structure is specifically recommended in L04 when you need to preserve duplicate events in chronological arrival order?",
    "options": [
      "list",
      "dict keys",
      "set",
      "bool"
    ],
    "correct": 0,
    "explanation": "Lists allow duplicates and preserve exact chronological append order; sets deduplicate and discard arrival order."
  },
  {
    "id": "q_c4_m1_098",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Which operator computes the intersection (elements present in BOTH bad_ips and outbound_ips) between two Python sets?",
    "options": [
      "|",
      "&",
      "-",
      "^"
    ],
    "correct": 1,
    "explanation": "Set intersection (&) identifies items shared by both sets (e.g., outbound destination IPs that match a known-bad indicator set)."
  },
  {
    "id": "q_c4_m1_099",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What happens if you try to store duplicate entries inside a Python set via unique = set(['10.0.0.5', '10.0.0.9', '10.0.0.5'])?",
    "options": [
      "Python raises ValueError: duplicate key",
      "The second copy turns into None",
      "unique retains only one copy of '10.0.0.5' (len(unique) == 2)",
      "Lists cannot be passed into set()"
    ],
    "correct": 2,
    "explanation": "Constructing a set automatically deduplicates items based on equality and hash value."
  },
  {
    "id": "q_c4_m1_100",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Why does event = ('2026-11-07T10:02:11', 'asha', 'FAILED') serve cleanly as a composite dictionary key like {(src_ip, dst_port): packet_count}?",
    "options": [
      "Tuples are mutable so keys can update themselves",
      "Only 2-element lists are unhashable",
      "Tuples are faster because they compress text with gzip",
      "Tuples containing only immutable elements (such as str and int) are immutable and hashable"
    ],
    "correct": 3,
    "explanation": "A tuple whose members are all immutable is itself hashable, making (src_ip, dst_port) ideal for composite aggregation keys."
  },
  {
    "id": "q_c4_m1_101",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Compare the number of comparisons performed in Scenario S1 between scanning a 50,000-IP threat feed list for 2,000,000 proxy log IPs versus intersecting/testing a set.",
    "options": [
      "List scan performs up to 2,000,000 x 50,000 = 10^11 linear checks, whereas set membership takes ~O(1) per lookup (~2.05 x 10^6 total ops)",
      "List scan needs ~50,000 operations; set scan needs ~10^11",
      "Both perform identical comparisons because Python uses binary search on unsorted lists",
      "Set conversion takes longer than the nested loop itself"
    ],
    "correct": 0,
    "explanation": "O(N * M) = 10^11 comparisons takes hours in Python, whereas hashing M items once and checking N lookups runs in O(N + M) (~2 million operations, under a second)."
  },
  {
    "id": "q_c4_m1_102",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "In Scenario S1's solution, why should IPs also be normalized (stripped of whitespace and canonicalized, e.g., IPv6 compressed form) BEFORE inserting into seen_set or bad_set?",
    "options": [
      "Python's set hash function rejects dots and colons",
      "Sets compare raw strings exactly, so '2001:0db8::1' and '2001:db8::1' or '10.0.0.5 ' will miss matches despite naming the same host",
      "Whitespace converts a set into a tuple",
      "Normalization lowers RAM usage by 90%"
    ],
    "correct": 1,
    "explanation": "String hashing checks character-by-character equivalence, so formatting variants or trailing spaces cause silent false negatives in threat-feed matching."
  },
  {
    "id": "q_c4_m1_103",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Suppose a developer checks 'bad_ips.pop()' or 'bad_ips.remove(ip)' while inside 'for ip in bad_ips:'. What structural hazard arises?",
    "options": [
      "remove() creates a new copy automatically",
      "Python silently pauses mutation until after the loop finishes",
      "Sets raise RuntimeError: Set changed size during iteration, while mutating a list in-place skips items by shifting indices",
      "Both work safely if the container is sorted"
    ],
    "correct": 2,
    "explanation": "Mutating a container while iterating over it either raises RuntimeError (sets/dicts) or shifts list indices so subsequent elements are skipped; iterate over a copy or build a new filtered collection via comprehension."
  },
  {
    "id": "q_c4_m1_104",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Look closely at: bad_tuple = (['10.0.0.5'], 443). Can bad_tuple be inserted as a key into a Python dictionary or set?",
    "options": [
      "Yes, because the outer container is a tuple",
      "Python turns the inner list into a string automatically",
      "Yes, as long as the list has length 1",
      "No — Python checks hashability recursively and raises TypeError because the tuple contains a mutable list"
    ],
    "correct": 3,
    "explanation": "Tuple immutability only locks the outer slot references; hash() recursively calls hash() on every item inside, so an embedded list makes the tuple unhashable."
  },
  {
    "id": "q_c4_m1_105",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Contrast 'counts[u] = counts.get(u, 0) + 1' against 'counts[u] += 1' when counting failures for a brand-new user 'chen' not yet in counts.",
    "options": [
      "counts[u] += 1 raises KeyError because it must read counts['chen'] before adding 1, whereas counts.get(u, 0) + 1 defaults cleanly to 0",
      "Both initialize counts['chen'] to 1",
      "counts.get(u, 0) raises ValueError on empty dicts",
      "+= 1 initializes keys to None"
    ],
    "correct": 0,
    "explanation": "Augmented assignment 'counts[u] += 1' evaluates 'counts[u]' first, raising KeyError on unseen keys unless initialized or replaced with .get(u, 0) + 1."
  },
  {
    "id": "q_c4_m1_106",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "What does d.setdefault(user, set()).add(src_ip) avoid compared to accessing d[user].add(src_ip) directly?",
    "options": [
      "It turns sets into immutable frozensets",
      "It prevents KeyError when user is encountered for the first time by inserting an empty set before calling .add(src_ip)",
      "It merges src_ip into all keys in the dict",
      "It clears prior IPs each time user logs in"
    ],
    "correct": 1,
    "explanation": "setdefault(key, default_val) inserts and returns default_val only when key is absent, allowing safe initialization of dict-of-sets accumulators (note: prefer explicit 'if user not in d:' or defaultdict(set) in tight loops so an unused set isn't allocated per hit)."
  },
  {
    "id": "q_c4_m1_107",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Which expression accurately tests whether target_port is NOT in an allowed set named SAFE_PORTS?",
    "options": [
      "target_port !in SAFE_PORTS",
      "target_port not in SAFE_PORTS",
      "Both 'target_port not in SAFE_PORTS' and 'not target_port in SAFE_PORTS' work, though 'not in' is preferred idiomatic Python",
      "not target_port in SAFE_PORTS"
    ],
    "correct": 2,
    "explanation": "Python prefers the readable infix membership operator 'x not in s', matching PEP 8 style over 'not x in s'."
  },
  {
    "id": "q_c4_m1_108",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "What does 'not True or False' evaluate to under Python operator precedence?",
    "options": [
      "True",
      "SyntaxError",
      "None",
      "False"
    ],
    "correct": 3,
    "explanation": "Boolean precedence order is: not -> and -> or. Thus (not True) is False, and False or False yields False."
  },
  {
    "id": "q_c4_m1_109",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "In m01_foundations.py section 7, calling [(p, classify(p)) for p in (22, 80, 3389, 8080)] returns which tuple for port 80?",
    "options": [
      "(80, 'well-known')",
      "(80, 'admin')",
      "(80, 'high')",
      "(80, None)"
    ],
    "correct": 0,
    "explanation": "Port 80 is not in (22, 3389) and satisfies 80 < 1024, so classify(80) returns 'well-known'."
  },
  {
    "id": "q_c4_m1_110",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Why did CS2's buggy string comparison report that BOTH '443' > '1000' AND '10000' > '1000' returned True, yet for two completely different reasons?",
    "options": [
      "Neither returned True",
      "'443' > '1000' holds at index 0 because '4' > '1', whereas '10000' > '1000' matches '1000' for 4 chars and wins because it is longer",
      "Python treats five-digit strings as negative integers",
      "'10000' equals '443' in hexadecimal"
    ],
    "correct": 1,
    "explanation": "Lexicographical order stops at the first differing character ('4' vs '1') for '443', whereas '10000' shares prefix '1000' and only compares greater by length."
  },
  {
    "id": "q_c4_m1_111",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "What happens when a Python script attempts a mixed comparison such as '443' > 1000 in Python 3?",
    "options": [
      "Converts '443' to 443 and returns False",
      "Compares ASCII code points against memory address and returns True",
      "Raises TypeError: '>' not supported between instances of 'str' and 'int'",
      "Returns None"
    ],
    "correct": 2,
    "explanation": "Python 3 strictly forbids ordering comparisons between incompatible types like str and int, failing loudly with TypeError instead of Python 2's silent arbitrary ordering."
  },
  {
    "id": "q_c4_m1_112",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Suppose an analyst writes: if role == 'admin' or 'ops': grant_access(). Why does this grant access to EVERY user including role = 'guest'?",
    "options": [
      "Strings compare true when joined by 'or'",
      "Python assigns 'ops' to role",
      "== binds looser than 'or'",
      "Python parses it as (role == 'admin') or ('ops'); since non-empty string 'ops' is always truthy, the condition is unconditionally True"
    ],
    "correct": 3,
    "explanation": "Comparisons bind tighter than 'or', so 'ops' stands alone as a truthy literal! Correct syntax is: if role in ('admin', 'ops'):."
  },
  {
    "id": "q_c4_m1_113",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Why should an incident responder NEVER write 'if status == (200 or 201):' in Python?",
    "options": [
      "(200 or 201) evaluates to 200 (the first truthy integer), silently ignoring HTTP status 201",
      "Parentheses are disallowed after ==",
      "200 and 201 trigger a ZeroDivisionError",
      "Python turns (200 or 201) into True"
    ],
    "correct": 0,
    "explanation": "The subexpression (200 or 201) returns 200 immediately via short-circuit evaluation, leaving status == 200 and never matching 201; always use status in (200, 201)."
  },
  {
    "id": "q_c4_m1_114",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Consider boolean precedence when filtering firewall alerts: 'if not is_trusted and is_external or is_malicious:'. How does Python parenthesize this condition by default?",
    "options": [
      "(not (is_trusted and is_external)) or is_malicious",
      "((not is_trusted) and is_external) or is_malicious",
      "(not is_trusted) and (is_external or is_malicious)",
      "Evaluates strictly left-to-right ignoring precedence"
    ],
    "correct": 1,
    "explanation": "Because 'not' binds tightest, then 'and', then 'or', omitting parentheses evaluates '((not is_trusted) and is_external) or is_malicious'; add explicit parentheses whenever intent combines 'and' with 'or'."
  },
  {
    "id": "q_c4_m1_115",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "If a firewall list contains IPv4 strings sorted by Python's plain sorted(ips), why might '10.0.0.10' sort BEFORE '10.0.0.2'?",
    "options": [
      "Dot characters split strings into floats",
      "sorted() reverses numeric lists",
      "Strings sort character-by-character ('1' precedes '2'), whereas semantic IP sorting requires key=ipaddress.ip_address (or numeric octet tuples)",
      "10 is always less than 2 in octal"
    ],
    "correct": 2,
    "explanation": "Like CS2 port strings, IP strings sort lexicographically unless converted to numeric IP objects (ipaddress.IPv4Address) or integer tuples."
  },
  {
    "id": "q_c4_m1_116",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Which sequence of numbers does range(5) yield inside a Python for loop?",
    "options": [
      "1, 2, 3, 4, 5",
      "1, 2, 3, 4",
      "0, 1, 2, 3, 4, 5",
      "0, 1, 2, 3, 4"
    ],
    "correct": 3,
    "explanation": "range(stop) produces integers starting at 0 up to stop - 1, yielding five items: 0, 1, 2, 3, 4."
  },
  {
    "id": "q_c4_m1_117",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "In the m01_foundations.py while loop: attempts = 0; while attempts < 5: attempts += 1; if attempts == 3: break. What does 'print(\"while loop stopped after\", attempts, \"attempts\")' display?",
    "options": [
      "while loop stopped after 3 attempts",
      "while loop stopped after 2 attempts",
      "while loop stopped after 5 attempts",
      "Infinite loop"
    ],
    "correct": 0,
    "explanation": "attempts increments to 1, 2, and then 3; when attempts == 3, break exits the loop immediately, leaving attempts at 3."
  },
  {
    "id": "q_c4_m1_118",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What is the main risk if a while loop forgets to update its loop condition variable inside the loop body?",
    "options": [
      "Python stops after 100 iterations with LoopError",
      "The loop runs forever (infinite loop), consuming CPU or hanging automation tasks",
      "Python automatically inserts a break statement",
      "The condition turns into False after 1 second"
    ],
    "correct": 1,
    "explanation": "A while loop repeats as long as its condition evaluates True; if nothing alters state toward terminating, it hangs indefinitely."
  },
  {
    "id": "q_c4_m1_119",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What type of Python object does {ip for ip in seen_ips} construct?",
    "options": [
      "A dictionary mapping ip to None",
      "A list of IPs",
      "A set containing the unique values from seen_ips",
      "A tuple generator"
    ],
    "correct": 2,
    "explanation": "Curly braces with single expressions (no colon 'k: v') build a set comprehension, automatically deduplicating items."
  },
  {
    "id": "q_c4_m1_120",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "When writing comprehensions in security code, when does PEP 8/clean-engineering guidance say you should switch back to an explicit for loop?",
    "options": [
      "Never; comprehensions must replace every loop",
      "Whenever filtering lists longer than 100 elements",
      "Whenever iterating over tuples",
      "When nesting or branching becomes complicated enough that a plain loop is significantly easier to read and maintain"
    ],
    "correct": 3,
    "explanation": "Comprehensions excel at concise one-step transforms and filters; multi-branch state updates or side effects belong in clear for loops."
  },
  {
    "id": "q_c4_m1_121",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "In m01_foundations.py section 8, what happens if an analyst forgets 'continue' inside 'if not entry.startswith(\"FAILED\"): ...' and leaves only a pass/print statement?",
    "options": [
      "OK log lines fall through to split(\"user=\")[1], falsely counting successful logins like 'OK user=ben' as authentication failures",
      "Python raises SyntaxError",
      "OK lines break out of the entire loop",
      "The dict rejects keys belonging to successful logins"
    ],
    "correct": 0,
    "explanation": "Without continue (or an else branch), successful entries fall through into the counting logic, corrupting security metrics and creating false alerts."
  },
  {
    "id": "q_c4_m1_122",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Consider adding a loop-else clause in Python: 'for entry in entries: if is_bad(entry): break; else: log_clean()'. When does log_clean() execute?",
    "options": [
      "Only if the loop encountered a break statement",
      "Only if the loop finished every iteration cleanly WITHOUT hitting a break statement",
      "Only when entries is mutated during iteration",
      "On every single iteration where is_bad(entry) is False"
    ],
    "correct": 1,
    "explanation": "Python's for...else runs the else block strictly when no break was executed ('no-break' completion), ideal for 'not found' search verification."
  },
  {
    "id": "q_c4_m1_123",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Trace CS1's engineering takeaways: how can Python programs explicitly embed meaning alongside numeric telemetry so trajectory or log pipelines do not confuse units like Newton-seconds vs pound-seconds or ms vs s?",
    "options": [
      "Replace all floats with plain strings",
      "Store unit names in # comments only",
      "Encode units explicitly in variable/field names (duration_ms, bytes_sent), convert at module boundaries, use typed objects like datetime.timedelta, and add end-to-end tests",
      "Sort values alphabetically before computing sums"
    ],
    "correct": 2,
    "explanation": "Boundary conversion, unit-explicit identifiers (e.g., timestamp_utc, duration_seconds), structured types, and realistic integration tests eliminate silent unit mismatches."
  },
  {
    "id": "q_c4_m1_124",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Which common comprehension anti-pattern wastes memory and confuses reviewers because the constructed list is immediately discarded?",
    "options": [
      "[u for u, n in failures.items() if n >= 3]",
      "{k: v for k, v in services.items() if k < 1024}",
      "{ip.strip() for ip in raw_ips}",
      "Using [print(x) for x in logs] purely for side effects instead of a normal for loop"
    ],
    "correct": 3,
    "explanation": "[print(x) for x in logs] unnecessarily allocates a full list of [None, None, ...] in memory just to print lines; use a standard for loop for side effects."
  },
  {
    "id": "q_c4_m1_125",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Inspect the exact output of m01_foundations.py section 5: '5. 4 seen, 3 unique; not allow-listed: [\"203.0.113.7\"]' vs section 8: \"totals: {'asha': 4, 'chen': 1}\". Why did section 5 wrap (unique - allow) inside sorted() when printing?",
    "options": [
      "Sets have arbitrary iteration order across Python runs due to hash randomization, whereas sorted() guarantees a deterministic list for display and testing",
      "sorted() removes duplicates while sets do not",
      "unique - allow returns a dict rather than a set",
      "Subtracting sets produces None unless sorted"
    ],
    "correct": 0,
    "explanation": "Because Python randomizes string hash seeds per process (PYTHONHASHSEED), iterating an unsorted set prints items in unpredictable order; sorted(unique - allow) produces a predictable deterministic list."
  },
  {
    "id": "q_c4_m1_126",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "medium",
    "q": "In Practical P1, if you add '203.0.113.7' to the allow set {'10.0.0.5', '10.0.0.9'}, what does sorted(unique - allow) print in section 5?",
    "options": [
      "['203.0.113.7']",
      "[] (an empty list)",
      "['10.0.0.5', '10.0.0.9']",
      "KeyError"
    ],
    "correct": 1,
    "explanation": "Every IP in unique {'10.0.0.5', '10.0.0.9', '203.0.113.7'} is now in allow, so the set difference unique - allow is the empty set and sorted() yields []."
  },
  {
    "id": "q_c4_m1_127",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "medium",
    "q": "In Practical P1 step 2b, why does writing ADMIN_PORTS = {22, 3389} instead of checking (22, 3389) inline improve maintainability?",
    "options": [
      "Sets automatically reject ports over 1024",
      "Tuples are forbidden inside def statements",
      "Naming the constant centralizes policy configuration at the top of the file and scales cleanly to large port lists via O(1) lookup",
      "Python encrypts uppercase variables in memory"
    ],
    "correct": 2,
    "explanation": "Extracting magic literals into a named constant ADMIN_PORTS documents intent, avoids scattered edits, and leverages fast set membership."
  },
  {
    "id": "q_c4_m1_128",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "In Practical P2, why does the dataset ('asha', '203.0.113.7', 'FAIL') followed later by ('asha', '203.0.113.7', 'OK') indicate a suspicious event?",
    "options": [
      "IPv4 addresses starting with 203 are loopback addresses",
      "asha logged in from zero IPs",
      "Tuples cannot hold both FAIL and OK",
      "A successful login came from the same external IP that already experienced failures for that user — consistent with credential guessing/brute forcing"
    ],
    "correct": 3,
    "explanation": "A single IP generating authentication failures followed by an OK authentication is a classic credential-stuffing or brute-force compromise indicator."
  },
  {
    "id": "q_c4_m1_129",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "medium",
    "q": "If an analyst tests '[1, 2, 3][5]' in the REPL during P1 step 4, which built-in error does Python raise?",
    "options": [
      "IndexError",
      "ValueError",
      "KeyError",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "Requesting an integer sequence offset beyond len(list) - 1 raises IndexError: list index out of range."
  },
  {
    "id": "q_c4_m1_130",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "In Practical P1 step 3, which expression builds a dictionary of well-known services (port < 1024) from services = {22: 'ssh', 443: 'https', 8080: 'http-alt', 3389: 'rdp'}?",
    "options": [
      "[p for p in services if p < 1024]",
      "{p: name for p, name in services.items() if p < 1024}",
      "{p for p in services if p < 1024}",
      "services[p < 1024]"
    ],
    "correct": 1,
    "explanation": "Iterating over services.items() yields (port, name) pairs, producing the filtered dict {22: 'ssh', 443: 'https'} via dictionary comprehension."
  },
  {
    "id": "q_c4_m1_131",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "What subtle bug would break Practical P2's compromise check if an analyst cleared or omitted failed IPs when switching users or used one shared global set 'failed_ips' rather than a per-user dict of sets?",
    "options": [
      "Python dictionaries cannot store sets as values",
      "A global set rejects IP strings containing dots",
      "A shared failed_ips set flags ben as compromised if ben logs in cleanly from a corporate NAT/VPN IP where asha previously mistyped her password",
      "Unpacking tuples raises ValueError inside loops"
    ],
    "correct": 2,
    "explanation": "Scoping failed source IPs per user (dict[str, set[str]]) prevents one user's typos on a shared NAT IP from triggering false-positive compromise alerts on another user unless cross-user spray correlation is intended."
  },
  {
    "id": "q_c4_m1_132",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "Notice the difference between 'seen = {}; seen[ip] = ...' and 'seen = {} # intended empty set' -> 'seen.add(ip)'. What error happens when calling .add() on {}?",
    "options": [
      "TypeError: unhashable type",
      "SyntaxError",
      "KeyError: add",
      "AttributeError: 'dict' object has no attribute 'add'"
    ],
    "correct": 3,
    "explanation": "Empty curly braces {} create an empty dict (which lacks .add()); creating an empty set requires set()."
  },
  {
    "id": "q_c4_m1_133",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What value and type does 'type(True)' represent in Python?",
    "options": [
      "bool (a subclass of int with values True and False)",
      "int",
      "str",
      "NoneType"
    ],
    "correct": 0,
    "explanation": "True and False belong to built-in class bool, which inherits from int (so True == 1 and False == 0 numerically, though type(True).__name__ is 'bool')."
  },
  {
    "id": "q_c4_m1_134",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What does float('0.5') return?",
    "options": [
      "0",
      "0.5",
      "'0.5'",
      "ValueError"
    ],
    "correct": 1,
    "explanation": "float() converts decimal numeric strings into IEEE 754 floating-point objects."
  },
  {
    "id": "q_c4_m1_135",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Because bool is a subclass of int in Python, what surprises an unwary analyst who adds mixed booleans inside a numeric summary or checks 'sum([True, True, False])'?",
    "options": [
      "Raises TypeError",
      "Returns [True, False]",
      "sum([True, True, False]) returns 2 because True behaves numerically as 1 and False as 0",
      "Returns None"
    ],
    "correct": 2,
    "explanation": "Since bool inherits from int, True + True == 2; this idiom is handy for counting boolean flags like sum(p < 1024 for p in ports), yet risky if booleans slip into arithmetic unintentionally."
  },
  {
    "id": "q_c4_m1_136",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What does len('2026-11-07') evaluate to?",
    "options": [
      "8",
      "9",
      "11",
      "10"
    ],
    "correct": 3,
    "explanation": "'2026-11-07' holds 4 year digits + 1 dash + 2 month digits + 1 dash + 2 day digits = 10 characters."
  },
  {
    "id": "q_c4_m1_137",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Which string method verifies whether a filename string ends with '.log'?",
    "options": [
      "filename.endswith('.log')",
      "filename.suffix('.log')",
      "filename.match_tail('.log')",
      "filename.after('.log')"
    ],
    "correct": 0,
    "explanation": "str.endswith() checks string suffixes safely and accepts either a single str or a tuple of candidate suffixes like ('.log', '.txt')."
  },
  {
    "id": "q_c4_m1_138",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Suppose log_line = 'alert: \"admin\"\\tfail'. How does repr(log_line) help during security debugging compared to print(log_line)?",
    "options": [
      "repr() encrypts sensitive tabs",
      "repr() reveals hidden whitespace/control characters (such as \\t, \\r, \\n, and trailing spaces) explicitly in quotes instead of rendering them visually",
      "print() raises TypeError on tabs",
      "repr() strips quotes from output"
    ],
    "correct": 1,
    "explanation": "repr() exposes invisible trailing carriage returns (\\r), tabs (\\t), and non-printable bytes that otherwise cause mysterious key lookup failures."
  },
  {
    "id": "q_c4_m1_139",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Which built-in function returns a new sorted list from ANY iterable without modifying the original list?",
    "options": [
      "list.sort()",
      "order(iterable)",
      "sorted(iterable)",
      "iterable.sorted()"
    ],
    "correct": 2,
    "explanation": "sorted(iterable) returns a fresh sorted list and preserves the original sequence, whereas list.sort() mutates the list in-place and returns None."
  },
  {
    "id": "q_c4_m1_140",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What value is bound to x after executing 'x = [80, 22].sort()' in Python?",
    "options": [
      "[22, 80]",
      "[80, 22]",
      "TypeError",
      "None, because list.sort() mutates in place and returns None"
    ],
    "correct": 3,
    "explanation": "Python mutating methods like .sort(), .append(), and .reverse() return None specifically to remind callers they modified the object in place rather than creating a new list."
  },
  {
    "id": "q_c4_m1_141",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "If you write ALLOW_LIST = ('10.0.0.5', '10.0.0.9') as a tuple versus ALLOW_SET = {'10.0.0.5', '10.0.0.9'} as a set, when would ALLOW_SET still dramatically outperform the tuple?",
    "options": [
      "Whenever checking membership ('ip in ALLOW') across thousands of indicator entries, because tuples scan linearly O(N) while sets hash O(1)",
      "Only when elements are integers rather than strings",
      "When printing elements in sorted order",
      "Never; tuples and sets have identical O(1) lookup time"
    ],
    "correct": 0,
    "explanation": "Tuples are immutable sequences with O(N) linear membership search; for large indicator sets, hash-based sets (or immutable frozenset) preserve O(1) lookup."
  },
  {
    "id": "q_c4_m1_142",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "An analyst builds default_counts = {'web': []}; snapshot = default_counts.copy(); snapshot['web'].append('alert1'). What is inside default_counts['web'] afterwards?",
    "options": [
      "[] (empty)",
      "['alert1'], because dict.copy() is shallow and both dicts share the nested mutable list object",
      "KeyError",
      "'alert1' as a raw string"
    ],
    "correct": 1,
    "explanation": "dict.copy() copies top-level key-to-reference pairs only; mutating the shared list value through snapshot mutates the list seen by default_counts as well."
  },
  {
    "id": "q_c4_m1_143",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "In Python, which keyword handles the fallback branch when neither 'if' nor any preceding 'elif' condition holds True?",
    "options": [
      "default",
      "otherwise",
      "else",
      "finally"
    ],
    "correct": 2,
    "explanation": "The optional 'else:' clause runs only when every prior if and elif test in the chain evaluates False."
  },
  {
    "id": "q_c4_m1_144",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Why does PEP 8 prefer 'if x is None:' over 'if x == None:'?",
    "options": [
      "== raises TypeError when comparing against None",
      "== None runs 1000x slower",
      "is None converts integers to 0",
      "Custom classes can override __eq__ (==) and behave unexpectedly, whereas 'is None' checks exact object identity against the None singleton"
    ],
    "correct": 3,
    "explanation": "Using 'is' / 'is not' for None performs fast pointer-identity comparison unaffected by custom __eq__ implementations."
  },
  {
    "id": "q_c4_m1_145",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "When sorting mixed string port records from CS2 cleanly without modifying original strings, which key expression in sorted(raw_ports, ...) orders them numerically?",
    "options": [
      "sorted(raw_ports, key=int)",
      "sorted(raw_ports, key=str)",
      "sorted(raw_ports, reverse=True)",
      "sorted(raw_ports, key=len)"
    ],
    "correct": 0,
    "explanation": "Passing key=int converts each validated port string temporarily to an integer for numeric comparison while preserving elements cleanly (note: validate digits first)."
  },
  {
    "id": "q_c4_m1_146",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "When you execute 'for p, name in services.items():', what does each iteration unpack?",
    "options": [
      "The integer index and key",
      "Each (key, value) pair from the services dictionary",
      "Only keys that exceed 1024",
      "Reversed pairs (value, key)"
    ],
    "correct": 1,
    "explanation": "dict.items() yields (key, value) 2-tuples in insertion order, allowing direct unpacking into loop variables p and name."
  },
  {
    "id": "q_c4_m1_147",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Which statement correctly distinguishes 'break' from 'continue' inside a Python loop?",
    "options": [
      "break exits the current function; continue pauses for 1 second",
      "continue exits nested loops; break skips one item",
      "break terminates the innermost enclosing loop immediately; continue skips only the remainder of the current iteration and jumps to the next item",
      "Both exit the entire Python program"
    ],
    "correct": 2,
    "explanation": "break ends iteration of the enclosing loop prematurely; continue advances straight to the loop header for the next iteration."
  },
  {
    "id": "q_c4_m1_148",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Consider nested loops breaking early: 'for host in hosts: for port in ports: if port == 23: break'. What stops when break executes?",
    "options": [
      "Both outer and inner loops stop simultaneously",
      "The host list is truncated",
      "Python raises BreakDepthError",
      "Only the inner loop over ports terminates; the outer loop proceeds to the next host"
    ],
    "correct": 3,
    "explanation": "break only exits the single innermost loop in which it appears; exiting multiple nested loops requires a function return or a sentinel check."
  },
  {
    "id": "q_c4_m1_149",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "Where do triple-quoted strings normally appear when serving as official module documentation?",
    "options": [
      "As the very first statement at the top of a module (and right beneath def lines for functions)",
      "At the bottom of the file after all functions",
      "Inside if False: blocks only",
      "Inside comments starting with #\"\"\""
    ],
    "correct": 0,
    "explanation": "Placing a string literal as the first statement of a module, class, or function registers it automatically as that object's __doc__ docstring."
  },
  {
    "id": "q_c4_m1_150",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "If a single statement such as a long list or print() call spans multiple lines inside parentheses () or square brackets [], does Python require line-continuation backslashes \\?",
    "options": [
      "Yes, every line break requires a trailing \\",
      "No — Python implicitly joins lines inside (), [], and {}, which PEP 8 prefers over trailing backslashes",
      "Only inside dictionaries",
      "Parentheses force all items onto one line"
    ],
    "correct": 1,
    "explanation": "Implicit line continuation inside (), [], and {} (used in m01_foundations.py lines 14–15 and 60–63) avoids fragile trailing backslashes that break if followed by whitespace."
  },
  {
    "id": "q_c4_m1_151",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What happens when you compute float('nan') or compare float('inf') in numeric telemetry pipelines?",
    "options": [
      "NaN compares equal to itself (nan == nan is True)",
      "float('inf') raises ValueError",
      "IEEE 754 NaN breaks normal equality because float('nan') == float('nan') is False, requiring math.isnan() checks",
      "Python converts inf automatically into 65535"
    ],
    "correct": 2,
    "explanation": "Under IEEE 754 rules, NaN is unordered and never compares equal even to itself; unvalidated NaN inputs silently defeat '<' and '==' anomaly threshold gates unless checked via math.isfinite()."
  },
  {
    "id": "q_c4_m1_152",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Look closely at: threshold = 0.30; ratio = 0.1 + 0.2. Why does round(ratio, 2) == threshold work here whereas raw ratio == threshold fails?",
    "options": [
      "round() changes floats into integers",
      "threshold = 0.30 is exact in binary64",
      "round() disables IEEE 754 completely",
      "Rounding removes the ~5.5e-17 binary64 representation tail before comparison, though math.isclose(ratio, threshold) is even safer against arbitrary boundary rounding"
    ],
    "correct": 3,
    "explanation": "While round(0.1+0.2, 2) yields 0.3, binary rounding still has edge cases near half-ULPs (like 2.675), making math.isclose() or decimal.Decimal the robust solution."
  },
  {
    "id": "q_c4_m1_153",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Given status = 'FAILED', what does status[1:4] return?",
    "options": [
      "'AIL'",
      "'FAI'",
      "'AILE'",
      "'FAIL'"
    ],
    "correct": 0,
    "explanation": "Python slices are half-open [start:stop): index 1 ('A'), 2 ('I'), 3 ('L'), stopping before index 4 ('E'), returning 'AIL'."
  },
  {
    "id": "q_c4_m1_154",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Why does Python 3 raise ValueError when evaluating int('FF') directly, whereas int('FF', 16) succeeds?",
    "options": [
      "Hex strings require uppercase '0X' prefix only",
      "By default base=10, so hexadecimal digits A-F fail base-10 parsing unless explicit radix base=16 (or base=0 with '0x' prefix) is passed",
      "int() rejects all uppercase letters in every base",
      "FF exceeds 8-bit integer size"
    ],
    "correct": 1,
    "explanation": "Passing the radix argument base=16 lets int() parse packet header hex fields or status masks safely."
  },
  {
    "id": "q_c4_m1_155",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What does len([22, 443, 8080]) return, and how does len() behave on strings vs dictionaries?",
    "options": [
      "3; on strings len() returns word count; on dicts it returns total values including duplicates",
      "2; len() is zero-indexed",
      "3; on lists/tuples it returns item count, on strings character count, and on dicts/sets unique key/element count",
      "len() only supports lists"
    ],
    "correct": 2,
    "explanation": "len() returns the exact count of top-level elements in any built-in container (characters for str, key entries for dict, items for list/set/tuple)."
  },
  {
    "id": "q_c4_m1_156",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "If an analyst constructs rows = [{}] * 3 intending three separate alert dictionaries, what happens after rows[0]['host'] = 'web-01'?",
    "options": [
      "Only rows[0] has {'host': 'web-01'}",
      "rows becomes a set",
      "Python raises MemoryError",
      "All three elements rows[0], rows[1], and rows[2] show {'host': 'web-01'} because * repeats three references to the exact same dict object"
    ],
    "correct": 3,
    "explanation": "Multiplying a list containing a mutable object duplicates references, not copies; construct independent dicts via a comprehension: [{} for _ in range(3)]."
  },
  {
    "id": "q_c4_m1_157",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Which operator checks whether two distinct Python values are NOT equal?",
    "options": [
      "!=",
      "<>",
      "not ==",
      "!=="
    ],
    "correct": 0,
    "explanation": "Python 3 uses != strictly for value inequality (the legacy <> operator was removed in Python 3)."
  },
  {
    "id": "q_c4_m1_158",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Consider evaluating 'if line and line.startswith(\"FAILED\"):' when reading lines from an incoming network feed where line might be None or ''. What protects line.startswith from crashing?",
    "options": [
      "startswith() returns False on None automatically",
      "Short-circuit evaluation stops at falsy line (None or ''), preventing AttributeError on None.startswith()",
      "and converts None to an empty string",
      "startswith accepts non-strings by default"
    ],
    "correct": 1,
    "explanation": "Because 'line' is falsy when None or '', Python never evaluates line.startswith(), acting as a zero-overhead guard."
  },
  {
    "id": "q_c4_m1_159",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Which comprehension syntax filters a list of IP strings ips keeping only non-empty stripped strings?",
    "options": [
      "[for ip in ips: ip.strip()]",
      "(if ip.strip() for ip in ips)",
      "[ip.strip() for ip in ips if ip.strip()]",
      "{ip.strip(): for ip in ips}"
    ],
    "correct": 2,
    "explanation": "In list comprehensions, the output expression precedes 'for', and an optional 'if' filter clause follows the loop clause."
  },
  {
    "id": "q_c4_m1_160",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Why does a dictionary comprehension containing duplicate keys in the input sequence—for example {u: count for u, count in [('asha', 1), ('asha', 4)]}—yield {'asha': 4} rather than summing counts?",
    "options": [
      "Comprehensions sum integer values by default",
      "It preserves only the first seen value {'asha': 1}",
      "It raises DuplicateKeyError",
      "Each new occurrence overwrites the previous value assigned to key 'asha', leaving only the last seen value"
    ],
    "correct": 3,
    "explanation": "Dict comprehensions assign keys sequentially without aggregating existing values; summing or grouping requires a standard loop with .get(u, 0) + count."
  },
  {
    "id": "q_c4_m1_161",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "In Python error troubleshooting, what does 'SyntaxError: expected \":\"' on an if line indicate?",
    "options": [
      "The trailing colon ':' at the end of the if/elif/else/for/def header was omitted",
      "The file extension is wrong",
      "Four spaces were used instead of two",
      "A # comment appeared at the end of the line"
    ],
    "correct": 0,
    "explanation": "Compound statement headers (if, elif, else, for, while, def) must terminate with a colon before opening an indented suite."
  },
  {
    "id": "q_c4_m1_162",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "Why can leaving unused executable prototype code inside a multiline string literal '''...''' at module level still introduce subtle confusion compared to proper # comments?",
    "options": [
      "Triple-quoted strings consume zero memory",
      "It allocates a runtime string constant (and triggers IndentationError if misaligned) rather than being cleanly stripped as a # comment by the tokenizer",
      "Triple-quoted strings execute any embedded Python statements inside them",
      "Python forbids ''' inside functions"
    ],
    "correct": 1,
    "explanation": "Only # comments are genuine ignored comments in Python; triple quotes construct real string objects that remain subject to block indentation."
  },
  {
    "id": "q_c4_m1_163",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "Which core Python type can hold only one of two distinct boolean truth values?",
    "options": [
      "bit",
      "flag",
      "bool",
      "bin"
    ],
    "correct": 2,
    "explanation": "The built-in bool type exclusively represents True and False."
  },
  {
    "id": "q_c4_m1_164",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Why does Scenario S2 warn that mixing seconds and milliseconds in one average resembles the Mars Climate Orbiter failure even when every Python variable has type float?",
    "options": [
      "Static typing automatically fixes seconds to milliseconds",
      "Averaging floats raises TypeError",
      "Milliseconds overflow Python floats past 1000",
      "Python's float type tracks numeric precision only, not physical dimensions/units, so summing incompatible units silently corrupts security SLAs and telemetry averages"
    ],
    "correct": 3,
    "explanation": "Type safety alone is insufficient when both inputs share the same primitive float type but represent different units; normalize units explicitly at ingestion."
  },
  {
    "id": "q_c4_m1_165",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What does 'A' * 4 evaluate to in Python string expressions?",
    "options": [
      "'AAAA'",
      "TypeError",
      "260",
      "'A4'"
    ],
    "correct": 0,
    "explanation": "Multiplying a string by an integer repeats the string n times (often used for horizontal separator lines like '=' * 80)."
  },
  {
    "id": "q_c4_m1_166",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "Suppose a log parser processes s = 'web-01.internal' and calls s.strip('.internal'). Why does an analyst unexpectedly get 'web-01' only by luck while 'db-internal.internal' turns into 'db-internal.' or loses letters?",
    "options": [
      "strip() deletes everything after the first dot",
      "strip() interprets its argument as a set of individual characters to peel from both ends, NOT a whole suffix/prefix string — use removesuffix('.internal') in Python 3.9+",
      "strip() raises ValueError if more than one character is passed",
      "strip() works identically to removesuffix()"
    ],
    "correct": 1,
    "explanation": "Passing chars to str.strip(chars) peels ANY character in that set from either end (e.g., 'linda.log'.strip('.log') strips trailing 'l' and 'o' -> 'linda'!). Use .removesuffix() / .removeprefix() for exact substrings."
  },
  {
    "id": "q_c4_m1_167",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Given ports = [22, 80, 443], what happens if you attempt ports.remove(8080) when 8080 is absent from the list?",
    "options": [
      "Silently does nothing",
      "Returns False",
      "Raises ValueError: list.remove(x): x not in list",
      "Removes the last item instead"
    ],
    "correct": 2,
    "explanation": "list.remove(x) raises ValueError if x does not exist in the list; check 'if x in ports:' first when membership is uncertain."
  },
  {
    "id": "q_c4_m1_168",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Why does checking 'if user in failures:' on a dictionary run in O(1) average time just like checking a set, whereas 'if user in failures.values():' runs in O(N)?",
    "options": [
      "keys are always shorter strings than values",
      "values() are compressed with zlib",
      "Python forbids testing membership on .values()",
      "Keys are hashed directly into the dictionary's hash table, whereas .values() has no index and must be scanned linearly"
    ],
    "correct": 3,
    "explanation": "Dictionary lookup hashes keys exclusively; searching values sequentially touches every entry until a match or exhaustion."
  },
  {
    "id": "q_c4_m1_169",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "What does the membership test '22 in {22: \"ssh\", 443: \"https\"}' check?",
    "options": [
      "Whether 22 is a key in the dictionary",
      "Whether 22 is a value",
      "Whether 22 equals the length",
      "Raises TypeError"
    ],
    "correct": 0,
    "explanation": "The 'in' operator on a dictionary always tests key membership, never values."
  },
  {
    "id": "q_c4_m1_170",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Analyze: 'def is_privileged(port): return 0 <= port < 1024'. If a caller forgets to cast CSV text and passes port = '80', what happens?",
    "options": [
      "Returns True smoothly",
      "Raises TypeError because Python 3 rejects 0 <= '80'",
      "Returns False silently",
      "Converts '80' to ASCII 56"
    ],
    "correct": 1,
    "explanation": "Python 3 catches unparsed string comparisons against integers cleanly with TypeError, preventing silent CS2 miscalculations."
  },
  {
    "id": "q_c4_m1_171",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "In m01_foundations.py section 4, why does 'for p, name in services.items():' unpack two variables instead of one?",
    "options": [
      "dicts always have exactly two entries",
      "p holds the line index and name holds the key",
      "Each item yielded by .items() is a 2-tuple (key, value)",
      "Python requires two variables in every loop"
    ],
    "correct": 2,
    "explanation": ".items() yields (key, value) tuples which are unpacked cleanly into p and name on every iteration."
  },
  {
    "id": "q_c4_m1_172",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Compare a generator expression (x for x in log) against a list comprehension [x for x in log] when scanning a 4 GB authentication log line by line.",
    "options": [
      "List comprehension uses far less memory",
      "Both allocate identical RAM",
      "Generator expressions cannot be used inside for loops or sum()",
      "A list comprehension materializes every matching element in RAM immediately, whereas a generator expression yields items lazily one at a time in O(1) streaming memory"
    ],
    "correct": 3,
    "explanation": "Streaming huge logs through lazy iterators or generator expressions prevents memory exhaustion compared to building massive intermediate lists."
  },
  {
    "id": "q_c4_m1_173",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What is the exact output of str(443) + '!'?",
    "options": [
      "'443!'",
      "TypeError",
      "444",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "str(443) produces '443', which concatenates cleanly with '!' to form '443!'."
  },
  {
    "id": "q_c4_m1_174",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "When converting user-supplied decimal strings from telemetry (e.g., '0.75') into numbers, why must you avoid eval(text) completely?",
    "options": [
      "eval() cannot parse decimal points",
      "eval() executes arbitrary Python code inside the string, creating severe remote code execution risk on untrusted inputs; use float() or int() strictly",
      "eval() always returns strings",
      "eval() rounds numbers down to 0"
    ],
    "correct": 1,
    "explanation": "Never pass untrusted input to eval(): it runs full Python expressions (e.g., system calls), whereas int()/float() parse only numbers."
  },
  {
    "id": "q_c4_m1_175",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "Given s = 'FAILED', what is s[0:3]?",
    "options": [
      "'AIL'",
      "'FAIL'",
      "'FAI'",
      "'FAD'"
    ],
    "correct": 2,
    "explanation": "Slice [0:3] starts at index 0 and excludes index 3, capturing characters 0 ('F'), 1 ('A'), and 2 ('I')."
  },
  {
    "id": "q_c4_m1_176",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "How can an analyst include literal curly braces '{host}' inside a Python f-string alongside an evaluated variable {port}?",
    "options": [
      "Escape them with \\{host\\}",
      "Literal braces cannot appear inside f-strings",
      "Use single quotes inside double quotes",
      "Double the braces as '{{host}}'"
    ],
    "correct": 3,
    "explanation": "Inside f-strings, doubled braces {{ and }} render literal { and } characters while single {port} interpolates the expression."
  },
  {
    "id": "q_c4_m1_177",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "If tuple t = (22, 443), what happens on executing 't[0] = 2222'?",
    "options": [
      "Raises TypeError: 'tuple' object does not support item assignment",
      "t becomes (2222, 443)",
      "t silently converts into a list",
      "Deletes index 0"
    ],
    "correct": 0,
    "explanation": "Tuples are immutable sequences; attempting item reassignment raises TypeError."
  },
  {
    "id": "q_c4_m1_178",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Which expression tests whether threat_feed_a and threat_feed_b have ZERO overlapping IP addresses?",
    "options": [
      "threat_feed_a == threat_feed_b",
      "threat_feed_a.isdisjoint(threat_feed_b)",
      "threat_feed_a - threat_feed_b == threat_feed_a",
      "threat_feed_a ^ threat_feed_b"
    ],
    "correct": 1,
    "explanation": "set.isdisjoint(other) short-circuits immediately on the first common element and returns True cleanly when the intersection is empty."
  },
  {
    "id": "q_c4_m1_179",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "In Python, which statement allows you to leave a required empty branch temporarily during prototyping without causing IndentationError?",
    "options": [
      "skip",
      "noop",
      "pass",
      "null"
    ],
    "correct": 2,
    "explanation": "The pass statement serves as an explicit syntactic no-op placeholder where Python requires at least one indented statement."
  },
  {
    "id": "q_c4_m1_180",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Why does checking 'if isinstance(x, int):' unexpectedly match boolean values True and False in Python?",
    "options": [
      "True is a string of digits",
      "Python treats booleans as floats only",
      "isinstance() always returns True on primitives",
      "bool is a direct subclass of int, so isinstance(True, int) returns True; test isinstance(x, bool) first or check type(x) is int when strict integer validation is required"
    ],
    "correct": 3,
    "explanation": "In security policy validators accepting numeric counts or ports, checking isinstance(val, int) and not isinstance(val, bool) rejects accidental JSON true/false booleans."
  },
  {
    "id": "q_c4_m1_181",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "What does list(range(2, 10, 3)) produce?",
    "options": [
      "[2, 5, 8]",
      "[2, 5, 8, 10]",
      "[3, 6, 9]",
      "[2, 4, 6, 8]"
    ],
    "correct": 0,
    "explanation": "range(start=2, stop=10, step=3) yields 2, 5, 8 before reaching or exceeding stop=10."
  },
  {
    "id": "q_c4_m1_182",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Trace: counts = {}; logs = ['FAILED user=asha', 'FAILED user=ben']; if someone writes 'for line in logs: counts = {}', what happens after the loop ends?",
    "options": [
      "counts holds {'asha': 1, 'ben': 1}",
      "counts is overwritten on every iteration and retains only the last entry (or stays empty), demonstrating why accumulator initialization must occur BEFORE the loop",
      "Python raises UnboundLocalError",
      "counts sums only 'asha'"
    ],
    "correct": 1,
    "explanation": "Resetting an accumulator dictionary inside the loop body destroys prior iterations; accumulators must be initialized strictly outside the loop."
  },
  {
    "id": "q_c4_m1_183",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "medium",
    "q": "Which of the following is a valid PEP 8 descriptive snake_case variable name in Python (note reserved keywords cannot be used)?",
    "options": [
      "2fa_enabled",
      "failed-logins",
      "failed_login_count",
      "class"
    ],
    "correct": 2,
    "explanation": "Identifiers cannot begin with digits (2fa_enabled), contain hyphens (failed-logins), or collide with Python keywords like 'class'."
  },
  {
    "id": "q_c4_m1_184",
    "topic": "C04-M01-L01: Execution Model & Indentation",
    "difficulty": "difficult",
    "q": "If a programmer accidentally shadows a built-in function by naming a variable 'list = [22, 443]' or 'str = \"host\"', what fails two lines later when executing list(seen_ips)?",
    "options": [
      "Nothing fails; built-ins stay shielded in a separate namespace",
      "Python renames the variable automatically",
      "SyntaxError on variable assignment",
      "Raises TypeError: 'list' object is not callable because local name binding shadowed the built-in constructor"
    ],
    "correct": 3,
    "explanation": "Python permits binding names that mask built-ins like list, dict, set, str, or id—always choose domain names like port_list or raw_text instead."
  },
  {
    "id": "q_c4_m1_185",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "medium",
    "q": "What is the value of bool([]) and bool({}) in Python conditions?",
    "options": [
      "Both are False",
      "Both are True",
      "[] is False while {} is True",
      "Raises TypeError"
    ],
    "correct": 0,
    "explanation": "All empty built-in collections ([], {}, set(), (), '') evaluate to False in Boolean contexts."
  },
  {
    "id": "q_c4_m1_186",
    "topic": "C04-M01-L02: Variables, Types & Conversions",
    "difficulty": "difficult",
    "q": "Compare True division (5 / 2 = 2.5) and Floor division (-5 // 2) in Python. What does -5 // 2 return?",
    "options": [
      "-2 (truncating toward zero like C)",
      "-3 (Python floor division always rounds toward negative infinity)",
      "-2.5",
      "ZeroDivisionError"
    ],
    "correct": 1,
    "explanation": "Python's // operator performs true floor division toward negative infinity: -5 / 2 = -2.5 floors down to -3 (consistent with (-5) == (-3)*2 + 1)."
  },
  {
    "id": "q_c4_m1_187",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "medium",
    "q": "What does '2026-11-07'.replace('-', '/') return?",
    "options": [
      "['2026', '11', '07']",
      "'2026/11-07'",
      "'2026/11/07'",
      "None (mutated in place)"
    ],
    "correct": 2,
    "explanation": "str.replace(old, new) replaces all non-overlapping occurrences by default and returns a new string."
  },
  {
    "id": "q_c4_m1_188",
    "topic": "C04-M01-L03: Strings & Secure Text Handling",
    "difficulty": "difficult",
    "q": "When building formatted table rows with f-strings for terminal dashboards, what happens to 'f\"{user:<8}\"' if user = 'administrator_ops' (17 chars)?",
    "options": [
      "It silently truncates the string to 'administ'",
      "It pads spaces on the left",
      "It raises ValueError",
      "Width '<8' specifies a MINIMUM field width, so 'administrator_ops' prints in full (breaking column alignment unless explicitly truncated via ':.8')"
    ],
    "correct": 3,
    "explanation": "Alignment width alone never truncates long strings in Python format specs; combine precision if truncation is wanted (e.g., f'{user:<8.8}')."
  },
  {
    "id": "q_c4_m1_189",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "What does max([22, 80, 443, 8080]) return, and what happens on max([])?",
    "options": [
      "8080; max([]) raises ValueError: max() iterable argument is empty",
      "8080; max([]) returns None",
      "22; max([]) returns 0",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "Calling min() or max() on an empty sequence raises ValueError unless a default=... keyword argument is supplied."
  },
  {
    "id": "q_c4_m1_190",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "difficult",
    "q": "Suppose ips = ['10.0.0.5', '10.0.0.9', '10.0.0.5']. Why does list(set(ips)) lose original order, whereas list(dict.fromkeys(ips)) preserves first-seen order while deduplicating?",
    "options": [
      "set() reverses items",
      "dict keys preserve insertion order in Python 3.7+, so dict.fromkeys(ips) removes duplicates while keeping initial arrival order",
      "dict.fromkeys() fails if strings contain dots",
      "list(set(ips)) keeps insertion order"
    ],
    "correct": 1,
    "explanation": "Because dictionaries retain insertion order natively, list(dict.fromkeys(ips)) is the clean O(N) idiom for order-preserving deduplication."
  },
  {
    "id": "q_c4_m1_191",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "medium",
    "q": "Which operator yields True ONLY when BOTH conditions hold true?",
    "options": [
      "or",
      "not",
      "and",
      "xor"
    ],
    "correct": 2,
    "explanation": "The binary logical 'and' operator requires both left and right conditions to evaluate truthy."
  },
  {
    "id": "q_c4_m1_192",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "Look at: 'if ip.startswith(\"10.\") or ip.startswith(\"192.168.\"): tag = \"private\"'. Which bug lurks if raw_ip was never stripped or parsed with ipaddress?",
    "options": [
      "or rejects multiple startswith() calls",
      "startswith() takes only single-character strings",
      "Strings cannot contain periods inside conditions",
      "Valid private RFC 1918 addresses in 172.16.0.0/12 (and '10.0.0.1 ' with trailing space or spoofed hostnames like '10.attacker.com') are misclassified by naive prefix string matching"
    ],
    "correct": 3,
    "explanation": "Prefix checks on strings miss 172.16.0.0/12 entirely and confuse valid hostnames/CIDR ranges; real IP classification belongs in the standard library ipaddress module (Module 2)."
  },
  {
    "id": "q_c4_m1_193",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Given log_lines = ['A', 'B', 'C'], what does the last iteration of 'for idx, line in enumerate(log_lines, start=1):' yield?",
    "options": [
      "(3, 'C')",
      "(2, 'C')",
      "(3, 'B')",
      "(4, 'C')"
    ],
    "correct": 0,
    "explanation": "With start=1, enumerate pairs elements with 1, 2, 3, yielding (3, 'C') on the third and final element."
  },
  {
    "id": "q_c4_m1_194",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "difficult",
    "q": "Why does m01_foundations.py use 'zip' or paired unpacking conceptually when combining column lists, and what happens if two lists passed to zip(users, counts) have unequal lengths?",
    "options": [
      "zip() pads the shorter list with None automatically",
      "By default, zip() stops silently at the end of the shortest iterable, potentially dropping trailing alerts unless strict=True (Python 3.10+) is passed",
      "zip() raises IndexError on mismatch",
      "zip() repeats the shorter list"
    ],
    "correct": 1,
    "explanation": "Silent truncation in zip(a, b) can silently drop security records if two parallel telemetry lists drift in length; Python 3.10 added zip(a, b, strict=True) to fail loudly with ValueError on length mismatch."
  },
  {
    "id": "q_c4_m1_195",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "medium",
    "q": "In m01_foundations.py section 1, which five core built-in type names print on the first output line?",
    "options": [
      "char int double boolean void",
      "text num decimal bit null",
      "str int float bool NoneType",
      "string integer float bool none"
    ],
    "correct": 2,
    "explanation": "Line 1 of m01_foundations.py verified output is exactly '1. str int float bool NoneType'."
  },
  {
    "id": "q_c4_m1_196",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "During Practical P1 step 2d, you append three lines of 'FAILED user=ben' to log with THRESHOLD = 3. In what exact order do output lines print in section 8?",
    "options": [
      "totals prints before both alerts",
      "ALERT lines print alphabetically after the loop ends",
      "Only ben triggers an alert",
      "First '8. ALERT: asha reached 3 failures', then '8. ALERT: ben reached 3 failures', and finally '   totals: {\"asha\": 4, \"chen\": 1, \"ben\": 3}'"
    ],
    "correct": 3,
    "explanation": "Alerts print immediately during loop traversal as each user reaches THRESHOLD, while totals print once after the entire log list finishes."
  },
  {
    "id": "q_c4_m1_197",
    "topic": "C04-M01-L04: Data Structures & Memory Model",
    "difficulty": "medium",
    "q": "Which dictionary method removes a specific key if you need its associated value back (or returns a default if missing)?",
    "options": [
      "dict.pop(key, default)",
      "dict.delete(key)",
      "dict.remove(key)",
      "dict.cut(key)"
    ],
    "correct": 0,
    "explanation": "d.pop(key, default) removes key from the dictionary and returns its value (or default if absent, preventing KeyError)."
  },
  {
    "id": "q_c4_m1_198",
    "topic": "C04-M01-L05: Conditions & CS2",
    "difficulty": "difficult",
    "q": "If a firewall rule check uses 'if port in [22, 3389]:' versus 'if port in {22, 3389}:', how does CPython actually optimize constant literal sets in recent versions, and why does using {...} remain good habit?",
    "options": [
      "Lists raise TypeError in membership checks",
      "Sets express mathematical set-membership intent directly and retain O(1) lookup semantics when refactored into dynamic or larger global allow/block collections",
      "Tuples are forbidden inside if checks",
      "Dictionaries cannot hold ports"
    ],
    "correct": 1,
    "explanation": "Writing membership tests against sets ({22, 3389} or frozenset) cleanly communicates order-independent membership and guarantees O(1) lookup once collections grow beyond a few literals."
  },
  {
    "id": "q_c4_m1_199",
    "topic": "C04-M01-L06: Loops, Comprehensions & CS1",
    "difficulty": "medium",
    "q": "Which error will Python report if you accidentally try to access a list item at position 5 in a 3-element list, such as [10, 20, 30][5]?",
    "options": [
      "KeyError",
      "ValueError",
      "IndexError",
      "IndentationError"
    ],
    "correct": 2,
    "explanation": "Out-of-bounds integer indexing on sequences (list, tuple, str) triggers IndexError."
  },
  {
    "id": "q_c4_m1_200",
    "topic": "C04-M01-P1 & P2: Practical Labs & Debugging",
    "difficulty": "difficult",
    "q": "Why does Course 04 M01 emphasize 'predict the output before running the script' in Practical P1?",
    "options": [
      "Python executes faster when you guess beforehand",
      "To bypass PEP 8 syntax checks",
      "To verify internet access before installing third-party dependencies",
      "Explicit prediction-then-verification exposes hidden misconceptions about references, truthiness, short-circuiting, and off-by-one slices before they become silent security bugs in production scripts"
    ],
    "correct": 3,
    "explanation": "Building an accurate mental execution model prevents subtle logic bugs (like CS2 string comparisons or aliasing errors) that pass syntax checks yet produce wrong security decisions."
  }
];
