import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Cpu, Wind, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    title: "Bio-Hybrid Core",
    desc: "Algae-based CO2 sequestration engine running at 94% efficiency.",
    icon: <Wind size={32} className="text-emerald-400" />,
    col: "md:col-span-2"
  },
  {
    title: "Neural Intake",
    desc: "AI-driven fan curves that adapt to pollution spikes in milliseconds.",
    icon: <Cpu size={32} className="text-blue-400" />,
    col: "md:col-span-1"
  },
  {
    title: "HEPA-X Filtration",
    desc: "Medical grade particulate capture down to 0.03 microns.",
    icon: <ShieldCheck size={32} className="text-white" />,
    col: "md:col-span-1"
  },
  {
    title: "Infinite Power",
    desc: "Solar-ready architecture with LiFePO4 battery backup.",
    icon: <Zap size={32} className="text-yellow-400" />,
    col: "md:col-span-2"
  }
];

function LiquidCard({ feature }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative border border-white/10 bg-black/40 rounded-3xl overflow-hidden ${feature.col}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Liquid Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `
        }}
      />

      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          {feature.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiquidGrid() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-mono text-white mb-2">SYSTEM ARCHITECTURE</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <LiquidCard key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}