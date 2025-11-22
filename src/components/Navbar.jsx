import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none" // Pointer events none so clicks pass through empty space
    >
      <div className="max-w-7xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl pointer-events-auto">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="scale-75"><Logo /></div>
          <div className="leading-tight">
            <span className="text-white font-bold tracking-tight text-lg block">EKOSPAXES</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Series X Twin</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
          <a href="#simulation" className="hover:text-white transition-colors">Simulation</a>
          <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          <a href="#specs" className="hover:text-white transition-colors">Specs</a>
        </div>

        {/* CTA Button */}
        <button className="bg-white hover:bg-blue-50 text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Get Report
        </button>
      </div>
    </motion.nav>
  )
}