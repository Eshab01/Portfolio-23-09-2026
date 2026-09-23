# Eshab Sachan — Portfolio (Multi-Page Edition)

An eight-page animated portfolio. Dark, twilight-and-embers visual language —
carved-stone / military-dossier typography meets a comet-lit dusk sky. Built
with plain HTML/CSS/JS, [anime.js](https://animejs.com/) for UI motion, and
[three.js](https://threejs.org/) for the WebGL colossal-silhouette scene in
the homepage hero. No build step, no framework, no npm install required.

> The "titan" figure and the wall-crack/boulder sequence are **original,
> procedurally-built art** — low-poly geometry and hand-written SVG/CSS —
> inspired by the requested aesthetic, not a reproduction of any studio's
> character designs or logos.

## Run it

Open `index.html` in a browser, or serve it locally for the smoothest
experience:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

or `npx serve .`. Deploys like any static site — drag the folder into
Vercel/Netlify, or `vercel deploy` from inside it.

## The eight pages

Each page has its own signature moment, not just a shared template:

| Page | File | Signature visual |
|---|---|---|
| Home | `index.html` | Intro loader → hero with the 3D colossal silhouette + a table-of-contents to everything else |
| The Record | `about.html` | Interactive constellation linking the facts of the bio |
| The Arsenal | `skills.html` | Click-through radial skill tree |
| Campaign Log | `experience.html` | Animated Mohali → Gurgaon → Mohali route map with a travelling marker |
| Field Reports | `projects.html` | The wall-break/boulder sequence plays as the page's entrance; 17 filterable project cards, each opening a detail modal |
| The Venture | `venture.html` | Animated "customer → match engine → worker" flow diagram for Workilee |
| Commendations | `achievements.html` | Trophy cards that spark/burst into embers as they scroll into view |
| Open A Channel | `contact.html` | Pinging "transmission" rings behind the contact channels |

Every page also gets: the custom ember cursor, the iris-wipe page-transition
(click any internal link and watch it), scroll reveals, and a full nav/footer
injected from one shared source.

## File map

```
index.html, about.html, skills.html, experience.html,
projects.html, venture.html, achievements.html, contact.html

css/style.css              — every design token + component, shared by all 8 pages

js/partials.js              — injects the icon sprite, nav, and footer into every
                               page (single source of truth — edit nav links here,
                               not in each HTML file)
js/core.js                  — shared across all pages: custom cursor, page-transition
                               wipe, reveal-on-scroll, counters, typewriter, and the
                               reusable radial-node-graph builder (constellation +
                               skill tree both use it)
js/particles.js              — the ember/dust canvas system, reused on every page
js/titan-scene.js            — the three.js hero figure (home page only)
js/projects-data.js          — all 17 projects as plain data — edit this file to
                               add/remove/rewrite a project, it feeds both the
                               homepage's featured strip and the full projects grid
js/page-home.js, page-about.js, page-skills.js, page-experience.js,
js/page-projects.js, page-venture.js, page-achievements.js, page-contact.js
                              — one file per page, handling only that page's
                               specific interactions/animations

assets/libs/                 — anime.js v3 + three.js, vendored locally so the
                               site works fully offline
assets/resume/
  Eshab_Sachan_Resume.pdf    — served by every "Download Résumé" button
  Eshab_Sachan_Resume.docx   — editable source — fix the placeholders below, then
                               re-export to PDF and drop it back in here
```

## Before this goes live — placeholders to fill in

Find-and-replace these across the HTML files and the résumé (edit the
`.docx`, then re-export to PDF):

- `[Your Email Address]` / `[Your Phone Number]` / `[Your LinkedIn URL]`
  (appear on `contact.html`, in the footer, and in the résumé)
- `[Your Role Title]` — actual job title at Teleperformance (shows up in the
  Experience timeline and the résumé)
- `[Start Date]` and `[2023 – 2026]` — WNS start date and BCA
  enrollment/graduation years, résumé only (`2023–2026` was inferred from the
  college ID prefix — confirm before sending it anywhere)

Everything else — the 17 projects, skills, the WNS → Teleperformance handoff,
Vidyarthi Art Press — is pulled from your history.

## Customizing

- **Colors / fonts / spacing**: the `:root` block at the top of `css/style.css`.
- **Nav links or footer**: edit `js/partials.js` — every page pulls from it,
  so a change there applies everywhere at once.
- **Projects**: edit `js/projects-data.js`. Each entry is `{ num, cat, title,
  desc, detail, stack, live }` — `detail` is the longer copy shown in the
  modal. `cat` must match one of the filter buttons on `projects.html`.
- **The wall-break moment**: plays once per browser session (see
  `setupBreach()` in `page-projects.js`) so it stays a moment, not a loop.
  Clear `sessionStorage` or remove the `already` check to replay it anytime.
- **The intro loader**: same one-per-session treatment, in `page-home.js`.
- **Reduced motion**: every animation system checks `prefers-reduced-motion`
  and swaps to a static, fully-readable state instead — the cursor, transitions,
  hero, particles, 3D scene, breach, counters, and all six page-specific
  visuals. Don't strip these checks without adding a replacement.
