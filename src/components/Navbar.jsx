import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from './Logo'
import CausticsLayer from './effects/CausticsLayer'
import { getHoloGradient } from './effects/HoloShader'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Detect scroll for Bloom effect
  const { scrollY } = useScroll()
  
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  // Dynamic Shader Styles
  const shaderStyle = getHoloGradient(isScrolled ? 1.5 : 1)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Cinematic easing
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none"
    >
      <div 
        className={`max-w-7xl mx-auto rounded-full px-6 py-3 flex justify-between items-center pointer-events-auto glass-liquid ${isScrolled ? 'bloomed' : ''}`}
        style={shaderStyle}
      >
        {/* === LAYER 0: HOLOGRAPHIC EDGE === */}
        <div className="holo-edge" />

        {/* === LAYER 1: CAUSTICS ANIMATION === */}
        <CausticsLayer />

        {/* === LAYER 2: CONTENT === */}
        <div className="relative z-10 flex items-center gap-3 group cursor-pointer">
          <div className="scale-75 group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <Logo />
          </div>
          <div className="leading-tight">
            <span className="text-white font-bold tracking-tight text-lg block group-hover:text-emerald-300 transition-colors">
              EKOSPAXES
            </span>
            <span className="text-[10px] text-emerald-500/80 uppercase tracking-widest font-mono group-hover:text-emerald-400 transition-colors">
              Series X Twin
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/60 relative z-10">
          <Link to="/simulation" className="hover:text-white hover:text-spectral transition-all duration-300">
            Simulation
          </Link>
          <a href="#technology" className="hover:text-white hover:text-spectral transition-all duration-300">
            Technology
          </a>
          <Link to="/specs" className="hover:text-white hover:text-spectral transition-all duration-300">
            Specifications
          </Link>
          <a href="mailto:contact@ekospaxes.com" className="hover:text-white hover:text-spectral transition-all duration-300">
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <button 
          className="relative z-10 bg-white hover:bg-emerald-50 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] overflow-hidden group"
        >
          <span className="relative z-10">Get Report</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </motion.nav>
  )
}