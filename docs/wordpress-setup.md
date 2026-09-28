# WordPress setup guide: Palmer Petroleum website

This guide sets up WordPress as the **content backend** for the Palmer Petroleum website. Visitors never see WordPress itself. The website is a separate set of HTML pages that reads content from WordPress and sends its forms there.

After setup, the client can edit these in wp-admin:

| Content | Where it appears |
|---|---|
| Job vacancies | Careers page |
| Fleet numbers and specs | Our Fleets page, Home page |
| Phone numbers, emails, business hours | Contact page, footer |
| Services | Services page, Home page |
| Selected operations | Home page |
| Leadership team | About Us page |

The hero slides, timeline and sector list rarely change, so they stay in the website code for now.

**Time needed:** about 1–1.5 hours, plus time to enter the content.

**You need:** an Administrator login for wp-admin.

**Field names matter.** Every field name in `code style` below is read by the website code. Type them **exactly** as shown: lowercase, underscores, no spaces. The labels (what editors see) can be anything.

---

## Step 0: Move WordPress to the `cms` subdomain (before anything else)

**Decision:** WordPress moves from `https://palmershipping.com` to a subdomain, and the main domain will serve the new website:

```
palmershipping.com        →  the new website (what visitors see)
cms.palmershipping.com    →  WordPress (editors only)
```

**Do this first.** Everything in the steps below is done on the new `cms` address. If WordPress moved afterwards, all of it would have to be migrated again.

The old WordPress on the main domain has no content worth keeping: only the sample post and images auto-imported from Figma. So install a **fresh** WordPress on the subdomain rather than cloning.

On Hostinger (hPanel):
1. Create the subdomain `cms.palmershipping.com`.
2. **Websites → Add website** (or **Auto Installer**) **→ WordPress**, and choose `cms.palmershipping.com` as the domain. Use an admin username other than `admin` and a strong password. Skip any extra plugins or themes it offers.
3. Turn on SSL for the subdomain (**Security → SSL**) and **Force HTTPS**. Make sure `https://cms.palmershipping.com/wp-admin` loads with a padlock.
4. Tell the developer when it's done, so the website can point to the new address.

**Don't delete or uninstall the old WordPress on `palmershipping.com` yet.** It stays until the new website launches. Hostinger usually stores the subdomain's files *inside* the main site's folder (`public_html/cms`), so removing the old install carelessly could delete the new one too. The developer will handle that step at launch.

From here on, "wp-admin" means `https://cms.palmershipping.com/wp-admin`.

---

## Step 1: Plugins

In **Plugins → Installed Plugins**:

| Plugin | Status | Why |
|---|---|---|
| Advanced Custom Fields (ACF) | ✅ Active | Content types and fields |
| Contact Form 7 | ✅ Active | The two website forms |
| **Flamingo** | ➕ Install and activate | Saves a copy of every form submission in wp-admin, so nothing is lost if an email fails |
| **WP Mail SMTP** (or Hostinger's email settings) | ➕ Recommended | Makes sure form emails are actually delivered, not marked as spam |
| Elementor, UiChemy | ❌ Deactivate and **delete** | Not used by a headless site. Every unused plugin is extra code that can have security holes. Nothing built in Elementor would appear on the website anyway |

> Note: this guide works with the **free** version of ACF. The free version has no "Repeater" fields and no "Options pages", so lists are entered one item per line, and site-wide settings live on a normal page (Step 3).

---

## Step 2: Create the content types

Go to **ACF → Post Types → Add New** and create these four. For each one:
- **Plural Label / Singular Label / Post Type Key**: as in the table
- Turn on **Advanced Configuration**, then:
  - **Supports** tab: tick **Title**, **Featured Image** and **Page Attributes** (Page Attributes adds the "Order" box used for sorting)
  - **REST API** tab: **Show In REST API = on**, and **Base URL** as in the table

| Plural label | Singular label | Post Type Key | REST Base URL |
|---|---|---|---|
| Vacancies | Vacancy | `vacancy` | `vacancies` |
| Services | Service | `service` | `services` |
| Operations | Operation | `operation` | `operations` |
| Leaders | Leader | `leader` | `leaders` |

Save each one. They'll appear in the wp-admin sidebar.

---

## Step 3: Create the "Site Settings" page

This page holds contact details and fleet numbers in one place.

1. **Pages → Add New**
2. Title: **Site Settings**
3. Make sure the URL slug is exactly `site-settings`. Check under **Page → Settings → URL**.
4. Leave the content empty and click **Publish**.

---

## Step 4: Create the fields

Go to **ACF → Field Groups → Add New** for each group below. For **every** group:
- Under **Settings → Location Rules**, set the rule shown.
- Under **Settings → Group Settings**, turn on **Show in REST API**. **This is the most commonly missed step.** Without it the website can't see the fields.

### 4a. Vacancy Details
Location: **Post Type** is equal to **Vacancy**

| Label | Field Name | Field Type | Notes |
|---|---|---|---|
| Department | `department` | Text | e.g. Land Operations |
| Location | `location` | Text | e.g. Miri, Sarawak |
| Employment Type | `employment_type` | Select | Choices, one per line: `Full-Time`, `Part-Time`, `Contract` |
| Responsibilities | `responsibilities` | Textarea | **One item per line** |
| Requirements | `requirements` | Textarea | **One item per line** |
| Closing Date | `closing_date` | Text | e.g. 31 December 2026. Leave empty to show "To be confirmed" |

The job title is the post **Title**.

### 4b. Service Details
Location: **Post Type** is equal to **Service**

| Label | Field Name | Field Type | Notes |
|---|---|---|---|
| Number | `number` | Text | `01` to `05` |
| Short Summary | `summary` | Textarea | One sentence, shown on the Home page |
| Description | `description` | Textarea | Paragraph shown on the Services page |
| Offerings | `offerings` | Textarea | **One item per line** (the bullet list) |

Service name = post **Title**. Photo = **Featured Image**. Order = **Page Attributes → Order** (1–5).

### 4c. Operation Details
Location: **Post Type** is equal to **Operation**

| Label | Field Name | Field Type | Notes |
|---|---|---|---|
| Description | `description` | Textarea | One or two sentences |

Name = post **Title**. Photo = **Featured Image**. Order = **Page Attributes → Order**.

### 4d. Leader Details
Location: **Post Type** is equal to **Leader**

| Label | Field Name | Field Type | Notes |
|---|---|---|---|
| Role | `role` | Text | e.g. Managing Director |
| Experience | `bio` | Textarea | One sentence |

Name = post **Title**. Photo (optional) = **Featured Image**. Without a photo, the site shows the navy circle from the design. Order = **Page Attributes → Order**.

### 4e. Site Settings
Location: **Page** is equal to **Site Settings**

| Label | Field Name | Field Type | Current value (from the design) |
|---|---|---|---|
| General Email | `general_email` | Email | *(client to provide)* |
| General Phone | `general_phone` | Text | *(client to provide)* |
| Business Hours | `business_hours` | Text | *(client to provide)* |
| HQ Phone | `hq_phone` | Text | *(client to provide)* |
| Branch Phone | `branch_phone` | Text | *(client to provide)* |
| Careers Email | `careers_email` | Email | *(client to provide)* |
| Land Fleet: Units | `land_units` | Number | `10` |
| Land Fleet: Incoming Units | `land_incoming` | Number | `4` |
| Land Fleet: Incoming When | `land_incoming_when` | Text | `Q4 2025` |
| Land Fleet: Operational Use | `land_use` | Text | `Industrial, commercial & project delivery` |
| Marine Fleet: Vessels | `marine_vessels` | Number | `14` |
| Marine Fleet: Capacity Range | `marine_capacity` | Text | `≈ 350,000 L to 3 million L` |
| Marine Fleet: Ownership | `marine_ownership` | Text | `Chartered & self-owned` |

> Fields left empty show the design's placeholder text (e.g. "[PHONE — CLIENT TO PROVIDE]") on the website, so nothing breaks while waiting for the client.

---

## Step 5: Create the two forms

Go to **Contact → Add New** for each form. Replace everything in the **Form** tab with the code below, and **don't rename any field**: the website sends these exact names.

### 5a. Website Enquiry

**Form tab:**
```
[text* your-name]
[text company]
[email* your-email]
[tel phone]
[select* enquiry-type "Fuel Supply" "Marine Bunkering" "Land Transportation" "Marine Support" "Careers" "General Enquiry"]
[textarea* your-message]
[submit "Send Enquiry"]
```

**Mail tab:**
| Setting | Value |
|---|---|
| To | the company inbox that should receive enquiries |
| From | `Palmer Petroleum Website <wordpress@palmershipping.com>` (must be an address on your own domain, or emails get rejected) |
| Subject | `Website enquiry – [enquiry-type] – [your-name]` |
| Additional Headers | `Reply-To: [your-name] <[your-email]>` |
| Message Body | see below |

```
Name: [your-name]
Company: [company]
Email: [your-email]
Phone: [phone]
Enquiry type: [enquiry-type]

Message:
[your-message]
```

### 5b. Job Application

**Form tab:**
```
[text* full-name]
[email* email]
[tel* phone]
[text* position]
[text location]
[number experience min:0 max:60]
[textarea message]
[submit "Submit Application"]
```

**Mail tab:**
| Setting | Value |
|---|---|
| To | the HR/careers inbox |
| From | `Palmer Petroleum Website <wordpress@palmershipping.com>` |
| Subject | `Job application – [position] – [full-name]` |
| Additional Headers | `Reply-To: [full-name] <[email]>` |
| Message Body | see below |

```
Name: [full-name]
Email: [email]
Phone: [phone]
Position: [position]
Current location: [location]
Years of experience: [experience]

Message:
[message]
```

Applicants are told to email their CV separately, to the Careers Email from Step 4e.

### 5c. Send the form IDs to the developer

The website needs each form's **number**, which is **not** the code shown in the shortcode.

1. Go to **Contact → Contact Forms** and click a form's title to edit it.
2. Look at the browser's address bar: `.../admin.php?page=wpcf7&post=`**`123`**`&action=edit`
3. The number after `post=` is the ID.

Send both numbers to the developer, labelled **Enquiry = …** and **Application = …**.

---

## Step 6: Enter the content

Use the text currently on the website as the starting point, and keep any `[To be confirmed]` text until the client provides the real details.

- [ ] **Vacancies:** Truck Operator, Marine Crew, Operations Clerk (3 posts)
- [ ] **Services:** 01 to 05, with photos (5 posts). Use new, properly licensed photos where possible. Service 01's current photo has a Shutterstock watermark.
- [ ] **Operations:** Japanese Navy Ship Bunkering, Marine STS Bunkering, Borneo, Shell & PETRONAS Deliveries (3 posts). **Confirm the client has permission to name these customers before publishing.**
- [ ] **Leaders:** Ngu Xiang Kai, Chendra Lingesh, Jeremiah Michael, Lee Kah Jee (4 posts)
- [ ] **Site Settings:** fill in the fleet numbers; contact details when the client provides them

**Photos:** upload at least **1600px wide** for services and operations. Smaller photos look blurry on large screens.

To hide something without deleting it (e.g. a filled vacancy), set it to **Draft**. Only **Published** items appear on the website.

---

## Step 7: Check it works

Open these addresses in a browser. Each should show text starting with `[` or `{`, not an error page:

| Check | Address | Look for |
|---|---|---|
| Vacancies | `https://cms.palmershipping.com/wp-json/wp/v2/vacancies` | `"acf":{"department":...` |
| Services | `https://cms.palmershipping.com/wp-json/wp/v2/services` | `"acf":{"number":...` |
| Site Settings | `https://cms.palmershipping.com/wp-json/wp/v2/pages?slug=site-settings` | `"acf":{"general_email":...` |
| Forms plugin | `https://cms.palmershipping.com/wp-json/` | `contact-form-7/v1` in the list |

**If `"acf"` is missing or shows `[]`**, the field group's **Show in REST API** setting is off (Step 4). **If you get "rest_no_route"**, the post type's **Show In REST API** is off, or the Base URL is different (Step 2).

---

## Step 8: Access for the client

Create a login for the client under **Users → Add New** with the role **Editor**, not Administrator. Editors can update vacancies, services and settings but can't change plugins or break the setup.

---

---

## Step 9: Security checklist

Moving WordPress to the `cms` subdomain keeps it off the public website, but WordPress is still online and needs protecting. Work through this list during setup, then keep the **Ongoing** items going.

### During setup

- [ ] **Remove unused plugins and themes.** Delete Elementor and UiChemy (Step 1). Under **Appearance → Themes**, delete every theme except the active one and one default theme (e.g. Twenty Twenty-Five) as a fallback.
- [ ] **Turn on automatic updates.** **Plugins → Installed Plugins → Enable auto-updates** for each plugin, and under **Dashboard → Updates** make sure WordPress updates itself. Out-of-date plugins are the most common way WordPress sites get hacked.
- [ ] **Secure the accounts:**
  - No account named `admin`. If one exists, create a new Administrator with a different username, log in with it, and delete the old one, giving its content to the new account.
  - Every account uses a long, unique password. A password manager helps.
  - Only people who manage the setup are **Administrators**. The client and content editors are **Editors** (Step 8).
- [ ] **Turn on two-factor login.** Install **Two Factor** (by WordPress.org contributors) or **Wordfence Login Security**, and set it up for every Administrator. Editors should use it too.
- [ ] **Limit login attempts.** Install **Limit Login Attempts Reloaded**, or use Wordfence's brute-force protection. This blocks bots that guess passwords.
- [ ] **Turn off XML-RPC.** It's an old remote-login feature the website doesn't use and bots attack often. In Wordfence Login Security: tick **Disable XML-RPC authentication**. Without Wordfence, install **Disable XML-RPC-API**.
- [ ] **Force HTTPS.** In hPanel, turn on **Force HTTPS** for `cms.palmershipping.com`. Under **Settings → General**, both addresses must start with `https://cms.palmershipping.com`.
- [ ] **Hide WordPress from search engines.** **Settings → Reading → tick "Discourage search engines from indexing this site"**. Only the main website should appear in Google, not the `cms` subdomain.
- [ ] **Turn off the built-in code editor.** This stops anyone who gets into wp-admin from editing plugin or theme code. In hPanel **File Manager**, open `wp-config.php` in the WordPress folder for the `cms` subdomain, and add this line above `/* That's all, stop editing! */`:
  ```php
  define( 'DISALLOW_FILE_EDIT', true );
  ```
  If you're not comfortable editing this file, ask the developer.
- [ ] **Turn on backups.** In hPanel, check that automatic backups are on for the `cms` site, and note where to restore from.

### Ongoing

- [ ] **Weekly:** log in and check **Dashboard → Updates**. Install anything auto-updates missed.
- [ ] **When someone leaves the team:** delete or downgrade their WordPress account the same day.
- [ ] **Every few months:** delete old form submissions in **Flamingo**. Job applications contain personal data (names, phone numbers, emails), which shouldn't be kept longer than needed under Malaysia's Personal Data Protection Act.

### Handled by the developer (no action needed here)

These are done in code once the new website is live:
- Sending any normal visit to `cms.palmershipping.com` to the main website, so only wp-admin and the API are reachable there
- Allowing only the main website to use the API from a browser
- Hiding the public list of WordPress usernames that WordPress shows by default

---

## Summary of what to send the developer

1. Confirmation that WordPress is running at `https://cms.palmershipping.com` (Step 0)
2. The two form IDs: Enquiry and Application (Step 5c)
3. Confirmation that the Step 7 checks all work
4. Confirmation that the Step 9 setup items are done
