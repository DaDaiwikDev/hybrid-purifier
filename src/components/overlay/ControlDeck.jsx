import { useStore } from '../../store'
import { Layers, MousePointer2, ScanEye, Sun, Moon } from 'lucide-react'

export default function ControlDeck() {
  const { interactionMode, setInteractionMode, xRayMode, toggleXRay, time, setTime } = useStore()

  return (
    <div className="flex flex-col gap-4 pointer-events-auto">
      
      {/* Time Control */}
      <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
        <Sun size={16} className="text-white/40"/>
        <input 
          type="range" min="0" max="24" step="0.1" 
          value={time} onChange={(e) => setTime(parseFloat(e.target.value))}
          className="w-32 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <Moon size={16} className="text-white/40"/>
      </div>

      {/* Mode Toggles */}
      <div className="glass-panel p-2 rounded-2xl flex gap-2">
        <button 
          onClick={() => setInteractionMode('orbit')}
          className={`p-3 rounded-xl transition-all ${interactionMode === 'orbit' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
          title="Orbit Mode"
        >
          <MousePointer2 size={20} />
        </button>
        <button 
          onClick={toggleXRay}
          className={`p-3 rounded-xl transition-all ${xRayMode ? 'bg-red-500 text-white' : 'text-white/40 hover:text-white'}`}
          title="X-Ray Scan"
        >
          <Layers size={20} />
        </button>
      </div>

    </div>
  )
}