#!/bin/sh
# RedKross Academy - Course 02 Module 5 network services lab
# Builds private Docker networks on YOUR computer and observes four services:
#   1. DNS  - a local dnsmasq resolver for the zone rk-lab.example
#   2. DHCP - a full DISCOVER/OFFER/REQUEST/ACK exchange from the same dnsmasq
#   3. NAT  - a lab router that masquerades an "inside" network
#   4. TLS  - a local HTTPS server with a self-signed certificate
# Every exchange is captured with tcpdump and summarised with tshark.
#
# Scope: only containers and networks created by this script; addresses are
# private (172.30.5.0/24, 172.30.6.0/24, 172.30.7.0/24) and names use the
# reserved .example domain (RFC 2606). Nothing is sent to third-party systems
# except the one-time download of images and Alpine packages.
# Requirements: Docker Desktop/Engine and a POSIX shell (Git Bash, WSL, macOS,
# Linux). Tested: Docker 29.4.2, alpine:3.20, Windows 11 + Git Bash, 2026-11-08.
# Cleanup: the script removes everything it created at the end (also on error).

set -e
export MSYS_NO_PATHCONV=1
IMG=alpine:3.20
cleanup() {
  docker rm -f rk-dns rk-dhcpc rk-nat rk-out rk-in rk-tls >/dev/null 2>&1 || true
  docker network rm rk-svc rk-inside rk-outside >/dev/null 2>&1 || true
}
trap cleanup EXIT
cleanup

docker network create --subnet 172.30.5.0/24 rk-svc >/dev/null
docker network create --subnet 172.30.6.0/24 rk-inside >/dev/null
docker network create --subnet 172.30.7.0/24 rk-outside >/dev/null

echo "=== 1. DNS: local resolver for rk-lab.example"
docker run -d --name rk-dns --network rk-svc --ip 172.30.5.53 --cap-add NET_ADMIN $IMG \
  sh -c "apk add --no-cache dnsmasq tcpdump tshark >/dev/null 2>&1; touch /tmp/ready; sleep 900" >/dev/null
until docker exec rk-dns test -f /tmp/ready 2>/dev/null; do sleep 2; done
docker exec rk-dns sh -c 'cat > /etc/dnsmasq.d/rk.conf <<EOF
no-resolv
no-hosts
log-queries
domain=rk-lab.example
local=/rk-lab.example/
address=/www.rk-lab.example/172.30.5.10
mx-host=rk-lab.example,mail.rk-lab.example,10
address=/mail.rk-lab.example/172.30.5.25
txt-record=rk-lab.example,"v=spf1 mx -all"
local-ttl=300
dhcp-range=172.30.5.100,172.30.5.150,255.255.255.0,1h
dhcp-option=option:router,172.30.5.1
dhcp-option=option:dns-server,172.30.5.53
dhcp-authoritative
EOF
dnsmasq --conf-dir=/etc/dnsmasq.d --log-facility=/tmp/dnsmasq.log
tcpdump -i eth0 -nn -U -w /tmp/svc.pcap "port 53 or port 67 or port 68" >/dev/null 2>&1 &
sleep 2'

docker run --rm --network rk-svc --ip 172.30.5.60 $IMG sh -c "
  apk add --no-cache bind-tools >/dev/null 2>&1
  echo '-- A record';  dig @172.30.5.53 www.rk-lab.example A +noall +answer
  echo '-- MX record'; dig @172.30.5.53 rk-lab.example MX +noall +answer
  echo '-- TXT record'; dig @172.30.5.53 rk-lab.example TXT +noall +answer
  echo '-- name that does not exist (status line)'
  dig @172.30.5.53 nothere.rk-lab.example A | grep -E 'status:'"

echo "=== 2. DHCP: client asks the lab dnsmasq for a lease"
docker run --rm --name rk-dhcpc --network rk-svc --ip 172.30.5.61 --cap-add NET_ADMIN $IMG sh -c "
  udhcpc -i eth0 -n -q -f -s /bin/true 2>&1 | sed 's/^/  /'" || true
sleep 1
docker exec rk-dns sh -c 'pkill tcpdump; sleep 1
  echo "-- capture summary (DNS and DHCP)"
  tshark -r /tmp/svc.pcap -T fields -e frame.number -e ip.src -e ip.dst \
    -e dns.qry.name -e dns.flags.rcode -e dhcp.option.dhcp 2>/dev/null
  echo "-- resolver log (last lines)"; tail -n 6 /tmp/dnsmasq.log | cut -c17-'

echo "=== 3. NAT: inside 172.30.6.0/24 -> router -> outside 172.30.7.0/24"
docker run -d --name rk-out --network rk-outside --ip 172.30.7.80 $IMG \
  sh -c "apk add --no-cache tcpdump >/dev/null 2>&1; touch /tmp/ready; \
         tcpdump -i eth0 -nn -l icmp > /tmp/out.txt 2>/dev/null & sleep 900" >/dev/null
docker run -d --name rk-nat --network rk-inside --ip 172.30.6.254 --cap-add NET_ADMIN \
  --sysctl net.ipv4.ip_forward=1 $IMG \
  sh -c "apk add --no-cache iptables conntrack-tools >/dev/null 2>&1; touch /tmp/ready; sleep 900" >/dev/null
docker network connect --ip 172.30.7.254 rk-outside rk-nat
until docker exec rk-out test -f /tmp/ready 2>/dev/null && docker exec rk-nat test -f /tmp/ready 2>/dev/null; do
  sleep 2; done
docker exec rk-nat sh -c 'OUT=$(ip -o -4 addr show | awk "/172.30.7.254/{print \$2}")
  iptables -t nat -A POSTROUTING -s 172.30.6.0/24 -o "$OUT" -j MASQUERADE
  echo "-- NAT rule"; iptables -t nat -S POSTROUTING | grep MASQ'
docker run --rm --name rk-in --network rk-inside --ip 172.30.6.20 --cap-add NET_ADMIN $IMG sh -c "
  ip route replace 172.30.7.0/24 via 172.30.6.254
  ping -c 2 -W 1 172.30.7.80 | grep -E 'bytes from|transmitted'"
docker exec rk-nat sh -c 'echo "-- connection tracking table"; conntrack -L -p icmp 2>/dev/null | cut -c1-150'
sleep 1
echo "-- what the outside server saw (source address)"
docker exec rk-out sh -c 'cut -d" " -f2- /tmp/out.txt | head -4'

echo "=== 4. TLS: local HTTPS server with a self-signed certificate"
docker run -d --name rk-tls --network rk-svc --ip 172.30.5.10 $IMG sh -c "
  apk add --no-cache openssl tcpdump tshark >/dev/null 2>&1
  openssl req -x509 -newkey rsa:2048 -nodes -days 1 -subj '/CN=www.rk-lab.example' \
    -keyout /tmp/k.pem -out /tmp/c.pem >/dev/null 2>&1
  tcpdump -i eth0 -nn -U -w /tmp/tls.pcap 'tcp port 8443' >/dev/null 2>&1 &
  touch /tmp/ready
  openssl s_server -accept 8443 -cert /tmp/c.pem -key /tmp/k.pem -www -quiet" >/dev/null
until docker exec rk-tls test -f /tmp/ready 2>/dev/null; do sleep 2; done
sleep 3
docker run --rm --network rk-svc --ip 172.30.5.62 $IMG sh -c "
  apk add --no-cache openssl >/dev/null 2>&1
  for v in tls1_2 tls1_3; do
    echo \"-- client offering -\$v\"
    echo | openssl s_client -connect 172.30.5.10:8443 -servername www.rk-lab.example -\$v 2>&1 \
      | grep -E '^(subject|issuer)=|Protocol *:|^ *Protocol|Cipher is|Verify return code' | sort -u
  done"
sleep 1
docker exec rk-tls sh -c 'pkill tcpdump; sleep 1
  echo "-- TLS handshake messages seen on the wire"
  tshark -r /tmp/tls.pcap -Y "tls.handshake" -T fields -e frame.number -e ip.src \
    -e tls.handshake.type -e tls.handshake.extensions_server_name -e tls.handshake.version \
    -e x509sat.printableString -e x509sat.uTF8String 2>/dev/null'
echo "Cleanup on exit."
