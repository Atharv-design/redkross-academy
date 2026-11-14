Volatility 3 is an open-source framework from the Volatility Foundation that analyses memory images of Windows, Linux and macOS. It uses symbol tables describing OS structures [R2]. The latest release on 2026-11-07 was v2.28.2 (17 September 2026). Windows symbols are fetched and cached automatically, while Linux and macOS symbol tables must be produced for the exact kernel. Commonly used plugins (names confirmed in the source tree on 2026-11-07; Not execution-tested in this module because no authorised sample image was available in the build environment):

| Term | Meaning |
|---|---|
| windows.info | image and OS details |
| windows.pslist | processes from the active process list |
| windows.psscan | scans for process structures, including hidden or exited ones (compare with pslist) |
| windows.pstree | parent-child tree |
| windows.cmdline | command lines |
| windows.netscan | network connections and sockets |
| windows.dlllist | loaded modules |
| windows.malfind | suspicious memory regions (e.g. executable private memory). Recent releases also place it, with related detections such as psxview and hollowprocesses, under `windows.malware.*.` Check "vol -h" for your version. |
| windows.handles | open handles |
| linux.pslist, linux.bash, linux.sockstat | Linux equivalents |

**Workflow:** identify the profile automatically (windows.info); list processes two ways (pslist and psscan) and compare; review the tree and command lines; review network objects; check suspicious processes with dlllist and malfind; dump suspect regions for malware analysis (Course 10); and record every command and plugin version. Linux analysis needs a symbol table matching the exact kernel, so record kernel versions during live response. Practise with public training images published for education by universities, CTF organisers and tool authors. Check their licence and provenance.
