# LEAD Alumni Hub: Design Handoff

Design specs for the three switchable options. Use this alongside the live site (https://kyle2363.github.io/lead-alumni-hub/) and the README.

## Shared across all three

**Switching.** The mockup banner at the top of every page holds the **Design A / B / C** switcher. The choice is stored in the URL (`?design=cafe|classic|studio`) and sets `data-design` on `<html>`. Each theme's CSS is scoped under `:root[data-design='…']`.

**Pages.** Every design has the same routes. Only the **Home** page is built separately for each design. The interior pages share the same markup and are restyled by each theme.

| Route | Purpose | Key interactions |
|---|---|---|
| `/` Home | Unique per design (see below) | Event detail dialog, demo RSVP |
| `/events` | Sample 2027 calendar | Search, format/topic/location filters, "upcoming" toggle, detail dialog |
| `/opportunities` | Jobs, fellowships, mentoring, resources | Type tabs, industry filter, remote-only, save + "saved only" |
| `/community` | Fictional alumni directory + give-back cards. In B and C it opens with **Your cohort** and **Alumni near you** pickers | Industry/region/cohort filters, "available to mentor", demo intro request. The cohort and city pickers set the same filters |
| `/newsletter` | "Stay connected" digest builder | Interest checkboxes and cadence update a live preview |
| `/give-back` | Right-sized volunteer asks (linked in B and C) | Time and season chips, "Raise my hand" toggle + toast |
| `/how-it-runs` | Staff-side plan (linked from the banner and footer in B and C) | Static: roles, staff effort by season, existing tools, six success measures, peer programs, first 90 days |

**Feature gating.** Design A stays a plain mirror of the CAFE site. `hasFeatures(design)` in `src/design.ts` turns on the give-back and staff links, the cohort and city pickers, and the "who's going" line on events for B and C.

**Fixed for all designs:**
- The disclaimer banner can't be removed. Every action only shows a confirmation on screen and nothing is submitted.
- Use native `<dialog>` for detail views, keep visible focus rings and support reduced motion.
- Breakpoints: navigation collapses to a menu at 1000px, grids drop to 2 columns at 900px and 1 column at 650px, with extra tightening at 370px.
- Data lives in `src/data.ts`. Copy changes there update every design.

---

## Design A · CAFE match (`?design=cafe`)

**Intent.** Make the alumni hub feel like a section of thecafe.org/programs/lead, so it can sit beside the official site.

**Tokens** (sampled from the live CAFE page, Nov 2026)

| Role | Value |
|---|---|
| Navy (headings, header text, bands) | `#133D65` |
| Accent blue (pull quote, notice border) | `#337ABE` |
| Sky (hero edge stripe) | `#3D9BE9` |
| Orange (brand) / orange for buttons and text | `#F1562A` / `#CF421A` |
| Page / peach panels / white | `#FEFCFA` / `#FFF5F0` / `#FFFFFF` |
| Body text / muted / lines | `#2C2C2C` / `#555` / `#E8E6E6` |
| Accent text on navy | `#FFB59C` |

CAFE's orange is too light for white text to meet WCAG AA, so filled buttons and orange text use `#CF421A`.

**Type.** Headings use **Literata** (CAFE's own heading font): page H1 at 700, card titles at 400–500. Body uses **Public Sans**, standing in for CAFE's licensed Graphik. Kickers are uppercase orange at about 0.82rem with wide letter spacing.

**Shape and components.**
- Buttons are flat with a 3px radius, at least 50px tall, uppercase-style letter spacing (0.1em) and a chevron. Primary is filled orange, secondary is an orange outline, and buttons on navy use a white outline.
- Cards are square peach panels with no shadow. On hover, a 3px orange underline appears.
- Photo placeholders are tinted blocks labeled "Photo placeholder · …". Replace them with staff-approved photos only.

**Home page, top to bottom**
1. **Hero:** full-width photo with a navy overlay and a 12px sky-blue left edge. Shows "OUR PROGRAMS · LEAD", the H1 "LEAD Alumni" and a one-line purpose.
2. **About the network:** an H2, two paragraphs, a large blue serif pull quote and two buttons (Explore Alumni Events, Stay Connected).
3. **Photo strip:** two placeholders shown edge to edge.
4. **The alumni experience:** three peach cards (Gatherings, Opportunities, Mentorship), each with a photo, text and a link.
5. **Upcoming gatherings:** the next three events.
6. **Why it matters:** text on the left and a photo on the right.
7. **Opportunities:** three cards.
8. **Navy give-back band** with two buttons.

**Interior pages.** The page intro becomes a navy-to-blue gradient band with the sky edge stripe. Filters and panels are white and square. Notices use a blue left border.

**Before launch:** get approved photos and the logo from CAFE, confirm licensing for Graphik, and confirm with CAFE staff that the near-identical styling is welcome.

---

## Design B · CAFE + features (`?design=classic`, default)

**Intent.** Look like design A, and so like thecafe.org, while carrying the features from design C. It is the option to show when the question is "what would the research-driven ideas look like on our own site?"

**Tokens, type, shape.** Identical to design A. `src/cafe.css` is scoped to both designs, so any change to A's look carries to B. `src/theme.css` holds only what A doesn't have (`bf-` classes), drawn in the same vocabulary: square peach panels, navy Literata headings, orange uppercase kickers, flat 3px buttons, no shadows.

**Navigation.** Home, Events, Opportunities, Community, **Give back**, Stay connected. Between 1001px and 1180px the orange CAFE button is hidden so the six links fit on one line.

**Home page, top to bottom**
1. **Hero:** the same photo hero as A.
2. **Start where you are:** about copy and the alumni pull quote on the left, the **"How much time do you have?"** picker on the right (peach panel, orange top rule, three squared toggles, three linked actions).
3. **Navy stats strip:** ~380 alumni, 88.5% want to stay connected (footnoted), 4 seasons.
4. **The LEAD year:** four season tabs on a navy rule. The peach panel shows what happens that season on the left and that season's sample events on the right; each event opens its dialog.
5. **Photo strip**, as in A.
6. **This season's asks:** three give-back cards with time, season, format, and who is asking.
7. **Alumni gatherings:** the next three events, each with a "who's going" line.
8. **Your cohort, your city:** split section linking to the community pickers.
9. **Opportunities:** three cards.
10. **Beyond CAFE staff:** three peach tiles (alumni council, host organizations, 1954 Project concept) and a link to the staff plan.
11. **Navy band:** monthly digest and give-back buttons, then the survey footnote.

**Before launch:** the same items as A, plus the checks listed under C for the survey figure, the quote, and the 1954 Project tie-in.

---

## Design C · Reimagined (`?design=studio`)

**Intent.** Built from the empathy-interview findings rather than the CAFE site. Alumni want **flexible, optional** ways to take part, a **predictable yearly rhythm**, real ways to **give back**, and connections **beyond CAFE staff**. The look is warmer and more playful, a place people return to by choice.

**Tokens**

| Role | Value |
|---|---|
| Ink (text, borders, dark bands) / ink 2 | `#1D1A2B` / `#2C2840` |
| Paper / cream page | `#FFFDF8` / `#F6EFE4` |
| Tangerine (primary fill) / orange for text | `#FF6A3D` / `#C2401C` |
| Sun (banner, stats, signup) | `#FFBE45` |
| Pastels: lilac / mint / sky | `#D9CDFC` / `#C9EAD7` / `#CFE4FF` |
| Muted / lines | `#5D5869` / `#E6DCCD` |

Accent fills always carry ink-colored text, never white, so every combination passes AA.

**Type.** Display text uses **Fraunces** (soft, slightly quirky setting, 600), with an italic orange phrase as the second half of each headline. Body uses **DM Sans**. Kickers are sentence case, not uppercase.

**Shape and components.**
- Sticker style: a 1.5px ink border, 20px radius and a hard 5px offset shadow (`5px 5px 0 ink`). Cards lift 2px on hover, and buttons press down when clicked.
- Buttons are pills with a 3px offset shadow: tangerine on light backgrounds, ink with a tangerine shadow on dark ones.
- Pastel colors cycle through card headers and avatars. Format badges are color-coded: Virtual is sky, Hybrid is lilac, In person is mint.
- The logo is a ring with a sun dot and "LEAD *alumni*".
- Navigation is renamed: **Gatherings**, **People**, and a new **Give back** item.

**Home page, top to bottom**
1. **Dark hero:** "Your summer ended. *Your LEAD didn't.*" with two buttons, plus the **"How much time do you have?"** picker. The picker has three toggles (5 minutes / An evening / A season), each showing three linked actions, and opens on "An evening".
2. **Stats row:** ~380 alumni, 88.5% want to stay connected (footnoted), and 4 seasons.
3. **The LEAD year:** four season buttons and a detail panel tinted to match. "Now" is set from the demo date of Jan 2027, so it shows Winter. Summer adds a note that summer asks are lined up in spring to protect staff time.
4. **Tangerine quote band:** "We want to come back and we want to give back." with a CTA to the give-back asks.
5. **Gatherings:** a list of the next four events (date, title, topic and place, format pill), each opening a dialog.
6. **Beyond the CAFE staff:** three pastel tiles (alumni council, host organizations, 1954 Project labeled as a concept).
7. **Sun-colored signup card** linking to the digest builder, followed by the survey source footnote.

**Give back page.** Time and season chip filters, where "Any time" asks show up in every season. The cards show commitment, season, format and who's asking, with a "Raise my hand" toggle. Below them, a three-step "How invitations could work" section.

**Interior pages.** Page intros are dark with a tangerine circle in the corner. Filters, panels and dialogs use the sticker style. Notices have a dashed ink border on pale yellow.

**Added in this pass:** each season in the LEAD year lists its sample events, and the "Beyond the CAFE staff" section links to the staff plan and the cohort and city pickers.

**Before launch:** confirm the 88.5% survey figure and the quote attribution with staff, confirm whether CAFE wants a visual identity this separate from its brand, and confirm that a 1954 Project tie-in is welcome.
