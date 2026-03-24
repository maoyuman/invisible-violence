# invisible-violence

Proof-of-concept for a projection-mapped p5.js exhibition:
- two configurable zones (`mouth` and `ear`)
- words emitted from mouth toward ear
- calibration controls and preset save/load

## Run

From project root:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Controls

- `C`: toggle calibration overlay
- `TAB`: switch selected zone (`mouth` / `ear`)
- `Arrow keys`: move selected zone
- `[` / `]`: scale selected zone
- `,` / `.`: rotate selected zone
- `S`: save calibration preset (localStorage)
- `L`: load calibration preset (localStorage)
- `D`: toggle debug trajectories
- `SPACE`: pause/resume emission

## Basic Git Workflow

From project root:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

If your branch is not `main`, replace `main` with your current branch name.