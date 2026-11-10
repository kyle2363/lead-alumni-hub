# LEAD Alumni Hub

A responsive capstone concept for The CAFE Group's LEAD alumni community. This is an independent educational demonstration, not an official CAFE Group service.

All events, opportunities, organizations, and alumni profiles are fictional. No emails, registrations, introduction requests, applications, or newsletter subscriptions are sent.

[Site Link](https://kyle2363.github.io/lead-alumni-hub/)

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/lead-alumni-hub/`.

```sh
npm test
npm run build
npm run preview
```

The build runs TypeScript checking before generating `dist/`. Preview serves the production build locally.

## Design options

The mockup banner at the top of every page has a **Design A / B / C** switcher. The choice is kept in the URL (`?design=cafe|classic|studio`, before the `#`), so you can share a link that opens a specific option, such as `/lead-alumni-hub/?design=studio#/give-back`.

- **A · CAFE match** (`cafe`): follows thecafe.org/programs/lead closely. It uses the site's navy/orange tokens, Literata headings, a photo hero with a blue edge, peach feature cards, a split "why it matters" section, and a navy call-to-action band. No CAFE photos or logos are bundled. Labeled photo placeholders mark where approved images would go. `src/pages/CafeHomePage.tsx`, `src/cafe.css`.
- **B · CAFE + features** (`classic`, default): the same CAFE look as A, carrying the research-driven features from C. It shares all of A's styling (`src/cafe.css` is scoped to both) and adds the time picker, the seasonal LEAD year, give-back asks, cohort and city views, and the staff page. `src/pages/HomePage.tsx`, `src/theme.css`.
- **C · Reimagined** (`studio`): a new direction built from the empathy-interview findings. It includes a "How much time do you have?" picker, a seasonal "LEAD year" rhythm, an alumni quote band, a section on roles beyond CAFE staff (alumni council, host organizations, 1954 Project concept), and a new **Give back** page with right-sized asks. `src/pages/StudioHomePage.tsx`, `src/pages/GiveBackPage.tsx`, `src/studio.css`.

Design A is kept as a plain mirror of the CAFE site. These features show in B and C only (gated by `hasFeatures` in `src/design.ts`):

- **Give back** (`/give-back`): right-sized asks filtered by time and season.
- **Your cohort, your city** (top of `/community`): pick a cohort year or a city to see who is there, the volunteer cohort captain or city host, and what that cohort is going to next. Both pickers drive the directory filters.
- **Who's going**: each event shows a made-up count of alumni and the cohorts attending.
- **How it runs** (`/how-it-runs`, linked from the mockup banner and footer): the staff-side plan. Who does what, staff effort by season, existing tools (Salesforce, the email tool, a LinkedIn group, Zoom), six success measures beyond attendance, what peer programs do, and a first 90 days. `src/pages/StaffPage.tsx`.

Sample data follows the research: cohorts run 2018–2026 (LEAD's first cohort was 2018), events cover all four seasons, and topics come from the alumni survey. Tests in `src/utils.test.ts` check those three things.

See [DESIGN_HANDOFF.md](DESIGN_HANDOFF.md) for per-design tokens, type, components and page-by-page specs. All interior pages share their markup across designs. Each theme file is scoped under `:root[data-design='…']`, and `src/shared.css` holds the switcher and Give Back layout.

## What's included

- Home: featured content from shared fixtures and clear paths into the community.
- Events: search, format/topic/location filters, chronological results, accessible detail dialogs, and demo RSVP feedback.
- Opportunities: sample jobs, internships, fellowships, mentoring, volunteering, and resources; combined filters and saved items.
- Community: fictional profiles, industry/region/cohort/mentoring filters, and non-submitting introductions and giving-back actions.
- Stay connected: topic and cadence preferences, responsive newsletter preview, and simulated signup without collecting an email address.
- Keyboard navigation, visible focus, native modal dialogs, responsive layouts, reduced-motion support, and empty/reset states.

Saved opportunities and newsletter preferences persist across navigation and reset on refresh. Other interactions and filters are page-local. There is no backend or browser storage. Fonts and artwork are local/code-based; no external image or font requests are needed.

## Content and architecture

- `src/data.ts`: typed fictional event, opportunity, and profile fixtures.
- `src/utils.ts`: search/filter logic and Chicago-aware date formatting.
- `src/components.tsx`: reusable cards, controls, and native dialog wrapper.
- `src/pages/`: the five page implementations.
- `src/App.tsx`: routing, layout, and shared in-memory preferences.
- `src/styles.css`: responsive visual system.
- `src/utils.test.ts`: filtering, fixtures, sorting, and daylight-saving checks.

Filters combine with AND across categories. Search matches a trimmed, case-insensitive substring. Each dropdown selects one value. Online events include virtual and hybrid options. The sample schedule uses January 1, 2027 as a fixed reference for “upcoming”; this is explicitly labeled on the events page and does not indicate live programming.

To update content, a technical maintainer edits `src/data.ts`, runs the checks, and publishes a reviewed commit. The homepage reads the same fixtures as the listing pages. Changing the records currently requires source-code access; this is not a staff administration system.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` installs the lockfile dependencies, runs tests, checks types, builds, and deploys `dist/` on pushes to `main` or manual dispatch.

1. Create or select the intended GitHub repository and push this project to its `main` branch.
2. In repository Settings → Pages, choose **GitHub Actions** as the source.
3. Run the deployment and verify the returned public URL.

The configured project path is `/lead-alumni-hub/`. If the repository has a different name, change `base` in `vite.config.ts`. A custom-domain root deployment uses `/`. `HashRouter` supports refreshing nested pages without server rewrite rules.

No GitHub repository or public deployment is implied by these source files. Never add real personal data, credentials, or secret keys to the repository or static build.

## Demo walkthrough

1. Home → Explore events. Search “finance,” choose Virtual, and open Capital for Community Impact.
2. Choose Demo RSVP. The confirmation explicitly says no registration was submitted.
3. Opportunities → select Mentorship and Remote-friendly. Save a listing, navigate away and back, then use Saved to find it.
4. Community → choose Finance and Available to mentor. Open the fictional Jordan profile and request a demo introduction.
5. Stay connected → choose interests and cadence. Watch the sample digest update and preview signup without entering personal details.

## Future pilot

Confirm brand assets and content with CAFE staff before organizational use. The flame icon and abstract art are generic prototype artwork. A real directory would need verified access, opt-in consent, visibility controls, moderation, and record removal. Real event and newsletter actions should connect to approved existing systems. Decide on staff ownership and an editing platform before calling the system low-maintenance.

The existing official website is linked; it is not modified. Source design and fictional fixtures can inform a later CMS implementation or separately approved application.
