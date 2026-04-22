/** Relative spawn frequency per language (e.g. zhTw:Russian ≈ 10:1). */
const LANG_WEIGHT_ORDER = [
  "zhTw",
  "en",
  "pt",
  "es",
  "tl",
  "fr",
  "ja",
  "ko",
  "ru",
];
const LANG_WEIGHTS = {
  zhTw: 10,
  en: 8,
  pt: 6,
  es: 4,
  tl: 3,
  fr: 3,
  ja: 2,
  ko: 2,
  ru: 1,
};
const LANG_WEIGHT_TOTAL = LANG_WEIGHT_ORDER.reduce(
  (sum, key) => sum + LANG_WEIGHTS[key],
  0
);
const LANG_WEIGHT_MIN = Math.min(
  ...LANG_WEIGHT_ORDER.map((k) => LANG_WEIGHTS[k])
);
const LANG_WEIGHT_MAX = Math.max(
  ...LANG_WEIGHT_ORDER.map((k) => LANG_WEIGHTS[k])
);

const LANG_LABELS = {
  zhTw: "Chinese (TC)",
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  tl: "Tagalog",
  fr: "French",
  ja: "Japanese",
  ko: "Korean",
  ru: "Russian",
};

/** RGB for flying words + legend (readable on dark background). */
const LANG_COLORS = {
  zhTw: [255, 72, 72],
  en: [88, 156, 255],
  pt: [64, 220, 128],
  es: [255, 186, 58],
  tl: [206, 122, 255],
  fr: [255, 138, 198],
  ja: [72, 228, 216],
  ko: [255, 214, 92],
  ru: [255, 128, 88],
};

const WORD_GROUPS = [
  {
    en: "stupid",
    zhTw: "笨",
    pt: "estúpido",
    ja: "バカ",
    fr: "stupide",
    es: "estúpido",
    tl: "tanga",
    ko: "바보",
    ru: "дурак",
  },
  {
    en: "worthless",
    zhTw: "沒用",
    pt: "inútil",
    ja: "役立たず",
    fr: "bon à rien",
    es: "inútil",
    tl: "walang kwenta",
    ko: "쓸모없는 놈",
    ru: "никчёмный",
  },
  {
    en: "ugly",
    zhTw: "醜",
    pt: "feio",
    ja: "ブサイク",
    fr: "moche",
    es: "feo",
    tl: "pangit",
    ko: "못생긴 놈",
    ru: "урод",
  },
  {
    en: "shame",
    zhTw: "羞恥",
    pt: "vergonha",
    ja: "恥",
    fr: "honte",
    es: "vergüenza",
    tl: "kahihiyan",
    ko: "수치",
    ru: "стыд",
  },
  {
    en: "idiot",
    zhTw: "白痴",
    pt: "idiota",
    ja: "アホ",
    fr: "idiot",
    es: "idiota",
    tl: "gago",
    ko: "멍청이",
    ru: "идиот",
  },
  {
    en: "trash",
    zhTw: "垃圾",
    pt: "lixo",
    ja: "クズ",
    fr: "ordure",
    es: "basura",
    tl: "basura",
    ko: "쓰레기",
    ru: "мусор",
  },
  {
    en: "failure",
    zhTw: "失敗者",
    pt: "fracassado",
    ja: "負け犬",
    fr: "raté",
    es: "fracasado",
    tl: "palpak",
    ko: "실패자",
    ru: "неудачник",
  },
  {
    en: "weak",
    zhTw: "軟弱",
    pt: "fraco",
    ja: "弱虫",
    fr: "faible",
    es: "débil",
    tl: "mahina",
    ko: "약골",
    ru: "слабак",
  },
  {
    en: "loser",
    zhTw: "魯蛇",
    pt: "perdedor",
    ja: "負け犬",
    fr: "perdant",
    es: "perdedor",
    tl: "talunan",
    ko: "루저",
    ru: "лузер",
  },
  {
    en: "silence",
    zhTw: "沉默",
    pt: "silêncio",
    ja: "沈黙",
    fr: "silence",
    es: "silencio",
    tl: "katahimikan",
    ko: "침묵",
    ru: "молчание",
  },
  {
    en: "hate",
    zhTw: "憎恨",
    pt: "ódio",
    ja: "憎しみ",
    fr: "haine",
    es: "odio",
    tl: "poot",
    ko: "증오",
    ru: "ненависть",
  },
  {
    en: "disgust",
    zhTw: "厭惡",
    pt: "nojo",
    ja: "嫌悪",
    fr: "dégoût",
    es: "asco",
    tl: "suklam",
    ko: "혐오",
    ru: "отвращение",
  },
  {
    en: "go away",
    zhTw: "走開",
    pt: "some daqui",
    ja: "あっち行け",
    fr: "casse-toi",
    es: "vete",
    tl: "umalis ka",
    ko: "꺼져",
    ru: "убирайся",
  },
  {
    en: "nobody",
    zhTw: "無名小卒",
    pt: "um zero",
    ja: "雑魚",
    fr: "un zéro",
    es: "un don nadie",
    tl: "walang kwenta",
    ko: "한낱 인간",
    ru: "ничтожество",
  },
  {
    en: "pathetic",
    zhTw: "可悲",
    pt: "patético",
    ja: "みじめ",
    fr: "pathétique",
    es: "patético",
    tl: "kaawa-awa",
    ko: "한심한",
    ru: "жалкий",
  },
];

function pickRandomLang() {
  let r = random(LANG_WEIGHT_TOTAL);
  for (let i = 0; i < LANG_WEIGHT_ORDER.length; i += 1) {
    const key = LANG_WEIGHT_ORDER[i];
    r -= LANG_WEIGHTS[key];
    if (r < 0) {
      return key;
    }
  }
  return LANG_WEIGHT_ORDER[LANG_WEIGHT_ORDER.length - 1];
}

/** Pick language by weight, then a random concept in that language. */
function pickWeightedRandomWord() {
  const lang = pickRandomLang();
  const g = random(WORD_GROUPS);
  return { text: g[lang], lang };
}

const FONT_STACK =
  '"Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Noto Sans", sans-serif';

const STORAGE_KEY = "iv-calibration-v1";

const state = {
  calibrationMode: true,
  debugOverlaysVisible: true,
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
  langSpawnCounts: Object.fromEntries(LANG_WEIGHT_ORDER.map((k) => [k, 0])),
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
  constructor(text, fromZone, toZone, lang) {
    this.text = text;
    this.lang = lang;
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
    const w = LANG_WEIGHTS[lang] ?? LANG_WEIGHT_MIN;
    const mid = map(w, LANG_WEIGHT_MIN, LANG_WEIGHT_MAX, 15, 38);
    this.size = constrain(random(mid - 5, mid + 10), 10, 52);
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
    drawingContext.font = `bold ${this.size}px ${FONT_STACK}`;
    const col = LANG_COLORS[this.lang] || [255, 90, 120];
    const [r, g, b] = col;
    fill(r * 0.22 + 18, g * 0.22 + 12, b * 0.22 + 18, min(140, a * 0.45));
    text(this.text, 1.8, 1.8);
    fill(r, g, b, a);
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
  textFont("Noto Sans TC");
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

  if (state.debugOverlaysVisible && state.calibrationMode) {
    drawZoneOverlay(state.zones.mouth, state.selectedZone === "mouth");
    drawZoneOverlay(state.zones.ear, state.selectedZone === "ear");
  }

  if (state.debugOverlaysVisible) {
    drawHud();
    drawLanguageSpawnOverlay();
  }
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
    "C calibration | O debug overlays | TAB zone | arrows move | [ ] scale | , . rotate",
    "S save | L load | D debug trails | SPACE pause emit | -/+ speed",
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

function drawLanguageSpawnOverlay() {
  const pad = 12;
  const panelW = min(300, width - 24);
  const rowH = 17;
  const titleH = 24;
  const footerH = 20;
  const n = LANG_WEIGHT_ORDER.length;
  const panelH = titleH + n * rowH + footerH + 12;

  let totalSpawns = 0;
  for (let i = 0; i < LANG_WEIGHT_ORDER.length; i += 1) {
    totalSpawns += state.langSpawnCounts[LANG_WEIGHT_ORDER[i]];
  }

  const x0 = width - panelW - pad;
  const y0 = pad;
  const xRight = x0 + panelW - 10;

  push();
  noStroke();
  fill(0, 130);
  rect(x0, y0, panelW, panelH, 10);
  fill(255, 230);
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text("Spawns by language", x0 + 10, y0 + 8);

  textStyle(NORMAL);
  textSize(12);
  let y = y0 + titleH;

  for (let i = 0; i < LANG_WEIGHT_ORDER.length; i += 1) {
    const key = LANG_WEIGHT_ORDER[i];
    const c = state.langSpawnCounts[key];
    const share =
      totalSpawns > 0 ? ((100 * c) / totalSpawns).toFixed(1) : "—";
    const target = ((100 * LANG_WEIGHTS[key]) / LANG_WEIGHT_TOTAL).toFixed(1);

    const [lr, lg, lb] = LANG_COLORS[key];
    noStroke();
    fill(lr, lg, lb, 255);
    circle(x0 + 15, y + 7, 7);
    textAlign(LEFT, TOP);
    fill(lr, lg, lb, 255);
    text(`${LANG_LABELS[key]}`, x0 + 26, y);
    fill(220, 215, 235, 255);
    textAlign(RIGHT, TOP);
    text(`${c}   ${share}% / ${target}%`, xRight, y);
    y += rowH;
  }

  fill(255, 180);
  textSize(11);
  textAlign(LEFT, TOP);
  text(`Total spawns: ${totalSpawns}  (weights sum to ${LANG_WEIGHT_TOTAL})`, x0 + 10, y + 4);
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
    const { text: word, lang } = pickWeightedRandomWord();
    state.langSpawnCounts[lang] += 1;
    state.words.push(
      new FlyingWord(word, state.zones.mouth, state.zones.ear, lang)
    );
  }
  state.lastSpawnMs = now;
}

function keyPressed() {
  if (key === "c" || key === "C") {
    state.calibrationMode = !state.calibrationMode;
    return false;
  }
  if (key === "o" || key === "O") {
    state.debugOverlaysVisible = !state.debugOverlaysVisible;
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
