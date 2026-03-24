const WORD_BANK = [
  "stupid",
  "worthless",
  "ugly",
  "shame",
  "idiot",
  "trash",
  "failure",
  "weak",
  "loser",
  "silence",
  "hate",
  "disgust",
  "go away",
  "nobody",
  "pathetic",
];

const STORAGE_KEY = "iv-calibration-v1";

const state = {
  calibrationMode: true,
  debugTrails: false,
  paused: false,
  selectedZone: "mouth",
  speedMultiplier: 0.72,
  minSpeedMultiplier: 0.3,
  maxSpeedMultiplier: 2.4,
  spawnIntervalMs: 140,
  lastSpawnMs: 0,
  maxWords: 180,
  words: [],
  zones: {
    mouth: {
      x: 300,
      y: 420,
      w: 280,
      h: 150,
      angle: -0.2,
      tint: [255, 120, 145, 58],
      stroke: [255, 120, 145, 220],
      label: "MOUTH",
    },
    ear: {
      x: 1080,
      y: 360,
      w: 220,
      h: 220,
      angle: 0.18,
      tint: [130, 195, 255, 58],
      stroke: [130, 195, 255, 220],
      label: "EAR",
    },
  },
};

class FlyingWord {
  constructor(text, fromZone, toZone) {
    this.text = text;
    this.fromZone = fromZone;
    this.toZone = toZone;

    this.start = randomPointInZone(fromZone);
    this.end = randomPointInZone(toZone);

    this.curveA = p5.Vector.lerp(this.start, this.end, 0.33);
    this.curveB = p5.Vector.lerp(this.start, this.end, 0.66);
    this.curveA.add(random(-140, 140), random(-160, 160));
    this.curveB.add(random(-140, 140), random(-160, 160));

    this.life = random(2200, 4300);
    this.born = millis();
    this.size = random(15, 34);
    this.alpha = random(165, 240);
    this.jitter = random(0.6, 2.0);
    this.rotation = random(-0.2, 0.2);
  }

  progress(now) {
    const elapsed = (now - this.born) * state.speedMultiplier;
    return constrain(elapsed / this.life, 0, 1);
  }

  getPosition(t) {
    return cubicBezier(this.start, this.curveA, this.curveB, this.end, t);
  }

  draw(now, debugTrails) {
    const t = this.progress(now);
    const eased = easeInOutCubic(t);
    const pos = this.getPosition(eased);
    const wiggleX = sin((now * 0.008 + this.born) * this.jitter) * 2.8;
    const wiggleY = cos((now * 0.006 + this.born) * this.jitter) * 2.4;

    const fade = t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82;
    const a = constrain(fade, 0, 1) * this.alpha;

    if (debugTrails) {
      push();
      noFill();
      stroke(255, 80);
      strokeWeight(1);
      bezier(
        this.start.x,
        this.start.y,
        this.curveA.x,
        this.curveA.y,
        this.curveB.x,
        this.curveB.y,
        this.end.x,
        this.end.y
      );
      pop();
    }

    push();
    translate(pos.x + wiggleX, pos.y + wiggleY);
    rotate(this.rotation + sin(now * 0.002 + this.born) * 0.06);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    fill(255, 30);
    text(this.text, 1.8, 1.8);
    fill(255, 35, 80, a);
    text(this.text, 0, 0);
    pop();
  }

  isDead(now) {
    const elapsed = (now - this.born) * state.speedMultiplier;
    return elapsed > this.life;
  }
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("app");
  textFont("Helvetica");
  textStyle(BOLD);
  loadCalibration();
}

function draw() {
  drawBackground();

  if (!state.paused) {
    maybeSpawnWords();
  }

  const now = millis();
  state.words = state.words.filter((w) => !w.isDead(now));
  for (const w of state.words) {
    w.draw(now, state.debugTrails);
  }

  if (state.calibrationMode) {
    drawZoneOverlay(state.zones.mouth, state.selectedZone === "mouth");
    drawZoneOverlay(state.zones.ear, state.selectedZone === "ear");
  }

  drawHud();
}

function drawBackground() {
  background(7, 2, 14, 255);

  for (let i = 0; i < 8; i += 1) {
    const y = (frameCount * 0.1 + i * 140) % (height + 140);
    noStroke();
    fill(145, 0, 90, 10);
    ellipse(width * 0.44, y - 70, width * 1.2, 120);
  }

  drawZoneReference(state.zones.mouth, "mouth");
  drawZoneReference(state.zones.ear, "ear");
}

function drawZoneReference(zone, type) {
  push();
  translate(zone.x, zone.y);
  rotate(zone.angle);
  noStroke();
  fill(...zone.tint);
  ellipse(0, 0, zone.w, zone.h);

  noFill();
  stroke(...zone.stroke);
  strokeWeight(2);
  ellipse(0, 0, zone.w, zone.h);

  if (type === "mouth") {
    stroke(255, 90, 120, 180);
    strokeWeight(3);
    noFill();
    arc(0, -4, zone.w * 0.8, zone.h * 0.6, 0.2, PI - 0.2);
    arc(0, 2, zone.w * 0.8, zone.h * 0.5, PI + 0.2, TWO_PI - 0.2);
  } else {
    stroke(160, 220, 255, 190);
    strokeWeight(3);
    noFill();
    arc(0, 0, zone.w * 0.52, zone.h * 0.74, -PI * 0.35, PI * 1.18);
    arc(-6, 8, zone.w * 0.22, zone.h * 0.28, -PI * 0.2, PI * 1.1);
  }
  pop();
}

function drawZoneOverlay(zone, isSelected) {
  push();
  translate(zone.x, zone.y);
  rotate(zone.angle);

  strokeWeight(isSelected ? 3 : 1.5);
  stroke(isSelected ? 255 : 200, isSelected ? 230 : 130);
  noFill();
  ellipse(0, 0, zone.w + 22, zone.h + 22);

  stroke(255, isSelected ? 220 : 100);
  line(-zone.w * 0.5 - 16, 0, zone.w * 0.5 + 16, 0);
  line(0, -zone.h * 0.5 - 16, 0, zone.h * 0.5 + 16);

  fill(255);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  text(zone.label, 0, -zone.h * 0.5 - 28);
  pop();
}

function drawHud() {
  const lines = [
    "Invisible Violence - POC",
    `mode: ${state.calibrationMode ? "CALIBRATION" : "SHOW"} | selected: ${state.selectedZone.toUpperCase()} | speed: ${state.speedMultiplier.toFixed(2)}x`,
    "C toggle calibration | TAB switch zone | arrows move | [ ] scale | , . rotate",
    "S save preset | L load preset | D debug trails | SPACE pause emit | -/+ speed",
  ];

  push();
  noStroke();
  fill(0, 130);
  rect(14, 14, 640, 92, 10);
  fill(255, 220);
  textStyle(NORMAL);
  textSize(14);
  textAlign(LEFT, TOP);
  lines.forEach((line, idx) => text(line, 24, 24 + idx * 20));
  pop();
}

function maybeSpawnWords() {
  const now = millis();
  if (now - state.lastSpawnMs < state.spawnIntervalMs) {
    return;
  }
  if (state.words.length >= state.maxWords) {
    return;
  }

  const count = random() < 0.18 ? 2 : 1;
  for (let i = 0; i < count; i += 1) {
    const word = random(WORD_BANK);
    state.words.push(new FlyingWord(word, state.zones.mouth, state.zones.ear));
  }
  state.lastSpawnMs = now;
}

function keyPressed() {
  if (key === "c" || key === "C") {
    state.calibrationMode = !state.calibrationMode;
    return false;
  }
  if (key === "d" || key === "D") {
    state.debugTrails = !state.debugTrails;
    return false;
  }
  if (key === " ") {
    state.paused = !state.paused;
    return false;
  }
  if (key === "s" || key === "S") {
    saveCalibration();
    return false;
  }
  if (key === "l" || key === "L") {
    loadCalibration();
    return false;
  }
  if (keyCode === TAB) {
    state.selectedZone = state.selectedZone === "mouth" ? "ear" : "mouth";
    return false;
  }
  if (key === "-" || key === "_") {
    changeSpeed(-1);
    return false;
  }
  if (key === "=" || key === "+") {
    changeSpeed(1);
    return false;
  }

  if (!state.calibrationMode) {
    return true;
  }

  const zone = state.zones[state.selectedZone];
  const moveStep = keyIsDown(SHIFT) ? 15 : 6;
  const rotateStep = keyIsDown(SHIFT) ? 0.055 : 0.022;
  const scaleStep = keyIsDown(SHIFT) ? 20 : 8;

  if (keyCode === LEFT_ARROW) {
    zone.x -= moveStep;
    return false;
  }
  if (keyCode === RIGHT_ARROW) {
    zone.x += moveStep;
    return false;
  }
  if (keyCode === UP_ARROW) {
    zone.y -= moveStep;
    return false;
  }
  if (keyCode === DOWN_ARROW) {
    zone.y += moveStep;
    return false;
  }
  if (key === "[") {
    zone.w = max(40, zone.w - scaleStep);
    zone.h = max(40, zone.h - scaleStep);
    return false;
  }
  if (key === "]") {
    zone.w += scaleStep;
    zone.h += scaleStep;
    return false;
  }
  if (key === ",") {
    zone.angle -= rotateStep;
    return false;
  }
  if (key === ".") {
    zone.angle += rotateStep;
    return false;
  }
  return true;
}

function saveCalibration() {
  const payload = {
    mouth: state.zones.mouth,
    ear: state.zones.ear,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadCalibration() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    setDefaultZonePositions();
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.mouth || !parsed.ear) {
      setDefaultZonePositions();
      return;
    }
    applyLoadedZone("mouth", parsed.mouth);
    applyLoadedZone("ear", parsed.ear);
  } catch (err) {
    setDefaultZonePositions();
  }
}

function applyLoadedZone(name, loaded) {
  const zone = state.zones[name];
  zone.x = Number.isFinite(loaded.x) ? loaded.x : zone.x;
  zone.y = Number.isFinite(loaded.y) ? loaded.y : zone.y;
  zone.w = Number.isFinite(loaded.w) ? loaded.w : zone.w;
  zone.h = Number.isFinite(loaded.h) ? loaded.h : zone.h;
  zone.angle = Number.isFinite(loaded.angle) ? loaded.angle : zone.angle;
}

function setDefaultZonePositions() {
  state.zones.mouth.x = width * 0.25;
  state.zones.mouth.y = height * 0.65;
  state.zones.ear.x = width * 0.78;
  state.zones.ear.y = height * 0.35;
}

function randomPointInZone(zone) {
  const a = random(TWO_PI);
  const r = sqrt(random());
  const px = (zone.w * 0.5 * r) * cos(a);
  const py = (zone.h * 0.5 * r) * sin(a);
  const rotatedX = px * cos(zone.angle) - py * sin(zone.angle);
  const rotatedY = px * sin(zone.angle) + py * cos(zone.angle);
  return createVector(zone.x + rotatedX, zone.y + rotatedY);
}

function cubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
  return createVector(x, y);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

function changeSpeed(direction) {
  const step = keyIsDown(SHIFT) ? 0.25 : 0.1;
  const next = state.speedMultiplier + direction * step;
  state.speedMultiplier = constrain(
    next,
    state.minSpeedMultiplier,
    state.maxSpeedMultiplier
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
