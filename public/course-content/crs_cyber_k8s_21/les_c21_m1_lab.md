> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Measure container privileges

**Objective:** Measure and compare the privileges of default and hardened containers and explain each difference.

**Difficulty:** Intermediate.

**Required tools:** Docker; Python 3.10+; LAB_ASSETS/C21/m01_runtime.py.

**Prerequisites:** Lessons L01, L04, L05.

**Environment setup:** Docker running locally; "docker pull nginx:alpine" and "docker pull alpine:3.20" once.

**Explicit authorised scope:** your own Docker host only. Containers are started with --rm and removed automatically.

**Step-by-step instructions:**

1. Run: python m01_runtime.py   (on Git Bash for Windows, first run "export MSYS_NO_PATHCONV=1" so container paths are not rewritten).
2. Record the CapEff values and decode them by hand for three bits using the table at the top of the script (bit 0 = chown, bit 13 = net_raw).
3. Re-run with another image you use, for example "python m01_runtime.py alpine:3.20", and compare.
4. Run "docker run --rm alpine:3.20 cat /proc/self/uid_map" and explain what the output means for root in the container.
5. Write one paragraph for a platform team: which three options should be default for every service container, and why.

**Expected observations:** 14 capabilities and UID 0 by default; 0 capabilities, UID 101, NoNewPrivs 1 and a read-only root when hardened; uid_map "0 0 4294967295" (no remapping).

**Troubleshooting:** on Git Bash, an error naming a path such as "C:/Program Files/Git/etc/..." means MSYS rewrote a container path (this happened during lab development) - set MSYS_NO_PATHCONV=1. Images without a shell (distroless) cannot run the probe; use docker inspect.

**Cleanup:** none needed (--rm); optionally "docker image rm nginx:alpine".

**Learning outcome:** you can measure, not assume, what a container may do.

## Practical 2: Harden a service container and prove it still works

**Objective:** Run the deliberately weak kestrel-api:bad image with hardened runtime options, confirm the service works, and record the evidence.

**Difficulty:** Intermediate.

**Required tools:** Docker; curl; LAB_ASSETS/C21/images (build the image with "docker build -f Dockerfile.bad -t kestrel-api:bad ." in that folder).

**Prerequisites:** P1.

**Environment setup:** as P1.

**Explicit authorised scope:** your own Docker host; the service listens on 127.0.0.1 only.

**Step-by-step instructions:**

1. docker run -d --name p2 -p 127.0.0.1:18090:8080 --read-only --cap-drop ALL --security-opt no-new-privileges --user 10001:10001 --pids-limit 64 --memory 128m kestrel-api:bad
2. curl -s [http://127.0.0.1:18090/healthz](http://127.0.0.1:18090/healthz)
3. docker exec p2 sh -c "id; touch /srv/x" and docker exec p2 grep -E "CapEff|NoNewPrivs" /proc/1/status
4. Record the security fields with docker inspect (ReadonlyRootfs, CapDrop, SecurityOpt, PidsLimit, Memory, Config.User).
5. Test the "needs NET_BIND_SERVICE for port 80" assumption: run a one-line Python bind to port 80 as UID 10001 with --cap-drop ALL, then read /proc/sys/net/ipv4/ip_unprivileged_port_start inside a container and on --net=host. Explain the result.
6. Note what the hardening could NOT fix in this image (Module 2).

Expected observations (execution-tested, m01_p2_output.txt): healthz returns {"service": "kestrel-api", "status": "ok"}; id shows uid=10001; touch fails with "Read-only file system"; CapEff 0000000000000000 and NoNewPrivs 1; the port-80 bind succeeds; the sysctl reads 0 in the container namespace and 1024 in the host namespace. Runtime options cannot remove the vulnerable Python packages or the secrets baked into the image.

**Troubleshooting:** if the service fails under --read-only, find what it writes (docker diff on a non-read-only run) and give it a --tmpfs mount for that path only.

**Cleanup:** docker rm -f p2

**Learning outcome:** you can harden at run time, verify with evidence, and recognise the limits of run-time hardening.
