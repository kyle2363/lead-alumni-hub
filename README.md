# LEAD Alumni Hub

A responsive capstone concept for The CAFE Group's LEAD alumni community. This is an independent educational demonstration, not an official CAFE Group service.

All events, opportunities, organizations, and alumni profiles are fictional. No emails, registrations, introduction requests, applications, or newsletter subscriptions are sent.

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
