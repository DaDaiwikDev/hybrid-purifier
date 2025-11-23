import { motion } from 'framer-motion'
import { Wind, Zap, Leaf, ShieldCheck, Cpu, Sun } from 'lucide-react'

const Card = ({ title, desc, icon, colSpan = "col-span-1", delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`${colSpan} bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#161616] transition-colors group relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <div className="relative z-10 h-full flex flex-col justify-end">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
)

export default function BentoGrid() {
  return (
    <section className="w-full py-32 px-6 bg-[#050505] z-30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white">Engineering Mastery.</h2>
          <p className="text-white/40 mt-2">5-Stage Filtration Architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[600px]">
          {/* LARGE CARD */}
          <Card 
            colSpan="md:col-span-2 row-span-2"
            title="Hybrid-PBR Core"
            desc="120L Algae Photobioreactor. It doesn't just trap dust; it eats CO2 and breathes out Oxygen. A living lung for your home."
            icon={<Leaf size={120} className="text-emerald-500" />}
            delay={0.1}
          />
          
          {/* SMALL CARDS */}
          <Card 
            title="Medical HEPA H13"
            desc="Captures 99.97% of particles down to 0.3 microns. PM2.5 doesn't stand a chance."
            icon={<Wind size={64} className="text-blue-500" />}
            delay={0.2}
          />
          <Card 
            title="Off-Grid Solar"
            desc="450W Solar Array + LiFePO4 Battery. Runs 24/7 with Zero Grid Impact."
            icon={<Sun size={64} className="text-yellow-500" />}
            delay={0.3}
          />
          <Card 
            title="UV-A Sterilization"
            desc="TiO2 Hex-Grid activated by 365nm UV LEDs destroys viruses and VOCs instantly."
            icon={<ShieldCheck size={64} className="text-purple-500" />}
            delay={0.4}
          />
          
          {/* WIDE CARD */}
          <Card 
            colSpan="md:col-span-3"
            title="AI-Driven Telemetry"
            desc="Real-time satellite synchronization using OpenWeatherMap API. The system predicts pollution spikes and pre-charges the air flow before you even notice the haze."
            icon={<Cpu size={80} className="text-white" />}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  )
}