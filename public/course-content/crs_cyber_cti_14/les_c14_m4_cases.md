## Olympic Destroyer's false flag, 2018 Context: on 8 March 2018 Kaspersky's GReAT published "The devil's in the Rich header" about Olympic Destroyer, malware used in the attack on the PyeongChang 2018 Winter Olympics; its wiper component removed shadow copy backups, traversed shared folders and wiped files [C14-M04-R2]. What happened: the wiper's Rich header (build metadata that compilers embed in Windows executables) was identical to one seen in samples of the Bluenoroff group, associated with Lazarus. Researchers note that a shared Rich header suggests a shared build environment, so the artefact pointed towards Lazarus. Kaspersky decoded the header and compared it with the binary: the header described components that did not match the code actually present (the binary showed an MSVC 2010 build and references inconsistent with the header's records). Its conclusion: the Rich header in the wiper "was deliberately copied from the Bluenoroff samples" and "is a fake and has no connection with the contents of the binary". Lessons: - Distinctive artefacts can be planted precisely because analysts rely on them. - Check internal consistency: a fingerprint that contradicts other properties of the same sample is evidence of manipulation. - Treat attribution based on one artefact class as weak; require several independent lines of evidence.



## (FICTIONAL TEACHING SCENARIO): The headline that named a state

**Context:** after the 28 October contact, a Nilgiri manager forwarded the RPT-003 paste-site claim to the board with the subject line "State hackers attacking us".

**What happened:** the board asked whether to report to the government and whether insurance cover for state-sponsored attacks applied. The CTI team had to retract the claim publicly inside the company, losing credibility for its next warning.

**Response:** a rule that only the CTI lead releases actor statements; templates that state the attribution level and confidence; a standing paragraph explaining why defence does not depend on attribution; and a short board briefing on how attribution works.

**Lessons:** unsupported attribution travels fastest. Set rules before the incident.
