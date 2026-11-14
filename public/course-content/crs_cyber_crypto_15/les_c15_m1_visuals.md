## Goals and the primitives that provide them

![A two-column table mapping five security goals to the cryptographic primitives that provide them.](/assets/courses/cyber-15/C15-M01-F1.svg)
*Figure C15-M01-F1. Each security goal maps to specific primitives.*

## From entropy to token

![A vertical flow from hardware entropy to the kernel generator to Python's secrets module, with a note excluding the random module.](/assets/courses/cyber-15/C15-M01-F2.svg)
*Figure C15-M01-F2. Security values must come from the OS CSPRNG, not a general-purpose PRNG.*

## Entropy scale

![A horizontal scale from 13 bits for a PIN to 256 bits for an AES-256 key, indicating that higher values are beyond brute force.](/assets/courses/cyber-15/C15-M01-F3.svg)
*Figure C15-M01-F3. Approximate entropy of common secrets (values from the execution-tested lab; time labels are qualitative).*
