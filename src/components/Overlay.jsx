import { useStore } from '../store'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import TextReveal from './TextReveal'
import Logo from './Logo'

// NEW IMPORTS (The Modular Parts)
import SearchBar from './overlay/SearchBar'
import TelemetryGrid from './overlay/TelemetryGrid'
import ControlDeck from './overlay/ControlDeck' // You need to create this one similar to Telemetry!

export default function Overlay() {
  const { city, loading } = useStore()

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 pt-28 z-10 overflow-hidden pointer-events-none select-none font-sans">
      
      {/* Background Grain */}
      <div className="bg-grain opacity-20" />

      {/* HEADER SECTION */}
      <div className="flex justify-between items-start w-full relative z-20">
        {/* Left: Brand & Location */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/10 w-fit mb-4 shadow-lg">
             <MapPin size={14} className={loading ? "animate-bounce text-blue-400" : "text-emerald-400"} />
             <div className="flex flex-col leading-none">
               <span className="text-[8px] font-mono text-white/50 tracking-wider uppercase mb-1">Live Feed</span>
               <span className="text-xs font-bold text-white tracking-wider uppercase">{loading ? "SCANNING..." : city}</span>
             </div>
          </div>
        </motion.div>

        {/* Right: Search Bar Component */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <SearchBar />
        </motion.div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex items-end justify-between mt-4 relative z-20">
        
        {/* Left: Telemetry Component */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
          <TelemetryGrid />
        </motion.div>

        {/* Right: Control Deck Component (Make sure to create this file!) */}
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="pointer-events-auto w-full max-w-[420px]">
           <ControlDeck /> 
        </motion.div>

      </div>
    </div>
  )
}