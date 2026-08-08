const FLAG_DE = `<svg viewBox="0 0 5 3" width="22" height="14" aria-hidden="true" focusable="false">
<rect width="5" height="3" fill="#000000"/>
<rect y="1" width="5" height="1" fill="#DD0000"/>
<rect y="2" width="5" height="1" fill="#FFCE00"/></svg>`;

const FLAG_GB = `<svg viewBox="0 0 60 30" width="22" height="11" aria-hidden="true" focusable="false">
<clipPath id="ujclip"><rect width="60" height="30"/></clipPath>
<rect width="60" height="30" fill="#012169"/>
<path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" stroke-width="6" clip-path="url(#ujclip)"/>
<path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#ujclip)"/>
<path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" stroke-width="10"/>
<path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/></svg>`;

const langToggle = document.querySelector(".lang-toggle");

function updateToggleButton(lang) {
  if (!langToggle) return;
  if (lang === "en") {
    langToggle.innerHTML = FLAG_DE;
    langToggle.setAttribute("aria-label", "Auf Deutsch umschalten");
  } else {
    langToggle.innerHTML = FLAG_GB;
    langToggle.setAttribute("aria-label", "Switch to English");
  }
}

function setLang(lang) {
  document.querySelectorAll("[data-de]").forEach((el) => {
    if (el.dataset.enText === undefined) {
      el.dataset.enText = el.textContent;
    }
    el.textContent = lang === "de" ? el.dataset.de : el.dataset.enText;
  });

  document.querySelectorAll("[data-de-html]").forEach((el) => {
    if (el.dataset.enHtml === undefined) {
      el.dataset.enHtml = el.innerHTML;
    }
    el.innerHTML = lang === "de" ? el.dataset.deHtml : el.dataset.enHtml;
  });

  document.querySelectorAll("[data-de-attr-aria-label]").forEach((el) => {
    if (el.dataset.enAttrAriaLabel === undefined) {
      el.dataset.enAttrAriaLabel = el.getAttribute("aria-label") || "";
    }
    el.setAttribute(
      "aria-label",
      lang === "de" ? el.dataset.deAttrAriaLabel : el.dataset.enAttrAriaLabel
    );
  });

  document.querySelectorAll("[data-de-attr-alt]").forEach((el) => {
    if (el.dataset.enAttrAlt === undefined) {
      el.dataset.enAttrAlt = el.getAttribute("alt") || "";
    }
    el.setAttribute(
      "alt",
      lang === "de" ? el.dataset.deAttrAlt : el.dataset.enAttrAlt
    );
  });

  document.documentElement.lang = lang;
  updateToggleButton(lang);
  storeLang(lang);
}

// Storage is unavailable in private modes and when site data is blocked, and it
// throws rather than returning null. The language toggle is not worth taking the
// rest of the page down for, so both sides fail quietly.
function readLang() {
  try {
    return localStorage.getItem("lang");
  } catch (err) {
    return null;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch (err) {
    /* language just won't persist */
  }
}

const savedLang = readLang();
const browserLang = (navigator.language || "en").toLowerCase();
const initialLang =
  savedLang === "de" || savedLang === "en"
    ? savedLang
    : browserLang.startsWith("de")
    ? "de"
    : "en";

try {
  setLang(initialLang);
} catch (err) {
  // Never let a translation error stop the reveal observer below from running,
  // since every section sits at opacity 0 until it fires.
  console.error("Language init failed", err);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const nextLang = document.documentElement.lang === "de" ? "en" : "de";
    setLang(nextLang);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
