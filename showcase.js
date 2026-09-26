/* Renders the project showcase inside section#home from window.FEATURED_PROJECTS
   and window.SHOWCASE_ART. No build step, classic script, runs before script.js. */

const SHOWCASE_STRINGS = {
  en: {
    tryLab: 'Try it in the lab',
    sourceGithub: 'Source on GitHub',
    shipped: 'Shipped',
    inDevelopment: 'In development',
    builtWith: 'Built with',
    chooseProject: 'Choose a project',
    prevProject: 'Previous project',
    nextProject: 'Next project',
  },
  de: {
    tryLab: 'Im Lab ausprobieren',
    sourceGithub: 'Code auf GitHub',
    shipped: 'Ausgeliefert',
    inDevelopment: 'In Entwicklung',
    builtWith: 'Gebaut mit',
    chooseProject: 'Projekt auswählen',
    prevProject: 'Vorheriges Projekt',
    nextProject: 'Nächstes Projekt',
  },
};

const showcaseProjects = window.FEATURED_PROJECTS || [];
const showcaseArt = window.SHOWCASE_ART || {};

const homeSection = document.getElementById('home');
const projectAreaEl = document.getElementById('projects');
const wordEl = document.getElementById('sc-word');
const statusEl = document.getElementById('sc-status');
const nameEl = document.getElementById('sc-name');
const pitchEl = document.getElementById('sc-pitch');
const descEl = document.getElementById('sc-desc');
const linkLabEl = document.getElementById('sc-link-lab');
const linkGithubEl = document.getElementById('sc-link-github');
const artEl = document.getElementById('sc-art');
const chipsLabelEl = document.getElementById('sc-chips-label');
const chipsEl = document.getElementById('sc-chips');
const swatchesEl = document.getElementById('sc-swatches');
const prevBtn = document.getElementById('sc-prev');
const nextBtn = document.getElementById('sc-next');

let showcaseIndex = 0;
let swatchButtons = [];
let artFloatEl = null;
let artTiltEl = null;

const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
const swapState = new WeakMap();
const liveEl = new WeakMap();

function motionAllowed() {
  return motionQuery.matches;
}

function showcaseLang() {
  return document.documentElement.lang === 'de' ? 'de' : 'en';
}

function t(key) {
  const strings = SHOWCASE_STRINGS[showcaseLang()] || SHOWCASE_STRINGS.en;
  return strings[key] || SHOWCASE_STRINGS.en[key];
}

function setThemeVars(project) {
  const light = project.theme.light;
  const dark = project.theme.dark;
  homeSection.style.setProperty('--scl-bg', light.bg);
  homeSection.style.setProperty('--scl-surface', light.surface);
  homeSection.style.setProperty('--scl-ink', light.ink);
  homeSection.style.setProperty('--scl-muted', light.muted);
  homeSection.style.setProperty('--scl-accent', light.accent);
  homeSection.style.setProperty('--scl-on-accent', light.onAccent);
  homeSection.style.setProperty('--scd-bg', dark.bg);
  homeSection.style.setProperty('--scd-surface', dark.surface);
  homeSection.style.setProperty('--scd-ink', dark.ink);
  homeSection.style.setProperty('--scd-muted', dark.muted);
  homeSection.style.setProperty('--scd-accent', dark.accent);
  homeSection.style.setProperty('--scd-on-accent', dark.onAccent);
}

/* ---------- word and device swap, with cancel-safe in-flight motion ---------- */

function clearSwap(container) {
  if (!container) return;
  const state = swapState.get(container);
  if (!state) return;
  if (state.outAnim) state.outAnim.cancel();
  if (state.inAnim) state.inAnim.cancel();
  if (state.outgoingEl && state.outgoingEl.parentNode === container) {
    container.removeChild(state.outgoingEl);
  }
  swapState.set(container, null);
}

function swapContent(container, oldEl, newEl, direction, kind) {
  clearSwap(container);

  if (!newEl) {
    if (oldEl && oldEl.parentNode === container) container.removeChild(oldEl);
    return;
  }
  if (!oldEl || !direction || !motionAllowed()) {
    if (oldEl && oldEl.parentNode === container) container.removeChild(oldEl);
    return;
  }

  oldEl.classList.add('sc-outgoing');
  oldEl.setAttribute('aria-hidden', 'true');
  oldEl.inert = true;
  oldEl.style.position = 'absolute';
  if (kind === 'word') {
    oldEl.style.inset = '0';
    oldEl.style.display = 'flex';
    oldEl.style.alignItems = 'center';
    oldEl.style.justifyContent = 'center';
  } else {
    oldEl.style.top = '0';
    oldEl.style.left = '0';
    oldEl.style.width = '100%';
  }

  const sign = direction === 'prev' ? -1 : 1;
  const dist = kind === 'word' ? 10 : 28;
  const duration = kind === 'word' ? 380 : 350;
  let outKeyframes;
  let inKeyframes;

  if (kind === 'word') {
    outKeyframes = [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-10px)' },
    ];
    inKeyframes = [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ];
  } else {
    outKeyframes = [
      { opacity: 1, transform: 'translateX(0)' },
      { opacity: 0, transform: `translateX(${-sign * dist}px)` },
    ];
    inKeyframes = [
      { opacity: 0, transform: `translateX(${sign * dist}px)` },
      { opacity: 1, transform: 'translateX(0)' },
    ];
  }

  const outAnim = oldEl.animate(outKeyframes, { duration, easing: 'ease' });
  const inAnim = newEl.animate(inKeyframes, { duration, easing: 'ease' });
  const state = { outAnim, inAnim, outgoingEl: oldEl };
  swapState.set(container, state);

  outAnim.finished
    .then(() => {
      if (swapState.get(container) === state) {
        if (oldEl.parentNode === container) container.removeChild(oldEl);
        swapState.set(container, null);
      }
    })
    .catch(() => {});
}

function setWordText(newText, direction) {
  const oldInner = liveEl.get(wordEl) || null;
  const newInner = document.createElement('span');
  newInner.className = 'sc-word-inner';
  newInner.textContent = newText;
  wordEl.appendChild(newInner);
  liveEl.set(wordEl, newInner);
  swapContent(wordEl, oldInner, newInner, direction, 'word');
}

function setDeviceArt(html, direction) {
  if (!artTiltEl) return;
  const oldDevice = liveEl.get(artTiltEl) || null;
  const temp = document.createElement('div');
  temp.innerHTML = html || '';
  const newDevice = temp.firstElementChild;
  if (newDevice) {
    artTiltEl.appendChild(newDevice);
    liveEl.set(artTiltEl, newDevice);
  }
  swapContent(artTiltEl, oldDevice, newDevice, direction, 'device');
}

/* ---------- idle float + pointer tilt (different elements, so the two transforms don't collide) ---------- */

function setupArtStage() {
  artFloatEl = document.createElement('div');
  artFloatEl.className = 'showcase-art-float';
  artTiltEl = document.createElement('div');
  artTiltEl.className = 'showcase-art-tilt';
  artFloatEl.appendChild(artTiltEl);
  artEl.appendChild(artFloatEl);
}

function tiltEnabled() {
  return (
    motionAllowed() &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    window.innerWidth >= 900
  );
}

let tiltRafId = null;
let latestPointer = null;

function resetTilt() {
  if (!artTiltEl) return;
  artTiltEl.classList.add('sc-tilt-settle');
  artTiltEl.style.transform = '';
}

function runTiltFrame() {
  tiltRafId = null;
  if (!latestPointer || !artTiltEl || !projectAreaEl) return;
  const rect = projectAreaEl.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const relX = (latestPointer.x - rect.left) / rect.width - 0.5;
  const relY = (latestPointer.y - rect.top) / rect.height - 0.5;
  const maxDeg = 6;
  const rotY = Math.max(-1, Math.min(1, relX * 2)) * maxDeg;
  const rotX = Math.max(-1, Math.min(1, -relY * 2)) * maxDeg;
  artTiltEl.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
}

function onPointerMove(event) {
  if (!tiltEnabled()) {
    resetTilt();
    return;
  }
  if (artTiltEl) artTiltEl.classList.remove('sc-tilt-settle');
  latestPointer = { x: event.clientX, y: event.clientY };
  if (tiltRafId) return;
  tiltRafId = requestAnimationFrame(runTiltFrame);
}

function onPointerLeave() {
  resetTilt();
}

/* ---------- touch swipe on the device/art area (input, works even with reduced motion) ---------- */

let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;

function onTouchStart(event) {
  if (event.touches.length !== 1) return;
  if (event.target.closest('a, button')) {
    touchTracking = false;
    return;
  }
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  touchTracking = true;
}

function onTouchEnd(event) {
  if (!touchTracking) return;
  touchTracking = false;
  if (!event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) <= 50 || Math.abs(dx) <= Math.abs(dy)) return;
  const count = showcaseProjects.length;
  if (!count) return;
  if (dx < 0) {
    selectProject((showcaseIndex + 1) % count, { focus: false, direction: 'next' });
  } else {
    selectProject((showcaseIndex - 1 + count) % count, { focus: false, direction: 'prev' });
  }
}

/* ---------- swatches, static strings, project render ---------- */

function buildSwatches() {
  swatchesEl.innerHTML = '';
  swatchButtons = showcaseProjects.map((project, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'showcase-swatch';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-label', project.name);
    btn.style.setProperty('--swl', project.theme.light.accent);
    btn.style.setProperty('--swd', project.theme.dark.accent);
    btn.addEventListener('click', () => selectProject(i, { focus: false }));
    swatchesEl.appendChild(btn);
    return btn;
  });
}

function updateSwatchStates() {
  swatchButtons.forEach((btn, i) => {
    const selected = i === showcaseIndex;
    btn.setAttribute('aria-checked', String(selected));
    btn.tabIndex = selected ? 0 : -1;
    btn.classList.toggle('is-selected', selected);
  });
}

function renderStaticStrings() {
  chipsLabelEl.textContent = t('builtWith');
  swatchesEl.setAttribute('aria-label', t('chooseProject'));
  prevBtn.setAttribute('aria-label', t('prevProject'));
  nextBtn.setAttribute('aria-label', t('nextProject'));
}

function renderProject(index, direction) {
  const project = showcaseProjects[index];
  if (!project) return;
  showcaseIndex = index;

  const lang = showcaseLang();

  setWordText(project.name, direction);
  setThemeVars(project);

  statusEl.textContent = project.status === 'shipped' ? t('shipped') : t('inDevelopment');
  nameEl.textContent = project.name;
  pitchEl.textContent = project.pitch[lang] || project.pitch.en;
  descEl.textContent = project.description[lang] || project.description.en;

  linkLabEl.textContent = t('tryLab');
  linkLabEl.href = project.links.lab;
  linkGithubEl.textContent = t('sourceGithub');
  linkGithubEl.href = project.links.github;

  setDeviceArt(showcaseArt[project.id] || '', direction);

  chipsEl.innerHTML = '';
  project.stack.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    chipsEl.appendChild(li);
  });

  renderStaticStrings();
  updateSwatchStates();
}

function selectProject(index, opts) {
  const settings = opts || {};
  if (index === showcaseIndex) {
    if (settings.focus && swatchButtons[index]) {
      swatchButtons[index].focus();
    }
    return;
  }
  const direction = settings.direction || (index > showcaseIndex ? 'next' : 'prev');
  renderProject(index, direction);
  if (settings.focus && swatchButtons[index]) {
    swatchButtons[index].focus();
  }
}

function onSwatchesKeydown(event) {
  const count = showcaseProjects.length;
  if (!count) return;
  let nextIndex = null;
  let direction = null;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextIndex = (showcaseIndex + 1) % count;
    direction = 'next';
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    nextIndex = (showcaseIndex - 1 + count) % count;
    direction = 'prev';
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = count - 1;
  }

  if (nextIndex !== null) {
    event.preventDefault();
    selectProject(nextIndex, { focus: true, direction });
  }
}

if (showcaseProjects.length && homeSection) {
  setupArtStage();
  buildSwatches();
  renderProject(0);

  swatchesEl.addEventListener('keydown', onSwatchesKeydown);

  prevBtn.addEventListener('click', () => {
    selectProject((showcaseIndex - 1 + showcaseProjects.length) % showcaseProjects.length, {
      focus: false,
      direction: 'prev',
    });
  });

  nextBtn.addEventListener('click', () => {
    selectProject((showcaseIndex + 1) % showcaseProjects.length, { focus: false, direction: 'next' });
  });

  const showcaseLangObserver = new MutationObserver(() => {
    renderProject(showcaseIndex);
  });
  showcaseLangObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  window.addEventListener('load', () => {
    if (artFloatEl) artFloatEl.classList.add('sc-loaded');
  });

  if (projectAreaEl) {
    projectAreaEl.addEventListener('pointermove', onPointerMove);
    projectAreaEl.addEventListener('pointerleave', onPointerLeave);
  }
  window.addEventListener('resize', () => {
    if (!tiltEnabled()) resetTilt();
  });

  artEl.addEventListener('touchstart', onTouchStart, { passive: true });
  artEl.addEventListener('touchend', onTouchEnd, { passive: true });

  motionQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      resetTilt();
      clearSwap(wordEl);
      clearSwap(artTiltEl);
    }
  });
}
