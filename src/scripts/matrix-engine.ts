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

export interface MatrixInstanceOptions {
  /** Element observed for viewport visibility (usually the canvas container). */
  el: HTMLElement;
  /** Called at most once per capped frame while visible. */
  draw: (now: number, dtMs: number) => void;
  /** Frame cap; 24–30 is plenty for rain. */
  fps?: number;
  /** IntersectionObserver threshold. */
  visibleThreshold?: number;
}

interface Entry {
  opts: MatrixInstanceOptions;
  visible: boolean;
  last: number;
  io: IntersectionObserver;
}

const DEFAULT_FPS = 27;
const MAX_DPR = 1.5;

export function clampedDpr(): number {
  return Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

const entries = new Set<Entry>();
let running = false;

function anyActive(): boolean {
  if (document.hidden) return false;
  for (const e of entries) if (e.visible) return true;
  return false;
}

function loop(now: number) {
  if (!running) return;
  for (const e of entries) {
    if (!e.visible) continue;
    if (!e.opts.el.isConnected) {
      removeEntry(e);
      continue;
    }
    const interval = 1000 / (e.opts.fps ?? DEFAULT_FPS);
    if (e.last && now - e.last < interval) continue;
    const dtMs = e.last ? Math.min(now - e.last, 100) : interval;
    e.last = now;
    e.opts.draw(now, dtMs);
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

function removeEntry(e: Entry) {
  e.io.disconnect();
  entries.delete(e);
}

/** Register an instance. Returns an unregister function. */
export function addMatrixInstance(opts: MatrixInstanceOptions): () => void {
  const entry: Entry = {
    opts,
    visible: false,
    last: 0,
    io: new IntersectionObserver(
      (obs) => {
        for (const o of obs) {
          entry.visible = o.isIntersecting;
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
    for (const e of entries) e.last = 0;
    wake();
  }
});
