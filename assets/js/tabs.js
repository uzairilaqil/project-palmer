// Accessible tabs (used for the Land / Marine fleet switch).
// Markup: [data-tabs] root containing [role="tab"] buttons with aria-controls,
// and [role="tabpanel"] panels. Arrow keys, Home and End move between tabs.

function initTabs(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];

  function select(tab, moveFocus) {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
    });
    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });

  select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0], false);
}

document.querySelectorAll("[data-tabs]").forEach(initTabs);
