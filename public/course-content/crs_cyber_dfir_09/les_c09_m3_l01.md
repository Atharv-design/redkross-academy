MBR (Master Boot Record) is the legacy scheme. Sector 0 holds boot code and a table of four primary partition entries, each with a type, a starting LBA and a size, with extended partitions for more. 32-bit fields limit it to about 2 TiB with 512-byte sectors. GPT (GUID Partition Table), part of the UEFI specification, starts with a protective MBR in sector 0, then a GPT header in LBA 1 and partition entries, which are usually 128. A backup header and table sit at the end of the disk. Partitions have GUID types and unique GUIDs.

**Forensic points:**

- Space before the first partition, between partitions and after the last can hide data.
- A damaged primary GPT can be rebuilt from the backup copy.
- The Sleuth Kit's mmls lists partitions and unallocated gaps.

Our lab images are partitionless file systems (a "superfloppy"), so the tools are run directly on the image.
