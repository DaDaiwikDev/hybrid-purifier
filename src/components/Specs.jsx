import { motion } from 'framer-motion'

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between py-4 border-b border-white/10 text-sm hover:bg-white/5 px-4 transition-colors">
    <span className="text-white/60 font-mono">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
)

export default function Specs() {
  return (
    <section id="specs" className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Technical Specifications</h2>
          <p className="text-white/40">Research-Backed Performance Data</p>
        </motion.div>

        <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-white">System Performance</div>
          <SpecRow label="Airflow Capacity" value="500 m³/h Continuous" />
          <SpecRow label="PM2.5 Removal" value="> 85% Efficiency" />
          <SpecRow label="CO2 Fixation" value="0.65 – 0.75 g/L/day" />
          <SpecRow label="O2 Generation" value="59 – 68 g/day" />
          <SpecRow label="VOC Oxidation" value="55 – 70% Reduction" />
          
          <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-white mt-4">Hardware Specs</div>
          <SpecRow label="Core Volume" value="120L Acrylic PBR" />
          <SpecRow label="Power Consumption" value="30W (Eco) – 160W (Peak)" />
          <SpecRow label="Footprint" value="1m × 1m × 1.8m" />
          <SpecRow label="Connectivity" value="WiFi (MQTT) + SD Log" />
        </div>
      </div>
    </section>
  )
}