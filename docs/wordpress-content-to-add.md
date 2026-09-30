# WordPress content to add: Palmer Petroleum website

The website shows exactly what is **published** in WordPress. Right now only one entry of each type exists, so the Home, Services and About pages look emptier than the Figma design. Adding the entries below makes them match the design.

**Where:** `https://cms.palmershipping.com/wp-admin`

**For every entry:**
1. Type the name in the big **Title** box at the top.
2. Fill the fields in the **details box below the editor** (not the main content area — text typed there is ignored by the website).
3. Set **Order** in the right-hand panel (Page Attributes).
4. Click **Set featured image** in the right-hand panel and upload the photo listed.
5. Click **Publish** (not Save draft).

**Photos** are already on your computer, in:
`C:\Users\User\OneDrive\Documents\palmer-shipping\assets\img\`

Keep any `[To be confirmed]` text as it is until the client provides the real details.

---

## 1. Services (Services → Add New Service)

### Fix the existing one first
Open **Petroleum Product Supply & Wholesale** and set its featured image to `service-01.jpg`. Then click **Update**.

### Add these four

#### 02 — Marine Fuel Bunkering & Delivery
| Field | Value |
|---|---|
| Title | Marine Fuel Bunkering & Delivery |
| Number | `02` |
| Short Summary | Marine fuel delivery and bunkering support for vessels and marine operations. |
| Description | Marine fuel delivery and bunkering support for vessels operating across Sarawak and the wider Borneo region. |
| Order | 2 |
| Featured image | `service-02.jpg` |

Offerings (one per line):
```
Marine fuel delivery
Bunkering support
Ship-to-ship operations
Coastal & regional logistics
```

#### 03 — Land Fuel Transportation & Distribution
| Field | Value |
|---|---|
| Title | Land Fuel Transportation & Distribution |
| Number | `03` |
| Short Summary | Fuel delivery using dedicated land fuel transporters for industrial, commercial and project requirements. |
| Description | Dedicated land fuel transportation supporting industrial sites, construction operations, heavy machinery and commercial requirements. |
| Order | 3 |
| Featured image | `service-03.jpg` |

Offerings (one per line):
```
Construction & quarry
Mining / developer sites
Industrial operations
Agriculture & energy infra
```

#### 04 — Ship Chandelling & Marine Support
| Field | Value |
|---|---|
| Title | Ship Chandelling & Marine Support |
| Number | `04` |
| Short Summary | Marine support services based on the capabilities stated in the company profile. |
| Description | Marine support services based on the capabilities stated in the company profile. [Specific chandelling categories to be confirmed with client.] |
| Order | 4 |
| Featured image | `service-04.jpg` |

Offerings (one per line):
```
Marine support services
Vessel supply support
[To be confirmed]
```

#### 05 — Gaseous Fuel Supply
| Field | Value |
|---|---|
| Title | Gaseous Fuel Supply |
| Number | `05` |
| Short Summary | Gaseous fuel supply capabilities, subject to client confirmation of coverage to be publicly described. |
| Description | Gaseous fuel supply capabilities aligned with Malaysia's clean energy transition. [Product types, coverage and compliance to be confirmed with client.] |
| Order | 5 |
| Featured image | `service-05.jpg` |

Offerings (one per line):
```
Gaseous fuel supply
Modular bunkering systems
[Coverage to be confirmed]
```

---

## 2. Operations (Operations → Add New Operation)

Shown on the Home page under "Selected Operations".

| Order | Title | Description | Featured image |
|---|---|---|---|
| 1 | *(existing)* Japanese Navy Ship Bunkering | *(already filled in)* | `op-japanese-navy.jpg` ← **add this, it's missing** |
| 2 | Marine STS Bunkering, Borneo | Ad-hoc fuel sales via marine ship-to-ship (STS) bunkering across Borneo waters, including Sabah, Brunei and Sarawak. | `op-marine-sts.jpg` |
| 3 | Shell & PETRONAS Deliveries | Continued fuel-product deliveries associated with Shell and PETRONAS across the region. | `op-shell-petronas.jpg` |

---

## 3. Leaders (Leaders → Add New Leader)

Shown on the About page. Ngu Xiang Kai (Order 1) already exists.

| Order | Title | Role | Experience |
|---|---|---|---|
| 2 | Chendra Lingesh | Marine Operations Manager / DPA | 21 years in marine operations and DPA across various companies. |
| 3 | Jeremiah Michael | Business Dev. & Land Operations Manager | 18 years in oil and gas (Shell). |
| 4 | Lee Kah Jee | Finance / Assets | 15 years in finance and accounting. |

No featured image needed — the site shows the navy circle from the design when there's no photo.

---

## 4. Waiting on the client (don't add yet)

- **Contact details:** general email, phone, business hours, HQ phone, branch phone, careers email (Pages → Site Settings), and the real inbox for the two Contact Form 7 forms.
- **Branch office map pin:** a Google Maps share link for the Shah Alam office.
- **Service 01 wording:** PETRONAS/Shell-branded diesel and the Singapore trading arm (Palmer Petroleum PVT LTD).
- **Chendra's full name:** the company profile says "Chendra Lingesh A/L Sukalinggam".
- **Org chart roles:** Marsha Runai Madang, Chong Yee Ling, En. Bahrun, Andryana Anak Dawi — need approved role descriptions.
- **Marine Crew / Operations Clerk vacancies:** real details (Marine Crew is currently a Draft).

---

## 5. Photo notes

- `service-01.jpg` has a visible **Shutterstock watermark** — replace before promoting the site.
- `op-marine-sts.jpg` is a stand-in; the design marked it "REPLACE: MARINE STS PHOTO".
- `op-shell-petronas.jpg` is very small and looks blurry.
- The design also says: **confirm the client is happy to publicly name** the Japanese Navy, Shell and PETRONAS work.

---

## 6. Check it worked

After publishing, open `https://palmershipping.com` and check:

- **Home:** 5 service rows under "What we do", 3 cards under "Selected Operations", all with photos.
- **Services:** 5 alternating service blocks with photos.
- **About:** 4 leaders under "Experienced leadership".

If a change doesn't show after a few minutes, go to hPanel → Performance → CDN and click **Flush cache** on the `cms.palmershipping.com` row.



Here's an honest check against each item:

1. Google Search Console — not done, and can't be done yet
This is a manual step the client does at search.google.com/search-console, verifying ownership of palmershipping.com and submitting the sitemap. It can't happen until the site is live on the real domain — right now it's on Coming Soon publicly and only the preview subdomain has the real pages, which is deliberately blocked from search engines. This is a launch-day task, not a code task.

2. XML sitemap — done, but not active yet
sitemap.xml exists and lists all 6 pages with the palmershipping.com addresses already in it. It's sitting in the project folder but hasn't been uploaded anywhere yet, because it should only go on the live site, not the preview (the preview must stay hidden from Google). Upload it when you go live.

3. Page optimization for target keywords — partly done, needs your input
Each page has a distinct title, description and one clear H1, which is the basic structural part. What's missing is the actual keyword strategy — I don't know what terms the client wants to rank for (e.g. "marine fuel bunkering Sarawak", "diesel supplier Miri", "fuel transporter Borneo"). Right now the wording is written for clarity, not chosen for search volume. This needs a decision from you/the client on target phrases, then I'd weave them naturally into headings and body text.

4. Meta titles and descriptions — done
All 6 pages have unique titles and descriptions:

Page	Title
Home	Palmer Petroleum | Energy Logistics in Miri, Sarawak
About	About Us | Palmer Petroleum
Services	Services | Palmer Petroleum
Fleet	Our Fleets | Palmer Petroleum
Careers	Careers | Palmer Petroleum
Contact	Contact Us | Palmer Petroleum
Summary: Technically 2 of 4 are fully done (sitemap file, meta tags), 1 is structurally ready but needs a keyword list from the client, and 1 (Search Console) is a launch-day action, not something in the code.


What those 5 emails are

Hostinger's hosting plan includes email hosting — mailboxes on your own domain, like info@palmershipping.com or bunker@palmerpetroleum.com. Your plan lets you create up to 5 such mailboxes. They're separate from your website files; they just live on Hostinger's mail servers and use your domain name after the @.

You access them either through Hostinger's webmail (in hPanel → Emails) or by adding them to an email app (Outlook, the Gmail app, etc.) using IMAP/SMTP settings Hostinger gives you.

Is it the same as a Google/Gmail account?

No. A Gmail address (something@gmail.com) is a Google account. A Hostinger mailbox (something@palmershipping.com) is hosted by Hostinger, not Google. They're different systems, even though you can read a Hostinger mailbox's mail from within a Gmail-style inbox app if you set up forwarding or IMAP.

Right now your Contact Form 7 emails go to a personal Gmail (mentioned earlier in this project) — that should eventually be switched to one of these @palmershipping.com mailboxes once the client decides which address to use.

Can a Hostinger mailbox be used to set up Google Business Profile?

Yes, that part is fine — Google Business Profile doesn't require a Gmail address for the business email shown on the listing. You can use info@palmershipping.com publicly.

But the account that owns/manages the listing must be an actual Google account (Gmail or Google Workspace). That's just how Google Business Profile works — it's built on Google's login system.

Two ways to satisfy that:

Simplest: create one free Gmail account for the business, e.g. palmerpetroleumsdnbhd@gmail.com, use it only to log into Google Business Profile (and Google Search Console, Google Ads, Analytics, etc. later). Nobody needs to actually use it as a real inbox.
More proper for a company: use Google Workspace, which turns info@palmershipping.com into a real Gmail-powered inbox with a Google login. That costs extra (~RM26–30+/user/month) and is a separate product from Hostinger's free mailboxes.
My recommendation: start with option 1 (free Gmail account owned by the client, not you) to claim the Business Profile now, and use a Hostinger mailbox like info@palmershipping.com as the public-facing email shown on the listing and the website. Upgrade to Google Workspace later only if the client wants @palmershipping.com to work as Gmail day-to-day.
