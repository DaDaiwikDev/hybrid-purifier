import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Cpu, Sun, Droplets, TrendingUp } from 'lucide-react'

// SPOTLIGHT CARD COMPONENT
function Card({ title, desc, icon, colSpan = "col-span-1", bg = "bg-[#111]" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      className={`${colSpan} group relative border border-white/10 rounded-3xl overflow-hidden ${bg}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `
        }}
      />
      
      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        <div className="mb-6 text-white/20 group-hover:text-white/80 transition-colors duration-500 scale-100 group-hover:scale-110 origin-top-left">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed font-light">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 bg-black border-t border-white/5 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Engineering Mastery.</h2>
          <p className="text-white/40 mt-4 text-lg font-light">5-Stage Filtration Architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          <Card 
            colSpan="md:col-span-2"
            bg="bg-gradient-to-br from-[#0a0a0a] to-[#051a10]"
            title="Algae Intelligence"
            desc="Real-time monitoring of pH, turbidity, and dissolved oxygen ensures optimal photosynthesis. The system sleeps when the air is clean and wakes when pollution spikes."
            icon={<Cpu size={48} />}
          />
          <Card 
            title="Off-Grid Ready"
            desc="Optimized for India. 450W Solar input with LiFePO4 battery backup ensures 94.2% system uptime even during power cuts."
            icon={<Sun size={48} />}
          />
          <Card 
            title="₹386 / Day"
            desc="Lower operational cost than running an AC. The only consumable is the algae nutrient premix."
            icon={<TrendingUp size={48} />}
          />
          <Card 
            colSpan="md:col-span-2"
            bg="bg-gradient-to-br from-[#0a0a0a] to-[#0a1020]"
            title="Liquid Tree Tech"
            desc="1 m² footprint delivers the carbon sequestration power of 50 mature trees. Designed for dense urban lobbies and offices."
            icon={<Droplets size={48} />}
          />
        </div>
      </div>
    </section>
  )
}