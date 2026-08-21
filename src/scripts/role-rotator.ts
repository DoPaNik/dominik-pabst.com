function initRoleRotators() {
  const nodes = document.querySelectorAll<HTMLElement>('.dpn-role-rotator[data-roles]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  nodes.forEach((node) => {
    if (node.dataset.rotatorDone) return;
    node.dataset.rotatorDone = 'true';

    const roles: string[] = JSON.parse(node.dataset.roles || '[]');
    if (roles.length <= 1 || reduceMotion) return;

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    const TYPE_MS = 70;
    const DELETE_MS = 36;
    const PAUSE_MS = 1400;

    function tick() {
      const word = roles[roleIndex % roles.length];

      if (!deleting && charIndex === word.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, PAUSE_MS);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex += 1;
        tick();
        return;
      }

      charIndex += deleting ? -1 : 1;
      node.textContent = word.slice(0, charIndex);
      setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
    }

    setTimeout(tick, PAUSE_MS);
  });
}

initRoleRotators();
document.addEventListener('astro:page-load', initRoleRotators);
