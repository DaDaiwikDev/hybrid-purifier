import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import SearchBar from '../components/overlay/SearchBar'
import ControlDeck from '../components/overlay/ControlDeck'
import TelemetryGrid from '../components/overlay/TelemetryGrid'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useStore } from '../store'

export default function Simulation() {
  const { city } = useStore()

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      
      {/* BACKGROUND SCENE */}
      <div className="absolute inset-0 z-0">
        <Scene mode="interactive" />
      </div>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* OVERLAY LAYER (The HUD) */}
      <div className="absolute inset-0 z-40 pointer-events-none p-6 pt-24 flex flex-col justify-between">
        
        {/* TOP ROW */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Link to="/" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-2">
              <ChevronLeft size={14} /> Exit Lab
            </Link>
            <h1 className="text-4xl font-bold font-mono text-white/90">{city}</h1>
          </div>
          
          <SearchBar />
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end">
          <TelemetryGrid />
          <ControlDeck />
        </div>

      </div>

    </div>
  )
}