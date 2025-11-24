# Project Documentation for **Hybrid Purifier**

---

## Overview

`hybrid-purifier` is a modern web application built with **React**, **Vite**, and **Three.js** (via `@react-three/fiber`). It visualizes air‑quality data in a 3‑D scene, offering interactive components such as a rotating globe, animated particles, and a responsive UI. The project showcases a clean Vite + Tailwind CSS setup, state management with **Zustand**, and routing via **React Router**.

---

## Prerequisites

- **Node.js** (>= 18) and **npm** (or **pnpm** / **yarn**) installed.
- A modern browser for development (Chrome, Edge, Firefox, etc.).

---

## Installation

```bash
# Clone the repository (if you haven't already)
git clone <repo‑url>
cd hybrid-purifier

# Install dependencies
npm install
```

---

## Running the Development Server

```bash
npm run dev
```

The app will be served at `http://localhost:5173` (default Vite port). The development server supports hot‑module replacement, so changes to source files are reflected instantly.

---

## Building for Production

```bash
npm run build
```

The optimized static assets are emitted to the `dist/` directory. You can preview the production build locally with:

```bash
npm run preview
```

---

## Project Structure

```
hybrid-purifier/
├─ .git/                     # Git repository metadata
├─ .gitignore                # Ignored files
├─ README.md                 # High‑level project description (this file expands on it)
├─ index.html                # Entry HTML file used by Vite
├─ package.json              # Project metadata, scripts, dependencies
├─ vite.config.js            # Vite configuration (plugins, alias, etc.)
├─ tailwind.config.js        # Tailwind CSS configuration
├─ postcss.config.js         # PostCSS configuration for Tailwind
├─ src/                      # Application source code
│  ├─ main.jsx               # React entry point – creates root
│  ├─ App.jsx                # Top‑level component with routing
│  ├─ index.css              # Global CSS (includes Tailwind directives)
│  ├─ App.css                # Component‑specific styles (if any)
│  ├─ store.js               # Zustand store – holds AQI, time, etc.
│  ├─ pages/                 # Route‑level pages
│  │   ├─ Home.jsx           # Landing page
│  │   ├─ Simulation.jsx     # Main simulation view
│  │   └─ Technical.jsx      # Technical details / specs page
│  ├─ components/            # Re‑usable UI and 3‑D components
│  │   ├─ Scene.jsx           # Wrapper for the Three.js canvas
│  │   ├─ SceneContent.jsx    # Core 3‑D objects (globe, particles, etc.)
│  │   ├─ Navbar.jsx          # Top navigation bar
│  │   ├─ Footer.jsx          # Footer component
│  │   ├─ LoadingScreen.jsx   # Splash screen while assets load
│  │   ├─ Overlay.jsx         # UI overlay for controls
│  │   ├─ BentoGrid.jsx       # Grid layout used on the Home page
│  │   ├─ ChemicalReaction.jsx# Visual reaction animation
│  │   ├─ HowItWorks.jsx      # Explanation section component
│  │   ├─ RollingNumber.jsx   # Animated number display
│  │   ├─ Specs.jsx           # Specification table component
│  │   ├─ StorySection.jsx    # Storytelling section component
│  │   ├─ TerminalBlock.jsx   # Terminal‑style code block UI
│  │   ├─ TextReveal.jsx      # Text reveal animation component
│  │   └─ ... (other UI pieces)
│  └─ hooks/                 # Custom React hooks (currently only one)
│      └─ useLenis.js        # Hook for smooth scrolling (Lenis)
└─ public/                   # Static assets (favicon, etc.)
```

---

## Key Configuration Files

- **package.json** – Lists dependencies such as `react`, `three`, `@react-three/fiber`, `zustand`, `tailwindcss`, and scripts (`dev`, `build`, `preview`, `lint`).
- **vite.config.js** – Configures Vite, including the React plugin and any aliasing.
- **tailwind.config.js** – Tailwind CSS customization (purge paths, theme extensions).
- **postcss.config.js** – Enables Tailwind as a PostCSS plugin.

---

## Notable Components & Their Roles

| Component | File | Purpose |
|-----------|------|---------|
| **Scene** | `src/components/Scene.jsx` | Sets up the Three.js `<Canvas>` with lighting, background color based on AQI and time, and renders `SceneContent`.
| **SceneContent** | `src/components/SceneContent.jsx` | Contains the actual 3‑D objects (globe, particles, etc.) and reacts to the `mode` prop (presentation vs. interactive).
| **Navbar** | `src/components/Navbar.jsx` | Top navigation bar with links to Home, Simulation, and Technical pages.
| **Footer** | `src/components/Footer.jsx` | Footer with attribution and external links.
| **BentoGrid** | `src/components/BentoGrid.jsx` | Responsive grid layout used on the Home page to showcase features.
| **Technical** | `src/pages/Technical.jsx` | Displays detailed specifications and charts about the air‑purifier simulation.
| **Home** | `src/pages/Home.jsx` | Landing page that introduces the project and provides quick navigation.
| **Simulation** | `src/pages/Simulation.jsx` | Main interactive simulation view, embedding the 3‑D scene.
| **store.js** | `src/store.js` | Zustand store managing global state (`aqi`, `time`, etc.) used throughout the app.

---

## How to Extend / Develop

1. **Add New Routes** – Create a new component under `src/pages/` and add a `<Route>` entry in `src/App.jsx`.
2. **Create UI Components** – Place reusable UI pieces in `src/components/`. Follow the existing styling conventions (Tailwind classes, CSS modules).
3. **Update State** – Extend the Zustand store in `src/store.js` and consume it via `useStore()` in any component.
4. **Customize Theme** – Modify `tailwind.config.js` to add custom colors, fonts, or spacing.
5. **Build New 3‑D Elements** – Use `@react-three/fiber` and `@react-three/drei` inside `SceneContent.jsx` or new components.

---

## License & Credits

This project is a **template** based on Vite’s official React starter. It incorporates open‑source libraries such as:
- **React** – UI library
- **Three.js** – 3‑D rendering engine
- **@react-three/fiber** & **@react-three/drei** – React bindings for Three.js
- **Zustand** – State management
- **Tailwind CSS** – Utility‑first CSS framework
- **Lenis** – Smooth scrolling

Feel free to adapt, extend, and redistribute according to the licenses of the individual dependencies.

---

*Generated on 2025‑11‑24 by Antigravity AI assistant.*
