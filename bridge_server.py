#!/usr/bin/env python3
"""
Static file server + command queue for the phone controller.

Each POST /api/command is one discrete user action (e.g. one tap). There is no
long-hold semantics on the server: the client sends one JSON body per tap.
`lang_step: 1` turns on the next language; `lang_step: -1` requests one language
removal on the main display (see sketch.js).
"""
import argparse
import json
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse


COMMANDS = []
NEXT_ID = 1


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Avoid stale controller.js / HTML on phones (old long-press handler felt like "must hold").
        parsed = urlparse(self.path)
        path = parsed.path
        if path.startswith("/api/") or path.endswith(
            (".html", ".js", ".css", ".json")
        ):
            self.send_header("Cache-Control", "no-store, max-age=0, must-revalidate")
            self.send_header("Pragma", "no-cache")
        super().end_headers()

    def _send_json(self, status, payload):
        raw = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        global COMMANDS
        parsed = urlparse(self.path)
        if parsed.path != "/api/commands":
            return super().do_GET()

        params = parse_qs(parsed.query)
        since_raw = params.get("since", ["0"])[0]
        try:
            since = int(since_raw)
        except ValueError:
            since = 0

        new_commands = [cmd for cmd in COMMANDS if cmd["id"] > since]
        self._send_json(200, {"commands": new_commands})

    def do_POST(self):
        global COMMANDS, NEXT_ID
        parsed = urlparse(self.path)
        if parsed.path != "/api/command":
            self._send_json(404, {"error": "Not found"})
            return

        content_len = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(content_len)
        try:
            body = json.loads(raw.decode("utf-8"))
        except Exception:
            self._send_json(400, {"error": "Invalid JSON"})
            return

        step = body.get("step")
        cmd_type = body.get("type")
        if cmd_type != "lang_step" or not isinstance(step, int):
            self._send_json(400, {"error": "Invalid command payload"})
            return

        # One queued command per HTTP request (one tap); no server-side repeat.
        command = {"id": NEXT_ID, "type": "lang_step", "step": step}
        NEXT_ID += 1
        COMMANDS.append(command)
        if len(COMMANDS) > 2000:
            COMMANDS = COMMANDS[-1000:]
        self._send_json(200, {"ok": True, "command": command})


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    host = args.host
    port = args.port
    print(f"Serving app + API at http://{host}:{port}")
    print("Open /index.html on your display device and /controller.html on phone/iPad")
    server = ThreadingHTTPServer((host, port), Handler)
    server.serve_forever()
