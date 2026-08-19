# DECISIONS.md — ORBIT Information Intelligence Platform (3D UX & Product Clarity Upgrade)

## Architectural & Design Decisions

### 1. UX Priority: Immediate Product Clarity First

A major focus of this upgrade is **unambiguous product clarity**. Within the first section (less than 3 seconds), any visitor immediately understands what ORBIT does:

> **"ORBIT monitors your chosen information sources, detects meaningful changes, and maps how those changes connect."**

- **Hero Eyebrow**: `ORBIT / INFORMATION INTELLIGENCE`
- **Main Headline**: `UNDERSTAND WHAT CHANGES.`
- **Primary Action**: `EXPLORE THE SYSTEM →`
- **Secondary Action**: `SEE HOW IT WORKS`

---

### 2. Interactive 3D World (Three.js Engine)

The centerpiece of the landing experience is a **custom Three.js interactive 3D information network**:

- **Central Abstract ORBIT Core**: An inner matte charcoal sphere (`#111113`) enclosed within an outer rotating icosahedron wireframe (`#55555A`) and a pulsing Signal Orange (`#FF4500`) core ring.
- **6 Orbiting 3D Source Nodes**: `DOCUMENTATION`, `API`, `RELEASE NOTES`, `DATABASE`, `BLOG`, `PRODUCT`.
- **Restrained Material System**: Matte black/charcoal, warm paper white, subtle metallic surfaces, and Signal Orange `#FF4500` used strictly for active connection emphasis.
- **Mouse Parallax**: Smooth lerp cursor tracking for depth without nausea.

---

### 3. Scroll-Driven 3D Story Sequence (5 States)

As the user scrolls down through the persistent 3D canvas viewport, the camera position, node highlights, and trajectory vectors seamlessly blend across 5 states:

1. **STATE 01 — DISCOVER**: Overview perspective with 6 nodes orbiting the central core (`SEE THE SYSTEM.`).
2. **STATE 02 — DETECT**: Camera zooms toward `API` node as diff disruption triggers Signal Orange pulse (`SOURCES CHANGE.`).
3. **STATE 03 — CONNECT**: View rotates to display change propagation into connected documentation & product nodes (`CONTEXT CHANGES.`).
4. **STATE 04 — TRACE**: Camera aligns along the active vector path `API → DOCUMENTATION → PRODUCT` (`FOLLOW THE SIGNAL.`).
5. **STATE 05 — UNDERSTAND**: Camera pulls back into a serene overview as the network stabilizes (`NOW YOU KNOW WHAT CHANGED.`).

---

### 4. Mandatory "WHAT IS ORBIT?" Section

Directly following the hero overview, three interactive concept cards connect directly with the 3D world:
- `01 / OBSERVE`: Highlights all source nodes in the 3D scene.
- `02 / DETECT`: Reorients 3D camera to highlight changed nodes.
- `03 / TRACE`: Highlights downstream vector path connections.

---

### 5. Node Hover & Click Microinteraction Mechanics

- **Hover & Raycasting**: Raycaster detects 3D sphere hover, expanding node scale (`1.4x`), highlighting line vectors in `#FF4500`, and projecting a 2D spatial information card with snapshot diff notes (`"pricing field modified in section 4.2"`).
- **Click Selection**: Clicking a 3D node reorients camera focus toward that node and provides a `TRACE CHANGE →` button to launch the Demo Workspace Data Inspector.

---

### 6. Performance, Fallback, and Responsive Design

- **Mobile Viewports (390px)**: Camera distance is adjusted, particle density is reduced to 120 floating particles, and projected cards switch to anchored touch overlays with **0 horizontal scroll**.
- **Honesty**: All data is explicitly tagged as `DEMO EXPERIENCE`, `DEMO SOURCE`, or `SAMPLE SNAPSHOT` with 0 fake testimonials or fake user counts.
- **Accessibility & Motion**: Full respect for `@media (prefers-reduced-motion: reduce)`.
