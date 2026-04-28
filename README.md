# TerraTern — Germany Opportunity Card Landing Page

High-converting landing page for TerraTern's Germany Opportunity Card (Chancenkarte) product, targeting Indian IT professionals.

---

## Folder Structure

```
terratern-goc/
├── index.html
├── README.md
├── favicon.png
│
└── assets/
    └── images/
        ├── logo.png
        ├── story-01.jpg
        │
        ├── alumni/
        │   ├── alumni-arjun-k.jpg
        │   ├── alumni-priya-r.jpg
        │   ├── alumni-siddharth-k.jpg
        │   ├── alumni-nisha-m.jpg
        │   ├── alumni-rohit-v.jpg
        │   ├── alumni-deepika-s.jpg
        │   ├── alumni-karthik-p.jpg
        │   ├── alumni-ananya-m.jpg
        │   ├── alumni-vaishnavi-p.jpg
        │   └── alumni-sophia-p.jpg
        │
        └── experts/
            ├── expert-noor-zaiba.jpg
            ├── expert-ritika.jpg
            └── expert-kumar.jpg
```

---

## Live Assets Required

Place all files below in the **same directory** as `index.html`. The page degrades gracefully with coloured initials if images are missing, but all assets are expected in production.

### Logo & Favicon
| File | Usage |
|------|-------|
| `logo.png` | Navigation bar + footer (150×44px recommended) |
| `favicon.png` | Browser tab icon |

### Expert Photos
| File | Name | Displayed In |
|------|------|--------------|
| `expert-noor-zaiba.jpg` | Noor Zaiba | Lead form + popup rotator |
| `expert-ritika.jpg` | Ritika | Lead form + popup rotator |
| `expert-kumar.jpg` | Kumar | Lead form + popup rotator |

> Recommended: Square crop, face centred, minimum 200×200px. The component uses `object-position: top` so portrait shots work fine.

### Alumni Photos (Scroller)
| File | Person | City |
|------|--------|------|
| `alumni-arjun-k.jpg` | Arjun K. | Berlin |
| `alumni-priya-r.jpg` | Priya R. | Munich |
| `alumni-siddharth-k.jpg` | Siddharth K. | Frankfurt |
| `alumni-nisha-m.jpg` | Nisha M. | Hamburg |
| `alumni-rohit-v.jpg` | Rohit V. | Berlin |
| `alumni-deepika-s.jpg` | Deepika S. | Stuttgart |
| `alumni-karthik-p.jpg` | Karthik P. | Munich |
| `alumni-ananya-m.jpg` | Ananya M. | Cologne |
| `alumni-vaishnavi-p.jpg` | Vaishnavi P. | Düsseldorf |
| `alumni-sophia-p.jpg` | Sophia P. | Frankfurt |

> Recommended: Square crop, face centred, minimum 150×150px. Displayed at 72×72px in the scroller.

### Story / Popup Image
| File | Usage |
|------|-------|
| `story-01.jpg` | Exit-intent popup left panel background |

> Recommended: Portrait orientation, face or visa-related imagery, minimum 400×600px.

---

## Page Structure

```
index.html
├── NAV              — Fixed top bar, logo, phone, Free Consult CTA
├── HERO             — Bonus banner, headline, stats, lead form (right panel)
│   ├── Expert rotator (3 advisors, auto-rotates every 10s)
│   └── Slots counter (random 4–18, refreshes each page load)
├── ALUMNI SCROLLER  — Infinite horizontal scroll, 10 alumni, gold top border
├── ELIGIBILITY      — 6 cards with points breakdown
├── WHY GERMANY      — Salary card + 5 benefit cards
├── IT IN GERMANY    — 4 stats + 6 city cards
├── WOW FACTORS      — 8 lifestyle cards
├── PROGRAM          — 6-step process cards
├── TIMELINE         — 6 milestone cards
├── FAQ              — 8 accordion items, 2-column
├── CTA              — Dark gradient, slots counter, phone
├── FOOTER           — Logo, address, privacy link
└── EXIT POPUP       — Desktop: exit intent | Mobile: 20s timer
    ├── Left panel: Expert rotator + what you get + rating
    └── Right panel: Lead form (5 fields)
```

---

## Key Features

**Lead Form**
- Fields: Full Name, Email, WhatsApp, Education level, Work experience
- Button: "📞 Book My Slot →"
- Slots scarcity: Random number 4–18, shown in red below button
- Trust line: "2,400+ Indians already in Germany via TerraTern"

**Bonus Banner (7-minute countdown)**
- Resets fresh on every page visit
- Displays minutes and seconds countdown
- ₹40,000 in bonuses: Free flight ticket (₹35,000) + Expert consultation (₹5,000)

**Expert Rotator**
- Cycles through Noor Zaiba → Ritika → Kumar every 10 seconds
- Clickable dot navigation
- Falls back to coloured initials avatar if photo fails to load
- Synced between lead form and exit popup

**Alumni Scroller**
- Infinite auto-scroll, pauses on hover
- Duplicated set for seamless loop
- Falls back to coloured initials if image fails

**Exit / Timed Popup**
- Desktop: Triggers on mouse exit from top of viewport
- Mobile: Triggers after 20 seconds
- Shows once per session
- Left panel mirrors the expert rotator from the lead form
- Closes on: ✕ button, overlay click, skip link, or successful submit

---

## Responsive Behaviour

| Breakpoint | Behaviour |
|------------|-----------|
| > 960px | Full two-column hero, all grids at full width |
| ≤ 960px | Hero stacks to single column, grids go 2-column |
| ≤ 600px | All grids single column, hero sub-paragraph hidden, nav simplified |

---

## Brand Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#00215c` | Nav, hero bg, footer, CTA section |
| `--blue` | `#255cc1` | Buttons, links, accents, tags |
| `--sky` | `#9acbfd` | Gradients, hover highlights |
| `--gold` | `#f1c819` | Stats, bonus banner, CTA button, badges |
| `--white` | `#ffffff` | Cards, form backgrounds |
| `--bg` | `#f0f6ff` | Page background |
| `--bg2` | `#e6f0ff` | Alternate section background |

Font: **Poppins** (Google Fonts) — weights 300, 400, 500, 600, 700, 800, 900

---

## Contact / CTA Numbers

- **Phone / WhatsApp:** +91 80641 24242
- **Address:** 4th Floor, HustleHub 1901, 19th Main Road, HSR Layout Sector 1, Bangalore, Karnataka 560102

---

## Notes

- No external JS dependencies — vanilla JavaScript only
- Fonts loaded via Google Fonts CDN
- All form validation is client-side only — wire to your backend or CRM (LeadSquared / HubSpot) via form action or JS fetch
- The slots counter is cosmetic (random on each load) — not connected to a real inventory system
- The bonus timer resets on every page load — it is not session-persistent
- Page does not use cookies or localStorage
- `© 2025 TerraTern. All rights reserved. Immigration consulting — not a law firm. Results vary per individual profile.`
