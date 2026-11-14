A cryptographic hash function maps data of any size to a fixed-size digest. Changing any bit changes the digest unpredictably, and finding two inputs with the same digest (a collision) should be infeasible. In forensics, hashes prove that an image is identical to its source at acquisition and that it has not changed since.

```text
MD5 (128-bit) and SHA-1 (160-bit): practical collision attacks exist.
NIST announced in December 2022 that SHA-1 will be phased out of its
remaining specified protocols by 31 December 2030, and recommends moving
to SHA-2 or SHA-3 as soon as possible [R4]. They remain common in
legacy tools and hash sets. Use them only alongside SHA-256, never alone
for integrity of new evidence.
SHA-256 (SHA-2 family): the current default for evidence integrity.
```

Execution-tested acquisition (LAB_ASSETS/C09/rk_c09_acquire_lab.sh, Debian container):

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. hash source before acquisition
e3a74e55ea5520102b3b9458e4fd1eeec4c9a92958082c68953b754e44a60f21  suspect.dev
== 2. acquire: dd -> tee -> image file and hash in one pass
e3a74e55ea5520102b3b9458e4fd1eeec4c9a92958082c68953b754e44a60f21  evidence.dd
(stream)
== 3. verify image file
e3a74e55ea5520102b3b9458e4fd1eeec4c9a92958082c68953b754e44a60f21  evidence.dd
size 16777216 bytes
== 5. one-byte change in working copy at offset 100000
16d816db2d0761c01f8a6d0e8d88870f98a1bbdbf5bae5c95d99a26c9bb47f2c  working.dd
evidence.dd working.dd differ: char 100001, line 1
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; one line wrapped)
```

**Reading it:**

- The source hash, the hash computed in-stream during acquisition, and the re-hash of the image file all match. That match is your integrity statement.
- A single "X" written at byte offset 100000 changed the digest completely, and cmp located the difference at byte 100001 (cmp counts from 1).
- The command used conv=noerror,sync, which continues past read errors and pads unreadable blocks with zeros. With a large block size (4 MB here), one bad sector would zero the whole 4 MB block. For damaged media, prefer a small block size or a tool designed for it, such as GNU ddrescue, and record the error log.

On Windows, PowerShell's Get-FileHash -Algorithm SHA256 produces the same digest for the same file.
