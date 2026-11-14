Entropy, in bits, measures unpredictability: a value chosen uniformly from N possibilities has log2(N) bits. Each extra bit doubles the attacker's search. Execution-tested estimates (uniform random choice assumed):

```text
------------------------------------------------------------- BEGIN OUTPUT
  4-digit PIN                      13.3 bits
  8 lowercase                      37.6 bits
  12 mixed (94 printable)          78.7 bits
  6 words from 7776-word list      77.5 bits
  token_hex(16)                   128.0 bits
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

**Interpretation:**

- These figures apply only to values chosen randomly by a machine. Human-chosen passwords have far less entropy than their length suggests, because people use patterns. That is why password storage must be slow (Module 4) and why NIST SP 800-63B-4 stresses length and breached-password screening (Course 01).
- 128-bit symmetric keys and tokens are far beyond brute force with classical computers. 256-bit keys add margin, including against Grover's algorithm on future quantum computers, which roughly halves effective symmetric key strength.
- Six random diceware words give about 77.5 bits, comparable to 12 random printable characters, and are easier to type and remember.
