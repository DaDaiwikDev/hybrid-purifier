import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import StorySection from './components/StorySection'
import BentoGrid from './components/BentoGrid'
import Specs from './components/Specs'
import Footer from './components/Footer'
import Logo from './components/Logo'

export default function App() {
  return (
    <ReactLenis root>
      <div className="relative w-full min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
        
        {/* WATERMARK */}
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none opacity-20 mix-blend-screen flex items-center gap-2">
          <Logo className="w-6 h-6 grayscale" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Class X Demo</span>
        </div>

        {/* --- LAYER 1: FIXED 3D BACKGROUND (Z-0) --- */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <Scene />
        </div>

        {/* --- LAYER 2: FIXED HUD (Z-40) --- */}
        <div className="fixed top-0 left-0 w-full h-screen z-40 pointer-events-none">
           <Overlay />
        </div>

        {/* --- LAYER 3: NAVIGATION (Z-50) --- */}
        <Navbar />

        {/* --- LAYER 4: SCROLLABLE CONTENT (Z-20) --- */}
        {/* FIX: Added pointer-events-none here so the wrapper doesn't block the 3D model */}
        <div className="relative z-20 pointer-events-none">
          
          {/* 1. SIMULATION SPACER */}
          <section className="h-screen w-full" /> 

          {/* 2. WEBSITE CONTENT */}
          {/* FIX: Re-enabled pointer-events-auto here so you can select text/click links */}
          <div className="relative bg-black/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-50px_150px_rgba(0,0,0,1)] pointer-events-auto">
            
            <StorySection />
            
            <BentoGrid />
            
            <Specs />
            
            <Footer />
            
          </div>
        </div>

      </div>
    </ReactLenis>
  )
}