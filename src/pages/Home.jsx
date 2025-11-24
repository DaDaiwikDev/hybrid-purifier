import SmoothScroll from '../components/SmoothScroll' // The new smooth scroll
import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import Footer from '../components/Footer'

// KINETIC COMPONENTS
import Hero from '../components/landing/Hero'
import StatTicker from '../components/landing/StatTicker'
import LiquidGrid from '../components/landing/LiquidGrid'

// ENGINEERING COMPONENTS
import StorySection from '../components/StorySection'
import HowItWorks from '../components/HowItWorks'
import Chemistry from '../components/Chemistry'
import HardwareStack from '../components/hardware/HardwareStack'
import BentoGrid from '../components/BentoGrid'

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans">
        
        {/* 1. ATMOSPHERE */}
        <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.06),transparent_70%)]" />
        <div className="bg-grain z-[2]" />

        {/* 2. 3D BACKGROUND (Fixed) */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <Scene mode="presentation" />
        </div>

        {/* 3. NAVBAR (Sticky & Top) */}
        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10">
          
          {/* HERO (Transparent BG to see 3D model) */}
          <Hero />
          
          {/* TICKER (Divider) */}
          <StatTicker />
          
          {/* CONTENT DECK (Solid Black BG covers the 3D model as you scroll) */}
          <div className="relative bg-[#050505] border-t border-white/10 shadow-[0_-50px_100px_black] z-20">
            
            <StorySection />
            <LiquidGrid />
            <HowItWorks />
            <HardwareStack />
            <Chemistry />
            <BentoGrid />
            
            {/* FOOTER AREA */}
            <div className="py-32 text-center px-6 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
               <h3 className="text-4xl font-bold mb-8 text-white relative z-10">Ready to inspect?</h3>
               <a 
                  href="/simulation" 
                  className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)] relative z-10"
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
    </SmoothScroll>
  )
}