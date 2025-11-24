// src/pages/Home.jsx

import { ReactLenis } from 'lenis/react'
import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import StorySection from '../components/StorySection'
import HowItWorks from '../components/HowItWorks'
import ChemicalReaction from '../components/ChemicalReaction' // New
import BentoGrid from '../components/BentoGrid'
import TerminalBlock from '../components/TerminalBlock'       // New
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative w-full min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
        
        {/* --- 1. FIXED 3D BACKGROUND --- */}
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <Scene mode="presentation" />
        </div>

        {/* --- 2. NAVIGATION --- */}
        <Navbar />

        {/* --- 3. HERO SECTION (Scroll Trigger) --- */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none">
          
          {/* Main Title */}
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="h-[1px] w-8 bg-blue-500" />
              <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em]">Future of Air</span>
              <div className="h-[1px] w-8 bg-blue-500" />
            </motion.div>

            <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.9] mix-blend-overlay opacity-90">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">
                  SERIES X
                </motion.span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
              className="text-lg md:text-xl text-white/60 max-w-lg mx-auto font-light leading-relaxed"
            >
              The world's first <span className="text-emerald-400">Bio-Hybrid</span> purification architecture. 
              Designed for the urban crisis.
            </motion.p>
          </div>

          {/* Launch Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
            className="mt-12 pointer-events-auto"
          >
            <Link 
              to="/simulation" 
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="relative text-sm font-bold uppercase tracking-widest">Launch Simulation</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </section>

        {/* --- 4. THE BLACK GLASS SCROLL DECK --- */}
        <div className="relative z-20 bg-black/90 backdrop-blur-3xl border-t border-white/10 shadow-[0_-100px_200px_black] pointer-events-auto">
          <StorySection />
          <HowItWorks />
          <ChemicalReaction />
          <BentoGrid />
          <TerminalBlock />
          <Footer />
        </div>

      </div>
    </ReactLenis>
  )
}
