// src/components/hardware/HardwareStack.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StackItem from './StackItem'
import HardwareStatus from './HardwareStatus'
import { useReducedMotion } from '../../hooks/use-reduced-motion'

const stackData = [
  { label: "Top Cap", spec: "Vent Output / Exhaust" },
  { label: "Chamber A", spec: "120L Acrylic PBR" },
  { label: "Optics Array", spec: "200W Full-Spectrum LEDs" },
  { label: "Mid-Core", spec: "TiO2 Matrix (Honeycomb)" },
  { label: "Chamber B", spec: "HEPA H13 Bank" },
  { label: "Base Unit", spec: "Cyclonic Intake Turbine" },
]

export default function HardwareStack() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="py-32 px-6 bg-black relative min-h-[150vh]">
      
      {/* HEADER */}
      <div className="text-center mb-24 sticky top-24 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-mono mb-4">Vertical Integration.</h2>
        <p className="text-white/40 font-mono uppercase tracking-widest text-sm">Exploded View Architecture</p>
      </div>

      {/* THE STACK CONTAINER */}
      <div className="max-w-4xl mx-auto relative flex flex-col items-center justify-center min-h-[800px]">
        
        {/* Background Guide Line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent dashed" />

        <div className="relative z-10 flex flex-col gap-4 w-full items-center">
          {stackData.map((item, index) => {
            
            // PARALLAX MATH:
            // Calculate a spread factor. Items near top move up, items near bottom move down.
            // We use 'index' to determine direction.
            // Center items stay roughly in place.
            
            const spreadFactor = index - (stackData.length / 2) // -2.5 to +2.5
            const y = useTransform(
               scrollYProgress, 
               [0, 0.5, 1], 
               [0, spreadFactor * 50, spreadFactor * 150] // Expand as we scroll
            )

            return (
              <motion.div 
                key={index}
                style={{ y: shouldReduceMotion ? 0 : y }} // Disable parallax if reduced motion
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full flex justify-center"
              >
                <StackItem 
                  {...item} 
                  index={index} 
                  total={stackData.length} 
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* STATUS BAR (Sticky Bottom) */}
      <div className="max-w-4xl mx-auto mt-24">
         <HardwareStatus />
      </div>

    </section>
  )
}