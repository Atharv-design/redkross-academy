FAT12/16/32 and exFAT are simple and still common on removable media and cameras. Structures:

- The boot sector (BPB) gives cluster size and the locations of the other structures.
- The File Allocation Table chains clusters for each file. 0 means free.
- Directory entries are 32 bytes, holding the 8.3 name, attributes, timestamps, first cluster and size. Long names use extra LFN entries.

Deletion on FAT replaces the first byte of the short name with 0xE5 and marks the file's clusters as free in the FAT. The directory entry keeps the size and first cluster, so contiguous files are often fully recoverable. Fragmented ones are harder, because the chain has been cleared.

**Timestamps:** created (to 10 ms), written (2-second resolution) and accessed (date only). FAT stores local time with no time-zone field, so the examiner must establish the device's time zone. Execution-tested (LAB_ASSETS/C09/rk_c09_fs_lab.sh, TSK 4.12.1): after mdel ::customers.csv on a FAT16 image, the deleted file was listed and recovered:

```text
------------------------------------------------------------- BEGIN OUTPUT
r/r 6:   payroll_q3.txt
r/r 7:   notes.txt
r/r * 9: customers.csv
-- istat 9
Not Allocated
Size: 36
Name: _USTOM~1.CSV
Written:  2026-11-07 05:50:34 (UTC)
Accessed: 2026-11-07 00:00:00 (UTC)
Created:  2026-11-07 05:50:34 (UTC)
Sectors: 289
-- icat 9 (recovered content)
export of customer list - FICTIONAL
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; selected lines)
```

**Observations:**

- fls marks deleted entries with `"*".`
- The short name's first character is shown as "_" because the 0xE5 marker overwrote "C". fls recovered the long name from the LFN entries.
- Accessed shows 00:00:00 because FAT stores only the access date.
- TSK printed "(UTC)" because no time zone was given, so it treated the stored local times as UTC. The container's clock was UTC, so here that is correct. On a real device, give the device's zone to istat and fls with -z. Practical P2 shows that setting it only at the mactime display stage is not enough.
