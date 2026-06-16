const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const renderCourseContent = () => {
  if (!window.SiteContent) {
    return;
  }

  const { course } = window.SiteContent.load();
  setText("[data-course-hero]", course.heroText);
  setText("[data-course-title]", course.title);
  setText("[data-course-description]", course.description);
  setText("[data-course-date]", course.date);
  setText("[data-course-location]", course.location);
  setText("[data-course-modality]", course.modality);

  document.querySelectorAll("[data-course-cta]").forEach((link) => {
    link.textContent = course.ctaText;
    link.href = course.ctaHref;
  });
};

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}

renderCourseContent();

window.addEventListener("storage", (event) => {
  if (window.SiteContent && event.key === window.SiteContent.STORAGE_KEY) {
    renderCourseContent();
  }
});
