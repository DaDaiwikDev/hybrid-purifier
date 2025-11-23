import { motion } from 'framer-motion'

export default function StorySection() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-black z-30">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em]"
        >
          The Invisible Enemy
        </motion.span>

        {/* MAIN HEADLINE */}
        <h2 className="text-5xl md:text-7xl font-bold text-white mt-6 leading-[1.1] tracking-tight">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
            className="block"
          >
            Air pollution isn't just outside.
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} transition={{ duration: 1, delay: 0.2 }}
            className="block text-white/50"
          >
            It's in your living room.
          </motion.span>
        </h2>

        {/* PARAGRAPH */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Standard purifiers are passive. They wait for air to come to them. 
            <span className="text-white font-bold"> EKOSPAXES Series X</span> is active. 
            It combines cyclonic separation, medical-grade HEPA, and a living Algae Bioreactor.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            It doesn't just filter. It <span className="text-emerald-400">regenerates</span>. 
            Converting CO₂ into fresh Oxygen while stripping VOCs and Particulates.
            Fully powered by the sun.
          </motion.p>
        </div>

      </div>
    </section>
  )
}