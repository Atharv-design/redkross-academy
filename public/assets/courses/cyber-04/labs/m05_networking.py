"""RedKross Academy C04-M05 - networking with Python (localhost only).

1) TCP echo server and client with sockets; 2) a local HTTP JSON API and
urllib client with timeouts and status handling; 3) parsing raw IPv4/TCP
header bytes with struct. Nothing leaves 127.0.0.1.
Tested: CPython 3.14.4, Windows 11, 2026-11-07.
"""
import http.server
import json
import socket
import struct
import threading
import urllib.error
import urllib.request

HOST = "127.0.0.1"

# --- 1. TCP echo server and client ------------------------------------------
def echo_server(sock: socket.socket) -> None:
    conn, addr = sock.accept()
    with conn:
        data = conn.recv(1024)                  # read up to 1024 bytes
        conn.sendall(b"ECHO: " + data.upper())

srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
srv.bind((HOST, 0))                             # port 0 = OS picks a free port
srv.listen(1)
port = srv.getsockname()[1]
threading.Thread(target=echo_server, args=(srv,), daemon=True).start()

with socket.create_connection((HOST, port), timeout=5) as cli:
    cli.sendall(b"hello redkross")
    reply = cli.recv(1024)
print("1. server port is ephemeral:", port > 1023, "| reply:", reply.decode())
srv.close()

# --- 2. Local HTTP JSON API --------------------------------------------------
class Api(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/status":
            body = json.dumps({"service": "rk-demo", "ok": True}).encode()
            self.send_response(200)
        else:
            body = json.dumps({"error": "not found"}).encode()
            self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):               # keep demo output quiet
        pass

httpd = http.server.HTTPServer((HOST, 0), Api)
api_port = httpd.server_address[1]
threading.Thread(target=httpd.serve_forever, daemon=True).start()

def get_json(path: str) -> tuple[int, dict]:
    url = f"http://{HOST}:{api_port}{path}"
    req = urllib.request.Request(url, headers={"User-Agent": "rk-c04-client/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status, json.load(resp)
    except urllib.error.HTTPError as err:       # 4xx/5xx raise HTTPError
        return err.code, json.load(err)

print("2.", get_json("/api/status"))
print("  ", get_json("/missing"))
httpd.shutdown()

try:
    urllib.request.urlopen(f"http://{HOST}:{api_port}/api/status", timeout=2)
except (urllib.error.URLError, ConnectionError, OSError) as err:
    print("   after shutdown:", type(err).__name__)

# --- 3. Parse IPv4 + TCP headers from raw bytes (from Course 02 capture) ------
raw = bytes.fromhex(
    "450000848983400040065896ac1e0014ac1e000a"      # IPv4 header (20 bytes)
    "adac1f90387bcbb2244ccd33801801f658d10000"      # TCP header (first 20)
)
ver_ihl, tos, total_len, ident, flags_frag, ttl, proto, csum, src, dst = \
    struct.unpack("!BBHHHBBH4s4s", raw[:20])
sport, dport, seq, ack, off_flags = struct.unpack("!HHIIH", raw[20:34])
print("3. version", ver_ihl >> 4, "ihl", (ver_ihl & 0x0F) * 4, "bytes | total", total_len,
      "| ttl", ttl, "| proto", proto)
print("  ", socket.inet_ntoa(src), "->", socket.inet_ntoa(dst), "|", sport, "->", dport,
      "| tcp header", (off_flags >> 12) * 4, "bytes | flags 0x%02x" % (off_flags & 0x3F))
