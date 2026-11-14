ext4, the common Linux default, divides the disk into block groups with inode tables. An inode holds metadata (mode, owner, size, timestamps, link count) and an extent tree pointing to data blocks. Directories map names to inode numbers. A journal (jbd2) records metadata changes for crash recovery.

**Timestamps:** atime, mtime, ctime (inode change) and crtime (birth). They use nanosecond resolution in large inodes and are stored as UTC epoch-based values, so there is no time-zone ambiguity in storage. Display still needs care.

**Deletion and recovery:** when the Linux kernel deletes a file on ext4, the inode is freed and its link count set to zero. The deletion time is set, and the kernel typically clears the extent information in the inode. This is why classic inode-based recovery (icat on the deleted inode) often fails on ext4, and examiners turn to file carving, journal analysis or application artefacts. This is commonly documented behaviour. In our lab it was Not execution-tested with a kernel deletion, because that requires mounting.

**Execution-tested contrast:** our lab built the ext4 image with mke2fs -d and deleted the file with debugfs rm. That userspace deletion left the extent in place, so recovery succeeded:

```text
------------------------------------------------------------- BEGIN OUTPUT
r/r * 13: customers.csv
inode: 13
Not Allocated
Flags: Extents,
size: 36
num of links: 0
Deleted: 2026-11-07 05:50:35 (UTC)
Direct Blocks:
1204
-- icat:
export of customer list - FICTIONAL
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; selected lines)
```

The lesson is about method as much as file systems. A test that deletes files differently from the real world can give misleadingly optimistic results. Validate recovery techniques with the same deletion path the suspect would have used.
