const INITIAL_STATUS_TEXT =
  "Use Attack More or Attack Less to change what appears on the main screen.";

const clickBtn = document.getElementById("click-btn");
const minusBtn = document.getElementById("long-press-btn");
const statusText = document.getElementById("status-text");
const bgVideo = document.getElementById("bg-video");

const VIDEO_MISSING_HINT =
  "No background video: copy your file to assets/ipad-background.mov or .mp4 (see assets/README.txt).";

async function sendLanguageStep(step) {
  try {
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lang_step", step }),
      cache: "no-store",
    });
    if (!res.ok) {
      statusText.textContent = "Send failed";
      return;
    }
    statusText.textContent =
      step > 0
        ? "Attack More sent — check the main screen."
        : "Attack Less sent — check the main screen.";
  } catch (_err) {
    statusText.textContent = "Cannot connect to server";
  }
}

clickBtn.addEventListener("click", () => sendLanguageStep(1));
minusBtn.addEventListener("click", () => sendLanguageStep(-1));

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
