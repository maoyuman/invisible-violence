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

Then open [http://localhost:8899/index.html](http://localhost:8899/index.html).

## Phone/iPad Remote Controller

- Main display page: `/index.html`
- Remote controller page: `/controller.html`
- If **Attack Less** still acts like long-press, the phone likely cached an old `controller.js` (short tap used to cancel before the timer). Restart `bridge_server.py`, then close the controller tab and reopen it, or hard-refresh / clear site data for that origin.
- Start the server with `python3 bridge_server.py --port 8899` (this serves both pages + control API).
- For phone/iPad, open `http://YOUR_COMPUTER_IP:8899/controller.html` on the same Wi-Fi.
- Keep the main visual running on `http://YOUR_COMPUTER_IP:8899/index.html` (or localhost on your computer browser).
- Background video for the controller: copy your file to `assets/ipad-background.mov` (see `assets/README.txt`). That path is **gitignored** and will not be uploaded to GitHub.

## Controls

- Controller **Attack More** (left): turn on the next language in order (if any were off)
- Controller **Attack Less** (right): one tap → one `lang_step: -1` on the server queue → main screen turns off **one random** active language (always keeps at least one)
- `C`: toggle calibration overlay
- `TAB`: switch selected zone (`mouth` / `ear`)
- `Arrow keys`: move selected zone
- `[` / `]`: uniform scale (both ellipse axes together)
- `7` / `8`: decrease / increase ellipse **width** only (`SHIFT` for larger steps)
- `9` / `0`: decrease / increase ellipse **height** only (`SHIFT` for larger steps)
- `,` / `.`: rotate selected zone
- `S`: save preset to localStorage (zones, calibration/show mode, debug overlays, red-blue guides, selected zone, speed, active languages)
- `L`: load that preset from localStorage
- `D`: toggle debug trajectories
- `SPACE`: hide/show red-blue mouth/ear reference shapes
- `P`: pause/resume emission
- `-` / `+`: decrease/increase word travel speed (`SHIFT` for larger steps)

## Basic Git Workflow

From project root:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

If your branch is not `main`, replace `main` with your current branch name.