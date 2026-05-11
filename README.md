# invisible-violence

Proof-of-concept for a projection-mapped p5.js exhibition:
- two configurable zones (`mouth` and `ear`)
- words emitted from mouth toward ear
- calibration controls and preset save/load
- **Sculpture holes:** the mouth and ear ellipses punch through the background video and ambient fog with a solid fill. In **calibration** mode that fill is `SCULPTURE_HOLE_RGB` (default pure black) so mapped areas stay dark on the projector; in **show** mode (`C` toggles) the fill is **white** so the zones read clearly. Flying text is not drawn inside those shapes. Main-screen video file: `assets/background-video.mp4` (gitignored; copy locally). Align zones with your sculptures (controls below). Red/blue guides are off by default; press `SPACE` while calibrating.

## Run

From project root:

```bash
python3 bridge_server.py
```

Then open [http://localhost:8899/index.html](http://localhost:8899/index.html). On load, that page restores the last saved preset from localStorage when present (`L` or auto-save after `C` to show).

## Phone/iPad Remote Controller

- Main display page: `/index.html`
- Remote controller page: `/controller.html`
- If **Attack Less** still acts like long-press, the phone likely cached an old `controller.js` (short tap used to cancel before the timer). Restart `bridge_server.py`, then close the controller tab and reopen it, or hard-refresh / clear site data for that origin.
- Start the server with `python3 bridge_server.py --port 8899` (this serves both pages + control API).
- For phone/iPad, open `http://YOUR_COMPUTER_IP:8899/controller.html` on the same Wi-Fi.
- Keep the main visual running on `http://YOUR_COMPUTER_IP:8899/index.html` (or localhost on your computer browser).
- Background video for the controller: copy your file to `assets/ipad-background.mov` (see `assets/README.txt`). That path is **gitignored** and will not be uploaded to GitHub.

## Controls

- Controller **Attack More** (left): turn on the next language in order (if any were off); also **slightly increases** word spawn frequency (shorter interval between batches), clamped with keyboard limits.
- Controller **Attack Less** (right): one tap → one `lang_step: -1` → turns off **one random** active language when possible; also **slightly decreases** spawn frequency (longer interval), clamped the same way.
- `C`: toggle calibration overlay (switching **to show** mode auto-saves the same preset as `S` to localStorage)
- `TAB`: switch selected zone (`mouth` / `ear`)
- `M`: toggle **custom shapes** (polygons). When **on**, each zone with **≥3** saved vertices uses a closed polygon instead of an ellipse for holes, spawns, and word clipping; fewer than three vertices falls back to the ellipse for that zone.
- **Polygon edit** (calibration **on** + `M` **on**, `TAB` selects zone): **left-click** background adds a vertex; **drag** a yellow handle to move; **right-click** a handle or **Backspace**/**Delete** removes (Backspace with no handle under the cursor removes the **last** vertex). Clicks on the top-left HUD or right language panel are ignored so overlays stay usable.
- `Arrow keys`: move selected zone
- `[` / `]`: uniform scale (both ellipse axes together)
- `7` / `8`: decrease / increase ellipse **width** only (`SHIFT` for larger steps)
- `9` / `0`: decrease / increase ellipse **height** only (`SHIFT` for larger steps)
- `,` / `.`: rotate selected zone
- **SHOW mode** (not calibrating): **`[`** / **`]`** — fewer / more words spawned (changes ms between spawn batches; **SHIFT** = larger step; hard caps ~65–520 ms). In **calibration**, those keys still resize the selected zone ellipse.
- `S`: save preset to localStorage (zones, vertices, `M` custom-shape flag, calibration/show mode, debug overlays, red-blue guides, selected zone, travel speed, **spawn interval ms**, active languages)
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