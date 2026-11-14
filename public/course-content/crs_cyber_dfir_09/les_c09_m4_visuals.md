## Memory acquisition decision

![A decision tree. Powered-off systems use on-disk memory remnants, VMs use hypervisor snapshots, and physical systems use an approved tool writing to external storage, followed by hashing and then disk acquisition.](/assets/courses/cyber-09/C09-M04-F1.svg)
*Figure C09-M04-F1. Choosing a memory acquisition path before containment or shutdown.*

## From socket to process

![A chain from a /proc/net/tcp line, decoded to 127.0.0.1 port 8443, through the socket inode to a file descriptor of PID 7, the python3 listener.](/assets/courses/cyber-09/C09-M04-F2.svg)
*Figure C09-M04-F2. Linking a listening socket to its process via the socket inode (execution-tested values).*

## Indicators of a masquerading process

![A two-column comparison listing parent PID, executable link, command line and deleted status for a genuine kernel thread and the suspicious process.](/assets/courses/cyber-09/C09-M04-F3.svg)
*Figure C09-M04-F3. Comparing a genuine kernel worker thread with the lab's masquerading process.*
