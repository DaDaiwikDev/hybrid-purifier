# Detailed Code Overview for **Hybrid Purifier**

---

## 1. High‑Level Architecture

The application is a **single‑page React app** built with **Vite** for fast development and bundling. It uses **Three.js** via `@react-three/fiber` to render an interactive 3‑D scene that visualises air‑quality data. State is shared globally with **Zustand**, routing is handled by **React Router**, and styling is powered by **Tailwind CSS**.

```
index.html → Vite entry point → main.jsx → App.jsx → Router (Home, Simulation, Technical)
```

The 3‑D canvas lives inside the `Simulation` page and is composed of many reusable components under `src/components/`.

---

## 2. Project Structure (re‑summarised)

```
hybrid-purifier/
├─ public/                # Static assets (favicon, etc.)
├─ src/                   # Application source code
│  ├─ main.jsx            # React root creation (StrictMode)
│  ├─ App.jsx             # Top‑level component with <Router>
│  ├─ index.css           # Global Tailwind imports + base styles
│  ├─ store.js            # Zustand store – holds AQI, time, etc.
│  ├─ pages/              # Route‑level pages (Home, Simulation, Technical)
│  ├─ components/         # UI and 3‑D components
│  │   ├─ Scene.jsx        # <Canvas> wrapper, lighting, background logic
│  │   ├─ SceneContent.jsx # Core 3‑D objects (globe, particles, etc.)
│  │   ├─ Navbar.jsx       # Navigation bar with <Link>s
│  │   ├─ Footer.jsx       # Footer UI
│  │   ├─ LoadingScreen.jsx# Splash screen while assets load
│  │   ├─ Overlay.jsx      # UI overlay for controls / info
│  │   ├─ ... (visual components)
│  └─ hooks/               # Custom React hooks (Lenis smooth scroll)
├─ package.json           # Dependencies, scripts, metadata
├─ vite.config.js         # Vite configuration (React plugin, alias)
├─ tailwind.config.js     # Tailwind customisation (purge, theme)
├─ postcss.config.js      # PostCSS pipeline (Tailwind)
└─ README.md              # Short project description (expanded in PROJECT_DOCUMENTATION.md)
```

---

## 3. Core Files Explained

### `src/main.jsx`
*Bootstraps the React app.*
```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```
- Imports global CSS (Tailwind) and the root component `App`.
- Uses `createRoot` (React 18) for concurrent rendering.

### `src/App.jsx`
*Defines the routing layout.*
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Technical from './pages/Technical';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/specs" element={<Technical />} />
      </Routes>
    </Router>
  );
}
```
- Wraps the app in a `Router`.
- Maps three routes to their page components.

### `src/store.js`
*Global state via Zustand.*
```js
import { create } from 'zustand';

export const useStore = create(set => ({
  aqi: 0,
  time: 12,
  setAqi: aqi => set({ aqi }),
  setTime: time => set({ time })
}));
```
- Stores **AQI** (air‑quality index) and **time of day**.
- Provides setters used by UI controls and the 3‑D scene to drive visual changes.

### `src/pages/Simulation.jsx`
*Hosts the 3‑D visualisation.*
```jsx
import Scene from '../components/Scene';

export default function Simulation() {
  return (
    <div className="h-screen w-full">
      <Scene />
    </div>
  );
}
```
- Simply renders the `Scene` component full‑screen.
- The heavy lifting is inside `Scene.jsx` and `SceneContent.jsx`.

### `src/components/Scene.jsx`
*Canvas wrapper and environment logic.*
Key points:
- Uses `@react-three/fiber`'s `<Canvas>` with shadows and a custom camera.
- Computes **background colour** based on `aqi` and `time` from the store (darker at night, more polluted colours when AQI is high).
- Adds several lights (`hemisphereLight`, `directionalLight`, `spotLight`, `pointLight`) whose intensity changes with `dayIntensity` and `pollutionFactor`.
- Inserts an `<Environment preset="city"/>` for realistic lighting.
- Renders `<SceneContent mode={mode} />` – the actual 3‑D objects.

### `src/components/SceneContent.jsx`
*Contains the visual objects.*
- Imports 3‑D models (globe, particles, etc.) and positions them.
- Reacts to the `mode` prop (e.g., "presentation" vs. interactive) to toggle animations.
- Uses the Zustand store to read `aqi`/`time` and adjust material properties, particle density, etc.
- Keeps the heavy Three.js logic isolated from the canvas wrapper, making it easy to test or replace.

### UI Components (`Navbar.jsx`, `Footer.jsx`, `BentoGrid.jsx`, …)
- Built with **Tailwind CSS** utility classes for layout and styling.
- `Navbar` provides navigation links that use `<Link>` from React Router.
- `BentoGrid` arranges feature cards on the Home page.
- `LoadingScreen` shows a full‑screen spinner while the 3‑D assets load.
- `Overlay` displays UI controls (e.g., sliders to change AQI or time) that call `useStore().setAqi` / `setTime`.

### `src/hooks/useLenis.js`
- Wraps the **Lenis** smooth‑scroll library into a React hook.
- Returns a ref that can be attached to a scroll container to enable buttery scrolling.

---

## 4. How Everything Comes Together
1. **Startup** – `npm run dev` launches Vite, which serves `index.html`. Vite injects the compiled `main.jsx` bundle.
2. **React renders** – `main.jsx` mounts `<App>` into `#root`.
3. **Routing** – `<App>` decides which page component to show based on the URL.
4. **State** – The Zustand store is instantiated once and is imported wherever needed.
5. **Simulation page** – When the user navigates to `/simulation`, the `Simulation` page renders `<Scene>`.
6. **Canvas** – `<Scene>` creates a Three.js canvas, sets up lighting, background colour, and passes the global `aqi`/`time` values to `<SceneContent>`.
7. **3‑D objects** – `<SceneContent>` builds the visual representation (globe, particles, etc.) and updates them in response to store changes.
8. **User interaction** – UI controls (e.g., sliders in `Overlay`) dispatch `setAqi` / `setTime`, causing the store to update. The canvas re‑renders with new colours/intensities, giving immediate visual feedback.
9. **Build** – `npm run build` bundles everything (JS, CSS, assets) into the `dist/` folder, ready for static hosting.

---

## 5. Extending the Application
- **Add a new page**: create `src/pages/NewPage.jsx`, import it in `App.jsx` with a `<Route>`.
- **New 3‑D element**: add a component under `src/components/` that uses `@react-three/fiber` primitives, then include it in `SceneContent.jsx`.
- **Global state**: extend `store.js` with additional fields (e.g., `weather`) and expose setters.
- **Styling**: modify Tailwind config (`tailwind.config.js`) or add custom CSS in `src/index.css`.
- **Testing**: run `npm run lint` for static analysis; add unit tests with your preferred framework (e.g., Vitest) if needed.

---

*Generated on 2025‑11‑24 by Antigravity AI assistant.*
