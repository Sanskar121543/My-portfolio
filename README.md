<div align="center">
<br/>

```
███████╗ █████╗ ███╗   ██╗███████╗██╗  ██╗ █████╗ ██████╗ 
██╔════╝██╔══██╗████╗  ██║██╔════╝██║ ██╔╝██╔══██╗██╔══██╗
███████╗███████║██╔██╗ ██║███████╗█████╔╝ ███████║██████╔╝
╚════██║██╔══██║██║╚██╗██║╚════██║██╔═██╗ ██╔══██║██╔══██╗
███████║██║  ██║██║ ╚████║███████║██║  ██╗██║  ██║██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
```

### Phosphor-amber instrumentation console · Personal portfolio
*Zero JS dependencies · Hand-written 3D topology renderer · 51 KB total*

<br/>

[![Deploy](https://img.shields.io/badge/GitHub_Pages-live-2ea44f?style=flat-square&logo=github&logoColor=white)](https://sanskar121543.github.io)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-6366F1?style=flat-square)](package.json)
[![Payload](https://img.shields.io/badge/payload-~51_KB-yellow?style=flat-square)](#)
[![Vanilla JS](https://img.shields.io/badge/JS-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Canvas](https://img.shields.io/badge/3D-Hand--written_canvas-FF6B35?style=flat-square)](#)
[![Responsive](https://img.shields.io/badge/responsive-360px+-3776AB?style=flat-square)](#quality-floor)
[![License](https://img.shields.io/badge/License-MIT-6366F1?style=flat-square)](LICENSE)

<br/>

> **Most developer portfolios are React apps that load 2 MB to render a name.**
> This one ships 51 KB and draws its own 3D scene.

<br/>
</div>

---

## Architecture

The site is two files. No framework, no bundler, no runtime dependencies.

```
┌──────────────────────────────────────────────────────┐
│                    index.html                        │
│         Static content · semantic markup             │
│  All text pre-rendered — noscript-safe by default    │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│                    styles.css                        │
│  CSS custom properties · amber palette · responsive  │
│  prefers-reduced-motion  ·  keyboard-focus rules     │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│                     app.js                           │
│                                                      │
│  ┌─────────────────────┐   ┌──────────────────────┐  │
│  │  3D Topology        │   │  Command Palette      │  │
│  │  Renderer           │   │  ⌘K / Ctrl+K         │  │
│  │  ~150 lines canvas  │   │  COMMANDS[ ] array    │  │
│  │  Perspective math   │   │  sudo hire · drift    │  │
│  │  No Three.js        │   │                      │  │
│  └─────────────────────┘   └──────────────────────┘  │
│                                                      │
│  ┌─────────────────────┐   ┌──────────────────────┐  │
│  │  Scroll Reveals     │   │  Telemetry Counters  │  │
│  │  Career rail        │   │  data-target attrs   │  │
│  │  .commit entries    │   │  Animated on load    │  │
│  └─────────────────────┘   └──────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**One principle:** every pixel of content exists in static HTML before JS runs.
The scripts add motion and interactivity — they never own the data.

---

## How the 3D Renderer Works

No WebGL. No Three.js. ~150 lines of vanilla `<canvas>` arithmetic.

```
1. Define nodes     →  stack topology as coordinate objects
2. Project          →  simple perspective divide: x' = x·f/(z+f)
3. Draw edges       →  lineTo() between projected pairs
4. Animate          →  requestAnimationFrame rotation on y-axis
5. Reduce-motion    →  static first frame if prefers-reduced-motion
```

The entire scene is redrawn each frame from the node graph —
no retained-mode scene graph, no dependency on the GPU pipeline.

---

## Features

### Phosphor-Amber Design System
One palette. All colors live as CSS custom properties — swap the entire
theme by editing three variables.

```css
--amber:   #ffb300;   /* primary glow  */
--bg0:     #0a0800;   /* deep black    */
--bg1:     #110f00;   /* surface       */
```

### Command Palette
`⌘K` / `Ctrl+K` surfaces a keyboard-driven command palette.
Pre-loaded entries include `sudo hire` and `drift`. Add new commands
by appending to the `COMMANDS` array in `app.js`.

### Career Rail
Commits rendered as a git-style timeline. Each `<li class="commit">` in
`#career` is auto-picked up by the reveal and rail logic — no JS change
required when you add a new role or achievement.

### Telemetry Counters
Animated numbers in the `.telemetry` section read from `data-target`
attributes in HTML. Update the number, the animation handles itself.

### OSS PR Tracker

| PR | Status | Flip to `badge-merged` when approved |
|----|--------|--------------------------------------|
| `langchain-ai/langchain-neo4j#119` | `MERGED` | ✅ done |
| `mlflow#23147` | `OPEN` | change class on maintainer approval |
| `apache/airflow#66648` | `OPEN` | change class on maintainer approval |
| `fastapi#15496` | `OPEN` | change class on maintainer approval |

---

## Deploy to GitHub Pages

### Option A — User site (recommended)
Name the repo `Sanskar121543.github.io`. Push to `main`. Live at:
`https://sanskar121543.github.io`

### Option B — Project site
Any repo name → **Settings → Pages → Source: `main` / `/ (root)`**. Live at:
`https://sanskar121543.github.io/<repo-name>`

All asset paths are relative — both options work with zero changes.

```bash
git init && git add . && git commit -m "init: portfolio"
git branch -M main
git remote add origin git@github.com:Sanskar121543/Sanskar121543.github.io.git
git push -u origin main
```

---

## Pre-Launch Checklist

Five items to verify before pushing. Grep `data-todo` to locate all anchors.

- [ ] **Project repo links** — three `repo ↗` anchors are marked `data-todo="verify-repo-url"`.
  Guessed slugs: `/DriftSentinel`, `/AgentMemOS`, `/LineageIQ`. Fix to match actual repo names.
- [ ] **PR links** — four OSS rows point at canonical org paths. Click each to confirm they resolve.
- [ ] **Badge states** — MLflow, Airflow, FastAPI badges say `OPEN`. Flip any to `badge-merged`
  (CSS class swap) when maintainers approve.
- [ ] **Résumé file** — `assets/Sanskar_Shimpi_Resume.pdf` is currently variant A (ML Systems).
  Swap the file to rotate variants. Filename referenced in three places in `index.html`.
- [ ] **DriftSentinel writeup** — link currently points at Medium profile root.
  Replace with the direct article URL.

---

## Customization

| What | Where |
|------|-------|
| Color palette | CSS variables at the top of `styles.css` |
| Career entries | `<li class="commit">` blocks in `#career` — add at top |
| Telemetry numbers | `data-target` attributes in `.telemetry` section |
| Command palette | `COMMANDS` array in `app.js` |
| Résumé variant | Replace `assets/Sanskar_Shimpi_Resume.pdf` |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `sudo hire` | Palette shortcut → contact |
| `drift` | Palette shortcut → DriftSentinel project |

---

## Quality Floor

| Constraint | Implementation |
|------------|---------------|
| Responsive | Works at 360 px viewport width |
| Reduced motion | Static topology frame, no reveals, rail pre-filled |
| Keyboard focus | Visible focus ring on all interactive elements |
| No-JS | All content is static HTML; counters pre-filled via `data-target` |
| Payload | ~51 KB + two Google Font families |

---

## Project Structure

```
portfolio/
├── index.html          # All content — static, semantic, noscript-safe
├── styles.css          # Design system + responsive rules + motion prefs
├── app.js              # 3D renderer · command palette · reveals · counters
└── assets/
    └── Sanskar_Shimpi_Resume.pdf   # Swap to rotate resume variant
```

---

<div align="center">

**Most portfolios are frameworks rendering a name.**
*This one draws its own scene.*

<br/>

[![GitHub](https://img.shields.io/badge/Sanskar121543-portfolio-ffb300?style=flat-square&logo=github&logoColor=white)](https://github.com/Sanskar121543)

</div>
