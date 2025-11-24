import Navbar from '../components/Navbar'
import Scene from '../components/Scene'
import Overlay from '../components/Overlay'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function Simulation() {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      
      {/* BACK BUTTON */}
      <div className="fixed top-24 left-6 z-50">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={14} /> Back to Product
        </Link>
      </div>

      {/* FIXED 3D BACKGROUND (Interactive Mode) */}
      <div className="absolute inset-0 z-0">
        <Scene mode="interactive" />
      </div>

      {/* HUD LAYER */}
      <div className="absolute inset-0 z-40 pointer-events-none">
         <Overlay />
      </div>

      <Navbar />
    </div>
  )
}