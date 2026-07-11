const DEFAULT_FPS = 27;
const MAX_DPR = 1.5;

const entries = new Set();
let running = false;

function clampedDpr() {
  return Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

function anyActive() {
  if (document.hidden) return false;
  for (const entry of entries) if (entry.visible) return true;
  return false;
}

function removeEntry(entry) {
  entry.io.disconnect();
  entries.delete(entry);
}

function loop(now) {
  if (!running) return;
  for (const entry of entries) {
    if (!entry.visible) continue;
    if (!entry.opts.el.isConnected) {
      removeEntry(entry);
      continue;
    }
    const interval = 1000 / (entry.opts.fps ?? DEFAULT_FPS);
    if (entry.last && now - entry.last < interval) continue;
    const dtMs = entry.last ? Math.min(now - entry.last, 100) : interval;
    entry.last = now;
    entry.opts.draw(now, dtMs);
  }
  if (!anyActive()) {
    running = false;
    return;
  }
  requestAnimationFrame(loop);
}

function wake() {
  if (running || !anyActive()) return;
  running = true;
  requestAnimationFrame(loop);
}

function addMatrixInstance(opts) {
  const entry = {
    opts,
    visible: false,
    last: 0,
    io: new IntersectionObserver(
      (observations) => {
        for (const observation of observations) {
          entry.visible = observation.isIntersecting;
          if (entry.visible) {
            entry.last = 0;
            wake();
          }
        }
      },
      { threshold: opts.visibleThreshold ?? 0.02 },
    ),
  };
  entry.io.observe(opts.el);
  entries.add(entry);
  return () => removeEntry(entry);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    for (const entry of entries) entry.last = 0;
    wake();
  }
});

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01<>/{}$#*+=';
const CELL = 12;
const DECODE_MS = 1800;
const REENCODE_MS = 900;

function cssVar(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function monoFont() {
  return cssVar('--font-mono', "'JetBrains Mono', monospace");
}

function themeColors() {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  return light
    ? {
        bg: cssVar('--paper', '#F4F7FA'),
        glyph: cssVar('--green-700', '#1B8B4C'),
        lead: cssVar('--ink-700', '#1E2530'),
        density: 0.7,
      }
    : {
        bg: cssVar('--ink-900', '#0E121A'),
        glyph: cssVar('--green-500', '#37D67A'),
        lead: cssVar('--green-300', '#8CEFB9'),
        density: 1,
      };
}

function setupPortrait(root) {
  if (root.dataset.portraitDone) return;
  root.dataset.portraitDone = 'true';

  const img = root.querySelector('img');
  const canvas = root.querySelector('[data-matrix-portrait-canvas]');
  if (!img || !canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = clampedDpr();
  let cols = 0;
  let rows = 0;
  let cssW = 0;
  let cssH = 0;
  let lum = null;
  let colProgress = [];
  let mode = 'idle';
  let modeStart = 0;
  let decodedOnce = false;
  let unregister = null;

  function sampleImage() {
    const rect = root.querySelector('.dpn-portrait__frame').getBoundingClientRect();
    cssW = rect.width;
    cssH = rect.height;
    canvas.width = Math.max(1, Math.round(cssW * dpr));
    canvas.height = Math.max(1, Math.round(cssH * dpr));
    cols = Math.ceil(cssW / CELL);
    rows = Math.ceil(cssH / CELL);

    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!octx) return;
    const s = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    octx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
    const data = octx.getImageData(0, 0, cols, rows).data;
    lum = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    colProgress = Array.from({ length: cols }, () => -Math.random() * 0.35);
  }

  function drawGlyphColumn(x, cover, colors, now, leadRow) {
    for (let y = 0; y < rows; y++) {
      const l = lum[y * cols + x];
      if (l * colors.density < 0.12) continue;
      ctx.globalAlpha = cover * (0.35 + l * 0.65);
      ctx.fillStyle = y === leadRow ? colors.lead : colors.glyph;
      ctx.fillText(
        GLYPHS[(x * 7 + y * 13 + ((now / 90) | 0)) % GLYPHS.length],
        x * CELL,
        y * CELL,
      );
    }
  }

  function drawStatic() {
    if (!lum) return;
    const colors = themeColors();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.font = `${CELL}px ${monoFont()}`;
    ctx.textBaseline = 'top';
    const now = performance.now();
    for (let x = 0; x < cols; x++) drawGlyphColumn(x, 1, colors, now, -1);
    ctx.globalAlpha = 1;
  }

  function finish() {
    mode = 'done';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    if (unregister) {
      unregister();
      unregister = null;
    }
  }

  function drawFrame(now) {
    if (!lum || mode === 'idle' || mode === 'cover' || mode === 'done') return;
    const duration = mode === 'decode' ? DECODE_MS : REENCODE_MS;
    const t = Math.min(1, (now - modeStart) / duration);
    const colors = themeColors();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.font = `${CELL}px ${monoFont()}`;
    ctx.textBaseline = 'top';

    for (let x = 0; x < cols; x++) {
      const progress = colProgress[x];
      const local = Math.max(0, Math.min(1, (t - progress) / 0.28));
      const cover = mode === 'decode' ? 1 - local : local;
      if (cover <= 0) continue;
      drawGlyphColumn(x, cover, colors, now, mode === 'decode' ? x % rows : -1);
    }
    ctx.globalAlpha = 1;

    if (t >= 1) {
      if (mode === 'decode') {
        drawStatic();
        finish();
      } else if (mode === 'encode') {
        drawStatic();
        mode = 'idle';
      }
    }
  }

  function start(modeName) {
    mode = modeName;
    modeStart = performance.now();
  }

  function activateOnce() {
    if (decodedOnce || !lum) return;
    decodedOnce = true;
    start('decode');
    unregister = addMatrixInstance({ el: root, draw: drawFrame, fps: 30, visibleThreshold: 0.01 });
  }

  function requestEncodePulse() {
    if (!decodedOnce || mode === 'encode' || mode === 'decode' || !lum) return;
    start('encode');
    if (!unregister) unregister = addMatrixInstance({ el: root, draw: drawFrame, fps: 30, visibleThreshold: 0.01 });
  }

  function onPointerEnter() {
    requestEncodePulse();
  }

  function onPointerLeave() {
    if (mode === 'encode') {
      mode = 'idle';
      drawStatic();
    }
  }

  function onFocusIn() {
    requestEncodePulse();
  }

  function onFocusOut() {
    if (mode === 'encode') {
      mode = 'idle';
      drawStatic();
    }
  }

  function bootstrap() {
    sampleImage();
    drawStatic();
    mode = 'cover';
    start('decode');
    unregister = addMatrixInstance({ el: root, draw: drawFrame, fps: 30, visibleThreshold: 0.01 });
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activateOnce();
          io.disconnect();
        }
      }
    },
    { threshold: 0.2 },
  );

  io.observe(root);
  img.addEventListener('load', bootstrap, { once: true });
  if (img.complete) bootstrap();

  root.addEventListener('pointerenter', onPointerEnter);
  root.addEventListener('pointerleave', onPointerLeave);
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
}

function initPortraits() {
  document.querySelectorAll('[data-matrix-portrait]').forEach((root) => setupPortrait(root));
}

initPortraits();
document.addEventListener('astro:page-load', initPortraits);
