import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import Footer from '../components/Footer'

// --- NEW KINETIC COMPONENTS ---
import Hero from '../components/landing/Hero'
import StatTicker from '../components/landing/StatTicker'
import LiquidGrid from '../components/landing/LiquidGrid'

// --- RESTORED ENGINEERING COMPONENTS ---
import StorySection from '../components/StorySection'
import HowItWorks from '../components/HowItWorks'
import Chemistry from '../components/Chemistry'
import HardwareStack from '../components/hardware/HardwareStack'
import BentoGrid from '../components/BentoGrid'

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      
      {/* 1. FIXED 3D BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Scene mode="presentation" />
      </div>

      {/* 2. GRAIN OVERLAY */}
      <div className="bg-grain z-[5]" />

      {/* 3. NAVBAR (Sticky) */}
      <div className="relative z-50 pointer-events-none">
        <Navbar />
      </div>

      <main className="relative z-10">
        
        {/* SECTION 1: THE HOOK (New) */}
        <Hero />
        
        {/* SECTION 2: LIVE DATA (New) */}
        <StatTicker />
        
        {/* SECTION 3: THE CONTENT DECK */}
        <div className="relative bg-black/90 backdrop-blur-3xl border-t border-white/10 shadow-[0_-50px_100px_black] min-h-screen">
          
          {/* A. The Narrative (Restored) */}
          <StorySection />

          {/* B. System Architecture (New - High Level) */}
          <LiquidGrid />

          {/* C. The Timeline (Restored - How it works) */}
          <HowItWorks />

          {/* D. Deep Tech Bundle (Restored) */}
          <Chemistry />
          <HardwareStack />

          {/* E. Engineering Mastery (Restored - Cost & Solar) */}
          <BentoGrid />
          
          {/* F. Final Call to Action */}
          <div className="py-32 text-center px-6 border-t border-white/5">
            <h3 className="text-3xl font-bold mb-6 text-white">Ready to inspect?</h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Enter the simulation lab to test the Series X against extreme pollution scenarios.
            </p>
            <a 
              href="/simulation" 
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Enter Lab
            </a>
          </div>

          <div className="border-t border-white/5">
            <Footer />
          </div>

        </div>
      </main>
    </div>
  )
}