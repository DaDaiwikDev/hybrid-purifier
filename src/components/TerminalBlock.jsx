import { motion } from 'framer-motion'

const codeLines = [
  "> SYSTEM_INIT: EKOSPAXES KERNEL V1.0",
  "> MOUNTING SENSORS...",
  "  [OK] PMS5003 (PARTICULATE MATTER)",
  "  [OK] MH-Z19B (CO2 NDIR)",
  "  [OK] BME680 (VOC/TEMP/HUM)",
  "> CONNECTING TO MQTT BROKER...",
  "  [SUCCESS] LINK ESTABLISHED: wss://mqtt.ekospaxes.com",
  "> STARTING PID LOOP (TEMP_TARGET=27.0C)...",
  "  [INFO] AMBIENT: 34.2C -> CHILLER: ON",
  "> CHECKING LIGHT LEVELS...",
  "  [INFO] SOLAR: 850 W/m2 -> LEDS: OFF (SAVING POWER)",
  "> MONITORING BIO-REACTOR...",
  "  [DATA] pH: 7.2 | DO: 8.4 mg/L | TURBIDITY: 450 NTU",
  "> CALIBRATING AIRFLOW...",
  "  [ACTION] AQI SPIKE DETECTED (180). FAN RPM -> 2400",
  "> SYSTEM STABLE. LISTENING..."
]

export default function TerminalBlock() {
  return (
    <section className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">The Digital Cortex.</h2>
            <p className="text-white/40 font-mono text-sm mt-1">Real-time Edge Computing Logic.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500" />
          </div>
        </div>

        <div className="bg-[#0c0c0c] rounded-xl border border-white/10 p-6 font-mono text-xs md:text-sm shadow-2xl overflow-hidden relative">
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />
          
          <div className="space-y-2 text-green-400/90 relative z-0">
            {codeLines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-blue-500 select-none mr-2">{i + 1}</span>
                {line}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-4 bg-green-500 inline-block align-middle ml-2" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}