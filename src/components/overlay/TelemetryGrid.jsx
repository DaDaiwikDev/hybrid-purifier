import { useStore } from '../../store'
import { useSimulationLogic } from '../../hooks/useSimulationLogic' // Importing our new hook!
import { Wind, Microscope } from 'lucide-react'

function SensorCard({ label, value, unit, color }) {
  return (
    <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl flex flex-col justify-between min-w-[90px] backdrop-blur-md hover:bg-white/5 transition-colors">
      <span className="text-[9px] font-mono uppercase tracking-widest opacity-70">{label}</span>
      <div className={`text-lg font-mono font-medium ${color}`}>{value} <span className="text-[10px] text-white/40 font-sans">{unit}</span></div>
    </div>
  )
}

export default function TelemetryGrid() {
  const { aqi, pm25, pm10, nox, sox } = useStore()
  const { o2Gen, co2Level, phLevel, algaeHealth } = useSimulationLogic()

  return (
    <div className="pointer-events-auto hidden lg:block space-y-3">
      {/* Atmosphere */}
      <div className="glass-panel p-3 rounded-2xl bg-[#080808]/60 backdrop-blur-xl border border-white/10 w-[260px]">
        <div className="flex items-center gap-2 mb-2 text-white/60 border-b border-white/5 pb-2"><Wind size={12} /><span className="text-[10px] font-bold uppercase tracking-widest">Atmosphere</span></div>
        <div className="grid grid-cols-2 gap-2">
          <SensorCard label="PM2.5" value={pm25} unit="µg" color="text-white" />
          <SensorCard label="PM10" value={pm10} unit="µg" color="text-white" />
          <SensorCard label="NOx" value={nox} unit="ppb" color={Number(nox)>10?"text-amber-400":"text-blue-200"} />
          <SensorCard label="SOx" value={sox} unit="ppb" color={Number(sox)>5?"text-amber-400":"text-blue-200"} />
        </div>
      </div>
      {/* Bio-Core */}
      <div className="glass-panel p-3 rounded-2xl bg-[#080808]/60 backdrop-blur-xl border border-white/10 w-[260px]">
        <div className="flex items-center gap-2 mb-2 text-white/60 border-b border-white/5 pb-2"><Microscope size={12} /><span className="text-[10px] font-bold uppercase tracking-widest">Bio-System</span></div>
        <div className="grid grid-cols-2 gap-2">
          <SensorCard label="O2 GEN" value={o2Gen} unit="g/d" color="text-emerald-400" />
          <SensorCard label="CO2" value={co2Level} unit="ppm" color="text-white" />
          <SensorCard label="pH" value={phLevel} unit="" color="text-blue-200" />
          <SensorCard label="HEALTH" value={algaeHealth} unit="%" color="text-emerald-200" />
        </div>
      </div>
    </div>
  )
}