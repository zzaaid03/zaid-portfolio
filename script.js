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
