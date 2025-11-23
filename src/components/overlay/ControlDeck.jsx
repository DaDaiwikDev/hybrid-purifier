import { useStore } from '../../store'
import { useSimulationLogic } from '../../hooks/useSimulationLogic'
import { motion } from 'framer-motion'
import { Sun, Battery, Wind, ArrowRight, Play, Pause, FastForward, Rewind, RotateCw, Hand } from 'lucide-react'
import RollingNumber from '../RollingNumber'

export default function ControlDeck() {
  const { 
    aqi, setAqi, 
    time, setTime, 
    toggleXRay, xRayMode, 
    isPlaying, togglePlay, setSpeed,
    interactionMode, setInteractionMode
  } = useStore()

  const { 
    solarWatts, loadWatts, gridDraw, batteryPct, 
    status, timeString, isCharging 
  } = useSimulationLogic()

  const batteryColor = isCharging ? "bg-emerald-500" : (status === "DISCHARGING" ? "bg-amber-500" : "bg-red-500")
  const statusTextColor = isCharging ? "text-emerald-400" : (status === "DISCHARGING" ? "text-amber-400" : "text-red-400")
  const gridActive = gridDraw > 0

  return (
    <div className="glass-panel rounded-[32px] p-1 shadow-2xl">
      <div className="bg-[#080808]/95 backdrop-blur-2xl rounded-[28px] p-6 border border-white/5">
        
        {/* BATTERY */}
        <div className="mb-6 bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="flex justify-between items-end mb-3 relative z-10">
            <div className="flex items-center gap-2.5">
               <div className={`p-1.5 rounded-md ${isCharging ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white/70'}`}>
                 {isCharging ? <Sun size={16} /> : <Battery size={16} />}
               </div>
               <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">LiFePO4 Storage</span>
            </div>
            <div className={`text-xs font-mono font-bold ${statusTextColor}`}>
              {status} <span className="text-white/30 mx-1">|</span> <RollingNumber value={batteryPct} />%
            </div>
          </div>
          <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/5 relative z-10">
            <motion.div 
              className={`absolute top-0 left-0 h-full ${batteryColor} shadow-[0_0_15px_currentColor]`} 
              animate={{ width: `${batteryPct}%` }} 
              transition={{ type: "spring", stiffness: 40 }}
            />
          </div>
        </div>

        {/* MEDIA */}
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-2 border border-white/5 mb-6">
           <div className="px-3 text-xs font-mono text-yellow-400 font-bold min-w-[80px] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
              {timeString}
           </div>
           <div className="flex items-center gap-1">
              <button onClick={() => setSpeed(-4)} className="p-2 hover:bg-white/10 text-white"><Rewind size={16} /></button>
              <button onClick={togglePlay} className="p-2 hover:bg-white/10 text-white">{isPlaying ? <Pause size={16}/> : <Play size={16}/>}</button>
              <button onClick={() => setSpeed(4)} className="p-2 hover:bg-white/10 text-white"><FastForward size={16} /></button>
           </div>
        </div>

        {/* SLIDERS */}
        <div className="space-y-6 mb-6">
          <div className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group">
            <div className="absolute top-0 h-full w-1 bg-yellow-500 z-10" style={{ left: `${(time/24)*100}%` }} />
            <input type="range" min="0" max="24" step="0.1" value={time} onChange={(e)=>setTime(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>
          
          {/* AQI SLIDER (BIG NUMBER) */}
          <div>
             <div className="flex justify-between items-end mb-3">
                <div className="flex items-center gap-2 opacity-60">
                   <Wind size={14} />
                   <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Bio-Load Sim</span>
                </div>
                <div className="text-3xl font-mono font-medium text-white leading-none">
                   <RollingNumber value={aqi} />
                </div>
             </div>
             <div className="relative h-6 bg-white/5 rounded-full overflow-hidden border border-white/5 hover:border-white/20 transition-colors group">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500/40 via-blue-500/40 to-red-500/40" 
                 animate={{ width: `${(aqi/600)*100}%` }} 
               />
               <input type="range" min="0" max="600" value={aqi} onChange={(e)=>setAqi(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
             </div>
          </div>
        </div>

        {/* POWER GRID */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center"><div className="text-[8px] uppercase text-gray-500 mb-1">Solar</div><div className="text-sm font-mono text-yellow-400">+{solarWatts}W</div></div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center"><div className="text-[8px] uppercase text-gray-500 mb-1">Load</div><div className="text-sm font-mono text-white">-{loadWatts}W</div></div>
          <div className={`rounded-xl p-3 border border-white/5 text-center ${gridActive?'bg-red-900/20':'bg-emerald-900/20'}`}><div className="text-[8px] uppercase text-gray-500 mb-1">Grid</div><div className={`text-sm font-mono font-bold ${gridActive?'text-red-400':'text-emerald-400'}`}>{gridDraw}W</div></div>
        </div>

        {/* INTERACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button onClick={() => setInteractionMode('orbit')} className={`py-3 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 ${interactionMode === 'orbit' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50'}`}><RotateCw size={12} /> Auto Orbit</button>
          <button onClick={() => setInteractionMode('view')} className={`py-3 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 ${interactionMode === 'view' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50'}`}><Hand size={12} /> Manual View</button>
        </div>

        {/* TOGGLE */}
        <button onClick={toggleXRay} className="w-full py-3 rounded-xl bg-white text-black text-xs font-bold uppercase flex items-center justify-center gap-2 hover:scale-[1.02]">{xRayMode ? "Close" : "Internal View"} <ArrowRight size={14} /></button>

      </div>
    </div>
  )
}