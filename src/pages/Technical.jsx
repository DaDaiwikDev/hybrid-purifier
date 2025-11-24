import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowLeft, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const SpecTable = ({ title, data }) => (
  <div className="mb-12">
    <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs font-mono uppercase">
            <th className="py-3 px-4">Parameter</th>
            <th className="py-3 px-4">Value / Specification</th>
            <th className="py-3 px-4">Unit / Notes</th>
          </tr>
        </thead>
        <tbody className="text-sm text-white/80 font-mono">
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-blue-200">{row.param}</td>
              <td className="py-4 px-4 font-bold">{row.val}</td>
              <td className="py-4 px-4 text-white/40">{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default function Technical() {
  const mechanical = [
    { param: "Dimensions", val: "180 x 100 x 100", unit: "cm (H x W x D)" },
    { param: "Dry Weight", val: "~80", unit: "kg" },
    { param: "Operational Weight", val: "~200", unit: "kg (with water)" },
    { param: "PBR Volume", val: "120", unit: "Liters" },
    { param: "Chassis Material", val: "Aluminum 6061 + Acrylic", unit: "Non-corrosive" },
  ]

  const electrical = [
    { param: "Input Voltage", val: "220-240", unit: "VAC, 50Hz" },
    { param: "Avg Power Draw", val: "500", unit: "Watts (Continuous)" },
    { param: "Peak Power Draw", val: "600", unit: "Watts (Heater ON)" },
    { param: "Solar Input", val: "450", unit: "Watts (MPPT)" },
    { param: "Battery Backup", val: "12V 20Ah", unit: "LiFePO4" },
  ]

  const biological = [
    { param: "Organism", val: "Chlorella pyrenoidosa", unit: "Strain CP-2025" },
    { param: "CO2 Fixation", val: "0.71", unit: "g/L/day" },
    { param: "O2 Generation", val: "64.2", unit: "g/day" },
    { param: "Biomass Yield", val: "~250", unit: "g/month (Dry)" },
    { param: "Nutrient Medium", val: "Bold's Basal Medium", unit: "Auto-dosed" },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Technical Datasheet</h1>
            <p className="text-blue-400 font-mono mt-2">Model: HPB-120L-ESP-PCO</p>
          </div>
          <a href="/report.pdf" download className="hidden md:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-gray-200 transition-colors">
            <Download size={16} /> Download PDF
          </a>
        </div>

        <SpecTable title="1. Mechanical Specifications" data={mechanical} />
        <SpecTable title="2. Electrical & Power" data={electrical} />
        <SpecTable title="3. Biological Performance" data={biological} />

        <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-xl mt-12 text-sm text-blue-200 font-mono">
          <strong className="block text-blue-400 mb-2">ENGINEERING NOTE:</strong>
          Performance data is based on standard testing conditions (STC) at 25°C ambient temperature and 400ppm baseline CO2. Actual bioreactor efficiency may vary ±15% depending on solar irradiance and local AQI loading.
        </div>

      </div>
      <Footer />
    </div>
  )
}