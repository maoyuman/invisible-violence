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
  {
    en: "hopeless",
    zhTw: "絕望",
    pt: "sem esperança",
    ja: "絶望",
    fr: "sans espoir",
    es: "sin esperanza",
    tl: "walang pag-asa",
    ko: "절망",
    ru: "безнадёжность",
  },
  {
    en: "dumb",
    zhTw: "呆",
    pt: "tolinho",
    ja: "間抜け",
    fr: "bête",
    es: "tonto",
    tl: "bobo",
    ko: "멍청한",
    ru: "тупой",
  },
  {
    en: "moron",
    zhTw: "蠢材",
    pt: "imbecil",
    ja: "間の抜け",
    fr: "imbécile",
    es: "imbécil",
    tl: "hangal",
    ko: "등신",
    ru: "дебил",
  },
  {
    en: "jerk",
    zhTw: "混蛋",
    pt: "babaca",
    ja: "嫌な奴",
    fr: "connard",
    es: "capullo",
    tl: "bastos",
    ko: "개자식",
    ru: "подонок",
  },
  {
    en: "scum",
    zhTw: "人渣",
    pt: "escória",
    ja: "クズめ",
    fr: "racaille",
    es: "escoria",
    tl: "salot",
    ko: "인간 쓰레기",
    ru: "отбросы",
  },
  {
    en: "burden",
    zhTw: "包袱",
    pt: "fardo",
    ja: "重荷",
    fr: "fardeau",
    es: "carga",
    tl: "pasanin",
    ko: "짐",
    ru: "обуза",
  },
  {
    en: "unwanted",
    zhTw: "多餘",
    pt: "indesejado",
    ja: "いらない",
    fr: "non désiré",
    es: "no deseado",
    tl: "ayaw",
    ko: "필요 없는",
    ru: "ненужный",
  },
  {
    en: "rejected",
    zhTw: "被拒",
    pt: "rejeitado",
    ja: "拒絶された",
    fr: "rejeté",
    es: "rechazado",
    tl: "tinanggihan",
    ko: "거절당한",
    ru: "отвергнутый",
  },
  {
    en: "coward",
    zhTw: "膽小鬼",
    pt: "covarde",
    ja: "臆病者",
    fr: "lâche",
    es: "cobarde",
    tl: "duwag",
    ko: "겁쟁이",
    ru: "трус",
  },
  {
    en: "fake",
    zhTw: "假的",
    pt: "falso",
    ja: "偽物",
    fr: "faux",
    es: "falso",
    tl: "peke",
    ko: "가짜",
    ru: "фальшивый",
  },
  {
    en: "liar",
    zhTw: "騙子",
    pt: "mentiroso",
    ja: "嘘つき",
    fr: "menteur",
    es: "mentiroso",
    tl: "sinungaling",
    ko: "거짓말쟁이",
    ru: "лжец",
  },
  {
    en: "curse",
    zhTw: "詛咒",
    pt: "maldição",
    ja: "呪い",
    fr: "malédiction",
    es: "maldición",
    tl: "sumpa",
    ko: "저주",
    ru: "проклятие",
  },
  {
    en: "poison",
    zhTw: "毒",
    pt: "veneno",
    ja: "毒",
    fr: "poison",
    es: "veneno",
    tl: "lason",
    ko: "독",
    ru: "яд",
  },
  {
    en: "wound",
    zhTw: "傷口",
    pt: "ferida",
    ja: "傷",
    fr: "blessure",
    es: "herida",
    tl: "sugat",
    ko: "상처",
    ru: "рана",
  },
  {
    en: "nightmare",
    zhTw: "噩夢",
    pt: "pesadelo",
    ja: "悪夢",
    fr: "cauchemar",
    es: "pesadilla",
    tl: "bangungot",
    ko: "악몽",
    ru: "кошмар",
  },
  {
    en: "beast",
    zhTw: "畜生",
    pt: "fera",
    ja: "畜生",
    fr: "brute",
    es: "bestia",
    tl: "hayop",
    ko: "짐승",
    ru: "скотина",
  },
  {
    en: "demon",
    zhTw: "惡魔",
    pt: "demônio",
    ja: "悪魔",
    fr: "démon",
    es: "demonio",
    tl: "demonyo",
    ko: "악마",
    ru: "демон",
  },
  {
    en: "rot",
    zhTw: "腐爛",
    pt: "apodrecer",
    ja: "腐る",
    fr: "pourrir",
    es: "pudrir",
    tl: "mabulok",
    ko: "썩다",
    ru: "гниль",
  },
  {
    en: "erase you",
    zhTw: "抹殺你",
    pt: "te apagar",
    ja: "消えろ",
    fr: "t'effacer",
    es: "borrarte",
    tl: "burahin ka",
    ko: "지워 버려",
    ru: "стереть тебя",
  },
  {
    en: "nobody cares",
    zhTw: "沒人在乎",
    pt: "ninguém se importa",
    ja: "誰も気にしない",
    fr: "personne ne s'en soucie",
    es: "a nadie le importa",
    tl: "walang pakialam",
    ko: "아무도 신경 안 써",
    ru: "всем плевать",
  },
  {
    en: "shut up",
    zhTw: "閉嘴",
    pt: "cale-se",
    ja: "黙れ",
    fr: "tais-toi",
    es: "cállate",
    tl: "tumahimik ka",
    ko: "닥쳐",
    ru: "заткнись",
  },
  {
    en: "fool",
    zhTw: "傻瓜",
    pt: "tolo",
    ja: "馬鹿野郎",
    fr: "niais",
    es: "necio",
    tl: "engot",
    ko: "바보 같은 놈",
    ru: "дурачина",
  },
  {
    en: "creep",
    zhTw: "噁心",
    pt: "nojento",
    ja: "気持ち悪い",
    fr: "dégoutant",
    es: "repugnante",
    tl: "nakakadiri",
    ko: "역겨운",
    ru: "мерзкий",
  },
  {
    en: "hate you",
    zhTw: "恨你",
    pt: "te odeio",
    ja: "憎む",
    fr: "je te déteste",
    es: "te odio",
    tl: "galit ako sa'yo",
    ko: "네가 싫어",
    ru: "ненавижу тебя",
  },
  {
    en: "pain",
    zhTw: "痛苦",
    pt: "dor",
    ja: "痛み",
    fr: "douleur",
    es: "dolor",
    tl: "sakit",
    ko: "고통",
    ru: "боль",
  },
  {
    en: "bleeding",
    zhTw: "流血",
    pt: "sangrando",
    ja: "血が出る",
    fr: "saignant",
    es: "sangrando",
    tl: "dumudugo",
    ko: "피 흘리는",
    ru: "кровь",
  },
  {
    en: "screaming",
    zhTw: "尖叫",
    pt: "gritando",
    ja: "叫び",
    fr: "hurlement",
    es: "gritos",
    tl: "sumisigaw",
    ko: "비명",
    ru: "крик",
  },
  {
    en: "invisible",
    zhTw: "看不見",
    pt: "invisível",
    ja: "見えない",
    fr: "invisible",
    es: "invisible",
    tl: "di nakikita",
    ko: "안 보이는",
    ru: "невидимый",
  },
  {
    en: "alone",
    zhTw: "孤獨",
    pt: "sozinho",
    ja: "孤独",
    fr: "seul",
    es: "solo",
    tl: "mag-isa",
    ko: "외로운",
    ru: "одинокий",
  },
  {
    en: "broken",
    zhTw: "碎了",
    pt: "quebrado",
    ja: "壊れた",
    fr: "cassé",
    es: "roto",
    tl: "wasak",
    ko: "부서진",
    ru: "сломанный",
  },
  {
    en: "nothing",
    zhTw: "什麼都不是",
    pt: "nada",
    ja: "何でもない",
    fr: "rien",
    es: "nada",
    tl: "wala",
    ko: "아무것도 아닌",
    ru: "ничто",
  },
  {
    en: "dirty",
    zhTw: "骯髒",
    pt: "sujo",
    ja: "汚い",
    fr: "sale",
    es: "sucio",
    tl: "marumi",
    ko: "더러운",
    ru: "грязный",
  },
  {
    en: "violence",
    zhTw: "暴力",
    pt: "violência",
    ja: "暴力",
    fr: "violence",
    es: "violencia",
    tl: "karahasan",
    ko: "폭력",
    ru: "насилие",
  },
  {
    en: "monster",
    zhTw: "怪物",
    pt: "monstro",
    ja: "怪物",
    fr: "monstre",
    es: "monstruo",
    tl: "halimaw",
    ko: "괴물",
    ru: "монстр",
  },
  {
    en: "curse you",
    zhTw: "咒你",
    pt: "te amaldiçoar",
    ja: "のろう",
    fr: "te maudire",
    es: "maldecirte",
    tl: "sumpain ka",
    ko: "저주할 거야",
    ru: "прокляну тебя",
  },
  {
    en: "never enough",
    zhTw: "永遠不夠",
    pt: "nunca basta",
    ja: "足りない",
    fr: "jamais assez",
    es: "nunca es suficiente",
    tl: "kulang pa rin",
    ko: "영원히 부족해",
    ru: "никогда не хватит",
  },
  {
    en: "too loud",
    zhTw: "太吵",
    pt: "alto demais",
    ja: "うるさい",
    fr: "trop fort",
    es: "demasiado ruido",
    tl: "masyadong maingay",
    ko: "시끄러워",
    ru: "слишком громко",
  },
  {
    en: "too quiet",
    zhTw: "太安靜",
    pt: "quieto demais",
    ja: "静かすぎ",
    fr: "trop silencieux",
    es: "demasiado silencio",
    tl: "sobrang tahimik",
    ko: "너무 조용해",
    ru: "слишком тихо",
  },
];

/** Avoid picking the same concept twice in a row (reduces visible repetition). */
let lastWordGroupIndex = -1;

function pickRandomLang() {
  const activeKeys = getActiveLanguageKeys();
  const activeWeightTotal = activeKeys.reduce(
    (sum, key) => sum + LANG_WEIGHTS[key],
    0
  );
  let r = random(activeWeightTotal || LANG_WEIGHT_TOTAL);
  for (let i = 0; i < activeKeys.length; i += 1) {
    const key = activeKeys[i];
    r -= LANG_WEIGHTS[key];
    if (r < 0) {
      return key;
    }
  }
  return activeKeys[activeKeys.length - 1] || LANG_WEIGHT_ORDER[0];
}

/** Pick language by weight, then a random concept in that language. */
function pickWeightedRandomWord() {
  const lang = pickRandomLang();
  const n = WORD_GROUPS.length;
  let idx = floor(random(n));
  let tries = 0;
  while (idx === lastWordGroupIndex && n > 1 && tries < 16) {
    idx = floor(random(n));
    tries += 1;
  }
  lastWordGroupIndex = idx;
  const g = WORD_GROUPS[idx];
  return { text: g[lang], lang };
}

const FONT_STACK =
  '"Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Noto Sans", sans-serif';

/** Scene background RGB — base layer behind fog / video letterboxing. */
const SCENE_BG = [7, 2, 14];

/** Main canvas background video (assets/background-video.mp4): slower + dimmed so words stay primary. */
const BACKGROUND_VIDEO_SPEED = 0.42;
const BACKGROUND_VIDEO_ALPHA = 105;

/**
 * Color painted inside mouth/ear ellipses (“holes”).
 * The web canvas cannot send true transparency to a projector — every pixel is still light.
 * Pure black (0,0,0) minimizes emitted light so sculptures are not illuminated by the map.
 * If your wall reads brighter, sample its RGB under venue lights and set that here instead.
 */
const SCULPTURE_HOLE_RGB = [0, 0, 0];

const STORAGE_KEY = "iv-calibration-v1";

/** Min/max ms between spawn batches (lower = denser words). */
const SPAWN_INTERVAL_MS_MIN = 65;
const SPAWN_INTERVAL_MS_MAX = 520;
const SPAWN_KEYBOARD_STEP_MS = 16;
const SPAWN_KEYBOARD_STEP_MS_SHIFT = 38;
/** Each Attack More / Attack Less tick nudges interval when a language is actually added/removed. */
const SPAWN_LANG_NUDGE_MS = 12;

const state = {
  calibrationMode: true,
  debugOverlaysVisible: true,
  debugTrails: false,
  zoneReferenceVisible: false,
  /** When true and a zone has ≥3 vertices, that zone uses a polygon instead of an ellipse. */
  useCustomShapes: false,
  /** @type {{ zoneKey: string, index: number } | null} */
  polygonDrag: null,
  paused: false,
  selectedZone: "mouth",
  speedMultiplier: 0.3,
  minSpeedMultiplier: 0.15,
  maxSpeedMultiplier: 2.4,
  /** Milliseconds between spawn batches in maybeSpawnWords (clamped). */
  spawnIntervalMs: 140,
  lastSpawnMs: 0,
  maxWords: 180,
  /** Which languages can spawn (subset of LANG_WEIGHT_ORDER). */
  activeLanguages: Object.fromEntries(LANG_WEIGHT_ORDER.map((k) => [k, true])),
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
      /** Local-space vertices {lx, ly} relative to zone center (pre-rotation); used when useCustomShapes and length ≥ 3. */
      vertices: [],
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
      vertices: [],
    },
  },
};

const POLYGON_VERTEX_HIT_PX = 22;

function zoneUsesPolygon(zone) {
  return (
    state.useCustomShapes &&
    zone.vertices &&
    zone.vertices.length >= 3
  );
}

function zoneWorldToLocal(zone, wx, wy) {
  const dx = wx - zone.x;
  const dy = wy - zone.y;
  const c = cos(zone.angle);
  const s = sin(zone.angle);
  return { lx: dx * c + dy * s, ly: -dx * s + dy * c };
}

function zoneLocalToWorld(zone, lx, ly) {
  const c = cos(zone.angle);
  const s = sin(zone.angle);
  return createVector(zone.x + lx * c - ly * s, zone.y + lx * s + ly * c);
}

function pointInPolygonLocal(px, py, verts) {
  if (!verts || verts.length < 3) {
    return false;
  }
  let c = false;
  const n = verts.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const vi = verts[i];
    const vj = verts[j];
    if ((vi.ly > py) !== (vj.ly > py)) {
      const dy = vj.ly - vi.ly;
      if (abs(dy) < 1e-8) {
        continue;
      }
      const xInt = vi.lx + ((py - vi.ly) * (vj.lx - vi.lx)) / dy;
      if (px < xInt) {
        c = !c;
      }
    }
  }
  return c;
}

function zoneContainsWorldPoint(wx, wy, zone) {
  if (zoneUsesPolygon(zone)) {
    const loc = zoneWorldToLocal(zone, wx, wy);
    return pointInPolygonLocal(loc.lx, loc.ly, zone.vertices);
  }
  return isPointInsideRotatedEllipse(wx, wy, zone);
}

function nearestVertexIndexToWorld(zone, wx, wy) {
  if (!zone.vertices || zone.vertices.length === 0) {
    return -1;
  }
  const r2 = POLYGON_VERTEX_HIT_PX * POLYGON_VERTEX_HIT_PX;
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < zone.vertices.length; i++) {
    const p = zoneLocalToWorld(zone, zone.vertices[i].lx, zone.vertices[i].ly);
    const d = (p.x - wx) * (p.x - wx) + (p.y - wy) * (p.y - wy);
    if (d <= r2 && d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

function zonePolygonCentroidLocal(zone) {
  const verts = zone.vertices;
  const n = verts.length;
  if (n === 0) {
    return { lx: 0, ly: 0 };
  }
  if (n < 3) {
    let sx = 0;
    let sy = 0;
    for (let i = 0; i < n; i++) {
      sx += verts[i].lx;
      sy += verts[i].ly;
    }
    return { lx: sx / n, ly: sy / n };
  }
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const cross = verts[i].lx * verts[j].ly - verts[j].lx * verts[i].ly;
    a += cross;
    cx += (verts[i].lx + verts[j].lx) * cross;
    cy += (verts[i].ly + verts[j].ly) * cross;
  }
  a *= 0.5;
  if (abs(a) < 1e-6) {
    return { lx: verts[0].lx, ly: verts[0].ly };
  }
  return { lx: cx / (6 * a), ly: cy / (6 * a) };
}

/** >1 pulls mouth/ear spawn points toward polygon centroid vs uniform fill (custom shapes only). */
const FLYING_POLYGON_SPAWN_CENTER_BIAS = 2.7;

function randomPointInZonePolygon(zone) {
  const verts = zone.vertices;
  let minx = Infinity;
  let miny = Infinity;
  let maxx = -Infinity;
  let maxy = -Infinity;
  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    minx = min(minx, v.lx);
    miny = min(miny, v.ly);
    maxx = max(maxx, v.lx);
    maxy = max(maxy, v.ly);
  }
  for (let attempt = 0; attempt < 900; attempt += 1) {
    const lx = random(minx, maxx);
    const ly = random(miny, maxy);
    if (pointInPolygonLocal(lx, ly, verts)) {
      const cent = zonePolygonCentroidLocal(zone);
      const t = pow(random(), FLYING_POLYGON_SPAWN_CENTER_BIAS);
      let mixLx = cent.lx + t * (lx - cent.lx);
      let mixLy = cent.ly + t * (ly - cent.ly);
      if (!pointInPolygonLocal(mixLx, mixLy, verts)) {
        mixLx = lx;
        mixLy = ly;
      }
      return zoneLocalToWorld(zone, mixLx, mixLy);
    }
  }
  const c = zonePolygonCentroidLocal(zone);
  return zoneLocalToWorld(zone, c.lx, c.ly);
}

let remoteLastCommandId = 0;
/** p5 video element for main screen background; null if missing. */
let bgVideo = null;

/** Random offset (px) on bezier control points — larger = wider / longer detour arcs. */
const FLYING_PATH_CTRL_JITTER_X = 520;
const FLYING_PATH_CTRL_JITTER_Y = 580;

class FlyingWord {
  constructor(text, fromZone, toZone, lang) {
    this.text = text;
    this.lang = lang;
    this.fromZone = fromZone;
    this.toZone = toZone;

    this.start = randomPointInZone(fromZone);
    this.end = randomPointInZone(toZone);

    // Handles near endpoints so large jitter arcs farther across the frame.
    this.curveA = p5.Vector.lerp(this.start, this.end, 0.22);
    this.curveB = p5.Vector.lerp(this.start, this.end, 0.78);
    this.curveA.add(
      random(-FLYING_PATH_CTRL_JITTER_X, FLYING_PATH_CTRL_JITTER_X),
      random(-FLYING_PATH_CTRL_JITTER_Y, FLYING_PATH_CTRL_JITTER_Y)
    );
    this.curveB.add(
      random(-FLYING_PATH_CTRL_JITTER_X, FLYING_PATH_CTRL_JITTER_X),
      random(-FLYING_PATH_CTRL_JITTER_Y, FLYING_PATH_CTRL_JITTER_Y)
    );

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
    const wiggleX = sin((now * 0.008 + this.born) * this.jitter) * 3.5;
    const wiggleY = cos((now * 0.006 + this.born) * this.jitter) * 3.0;

    const drawX = pos.x + wiggleX;
    const drawY = pos.y + wiggleY;
    if (
      zoneContainsWorldPoint(drawX, drawY, state.zones.mouth) ||
      zoneContainsWorldPoint(drawX, drawY, state.zones.ear)
    ) {
      return;
    }

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
  c.elt.addEventListener("contextmenu", (e) => e.preventDefault());
  textFont("Noto Sans TC");
  textStyle(BOLD);
  loadCalibration();
  setupBackgroundVideo();
  setupLanguageControlButtons();
  setupRemoteCommandPolling();
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
  background(SCENE_BG[0], SCENE_BG[1], SCENE_BG[2], 255);

  for (let i = 0; i < 8; i += 1) {
    const y = (frameCount * 0.1 + i * 140) % (height + 140);
    noStroke();
    fill(145, 0, 90, 10);
    ellipse(width * 0.44, y - 70, width * 1.2, 120);
  }

  if (bgVideo && bgVideo.elt) {
    const w = bgVideo.width;
    const h = bgVideo.height;
    if (w > 0 && h > 0) {
      drawBackgroundVideoCover(bgVideo);
    }
  }

  punchSculptureHolesInBackground();

  if (state.zoneReferenceVisible) {
    drawZoneReference(state.zones.mouth, "mouth");
    drawZoneReference(state.zones.ear, "ear");
  }
}

function drawZoneReference(zone, type) {
  push();
  translate(zone.x, zone.y);
  rotate(zone.angle);
  if (zoneUsesPolygon(zone)) {
    noStroke();
    fill(...zone.tint);
    beginShape();
    for (let i = 0; i < zone.vertices.length; i++) {
      vertex(zone.vertices[i].lx, zone.vertices[i].ly);
    }
    endShape(CLOSE);
    noFill();
    stroke(...zone.stroke);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < zone.vertices.length; i++) {
      vertex(zone.vertices[i].lx, zone.vertices[i].ly);
    }
    endShape(CLOSE);
  } else {
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
  }
  pop();
}

function drawZoneOverlay(zone, isSelected) {
  push();
  translate(zone.x, zone.y);
  rotate(zone.angle);

  if (zoneUsesPolygon(zone)) {
    strokeWeight(isSelected ? 3 : 1.5);
    stroke(isSelected ? 255 : 200, isSelected ? 230 : 130);
    noFill();
    beginShape();
    for (let i = 0; i < zone.vertices.length; i++) {
      vertex(zone.vertices[i].lx, zone.vertices[i].ly);
    }
    endShape(CLOSE);

    if (state.calibrationMode && state.useCustomShapes && isSelected) {
      for (let i = 0; i < zone.vertices.length; i++) {
        const v = zone.vertices[i];
        stroke(255, 220, 60);
        strokeWeight(2);
        fill(40, 35, 50);
        ellipse(v.lx, v.ly, 14, 14);
      }
    }

    const c = zonePolygonCentroidLocal(zone);
    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text(zone.label, c.lx, c.ly - 28);
  } else {
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
  }
  pop();
}

function drawHud() {
  const activeKeys = getActiveLanguageKeys();
  const polyHint =
    state.calibrationMode && state.useCustomShapes
      ? "poly edit: click=add | drag=move | right-click or Backspace=remove"
      : "poly: M toggles; calib+M to edit vertices";
  const lines = [
    "Invisible Violence - POC",
    `mode: ${state.calibrationMode ? "CALIBRATION" : "SHOW"} | selected: ${state.selectedZone.toUpperCase()} | speed: ${state.speedMultiplier.toFixed(2)}x | spawn: ${state.spawnIntervalMs}ms (${SPAWN_INTERVAL_MS_MIN}–${SPAWN_INTERVAL_MS_MAX}) | red/blue: ${state.zoneReferenceVisible ? "VISIBLE" : "HIDDEN"}`,
    `custom shapes: ${state.useCustomShapes ? "ON (≥3 pts/zone uses polygon)" : "OFF (ellipses)"} | ${polyHint}`,
    `languages: ${activeKeys.length}/${LANG_WEIGHT_ORDER.length} (${activeKeys.join(", ")})`,
    "C calibration | O debug overlays | TAB zone | M custom shapes | arrows move | CAL: [ ] zone scale | 7 8 width | 9 0 height | , . rotate",
    "SHOW: [ fewer words / ] more words (SHIFT=big step) | Attack More/Less nudge same (capped) | S save | L load | C→show auto-saves",
    "D debug trails | SPACE red-blue guides | P pause | holes=clean sculptures | -/+ travel speed",
  ];

  push();
  noStroke();
  fill(0, 130);
  rect(14, 14, 900, 172, 10);
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
  const activeKeys = getActiveLanguageKeys();
  const n = activeKeys.length;
  const panelH = titleH + n * rowH + footerH + 12;

  let totalSpawns = 0;
  for (let i = 0; i < activeKeys.length; i += 1) {
    totalSpawns += state.langSpawnCounts[activeKeys[i]];
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
  const activeWeightTotal = activeKeys.reduce(
    (sum, key) => sum + LANG_WEIGHTS[key],
    0
  );

  for (let i = 0; i < activeKeys.length; i += 1) {
    const key = activeKeys[i];
    const c = state.langSpawnCounts[key];
    const share =
      totalSpawns > 0 ? ((100 * c) / totalSpawns).toFixed(1) : "—";
    const target = ((100 * LANG_WEIGHTS[key]) / activeWeightTotal).toFixed(1);

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
  text(
    `Total spawns: ${totalSpawns}  (weights sum to ${activeWeightTotal})`,
    x0 + 10,
    y + 4
  );
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
    state.polygonDrag = null;
    if (!state.calibrationMode) {
      saveCalibration();
    }
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
    state.zoneReferenceVisible = !state.zoneReferenceVisible;
    return false;
  }
  if (key === "p" || key === "P") {
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
  if (key === "m" || key === "M") {
    state.useCustomShapes = !state.useCustomShapes;
    state.polygonDrag = null;
    return false;
  }
  if (
    (keyCode === 8 || keyCode === 46) &&
    state.calibrationMode &&
    state.useCustomShapes
  ) {
    const z = state.zones[state.selectedZone];
    let idx = nearestVertexIndexToWorld(z, mouseX, mouseY);
    if (idx < 0 && z.vertices && z.vertices.length > 0) {
      idx = z.vertices.length - 1;
    }
    if (idx >= 0) {
      z.vertices.splice(idx, 1);
    }
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
    if (key === "[") {
      changeSpawnKeyboard(1);
      return false;
    }
    if (key === "]") {
      changeSpawnKeyboard(-1);
      return false;
    }
    return true;
  }

  const zone = state.zones[state.selectedZone];
  const moveStep = keyIsDown(SHIFT) ? 15 : 6;
  const rotateStep = keyIsDown(SHIFT) ? 0.055 : 0.022;
  const scaleStep = keyIsDown(SHIFT) ? 20 : 8;
  const ellipseAxisStep = keyIsDown(SHIFT) ? 20 : 8;

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
  // Digit row: use keyCode so SHIFT (larger steps) still matches physical keys.
  if (keyCode === 55) {
    zone.w = max(40, zone.w - ellipseAxisStep);
    return false;
  }
  if (keyCode === 56) {
    zone.w += ellipseAxisStep;
    return false;
  }
  if (keyCode === 57) {
    zone.h = max(40, zone.h - ellipseAxisStep);
    return false;
  }
  if (keyCode === 48) {
    zone.h += ellipseAxisStep;
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
    useCustomShapes: state.useCustomShapes,
    calibrationMode: state.calibrationMode,
    debugOverlaysVisible: state.debugOverlaysVisible,
    debugTrails: state.debugTrails,
    zoneReferenceVisible: state.zoneReferenceVisible,
    selectedZone: state.selectedZone,
    speedMultiplier: state.speedMultiplier,
    spawnIntervalMs: state.spawnIntervalMs,
    activeLanguages: { ...state.activeLanguages },
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function applyLoadedSettings(parsed) {
  if (typeof parsed.useCustomShapes === "boolean") {
    state.useCustomShapes = parsed.useCustomShapes;
  }
  if (typeof parsed.calibrationMode === "boolean") {
    state.calibrationMode = parsed.calibrationMode;
  }
  if (typeof parsed.debugOverlaysVisible === "boolean") {
    state.debugOverlaysVisible = parsed.debugOverlaysVisible;
  }
  if (typeof parsed.debugTrails === "boolean") {
    state.debugTrails = parsed.debugTrails;
  }
  if (typeof parsed.zoneReferenceVisible === "boolean") {
    state.zoneReferenceVisible = parsed.zoneReferenceVisible;
  }
  if (parsed.selectedZone === "mouth" || parsed.selectedZone === "ear") {
    state.selectedZone = parsed.selectedZone;
  }
  if (Number.isFinite(parsed.speedMultiplier)) {
    state.speedMultiplier = constrain(
      parsed.speedMultiplier,
      state.minSpeedMultiplier,
      state.maxSpeedMultiplier
    );
  }
  if (Number.isFinite(parsed.spawnIntervalMs)) {
    state.spawnIntervalMs = constrain(
      round(parsed.spawnIntervalMs),
      SPAWN_INTERVAL_MS_MIN,
      SPAWN_INTERVAL_MS_MAX
    );
  }
  if (parsed.activeLanguages && typeof parsed.activeLanguages === "object") {
    for (let i = 0; i < LANG_WEIGHT_ORDER.length; i += 1) {
      const k = LANG_WEIGHT_ORDER[i];
      if (typeof parsed.activeLanguages[k] === "boolean") {
        state.activeLanguages[k] = parsed.activeLanguages[k];
      }
    }
    const anyOn = LANG_WEIGHT_ORDER.some((k) => state.activeLanguages[k]);
    if (!anyOn) {
      state.activeLanguages[LANG_WEIGHT_ORDER[0]] = true;
    }
  }
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
    applyLoadedSettings(parsed);
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
  if (loaded.vertices === null) {
    zone.vertices = [];
  } else if (Array.isArray(loaded.vertices)) {
    zone.vertices = loaded.vertices
      .map((p) => ({
        lx: Number(p.lx !== undefined ? p.lx : p.x),
        ly: Number(p.ly !== undefined ? p.ly : p.y),
      }))
      .filter((p) => Number.isFinite(p.lx) && Number.isFinite(p.ly));
  }
}

function setDefaultZonePositions() {
  state.zones.mouth.x = width * 0.25;
  state.zones.mouth.y = height * 0.65;
  state.zones.ear.x = width * 0.78;
  state.zones.ear.y = height * 0.35;
}

function randomPointInZone(zone) {
  if (zoneUsesPolygon(zone)) {
    return randomPointInZonePolygon(zone);
  }
  const a = random(TWO_PI);
  const r = sqrt(random());
  const px = (zone.w * 0.5 * r) * cos(a);
  const py = (zone.h * 0.5 * r) * sin(a);
  const rotatedX = px * cos(zone.angle) - py * sin(zone.angle);
  const rotatedY = px * sin(zone.angle) + py * cos(zone.angle);
  return createVector(zone.x + rotatedX, zone.y + rotatedY);
}

/** True if world point lies inside zone's rotated ellipse (same shape as spawn + hole punch). */
function isPointInsideRotatedEllipse(px, py, zone) {
  const dx = px - zone.x;
  const dy = py - zone.y;
  const c = cos(zone.angle);
  const s = sin(zone.angle);
  const lx = dx * c + dy * s;
  const ly = -dx * s + dy * c;
  const rx = zone.w * 0.5;
  const ry = zone.h * 0.5;
  if (rx <= 0 || ry <= 0) {
    return false;
  }
  const nx = lx / rx;
  const ny = ly / ry;
  return nx * nx + ny * ny <= 1;
}

function punchSculptureHolesInBackground() {
  drawVideoMaskForZone(state.zones.mouth);
  drawVideoMaskForZone(state.zones.ear);
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

/** SHOW mode: `[` / `]` — direction +1 = slower (longer interval), -1 = faster. */
function changeSpawnKeyboard(intervalDirection) {
  const step = keyIsDown(SHIFT)
    ? SPAWN_KEYBOARD_STEP_MS_SHIFT
    : SPAWN_KEYBOARD_STEP_MS;
  state.spawnIntervalMs = constrain(
    state.spawnIntervalMs + intervalDirection * step,
    SPAWN_INTERVAL_MS_MIN,
    SPAWN_INTERVAL_MS_MAX
  );
}

/** +1 after a language was added (denser); -1 after one was removed (sparser). Clamped. */
function nudgeSpawnForLangChange(langDelta) {
  state.spawnIntervalMs = constrain(
    state.spawnIntervalMs - langDelta * SPAWN_LANG_NUDGE_MS,
    SPAWN_INTERVAL_MS_MIN,
    SPAWN_INTERVAL_MS_MAX
  );
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

function getActiveLanguageKeys() {
  return LANG_WEIGHT_ORDER.filter((k) => state.activeLanguages[k]);
}

function addNextLanguage() {
  for (let i = 0; i < LANG_WEIGHT_ORDER.length; i += 1) {
    const k = LANG_WEIGHT_ORDER[i];
    if (!state.activeLanguages[k]) {
      state.activeLanguages[k] = true;
      return;
    }
  }
}

/** Turn off one random active language (no-op if only one left). One call per controller tap / per `lang_step: -1`. */
function removeOneRandomActiveLanguage() {
  const active = LANG_WEIGHT_ORDER.filter((k) => state.activeLanguages[k]);
  if (active.length <= 1) {
    return;
  }
  const k = random(active);
  state.activeLanguages[k] = false;
}

function changeActiveLanguageCount(step) {
  if (step > 0) {
    for (let i = 0; i < step; i += 1) {
      const nBefore = getActiveLanguageKeys().length;
      addNextLanguage();
      if (getActiveLanguageKeys().length > nBefore) {
        nudgeSpawnForLangChange(1);
      }
    }
    return;
  }
  if (step < 0) {
    const reps = min(abs(step), LANG_WEIGHT_ORDER.length);
    for (let i = 0; i < reps; i += 1) {
      const nBefore = getActiveLanguageKeys().length;
      removeOneRandomActiveLanguage();
      if (getActiveLanguageKeys().length < nBefore) {
        nudgeSpawnForLangChange(-1);
      }
    }
  }
}

function setupLanguageControlButtons() {
  const clickBtn = document.getElementById("click-btn");
  const minusBtn = document.getElementById("long-press-btn");
  if (!clickBtn || !minusBtn) {
    return;
  }

  clickBtn.addEventListener("click", () => changeActiveLanguageCount(1));
  minusBtn.addEventListener("click", () => changeActiveLanguageCount(-1));
}

function setupRemoteCommandPolling() {
  window.setInterval(async () => {
    try {
      const res = await fetch(`/api/commands?since=${remoteLastCommandId}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        return;
      }
      const payload = await res.json();
      if (!payload || !Array.isArray(payload.commands)) {
        return;
      }
      for (let i = 0; i < payload.commands.length; i += 1) {
        const cmd = payload.commands[i];
        if (Number.isFinite(cmd.id)) {
          remoteLastCommandId = max(remoteLastCommandId, cmd.id);
        }
        if (cmd.type === "lang_step" && Number.isFinite(cmd.step)) {
          changeActiveLanguageCount(cmd.step);
        }
      }
    } catch (_err) {
      // Ignore temporary network errors while polling.
    }
  }, 250);
}

function setupBackgroundVideo() {
  bgVideo = createVideo(["assets/background-video.mp4"], () => {
    bgVideo.loop();
    bgVideo.volume(0);
    bgVideo.speed(BACKGROUND_VIDEO_SPEED);
    const el = bgVideo.elt;
    if (el) {
      el.playbackRate = BACKGROUND_VIDEO_SPEED;
    }
  });
  bgVideo.hide();
  const el = bgVideo.elt;
  el.muted = true;
  el.playsInline = true;
  el.setAttribute("playsinline", "");
}

/** Scale video like CSS object-fit: cover. */
function drawBackgroundVideoCover(vid) {
  const vw = vid.width;
  const vh = vid.height;
  const scale = max(width / vw, height / vh);
  const dw = vw * scale;
  const dh = vh * scale;
  const ox = (width - dw) * 0.5;
  const oy = (height - dh) * 0.5;
  push();
  tint(255, BACKGROUND_VIDEO_ALPHA);
  image(vid, ox, oy, dw, dh);
  noTint();
  pop();
}

/**
 * Punch holes through video + fog. In calibration, use SCULPTURE_HOLE_RGB so mapped
 * areas stay as dark as possible on the projector; in show mode, white fill so zones read clearly.
 */
function drawVideoMaskForZone(zone) {
  push();
  translate(zone.x, zone.y);
  rotate(zone.angle);
  noStroke();
  if (state.calibrationMode) {
    fill(
      SCULPTURE_HOLE_RGB[0],
      SCULPTURE_HOLE_RGB[1],
      SCULPTURE_HOLE_RGB[2]
    );
  } else {
    fill(255, 255, 255);
  }
  if (zoneUsesPolygon(zone)) {
    beginShape();
    for (let i = 0; i < zone.vertices.length; i++) {
      vertex(zone.vertices[i].lx, zone.vertices[i].ly);
    }
    endShape(CLOSE);
  } else {
    ellipse(0, 0, zone.w, zone.h);
  }
  pop();
}

function isMouseOverSketchHud() {
  return mouseX >= 10 && mouseX <= 930 && mouseY >= 8 && mouseY <= 200;
}

function isMouseOverSketchLangPanel() {
  const panelW = min(300, width - 24);
  const x0 = width - panelW - 12;
  if (mouseX < x0 - 8 || mouseX > width - 4) {
    return false;
  }
  const n = getActiveLanguageKeys().length;
  const panelH = 24 + n * 17 + 20 + 36;
  return mouseY >= 6 && mouseY <= 6 + panelH;
}

function mousePressed() {
  if (!state.calibrationMode || !state.useCustomShapes) {
    return true;
  }
  if (isMouseOverSketchHud() || isMouseOverSketchLangPanel()) {
    return true;
  }
  const zoneKey = state.selectedZone;
  const zone = state.zones[zoneKey];
  if (!zone.vertices) {
    zone.vertices = [];
  }
  if (mouseButton === RIGHT) {
    const idx = nearestVertexIndexToWorld(zone, mouseX, mouseY);
    if (idx >= 0) {
      zone.vertices.splice(idx, 1);
    }
    return false;
  }
  if (mouseButton !== LEFT) {
    return true;
  }
  const hit = nearestVertexIndexToWorld(zone, mouseX, mouseY);
  if (hit >= 0) {
    state.polygonDrag = { zoneKey, index: hit };
    return false;
  }
  const loc = zoneWorldToLocal(zone, mouseX, mouseY);
  zone.vertices.push({ lx: loc.lx, ly: loc.ly });
  return false;
}

function mouseDragged() {
  if (!state.polygonDrag) {
    return true;
  }
  const zone = state.zones[state.polygonDrag.zoneKey];
  const idx = state.polygonDrag.index;
  if (!zone || !zone.vertices || idx < 0 || idx >= zone.vertices.length) {
    state.polygonDrag = null;
    return true;
  }
  const loc = zoneWorldToLocal(zone, mouseX, mouseY);
  zone.vertices[idx].lx = loc.lx;
  zone.vertices[idx].ly = loc.ly;
  return false;
}

function mouseReleased() {
  state.polygonDrag = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
