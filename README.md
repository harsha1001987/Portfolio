# M Harshavardhana Raju — Portfolio

Single-page portfolio: **bold editorial studio** layout on a **brutal & sharp** palette. Inter at extreme weight and size contrast, The Void as the foundation with Raw Bone inversions, Toxic Acid for every active state, a difference-blend cursor, and grayscale-to-color image discipline.

**Web applications & automation.** Chennai, India.

---

## Design System

Brutal & Sharp. No color exists outside these six tokens.

| Token | Value | Role |
| --- | --- | --- |
| `--bg-dark` | `#050505` | The Void — primary background (`bg-void`) |
| `--bg-light` | `#EFEFEA` | Raw Bone — inverted sections (`bg-bone`) |
| `--border-hard` | `#808080` | System Gray — every 1–2px rule (`border-hard` / `text-hard`) |
| `--accent-toxic` | `#CCFF00` | Toxic Acid — links, active states, focus, hover (`text-toxic`) |
| `--accent-alert` | `#FF0033` | Warning Red — sharp highlights, errors (`text-alert`) |
| `--text-pure` | `#FFFFFF` | Pure light on dark (`text-pure`) |

On Raw Bone sections `accent-toxic` is illegible as text, so it appears there only as a fill block behind dark type (and as the 20% decorative square). `accent-alert` on The Void clears AA at 14px.

**Typography — Inter only.**

- Headlines (`.headline`): `700`, `letter-spacing: -0.05em`, `line-height: 0.9`
- Body: `400`, `letter-spacing: -0.02em`, `line-height: 1.5`
- Metadata (`.mono-meta`): monospace, `14px`, uppercase, `letter-spacing: 0.1em`

**Interactions**

- Custom cursor — 32px circle, 1px System Gray border, Toxic Acid fill, `mix-blend-mode: difference`, rAF lerp at 0.15, 2.5x scale on hover
- Image hover — `grayscale(100%)` → `grayscale(0%)` over 700ms with a scale transform (1.05x, 1.1x in the works grid)
- Reveal — spans sliding from `translateY(100%)` to `0`, `cubic-bezier(0.16, 1, 0.3, 1)` over 1s
- Marquee — 30s linear infinite, pauses on container hover

Tokens, type treatments and keyframes live in [globals.css](src/app/globals.css) as CSS variables plus a Tailwind v4 `@theme` block — this project is Tailwind v4 (CSS-first config, no `tailwind.config.ts`).

---

## Page order

The Void and Raw Bone sections alternate to drive the contrast rhythm.

| Section | Background | File |
| --- | --- | --- |
| Navigation (mix-blend) | — | [Nav.js](src/components/Nav.js) |
| Hero | void | [Hero.js](src/components/Hero.js) |
| Discipline ticker | void | [Marquee.js](src/components/Marquee.js) |
| Featured spotlight | **bone** | [Featured.js](src/components/Featured.js) |
| Selected Works | void | [Works.js](src/components/Works.js) |
| Capabilities + stack | void | [Capabilities.js](src/components/Capabilities.js) |
| Statement carousel | **bone** | [Statements.js](src/components/Statements.js) |
| Inquiry form | void | [Inquiry.js](src/components/Inquiry.js) |
| Footer | void | [Footer.js](src/components/Footer.js) |

**Each project appears exactly once.** The featured project is filtered out of the Selected Works grid (one line in [Works.js](src/components/Works.js)), and the marquee carries disciplines rather than repeating project cards.

Shared pieces: [Cursor.js](src/components/system/Cursor.js) · [Reveal.js](src/components/system/Reveal.js) (scroll reveal + `RevealWords`) · [ProjectMedia.js](src/components/system/ProjectMedia.js) · [projects.js](src/data/projects.js) (single source of truth for project data).

---

## Project imagery

No screenshots ship with the repo yet, so [ProjectMedia.js](src/components/system/ProjectMedia.js) renders a typographic tile carrying the same hover discipline. To switch a project to real photography:

1. Drop the file at `public/projects/<slug>.jpg`
2. Set `image: "/projects/<slug>.jpg"` on that project in [projects.js](src/data/projects.js)

The grayscale → color hover then applies to the photograph's own color — images are never tinted.

## Work

| Project | Stack | Live | Code |
| --- | --- | --- | --- |
| ExtriveInnovations | Next.js / React Three Fiber / Nodemailer | [live](https://ExtriveInnovations.com) | [code](https://github.com/harsha1001987/extriveinnovations) |
| LockIn | Next.js / Supabase / Tailwind | [live](https://lock-in-one-mocha.vercel.app/) | [code](https://github.com/harsha1001987/LockIn) |
| PaleoPath | React / Vite / Framer Motion | [live](https://paleo-path.vercel.app/) | [code](https://github.com/harsha1001987/PaleoPath) |

## Stack

| | |
| --- | --- |
| Languages | C++ *(advanced)*, Python *(intermediate)*, Java *(intermediate)*, JavaScript *(basic)* |
| Frontend | React.js, Next.js, HTML5, CSS3, Tailwind CSS |
| Backend | Node.js, Express.js |
| Databases | MongoDB, SQL, Supabase |
| Tools & DevOps | Git/GitHub, REST APIs, JWT Auth, CI/CD Pipelines, Netlify, Render, Vercel, Cloudflare, Hostinger |

**Education** — B.Tech Computer Science (Kalvium), Kalasalingam University

---

## Accessibility

`prefers-reduced-motion` disables the custom cursor entirely (native cursor restored), freezes the marquee and arrow bounce, pauses the statement carousel, and collapses reveals. The cursor is also feature-detected off on touch devices via `(pointer: fine)`.

---

## Tech Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · lucide-react · Nodemailer

---

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in SMTP credentials
npm run dev
```

The inquiry form posts `{ name, email, serviceType, message }` to [/api/inquiry](src/app/api/inquiry/route.js), which re-validates server-side and sends over SMTP via Nodemailer. Without SMTP env vars the route returns `500 MAIL_NOT_CONFIGURED` and the form shows its direct-email fallback block.

```bash
npm run build
npm run lint
```

---

## Contact

- **Email** — matlaharshavardhanaraju@gmail.com
- **LinkedIn** — [/in/matla-harshavardhanaraju](https://www.linkedin.com/in/matla-harshavardhanaraju-331037371/)
- **GitHub** — [/harsha1001987](https://github.com/harsha1001987)

© 2026 M HARSHAVARDHANA RAJU — BUILT WITH NEXT.JS
