# sanskar — portfolio

Phosphor-amber instrumentation console. Zero JS dependencies — the 3D stack
topology in the hero is a hand-written perspective renderer (~150 lines of
vanilla canvas, `app.js`), not Three.js. Total payload ≈51 KB + two Google
Font families.

## Deploy to GitHub Pages (2 min)

**Option A — user site (recommended):** repo named `Sanskar121543.github.io`,
push these files to `main` root. Live at `https://sanskar121543.github.io`.

**Option B — project site:** any repo → Settings → Pages → Source: `main` /
`/ (root)`. Live at `https://sanskar121543.github.io/<repo>`. All asset paths
are relative, so both work unchanged.

```bash
git init && git add . && git commit -m "init: portfolio"
git branch -M main
git remote add origin git@github.com:Sanskar121543/Sanskar121543.github.io.git
git push -u origin main
```

## TODO before you push (5 items)

1. **Project repo links** — three `repo ↗` anchors in `index.html` are marked
   `data-todo="verify-repo-url"`. I guessed the slugs
   (`/DriftSentinel`, `/AgentMemOS`, `/LineageIQ`); fix to match your actual
   repo names. Grep: `data-todo`.
2. **PR links** — the four OSS rows point at canonical org/repo paths
   (langchain-ai/langchain-neo4j#119, mlflow#23147, apache/airflow#66648,
   fastapi#15496). Click each once to confirm.
3. **MLflow / Airflow / FastAPI badges** say `OPEN` — flip any to `MERGED`
   (class `badge-merged`) when maintainers approve.
4. **Résumé** — `assets/Sanskar_Shimpi_Resume.pdf` is currently variant A
   (ML Systems). Swap the file to rotate variants; the filename is referenced
   in three places.
5. **DriftSentinel writeup link** points at your Medium profile; replace with
   the direct article URL.

## Customize

- All colors are CSS variables at the top of `styles.css` (`--amber`, `--bg0`…).
- Career entries: the `<li class="commit">` blocks in `#career`. Add new wins
  at the top; the rail and reveals pick them up automatically.
- Telemetry numbers: `data-target` attributes in the `.telemetry` section.
- Command palette entries: `COMMANDS` array in `app.js`.

## Shortcuts on the live site

`⌘K` / `Ctrl+K` — command palette · type `sudo hire` or `drift` in it.

## Quality floor

Responsive to 360px · `prefers-reduced-motion` respected (static topology
frame, no reveals, rail pre-filled) · keyboard-focus visible · `<noscript>`
safe (all content is static HTML; counters pre-filled).
