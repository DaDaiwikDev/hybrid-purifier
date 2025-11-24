import { motion } from 'framer-motion'
import { FlaskConical, Zap } from 'lucide-react'

export default function Chemistry() {
  return (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white font-mono">Core Chemistry.</h2>
          <p className="text-emerald-400 font-mono mt-2 uppercase tracking-widest text-xs">Reaction Stoichiometry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* REACTION 1: PHOTOSYNTHESIS */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-100px" }}
            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl relative group"
          >
            <div className="absolute top-0 right-0 p-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
              <FlaskConical size={64} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/> 
              Bio-Fixation
            </h3>
            
            {/* Formula */}
            <div className="font-mono text-lg md:text-xl text-gray-400 mb-8 bg-black/50 p-4 rounded-lg border border-white/5">
              6CO₂ + 6H₂O <span className="text-yellow-500">→</span> C₆H₁₂O₆ + <span className="text-emerald-400 font-bold">6O₂</span>
            </div>

            <div className="space-y-4 text-sm text-gray-500 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Catalyst</span>
                <span className="text-white">Chlorella pyrenoidosa</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Input (CO₂)</span>
                <span className="text-white">0.71 g/L/day</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Output (O₂)</span>
                <span className="text-emerald-400">64.2 g/day</span>
              </div>
            </div>
          </motion.div>

          {/* REACTION 2: PCO OXIDATION */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-100px" }}
            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl relative group"
          >
            <div className="absolute top-0 right-0 p-4 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
              <Zap size={64} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/> 
              PCO Mineralization
            </h3>
            
            {/* Formula */}
            <div className="font-mono text-lg md:text-xl text-gray-400 mb-8 bg-black/50 p-4 rounded-lg border border-white/5">
              VOC + •OH <span className="text-blue-500">→</span> CO₂ + H₂O
            </div>

            <div className="space-y-4 text-sm text-gray-500 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Substrate</span>
                <span className="text-white">TiO₂ (Anatase) Honeycomb</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Activation</span>
                <span className="text-purple-400">365nm UV-A LEDs</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Efficiency</span>
                <span className="text-white">62% VOC Reduction</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}