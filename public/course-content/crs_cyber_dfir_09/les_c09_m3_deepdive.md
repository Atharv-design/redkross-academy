The Sleuth Kit (TSK) organises its tools by layer [R2]:

```text
Volume (mm*)        mmls   partition layout and gaps
File system (fs*)   fsstat file system details (the lab's FAT16 output
                           showed type, OEM name "MTOO4048", volume ID
                           and label)
File name (f*)      fls    names, including deleted ones (*)
Metadata (i*)       istat  inode, MFT or directory-entry details
                    icat   content by metadata address
                    ils    list metadata entries
Data unit (blk*)    blkcat, blkls  raw blocks or clusters; unallocated
                                   space for carving
Timeline            fls -m + mactime
```

Typical workflow on an image:

```text
mmls disk.img                 -> find the partition offset (sectors)
fsstat -o <offset> disk.img   -> file system type and parameters
fls -r -o <offset> disk.img   -> walk names; note the * entries
istat -o <offset> disk.img N  -> metadata and block list
icat -o <offset> disk.img N > recovered.bin ; sha256sum recovered.bin
fls -r -m / -o <offset> disk.img > body.txt ; mactime -b body.txt -d -z <TZ>
```

In the lab the script found the deleted entry's address automatically with fls -d (deleted only) and sed, then passed it to istat and icat. Autopsy is a graphical front end over TSK.

**Validation:** run two tools where findings matter (for example TSK and a second tool) and compare. The Casey Anthony case below shows why.
