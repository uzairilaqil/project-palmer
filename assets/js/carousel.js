// Hero carousel: crossfades slides and advances on a timer.
// Markup hooks: [data-carousel] root, [data-carousel-slide] slides,
// [data-carousel-tab] buttons (same order as slides), [data-carousel-toggle] pause/play.
// Autoplay pauses while hovered or focused, when the tab is hidden, and never
// starts for visitors with "reduce motion" turned on.

const INTERVAL_MS = 6000;

function initCarousel(root) {
  const slides = [...root.querySelectorAll("[data-carousel-slide]")];
  const tabs = [...root.querySelectorAll("[data-carousel-tab]")];
  const toggle = root.querySelector("[data-carousel-toggle]");
  if (slides.length < 2) return;

  let current = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  let stopped = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hovered = false;
  let focused = false;
  let timer = null;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    tabs.forEach((tab, i) => {
      if (i === current) tab.setAttribute("aria-current", "true");
      else tab.removeAttribute("aria-current");
    });
  }

  function schedule() {
    clearInterval(timer);
    timer = null;
    if (!stopped && !hovered && !focused && !document.hidden) {
      timer = setInterval(() => show(current + 1), INTERVAL_MS);
    }
  }

  function updateToggle() {
    if (!toggle) return;
    toggle.textContent = stopped ? "Play slideshow" : "Pause slideshow";
    toggle.setAttribute("aria-pressed", String(stopped));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      show(i);
      schedule();
    });

    // Left/right arrow keys move between tabs.
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      show(next);
    });
  });

  toggle?.addEventListener("click", () => {
    stopped = !stopped;
    updateToggle();
    schedule();
  });

  root.addEventListener("mouseenter", () => { hovered = true; schedule(); });
  root.addEventListener("mouseleave", () => { hovered = false; schedule(); });
  root.addEventListener("focusin", () => { focused = true; schedule(); });
  root.addEventListener("focusout", (e) => {
    if (!root.contains(e.relatedTarget)) {
      focused = false;
      schedule();
    }
  });
  document.addEventListener("visibilitychange", schedule);

  show(current);
  updateToggle();
  schedule();
}

document.querySelectorAll("[data-carousel]").forEach(initCarousel);
