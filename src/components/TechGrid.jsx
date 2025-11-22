import { motion } from 'framer-motion'
import { Wind, Zap, Leaf, Droplets } from 'lucide-react'

const Card = ({ title, desc, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
  >
    <div className="mb-4 text-blue-400 group-hover:text-white transition-colors">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
  </motion.div>
)

export default function TechGrid() {
  return (
    <section id="technology" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} 
          className="mb-16"
        >
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">Core Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">5-Stage Filtration. <br/><span className="text-white/40">Zero Compromise.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            title="Cyclonic Pre-Filter" 
            desc="Removes coarse dust (>50µm) using centrifugal force. The first line of defense protecting the delicate core."
            icon={<Wind size={32} />}
            delay={0.1}
          />
          <Card 
            title="Electrostatic Precip." 
            desc="6-8 kV DC High-voltage plates ionize and trap PM2.5/PM1 particles with 85% efficiency."
            icon={<Zap size={32} />}
            delay={0.2}
          />
          <Card 
            title="Algae Bioreactor" 
            desc="120L Photobioreactor using Chlorella pyrenoidosa to fix CO2 and generate fresh Oxygen."
            icon={<Leaf size={32} />}
            delay={0.3}
          />
          <Card 
            title="UV-A Photocatalysis" 
            desc="TiO2 Honeycomb chamber activated by 365nm UV LEDs oxidizes VOCs and pathogens."
            icon={<SunIcon />}
            delay={0.4}
          />
          <Card 
            title="HEPA H13 Final" 
            desc="Medical-grade filtration capturing 99.97% of remaining ultrafine particles @ 0.3µm."
            icon={<Wind size={32} />}
            delay={0.5}
          />
          <Card 
            title="Hybrid Power" 
            desc="Solar-first architecture with LiFePO4 battery backup for 24/7 off-grid operation."
            icon={<Zap size={32} />}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}

function SunIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
}