import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Wind, Sun, Battery, ArrowRight, PlugZap, Play, Pause, FastForward, Rewind, Microscope, Leaf, MapPin, Search, Loader2, X } from 'lucide-react'
import RollingNumber from './RollingNumber'
import TextReveal from './TextReveal'
import Logo from './Logo'

// --- 1. MOCK DATABASE FOR AUTOCOMPLETE ---
const SUGGESTIONS = [
  "Warangal, IN", "Hyderabad, IN", "Delhi, IN", "Mumbai, IN", "Bangalore, IN", 
  "Chennai, IN", "Kolkata, IN", "Pune, IN", "Jaipur, IN",
  "New York, US", "London, UK", "Tokyo, JP", "Beijing, CN", "Dubai, AE", 
  "Paris, FR", "Singapore, SG", "Los Angeles, US", "Sydney, AU", "Moscow, RU"
]

// --- 2. SUB-COMPONENT: SENSOR CARD ---
function SensorCard({ label, value, unit, color }) {
  return (
    <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl flex flex-col justify-between min-w-[90px] backdrop-blur-md hover:bg-white/5 transition-colors">
      <div className="flex justify-between items-start opacity-70">
        <span className="text-[9px] font-mono uppercase tracking-widest">{label}</span>
      </div>
      <div className={`text-lg font-mono font-medium ${color}`}>
        {value} <span className="text-[10px] text-white/40 font-sans">{unit}</span>
      </div>
    </div>
  )
}

// --- 3. MAIN COMPONENT ---
export default function Overlay() {
  const { 
    city, fetchLiveAir, loading,
    aqi, setAqi, pm25, pm10, nox, sox,
    time, setTime, toggleXRay, xRayMode, 
    isPlaying, togglePlay, setSpeed, simSpeed 
  } = useStore()

  // --- SEARCH BAR LOGIC ---
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [filtered, setFiltered] = useState([])
  const searchRef = useRef(null)

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    if (val.length > 0) {
      const matches = SUGGESTIONS.filter(c => c.toLowerCase().includes(val.toLowerCase()))
      setFiltered(matches)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const selectCity = (val) => {
    setQuery(val)
    setShowDropdown(false)
    fetchLiveAir(val)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') selectCity(query)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  
  // --- PHYSICS ENGINE (THE BRAIN) ---
  
  // 1. Load Calculation
  const loadWatts = Math.round(30 + (aqi / 300) * 220)

  // 2. Solar Calculation
  const sunIntensity = Math.max(0, 1 - Math.abs(time - 12) / 6.5)
  const solarWatts = Math.round(sunIntensity * 480)

  // 3. Battery Logic (Time-Based Simulation)
  let batteryPct = 0
  const isDay = time >= 6 && time <= 18 // Day is 6:00 AM to 6:00 PM
  
  if (isDay) {
    // Charging Phase: 6am (20%) -> 6pm (100%)
    batteryPct = Math.round(20 + ((time - 6) / 12) * 80)
  } else {
    // Draining Phase: 6pm (100%) -> 6am (20%)
    const nightHours = time > 18 ? time - 18 : time + 6
    batteryPct = Math.max(0, Math.round(100 - (nightHours / 12) * 80))
  }

  // 4. Power State Logic (FIXED LOGIC GAP)
  const netPower = solarWatts - loadWatts
  let status = "IDLE", gridDraw = 0
  
  // PRIMARY CHECK: Is it "Charging Time" (Day) and is battery not full?
  if (isDay && batteryPct < 99) {
    status = "CHARGING"
    // Even if Solar < Load (e.g. 5:30PM), we assume Hybrid Controller prioritizes charging
    // or draws from grid to top up before night.
  } 
  // SECONDARY CHECK: Surplus Power
  else if (netPower >= 0) {
    status = "MAINTAINING" // Battery Full, Solar covers Load
  } 
  // TERTIARY CHECK: Deficit
  else {
    if (batteryPct > 5) {
      status = "DISCHARGING" // Use Battery
    } else {
      status = "GRID BACKUP" // Battery Dead
      gridDraw = Math.abs(netPower)
    }
  }

  const isCharging = status === "CHARGING" || status === "MAINTAINING"
  const batteryColor = isCharging ? "bg-emerald-500" : (status === "DISCHARGING" ? "bg-amber-500" : "bg-red-500")
  const statusTextColor = isCharging ? "text-emerald-400" : (status === "DISCHARGING" ? "text-amber-400" : "text-red-400")

  // 5. Bio-Metrics
  const o2Gen = (50 + sunIntensity * 25).toFixed(1)
  const co2Level = (420 - sunIntensity * 40).toFixed(0)
  const phLevel = (7.2 + sunIntensity * 0.3).toFixed(1)
  const algaeHealth = Math.min(100, Math.round(85 + sunIntensity * 15))

  // Time String
  const hours = Math.floor(time)
  const minutes = Math.floor((time % 1) * 60)
  const timeString = `${hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours)}:${minutes.toString().padStart(2, '0')} ${hours >= 12 && hours < 24 ? 'PM' : 'AM'}`


  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 pt-28 z-10 overflow-hidden pointer-events-none select-none font-sans">
      
      <div className="bg-grain opacity-20" />

      {/* --- TOP SECTION --- */}
      <div className="flex justify-between items-start w-full relative z-20">
        
        {/* LEFT: LIVE LOCATION */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="pointer-events-auto"
        >
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/10 w-fit mb-4 shadow-lg">
             <MapPin size={14} className={loading ? "animate-bounce text-blue-400" : "text-emerald-400"} />
             <div>
               <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase block">Satellite Feed</span>
               <span className="text-xs font-bold text-white tracking-wider uppercase block">
                 {loading ? "SCANNING..." : city}
               </span>
             </div>
          </div>
        </motion.div>

        {/* RIGHT: SEARCH BAR */}
        <motion.div 
           initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
           className="pointer-events-auto relative z-50" 
           ref={searchRef}
        >
          <div className="flex items-center bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2.5 w-72 hover:border-white/40 transition-all shadow-2xl group">
            <Search size={16} className="text-white/50 mr-3 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search City..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-full font-mono uppercase"
              value={query}
              onChange={handleInput}
            />
            {loading ? (
              <Loader2 size={14} className="animate-spin text-blue-400 ml-2" />
            ) : query.length > 0 && (
              <button onClick={() => { setQuery(""); setShowDropdown(false); }} className="hover:bg-white/10 rounded-full p-1"><X size={12} className="text-white/50"/></button>
            )}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-3 right-0 w-72 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-2"
              >
                {filtered.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => selectCity(item)}
                    className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                  >
                    <MapPin size={12} className="text-blue-500" />
                    {item}
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="px-5 py-3 text-xs text-gray-600 italic">No satellite data found.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- MIDDLE LAYOUT --- */}
      <div className="flex-1 flex items-end justify-between mt-4 relative z-20">
        
        {/* LEFT: TELEMETRY GRID */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}
          className="pointer-events-auto hidden lg:block space-y-3"
        >
          {/* ATMOSPHERE CARD */}
          <div className="glass-panel p-3 rounded-2xl bg-[#080808]/60 backdrop-blur-xl border border-white/10 w-[260px]">
            <div className="flex items-center gap-2 mb-2 text-white/60 border-b border-white/5 pb-2">
              <Wind size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Atmosphere</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SensorCard label="PM2.5" value={pm25} unit="µg" color="text-white" />
              <SensorCard label="PM10" value={pm10} unit="µg" color="text-white" />
              <SensorCard label="NOx" value={nox} unit="ppb" color={Number(nox) > 10 ? "text-amber-400" : "text-blue-200"} />
              <SensorCard label="SOx" value={sox} unit="ppb" color={Number(sox) > 5 ? "text-amber-400" : "text-blue-200"} />
            </div>
          </div>

          {/* BIO-CORE CARD */}
          <div className="glass-panel p-3 rounded-2xl bg-[#080808]/60 backdrop-blur-xl border border-white/10 w-[260px]">
            <div className="flex items-center gap-2 mb-2 text-white/60 border-b border-white/5 pb-2">
              <Microscope size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Bio-System</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SensorCard label="O2 GEN" value={o2Gen} unit="g/d" color="text-emerald-400" />
              <SensorCard label="CO2" value={co2Level} unit="ppm" color="text-white" />
              <SensorCard label="pH" value={phLevel} unit="" color="text-blue-200" />
              <SensorCard label="HEALTH" value={algaeHealth} unit="%" color="text-emerald-200" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT: CONTROL DECK */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="pointer-events-auto w-full max-w-[420px]"
        >
          <div className="glass-panel rounded-[32px] p-1">
            <div className="bg-[#080808]/90 backdrop-blur-2xl rounded-[28px] p-6 border border-white/5 shadow-2xl">
              
              {/* BATTERY VISUAL */}
              <div className="mb-6 bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-end mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                     {isCharging ? <Sun size={18} className="text-yellow-400"/> : <Battery size={18} className="text-white/70"/>}
                     <span className="text-xs font-bold text-white tracking-wider uppercase">LiFePO4 Storage</span>
                  </div>
                  <div className={`text-xs font-mono font-bold ${statusTextColor}`}>
                    {status} • <RollingNumber value={batteryPct} />%
                  </div>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10 relative z-10">
                  <motion.div 
                    className={`absolute top-0 left-0 h-full ${batteryColor}`} 
                    animate={{ width: `${batteryPct}%` }} 
                  />
                  {status === "CHARGING" && (
                     <motion.div className="absolute inset-0 bg-white/20" animate={{ x: [-200, 200] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                  )}
                </div>
              </div>

              {/* MEDIA CONTROLS */}
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-2 border border-white/5 mb-4">
                 <div className="px-3 text-xs font-mono text-yellow-400 font-bold w-20">{timeString}</div>
                 <div className="flex items-center gap-1">
                    <button onClick={() => setSpeed(-4)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"><Rewind size={16} /></button>
                    <button onClick={togglePlay} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">{isPlaying ? <Pause size={16}/> : <Play size={16}/>}</button>
                    <button onClick={() => setSpeed(4)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"><FastForward size={16} /></button>
                 </div>
              </div>

              {/* SLIDERS */}
              <div className="space-y-4 mb-5">
                <div className="relative h-2 bg-white/10 rounded-full cursor-pointer group">
                  <div className="absolute h-full w-1 bg-yellow-500 z-10" style={{ left: `${(time/24)*100}%` }}/>
                  <input type="range" min="0" max="24" step="0.1" value={time} onChange={(e)=>setTime(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"/>
                </div>
                
                <div>
                   <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1 uppercase font-bold">
                     <span className="flex items-center gap-1"><Wind size={10}/> Bio-Load Simulation</span>
                     <span className="text-white">{aqi}</span>
                   </div>
                   <div className="relative h-6 bg-white/5 rounded-full overflow-hidden border border-white/5 hover:border-red-500/30 transition-colors">
                     <motion.div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500/30 to-red-500/30" animate={{ width: `${(aqi/300)*100}%` }} />
                     <input type="range" min="0" max="300" value={aqi} onChange={(e)=>setAqi(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer"/>
                   </div>
                </div>
              </div>

              {/* POWER STATS */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/5 rounded-lg p-2 border border-white/5 text-center">
                   <div className="text-[8px] uppercase text-gray-500 mb-1">Solar</div>
                   <div className="text-sm font-mono text-yellow-400">+{solarWatts}W</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-white/5 text-center">
                   <div className="text-[8px] uppercase text-gray-500 mb-1">Load</div>
                   <div className="text-sm font-mono text-white">-{loadWatts}W</div>
                </div>
                <div className={`rounded-lg p-2 border border-white/5 text-center ${gridDraw > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                   <div className="text-[8px] uppercase text-gray-500 mb-1">Grid</div>
                   <div className={`text-sm font-mono font-bold ${gridDraw > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{gridDraw}W</div>
                </div>
              </div>

              <button onClick={toggleXRay} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                {xRayMode ? "Close Architecture" : "View Internal Architecture"} <ArrowRight size={12} />
              </button>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}