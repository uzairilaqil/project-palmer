// Small helper for reading content from the WordPress REST API.
// Every loader in content.js goes through this, so there's one place that
// handles WordPress being slow, offline, or a section having no field data.
const WP = {
  base() {
    return (window.PALMER_CONFIG && window.PALMER_CONFIG.wpApiBase) || "";
  },

  // Fetches one wp/v2 endpoint. Returns null (never throws) if WordPress can't
  // be reached in time, so callers can just leave the page's built-in content
  // alone instead of showing an error.
  async get(path) {
    if (!this.base()) return null;
    try {
      const res = await fetch(`${this.base()}/wp/v2/${path}`, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`WordPress content unavailable (${path}); keeping the page's built-in content.`, err);
      return null;
    }
  },

  // WordPress sends titles as escaped HTML (e.g. "Ship Chandelling &amp; Marine
  // Support"). This turns that back into plain text for use in our own markup.
  decode(html) {
    const el = document.createElement("textarea");
    el.innerHTML = html || "";
    return el.value;
  },

  // The featured image URL from a post fetched with `_embed`, or null if none is set.
  image(post) {
    const media = post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0];
    return media && media.source_url ? media.source_url : null;
  },

  // ACF "Text Area" fields store multi-line lists as one item per line
  // (see docs/wordpress-setup.md). This splits that back into an array.
  lines(text) {
    return (text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  },

  // Escapes text before it's inserted as HTML, so content typed in WordPress
  // (which may contain <, >, & etc.) can't break the page's markup.
  escape(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },
};

window.WP = WP;
