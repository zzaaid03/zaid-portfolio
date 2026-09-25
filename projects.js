/** @typedef {{ en: string, de: string }} LocalText */
/** @typedef {{ bg: string, surface: string, ink: string, muted: string, accent: string, onAccent: string }} Palette */
/**
 * @typedef {Object} FeaturedProject
 * @property {'life-os'|'laz-store'|'brewit'} id
 * @property {string} name
 * @property {'shipped'|'in-development'} status
 * @property {LocalText} pitch        one line, max ~12 words
 * @property {LocalText} description  1-2 short sentences
 * @property {string[]} stack
 * @property {{ light: Palette, dark: Palette }} theme
 * @property {{ github: string, lab: string }} links
 */

/** @type {FeaturedProject[]} */
window.FEATURED_PROJECTS = [
  {
    id: 'life-os',
    name: 'Life OS',
    status: 'shipped',
    pitch: {
      en: 'Flutter life manager that turns a messy inbox into tracked tasks.',
      de: 'Flutter-Life-Manager, der einen unübersichtlichen Posteingang in nachverfolgte Aufgaben verwandelt.',
    },
    description: {
      en: 'It reads your inbox to track job applications, tasks and subscriptions, and writes a daily brief with no model in it. Documents get found by describing them, not by their file name.',
      de: 'Er verfolgt Bewerbungen, Aufgaben und Abos direkt aus deinem Posteingang und schreibt ein Tages-Briefing, das komplett ohne KI-Modell auskommt. Dokumente findest du über eine Beschreibung statt über den Dateinamen.',
    },
    stack: ['Flutter', 'Supabase', 'GPT-OSS', 'Gmail API'],
    theme: {
      light: { bg: '#f2f0fb', surface: '#faf9fe', ink: '#221a4d', muted: '#4b3f85', accent: '#5b3fd6', onAccent: '#ffffff' },
      dark: { bg: '#160f30', surface: '#1e1747', ink: '#e9e5fb', muted: '#c2b8f0', accent: '#8a72f0', onAccent: '#160f30' },
    },
    links: {
      github: 'https://github.com/zzaaid03/life-os',
      lab: 'https://lab.zaidj.tech/specimen/life-os/',
    },
  },
  {
    id: 'laz-store',
    name: 'LAZ Store',
    status: 'shipped',
    pitch: {
      en: 'Car parts shop I ran in Jordan, rebuilt as an Android app.',
      de: 'Autoteile-Shop, den ich in Jordanien geführt habe, jetzt als Android-App.',
    },
    description: {
      en: 'Bilingual Android storefront with role-based interfaces for customers, employees and admins. A customer photographs a part they cannot name and gets AI matches scoped to the parts I actually stocked.',
      de: 'Zweisprachige Android-App mit rollenbasierten Oberflächen für Kunden, Mitarbeiter und Admins. Ein Kunde fotografiert ein Teil, das er nicht benennen kann, und bekommt KI-Treffer aus dem Sortiment, das ich wirklich geführt habe.',
    },
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'AI'],
    theme: {
      light: { bg: '#fbeeee', surface: '#fff8f8', ink: '#4a1414', muted: '#7d2a2a', accent: '#c62828', onAccent: '#ffffff' },
      dark: { bg: '#2c0f0f', surface: '#3a1414', ink: '#fbe4e4', muted: '#f0b6b6', accent: '#e05a5a', onAccent: '#2c0f0f' },
    },
    links: {
      github: 'https://github.com/zzaaid03/laz-store',
      lab: 'https://lab.zaidj.tech/specimen/laz-store/',
    },
  },
  {
    id: 'brewit',
    name: 'Brewit',
    status: 'in-development',
    pitch: {
      en: 'Describe the coffee you want, and it works backwards to a recipe.',
      de: 'Beschreib den Kaffee, den du willst, und es rechnet rückwärts zum Rezept.',
    },
    description: {
      en: 'You pick the method, roast, process and the taste you want, and it builds the full recipe with a timed pour schedule. Still in the lab: the export does not round trip yet and nothing is saved between sessions.',
      de: 'Du wählst Methode, Röstung, Aufbereitung und den Geschmack, den du willst, und es erstellt das komplette Rezept mit Zeitplan für jeden Aufguss. Noch in der Entwicklung: der Export klappt noch nicht in beide Richtungen, und zwischen Sitzungen wird nichts gespeichert.',
    },
    stack: ['React', 'TypeScript'],
    theme: {
      light: { bg: '#f7eee0', surface: '#fdf9f2', ink: '#4a2f10', muted: '#7a5322', accent: '#9c5f1a', onAccent: '#ffffff' },
      dark: { bg: '#2a1a08', surface: '#38240d', ink: '#f5e6cf', muted: '#e0be8c', accent: '#e0902f', onAccent: '#2a1a08' },
    },
    links: {
      github: 'https://github.com/zzaaid03/Brewit',
      lab: 'https://lab.zaidj.tech/specimen/brewit/',
    },
  },
];
