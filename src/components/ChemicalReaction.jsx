import { motion } from 'framer-motion'

export default function ChemicalReaction() {
  return (
    <section className="py-32 px-6 bg-[#080808] border-t border-white/5 overflow-hidden relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Stoichiometry</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">The Biological Engine.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* The Equation */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="text-xs text-white/40 font-mono mb-4">REACTION CHAMBER: PBR-120L</div>
            
            <div className="space-y-8">
              {/* Input */}
              <div>
                <div className="text-sm text-red-400 font-bold mb-2">INPUT (Pollutants)</div>
                <div className="font-mono text-2xl md:text-3xl text-white">
                  6CO₂ + 12H₂O + <span className="text-yellow-400">hν</span>
                </div>
                <div className="text-xs text-white/30 mt-1 font-mono">Carbon Dioxide + Water + Photons</div>
              </div>

              {/* Arrow */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-[2px] bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 relative"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-white/50 bg-black px-2">CHLORELLA PYRENOIDOSA</span>
              </motion.div>

              {/* Output */}
              <div>
                <div className="text-sm text-emerald-400 font-bold mb-2">OUTPUT (Life)</div>
                <div className="font-mono text-2xl md:text-3xl text-white">
                  C₆H₁₂O₆ + 6O₂ + 6H₂O
                </div>
                <div className="text-xs text-white/30 mt-1 font-mono">Glucose (Biomass) + Oxygen + Water</div>
              </div>
            </div>
          </div>

          {/* The Nerdy Details */}
          <div className="space-y-6 font-mono text-sm text-white/60">
            <div className="p-4 border-l-2 border-emerald-500 bg-emerald-900/10">
              <h4 className="text-white font-bold mb-1">Carbon Fixation Rate</h4>
              <p>0.71 g/L/day via RuBisCO enzyme catalysis. Operates at peak efficiency between 400-700nm wavelengths (PAR).</p>
            </div>
            <div className="p-4 border-l-2 border-blue-500 bg-blue-900/10">
              <h4 className="text-white font-bold mb-1">Quantum Yield</h4>
              <p>Optimized via 14h:10h photoperiod using 660nm (Red) and 450nm (Blue) LED supplementation during night cycles.</p>
            </div>
            <div className="p-4 border-l-2 border-purple-500 bg-purple-900/10">
              <h4 className="text-white font-bold mb-1">Byproduct Management</h4>
              <p>Generated biomass ($C_6H_{12}O_6$) is harvested monthly. Can be used as biofuel feedstock or high-protein bio-fertilizer.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}