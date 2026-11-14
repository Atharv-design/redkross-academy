LAB_ASSETS/C21/m01_runtime.py (execution-tested, CPython 3.14.4, Docker Engine 29.4.2) starts two short-lived containers from nginx:alpine: one with no options and one with --read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges --user 101:101 --pids-limit 64 --memory 128m. Inside each it reads /proc/self/status, lists /proc/self/ns and reads the root mount options from /proc/mounts. It decodes the capability mask using the bit numbers from the kernel's capability.h. Output (execution-tested, 2026-11-07; long lines wrapped):

```output
Image: nginx:alpine

[default] docker run (no options)
  uid inside container : 0
  CapEff               : 00000000a80425fb (14 capabilities)
  capabilities         : chown, dac_override, fowner, fsetid, kill,
                         setgid, setuid, setpcap, net_bind_service,
                         net_raw, sys_chroot, mknod, audit_write, setfcap
  NoNewPrivs           : 0
  Seccomp mode         : 2 (2 = filter active)
  root mount option    : rw (rw = writable, ro = read-only)

[hardened] docker run --read-only --tmpfs /tmp --cap-drop ALL
           --security-opt no-new-privileges --user 101:101
           --pids-limit 64 --memory 128m
  uid inside container : 101
  CapEff               : 0000000000000000 (0 capabilities)
  capabilities         : (none)
  NoNewPrivs           : 1
  Seccomp mode         : 2 (2 = filter active)
  root mount option    : ro (rw = writable, ro = read-only)

Namespaces seen by the container (inode numbers differ per container):
   cgroup cgroup:[4026532627]
   ipc ipc:[4026532625]
   mnt mnt:[4026532623]
   net net:[4026532628]
   pid pid:[4026532626]
   pid_for_children pid:[4026532626]
   time time:[4026531834]
   time_for_children time:[4026531834]
   user user:[4026531837]
   uts uts:[4026532624]

Capabilities removed by hardening: 14
```

**Interpretation:**

- The default container is root (UID 0) with 14 capabilities, can gain privileges through setuid binaries (NoNewPrivs 0) and can modify its own filesystem - including replacing binaries an attacker might later run.
- The hardened container keeps the same seccomp filter but has no capabilities, cannot gain privileges, cannot write outside /tmp, and is capped at 64 processes and 128 MiB.
- The user (4026531837) and time (4026531834) namespace identifiers match the host PID 1 values recorded in m01_host_ns_check.txt; the other six are private to the container. Together with uid_map "0 0 4294967295" this confirms that no user namespace remapping is active.

**Limitations:** nginx:alpine was chosen because it contains a shell and awk; distroless images (Module 2) have neither, so you would inspect them with "docker inspect" or from the host instead. The probe measures one moment; privileges can also be granted later through docker exec options.
