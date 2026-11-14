## GPT disk layout

![A horizontal bar showing protective MBR at LBA 0, GPT header at LBA 1, entries, two partitions, an unallocated gap and backup structures at the end of the disk.](/assets/courses/cyber-09/C09-M03-F1.svg)
*Figure C09-M03-F1. A GPT disk with protective MBR, primary header and entries, partitions, possible gaps and backup structures at the end.*

## What deletion changes (FAT)

![Before-and-after rows showing the directory entry first byte changed to E5 and the FAT entry set to free, while the data cluster content is unchanged.](/assets/courses/cyber-09/C09-M03-F2.svg)
*Figure C09-M03-F2. FAT deletion marks the name and frees the cluster but leaves content until it is overwritten (consistent with the execution-tested recovery).*

## Sleuth Kit layers

![A stack of six layers from volume to timeline, each listing the Sleuth Kit tools used at that layer.](/assets/courses/cyber-09/C09-M03-F3.svg)
*Figure C09-M03-F3. TSK tools by analysis layer.*
