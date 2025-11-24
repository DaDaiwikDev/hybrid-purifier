// src/components/hardware/StackItem.jsx
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export default function StackItem({ label, spec, index, total }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="group relative w-full md:w-[600px] h-24 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-8 overflow-hidden cursor-crosshair focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      onMouseMove={handleMouseMove}
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${spec}`}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
      whileTap={{ scale: 0.98 }}
    >
      
      {/* LIQUID SHEEN EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `
        }}
      />

      {/* CONNECTING LINE (Visual Thread) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/10 rounded-r-full group-hover:bg-blue-500/50 transition-colors" />

      {/* CONTENT */}
      <div className="flex flex-col relative z-10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Layer 0{total - index}</span>
        <span className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{label}</span>
      </div>

      <div className="text-right relative z-10">
        <span className="block text-xs font-mono text-emerald-400/80 group-hover:text-emerald-400 transition-colors">{spec}</span>
      </div>

    </motion.div>
  )
}