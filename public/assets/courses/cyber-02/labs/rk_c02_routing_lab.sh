#!/bin/sh
# RedKross Academy - Course 02 Module 6 routing lab
# Two isolated Docker networks ("staff" 172.31.10.0/24 and "servers"
# 172.31.20.0/24) joined by a Linux router container. Shows routing tables,
# route selection, traceroute hops and TTL decrement.
#
# Scope: runs entirely on your own computer inside private Docker networks.
# Tested: Docker 29.4.2, alpine:3.20, Windows 11 + Git Bash, 2026-11-07.
# Note: Docker reserves .1 in each network for its own bridge gateway, so the
# lab router uses .254.

set -e
export MSYS_NO_PATHCONV=1

docker network create --subnet 172.31.10.0/24 rk-staff >/dev/null
docker network create --subnet 172.31.20.0/24 rk-servers >/dev/null

# Router with an interface in each network and IP forwarding enabled
docker run -d --name rk-router --network rk-staff --ip 172.31.10.254 \
  --cap-add NET_ADMIN --sysctl net.ipv4.ip_forward=1 alpine:3.20 sleep 600 >/dev/null
docker network connect --ip 172.31.20.254 rk-servers rk-router

# Server that routes replies for the staff network back via the router
docker run -d --name rk-srv --network rk-servers --ip 172.31.20.10 \
  --cap-add NET_ADMIN alpine:3.20 \
  sh -c "ip route replace 172.31.10.0/24 via 172.31.20.254; sleep 600" >/dev/null

echo "== Router interfaces";    docker exec rk-router ip addr | grep -E "inet |eth"
echo "== Router routing table"; docker exec rk-router ip route

echo "== Staff client"
docker run --rm --network rk-staff --ip 172.31.10.50 --cap-add NET_ADMIN alpine:3.20 sh -c "
  ip route add 172.31.20.0/24 via 172.31.10.254
  echo '-- routing table'; ip route
  echo '-- route chosen for 172.31.20.10'; ip route get 172.31.20.10
  echo '-- traceroute'; traceroute -n -m 3 -w 1 172.31.20.10
  echo '-- ping (note ttl)'; ping -c 1 172.31.20.10 | head -2"

docker rm -f rk-router rk-srv >/dev/null
docker network rm rk-staff rk-servers >/dev/null
echo "Cleanup complete."
