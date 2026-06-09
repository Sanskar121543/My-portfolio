/* ============================================================
   SANSKAR SHIMPI — portfolio behavior
   Zero dependencies. The 3D topology below is a hand-written
   perspective renderer (~150 lines), not a library.
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------------- toast ---------------- */
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2600);
  }

  /* ---------------- NYC clock ---------------- */
  const clockEl = $("#clock");
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  function tick() { clockEl.textContent = fmt.format(new Date()); }
  tick();
  setInterval(tick, 1000);

  /* ---------------- reveal on scroll ---------------- */
  const revealIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    }
  }, { threshold: 0.12 });
  $$(".rv").forEach((el) => revealIO.observe(el));

  /* ---------------- animated counters ---------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.dec || "0", 10);
    const sep = el.dataset.sep === "1";
    const dur = 1300;
    const t0 = performance.now();
    function frame(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let v = (target * eased).toFixed(dec);
      if (sep) v = Number(v).toLocaleString("en-US");
      el.textContent = v;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (!reduceMotion) {
    const countIO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
      }
    }, { threshold: 0.6 });
    $$(".count").forEach((el) => { el.textContent = el.dataset.dec ? "0.00" : "0"; countIO.observe(el); });
  }

  /* ---------------- career rail fill ---------------- */
  const railSection = $("#commit-rail");
  const railFill = $("#rail-fill");
  if (railSection && railFill && !reduceMotion) {
    let railPending = false;
    function updateRail() {
      railPending = false;
      const r = railSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.65 - r.top) / Math.max(r.height - vh * 0.15, 1), 0), 1);
      railFill.style.transform = "scaleY(" + p.toFixed(4) + ")";
    }
    function onScroll() {
      if (!railPending) { railPending = true; requestAnimationFrame(updateRail); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    updateRail();
  }

  /* ============================================================
     3D TOPOLOGY — hand-rolled perspective renderer
     Nodes = the real stack. Edges = co-occurrence in shipped systems.
     ============================================================ */
  const canvas = $("#topology");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const AMBER = "255,180,84";
    const AMBER_HI = "255,216,155";

    // deterministic PRNG so the graph is identical on every visit
    function mulberry32(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(7);

    const LABELS = [
      "kafka", "spark", "redis", "neo4j", "postgres", "pinecone",
      "grpc", "fastapi", "asyncio", "opa", "mlflow", "k8s",
      "terraform", "prometheus", "pytorch", "aws",
    ];
    const N = 44;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));

    // fibonacci-sphere layout + seeded jitter
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(Math.max(1 - y * y, 0));
      const th = i * GOLDEN;
      pts.push({
        x: r * Math.cos(th) + (rand() - 0.5) * 0.14,
        y: y + (rand() - 0.5) * 0.14,
        z: r * Math.sin(th) + (rand() - 0.5) * 0.14,
        label: i < LABELS.length ? LABELS[i] : null,
      });
    }

    // static topology: connect each node to its 3 nearest neighbors
    const edges = [];
    const seen = new Set();
    for (let i = 0; i < N; i++) {
      const d = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
        d.push([dx * dx + dy * dy + dz * dz, j]);
      }
      d.sort((a, b) => a[0] - b[0]);
      for (let k = 0; k < 3; k++) {
        const j = d[k][1];
        const key = i < j ? i + "-" + j : j + "-" + i;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      }
    }

    let W = 0, H = 0, dpr = 1;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // pointer parallax (subtle)
    let tRX = 0, tRY = 0, mRX = 0, mRY = 0;
    window.addEventListener("pointermove", (e) => {
      tRX = (e.clientY / window.innerHeight - 0.5) * 0.5;
      tRY = (e.clientX / window.innerWidth - 0.5) * 0.6;
    }, { passive: true });

    const proj = new Array(N);
    let autoRY = 0.4;
    let lastT = performance.now();

    function render(now) {
      const dt = Math.min(now - lastT, 50);
      lastT = now;
      autoRY += dt * 0.00028;
      mRX += (tRX - mRX) * 0.05;
      mRY += (tRY - mRY) * 0.05;

      const ry = autoRY + mRY;
      const rx = -0.18 + mRX;
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cx = Math.cos(rx), sx = Math.sin(rx);

      const cxp = W * 0.5, cyp = H * 0.5;
      const R = Math.min(W, H) * 0.36;
      const D = 3.0;

      ctx.clearRect(0, 0, W, H);

      // rotate + project
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        let x = p.x * cy + p.z * sy;
        let z = -p.x * sy + p.z * cy;
        let y = p.y * cx - z * sx;
        z = p.y * sx + z * cx;
        const s = D / (D + z);
        proj[i] = {
          sx: cxp + x * s * R,
          sy: cyp + y * s * R,
          z: z,
          s: s,
          a: 1 - ((z + 1) / 2) * 0.72, // depth fade
        };
      }

      // edges (far-faded)
      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e++) {
        const a = proj[edges[e][0]], b = proj[edges[e][1]];
        const al = Math.min(a.a, b.a) * 0.42;
        ctx.strokeStyle = "rgba(" + AMBER + "," + al.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // nodes back-to-front
      const order = [];
      for (let i = 0; i < N; i++) order.push(i);
      order.sort((i, j) => proj[j].z - proj[i].z);

      ctx.font = "10px 'IBM Plex Mono', monospace";
      for (let k = 0; k < N; k++) {
        const i = order[k];
        const q = proj[i];
        const labeled = !!pts[i].label;
        const r = (labeled ? 2.6 : 1.6) * q.s;

        ctx.shadowColor = "rgba(" + AMBER + "," + (q.a * 0.9).toFixed(3) + ")";
        ctx.shadowBlur = labeled ? 9 : 5;
        ctx.fillStyle = "rgba(" + (labeled ? AMBER_HI : AMBER) + "," + q.a.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(q.sx, q.sy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (labeled && q.z < 0.25) {
          ctx.fillStyle = "rgba(" + (q.z < -0.35 ? AMBER_HI : AMBER) + "," + (q.a * 0.85).toFixed(3) + ")";
          ctx.fillText(pts[i].label, q.sx + r + 5, q.sy + 3);
        }
      }
    }

    if (reduceMotion) {
      render(performance.now()); // single static frame
    } else {
      let running = true;
      let rafId = null;
      function loop(t) { render(t); rafId = requestAnimationFrame(loop); }

      function setRunning(on) {
        if (on && !rafId) { lastT = performance.now(); rafId = requestAnimationFrame(loop); }
        if (!on && rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }
      const heroIO = new IntersectionObserver((entries) => {
        running = entries[0].isIntersecting;
        setRunning(running && !document.hidden);
      }, { threshold: 0.02 });
      heroIO.observe(canvas);
      document.addEventListener("visibilitychange", () => setRunning(running && !document.hidden));
      setRunning(true);
    }
  }

  /* ============================================================
     COMMAND PALETTE
     ============================================================ */
  const palette = $("#palette");
  const backdrop = $("#palette-backdrop");
  const input = $("#palette-input");
  const list = $("#palette-list");
  const openBtn = $("#palette-btn");

  function copyEmail() {
    const email = "sanskar.shimpi@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        () => toast("email copied — " + email),
        () => toast(email)
      );
    } else {
      toast(email);
    }
  }

  const COMMANDS = [
    { label: "go: services",     hint: "SVC/01", run: () => jump("#services") },
    { label: "go: career log",   hint: "LOG/02", run: () => jump("#career") },
    { label: "go: open source",  hint: "OSS/03", run: () => jump("#oss") },
    { label: "go: experience",   hint: "EXP/04", run: () => jump("#experience") },
    { label: "go: stack",        hint: "CFG/05", run: () => jump("#stack") },
    { label: "go: contact",      hint: "PING",   run: () => jump("#contact") },
    { label: "copy email",       hint: "↵",      run: copyEmail },
    { label: "open résumé",      hint: "pdf ↗",  run: () => window.open("assets/Sanskar_Shimpi_Resume.pdf", "_blank") },
    { label: "open github",      hint: "↗",      run: () => window.open("https://github.com/Sanskar121543", "_blank") },
    { label: "open linkedin",    hint: "↗",      run: () => window.open("https://linkedin.com/in/sanskar0153", "_blank") },
    { label: "open medium",      hint: "↗",      run: () => window.open("https://medium.com/@sanskar.shimpi", "_blank") },
  ];

  const EGGS = {
    "sudo hire": () => toast("ACCESS GRANTED — check sanskar.shimpi@gmail.com"),
    "drift": () => toast("no drift detected · consensus 5/5 ✓"),
  };

  let filtered = COMMANDS.slice();
  let activeIdx = 0;
  let lastFocus = null;

  function jump(sel) {
    closePalette();
    const el = $(sel);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function renderList() {
    list.innerHTML = "";
    filtered.forEach((cmd, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.innerHTML = "<span>" + cmd.label + "</span><span class='hint'>" + cmd.hint + "</span>";
      if (i === activeIdx) li.classList.add("active");
      li.addEventListener("click", () => { closePalette(); cmd.run(); });
      li.addEventListener("mousemove", () => {
        activeIdx = i;
        $$("#palette-list li").forEach((n, k) => n.classList.toggle("active", k === i));
      });
      list.appendChild(li);
    });
  }

  function filterList() {
    const q = input.value.trim().toLowerCase();
    if (EGGS[q]) { EGGS[q](); input.value = ""; filtered = COMMANDS.slice(); activeIdx = 0; renderList(); return; }
    filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
    activeIdx = 0;
    renderList();
  }

  function openPalette() {
    lastFocus = document.activeElement;
    palette.hidden = false;
    backdrop.hidden = false;
    input.value = "";
    filtered = COMMANDS.slice();
    activeIdx = 0;
    renderList();
    input.focus();
  }
  function closePalette() {
    palette.hidden = true;
    backdrop.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openBtn.addEventListener("click", openPalette);
  backdrop.addEventListener("click", closePalette);
  input.addEventListener("input", filterList);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (palette.hidden) return;
    if (e.key === "Escape") { closePalette(); }
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, filtered.length - 1);
      renderList();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      renderList();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIdx];
      if (cmd) { closePalette(); cmd.run(); }
    }
  });

  /* ---------------- copy email button ---------------- */
  const copyBtn = $("#copy-email");
  if (copyBtn) copyBtn.addEventListener("click", copyEmail);
})();
