#!/bin/sh
# RedKross Academy - Course 02: run Wireshark display filters on rk_c02_lab.pcap
# using tshark inside a throwaway Alpine container (no local install needed).
# Usage: sh rk_c02_analyse.sh "<display filter>" [extra tshark options]
# Example: sh rk_c02_analyse.sh "http.request" -T fields -e ip.src -e http.request.uri
set -e
export MSYS_NO_PATHCONV=1
[ -f rk_c02_lab.pcap ] || { echo "rk_c02_lab.pcap not found - run rk_c02_capture_lab.sh first"; exit 1; }
FILTER="$1"; shift
docker run --rm -v "$(pwd)":/data alpine:3.20 sh -c \
  "apk add --no-cache tshark >/dev/null 2>&1 && tshark -r /data/rk_c02_lab.pcap -Y '$FILTER' $*"
