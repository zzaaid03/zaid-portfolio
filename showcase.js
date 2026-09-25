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

function renderProject(index) {
  const project = showcaseProjects[index];
  if (!project) return;
  showcaseIndex = index;

  const lang = showcaseLang();

  wordEl.textContent = project.name;
  setThemeVars(project);

  statusEl.textContent = project.status === 'shipped' ? t('shipped') : t('inDevelopment');
  nameEl.textContent = project.name;
  pitchEl.textContent = project.pitch[lang] || project.pitch.en;
  descEl.textContent = project.description[lang] || project.description.en;

  linkLabEl.textContent = t('tryLab');
  linkLabEl.href = project.links.lab;
  linkGithubEl.textContent = t('sourceGithub');
  linkGithubEl.href = project.links.github;

  artEl.innerHTML = showcaseArt[project.id] || '';

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
  renderProject(index);
  if (settings.focus && swatchButtons[index]) {
    swatchButtons[index].focus();
  }
}

function onSwatchesKeydown(event) {
  const count = showcaseProjects.length;
  if (!count) return;
  let nextIndex = null;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextIndex = (showcaseIndex + 1) % count;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    nextIndex = (showcaseIndex - 1 + count) % count;
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = count - 1;
  }

  if (nextIndex !== null) {
    event.preventDefault();
    selectProject(nextIndex, { focus: true });
  }
}

if (showcaseProjects.length && homeSection) {
  buildSwatches();
  renderProject(0);

  swatchesEl.addEventListener('keydown', onSwatchesKeydown);

  prevBtn.addEventListener('click', () => {
    selectProject((showcaseIndex - 1 + showcaseProjects.length) % showcaseProjects.length, { focus: false });
  });

  nextBtn.addEventListener('click', () => {
    selectProject((showcaseIndex + 1) % showcaseProjects.length, { focus: false });
  });

  const showcaseLangObserver = new MutationObserver(() => {
    renderProject(showcaseIndex);
  });
  showcaseLangObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
}
