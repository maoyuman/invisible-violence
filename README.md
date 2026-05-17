# invisible-violence

Proof-of-concept for a projection-mapped p5.js exhibition:
- two configurable zones (`mouth` and `ear`)
- words emitted from mouth toward ear
- calibration controls and preset save/load
- **Sculpture holes:** the mouth and ear ellipses punch through the background video and ambient fog with a solid fill. In **calibration** mode that fill is `SCULPTURE_HOLE_RGB` (default pure black) so mapped areas stay dark on the projector; in **show** mode (`C` toggles) the fill is **white** so the zones read clearly. Flying text is not drawn inside those shapes. Main-screen video file: `assets/background-video.mp4` (gitignored; copy locally). Align zones with your sculptures (controls below). Red/blue guides are off by default; press `SPACE` while calibrating.

## Run

From project root (first time only: `npm install`):

```bash
npm start
```

Default port is **8899** (`PORT=9000 npm start` to override). Then open [http://localhost:8899/index.html](http://localhost:8899/index.html). On load, that page restores the last saved preset from localStorage when present (`L` or auto-save after `C` to show).

Optional HTTP mirror for debugging: `POST /api/command` with JSON `{"type":"lang_step","step":1}` broadcasts the same way as WebSocket taps.

Static files and relay run from **`server.mjs`** (Node). The tablet sends language steps over **WebSocket** to the same host; the main display listens on **`/ws`** — no HTTP polling.

## Phone/iPad Remote Controller

- Main display page: `/index.html`
- Remote controller page: `/controller.html`
- Start the relay with **`npm start`** on the exhibit PC (same Wi‑Fi as the tablet).
- For phone/iPad, open `http://YOUR_COMPUTER_IP:8899/controller.html`.
- Keep the main visual running on `http://YOUR_COMPUTER_IP:8899/index.html` (or localhost on your computer browser).
- If the controller shows **Wrong server**, you opened it via plain `python -m http.server` or `file://` — use **`npm start`** instead so **`GET /__relay_ok`** returns `invisible-violence-relay` and WebSockets work.
- If taps fail after an update, hard-refresh the controller tab or clear site data for that origin (cache-busting query strings on `controller.js`).
- Background video for the controller: copy your file to `assets/ipad-background.mov` (see `assets/README.txt`). That path is **gitignored** and will not be uploaded to GitHub.
- **No browser UI:** Safari and Chrome on iPad cannot hide tabs/the address bar while you use a normal tab. Use **Share → Add to Home Screen**, then open the controller from the home-screen icon (standalone / web app mode). The controller page includes an on-screen note and a small **`controller-manifest.webmanifest`** so installed shortcuts launch more like an app.

## Controls

- Controller **Attack More** (left): turn on the next language in order (if any were off); also **slightly increases** word spawn frequency (shorter interval between batches), clamped with keyboard limits.
- Controller **Attack Less** (right): sends **`lang_step: -1`** over WebSocket → turns off **one random** active language when possible; also **slightly decreases** spawn frequency (longer interval), clamped the same way.
- `C`: toggle calibration overlay (switching **to show** mode auto-saves the same preset as `S` to localStorage)
- `TAB`: switch selected zone (`mouth` / `ear`)
- `M`: toggle **custom shapes** (polygons). When **on**, each zone with **≥3** saved vertices uses a closed polygon instead of an ellipse for holes, spawns, and word clipping; fewer than three vertices falls back to the ellipse for that zone.
- **Polygon edit** (calibration **on** + `M` **on**, `TAB` selects zone): **left-click** background adds a vertex; **drag** a yellow handle to move; **right-click** a handle or **Backspace**/**Delete** removes (Backspace with no handle under the cursor removes the **last** vertex). Clicks on the top-left HUD or right language panel are ignored so overlays stay usable.
- `Arrow keys`: move selected zone
- `[` / `]`: uniform scale (both ellipse axes together)
- `7` / `8`: decrease / increase ellipse **width** only (`SHIFT` for larger steps)
- `9` / `0`: decrease / increase ellipse **height** only (`SHIFT` for larger steps)
- `,` / `.`: rotate selected zone
- **SHOW mode** (not calibrating): **`[`** / **`]`** — fewer / more words spawned (changes ms between spawn batches; **SHIFT** = larger step; hard caps **250–3000 ms**). Remote **Attack More/Less** moves spawn rate by one tenth of that span per tap (10 taps cover the full range). In **calibration**, those keys still resize the selected zone ellipse. Near the **slowest** end of that range, only **one** word is allowed on screen at a time (no overlapping flights).
- `S`: save preset to localStorage (zones, vertices, `M` custom-shape flag, calibration/show mode, red-blue guides, selected zone, travel speed, **spawn interval ms**, active languages). Debug overlays are **not** saved — press **`O`** each session.
- `L`: load that preset from localStorage
- `D`: toggle debug trajectories
- `SPACE`: hide/show red-blue mouth/ear reference shapes
- `P`: pause/resume emission
- `-` / `+`: decrease/increase word **travel** speed along paths (`SHIFT` for larger steps) — separate from spawn **frequency** above.

## Basic Git Workflow

From project root:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

If your branch is not `main`, replace `main` with your current branch name.
