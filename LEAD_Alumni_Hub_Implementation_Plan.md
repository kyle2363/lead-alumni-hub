# LEAD Alumni Hub — Implementation-Ready Capstone Website Plan

**Status:** Proposed capstone prototype (not an official CAFE Group website)  
**Prepared:** November 2026  
**Partner:** The CAFE Group / LEAD program  
**Recommended stack:** React, TypeScript, Vite, Tailwind CSS, GitHub Pages  
**Approach:** Public static demonstration using entirely fictional records

### Implementation decisions — November 6, 2026

- Build all five pages with mission-centered sample content about equity, philanthropy, leadership, and social impact.
- Use React, TypeScript, Vite, React Router, Lucide icons, and scoped plain CSS. A small stylesheet is sufficient; Tailwind is optional in this specification.
- Match each visible filter to typed fixtures. Include sample jobs and internships, a finance-focused event, and an available finance mentor.
- Combine different filter categories with AND. Controls are single-select within each category; search is case-insensitive and trimmed. The Online event filter includes virtual and hybrid events.
- Preserve saved opportunities and newsletter preferences across page navigation in top-level React state; reset on refresh. No localStorage, cookies, contact fields, or form submissions.
- Use a fixed, visibly explained January 1, 2027 reference for the sample upcoming schedule. Display event times in America/Chicago with daylight-saving-aware labels.
- Newsletter preferences update a live preview without requesting an email address.
- Use an original abstract community illustration and a generic flame icon; do not claim that these are approved CAFE branding assets.
- Validate the homepage and complete event journey before finalizing the remaining page patterns. Ship a GitHub Pages workflow and reproducible README; publication requires an actual target repository.
- Explain that updating checked-in content requires a technical maintainer. A staff-friendly CMS and real integrations are future pilot decisions.

## 1. Purpose and project boundaries

### Problem
LEAD provides a valuable 10-week internship and leadership community, but alumni can lose touch after the program. The project research highlights interest in networking, career development, mentoring, opportunities to give back, and regular but flexible communication. Alumni may have different schedules and live beyond Chicagoland; CAFE staff have limited time to manage engagement.

### Proposed solution
A **LEAD Alumni Hub**, a coherent destination where former interns can discover upcoming events, browse relevant careers and resources, find peers and potential mentors, and preview alumni communications. The hub is a concrete example of a broader engagement strategy—not a claim that a website alone solves the problem.

### Goals
1. Make alumni opportunities visible and easy to discover in under three clicks.
2. Support different interests, career stages, locations, and levels of availability.
3. Encourage two-way engagement: attending, mentoring, speaking, volunteering, and suggesting ideas.
4. Show how communications could become regular, personalized, and low maintenance.
5. Be easy for CAFE staff to evaluate, adapt, and potentially integrate into their official site.

### Non-goals for this capstone
- No real user accounts, authentication, messaging, direct contact details, or access to Salesforce.
- No real RSVPs, job applications, newsletter subscriptions, or external emails from demo controls.
- No real alumni survey responses or personally identifiable information embedded in a public repository.
- No claim that fictional event listings or organizations are official CAFE offerings.
- No custom production backend, CRM integration, or staff administration portal.

### Core principle
**A reason to return, not simply another page to visit.** The four primary content pillars are Events, Opportunities, Community, and Newsletter.

## 2. Audience and use cases

- **Recent alumni:** Seek jobs, internships, introductions, workshops, and familiar peers.
- **Mid-career alumni:** Seek mentoring relationships, leadership opportunities, giving-back opportunities, and professional networking.
- **Current interns (future pathway):** May learn about mentoring and alumni-led programming, but are not the main prototype audience.
- **CAFE staff and partner organizations:** Need a manageable way to communicate opportunities and plan programming.

### Three primary user stories
1. *As a recent LEAD alum*, I want to find virtual networking events relevant to finance, so that I can stay connected even when I live outside Chicago.
2. *As a LEAD alum working professionally*, I want to volunteer as a mentor or speaker, so that I can contribute to the community that supported me.
3. *As an alum with limited time*, I want a monthly digest tailored to my interests, so that I can hear about a few useful opportunities without attending frequent events.

## 3. Information architecture

### Global navigation
**LEAD Alumni** wordmark / Home / Events / Opportunities / Community / Newsletter / **Back to The CAFE Group** (external link).

### Page routes
Use React Router **HashRouter** on GitHub Pages to avoid direct-refresh 404s:

| Route | Page | Purpose |
|---|---|---|
| `#/` | Home | Welcoming overview and relevant featured content |
| `#/events` | Events | Browse, filter, inspect, and demo-RSVP |
| `#/opportunities` | Opportunities | Browse jobs, internships, mentorship, volunteer and speaking opportunities |
| `#/community` | Community | Search fictional alumni profiles; simulate introductions and mentoring interest |
| `#/newsletter` | Stay Connected | Preview newsletter, select topics, and simulate signup |

Event, opportunity, and profile details can appear in accessible dialogs or expandable panels rather than additional routes for the initial build.

### Shared global elements
- Header with official-brand-inspired layout, active navigation state, mobile menu, and visible external link back to CAFE.
- Persistent small notice: **Capstone concept — demonstration data only. Not an official CAFE Group service.**
- Footer: About LEAD, official CAFE website, social channels if verified, project disclaimer.
- Reusable page title, filter chips, card, badge, button, dialog, empty state, and call-to-action components.

## 4. Visual design specification

### Brand direction
Follow the existing CAFE Group brand, not a generic SaaS dashboard. Use generous white space, confident black headings, simple typography, warm orange/red and golden-yellow accents, friendly people-focused imagery (only permissioned images), and strong, mission-centered copy.

**Provisional palette for prototyping (not verified official brand hex codes):**

| Design token | Suggested hex | Role |
|---|---|---|
| `ink` | `#171717` | Main body text and prominent headings |
| `paper` | `#FFFFFF` | Primary background |
| `cream` | `#FFF9F1` | Warm alternate page sections |
| `orange` | `#F04A27` | Accent lines and high-emphasis details |
| `gold` | `#FFC247` | Decorative accent, dark-text CTA surfaces |
| `border` | `#E9E4DD` | Card borders and dividers |
| `muted` | `#5B5751` | Secondary text |

Before implementation, compare these with the actual logo and site's design tokens; adjust to match the official site and maintain WCAG text contrast. Do not use white text over bright orange/gold unless contrast passes.

### Typography
Use the organization's actual fonts if they can be identified and are licensed for reuse. Until then, use a clean, robust sans-serif (e.g., system UI). Proposed scale: hero 48–64px desktop/34–40px mobile; section headings 30–40px; card titles 20–24px; body 16–18px; captions 13–14px. Avoid overly technical, neon, or AI-themed visual patterns.

### Layout
- Max content width 1200px, centered; desktop horizontal padding 32px, mobile 20px.
- 12-column desktop grid; cards in 3 columns desktop, 2 tablet, 1 phone.
- Section spacing around 72–96px desktop and 48–64px mobile.
- Border radii about 12–16px; subtle borders and very light shadows.
- Visible keyboard focus outlines, responsive navigation, no horizontal overflow at 320px.
- Motion subtle and disabled when reduced-motion preference is set.

### Photography and artwork
Use official CAFE assets only with permission and appropriate credit. For the prototype, use brand-colored graphic shapes, event icons, and profile initials; do **not** imply photos of strangers represent actual alumni. Add the official logo only if allowed for this educational demo.

### Voice and microcopy
Warm, confident, inviting, clear. Suggested hero: **“Your LEAD community doesn't end with the summer.”** Subhead: *“Reconnect with alumni, discover opportunities, and grow alongside a network that continues beyond the internship.”* Avoid unverified claims of existing programming.

## 5. Page-by-page requirements

### A. Home (`#/`)

**Goal:** Explain the value of the hub immediately and route alumni to relevant activities.

Recommended vertical order:
1. Header and clearly visible capstone demo disclaimer.
2. Hero with warm background, headline, supporting copy, **Explore Events** primary CTA and **Meet the Community** secondary CTA.
3. Four category tiles: Events, Career Opportunities, Alumni Community, Stay Connected.
4. “Coming up” area showing the next 3 sample events; links to Events.
5. “Opportunities for you” showing 3 curated sample opportunities.
6. “Give back to LEAD” section with mentoring, speaking, and volunteering CTA linking to Community or Opportunities.
7. Newsletter preview band including **Explore the newsletter** CTA.
8. Footer, with an explicit **Visit the official LEAD page** external link.

**Interactions:** All category tiles and CTAs navigate; featured cards open correct destination; content comes from shared mock data files, not duplicated markup.

**Acceptance criteria:** A first-time visitor can reach the events page in one click, see upcoming sample activities without scrolling through a long explanation, and recognize the site as a capstone prototype.

### B. Events (`#/events`)

**Goal:** Show opportunities to reconnect in person and virtually.

Content:
- Intro: “Find a reason to reconnect.”
- Search input (`title`, `description`, `tags`).
- Filter controls: **Format** (All / Virtual / In-person / Hybrid), **Topic** (Career / Networking / Mentorship / Service / Leadership), **Location** (All / Chicago / Online / Other), and optional **Upcoming only** toggle.
- Event cards with title, date/time plus time zone, format, location, short description, topic tag, and action.
- Detail dialog with agenda/description, intended audience, accessibility note, and clearly marked **Demo RSVP** button.
- Empty results state with **Clear filters** action.

**Behavior:** Search and filters work together, filter state updates results immediately, and cards are sorted by start time. Clicking **Demo RSVP** shows: “Demo confirmation only — no registration was submitted.” No actual calendar invitations or external signups.

**Acceptance criteria:** User can filter to Virtual + Career, open an event, demo-RSVP, and clear filters on desktop and mobile.

### C. Opportunities (`#/opportunities`)

**Goal:** Keep alumni informed about tangible professional and service opportunities.

Content:
- Opportunity type tabs/chips: Jobs, Internships/Fellowships, Mentorship, Volunteer/Speaking, All.
- Search by title and description; industry filter (Finance, Education, Philanthropy, Technology, Public Service, Other); location/remote filter.
- Cards with title, **Sample organization** label, category, industry, location/remote, brief purpose, fictional or non-operational details, and **View details** button.
- Detail dialog with qualifications/preferences, description, and **Save for demo** toggle.
- Optional “Have an opportunity to share?” CTA that opens a non-submitting information dialog explaining how an approved real workflow might operate.

**Behavior:** Save toggles only in current browser session. No real application links. Make the fictional nature of listings obvious both on page and in details.

**Acceptance criteria:** User can find relevant remote roles/resources, distinguish mentorship from employment, and save/unsave a listing in the demo.

### D. Community (`#/community`)

**Goal:** Visualize how an opt-in alumni directory could enable trusted connections.

Content:
- Lead-in: “A community that grows with you.”
- Prominent banner: “Fictional example profiles. A real directory would require verified alumni access and opt-in consent.”
- Search by first name, field, or interests; filters by cohort, industry, geographic region, and mentoring availability.
- Fictional profile cards with initials/avatar illustration, first name and last initial (or fictional full names), cohort, professional field, broad region, 2–3 interests, and mentorship status.
- Accessible profile details dialog with brief biography and **Request introduction — demo** action.
- “Ways to give back” section offering Mentor, Speak at an event, Help organize, or Provide feedback; demo selections show a confirmation, not an actual submission.

**Behavior:** A connection request shows a friendly demo-only message and never sends an email, reveals contact details, or stores sensitive information.

**Acceptance criteria:** Visitor can find a sample finance alum, filter by mentoring availability, and complete a non-submitting request demonstration.

**Production note:** A real directory should have verified alumni authentication, consent, visibility controls, moderation/reporting, access logging, and a process for updating/removing personal information. GitHub Pages alone is not sufficient for that.

### E. Newsletter / Stay Connected (`#/newsletter`)

**Goal:** Make outreach discoverable, useful, and interest-aware.

Content:
- Heading: “Stay connected, on your terms.”
- Preview of a fictional monthly **The LEAD Connection** edition, with sections: Upcoming Events, Opportunities, Alumni Spotlight (fictional), Give Back, and One-Minute Feedback.
- Interest selectors: Career Opportunities, Events, Mentorship, Volunteering, Alumni Stories, Philanthropy & Impact.
- Preferred cadence selector: Monthly / Quarterly (recommended choices for a prototype, not a promise of actual CAFE communications).
- Sample email field (optional for the demo), explicit consent checkbox, and **Preview my signup** action.
- Example tailored digest changes which blocks are shown based on selected interests.

**Behavior:** Never submit or store a real email. On action, show: “This is a prototype; no signup occurred. In a launched version, this would connect to a CAFE-approved email platform.” In the demo, keep preference state in memory; do not retain addresses or contact details in localStorage.

**Acceptance criteria:** Visitor can select topics, see a tailored preview, and understand that no real signup occurred.

## 6. Sample data specification

Seed data must be fully fictional and visibly marked **Sample / Demo**. The following are illustrative fixtures, **not actual CAFE events, alumni, organizations, or jobs**.

### Sample events (six)

| ID | Title | Local date | Mode | Topic | Location |
|---|---|---|---|---|---|
| `event-001` | Career Compass: Finding Your Next Step | Jan 20, 2027 | Virtual | Career | Online |
| `event-002` | LEAD Alumni Winter Mixer | Feb 18, 2027 | In-person | Networking | Chicago, IL |
| `event-003` | Mentorship & Giving Back Orientation | Mar 11, 2027 | Virtual | Mentorship | Online |
| `event-004` | Resume & Interview Lab | Apr 10, 2027 | Virtual | Career | Online |
| `event-005` | Alumni Voices: Community Leadership | May 6, 2027 | Virtual | Leadership | Online |
| `event-006` | LEAD Summer Speaker Gathering | Jun 15, 2027 | Hybrid | Service | Chicago + Online |

Treat all dates/times as illustrative. For actual fixtures choose an explicit IANA time zone (e.g., `America/Chicago`) and correctly convert/format dates; never show a fictional event as live.

### Sample opportunities (six)

| ID | Title | Type | Interest area | Mode |
|---|---|---|---|---|
| `opp-001` | Community Impact Fellowship | Fellowship | Philanthropy | Hybrid |
| `opp-002` | Early-Career Finance Roundtable | Networking | Finance | Virtual |
| `opp-003` | Technology for Good Career Exploration | Career resource | Technology | Virtual |
| `opp-004` | Mentor a Future LEAD Intern | Mentorship | Cross-industry | Virtual |
| `opp-005` | Alumni Workshop Speaker | Volunteering | Leadership | Hybrid |
| `opp-006` | Education Equity Project Volunteer | Volunteering | Education | Chicago / virtual |

Organizations should have generic labels such as **Sample Partner Organization** rather than invented claims about actual employers. Do not link to real job application pages for fictional entries.

### Sample directory profiles (six)

| Name (fictional) | Cohort | Field | Region | Interests | Mentor available |
|---|---|---|---|---|---|
| Maya J. | 2025 | Nonprofit Programs | Chicago | Community service, leadership | Yes |
| Andre P. | 2022 | Finance | New York | Career advice, investing education | Yes |
| Taylor B. | 2020 | Technology | Atlanta | Software, social impact | No |
| Jordan R. | 2024 | Education | Chicago | Education equity, mentoring | Yes |
| Sam L. | 2019 | Public Policy | Washington, DC | Advocacy, philanthropy | Yes |
| Alex M. | 2023 | Entrepreneurship | Boston | Innovation, business | No |

Use initials, no headshots, email addresses, workplaces, or private identifiers.

### Newsletter sample content
- **Issue:** “The LEAD Connection — March 2027” (fictional)
- **Opening:** “Your community continues beyond the summer. Here are a few ways to reconnect this month.”
- **Upcoming:** “Mentorship & Giving Back Orientation”
- **Career:** “Three ways to build your professional network” (short prototype article)
- **Spotlight:** “A LEAD alum makes a difference” (clearly fictional vignette; no implied endorsement)
- **Give back:** “Offer to speak with current interns”
- **Feedback:** “What kind of event would be worth your time?” (non-submitting sample prompt)

## 7. TypeScript data model

Store data in checked-in local TypeScript or JSON fixtures. Suggested shapes:

```ts
type EventFormat = 'virtual' | 'in-person' | 'hybrid';
type EventTopic = 'career' | 'networking' | 'mentorship' | 'service' | 'leadership';
interface AlumniEvent {
  id: string;
  title: string;
  description: string;
  startsAt: string; // ISO 8601, offset-aware
  timeZone: 'America/Chicago';
  format: EventFormat;
  locationLabel: string;
  topics: EventTopic[];
  audience: string;
  isDemo: true;
}
interface Opportunity {
  id: string;
  title: string;
  summary: string;
  type: 'job' | 'internship' | 'fellowship' | 'career-resource' | 'mentorship' | 'volunteering' | 'networking';
  industries: string[];
  locationLabel: string;
  remoteFriendly: boolean;
  isDemo: true;
}
interface AlumniProfile {
  id: string;
  displayName: string;
  cohortYear: number;
  industry: string;
  region: string;
  interests: string[];
  availableToMentor: boolean;
  bio: string;
  isDemo: true;
}
```

For demo interactivity, use React state for selected filters and actions. No API calls are necessary. `window.localStorage` may be used for **non-sensitive** saved UI state only if desired, but in-memory state is preferred.

## 8. Technical architecture and project files

### Dependencies
- React + TypeScript with Vite
- React Router (`HashRouter` for GitHub Pages)
- Tailwind CSS (current official Vite integration) or a small set of scoped CSS files
- Lucide icon library or simple inline SVG assets
- Vitest + React Testing Library for functional tests; Playwright for a small set of end-to-end demo journeys

Avoid adding a state management library, hosted database, authentication provider, email API, or CSS component framework unless a genuine need appears.

### Suggested folder structure

```text
lead-alumni-hub/
├─ .github/
│  └─ workflows/deploy.yml
├─ public/
│  └─ assets/                  # permitted logo/illustrations
├─ src/
│  ├─ app/App.tsx
│  ├─ components/
│  │  ├─ layout/              # Header, Footer, DemoBanner
│  │  ├─ ui/                  # Button, Card, FilterBar, Dialog, EmptyState
│  │  ├─ EventCard.tsx
│  │  ├─ OpportunityCard.tsx
│  │  ├─ AlumniCard.tsx
│  │  └─ NewsletterPreview.tsx
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  ├─ EventsPage.tsx
│  │  ├─ OpportunitiesPage.tsx
│  │  ├─ CommunityPage.tsx
│  │  └─ NewsletterPage.tsx
│  ├─ data/
│  │  ├─ events.ts
│  │  ├─ opportunities.ts
│  │  ├─ alumni.ts
│  │  └─ newsletter.ts
│  ├─ types/
│  ├─ utils/
│  │  ├─ filters.ts
│  │  └─ dates.ts
│  ├─ styles/
│  ├─ tests/
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
```

### UI state conventions
- One source of truth for fixture data (never copy/paste content between pages).
- Derive filtered/sorted results from current filter state.
- URL routing controls page selection.
- Open detail modal ID is page-local state.
- Demo action feedback uses visible accessible alert/toast, clearly saying no backend action occurred.
- One `isDemo` discriminator on records allows future separation from real data.

## 9. GitHub Pages setup and deployment

### Repository and URL
Use a repository name such as **`lead-alumni-hub`**, under a personal or team GitHub account. For a public repo named `lead-alumni-hub`, the typical GitHub Pages address is:

`https://<github-username>.github.io/lead-alumni-hub/`

This is a URL template, not a site currently deployed.

### Initial setup

```bash
npm create vite@latest lead-alumni-hub -- --template react-ts
cd lead-alumni-hub
npm install
npm install react-router-dom lucide-react
npm install tailwindcss @tailwindcss/vite
npm run dev
```

Use the current Tailwind/Vite official integration. Add the Tailwind Vite plugin to the config if using Tailwind.

### Vite base path
For a repository named `lead-alumni-hub`, configure:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/lead-alumni-hub/',
});
```

If the repo name changes, update `base`. For a root user-site repo named `<username>.github.io` or a custom-domain root deployment, `base: '/'` is appropriate. For static assets, use imports or paths that respect `import.meta.env.BASE_URL`; avoid absolute `/assets/...` URLs that break on project pages.

### Routing
Wrap the app with `HashRouter` so that pages render at `.../lead-alumni-hub/#/events` and refresh safely without requiring server rewrite rules. On a future host with configurable rewrites, conventional `BrowserRouter` paths can be adopted.

### Deployment workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy LEAD Alumni Hub

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: lts/*
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v5
```

In repository **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Commit and push to `main`, then check the workflow result. Confirm that the site, images, routes, and mobile layout function at the actual project URL. Keep `package-lock.json` committed for `npm ci`.

**Hosting caveat:** GitHub Pages sites are publicly accessible and are static. Do not store real alumni information, forms containing personal emails, API secrets, or credentials. A later real system would require a separate authorized backend/service.

Official references: https://vite.dev/guide/static-deploy.html and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 10. Development phases and done criteria

### Phase 0 — Verify brand and copy
- Audit actual LEAD page, approved logo usage, typography, and visual design.
- Freeze navigation and definitions of sample/demo content.
- Draft a short disclaimer and official site linking policy.
- **Done:** Approved design tokens + page map + reviewed copy.

### Phase 1 — Design system and home page
- Implement global header/footer, navigation, page layout, typography, components, responsive behavior.
- Implement home hero and featured cards from mock data.
- **Done:** Home works on mobile and desktop; every global route can be reached.

### Phase 2 — Events and opportunities
- Write typed fixture datasets; build reusable cards and detail dialogs.
- Implement search/filter/sort/empty states and safe demo RSVP/save actions.
- **Done:** Users can complete discovery and demo interaction journeys on both pages.

### Phase 3 — Community and newsletter
- Implement fictional, opt-in-style directory concept with safe demo introductions.
- Build newsletter preview, interest filtering, consent UI, and non-submitting simulated signup.
- **Done:** No personal data is saved or transmitted; all actions explain that they are simulated.

### Phase 4 — Testing and deployment
- Add focused component tests and full-flow browser tests.
- Check keyboard accessibility, contrast, mobile layouts, and external links.
- Deploy through GitHub Actions and test production base paths and hash routes.
- **Done:** Public demo URL works and passes the acceptance checklist.

### Phase 5 — Presentation and handoff
- Create walkthrough script, screenshots, design rationale, future roadmap and maintenance plan.
- Present a proposed flow for staff to link to the hub from the LEAD page.
- **Done:** Another teammate can run/build/deploy the site by following README steps.

### If time becomes constrained
Preserve **Home → Events → Opportunities → Newsletter** and navigation first. The interactive Community directory can be reduced to a limited visual concept if necessary. Do not sacrifice demo disclaimers, functionality, responsiveness, or accurate labeling.

## 11. Quality assurance and acceptance checklist

### Functional
- [ ] Every nav link and CTA works.
- [ ] Home cards use the same fixtures as detail pages.
- [ ] Multiple filters combine correctly; clear-all and empty states work.
- [ ] Event details show mode, date, time zone, description, and demo-only RSVP.
- [ ] Opportunity save toggles and category filters work.
- [ ] Community filters and introduction demo work with fictional profiles only.
- [ ] Newsletter interests update the preview; submit does not contact any service.
- [ ] No action misleadingly claims a real email, RSVP, application, or connection request was made.

### Accessibility and design
- [ ] Semantic headings and form labels; keyboard navigation and visible focus.
- [ ] Dialogs have correct focus management and Escape-to-close behavior.
- [ ] Text contrast generally meets WCAG 2.2 AA; no information conveyed only by color.
- [ ] All images have suitable alternative text; no unlicensed personal photos.
- [ ] Layout works at 320, 375, 768, and 1280px and with 200% zoom.
- [ ] No horizontal scrolling, obstructive animations, or tiny tap targets.

### Release
- [ ] TypeScript compilation, tests, and `npm run build` pass.
- [ ] GitHub Pages deployment succeeds from `main`.
- [ ] Internal route refresh works at `#/events`, `#/community`, etc.
- [ ] The `base` setting matches the repository path; static assets load.
- [ ] All records are labeled fictional and personal data is absent from repository/build artifacts.
- [ ] README explains demo status, build/deployment, limitations, and potential integration.

## 12. Presentation walkthrough (3–5 minutes)

1. **Problem (20–30 sec):** LEAD creates community during its internship, but alumni need flexible and ongoing reasons to stay involved.
2. **Home (30 sec):** Introduce an easy-to-find alumni destination integrated conceptually with the official LEAD experience.
3. **Events (45 sec):** Filter to a virtual career workshop that an out-of-state alum can attend; preview details and click Demo RSVP.
4. **Opportunities (40 sec):** Show a career or mentoring opportunity based on interests and save it.
5. **Community (45 sec):** Find a fictional alum in a relevant profession and click Request Introduction — Demo; explain why real directory access would be opt-in and verified.
6. **Newsletter (40 sec):** Select topics and demonstrate a tailored monthly digest; note how CAFE could manage periodic updates.
7. **Feasibility / impact (30 sec):** Explain lightweight content management, possible official-site link, and measures of engagement.

### Suggested success measures if CAFE later pilots the concept
- Share of reachable alumni viewing opportunities/newsletters.
- Event interest and registration by topic, format, cohort and geography.
- Participation in mentoring, speaking, and volunteering.
- Repeat engagement over a 3–6 month period.
- Qualitative alumni feedback on usefulness and belonging.
- Staff hours required to update content.

These are **proposed** metrics, not validated targets. Note that attendance alone is not proof of meaningful alumni engagement.

## 13. Proposed official-site integration and handoff

**Demo phase:** Independent GitHub Pages site, clearly marked capstone concept. Show CAFE stakeholders a proposed **Alumni** or **For Alumni** link from https://www.thecafe.org/programs/lead; do not alter the real site.

**Possible pilot phase (with staff approval):** CAFE staff can add a navigation link to the external hub. Wix supports external menu links, but organizational review and implementation are required. Confirm actual site platform and access with staff.

**Production phase:** Decide whether to migrate the visual/content design into the official site's CMS or use a dedicated approved hosting platform/subdomain. Add responsible ownership, data privacy, authentication, consent and moderation before any private directory or real newsletter signup. Use an existing CAFE-approved email service instead of creating a new mail server. Establish a recurring staff content update process (e.g., monthly newsletter and quarterly programming highlights).

### Suggested maintenance responsibilities
- Program manager: approve opportunities, events and messaging.
- Designated content owner: update public listings and newsletter content.
- Alumni volunteer ambassadors: propose spotlights and engagement topics (staff-reviewed).
- Technical owner: maintain production platform, privacy, accessibility, analytics, and security if launched.

## 14. Risks and decisions that need stakeholder validation

| Risk | Safeguard |
|---|---|
| Alumni have limited time | Optional, virtual and asynchronous paths; avoid requiring weekly attendance |
| Staff resources are constrained | Reusable content cards, few pages, low-maintenance publishing |
| Directory reveals personal information | Fictional demo; production requires consent and verified access |
| Newsletter becomes unwanted spam | Topic preferences, clear cadence and unsubscribe in any real system |
| Visitors mistake mock events for real ones | Persistent demo banner and labels on every item/action |
| Unapproved brand use | Review assets/permissions before public launch and disclose affiliation status |
| Website doesn't create engagement by itself | Pair with real programming, partner involvement and ongoing feedback |

## 15. Final definition of done

The capstone prototype is ready when a reviewer can open a GitHub Pages link on desktop or mobile, understand what LEAD Alumni Hub is, navigate all five pages, complete a mock event RSVP, discover and save a sample opportunity, locate and request a fictional alumni introduction, customize a newsletter preview, and see throughout that nothing was actually sent or submitted. The README provides reproducible setup and deployment steps plus an honest roadmap for real CAFE integration.

## References and grounding
- The CAFE Group official site: https://www.thecafe.org/
- Official LEAD program page: https://www.thecafe.org/programs/lead
- Capstone notes and empathy interview notes supplied by the project team (October–November 2026)
- Vite GitHub Pages deployment: https://vite.dev/guide/static-deploy.html
- GitHub Pages publishing source guidance: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Wix external menu links: https://support.wix.com/en/article/adding-a-new-tab-to-your-site-menu

---

*This document specifies a fictional, publicly hosted capstone demonstration. It does not assert permission to use any restricted CAFE assets or collect or publish alumni information.*
