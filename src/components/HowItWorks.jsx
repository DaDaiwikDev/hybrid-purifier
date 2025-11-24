import { motion } from 'framer-motion'
import { Wind, Zap, Leaf, ShieldCheck, Filter } from 'lucide-react'

const steps = [
  { id: "01", title: "Cyclone Intake", icon: <Wind />, desc: "High-velocity vortex separates 90% of heavy dust (>50µm) before it touches any filter." },
  { id: "02", title: "Electrostatic Charge", icon: <Zap />, desc: "6-8 kV DC field ionizes PM2.5 particles, trapping them on collection plates." },
  { id: "03", title: "HEPA H13 Barrier", icon: <Filter />, desc: "Medical-grade capture of 99.97% of ultrafine particles down to 0.3 microns." },
  { id: "04", title: "PCO Oxidation", icon: <ShieldCheck />, desc: "UV-A light hits Titanium Dioxide, creating hydroxyl radicals that destroy VOCs." },
  { id: "05", title: "Bio-Regeneration", icon: <Leaf />, desc: "Clean, CO₂-heavy air enters the Algae Core. Photosynthesis creates fresh Oxygen." }
]

export default function HowItWorks() {
  return (
    <section className="py-40 px-6 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white">The 5-Stage Cycle</h2>
          <p className="text-white/40 mt-4 font-mono uppercase tracking-widest text-sm">From Smog to O₂</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-emerald-500 to-transparent opacity-20" />
          <div className="space-y-32">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-150px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-left md:text-right group pl-20 md:pl-0">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end'}`}>
                    <span className="text-xs font-mono text-blue-500 mb-2 tracking-widest">STAGE {step.id}</span>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,1)] group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500 z-10">
                  <div className="text-white/80 group-hover:text-blue-400 transition-colors">{step.icon}</div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}