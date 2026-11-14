How rk_c09_net_lab.sh (execution-tested) produces repeatable, contained evidence:

- It creates a dedicated Docker bridge (172.31.0.0/24). Traffic never leaves the host, and no third-party system is contacted.
- The capture container joins the web server's network namespace (--network container:rk9-web), so tcpdump sees exactly what the server sees, the equivalent of capturing on the server's interface.
- tcpdump runs with -U (packet-buffered writes) and a BPF filter (port 80). The main container process is "sleep infinity", so stopping tcpdump with pkill does not stop the container before the pcap is copied out (a lesson from Course 02).
- It hashes the original file inside the server container before cleanup, so the comparison with the carved file uses an independent measurement.
- It removes both containers and the network at the end (verified: no rk9 containers or rk-c09 network remained).
- Analysis runs in a separate throwaway container with the capture mounted, so the analysis tools never touch the evidence's origin.

**Command patterns worth remembering:**

```text
tshark -r cap.pcap -q -z conv,tcp           conversation summary
tshark -r cap.pcap -Y "http.request" -T fields -e frame.time_utc
       -e ip.src -e http.host -e http.request.uri
tshark -r cap.pcap -q --export-objects http,outdir
capinfos cap.pcap                           counts, first/last times
```

The conversation command was not part of the recorded run; the others were.
