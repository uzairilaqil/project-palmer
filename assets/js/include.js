// Loads shared HTML partials (header, footer) into placeholders like:
//   <div data-include="partials/header.html"></div>
// fetch() doesn't work on file:// URLs, so open the site through a local server
// (e.g. VS Code Live Server), not by double-clicking the HTML file.

async function loadPartials() {
  const slots = document.querySelectorAll("[data-include]");
  await Promise.all(
    [...slots].map(async (slot) => {
      const res = await fetch(slot.dataset.include);
      if (!res.ok) throw new Error(`Could not load ${slot.dataset.include} (${res.status})`);
      slot.outerHTML = await res.text();
    })
  );
}

// <body data-page="about"> marks the matching nav link as the current page.
function markCurrentPage() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

function initMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = header?.querySelector(".site-header__toggle");
  if (!toggle) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close the menu if the window is resized up to the desktop layout.
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

loadPartials()
  .then(() => {
    markCurrentPage();
    initMobileNav();
    document.dispatchEvent(new Event("partials:loaded"));
  })
  .catch((err) => console.error(err));
