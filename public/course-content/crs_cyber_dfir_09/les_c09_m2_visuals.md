## Acquisition with a write blocker

![A suspect disk connects through a write blocker to a forensic workstation, which writes an image, a hash and a log to a separate evidence drive.](/assets/courses/cyber-09/C09-M02-F1.svg)
*Figure C09-M02-F1. The write blocker passes reads and blocks writes between the suspect disk and the workstation.*

## One-pass hashing pipeline

![A stream from dd splits at tee into the image file and sha256sum; the re-hashed file and the stream hash both equal e3a7...f21.](/assets/courses/cyber-09/C09-M02-F2.svg)
*Figure C09-M02-F2. The lab pipeline hashes the stream and the written file; both equal the source hash (execution-tested).*

## Master and working copies

![A source is acquired to a master copy in sealed storage, from which two verified working copies are made for analysis.](/assets/courses/cyber-09/C09-M02-F3.svg)
*Figure C09-M02-F3. Analysis happens on verified working copies; the master is never used directly.*
