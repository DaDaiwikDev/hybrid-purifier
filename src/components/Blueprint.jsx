import { motion } from 'framer-motion'

const HardwareItem = ({ label, spec, y }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
    className="absolute left-0 w-full flex items-center gap-4"
    style={{ top: y }}
  >
    <div className="w-24 text-right text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
    <div className="flex-1 h-[1px] bg-white/20" />
    <div className="w-32 text-[10px] font-mono text-white font-bold">{spec}</div>
  </motion.div>
)

export default function Blueprint() {
  return (
    <section className="py-40 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-white font-mono">Hardware Stack.</h2>
          <p className="text-white/40 mt-2 text-sm font-mono">Vertical Integration Architecture</p>
        </div>

        <div className="relative h-[600px] border border-white/10 rounded-3xl bg-[#050505] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          <div className="absolute top-10 bottom-10 w-[1px] bg-blue-500/30 dashed" />

          <div className="relative w-40 h-[400px] border-2 border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
            <HardwareItem label="Top Cap" spec="Vent Output" y="5%" />
            <HardwareItem label="Chamber A" spec="120L Acrylic PBR" y="25%" />
            <HardwareItem label="Optics" spec="200W Grow LEDs" y="40%" />
            <HardwareItem label="Mid-Core" spec="TiO2 Matrix" y="60%" />
            <HardwareItem label="Chamber B" spec="HEPA H13 Bank" y="75%" />
            <HardwareItem label="Base" spec="Cyclonic Intake" y="90%" />
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-emerald-500/50 space-y-1">
            <p> SYSTEM_CHECK: ONLINE</p>
            <p> SENSORS: PMS5003, MH-Z19B</p>
            <p> STATUS: OPTIMAL</p>
          </div>
        </div>
      </div>
    </section>
  )
}