/**
 * Shared animation ticker for all matrix canvases on a page.
 *
 * One single requestAnimationFrame loop drives every registered instance.
 * Instances only get draw calls while their element intersects the viewport
 * (IntersectionObserver) and the tab is visible (visibilitychange). The loop
 * stops itself entirely when nothing is active — zero idle rAF load.
 *
 * FPS is capped per instance (default 27fps — plenty for glyph rain) and
 * canvas backing resolution should use clampedDpr() (max 1.5) to keep
 * fill-rate cheap on HiDPI screens.
 */

const DEFAULT_FPS = 27;
const MAX_DPR = 1.5;

const entries = new Set();
let running = false;

export function clampedDpr() {
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

export function addMatrixInstance(opts) {
  const entry = {
    opts,
    visible: false,
    last: 0,
    io: new IntersectionObserver(
      (obs) => {
        for (const observed of obs) {
          entry.visible = observed.isIntersecting;
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
