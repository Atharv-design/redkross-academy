**Main contents of RAM:**

- Kernel structures. On Windows these include the EPROCESS and ETHREAD lists and the loaded driver list. On Linux, task_struct, the module list and socket structures.
- Process address spaces: executable images, DLLs and shared objects, heaps, stacks, environment variables and command lines.
- Network state: connection tables and listening sockets.
- Caches: file cache pages, registry hives in memory, and clipboard and console history.
- Secrets: credentials (Windows LSASS process memory), encryption keys for mounted volumes, and session tokens.

The secrets mean memory images are highly sensitive. Store and transfer them as sensitive evidence, and limit who may analyse them.

**Related on-disk sources:** the pagefile/swap (paged-out memory); hiberfil.sys (compressed memory at hibernation); and crash dumps (MEMORY.DMP).
