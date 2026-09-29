// Motion trial (branch: motion-trial). Adds the animation checklist's
// effects across every page, driven by classes that already exist, so no
// page needed per-section edits.
//
// Safety rule: nothing is hidden in plain CSS (see motion.css). This script
// only switches effects on once it confirms the browser supports them and
// the visitor hasn't asked for reduced motion; otherwise every page stays
// exactly as it was before this branch existed.

// Switch any effect off by changing true to false. Nothing else to edit.
const FEATURES = {
  reveal: true,        // sections and cards fade up as you scroll, lists one after another
  heroFade: true,      // banner text fades up once when the page opens
  navbarShadow: true,  // header gets a soft shadow after you scroll
  parallax: true,      // banner photos move slightly slower than the page (desktop only)
  counters: true,      // fleet numbers count up from 0 when they come into view
  accordion: true,     // job details slide open/closed instead of snapping
  tabs: true,          // Land / Marine fleet panels fade in when switched
  formFade: true,      // form success/error messages fade in
};

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  Object.keys(FEATURES).forEach((name) => {
    if (FEATURES[name]) document.documentElement.classList.add(`motion-${name}`);
  });

  // Groups of repeating items: each child gets staggered instead of the
  // whole section fading in as one block.
  const STAGGER_GROUPS = [
    ".service-list", ".sector-list", ".op-cards", ".fleet-panels",
    ".leaders", ".gallery", ".timeline", ".why-list", ".locations",
    ".vacancy-list", "#service-blocks", "#vessel-list",
  ];
  // Everything else that should fade in as a single unit on scroll.
  const SECTION_SELECTOR = ".section, .safety, .cta-band";

  function runReveal() {
    const handled = new Set();
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    function revealChildren(group) {
      [...group.children].forEach((item, i) => {
        if (item.classList.contains("reveal")) return;
        item.classList.add("reveal");
        item.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 90}ms`);
        observer.observe(item);
      });
    }

    STAGGER_GROUPS.forEach((sel) => {
      const group = document.querySelector(sel);
      if (!group) return;
      const section = group.closest(SECTION_SELECTOR);
      if (section) handled.add(section);
      revealChildren(group);
      // content.js replaces these lists with live WordPress entries a moment
      // after load; give the new items the same treatment when they arrive.
      new MutationObserver(() => revealChildren(group)).observe(group, { childList: true });
    });

    // Keyboard users can Tab onto a link or button before it has scrolled
    // into view. Reveal it the moment it (or anything inside it) gets focus,
    // so a focus outline never lands on something still invisible.
    document.addEventListener("focusin", (e) => {
      const hidden = e.target.closest(".reveal:not(.is-visible)");
      if (!hidden) return;
      hidden.classList.add("is-visible");
      observer.unobserve(hidden);
    });

    document.querySelectorAll(SECTION_SELECTOR).forEach((section) => {
      if (handled.has(section) || section.classList.contains("reveal")) return;
      if (section.closest(".hero") || section.classList.contains("hero")) return;
      section.classList.add("reveal");
      observer.observe(section);
    });
  }

  // Hero / page banner: fades up once on load rather than on scroll, since
  // it's already in view when the page opens.
  function runHeroFade() {
    const hero = document.querySelector(".hero__content, .page-hero__content");
    if (!hero) return;
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-loaded")));
  }

  // Navbar gets a soft shadow once the page has scrolled a little.
  function runNavbarShadow() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // Subtle parallax on hero/banner photos — desktop only, kept small.
  function runParallax() {
    if (window.innerWidth < 901) return;
    const targets = [...document.querySelectorAll(".hero__slide img, .page-hero__bg, .safety__bg")];
    if (!targets.length) return;
    let ticking = false;
    function update() {
      ticking = false;
      targets.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        // scale(1.1) gives the photo spare edge on every side, so moving it
        // up to 20px never exposes the background behind it.
        const shift = Math.max(-20, Math.min(20, -rect.top * 0.1));
        el.style.transform = `translateY(${shift}px) scale(1.1)`;
      });
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      },
      { passive: true }
    );
    update();
  }

  // Counts fleet numbers up from 0 the first time they scroll into view.
  // Only animates the leading integer; anything after it (" +4") is
  // appended as-is once the count finishes, so the final text always
  // matches exactly what was in the page.
  function runCounters() {
    const targets = document.querySelectorAll(
      '.fleet-panel__count, .fleet-stat__num, [data-fleet="land-count"], [data-fleet="marine-count"]'
    );
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          animateCount(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  function animateCount(el) {
    const finalText = el.textContent.trim();
    const match = finalText.match(/^(\d+)(.*)$/s);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 900;
    const start = performance.now();
    let written = el.textContent;
    function frame(now) {
      // If something else (content.js loading the live WordPress number)
      // changed the text mid-count, stop and leave its value alone.
      if (el.textContent !== written) return;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      written = p < 1 ? String(Math.round(eased * target)) : finalText; // exact match at the end, e.g. "10 +4"
      el.textContent = written;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Job details slide open/closed. Animates the whole <details> element's
  // real measured height with the Web Animations API, so it works in every
  // current browser (Chrome, Edge, Safari, Firefox). Listens at page level
  // because content.js replaces the job list with WordPress entries after
  // load. Keyboard users get the same behaviour: Enter/Space on a summary
  // fires the same click.
  function runAccordion() {
    const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
    const DURATION = 350;

    document.addEventListener("click", (e) => {
      const summary = e.target.closest(".vacancy > summary");
      if (!summary) return;
      const details = summary.parentElement;
      e.preventDefault();

      const running = details._accordion;
      const startHeight = details.getBoundingClientRect().height;
      if (running) running.cancel();

      const opening = !details.open || details.dataset.closing === "true";
      let endHeight;
      if (opening) {
        details.dataset.closing = "false";
        details.open = true;
        endHeight = details.getBoundingClientRect().height;
      } else {
        details.dataset.closing = "true";
        const borders = details.offsetHeight - details.clientHeight;
        endHeight = summary.getBoundingClientRect().height + borders;
      }

      details.style.overflow = "hidden";
      const anim = details.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: DURATION, easing: EASE }
      );
      details._accordion = anim;
      anim.onfinish = () => {
        if (!opening) details.open = false;
        details.dataset.closing = "false";
        details.style.overflow = "";
        details._accordion = null;
      };
    });
  }

  // Fleet tabs: fade a panel in the moment tabs.js actually reveals it.
  // Watches the "hidden" attribute directly instead of the click, so this
  // stays correct regardless of which listener (tabs.js's or this one)
  // tabs.js's own logic runs in — no dependency on execution order.
  function runTabTransition() {
    const panels = document.querySelectorAll('[data-tabs] [role="tabpanel"]');
    if (!panels.length) return;

    panels.forEach((panel) => {
      // The panel that's already open on page load just appears normally,
      // no entrance animation for the initial state.
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.attributeName !== "hidden" || panel.hidden) return;
          panel.style.transition = "none";
          panel.style.opacity = "0";
          requestAnimationFrame(() => {
            panel.style.transition = "";
            requestAnimationFrame(() => (panel.style.opacity = ""));
          });
        });
      });
      observer.observe(panel, { attributes: true });
    });
  }

  // The banner is part of the page itself, so it fades in straight away
  // rather than waiting for the header/footer to load.
  if (FEATURES.heroFade) runHeroFade();

  document.addEventListener("partials:loaded", () => {
    if (FEATURES.reveal) runReveal();
    if (FEATURES.navbarShadow) runNavbarShadow();
    if (FEATURES.parallax) runParallax();
    if (FEATURES.counters) runCounters();
    if (FEATURES.tabs) runTabTransition();
    // formFade is pure CSS, switched by the class above.
  });

  // Listens at page level, so it doesn't need to wait for the header/footer.
  if (FEATURES.accordion) runAccordion();
})();
