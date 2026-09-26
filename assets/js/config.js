// Site-wide settings for talking to the WordPress backend.
// If WordPress moves again, change wpApiBase only.
window.PALMER_CONFIG = {
  wpApiBase: "https://cms.palmershipping.com/wp-json",

  // Contact Form 7 form IDs (numbers). Open the form in wp-admin → Contact → Contact Forms
  // and copy the number after "post=" in the address bar. Not the code in the shortcode.
  // See docs/wordpress-setup.md.
  forms: {
    enquiry: 48,
    application: 49,
  },
};
