const LONG_PRESS_DELAY_MS = 450;
const LONG_PRESS_REPEAT_MS = 260;

const INITIAL_STATUS_TEXT =
  "Please click the button to see what changes in the screen.";

const clickBtn = document.getElementById("click-btn");
const longPressBtn = document.getElementById("long-press-btn");
const statusText = document.getElementById("status-text");
const bgVideo = document.getElementById("bg-video");

const pressState = {
  active: false,
  timerId: null,
  repeatId: null,
};

async function sendLanguageStep(step) {
  try {
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lang_step", step }),
    });
    if (!res.ok) {
      statusText.textContent = "Send failed";
      return;
    }
    statusText.textContent =
      step > 0
        ? "Please click the botton to find what the changes in the screen."
        : "Sent -1 language";
  } catch (_err) {
    statusText.textContent = "Cannot connect to server";
  }
}

clickBtn.addEventListener("click", () => sendLanguageStep(1));

const beginLongPress = (event) => {
  event.preventDefault();
  if (pressState.active) {
    return;
  }
  pressState.active = true;
  longPressBtn.classList.add("is-holding");
  statusText.textContent = "Holding...";

  pressState.timerId = window.setTimeout(() => {
    sendLanguageStep(-1);
    pressState.repeatId = window.setInterval(() => {
      sendLanguageStep(-1);
    }, LONG_PRESS_REPEAT_MS);
  }, LONG_PRESS_DELAY_MS);
};

const endLongPress = () => {
  if (!pressState.active) {
    return;
  }
  pressState.active = false;
  longPressBtn.classList.remove("is-holding");
  window.clearTimeout(pressState.timerId);
  window.clearInterval(pressState.repeatId);
  pressState.timerId = null;
  pressState.repeatId = null;
  statusText.textContent = INITIAL_STATUS_TEXT;
};

if (bgVideo) {
  bgVideo.play().catch(() => {});
}

longPressBtn.addEventListener("pointerdown", beginLongPress);
longPressBtn.addEventListener("pointerup", endLongPress);
longPressBtn.addEventListener("pointercancel", endLongPress);
longPressBtn.addEventListener("pointerleave", endLongPress);
