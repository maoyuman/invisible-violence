# invisible-violence

Proof-of-concept for a projection-mapped p5.js exhibition:
- two configurable zones (`mouth` and `ear`)
- words emitted from mouth toward ear
- calibration controls and preset save/load

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

## Controls

- On-screen `Click (+1 language)` button: increase active language count
- On-screen `Long Press (-1 language)` button: decrease active language count while holding
- `C`: toggle calibration overlay
- `TAB`: switch selected zone (`mouth` / `ear`)
- `Arrow keys`: move selected zone
- `[` / `]`: scale selected zone
- `,` / `.`: rotate selected zone
- `S`: save calibration preset (localStorage)
- `L`: load calibration preset (localStorage)
- `D`: toggle debug trajectories
- `SPACE`: pause/resume emission
- `-` / `+`: decrease/increase word travel speed (`SHIFT` for larger steps)

## Basic Git Workflow

From project root:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

If your branch is not `main`, replace `main` with your current branch name.