import { addMatrixInstance, clampedDpr } from './matrix-engine';

const GLYPHS = '01ﾊﾏｲﾑｳｵﾗｷｹﾜｺｴﾈｾﾀﾈﾇﾓﾔﾝﾛﾍｦｱｸ'.split('');
const FONT_FAMILY = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
const ROW_HEIGHT = 18;
const COL_SPACING = 42;

function randomChar() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function themeColors() {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  return light
    ? {
        // "Ink instead of phosphor": no neon green on paper.
        head: cssVar('--green-700', '#1b8b4c'),
        trail: cssVar('--green-600', '#27b765'),
      }
    : {
        head: cssVar('--green-400', '#5fe39b'),
        trail: cssVar('--green-500', '#37d67a'),
      };
}

interface Column {
  x: number;
  headY: number;
  speed: number;
  trailSteps: number;
  chars: string[];
}

function makeColumn(x: number, height: number, seedAcrossView = false): Column {
  const trailSteps = 8 + Math.floor(Math.random() * 10);
  const headY = seedAcrossView
    ? Math.random() * (height + trailSteps * ROW_HEIGHT) - trailSteps * ROW_HEIGHT
    : -Math.random() * 300;
  return {
    x,
    headY,
    speed: 26 + Math.random() * 42,
    trailSteps,
    chars: Array.from({ length: trailSteps }, randomChar),
  };
}

function setupBackdrop(root: HTMLElement) {
  if (root.dataset.backdropDone) return;
  root.dataset.backdropDone = 'true';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = root.querySelector<HTMLCanvasElement>('[data-matrix-backdrop-canvas]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = clampedDpr();
  let width = 0;
  let height = 0;
  let columns: Column[] = [];

  function resize() {
    const rect = root.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas!.width = Math.max(1, Math.round(width * dpr));
    canvas!.height = Math.max(1, Math.round(height * dpr));
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colCount = Math.max(4, Math.round(width / COL_SPACING));
    columns = Array.from({ length: colCount }, (_, i) =>
      makeColumn(i * COL_SPACING + COL_SPACING / 2 + (Math.random() - 0.5) * 14, height, true),
    );
  }

  function draw(_now: number, dtMs: number) {
    if (width === 0 || height === 0) {
      resize();
      if (width === 0 || height === 0) return;
    }

    ctx!.clearRect(0, 0, width, height);
    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'middle';
    ctx!.font = `${(ROW_HEIGHT * 0.8).toFixed(1)}px ${FONT_FAMILY}`;
    const colors = themeColors();

    for (const col of columns) {
      for (let i = 0; i < col.trailSteps; i++) {
        const y = col.headY - i * ROW_HEIGHT;
        if (y < -ROW_HEIGHT || y > height + ROW_HEIGHT) continue;
        const t = 1 - i / col.trailSteps;
        ctx!.globalAlpha = i === 0 ? 0.9 : t * t * 0.7;
        ctx!.fillStyle = i === 0 ? colors.head : colors.trail;
        if (Math.random() < 0.02) col.chars[i] = randomChar();
        ctx!.fillText(col.chars[i], col.x, y);
      }

      col.headY += (col.speed * dtMs) / 1000;
      if (col.headY - col.trailSteps * ROW_HEIGHT > height) {
        const fresh = makeColumn(col.x, height);
        col.headY = fresh.headY;
        col.speed = fresh.speed;
        col.trailSteps = fresh.trailSteps;
        col.chars = fresh.chars;
      }
    }
    ctx!.globalAlpha = 1;
  }

  resize();
  addMatrixInstance({ el: root, draw });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    if (!root.isConnected) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });
}

function initBackdrops() {
  document
    .querySelectorAll<HTMLElement>('[data-matrix-backdrop]')
    .forEach((root) => setupBackdrop(root));
}

initBackdrops();
document.addEventListener('astro:page-load', initBackdrops);
