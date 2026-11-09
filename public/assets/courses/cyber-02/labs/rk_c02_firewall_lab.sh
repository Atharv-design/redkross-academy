#!/bin/sh
# RedKross Academy - Course 02 Module 7 firewall lab
# Builds the Module 6 routed lab, then applies a default-deny forwarding
# policy on the router that allows ONLY staff -> server TCP 8080 (plus
# replies). Tests an allowed flow and a denied flow, then shows rule counters.
#
# Scope: your own computer, private Docker networks only.
# Tested: Docker 29.4.2, alpine:3.20, python:3.12-slim, curlimages/curl,
# Windows 11 + Git Bash, 2026-11-07.

set -e
export MSYS_NO_PATHCONV=1

docker network create --subnet 172.31.10.0/24 rk-staff >/dev/null
docker network create --subnet 172.31.20.0/24 rk-servers >/dev/null

docker run -d --name rk-router --network rk-staff --ip 172.31.10.254 \
  --cap-add NET_ADMIN --sysctl net.ipv4.ip_forward=1 alpine:3.20 sleep 900 >/dev/null
docker network connect --ip 172.31.20.254 rk-servers rk-router

# Server: web service on 8080, return route via the lab router
docker run -d --name rk-srv --network rk-servers --ip 172.31.20.10 \
  --cap-add NET_ADMIN python:3.12-slim sh -c \
  "ip route replace 172.31.10.0/24 via 172.31.20.254 2>/dev/null || \
   (apt-get -qq update >/dev/null && apt-get -qq install -y iproute2 >/dev/null && \
    ip route replace 172.31.10.0/24 via 172.31.20.254); \
   python -m http.server 8080" >/dev/null

echo "Installing iptables on the router..."
docker exec rk-router apk add --no-cache iptables >/dev/null 2>&1

# --- Firewall policy on the router (FORWARD chain = traffic passing through)
docker exec rk-router sh -c '
  iptables -P FORWARD DROP
  iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
  iptables -A FORWARD -s 172.31.10.0/24 -d 172.31.20.10 -p tcp --dport 8080 \
           -m conntrack --ctstate NEW -j ACCEPT
  iptables -A FORWARD -j LOG --log-prefix "RK-FWD-DENY "
'
echo "== Rule set"
docker exec rk-router iptables -L FORWARD -n --line-numbers

sleep 8   # give the server time to start

echo "== Test 1 (should be ALLOWED): HTTP to 172.31.20.10:8080"
docker run --rm --network rk-staff --ip 172.31.10.50 --cap-add NET_ADMIN alpine:3.20 sh -c \
  "ip route add 172.31.20.0/24 via 172.31.10.254; \
   wget -q -T 5 -O /dev/null http://172.31.20.10:8080/ && echo 'HTTP 8080: ALLOWED (page received)' \
   || echo 'HTTP 8080: FAILED'"

echo "== Test 2 (should be DENIED): ICMP ping to 172.31.20.10"
docker run --rm --network rk-staff --ip 172.31.10.51 --cap-add NET_ADMIN alpine:3.20 sh -c \
  "ip route add 172.31.20.0/24 via 172.31.10.254; \
   ping -c 2 -W 2 172.31.20.10 >/dev/null 2>&1 && echo 'PING: ALLOWED' || echo 'PING: DENIED (no reply)'"

echo "== Rule counters after tests (packets/bytes per rule)"
docker exec rk-router iptables -L FORWARD -n -v --line-numbers

docker rm -f rk-router rk-srv >/dev/null
docker network rm rk-staff rk-servers >/dev/null
echo "Cleanup complete."
