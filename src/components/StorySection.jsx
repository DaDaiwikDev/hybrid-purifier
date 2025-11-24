import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function StorySection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return (
    <section ref={containerRef} className="relative w-full py-40 px-6 md:px-24 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div style={{ opacity, y }} className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white/30">Air pollution is</span><br/>
              <span className="text-white">The Invisible Enemy.</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
          </motion.div>
        </div>
        <div className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-400 font-light">
          <p><strong className="text-white font-bold">EKOSPAXES Series X</strong> is an active biological machine. It doesn't just trap pollutants; it digests them.</p>
          <ul className="space-y-4 font-mono text-sm text-white/60 border-l-2 border-white/10 pl-6">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Cyclonic Pre-Filtration</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Algae CO₂ Sequestration</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-white rounded-full" /> UV-C Sterilization</li>
          </ul>
        </div>
      </div>
    </section>
  )
}