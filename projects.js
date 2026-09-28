/** @typedef {{ en: string, de: string }} LocalText */
/** @typedef {{ bg: string, surface: string, ink: string, muted: string, accent: string, onAccent: string }} Palette */
/**
 * @typedef {Object} FeaturedProject
 * @property {'life-os'|'laz-store'|'brewit'} id
 * @property {string} name
 * @property {'shipped'|'in-development'} status
 * @property {LocalText} pitch        one line, max ~12 words
 * @property {LocalText} description  1-2 short sentences
 * @property {LocalText} hard         one line, the hard part
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
    hard: {
      en: 'The hard part was the email itself: picking the right model, then chasing edge cases until any message that comes in, however messy, becomes the right task without the model making one up.',
      de: 'Das Schwierigste war die E-Mail selbst: das richtige Modell finden und dann Randfälle jagen, bis jede eingehende Nachricht, egal wie chaotisch, zur richtigen Aufgabe wird, ohne dass das Modell etwas erfindet.',
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
      en: 'Bilingual Android storefront with separate interfaces for customers, employees and admins. A customer photographs a part they cannot name, the AI identifies it, and if I did not stock it, the request lands on my admin screen as a potential order for me to price and source.',
      de: 'Zweisprachiger Android-Shop mit eigenen Oberflächen für Kunden, Mitarbeiter und Admins. Wer ein Teil nicht benennen kann, fotografiert es, die KI erkennt es, und wenn ich es nicht auf Lager hatte, landet die Anfrage als mögliche Bestellung in meinem Admin-Bereich, damit ich sie kalkulieren und besorgen kann.',
    },
    hard: {
      en: "The hard part was keeping it secure and stable: in a load test it handled 170 users at once on Firebase's free plan.",
      de: 'Das Schwierigste war, die App sicher und stabil zu halten: Im Lasttest lief sie mit 170 gleichzeitigen Nutzern auf dem kostenlosen Firebase-Tarif.',
    },
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'AI'],
    theme: {
      light: { bg: '#fbeeee', surface: '#fff8f8', ink: '#4a1414', muted: '#7d2a2a', accent: '#c62828', onAccent: '#ffffff' },
      dark: { bg: '#2c0f0f', surface: '#3a1414', ink: '#fbe4e4', muted: '#f0b6b6', accent: '#e36b6b', onAccent: '#2c0f0f' },
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
    hard: {
      en: 'The hard part is turning a taste into numbers. "Less bitter" has to become a grind, a water temperature and a ratio I can actually defend.',
      de: 'Das Schwierigste ist, einen Geschmack in Zahlen zu übersetzen. Aus „weniger bitter“ müssen Mahlgrad, Wassertemperatur und Verhältnis werden, die ich wirklich begründen kann.',
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
