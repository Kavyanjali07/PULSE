# ORBIT — Information Intelligence Platform

> **EVERYTHING IS CONNECTED.**

ORBIT is an editorial, experimental, and technical interactive landing page built for an information intelligence platform that helps users understand how information changes and how different sources are connected.

---

## Key Features

- **Continuous 5-Scene Storytelling**:
  `TYPOGRAPHY` → `LINES` → `NETWORK` → `SIGNAL` → `PATH` → `SOURCE` → `DESTINATION`
- **Restrained Editorial Aesthetic**: Warm paper canvas (`#F5F4F0`), near-black typography (`#0D0D0E`), and Signal Orange (`#FF4500`) reserved exclusively for active connections and state diffs.
- **Scene 04 Interactive Product Moment**: Interactive SVG graph featuring 6 monitored demo sources (`DOCUMENTATION`, `API`, `RELEASE NOTES`, `DATABASE`, `BLOG`, `PRODUCT`). Hovering or tapping nodes dim non-connected paths, illuminates vector relationships, and displays an integrated info panel.
- **Snapshot Architecture HUD**: 8-step ingestion pipeline (`SOURCE` → `FETCH` → `SNAPSHOT` → `STORE` → `COMPARE` → `CHANGE DETECTION` → `RELATIONSHIP GRAPH` → `VISUALIZATION`).
- **Demo Workspace Inspector Drawer**: Interactive overlay allowing users to trigger snapshot fetches and inspect source differentials.
- **Responsive (390px & 1440px)**: Desktop spatial graph transforms into a vertical trajectory spine for mobile viewports with 0 horizontal scrolling.
- **Accessibility & Motion**: Full `@media (prefers-reduced-motion: reduce)` support and keyboard accessibility (`tabIndex={0}`).

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS (CSS Variables, Grid, Editorial Paper Design System)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Linter**: Oxlint (`0 warnings, 0 errors`)

---

## Local Development & Build

```bash
# Run local development server (port 5173)
npm run dev

# Build production bundle
npm run build

# Run Oxlint
npx oxlint
```

---

## Architecture Decisions

See [`DECISIONS.md`](./DECISIONS.md) for full architectural rationale, typography hierarchy, color palette constraints, and responsive storytelling mechanics.
