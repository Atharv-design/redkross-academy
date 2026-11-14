MACB means Modified (content), Accessed, Changed (metadata; on NTFS the MFT entry change time) and Born (created). The details differ by file system and OS:

- Windows disables last-access updates by default on many versions, or makes them lazy.
- Copying a file usually gives the copy a new creation time but keeps the modification time, so "modified before created" can indicate a copy.
- Timestamps can be manipulated (timestomping), and clocks can be wrong.

A file-system timeline puts every timestamp of every file in order. The Sleuth Kit makes a "body file" with fls -m, then mactime sorts it. Execution-tested on the ext4 image:

```text
------------------------------------------------------------- BEGIN OUTPUT
Date,Size,Type,Mode,UID,GID,Meta,File Name
Sat Nov 07 2026 05:50:35,12288,macb,d/drwx------,0,0,11,"/lost+found"
Sat Nov 07 2026 05:50:35,36,macb,r/rrw-r--r--,0,0,13,"/customers.csv
(deleted)"
Sat Nov 07 2026 05:50:35,26,macb,r/rrw-r--r--,0,0,14,"/notes.txt"
Sat Nov 07 2026 05:50:35,52,macb,r/rrw-r--r--,0,0,15,"/payroll_q3.txt"
--------------------------------------------------------------- END OUTPUT
(execution-tested; mactime -d -z UTC; one line wrapped)
```

All four times ("macb") are identical because the image was built and modified within one second. Real timelines contain thousands of rows. Filter them by time window and path, then correlate with logs (Module 6). mactime also printed Perl warnings ("Old package separator ... deprecated"). These are harmless here but worth noting in tool-validation records. Image hashes were identical before and after all analysis (execution-tested: e766800e... for FAT, 4f845095... for ext4). Read-only analysis of an image does not change it.
