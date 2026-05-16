const INITIAL_STATUS_TEXT =
  "Use Attack More or Attack Less to change what appears on the main screen.";

const clickBtn = document.getElementById("click-btn");
const minusBtn = document.getElementById("long-press-btn");
const statusText = document.getElementById("status-text");
const relayHint = document.getElementById("relay-hint");
const bgVideo = document.getElementById("bg-video");

const VIDEO_MISSING_HINT =
  "No background video: copy your file to assets/ipad-background.mov or .mp4 (see assets/README.txt).";

const RELAY_EXPECTED = "invisible-violence-relay";

let ws;
let reconnectTimer = null;
let relayChecked = false;

function setRelayHintVisible(show, html) {
  if (!relayHint) {
    return;
  }
  relayHint.style.display = show ? "block" : "none";
  if (html !== undefined) {
    relayHint.innerHTML = html;
  }
}

function showWrongServerHint() {
  if (!relayHint) {
    return;
  }
  relayHint.style.display = "block";
  relayHint.innerHTML =
    "This page needs the <strong>Node</strong> relay. In the project folder run " +
    '<code style="background:#222;padding:2px 6px;border-radius:4px">npm install</code> then ' +
    '<code style="background:#222;padding:2px 6px;border-radius:4px">npm start</code> ' +
    "and open this URL at <strong>http://&lt;PC-IP&gt;:8899/controller.html</strong> " +
    "(not <code>python -m http.server</code> — it has no WebSocket).";
}

function setStatus(text) {
  statusText.textContent = text;
}

function sendLanguageStep(step) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    setStatus("Not connected — wait for relay or tap again.");
    return;
  }
  ws.send(JSON.stringify({ type: "lang_step", step }));
  setStatus(
    step > 0
      ? "Attack More sent — check the main screen."
      : "Attack Less sent — check the main screen."
  );
}

function connect() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  const params = new URLSearchParams(location.search);
  const wsOverride = params.get("ws");
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = wsOverride || proto + "//" + location.host + "/ws";
  try {
    ws = new WebSocket(wsUrl);
  } catch (_e) {
    reconnectTimer = setTimeout(connect, 2000);
    return;
  }
  ws.onopen = () => {
    setRelayHintVisible(false);
    setStatus("Connected — same WiFi as display PC");
  };
  ws.onclose = () => {
    setStatus("Disconnected — retrying…");
    if (relayChecked) {
      reconnectTimer = setTimeout(connect, 2000);
    }
  };
  ws.onerror = () => {
    setStatus("WebSocket error — is npm start running?");
  };
  ws.onmessage = () => {
    /* Ignore broadcasts (e.g. lang_step echoed to all clients). */
  };
}

function checkRelayThenConnect() {
  fetch(location.origin + "/__relay_ok", { cache: "no-store" })
    .then((r) => (r.ok ? r.text() : ""))
    .then((text) => {
      relayChecked = true;
      if (text.trim() !== RELAY_EXPECTED) {
        setStatus("Wrong server — see note below");
        showWrongServerHint();
        return;
      }
      connect();
    })
    .catch(() => {
      relayChecked = true;
      setStatus("Cannot reach relay PC");
      showWrongServerHint();
    });
}

clickBtn.addEventListener("click", () => sendLanguageStep(1));
minusBtn.addEventListener("click", () => sendLanguageStep(-1));

checkRelayThenConnect();

function tryPlayBackgroundVideo() {
  if (!bgVideo) {
    return;
  }
  bgVideo.muted = true;
  bgVideo.defaultMuted = true;
  bgVideo.setAttribute("muted", "");
  const playAttempt = bgVideo.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      statusText.textContent =
        "Tap the screen once to start the background video (browser blocked autoplay).";
      window.addEventListener(
        "pointerdown",
        () => {
          bgVideo.play().catch(() => {});
          statusText.textContent = INITIAL_STATUS_TEXT;
        },
        { once: true }
      );
    });
  }
}

if (bgVideo) {
  bgVideo.addEventListener(
    "loadeddata",
    () => {
      tryPlayBackgroundVideo();
    },
    { once: true }
  );
  bgVideo.addEventListener("error", () => {
    statusText.textContent = VIDEO_MISSING_HINT;
  });
  tryPlayBackgroundVideo();
}
