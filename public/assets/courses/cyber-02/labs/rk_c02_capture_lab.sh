#!/bin/sh
# RedKross Academy - Course 02 local packet capture lab
# Creates an isolated Docker network with a web server, a capture container
# and short-lived clients, generates HTTP, ICMP and UDP traffic, and saves
# rk_c02_lab.pcap in the current directory.
#
# Scope: everything runs on YOUR computer inside a private Docker network
# (172.30.0.0/24). No traffic is sent to third-party systems except the
# one-time download of container images and Alpine packages.
#
# Requirements: Docker Desktop (Windows/macOS) or Docker Engine (Linux),
# a POSIX shell (Git Bash, WSL, macOS Terminal or Linux).
# Tested: Docker 29.4.2 on Windows 11 with Git Bash, images alpine:3.20,
# python:3.12-slim, curlimages/curl:latest (2026-11-07).

set -e
export MSYS_NO_PATHCONV=1          # stop Git Bash rewriting /tmp paths

NET=rk-lab-net
docker network create --subnet 172.30.0.0/24 "$NET" >/dev/null

# 1. Web server at 172.30.0.10:8080 (Python's built-in HTTP server)
docker run -d --rm --name rk-web --network "$NET" --ip 172.30.0.10 \
  python:3.12-slim python -m http.server 8080 >/dev/null

# 2. Capture container sharing the server's network namespace
docker run -d --name rk-cap --network container:rk-web alpine:3.20 sh -c \
  "apk add --no-cache tcpdump tshark >/dev/null 2>&1; \
   tcpdump -i eth0 -nn -U -w /tmp/lab.pcap 'net 172.30.0.0/24' & \
   sleep 1; touch /tmp/ready; sleep infinity" >/dev/null

echo "Waiting for capture to start..."
i=0
until docker exec rk-cap test -f /tmp/ready 2>/dev/null; do
  i=$((i+1)); [ "$i" -gt 60 ] && { echo "capture did not start"; exit 1; }
  sleep 2
done
sleep 2

# 3. Traffic: two HTTP requests, one ICMP echo, one UDP datagram
docker run --rm --network "$NET" --ip 172.30.0.20 curlimages/curl:latest \
  -s -o /dev/null -w "HTTP GET / -> %{http_code}\n" http://172.30.0.10:8080/
docker run --rm --network "$NET" --ip 172.30.0.21 curlimages/curl:latest \
  -s -o /dev/null -w "HTTP GET /nothere -> %{http_code}\n" http://172.30.0.10:8080/nothere
docker run --rm --network "$NET" --ip 172.30.0.22 alpine:3.20 ping -c 2 172.30.0.10
docker run --rm --network "$NET" --ip 172.30.0.23 python:3.12-slim python -c \
  "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.sendto(b'RK-UDP-TEST', ('172.30.0.10', 9999)); print('UDP datagram sent')"

sleep 2
docker exec rk-cap pkill tcpdump || true
sleep 1
docker cp rk-cap:/tmp/lab.pcap ./rk_c02_lab.pcap >/dev/null
echo "Saved ./rk_c02_lab.pcap"

# 4. Quick summary with tshark (inside the capture container)
docker exec rk-cap tshark -r /tmp/lab.pcap 2>/dev/null | head -60

# 5. Cleanup
docker rm -f rk-cap rk-web >/dev/null
docker network rm "$NET" >/dev/null
echo "Cleanup complete (containers and network removed)."
