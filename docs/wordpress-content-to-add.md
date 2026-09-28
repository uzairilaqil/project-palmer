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
