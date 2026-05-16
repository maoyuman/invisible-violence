/**
 * HTTP static server + WebSocket relay for phone/iPad controller → main display.
 *
 * Run: npm install && npm start   (PORT defaults to 8899; override with PORT=9000 npm start)
 *
 * - Static files from project root (index.html, sketch.js, controller.html, assets/, …)
 * - GET /api/mapping → mapping-export.json if present (404 otherwise)
 * - GET /__relay_ok → plain text so controller.html can verify this relay (not python -m http.server)
 * - POST /api/command → optional HTTP mirror of lang_step (broadcasts over WebSocket to all clients)
 * - WebSocket /ws → JSON { type: "lang_step", step: ±1 } broadcast to every connected client
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8899;
const MAPPING_FILENAME = "mapping-export.json";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function mappingPath() {
  return path.join(ROOT, MAPPING_FILENAME);
}

function applyNoStore(pathname) {
  return (
    pathname.startsWith("/api/") ||
    pathname.endsWith(".html") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".json")
  );
}

function sendFile(res, filePath, pathname) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500);
      res.end(err.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    const headers = { "Content-Type": type };
    if (applyNoStore(pathname)) {
      headers["Cache-Control"] = "no-store, max-age=0, must-revalidate";
      headers.Pragma = "no-cache";
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}

function sendJson(res, status, payload) {
  const raw = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0, must-revalidate",
    Pragma: "no-cache",
    "Content-Length": Buffer.byteLength(raw),
  });
  res.end(raw);
}

/** Broadcast raw JSON string to every open WebSocket (display + controller). */
function broadcastWs(text) {
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(text);
    }
  }
}

/** Validate body and broadcast; returns true if accepted. */
function relayLangStep(body, httpRes) {
  const step = body.step;
  const cmdType = body.type;
  if (cmdType !== "lang_step" || !Number.isInteger(step)) {
    if (httpRes) {
      sendJson(httpRes, 400, { error: "Invalid command payload" });
    }
    return false;
  }
  const text = JSON.stringify({ type: "lang_step", step });
  broadcastWs(text);
  if (httpRes) {
    sendJson(httpRes, 200, { ok: true });
  }
  return true;
}

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    const text = raw.toString();
    let msg;
    try {
      msg = JSON.parse(text);
    } catch {
      return;
    }
    if (msg.type !== "lang_step" || !Number.isInteger(msg.step)) {
      return;
    }
    broadcastWs(text);
  });
});

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];

  if (urlPath === "/__relay_ok") {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      Pragma: "no-cache",
    });
    res.end("invisible-violence-relay");
    return;
  }

  if (urlPath === "/api/mapping" && req.method === "GET") {
    const fp = mappingPath();
    fs.readFile(fp, "utf8", (err, raw) => {
      if (err) {
        if (err.code === "ENOENT") {
          sendJson(res, 404, {
            error: "mapping file not found",
            path: MAPPING_FILENAME,
          });
        } else {
          sendJson(res, 500, { error: String(err.message || err) });
        }
        return;
      }
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        sendJson(res, 500, {
          error: "mapping file is not valid JSON",
          path: MAPPING_FILENAME,
        });
        return;
      }
      sendJson(res, 200, data);
    });
    return;
  }

  if (urlPath === "/api/command" && req.method === "POST") {
    let buf = "";
    req.on("data", (chunk) => {
      buf += chunk;
      if (buf.length > 1e6) {
        req.socket.destroy();
      }
    });
    req.on("end", () => {
      let body;
      try {
        body = JSON.parse(buf || "{}");
      } catch {
        sendJson(res, 400, { error: "Invalid JSON" });
        return;
      }
      relayLangStep(body, res);
    });
    return;
  }

  if (req.method !== "GET") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  let pathname = urlPath;
  if (pathname === "/") pathname = "/index.html";
  const safe = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(ROOT, safe);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    sendFile(res, filePath, pathname);
  });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = req.url.split("?")[0];
  if (pathname === "/ws" || pathname.startsWith("/ws/")) {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, "0.0.0.0", () => {
  const ipHint = "<this-machine-ip>";
  console.log(`Invisible Violence server http://0.0.0.0:${PORT}/`);
  console.log(`  Display:    http://${ipHint}:${PORT}/index.html`);
  console.log(`  Controller: http://${ipHint}:${PORT}/controller.html`);
  console.log(`  WebSocket:  ws://${ipHint}:${PORT}/ws`);
});
