#!/bin/sh
# RedKross Academy - Course 02 Module 8 troubleshooting capture lab
# Recreates three classic "the application cannot connect" situations on a
# private Docker network on YOUR computer and captures them for analysis:
#   A. port 8080 - service running and allowed        -> works
#   B. port 8081 - service running, host firewall DROP -> client times out
#   C. port 8082 - nothing listening                   -> connection refused
#   D. a DNS lookup of a name the lab resolver does not know -> NXDOMAIN
# The capture is saved as rk_c02_trouble.pcap and summarised with tshark.
#
# Scope: only the containers and network 172.30.8.0/24 created here; the
# client connects only to the lab server. Images/packages are downloaded once.
# Requirements: Docker Desktop/Engine, POSIX shell.
# Tested: Docker 29.4.2, alpine:3.20, Windows 11 + Git Bash, 2026-11-08.
# Cleanup: everything created is removed at exit (trap), also on error.

set -e
export MSYS_NO_PATHCONV=1
IMG=alpine:3.20
cleanup() {
  docker rm -f rk-tsrv rk-tcli >/dev/null 2>&1 || true
  docker network rm rk-trouble >/dev/null 2>&1 || true
}
trap cleanup EXIT
cleanup
docker network create --subnet 172.30.8.0/24 rk-trouble >/dev/null

# Server: web on 8080 and 8081, firewall drops 8081, nothing on 8082,
# a dnsmasq resolver for the lab zone, and the packet capture.
docker run -d --name rk-tsrv --network rk-trouble --ip 172.30.8.10 --cap-add NET_ADMIN $IMG sh -c "
  apk add --no-cache busybox-extras iptables dnsmasq tcpdump tshark >/dev/null 2>&1
  mkdir -p /www && echo 'rk lab ok' > /www/index.html
  httpd -p 8080 -h /www; httpd -p 8081 -h /www
  iptables -A INPUT -p tcp --dport 8081 -j DROP
  dnsmasq --no-resolv --no-hosts --local=/rk-lab.example/ \
    --address=/app.rk-lab.example/172.30.8.10
  tcpdump -i eth0 -nn -U -w /tmp/t.pcap 'host 172.30.8.10 and not port 67' >/dev/null 2>&1 &
  touch /tmp/ready; sleep 600" >/dev/null
until docker exec rk-tsrv test -f /tmp/ready 2>/dev/null; do sleep 2; done
sleep 2

echo "=== client tests (from 172.30.8.20)"
docker run --rm --name rk-tcli --network rk-trouble --ip 172.30.8.20 $IMG sh -c "
  apk add --no-cache curl bind-tools >/dev/null 2>&1
  for p in 8080 8081 8082; do
    printf 'port %s: ' \$p
    curl -s -m 4 -o /dev/null -w 'HTTP %{http_code} in %{time_total}s\n' http://172.30.8.10:\$p/ \
      || echo \"curl exit code \$? \"
  done
  printf 'dns app.rk-lab.example: '; dig @172.30.8.10 app.rk-lab.example +short
  printf 'dns typo apps.rk-lab.example: '
  dig @172.30.8.10 apps.rk-lab.example | grep -o 'status: [A-Z]*'"
sleep 1
docker exec rk-tsrv sh -c 'pkill tcpdump; sleep 1'
docker cp rk-tsrv:/tmp/t.pcap ./rk_c02_trouble.pcap >/dev/null
echo "Saved ./rk_c02_trouble.pcap"

docker exec rk-tsrv sh -c '
F=/tmp/t.pcap
echo "=== capinfos"; capinfos -c -d -u $F 2>/dev/null | sed -n "2,4p"
echo "=== SYNs per destination port (tcp.flags.syn==1 && tcp.flags.ack==0)"
tshark -r $F -Y "tcp.flags.syn==1 && tcp.flags.ack==0" -T fields -e tcp.dstport 2>/dev/null | sort | uniq -c
echo "=== port 8081 (tcp.port==8081)"
tshark -r $F -Y "tcp.port==8081" -T fields -e frame.number -e frame.time_relative \
  -e tcp.flags.str -e _ws.expert.message 2>/dev/null
echo "=== port 8082 (tcp.port==8082)"
tshark -r $F -Y "tcp.port==8082" -T fields -e frame.number -e ip.src -e tcp.flags.str 2>/dev/null
echo "=== HTTP responses (http.response)"
tshark -r $F -Y "http.response" -T fields -e frame.number -e tcp.srcport -e http.response.code 2>/dev/null
echo "=== DNS (dns.flags.response==1)"
tshark -r $F -Y "dns.flags.response==1" -T fields -e dns.qry.name -e dns.flags.rcode -e dns.a 2>/dev/null
echo "=== expert info summary"
tshark -r $F -q -z expert,warn 2>/dev/null | grep -E "Warns|Retransmission|Previous|Group" | head -8
echo "=== TCP conversations"
tshark -r $F -q -z conv,tcp 2>/dev/null | grep "<->"
' | sed 's/\xc2\xb7/-/g'
echo "Cleanup on exit."
