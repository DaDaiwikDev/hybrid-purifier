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
import Blueprint from '../components/Blueprint' // Can swap for HardwareStack if preferred
import BentoGrid from '../components/BentoGrid'
import HardwareStack from '../components/hardware/HardwareStack' // Using the advanced stack

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC ATMOSPHERE (New Green Aura) */}
      <div className="fixed inset-0 z-[1] green-aura" />

      {/* 2. FIXED 3D BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Scene mode="presentation" />
      </div>

      {/* 3. GRAIN OVERLAY */}
      <div className="bg-grain z-[5]" />

      {/* 4. NAVBAR (Sticky Liquid Glass) */}
      <div className="relative z-50 pointer-events-none">
        <Navbar />
      </div>

      <main className="relative z-10">
        
        {/* SECTION 1: THE HOOK */}
        <Hero />
        
        {/* SECTION 2: LIVE DATA */}
        <StatTicker />
        
        {/* SECTION 3: THE CONTENT DECK */}
        <div className="relative bg-black/80 backdrop-blur-3xl border-t border-white/10 shadow-[0_-50px_100px_black] min-h-screen z-20">
          
          {/* A. The Narrative */}
          <StorySection />

          {/* B. System Architecture */}
          <LiquidGrid />

          {/* C. The Timeline */}
          <HowItWorks />

          {/* D. Deep Tech Bundle */}
          <Chemistry />
          
          {/* E. Interactive Hardware Stack (Exploded View) */}
          <HardwareStack />

          {/* F. Engineering Mastery */}
          <BentoGrid />
          
          {/* G. Final Call to Action */}
          <div className="py-32 text-center px-6 border-t border-white/5 relative overflow-hidden">
            {/* Ambient Glow behind CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <h3 className="text-3xl font-bold mb-6 text-white relative z-10">Ready to inspect?</h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto relative z-10">
              Enter the simulation lab to test the Series X against extreme pollution scenarios.
            </p>
            <a 
              href="/simulation" 
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10"
            >
              Enter Lab
            </a>
          </div>

          <div className="border-t border-white/5 bg-black">
            <Footer />
          </div>

        </div>
      </main>
    </div>
  )
}