Memory holds connection objects with local and remote address and port, state, owning PID and sometimes creation time. These include recently closed connections, which netstat would no longer show. Open handles show files, registry keys, mutexes (often used by malware as infection markers) and named pipes. On Linux, live equivalents are in /proc/net/tcp (and tcp6, udp) and in /proc/<pid>/fd. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
== listening TCP sockets from /proc/net/tcp (state 0A = LISTEN)
0100007F:20FB inode=321697
== decode 0100007F:20FB
127.0.0.1 8443
== map socket inode to process
/proc/7 -> socket:[321697]
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

**How to read it:**

- Addresses in /proc/net/tcp are hexadecimal. The IPv4 address is stored in host byte order (little-endian on x86), so 0100007F is 127.0.0.1. Python's struct.pack('<I', ...) reverses it.
- The port is plain hex: 0x20FB = 8443.
- The socket inode links the connection to PID 7, the python3 listener.
- Memory frameworks follow the same chain (socket -> file descriptor -> process) inside the image.
