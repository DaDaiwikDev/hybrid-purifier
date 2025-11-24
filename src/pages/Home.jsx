import { ReactLenis } from 'lenis/react'
import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import StorySection from '../components/StorySection'
import HowItWorks from '../components/HowItWorks'
import BentoGrid from '../components/BentoGrid'
import Specs from '../components/Specs'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative w-full min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans">
        
        {/* FIXED 3D BACKGROUND (Presentation Mode) */}
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <Scene mode="presentation" />
        </div>

        <Navbar />

        {/* HERO TEXT OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Logo className="w-12 h-12" />
              <span className="text-xl font-bold tracking-tight">EKOSPAXES</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              SERIES X
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-lg mx-auto font-light">
              The first biological air purification system designed for the Indian urban crisis.
            </p>
            
            {/* CTA BUTTON */}
            <Link to="/simulation" className="pointer-events-auto inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Launch Simulation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* SCROLL CONTENT */}
        <div className="relative z-20 pointer-events-none">
          {/* Spacer for Hero */}
          <section className="h-screen w-full" /> 

          {/* Content Deck */}
          <div className="relative bg-black/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-50px_150px_rgba(0,0,0,1)] pointer-events-auto">
            <StorySection />
            <HowItWorks />
            <BentoGrid />
            <Specs />
            <Footer />
          </div>
        </div>

      </div>
    </ReactLenis>
  )
}