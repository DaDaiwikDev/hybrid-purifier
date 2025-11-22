import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import SceneContent from './components/SceneContent' // We will create this
import Overlay from './components/Overlay' // Your existing HUD
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen' // Optional loader

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Navbar />
      
      {/* THE 3D CANVAS (Fixed Background) */}
      <Canvas shadows camera={{ position: [0, 0, 7], fov: 35 }} gl={{ antialias: true }}>
        <color attach="background" args={['#050505']} />
        
        {/* SCROLL CONTROLS: This creates the "Pages" */}
        <ScrollControls pages={5} damping={0.2}>
          
          {/* LAYER 1: The 3D Model (Reacts to scroll) */}
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>

          {/* LAYER 2: The HTML Content (Scrolls over the model) */}
          <Scroll html style={{ width: '100%' }}>
            
            {/* PAGE 1: HERO (Empty because Overlay.jsx handles it) */}
            <section className="h-screen w-full pointer-events-none" />

            {/* PAGE 2: EXPLOSION TEXT */}
            <section className="h-screen w-full flex items-center justify-start px-24 pointer-events-none">
              <div className="max-w-lg">
                <h2 className="text-5xl font-bold text-white mb-4">Precision Engineering</h2>
                <p className="text-white/60 text-lg">
                  The chassis separates to reveal the industry's first Hybrid-PBR architecture.
                </p>
              </div>
            </section>

            {/* PAGE 3: HEPA DETAILS */}
            <section className="h-screen w-full flex items-center justify-end px-24 pointer-events-none">
              <div className="text-right max-w-lg">
                <h2 className="text-5xl font-bold text-blue-400 mb-4">Medical Grade HEPA</h2>
                <p className="text-white/60 text-lg">
                  H13 Filtration captures 99.97% of particulates down to 0.3 microns.
                </p>
              </div>
            </section>

            {/* PAGE 4: BIO-REACTOR DETAILS */}
            <section className="h-screen w-full flex items-center justify-start px-24 pointer-events-none">
              <div className="max-w-lg">
                <h2 className="text-5xl font-bold text-emerald-400 mb-4">Living Core</h2>
                <p className="text-white/60 text-lg">
                  120L Algae Tank fixes CO2 and generates fresh Oxygen in real-time.
                </p>
              </div>
            </section>

          </Scroll>
        </ScrollControls>
        
        {/* Your Fixed Overlay (Search bar etc) sits ON TOP of scroll controls */}
      </Canvas>
      
      {/* We keep Overlay outside Canvas so buttons work on Page 0 */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Overlay />
      </div>
    </div>
  )
}