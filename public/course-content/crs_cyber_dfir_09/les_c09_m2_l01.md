```text
Physical (full disk)  every sector of the device, including unallocated
                      space and slack. It allows deleted-file recovery
                      (Module 3), and is the most complete option and the
                      slowest.
Logical (volume)      one partition or volume, which is quicker. It may
                      miss data outside the partition.
Targeted/logical file selected files or folders, such as a mailbox or
                      logs. It is fast and proportionate but loses deleted
                      data and some metadata. Use it when scope is narrow
                      or the system cannot be taken offline.
Live                  from a running system: memory (Module 4), open
                      encrypted volumes, and cloud APIs. Changes the system
                      slightly, so document the footprint.
Dead (offline)        from a powered-off device via a write blocker,
                      which is the most controlled option.
```

Encryption changes the calculus. If BitLocker, FileVault or LUKS protects a running system, a dead acquisition yields ciphertext unless you have the recovery key. Live logical acquisition of the unlocked volume, or obtaining keys from IT escrow under authority, may be required.
