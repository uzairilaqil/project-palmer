// Pulls live content from WordPress into the pages built from the Figma design.
//
// Every function below only runs if it finds the matching section on the current
// page (e.g. loadVacancies() does nothing unless a ".vacancy-list" element
// exists), so this one file is safe to include on every page.
//
// Fallback behaviour, by design:
//   - WordPress unreachable (WP.get returns null)  -> leave the page's built-in
//     example content exactly as it is.
//   - WordPress reachable but nothing published yet -> show an empty-state
//     message instead of stale example content.

document.addEventListener("partials:loaded", () => {
  loadSiteSettings();
  loadVacancies();
  loadServices();
  loadOperations();
  loadLeaders();
});

// ---------- Site Settings (contact details + fleet numbers) ----------
// Used by: footer (every page), Contact page, Fleet page, Home page.

async function loadSiteSettings() {
  const pages = await WP.get("pages?slug=site-settings&_fields=acf");
  const acf = pages && pages[0] && pages[0].acf;
  if (!acf) return; // Unreachable, or the Site Settings page/fields aren't set up yet.

  // Plain 1:1 fields: anything with data-field="general_email" etc. gets that
  // ACF field's value, but only if it's actually filled in — an empty field
  // leaves the design's "[... CLIENT TO PROVIDE]" placeholder text showing.
  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = acf[el.dataset.field];
    if (value) el.textContent = value;
  });
  if (acf.careers_email) window.PALMER_CAREERS_EMAIL = acf.careers_email;

  // Fleet numbers are composed from a couple of fields each, so they get their
  // own small template rather than a plain 1:1 swap.
  const setFleet = (name, value) => {
    if (!value) return;
    document.querySelectorAll(`[data-fleet="${name}"]`).forEach((el) => (el.textContent = value));
  };

  if (acf.land_units) {
    setFleet("land-count", acf.land_incoming ? `${acf.land_units} +${acf.land_incoming}` : `${acf.land_units}`);
    setFleet("land-fleet-size", `${acf.land_units} units (various sizes)`);
  }
  if (acf.land_incoming && acf.land_incoming_when) {
    setFleet("land-caption", `Land fuel transporters (${acf.land_incoming} more expected ${acf.land_incoming_when})`);
    setFleet("land-incoming", `${acf.land_incoming} additional units, ${acf.land_incoming_when}`);
  }
  setFleet("land-use", acf.land_use);

  if (acf.marine_vessels) {
    setFleet("marine-count", `${acf.marine_vessels}`);
    setFleet("marine-fleet-size", `${acf.marine_vessels} vessels`);
  }
  if (acf.marine_ownership) {
    setFleet("marine-caption", `Oil tanker vessels (${acf.marine_ownership})`);
  }
  setFleet("marine-capacity", acf.marine_capacity);
  setFleet("marine-ownership", acf.marine_ownership);
}

// ---------- Careers: vacancies ----------

async function loadVacancies() {
  const list = document.querySelector(".vacancy-list");
  if (!list) return;

  const posts = await WP.get("vacancies?orderby=menu_order&order=asc&per_page=50");
  if (posts === null) return; // WordPress unreachable: keep the example vacancies.

  if (posts.length === 0) {
    list.innerHTML = `<p style="padding-block:26px;color:var(--text-slate)">No open positions right now. Please check back soon.</p>`;
    return;
  }
  list.innerHTML = posts.map(vacancyHtml).join("");
}

function bulletList(text) {
  const items = WP.lines(text);
  return (items.length ? items : ["[To be confirmed]"]).map((li) => `<li>${WP.escape(li)}</li>`).join("");
}

function vacancyHtml(post) {
  const a = post.acf || {};
  const title = WP.decode(post.title.rendered);
  const meta = [a.department, a.location, a.employment_type].filter(Boolean).join("&nbsp;&nbsp;·&nbsp;&nbsp;");
  return `
    <details class="vacancy">
      <summary class="vacancy__summary">
        <span class="vacancy__heading">
          <span class="vacancy__title">${WP.escape(title)}</span>
          <span class="vacancy__meta">${meta}</span>
        </span>
        <span class="vacancy__toggle">
          <span class="vacancy__toggle-open">View Details&nbsp;&nbsp;→</span>
          <span class="vacancy__toggle-close">Hide Details&nbsp;&nbsp;↑</span>
        </span>
      </summary>
      <div class="vacancy__detail">
        <div class="vacancy__cols">
          <div class="vacancy__col">
            <h3 class="vacancy__col-title">Responsibilities</h3>
            <ul class="vacancy__bullets">${bulletList(a.responsibilities)}</ul>
          </div>
          <div class="vacancy__col">
            <h3 class="vacancy__col-title">Requirements</h3>
            <ul class="vacancy__bullets">${bulletList(a.requirements)}</ul>
          </div>
        </div>
        <p class="vacancy__footer">Location: ${WP.escape(a.location || "—")}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;Closing date: ${WP.escape(a.closing_date || "[To be confirmed]")}</p>
      </div>
    </details>`;
}

// ---------- Services ----------
// Used by: Home page (short rows) and Services page (full blocks).
// Services page sections sit inside a <div id="service-blocks"> wrapper so
// they can all be swapped out at once when real content exists.

async function loadServices() {
  const posts = await WP.get("services?orderby=menu_order&order=asc&per_page=50&_embed");
  if (posts === null) return;

  const rows = document.querySelector(".service-list");
  if (rows) rows.innerHTML = posts.length ? posts.map(serviceRowHtml).join("") : "";

  const blocks = document.getElementById("service-blocks");
  if (blocks) {
    blocks.innerHTML = posts.length
      ? posts.map(serviceBlockHtml).join("")
      : `<p class="section" style="padding-block:60px;color:var(--text-slate)">Services will be listed here soon.</p>`;
  }
}

function serviceNumber(post, idx) {
  return (post.acf && post.acf.number) || String(idx + 1).padStart(2, "0");
}

function serviceRowHtml(post, idx) {
  const a = post.acf || {};
  const num = serviceNumber(post, idx);
  const title = WP.decode(post.title.rendered);
  return `
    <li>
      <a class="service-row" href="services.html#service-${num}">
        <span class="service-row__num">${num}</span>
        <h3 class="service-row__title">${WP.escape(title)}</h3>
        <p class="service-row__text">${WP.escape(a.summary || "")}</p>
        <span class="service-row__arrow" aria-hidden="true">→</span>
      </a>
    </li>`;
}

function serviceBlockHtml(post, idx) {
  const a = post.acf || {};
  const num = serviceNumber(post, idx);
  const title = WP.escape(WP.decode(post.title.rendered));
  const img = WP.image(post);
  const media = img
    ? `<img src="${img}" alt="" loading="lazy">`
    : `<div class="service-block__media--empty" aria-hidden="true"></div>`;
  const offerings = WP.lines(a.offerings);
  const list = offerings.length
    ? `<ul class="bullet-list">${offerings.map((li) => `<li>${WP.escape(li)}</li>`).join("")}</ul>`
    : "";
  const body = `
    <div class="service-block__body">
      <p class="service-block__num">${num}</p>
      <h2 class="service-block__title" id="service-${num}-title">${title}</h2>
      <p class="service-block__text">${WP.escape(a.description || a.summary || "")}</p>
      ${list}
    </div>`;
  const mediaBlock = `<div class="service-block__media">${media}</div>`;
  // Alternates layout and background the same way the design's 5 static blocks did.
  const imageLeft = idx % 2 === 1;
  const offwhite = idx % 2 === 1;
  return `
    <section class="section service-block${offwhite ? " section--offwhite" : ""}" id="service-${num}" aria-labelledby="service-${num}-title">
      ${imageLeft ? mediaBlock + body : body + mediaBlock}
    </section>`;
}

// ---------- Home: Selected Operations ----------

async function loadOperations() {
  const container = document.querySelector(".op-cards");
  if (!container) return;

  const posts = await WP.get("operations?orderby=menu_order&order=asc&per_page=50&_embed");
  if (posts === null) return;

  const section = document.querySelector(".operations");
  if (posts.length === 0) {
    if (section) section.hidden = true;
    return;
  }
  if (section) section.hidden = false;
  container.innerHTML = posts.map(operationHtml).join("");
}

function operationHtml(post) {
  const a = post.acf || {};
  const title = WP.decode(post.title.rendered);
  const img = WP.image(post);
  const media = img
    ? `<img src="${img}" alt="" loading="lazy">`
    : `<div class="op-card__media--empty" aria-hidden="true"></div>`;
  return `
    <article class="op-card">
      <div class="op-card__media">${media}</div>
      <div class="op-card__body">
        <h3 class="op-card__title">${WP.escape(title)}</h3>
        <p class="op-card__text">${WP.escape(a.description || "")}</p>
      </div>
    </article>`;
}

// ---------- About: Leadership ----------

async function loadLeaders() {
  const list = document.querySelector(".leaders");
  if (!list) return;

  const posts = await WP.get("leaders?orderby=menu_order&order=asc&per_page=50&_embed");
  if (posts === null || posts.length === 0) return; // Keep the example leadership team.
  list.innerHTML = posts.map(leaderHtml).join("");
}

function leaderHtml(post) {
  const a = post.acf || {};
  const title = WP.decode(post.title.rendered);
  const img = WP.image(post) || "assets/img/avatar-placeholder.svg";
  return `
    <li class="leader">
      <img class="leader__avatar" src="${img}" alt="" width="52" height="52">
      <h3 class="leader__name">${WP.escape(title)}</h3>
      <p class="leader__role">${WP.escape(a.role || "")}</p>
      <p class="leader__bio">${WP.escape(a.bio || "")}</p>
    </li>`;
}
