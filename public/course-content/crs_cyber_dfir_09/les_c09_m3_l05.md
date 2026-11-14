| Term | Meaning |
|---|---|
| Metadata-based recovery | uses surviving directory entries, MFT records or inodes to locate content (FAT and NTFS often; ext4 rarely). |
| File carving | searches unallocated space for file signatures (headers and footers such as PDF "%PDF", ZIP "PK\x03\x04", JPEG FF D8 FF) and extracts candidate files without file-system metadata. Tools include PhotoRec, Foremost and Scalpel (Not execution-tested here). Fragmentation and partial overwrites produce broken or merged files, so validate what is carved. |
| Slack space | the unused bytes between a file's end and the end of its last cluster may hold remnants of older data. |
| SSDs and TRIM | on SSDs, the OS issues TRIM for freed blocks. The drive may erase them internally, and reads of trimmed blocks may return zeros. Deleted-data recovery from SSDs is therefore often limited. |
| Secure deletion and encryption | wiping tools and full-disk encryption with key destruction make recovery infeasible. The presence of wiping tools can itself be an artefact. |

Report recovered files with their source: entry or inode number, sectors or blocks, the method used, and whether content may be incomplete.
