import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import StorySection from './components/StorySection'
import BentoGrid from './components/BentoGrid'
import Specs from './components/Specs'
import Footer from './components/Footer'

export default function App() {
  return (
    <ReactLenis root>
      <div className="relative w-full min-h-screen bg-black text-white selection:bg-blue-500/30">
        
        {/* LAYER 1: FIXED 3D BACKGROUND (Z-0) */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <Scene />
        </div>

        {/* LAYER 2: SCROLLABLE WEBSITE CONTENT (Z-10) */}
        {/* This contains the spacer + the actual website parts */}
        <div className="relative z-10">
          
          {/* SPACER: Keeps the top clear for the simulation */}
          {/* pointer-events-none ensures you can click the 3D model/Overlay through it */}
          <section className="h-screen w-full pointer-events-none" /> 

          {/* THE CONTENT DECK */}
          <div className="relative bg-black/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-50px_150px_rgba(0,0,0,1)] pointer-events-auto">
            <StorySection />
            <BentoGrid />
            <Specs />
            <Footer />
          </div>
        </div>

        {/* LAYER 3: FIXED HUD / OVERLAY (Z-40) */}
        {/* Moved BELOW the content div in code, but higher Z-index */}
        {/* pointer-events-none on wrapper, auto on children (handled in component) */}
        <div className="fixed top-0 left-0 w-full h-screen z-40 pointer-events-none">
           <Overlay />
        </div>

        {/* LAYER 4: NAVIGATION (Z-50) */}
        <Navbar />

      </div>
    </ReactLenis>
  )
}