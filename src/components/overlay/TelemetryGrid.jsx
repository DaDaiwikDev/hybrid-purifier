import { useStore } from '../../store'
import { Activity, Wind, CloudFog } from 'lucide-react'

const StatItem = ({ label, value, unit, color = "text-white" }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{label}</span>
    <span className={`text-xl font-bold font-mono ${color}`}>{value}<span className="text-xs text-white/30 ml-1">{unit}</span></span>
  </div>
)

export default function TelemetryGrid() {
  const { aqi, pm25, pm10, nox } = useStore()
  
  const statusColor = aqi < 50 ? 'text-emerald-400' : aqi < 150 ? 'text-yellow-400' : 'text-red-500'

  return (
    <div className="glass-panel p-6 rounded-3xl pointer-events-auto min-w-[280px]">
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <Activity className={statusColor} size={20} />
        <span className="font-mono text-sm text-white/60">LIVE TELEMETRY</span>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
        <StatItem label="AQI (US)" value={aqi} unit="" color={statusColor} />
        <StatItem label="PM 2.5" value={pm25} unit="µg/m³" />
        <StatItem label="PM 10" value={pm10} unit="µg/m³" />
        <StatItem label="NOx" value={nox} unit="ppm" />
      </div>
    </div>
  )
}