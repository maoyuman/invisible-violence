# invisible-violence

Proof-of-concept for a projection-mapped p5.js exhibition:
- two configurable zones (`mouth` and `ear`)
- words emitted from mouth toward ear
- calibration controls and preset save/load
- **Sculpture holes:** the mouth and ear ellipses cover the video and fog with a solid fill so those pixels stay as dark as possible on the projector (see `SCULPTURE_HOLE_RGB` in `sketch.js`; default pure black). The canvas cannot send “real” transparency to the wall — minimizing light on the sculptures is the practical equivalent. Flying text is not drawn inside those shapes. Align zones with your sculptures (controls below). Red/blue guides are off by default; press `SPACE` while calibrating.

## Run

From project root:

```bash
python3 bridge_server.py
```

Then open [http://localhost:8899/index.html](http://localhost:8899/index.html).

## Phone/iPad Remote Controller

- Main display page: `/index.html`
- Remote controller page: `/controller.html`
- Start the server with `python3 bridge_server.py --port 8899` (this serves both pages + control API).
- For phone/iPad, open `http://YOUR_COMPUTER_IP:8899/controller.html` on the same Wi-Fi.
- Keep the main visual running on `http://YOUR_COMPUTER_IP:8899/index.html` (or localhost on your computer browser).
- Background video for the controller: copy your file to `assets/ipad-background.mov` (see `assets/README.txt`). That path is **gitignored** and will not be uploaded to GitHub.

## Controls

- Controller `Click` (left): increase active language count
- Controller `Long press` (right): decrease active language count while holding
- `C`: toggle calibration overlay
- `TAB`: switch selected zone (`mouth` / `ear`)
- `Arrow keys`: move selected zone
- `[` / `]`: scale selected zone
- `,` / `.`: rotate selected zone
- `S`: save calibration preset (localStorage)
- `L`: load calibration preset (localStorage)
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