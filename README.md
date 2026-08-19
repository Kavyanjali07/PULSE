# ORBIT — Information Intelligence Platform (3D Interactive UX)

> **UNDERSTAND WHAT CHANGES.**

ORBIT is an editorial, experimental, and 3D interactive product landing page for an information intelligence platform that monitors configured sources, detects meaningful changes, and maps how those changes connect.

---

## What ORBIT Does (Product Clarity)

> *"ORBIT monitors your chosen information sources, detects meaningful changes, and maps how those changes connect."*

---

## Key Features

- **Interactive 3D Information System (Three.js Engine)**:
  - Central abstract ORBIT core (icosahedron wireframe + inner matte core + pulse ring).
  - 6 Orbiting Source Nodes: `DOCUMENTATION`, `API`, `RELEASE NOTES`, `DATABASE`, `BLOG`, `PRODUCT`.
  - Mouse parallax depth & raycasting 3D hover/click interactions.
  - Spatial 2D projected cards displaying live snapshot diff notes (`"pricing field modified in section 4.2"`).
- **Persistent 5-State Scroll-Driven Story**:
  - `STATE 01: DISCOVER` (`SEE THE SYSTEM.`)
  - `STATE 02: DETECT` (`SOURCES CHANGE.`)
  - `STATE 03: CONNECT` (`CONTEXT CHANGES.`)
  - `STATE 04: TRACE` (`FOLLOW THE SIGNAL.`)
  - `STATE 05: UNDERSTAND` (`NOW YOU KNOW WHAT CHANGED.`)
- **Mandatory "WHAT IS ORBIT?" Section**:
  - 3 concepts (`01 / OBSERVE`, `02 / DETECT`, `03 / TRACE`) that interactively control the 3D scene camera and node highlights.
- **Resilient Ingestion Pipeline HUD**:
  - `SOURCE` → `FETCH` → `SNAPSHOT` → `COMPARE` → `CHANGE` → `RELATIONSHIP` → `ORBIT`
- **Demo Workspace Inspector Drawer Overlay**:
  - Allows visitors to simulate snapshot fetches and view differential details.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **3D Engine**: Three.js
- **Animation**: Framer Motion
- **Styling**: Vanilla CSS (Warm Paper Palette, Grid System)
- **Icons**: Lucide React
- **Linter**: Oxlint (`0 warnings, 0 errors`)

---

## Quick Start

```bash
# Run development server (port 5173)
npm run dev

# Production build
npm run build

# Run Oxlint
npx oxlint
```

---

## Architectural Rationale

See [`DECISIONS.md`](./DECISIONS.md) for complete details on the 3D canvas engine, camera transitions, visual art direction, and accessibility features.
