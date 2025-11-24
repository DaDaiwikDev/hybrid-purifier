// src/components/hardware/HardwareStatus.jsx
import { motion } from 'framer-motion'

export default function HardwareStatus() {
  return (
    <div className="w-full border-t border-white/10 bg-black/60 backdrop-blur-md p-4 font-mono text-[10px] md:text-xs text-white/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20 relative">
      
      {/* Blinking Status */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-emerald-500 font-bold">SYSTEM_CHECK: ONLINE</span>
      </div>

      {/* Sensor Data */}
      <div className="flex gap-4">
        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
          <span className="opacity-50">SENSORS:</span>
          <span className="text-white">PMS5003, MH-Z19B</span>
        </div>
      </div>

      {/* Global Status */}
      <div className="flex items-center gap-2">
        <span className="opacity-50">INTEGRITY:</span>
        <motion.span 
          animate={{ opacity: [1, 0.5, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-400 font-bold"
        >
          OPTIMAL
        </motion.span>
      </div>

    </div>
  )
}