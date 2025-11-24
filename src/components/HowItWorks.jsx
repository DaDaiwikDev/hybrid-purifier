import { motion } from 'framer-motion'
import { Wind, Zap, Leaf, ShieldCheck, Filter } from 'lucide-react'

const steps = [
  {
    id: "01", title: "Cyclone Separation", icon: <Wind />,
    desc: "Air enters at 500 m³/h. Centrifugal force spins out heavy dust (>50µm), protecting the core filters."
  },
  {
    id: "02", title: "Electrostatic Precip.", icon: <Zap />,
    desc: "6-8 kV DC plates charge and trap fine PM2.5/PM1 particles with 85% efficiency. Zero filter waste."
  },
  {
    id: "03", title: "HEPA H13 Final", icon: <Filter />,
    desc: "Medical-grade borosilicate mesh captures 99.97% of any remaining ultrafine particles down to 0.3 microns."
  },
  {
    id: "04", title: "UV-A Photocatalysis", icon: <ShieldCheck />,
    desc: "Titanium Dioxide (TiO2) honeycomb activated by 365nm UV LEDs oxidizes toxic VOCs and viruses."
  },
  {
    id: "05", title: "Algae Bioreactor", icon: <Leaf />,
    desc: "The clean, CO2-rich air is fed to the Chlorella tank. Photosynthesis fixes Carbon and releases pure Oxygen."
  }
]

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white">The 5-Stage Cycle.</h2>
          <p className="text-white/40 mt-2">From Hazardous Smog to Breathable Oxygen.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-emerald-500 to-transparent opacity-30 md:left-1/2 md:-ml-[0.5px]" />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* TEXT SIDE */}
                <div className="flex-1 text-left md:text-right group">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end'}`}>
                    <div className="text-sm font-mono text-blue-500 mb-2">STAGE {step.id}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed max-w-sm">{step.desc}</p>
                  </div>
                </div>

                {/* CENTER ICON */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,0,0,1)] group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500">
                  {step.icon}
                </div>

                {/* EMPTY SPACE FOR BALANCE */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}