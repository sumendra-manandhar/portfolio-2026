# Sumendra Manandhar — Portfolio 2026

Personal portfolio built with **React 19**, **Vite**, **Tailwind CSS v4**, **Three.js** (via React Three Fiber), **Motion** and **Lenis**.

## Highlights
- Interactive Three.js hero: iridescent distorting blob, orbit rings and a particle field that react to the pointer and scroll
- Kinetic, mask-revealed typography (Inter Tight + Instrument Serif)
- Bento-grid about section with animated counters and pointer-tracking spotlights
- 3D-tilt project cards, expandable experience timeline
- ⌘K / Ctrl+K command menu, custom blend-mode cursor, magnetic CTA
- Live Kathmandu clock, film grain, smooth scrolling, `prefers-reduced-motion` support
- Fully responsive

## Edit content
All text, links, projects and experience live in [`src/data/content.js`](src/data/content.js).

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repo, set **Settings → Pages → Source** to **GitHub Actions** (one-time).
For a custom domain, add it under Settings → Pages and put a `CNAME` file in `public/`.
