// Sends forms to Contact Form 7 through the WordPress REST API.
// Markup: <form data-cf7="enquiry"> where "enquiry" is a key in PALMER_CONFIG.forms.
// Field names must match the field names in the Contact Form 7 form.
// Optional: [data-form-status] for messages, [data-form-success] panel shown after sending.

function initForm(form) {
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('[type="submit"]');
  const successPanel = document.getElementById(form.dataset.successPanel || "");

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status form-status--${type}${message ? " is-visible" : ""}`;
  }

  function clearInvalid() {
    form.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute("aria-invalid"));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearInvalid();

    const { wpApiBase, forms } = window.PALMER_CONFIG || {};
    const formId = forms?.[form.dataset.cf7];
    if (!formId) {
      showStatus("Sorry, this form isn't connected yet. Please try again later.", "error");
      console.warn(`No Contact Form 7 ID set for "${form.dataset.cf7}" in assets/js/config.js`);
      return;
    }

    const data = new FormData(form);
    // Contact Form 7's REST endpoint silently ignores posted fields unless these
    // hidden fields are present too (confirmed by testing against the live site).
    data.append("_wpcf7", String(formId));
    data.append("_wpcf7_version", "6.1");
    data.append("_wpcf7_locale", "en_US");
    data.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
    data.append("_wpcf7_container_post", "0");

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = "Sending…";
    showStatus("", "success");

    try {
      const res = await fetch(`${wpApiBase}/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.status === "mail_sent") {
        const position = data.get("position");
        form.reset();
        form.dispatchEvent(new Event("form:reset"));
        if (successPanel) {
          successPanel.hidden = false;
          successPanel.dispatchEvent(new CustomEvent("form:success", { detail: { position } }));
          successPanel.focus();
        } else {
          showStatus(result.message || "Thank you. Your message has been sent.", "success");
        }
      } else if (result.status === "validation_failed") {
        (result.invalid_fields || []).forEach(({ field }) => {
          form.elements[field]?.setAttribute("aria-invalid", "true");
        });
        showStatus(result.message || "Please check the highlighted fields.", "error");
      } else {
        showStatus(result.message || "Sorry, something went wrong. Please try again.", "error");
      }
    } catch (err) {
      console.error(err);
      showStatus("Sorry, we couldn't send your message. Please check your connection and try again.", "error");
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}

// Pill buttons that pick a value in a <select> (enquiry type).
function initChips(group) {
  const select = document.getElementById(group.dataset.chipsFor);
  const chips = [...group.querySelectorAll("[data-value]")];

  const sync = () => chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.value === select.value)));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      select.value = select.value === chip.dataset.value ? "" : chip.dataset.value;
      sync();
    });
  });
  select.addEventListener("change", sync);
  select.form?.addEventListener("form:reset", sync);
  sync();
}

document.querySelectorAll("form[data-cf7]").forEach(initForm);
document.querySelectorAll("[data-chips-for]").forEach(initChips);
