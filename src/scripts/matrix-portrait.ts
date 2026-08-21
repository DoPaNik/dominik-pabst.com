import { addMatrixInstance, clampedDpr } from './matrix-engine';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01<>/{}$#*+=';
const CELL = 12;
const DECODE_MS = 1800;
const REENCODE_MS = 900;

function cssVar(name: string, fallback: string) {
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

type Mode = 'idle' | 'cover' | 'decode' | 'encode' | 'done';

function setupPortrait(root: HTMLElement) {
  if (root.dataset.portraitDone) return;
  root.dataset.portraitDone = 'true';

  const img = root.querySelector('img');
  const canvas = root.querySelector<HTMLCanvasElement>('[data-matrix-portrait-canvas]');
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
  let lum: Float32Array | null = null;
  let colProgress: number[] = [];
  let mode: Mode = 'idle';
  let modeStart = 0;
  let decodedOnce = false;
  let unregister: (() => void) | null = null;

  function sampleImage() {
    const frame = root.querySelector('.dpn-portrait__frame');
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    cssW = rect.width;
    cssH = rect.height;
    canvas!.width = Math.max(1, Math.round(cssW * dpr));
    canvas!.height = Math.max(1, Math.round(cssH * dpr));
    cols = Math.ceil(cssW / CELL);
    rows = Math.ceil(cssH / CELL);

    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!octx) return;
    const s = Math.max(cols / img!.naturalWidth, rows / img!.naturalHeight);
    const dw = img!.naturalWidth * s;
    const dh = img!.naturalHeight * s;
    octx.drawImage(img!, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
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

  function drawGlyphColumn(
    x: number,
    cover: number,
    colors: ReturnType<typeof themeColors>,
    now: number,
    leadRow: number,
  ) {
    for (let y = 0; y < rows; y++) {
      const l = lum![y * cols + x];
      if (l * colors.density < 0.12) continue;
      ctx!.globalAlpha = cover * (0.35 + l * 0.65);
      ctx!.fillStyle = y === leadRow ? colors.lead : colors.glyph;
      ctx!.fillText(
        GLYPHS[(x * 7 + y * 13 + ((now / 90) | 0)) % GLYPHS.length],
        x * CELL,
        y * CELL,
      );
    }
  }

  function drawStatic() {
    if (!lum) return;
    const colors = themeColors();
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.fillStyle = colors.bg;
    ctx!.fillRect(0, 0, cssW, cssH);
    ctx!.font = `${CELL}px ${monoFont()}`;
    ctx!.textBaseline = 'top';
    const now = performance.now();
    for (let x = 0; x < cols; x++) drawGlyphColumn(x, 1, colors, now, -1);
    ctx!.globalAlpha = 1;
  }

  function finish() {
    mode = 'done';
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, cssW, cssH);
    if (unregister) {
      unregister();
      unregister = null;
    }
  }

  function drawFrame(now: number) {
    if (!lum || mode === 'idle' || mode === 'cover' || mode === 'done') return;
    const duration = mode === 'decode' ? DECODE_MS : REENCODE_MS;
    const t = Math.min(1, (now - modeStart) / duration);
    const colors = themeColors();

    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, cssW, cssH);
    ctx!.font = `${CELL}px ${monoFont()}`;
    ctx!.textBaseline = 'top';

    for (let x = 0; x < cols; x++) {
      const progress = colProgress[x];
      const local = Math.max(0, Math.min(1, (t - progress) / 0.28));
      const cover = mode === 'decode' ? 1 - local : local;
      if (cover <= 0) continue;
      drawGlyphColumn(x, cover, colors, now, mode === 'decode' ? x % rows : -1);
    }
    ctx!.globalAlpha = 1;

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

  function start(modeName: Mode) {
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
    if (!unregister) {
      unregister = addMatrixInstance({
        el: root,
        draw: drawFrame,
        fps: 30,
        visibleThreshold: 0.01,
      });
    }
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
    (observations) => {
      for (const observation of observations) {
        if (observation.isIntersecting) {
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
  document
    .querySelectorAll<HTMLElement>('[data-matrix-portrait]')
    .forEach((root) => setupPortrait(root));
}

initPortraits();
document.addEventListener('astro:page-load', initPortraits);
